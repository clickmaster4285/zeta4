# Zeta Technologies — corporate website

Next.js build of the Figma design **"Zeta Technologies — Sovereign Digital Infrastructure"**
(file `JXnE8JFng2ZH9Abjqcaj9c`, page *Design 2*, frame `622:679`) with both mega menus
(`669:320`, `671:514`), a contact page and everything needed to run it on a Hostinger VPS.

| | |
|---|---|
| Framework | Next.js 15.5 (App Router, React 19, TypeScript), `output: "standalone"` |
| Styling | CSS Modules + design tokens in `src/app/globals.css` — no Tailwind, no runtime CSS |
| Fonts | Self-hosted in `src/fonts` (Archivo Narrow, IBM Plex Mono, Mulish) via `next/font/local` |
| Images | `next/image` with `sharp`; sources in `public/images` (WebP, ~1.5 MB total) |
| Email | `/api/contact` route handler → SMTP via `nodemailer` |
| Runtime on VPS | Node 22 + PM2 behind Nginx, TLS from Let's Encrypt (Certbot) |

---

## 1. Run locally

```bash
npm ci            # Node 20.9+ (22 recommended)
cp .env.example .env
npm run dev       # http://localhost:3000
```

Production check:

```bash
npm run build && npm run start
```

## 2. Project layout

```
src/
  app/
    layout.tsx            metadata, fonts, global CSS
    page.tsx              homepage (assembles the sections) + Organization JSON-LD
    globals.css           design tokens, base styles, shared utilities (.container, .btn, .display…)
    fonts.ts              next/font/local declarations
    contact/              /contact page + ContactForm (client) + styles
    api/contact/route.ts  POST handler: validation, honeypot, rate-limit, SMTP delivery
    sitemap.ts robots.ts not-found.tsx icon.png
  components/
    Header.tsx/.module.css   fixed header, text-roll nav, Services/Products mega menus, mobile drawer
    Footer.tsx/.module.css
    NetworkCanvas.tsx        3D node-network fly-through behind the hero (canvas 2D)
    Tilt.tsx/.module.css     pointer-driven 3D tilt primitive used by product and service media
    sections/                Hero, Credentials, About, Partners, Services, Stack (CSS 3D), Products,
                             Insights, ClosingCta + Home.module.css
  lib/
    content.ts            EVERY piece of copy, link and image reference on the site
    site.ts               company constants (name, email, phone, address, URL)
  fonts/                  .woff2 files
public/images             exported + optimised Figma assets
deploy/                   nginx.conf, setup-vps.sh, deploy.sh
ecosystem.config.cjs      PM2 process definition
Dockerfile                optional container route
```

### Editing content

All text, links and image paths live in `src/lib/content.ts`; company details in `src/lib/site.ts`.
Components never hard-code copy, so a wording change is a one-line edit there.

## 3. Environment variables

