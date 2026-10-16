import{_ as e}from"./loader-43RavMas.js";import{s as t,i as s,n as i,r as a,a as n,O as l,A as o,b as r,u as c,e as p,C as d,T as g,t as u,l as m,c as h,L as y,d as f,f as $,g as b,h as v,j as _,k as x,P as w,m as k,o as z,p as S,q as j,w as N,v as D,x as O,y as M,z as C,B as I,D as q,E as W,W as P,F as A,G as T,H as F,I as B,J as R,K as L,M as E,N as Y,Q as U,R as J,S as H,U as V,V as G,X as K,Y as Q,Z as X,_ as Z,$ as ee,a0 as te,a1 as se,a2 as ie,a3 as ae,a4 as ne,a5 as le,a6 as oe,a7 as re,a8 as ce,a9 as pe}from"./app-B_FGhboQ.js";var de=Object.defineProperty,ge=Object.getOwnPropertyDescriptor,ue=(e,t,s,i)=>{for(var a,n=i>1?void 0:i?ge(t,s):t,l=e.length-1;l>=0;l--)(a=e[l])&&(n=(i?a(t,s,n):a(n))||n);return i&&n&&de(t,s,n),n};function me(e,t){try{localStorage.setItem("smartnest-occ-preview",JSON.stringify({occ:t,until:Date.now()+12e4}))}catch{}e.toast(e.t("occ_preview_on")),e.closeSheet()}const he={birthday:"🎂",anniversary:"💍",custom:"🎈"};let ye=class extends n{constructor(){super(...arguments),this.kind="birthday"}describe(e){const{t:t,lang:s}=this.ctx,[i,a,n]=e.date.split("-").map(Number),l=new Date;let o=new Date(l.getFullYear(),a-1,n);o<new Date(l.getFullYear(),l.getMonth(),l.getDate())&&(o=new Date(l.getFullYear()+1,a-1,n));const r=Math.round((o.getTime()-new Date(l.getFullYear(),l.getMonth(),l.getDate()).getTime())/864e5),c=0===r?t("occ_today"):t("occ_in_days",{n:r}),p=!1!==e.year_known&&i>1900?o.getFullYear()-i:void 0;return`${o.toLocaleDateString("ar"===s?"ar-u-nu-latn":s,{day:"numeric",month:"long"})} · ${c}${void 0!==p?` · ${t("birthday"===e.kind?"occ_turns":"occ_years_n",{n:p})}`:""}`}render(){const{ctx:e,set:t}=this,{t:s,hass:i,config:a}=e,n=a.settings,u=n.occasions_off??l,m=[...n.family_dates??[]].sort(((e,t)=>e.date.slice(5).localeCompare(t.date.slice(5)))),h=Object.keys(i.states).filter((e=>e.startsWith("person."))),y=Object.keys(i.services?.notify??{}).filter((e=>"send_message"!==e&&"persistent_notification"!==e)).map((e=>`notify.${e}`));return r`<div class="field">
        ${s("occasions")}
        <div class="seg">${[!0,!1].map((e=>r`<button aria-pressed=${(n.occasions??!0)===e} @click=${()=>t((t=>t.settings.occasions=e))}>${s(e?"on":"off")}</button>`))}</div>
      </div>
      ${!1===n.occasions?o:r`<div class="field">
              ${s("occ_colors")}
              <div class="seg">${[!0,!1].map((e=>r`<button aria-pressed=${(n.occasion_colors??!0)===e} @click=${()=>t((t=>t.settings.occasion_colors=e))}>${s(e?"on":"off")}</button>`))}</div>
            </div>

            <h4>${s("occ_family")}</h4>
            ${m.length?m.map((a=>{const n=a.person?i.states[a.person]?.attributes.entity_picture:void 0;return r`<div class="day">
                    <span class="pic" style=${n?`background-image:url('${i.hassUrl(n)}')`:a.color?`background:${a.color}`:""}>${n?"":he[a.kind]}</span>
                    <span class="t"><b>${a.name}</b><small>${this.describe(a)}</small></span>
                    <button
                      class="btn pressable"
                      style="min-height:34px;font-size:13px"
                      @click=${()=>{const t=Number(a.date.slice(0,4));me(e,{kind:a.kind,name:a.name,person:a.person,color:a.color,years:!1!==a.year_known&&t>1900?(new Date).getFullYear()-t:void 0})}}
                    >
                      ${s("occ_try")}
                    </button>
                    <button class="icon-btn small pressable" aria-label=${s("delete")} @click=${()=>t((e=>e.settings.family_dates=(e.settings.family_dates??[]).filter((e=>e.id!==a.id))))}>
                      <sn-icon icon="close" style="--icon-size:16px"></sn-icon>
                    </button>
                  </div>`})):r`<span class="hint">${s("occ_family_empty")}</span>`}
            <form
              @submit=${e=>{e.preventDefault();const s=e.currentTarget,i=e=>s.elements.namedItem(e)?.value?.trim()??"",a=i("name"),n=i("date");if(!a||!n)return;const l={id:c(),name:a,date:n,kind:this.kind,person:i("person")||void 0,color:"custom"===this.kind&&i("color")||void 0,year_known:s.elements.namedItem("year").checked};t((e=>e.settings.family_dates=[...e.settings.family_dates??[],l])),s.reset()}}
            >
              <div class="seg">
                ${["birthday","anniversary","custom"].map((e=>r`<button type="button" aria-pressed=${this.kind===e} @click=${()=>this.kind=e}>${he[e]} ${s(`occ_kind_${e}`)}</button>`))}
              </div>
              <div class="row">
                <input name="name" type="text" placeholder=${s("birthday"===this.kind?"occ_name_bday":"anniversary"===this.kind?"occ_name_anniv":"occ_name_custom")} required />
                <input name="date" type="date" required />
              </div>
              <div class="row">
                <label style="display:flex;gap:6px;align-items:center;font-size:14px"><input name="year" type="checkbox" checked /> ${s("occ_year_known")}</label>
                ${h.length?r`<select name="person" style="flex:1;min-width:140px">
                      <option value="">${s("occ_person")}</option>
                      ${h.map((e=>r`<option value=${e}>${p(i,a,e)}</option>`))}
                    </select>`:o}
                ${"custom"===this.kind?r`<input name="color" type="color" value="#E9971D" style="width:48px;height:38px;padding:2px" />`:o}
              </div>
              <button class="btn primary pressable" type="submit" style="justify-self:start"><sn-icon icon="plus" style="--icon-size:18px"></sn-icon>${s("add")}</button>
            </form>

            <h4>${s("occ_calendar")}</h4>
            <div class="chips">
              ${d.map((i=>{const a=!u.includes(i);return r`<span class="chip ${a?"on":""}">
                  <span class="dot" style="background:${g[i].accent}"></span>${g[i].emoji} ${s(`occ_${i}`)}
                  <button @click=${()=>t((e=>e.settings.occasions_off=a?[...u,i]:u.filter((e=>e!==i))))}>${s(a?"on":"off")}</button>
                  <button @click=${()=>me(e,{kind:i})}>${s("occ_try")}</button>
                </span>`}))}
            </div>

            <label class="field"
              >${s("occ_notify")}
              <select @change=${e=>t((t=>t.settings.occasion_notify=e.target.value||void 0))}>
                <option value="" ?selected=${!n.occasion_notify}>${s("occ_notify_ha")}</option>
                ${y.map((e=>r`<option value=${e} ?selected=${n.occasion_notify===e}>${e}</option>`))}
              </select>
              <span class="hint">${s("occ_notify_hint")}</span>
            </label>`}`}};ye.styles=[t,s`
      :host {
        display: grid;
        gap: 14px;
      }
      .chips {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .chip {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 6px 6px 12px;
        border-radius: 999px;
        background: var(--surface-2);
        font-size: 14px;
      }
      .chip.on {
        background: color-mix(in srgb, var(--accent) 22%, var(--surface-2));
        font-weight: 600;
      }
      .chip button {
        border: 0;
        background: var(--surface-solid);
        color: var(--text);
        border-radius: 999px;
        padding: 4px 10px;
        font: 600 12px var(--font);
        cursor: pointer;
      }
      .chip .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }
      .day {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 12px;
        border-radius: var(--r-md);
        background: var(--surface-2);
      }
      .day .pic {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background: var(--surface-solid) center / cover;
        display: grid;
        place-items: center;
        flex: none;
        font-size: 18px;
      }
      .day .t {
        flex: 1;
        display: grid;
        min-width: 0;
      }
      .day .t small {
        color: var(--text-2);
      }
      form {
        display: grid;
        gap: 8px;
        padding: 12px;
        border-radius: var(--r-md);
        border: 1px dashed var(--border);
      }
      .row {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        align-items: center;
      }
      .row > input[type="text"] {
        flex: 1;
        min-width: 140px;
      }
      h4 {
        margin: 6px 0 0;
        font-size: 14px;
        color: var(--text-2);
      }
    `],ue([i({attribute:!1})],ye.prototype,"ctx",2),ue([i({attribute:!1})],ye.prototype,"set",2),ue([a()],ye.prototype,"kind",2),ye=ue([u("sn-occasions-settings")],ye);var fe=Object.defineProperty,$e=Object.getOwnPropertyDescriptor,be=(e,t,s,i)=>{for(var a,n=i>1?void 0:i?$e(t,s):t,l=e.length-1;l>=0;l--)(a=e[l])&&(n=(i?a(t,s,n):a(n))||n);return i&&n&&fe(t,s,n),n};const ve=(e,t)=>r`<section style="display:grid;gap:8px;padding:14px 16px;border-radius:var(--r-md);background:var(--surface-2)">
  <div style="font-weight:700">${e}</div>
  ${t}
</section>`;let _e=class extends n{createRenderRoot(){return this}async connectedCallback(){super.connectedCallback();const{hass:e}=this.ctx,t=Object.values(e.states).filter((e=>e.entity_id.startsWith("sensor.")&&"battery"===e.attributes.device_class&&!Number.isNaN(Number(e.state)))).map((e=>e.entity_id)).slice(0,60);if(!t.length)return void(this.rows=[]);let s={};try{s=await e.callWS({type:"recorder/statistics_during_period",start_time:new Date(Date.now()-2592e6).toISOString(),statistic_ids:t,period:"day",types:["mean"]})}catch{return void(this.rows=[])}const i=[];for(const a of t){const t=(s[a]??[]).map((e=>["number"==typeof e.start?e.start>1e12?e.start:1e3*e.start:Date.parse(e.start),e.mean??NaN])).filter((([,e])=>!Number.isNaN(e)));if(t.length<7)continue;const n=t.length,l=t.map((([e])=>e/864e5)),o=t.map((([,e])=>e)),r=l.reduce(((e,t)=>e+t),0)/n,c=o.reduce(((e,t)=>e+t),0)/n,p=l.reduce(((e,t,s)=>e+(t-r)*(o[s]-c)),0)/(l.reduce(((e,t)=>e+(t-r)**2),0)||1),d=Number(e.states[a].state);p>=-.05||d<=10||i.push({id:a,level:d,days:Math.round((d-10)/-p)})}this.rows=i.sort(((e,t)=>e.days-t.days)).slice(0,10)}render(){const{t:e,hass:t,config:s}=this.ctx;return this.rows?ve(e("bat_title"),this.rows.length?r`<div style="display:grid;gap:4px;font-size:14px">
            ${this.rows.map((i=>r`<div style="display:flex;justify-content:space-between;gap:12px">
                <span>${p(t,s,i.id)} <span class="muted ltr">${Math.round(i.level)}%</span></span>
                <span style="color:${i.days<21?"var(--alert-text)":"var(--text-2)"}">${i.days>365?e("bat_year"):e("bat_days",{n:i.days})}</span>
              </div>`))}
          </div>`:r`<span class="muted" style="font-size:14px">${e("bat_none")}</span>`):ve(e("bat_title"),r`<span class="muted" style="font-size:14px">${e("loading")}</span>`)}};be([i({attribute:!1})],_e.prototype,"ctx",2),be([a()],_e.prototype,"rows",2),_e=be([u("sn-battery-plan")],_e);let xe=class extends n{constructor(){super(...arguments),this.busy=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),m(this.ctx.hass,"warranty").then((e=>this.items=e?.items??[]))}save(e){this.items=e,h(this.ctx.hass,"warranty",{items:e}).catch((()=>this.ctx.toast(this.ctx.t("error"))))}render(){const{t:e,lang:t}=this.ctx;if(!this.items)return o;const s=e=>{const t=new Date(`${e.bought}T12:00`);return t.setMonth(t.getMonth()+e.months),t};return ve(e("war_title"),r`${this.items.slice().sort(((e,t)=>s(e).getTime()-s(t).getTime())).map((i=>{const a=s(i),n=Math.round((a.getTime()-Date.now())/864e5);return r`<div style="display:flex;align-items:center;gap:10px;font-size:14px">
              <span style="flex:1">${i.name}</span>
              <span style="color:${n<0?"var(--text-2)":n<60?"var(--alert-text)":"var(--success)"}"
                >${n<0?e("war_over"):e("war_until",{date:a.toLocaleDateString(y[t],{day:"numeric",month:"short",year:"numeric"})})}</span
              >
              ${i.invoice?r`<a href=${i.invoice} target="_blank" rel="noopener" title=${e("war_invoice")}>🧾</a>`:o}
              <button class="icon-btn small pressable" aria-label=${e("delete")} @click=${()=>this.save(this.items.filter((e=>e.id!==i.id)))}>
                <sn-icon icon="close" style="--icon-size:14px"></sn-icon>
              </button>
            </div>`}))}
        <form
          style="display:grid;gap:8px;margin-top:6px"
          @submit=${async e=>{e.preventDefault();const t=e.currentTarget,s=new FormData(t),i=s.get("invoice");let a;this.busy=!0,i&&i.size&&(a=await f(this.ctx.hass,i).catch((()=>{}))),this.save([...this.items,{id:c(),name:String(s.get("name")).trim(),bought:String(s.get("bought")),months:Number(s.get("months"))||12,invoice:a}]),this.busy=!1,t.reset()}}
        >
          <input name="name" type="text" required placeholder=${e("war_what")} style="background:var(--surface-solid)" />
          <div style="display:flex;gap:8px">
            <input name="bought" type="date" required .value=${(new Date).toISOString().slice(0,10)} style="flex:1;background:var(--surface-solid)" />
            <select name="months" style="width:auto;background:var(--surface-solid)">
              ${[6,12,24,36,60].map((t=>r`<option value=${t} ?selected=${12===t}>${e("war_months",{n:t})}</option>`))}
            </select>
          </div>
          <label class="field">🧾 ${e("war_invoice")}<input name="invoice" type="file" accept="image/*" /></label>
          <button class="btn pressable" type="submit" ?disabled=${this.busy} style="justify-self:start">${e("add")}</button>
        </form>`)}};be([i({attribute:!1})],xe.prototype,"ctx",2),be([a()],xe.prototype,"items",2),be([a()],xe.prototype,"busy",2),xe=be([u("sn-warranty")],xe);var we=Object.defineProperty,ke=Object.getOwnPropertyDescriptor,ze=(e,t,s,i)=>{for(var a,n=i>1?void 0:i?ke(t,s):t,l=e.length-1;l>=0;l--)(a=e[l])&&(n=(i?a(t,s,n):a(n))||n);return i&&n&&we(t,s,n),n};let Se=class extends n{connectedCallback(){super.connectedCallback(),N(this.ctx).then((e=>this.rows=e))}createRenderRoot(){return this}render(){const{t:e}=this.ctx;return this.rows?De(e("faults_week"),!this.rows.length,Oe(this.rows.map((t=>Me(t.name,e("times",{n:t.n}))))),e("h_all_good")):r`<sn-skeleton></sn-skeleton>`}};function je(e,t){const s=e.hass.entities?.[t]?.platform??"";return["zha","zigbee2mqtt","deconz"].includes(s)?"x_zigbee":"mqtt"===s?"x_mqtt":["zwave_js"].includes(s)?"x_zwave":["tuya","ewelink","sonoff","smartthings","google_assistant","alexa","xiaomi_miot","roborock"].includes(s)?"x_cloud":["esphome","shelly","tasmota","wled","tplink","fully_kiosk"].includes(s)?"x_wifi":"x_generic"}ze([i({attribute:!1})],Se.prototype,"ctx",2),ze([a()],Se.prototype,"rows",2),Se=ze([u("sn-faults")],Se);let Ne=class extends n{constructor(){super(...arguments),this.offline=[],this.low=[],this.busy=!1}createRenderRoot(){return this}render(){const{ctx:e}=this,{t:t,hass:s,config:i}=e;if(!this.offline.length&&!this.low.length)return o;const a=[...this.offline.map((a=>[p(s,i,a.entity_id),t(je(e,a.entity_id))])),...this.low.map((e=>[p(s,i,e.entity_id),t("x_battery")]))];return r`<section style="display:grid;gap:8px;padding:14px 16px;border-radius:var(--r-md);background:var(--surface-2)">
      <div style="display:flex;align-items:center;gap:8px;font-weight:700">
        <sn-icon icon="wrench" style="--icon-size:20px;color:var(--accent-text)"></sn-icon>${t("x_title")}
      </div>
      <div style="display:grid;gap:6px;font-size:14px">
        ${a.map((([e,t])=>r`<div><b>${e}</b> <span class="muted">· ${t}</span></div>`))}
      </div>
      ${this.ai?r`<div style="white-space:pre-line;font-size:14px;unicode-bidi:plaintext;border-top:1px solid var(--line, var(--surface-3));padding-top:8px">✨ ${this.ai}</div>`:o}
      ${D(s)&&e.allows("ai_explain")&&!this.ai?r`<button
            class="btn pressable"
            style="justify-self:start"
            ?disabled=${this.busy}
            @click=${async()=>{this.busy=!0;const a=[...this.offline.map((e=>`${p(s,i,e.entity_id)} (${e.entity_id}, ${s.entities?.[e.entity_id]?.platform??"?"}) unavailable since ${e.last_changed}`)),...this.low.map((e=>`${p(s,i,e.entity_id)} battery ${e.state}`))];this.ai=await O(e,"explain",{facts:a})??t("as_error"),this.busy=!1}}
          >
            ✨ ${this.busy?t("ai_looking"):t("x_ai")}
          </button>`:o}
    </section>`}};ze([i({attribute:!1})],Ne.prototype,"ctx",2),ze([i({attribute:!1})],Ne.prototype,"offline",2),ze([i({attribute:!1})],Ne.prototype,"low",2),ze([a()],Ne.prototype,"ai",2),ze([a()],Ne.prototype,"busy",2),Ne=ze([u("sn-explain")],Ne);const De=(e,t,s,i,a=!1)=>r`<section
  style="display:grid;gap:8px;padding:14px 16px;border-radius:var(--r-md);background:var(--surface-2)"
>
  <div style="display:flex;align-items:center;gap:8px;font-weight:700">
    <sn-icon icon=${t?"check-circle":"alert-circle-outline"} style="--icon-size:20px;color:${t?"var(--success)":"var(--alert-text)"}"></sn-icon>
    ${e}
  </div>
  ${t&&!a?r`<span class="muted" style="font-size:14px">${i}</span>`:s}
</section>`,Oe=e=>r`<div style="display:grid;gap:4px;font-size:14px">${e}</div>`,Me=(e,t)=>r`<div style="display:flex;justify-content:space-between;gap:12px"><span>${e}</span><span class="muted" style="unicode-bidi:plaintext">${t}</span></div>`,Ce=(e,t)=>e.find((e=>e.entity_id.startsWith("sensor.")&&t.test(e.entity_id)));var Ie=Object.defineProperty,qe=Object.getOwnPropertyDescriptor,We=(e,t,s,i)=>{for(var a,n=i>1?void 0:i?qe(t,s):t,l=e.length-1;l>=0;l--)(a=e[l])&&(n=(i?a(t,s,n):a(n))||n);return i&&n&&Ie(t,s,n),n};const Pe={apartment:{perArea:!1,off:["garden","car","pets","water"],on:["media"]},villa:{perArea:!0,off:["pets"],on:["garden","car","water","doorbell","security"]},office:{perArea:!0,off:["media","garden","car","pets","robot"],on:["security","doorbell","power","climate"]}};function Ae(e){const t=e.toLowerCase();return/نوم|bed|שינה|ولاد|kids|ילדים/.test(t)?"bed":/مطبخ|kitchen|מטבח/.test(t)?"kitchen":/حمام|bath|shower|מקלחת|אמבט/.test(t)?"shower":/جنين|حديق|garden|yard|גינה|حوش|ساح/.test(t)?"garden":/كراج|garage|חניה|موقف/.test(t)?"garage":/مكتب|office|study|משרד/.test(t)?"desk":/غسيل|laundry|כביסה/.test(t)?"laundry":"sofa"}function Te(e,t){const s=[q("room",{area:t.areaId},{x:0,y:0,w:12,h:5})];let i=0,a=5;const n=t.ids.filter((e=>"camera"!==b(e)));for(const l of n)i+3>12&&(i=0,a+=2),s.push(q("tile",{entity:l},{x:i,y:a,w:3,h:2})),i+=3;return a+=n.length?2:0,t.ids.filter((e=>"camera"===b(e))).forEach(((e,t)=>s.push(q("camera",{entity:e},{x:t%2*6,y:a+5*Math.floor(t/2),w:6,h:5})))),e.allows("w_room")||s.shift(),{id:c(),title:t.name??e.t("other_devices"),icon:Ae(t.name??""),widgets:s}}function Fe(e,t){const{hass:s,config:i,t:a}=e,n=[],l=(e,t,s=!0)=>{const i=t.widgets.reduce(((e,t)=>e+(t.config.entity?1:0)+("floorplan"===t.type||"hero"===t.type||"energy"===t.type||"water"===t.type?1:0)),0);(i||"home"===e)&&n.push({key:e,page:t,devices:i,on:s})},o=e=>I(e,s,i,a),r="pro"===i.settings.style&&e.allows("bento"),p=i.pages.some((e=>e.widgets.some((e=>"floorplan"===e.type&&e.config.floors?.some((e=>e.image))))));if(l("home",o(r&&!p?"bento":"home")),r&&p&&l("bento",o("bento")),t)for(const c of M(s).filter((e=>e.areaId&&e.ids.length)))l(`area-${c.areaId}`,Te(e,c));else l("rooms",o("rooms"));for(const c of["climate","power","security","doorbell","water","robot"])C.some((e=>e.id===c))&&l(c,o(c));l("media",function(e){const{hass:t}=e,s=Object.keys(t.states).filter((e=>e.startsWith("media_player.")&&"fully_kiosk"!==t.entities?.[e]?.platform&&!t.entities?.[e]?.entity_category)),i=Object.keys(t.states).filter((e=>e.startsWith("remote."))),a=[];s.slice(0,6).forEach(((e,t)=>a.push(q("media",{entity:e},{x:t%2*6,y:5*Math.floor(t/2),w:6,h:5}))));const n=5*Math.ceil(Math.min(s.length,6)/2);return i.slice(0,3).forEach(((e,t)=>a.push(q("remote",{entity:e},{x:4*t,y:n,w:4,h:8})))),{id:c(),title:e.t("template_media"),icon:"speaker",widgets:a}}(e));for(const c of["car","garden","pets"])l(c,o(c),!1);return n}let Be=class extends n{constructor(){super(...arguments),this.perArea=!1,this.replace=!0,this.list=[]}connectedCallback(){super.connectedCallback(),this.refresh()}refresh(e=!1){const t=new Map(this.list.map((e=>[e.key,e.on]))),s=this.kind?Pe[this.kind]:void 0;this.list=Fe(this.ctx,this.perArea).map((i=>{const a=!!s?.on.includes(i.key)||!s?.off.includes(i.key)&&void 0;return{...i,on:e?a??i.on:t.get(i.key)??a??i.on}}))}build(){const{ctx:e}=this,t=this.list.filter((e=>e.on)).map((e=>e.page));t.length&&(e.update((e=>{const s=e.pages.flatMap((e=>e.widgets)).find((e=>"floorplan"===e.type)),i=s?.config.floors?.some((e=>e.image))?s.config.floors:void 0;if(i){const e=t.flatMap((e=>e.widgets)).find((e=>"floorplan"===e.type));e&&(e.config.floors=i)}e.pages=this.replace?t:[...e.pages,...t],e.settings.default_page=e.pages[0].id})),e.toast(e.t("ab_done",{n:t.length})),e.closeSheet())}render(){const{t:e}=this.ctx,t=this.list.filter((e=>e.on));return r`<p class="hint">${e("ab_hint")}</p>
      <div class="opt">
        <span>${e("ab_kind")}</span>
        <div class="seg">
          ${["apartment","villa","office"].map((t=>r`<button
              aria-pressed=${this.kind===t}
              @click=${()=>{this.kind=t,this.perArea=Pe[t].perArea,this.refresh(!0)}}
            >
              ${e(`ab_${t}`)}
            </button>`))}
        </div>
      </div>
      <div class="opt">
        <span>${e("ab_per_area")}</span>
        <div class="seg">
          ${[!1,!0].map((t=>r`<button
              aria-pressed=${this.perArea===t}
              @click=${()=>{this.perArea=t,this.refresh()}}
            >
              ${e(t?"ab_area_pages":"ab_one_rooms")}
            </button>`))}
        </div>
      </div>
      <div class="pages">
        ${this.list.map((t=>r`<div
            class="p ${t.on?"":"off"}"
            role="checkbox"
            aria-checked=${t.on}
            tabindex="0"
            @click=${()=>this.list=this.list.map((e=>e.key===t.key?{...e,on:!e.on}:e))}
          >
            <span class="ic"><sn-icon .icon=${t.page.icon}></sn-icon></span>
            <b>${t.page.title}</b>
            <span>${"home"===t.key?e("ab_home"):e("ab_devices",{n:t.devices})}</span>
            <span class="check">${t.on?r`<sn-icon icon="check"></sn-icon>`:o}</span>
          </div>`))}
      </div>
      <div class="opt">
        <span>${e("ab_mode")}</span>
        <div class="seg">
          ${[!0,!1].map((t=>r`<button aria-pressed=${this.replace===t} @click=${()=>this.replace=t}>${e(t?"ab_replace":"ab_add")}</button>`))}
        </div>
      </div>
      <button class="btn primary pressable go" ?disabled=${!t.length} @click=${()=>this.build()}>
        <sn-icon icon="auto-fix" style="--icon-size:22px"></sn-icon>${e("ab_go",{n:t.length})}
      </button>`}};Be.styles=[t,s`
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
    `],We([i({attribute:!1})],Be.prototype,"ctx",2),We([a()],Be.prototype,"perArea",2),We([a()],Be.prototype,"kind",2),We([a()],Be.prototype,"replace",2),We([a()],Be.prototype,"list",2),Be=We([u("sn-autobuild")],Be);var Re=Object.defineProperty,Le=Object.getOwnPropertyDescriptor,Ee=(e,t,s,i)=>{for(var a,n=i>1?void 0:i?Le(t,s):t,l=e.length-1;l>=0;l--)(a=e[l])&&(n=(i?a(t,s,n):a(n))||n);return i&&n&&Re(t,s,n),n};const Ye=(...e)=>r`<div style="display:grid;gap:18px">${e}</div>`,Ue=(...e)=>r`<div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">${e}</div>`,Je=(e,...t)=>r`<section style="display:grid;gap:12px;padding-top:6px">
    <h3 style="margin:0;font-size:13px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--text-2)">${e}</h3>
    ${t}
  </section>`;function He(e,t,s,i,a,n=!1){const l=s?e.hass.states[s]:void 0;return r`<div class="field">
    ${t}
    <div style="display:flex;gap:8px">
      <button
        class="btn pressable"
        style="flex:1;justify-content:flex-start;border-radius:var(--r-sm)"
        @click=${()=>e.showSheet({still:!0,title:t,render:e=>r`<sn-entity-picker
              .ctx=${e}
              .filter=${i}
              .onPick=${t=>{a(t),e.closeSheet()}}
            ></sn-entity-picker>`})}
      >
        ${s?r`<sn-icon .icon=${F(l,s)} style="--icon-size:20px"></sn-icon>${p(e.hass,e.config,s)}`:r`<span class="muted">${e.t(n?"none":"choose_entity")}</span>`}
      </button>
      ${n&&s?r`<button class="icon-btn pressable" aria-label=${e.t("delete")} @click=${()=>a(void 0)}>
            <sn-icon icon="close" style="--icon-size:18px"></sn-icon>
          </button>`:o}
    </div>
  </div>`}function Ve(e,t,s,i,a,n="auto_all"){const l=s??[];return r`<div class="field">
    ${t}
    <div style="display:flex;gap:6px;flex-wrap:wrap">
      ${l.map((t=>r`<button class="btn pressable" style="min-height:36px;font-size:14px" @click=${()=>a(l.length>1?l.filter((e=>e!==t)):void 0)}>
          ${p(e.hass,e.config,t)}<sn-icon icon="close" style="--icon-size:14px"></sn-icon>
        </button>`))}
      <button
        class="btn primary pressable"
        style="min-height:36px;font-size:14px"
        @click=${()=>e.showSheet({still:!0,title:t,render:e=>r`<sn-entity-picker
              .ctx=${e}
              .filter=${i}
              .onPick=${t=>{l.includes(t)||a([...l,t]),e.closeSheet()}}
            ></sn-entity-picker>`})}
      >
        <sn-icon icon="plus" style="--icon-size:16px"></sn-icon>${e.t("add")}
      </button>
    </div>
    ${l.length?o:r`<span class="hint">${e.t(n)}</span>`}
  </div>`}function Ge(e,t,s){return r`<label class="field"
    >${e.t("widget_title")}
    <input type="text" .value=${s??""} @change=${s=>Xe(e,t,(e=>e.config.title=s.target.value.trim()||void 0))} />
  </label>`}function Ke(e,t){return r`<label class="field"
    >${e.t("display_name")}
    <input
      type="text"
      .value=${e.config.names[t]??""}
      placeholder=${e.hass.states[t]?.attributes.friendly_name??t}
      @change=${s=>e.update((e=>{const i=s.target.value.trim();i?e.names[t]=i:delete e.names[t]}))}
    />
    <span class="hint">${e.t("display_name_hint")}</span>
  </label>`}const Qe={camera:{domains:["camera"]},vacuum:{domains:["vacuum"]},todo:{domains:["todo"]},gauge:{domains:["sensor"]},gate:{domains:["cover"]},media:{domains:["media_player"]},remote:{domains:["remote","media_player"]}};function Xe(e,t,s){e.update((e=>{const i=te(e,t);i&&s(i,e)}))}function Ze(e,t,s){e.showSheet({still:!0,title:e.t("widget_settings"),render:e=>{const t=te(e.config,s);return t?Ye(function(e,t,s){const i=e.t;switch(t.type){case"camera":return Ye(He(e,i("entity"),t.config.entity,{domains:["camera"]},(t=>Xe(e,s,(e=>e.config.entity=t)))),t.config.entity?Ke(e,t.config.entity):o,r`<div class="field">
              ${i("camera_mode")}
              <div class="seg">
                ${["auto","live","still"].map((a=>r`<button
                    aria-pressed=${(void 0===t.config.live?"auto":t.config.live?"live":"still")===a}
                    @click=${()=>Xe(e,s,(e=>"auto"===a?delete e.config.live:e.config.live="live"===a))}
                  >
                    ${i(`camera_${a}`)}
                  </button>`))}
              </div>
              <span class="hint">${i("camera_mode_hint")}</span>
            </div>`);case"tile":case"vacuum":case"media":case"remote":return Ye(He(e,i("entity"),t.config.entity,Qe[t.type]??{},(t=>Xe(e,s,(e=>e.config.entity=t)))),t.config.entity?Ke(e,t.config.entity):o);case"gauge":return Ye(He(e,i("entity"),t.config.entity,{domains:["sensor"]},(t=>Xe(e,s,(e=>e.config.entity=t)))),r`<div class="row" style="display:flex;gap:8px">
              ${["min","max","low"].map((a=>r`<label class="field" style="flex:1"
                  >${"low"===a?i("gauge_low")+" %":a}
                  <input type="number" .value=${String(t.config[a]??("max"===a?100:"low"===a?20:0))} @change=${t=>Xe(e,s,(e=>e.config[a]=Number(t.target.value)))} />
                </label>`))}
            </div>`,e.allows("refill")?r`<label class="field"
                  >${i("refill_phone")}
                  <input type="tel" class="ltr" placeholder="972501234567" .value=${t.config.supplier??""} @change=${t=>Xe(e,s,(e=>e.config.supplier=t.target.value.trim()||void 0))} />
                  <span class="hint">${i("refill_hint")}</span>
                </label>`:o);case"gate":return Ye(He(e,i("widget_gate"),t.config.entity,{domains:["cover"]},(t=>Xe(e,s,(e=>e.config.entity=t)))),He(e,i("widget_camera"),t.config.camera,{domains:["camera"]},(t=>Xe(e,s,(e=>e.config.camera=t))),!0));case"frigate":return r`<label class="field"
            >Frigate instance ID
            <input type="text" class="ltr" .value=${t.config.instance??"frigate"} @change=${t=>Xe(e,s,(e=>e.config.instance=t.target.value.trim()||"frigate"))} />
          </label>`;case"todo":return He(e,i("widget_todo"),t.config.entity,{domains:["todo"]},(t=>Xe(e,s,(e=>e.config.entity=t))));case"calendar":{const i=Object.keys(e.hass.states).filter((e=>e.startsWith("calendar."))),a=t.config.entities??[];return r`<div style="display:grid;gap:8px">
            ${i.map((t=>{const n=!a.length||a.includes(t);return r`<button
                class="btn pressable ${n?"primary":""}"
                style="justify-content:flex-start;font-weight:500"
                @click=${()=>Xe(e,s,(e=>{const s=e.config.entities?.length?e.config.entities:[...i];e.config.entities=n?s.filter((e=>e!==t)):[...s,t]}))}
              >
                <sn-icon icon=${n?"check":"close"} style="--icon-size:18px"></sn-icon>${p(e.hass,e.config,t)}
              </button>`}))}
          </div>`}case"countdown":{const a=t.config.events??[];return Ye(r`<div class="field">${i("next_ramadan")} / ${i("next_eid")} ${nt(e,t.config.islamic??"ar"===e.lang,(t=>Xe(e,s,(e=>e.config.islamic=t))))}</div>`,...a.map(((t,a)=>r`<div style="display:flex;gap:8px;align-items:center">
                <span style="flex:1">${t.title}</span><span class="muted ltr">${t.date}</span>
                <button class="icon-btn small pressable" aria-label=${i("delete")} @click=${()=>Xe(e,s,(e=>e.config.events.splice(a,1)))}>
                  <sn-icon icon="close" style="--icon-size:16px"></sn-icon>
                </button>
              </div>`)),r`<form
              style="display:grid;gap:8px"
              @submit=${t=>{t.preventDefault();const i=t.currentTarget,a=i.elements.namedItem("title").value.trim(),n=i.elements.namedItem("date").value;a&&n&&(Xe(e,s,(e=>e.config.events=[...e.config.events??[],{title:a,date:n}])),i.reset())}}
            >
              <input name="title" type="text" placeholder=${i("event_title")} />
              <input name="date" type="date" />
              <button class="btn primary pressable" type="submit" style="justify-self:start">${i("add_event")}</button>
            </form>`)}case"energy_stats":{const a=ce(e.hass),n=(n,l)=>He(e,i(l),t.config[n]??a[n],{domains:["sensor"],deviceClasses:["energy"]},(t=>Xe(e,s,(e=>e.config[n]=t))),!0);return Ye(n("total","e_total_energy"),n("solar","e_solar_energy"),r`<label class="field"
              >${i("tariff")}
              <input type="number" step="0.01" min="0" .value=${String(t.config.tariff??.6)} @change=${t=>Xe(e,s,(e=>e.config.tariff=Number(t.target.value)||0))} />
            </label>`,r`<label class="field"
              >${i("bill_budget")}
              <input type="number" min="0" .value=${String(t.config.budget??"")} placeholder="–" @change=${t=>Xe(e,s,(e=>e.config.budget=Number(t.target.value)||void 0))} />
            </label>`,r`<label class="field"
              >${i("currency")}
              <input type="text" maxlength="4" .value=${t.config.currency??"₪"} @change=${t=>Xe(e,s,(e=>e.config.currency=t.target.value.trim()||"₪"))} />
            </label>`)}case"energy":{const a=re(e.hass),n=(n,l,o)=>He(e,i(l),t.config[n]??a[n],{domains:["sensor"],deviceClasses:o},(t=>Xe(e,s,(e=>e.config[n]=t))),!0),l=a=>r`<div class="field">${i("e_flip")} ${nt(e,!!t.config[a],(t=>Xe(e,s,(e=>e.config[a]=t))))}</div>`;return Ye(n("solar","e_solar_entity",["power"]),n("grid","e_grid_entity",["power"]),l("flip_grid"),n("battery","e_battery_entity",["power"]),l("flip_battery"),n("soc","e_soc_entity",["battery"]),n("home","e_home_entity",["power"]))}case"room":{const a=Object.values(e.hass.areas??{});return Ye(r`<label class="field"
              >${i("room_area")}
              <select @change=${t=>Xe(e,s,(e=>e.config.area=t.target.value||void 0))}>
                <option value="">–</option>
                ${a.map((e=>r`<option value=${e.area_id} ?selected=${t.config.area===e.area_id}>${e.name}</option>`))}
              </select>
            </label>`,r`<label class="field">${i("room_name")}<input type="text" .value=${t.config.name??""} @change=${t=>Xe(e,s,(e=>e.config.name=t.target.value.trim()||void 0))} /></label>`,r`<label class="field"
              >${i("room_photo")}
              <input
                type="file"
                accept="image/*"
                @change=${async t=>{const a=t.target.files?.[0];if(a)try{const t=await f(e.hass,a);Xe(e,s,(e=>e.config.photo=t))}catch{e.toast(i("error"))}}}
              />
            </label>`)}case"water":{const a=oe(e.hass),n=(n,l,o)=>He(e,i(l),t.config[n]??a[n],o,(t=>Xe(e,s,(e=>e.config[n]=t))),!0);return Ye(n("usage","water_usage",{domains:["sensor"],deviceClasses:["water"]}),n("tank","water_tank",{domains:["sensor"]}),n("valve","water_valve",{domains:["valve","switch"]}))}case"ac":return He(e,i("entity"),t.config.entity,{domains:["climate"]},(t=>Xe(e,s,(e=>e.config.entity=t))));case"sensor":return Ye(He(e,i("entity"),t.config.entity,{domains:["sensor"]},(t=>Xe(e,s,(e=>e.config.entity=t)))),t.config.entity?Ke(e,t.config.entity):o);case"batteries":return r`<label class="field"
            >${i("bat_low_at")}
            <input type="number" min="5" max="60" .value=${String(t.config.low??20)} @change=${t=>Xe(e,s,(e=>e.config.low=Number(t.target.value)||20))} />
          </label>`;case"family":return Ve(e,i("family_who"),t.config.entities,{domains:["person","device_tracker","binary_sensor"]},(t=>Xe(e,s,(e=>e.config.entities=t))),"family_all");case"hours":return Ve(e,i("widget_hours"),t.config.entities,{domains:["light","switch","climate","fan","media_player","water_heater","input_boolean"]},(t=>Xe(e,s,(e=>e.config.entities=t))));case"plants":return Ye(Ve(e,i("widget_plants"),t.config.entities,{domains:["sensor","plant"]},(t=>Xe(e,s,(e=>e.config.entities=t)))),lt(i("plants_dry_at"),t.config.dry??25,5,80,(t=>Xe(e,s,(e=>e.config.dry=t)))));case"pool":{const a=(a,n,l)=>He(e,i(n),t.config[a],{domains:l},(t=>Xe(e,s,(e=>e.config[a]=t))),!0);return Ye(a("temp","pool_water",["sensor"]),a("pump","pool_pump",["switch"]),a("light","pool_light",["light","switch"]),a("heater","pool_heat",["climate","switch","water_heater"]))}case"car":return Ye(Ge(e,s,t.config.title),He(e,i("car_pick"),t.config.entity,{domains:["sensor","device_tracker","lock","binary_sensor"]},(t=>Xe(e,s,(e=>e.config.entity=t))),!0));case"activity":return lt(i("quiet_hours"),t.config.quiet_hours??6,1,48,(t=>Xe(e,s,(e=>e.config.quiet_hours=t))));case"bins":{const a=t.config.bins??[],n=t=>new Date(2023,0,1+t).toLocaleDateString("ar"===e.lang?"ar":e.lang,{weekday:"long"});return Ye(...a.map(((t,a)=>r`<div style="display:flex;gap:8px;align-items:center">
                <span style="width:18px;height:18px;border-radius:4px;background:${t.color}"></span>
                <span style="flex:1">${t.name}</span><span class="muted">${n(t.day)}</span>
                <button class="icon-btn small pressable" aria-label=${i("delete")} @click=${()=>Xe(e,s,(e=>e.config.bins.splice(a,1)))}>
                  <sn-icon icon="close" style="--icon-size:16px"></sn-icon>
                </button>
              </div>`)),r`<form
              style="display:flex;gap:8px;flex-wrap:wrap"
              @submit=${t=>{t.preventDefault();const i=t.currentTarget,a=i.elements.namedItem("n").value.trim();if(!a)return;const n=i.elements.namedItem("c").value,l=Number(i.elements.namedItem("d").value);Xe(e,s,(e=>e.config.bins=[...e.config.bins??[],{name:a,color:n,day:l}])),i.reset()}}
            >
              <input name="n" type="text" placeholder=${i("bins_name")} style="flex:1;min-width:140px" />
              <select name="d">${[0,1,2,3,4,5,6].map((e=>r`<option value=${e}>${n(e)}</option>`))}</select>
              <input name="c" type="color" value="#2bb673" style="width:44px;height:38px;padding:2px" />
              <button class="icon-btn primary pressable" type="submit" aria-label=${i("add")}><sn-icon icon="plus" style="--icon-size:18px"></sn-icon></button>
            </form>`)}case"folder":return Ye(Ge(e,s,t.config.title),Ve(e,i("widget_folder"),t.config.entities,{domains:["light","switch","fan","cover","climate","lock","media_player","input_boolean","scene","script"]},(t=>Xe(e,s,(e=>e.config.entities=t)))));case"scenes":return Ye(Ge(e,s,t.config.title),Ve(e,i("widget_scenes"),t.config.entities,{domains:["scene","script"]},(t=>Xe(e,s,(e=>e.config.entities=t)))));case"lights":case"covers":{const a=Object.values(e.hass.areas??{});return Ye(Ge(e,s,t.config.title),r`<label class="field"
              >${i("room_area")}
              <select @change=${t=>Xe(e,s,(e=>e.config.area=t.target.value||void 0))}>
                <option value="">${i("area_all")}</option>
                ${a.map((e=>r`<option value=${e.area_id} ?selected=${t.config.area===e.area_id}>${e.name}</option>`))}
              </select>
            </label>`,Ve(e,i("lights"===t.type?"widget_lights":"widget_covers"),t.config.entities,{domains:["lights"===t.type?"light":"cover"]},(t=>Xe(e,s,(e=>e.config.entities=t)))))}case"boiler":return He(e,i("boiler_pick"),t.config.entity,{domains:["switch","water_heater","input_boolean","light"]},(t=>Xe(e,s,(e=>e.config.entity=t))));case"irrigation":return He(e,i("widget_irrigation"),t.config.entity,{domains:["valve","switch","input_boolean"]},(t=>Xe(e,s,(e=>e.config.entity=t))));case"air":return Ye(He(e,i("air_purifier"),t.config.purifier,{domains:["fan","humidifier","switch","climate"]},(t=>Xe(e,s,(e=>e.config.purifier=t))),!0),Ve(e,i("air_sensors"),t.config.entities,{domains:["sensor"]},(t=>Xe(e,s,(e=>e.config.entities=t)))));case"commute":return Ve(e,i("widget_commute"),t.config.entities,{domains:["sensor"]},(t=>Xe(e,s,(e=>e.config.entities=t))));case"timeline":return He(e,i("widget_camera"),t.config.camera,{domains:["camera"]},(t=>Xe(e,s,(e=>e.config.camera=t))),!0);case"heading":return r`<label class="field"
            >${i("heading_text")}
            <input type="text" .value=${t.config.text??""} @change=${t=>Xe(e,s,(e=>e.config.text=t.target.value))} />
          </label>`;case"floorplan":return Ye(r`<div class="field">
              ${i("plan_in_dark")}
              <div class="seg">
                ${[!1,!0].map((a=>r`<button aria-pressed=${!!t.config.invert_dark===a} @click=${()=>Xe(e,s,(e=>e.config.invert_dark=a))}>
                    ${i(a?"plan_invert":"plan_original")}
                  </button>`))}
              </div>
            </div>`,e.allows("sun_on_plan")?r`<label class="field"
                  >${i("plan_north")}
                  <input type="number" min="0" max="359" step="5" .value=${String(t.config.north??0)} @change=${t=>Xe(e,s,(e=>e.config.north=(Number(t.target.value)||0)%360))} />
                  <span class="hint">${i("plan_north_hint")}</span>
                </label>`:o,r`<p class="muted" style="margin:0;font-size:14px">${i("drag_hint")}</p>`);default:return r`<p class="muted">${i(`widget_${t.type}`)}</p>`}}(e,t,s),"floorplan"===t.type?o:function(e,t){const s=e.t,i=e.config.pages.find((e=>e.widgets.some((e=>e.id===t.id)))),a=e=>e.widgets.find((e=>"room"===e.type&&e.config.area))?.config.area,n=t=>Object.values(e.hass.areas??{}).find((e=>e.name.trim()===t.trim()))?.area_id,l=(i?.widgets??[]).filter((e=>"heading"===e.type&&e.config.text)).sort(((e,t)=>e.y-t.y)),c=[...l].reverse().find((e=>e.y<t.y)),p=async s=>{const i=t.config.entity;s&&i&&e.hass.entities?.[i]&&(e.hass.entities[i].area_id??void 0)!==s&&await e.hass.callWS({type:"config/entity_registry/update",entity_id:i,area_id:s}).catch((()=>{}))};return r`<label class="field"
    >${s("move_room")}
    <select
      @change=${async o=>{const[r,d]=String(o.target.value).split(":");if("h"===r){const i=l.find((e=>e.id===d));if(!i||i.id===c?.id)return;return e.update((e=>{const s=e.pages.find((e=>e.widgets.some((e=>e.id===t.id)))),i=s?.widgets.find((e=>e.id===t.id));s&&i&&(s.widgets=function(e,t,s){const i=ie(e.filter((e=>e.id!==t.id))).map((e=>({...e}))),a=i.filter((e=>"heading"===e.type)).sort(((e,t)=>e.y-t.y)),n=a.find((e=>e.id===s));if(!n)return e;const l=a.find((e=>e.y>n.y)),o=i.filter((e=>"heading"!==e.type&&e.y>n.y&&(!l||e.y<l.y))),r=(e,s)=>e+t.w<=12&&!i.some((i=>e<i.x+i.w&&i.x<e+t.w&&s<i.y+i.h&&i.y<s+t.h));if(o.length){const e=Math.max(...o.map((e=>e.y)));for(let s=0;s+t.w<=12;s++)if(r(s,e))return ie([...i,{...t,x:s,y:e}],t.id)}const c=o.length?Math.max(...o.map((e=>e.y+e.h))):n.y+n.h;for(const p of i)p.y>=c&&(p.y+=t.h);return ie([...i,{...t,x:0,y:c}],t.id)}(s.widgets,i,d))})),await p(n(i.config.text)),e.toast(s("moved_to",{page:i.config.text})),e.closeSheet()}const g=e.config.pages.find((e=>e.id===d));g&&g.id!==i?.id&&(e.update((e=>{const s=e.pages.find((e=>e.widgets.some((e=>e.id===t.id)))),i=e.pages.find((e=>e.id===g.id)),a=s?.widgets.find((e=>e.id===t.id));if(!s||!i||!a)return;s.widgets=ie(s.widgets.filter((e=>e.id!==t.id)));const n=i.widgets.reduce(((e,t)=>Math.max(e,t.y+t.h)),0);i.widgets=ie([...i.widgets,{...a,x:0,y:n}])})),await p(a(g)),e.toast(s("moved_to",{page:g.title})),e.closeSheet())}}
    >
      ${l.length?r`<optgroup label=${s("move_this_page")}>
            ${l.map((e=>r`<option value=${`h:${e.id}`} ?selected=${e.id===c?.id}>${e.config.text}</option>`))}
          </optgroup>`:o}
      <optgroup label=${s("move_other_page")}>
        ${e.config.pages.map((e=>r`<option value=${`p:${e.id}`} ?selected=${!l.length&&e.id===i?.id}>${e.title}</option>`))}
      </optgroup>
    </select>
    <span class="hint">${s("move_room_hint")}</span>
  </label>`}(e,t)):r``}})}const et=[{type:"tile",icon:"lightbulb"},{type:"floorplan",icon:"layers"},{type:"camera",icon:"cctv"},{type:"modes",icon:"leave"},{type:"vacuum",icon:"robot-vacuum"},{type:"visitors",icon:"doorbell"},{type:"energy",icon:"solar"},{type:"energy_stats",icon:"lightning-bolt"},{type:"check",icon:"night"},{type:"panic",icon:"alert-circle-outline"},{type:"family",icon:"family"},{type:"todo",icon:"todo"},{type:"calendar",icon:"calendar"},{type:"forecast",icon:"w-partlycloudy"},{type:"countdown",icon:"countdown"},{type:"gauge",icon:"gas"},{type:"gate",icon:"gate"},{type:"frigate",icon:"cctv"},{type:"schedule",icon:"schedule"},{type:"media",icon:"speaker"},{type:"remote",icon:"television"},{type:"consumers",icon:"lightning-bolt"},{type:"water",icon:"water"},{type:"wake",icon:"weather-sunset-up"},{type:"chores",icon:"star"},{type:"air",icon:"leaf"},{type:"boiler",icon:"water-boiler"},{type:"irrigation",icon:"sprinkler"},{type:"timeline",icon:"history"},{type:"internet",icon:"wifi"},{type:"board",icon:"note"},{type:"verse",icon:"book-open-variant"},{type:"radar",icon:"weather-pouring"},{type:"commute",icon:"car"},{type:"parcels",icon:"package"},{type:"hero",icon:"home"},{type:"stack",icon:"layers"},{type:"room",icon:"sofa"},{type:"ac",icon:"air-conditioner"},{type:"scenes",icon:"palette"},{type:"sensor",icon:"chart-line"},{type:"batteries",icon:"battery"},{type:"lights",icon:"lightbulb-group"},{type:"covers",icon:"blinds"},{type:"prayer",icon:"mosque"},{type:"folder",icon:"folder"},{type:"story",icon:"book-open-variant"},{type:"hours",icon:"progress-clock"},{type:"plants",icon:"sprout"},{type:"pool",icon:"pool"},{type:"net",icon:"wifi"},{type:"car",icon:"car"},{type:"solarcast",icon:"solar"},{type:"bins",icon:"trash-can"},{type:"activity",icon:"motion-sensor"},{type:"clock",icon:"clock-outline"},{type:"heading",icon:"title"}],tt=["clock","hero","verse","forecast","consumers","energy_stats","energy","air","water","board","commute","modes","family","countdown"];function st(e,t){const s=(e,s,i)=>{let a="";return e.update((e=>{const n=e.pages.find((e=>e.id===t));if(!n)return;const l=q(s,i,{y:se(n.widgets)});a=l.id,n.widgets=ie([...n.widgets,l])})),a};e.showSheet({still:!0,title:e.t("add_widget"),render:e=>r`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px">
      ${et.map((t=>e.allows(W(t.type))?r`<button
          class="glass pressable"
          style="display:grid;gap:10px;justify-items:center;padding:20px 12px;border-radius:var(--r-md);font-weight:500"
          @click=${()=>{if(["tile","camera","vacuum","gauge","gate","media","remote"].includes(t.type))return void e.showSheet({still:!0,title:e.t("choose_entity"),render:e=>r`<sn-entity-picker
                  .ctx=${e}
                  .filter=${Qe[t.type]??{}}
                  .onPick=${i=>{s(e,t.type,{entity:i}),e.closeSheet(),e.closeSheet()}}
                ></sn-entity-picker>`});const i="floorplan"===t.type?{floors:[A(e.t("floor_default"))]}:"heading"===t.type?{text:""}:{},a=s(e,t.type,i);e.closeSheet(),"heading"===t.type&&Ze(e,0,a)}}
        >
          ${tt.includes(t.type)&&e.allows("live_gallery")?function(e,t){const s=P[t],i=Math.min(560,60*s.w),a=Math.min(420,56*s.h),n=Math.min(150/i,96/a),l=ae(`sn-w-${t.replace(/_/g,"-")}`),o={id:`preview-${t}`,type:t,x:0,y:0,w:s.w,h:s.h,config:{}};return r`<span style="position:relative;display:block;width:${i*n}px;height:${a*n}px;pointer-events:none;border-radius:14px;overflow:hidden" aria-hidden="true">
    <span style="position:absolute;top:0;left:0;width:${i}px;height:${a}px;transform:scale(${n});transform-origin:0 0;direction:${e.rtl?"rtl":"ltr"}">
      ${ne`<${l} .ctx=${e} .widget=${o}></${l}>`}
    </span>
  </span>`}(e,t.type):r`<span style="display:grid;place-items:center;width:52px;height:52px;border-radius:999px;background:var(--accent);color:var(--on-accent)">
                <sn-icon .icon=${t.icon}></sn-icon>
              </span>`}
          ${e.t(`widget_${t.type}`)}
          <span class="muted ltr" style="font-size:12px">${P[t.type].w}×${P[t.type].h}</span>
        </button>`:r`<div
          class="glass"
          style="display:grid;gap:10px;justify-items:center;padding:20px 12px;border-radius:var(--r-md);font-weight:500;opacity:.55"
          title=${e.t("plan_needed",{plan:e.t(`plan_${T(W(t.type))}`)})}
        >
          <span style="display:grid;place-items:center;width:52px;height:52px;border-radius:999px;background:var(--surface-2)"><sn-icon icon="lock"></sn-icon></span>
          ${e.t(`widget_${t.type}`)}
          <span style="font-size:12px;color:var(--accent-text)">${e.t("plan_needed",{plan:e.t(`plan_${T(W(t.type))}`)})}</span>
        </div>`))}
    </div>`})}function it(e,t){e.showSheet({still:!0,title:e.t("add_page"),render:e=>Je(e.t("choose_template"),r`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px">
        ${C.map((s=>r`<button
            class="glass pressable"
            style="display:grid;gap:10px;justify-items:center;padding:20px 12px;border-radius:var(--r-md);font-weight:500"
            @click=${()=>{const i=I(s.id,e.hass,e.config,e.t);e.update((e=>e.pages.push(i))),e.closeSheet(),t(i.id)}}
          >
            <span style="display:grid;place-items:center;width:52px;height:52px;border-radius:999px;background:var(--surface-2)">
              <sn-icon .icon=${s.icon}></sn-icon>
            </span>
            ${e.t(s.label)}
          </button>`))}
      </div>`)})}function at(e,t,s){const i=(e,s)=>e.update((e=>{const i=e.pages.findIndex((e=>e.id===t));i>=0&&s(e,i)}));e.showSheet({still:!0,title:e.t("page_settings"),render:e=>{const a=e.config.pages.findIndex((e=>e.id===t)),n=e.config.pages[a];if(!n)return r``;const l=e.t,c=t=>i(e,((e,s)=>{const i=s+t;i<0||i>=e.pages.length||([e.pages[s],e.pages[i]]=[e.pages[i],e.pages[s]])}));return Ye(e.allows("page_users")?r`<sn-page-users .ctx=${e} .page=${n} .onChange=${t=>i(e,((e,s)=>t.length?e.pages[s].users=t:delete e.pages[s].users))}></sn-page-users>`:o,r`<label class="field"
          >${l("page_title")}
          <input type="text" .value=${n.title} @change=${t=>i(e,((e,s)=>e.pages[s].title=t.target.value.trim()||n.title))} />
        </label>`,r`<div class="field">
          ${l("page_icon")}
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(48px,1fr));gap:6px">
            ${B.map((t=>r`<button
                class="icon-btn pressable ${n.icon===t?"primary":""}"
                style="width:100%;border-radius:var(--r-sm)"
                aria-pressed=${n.icon===t}
                @click=${()=>i(e,((e,s)=>e.pages[s].icon=t))}
              >
                <sn-icon .icon=${t}></sn-icon>
              </button>`))}
          </div>
        </div>`,e.allows("person_pages")&&Object.keys(e.hass.states).some((e=>e.startsWith("person.")))?r`<label class="field"
              >${l("page_person")}
              <select @change=${t=>i(e,((e,s)=>t.target.value?e.pages[s].person=t.target.value:delete e.pages[s].person))}>
                <option value="" ?selected=${!n.person}>${l("page_person_all")}</option>
                ${Object.keys(e.hass.states).filter((e=>e.startsWith("person."))).map((t=>r`<option value=${t} ?selected=${n.person===t}>${p(e.hass,e.config,t)}</option>`))}
              </select>
              <span class="hint">${l("page_person_hint")}</span>
            </label>`:o,Ue(r`<button class="btn pressable" ?disabled=${0===a} @click=${()=>c(-1)}>${l("move_earlier")}</button>`,r`<button class="btn pressable" ?disabled=${a===e.config.pages.length-1} @click=${()=>c(1)}>${l("move_later")}</button>`,r`<span style="flex:1"></span>`,r`<button
            class="btn danger pressable"
            ?disabled=${e.config.pages.length<=1}
            @click=${()=>{confirm(l("delete_confirm"))&&(i(e,((e,s)=>{e.pages.splice(s,1),e.settings.default_page===t&&(e.settings.default_page=e.pages[0]?.id??"")})),e.closeSheet(),s())}}
          >
            <sn-icon icon="delete" style="--icon-size:20px"></sn-icon>${l("delete")}
          </button>`))}})}function nt(e,t,s){return r`<div class="seg">
    ${[!0,!1].map((i=>r`<button aria-pressed=${t===i} @click=${()=>s(i)}>${e.t(i?"on":"off")}</button>`))}
  </div>`}function lt(e,t,s,i,a){return r`<label class="field"
    >${e}
    <input type="number" min=${s} max=${i} .value=${String(t)} @change=${e=>a(Math.min(i,Math.max(s,Number(e.target.value)||0)))} />
  </label>`}const ot=[H,"#18BCF2","#2FB57A","#F26B68","#A78BFA","#F5BE6A"],rt=[{id:"schedule",label:"theme_schedule"},{id:"auto",label:"theme_auto"},{id:"light",label:"theme_light"},{id:"dark",label:"theme_dark"},{id:"midnight",label:"theme_midnight"}];function ct(t,s){t.showSheet({still:!0,title:t.t("settings"),render:t=>{const i=t.config.settings,a=t.t,n=e=>t.update(e);return Ye(t.allows("autobuild")?r`<button class="btn primary pressable" style="min-height:56px;font-size:16px" @click=${()=>(e=>e.showSheet({still:!0,title:e.t("ab_title"),render:e=>r`<sn-autobuild .ctx=${e}></sn-autobuild>`}))(t)}>
              <sn-icon icon="auto-fix" style="--icon-size:22px"></sn-icon>${a("ab_title")}
            </button>`:o,r`<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          <button class="btn pressable" @click=${()=>function(e){e.showSheet({title:e.t("health"),render:e=>{const{hass:t,t:s,config:i}=e,a=Object.values(t.states),n=s("h_all_good"),l=new Set($(i)),c=a.filter((e=>"unavailable"===e.state&&l.has(e.entity_id))).sort(((e,t)=>e.last_changed.localeCompare(t.last_changed))),d=a.filter((e=>{if("battery"!==e.attributes.device_class)return!1;if("binary_sensor"===b(e.entity_id))return"on"===e.state;const t=Number(e.state);return"sensor"===b(e.entity_id)&&!Number.isNaN(t)&&t<20})).sort(((e,t)=>Number(e.state)-Number(t.state))),g=a.find((e=>/backup_last_successful_automatic_backup$/.test(e.entity_id))),u=g?Date.parse(g.state):NaN,m=Number.isNaN(u)?void 0:Math.floor((Date.now()-u)/864e5),h=a.filter((e=>"update"===b(e.entity_id)&&"on"===e.state)),y=Ce(a,/disk_use_percent|disk_usage/),f=Ce(a,/processor_temperature|cpu_temperature/),N=Ce(a,/memory_use_percent|memory_usage/),D=[y&&Me(s("h_disk"),v(`${_(Number(y.state),e.lang,0)}%`)),f&&Me(s("h_cpu_temp"),v(`${_(Number(f.state),e.lang,0)}°`)),N&&Me(s("h_memory"),v(`${_(Number(N.state),e.lang,0)}%`))].filter(Boolean),O=y&&Number(y.state)>85||f&&Number(f.state)>75,M=[...l].filter((e=>"vacuum"===b(e)&&t.states[e])),C=M.flatMap((e=>{const a=x(t,e);return w.filter((e=>a.parts[e.key])).flatMap((n=>{const l=k(t.states[a.parts[n.key]]);return void 0!==l&&l/n.life<.15?[{robot:p(t,i,e),part:s(n.label),h:l}]:[]}))})),I=z(t).map((e=>{const s=Object.values(t.entities??{}).filter((t=>t.device_id===e.deviceId)),i=e=>e.translation_key??e.entity_id.split(".")[1],a=s.find((e=>e.entity_id.startsWith("sensor.")&&/battery/.test(i(e)))),n=s.find((e=>e.entity_id.startsWith("binary_sensor.")&&/plugged/.test(i(e)))),l=s.find((e=>e.entity_id.startsWith("button.")&&/load_start_url|restart_browser/.test(i(e))));return{tab:e,battery:a&&t.states[a.entity_id],plugged:n&&t.states[n.entity_id],reload:l?.entity_id}}));return r`<div style="display:grid;gap:12px">
        ${De(s("h_offline"),!c.length,Oe(c.map((e=>Me(p(t,i,e.entity_id),S(s,e.last_changed))))),n)}
        ${De(s("h_battery"),!d.length,Oe(d.map((e=>Me(p(t,i,e.entity_id),"sensor"===b(e.entity_id)?v(`${e.state}%`):"!")))),n)}
        ${g?De(s("h_backup"),void 0!==m&&m<=7,Oe([Me(s("h_backup"),void 0===m?"–":s("h_days_ago",{n:m}))]),0===m?s("today"):s("h_days_ago",{n:m??0})):De(s("h_backup"),!1,r`<span class="muted" style="font-size:14px">${s("h_backup_missing")}</span>`,"")}
        ${De(s("h_updates"),!h.length,Oe(h.map((e=>Me(e.attributes.title??e.attributes.friendly_name??e.entity_id,e.attributes.latest_version??"")))),n)}
        ${D.length?De(s("h_system"),!O,Oe(D),"",!0):o}
        ${M.length?De(s("h_robot_parts"),!C.length,Oe(C.map((t=>Me(`${t.robot} · ${t.part}`,s("hours_left",{n:v(_(t.h,e.lang,0))}))))),n):o}
        ${I.length?r`<section style="display:grid;gap:8px;padding:14px 16px;border-radius:var(--r-md);background:var(--surface-2)">
              <div style="font-weight:700">${s("h_tablets")}</div>
              ${I.map((i=>r`<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
                  <strong style="flex:1">${i.tab.name}</strong>
                  ${i.battery?r`<span class="muted ltr">${i.battery.state}%</span>`:o}
                  ${i.plugged?r`<span class="muted">${s("on"===i.plugged.state?"h_charging":"h_not_charging")}</span>`:o}
                  ${i.reload?r`<button class="btn pressable" @click=${()=>t.callService("button","press",{entity_id:i.reload}).then((()=>e.toast(s("done")))).catch((()=>e.toast(s("error"))))}>
                        ${s("h_reload")}
                      </button>`:o}
                </div>`))}
            </section>`:o}
        ${e.config.settings.maintenance.length?(()=>{const t=j(e.config),i=t.filter((e=>e.days<=7));return De(s("maintenance"),!i.length,Oe(t.sort(((e,t)=>e.days-t.days)).map((e=>Me(e.title,e.days<0?s("m_overdue",{n:-e.days}):s("m_in",{n:e.days}))))),n)})():o}
        <sn-explain .ctx=${e} .offline=${c} .low=${d}></sn-explain>
        ${e.allows("battery_plan")?r`<sn-battery-plan .ctx=${e}></sn-battery-plan>`:o}
        ${e.allows("warranty")?r`<sn-warranty .ctx=${e}></sn-warranty>`:o}
        <sn-faults .ctx=${e}></sn-faults>
        <p class="muted" style="margin:4px 0 0;font-size:13px">${s("h_telegram")}</p>
      </div>`}})}(t)}><sn-icon icon="gauge" style="--icon-size:20px"></sn-icon>${a("health")}</button>
          ${t.allows("automations")?r`<button class="btn pressable" @click=${()=>Q(t)}><sn-icon icon="automation" style="--icon-size:20px"></sn-icon>${a("automations")}</button>`:o}
          <button class="btn pressable" @click=${()=>X(t)}><sn-icon icon="key" style="--icon-size:20px"></sn-icon>التراخيص</button>
          ${t.allows("history")?r`<button class="btn pressable" @click=${()=>Z(t)}><sn-icon icon="history" style="--icon-size:20px"></sn-icon>${a("history")}</button>`:o}
          ${t.allows("report")?r`<button class="btn pressable" @click=${()=>ee(t,t.assetBase).catch((()=>t.toast(a("error"))))}><sn-icon icon="file-chart" style="--icon-size:20px"></sn-icon>${a("report")}</button>`:o}
        </div>`,r`<label class="field"
          >${a("home_name")}
          <input
            type="text"
            .value=${i.home_name}
            placeholder=${t.hass.config?.location_name??""}
            @change=${e=>n((t=>t.settings.home_name=e.target.value.trim()))}
          />
        </label>`,r`<div class="field">
          ${a("language")}
          <div class="seg">
            ${K.map((e=>r`<button aria-pressed=${i.language===e.id} @click=${()=>n((t=>t.settings.language=e.id))}>${e.label}</button>`))}
          </div>
        </div>`,r`<div class="field">
          ${a("theme")}
          <div class="seg">
            ${rt.map((e=>r`<button aria-pressed=${i.theme===e.id} @click=${()=>n((t=>t.settings.theme=e.id))}>${a(e.label)}</button>`))}
          </div>
          ${"schedule"===i.theme?Ue(r`<span>${a("dark_from")}</span>`,r`<input type="time" style="width:auto" .value=${i.dark_from} @change=${e=>n((t=>t.settings.dark_from=e.target.value))} />`,r`<span>${a("dark_to")}</span>`,r`<input type="time" style="width:auto" .value=${i.dark_to} @change=${e=>n((t=>t.settings.dark_to=e.target.value))} />`):o}
        </div>`,t.allows("presets")?G(t,n):o,t.allows("style_pro")?r`<div class="field">
              ${a("style")}
              <div class="seg">
                ${["classic","pro"].map((e=>r`<button aria-pressed=${i.style===e} @click=${()=>n((t=>t.settings.style=e))}>${a("pro"===e?"style_pro":"style_classic")}</button>`))}
              </div>
              ${"pro"===i.style?r`<div class="seg" style="margin-top:8px">
                      ${["none","marble","wood","sand","olive"].map((e=>r`<button aria-pressed=${i.material===e} @click=${()=>n((t=>t.settings.material=e))}>${a(`material_${e}`)}</button>`))}
                    </div>
                    <div class="field" style="margin-top:8px">${a("night_midnight")} ${nt(t,i.night_midnight,(e=>n((t=>t.settings.night_midnight=e))))}</div>
                    ${t.allows("wallpaper")?r`<div class="field" style="margin-top:8px">
                          ${a("wallpaper")}
                          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
                            ${i.wallpaper?r`<img src=${i.wallpaper} alt="" style="width:64px;height:40px;object-fit:cover;border-radius:8px" />`:o}
                            <input
                              type="file"
                              accept="image/*"
                              style="flex:1"
                              @change=${async e=>{const s=e.target.files?.[0];if(s)try{const e=await f(t.hass,s);n((t=>t.settings.wallpaper=e))}catch{t.toast(a("error"))}}}
                            />
                            ${i.wallpaper?r`<button class="btn pressable" @click=${()=>n((e=>delete e.settings.wallpaper))}>${a("delete")}</button>`:o}
                          </div>
                          ${i.wallpaper?r`<label style="display:flex;gap:8px;align-items:center;font-size:14px"
                                  >${a("wallpaper_dim")}
                                  <input type="range" min="0" max="0.8" step="0.05" .value=${String(i.wallpaper_dim)} @change=${e=>n((t=>t.settings.wallpaper_dim=Number(e.target.value)))} style="flex:1"
                                /></label>
                                <div>${a("accent_from_wallpaper")} ${nt(t,i.accent_from_wallpaper,(e=>n((t=>t.settings.accent_from_wallpaper=e))))}</div>`:o}
                        </div>`:o}
                    ${t.allows("window_camera")?He(t,a("window_camera"),i.window_camera,{domains:["camera"]},(e=>n((t=>t.settings.window_camera=e))),!0):o}
                    ${t.allows("music_backdrop")?r`<div class="field">${a("music_backdrop")} ${nt(t,i.music_backdrop,(e=>n((t=>t.settings.music_backdrop=e))))}</div>`:o}
                    ${t.allows("welcome")?r`<div class="field">${a("welcome_moment")} ${nt(t,i.welcome,(e=>n((t=>t.settings.welcome=e))))}</div>`:o}
                    ${t.allows("page_moods")?r`<div class="field">${a("page_moods")} ${nt(t,i.page_moods,(e=>n((t=>t.settings.page_moods=e))))}</div>`:o}
                    ${t.allows("season_skin")?r`<div class="field">${a("season_skin")} ${nt(t,i.season_skin,(e=>n((t=>t.settings.season_skin=e))))}</div>`:o}
                    ${t.allows("accent_day")?r`<div class="field">${a("accent_day")} ${nt(t,i.accent_day,(e=>n((t=>t.settings.accent_day=e))))}</div>`:o}
                    ${t.allows("active_glow")?r`<div class="field">${a("active_glow")} ${nt(t,i.active_glow,(e=>n((t=>t.settings.active_glow=e))))}</div>`:o}
                    ${t.allows("aurora")?r`<div class="field">${a("aurora")} ${nt(t,i.aurora,(e=>n((t=>t.settings.aurora=e))))}</div>`:o}
                    ${t.allows("monogram")?r`<label class="field"
                          >${a("monogram")}
                          <input type="text" maxlength="30" placeholder="آل محمد" .value=${i.monogram??""} @change=${e=>n((t=>t.settings.monogram=e.target.value.trim()||void 0))} />
                          <span class="hint">${a("monogram_hint")}</span>
                        </label>`:o}
                    ${t.allows("dock")?r`<div class="field" style="margin-top:8px">
                          ${a("nav_style")}
                          <div class="seg">${["tabs","dock"].map((e=>r`<button aria-pressed=${i.nav===e} @click=${()=>n((t=>t.settings.nav=e))}>${a("dock"===e?"nav_dock":"nav_tabs")}</button>`))}</div>
                        </div>`:o}`:o}
              <span class="hint">${a("style_hint")}</span>
            </div>`:o,t.allows("fonts")?r`<label class="field"
              >${a("font")}
              <select @change=${e=>n((t=>t.settings.font=e.target.value))}>
                ${Object.entries(V).map((([e,t])=>r`<option value=${e} ?selected=${(i.font??"rubik")===e} style="font-family:'${t.family}'">${t.label}</option>`))}
              </select>
              <span class="hint">${a("font_hint")}</span>
            </label>`:o,t.allows("icon_styles")?r`<div class="field">
              ${a("icons_style")}
              <div class="seg">${["filled","line"].map((e=>r`<button aria-pressed=${(i.icons??"filled")===e} @click=${()=>n((t=>t.settings.icons=e))}>${a("line"===e?"icons_line":"icons_filled")}</button>`))}</div>
            </div>`:o,t.allows("occasions")?r`<sn-occasions-settings .ctx=${t} .set=${n}></sn-occasions-settings>`:o,t.allows("burn_in")?r`<div class="field">${a("burn_in")} ${nt(t,i.burn_in,(e=>n((t=>t.settings.burn_in=e))))}</div>`:o,r`<div class="field">${a("cameras_live")} ${nt(t,i.cameras_live??!0,(e=>n((t=>t.settings.cameras_live=e))))}</div>`,t.allows("quick_scenes")?Ve(t,a("quick_scenes"),i.quick_scenes?.length?i.quick_scenes:void 0,{domains:["scene","script"]},(e=>n((t=>t.settings.quick_scenes=e??[]))),"none"):o,t.allows("circadian")?r`${Ve(t,a("circadian"),i.circadian?.length?i.circadian:void 0,{domains:["light"]},(e=>n((t=>t.settings.circadian=e??[]))),"none")}
              <span class="hint" style="margin-top:-8px">${a("circadian_hint")}</span>`:o,r`<div class="field">
          ${a("accent")}
          ${Ue(...ot.map((e=>r`<button
                class="pressable"
                aria-label=${e}
                aria-pressed=${i.accent.toUpperCase()===e}
                style="width:40px;height:40px;border-radius:999px;background:${e};box-shadow:${i.accent.toUpperCase()===e?"0 0 0 3px var(--surface-solid), 0 0 0 5px "+e:"none"}"
                @click=${()=>n((t=>t.settings.accent=e))}
              ></button>`)),r`<input
              type="color"
              aria-label=${a("accent")}
              .value=${i.accent}
              style="width:40px;height:40px;border:0;padding:0;background:none;border-radius:999px"
              @change=${e=>n((t=>t.settings.accent=e.target.value.toUpperCase()))}
            />`)}
        </div>`,t.allows("liquid_glass")?r`<div class="field">
              ${a("glass_style")}
              <div class="seg">
                ${["classic","liquid"].map((e=>r`<button aria-pressed=${i.glass===e} @click=${()=>n((t=>t.settings.glass=e))}>${a(`glass_${e}`)}</button>`))}
              </div>
            </div>`:o,r`<div class="field">${a("night_plan")} ${nt(t,i.night_plan,(e=>n((t=>t.settings.night_plan=e))))}</div>`,t.allows("seasons")?r`<div class="field">
              ${a("season")}
              <div class="seg">
                ${["auto","ramadan","eid","off"].map((e=>r`<button aria-pressed=${i.season===e} @click=${()=>n((t=>t.settings.season=e))}>${a("off"===e?"off":`season_${e}`)}</button>`))}
              </div>
            </div>`:o,t.allows("kids")?r`<label class="field"
              >${a("kids_page")}
              <select @change=${e=>n((t=>t.settings.kids_page=e.target.value||void 0))}>
                <option value="" ?selected=${!i.kids_page}>${a("none")}</option>
                ${t.config.pages.map((e=>r`<option value=${e.id} ?selected=${i.kids_page===e.id}>${e.title}</option>`))}
              </select>
            </label>`:o,r`<label class="field"
          >${a("default_page")}
          <select @change=${e=>n((t=>t.settings.default_page=e.target.value))}>
            ${t.config.pages.map((e=>r`<option value=${e.id} ?selected=${i.default_page===e.id}>${e.title}</option>`))}
          </select>
        </label>`,Je(a("screensaver"),r`<div class="seg">
            ${[!0,!1].map((e=>r`<button aria-pressed=${i.screensaver.enabled===e} @click=${()=>n((t=>t.settings.screensaver.enabled=e))}>
                ${a(e?"on":"off")}
              </button>`))}
          </div>`,i.screensaver.enabled&&t.allows("clock_styles")?r`<div class="field">
                ${a("ss_style")}
                <div class="seg">
                  ${["classic","minimal","analog"].map((e=>r`<button aria-pressed=${i.screensaver.style===e} @click=${()=>n((t=>t.settings.screensaver.style=e))}>${a(`ss_${e}`)}</button>`))}
                </div>
              </div>`:o,i.screensaver.enabled?r`<label class="field"
                  >${a("screensaver_after")}
                  <input
                    type="number"
                    min="1"
                    max="120"
                    .value=${String(i.screensaver.timeout_min)}
                    @change=${e=>n((t=>t.settings.screensaver.timeout_min=Math.max(1,Number(e.target.value)||5)))}
                  />
                </label>
                ${He(t,a("temp_entity"),i.screensaver.temp_entity,{domains:["sensor","climate","weather"]},(e=>n((t=>t.settings.screensaver.temp_entity=e))),!0)}
                <div class="field">${a("photos")} ${nt(t,i.screensaver.photos,(e=>n((t=>t.settings.screensaver.photos=e))))}</div>
                ${i.screensaver.photos?r`<label class="field"
                        >${a("photo_folder")}
                        <input
                          type="text"
                          class="ltr"
                          .value=${i.screensaver.photo_folder}
                          @change=${e=>n((t=>t.settings.screensaver.photo_folder=(e.target.value.trim().startsWith("media-source://")?e.target.value.trim():e.target.value.trim().replace(/^\/+|\/+$/g,""))||"smartnest-photos"))}
                        />
                        <span class="hint">${a("photos_hint",{folder:i.screensaver.photo_folder})}</span>
                      </label>
                      ${lt(a("photo_seconds"),i.screensaver.photo_seconds,5,600,(e=>n((t=>t.settings.screensaver.photo_seconds=e))))}`:o}`:o),Je(a("greet_morning")+" ☀️",r`<label class="field"
            >${a("greeting_name")}
            <input
              type="text"
              .value=${i.greeting_name}
              placeholder=${t.hass.user?.name??""}
              @change=${e=>n((t=>t.settings.greeting_name=e.target.value.trim()))}
            />
            <span class="hint">${a("greeting_name_hint")}</span>
          </label>`,r`<div class="field">${a("prayer")} ${nt(t,i.prayer,(e=>n((t=>t.settings.prayer=e))))}</div>`,r`<div class="field">${a("morning_summary")} ${nt(t,i.morning,(e=>n((t=>t.settings.morning=e))))}</div>`),Je(a("hidden_devices"),function(e,t,s){const i=e.fullHass??e.hass;return r`<span class="hint" style="margin-top:-4px">${e.t("hidden_hint")}</span>
    <div style="display:flex;gap:6px;flex-wrap:wrap">
      ${t.map((a=>r`<button class="btn pressable" style="min-height:36px;font-size:14px" title=${e.t("hidden_show")} @click=${()=>s(t.filter((e=>e!==a)))}>
          <sn-icon icon="eye-off" style="--icon-size:16px"></sn-icon>${p(i,e.config,a)}<sn-icon icon="close" style="--icon-size:14px"></sn-icon>
        </button>`))}
      <button
        class="btn primary pressable"
        style="min-height:36px;font-size:14px"
        @click=${()=>e.showSheet({still:!0,title:e.t("hidden_add"),render:e=>r`<sn-entity-picker
              .ctx=${e}
              .filter=${{}}
              .onPick=${i=>{s([...t.filter((e=>e!==i)),i]),e.closeSheet()}}
            ></sn-entity-picker>`})}
      >
        <sn-icon icon="plus" style="--icon-size:16px"></sn-icon>${e.t("hidden_add")}
      </button>
    </div>`}(t,i.hidden,(e=>n((t=>t.settings.hidden=e))))),Je(a("status_bar"),r`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px">
            ${J.map((e=>{const t=!i.chips_hidden.includes(e.id);return r`<button
                class="btn pressable ${t?"primary":""}"
                style="justify-content:flex-start;font-weight:500"
                aria-pressed=${t}
                @click=${()=>n((s=>{const i=new Set(s.settings.chips_hidden);t?i.add(e.id):i.delete(e.id),s.settings.chips_hidden=[...i]}))}
              >
                <sn-icon icon=${t?"check":"close"} style="--icon-size:18px"></sn-icon>${a(e.label)}
              </button>`}))}
          </div>`,He(t,a("power_entity"),i.power_entity,{domains:["sensor"],deviceClasses:["power"]},(e=>n((t=>t.settings.power_entity=e))),!0),t.allows("tou")?r`<div class="field">
                ${a("tou")} ${nt(t,i.tou.enabled,(e=>n((t=>t.settings.tou.enabled=e))))}
                ${i.tou.enabled?r`${Ue(r`<span>🌙 ${a("tou_cheap")}</span>`,r`<input type="time" style="width:auto" .value=${i.tou.cheap_from} @change=${e=>n((t=>t.settings.tou.cheap_from=e.target.value))} />`,r`<span>←</span>`,r`<input type="time" style="width:auto" .value=${i.tou.cheap_to} @change=${e=>n((t=>t.settings.tou.cheap_to=e.target.value))} />`)}
                    ${Ue(r`<span>⚡ ${a("tou_peak")}</span>`,r`<input type="time" style="width:auto" .value=${i.tou.peak_from} @change=${e=>n((t=>t.settings.tou.peak_from=e.target.value))} />`,r`<span>←</span>`,r`<input type="time" style="width:auto" .value=${i.tou.peak_to} @change=${e=>n((t=>t.settings.tou.peak_to=e.target.value))} />`)}`:o}
              </div>`:o,t.allows("overload")?r`<label class="field"
                >${a("power_limit")}
                <input type="number" min="0" step="100" class="ltr" .value=${String(i.power_limit??"")} placeholder="6000" @change=${e=>n((t=>t.settings.power_limit=Number(e.target.value)||void 0))} />
                <span class="hint">${a("power_limit_hint")}</span>
              </label>`:o),t.allows("guests")?Je(a("guests_mode"),r`<label class="field">${a("guests_welcome")}<input type="text" .value=${i.guests.welcome??""} placeholder=${a("welcome_default")} @change=${e=>n((t=>t.settings.guests.welcome=e.target.value.trim()||void 0))} /></label>`,r`<label class="field">${a("wifi_ssid")}<input type="text" class="ltr" .value=${i.guests.ssid??""} @change=${e=>n((t=>t.settings.guests.ssid=e.target.value.trim()||void 0))} /></label>`,r`<label class="field">${a("wifi_password")}<input type="text" class="ltr" autocomplete="off" .value=${i.guests.password??""} @change=${e=>n((t=>t.settings.guests.password=e.target.value||void 0))} /></label>`):o,Je(a("sound_motion"),t.allows("ui_sounds")?r`<div class="field">${a("ui_sounds")} ${nt(t,i.sounds,(e=>n((t=>t.settings.sounds=e))))}</div>`:o,r`<div class="field">
            ${a("bell_tone")}
            <div class="seg">
              ${["chime","dingdong","melody"].map((t=>r`<button
                  aria-pressed=${i.doorbell_tone===t}
                  @click=${()=>{n((e=>e.settings.doorbell_tone=t)),e((()=>import("./app-B_FGhboQ.js").then((e=>e.au))),[]).then((e=>e.playBell(t)))}}
                >
                  ${a(`bell_${t}`)}
                </button>`))}
            </div>
          </div>`,t.allows("motion_levels")?r`<div class="field">
                ${a("motion")}
                <div class="seg">${["full","light","off"].map((e=>r`<button aria-pressed=${i.motion===e} @click=${()=>n((t=>t.settings.motion=e))}>${a(`motion_${e}`)}</button>`))}</div>
                <span class="hint">${a("motion_hint")}</span>
              </div>`:o,t.allows("high_contrast")?r`<div class="field">${a("high_contrast")} ${nt(t,!!i.contrast,(e=>n((t=>t.settings.contrast=e))))}</div>`:o),t.allows("travel")?function(e,t){const{t:s,hass:i,config:a}=e,n=a.settings.travel,l=$(a).filter((e=>i.states[e])),c=l.filter((e=>["switch","valve","water_heater","climate","media_player","fan","humidifier"].includes(b(e)))),d=l.filter((e=>"light"===b(e))),g=Object.keys(i.services?.notify??{}).filter((e=>"send_message"!==e&&"persistent_notification"!==e)).map((e=>`notify.${e}`)),u=(e,s,n)=>r`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:8px">
    ${e.map((e=>{const l=s.includes(e);return r`<button
        class="btn pressable ${l?"primary":""}"
        style="justify-content:flex-start;font-weight:500"
        aria-pressed=${l}
        @click=${()=>t((t=>t.settings.travel[n]=l?t.settings.travel[n].filter((t=>t!==e)):[...t.settings.travel[n],e]))}
      >
        <sn-icon icon=${l?"check":"close"} style="--icon-size:18px"></sn-icon>${p(i,a,e)}
      </button>`}))}
  </div>`;return Je(s("travel"),r`<span class="field">${s("travel_off_pick")}</span>`,u(c,n.off,"off"),r`<div class="field">${s("travel_sim")} ${nt(e,n.simulate,(e=>t((t=>t.settings.travel.simulate=e))))}</div>`,n.simulate?u(d,n.lights,"lights"):o,r`<div class="field">${s("travel_arm")} ${nt(e,n.arm,(e=>t((t=>t.settings.travel.arm=e))))}</div>`,r`<label class="field"
      >${s("travel_report")}
      <select @change=${e=>t((t=>t.settings.travel.notify=e.target.value||void 0))}>
        <option value="" ?selected=${!n.notify}>–</option>
        ${g.map((e=>r`<option value=${e} ?selected=${n.notify===e}>${e}</option>`))}
      </select>
    </label>`)}(t,n):o,t.allows("home_helpers")?function(e,t){const{t:s,hass:i,config:a}=e,n=a.settings,l=Object.values(i.states),o=(e,t)=>l.filter((s=>s.entity_id.startsWith(`${e}.`)&&(!t||t.includes(s.attributes.device_class)))).map((e=>e.entity_id)),c=o("sensor",["power"]).sort(((e,t)=>Number(/wash|dry|dish|غسال|نشاف|جلاي/i.test(p(i,a,t)+t))-Number(/wash|dry|dish|غسال|نشاف|جلاي/i.test(p(i,a,e)+e)))),d=l.filter((e=>e.entity_id.endsWith("_direction_of_travel"))).length,g=(e,t,...i)=>r`<div style="display:grid;gap:8px;padding:12px;border-radius:var(--r-md);background:var(--surface-2)">
    <b>${e}</b><span class="muted" style="font-size:13px">${s(t)}</span>${i}
  </div>`;return Je(s("helpers"),g(s("h_appliances"),"h_appliances_hint",pt(e,c.slice(0,24),n.appliances.map((e=>e.power)),((e,s)=>t((t=>{t.settings.appliances=s?[...t.settings.appliances,{power:e,name:p(i,a,e).replace(/\s*(power|استهلاك|consumption)\s*/gi," ").trim()}]:t.settings.appliances.filter((t=>t.power!==e))}))))),g(s("h_night_path"),"h_night_path_hint",pt(e,o("binary_sensor",["motion","occupancy","presence"]),n.night_path.motion,((e,s)=>t((t=>t.settings.night_path.motion=dt(t.settings.night_path.motion,e,s))))),pt(e,o("light"),n.night_path.lights,((e,s)=>t((t=>t.settings.night_path.lights=dt(t.settings.night_path.lights,e,s))))),Ue(r`<span>${s("from")}</span>`,r`<input type="time" style="width:auto" .value=${n.night_path.from} @change=${e=>t((t=>t.settings.night_path.from=e.target.value))} />`,r`<span>${s("to")}</span>`,r`<input type="time" style="width:auto" .value=${n.night_path.to} @change=${e=>t((t=>t.settings.night_path.to=e.target.value))} />`,r`<span>${s("brightness")}</span>`,r`<input type="number" min="1" max="100" style="width:80px" .value=${String(n.night_path.brightness)} @change=${e=>t((t=>t.settings.night_path.brightness=Number(e.target.value)||10))} />`)),g(s("h_arrival"),d?"h_arrival_hint":"h_arrival_missing",pt(e,o("climate"),n.arrival.climate,((e,s)=>t((t=>t.settings.arrival.climate=dt(t.settings.arrival.climate,e,s))))),pt(e,o("light"),n.arrival.lights,((e,s)=>t((t=>t.settings.arrival.lights=dt(t.settings.arrival.lights,e,s))))),Ue(r`<span>${s("h_arrival_km")}</span>`,r`<input type="number" min="1" max="50" style="width:80px" .value=${String(n.arrival.km)} @change=${e=>t((t=>t.settings.arrival.km=Number(e.target.value)||5))} />`)),g(s("h_outage"),"h_outage_hint",He(e,s("h_outage_sensor"),n.outage.sensor,{domains:["binary_sensor","sensor"]},(e=>t((t=>t.settings.outage.sensor=e))),!0),pt(e,[...o("switch"),...o("climate"),...o("water_heater")].filter((e=>!i.entities?.[e]?.entity_category)),n.outage.shed,((e,s)=>t((t=>t.settings.outage.shed=dt(t.settings.outage.shed,e,s)))))))}(t,n):o,t.allows("support")?Je(a("installer"),r`<label class="field">${a("installer_name")}<input type="text" .value=${i.installer.name??""} placeholder="SmartNest" @change=${e=>n((t=>t.settings.installer.name=e.target.value.trim()||void 0))} /></label>`,t.allows("white_label")?r`<div class="field">
                    ${a("brand_logo")}
                    <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
                      ${i.installer.brand?.logo?r`<img src=${i.installer.brand.logo} alt="" style="height:40px;max-width:120px;object-fit:contain" />`:o}
                      <input
                        type="file"
                        accept="image/png,image/svg+xml,image/webp,image/jpeg"
                        style="flex:1"
                        @change=${async e=>{const s=e.target.files?.[0];if(s)try{const e=await U(s);n((t=>t.settings.installer.brand={...t.settings.installer.brand??{},name:t.settings.installer.name,logo:e,v:-Date.now()}))}catch{t.toast(a("error"))}}}
                      />
                      ${i.installer.brand?.logo?r`<button class="btn pressable" @click=${()=>n((e=>e.settings.installer.brand={...e.settings.installer.brand,logo:null}))}>${a("delete")}</button>`:o}
                    </div>
                    <span class="hint">${a("brand_hint")}</span>
                  </div>`:o,r`<label class="field"
                >${a("installer_phone")}<input type="tel" class="ltr" .value=${i.installer.phone??""} placeholder="972501234567" @change=${e=>n((t=>t.settings.installer.phone=e.target.value.trim()||void 0))} />
                <span class="hint">${a("installer_phone_hint")}</span></label
              >`):o,t.allows("alarm_screen")?Je(a("emergency"),r`<label class="field">${a("police_number")}<input type="tel" class="ltr" .value=${i.emergency.police} @change=${e=>n((t=>t.settings.emergency.police=e.target.value.trim()))} /></label>`,r`<label class="field"
                >${a("emergency_contacts")}
                <textarea
                  rows="3"
                  class="ltr"
                  placeholder="أبو محمد, 0501234567"
                  .value=${i.emergency.contacts.map((e=>`${e.name}, ${e.phone}`)).join("\n")}
                  @change=${e=>n((t=>t.settings.emergency.contacts=String(e.target.value).split("\n").map((e=>e.split(","))).filter((e=>e.length>=2&&e[1].trim())).map((([e,t])=>({name:e.trim(),phone:t.trim()}))).slice(0,4)))}
                ></textarea>
                <span class="hint">${a("emergency_hint")}</span>
              </label>`):o,Je(a("weather"),He(t,a("weather_entity"),i.weather.entity,{domains:["weather"]},(e=>n((t=>t.settings.weather.entity=e))),!0),r`<div class="field">${a("weather_bg")} ${nt(t,i.weather.background,(e=>n((t=>t.settings.weather.background=e))))}</div>`),function(e,t){const s=e.t,i=e.config.settings.fully,a=z(e.hass);if(!a.length)return Je(s("tablet"),r`<p class="muted" style="margin:0;font-size:14px">${s("tablet_none")}</p>`);const n=le(e.hass);return Je(s("tablet"),r`<p class="muted" style="margin:0;font-size:14px">
      ${s("tablet_found",{names:a.map((e=>e.name)).join("ar"===e.lang?"، ":", ")})} ·
      ${n?r`<strong style="color:var(--success)">✓ ${s("tablet_this")}</strong>`:s("tablet_not_this")}
    </p>`,window.fully?o:r`<p class="muted" style="margin:0;font-size:13px">${s("tablet_js_hint")}</p>`,r`<div class="field">${s("night_dim")} ${nt(e,i.night_dim,(e=>t((t=>t.settings.fully.night_dim=e))))}</div>`,i.night_dim?r`${lt(s("night_brightness"),i.night_brightness,1,100,(e=>t((t=>t.settings.fully.night_brightness=e))))}
        ${lt(s("night_off"),i.night_off_min,0,240,(e=>t((t=>t.settings.fully.night_off_min=e))))}`:o,r`<div class="field">
      ${s("motion_wake")} ${nt(e,i.motion_wake,(e=>t((t=>t.settings.fully.motion_wake=e))))}
      <span class="hint">${s("motion_wake_hint")}</span>
    </div>`)}(t,n),Je(a("doorbell"),He(t,a("doorbell_trigger"),i.doorbell.trigger_entity,{domains:["event","binary_sensor"]},(e=>n((t=>t.settings.doorbell.trigger_entity=e))),!0),He(t,a("doorbell_camera"),i.doorbell.camera_entity,{domains:["camera"]},(e=>n((t=>t.settings.doorbell.camera_entity=e))),!0),He(t,a("doorbell_lock"),i.doorbell.lock_entity,{domains:["lock"]},(e=>n((t=>t.settings.doorbell.lock_entity=e))),!0),He(t,a("doorbell_speaker"),i.doorbell.speaker_entity,{domains:["media_player"]},(e=>n((t=>t.settings.doorbell.speaker_entity=e))),!0),lt(a("keep_days"),i.doorbell.keep_days,1,30,(e=>n((t=>t.settings.doorbell.keep_days=e)))),r`<button class="btn pressable" style="justify-self:start" @click=${s.testDoorbell}>
            <sn-icon icon="bell-ring" style="--icon-size:20px"></sn-icon>${a("doorbell_test")}
          </button>`),Je(a("kiosk"),r`<form
            class="field"
            @submit=${e=>{e.preventDefault();const s=e.currentTarget.querySelector("input"),i=s.value.trim();if(!/^\d{4,8}$/.test(i))return t.toast(a("kiosk_pin_invalid"));const l=Y();n((e=>e.settings.kiosk={pin_hash:pe(i,l),pin_salt:l,pin_length:i.length})),s.value="",t.toast(a("kiosk_pin_saved"))}}
          >
            ${a("kiosk_pin")}
            <div style="display:flex;gap:8px">
              <input type="password" inputmode="numeric" pattern="[0-9]*" maxlength="8" autocomplete="off" placeholder="••••" style="flex:1" />
              <button class="btn primary pressable" type="submit">${a(i.kiosk.pin_hash?"kiosk_pin_change":"kiosk_pin_set")}</button>
            </div>
            <span class="hint">${a("kiosk_pin_hint")}</span>
            <span class="hint">${a("kiosk_full_lock")}</span>
          </form>`,i.kiosk.pin_hash?r`<button class="btn pressable" style="justify-self:start" @click=${()=>n((e=>e.settings.kiosk={}))}>
                <sn-icon icon="lock-open" style="--icon-size:20px"></sn-icon>${a("kiosk_remove_pin")}
              </button>`:o),t.allows("broadcast")?Je(a("speakers"),r`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px">
                ${Object.keys(t.hass.states).filter((e=>e.startsWith("media_player."))).map((e=>{const s=i.speakers.includes(e);return r`<button
                      class="btn pressable ${s?"primary":""}"
                      style="justify-content:flex-start;font-weight:500"
                      @click=${()=>n((t=>t.settings.speakers=s?t.settings.speakers.filter((t=>t!==e)):[...t.settings.speakers,e]))}
                    >
                      <sn-icon icon=${s?"check":"speaker"} style="--icon-size:18px"></sn-icon>${p(t.hass,t.config,e)}
                    </button>`}))}
              </div>`):o,t.allows("maintenance")?Je(a("maintenance"),...i.maintenance.map(((e,t)=>r`<div style="display:flex;gap:8px;align-items:center">
                  <span style="flex:1">${e.title}</span>
                  <span class="muted ltr" style="font-size:13px">${e.every_days}d</span>
                  <button class="btn pressable" style="min-height:34px;font-size:13px" @click=${()=>n((e=>e.settings.maintenance[t].last=(new Date).toISOString()))}>
                    ${a("m_done")}
                  </button>
                  <button class="icon-btn small pressable" aria-label=${a("delete")} @click=${()=>n((e=>e.settings.maintenance.splice(t,1)))}>
                    <sn-icon icon="close" style="--icon-size:16px"></sn-icon>
                  </button>
                </div>`)),r`<form
                style="display:flex;gap:8px;flex-wrap:wrap"
                @submit=${e=>{e.preventDefault();const t=e.currentTarget,s=t.elements.namedItem("title").value.trim(),i=Number(t.elements.namedItem("every").value)||90;s&&(n((e=>e.settings.maintenance.push({id:c(),title:s,every_days:i,last:(new Date).toISOString()}))),t.reset())}}
              >
                <input name="title" type="text" placeholder=${a("m_title")} style="flex:2;min-width:160px" />
                <input name="every" type="number" min="1" placeholder=${a("m_every")} style="flex:1;min-width:90px" />
                <button class="btn primary pressable" type="submit">${a("add")}</button>
              </form>`):o,Je(a("transfer"),r`<div style="display:flex;gap:8px;flex-wrap:wrap">
            <button class="btn pressable" @click=${()=>L(t.config)}><sn-icon icon="export" style="--icon-size:18px"></sn-icon>${a("export_config")}</button>
            <label class="btn pressable" style="cursor:pointer">
              <sn-icon icon="import" style="--icon-size:18px"></sn-icon>${a("import_config")}
              <input
                type="file"
                accept="application/json,.json"
                style="display:none"
                @change=${e=>{const s=e.target.files?.[0];e.target.value="",s&&E(t,s)}}
              />
            </label>
          </div>`),Je(a("about"),r`<div style="display:flex;align-items:center;gap:14px">
            <img src="${t.assetBase}logo/smartnest-symbol-${t.dark?"white":"color"}.svg" alt="SmartNest" style="width:48px;height:48px" />
            <div style="display:grid;gap:2px">
              <strong>SmartNest</strong>
              <span class="muted" style="font-size:13px">${a("tagline")}</span>
              <span class="muted ltr" style="font-size:12px;font-family:'JetBrains Mono',monospace">${a("version")} ${s.version}</span>
              ${s.license?.licensee?r`<span class="muted" style="font-size:12px">${a("licensed_to")} ${s.license.licensee}</span>`:o}
              <button class="btn pressable" style="justify-self:start;min-height:34px;font-size:13px;margin-top:6px" @click=${()=>R(t)}>
                <sn-icon icon="star" style="--icon-size:16px;color:var(--accent)"></sn-icon>${a("rate_service")}
              </button>
              ${s.license?r`<span class="muted" style="font-size:12px">
                    ${a("plan_label")}: <strong style="color:var(--accent-text)">${a(`plan_${s.license.plan}`)}</strong>${s.license.trial?` (${a("trial_label")})`:""}
                    ${s.license.expires?r` · ${a("expires_on")} ${new Date(1e3*s.license.expires).toLocaleDateString()}`:o}
                    ${s.license.reseller?r` · ${a("via")} ${s.license.reseller}`:o}
                  </span>
                  ${s.checkLicense?r`<button
                        class="btn pressable"
                        style="justify-self:start;min-height:34px;font-size:13px"
                        @click=${async e=>{const i=e.currentTarget;i.disabled=!0;const n=await s.checkLicense().catch((()=>a("error")));i.disabled=!1,t.toast(n),t.closeSheet()}}
                      >
                        <sn-icon icon="refresh" style="--icon-size:16px"></sn-icon>${a("lic_check")}
                      </button>`:o}`:o}
            </div>
          </div>`))}})}function pt(e,t,s,i){return t.length?r`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:8px">
    ${t.map((t=>{const a=s.includes(t);return r`<button class="btn pressable ${a?"primary":""}" style="justify-content:flex-start;font-weight:500" aria-pressed=${a} @click=${()=>i(t,!a)}>
        <sn-icon icon=${a?"check":"close"} style="--icon-size:18px"></sn-icon>${p(e.hass,e.config,t)}
      </button>`}))}
  </div>`:r`<span class="muted" style="font-size:13px">${e.t("no_entities")}</span>`}const dt=(e,t,s)=>s?[...new Set([...e,t])]:e.filter((e=>e!==t));let gt=class extends n{async connectedCallback(){super.connectedCallback(),this.users=await this.ctx.hass.callWS({type:"config/auth/list"}).then((e=>e.filter((e=>!e.system_generated&&e.is_active))),(()=>[]))}render(){const{t:e}=this.ctx,t=this.page.users??[];return this.users?.length?r`<div class="field">
      ${e("page_users")}
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        ${this.users.map((e=>{const s=t.includes(e.id);return r`<button
            class="btn pressable ${s?"primary":""}"
            style="min-height:36px;font-size:14px"
            @click=${()=>this.onChange(s?t.filter((t=>t!==e.id)):[...t,e.id])}
          >
            ${e.name}
          </button>`}))}
      </div>
      <span class="hint">${e(t.length?"page_users_some":"page_users_all")}</span>
    </div>`:o}};gt.styles=[t],Ee([i({attribute:!1})],gt.prototype,"ctx",2),Ee([i({attribute:!1})],gt.prototype,"page",2),Ee([i({attribute:!1})],gt.prototype,"onChange",2),Ee([a()],gt.prototype,"users",2),gt=Ee([u("sn-page-users")],gt);export{gt as SnPageUsers,it as addPageSheet,st as addWidgetSheet,He as entityField,Ve as multiField,at as pageSettingsSheet,ct as settingsSheet,Ze as widgetSettingsSheet};
