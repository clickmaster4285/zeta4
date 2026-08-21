import localFont from "next/font/local";

/**
 * Self-hosted type. The Figma file specifies Arial Narrow Bold (display),
 * IBM Plex Mono (labels/buttons) and Avenir Next (body). Arial Narrow and
 * Avenir Next are commercial faces, so the build ships the closest open
 * equivalents — Archivo Narrow and Mulish — served from /src/fonts.
 * To switch to licensed files later, drop the .woff2 in src/fonts and
 * update the `src` paths below; nothing else in the codebase changes.
 */
export const archivoNarrow = localFont({
  src: [{ path: "../fonts/ArchivoNarrow-700.woff2", weight: "700", style: "normal" }],
  variable: "--font-archivo-narrow",
  display: "swap",
  fallback: ["Arial Narrow", "Roboto Condensed", "sans-serif"],
  adjustFontFallback: "Arial",
});

export const plexMono = localFont({
  src: [
    { path: "../fonts/IBMPlexMono-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/IBMPlexMono-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "monospace"],
});

export const mulish = localFont({
  src: [
    { path: "../fonts/Mulish-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Mulish-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/Mulish-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-mulish",
  display: "swap",
  fallback: ["Avenir Next", "Segoe UI", "system-ui", "sans-serif"],
});