See `.env.example`.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used in metadata, sitemap and robots (`https://zetatech.com.pk`) |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` | Outbound mail for the contact form (Hostinger mail, Google Workspace, SES, etc.) |
| `CONTACT_TO` | Inbox that receives form submissions (default `info@zetatech.com.pk`) |
| `CONTACT_FROM` | From header, e.g. `"Zeta Website <no-reply@zetatech.com.pk>"` |

Until SMTP is configured the form returns a clear "delivery not configured" message instead of failing silently.

## 4. Deploy to the Hostinger VPS (PM2 + Nginx)

One-time server preparation (Ubuntu 22.04/24.04, as root):

```bash
# upload the project, or clone it
git clone <repo> /var/www/zeta-web
cd /var/www/zeta-web
bash deploy/setup-vps.sh zetatech.com.pk /var/www/zeta-web
```

`setup-vps.sh` installs Node 22, PM2, Nginx and Certbot, opens ports 22/80/443 in UFW, and
installs the Nginx site from `deploy/nginx.conf` (reverse proxy to `127.0.0.1:3000`).

Point the DNS **A** records for `zetatech.com.pk` and `www.zetatech.com.pk` at the VPS IP, then:

```bash
cd /var/www/zeta-web
cp .env.example .env && nano .env        # fill in SMTP + site URL
./deploy/deploy.sh                        # npm ci → next build → assemble standalone → pm2 start
certbot --nginx -d zetatech.com.pk -d www.zetatech.com.pk   # HTTPS + auto-renewal
```

`deploy.sh` is idempotent — run it again after every update (`git pull && ./deploy/deploy.sh`).
PM2 keeps the process alive and restarts it on reboot (`pm2 save` is run for you).

Useful commands:

```bash
pm2 status                # process health
pm2 logs zeta-web         # server logs
pm2 reload zeta-web       # zero-downtime restart
nginx -t && systemctl reload nginx
```

### Docker alternative

```bash
docker build -t zeta-web .
docker run -d --name zeta-web --restart unless-stopped -p 127.0.0.1:3000:3000 --env-file .env zeta-web
```

Keep the same Nginx site in front of it.

## 5. Design notes — where the build deliberately differs from the Figma file

* **Typefaces.** Figma specifies Arial Narrow Bold, IBM Plex Mono and Avenir Next. Arial Narrow and
  Avenir Next are commercial, so the build ships **Archivo Narrow** (measured against the Figma text
  nodes: "Connectivity" 149/149 px, "Regional Network" 225/226 px — a metric match) and **Mulish**.
  To switch to licensed files, drop the `.woff2` into `src/fonts` and change the paths in
  `src/app/fonts.ts`; nothing else changes.
* **Hero backdrop.** The hero image layers are hidden in the Figma file, and the frame carries a
  hidden `Canvas` layer with the cue "Scroll through the network". The build renders a 3D node
  network under the designed tint and gradients — see §6.
* **Products heading** is allowed 713 px so "INFRASTRUCTURE." no longer breaks mid-word as it does
  in the 457 px Figma box.
* **Product "Explore" links** were white text on the off-white section in Figma (invisible); they are
  rendered as dark outline buttons and point to the live product domains
  (connecthub.zetatech.com.pk, cloudhub.zetatech.com.pk, zekli.com).
* **Partner wordmarks** for Telenor, REDtone and Transworld were masked in `#333` in Figma; the
  exported PNGs were recoloured to light grey so they read on the dark band.
* **Navigation targets.** Only the homepage exists in the design, so About/Services/Products/
  Blogs & Events resolve to homepage anchors, Careers to `/contact?topic=careers`, and every
  "Talk to Zeta" to `/contact`. Terms & Privacy in the footer are plain text until those pages exist.
* **Sovereign Intelligence Stack** is built in real CSS 3D rather than the flattened
  rotate/skew transform stored in Figma — see §6.

## 6. Depth & motion (the "3D pass")

Everything below is progressive enhancement: it is skipped entirely under
`prefers-reduced-motion: reduce`, pointer-driven effects only attach on fine-pointer (mouse/trackpad)
devices, and nothing adds a dependency or measurable bundle weight.

| Where | What happens | Implementation |
|---|---|---|
| Hero | Camera flies through a 3D network: slow ambient drift, advances with scroll, pointer parallax. Nodes passing the camera respawn at the far plane, so the flight is endless both ways. | `components/NetworkCanvas.tsx` — canvas 2D with a pinhole projection; links are tested in 3D. Paused when the tab is hidden or the hero is off-screen. Tuning constants (`NEAR`, `FAR`, `DRIFT`, `SCROLL_GAIN`) at the top of the file. |
| Hero copy | Headline recedes slightly slower than the page as you scroll, which sells the flight behind it. | CSS scroll-driven animation (`animation-timeline: scroll()`), wrapped in `@supports`; browsers without it simply scroll normally. |
| Stack | Five planes in genuine perspective (`rotateX`/`rotateZ`, each layer on its own `translateZ`). The active layer lifts and glows; the list, the "Explore" button and an ambient cycle drive it; the whole stack tilts a few degrees toward the cursor. | `sections/Stack.tsx` + `.planes/.plane` in `Home.module.css`. Geometry is in `cqw` units so it scales with its column; tilt is written to `--tilt-x/--tilt-y` CSS variables without React re-renders. |
| Products | Media tilts as a card toward the cursor with a soft specular highlight. | `<Tilt max={5} scale={1.025} glare>` |
| Services | Card imagery tilts and drifts toward the cursor while the card is hovered. | `<Tilt listen="parent" max={7} shift={10}>` |

`components/Tilt.tsx` is the shared primitive: pointer-driven `perspective/rotateX/rotateY/translate3d`,
written straight to the DOM inside `requestAnimationFrame`.

## 7. Follow-ups the client will likely want

1. Inner pages (About, Services detail, Products, Blogs & Events, Careers) — the tokens and
   section components are ready to be reused.
2. Terms & Conditions and Privacy pages; then link them from `FOOTER.legal` in `content.ts`.
3. A CMS or MDX source for Insights once articles exist (the list is static copy today).
4. SMTP credentials for the contact form, and an analytics snippet if required.
