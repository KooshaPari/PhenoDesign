/** Original SVG/projected-geometry blocking renderer. No WebGL or physical-rendering claim. */
export function escapeXML(value) {return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));}
export function renderSceneSVG(f,width=1440,height=900) {
 if(!Number.isFinite(width)||!Number.isFinite(height)||width<1||height<1||width>16384||height>16384)throw new RangeError('Invalid dimensions');
 const w=width,h=height,mobile=w<700, aperture=f.aperture, p=f.pose;
 const cx=w*(mobile?0.52:0.67)+w*p.shift*(mobile?0.3:1)+f.pointerX*6;
 const cy=h*(mobile?0.59:0.49)+f.pointerY*4;
 const r=Math.min(w*(mobile?0.37:0.205),h*(mobile?0.29:0.34))*p.scale;
 const aspect=Math.cos(p.yaw), roll=p.roll*180/Math.PI, sep=p.explode*r*0.76;
 const palette={silver:['#e4e9e8','#78878a','#26363b','#f4f5f2'],graphite:['#7b898c','#233138','#0c171d','#b8c8c9'],ceramic:['#f4ead7','#a99d87','#4b4541','#fff5df']}[f.finish];
 const o=palette;
 const n=v=>Number(v).toFixed(2), origin=(dx,dy)=>`translate(${n(cx+dx)} ${n(cy+dy)}) rotate(${n(roll)}) scale(${n(aspect)} 1)`;
 const inner=r*(0.19+0.29*aperture),outer=r*0.72;
 const out=[];
 out.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" aria-hidden="true" focusable="false" data-renderer="svg-projection" data-scene="${escapeXML(f.scene.id)}">`);
 out.push(`<defs>
 <radialGradient id="room-glow"><stop stop-color="#315d65" stop-opacity=".40"/><stop offset="1" stop-color="#0b141a" stop-opacity="0"/></radialGradient>
 <linearGradient id="steel" x1=".1" y1="0" x2=".88" y2="1"><stop stop-color="${o[3]}"/><stop offset=".18" stop-color="${o[1]}"/><stop offset=".39" stop-color="${o[0]}"/><stop offset=".54" stop-color="${o[2]}"/><stop offset=".77" stop-color="${o[1]}"/><stop offset="1" stop-color="${o[3]}"/></linearGradient>
 <linearGradient id="side"><stop stop-color="${o[2]}"/><stop offset=".48" stop-color="${o[1]}"/><stop offset="1" stop-color="${o[2]}"/></linearGradient>
 <radialGradient id="lens"><stop stop-color="#f0fbef"/><stop offset=".18" stop-color="#b0e3d9"/><stop offset=".56" stop-color="#54958e"/><stop offset=".86" stop-color="#1e464d"/><stop offset="1" stop-color="#08171f"/></radialGradient>
 <radialGradient id="beamFloor"><stop stop-color="#b8ece1" stop-opacity="${n(.19+aperture*.22)}"/><stop offset=".4" stop-color="#7ebab5" stop-opacity=".12"/><stop offset="1" stop-color="#7ebab5" stop-opacity="0"/></radialGradient>
 <linearGradient id="beam" x1="0" y1="0" x2=".3" y2="1"><stop stop-color="#b5ebe0" stop-opacity="${n(.06+aperture*.10)}"/><stop offset="1" stop-color="#7ebab5" stop-opacity=".01"/></linearGradient>
 <linearGradient id="blade"><stop stop-color="#5c7376"/><stop offset=".48" stop-color="#1c313a"/><stop offset="1" stop-color="#08151e"/></linearGradient>
 <radialGradient id="innerLight"><stop stop-color="#f0fff2"/><stop offset=".65" stop-color="#aadbd2"/><stop offset="1" stop-color="#28616b"/></radialGradient>
 <linearGradient id="fade"><stop stop-color="#0b141b" stop-opacity=".0"/><stop offset="1" stop-color="#0b141b" stop-opacity=".9"/></linearGradient>
 </defs>`);
 // Stage: architectural rails, shared floor and light cone.
 out.push(`<rect width="${w}" height="${h}" fill="#0b141b"/><ellipse cx="${n(cx)}" cy="${n(cy)}" rx="${n(w*.6)}" ry="${n(h*.75)}" fill="url(#room-glow)"/>`);
 const horizon=h*.69;
 out.push(`<g opacity="${n(.28*p.room+.07)}" stroke="#5d7881" fill="none" stroke-width=".7">`);
 for(let i=-7;i<=7;i++){const x=w*.5+i*w*.19;out.push(`<path d="M ${n(w*.60)} ${n(horizon)} L ${n(x)} ${h}"/>`);}
 for(let j=1;j<7;j++){const y=horizon+(h-horizon)*(j/6)**2;out.push(`<path d="M 0 ${n(y)}H ${w}"/>`);}
 out.push(`<path d="M ${n(w*.06)} ${n(h*.12)}H ${n(w*.94)}V ${n(h*.7)}H ${n(w*.06)}Z"/><path d="M ${n(w*.11)} ${n(h*.18)}H ${n(w*.89)}V ${n(h*.65)}H ${n(w*.11)}Z"/></g>`);
 const beamWidth=r*(.5+aperture*1.8),floorY=h*.83;
 out.push(`<path d="M ${n(cx-inner*.5)} ${n(cy)} L ${n(cx-beamWidth)} ${n(floorY)} Q ${n(cx)} ${n(floorY+h*.16)} ${n(cx+beamWidth)} ${n(floorY)} L ${n(cx+inner*.5)} ${n(cy)} Z" fill="url(#beam)"/>`);
 out.push(`<ellipse cx="${n(cx+f.pointerX*40)}" cy="${n(floorY)}" rx="${n(beamWidth*1.3)}" ry="${n(h*.12)}" fill="url(#beamFloor)"/>`);
 // Rear emitter, housing and front iris all share one axis.
 const rearX=-r*.13-sep*.62,rearY=r*.035+sep*.19;
 out.push(`<g transform="${origin(rearX,rearY)}"><circle r="${n(r*.86)}" fill="#0a1920" stroke="url(#steel)" stroke-width="${n(r*.07)}"/><circle r="${n(r*.69)}" fill="url(#lens)"/>`);
 for(let i=0;i<12;i++)out.push(`<circle r="${n(r*(.15+i*.045))}" fill="none" stroke="#c9f6e4" opacity=".15" stroke-width=".6"/>`);
 out.push('</g>');
 // Depth stack/knurling on the housing.
 for(let j=7;j>=0;j--){const dx=-r*.09-j*r*.012,dy=j*r*.003;out.push(`<g transform="${origin(dx,dy)}"><circle r="${n(r)}" fill="none" stroke="url(#side)" stroke-width="${n(r*.13)}"/></g>`);}
 out.push(`<g transform="${origin(0,0)}"><circle r="${n(r)}" fill="none" stroke="url(#steel)" stroke-width="${n(r*.09)}"/><circle r="${n(r*.925)}" fill="none" stroke="#f2f4ec" stroke-opacity=".32" stroke-width="${n(r*.01)}"/>`);
 for(let i=0;i<72;i++){let a=i*Math.PI*2/72;out.push(`<path d="M ${n(Math.cos(a)*r*.97)} ${n(Math.sin(a)*r*.97)}L ${n(Math.cos(a)*r*1.025)} ${n(Math.sin(a)*r*1.025)}" stroke="${i%6===0?'#e4efe6':'#22363b'}" stroke-opacity=".5" stroke-width="${i%6===0?1.4:.7}"/>`);}
 out.push('</g>');
 const irisX=sep*.80,irisY=-sep*.25;
 out.push(`<g transform="${origin(irisX,irisY)}"><circle r="${n(r*.86)}" fill="#111f28" stroke="url(#steel)" stroke-width="${n(r*.055)}"/><circle r="${n(outer)}" fill="url(#blade)"/><circle r="${n(inner)}" fill="url(#innerLight)"/>`);
 // Eight blades define a real changing opening in this stylized projection.
 const blades=8;
 for(let i=0;i<blades;i++){
 const a=i*Math.PI*2/blades+.14, b=(i+1)*Math.PI*2/blades+.14;
 const points=[[Math.cos(a)*inner,Math.sin(a)*inner],[Math.cos(a-.58)*outer,Math.sin(a-.58)*outer],[Math.cos(b-.58)*outer,Math.sin(b-.58)*outer],[Math.cos(b)*inner,Math.sin(b)*inner]];
 out.push(`<path d="M ${points.map(v=>n(v[0])+' '+n(v[1])).join(' L ')} Z" fill="url(#blade)" stroke="#8eabaa" stroke-opacity=".3" stroke-width=".7"/>`);
 }
 out.push(`<circle r="${n(r*.80)}" fill="none" stroke="#c4dbd6" stroke-opacity=".21" stroke-width="1"/><path d="M ${n(-r*.56)} ${n(-r*.60)} A ${n(r*.82)} ${n(r*.82)} 0 0 1 ${n(r*.56)} ${n(-r*.60)}" fill="none" stroke="#f5fff6" stroke-opacity=".44" stroke-width="${n(r*.012)}"/>`);
 // Marker on front housing, no baked essential information.
 out.push(`<rect x="${n(-r*.02)}" y="${n(-r*.845)}" width="${n(r*.04)}" height="${n(r*.04)}" rx="1" fill="#7ebab5"/></g>`);
 // Controlled foreground stage corners; conceptually a frame the portal crosses.
 out.push(`<g fill="none" stroke="#80989d" stroke-opacity=".45"><path d="M 24 62V 24H 62M ${w-62} 24H ${w-24}V 62M 24 ${h-62}V ${h-24}H 62M ${w-62} ${h-24}H ${w-24}V ${h-62}"/></g>`);
 if(f.index===2||f.section){out.push(`<g stroke="#7ebab5" stroke-opacity=".55" fill="none"><path d="M ${n(cx-r*.95-sep*.6)} ${n(cy+r*1.18)}H ${n(cx+r*.8+sep*.8)}" stroke-dasharray="3 5"/></g>`);}
 // Pointer light is bounded and purely local. No sensor/network use.
 out.push(`<ellipse cx="${n(cx-r*.35+f.pointerX*r*.30)}" cy="${n(cy-r*.36+f.pointerY*r*.22)}" rx="${n(r*.17)}" ry="${n(r*.025)}" fill="#effff5" opacity=".09" transform="rotate(-35 ${n(cx-r*.35)} ${n(cy-r*.36)})"/>`);
 out.push('</svg>');return out.join('');
}
