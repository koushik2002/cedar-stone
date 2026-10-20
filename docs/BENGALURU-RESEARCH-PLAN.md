# Bengaluru rebuild — research and implementation plan

Researched 20 October 2026. This updates the existing `/demo/` experience; it keeps Cedar & Stone as a fictional concept brand.

## Evidence and design decisions

| Evidence | Source | Decision |
| --- | --- | --- |
| IMD's Bengaluru city table lists 1981–2010 monthly normals: the rainfall distribution is seasonal, with higher totals in August–October than in January–February. These are historical normals, not a forecast. | [IMD climatological table](https://city.imd.gov.in/citywx/extreme/JUL/bengaluru2.htm) | Include sun exposure, rain/dampness assessment, curing/product requirements and weather planning in the project conversation. Do not promise that a decorative finish resolves water ingress. |
| IIM Bangalore describes its stone architecture, green courtyards, corridors and changing light/shadow. | [IIMB architecture](https://www.iimb.ac.in/about-institute/architecture) | Use garden green, warm stone, terracotta and soft gold as an original design interpretation; avoid a generic skyline or borrowed project photographs. |
| IISc documents Bengaluru applications of stabilised earth-block technology and related local materials research. | [IISc Connect](https://connect.iisc.ac.in/2017/10/it-took-many-years-to-develop-these-technologiesbut-today-they-are-helping-society/), [IISc CST](https://cst.iisc.ac.in/bvvr/) | Replace the imported siding/shingle catalogue with paint, plaster textures, brick/jali and stone. Do not label all materials as locally quarried, low-carbon or suitable without product-specific evidence. |
| Asian Paints' published exterior-primer sheet describes preparation and an undercoat/topcoat system for masonry/plaster surfaces. The retrieved sheet is an older manufacturer document; no numerical application specification is copied into the demo. | [Manufacturer data sheet](https://www.asianpaints.com/content/dam/asianpaints/website/products/pis-files-2/exterior-wall-primer.pdf) | Replace metal lath and the North American stucco sequence with an illustrative masonry → preparation → primer → finish sequence. Actual repairs, waterproofing, curing and coats depend on the wall and specified product. No manufacturer affiliation is implied. |
| Public geographic point coordinates identify real Bengaluru neighbourhoods. | Sources in the geography table below | Replace imaginary places with a neighbourhood explorer measured from Cubbon Park. Calculate approximate straight-line distances; explicitly distinguish them from road distance or confirmed business coverage. |

## Proposed visitor experience

1. **Rooted in Bengaluru:** a compact local identity and Kannada city label over a masonry wall. Independent trowel play remains separate from scroll progression.
2. **Prepare, prime, finish:** four visible stages; the final wall offers fine, raised and smooth texture options plus chalk, sand, clay and canopy colours.
3. **A Bengaluru material library:** twelve original samples — four paint colours, four surface textures and four masonry/stone directions. The continuous horizontal track, filtering and sample details remain.
4. **Context before cosmetics:** a short city-specific passage about sun-facing walls, rain entry and material transitions, followed by six relevant service scopes.
5. **A practical project sequence:** assess the wall/moisture; agree real samples and scope; plan access/weather; inspect the finish and handover.
6. **Across Bengaluru:** the physical measuring tape travels through real neighbourhoods. A selector carries the chosen area into the project form. Labels are prevented from colliding where actual distances cluster.
7. **A useful local brief:** area, optional six-digit PIN, property type, requested work, selected finish, contact details and notes. Apartment exteriors get a coordination prompt. The brief stays on-device and can be downloaded/copied; no enquiry is claimed sent.

## Visual direction

Garden green `#223c34`, muted canopy `#3c5548`, stone paper `#f1eadb`, terracotta `#b77252`, and tape/action gold `#e9c16b`. Keep the strong serif/sans contrast, original illustrations and material-led layout. Kannada uses a locally bundled open-license Noto Sans Kannada font. This is a design interpretation of the research, not an assertion that the palette is an official Bengaluru identity.

## Geography and limits

Origin: Cubbon Park, latitude 12.975, longitude 77.5933333333, from [Wikidata Q3633776](https://www.wikidata.org/wiki/Q3633776). Distances use the haversine formula with Earth radius 6371 km, rounded to 0.1 km. Neighbourhoods span large areas; the selected coordinates are representative points. They are not property addresses or verified service boundaries. The tape is a radial distance story, not one continuous driving route. Direction captions are inferred from the representative coordinate points. Captions are hidden when real distances would make their labels collide; the neighbourhood selector and equivalent text list retain every place.

| Neighbourhood | Latitude | Longitude | Approx. km | Coordinate source |
| --- | --- | --- | --- | --- |
| Malleshwaram | 13.0031 | 77.5643 | 4.4 | [source](https://en.wikipedia.org/wiki/Malleshwaram) |
| Jayanagar | 12.925 | 77.595 | 5.6 | [source](https://www.wikidata.org/wiki/Q3429967) |
| Indiranagar | 12.97 | 77.65 | 6.2 | [source](https://www.wikidata.org/wiki/Q6025083) |
| Koramangala | 12.9258333333 | 77.6227777778 | 6.3 | [source](https://www.wikidata.org/wiki/Q5320506) |
| HSR Layout | 12.91 | 77.64 | 8.8 | [source](https://www.wikidata.org/wiki/Q5635997) |
| Marathahalli | 12.956194 | 77.701943 | 12.0 | [source](https://en.wikipedia.org/wiki/Marathahalli) |
| Yelahanka | 13.11389 | 77.59833 | 15.5 | [source](https://en.wikipedia.org/wiki/Yelahanka) |
| Electronic City | 12.85 | 77.67 | 16.2 | [source](https://en.wikipedia.org/wiki/Electronic_City) |
| Whitefield | 12.97 | 77.75 | 17.0 | [source](https://www.wikidata.org/wiki/Q5321082) |

The structured source record is [`demo/assets/bengaluru-geography.json`](../demo/assets/bengaluru-geography.json). The frontend bundles this data; it does not call geocoding, weather or map services at runtime.

## Acceptance checks

Verify local content and sample categories; four wall stages and saved colour/texture; material filters/dialogs/final board; real neighbourhood coordinates and independently recalculated distances; neighbourhood-to-form transfer; label separation at clustered distances; optional PIN/contact and required property/work validation; apartment coordination prompt; safe brief/download/copy/reset; mobile/landscape/reduced-motion controls; runtime errors, local asset loads and overflow. Verify the deployed source and repeat the important interactions on GitHub Pages.

Business registration, an actual address, contact number, WhatsApp account, reviews, completed projects, pricing and real service coverage were not supplied. They are not invented for the demo.
