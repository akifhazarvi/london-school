# London School System

Cambridge-affiliated school website in Lahore. AI learning, robotics lab, 25+ sports, and a nurturing environment.

**Live site:** https://akifhazarvi.github.io/london-school/

---

## Quick Start (Local Development)

```bash
# Clone the repo
git clone https://github.com/akifhazarvi/london-school.git
cd london-school

# Start the dev server (with content editor API)
python3 server.py
```

Then open:
- **http://localhost:8080/** — the live website
- **http://localhost:8080/editor.html** — the visual content editor

---

## Visual Content Editor

The site includes a built-in visual content editor at `/editor.html`.

### How to edit content

1. Start the dev server: `python3 server.py`
2. Open **http://localhost:8080/editor.html**
3. Click **"Edit Content"** in the toolbar
4. Click any text on the page — headings, paragraphs, prices, testimonials, etc.
5. Type your changes directly
6. Changes auto-save to `content.json` on disk
7. Open **http://localhost:8080/** to see changes live

### What you can edit
- All headings, section titles, descriptions
- Hero text, badges, trust labels
- Program names, descriptions, pills
- About section values and descriptions
- Campus tile captions
- Testimonial quotes, names, roles
- Fee tiers, prices, features
- CTA text, contact details
- Footer text and links
- Button labels
- Proof bar numbers and labels

### Keyboard shortcuts
- **Ctrl/Cmd + S** — Save immediately
- **Reset button** — Revert all changes to original

---

## Deploying Content Changes

After editing content locally:

```bash
# 1. Your edits are in content.json — commit it
git add content.json
git commit -m "Update website content"

# 2. Push to GitHub — site auto-deploys via GitHub Actions
git push
```

The site will be live at https://akifhazarvi.github.io/london-school/ within ~1 minute.

### Important: content.json must be committed for production

By default, `content.json` is in `.gitignore` (to avoid accidental commits during development). When you're ready to publish your edits:

```bash
# Force-add content.json (overrides .gitignore)
git add -f content.json
git commit -m "Publish content edits"
git push
```

---

## Using a Custom Domain

To use your own domain (e.g., `londoneducation.pk`):

1. **Add a CNAME file** to the repo root:
   ```
   londoneducation.pk
   ```

2. **Configure DNS** at your domain registrar:
   - Add a `CNAME` record: `www` → `akifhazarvi.github.io`
   - Add `A` records for apex domain:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```

3. **Enable HTTPS** in GitHub repo → Settings → Pages → Enforce HTTPS

4. **Update URLs** in these files:
   - `index.html` — OG image URLs
   - `sitemap.xml` — site URL
   - `robots.txt` — sitemap URL

---

## Project Structure

```
london-school/
├── index.html              # Main website (single page)
├── editor.html             # Visual content editor
├── content.json            # Saved content edits (created by editor)
├── server.py               # Local dev server with save API
├── 404.html                # Custom 404 page
├── robots.txt              # Search engine directives
├── sitemap.xml             # XML sitemap
├── css/
│   ├── design-system.css   # Design tokens, reset, base components
│   ├── sections.css        # Per-section layouts
│   └── blobs.css           # Organic blob decorations
├── js/
│   ├── main.js             # Nav, mobile menu, animations, chatbot
│   ├── content-loader.js   # Loads saved content (shared by both pages)
│   └── editor.js           # Editor toolbar and editing logic
├── img/                    # All images (optimized JPG/PNG)
└── .github/
    └── workflows/
        └── deploy.yml      # Auto-deploy to GitHub Pages on push
```

---

## Tech Stack

- **HTML5** — Semantic, single-page structure
- **CSS3** — Custom properties (design tokens), no preprocessor
- **Vanilla JavaScript** — No frameworks, no build tools
- **Google Fonts** — Nunito (headings), Inter (body)
- **GitHub Pages** — Static hosting with auto-deploy
- **Python** — Simple dev server for local editing (not needed in production)

---

## Design System

| Token | Color | Use |
|-------|-------|-----|
| `--red` | `#C1353D` | CTAs, action buttons, highlights |
| `--sage` | `#7AC39E` | Trust, success, growth |
| `--peach` | `#F2D5C5` | Warmth, nurture, soft accents |
| `--navy` | `#2F5581` | Authority, headings, footer |

All spacing uses `--s-*` tokens (4px grid), radii use `--r-*`, shadows use `--sh-*`.

Responsive breakpoints: 900px, 768px, 600px, 480px.
