import{v as t,x as o,n as e,r as i,i as s,a as r,ab as n,A as a,b as d,ac as p,t as h}from"./app-bpxeCgcf.js";import"./loader-43RavMas.js";function l(t){const o=t.toLowerCase();return/حمام|مطبخ|غسيل|bath|wc|toilet|shower|kitchen|laundry|מקלחת|מטבח|שירותים|כביסה/.test(o)?"tile":/حديق|جنين|بلكون|شرف|ساح|حوش|garden|yard|balcony|terrace|patio|גינה|מרפסת|חצר/.test(o)?"outdoor":/ممر|مدخل|كوريدور|hall|corridor|entry|מסדרון|כניסה/.test(o)?"plain":"wood"}const c=(t,o,e)=>{let i;for(const s of t)for(let t=0;t<s.points.length;t++){const r=s.points[t],n=s.points[(t+1)%s.points.length],a=n[0]-r[0],d=n[1]-r[1],p=Math.max(0,Math.min(1,((o-r[0])*a+(e-r[1])*d)/(a*a+d*d||1))),h=Math.hypot(r[0]+p*a-o,r[1]+p*d-e);(!i||h<i.d)&&(i={a:r,b:n,d:h})}return i};function m(t,o=[],e=1200,i=800){const s=Math.max(8,Math.round(e/100)),r=t=>t.points.map((([t,o])=>{return`${s=t,(s/100*e).toFixed(1)},${(t=>(t/100*i).toFixed(1))(o)}`;var s})).join(" "),n={wood:"url(#wood)",tile:"url(#tile)",plain:"none",outdoor:"url(#grass)"},a=t.map((t=>{const o=t.kind??l(t.name);return`<polygon points="${r(t)}" fill="#9AA4AD" fill-opacity="${"outdoor"===o?.06:.13}"/>${"none"!==n[o]?`<polygon points="${r(t)}" fill="${n[o]}"/>`:""}`})).join(""),d=3.4*e/100,p=[],h=[];for(const l of o){const o=c(t,l.x,l.y);if(!o)continue;const r=Math.atan2((o.b[1]-o.a[1])/100*i,(o.b[0]-o.a[0])/100*e),n=l.x/100*e,a=l.y/100*i,m=180*r/Math.PI;p.push(`<rect x="${(n-d/2).toFixed(1)}" y="${(a-s).toFixed(1)}" width="${d.toFixed(1)}" height="${2*s}" transform="rotate(${m.toFixed(1)} ${n.toFixed(1)} ${a.toFixed(1)})" fill="#000"/>`);const u=n-Math.cos(r)*d/2,g=a-Math.sin(r)*d/2,f=u+Math.cos(r+Math.PI/2)*d,x=g+Math.sin(r+Math.PI/2)*d,$=u+Math.cos(r)*d,b=g+Math.sin(r)*d;h.push(`<path d="M${u.toFixed(1)} ${g.toFixed(1)} L${f.toFixed(1)} ${x.toFixed(1)} A${d.toFixed(1)} ${d.toFixed(1)} 0 0 0 ${$.toFixed(1)} ${b.toFixed(1)}" fill="none" stroke="#9AA4AD" stroke-opacity=".55" stroke-width="2"/>`)}const m=t.filter((t=>"outdoor"!==(t.kind??l(t.name)))).map((t=>`<polygon points="${r(t)}" fill="none"/>`)).join(""),u=t.filter((t=>"outdoor"===(t.kind??l(t.name)))).map((t=>`<polygon points="${r(t)}" fill="none" stroke="#9AA4AD" stroke-opacity=".6" stroke-width="${Math.max(2,s/3)}" stroke-dasharray="${1.5*s} ${s}"/>`)).join("");return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${e} ${i}" width="${e}" height="${i}">\n<defs>\n<pattern id="tile" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#9AA4AD" stroke-opacity=".2" stroke-width="1"/></pattern>\n<pattern id="wood" width="60" height="14" patternUnits="userSpaceOnUse"><path d="M0 14H60M30 0V14" fill="none" stroke="#9AA4AD" stroke-opacity=".14" stroke-width="1"/></pattern>\n<pattern id="grass" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="4" cy="5" r="1.2" fill="#7fae8a" fill-opacity=".35"/><circle cx="13" cy="13" r="1" fill="#7fae8a" fill-opacity=".3"/></pattern>\n<mask id="doors"><rect width="${e}" height="${i}" fill="#fff"/>${p.join("")}</mask>\n</defs>\n<g>${a}</g>\n<g mask="url(#doors)" stroke="#9AA4AD" stroke-width="${s}" stroke-linejoin="miter" stroke-linecap="square">${m}</g>\n<g>${u}</g>\n<g>${h.join("")}</g>\n</svg>`}const u=t=>`data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(t)))}`;var g=Object.defineProperty,f=Object.getOwnPropertyDescriptor,x=(t,o,e,i)=>{for(var s,r=i>1?void 0:i?f(o,e):o,n=t.length-1;n>=0;n--)(s=t[n])&&(r=(i?s(o,e,r):s(r))||r);return i&&r&&g(o,e,r),r};const $=t=>4===t.length&&t[0][1]===t[1][1]&&t[1][0]===t[2][0]&&t[2][1]===t[3][1]&&t[3][0]===t[0][0],b=(t,o)=>{const[e,i]=[Math.min(t[0],o[0]),Math.max(t[0],o[0])],[s,r]=[Math.min(t[1],o[1]),Math.max(t[1],o[1])];return[[e,s],[i,s],[i,r],[e,r]]};let v=class extends s{constructor(){super(...arguments),this.ratio=1.5,this.trace="",this.rooms=[],this.doors=[],this.mode="room",this.box={w:0,h:0},this.down=t=>{if(0!==t.button)return;const o=t.target;try{t.currentTarget.setPointerCapture(t.pointerId)}catch{}const e=this.at(t);if("door"===this.mode)return this.placeDoor(e,o);const i=o.dataset?.corner;if(void 0!==i&&this.sel){const t=this.rooms.find((t=>t.id===this.sel));return void(this.drag={kind:"corner",id:t.id,corner:Number(i),orig:t.points.map((t=>[...t]))})}const s=o.dataset?.room;if(s){this.sel=s;const o=this.rooms.find((t=>t.id===s));this.drag={kind:"move",id:s,from:this.at(t,s),orig:o.points.map((t=>[...t]))}}else this.sel=void 0,this.drag={kind:"new",from:e,to:e}},this.move=t=>{const o=this.drag;if(!o)return;if("new"===o.kind)return void(this.drag={...o,to:this.at(t)});const e=this.at(t,o.id);this.rooms=this.rooms.map((t=>{if(t.id!==o.id)return t;if("move"===o.kind){const i=e[0]-o.from[0],s=e[1]-o.from[1];return{...t,points:o.orig.map((([t,o])=>[t+i,o+s]))}}const i=o.orig[(o.corner+2)%4];return{...t,points:$(o.orig)?b(i,e):o.orig.map(((t,i)=>i===o.corner?e:t))}}))},this.up=()=>{const t=this.drag;if(this.drag=void 0,"new"!==t?.kind)return;const o=b(t.from,t.to);if(o[1][0]-o[0][0]<3||o[2][1]-o[0][1]<3)return;const e=this.ctx.t("plan_room_n",{n:this.rooms.length+1}),i={id:r(),name:e,points:o};this.rooms=[...this.rooms,i],this.sel=i.id,n("tap"),requestAnimationFrame((()=>this.renderRoot.querySelector(".foot input")?.select()))}}connectedCallback(){super.connectedCallback(),this.rooms=structuredClone(this.floor.rooms??[]),this.doors=structuredClone(this.floor.doors??[]),this.ro=new ResizeObserver((()=>this.fit())),this.ro.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this.ro?.disconnect()}fit(){const t=this.renderRoot.querySelector(".stage");if(!t)return;const o=t.clientWidth-32,e=t.clientHeight-16,i=Math.min(o,e*this.ratio);this.box={w:i,h:i/this.ratio}}firstUpdated(){this.fit()}at(t,o){const e=this.renderRoot.querySelector(".canvas").getBoundingClientRect();let i=(t.clientX-e.left)/e.width*100,s=(t.clientY-e.top)/e.height*100;const r=this.rooms.filter((t=>t.id!==o)).flatMap((t=>t.points.map((t=>t[0])))),n=this.rooms.filter((t=>t.id!==o)).flatMap((t=>t.points.map((t=>t[1])))),a=(t,o)=>o.reduce(((o,e)=>Math.abs(e-t)<Math.abs(o-t)?e:o),1/0),d=a(i,r),p=a(s,n);return i=Math.abs(d-i)<1.2?d:Math.round(2*i)/2,s=Math.abs(p-s)<1.2?p:Math.round(2*s)/2,[Math.max(0,Math.min(100,i)),Math.max(0,Math.min(100,s))]}placeDoor(t,o){const e=o.dataset?.door;if(e)return void(this.doors=this.doors.filter((t=>t.id!==e)));let i;for(const s of this.rooms)for(let o=0;o<s.points.length;o++){const e=s.points[o],r=s.points[(o+1)%s.points.length],n=r[0]-e[0],a=r[1]-e[1],d=Math.max(.08,Math.min(.92,((t[0]-e[0])*n+(t[1]-e[1])*a)/(n*n+a*a||1))),p=e[0]+d*n,h=e[1]+d*a,l=Math.hypot(p-t[0],h-t[1]);(!i||l<i.d)&&(i={x:p,y:h,d:l})}i&&i.d<6&&(this.doors=[...this.doors,{id:r(),x:i.x,y:i.y}],n("tap"))}patch(t){this.rooms=this.rooms.map((o=>o.id===this.sel?{...o,...t}:o))}save(){const t=Math.round(1200/this.ratio),o=u(m(this.rooms,this.doors,1200,t)),e=this.floor,i=e.photo??(!e.drawn&&e.image?e.image:void 0);this.onDone({...e,rooms:this.rooms,doors:this.doors,image:o,drawn:!0,ratio:this.ratio,photo:i})}render(){const{t:t}=this.ctx,o=u(m(this.rooms,this.doors,1200,Math.round(1200/this.ratio))),e=this.rooms.find((t=>t.id===this.sel)),i=this.drag,s=[["wood",t("plan_kind_wood")],["tile",t("plan_kind_tile")],["plain",t("plan_kind_plain")],["outdoor",t("plan_kind_outdoor")]];return d`<div class="bar">
        <h2>${t("plan_draw")}</h2>
        <div class="seg">
          <button aria-pressed=${"room"===this.mode} @click=${()=>this.mode="room"}><sn-icon icon="rooms" style="--icon-size:18px"></sn-icon>${t("plan_mode_room")}</button>
          <button aria-pressed=${"door"===this.mode} @click=${()=>(this.mode="door",this.sel=void 0)}><sn-icon icon="door-open" style="--icon-size:18px"></sn-icon>${t("plan_mode_door")}</button>
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
          ${this.trace?d`<img class="trace" src=${this.trace} alt="" />`:a}
          <img src=${o} alt="" />
          <svg class="over" viewBox="0 0 100 100" preserveAspectRatio="none">
            ${this.rooms.map((t=>p`<polygon class="room ${t.id===this.sel?"sel":""}" data-room=${t.id} points=${t.points.map((t=>t.join(","))).join(" ")}></polygon>`))}
            ${"new"===i?.kind?p`<polygon class="ghost" points=${b(i.from,i.to).map((t=>t.join(","))).join(" ")}></polygon>`:a}
          </svg>
          ${this.rooms.map((t=>{const o=t.points.reduce(((t,o)=>t+o[0]),0)/t.points.length,e=t.points.reduce(((t,o)=>t+o[1]),0)/t.points.length;return d`<span class="label" style="left:${o}%;top:${e}%">${t.name}</span>`}))}
          ${e&&"room"===this.mode?e.points.map(((t,o)=>d`<span class="handle" data-corner=${o} style="left:${t[0]}%;top:${t[1]}%"></span>`)):a}
          ${"door"===this.mode?this.doors.map((t=>d`<span class="door" data-door=${t.id} style="left:${t.x}%;top:${t.y}%"></span>`)):a}
        </div>
      </div>
      <div class="foot">
        ${e?d`<input type="text" .value=${e.name} @input=${t=>this.patch({name:t.target.value})} />
              <div class="seg">${s.map((([t,o])=>d`<button aria-pressed=${(e.kind??l(e.name))===t} @click=${()=>this.patch({kind:t})}>${o}</button>`))}</div>
              <button class="icon-btn pressable" aria-label=${t("delete")} @click=${()=>(this.rooms=this.rooms.filter((t=>t.id!==this.sel)),this.sel=void 0)}>
                <sn-icon icon="delete" style="--icon-size:20px"></sn-icon>
              </button>`:d`<span class="hint">${t("door"===this.mode?"plan_door_hint":this.rooms.length?"plan_draw_more":"plan_draw_hint")}</span>`}
      </div>`}};function w(t,o,e,i,s){const r=function(t){let o=t;for(;o;){const t=o.getRootNode();if(!(t instanceof ShadowRoot))break;if("SMARTNEST-PANEL"===t.host.tagName)return t.host.shadowRoot.querySelector(".app")??document.body;o=t.host}return document.body}(o);return new Promise((o=>{const n=document.createElement("sn-plan-draw");n.ctx=t,n.floor=e,n.ratio=i,n.trace=s,n.onDone=t=>{n.remove(),o(t)},r.appendChild(n)}))}function y(t,o){const e=Math.round(1200/o);return{...t,image:u(m(t.rooms??[],t.doors??[],1200,e)),drawn:!0,ratio:o,photo:t.photo??(t.drawn?void 0:t.image)}}v.styles=[t,o`
      :host {
        position: fixed;
        inset: 0;
        z-index: 75;
        display: grid;
        grid-template-rows: auto 1fr auto;
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
      .foot input[type="text"] {
        flex: 1;
        min-width: 140px;
      }
      .hint {
        color: var(--text-2);
        font-size: 14px;
        flex: 1;
      }
    `],x([e({attribute:!1})],v.prototype,"ctx",2),x([e({attribute:!1})],v.prototype,"floor",2),x([e({type:Number})],v.prototype,"ratio",2),x([e()],v.prototype,"trace",2),x([e({attribute:!1})],v.prototype,"onDone",2),x([i()],v.prototype,"rooms",2),x([i()],v.prototype,"doors",2),x([i()],v.prototype,"sel",2),x([i()],v.prototype,"mode",2),x([i()],v.prototype,"drag",2),x([i()],v.prototype,"box",2),v=x([h("sn-plan-draw")],v);export{v as SnPlanDraw,y as cleanFloor,w as drawPlan};
