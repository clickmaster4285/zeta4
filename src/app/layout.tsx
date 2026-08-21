import type { Metadata, Viewport } from "next";
import { archivoNarrow, plexMono, mulish } from "./fonts";
import { SITE, SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.name} — Sovereign Digital Infrastructure`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "Zeta Technologies",
    "LDI operator Pakistan",
    "terrestrial cable landing station",
    "sovereign cloud Pakistan",
    "data centre Islamabad",
    "CPaaS Pakistan",
    "wholesale voice",
    "A2P messaging",
    "ConnectHub",
    "CloudHub",
    "Zekli",
  ],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — Sovereign Digital Infrastructure`,
    description: SITE.description,
    url: SITE_URL,
    locale: "en_PK",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Sovereign Digital Infrastructure`,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#02060d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivoNarrow.variable} ${plexMono.variable} ${mulish.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
