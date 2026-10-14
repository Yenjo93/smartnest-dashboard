import{_ as e}from"./loader-43RavMas.js";import{r as t,n as s,t as a,i,b as n,e as l,l as o,s as r,A as c,L as p,u as d,a as g,d as u,c as m,f as h,g as y,h as f,P as $,j as b,k as v,m as _,o as x,w,p as k,q as z,v as S,x as j,y as N,T as O,z as D,B as M,C,W as I,D as W,E as P,F as B,G as T,H as q,I as A,J as R,K as F,M as E,N as L,O as U,Q as H,R as J,S as V,U as G,V as K,X as Q,Y as X,Z as Y,_ as Z,$ as ee,a0 as te,a1 as se,a2 as ae,a3 as ie,a4 as ne,a5 as le}from"./app-envzMgej.js";var oe=Object.defineProperty,re=Object.getOwnPropertyDescriptor,ce=(e,t,s,a)=>{for(var i,n=a>1?void 0:a?re(t,s):t,l=e.length-1;l>=0;l--)(i=e[l])&&(n=(a?i(t,s,n):i(n))||n);return a&&n&&oe(t,s,n),n};const pe=(e,t)=>n`<section style="display:grid;gap:8px;padding:14px 16px;border-radius:var(--r-md);background:var(--surface-2)">
  <div style="font-weight:700">${e}</div>
  ${t}
</section>`;let de=class extends i{createRenderRoot(){return this}async connectedCallback(){super.connectedCallback();const{hass:e}=this.ctx,t=Object.values(e.states).filter((e=>e.entity_id.startsWith("sensor.")&&"battery"===e.attributes.device_class&&!Number.isNaN(Number(e.state)))).map((e=>e.entity_id)).slice(0,60);if(!t.length)return void(this.rows=[]);let s={};try{s=await e.callWS({type:"recorder/statistics_during_period",start_time:new Date(Date.now()-2592e6).toISOString(),statistic_ids:t,period:"day",types:["mean"]})}catch{return void(this.rows=[])}const a=[];for(const i of t){const t=(s[i]??[]).map((e=>["number"==typeof e.start?e.start>1e12?e.start:1e3*e.start:Date.parse(e.start),e.mean??NaN])).filter((([,e])=>!Number.isNaN(e)));if(t.length<7)continue;const n=t.length,l=t.map((([e])=>e/864e5)),o=t.map((([,e])=>e)),r=l.reduce(((e,t)=>e+t),0)/n,c=o.reduce(((e,t)=>e+t),0)/n,p=l.reduce(((e,t,s)=>e+(t-r)*(o[s]-c)),0)/(l.reduce(((e,t)=>e+(t-r)**2),0)||1),d=Number(e.states[i].state);p>=-.05||d<=10||a.push({id:i,level:d,days:Math.round((d-10)/-p)})}this.rows=a.sort(((e,t)=>e.days-t.days)).slice(0,10)}render(){const{t:e,hass:t,config:s}=this.ctx;return this.rows?pe(e("bat_title"),this.rows.length?n`<div style="display:grid;gap:4px;font-size:14px">
            ${this.rows.map((a=>n`<div style="display:flex;justify-content:space-between;gap:12px">
                <span>${l(t,s,a.id)} <span class="muted ltr">${Math.round(a.level)}%</span></span>
                <span style="color:${a.days<21?"var(--alert-text)":"var(--text-2)"}">${a.days>365?e("bat_year"):e("bat_days",{n:a.days})}</span>
              </div>`))}
          </div>`:n`<span class="muted" style="font-size:14px">${e("bat_none")}</span>`):pe(e("bat_title"),n`<span class="muted" style="font-size:14px">${e("loading")}</span>`)}};ce([s({attribute:!1})],de.prototype,"ctx",2),ce([t()],de.prototype,"rows",2),de=ce([a("sn-battery-plan")],de);let ge=class extends i{constructor(){super(...arguments),this.busy=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),o(this.ctx.hass,"warranty").then((e=>this.items=e?.items??[]))}save(e){this.items=e,r(this.ctx.hass,"warranty",{items:e}).catch((()=>this.ctx.toast(this.ctx.t("error"))))}render(){const{t:e,lang:t}=this.ctx;if(!this.items)return c;const s=e=>{const t=new Date(`${e.bought}T12:00`);return t.setMonth(t.getMonth()+e.months),t};return pe(e("war_title"),n`${this.items.slice().sort(((e,t)=>s(e).getTime()-s(t).getTime())).map((a=>{const i=s(a),l=Math.round((i.getTime()-Date.now())/864e5);return n`<div style="display:flex;align-items:center;gap:10px;font-size:14px">
              <span style="flex:1">${a.name}</span>
              <span style="color:${l<0?"var(--text-2)":l<60?"var(--alert-text)":"var(--success)"}"
                >${l<0?e("war_over"):e("war_until",{date:i.toLocaleDateString(p[t],{day:"numeric",month:"short",year:"numeric"})})}</span
              >
              ${a.invoice?n`<a href=${a.invoice} target="_blank" rel="noopener" title=${e("war_invoice")}>🧾</a>`:c}
              <button class="icon-btn small pressable" aria-label=${e("delete")} @click=${()=>this.save(this.items.filter((e=>e.id!==a.id)))}>
                <sn-icon icon="close" style="--icon-size:14px"></sn-icon>
              </button>
            </div>`}))}
        <form
          style="display:grid;gap:8px;margin-top:6px"
          @submit=${async e=>{e.preventDefault();const t=e.currentTarget,s=new FormData(t),a=s.get("invoice");let i;this.busy=!0,a&&a.size&&(i=await d(this.ctx.hass,a).catch((()=>{}))),this.save([...this.items,{id:g(),name:String(s.get("name")).trim(),bought:String(s.get("bought")),months:Number(s.get("months"))||12,invoice:i}]),this.busy=!1,t.reset()}}
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
        </form>`)}};ce([s({attribute:!1})],ge.prototype,"ctx",2),ce([t()],ge.prototype,"items",2),ce([t()],ge.prototype,"busy",2),ge=ce([a("sn-warranty")],ge);var ue=Object.defineProperty,me=Object.getOwnPropertyDescriptor,he=(e,t,s,a)=>{for(var i,n=a>1?void 0:a?me(t,s):t,l=e.length-1;l>=0;l--)(i=e[l])&&(n=(a?i(t,s,n):i(n))||n);return a&&n&&ue(t,s,n),n};let ye=class extends i{connectedCallback(){super.connectedCallback(),w(this.ctx).then((e=>this.rows=e))}createRenderRoot(){return this}render(){const{t:e}=this.ctx;return this.rows?be(e("faults_week"),!this.rows.length,ve(this.rows.map((t=>_e(t.name,e("times",{n:t.n}))))),e("h_all_good")):n`<sn-skeleton></sn-skeleton>`}};function fe(e,t){const s=e.hass.entities?.[t]?.platform??"";return["zha","zigbee2mqtt","deconz"].includes(s)?"x_zigbee":"mqtt"===s?"x_mqtt":["zwave_js"].includes(s)?"x_zwave":["tuya","ewelink","sonoff","smartthings","google_assistant","alexa","xiaomi_miot","roborock"].includes(s)?"x_cloud":["esphome","shelly","tasmota","wled","tplink","fully_kiosk"].includes(s)?"x_wifi":"x_generic"}he([s({attribute:!1})],ye.prototype,"ctx",2),he([t()],ye.prototype,"rows",2),ye=he([a("sn-faults")],ye);let $e=class extends i{constructor(){super(...arguments),this.offline=[],this.low=[],this.busy=!1}createRenderRoot(){return this}render(){const{ctx:e}=this,{t:t,hass:s,config:a}=e;if(!this.offline.length&&!this.low.length)return c;const i=[...this.offline.map((i=>[l(s,a,i.entity_id),t(fe(e,i.entity_id))])),...this.low.map((e=>[l(s,a,e.entity_id),t("x_battery")]))];return n`<section style="display:grid;gap:8px;padding:14px 16px;border-radius:var(--r-md);background:var(--surface-2)">
      <div style="display:flex;align-items:center;gap:8px;font-weight:700">
        <sn-icon icon="wrench" style="--icon-size:20px;color:var(--accent-text)"></sn-icon>${t("x_title")}
      </div>
      <div style="display:grid;gap:6px;font-size:14px">
        ${i.map((([e,t])=>n`<div><b>${e}</b> <span class="muted">· ${t}</span></div>`))}
      </div>
      ${this.ai?n`<div style="white-space:pre-line;font-size:14px;unicode-bidi:plaintext;border-top:1px solid var(--line, var(--surface-3));padding-top:8px">✨ ${this.ai}</div>`:c}
      ${k(s)&&e.allows("ai_explain")&&!this.ai?n`<button
            class="btn pressable"
            style="justify-self:start"
            ?disabled=${this.busy}
            @click=${async()=>{this.busy=!0;const i=[...this.offline.map((e=>`${l(s,a,e.entity_id)} (${e.entity_id}, ${s.entities?.[e.entity_id]?.platform??"?"}) unavailable since ${e.last_changed}`)),...this.low.map((e=>`${l(s,a,e.entity_id)} battery ${e.state}`))];this.ai=await z(e,"explain",{facts:i})??t("as_error"),this.busy=!1}}
          >
            ✨ ${this.busy?t("ai_looking"):t("x_ai")}
          </button>`:c}
    </section>`}};he([s({attribute:!1})],$e.prototype,"ctx",2),he([s({attribute:!1})],$e.prototype,"offline",2),he([s({attribute:!1})],$e.prototype,"low",2),he([t()],$e.prototype,"ai",2),he([t()],$e.prototype,"busy",2),$e=he([a("sn-explain")],$e);const be=(e,t,s,a,i=!1)=>n`<section
  style="display:grid;gap:8px;padding:14px 16px;border-radius:var(--r-md);background:var(--surface-2)"
>
  <div style="display:flex;align-items:center;gap:8px;font-weight:700">
    <sn-icon icon=${t?"check-circle":"alert-circle-outline"} style="--icon-size:20px;color:${t?"var(--success)":"var(--alert-text)"}"></sn-icon>
    ${e}
  </div>
  ${t&&!i?n`<span class="muted" style="font-size:14px">${a}</span>`:s}
</section>`,ve=e=>n`<div style="display:grid;gap:4px;font-size:14px">${e}</div>`,_e=(e,t)=>n`<div style="display:flex;justify-content:space-between;gap:12px"><span>${e}</span><span class="muted" style="unicode-bidi:plaintext">${t}</span></div>`,xe=(e,t)=>e.find((e=>e.entity_id.startsWith("sensor.")&&t.test(e.entity_id)));var we=Object.defineProperty,ke=Object.getOwnPropertyDescriptor,ze=(e,t,s,a)=>{for(var i,n=a>1?void 0:a?ke(t,s):t,l=e.length-1;l>=0;l--)(i=e[l])&&(n=(a?i(t,s,n):i(n))||n);return a&&n&&we(t,s,n),n};function Se(e){const t=e.toLowerCase();return/نوم|bed|שינה|ولاد|kids|ילדים/.test(t)?"bed":/مطبخ|kitchen|מטבח/.test(t)?"kitchen":/حمام|bath|shower|מקלחת|אמבט/.test(t)?"shower":/جنين|حديق|garden|yard|גינה|حوش|ساح/.test(t)?"garden":/كراج|garage|חניה|موقف/.test(t)?"garage":/مكتب|office|study|משרד/.test(t)?"desk":/غسيل|laundry|כביסה/.test(t)?"laundry":"sofa"}function je(e,t){const s=[M("room",{area:t.areaId},{x:0,y:0,w:12,h:5})];let a=0,i=5;const n=t.ids.filter((e=>"camera"!==m(e)));for(const l of n)a+3>12&&(a=0,i+=2),s.push(M("tile",{entity:l},{x:a,y:i,w:3,h:2})),a+=3;return i+=n.length?2:0,t.ids.filter((e=>"camera"===m(e))).forEach(((e,t)=>s.push(M("camera",{entity:e},{x:t%2*6,y:i+5*Math.floor(t/2),w:6,h:5})))),e.allows("w_room")||s.shift(),{id:g(),title:t.name??e.t("other_devices"),icon:Se(t.name??""),widgets:s}}function Ne(e,t){const{hass:s,config:a,t:i}=e,n=[],l=(e,t,s=!0)=>{const a=t.widgets.reduce(((e,t)=>e+(t.config.entity?1:0)+("floorplan"===t.type||"hero"===t.type||"energy"===t.type||"water"===t.type?1:0)),0);(a||"home"===e)&&n.push({key:e,page:t,devices:a,on:s})},o=e=>D(e,s,a,i),r="pro"===a.settings.style&&e.allows("bento"),c=a.pages.some((e=>e.widgets.some((e=>"floorplan"===e.type&&e.config.floors?.some((e=>e.image))))));if(l("home",o(r&&!c?"bento":"home")),r&&c&&l("bento",o("bento")),t)for(const p of N(s).filter((e=>e.areaId&&e.ids.length)))l(`area-${p.areaId}`,je(e,p));else l("rooms",o("rooms"));for(const p of["climate","power","security","doorbell","water","robot"])O.some((e=>e.id===p))&&l(p,o(p));l("media",function(e){const{hass:t}=e,s=Object.keys(t.states).filter((e=>e.startsWith("media_player.")&&"fully_kiosk"!==t.entities?.[e]?.platform&&!t.entities?.[e]?.entity_category)),a=Object.keys(t.states).filter((e=>e.startsWith("remote."))),i=[];s.slice(0,6).forEach(((e,t)=>i.push(M("media",{entity:e},{x:t%2*6,y:5*Math.floor(t/2),w:6,h:5}))));const n=5*Math.ceil(Math.min(s.length,6)/2);return a.slice(0,3).forEach(((e,t)=>i.push(M("remote",{entity:e},{x:4*t,y:n,w:4,h:8})))),{id:g(),title:e.t("template_media"),icon:"speaker",widgets:i}}(e));for(const p of["car","garden","pets"])l(p,o(p),!1);return n}let Oe=class extends i{constructor(){super(...arguments),this.perArea=!1,this.replace=!0,this.list=[]}connectedCallback(){super.connectedCallback(),this.refresh()}refresh(){const e=new Map(this.list.map((e=>[e.key,e.on])));this.list=Ne(this.ctx,this.perArea).map((t=>({...t,on:e.get(t.key)??t.on})))}build(){const{ctx:e}=this,t=this.list.filter((e=>e.on)).map((e=>e.page));t.length&&(e.update((e=>{const s=e.pages.flatMap((e=>e.widgets)).find((e=>"floorplan"===e.type)),a=s?.config.floors?.some((e=>e.image))?s.config.floors:void 0;if(a){const e=t.flatMap((e=>e.widgets)).find((e=>"floorplan"===e.type));e&&(e.config.floors=a)}e.pages=this.replace?t:[...e.pages,...t],e.settings.default_page=e.pages[0].id})),e.toast(e.t("ab_done",{n:t.length})),e.closeSheet())}render(){const{t:e}=this.ctx,t=this.list.filter((e=>e.on));return n`<p class="hint">${e("ab_hint")}</p>
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
      </button>`}};Oe.styles=[S,j`
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
    `],ze([s({attribute:!1})],Oe.prototype,"ctx",2),ze([t()],Oe.prototype,"perArea",2),ze([t()],Oe.prototype,"replace",2),ze([t()],Oe.prototype,"list",2),Oe=ze([a("sn-autobuild")],Oe);const De=(...e)=>n`<div style="display:grid;gap:18px">${e}</div>`,Me=(...e)=>n`<div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">${e}</div>`,Ce=(e,...t)=>n`<section style="display:grid;gap:12px;padding-top:6px">
    <h3 style="margin:0;font-size:13px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--text-2)">${e}</h3>
    ${t}
  </section>`;function Ie(e,t,s,a,i,o=!1){const r=s?e.hass.states[s]:void 0;return n`<div class="field">
    ${t}
    <div style="display:flex;gap:8px">
      <button
        class="btn pressable"
        style="flex:1;justify-content:flex-start;border-radius:var(--r-sm)"
        @click=${()=>e.showSheet({still:!0,title:t,render:e=>n`<sn-entity-picker
              .ctx=${e}
              .filter=${a}
              .onPick=${t=>{i(t),e.closeSheet()}}
            ></sn-entity-picker>`})}
      >
        ${s?n`<sn-icon .icon=${B(r,s)} style="--icon-size:20px"></sn-icon>${l(e.hass,e.config,s)}`:n`<span class="muted">${e.t(o?"none":"choose_entity")}</span>`}
      </button>
      ${o&&s?n`<button class="icon-btn pressable" aria-label=${e.t("delete")} @click=${()=>i(void 0)}>
            <sn-icon icon="close" style="--icon-size:18px"></sn-icon>
          </button>`:c}
    </div>
  </div>`}function We(e,t,s,a,i){const o=s??[];return n`<div class="field">
    ${t}
    <div style="display:flex;gap:6px;flex-wrap:wrap">
      ${o.map((t=>n`<button class="btn pressable" style="min-height:36px;font-size:14px" @click=${()=>i(o.length>1?o.filter((e=>e!==t)):void 0)}>
          ${l(e.hass,e.config,t)}<sn-icon icon="close" style="--icon-size:14px"></sn-icon>
        </button>`))}
      <button
        class="btn primary pressable"
        style="min-height:36px;font-size:14px"
        @click=${()=>e.showSheet({still:!0,title:t,render:e=>n`<sn-entity-picker
              .ctx=${e}
              .filter=${a}
              .onPick=${t=>{o.includes(t)||i([...o,t]),e.closeSheet()}}
            ></sn-entity-picker>`})}
      >
        <sn-icon icon="plus" style="--icon-size:16px"></sn-icon>${e.t("add")}
      </button>
    </div>
    ${o.length?c:n`<span class="hint">${e.t("auto_all")}</span>`}
  </div>`}function Pe(e,t,s){return n`<label class="field"
    >${e.t("widget_title")}
    <input type="text" .value=${s??""} @change=${s=>qe(e,t,(e=>e.config.title=s.target.value.trim()||void 0))} />
  </label>`}function Be(e,t){return n`<label class="field"
    >${e.t("display_name")}
    <input
      type="text"
      .value=${e.config.names[t]??""}
      placeholder=${e.hass.states[t]?.attributes.friendly_name??t}
      @change=${s=>e.update((e=>{const a=s.target.value.trim();a?e.names[t]=a:delete e.names[t]}))}
    />
    <span class="hint">${e.t("display_name_hint")}</span>
  </label>`}const Te={camera:{domains:["camera"]},vacuum:{domains:["vacuum"]},todo:{domains:["todo"]},gauge:{domains:["sensor"]},gate:{domains:["cover"]},media:{domains:["media_player"]},remote:{domains:["remote","media_player"]}};function qe(e,t,s){e.update((e=>{const a=X(e,t);a&&s(a,e)}))}function Ae(e,t,s){e.showSheet({still:!0,title:e.t("widget_settings"),render:e=>{const t=X(e.config,s);if(!t)return n``;const a=e.t;switch(t.type){case"tile":case"camera":case"vacuum":case"media":case"remote":return De(Ie(e,a("entity"),t.config.entity,Te[t.type]??{},(t=>qe(e,s,(e=>e.config.entity=t)))),t.config.entity?Be(e,t.config.entity):c);case"gauge":return De(Ie(e,a("entity"),t.config.entity,{domains:["sensor"]},(t=>qe(e,s,(e=>e.config.entity=t)))),n`<div class="row" style="display:flex;gap:8px">
              ${["min","max","low"].map((i=>n`<label class="field" style="flex:1"
                  >${"low"===i?a("gauge_low")+" %":i}
                  <input type="number" .value=${String(t.config[i]??("max"===i?100:"low"===i?20:0))} @change=${t=>qe(e,s,(e=>e.config[i]=Number(t.target.value)))} />
                </label>`))}
            </div>`,e.allows("refill")?n`<label class="field"
                  >${a("refill_phone")}
                  <input type="tel" class="ltr" placeholder="972501234567" .value=${t.config.supplier??""} @change=${t=>qe(e,s,(e=>e.config.supplier=t.target.value.trim()||void 0))} />
                  <span class="hint">${a("refill_hint")}</span>
                </label>`:c);case"gate":return De(Ie(e,a("widget_gate"),t.config.entity,{domains:["cover"]},(t=>qe(e,s,(e=>e.config.entity=t)))),Ie(e,a("widget_camera"),t.config.camera,{domains:["camera"]},(t=>qe(e,s,(e=>e.config.camera=t))),!0));case"frigate":return n`<label class="field"
            >Frigate instance ID
            <input type="text" class="ltr" .value=${t.config.instance??"frigate"} @change=${t=>qe(e,s,(e=>e.config.instance=t.target.value.trim()||"frigate"))} />
          </label>`;case"todo":return Ie(e,a("widget_todo"),t.config.entity,{domains:["todo"]},(t=>qe(e,s,(e=>e.config.entity=t))));case"calendar":{const a=Object.keys(e.hass.states).filter((e=>e.startsWith("calendar."))),i=t.config.entities??[];return n`<div style="display:grid;gap:8px">
            ${a.map((t=>{const o=!i.length||i.includes(t);return n`<button
                class="btn pressable ${o?"primary":""}"
                style="justify-content:flex-start;font-weight:500"
                @click=${()=>qe(e,s,(e=>{const s=e.config.entities?.length?e.config.entities:[...a];e.config.entities=o?s.filter((e=>e!==t)):[...s,t]}))}
              >
                <sn-icon icon=${o?"check":"close"} style="--icon-size:18px"></sn-icon>${l(e.hass,e.config,t)}
              </button>`}))}
          </div>`}case"countdown":{const i=t.config.events??[];return De(n`<div class="field">${a("next_ramadan")} / ${a("next_eid")} ${He(e,t.config.islamic??"ar"===e.lang,(t=>qe(e,s,(e=>e.config.islamic=t))))}</div>`,...i.map(((t,i)=>n`<div style="display:flex;gap:8px;align-items:center">
                <span style="flex:1">${t.title}</span><span class="muted ltr">${t.date}</span>
                <button class="icon-btn small pressable" aria-label=${a("delete")} @click=${()=>qe(e,s,(e=>e.config.events.splice(i,1)))}>
                  <sn-icon icon="close" style="--icon-size:16px"></sn-icon>
                </button>
              </div>`)),n`<form
              style="display:grid;gap:8px"
              @submit=${t=>{t.preventDefault();const a=t.currentTarget,i=a.elements.namedItem("title").value.trim(),n=a.elements.namedItem("date").value;i&&n&&(qe(e,s,(e=>e.config.events=[...e.config.events??[],{title:i,date:n}])),a.reset())}}
            >
              <input name="title" type="text" placeholder=${a("event_title")} />
              <input name="date" type="date" />
              <button class="btn primary pressable" type="submit" style="justify-self:start">${a("add_event")}</button>
            </form>`)}case"energy_stats":{const i=ee(e.hass),l=(n,l)=>Ie(e,a(l),t.config[n]??i[n],{domains:["sensor"],deviceClasses:["energy"]},(t=>qe(e,s,(e=>e.config[n]=t))),!0);return De(l("total","e_total_energy"),l("solar","e_solar_energy"),n`<label class="field"
              >${a("tariff")}
              <input type="number" step="0.01" min="0" .value=${String(t.config.tariff??.6)} @change=${t=>qe(e,s,(e=>e.config.tariff=Number(t.target.value)||0))} />
            </label>`,n`<label class="field"
              >${a("bill_budget")}
              <input type="number" min="0" .value=${String(t.config.budget??"")} placeholder="–" @change=${t=>qe(e,s,(e=>e.config.budget=Number(t.target.value)||void 0))} />
            </label>`,n`<label class="field"
              >${a("currency")}
              <input type="text" maxlength="4" .value=${t.config.currency??"₪"} @change=${t=>qe(e,s,(e=>e.config.currency=t.target.value.trim()||"₪"))} />
            </label>`)}case"energy":{const i=Z(e.hass),l=(n,l,o)=>Ie(e,a(l),t.config[n]??i[n],{domains:["sensor"],deviceClasses:o},(t=>qe(e,s,(e=>e.config[n]=t))),!0),o=i=>n`<div class="field">${a("e_flip")} ${He(e,!!t.config[i],(t=>qe(e,s,(e=>e.config[i]=t))))}</div>`;return De(l("solar","e_solar_entity",["power"]),l("grid","e_grid_entity",["power"]),o("flip_grid"),l("battery","e_battery_entity",["power"]),o("flip_battery"),l("soc","e_soc_entity",["battery"]),l("home","e_home_entity",["power"]))}case"room":{const i=Object.values(e.hass.areas??{});return De(n`<label class="field"
              >${a("room_area")}
              <select @change=${t=>qe(e,s,(e=>e.config.area=t.target.value||void 0))}>
                <option value="">–</option>
                ${i.map((e=>n`<option value=${e.area_id} ?selected=${t.config.area===e.area_id}>${e.name}</option>`))}
              </select>
            </label>`,n`<label class="field">${a("room_name")}<input type="text" .value=${t.config.name??""} @change=${t=>qe(e,s,(e=>e.config.name=t.target.value.trim()||void 0))} /></label>`,n`<label class="field"
              >${a("room_photo")}
              <input
                type="file"
                accept="image/*"
                @change=${async t=>{const i=t.target.files?.[0];if(i)try{const t=await d(e.hass,i);qe(e,s,(e=>e.config.photo=t))}catch{e.toast(a("error"))}}}
              />
            </label>`)}case"water":{const i=Y(e.hass),n=(n,l,o)=>Ie(e,a(l),t.config[n]??i[n],o,(t=>qe(e,s,(e=>e.config[n]=t))),!0);return De(n("usage","water_usage",{domains:["sensor"],deviceClasses:["water"]}),n("tank","water_tank",{domains:["sensor"]}),n("valve","water_valve",{domains:["valve","switch"]}))}case"ac":return Ie(e,a("entity"),t.config.entity,{domains:["climate"]},(t=>qe(e,s,(e=>e.config.entity=t))));case"sensor":return De(Ie(e,a("entity"),t.config.entity,{domains:["sensor"]},(t=>qe(e,s,(e=>e.config.entity=t)))),t.config.entity?Be(e,t.config.entity):c);case"batteries":return n`<label class="field"
            >${a("bat_low_at")}
            <input type="number" min="5" max="60" .value=${String(t.config.low??20)} @change=${t=>qe(e,s,(e=>e.config.low=Number(t.target.value)||20))} />
          </label>`;case"folder":return De(Pe(e,s,t.config.title),We(e,a("widget_folder"),t.config.entities,{domains:["light","switch","fan","cover","climate","lock","media_player","input_boolean","scene","script"]},(t=>qe(e,s,(e=>e.config.entities=t)))));case"scenes":return De(Pe(e,s,t.config.title),We(e,a("widget_scenes"),t.config.entities,{domains:["scene","script"]},(t=>qe(e,s,(e=>e.config.entities=t)))));case"lights":case"covers":{const i=Object.values(e.hass.areas??{});return De(Pe(e,s,t.config.title),n`<label class="field"
              >${a("room_area")}
              <select @change=${t=>qe(e,s,(e=>e.config.area=t.target.value||void 0))}>
                <option value="">${a("area_all")}</option>
                ${i.map((e=>n`<option value=${e.area_id} ?selected=${t.config.area===e.area_id}>${e.name}</option>`))}
              </select>
            </label>`,We(e,a("lights"===t.type?"widget_lights":"widget_covers"),t.config.entities,{domains:["lights"===t.type?"light":"cover"]},(t=>qe(e,s,(e=>e.config.entities=t)))))}case"boiler":return Ie(e,a("boiler_pick"),t.config.entity,{domains:["switch","water_heater","input_boolean","light"]},(t=>qe(e,s,(e=>e.config.entity=t))));case"irrigation":return Ie(e,a("widget_irrigation"),t.config.entity,{domains:["valve","switch","input_boolean"]},(t=>qe(e,s,(e=>e.config.entity=t))));case"air":return De(Ie(e,a("air_purifier"),t.config.purifier,{domains:["fan","humidifier","switch","climate"]},(t=>qe(e,s,(e=>e.config.purifier=t))),!0),We(e,a("air_sensors"),t.config.entities,{domains:["sensor"]},(t=>qe(e,s,(e=>e.config.entities=t)))));case"commute":return We(e,a("widget_commute"),t.config.entities,{domains:["sensor"]},(t=>qe(e,s,(e=>e.config.entities=t))));case"timeline":return Ie(e,a("widget_camera"),t.config.camera,{domains:["camera"]},(t=>qe(e,s,(e=>e.config.camera=t))),!0);case"heading":return n`<label class="field"
            >${a("heading_text")}
            <input type="text" .value=${t.config.text??""} @change=${t=>qe(e,s,(e=>e.config.text=t.target.value))} />
          </label>`;case"floorplan":return De(n`<div class="field">
              ${a("plan_in_dark")}
              <div class="seg">
                ${[!1,!0].map((i=>n`<button aria-pressed=${!!t.config.invert_dark===i} @click=${()=>qe(e,s,(e=>e.config.invert_dark=i))}>
                    ${a(i?"plan_invert":"plan_original")}
                  </button>`))}
              </div>
            </div>`,e.allows("sun_on_plan")?n`<label class="field"
                  >${a("plan_north")}
                  <input type="number" min="0" max="359" step="5" .value=${String(t.config.north??0)} @change=${t=>qe(e,s,(e=>e.config.north=(Number(t.target.value)||0)%360))} />
                  <span class="hint">${a("plan_north_hint")}</span>
                </label>`:c,n`<p class="muted" style="margin:0;font-size:14px">${a("drag_hint")}</p>`);default:return n`<p class="muted">${a(`widget_${t.type}`)}</p>`}}})}const Re=[{type:"tile",icon:"lightbulb"},{type:"floorplan",icon:"layers"},{type:"camera",icon:"cctv"},{type:"modes",icon:"leave"},{type:"vacuum",icon:"robot-vacuum"},{type:"visitors",icon:"doorbell"},{type:"energy",icon:"solar"},{type:"energy_stats",icon:"lightning-bolt"},{type:"check",icon:"night"},{type:"panic",icon:"alert-circle-outline"},{type:"family",icon:"family"},{type:"todo",icon:"todo"},{type:"calendar",icon:"calendar"},{type:"forecast",icon:"w-partlycloudy"},{type:"countdown",icon:"countdown"},{type:"gauge",icon:"gas"},{type:"gate",icon:"gate"},{type:"frigate",icon:"cctv"},{type:"schedule",icon:"schedule"},{type:"media",icon:"speaker"},{type:"remote",icon:"television"},{type:"consumers",icon:"lightning-bolt"},{type:"water",icon:"water"},{type:"wake",icon:"weather-sunset-up"},{type:"chores",icon:"star"},{type:"air",icon:"leaf"},{type:"boiler",icon:"water-boiler"},{type:"irrigation",icon:"sprinkler"},{type:"timeline",icon:"history"},{type:"internet",icon:"wifi"},{type:"board",icon:"note"},{type:"verse",icon:"book-open-variant"},{type:"radar",icon:"weather-pouring"},{type:"commute",icon:"car"},{type:"parcels",icon:"package"},{type:"hero",icon:"home"},{type:"stack",icon:"layers"},{type:"room",icon:"sofa"},{type:"ac",icon:"air-conditioner"},{type:"scenes",icon:"palette"},{type:"sensor",icon:"chart-line"},{type:"batteries",icon:"battery"},{type:"lights",icon:"lightbulb-group"},{type:"covers",icon:"blinds"},{type:"prayer",icon:"mosque"},{type:"folder",icon:"folder"},{type:"clock",icon:"clock-outline"},{type:"heading",icon:"title"}],Fe=["clock","hero","verse","forecast","consumers","energy_stats","energy","air","water","board","commute","modes","family","countdown"];function Ee(e,t){const s=(e,s,a)=>{let i="";return e.update((e=>{const n=e.pages.find((e=>e.id===t));if(!n)return;const l=M(s,a,{y:te(n.widgets)});i=l.id,n.widgets=se([...n.widgets,l])})),i};e.showSheet({still:!0,title:e.t("add_widget"),render:e=>n`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px">
      ${Re.map((t=>e.allows(C(t.type))?n`<button
          class="glass pressable"
          style="display:grid;gap:10px;justify-items:center;padding:20px 12px;border-radius:var(--r-md);font-weight:500"
          @click=${()=>{if(["tile","camera","vacuum","gauge","gate","media","remote"].includes(t.type))return void e.showSheet({still:!0,title:e.t("choose_entity"),render:e=>n`<sn-entity-picker
                  .ctx=${e}
                  .filter=${Te[t.type]??{}}
                  .onPick=${a=>{s(e,t.type,{entity:a}),e.closeSheet(),e.closeSheet()}}
                ></sn-entity-picker>`});const a="floorplan"===t.type?{floors:[W(e.t("floor_default"))]}:"heading"===t.type?{text:""}:{},i=s(e,t.type,a);e.closeSheet(),"heading"===t.type&&Ae(e,0,i)}}
        >
          ${Fe.includes(t.type)&&e.allows("live_gallery")?function(e,t){const s=I[t],a=Math.min(560,60*s.w),i=Math.min(420,56*s.h),l=Math.min(150/a,96/i),o=ae(`sn-w-${t.replace(/_/g,"-")}`),r={id:`preview-${t}`,type:t,x:0,y:0,w:s.w,h:s.h,config:{}};return n`<span style="position:relative;display:block;width:${a*l}px;height:${i*l}px;pointer-events:none;border-radius:14px;overflow:hidden" aria-hidden="true">
    <span style="position:absolute;top:0;left:0;width:${a}px;height:${i}px;transform:scale(${l});transform-origin:0 0;direction:${e.rtl?"rtl":"ltr"}">
      ${ie`<${o} .ctx=${e} .widget=${r}></${o}>`}
    </span>
  </span>`}(e,t.type):n`<span style="display:grid;place-items:center;width:52px;height:52px;border-radius:999px;background:var(--accent);color:var(--on-accent)">
                <sn-icon .icon=${t.icon}></sn-icon>
              </span>`}
          ${e.t(`widget_${t.type}`)}
          <span class="muted ltr" style="font-size:12px">${I[t.type].w}×${I[t.type].h}</span>
        </button>`:n`<div
          class="glass"
          style="display:grid;gap:10px;justify-items:center;padding:20px 12px;border-radius:var(--r-md);font-weight:500;opacity:.55"
          title=${e.t("plan_needed",{plan:e.t(`plan_${P(C(t.type))}`)})}
        >
          <span style="display:grid;place-items:center;width:52px;height:52px;border-radius:999px;background:var(--surface-2)"><sn-icon icon="lock"></sn-icon></span>
          ${e.t(`widget_${t.type}`)}
          <span style="font-size:12px;color:var(--accent-text)">${e.t("plan_needed",{plan:e.t(`plan_${P(C(t.type))}`)})}</span>
        </div>`))}
    </div>`})}function Le(e,t){e.showSheet({still:!0,title:e.t("add_page"),render:e=>Ce(e.t("choose_template"),n`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px">
        ${O.map((s=>n`<button
            class="glass pressable"
            style="display:grid;gap:10px;justify-items:center;padding:20px 12px;border-radius:var(--r-md);font-weight:500"
            @click=${()=>{const a=D(s.id,e.hass,e.config,e.t);e.update((e=>e.pages.push(a))),e.closeSheet(),t(a.id)}}
          >
            <span style="display:grid;place-items:center;width:52px;height:52px;border-radius:999px;background:var(--surface-2)">
              <sn-icon .icon=${s.icon}></sn-icon>
            </span>
            ${e.t(s.label)}
          </button>`))}
      </div>`)})}function Ue(e,t,s){const a=(e,s)=>e.update((e=>{const a=e.pages.findIndex((e=>e.id===t));a>=0&&s(e,a)}));e.showSheet({still:!0,title:e.t("page_settings"),render:e=>{const i=e.config.pages.findIndex((e=>e.id===t)),o=e.config.pages[i];if(!o)return n``;const r=e.t,p=t=>a(e,((e,s)=>{const a=s+t;a<0||a>=e.pages.length||([e.pages[s],e.pages[a]]=[e.pages[a],e.pages[s]])}));return De(n`<label class="field"
          >${r("page_title")}
          <input type="text" .value=${o.title} @change=${t=>a(e,((e,s)=>e.pages[s].title=t.target.value.trim()||o.title))} />
        </label>`,n`<div class="field">
          ${r("page_icon")}
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(48px,1fr));gap:6px">
            ${T.map((t=>n`<button
                class="icon-btn pressable ${o.icon===t?"primary":""}"
                style="width:100%;border-radius:var(--r-sm)"
                aria-pressed=${o.icon===t}
                @click=${()=>a(e,((e,s)=>e.pages[s].icon=t))}
              >
                <sn-icon .icon=${t}></sn-icon>
              </button>`))}
          </div>
        </div>`,e.allows("person_pages")&&Object.keys(e.hass.states).some((e=>e.startsWith("person.")))?n`<label class="field"
              >${r("page_person")}
              <select @change=${t=>a(e,((e,s)=>t.target.value?e.pages[s].person=t.target.value:delete e.pages[s].person))}>
                <option value="" ?selected=${!o.person}>${r("page_person_all")}</option>
                ${Object.keys(e.hass.states).filter((e=>e.startsWith("person."))).map((t=>n`<option value=${t} ?selected=${o.person===t}>${l(e.hass,e.config,t)}</option>`))}
              </select>
              <span class="hint">${r("page_person_hint")}</span>
            </label>`:c,Me(n`<button class="btn pressable" ?disabled=${0===i} @click=${()=>p(-1)}>${r("move_earlier")}</button>`,n`<button class="btn pressable" ?disabled=${i===e.config.pages.length-1} @click=${()=>p(1)}>${r("move_later")}</button>`,n`<span style="flex:1"></span>`,n`<button
            class="btn danger pressable"
            ?disabled=${e.config.pages.length<=1}
            @click=${()=>{confirm(r("delete_confirm"))&&(a(e,((e,s)=>{e.pages.splice(s,1),e.settings.default_page===t&&(e.settings.default_page=e.pages[0]?.id??"")})),e.closeSheet(),s())}}
          >
            <sn-icon icon="delete" style="--icon-size:20px"></sn-icon>${r("delete")}
          </button>`))}})}function He(e,t,s){return n`<div class="seg">
    ${[!0,!1].map((a=>n`<button aria-pressed=${t===a} @click=${()=>s(a)}>${e.t(a?"on":"off")}</button>`))}
  </div>`}function Je(e,t,s,a,i){return n`<label class="field"
    >${e}
    <input type="number" min=${s} max=${a} .value=${String(t)} @change=${e=>i(Math.min(a,Math.max(s,Number(e.target.value)||0)))} />
  </label>`}const Ve=[L,"#18BCF2","#2FB57A","#F26B68","#A78BFA","#F5BE6A"],Ge=[{id:"schedule",label:"theme_schedule"},{id:"auto",label:"theme_auto"},{id:"light",label:"theme_light"},{id:"dark",label:"theme_dark"},{id:"midnight",label:"theme_midnight"}];function Ke(t,s){t.showSheet({still:!0,title:t.t("settings"),render:t=>{const a=t.config.settings,i=t.t,o=e=>t.update(e);return De(t.allows("autobuild")?n`<button class="btn primary pressable" style="min-height:56px;font-size:16px" @click=${()=>(e=>e.showSheet({still:!0,title:e.t("ab_title"),render:e=>n`<sn-autobuild .ctx=${e}></sn-autobuild>`}))(t)}>
              <sn-icon icon="auto-fix" style="--icon-size:22px"></sn-icon>${i("ab_title")}
            </button>`:c,n`<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          <button class="btn pressable" @click=${()=>function(e){e.showSheet({title:e.t("health"),render:e=>{const{hass:t,t:s,config:a}=e,i=Object.values(t.states),o=s("h_all_good"),r=new Set(u(a)),p=i.filter((e=>"unavailable"===e.state&&r.has(e.entity_id))).sort(((e,t)=>e.last_changed.localeCompare(t.last_changed))),d=i.filter((e=>{if("battery"!==e.attributes.device_class)return!1;if("binary_sensor"===m(e.entity_id))return"on"===e.state;const t=Number(e.state);return"sensor"===m(e.entity_id)&&!Number.isNaN(t)&&t<20})).sort(((e,t)=>Number(e.state)-Number(t.state))),g=i.find((e=>/backup_last_successful_automatic_backup$/.test(e.entity_id))),w=g?Date.parse(g.state):NaN,k=Number.isNaN(w)?void 0:Math.floor((Date.now()-w)/864e5),z=i.filter((e=>"update"===m(e.entity_id)&&"on"===e.state)),S=xe(i,/disk_use_percent|disk_usage/),j=xe(i,/processor_temperature|cpu_temperature/),N=xe(i,/memory_use_percent|memory_usage/),O=[S&&_e(s("h_disk"),h(`${y(Number(S.state),e.lang,0)}%`)),j&&_e(s("h_cpu_temp"),h(`${y(Number(j.state),e.lang,0)}°`)),N&&_e(s("h_memory"),h(`${y(Number(N.state),e.lang,0)}%`))].filter(Boolean),D=S&&Number(S.state)>85||j&&Number(j.state)>75,M=[...r].filter((e=>"vacuum"===m(e)&&t.states[e])),C=M.flatMap((e=>{const i=f(t,e);return $.filter((e=>i.parts[e.key])).flatMap((n=>{const o=b(t.states[i.parts[n.key]]);return void 0!==o&&o/n.life<.15?[{robot:l(t,a,e),part:s(n.label),h:o}]:[]}))})),I=v(t).map((e=>{const s=Object.values(t.entities??{}).filter((t=>t.device_id===e.deviceId)),a=e=>e.translation_key??e.entity_id.split(".")[1],i=s.find((e=>e.entity_id.startsWith("sensor.")&&/battery/.test(a(e)))),n=s.find((e=>e.entity_id.startsWith("binary_sensor.")&&/plugged/.test(a(e)))),l=s.find((e=>e.entity_id.startsWith("button.")&&/load_start_url|restart_browser/.test(a(e))));return{tab:e,battery:i&&t.states[i.entity_id],plugged:n&&t.states[n.entity_id],reload:l?.entity_id}}));return n`<div style="display:grid;gap:12px">
        ${be(s("h_offline"),!p.length,ve(p.map((e=>_e(l(t,a,e.entity_id),_(s,e.last_changed))))),o)}
        ${be(s("h_battery"),!d.length,ve(d.map((e=>_e(l(t,a,e.entity_id),"sensor"===m(e.entity_id)?h(`${e.state}%`):"!")))),o)}
        ${g?be(s("h_backup"),void 0!==k&&k<=7,ve([_e(s("h_backup"),void 0===k?"–":s("h_days_ago",{n:k}))]),0===k?s("today"):s("h_days_ago",{n:k??0})):be(s("h_backup"),!1,n`<span class="muted" style="font-size:14px">${s("h_backup_missing")}</span>`,"")}
        ${be(s("h_updates"),!z.length,ve(z.map((e=>_e(e.attributes.title??e.attributes.friendly_name??e.entity_id,e.attributes.latest_version??"")))),o)}
        ${O.length?be(s("h_system"),!D,ve(O),"",!0):c}
        ${M.length?be(s("h_robot_parts"),!C.length,ve(C.map((t=>_e(`${t.robot} · ${t.part}`,s("hours_left",{n:h(y(t.h,e.lang,0))}))))),o):c}
        ${I.length?n`<section style="display:grid;gap:8px;padding:14px 16px;border-radius:var(--r-md);background:var(--surface-2)">
              <div style="font-weight:700">${s("h_tablets")}</div>
              ${I.map((a=>n`<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
                  <strong style="flex:1">${a.tab.name}</strong>
                  ${a.battery?n`<span class="muted ltr">${a.battery.state}%</span>`:c}
                  ${a.plugged?n`<span class="muted">${s("on"===a.plugged.state?"h_charging":"h_not_charging")}</span>`:c}
                  ${a.reload?n`<button class="btn pressable" @click=${()=>t.callService("button","press",{entity_id:a.reload}).then((()=>e.toast(s("done")))).catch((()=>e.toast(s("error"))))}>
                        ${s("h_reload")}
                      </button>`:c}
                </div>`))}
            </section>`:c}
        ${e.config.settings.maintenance.length?(()=>{const t=x(e.config),a=t.filter((e=>e.days<=7));return be(s("maintenance"),!a.length,ve(t.sort(((e,t)=>e.days-t.days)).map((e=>_e(e.title,e.days<0?s("m_overdue",{n:-e.days}):s("m_in",{n:e.days}))))),o)})():c}
        <sn-explain .ctx=${e} .offline=${p} .low=${d}></sn-explain>
        ${e.allows("battery_plan")?n`<sn-battery-plan .ctx=${e}></sn-battery-plan>`:c}
        ${e.allows("warranty")?n`<sn-warranty .ctx=${e}></sn-warranty>`:c}
        <sn-faults .ctx=${e}></sn-faults>
        <p class="muted" style="margin:4px 0 0;font-size:13px">${s("h_telegram")}</p>
      </div>`}})}(t)}><sn-icon icon="gauge" style="--icon-size:20px"></sn-icon>${i("health")}</button>
          ${t.allows("automations")?n`<button class="btn pressable" @click=${()=>V(t)}><sn-icon icon="automation" style="--icon-size:20px"></sn-icon>${i("automations")}</button>`:c}
          <button class="btn pressable" @click=${()=>G(t)}><sn-icon icon="key" style="--icon-size:20px"></sn-icon>التراخيص</button>
          ${t.allows("history")?n`<button class="btn pressable" @click=${()=>K(t)}><sn-icon icon="history" style="--icon-size:20px"></sn-icon>${i("history")}</button>`:c}
          ${t.allows("report")?n`<button class="btn pressable" @click=${()=>Q(t,t.assetBase).catch((()=>t.toast(i("error"))))}><sn-icon icon="file-chart" style="--icon-size:20px"></sn-icon>${i("report")}</button>`:c}
        </div>`,n`<label class="field"
          >${i("home_name")}
          <input
            type="text"
            .value=${a.home_name}
            placeholder=${t.hass.config?.location_name??""}
            @change=${e=>o((t=>t.settings.home_name=e.target.value.trim()))}
          />
        </label>`,n`<div class="field">
          ${i("language")}
          <div class="seg">
            ${J.map((e=>n`<button aria-pressed=${a.language===e.id} @click=${()=>o((t=>t.settings.language=e.id))}>${e.label}</button>`))}
          </div>
        </div>`,n`<div class="field">
          ${i("theme")}
          <div class="seg">
            ${Ge.map((e=>n`<button aria-pressed=${a.theme===e.id} @click=${()=>o((t=>t.settings.theme=e.id))}>${i(e.label)}</button>`))}
          </div>
          ${"schedule"===a.theme?Me(n`<span>${i("dark_from")}</span>`,n`<input type="time" style="width:auto" .value=${a.dark_from} @change=${e=>o((t=>t.settings.dark_from=e.target.value))} />`,n`<span>${i("dark_to")}</span>`,n`<input type="time" style="width:auto" .value=${a.dark_to} @change=${e=>o((t=>t.settings.dark_to=e.target.value))} />`):c}
        </div>`,t.allows("presets")?H(t,o):c,t.allows("style_pro")?n`<div class="field">
              ${i("style")}
              <div class="seg">
                ${["classic","pro"].map((e=>n`<button aria-pressed=${a.style===e} @click=${()=>o((t=>t.settings.style=e))}>${i("pro"===e?"style_pro":"style_classic")}</button>`))}
              </div>
              ${"pro"===a.style?n`<div class="seg" style="margin-top:8px">
                      ${["none","marble","wood","sand","olive"].map((e=>n`<button aria-pressed=${a.material===e} @click=${()=>o((t=>t.settings.material=e))}>${i(`material_${e}`)}</button>`))}
                    </div>
                    <div class="field" style="margin-top:8px">${i("night_midnight")} ${He(t,a.night_midnight,(e=>o((t=>t.settings.night_midnight=e))))}</div>
                    ${t.allows("wallpaper")?n`<div class="field" style="margin-top:8px">
                          ${i("wallpaper")}
                          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
                            ${a.wallpaper?n`<img src=${a.wallpaper} alt="" style="width:64px;height:40px;object-fit:cover;border-radius:8px" />`:c}
                            <input
                              type="file"
                              accept="image/*"
                              style="flex:1"
                              @change=${async e=>{const s=e.target.files?.[0];if(s)try{const e=await d(t.hass,s);o((t=>t.settings.wallpaper=e))}catch{t.toast(i("error"))}}}
                            />
                            ${a.wallpaper?n`<button class="btn pressable" @click=${()=>o((e=>delete e.settings.wallpaper))}>${i("delete")}</button>`:c}
                          </div>
                          ${a.wallpaper?n`<label style="display:flex;gap:8px;align-items:center;font-size:14px"
                                  >${i("wallpaper_dim")}
                                  <input type="range" min="0" max="0.8" step="0.05" .value=${String(a.wallpaper_dim)} @change=${e=>o((t=>t.settings.wallpaper_dim=Number(e.target.value)))} style="flex:1"
                                /></label>
                                <div>${i("accent_from_wallpaper")} ${He(t,a.accent_from_wallpaper,(e=>o((t=>t.settings.accent_from_wallpaper=e))))}</div>`:c}
                        </div>`:c}
                    ${t.allows("window_camera")?Ie(t,i("window_camera"),a.window_camera,{domains:["camera"]},(e=>o((t=>t.settings.window_camera=e))),!0):c}
                    ${t.allows("music_backdrop")?n`<div class="field">${i("music_backdrop")} ${He(t,a.music_backdrop,(e=>o((t=>t.settings.music_backdrop=e))))}</div>`:c}
                    ${t.allows("welcome")?n`<div class="field">${i("welcome_moment")} ${He(t,a.welcome,(e=>o((t=>t.settings.welcome=e))))}</div>`:c}
                    ${t.allows("page_moods")?n`<div class="field">${i("page_moods")} ${He(t,a.page_moods,(e=>o((t=>t.settings.page_moods=e))))}</div>`:c}
                    ${t.allows("season_skin")?n`<div class="field">${i("season_skin")} ${He(t,a.season_skin,(e=>o((t=>t.settings.season_skin=e))))}</div>`:c}
                    ${t.allows("accent_day")?n`<div class="field">${i("accent_day")} ${He(t,a.accent_day,(e=>o((t=>t.settings.accent_day=e))))}</div>`:c}
                    ${t.allows("active_glow")?n`<div class="field">${i("active_glow")} ${He(t,a.active_glow,(e=>o((t=>t.settings.active_glow=e))))}</div>`:c}
                    ${t.allows("aurora")?n`<div class="field">${i("aurora")} ${He(t,a.aurora,(e=>o((t=>t.settings.aurora=e))))}</div>`:c}
                    ${t.allows("monogram")?n`<label class="field"
                          >${i("monogram")}
                          <input type="text" maxlength="30" placeholder="آل محمد" .value=${a.monogram??""} @change=${e=>o((t=>t.settings.monogram=e.target.value.trim()||void 0))} />
                          <span class="hint">${i("monogram_hint")}</span>
                        </label>`:c}
                    ${t.allows("dock")?n`<div class="field" style="margin-top:8px">
                          ${i("nav_style")}
                          <div class="seg">${["tabs","dock"].map((e=>n`<button aria-pressed=${a.nav===e} @click=${()=>o((t=>t.settings.nav=e))}>${i("dock"===e?"nav_dock":"nav_tabs")}</button>`))}</div>
                        </div>`:c}`:c}
              <span class="hint">${i("style_hint")}</span>
            </div>`:c,t.allows("fonts")?n`<label class="field"
              >${i("font")}
              <select @change=${e=>o((t=>t.settings.font=e.target.value))}>
                ${Object.entries(U).map((([e,t])=>n`<option value=${e} ?selected=${(a.font??"rubik")===e} style="font-family:'${t.family}'">${t.label}</option>`))}
              </select>
              <span class="hint">${i("font_hint")}</span>
            </label>`:c,t.allows("icon_styles")?n`<div class="field">
              ${i("icons_style")}
              <div class="seg">${["filled","line"].map((e=>n`<button aria-pressed=${(a.icons??"filled")===e} @click=${()=>o((t=>t.settings.icons=e))}>${i("line"===e?"icons_line":"icons_filled")}</button>`))}</div>
            </div>`:c,t.allows("occasions")?n`<div class="field">${i("occasions")} ${He(t,a.occasions,(e=>o((t=>t.settings.occasions=e))))}</div>`:c,t.allows("burn_in")?n`<div class="field">${i("burn_in")} ${He(t,a.burn_in,(e=>o((t=>t.settings.burn_in=e))))}</div>`:c,n`<div class="field">
          ${i("accent")}
          ${Me(...Ve.map((e=>n`<button
                class="pressable"
                aria-label=${e}
                aria-pressed=${a.accent.toUpperCase()===e}
                style="width:40px;height:40px;border-radius:999px;background:${e};box-shadow:${a.accent.toUpperCase()===e?"0 0 0 3px var(--surface-solid), 0 0 0 5px "+e:"none"}"
                @click=${()=>o((t=>t.settings.accent=e))}
              ></button>`)),n`<input
              type="color"
              aria-label=${i("accent")}
              .value=${a.accent}
              style="width:40px;height:40px;border:0;padding:0;background:none;border-radius:999px"
              @change=${e=>o((t=>t.settings.accent=e.target.value.toUpperCase()))}
            />`)}
        </div>`,t.allows("liquid_glass")?n`<div class="field">
              ${i("glass_style")}
              <div class="seg">
                ${["classic","liquid"].map((e=>n`<button aria-pressed=${a.glass===e} @click=${()=>o((t=>t.settings.glass=e))}>${i(`glass_${e}`)}</button>`))}
              </div>
            </div>`:c,n`<div class="field">${i("night_plan")} ${He(t,a.night_plan,(e=>o((t=>t.settings.night_plan=e))))}</div>`,t.allows("seasons")?n`<div class="field">
              ${i("season")}
              <div class="seg">
                ${["auto","ramadan","eid","off"].map((e=>n`<button aria-pressed=${a.season===e} @click=${()=>o((t=>t.settings.season=e))}>${i("off"===e?"off":`season_${e}`)}</button>`))}
              </div>
            </div>`:c,t.allows("kids")?n`<label class="field"
              >${i("kids_page")}
              <select @change=${e=>o((t=>t.settings.kids_page=e.target.value||void 0))}>
                <option value="" ?selected=${!a.kids_page}>${i("none")}</option>
                ${t.config.pages.map((e=>n`<option value=${e.id} ?selected=${a.kids_page===e.id}>${e.title}</option>`))}
              </select>
            </label>`:c,n`<label class="field"
          >${i("default_page")}
          <select @change=${e=>o((t=>t.settings.default_page=e.target.value))}>
            ${t.config.pages.map((e=>n`<option value=${e.id} ?selected=${a.default_page===e.id}>${e.title}</option>`))}
          </select>
        </label>`,Ce(i("screensaver"),n`<div class="seg">
            ${[!0,!1].map((e=>n`<button aria-pressed=${a.screensaver.enabled===e} @click=${()=>o((t=>t.settings.screensaver.enabled=e))}>
                ${i(e?"on":"off")}
              </button>`))}
          </div>`,a.screensaver.enabled&&t.allows("clock_styles")?n`<div class="field">
                ${i("ss_style")}
                <div class="seg">
                  ${["classic","minimal","analog"].map((e=>n`<button aria-pressed=${a.screensaver.style===e} @click=${()=>o((t=>t.settings.screensaver.style=e))}>${i(`ss_${e}`)}</button>`))}
                </div>
              </div>`:c,a.screensaver.enabled?n`<label class="field"
                  >${i("screensaver_after")}
                  <input
                    type="number"
                    min="1"
                    max="120"
                    .value=${String(a.screensaver.timeout_min)}
                    @change=${e=>o((t=>t.settings.screensaver.timeout_min=Math.max(1,Number(e.target.value)||5)))}
                  />
                </label>
                ${Ie(t,i("temp_entity"),a.screensaver.temp_entity,{domains:["sensor","climate","weather"]},(e=>o((t=>t.settings.screensaver.temp_entity=e))),!0)}
                <div class="field">${i("photos")} ${He(t,a.screensaver.photos,(e=>o((t=>t.settings.screensaver.photos=e))))}</div>
                ${a.screensaver.photos?n`<label class="field"
                        >${i("photo_folder")}
                        <input
                          type="text"
                          class="ltr"
                          .value=${a.screensaver.photo_folder}
                          @change=${e=>o((t=>t.settings.screensaver.photo_folder=(e.target.value.trim().startsWith("media-source://")?e.target.value.trim():e.target.value.trim().replace(/^\/+|\/+$/g,""))||"smartnest-photos"))}
                        />
                        <span class="hint">${i("photos_hint",{folder:a.screensaver.photo_folder})}</span>
                      </label>
                      ${Je(i("photo_seconds"),a.screensaver.photo_seconds,5,600,(e=>o((t=>t.settings.screensaver.photo_seconds=e))))}`:c}`:c),Ce(i("greet_morning")+" ☀️",n`<label class="field"
            >${i("greeting_name")}
            <input
              type="text"
              .value=${a.greeting_name}
              placeholder=${t.hass.user?.name??""}
              @change=${e=>o((t=>t.settings.greeting_name=e.target.value.trim()))}
            />
            <span class="hint">${i("greeting_name_hint")}</span>
          </label>`,n`<div class="field">${i("prayer")} ${He(t,a.prayer,(e=>o((t=>t.settings.prayer=e))))}</div>`,n`<div class="field">${i("morning_summary")} ${He(t,a.morning,(e=>o((t=>t.settings.morning=e))))}</div>`),Ce(i("hidden_devices"),function(e,t,s){const a=e.fullHass??e.hass;return n`<span class="hint" style="margin-top:-4px">${e.t("hidden_hint")}</span>
    <div style="display:flex;gap:6px;flex-wrap:wrap">
      ${t.map((i=>n`<button class="btn pressable" style="min-height:36px;font-size:14px" title=${e.t("hidden_show")} @click=${()=>s(t.filter((e=>e!==i)))}>
          <sn-icon icon="eye-off" style="--icon-size:16px"></sn-icon>${l(a,e.config,i)}<sn-icon icon="close" style="--icon-size:14px"></sn-icon>
        </button>`))}
      <button
        class="btn primary pressable"
        style="min-height:36px;font-size:14px"
        @click=${()=>e.showSheet({still:!0,title:e.t("hidden_add"),render:e=>n`<sn-entity-picker
              .ctx=${e}
              .filter=${{}}
              .onPick=${a=>{s([...t.filter((e=>e!==a)),a]),e.closeSheet()}}
            ></sn-entity-picker>`})}
      >
        <sn-icon icon="plus" style="--icon-size:16px"></sn-icon>${e.t("hidden_add")}
      </button>
    </div>`}(t,a.hidden,(e=>o((t=>t.settings.hidden=e))))),Ce(i("status_bar"),n`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px">
            ${E.map((e=>{const t=!a.chips_hidden.includes(e.id);return n`<button
                class="btn pressable ${t?"primary":""}"
                style="justify-content:flex-start;font-weight:500"
                aria-pressed=${t}
                @click=${()=>o((s=>{const a=new Set(s.settings.chips_hidden);t?a.add(e.id):a.delete(e.id),s.settings.chips_hidden=[...a]}))}
              >
                <sn-icon icon=${t?"check":"close"} style="--icon-size:18px"></sn-icon>${i(e.label)}
              </button>`}))}
          </div>`,Ie(t,i("power_entity"),a.power_entity,{domains:["sensor"],deviceClasses:["power"]},(e=>o((t=>t.settings.power_entity=e))),!0),t.allows("tou")?n`<div class="field">
                ${i("tou")} ${He(t,a.tou.enabled,(e=>o((t=>t.settings.tou.enabled=e))))}
                ${a.tou.enabled?n`${Me(n`<span>🌙 ${i("tou_cheap")}</span>`,n`<input type="time" style="width:auto" .value=${a.tou.cheap_from} @change=${e=>o((t=>t.settings.tou.cheap_from=e.target.value))} />`,n`<span>←</span>`,n`<input type="time" style="width:auto" .value=${a.tou.cheap_to} @change=${e=>o((t=>t.settings.tou.cheap_to=e.target.value))} />`)}
                    ${Me(n`<span>⚡ ${i("tou_peak")}</span>`,n`<input type="time" style="width:auto" .value=${a.tou.peak_from} @change=${e=>o((t=>t.settings.tou.peak_from=e.target.value))} />`,n`<span>←</span>`,n`<input type="time" style="width:auto" .value=${a.tou.peak_to} @change=${e=>o((t=>t.settings.tou.peak_to=e.target.value))} />`)}`:c}
              </div>`:c,t.allows("overload")?n`<label class="field"
                >${i("power_limit")}
                <input type="number" min="0" step="100" class="ltr" .value=${String(a.power_limit??"")} placeholder="6000" @change=${e=>o((t=>t.settings.power_limit=Number(e.target.value)||void 0))} />
                <span class="hint">${i("power_limit_hint")}</span>
              </label>`:c),t.allows("guests")?Ce(i("guests_mode"),n`<label class="field">${i("guests_welcome")}<input type="text" .value=${a.guests.welcome??""} placeholder=${i("welcome_default")} @change=${e=>o((t=>t.settings.guests.welcome=e.target.value.trim()||void 0))} /></label>`,n`<label class="field">${i("wifi_ssid")}<input type="text" class="ltr" .value=${a.guests.ssid??""} @change=${e=>o((t=>t.settings.guests.ssid=e.target.value.trim()||void 0))} /></label>`,n`<label class="field">${i("wifi_password")}<input type="text" class="ltr" autocomplete="off" .value=${a.guests.password??""} @change=${e=>o((t=>t.settings.guests.password=e.target.value||void 0))} /></label>`):c,Ce(i("sound_motion"),t.allows("ui_sounds")?n`<div class="field">${i("ui_sounds")} ${He(t,a.sounds,(e=>o((t=>t.settings.sounds=e))))}</div>`:c,n`<div class="field">
            ${i("bell_tone")}
            <div class="seg">
              ${["chime","dingdong","melody"].map((t=>n`<button
                  aria-pressed=${a.doorbell_tone===t}
                  @click=${()=>{o((e=>e.settings.doorbell_tone=t)),e((()=>import("./app-envzMgej.js").then((e=>e.ad))),[]).then((e=>e.playBell(t)))}}
                >
                  ${i(`bell_${t}`)}
                </button>`))}
            </div>
          </div>`,t.allows("motion_levels")?n`<div class="field">
                ${i("motion")}
                <div class="seg">${["full","light","off"].map((e=>n`<button aria-pressed=${a.motion===e} @click=${()=>o((t=>t.settings.motion=e))}>${i(`motion_${e}`)}</button>`))}</div>
                <span class="hint">${i("motion_hint")}</span>
              </div>`:c,t.allows("high_contrast")?n`<div class="field">${i("high_contrast")} ${He(t,!!a.contrast,(e=>o((t=>t.settings.contrast=e))))}</div>`:c),t.allows("travel")?function(e,t){const{t:s,hass:a,config:i}=e,o=i.settings.travel,r=u(i).filter((e=>a.states[e])),p=r.filter((e=>["switch","valve","water_heater","climate","media_player","fan","humidifier"].includes(m(e)))),d=r.filter((e=>"light"===m(e))),g=Object.keys(a.services?.notify??{}).filter((e=>"send_message"!==e&&"persistent_notification"!==e)).map((e=>`notify.${e}`)),h=(e,s,o)=>n`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:8px">
    ${e.map((e=>{const r=s.includes(e);return n`<button
        class="btn pressable ${r?"primary":""}"
        style="justify-content:flex-start;font-weight:500"
        aria-pressed=${r}
        @click=${()=>t((t=>t.settings.travel[o]=r?t.settings.travel[o].filter((t=>t!==e)):[...t.settings.travel[o],e]))}
      >
        <sn-icon icon=${r?"check":"close"} style="--icon-size:18px"></sn-icon>${l(a,i,e)}
      </button>`}))}
  </div>`;return Ce(s("travel"),n`<span class="field">${s("travel_off_pick")}</span>`,h(p,o.off,"off"),n`<div class="field">${s("travel_sim")} ${He(e,o.simulate,(e=>t((t=>t.settings.travel.simulate=e))))}</div>`,o.simulate?h(d,o.lights,"lights"):c,n`<div class="field">${s("travel_arm")} ${He(e,o.arm,(e=>t((t=>t.settings.travel.arm=e))))}</div>`,n`<label class="field"
      >${s("travel_report")}
      <select @change=${e=>t((t=>t.settings.travel.notify=e.target.value||void 0))}>
        <option value="" ?selected=${!o.notify}>–</option>
        ${g.map((e=>n`<option value=${e} ?selected=${o.notify===e}>${e}</option>`))}
      </select>
    </label>`)}(t,o):c,t.allows("home_helpers")?function(e,t){const{t:s,hass:a,config:i}=e,o=i.settings,r=Object.values(a.states),c=(e,t)=>r.filter((s=>s.entity_id.startsWith(`${e}.`)&&(!t||t.includes(s.attributes.device_class)))).map((e=>e.entity_id)),p=c("sensor",["power"]).sort(((e,t)=>Number(/wash|dry|dish|غسال|نشاف|جلاي/i.test(l(a,i,t)+t))-Number(/wash|dry|dish|غسال|نشاف|جلاي/i.test(l(a,i,e)+e)))),d=r.filter((e=>e.entity_id.endsWith("_direction_of_travel"))).length,g=(e,t,...a)=>n`<div style="display:grid;gap:8px;padding:12px;border-radius:var(--r-md);background:var(--surface-2)">
    <b>${e}</b><span class="muted" style="font-size:13px">${s(t)}</span>${a}
  </div>`;return Ce(s("helpers"),g(s("h_appliances"),"h_appliances_hint",Qe(e,p.slice(0,24),o.appliances.map((e=>e.power)),((e,s)=>t((t=>{t.settings.appliances=s?[...t.settings.appliances,{power:e,name:l(a,i,e).replace(/\s*(power|استهلاك|consumption)\s*/gi," ").trim()}]:t.settings.appliances.filter((t=>t.power!==e))}))))),g(s("h_night_path"),"h_night_path_hint",Qe(e,c("binary_sensor",["motion","occupancy","presence"]),o.night_path.motion,((e,s)=>t((t=>t.settings.night_path.motion=Xe(t.settings.night_path.motion,e,s))))),Qe(e,c("light"),o.night_path.lights,((e,s)=>t((t=>t.settings.night_path.lights=Xe(t.settings.night_path.lights,e,s))))),Me(n`<span>${s("from")}</span>`,n`<input type="time" style="width:auto" .value=${o.night_path.from} @change=${e=>t((t=>t.settings.night_path.from=e.target.value))} />`,n`<span>${s("to")}</span>`,n`<input type="time" style="width:auto" .value=${o.night_path.to} @change=${e=>t((t=>t.settings.night_path.to=e.target.value))} />`,n`<span>${s("brightness")}</span>`,n`<input type="number" min="1" max="100" style="width:80px" .value=${String(o.night_path.brightness)} @change=${e=>t((t=>t.settings.night_path.brightness=Number(e.target.value)||10))} />`)),g(s("h_arrival"),d?"h_arrival_hint":"h_arrival_missing",Qe(e,c("climate"),o.arrival.climate,((e,s)=>t((t=>t.settings.arrival.climate=Xe(t.settings.arrival.climate,e,s))))),Qe(e,c("light"),o.arrival.lights,((e,s)=>t((t=>t.settings.arrival.lights=Xe(t.settings.arrival.lights,e,s))))),Me(n`<span>${s("h_arrival_km")}</span>`,n`<input type="number" min="1" max="50" style="width:80px" .value=${String(o.arrival.km)} @change=${e=>t((t=>t.settings.arrival.km=Number(e.target.value)||5))} />`)),g(s("h_outage"),"h_outage_hint",Ie(e,s("h_outage_sensor"),o.outage.sensor,{domains:["binary_sensor","sensor"]},(e=>t((t=>t.settings.outage.sensor=e))),!0),Qe(e,[...c("switch"),...c("climate"),...c("water_heater")].filter((e=>!a.entities?.[e]?.entity_category)),o.outage.shed,((e,s)=>t((t=>t.settings.outage.shed=Xe(t.settings.outage.shed,e,s)))))))}(t,o):c,t.allows("support")?Ce(i("installer"),n`<label class="field">${i("installer_name")}<input type="text" .value=${a.installer.name??""} placeholder="SmartNest" @change=${e=>o((t=>t.settings.installer.name=e.target.value.trim()||void 0))} /></label>`,n`<label class="field"
                >${i("installer_phone")}<input type="tel" class="ltr" .value=${a.installer.phone??""} placeholder="972501234567" @change=${e=>o((t=>t.settings.installer.phone=e.target.value.trim()||void 0))} />
                <span class="hint">${i("installer_phone_hint")}</span></label
              >`):c,t.allows("alarm_screen")?Ce(i("emergency"),n`<label class="field">${i("police_number")}<input type="tel" class="ltr" .value=${a.emergency.police} @change=${e=>o((t=>t.settings.emergency.police=e.target.value.trim()))} /></label>`,n`<label class="field"
                >${i("emergency_contacts")}
                <textarea
                  rows="3"
                  class="ltr"
                  placeholder="أبو محمد, 0501234567"
                  .value=${a.emergency.contacts.map((e=>`${e.name}, ${e.phone}`)).join("\n")}
                  @change=${e=>o((t=>t.settings.emergency.contacts=String(e.target.value).split("\n").map((e=>e.split(","))).filter((e=>e.length>=2&&e[1].trim())).map((([e,t])=>({name:e.trim(),phone:t.trim()}))).slice(0,4)))}
                ></textarea>
                <span class="hint">${i("emergency_hint")}</span>
              </label>`):c,Ce(i("weather"),Ie(t,i("weather_entity"),a.weather.entity,{domains:["weather"]},(e=>o((t=>t.settings.weather.entity=e))),!0),n`<div class="field">${i("weather_bg")} ${He(t,a.weather.background,(e=>o((t=>t.settings.weather.background=e))))}</div>`),function(e,t){const s=e.t,a=e.config.settings.fully,i=v(e.hass);if(!i.length)return Ce(s("tablet"),n`<p class="muted" style="margin:0;font-size:14px">${s("tablet_none")}</p>`);const l=ne(e.hass);return Ce(s("tablet"),n`<p class="muted" style="margin:0;font-size:14px">
      ${s("tablet_found",{names:i.map((e=>e.name)).join("ar"===e.lang?"، ":", ")})} ·
      ${l?n`<strong style="color:var(--success)">✓ ${s("tablet_this")}</strong>`:s("tablet_not_this")}
    </p>`,window.fully?c:n`<p class="muted" style="margin:0;font-size:13px">${s("tablet_js_hint")}</p>`,n`<div class="field">${s("night_dim")} ${He(e,a.night_dim,(e=>t((t=>t.settings.fully.night_dim=e))))}</div>`,a.night_dim?n`${Je(s("night_brightness"),a.night_brightness,1,100,(e=>t((t=>t.settings.fully.night_brightness=e))))}
        ${Je(s("night_off"),a.night_off_min,0,240,(e=>t((t=>t.settings.fully.night_off_min=e))))}`:c,n`<div class="field">
      ${s("motion_wake")} ${He(e,a.motion_wake,(e=>t((t=>t.settings.fully.motion_wake=e))))}
      <span class="hint">${s("motion_wake_hint")}</span>
    </div>`)}(t,o),Ce(i("doorbell"),Ie(t,i("doorbell_trigger"),a.doorbell.trigger_entity,{domains:["event","binary_sensor"]},(e=>o((t=>t.settings.doorbell.trigger_entity=e))),!0),Ie(t,i("doorbell_camera"),a.doorbell.camera_entity,{domains:["camera"]},(e=>o((t=>t.settings.doorbell.camera_entity=e))),!0),Ie(t,i("doorbell_lock"),a.doorbell.lock_entity,{domains:["lock"]},(e=>o((t=>t.settings.doorbell.lock_entity=e))),!0),Je(i("keep_days"),a.doorbell.keep_days,1,30,(e=>o((t=>t.settings.doorbell.keep_days=e)))),n`<button class="btn pressable" style="justify-self:start" @click=${s.testDoorbell}>
            <sn-icon icon="bell-ring" style="--icon-size:20px"></sn-icon>${i("doorbell_test")}
          </button>`),Ce(i("kiosk"),n`<form
            class="field"
            @submit=${e=>{e.preventDefault();const s=e.currentTarget.querySelector("input"),a=s.value.trim();if(!/^\d{4,8}$/.test(a))return t.toast(i("kiosk_pin_invalid"));const n=F();o((e=>e.settings.kiosk={pin_hash:le(a,n),pin_salt:n,pin_length:a.length})),s.value="",t.toast(i("kiosk_pin_saved"))}}
          >
            ${i("kiosk_pin")}
            <div style="display:flex;gap:8px">
              <input type="password" inputmode="numeric" pattern="[0-9]*" maxlength="8" autocomplete="off" placeholder="••••" style="flex:1" />
              <button class="btn primary pressable" type="submit">${i(a.kiosk.pin_hash?"kiosk_pin_change":"kiosk_pin_set")}</button>
            </div>
            <span class="hint">${i("kiosk_pin_hint")}</span>
            <span class="hint">${i("kiosk_full_lock")}</span>
          </form>`,a.kiosk.pin_hash?n`<button class="btn pressable" style="justify-self:start" @click=${()=>o((e=>e.settings.kiosk={}))}>
                <sn-icon icon="lock-open" style="--icon-size:20px"></sn-icon>${i("kiosk_remove_pin")}
              </button>`:c),t.allows("broadcast")?Ce(i("speakers"),n`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px">
                ${Object.keys(t.hass.states).filter((e=>e.startsWith("media_player."))).map((e=>{const s=a.speakers.includes(e);return n`<button
                      class="btn pressable ${s?"primary":""}"
                      style="justify-content:flex-start;font-weight:500"
                      @click=${()=>o((t=>t.settings.speakers=s?t.settings.speakers.filter((t=>t!==e)):[...t.settings.speakers,e]))}
                    >
                      <sn-icon icon=${s?"check":"speaker"} style="--icon-size:18px"></sn-icon>${l(t.hass,t.config,e)}
                    </button>`}))}
              </div>`):c,t.allows("maintenance")?Ce(i("maintenance"),...a.maintenance.map(((e,t)=>n`<div style="display:flex;gap:8px;align-items:center">
                  <span style="flex:1">${e.title}</span>
                  <span class="muted ltr" style="font-size:13px">${e.every_days}d</span>
                  <button class="btn pressable" style="min-height:34px;font-size:13px" @click=${()=>o((e=>e.settings.maintenance[t].last=(new Date).toISOString()))}>
                    ${i("m_done")}
                  </button>
                  <button class="icon-btn small pressable" aria-label=${i("delete")} @click=${()=>o((e=>e.settings.maintenance.splice(t,1)))}>
                    <sn-icon icon="close" style="--icon-size:16px"></sn-icon>
                  </button>
                </div>`)),n`<form
                style="display:flex;gap:8px;flex-wrap:wrap"
                @submit=${e=>{e.preventDefault();const t=e.currentTarget,s=t.elements.namedItem("title").value.trim(),a=Number(t.elements.namedItem("every").value)||90;s&&(o((e=>e.settings.maintenance.push({id:g(),title:s,every_days:a,last:(new Date).toISOString()}))),t.reset())}}
              >
                <input name="title" type="text" placeholder=${i("m_title")} style="flex:2;min-width:160px" />
                <input name="every" type="number" min="1" placeholder=${i("m_every")} style="flex:1;min-width:90px" />
                <button class="btn primary pressable" type="submit">${i("add")}</button>
              </form>`):c,Ce(i("transfer"),n`<div style="display:flex;gap:8px;flex-wrap:wrap">
            <button class="btn pressable" @click=${()=>A(t.config)}><sn-icon icon="export" style="--icon-size:18px"></sn-icon>${i("export_config")}</button>
            <label class="btn pressable" style="cursor:pointer">
              <sn-icon icon="import" style="--icon-size:18px"></sn-icon>${i("import_config")}
              <input
                type="file"
                accept="application/json,.json"
                style="display:none"
                @change=${e=>{const s=e.target.files?.[0];e.target.value="",s&&R(t,s)}}
              />
            </label>
          </div>`),Ce(i("about"),n`<div style="display:flex;align-items:center;gap:14px">
            <img src="${t.assetBase}logo/smartnest-symbol-${t.dark?"white":"color"}.svg" alt="SmartNest" style="width:48px;height:48px" />
            <div style="display:grid;gap:2px">
              <strong>SmartNest</strong>
              <span class="muted" style="font-size:13px">${i("tagline")}</span>
              <span class="muted ltr" style="font-size:12px;font-family:'JetBrains Mono',monospace">${i("version")} ${s.version}</span>
              ${s.license?.licensee?n`<span class="muted" style="font-size:12px">${i("licensed_to")} ${s.license.licensee}</span>`:c}
              <button class="btn pressable" style="justify-self:start;min-height:34px;font-size:13px;margin-top:6px" @click=${()=>q(t)}>
                <sn-icon icon="star" style="--icon-size:16px;color:var(--accent)"></sn-icon>${i("rate_service")}
              </button>
              ${s.license?n`<span class="muted" style="font-size:12px">
                    ${i("plan_label")}: <strong style="color:var(--accent-text)">${i(`plan_${s.license.plan}`)}</strong>${s.license.trial?` (${i("trial_label")})`:""}
                    ${s.license.expires?n` · ${i("expires_on")} ${new Date(1e3*s.license.expires).toLocaleDateString()}`:c}
                    ${s.license.reseller?n` · ${i("via")} ${s.license.reseller}`:c}
                  </span>
                  ${s.checkLicense?n`<button
                        class="btn pressable"
                        style="justify-self:start;min-height:34px;font-size:13px"
                        @click=${async e=>{const a=e.currentTarget;a.disabled=!0;const n=await s.checkLicense().catch((()=>i("error")));a.disabled=!1,t.toast(n),t.closeSheet()}}
                      >
                        <sn-icon icon="refresh" style="--icon-size:16px"></sn-icon>${i("lic_check")}
                      </button>`:c}`:c}
            </div>
          </div>`))}})}function Qe(e,t,s,a){return t.length?n`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:8px">
    ${t.map((t=>{const i=s.includes(t);return n`<button class="btn pressable ${i?"primary":""}" style="justify-content:flex-start;font-weight:500" aria-pressed=${i} @click=${()=>a(t,!i)}>
        <sn-icon icon=${i?"check":"close"} style="--icon-size:18px"></sn-icon>${l(e.hass,e.config,t)}
      </button>`}))}
  </div>`:n`<span class="muted" style="font-size:13px">${e.t("no_entities")}</span>`}const Xe=(e,t,s)=>s?[...new Set([...e,t])]:e.filter((e=>e!==t));export{Le as addPageSheet,Ee as addWidgetSheet,Ie as entityField,We as multiField,Ue as pageSettingsSheet,Ke as settingsSheet,Ae as widgetSettingsSheet};
