# Verification record

Rechecked 20 October 2026 in headless Chrome using a separate temporary browser profile. Desktop widths and mobile viewport emulation were exercised; this is not a physical-device or Safari certification.

**32 browser checks passed.** The checks covered:

- All six materials, category counts, detail dialog, Escape dismissal and material/service selection into the brief.
- Wall-layer buttons, full finish reveal and arrow-key navigation between layers.
- Inspiration image and text switching.
- Required fields, invalid email rejection, next/back navigation and preservation of earlier selections.
- Successful brief assembly, safe plain-text rendering of visitor notes, accurate demo messaging, real text-file download, clipboard success/fallback behaviour and reset.
- Loaded local images and fonts.
- No horizontal overflow at 1440, 1024, 768, 390 and 320 CSS pixels; mobile menu behaviour and dialog fit at 320 pixels.
- No uncaught JavaScript exceptions or third-party network requests during the tested journey.

Static validation passed for unique element IDs, section anchors, referenced local assets, SVG XML and WOFF2 font signatures. A separate `file://` smoke check confirmed that the catalogue, fonts, material dialog and quote preselection work when opening `index.html` directly.

Evidence: [browser check results](browser-checks.json). Previews: [desktop](desktop-preview.png), [mobile](mobile-preview.png).

Production email/CRM delivery, a custom domain and GitHub deployment were not tested because they are not configured in this demo. It creates a local project brief. Check a real client deployment and the chosen delivery integration before accepting live enquiries.
