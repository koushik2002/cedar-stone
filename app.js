'use strict';

// Replace this sample catalogue with your client's approved products.
const materials = [
  {
    "id": "01",
    "name": "Chalk white",
    "category": "siding",
    "type": "SIDING / HORIZONTAL LAP",
    "image": "assets/swatch-white.svg",
    "summary": "Clean lines with a little softness around the edges.",
    "description": "A soft white palette with the familiar rhythm of horizontal lap siding. Pair it with timber, muted greenery or dark window frames for a balanced exterior.",
    "tone": "Soft white",
    "character": "Horizontal lines"
  },
  {
    "id": "02",
    "name": "Forest grey",
    "category": "siding",
    "type": "SIDING / HORIZONTAL LAP",
    "image": "assets/swatch-grey.svg",
    "summary": "Grounded, calm and right at home in the landscape.",
    "description": "A muted grey-green palette with a crisp horizontal profile. Explore it for a quieter, landscape-led exterior with natural stone or light trim.",
    "tone": "Grey green",
    "character": "Horizontal lines"
  },
  {
    "name": "Golden ochre",
    "category": "siding",
    "type": "SIDING / PAINTED LAP",
    "image": "assets/swatch-ochre.svg",
    "summary": "A little sunshine, in every line.",
    "description": "A warm ochre direction with overlapping horizontal boards. Explore the colour alongside trim samples and confirm the actual profile and coating with your supplier.",
    "tone": "Golden ochre",
    "character": "Overlapping lap profile",
    "id": "03"
  },
  {
    "name": "Deep ocean",
    "category": "siding",
    "type": "SIDING / HORIZONTAL LAP",
    "image": "assets/swatch-ocean.svg",
    "summary": "Cool depth. A calm architectural rhythm.",
    "description": "A deep blue-grey palette with a horizontal lap profile. Use the digital sample to explore a mood, then confirm finish, dimensions and room for detailing with your contractor.",
    "tone": "Blue grey",
    "character": "Horizontal shadow lines",
    "id": "04"
  },
  {
    "id": "05",
    "name": "Natural cedar",
    "category": "siding",
    "type": "TIMBER / VERTICAL CLADDING",
    "image": "assets/swatch-cedar.svg",
    "summary": "Warm grain. Quiet confidence. Always a classic.",
    "description": "A warm timber direction with a vertical rhythm and a naturally varied grain. Use it as an accent or as the starting point for a complete exterior palette.",
    "tone": "Warm amber",
    "character": "Natural wood grain"
  },
  {
    "name": "Charcoal timber",
    "category": "siding",
    "type": "TIMBER / VERTICAL RHYTHM",
    "image": "assets/swatch-charcoal.svg",
    "summary": "Dark grain. Defined proportions.",
    "description": "A charcoal timber direction with narrow vertical boards. Compare real samples for tone, grain, coating and suitability before specifying a product.",
    "tone": "Charcoal green",
    "character": "Dark vertical grain",
    "id": "06"
  },
  {
    "name": "Cedar shingles",
    "category": "siding",
    "type": "TIMBER / SHINGLE STUDY",
    "image": "assets/swatch-shingles.svg",
    "summary": "Small pieces. Natural character.",
    "description": "An illustrative cedar shingle surface with varied lengths, warm tones and staggered joints. Discuss material, exposure and maintenance expectations with your supplier.",
    "tone": "Warm cedar",
    "character": "Staggered shingle pattern",
    "id": "07"
  },
  {
    "name": "Weathered cedar",
    "category": "siding",
    "type": "TIMBER / SHINGLE STUDY",
    "image": "assets/swatch-weathered.svg",
    "summary": "A softer, silvered side of timber.",
    "description": "A weathered-grey shingle direction. This is a colour study, not a prediction of how a product will age. Confirm the actual finish and maintenance with your supplier.",
    "tone": "Silver grey",
    "character": "Varied shingle tones",
    "id": "08"
  },
  {
    "id": "09",
    "name": "Sand & lime",
    "category": "stucco",
    "type": "STUCCO / FINE TEXTURE",
    "image": "assets/swatch-stucco.svg",
    "summary": "A sun-warmed neutral with a beautifully tactile finish.",
    "description": "An understated sand-coloured stucco direction. The fine texture brings gentle depth to simple architectural shapes and works well alongside warm timber.",
    "tone": "Warm sand",
    "character": "Fine, tactile texture"
  },
  {
    "name": "Pebbled lime",
    "category": "stucco",
    "type": "STUCCO / COARSE TEXTURE",
    "image": "assets/swatch-dash.svg",
    "summary": "A little more texture. A different kind of light.",
    "description": "An illustrative pebbled plaster direction with a more pronounced surface. Explore real samples in daylight and ask about the selected assembly, finish and installation requirements.",
    "tone": "Warm limestone",
    "character": "Coarse tactile texture",
    "id": "10"
  },
  {
    "id": "11",
    "name": "Soft terracotta",
    "category": "stucco",
    "type": "STUCCO / EARTHEN TEXTURE",
    "image": "assets/swatch-clay.svg",
    "summary": "An earthy warmth that makes its own first impression.",
    "description": "A warm terracotta palette with a softly textured surface. Pair with dark metal, natural planting or light stone to explore a distinctly earthy direction.",
    "tone": "Muted terracotta",
    "character": "Soft earthen texture"
  },
  {
    "id": "12",
    "name": "Limestone",
    "category": "stone",
    "type": "STONE / LINEAR ACCENT",
    "image": "assets/swatch-stone.svg",
    "summary": "Organic variation. An exterior with a little more depth.",
    "description": "A pale stone direction with layered, irregular blocks. Consider it for a feature wall, an entrance or a grounding accent below a lighter exterior finish.",
    "tone": "Pale oatmeal",
    "character": "Layered stone"
  }
];

