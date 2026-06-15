# Hudson's Notes

A minimalist, single-page static site for sharing course study notes, hosted on GitHub Pages at **hudsonwang.com**.

Everything lives in `index.html` (HTML + CSS + content, no build step). The notes themselves are plain HTML strings inside the `<script>` block — to publish a new note, add an `html` field to the relevant note object in the `SECTIONS` array.

## Files

| File | Purpose |
|------|---------|
| `index.html` | The whole site. |
| `CNAME` | Tells GitHub Pages to serve the site at `hudsonwang.com`. |
| `.nojekyll` | Disables Jekyll so files are served as-is. |

## Deploy to GitHub Pages

1. Create a repo on GitHub (e.g. `hudson/hudsonwang.com`) and push these files to the `main` branch:
   ```sh
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin git@github.com:<your-username>/<repo>.git
   git push -u origin main
   ```
2. In the repo: **Settings → Pages → Build and deployment**. Set **Source** to *Deploy from a branch*, branch `main`, folder `/ (root)`. Save.
3. Under **Custom domain**, enter `hudsonwang.com` (the `CNAME` file already sets this). Enable **Enforce HTTPS** once the certificate is issued.

## Point the domain at GitHub Pages (DNS)

At your domain registrar, add these records:

- Apex `hudsonwang.com` → four **A** records:
  `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
  (optionally the matching **AAAA** records for IPv6).
- `www` subdomain → **CNAME** → `<your-username>.github.io`

DNS can take up to ~24h to propagate; the HTTPS certificate is issued automatically afterward.

## Adding a note

Find the note object in `index.html` and give it an `html` field (and a real title):

```js
{ num:"003", title:"My New Note Title", html:`
  <h2>Section heading</h2>
  <p>Body text…</p>
` },
```

Notes without an `html` field automatically show as **"To be updated."**
