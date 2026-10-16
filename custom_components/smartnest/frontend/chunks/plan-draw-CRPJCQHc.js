import{ae as t,A as i,af as o,ag as s,ah as e,ai as n,aj as r,s as a,i as l,n as d,r as h,a as p,ak as c,u,al as m,am as f,b as g,e as b,an as v,ao as x,ap as w,aq as $,ar as y,t as k}from"./app-B_FGhboQ.js";import"./loader-43RavMas.js";class _ extends t{constructor(t){if(super(t),this.it=i,t.type!==o.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===i||null==t)return this._t=void 0,this.it=t;if(t===s)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const o=[t];return o.raw=o,this._t={_$litType$:this.constructor.resultType,strings:o,values:[]}}}_.directiveName="unsafeHTML",_.resultType=1;class M extends _{}M.directiveName="unsafeSVG",M.resultType=2;const z=e(M);var F=Object.defineProperty,D=Object.getOwnPropertyDescriptor,j=(t,i,o,s)=>{for(var e,n=s>1?void 0:s?D(i,o):i,r=t.length-1;r>=0;r--)(e=t[r])&&(n=(s?e(i,o,n):e(n))||n);return s&&n&&F(i,o,n),n};const C=t=>"window"===t||"wide_window"===t,P=t=>4===t.length&&t[0][1]===t[1][1]&&t[1][0]===t[2][0]&&t[2][1]===t[3][1]&&t[3][0]===t[0][0],R=(t,i)=>{const[o,s]=[Math.min(t[0],i[0]),Math.max(t[0],i[0])],[e,n]=[Math.min(t[1],i[1]),Math.max(t[1],i[1])];return[[o,e],[s,e],[s,n],[o,n]]};let S=class extends p{constructor(){super(...arguments),this.ratio=1.5,this.trace="",this.rooms=[],this.doors=[],this.openings=[],this.walls=[],this.shape="rect",this.poly=[],this.doorKind="door",this.furniture=[],this.mode="room",this.box={w:0,h:0},this.down=t=>{if(0!==t.button)return;const i=t.target;try{t.currentTarget.setPointerCapture(t.pointerId)}catch{}const o=this.at(t);if("line"===this.mode){const s=i.dataset?.wall;if(s)return void(this.selW=s);this.selW=void 0;const e=this.endSnap(this.raw(t))??o;return void(this.drag={kind:"line",from:e,to:e})}if("door"===this.mode||"window"===this.mode)return this.placeDoor(o,i);if("wall"===this.mode)return this.toggleWall(o,i);if("furn"===this.mode){const o=i.dataset?.furn,s=i.dataset?.fsize,e=this.raw(t);if(i.dataset?.frot&&this.selF)return void(this.drag={kind:"frot",id:this.selF});if(s&&this.selF){const t=this.furniture.find((t=>t.id===this.selF));return void(this.drag={kind:"fsize",id:t.id,from:e,orig:{w:t.w,h:t.h}})}if(o){this.selF=o;const t=this.furniture.find((t=>t.id===o));return void(this.drag={kind:"fmove",id:o,from:e,orig:[t.x,t.y]})}return this.selF=void 0,void(this.sel=i.dataset?.room??this.sel)}if("poly"===this.shape&&(this.poly.length||!i.dataset?.room)&&void 0===i.dataset?.corner&&void 0===i.dataset?.mid){const i=this.nextPoint(t);return this.poly.length>=3&&i[0]===this.poly[0][0]&&i[1]===this.poly[0][1]?this.finishPoly():(this.poly=[...this.poly,i],this.sel=void 0,void c("tick"))}const s=i.dataset?.mid;if(void 0!==s&&this.sel){const t=Number(s),i=this.rooms.find((t=>t.id===this.sel)),o=i.points[t],e=i.points[(t+1)%i.points.length],n=[...i.points.slice(0,t+1),[(o[0]+e[0])/2,(o[1]+e[1])/2],...i.points.slice(t+1)];return this.rooms=this.rooms.map((t=>t.id===i.id?{...t,points:n}:t)),this.selV=t+1,void(this.drag={kind:"corner",id:i.id,corner:t+1,orig:n.map((t=>[...t]))})}const e=i.dataset?.corner;if(void 0!==e&&this.sel){const t=this.rooms.find((t=>t.id===this.sel));return this.selV=Number(e),void(this.drag={kind:"corner",id:t.id,corner:Number(e),orig:t.points.map((t=>[...t]))})}this.selV=void 0;const n=i.dataset?.room;if(n){this.sel=n;const i=this.rooms.find((t=>t.id===n));this.drag={kind:"move",id:n,from:this.at(t,n),orig:i.points.map((t=>[...t]))}}else this.sel=void 0,this.drag={kind:"new",from:o,to:o}},this.moveFrame=0,this.onMoveEvent=t=>{this.lastMove=t,this.moveFrame||(this.moveFrame=requestAnimationFrame((()=>{this.moveFrame=0,this.lastMove&&this.move(this.lastMove)})))},this.move=t=>{const i=this.drag;if(!i&&this.poly.length)return void(this.hover=this.nextPoint(t));if(!i)return;if("new"===i.kind)return void(this.drag={...i,to:this.at(t)});if("line"===i.kind)return void(this.drag={...i,to:this.lineEnd(i.from,t)});if("frot"===i.kind){const o=this.raw(t);return void(this.furniture=this.furniture.map((t=>{if(t.id!==i.id)return t;const s=(o[0]-t.x)/100*this.box.w,e=(o[1]-t.y)/100*this.box.h;let n=180*Math.atan2(e,s)/Math.PI+90;n=(n%360+360)%360;const r=90*Math.round(n/90);return n=Math.abs(n-r)<6?r%360:15*Math.round(n/15)%360,n!==t.rot&&c("tick"),{...t,rot:n}})))}if("fmove"===i.kind||"fsize"===i.kind){const o=this.raw(t),s=1200,e=s/this.ratio;return void(this.furniture=this.furniture.map((t=>{if(t.id!==i.id)return t;if("fmove"===i.kind)return{...t,x:Math.round(4*(i.orig[0]+o[0]-i.from[0]))/4,y:Math.round(4*(i.orig[1]+o[1]-i.from[1]))/4};const n=(o[0]-i.from[0])/100*s,r=(o[1]-i.from[1])/100*e,a=-t.rot*Math.PI/180,l=n*Math.cos(a)-r*Math.sin(a),d=n*Math.sin(a)+r*Math.cos(a);return{...t,w:Math.max(20,Math.round(i.orig.w+2*l)),h:Math.max(10,Math.round(i.orig.h+2*d))}})))}const o=this.at(t,i.id);this.rooms=this.rooms.map((t=>{if(t.id!==i.id)return t;if("move"===i.kind){const s=o[0]-i.from[0],e=o[1]-i.from[1];return{...t,points:i.orig.map((([t,i])=>[t+s,i+e]))}}const s=i.orig[(i.corner+2)%4];return{...t,points:P(i.orig)?R(s,o):i.orig.map(((t,s)=>s===i.corner?o:t))}}))},this.up=()=>{this.moveFrame&&(cancelAnimationFrame(this.moveFrame),this.moveFrame=0,this.lastMove&&this.drag&&this.move(this.lastMove));const t=this.drag;if(this.drag=void 0,"line"===t?.kind){if(Math.hypot(t.to[0]-t.from[0],t.to[1]-t.from[1])<1.5)return;return this.walls=[...this.walls,{id:u(),a:t.from,b:t.to}],void c("tap")}if("new"!==t?.kind)return;const i=R(t.from,t.to);if(i[1][0]-i[0][0]<3||i[2][1]-i[0][1]<3)return;const o=this.ctx.t("plan_room_n",{n:this.rooms.length+1}),s={id:u(),name:o,points:i};this.rooms=[...this.rooms,s],this.sel=s.id,c("tap"),requestAnimationFrame((()=>this.renderRoot.querySelector(".foot input")?.select()))}}connectedCallback(){super.connectedCallback(),this.rooms=structuredClone(this.floor.rooms??[]),this.doors=structuredClone(this.floor.doors??[]),this.openings=structuredClone(this.floor.openings??[]),this.walls=structuredClone(this.floor.walls??[]),this.furniture=structuredClone(this.floor.furniture??[]),this.ro=new ResizeObserver((()=>this.fit())),this.ro.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this.ro?.disconnect()}fit(){const t=this.renderRoot.querySelector(".stage");if(!t)return;const i=t.clientWidth-32,o=t.clientHeight-16,s=Math.min(i,o*this.ratio);this.box={w:s,h:s/this.ratio}}firstUpdated(){this.fit()}at(t,i){const o=this.renderRoot.querySelector(".canvas").getBoundingClientRect();let s=(t.clientX-o.left)/o.width*100,e=(t.clientY-o.top)/o.height*100;const n=this.rooms.filter((t=>t.id!==i)).flatMap((t=>t.points.map((t=>t[0])))),r=this.rooms.filter((t=>t.id!==i)).flatMap((t=>t.points.map((t=>t[1])))),a=(t,i)=>i.reduce(((i,o)=>Math.abs(o-t)<Math.abs(i-t)?o:i),1/0),l=a(s,n),d=a(e,r);return s=Math.abs(l-s)<1.2?l:Math.round(2*s)/2,e=Math.abs(d-e)<1.2?d:Math.round(2*e)/2,[Math.max(0,Math.min(100,s)),Math.max(0,Math.min(100,e))]}raw(t){const i=this.renderRoot.querySelector(".canvas").getBoundingClientRect();return[(t.clientX-i.left)/i.width*100,(t.clientY-i.top)/i.height*100]}nextPoint(t){const i=this.endSnap(this.raw(t));if(i)return i;const o=this.poly.length?this.lineEnd(this.poly[this.poly.length-1],t):this.at(t);for(const s of this.poly.slice(0,-1))Math.abs(o[0]-s[0])<1.5&&(o[0]=s[0]),Math.abs(o[1]-s[1])<1.5&&(o[1]=s[1]);return o}finishPoly(){if(this.poly.length<3)return;const t={id:u(),name:this.ctx.t("plan_room_n",{n:this.rooms.length+1}),points:this.poly};this.rooms=[...this.rooms,t],this.poly=[],this.hover=void 0,this.sel=t.id,c("success"),requestAnimationFrame((()=>this.renderRoot.querySelector(".foot input")?.select()))}endSnap(t){const i=[...this.poly,...this.walls.flatMap((t=>[t.a,t.b])),...this.rooms.flatMap((t=>t.points))];let o,s=1.6;for(const e of i){const i=Math.hypot(e[0]-t[0],(e[1]-t[1])/this.ratio);i<s&&([o,s]=[e,i])}return o?[...o]:void 0}lineEnd(t,i){const o=this.raw(i),s=this.endSnap(o);if(s)return s;const e=this.at(i),n=e[0]-t[0],r=(e[1]-t[1])/this.ratio,a=Math.abs(180*Math.atan2(r,n)/Math.PI),l=t=>Math.abs(a-t)<8;if(l(0)||l(180))return[e[0],t[1]];if(l(90))return[t[0],e[1]];if(l(45)||l(135)){const i=(Math.abs(n)+Math.abs(r))/2;return[t[0]+Math.sign(n)*i,t[1]+Math.sign(r)*i*this.ratio]}return e}toggleWall(t,i){const o=i.dataset?.opening;if(o)return void(this.openings=this.openings.filter((t=>t.id!==o)));let s;for(const l of this.rooms)for(let i=0;i<l.points.length;i++){const o=l.points[i],e=l.points[(i+1)%l.points.length],n=e[0]-o[0],r=e[1]-o[1],a=Math.max(0,Math.min(1,((t[0]-o[0])*n+(t[1]-o[1])*r)/(n*n+r*r||1))),d=Math.hypot(o[0]+a*n-t[0],o[1]+a*r-t[1]);(!s||d<s.d)&&(s={a:o,b:e,d:d,room:l.id})}if(!s||s.d>4)return;let{a:e,b:n}=s;const r=Math.abs(e[0]-n[0])<.01,a=Math.abs(e[1]-n[1])<.01;if(r||a){const t=t=>r?t[1]:t[0],i=r?e[0]:e[1];let o=Math.min(t(e),t(n)),a=Math.max(t(e),t(n));for(const e of this.rooms)if(e.id!==s.room)for(let s=0;s<e.points.length;s++){const n=e.points[s],l=e.points[(s+1)%e.points.length];if(!(r?Math.abs(n[0]-i)<.01&&Math.abs(l[0]-i)<.01:Math.abs(n[1]-i)<.01&&Math.abs(l[1]-i)<.01))continue;const d=Math.max(o,Math.min(t(n),t(l))),h=Math.min(a,Math.max(t(n),t(l)));h-d>.5&&(o=d,a=h)}e=r?[i,o]:[o,i],n=r?[i,a]:[a,i]}this.openings=[...this.openings,{id:u(),a:e,b:n}],c("tap")}addFurniture(t){const i=m[t],o=this.rooms.find((t=>t.id===this.sel)),s=o?o.points.reduce(((t,i)=>t+i[0]),0)/o.points.length:50,e=o?o.points.reduce(((t,i)=>t+i[1]),0)/o.points.length:50,n={id:u(),kind:t,x:s,y:e,w:i.w,h:i.h,rot:0};this.furniture=[...this.furniture,n],this.selF=n.id,c("tap")}patchF(t){this.furniture=this.furniture.map((i=>i.id===this.selF?{...i,...t}:i))}placeDoor(t,i){const o=i.dataset?.door;if(o)return void(this.selD=o);let s;this.selD=void 0;for(const[e,n]of f(this.rooms,this.walls)){const i=n[0]-e[0],o=n[1]-e[1],r=Math.max(.08,Math.min(.92,((t[0]-e[0])*i+(t[1]-e[1])*o)/(i*i+o*o||1))),a=e[0]+r*i,l=e[1]+r*o,d=Math.hypot(a-t[0],l-t[1]);(!s||d<s.d)&&(s={x:a,y:l,d:d})}if(s&&s.d<6){const t="window"===this.mode?C(this.doorKind)?this.doorKind:"window":C(this.doorKind)?"door":this.doorKind,i={id:u(),x:s.x,y:s.y,kind:t};this.doors=[...this.doors,i],this.selD=i.id,c("tap")}}renderDoorFoot(){const{t:t,hass:i,config:o}=this.ctx,s="window"===this.mode,e=s?["window","wide_window"]:["door","double","slide"],n=this.doors.find((t=>t.id===this.selD)),r=t=>{this.doorKind=t,n&&(this.doors=this.doors.map((i=>i.id===n.id?{...i,kind:t}:i)))},a=s?["window"]:["door","garage_door","gate"],l=Object.values(i.states).filter((t=>t.entity_id.startsWith("binary_sensor.")&&[...a,"opening"].includes(t.attributes.device_class)||t.entity_id.startsWith("cover.")&&(s?!["door","garage","gate"].includes(t.attributes.device_class):["door","garage","gate"].includes(t.attributes.device_class))||t.entity_id.startsWith("lock.")&&!s)).map((t=>t.entity_id));return g`<div class="seg">${e.map((i=>g`<button aria-pressed=${(n?.kind??this.doorKind)===i} @click=${()=>r(i)}>${t(`plan_opening_${i}`)}</button>`))}</div>
      ${n?g`<select
              @change=${t=>this.doors=this.doors.map((i=>i.id===n.id?{...i,entity:t.target.value||void 0}:i))}
            >
              <option value="">${t("plan_link_none")}</option>
              ${l.map((t=>g`<option value=${t} ?selected=${n.entity===t}>${b(i,o,t)}</option>`))}
            </select>
            <button class="icon-btn pressable" aria-label=${t("delete")} @click=${()=>(this.doors=this.doors.filter((t=>t.id!==n.id)),this.selD=void 0)}>
              <sn-icon icon="delete" style="--icon-size:20px"></sn-icon>
            </button>
            <button class="btn primary pressable" @click=${()=>this.selD=void 0}>${t("done")}</button>`:g`<span class="hint">${t(s?"plan_window_hint":"plan_door_hint")}</span>`}`}patch(t){this.rooms=this.rooms.map((i=>i.id===this.sel?{...i,...t}:i))}save(){const t=Math.round(1200/this.ratio),i=n(r(this.rooms,this.doors,1200,t,{openings:this.openings,furniture:this.furniture,walls:this.walls})),o=this.floor,s=o.photo??(!o.drawn&&o.image?o.image:void 0);this.onDone({...o,rooms:this.rooms,doors:this.doors,openings:this.openings,furniture:this.furniture,walls:this.walls,image:i,drawn:!0,ratio:this.ratio,photo:s})}render(){const{t:t}=this.ctx,o=1200,s=Math.round(o/this.ratio),e=this.drag,n=!e||"fmove"!==e.kind&&"fsize"!==e.kind&&"frot"!==e.kind?void 0:e.id;let a=this.frozen;n&&a||(a=r(this.rooms,this.doors,o,s,{openings:this.openings,furniture:this.furniture.filter((t=>t.id!==n)),walls:this.walls}),this.frozen=n?a:void 0);const l=n?this.furniture.find((t=>t.id===n)):void 0,d=this.furniture.find((t=>t.id===this.selF)),h=this.rooms.find((t=>t.id===this.sel)),p=this.drag,c=[["wood",t("plan_kind_wood")],["tile",t("plan_kind_tile")],["plain",t("plan_kind_plain")],["outdoor",t("plan_kind_outdoor")]];return g`<div class="bar">
        <h2>${t("plan_draw")}</h2>
        <div class="seg">
          <button aria-pressed=${"room"===this.mode} @click=${()=>this.mode="room"}><sn-icon icon="rooms" style="--icon-size:18px"></sn-icon>${t("plan_mode_room")}</button>
          <button aria-pressed=${"line"===this.mode} @click=${()=>(this.mode="line",this.sel=void 0)}><sn-icon icon="wall" style="--icon-size:18px"></sn-icon>${t("plan_mode_line")}</button>
          <button aria-pressed=${"door"===this.mode} @click=${()=>(this.mode="door",this.sel=void 0,this.selD=void 0,this.doorKind="door")}><sn-icon icon="door-open" style="--icon-size:18px"></sn-icon>${t("plan_mode_door")}</button>
          <button aria-pressed=${"window"===this.mode} @click=${()=>(this.mode="window",this.sel=void 0,this.selD=void 0,this.doorKind="window")}><sn-icon icon="window-closed-variant" style="--icon-size:18px"></sn-icon>${t("plan_mode_window")}</button>
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
          @pointermove=${this.onMoveEvent}
          @pointerup=${this.up}
          @pointercancel=${this.up}
        >
          ${this.trace?g`<img class="trace" src=${this.trace} alt="" />`:i}
          <div class="pv">${z(a)}</div>
          ${l?g`<svg class="lifted" viewBox="0 0 ${o} ${s}" preserveAspectRatio="none">
                <g fill="#B4BDC5" fill-opacity=".3" stroke="var(--accent)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">${z(v(l,o,s))}</g>
              </svg>`:i}
          <svg class="over" viewBox="0 0 100 100" preserveAspectRatio="none">
            ${this.rooms.map((t=>x`<polygon class="room ${t.id===this.sel?"sel":""}" data-room=${t.id} points=${t.points.map((t=>t.join(","))).join(" ")}></polygon>`))}
            ${"new"===p?.kind?x`<polygon class="ghost" points=${R(p.from,p.to).map((t=>t.join(","))).join(" ")}></polygon>`:i}
            ${this.poly.length?x`<polyline class="ghost" points=${[...this.poly,...this.hover?[this.hover]:[]].map((t=>t.join(","))).join(" ")}></polyline>`:i}
            ${"line"===p?.kind?x`<line class="ghostline" x1=${p.from[0]} y1=${p.from[1]} x2=${p.to[0]} y2=${p.to[1]}></line>`:i}
            ${"line"===this.mode?this.walls.map((t=>x`<line class="wl ${t.id===this.selW?"sel":""}" data-wall=${t.id} x1=${t.a[0]} y1=${t.a[1]} x2=${t.b[0]} y2=${t.b[1]}></line>`)):i}
            ${"wall"===this.mode?this.openings.map((t=>x`<line class="open" data-opening=${t.id} x1=${t.a[0]} y1=${t.a[1]} x2=${t.b[0]} y2=${t.b[1]}></line>`)):i}
          </svg>
          ${"furn"===this.mode?this.furniture.map((t=>{const e=t.w/o*this.box.w,n=t.h/s*this.box.h;return g`<span
                  class="furn ${t.id===this.selF?"sel":""}"
                  data-furn=${t.id}
                  style="left:${t.x}%;top:${t.y}%;width:${e}px;height:${n}px;transform:translate(-50%, -50%) rotate(${t.rot}deg)"
                >${t.id===this.selF?g`<i class="fsize" data-fsize="1"></i><i class="frot" data-frot="1"></i>`:i}</span>`})):i}
          ${this.rooms.map((t=>{const i=t.points.reduce(((t,i)=>t+i[0]),0)/t.points.length,o=t.points.reduce(((t,i)=>t+i[1]),0)/t.points.length;return g`<span class="label" style="left:${i}%;top:${o}%">${t.name}</span>`}))}
          ${h&&"room"===this.mode?g`${h.points.map(((t,i)=>{const o=h.points[(i+1)%h.points.length];return g`<span class="mid" data-mid=${i} style="left:${(t[0]+o[0])/2}%;top:${(t[1]+o[1])/2}%">+</span>`}))}
              ${h.points.map(((t,i)=>g`<span class="handle ${i===this.selV?"on":""}" data-corner=${i} style="left:${t[0]}%;top:${t[1]}%"></span>`))}`:i}
          ${this.poly.map(((t,i)=>g`<span class="dot ${0===i&&this.poly.length>=3?"first":""}" style="left:${t[0]}%;top:${t[1]}%"></span>`))}
          ${"door"===this.mode||"window"===this.mode?this.doors.filter((t=>C(t.kind)===("window"===this.mode))).map((t=>g`<span class="door ${t.id===this.selD?"on":""} ${t.entity?"linked":""}" data-door=${t.id} style="left:${t.x}%;top:${t.y}%"></span>`)):i}
        </div>
      </div>
      <div class="foot">
        ${"furn"===this.mode?d?g`<span class="hint">${t(`furn_${d.kind}`)}</span>
                <span class="hint ltr" style="flex:none">${d.rot}°</span>
                <button class="btn pressable" @click=${()=>this.patchF({rot:(90*Math.round(d.rot/90)+90)%360})}><sn-icon icon="rotate-right" style="--icon-size:18px"></sn-icon>${t("plan_turn")}</button>
                <button class="btn pressable" @click=${()=>{const t={...d,id:u(),x:d.x+3,y:d.y+3};this.furniture=[...this.furniture,t],this.selF=t.id}}><sn-icon icon="content-copy" style="--icon-size:18px"></sn-icon>${t("plan_copy")}</button>
                <button class="icon-btn pressable" aria-label=${t("delete")} @click=${()=>(this.furniture=this.furniture.filter((t=>t.id!==this.selF)),this.selF=void 0)}>
                  <sn-icon icon="delete" style="--icon-size:20px"></sn-icon>
                </button>
                <button class="btn primary pressable" @click=${()=>this.selF=void 0}>${t("done")}</button>`:g`<div class="palette">
                ${w.map((i=>g`<button class="item pressable" title=${t(`furn_${i}`)} @click=${()=>this.addFurniture(i)}>
                    ${z($(i))}<span>${t(`furn_${i}`)}</span>
                  </button>`))}
              </div>`:"wall"===this.mode?g`<span class="hint">${t("plan_wall_hint")}</span>`:"line"===this.mode?this.selW?g`<span class="hint">${t("plan_line_sel")}</span>
                <button class="icon-btn pressable" aria-label=${t("delete")} @click=${()=>(this.walls=this.walls.filter((t=>t.id!==this.selW)),this.selW=void 0)}>
                  <sn-icon icon="delete" style="--icon-size:20px"></sn-icon>
                </button>
                <button class="btn primary pressable" @click=${()=>this.selW=void 0}>${t("done")}</button>`:g`<span class="hint">${t("plan_line_hint")}</span>`:"door"===this.mode||"window"===this.mode?this.renderDoorFoot():this.poly.length?g`<span class="hint">${t("plan_poly_drawing")}</span>
              <button class="btn pressable" @click=${()=>this.poly=this.poly.slice(0,-1)}><sn-icon icon="undo" style="--icon-size:18px"></sn-icon>${t("plan_poly_undo")}</button>
              <button class="btn pressable" @click=${()=>(this.poly=[],this.hover=void 0)}>${t("cancel")}</button>
              <button class="btn primary pressable" ?disabled=${this.poly.length<3} @click=${()=>this.finishPoly()}>${t("plan_poly_close")}</button>`:h?g`<input type="text" .value=${h.name} @input=${t=>this.patch({name:t.target.value})} />
              <div class="seg">${c.map((([t,i])=>g`<button aria-pressed=${(h.kind??y(h.name))===t} @click=${()=>this.patch({kind:t})}>${i}</button>`))}</div>
              <button class="btn pressable" aria-pressed=${!h.nowall} title=${t("plan_room_walls")} @click=${()=>this.patch({nowall:!h.nowall})}>
                <sn-icon icon=${h.nowall?"border-none-variant":"border-all-variant"} style="--icon-size:18px"></sn-icon>${t(h.nowall?"plan_room_nowall":"plan_room_walls")}
              </button>
              ${void 0!==this.selV&&h.points.length>3?g`<button
                    class="btn pressable"
                    @click=${()=>{this.patch({points:h.points.filter(((t,i)=>i!==this.selV))}),this.selV=void 0}}
                  >
                    ${t("plan_point_remove")}
                  </button>`:i}
              <button class="icon-btn pressable" aria-label=${t("delete")} @click=${()=>(this.rooms=this.rooms.filter((t=>t.id!==this.sel)),this.sel=void 0)}>
                <sn-icon icon="delete" style="--icon-size:20px"></sn-icon>
              </button>`:g`${"room"===this.mode?g`<div class="seg">
                    <button aria-pressed=${"rect"===this.shape} @click=${()=>this.shape="rect"}><sn-icon icon="square-outline" style="--icon-size:16px"></sn-icon>${t("plan_shape_rect")}</button>
                    <button aria-pressed=${"poly"===this.shape} @click=${()=>this.shape="poly"}><sn-icon icon="vector-polygon" style="--icon-size:16px"></sn-icon>${t("plan_shape_poly")}</button>
                  </div>`:i}
              <span class="hint">${t("poly"===this.shape?"plan_poly_hint":this.rooms.length?"plan_draw_more":"plan_draw_hint")}</span>`}
      </div>`}};function W(t,i,o,s,e){const n=function(t){let i=t;for(;i;){const t=i.getRootNode();if(!(t instanceof ShadowRoot))break;if("SMARTNEST-PANEL"===t.host.tagName)return t.host.shadowRoot.querySelector(".app")??document.body;i=t.host}return document.body}(i);return new Promise((i=>{const r=document.createElement("sn-plan-draw");r.ctx=t,r.floor=o,r.ratio=s,r.trace=e,r.onDone=t=>{r.remove(),i(t)},n.appendChild(r)}))}function N(t,i){const o=Math.round(1200/i);return{...t,image:n(r(t.rooms??[],t.doors??[],1200,o,{openings:t.openings,furniture:t.furniture,walls:t.walls})),drawn:!0,ratio:i,photo:t.photo??(t.drawn?void 0:t.image)}}S.styles=[a,l`
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
      .pv,
      svg.lifted {
        position: absolute;
        inset: 0;
        pointer-events: none;
      }
      .pv svg {
        width: 100%;
        height: 100%;
        display: block;
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
      .door.on {
        width: 24px;
        height: 24px;
        margin: -12px 0 0 -12px;
        box-shadow: 0 0 0 6px color-mix(in srgb, var(--accent) 30%, transparent);
      }
      .door.linked::after {
        content: "🔗";
        position: absolute;
        top: -16px;
        left: 10px;
        font-size: 11px;
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
    `],j([d({attribute:!1})],S.prototype,"ctx",2),j([d({attribute:!1})],S.prototype,"floor",2),j([d({type:Number})],S.prototype,"ratio",2),j([d()],S.prototype,"trace",2),j([d({attribute:!1})],S.prototype,"onDone",2),j([h()],S.prototype,"rooms",2),j([h()],S.prototype,"doors",2),j([h()],S.prototype,"openings",2),j([h()],S.prototype,"walls",2),j([h()],S.prototype,"selW",2),j([h()],S.prototype,"shape",2),j([h()],S.prototype,"poly",2),j([h()],S.prototype,"hover",2),j([h()],S.prototype,"doorKind",2),j([h()],S.prototype,"selV",2),j([h()],S.prototype,"furniture",2),j([h()],S.prototype,"selF",2),j([h()],S.prototype,"sel",2),j([h()],S.prototype,"mode",2),j([h()],S.prototype,"selD",2),j([h()],S.prototype,"drag",2),j([h()],S.prototype,"box",2),S=j([k("sn-plan-draw")],S);export{S as SnPlanDraw,N as cleanFloor,W as drawPlan};