const projects = [
  { image: 'assets/house-courtyard.jpg', alt: 'Warm timber and white exterior around a leafy courtyard', type: 'THE WARM & NATURAL EDIT', title: 'A softer side\nof modern.', description: 'Rich timber tones, clean white walls and a connection to the outdoors. A warm welcome, every time.', tags: ['Cedar tones', 'Soft white'] },
  { image: 'assets/house-modern.jpg', alt: 'Contemporary home combining warm horizontal cladding, white walls and dark frames', type: 'THE CLEAN & CONTEMPORARY EDIT', title: 'Good lines.\nGreat character.', description: 'A bold mix of horizontal textures, pale walls and dark accents. A considered contrast that makes an entrance.', tags: ['Horizontal texture', 'Dark accents'] },
  { image: 'assets/house-hero.jpg', alt: 'Sculptural white house with pale cladding and large glass openings beside a pool', type: 'THE LIGHT & SCULPTURAL EDIT', title: 'Let the light\ndo the talking.', description: 'Pale surfaces and generous openings let architectural forms take centre stage. Simple, spacious and quietly striking.', tags: ['Light neutrals', 'Clean geometry'] }
];

const grid = document.querySelector('#material-grid');
const materialSelect = document.querySelector('#material');
const materialDialog = document.querySelector('#material-dialog');
let chosenMaterial = materials[0];
let savedWallFinish = null;

materials.forEach(material => {
  const option = document.createElement('option');
  option.value = material.name;
  option.textContent = material.name;
  materialSelect.append(option);

  const card = document.createElement('article');
  card.className = 'material-card';
  card.dataset.category = material.category;
  // All interpolated values are the static catalogue above, never visitor input.
  card.innerHTML = `<button class="material-open" aria-label="Explore ${material.name}"><div class="swatch"><img src="${material.image}" alt="Illustrative ${material.name.toLowerCase()} material texture" width="500" height="420" loading="lazy"><span class="swatch-id">SAMPLE / ${material.id}</span><span class="swatch-arrow" aria-hidden="true">↗</span></div><div class="material-info"><p class="eyebrow">${material.type}</p><h3>${material.name}</h3><p>${material.summary}</p></div></button>`;
  card.querySelector('button').addEventListener('click', () => openMaterial(material));
  grid.append(card);
});

