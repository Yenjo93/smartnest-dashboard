import{ab as t,A as o,ac as i,ad as e,ae as r,v as s,x as n,n as a,r as d,i as h,a as p,af as l,b as c,ag as u,t as f}from"./app-F79cIk_S.js";import"./loader-43RavMas.js";const g=(t,o,i,e,r=0)=>`<rect x="${t}" y="${o}" width="${i}" height="${e}" rx="${r}"/>`,m=(t,o,i)=>`<circle cx="${t}" cy="${o}" r="${i}"/>`,$=(t,o,i,e)=>`<line x1="${t}" y1="${o}" x2="${i}" y2="${e}"/>`,x=(t,o,i,e)=>`<ellipse cx="${t}" cy="${o}" rx="${i}" ry="${e}"/>`,w={sofa:{w:210,h:90,group:"living",draw:(t,o)=>g(0,0,t,o,10)+g(0,0,t,.28*o,8)+g(0,0,.1*t,o,8)+g(.9*t,0,.1*t,o,8)+$(t/2,.28*o,t/2,o)},sofa_l:{w:260,h:180,group:"living",draw:(t,o)=>`<path d="M0 0 H${t} V${.5*o} H${.38*t} V${o} H0 Z" stroke-linejoin="round"/><path d="M0 ${.16*o} H${t}" />`+$(.16*t,.16*o,.16*t,o)+$(.38*t,.16*o,.38*t,.5*o)+$(.69*t,.16*o,.69*t,.5*o)},armchair:{w:85,h:85,group:"living",draw:(t,o)=>g(0,0,t,o,12)+g(.15*t,.28*o,.7*t,.72*o,8)},coffee:{w:110,h:60,group:"living",draw:(t,o)=>g(0,0,t,o,10)+g(8,8,t-16,o-16,6)},tv:{w:150,h:14,group:"living",draw:(t,o)=>g(0,0,t,o,3)+$(.3*t,o+6,.7*t,o+6)},rug:{w:240,h:170,group:"living",draw:(t,o)=>`<rect x="0" y="0" width="${t}" height="${o}" rx="6" stroke-dasharray="6 6"/>`},dining:{w:170,h:95,group:"living",draw:(t,o)=>g(0,0,t,o,8)+((t,o,i,e,r,s)=>{const n=Math.min(38,r/4),a=Math.max(1,Math.round(r/70));let d="";for(let h=0;h<a;h++){const t=i+(h+.5)*r/a-n/2;d+=g(t,e-n-4,n,n,6)+g(t,e+s+4,n,n,6)}return d+g(i-n-4,e+s/2-n/2,n,n,6)+g(i+r+4,e+s/2-n/2,n,n,6)})(0,0,0,0,t,o)},round_table:{w:110,h:110,group:"living",draw:(t,o)=>x(t/2,o/2,t/2,o/2)+[0,1,2,3].map((i=>m(t/2+Math.cos(1.5708*i)*(t/2+22),o/2+Math.sin(1.5708*i)*(o/2+22),16))).join("")},bed2:{w:165,h:205,group:"sleep",draw:(t,o)=>g(0,0,t,o,6)+g(.07*t,.05*o,.38*t,.14*o,8)+g(.55*t,.05*o,.38*t,.14*o,8)+$(0,.3*o,t,.3*o)+`<path d="M0 ${.3*o} L${.25*t} ${.42*o}"/>`},bed1:{w:95,h:200,group:"sleep",draw:(t,o)=>g(0,0,t,o,6)+g(.12*t,.05*o,.76*t,.14*o,8)+$(0,.3*o,t,.3*o)},wardrobe:{w:200,h:62,group:"sleep",draw:(t,o)=>g(0,0,t,o,2)+$(t/2,0,t/2,o)+$(0,o,t/2,0)+$(t/2,o,t,0)},desk:{w:140,h:70,group:"other",draw:(t,o)=>g(0,0,t,o,4)+m(t/2,o+26,20)},toilet:{w:42,h:68,group:"bath",draw:(t,o)=>g(0,0,t,.28*o,4)+x(t/2,.63*o,.44*t,.35*o)},basin:{w:60,h:46,group:"bath",draw:(t,o)=>g(0,0,t,o,6)+x(t/2,.55*o,.32*t,.3*o)+m(t/2,.16*o,2.5)},bath:{w:170,h:75,group:"bath",draw:(t,o)=>g(0,0,t,o,10)+g(8,8,t-16,o-16,26)+m(t-26,o/2,4)},shower:{w:90,h:90,group:"bath",draw:(t,o)=>g(0,0,t,o,4)+$(0,0,t,o)+$(t,0,0,o)+m(t/2,o/2,6)},counter:{w:240,h:60,group:"kitchen",draw:(t,o)=>g(0,0,t,o,2)+$(0,.85*o,t,.85*o)},stove:{w:60,h:60,group:"kitchen",draw:(t,o)=>g(0,0,t,o,4)+m(.3*t,.3*o,.13*t)+m(.7*t,.3*o,.13*t)+m(.3*t,.7*o,.13*t)+m(.7*t,.7*o,.13*t)},ksink:{w:90,h:55,group:"kitchen",draw:(t,o)=>g(0,0,t,o,4)+g(6,8,.42*t,o-16,6)+g(.52*t,8,.42*t,o-16,6)+m(t/2,6,3)},fridge:{w:72,h:70,group:"kitchen",draw:(t,o)=>g(0,0,t,o,4)+$(0,.82*o,t,.82*o)+$(.5*t,.82*o,.5*t,o)},washer:{w:60,h:60,group:"other",draw:(t,o)=>g(0,0,t,o,4)+m(t/2,.55*o,.3*t)+$(6,.16*o,.4*t,.16*o)},plant:{w:44,h:44,group:"other",draw:(t,o)=>m(t/2,o/2,t/2)+[0,1,2,3,4].map((i=>$(t/2,o/2,t/2+Math.cos(1.2566*i)*t*.42,o/2+Math.sin(1.2566*i)*o*.42))).join("")},stairs:{w:100,h:260,group:"other",draw:(t,o)=>g(0,0,t,o,2)+Array.from({length:9},((i,e)=>$(0,(e+1)*o/10,t,(e+1)*o/10))).join("")+`<path d="M${t/2} ${.9*o} V${.12*o} M${t/2-10} ${.2*o} L${t/2} ${.12*o} L${t/2+10} ${.2*o}"/>`},car:{w:190,h:450,group:"other",draw:(t,o)=>g(0,0,t,o,40)+`<path d="M${.12*t} ${.3*o} Q${t/2} ${.24*o} ${.88*t} ${.3*o}"/><path d="M${.14*t} ${.78*o} Q${t/2} ${.83*o} ${.86*t} ${.78*o}"/>`+g(.16*t,.34*o,.68*t,.4*o,14)}},b=["sofa","sofa_l","armchair","coffee","tv","rug","dining","round_table","bed2","bed1","wardrobe","desk","toilet","basin","bath","shower","counter","ksink","stove","fridge","washer","plant","stairs","car"];function v(t){const o=t.toLowerCase();return/حمام|مطبخ|غسيل|bath|wc|toilet|shower|kitchen|laundry|מקלחת|מטבח|שירותים|כביסה/.test(o)?"tile":/حديق|جنين|بلكون|شرف|ساح|حوش|garden|yard|balcony|terrace|patio|גינה|מרפסת|חצר/.test(o)?"outdoor":/ممر|مدخل|كوريدور|hall|corridor|entry|מסדרון|כניסה/.test(o)?"plain":"wood"}const y=(t,o,i)=>{let e;for(const r of t)for(let t=0;t<r.points.length;t++){const s=r.points[t],n=r.points[(t+1)%r.points.length],a=n[0]-s[0],d=n[1]-s[1],h=Math.max(0,Math.min(1,((o-s[0])*a+(i-s[1])*d)/(a*a+d*d||1))),p=Math.hypot(s[0]+h*a-o,s[1]+h*d-i);(!e||p<e.d)&&(e={a:s,b:n,d:p})}return e};function k(t,o=[],i=1200,e=800,r={}){const s=Math.max(8,Math.round(i/100)),n=t=>t.points.map((([t,o])=>{return`${r=t,(r/100*i).toFixed(1)},${(t=>(t/100*e).toFixed(1))(o)}`;var r})).join(" "),a={wood:"url(#wood)",tile:"url(#tile)",plain:"none",outdoor:"url(#grass)"},d=t.map((t=>{const o=t.kind??v(t.name);return`<polygon points="${n(t)}" fill="#9AA4AD" fill-opacity="${"outdoor"===o?.06:.13}"/>${"none"!==a[o]?`<polygon points="${n(t)}" fill="${a[o]}"/>`:""}`})).join(""),h=3.4*i/100,p=[],l=[];for(const m of o){const o=y(t,m.x,m.y);if(!o)continue;const r=Math.atan2((o.b[1]-o.a[1])/100*e,(o.b[0]-o.a[0])/100*i),n=m.x/100*i,a=m.y/100*e,d=180*r/Math.PI;p.push(`<rect x="${(n-h/2).toFixed(1)}" y="${(a-s).toFixed(1)}" width="${h.toFixed(1)}" height="${2*s}" transform="rotate(${d.toFixed(1)} ${n.toFixed(1)} ${a.toFixed(1)})" fill="#000"/>`);const c=n-Math.cos(r)*h/2,u=a-Math.sin(r)*h/2,f=c+Math.cos(r+Math.PI/2)*h,g=u+Math.sin(r+Math.PI/2)*h,$=c+Math.cos(r)*h,x=u+Math.sin(r)*h;l.push(`<path d="M${c.toFixed(1)} ${u.toFixed(1)} L${f.toFixed(1)} ${g.toFixed(1)} A${h.toFixed(1)} ${h.toFixed(1)} 0 0 0 ${$.toFixed(1)} ${x.toFixed(1)}" fill="none" stroke="#9AA4AD" stroke-opacity=".55" stroke-width="2"/>`)}const c=[];for(const m of r.openings??[]){const[t,o,r,n]=[m.a[0]/100*i,m.a[1]/100*e,m.b[0]/100*i,m.b[1]/100*e],a=Math.hypot(r-t,n-o)||1,d=(r-t)/a,h=(n-o)/a,l=.5*s;p.push(`<line x1="${(t+d*l).toFixed(1)}" y1="${(o+h*l).toFixed(1)}" x2="${(r-d*l).toFixed(1)}" y2="${(n-h*l).toFixed(1)}" stroke="#000" stroke-width="${(1.6*s).toFixed(1)}"/>`),c.push(`<line x1="${t.toFixed(1)}" y1="${o.toFixed(1)}" x2="${r.toFixed(1)}" y2="${n.toFixed(1)}" stroke="#9AA4AD" stroke-opacity=".35" stroke-width="2" stroke-dasharray="8 8"/>`)}const u=(r.furniture??[]).map((t=>function(t,o,i){const e=w[t.kind];if(!e)return"";const r=t.x/100*o,s=t.y/100*i;return`<g transform="translate(${r.toFixed(1)} ${s.toFixed(1)}) rotate(${t.rot}) translate(${(-t.w/2).toFixed(1)} ${(-t.h/2).toFixed(1)})">${e.draw(t.w,t.h)}</g>`}(t,i,e))).join(""),f=t.filter((t=>"outdoor"!==(t.kind??v(t.name)))).map((t=>`<polygon points="${n(t)}" fill="none"/>`)).join(""),g=t.filter((t=>"outdoor"===(t.kind??v(t.name)))).map((t=>`<polygon points="${n(t)}" fill="none" stroke="#9AA4AD" stroke-opacity=".6" stroke-width="${Math.max(2,s/3)}" stroke-dasharray="${1.5*s} ${s}"/>`)).join("");return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${i} ${e}" width="${i}" height="${e}">\n<defs>\n<pattern id="tile" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#9AA4AD" stroke-opacity=".2" stroke-width="1"/></pattern>\n<pattern id="wood" width="60" height="14" patternUnits="userSpaceOnUse"><path d="M0 14H60M30 0V14" fill="none" stroke="#9AA4AD" stroke-opacity=".14" stroke-width="1"/></pattern>\n<pattern id="grass" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="4" cy="5" r="1.2" fill="#7fae8a" fill-opacity=".35"/><circle cx="13" cy="13" r="1" fill="#7fae8a" fill-opacity=".3"/></pattern>\n<mask id="doors"><rect width="${i}" height="${e}" fill="#fff"/>${p.join("")}</mask>\n</defs>\n<g>${d}</g>\n<g mask="url(#doors)" stroke="#9AA4AD" stroke-width="${s}" stroke-linejoin="miter" stroke-linecap="square">${f}</g>\n<g>${g}</g>\n<g>${c.join("")}</g>\n<g fill="none" stroke="#9AA4AD" stroke-opacity=".75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${u}</g>\n<g>${l.join("")}</g>\n</svg>`}const M=t=>`data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(t)))}`;class F extends t{constructor(t){if(super(t),this.it=o,t.type!==i.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===o||null==t)return this._t=void 0,this.it=t;if(t===e)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const i=[t];return i.raw=i,this._t={_$litType$:this.constructor.resultType,strings:i,values:[]}}}F.directiveName="unsafeHTML",F.resultType=1;class _ extends F{}_.directiveName="unsafeSVG",_.resultType=2;const A=r(_);var j=Object.defineProperty,z=Object.getOwnPropertyDescriptor,C=(t,o,i,e)=>{for(var r,s=e>1?void 0:e?z(o,i):o,n=t.length-1;n>=0;n--)(r=t[n])&&(s=(e?r(o,i,s):r(s))||s);return e&&s&&j(o,i,s),s};const D=t=>4===t.length&&t[0][1]===t[1][1]&&t[1][0]===t[2][0]&&t[2][1]===t[3][1]&&t[3][0]===t[0][0],R=(t,o)=>{const[i,e]=[Math.min(t[0],o[0]),Math.max(t[0],o[0])],[r,s]=[Math.min(t[1],o[1]),Math.max(t[1],o[1])];return[[i,r],[e,r],[e,s],[i,s]]};let S=class extends h{constructor(){super(...arguments),this.ratio=1.5,this.trace="",this.rooms=[],this.doors=[],this.openings=[],this.furniture=[],this.mode="room",this.box={w:0,h:0},this.down=t=>{if(0!==t.button)return;const o=t.target;try{t.currentTarget.setPointerCapture(t.pointerId)}catch{}const i=this.at(t);if("door"===this.mode)return this.placeDoor(i,o);if("wall"===this.mode)return this.toggleWall(i,o);if("furn"===this.mode){const i=o.dataset?.furn,e=o.dataset?.fsize,r=this.raw(t);if(e&&this.selF){const t=this.furniture.find((t=>t.id===this.selF));return void(this.drag={kind:"fsize",id:t.id,from:r,orig:{w:t.w,h:t.h}})}if(i){this.selF=i;const t=this.furniture.find((t=>t.id===i));return void(this.drag={kind:"fmove",id:i,from:r,orig:[t.x,t.y]})}return this.selF=void 0,void(this.sel=o.dataset?.room??this.sel)}const e=o.dataset?.corner;if(void 0!==e&&this.sel){const t=this.rooms.find((t=>t.id===this.sel));return void(this.drag={kind:"corner",id:t.id,corner:Number(e),orig:t.points.map((t=>[...t]))})}const r=o.dataset?.room;if(r){this.sel=r;const o=this.rooms.find((t=>t.id===r));this.drag={kind:"move",id:r,from:this.at(t,r),orig:o.points.map((t=>[...t]))}}else this.sel=void 0,this.drag={kind:"new",from:i,to:i}},this.move=t=>{const o=this.drag;if(!o)return;if("new"===o.kind)return void(this.drag={...o,to:this.at(t)});if("fmove"===o.kind||"fsize"===o.kind){const i=this.raw(t),e=1200,r=e/this.ratio;return void(this.furniture=this.furniture.map((t=>{if(t.id!==o.id)return t;if("fmove"===o.kind)return{...t,x:Math.round(4*(o.orig[0]+i[0]-o.from[0]))/4,y:Math.round(4*(o.orig[1]+i[1]-o.from[1]))/4};let s=(i[0]-o.from[0])/100*e,n=(i[1]-o.from[1])/100*r;return t.rot%180&&([s,n]=[n,s]),{...t,w:Math.max(20,Math.round(o.orig.w+2*s)),h:Math.max(10,Math.round(o.orig.h+2*n))}})))}const i=this.at(t,o.id);this.rooms=this.rooms.map((t=>{if(t.id!==o.id)return t;if("move"===o.kind){const e=i[0]-o.from[0],r=i[1]-o.from[1];return{...t,points:o.orig.map((([t,o])=>[t+e,o+r]))}}const e=o.orig[(o.corner+2)%4];return{...t,points:D(o.orig)?R(e,i):o.orig.map(((t,e)=>e===o.corner?i:t))}}))},this.up=()=>{const t=this.drag;if(this.drag=void 0,"new"!==t?.kind)return;const o=R(t.from,t.to);if(o[1][0]-o[0][0]<3||o[2][1]-o[0][1]<3)return;const i=this.ctx.t("plan_room_n",{n:this.rooms.length+1}),e={id:p(),name:i,points:o};this.rooms=[...this.rooms,e],this.sel=e.id,l("tap"),requestAnimationFrame((()=>this.renderRoot.querySelector(".foot input")?.select()))}}connectedCallback(){super.connectedCallback(),this.rooms=structuredClone(this.floor.rooms??[]),this.doors=structuredClone(this.floor.doors??[]),this.openings=structuredClone(this.floor.openings??[]),this.furniture=structuredClone(this.floor.furniture??[]),this.ro=new ResizeObserver((()=>this.fit())),this.ro.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this.ro?.disconnect()}fit(){const t=this.renderRoot.querySelector(".stage");if(!t)return;const o=t.clientWidth-32,i=t.clientHeight-16,e=Math.min(o,i*this.ratio);this.box={w:e,h:e/this.ratio}}firstUpdated(){this.fit()}at(t,o){const i=this.renderRoot.querySelector(".canvas").getBoundingClientRect();let e=(t.clientX-i.left)/i.width*100,r=(t.clientY-i.top)/i.height*100;const s=this.rooms.filter((t=>t.id!==o)).flatMap((t=>t.points.map((t=>t[0])))),n=this.rooms.filter((t=>t.id!==o)).flatMap((t=>t.points.map((t=>t[1])))),a=(t,o)=>o.reduce(((o,i)=>Math.abs(i-t)<Math.abs(o-t)?i:o),1/0),d=a(e,s),h=a(r,n);return e=Math.abs(d-e)<1.2?d:Math.round(2*e)/2,r=Math.abs(h-r)<1.2?h:Math.round(2*r)/2,[Math.max(0,Math.min(100,e)),Math.max(0,Math.min(100,r))]}raw(t){const o=this.renderRoot.querySelector(".canvas").getBoundingClientRect();return[(t.clientX-o.left)/o.width*100,(t.clientY-o.top)/o.height*100]}toggleWall(t,o){const i=o.dataset?.opening;if(i)return void(this.openings=this.openings.filter((t=>t.id!==i)));let e;for(const d of this.rooms)for(let o=0;o<d.points.length;o++){const i=d.points[o],r=d.points[(o+1)%d.points.length],s=r[0]-i[0],n=r[1]-i[1],a=Math.max(0,Math.min(1,((t[0]-i[0])*s+(t[1]-i[1])*n)/(s*s+n*n||1))),h=Math.hypot(i[0]+a*s-t[0],i[1]+a*n-t[1]);(!e||h<e.d)&&(e={a:i,b:r,d:h,room:d.id})}if(!e||e.d>4)return;let{a:r,b:s}=e;const n=Math.abs(r[0]-s[0])<.01,a=Math.abs(r[1]-s[1])<.01;if(n||a){const t=t=>n?t[1]:t[0],o=n?r[0]:r[1];let i=Math.min(t(r),t(s)),a=Math.max(t(r),t(s));for(const r of this.rooms)if(r.id!==e.room)for(let e=0;e<r.points.length;e++){const s=r.points[e],d=r.points[(e+1)%r.points.length];if(!(n?Math.abs(s[0]-o)<.01&&Math.abs(d[0]-o)<.01:Math.abs(s[1]-o)<.01&&Math.abs(d[1]-o)<.01))continue;const h=Math.max(i,Math.min(t(s),t(d))),p=Math.min(a,Math.max(t(s),t(d)));p-h>.5&&(i=h,a=p)}r=n?[o,i]:[i,o],s=n?[o,a]:[a,o]}this.openings=[...this.openings,{id:p(),a:r,b:s}],l("tap")}addFurniture(t){const o=w[t],i=this.rooms.find((t=>t.id===this.sel)),e=i?i.points.reduce(((t,o)=>t+o[0]),0)/i.points.length:50,r=i?i.points.reduce(((t,o)=>t+o[1]),0)/i.points.length:50,s={id:p(),kind:t,x:e,y:r,w:o.w,h:o.h,rot:0};this.furniture=[...this.furniture,s],this.selF=s.id,l("tap")}patchF(t){this.furniture=this.furniture.map((o=>o.id===this.selF?{...o,...t}:o))}placeDoor(t,o){const i=o.dataset?.door;if(i)return void(this.doors=this.doors.filter((t=>t.id!==i)));let e;for(const r of this.rooms)for(let o=0;o<r.points.length;o++){const i=r.points[o],s=r.points[(o+1)%r.points.length],n=s[0]-i[0],a=s[1]-i[1],d=Math.max(.08,Math.min(.92,((t[0]-i[0])*n+(t[1]-i[1])*a)/(n*n+a*a||1))),h=i[0]+d*n,p=i[1]+d*a,l=Math.hypot(h-t[0],p-t[1]);(!e||l<e.d)&&(e={x:h,y:p,d:l})}e&&e.d<6&&(this.doors=[...this.doors,{id:p(),x:e.x,y:e.y}],l("tap"))}patch(t){this.rooms=this.rooms.map((o=>o.id===this.sel?{...o,...t}:o))}save(){const t=Math.round(1200/this.ratio),o=M(k(this.rooms,this.doors,1200,t,{openings:this.openings,furniture:this.furniture})),i=this.floor,e=i.photo??(!i.drawn&&i.image?i.image:void 0);this.onDone({...i,rooms:this.rooms,doors:this.doors,openings:this.openings,furniture:this.furniture,image:o,drawn:!0,ratio:this.ratio,photo:e})}render(){const{t:t}=this.ctx,i=1200,e=Math.round(i/this.ratio),r=M(k(this.rooms,this.doors,i,e,{openings:this.openings,furniture:this.furniture})),s=this.furniture.find((t=>t.id===this.selF)),n=this.rooms.find((t=>t.id===this.sel)),a=this.drag,d=[["wood",t("plan_kind_wood")],["tile",t("plan_kind_tile")],["plain",t("plan_kind_plain")],["outdoor",t("plan_kind_outdoor")]];return c`<div class="bar">
        <h2>${t("plan_draw")}</h2>
        <div class="seg">
          <button aria-pressed=${"room"===this.mode} @click=${()=>this.mode="room"}><sn-icon icon="rooms" style="--icon-size:18px"></sn-icon>${t("plan_mode_room")}</button>
          <button aria-pressed=${"door"===this.mode} @click=${()=>(this.mode="door",this.sel=void 0)}><sn-icon icon="door-open" style="--icon-size:18px"></sn-icon>${t("plan_mode_door")}</button>
          <button aria-pressed=${"wall"===this.mode} @click=${()=>(this.mode="wall",this.sel=void 0)}><sn-icon icon="wall" style="--icon-size:18px"></sn-icon>${t("plan_mode_wall")}</button>
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
          <img src=${r} alt="" />
          <svg class="over" viewBox="0 0 100 100" preserveAspectRatio="none">
            ${this.rooms.map((t=>u`<polygon class="room ${t.id===this.sel?"sel":""}" data-room=${t.id} points=${t.points.map((t=>t.join(","))).join(" ")}></polygon>`))}
            ${"new"===a?.kind?u`<polygon class="ghost" points=${R(a.from,a.to).map((t=>t.join(","))).join(" ")}></polygon>`:o}
            ${"wall"===this.mode?this.openings.map((t=>u`<line class="open" data-opening=${t.id} x1=${t.a[0]} y1=${t.a[1]} x2=${t.b[0]} y2=${t.b[1]}></line>`)):o}
          </svg>
          ${"furn"===this.mode?this.furniture.map((t=>{const r=t.rot%180!=0,s=(r?t.h:t.w)/i*100,n=(r?t.w:t.h)/e*100;return c`<span
                  class="furn ${t.id===this.selF?"sel":""}"
                  data-furn=${t.id}
                  style="left:${t.x-s/2}%;top:${t.y-n/2}%;width:${s}%;height:${n}%"
                >${t.id===this.selF?c`<i class="fsize" data-fsize="1"></i>`:o}</span>`})):o}
          ${this.rooms.map((t=>{const o=t.points.reduce(((t,o)=>t+o[0]),0)/t.points.length,i=t.points.reduce(((t,o)=>t+o[1]),0)/t.points.length;return c`<span class="label" style="left:${o}%;top:${i}%">${t.name}</span>`}))}
          ${n&&"room"===this.mode?n.points.map(((t,o)=>c`<span class="handle" data-corner=${o} style="left:${t[0]}%;top:${t[1]}%"></span>`)):o}
          ${"door"===this.mode?this.doors.map((t=>c`<span class="door" data-door=${t.id} style="left:${t.x}%;top:${t.y}%"></span>`)):o}
        </div>
      </div>
      <div class="foot">
        ${"furn"===this.mode?s?c`<span class="hint">${t(`furn_${s.kind}`)}</span>
                <button class="btn pressable" @click=${()=>this.patchF({rot:(s.rot+90)%360})}><sn-icon icon="rotate-right" style="--icon-size:18px"></sn-icon>${t("plan_turn")}</button>
                <button class="btn pressable" @click=${()=>{const t={...s,id:p(),x:s.x+3,y:s.y+3};this.furniture=[...this.furniture,t],this.selF=t.id}}><sn-icon icon="content-copy" style="--icon-size:18px"></sn-icon>${t("plan_copy")}</button>
                <button class="icon-btn pressable" aria-label=${t("delete")} @click=${()=>(this.furniture=this.furniture.filter((t=>t.id!==this.selF)),this.selF=void 0)}>
                  <sn-icon icon="delete" style="--icon-size:20px"></sn-icon>
                </button>
                <button class="btn primary pressable" @click=${()=>this.selF=void 0}>${t("done")}</button>`:c`<div class="palette">
                ${b.map((o=>c`<button class="item pressable" title=${t(`furn_${o}`)} @click=${()=>this.addFurniture(o)}>
                    ${A(function(t){const o=w[t],i=.18*Math.max(o.w,o.h);return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-i} ${-i} ${o.w+2*i} ${o.h+2*i}"><g fill="none" stroke="currentColor" stroke-width="${Math.max(o.w,o.h)/28}" stroke-linecap="round">${o.draw(o.w,o.h)}</g></svg>`}(o))}<span>${t(`furn_${o}`)}</span>
                  </button>`))}
              </div>`:"wall"===this.mode?c`<span class="hint">${t("plan_wall_hint")}</span>`:n?c`<input type="text" .value=${n.name} @input=${t=>this.patch({name:t.target.value})} />
              <div class="seg">${d.map((([t,o])=>c`<button aria-pressed=${(n.kind??v(n.name))===t} @click=${()=>this.patch({kind:t})}>${o}</button>`))}</div>
              <button class="icon-btn pressable" aria-label=${t("delete")} @click=${()=>(this.rooms=this.rooms.filter((t=>t.id!==this.sel)),this.sel=void 0)}>
                <sn-icon icon="delete" style="--icon-size:20px"></sn-icon>
              </button>`:c`<span class="hint">${t("door"===this.mode?"plan_door_hint":this.rooms.length?"plan_draw_more":"plan_draw_hint")}</span>`}
      </div>`}};function N(t,o,i,e,r){const s=function(t){let o=t;for(;o;){const t=o.getRootNode();if(!(t instanceof ShadowRoot))break;if("SMARTNEST-PANEL"===t.host.tagName)return t.host.shadowRoot.querySelector(".app")??document.body;o=t.host}return document.body}(o);return new Promise((o=>{const n=document.createElement("sn-plan-draw");n.ctx=t,n.floor=i,n.ratio=e,n.trace=r,n.onDone=t=>{n.remove(),o(t)},s.appendChild(n)}))}function H(t,o){const i=Math.round(1200/o);return{...t,image:M(k(t.rooms??[],t.doors??[],1200,i,{openings:t.openings,furniture:t.furniture})),drawn:!0,ratio:o,photo:t.photo??(t.drawn?void 0:t.image)}}S.styles=[s,n`
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
    `],C([a({attribute:!1})],S.prototype,"ctx",2),C([a({attribute:!1})],S.prototype,"floor",2),C([a({type:Number})],S.prototype,"ratio",2),C([a()],S.prototype,"trace",2),C([a({attribute:!1})],S.prototype,"onDone",2),C([d()],S.prototype,"rooms",2),C([d()],S.prototype,"doors",2),C([d()],S.prototype,"openings",2),C([d()],S.prototype,"furniture",2),C([d()],S.prototype,"selF",2),C([d()],S.prototype,"sel",2),C([d()],S.prototype,"mode",2),C([d()],S.prototype,"drag",2),C([d()],S.prototype,"box",2),S=C([f("sn-plan-draw")],S);export{S as SnPlanDraw,H as cleanFloor,N as drawPlan};
