#!/usr/bin/env bash
# One-time VPS preparation (Ubuntu 22.04/24.04 on Hostinger). Run as root or with sudo.
set -euo pipefail

DOMAIN="${1:-zetatech.com.pk}"
APP_DIR="${2:-/var/www/zeta-web}"

echo "==> Installing Node.js 22, Nginx, Certbot, PM2"
apt-get update -y
apt-get install -y curl git nginx ufw
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt-get install -y nodejs
npm install -g pm2
apt-get install -y certbot python3-certbot-nginx

echo "==> Firewall: allow SSH + HTTP/HTTPS"
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

echo "==> App directory: $APP_DIR"
mkdir -p "$APP_DIR"

echo "==> Nginx site for $DOMAIN"
SITE=/etc/nginx/sites-available/$DOMAIN
sed "s/zetatech.com.pk/$DOMAIN/g" "$(dirname "$0")/nginx.conf" > "$SITE"
ln -sf "$SITE" /etc/nginx/sites-enabled/$DOMAIN
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

echo "==> PM2 starts on boot"
pm2 startup systemd -u "$(logname 2>/dev/null || echo root)" --hp "$HOME" >/dev/null || true

cat <<MSG

Done. Next steps:
  1. Point the DNS A record for $DOMAIN (and www) at this server's IP.
  2. Upload or clone the project into $APP_DIR and run deploy/deploy.sh
  3. Issue the certificate:  certbot --nginx -d $DOMAIN -d www.$DOMAIN
MSG