document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    document.querySelectorAll('.filter').forEach(item => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    let count = 0;
    document.querySelectorAll('.material-card').forEach(card => {
      const visible = filter === 'all' || card.dataset.category === filter;
      card.hidden = !visible;
      if (visible) count += 1;
    });
    document.querySelector('#material-count').textContent = `${count} ${count === 1 ? 'finish' : 'finishes'} to explore`;
    document.dispatchEvent(new CustomEvent('materials:filter'));
  });
});

function openMaterial(material) {
  chosenMaterial = material;
  document.querySelector('#dialog-title').textContent = material.name;
  document.querySelector('#dialog-category').textContent = material.type;
  document.querySelector('#dialog-description').textContent = material.description;
  document.querySelector('#dialog-swatch').style.backgroundImage = `url('${material.image}')`;
  const specs = document.querySelector('#dialog-specs');
  specs.replaceChildren();
  [['Tone', material.tone], ['Character', material.character]].forEach(([label, value]) => {
    const row = document.createElement('div');
    const term = document.createElement('dt');
    const detail = document.createElement('dd');
    term.textContent = label;
    detail.textContent = value;
    row.append(term, detail);
    specs.append(row);
  });
  materialDialog.showModal();
  document.body.classList.add('modal-open');
}

document.querySelector('.dialog-close').addEventListener('click', () => materialDialog.close());
materialDialog.addEventListener('click', event => {
  if (event.target !== materialDialog) return;
  const rect = materialDialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) materialDialog.close();
});
materialDialog.addEventListener('close', () => document.body.classList.remove('modal-open'));

document.querySelector('#choose-material').addEventListener('click', () => {
  if (!document.querySelector('#quote-success').hidden) resetBrief();
  materialSelect.value = chosenMaterial.name;
  savedWallFinish = null;
  document.querySelector('#service').value = { siding: 'Siding & cladding', stucco: 'Stucco finishes', stone: 'Stone accents' }[chosenMaterial.category];
  setFormStep(0);
  materialDialog.close();
  document.querySelector('#quote').scrollIntoView({ behavior: reducedMotion() ? 'instant' : 'smooth' });
  // Focus the selected finish without moving the page away from the quote section.
  materialSelect.focus({ preventScroll: true });
});



