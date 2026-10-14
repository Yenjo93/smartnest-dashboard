import{ab as t,A as o,ac as i,ad as s,ae as e,v as r,x as n,n as a,r as h,i as l,af as d,a as p,b as c,ag as u,t as f}from"./app-BUxNlv1J.js";import"./loader-43RavMas.js";const g=(t,o,i,s,e=0)=>`<rect x="${t}" y="${o}" width="${i}" height="${s}" rx="${e}"/>`,$=(t,o,i)=>`<circle cx="${t}" cy="${o}" r="${i}"/>`,m=(t,o,i,s)=>`<line x1="${t}" y1="${o}" x2="${i}" y2="${s}"/>`,w=(t,o,i,s)=>`<ellipse cx="${t}" cy="${o}" rx="${i}" ry="${s}"/>`,b={sofa:{w:210,h:90,group:"living",draw:(t,o)=>g(0,0,t,o,10)+g(0,0,t,.28*o,8)+g(0,0,.1*t,o,8)+g(.9*t,0,.1*t,o,8)+m(t/2,.28*o,t/2,o)},sofa_l:{w:260,h:180,group:"living",draw:(t,o)=>`<path d="M0 0 H${t} V${.5*o} H${.38*t} V${o} H0 Z" stroke-linejoin="round"/><path d="M0 ${.16*o} H${t}" />`+m(.16*t,.16*o,.16*t,o)+m(.38*t,.16*o,.38*t,.5*o)+m(.69*t,.16*o,.69*t,.5*o)},armchair:{w:85,h:85,group:"living",draw:(t,o)=>g(0,0,t,o,12)+g(.15*t,.28*o,.7*t,.72*o,8)},coffee:{w:110,h:60,group:"living",draw:(t,o)=>g(0,0,t,o,10)+g(8,8,t-16,o-16,6)},tv:{w:150,h:14,group:"living",draw:(t,o)=>g(0,0,t,o,3)+m(.3*t,o+6,.7*t,o+6)},rug:{w:240,h:170,group:"living",draw:(t,o)=>`<rect x="0" y="0" width="${t}" height="${o}" rx="6" stroke-dasharray="6 6"/>`},dining:{w:170,h:95,group:"living",draw:(t,o)=>g(0,0,t,o,8)+((t,o,i,s,e,r)=>{const n=Math.min(38,e/4),a=Math.max(1,Math.round(e/70));let h="";for(let l=0;l<a;l++){const t=i+(l+.5)*e/a-n/2;h+=g(t,s-n-4,n,n,6)+g(t,s+r+4,n,n,6)}return h+g(i-n-4,s+r/2-n/2,n,n,6)+g(i+e+4,s+r/2-n/2,n,n,6)})(0,0,0,0,t,o)},round_table:{w:110,h:110,group:"living",draw:(t,o)=>w(t/2,o/2,t/2,o/2)+[0,1,2,3].map((i=>$(t/2+Math.cos(1.5708*i)*(t/2+22),o/2+Math.sin(1.5708*i)*(o/2+22),16))).join("")},bed2:{w:165,h:205,group:"sleep",draw:(t,o)=>g(0,0,t,o,6)+g(.07*t,.05*o,.38*t,.14*o,8)+g(.55*t,.05*o,.38*t,.14*o,8)+m(0,.3*o,t,.3*o)+`<path d="M0 ${.3*o} L${.25*t} ${.42*o}"/>`},bed1:{w:95,h:200,group:"sleep",draw:(t,o)=>g(0,0,t,o,6)+g(.12*t,.05*o,.76*t,.14*o,8)+m(0,.3*o,t,.3*o)},wardrobe:{w:200,h:62,group:"sleep",draw:(t,o)=>g(0,0,t,o,2)+m(t/2,0,t/2,o)+m(0,o,t/2,0)+m(t/2,o,t,0)},desk:{w:140,h:70,group:"other",draw:(t,o)=>g(0,0,t,o,4)+$(t/2,o+26,20)},toilet:{w:42,h:68,group:"bath",draw:(t,o)=>g(0,0,t,.28*o,4)+w(t/2,.63*o,.44*t,.35*o)},basin:{w:60,h:46,group:"bath",draw:(t,o)=>g(0,0,t,o,6)+w(t/2,.55*o,.32*t,.3*o)+$(t/2,.16*o,2.5)},bath:{w:170,h:75,group:"bath",draw:(t,o)=>g(0,0,t,o,10)+g(8,8,t-16,o-16,26)+$(t-26,o/2,4)},shower:{w:90,h:90,group:"bath",draw:(t,o)=>g(0,0,t,o,4)+m(0,0,t,o)+m(t,0,0,o)+$(t/2,o/2,6)},counter:{w:240,h:60,group:"kitchen",draw:(t,o)=>g(0,0,t,o,2)+m(0,.85*o,t,.85*o)},stove:{w:60,h:60,group:"kitchen",draw:(t,o)=>g(0,0,t,o,4)+$(.3*t,.3*o,.13*t)+$(.7*t,.3*o,.13*t)+$(.3*t,.7*o,.13*t)+$(.7*t,.7*o,.13*t)},ksink:{w:90,h:55,group:"kitchen",draw:(t,o)=>g(0,0,t,o,4)+g(6,8,.42*t,o-16,6)+g(.52*t,8,.42*t,o-16,6)+$(t/2,6,3)},fridge:{w:72,h:70,group:"kitchen",draw:(t,o)=>g(0,0,t,o,4)+m(0,.82*o,t,.82*o)+m(.5*t,.82*o,.5*t,o)},washer:{w:60,h:60,group:"other",draw:(t,o)=>g(0,0,t,o,4)+$(t/2,.55*o,.3*t)+m(6,.16*o,.4*t,.16*o)},plant:{w:44,h:44,group:"other",draw:(t,o)=>$(t/2,o/2,t/2)+[0,1,2,3,4].map((i=>m(t/2,o/2,t/2+Math.cos(1.2566*i)*t*.42,o/2+Math.sin(1.2566*i)*o*.42))).join("")},stairs:{w:100,h:260,group:"other",draw:(t,o)=>g(0,0,t,o,2)+Array.from({length:9},((i,s)=>m(0,(s+1)*o/10,t,(s+1)*o/10))).join("")+`<path d="M${t/2} ${.9*o} V${.12*o} M${t/2-10} ${.2*o} L${t/2} ${.12*o} L${t/2+10} ${.2*o}"/>`},nightstand:{w:45,h:40,group:"sleep",draw:(t,o)=>g(0,0,t,o,3)+$(t/2,o/2,.25*Math.min(t,o))},dresser:{w:120,h:50,group:"sleep",draw:(t,o)=>g(0,0,t,o,3)+m(t/3,0,t/3,o)+m(2*t/3,0,2*t/3,o)},bookshelf:{w:100,h:35,group:"living",draw:(t,o)=>g(0,0,t,o,2)+Array.from({length:5},((i,s)=>m((s+1)*t/6,4,(s+1)*t/6,o-4))).join("")},chair:{w:48,h:48,group:"living",draw:(t,o)=>g(0,.2*o,t,.8*o,8)+g(0,0,t,.22*o,6)},crib:{w:70,h:130,group:"sleep",draw:(t,o)=>g(0,0,t,o,6)+Array.from({length:6},((i,s)=>m(4,(s+1)*o/7,t-4,(s+1)*o/7))).join("")},bunk:{w:95,h:200,group:"sleep",draw:(t,o)=>g(0,0,t,o,6)+g(.12*t,.05*o,.76*t,.12*o,6)+m(0,0,t,o)+m(t,0,0,o)},island:{w:180,h:90,group:"kitchen",draw:(t,o)=>g(0,0,t,o,6)+[.2,.5,.8].map((i=>$(t*i,o+22,16))).join("")},dishwasher:{w:60,h:60,group:"kitchen",draw:(t,o)=>g(0,0,t,o,4)+m(6,.2*o,t-6,.2*o)+g(.2*t,.35*o,.6*t,.5*o,4)},oven:{w:60,h:60,group:"kitchen",draw:(t,o)=>g(0,0,t,o,4)+g(.12*t,.3*o,.76*t,.58*o,4)+m(.2*t,.18*o,.8*t,.18*o)},bidet:{w:38,h:58,group:"bath",draw:(t,o)=>w(t/2,.55*o,.46*t,.42*o)+$(t/2,.3*o,3)},basin2:{w:130,h:50,group:"bath",draw:(t,o)=>g(0,0,t,o,6)+w(.27*t,.55*o,.15*t,.3*o)+w(.73*t,.55*o,.15*t,.3*o)},jacuzzi:{w:180,h:180,group:"bath",draw:(t,o)=>g(0,0,t,o,20)+w(t/2,o/2,.38*t,.38*o)+[0,1,2,3].map((i=>$(t/2+Math.cos(1.5708*i+.785)*t*.3,o/2+Math.sin(1.5708*i+.785)*o*.3,3))).join("")},dryer:{w:60,h:60,group:"other",draw:(t,o)=>g(0,0,t,o,4)+$(t/2,.55*o,.3*t)+$(t/2,.55*o,.12*t)},ac:{w:90,h:22,group:"other",draw:(t,o)=>g(0,0,t,o,6)+m(.1*t,.7*o,.9*t,.7*o)+`<path d="M${.3*t} ${o+8} q8 6 0 12 M${t/2} ${o+8} q8 6 0 12 M${.7*t} ${o+8} q8 6 0 12"/>`},boiler:{w:55,h:55,group:"other",draw:(t,o)=>$(t/2,o/2,t/2)+$(t/2,o/2,.15*t)},fireplace:{w:140,h:45,group:"living",draw:(t,o)=>g(0,0,t,o,2)+g(.2*t,.25*o,.6*t,.75*o,2)+`<path d="M${t/2} ${.9*o} q-12 -14 0 -30 q12 16 0 30"/>`},piano:{w:150,h:60,group:"living",draw:(t,o)=>g(0,0,t,o,4)+m(0,.62*o,t,.62*o)+Array.from({length:11},((i,s)=>m((s+1)*t/12,.62*o,(s+1)*t/12,o))).join("")+g(.35*t,o+10,.3*t,18,4)},tree:{w:120,h:120,group:"other",draw:(t,o)=>`<path d="M${t/2} 0 C${.9*t} ${.05*o} ${t} ${.45*o} ${.9*t} ${.7*o} C${.8*t} ${o} ${.2*t} ${o} ${.1*t} ${.7*o} C0 ${.45*o} ${.1*t} ${.05*o} ${t/2} 0 Z"/>`+$(t/2,o/2,6)},pool:{w:400,h:220,group:"other",draw:(t,o)=>g(0,0,t,o,16)+g(14,14,t-28,o-28,10)+`<path d="M${.2*t} ${o/2} q${.05*t} -12 ${.1*t} 0 t${.1*t} 0 t${.1*t} 0 t${.1*t} 0"/>`},bbq:{w:80,h:55,group:"other",draw:(t,o)=>g(0,0,t,o,6)+Array.from({length:5},((i,s)=>m((s+1)*t/6,6,(s+1)*t/6,o-6))).join("")},outdoor:{w:120,h:120,group:"other",draw:(t,o)=>$(t/2,o/2,.28*t)+[0,1,2,3].map((i=>g(t/2+Math.cos(1.5708*i)*t*.42-13,o/2+Math.sin(1.5708*i)*o*.42-13,26,26,6))).join("")},shoes:{w:90,h:35,group:"other",draw:(t,o)=>g(0,0,t,o,2)+m(t/2,0,t/2,o)},mirror:{w:80,h:8,group:"bath",draw:(t,o)=>g(0,0,t,o,4)+m(.1*t,o+5,.9*t,o+5)},car:{w:190,h:450,group:"other",draw:(t,o)=>g(0,0,t,o,40)+`<path d="M${.12*t} ${.3*o} Q${t/2} ${.24*o} ${.88*t} ${.3*o}"/><path d="M${.14*t} ${.78*o} Q${t/2} ${.83*o} ${.86*t} ${.78*o}"/>`+g(.16*t,.34*o,.68*t,.4*o,14)}},x=["sofa","sofa_l","armchair","chair","coffee","tv","rug","bookshelf","fireplace","piano","dining","round_table","bed2","bed1","bunk","crib","nightstand","dresser","wardrobe","desk","toilet","bidet","basin","basin2","mirror","bath","jacuzzi","shower","counter","island","ksink","stove","oven","dishwasher","fridge","washer","dryer","ac","boiler","shoes","plant","stairs","car","tree","pool","bbq","outdoor"];function y(t){const o=t.toLowerCase();return/حمام|مطبخ|غسيل|bath|wc|toilet|shower|kitchen|laundry|מקלחת|מטבח|שירותים|כביסה/.test(o)?"tile":/حديق|جنين|بلكون|شرف|ساح|حوش|garden|yard|balcony|terrace|patio|גינה|מרפסת|חצר/.test(o)?"outdoor":/ممر|مدخل|كوريدور|hall|corridor|entry|מסדרון|כניסה/.test(o)?"plain":"wood"}function v(t,o=[]){const i=[];for(const s of t)if(!s.nowall)for(let t=0;t<s.points.length;t++)i.push([s.points[t],s.points[(t+1)%s.points.length]]);for(const s of o??[])i.push([s.a,s.b]);return i}const k=(t,o,i)=>{let s;for(const[e,r]of t){const t=r[0]-e[0],n=r[1]-e[1],a=Math.max(0,Math.min(1,((o-e[0])*t+(i-e[1])*n)/(t*t+n*n||1))),h=Math.hypot(e[0]+a*t-o,e[1]+a*n-i);(!s||h<s.d)&&(s={a:e,b:r,d:h})}return s};function M(t,o=[],i=1200,s=800,e={}){const r=t=>(t/100*i).toFixed(1),n=t=>(t/100*s).toFixed(1),a=Math.max(8,Math.round(i/100)),h=t=>t.points.map((([t,o])=>`${r(t)},${n(o)}`)).join(" "),l={wood:"url(#wood)",tile:"url(#tile)",plain:"none",outdoor:"url(#grass)"},d=t.map((t=>{const o=t.kind??y(t.name);return`<polygon points="${h(t)}" fill="#9AA4AD" fill-opacity="${"outdoor"===o?.06:.13}"/>${"none"!==l[o]?`<polygon points="${h(t)}" fill="${l[o]}"/>`:""}`})).join(""),p=i/100,c={door:7,double:12,slide:14,window:10,wide_window:18},u=[],f=[];for(const b of o){const o=k(v(t,e.walls),b.x,b.y);if(!o)continue;const r=b.kind??"door",n=c[r]*p*.85,h=Math.atan2((o.b[1]-o.a[1])/100*s,(o.b[0]-o.a[0])/100*i),l=b.x/100*i,d=b.y/100*s,g=180*h/Math.PI,$=Math.cos(h),m=Math.sin(h),w=-m,x=$,y=(t,o)=>`${(l+$*t+w*o).toFixed(1)} ${(d+m*t+x*o).toFixed(1)}`;u.push(`<rect x="${(l-n/2).toFixed(1)}" y="${(d-a).toFixed(1)}" width="${n.toFixed(1)}" height="${2*a}" transform="rotate(${g.toFixed(1)} ${l.toFixed(1)} ${d.toFixed(1)})" fill="#000"/>`);const M=(t,o=.55,i=2)=>f.push(`<path d="${t}" fill="none" stroke="#9AA4AD" stroke-opacity="${o}" stroke-width="${i}"/>`),_=n/2;if("window"===r||"wide_window"===r){const t=a/2;M(`M${y(-_,-t)} L${y(_,-t)} M${y(-_,t)} L${y(_,t)}`,.7,1.5),M(`M${y(-_,0)} L${y(_,0)}`,.9,2),M(`M${y(-_,-t)} L${y(-_,t)} M${y(_,-t)} L${y(_,t)}`,.7,1.5)}else if("slide"===r){const t=a/4;M(`M${y(-_,-t)} L${y(.15*_,-t)} M${y(.15*-_,t)} L${y(_,t)}`,.8,3)}else"double"===r?(M(`M${y(-_,0)} L${y(-_,_)} A${_.toFixed(1)} ${_.toFixed(1)} 0 0 0 ${y(0,0)}`),M(`M${y(_,0)} L${y(_,_)} A${_.toFixed(1)} ${_.toFixed(1)} 0 0 1 ${y(0,0)}`)):M(`M${y(-_,0)} L${y(-_,n)} A${n.toFixed(1)} ${n.toFixed(1)} 0 0 0 ${y(_,0)}`)}const g=[];for(const b of e.openings??[]){const[t,o,e,r]=[b.a[0]/100*i,b.a[1]/100*s,b.b[0]/100*i,b.b[1]/100*s],n=Math.hypot(e-t,r-o)||1,h=(e-t)/n,l=(r-o)/n,d=.5*a;u.push(`<line x1="${(t+h*d).toFixed(1)}" y1="${(o+l*d).toFixed(1)}" x2="${(e-h*d).toFixed(1)}" y2="${(r-l*d).toFixed(1)}" stroke="#000" stroke-width="${(1.6*a).toFixed(1)}"/>`),g.push(`<line x1="${t.toFixed(1)}" y1="${o.toFixed(1)}" x2="${e.toFixed(1)}" y2="${r.toFixed(1)}" stroke="#9AA4AD" stroke-opacity=".35" stroke-width="2" stroke-dasharray="8 8"/>`)}const $=(e.furniture??[]).map((t=>function(t,o,i){const s=b[t.kind];if(!s)return"";const e=t.x/100*o,r=t.y/100*i;return`<g transform="translate(${e.toFixed(1)} ${r.toFixed(1)}) rotate(${t.rot}) translate(${(-t.w/2).toFixed(1)} ${(-t.h/2).toFixed(1)})">${s.draw(t.w,t.h)}</g>`}(t,i,s))).join(""),m=t.filter((t=>"outdoor"!==(t.kind??y(t.name))&&!t.nowall)).map((t=>`<polygon points="${h(t)}" fill="none"/>`)).join("")+(e.walls??[]).map((t=>`<line x1="${r(t.a[0])}" y1="${n(t.a[1])}" x2="${r(t.b[0])}" y2="${n(t.b[1])}"/>`)).join(""),w=t.filter((t=>"outdoor"===(t.kind??y(t.name)))).map((t=>`<polygon points="${h(t)}" fill="none" stroke="#9AA4AD" stroke-opacity=".6" stroke-width="${Math.max(2,a/3)}" stroke-dasharray="${1.5*a} ${a}"/>`)).join("");return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${i} ${s}" width="${i}" height="${s}">\n<defs>\n<pattern id="tile" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#9AA4AD" stroke-opacity=".2" stroke-width="1"/></pattern>\n<pattern id="wood" width="60" height="14" patternUnits="userSpaceOnUse"><path d="M0 14H60M30 0V14" fill="none" stroke="#9AA4AD" stroke-opacity=".14" stroke-width="1"/></pattern>\n<pattern id="grass" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="4" cy="5" r="1.2" fill="#7fae8a" fill-opacity=".35"/><circle cx="13" cy="13" r="1" fill="#7fae8a" fill-opacity=".3"/></pattern>\n<mask id="doors"><rect width="${i}" height="${s}" fill="#fff"/>${u.join("")}</mask>\n</defs>\n<g>${d}</g>\n<g mask="url(#doors)" stroke="#9AA4AD" stroke-width="${a}" stroke-linejoin="miter" stroke-linecap="square">${m}</g>\n<g>${w}</g>\n<g>${g.join("")}</g>\n<g fill="none" stroke="#9AA4AD" stroke-opacity=".75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${$}</g>\n<g>${f.join("")}</g>\n</svg>`}const _=t=>`data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(t)))}`;class F extends t{constructor(t){if(super(t),this.it=o,t.type!==i.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===o||null==t)return this._t=void 0,this.it=t;if(t===s)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const i=[t];return i.raw=i,this._t={_$litType$:this.constructor.resultType,strings:i,values:[]}}}F.directiveName="unsafeHTML",F.resultType=1;class A extends F{}A.directiveName="unsafeSVG",A.resultType=2;const j=e(A);var z=Object.defineProperty,C=Object.getOwnPropertyDescriptor,q=(t,o,i,s)=>{for(var e,r=s>1?void 0:s?C(o,i):o,n=t.length-1;n>=0;n--)(e=t[n])&&(r=(s?e(o,i,r):e(r))||r);return s&&r&&z(o,i,r),r};const L=t=>4===t.length&&t[0][1]===t[1][1]&&t[1][0]===t[2][0]&&t[2][1]===t[3][1]&&t[3][0]===t[0][0],S=(t,o)=>{const[i,s]=[Math.min(t[0],o[0]),Math.max(t[0],o[0])],[e,r]=[Math.min(t[1],o[1]),Math.max(t[1],o[1])];return[[i,e],[s,e],[s,r],[i,r]]};let D=class extends l{constructor(){super(...arguments),this.ratio=1.5,this.trace="",this.rooms=[],this.doors=[],this.openings=[],this.walls=[],this.shape="rect",this.poly=[],this.doorKind="door",this.furniture=[],this.mode="room",this.box={w:0,h:0},this.down=t=>{if(0!==t.button)return;const o=t.target;try{t.currentTarget.setPointerCapture(t.pointerId)}catch{}const i=this.at(t);if("line"===this.mode){const s=o.dataset?.wall;if(s)return void(this.selW=s);this.selW=void 0;const e=this.endSnap(this.raw(t))??i;return void(this.drag={kind:"line",from:e,to:e})}if("door"===this.mode)return this.placeDoor(i,o);if("wall"===this.mode)return this.toggleWall(i,o);if("furn"===this.mode){const i=o.dataset?.furn,s=o.dataset?.fsize,e=this.raw(t);if(o.dataset?.frot&&this.selF)return void(this.drag={kind:"frot",id:this.selF});if(s&&this.selF){const t=this.furniture.find((t=>t.id===this.selF));return void(this.drag={kind:"fsize",id:t.id,from:e,orig:{w:t.w,h:t.h}})}if(i){this.selF=i;const t=this.furniture.find((t=>t.id===i));return void(this.drag={kind:"fmove",id:i,from:e,orig:[t.x,t.y]})}return this.selF=void 0,void(this.sel=o.dataset?.room??this.sel)}if("poly"===this.shape&&(this.poly.length||!o.dataset?.room)&&void 0===o.dataset?.corner&&void 0===o.dataset?.mid){const o=this.nextPoint(t);return this.poly.length>=3&&o[0]===this.poly[0][0]&&o[1]===this.poly[0][1]?this.finishPoly():(this.poly=[...this.poly,o],this.sel=void 0,void d("tick"))}const s=o.dataset?.mid;if(void 0!==s&&this.sel){const t=Number(s),o=this.rooms.find((t=>t.id===this.sel)),i=o.points[t],e=o.points[(t+1)%o.points.length],r=[...o.points.slice(0,t+1),[(i[0]+e[0])/2,(i[1]+e[1])/2],...o.points.slice(t+1)];return this.rooms=this.rooms.map((t=>t.id===o.id?{...t,points:r}:t)),this.selV=t+1,void(this.drag={kind:"corner",id:o.id,corner:t+1,orig:r.map((t=>[...t]))})}const e=o.dataset?.corner;if(void 0!==e&&this.sel){const t=this.rooms.find((t=>t.id===this.sel));return this.selV=Number(e),void(this.drag={kind:"corner",id:t.id,corner:Number(e),orig:t.points.map((t=>[...t]))})}this.selV=void 0;const r=o.dataset?.room;if(r){this.sel=r;const o=this.rooms.find((t=>t.id===r));this.drag={kind:"move",id:r,from:this.at(t,r),orig:o.points.map((t=>[...t]))}}else this.sel=void 0,this.drag={kind:"new",from:i,to:i}},this.move=t=>{const o=this.drag;if(!o&&this.poly.length)return void(this.hover=this.nextPoint(t));if(!o)return;if("new"===o.kind)return void(this.drag={...o,to:this.at(t)});if("line"===o.kind)return void(this.drag={...o,to:this.lineEnd(o.from,t)});if("frot"===o.kind){const i=this.raw(t);return void(this.furniture=this.furniture.map((t=>{if(t.id!==o.id)return t;const s=(i[0]-t.x)/100*this.box.w,e=(i[1]-t.y)/100*this.box.h;let r=180*Math.atan2(e,s)/Math.PI+90;r=(r%360+360)%360;const n=90*Math.round(r/90);return r=Math.abs(r-n)<6?n%360:15*Math.round(r/15)%360,r!==t.rot&&d("tick"),{...t,rot:r}})))}if("fmove"===o.kind||"fsize"===o.kind){const i=this.raw(t),s=1200,e=s/this.ratio;return void(this.furniture=this.furniture.map((t=>{if(t.id!==o.id)return t;if("fmove"===o.kind)return{...t,x:Math.round(4*(o.orig[0]+i[0]-o.from[0]))/4,y:Math.round(4*(o.orig[1]+i[1]-o.from[1]))/4};const r=(i[0]-o.from[0])/100*s,n=(i[1]-o.from[1])/100*e,a=-t.rot*Math.PI/180,h=r*Math.cos(a)-n*Math.sin(a),l=r*Math.sin(a)+n*Math.cos(a);return{...t,w:Math.max(20,Math.round(o.orig.w+2*h)),h:Math.max(10,Math.round(o.orig.h+2*l))}})))}const i=this.at(t,o.id);this.rooms=this.rooms.map((t=>{if(t.id!==o.id)return t;if("move"===o.kind){const s=i[0]-o.from[0],e=i[1]-o.from[1];return{...t,points:o.orig.map((([t,o])=>[t+s,o+e]))}}const s=o.orig[(o.corner+2)%4];return{...t,points:L(o.orig)?S(s,i):o.orig.map(((t,s)=>s===o.corner?i:t))}}))},this.up=()=>{const t=this.drag;if(this.drag=void 0,"line"===t?.kind){if(Math.hypot(t.to[0]-t.from[0],t.to[1]-t.from[1])<1.5)return;return this.walls=[...this.walls,{id:p(),a:t.from,b:t.to}],void d("tap")}if("new"!==t?.kind)return;const o=S(t.from,t.to);if(o[1][0]-o[0][0]<3||o[2][1]-o[0][1]<3)return;const i=this.ctx.t("plan_room_n",{n:this.rooms.length+1}),s={id:p(),name:i,points:o};this.rooms=[...this.rooms,s],this.sel=s.id,d("tap"),requestAnimationFrame((()=>this.renderRoot.querySelector(".foot input")?.select()))}}connectedCallback(){super.connectedCallback(),this.rooms=structuredClone(this.floor.rooms??[]),this.doors=structuredClone(this.floor.doors??[]),this.openings=structuredClone(this.floor.openings??[]),this.walls=structuredClone(this.floor.walls??[]),this.furniture=structuredClone(this.floor.furniture??[]),this.ro=new ResizeObserver((()=>this.fit())),this.ro.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this.ro?.disconnect()}fit(){const t=this.renderRoot.querySelector(".stage");if(!t)return;const o=t.clientWidth-32,i=t.clientHeight-16,s=Math.min(o,i*this.ratio);this.box={w:s,h:s/this.ratio}}firstUpdated(){this.fit()}at(t,o){const i=this.renderRoot.querySelector(".canvas").getBoundingClientRect();let s=(t.clientX-i.left)/i.width*100,e=(t.clientY-i.top)/i.height*100;const r=this.rooms.filter((t=>t.id!==o)).flatMap((t=>t.points.map((t=>t[0])))),n=this.rooms.filter((t=>t.id!==o)).flatMap((t=>t.points.map((t=>t[1])))),a=(t,o)=>o.reduce(((o,i)=>Math.abs(i-t)<Math.abs(o-t)?i:o),1/0),h=a(s,r),l=a(e,n);return s=Math.abs(h-s)<1.2?h:Math.round(2*s)/2,e=Math.abs(l-e)<1.2?l:Math.round(2*e)/2,[Math.max(0,Math.min(100,s)),Math.max(0,Math.min(100,e))]}raw(t){const o=this.renderRoot.querySelector(".canvas").getBoundingClientRect();return[(t.clientX-o.left)/o.width*100,(t.clientY-o.top)/o.height*100]}nextPoint(t){const o=this.endSnap(this.raw(t));if(o)return o;const i=this.poly.length?this.lineEnd(this.poly[this.poly.length-1],t):this.at(t);for(const s of this.poly.slice(0,-1))Math.abs(i[0]-s[0])<1.5&&(i[0]=s[0]),Math.abs(i[1]-s[1])<1.5&&(i[1]=s[1]);return i}finishPoly(){if(this.poly.length<3)return;const t={id:p(),name:this.ctx.t("plan_room_n",{n:this.rooms.length+1}),points:this.poly};this.rooms=[...this.rooms,t],this.poly=[],this.hover=void 0,this.sel=t.id,d("success"),requestAnimationFrame((()=>this.renderRoot.querySelector(".foot input")?.select()))}endSnap(t){const o=[...this.poly,...this.walls.flatMap((t=>[t.a,t.b])),...this.rooms.flatMap((t=>t.points))];let i,s=1.6;for(const e of o){const o=Math.hypot(e[0]-t[0],(e[1]-t[1])/this.ratio);o<s&&([i,s]=[e,o])}return i?[...i]:void 0}lineEnd(t,o){const i=this.raw(o),s=this.endSnap(i);if(s)return s;const e=this.at(o),r=e[0]-t[0],n=(e[1]-t[1])/this.ratio,a=Math.abs(180*Math.atan2(n,r)/Math.PI),h=t=>Math.abs(a-t)<8;if(h(0)||h(180))return[e[0],t[1]];if(h(90))return[t[0],e[1]];if(h(45)||h(135)){const o=(Math.abs(r)+Math.abs(n))/2;return[t[0]+Math.sign(r)*o,t[1]+Math.sign(n)*o*this.ratio]}return e}toggleWall(t,o){const i=o.dataset?.opening;if(i)return void(this.openings=this.openings.filter((t=>t.id!==i)));let s;for(const h of this.rooms)for(let o=0;o<h.points.length;o++){const i=h.points[o],e=h.points[(o+1)%h.points.length],r=e[0]-i[0],n=e[1]-i[1],a=Math.max(0,Math.min(1,((t[0]-i[0])*r+(t[1]-i[1])*n)/(r*r+n*n||1))),l=Math.hypot(i[0]+a*r-t[0],i[1]+a*n-t[1]);(!s||l<s.d)&&(s={a:i,b:e,d:l,room:h.id})}if(!s||s.d>4)return;let{a:e,b:r}=s;const n=Math.abs(e[0]-r[0])<.01,a=Math.abs(e[1]-r[1])<.01;if(n||a){const t=t=>n?t[1]:t[0],o=n?e[0]:e[1];let i=Math.min(t(e),t(r)),a=Math.max(t(e),t(r));for(const e of this.rooms)if(e.id!==s.room)for(let s=0;s<e.points.length;s++){const r=e.points[s],h=e.points[(s+1)%e.points.length];if(!(n?Math.abs(r[0]-o)<.01&&Math.abs(h[0]-o)<.01:Math.abs(r[1]-o)<.01&&Math.abs(h[1]-o)<.01))continue;const l=Math.max(i,Math.min(t(r),t(h))),d=Math.min(a,Math.max(t(r),t(h)));d-l>.5&&(i=l,a=d)}e=n?[o,i]:[i,o],r=n?[o,a]:[a,o]}this.openings=[...this.openings,{id:p(),a:e,b:r}],d("tap")}addFurniture(t){const o=b[t],i=this.rooms.find((t=>t.id===this.sel)),s=i?i.points.reduce(((t,o)=>t+o[0]),0)/i.points.length:50,e=i?i.points.reduce(((t,o)=>t+o[1]),0)/i.points.length:50,r={id:p(),kind:t,x:s,y:e,w:o.w,h:o.h,rot:0};this.furniture=[...this.furniture,r],this.selF=r.id,d("tap")}patchF(t){this.furniture=this.furniture.map((o=>o.id===this.selF?{...o,...t}:o))}placeDoor(t,o){const i=o.dataset?.door;if(i)return void(this.doors=this.doors.filter((t=>t.id!==i)));let s;for(const[e,r]of v(this.rooms,this.walls)){const o=r[0]-e[0],i=r[1]-e[1],n=Math.max(.08,Math.min(.92,((t[0]-e[0])*o+(t[1]-e[1])*i)/(o*o+i*i||1))),a=e[0]+n*o,h=e[1]+n*i,l=Math.hypot(a-t[0],h-t[1]);(!s||l<s.d)&&(s={x:a,y:h,d:l})}s&&s.d<6&&(this.doors=[...this.doors,{id:p(),x:s.x,y:s.y,kind:this.doorKind}],d("tap"))}patch(t){this.rooms=this.rooms.map((o=>o.id===this.sel?{...o,...t}:o))}save(){const t=Math.round(1200/this.ratio),o=_(M(this.rooms,this.doors,1200,t,{openings:this.openings,furniture:this.furniture,walls:this.walls})),i=this.floor,s=i.photo??(!i.drawn&&i.image?i.image:void 0);this.onDone({...i,rooms:this.rooms,doors:this.doors,openings:this.openings,furniture:this.furniture,walls:this.walls,image:o,drawn:!0,ratio:this.ratio,photo:s})}render(){const{t:t}=this.ctx,i=1200,s=Math.round(i/this.ratio),e=_(M(this.rooms,this.doors,i,s,{openings:this.openings,furniture:this.furniture,walls:this.walls})),r=this.furniture.find((t=>t.id===this.selF)),n=this.rooms.find((t=>t.id===this.sel)),a=this.drag,h=[["wood",t("plan_kind_wood")],["tile",t("plan_kind_tile")],["plain",t("plan_kind_plain")],["outdoor",t("plan_kind_outdoor")]];return c`<div class="bar">
        <h2>${t("plan_draw")}</h2>
        <div class="seg">
          <button aria-pressed=${"room"===this.mode} @click=${()=>this.mode="room"}><sn-icon icon="rooms" style="--icon-size:18px"></sn-icon>${t("plan_mode_room")}</button>
          <button aria-pressed=${"line"===this.mode} @click=${()=>(this.mode="line",this.sel=void 0)}><sn-icon icon="wall" style="--icon-size:18px"></sn-icon>${t("plan_mode_line")}</button>
          <button aria-pressed=${"door"===this.mode} @click=${()=>(this.mode="door",this.sel=void 0)}><sn-icon icon="door-open" style="--icon-size:18px"></sn-icon>${t("plan_mode_door")}</button>
          <button aria-pressed=${"wall"===this.mode} @click=${()=>(this.mode="wall",this.sel=void 0)}><sn-icon icon="arrow-split-vertical" style="--icon-size:18px"></sn-icon>${t("plan_mode_wall")}</button>
          <button aria-pressed=${"furn"===this.mode} @click=${()=>this.mode="furn"}><sn-icon icon="sofa" style="--icon-size:18px"></sn-icon>${t("plan_mode_furn")}</button>
        </div>
        <button class="btn pressable" @click=${()=>this.onDone()}>${t("cancel")}</button>
        <button class="btn primary pressable" ?disabled=${!this.rooms.length} @click=${()=>this.save()}>${t("save")}</button>
      </div>
      <div class="stage">
        <div
          class="canvas"
          style="width:${this.box.w}px;height:${this.box.h}px"
          @pointerdown=${this.down}
          @pointermove=${this.move}
          @pointerup=${this.up}
          @pointercancel=${this.up}
        >
          ${this.trace?c`<img class="trace" src=${this.trace} alt="" />`:o}
          <img src=${e} alt="" />
          <svg class="over" viewBox="0 0 100 100" preserveAspectRatio="none">
            ${this.rooms.map((t=>u`<polygon class="room ${t.id===this.sel?"sel":""}" data-room=${t.id} points=${t.points.map((t=>t.join(","))).join(" ")}></polygon>`))}
            ${"new"===a?.kind?u`<polygon class="ghost" points=${S(a.from,a.to).map((t=>t.join(","))).join(" ")}></polygon>`:o}
            ${this.poly.length?u`<polyline class="ghost" points=${[...this.poly,...this.hover?[this.hover]:[]].map((t=>t.join(","))).join(" ")}></polyline>`:o}
            ${"line"===a?.kind?u`<line class="ghostline" x1=${a.from[0]} y1=${a.from[1]} x2=${a.to[0]} y2=${a.to[1]}></line>`:o}
            ${"line"===this.mode?this.walls.map((t=>u`<line class="wl ${t.id===this.selW?"sel":""}" data-wall=${t.id} x1=${t.a[0]} y1=${t.a[1]} x2=${t.b[0]} y2=${t.b[1]}></line>`)):o}
            ${"wall"===this.mode?this.openings.map((t=>u`<line class="open" data-opening=${t.id} x1=${t.a[0]} y1=${t.a[1]} x2=${t.b[0]} y2=${t.b[1]}></line>`)):o}
          </svg>
          ${"furn"===this.mode?this.furniture.map((t=>{const e=t.w/i*this.box.w,r=t.h/s*this.box.h;return c`<span
                  class="furn ${t.id===this.selF?"sel":""}"
                  data-furn=${t.id}
                  style="left:${t.x}%;top:${t.y}%;width:${e}px;height:${r}px;transform:translate(-50%, -50%) rotate(${t.rot}deg)"
                >${t.id===this.selF?c`<i class="fsize" data-fsize="1"></i><i class="frot" data-frot="1"></i>`:o}</span>`})):o}
          ${this.rooms.map((t=>{const o=t.points.reduce(((t,o)=>t+o[0]),0)/t.points.length,i=t.points.reduce(((t,o)=>t+o[1]),0)/t.points.length;return c`<span class="label" style="left:${o}%;top:${i}%">${t.name}</span>`}))}
          ${n&&"room"===this.mode?c`${n.points.map(((t,o)=>{const i=n.points[(o+1)%n.points.length];return c`<span class="mid" data-mid=${o} style="left:${(t[0]+i[0])/2}%;top:${(t[1]+i[1])/2}%">+</span>`}))}
              ${n.points.map(((t,o)=>c`<span class="handle ${o===this.selV?"on":""}" data-corner=${o} style="left:${t[0]}%;top:${t[1]}%"></span>`))}`:o}
          ${this.poly.map(((t,o)=>c`<span class="dot ${0===o&&this.poly.length>=3?"first":""}" style="left:${t[0]}%;top:${t[1]}%"></span>`))}
          ${"door"===this.mode?this.doors.map((t=>c`<span class="door" data-door=${t.id} style="left:${t.x}%;top:${t.y}%"></span>`)):o}
        </div>
      </div>
      <div class="foot">
        ${"furn"===this.mode?r?c`<span class="hint">${t(`furn_${r.kind}`)}</span>
                <span class="hint ltr" style="flex:none">${r.rot}°</span>
                <button class="btn pressable" @click=${()=>this.patchF({rot:(90*Math.round(r.rot/90)+90)%360})}><sn-icon icon="rotate-right" style="--icon-size:18px"></sn-icon>${t("plan_turn")}</button>
                <button class="btn pressable" @click=${()=>{const t={...r,id:p(),x:r.x+3,y:r.y+3};this.furniture=[...this.furniture,t],this.selF=t.id}}><sn-icon icon="content-copy" style="--icon-size:18px"></sn-icon>${t("plan_copy")}</button>
                <button class="icon-btn pressable" aria-label=${t("delete")} @click=${()=>(this.furniture=this.furniture.filter((t=>t.id!==this.selF)),this.selF=void 0)}>
                  <sn-icon icon="delete" style="--icon-size:20px"></sn-icon>
                </button>
                <button class="btn primary pressable" @click=${()=>this.selF=void 0}>${t("done")}</button>`:c`<div class="palette">
                ${x.map((o=>c`<button class="item pressable" title=${t(`furn_${o}`)} @click=${()=>this.addFurniture(o)}>
                    ${j(function(t){const o=b[t],i=.18*Math.max(o.w,o.h);return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-i} ${-i} ${o.w+2*i} ${o.h+2*i}"><g fill="none" stroke="currentColor" stroke-width="${Math.max(o.w,o.h)/28}" stroke-linecap="round">${o.draw(o.w,o.h)}</g></svg>`}(o))}<span>${t(`furn_${o}`)}</span>
                  </button>`))}
              </div>`:"wall"===this.mode?c`<span class="hint">${t("plan_wall_hint")}</span>`:"line"===this.mode?this.selW?c`<span class="hint">${t("plan_line_sel")}</span>
                <button class="icon-btn pressable" aria-label=${t("delete")} @click=${()=>(this.walls=this.walls.filter((t=>t.id!==this.selW)),this.selW=void 0)}>
                  <sn-icon icon="delete" style="--icon-size:20px"></sn-icon>
                </button>
                <button class="btn primary pressable" @click=${()=>this.selW=void 0}>${t("done")}</button>`:c`<span class="hint">${t("plan_line_hint")}</span>`:"door"===this.mode?c`<div class="seg">
                ${["door","double","slide","window","wide_window"].map((o=>c`<button aria-pressed=${this.doorKind===o} @click=${()=>this.doorKind=o}>${t(`plan_opening_${o}`)}</button>`))}
              </div>
              <span class="hint">${t("plan_door_hint")}</span>`:this.poly.length?c`<span class="hint">${t("plan_poly_drawing")}</span>
              <button class="btn pressable" @click=${()=>this.poly=this.poly.slice(0,-1)}><sn-icon icon="undo" style="--icon-size:18px"></sn-icon>${t("plan_poly_undo")}</button>
              <button class="btn pressable" @click=${()=>(this.poly=[],this.hover=void 0)}>${t("cancel")}</button>
              <button class="btn primary pressable" ?disabled=${this.poly.length<3} @click=${()=>this.finishPoly()}>${t("plan_poly_close")}</button>`:n?c`<input type="text" .value=${n.name} @input=${t=>this.patch({name:t.target.value})} />
              <div class="seg">${h.map((([t,o])=>c`<button aria-pressed=${(n.kind??y(n.name))===t} @click=${()=>this.patch({kind:t})}>${o}</button>`))}</div>
              <button class="btn pressable" aria-pressed=${!n.nowall} title=${t("plan_room_walls")} @click=${()=>this.patch({nowall:!n.nowall})}>
                <sn-icon icon=${n.nowall?"border-none-variant":"border-all-variant"} style="--icon-size:18px"></sn-icon>${t(n.nowall?"plan_room_nowall":"plan_room_walls")}
              </button>
              ${void 0!==this.selV&&n.points.length>3?c`<button
                    class="btn pressable"
                    @click=${()=>{this.patch({points:n.points.filter(((t,o)=>o!==this.selV))}),this.selV=void 0}}
                  >
                    ${t("plan_point_remove")}
                  </button>`:o}
              <button class="icon-btn pressable" aria-label=${t("delete")} @click=${()=>(this.rooms=this.rooms.filter((t=>t.id!==this.sel)),this.sel=void 0)}>
                <sn-icon icon="delete" style="--icon-size:20px"></sn-icon>
              </button>`:c`${"room"===this.mode?c`<div class="seg">
                    <button aria-pressed=${"rect"===this.shape} @click=${()=>this.shape="rect"}><sn-icon icon="square-outline" style="--icon-size:16px"></sn-icon>${t("plan_shape_rect")}</button>
                    <button aria-pressed=${"poly"===this.shape} @click=${()=>this.shape="poly"}><sn-icon icon="vector-polygon" style="--icon-size:16px"></sn-icon>${t("plan_shape_poly")}</button>
                  </div>`:o}
              <span class="hint">${t("poly"===this.shape?"plan_poly_hint":this.rooms.length?"plan_draw_more":"plan_draw_hint")}</span>`}
      </div>`}};function P(t,o,i,s,e){const r=function(t){let o=t;for(;o;){const t=o.getRootNode();if(!(t instanceof ShadowRoot))break;if("SMARTNEST-PANEL"===t.host.tagName)return t.host.shadowRoot.querySelector(".app")??document.body;o=t.host}return document.body}(o);return new Promise((o=>{const n=document.createElement("sn-plan-draw");n.ctx=t,n.floor=i,n.ratio=s,n.trace=e,n.onDone=t=>{n.remove(),o(t)},r.appendChild(n)}))}function R(t,o){const i=Math.round(1200/o);return{...t,image:_(M(t.rooms??[],t.doors??[],1200,i,{openings:t.openings,furniture:t.furniture,walls:t.walls})),drawn:!0,ratio:o,photo:t.photo??(t.drawn?void 0:t.image)}}D.styles=[r,n`
      :host {
        position: fixed;
        inset: 0;
        z-index: 75;
        display: grid;
        grid-template-rows: auto 1fr auto;
        grid-template-columns: minmax(0, 1fr);
        background: var(--bg);
        color: var(--text);
      }
      .bar {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 16px;
        padding-top: max(12px, env(safe-area-inset-top));
        flex-wrap: wrap;
      }
      .bar h2 {
        flex: 1;
        margin: 0;
        font-size: 18px;
      }
      .stage {
        display: grid;
        place-items: center;
        min-height: 0;
        padding: 8px 16px;
      }
      .canvas {
        position: relative;
        border-radius: 14px;
        background-color: var(--surface-2);
        background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px);
        background-size: 5% 5%;
        touch-action: none;
        overflow: hidden;
        direction: ltr;
      }
      .canvas img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }
      .canvas img.trace {
        opacity: 0.35;
        object-fit: fill;
      }
      svg.over {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
      }
      .room {
        fill: transparent;
        stroke: transparent;
        cursor: move;
      }
      .room.sel {
        fill: color-mix(in srgb, var(--accent) 18%, transparent);
        stroke: var(--accent);
        stroke-width: 0.5;
        vector-effect: non-scaling-stroke;
      }
      .ghost {
        fill: color-mix(in srgb, var(--accent) 22%, transparent);
        stroke: var(--accent);
        stroke-dasharray: 4 3;
        stroke-width: 2;
        vector-effect: non-scaling-stroke;
      }
      .label {
        position: absolute;
        transform: translate(-50%, -50%);
        font-size: 13px;
        font-weight: 700;
        color: var(--text);
        background: color-mix(in srgb, var(--surface-solid) 80%, transparent);
        padding: 2px 8px;
        border-radius: 999px;
        pointer-events: none;
        white-space: nowrap;
      }
      .handle {
        position: absolute;
        width: 22px;
        height: 22px;
        margin: -11px 0 0 -11px;
        border-radius: 50%;
        background: #fff;
        border: 3px solid var(--accent);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        cursor: nwse-resize;
      }
      .handle.on {
        background: var(--accent);
      }
      /* "+" in the middle of each side: drag it to add a corner there. */
      .mid {
        position: absolute;
        width: 20px;
        height: 20px;
        margin: -10px 0 0 -10px;
        border-radius: 50%;
        background: var(--surface-solid);
        color: var(--accent-text);
        border: 2px dashed var(--accent);
        font: 700 14px/16px var(--font);
        text-align: center;
        cursor: copy;
        opacity: 0.85;
      }
      .dot {
        position: absolute;
        width: 14px;
        height: 14px;
        margin: -7px 0 0 -7px;
        border-radius: 50%;
        background: var(--accent);
        border: 2px solid #fff;
        pointer-events: none;
      }
      .dot.first {
        width: 22px;
        height: 22px;
        margin: -11px 0 0 -11px;
        box-shadow: 0 0 0 6px color-mix(in srgb, var(--accent) 30%, transparent);
      }
      .door {
        position: absolute;
        width: 18px;
        height: 18px;
        margin: -9px 0 0 -9px;
        border-radius: 50%;
        background: var(--accent);
        border: 2px solid #fff;
      }
      .foot {
        display: flex;
        gap: 10px;
        align-items: center;
        padding: 12px 16px;
        padding-bottom: max(12px, env(safe-area-inset-bottom));
        flex-wrap: wrap;
        min-height: 64px;
      }
      .furn {
        position: absolute;
        border-radius: 4px;
        cursor: move;
      }
      .furn.sel {
        outline: 2px dashed var(--accent);
        outline-offset: 2px;
      }
      /* Twist handle above the piece, on a little stem. */
      .frot {
        position: absolute;
        left: 50%;
        top: -38px;
        width: 26px;
        height: 26px;
        margin-left: -13px;
        border-radius: 50%;
        background: var(--accent);
        border: 3px solid #fff;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        cursor: grab;
      }
      .frot::after {
        content: "";
        position: absolute;
        left: 50%;
        top: 100%;
        width: 2px;
        height: 12px;
        margin-left: -1px;
        background: var(--accent);
      }
      .fsize {
        position: absolute;
        right: -11px;
        bottom: -11px;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: #fff;
        border: 3px solid var(--accent);
        cursor: nwse-resize;
      }
      line.ghostline {
        stroke: var(--accent);
        stroke-width: 8;
        stroke-linecap: round;
        vector-effect: non-scaling-stroke;
        opacity: 0.8;
      }
      line.wl {
        stroke: transparent;
        stroke-width: 22;
        stroke-linecap: round;
        vector-effect: non-scaling-stroke;
        cursor: pointer;
      }
      line.wl.sel {
        stroke: color-mix(in srgb, var(--accent) 60%, transparent);
      }
      line.open {
        stroke: var(--accent);
        stroke-width: 6;
        stroke-linecap: round;
        vector-effect: non-scaling-stroke;
        opacity: 0.8;
        cursor: pointer;
      }
      .palette {
        min-width: 0;
        flex: 1;
        display: flex;
        gap: 8px;
        overflow-x: auto;
        width: 100%;
        padding-bottom: 4px;
        scrollbar-width: thin;
      }
      .palette .item {
        flex: none;
        width: 76px;
        display: grid;
        justify-items: center;
        gap: 4px;
        padding: 8px 4px;
        border: 0;
        border-radius: 14px;
        background: var(--surface-2);
        color: var(--text-2);
        font: 600 11px var(--font);
        cursor: pointer;
      }
      .palette .item svg {
        width: 46px;
        height: 40px;
      }
      .palette .item span {
        max-width: 70px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .foot input[type="text"] {
        flex: 1;
        min-width: 140px;
      }
      .hint {
        color: var(--text-2);
        font-size: 14px;
        flex: 1;
      }
    `],q([a({attribute:!1})],D.prototype,"ctx",2),q([a({attribute:!1})],D.prototype,"floor",2),q([a({type:Number})],D.prototype,"ratio",2),q([a()],D.prototype,"trace",2),q([a({attribute:!1})],D.prototype,"onDone",2),q([h()],D.prototype,"rooms",2),q([h()],D.prototype,"doors",2),q([h()],D.prototype,"openings",2),q([h()],D.prototype,"walls",2),q([h()],D.prototype,"selW",2),q([h()],D.prototype,"shape",2),q([h()],D.prototype,"poly",2),q([h()],D.prototype,"hover",2),q([h()],D.prototype,"doorKind",2),q([h()],D.prototype,"selV",2),q([h()],D.prototype,"furniture",2),q([h()],D.prototype,"selF",2),q([h()],D.prototype,"sel",2),q([h()],D.prototype,"mode",2),q([h()],D.prototype,"drag",2),q([h()],D.prototype,"box",2),D=q([f("sn-plan-draw")],D);export{D as SnPlanDraw,R as cleanFloor,P as drawPlan};
