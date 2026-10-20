'use strict';

(() => {
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const clamp = value => Math.max(0, Math.min(1, value));
  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
  const header = $('.site-header');
  const wall = {section:$('#craft'), stage:$('#wall-stage'), pin:$('.wall-pin'), input:$('#wall-progress'), intro:$('.wall-intro'), picker:$('.finish-picker'), artwork:$('.wall-artwork'), enabled:false, manual:0, progress:0, active:-1};
  const rail = {section:$('#materials'), viewport:$('.material-viewport'), track:$('#material-grid'), enabled:false, travel:0, cards:[]};
  const tape = {section:$('#coverage'), viewport:$('.tape-window'), assembly:$('.tape-assembly'), input:$('#coverage-progress'), enabled:false, manual:0, unit:76, caseWidth:132};
  const stages = ['Paper & lath', 'Scratch coat', 'Base coat', 'The finish'];
  const textureNames = {float:'Fine float', dash:'Pebbled', smooth:'Smooth'};
  const colourNames = {ivory:'Warm white', sand:'Sand', clay:'Clay'};
  const colours = {ivory:'#e7e1cf', sand:'#d6c399', clay:'#be927c'};
  const finish = {texture:'float', colour:'ivory'};
  let headerHeight = 84;
  let framePending = false;
  let resizeTimer;
  let measuring = false;

  const places = [
    {distance:4, name:'Old town', note:'Familiar streets. A fresh perspective.'},
    {distance:8, name:'Riverside', note:'A little closer to the water.'},
    {distance:13, name:'Oak district', note:'Good bones. Room for a new chapter.'},
    {distance:18, name:'North ridge', note:'A different view of coming home.'},
    {distance:24, name:'Lakeview', note:'Natural textures. Quieter corners.'},
    {distance:30, name:'Hill country', note:'A little further into the landscape.'},
    {distance:37, name:'Coast road', note:'Where the road meets the water.'}
  ];
  for (let km=0; km<=40; km+=5) {
    const mark = document.createElement('span');
    mark.className = 'tape-major';
    mark.dataset.distance = String(km);
    mark.textContent = String(km);
    $('.tape-graduations').append(mark);
  }
  places.forEach((place, index) => {
    const element = document.createElement('article');
    element.className = 'tape-place';
    element.dataset.distance = String(place.distance);
    // All content is fixed illustrative copy, never visitor input.
    element.innerHTML = `<p class="eyebrow">${place.distance} KM / ILLUSTRATIVE</p><h3>${place.name}</h3><p>${place.note}</p>`;
    $('.tape-places').append(element);
    place.element = element;
    const item = document.createElement('li');
    item.textContent = `${place.name}: ${place.distance} illustrative kilometres from the fictional studio.`;
    $('#coverage-place-list').append(item);
  });
  // The spatial copy is exposed once in the equivalent text list.
  $('.tape-places').setAttribute('aria-hidden','true');

  function scenePosition(scene) {
    if (!scene.distance) return 0;
    return clamp((scrollY - scene.start) / scene.distance);
  }
  function moveScene(scene, progress) {
    window.scrollTo({top:scene.start + clamp(progress) * scene.distance, behavior:'instant'});
    requestRender();
  }
  function roughEdge(progress, layer) {
    if (progress <= 0) return {mask:'M0 0H0V1H0Z', line:''};
    if (progress >= 1) return {mask:'M0 0H1V1H0Z', line:''};
    const points = [];
    const leadingEdge = progress * 1.1 - .05;
    for (let step=0; step<=64; step++) {
      const y = step / 64;
      const roughness = Math.sin(step*.83+layer*4)*.006 + Math.sin(step*.37+layer)*.008 + Math.sin(step*2.1)*.002;
      points.push([leadingEdge + roughness, y]);
    }
    const edge = points.map(([x,y])=>`${x.toFixed(4)} ${y.toFixed(4)}`).join(' L');
    const line = points.map(([x,y])=>`${(x*1000).toFixed(2)} ${(y*1000).toFixed(2)}`).join(' L');
    return {mask:`M0 0 L${edge} L0 1Z`, line:`M${line}`};
  }
  const coats = [$('.wall-scratch'),$('.wall-brown'),$('.wall-finish')];
  coats.forEach((coat,index)=>{coat.style.clipPath=`url("#coat-clip-${index+1}")`;});
  const lastCoats = [-1,-1,-1];
  function renderWall(progress) {
    wall.progress = clamp(progress);
    const position = wall.progress * 3;
    coats.forEach((coat,index)=>{
      const coatProgress = clamp(position-index);
      if (Math.abs(lastCoats[index]-coatProgress)<.0001) return;
      lastCoats[index] = coatProgress;
      const path = roughEdge(coatProgress,index);
      $(`#coat-mask-${index+1}`).setAttribute('d',path.mask);
      $(`#coat-edge-${index+1}`).setAttribute('d',path.line);
    });
    const active = position<.025 ? 0 : Math.min(3,Math.ceil(position-.025));
    if (wall.active!==active) {
      wall.active = active;
      wall.stage.dataset.layer = String(active);
      $('#wall-label').textContent = `0${active+1} / ${stages[active].toUpperCase()}`;
      $('#wall-progress-label').textContent = `Layer ${active+1} of 4`;
      wall.artwork.setAttribute('aria-label',`Illustrative wall showing ${stages[active].toLowerCase()}`);
      $$('.layer-step').forEach((button,index)=>{
        button.classList.toggle('is-active',index===active);
        button.setAttribute('aria-pressed',String(index===active));
      });
    }
    $('.wall-steps').style.setProperty('--coat-progress',String(wall.progress));
    wall.input.value = String(Number(position.toFixed(3)));
    wall.input.setAttribute('aria-valuetext',stages[active]);
    const introOpacity = 1-clamp(wall.progress/.13);
    wall.intro.style.opacity = String(introOpacity);
    wall.intro.inert = introOpacity<.05;
    wall.intro.style.visibility = introOpacity===0 ? 'hidden' : 'visible';
    const pickerOpacity = clamp((wall.progress-.92)/.08);
    wall.picker.classList.toggle('is-ready',pickerOpacity>0);
    wall.picker.style.opacity = String(pickerOpacity);
    wall.picker.style.transform = `translateY(${(1-pickerOpacity)*12}px)`;
    wall.picker.inert = pickerOpacity<.9;
    canvas.style.opacity = String(1-clamp((wall.progress-.78)/.2));
    if (wall.progress>.12) wall.stage.classList.remove('is-troweling');
  }
  function selectWallStage(position) {
    wall.manual = clamp(Number(position)/3);
    renderWall(wall.manual);
    if (wall.enabled) moveScene(wall,wall.manual);
  }
  wall.input.addEventListener('input',()=>selectWallStage(wall.input.value));
  wall.input.addEventListener('keydown',event=>{
    const forward = ['ArrowRight','ArrowUp'].includes(event.key);
    const backward = ['ArrowLeft','ArrowDown'].includes(event.key);
    if (!forward && !backward) return;
    event.preventDefault();
    const current = Number(wall.input.value);
    const next = forward ? Math.floor(current+.001)+1 : Math.ceil(current-.001)-1;
    selectWallStage(Math.max(0,Math.min(3,next)));
  });
  $$('.layer-step').forEach(button=>button.addEventListener('click',()=>selectWallStage(button.dataset.layer)));
  $$('.finish-options button').forEach(button=>button.addEventListener('click',()=>{
    finish.texture = button.dataset.finish;
    wall.stage.dataset.finish = finish.texture;
    $$('.finish-options button').forEach(item=>{
      item.classList.toggle('is-active',item===button);
      item.setAttribute('aria-pressed',String(item===button));
    });
  }));
  $$('.finish-colours button').forEach(button=>button.addEventListener('click',()=>{
    finish.colour = button.dataset.wallColour;
    wall.stage.dataset.colour = finish.colour;
    wall.stage.style.setProperty('--finish-colour',colours[finish.colour]);
    $$('.finish-colours button').forEach(item=>{
      item.classList.toggle('is-active',item===button);
      item.setAttribute('aria-pressed',String(item===button));
    });
  }));
  $('#save-wall-finish').addEventListener('click',()=>{
    document.dispatchEvent(new CustomEvent('wall:save',{detail:{textureKey:finish.texture,colourKey:finish.colour,texture:textureNames[finish.texture],colour:colourNames[finish.colour]}}));
  });

  // A local canvas deposits tactile marks independently of construction progress.
  const canvas = $('#trowel-canvas');
  const context = canvas.getContext('2d');
  const trowel = $('.trowel-tool');
  const brushImage = new Image();
  const brushTile = document.createElement('canvas');
  brushTile.width=256; brushTile.height=256;
  let brushPattern;
  let previousPoint = null;
  let canvasWidth=0, canvasHeight=0, backingScale=1;
  function makeBrushPattern() {
    const tile = brushTile.getContext('2d');
    tile.fillStyle='#e7e1cf';tile.fillRect(0,0,256,256);
    if (brushImage.complete && brushImage.naturalWidth) {
      tile.globalCompositeOperation='multiply';tile.globalAlpha=.25;tile.drawImage(brushImage,0,0,256,256);tile.globalAlpha=1;tile.globalCompositeOperation='source-over';
    }
    brushPattern=context.createPattern(brushTile,'repeat');
  }
  function stamp(x,y,angle=0) {
    context.save();context.translate(x,y);context.rotate(angle);
    context.beginPath();
    const points=[];
    for (let i=0;i<=32;i++) {
      const theta=i/32*Math.PI*2;
      const rough=1+Math.sin(i*2.4)*.025+Math.sin(i*.8)*.03;
      points.push([Math.cos(theta)*75*rough,Math.sin(theta)*35*rough]);
    }
    points.forEach(([px,py],index)=>{if(index===0)context.moveTo(px,py);else context.lineTo(px,py);});
    context.closePath();context.shadowColor='#19261c10';context.shadowBlur=2;context.shadowOffsetY=1;context.fillStyle=brushPattern||'#e7e1cf';context.fill();context.restore();
  }
  function stroke(from,to) {
    const distance=Math.hypot(to.x-from.x,to.y-from.y);
    const count=Math.min(40,Math.max(1,Math.ceil(distance/13)));
    const angle=Math.atan2(to.y-from.y,to.x-from.x)*.16;
    for(let i=0;i<=count;i++){
      const t=i/count;stamp(from.x+(to.x-from.x)*t,from.y+(to.y-from.y)*t,angle);
    }
  }
  function seedBrush() {
    stroke({x:canvasWidth*.61,y:canvasHeight*.67},{x:canvasWidth*.86,y:canvasHeight*.65});
    stroke({x:canvasWidth*.67,y:canvasHeight*.79},{x:canvasWidth*.92,y:canvasHeight*.77});
  }
  function resizeCanvas() {
    const rect=wall.stage.getBoundingClientRect();
    if (Math.abs(rect.width-canvasWidth)<1 && Math.abs(rect.height-canvasHeight)<1) return;
    canvasWidth=rect.width;canvasHeight=rect.height;backingScale=Math.min(devicePixelRatio||1,2);
    canvas.width=Math.round(canvasWidth*backingScale);canvas.height=Math.round(canvasHeight*backingScale);
    context.setTransform(backingScale,0,0,backingScale,0,0);
    makeBrushPattern();seedBrush();previousPoint=null;
  }
  brushImage.onload=()=>{makeBrushPattern();if(canvasWidth){context.clearRect(0,0,canvasWidth,canvasHeight);seedBrush();}};
  brushImage.src='assets/grain-float.svg';
  wall.stage.addEventListener('pointermove',event=>{
    if(event.pointerType==='touch'||motionPreference.matches||wall.progress>.1||event.target.closest('a,button,input')){
      previousPoint=null;wall.stage.classList.remove('is-troweling');return;
    }
    const rect=wall.stage.getBoundingClientRect();
    const point={x:event.clientX-rect.left,y:event.clientY-rect.top};
    if(previousPoint)stroke(previousPoint,point);else stamp(point.x,point.y);
    previousPoint=point;
    trowel.style.transform=`translate(${point.x-38}px,${point.y-28}px) rotate(-12deg)`;
    wall.stage.classList.add('is-troweling');
  },{passive:true});
  wall.stage.addEventListener('pointerleave',()=>{previousPoint=null;wall.stage.classList.remove('is-troweling');});
  $('.trowel-try').addEventListener('click',()=>{
    stroke({x:canvasWidth*.32,y:canvasHeight*.76},{x:canvasWidth*.62,y:canvasHeight*.7});
  });

  function renderRail() {
    const position=rail.enabled ? scenePosition(rail)*rail.travel : rail.viewport.scrollLeft;
    if(rail.enabled){
      rail.track.style.transform=`translate3d(${-position}px,0,0)`;
      if(rail.viewport.scrollLeft)rail.viewport.scrollLeft=0;
    }
    let closest=0,best=Infinity;
    const centre=position+rail.viewport.clientWidth*.5;
    rail.cards.forEach((card,index)=>{
      const distance=Math.abs(card.centre-centre);
      if(distance<best){best=distance;closest=index;}
    });
    $('#rail-position').textContent=`${String(closest+1).padStart(2,'0')} / ${String(rail.cards.length).padStart(2,'0')}`;
    $('#material-previous').disabled=position<2;
    $('#material-next').disabled=position>=rail.travel-2;
  }
  function scrollRailTo(left, immediate=false) {
    const position=Math.max(0,Math.min(rail.travel,left));
    if(rail.enabled)moveScene(rail,rail.travel ? position/rail.travel : 0);
    else rail.viewport.scrollTo({left:position,behavior:immediate||motionPreference.matches?'instant':'smooth'});
  }
  function stepRail(direction) {
    const current=rail.enabled ? scenePosition(rail)*rail.travel : rail.viewport.scrollLeft;
    const stops=[0,...rail.cards.map(card=>Math.max(0,Math.min(rail.travel,card.left-rail.padding))),rail.travel];
    let target;
    if(direction>0)target=stops.find(stop=>stop>current+8);
    else target=[...stops].reverse().find(stop=>stop<current-8);
    scrollRailTo(target===undefined ? (direction>0?rail.travel:0) : target);
  }
  $('#material-previous').addEventListener('click',()=>stepRail(-1));
  $('#material-next').addEventListener('click',()=>stepRail(1));
  rail.viewport.addEventListener('scroll',requestRender,{passive:true});
  rail.viewport.addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
    event.preventDefault();
    if(event.key==='Home')scrollRailTo(0,true);
    else if(event.key==='End')scrollRailTo(rail.travel,true);
    else stepRail(event.key==='ArrowRight'?1:-1);
  });
  rail.viewport.addEventListener('focusin',event=>{
    if(!rail.enabled)return;
    const card=event.target.closest('.material-card');
    if(!card)return;
    const bounds=card.getBoundingClientRect(),windowBounds=rail.viewport.getBoundingClientRect();
    if(bounds.left<windowBounds.left || bounds.right>windowBounds.right)scrollRailTo(card.offsetLeft-rail.padding);
  });
  document.addEventListener('materials:filter',()=>{
    measure();
    if(rail.enabled)moveScene(rail,0);
    else rail.viewport.scrollTo({left:0,behavior:'instant'});
    requestRender();
  });

  function renderTape(progress) {
    if(tape.enabled && tape.viewport.scrollLeft)tape.viewport.scrollLeft=0;
    const distance=clamp(progress)*40;
    const bladeLength=tape.enabled ? distance*tape.unit : 40*tape.unit;
    const targetEnd=innerWidth*(innerWidth<=600?.88:.76);
    const shift=tape.enabled ? Math.min(0,targetEnd-innerWidth*.06-tape.caseWidth-bladeLength) : 0;
    tape.assembly.style.setProperty('--blade-length',`${bladeLength}px`);
    tape.assembly.style.setProperty('--blade-visible',String(bladeLength>1?1:0));
    tape.assembly.style.setProperty('--tape-x',`${shift}px`);
    places.forEach(place=>{
      const opacity=tape.enabled ? clamp((distance-place.distance+3)/3) : 1;
      place.element.style.opacity=String(opacity);
    });
    tape.input.value=String(Number(distance.toFixed(2)));
    $('#coverage-distance').textContent=`${Math.round(distance)} km`;
    tape.input.setAttribute('aria-valuetext',`${Math.round(distance)} illustrative kilometres`);
  }
  tape.input.addEventListener('input',()=>{
    tape.manual=clamp(Number(tape.input.value)/40);
    renderTape(tape.manual);
    if(tape.enabled)moveScene(tape,tape.manual);
    else tape.viewport.scrollTo({left:tape.manual*Math.max(0,tape.viewport.scrollWidth-tape.viewport.clientWidth),behavior:'instant'});
  });
  tape.viewport.addEventListener('scroll',()=>{
    if(tape.enabled)return;
    const travel=tape.viewport.scrollWidth-tape.viewport.clientWidth;
    tape.manual=travel>0?clamp(tape.viewport.scrollLeft/travel):0;
    renderTape(tape.manual);
  },{passive:true});
  tape.viewport.addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight'].includes(event.key))return;
    event.preventDefault();
    const current=tape.enabled?scenePosition(tape):tape.manual;
    tape.manual=clamp(current+(event.key==='ArrowRight'?.125:-.125));
    renderTape(tape.manual);
    if(tape.enabled)moveScene(tape,tape.manual);
    else tape.viewport.scrollTo({left:tape.manual*Math.max(0,tape.viewport.scrollWidth-tape.viewport.clientWidth),behavior:'instant'});
  });

  function measure() {
    if(measuring)return;
    measuring=true;
    headerHeight=header.offsetHeight;
    const available=innerHeight-headerHeight;
    const allowMotion=!motionPreference.matches && available>=540;
    document.documentElement.style.setProperty('--pin-height',`${Math.max(540,available)}px`);
    wall.enabled=allowMotion;
    wall.section.classList.toggle('is-pinned',wall.enabled);
    wall.section.style.height=wall.enabled?`${available+innerHeight*2.05}px`:'';
    rail.enabled=allowMotion&&innerWidth>=900;
    rail.section.classList.toggle('is-pinned',rail.enabled);
    rail.track.style.transform='none';rail.viewport.scrollLeft=0;
    rail.padding=innerWidth*.06;
    rail.travel=Math.max(0,rail.track.scrollWidth-rail.viewport.clientWidth);
    if(rail.travel<1){rail.enabled=false;rail.section.classList.remove('is-pinned');}
    rail.section.style.height=rail.enabled?`${available+rail.travel*.8}px`:'';
    rail.cards=$$('.material-card',rail.track).filter(card=>!card.hidden).map(element=>({element,left:element.offsetLeft,centre:element.offsetLeft+element.offsetWidth/2}));
    tape.enabled=allowMotion;
    tape.section.classList.toggle('is-pinned',tape.enabled);
    tape.unit=innerWidth<=600?40:76;
    tape.caseWidth=innerWidth<=600?106:132;
    tape.assembly.style.setProperty('--km-unit',`${tape.unit}px`);
    tape.assembly.style.setProperty('--case-width',`${tape.caseWidth}px`);
    $$('.tape-major').forEach(mark=>{mark.style.left=`${Number(mark.dataset.distance)*tape.unit}px`;});
    places.forEach(place=>{place.element.style.left=`${tape.caseWidth+place.distance*tape.unit}px`;});
    tape.section.style.height=tape.enabled?`${available+40*tape.unit*.65}px`:'';
    [wall,rail,tape].forEach(scene=>{
      const bounds=scene.section.getBoundingClientRect();
      scene.start=bounds.top+scrollY-headerHeight;
      scene.distance=scene.enabled?Math.max(1,scene.section.offsetHeight-available):0;
    });
    resizeCanvas();
    $('.rail-scroll-hint').lastChild.textContent=rail.enabled?' SCROLL TO EXPLORE':' SWIPE OR USE THE ARROWS';
    measuring=false;
    render();
  }
  function render() {
    if(wall.enabled)renderWall(scenePosition(wall));else renderWall(wall.manual);
    renderRail();
    renderTape(tape.enabled?scenePosition(tape):tape.manual);
    $$('.process-row').forEach(row=>{
      const progress=motionPreference.matches?1:clamp((innerHeight-row.getBoundingClientRect().top)/(innerHeight*.6));
      row.style.setProperty('--row-progress',String(progress));
    });
  }
  function requestRender() {
    if(framePending)return;
    framePending=true;
    requestAnimationFrame(()=>{framePending=false;render();});
  }
  addEventListener('scroll',requestRender,{passive:true});
  addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(measure,100);});
  motionPreference.addEventListener('change',measure);
  // Closing a dialog restores the body scrollbar and can change section geometry.
  $('#material-dialog').addEventListener('close',()=>requestAnimationFrame(measure));
  document.fonts.ready.then(measure);
  measure();
})();