document.querySelectorAll('.project-selector').forEach(button => {
  button.addEventListener('click', () => {
    const project = projects[Number(button.dataset.project)];
    document.querySelectorAll('.project-selector').forEach(item => {
      item.classList.toggle('is-active', item === button);
      item.setAttribute('aria-pressed', String(item === button));
    });
    const image = document.querySelector('#project-image');
    image.src = project.image;
    image.alt = project.alt;
    document.querySelector('#project-type').textContent = project.type;
    const title = document.querySelector('#project-title');
    title.replaceChildren();
    project.title.split('\n').forEach((line, index) => {
      if (index) title.append(document.createElement('br'));
      title.append(document.createTextNode(line));
    });
    document.querySelector('#project-description').textContent = project.description;
    const tags = document.querySelector('#project-tags');
    tags.replaceChildren(...project.tags.map(label => {
      const tag = document.createElement('span');
      tag.textContent = label;
      return tag;
    }));
  });
});

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('is-open');
}
menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(expanded));
  menuToggle.setAttribute('aria-label', expanded ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('is-open', expanded);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuToggle.focus();
  }
});
document.addEventListener('click', event => {
  if (!navigation.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
});
window.matchMedia('(min-width: 801px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});

const form = document.querySelector('#quote-form');
const formSteps = [...document.querySelectorAll('.form-step')];
let formStep = 0;
let projectBrief = '';
function reducedMotion() { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; }

function setFormStep(step, focus = false) {
  formStep = step;
  formSteps.forEach((element, index) => {
    element.hidden = index !== step;
    // Inactive required controls must not block validation of the visible step.
    element.querySelectorAll('input, select, textarea').forEach(field => { field.disabled = index !== step; });
  });
  document.querySelectorAll('[data-form-step]').forEach((element, index) => {
    element.classList.toggle('is-active', index === step);
    if (index === step) element.setAttribute('aria-current', 'step');
    else element.removeAttribute('aria-current');
  });
  if (focus) formSteps[step].querySelector('input, select, textarea').focus({ preventScroll: true });
}

function validateStep() {
  for (const field of formSteps[formStep].querySelectorAll('input, select, textarea')) {
    if (field.required && field.type !== 'email') {
      field.setCustomValidity(field.value.trim() ? '' : 'Please complete this field.');
    }
    if (!field.reportValidity()) return false;
  }
  return true;
}
form.querySelectorAll('input, select, textarea').forEach(field => field.addEventListener('input', () => field.setCustomValidity('')));
document.querySelectorAll('.form-next').forEach(button => button.addEventListener('click', () => {
  if (validateStep()) setFormStep(formStep + 1, true);
}));
document.querySelectorAll('.form-back').forEach(button => button.addEventListener('click', () => setFormStep(formStep - 1, true)));

form.addEventListener('submit', event => {
  event.preventDefault();
  if (!validateStep()) return;
  if (formStep < 2) {
    setFormStep(formStep + 1, true);
    return;
  }
  // Validate every step again before building the brief, including restored values.
  for (let step = 0; step < formSteps.length; step += 1) {
    setFormStep(step);
    if (!validateStep()) return;
  }
  const value = id => document.querySelector(`#${id}`).value.trim();
  projectBrief = [
    'CEDAR & STONE — PROJECT BRIEF',
    'Demo only — no enquiry has been sent.',
    '',
    `Service: ${value('service')}`,
    `Finish: ${value('material') || 'Open to recommendations'}`,
    ...(savedWallFinish && value('material') === savedWallFinish.material ? [`Illustrative wall exploration: ${savedWallFinish.texture} / ${savedWallFinish.colour}`] : []),
    `Location: ${value('location')}`,
    `Timing: ${value('timeline')}`,
    `Name: ${value('name')}`,
    `Email: ${value('email')}`,
    ...(value('notes') ? ['', `Project notes: ${value('notes')}`] : []),
    '',
    'Next step: share this brief with your chosen contractor to discuss a site assessment and quote.'
  ].join('\n');
  document.querySelector('#brief-preview').textContent = projectBrief;
  document.querySelector('#quote-form-wrap').hidden = true;
  const success = document.querySelector('#quote-success');
  success.hidden = false;
  success.focus({ preventScroll: true });
});

document.querySelector('#download-brief').addEventListener('click', () => {
  if (!projectBrief) return;
  const blob = new Blob([projectBrief], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'cedar-stone-project-brief.txt';
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
document.querySelector('#copy-brief').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText(projectBrief);
    status.textContent = 'Brief copied. Ready to share.';
  } catch {
    status.textContent = 'Copy is unavailable here. Use Download brief, or select and copy the text above.';
  }
});
function resetBrief() {
  form.reset();
  projectBrief = '';
  savedWallFinish = null;
  document.querySelector('#brief-preview').textContent = '';
  document.querySelector('#copy-status').textContent = '';
  document.querySelector('#quote-form-wrap').hidden = false;
  document.querySelector('#quote-success').hidden = true;
  form.querySelectorAll('input, select, textarea').forEach(field => field.setCustomValidity(''));
  setFormStep(0, true);
}
document.querySelector('#restart-brief').addEventListener('click', resetBrief);
document.querySelector('#year').textContent = new Date().getFullYear();
setFormStep(0);

// Carry the wall exploration into the same local brief as the material library.
document.addEventListener('wall:save', event => {
  if (!document.querySelector('#quote-success').hidden) resetBrief();
  const material = event.detail.colourKey === 'clay' ? 'Soft terracotta' : event.detail.textureKey === 'dash' ? 'Pebbled lime' : 'Sand & lime';
  savedWallFinish = {...event.detail, material};
  materialSelect.value = material;
  document.querySelector('#service').value = 'Stucco finishes';
  setFormStep(0);
  document.querySelector('#quote').scrollIntoView({behavior: reducedMotion() ? 'instant' : 'smooth'});
  materialSelect.focus({preventScroll:true});
});
