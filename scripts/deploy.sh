#!/bin/bash
set -e

STATIC_DIR="/var/www/buppers-coffee-shop"
API_DIR="/home/justinszaro/Projects/feathers-api"

echo "==> Pulling latest..."
git pull

echo "==> Installing dependencies..."
pnpm install --no-frozen-lockfile

echo "==> Building Buppers Coffee Shop app..."
pnpm run build

echo "==> Syncing static files..."
sudo rsync -a --delete build/client/ "$STATIC_DIR"

sudo cp nginx.conf /etc/nginx/sites-available/buppers.justinszaro.com
sudo ln -sf /etc/nginx/sites-available/buppers.justinszaro.com /etc/nginx/sites-enabled/buppers.justinszaro.com
sudo nginx -t
sudo systemctl reload nginx

# --- Feathers API ---
echo "==> Deploying Feathers API..."
bash "$API_DIR/scripts/deploy.sh"

echo "==> Done."
