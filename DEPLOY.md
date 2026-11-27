# Deploying to your own Caddy server

The site is a TanStack Start app: it needs a small Node server, not a folder of static
files. The build produces a standalone `.output` directory; Caddy runs in front of it as
a reverse proxy and handles HTTPS.

This project has no login, no database and no server functions, so **no environment
variables are required** for the build or at runtime.

## 1. Server prerequisites

- Node.js 22 (the build was made with Node 22)
- Bun (or npm) for installing dependencies
- Git, Caddy

```sh
node -v   # v22.x
caddy version
```

## 2. Get the code and build

```sh
git clone <your-repo-url> /var/www/kehlchen
cd /var/www/kehlchen
bun install
NITRO_PRESET=node-server bun run build
```

`NITRO_PRESET=node-server` tells the build to target a plain Node server instead of the
default Cloudflare target. The result is `.output/server/index.mjs` plus its assets.

If you prefer to pin the preset in the repo, add `nitro: { preset: "node-server" }` to the
`defineConfig({ ... })` call in `vite.config.ts`. Leave it out if you also publish through
Lovable — Lovable's own build picks its target automatically.

## 3. Run it once and check

```sh
PORT=3000 HOST=127.0.0.1 node .output/server/index.mjs
```

In another terminal:

```sh
curl -I http://127.0.0.1:3000
curl -s http://127.0.0.1:3000 | head -20
```

You should see `200` and the page HTML with your project names. Stop with Ctrl+C.

Bind to `127.0.0.1` only — Caddy is the public entry point, port 3000 stays internal.

## 4. Keep it running with systemd

Create `/etc/systemd/system/kehlchen.service`:

```ini
[Unit]
Description=kehlchen portfolio
After=network.target

[Service]
Type=simple
WorkingDirectory=/var/www/kehlchen
Environment=PORT=3000
Environment=HOST=127.0.0.1
ExecStart=/usr/bin/node /var/www/kehlchen/.output/server/index.mjs
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
```

Adjust the `node` path if you use nvm (`which node`). Then:

```sh
sudo systemctl daemon-reload
sudo systemctl enable --now kehlchen
sudo systemctl status kehlchen
```

## 5. Caddy as reverse proxy

Append to `/etc/caddy/Caddyfile`:

```caddy
kehlchen.example.com {
    encode gzip zstd
    reverse_proxy 127.0.0.1:3000
}
```

Caddy requests and renews the TLS certificate automatically. Validate and reload:

```sh
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

Do not add a static-file fallback such as `try_files ... /index.html` or `file_server`:
the Node server handles routing, including the 404 page.

## 6. Update after changing content

Content edits happen in `src/config/portfolio.ts` (or via
`go run scripts/add-project.go`). Then on the server:

```sh
cd /var/www/kehlchen
git pull
bun install
NITRO_PRESET=node-server bun run build
sudo systemctl restart kehlchen
```

## 7. Notes

- Binary downloads point at external URLs (GitHub releases). If you move them, update the
  `download` fields in `src/config/portfolio.ts`.
- The Go helper is a local authoring tool; it is not needed on the server.
- Keep port 3000 closed in your firewall so only Caddy (80/443) is reachable.
