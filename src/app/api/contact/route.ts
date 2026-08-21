import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  organisation?: string;
  topic?: string;
  message?: string;
  website?: string; // honeypot
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Very small in-memory rate limit: 5 messages per IP per 10 minutes */
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Bots fill the hidden field; answer OK and drop it.
  if (body.website) return NextResponse.json({ ok: true });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) {
    return NextResponse.json({ error: "Too many messages from this connection. Please try again later." }, { status: 429 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const organisation = (body.organisation || "").trim();
  const topic = (body.topic || "other").trim();
  const message = (body.message || "").trim();

  if (!name || !EMAIL_RE.test(email) || message.length < 10) {
    return NextResponse.json({ error: "Add your name, a valid email address and a message of at least 10 characters." }, { status: 422 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE, CONTACT_TO, CONTACT_FROM } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return NextResponse.json(
      { error: "Email delivery is not configured on this server yet. Please email info@zetatech.com.pk directly." },
      { status: 503 },
    );
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    secure: SMTP_SECURE === "true",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    organisation ? `Organisation: ${organisation}` : null,
    `Topic: ${topic}`,
    "",
    message,
  ]
    .filter((l) => l !== null)
    .join("\n");

  try {
    await transporter.sendMail({
      from: CONTACT_FROM || SMTP_USER,
      to: CONTACT_TO || "info@zetatech.com.pk",
      replyTo: `${name} <${email}>`,
      subject: `[zetatech.com.pk] ${topic} — ${name}`,
      text,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact form delivery failed", err);
    return NextResponse.json({ error: "The message could not be delivered. Please try again or email info@zetatech.com.pk." }, { status: 502 });
  }
}
