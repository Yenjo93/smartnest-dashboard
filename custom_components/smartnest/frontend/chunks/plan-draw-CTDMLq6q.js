import{ab as t,A as o,ac as i,ad as e,ae as s,v as r,x as n,n as a,r as l,i as h,af as d,a as p,b as c,ag as u,t as f}from"./app-CKTm8XI9.js";import"./loader-43RavMas.js";const g=(t,o,i,e,s=0)=>`<rect x="${t}" y="${o}" width="${i}" height="${e}" rx="${s}"/>`,m=(t,o,i)=>`<circle cx="${t}" cy="${o}" r="${i}"/>`,$=(t,o,i,e)=>`<line x1="${t}" y1="${o}" x2="${i}" y2="${e}"/>`,w=(t,o,i,e)=>`<ellipse cx="${t}" cy="${o}" rx="${i}" ry="${e}"/>`,x={sofa:{w:210,h:90,group:"living",draw:(t,o)=>g(0,0,t,o,10)+g(0,0,t,.28*o,8)+g(0,0,.1*t,o,8)+g(.9*t,0,.1*t,o,8)+$(t/2,.28*o,t/2,o)},sofa_l:{w:260,h:180,group:"living",draw:(t,o)=>`<path d="M0 0 H${t} V${.5*o} H${.38*t} V${o} H0 Z" stroke-linejoin="round"/><path d="M0 ${.16*o} H${t}" />`+$(.16*t,.16*o,.16*t,o)+$(.38*t,.16*o,.38*t,.5*o)+$(.69*t,.16*o,.69*t,.5*o)},armchair:{w:85,h:85,group:"living",draw:(t,o)=>g(0,0,t,o,12)+g(.15*t,.28*o,.7*t,.72*o,8)},coffee:{w:110,h:60,group:"living",draw:(t,o)=>g(0,0,t,o,10)+g(8,8,t-16,o-16,6)},tv:{w:150,h:14,group:"living",draw:(t,o)=>g(0,0,t,o,3)+$(.3*t,o+6,.7*t,o+6)},rug:{w:240,h:170,group:"living",draw:(t,o)=>`<rect x="0" y="0" width="${t}" height="${o}" rx="6" stroke-dasharray="6 6"/>`},dining:{w:170,h:95,group:"living",draw:(t,o)=>g(0,0,t,o,8)+((t,o,i,e,s,r)=>{const n=Math.min(38,s/4),a=Math.max(1,Math.round(s/70));let l="";for(let h=0;h<a;h++){const t=i+(h+.5)*s/a-n/2;l+=g(t,e-n-4,n,n,6)+g(t,e+r+4,n,n,6)}return l+g(i-n-4,e+r/2-n/2,n,n,6)+g(i+s+4,e+r/2-n/2,n,n,6)})(0,0,0,0,t,o)},round_table:{w:110,h:110,group:"living",draw:(t,o)=>w(t/2,o/2,t/2,o/2)+[0,1,2,3].map((i=>m(t/2+Math.cos(1.5708*i)*(t/2+22),o/2+Math.sin(1.5708*i)*(o/2+22),16))).join("")},bed2:{w:165,h:205,group:"sleep",draw:(t,o)=>g(0,0,t,o,6)+g(.07*t,.05*o,.38*t,.14*o,8)+g(.55*t,.05*o,.38*t,.14*o,8)+$(0,.3*o,t,.3*o)+`<path d="M0 ${.3*o} L${.25*t} ${.42*o}"/>`},bed1:{w:95,h:200,group:"sleep",draw:(t,o)=>g(0,0,t,o,6)+g(.12*t,.05*o,.76*t,.14*o,8)+$(0,.3*o,t,.3*o)},wardrobe:{w:200,h:62,group:"sleep",draw:(t,o)=>g(0,0,t,o,2)+$(t/2,0,t/2,o)+$(0,o,t/2,0)+$(t/2,o,t,0)},desk:{w:140,h:70,group:"other",draw:(t,o)=>g(0,0,t,o,4)+m(t/2,o+26,20)},toilet:{w:42,h:68,group:"bath",draw:(t,o)=>g(0,0,t,.28*o,4)+w(t/2,.63*o,.44*t,.35*o)},basin:{w:60,h:46,group:"bath",draw:(t,o)=>g(0,0,t,o,6)+w(t/2,.55*o,.32*t,.3*o)+m(t/2,.16*o,2.5)},bath:{w:170,h:75,group:"bath",draw:(t,o)=>g(0,0,t,o,10)+g(8,8,t-16,o-16,26)+m(t-26,o/2,4)},shower:{w:90,h:90,group:"bath",draw:(t,o)=>g(0,0,t,o,4)+$(0,0,t,o)+$(t,0,0,o)+m(t/2,o/2,6)},counter:{w:240,h:60,group:"kitchen",draw:(t,o)=>g(0,0,t,o,2)+$(0,.85*o,t,.85*o)},stove:{w:60,h:60,group:"kitchen",draw:(t,o)=>g(0,0,t,o,4)+m(.3*t,.3*o,.13*t)+m(.7*t,.3*o,.13*t)+m(.3*t,.7*o,.13*t)+m(.7*t,.7*o,.13*t)},ksink:{w:90,h:55,group:"kitchen",draw:(t,o)=>g(0,0,t,o,4)+g(6,8,.42*t,o-16,6)+g(.52*t,8,.42*t,o-16,6)+m(t/2,6,3)},fridge:{w:72,h:70,group:"kitchen",draw:(t,o)=>g(0,0,t,o,4)+$(0,.82*o,t,.82*o)+$(.5*t,.82*o,.5*t,o)},washer:{w:60,h:60,group:"other",draw:(t,o)=>g(0,0,t,o,4)+m(t/2,.55*o,.3*t)+$(6,.16*o,.4*t,.16*o)},plant:{w:44,h:44,group:"other",draw:(t,o)=>m(t/2,o/2,t/2)+[0,1,2,3,4].map((i=>$(t/2,o/2,t/2+Math.cos(1.2566*i)*t*.42,o/2+Math.sin(1.2566*i)*o*.42))).join("")},stairs:{w:100,h:260,group:"other",draw:(t,o)=>g(0,0,t,o,2)+Array.from({length:9},((i,e)=>$(0,(e+1)*o/10,t,(e+1)*o/10))).join("")+`<path d="M${t/2} ${.9*o} V${.12*o} M${t/2-10} ${.2*o} L${t/2} ${.12*o} L${t/2+10} ${.2*o}"/>`},car:{w:190,h:450,group:"other",draw:(t,o)=>g(0,0,t,o,40)+`<path d="M${.12*t} ${.3*o} Q${t/2} ${.24*o} ${.88*t} ${.3*o}"/><path d="M${.14*t} ${.78*o} Q${t/2} ${.83*o} ${.86*t} ${.78*o}"/>`+g(.16*t,.34*o,.68*t,.4*o,14)}},b=["sofa","sofa_l","armchair","coffee","tv","rug","dining","round_table","bed2","bed1","wardrobe","desk","toilet","basin","bath","shower","counter","ksink","stove","fridge","washer","plant","stairs","car"];function v(t){const o=t.toLowerCase();return/حمام|مطبخ|غسيل|bath|wc|toilet|shower|kitchen|laundry|מקלחת|מטבח|שירותים|כביסה/.test(o)?"tile":/حديق|جنين|بلكون|شرف|ساح|حوش|garden|yard|balcony|terrace|patio|גינה|מרפסת|חצר/.test(o)?"outdoor":/ممر|مدخل|كوريدور|hall|corridor|entry|מסדרון|כניסה/.test(o)?"plain":"wood"}function y(t,o=[]){const i=[];for(const e of t)if(!e.nowall)for(let t=0;t<e.points.length;t++)i.push([e.points[t],e.points[(t+1)%e.points.length]]);for(const e of o??[])i.push([e.a,e.b]);return i}const k=(t,o,i)=>{let e;for(const[s,r]of t){const t=r[0]-s[0],n=r[1]-s[1],a=Math.max(0,Math.min(1,((o-s[0])*t+(i-s[1])*n)/(t*t+n*n||1))),l=Math.hypot(s[0]+a*t-o,s[1]+a*n-i);(!e||l<e.d)&&(e={a:s,b:r,d:l})}return e};function M(t,o=[],i=1200,e=800,s={}){const r=t=>(t/100*i).toFixed(1),n=t=>(t/100*e).toFixed(1),a=Math.max(8,Math.round(i/100)),l=t=>t.points.map((([t,o])=>`${r(t)},${n(o)}`)).join(" "),h={wood:"url(#wood)",tile:"url(#tile)",plain:"none",outdoor:"url(#grass)"},d=t.map((t=>{const o=t.kind??v(t.name);return`<polygon points="${l(t)}" fill="#9AA4AD" fill-opacity="${"outdoor"===o?.06:.13}"/>${"none"!==h[o]?`<polygon points="${l(t)}" fill="${h[o]}"/>`:""}`})).join(""),p=3.4*i/100,c=[],u=[];for(const w of o){const o=k(y(t,s.walls),w.x,w.y);if(!o)continue;const r=Math.atan2((o.b[1]-o.a[1])/100*e,(o.b[0]-o.a[0])/100*i),n=w.x/100*i,l=w.y/100*e,h=180*r/Math.PI;c.push(`<rect x="${(n-p/2).toFixed(1)}" y="${(l-a).toFixed(1)}" width="${p.toFixed(1)}" height="${2*a}" transform="rotate(${h.toFixed(1)} ${n.toFixed(1)} ${l.toFixed(1)})" fill="#000"/>`);const d=n-Math.cos(r)*p/2,f=l-Math.sin(r)*p/2,g=d+Math.cos(r+Math.PI/2)*p,m=f+Math.sin(r+Math.PI/2)*p,$=d+Math.cos(r)*p,x=f+Math.sin(r)*p;u.push(`<path d="M${d.toFixed(1)} ${f.toFixed(1)} L${g.toFixed(1)} ${m.toFixed(1)} A${p.toFixed(1)} ${p.toFixed(1)} 0 0 0 ${$.toFixed(1)} ${x.toFixed(1)}" fill="none" stroke="#9AA4AD" stroke-opacity=".55" stroke-width="2"/>`)}const f=[];for(const w of s.openings??[]){const[t,o,s,r]=[w.a[0]/100*i,w.a[1]/100*e,w.b[0]/100*i,w.b[1]/100*e],n=Math.hypot(s-t,r-o)||1,l=(s-t)/n,h=(r-o)/n,d=.5*a;c.push(`<line x1="${(t+l*d).toFixed(1)}" y1="${(o+h*d).toFixed(1)}" x2="${(s-l*d).toFixed(1)}" y2="${(r-h*d).toFixed(1)}" stroke="#000" stroke-width="${(1.6*a).toFixed(1)}"/>`),f.push(`<line x1="${t.toFixed(1)}" y1="${o.toFixed(1)}" x2="${s.toFixed(1)}" y2="${r.toFixed(1)}" stroke="#9AA4AD" stroke-opacity=".35" stroke-width="2" stroke-dasharray="8 8"/>`)}const g=(s.furniture??[]).map((t=>function(t,o,i){const e=x[t.kind];if(!e)return"";const s=t.x/100*o,r=t.y/100*i;return`<g transform="translate(${s.toFixed(1)} ${r.toFixed(1)}) rotate(${t.rot}) translate(${(-t.w/2).toFixed(1)} ${(-t.h/2).toFixed(1)})">${e.draw(t.w,t.h)}</g>`}(t,i,e))).join(""),m=t.filter((t=>"outdoor"!==(t.kind??v(t.name))&&!t.nowall)).map((t=>`<polygon points="${l(t)}" fill="none"/>`)).join("")+(s.walls??[]).map((t=>`<line x1="${r(t.a[0])}" y1="${n(t.a[1])}" x2="${r(t.b[0])}" y2="${n(t.b[1])}"/>`)).join(""),$=t.filter((t=>"outdoor"===(t.kind??v(t.name)))).map((t=>`<polygon points="${l(t)}" fill="none" stroke="#9AA4AD" stroke-opacity=".6" stroke-width="${Math.max(2,a/3)}" stroke-dasharray="${1.5*a} ${a}"/>`)).join("");return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${i} ${e}" width="${i}" height="${e}">\n<defs>\n<pattern id="tile" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#9AA4AD" stroke-opacity=".2" stroke-width="1"/></pattern>\n<pattern id="wood" width="60" height="14" patternUnits="userSpaceOnUse"><path d="M0 14H60M30 0V14" fill="none" stroke="#9AA4AD" stroke-opacity=".14" stroke-width="1"/></pattern>\n<pattern id="grass" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="4" cy="5" r="1.2" fill="#7fae8a" fill-opacity=".35"/><circle cx="13" cy="13" r="1" fill="#7fae8a" fill-opacity=".3"/></pattern>\n<mask id="doors"><rect width="${i}" height="${e}" fill="#fff"/>${c.join("")}</mask>\n</defs>\n<g>${d}</g>\n<g mask="url(#doors)" stroke="#9AA4AD" stroke-width="${a}" stroke-linejoin="miter" stroke-linecap="square">${m}</g>\n<g>${$}</g>\n<g>${f.join("")}</g>\n<g fill="none" stroke="#9AA4AD" stroke-opacity=".75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${g}</g>\n<g>${u.join("")}</g>\n</svg>`}const _=t=>`data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(t)))}`;class F extends t{constructor(t){if(super(t),this.it=o,t.type!==i.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===o||null==t)return this._t=void 0,this.it=t;if(t===e)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const i=[t];return i.raw=i,this._t={_$litType$:this.constructor.resultType,strings:i,values:[]}}}F.directiveName="unsafeHTML",F.resultType=1;class A extends F{}A.directiveName="unsafeSVG",A.resultType=2;const j=s(A);var z=Object.defineProperty,C=Object.getOwnPropertyDescriptor,D=(t,o,i,e)=>{for(var s,r=e>1?void 0:e?C(o,i):o,n=t.length-1;n>=0;n--)(s=t[n])&&(r=(e?s(o,i,r):s(r))||r);return e&&r&&z(o,i,r),r};const S=t=>4===t.length&&t[0][1]===t[1][1]&&t[1][0]===t[2][0]&&t[2][1]===t[3][1]&&t[3][0]===t[0][0],R=(t,o)=>{const[i,e]=[Math.min(t[0],o[0]),Math.max(t[0],o[0])],[s,r]=[Math.min(t[1],o[1]),Math.max(t[1],o[1])];return[[i,s],[e,s],[e,r],[i,r]]};let P=class extends h{constructor(){super(...arguments),this.ratio=1.5,this.trace="",this.rooms=[],this.doors=[],this.openings=[],this.walls=[],this.furniture=[],this.mode="room",this.box={w:0,h:0},this.down=t=>{if(0!==t.button)return;const o=t.target;try{t.currentTarget.setPointerCapture(t.pointerId)}catch{}const i=this.at(t);if("line"===this.mode){const e=o.dataset?.wall;if(e)return void(this.selW=e);this.selW=void 0;const s=this.endSnap(this.raw(t))??i;return void(this.drag={kind:"line",from:s,to:s})}if("door"===this.mode)return this.placeDoor(i,o);if("wall"===this.mode)return this.toggleWall(i,o);if("furn"===this.mode){const i=o.dataset?.furn,e=o.dataset?.fsize,s=this.raw(t);if(o.dataset?.frot&&this.selF)return void(this.drag={kind:"frot",id:this.selF});if(e&&this.selF){const t=this.furniture.find((t=>t.id===this.selF));return void(this.drag={kind:"fsize",id:t.id,from:s,orig:{w:t.w,h:t.h}})}if(i){this.selF=i;const t=this.furniture.find((t=>t.id===i));return void(this.drag={kind:"fmove",id:i,from:s,orig:[t.x,t.y]})}return this.selF=void 0,void(this.sel=o.dataset?.room??this.sel)}const e=o.dataset?.corner;if(void 0!==e&&this.sel){const t=this.rooms.find((t=>t.id===this.sel));return void(this.drag={kind:"corner",id:t.id,corner:Number(e),orig:t.points.map((t=>[...t]))})}const s=o.dataset?.room;if(s){this.sel=s;const o=this.rooms.find((t=>t.id===s));this.drag={kind:"move",id:s,from:this.at(t,s),orig:o.points.map((t=>[...t]))}}else this.sel=void 0,this.drag={kind:"new",from:i,to:i}},this.move=t=>{const o=this.drag;if(!o)return;if("new"===o.kind)return void(this.drag={...o,to:this.at(t)});if("line"===o.kind)return void(this.drag={...o,to:this.lineEnd(o.from,t)});if("frot"===o.kind){const i=this.raw(t);return void(this.furniture=this.furniture.map((t=>{if(t.id!==o.id)return t;const e=(i[0]-t.x)/100*this.box.w,s=(i[1]-t.y)/100*this.box.h;let r=180*Math.atan2(s,e)/Math.PI+90;r=(r%360+360)%360;const n=90*Math.round(r/90);return r=Math.abs(r-n)<6?n%360:15*Math.round(r/15)%360,r!==t.rot&&d("tick"),{...t,rot:r}})))}if("fmove"===o.kind||"fsize"===o.kind){const i=this.raw(t),e=1200,s=e/this.ratio;return void(this.furniture=this.furniture.map((t=>{if(t.id!==o.id)return t;if("fmove"===o.kind)return{...t,x:Math.round(4*(o.orig[0]+i[0]-o.from[0]))/4,y:Math.round(4*(o.orig[1]+i[1]-o.from[1]))/4};const r=(i[0]-o.from[0])/100*e,n=(i[1]-o.from[1])/100*s,a=-t.rot*Math.PI/180,l=r*Math.cos(a)-n*Math.sin(a),h=r*Math.sin(a)+n*Math.cos(a);return{...t,w:Math.max(20,Math.round(o.orig.w+2*l)),h:Math.max(10,Math.round(o.orig.h+2*h))}})))}const i=this.at(t,o.id);this.rooms=this.rooms.map((t=>{if(t.id!==o.id)return t;if("move"===o.kind){const e=i[0]-o.from[0],s=i[1]-o.from[1];return{...t,points:o.orig.map((([t,o])=>[t+e,o+s]))}}const e=o.orig[(o.corner+2)%4];return{...t,points:S(o.orig)?R(e,i):o.orig.map(((t,e)=>e===o.corner?i:t))}}))},this.up=()=>{const t=this.drag;if(this.drag=void 0,"line"===t?.kind){if(Math.hypot(t.to[0]-t.from[0],t.to[1]-t.from[1])<1.5)return;return this.walls=[...this.walls,{id:p(),a:t.from,b:t.to}],void d("tap")}if("new"!==t?.kind)return;const o=R(t.from,t.to);if(o[1][0]-o[0][0]<3||o[2][1]-o[0][1]<3)return;const i=this.ctx.t("plan_room_n",{n:this.rooms.length+1}),e={id:p(),name:i,points:o};this.rooms=[...this.rooms,e],this.sel=e.id,d("tap"),requestAnimationFrame((()=>this.renderRoot.querySelector(".foot input")?.select()))}}connectedCallback(){super.connectedCallback(),this.rooms=structuredClone(this.floor.rooms??[]),this.doors=structuredClone(this.floor.doors??[]),this.openings=structuredClone(this.floor.openings??[]),this.walls=structuredClone(this.floor.walls??[]),this.furniture=structuredClone(this.floor.furniture??[]),this.ro=new ResizeObserver((()=>this.fit())),this.ro.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this.ro?.disconnect()}fit(){const t=this.renderRoot.querySelector(".stage");if(!t)return;const o=t.clientWidth-32,i=t.clientHeight-16,e=Math.min(o,i*this.ratio);this.box={w:e,h:e/this.ratio}}firstUpdated(){this.fit()}at(t,o){const i=this.renderRoot.querySelector(".canvas").getBoundingClientRect();let e=(t.clientX-i.left)/i.width*100,s=(t.clientY-i.top)/i.height*100;const r=this.rooms.filter((t=>t.id!==o)).flatMap((t=>t.points.map((t=>t[0])))),n=this.rooms.filter((t=>t.id!==o)).flatMap((t=>t.points.map((t=>t[1])))),a=(t,o)=>o.reduce(((o,i)=>Math.abs(i-t)<Math.abs(o-t)?i:o),1/0),l=a(e,r),h=a(s,n);return e=Math.abs(l-e)<1.2?l:Math.round(2*e)/2,s=Math.abs(h-s)<1.2?h:Math.round(2*s)/2,[Math.max(0,Math.min(100,e)),Math.max(0,Math.min(100,s))]}raw(t){const o=this.renderRoot.querySelector(".canvas").getBoundingClientRect();return[(t.clientX-o.left)/o.width*100,(t.clientY-o.top)/o.height*100]}endSnap(t){const o=[...this.walls.flatMap((t=>[t.a,t.b])),...this.rooms.flatMap((t=>t.points))];let i,e=1.6;for(const s of o){const o=Math.hypot(s[0]-t[0],(s[1]-t[1])/this.ratio);o<e&&([i,e]=[s,o])}return i?[...i]:void 0}lineEnd(t,o){const i=this.raw(o),e=this.endSnap(i);if(e)return e;const s=this.at(o),r=s[0]-t[0],n=(s[1]-t[1])/this.ratio,a=Math.abs(180*Math.atan2(n,r)/Math.PI),l=t=>Math.abs(a-t)<8;if(l(0)||l(180))return[s[0],t[1]];if(l(90))return[t[0],s[1]];if(l(45)||l(135)){const o=(Math.abs(r)+Math.abs(n))/2;return[t[0]+Math.sign(r)*o,t[1]+Math.sign(n)*o*this.ratio]}return s}toggleWall(t,o){const i=o.dataset?.opening;if(i)return void(this.openings=this.openings.filter((t=>t.id!==i)));let e;for(const l of this.rooms)for(let o=0;o<l.points.length;o++){const i=l.points[o],s=l.points[(o+1)%l.points.length],r=s[0]-i[0],n=s[1]-i[1],a=Math.max(0,Math.min(1,((t[0]-i[0])*r+(t[1]-i[1])*n)/(r*r+n*n||1))),h=Math.hypot(i[0]+a*r-t[0],i[1]+a*n-t[1]);(!e||h<e.d)&&(e={a:i,b:s,d:h,room:l.id})}if(!e||e.d>4)return;let{a:s,b:r}=e;const n=Math.abs(s[0]-r[0])<.01,a=Math.abs(s[1]-r[1])<.01;if(n||a){const t=t=>n?t[1]:t[0],o=n?s[0]:s[1];let i=Math.min(t(s),t(r)),a=Math.max(t(s),t(r));for(const s of this.rooms)if(s.id!==e.room)for(let e=0;e<s.points.length;e++){const r=s.points[e],l=s.points[(e+1)%s.points.length];if(!(n?Math.abs(r[0]-o)<.01&&Math.abs(l[0]-o)<.01:Math.abs(r[1]-o)<.01&&Math.abs(l[1]-o)<.01))continue;const h=Math.max(i,Math.min(t(r),t(l))),d=Math.min(a,Math.max(t(r),t(l)));d-h>.5&&(i=h,a=d)}s=n?[o,i]:[i,o],r=n?[o,a]:[a,o]}this.openings=[...this.openings,{id:p(),a:s,b:r}],d("tap")}addFurniture(t){const o=x[t],i=this.rooms.find((t=>t.id===this.sel)),e=i?i.points.reduce(((t,o)=>t+o[0]),0)/i.points.length:50,s=i?i.points.reduce(((t,o)=>t+o[1]),0)/i.points.length:50,r={id:p(),kind:t,x:e,y:s,w:o.w,h:o.h,rot:0};this.furniture=[...this.furniture,r],this.selF=r.id,d("tap")}patchF(t){this.furniture=this.furniture.map((o=>o.id===this.selF?{...o,...t}:o))}placeDoor(t,o){const i=o.dataset?.door;if(i)return void(this.doors=this.doors.filter((t=>t.id!==i)));let e;for(const[s,r]of y(this.rooms,this.walls)){const o=r[0]-s[0],i=r[1]-s[1],n=Math.max(.08,Math.min(.92,((t[0]-s[0])*o+(t[1]-s[1])*i)/(o*o+i*i||1))),a=s[0]+n*o,l=s[1]+n*i,h=Math.hypot(a-t[0],l-t[1]);(!e||h<e.d)&&(e={x:a,y:l,d:h})}e&&e.d<6&&(this.doors=[...this.doors,{id:p(),x:e.x,y:e.y}],d("tap"))}patch(t){this.rooms=this.rooms.map((o=>o.id===this.sel?{...o,...t}:o))}save(){const t=Math.round(1200/this.ratio),o=_(M(this.rooms,this.doors,1200,t,{openings:this.openings,furniture:this.furniture,walls:this.walls})),i=this.floor,e=i.photo??(!i.drawn&&i.image?i.image:void 0);this.onDone({...i,rooms:this.rooms,doors:this.doors,openings:this.openings,furniture:this.furniture,walls:this.walls,image:o,drawn:!0,ratio:this.ratio,photo:e})}render(){const{t:t}=this.ctx,i=1200,e=Math.round(i/this.ratio),s=_(M(this.rooms,this.doors,i,e,{openings:this.openings,furniture:this.furniture,walls:this.walls})),r=this.furniture.find((t=>t.id===this.selF)),n=this.rooms.find((t=>t.id===this.sel)),a=this.drag,l=[["wood",t("plan_kind_wood")],["tile",t("plan_kind_tile")],["plain",t("plan_kind_plain")],["outdoor",t("plan_kind_outdoor")]];return c`<div class="bar">
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
          <img src=${s} alt="" />
          <svg class="over" viewBox="0 0 100 100" preserveAspectRatio="none">
            ${this.rooms.map((t=>u`<polygon class="room ${t.id===this.sel?"sel":""}" data-room=${t.id} points=${t.points.map((t=>t.join(","))).join(" ")}></polygon>`))}
            ${"new"===a?.kind?u`<polygon class="ghost" points=${R(a.from,a.to).map((t=>t.join(","))).join(" ")}></polygon>`:o}
            ${"line"===a?.kind?u`<line class="ghostline" x1=${a.from[0]} y1=${a.from[1]} x2=${a.to[0]} y2=${a.to[1]}></line>`:o}
            ${"line"===this.mode?this.walls.map((t=>u`<line class="wl ${t.id===this.selW?"sel":""}" data-wall=${t.id} x1=${t.a[0]} y1=${t.a[1]} x2=${t.b[0]} y2=${t.b[1]}></line>`)):o}
            ${"wall"===this.mode?this.openings.map((t=>u`<line class="open" data-opening=${t.id} x1=${t.a[0]} y1=${t.a[1]} x2=${t.b[0]} y2=${t.b[1]}></line>`)):o}
          </svg>
          ${"furn"===this.mode?this.furniture.map((t=>{const s=t.w/i*this.box.w,r=t.h/e*this.box.h;return c`<span
                  class="furn ${t.id===this.selF?"sel":""}"
                  data-furn=${t.id}
                  style="left:${t.x}%;top:${t.y}%;width:${s}px;height:${r}px;transform:translate(-50%, -50%) rotate(${t.rot}deg)"
                >${t.id===this.selF?c`<i class="fsize" data-fsize="1"></i><i class="frot" data-frot="1"></i>`:o}</span>`})):o}
          ${this.rooms.map((t=>{const o=t.points.reduce(((t,o)=>t+o[0]),0)/t.points.length,i=t.points.reduce(((t,o)=>t+o[1]),0)/t.points.length;return c`<span class="label" style="left:${o}%;top:${i}%">${t.name}</span>`}))}
          ${n&&"room"===this.mode?n.points.map(((t,o)=>c`<span class="handle" data-corner=${o} style="left:${t[0]}%;top:${t[1]}%"></span>`)):o}
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
                ${b.map((o=>c`<button class="item pressable" title=${t(`furn_${o}`)} @click=${()=>this.addFurniture(o)}>
                    ${j(function(t){const o=x[t],i=.18*Math.max(o.w,o.h);return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-i} ${-i} ${o.w+2*i} ${o.h+2*i}"><g fill="none" stroke="currentColor" stroke-width="${Math.max(o.w,o.h)/28}" stroke-linecap="round">${o.draw(o.w,o.h)}</g></svg>`}(o))}<span>${t(`furn_${o}`)}</span>
                  </button>`))}
              </div>`:"wall"===this.mode?c`<span class="hint">${t("plan_wall_hint")}</span>`:"line"===this.mode?this.selW?c`<span class="hint">${t("plan_line_sel")}</span>
                <button class="icon-btn pressable" aria-label=${t("delete")} @click=${()=>(this.walls=this.walls.filter((t=>t.id!==this.selW)),this.selW=void 0)}>
                  <sn-icon icon="delete" style="--icon-size:20px"></sn-icon>
                </button>
                <button class="btn primary pressable" @click=${()=>this.selW=void 0}>${t("done")}</button>`:c`<span class="hint">${t("plan_line_hint")}</span>`:n?c`<input type="text" .value=${n.name} @input=${t=>this.patch({name:t.target.value})} />
              <div class="seg">${l.map((([t,o])=>c`<button aria-pressed=${(n.kind??v(n.name))===t} @click=${()=>this.patch({kind:t})}>${o}</button>`))}</div>
              <button class="btn pressable" aria-pressed=${!n.nowall} title=${t("plan_room_walls")} @click=${()=>this.patch({nowall:!n.nowall})}>
                <sn-icon icon=${n.nowall?"border-none-variant":"border-all-variant"} style="--icon-size:18px"></sn-icon>${t(n.nowall?"plan_room_nowall":"plan_room_walls")}
              </button>
              <button class="icon-btn pressable" aria-label=${t("delete")} @click=${()=>(this.rooms=this.rooms.filter((t=>t.id!==this.sel)),this.sel=void 0)}>
                <sn-icon icon="delete" style="--icon-size:20px"></sn-icon>
              </button>`:c`<span class="hint">${t("door"===this.mode?"plan_door_hint":this.rooms.length?"plan_draw_more":"plan_draw_hint")}</span>`}
      </div>`}};function W(t,o,i,e,s){const r=function(t){let o=t;for(;o;){const t=o.getRootNode();if(!(t instanceof ShadowRoot))break;if("SMARTNEST-PANEL"===t.host.tagName)return t.host.shadowRoot.querySelector(".app")??document.body;o=t.host}return document.body}(o);return new Promise((o=>{const n=document.createElement("sn-plan-draw");n.ctx=t,n.floor=i,n.ratio=e,n.trace=s,n.onDone=t=>{n.remove(),o(t)},r.appendChild(n)}))}function N(t,o){const i=Math.round(1200/o);return{...t,image:_(M(t.rooms??[],t.doors??[],1200,i,{openings:t.openings,furniture:t.furniture,walls:t.walls})),drawn:!0,ratio:o,photo:t.photo??(t.drawn?void 0:t.image)}}P.styles=[r,n`
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
    `],D([a({attribute:!1})],P.prototype,"ctx",2),D([a({attribute:!1})],P.prototype,"floor",2),D([a({type:Number})],P.prototype,"ratio",2),D([a()],P.prototype,"trace",2),D([a({attribute:!1})],P.prototype,"onDone",2),D([l()],P.prototype,"rooms",2),D([l()],P.prototype,"doors",2),D([l()],P.prototype,"openings",2),D([l()],P.prototype,"walls",2),D([l()],P.prototype,"selW",2),D([l()],P.prototype,"furniture",2),D([l()],P.prototype,"selF",2),D([l()],P.prototype,"sel",2),D([l()],P.prototype,"mode",2),D([l()],P.prototype,"drag",2),D([l()],P.prototype,"box",2),P=D([f("sn-plan-draw")],P);export{P as SnPlanDraw,N as cleanFloor,W as drawPlan};
