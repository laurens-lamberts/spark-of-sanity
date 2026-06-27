# TODO

## Connect sparkofsanity.nl domain to GitHub Pages

1. **Add CNAME back** — create `public/CNAME` with content `sparkofsanity.nl`
2. **Update vite base** — change `base: '/spark-of-sanity/'` back to `base: '/'` in `vite.config.js`
3. **Configure DNS** at your domain registrar — add these records:
   - `A` records pointing `@` to GitHub Pages IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - `CNAME` record pointing `www` to `laurens-lamberts.github.io`
4. **GitHub repo settings** — go to Settings → Pages → Custom domain, enter `sparkofsanity.nl`, save
5. **Enable HTTPS** — after DNS propagates, tick "Enforce HTTPS" in the same settings page
6. **Commit & push** — CI will redeploy with the CNAME file included in the build
