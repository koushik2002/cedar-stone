# Cedar & Stone — Bengaluru exterior demo

Live demo: [koushik2002.github.io/cedar-stone/demo/](https://koushik2002.github.io/cedar-stone/demo/)

An original, research-informed Bengaluru adaptation of the material-led interaction sequence in the reference reel. Cedar & Stone remains a fictional concept brand.

## What was rebuilt

- A Bengaluru identity, Kannada city label and garden-green, stone, clay and gold palette.
- A masonry wall with independent pointer/button plaster, followed by scroll-driven preparation, primer and finish stages. This is an illustration, not an installation specification.
- Twelve material directions: four exterior paint colours, four surface textures, and four brick/jali/stone directions. The catalogue retains continuous horizontal movement, filters, keyboard controls and detailed sample dialogs.
- Colour/texture exploration on the whole wall, with a courtyard-house palette illustration that changes with the selected finish.
- Services and process copy addressing exterior repainting, cracks/dampness assessment, textured walls, brick/jali, compound walls/parapets, stone details, access and weather planning.
- A physical measuring-tape neighbourhood explorer using nine real Bengaluru places and approximate straight-line distances from Cubbon Park. A selector copies the neighbourhood into the brief. Caption collisions are handled without changing the distance scale.
- A local brief with neighbourhood, property type, work, material direction, optional PIN/contact/surface condition, apartment coordination prompt, notes, download, copy and reset.
- Reduced-motion, keyboard and short-viewport alternatives.

The [research and rebuild plan](../docs/BENGALURU-RESEARCH-PLAN.md) links IMD, IIM Bangalore, IISc, a manufacturer masonry-coating reference and every geographic source. It distinguishes evidence from design interpretation. The [geography source record](assets/bengaluru-geography.json) includes the origin, point coordinates, source URLs and calculation method.

## Run locally

There is no installation, build step or external runtime dependency. Open `index.html` directly, or serve the repository with:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000/demo/`.

## Demo boundary

The brand is fictional; an actual contractor, address, phone number, WhatsApp account, prices, reviews and completed projects have not been invented. The neighbourhoods are real, but distances are approximate radial point-to-point calculations, not driving distances or verified business service coverage. Material surfaces and the house illustration are original visual studies, not manufacturer samples or completed work.

The form builds a brief in page memory. It sends no enquiry and saves no visitor data to a server or persistent browser storage. Refreshing clears the brief. Clipboard access depends on browser permissions; downloading works independently. No map, geocoding or weather API runs on the published page.

## Source and assets

`index.html`, `demo.css` and `demo.js` contain the implementation. `assets/` contains original SVG textures, a public geography source record, and local Lora, DM Sans and Noto Sans Kannada fonts with their SIL Open Font License notices.

The reference reel's video and screenshots are not distributed. The older navy composition is preserved in Git history at commit `fbc5970`; the repository root is a separate earlier concept.

See [Bengaluru verification](../docs/bengaluru-demo/QA.md) for current checks and screenshots. The earlier [composition verification](../docs/composition-demo/QA.md) is historical evidence for the prior version.
