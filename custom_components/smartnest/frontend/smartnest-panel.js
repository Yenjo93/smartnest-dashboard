const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let n=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}};const o=t=>new n("string"==typeof t?t:t+"",void 0,i),a=(t,...e)=>{const s=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new n(s,t,i)},r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return o(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:p,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,g=globalThis,m=g.trustedTypes,f=m?m.emptyScript:"",b=g.reactiveElementPolyfillSupport,v=(t,e)=>t,_={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(s){i=null}}return i}},y=(t,e)=>!l(t,e),x={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);n?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...p(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const t=this._$Eu(e,i);void 0!==t&&this._$Eh.set(t,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of s){const s=document.createElement("style"),n=t.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:_).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:_;this._$Em=s;const o=n.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(void 0!==t){const o=this.constructor;if(!1===s&&(n=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??y)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==n||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((t=>this._$ET(t,this[t]))),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[v("elementProperties")]=new Map,w[v("finalized")]=new Map,b?.({ReactiveElement:w}),(g.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,k=$.trustedTypes,C=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,A="$lit$",H=`lit$${Math.random().toFixed(9).slice(2)}$`,M="?"+H,V=`<${M}>`,L=document,S=()=>L.createComment(""),z=t=>null===t||"object"!=typeof t&&"function"!=typeof t,P=Array.isArray,E="[ \t\n\f\r]",D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,T=/>/g,j=RegExp(`>|${E}(?:([^\\s"'>=/]+)(${E}*=${E}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,N=/"/g,R=/^(?:script|style|textarea|title)$/i,Z=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),F=Z(1),B=Z(2),U=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),q=new WeakMap,X=L.createTreeWalker(L,129);function Y(t,e){if(!P(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(e):e}class K{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const a=t.length-1,r=this.parts,[l,c]=((t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":3===e?"<math>":"",a=D;for(let r=0;r<i;r++){const e=t[r];let i,l,c=-1,d=0;for(;d<e.length&&(a.lastIndex=d,l=a.exec(e),null!==l);)d=a.lastIndex,a===D?"!--"===l[1]?a=O:void 0!==l[1]?a=T:void 0!==l[2]?(R.test(l[2])&&(n=RegExp("</"+l[2],"g")),a=j):void 0!==l[3]&&(a=j):a===j?">"===l[0]?(a=n??D,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,i=l[1],a=void 0===l[3]?j:'"'===l[3]?N:I):a===N||a===I?a=j:a===O||a===T?a=D:(a=j,n=void 0);const p=a===j&&t[r+1].startsWith("/>")?" ":"";o+=a===D?e+V:c>=0?(s.push(i),e.slice(0,c)+A+e.slice(c)+H+p):e+H+(-2===c?r:p)}return[Y(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]})(t,e);if(this.el=K.createElement(l,i),X.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=X.nextNode())&&r.length<a;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(A)){const e=c[o++],i=s.getAttribute(t).split(H),a=/([.?@])?(.*)/.exec(e);r.push({type:1,index:n,name:a[2],strings:i,ctor:"."===a[1]?et:"?"===a[1]?it:"@"===a[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(H)&&(r.push({type:6,index:n}),s.removeAttribute(t));if(R.test(s.tagName)){const t=s.textContent.split(H),e=t.length-1;if(e>0){s.textContent=k?k.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],S()),X.nextNode(),r.push({type:2,index:++n});s.append(t[e],S())}}}else if(8===s.nodeType)if(s.data===M)r.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(H,t+1));)r.push({type:7,index:n}),t+=H.length-1}n++}}static createElement(t,e){const i=L.createElement("template");return i.innerHTML=t,i}}function G(t,e,i=t,s){if(e===U)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const o=z(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=G(t,n._$AS(t,e.values),n,s)),e}class J{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??L).importNode(e,!0);X.currentNode=s;let n=X.nextNode(),o=0,a=0,r=i[0];for(;void 0!==r;){if(o===r.index){let e;2===r.type?e=new Q(n,n.nextSibling,this,t):1===r.type?e=new r.ctor(n,r.name,r.strings,this,t):6===r.type&&(e=new nt(n,this,t)),this._$AV.push(e),r=i[++a]}o!==r?.index&&(n=X.nextNode(),o++)}return X.currentNode=L,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),z(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==U&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>P(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&z(this._$AH)?this._$AA.nextSibling.data=t:this.T(L.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=K.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new J(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new K(t)),e}k(t){P(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new Q(this.O(S()),this.O(S()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=G(this,t,e,0),o=!z(t)||t!==this._$AH&&t!==U,o&&(this._$AH=t);else{const s=t;let a,r;for(t=n[0],a=0;a<n.length-1;a++)r=G(this,s[i+a],e,a),r===U&&(r=this._$AH[a]),o||=!z(r)||r!==this._$AH[a],r===W?t=W:t!==W&&(t+=(r??"")+n[a+1]),this._$AH[a]=r}o&&!s&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class st extends tt{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??W)===U)return;const i=this._$AH,s=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==W&&(i===W||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const ot={I:Q},at=$.litHtmlPolyfillSupport;at?.(K,Q),($.litHtmlVersions??=[]).push("3.3.3");const rt=globalThis;let lt=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new Q(e.insertBefore(S(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return U}};lt._$litElement$=!0,lt.finalized=!0,rt.litElementHydrateSupport?.({LitElement:lt});const ct=rt.litElementPolyfillSupport;ct?.({LitElement:lt}),(rt.litElementVersions??=[]).push("4.2.2");const dt=t=>(e,i)=>{void 0!==i?i.addInitializer((()=>{customElements.define(t,e)})):customElements.define(t,e)},pt={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:y},ht=(t=pt,e,i)=>{const{kind:s,metadata:n}=i;let o=globalThis.litPropertyMetadata.get(n);if(void 0===o&&globalThis.litPropertyMetadata.set(n,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,n,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const n=this[s];e.call(this,i),this.requestUpdate(s,n,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function ut(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function gt(t){return ut({...t,state:!0,attribute:!1})}const mt=2,ft=t=>(...e)=>({_$litDirective$:t,values:e});let bt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};const{I:vt}=ot,_t=()=>document.createComment(""),yt=(t,e,i)=>{const s=t._$AA.parentNode,n=void 0===e?t._$AB:e._$AA;if(void 0===i){const e=s.insertBefore(_t(),n),o=s.insertBefore(_t(),n);i=new vt(e,o,t,t.options)}else{const e=i._$AB.nextSibling,o=i._$AM,a=o!==t;if(a){let e;i._$AQ?.(t),i._$AM=t,void 0!==i._$AP&&(e=t._$AU)!==o._$AU&&i._$AP(e)}if(e!==n||a){let t=i._$AA;for(;t!==e;){const e=t.nextSibling;s.insertBefore(t,n),t=e}}}return i},xt=(t,e,i=t)=>(t._$AI(e,i),t),wt={},$t=(t,e=wt)=>t._$AH=e,kt=t=>{t._$AR(),t._$AA.remove()},Ct=ft(class extends bt{constructor(){super(...arguments),this.key=W}render(t,e){return this.key=t,e}update(t,[e,i]){return e!==this.key&&($t(t),this.key=e),i}}),At={edit:"Edit",done:"Done",save:"Save",cancel:"Cancel",delete:"Delete",add:"Add",close:"Close",back:"Back",settings:"Settings",search:"Search",loading:"Loading…",saving:"Saving…",saved:"Saved",save_failed:"Couldn't save. Check the connection and try again.",upload_failed:"Upload failed. Use a PNG, JPG or WebP under 15 MB.",discard_changes:"Discard your changes?",delete_confirm:"Delete this?",untitled:"Untitled",add_page:"Add page",page_settings:"Page settings",page_title:"Page name",page_icon:"Icon",move_earlier:"Move earlier",move_later:"Move later",choose_template:"Start from",template_blank:"Blank",template_home:"Home",template_power:"Electricity",template_security:"Security",template_doorbell:"Doorbell",template_climate:"Climate",add_widget:"Add widget",widget_settings:"Widget settings",widget_floorplan:"Floor plan",widget_tile:"Device",widget_camera:"Camera",widget_heading:"Heading",widget_clock:"Clock",widget_modes:"Modes",mode_away:"Away",mode_home:"Home",mode_sleep:"Sleep",mode_evening:"Evening",scene_away:"Have a safe trip",scene_home:"Welcome home",scene_sleep:"Good night",scene_evening:"Enjoy your evening",scene_locking:"Locking up",modes_missing:"Mode scripts not found. Copy ha-config/packages/smartnest_modes.yaml to Home Assistant.",widget_vacuum:"Robot vacuum",widget_visitors:"Visitors",widget_energy:"Energy",template_robot:"Robot",clean_rooms_1:"Clean 1 room",clean_rooms_n:"Clean {n} rooms",clean_all:"Clean the whole house",suction:"Suction",mop:"Mopping",passes:"Passes",parts:"Parts",main_brush:"Main brush",side_brush:"Side brush",filter:"Filter",sensors_part:"Sensors",hours_left:"{n} h left",cleaned_area:"Cleaned",clean_time:"Time",empty_bin:"Empty bin",no_rooms:"Rooms appear here once the robot has mapped the house.",fan_quiet:"Quiet",fan_balanced:"Balanced",fan_standard:"Standard",fan_turbo:"Turbo",fan_max:"Max",fan_max_plus:"Max+",fan_gentle:"Gentle",fan_off:"Off",mop_mild:"Light",mop_low:"Light",mop_moderate:"Medium",mop_medium:"Medium",mop_intense:"Heavy",mop_high:"Heavy",mop_off:"Off",yesterday:"Yesterday",today:"Today",no_visitors:"No one has rung yet.",keep_days:"Keep visitor photos (days)",e_solar:"Solar",e_grid:"Grid",e_battery:"Battery",e_home:"Home",e_solar_entity:"Solar power",e_grid_entity:"Grid power (+ = from the grid)",e_battery_entity:"Battery power (+ = charging)",e_soc_entity:"Battery level",e_home_entity:"Home power (optional)",e_flip:"Flip direction",heading_text:"Text",empty_page:"This page is empty.",empty_page_admin:"Tap Edit, then Add widget.",entity:"Device",choose_entity:"Choose a device",no_entities:"No matching devices",display_name:"Display name",display_name_hint:"Leave empty to use the Home Assistant name",show_as:"Show as",show_icon:"Icon",show_value:"Icon and value",floor:"Floor",add_floor:"Add floor",rooms:"Rooms",draw_room:"Draw room",draw_hint:"Tap each corner of the room, then tap the first corner to close it.",room_name:"Room name",room_default:"Room {n}",finish:"Finish",undo_point:"Undo",delete_room:"Delete room",rooms_hint:"Lights placed inside a room make it glow.",floor_name:"Floor name",floor_default:"Ground floor",upload_plan:"Upload floor plan",replace_plan:"Replace image",add_device:"Add device",no_plan:"No floor plan yet",no_plan_admin:"Tap Edit to upload one.",drag_hint:"Drag devices to place them",plan_in_dark:"Plan in dark mode",plan_original:"As uploaded",plan_invert:"Invert colors",doorbell_test:"Test doorbell",delete_floor:"Delete floor",home_name:"Home name",language:"Language",accent:"Accent color",theme:"Appearance",theme_auto:"Follow device",theme_schedule:"Dark at night",theme_light:"Light",theme_dark:"Dark",dark_from:"Dark from",dark_to:"until",default_page:"Opening page",screensaver:"Screensaver",screensaver_after:"Start after (minutes)",temp_entity:"Temperature sensor",doorbell:"Doorbell",doorbell_trigger:"Doorbell button",doorbell_camera:"Doorbell camera",doorbell_lock:"Door lock",kiosk:"Kiosk lock",kiosk_lock:"Lock screen",kiosk_unlock:"Unlock",kiosk_pin:"Exit PIN",kiosk_pin_hint:"4 to 8 digits. Give it to the homeowner; kids and guests can't leave the dashboard without it.",kiosk_pin_set:"Set PIN",kiosk_pin_change:"Change PIN",kiosk_pin_saved:"PIN set. Tap Save.",kiosk_pin_invalid:"Use 4 to 8 digits",kiosk_remove_pin:"Remove PIN",kiosk_full_lock:"For a full lock, also use Fully Kiosk Browser (Android) or Guided Access (iPad).",enter_pin:"Enter PIN",wrong_pin:"Wrong PIN",tablet:"Wall tablet (Fully Kiosk)",tablet_found:"Found: {names}",tablet_none:"No Fully Kiosk tablet in Home Assistant yet. Add the Fully Kiosk Browser integration first.",tablet_this:"This screen is the tablet",tablet_not_this:"This screen isn't running inside Fully",tablet_js_hint:"On the tablet, turn on Fully's JavaScript Interface (Settings → Advanced Web Settings) so it recognises itself.",night_dim:"Dim at night",night_brightness:"Night brightness (%)",night_off:"Screen off at night after (minutes, 0 = never)",motion_wake:"Wake when someone comes close",motion_wake_hint:"Uses the tablet's camera to notice people. Nothing is recorded. Ask the homeowner first.",weather:"Weather",weather_entity:"Weather source",weather_bg:"Live weather background",photos:"Family photos",photo_folder:"Folder in Media",photo_seconds:"Seconds per photo",photos_hint:"Put photos in Media → My media → {folder}. Without photos the screensaver shows the clock.",status_bar:"Status bar",power_entity:"Home power sensor",chip_lights_1:"1 light on",chip_lights_n:"{n} lights on",chip_open_1:"1 open",chip_open_n:"{n} open",chip_unlocked_1:"Unlocked",chip_unlocked_n:"{n} unlocked",chip_climate_1:"AC {temp}",chip_climate_n:"{n} ACs on",chip_motion:"Motion",chip_alert:"Alert",chip_t_lights:"Lights",chip_t_open:"Doors & windows",chip_t_unlocked:"Locks",chip_t_climate:"AC",chip_t_motion:"Motion",chip_t_power:"Power",chip_t_alert:"Alerts",turn_all_off:"Turn all off",lock_all:"Lock all",greet_morning:"Good morning",greet_afternoon:"Good afternoon",greet_evening:"Good evening",greeting_name:"Name in the greeting",greeting_name_hint:"Leave empty to use the signed-in person's name",in_min:"in {n} min",in_hours:"in {n}",prayer:"Prayer times",p_fajr:"Fajr",p_dhuhr:"Dhuhr",p_asr:"Asr",p_maghrib:"Maghrib",p_isha:"Isha",morning_summary:"Morning summary",today_weather:"Today",overnight:"Overnight",night_doorbell_1:"The doorbell rang once",night_doorbell_n:"The doorbell rang {n} times",night_door_1:"{name} opened once",night_door_n:"{name} opened {n} times",night_robot:"The robot cleaned",night_quiet:"A quiet night. Nothing to report.",night_unlocked:"{name} is unlocked right now",lets_go:"Let's go",health:"System health",h_offline:"Offline devices",h_battery:"Low batteries",h_backup:"Last backup",h_backup_missing:"No backup sensor. Turn on automatic backups in Settings → System → Backups.",h_updates:"Updates waiting",h_system:"Hub",h_disk:"Disk",h_cpu_temp:"CPU temperature",h_memory:"Memory",h_tablets:"Wall tablets",h_reload:"Reload",h_charging:"Charging",h_not_charging:"Not charging",h_all_good:"All good",h_days_ago:"{n} days ago",h_robot_parts:"Robot parts to replace",h_telegram:"For alerts on Telegram, copy ha-config/packages/smartnest_health.yaml to this house.",about:"About",version:"Version",none:"None",enabled:"On",on:"On",off:"Off",open:"Open",closed:"Closed",opening:"Opening",closing:"Closing",locked:"Locked",unlocked:"Unlocked",locking:"Locking",unlocking:"Unlocking",jammed:"Jammed",cleaning:"Cleaning",docked:"Docked",returning:"Returning",paused:"Paused",idle:"Idle",error:"Error",unavailable:"Unavailable",unknown:"Unknown",motion:"Motion",clear:"Clear",detected:"Detected",heat:"Heat",cool:"Cool",auto:"Auto",dry:"Dry",fan_only:"Fan",heat_cool:"Heat/Cool",playing:"Playing",recording:"Recording",streaming:"Live",tap_to_run:"Tap to run",start:"Start",pause:"Pause",return_home:"Return to dock",locate:"Locate",lock:"Lock",unlock:"Unlock",unlock_confirm:"Unlock the door?",cover_open:"Open",cover_close:"Close",stop:"Stop",turn_on:"Turn on",turn_off:"Turn off",color:"Color",white_temp:"White",more_colors:"More colors",position:"Open",tilt:"Tilt",brightness:"Brightness",target_temp:"Set to",current_temp:"Now",battery:"Battery",mode:"Mode",last_changed:"Changed",just_now:"just now",min_ago:"{n} min ago",hours_ago:"{n} h ago",history_24h:"Last 24 hours",someone_at_door:"Someone's at the door",dismiss:"Dismiss",open_door:"Open door",tagline:"Smart home. Better living."},Ht={en:At,ar:{edit:"تعديل",done:"تم",save:"حفظ",cancel:"إلغاء",delete:"حذف",add:"إضافة",close:"إغلاق",back:"رجوع",settings:"الإعدادات",search:"بحث",loading:"جارٍ التحميل…",saving:"جارٍ الحفظ…",saved:"تم الحفظ",save_failed:"ما زبط الحفظ. تأكد من الاتصال وجرّب مرة ثانية.",upload_failed:"ما زبط الرفع. استعمل صورة PNG أو JPG أو WebP أصغر من 15 ميغا.",discard_changes:"تتجاهل التعديلات؟",delete_confirm:"متأكد إنك بدك تحذفه؟",untitled:"بدون اسم",add_page:"صفحة جديدة",page_settings:"إعدادات الصفحة",page_title:"اسم الصفحة",page_icon:"الأيقونة",move_earlier:"قدّمها",move_later:"أخّرها",choose_template:"ابدأ من",template_blank:"فاضية",template_home:"الرئيسية",template_power:"الكهرباء",template_security:"الأمان",template_doorbell:"الجرس",template_climate:"التكييف",add_widget:"إضافة عنصر",widget_settings:"إعدادات العنصر",widget_floorplan:"مخطط البيت",widget_tile:"جهاز",widget_camera:"كاميرا",widget_heading:"عنوان",widget_clock:"ساعة",widget_modes:"الأوضاع",mode_away:"طالع",mode_home:"راجع",mode_sleep:"نوم",mode_evening:"سهرة",scene_away:"الله معك",scene_home:"أهلين، نوّرت البيت",scene_sleep:"تصبح على خير",scene_evening:"سهرة حلوة",scene_locking:"عم نقفل البيت",modes_missing:"ما لقيت سكربتات الأوضاع. انسخ ha-config/packages/smartnest_modes.yaml لـ Home Assistant.",widget_vacuum:"روبوت التنظيف",widget_visitors:"الزوار",widget_energy:"الطاقة",template_robot:"الروبوت",clean_rooms_1:"نظّف غرفة",clean_rooms_n:"نظّف {n} غرف",clean_all:"نظّف البيت كله",suction:"الشفط",mop:"المسح",passes:"عدد المرات",parts:"القطع",main_brush:"الفرشاة الرئيسية",side_brush:"الفرشاة الجانبية",filter:"الفلتر",sensors_part:"الحساسات",hours_left:"باقي {n} ساعة",cleaned_area:"نظّف",clean_time:"الوقت",empty_bin:"فضّي الخزان",no_rooms:"الغرف بتطلع هون لما الروبوت يرسم خريطة البيت.",fan_quiet:"هادي",fan_balanced:"عادي",fan_standard:"عادي",fan_turbo:"قوي",fan_max:"أقصى",fan_max_plus:"أقصى+",fan_gentle:"خفيف",fan_off:"بدون",mop_mild:"خفيف",mop_low:"خفيف",mop_moderate:"عادي",mop_medium:"عادي",mop_intense:"كثير",mop_high:"كثير",mop_off:"بدون",yesterday:"مبارح",today:"اليوم",no_visitors:"ما حدا دق الجرس لسا.",keep_days:"خلي صور الزوار (أيام)",e_solar:"الشمسي",e_grid:"الشبكة",e_battery:"البطارية",e_home:"البيت",e_solar_entity:"إنتاج الشمسي",e_grid_entity:"الشبكة (+ = سحب من الشبكة)",e_battery_entity:"البطارية (+ = عم تشحن)",e_soc_entity:"نسبة البطارية",e_home_entity:"استهلاك البيت (اختياري)",e_flip:"اعكس الاتجاه",heading_text:"النص",empty_page:"هالصفحة فاضية.",empty_page_admin:"اضغط تعديل، وبعدين إضافة عنصر.",entity:"الجهاز",choose_entity:"اختار جهاز",no_entities:"ما في أجهزة مطابقة",display_name:"الاسم الظاهر",display_name_hint:"خليه فاضي عشان ياخذ الاسم من Home Assistant",show_as:"طريقة العرض",show_icon:"أيقونة",show_value:"أيقونة وقيمة",floor:"الطابق",add_floor:"طابق جديد",rooms:"الغرف",draw_room:"ارسم غرفة",draw_hint:"اضغط على كل زاوية بالغرفة، وبعدين اضغط على أول زاوية عشان تسكّرها.",room_name:"اسم الغرفة",room_default:"غرفة {n}",finish:"خلّصت",undo_point:"تراجع",delete_room:"احذف الغرفة",rooms_hint:"الأضواء اللي جوا الغرفة بتخليها تضوي.",floor_name:"اسم الطابق",floor_default:"الطابق الأرضي",upload_plan:"ارفع المخطط",replace_plan:"غيّر الصورة",add_device:"أضف جهاز",no_plan:"ما في مخطط لسا",no_plan_admin:"اضغط تعديل عشان ترفع واحد.",drag_hint:"اسحب الأجهزة لمكانها",plan_in_dark:"المخطط بالوضع الغامق",plan_original:"زي ما هو",plan_invert:"اعكس الألوان",doorbell_test:"جرّب الجرس",delete_floor:"احذف الطابق",home_name:"اسم البيت",language:"اللغة",accent:"لون التمييز",theme:"المظهر",theme_auto:"حسب الجهاز",theme_schedule:"غامق بالليل",theme_light:"فاتح",theme_dark:"غامق",dark_from:"غامق من",dark_to:"لـ",default_page:"صفحة البداية",screensaver:"شاشة التوقف",screensaver_after:"تشتغل بعد (دقايق)",temp_entity:"حساس الحرارة",doorbell:"الجرس",doorbell_trigger:"زر الجرس",doorbell_camera:"كاميرا الباب",doorbell_lock:"قفل الباب",kiosk:"قفل الشاشة",kiosk_lock:"اقفل الشاشة",kiosk_unlock:"افتح القفل",kiosk_pin:"رمز الخروج",kiosk_pin_hint:"من 4 لـ 8 أرقام. أعطيه لصاحب البيت، والأولاد والضيوف ما بيقدروا يطلعوا من الداشبورد بدونه.",kiosk_pin_set:"حط الرمز",kiosk_pin_change:"غيّر الرمز",kiosk_pin_saved:"تم. اضغط حفظ.",kiosk_pin_invalid:"من 4 لـ 8 أرقام",kiosk_remove_pin:"شيل الرمز",kiosk_full_lock:"للقفل الكامل استعمل كمان Fully Kiosk Browser (أندرويد) أو Guided Access (آيباد).",enter_pin:"اكتب الرمز",wrong_pin:"الرمز غلط",tablet:"تابلت الحيط (Fully Kiosk)",tablet_found:"لقيت: {names}",tablet_none:"ما في تابلت Fully Kiosk بـ HA لسا. ضيف integration الـ Fully Kiosk Browser أول.",tablet_this:"هالشاشة هي التابلت",tablet_not_this:"هالشاشة مش شغّالة جوا Fully",tablet_js_hint:"عالتابلت، فعّل JavaScript Interface بـ Fully (Settings ← Advanced Web Settings) عشان يعرف حاله.",night_dim:"خفّف الإضاءة بالليل",night_brightness:"إضاءة الليل (%)",night_off:"اطفي الشاشة بالليل بعد (دقايق، 0 = أبداً)",motion_wake:"صحّي الشاشة لما حدا يقرّب",motion_wake_hint:"بتستعمل كاميرا التابلت عشان تحس بالناس. ما في أي تسجيل. اسأل صاحب البيت أول.",weather:"الطقس",weather_entity:"مصدر الطقس",weather_bg:"خلفية حيّة حسب الطقس",photos:"صور العيلة",photo_folder:"الفولدر بـ Media",photo_seconds:"ثواني لكل صورة",photos_hint:"حط الصور بـ Media ← My media ← {folder}. إذا ما في صور، شاشة التوقف بتبيّن الساعة.",status_bar:"شريط الحالة",power_entity:"حساس استهلاك البيت",chip_lights_1:"ضو شغّال",chip_lights_n:"{n} أضواء شغّالة",chip_open_1:"في إشي مفتوح",chip_open_n:"{n} مفتوحين",chip_unlocked_1:"القفل مفتوح",chip_unlocked_n:"{n} أقفال مفتوحة",chip_climate_1:"المكيف {temp}",chip_climate_n:"{n} مكيفات شغّالة",chip_motion:"في حركة",chip_alert:"تنبيه",chip_t_lights:"الأضواء",chip_t_open:"الأبواب والشبابيك",chip_t_unlocked:"الأقفال",chip_t_climate:"المكيفات",chip_t_motion:"الحركة",chip_t_power:"الكهرباء",chip_t_alert:"التنبيهات",turn_all_off:"طفّي الكل",lock_all:"اقفل الكل",greet_morning:"صباح الخير",greet_afternoon:"نهارك سعيد",greet_evening:"مسا الخير",greeting_name:"الاسم بالترحيب",greeting_name_hint:"خليه فاضي عشان ياخذ اسم الشخص اللي فاتح",in_min:"بعد {n} دقيقة",in_hours:"بعد {n}",prayer:"مواعيد الصلاة",p_fajr:"الفجر",p_dhuhr:"الظهر",p_asr:"العصر",p_maghrib:"المغرب",p_isha:"العشاء",morning_summary:"ملخص الصبح",today_weather:"اليوم",overnight:"بالليل",night_doorbell_1:"الجرس دق مرة",night_doorbell_n:"الجرس دق {n} مرات",night_door_1:"{name} انفتح مرة",night_door_n:"{name} انفتح {n} مرات",night_robot:"الروبوت نظّف",night_quiet:"ليلة هادية، ما صار إشي.",night_unlocked:"{name} مفتوح هلأ",lets_go:"يلا نبلّش",health:"صحة النظام",h_offline:"أجهزة طافية",h_battery:"بطاريات ضعيفة",h_backup:"آخر backup",h_backup_missing:"ما في حساس backup. شغّل الـ backup التلقائي من Settings ← System ← Backups.",h_updates:"تحديثات مستنية",h_system:"جهاز HA",h_disk:"الديسك",h_cpu_temp:"حرارة المعالج",h_memory:"الذاكرة",h_tablets:"تابلتات الحيط",h_reload:"إعادة تحميل",h_charging:"عالشاحن",h_not_charging:"مش عالشاحن",h_all_good:"كله تمام",h_days_ago:"قبل {n} يوم",h_robot_parts:"قطع الروبوت لازم تتغير",h_telegram:"عشان توصلك تنبيهات على Telegram، انسخ ha-config/packages/smartnest_health.yaml لهالبيت.",about:"حول",version:"الإصدار",none:"بدون",enabled:"شغّال",on:"شغّال",off:"مطفي",open:"مفتوح",closed:"مسكّر",opening:"عم يفتح",closing:"عم يسكّر",locked:"مقفول",unlocked:"مفتوح القفل",locking:"عم يقفل",unlocking:"عم يفتح القفل",jammed:"عالق",cleaning:"عم ينظّف",docked:"بالقاعدة",returning:"راجع للقاعدة",paused:"موقّف",idle:"خامل",error:"خطأ",unavailable:"غير متصل",unknown:"غير معروف",motion:"في حركة",clear:"ما في حركة",detected:"مكتشف",heat:"تدفئة",cool:"تبريد",auto:"تلقائي",dry:"تجفيف",fan_only:"مروحة",heat_cool:"تدفئة/تبريد",playing:"عم يشغّل",recording:"عم يسجّل",streaming:"مباشر",tap_to_run:"اضغط للتشغيل",start:"ابدأ",pause:"وقّف",return_home:"ارجع للقاعدة",locate:"وينه؟",lock:"اقفل",unlock:"افتح القفل",unlock_confirm:"تفتح قفل الباب؟",cover_open:"افتح",cover_close:"سكّر",stop:"وقّف",turn_on:"شغّل",turn_off:"طفّي",color:"اللون",white_temp:"الأبيض",more_colors:"ألوان أكثر",position:"الفتحة",tilt:"الميلان",brightness:"الإضاءة",target_temp:"مضبوط على",current_temp:"هلأ",battery:"البطارية",mode:"الوضع",last_changed:"آخر تغيير",just_now:"هلأ",min_ago:"قبل {n} دقيقة",hours_ago:"قبل {n} ساعة",history_24h:"آخر 24 ساعة",someone_at_door:"في حدا عالباب",dismiss:"تجاهل",open_door:"افتح الباب",tagline:"بيتك أذكى، حياتك أريح"},he:{edit:"עריכה",done:"סיום",save:"שמירה",cancel:"ביטול",delete:"מחיקה",add:"הוספה",close:"סגירה",back:"חזרה",settings:"הגדרות",search:"חיפוש",loading:"טוען…",saving:"שומר…",saved:"נשמר",save_failed:"השמירה נכשלה. בדקו את החיבור ונסו שוב.",upload_failed:"ההעלאה נכשלה. השתמשו בקובץ PNG, JPG או WebP עד 15MB.",discard_changes:"לבטל את השינויים?",delete_confirm:"למחוק?",untitled:"ללא שם",add_page:"עמוד חדש",page_settings:"הגדרות עמוד",page_title:"שם העמוד",page_icon:"סמל",move_earlier:"הזז קדימה",move_later:"הזז אחורה",choose_template:"התחל מ",template_blank:"ריק",template_home:"בית",template_power:"חשמל",template_security:"אבטחה",template_doorbell:"פעמון",template_climate:"מיזוג",add_widget:"הוספת רכיב",widget_settings:"הגדרות רכיב",widget_floorplan:"תוכנית קומה",widget_tile:"מכשיר",widget_camera:"מצלמה",widget_heading:"כותרת",widget_clock:"שעון",widget_modes:"מצבים",mode_away:"יוצאים",mode_home:"חוזרים",mode_sleep:"שינה",mode_evening:"ערב",scene_away:"נסיעה טובה",scene_home:"ברוכים השבים",scene_sleep:"לילה טוב",scene_evening:"ערב נעים",scene_locking:"נועלים את הבית",modes_missing:"סקריפטי המצבים לא נמצאו. העתיקו את ha-config/packages/smartnest_modes.yaml ל-Home Assistant.",widget_vacuum:"שואב רובוטי",widget_visitors:"מבקרים",widget_energy:"אנרגיה",template_robot:"רובוט",clean_rooms_1:"נקה חדר אחד",clean_rooms_n:"נקה {n} חדרים",clean_all:"נקה את כל הבית",suction:"יניקה",mop:"שטיפה",passes:"מעברים",parts:"חלקים",main_brush:"מברשת ראשית",side_brush:"מברשת צד",filter:"מסנן",sensors_part:"חיישנים",hours_left:"נותרו {n} שע׳",cleaned_area:"נוקה",clean_time:"זמן",empty_bin:"ריקון מיכל",no_rooms:"החדרים יופיעו כאן אחרי שהרובוט ימפה את הבית.",fan_quiet:"שקט",fan_balanced:"רגיל",fan_standard:"רגיל",fan_turbo:"טורבו",fan_max:"מקסימום",fan_max_plus:"מקסימום+",fan_gentle:"עדין",fan_off:"כבוי",mop_mild:"קל",mop_low:"קל",mop_moderate:"בינוני",mop_medium:"בינוני",mop_intense:"חזק",mop_high:"חזק",mop_off:"כבוי",yesterday:"אתמול",today:"היום",no_visitors:"עדיין אף אחד לא צלצל.",keep_days:"שמירת תמונות מבקרים (ימים)",e_solar:"סולארי",e_grid:"רשת",e_battery:"סוללה",e_home:"בית",e_solar_entity:"ייצור סולארי",e_grid_entity:"רשת (+ = משיכה מהרשת)",e_battery_entity:"סוללה (+ = בטעינה)",e_soc_entity:"רמת סוללה",e_home_entity:"צריכת הבית (אופציונלי)",e_flip:"הפוך כיוון",heading_text:"טקסט",empty_page:"העמוד הזה ריק.",empty_page_admin:"הקישו עריכה ואז הוספת רכיב.",entity:"מכשיר",choose_entity:"בחרו מכשיר",no_entities:"לא נמצאו מכשירים",display_name:"שם לתצוגה",display_name_hint:"השאירו ריק כדי להשתמש בשם מ-Home Assistant",show_as:"תצוגה",show_icon:"סמל",show_value:"סמל וערך",floor:"קומה",add_floor:"קומה חדשה",rooms:"חדרים",draw_room:"ציור חדר",draw_hint:"הקישו על כל פינה של החדר, ואז על הפינה הראשונה כדי לסגור.",room_name:"שם החדר",room_default:"חדר {n}",finish:"סיום",undo_point:"בטל",delete_room:"מחק חדר",rooms_hint:"אורות שממוקמים בתוך חדר גורמים לו לזהור.",floor_name:"שם הקומה",floor_default:"קומת קרקע",upload_plan:"העלאת תוכנית",replace_plan:"החלפת תמונה",add_device:"הוספת מכשיר",no_plan:"אין עדיין תוכנית קומה",no_plan_admin:"הקישו עריכה כדי להעלות.",drag_hint:"גררו את המכשירים למקומם",plan_in_dark:"התוכנית במצב כהה",plan_original:"כפי שהועלתה",plan_invert:"היפוך צבעים",doorbell_test:"בדיקת פעמון",delete_floor:"מחיקת קומה",home_name:"שם הבית",language:"שפה",accent:"צבע הדגשה",theme:"מראה",theme_auto:"לפי המכשיר",theme_schedule:"כהה בלילה",theme_light:"בהיר",theme_dark:"כהה",dark_from:"כהה מ",dark_to:"עד",default_page:"עמוד פתיחה",screensaver:"שומר מסך",screensaver_after:"הפעלה אחרי (דקות)",temp_entity:"חיישן טמפרטורה",doorbell:"פעמון",doorbell_trigger:"לחצן הפעמון",doorbell_camera:"מצלמת הדלת",doorbell_lock:"מנעול הדלת",kiosk:"נעילת מסך",kiosk_lock:"נעל מסך",kiosk_unlock:"שחרור נעילה",kiosk_pin:"קוד יציאה",kiosk_pin_hint:"4 עד 8 ספרות. מסרו אותו לבעל הבית; ילדים ואורחים לא יוכלו לצאת מהלוח בלעדיו.",kiosk_pin_set:"הגדר קוד",kiosk_pin_change:"שנה קוד",kiosk_pin_saved:"הקוד הוגדר. הקישו שמירה.",kiosk_pin_invalid:"4 עד 8 ספרות",kiosk_remove_pin:"הסר קוד",kiosk_full_lock:"לנעילה מלאה השתמשו גם ב-Fully Kiosk Browser (אנדרואיד) או Guided Access (אייפד).",enter_pin:"הזינו קוד",wrong_pin:"קוד שגוי",tablet:"טאבלט קיר (Fully Kiosk)",tablet_found:"נמצא: {names}",tablet_none:"עדיין אין טאבלט Fully Kiosk ב-Home Assistant. הוסיפו קודם את האינטגרציה Fully Kiosk Browser.",tablet_this:"המסך הזה הוא הטאבלט",tablet_not_this:"המסך הזה לא רץ בתוך Fully",tablet_js_hint:"בטאבלט, הפעילו את JavaScript Interface ב-Fully (Settings → Advanced Web Settings) כדי שיזהה את עצמו.",night_dim:"עמעום בלילה",night_brightness:"בהירות לילה (%)",night_off:"כיבוי מסך בלילה אחרי (דקות, 0 = אף פעם)",motion_wake:"הערה כשמישהו מתקרב",motion_wake_hint:"משתמש במצלמת הטאבלט כדי לזהות אנשים. שום דבר לא מוקלט. שאלו את בעל הבית קודם.",weather:"מזג אוויר",weather_entity:"מקור מזג האוויר",weather_bg:"רקע חי לפי מזג האוויר",photos:"תמונות משפחה",photo_folder:"תיקייה ב-Media",photo_seconds:"שניות לכל תמונה",photos_hint:"שימו תמונות ב-Media ← My media ← {folder}. בלי תמונות שומר המסך מציג שעון.",status_bar:"שורת מצב",power_entity:"חיישן צריכת הבית",chip_lights_1:"אור אחד דולק",chip_lights_n:"{n} אורות דולקים",chip_open_1:"משהו פתוח",chip_open_n:"{n} פתוחים",chip_unlocked_1:"לא נעול",chip_unlocked_n:"{n} לא נעולים",chip_climate_1:"מזגן {temp}",chip_climate_n:"{n} מזגנים פועלים",chip_motion:"תנועה",chip_alert:"התראה",chip_t_lights:"אורות",chip_t_open:"דלתות וחלונות",chip_t_unlocked:"מנעולים",chip_t_climate:"מזגנים",chip_t_motion:"תנועה",chip_t_power:"חשמל",chip_t_alert:"התראות",turn_all_off:"כבה הכל",lock_all:"נעל הכל",greet_morning:"בוקר טוב",greet_afternoon:"צהריים טובים",greet_evening:"ערב טוב",greeting_name:"שם בברכה",greeting_name_hint:"השאירו ריק כדי להשתמש בשם המשתמש המחובר",in_min:"בעוד {n} דק׳",in_hours:"בעוד {n}",prayer:"זמני תפילה",p_fajr:"פג׳ר",p_dhuhr:"ד׳והר",p_asr:"עסר",p_maghrib:"מע׳רב",p_isha:"עישא",morning_summary:"סיכום בוקר",today_weather:"היום",overnight:"בלילה",night_doorbell_1:"הפעמון צלצל פעם אחת",night_doorbell_n:"הפעמון צלצל {n} פעמים",night_door_1:"{name} נפתח פעם אחת",night_door_n:"{name} נפתח {n} פעמים",night_robot:"השואב ניקה",night_quiet:"לילה שקט. אין מה לדווח.",night_unlocked:"{name} לא נעול כרגע",lets_go:"יאללה",health:"בריאות המערכת",h_offline:"מכשירים מנותקים",h_battery:"סוללות חלשות",h_backup:"גיבוי אחרון",h_backup_missing:"אין חיישן גיבוי. הפעילו גיבוי אוטומטי ב-Settings ← System ← Backups.",h_updates:"עדכונים ממתינים",h_system:"השרת",h_disk:"דיסק",h_cpu_temp:"טמפ׳ מעבד",h_memory:"זיכרון",h_tablets:"טאבלטים",h_reload:"טען מחדש",h_charging:"בטעינה",h_not_charging:"לא בטעינה",h_all_good:"הכל תקין",h_days_ago:"לפני {n} ימים",h_robot_parts:"חלקי רובוט להחלפה",h_telegram:"להתראות בטלגרם, העתיקו את ha-config/packages/smartnest_health.yaml לבית הזה.",about:"אודות",version:"גרסה",none:"ללא",enabled:"פעיל",on:"פועל",off:"כבוי",open:"פתוח",closed:"סגור",opening:"נפתח",closing:"נסגר",locked:"נעול",unlocked:"לא נעול",locking:"ננעל",unlocking:"נפתח",jammed:"תקוע",cleaning:"מנקה",docked:"בעגינה",returning:"חוזר לעגינה",paused:"מושהה",idle:"במנוחה",error:"שגיאה",unavailable:"לא זמין",unknown:"לא ידוע",motion:"תנועה",clear:"אין תנועה",detected:"זוהה",heat:"חימום",cool:"קירור",auto:"אוטומטי",dry:"ייבוש",fan_only:"מאוורר",heat_cool:"חימום/קירור",playing:"מנגן",recording:"מקליט",streaming:"שידור חי",tap_to_run:"הקישו להפעלה",start:"התחל",pause:"השהה",return_home:"חזרה לעגינה",locate:"איתור",lock:"נעילה",unlock:"פתיחת נעילה",unlock_confirm:"לפתוח את נעילת הדלת?",cover_open:"פתח",cover_close:"סגור",stop:"עצור",turn_on:"הדלקה",turn_off:"כיבוי",color:"צבע",white_temp:"לבן",more_colors:"צבעים נוספים",position:"פתיחה",tilt:"הטיה",brightness:"בהירות",target_temp:"מכוון ל",current_temp:"עכשיו",battery:"סוללה",mode:"מצב",last_changed:"שונה",just_now:"עכשיו",min_ago:"לפני {n} דק׳",hours_ago:"לפני {n} שע׳",history_24h:"24 השעות האחרונות",someone_at_door:"מישהו בדלת",dismiss:"התעלם",open_door:"פתח דלת",tagline:"בית חכם. חיים טובים יותר."}},Mt=[{id:"ar",label:"العربية"},{id:"en",label:"English"},{id:"he",label:"עברית"}],Vt=t=>"en"!==t;function Lt(t){const e=Ht[t]??At;return(t,i)=>{let s=e[t]??At[t]??t;if(i)for(const[e,n]of Object.entries(i))s=s.replace(`{${e}}`,String(n));return s}}function St(t){return t in At}const zt={ar:"ar-u-nu-latn",en:"en-GB",he:"he"};var Pt="M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z";const Et={"air-conditioner":"M6.59,0.66C8.93,-1.15 11.47,1.06 12.04,4.5C12.47,4.5 12.89,4.62 13.27,4.84C13.79,4.24 14.25,3.42 14.07,2.5C13.65,0.35 16.06,-1.39 18.35,1.58C20.16,3.92 17.95,6.46 14.5,7.03C14.5,7.46 14.39,7.89 14.16,8.27C14.76,8.78 15.58,9.24 16.5,9.06C18.63,8.64 20.38,11.04 17.41,13.34C15.07,15.15 12.53,12.94 11.96,9.5C11.53,9.5 11.11,9.37 10.74,9.15C10.22,9.75 9.75,10.58 9.93,11.5C10.35,13.64 7.94,15.39 5.65,12.42C3.83,10.07 6.05,7.53 9.5,6.97C9.5,6.54 9.63,6.12 9.85,5.74C9.25,5.23 8.43,4.76 7.5,4.94C5.37,5.36 3.62,2.96 6.59,0.66M5,16H7A2,2 0 0,1 9,18V24H7V22H5V24H3V18A2,2 0 0,1 5,16M5,18V20H7V18H5M12.93,16H15L12.07,24H10L12.93,16M18,16H21V18H18V22H21V24H18A2,2 0 0,1 16,22V18A2,2 0 0,1 18,16Z","alert-circle-outline":"M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z","arrow-left":"M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z","arrow-right":"M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z",bell:"M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21","bell-ring":"M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21M19.75,3.19L18.33,4.61C20.04,6.3 21,8.6 21,11H23C23,8.07 21.84,5.25 19.75,3.19M1,11H3C3,8.6 3.96,6.3 5.67,4.61L4.25,3.19C2.16,5.25 1,8.07 1,11Z",blinds:"M20 19V3H4V19H2V21H22V19H20M16 9H18V11H16V9M14 11H6V9H14V11M18 7H16V5H18V7M14 5V7H6V5H14M6 19V13H14V14.82C13.55 15.14 13.25 15.66 13.25 16.25C13.25 17.22 14.03 18 15 18S16.75 17.22 16.75 16.25C16.75 15.66 16.45 15.13 16 14.82V13H18V19H6Z","blinds-closed":"M20 19V3H4V19H2V21H13.25C13.25 21.97 14.03 22.75 15 22.75S16.75 21.97 16.75 21H22V19H20M18 11H16V9H18V11M14 11H6V9H14V11M14 13V15H6V13H14M16 13H18V15H16V13M18 7H16V5H18V7M14 5V7H6V5H14M6 19V17H14V19H6M16 19V17H18V19H16Z",camera:"M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z",cctv:"M6.03 12.03L8.03 15.5L5.5 18.68L2 12.62L6.03 12.03M17 18V15.29C17.88 14.9 18.5 14.03 18.5 13C18.5 12.43 18.3 11.9 17.97 11.5L19.94 10.35C20.95 9.76 21.3 8.47 20.71 7.46L19.33 5.06C18.74 4.05 17.45 3.7 16.44 4.28L8.31 9C7.36 9.53 7.03 10.75 7.58 11.71L9.08 14.31C9.63 15.26 10.86 15.59 11.81 15.04L13.69 13.96C13.94 14.55 14.41 15.03 15 15.29V18C15 19.1 15.9 20 17 20H22V18H17Z",check:"M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z","chevron-down":"M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z","chevron-up":"M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z","clock-outline":"M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z",close:"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",cog:"M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z",curtains:"M23 3H1V1H23V3M2 22H6C6 19 4 17 4 17C10 13 11 4 11 4H2V22M22 4H13C13 4 14 13 20 17C20 17 18 19 18 22H22V4Z",delete:"M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z",doorbell:"M12 10C10.9 10 10 10.9 10 12S10.9 14 12 14 14 13.1 14 12 13.1 10 12 10M16 2H8C6.9 2 6 2.9 6 4V20C6 21.1 6.9 22 8 22H16C17.1 22 18 21.1 18 20V4C18 2.9 17.1 2 16 2M16 20H8V4H16V20Z","door-closed":"M16,11H18V13H16V11M12,3H19C20.11,3 21,3.89 21,5V19H22V21H2V19H10V5C10,3.89 10.89,3 12,3M12,5V19H19V5H12Z","door-open":"M12,3C10.89,3 10,3.89 10,5H3V19H2V21H22V19H21V5C21,3.89 20.11,3 19,3H12M12,5H19V19H12V5M5,11H7V13H5V11Z",grid:"M12 16C13.1 16 14 16.9 14 18S13.1 20 12 20 10 19.1 10 18 10.9 16 12 16M12 10C13.1 10 14 10.9 14 12S13.1 14 12 14 10 13.1 10 12 10.9 10 12 10M12 4C13.1 4 14 4.9 14 6S13.1 8 12 8 10 7.1 10 6 10.9 4 12 4M6 16C7.1 16 8 16.9 8 18S7.1 20 6 20 4 19.1 4 18 4.9 16 6 16M6 10C7.1 10 8 10.9 8 12S7.1 14 6 14 4 13.1 4 12 4.9 10 6 10M6 4C7.1 4 8 4.9 8 6S7.1 8 6 8 4 7.1 4 6 4.9 4 6 4M18 16C19.1 16 20 16.9 20 18S19.1 20 18 20 16 19.1 16 18 16.9 16 18 16M18 10C19.1 10 20 10.9 20 12S19.1 14 18 14 16 13.1 16 12 16.9 10 18 10M18 4C19.1 4 20 4.9 20 6S19.1 8 18 8 16 7.1 16 6 16.9 4 18 4Z",drag:"M7,19V17H9V19H7M11,19V17H13V19H11M15,19V17H17V19H15M7,15V13H9V15H7M11,15V13H13V15H11M15,15V13H17V15H15M7,11V9H9V11H7M11,11V9H13V11H11M15,11V9H17V11H15M7,7V5H9V7H7M11,7V5H13V7H11M15,7V5H17V7H15Z",fan:"M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z","fan-off":"M12.5,2C9.64,2 8.57,4.55 9.29,7.47L15,13.16C15.87,13.37 16.81,13.81 17.28,14.73C18.46,17.1 22.03,17 22.03,12.5C22.03,8.92 18.05,8.13 14.35,10.13C14.03,9.73 13.61,9.42 13.13,9.22C13.32,8.29 13.76,7.24 14.75,6.75C17.11,5.57 17,2 12.5,2M3.28,4L2,5.27L4.47,7.73C3.22,7.74 2,8.87 2,11.5C2,15.07 5.96,15.85 9.65,13.87C9.97,14.27 10.4,14.59 10.89,14.79C10.69,15.71 10.25,16.75 9.27,17.24C6.91,18.42 7,22 11.5,22C13.8,22 14.94,20.36 14.94,18.21L18.73,22L20,20.72L3.28,4Z",fire:"M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z",flash:"M7,2V13H10V22L17,10H13L17,2H7Z",title:"M5,4V7H10.5V19H13.5V7H19V4H5Z",garage:"M19,20H17V11H7V20H5V9L12,5L19,9V20M8,12H16V14H8V12M8,15H16V17H8V15M16,18V20H8V18H16Z","garage-open":"M19,20H17V11H7V20H5V9L12,5L19,9V20M8,12H16V14H8V12Z",home:"M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z","home-outline":"M12 5.69L17 10.19V18H15V12H9V18H7V10.19L12 5.69M12 3L2 12H5V20H11V14H13V20H19V12H22","image-plus":"M18 15V18H15V20H18V23H20V20H23V18H20V15H18M13.3 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5V13.3C20.4 13.1 19.7 13 19 13C17.9 13 16.8 13.3 15.9 13.9L14.5 12L11 16.5L8.5 13.5L5 18H13.1C13 18.3 13 18.7 13 19C13 19.7 13.1 20.4 13.3 21Z",image:"M19,19H5V5H19M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M13.96,12.29L11.21,15.83L9.25,13.47L6.5,17H17.5L13.96,12.29Z",layers:"M12,16L19.36,10.27L21,9L12,2L3,9L4.63,10.27M12,18.54L4.62,12.81L3,14.07L12,21.07L21,14.07L19.37,12.8L12,18.54Z",lightbulb:"M12,2A7,7 0 0,0 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H15A1,1 0 0,0 16,17V14.74C17.81,13.47 19,11.38 19,9A7,7 0 0,0 12,2M9,21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9V21Z","lightbulb-outline":"M12,2A7,7 0 0,1 19,9C19,11.38 17.81,13.47 16,14.74V17A1,1 0 0,1 15,18H9A1,1 0 0,1 8,17V14.74C6.19,13.47 5,11.38 5,9A7,7 0 0,1 12,2M9,21V20H15V21A1,1 0 0,1 14,22H10A1,1 0 0,1 9,21M12,4A5,5 0 0,0 7,9C7,11.05 8.23,12.81 10,13.58V16H14V13.58C15.77,12.81 17,11.05 17,9A5,5 0 0,0 12,4Z","lightning-bolt":"M11 15H6L13 1V9H18L11 23V15Z",lock:"M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z","lock-open":"M18 1C15.24 1 13 3.24 13 6V8H4C2.9 8 2 8.89 2 10V20C2 21.11 2.9 22 4 22H16C17.11 22 18 21.11 18 20V10C18 8.9 17.11 8 16 8H15V6C15 4.34 16.34 3 18 3C19.66 3 21 4.34 21 6V8H23V6C23 3.24 20.76 1 18 1M10 13C11.1 13 12 13.89 12 15C12 16.11 11.11 17 10 17C8.9 17 8 16.11 8 15C8 13.9 8.9 13 10 13Z",magnify:"M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z","marker-plus":"M9,11.5A2.5,2.5 0 0,0 11.5,9A2.5,2.5 0 0,0 9,6.5A2.5,2.5 0 0,0 6.5,9A2.5,2.5 0 0,0 9,11.5M9,2C12.86,2 16,5.13 16,9C16,14.25 9,22 9,22C9,22 2,14.25 2,9A7,7 0 0,1 9,2M15,17H18V14H20V17H23V19H20V22H18V19H15V17Z",minus:"M19,13H5V11H19V13Z","motion-sensor":"M10,0.2C9,0.2 8.2,1 8.2,2C8.2,3 9,3.8 10,3.8C11,3.8 11.8,3 11.8,2C11.8,1 11,0.2 10,0.2M15.67,1A7.33,7.33 0 0,0 23,8.33V7A6,6 0 0,1 17,1H15.67M18.33,1C18.33,3.58 20.42,5.67 23,5.67V4.33C21.16,4.33 19.67,2.84 19.67,1H18.33M21,1A2,2 0 0,0 23,3V1H21M7.92,4.03C7.75,4.03 7.58,4.06 7.42,4.11L2,5.8V11H3.8V7.33L5.91,6.67L2,22H3.8L6.67,13.89L9,17V22H10.8V15.59L8.31,11.05L9.04,8.18L10.12,10H15V8.2H11.38L9.38,4.87C9.08,4.37 8.54,4.03 7.92,4.03Z","motion-sensor-off":"M11.4 8.2H15V10H13.2L11.4 8.2M19.67 1H18.33C18.33 3.58 20.42 5.67 23 5.67V4.33C21.16 4.33 19.67 2.84 19.67 1M21 1C21 2.11 21.9 3 23 3V1H21M17 1H15.67C15.67 5.05 18.95 8.33 23 8.33V7C19.69 7 17 4.31 17 1M10 3.8C11 3.8 11.8 3 11.8 2S11 .2 10 .2 8.2 1 8.2 2 9 3.8 10 3.8M2.39 1.73L1.11 3L3.46 5.35L2 5.8V11H3.8V7.33L5.05 6.94L5.68 7.57L2 22H3.8L6.67 13.89L9 17V22H10.8V15.59L8.31 11.05L8.5 10.37L20.84 22.73L22.11 21.46L2.39 1.73M9.38 4.87C9.08 4.37 8.54 4.03 7.92 4.03C7.75 4.03 7.58 4.06 7.42 4.11L7.34 4.14L11.35 8.15L9.38 4.87Z",palette:"M17.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,9A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 17.5,12M14.5,8A1.5,1.5 0 0,1 13,6.5A1.5,1.5 0 0,1 14.5,5A1.5,1.5 0 0,1 16,6.5A1.5,1.5 0 0,1 14.5,8M9.5,8A1.5,1.5 0 0,1 8,6.5A1.5,1.5 0 0,1 9.5,5A1.5,1.5 0 0,1 11,6.5A1.5,1.5 0 0,1 9.5,8M6.5,12A1.5,1.5 0 0,1 5,10.5A1.5,1.5 0 0,1 6.5,9A1.5,1.5 0 0,1 8,10.5A1.5,1.5 0 0,1 6.5,12M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A1.5,1.5 0 0,0 13.5,19.5C13.5,19.11 13.35,18.76 13.11,18.5C12.88,18.23 12.73,17.88 12.73,17.5A1.5,1.5 0 0,1 14.23,16H16A5,5 0 0,0 21,11C21,6.58 16.97,3 12,3Z",pause:"M14,19H18V5H14M6,19H10V5H6V19Z",pencil:"M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z",play:"M8,5.14V19.14L19,12.14L8,5.14Z",plus:"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z","power-plug":"M16,7V3H14V7H10V3H8V7H8C7,7 6,8 6,9V14.5L9.5,18V21H14.5V18L18,14.5V9C18,8 17,7 16,7Z","power-plug-off":"M20.84 22.73L15.31 17.2L14.5 18V21H9.5V18L6 14.5V9C6 8.7 6.1 8.41 6.25 8.14L1.11 3L2.39 1.73L22.11 21.46L20.84 22.73M18 14.5V9C18 8 17 7 16 7V3H14V7H10.2L17.85 14.65L18 14.5M10 3H8V4.8L10 6.8V3Z",power:"M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13",resize:"M10.59,12L14.59,8H11V6H18V13H16V9.41L12,13.41V16H20V4H8V12H10.59M22,2V18H12V22H2V12H6V2H22M10,14H4V20H10V14Z","robot-vacuum":"M12,2C14.65,2 17.19,3.06 19.07,4.93L17.65,6.35C16.15,4.85 14.12,4 12,4C9.88,4 7.84,4.84 6.35,6.35L4.93,4.93C6.81,3.06 9.35,2 12,2M3.66,6.5L5.11,7.94C4.39,9.17 4,10.57 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,10.57 19.61,9.17 18.88,7.94L20.34,6.5C21.42,8.12 22,10.04 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12C2,10.04 2.58,8.12 3.66,6.5M12,6A6,6 0 0,1 18,12C18,13.59 17.37,15.12 16.24,16.24L14.83,14.83C14.08,15.58 13.06,16 12,16C10.94,16 9.92,15.58 9.17,14.83L7.76,16.24C6.63,15.12 6,13.59 6,12A6,6 0 0,1 12,6M12,8A1,1 0 0,0 11,9A1,1 0 0,0 12,10A1,1 0 0,0 13,9A1,1 0 0,0 12,8Z","shield-home":"M11,13H13V16H16V11H18L12,6L6,11H8V16H11V13M12,1L21,5V11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1Z",snowflake:"M20.79,13.95L18.46,14.57L16.46,13.44V10.56L18.46,9.43L20.79,10.05L21.31,8.12L19.54,7.65L20,5.88L18.07,5.36L17.45,7.69L15.45,8.82L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L15.5,15.17L17.5,16.3L18.12,18.63L20,18.12L19.53,16.35L21.3,15.88L20.79,13.95M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44V10.56Z",sofa:"M12.5 7C12.5 5.89 13.39 5 14.5 5H18C19.1 5 20 5.9 20 7V9.16C18.84 9.57 18 10.67 18 11.97V14H12.5V7M6 11.96V14H11.5V7C11.5 5.89 10.61 5 9.5 5H6C4.9 5 4 5.9 4 7V9.15C5.16 9.56 6 10.67 6 11.96M20.66 10.03C19.68 10.19 19 11.12 19 12.12V15H5V12C5 10.9 4.11 10 3 10S1 10.9 1 12V17C1 18.1 1.9 19 3 19V21H5V19H19V21H21V19C22.1 19 23 18.1 23 17V12C23 10.79 21.91 9.82 20.66 10.03Z",speaker:"M12,12A3,3 0 0,0 9,15A3,3 0 0,0 12,18A3,3 0 0,0 15,15A3,3 0 0,0 12,12M12,20A5,5 0 0,1 7,15A5,5 0 0,1 12,10A5,5 0 0,1 17,15A5,5 0 0,1 12,20M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8C10.89,8 10,7.1 10,6C10,4.89 10.89,4 12,4M17,2H7C5.89,2 5,2.89 5,4V20A2,2 0 0,0 7,22H17A2,2 0 0,0 19,20V4C19,2.89 18.1,2 17,2Z",stop:"M18,18H6V6H18V18Z",television:"M21,17H3V5H21M21,3H3A2,2 0 0,0 1,5V17A2,2 0 0,0 3,19H8V21H16V19H21A2,2 0 0,0 23,17V5A2,2 0 0,0 21,3Z",thermometer:"M15 13V5A3 3 0 0 0 9 5V13A5 5 0 1 0 15 13M12 4A1 1 0 0 1 13 5V8H11V5A1 1 0 0 1 12 4Z","toggle-on":"M17,7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7M17,15A3,3 0 0,1 14,12A3,3 0 0,1 17,9A3,3 0 0,1 20,12A3,3 0 0,1 17,15Z","toggle-off":"M17,7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7M7,15A3,3 0 0,1 4,12A3,3 0 0,1 7,9A3,3 0 0,1 10,12A3,3 0 0,1 7,15Z",dashboard:"M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z",humidity:"M12,3.25C12,3.25 6,10 6,14C6,17.32 8.69,20 12,20A6,6 0 0,0 18,14C18,10 12,3.25 12,3.25M14.47,9.97L15.53,11.03L9.53,17.03L8.47,15.97M9.75,10A1.25,1.25 0 0,1 11,11.25A1.25,1.25 0 0,1 9.75,12.5A1.25,1.25 0 0,1 8.5,11.25A1.25,1.25 0 0,1 9.75,10M14.25,14.5A1.25,1.25 0 0,1 15.5,15.75A1.25,1.25 0 0,1 14.25,17A1.25,1.25 0 0,1 13,15.75A1.25,1.25 0 0,1 14.25,14.5Z",leak:"M10 3.25C10 3.25 16 10 16 14C16 17.31 13.31 20 10 20S4 17.31 4 14C4 10 10 3.25 10 3.25M20 7V13H18V7H20M18 17H20V15H18V17Z","window-closed":"M6,11H10V9H14V11H18V4H6V11M18,13H6V20H18V13M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2Z","window-open":"M6,8H10V6H14V8H18V4H6V8M18,10H6V15H18V10M6,20H18V17H6V20M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2Z",bed:"M19,7H11V14H3V5H1V20H3V17H21V20H23V11A4,4 0 0,0 19,7M7,13A3,3 0 0,0 10,10A3,3 0 0,0 7,7A3,3 0 0,0 4,10A3,3 0 0,0 7,13Z",kitchen:"M11,9H9V2H7V9H5V2H3V9C3,11.12 4.66,12.84 6.75,12.97V22H9.25V12.97C11.34,12.84 13,11.12 13,9V2H11V9M16,6V14H18.5V22H21V2C18.24,2 16,4.24 16,6Z",shower:"M21,14V15C21,16.91 19.93,18.57 18.35,19.41L19,22H17L16.5,20C16.33,20 16.17,20 16,20H8C7.83,20 7.67,20 7.5,20L7,22H5L5.65,19.41C4.07,18.57 3,16.91 3,15V14H2V12H20V5A1,1 0 0,0 19,4C18.5,4 18.12,4.34 18,4.79C18.63,5.33 19,6.13 19,7H13A3,3 0 0,1 16,4C16.06,4 16.11,4 16.17,4C16.58,2.84 17.69,2 19,2A3,3 0 0,1 22,5V14H21V14M19,14H5V15A3,3 0 0,0 8,18H16A3,3 0 0,0 19,15V14Z",garden:"M11,21V16.74C10.53,16.91 10.03,17 9.5,17C7,17 5,15 5,12.5C5,11.23 5.5,10.09 6.36,9.27C6.13,8.73 6,8.13 6,7.5C6,5 8,3 10.5,3C12.06,3 13.44,3.8 14.25,5C14.33,5 14.41,5 14.5,5A5.5,5.5 0 0,1 20,10.5A5.5,5.5 0 0,1 14.5,16C14,16 13.5,15.93 13,15.79V21H11Z",car:"M5,11L6.5,6.5H17.5L19,11M17.5,16A1.5,1.5 0 0,1 16,14.5A1.5,1.5 0 0,1 17.5,13A1.5,1.5 0 0,1 19,14.5A1.5,1.5 0 0,1 17.5,16M6.5,16A1.5,1.5 0 0,1 5,14.5A1.5,1.5 0 0,1 6.5,13A1.5,1.5 0 0,1 8,14.5A1.5,1.5 0 0,1 6.5,16M18.92,6C18.72,5.42 18.16,5 17.5,5H6.5C5.84,5 5.28,5.42 5.08,6L3,12V20A1,1 0 0,0 4,21H5A1,1 0 0,0 6,20V19H18V20A1,1 0 0,0 19,21H20A1,1 0 0,0 21,20V12L18.92,6Z",pool:"M2,15C3.67,14.25 5.33,13.5 7,13.17V5A3,3 0 0,1 10,2C11.31,2 12.42,2.83 12.83,4H10A1,1 0 0,0 9,5V6H14V5A3,3 0 0,1 17,2C18.31,2 19.42,2.83 19.83,4H17A1,1 0 0,0 16,5V14.94C18,14.62 20,13 22,13V15C19.78,15 17.56,17 15.33,17C13.11,17 10.89,15 8.67,15C6.44,15 4.22,16 2,17V15M14,8H9V10H14V8M14,12H9V13C10.67,13.16 12.33,14.31 14,14.79V12M2,19C4.22,18 6.44,17 8.67,17C10.89,17 13.11,19 15.33,19C17.56,19 19.78,17 22,17V19C19.78,19 17.56,21 15.33,21C13.11,21 10.89,19 8.67,19C6.44,19 4.22,20 2,21V19Z",gamepad:"M7,6H17A6,6 0 0,1 23,12A6,6 0 0,1 17,18C15.22,18 13.63,17.23 12.53,16H11.47C10.37,17.23 8.78,18 7,18A6,6 0 0,1 1,12A6,6 0 0,1 7,6M6,9V11H4V13H6V15H8V13H10V11H8V9H6M15.5,12A1.5,1.5 0 0,0 14,13.5A1.5,1.5 0 0,0 15.5,15A1.5,1.5 0 0,0 17,13.5A1.5,1.5 0 0,0 15.5,12M18.5,9A1.5,1.5 0 0,0 17,10.5A1.5,1.5 0 0,0 18.5,12A1.5,1.5 0 0,0 20,10.5A1.5,1.5 0 0,0 18.5,9Z",desk:"M3 6H21C21.55 6 22 6.45 22 7C22 7.55 21.55 8 21 8V19H19V17H15V19H13V8H5V19H3V8C2.45 8 2 7.55 2 7C2 6.45 2.45 6 3 6M16 10.5V11H18V10.5C18 10.22 17.78 10 17.5 10H16.5C16.22 10 16 10.22 16 10.5M16 14.5V15H18V14.5C18 14.22 17.78 14 17.5 14H16.5C16.22 14 16 14.22 16 14.5Z",laundry:"M14.83,11.17C16.39,12.73 16.39,15.27 14.83,16.83C13.27,18.39 10.73,18.39 9.17,16.83L14.83,11.17M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2M7,4A1,1 0 0,0 6,5A1,1 0 0,0 7,6A1,1 0 0,0 8,5A1,1 0 0,0 7,4M10,4A1,1 0 0,0 9,5A1,1 0 0,0 10,6A1,1 0 0,0 11,5A1,1 0 0,0 10,4M12,8A6,6 0 0,0 6,14A6,6 0 0,0 12,20A6,6 0 0,0 18,14A6,6 0 0,0 12,8Z",solar:"M11.45,2V5.55L15,3.77L11.45,2M10.45,8L8,10.46L11.75,11.71L10.45,8M2,11.45L3.77,15L5.55,11.45H2M10,2H2V10C2.57,10.17 3.17,10.25 3.77,10.25C7.35,10.26 10.26,7.35 10.27,3.75C10.26,3.16 10.17,2.57 10,2M17,22V16H14L19,7V13H22L17,22Z",battery:"M16 20H8V6H16M16.67 4H15V2H9V4H7.33C6.6 4 6 4.6 6 5.33V20.67C6 21.4 6.6 22 7.33 22H16.67C17.41 22 18 21.41 18 20.67V5.33C18 4.6 17.4 4 16.67 4M15 16H9V19H15V16M15 7H9V10H15V7M15 11.5H9V14.5H15V11.5Z",entrance:"M15 13L11 17V14H2V12H11V9L15 13M5 20V16H7V18H17V10.19L12 5.69L7.21 10H4.22L12 3L22 12H19V20H5Z",locate:"M12,2C15.31,2 18,4.66 18,7.95C18,12.41 12,19 12,19C12,19 6,12.41 6,7.95C6,4.66 8.69,2 12,2M12,6A2,2 0 0,0 10,8A2,2 0 0,0 12,10A2,2 0 0,0 14,8A2,2 0 0,0 12,6M20,19C20,21.21 16.42,23 12,23C7.58,23 4,21.21 4,19C4,17.71 5.22,16.56 7.11,15.83L7.75,16.74C6.67,17.19 6,17.81 6,18.5C6,19.88 8.69,21 12,21C15.31,21 18,19.88 18,18.5C18,17.81 17.33,17.19 16.25,16.74L16.89,15.83C18.78,16.56 20,17.71 20,19Z","play-circle":"M10,16.5V7.5L16,12M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",gauge:"M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12C20,14.4 19,16.5 17.3,18C15.9,16.7 14,16 12,16C10,16 8.2,16.7 6.7,18C5,16.5 4,14.4 4,12A8,8 0 0,1 12,4M14,5.89C13.62,5.9 13.26,6.15 13.1,6.54L11.81,9.77L11.71,10C11,10.13 10.41,10.6 10.14,11.26C9.73,12.29 10.23,13.45 11.26,13.86C12.29,14.27 13.45,13.77 13.86,12.74C14.12,12.08 14,11.32 13.57,10.76L13.67,10.5L14.96,7.29L14.97,7.26C15.17,6.75 14.92,6.17 14.41,5.96C14.28,5.91 14.15,5.89 14,5.89M10,6A1,1 0 0,0 9,7A1,1 0 0,0 10,8A1,1 0 0,0 11,7A1,1 0 0,0 10,6M7,9A1,1 0 0,0 6,10A1,1 0 0,0 7,11A1,1 0 0,0 8,10A1,1 0 0,0 7,9M17,9A1,1 0 0,0 16,10A1,1 0 0,0 17,11A1,1 0 0,0 18,10A1,1 0 0,0 17,9Z",eye:"M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z",night:Pt,crosshairs:"M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M3.05,13H1V11H3.05C3.5,6.83 6.83,3.5 11,3.05V1H13V3.05C17.17,3.5 20.5,6.83 20.95,11H23V13H20.95C20.5,17.17 17.17,20.5 13,20.95V23H11V20.95C6.83,20.5 3.5,17.17 3.05,13M12,5A7,7 0 0,0 5,12A7,7 0 0,0 12,19A7,7 0 0,0 19,12A7,7 0 0,0 12,5Z",backspace:"M19,15.59L17.59,17L14,13.41L10.41,17L9,15.59L12.59,12L9,8.41L10.41,7L14,10.59L17.59,7L19,8.41L15.41,12L19,15.59M22,3A2,2 0 0,1 24,5V19A2,2 0 0,1 22,21H7C6.31,21 5.77,20.64 5.41,20.11L0,12L5.41,3.88C5.77,3.35 6.31,3 7,3H22M22,5H7L2.28,12L7,19H22V5Z",leave:"M24 13L20 17V14H11V12H20V9L24 13M4 20V12H1L11 3L18 9.3V10H15.79L11 5.69L6 10.19V18H16V16H18V20H4Z",lamp:"M15,2L17,9H7L9,2M11,10H13V20H16V22H8V20H11V10Z","check-circle":"M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z",rooms:"M2,2H8V4H16V2H22V8H20V16H22V22H16V20H8V22H2V16H4V8H2V2M16,8V6H8V8H6V16H8V18H16V16H18V8H16M4,4V6H6V4H4M18,4V6H20V4H18M4,18V20H6V18H4M18,18V20H20V18H18Z",undo:"M12.5,8C9.85,8 7.45,9 5.6,10.6L2,7V16H11L7.38,12.38C8.77,11.22 10.54,10.5 12.5,10.5C16.04,10.5 19.05,12.81 20.1,16L22.47,15.22C21.08,11.03 17.15,8 12.5,8Z","w-sunny":"M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.36,17L5.12,13.23C5.26,14 5.53,14.78 5.95,15.5C6.37,16.24 6.91,16.86 7.5,17.37L3.36,17M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M20.64,17L16.5,17.36C17.09,16.85 17.62,16.22 18.04,15.5C18.46,14.77 18.73,14 18.87,13.21L20.64,17M12,22L9.59,18.56C10.33,18.83 11.14,19 12,19C12.82,19 13.63,18.83 14.37,18.56L12,22Z","w-clear-night":Pt,"w-partlycloudy":"M12.74,5.47C15.1,6.5 16.35,9.03 15.92,11.46C17.19,12.56 18,14.19 18,16V16.17C18.31,16.06 18.65,16 19,16A3,3 0 0,1 22,19A3,3 0 0,1 19,22H6A4,4 0 0,1 2,18A4,4 0 0,1 6,14H6.27C5,12.45 4.6,10.24 5.5,8.26C6.72,5.5 9.97,4.24 12.74,5.47M11.93,7.3C10.16,6.5 8.09,7.31 7.31,9.07C6.85,10.09 6.93,11.22 7.41,12.13C8.5,10.83 10.16,10 12,10C12.7,10 13.38,10.12 14,10.34C13.94,9.06 13.18,7.86 11.93,7.3M13.55,3.64C13,3.4 12.45,3.23 11.88,3.12L14.37,1.82L15.27,4.71C14.76,4.29 14.19,3.93 13.55,3.64M6.09,4.44C5.6,4.79 5.17,5.19 4.8,5.63L4.91,2.82L7.87,3.5C7.25,3.71 6.65,4.03 6.09,4.44M18,9.71C17.91,9.12 17.78,8.55 17.59,8L19.97,9.5L17.92,11.73C18.03,11.08 18.05,10.4 18,9.71M3.04,11.3C3.11,11.9 3.24,12.47 3.43,13L1.06,11.5L3.1,9.28C3,9.93 2.97,10.61 3.04,11.3M19,18H16V16A4,4 0 0,0 12,12A4,4 0 0,0 8,16H6A2,2 0 0,0 4,18A2,2 0 0,0 6,20H19A1,1 0 0,0 20,19A1,1 0 0,0 19,18Z","w-partlycloudy-night":"M22,10.28C21.74,10.3 21.5,10.31 21.26,10.31C19.32,10.31 17.39,9.57 15.91,8.09C14.25,6.44 13.5,4.19 13.72,2C13.77,1.53 13.22,1 12.71,1C12.57,1 12.44,1.04 12.32,1.12C12,1.36 11.66,1.64 11.36,1.94C9.05,4.24 8.55,7.66 9.84,10.46C8.31,11.11 7.13,12.43 6.69,14.06L6,14A4,4 0 0,0 2,18A4,4 0 0,0 6,22H19A3,3 0 0,0 22,19A3,3 0 0,0 19,16C18.42,16 17.88,16.16 17.42,16.45L17.5,15.5C17.5,15.28 17.5,15.05 17.46,14.83C19.14,14.67 20.77,13.94 22.06,12.64C22.38,12.34 22.64,12 22.88,11.68C23.27,11.13 22.65,10.28 22.04,10.28M19,18A1,1 0 0,1 20,19A1,1 0 0,1 19,20H6A2,2 0 0,1 4,18A2,2 0 0,1 6,16H8.5V15.5C8.5,13.94 9.53,12.64 10.94,12.18C11.1,12.13 11.26,12.09 11.43,12.06C11.61,12.03 11.8,12 12,12C12.23,12 12.45,12.03 12.66,12.07C12.73,12.08 12.8,12.1 12.87,12.13C13,12.16 13.15,12.2 13.28,12.25C13.36,12.28 13.44,12.32 13.5,12.36C13.63,12.41 13.74,12.47 13.84,12.54C13.92,12.59 14,12.64 14.07,12.7C14.17,12.77 14.25,12.84 14.34,12.92C14.41,13 14.5,13.05 14.55,13.12C14.63,13.2 14.69,13.29 14.76,13.37C14.82,13.45 14.89,13.53 14.94,13.62C15,13.71 15.04,13.8 15.09,13.9C15.14,14 15.2,14.08 15.24,14.18C15.41,14.59 15.5,15.03 15.5,15.5V18M16.83,12.86C15.9,11.16 14.08,10 12,10H11.87C11.41,9.19 11.14,8.26 11.14,7.29C11.14,6.31 11.39,5.37 11.86,4.55C12.21,6.41 13.12,8.14 14.5,9.5C15.86,10.88 17.58,11.79 19.45,12.14C18.66,12.6 17.76,12.84 16.83,12.86Z","w-cloudy":"M6,19A5,5 0 0,1 1,14A5,5 0 0,1 6,9C7,6.65 9.3,5 12,5C15.43,5 18.24,7.66 18.5,11.03L19,11A4,4 0 0,1 23,15A4,4 0 0,1 19,19H6M19,13H17V12A5,5 0 0,0 12,7C9.5,7 7.45,8.82 7.06,11.19C6.73,11.07 6.37,11 6,11A3,3 0 0,0 3,14A3,3 0 0,0 6,17H19A2,2 0 0,0 21,15A2,2 0 0,0 19,13Z","w-rainy":"M6,14.03A1,1 0 0,1 7,15.03C7,15.58 6.55,16.03 6,16.03C3.24,16.03 1,13.79 1,11.03C1,8.27 3.24,6.03 6,6.03C7,3.68 9.3,2.03 12,2.03C15.43,2.03 18.24,4.69 18.5,8.06L19,8.03A4,4 0 0,1 23,12.03C23,14.23 21.21,16.03 19,16.03H18C17.45,16.03 17,15.58 17,15.03C17,14.47 17.45,14.03 18,14.03H19A2,2 0 0,0 21,12.03A2,2 0 0,0 19,10.03H17V9.03C17,6.27 14.76,4.03 12,4.03C9.5,4.03 7.45,5.84 7.06,8.21C6.73,8.09 6.37,8.03 6,8.03A3,3 0 0,0 3,11.03A3,3 0 0,0 6,14.03M12,14.15C12.18,14.39 12.37,14.66 12.56,14.94C13,15.56 14,17.03 14,18C14,19.11 13.1,20 12,20A2,2 0 0,1 10,18C10,17.03 11,15.56 11.44,14.94C11.63,14.66 11.82,14.4 12,14.15M12,11.03L11.5,11.59C11.5,11.59 10.65,12.55 9.79,13.81C8.93,15.06 8,16.56 8,18A4,4 0 0,0 12,22A4,4 0 0,0 16,18C16,16.56 15.07,15.06 14.21,13.81C13.35,12.55 12.5,11.59 12.5,11.59","w-pouring":"M9,12C9.53,12.14 9.85,12.69 9.71,13.22L8.41,18.05C8.27,18.59 7.72,18.9 7.19,18.76C6.65,18.62 6.34,18.07 6.5,17.54L7.78,12.71C7.92,12.17 8.47,11.86 9,12M13,12C13.53,12.14 13.85,12.69 13.71,13.22L11.64,20.95C11.5,21.5 10.95,21.8 10.41,21.66C9.88,21.5 9.56,20.97 9.7,20.43L11.78,12.71C11.92,12.17 12.47,11.86 13,12M17,12C17.53,12.14 17.85,12.69 17.71,13.22L16.41,18.05C16.27,18.59 15.72,18.9 15.19,18.76C14.65,18.62 14.34,18.07 14.5,17.54L15.78,12.71C15.92,12.17 16.47,11.86 17,12M17,10V9A5,5 0 0,0 12,4C9.5,4 7.45,5.82 7.06,8.19C6.73,8.07 6.37,8 6,8A3,3 0 0,0 3,11C3,12.11 3.6,13.08 4.5,13.6V13.59C5,13.87 5.14,14.5 4.87,14.96C4.59,15.43 4,15.6 3.5,15.32V15.33C2,14.47 1,12.85 1,11A5,5 0 0,1 6,6C7,3.65 9.3,2 12,2C15.43,2 18.24,4.66 18.5,8.03L19,8A4,4 0 0,1 23,12C23,13.5 22.2,14.77 21,15.46V15.46C20.5,15.73 19.91,15.57 19.63,15.09C19.36,14.61 19.5,14 20,13.72V13.73C20.6,13.39 21,12.74 21,12A2,2 0 0,0 19,10H17Z","w-lightning":"M6,16A5,5 0 0,1 1,11A5,5 0 0,1 6,6C7,3.65 9.3,2 12,2C15.43,2 18.24,4.66 18.5,8.03L19,8A4,4 0 0,1 23,12A4,4 0 0,1 19,16H18A1,1 0 0,1 17,15A1,1 0 0,1 18,14H19A2,2 0 0,0 21,12A2,2 0 0,0 19,10H17V9A5,5 0 0,0 12,4C9.5,4 7.45,5.82 7.06,8.19C6.73,8.07 6.37,8 6,8A3,3 0 0,0 3,11A3,3 0 0,0 6,14H7A1,1 0 0,1 8,15A1,1 0 0,1 7,16H6M12,11H15L13,15H15L11.25,22L12,17H9.5L12,11Z","w-lightning-rainy":"M4.5,13.59C5,13.87 5.14,14.5 4.87,14.96C4.59,15.44 4,15.6 3.5,15.33V15.33C2,14.47 1,12.85 1,11A5,5 0 0,1 6,6C7,3.65 9.3,2 12,2C15.43,2 18.24,4.66 18.5,8.03L19,8A4,4 0 0,1 23,12A4,4 0 0,1 19,16A1,1 0 0,1 18,15A1,1 0 0,1 19,14A2,2 0 0,0 21,12A2,2 0 0,0 19,10H17V9A5,5 0 0,0 12,4C9.5,4 7.45,5.82 7.06,8.19C6.73,8.07 6.37,8 6,8A3,3 0 0,0 3,11C3,12.11 3.6,13.08 4.5,13.6V13.59M9.5,11H12.5L10.5,15H12.5L8.75,22L9.5,17H7L9.5,11M17.5,18.67C17.5,19.96 16.5,21 15.25,21C14,21 13,19.96 13,18.67C13,17.12 15.25,14.5 15.25,14.5C15.25,14.5 17.5,17.12 17.5,18.67Z","w-snowy":"M6,14A1,1 0 0,1 7,15A1,1 0 0,1 6,16A5,5 0 0,1 1,11A5,5 0 0,1 6,6C7,3.65 9.3,2 12,2C15.43,2 18.24,4.66 18.5,8.03L19,8A4,4 0 0,1 23,12A4,4 0 0,1 19,16H18A1,1 0 0,1 17,15A1,1 0 0,1 18,14H19A2,2 0 0,0 21,12A2,2 0 0,0 19,10H17V9A5,5 0 0,0 12,4C9.5,4 7.45,5.82 7.06,8.19C6.73,8.07 6.37,8 6,8A3,3 0 0,0 3,11A3,3 0 0,0 6,14M7.88,18.07L10.07,17.5L8.46,15.88C8.07,15.5 8.07,14.86 8.46,14.46C8.85,14.07 9.5,14.07 9.88,14.46L11.5,16.07L12.07,13.88C12.21,13.34 12.76,13.03 13.29,13.17C13.83,13.31 14.14,13.86 14,14.4L13.41,16.59L15.6,16C16.14,15.86 16.69,16.17 16.83,16.71C16.97,17.24 16.66,17.79 16.12,17.93L13.93,18.5L15.54,20.12C15.93,20.5 15.93,21.15 15.54,21.54C15.15,21.93 14.5,21.93 14.12,21.54L12.5,19.93L11.93,22.12C11.79,22.66 11.24,22.97 10.71,22.83C10.17,22.69 9.86,22.14 10,21.6L10.59,19.41L8.4,20C7.86,20.14 7.31,19.83 7.17,19.29C7.03,18.76 7.34,18.21 7.88,18.07Z","w-fog":"M3,15H13A1,1 0 0,1 14,16A1,1 0 0,1 13,17H3A1,1 0 0,1 2,16A1,1 0 0,1 3,15M16,15H21A1,1 0 0,1 22,16A1,1 0 0,1 21,17H16A1,1 0 0,1 15,16A1,1 0 0,1 16,15M1,12A5,5 0 0,1 6,7C7,4.65 9.3,3 12,3C15.43,3 18.24,5.66 18.5,9.03L19,9C21.19,9 22.97,10.76 23,13H21A2,2 0 0,0 19,11H17V10A5,5 0 0,0 12,5C9.5,5 7.45,6.82 7.06,9.19C6.73,9.07 6.37,9 6,9A3,3 0 0,0 3,12C3,12.35 3.06,12.69 3.17,13H1.1L1,12M3,19H5A1,1 0 0,1 6,20A1,1 0 0,1 5,21H3A1,1 0 0,1 2,20A1,1 0 0,1 3,19M8,19H21A1,1 0 0,1 22,20A1,1 0 0,1 21,21H8A1,1 0 0,1 7,20A1,1 0 0,1 8,19Z","w-windy":"M4,10A1,1 0 0,1 3,9A1,1 0 0,1 4,8H12A2,2 0 0,0 14,6A2,2 0 0,0 12,4C11.45,4 10.95,4.22 10.59,4.59C10.2,5 9.56,5 9.17,4.59C8.78,4.2 8.78,3.56 9.17,3.17C9.9,2.45 10.9,2 12,2A4,4 0 0,1 16,6A4,4 0 0,1 12,10H4M19,12A1,1 0 0,0 20,11A1,1 0 0,0 19,10C18.72,10 18.47,10.11 18.29,10.29C17.9,10.68 17.27,10.68 16.88,10.29C16.5,9.9 16.5,9.27 16.88,8.88C17.42,8.34 18.17,8 19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14H5A1,1 0 0,1 4,13A1,1 0 0,1 5,12H19M18,18H4A1,1 0 0,1 3,17A1,1 0 0,1 4,16H18A3,3 0 0,1 21,19A3,3 0 0,1 18,22C17.17,22 16.42,21.66 15.88,21.12C15.5,20.73 15.5,20.1 15.88,19.71C16.27,19.32 16.9,19.32 17.29,19.71C17.47,19.89 17.72,20 18,20A1,1 0 0,0 19,19A1,1 0 0,0 18,18Z",mosque:"M24 7C24 5.9 22 4 22 4S20 5.9 20 7C20 7.7 20.4 8.4 21 8.7V13H19V11C19 10.1 18.3 9.3 17.5 9.1C17.8 8.5 18 7.9 18 7.1C18 5.8 17.4 4.6 16.3 3.9L12 1L7.7 3.8C6.7 4.6 6 5.8 6 7.1C6 7.8 6.2 8.5 6.6 9.1C5.7 9.3 5 10.1 5 11V13H3V8.7C3.6 8.4 4 7.7 4 7C4 5.9 2 4 2 4S0 5.9 0 7C0 7.7 .4 8.4 1 8.7V21H11V17C11 16.5 11.4 16 12 16S13 16.5 13 17V21H23V8.7C23.6 8.4 24 7.7 24 7M8.9 5.5L12 3.4L15.1 5.5C15.7 5.9 16 6.4 16 7.1C16 8.1 15.1 9 14.1 9H9.9C8.9 9 8 8.1 8 7.1C8 6.4 8.3 5.9 8.9 5.5M21 19H15V17C15 15.4 13.6 14 12 14S9 15.4 9 17V19H3V15H7V11H17V15H21V19Z",coffee:"M2,21V19H20V21H2M20,8V5H18V8H20M20,3A2,2 0 0,1 22,5V8A2,2 0 0,1 20,10H18V13A4,4 0 0,1 14,17H8A4,4 0 0,1 4,13V3H20M16,5H6V13A2,2 0 0,0 8,15H14A2,2 0 0,0 16,13V5Z",tower:"M8.28,5.45L6.5,4.55L7.76,2H16.23L17.5,4.55L15.72,5.44L15,4H9L8.28,5.45M18.62,8H14.09L13.3,5H10.7L9.91,8H5.38L4.1,10.55L5.89,11.44L6.62,10H17.38L18.1,11.45L19.89,10.56L18.62,8M17.77,22H15.7L15.46,21.1L12,15.9L8.53,21.1L8.3,22H6.23L9.12,11H11.19L10.83,12.35L12,14.1L13.16,12.35L12.81,11H14.88L17.77,22M11.4,15L10.5,13.65L9.32,18.13L11.4,15M14.68,18.12L13.5,13.64L12.6,15L14.68,18.12Z"},Dt=["home","lightning-bolt","shield-home","doorbell","air-conditioner","cctv","sofa","bed","kitchen","shower","garden","garage","car","pool","gamepad","desk","laundry","solar","lightbulb","robot-vacuum","thermometer","television","speaker","dashboard"];function Ot(t){const e=parseInt(t.replace("#",""),16),[i,s,n]=[e>>16&255,e>>8&255,255&e].map((t=>{const e=t/255;return e<=.03928?e/12.92:((e+.055)/1.055)**2.4}));return.2126*i+.7152*s+.0722*n>.22?"#1E252B":"#FFFFFF"}const Tt=t=>"#"+t.map((t=>t.toString(16).padStart(2,"0"))).join("");function jt(t,e){const i=e/100,s=e=>{const s=(e+t/60)%6;return Math.round(255*(1-i*Math.max(0,Math.min(s,4-s,1))))};return[s(5),s(3),s(1)]}const It=([t,e,i])=>`rgb(${t}, ${e}, ${i})`,Nt=t=>t.split(".")[0];function Rt(t,e,i){return e.names[i]||t.states[i]?.attributes.friendly_name||i}const Zt=t=>t.attributes.device_class;function Ft(t){if(!t)return!1;switch(Nt(t.entity_id)){case"climate":return"off"!==t.state&&"unavailable"!==t.state;case"vacuum":return"cleaning"===t.state||"returning"===t.state;case"lock":return"unlocked"===t.state||"open"===t.state||"jammed"===t.state;case"cover":return"open"===t.state||"opening"===t.state||"closing"===t.state;case"media_player":return"playing"===t.state||"on"===t.state;case"camera":return"streaming"===t.state||"recording"===t.state;case"sensor":case"event":return!1;default:return"on"===t.state||"open"===t.state||"home"===t.state}}function Bt(t){const e=t&&"light"===Nt(t.entity_id)&&"on"===t.state?t.attributes.rgb_color:void 0;if(3===e?.length)return`--tone:rgb(${e.join(",")});--on-tone:${Ot(Tt(e))}`;const i=t?function(t){const e=Nt(t.entity_id);return"climate"!==e||"cool"!==t.state&&"cooling"!==t.attributes.hvac_action?"binary_sensor"===e&&["smoke","moisture","gas","carbon_monoxide","problem","safety"].includes(Zt(t)??"")||"lock"===e&&"jammed"===t.state?"alert":"accent":"cool"}(t):"accent";return`--tone:var(--${i});--on-tone:var(--on-${i})`}function Ut(t,e){const i=t?.attributes.icon;if(i?.startsWith("mdi:")){const t=i.slice(4);if(Et[t])return t;if(customElements.get("ha-icon"))return i}const s=Nt(e),n=Ft(t),o=t?Zt(t):void 0;switch(s){case"light":return n?"lightbulb":"lightbulb-outline";case"switch":case"input_boolean":return"outlet"===o?n?"power-plug":"power-plug-off":n?"toggle-on":"toggle-off";case"fan":return n?"fan":"fan-off";case"climate":return"cool"===t?.state?"snowflake":"air-conditioner";case"vacuum":return"robot-vacuum";case"camera":return"cctv";case"lock":return n?"lock-open":"lock";case"cover":return"garage"===o?n?"garage-open":"garage":"window"===o?n?"window-open":"window-closed":"curtain"===o?"curtains":"door"===o?n?"door-open":"door-closed":n?"blinds":"blinds-closed";case"binary_sensor":return"motion"===o||"occupancy"===o||"presence"===o?n?"motion-sensor":"motion-sensor-off":"door"===o||"opening"===o?n?"door-open":"door-closed":"window"===o?n?"window-open":"window-closed":"garage_door"===o?n?"garage-open":"garage":"moisture"===o?"leak":"smoke"===o||"heat"===o?"fire":"eye";case"sensor":return"temperature"===o?"thermometer":"humidity"===o?"humidity":"power"===o||"energy"===o||"current"===o||"voltage"===o?"lightning-bolt":"battery"===o?"battery":"gauge";case"event":return"doorbell"===o?"doorbell":"bell";case"media_player":return"speaker"===o?"speaker":"television";case"scene":return"palette";case"script":case"button":case"input_button":return"play-circle";default:return"grid"}}function Wt(t){const e=Nt(t);return["scene","script","button","input_button"].includes(e)?"run":["light","switch","fan","input_boolean","automation","media_player","climate","cover","vacuum","humidifier","siren"].includes(e)?"toggle":"sheet"}async function qt(t,e){const i=e.entity_id,s=Nt(i),n={entity_id:i};switch(s){case"climate":return t.callService("climate","off"===e.state?"turn_on":"turn_off",n);case"vacuum":return t.callService("vacuum","cleaning"===e.state?"return_to_base":"start",n);case"cover":return t.callService("cover","toggle",n);case"scene":case"script":return t.callService(s,"turn_on",n);case"button":case"input_button":return t.callService(s,"press",n);default:return t.callService("homeassistant","toggle",n)}}const Xt=t=>`⁦${t}⁩`;function Yt(t,e,i=1){return new Intl.NumberFormat(zt[e],{maximumFractionDigits:i}).format(t)}function Kt(t,e){const i=Number(t.state);if(""===t.state||Number.isNaN(i))return;const s=t.attributes.unit_of_measurement??"",n="%"===s||s.startsWith("°")?"":" ";return Xt(`${Yt(i,e)}${s?n+s:""}`)}function Gt(t,e,i){if(!e)return t("unavailable");if("unavailable"===e.state||"unknown"===e.state)return t(e.state);const s=Nt(e.entity_id),n=Zt(e);if("sensor"===s)return Kt(e,i)??(St(e.state)?t(e.state):e.state);if("binary_sensor"===s){const i="on"===e.state;return"motion"===n||"occupancy"===n||"presence"===n?t(i?"motion":"clear"):["door","window","opening","garage_door"].includes(n??"")?t(i?"open":"closed"):["moisture","smoke","gas","carbon_monoxide","problem"].includes(n??"")?t(i?"detected":"clear"):t(i?"on":"off")}if("light"===s&&"on"===e.state&&"number"==typeof e.attributes.brightness)return Xt(`${Math.round(e.attributes.brightness/255*100)}%`);if("climate"===s&&"off"!==e.state){const s=e.attributes.temperature,n=St(e.state)?t(e.state):e.state;return"number"==typeof s?`${n} · ${Xt(`${Yt(s,i)}°`)}`:n}return"event"===s?Qt(t,e.state):["scene","script","button","input_button"].includes(s)?t("tap_to_run"):"vacuum"===s&&"number"==typeof e.attributes.battery_level&&"docked"===e.state?`${t("docked")} · ${Xt(`${e.attributes.battery_level}%`)}`:St(e.state)?t(e.state):e.state}function Jt(t,e,i){if(!e)return"–";const s=Nt(e.entity_id);if("sensor"===s)return Kt(e,i)??e.state;if("climate"===s){const s=e.attributes.current_temperature;return"number"==typeof s?Xt(`${Yt(s,i)}°`):Gt(t,e,i)}return"light"===s&&"on"===e.state&&"number"==typeof e.attributes.brightness?Xt(`${Math.round(e.attributes.brightness/255*100)}%`):Gt(t,e,i)}function Qt(t,e){const i=Date.parse(e);if(Number.isNaN(i))return"–";const s=Math.round((Date.now()-i)/6e4);return s<1?t("just_now"):s<60?t("min_ago",{n:s}):t("hours_ago",{n:Math.round(s/60)})}function te(t){return!!t&&"sensor"===Nt(t.entity_id)&&""!==t.state&&!Number.isNaN(Number(t.state))}function ee(t,e,i={}){return Object.values(t.states).filter((t=>!i.domains||i.domains.includes(Nt(t.entity_id)))).filter((t=>!i.deviceClasses||i.deviceClasses.includes(Zt(t)??""))).map((i=>({id:i.entity_id,name:Rt(t,e,i.entity_id),entity:i}))).sort(((t,e)=>t.name.localeCompare(e.name)))}const ie=12,se="#E9971D",ne=()=>Math.random().toString(36).slice(2,10)+Date.now().toString(36).slice(-4),oe={floorplan:{w:12,h:10,minW:4,minH:4},tile:{w:3,h:2,minW:2,minH:2},camera:{w:6,h:5,minW:3,minH:3},heading:{w:12,h:1,minW:2,minH:1},clock:{w:4,h:3,minW:3,minH:2},modes:{w:12,h:2,minW:4,minH:2},vacuum:{w:12,h:9,minW:6,minH:6},visitors:{w:12,h:4,minW:4,minH:3},energy:{w:6,h:7,minW:4,minH:5}};function ae(t){return{home_name:"",language:t,accent:se,theme:"schedule",dark_from:"19:00",dark_to:"06:30",default_page:"",screensaver:{enabled:!0,timeout_min:5,photos:!0,photo_folder:"smartnest-photos",photo_seconds:20},weather:{entity:"weather.forecast_home",background:!0},fully:{night_dim:!0,night_brightness:20,night_off_min:15,motion_wake:!1},doorbell:{keep_days:7},kiosk:{},greeting_name:"",prayer:!0,morning:!0,chips_hidden:[]}}function re(t){return{id:ne(),name:t,markers:[]}}function le(t,e={},i={}){const{w:s,h:n}=oe[t];return{id:ne(),type:t,x:0,y:0,w:s,h:n,config:e,...i}}const ce=(t,e)=>t.x<e.x+e.w&&e.x<t.x+t.w&&t.y<e.y+e.h&&e.y<t.y+t.h;function de(t,e){const i=t.map((t=>{const e={...t};return e.w=Math.min(Math.max(e.w,1),ie),e.x=Math.min(Math.max(e.x,0),ie-e.w),e.y=Math.max(e.y,0),e})),s=i.find((t=>t.id===e)),n=s?[s]:[];for(const a of i.filter((t=>t!==s)).sort(((t,e)=>t.y-e.y||t.x-e.x))){for(;n.some((t=>ce(t,a)));)a.y++;n.push(a)}const o=[];for(const a of n.sort(((t,e)=>t.y-e.y||t.x-e.x))){for(;a.y>0&&!o.some((t=>ce(t,{...a,y:a.y-1})));)a.y--;o.push(a)}return o}function pe(t,e=0){let i=0,s=e,n=0;return t.map((t=>{i+t.w>ie&&(i=0,s+=n,n=0);const e={...t,x:i,y:s};return i+=t.w,n=Math.max(n,t.h),e}))}const he=[{id:"blank",icon:"dashboard",label:"template_blank"},{id:"home",icon:"home",label:"template_home"},{id:"power",icon:"lightning-bolt",label:"template_power"},{id:"security",icon:"shield-home",label:"template_security"},{id:"doorbell",icon:"doorbell",label:"template_doorbell"},{id:"climate",icon:"air-conditioner",label:"template_climate"},{id:"robot",icon:"robot-vacuum",label:"template_robot"}];function ue(t,e,i,s){const n=he.find((e=>e.id===t)),o=(t,s,n=8)=>ee(e,i,{domains:t,deviceClasses:s}).slice(0,n).map((t=>t.id)),a=t=>t.map((t=>le("tile",{entity:t}))),r=(t,e=6,i=5)=>t.map((t=>le("camera",{entity:t},{w:e,h:i})));let l=[];switch(t){case"home":l=[...e.states["script.smartnest_mode_away"]?[le("modes")]:[],le("floorplan",{floors:[re(s("floor_default"))]},{y:2})];break;case"power":l=pe([...Object.keys(e.states).some((t=>/solar|pv/.test(t)))?[le("energy")]:[],...a(o(["sensor"],["power","energy"])),...a(o(["switch"],void 0,8))]);break;case"security":l=pe([...r(o(["camera"],void 0,4)),...a(o(["lock"])),...a(o(["binary_sensor"],["door","window","opening","motion","occupancy","smoke","moisture"]))]);break;case"doorbell":{const t=i.settings.doorbell.camera_entity??o(["camera"],void 0,1)[0],e=i.settings.doorbell.lock_entity??o(["lock"],void 0,1)[0],s=o(["event"],["doorbell"],1);l=pe([...t?r([t],8,7):[],...a([e,...s].filter(Boolean)).map((t=>({...t,w:4}))),le("visitors")]);break}case"robot":l=o(["vacuum"],void 0,2).map(((t,e)=>le("vacuum",{entity:t},{y:9*e})));break;case"climate":l=pe([...a(o(["climate"])),...a(o(["sensor"],["temperature","humidity"]))])}return{id:ne(),title:s("blank"===t?"untitled":n.label),icon:n.icon,widgets:de(l)}}function ge(t,e){const i=ae(e),s={...i,...t?.settings??{}};return s.screensaver={...i.screensaver,...t?.settings?.screensaver??{}},s.doorbell={...i.doorbell,...t?.settings?.doorbell??{}},s.chips_hidden=Array.isArray(t?.settings?.chips_hidden)?t.settings.chips_hidden:[],s.kiosk={...t?.settings?.kiosk??{}},s.weather={...i.weather,...t?.settings?.weather??{}},s.fully={...i.fully,...t?.settings?.fully??{}},{version:1,settings:s,names:{...t?.names??{}},pages:Array.isArray(t?.pages)?t.pages:[]}}async function me(t,e){await t.callWS({type:"smartnest/config/save",config:e})}function fe(t,e){for(const i of t.pages){const t=i.widgets.find((t=>t.id===e));if(t)return t}}const be="#151A1E",ve="#1E252B",_e="#2A333B",ye="#3A454F",xe="#55616C",we="#9AA4AD",$e="#F2ECE2",ke="#965A00",Ce="#18BCF2",Ae="#2FB57A",He="#F26B68",Me="#C62828";const Ve=a`
  :host {
    --font: "Rubik", system-ui, -apple-system, "Segoe UI", Tahoma, sans-serif;
    --r-sm: 10px;
    --r-md: 16px;
    --r-lg: 24px;
    --r-xl: 32px;
    --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
    --ease-in: cubic-bezier(0.64, 0, 0.78, 0);
    --spring: cubic-bezier(0.34, 1.56, 0.64, 1);
    --dur-fast: 200ms;
    --dur: 400ms;
    --row-h: ${o(44)}px;
    --gap: ${o(12)}px;
    font-family: var(--font);
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
  }
  * {
    box-sizing: border-box;
  }
  button {
    font: inherit;
    color: inherit;
    border: 0;
    background: none;
    padding: 0;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  .glass {
    background: var(--surface);
    -webkit-backdrop-filter: blur(24px) saturate(170%);
    backdrop-filter: blur(24px) saturate(170%);
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
  }
  .pressable {
    transition: transform var(--dur-fast) var(--ease-out), background-color var(--dur-fast) var(--ease-out),
      color var(--dur-fast) var(--ease-out);
    touch-action: manipulation;
    user-select: none;
    -webkit-user-select: none;
  }
  .pressable:active {
    transform: scale(0.96);
  }
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: 44px;
    padding: 0 18px;
    border-radius: 999px;
    font-weight: 500;
    font-size: 15px;
    background: var(--surface-2);
    color: var(--text);
    white-space: nowrap;
  }
  .btn.primary {
    background: var(--accent);
    color: var(--on-accent);
    font-weight: 700;
  }
  .btn.danger {
    background: var(--alert);
    color: var(--on-alert);
    font-weight: 700;
  }
  .btn.ghost {
    background: transparent;
  }
  .btn[disabled] {
    opacity: 0.45;
    pointer-events: none;
  }
  .icon-btn {
    display: inline-grid;
    place-items: center;
    width: 44px;
    height: 44px;
    border-radius: 999px;
    background: var(--surface-2);
    color: var(--text);
    flex: none;
  }
  .icon-btn.small {
    width: 32px;
    height: 32px;
  }
  .icon-btn.primary {
    background: var(--accent);
    color: var(--on-accent);
  }
  .field {
    display: grid;
    gap: 6px;
    font-size: 13px;
    font-weight: 500;
    color: var(--text-2);
  }
  .field .hint {
    font-weight: 400;
    font-size: 12px;
  }
  input[type="text"],
  input[type="number"],
  input[type="time"],
  input[type="search"],
  select {
    font: inherit;
    font-size: 16px; /* 16px stops iOS from zooming into the field */
    color: var(--text);
    background: var(--surface-2);
    border: 1px solid transparent;
    border-radius: var(--r-sm);
    min-height: 44px;
    padding: 0 12px;
    width: 100%;
    outline: none;
    transition: border-color var(--dur-fast) var(--ease-out);
  }
  input:focus,
  select:focus {
    border-color: var(--accent);
  }
  .seg {
    display: inline-flex;
    padding: 3px;
    gap: 2px;
    border-radius: 999px;
    background: var(--surface-2);
    max-width: 100%;
    overflow-x: auto;
    scrollbar-width: none;
  }
  .seg::-webkit-scrollbar {
    display: none;
  }
  .seg > button {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-height: 36px;
    padding: 0 14px;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 500;
    color: var(--text-2);
    white-space: nowrap;
    transition: background-color var(--dur) var(--ease-out), color var(--dur) var(--ease-out),
      box-shadow var(--dur) var(--ease-out);
  }
  .seg > button[aria-pressed="true"] {
    background: var(--surface-solid);
    color: var(--text);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  }
  .muted {
    color: var(--text-2);
  }
  .ltr {
    direction: ltr;
    unicode-bidi: isolate;
  }
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 1ms !important;
      transition-duration: 1ms !important;
    }
  }
`,Le="smartnest-kiosk";function Se(){try{return"1"===localStorage.getItem(Le)}catch{return!1}}function ze(t,e){let i=2166136261;const s=`${e}:${t}`;for(let n=0;n<2e3;n++){for(let t=0;t<s.length;t++)i^=s.charCodeAt(t),i=Math.imul(i,16777619)>>>0;i^=n}return i.toString(16).padStart(8,"0")}function Pe(t){const e=function(){const t=document.querySelector("home-assistant")?.shadowRoot?.querySelector("home-assistant-main");return t?.shadowRoot??null}();if(!e)return;let i=e.getElementById("smartnest-kiosk");t&&!i?(i=document.createElement("style"),i.id="smartnest-kiosk",i.textContent=":host { --mdc-drawer-width: 0px !important; } ha-sidebar { display: none !important; }",e.appendChild(i)):t||i?.remove()}let Ee;const De=[["screen","switch",/(^|_)screen$/],["brightness","number",/screen_brightness$/],["motion","switch",/motion_detection$/],["media","media_player",/.*/]];function Oe(t){const e=new Map;for(const i of Object.values(t.entities??{})){if("fully_kiosk"!==i.platform||!i.device_id)continue;let s=e.get(i.device_id);s||(s={deviceId:i.device_id,name:t.devices?.[i.device_id]?.name??"Tablet"},e.set(i.device_id,s));const[n,o]=i.entity_id.split("."),a=i.translation_key??o;for(const[t,e,r]of De)if(n===e&&!s[t]&&(r.test(a)||r.test(o))){s[t]=i.entity_id;break}}return[...e.values()]}function Te(t){const e=window.fully;if(!e)return;const i=Oe(t),s=e.getDeviceId?.();if(s){const e=i.find((e=>t.devices?.[e.deviceId]?.identifiers?.some((([t,e])=>"fully_kiosk"===t&&e===s))));if(e)return e}return 1===i.length?i[0]:void 0}async function je(t,e,i){if(!e.brightness)return;const s=(t=>Math.round(Math.min(100,Math.max(1,t))/100*255))(i);Math.abs(Number(t.states[e.brightness]?.state)-s)<=3||await t.callService("number","set_value",{entity_id:e.brightness,value:s})}async function Ie(t,e,i){e.screen&&"on"===t.states[e.screen]?.state!==i&&await t.callService("switch",i?"turn_on":"turn_off",{entity_id:e.screen})}var Ne=Object.defineProperty,Re=Object.getOwnPropertyDescriptor,Ze=(t,e,i,s)=>{for(var n,o=s>1?void 0:s?Re(e,i):e,a=t.length-1;a>=0;a--)(n=t[a])&&(o=(s?n(e,i,o):n(o))||o);return s&&o&&Ne(e,i,o),o};let Fe=class extends lt{constructor(){super(...arguments),this.icon=""}render(){const t=Et[this.icon]??Et[this.icon.replace(/^mdi:/,"")];return t?F`<svg viewBox="0 0 24 24" aria-hidden="true">${B`<path d=${t}></path>`}</svg>`:this.icon.startsWith("mdi:")&&customElements.get("ha-icon")?F`<ha-icon .icon=${this.icon}></ha-icon>`:this.icon?F`<svg viewBox="0 0 24 24" aria-hidden="true">${B`<path d=${Et.grid}></path>`}</svg>`:W}};Fe.styles=a`
    :host {
      display: inline-grid;
      place-items: center;
      width: var(--icon-size, 24px);
      height: var(--icon-size, 24px);
      flex: none;
      line-height: 0;
    }
    svg {
      width: 100%;
      height: 100%;
      fill: currentColor;
    }
    ha-icon {
      --mdc-icon-size: var(--icon-size, 24px);
    }
  `,Ze([ut()],Fe.prototype,"icon",2),Fe=Ze([dt("sn-icon")],Fe);var Be=Object.defineProperty,Ue=Object.getOwnPropertyDescriptor,We=(t,e,i,s)=>{for(var n,o=s>1?void 0:s?Ue(e,i):e,a=t.length-1;a>=0;a--)(n=t[a])&&(o=(s?n(e,i,o):n(o))||o);return s&&o&&Be(e,i,o),o};const qe=[{id:"away",icon:"leave",label:"mode_away"},{id:"home",icon:"entrance",label:"mode_home"},{id:"sleep",icon:"night",label:"mode_sleep"},{id:"evening",icon:"lamp",label:"mode_evening"}],Xe="input_select.house_mode",Ye=t=>`script.smartnest_mode_${t}`;let Ke=class extends lt{run(t){this.ctx.editing||(navigator.vibrate?.(10),this.ctx.hass.callService("script","turn_on",{entity_id:Ye(t)}).catch((()=>this.ctx.toast(this.ctx.t("error")))),this.ctx.cinematic(t))}render(){const{ctx:t}=this,e=qe.filter((e=>t.hass.states[Ye(e.id)]));if(!e.length)return t.isAdmin?F`<div class="missing glass">${t.t("modes_missing")}</div>`:W;const i=t.hass.states[Xe]?.state;return F`<div class="row">
      ${e.map((e=>F`<button class="glass pressable" aria-pressed=${i===e.id} @click=${()=>this.run(e.id)}>
          <span class="ic"><sn-icon .icon=${e.icon}></sn-icon></span>${t.t(e.label)}
        </button>`))}
    </div>`}};Ke.styles=[Ve,a`
      :host {
        display: block;
        height: 100%;
      }
      .row {
        height: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 12px;
      }
      button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        border-radius: var(--r-lg);
        font-size: 17px;
        font-weight: 700;
        min-height: 64px;
      }
      .ic {
        display: grid;
        place-items: center;
        width: 44px;
        height: 44px;
        border-radius: 999px;
        background: var(--surface-2);
        color: var(--text-2);
        transition: background-color var(--dur) var(--ease-out), color var(--dur) var(--ease-out);
      }
      button[aria-pressed="true"] {
        background: var(--surface-solid);
      }
      button[aria-pressed="true"] .ic {
        background: var(--accent);
        color: var(--on-accent);
      }
      .missing {
        height: 100%;
        display: grid;
        place-items: center;
        padding: 12px 20px;
        border-radius: var(--r-lg);
        color: var(--text-2);
        font-size: 14px;
        text-align: center;
      }
    `],We([ut({attribute:!1})],Ke.prototype,"ctx",2),We([ut({attribute:!1})],Ke.prototype,"widget",2),Ke=We([dt("sn-w-modes")],Ke);const Ge=[{id:"mode",label:"widget_modes"},{id:"alert",label:"chip_t_alert"},{id:"unlocked",label:"chip_t_unlocked"},{id:"open",label:"chip_t_open"},{id:"lights",label:"chip_t_lights"},{id:"climate",label:"chip_t_climate"},{id:"motion",label:"chip_t_motion"},{id:"power",label:"chip_t_power"}];function Je(t){const e=new Set;for(const i of t.pages)for(const t of i.widgets){t.config.entity&&e.add(t.config.entity);for(const i of t.config.floors??[])for(const t of i.markers??[])e.add(t.entity)}return[...e]}const Qe=t=>t.attributes.device_class,ti=(t,e,i,s,n={})=>1===s.length?t(e,n):t(i,{n:s.length,...n});function ei(t){const{hass:e,t:i,config:s}=t,n=new Set(s.settings.chips_hidden),o=Je(s).filter((t=>e.states[t])),a=t=>e.states[t],r=t=>o.filter((e=>t(a(e)))),l=[],c=e.states[Xe]?.state,d=qe.find((t=>t.id===c));d&&e.states[Ye(d.id)]&&l.push({type:"mode",icon:d.icon,label:i(d.label),tone:"accent",entities:[]});const p=r((t=>"binary_sensor"===Nt(t.entity_id)&&"on"===t.state&&["moisture","smoke","gas","carbon_monoxide","problem","safety"].includes(Qe(t)??"")));p.length&&l.push({type:"alert",icon:"alert-circle-outline",label:1===p.length?Rt(e,s,p[0]):i("chip_alert"),tone:"alert",entities:p});const h=r((t=>"lock"===Nt(t.entity_id)&&("unlocked"===t.state||"open"===t.state||"jammed"===t.state)));h.length&&l.push({type:"unlocked",icon:"lock-open",label:ti(i,"chip_unlocked_1","chip_unlocked_n",h),tone:"alert",entities:h,bulk:"lock"});const u=r((t=>{const e=Nt(t.entity_id);return"cover"===e?"open"===t.state&&["door","window","garage","gate"].includes(Qe(t)??""):"binary_sensor"===e&&"on"===t.state&&["door","window","opening","garage_door"].includes(Qe(t)??"")}));u.length&&l.push({type:"open",icon:"door-open",label:ti(i,"chip_open_1","chip_open_n",u),tone:"accent",entities:u});const g=r((t=>"light"===Nt(t.entity_id)&&"on"===t.state));g.length&&l.push({type:"lights",icon:"lightbulb",label:ti(i,"chip_lights_1","chip_lights_n",g),tone:"accent",entities:g,bulk:"off"});const m=r((t=>"climate"===Nt(t.entity_id)&&"off"!==t.state&&"unavailable"!==t.state));if(m.length){const e=a(m[0]).attributes.temperature,s={temp:"number"==typeof e?Xt(`${Yt(e,t.lang)}°`):""};l.push({type:"climate",icon:"air-conditioner",label:ti(i,"chip_climate_1","chip_climate_n",m,s),tone:"cool",entities:m,bulk:"off"})}const f=r((t=>"binary_sensor"===Nt(t.entity_id)&&"on"===t.state&&["motion","occupancy","presence"].includes(Qe(t)??"")));f.length&&l.push({type:"motion",icon:"motion-sensor",label:1===f.length?Rt(e,s,f[0]):i("chip_motion"),tone:"accent",entities:f});const b=s.settings.power_entity??o.find((t=>"power"===Qe(a(t))&&te(a(t)))),v=b?e.states[b]:void 0;return v&&te(v)&&l.push({type:"power",icon:"lightning-bolt",label:Gt(i,v,t.lang),tone:"neutral",entities:[v.entity_id]}),l.filter((t=>!n.has(t.type)))}var ii=Object.defineProperty,si=Object.getOwnPropertyDescriptor,ni=(t,e,i,s)=>{for(var n,o=s>1?void 0:s?si(e,i):e,a=t.length-1;a>=0;a--)(n=t[a])&&(o=(s?n(e,i,o):n(o))||o);return s&&o&&ii(e,i,o),o};const oi=(t,e)=>{const i=e?t.states[e]:void 0,s=Number(i?.state);if(!i||Number.isNaN(s))return;const n=i.attributes.unit_of_measurement;return"kW"===n?1e3*s:"MW"===n?1e6*s:s};function ai(t){const e=Object.values(t.states).filter((t=>t.entity_id.startsWith("sensor.")&&"power"===t.attributes.device_class)),i=t=>e.find((e=>t.test(e.entity_id)))?.entity_id,s=Object.values(t.states).find((t=>t.entity_id.startsWith("sensor.")&&"battery"===t.attributes.device_class&&/(home|house|storage|inverter|powerwall)_?battery|battery_(soc|level|state_of_charge)/.test(t.entity_id)))?.entity_id;return{solar:i(/solar|pv/),grid:i(/grid/),battery:i(/battery_power|battery/),soc:s,home:i(/home_power|house|load|consumption/)}}const ri={solar:{x:150,y:46},grid:{x:46,y:150},home:{x:254,y:150},battery:{x:150,y:254}},li={solar:"#E9971D",grid:"#18BCF2",battery:"#2FB57A",home:"var(--text)"};let ci=class extends lt{get cfg(){const t=this.widget.config;return t.solar||t.grid||t.battery?t:{...ai(this.ctx.hass),...t}}edge(t,e,i,s,n){const o=Math.abs(s??0),a=`M${e.x} ${e.y} L${i.x} ${i.y}`,r=void 0!==s&&o>=10,l=Math.max(.9,5-1.1*Math.log10(Math.max(o,10))),c=r?Math.min(5,2+Math.floor(Math.log10(o))):0,d=(s??0)<0;return B`<path id=${t} class="line" d=${a}></path>
      ${Array.from({length:c},((e,i)=>B`<circle class="dot" r="4.5" fill=${n} style="filter:drop-shadow(0 0 4px ${n})">
          <animateMotion dur="${l}s" repeatCount="indefinite" begin="${-l/c*i}s"
            keyPoints=${d?"1;0":"0;1"} keyTimes="0;1" calcMode="linear">
            <mpath href="#${t}"></mpath>
          </animateMotion>
        </circle>`))}`}node(t,e,i,s,n){const o=ri[t],a=li[t];return B`<g>
      <circle class="node" cx=${o.x} cy=${o.y} r="38" stroke=${a}></circle>
      <foreignObject x=${o.x-13} y=${o.y-30} width="26" height="26">
        <sn-icon .icon=${e} style="--icon-size:26px;color:${"var(--text)"===a?"var(--text-2)":a}"></sn-icon>
      </foreignObject>
      <text class="val" x=${o.x} y=${o.y+13}>${s}</text>
      <text class="lbl" x=${o.x} y=${o.y+54}>${n?`${i} · ${n}`:i}</text>
    </g>`}render(){const{ctx:t}=this,{hass:e,t:i}=t,s=this.cfg,n=oi(e,s.solar);let o=oi(e,s.grid),a=oi(e,s.battery);void 0!==o&&s.flip_grid&&(o=-o),void 0!==a&&s.flip_battery&&(a=-a);const r=oi(e,s.home)??(n??0)+(o??0)-(a??0),l=s.soc?e.states[s.soc]?.state:void 0,c=e=>void 0===e?"–":Xt(Math.abs(e)>=1e3?`${Yt(Math.abs(e)/1e3,t.lang,1)} kW`:`${Yt(Math.abs(e),t.lang,0)} W`);return F`<div class="wrap glass">
      <svg viewBox="0 0 300 310" role="img" aria-label=${i("widget_energy")}>
        ${s.solar?this.edge("e-solar",ri.solar,ri.home,n,li.solar):W}
        ${s.grid?this.edge("e-grid",ri.grid,ri.home,o,li.grid):W}
        ${s.battery?this.edge("e-bat",ri.battery,ri.home,void 0===a?void 0:-a,li.battery):W}
        ${s.solar?this.node("solar","solar",i("e_solar"),c(n)):W}
        ${s.grid?this.node("grid","tower",i("e_grid"),c(o)):W}
        ${s.battery?this.node("battery","battery",i("e_battery"),c(a),l&&!Number.isNaN(Number(l))?Xt(`${Math.round(Number(l))}%`):void 0):W}
        ${this.node("home","home",i("e_home"),c(r))}
      </svg>
    </div>`}};ci.styles=[Ve,a`
      :host {
        display: block;
        height: 100%;
      }
      .wrap {
        height: 100%;
        border-radius: var(--r-lg);
        padding: 12px;
        display: grid;
        grid-template-rows: minmax(0, 1fr);
        overflow: hidden;
      }
      svg {
        width: 100%;
        height: 100%;
        min-height: 0;
        direction: ltr;
        overflow: visible;
      }
      .node {
        fill: var(--surface-solid);
        stroke-width: 3;
      }
      .val {
        font: 700 15px var(--font);
        fill: var(--text);
        text-anchor: middle;
      }
      .lbl {
        font: 500 11px var(--font);
        fill: var(--text-2);
        text-anchor: middle;
      }
      .line {
        fill: none;
        stroke: var(--border);
        stroke-width: 4;
        stroke-linecap: round;
      }
      @media (prefers-reduced-motion: reduce) {
        .dot {
          display: none;
        }
      }
    `],ni([ut({attribute:!1})],ci.prototype,"ctx",2),ni([ut({attribute:!1})],ci.prototype,"widget",2),ci=ni([dt("sn-w-energy")],ci);var di=Object.defineProperty,pi=Object.getOwnPropertyDescriptor,hi=(t,e,i,s)=>{for(var n,o=s>1?void 0:s?pi(e,i):e,a=t.length-1;a>=0;a--)(n=t[a])&&(o=(s?n(e,i,o):n(o))||o);return s&&o&&di(e,i,o),o};const ui=[{key:"main_brush_time_left",label:"main_brush",life:300},{key:"side_brush_time_left",label:"side_brush",life:200},{key:"filter_time_left",label:"filter",life:150},{key:"sensor_time_left",label:"sensors_part",life:30}];function gi(t,e){const i={parts:{}},s=t.entities?.[e]?.device_id;if(!s)return i;for(const n of Object.values(t.entities??{})){if(n.device_id!==s)continue;const[t,e]=n.entity_id.split("."),o=n.translation_key??e;if("image"!==t||i.map){if("select"===t&&/mop_intensity|water_box/.test(o))i.mop=n.entity_id;else if("sensor"===t&&/cleaning_area$/.test(o))i.area=n.entity_id;else if("sensor"===t&&/cleaning_time$/.test(o))i.time=n.entity_id;else if("button"===t&&/empty/.test(o))i.empty=n.entity_id;else if("sensor"===t)for(const s of ui)o.endsWith(s.key)&&(i.parts[s.key]=n.entity_id)}else i.map=n.entity_id}return i}function mi(t){const e=Number(t?.state);if(!t||Number.isNaN(e))return;const i=t.attributes.unit_of_measurement;return"s"===i?e/3600:"min"===i?e/60:"d"===i?24*e:e}let fi=class extends lt{constructor(){super(...arguments),this.compact=!1,this.rooms=[],this.method="segments",this.picked=[],this.passes=1,this.bust=Date.now()}connectedCallback(){super.connectedCallback(),this.loadRooms(),this.timer=window.setInterval((()=>this.bust=Date.now()),5e3)}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this.timer)}get entity(){return this.widget.config.entity??""}async loadRooms(){const{hass:t}=this.ctx;try{const e=await t.callWS({type:"call_service",domain:"roborock",service:"get_maps",target:{entity_id:this.entity},return_response:!0}),i=e.response?.[this.entity]?.maps??[],s=Object.entries(i[0]?.rooms??{}).map((([t,e])=>({id:t,name:e})));if(s.length)return this.method="segments",void(this.rooms=s)}catch{}this.method="areas",this.rooms=Object.values(t.areas??{}).map((t=>({id:t.area_id,name:t.name}))).sort(((t,e)=>t.name.localeCompare(e.name)))}toggleRoom(t){navigator.vibrate?.(5),this.picked=this.picked.includes(t)?this.picked.filter((e=>e!==t)):[...this.picked,t]}call(t,e,i={}){return navigator.vibrate?.(8),this.ctx.hass.callService(t,e,{entity_id:this.entity,...i}).catch((()=>this.ctx.toast(this.ctx.t("error"))))}start(){return this.picked.length?"segments"===this.method?this.call("vacuum","send_command",{command:"app_segment_clean",params:[{segments:this.picked.map(Number),repeat:this.passes}]}):this.call("vacuum","clean_area",{cleaning_area_id:this.picked}):this.call("vacuum","start")}label(t,e){const i=`${t}_${e}`;return St(i)?this.ctx.t(i):e.replace(/_/g," ")}render(){const{ctx:t}=this,{t:e,hass:i}=t,s=i.states[this.entity];if(!s)return F`<div class="wrap glass"><span class="muted">${e("unavailable")}</span></div>`;const n=gi(i,this.entity),o="cleaning"===s.state,a=s.attributes.battery_level??Number(i.states[`sensor.${this.entity.split(".")[1]}_battery`]?.state),r=n.map?i.states[n.map]:void 0,l=r?.attributes.entity_picture?i.hassUrl(`${r.attributes.entity_picture}${r.attributes.entity_picture.includes("?")?"&":"?"}t=${o?this.bust:Math.floor(this.bust/6e4)}`):void 0,c=s.attributes.fan_speed_list??[],d=n.mop?i.states[n.mop]:void 0,p=(s,n,o)=>{const a=s?i.states[s]:void 0;return a&&"unknown"!==a.state&&"unavailable"!==a.state?F`<span class="stat"><sn-icon .icon=${n}></sn-icon>${e(o)} ${Gt(e,a,t.lang)}</span>`:W},h=F`<div class="col">
      <div class="head">
        <span class="ic ${o?"on":""}"><sn-icon icon="robot-vacuum"></sn-icon></span>
        <div>
          <div class="name">${Rt(i,t.config,this.entity)}</div>
          <div class="state">${Gt(e,s,t.lang)}</div>
        </div>
      </div>
      <div class="stats">
        ${"number"!=typeof a||Number.isNaN(a)?W:F`<span class="stat"><sn-icon icon="battery"></sn-icon>${Xt(`${a}%`)}</span>`}
        ${p(n.area,"rooms","cleaned_area")} ${p(n.time,"clock-outline","clean_time")}
      </div>
      ${l?F`<div class="map"><img src=${l} alt="" /></div>`:W}
    </div>`,u=F`<div class="col">
      <h3>${e("rooms")}</h3>
      ${this.rooms.length?F`<div class="rooms">
            ${this.rooms.map((t=>{const e=this.picked.indexOf(t.id);return F`<button class="room pressable" aria-pressed=${e>=0} @click=${()=>this.toggleRoom(t.id)}>
                ${t.name}${e>=0?F`<span class="order">${e+1}</span>`:W}
              </button>`}))}
          </div>`:F`<span class="muted">${e("no_rooms")}</span>`}
      <div class="opts">
        ${c.length?F`<div class="opt">
              ${e("suction")}
              <div class="seg">
                ${c.map((t=>F`<button aria-pressed=${s.attributes.fan_speed===t} @click=${()=>this.call("vacuum","set_fan_speed",{fan_speed:t})}>
                    ${this.label("fan",t)}
                  </button>`))}
              </div>
            </div>`:W}
        ${d?.attributes.options?.length?F`<div class="opt">
              ${e("mop")}
              <div class="seg">
                ${d.attributes.options.map((i=>F`<button
                    aria-pressed=${d.state===i}
                    @click=${()=>this.ctx.hass.callService("select","select_option",{entity_id:n.mop,option:i}).catch((()=>t.toast(e("error"))))}
                  >
                    ${this.label("mop",i)}
                  </button>`))}
              </div>
            </div>`:W}
        ${"segments"===this.method&&this.picked.length?F`<div class="opt">
              ${e("passes")}
              <div class="seg">
                ${[1,2,3].map((t=>F`<button aria-pressed=${this.passes===t} @click=${()=>this.passes=t}>${Xt(`×${t}`)}</button>`))}
              </div>
            </div>`:W}
      </div>
      <div class="actions">
        ${o?F`<button class="btn primary pressable go" @click=${()=>this.call("vacuum","pause")}><sn-icon icon="pause"></sn-icon>${e("pause")}</button>`:F`<button class="btn primary pressable go" @click=${()=>this.start()}>
              <sn-icon icon="play"></sn-icon>${this.picked.length?1===this.picked.length?e("clean_rooms_1"):e("clean_rooms_n",{n:this.picked.length}):e("clean_all")}
            </button>`}
        <button class="btn pressable" @click=${()=>this.call("vacuum","return_to_base")}><sn-icon icon="home"></sn-icon>${e("return_home")}</button>
        <button class="btn pressable" @click=${()=>this.call("vacuum","locate")}><sn-icon icon="locate"></sn-icon>${e("locate")}</button>
        ${n.empty?F`<button class="btn pressable" @click=${()=>this.ctx.hass.callService("button","press",{entity_id:n.empty}).catch((()=>t.toast(e("error"))))}>
              <sn-icon icon="delete"></sn-icon>${e("empty_bin")}
            </button>`:W}
      </div>
      ${Object.keys(n.parts).length?F`<h3>${e("parts")}</h3>
            ${ui.filter((t=>n.parts[t.key])).map((s=>{const o=mi(i.states[n.parts[s.key]]);if(void 0===o)return W;const a=Math.max(0,Math.min(100,Math.round(o/s.life*100)));return F`<div class="part">
                <span>${e(s.label)}</span><span class="muted">${e("hours_left",{n:Xt(Yt(o,t.lang,0))})}</span>
                <div class="bar ${a<15?"low":""}"><span style="width:${a}%"></span></div>
              </div>`}))}`:W}
    </div>`;return F`<div class="wrap ${this.compact?"":"glass"}">${h}${u}</div>`}};fi.styles=[Ve,a`
      :host {
        display: block;
        height: 100%;
      }
      .wrap {
        height: 100%;
        border-radius: var(--r-lg);
        padding: 18px;
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
        gap: 18px;
        overflow: auto;
      }
      :host([compact]) .wrap {
        grid-template-columns: 1fr;
        padding: 0;
        background: none;
        border: 0;
        box-shadow: none;
        backdrop-filter: none;
      }
      .col {
        display: grid;
        gap: 14px;
        align-content: start;
        min-width: 0;
      }
      .head {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .head .ic {
        display: grid;
        place-items: center;
        width: 52px;
        height: 52px;
        border-radius: 999px;
        background: var(--surface-2);
        color: var(--text-2);
        --icon-size: 28px;
        flex: none;
      }
      .head .ic.on {
        background: var(--accent);
        color: var(--on-accent);
        animation: spin 4s linear infinite;
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
      .head .name {
        font-weight: 700;
        font-size: 18px;
      }
      .head .state {
        color: var(--text-2);
        font-size: 14px;
        unicode-bidi: plaintext;
      }
      .stats {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .stat {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        border-radius: 999px;
        background: var(--surface-2);
        font-size: 14px;
        font-weight: 500;
        unicode-bidi: plaintext;
        --icon-size: 16px;
      }
      .map {
        border-radius: var(--r-md);
        overflow: hidden;
        background: var(--surface-2);
        aspect-ratio: 4 / 3;
        display: grid;
        place-items: center;
      }
      .map img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      h3 {
        margin: 0;
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--text-2);
      }
      .rooms {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .room {
        position: relative;
        min-height: 44px;
        padding: 0 16px;
        border-radius: 999px;
        background: var(--surface-2);
        font-weight: 500;
        transition: background-color var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out);
      }
      .room[aria-pressed="true"] {
        background: var(--accent);
        color: var(--on-accent);
        padding-inline-end: 36px;
      }
      .order {
        position: absolute;
        inset-inline-end: 8px;
        top: 50%;
        transform: translateY(-50%);
        width: 22px;
        height: 22px;
        border-radius: 999px;
        background: var(--on-accent);
        color: var(--accent);
        display: grid;
        place-items: center;
        font-size: 12px;
        font-weight: 700;
        animation: pop 300ms var(--spring);
      }
      @keyframes pop {
        from {
          transform: translateY(-50%) scale(0);
        }
      }
      .opts {
        display: grid;
        gap: 10px;
      }
      .opt {
        display: grid;
        gap: 6px;
        font-size: 13px;
        color: var(--text-2);
        font-weight: 500;
      }
      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .actions .go {
        flex: 1 1 100%;
        min-height: 52px;
        font-size: 16px;
      }
      .part {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 4px 10px;
        font-size: 14px;
      }
      .bar {
        grid-column: 1 / -1;
        height: 6px;
        border-radius: 3px;
        background: var(--surface-2);
        overflow: hidden;
      }
      .bar > span {
        display: block;
        height: 100%;
        background: var(--success);
        border-radius: 3px;
      }
      .bar.low > span {
        background: var(--alert);
      }
      .muted {
        font-size: 14px;
      }
      @media (max-width: 760px) {
        .wrap {
          grid-template-columns: 1fr;
        }
      }
    `],hi([ut({attribute:!1})],fi.prototype,"ctx",2),hi([ut({attribute:!1})],fi.prototype,"widget",2),hi([ut({type:Boolean,reflect:!0})],fi.prototype,"compact",2),hi([gt()],fi.prototype,"rooms",2),hi([gt()],fi.prototype,"method",2),hi([gt()],fi.prototype,"picked",2),hi([gt()],fi.prototype,"passes",2),hi([gt()],fi.prototype,"bust",2),fi=hi([dt("sn-w-vacuum")],fi);const bi=(t,e,i,s,n=!1)=>F`<section
  style="display:grid;gap:8px;padding:14px 16px;border-radius:var(--r-md);background:var(--surface-2)"
>
  <div style="display:flex;align-items:center;gap:8px;font-weight:700">
    <sn-icon icon=${e?"check-circle":"alert-circle-outline"} style="--icon-size:20px;color:${e?"var(--success)":"var(--alert-text)"}"></sn-icon>
    ${t}
  </div>
  ${e&&!n?F`<span class="muted" style="font-size:14px">${s}</span>`:i}
</section>`,vi=t=>F`<div style="display:grid;gap:4px;font-size:14px">${t}</div>`,_i=(t,e)=>F`<div style="display:flex;justify-content:space-between;gap:12px"><span>${t}</span><span class="muted" style="unicode-bidi:plaintext">${e}</span></div>`,yi=(t,e)=>t.find((t=>t.entity_id.startsWith("sensor.")&&e.test(t.entity_id)));var xi=Object.defineProperty,wi=Object.getOwnPropertyDescriptor,$i=(t,e,i,s)=>{for(var n,o=s>1?void 0:s?wi(e,i):e,a=t.length-1;a>=0;a--)(n=t[a])&&(o=(s?n(e,i,o):n(o))||o);return s&&o&&xi(e,i,o),o};let ki=class extends lt{constructor(){super(...arguments),this.filter={},this.q=""}firstUpdated(){this.renderRoot.querySelector("input")?.focus()}render(){const{ctx:t}=this,e=this.q.trim().toLowerCase(),i=ee(t.hass,t.config,this.filter).filter((t=>!e||t.name.toLowerCase().includes(e)||t.id.includes(e))).slice(0,200);return F`
      <input type="search" placeholder=${t.t("search")} .value=${this.q} @input=${t=>this.q=t.target.value} />
      ${i.length?F`<ul>
            ${i.map((e=>F`<li>
                <button class="pressable" @click=${()=>this.onPick(e.id)}>
                  <span class="ic"><sn-icon .icon=${Ut(e.entity,e.id)} style="--icon-size:20px"></sn-icon></span>
                  <span class="grow"><span class="name">${e.name}</span><span class="id ltr">${e.id}</span></span>
                  <span class="state">${Gt(t.t,e.entity,t.lang)}</span>
                </button>
              </li>`))}
          </ul>`:F`<div class="empty">${t.t("no_entities")}</div>`}
    `}};ki.styles=[Ve,a`
      :host {
        display: grid;
        gap: 12px;
      }
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 2px;
      }
      li button {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 8px;
        border-radius: var(--r-sm);
        text-align: start;
      }
      li button:hover {
        background: var(--surface-2);
      }
      .ic {
        display: grid;
        place-items: center;
        width: 36px;
        height: 36px;
        border-radius: 999px;
        background: var(--surface-2);
      }
      .name {
        font-weight: 500;
      }
      .id {
        font-family: "JetBrains Mono", ui-monospace, Menlo, monospace;
        font-size: 12px;
        color: var(--text-2);
      }
      .grow {
        flex: 1;
        min-width: 0;
        display: grid;
      }
      .grow > * {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .state {
        unicode-bidi: plaintext;
        font-size: 13px;
        color: var(--text-2);
      }
      .empty {
        padding: 24px;
        text-align: center;
        color: var(--text-2);
      }
    `],$i([ut({attribute:!1})],ki.prototype,"ctx",2),$i([ut({attribute:!1})],ki.prototype,"filter",2),$i([ut({attribute:!1})],ki.prototype,"onPick",2),$i([gt()],ki.prototype,"q",2),ki=$i([dt("sn-entity-picker")],ki);const Ci=(...t)=>F`<div style="display:grid;gap:18px">${t}</div>`,Ai=(...t)=>F`<div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">${t}</div>`,Hi=(t,...e)=>F`<section style="display:grid;gap:12px;padding-top:6px">
    <h3 style="margin:0;font-size:13px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--text-2)">${t}</h3>
    ${e}
  </section>`;function Mi(t,e,i,s,n,o=!1){const a=i?t.hass.states[i]:void 0;return F`<div class="field">
    ${e}
    <div style="display:flex;gap:8px">
      <button
        class="btn pressable"
        style="flex:1;justify-content:flex-start;border-radius:var(--r-sm)"
        @click=${()=>t.showSheet({title:e,render:t=>F`<sn-entity-picker
              .ctx=${t}
              .filter=${s}
              .onPick=${e=>{n(e),t.closeSheet()}}
            ></sn-entity-picker>`})}
      >
        ${i?F`<sn-icon .icon=${Ut(a,i)} style="--icon-size:20px"></sn-icon>${Rt(t.hass,t.config,i)}`:F`<span class="muted">${t.t(o?"none":"choose_entity")}</span>`}
      </button>
      ${o&&i?F`<button class="icon-btn pressable" aria-label=${t.t("delete")} @click=${()=>n(void 0)}>
            <sn-icon icon="close" style="--icon-size:18px"></sn-icon>
          </button>`:W}
    </div>
  </div>`}const Vi={camera:{domains:["camera"]},vacuum:{domains:["vacuum"]}};function Li(t,e,i){t.update((t=>{const s=fe(t,e);s&&i(s,t)}))}function Si(t,e,i){t.showSheet({title:t.t("widget_settings"),render:t=>{const e=fe(t.config,i);if(!e)return F``;const s=t.t;switch(e.type){case"tile":case"camera":case"vacuum":return Ci(Mi(t,s("entity"),e.config.entity,Vi[e.type]??{},(e=>Li(t,i,(t=>t.config.entity=e)))),e.config.entity?function(t,e){return F`<label class="field"
    >${t.t("display_name")}
    <input
      type="text"
      .value=${t.config.names[e]??""}
      placeholder=${t.hass.states[e]?.attributes.friendly_name??e}
      @change=${i=>t.update((t=>{const s=i.target.value.trim();s?t.names[e]=s:delete t.names[e]}))}
    />
    <span class="hint">${t.t("display_name_hint")}</span>
  </label>`}(t,e.config.entity):W);case"energy":{const n=ai(t.hass),o=(o,a,r)=>Mi(t,s(a),e.config[o]??n[o],{domains:["sensor"],deviceClasses:r},(e=>Li(t,i,(t=>t.config[o]=e))),!0),a=n=>F`<div class="field">${s("e_flip")} ${Ei(t,!!e.config[n],(e=>Li(t,i,(t=>t.config[n]=e))))}</div>`;return Ci(o("solar","e_solar_entity",["power"]),o("grid","e_grid_entity",["power"]),a("flip_grid"),o("battery","e_battery_entity",["power"]),a("flip_battery"),o("soc","e_soc_entity",["battery"]),o("home","e_home_entity",["power"]))}case"heading":return F`<label class="field"
            >${s("heading_text")}
            <input type="text" .value=${e.config.text??""} @change=${e=>Li(t,i,(t=>t.config.text=e.target.value))} />
          </label>`;case"floorplan":return Ci(F`<div class="field">
              ${s("plan_in_dark")}
              <div class="seg">
                ${[!1,!0].map((n=>F`<button aria-pressed=${!!e.config.invert_dark===n} @click=${()=>Li(t,i,(t=>t.config.invert_dark=n))}>
                    ${s(n?"plan_invert":"plan_original")}
                  </button>`))}
              </div>
            </div>`,F`<p class="muted" style="margin:0;font-size:14px">${s("drag_hint")}</p>`);default:return F`<p class="muted">${s(`widget_${e.type}`)}</p>`}}})}const zi=[{type:"tile",icon:"lightbulb"},{type:"floorplan",icon:"layers"},{type:"camera",icon:"cctv"},{type:"modes",icon:"leave"},{type:"vacuum",icon:"robot-vacuum"},{type:"visitors",icon:"doorbell"},{type:"energy",icon:"solar"},{type:"clock",icon:"clock-outline"},{type:"heading",icon:"title"}];function Pi(t,e,i){const s=(t,i)=>t.update((t=>{const s=t.pages.findIndex((t=>t.id===e));s>=0&&i(t,s)}));t.showSheet({title:t.t("page_settings"),render:t=>{const n=t.config.pages.findIndex((t=>t.id===e)),o=t.config.pages[n];if(!o)return F``;const a=t.t,r=e=>s(t,((t,i)=>{const s=i+e;s<0||s>=t.pages.length||([t.pages[i],t.pages[s]]=[t.pages[s],t.pages[i]])}));return Ci(F`<label class="field"
          >${a("page_title")}
          <input type="text" .value=${o.title} @change=${e=>s(t,((t,i)=>t.pages[i].title=e.target.value.trim()||o.title))} />
        </label>`,F`<div class="field">
          ${a("page_icon")}
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(48px,1fr));gap:6px">
            ${Dt.map((e=>F`<button
                class="icon-btn pressable ${o.icon===e?"primary":""}"
                style="width:100%;border-radius:var(--r-sm)"
                aria-pressed=${o.icon===e}
                @click=${()=>s(t,((t,i)=>t.pages[i].icon=e))}
              >
                <sn-icon .icon=${e}></sn-icon>
              </button>`))}
          </div>
        </div>`,Ai(F`<button class="btn pressable" ?disabled=${0===n} @click=${()=>r(-1)}>${a("move_earlier")}</button>`,F`<button class="btn pressable" ?disabled=${n===t.config.pages.length-1} @click=${()=>r(1)}>${a("move_later")}</button>`,F`<span style="flex:1"></span>`,F`<button
            class="btn danger pressable"
            ?disabled=${t.config.pages.length<=1}
            @click=${()=>{confirm(a("delete_confirm"))&&(s(t,((t,i)=>{t.pages.splice(i,1),t.settings.default_page===e&&(t.settings.default_page=t.pages[0]?.id??"")})),t.closeSheet(),i())}}
          >
            <sn-icon icon="delete" style="--icon-size:20px"></sn-icon>${a("delete")}
          </button>`))}})}function Ei(t,e,i){return F`<div class="seg">
    ${[!0,!1].map((s=>F`<button aria-pressed=${e===s} @click=${()=>i(s)}>${t.t(s?"on":"off")}</button>`))}
  </div>`}function Di(t,e,i,s,n){return F`<label class="field"
    >${t}
    <input type="number" min=${i} max=${s} .value=${String(e)} @change=${t=>n(Math.min(s,Math.max(i,Number(t.target.value)||0)))} />
  </label>`}const Oi=[se,"#18BCF2","#2FB57A","#F26B68","#A78BFA","#F5BE6A"],Ti=[{id:"schedule",label:"theme_schedule"},{id:"auto",label:"theme_auto"},{id:"light",label:"theme_light"},{id:"dark",label:"theme_dark"}];function ji(t,e){t.showSheet({title:t.t("settings"),render:t=>{const i=t.config.settings,s=t.t,n=e=>t.update(e);return Ci(F`<button class="btn pressable" style="justify-self:stretch" @click=${()=>function(t){t.showSheet({title:t.t("health"),render:t=>{const{hass:e,t:i,config:s}=t,n=Object.values(e.states),o=i("h_all_good"),a=new Set(Je(s)),r=n.filter((t=>"unavailable"===t.state&&a.has(t.entity_id))).sort(((t,e)=>t.last_changed.localeCompare(e.last_changed))),l=n.filter((t=>{if("battery"!==t.attributes.device_class)return!1;if("binary_sensor"===Nt(t.entity_id))return"on"===t.state;const e=Number(t.state);return"sensor"===Nt(t.entity_id)&&!Number.isNaN(e)&&e<20})).sort(((t,e)=>Number(t.state)-Number(e.state))),c=n.find((t=>/backup_last_successful_automatic_backup$/.test(t.entity_id))),d=c?Date.parse(c.state):NaN,p=Number.isNaN(d)?void 0:Math.floor((Date.now()-d)/864e5),h=n.filter((t=>"update"===Nt(t.entity_id)&&"on"===t.state)),u=yi(n,/disk_use_percent|disk_usage/),g=yi(n,/processor_temperature|cpu_temperature/),m=yi(n,/memory_use_percent|memory_usage/),f=[u&&_i(i("h_disk"),Xt(`${Yt(Number(u.state),t.lang,0)}%`)),g&&_i(i("h_cpu_temp"),Xt(`${Yt(Number(g.state),t.lang,0)}°`)),m&&_i(i("h_memory"),Xt(`${Yt(Number(m.state),t.lang,0)}%`))].filter(Boolean),b=u&&Number(u.state)>85||g&&Number(g.state)>75,v=[...a].filter((t=>"vacuum"===Nt(t)&&e.states[t])),_=v.flatMap((t=>{const n=gi(e,t);return ui.filter((t=>n.parts[t.key])).flatMap((o=>{const a=mi(e.states[n.parts[o.key]]);return void 0!==a&&a/o.life<.15?[{robot:Rt(e,s,t),part:i(o.label),h:a}]:[]}))})),y=Oe(e).map((t=>{const i=Object.values(e.entities??{}).filter((e=>e.device_id===t.deviceId)),s=t=>t.translation_key??t.entity_id.split(".")[1],n=i.find((t=>t.entity_id.startsWith("sensor.")&&/battery/.test(s(t)))),o=i.find((t=>t.entity_id.startsWith("binary_sensor.")&&/plugged/.test(s(t)))),a=i.find((t=>t.entity_id.startsWith("button.")&&/load_start_url|restart_browser/.test(s(t))));return{tab:t,battery:n&&e.states[n.entity_id],plugged:o&&e.states[o.entity_id],reload:a?.entity_id}}));return F`<div style="display:grid;gap:12px">
        ${bi(i("h_offline"),!r.length,vi(r.map((t=>_i(Rt(e,s,t.entity_id),Qt(i,t.last_changed))))),o)}
        ${bi(i("h_battery"),!l.length,vi(l.map((t=>_i(Rt(e,s,t.entity_id),"sensor"===Nt(t.entity_id)?Xt(`${t.state}%`):"!")))),o)}
        ${c?bi(i("h_backup"),void 0!==p&&p<=7,vi([_i(i("h_backup"),void 0===p?"–":i("h_days_ago",{n:p}))]),0===p?i("today"):i("h_days_ago",{n:p??0})):bi(i("h_backup"),!1,F`<span class="muted" style="font-size:14px">${i("h_backup_missing")}</span>`,"")}
        ${bi(i("h_updates"),!h.length,vi(h.map((t=>_i(t.attributes.title??t.attributes.friendly_name??t.entity_id,t.attributes.latest_version??"")))),o)}
        ${f.length?bi(i("h_system"),!b,vi(f),"",!0):W}
        ${v.length?bi(i("h_robot_parts"),!_.length,vi(_.map((e=>_i(`${e.robot} · ${e.part}`,i("hours_left",{n:Xt(Yt(e.h,t.lang,0))}))))),o):W}
        ${y.length?F`<section style="display:grid;gap:8px;padding:14px 16px;border-radius:var(--r-md);background:var(--surface-2)">
              <div style="font-weight:700">${i("h_tablets")}</div>
              ${y.map((s=>F`<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
                  <strong style="flex:1">${s.tab.name}</strong>
                  ${s.battery?F`<span class="muted ltr">${s.battery.state}%</span>`:W}
                  ${s.plugged?F`<span class="muted">${i("on"===s.plugged.state?"h_charging":"h_not_charging")}</span>`:W}
                  ${s.reload?F`<button class="btn pressable" @click=${()=>e.callService("button","press",{entity_id:s.reload}).then((()=>t.toast(i("done")))).catch((()=>t.toast(i("error"))))}>
                        ${i("h_reload")}
                      </button>`:W}
                </div>`))}
            </section>`:W}
        <p class="muted" style="margin:4px 0 0;font-size:13px">${i("h_telegram")}</p>
      </div>`}})}(t)}>
          <sn-icon icon="gauge" style="--icon-size:20px"></sn-icon>${s("health")}
        </button>`,F`<label class="field"
          >${s("home_name")}
          <input
            type="text"
            .value=${i.home_name}
            placeholder=${t.hass.config?.location_name??""}
            @change=${t=>n((e=>e.settings.home_name=t.target.value.trim()))}
          />
        </label>`,F`<div class="field">
          ${s("language")}
          <div class="seg">
            ${Mt.map((t=>F`<button aria-pressed=${i.language===t.id} @click=${()=>n((e=>e.settings.language=t.id))}>${t.label}</button>`))}
          </div>
        </div>`,F`<div class="field">
          ${s("theme")}
          <div class="seg">
            ${Ti.map((t=>F`<button aria-pressed=${i.theme===t.id} @click=${()=>n((e=>e.settings.theme=t.id))}>${s(t.label)}</button>`))}
          </div>
          ${"schedule"===i.theme?Ai(F`<span>${s("dark_from")}</span>`,F`<input type="time" style="width:auto" .value=${i.dark_from} @change=${t=>n((e=>e.settings.dark_from=t.target.value))} />`,F`<span>${s("dark_to")}</span>`,F`<input type="time" style="width:auto" .value=${i.dark_to} @change=${t=>n((e=>e.settings.dark_to=t.target.value))} />`):W}
        </div>`,F`<div class="field">
          ${s("accent")}
          ${Ai(...Oi.map((t=>F`<button
                class="pressable"
                aria-label=${t}
                aria-pressed=${i.accent.toUpperCase()===t}
                style="width:40px;height:40px;border-radius:999px;background:${t};box-shadow:${i.accent.toUpperCase()===t?"0 0 0 3px var(--surface-solid), 0 0 0 5px "+t:"none"}"
                @click=${()=>n((e=>e.settings.accent=t))}
              ></button>`)),F`<input
              type="color"
              aria-label=${s("accent")}
              .value=${i.accent}
              style="width:40px;height:40px;border:0;padding:0;background:none;border-radius:999px"
              @change=${t=>n((e=>e.settings.accent=t.target.value.toUpperCase()))}
            />`)}
        </div>`,F`<label class="field"
          >${s("default_page")}
          <select @change=${t=>n((e=>e.settings.default_page=t.target.value))}>
            ${t.config.pages.map((t=>F`<option value=${t.id} ?selected=${i.default_page===t.id}>${t.title}</option>`))}
          </select>
        </label>`,Hi(s("screensaver"),F`<div class="seg">
            ${[!0,!1].map((t=>F`<button aria-pressed=${i.screensaver.enabled===t} @click=${()=>n((e=>e.settings.screensaver.enabled=t))}>
                ${s(t?"on":"off")}
              </button>`))}
          </div>`,i.screensaver.enabled?F`<label class="field"
                  >${s("screensaver_after")}
                  <input
                    type="number"
                    min="1"
                    max="120"
                    .value=${String(i.screensaver.timeout_min)}
                    @change=${t=>n((e=>e.settings.screensaver.timeout_min=Math.max(1,Number(t.target.value)||5)))}
                  />
                </label>
                ${Mi(t,s("temp_entity"),i.screensaver.temp_entity,{domains:["sensor","climate","weather"]},(t=>n((e=>e.settings.screensaver.temp_entity=t))),!0)}
                <div class="field">${s("photos")} ${Ei(t,i.screensaver.photos,(t=>n((e=>e.settings.screensaver.photos=t))))}</div>
                ${i.screensaver.photos?F`<label class="field"
                        >${s("photo_folder")}
                        <input
                          type="text"
                          class="ltr"
                          .value=${i.screensaver.photo_folder}
                          @change=${t=>n((e=>e.settings.screensaver.photo_folder=t.target.value.trim().replace(/^\/+|\/+$/g,"")||"smartnest-photos"))}
                        />
                        <span class="hint">${s("photos_hint",{folder:i.screensaver.photo_folder})}</span>
                      </label>
                      ${Di(s("photo_seconds"),i.screensaver.photo_seconds,5,600,(t=>n((e=>e.settings.screensaver.photo_seconds=t))))}`:W}`:W),Hi(s("greet_morning")+" ☀️",F`<label class="field"
            >${s("greeting_name")}
            <input
              type="text"
              .value=${i.greeting_name}
              placeholder=${t.hass.user?.name??""}
              @change=${t=>n((e=>e.settings.greeting_name=t.target.value.trim()))}
            />
            <span class="hint">${s("greeting_name_hint")}</span>
          </label>`,F`<div class="field">${s("prayer")} ${Ei(t,i.prayer,(t=>n((e=>e.settings.prayer=t))))}</div>`,F`<div class="field">${s("morning_summary")} ${Ei(t,i.morning,(t=>n((e=>e.settings.morning=t))))}</div>`),Hi(s("status_bar"),F`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px">
            ${Ge.map((t=>{const e=!i.chips_hidden.includes(t.id);return F`<button
                class="btn pressable ${e?"primary":""}"
                style="justify-content:flex-start;font-weight:500"
                aria-pressed=${e}
                @click=${()=>n((i=>{const s=new Set(i.settings.chips_hidden);e?s.add(t.id):s.delete(t.id),i.settings.chips_hidden=[...s]}))}
              >
                <sn-icon icon=${e?"check":"close"} style="--icon-size:18px"></sn-icon>${s(t.label)}
              </button>`}))}
          </div>`,Mi(t,s("power_entity"),i.power_entity,{domains:["sensor"],deviceClasses:["power"]},(t=>n((e=>e.settings.power_entity=t))),!0)),Hi(s("weather"),Mi(t,s("weather_entity"),i.weather.entity,{domains:["weather"]},(t=>n((e=>e.settings.weather.entity=t))),!0),F`<div class="field">${s("weather_bg")} ${Ei(t,i.weather.background,(t=>n((e=>e.settings.weather.background=t))))}</div>`),function(t,e){const i=t.t,s=t.config.settings.fully,n=Oe(t.hass);if(!n.length)return Hi(i("tablet"),F`<p class="muted" style="margin:0;font-size:14px">${i("tablet_none")}</p>`);const o=Te(t.hass);return Hi(i("tablet"),F`<p class="muted" style="margin:0;font-size:14px">
      ${i("tablet_found",{names:n.map((t=>t.name)).join("ar"===t.lang?"، ":", ")})} ·
      ${o?F`<strong style="color:var(--success)">✓ ${i("tablet_this")}</strong>`:i("tablet_not_this")}
    </p>`,window.fully?W:F`<p class="muted" style="margin:0;font-size:13px">${i("tablet_js_hint")}</p>`,F`<div class="field">${i("night_dim")} ${Ei(t,s.night_dim,(t=>e((e=>e.settings.fully.night_dim=t))))}</div>`,s.night_dim?F`${Di(i("night_brightness"),s.night_brightness,1,100,(t=>e((e=>e.settings.fully.night_brightness=t))))}
        ${Di(i("night_off"),s.night_off_min,0,240,(t=>e((e=>e.settings.fully.night_off_min=t))))}`:W,F`<div class="field">
      ${i("motion_wake")} ${Ei(t,s.motion_wake,(t=>e((e=>e.settings.fully.motion_wake=t))))}
      <span class="hint">${i("motion_wake_hint")}</span>
    </div>`)}(t,n),Hi(s("doorbell"),Mi(t,s("doorbell_trigger"),i.doorbell.trigger_entity,{domains:["event","binary_sensor"]},(t=>n((e=>e.settings.doorbell.trigger_entity=t))),!0),Mi(t,s("doorbell_camera"),i.doorbell.camera_entity,{domains:["camera"]},(t=>n((e=>e.settings.doorbell.camera_entity=t))),!0),Mi(t,s("doorbell_lock"),i.doorbell.lock_entity,{domains:["lock"]},(t=>n((e=>e.settings.doorbell.lock_entity=t))),!0),Di(s("keep_days"),i.doorbell.keep_days,1,30,(t=>n((e=>e.settings.doorbell.keep_days=t)))),F`<button class="btn pressable" style="justify-self:start" @click=${e.testDoorbell}>
            <sn-icon icon="bell-ring" style="--icon-size:20px"></sn-icon>${s("doorbell_test")}
          </button>`),Hi(s("kiosk"),F`<form
            class="field"
            @submit=${e=>{e.preventDefault();const i=e.currentTarget.querySelector("input"),o=i.value.trim();if(!/^\d{4,8}$/.test(o))return t.toast(s("kiosk_pin_invalid"));const a=Math.random().toString(36).slice(2,10);n((t=>t.settings.kiosk={pin_hash:ze(o,a),pin_salt:a,pin_length:o.length})),i.value="",t.toast(s("kiosk_pin_saved"))}}
          >
            ${s("kiosk_pin")}
            <div style="display:flex;gap:8px">
              <input type="password" inputmode="numeric" pattern="[0-9]*" maxlength="8" autocomplete="off" placeholder="••••" style="flex:1" />
              <button class="btn primary pressable" type="submit">${s(i.kiosk.pin_hash?"kiosk_pin_change":"kiosk_pin_set")}</button>
            </div>
            <span class="hint">${s("kiosk_pin_hint")}</span>
            <span class="hint">${s("kiosk_full_lock")}</span>
          </form>`,i.kiosk.pin_hash?F`<button class="btn pressable" style="justify-self:start" @click=${()=>n((t=>t.settings.kiosk={}))}>
                <sn-icon icon="lock-open" style="--icon-size:20px"></sn-icon>${s("kiosk_remove_pin")}
              </button>`:W),Hi(s("about"),F`<div style="display:flex;align-items:center;gap:14px">
            <img src="${t.assetBase}logo/smartnest-symbol-${t.dark?"white":"color"}.svg" alt="SmartNest" style="width:48px;height:48px" />
            <div style="display:grid;gap:2px">
              <strong>SmartNest</strong>
              <span class="muted" style="font-size:13px">${s("tagline")}</span>
              <span class="muted ltr" style="font-size:12px;font-family:'JetBrains Mono',monospace">${s("version")} ${e.version}</span>
            </div>
          </div>`))}})}var Ii=Object.defineProperty,Ni=Object.getOwnPropertyDescriptor,Ri=(t,e,i,s)=>{for(var n,o=s>1?void 0:s?Ni(e,i):e,a=t.length-1;a>=0;a--)(n=t[a])&&(o=(s?n(e,i,o):n(o))||o);return s&&o&&Ii(e,i,o),o};let Zi=class extends lt{constructor(){super(...arguments),this.sheets=[],this.closing=!1,this.onKey=t=>{"Escape"===t.key&&this.sheets.length&&this.dismiss()}}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this.onKey)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this.onKey)}dismiss(){const t=this.sheets[this.sheets.length-1];1===this.sheets.length?(this.closing=!0,window.setTimeout((()=>{this.closing=!1,t.onClose?.(),this.ctx.closeSheet()}),190)):(t.onClose?.(),this.ctx.closeSheet())}render(){return this.sheets.length?this.sheets.map(((t,e)=>F`
        <div
          class="scrim ${this.closing&&e===this.sheets.length-1?"closing":""}"
          @click=${t=>t.target===t.currentTarget&&e===this.sheets.length-1&&this.dismiss()}
        >
          <div class="sheet" role="dialog" aria-modal="true" aria-label=${t.title??""}>
            <header>
              <h2>${t.title??""}</h2>
              <button class="icon-btn small pressable" aria-label=${this.ctx.t("close")} @click=${()=>this.dismiss()}>
                <sn-icon icon="close" style="--icon-size:20px"></sn-icon>
              </button>
            </header>
            <div class="body">${t.render(this.ctx)}</div>
          </div>
        </div>
      `)):W}};Zi.styles=[Ve,a`
      .scrim {
        position: fixed;
        inset: 0;
        z-index: 50;
        background: var(--scrim);
        -webkit-backdrop-filter: blur(6px);
        backdrop-filter: blur(6px);
        display: grid;
        place-items: center;
        padding: 24px;
        animation: fade var(--dur) var(--ease-out);
      }
      .scrim.closing {
        animation: fade-out var(--dur-fast) var(--ease-in) forwards;
      }
      .sheet {
        position: relative;
        width: min(560px, 100%);
        max-height: min(86vh, 900px);
        display: flex;
        flex-direction: column;
        border-radius: var(--r-xl);
        background: var(--surface-solid);
        color: var(--text);
        box-shadow: var(--shadow-lift);
        overflow: hidden;
        animation: rise 520ms var(--spring);
      }
      .closing .sheet {
        animation: sink var(--dur-fast) var(--ease-in) forwards;
      }
      header {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 18px 20px 6px;
      }
      header h2 {
        flex: 1;
        margin: 0;
        font-size: 20px;
        font-weight: 700;
      }
      .body {
        overflow: auto;
        padding: 12px 20px 24px;
        overscroll-behavior: contain;
      }
      @media (max-width: 600px) {
        .scrim {
          align-items: end;
          padding: 0;
        }
        .sheet {
          width: 100%;
          border-radius: var(--r-xl) var(--r-xl) 0 0;
          max-height: 92vh;
          padding-bottom: env(safe-area-inset-bottom);
        }
        .sheet::before {
          content: "";
          display: block;
          width: 40px;
          height: 5px;
          border-radius: 3px;
          background: var(--surface-2);
          margin: 8px auto 0;
        }
      }
      @keyframes fade {
        from {
          opacity: 0;
        }
      }
      @keyframes fade-out {
        to {
          opacity: 0;
        }
      }
      @keyframes rise {
        from {
          transform: translateY(40px) scale(0.97);
          opacity: 0;
        }
      }
      @keyframes sink {
        to {
          transform: translateY(30px) scale(0.98);
          opacity: 0;
        }
      }
    `],Ri([ut({attribute:!1})],Zi.prototype,"ctx",2),Ri([ut({attribute:!1})],Zi.prototype,"sheets",2),Ri([gt()],Zi.prototype,"closing",2),Zi=Ri([dt("sn-sheet-host")],Zi);const Fi=(t,e,i)=>{const s=new Map;for(let n=e;n<=i;n++)s.set(t[n],n);return s},Bi=ft(class extends bt{constructor(t){if(super(t),t.type!==mt)throw Error("repeat() can only be used in text expressions")}dt(t,e,i){let s;void 0===i?i=e:void 0!==e&&(s=e);const n=[],o=[];let a=0;for(const r of t)n[a]=s?s(r,a):a,o[a]=i(r,a),a++;return{values:o,keys:n}}render(t,e,i){return this.dt(t,e,i).values}update(t,[e,i,s]){const n=t._$AH,{values:o,keys:a}=this.dt(e,i,s);if(!Array.isArray(n))return this.ut=a,o;const r=this.ut??=[],l=[];let c,d,p=0,h=n.length-1,u=0,g=o.length-1;for(;p<=h&&u<=g;)if(null===n[p])p++;else if(null===n[h])h--;else if(r[p]===a[u])l[u]=xt(n[p],o[u]),p++,u++;else if(r[h]===a[g])l[g]=xt(n[h],o[g]),h--,g--;else if(r[p]===a[g])l[g]=xt(n[p],o[g]),yt(t,l[g+1],n[p]),p++,g--;else if(r[h]===a[u])l[u]=xt(n[h],o[u]),yt(t,n[p],n[h]),h--,u++;else if(void 0===c&&(c=Fi(a,u,g),d=Fi(r,p,h)),c.has(r[p]))if(c.has(r[h])){const e=d.get(a[u]),i=void 0!==e?n[e]:null;if(null===i){const e=yt(t,n[p]);xt(e,o[u]),l[u]=e}else l[u]=xt(i,o[u]),yt(t,n[p],i),n[e]=null;u++}else kt(n[h]),h--;else kt(n[p]),p++;for(;u<=g;){const e=yt(t,l[g+1]);xt(e,o[u]),l[u++]=e}for(;p<=h;){const t=n[p++];null!==t&&kt(t)}return this.ut=a,$t(t,l),U}});var Ui=Object.defineProperty,Wi=Object.getOwnPropertyDescriptor,qi=(t,e,i,s)=>{for(var n,o=s>1?void 0:s?Wi(e,i):e,a=t.length-1;a>=0;a--)(n=t[a])&&(o=(s?n(e,i,o):n(o))||o);return s&&o&&Ui(e,i,o),o};let Xi=class extends lt{bind(){const t=this.renderRoot.querySelector(".tile");t&&!this.unbind&&(this.unbind=function(t,e,i){let s,n=null,o=!1;const a=()=>{window.clearTimeout(s),s=void 0},r=t=>{0===t.button&&(o=!1,n={x:t.clientX,y:t.clientY},a(),s=window.setTimeout((()=>{o=!0,navigator.vibrate?.(8),i()}),450))},l=t=>{n&&Math.hypot(t.clientX-n.x,t.clientY-n.y)>10&&(a(),n=null)},c=()=>{const t=null!==n&&void 0!==s;a(),n=null,t&&!o&&e()},d=()=>{a(),n=null},p=t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),e())},h=t=>t.preventDefault();return t.addEventListener("pointerdown",r),t.addEventListener("pointermove",l),t.addEventListener("pointerup",c),t.addEventListener("pointercancel",d),t.addEventListener("pointerleave",d),t.addEventListener("keydown",p),t.addEventListener("contextmenu",h),()=>{a(),t.removeEventListener("pointerdown",r),t.removeEventListener("pointermove",l),t.removeEventListener("pointerup",c),t.removeEventListener("pointercancel",d),t.removeEventListener("pointerleave",d),t.removeEventListener("keydown",p),t.removeEventListener("contextmenu",h)}}(t,(()=>this.tap()),(()=>this.ctx.openEntity(this.widget.config.entity))))}firstUpdated(){this.bind()}connectedCallback(){super.connectedCallback(),this.hasUpdated&&this.bind()}disconnectedCallback(){super.disconnectedCallback(),this.unbind?.(),this.unbind=void 0}tap(){if(this.ctx.editing)return;const t=this.widget.config.entity,e=this.ctx.hass.states[t];if(!e||"unavailable"===e.state||"sheet"===Wt(t))return this.ctx.openEntity(t);navigator.vibrate?.(5),qt(this.ctx.hass,e).catch((()=>this.ctx.toast(this.ctx.t("error"))))}render(){const{ctx:t}=this,e=this.widget.config.entity??"",i=t.hass.states[e],s=Ft(i),n=t.narrow||this.widget.h>=3||this.widget.w<=2;return F`
      <div
        class="tile glass pressable ${n?"vertical":""} ${s?"on":""} ${i&&"unavailable"!==i.state?"":"off-line"}"
        style=${Bt(i)}
        role="button"
        tabindex="0"
        aria-pressed=${s}
      >
        <span class="ic"><sn-icon .icon=${Ut(i,e)}></sn-icon></span>
        <span class="text">
          <span class="name">${Rt(t.hass,t.config,e)}</span>
          <span class="state">${Gt(t.t,i,t.lang)}</span>
        </span>
      </div>
    `}};function Yi(t,e,i=1.6){let s,n=i;for(const o of e){const e=Math.hypot(o[0]-t[0],o[1]-t[1]);e<n&&(n=e,s=o)}return s?[s[0],s[1]]:[Math.round(10*t[0])/10,Math.round(10*t[1])/10]}Xi.styles=[Ve,a`
      :host {
        display: block;
        height: 100%;
      }
      .tile {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 16px;
        border-radius: var(--r-lg);
        cursor: pointer;
        text-align: start;
        overflow: hidden;
      }
      .tile.vertical {
        padding: 12px 14px;
        gap: 6px;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
      }
      .ic {
        display: grid;
        place-items: center;
        width: 44px;
        height: 44px;
        border-radius: 999px;
        background: var(--surface-2);
        color: var(--text-2);
        flex: none;
        transition: background-color var(--dur) var(--ease-out), color var(--dur) var(--ease-out);
      }
      .text {
        min-width: 0;
        display: grid;
        gap: 2px;
      }
      .name {
        font-weight: 700;
        font-size: 15px;
        line-height: 1.25;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .state {
        unicode-bidi: plaintext; /* "1,840 W" stays LTR inside Arabic text */
        font-size: 13px;
        color: var(--text-2);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .tile.on {
        background: var(--surface-solid);
        border-color: transparent;
      }
      .tile.on .ic {
        background: var(--tone);
        color: var(--on-tone);
      }
      .tile.on .state {
        color: var(--text);
      }
      .tile.off-line {
        opacity: 0.55;
      }
    `],qi([ut({attribute:!1})],Xi.prototype,"ctx",2),qi([ut({attribute:!1})],Xi.prototype,"widget",2),Xi=qi([dt("sn-w-tile")],Xi);var Ki=Object.defineProperty,Gi=Object.getOwnPropertyDescriptor,Ji=(t,e,i,s)=>{for(var n,o=s>1?void 0:s?Gi(e,i):e,a=t.length-1;a>=0;a--)(n=t[a])&&(o=(s?n(e,i,o):n(o))||o);return s&&o&&Ki(e,i,o),o};let Qi=class extends lt{constructor(){super(...arguments),this.floorIdx=0,this.area={w:0,h:0},this.uploading=!1,this.roomMode=!1}connectedCallback(){super.connectedCallback(),this.ro=new ResizeObserver((()=>this.measure())),this.updateComplete.then((()=>{const t=this.renderRoot.querySelector(".area");t&&this.ro.observe(t)}))}disconnectedCallback(){super.disconnectedCallback(),this.ro?.disconnect()}measure(){const t=this.renderRoot.querySelector(".area");if(!t)return;const e=getComputedStyle(t),i=parseFloat(e.paddingLeft)+parseFloat(e.paddingRight),s=parseFloat(e.paddingTop)+parseFloat(e.paddingBottom),n=t.clientWidth-i,o=t.clientHeight-s;n===this.area.w&&o===this.area.h||(this.area={w:n,h:o})}get floors(){return this.widget.config.floors??[]}get floor(){return this.floors[Math.min(this.floorIdx,this.floors.length-1)]}edit(t){const e=Math.min(this.floorIdx,this.floors.length-1);this.ctx.update((i=>{const s=fe(i,this.widget.id);s&&(s.config.floors??=[],t(s.config.floors,s.config.floors[e],i))}))}willUpdate(t){t.has("ctx")&&!this.ctx.editing&&(this.selected=void 0,this.roomMode=!1,this.drawing=void 0,this.selRoom=void 0),this.toggleAttribute("editing",this.ctx.editing),this.toggleAttribute("narrow",this.ctx.narrow),this.toggleAttribute("dark",this.ctx.dark)}onDown(t,e){if(0===t.button){if(t.stopPropagation(),this.ctx.editing)return t.currentTarget.setPointerCapture(t.pointerId),this.selected=e.id,void(this.drag={id:e.id,pointerId:t.pointerId,startX:t.clientX,startY:t.clientY,origX:e.x,origY:e.y,x:e.x,y:e.y,moved:!1});window.clearTimeout(this.press?.timer),this.press={id:e.id,x:t.clientX,y:t.clientY,timer:window.setTimeout((()=>{this.press=void 0,navigator.vibrate?.(8),this.ctx.openEntity(e.entity)}),450)}}}onMove(t){if(this.drag&&t.pointerId===this.drag.pointerId){const e=this.stageSize(),i=(t.clientX-this.drag.startX)/e.w*100,s=(t.clientY-this.drag.startY)/e.h*100,n=this.drag.moved||Math.hypot(t.clientX-this.drag.startX,t.clientY-this.drag.startY)>3;this.drag={...this.drag,moved:n,x:Math.min(100,Math.max(0,this.drag.origX+i)),y:Math.min(100,Math.max(0,this.drag.origY+s))}}else this.press&&Math.hypot(t.clientX-this.press.x,t.clientY-this.press.y)>10&&(window.clearTimeout(this.press.timer),this.press=void 0)}onUp(t,e){if(this.drag&&t.pointerId===this.drag.pointerId){const{x:t,y:i,moved:s}=this.drag;return this.drag=void 0,void(s&&this.edit(((s,n)=>{const o=n?.markers.find((t=>t.id===e.id));o&&Object.assign(o,{x:Math.round(10*t)/10,y:Math.round(10*i)/10})})))}this.press?.id===e.id&&(window.clearTimeout(this.press.timer),this.press=void 0,this.tap(e))}onCancel(){window.clearTimeout(this.press?.timer),this.press=void 0,this.drag=void 0}tap(t){const e=this.ctx.hass.states[t.entity];if(!e||"unavailable"===e.state||"sheet"===Wt(t.entity))return this.ctx.openEntity(t.entity);navigator.vibrate?.(5),qt(this.ctx.hass,e).catch((()=>this.ctx.toast(this.ctx.t("error"))))}stageSize(){const t=this.natural?this.natural.w/this.natural.h:1.6;if(this.ctx.narrow)return{w:this.area.w,h:this.area.w/t};let e=this.area.w,i=e/t;return i>this.area.h&&(i=this.area.h,e=i*t),{w:Math.max(e,0),h:Math.max(i,0)}}addFloor(){const t=this.floors.length+1;this.edit((e=>e.push(re(`${this.ctx.t("floor")} ${t}`)))),this.floorIdx=this.floors.length,this.natural=void 0}floorSheet(){const{t:t}=this.ctx,e=this.floor;e&&this.ctx.showSheet({title:t("floor"),render:i=>F`
        <div style="display:grid;gap:16px">
          <label class="field"
            >${t("floor_name")}
            <input
              type="text"
              .value=${e.name}
              @change=${t=>this.edit(((i,s)=>s&&(s.name=t.target.value.trim()||e.name)))}
            />
          </label>
          ${this.floors.length>1?F`<button
                class="btn danger pressable"
                @click=${()=>{if(!confirm(t("delete_confirm")))return;const e=this.floorIdx;this.edit((t=>t.splice(e,1))),this.floorIdx=Math.max(0,e-1),i.closeSheet()}}
              >
                <sn-icon icon="delete"></sn-icon>${t("delete_floor")}
              </button>`:W}
        </div>
      `})}pickFile(){this.renderRoot.querySelector("input[type=file]")?.click()}async onFile(t){const e=t.target,i=e.files?.[0];if(e.value="",i){this.uploading=!0;try{const t=await async function(t,e){const i=new FormData;i.append("file",e);const s=await t.fetchWithAuth("/api/smartnest/upload",{method:"POST",body:i});if(!s.ok)throw new Error(`upload ${s.status}`);return(await s.json()).url}(this.ctx.hass,i);this.natural=void 0,this.edit(((e,i)=>i&&(i.image=t)))}catch{this.ctx.toast(this.ctx.t("upload_failed"))}finally{this.uploading=!1}}}addDevice(){this.ctx.showSheet({title:this.ctx.t("add_device"),render:t=>F`<sn-entity-picker
        .ctx=${t}
        .onPick=${e=>{const i=ne(),s=["sensor","climate"].includes(Nt(e))?"value":"icon";this.edit(((t,n)=>n?.markers.push({id:i,entity:e,x:50,y:50,display:s}))),this.selected=i,t.closeSheet()}}
      ></sn-entity-picker>`})}renameDevice(t){const{t:e}=this.ctx;this.ctx.showSheet({title:e("display_name"),render:i=>F`<label class="field"
        >${Rt(i.hass,i.config,t.entity)}
        <input
          type="text"
          .value=${i.config.names[t.entity]??""}
          placeholder=${i.hass.states[t.entity]?.attributes.friendly_name??t.entity}
          @change=${e=>i.update((i=>{const s=e.target.value.trim();s?i.names[t.entity]=s:delete i.names[t.entity]}))}
        />
        <span class="hint">${e("display_name_hint")}</span>
      </label>`})}pct(t){const e=this.renderRoot.querySelector(".stage").getBoundingClientRect();return[Math.min(100,Math.max(0,(t.clientX-e.left)/e.width*100)),Math.min(100,Math.max(0,(t.clientY-e.top)/e.height*100))]}corners(t){return(this.floor?.rooms??[]).filter((e=>e.id!==t)).flatMap((t=>t.points))}onStageDown(t){if(!this.roomMode||0!==t.button)return;if(t.stopPropagation(),!this.drawing)return void(this.selRoom=void 0);const e=this.drawing,i=this.pct(t);if(e.length>=3&&Math.hypot(i[0]-e[0][0],i[1]-e[0][1])<3)return this.finishRoom();this.drawing=[...e,Yi(i,this.corners())]}finishRoom(){const t=this.drawing;if(!t||t.length<3)return;const e=ne(),i=(this.floor?.rooms?.length??0)+1,s={id:e,name:this.ctx.t("room_default",{n:i}),points:t};this.edit(((t,e)=>{e&&(e.rooms=[...e.rooms??[],s])})),this.drawing=void 0,this.selRoom=e}onVtxDown(t,e,i){t.stopPropagation(),t.currentTarget.setPointerCapture(t.pointerId),this.selRoom=e.id,this.vtx={room:e.id,idx:i,pointerId:t.pointerId,p:e.points[i]}}onVtxMove(t){this.vtx&&t.pointerId===this.vtx.pointerId&&(this.vtx={...this.vtx,p:Yi(this.pct(t),this.corners(this.vtx.room))})}onVtxUp(t){const e=this.vtx;e&&t.pointerId===e.pointerId&&(this.vtx=void 0,this.edit(((t,i)=>{const s=i?.rooms?.find((t=>t.id===e.room));s&&(s.points[e.idx]=e.p)})))}renameRoom(t){this.ctx.showSheet({title:this.ctx.t("room_name"),render:e=>F`<label class="field"
        >${e.t("room_name")}
        <input
          type="text"
          .value=${t.name}
          @change=${e=>this.edit(((i,s)=>{const n=s?.rooms?.find((e=>e.id===t.id));n&&(n.name=e.target.value.trim()||t.name)}))}
        />
      </label>`})}livePoints(t){return this.vtx?.room===t.id?t.points.map(((t,e)=>e===this.vtx.idx?this.vtx.p:t)):t.points}renderGlow(t,e){const{hass:i}=this.ctx,s=Math.max(120,.3*e);return(t.rooms??[]).map((e=>{const n=t.markers.filter((t=>"light"===Nt(t.entity)&&function([t,e],i){let s=!1;for(let n=0,o=i.length-1;n<i.length;o=n++){const[a,r]=i[n],[l,c]=i[o];r>e!=c>e&&t<(l-a)*(e-r)/(c-r)+a&&(s=!s)}return s}([t.x,t.y],e.points))),o=n.filter((t=>"on"===i.states[t.entity]?.state)),a=o.map((t=>{const e=i.states[t.entity].attributes,[n,o,a]=Array.isArray(e.rgb_color)?e.rgb_color:[255,196,120],r="number"==typeof e.brightness?e.brightness/255:1,l=(this.ctx.dark?.35:.22)+(this.ctx.dark?.45:.25)*r;return`radial-gradient(circle ${s}px at ${t.x}% ${t.y}%, rgba(${n},${o},${a},${l.toFixed(2)}) 0%, rgba(${n},${o},${a},${(.45*l).toFixed(2)}) 45%, rgba(${n},${o},${a},${(.18*l).toFixed(2)}) 100%)`}));return F`<div
        class="glow"
        style="clip-path:${r=this.livePoints(e),`polygon(${r.map((([t,e])=>`${t}% ${e}%`)).join(",")})`};opacity:${o.length?1:0};${a.length?`background:${a.join(",")}`:""}"
      ></div>`;var r}))}renderRoomEditor(t){const e=t.rooms??[],i=this.drawing;return F`<svg class="rooms-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        ${e.map((t=>B`<polygon
            class=${t.id===this.selRoom?"sel":""}
            points=${this.livePoints(t).map((t=>t.join(","))).join(" ")}
            @pointerdown=${e=>{this.drawing||(e.stopPropagation(),this.selRoom=t.id)}}
          ></polygon>`))}
        ${i?B`<polyline points=${i.map((t=>t.join(","))).join(" ")}></polyline>`:W}
      </svg>
      ${e.map((t=>{const[e,i]=function(t){let e=0,i=0,s=0;for(let n=0,o=t.length-1;n<t.length;o=n++){const a=t[o][0]*t[n][1]-t[n][0]*t[o][1];e+=a,i+=(t[o][0]+t[n][0])*a,s+=(t[o][1]+t[n][1])*a}return Math.abs(e)<1e-6?[t.reduce(((t,e)=>t+e[0]),0)/t.length,t.reduce(((t,e)=>t+e[1]),0)/t.length]:[i/(3*e),s/(3*e)]}(this.livePoints(t));return F`<span class="room-label" style="left:${e}%;top:${i}%">${t.name}</span>`}))}
      ${i?.map(((t,e)=>F`<span class="vtx ${0===e&&i.length>=3?"first":""}" style="left:${t[0]}%;top:${t[1]}%;pointer-events:none"></span>`))}
      ${i?W:e.filter((t=>t.id===this.selRoom)).flatMap((t=>this.livePoints(t).map(((e,i)=>F`<span
                  class="vtx"
                  style="left:${e[0]}%;top:${e[1]}%"
                  @pointerdown=${e=>this.onVtxDown(e,t,i)}
                  @pointermove=${t=>this.onVtxMove(t)}
                  @pointerup=${t=>this.onVtxUp(t)}
                  @pointercancel=${()=>this.vtx=void 0}
                ></span>`))))}`}renderRoomTools(){const{t:t}=this.ctx,e=t=>t.stopPropagation();if(this.drawing)return F`<div class="tools glass" @pointerdown=${e}>
        <span class="hint">${t("draw_hint")}</span>
        <button class="icon-btn pressable" aria-label=${t("undo_point")} ?disabled=${!this.drawing.length} @click=${()=>this.drawing=this.drawing.slice(0,-1)}>
          <sn-icon icon="undo" style="--icon-size:20px"></sn-icon>
        </button>
        <button class="btn pressable" @click=${()=>this.drawing=void 0}>${t("cancel")}</button>
        <button class="btn primary pressable" ?disabled=${this.drawing.length<3} @click=${()=>this.finishRoom()}>${t("finish")}</button>
      </div>`;const i=this.floor?.rooms?.find((t=>t.id===this.selRoom));return i?F`<div class="tools glass" @pointerdown=${e}>
        <span class="label">${i.name}</span>
        <button class="icon-btn pressable" aria-label=${t("room_name")} @click=${()=>this.renameRoom(i)}>
          <sn-icon icon="pencil" style="--icon-size:20px"></sn-icon>
        </button>
        <button
          class="icon-btn pressable"
          aria-label=${t("delete_room")}
          @click=${()=>{this.edit(((t,e)=>e&&(e.rooms=(e.rooms??[]).filter((t=>t.id!==i.id))))),this.selRoom=void 0}}
        >
          <sn-icon icon="delete" style="--icon-size:20px"></sn-icon>
        </button>
        <button class="icon-btn primary pressable" aria-label=${t("done")} @click=${()=>this.selRoom=void 0}>
          <sn-icon icon="check" style="--icon-size:20px"></sn-icon>
        </button>
      </div>`:F`<div class="tools glass" @pointerdown=${e}>
      <span class="hint">${t("rooms_hint")}</span>
      <button class="btn primary pressable" @click=${()=>this.drawing=[]}>
        <sn-icon icon="rooms" style="--icon-size:20px"></sn-icon>${t("draw_room")}
      </button>
      <button class="btn pressable" @click=${()=>this.roomMode=!1}>${t("done")}</button>
    </div>`}renderMarker(t){const{ctx:e}=this,i=e.hass.states[t.entity],s=Ft(i),n=this.drag?.id===t.id,o=n?this.drag.x:t.x,a=n?this.drag.y:t.y,r=["marker",s?"on":"",s&&"binary_sensor"===Nt(t.entity)&&["motion","occupancy","presence"].includes(i?.attributes.device_class)?"pulse":"",i&&"unavailable"!==i.state?"":"dim",e.editing?"editable":"",n?"dragging":"",this.selected===t.id&&e.editing?"selected":""].join(" ");return F`<div
      class=${r}
      style="left:${o}%;top:${a}%;${Bt(i)}"
      role="button"
      tabindex="0"
      aria-label=${Rt(e.hass,e.config,t.entity)}
      @pointerdown=${e=>this.onDown(e,t)}
      @pointermove=${t=>this.onMove(t)}
      @pointerup=${e=>this.onUp(e,t)}
      @pointercancel=${()=>this.onCancel()}
      @contextmenu=${t=>t.preventDefault()}
      @keydown=${i=>"Enter"===i.key&&!e.editing&&this.tap(t)}
    >
      <span class="ic"><sn-icon .icon=${Ut(i,t.entity)}></sn-icon></span>
      ${"value"===t.display?F`<span class="val">${Jt(e.t,i,e.lang)}</span>`:W}
      ${e.editing&&this.selected===t.id&&!n?F`<span class="tag">${Rt(e.hass,e.config,t.entity)}</span>`:W}
    </div>`}renderTools(){const{ctx:t}=this,{t:e}=t,i=this.floor;if(this.roomMode)return this.renderRoomTools();const s=i?.markers.find((t=>t.id===this.selected));return s?F`<div class="tools glass" @pointerdown=${t=>t.stopPropagation()}>
        <span class="label">${Rt(t.hass,t.config,s.entity)}</span>
        <div class="seg">
          ${["icon","value"].map((t=>F`<button
              aria-pressed=${s.display===t}
              @click=${()=>this.edit(((e,i)=>{const n=i?.markers.find((t=>t.id===s.id));n&&(n.display=t)}))}
            >
              ${e("icon"===t?"show_icon":"show_value")}
            </button>`))}
        </div>
        <button class="icon-btn pressable" aria-label=${e("display_name")} @click=${()=>this.renameDevice(s)}>
          <sn-icon icon="pencil" style="--icon-size:20px"></sn-icon>
        </button>
        <button
          class="icon-btn pressable"
          aria-label=${e("delete")}
          @click=${()=>{this.edit(((t,e)=>e&&(e.markers=e.markers.filter((t=>t.id!==s.id))))),this.selected=void 0}}
        >
          <sn-icon icon="delete" style="--icon-size:20px"></sn-icon>
        </button>
        <button class="icon-btn primary pressable" aria-label=${e("done")} @click=${()=>this.selected=void 0}>
          <sn-icon icon="check" style="--icon-size:20px"></sn-icon>
        </button>
      </div>`:F`<div class="tools glass" @pointerdown=${t=>t.stopPropagation()}>
      <button class="btn pressable" ?disabled=${this.uploading} @click=${()=>this.pickFile()}>
        <sn-icon icon="image-plus" style="--icon-size:20px"></sn-icon>
        ${this.uploading?e("loading"):e(i?.image?"replace_plan":"upload_plan")}
      </button>
      <button class="btn pressable" ?disabled=${!i?.image} @click=${()=>{this.roomMode=!0,this.selected=void 0}}>
        <sn-icon icon="rooms" style="--icon-size:20px"></sn-icon>${e("rooms")}
      </button>
      <button class="btn primary pressable" ?disabled=${!i?.image} @click=${()=>this.addDevice()}>
        <sn-icon icon="marker-plus" style="--icon-size:20px"></sn-icon>${e("add_device")}
      </button>
      <input type="file" accept="image/png,image/jpeg,image/webp" @change=${this.onFile} />
    </div>`}render(){const{ctx:t}=this,{t:e}=t,i=this.floor,s=this.floors,n=this.stageSize(),o=this.natural?this.natural.w/this.natural.h:1.6;return F`<div class="wrap glass">
      ${s.length>1||t.editing?F`<div class="floors" @pointerdown=${t=>t.stopPropagation()}>
            <div class="seg">
              ${s.map(((e,i)=>F`<button
                  aria-pressed=${i===this.floorIdx}
                  @click=${()=>{if(i===this.floorIdx&&t.editing)return this.floorSheet();this.floorIdx=i,this.selected=void 0,this.natural=void 0}}
                >
                  <sn-icon icon="layers" style="--icon-size:16px"></sn-icon>${e.name}
                </button>`))}
              ${t.editing?F`<button aria-label=${e("add_floor")} @click=${()=>this.addFloor()}>
                    <sn-icon icon="plus" style="--icon-size:18px"></sn-icon>
                  </button>`:W}
            </div>
          </div>`:W}
      <div class="area" style=${t.narrow?`aspect-ratio:${o}`:""}>
        ${i?.image?F`<div
              class="stage ${this.roomMode?"room-mode":""} ${this.drawing?"drawing":""}"
              style="width:${n.w}px;height:${n.h}px"
              @pointerdown=${t=>this.onStageDown(t)}
            >
              <img
                class=${this.widget.config.invert_dark?"plan-light":""}
                src=${i.image}
                alt=""
                @load=${t=>{const e=t.target;this.natural={w:e.naturalWidth,h:e.naturalHeight},this.measure()}}
              />
              ${this.renderGlow(i,n.w)} ${i.markers.map((t=>this.renderMarker(t)))}
              ${t.editing&&this.roomMode?this.renderRoomEditor(i):W}
            </div>`:F`<div class="empty">
              <sn-icon icon="image"></sn-icon>
              <strong>${e("no_plan")}</strong>
              ${t.isAdmin&&!t.editing?F`<span>${e("no_plan_admin")}</span>`:W}
            </div>`}
      </div>
      ${t.editing&&i?this.renderTools():W}
    </div>`}};Qi.styles=[Ve,a`
      :host {
        display: block;
        height: 100%;
      }
      .wrap {
        position: relative;
        height: 100%;
        border-radius: var(--r-lg);
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }
      .area {
        position: relative;
        flex: 1;
        min-height: 0;
        display: grid;
        place-items: center;
        padding: 16px;
      }
      :host([narrow]) .area {
        flex: none;
        padding: 12px;
      }
      .stage {
        position: relative;
        direction: ltr;
      }
      .stage img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: contain;
        user-select: none;
        -webkit-user-drag: none;
        pointer-events: none;
        border-radius: var(--r-sm);
      }
      :host([dark]) .stage img.plan-light {
        /* Line drawings on white turn into glowing outlines on charcoal. */
        filter: invert(0.88) hue-rotate(180deg) brightness(1.05);
      }
      .marker {
        position: absolute;
        transform: translate(-50%, -50%);
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 4px;
        border-radius: 999px;
        background: var(--surface);
        -webkit-backdrop-filter: blur(16px) saturate(170%);
        backdrop-filter: blur(16px) saturate(170%);
        border: 1px solid var(--border);
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
        touch-action: none;
        user-select: none;
        -webkit-user-select: none;
        cursor: pointer;
        transition: transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out);
        z-index: 1;
      }
      .marker:active {
        transform: translate(-50%, -50%) scale(0.92);
      }
      .marker .ic {
        display: grid;
        place-items: center;
        width: 36px;
        height: 36px;
        border-radius: 999px;
        background: var(--surface-2);
        color: var(--text-2);
        --icon-size: 20px;
        transition: background-color var(--dur) var(--ease-out), color var(--dur) var(--ease-out);
      }
      .marker .val {
        unicode-bidi: plaintext;
        padding-inline-end: 10px;
        font-size: 14px;
        font-weight: 700;
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
        color: var(--text);
      }
      .marker.on .ic {
        background: var(--tone);
        color: var(--on-tone);
        box-shadow: 0 0 0 6px color-mix(in srgb, var(--tone) 28%, transparent);
      }
      .marker.pulse::after {
        content: "";
        position: absolute;
        inset: -2px;
        border-radius: 999px;
        border: 2px solid var(--tone);
        animation: pulse 1.6s var(--ease-out) infinite;
        pointer-events: none;
      }
      :host([narrow]) .marker {
        padding: 2px;
      }
      :host([narrow]) .marker .ic {
        width: 26px;
        height: 26px;
        --icon-size: 15px;
      }
      :host([narrow]) .marker .val {
        font-size: 11px;
        padding-inline-end: 6px;
      }
      :host([narrow]) .marker.on .ic {
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--tone) 28%, transparent);
      }
      .marker.dim {
        opacity: 0.5;
      }
      .marker.editable {
        cursor: grab;
      }
      .marker.dragging {
        cursor: grabbing;
        transform: translate(-50%, -50%) scale(1.15);
        box-shadow: var(--shadow-lift);
        z-index: 3;
        transition: none;
      }
      .marker.selected {
        outline: 2px solid var(--accent);
        outline-offset: 3px;
        z-index: 2;
      }
      .tag {
        position: absolute;
        top: calc(100% + 8px);
        left: 50%;
        transform: translateX(-50%);
        padding: 3px 8px;
        border-radius: 6px;
        background: var(--surface-solid);
        color: var(--text);
        font-size: 12px;
        white-space: nowrap;
        box-shadow: var(--shadow);
        pointer-events: none;
      }
      @keyframes pulse {
        from {
          transform: scale(1);
          opacity: 0.9;
        }
        to {
          transform: scale(1.7);
          opacity: 0;
        }
      }
      .floors {
        position: absolute;
        top: 12px;
        inset-inline-start: 12px;
        z-index: 4;
        max-width: calc(100% - 24px);
      }
      :host([editing]) .floors {
        inset-inline-start: 60px; /* clear the grid's drag handle */
        max-width: calc(100% - 84px);
      }
      .floors .seg {
        background: var(--surface);
        -webkit-backdrop-filter: blur(20px);
        backdrop-filter: blur(20px);
        box-shadow: var(--shadow);
      }
      .tools {
        position: absolute;
        bottom: 12px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 4;
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px;
        border-radius: 999px;
        max-width: calc(100% - 24px);
        overflow-x: auto;
        scrollbar-width: none;
        animation: up 420ms var(--spring);
      }
      .tools .btn {
        min-height: 40px;
        padding: 0 14px;
        font-size: 14px;
      }
      .tools .label {
        padding-inline: 10px 4px;
        font-weight: 700;
        white-space: nowrap;
        max-width: 180px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      @keyframes up {
        from {
          transform: translate(-50%, 16px);
          opacity: 0;
        }
      }
      .empty {
        display: grid;
        justify-items: center;
        gap: 10px;
        text-align: center;
        color: var(--text-2);
        --icon-size: 56px;
      }
      .empty strong {
        color: var(--text);
        font-size: 17px;
      }
      /* Rooms that glow with their lights. Clipped to the room so light never spills through walls. */
      .glow {
        position: absolute;
        inset: 0;
        pointer-events: none;
        transition: opacity 900ms var(--ease-out);
      }
      :host([dark]) .glow {
        mix-blend-mode: screen;
      }
      .rooms-svg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        overflow: visible;
        z-index: 2;
      }
      .rooms-svg polygon {
        fill: color-mix(in srgb, var(--accent) 12%, transparent);
        stroke: var(--accent);
        stroke-width: 2;
        stroke-dasharray: 6 5;
        vector-effect: non-scaling-stroke;
        cursor: pointer;
      }
      .rooms-svg polygon.sel {
        fill: color-mix(in srgb, var(--accent) 26%, transparent);
        stroke-dasharray: none;
      }
      .rooms-svg polyline {
        fill: none;
        stroke: var(--accent);
        stroke-width: 2.5;
        vector-effect: non-scaling-stroke;
      }
      .room-label {
        position: absolute;
        transform: translate(-50%, -50%);
        padding: 3px 10px;
        border-radius: 999px;
        background: var(--surface-solid);
        color: var(--text);
        font-size: 12px;
        font-weight: 700;
        white-space: nowrap;
        pointer-events: none;
        z-index: 3;
        box-shadow: var(--shadow);
      }
      .vtx {
        position: absolute;
        width: 22px;
        height: 22px;
        margin: -11px 0 0 -11px;
        border-radius: 999px;
        background: var(--surface-solid);
        border: 3px solid var(--accent);
        z-index: 4;
        touch-action: none;
        cursor: grab;
      }
      .vtx.first {
        background: var(--accent);
        animation: beckon 1.2s ease-in-out infinite alternate;
      }
      @keyframes beckon {
        to {
          transform: scale(1.35);
        }
      }
      .stage.drawing {
        cursor: crosshair;
      }
      .stage.room-mode .marker {
        opacity: 0.35;
        pointer-events: none;
      }
      .tools .hint {
        font-size: 13px;
        color: var(--text-2);
        padding-inline: 8px;
        max-width: 280px;
      }
      input[type="file"] {
        display: none;
      }
    `],Ji([ut({attribute:!1})],Qi.prototype,"ctx",2),Ji([ut({attribute:!1})],Qi.prototype,"widget",2),Ji([gt()],Qi.prototype,"floorIdx",2),Ji([gt()],Qi.prototype,"selected",2),Ji([gt()],Qi.prototype,"drag",2),Ji([gt()],Qi.prototype,"natural",2),Ji([gt()],Qi.prototype,"area",2),Ji([gt()],Qi.prototype,"uploading",2),Ji([gt()],Qi.prototype,"roomMode",2),Ji([gt()],Qi.prototype,"drawing",2),Ji([gt()],Qi.prototype,"selRoom",2),Ji([gt()],Qi.prototype,"vtx",2),Qi=Ji([dt("sn-w-floorplan")],Qi);var ts=Object.defineProperty,es=Object.getOwnPropertyDescriptor,is=(t,e,i,s)=>{for(var n,o=s>1?void 0:s?es(e,i):e,a=t.length-1;a>=0;a--)(n=t[a])&&(o=(s?n(e,i,o):n(o))||o);return s&&o&&ts(e,i,o),o};function ss(t,e,i){const s=t.states[e]?.attributes.entity_picture;if(s)return t.hassUrl(`${s}${s.includes("?")?"&":"?"}t=${i}`)}function ns(t,e){const i=t.states[e],s=i?.attributes.access_token;if(i&&s)return i.attributes.entity_picture?.startsWith("/dev/")?i.attributes.entity_picture:t.hassUrl(`/api/camera_proxy_stream/${e}?token=${s}`)}let os=class extends lt{constructor(){super(...arguments),this.bust=Date.now()}connectedCallback(){super.connectedCallback(),this.timer=window.setInterval((()=>this.bust=Date.now()),1e4)}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this.timer)}render(){const{ctx:t}=this,e=this.widget.config.entity,i=e?ss(t.hass,e,this.bust):void 0;return F`
      <button class="cam pressable" @click=${()=>!t.editing&&e&&t.openEntity(e)}>
        ${i?F`<img src=${i} alt="" draggable="false" />`:F`<span class="placeholder"><sn-icon icon="cctv"></sn-icon></span>`}
        <span class="label"><sn-icon icon="cctv" style="--icon-size:16px"></sn-icon>${e?Rt(t.hass,t.config,e):t.t("widget_camera")}</span>
      </button>
    `}};os.styles=[Ve,a`
      :host {
        display: block;
        height: 100%;
      }
      .cam {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: var(--r-lg);
        overflow: hidden;
        background: #0d1114;
        cursor: pointer;
        display: block;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      .label {
        position: absolute;
        inset-inline-start: 12px;
        bottom: 12px;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 6px 12px;
        border-radius: 999px;
        background: rgba(21, 26, 30, 0.55);
        -webkit-backdrop-filter: blur(12px);
        backdrop-filter: blur(12px);
        color: #fff;
        font-size: 13px;
        font-weight: 500;
      }
      .placeholder {
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        color: #55616c;
        --icon-size: 48px;
      }
    `],is([ut({attribute:!1})],os.prototype,"ctx",2),is([ut({attribute:!1})],os.prototype,"widget",2),is([gt()],os.prototype,"bust",2),os=is([dt("sn-w-camera")],os);var as=Object.defineProperty,rs=Object.getOwnPropertyDescriptor,ls=(t,e,i,s)=>{for(var n,o=s>1?void 0:s?rs(e,i):e,a=t.length-1;a>=0;a--)(n=t[a])&&(o=(s?n(e,i,o):n(o))||o);return s&&o&&as(e,i,o),o};let cs=class extends lt{render(){return F`<h2>${this.widget.config.text||this.ctx.t("widget_heading")}</h2>`}};function ds(t=new Date){const e=t.getHours();return e>=4&&e<12?"greet_morning":e>=12&&e<17?"greet_afternoon":"greet_evening"}function ps(t,e){return e.trim()||t.user?.name||""}function hs(t,e=!1){if(!t)return"w-cloudy";if("partlycloudy"===t&&e)return"w-partlycloudy-night";const i=`w-${"windy-variant"===t?"windy":"snowy-rainy"===t||"hail"===t?"snowy":t}`;return Et[i]?i:"w-cloudy"}cs.styles=[Ve,a`
      :host {
        display: flex;
        align-items: flex-end;
        height: 100%;
        padding-inline: 4px;
      }
      h2 {
        margin: 0;
        font-size: 22px;
        font-weight: 700;
        color: var(--text);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    `],ls([ut({attribute:!1})],cs.prototype,"ctx",2),ls([ut({attribute:!1})],cs.prototype,"widget",2),cs=ls([dt("sn-w-heading")],cs);const us=["fajr","dhuhr","asr","maghrib","isha"];function gs(t){const e=[];for(const i of us){const s=Object.values(t.states).find((t=>t.entity_id.startsWith("sensor.")&&t.entity_id.endsWith(`${i}_prayer`))),n=s?new Date(s.state):void 0;n&&!Number.isNaN(n.getTime())&&e.push({id:i,at:n})}return e.sort(((t,e)=>t.at.getTime()-e.at.getTime()))}async function ms(t,e){try{const i=await t.callWS({type:"call_service",domain:"weather",service:"get_forecasts",target:{entity_id:e},service_data:{type:"daily"},return_response:!0}),s=i.response?.[e]?.forecast?.[0];return s?{high:s.temperature,low:s.templow,condition:s.condition}:{}}catch{return{}}}var fs=Object.defineProperty,bs=Object.getOwnPropertyDescriptor,vs=(t,e,i,s)=>{for(var n,o=s>1?void 0:s?bs(e,i):e,a=t.length-1;a>=0;a--)(n=t[a])&&(o=(s?n(e,i,o):n(o))||o);return s&&o&&fs(e,i,o),o};let _s=class extends lt{constructor(){super(...arguments),this.now=new Date,this.forecast={}}connectedCallback(){super.connectedCallback(),this.timer=window.setInterval((()=>this.now=new Date),15e3),this.loadForecast(),this.forecastTimer=window.setInterval((()=>this.loadForecast()),18e5)}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this.timer),window.clearInterval(this.forecastTimer)}async loadForecast(){const t=this.ctx?.config.settings.weather.entity;this.widget?.h>=4&&t&&this.ctx.hass.states[t]&&(this.forecast=await ms(this.ctx.hass,t))}renderWeather(){const{ctx:t}=this,e=t.config.settings.weather.entity,i=e?t.hass.states[e]:void 0;if(!i)return W;const s="below_horizon"===t.hass.states["sun.sun"]?.state,n=e=>"number"==typeof e?Xt(`${Yt(e,t.lang,0)}°`):"",{high:o,low:a}=this.forecast;return F`<span class="pill">
      <sn-icon .icon=${hs(i.state,s)}></sn-icon>${n(i.attributes.temperature)}
      ${void 0!==o?F`<span class="muted">${n(o)} / ${n(a)}</span>`:W}
    </span>`}renderPrayer(){const{ctx:t}=this;if(!t.config.settings.prayer)return W;const e=function(t,e=new Date){const i=gs(t),s=i.find((t=>t.at.getTime()>e.getTime()));if(s)return s;const n=i.find((t=>"fajr"===t.id));return n?{id:"fajr",at:new Date(n.at.getTime()+864e5)}:void 0}(t.hass,this.now);return e?F`<span class="pill">
      <sn-icon icon="mosque"></sn-icon>${t.t(`p_${e.id}`)}
      <span class="muted">${function(t,e,i=new Date){const s=Math.max(0,Math.round((e.getTime()-i.getTime())/6e4));return s<60?t("in_min",{n:s}):t("in_hours",{n:`${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`})}(t.t,e.at,this.now)}</span>
    </span>`:W}render(){const{ctx:t}=this,e=zt[t.lang],i=F`<div class="time ltr">${this.now.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}</div>`,s=F`<div class="date">${this.now.toLocaleDateString(e,{weekday:"long",day:"numeric",month:"long"})}</div>`;if(this.widget.h<4){const e=t.config.settings.screensaver.temp_entity,n=e?t.hass.states[e]:void 0;return F`<div class="card glass">
        ${i} ${s} ${n?F`<div class="temp"><sn-icon icon="thermometer"></sn-icon>${Jt(t.t,n,t.lang)}</div>`:W}
      </div>`}const n=ps(t.hass,t.config.settings.greeting_name);return F`<div class="card glass full">
      <div class="greet">${t.t(ds(this.now))}${n?("ar"===t.lang?"، ":", ")+n:""}</div>
      <div>${i} ${s}</div>
      <div class="pills">${this.renderWeather()} ${this.renderPrayer()}</div>
    </div>`}};_s.styles=[Ve,a`
      :host {
        display: block;
        height: 100%;
      }
      .card {
        container-type: inline-size;
        height: 100%;
        border-radius: var(--r-lg);
        padding: 18px 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 4px;
        overflow: hidden;
      }
      .full {
        justify-content: space-between;
        padding: 22px 24px;
      }
      .greet {
        font-size: 17px;
        font-weight: 500;
        color: var(--accent-text);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .time {
        font-size: clamp(28px, 22cqi, 60px);
        white-space: nowrap;
        font-weight: 700;
        line-height: 1;
        letter-spacing: -0.02em;
        font-variant-numeric: tabular-nums;
      }
      .full .time {
        font-size: clamp(40px, 20cqi, 84px);
      }
      .date {
        color: var(--text-2);
        font-size: 15px;
      }
      .temp {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        color: var(--accent-text);
        font-weight: 500;
        --icon-size: 18px;
      }
      .pills {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .pill {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        min-height: 40px;
        padding: 0 14px 0 10px;
        border-radius: 999px;
        background: var(--surface-2);
        font-size: 15px;
        font-weight: 500;
        white-space: nowrap;
        unicode-bidi: plaintext;
        --icon-size: 22px;
      }
      .pill sn-icon {
        color: var(--accent-text);
      }
      .pill .muted {
        font-weight: 400;
      }
    `],vs([ut({attribute:!1})],_s.prototype,"ctx",2),vs([ut({attribute:!1})],_s.prototype,"widget",2),vs([gt()],_s.prototype,"now",2),vs([gt()],_s.prototype,"forecast",2),_s=vs([dt("sn-w-clock")],_s);var ys=Object.defineProperty,xs=Object.getOwnPropertyDescriptor,ws=(t,e,i,s)=>{for(var n,o=s>1?void 0:s?xs(e,i):e,a=t.length-1;a>=0;a--)(n=t[a])&&(o=(s?n(e,i,o):n(o))||o);return s&&o&&ys(e,i,o),o};let $s=class extends lt{connectedCallback(){super.connectedCallback(),this.load(),this.timer=window.setInterval((()=>this.load()),12e4)}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this.timer)}willUpdate(){const t=this.ctx.config.settings.doorbell.trigger_entity,e=t?`${this.ctx.hass.states[t]?.state}`:void 0;void 0!==this.bellSeen&&e!==this.bellSeen&&window.setTimeout((()=>this.load()),4e3),this.bellSeen=e}async load(){try{const t=await this.ctx.hass.callWS({type:"smartnest/visitors/list"});this.visits=t.visitors}catch{this.visits=[]}}open(t){const e=zt[this.ctx.lang],i=new Date(t.time);this.ctx.showSheet({title:i.toLocaleString(e,{weekday:"long",hour:"2-digit",minute:"2-digit"}),render:e=>F`<img src=${e.hass.hassUrl(t.url)} alt="" style="width:100%;border-radius:var(--r-md);display:block" />`})}render(){const{ctx:t}=this,e=zt[t.lang],i=this.visits??[];let s="";return F`<div class="wrap glass">
      <h3><sn-icon icon="doorbell"></sn-icon>${t.t("widget_visitors")}</h3>
      <div class="strip">
        ${this.visits&&!i.length?F`<span class="empty">${t.t("no_visitors")}</span>`:W}
        ${i.map(((i,n)=>{const o=new Date(i.time),a=(i=>{const s=new Date,n=new Date(s.getTime()-864e5);return i.toDateString()===s.toDateString()?t.t("today"):i.toDateString()===n.toDateString()?t.t("yesterday"):i.toLocaleDateString(e,{weekday:"short",day:"numeric",month:"short"})})(o),r=a!==s;return s=a,F`<button class="shot pressable" style="animation-delay:${40*Math.min(n,8)}ms" @click=${()=>this.open(i)}>
              <img src=${t.hass.hassUrl(i.url)} alt="" loading="lazy" />
              ${r?F`<em class="tag">${a}</em>`:W}
              <span>${o.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}</span>
            </button>`}))}
      </div>
    </div>`}};$s.styles=[Ve,a`
      :host {
        display: block;
        height: 100%;
      }
      .wrap {
        height: 100%;
        border-radius: var(--r-lg);
        padding: 16px;
        display: grid;
        grid-template-rows: auto 1fr;
        gap: 12px;
        overflow: hidden;
      }
      h3 {
        margin: 0;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 16px;
        --icon-size: 20px;
      }
      h3 sn-icon {
        color: var(--accent-text);
      }
      .strip {
        display: flex;
        gap: 12px;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        scrollbar-width: none;
        min-height: 0;
      }
      .strip::-webkit-scrollbar {
        display: none;
      }
      .tag {
        position: absolute;
        top: 8px;
        inset-inline-start: 8px;
        padding: 3px 10px;
        border-radius: 999px;
        background: var(--accent);
        color: var(--on-accent);
        font-size: 12px;
        font-weight: 700;
        font-style: normal;
      }
      .shot {
        position: relative;
        flex: none;
        height: 100%;
        aspect-ratio: 4 / 3;
        border-radius: var(--r-md);
        overflow: hidden;
        background: #0d1114;
        scroll-snap-align: start;
        animation: in 500ms var(--spring) both;
      }
      .shot img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      .shot span {
        position: absolute;
        bottom: 8px;
        inset-inline-start: 8px;
        padding: 3px 10px;
        border-radius: 999px;
        background: rgba(21, 26, 30, 0.6);
        color: #fff;
        font-size: 13px;
        font-weight: 500;
        direction: ltr;
      }
      .empty {
        align-self: center;
        color: var(--text-2);
        font-size: 14px;
      }
      @keyframes in {
        from {
          opacity: 0;
          transform: scale(0.92);
        }
      }
    `],ws([ut({attribute:!1})],$s.prototype,"ctx",2),ws([ut({attribute:!1})],$s.prototype,"widget",2),ws([gt()],$s.prototype,"visits",2),$s=ws([dt("sn-w-visitors")],$s);var ks=Object.defineProperty,Cs=Object.getOwnPropertyDescriptor,As=(t,e,i,s)=>{for(var n,o=s>1?void 0:s?Cs(e,i):e,a=t.length-1;a>=0;a--)(n=t[a])&&(o=(s?n(e,i,o):n(o))||o);return s&&o&&ks(e,i,o),o};let Hs=class extends lt{constructor(){super(...arguments),this.rects=new Map}willUpdate(){this.toggleAttribute("rtl",this.ctx.rtl),this.rects.clear(),this.ctx.editing&&this.renderRoot?.querySelectorAll(".cell").forEach((t=>this.rects.set(t.dataset.id,t.getBoundingClientRect())))}updated(){this.rects.size&&this.renderRoot.querySelectorAll(".cell").forEach((t=>{const e=this.rects.get(t.dataset.id);if(!e||t.classList.contains("lifted"))return;const i=t.getBoundingClientRect(),s=e.left-i.left,n=e.top-i.top;Math.abs(s)<1&&Math.abs(n)<1||t.animate([{transform:`translate(${s}px, ${n}px)`},{transform:"none"}],{duration:320,easing:"cubic-bezier(0.22, 1, 0.36, 1)"})}))}get widgets(){return this.preview??this.page.widgets}pointerCell(t){const e=this.renderRoot.querySelector(".grid").getBoundingClientRect(),i=(e.width+12)/ie,s=this.ctx.rtl?e.right-t.clientX:t.clientX-e.left,n=t.clientY-e.top;return{px:s,py:n,pitchX:i,pitchY:56,col:Math.floor(s/i),row:Math.floor(n/56)}}start(t,e,i){if(0!==t.button||this.ctx.narrow)return;t.preventDefault(),t.stopPropagation(),t.currentTarget.setPointerCapture(t.pointerId);const{col:s,row:n}=this.pointerCell(t);this.gesture={id:e.id,mode:i,pointerId:t.pointerId,offCol:s-e.x,offRow:n-e.y},this.preview=this.page.widgets.map((t=>({...t}))),navigator.vibrate?.(6)}move(t){const e=this.gesture;if(!e||t.pointerId!==e.pointerId||!this.preview)return;const i=this.preview.find((t=>t.id===e.id)),{px:s,py:n,pitchX:o,pitchY:a,col:r,row:l}=this.pointerCell(t);let c;if("move"===e.mode)c={...i,x:Math.min(Math.max(r-e.offCol,0),ie-i.w),y:Math.max(l-e.offRow,0)};else{const t=oe[i.type];c={...i,w:Math.min(Math.max(Math.round((s-i.x*o)/o),t.minW),ie-i.x),h:Math.min(Math.max(Math.round((n-i.y*a)/a),t.minH),40)}}if(c.x===i.x&&c.y===i.y&&c.w===i.w&&c.h===i.h)return;const d=this.page.widgets.map((t=>t.id===e.id?c:t));this.preview=de(d,e.id)}end(t){const e=this.gesture;if(!e||t.pointerId!==e.pointerId)return;this.move(t);const i=this.preview;if(this.gesture=void 0,this.preview=void 0,!i)return;const s=this.page.id;this.ctx.update((t=>{const e=t.pages.find((t=>t.id===s));e&&(e.widgets=de(i))}))}removeWidget(t){const e=this.page.id;this.ctx.update((i=>{const s=i.pages.find((t=>t.id===e));s&&(s.widgets=de(s.widgets.filter((e=>e.id!==t.id))))}))}renderWidget(t){const{ctx:e}=this;switch(t.type){case"tile":return F`<sn-w-tile .ctx=${e} .widget=${t}></sn-w-tile>`;case"floorplan":return F`<sn-w-floorplan .ctx=${e} .widget=${t}></sn-w-floorplan>`;case"camera":return F`<sn-w-camera .ctx=${e} .widget=${t}></sn-w-camera>`;case"heading":return F`<sn-w-heading .ctx=${e} .widget=${t}></sn-w-heading>`;case"clock":return F`<sn-w-clock .ctx=${e} .widget=${t}></sn-w-clock>`;case"modes":return F`<sn-w-modes .ctx=${e} .widget=${t}></sn-w-modes>`;case"vacuum":return F`<sn-w-vacuum .ctx=${e} .widget=${t}></sn-w-vacuum>`;case"visitors":return F`<sn-w-visitors .ctx=${e} .widget=${t}></sn-w-visitors>`;case"energy":return F`<sn-w-energy .ctx=${e} .widget=${t}></sn-w-energy>`;default:return W}}renderChrome(t){const{t:e,narrow:i}=this.ctx,s=this.gesture?.id===t.id;return F`
      ${i||"floorplan"===t.type?W:F`<div
            class="surface"
            @pointerdown=${e=>this.start(e,t,"move")}
            @pointermove=${this.move}
            @pointerup=${this.end}
            @pointercancel=${this.end}
          ></div>`}
      ${i||"floorplan"!==t.type?W:F`<button
            class="handle"
            aria-label="drag"
            @pointerdown=${e=>this.start(e,t,"move")}
            @pointermove=${this.move}
            @pointerup=${this.end}
            @pointercancel=${this.end}
          >
            <sn-icon icon="drag"></sn-icon>
          </button>`}
      ${s?W:F`<button class="badge del pressable" aria-label=${e("delete")} @click=${()=>this.removeWidget(t)}>
              <sn-icon icon="minus"></sn-icon>
            </button>
            <button class="badge cog pressable" aria-label=${e("widget_settings")} @click=${()=>Si(this.ctx,this.page.id,t.id)}>
              <sn-icon icon="cog"></sn-icon>
            </button>`}
      ${i?W:F`<div
            class="resize"
            aria-label="resize"
            @pointerdown=${e=>this.start(e,t,"resize")}
            @pointermove=${this.move}
            @pointerup=${this.end}
            @pointercancel=${this.end}
          >
            <sn-icon icon="resize"></sn-icon>
          </div>`}
    `}render(){const{ctx:t}=this,e=this.widgets;if(!e.length)return F`<div class="empty">
        <sn-icon icon="dashboard"></sn-icon>
        <strong>${t.t("empty_page")}</strong>
        ${t.isAdmin&&!t.editing?F`<span>${t.t("empty_page_admin")}</span>`:W}
      </div>`;const i=t.narrow?[...e].sort(((t,e)=>t.y-e.y||t.x-e.x)):e;return F`<div class="grid ${t.narrow?"narrow":""} ${t.editing?"editing":""}">
      ${Bi(i,(t=>t.id),(e=>{const i=t.narrow?`grid-column: span ${(t=>"tile"===t.type&&t.w<=4?2:4)(e)}; grid-row: span ${"floorplan"===e.type?1:e.h}`:`grid-column: ${e.x+1} / span ${e.w}; grid-row: ${e.y+1} / span ${e.h}`;return F`<div class="cell ${this.gesture?.id===e.id?"lifted":""}" data-id=${e.id} style=${i}>
            ${this.renderWidget(e)} ${t.editing?this.renderChrome(e):W}
          </div>`}))}
    </div>`}};Hs.styles=[Ve,a`
      :host {
        display: block;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(${ie}, minmax(0, 1fr));
        grid-auto-rows: ${44}px;
        gap: ${12}px;
        position: relative;
      }
      .grid.narrow {
        grid-template-columns: repeat(4, minmax(0, 1fr));
        grid-auto-rows: minmax(${44}px, auto);
      }
      .cell {
        position: relative;
        min-width: 0;
        min-height: 0;
      }
      .cell > :first-child {
        height: 100%;
      }
      .editing .cell {
        border-radius: var(--r-lg);
        outline: 1.5px dashed color-mix(in srgb, var(--text-2) 45%, transparent);
        outline-offset: 3px;
      }
      .cell.lifted {
        z-index: 5;
        filter: drop-shadow(0 18px 30px rgba(0, 0, 0, 0.25));
        outline-color: var(--accent);
        outline-style: solid;
      }
      .surface {
        position: absolute;
        inset: 0;
        z-index: 6;
        cursor: grab;
        touch-action: none;
        border-radius: var(--r-lg);
      }
      .lifted .surface {
        cursor: grabbing;
      }
      .badge {
        position: absolute;
        top: -10px;
        z-index: 7;
        width: 30px;
        height: 30px;
        border-radius: 999px;
        display: grid;
        place-items: center;
        background: var(--surface-solid);
        color: var(--text);
        box-shadow: var(--shadow);
        border: 1px solid var(--border);
        --icon-size: 16px;
        animation: badge-in 360ms var(--spring);
      }
      .badge.del {
        inset-inline-start: -10px;
        background: var(--alert);
        color: var(--on-alert);
        border: 0;
      }
      .badge.cog {
        inset-inline-end: -10px;
      }
      .handle {
        position: absolute;
        top: 12px;
        inset-inline-start: 12px;
        z-index: 7;
        width: 36px;
        height: 36px;
        border-radius: 999px;
        display: grid;
        place-items: center;
        background: var(--surface-solid);
        box-shadow: var(--shadow);
        cursor: grab;
        touch-action: none;
        --icon-size: 18px;
      }
      @keyframes badge-in {
        from {
          transform: scale(0.4);
          opacity: 0;
        }
      }
      .resize {
        position: absolute;
        bottom: -6px;
        inset-inline-end: -6px;
        z-index: 7;
        width: 28px;
        height: 28px;
        border-radius: 999px;
        background: var(--accent);
        color: var(--on-accent);
        display: grid;
        place-items: center;
        cursor: nwse-resize;
        touch-action: none;
        box-shadow: var(--shadow);
        --icon-size: 16px;
      }
      :host([rtl]) .resize {
        cursor: nesw-resize;
      }
      .empty {
        padding: 80px 24px;
        text-align: center;
        color: var(--text-2);
        display: grid;
        gap: 6px;
        justify-items: center;
        --icon-size: 48px;
      }
      .empty strong {
        color: var(--text);
        font-size: 18px;
      }
    `],As([ut({attribute:!1})],Hs.prototype,"ctx",2),As([ut({attribute:!1})],Hs.prototype,"page",2),As([gt()],Hs.prototype,"preview",2),Hs=As([dt("sn-page-grid")],Hs);var Ms=Object.defineProperty,Vs=Object.getOwnPropertyDescriptor,Ls=(t,e,i,s)=>{for(var n,o=s>1?void 0:s?Vs(e,i):e,a=t.length-1;a>=0;a--)(n=t[a])&&(o=(s?n(e,i,o):n(o))||o);return s&&o&&Ms(e,i,o),o};let Ss=class extends lt{constructor(){super(...arguments),this.value=0,this.label="",this.icon="",this.fill="var(--accent)",this.onFill="var(--on-accent)",this.track="",this.small=!1}from(t){const e=t.currentTarget.getBoundingClientRect();return Math.round(100*Math.min(1,Math.max(0,(e.bottom-t.clientY)/e.height)))}set(t){this.drag=t,this.onPreview?.(t)}render(){const t=this.drag??this.value,e=void 0===this.drag&&void 0!==this.display?this.display:`${t}%`,i=!!this.track,s=!i&&t>12;return F`<div
      class="track ${void 0!==this.drag?"dragging":""}"
      style=${i?`background:${this.track}`:""}
      role="slider"
      tabindex="0"
      aria-label=${this.label}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow=${t}
      @pointerdown=${t=>{t.currentTarget.setPointerCapture(t.pointerId),this.set(this.from(t))}}
      @pointermove=${t=>void 0!==this.drag&&this.set(this.from(t))}
      @pointerup=${()=>{const t=this.drag;this.set(void 0),void 0!==t&&this.onCommit?.(t)}}
      @pointercancel=${()=>this.set(void 0)}
      @keydown=${t=>{const e="ArrowUp"===t.key?10:"ArrowDown"===t.key?-10:0;e&&(t.preventDefault(),this.onCommit?.(Math.min(100,Math.max(0,this.value+e))))}}
    >
      ${i?F`<div class="thumb" style="bottom:${t}%"></div>`:F`<div class="fill" style="height:${t}%;background:${this.fill}"></div>`}
      <span class="val ${i?"on-track":""}">${e}</span>
      ${this.icon?F`<sn-icon .icon=${this.icon} style="color:${s?this.onFill:i?"#fff":"var(--text-2)"}"></sn-icon>`:W}
    </div>`}};Ss.styles=a`
    :host {
      display: block;
      width: 120px;
      height: 300px;
      max-height: 42vh;
    }
    :host([small]) {
      width: 72px;
    }
    .track {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 34px;
      background: var(--surface-2);
      overflow: hidden;
      touch-action: none;
      cursor: ns-resize;
      outline: none;
      transition: transform 200ms cubic-bezier(0.22, 1, 0.36, 1);
    }
    :host([small]) .track {
      border-radius: 24px;
    }
    .track:focus-visible {
      box-shadow: 0 0 0 3px var(--accent);
    }
    .track.dragging {
      transform: scaleX(1.04);
    }
    .fill {
      position: absolute;
      inset: auto 0 0 0;
      transition: height 160ms cubic-bezier(0.22, 1, 0.36, 1), background-color 400ms;
    }
    .dragging .fill,
    .dragging .thumb {
      transition: none;
    }
    .thumb {
      position: absolute;
      left: 14px;
      right: 14px;
      height: 6px;
      margin-bottom: -3px;
      border-radius: 3px;
      background: #fff;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
      transition: bottom 160ms cubic-bezier(0.22, 1, 0.36, 1);
    }
    .val {
      position: absolute;
      top: 16px;
      left: 0;
      right: 0;
      text-align: center;
      font-weight: 700;
      font-variant-numeric: tabular-nums;
      direction: ltr;
      color: var(--text);
      pointer-events: none;
    }
    .val.on-track {
      color: #fff;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    }
    sn-icon {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      --icon-size: 30px;
      pointer-events: none;
    }
  `,Ls([ut({type:Number})],Ss.prototype,"value",2),Ls([ut()],Ss.prototype,"label",2),Ls([ut()],Ss.prototype,"icon",2),Ls([ut()],Ss.prototype,"fill",2),Ls([ut()],Ss.prototype,"onFill",2),Ls([ut()],Ss.prototype,"track",2),Ls([ut()],Ss.prototype,"display",2),Ls([ut({type:Boolean,reflect:!0})],Ss.prototype,"small",2),Ls([ut({attribute:!1})],Ss.prototype,"onCommit",2),Ls([ut({attribute:!1})],Ss.prototype,"onPreview",2),Ls([gt()],Ss.prototype,"drag",2),Ss=Ls([dt("sn-vslider")],Ss);var zs=Object.defineProperty,Ps=Object.getOwnPropertyDescriptor,Es=(t,e,i,s)=>{for(var n,o=s>1?void 0:s?Ps(e,i):e,a=t.length-1;a>=0;a--)(n=t[a])&&(o=(s?n(e,i,o):n(o))||o);return s&&o&&zs(e,i,o),o};let Ds=class extends lt{from(t){const e=t.currentTarget.getBoundingClientRect(),i=t.clientX-(e.left+e.width/2),s=t.clientY-(e.top+e.height/2);let n=180*Math.atan2(s,i)/Math.PI;n=(360-n)%360;const o=Math.min(100,Math.hypot(i,s)/(e.width/2)*100);return[Math.round(n),Math.round(o)]}render(){const[t,e]=this.drag??this.hs??[0,0],i=-t*Math.PI/180,s=50+Math.cos(i)*e/2,n=50+Math.sin(i)*e/2;return F`<div
      class="wheel ${this.drag?"dragging":""}"
      role="slider"
      aria-label="color"
      aria-valuenow=${t}
      @pointerdown=${t=>{t.currentTarget.setPointerCapture(t.pointerId),this.drag=this.from(t)}}
      @pointermove=${t=>this.drag&&(this.drag=this.from(t))}
      @pointerup=${()=>{const t=this.drag;this.drag=void 0,t&&this.onPick?.(t)}}
      @pointercancel=${()=>this.drag=void 0}
    >
      <div class="knob" style="left:${s}%;top:${n}%;background:${It(jt(t,e))}"></div>
    </div>`}};Ds.styles=a`
    :host {
      display: block;
      width: 240px;
      max-width: 70vw;
      aspect-ratio: 1;
    }
    .wheel {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      /* Conic hue ring, faded to white toward the middle. */
      background: radial-gradient(circle closest-side, #fff 0%, rgba(255, 255, 255, 0) 100%),
        conic-gradient(from 90deg, red, magenta, blue, cyan, lime, yellow, red);
      touch-action: none;
      cursor: crosshair;
      box-shadow: 0 0 0 1px var(--border), var(--shadow);
      direction: ltr;
    }
    .knob {
      position: absolute;
      width: 34px;
      height: 34px;
      margin: -17px 0 0 -17px;
      border-radius: 50%;
      border: 4px solid #fff;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.35);
      pointer-events: none;
      transition: left 160ms cubic-bezier(0.22, 1, 0.36, 1), top 160ms cubic-bezier(0.22, 1, 0.36, 1);
    }
    .dragging .knob {
      transition: none;
      transform: scale(1.15);
    }
  `,Es([ut({type:Array})],Ds.prototype,"hs",2),Es([ut({attribute:!1})],Ds.prototype,"onPick",2),Es([gt()],Ds.prototype,"drag",2),Ds=Es([dt("sn-color-wheel")],Ds);var Os=Object.defineProperty,Ts=Object.getOwnPropertyDescriptor,js=(t,e,i,s)=>{for(var n,o=s>1?void 0:s?Ts(e,i):e,a=t.length-1;a>=0;a--)(n=t[a])&&(o=(s?n(e,i,o):n(o))||o);return s&&o&&Os(e,i,o),o};const Is=["hs","xy","rgb","rgbw","rgbww"],Ns={brightness:"lightbulb",color:"palette",temp:"thermometer"},Rs={brightness:"brightness",color:"color",temp:"white_temp"},Zs=[[0,85],[24,90],[38,88],[52,75],[130,70],[190,80],[225,85],[275,70],[325,65]],Fs={off:"power",cool:"snowflake",heat:"fire",auto:"air-conditioner",heat_cool:"air-conditioner",dry:"humidity",fan_only:"fan"};let Bs=class extends lt{constructor(){super(...arguments),this.entityId="",this.lightTab="brightness",this.wheelOpen=!1,this.confirmUnlock=!1}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this.tempTimer),window.clearTimeout(this.confirmTimer)}firstUpdated(){te(this.ctx.hass.states[this.entityId])&&this.loadHistory()}async loadHistory(){try{const t=new Date(Date.now()-864e5).toISOString(),e=await this.ctx.hass.callWS({type:"history/history_during_period",start_time:t,entity_ids:[this.entityId],minimal_response:!0,no_attributes:!0,significant_changes_only:!1});let i=Date.parse(t)/1e3;this.history=(e[this.entityId]??[]).map((t=>(i=t.lu??t.lc??i,{t:i,v:Number(t.s)}))).filter((t=>!Number.isNaN(t.v)))}catch{this.history=[]}}call(t,e,i={}){navigator.vibrate?.(5),this.ctx.hass.callService(t,e,{entity_id:this.entityId,...i}).catch((()=>this.ctx.toast(this.ctx.t("error"))))}renderLight(t){const{t:e}=this.ctx,i=t.attributes.supported_color_modes??[];if(!i.some((t=>"onoff"!==t)))return this.renderPower(t);const s=["brightness"];i.some((t=>Is.includes(t)))&&s.push("color"),i.includes("color_temp")&&s.push("temp");const n=s.includes(this.lightTab)?this.lightTab:"brightness",o="on"===t.state,a=o?t.attributes.rgb_color:void 0,r=a?It(a):"var(--accent)",l=o?Math.round((t.attributes.brightness??255)/255*100):0;let c;if("brightness"===n)c=F`<sn-vslider
        .value=${l}
        label=${e("brightness")}
        icon=${l?"lightbulb":"lightbulb-outline"}
        fill=${r}
        onFill=${a?Ot(Tt(a)):"var(--on-accent)"}
        .onCommit=${t=>t?this.call("light","turn_on",{brightness_pct:t}):this.call("light","turn_off")}
      ></sn-vslider>`;else if("color"===n){const i="color_temp"!==t.attributes.color_mode?t.attributes.hs_color:void 0,s=t=>!!i&&Math.abs((i[0]-t[0]+540)%360-180)<10&&Math.abs(i[1]-t[1])<12;c=F`<div style="display:grid;gap:22px;justify-items:center">
        <div class="swatches">
          ${Zs.map((t=>F`<button
              class="swatch pressable"
              style="background:${It(jt(t[0],t[1]))}"
              aria-pressed=${s(t)}
              aria-label=${`${t[0]}°`}
              @click=${()=>this.call("light","turn_on",{hs_color:t})}
            ></button>`))}
          <button
            class="swatch more pressable"
            aria-pressed=${this.wheelOpen}
            aria-label=${e("more_colors")}
            title=${e("more_colors")}
            @click=${()=>this.wheelOpen=!this.wheelOpen}
          >
            <sn-icon icon=${this.wheelOpen?"close":"plus"}></sn-icon>
          </button>
        </div>
        ${this.wheelOpen?F`<sn-color-wheel class="reveal" .hs=${i} .onPick=${t=>this.call("light","turn_on",{hs_color:t})}></sn-color-wheel>`:W}
      </div>`}else{const i=t.attributes.min_color_temp_kelvin??2e3,s=t.attributes.max_color_temp_kelvin??6500,n="color_temp"===t.attributes.color_mode?t.attributes.color_temp_kelvin:void 0,o="number"==typeof n?Math.round((n-i)/(s-i)*100):50,a=t=>50*Math.round((i+(s-i)*t/100)/50);c=F`<sn-vslider
        .value=${o}
        label=${e("white_temp")}
        icon="lightbulb"
        track="linear-gradient(to top, #FFA94D, #FFE4C2 45%, #F4F7FF 75%, #BFD6FF)"
        .display=${"number"==typeof n?`${n}K`:"–"}
        .onCommit=${t=>this.call("light","turn_on",{color_temp_kelvin:a(t)})}
      ></sn-vslider>`}return F`${c}
      ${s.length>1?F`<div class="seg" role="tablist">
            ${s.map((t=>F`<button role="tab" aria-pressed=${t===n} @click=${()=>this.lightTab=t}>
                <sn-icon .icon=${Ns[t]} style="--icon-size:18px"></sn-icon>${e(Rs[t])}
              </button>`))}
          </div>`:W}`}renderPower(t){const e=Ft(t);return F`<button
      class="power pressable ${e?"on":""}"
      aria-pressed=${e}
      aria-label=${this.ctx.t(e?"turn_off":"turn_on")}
      @click=${()=>this.call("homeassistant","toggle")}
    >
      <sn-icon icon="power"></sn-icon>
    </button>`}renderClimate(t){const{t:e,lang:i}=this.ctx,s=t.attributes.target_temp_step??("°F"===t.attributes.temperature_unit?1:.5),n=this.pendingTemp??t.attributes.temperature,o=t.attributes.min_temp??16,a=t.attributes.max_temp??30,r=t=>{if("number"!=typeof n)return;const e=Math.min(a,Math.max(o,Math.round((n+t)/s)*s));this.pendingTemp=e,window.clearTimeout(this.tempTimer),this.tempTimer=window.setTimeout((()=>{this.call("climate","set_temperature",{temperature:e}),window.setTimeout((()=>this.pendingTemp=void 0),1500)}),700)},l=t.attributes.hvac_modes??[];return F`
      ${"number"==typeof n&&"off"!==t.state?F`<div class="temp">
            <button class="icon-btn pressable" aria-label="-" @click=${()=>r(-s)}><sn-icon icon="minus"></sn-icon></button>
            <span class="value ltr">${Yt(n,i)}°</span>
            <button class="icon-btn pressable" aria-label="+" @click=${()=>r(s)}><sn-icon icon="plus"></sn-icon></button>
          </div>`:this.renderPower(t)}
      ${"number"==typeof t.attributes.current_temperature?F`<div class="sub">${e("current_temp")} ${Xt(`${Yt(t.attributes.current_temperature,i)}°`)}</div>`:W}
      ${l.length?F`<div class="seg">
            ${l.map((i=>F`<button aria-pressed=${t.state===i} @click=${()=>this.call("climate","set_hvac_mode",{hvac_mode:i})}>
                <sn-icon .icon=${Fs[i]??"air-conditioner"} style="--icon-size:18px"></sn-icon>${St(i)?e(i):i}
              </button>`))}
          </div>`:W}
    `}renderVacuum(t){const e={id:"sheet",type:"vacuum",x:0,y:0,w:12,h:9,config:{entity:t.entity_id}};return F`<sn-w-vacuum compact .ctx=${this.ctx} .widget=${e} style="width:100%"></sn-w-vacuum>`}renderCover(t){const{t:e}=this.ctx,i=t.attributes.supported_features??0,s=t.attributes.current_position,n=t.attributes.current_tilt_position,o=t=>!i||!!(i&t);return F`${"number"==typeof s||"number"==typeof n?F`<div class="controls">
            ${"number"==typeof s?F`<sn-vslider
                  .value=${s}
                  label=${e("position")}
                  icon=${s?"blinds":"blinds-closed"}
                  .onCommit=${t=>this.call("cover","set_cover_position",{position:t})}
                ></sn-vslider>`:W}
            ${"number"==typeof n?F`<div style="display:grid;gap:8px;justify-items:center">
                  <sn-vslider
                    small
                    .value=${n}
                    label=${e("tilt")}
                    icon="blinds"
                    fill="var(--cool)"
                    onFill="var(--on-cool)"
                    .onCommit=${t=>this.call("cover","set_cover_tilt_position",{tilt_position:t})}
                  ></sn-vslider>
                  <span class="sub">${e("tilt")}</span>
                </div>`:W}
          </div>`:W}
      <div class="actions">
        ${o(1)?F`<button class="btn pressable" @click=${()=>this.call("cover","open_cover")}><sn-icon icon="chevron-up"></sn-icon>${e("cover_open")}</button>`:W}
        ${o(8)?F`<button class="btn pressable" @click=${()=>this.call("cover","stop_cover")}><sn-icon icon="stop"></sn-icon>${e("stop")}</button>`:W}
        ${o(2)?F`<button class="btn pressable" @click=${()=>this.call("cover","close_cover")}><sn-icon icon="chevron-down"></sn-icon>${e("cover_close")}</button>`:W}
      </div>`}renderLock(t){const{t:e}=this.ctx;return"unlocked"===t.state||"open"===t.state?F`<button class="btn primary pressable lock-btn" @click=${()=>this.call("lock","lock")}><sn-icon icon="lock"></sn-icon>${e("lock")}</button>`:this.confirmUnlock?F`<button
        class="btn danger pressable lock-btn"
        @click=${()=>{this.confirmUnlock=!1,this.call("lock","unlock")}}
      >
        <sn-icon icon="lock-open"></sn-icon>${e("unlock_confirm")}
      </button>`:F`<button
      class="btn pressable lock-btn"
      @click=${()=>{this.confirmUnlock=!0,window.clearTimeout(this.confirmTimer),this.confirmTimer=window.setTimeout((()=>this.confirmUnlock=!1),4e3)}}
    >
      <sn-icon icon="lock-open"></sn-icon>${e("unlock")}
    </button>`}renderChart(t){const e=this.history;if(!e||e.length<2)return W;const{lang:i,t:s}=this.ctx,n=e[0].t,o=Date.now()/1e3,a=e.map((t=>t.v)),r=Math.min(...a),l=Math.max(...a),c=l-r||1,d=t=>100-(t-r)/c*90-5;let p=`M0 ${d(e[0].v)}`;for(let g=1;g<e.length;g++)p+=` H${h=e[g].t,(h-n)/(o-n||1)*300} V${d(e[g].v)}`;var h;p+=" H300";const u=t.attributes.unit_of_measurement??"";return F`<div class="chart">
      <div class="sub">${s("history_24h")}</div>
      <svg viewBox="0 0 300 100" preserveAspectRatio="none" class="ltr">
        ${B`<path d="${p} V100 H0 Z" fill="var(--accent)" opacity=".14"></path>
        <path d=${p} fill="none" stroke="var(--accent)" stroke-width="2" vector-effect="non-scaling-stroke" stroke-linejoin="round"></path>`}
      </svg>
      <div class="labels ltr"><span>${Yt(r,i)} ${u}</span><span>${Yt(l,i)} ${u}</span></div>
    </div>`}renderBody(t){switch(Nt(t.entity_id)){case"light":return this.renderLight(t);case"climate":return this.renderClimate(t);case"vacuum":return this.renderVacuum(t);case"cover":return this.renderCover(t);case"lock":return this.renderLock(t);case"camera":{const e=ns(this.ctx.hass,t.entity_id);return e?F`<div class="live"><img src=${e} alt="" /></div>`:W}case"sensor":return this.renderChart(t);case"switch":case"fan":case"input_boolean":case"media_player":case"automation":case"humidifier":case"siren":return this.renderPower(t);case"scene":case"script":return F`<button class="btn primary pressable" @click=${()=>this.call(Nt(t.entity_id),"turn_on")}>
          <sn-icon icon="play"></sn-icon>${this.ctx.t("start")}
        </button>`;default:return W}}render(){const{ctx:t}=this,e=t.hass.states[this.entityId];if(!e)return F`<div class="sub">${t.t("unavailable")}</div>`;if("vacuum"===Nt(e.entity_id)&&"unavailable"!==e.state)return this.renderVacuum(e);const i=Ft(e),s="unavailable"===e.state;return F`
      <div class="head">
        <span class="big-ic ${i?"on":""}" style=${Bt(e)}>
          <sn-icon .icon=${Ut(e,this.entityId)}></sn-icon>
        </span>
        <span class="state">${Gt(t.t,e,t.lang)}</span>
        <span class="sub">${t.t("last_changed")} ${Qt(t.t,e.last_changed)}</span>
      </div>
      ${s?W:this.renderBody(e)}
    `}};Bs.styles=[Ve,a`
      :host {
        display: grid;
        gap: 22px;
        justify-items: center;
        padding-bottom: 8px;
      }
      .head {
        display: grid;
        justify-items: center;
        gap: 6px;
        text-align: center;
      }
      .big-ic {
        display: grid;
        place-items: center;
        width: 72px;
        height: 72px;
        border-radius: 999px;
        background: var(--surface-2);
        color: var(--text-2);
        --icon-size: 36px;
        transition: background-color var(--dur) var(--ease-out), color var(--dur) var(--ease-out);
      }
      .big-ic.on {
        background: var(--tone);
        color: var(--on-tone);
      }
      .state {
        unicode-bidi: plaintext;
        font-size: 22px;
        font-weight: 700;
      }
      .sub {
        font-size: 13px;
        color: var(--text-2);
      }
      .controls {
        display: flex;
        gap: 16px;
        justify-content: center;
        align-items: flex-start;
      }
      .swatches {
        display: grid;
        grid-template-columns: repeat(5, 48px);
        gap: 14px;
        justify-content: center;
      }
      .swatch {
        width: 48px;
        height: 48px;
        border-radius: 999px;
        box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08);
        transition: transform var(--dur-fast) var(--spring), box-shadow var(--dur-fast) var(--ease-out);
      }
      .swatch[aria-pressed="true"] {
        box-shadow: 0 0 0 3px var(--surface-solid), 0 0 0 5px var(--text);
        transform: scale(1.06);
      }
      .swatch.more {
        display: grid;
        place-items: center;
        background: conic-gradient(red, yellow, lime, cyan, blue, magenta, red);
        color: #fff;
        --icon-size: 22px;
      }
      .swatch.more sn-icon {
        filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5));
      }
      .reveal {
        animation: reveal 420ms var(--spring);
      }
      @keyframes reveal {
        from {
          opacity: 0;
          transform: scale(0.92);
        }
      }
      .power {
        width: 96px;
        height: 96px;
        border-radius: 999px;
        display: grid;
        place-items: center;
        background: var(--surface-2);
        color: var(--text-2);
        --icon-size: 40px;
      }
      .power.on {
        background: var(--accent);
        color: var(--on-accent);
      }
      .temp {
        direction: ltr; /* minus on the left, plus on the right, in every language */
        display: flex;
        align-items: center;
        gap: 24px;
      }
      .temp .value {
        font-size: 64px;
        font-weight: 700;
        min-width: 3.2ch;
        text-align: center;
        font-variant-numeric: tabular-nums;
        letter-spacing: -0.02em;
      }
      .temp .icon-btn {
        width: 56px;
        height: 56px;
        --icon-size: 28px;
      }
      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: center;
      }
      .live {
        width: 100%;
        aspect-ratio: 16 / 9;
        border-radius: var(--r-md);
        overflow: hidden;
        background: #0d1114;
      }
      .live img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      .chart {
        width: 100%;
        display: grid;
        gap: 6px;
      }
      .chart svg {
        width: 100%;
        height: 120px;
        overflow: visible;
      }
      .chart .labels {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: var(--text-2);
        font-variant-numeric: tabular-nums;
      }
      .lock-btn {
        min-width: 200px;
        min-height: 56px;
        font-size: 17px;
      }
    `],js([ut({attribute:!1})],Bs.prototype,"ctx",2),js([ut()],Bs.prototype,"entityId",2),js([gt()],Bs.prototype,"lightTab",2),js([gt()],Bs.prototype,"wheelOpen",2),js([gt()],Bs.prototype,"pendingTemp",2),js([gt()],Bs.prototype,"confirmUnlock",2),js([gt()],Bs.prototype,"history",2),Bs=js([dt("sn-entity-detail")],Bs);var Us=Object.defineProperty,Ws=Object.getOwnPropertyDescriptor,qs=(t,e,i,s)=>{for(var n,o=s>1?void 0:s?Ws(e,i):e,a=t.length-1;a>=0;a--)(n=t[a])&&(o=(s?n(e,i,o):n(o))||o);return s&&o&&Us(e,i,o),o};let Xs=class extends lt{constructor(){super(...arguments),this.at=new Date,this.silent=!1,this.confirm=!1}connectedCallback(){super.connectedCallback(),this.silent||function(){try{const t=new AudioContext,e=(e,i)=>{const s=t.createOscillator(),n=t.createGain();s.type="sine",s.frequency.value=e,n.gain.setValueAtTime(1e-4,t.currentTime+i),n.gain.exponentialRampToValueAtTime(.35,t.currentTime+i+.02),n.gain.exponentialRampToValueAtTime(1e-4,t.currentTime+i+1.2),s.connect(n).connect(t.destination),s.start(t.currentTime+i),s.stop(t.currentTime+i+1.3)};e(659.25,0),e(523.25,.45),window.setTimeout((()=>t.close()),2500)}catch{}}(),navigator.vibrate?.([120,80,120])}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this.timer)}render(){const{ctx:t}=this,{t:e}=t,i=t.config.settings.doorbell,s=i.camera_entity,n=s?ns(t.hass,s)??ss(t.hass,s,Date.now()):void 0,o=i.lock_entity?t.hass.states[i.lock_entity]:void 0;return F`<div class="scrim" @click=${t=>t.target===t.currentTarget&&this.onDismiss()}>
      <div class="card" role="alertdialog" aria-label=${e("someone_at_door")}>
        ${n?F`<div class="video"><img src=${n} alt="" /><span class="live">${e("streaming")}</span></div>`:W}
        <div class="foot">
          <span class="bell"><sn-icon icon="bell-ring"></sn-icon></span>
          <span class="title">
            <strong>${e("someone_at_door")}</strong>
            <span class="muted">${s?Rt(t.hass,t.config,s)+" · ":""}${this.at.toLocaleTimeString(zt[t.lang],{hour:"2-digit",minute:"2-digit"})}</span>
          </span>
          <button class="btn pressable" @click=${()=>this.onDismiss()}>${e("dismiss")}</button>
          ${o&&"unlocked"!==o.state?this.confirm?F`<button
                  class="btn danger pressable"
                  @click=${()=>{t.hass.callService("lock","unlock",{entity_id:o.entity_id}).catch((()=>t.toast(e("error")))),this.onDismiss()}}
                >
                  <sn-icon icon="lock-open"></sn-icon>${e("unlock_confirm")}
                </button>`:F`<button
                  class="btn primary pressable"
                  @click=${()=>{this.confirm=!0,window.clearTimeout(this.timer),this.timer=window.setTimeout((()=>this.confirm=!1),4e3)}}
                >
                  <sn-icon icon="lock-open"></sn-icon>${e("open_door")}
                </button>`:W}
        </div>
      </div>
    </div>`}};Xs.styles=[Ve,a`
      .scrim {
        position: fixed;
        inset: 0;
        z-index: 80;
        display: grid;
        place-items: center;
        padding: 24px;
        background: rgba(8, 10, 12, 0.6);
        -webkit-backdrop-filter: blur(14px);
        backdrop-filter: blur(14px);
        animation: fade 300ms var(--ease-out);
      }
      .card {
        width: min(760px, 100%);
        border-radius: var(--r-xl);
        overflow: hidden;
        background: var(--surface-solid);
        color: var(--text);
        box-shadow: var(--shadow-lift);
        animation: pop 560ms var(--spring);
      }
      .video {
        position: relative;
        aspect-ratio: 16 / 9;
        background: #0d1114;
      }
      .video img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      .live {
        position: absolute;
        top: 14px;
        inset-inline-start: 14px;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 5px 10px;
        border-radius: 999px;
        background: rgba(21, 26, 30, 0.6);
        color: #fff;
        font-size: 12px;
        font-weight: 700;
      }
      .live::before {
        content: "";
        width: 8px;
        height: 8px;
        border-radius: 999px;
        background: var(--alert);
        animation: blink 1.2s infinite;
      }
      .foot {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 18px 20px;
        flex-wrap: wrap;
      }
      .bell {
        display: grid;
        place-items: center;
        width: 52px;
        height: 52px;
        border-radius: 999px;
        background: var(--accent);
        color: var(--on-accent);
        animation: ring 1s var(--ease-out) 3;
      }
      .title {
        flex: 1;
        min-width: 160px;
        display: grid;
      }
      .title strong {
        font-size: 20px;
      }
      .btn {
        min-height: 52px;
        padding: 0 22px;
      }
      @keyframes fade {
        from {
          opacity: 0;
        }
      }
      @keyframes pop {
        from {
          transform: scale(0.9) translateY(30px);
          opacity: 0;
        }
      }
      @keyframes blink {
        50% {
          opacity: 0.3;
        }
      }
      @keyframes ring {
        0%,
        100% {
          transform: rotate(0);
        }
        20% {
          transform: rotate(14deg);
        }
        40% {
          transform: rotate(-12deg);
        }
        60% {
          transform: rotate(8deg);
        }
        80% {
          transform: rotate(-4deg);
        }
      }
    `],qs([ut({attribute:!1})],Xs.prototype,"ctx",2),qs([ut({attribute:!1})],Xs.prototype,"at",2),qs([ut({attribute:!1})],Xs.prototype,"onDismiss",2),qs([ut({type:Boolean})],Xs.prototype,"silent",2),qs([gt()],Xs.prototype,"confirm",2),Xs=qs([dt("sn-doorbell")],Xs);var Ys=Object.defineProperty,Ks=Object.getOwnPropertyDescriptor,Gs=(t,e,i,s)=>{for(var n,o=s>1?void 0:s?Ks(e,i):e,a=t.length-1;a>=0;a--)(n=t[a])&&(o=(s?n(e,i,o):n(o))||o);return s&&o&&Ys(e,i,o),o};const Js=["20% 30%","80% 25%","70% 80%","25% 75%","50% 50%"];let Qs=class extends lt{constructor(){super(...arguments),this.now=new Date,this.drift={x:0,y:0},this.slides=[],this.photos=[],this.photoIdx=0,this.alive=!1}connectedCallback(){super.connectedCallback(),this.alive=!0,this.timer=window.setInterval((()=>{this.now=new Date,this.now.getSeconds()<10&&(this.drift={x:Math.round(60*Math.random()-30),y:Math.round(40*Math.random()-20)})}),1e4),this.loadPhotos()}disconnectedCallback(){super.disconnectedCallback(),this.alive=!1,window.clearInterval(this.timer),window.clearTimeout(this.photoTimer)}async loadPhotos(){const t=this.ctx.config.settings.screensaver;if(t.photos){try{const e=await this.ctx.hass.callWS({type:"media_source/browse_media",media_content_id:`media-source://media_source/local/${t.photo_folder}`});this.photos=(e.children??[]).filter((t=>"image"===t.media_class)).map((t=>t.media_content_id))}catch{this.photos=[]}for(let t=this.photos.length-1;t>0;t--){const e=Math.floor(Math.random()*(t+1));[this.photos[t],this.photos[e]]=[this.photos[e],this.photos[t]]}this.photos.length&&this.next()}}async next(){if(!this.alive||!this.photos.length)return;const t=this.photos[this.photoIdx++%this.photos.length],e=Math.max(5,this.ctx.config.settings.screensaver.photo_seconds);try{const{url:e}=await this.ctx.hass.callWS({type:"media_source/resolve_media",media_content_id:t}),i=this.ctx.hass.hassUrl(e);if(await new Promise(((t,e)=>{const s=new Image;s.onload=()=>t(),s.onerror=()=>e(),s.src=i})),!this.alive)return;const s={url:i,key:Date.now(),origin:Js[this.photoIdx%Js.length]};this.slides=[...this.slides.slice(-1),s]}catch{}this.photoTimer=window.setTimeout((()=>this.next()),1e3*e)}renderClock(t,e){const{ctx:i}=this,s=i.config.settings.screensaver.temp_entity,n=s?i.hass.states[s]:void 0;return F`<div class=${e?"corner":"center"} style="transform:translate(${this.drift.x}px, ${this.drift.y}px)">
      <div class="time ltr">${this.now.toLocaleTimeString(t,{hour:"2-digit",minute:"2-digit"})}</div>
      <div class="date">${this.now.toLocaleDateString(t,{weekday:"long",day:"numeric",month:"long"})}</div>
      ${n?F`<div class="temp ltr">${Jt(i.t,n,i.lang)}</div>`:W}
    </div>`}render(){const{ctx:t}=this,e=zt[t.lang],i=this.slides.length>0,s=Math.max(5,t.config.settings.screensaver.photo_seconds)+2;return F`<div
      class="ss ${i?"photos":""}"
      style="--gx:${30+this.drift.x/2}%;--gy:${55+this.drift.y/2}%"
      @click=${t=>{t.stopPropagation(),this.onWake()}}
    >
      ${Bi(this.slides,(t=>t.key),((t,e)=>F`<div
          class="photo ${e<this.slides.length-1?"out":""}"
          style="background-image:url('${t.url}');transform-origin:${t.origin};--dur:${s}s"
        ></div>`))}
      ${i?F`<div class="shade"></div>`:W} ${this.renderClock(e,i)}
      <div class="brand">
        <img src="${t.assetBase}logo/smartnest-symbol-white.svg" alt="" />
        <span>SmartNest${i?"":F` · ${t.t("tagline")}`}</span>
      </div>
    </div>`}};Qs.styles=[Ve,a`
      .ss {
        position: fixed;
        inset: 0;
        z-index: 70;
        color: #fff;
        background: radial-gradient(60% 70% at var(--gx, 30%) var(--gy, 55%), rgba(233, 151, 29, 0.22), rgba(233, 151, 29, 0) 70%), #1e252b;
        display: grid;
        place-items: center;
        cursor: none;
        overflow: hidden;
        animation: fade 900ms var(--ease-out);
      }
      .center {
        display: grid;
        justify-items: center;
        gap: 10px;
        transition: transform 4s var(--ease-out);
      }
      .time {
        font-size: clamp(96px, 18vw, 220px);
        font-weight: 700;
        line-height: 0.95;
        letter-spacing: -0.03em;
        font-variant-numeric: tabular-nums;
      }
      .date {
        font-size: clamp(20px, 2.6vw, 30px);
        color: #9aa4ad;
      }
      .temp {
        font-size: clamp(28px, 3.4vw, 40px);
        font-weight: 500;
        color: #e9971d;
      }
      .brand {
        position: absolute;
        bottom: 40px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        gap: 10px;
        opacity: 0.7;
        font-size: 14px;
        color: #9aa4ad;
        white-space: nowrap;
      }
      .brand img {
        width: 28px;
        height: 28px;
      }
      /* Photo frame */
      .photo {
        position: absolute;
        inset: 0;
        background: center / cover no-repeat;
        animation: in 2s var(--ease-out) both, kenburns var(--dur) linear both;
      }
      .photo.out {
        animation: out 2s var(--ease-in) both;
      }
      .shade {
        position: absolute;
        inset: auto 0 0 0;
        height: 55%;
        background: linear-gradient(to top, rgba(10, 12, 14, 0.75), transparent);
      }
      .corner {
        position: absolute;
        bottom: 48px;
        inset-inline-start: 56px;
        display: grid;
        gap: 6px;
        text-shadow: 0 2px 16px rgba(0, 0, 0, 0.45);
        transition: transform 4s var(--ease-out);
      }
      .corner .time {
        font-size: clamp(64px, 10vw, 128px);
      }
      .corner .date {
        color: rgba(255, 255, 255, 0.85);
      }
      .photos .brand {
        left: auto;
        transform: none;
        inset-inline-end: 56px;
        bottom: 56px;
        opacity: 0.85;
      }
      @media (max-width: 700px) {
        .corner {
          inset-inline-start: 24px;
          bottom: 28px;
        }
        .photos .brand span {
          display: none;
        }
        .photos .brand {
          inset-inline-end: 24px;
          bottom: 28px;
        }
      }
      @keyframes fade {
        from {
          opacity: 0;
        }
      }
      @keyframes in {
        from {
          opacity: 0;
        }
      }
      @keyframes out {
        to {
          opacity: 0;
        }
      }
      @keyframes kenburns {
        from {
          transform: scale(1);
        }
        to {
          transform: scale(1.12);
        }
      }
    `],Gs([ut({attribute:!1})],Qs.prototype,"ctx",2),Gs([ut({attribute:!1})],Qs.prototype,"onWake",2),Gs([gt()],Qs.prototype,"now",2),Gs([gt()],Qs.prototype,"drift",2),Gs([gt()],Qs.prototype,"slides",2),Qs=Gs([dt("sn-screensaver")],Qs);var tn=Object.defineProperty,en=Object.getOwnPropertyDescriptor,sn=(t,e,i,s)=>{for(var n,o=s>1?void 0:s?en(e,i):e,a=t.length-1;a>=0;a--)(n=t[a])&&(o=(s?n(e,i,o):n(o))||o);return s&&o&&tn(e,i,o),o};function nn(t,e){const i={particles:"none",density:0,clouds:0,sun:!1,moon:!1,fog:!1,lightning:!1},s=e?{particles:"stars",density:.5,moon:!0}:{sun:!0};switch(t){case"sunny":case"clear-night":return{...i,...s};case"partlycloudy":return{...i,...s,clouds:1};case"cloudy":return{...i,clouds:3};case"windy":case"windy-variant":return{...i,clouds:2};case"fog":return{...i,fog:!0,clouds:1};case"rainy":return{...i,particles:"rain",density:.9,clouds:2};case"pouring":return{...i,particles:"rain",density:2.2,clouds:3};case"lightning":return{...i,clouds:3,lightning:!0};case"lightning-rainy":return{...i,particles:"rain",density:1.6,clouds:3,lightning:!0};case"snowy":case"snowy-rainy":case"hail":return{...i,particles:"snow",density:.6,clouds:2};default:return e?{...i,...s}:i}}let on=class extends lt{constructor(){super(...arguments),this.condition="",this.night=!1,this.dark=!1,this.raf=0,this.parts=[],this.scene=nn("",!1),this.last=0,this.flash=0,this.reduced=matchMedia("(prefers-reduced-motion: reduce)").matches,this.onVisible=()=>{cancelAnimationFrame(this.raf),"visible"===document.visibilityState&&this.loop(0)},this.loop=t=>{const e=this.canvas,i=e?.getContext("2d");e&&i&&((t-this.last>=33||0===t)&&(this.last=t,this.draw(i,e,t)),this.reduced||!this.parts.length&&!this.scene.lightning||(this.raf=requestAnimationFrame(this.loop)))}}connectedCallback(){super.connectedCallback(),document.addEventListener("visibilitychange",this.onVisible)}disconnectedCallback(){super.disconnectedCallback(),cancelAnimationFrame(this.raf),this.ro?.disconnect(),document.removeEventListener("visibilitychange",this.onVisible)}updated(t){(t.has("condition")||t.has("night"))&&(this.scene=nn(this.condition,this.night),this.seed()),this.ro||(this.ro=new ResizeObserver((()=>this.seed())),this.ro.observe(this)),cancelAnimationFrame(this.raf),this.loop(0)}get canvas(){return this.renderRoot.querySelector("canvas")}seed(){const t=this.canvas;if(!t)return;const e=Math.min(window.devicePixelRatio||1,1.5);t.width=Math.round(t.clientWidth*e),t.height=Math.round(t.clientHeight*e);const{particles:i,density:s}=this.scene,n="none"===i?0:Math.min(350,Math.round(t.clientWidth*t.clientHeight/1e4*s));this.parts=Array.from({length:n},(()=>({x:Math.random()*t.width,y:Math.random()*t.height,v:"rain"===i?9+7*Math.random():"snow"===i?.6+1.2*Math.random():Math.random()*Math.PI*2,s:"stars"===i?.5+1.4*Math.random():"snow"===i?1.5+2.5*Math.random():10+14*Math.random(),a:.25+.55*Math.random()})))}draw(t,e,i){t.clearRect(0,0,e.width,e.height);const{particles:s}=this.scene,n=e.width/(e.clientWidth||1);if("rain"===s){t.strokeStyle=this.dark?"rgba(180,210,255,1)":"rgba(70,100,130,1)",t.lineWidth=1.2*n,t.lineCap="round";for(const i of this.parts)t.globalAlpha=i.a*(this.dark?.45:.3),t.beginPath(),t.moveTo(i.x,i.y),t.lineTo(i.x-.18*i.s*n,i.y+i.s*n),t.stroke(),i.y+=i.v*n,i.x-=.18*i.v*n,i.y>e.height&&(i.y=-i.s*n,i.x=Math.random()*e.width*1.2)}else if("snow"===s){t.fillStyle=this.dark?"#fff":"rgba(150,170,190,1)";for(const s of this.parts)t.globalAlpha=.8*s.a,t.beginPath(),t.arc(s.x+12*Math.sin(i/1400+s.y/60)*n,s.y,s.s*n,0,2*Math.PI),t.fill(),s.y+=s.v*n,s.y>e.height+10&&(s.y=-10,s.x=Math.random()*e.width)}else if("stars"===s){t.fillStyle="#fff";for(const e of this.parts)t.globalAlpha=(this.dark?.85:.35)*(.45+.55*Math.abs(Math.sin(i/1800+e.v))),t.beginPath(),t.arc(e.x,.7*e.y,e.s*n,0,2*Math.PI),t.fill()}if(t.globalAlpha=1,this.scene.lightning&&!this.reduced&&i>this.flash){this.flash=i+6e3+8e3*Math.random();const t=this.renderRoot.querySelector(".flash");t?.animate([{opacity:0},{opacity:.9},{opacity:.1},{opacity:.6},{opacity:0}],{duration:650,easing:"ease-out"})}}render(){const t=this.scene,e=this.dark?"rgba(140,155,170,.18)":"rgba(255,255,255,.55)";return F`<div style="--cloud:${e}">
      ${t.sun?F`<div class="sun"></div>`:W} ${t.moon?F`<div class="moon"></div>`:W}
      ${Array.from({length:t.clouds},((t,e)=>F`<div class="cloud" style="top:${8+22*e}%;animation-duration:${90+35*e}s;animation-delay:-${31*e}s"></div>`))}
      ${t.fog?F`<div class="fog"></div>`:W}
      <canvas></canvas>
      <div class="flash"></div>
    </div>`}};on.styles=a`
    :host {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      overflow: hidden;
    }
    canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }
    .sun {
      position: absolute;
      width: 70vmax;
      height: 70vmax;
      top: -30vmax;
      inset-inline-end: -22vmax;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255, 196, 92, 0.32) 0%, rgba(255, 170, 60, 0.12) 35%, transparent 65%);
      animation: breathe 9s ease-in-out infinite alternate;
    }
    .moon {
      position: absolute;
      width: 46vmax;
      height: 46vmax;
      top: -18vmax;
      inset-inline-end: -14vmax;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(220, 230, 255, 0.16) 0%, rgba(200, 215, 255, 0.05) 40%, transparent 65%);
    }
    .cloud {
      position: absolute;
      height: 26vmax;
      width: 60vmax;
      border-radius: 50%;
      background: var(--cloud);
      filter: blur(40px);
      animation: drift linear infinite;
    }
    .fog {
      position: absolute;
      inset: 30% -20% -10% -20%;
      background: linear-gradient(to top, var(--cloud), transparent);
      filter: blur(30px);
      animation: drift 60s linear infinite alternate;
    }
    .flash {
      position: absolute;
      inset: 0;
      background: rgba(255, 255, 255, 0.5);
      opacity: 0;
    }
    @keyframes breathe {
      to {
        transform: scale(1.08);
        opacity: 0.8;
      }
    }
    @keyframes drift {
      from {
        transform: translateX(-30vw);
      }
      to {
        transform: translateX(110vw);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .sun,
      .cloud,
      .fog {
        animation: none;
      }
    }
  `,sn([ut()],on.prototype,"condition",2),sn([ut({type:Boolean})],on.prototype,"night",2),sn([ut({type:Boolean})],on.prototype,"dark",2),on=sn([dt("sn-weather-bg")],on);var an=Object.defineProperty,rn=Object.getOwnPropertyDescriptor,ln=(t,e,i,s)=>{for(var n,o=s>1?void 0:s?rn(e,i):e,a=t.length-1;a>=0;a--)(n=t[a])&&(o=(s?n(e,i,o):n(o))||o);return s&&o&&an(e,i,o),o};const cn={away:"scene_away",home:"scene_home",sleep:"scene_sleep",evening:"scene_evening"},dn={away:4200,home:3e3,sleep:3800,evening:3e3};let pn=class extends lt{constructor(){super(...arguments),this.mode="",this.locks=[]}connectedCallback(){super.connectedCallback(),this.locks="away"===this.mode?function(t){const e=new Set;for(const s of t.config.pages)for(const t of s.widgets){t.config.entity&&e.add(t.config.entity);for(const i of t.config.floors??[])for(const t of i.markers??[])e.add(t.entity)}const i=[...e].filter((e=>"lock"===Nt(e)&&t.hass.states[e]));return(i.length?i:Object.keys(t.hass.states).filter((t=>"lock"===Nt(t)))).slice(0,4)}(this.ctx):[],this.timer=window.setTimeout((()=>this.onDone()),dn[this.mode]??3e3)}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this.timer)}renderSleep(){const t=Array.from({length:40},((t,e)=>({x:137.5*e%100,y:61.8*e%60,d:e%7*.25})));return F`<div class="moon"></div>
      ${t.map((t=>F`<span class="star" style="left:${t.x}%;top:${t.y}%;animation-delay:${.6+t.d}s"></span>`))}`}renderAway(){const{ctx:t}=this;return this.locks.length?F`<div class="locks">
      ${this.locks.map(((e,i)=>{const s=.9+.45*i+"s";return F`<div class="lock" style="animation-delay:${s}">
          <span class="ic" style="animation-delay:${s}"><sn-icon icon="lock"></sn-icon></span>
          ${Rt(t.hass,t.config,e)}
          <sn-icon class="ok" icon="check-circle" style="animation-delay:calc(${s} + 0.35s)"></sn-icon>
        </div>`}))}
    </div>`:W}render(){const{t:t}=this.ctx;return F`<div
      class="stage ${this.mode}"
      style="--len:${dn[this.mode]??3e3}ms"
      role="status"
      @click=${()=>this.onDone()}
    >
      ${"sleep"===this.mode?this.renderSleep():W}
      <div class="content">
        <div class="title">${t(cn[this.mode]??"done")}</div>
        ${"away"===this.mode?F`${this.locks.length?F`<div class="sub">${t("scene_locking")}</div>`:W}${this.renderAway()}`:W}
      </div>
    </div>`}};pn.styles=[Ve,a`
      .stage {
        position: fixed;
        inset: 0;
        z-index: 85;
        display: grid;
        place-items: center;
        color: #fff;
        overflow: hidden;
        animation: stage var(--len) var(--ease-out) both;
      }
      @keyframes stage {
        0% {
          opacity: 0;
        }
        12% {
          opacity: 1;
        }
        84% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
      .title {
        position: relative;
        font-size: clamp(34px, 6vw, 64px);
        font-weight: 700;
        letter-spacing: -0.01em;
        text-align: center;
        animation: title 1.4s var(--ease-out) 0.5s both;
        text-shadow: 0 4px 30px rgba(0, 0, 0, 0.35);
      }
      @keyframes title {
        from {
          opacity: 0;
          transform: translateY(18px);
          filter: blur(6px);
        }
      }
      .content {
        display: grid;
        justify-items: center;
        gap: 28px;
        position: relative;
      }

      /* Sleep: night sky, rising moon, stars */
      .sleep {
        background: radial-gradient(120% 90% at 50% 110%, #2a3550 0%, #121826 45%, #07090f 100%);
      }
      .moon {
        position: absolute;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background: radial-gradient(circle at 35% 35%, #fff8e6, #f5d9a0 60%, #e9b866);
        box-shadow: 0 0 80px 20px rgba(245, 217, 160, 0.35);
        top: 18%;
        inset-inline-end: 18%;
        animation: rise 2.6s var(--ease-out) both;
      }
      .moon::after {
        /* crescent shadow */
        content: "";
        position: absolute;
        inset: -14px -34px 18px 44px;
        border-radius: 50%;
        background: #131a29;
      }
      @keyframes rise {
        from {
          transform: translateY(60vh);
          opacity: 0;
        }
      }
      .star {
        position: absolute;
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background: #fff;
        animation: twinkle 2.2s ease-in-out infinite alternate both;
      }
      @keyframes twinkle {
        from {
          opacity: 0;
        }
        to {
          opacity: 0.9;
        }
      }

      /* Away: charcoal, locks clicking shut */
      .away {
        background: radial-gradient(70% 70% at 50% 40%, #2a333b, #151a1e);
      }
      .locks {
        display: grid;
        gap: 10px;
        min-width: min(360px, 80vw);
      }
      .lock {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 12px 16px;
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.06);
        font-size: 17px;
        font-weight: 500;
        animation: row 500ms var(--ease-out) both;
      }
      @keyframes row {
        from {
          opacity: 0;
          transform: translateY(12px);
        }
      }
      .lock .ic {
        display: grid;
        place-items: center;
        width: 40px;
        height: 40px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.1);
        --icon-size: 22px;
        animation: shut 400ms var(--spring) both;
        animation-delay: inherit;
      }
      .lock .ok {
        margin-inline-start: auto;
        color: #2fb57a;
        --icon-size: 24px;
        animation: pop 420ms var(--spring) both;
      }
      @keyframes shut {
        from {
          transform: rotate(-20deg) scale(0.8);
        }
      }
      @keyframes pop {
        from {
          transform: scale(0);
          opacity: 0;
        }
      }
      .sub {
        color: #9aa4ad;
        font-size: 15px;
      }

      /* Home: sunrise */
      .home {
        background: #1e252b;
      }
      .home::before,
      .evening::before {
        content: "";
        position: absolute;
        inset: -40%;
        background: radial-gradient(circle at 50% 60%, rgba(255, 190, 90, 0.95) 0%, rgba(233, 151, 29, 0.55) 25%, rgba(30, 37, 43, 0) 60%);
        animation: bloom 2.6s var(--ease-out) both;
      }
      @keyframes bloom {
        from {
          transform: scale(0.2);
          opacity: 0;
        }
      }
      /* Evening: amber dims in from the edges */
      .evening {
        background: #120d08;
      }
      .evening::before {
        background: radial-gradient(circle at 50% 70%, rgba(255, 160, 70, 0.6) 0%, rgba(150, 90, 0, 0.35) 30%, rgba(18, 13, 8, 0) 65%);
      }
      @media (prefers-reduced-motion: reduce) {
        .moon,
        .lock,
        .title {
          animation: none;
        }
      }
    `],ln([ut({attribute:!1})],pn.prototype,"ctx",2),ln([ut()],pn.prototype,"mode",2),ln([ut({attribute:!1})],pn.prototype,"onDone",2),pn=ln([dt("sn-cinematic")],pn);var hn=Object.defineProperty,un=Object.getOwnPropertyDescriptor,gn=(t,e,i,s)=>{for(var n,o=s>1?void 0:s?un(e,i):e,a=t.length-1;a>=0;a--)(n=t[a])&&(o=(s?n(e,i,o):n(o))||o);return s&&o&&hn(e,i,o),o};const mn="smartnest-morning",fn=()=>(new Date).toDateString();let bn=class extends lt{constructor(){super(...arguments),this.forecast={}}connectedCallback(){super.connectedCallback();const t=this.ctx.config.settings.weather.entity;t&&this.ctx.hass.states[t]&&ms(this.ctx.hass,t).then((t=>this.forecast=t)),async function(t){const{hass:e,t:i,config:s}=t,n=s.settings,[o,a]=n.dark_from.split(":").map(Number),r=new Date;r.setDate(r.getDate()-1),r.setHours(o,a,0,0);const l=n.doorbell.trigger_entity,c=Je(s).filter((t=>{const i=e.states[t];if(!i)return!1;const s=Nt(t);return"vacuum"===s||"binary_sensor"===s&&["door","opening","garage_door"].includes(i.attributes.device_class)}));l&&c.push(l);let d=[];if(c.length)try{d=await e.callWS({type:"logbook/get_events",start_time:r.toISOString(),end_time:(new Date).toISOString(),entity_ids:c})}catch{d=[]}const p=[];if(l){const t=d.filter((t=>t.entity_id===l&&(l.startsWith("event.")||"on"===t.state))).length;t&&p.push(1===t?i("night_doorbell_1"):i("night_doorbell_n",{n:t}))}for(const h of c.filter((t=>t.startsWith("binary_sensor."))).slice(0,3)){const t=d.filter((t=>t.entity_id===h&&"on"===t.state)).length,n=Rt(e,s,h);t&&p.push(1===t?i("night_door_1",{name:n}):i("night_door_n",{name:n,n:t}))}d.some((t=>t.entity_id.startsWith("vacuum.")&&"cleaning"===t.state))&&p.push(i("night_robot"));for(const h of Je(s).filter((t=>"lock"===Nt(t)&&"unlocked"===e.states[t]?.state)))p.push(i("night_unlocked",{name:Rt(e,s,h)}));return p.length?p:[i("night_quiet")]}(this.ctx).then((t=>this.lines=t)),this.timer=window.setTimeout((()=>this.onDone()),6e4)}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this.timer)}render(){const{ctx:t}=this,{t:e}=t,i=zt[t.lang],s=new Date,n=ps(t.hass,t.config.settings.greeting_name),o=t.config.settings.weather.entity,a=o?t.hass.states[o]:void 0,r=e=>"number"==typeof e?Xt(`${Yt(e,t.lang,0)}°`):"–",l=t.config.settings.prayer?gs(t.hass):[];return F`<div class="scrim" @click=${t=>t.target===t.currentTarget&&this.onDone()}>
      <div class="card" role="dialog" aria-label=${e("morning_summary")}>
        <div class="hello">
          <h1>${e(ds(s))}${n?("ar"===t.lang?"، ":", ")+n:""} ☀️</h1>
          <span class="date">${s.toLocaleDateString(i,{weekday:"long",day:"numeric",month:"long"})}</span>
        </div>
        <div class="cols">
          ${a?F`<div class="box" style="animation-delay:120ms">
                <h2>${e("today_weather")}</h2>
                <div class="wx">
                  <sn-icon .icon=${hs(this.forecast.condition??a.state)}></sn-icon>
                  <div>
                    <div class="t">${r(a.attributes.temperature)}</div>
                    ${void 0!==this.forecast.high?F`<div class="hl">${r(this.forecast.high)} / ${r(this.forecast.low)}</div>`:W}
                  </div>
                </div>
              </div>`:W}
          ${l.length?F`<div class="box" style="animation-delay:220ms">
                <h2>${e("prayer")}</h2>
                ${l.map((t=>F`<div class="row ${t.at<s?"past":""}">
                    <span>${e(`p_${t.id}`)}</span><span class="when">${t.at.toLocaleTimeString(i,{hour:"2-digit",minute:"2-digit"})}</span>
                  </div>`))}
              </div>`:W}
          <div class="box" style="animation-delay:320ms">
            <h2>${e("overnight")}</h2>
            ${this.lines?F`<ul>${this.lines.map((t=>F`<li>${t}</li>`))}</ul>`:F`<span class="muted">${e("loading")}</span>`}
          </div>
        </div>
        <button class="btn primary pressable go" @click=${()=>this.onDone()}>${e("lets_go")}</button>
      </div>
    </div>`}};bn.styles=[Ve,a`
      .scrim {
        position: fixed;
        inset: 0;
        z-index: 75;
        display: grid;
        place-items: center;
        padding: 24px;
        background: radial-gradient(80% 70% at 50% 0%, rgba(255, 200, 120, 0.45), transparent 70%), var(--scrim);
        -webkit-backdrop-filter: blur(18px);
        backdrop-filter: blur(18px);
        animation: fade 700ms var(--ease-out);
      }
      .card {
        width: min(900px, 100%);
        border-radius: var(--r-xl);
        background: var(--surface-solid);
        color: var(--text);
        box-shadow: var(--shadow-lift);
        padding: 32px;
        max-height: calc(100vh - 48px);
        overflow: auto;
        display: grid;
        gap: 26px;
        animation: up 700ms var(--spring);
      }
      .hello {
        display: grid;
        gap: 4px;
      }
      .hello h1 {
        margin: 0;
        font-size: clamp(30px, 4vw, 44px);
        font-weight: 700;
      }
      .hello .date {
        color: var(--text-2);
        font-size: 17px;
      }
      .cols {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 16px;
      }
      .box {
        border-radius: var(--r-lg);
        background: var(--surface-2);
        padding: 18px;
        display: grid;
        gap: 10px;
        align-content: start;
        animation: up 600ms var(--spring) both;
      }
      .box h2 {
        margin: 0;
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--text-2);
      }
      .wx {
        display: flex;
        align-items: center;
        gap: 14px;
        --icon-size: 52px;
      }
      .wx sn-icon {
        color: var(--accent-text);
      }
      .wx .t {
        font-size: 40px;
        font-weight: 700;
        line-height: 1;
      }
      .wx .hl {
        color: var(--text-2);
        unicode-bidi: plaintext;
      }
      .row {
        display: flex;
        justify-content: space-between;
        gap: 10px;
        font-size: 15px;
      }
      .row.past {
        opacity: 0.45;
      }
      .row .when {
        font-variant-numeric: tabular-nums;
        direction: ltr;
      }
      ul {
        margin: 0;
        padding-inline-start: 18px;
        display: grid;
        gap: 6px;
        font-size: 15px;
      }
      .go {
        justify-self: center;
        min-width: 200px;
        min-height: 52px;
        font-size: 17px;
      }
      @keyframes fade {
        from {
          opacity: 0;
        }
      }
      @keyframes up {
        from {
          opacity: 0;
          transform: translateY(24px) scale(0.98);
        }
      }
    `],gn([ut({attribute:!1})],bn.prototype,"ctx",2),gn([ut({attribute:!1})],bn.prototype,"onDone",2),gn([gt()],bn.prototype,"forecast",2),gn([gt()],bn.prototype,"lines",2),bn=gn([dt("sn-morning")],bn);var vn=Object.defineProperty,_n=Object.getOwnPropertyDescriptor,yn=(t,e,i,s)=>{for(var n,o=s>1?void 0:s?_n(e,i):e,a=t.length-1;a>=0;a--)(n=t[a])&&(o=(s?n(e,i,o):n(o))||o);return s&&o&&vn(e,i,o),o};let xn=class extends lt{constructor(){super(...arguments),this.length=4,this.prompt="",this.error="",this.value="",this.wrong=!1}press(t){if(!(this.value.length>=this.length)&&(this.wrong=!1,this.value+=t,navigator.vibrate?.(4),this.value.length===this.length)){const t=this.value;window.setTimeout((()=>{this.onSubmit(t)||(this.wrong=!0,navigator.vibrate?.([60,40,60]),this.value="")}),120)}}render(){return F`
      <div class="prompt ${this.wrong?"err":""}">${this.wrong?this.error:this.prompt}</div>
      <div class="dots ${this.wrong?"shake":""}" aria-hidden="true">
        ${Array.from({length:this.length},((t,e)=>F`<span class="dot ${e<this.value.length?"on":""}"></span>`))}
      </div>
      <div class="keys">
        ${["1","2","3","4","5","6","7","8","9"].map((t=>F`<button @click=${()=>this.press(t)}>${t}</button>`))}
        <span></span>
        <button @click=${()=>this.press("0")}>0</button>
        <button class="ghost" aria-label="delete" @click=${()=>this.value=this.value.slice(0,-1)}>
          <sn-icon icon="backspace"></sn-icon>
        </button>
      </div>
    `}};xn.styles=a`
    :host {
      display: grid;
      justify-items: center;
      gap: 22px;
      padding: 8px 0 12px;
      direction: ltr;
      user-select: none;
      -webkit-user-select: none;
    }
    .prompt {
      font-size: 17px;
      font-weight: 500;
      color: var(--text);
      min-height: 1.4em;
    }
    .prompt.err {
      color: var(--alert-text);
    }
    .dots {
      display: flex;
      gap: 16px;
      height: 16px;
    }
    .dots.shake {
      animation: shake 420ms cubic-bezier(0.36, 0.07, 0.19, 0.97);
    }
    .dot {
      width: 14px;
      height: 14px;
      border-radius: 999px;
      border: 2px solid var(--text);
      transition: background-color 120ms;
    }
    .dot.on {
      background: var(--text);
    }
    .keys {
      display: grid;
      grid-template-columns: repeat(3, 76px);
      gap: 16px 22px;
    }
    button {
      width: 76px;
      height: 76px;
      border-radius: 999px;
      border: 0;
      font: inherit;
      font-size: 30px;
      font-weight: 500;
      color: var(--text);
      background: var(--surface-2);
      cursor: pointer;
      touch-action: manipulation;
      -webkit-tap-highlight-color: transparent;
      transition: background-color 120ms, transform 120ms;
    }
    button:active {
      background: var(--text-2);
      transform: scale(0.94);
    }
    button.ghost {
      background: transparent;
      --icon-size: 28px;
      display: grid;
      place-items: center;
    }
    @keyframes shake {
      10%,
      90% {
        transform: translateX(-2px);
      }
      20%,
      80% {
        transform: translateX(4px);
      }
      30%,
      50%,
      70% {
        transform: translateX(-10px);
      }
      40%,
      60% {
        transform: translateX(10px);
      }
    }
  `,yn([ut({type:Number})],xn.prototype,"length",2),yn([ut()],xn.prototype,"prompt",2),yn([ut()],xn.prototype,"error",2),yn([ut({attribute:!1})],xn.prototype,"onSubmit",2),yn([gt()],xn.prototype,"value",2),yn([gt()],xn.prototype,"wrong",2),xn=yn([dt("sn-pinpad")],xn);var wn=Object.defineProperty,$n=Object.getOwnPropertyDescriptor,kn=(t,e,i,s)=>{for(var n,o=s>1?void 0:s?$n(e,i):e,a=t.length-1;a>=0;a--)(n=t[a])&&(o=(s?n(e,i,o):n(o))||o);return s&&o&&wn(e,i,o),o};const Cn="0.5.0",An=t=>{const[e,i]=t.split(":").map(Number);return 60*(e||0)+(i||0)};function Hn(t,e,i){const s=60*t.getHours()+t.getMinutes(),n=An(e),o=An(i);return n<=o?s>=n&&s<o:s>=n||s<o}const Mn=t=>{const e=(t??"").slice(0,2);return"en"===e||"he"===e?e:"ar"};let Vn=class extends lt{constructor(){super(...arguments),this.narrow=!1,this.pageId="",this.sheets=[],this.toastMsg="",this.sleeping=!1,this.saving=!1,this.loadError="",this.now=new Date,this.systemDark=matchMedia("(prefers-color-scheme: dark)").matches,this.wide=window.innerWidth>=768,this.kiosk=Se(),this.initStarted=!1,this.lastActive=Date.now(),this.silentBell=!1,this.morning=!1,this.screenOffSent=!1,this.mql=matchMedia("(prefers-color-scheme: dark)"),this.onActivity=()=>{this.lastActive=Date.now(),this.screenOffSent=!1},this.onResize=()=>{this.wide=window.innerWidth>=768},this.onScheme=t=>{this.systemDark=t.matches}}connectedCallback(){super.connectedCallback(),this.setKiosk(this.kiosk),window.addEventListener("pointerdown",this.onActivity,{capture:!0,passive:!0}),window.addEventListener("keydown",this.onActivity,{capture:!0}),window.addEventListener("resize",this.onResize),this.mql.addEventListener("change",this.onScheme),this.ticker=window.setInterval((()=>this.tick()),1e4)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("pointerdown",this.onActivity,{capture:!0}),window.removeEventListener("keydown",this.onActivity,{capture:!0}),window.removeEventListener("resize",this.onResize),this.mql.removeEventListener("change",this.onScheme),window.clearInterval(this.ticker),this.unsub?.then((t=>t())).catch((()=>{})),this.unsub=void 0,this.initStarted=!1}tick(){this.now=new Date;const t=this.config?.settings.screensaver;!t?.enabled||!this.wide||this.draft||this.sheets.length||this.ringingAt||this.sleeping||Date.now()-this.lastActive>6e4*t.timeout_min&&(this.sleeping=!0),this.fullyTick(),this.checkMorning()}checkMorning(){this.morning||this.sleeping||this.ringingAt||!this.config||!this.hass||Date.now()-this.lastActive>15e3||function(t,e){const i=t.config.settings;if(!i.morning||t.editing||t.narrow)return!1;const[s,n]=i.dark_to.split(":").map(Number);if(60*e.getHours()+e.getMinutes()<60*s+n||e.getHours()>=12)return!1;try{return localStorage.getItem(mn)!==fn()}catch{return!1}}(this.makeCtx(),new Date)&&(!function(){try{localStorage.setItem(mn,fn())}catch{}}(),this.morning=!0)}fullyTick(){const t=this.config?.settings,e=this.hass&&t?Te(this.hass):void 0;if(!e||!t)return;const i=t.fully,s=()=>{};(async function(t,e,i){e.motion&&"on"===t.states[e.motion]?.state!==i&&await t.callService("switch",i?"turn_on":"turn_off",{entity_id:e.motion})})(this.hass,e,i.motion_wake).catch(s);const n=i.night_dim&&Hn(this.now,t.dark_from,t.dark_to);n===this.nightApplied||this.ringingAt||(this.nightApplied=n,je(this.hass,e,n?i.night_brightness:100).catch(s)),n&&i.night_off_min>0&&!this.screenOffSent&&!this.ringingAt&&Date.now()-this.lastActive>6e4*i.night_off_min&&(this.screenOffSent=!0,Ie(this.hass,e,!1).catch(s))}watchScreen(){const t=Te(this.hass),e=t?.screen?this.hass.states[t.screen]?.state:void 0;"on"===e&&"off"===this.screenSeen&&this.onActivity(),this.screenSeen=e}get assetBase(){return this.panel?.config?.asset_base??"/smartnest_static/static/"}async init(){if(this.initStarted=!0,!document.getElementById("smartnest-fonts")){const t=document.createElement("style");t.id="smartnest-fonts",t.textContent=function(t){const e=(e,i)=>`@font-face{font-family:"Rubik";font-weight:${e};font-display:swap;src:url("${t}fonts/${i}") format("truetype");}`;return[e(400,"Rubik-Regular.ttf"),e(500,"Rubik-Medium.ttf"),e(700,"Rubik-Bold.ttf"),e(800,"Rubik-ExtraBold.ttf")].join("")}(this.assetBase),document.head.appendChild(t)}const t=Mn(this.hass.language);try{const s=await async function(t){return(await t.callWS({type:"smartnest/config/get"})).config}(this.hass);s?this.config=ge(s,t):(this.config=function(t,e,i){const s={version:1,settings:ae(i),names:{},pages:[]},n=Object.keys(t.states).some((t=>"camera"===Nt(t)))?["home","power","security","doorbell"]:["home","power","climate"];return s.pages=n.map((i=>ue(i,t,s,e))),s.settings.default_page=s.pages[0].id,s}(this.hass,Lt(t),t),this.hass.user?.is_admin&&me(this.hass,this.config).catch((()=>{}))),this.pageId=this.config.settings.default_page||this.config.pages[0]?.id||"",this.unsub=(e=this.hass,i=e=>{!this.draft&&e&&(this.config=ge(e,t))},e.connection.subscribeMessage((t=>i(t.config)),{type:"smartnest/config/subscribe"}))}catch(s){this.loadError=String(s?.message??s)}var e,i}willUpdate(t){t.has("hass")&&this.hass&&!this.initStarted&&this.init(),t.has("hass")&&(this.watchDoorbell(),this.watchScreen()),t.has("config")&&this.kiosk&&this.config&&!this.config.settings.kiosk.pin_hash&&this.setKiosk(!1)}get panelPath(){return this.route?.prefix??location.pathname}setKiosk(t){this.kiosk=t,function(t){try{t?localStorage.setItem(Le,"1"):localStorage.removeItem(Le)}catch{}}(t),Pe(t),function(t,e){if(!t)return Ee?.(),void(Ee=void 0);if(Ee)return;const i=()=>{Se()&&!location.pathname.startsWith(e)&&(history.replaceState(null,"",e),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!0}})))};window.addEventListener("popstate",i),window.addEventListener("location-changed",i),Ee=()=>{window.removeEventListener("popstate",i),window.removeEventListener("location-changed",i)}}(t,this.panelPath)}unlockSheet(){const t=Lt(this.uiLang),e=this.config?.settings.kiosk;if(!e?.pin_hash||!e.pin_salt)return this.setKiosk(!1);this.pushSheet({title:t("kiosk_unlock"),render:t=>F`<sn-pinpad
        .length=${e.pin_length??4}
        prompt=${t.t("enter_pin")}
        error=${t.t("wrong_pin")}
        .onSubmit=${i=>ze(i,e.pin_salt)===e.pin_hash&&(this.setKiosk(!1),t.closeSheet(),!0)}
      ></sn-pinpad>`})}watchDoorbell(){const t=this.config?.settings.doorbell.trigger_entity,e=t?this.hass.states[t]:void 0;if(!e)return void(this.bellSeen=void 0);const i=t.startsWith("event.")?e.state:`${e.state}|${e.last_changed}`,s=this.bellSeen;this.bellSeen=i,void 0!==s&&s!==i&&(t.startsWith("event.")?"unavailable"!==e.state&&"unknown"!==e.state:"on"===e.state)&&this.ring()}ring(){this.sleeping=!1,this.onActivity(),this.silentBell=!1;const t=Te(this.hass);if(t){const e=()=>{};Ie(this.hass,t,!0).catch(e),je(this.hass,t,100).catch(e),this.nightApplied=void 0,t.media&&(this.silentBell=!0,async function(t,e,i){return!!e.media&&(await t.callService("media_player","play_media",{entity_id:e.media,media_content_id:i,media_content_type:"music"}),!0)}(this.hass,t,this.hass.hassUrl(`${this.assetBase}sounds/chime.wav`)).catch((()=>this.silentBell=!1)))}this.ringingAt=new Date;const e=this.ringingAt;window.setTimeout((()=>this.ringingAt===e&&(this.ringingAt=void 0)),9e4)}startEdit(){this.draft=structuredClone(this.config)}cancelEdit(){const t=Lt(this.uiLang);(JSON.stringify(this.draft)===JSON.stringify(this.config)||confirm(t("discard_changes")))&&(this.draft=void 0,this.sheets=[],this.config.pages.some((t=>t.id===this.pageId))||(this.pageId=this.config.pages[0]?.id??""))}async save(){const t=Lt(this.uiLang);this.saving=!0;try{await me(this.hass,this.draft),this.config=this.draft,this.draft=void 0,this.sheets=[],this.toast(t("saved"))}catch{this.toast(t("save_failed"))}finally{this.saving=!1}}toast(t){this.toastMsg=t,window.clearTimeout(this.toastTimer),this.toastTimer=window.setTimeout((()=>this.toastMsg=""),3200)}get current(){return this.draft??this.config}get uiLang(){return this.current?.settings.language??Mn(this.hass?.language)}get dark(){const t=this.current?.settings;return t?"dark"===t.theme||"light"!==t.theme&&("auto"===t.theme?this.systemDark:Hn(this.now,t.dark_from,t.dark_to)):this.systemDark}makeCtx(){const t=this.uiLang;return{hass:this.hass,config:this.current,lang:t,rtl:Vt(t),t:Lt(t),dark:this.dark,narrow:!this.wide,isAdmin:!!this.hass.user?.is_admin,editing:!!this.draft,assetBase:this.assetBase,update:t=>{if(!this.draft)return;const e=structuredClone(this.draft);t(e),this.draft=e},openEntity:t=>this.pushSheet({title:this.current.names[t]||this.hass.states[t]?.attributes.friendly_name||t,render:e=>F`<sn-entity-detail .ctx=${e} .entityId=${t}></sn-entity-detail>`}),showSheet:t=>this.pushSheet(t),closeSheet:()=>this.sheets=this.sheets.slice(0,-1),toast:t=>this.toast(t),cinematic:t=>{this.sleeping=!1,this.scene=t}}}pushSheet(t){this.sheets=[...this.sheets,t]}updated(){this.kiosk&&Pe(!0);const t=function(t,e){const i=e||se,s=i.toUpperCase()===se,n={"--accent":i,"--on-accent":Ot(i),"--cool":Ce,"--on-cool":ve,"--alert":He,"--on-alert":ve,"--success":Ae};return t?{...n,"--bg":be,"--bg-glow":"rgba(233,151,29,.10)","--surface":"rgba(42,51,59,.66)","--surface-solid":_e,"--surface-2":ye,"--surface-hover":"rgba(58,69,79,.8)","--text":"#FFFFFF","--text-2":we,"--border":"rgba(255,255,255,.08)","--accent-text":i,"--alert-text":He,"--scrim":"rgba(8,10,12,.55)","--shadow":"0 1px 0 rgba(255,255,255,.04) inset, 0 10px 30px rgba(0,0,0,.35)","--shadow-lift":"0 24px 60px rgba(0,0,0,.55)","color-scheme":"dark"}:{...n,"--bg":"#F3EFE8","--bg-glow":"rgba(233,151,29,.12)","--surface":"rgba(255,255,255,.72)","--surface-solid":"#FFFFFF","--surface-2":$e,"--surface-hover":"rgba(255,255,255,.92)","--text":ve,"--text-2":xe,"--border":"rgba(30,37,43,.08)","--accent-text":s?ke:`color-mix(in srgb, ${i} 62%, black)`,"--alert-text":Me,"--scrim":"rgba(30,37,43,.28)","--shadow":"0 1px 2px rgba(30,37,43,.05), 0 8px 24px rgba(30,37,43,.07)","--shadow-lift":"0 24px 60px rgba(30,37,43,.22)","color-scheme":"light"}}(this.dark,this.current?.settings.accent??"");for(const[e,i]of Object.entries(t))this.style.setProperty(e,i);this.setAttribute("dir",Vt(this.uiLang)?"rtl":"ltr"),this.setAttribute("lang",this.uiLang)}renderBar(t){const{t:e}=t,i=t.config,s=i.settings.home_name||this.hass.config?.location_name||"SmartNest";return F`<header class="glass">
      ${this.narrow&&!this.kiosk?F`<button
            class="icon-btn pressable"
            aria-label="menu"
            @click=${()=>this.dispatchEvent(new Event("hass-toggle-menu",{bubbles:!0,composed:!0}))}
          >
            <sn-icon icon="grid"></sn-icon>
          </button>`:W}
      <div class="home">
        <img src="${this.assetBase}logo/smartnest-symbol-${t.dark?"white":"color"}.svg" alt="" />
        <span>${s}</span>
      </div>
      <nav>
        <div class="seg" role="tablist">
          ${i.pages.map((e=>F`<button
              role="tab"
              aria-pressed=${e.id===this.pageId}
              aria-selected=${e.id===this.pageId}
              @click=${()=>{if(e.id===this.pageId&&t.editing)return Pi(t,e.id,(()=>this.pageId=this.current.pages[0]?.id??""));this.pageId=e.id}}
            >
              <sn-icon .icon=${e.icon} style="--icon-size:18px"></sn-icon>${e.title}
            </button>`))}
        </div>
      </nav>
      <div class="actions">
        ${this.kiosk?F`<button class="icon-btn primary pressable" aria-label=${e("kiosk_unlock")} title=${e("kiosk_unlock")} @click=${()=>this.unlockSheet()}>
              <sn-icon icon="lock" style="--icon-size:20px"></sn-icon>
            </button>`:!t.editing&&t.config.settings.kiosk.pin_hash?F`<button class="icon-btn pressable" aria-label=${e("kiosk_lock")} title=${e("kiosk_lock")} @click=${()=>this.setKiosk(!0)}>
              <sn-icon icon="lock-open" style="--icon-size:20px"></sn-icon>
            </button>`:W}
        ${this.kiosk?W:t.editing?F`<button class="btn pressable" @click=${()=>this.cancelEdit()}>${e("cancel")}</button>
              <button class="btn primary pressable" ?disabled=${this.saving} @click=${()=>this.save()}>
                ${this.saving?e("saving"):e("save")}
              </button>`:t.isAdmin?F`<button class="icon-btn pressable" aria-label=${e("edit")} title=${e("edit")} @click=${()=>this.startEdit()}>
              <sn-icon icon="pencil" style="--icon-size:20px"></sn-icon>
            </button>`:W}
      </div>
      ${t.editing?W:this.renderChips(t)}
    </header>`}renderChips(t){const e=ei(t);return e.length?F`<div class="chips" role="list">
      ${e.map((e=>F`<button class="chip pressable ${e.tone}" role="listitem" @click=${()=>e.entities.length?function(t,e){t.showSheet({title:Ge.find((t=>t.id===e))?t.t(Ge.find((t=>t.id===e)).label):"",render:t=>{const i=ei(t).find((t=>t.type===e));return i&&i.entities.length?F`<div style="display:grid;gap:12px">
        ${i.bulk?F`<button
              class="btn primary pressable"
              @click=${()=>{navigator.vibrate?.(10);const e=i.entities;("lock"===i.bulk?t.hass.callService("lock","lock",{entity_id:e}):t.hass.callService("homeassistant","turn_off",{entity_id:e})).catch((()=>t.toast(t.t("error"))))}}
            >
              <sn-icon .icon=${"lock"===i.bulk?"lock":"power"} style="--icon-size:20px"></sn-icon>${t.t("lock"===i.bulk?"lock_all":"turn_all_off")}
            </button>`:null}
        ${i.entities.map((e=>{const i=t.hass.states[e];return F`<button
            class="glass pressable"
            style="display:flex;align-items:center;gap:12px;padding:10px 14px;border-radius:var(--r-md);text-align:start"
            @click=${()=>t.openEntity(e)}
          >
            <span
              style="display:grid;place-items:center;width:40px;height:40px;border-radius:999px;background:var(--tone);color:var(--on-tone);${Bt(i)}"
            >
              <sn-icon .icon=${Ut(i,e)} style="--icon-size:20px"></sn-icon>
            </span>
            <span style="flex:1;font-weight:500">${Rt(t.hass,t.config,e)}</span>
            <span class="muted" style="font-size:14px;unicode-bidi:plaintext">${Gt(t.t,i,t.lang)}</span>
          </button>`}))}
      </div>`:F`<p class="muted" style="text-align:center">✓</p>`}})}(t,e.type):void 0}>
          <sn-icon .icon=${e.icon}></sn-icon>${e.label}
        </button>`))}
    </div>`:W}renderWeather(t){const e=t.config.settings.weather,i=e.background&&e.entity?this.hass.states[e.entity]:void 0;if(!i)return W;const s=this.hass.states["sun.sun"]?.state,n="clear-night"===i.state||(s?"below_horizon"===s:Hn(this.now,t.config.settings.dark_from,t.config.settings.dark_to));return F`<sn-weather-bg .condition=${i.state} ?night=${n} ?dark=${t.dark}></sn-weather-bg>`}renderDock(t){const{t:e}=t;return F`<div class="dock glass">
      <button class="btn primary pressable" @click=${()=>function(t,e){const i=(t,i,s)=>{let n="";return t.update((t=>{const o=t.pages.find((t=>t.id===e));if(!o)return;const a=le(i,s,{y:(r=o.widgets,r.reduce(((t,e)=>Math.max(t,e.y+e.h)),0))});var r;n=a.id,o.widgets=de([...o.widgets,a])})),n};t.showSheet({title:t.t("add_widget"),render:t=>F`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px">
      ${zi.map((e=>F`<button
          class="glass pressable"
          style="display:grid;gap:10px;justify-items:center;padding:20px 12px;border-radius:var(--r-md);font-weight:500"
          @click=${()=>{if("tile"===e.type||"camera"===e.type||"vacuum"===e.type)return void t.showSheet({title:t.t("choose_entity"),render:t=>F`<sn-entity-picker
                  .ctx=${t}
                  .filter=${Vi[e.type]??{}}
                  .onPick=${s=>{i(t,e.type,{entity:s}),t.closeSheet(),t.closeSheet()}}
                ></sn-entity-picker>`});const s="floorplan"===e.type?{floors:[re(t.t("floor_default"))]}:"heading"===e.type?{text:""}:{},n=i(t,e.type,s);t.closeSheet(),"heading"===e.type&&Si(t,0,n)}}
        >
          <span style="display:grid;place-items:center;width:52px;height:52px;border-radius:999px;background:var(--accent);color:var(--on-accent)">
            <sn-icon .icon=${e.icon}></sn-icon>
          </span>
          ${t.t(`widget_${e.type}`)}
          <span class="muted ltr" style="font-size:12px">${oe[e.type].w}×${oe[e.type].h}</span>
        </button>`))}
    </div>`})}(t,this.pageId)}>
        <sn-icon icon="plus" style="--icon-size:20px"></sn-icon>${e("add_widget")}
      </button>
      <button class="btn pressable" @click=${()=>Pi(t,this.pageId,(()=>this.pageId=this.current.pages[0]?.id??""))}>
        <sn-icon icon="pencil" style="--icon-size:20px"></sn-icon>${e("page_settings")}
      </button>
      <button class="btn pressable" @click=${()=>function(t,e){t.showSheet({title:t.t("add_page"),render:t=>Hi(t.t("choose_template"),F`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px">
        ${he.map((i=>F`<button
            class="glass pressable"
            style="display:grid;gap:10px;justify-items:center;padding:20px 12px;border-radius:var(--r-md);font-weight:500"
            @click=${()=>{const s=ue(i.id,t.hass,t.config,t.t);t.update((t=>t.pages.push(s))),t.closeSheet(),e(s.id)}}
          >
            <span style="display:grid;place-items:center;width:52px;height:52px;border-radius:999px;background:var(--surface-2)">
              <sn-icon .icon=${i.icon}></sn-icon>
            </span>
            ${t.t(i.label)}
          </button>`))}
      </div>`)})}(t,(t=>this.pageId=t))}>
        <sn-icon icon="dashboard" style="--icon-size:20px"></sn-icon>${e("add_page")}
      </button>
      <button class="icon-btn pressable" aria-label=${e("settings")} @click=${()=>ji(t,{version:Cn,testDoorbell:()=>this.ring()})}>
        <sn-icon icon="cog" style="--icon-size:20px"></sn-icon>
      </button>
    </div>`}render(){if(!this.hass)return W;if(!this.current){const t=Lt(this.uiLang);return F`<div class="center">
        <div style="display:grid;gap:12px;justify-items:center">
          <img src="${this.assetBase}logo/smartnest-symbol-${this.dark?"white":"color"}.svg" alt="SmartNest" />
          <span>${this.loadError?`${t("error")}: ${this.loadError}`:t("loading")}</span>
        </div>
      </div>`}const t=this.makeCtx(),e=t.config.pages.find((t=>t.id===this.pageId))??t.config.pages[0];return F`<div class="app ${t.narrow?"compact":""}">
      ${this.renderWeather(t)} ${this.renderBar(t)}
      ${e?Ct(e.id,F`<main><sn-page-grid .ctx=${t} .page=${e}></sn-page-grid></main>`):W}
      ${t.editing?this.renderDock(t):W}
      <sn-sheet-host .ctx=${t} .sheets=${this.sheets}></sn-sheet-host>
      ${this.ringingAt?F`<sn-doorbell .ctx=${t} .at=${this.ringingAt} .silent=${this.silentBell} .onDismiss=${()=>this.ringingAt=void 0}></sn-doorbell>`:W}
      ${this.morning?F`<sn-morning .ctx=${t} .onDone=${()=>this.morning=!1}></sn-morning>`:W}
      ${this.scene?F`<sn-cinematic .ctx=${t} .mode=${this.scene} .onDone=${()=>this.scene=void 0}></sn-cinematic>`:W}
      ${this.sleeping?F`<sn-screensaver .ctx=${t} .onWake=${()=>{this.sleeping=!1,this.onActivity(),this.checkMorning()}}></sn-screensaver>`:W}
      ${this.toastMsg?F`<div class="toast" role="status">${this.toastMsg}</div>`:W}
    </div>`}};Vn.styles=[Ve,a`
      :host {
        display: block;
        height: 100%;
        min-height: 100vh;
        background: var(--bg);
        color: var(--text);
        transition: background-color 600ms var(--ease-out), color 600ms var(--ease-out);
      }
      .app {
        position: relative;
        min-height: 100vh;
        background: radial-gradient(900px 600px at 0% 0%, var(--bg-glow), transparent 70%),
          radial-gradient(700px 500px at 100% 100%, var(--bg-glow), transparent 70%);
      }
      header {
        position: sticky;
        top: 0;
        z-index: 20;
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 12px 20px;
        padding-top: max(12px, env(safe-area-inset-top));
        border-width: 0 0 1px 0;
        border-radius: 0;
        flex-wrap: wrap;
      }
      .home {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 20px;
        font-weight: 700;
        white-space: nowrap;
        min-width: 0;
      }
      .home span {
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .home img {
        width: 28px;
        height: 28px;
        flex: none;
      }
      .chips {
        order: 5;
        flex-basis: 100%;
        display: flex;
        gap: 8px;
        overflow-x: auto;
        scrollbar-width: none;
        margin: 2px -4px -2px;
        padding: 2px 4px;
      }
      .chips::-webkit-scrollbar {
        display: none;
      }
      .chip {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        min-height: 34px;
        padding: 0 14px 0 10px;
        border-radius: 999px;
        background: var(--surface-2);
        font-size: 14px;
        font-weight: 500;
        white-space: nowrap;
        unicode-bidi: plaintext;
        --icon-size: 18px;
        animation: chip-in 420ms var(--spring) both;
      }
      .chip sn-icon {
        color: var(--accent-text);
      }
      .chip.cool sn-icon {
        color: var(--cool);
      }
      .chip.alert {
        background: color-mix(in srgb, var(--alert) 18%, transparent);
        color: var(--alert-text);
      }
      .chip.alert sn-icon {
        color: var(--alert-text);
      }
      .chip.neutral sn-icon {
        color: var(--text-2);
      }
      @keyframes chip-in {
        from {
          opacity: 0;
          transform: scale(0.85);
        }
      }
      nav {
        flex: 1;
        display: flex;
        justify-content: center;
        min-width: 0;
      }
      nav .seg > button {
        min-height: 40px;
        padding: 0 16px;
        font-size: 15px;
      }
      nav .seg > button[aria-pressed="true"] {
        color: var(--text);
      }
      nav .seg > button[aria-pressed="true"] sn-icon {
        color: var(--accent-text);
      }
      .actions {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      :host([narrow]) header,
      .compact header {
        padding-inline: 14px;
        gap: 10px;
      }
      .compact .home {
        flex: 1;
        font-size: 18px;
      }
      .compact nav {
        order: 3;
        flex-basis: 100%;
        justify-content: flex-start;
      }
      .compact nav .seg {
        width: 100%;
      }
      main {
        position: relative;
        z-index: 1; /* above the weather layer */
        padding: 20px;
        padding-bottom: 120px;
        max-width: 1600px;
        margin: 0 auto;
        animation: page-in 420ms var(--ease-out);
      }
      .compact main {
        padding: 14px;
        padding-bottom: 120px;
      }
      @keyframes page-in {
        from {
          opacity: 0;
          transform: translateY(8px);
        }
      }
      .dock {
        position: fixed;
        bottom: max(20px, env(safe-area-inset-bottom));
        left: 50%;
        transform: translateX(-50%);
        z-index: 30;
        display: flex;
        gap: 6px;
        padding: 6px;
        border-radius: 999px;
        animation: dock-in 520ms var(--spring);
        max-width: calc(100vw - 24px);
        overflow-x: auto;
        scrollbar-width: none;
      }
      @keyframes dock-in {
        from {
          transform: translate(-50%, 40px);
          opacity: 0;
        }
      }
      .toast {
        position: fixed;
        bottom: 96px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 90;
        padding: 12px 18px;
        border-radius: 999px;
        background: var(--text);
        color: var(--bg);
        font-weight: 500;
        box-shadow: var(--shadow-lift);
        animation: dock-in 420ms var(--spring);
        max-width: calc(100vw - 32px);
        text-align: center;
      }
      .center {
        min-height: 70vh;
        display: grid;
        place-items: center;
        text-align: center;
        color: var(--text-2);
        gap: 12px;
      }
      .center img {
        width: 64px;
        height: 64px;
        animation: breathe 1.6s var(--ease-out) infinite alternate;
      }
      @keyframes breathe {
        to {
          transform: scale(1.06);
          opacity: 0.7;
        }
      }
    `],kn([ut({attribute:!1})],Vn.prototype,"hass",2),kn([ut({type:Boolean,reflect:!0})],Vn.prototype,"narrow",2),kn([ut({attribute:!1})],Vn.prototype,"panel",2),kn([ut({attribute:!1})],Vn.prototype,"route",2),kn([gt()],Vn.prototype,"config",2),kn([gt()],Vn.prototype,"draft",2),kn([gt()],Vn.prototype,"pageId",2),kn([gt()],Vn.prototype,"sheets",2),kn([gt()],Vn.prototype,"toastMsg",2),kn([gt()],Vn.prototype,"ringingAt",2),kn([gt()],Vn.prototype,"sleeping",2),kn([gt()],Vn.prototype,"saving",2),kn([gt()],Vn.prototype,"loadError",2),kn([gt()],Vn.prototype,"now",2),kn([gt()],Vn.prototype,"systemDark",2),kn([gt()],Vn.prototype,"wide",2),kn([gt()],Vn.prototype,"kiosk",2),kn([gt()],Vn.prototype,"silentBell",2),kn([gt()],Vn.prototype,"scene",2),kn([gt()],Vn.prototype,"morning",2),Vn=kn([dt("smartnest-panel")],Vn),console.info(`%c SmartNest %c v${Cn} `,"background:#E9971D;color:#1E252B;font-weight:700;border-radius:4px 0 0 4px","background:#1E252B;color:#fff;border-radius:0 4px 4px 0");
