#!/usr/bin/env bash
# Build and (re)start the site. Run from the project root on the VPS after each update:
#   git pull && ./deploy/deploy.sh
set -euo pipefail
cd "$(dirname "$0")/.."

export NEXT_TELEMETRY_DISABLED=1

echo "==> Installing dependencies"
npm ci --no-audit --no-fund

echo "==> Building"
npm run build

# Standalone output does not copy public/ or .next/static — do it here so the
# bundled server can serve them (see https://nextjs.org/docs/app/api-reference/config/next-config-js/output).
echo "==> Assembling standalone bundle"
rm -rf .next/standalone/public .next/standalone/.next/static
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
# Copy environment so the standalone server picks it up
[ -f .env ] && cp .env .next/standalone/.env || true

echo "==> Restarting with PM2"
if pm2 describe zeta-web >/dev/null 2>&1; then
  pm2 reload ecosystem.config.cjs --update-env
else
  pm2 start ecosystem.config.cjs
fi
pm2 save
echo "==> Live on http://127.0.0.1:3000 (behind Nginx)"
