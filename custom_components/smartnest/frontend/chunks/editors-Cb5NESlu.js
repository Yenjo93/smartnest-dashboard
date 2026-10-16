import{_ as e}from"./loader-43RavMas.js";import{r as t,n as s,t as i,i as a,b as n,e as l,l as o,s as r,A as c,L as p,u as d,a as g,d as u,c as h,f as m,g as y,h as f,P as $,j as b,k as v,m as _,o as x,w,p as k,q as z,v as S,x as j,y as N,T as O,z as D,B as M,C,W,D as I,E as q,F as A,G as P,H as B,I as T,J as R,K as F,M as E,N as L,O as U,Q as H,R as J,S as V,U as G,V as K,X as Q,Y as X,Z as Y,_ as Z,$ as ee,a0 as te,a1 as se,a2 as ie,a3 as ae,a4 as ne,a5 as le,a6 as oe}from"./app-DXLXZjxL.js";var re=Object.defineProperty,ce=Object.getOwnPropertyDescriptor,pe=(e,t,s,i)=>{for(var a,n=i>1?void 0:i?ce(t,s):t,l=e.length-1;l>=0;l--)(a=e[l])&&(n=(i?a(t,s,n):a(n))||n);return i&&n&&re(t,s,n),n};const de=(e,t)=>n`<section style="display:grid;gap:8px;padding:14px 16px;border-radius:var(--r-md);background:var(--surface-2)">
  <div style="font-weight:700">${e}</div>
  ${t}
</section>`;let ge=class extends a{createRenderRoot(){return this}async connectedCallback(){super.connectedCallback();const{hass:e}=this.ctx,t=Object.values(e.states).filter((e=>e.entity_id.startsWith("sensor.")&&"battery"===e.attributes.device_class&&!Number.isNaN(Number(e.state)))).map((e=>e.entity_id)).slice(0,60);if(!t.length)return void(this.rows=[]);let s={};try{s=await e.callWS({type:"recorder/statistics_during_period",start_time:new Date(Date.now()-2592e6).toISOString(),statistic_ids:t,period:"day",types:["mean"]})}catch{return void(this.rows=[])}const i=[];for(const a of t){const t=(s[a]??[]).map((e=>["number"==typeof e.start?e.start>1e12?e.start:1e3*e.start:Date.parse(e.start),e.mean??NaN])).filter((([,e])=>!Number.isNaN(e)));if(t.length<7)continue;const n=t.length,l=t.map((([e])=>e/864e5)),o=t.map((([,e])=>e)),r=l.reduce(((e,t)=>e+t),0)/n,c=o.reduce(((e,t)=>e+t),0)/n,p=l.reduce(((e,t,s)=>e+(t-r)*(o[s]-c)),0)/(l.reduce(((e,t)=>e+(t-r)**2),0)||1),d=Number(e.states[a].state);p>=-.05||d<=10||i.push({id:a,level:d,days:Math.round((d-10)/-p)})}this.rows=i.sort(((e,t)=>e.days-t.days)).slice(0,10)}render(){const{t:e,hass:t,config:s}=this.ctx;return this.rows?de(e("bat_title"),this.rows.length?n`<div style="display:grid;gap:4px;font-size:14px">
            ${this.rows.map((i=>n`<div style="display:flex;justify-content:space-between;gap:12px">
                <span>${l(t,s,i.id)} <span class="muted ltr">${Math.round(i.level)}%</span></span>
                <span style="color:${i.days<21?"var(--alert-text)":"var(--text-2)"}">${i.days>365?e("bat_year"):e("bat_days",{n:i.days})}</span>
              </div>`))}
          </div>`:n`<span class="muted" style="font-size:14px">${e("bat_none")}</span>`):de(e("bat_title"),n`<span class="muted" style="font-size:14px">${e("loading")}</span>`)}};pe([s({attribute:!1})],ge.prototype,"ctx",2),pe([t()],ge.prototype,"rows",2),ge=pe([i("sn-battery-plan")],ge);let ue=class extends a{constructor(){super(...arguments),this.busy=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),o(this.ctx.hass,"warranty").then((e=>this.items=e?.items??[]))}save(e){this.items=e,r(this.ctx.hass,"warranty",{items:e}).catch((()=>this.ctx.toast(this.ctx.t("error"))))}render(){const{t:e,lang:t}=this.ctx;if(!this.items)return c;const s=e=>{const t=new Date(`${e.bought}T12:00`);return t.setMonth(t.getMonth()+e.months),t};return de(e("war_title"),n`${this.items.slice().sort(((e,t)=>s(e).getTime()-s(t).getTime())).map((i=>{const a=s(i),l=Math.round((a.getTime()-Date.now())/864e5);return n`<div style="display:flex;align-items:center;gap:10px;font-size:14px">
              <span style="flex:1">${i.name}</span>
              <span style="color:${l<0?"var(--text-2)":l<60?"var(--alert-text)":"var(--success)"}"
                >${l<0?e("war_over"):e("war_until",{date:a.toLocaleDateString(p[t],{day:"numeric",month:"short",year:"numeric"})})}</span
              >
              ${i.invoice?n`<a href=${i.invoice} target="_blank" rel="noopener" title=${e("war_invoice")}>🧾</a>`:c}
              <button class="icon-btn small pressable" aria-label=${e("delete")} @click=${()=>this.save(this.items.filter((e=>e.id!==i.id)))}>
                <sn-icon icon="close" style="--icon-size:14px"></sn-icon>
              </button>
            </div>`}))}
        <form
          style="display:grid;gap:8px;margin-top:6px"
          @submit=${async e=>{e.preventDefault();const t=e.currentTarget,s=new FormData(t),i=s.get("invoice");let a;this.busy=!0,i&&i.size&&(a=await d(this.ctx.hass,i).catch((()=>{}))),this.save([...this.items,{id:g(),name:String(s.get("name")).trim(),bought:String(s.get("bought")),months:Number(s.get("months"))||12,invoice:a}]),this.busy=!1,t.reset()}}
        >
          <input name="name" type="text" required placeholder=${e("war_what")} style="background:var(--surface-solid)" />
          <div style="display:flex;gap:8px">
            <input name="bought" type="date" required .value=${(new Date).toISOString().slice(0,10)} style="flex:1;background:var(--surface-solid)" />
            <select name="months" style="width:auto;background:var(--surface-solid)">
              ${[6,12,24,36,60].map((t=>n`<option value=${t} ?selected=${12===t}>${e("war_months",{n:t})}</option>`))}
            </select>
          </div>
          <label class="field">🧾 ${e("war_invoice")}<input name="invoice" type="file" accept="image/*" /></label>
          <button class="btn pressable" type="submit" ?disabled=${this.busy} style="justify-self:start">${e("add")}</button>
        </form>`)}};pe([s({attribute:!1})],ue.prototype,"ctx",2),pe([t()],ue.prototype,"items",2),pe([t()],ue.prototype,"busy",2),ue=pe([i("sn-warranty")],ue);var he=Object.defineProperty,me=Object.getOwnPropertyDescriptor,ye=(e,t,s,i)=>{for(var a,n=i>1?void 0:i?me(t,s):t,l=e.length-1;l>=0;l--)(a=e[l])&&(n=(i?a(t,s,n):a(n))||n);return i&&n&&he(t,s,n),n};let fe=class extends a{connectedCallback(){super.connectedCallback(),w(this.ctx).then((e=>this.rows=e))}createRenderRoot(){return this}render(){const{t:e}=this.ctx;return this.rows?ve(e("faults_week"),!this.rows.length,_e(this.rows.map((t=>xe(t.name,e("times",{n:t.n}))))),e("h_all_good")):n`<sn-skeleton></sn-skeleton>`}};function $e(e,t){const s=e.hass.entities?.[t]?.platform??"";return["zha","zigbee2mqtt","deconz"].includes(s)?"x_zigbee":"mqtt"===s?"x_mqtt":["zwave_js"].includes(s)?"x_zwave":["tuya","ewelink","sonoff","smartthings","google_assistant","alexa","xiaomi_miot","roborock"].includes(s)?"x_cloud":["esphome","shelly","tasmota","wled","tplink","fully_kiosk"].includes(s)?"x_wifi":"x_generic"}ye([s({attribute:!1})],fe.prototype,"ctx",2),ye([t()],fe.prototype,"rows",2),fe=ye([i("sn-faults")],fe);let be=class extends a{constructor(){super(...arguments),this.offline=[],this.low=[],this.busy=!1}createRenderRoot(){return this}render(){const{ctx:e}=this,{t:t,hass:s,config:i}=e;if(!this.offline.length&&!this.low.length)return c;const a=[...this.offline.map((a=>[l(s,i,a.entity_id),t($e(e,a.entity_id))])),...this.low.map((e=>[l(s,i,e.entity_id),t("x_battery")]))];return n`<section style="display:grid;gap:8px;padding:14px 16px;border-radius:var(--r-md);background:var(--surface-2)">
      <div style="display:flex;align-items:center;gap:8px;font-weight:700">
        <sn-icon icon="wrench" style="--icon-size:20px;color:var(--accent-text)"></sn-icon>${t("x_title")}
      </div>
      <div style="display:grid;gap:6px;font-size:14px">
        ${a.map((([e,t])=>n`<div><b>${e}</b> <span class="muted">· ${t}</span></div>`))}
      </div>
      ${this.ai?n`<div style="white-space:pre-line;font-size:14px;unicode-bidi:plaintext;border-top:1px solid var(--line, var(--surface-3));padding-top:8px">✨ ${this.ai}</div>`:c}
      ${k(s)&&e.allows("ai_explain")&&!this.ai?n`<button
            class="btn pressable"
            style="justify-self:start"
            ?disabled=${this.busy}
            @click=${async()=>{this.busy=!0;const a=[...this.offline.map((e=>`${l(s,i,e.entity_id)} (${e.entity_id}, ${s.entities?.[e.entity_id]?.platform??"?"}) unavailable since ${e.last_changed}`)),...this.low.map((e=>`${l(s,i,e.entity_id)} battery ${e.state}`))];this.ai=await z(e,"explain",{facts:a})??t("as_error"),this.busy=!1}}
          >
            ✨ ${this.busy?t("ai_looking"):t("x_ai")}
          </button>`:c}
    </section>`}};ye([s({attribute:!1})],be.prototype,"ctx",2),ye([s({attribute:!1})],be.prototype,"offline",2),ye([s({attribute:!1})],be.prototype,"low",2),ye([t()],be.prototype,"ai",2),ye([t()],be.prototype,"busy",2),be=ye([i("sn-explain")],be);const ve=(e,t,s,i,a=!1)=>n`<section
  style="display:grid;gap:8px;padding:14px 16px;border-radius:var(--r-md);background:var(--surface-2)"
>
  <div style="display:flex;align-items:center;gap:8px;font-weight:700">
    <sn-icon icon=${t?"check-circle":"alert-circle-outline"} style="--icon-size:20px;color:${t?"var(--success)":"var(--alert-text)"}"></sn-icon>
    ${e}
  </div>
  ${t&&!a?n`<span class="muted" style="font-size:14px">${i}</span>`:s}
</section>`,_e=e=>n`<div style="display:grid;gap:4px;font-size:14px">${e}</div>`,xe=(e,t)=>n`<div style="display:flex;justify-content:space-between;gap:12px"><span>${e}</span><span class="muted" style="unicode-bidi:plaintext">${t}</span></div>`,we=(e,t)=>e.find((e=>e.entity_id.startsWith("sensor.")&&t.test(e.entity_id)));var ke=Object.defineProperty,ze=Object.getOwnPropertyDescriptor,Se=(e,t,s,i)=>{for(var a,n=i>1?void 0:i?ze(t,s):t,l=e.length-1;l>=0;l--)(a=e[l])&&(n=(i?a(t,s,n):a(n))||n);return i&&n&&ke(t,s,n),n};const je={apartment:{perArea:!1,off:["garden","car","pets","water"],on:["media"]},villa:{perArea:!0,off:["pets"],on:["garden","car","water","doorbell","security"]},office:{perArea:!0,off:["media","garden","car","pets","robot"],on:["security","doorbell","power","climate"]}};function Ne(e){const t=e.toLowerCase();return/نوم|bed|שינה|ولاد|kids|ילדים/.test(t)?"bed":/مطبخ|kitchen|מטבח/.test(t)?"kitchen":/حمام|bath|shower|מקלחת|אמבט/.test(t)?"shower":/جنين|حديق|garden|yard|גינה|حوش|ساح/.test(t)?"garden":/كراج|garage|חניה|موقف/.test(t)?"garage":/مكتب|office|study|משרד/.test(t)?"desk":/غسيل|laundry|כביסה/.test(t)?"laundry":"sofa"}function Oe(e,t){const s=[M("room",{area:t.areaId},{x:0,y:0,w:12,h:5})];let i=0,a=5;const n=t.ids.filter((e=>"camera"!==h(e)));for(const l of n)i+3>12&&(i=0,a+=2),s.push(M("tile",{entity:l},{x:i,y:a,w:3,h:2})),i+=3;return a+=n.length?2:0,t.ids.filter((e=>"camera"===h(e))).forEach(((e,t)=>s.push(M("camera",{entity:e},{x:t%2*6,y:a+5*Math.floor(t/2),w:6,h:5})))),e.allows("w_room")||s.shift(),{id:g(),title:t.name??e.t("other_devices"),icon:Ne(t.name??""),widgets:s}}function De(e,t){const{hass:s,config:i,t:a}=e,n=[],l=(e,t,s=!0)=>{const i=t.widgets.reduce(((e,t)=>e+(t.config.entity?1:0)+("floorplan"===t.type||"hero"===t.type||"energy"===t.type||"water"===t.type?1:0)),0);(i||"home"===e)&&n.push({key:e,page:t,devices:i,on:s})},o=e=>D(e,s,i,a),r="pro"===i.settings.style&&e.allows("bento"),c=i.pages.some((e=>e.widgets.some((e=>"floorplan"===e.type&&e.config.floors?.some((e=>e.image))))));if(l("home",o(r&&!c?"bento":"home")),r&&c&&l("bento",o("bento")),t)for(const p of N(s).filter((e=>e.areaId&&e.ids.length)))l(`area-${p.areaId}`,Oe(e,p));else l("rooms",o("rooms"));for(const p of["climate","power","security","doorbell","water","robot"])O.some((e=>e.id===p))&&l(p,o(p));l("media",function(e){const{hass:t}=e,s=Object.keys(t.states).filter((e=>e.startsWith("media_player.")&&"fully_kiosk"!==t.entities?.[e]?.platform&&!t.entities?.[e]?.entity_category)),i=Object.keys(t.states).filter((e=>e.startsWith("remote."))),a=[];s.slice(0,6).forEach(((e,t)=>a.push(M("media",{entity:e},{x:t%2*6,y:5*Math.floor(t/2),w:6,h:5}))));const n=5*Math.ceil(Math.min(s.length,6)/2);return i.slice(0,3).forEach(((e,t)=>a.push(M("remote",{entity:e},{x:4*t,y:n,w:4,h:8})))),{id:g(),title:e.t("template_media"),icon:"speaker",widgets:a}}(e));for(const p of["car","garden","pets"])l(p,o(p),!1);return n}let Me=class extends a{constructor(){super(...arguments),this.perArea=!1,this.replace=!0,this.list=[]}connectedCallback(){super.connectedCallback(),this.refresh()}refresh(e=!1){const t=new Map(this.list.map((e=>[e.key,e.on]))),s=this.kind?je[this.kind]:void 0;this.list=De(this.ctx,this.perArea).map((i=>{const a=!!s?.on.includes(i.key)||!s?.off.includes(i.key)&&void 0;return{...i,on:e?a??i.on:t.get(i.key)??a??i.on}}))}build(){const{ctx:e}=this,t=this.list.filter((e=>e.on)).map((e=>e.page));t.length&&(e.update((e=>{const s=e.pages.flatMap((e=>e.widgets)).find((e=>"floorplan"===e.type)),i=s?.config.floors?.some((e=>e.image))?s.config.floors:void 0;if(i){const e=t.flatMap((e=>e.widgets)).find((e=>"floorplan"===e.type));e&&(e.config.floors=i)}e.pages=this.replace?t:[...e.pages,...t],e.settings.default_page=e.pages[0].id})),e.toast(e.t("ab_done",{n:t.length})),e.closeSheet())}render(){const{t:e}=this.ctx,t=this.list.filter((e=>e.on));return n`<p class="hint">${e("ab_hint")}</p>
      <div class="opt">
        <span>${e("ab_kind")}</span>
        <div class="seg">
          ${["apartment","villa","office"].map((t=>n`<button
              aria-pressed=${this.kind===t}
              @click=${()=>{this.kind=t,this.perArea=je[t].perArea,this.refresh(!0)}}
            >
              ${e(`ab_${t}`)}
            </button>`))}
        </div>
      </div>
      <div class="opt">
        <span>${e("ab_per_area")}</span>
        <div class="seg">
          ${[!1,!0].map((t=>n`<button
              aria-pressed=${this.perArea===t}
              @click=${()=>{this.perArea=t,this.refresh()}}
            >
              ${e(t?"ab_area_pages":"ab_one_rooms")}
            </button>`))}
        </div>
      </div>
      <div class="pages">
        ${this.list.map((t=>n`<div
            class="p ${t.on?"":"off"}"
            role="checkbox"
            aria-checked=${t.on}
            tabindex="0"
            @click=${()=>this.list=this.list.map((e=>e.key===t.key?{...e,on:!e.on}:e))}
          >
            <span class="ic"><sn-icon .icon=${t.page.icon}></sn-icon></span>
            <b>${t.page.title}</b>
            <span>${"home"===t.key?e("ab_home"):e("ab_devices",{n:t.devices})}</span>
            <span class="check">${t.on?n`<sn-icon icon="check"></sn-icon>`:c}</span>
          </div>`))}
      </div>
      <div class="opt">
        <span>${e("ab_mode")}</span>
        <div class="seg">
          ${[!0,!1].map((t=>n`<button aria-pressed=${this.replace===t} @click=${()=>this.replace=t}>${e(t?"ab_replace":"ab_add")}</button>`))}
        </div>
      </div>
      <button class="btn primary pressable go" ?disabled=${!t.length} @click=${()=>this.build()}>
        <sn-icon icon="auto-fix" style="--icon-size:22px"></sn-icon>${e("ab_go",{n:t.length})}
      </button>`}};Me.styles=[S,j`
      :host {
        display: grid;
        gap: 14px;
      }
      .hint {
        margin: 0;
        color: var(--text-2);
        font-size: 14px;
      }
      .pages {
        display: grid;
        gap: 8px;
      }
      .p {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 12px;
        border-radius: var(--r-md);
        background: var(--surface-2);
        cursor: pointer;
        transition: opacity 200ms;
      }
      .p.off {
        opacity: 0.5;
      }
      .p .ic {
        width: 40px;
        height: 40px;
        border-radius: 12px;
        display: grid;
        place-items: center;
        background: var(--accent);
        color: var(--on-accent);
        --icon-size: 22px;
        flex: none;
      }
      .p.off .ic {
        background: var(--surface-solid);
        color: var(--text-2);
      }
      .p b {
        flex: 1;
      }
      .p span {
        font-size: 13px;
        color: var(--text-2);
      }
      .check {
        width: 26px;
        height: 26px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        border: 2px solid var(--border);
        --icon-size: 16px;
      }
      .p:not(.off) .check {
        background: var(--success);
        border-color: var(--success);
        color: #fff;
      }
      .opt {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
      }
      .go {
        min-height: 56px;
        font-size: 17px;
      }
    `],Se([s({attribute:!1})],Me.prototype,"ctx",2),Se([t()],Me.prototype,"perArea",2),Se([t()],Me.prototype,"kind",2),Se([t()],Me.prototype,"replace",2),Se([t()],Me.prototype,"list",2),Me=Se([i("sn-autobuild")],Me);var Ce=Object.defineProperty,We=Object.getOwnPropertyDescriptor,Ie=(e,t,s,i)=>{for(var a,n=i>1?void 0:i?We(t,s):t,l=e.length-1;l>=0;l--)(a=e[l])&&(n=(i?a(t,s,n):a(n))||n);return i&&n&&Ce(t,s,n),n};const qe=(...e)=>n`<div style="display:grid;gap:18px">${e}</div>`,Ae=(...e)=>n`<div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">${e}</div>`,Pe=(e,...t)=>n`<section style="display:grid;gap:12px;padding-top:6px">
    <h3 style="margin:0;font-size:13px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--text-2)">${e}</h3>
    ${t}
  </section>`;function Be(e,t,s,i,a,o=!1){const r=s?e.hass.states[s]:void 0;return n`<div class="field">
    ${t}
    <div style="display:flex;gap:8px">
      <button
        class="btn pressable"
        style="flex:1;justify-content:flex-start;border-radius:var(--r-sm)"
        @click=${()=>e.showSheet({still:!0,title:t,render:e=>n`<sn-entity-picker
              .ctx=${e}
              .filter=${i}
              .onPick=${t=>{a(t),e.closeSheet()}}
            ></sn-entity-picker>`})}
      >
        ${s?n`<sn-icon .icon=${A(r,s)} style="--icon-size:20px"></sn-icon>${l(e.hass,e.config,s)}`:n`<span class="muted">${e.t(o?"none":"choose_entity")}</span>`}
      </button>
      ${o&&s?n`<button class="icon-btn pressable" aria-label=${e.t("delete")} @click=${()=>a(void 0)}>
            <sn-icon icon="close" style="--icon-size:18px"></sn-icon>
          </button>`:c}
    </div>
  </div>`}function Te(e,t,s,i,a,o="auto_all"){const r=s??[];return n`<div class="field">
    ${t}
    <div style="display:flex;gap:6px;flex-wrap:wrap">
      ${r.map((t=>n`<button class="btn pressable" style="min-height:36px;font-size:14px" @click=${()=>a(r.length>1?r.filter((e=>e!==t)):void 0)}>
          ${l(e.hass,e.config,t)}<sn-icon icon="close" style="--icon-size:14px"></sn-icon>
        </button>`))}
      <button
        class="btn primary pressable"
        style="min-height:36px;font-size:14px"
        @click=${()=>e.showSheet({still:!0,title:t,render:e=>n`<sn-entity-picker
              .ctx=${e}
              .filter=${i}
              .onPick=${t=>{r.includes(t)||a([...r,t]),e.closeSheet()}}
            ></sn-entity-picker>`})}
      >
        <sn-icon icon="plus" style="--icon-size:16px"></sn-icon>${e.t("add")}
      </button>
    </div>
    ${r.length?c:n`<span class="hint">${e.t(o)}</span>`}
  </div>`}function Re(e,t,s){return n`<label class="field"
    >${e.t("widget_title")}
    <input type="text" .value=${s??""} @change=${s=>Le(e,t,(e=>e.config.title=s.target.value.trim()||void 0))} />
  </label>`}function Fe(e,t){return n`<label class="field"
    >${e.t("display_name")}
    <input
      type="text"
      .value=${e.config.names[t]??""}
      placeholder=${e.hass.states[t]?.attributes.friendly_name??t}
      @change=${s=>e.update((e=>{const i=s.target.value.trim();i?e.names[t]=i:delete e.names[t]}))}
    />
    <span class="hint">${e.t("display_name_hint")}</span>
  </label>`}const Ee={camera:{domains:["camera"]},vacuum:{domains:["vacuum"]},todo:{domains:["todo"]},gauge:{domains:["sensor"]},gate:{domains:["cover"]},media:{domains:["media_player"]},remote:{domains:["remote","media_player"]}};function Le(e,t,s){e.update((e=>{const i=Y(e,t);i&&s(i,e)}))}function Ue(e,t,s){e.showSheet({still:!0,title:e.t("widget_settings"),render:e=>{const t=Y(e.config,s);return t?qe(function(e,t,s){const i=e.t;switch(t.type){case"camera":return qe(Be(e,i("entity"),t.config.entity,{domains:["camera"]},(t=>Le(e,s,(e=>e.config.entity=t)))),t.config.entity?Fe(e,t.config.entity):c,n`<div class="field">
              ${i("camera_mode")}
              <div class="seg">
                ${["auto","live","still"].map((a=>n`<button
                    aria-pressed=${(void 0===t.config.live?"auto":t.config.live?"live":"still")===a}
                    @click=${()=>Le(e,s,(e=>"auto"===a?delete e.config.live:e.config.live="live"===a))}
                  >
                    ${i(`camera_${a}`)}
                  </button>`))}
              </div>
              <span class="hint">${i("camera_mode_hint")}</span>
            </div>`);case"tile":case"vacuum":case"media":case"remote":return qe(Be(e,i("entity"),t.config.entity,Ee[t.type]??{},(t=>Le(e,s,(e=>e.config.entity=t)))),t.config.entity?Fe(e,t.config.entity):c);case"gauge":return qe(Be(e,i("entity"),t.config.entity,{domains:["sensor"]},(t=>Le(e,s,(e=>e.config.entity=t)))),n`<div class="row" style="display:flex;gap:8px">
              ${["min","max","low"].map((a=>n`<label class="field" style="flex:1"
                  >${"low"===a?i("gauge_low")+" %":a}
                  <input type="number" .value=${String(t.config[a]??("max"===a?100:"low"===a?20:0))} @change=${t=>Le(e,s,(e=>e.config[a]=Number(t.target.value)))} />
                </label>`))}
            </div>`,e.allows("refill")?n`<label class="field"
                  >${i("refill_phone")}
                  <input type="tel" class="ltr" placeholder="972501234567" .value=${t.config.supplier??""} @change=${t=>Le(e,s,(e=>e.config.supplier=t.target.value.trim()||void 0))} />
                  <span class="hint">${i("refill_hint")}</span>
                </label>`:c);case"gate":return qe(Be(e,i("widget_gate"),t.config.entity,{domains:["cover"]},(t=>Le(e,s,(e=>e.config.entity=t)))),Be(e,i("widget_camera"),t.config.camera,{domains:["camera"]},(t=>Le(e,s,(e=>e.config.camera=t))),!0));case"frigate":return n`<label class="field"
            >Frigate instance ID
            <input type="text" class="ltr" .value=${t.config.instance??"frigate"} @change=${t=>Le(e,s,(e=>e.config.instance=t.target.value.trim()||"frigate"))} />
          </label>`;case"todo":return Be(e,i("widget_todo"),t.config.entity,{domains:["todo"]},(t=>Le(e,s,(e=>e.config.entity=t))));case"calendar":{const i=Object.keys(e.hass.states).filter((e=>e.startsWith("calendar."))),a=t.config.entities??[];return n`<div style="display:grid;gap:8px">
            ${i.map((t=>{const o=!a.length||a.includes(t);return n`<button
                class="btn pressable ${o?"primary":""}"
                style="justify-content:flex-start;font-weight:500"
                @click=${()=>Le(e,s,(e=>{const s=e.config.entities?.length?e.config.entities:[...i];e.config.entities=o?s.filter((e=>e!==t)):[...s,t]}))}
              >
                <sn-icon icon=${o?"check":"close"} style="--icon-size:18px"></sn-icon>${l(e.hass,e.config,t)}
              </button>`}))}
          </div>`}case"countdown":{const a=t.config.events??[];return qe(n`<div class="field">${i("next_ramadan")} / ${i("next_eid")} ${Qe(e,t.config.islamic??"ar"===e.lang,(t=>Le(e,s,(e=>e.config.islamic=t))))}</div>`,...a.map(((t,a)=>n`<div style="display:flex;gap:8px;align-items:center">
                <span style="flex:1">${t.title}</span><span class="muted ltr">${t.date}</span>
                <button class="icon-btn small pressable" aria-label=${i("delete")} @click=${()=>Le(e,s,(e=>e.config.events.splice(a,1)))}>
                  <sn-icon icon="close" style="--icon-size:16px"></sn-icon>
                </button>
              </div>`)),n`<form
              style="display:grid;gap:8px"
              @submit=${t=>{t.preventDefault();const i=t.currentTarget,a=i.elements.namedItem("title").value.trim(),n=i.elements.namedItem("date").value;a&&n&&(Le(e,s,(e=>e.config.events=[...e.config.events??[],{title:a,date:n}])),i.reset())}}
            >
              <input name="title" type="text" placeholder=${i("event_title")} />
              <input name="date" type="date" />
              <button class="btn primary pressable" type="submit" style="justify-self:start">${i("add_event")}</button>
            </form>`)}case"energy_stats":{const a=le(e.hass),l=(n,l)=>Be(e,i(l),t.config[n]??a[n],{domains:["sensor"],deviceClasses:["energy"]},(t=>Le(e,s,(e=>e.config[n]=t))),!0);return qe(l("total","e_total_energy"),l("solar","e_solar_energy"),n`<label class="field"
              >${i("tariff")}
              <input type="number" step="0.01" min="0" .value=${String(t.config.tariff??.6)} @change=${t=>Le(e,s,(e=>e.config.tariff=Number(t.target.value)||0))} />
            </label>`,n`<label class="field"
              >${i("bill_budget")}
              <input type="number" min="0" .value=${String(t.config.budget??"")} placeholder="–" @change=${t=>Le(e,s,(e=>e.config.budget=Number(t.target.value)||void 0))} />
            </label>`,n`<label class="field"
              >${i("currency")}
              <input type="text" maxlength="4" .value=${t.config.currency??"₪"} @change=${t=>Le(e,s,(e=>e.config.currency=t.target.value.trim()||"₪"))} />
            </label>`)}case"energy":{const a=ne(e.hass),l=(n,l,o)=>Be(e,i(l),t.config[n]??a[n],{domains:["sensor"],deviceClasses:o},(t=>Le(e,s,(e=>e.config[n]=t))),!0),o=a=>n`<div class="field">${i("e_flip")} ${Qe(e,!!t.config[a],(t=>Le(e,s,(e=>e.config[a]=t))))}</div>`;return qe(l("solar","e_solar_entity",["power"]),l("grid","e_grid_entity",["power"]),o("flip_grid"),l("battery","e_battery_entity",["power"]),o("flip_battery"),l("soc","e_soc_entity",["battery"]),l("home","e_home_entity",["power"]))}case"room":{const a=Object.values(e.hass.areas??{});return qe(n`<label class="field"
              >${i("room_area")}
              <select @change=${t=>Le(e,s,(e=>e.config.area=t.target.value||void 0))}>
                <option value="">–</option>
                ${a.map((e=>n`<option value=${e.area_id} ?selected=${t.config.area===e.area_id}>${e.name}</option>`))}
              </select>
            </label>`,n`<label class="field">${i("room_name")}<input type="text" .value=${t.config.name??""} @change=${t=>Le(e,s,(e=>e.config.name=t.target.value.trim()||void 0))} /></label>`,n`<label class="field"
              >${i("room_photo")}
              <input
                type="file"
                accept="image/*"
                @change=${async t=>{const a=t.target.files?.[0];if(a)try{const t=await d(e.hass,a);Le(e,s,(e=>e.config.photo=t))}catch{e.toast(i("error"))}}}
              />
            </label>`)}case"water":{const a=ae(e.hass),n=(n,l,o)=>Be(e,i(l),t.config[n]??a[n],o,(t=>Le(e,s,(e=>e.config[n]=t))),!0);return qe(n("usage","water_usage",{domains:["sensor"],deviceClasses:["water"]}),n("tank","water_tank",{domains:["sensor"]}),n("valve","water_valve",{domains:["valve","switch"]}))}case"ac":return Be(e,i("entity"),t.config.entity,{domains:["climate"]},(t=>Le(e,s,(e=>e.config.entity=t))));case"sensor":return qe(Be(e,i("entity"),t.config.entity,{domains:["sensor"]},(t=>Le(e,s,(e=>e.config.entity=t)))),t.config.entity?Fe(e,t.config.entity):c);case"batteries":return n`<label class="field"
            >${i("bat_low_at")}
            <input type="number" min="5" max="60" .value=${String(t.config.low??20)} @change=${t=>Le(e,s,(e=>e.config.low=Number(t.target.value)||20))} />
          </label>`;case"folder":return qe(Re(e,s,t.config.title),Te(e,i("widget_folder"),t.config.entities,{domains:["light","switch","fan","cover","climate","lock","media_player","input_boolean","scene","script"]},(t=>Le(e,s,(e=>e.config.entities=t)))));case"scenes":return qe(Re(e,s,t.config.title),Te(e,i("widget_scenes"),t.config.entities,{domains:["scene","script"]},(t=>Le(e,s,(e=>e.config.entities=t)))));case"lights":case"covers":{const a=Object.values(e.hass.areas??{});return qe(Re(e,s,t.config.title),n`<label class="field"
              >${i("room_area")}
              <select @change=${t=>Le(e,s,(e=>e.config.area=t.target.value||void 0))}>
                <option value="">${i("area_all")}</option>
                ${a.map((e=>n`<option value=${e.area_id} ?selected=${t.config.area===e.area_id}>${e.name}</option>`))}
              </select>
            </label>`,Te(e,i("lights"===t.type?"widget_lights":"widget_covers"),t.config.entities,{domains:["lights"===t.type?"light":"cover"]},(t=>Le(e,s,(e=>e.config.entities=t)))))}case"boiler":return Be(e,i("boiler_pick"),t.config.entity,{domains:["switch","water_heater","input_boolean","light"]},(t=>Le(e,s,(e=>e.config.entity=t))));case"irrigation":return Be(e,i("widget_irrigation"),t.config.entity,{domains:["valve","switch","input_boolean"]},(t=>Le(e,s,(e=>e.config.entity=t))));case"air":return qe(Be(e,i("air_purifier"),t.config.purifier,{domains:["fan","humidifier","switch","climate"]},(t=>Le(e,s,(e=>e.config.purifier=t))),!0),Te(e,i("air_sensors"),t.config.entities,{domains:["sensor"]},(t=>Le(e,s,(e=>e.config.entities=t)))));case"commute":return Te(e,i("widget_commute"),t.config.entities,{domains:["sensor"]},(t=>Le(e,s,(e=>e.config.entities=t))));case"timeline":return Be(e,i("widget_camera"),t.config.camera,{domains:["camera"]},(t=>Le(e,s,(e=>e.config.camera=t))),!0);case"heading":return n`<label class="field"
            >${i("heading_text")}
            <input type="text" .value=${t.config.text??""} @change=${t=>Le(e,s,(e=>e.config.text=t.target.value))} />
          </label>`;case"floorplan":return qe(n`<div class="field">
              ${i("plan_in_dark")}
              <div class="seg">
                ${[!1,!0].map((a=>n`<button aria-pressed=${!!t.config.invert_dark===a} @click=${()=>Le(e,s,(e=>e.config.invert_dark=a))}>
                    ${i(a?"plan_invert":"plan_original")}
                  </button>`))}
              </div>
            </div>`,e.allows("sun_on_plan")?n`<label class="field"
                  >${i("plan_north")}
                  <input type="number" min="0" max="359" step="5" .value=${String(t.config.north??0)} @change=${t=>Le(e,s,(e=>e.config.north=(Number(t.target.value)||0)%360))} />
                  <span class="hint">${i("plan_north_hint")}</span>
                </label>`:c,n`<p class="muted" style="margin:0;font-size:14px">${i("drag_hint")}</p>`);default:return n`<p class="muted">${i(`widget_${t.type}`)}</p>`}}(e,t,s),"floorplan"===t.type?c:function(e,t){const s=e.t,i=e.config.pages.find((e=>e.widgets.some((e=>e.id===t.id)))),a=e=>e.widgets.find((e=>"room"===e.type&&e.config.area))?.config.area,l=t=>Object.values(e.hass.areas??{}).find((e=>e.name.trim()===t.trim()))?.area_id,o=(i?.widgets??[]).filter((e=>"heading"===e.type&&e.config.text)).sort(((e,t)=>e.y-t.y)),r=[...o].reverse().find((e=>e.y<t.y)),p=async s=>{const i=t.config.entity;s&&i&&e.hass.entities?.[i]&&(e.hass.entities[i].area_id??void 0)!==s&&await e.hass.callWS({type:"config/entity_registry/update",entity_id:i,area_id:s}).catch((()=>{}))};return n`<label class="field"
    >${s("move_room")}
    <select
      @change=${async n=>{const[c,d]=String(n.target.value).split(":");if("h"===c){const i=o.find((e=>e.id===d));if(!i||i.id===r?.id)return;return e.update((e=>{const s=e.pages.find((e=>e.widgets.some((e=>e.id===t.id)))),i=s?.widgets.find((e=>e.id===t.id));s&&i&&(s.widgets=function(e,t,s){const i=ee(e.filter((e=>e.id!==t.id))).map((e=>({...e}))),a=i.filter((e=>"heading"===e.type)).sort(((e,t)=>e.y-t.y)),n=a.find((e=>e.id===s));if(!n)return e;const l=a.find((e=>e.y>n.y)),o=i.filter((e=>"heading"!==e.type&&e.y>n.y&&(!l||e.y<l.y))),r=(e,s)=>e+t.w<=12&&!i.some((i=>e<i.x+i.w&&i.x<e+t.w&&s<i.y+i.h&&i.y<s+t.h));if(o.length){const e=Math.max(...o.map((e=>e.y)));for(let s=0;s+t.w<=12;s++)if(r(s,e))return ee([...i,{...t,x:s,y:e}],t.id)}const c=o.length?Math.max(...o.map((e=>e.y+e.h))):n.y+n.h;for(const p of i)p.y>=c&&(p.y+=t.h);return ee([...i,{...t,x:0,y:c}],t.id)}(s.widgets,i,d))})),await p(l(i.config.text)),e.toast(s("moved_to",{page:i.config.text})),e.closeSheet()}const g=e.config.pages.find((e=>e.id===d));g&&g.id!==i?.id&&(e.update((e=>{const s=e.pages.find((e=>e.widgets.some((e=>e.id===t.id)))),i=e.pages.find((e=>e.id===g.id)),a=s?.widgets.find((e=>e.id===t.id));if(!s||!i||!a)return;s.widgets=ee(s.widgets.filter((e=>e.id!==t.id)));const n=i.widgets.reduce(((e,t)=>Math.max(e,t.y+t.h)),0);i.widgets=ee([...i.widgets,{...a,x:0,y:n}])})),await p(a(g)),e.toast(s("moved_to",{page:g.title})),e.closeSheet())}}
    >
      ${o.length?n`<optgroup label=${s("move_this_page")}>
            ${o.map((e=>n`<option value=${`h:${e.id}`} ?selected=${e.id===r?.id}>${e.config.text}</option>`))}
          </optgroup>`:c}
      <optgroup label=${s("move_other_page")}>
        ${e.config.pages.map((e=>n`<option value=${`p:${e.id}`} ?selected=${!o.length&&e.id===i?.id}>${e.title}</option>`))}
      </optgroup>
    </select>
    <span class="hint">${s("move_room_hint")}</span>
  </label>`}(e,t)):n``}})}const He=[{type:"tile",icon:"lightbulb"},{type:"floorplan",icon:"layers"},{type:"camera",icon:"cctv"},{type:"modes",icon:"leave"},{type:"vacuum",icon:"robot-vacuum"},{type:"visitors",icon:"doorbell"},{type:"energy",icon:"solar"},{type:"energy_stats",icon:"lightning-bolt"},{type:"check",icon:"night"},{type:"panic",icon:"alert-circle-outline"},{type:"family",icon:"family"},{type:"todo",icon:"todo"},{type:"calendar",icon:"calendar"},{type:"forecast",icon:"w-partlycloudy"},{type:"countdown",icon:"countdown"},{type:"gauge",icon:"gas"},{type:"gate",icon:"gate"},{type:"frigate",icon:"cctv"},{type:"schedule",icon:"schedule"},{type:"media",icon:"speaker"},{type:"remote",icon:"television"},{type:"consumers",icon:"lightning-bolt"},{type:"water",icon:"water"},{type:"wake",icon:"weather-sunset-up"},{type:"chores",icon:"star"},{type:"air",icon:"leaf"},{type:"boiler",icon:"water-boiler"},{type:"irrigation",icon:"sprinkler"},{type:"timeline",icon:"history"},{type:"internet",icon:"wifi"},{type:"board",icon:"note"},{type:"verse",icon:"book-open-variant"},{type:"radar",icon:"weather-pouring"},{type:"commute",icon:"car"},{type:"parcels",icon:"package"},{type:"hero",icon:"home"},{type:"stack",icon:"layers"},{type:"room",icon:"sofa"},{type:"ac",icon:"air-conditioner"},{type:"scenes",icon:"palette"},{type:"sensor",icon:"chart-line"},{type:"batteries",icon:"battery"},{type:"lights",icon:"lightbulb-group"},{type:"covers",icon:"blinds"},{type:"prayer",icon:"mosque"},{type:"folder",icon:"folder"},{type:"clock",icon:"clock-outline"},{type:"heading",icon:"title"}],Je=["clock","hero","verse","forecast","consumers","energy_stats","energy","air","water","board","commute","modes","family","countdown"];function Ve(e,t){const s=(e,s,i)=>{let a="";return e.update((e=>{const n=e.pages.find((e=>e.id===t));if(!n)return;const l=M(s,i,{y:Z(n.widgets)});a=l.id,n.widgets=ee([...n.widgets,l])})),a};e.showSheet({still:!0,title:e.t("add_widget"),render:e=>n`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px">
      ${He.map((t=>e.allows(C(t.type))?n`<button
          class="glass pressable"
          style="display:grid;gap:10px;justify-items:center;padding:20px 12px;border-radius:var(--r-md);font-weight:500"
          @click=${()=>{if(["tile","camera","vacuum","gauge","gate","media","remote"].includes(t.type))return void e.showSheet({still:!0,title:e.t("choose_entity"),render:e=>n`<sn-entity-picker
                  .ctx=${e}
                  .filter=${Ee[t.type]??{}}
                  .onPick=${i=>{s(e,t.type,{entity:i}),e.closeSheet(),e.closeSheet()}}
                ></sn-entity-picker>`});const i="floorplan"===t.type?{floors:[I(e.t("floor_default"))]}:"heading"===t.type?{text:""}:{},a=s(e,t.type,i);e.closeSheet(),"heading"===t.type&&Ue(e,0,a)}}
        >
          ${Je.includes(t.type)&&e.allows("live_gallery")?function(e,t){const s=W[t],i=Math.min(560,60*s.w),a=Math.min(420,56*s.h),l=Math.min(150/i,96/a),o=te(`sn-w-${t.replace(/_/g,"-")}`),r={id:`preview-${t}`,type:t,x:0,y:0,w:s.w,h:s.h,config:{}};return n`<span style="position:relative;display:block;width:${i*l}px;height:${a*l}px;pointer-events:none;border-radius:14px;overflow:hidden" aria-hidden="true">
    <span style="position:absolute;top:0;left:0;width:${i}px;height:${a}px;transform:scale(${l});transform-origin:0 0;direction:${e.rtl?"rtl":"ltr"}">
      ${se`<${o} .ctx=${e} .widget=${r}></${o}>`}
    </span>
  </span>`}(e,t.type):n`<span style="display:grid;place-items:center;width:52px;height:52px;border-radius:999px;background:var(--accent);color:var(--on-accent)">
                <sn-icon .icon=${t.icon}></sn-icon>
              </span>`}
          ${e.t(`widget_${t.type}`)}
          <span class="muted ltr" style="font-size:12px">${W[t.type].w}×${W[t.type].h}</span>
        </button>`:n`<div
          class="glass"
          style="display:grid;gap:10px;justify-items:center;padding:20px 12px;border-radius:var(--r-md);font-weight:500;opacity:.55"
          title=${e.t("plan_needed",{plan:e.t(`plan_${q(C(t.type))}`)})}
        >
          <span style="display:grid;place-items:center;width:52px;height:52px;border-radius:999px;background:var(--surface-2)"><sn-icon icon="lock"></sn-icon></span>
          ${e.t(`widget_${t.type}`)}
          <span style="font-size:12px;color:var(--accent-text)">${e.t("plan_needed",{plan:e.t(`plan_${q(C(t.type))}`)})}</span>
        </div>`))}
    </div>`})}function Ge(e,t){e.showSheet({still:!0,title:e.t("add_page"),render:e=>Pe(e.t("choose_template"),n`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px">
        ${O.map((s=>n`<button
            class="glass pressable"
            style="display:grid;gap:10px;justify-items:center;padding:20px 12px;border-radius:var(--r-md);font-weight:500"
            @click=${()=>{const i=D(s.id,e.hass,e.config,e.t);e.update((e=>e.pages.push(i))),e.closeSheet(),t(i.id)}}
          >
            <span style="display:grid;place-items:center;width:52px;height:52px;border-radius:999px;background:var(--surface-2)">
              <sn-icon .icon=${s.icon}></sn-icon>
            </span>
            ${e.t(s.label)}
          </button>`))}
      </div>`)})}function Ke(e,t,s){const i=(e,s)=>e.update((e=>{const i=e.pages.findIndex((e=>e.id===t));i>=0&&s(e,i)}));e.showSheet({still:!0,title:e.t("page_settings"),render:e=>{const a=e.config.pages.findIndex((e=>e.id===t)),o=e.config.pages[a];if(!o)return n``;const r=e.t,p=t=>i(e,((e,s)=>{const i=s+t;i<0||i>=e.pages.length||([e.pages[s],e.pages[i]]=[e.pages[i],e.pages[s]])}));return qe(e.allows("page_users")?n`<sn-page-users .ctx=${e} .page=${o} .onChange=${t=>i(e,((e,s)=>t.length?e.pages[s].users=t:delete e.pages[s].users))}></sn-page-users>`:c,n`<label class="field"
          >${r("page_title")}
          <input type="text" .value=${o.title} @change=${t=>i(e,((e,s)=>e.pages[s].title=t.target.value.trim()||o.title))} />
        </label>`,n`<div class="field">
          ${r("page_icon")}
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(48px,1fr));gap:6px">
            ${P.map((t=>n`<button
                class="icon-btn pressable ${o.icon===t?"primary":""}"
                style="width:100%;border-radius:var(--r-sm)"
                aria-pressed=${o.icon===t}
                @click=${()=>i(e,((e,s)=>e.pages[s].icon=t))}
              >
                <sn-icon .icon=${t}></sn-icon>
              </button>`))}
          </div>
        </div>`,e.allows("person_pages")&&Object.keys(e.hass.states).some((e=>e.startsWith("person.")))?n`<label class="field"
              >${r("page_person")}
              <select @change=${t=>i(e,((e,s)=>t.target.value?e.pages[s].person=t.target.value:delete e.pages[s].person))}>
                <option value="" ?selected=${!o.person}>${r("page_person_all")}</option>
                ${Object.keys(e.hass.states).filter((e=>e.startsWith("person."))).map((t=>n`<option value=${t} ?selected=${o.person===t}>${l(e.hass,e.config,t)}</option>`))}
              </select>
              <span class="hint">${r("page_person_hint")}</span>
            </label>`:c,Ae(n`<button class="btn pressable" ?disabled=${0===a} @click=${()=>p(-1)}>${r("move_earlier")}</button>`,n`<button class="btn pressable" ?disabled=${a===e.config.pages.length-1} @click=${()=>p(1)}>${r("move_later")}</button>`,n`<span style="flex:1"></span>`,n`<button
            class="btn danger pressable"
            ?disabled=${e.config.pages.length<=1}
            @click=${()=>{confirm(r("delete_confirm"))&&(i(e,((e,s)=>{e.pages.splice(s,1),e.settings.default_page===t&&(e.settings.default_page=e.pages[0]?.id??"")})),e.closeSheet(),s())}}
          >
            <sn-icon icon="delete" style="--icon-size:20px"></sn-icon>${r("delete")}
          </button>`))}})}function Qe(e,t,s){return n`<div class="seg">
    ${[!0,!1].map((i=>n`<button aria-pressed=${t===i} @click=${()=>s(i)}>${e.t(i?"on":"off")}</button>`))}
  </div>`}function Xe(e,t,s,i,a){return n`<label class="field"
    >${e}
    <input type="number" min=${s} max=${i} .value=${String(t)} @change=${e=>a(Math.min(i,Math.max(s,Number(e.target.value)||0)))} />
  </label>`}const Ye=[U,"#18BCF2","#2FB57A","#F26B68","#A78BFA","#F5BE6A"],Ze=[{id:"schedule",label:"theme_schedule"},{id:"auto",label:"theme_auto"},{id:"light",label:"theme_light"},{id:"dark",label:"theme_dark"},{id:"midnight",label:"theme_midnight"}];function et(t,s){t.showSheet({still:!0,title:t.t("settings"),render:t=>{const i=t.config.settings,a=t.t,o=e=>t.update(e);return qe(t.allows("autobuild")?n`<button class="btn primary pressable" style="min-height:56px;font-size:16px" @click=${()=>(e=>e.showSheet({still:!0,title:e.t("ab_title"),render:e=>n`<sn-autobuild .ctx=${e}></sn-autobuild>`}))(t)}>
              <sn-icon icon="auto-fix" style="--icon-size:22px"></sn-icon>${a("ab_title")}
            </button>`:c,n`<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          <button class="btn pressable" @click=${()=>function(e){e.showSheet({title:e.t("health"),render:e=>{const{hass:t,t:s,config:i}=e,a=Object.values(t.states),o=s("h_all_good"),r=new Set(u(i)),p=a.filter((e=>"unavailable"===e.state&&r.has(e.entity_id))).sort(((e,t)=>e.last_changed.localeCompare(t.last_changed))),d=a.filter((e=>{if("battery"!==e.attributes.device_class)return!1;if("binary_sensor"===h(e.entity_id))return"on"===e.state;const t=Number(e.state);return"sensor"===h(e.entity_id)&&!Number.isNaN(t)&&t<20})).sort(((e,t)=>Number(e.state)-Number(t.state))),g=a.find((e=>/backup_last_successful_automatic_backup$/.test(e.entity_id))),w=g?Date.parse(g.state):NaN,k=Number.isNaN(w)?void 0:Math.floor((Date.now()-w)/864e5),z=a.filter((e=>"update"===h(e.entity_id)&&"on"===e.state)),S=we(a,/disk_use_percent|disk_usage/),j=we(a,/processor_temperature|cpu_temperature/),N=we(a,/memory_use_percent|memory_usage/),O=[S&&xe(s("h_disk"),m(`${y(Number(S.state),e.lang,0)}%`)),j&&xe(s("h_cpu_temp"),m(`${y(Number(j.state),e.lang,0)}°`)),N&&xe(s("h_memory"),m(`${y(Number(N.state),e.lang,0)}%`))].filter(Boolean),D=S&&Number(S.state)>85||j&&Number(j.state)>75,M=[...r].filter((e=>"vacuum"===h(e)&&t.states[e])),C=M.flatMap((e=>{const a=f(t,e);return $.filter((e=>a.parts[e.key])).flatMap((n=>{const o=b(t.states[a.parts[n.key]]);return void 0!==o&&o/n.life<.15?[{robot:l(t,i,e),part:s(n.label),h:o}]:[]}))})),W=v(t).map((e=>{const s=Object.values(t.entities??{}).filter((t=>t.device_id===e.deviceId)),i=e=>e.translation_key??e.entity_id.split(".")[1],a=s.find((e=>e.entity_id.startsWith("sensor.")&&/battery/.test(i(e)))),n=s.find((e=>e.entity_id.startsWith("binary_sensor.")&&/plugged/.test(i(e)))),l=s.find((e=>e.entity_id.startsWith("button.")&&/load_start_url|restart_browser/.test(i(e))));return{tab:e,battery:a&&t.states[a.entity_id],plugged:n&&t.states[n.entity_id],reload:l?.entity_id}}));return n`<div style="display:grid;gap:12px">
        ${ve(s("h_offline"),!p.length,_e(p.map((e=>xe(l(t,i,e.entity_id),_(s,e.last_changed))))),o)}
        ${ve(s("h_battery"),!d.length,_e(d.map((e=>xe(l(t,i,e.entity_id),"sensor"===h(e.entity_id)?m(`${e.state}%`):"!")))),o)}
        ${g?ve(s("h_backup"),void 0!==k&&k<=7,_e([xe(s("h_backup"),void 0===k?"–":s("h_days_ago",{n:k}))]),0===k?s("today"):s("h_days_ago",{n:k??0})):ve(s("h_backup"),!1,n`<span class="muted" style="font-size:14px">${s("h_backup_missing")}</span>`,"")}
        ${ve(s("h_updates"),!z.length,_e(z.map((e=>xe(e.attributes.title??e.attributes.friendly_name??e.entity_id,e.attributes.latest_version??"")))),o)}
        ${O.length?ve(s("h_system"),!D,_e(O),"",!0):c}
        ${M.length?ve(s("h_robot_parts"),!C.length,_e(C.map((t=>xe(`${t.robot} · ${t.part}`,s("hours_left",{n:m(y(t.h,e.lang,0))}))))),o):c}
        ${W.length?n`<section style="display:grid;gap:8px;padding:14px 16px;border-radius:var(--r-md);background:var(--surface-2)">
              <div style="font-weight:700">${s("h_tablets")}</div>
              ${W.map((i=>n`<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
                  <strong style="flex:1">${i.tab.name}</strong>
                  ${i.battery?n`<span class="muted ltr">${i.battery.state}%</span>`:c}
                  ${i.plugged?n`<span class="muted">${s("on"===i.plugged.state?"h_charging":"h_not_charging")}</span>`:c}
                  ${i.reload?n`<button class="btn pressable" @click=${()=>t.callService("button","press",{entity_id:i.reload}).then((()=>e.toast(s("done")))).catch((()=>e.toast(s("error"))))}>
                        ${s("h_reload")}
                      </button>`:c}
                </div>`))}
            </section>`:c}
        ${e.config.settings.maintenance.length?(()=>{const t=x(e.config),i=t.filter((e=>e.days<=7));return ve(s("maintenance"),!i.length,_e(t.sort(((e,t)=>e.days-t.days)).map((e=>xe(e.title,e.days<0?s("m_overdue",{n:-e.days}):s("m_in",{n:e.days}))))),o)})():c}
        <sn-explain .ctx=${e} .offline=${p} .low=${d}></sn-explain>
        ${e.allows("battery_plan")?n`<sn-battery-plan .ctx=${e}></sn-battery-plan>`:c}
        ${e.allows("warranty")?n`<sn-warranty .ctx=${e}></sn-warranty>`:c}
        <sn-faults .ctx=${e}></sn-faults>
        <p class="muted" style="margin:4px 0 0;font-size:13px">${s("h_telegram")}</p>
      </div>`}})}(t)}><sn-icon icon="gauge" style="--icon-size:20px"></sn-icon>${a("health")}</button>
          ${t.allows("automations")?n`<button class="btn pressable" @click=${()=>G(t)}><sn-icon icon="automation" style="--icon-size:20px"></sn-icon>${a("automations")}</button>`:c}
          <button class="btn pressable" @click=${()=>K(t)}><sn-icon icon="key" style="--icon-size:20px"></sn-icon>التراخيص</button>
          ${t.allows("history")?n`<button class="btn pressable" @click=${()=>Q(t)}><sn-icon icon="history" style="--icon-size:20px"></sn-icon>${a("history")}</button>`:c}
          ${t.allows("report")?n`<button class="btn pressable" @click=${()=>X(t,t.assetBase).catch((()=>t.toast(a("error"))))}><sn-icon icon="file-chart" style="--icon-size:20px"></sn-icon>${a("report")}</button>`:c}
        </div>`,n`<label class="field"
          >${a("home_name")}
          <input
            type="text"
            .value=${i.home_name}
            placeholder=${t.hass.config?.location_name??""}
            @change=${e=>o((t=>t.settings.home_name=e.target.value.trim()))}
          />
        </label>`,n`<div class="field">
          ${a("language")}
          <div class="seg">
            ${V.map((e=>n`<button aria-pressed=${i.language===e.id} @click=${()=>o((t=>t.settings.language=e.id))}>${e.label}</button>`))}
          </div>
        </div>`,n`<div class="field">
          ${a("theme")}
          <div class="seg">
            ${Ze.map((e=>n`<button aria-pressed=${i.theme===e.id} @click=${()=>o((t=>t.settings.theme=e.id))}>${a(e.label)}</button>`))}
          </div>
          ${"schedule"===i.theme?Ae(n`<span>${a("dark_from")}</span>`,n`<input type="time" style="width:auto" .value=${i.dark_from} @change=${e=>o((t=>t.settings.dark_from=e.target.value))} />`,n`<span>${a("dark_to")}</span>`,n`<input type="time" style="width:auto" .value=${i.dark_to} @change=${e=>o((t=>t.settings.dark_to=e.target.value))} />`):c}
        </div>`,t.allows("presets")?J(t,o):c,t.allows("style_pro")?n`<div class="field">
              ${a("style")}
              <div class="seg">
                ${["classic","pro"].map((e=>n`<button aria-pressed=${i.style===e} @click=${()=>o((t=>t.settings.style=e))}>${a("pro"===e?"style_pro":"style_classic")}</button>`))}
              </div>
              ${"pro"===i.style?n`<div class="seg" style="margin-top:8px">
                      ${["none","marble","wood","sand","olive"].map((e=>n`<button aria-pressed=${i.material===e} @click=${()=>o((t=>t.settings.material=e))}>${a(`material_${e}`)}</button>`))}
                    </div>
                    <div class="field" style="margin-top:8px">${a("night_midnight")} ${Qe(t,i.night_midnight,(e=>o((t=>t.settings.night_midnight=e))))}</div>
                    ${t.allows("wallpaper")?n`<div class="field" style="margin-top:8px">
                          ${a("wallpaper")}
                          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
                            ${i.wallpaper?n`<img src=${i.wallpaper} alt="" style="width:64px;height:40px;object-fit:cover;border-radius:8px" />`:c}
                            <input
                              type="file"
                              accept="image/*"
                              style="flex:1"
                              @change=${async e=>{const s=e.target.files?.[0];if(s)try{const e=await d(t.hass,s);o((t=>t.settings.wallpaper=e))}catch{t.toast(a("error"))}}}
                            />
                            ${i.wallpaper?n`<button class="btn pressable" @click=${()=>o((e=>delete e.settings.wallpaper))}>${a("delete")}</button>`:c}
                          </div>
                          ${i.wallpaper?n`<label style="display:flex;gap:8px;align-items:center;font-size:14px"
                                  >${a("wallpaper_dim")}
                                  <input type="range" min="0" max="0.8" step="0.05" .value=${String(i.wallpaper_dim)} @change=${e=>o((t=>t.settings.wallpaper_dim=Number(e.target.value)))} style="flex:1"
                                /></label>
                                <div>${a("accent_from_wallpaper")} ${Qe(t,i.accent_from_wallpaper,(e=>o((t=>t.settings.accent_from_wallpaper=e))))}</div>`:c}
                        </div>`:c}
                    ${t.allows("window_camera")?Be(t,a("window_camera"),i.window_camera,{domains:["camera"]},(e=>o((t=>t.settings.window_camera=e))),!0):c}
                    ${t.allows("music_backdrop")?n`<div class="field">${a("music_backdrop")} ${Qe(t,i.music_backdrop,(e=>o((t=>t.settings.music_backdrop=e))))}</div>`:c}
                    ${t.allows("welcome")?n`<div class="field">${a("welcome_moment")} ${Qe(t,i.welcome,(e=>o((t=>t.settings.welcome=e))))}</div>`:c}
                    ${t.allows("page_moods")?n`<div class="field">${a("page_moods")} ${Qe(t,i.page_moods,(e=>o((t=>t.settings.page_moods=e))))}</div>`:c}
                    ${t.allows("season_skin")?n`<div class="field">${a("season_skin")} ${Qe(t,i.season_skin,(e=>o((t=>t.settings.season_skin=e))))}</div>`:c}
                    ${t.allows("accent_day")?n`<div class="field">${a("accent_day")} ${Qe(t,i.accent_day,(e=>o((t=>t.settings.accent_day=e))))}</div>`:c}
                    ${t.allows("active_glow")?n`<div class="field">${a("active_glow")} ${Qe(t,i.active_glow,(e=>o((t=>t.settings.active_glow=e))))}</div>`:c}
                    ${t.allows("aurora")?n`<div class="field">${a("aurora")} ${Qe(t,i.aurora,(e=>o((t=>t.settings.aurora=e))))}</div>`:c}
                    ${t.allows("monogram")?n`<label class="field"
                          >${a("monogram")}
                          <input type="text" maxlength="30" placeholder="آل محمد" .value=${i.monogram??""} @change=${e=>o((t=>t.settings.monogram=e.target.value.trim()||void 0))} />
                          <span class="hint">${a("monogram_hint")}</span>
                        </label>`:c}
                    ${t.allows("dock")?n`<div class="field" style="margin-top:8px">
                          ${a("nav_style")}
                          <div class="seg">${["tabs","dock"].map((e=>n`<button aria-pressed=${i.nav===e} @click=${()=>o((t=>t.settings.nav=e))}>${a("dock"===e?"nav_dock":"nav_tabs")}</button>`))}</div>
                        </div>`:c}`:c}
              <span class="hint">${a("style_hint")}</span>
            </div>`:c,t.allows("fonts")?n`<label class="field"
              >${a("font")}
              <select @change=${e=>o((t=>t.settings.font=e.target.value))}>
                ${Object.entries(H).map((([e,t])=>n`<option value=${e} ?selected=${(i.font??"rubik")===e} style="font-family:'${t.family}'">${t.label}</option>`))}
              </select>
              <span class="hint">${a("font_hint")}</span>
            </label>`:c,t.allows("icon_styles")?n`<div class="field">
              ${a("icons_style")}
              <div class="seg">${["filled","line"].map((e=>n`<button aria-pressed=${(i.icons??"filled")===e} @click=${()=>o((t=>t.settings.icons=e))}>${a("line"===e?"icons_line":"icons_filled")}</button>`))}</div>
            </div>`:c,t.allows("occasions")?n`<div class="field">${a("occasions")} ${Qe(t,i.occasions,(e=>o((t=>t.settings.occasions=e))))}</div>`:c,t.allows("burn_in")?n`<div class="field">${a("burn_in")} ${Qe(t,i.burn_in,(e=>o((t=>t.settings.burn_in=e))))}</div>`:c,n`<div class="field">${a("cameras_live")} ${Qe(t,i.cameras_live??!0,(e=>o((t=>t.settings.cameras_live=e))))}</div>`,t.allows("quick_scenes")?Te(t,a("quick_scenes"),i.quick_scenes?.length?i.quick_scenes:void 0,{domains:["scene","script"]},(e=>o((t=>t.settings.quick_scenes=e??[]))),"none"):c,t.allows("circadian")?n`${Te(t,a("circadian"),i.circadian?.length?i.circadian:void 0,{domains:["light"]},(e=>o((t=>t.settings.circadian=e??[]))),"none")}
              <span class="hint" style="margin-top:-8px">${a("circadian_hint")}</span>`:c,n`<div class="field">
          ${a("accent")}
          ${Ae(...Ye.map((e=>n`<button
                class="pressable"
                aria-label=${e}
                aria-pressed=${i.accent.toUpperCase()===e}
                style="width:40px;height:40px;border-radius:999px;background:${e};box-shadow:${i.accent.toUpperCase()===e?"0 0 0 3px var(--surface-solid), 0 0 0 5px "+e:"none"}"
                @click=${()=>o((t=>t.settings.accent=e))}
              ></button>`)),n`<input
              type="color"
              aria-label=${a("accent")}
              .value=${i.accent}
              style="width:40px;height:40px;border:0;padding:0;background:none;border-radius:999px"
              @change=${e=>o((t=>t.settings.accent=e.target.value.toUpperCase()))}
            />`)}
        </div>`,t.allows("liquid_glass")?n`<div class="field">
              ${a("glass_style")}
              <div class="seg">
                ${["classic","liquid"].map((e=>n`<button aria-pressed=${i.glass===e} @click=${()=>o((t=>t.settings.glass=e))}>${a(`glass_${e}`)}</button>`))}
              </div>
            </div>`:c,n`<div class="field">${a("night_plan")} ${Qe(t,i.night_plan,(e=>o((t=>t.settings.night_plan=e))))}</div>`,t.allows("seasons")?n`<div class="field">
              ${a("season")}
              <div class="seg">
                ${["auto","ramadan","eid","off"].map((e=>n`<button aria-pressed=${i.season===e} @click=${()=>o((t=>t.settings.season=e))}>${a("off"===e?"off":`season_${e}`)}</button>`))}
              </div>
            </div>`:c,t.allows("kids")?n`<label class="field"
              >${a("kids_page")}
              <select @change=${e=>o((t=>t.settings.kids_page=e.target.value||void 0))}>
                <option value="" ?selected=${!i.kids_page}>${a("none")}</option>
                ${t.config.pages.map((e=>n`<option value=${e.id} ?selected=${i.kids_page===e.id}>${e.title}</option>`))}
              </select>
            </label>`:c,n`<label class="field"
          >${a("default_page")}
          <select @change=${e=>o((t=>t.settings.default_page=e.target.value))}>
            ${t.config.pages.map((e=>n`<option value=${e.id} ?selected=${i.default_page===e.id}>${e.title}</option>`))}
          </select>
        </label>`,Pe(a("screensaver"),n`<div class="seg">
            ${[!0,!1].map((e=>n`<button aria-pressed=${i.screensaver.enabled===e} @click=${()=>o((t=>t.settings.screensaver.enabled=e))}>
                ${a(e?"on":"off")}
              </button>`))}
          </div>`,i.screensaver.enabled&&t.allows("clock_styles")?n`<div class="field">
                ${a("ss_style")}
                <div class="seg">
                  ${["classic","minimal","analog"].map((e=>n`<button aria-pressed=${i.screensaver.style===e} @click=${()=>o((t=>t.settings.screensaver.style=e))}>${a(`ss_${e}`)}</button>`))}
                </div>
              </div>`:c,i.screensaver.enabled?n`<label class="field"
                  >${a("screensaver_after")}
                  <input
                    type="number"
                    min="1"
                    max="120"
                    .value=${String(i.screensaver.timeout_min)}
                    @change=${e=>o((t=>t.settings.screensaver.timeout_min=Math.max(1,Number(e.target.value)||5)))}
                  />
                </label>
                ${Be(t,a("temp_entity"),i.screensaver.temp_entity,{domains:["sensor","climate","weather"]},(e=>o((t=>t.settings.screensaver.temp_entity=e))),!0)}
                <div class="field">${a("photos")} ${Qe(t,i.screensaver.photos,(e=>o((t=>t.settings.screensaver.photos=e))))}</div>
                ${i.screensaver.photos?n`<label class="field"
                        >${a("photo_folder")}
                        <input
                          type="text"
                          class="ltr"
                          .value=${i.screensaver.photo_folder}
                          @change=${e=>o((t=>t.settings.screensaver.photo_folder=(e.target.value.trim().startsWith("media-source://")?e.target.value.trim():e.target.value.trim().replace(/^\/+|\/+$/g,""))||"smartnest-photos"))}
                        />
                        <span class="hint">${a("photos_hint",{folder:i.screensaver.photo_folder})}</span>
                      </label>
                      ${Xe(a("photo_seconds"),i.screensaver.photo_seconds,5,600,(e=>o((t=>t.settings.screensaver.photo_seconds=e))))}`:c}`:c),Pe(a("greet_morning")+" ☀️",n`<label class="field"
            >${a("greeting_name")}
            <input
              type="text"
              .value=${i.greeting_name}
              placeholder=${t.hass.user?.name??""}
              @change=${e=>o((t=>t.settings.greeting_name=e.target.value.trim()))}
            />
            <span class="hint">${a("greeting_name_hint")}</span>
          </label>`,n`<div class="field">${a("prayer")} ${Qe(t,i.prayer,(e=>o((t=>t.settings.prayer=e))))}</div>`,n`<div class="field">${a("morning_summary")} ${Qe(t,i.morning,(e=>o((t=>t.settings.morning=e))))}</div>`),Pe(a("hidden_devices"),function(e,t,s){const i=e.fullHass??e.hass;return n`<span class="hint" style="margin-top:-4px">${e.t("hidden_hint")}</span>
    <div style="display:flex;gap:6px;flex-wrap:wrap">
      ${t.map((a=>n`<button class="btn pressable" style="min-height:36px;font-size:14px" title=${e.t("hidden_show")} @click=${()=>s(t.filter((e=>e!==a)))}>
          <sn-icon icon="eye-off" style="--icon-size:16px"></sn-icon>${l(i,e.config,a)}<sn-icon icon="close" style="--icon-size:14px"></sn-icon>
        </button>`))}
      <button
        class="btn primary pressable"
        style="min-height:36px;font-size:14px"
        @click=${()=>e.showSheet({still:!0,title:e.t("hidden_add"),render:e=>n`<sn-entity-picker
              .ctx=${e}
              .filter=${{}}
              .onPick=${i=>{s([...t.filter((e=>e!==i)),i]),e.closeSheet()}}
            ></sn-entity-picker>`})}
      >
        <sn-icon icon="plus" style="--icon-size:16px"></sn-icon>${e.t("hidden_add")}
      </button>
    </div>`}(t,i.hidden,(e=>o((t=>t.settings.hidden=e))))),Pe(a("status_bar"),n`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px">
            ${L.map((e=>{const t=!i.chips_hidden.includes(e.id);return n`<button
                class="btn pressable ${t?"primary":""}"
                style="justify-content:flex-start;font-weight:500"
                aria-pressed=${t}
                @click=${()=>o((s=>{const i=new Set(s.settings.chips_hidden);t?i.add(e.id):i.delete(e.id),s.settings.chips_hidden=[...i]}))}
              >
                <sn-icon icon=${t?"check":"close"} style="--icon-size:18px"></sn-icon>${a(e.label)}
              </button>`}))}
          </div>`,Be(t,a("power_entity"),i.power_entity,{domains:["sensor"],deviceClasses:["power"]},(e=>o((t=>t.settings.power_entity=e))),!0),t.allows("tou")?n`<div class="field">
                ${a("tou")} ${Qe(t,i.tou.enabled,(e=>o((t=>t.settings.tou.enabled=e))))}
                ${i.tou.enabled?n`${Ae(n`<span>🌙 ${a("tou_cheap")}</span>`,n`<input type="time" style="width:auto" .value=${i.tou.cheap_from} @change=${e=>o((t=>t.settings.tou.cheap_from=e.target.value))} />`,n`<span>←</span>`,n`<input type="time" style="width:auto" .value=${i.tou.cheap_to} @change=${e=>o((t=>t.settings.tou.cheap_to=e.target.value))} />`)}
                    ${Ae(n`<span>⚡ ${a("tou_peak")}</span>`,n`<input type="time" style="width:auto" .value=${i.tou.peak_from} @change=${e=>o((t=>t.settings.tou.peak_from=e.target.value))} />`,n`<span>←</span>`,n`<input type="time" style="width:auto" .value=${i.tou.peak_to} @change=${e=>o((t=>t.settings.tou.peak_to=e.target.value))} />`)}`:c}
              </div>`:c,t.allows("overload")?n`<label class="field"
                >${a("power_limit")}
                <input type="number" min="0" step="100" class="ltr" .value=${String(i.power_limit??"")} placeholder="6000" @change=${e=>o((t=>t.settings.power_limit=Number(e.target.value)||void 0))} />
                <span class="hint">${a("power_limit_hint")}</span>
              </label>`:c),t.allows("guests")?Pe(a("guests_mode"),n`<label class="field">${a("guests_welcome")}<input type="text" .value=${i.guests.welcome??""} placeholder=${a("welcome_default")} @change=${e=>o((t=>t.settings.guests.welcome=e.target.value.trim()||void 0))} /></label>`,n`<label class="field">${a("wifi_ssid")}<input type="text" class="ltr" .value=${i.guests.ssid??""} @change=${e=>o((t=>t.settings.guests.ssid=e.target.value.trim()||void 0))} /></label>`,n`<label class="field">${a("wifi_password")}<input type="text" class="ltr" autocomplete="off" .value=${i.guests.password??""} @change=${e=>o((t=>t.settings.guests.password=e.target.value||void 0))} /></label>`):c,Pe(a("sound_motion"),t.allows("ui_sounds")?n`<div class="field">${a("ui_sounds")} ${Qe(t,i.sounds,(e=>o((t=>t.settings.sounds=e))))}</div>`:c,n`<div class="field">
            ${a("bell_tone")}
            <div class="seg">
              ${["chime","dingdong","melody"].map((t=>n`<button
                  aria-pressed=${i.doorbell_tone===t}
                  @click=${()=>{o((e=>e.settings.doorbell_tone=t)),e((()=>import("./app-DXLXZjxL.js").then((e=>e.ar))),[]).then((e=>e.playBell(t)))}}
                >
                  ${a(`bell_${t}`)}
                </button>`))}
            </div>
          </div>`,t.allows("motion_levels")?n`<div class="field">
                ${a("motion")}
                <div class="seg">${["full","light","off"].map((e=>n`<button aria-pressed=${i.motion===e} @click=${()=>o((t=>t.settings.motion=e))}>${a(`motion_${e}`)}</button>`))}</div>
                <span class="hint">${a("motion_hint")}</span>
              </div>`:c,t.allows("high_contrast")?n`<div class="field">${a("high_contrast")} ${Qe(t,!!i.contrast,(e=>o((t=>t.settings.contrast=e))))}</div>`:c),t.allows("travel")?function(e,t){const{t:s,hass:i,config:a}=e,o=a.settings.travel,r=u(a).filter((e=>i.states[e])),p=r.filter((e=>["switch","valve","water_heater","climate","media_player","fan","humidifier"].includes(h(e)))),d=r.filter((e=>"light"===h(e))),g=Object.keys(i.services?.notify??{}).filter((e=>"send_message"!==e&&"persistent_notification"!==e)).map((e=>`notify.${e}`)),m=(e,s,o)=>n`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:8px">
    ${e.map((e=>{const r=s.includes(e);return n`<button
        class="btn pressable ${r?"primary":""}"
        style="justify-content:flex-start;font-weight:500"
        aria-pressed=${r}
        @click=${()=>t((t=>t.settings.travel[o]=r?t.settings.travel[o].filter((t=>t!==e)):[...t.settings.travel[o],e]))}
      >
        <sn-icon icon=${r?"check":"close"} style="--icon-size:18px"></sn-icon>${l(i,a,e)}
      </button>`}))}
  </div>`;return Pe(s("travel"),n`<span class="field">${s("travel_off_pick")}</span>`,m(p,o.off,"off"),n`<div class="field">${s("travel_sim")} ${Qe(e,o.simulate,(e=>t((t=>t.settings.travel.simulate=e))))}</div>`,o.simulate?m(d,o.lights,"lights"):c,n`<div class="field">${s("travel_arm")} ${Qe(e,o.arm,(e=>t((t=>t.settings.travel.arm=e))))}</div>`,n`<label class="field"
      >${s("travel_report")}
      <select @change=${e=>t((t=>t.settings.travel.notify=e.target.value||void 0))}>
        <option value="" ?selected=${!o.notify}>–</option>
        ${g.map((e=>n`<option value=${e} ?selected=${o.notify===e}>${e}</option>`))}
      </select>
    </label>`)}(t,o):c,t.allows("home_helpers")?function(e,t){const{t:s,hass:i,config:a}=e,o=a.settings,r=Object.values(i.states),c=(e,t)=>r.filter((s=>s.entity_id.startsWith(`${e}.`)&&(!t||t.includes(s.attributes.device_class)))).map((e=>e.entity_id)),p=c("sensor",["power"]).sort(((e,t)=>Number(/wash|dry|dish|غسال|نشاف|جلاي/i.test(l(i,a,t)+t))-Number(/wash|dry|dish|غسال|نشاف|جلاي/i.test(l(i,a,e)+e)))),d=r.filter((e=>e.entity_id.endsWith("_direction_of_travel"))).length,g=(e,t,...i)=>n`<div style="display:grid;gap:8px;padding:12px;border-radius:var(--r-md);background:var(--surface-2)">
    <b>${e}</b><span class="muted" style="font-size:13px">${s(t)}</span>${i}
  </div>`;return Pe(s("helpers"),g(s("h_appliances"),"h_appliances_hint",tt(e,p.slice(0,24),o.appliances.map((e=>e.power)),((e,s)=>t((t=>{t.settings.appliances=s?[...t.settings.appliances,{power:e,name:l(i,a,e).replace(/\s*(power|استهلاك|consumption)\s*/gi," ").trim()}]:t.settings.appliances.filter((t=>t.power!==e))}))))),g(s("h_night_path"),"h_night_path_hint",tt(e,c("binary_sensor",["motion","occupancy","presence"]),o.night_path.motion,((e,s)=>t((t=>t.settings.night_path.motion=st(t.settings.night_path.motion,e,s))))),tt(e,c("light"),o.night_path.lights,((e,s)=>t((t=>t.settings.night_path.lights=st(t.settings.night_path.lights,e,s))))),Ae(n`<span>${s("from")}</span>`,n`<input type="time" style="width:auto" .value=${o.night_path.from} @change=${e=>t((t=>t.settings.night_path.from=e.target.value))} />`,n`<span>${s("to")}</span>`,n`<input type="time" style="width:auto" .value=${o.night_path.to} @change=${e=>t((t=>t.settings.night_path.to=e.target.value))} />`,n`<span>${s("brightness")}</span>`,n`<input type="number" min="1" max="100" style="width:80px" .value=${String(o.night_path.brightness)} @change=${e=>t((t=>t.settings.night_path.brightness=Number(e.target.value)||10))} />`)),g(s("h_arrival"),d?"h_arrival_hint":"h_arrival_missing",tt(e,c("climate"),o.arrival.climate,((e,s)=>t((t=>t.settings.arrival.climate=st(t.settings.arrival.climate,e,s))))),tt(e,c("light"),o.arrival.lights,((e,s)=>t((t=>t.settings.arrival.lights=st(t.settings.arrival.lights,e,s))))),Ae(n`<span>${s("h_arrival_km")}</span>`,n`<input type="number" min="1" max="50" style="width:80px" .value=${String(o.arrival.km)} @change=${e=>t((t=>t.settings.arrival.km=Number(e.target.value)||5))} />`)),g(s("h_outage"),"h_outage_hint",Be(e,s("h_outage_sensor"),o.outage.sensor,{domains:["binary_sensor","sensor"]},(e=>t((t=>t.settings.outage.sensor=e))),!0),tt(e,[...c("switch"),...c("climate"),...c("water_heater")].filter((e=>!i.entities?.[e]?.entity_category)),o.outage.shed,((e,s)=>t((t=>t.settings.outage.shed=st(t.settings.outage.shed,e,s)))))))}(t,o):c,t.allows("support")?Pe(a("installer"),n`<label class="field">${a("installer_name")}<input type="text" .value=${i.installer.name??""} placeholder="SmartNest" @change=${e=>o((t=>t.settings.installer.name=e.target.value.trim()||void 0))} /></label>`,t.allows("white_label")?n`<div class="field">
                    ${a("brand_logo")}
                    <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
                      ${i.installer.brand?.logo?n`<img src=${i.installer.brand.logo} alt="" style="height:40px;max-width:120px;object-fit:contain" />`:c}
                      <input
                        type="file"
                        accept="image/png,image/svg+xml,image/webp,image/jpeg"
                        style="flex:1"
                        @change=${async e=>{const s=e.target.files?.[0];if(s)try{const e=await E(s);o((t=>t.settings.installer.brand={...t.settings.installer.brand??{},name:t.settings.installer.name,logo:e,v:-Date.now()}))}catch{t.toast(a("error"))}}}
                      />
                      ${i.installer.brand?.logo?n`<button class="btn pressable" @click=${()=>o((e=>e.settings.installer.brand={...e.settings.installer.brand,logo:null}))}>${a("delete")}</button>`:c}
                    </div>
                    <span class="hint">${a("brand_hint")}</span>
                  </div>`:c,n`<label class="field"
                >${a("installer_phone")}<input type="tel" class="ltr" .value=${i.installer.phone??""} placeholder="972501234567" @change=${e=>o((t=>t.settings.installer.phone=e.target.value.trim()||void 0))} />
                <span class="hint">${a("installer_phone_hint")}</span></label
              >`):c,t.allows("alarm_screen")?Pe(a("emergency"),n`<label class="field">${a("police_number")}<input type="tel" class="ltr" .value=${i.emergency.police} @change=${e=>o((t=>t.settings.emergency.police=e.target.value.trim()))} /></label>`,n`<label class="field"
                >${a("emergency_contacts")}
                <textarea
                  rows="3"
                  class="ltr"
                  placeholder="أبو محمد, 0501234567"
                  .value=${i.emergency.contacts.map((e=>`${e.name}, ${e.phone}`)).join("\n")}
                  @change=${e=>o((t=>t.settings.emergency.contacts=String(e.target.value).split("\n").map((e=>e.split(","))).filter((e=>e.length>=2&&e[1].trim())).map((([e,t])=>({name:e.trim(),phone:t.trim()}))).slice(0,4)))}
                ></textarea>
                <span class="hint">${a("emergency_hint")}</span>
              </label>`):c,Pe(a("weather"),Be(t,a("weather_entity"),i.weather.entity,{domains:["weather"]},(e=>o((t=>t.settings.weather.entity=e))),!0),n`<div class="field">${a("weather_bg")} ${Qe(t,i.weather.background,(e=>o((t=>t.settings.weather.background=e))))}</div>`),function(e,t){const s=e.t,i=e.config.settings.fully,a=v(e.hass);if(!a.length)return Pe(s("tablet"),n`<p class="muted" style="margin:0;font-size:14px">${s("tablet_none")}</p>`);const l=ie(e.hass);return Pe(s("tablet"),n`<p class="muted" style="margin:0;font-size:14px">
      ${s("tablet_found",{names:a.map((e=>e.name)).join("ar"===e.lang?"، ":", ")})} ·
      ${l?n`<strong style="color:var(--success)">✓ ${s("tablet_this")}</strong>`:s("tablet_not_this")}
    </p>`,window.fully?c:n`<p class="muted" style="margin:0;font-size:13px">${s("tablet_js_hint")}</p>`,n`<div class="field">${s("night_dim")} ${Qe(e,i.night_dim,(e=>t((t=>t.settings.fully.night_dim=e))))}</div>`,i.night_dim?n`${Xe(s("night_brightness"),i.night_brightness,1,100,(e=>t((t=>t.settings.fully.night_brightness=e))))}
        ${Xe(s("night_off"),i.night_off_min,0,240,(e=>t((t=>t.settings.fully.night_off_min=e))))}`:c,n`<div class="field">
      ${s("motion_wake")} ${Qe(e,i.motion_wake,(e=>t((t=>t.settings.fully.motion_wake=e))))}
      <span class="hint">${s("motion_wake_hint")}</span>
    </div>`)}(t,o),Pe(a("doorbell"),Be(t,a("doorbell_trigger"),i.doorbell.trigger_entity,{domains:["event","binary_sensor"]},(e=>o((t=>t.settings.doorbell.trigger_entity=e))),!0),Be(t,a("doorbell_camera"),i.doorbell.camera_entity,{domains:["camera"]},(e=>o((t=>t.settings.doorbell.camera_entity=e))),!0),Be(t,a("doorbell_lock"),i.doorbell.lock_entity,{domains:["lock"]},(e=>o((t=>t.settings.doorbell.lock_entity=e))),!0),Be(t,a("doorbell_speaker"),i.doorbell.speaker_entity,{domains:["media_player"]},(e=>o((t=>t.settings.doorbell.speaker_entity=e))),!0),Xe(a("keep_days"),i.doorbell.keep_days,1,30,(e=>o((t=>t.settings.doorbell.keep_days=e)))),n`<button class="btn pressable" style="justify-self:start" @click=${s.testDoorbell}>
            <sn-icon icon="bell-ring" style="--icon-size:20px"></sn-icon>${a("doorbell_test")}
          </button>`),Pe(a("kiosk"),n`<form
            class="field"
            @submit=${e=>{e.preventDefault();const s=e.currentTarget.querySelector("input"),i=s.value.trim();if(!/^\d{4,8}$/.test(i))return t.toast(a("kiosk_pin_invalid"));const n=F();o((e=>e.settings.kiosk={pin_hash:oe(i,n),pin_salt:n,pin_length:i.length})),s.value="",t.toast(a("kiosk_pin_saved"))}}
          >
            ${a("kiosk_pin")}
            <div style="display:flex;gap:8px">
              <input type="password" inputmode="numeric" pattern="[0-9]*" maxlength="8" autocomplete="off" placeholder="••••" style="flex:1" />
              <button class="btn primary pressable" type="submit">${a(i.kiosk.pin_hash?"kiosk_pin_change":"kiosk_pin_set")}</button>
            </div>
            <span class="hint">${a("kiosk_pin_hint")}</span>
            <span class="hint">${a("kiosk_full_lock")}</span>
          </form>`,i.kiosk.pin_hash?n`<button class="btn pressable" style="justify-self:start" @click=${()=>o((e=>e.settings.kiosk={}))}>
                <sn-icon icon="lock-open" style="--icon-size:20px"></sn-icon>${a("kiosk_remove_pin")}
              </button>`:c),t.allows("broadcast")?Pe(a("speakers"),n`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px">
                ${Object.keys(t.hass.states).filter((e=>e.startsWith("media_player."))).map((e=>{const s=i.speakers.includes(e);return n`<button
                      class="btn pressable ${s?"primary":""}"
                      style="justify-content:flex-start;font-weight:500"
                      @click=${()=>o((t=>t.settings.speakers=s?t.settings.speakers.filter((t=>t!==e)):[...t.settings.speakers,e]))}
                    >
                      <sn-icon icon=${s?"check":"speaker"} style="--icon-size:18px"></sn-icon>${l(t.hass,t.config,e)}
                    </button>`}))}
              </div>`):c,t.allows("maintenance")?Pe(a("maintenance"),...i.maintenance.map(((e,t)=>n`<div style="display:flex;gap:8px;align-items:center">
                  <span style="flex:1">${e.title}</span>
                  <span class="muted ltr" style="font-size:13px">${e.every_days}d</span>
                  <button class="btn pressable" style="min-height:34px;font-size:13px" @click=${()=>o((e=>e.settings.maintenance[t].last=(new Date).toISOString()))}>
                    ${a("m_done")}
                  </button>
                  <button class="icon-btn small pressable" aria-label=${a("delete")} @click=${()=>o((e=>e.settings.maintenance.splice(t,1)))}>
                    <sn-icon icon="close" style="--icon-size:16px"></sn-icon>
                  </button>
                </div>`)),n`<form
                style="display:flex;gap:8px;flex-wrap:wrap"
                @submit=${e=>{e.preventDefault();const t=e.currentTarget,s=t.elements.namedItem("title").value.trim(),i=Number(t.elements.namedItem("every").value)||90;s&&(o((e=>e.settings.maintenance.push({id:g(),title:s,every_days:i,last:(new Date).toISOString()}))),t.reset())}}
              >
                <input name="title" type="text" placeholder=${a("m_title")} style="flex:2;min-width:160px" />
                <input name="every" type="number" min="1" placeholder=${a("m_every")} style="flex:1;min-width:90px" />
                <button class="btn primary pressable" type="submit">${a("add")}</button>
              </form>`):c,Pe(a("transfer"),n`<div style="display:flex;gap:8px;flex-wrap:wrap">
            <button class="btn pressable" @click=${()=>T(t.config)}><sn-icon icon="export" style="--icon-size:18px"></sn-icon>${a("export_config")}</button>
            <label class="btn pressable" style="cursor:pointer">
              <sn-icon icon="import" style="--icon-size:18px"></sn-icon>${a("import_config")}
              <input
                type="file"
                accept="application/json,.json"
                style="display:none"
                @change=${e=>{const s=e.target.files?.[0];e.target.value="",s&&R(t,s)}}
              />
            </label>
          </div>`),Pe(a("about"),n`<div style="display:flex;align-items:center;gap:14px">
            <img src="${t.assetBase}logo/smartnest-symbol-${t.dark?"white":"color"}.svg" alt="SmartNest" style="width:48px;height:48px" />
            <div style="display:grid;gap:2px">
              <strong>SmartNest</strong>
              <span class="muted" style="font-size:13px">${a("tagline")}</span>
              <span class="muted ltr" style="font-size:12px;font-family:'JetBrains Mono',monospace">${a("version")} ${s.version}</span>
              ${s.license?.licensee?n`<span class="muted" style="font-size:12px">${a("licensed_to")} ${s.license.licensee}</span>`:c}
              <button class="btn pressable" style="justify-self:start;min-height:34px;font-size:13px;margin-top:6px" @click=${()=>B(t)}>
                <sn-icon icon="star" style="--icon-size:16px;color:var(--accent)"></sn-icon>${a("rate_service")}
              </button>
              ${s.license?n`<span class="muted" style="font-size:12px">
                    ${a("plan_label")}: <strong style="color:var(--accent-text)">${a(`plan_${s.license.plan}`)}</strong>${s.license.trial?` (${a("trial_label")})`:""}
                    ${s.license.expires?n` · ${a("expires_on")} ${new Date(1e3*s.license.expires).toLocaleDateString()}`:c}
                    ${s.license.reseller?n` · ${a("via")} ${s.license.reseller}`:c}
                  </span>
                  ${s.checkLicense?n`<button
                        class="btn pressable"
                        style="justify-self:start;min-height:34px;font-size:13px"
                        @click=${async e=>{const i=e.currentTarget;i.disabled=!0;const n=await s.checkLicense().catch((()=>a("error")));i.disabled=!1,t.toast(n),t.closeSheet()}}
                      >
                        <sn-icon icon="refresh" style="--icon-size:16px"></sn-icon>${a("lic_check")}
                      </button>`:c}`:c}
            </div>
          </div>`))}})}function tt(e,t,s,i){return t.length?n`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:8px">
    ${t.map((t=>{const a=s.includes(t);return n`<button class="btn pressable ${a?"primary":""}" style="justify-content:flex-start;font-weight:500" aria-pressed=${a} @click=${()=>i(t,!a)}>
        <sn-icon icon=${a?"check":"close"} style="--icon-size:18px"></sn-icon>${l(e.hass,e.config,t)}
      </button>`}))}
  </div>`:n`<span class="muted" style="font-size:13px">${e.t("no_entities")}</span>`}const st=(e,t,s)=>s?[...new Set([...e,t])]:e.filter((e=>e!==t));let it=class extends a{async connectedCallback(){super.connectedCallback(),this.users=await this.ctx.hass.callWS({type:"config/auth/list"}).then((e=>e.filter((e=>!e.system_generated&&e.is_active))),(()=>[]))}render(){const{t:e}=this.ctx,t=this.page.users??[];return this.users?.length?n`<div class="field">
      ${e("page_users")}
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        ${this.users.map((e=>{const s=t.includes(e.id);return n`<button
            class="btn pressable ${s?"primary":""}"
            style="min-height:36px;font-size:14px"
            @click=${()=>this.onChange(s?t.filter((t=>t!==e.id)):[...t,e.id])}
          >
            ${e.name}
          </button>`}))}
      </div>
      <span class="hint">${e(t.length?"page_users_some":"page_users_all")}</span>
    </div>`:c}};it.styles=[S],Ie([s({attribute:!1})],it.prototype,"ctx",2),Ie([s({attribute:!1})],it.prototype,"page",2),Ie([s({attribute:!1})],it.prototype,"onChange",2),Ie([t()],it.prototype,"users",2),it=Ie([i("sn-page-users")],it);export{it as SnPageUsers,Ge as addPageSheet,Ve as addWidgetSheet,Be as entityField,Te as multiField,Ke as pageSettingsSheet,et as settingsSheet,Ue as widgetSettingsSheet};
