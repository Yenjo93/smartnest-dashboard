import{i as t,a8 as e,A as s,b as a,M as r,a9 as i,v as n,x as o,n as l,r as p,t as c}from"./app-CRA54UwA.js";import"./loader-43RavMas.js";var d=Object.defineProperty,h=Object.getOwnPropertyDescriptor,m=(t,e,s,a)=>{for(var r,i=a>1?void 0:a?h(e,s):e,n=t.length-1;n>=0;n--)(r=t[n])&&(i=(a?r(e,s,i):r(i))||i);return a&&i&&d(e,s,i),i};const u=864e5,b=t=>new Date(1e3*t).toLocaleDateString("ar-u-nu-latn",{day:"numeric",month:"short",year:"numeric"}),g=t=>`https://wa.me/${t.phone.replace(/\D/g,"")}?text=${encodeURIComponent((t=>[`مرحبا ${t.name} 👋`,"هاد مفتاح تفعيل SmartNest لبيتك:","",t.key,"","افتح SmartNest بـ Home Assistant، الصق المفتاح، واضغط تفعيل."].join("\n"))(t))}`;let y=class extends t{constructor(){super(...arguments),this.narrow=!1,this.houses=[],this.blocked=[],this.designs={},this.beats={},this.beatUrl="",this.beatPath="",this.beatBase="",this.beatTest="",this.plan="premium",this.days="",this.q="",this.filter="all",this.error="",this.toastMsg=""}get assetBase(){return this.panel?.config?.asset_base??"/smartnest_static/static/"}connectedCallback(){if(super.connectedCallback(),!document.getElementById("smartnest-fonts")){const t=document.createElement("style");t.id="smartnest-fonts",t.textContent=e(this.assetBase),document.head.appendChild(t)}this.refresh()}get dark(){return!!this.hass?.themes?.darkMode}async refresh(){try{const t=await this.hass.callWS({type:"smartnest/issuer/status"});if(this.blocked=t.blocked??[],this.brand=t.brand??void 0,this.designs=t.designs??{},this.ready=t.ready,this.houses=t.houses,this.beats=t.beats??{},this.beatUrl=t.heartbeat_url??"",this.beatPath=t.heartbeat_path??"",!this.beatBase){let t="";try{t=localStorage.getItem("smartnest-beat-base")??""}catch{}const e=/^https:\/\//.test(this.beatUrl)&&!/nabu\.casa/.test(this.beatUrl)?new URL(this.beatUrl).origin:"";this.beatBase=t||("https:"===location.protocol?location.origin:e)}}catch{this.ready=!1}}toast(t){this.toastMsg=t,window.clearTimeout(this.toastTimer),this.toastTimer=window.setTimeout((()=>this.toastMsg=""),2200)}async copy(t){try{await navigator.clipboard.writeText(t),this.toast("انسخ ✓")}catch{window.prompt("انسخ:",t)}}get latest(){const t=new Map;for(const e of this.houses)(!t.has(e.install)||t.get(e.install).issued<e.issued)&&t.set(e.install,e);return[...t.values()].sort(((t,e)=>e.issued-t.issued))}async issue(t){t.preventDefault();const e=t.currentTarget,s=new FormData(e),a=String(s.get("install")??"").trim().toLowerCase();if(this.error="",!/^[0-9a-f]{32}$/.test(a))return void(this.error="رقم التركيب لازم يكون 32 حرف (من شاشة التفعيل عند الزبون)");const r="custom"===this.days?Number(s.get("customDays"))||void 0:this.days?Number(this.days):void 0;try{const t=await this.hass.callWS({type:"smartnest/issuer/issue",install:a,name:String(s.get("name")??"").trim(),plan:this.plan,days:r,trial:!!s.get("trial"),reseller:String(s.get("reseller")??""),phone:String(s.get("phone")??""),note:String(s.get("note")??"")});this.last=t,this.copy(t.key),e.reset(),this.plan="premium",this.days="",this.refresh()}catch(i){this.error=i?.message??"خطأ"}}async renew(t,e,s){if(confirm(s))try{const s=await this.hass.callWS({type:"smartnest/issuer/renew",house:t.id,...e});this.refresh(),this.beats[t.install]?this.toast("✓ تجدد، وبيوصل للبيت لحاله خلال 3 ساعات"):this.copy(s.key)}catch(a){this.toast(`ما زبطت: ${a?.message??a?.code??""}`)}}async block(t,e){const s=this.beats[t.install]?"بيوصله مع النبض الجاي (خلال 3 ساعات).":"⚠️ هاد البيت لسا ما بعتلك نبض (يمكن على نسخة قديمة أو بدون إنترنت)، فبيوصله أول ما يتحدث ويتصل.";if(confirm(e?`توقّف ${t.name}؟ الداشبورد عنده بيتقفل.\n${s}`:`ترجّع ${t.name}؟\n${s}`))try{await this.hass.callWS({type:"smartnest/issuer/block",install:t.install,blocked:e}),this.toast(e?"⛔ انوقف":"✓ رجع"),this.refresh()}catch(a){this.toast(`ما زبطت: ${a?.message??""}`)}}renderBrand(){const t=this.brand;return a`<details class="card">
      <summary>🏷️ اسمك ولوجوك عند كل الزباين</summary>
      <span class="muted" style="font-size:14px">بيطلعوا بدل SmartNest بشريط الداشبورد وعلى شاشة التوقف، بكل البيوت (2.0)، مع النبض الجاي.</span>
      <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-top:8px">
        ${t?.logo?a`<img src=${t.logo} alt="" style="height:44px;max-width:140px;object-fit:contain" />`:s}
        <input
          type="text"
          placeholder="اسم شركتك"
          .value=${t?.name??""}
          style="flex:1;min-width:160px"
          @change=${t=>this.saveBrand({name:t.target.value.trim()})}
        />
        <input
          type="file"
          accept="image/png,image/svg+xml,image/webp,image/jpeg"
          @change=${async t=>{const e=t.target.files?.[0];e&&this.saveBrand({logo:await r(e)})}}
        />
        ${t?.name||t?.logo?a`<button class="btn pressable" @click=${()=>this.saveBrand({clear:!0})}>رجّع SmartNest</button>`:s}
      </div>
    </details>`}async saveBrand(t){try{this.brand=await this.hass.callWS({type:"smartnest/issuer/brand",...t}),this.toast("✓ بيوصل للبيوت مع النبض الجاي")}catch{this.toast("ما زبطت (اللوجو لازم يكون صغير)")}}sendDesign(t){const e=document.createElement("input");e.type="file",e.accept=".json,application/json";const s=async(e,s)=>{try{await this.hass.callWS({type:"smartnest/issuer/send_design",install:t.install,config:e,name:s}),this.toast("✓ بيوصل مع النبض الجاي، وبيستنى موافقتهم"),this.refresh()}catch{this.toast("ما زبطت")}};confirm(`تبعت لـ ${t.name} تصميم داشبورد بيتك هاد؟\n(إلغاء = اختار ملف تصميم مصدّر)`)?this.hass.callWS({type:"smartnest/config/get"}).then((t=>s(t?.config??t,"تصميم من المركّب")),(()=>this.toast("ما زبطت"))):(e.onchange=async()=>{const t=e.files?.[0];if(t)try{const e=JSON.parse(await t.text());s(e.config??e,t.name.replace(/\.json$/i,""))}catch{this.toast("هاد مش ملف داشبورد")}},e.click())}reportText(t){const e=this.beats[t.install],s=[`مرحبا ${t.name} 👋`,"تقرير بيتك الذكي:"];if(e){const t=Math.round((Date.now()/1e3-e.at)/3600);s.push(t<24?"✅ البيت شغّال ومتصل":`⚠️ البيت ما اتصل من ${Math.round(t/24)} يوم`),s.push(e.offline?`🔌 ${e.offline} أجهزة فاصلة: ${e.offline_names.join("، ")}`:"🔌 كل الأجهزة شغّالة"),e.low_battery&&s.push(`🔋 ${e.low_battery} بطاريات ضعيفة، بدها تبديل`),e.backup&&s.push(`💾 آخر نسخة احتياطية: ${e.backup.slice(0,10)}`)}else s.push("لسا ما وصلني تقرير من البيت.");return t.expires&&s.push(`📅 الاشتراك لحد ${b(t.expires)}`),s.join("\n")}renderSetup(){return a`<div class="card">
      <h2>🔑 ركّب مفتاح التوقيع</h2>
      <span class="muted">ارفع ملف <span class="mono">license-private.pem</span> من فولدر <span class="mono">~/.smartnest</span> على الكمبيوتر. بعدها هاي الصفحة بتصير تعمل مفاتيح للزباين.</span>
      <input
        type="file"
        accept=".pem"
        @change=${async t=>{const e=t.target.files?.[0];if(e)try{await this.hass.callWS({type:"smartnest/issuer/setup",pem:await e.text()}),this.toast("تمام ✓"),this.refresh()}catch{this.toast("هاد مش مفتاح SmartNest الصح")}}}
      />
    </div>`}renderForm(){const t=(t,e,s)=>a`<div class="seg">
      ${e.map((([e,r])=>a`<button type="button" aria-pressed=${t===e} @click=${()=>s(e)}>${r}</button>`))}
    </div>`;return a`<form class="card" autocomplete="off" @submit=${t=>this.issue(t)}>
      <h2>✨ مفتاح جديد</h2>
      <label class="field">رقم التركيب (من شاشة التفعيل عند الزبون)<input name="install" type="text" class="mono" placeholder="2a9291b812404fda9dabc988300cf5ce" required maxlength="40" /></label>
      <label class="field">اسم البيت أو الزبون<input name="name" type="text" placeholder="بيت أبو محمد" required /></label>
      <label class="field">واتساب الزبون (اختياري)<input name="phone" type="tel" class="mono" placeholder="972501234567" /></label>
      <div class="field">الباقة ${t(this.plan,[["basic","Basic"],["pro","Pro"],["premium","Premium"]],(t=>this.plan=t))}</div>
      <div class="field">
        المدة ${t(this.days,[["","بدون انتهاء"],["30","شهر"],["365","سنة"],["custom","…"]],(t=>this.days=t))}
        ${"custom"===this.days?a`<input name="customDays" type="number" min="1" placeholder="كم يوم" />`:s}
      </div>
      <label class="check"><input type="checkbox" name="trial" /> تجربة 14 يوم (Premium)</label>
      <details>
        <summary>أكثر</summary>
        <div style="display:grid;gap:10px;margin-top:10px">
          <label class="field">عن طريق (موزّع)<input name="reseller" type="text" /></label>
          <label class="field">ملاحظة<textarea name="note" rows="2" placeholder="مثلاً: فيلا، 3 طوابق"></textarea></label>
        </div>
      </details>
      <button class="btn primary pressable" type="submit" style="min-height:50px">اعمل المفتاح</button>
      ${this.error?a`<div class="err">${this.error}</div>`:s}
      ${this.last?a`<div class="result">
            <b>✓ ${this.last.name} · ${this.last.plan}</b>
            <code>${this.last.key}</code>
            <div class="row">
              <button class="btn primary pressable" type="button" @click=${()=>this.copy(this.last.key)}>نسخ</button>
              ${this.last.phone?a`<a class="btn pressable" target="_blank" rel="noopener" href=${g(this.last)}>ابعت عالواتساب</a>`:s}
            </div>
          </div>`:s}
    </form>`}renderBeat(t){const e=this.beats[t.install];if(!e)return s;const r=(Date.now()/1e3-e.at)/3600,i=r>12,n=r<1?"هلأ":r<24?`قبل ${Math.round(r)} ساعة`:`قبل ${Math.round(r/24)} يوم`,o=e.offline+e.low_battery;return a`<div class="beat ${i?"late":o?"warn":"ok"}">
      <b>${i?"⚠️ ما بعت نبض":o?"🟠 بدو شوية انتباه":"🟢 كل إشي تمام"}</b>
      <span>${n} · SmartNest ${e.version} · HA ${e.ha}</span>
      ${e.offline?a`<span>${e.offline} أجهزة فاصلة: ${e.offline_names.join("، ")}</span>`:s}
      ${e.low_battery?a`<span>${e.low_battery} بطاريات ضعيفة</span>`:s}
      ${this.blocked.includes(t.install)?a`<span>${e.revoked?"🔒 مقفول عنده":"⏳ بيتقفل أول ما البيت يتصل"}</span>`:e.revoked?a`<span>⏳ بيفتح أول ما البيت يتصل</span>`:s}
      ${void 0!==e.key_t?e.key_t>=t.issued?a`<span>🔑 المفتاح الأخير شغّال عنده</span>`:a`<span>🔑 المفتاح الجديد بيوصل لحاله أول ما البيت يتصل (كل 3 ساعات)</span>`:s}
    </div>`}renderHouse(t){const[e,r]=function(t){if(!t.expires)return["ok","بدون انتهاء"];const e=Math.ceil((1e3*t.expires-Date.now())/u);return e<0?["bad",`خلص من ${-e} يوم`]:e<=30?["soon",`باقي ${e} يوم`]:["ok",`لحد ${b(t.expires)}`]}(t),i=this.houses.filter((e=>e.install===t.install&&e.id!==t.id)).length;return a`<div class="house">
      <div class="top">
        <span class="nm">${t.name}</span>
        <span class="badge p-${t.plan}">${t.plan}${t.trial?" · تجربة":""}</span>
        ${this.blocked.includes(t.install)?a`<span class="badge s-bad">⛔ موقوف</span>`:a`<span class="badge s-${e}">${r}</span>`}
      </div>
      <div class="meta">
        <span class="mono" style="font-size:12px">${t.install}</span><span>انعمل ${b(t.issued)}</span>
        ${t.reseller?a`<span>عن طريق ${t.reseller}</span>`:s} ${i?a`<span>${i} مفاتيح قبل</span>`:s}
      </div>
      ${t.note?a`<div class="meta">📝 ${t.note}</div>`:s}
      ${this.renderBeat(t)}
      <div class="row">
        <button class="btn pressable" @click=${()=>this.copy(t.key)}>نسخ المفتاح</button>
        ${t.phone?a`<a class="btn pressable" target="_blank" rel="noopener" href=${g(t)}>واتساب</a>`:a`<button
              class="btn pressable"
              @click=${async()=>{const e=prompt("رقم واتساب الزبون (مع مفتاح الدولة)","");e&&(await this.hass.callWS({type:"smartnest/issuer/update",house:t.id,phone:e}),this.refresh())}}
            >
              + واتساب
            </button>`}
        <button class="btn pressable" @click=${()=>this.renew(t,{days:365},`مفتاح جديد لـ ${t.name} لمدة سنة من اليوم؟`)}>جدّد سنة</button>
        <button class="btn pressable" @click=${()=>this.sendDesign(t)}>🎨 ابعت تصميم${this.designs[t.install]?" ✓":""}</button>
        ${t.phone?a`<a class="btn pressable" target="_blank" rel="noopener" href=${`https://wa.me/${t.phone.replace(/\D/g,"")}?text=${encodeURIComponent(this.reportText(t))}`}>📋 تقرير</a>`:s}
        <select
          @change=${e=>{const s=e.target.value;if(e.target.value="",!s)return;const a=t.expires?Math.max(1,Math.ceil((1e3*t.expires-Date.now())/u)):void 0;this.renew(t,{plan:s,days:a},`مفتاح جديد لـ ${t.name} بباقة ${s}؟ (نفس المدة الباقية)`)}}
        >
          <option value="">غيّر الباقة…</option>
          ${["basic","pro","premium"].filter((e=>e!==t.plan)).map((t=>a`<option value=${t}>${t}</option>`))}
        </select>
        <button
          class="btn pressable"
          style="color:var(--alert-text)"
          @click=${async()=>{confirm(`تشيل ${t.name} من القائمة؟ (المفتاح نفسه بيضل شغّال)`)&&(await this.hass.callWS({type:"smartnest/issuer/remove",install:t.install}),this.refresh())}}
        >
          شيل
        </button>
        ${this.blocked.includes(t.install)?a`<button class="btn pressable" @click=${()=>this.block(t,!1)}>رجّعه</button>`:a`<button class="btn pressable" style="color:var(--alert-text)" @click=${()=>this.block(t,!0)}>⛔ أوقف</button>`}
      </div>
    </div>`}render(){const t=i(this.dark,""),e=Object.entries(t).map((([t,e])=>`${t}:${e}`)).join(";"),r=this.latest,n=this.q.trim().toLowerCase(),o=r.filter((t=>{if(n&&![t.name,t.install,t.note,t.phone,t.reseller].join(" ").toLowerCase().includes(n))return!1;const e=t.expires?1e3*t.expires-Date.now():1/0;return"soon"===this.filter?e>0&&e<30*u:"bad"!==this.filter||e<0})),l=r.filter((t=>t.expires&&1e3*t.expires>Date.now()&&1e3*t.expires-Date.now()<30*u)).length,p=t=>r.filter((e=>e.plan===t&&!e.trial)).length;return a`<div class="page" style=${e} dir="rtl">
      <div class="wrap">
        <header>
          ${this.narrow?a`<button class="icon-btn pressable menu" aria-label="menu" @click=${()=>this.dispatchEvent(new Event("hass-toggle-menu",{bubbles:!0,composed:!0}))}>
                <sn-icon icon="menu"></sn-icon>
              </button>`:s}
          <img src="${this.assetBase}logo/smartnest-symbol-${this.dark?"white":"color"}.svg" alt="" />
          <div><h1>التراخيص</h1><div class="sub">مفاتيح SmartNest لزباينك. بس إلك.</div></div>
        </header>
        ${void 0===this.ready?a`<span class="muted">…</span>`:this.ready?a`<div class="stats">
                ${[["🏠",r.length,"بيت"],["⭐",p("premium"),"Premium"],["💎",p("pro"),"Pro"],["🔹",p("basic"),"Basic"],["⏳",l,"قرّبوا يخلصوا"]].map((([t,e,s])=>a`<div class="stat"><b>${t} ${e}</b><span>${s}</span></div>`))}
              </div>
              <div class="cols">
                ${this.renderForm()}
                <div style="display:grid;gap:12px">
                  <div class="tools">
                    <input type="search" placeholder="🔍 دوّر باسم أو رقم أو ملاحظة" .value=${this.q} @input=${t=>this.q=t.target.value} />
                    <div class="seg" style="flex:none">
                      ${[["all","الكل"],["soon","قرّبت"],["bad","خلصت"]].map((([t,e])=>a`<button aria-pressed=${this.filter===t} @click=${()=>this.filter=t}>${e}</button>`))}
                    </div>
                  </div>
                  <div class="list">
                    ${o.length?o.map((t=>this.renderHouse(t))):a`<div class="empty">${r.length?"ما في نتايج":"لسا ما عملت مفاتيح. أول مفتاح من الفورم."}</div>`}
                  </div>
                  ${this.beatPath?(()=>{const t=this.beatBase?`${this.beatBase.replace(/\/+$/,"")}${this.beatPath}`:"";return a`<details class="card" open>
                          <summary>💓 نبض البيوت (تعرف المشاكل قبل ما يتصلوا)</summary>
                          <span class="muted" style="font-size:14px"
                            >هاد الرابط مبني جوّا SmartNest بكل البيوت (ومش مبيّن لا للزبون ولا للمركّب)، فما بدك تحطه بإيدك. كل بيت بيبعتلك كل 3 ساعات: شغّال، كم جهاز فاصل، وأي نسخة. ولما تجدّدله، المفتاح الجديد بيوصله لحاله بنفس الطريق.</span
                          >
                          <label class="field"
                            >عنوان HA تبعك من برا (دومين Cloudflare)
                            <input
                              type="url"
                              class="mono"
                              placeholder="https://ha.example.com"
                              .value=${this.beatBase}
                              @change=${t=>{this.beatBase=t.target.value.trim(),this.beatTest="";try{localStorage.setItem("smartnest-beat-base",this.beatBase)}catch{}}}
                            />
                          </label>
                          ${t?a`<code class="mono" style="word-break:break-all;font-size:12px">${t}</code>
                                <div class="row">
                                  <button class="btn pressable" @click=${()=>this.copy(t)}>نسخ الرابط</button>
                                  <button
                                    class="btn pressable"
                                    @click=${async()=>{this.beatTest="عم بجرّب…";const e=await this.hass.callWS({type:"smartnest/issuer/test_url",url:t}).catch((()=>{}));this.beatTest=e?200===e.status?"✓ الرابط شغّال من برا. البيوت بتقدر توصلك.":403===e.status||/cloudflare/i.test(e.server)?`✗ Cloudflare مسكّر الرابط (${e.status}). بـ Cloudflare: Security ← WAF، اعمل قاعدة Skip لـ /api/webhook/ (وطفّي Bot Fight Mode إذا شغّال، وإذا في Cloudflare Access استثني نفس المسار).`:0===e.status?`✗ ما قدر يوصل: ${e.body}`:`✗ رجع ${e.status}. تأكد من العنوان.`:"ما زبطت التجربة"}}
                                  >
                                    جرّب الرابط
                                  </button>
                                </div>
                                ${this.beatTest?a`<span style="font-size:14px">${this.beatTest}</span>`:s}`:a`<span class="muted" style="font-size:13px">اكتب العنوان اللي بتفتح فيه HA من برا البيت.</span>`}
                        </details>`})():s}
                  ${this.renderBrand()}
                  <details class="card">
                    <summary>أضف مفتاح قديم للقائمة</summary>
                    <form
                      style="display:grid;gap:10px;margin-top:10px"
                      @submit=${async t=>{t.preventDefault();const e=t.currentTarget;try{await this.hass.callWS({type:"smartnest/issuer/import",key:String(new FormData(e).get("key")??"")}),e.reset(),this.toast("انضاف ✓"),this.refresh()}catch(s){this.toast("exists"===s?.code?"موجود بالقائمة":"هاد مش مفتاح من توقيعك")}}}
                    >
                      <textarea name="key" class="mono" rows="3" placeholder="SN1...." required></textarea>
                      <button class="btn pressable" type="submit">أضف</button>
                    </form>
                  </details>
                  <details class="card">
                    <summary>شيل مفتاح التوقيع من هالبيت</summary>
                    <span class="muted" style="font-size:14px">الصفحة بتختفي، والمفاتيح اللي عملتها بتضل شغّالة. بترجّعها برفع الملف كمان مرة من SmartNest.</span>
                    <button
                      class="btn pressable"
                      style="color:var(--alert-text);justify-self:start"
                      @click=${async()=>{confirm("أكيد؟")&&(await this.hass.callWS({type:"smartnest/issuer/forget"}),this.refresh())}}
                    >
                      شيله
                    </button>
                  </details>
                </div>
              </div>`:this.renderSetup()}
      </div>
      ${this.toastMsg?a`<div class="toast" role="status">${this.toastMsg}</div>`:s}
    </div>`}};y.styles=[n,o`
      :host {
        display: block;
      }
      .page {
        min-height: 100vh;
        background: var(--bg);
        color: var(--text);
        font-family: var(--font);
      }
      .wrap {
        max-width: 1100px;
        margin: 0 auto;
        padding: 20px 16px 60px;
        display: grid;
        gap: 18px;
      }
      header {
        display: flex;
        align-items: center;
        gap: 14px;
      }
      header img {
        width: 46px;
        height: 46px;
      }
      header h1 {
        margin: 0;
        font-size: 24px;
      }
      header .sub {
        color: var(--text-2);
        font-size: 14px;
      }
      .menu {
        margin-inline-end: 4px;
      }
      .stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 12px;
      }
      .stat,
      .card,
      .house {
        background: var(--surface-solid);
        border-radius: var(--r-lg);
        box-shadow: 0 1px 0 var(--border);
      }
      .stat {
        padding: 16px;
      }
      .stat b {
        font-size: 28px;
        display: block;
      }
      .stat span {
        color: var(--text-2);
        font-size: 14px;
      }
      .cols {
        display: grid;
        grid-template-columns: minmax(300px, 380px) 1fr;
        gap: 18px;
        align-items: start;
      }
      :host([narrow]) .cols {
        grid-template-columns: 1fr;
      }
      @media (max-width: 860px) {
        .cols {
          grid-template-columns: 1fr;
        }
      }
      .card {
        padding: 18px;
        display: grid;
        gap: 12px;
      }
      .card h2 {
        margin: 0;
        font-size: 17px;
      }
      .mono {
        direction: ltr;
        text-align: left;
        font-family: ui-monospace, Menlo, monospace;
        font-size: 14px;
      }
      .check {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .check input {
        width: 20px;
        min-height: 20px;
      }
      .result {
        border: 1px solid var(--accent);
        background: color-mix(in srgb, var(--accent) 10%, transparent);
        border-radius: var(--r-md);
        padding: 12px;
        display: grid;
        gap: 8px;
        animation: in 400ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .result code {
        word-break: break-all;
        font-size: 12px;
        direction: ltr;
        text-align: left;
      }
      .err {
        color: var(--alert-text);
        font-size: 14px;
      }
      .tools {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
      .tools input {
        flex: 1;
        min-width: 180px;
      }
      .list {
        display: grid;
        gap: 10px;
      }
      .house {
        padding: 14px 16px;
        display: grid;
        gap: 8px;
        animation: in 300ms cubic-bezier(0.22, 1, 0.36, 1) both;
      }
      .top {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
      }
      .nm {
        font-weight: 700;
        font-size: 17px;
        flex: 1;
        min-width: 140px;
      }
      .badge {
        font-size: 12px;
        font-weight: 700;
        padding: 3px 10px;
        border-radius: 999px;
      }
      .p-premium {
        background: #2a2118;
        color: #f5c46b;
      }
      .p-pro {
        background: #e3efff;
        color: #1e5fbf;
      }
      .p-basic {
        background: var(--surface-2);
        color: var(--text-2);
      }
      .s-ok {
        background: color-mix(in srgb, var(--success) 16%, transparent);
        color: var(--success);
      }
      .s-soon {
        background: color-mix(in srgb, #e9971d 18%, transparent);
        color: #b36b00;
      }
      .s-bad {
        background: color-mix(in srgb, var(--alert) 16%, transparent);
        color: var(--alert-text);
      }
      .meta {
        color: var(--text-2);
        font-size: 13px;
        display: flex;
        gap: 14px;
        flex-wrap: wrap;
      }
      .row {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        align-items: center;
      }
      a.btn {
        text-decoration: none;
      }
      .row .btn,
      .row select {
        min-height: 36px;
        font-size: 13px;
        width: auto;
      }
      .beat {
        display: grid;
        gap: 2px;
        padding: 8px 12px;
        border-radius: var(--r-md);
        font-size: 13px;
        border-inline-start: 4px solid var(--success);
        background: color-mix(in srgb, var(--success) 8%, transparent);
      }
      .beat.warn {
        border-color: #e9971d;
        background: color-mix(in srgb, #e9971d 10%, transparent);
      }
      .beat.late {
        border-color: var(--alert);
        background: color-mix(in srgb, var(--alert) 10%, transparent);
      }
      .beat span {
        color: var(--text-2);
      }
      .empty {
        color: var(--text-2);
        text-align: center;
        padding: 30px;
      }
      .toast {
        position: fixed;
        inset-inline: 0;
        bottom: 24px;
        margin: auto;
        width: max-content;
        background: var(--text);
        color: var(--surface-solid);
        padding: 10px 18px;
        border-radius: 999px;
        font-weight: 500;
        animation: in 300ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      details summary {
        cursor: pointer;
        color: var(--text-2);
        font-size: 14px;
      }
      @keyframes in {
        from {
          opacity: 0;
          transform: translateY(6px);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .house,
        .result,
        .toast {
          animation: none;
        }
      }
    `],m([l({attribute:!1})],y.prototype,"hass",2),m([l({type:Boolean,reflect:!0})],y.prototype,"narrow",2),m([l({attribute:!1})],y.prototype,"panel",2),m([p()],y.prototype,"ready",2),m([p()],y.prototype,"houses",2),m([p()],y.prototype,"blocked",2),m([p()],y.prototype,"brand",2),m([p()],y.prototype,"designs",2),m([p()],y.prototype,"beats",2),m([p()],y.prototype,"beatUrl",2),m([p()],y.prototype,"beatPath",2),m([p()],y.prototype,"beatBase",2),m([p()],y.prototype,"beatTest",2),m([p()],y.prototype,"plan",2),m([p()],y.prototype,"days",2),m([p()],y.prototype,"q",2),m([p()],y.prototype,"filter",2),m([p()],y.prototype,"last",2),m([p()],y.prototype,"error",2),m([p()],y.prototype,"toastMsg",2),y=m([c("sn-licenses-page")],y);export{y as SmartNestLicenses};
