'use strict';

(() => {
  const $ = (query, root=document) => root.querySelector(query);
  const $$ = (query, root=document) => [...root.querySelectorAll(query)];
  const clamp = n => Math.max(0,Math.min(1,n));
  const TAPE_KM = 20;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const header = $('.header');
  const materials = [
  {
    "name": "Chalk white",
    "file": "paint-chalk",
    "category": "paint",
    "colour": "#e7e0cd",
    "type": "EXTERIOR COLOUR / WARM WHITE",
    "summary": "A quiet backdrop for stone, greenery and shadow.",
    "description": "An illustrative warm-white paint direction for a masonry exterior. Compare a real sample on your wall in sun and shade, then confirm surface preparation and the specified coating system.",
    "tone": "Warm chalk",
    "character": "Quiet, understated"
  },
  {
    "name": "Sandstone beige",
    "file": "paint-sand",
    "category": "paint",
    "colour": "#cbb898",
    "type": "EXTERIOR COLOUR / EARTH NEUTRAL",
    "summary": "A soft earth tone for an everyday Bengaluru home.",
    "description": "A sandy neutral that can sit alongside brick, dark metal and stone. This is a digital colour study, not a manufacturer shade code or a claim of a particular product’s performance.",
    "tone": "Warm sand",
    "character": "Soft, grounded"
  },
  {
    "name": "Terracotta clay",
    "file": "paint-clay",
    "category": "paint",
    "colour": "#b77252",
    "type": "EXTERIOR COLOUR / CLAY",
    "summary": "A little warmth. A familiar clay-colour accent.",
    "description": "A terracotta paint direction inspired by the colour of fired clay. Explore it on a feature wall or alongside quieter neutrals; confirm the real colour and exterior suitability with your contractor.",
    "tone": "Terracotta",
    "character": "Warm, expressive"
  },
  {
    "name": "Canopy green",
    "file": "paint-canopy",
    "category": "paint",
    "colour": "#4b6252",
    "type": "EXTERIOR COLOUR / GARDEN GREEN",
    "summary": "A deeper green, with room for light and shade.",
    "description": "A muted garden green for a wall or exterior accent. Test the selected product and shade on the actual substrate and compare it under different lighting conditions.",
    "tone": "Garden green",
    "character": "Deep, calm"
  },
  {
    "name": "Fine grain",
    "file": "texture-fine",
    "category": "texture",
    "colour": "#ccbfa3",
    "type": "SURFACE TEXTURE / FINE GRAIN",
    "summary": "Small variations. A quieter tactile surface.",
    "description": "An illustrative fine-grained plaster or texture-coating direction. Actual texture, coating build-up and suitability depend on the substrate and selected product system.",
    "tone": "Warm mineral",
    "character": "Fine, tactile"
  },
  {
    "name": "Earth render",
    "file": "texture-earth",
    "category": "texture",
    "colour": "#bd9977",
    "type": "SURFACE TEXTURE / EARTH TONE",
    "summary": "A warm, mineral look with more depth in the grain.",
    "description": "An earthy surface treatment with raised grain and small shadows. The appearance does not imply a particular binder, local source, waterproofing capacity or environmental certification.",
    "tone": "Earth brown",
    "character": "Raised, expressive"
  },
  {
    "name": "Brushed concrete",
    "file": "texture-smooth",
    "category": "texture",
    "colour": "#c2c1b1",
    "type": "SURFACE TEXTURE / CONCRETE LOOK",
    "summary": "Subtle movement. A restrained grey-green surface.",
    "description": "An illustrative concrete-look finish with broad surface movement. Confirm the actual decorative system, exposure and preparation rather than assuming structural concrete is being specified.",
    "tone": "Mineral grey",
    "character": "Smooth, architectural"
  },
  {
    "name": "Limewash look",
    "file": "texture-lime",
    "category": "texture",
    "colour": "#dbd1b5",
    "type": "SURFACE TEXTURE / SOFT VARIATION",
    "summary": "Soft tonal movement for a less uniform wall.",
    "description": "A colour-and-texture study with a limewash-like appearance. It is not a specification for lime application; the contractor should confirm the binder, substrate compatibility and exterior exposure.",
    "tone": "Warm ivory",
    "character": "Soft, varied"
  },
  {
    "name": "Exposed brick",
    "file": "brick",
    "category": "masonry",
    "colour": "#a65e43",
    "type": "MASONRY / FIRED-CLAY LOOK",
    "summary": "Clay colour. Fine joints. An honest rhythm.",
    "description": "An illustrative exposed-brick direction. Discuss the actual brick or facing product, water exposure, joints, fixing and transitions as part of a complete exterior design.",
    "tone": "Fired clay",
    "character": "Rhythmic, tactile"
  },
  {
    "name": "Terracotta jali",
    "file": "terracotta-jali",
    "category": "masonry",
    "colour": "#b77252",
    "type": "MASONRY / SCREEN STUDY",
    "summary": "Pattern, openings and the play of light.",
    "description": "An illustrative terracotta screen pattern for exploring light and shade. It is not a structural design; support, fixing, privacy, weather exposure and maintenance need project-specific review.",
    "tone": "Terracotta",
    "character": "Patterned, open"
  },
  {
    "name": "Grey granite",
    "file": "granite",
    "category": "masonry",
    "colour": "#999c90",
    "type": "STONE / GRANITE DIRECTION",
    "summary": "A mineral grey, with character in the surface.",
    "description": "An illustrative granite direction, drawing on Bengaluru’s stone-and-greenery architectural context. Confirm the stone’s actual origin, finish, thickness, fixing and suitability with the supplier and contractor.",
    "tone": "Mineral grey",
    "character": "Grounded, speckled"
  },
  {
    "name": "Warm stone",
    "file": "warm-stone",
    "category": "masonry",
    "colour": "#c2ab8b",
    "type": "STONE / WARM CLADDING",
    "summary": "A grounded entrance. A little variation in every piece.",
    "description": "An illustrative warm-stone facing pattern. Select a physical sample and confirm the actual stone, exterior detailing and installation system before committing to a project.",
    "tone": "Warm mineral",
    "character": "Natural, varied"
  }
];
  const stageNames = ['Masonry','Prepare','Prime','Finish'];
  const finishNames = {float:'Fine grain',dash:'Earth texture',smooth:'Smooth'};
  const colourNames = {ivory:'Chalk',sand:'Sand',clay:'Clay',canopy:'Canopy'};
  const colours = {ivory:'#e7e0cd',sand:'#cbb898',clay:'#b77252',canopy:'#4b6252'};
  const wall = {section:$('#wall'),pin:$('.wall-pin'),surface:$('.wall-surface'),enabled:false,manual:0,p:0,active:-1};
  const rail = {section:$('#finishes'),pin:$('.finish-pin'),viewport:$('.finish-window'),track:$('.finish-track'),enabled:false,travel:0,cards:[]};
  const tape = {section:$('#area'),pin:$('.area-pin'),viewport:$('.tape-window'),el:$('.tape'),enabled:false,manual:0,unit:72,case:118};
  const scenes = [wall,rail,tape];
  const wallChoice = {texture:'float',colour:'ivory'};
  let headerHeight=70,frame=false,measureTimer,measuring=false;
  let selected=null,savedWall=null,dialogMaterial=null,brief='',suppressRailFocusUntil=0;
  const dialog=$('#material-dialog');

  // All catalogue markup comes from fixed local data. Visitor values use textContent.
  materials.forEach((material,index)=>{
    const article=document.createElement('article');
    article.className='finish-card';article.dataset.category=material.category;
    article.innerHTML=`<button class="sample-button" aria-label="Explore ${material.name}"><div class="sample-surface"><img src="assets/${material.file}.svg" alt="Illustrative ${material.name.toLowerCase()} surface" width="600" height="900" loading="lazy"><span class="sample-number">SAMPLE / ${String(index+1).padStart(2,'0')}</span><span class="sample-arrow" aria-hidden="true">↗</span></div><div class="sample-copy"><p class="eyebrow">${material.type}</p><h3>${material.name}</h3><p>${material.summary}</p></div></button>`;
    $('button',article).addEventListener('click',()=>openMaterial(material));
    rail.track.append(article);material.element=article;
    const option=document.createElement('option');option.value=material.name;option.textContent=material.name;$('#material').append(option);
  });
  // Point coordinates and independently reproducible distance method are recorded in assets/bengaluru-geography.json.
  const places=[
  {
    "km": 4.4,
    "name": "Malleshwaram",
    "note": "North-west of Cubbon Park."
  },
  {
    "km": 5.6,
    "name": "Jayanagar",
    "note": "South of Cubbon Park."
  },
  {
    "km": 6.2,
    "name": "Indiranagar",
    "note": "East of Cubbon Park."
  },
  {
    "km": 6.3,
    "name": "Koramangala",
    "note": "South-east of Cubbon Park."
  },
  {
    "km": 8.8,
    "name": "HSR Layout",
    "note": "South-east of Cubbon Park."
  },
  {
    "km": 12.0,
    "name": "Marathahalli",
    "note": "East of Cubbon Park."
  },
  {
    "km": 15.5,
    "name": "Yelahanka",
    "note": "North of Cubbon Park."
  },
  {
    "km": 16.2,
    "name": "Electronic City",
    "note": "South-east of Cubbon Park."
  },
  {
    "km": 17.0,
    "name": "Whitefield",
    "note": "East of Cubbon Park."
  }
];
  for(let km=0;km<=TAPE_KM;km+=5){
    const tick=document.createElement('span');tick.className='major-tick';tick.dataset.km=String(km);tick.textContent=String(km);$('.ticks').append(tick);
  }
  places.forEach(place=>{
    const label=document.createElement('article');label.className='tape-place';
    label.innerHTML=`<small>≈ ${place.km.toFixed(1)} KM</small><h3>${place.name}</h3><p>${place.note}</p>`;
    $('.place-labels').append(label);place.element=label;
    const li=document.createElement('li');li.textContent=`${place.name}: approximately ${place.km.toFixed(1)} kilometres in a straight line from Cubbon Park. ${place.note}`;$('#place-list').append(li);
  });

  const areaSelect=$('#area-select');
  places.forEach(place=>{
    const option=document.createElement('option');option.value=place.name;option.textContent=place.name;areaSelect.append(option);
    const suggestion=document.createElement('option');suggestion.value=place.name;$('#area-suggestions').append(suggestion);
  });
  function markArea(name){places.forEach(place=>place.element.classList.toggle('selected-area',place.name===name));}
  areaSelect.addEventListener('change',()=>{
    const place=places.find(p=>p.name===areaSelect.value);markArea(place?.name??'');
    if(!place){$('#area-status').textContent='';return;}
    $('#location').value=place.name;$('#location').setCustomValidity('');
    $('#area-status').textContent=`${place.name} added to your brief · about ${place.km.toFixed(1)} km from Cubbon Park.`;
    setTape(place.km/TAPE_KM);
  });
  $('#location').addEventListener('input',()=>{
    const place=places.find(p=>p.name.toLowerCase()===$('#location').value.trim().toLowerCase());
    areaSelect.value=place?.name??'';markArea(place?.name??'');$('#area-status').textContent='';
  });
  $('#property').addEventListener('change',()=>{$('#property-help').hidden=$('#property').value!=='Apartment exterior';});

  function position(scene){
    if(!scene.enabled)return 0;
    const travelled=headerHeight-scene.section.getBoundingClientRect().top;
    if(travelled<=1)return 0;
    if(travelled>=scene.distance-1)return 1;
    return clamp(travelled/scene.distance);
  }
  function seek(scene,p){
    const top=scene.section.getBoundingClientRect().top+scrollY-headerHeight;
    window.scrollTo({top:top+clamp(p)*scene.distance,behavior:'instant'});requestRender();
  }
  function curve(points,scale=1){
    let d=`M${points[0][0]*scale} ${points[0][1]*scale}`;
    for(let i=1;i<points.length-1;i++){
      const [x,y]=points[i],next=points[i+1];
      d+=`Q${(x*scale).toFixed(4)} ${(y*scale).toFixed(4)} ${((x+next[0])/2*scale).toFixed(4)} ${((y+next[1])/2*scale).toFixed(4)}`;
    }
    const last=points.at(-1);return d+`L${last[0]*scale} ${last[1]*scale}`;
  }
  function coatPath(p,layer){
    if(p<=0)return {mask:'M0 0H0V1H0Z',edge:''};
    if(p>=1)return {mask:'M0 0H1V1H0Z',edge:''};
    const points=[];
    for(let i=0;i<=100;i++){
      const rough=Math.sin(i*.47+layer*3)*.008+Math.sin(i*1.71+layer)*.003+Math.sin(i*.16+2)*.007;
      points.push([p*1.1-.05+rough,i/100]);
    }
    return {mask:'M0 0L'+curve(points).slice(1)+'L0 1Z',edge:curve(points,1000)};
  }
  const coatKeys=['prepare','prime','finish'];
  const lastCoats=[-1,-1,-1];
  coatKeys.forEach(key=>$('.coat-'+key).style.clipPath=`url("#mask-${key}")`);
  function renderWall(p){
    wall.p=clamp(p);const amount=wall.p*3;
    coatKeys.forEach((key,index)=>{
      const q=clamp(amount-index);if(Math.abs(q-lastCoats[index])<.0001)return;
      lastCoats[index]=q;const shape=coatPath(q,index);$('#path-'+key).setAttribute('d',shape.mask);$('#edge-'+key).setAttribute('d',shape.edge);
    });
    const active=amount<.008?0:Math.min(3,Math.ceil(amount-.008));
    if(active!==wall.active){
      wall.active=active;wall.surface.dataset.stage=String(active);
      $$('.wall-stages button').forEach((b,index)=>{b.classList.toggle('active',index===active);b.setAttribute('aria-pressed',String(index===active));});
      $('.wall-caption').textContent=`0${active+1} / ${stageNames[active].toUpperCase()}`;
      $('.wall-art').setAttribute('aria-label',`Illustrative wall showing ${stageNames[active].toLowerCase()}`);
    }
    $('.wall-legend').style.setProperty('--progress',String(wall.p));
    const opening=1-clamp(wall.p/.14),choices=clamp((wall.p-.94)/.06);
    $('.wall-opening').style.opacity=String(opening);$('.wall-opening').style.visibility=opening===0?'hidden':'visible';$('.wall-opening').inert=opening<.05;
    $('.wall-choices').style.opacity=String(choices);$('.wall-choices').classList.toggle('ready',choices>0);$('.wall-choices').inert=choices<.95;
    if(wall.p>.1)wall.surface.classList.remove('troweling');
  }
  function chooseStage(stage){wall.manual=clamp(Number(stage)/3);renderWall(wall.manual);if(wall.enabled)seek(wall,wall.manual);}
  $$('.wall-stages button').forEach(button=>button.addEventListener('click',()=>chooseStage(button.dataset.layer)));
  $('.wall-stages').addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
    event.preventDefault();const current=Number(event.target.closest('button')?.dataset.layer??wall.active);
    const target=event.key==='Home'?0:event.key==='End'?3:Math.max(0,Math.min(3,current+(event.key==='ArrowRight'?1:-1)));
    chooseStage(target);$(`.wall-stages [data-layer="${target}"]`).focus({preventScroll:true});
  });
  $$('.texture-choices button').forEach(button=>button.addEventListener('click',()=>{
    wallChoice.texture=button.dataset.texture;wall.surface.dataset.texture=wallChoice.texture;
    $$('.texture-choices button').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});
  }));
  $$('.colour-choices button').forEach(button=>button.addEventListener('click',()=>{
    wallChoice.colour=button.dataset.colour;wall.surface.dataset.colour=wallChoice.colour;
    wall.surface.style.setProperty('--wall-colour',colours[wallChoice.colour]);
    $$('.colour-choices button').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});
  }));

  // One textured surface per stroke; no repeated pill-shaped seed stamps.
  const canvas=$('#plaster'),ctx=canvas.getContext('2d'),grain=new Image();
  let canvasWidth=0,canvasHeight=0,brush,previous=null;
  function makePattern(){
    const tile=document.createElement('canvas');tile.width=256;tile.height=256;
    const paint=tile.getContext('2d');paint.fillStyle='#e7dfc7';paint.fillRect(0,0,256,256);
    if(grain.complete&&grain.naturalWidth){paint.globalCompositeOperation='multiply';paint.globalAlpha=.3;paint.drawImage(grain,0,0,256,256);}
    brush=ctx.createPattern(tile,'repeat');
  }
  function plasterStroke(from,to,width,seed){
    const length=Math.hypot(to.x-from.x,to.y-from.y),angle=Math.atan2(to.y-from.y,to.x-from.x),points=[];
    ctx.save();ctx.translate(from.x,from.y);ctx.rotate(angle);
    for(let i=0;i<=32;i++)points.push([length*i/32,-width*.5+Math.sin(i*2.1+seed)*width*.025+Math.sin(i*.7)*width*.025]);
    for(let i=0;i<=9;i++){const a=-Math.PI/2+i/9*Math.PI;points.push([length+Math.cos(a)*width*.28,Math.sin(a)*width*.5]);}
    for(let i=32;i>=0;i--)points.push([length*i/32,width*.5+Math.sin(i*1.7+seed)*width*.025+Math.sin(i*.8)*width*.025]);
    for(let i=0;i<=9;i++){const a=Math.PI/2+i/9*Math.PI;points.push([Math.cos(a)*width*.28,Math.sin(a)*width*.5]);}
    ctx.beginPath();ctx.moveTo(points[0][0],points[0][1]);
    points.forEach(([x,y],i)=>{const next=points[(i+1)%points.length];ctx.quadraticCurveTo(x,y,(x+next[0])/2,(y+next[1])/2);});
    ctx.closePath();ctx.fillStyle=brush||'#e7dfc7';ctx.shadowColor='#101e2940';ctx.shadowBlur=2;ctx.shadowOffsetY=3;ctx.fill();ctx.restore();
  }
  function seedPlaster(){
    if(innerWidth<=600){
      const width=Math.min(52,canvasHeight*.09);
      plasterStroke({x:canvasWidth*.25,y:canvasHeight*.77},{x:canvasWidth*.90,y:canvasHeight*.72},width,3);
      plasterStroke({x:canvasWidth*.35,y:canvasHeight*.91},{x:canvasWidth*.97,y:canvasHeight*.86},width,8);
      return;
    }
    const thickness=Math.min(78,canvasHeight*.12);
    plasterStroke({x:canvasWidth*.43,y:canvasHeight*.74},{x:canvasWidth*.86,y:canvasHeight*.68},thickness,3);
    plasterStroke({x:canvasWidth*.54,y:canvasHeight*.88},{x:canvasWidth*.94,y:canvasHeight*.82},thickness,8);
  }
  function resizeCanvas(){
    const r=wall.surface.getBoundingClientRect();if(Math.abs(r.width-canvasWidth)<1&&Math.abs(r.height-canvasHeight)<1)return;
    canvasWidth=r.width;canvasHeight=r.height;const scale=Math.min(devicePixelRatio||1,2);
    canvas.width=Math.round(r.width*scale);canvas.height=Math.round(r.height*scale);ctx.setTransform(scale,0,0,scale,0,0);makePattern();seedPlaster();previous=null;
  }
  grain.onload=()=>{makePattern();if(canvasWidth){ctx.clearRect(0,0,canvasWidth,canvasHeight);seedPlaster();}};grain.src='assets/fine-grain.svg';
  wall.surface.addEventListener('pointermove',event=>{
    if(event.pointerType==='touch'||reduced.matches||wall.p>.09||event.target.closest('a,button,input')){previous=null;wall.surface.classList.remove('troweling');return;}
    const r=wall.surface.getBoundingClientRect(),point={x:event.clientX-r.left,y:event.clientY-r.top};
    ctx.save();ctx.beginPath();ctx.moveTo(previous?.x??point.x,previous?.y??point.y);ctx.lineTo(point.x+.1,point.y+.1);ctx.strokeStyle=brush||'#e7dfc7';ctx.lineWidth=Math.min(80,canvasHeight*.14);ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke();ctx.restore();previous=point;
    $('.trowel').style.transform=`translate(${point.x-36}px,${point.y-36}px) rotate(-9deg)`;wall.surface.classList.add('troweling');
  },{passive:true});
  wall.surface.addEventListener('pointerleave',()=>{previous=null;wall.surface.classList.remove('troweling');});
  $('#try-trowel').addEventListener('click',()=>plasterStroke({x:canvasWidth*.24,y:canvasHeight*.73},{x:canvasWidth*.55,y:canvasHeight*.68},Math.min(70,canvasHeight*.12),12));

  function railOffset(){return rail.enabled?position(rail)*rail.travel:rail.viewport.scrollLeft;}
  function renderRail(){
    const offset=railOffset();
    if(rail.enabled){rail.track.style.transform=`translate3d(${-offset}px,0,0)`;if(rail.viewport.scrollLeft)rail.viewport.scrollLeft=0;}
    const centre=offset+rail.viewport.clientWidth/2;let index=0,best=Infinity;
    rail.cards.forEach((card,i)=>{const distance=Math.abs(card.centre-centre);if(distance<best){best=distance;index=i;}});
    $('#finish-position').textContent=`${String(index+1).padStart(2,'0')} / ${String(rail.cards.length).padStart(2,'0')}`;
    $('#finish-prev').disabled=offset<2;$('#finish-next').disabled=offset>=rail.travel-2;
  }
  function moveRail(offset,immediate=false){
    const x=Math.max(0,Math.min(rail.travel,offset));
    if(rail.enabled)seek(rail,rail.travel?x/rail.travel:0);
    else rail.viewport.scrollTo({left:x,behavior:immediate||reduced.matches?'instant':'smooth'});
  }
  function stepRail(direction){
    const current=railOffset(),stops=[0,...rail.cards.map(card=>Math.max(0,Math.min(rail.travel,card.left-rail.padding))),rail.travel];
    const next=direction>0?stops.find(x=>x>current+8):[...stops].reverse().find(x=>x<current-8);
    moveRail(next??(direction>0?rail.travel:0));
  }
  $('#finish-prev').addEventListener('click',()=>stepRail(-1));$('#finish-next').addEventListener('click',()=>stepRail(1));
  rail.viewport.addEventListener('scroll',requestRender,{passive:true});
  rail.viewport.addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
    event.preventDefault();if(event.key==='Home')moveRail(0,true);else if(event.key==='End')moveRail(rail.travel,true);else stepRail(event.key==='ArrowRight'?1:-1);
  });
  rail.viewport.addEventListener('focusin',event=>{
    if(!rail.enabled||performance.now()<suppressRailFocusUntil)return;
    const card=event.target.closest('.finish-card');if(!card)return;
    const r=card.getBoundingClientRect(),v=rail.viewport.getBoundingClientRect();
    if(r.left<v.left||r.right>v.right)moveRail(card.offsetLeft-rail.padding,true);
  });
  $$('.finish-filters button').forEach(button=>button.addEventListener('click',()=>{
    const category=button.dataset.filter;
    $$('.finish-filters button').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});
    let count=0;materials.forEach(m=>{m.element.hidden=category!=='all'&&category!==m.category;if(!m.element.hidden)count++;});
    $('#finish-count').textContent=`${count} ${count===1?'finish':'finishes'}`;
    measure();rail.viewport.scrollTo({left:0,behavior:'instant'});
    if(rail.enabled)seek(rail,0);else jumpTo('#finishes','instant');requestRender();
  }));

  function renderTape(p){
    const distance=clamp(p)*TAPE_KM,length=tape.enabled?distance*tape.unit:TAPE_KM*tape.unit;
    if(tape.enabled&&tape.viewport.scrollLeft)tape.viewport.scrollLeft=0;
    const width=tape.viewport.clientWidth,target=width*(width<=360?.56:width<=600?.61:.7);
    const shift=tape.enabled?Math.min(0,target-tape.lead-tape.case-length):0;
    tape.el.style.setProperty('--blade',`${length}px`);tape.el.style.setProperty('--shift',`${shift}px`);tape.el.style.setProperty('--hook',length>1?'1':'0');
    // Real neighbourhood distances cluster. Cull colliding captions, never distort the scale.
    const accepted=[[],[]],visible=new Set(),nativeOffset=tape.enabled?0:tape.viewport.scrollLeft;
    places.map((place,index)=>({place,index,x:tape.lead+tape.case+place.km*tape.unit-5+shift-nativeOffset}))
      .filter(item=>item.x+tape.labelWidth>0&&item.x<width)
      .sort((a,b)=>Math.abs(a.place.km-distance)-Math.abs(b.place.km-distance))
      .forEach(item=>{
        const row=accepted[item.index%2];
        if(row.some(x=>Math.abs(item.x-x)<tape.labelWidth+12))return;
        row.push(item.x);visible.add(item.place);
      });
    places.forEach(place=>{
      const opacity=tape.enabled?.16+.84*clamp((distance-place.km+2.5)/2.5):1;
      place.element.style.opacity=String(visible.has(place)?opacity:0);
    });
    $('#tape-range').value=String(Number(distance.toFixed(2)));$('#tape-distance').textContent=`${Number(distance.toFixed(1))} km`;$('#tape-range').setAttribute('aria-valuetext',`${Number(distance.toFixed(1))} approximate straight-line kilometres from Cubbon Park`);
  }
  function setTape(p){
    tape.manual=clamp(p);renderTape(tape.manual);
    if(tape.enabled)seek(tape,tape.manual);else tape.viewport.scrollTo({left:tape.manual*(tape.viewport.scrollWidth-tape.viewport.clientWidth),behavior:'instant'});
  }
  $('#tape-range').addEventListener('input',()=>setTape(Number($('#tape-range').value)/TAPE_KM));
  tape.viewport.addEventListener('scroll',()=>{if(tape.enabled)return;const travel=tape.viewport.scrollWidth-tape.viewport.clientWidth;tape.manual=travel?clamp(tape.viewport.scrollLeft/travel):0;renderTape(tape.manual);},{passive:true});
  tape.viewport.addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
    event.preventDefault();const current=tape.enabled?position(tape):tape.manual;
    setTape(event.key==='Home'?0:event.key==='End'?1:current+(event.key==='ArrowRight'?.125:-.125));
  });

  function openMaterial(material){
    dialogMaterial=material;$('#dialog-title').textContent=material.name;$('#dialog-type').textContent=material.type;$('#dialog-description').textContent=material.description;$('#dialog-tone').textContent=material.tone;$('#dialog-character').textContent=material.character;$('#dialog-surface').style.backgroundImage=`url("assets/${material.file}.svg")`;$('#dialog-surface').setAttribute('aria-label',`Illustrative ${material.name.toLowerCase()} surface`);
    dialog.showModal();document.body.classList.add('modal-open');
  }
  $('#dialog-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
  dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');requestAnimationFrame(measure);});
  function selectionSummary(){
    $('#selected-name').textContent=savedWall?`${finishNames[savedWall.texture]} · ${colourNames[savedWall.colour]}`:selected?.name??'Still exploring';
    $('#selected-detail').textContent=savedWall?'Your full-wall texture and colour choice.':selected?selected.type.toLowerCase().replace(' / ',' · '):'Find a finish in the library above.';
    $('#selected-swatch').style.backgroundImage=selected?`url("assets/${selected.file}.svg")`:'';
    $('#selected-swatch').style.backgroundColor=savedWall?colours[savedWall.colour]:'';
    if(savedWall)$('#selected-swatch').style.backgroundBlendMode='luminosity';else $('#selected-swatch').style.backgroundBlendMode='normal';
    $('.project-study').style.setProperty('--study-wall',savedWall?colours[savedWall.colour]:selected?.colour??colours.ivory);
    const feature=selected?.file==='granite'||selected?.file==='warm-stone'?'stone':selected?.file==='terracotta-jali'?'jali':'brick';
    $('#study-feature').setAttribute('fill',`url(#study-${feature})`);
  }
  function selectMaterial(material,fromWall=null){
    if(!$('#project-result').hidden)resetBrief();
    selected=material;savedWall=fromWall;$('#material').value=material.name;$('#service').value={paint:'Exterior repainting',texture:'Textured walls',masonry:'Brick & stone details'}[material.category];selectionSummary();
    jumpTo('#project');$('#name').focus({preventScroll:true});
  }
  $('#choose-material').addEventListener('click',()=>{suppressRailFocusUntil=performance.now()+600;dialog.close();selectMaterial(dialogMaterial);});
  $('#save-wall').addEventListener('click',()=>selectMaterial(materials.find(m=>m.file===(wallChoice.texture==='smooth'?`paint-${wallChoice.colour==='ivory'?'chalk':wallChoice.colour}`:wallChoice.texture==='dash'?'texture-earth':'texture-fine')),{...wallChoice}));
  $('#material').addEventListener('change',()=>{selected=materials.find(m=>m.name===$('#material').value)||null;savedWall=null;if(selected)$('#service').value={paint:'Exterior repainting',texture:'Textured walls',masonry:'Brick & stone details'}[selected.category];selectionSummary();});

  const form=$('#project-form');form.noValidate=true;
  $$('input,select,textarea',form).forEach(field=>field.addEventListener('input',()=>field.setCustomValidity('')));
  form.addEventListener('submit',event=>{
    event.preventDefault();
    for(const field of $$('input[required],select[required]',form)){if(field.type!=='email')field.setCustomValidity(field.value.trim()?'':'Please complete this field.');}
    const phone=$('#phone'),digits=phone.value.replace(/\D/g,'');
    phone.setCustomValidity(phone.value.trim()&&(!/^[+()\d\s-]+$/.test(phone.value)||digits.length<8||digits.length>15)?'Use 8–15 digits, with spaces or a country code if needed.':'');
    $('#pin').value=$('#pin').value.trim();
    if(!phone.checkValidity()||!$('#pin').checkValidity())$('.optional-site').open=true;
    if(!form.reportValidity())return;
    const value=id=>$('#'+id).value.trim();
    const area=places.find(place=>place.name.toLowerCase()===value('location').toLowerCase());
    brief=['CEDAR & STONE BENGALURU — PROJECT BRIEF','Concept demo — no enquiry has been sent.','',`Name: ${value('name')}`,`Email: ${value('email')}`,...(value('phone')?[`Contact number: ${value('phone')}`]:[]),'City: Bengaluru',`Neighbourhood / area: ${value('location')}`,...(value('pin')?[`Site PIN: ${value('pin')}`]:[]),...(area?[`Approx. distance from Cubbon Park: ${area.km.toFixed(1)} km (straight line, not driving distance)`]:[]),`Property: ${value('property')}`,`Work requested: ${value('service')}`,`Material direction: ${value('material')||'Open to ideas'}`,...(savedWall?[`Wall exploration: ${finishNames[savedWall.texture]} / ${colourNames[savedWall.colour]}`]:[]),`Existing surface: ${value('condition')}`,...(value('property')==='Apartment exterior'?['Shared exterior: discuss association coordination, access and scaffolding.']:[]),...(value('notes')?['',`Project notes: ${value('notes')}`]:[]),'','Share this brief with your chosen Bengaluru contractor. Confirm site condition, dampness/repairs, physical samples, product system, access, weather planning and actual service availability.'].join('\n');
    $('#brief').textContent=brief;form.hidden=true;$('#project-result').hidden=false;$('#project-result').focus({preventScroll:true});
  });
  $('#download').addEventListener('click',()=>{
    if(!brief)return;const url=URL.createObjectURL(new Blob([brief],{type:'text/plain;charset=utf-8'})),link=document.createElement('a');link.href=url;link.download='cedar-stone-bengaluru-brief.txt';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
  $('#copy').addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText(brief);$('#copy-status').textContent='Brief copied. Ready for your next conversation.';}
    catch{$('#copy-status').textContent='Copy is unavailable here. Download the brief or select the text above.';}
  });
  function resetBrief(){form.reset();brief='';selected=null;savedWall=null;$('#brief').textContent='';$('#copy-status').textContent='';form.hidden=false;$('#project-result').hidden=true;$$('input,select,textarea',form).forEach(f=>f.setCustomValidity(''));areaSelect.value='';markArea('');$('#area-status').textContent='';$('#property-help').hidden=true;$('.optional-site').open=false;selectionSummary();}
  $('#reset').addEventListener('click',()=>{resetBrief();$('#name').focus({preventScroll:true});});

  const menu=$('.menu'),navigation=$('#navigation');
  function closeMenu(){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');navigation.classList.remove('open');}
  menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');navigation.classList.toggle('open',open);});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
  document.addEventListener('click',event=>{if(!navigation.contains(event.target)&&!menu.contains(event.target))closeMenu();});
  matchMedia('(min-width:851px)').addEventListener('change',closeMenu);
  function jumpTo(selector,behavior){
    const el=$(selector);if(!el)return;const top=el.getBoundingClientRect().top+scrollY-headerHeight;
    window.scrollTo({top,behavior:behavior??(reduced.matches?'instant':'smooth')});
  }
  $$('a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{
    const selector=link.getAttribute('href');if(!$(selector))return;event.preventDefault();closeMenu();
    if(selector==='#wall'&&!wall.enabled){wall.manual=0;renderWall(0);}
    jumpTo(selector);history.replaceState(null,'',selector);
    if(link.classList.contains('skip')){$('#main').tabIndex=-1;$('#main').focus({preventScroll:true});}
  }));

  function measure(){
    if(measuring||dialog.open)return;measuring=true;headerHeight=header.offsetHeight;
    const available=innerHeight-headerHeight,allowed=!reduced.matches&&available>=560;
    document.documentElement.style.setProperty('--scene',`${Math.max(560,available)}px`);
    wall.enabled=allowed;wall.section.classList.toggle('pinned',wall.enabled);wall.section.style.height=wall.enabled?`${available+innerHeight*1.15}px`:'';
    rail.track.style.transform='none';rail.viewport.scrollLeft=0;rail.padding=parseFloat(getComputedStyle(rail.track).paddingLeft)||0;
    rail.travel=Math.max(0,rail.track.scrollWidth-rail.viewport.clientWidth);rail.enabled=allowed&&rail.travel>1;
    rail.section.classList.toggle('pinned',rail.enabled);rail.section.style.height=rail.enabled?`${available+Math.max(160,rail.travel*(innerWidth<=600?.65:.4))}px`:'';
    rail.cards=$$('.finish-card').filter(c=>!c.hidden).map(el=>({el,left:el.offsetLeft,centre:el.offsetLeft+el.offsetWidth/2}));
    tape.enabled=allowed;tape.section.classList.toggle('pinned',tape.enabled);tape.unit=innerWidth<=600?58:110;tape.case=innerWidth<=600?94:118;tape.lead=parseFloat(getComputedStyle(tape.el).marginLeft)||0;
    tape.el.style.setProperty('--unit',`${tape.unit}px`);tape.el.style.setProperty('--case',`${tape.case}px`);
    $$('.major-tick').forEach(tick=>tick.style.left=`${Number(tick.dataset.km)*tape.unit}px`);
    places.forEach(place=>place.element.style.left=`${tape.case+place.km*tape.unit-5}px`);
    tape.labelWidth=places[0].element.offsetWidth;
    tape.section.style.height=tape.enabled?`${available+Math.max(850,TAPE_KM*tape.unit*.46)}px`:'';
    scenes.forEach(scene=>{scene.distance=scene.enabled?Math.max(1,scene.section.offsetHeight-scene.pin.offsetHeight):0;});
    $('.browse-hint b').textContent=rail.enabled?'SCROLL TO EXPLORE':'SWIPE OR USE THE ARROWS';
    resizeCanvas();measuring=false;render();
  }
  function render(){
    // Read scene positions together before writing transforms and masks.
    const wallP=wall.enabled?position(wall):wall.manual,tapeP=tape.enabled?position(tape):tape.manual;
    renderWall(wallP);renderRail();renderTape(tapeP);
    $$('.process-list article').forEach(row=>row.style.setProperty('--fill',String(reduced.matches?1:clamp((innerHeight-row.getBoundingClientRect().top)/(innerHeight*.65)))));
  }
  function requestRender(){if(frame)return;frame=true;requestAnimationFrame(()=>{frame=false;render();});}
  addEventListener('scroll',requestRender,{passive:true});
  addEventListener('resize',()=>{clearTimeout(measureTimer);measureTimer=setTimeout(measure,100);});
  reduced.addEventListener('change',measure);
  document.fonts.ready.then(measure);measure();
})();
