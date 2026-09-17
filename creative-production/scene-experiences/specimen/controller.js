// Inlined by build_specimen.py from the same source tested in Node.
(() => {
 'use strict';
 const art=document.getElementById('art'),stage=document.getElementById('stage');
 const motionQuery=matchMedia('(prefers-reduced-motion: reduce)');
 let state=initialState(),reduced=motionQuery.matches,held=false,holdProgress=0,scheduled=false,lastFrame=null;
 let renderCount=0,disposed=false;
 const refs={title:document.getElementById('scene-title'),line:document.getElementById('scene-line'),hint:document.getElementById('scene-hint'),label:document.getElementById('scene-label'),chapter:document.getElementById('chapter'),aperture:document.getElementById('aperture'),value:document.getElementById('aperture-value'),motion:document.getElementById('motion'),hold:document.getElementById('hold'),section:document.getElementById('section'),summary:document.getElementById('configuration')};
 function maxRail(){return Math.max(1,document.getElementById('chapters').offsetHeight-innerHeight);}
 function progress(){return held?holdProgress:clamp(scrollY/maxRail());}
 function dispatch(action){state=reduceState(state,action);requestRender();}
 function draw(){
  scheduled=false;if(disposed||document.hidden)return;
  const f=evaluateScene(progress(),state,{reducedMotion:reduced});lastFrame=f;
  const w=Math.max(1,stage.clientWidth),h=Math.max(1,stage.clientHeight);
  art.innerHTML=renderSceneSVG(f,w,h);renderCount++;
  refs.title.textContent=f.scene.title;refs.line.textContent=f.scene.line;refs.hint.textContent=f.scene.hint;
  refs.label.textContent=`Lumen / ${String(f.index+1).padStart(2,'0')} — ${['The room','The approach','The mechanism','The response','The passage','The return'][f.index]}`;
  refs.chapter.value=f.scene.id;refs.aperture.value=String(Math.round(state.aperture*100));refs.value.value=Math.round(state.aperture*100)+'%';
  refs.section.setAttribute('aria-pressed',String(state.section));refs.hold.setAttribute('aria-pressed',String(held));refs.hold.textContent=held?'Resume scene':'Hold scene';
  refs.motion.setAttribute('aria-pressed',String(reduced));refs.motion.textContent=reduced?'Motion off':'Motion on';
  for(const b of document.querySelectorAll('[data-finish]'))b.setAttribute('aria-pressed',String(b.dataset.finish===state.finish));
  refs.summary.textContent=`${state.finish[0].toUpperCase()+state.finish.slice(1)} finish · Aperture ${Math.round(state.aperture*100)}%${state.section?' · Section open':''}`;
  document.body.dataset.scene=f.scene.id;document.body.dataset.motion=reduced?'off':'on';
  document.getElementById('meter-fill').style.width=(clamp(scrollY/maxRail())*100)+'%';
 }
 function requestRender(){if(!scheduled&&!disposed&&!document.hidden){scheduled=true;requestAnimationFrame(draw);}}
 function goScene(id){const i=SCENES.findIndex(s=>s.id===id);if(i<0)return false;held=false;window.scrollTo({top:Math.round(((i+.12)/SCENES.length)*maxRail()),behavior:'auto'});requestRender();return true;}
 const aborter=new AbortController(),opts={signal:aborter.signal};
 refs.aperture.addEventListener('input',()=>dispatch({type:'aperture',value:Number(refs.aperture.value)/100}),opts);
 refs.chapter.addEventListener('change',()=>goScene(refs.chapter.value),opts);
 for(const b of document.querySelectorAll('[data-finish]'))b.addEventListener('click',()=>dispatch({type:'finish',value:b.dataset.finish}),opts);
 refs.section.addEventListener('click',()=>dispatch({type:'section',value:!state.section}),opts);
 refs.hold.addEventListener('click',()=>{if(!held)holdProgress=progress();held=!held;requestRender();},opts);
 refs.motion.addEventListener('click',()=>{reduced=!reduced;state={...state,pointerX:0,pointerY:0};requestRender();},opts);
 document.getElementById('reset').addEventListener('click',()=>{state=initialState();held=false;requestRender();},opts);
 stage.addEventListener('pointermove',e=>{if(reduced||held||e.pointerType==='touch')return;const box=stage.getBoundingClientRect();dispatch({type:'pointer',x:clamp((e.clientX-box.left)/box.width*2-1,-1,1),y:clamp((e.clientY-box.top)/box.height*2-1,-1,1)});},opts);
 stage.addEventListener('pointerleave',()=>{if(!held)dispatch({type:'pointer',x:0,y:0});},opts);
 window.addEventListener('scroll',requestRender,{...opts,passive:true});window.addEventListener('resize',requestRender,opts);
 document.addEventListener('visibilitychange',()=>{scheduled=false;requestRender();},opts);
 motionQuery.addEventListener('change',e=>{reduced=e.matches;state={...state,pointerX:0,pointerY:0};requestRender();},opts);
 for(const a of document.querySelectorAll('[data-scene-link]'))a.addEventListener('click',e=>{if(goScene(a.dataset.sceneLink))e.preventDefault();},opts);
 window.addEventListener('hashchange',()=>goScene(location.hash.slice(1)),opts);
 // Explicitly untrusted observation/export hook; external tests still drive actual controls.
 window.__sceneExperience={
  snapshot:()=>({state:{...state},frame:lastFrame?JSON.parse(JSON.stringify(lastFrame)):null,held,reduced,renderCount,backend:'svg-projection',visible:!document.hidden,disposed}),
  seek:p=>{held=true;holdProgress=clamp(p);draw();},
  dispose:()=>{disposed=true;aborter.abort();},
 };
 document.body.dataset.enhanced='true';
 if(location.hash)goScene(location.hash.slice(1));draw();
})();
