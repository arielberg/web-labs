// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const telephonyTarget = 'https://162-35-181-76.sslip.io:8443';

/** @returns {import('vite').Plugin} */
function telephonyDevProxy() {
  return {
    name: 'telephony-dev-proxy',
    configureServer(server) {
      /** @type {import('connect').NextHandleFunction} */
      const handler = async (req, res, next) => {
        const raw = req.url || '';
        if (!raw.startsWith('/telephony')) return next();

        try {
          const path = raw.replace(/^\/telephony/, '') || '/';
          const target = new URL(path, telephonyTarget);
          console.log('[telephony-proxy]', req.method, raw, '→', target.href);

          const chunks = [];
          for await (const chunk of req) chunks.push(chunk);
          const body = chunks.length ? Buffer.concat(chunks) : undefined;

          const upstream = await fetch(target, {
            method: req.method || 'GET',
            headers: {
              accept: req.headers.accept || 'application/json',
              'content-type': req.headers['content-type'] || 'application/json',
              ...(req.headers.authorization
                ? { authorization: String(req.headers.authorization) }
                : {}),
            },
            body: req.method === 'GET' || req.method === 'HEAD' ? undefined : body,
            // @ts-expect-error Node fetch duplex
            duplex: body ? 'half' : undefined,
          });

          res.statusCode = upstream.status;
          upstream.headers.forEach((value, key) => {
            if (['transfer-encoding', 'connection', 'content-encoding'].includes(key)) return;
            res.setHeader(key, value);
          });
          res.end(Buffer.from(await upstream.arrayBuffer()));
        } catch (err) {
          console.error('[telephony-proxy]', err);
          res.statusCode = 502;
          res.setHeader('content-type', 'application/json');
          res.end(JSON.stringify({ error: 'telephony_proxy_failed' }));
        }
      };

      // Prepend so Astro's HTML/404 handler does not swallow /telephony/*
      return () => {
        server.middlewares.stack.unshift({
          route: '',
          handle: handler,
        });
      };
    },
  };
}

export default defineConfig({
  site: 'https://w3b-labs.com',
  trailingSlash: 'always',
  integrations: [sitemap()],
  i18n: {
    defaultLocale: 'he',
    locales: ['he', 'en'],
  },
  devToolbar: {
    enabled: false,
  },
  vite: {
    plugins: [telephonyDevProxy()],
  },
});
