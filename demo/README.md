# Cedar & Stone — composition demo

Live demo: [koushik2002.github.io/cedar-stone/demo/](https://koushik2002.github.io/cedar-stone/demo/)

A fresh implementation of the reference reel's visual sequence: compact dark navigation, an interactive wall, twelve large material boards, illustrated services, four process rows, a physical measuring tape and a compact project form.

The palette is deep navy, slate blue, warm ivory and yellow. The headings use Lora; supporting text uses DM Sans. This demo uses original content, textures and code. The reference footage and screenshots are not distributed.

Open `index.html` directly or serve the repository with `python3 -m http.server 8000`, then visit `/demo/`. There is no installation, build step, dependency or external runtime request.

## Interactions

- Move the mouse across the opening wall, or use **Try a plaster stroke**.
- Scroll through the three coats, or select a stage. Arrow keys, Home and End also work when a stage button is focused.
- Explore full-wall texture and colour, then keep a finish for the project brief.
- Scroll through the material boards; arrows, Home/End, filters and material dialogs are available. Selecting a sample carries the relevant service and material into the form.
- Watch the process rows fill as they enter view.
- Extend and retract the measuring tape by scrolling, dragging its range control, or using arrow keys in the tape region. Nine fictional places are shown along 0–40 illustrative kilometres.
- Complete the compact form to create a local brief, download/copy it or reset.
- Reduced-motion preferences and short viewports use normal page scrolling and native horizontal exploration instead of pinned scenes.

**Demo boundary:** Cedar & Stone and all service-area places are fictional. Materials and colours are illustrative, not product specifications. The project form creates a brief in page memory; it does not send an enquiry or persist visitor data. Copy depends on browser permissions and has a download fallback.

## Design and verification

The [design plan](../docs/DEMO-DESIGN-PLAN.md) records the structure and composition decisions made before implementation. [Verification and previews](../docs/composition-demo/QA.md) record 80 passing browser checks and the browser limits.

## Files

- `index.html`: structure, copy, illustrations and form.
- `demo.css`: colour/type system, scenes and responsive layout.
- `demo.js`: material data, scroll scenes, controls, dialogs and local brief.
- `assets/`: original SVG textures, local fonts and licenses.

## Fonts and artwork

Lora is bundled from [Google Fonts' official repository](https://github.com/google/fonts/tree/main/ofl/lora), under the included `assets/Lora-OFL.txt`. DM Sans is bundled locally with `assets/DM-Sans-OFL.txt`. All seventeen SVG assets and inline illustrations are original procedural artwork for this demo. No third-party photographs are used.
