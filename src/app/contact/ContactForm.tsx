"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import styles from "./Contact.module.css";

const TOPICS = [
  { value: "connectivity", label: "Connectivity & LDI" },
  { value: "cloud", label: "Cloud Computing & Data Centre" },
  { value: "cpaas", label: "CPaaS / Zekli" },
  { value: "voice", label: "Wholesale Voice" },
  { value: "a2p", label: "A2P Messaging" },
  { value: "products", label: "ConnectHub / CloudHub" },
  { value: "careers", label: "Careers" },
  { value: "other", label: "Something else" },
];

type Status = { state: "idle" } | { state: "sending" } | { state: "sent" } | { state: "error"; message: string };

export default function ContactForm() {
  const params = useSearchParams();
  const preset = params.get("topic");
  const initialTopic = TOPICS.some((t) => t.value === preset) ? (preset as string) : "connectivity";
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json.error || "The message could not be sent.");
      setStatus({ state: "sent" });
      form.reset();
    } catch (err) {
      setStatus({ state: "error", message: err instanceof Error ? err.message : "The message could not be sent." });
    }
  }

  if (status.state === "sent") {
    return (
      <div className={styles.form} role="status">
        <p className="overline">Message received</p>
        <p className={styles.success}>Thanks — the team has your note and will reply from info@zetatech.com.pk.</p>
        <button type="button" className="btn btn--ghost" onClick={() => setStatus({ state: "idle" })}>
          Send another
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.row}>
        <label className={styles.field}>
          <span className="label">Name</span>
          <input name="name" type="text" autoComplete="name" required maxLength={120} />
        </label>
        <label className={styles.field}>
          <span className="label">Work email</span>
          <input name="email" type="email" autoComplete="email" required maxLength={160} />
        </label>
      </div>
      <div className={styles.row}>
        <label className={styles.field}>
          <span className="label">Organisation</span>
          <input name="organisation" type="text" autoComplete="organization" maxLength={160} />
        </label>
        <label className={styles.field}>
          <span className="label">Topic</span>
          <select name="topic" defaultValue={initialTopic}>
            {TOPICS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className={styles.field}>
        <span className="label">Message</span>
        <textarea name="message" rows={6} required maxLength={4000} />
      </label>
      {/* Honeypot: hidden from people, filled by bots */}
      <label className={styles.honey} aria-hidden="true">
        Company website
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      {status.state === "error" && (
        <p className={styles.error} role="alert">
          {status.message}
        </p>
      )}

      <button type="submit" className="btn btn--primary" disabled={status.state === "sending"}>
        {status.state === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
