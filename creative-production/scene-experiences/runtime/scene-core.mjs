/** Original dependency-free reference state. Not a new product/verification authority. */
export const SCENES = Object.freeze([
  {id:'arrival', title:'A space shaped by light.', line:'Meet Lumen. A conceptual optical instrument, suspended inside its own world.', hint:'Scroll to enter, or choose a scene.'},
  {id:'approach', title:'Move closer. Notice more.', line:'A shared axis. A solid shell. A light plane. The room gives the object its scale.', hint:'The camera moves; the object remains the same.'},
  {id:'construction', title:'Nothing here floats by accident.', line:'The housing, iris and emitter separate along one construction axis.', hint:'Toggle the section to inspect the layers.'},
  {id:'participate', title:'Your gesture changes the room.', line:'Open the aperture. The light, the opening and the floor respond together.', hint:'Drag the aperture control. Keyboard arrows work too.'},
  {id:'threshold', title:'The frame was only a threshold.', line:'The instrument becomes an environment. Your chosen aperture and finish travel with you.', hint:'A spatial transition, not another slide.'},
  {id:'resolve', title:'A world. Then a useful interface.', line:'Keep the configuration. Revisit a detail. Or leave the scene and read the ordinary document.', hint:'The experience serves the task—not the other way around.'},
]);
export const FINISHES = Object.freeze(['silver','graphite','ceramic']);
export function clamp(value, min=0, max=1) {
  if (typeof value !== 'number' || !Number.isFinite(value)) throw new TypeError('Expected a finite number');
  return Math.min(max,Math.max(min,value));
}
export function smoothstep(value) { const x=clamp(value); return x*x*(3-2*x); }
export function mix(a,b,t) { return a+(b-a)*t; }
export function initialState() { return {aperture:0.62, finish:'silver', section:false, pointerX:0, pointerY:0}; }
export function reduceState(state, action) {
  if (!action || typeof action.type !== 'string') throw new TypeError('Action requires a type');
  switch(action.type) {
    case 'aperture': return {...state, aperture:clamp(action.value)};
    case 'finish': if (!FINISHES.includes(action.value)) throw new RangeError('Unknown finish'); return {...state,finish:action.value};
    case 'section': if(typeof action.value!=='boolean')throw new TypeError('Section requires boolean');return {...state,section:action.value};
    case 'pointer': return {...state,pointerX:clamp(action.x,-1,1),pointerY:clamp(action.y,-1,1)};
    case 'reset': return initialState();
    default: throw new RangeError('Unknown action: '+action.type);
  }
}
export function progressFromFrame(frame, duration) {
  if (!Number.isInteger(duration) || duration < 1) throw new RangeError('Duration must be a positive integer');
  if (!Number.isInteger(frame) || frame < 0 || frame >= duration) throw new RangeError('Frame outside composition');
  return duration === 1 ? 0 : frame/(duration-1);
}
export function sceneIndex(progress) {return Math.min(SCENES.length-1,Math.floor(clamp(progress)*SCENES.length));}
const POSES = Object.freeze([
 {scale:0.70,yaw:-0.54,pitch:-0.1,roll:-0.18,explode:0,portal:0,room:1,shift:0},
 {scale:0.98,yaw:-0.38,pitch:0.02,roll:-0.1,explode:0,portal:0,room:0.9,shift:0},
 {scale:0.84,yaw:-0.45,pitch:0.04,roll:-0.14,explode:1,portal:0,room:0.65,shift:-0.03},
 {scale:1.05,yaw:-0.20,pitch:0,roll:0,explode:0.18,portal:0,room:0.6,shift:0},
 {scale:1.04,yaw:0,pitch:0,roll:0,explode:0,portal:0,room:0.5,shift:-0.07},
 {scale:3.65,yaw:0,pitch:0,roll:0,explode:0,portal:1,room:0.2,shift:-0.17},
 {scale:0.98,yaw:-0.38,pitch:0,roll:-0.1,explode:0,portal:0,room:0.8,shift:0},
]);
export function evaluateScene(progress, state=initialState(), {reducedMotion=false}={}) {
 const p=clamp(progress), index=sceneIndex(p), local=p===1?1:p*SCENES.length-index;
 if(!FINISHES.includes(state.finish))throw new RangeError('Unknown state finish');
 const aperture=clamp(state.aperture);
 // Reduced motion uses a single deliberately staged pose per chapter, not a slow camera flight.
 const t=reducedMotion?0.80:smoothstep(clamp(local/0.80));
 const a=POSES[index],b=POSES[index+1],pose={};
 for(const k of Object.keys(a))pose[k]=mix(a[k],b[k],t);
 if(state.section)pose.explode=Math.max(pose.explode,0.82);
 return {progress:p,index,local,scene:SCENES[index],pose,aperture,finish:state.finish,section:state.section,
  pointerX:reducedMotion?0:clamp(state.pointerX,-1,1),pointerY:reducedMotion?0:clamp(state.pointerY,-1,1),reducedMotion};
}
