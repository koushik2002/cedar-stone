# Cedar & Stone · Contractor website demo

An original, responsive exterior contractor concept built for Koushik to demonstrate to prospective clients. Inspired by the interaction ideas in [this reel by @joebuildswithai](https://www.instagram.com/reel/DendM5Rjk3Y/).

Live website: [koushik2002.github.io/cedar-stone/](https://koushik2002.github.io/cedar-stone/) · Source: [koushik2002/cedar-stone](https://github.com/koushik2002/cedar-stone)

![Desktop preview of Cedar and Stone](docs/desktop-preview.png)

The reference was inspected through its public caption, thumbnail and video frames. It shows **Lath & Lap Exteriors**: a stucco/siding website with a wall-coating interaction, material samples, service navigation and a tape-measure service-area section. This demo uses an original brand, layout, text, textures and implementation. No reference footage or screenshots are distributed in the site.

## Open the demo

Double-click **index.html**. There is no installation or build step. For a local HTTP preview, run from this folder:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## What works

- Responsive navigation and layouts for desktop and mobile.
- Four-layer wall explorer, controlled with buttons or a keyboard/touch accessible slider.
- Six original material textures, category filters and material detail dialogs.
- Select a material and carry it into the project brief.
- Three switchable home inspiration concepts.
- Expandable FAQs.
- Three-step project brief with field validation, back navigation, downloadable text, clipboard copy and reset.
- Local fonts and imagery; the site makes no third-party requests during use.

**Demo boundary:** Cedar & Stone is fictional. Photography is stock inspiration, not completed work. The brief is held in page memory and is not sent or saved to a server. Refreshing clears it. Clipboard access depends on browser permissions; downloading works independently. There is no booking system, email delivery, CRM, admin dashboard or verified service territory.

## Put it on GitHub Pages

1. Create a repository, for example `cedar-stone`. A public repository works with GitHub Free.
2. Upload **the contents of this folder** to the repository root. `index.html`, `styles.css`, `app.js` and `assets/` must sit at that root, rather than inside an extra `cedar-stone` folder. Include `.nojekyll` if using Git; a browser upload may omit hidden files, but this simple site also works with the default Jekyll processing.
3. Open **Settings → Pages**. Under **Build and deployment**, select **Deploy from a branch**.
4. Choose **main** and **/(root)**, then save.
5. When deployment completes, use **Visit site**. Your link follows this pattern: `https://koushik2002.github.io/cedar-stone/`.

All asset links are relative, so the demo supports a GitHub Pages repository subdirectory. No API keys, environment variables, npm packages or GitHub Actions file are needed.

Optional terminal route, after creating an empty repository:

```sh
cd /path/to/cedar-stone
git init -b main
git add .
git commit -m "Add Cedar and Stone contractor demo"
git remote add origin https://github.com/koushik2002/cedar-stone.git
git push -u origin main
```

The deployment repository is `koushik2002/cedar-stone`, with Pages publishing from `main` at the repository root.

GitHub references: [publish from a branch](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), [create a Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site). Checked 18 October 2026.

## Show it to a client

Use the [client pitch and delivery plan](docs/CLIENT-PITCH-PLAN.md). It includes a two-minute walkthrough, an outreach draft, scope options, proposed example pricing and a delivery schedule. [Reference analysis](docs/REFERENCE-ANALYSIS.md) separates observations from the pitch interpretation.

Validation: **32 browser checks passed**, plus static asset checks and a direct-file smoke check. See the [QA record](docs/QA.md) and [mobile preview](docs/mobile-preview.png).

## Personalise for a real business

| Change | Where |
| --- | --- |
| Brand, positioning, navigation, FAQs, process | `index.html` |
| Colours, spacing, type sizes, breakpoints | CSS variables and rules in `styles.css` |
| Materials and inspiration content | `materials` and `projects` at the top of `app.js` |
| Photographs and textures | `assets/` |
| Website creator credit | Concept bar and footer in `index.html` |
| Form questions and delivery behaviour | `index.html` and the form handlers in `app.js` |

Before a real launch, replace the fictional identity and illustrative samples, add approved project photographs, confirm contact details and service territory, and connect/test the chosen enquiry delivery service. Do not label an enquiry as sent until the endpoint confirms it. Keep credentials out of the frontend. Confirm client-specific privacy, assembly, warranty and product claims before publishing them.

## Files

```text
index.html            Website
styles.css            Responsive design
app.js                Catalogue, wall explorer, navigation and brief
assets/               Local photos, SVG textures, fonts and license notices
docs/                 Pitch plan, source analysis, asset credits and QA record
.nojekyll             Bypass Jekyll when included in the publishing source
```

See [asset credits](docs/ASSET-CREDITS.md) for third-party assets and their terms. The source is prepared for a portfolio demonstration; production services require a separate scope.
