const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let n=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}};const o=t=>new n("string"==typeof t?t:t+"",void 0,i),r=(t,...e)=>{const s=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new n(s,t,i)},a=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return o(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:p,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,g=globalThis,m=g.trustedTypes,b=m?m.emptyScript:"",f=g.reactiveElementPolyfillSupport,v=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?b:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(s){i=null}}return i}},x=(t,e)=>!l(t,e),_={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:x};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=_){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);n?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??_}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...p(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const t=this._$Eu(e,i);void 0!==t&&this._$Eh.set(t,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of s){const s=document.createElement("style"),n=t.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=s;const o=n.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(void 0!==t){const o=this.constructor;if(!1===s&&(n=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??x)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==n||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((t=>this._$ET(t,this[t]))),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[v("elementProperties")]=new Map,w[v("finalized")]=new Map,f?.({ReactiveElement:w}),(g.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,k=$.trustedTypes,A=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",H=`lit$${Math.random().toFixed(9).slice(2)}$`,V="?"+H,M=`<${V}>`,L=document,S=()=>L.createComment(""),E=t=>null===t||"object"!=typeof t&&"function"!=typeof t,z=Array.isArray,P="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,T=/>/g,I=RegExp(`>|${P}(?:([^\\s"'>=/]+)(${P}*=${P}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,Z=/"/g,U=/^(?:script|style|textarea|title)$/i,N=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),B=N(1),F=N(2),R=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),q=new WeakMap,X=L.createTreeWalker(L,129);function Y(t,e){if(!z(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}class K{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const r=t.length-1,a=this.parts,[l,c]=((t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":3===e?"<math>":"",r=O;for(let a=0;a<i;a++){const e=t[a];let i,l,c=-1,d=0;for(;d<e.length&&(r.lastIndex=d,l=r.exec(e),null!==l);)d=r.lastIndex,r===O?"!--"===l[1]?r=D:void 0!==l[1]?r=T:void 0!==l[2]?(U.test(l[2])&&(n=RegExp("</"+l[2],"g")),r=I):void 0!==l[3]&&(r=I):r===I?">"===l[0]?(r=n??O,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,i=l[1],r=void 0===l[3]?I:'"'===l[3]?Z:j):r===Z||r===j?r=I:r===D||r===T?r=O:(r=I,n=void 0);const p=r===I&&t[a+1].startsWith("/>")?" ":"";o+=r===O?e+M:c>=0?(s.push(i),e.slice(0,c)+C+e.slice(c)+H+p):e+H+(-2===c?a:p)}return[Y(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]})(t,e);if(this.el=K.createElement(l,i),X.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=X.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(C)){const e=c[o++],i=s.getAttribute(t).split(H),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:r[2],strings:i,ctor:"."===r[1]?et:"?"===r[1]?it:"@"===r[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(H)&&(a.push({type:6,index:n}),s.removeAttribute(t));if(U.test(s.tagName)){const t=s.textContent.split(H),e=t.length-1;if(e>0){s.textContent=k?k.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],S()),X.nextNode(),a.push({type:2,index:++n});s.append(t[e],S())}}}else if(8===s.nodeType)if(s.data===V)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(H,t+1));)a.push({type:7,index:n}),t+=H.length-1}n++}}static createElement(t,e){const i=L.createElement("template");return i.innerHTML=t,i}}function G(t,e,i=t,s){if(e===R)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const o=E(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=G(t,n._$AS(t,e.values),n,s)),e}class J{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??L).importNode(e,!0);X.currentNode=s;let n=X.nextNode(),o=0,r=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new Q(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new nt(n,this,t)),this._$AV.push(e),a=i[++r]}o!==a?.index&&(n=X.nextNode(),o++)}return X.currentNode=L,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),E(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==R&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>z(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&E(this._$AH)?this._$AA.nextSibling.data=t:this.T(L.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=K.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new J(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new K(t)),e}k(t){z(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new Q(this.O(S()),this.O(S()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=G(this,t,e,0),o=!E(t)||t!==this._$AH&&t!==R,o&&(this._$AH=t);else{const s=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=G(this,s[i+r],e,r),a===R&&(a=this._$AH[r]),o||=!E(a)||a!==this._$AH[r],a===W?t=W:t!==W&&(t+=(a??"")+n[r+1]),this._$AH[r]=a}o&&!s&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class st extends tt{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??W)===R)return;const i=this._$AH,s=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==W&&(i===W||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const ot={I:Q},rt=$.litHtmlPolyfillSupport;rt?.(K,Q),($.litHtmlVersions??=[]).push("3.3.3");const at=globalThis;let lt=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new Q(e.insertBefore(S(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return R}};lt._$litElement$=!0,lt.finalized=!0,at.litElementHydrateSupport?.({LitElement:lt});const ct=at.litElementPolyfillSupport;ct?.({LitElement:lt}),(at.litElementVersions??=[]).push("4.2.2");const dt=t=>(e,i)=>{void 0!==i?i.addInitializer((()=>{customElements.define(t,e)})):customElements.define(t,e)},pt={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:x},ht=(t=pt,e,i)=>{const{kind:s,metadata:n}=i;let o=globalThis.litPropertyMetadata.get(n);if(void 0===o&&globalThis.litPropertyMetadata.set(n,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,n,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const n=this[s];e.call(this,i),this.requestUpdate(s,n,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function ut(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function gt(t){return ut({...t,state:!0,attribute:!1})}const mt=2,bt=t=>(...e)=>({_$litDirective$:t,values:e});let ft=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};const{I:vt}=ot,yt=()=>document.createComment(""),xt=(t,e,i)=>{const s=t._$AA.parentNode,n=void 0===e?t._$AB:e._$AA;if(void 0===i){const e=s.insertBefore(yt(),n),o=s.insertBefore(yt(),n);i=new vt(e,o,t,t.options)}else{const e=i._$AB.nextSibling,o=i._$AM,r=o!==t;if(r){let e;i._$AQ?.(t),i._$AM=t,void 0!==i._$AP&&(e=t._$AU)!==o._$AU&&i._$AP(e)}if(e!==n||r){let t=i._$AA;for(;t!==e;){const e=t.nextSibling;s.insertBefore(t,n),t=e}}}return i},_t=(t,e,i=t)=>(t._$AI(e,i),t),wt={},$t=(t,e=wt)=>t._$AH=e,kt=t=>{t._$AR(),t._$AA.remove()},At=bt(class extends ft{constructor(){super(...arguments),this.key=W}render(t,e){return this.key=t,e}update(t,[e,i]){return e!==this.key&&($t(t),this.key=e),i}}),Ct={edit:"Edit",done:"Done",save:"Save",cancel:"Cancel",delete:"Delete",add:"Add",close:"Close",back:"Back",settings:"Settings",search:"Search",loading:"Loading…",saving:"Saving…",saved:"Saved",save_failed:"Couldn't save. Check the connection and try again.",upload_failed:"Upload failed. Use a PNG, JPG or WebP under 15 MB.",discard_changes:"Discard your changes?",delete_confirm:"Delete this?",untitled:"Untitled",add_page:"Add page",page_settings:"Page settings",page_title:"Page name",page_icon:"Icon",move_earlier:"Move earlier",move_later:"Move later",choose_template:"Start from",template_blank:"Blank",template_home:"Home",template_power:"Electricity",template_security:"Security",template_doorbell:"Doorbell",template_climate:"Climate",add_widget:"Add widget",widget_settings:"Widget settings",widget_floorplan:"Floor plan",widget_tile:"Device",widget_camera:"Camera",widget_heading:"Heading",widget_clock:"Clock",heading_text:"Text",empty_page:"This page is empty.",empty_page_admin:"Tap Edit, then Add widget.",entity:"Device",choose_entity:"Choose a device",no_entities:"No matching devices",display_name:"Display name",display_name_hint:"Leave empty to use the Home Assistant name",show_as:"Show as",show_icon:"Icon",show_value:"Icon and value",floor:"Floor",add_floor:"Add floor",floor_name:"Floor name",floor_default:"Ground floor",upload_plan:"Upload floor plan",replace_plan:"Replace image",add_device:"Add device",no_plan:"No floor plan yet",no_plan_admin:"Tap Edit to upload one.",drag_hint:"Drag devices to place them",plan_in_dark:"Plan in dark mode",plan_original:"As uploaded",plan_invert:"Invert colors",doorbell_test:"Test doorbell",delete_floor:"Delete floor",home_name:"Home name",language:"Language",accent:"Accent color",theme:"Appearance",theme_auto:"Follow device",theme_schedule:"Dark at night",theme_light:"Light",theme_dark:"Dark",dark_from:"Dark from",dark_to:"until",default_page:"Opening page",screensaver:"Screensaver",screensaver_after:"Start after (minutes)",temp_entity:"Temperature sensor",doorbell:"Doorbell",doorbell_trigger:"Doorbell button",doorbell_camera:"Doorbell camera",doorbell_lock:"Door lock",kiosk:"Kiosk lock",kiosk_lock:"Lock screen",kiosk_unlock:"Unlock",kiosk_pin:"Exit PIN",kiosk_pin_hint:"4 to 8 digits. Give it to the homeowner; kids and guests can't leave the dashboard without it.",kiosk_pin_set:"Set PIN",kiosk_pin_change:"Change PIN",kiosk_pin_saved:"PIN set. Tap Save.",kiosk_pin_invalid:"Use 4 to 8 digits",kiosk_remove_pin:"Remove PIN",kiosk_full_lock:"For a full lock, also use Fully Kiosk Browser (Android) or Guided Access (iPad).",enter_pin:"Enter PIN",wrong_pin:"Wrong PIN",about:"About",version:"Version",none:"None",enabled:"On",on:"On",off:"Off",open:"Open",closed:"Closed",opening:"Opening",closing:"Closing",locked:"Locked",unlocked:"Unlocked",locking:"Locking",unlocking:"Unlocking",jammed:"Jammed",cleaning:"Cleaning",docked:"Docked",returning:"Returning",paused:"Paused",idle:"Idle",error:"Error",unavailable:"Unavailable",unknown:"Unknown",motion:"Motion",clear:"Clear",detected:"Detected",heat:"Heat",cool:"Cool",auto:"Auto",dry:"Dry",fan_only:"Fan",heat_cool:"Heat/Cool",playing:"Playing",recording:"Recording",streaming:"Live",tap_to_run:"Tap to run",start:"Start",pause:"Pause",return_home:"Return to dock",locate:"Locate",lock:"Lock",unlock:"Unlock",unlock_confirm:"Unlock the door?",cover_open:"Open",cover_close:"Close",stop:"Stop",turn_on:"Turn on",turn_off:"Turn off",color:"Color",white_temp:"White",more_colors:"More colors",position:"Open",tilt:"Tilt",brightness:"Brightness",target_temp:"Set to",current_temp:"Now",battery:"Battery",mode:"Mode",last_changed:"Changed",just_now:"just now",min_ago:"{n} min ago",hours_ago:"{n} h ago",history_24h:"Last 24 hours",someone_at_door:"Someone's at the door",dismiss:"Dismiss",open_door:"Open door",tagline:"Smart home. Better living."},Ht={en:Ct,ar:{edit:"تعديل",done:"تم",save:"حفظ",cancel:"إلغاء",delete:"حذف",add:"إضافة",close:"إغلاق",back:"رجوع",settings:"الإعدادات",search:"بحث",loading:"جارٍ التحميل…",saving:"جارٍ الحفظ…",saved:"تم الحفظ",save_failed:"ما زبط الحفظ. تأكد من الاتصال وجرّب مرة ثانية.",upload_failed:"ما زبط الرفع. استعمل صورة PNG أو JPG أو WebP أصغر من 15 ميغا.",discard_changes:"تتجاهل التعديلات؟",delete_confirm:"متأكد إنك بدك تحذفه؟",untitled:"بدون اسم",add_page:"صفحة جديدة",page_settings:"إعدادات الصفحة",page_title:"اسم الصفحة",page_icon:"الأيقونة",move_earlier:"قدّمها",move_later:"أخّرها",choose_template:"ابدأ من",template_blank:"فاضية",template_home:"الرئيسية",template_power:"الكهرباء",template_security:"الأمان",template_doorbell:"الجرس",template_climate:"التكييف",add_widget:"إضافة عنصر",widget_settings:"إعدادات العنصر",widget_floorplan:"مخطط البيت",widget_tile:"جهاز",widget_camera:"كاميرا",widget_heading:"عنوان",widget_clock:"ساعة",heading_text:"النص",empty_page:"هالصفحة فاضية.",empty_page_admin:"اضغط تعديل، وبعدين إضافة عنصر.",entity:"الجهاز",choose_entity:"اختار جهاز",no_entities:"ما في أجهزة مطابقة",display_name:"الاسم الظاهر",display_name_hint:"خليه فاضي عشان ياخذ الاسم من Home Assistant",show_as:"طريقة العرض",show_icon:"أيقونة",show_value:"أيقونة وقيمة",floor:"الطابق",add_floor:"طابق جديد",floor_name:"اسم الطابق",floor_default:"الطابق الأرضي",upload_plan:"ارفع المخطط",replace_plan:"غيّر الصورة",add_device:"أضف جهاز",no_plan:"ما في مخطط لسا",no_plan_admin:"اضغط تعديل عشان ترفع واحد.",drag_hint:"اسحب الأجهزة لمكانها",plan_in_dark:"المخطط بالوضع الغامق",plan_original:"زي ما هو",plan_invert:"اعكس الألوان",doorbell_test:"جرّب الجرس",delete_floor:"احذف الطابق",home_name:"اسم البيت",language:"اللغة",accent:"لون التمييز",theme:"المظهر",theme_auto:"حسب الجهاز",theme_schedule:"غامق بالليل",theme_light:"فاتح",theme_dark:"غامق",dark_from:"غامق من",dark_to:"لـ",default_page:"صفحة البداية",screensaver:"شاشة التوقف",screensaver_after:"تشتغل بعد (دقايق)",temp_entity:"حساس الحرارة",doorbell:"الجرس",doorbell_trigger:"زر الجرس",doorbell_camera:"كاميرا الباب",doorbell_lock:"قفل الباب",kiosk:"قفل الشاشة",kiosk_lock:"اقفل الشاشة",kiosk_unlock:"افتح القفل",kiosk_pin:"رمز الخروج",kiosk_pin_hint:"من 4 لـ 8 أرقام. أعطيه لصاحب البيت، والأولاد والضيوف ما بيقدروا يطلعوا من الداشبورد بدونه.",kiosk_pin_set:"حط الرمز",kiosk_pin_change:"غيّر الرمز",kiosk_pin_saved:"تم. اضغط حفظ.",kiosk_pin_invalid:"من 4 لـ 8 أرقام",kiosk_remove_pin:"شيل الرمز",kiosk_full_lock:"للقفل الكامل استعمل كمان Fully Kiosk Browser (أندرويد) أو Guided Access (آيباد).",enter_pin:"اكتب الرمز",wrong_pin:"الرمز غلط",about:"حول",version:"الإصدار",none:"بدون",enabled:"شغّال",on:"شغّال",off:"مطفي",open:"مفتوح",closed:"مسكّر",opening:"عم يفتح",closing:"عم يسكّر",locked:"مقفول",unlocked:"مفتوح القفل",locking:"عم يقفل",unlocking:"عم يفتح القفل",jammed:"عالق",cleaning:"عم ينظّف",docked:"بالقاعدة",returning:"راجع للقاعدة",paused:"موقّف",idle:"خامل",error:"خطأ",unavailable:"غير متصل",unknown:"غير معروف",motion:"في حركة",clear:"ما في حركة",detected:"مكتشف",heat:"تدفئة",cool:"تبريد",auto:"تلقائي",dry:"تجفيف",fan_only:"مروحة",heat_cool:"تدفئة/تبريد",playing:"عم يشغّل",recording:"عم يسجّل",streaming:"مباشر",tap_to_run:"اضغط للتشغيل",start:"ابدأ",pause:"وقّف",return_home:"ارجع للقاعدة",locate:"وينه؟",lock:"اقفل",unlock:"افتح القفل",unlock_confirm:"تفتح قفل الباب؟",cover_open:"افتح",cover_close:"سكّر",stop:"وقّف",turn_on:"شغّل",turn_off:"طفّي",color:"اللون",white_temp:"الأبيض",more_colors:"ألوان أكثر",position:"الفتحة",tilt:"الميلان",brightness:"الإضاءة",target_temp:"مضبوط على",current_temp:"هلأ",battery:"البطارية",mode:"الوضع",last_changed:"آخر تغيير",just_now:"هلأ",min_ago:"قبل {n} دقيقة",hours_ago:"قبل {n} ساعة",history_24h:"آخر 24 ساعة",someone_at_door:"في حدا عالباب",dismiss:"تجاهل",open_door:"افتح الباب",tagline:"بيتك أذكى، حياتك أريح"},he:{edit:"עריכה",done:"סיום",save:"שמירה",cancel:"ביטול",delete:"מחיקה",add:"הוספה",close:"סגירה",back:"חזרה",settings:"הגדרות",search:"חיפוש",loading:"טוען…",saving:"שומר…",saved:"נשמר",save_failed:"השמירה נכשלה. בדקו את החיבור ונסו שוב.",upload_failed:"ההעלאה נכשלה. השתמשו בקובץ PNG, JPG או WebP עד 15MB.",discard_changes:"לבטל את השינויים?",delete_confirm:"למחוק?",untitled:"ללא שם",add_page:"עמוד חדש",page_settings:"הגדרות עמוד",page_title:"שם העמוד",page_icon:"סמל",move_earlier:"הזז קדימה",move_later:"הזז אחורה",choose_template:"התחל מ",template_blank:"ריק",template_home:"בית",template_power:"חשמל",template_security:"אבטחה",template_doorbell:"פעמון",template_climate:"מיזוג",add_widget:"הוספת רכיב",widget_settings:"הגדרות רכיב",widget_floorplan:"תוכנית קומה",widget_tile:"מכשיר",widget_camera:"מצלמה",widget_heading:"כותרת",widget_clock:"שעון",heading_text:"טקסט",empty_page:"העמוד הזה ריק.",empty_page_admin:"הקישו עריכה ואז הוספת רכיב.",entity:"מכשיר",choose_entity:"בחרו מכשיר",no_entities:"לא נמצאו מכשירים",display_name:"שם לתצוגה",display_name_hint:"השאירו ריק כדי להשתמש בשם מ-Home Assistant",show_as:"תצוגה",show_icon:"סמל",show_value:"סמל וערך",floor:"קומה",add_floor:"קומה חדשה",floor_name:"שם הקומה",floor_default:"קומת קרקע",upload_plan:"העלאת תוכנית",replace_plan:"החלפת תמונה",add_device:"הוספת מכשיר",no_plan:"אין עדיין תוכנית קומה",no_plan_admin:"הקישו עריכה כדי להעלות.",drag_hint:"גררו את המכשירים למקומם",plan_in_dark:"התוכנית במצב כהה",plan_original:"כפי שהועלתה",plan_invert:"היפוך צבעים",doorbell_test:"בדיקת פעמון",delete_floor:"מחיקת קומה",home_name:"שם הבית",language:"שפה",accent:"צבע הדגשה",theme:"מראה",theme_auto:"לפי המכשיר",theme_schedule:"כהה בלילה",theme_light:"בהיר",theme_dark:"כהה",dark_from:"כהה מ",dark_to:"עד",default_page:"עמוד פתיחה",screensaver:"שומר מסך",screensaver_after:"הפעלה אחרי (דקות)",temp_entity:"חיישן טמפרטורה",doorbell:"פעמון",doorbell_trigger:"לחצן הפעמון",doorbell_camera:"מצלמת הדלת",doorbell_lock:"מנעול הדלת",kiosk:"נעילת מסך",kiosk_lock:"נעל מסך",kiosk_unlock:"שחרור נעילה",kiosk_pin:"קוד יציאה",kiosk_pin_hint:"4 עד 8 ספרות. מסרו אותו לבעל הבית; ילדים ואורחים לא יוכלו לצאת מהלוח בלעדיו.",kiosk_pin_set:"הגדר קוד",kiosk_pin_change:"שנה קוד",kiosk_pin_saved:"הקוד הוגדר. הקישו שמירה.",kiosk_pin_invalid:"4 עד 8 ספרות",kiosk_remove_pin:"הסר קוד",kiosk_full_lock:"לנעילה מלאה השתמשו גם ב-Fully Kiosk Browser (אנדרואיד) או Guided Access (אייפד).",enter_pin:"הזינו קוד",wrong_pin:"קוד שגוי",about:"אודות",version:"גרסה",none:"ללא",enabled:"פעיל",on:"פועל",off:"כבוי",open:"פתוח",closed:"סגור",opening:"נפתח",closing:"נסגר",locked:"נעול",unlocked:"לא נעול",locking:"ננעל",unlocking:"נפתח",jammed:"תקוע",cleaning:"מנקה",docked:"בעגינה",returning:"חוזר לעגינה",paused:"מושהה",idle:"במנוחה",error:"שגיאה",unavailable:"לא זמין",unknown:"לא ידוע",motion:"תנועה",clear:"אין תנועה",detected:"זוהה",heat:"חימום",cool:"קירור",auto:"אוטומטי",dry:"ייבוש",fan_only:"מאוורר",heat_cool:"חימום/קירור",playing:"מנגן",recording:"מקליט",streaming:"שידור חי",tap_to_run:"הקישו להפעלה",start:"התחל",pause:"השהה",return_home:"חזרה לעגינה",locate:"איתור",lock:"נעילה",unlock:"פתיחת נעילה",unlock_confirm:"לפתוח את נעילת הדלת?",cover_open:"פתח",cover_close:"סגור",stop:"עצור",turn_on:"הדלקה",turn_off:"כיבוי",color:"צבע",white_temp:"לבן",more_colors:"צבעים נוספים",position:"פתיחה",tilt:"הטיה",brightness:"בהירות",target_temp:"מכוון ל",current_temp:"עכשיו",battery:"סוללה",mode:"מצב",last_changed:"שונה",just_now:"עכשיו",min_ago:"לפני {n} דק׳",hours_ago:"לפני {n} שע׳",history_24h:"24 השעות האחרונות",someone_at_door:"מישהו בדלת",dismiss:"התעלם",open_door:"פתח דלת",tagline:"בית חכם. חיים טובים יותר."}},Vt=[{id:"ar",label:"العربية"},{id:"en",label:"English"},{id:"he",label:"עברית"}],Mt=t=>"en"!==t;function Lt(t){const e=Ht[t]??Ct;return(t,i)=>{let s=e[t]??Ct[t]??t;if(i)for(const[e,n]of Object.entries(i))s=s.replace(`{${e}}`,String(n));return s}}function St(t){return t in Ct}const Et={ar:"ar-u-nu-latn",en:"en-GB",he:"he"};const zt={"air-conditioner":"M6.59,0.66C8.93,-1.15 11.47,1.06 12.04,4.5C12.47,4.5 12.89,4.62 13.27,4.84C13.79,4.24 14.25,3.42 14.07,2.5C13.65,0.35 16.06,-1.39 18.35,1.58C20.16,3.92 17.95,6.46 14.5,7.03C14.5,7.46 14.39,7.89 14.16,8.27C14.76,8.78 15.58,9.24 16.5,9.06C18.63,8.64 20.38,11.04 17.41,13.34C15.07,15.15 12.53,12.94 11.96,9.5C11.53,9.5 11.11,9.37 10.74,9.15C10.22,9.75 9.75,10.58 9.93,11.5C10.35,13.64 7.94,15.39 5.65,12.42C3.83,10.07 6.05,7.53 9.5,6.97C9.5,6.54 9.63,6.12 9.85,5.74C9.25,5.23 8.43,4.76 7.5,4.94C5.37,5.36 3.62,2.96 6.59,0.66M5,16H7A2,2 0 0,1 9,18V24H7V22H5V24H3V18A2,2 0 0,1 5,16M5,18V20H7V18H5M12.93,16H15L12.07,24H10L12.93,16M18,16H21V18H18V22H21V24H18A2,2 0 0,1 16,22V18A2,2 0 0,1 18,16Z","alert-circle-outline":"M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z","arrow-left":"M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z","arrow-right":"M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z",bell:"M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21","bell-ring":"M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21M19.75,3.19L18.33,4.61C20.04,6.3 21,8.6 21,11H23C23,8.07 21.84,5.25 19.75,3.19M1,11H3C3,8.6 3.96,6.3 5.67,4.61L4.25,3.19C2.16,5.25 1,8.07 1,11Z",blinds:"M20 19V3H4V19H2V21H22V19H20M16 9H18V11H16V9M14 11H6V9H14V11M18 7H16V5H18V7M14 5V7H6V5H14M6 19V13H14V14.82C13.55 15.14 13.25 15.66 13.25 16.25C13.25 17.22 14.03 18 15 18S16.75 17.22 16.75 16.25C16.75 15.66 16.45 15.13 16 14.82V13H18V19H6Z","blinds-closed":"M20 19V3H4V19H2V21H13.25C13.25 21.97 14.03 22.75 15 22.75S16.75 21.97 16.75 21H22V19H20M18 11H16V9H18V11M14 11H6V9H14V11M14 13V15H6V13H14M16 13H18V15H16V13M18 7H16V5H18V7M14 5V7H6V5H14M6 19V17H14V19H6M16 19V17H18V19H16Z",camera:"M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z",cctv:"M6.03 12.03L8.03 15.5L5.5 18.68L2 12.62L6.03 12.03M17 18V15.29C17.88 14.9 18.5 14.03 18.5 13C18.5 12.43 18.3 11.9 17.97 11.5L19.94 10.35C20.95 9.76 21.3 8.47 20.71 7.46L19.33 5.06C18.74 4.05 17.45 3.7 16.44 4.28L8.31 9C7.36 9.53 7.03 10.75 7.58 11.71L9.08 14.31C9.63 15.26 10.86 15.59 11.81 15.04L13.69 13.96C13.94 14.55 14.41 15.03 15 15.29V18C15 19.1 15.9 20 17 20H22V18H17Z",check:"M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z","chevron-down":"M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z","chevron-up":"M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z","clock-outline":"M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z",close:"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",cog:"M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z",curtains:"M23 3H1V1H23V3M2 22H6C6 19 4 17 4 17C10 13 11 4 11 4H2V22M22 4H13C13 4 14 13 20 17C20 17 18 19 18 22H22V4Z",delete:"M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z",doorbell:"M12 10C10.9 10 10 10.9 10 12S10.9 14 12 14 14 13.1 14 12 13.1 10 12 10M16 2H8C6.9 2 6 2.9 6 4V20C6 21.1 6.9 22 8 22H16C17.1 22 18 21.1 18 20V4C18 2.9 17.1 2 16 2M16 20H8V4H16V20Z","door-closed":"M16,11H18V13H16V11M12,3H19C20.11,3 21,3.89 21,5V19H22V21H2V19H10V5C10,3.89 10.89,3 12,3M12,5V19H19V5H12Z","door-open":"M12,3C10.89,3 10,3.89 10,5H3V19H2V21H22V19H21V5C21,3.89 20.11,3 19,3H12M12,5H19V19H12V5M5,11H7V13H5V11Z",grid:"M12 16C13.1 16 14 16.9 14 18S13.1 20 12 20 10 19.1 10 18 10.9 16 12 16M12 10C13.1 10 14 10.9 14 12S13.1 14 12 14 10 13.1 10 12 10.9 10 12 10M12 4C13.1 4 14 4.9 14 6S13.1 8 12 8 10 7.1 10 6 10.9 4 12 4M6 16C7.1 16 8 16.9 8 18S7.1 20 6 20 4 19.1 4 18 4.9 16 6 16M6 10C7.1 10 8 10.9 8 12S7.1 14 6 14 4 13.1 4 12 4.9 10 6 10M6 4C7.1 4 8 4.9 8 6S7.1 8 6 8 4 7.1 4 6 4.9 4 6 4M18 16C19.1 16 20 16.9 20 18S19.1 20 18 20 16 19.1 16 18 16.9 16 18 16M18 10C19.1 10 20 10.9 20 12S19.1 14 18 14 16 13.1 16 12 16.9 10 18 10M18 4C19.1 4 20 4.9 20 6S19.1 8 18 8 16 7.1 16 6 16.9 4 18 4Z",drag:"M7,19V17H9V19H7M11,19V17H13V19H11M15,19V17H17V19H15M7,15V13H9V15H7M11,15V13H13V15H11M15,15V13H17V15H15M7,11V9H9V11H7M11,11V9H13V11H11M15,11V9H17V11H15M7,7V5H9V7H7M11,7V5H13V7H11M15,7V5H17V7H15Z",fan:"M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z","fan-off":"M12.5,2C9.64,2 8.57,4.55 9.29,7.47L15,13.16C15.87,13.37 16.81,13.81 17.28,14.73C18.46,17.1 22.03,17 22.03,12.5C22.03,8.92 18.05,8.13 14.35,10.13C14.03,9.73 13.61,9.42 13.13,9.22C13.32,8.29 13.76,7.24 14.75,6.75C17.11,5.57 17,2 12.5,2M3.28,4L2,5.27L4.47,7.73C3.22,7.74 2,8.87 2,11.5C2,15.07 5.96,15.85 9.65,13.87C9.97,14.27 10.4,14.59 10.89,14.79C10.69,15.71 10.25,16.75 9.27,17.24C6.91,18.42 7,22 11.5,22C13.8,22 14.94,20.36 14.94,18.21L18.73,22L20,20.72L3.28,4Z",fire:"M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z",flash:"M7,2V13H10V22L17,10H13L17,2H7Z",title:"M5,4V7H10.5V19H13.5V7H19V4H5Z",garage:"M19,20H17V11H7V20H5V9L12,5L19,9V20M8,12H16V14H8V12M8,15H16V17H8V15M16,18V20H8V18H16Z","garage-open":"M19,20H17V11H7V20H5V9L12,5L19,9V20M8,12H16V14H8V12Z",home:"M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z","home-outline":"M12 5.69L17 10.19V18H15V12H9V18H7V10.19L12 5.69M12 3L2 12H5V20H11V14H13V20H19V12H22","image-plus":"M18 15V18H15V20H18V23H20V20H23V18H20V15H18M13.3 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5V13.3C20.4 13.1 19.7 13 19 13C17.9 13 16.8 13.3 15.9 13.9L14.5 12L11 16.5L8.5 13.5L5 18H13.1C13 18.3 13 18.7 13 19C13 19.7 13.1 20.4 13.3 21Z",image:"M19,19H5V5H19M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M13.96,12.29L11.21,15.83L9.25,13.47L6.5,17H17.5L13.96,12.29Z",layers:"M12,16L19.36,10.27L21,9L12,2L3,9L4.63,10.27M12,18.54L4.62,12.81L3,14.07L12,21.07L21,14.07L19.37,12.8L12,18.54Z",lightbulb:"M12,2A7,7 0 0,0 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H15A1,1 0 0,0 16,17V14.74C17.81,13.47 19,11.38 19,9A7,7 0 0,0 12,2M9,21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9V21Z","lightbulb-outline":"M12,2A7,7 0 0,1 19,9C19,11.38 17.81,13.47 16,14.74V17A1,1 0 0,1 15,18H9A1,1 0 0,1 8,17V14.74C6.19,13.47 5,11.38 5,9A7,7 0 0,1 12,2M9,21V20H15V21A1,1 0 0,1 14,22H10A1,1 0 0,1 9,21M12,4A5,5 0 0,0 7,9C7,11.05 8.23,12.81 10,13.58V16H14V13.58C15.77,12.81 17,11.05 17,9A5,5 0 0,0 12,4Z","lightning-bolt":"M11 15H6L13 1V9H18L11 23V15Z",lock:"M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z","lock-open":"M18 1C15.24 1 13 3.24 13 6V8H4C2.9 8 2 8.89 2 10V20C2 21.11 2.9 22 4 22H16C17.11 22 18 21.11 18 20V10C18 8.9 17.11 8 16 8H15V6C15 4.34 16.34 3 18 3C19.66 3 21 4.34 21 6V8H23V6C23 3.24 20.76 1 18 1M10 13C11.1 13 12 13.89 12 15C12 16.11 11.11 17 10 17C8.9 17 8 16.11 8 15C8 13.9 8.9 13 10 13Z",magnify:"M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z","marker-plus":"M9,11.5A2.5,2.5 0 0,0 11.5,9A2.5,2.5 0 0,0 9,6.5A2.5,2.5 0 0,0 6.5,9A2.5,2.5 0 0,0 9,11.5M9,2C12.86,2 16,5.13 16,9C16,14.25 9,22 9,22C9,22 2,14.25 2,9A7,7 0 0,1 9,2M15,17H18V14H20V17H23V19H20V22H18V19H15V17Z",minus:"M19,13H5V11H19V13Z","motion-sensor":"M10,0.2C9,0.2 8.2,1 8.2,2C8.2,3 9,3.8 10,3.8C11,3.8 11.8,3 11.8,2C11.8,1 11,0.2 10,0.2M15.67,1A7.33,7.33 0 0,0 23,8.33V7A6,6 0 0,1 17,1H15.67M18.33,1C18.33,3.58 20.42,5.67 23,5.67V4.33C21.16,4.33 19.67,2.84 19.67,1H18.33M21,1A2,2 0 0,0 23,3V1H21M7.92,4.03C7.75,4.03 7.58,4.06 7.42,4.11L2,5.8V11H3.8V7.33L5.91,6.67L2,22H3.8L6.67,13.89L9,17V22H10.8V15.59L8.31,11.05L9.04,8.18L10.12,10H15V8.2H11.38L9.38,4.87C9.08,4.37 8.54,4.03 7.92,4.03Z","motion-sensor-off":"M11.4 8.2H15V10H13.2L11.4 8.2M19.67 1H18.33C18.33 3.58 20.42 5.67 23 5.67V4.33C21.16 4.33 19.67 2.84 19.67 1M21 1C21 2.11 21.9 3 23 3V1H21M17 1H15.67C15.67 5.05 18.95 8.33 23 8.33V7C19.69 7 17 4.31 17 1M10 3.8C11 3.8 11.8 3 11.8 2S11 .2 10 .2 8.2 1 8.2 2 9 3.8 10 3.8M2.39 1.73L1.11 3L3.46 5.35L2 5.8V11H3.8V7.33L5.05 6.94L5.68 7.57L2 22H3.8L6.67 13.89L9 17V22H10.8V15.59L8.31 11.05L8.5 10.37L20.84 22.73L22.11 21.46L2.39 1.73M9.38 4.87C9.08 4.37 8.54 4.03 7.92 4.03C7.75 4.03 7.58 4.06 7.42 4.11L7.34 4.14L11.35 8.15L9.38 4.87Z",palette:"M17.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,9A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 17.5,12M14.5,8A1.5,1.5 0 0,1 13,6.5A1.5,1.5 0 0,1 14.5,5A1.5,1.5 0 0,1 16,6.5A1.5,1.5 0 0,1 14.5,8M9.5,8A1.5,1.5 0 0,1 8,6.5A1.5,1.5 0 0,1 9.5,5A1.5,1.5 0 0,1 11,6.5A1.5,1.5 0 0,1 9.5,8M6.5,12A1.5,1.5 0 0,1 5,10.5A1.5,1.5 0 0,1 6.5,9A1.5,1.5 0 0,1 8,10.5A1.5,1.5 0 0,1 6.5,12M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A1.5,1.5 0 0,0 13.5,19.5C13.5,19.11 13.35,18.76 13.11,18.5C12.88,18.23 12.73,17.88 12.73,17.5A1.5,1.5 0 0,1 14.23,16H16A5,5 0 0,0 21,11C21,6.58 16.97,3 12,3Z",pause:"M14,19H18V5H14M6,19H10V5H6V19Z",pencil:"M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z",play:"M8,5.14V19.14L19,12.14L8,5.14Z",plus:"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z","power-plug":"M16,7V3H14V7H10V3H8V7H8C7,7 6,8 6,9V14.5L9.5,18V21H14.5V18L18,14.5V9C18,8 17,7 16,7Z","power-plug-off":"M20.84 22.73L15.31 17.2L14.5 18V21H9.5V18L6 14.5V9C6 8.7 6.1 8.41 6.25 8.14L1.11 3L2.39 1.73L22.11 21.46L20.84 22.73M18 14.5V9C18 8 17 7 16 7V3H14V7H10.2L17.85 14.65L18 14.5M10 3H8V4.8L10 6.8V3Z",power:"M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13",resize:"M10.59,12L14.59,8H11V6H18V13H16V9.41L12,13.41V16H20V4H8V12H10.59M22,2V18H12V22H2V12H6V2H22M10,14H4V20H10V14Z","robot-vacuum":"M12,2C14.65,2 17.19,3.06 19.07,4.93L17.65,6.35C16.15,4.85 14.12,4 12,4C9.88,4 7.84,4.84 6.35,6.35L4.93,4.93C6.81,3.06 9.35,2 12,2M3.66,6.5L5.11,7.94C4.39,9.17 4,10.57 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,10.57 19.61,9.17 18.88,7.94L20.34,6.5C21.42,8.12 22,10.04 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12C2,10.04 2.58,8.12 3.66,6.5M12,6A6,6 0 0,1 18,12C18,13.59 17.37,15.12 16.24,16.24L14.83,14.83C14.08,15.58 13.06,16 12,16C10.94,16 9.92,15.58 9.17,14.83L7.76,16.24C6.63,15.12 6,13.59 6,12A6,6 0 0,1 12,6M12,8A1,1 0 0,0 11,9A1,1 0 0,0 12,10A1,1 0 0,0 13,9A1,1 0 0,0 12,8Z","shield-home":"M11,13H13V16H16V11H18L12,6L6,11H8V16H11V13M12,1L21,5V11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1Z",snowflake:"M20.79,13.95L18.46,14.57L16.46,13.44V10.56L18.46,9.43L20.79,10.05L21.31,8.12L19.54,7.65L20,5.88L18.07,5.36L17.45,7.69L15.45,8.82L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L15.5,15.17L17.5,16.3L18.12,18.63L20,18.12L19.53,16.35L21.3,15.88L20.79,13.95M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44V10.56Z",sofa:"M12.5 7C12.5 5.89 13.39 5 14.5 5H18C19.1 5 20 5.9 20 7V9.16C18.84 9.57 18 10.67 18 11.97V14H12.5V7M6 11.96V14H11.5V7C11.5 5.89 10.61 5 9.5 5H6C4.9 5 4 5.9 4 7V9.15C5.16 9.56 6 10.67 6 11.96M20.66 10.03C19.68 10.19 19 11.12 19 12.12V15H5V12C5 10.9 4.11 10 3 10S1 10.9 1 12V17C1 18.1 1.9 19 3 19V21H5V19H19V21H21V19C22.1 19 23 18.1 23 17V12C23 10.79 21.91 9.82 20.66 10.03Z",speaker:"M12,12A3,3 0 0,0 9,15A3,3 0 0,0 12,18A3,3 0 0,0 15,15A3,3 0 0,0 12,12M12,20A5,5 0 0,1 7,15A5,5 0 0,1 12,10A5,5 0 0,1 17,15A5,5 0 0,1 12,20M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8C10.89,8 10,7.1 10,6C10,4.89 10.89,4 12,4M17,2H7C5.89,2 5,2.89 5,4V20A2,2 0 0,0 7,22H17A2,2 0 0,0 19,20V4C19,2.89 18.1,2 17,2Z",stop:"M18,18H6V6H18V18Z",television:"M21,17H3V5H21M21,3H3A2,2 0 0,0 1,5V17A2,2 0 0,0 3,19H8V21H16V19H21A2,2 0 0,0 23,17V5A2,2 0 0,0 21,3Z",thermometer:"M15 13V5A3 3 0 0 0 9 5V13A5 5 0 1 0 15 13M12 4A1 1 0 0 1 13 5V8H11V5A1 1 0 0 1 12 4Z","toggle-on":"M17,7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7M17,15A3,3 0 0,1 14,12A3,3 0 0,1 17,9A3,3 0 0,1 20,12A3,3 0 0,1 17,15Z","toggle-off":"M17,7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7M7,15A3,3 0 0,1 4,12A3,3 0 0,1 7,9A3,3 0 0,1 10,12A3,3 0 0,1 7,15Z",dashboard:"M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z",humidity:"M12,3.25C12,3.25 6,10 6,14C6,17.32 8.69,20 12,20A6,6 0 0,0 18,14C18,10 12,3.25 12,3.25M14.47,9.97L15.53,11.03L9.53,17.03L8.47,15.97M9.75,10A1.25,1.25 0 0,1 11,11.25A1.25,1.25 0 0,1 9.75,12.5A1.25,1.25 0 0,1 8.5,11.25A1.25,1.25 0 0,1 9.75,10M14.25,14.5A1.25,1.25 0 0,1 15.5,15.75A1.25,1.25 0 0,1 14.25,17A1.25,1.25 0 0,1 13,15.75A1.25,1.25 0 0,1 14.25,14.5Z",leak:"M10 3.25C10 3.25 16 10 16 14C16 17.31 13.31 20 10 20S4 17.31 4 14C4 10 10 3.25 10 3.25M20 7V13H18V7H20M18 17H20V15H18V17Z","window-closed":"M6,11H10V9H14V11H18V4H6V11M18,13H6V20H18V13M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2Z","window-open":"M6,8H10V6H14V8H18V4H6V8M18,10H6V15H18V10M6,20H18V17H6V20M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2Z",bed:"M19,7H11V14H3V5H1V20H3V17H21V20H23V11A4,4 0 0,0 19,7M7,13A3,3 0 0,0 10,10A3,3 0 0,0 7,7A3,3 0 0,0 4,10A3,3 0 0,0 7,13Z",kitchen:"M11,9H9V2H7V9H5V2H3V9C3,11.12 4.66,12.84 6.75,12.97V22H9.25V12.97C11.34,12.84 13,11.12 13,9V2H11V9M16,6V14H18.5V22H21V2C18.24,2 16,4.24 16,6Z",shower:"M21,14V15C21,16.91 19.93,18.57 18.35,19.41L19,22H17L16.5,20C16.33,20 16.17,20 16,20H8C7.83,20 7.67,20 7.5,20L7,22H5L5.65,19.41C4.07,18.57 3,16.91 3,15V14H2V12H20V5A1,1 0 0,0 19,4C18.5,4 18.12,4.34 18,4.79C18.63,5.33 19,6.13 19,7H13A3,3 0 0,1 16,4C16.06,4 16.11,4 16.17,4C16.58,2.84 17.69,2 19,2A3,3 0 0,1 22,5V14H21V14M19,14H5V15A3,3 0 0,0 8,18H16A3,3 0 0,0 19,15V14Z",garden:"M11,21V16.74C10.53,16.91 10.03,17 9.5,17C7,17 5,15 5,12.5C5,11.23 5.5,10.09 6.36,9.27C6.13,8.73 6,8.13 6,7.5C6,5 8,3 10.5,3C12.06,3 13.44,3.8 14.25,5C14.33,5 14.41,5 14.5,5A5.5,5.5 0 0,1 20,10.5A5.5,5.5 0 0,1 14.5,16C14,16 13.5,15.93 13,15.79V21H11Z",car:"M5,11L6.5,6.5H17.5L19,11M17.5,16A1.5,1.5 0 0,1 16,14.5A1.5,1.5 0 0,1 17.5,13A1.5,1.5 0 0,1 19,14.5A1.5,1.5 0 0,1 17.5,16M6.5,16A1.5,1.5 0 0,1 5,14.5A1.5,1.5 0 0,1 6.5,13A1.5,1.5 0 0,1 8,14.5A1.5,1.5 0 0,1 6.5,16M18.92,6C18.72,5.42 18.16,5 17.5,5H6.5C5.84,5 5.28,5.42 5.08,6L3,12V20A1,1 0 0,0 4,21H5A1,1 0 0,0 6,20V19H18V20A1,1 0 0,0 19,21H20A1,1 0 0,0 21,20V12L18.92,6Z",pool:"M2,15C3.67,14.25 5.33,13.5 7,13.17V5A3,3 0 0,1 10,2C11.31,2 12.42,2.83 12.83,4H10A1,1 0 0,0 9,5V6H14V5A3,3 0 0,1 17,2C18.31,2 19.42,2.83 19.83,4H17A1,1 0 0,0 16,5V14.94C18,14.62 20,13 22,13V15C19.78,15 17.56,17 15.33,17C13.11,17 10.89,15 8.67,15C6.44,15 4.22,16 2,17V15M14,8H9V10H14V8M14,12H9V13C10.67,13.16 12.33,14.31 14,14.79V12M2,19C4.22,18 6.44,17 8.67,17C10.89,17 13.11,19 15.33,19C17.56,19 19.78,17 22,17V19C19.78,19 17.56,21 15.33,21C13.11,21 10.89,19 8.67,19C6.44,19 4.22,20 2,21V19Z",gamepad:"M7,6H17A6,6 0 0,1 23,12A6,6 0 0,1 17,18C15.22,18 13.63,17.23 12.53,16H11.47C10.37,17.23 8.78,18 7,18A6,6 0 0,1 1,12A6,6 0 0,1 7,6M6,9V11H4V13H6V15H8V13H10V11H8V9H6M15.5,12A1.5,1.5 0 0,0 14,13.5A1.5,1.5 0 0,0 15.5,15A1.5,1.5 0 0,0 17,13.5A1.5,1.5 0 0,0 15.5,12M18.5,9A1.5,1.5 0 0,0 17,10.5A1.5,1.5 0 0,0 18.5,12A1.5,1.5 0 0,0 20,10.5A1.5,1.5 0 0,0 18.5,9Z",desk:"M3 6H21C21.55 6 22 6.45 22 7C22 7.55 21.55 8 21 8V19H19V17H15V19H13V8H5V19H3V8C2.45 8 2 7.55 2 7C2 6.45 2.45 6 3 6M16 10.5V11H18V10.5C18 10.22 17.78 10 17.5 10H16.5C16.22 10 16 10.22 16 10.5M16 14.5V15H18V14.5C18 14.22 17.78 14 17.5 14H16.5C16.22 14 16 14.22 16 14.5Z",laundry:"M14.83,11.17C16.39,12.73 16.39,15.27 14.83,16.83C13.27,18.39 10.73,18.39 9.17,16.83L14.83,11.17M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2M7,4A1,1 0 0,0 6,5A1,1 0 0,0 7,6A1,1 0 0,0 8,5A1,1 0 0,0 7,4M10,4A1,1 0 0,0 9,5A1,1 0 0,0 10,6A1,1 0 0,0 11,5A1,1 0 0,0 10,4M12,8A6,6 0 0,0 6,14A6,6 0 0,0 12,20A6,6 0 0,0 18,14A6,6 0 0,0 12,8Z",solar:"M11.45,2V5.55L15,3.77L11.45,2M10.45,8L8,10.46L11.75,11.71L10.45,8M2,11.45L3.77,15L5.55,11.45H2M10,2H2V10C2.57,10.17 3.17,10.25 3.77,10.25C7.35,10.26 10.26,7.35 10.27,3.75C10.26,3.16 10.17,2.57 10,2M17,22V16H14L19,7V13H22L17,22Z",battery:"M16 20H8V6H16M16.67 4H15V2H9V4H7.33C6.6 4 6 4.6 6 5.33V20.67C6 21.4 6.6 22 7.33 22H16.67C17.41 22 18 21.41 18 20.67V5.33C18 4.6 17.4 4 16.67 4M15 16H9V19H15V16M15 7H9V10H15V7M15 11.5H9V14.5H15V11.5Z",entrance:"M15 13L11 17V14H2V12H11V9L15 13M5 20V16H7V18H17V10.19L12 5.69L7.21 10H4.22L12 3L22 12H19V20H5Z",locate:"M12,2C15.31,2 18,4.66 18,7.95C18,12.41 12,19 12,19C12,19 6,12.41 6,7.95C6,4.66 8.69,2 12,2M12,6A2,2 0 0,0 10,8A2,2 0 0,0 12,10A2,2 0 0,0 14,8A2,2 0 0,0 12,6M20,19C20,21.21 16.42,23 12,23C7.58,23 4,21.21 4,19C4,17.71 5.22,16.56 7.11,15.83L7.75,16.74C6.67,17.19 6,17.81 6,18.5C6,19.88 8.69,21 12,21C15.31,21 18,19.88 18,18.5C18,17.81 17.33,17.19 16.25,16.74L16.89,15.83C18.78,16.56 20,17.71 20,19Z","play-circle":"M10,16.5V7.5L16,12M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",gauge:"M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12C20,14.4 19,16.5 17.3,18C15.9,16.7 14,16 12,16C10,16 8.2,16.7 6.7,18C5,16.5 4,14.4 4,12A8,8 0 0,1 12,4M14,5.89C13.62,5.9 13.26,6.15 13.1,6.54L11.81,9.77L11.71,10C11,10.13 10.41,10.6 10.14,11.26C9.73,12.29 10.23,13.45 11.26,13.86C12.29,14.27 13.45,13.77 13.86,12.74C14.12,12.08 14,11.32 13.57,10.76L13.67,10.5L14.96,7.29L14.97,7.26C15.17,6.75 14.92,6.17 14.41,5.96C14.28,5.91 14.15,5.89 14,5.89M10,6A1,1 0 0,0 9,7A1,1 0 0,0 10,8A1,1 0 0,0 11,7A1,1 0 0,0 10,6M7,9A1,1 0 0,0 6,10A1,1 0 0,0 7,11A1,1 0 0,0 8,10A1,1 0 0,0 7,9M17,9A1,1 0 0,0 16,10A1,1 0 0,0 17,11A1,1 0 0,0 18,10A1,1 0 0,0 17,9Z",eye:"M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z",night:"M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z",crosshairs:"M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M3.05,13H1V11H3.05C3.5,6.83 6.83,3.5 11,3.05V1H13V3.05C17.17,3.5 20.5,6.83 20.95,11H23V13H20.95C20.5,17.17 17.17,20.5 13,20.95V23H11V20.95C6.83,20.5 3.5,17.17 3.05,13M12,5A7,7 0 0,0 5,12A7,7 0 0,0 12,19A7,7 0 0,0 19,12A7,7 0 0,0 12,5Z",backspace:"M19,15.59L17.59,17L14,13.41L10.41,17L9,15.59L12.59,12L9,8.41L10.41,7L14,10.59L17.59,7L19,8.41L15.41,12L19,15.59M22,3A2,2 0 0,1 24,5V19A2,2 0 0,1 22,21H7C6.31,21 5.77,20.64 5.41,20.11L0,12L5.41,3.88C5.77,3.35 6.31,3 7,3H22M22,5H7L2.28,12L7,19H22V5Z"},Pt=["home","lightning-bolt","shield-home","doorbell","air-conditioner","cctv","sofa","bed","kitchen","shower","garden","garage","car","pool","gamepad","desk","laundry","solar","lightbulb","robot-vacuum","thermometer","television","speaker","dashboard"];function Ot(t){const e=parseInt(t.replace("#",""),16),[i,s,n]=[e>>16&255,e>>8&255,255&e].map((t=>{const e=t/255;return e<=.03928?e/12.92:((e+.055)/1.055)**2.4}));return.2126*i+.7152*s+.0722*n>.22?"#1E252B":"#FFFFFF"}const Dt=t=>"#"+t.map((t=>t.toString(16).padStart(2,"0"))).join("");function Tt(t,e){const i=e/100,s=e=>{const s=(e+t/60)%6;return Math.round(255*(1-i*Math.max(0,Math.min(s,4-s,1))))};return[s(5),s(3),s(1)]}const It=([t,e,i])=>`rgb(${t}, ${e}, ${i})`,jt=t=>t.split(".")[0];function Zt(t,e,i){return e.names[i]||t.states[i]?.attributes.friendly_name||i}const Ut=t=>t.attributes.device_class;function Nt(t){if(!t)return!1;switch(jt(t.entity_id)){case"climate":return"off"!==t.state&&"unavailable"!==t.state;case"vacuum":return"cleaning"===t.state||"returning"===t.state;case"lock":return"unlocked"===t.state||"open"===t.state||"jammed"===t.state;case"cover":return"open"===t.state||"opening"===t.state||"closing"===t.state;case"media_player":return"playing"===t.state||"on"===t.state;case"camera":return"streaming"===t.state||"recording"===t.state;case"sensor":case"event":return!1;default:return"on"===t.state||"open"===t.state||"home"===t.state}}function Bt(t){const e=t&&"light"===jt(t.entity_id)&&"on"===t.state?t.attributes.rgb_color:void 0;if(3===e?.length)return`--tone:rgb(${e.join(",")});--on-tone:${Ot(Dt(e))}`;const i=t?function(t){const e=jt(t.entity_id);return"climate"!==e||"cool"!==t.state&&"cooling"!==t.attributes.hvac_action?"binary_sensor"===e&&["smoke","moisture","gas","carbon_monoxide","problem","safety"].includes(Ut(t)??"")||"lock"===e&&"jammed"===t.state?"alert":"accent":"cool"}(t):"accent";return`--tone:var(--${i});--on-tone:var(--on-${i})`}function Ft(t,e){const i=t?.attributes.icon;if(i?.startsWith("mdi:")){const t=i.slice(4);if(zt[t])return t;if(customElements.get("ha-icon"))return i}const s=jt(e),n=Nt(t),o=t?Ut(t):void 0;switch(s){case"light":return n?"lightbulb":"lightbulb-outline";case"switch":case"input_boolean":return"outlet"===o?n?"power-plug":"power-plug-off":n?"toggle-on":"toggle-off";case"fan":return n?"fan":"fan-off";case"climate":return"cool"===t?.state?"snowflake":"air-conditioner";case"vacuum":return"robot-vacuum";case"camera":return"cctv";case"lock":return n?"lock-open":"lock";case"cover":return"garage"===o?n?"garage-open":"garage":"window"===o?n?"window-open":"window-closed":"curtain"===o?"curtains":"door"===o?n?"door-open":"door-closed":n?"blinds":"blinds-closed";case"binary_sensor":return"motion"===o||"occupancy"===o||"presence"===o?n?"motion-sensor":"motion-sensor-off":"door"===o||"opening"===o?n?"door-open":"door-closed":"window"===o?n?"window-open":"window-closed":"garage_door"===o?n?"garage-open":"garage":"moisture"===o?"leak":"smoke"===o||"heat"===o?"fire":"eye";case"sensor":return"temperature"===o?"thermometer":"humidity"===o?"humidity":"power"===o||"energy"===o||"current"===o||"voltage"===o?"lightning-bolt":"battery"===o?"battery":"gauge";case"event":return"doorbell"===o?"doorbell":"bell";case"media_player":return"speaker"===o?"speaker":"television";case"scene":return"palette";case"script":case"button":case"input_button":return"play-circle";default:return"grid"}}function Rt(t){const e=jt(t);return["scene","script","button","input_button"].includes(e)?"run":["light","switch","fan","input_boolean","automation","media_player","climate","cover","vacuum","humidifier","siren"].includes(e)?"toggle":"sheet"}async function Wt(t,e){const i=e.entity_id,s=jt(i),n={entity_id:i};switch(s){case"climate":return t.callService("climate","off"===e.state?"turn_on":"turn_off",n);case"vacuum":return t.callService("vacuum","cleaning"===e.state?"return_to_base":"start",n);case"cover":return t.callService("cover","toggle",n);case"scene":case"script":return t.callService(s,"turn_on",n);case"button":case"input_button":return t.callService(s,"press",n);default:return t.callService("homeassistant","toggle",n)}}const qt=t=>`⁦${t}⁩`;function Xt(t,e,i=1){return new Intl.NumberFormat(Et[e],{maximumFractionDigits:i}).format(t)}function Yt(t,e){const i=Number(t.state);if(""===t.state||Number.isNaN(i))return;const s=t.attributes.unit_of_measurement??"",n="%"===s||s.startsWith("°")?"":" ";return qt(`${Xt(i,e)}${s?n+s:""}`)}function Kt(t,e,i){if(!e)return t("unavailable");if("unavailable"===e.state||"unknown"===e.state)return t(e.state);const s=jt(e.entity_id),n=Ut(e);if("sensor"===s)return Yt(e,i)??(St(e.state)?t(e.state):e.state);if("binary_sensor"===s){const i="on"===e.state;return"motion"===n||"occupancy"===n||"presence"===n?t(i?"motion":"clear"):["door","window","opening","garage_door"].includes(n??"")?t(i?"open":"closed"):["moisture","smoke","gas","carbon_monoxide","problem"].includes(n??"")?t(i?"detected":"clear"):t(i?"on":"off")}if("light"===s&&"on"===e.state&&"number"==typeof e.attributes.brightness)return qt(`${Math.round(e.attributes.brightness/255*100)}%`);if("climate"===s&&"off"!==e.state){const s=e.attributes.temperature,n=St(e.state)?t(e.state):e.state;return"number"==typeof s?`${n} · ${qt(`${Xt(s,i)}°`)}`:n}return"event"===s?Jt(t,e.state):["scene","script","button","input_button"].includes(s)?t("tap_to_run"):"vacuum"===s&&"number"==typeof e.attributes.battery_level&&"docked"===e.state?`${t("docked")} · ${qt(`${e.attributes.battery_level}%`)}`:St(e.state)?t(e.state):e.state}function Gt(t,e,i){if(!e)return"–";const s=jt(e.entity_id);if("sensor"===s)return Yt(e,i)??e.state;if("climate"===s){const s=e.attributes.current_temperature;return"number"==typeof s?qt(`${Xt(s,i)}°`):Kt(t,e,i)}return"light"===s&&"on"===e.state&&"number"==typeof e.attributes.brightness?qt(`${Math.round(e.attributes.brightness/255*100)}%`):Kt(t,e,i)}function Jt(t,e){const i=Date.parse(e);if(Number.isNaN(i))return"–";const s=Math.round((Date.now()-i)/6e4);return s<1?t("just_now"):s<60?t("min_ago",{n:s}):t("hours_ago",{n:Math.round(s/60)})}function Qt(t,e,i={}){return Object.values(t.states).filter((t=>!i.domains||i.domains.includes(jt(t.entity_id)))).filter((t=>!i.deviceClasses||i.deviceClasses.includes(Ut(t)??""))).map((i=>({id:i.entity_id,name:Zt(t,e,i.entity_id),entity:i}))).sort(((t,e)=>t.name.localeCompare(e.name)))}const te=12,ee="#E9971D",ie=()=>Math.random().toString(36).slice(2,10)+Date.now().toString(36).slice(-4),se={floorplan:{w:12,h:10,minW:4,minH:4},tile:{w:3,h:2,minW:2,minH:2},camera:{w:6,h:5,minW:3,minH:3},heading:{w:12,h:1,minW:2,minH:1},clock:{w:4,h:3,minW:3,minH:2}};function ne(t){return{home_name:"",language:t,accent:ee,theme:"schedule",dark_from:"19:00",dark_to:"06:30",default_page:"",screensaver:{enabled:!0,timeout_min:5},doorbell:{},kiosk:{}}}function oe(t){return{id:ie(),name:t,markers:[]}}function re(t,e={},i={}){const{w:s,h:n}=se[t];return{id:ie(),type:t,x:0,y:0,w:s,h:n,config:e,...i}}const ae=(t,e)=>t.x<e.x+e.w&&e.x<t.x+t.w&&t.y<e.y+e.h&&e.y<t.y+t.h;function le(t,e){const i=t.map((t=>{const e={...t};return e.w=Math.min(Math.max(e.w,1),te),e.x=Math.min(Math.max(e.x,0),te-e.w),e.y=Math.max(e.y,0),e})),s=i.find((t=>t.id===e)),n=s?[s]:[];for(const r of i.filter((t=>t!==s)).sort(((t,e)=>t.y-e.y||t.x-e.x))){for(;n.some((t=>ae(t,r)));)r.y++;n.push(r)}const o=[];for(const r of n.sort(((t,e)=>t.y-e.y||t.x-e.x))){for(;r.y>0&&!o.some((t=>ae(t,{...r,y:r.y-1})));)r.y--;o.push(r)}return o}function ce(t,e=0){let i=0,s=e,n=0;return t.map((t=>{i+t.w>te&&(i=0,s+=n,n=0);const e={...t,x:i,y:s};return i+=t.w,n=Math.max(n,t.h),e}))}const de=[{id:"blank",icon:"dashboard",label:"template_blank"},{id:"home",icon:"home",label:"template_home"},{id:"power",icon:"lightning-bolt",label:"template_power"},{id:"security",icon:"shield-home",label:"template_security"},{id:"doorbell",icon:"doorbell",label:"template_doorbell"},{id:"climate",icon:"air-conditioner",label:"template_climate"}];function pe(t,e,i,s){const n=de.find((e=>e.id===t)),o=(t,s,n=8)=>Qt(e,i,{domains:t,deviceClasses:s}).slice(0,n).map((t=>t.id)),r=t=>t.map((t=>re("tile",{entity:t}))),a=(t,e=6,i=5)=>t.map((t=>re("camera",{entity:t},{w:e,h:i})));let l=[];switch(t){case"home":l=[re("floorplan",{floors:[oe(s("floor_default"))]})];break;case"power":l=ce([...r(o(["sensor"],["power","energy"])),...r(o(["switch"],void 0,8))]);break;case"security":l=ce([...a(o(["camera"],void 0,4)),...r(o(["lock"])),...r(o(["binary_sensor"],["door","window","opening","motion","occupancy","smoke","moisture"]))]);break;case"doorbell":{const t=i.settings.doorbell.camera_entity??o(["camera"],void 0,1)[0],e=i.settings.doorbell.lock_entity??o(["lock"],void 0,1)[0],s=o(["event"],["doorbell"],1);l=ce([...t?a([t],8,7):[],...r([e,...s].filter(Boolean)).map((t=>({...t,w:4})))]);break}case"climate":l=ce([...r(o(["climate"])),...r(o(["sensor"],["temperature","humidity"]))])}return{id:ie(),title:s("blank"===t?"untitled":n.label),icon:n.icon,widgets:le(l)}}function he(t,e){const i=ne(e),s={...i,...t?.settings??{}};return s.screensaver={...i.screensaver,...t?.settings?.screensaver??{}},s.doorbell={...t?.settings?.doorbell??{}},s.kiosk={...t?.settings?.kiosk??{}},{version:1,settings:s,names:{...t?.names??{}},pages:Array.isArray(t?.pages)?t.pages:[]}}async function ue(t,e){await t.callWS({type:"smartnest/config/save",config:e})}function ge(t,e){for(const i of t.pages){const t=i.widgets.find((t=>t.id===e));if(t)return t}}const me="#151A1E",be="#1E252B",fe="#2A333B",ve="#3A454F",ye="#55616C",xe="#9AA4AD",_e="#F2ECE2",we="#965A00",$e="#18BCF2",ke="#2FB57A",Ae="#F26B68",Ce="#C62828";const He=r`
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
`,Ve="smartnest-kiosk";function Me(){try{return"1"===localStorage.getItem(Ve)}catch{return!1}}function Le(t,e){let i=2166136261;const s=`${e}:${t}`;for(let n=0;n<2e3;n++){for(let t=0;t<s.length;t++)i^=s.charCodeAt(t),i=Math.imul(i,16777619)>>>0;i^=n}return i.toString(16).padStart(8,"0")}function Se(t){const e=function(){const t=document.querySelector("home-assistant")?.shadowRoot?.querySelector("home-assistant-main");return t?.shadowRoot??null}();if(!e)return;let i=e.getElementById("smartnest-kiosk");t&&!i?(i=document.createElement("style"),i.id="smartnest-kiosk",i.textContent=":host { --mdc-drawer-width: 0px !important; } ha-sidebar { display: none !important; }",e.appendChild(i)):t||i?.remove()}let Ee;var ze=Object.defineProperty,Pe=Object.getOwnPropertyDescriptor,Oe=(t,e,i,s)=>{for(var n,o=s>1?void 0:s?Pe(e,i):e,r=t.length-1;r>=0;r--)(n=t[r])&&(o=(s?n(e,i,o):n(o))||o);return s&&o&&ze(e,i,o),o};let De=class extends lt{constructor(){super(...arguments),this.icon=""}render(){const t=zt[this.icon]??zt[this.icon.replace(/^mdi:/,"")];return t?B`<svg viewBox="0 0 24 24" aria-hidden="true">${F`<path d=${t}></path>`}</svg>`:this.icon.startsWith("mdi:")&&customElements.get("ha-icon")?B`<ha-icon .icon=${this.icon}></ha-icon>`:this.icon?B`<svg viewBox="0 0 24 24" aria-hidden="true">${F`<path d=${zt.grid}></path>`}</svg>`:W}};De.styles=r`
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
  `,Oe([ut()],De.prototype,"icon",2),De=Oe([dt("sn-icon")],De);var Te=Object.defineProperty,Ie=Object.getOwnPropertyDescriptor,je=(t,e,i,s)=>{for(var n,o=s>1?void 0:s?Ie(e,i):e,r=t.length-1;r>=0;r--)(n=t[r])&&(o=(s?n(e,i,o):n(o))||o);return s&&o&&Te(e,i,o),o};let Ze=class extends lt{constructor(){super(...arguments),this.filter={},this.q=""}firstUpdated(){this.renderRoot.querySelector("input")?.focus()}render(){const{ctx:t}=this,e=this.q.trim().toLowerCase(),i=Qt(t.hass,t.config,this.filter).filter((t=>!e||t.name.toLowerCase().includes(e)||t.id.includes(e))).slice(0,200);return B`
      <input type="search" placeholder=${t.t("search")} .value=${this.q} @input=${t=>this.q=t.target.value} />
      ${i.length?B`<ul>
            ${i.map((e=>B`<li>
                <button class="pressable" @click=${()=>this.onPick(e.id)}>
                  <span class="ic"><sn-icon .icon=${Ft(e.entity,e.id)} style="--icon-size:20px"></sn-icon></span>
                  <span class="grow"><span class="name">${e.name}</span><span class="id ltr">${e.id}</span></span>
                  <span class="state">${Kt(t.t,e.entity,t.lang)}</span>
                </button>
              </li>`))}
          </ul>`:B`<div class="empty">${t.t("no_entities")}</div>`}
    `}};Ze.styles=[He,r`
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
    `],je([ut({attribute:!1})],Ze.prototype,"ctx",2),je([ut({attribute:!1})],Ze.prototype,"filter",2),je([ut({attribute:!1})],Ze.prototype,"onPick",2),je([gt()],Ze.prototype,"q",2),Ze=je([dt("sn-entity-picker")],Ze);const Ue=(...t)=>B`<div style="display:grid;gap:18px">${t}</div>`,Ne=(...t)=>B`<div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">${t}</div>`,Be=(t,...e)=>B`<section style="display:grid;gap:12px;padding-top:6px">
    <h3 style="margin:0;font-size:13px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--text-2)">${t}</h3>
    ${e}
  </section>`;function Fe(t,e,i,s,n,o=!1){const r=i?t.hass.states[i]:void 0;return B`<div class="field">
    ${e}
    <div style="display:flex;gap:8px">
      <button
        class="btn pressable"
        style="flex:1;justify-content:flex-start;border-radius:var(--r-sm)"
        @click=${()=>t.showSheet({title:e,render:t=>B`<sn-entity-picker
              .ctx=${t}
              .filter=${s}
              .onPick=${e=>{n(e),t.closeSheet()}}
            ></sn-entity-picker>`})}
      >
        ${i?B`<sn-icon .icon=${Ft(r,i)} style="--icon-size:20px"></sn-icon>${Zt(t.hass,t.config,i)}`:B`<span class="muted">${t.t(o?"none":"choose_entity")}</span>`}
      </button>
      ${o&&i?B`<button class="icon-btn pressable" aria-label=${t.t("delete")} @click=${()=>n(void 0)}>
            <sn-icon icon="close" style="--icon-size:18px"></sn-icon>
          </button>`:W}
    </div>
  </div>`}const Re={camera:{domains:["camera"]}};function We(t,e,i){t.update((t=>{const s=ge(t,e);s&&i(s,t)}))}function qe(t,e,i){t.showSheet({title:t.t("widget_settings"),render:t=>{const e=ge(t.config,i);if(!e)return B``;const s=t.t;switch(e.type){case"tile":case"camera":return Ue(Fe(t,s("entity"),e.config.entity,Re[e.type]??{},(e=>We(t,i,(t=>t.config.entity=e)))),e.config.entity?function(t,e){return B`<label class="field"
    >${t.t("display_name")}
    <input
      type="text"
      .value=${t.config.names[e]??""}
      placeholder=${t.hass.states[e]?.attributes.friendly_name??e}
      @change=${i=>t.update((t=>{const s=i.target.value.trim();s?t.names[e]=s:delete t.names[e]}))}
    />
    <span class="hint">${t.t("display_name_hint")}</span>
  </label>`}(t,e.config.entity):W);case"heading":return B`<label class="field"
            >${s("heading_text")}
            <input type="text" .value=${e.config.text??""} @change=${e=>We(t,i,(t=>t.config.text=e.target.value))} />
          </label>`;case"floorplan":return Ue(B`<div class="field">
              ${s("plan_in_dark")}
              <div class="seg">
                ${[!1,!0].map((n=>B`<button aria-pressed=${!!e.config.invert_dark===n} @click=${()=>We(t,i,(t=>t.config.invert_dark=n))}>
                    ${s(n?"plan_invert":"plan_original")}
                  </button>`))}
              </div>
            </div>`,B`<p class="muted" style="margin:0;font-size:14px">${s("drag_hint")}</p>`);default:return B`<p class="muted">${s(`widget_${e.type}`)}</p>`}}})}const Xe=[{type:"tile",icon:"lightbulb"},{type:"floorplan",icon:"layers"},{type:"camera",icon:"cctv"},{type:"clock",icon:"clock-outline"},{type:"heading",icon:"title"}];function Ye(t,e,i){const s=(t,i)=>t.update((t=>{const s=t.pages.findIndex((t=>t.id===e));s>=0&&i(t,s)}));t.showSheet({title:t.t("page_settings"),render:t=>{const n=t.config.pages.findIndex((t=>t.id===e)),o=t.config.pages[n];if(!o)return B``;const r=t.t,a=e=>s(t,((t,i)=>{const s=i+e;s<0||s>=t.pages.length||([t.pages[i],t.pages[s]]=[t.pages[s],t.pages[i]])}));return Ue(B`<label class="field"
          >${r("page_title")}
          <input type="text" .value=${o.title} @change=${e=>s(t,((t,i)=>t.pages[i].title=e.target.value.trim()||o.title))} />
        </label>`,B`<div class="field">
          ${r("page_icon")}
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(48px,1fr));gap:6px">
            ${Pt.map((e=>B`<button
                class="icon-btn pressable ${o.icon===e?"primary":""}"
                style="width:100%;border-radius:var(--r-sm)"
                aria-pressed=${o.icon===e}
                @click=${()=>s(t,((t,i)=>t.pages[i].icon=e))}
              >
                <sn-icon .icon=${e}></sn-icon>
              </button>`))}
          </div>
        </div>`,Ne(B`<button class="btn pressable" ?disabled=${0===n} @click=${()=>a(-1)}>${r("move_earlier")}</button>`,B`<button class="btn pressable" ?disabled=${n===t.config.pages.length-1} @click=${()=>a(1)}>${r("move_later")}</button>`,B`<span style="flex:1"></span>`,B`<button
            class="btn danger pressable"
            ?disabled=${t.config.pages.length<=1}
            @click=${()=>{confirm(r("delete_confirm"))&&(s(t,((t,i)=>{t.pages.splice(i,1),t.settings.default_page===e&&(t.settings.default_page=t.pages[0]?.id??"")})),t.closeSheet(),i())}}
          >
            <sn-icon icon="delete" style="--icon-size:20px"></sn-icon>${r("delete")}
          </button>`))}})}const Ke=[ee,"#18BCF2","#2FB57A","#F26B68","#A78BFA","#F5BE6A"],Ge=[{id:"schedule",label:"theme_schedule"},{id:"auto",label:"theme_auto"},{id:"light",label:"theme_light"},{id:"dark",label:"theme_dark"}];function Je(t,e){t.showSheet({title:t.t("settings"),render:t=>{const i=t.config.settings,s=t.t,n=e=>t.update(e);return Ue(B`<label class="field"
          >${s("home_name")}
          <input
            type="text"
            .value=${i.home_name}
            placeholder=${t.hass.config?.location_name??""}
            @change=${t=>n((e=>e.settings.home_name=t.target.value.trim()))}
          />
        </label>`,B`<div class="field">
          ${s("language")}
          <div class="seg">
            ${Vt.map((t=>B`<button aria-pressed=${i.language===t.id} @click=${()=>n((e=>e.settings.language=t.id))}>${t.label}</button>`))}
          </div>
        </div>`,B`<div class="field">
          ${s("theme")}
          <div class="seg">
            ${Ge.map((t=>B`<button aria-pressed=${i.theme===t.id} @click=${()=>n((e=>e.settings.theme=t.id))}>${s(t.label)}</button>`))}
          </div>
          ${"schedule"===i.theme?Ne(B`<span>${s("dark_from")}</span>`,B`<input type="time" style="width:auto" .value=${i.dark_from} @change=${t=>n((e=>e.settings.dark_from=t.target.value))} />`,B`<span>${s("dark_to")}</span>`,B`<input type="time" style="width:auto" .value=${i.dark_to} @change=${t=>n((e=>e.settings.dark_to=t.target.value))} />`):W}
        </div>`,B`<div class="field">
          ${s("accent")}
          ${Ne(...Ke.map((t=>B`<button
                class="pressable"
                aria-label=${t}
                aria-pressed=${i.accent.toUpperCase()===t}
                style="width:40px;height:40px;border-radius:999px;background:${t};box-shadow:${i.accent.toUpperCase()===t?"0 0 0 3px var(--surface-solid), 0 0 0 5px "+t:"none"}"
                @click=${()=>n((e=>e.settings.accent=t))}
              ></button>`)),B`<input
              type="color"
              aria-label=${s("accent")}
              .value=${i.accent}
              style="width:40px;height:40px;border:0;padding:0;background:none;border-radius:999px"
              @change=${t=>n((e=>e.settings.accent=t.target.value.toUpperCase()))}
            />`)}
        </div>`,B`<label class="field"
          >${s("default_page")}
          <select @change=${t=>n((e=>e.settings.default_page=t.target.value))}>
            ${t.config.pages.map((t=>B`<option value=${t.id} ?selected=${i.default_page===t.id}>${t.title}</option>`))}
          </select>
        </label>`,Be(s("screensaver"),B`<div class="seg">
            ${[!0,!1].map((t=>B`<button aria-pressed=${i.screensaver.enabled===t} @click=${()=>n((e=>e.settings.screensaver.enabled=t))}>
                ${s(t?"on":"off")}
              </button>`))}
          </div>`,i.screensaver.enabled?B`<label class="field"
                  >${s("screensaver_after")}
                  <input
                    type="number"
                    min="1"
                    max="120"
                    .value=${String(i.screensaver.timeout_min)}
                    @change=${t=>n((e=>e.settings.screensaver.timeout_min=Math.max(1,Number(t.target.value)||5)))}
                  />
                </label>
                ${Fe(t,s("temp_entity"),i.screensaver.temp_entity,{domains:["sensor","climate","weather"]},(t=>n((e=>e.settings.screensaver.temp_entity=t))),!0)}`:W),Be(s("doorbell"),Fe(t,s("doorbell_trigger"),i.doorbell.trigger_entity,{domains:["event","binary_sensor"]},(t=>n((e=>e.settings.doorbell.trigger_entity=t))),!0),Fe(t,s("doorbell_camera"),i.doorbell.camera_entity,{domains:["camera"]},(t=>n((e=>e.settings.doorbell.camera_entity=t))),!0),Fe(t,s("doorbell_lock"),i.doorbell.lock_entity,{domains:["lock"]},(t=>n((e=>e.settings.doorbell.lock_entity=t))),!0),B`<button class="btn pressable" style="justify-self:start" @click=${e.testDoorbell}>
            <sn-icon icon="bell-ring" style="--icon-size:20px"></sn-icon>${s("doorbell_test")}
          </button>`),Be(s("kiosk"),B`<form
            class="field"
            @submit=${e=>{e.preventDefault();const i=e.currentTarget.querySelector("input"),o=i.value.trim();if(!/^\d{4,8}$/.test(o))return t.toast(s("kiosk_pin_invalid"));const r=Math.random().toString(36).slice(2,10);n((t=>t.settings.kiosk={pin_hash:Le(o,r),pin_salt:r,pin_length:o.length})),i.value="",t.toast(s("kiosk_pin_saved"))}}
          >
            ${s("kiosk_pin")}
            <div style="display:flex;gap:8px">
              <input type="password" inputmode="numeric" pattern="[0-9]*" maxlength="8" autocomplete="off" placeholder="••••" style="flex:1" />
              <button class="btn primary pressable" type="submit">${s(i.kiosk.pin_hash?"kiosk_pin_change":"kiosk_pin_set")}</button>
            </div>
            <span class="hint">${s("kiosk_pin_hint")}</span>
            <span class="hint">${s("kiosk_full_lock")}</span>
          </form>`,i.kiosk.pin_hash?B`<button class="btn pressable" style="justify-self:start" @click=${()=>n((t=>t.settings.kiosk={}))}>
                <sn-icon icon="lock-open" style="--icon-size:20px"></sn-icon>${s("kiosk_remove_pin")}
              </button>`:W),Be(s("about"),B`<div style="display:flex;align-items:center;gap:14px">
            <img src="${t.assetBase}logo/smartnest-symbol-${t.dark?"white":"color"}.svg" alt="SmartNest" style="width:48px;height:48px" />
            <div style="display:grid;gap:2px">
              <strong>SmartNest</strong>
              <span class="muted" style="font-size:13px">${s("tagline")}</span>
              <span class="muted ltr" style="font-size:12px;font-family:'JetBrains Mono',monospace">${s("version")} ${e.version}</span>
            </div>
          </div>`))}})}var Qe=Object.defineProperty,ti=Object.getOwnPropertyDescriptor,ei=(t,e,i,s)=>{for(var n,o=s>1?void 0:s?ti(e,i):e,r=t.length-1;r>=0;r--)(n=t[r])&&(o=(s?n(e,i,o):n(o))||o);return s&&o&&Qe(e,i,o),o};let ii=class extends lt{constructor(){super(...arguments),this.sheets=[],this.closing=!1,this.onKey=t=>{"Escape"===t.key&&this.sheets.length&&this.dismiss()}}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this.onKey)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this.onKey)}dismiss(){const t=this.sheets[this.sheets.length-1];1===this.sheets.length?(this.closing=!0,window.setTimeout((()=>{this.closing=!1,t.onClose?.(),this.ctx.closeSheet()}),190)):(t.onClose?.(),this.ctx.closeSheet())}render(){return this.sheets.length?this.sheets.map(((t,e)=>B`
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
      `)):W}};ii.styles=[He,r`
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
    `],ei([ut({attribute:!1})],ii.prototype,"ctx",2),ei([ut({attribute:!1})],ii.prototype,"sheets",2),ei([gt()],ii.prototype,"closing",2),ii=ei([dt("sn-sheet-host")],ii);const si=(t,e,i)=>{const s=new Map;for(let n=e;n<=i;n++)s.set(t[n],n);return s},ni=bt(class extends ft{constructor(t){if(super(t),t.type!==mt)throw Error("repeat() can only be used in text expressions")}dt(t,e,i){let s;void 0===i?i=e:void 0!==e&&(s=e);const n=[],o=[];let r=0;for(const a of t)n[r]=s?s(a,r):r,o[r]=i(a,r),r++;return{values:o,keys:n}}render(t,e,i){return this.dt(t,e,i).values}update(t,[e,i,s]){const n=t._$AH,{values:o,keys:r}=this.dt(e,i,s);if(!Array.isArray(n))return this.ut=r,o;const a=this.ut??=[],l=[];let c,d,p=0,h=n.length-1,u=0,g=o.length-1;for(;p<=h&&u<=g;)if(null===n[p])p++;else if(null===n[h])h--;else if(a[p]===r[u])l[u]=_t(n[p],o[u]),p++,u++;else if(a[h]===r[g])l[g]=_t(n[h],o[g]),h--,g--;else if(a[p]===r[g])l[g]=_t(n[p],o[g]),xt(t,l[g+1],n[p]),p++,g--;else if(a[h]===r[u])l[u]=_t(n[h],o[u]),xt(t,n[p],n[h]),h--,u++;else if(void 0===c&&(c=si(r,u,g),d=si(a,p,h)),c.has(a[p]))if(c.has(a[h])){const e=d.get(r[u]),i=void 0!==e?n[e]:null;if(null===i){const e=xt(t,n[p]);_t(e,o[u]),l[u]=e}else l[u]=_t(i,o[u]),xt(t,n[p],i),n[e]=null;u++}else kt(n[h]),h--;else kt(n[p]),p++;for(;u<=g;){const e=xt(t,l[g+1]);_t(e,o[u]),l[u++]=e}for(;p<=h;){const t=n[p++];null!==t&&kt(t)}return this.ut=r,$t(t,l),R}});var oi=Object.defineProperty,ri=Object.getOwnPropertyDescriptor,ai=(t,e,i,s)=>{for(var n,o=s>1?void 0:s?ri(e,i):e,r=t.length-1;r>=0;r--)(n=t[r])&&(o=(s?n(e,i,o):n(o))||o);return s&&o&&oi(e,i,o),o};let li=class extends lt{bind(){const t=this.renderRoot.querySelector(".tile");t&&!this.unbind&&(this.unbind=function(t,e,i){let s,n=null,o=!1;const r=()=>{window.clearTimeout(s),s=void 0},a=t=>{0===t.button&&(o=!1,n={x:t.clientX,y:t.clientY},r(),s=window.setTimeout((()=>{o=!0,navigator.vibrate?.(8),i()}),450))},l=t=>{n&&Math.hypot(t.clientX-n.x,t.clientY-n.y)>10&&(r(),n=null)},c=()=>{const t=null!==n&&void 0!==s;r(),n=null,t&&!o&&e()},d=()=>{r(),n=null},p=t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),e())},h=t=>t.preventDefault();return t.addEventListener("pointerdown",a),t.addEventListener("pointermove",l),t.addEventListener("pointerup",c),t.addEventListener("pointercancel",d),t.addEventListener("pointerleave",d),t.addEventListener("keydown",p),t.addEventListener("contextmenu",h),()=>{r(),t.removeEventListener("pointerdown",a),t.removeEventListener("pointermove",l),t.removeEventListener("pointerup",c),t.removeEventListener("pointercancel",d),t.removeEventListener("pointerleave",d),t.removeEventListener("keydown",p),t.removeEventListener("contextmenu",h)}}(t,(()=>this.tap()),(()=>this.ctx.openEntity(this.widget.config.entity))))}firstUpdated(){this.bind()}connectedCallback(){super.connectedCallback(),this.hasUpdated&&this.bind()}disconnectedCallback(){super.disconnectedCallback(),this.unbind?.(),this.unbind=void 0}tap(){if(this.ctx.editing)return;const t=this.widget.config.entity,e=this.ctx.hass.states[t];if(!e||"unavailable"===e.state||"sheet"===Rt(t))return this.ctx.openEntity(t);navigator.vibrate?.(5),Wt(this.ctx.hass,e).catch((()=>this.ctx.toast(this.ctx.t("error"))))}render(){const{ctx:t}=this,e=this.widget.config.entity??"",i=t.hass.states[e],s=Nt(i),n=t.narrow||this.widget.h>=3||this.widget.w<=2;return B`
      <div
        class="tile glass pressable ${n?"vertical":""} ${s?"on":""} ${i&&"unavailable"!==i.state?"":"off-line"}"
        style=${Bt(i)}
        role="button"
        tabindex="0"
        aria-pressed=${s}
      >
        <span class="ic"><sn-icon .icon=${Ft(i,e)}></sn-icon></span>
        <span class="text">
          <span class="name">${Zt(t.hass,t.config,e)}</span>
          <span class="state">${Kt(t.t,i,t.lang)}</span>
        </span>
      </div>
    `}};li.styles=[He,r`
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
    `],ai([ut({attribute:!1})],li.prototype,"ctx",2),ai([ut({attribute:!1})],li.prototype,"widget",2),li=ai([dt("sn-w-tile")],li);var ci=Object.defineProperty,di=Object.getOwnPropertyDescriptor,pi=(t,e,i,s)=>{for(var n,o=s>1?void 0:s?di(e,i):e,r=t.length-1;r>=0;r--)(n=t[r])&&(o=(s?n(e,i,o):n(o))||o);return s&&o&&ci(e,i,o),o};let hi=class extends lt{constructor(){super(...arguments),this.floorIdx=0,this.area={w:0,h:0},this.uploading=!1}connectedCallback(){super.connectedCallback(),this.ro=new ResizeObserver((()=>this.measure())),this.updateComplete.then((()=>{const t=this.renderRoot.querySelector(".area");t&&this.ro.observe(t)}))}disconnectedCallback(){super.disconnectedCallback(),this.ro?.disconnect()}measure(){const t=this.renderRoot.querySelector(".area");if(!t)return;const e=getComputedStyle(t),i=parseFloat(e.paddingLeft)+parseFloat(e.paddingRight),s=parseFloat(e.paddingTop)+parseFloat(e.paddingBottom),n=t.clientWidth-i,o=t.clientHeight-s;n===this.area.w&&o===this.area.h||(this.area={w:n,h:o})}get floors(){return this.widget.config.floors??[]}get floor(){return this.floors[Math.min(this.floorIdx,this.floors.length-1)]}edit(t){const e=Math.min(this.floorIdx,this.floors.length-1);this.ctx.update((i=>{const s=ge(i,this.widget.id);s&&(s.config.floors??=[],t(s.config.floors,s.config.floors[e],i))}))}willUpdate(t){t.has("ctx")&&!this.ctx.editing&&(this.selected=void 0),this.toggleAttribute("editing",this.ctx.editing),this.toggleAttribute("narrow",this.ctx.narrow),this.toggleAttribute("dark",this.ctx.dark)}onDown(t,e){if(0===t.button){if(t.stopPropagation(),this.ctx.editing)return t.currentTarget.setPointerCapture(t.pointerId),this.selected=e.id,void(this.drag={id:e.id,pointerId:t.pointerId,startX:t.clientX,startY:t.clientY,origX:e.x,origY:e.y,x:e.x,y:e.y,moved:!1});window.clearTimeout(this.press?.timer),this.press={id:e.id,x:t.clientX,y:t.clientY,timer:window.setTimeout((()=>{this.press=void 0,navigator.vibrate?.(8),this.ctx.openEntity(e.entity)}),450)}}}onMove(t){if(this.drag&&t.pointerId===this.drag.pointerId){const e=this.stageSize(),i=(t.clientX-this.drag.startX)/e.w*100,s=(t.clientY-this.drag.startY)/e.h*100,n=this.drag.moved||Math.hypot(t.clientX-this.drag.startX,t.clientY-this.drag.startY)>3;this.drag={...this.drag,moved:n,x:Math.min(100,Math.max(0,this.drag.origX+i)),y:Math.min(100,Math.max(0,this.drag.origY+s))}}else this.press&&Math.hypot(t.clientX-this.press.x,t.clientY-this.press.y)>10&&(window.clearTimeout(this.press.timer),this.press=void 0)}onUp(t,e){if(this.drag&&t.pointerId===this.drag.pointerId){const{x:t,y:i,moved:s}=this.drag;return this.drag=void 0,void(s&&this.edit(((s,n)=>{const o=n?.markers.find((t=>t.id===e.id));o&&Object.assign(o,{x:Math.round(10*t)/10,y:Math.round(10*i)/10})})))}this.press?.id===e.id&&(window.clearTimeout(this.press.timer),this.press=void 0,this.tap(e))}onCancel(){window.clearTimeout(this.press?.timer),this.press=void 0,this.drag=void 0}tap(t){const e=this.ctx.hass.states[t.entity];if(!e||"unavailable"===e.state||"sheet"===Rt(t.entity))return this.ctx.openEntity(t.entity);navigator.vibrate?.(5),Wt(this.ctx.hass,e).catch((()=>this.ctx.toast(this.ctx.t("error"))))}stageSize(){const t=this.natural?this.natural.w/this.natural.h:1.6;if(this.ctx.narrow)return{w:this.area.w,h:this.area.w/t};let e=this.area.w,i=e/t;return i>this.area.h&&(i=this.area.h,e=i*t),{w:Math.max(e,0),h:Math.max(i,0)}}addFloor(){const t=this.floors.length+1;this.edit((e=>e.push(oe(`${this.ctx.t("floor")} ${t}`)))),this.floorIdx=this.floors.length,this.natural=void 0}floorSheet(){const{t:t}=this.ctx,e=this.floor;e&&this.ctx.showSheet({title:t("floor"),render:i=>B`
        <div style="display:grid;gap:16px">
          <label class="field"
            >${t("floor_name")}
            <input
              type="text"
              .value=${e.name}
              @change=${t=>this.edit(((i,s)=>s&&(s.name=t.target.value.trim()||e.name)))}
            />
          </label>
          ${this.floors.length>1?B`<button
                class="btn danger pressable"
                @click=${()=>{if(!confirm(t("delete_confirm")))return;const e=this.floorIdx;this.edit((t=>t.splice(e,1))),this.floorIdx=Math.max(0,e-1),i.closeSheet()}}
              >
                <sn-icon icon="delete"></sn-icon>${t("delete_floor")}
              </button>`:W}
        </div>
      `})}pickFile(){this.renderRoot.querySelector("input[type=file]")?.click()}async onFile(t){const e=t.target,i=e.files?.[0];if(e.value="",i){this.uploading=!0;try{const t=await async function(t,e){const i=new FormData;i.append("file",e);const s=await t.fetchWithAuth("/api/smartnest/upload",{method:"POST",body:i});if(!s.ok)throw new Error(`upload ${s.status}`);return(await s.json()).url}(this.ctx.hass,i);this.natural=void 0,this.edit(((e,i)=>i&&(i.image=t)))}catch{this.ctx.toast(this.ctx.t("upload_failed"))}finally{this.uploading=!1}}}addDevice(){this.ctx.showSheet({title:this.ctx.t("add_device"),render:t=>B`<sn-entity-picker
        .ctx=${t}
        .onPick=${e=>{const i=ie(),s=["sensor","climate"].includes(jt(e))?"value":"icon";this.edit(((t,n)=>n?.markers.push({id:i,entity:e,x:50,y:50,display:s}))),this.selected=i,t.closeSheet()}}
      ></sn-entity-picker>`})}renameDevice(t){const{t:e}=this.ctx;this.ctx.showSheet({title:e("display_name"),render:i=>B`<label class="field"
        >${Zt(i.hass,i.config,t.entity)}
        <input
          type="text"
          .value=${i.config.names[t.entity]??""}
          placeholder=${i.hass.states[t.entity]?.attributes.friendly_name??t.entity}
          @change=${e=>i.update((i=>{const s=e.target.value.trim();s?i.names[t.entity]=s:delete i.names[t.entity]}))}
        />
        <span class="hint">${e("display_name_hint")}</span>
      </label>`})}renderMarker(t){const{ctx:e}=this,i=e.hass.states[t.entity],s=Nt(i),n=this.drag?.id===t.id,o=n?this.drag.x:t.x,r=n?this.drag.y:t.y,a=["marker",s?"on":"",s&&"binary_sensor"===jt(t.entity)&&["motion","occupancy","presence"].includes(i?.attributes.device_class)?"pulse":"",i&&"unavailable"!==i.state?"":"dim",e.editing?"editable":"",n?"dragging":"",this.selected===t.id&&e.editing?"selected":""].join(" ");return B`<div
      class=${a}
      style="left:${o}%;top:${r}%;${Bt(i)}"
      role="button"
      tabindex="0"
      aria-label=${Zt(e.hass,e.config,t.entity)}
      @pointerdown=${e=>this.onDown(e,t)}
      @pointermove=${t=>this.onMove(t)}
      @pointerup=${e=>this.onUp(e,t)}
      @pointercancel=${()=>this.onCancel()}
      @contextmenu=${t=>t.preventDefault()}
      @keydown=${i=>"Enter"===i.key&&!e.editing&&this.tap(t)}
    >
      <span class="ic"><sn-icon .icon=${Ft(i,t.entity)}></sn-icon></span>
      ${"value"===t.display?B`<span class="val">${Gt(e.t,i,e.lang)}</span>`:W}
      ${e.editing&&this.selected===t.id&&!n?B`<span class="tag">${Zt(e.hass,e.config,t.entity)}</span>`:W}
    </div>`}renderTools(){const{ctx:t}=this,{t:e}=t,i=this.floor,s=i?.markers.find((t=>t.id===this.selected));return s?B`<div class="tools glass" @pointerdown=${t=>t.stopPropagation()}>
        <span class="label">${Zt(t.hass,t.config,s.entity)}</span>
        <div class="seg">
          ${["icon","value"].map((t=>B`<button
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
      </div>`:B`<div class="tools glass" @pointerdown=${t=>t.stopPropagation()}>
      <button class="btn pressable" ?disabled=${this.uploading} @click=${()=>this.pickFile()}>
        <sn-icon icon="image-plus" style="--icon-size:20px"></sn-icon>
        ${this.uploading?e("loading"):e(i?.image?"replace_plan":"upload_plan")}
      </button>
      <button class="btn primary pressable" ?disabled=${!i?.image} @click=${()=>this.addDevice()}>
        <sn-icon icon="marker-plus" style="--icon-size:20px"></sn-icon>${e("add_device")}
      </button>
      <input type="file" accept="image/png,image/jpeg,image/webp" @change=${this.onFile} />
    </div>`}render(){const{ctx:t}=this,{t:e}=t,i=this.floor,s=this.floors,n=this.stageSize(),o=this.natural?this.natural.w/this.natural.h:1.6;return B`<div class="wrap glass">
      ${s.length>1||t.editing?B`<div class="floors" @pointerdown=${t=>t.stopPropagation()}>
            <div class="seg">
              ${s.map(((e,i)=>B`<button
                  aria-pressed=${i===this.floorIdx}
                  @click=${()=>{if(i===this.floorIdx&&t.editing)return this.floorSheet();this.floorIdx=i,this.selected=void 0,this.natural=void 0}}
                >
                  <sn-icon icon="layers" style="--icon-size:16px"></sn-icon>${e.name}
                </button>`))}
              ${t.editing?B`<button aria-label=${e("add_floor")} @click=${()=>this.addFloor()}>
                    <sn-icon icon="plus" style="--icon-size:18px"></sn-icon>
                  </button>`:W}
            </div>
          </div>`:W}
      <div class="area" style=${t.narrow?`aspect-ratio:${o}`:""}>
        ${i?.image?B`<div class="stage" style="width:${n.w}px;height:${n.h}px">
              <img
                class=${this.widget.config.invert_dark?"plan-light":""}
                src=${i.image}
                alt=""
                @load=${t=>{const e=t.target;this.natural={w:e.naturalWidth,h:e.naturalHeight},this.measure()}}
              />
              ${i.markers.map((t=>this.renderMarker(t)))}
            </div>`:B`<div class="empty">
              <sn-icon icon="image"></sn-icon>
              <strong>${e("no_plan")}</strong>
              ${t.isAdmin&&!t.editing?B`<span>${e("no_plan_admin")}</span>`:W}
            </div>`}
      </div>
      ${t.editing&&i?this.renderTools():W}
    </div>`}};hi.styles=[He,r`
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
      input[type="file"] {
        display: none;
      }
    `],pi([ut({attribute:!1})],hi.prototype,"ctx",2),pi([ut({attribute:!1})],hi.prototype,"widget",2),pi([gt()],hi.prototype,"floorIdx",2),pi([gt()],hi.prototype,"selected",2),pi([gt()],hi.prototype,"drag",2),pi([gt()],hi.prototype,"natural",2),pi([gt()],hi.prototype,"area",2),pi([gt()],hi.prototype,"uploading",2),hi=pi([dt("sn-w-floorplan")],hi);var ui=Object.defineProperty,gi=Object.getOwnPropertyDescriptor,mi=(t,e,i,s)=>{for(var n,o=s>1?void 0:s?gi(e,i):e,r=t.length-1;r>=0;r--)(n=t[r])&&(o=(s?n(e,i,o):n(o))||o);return s&&o&&ui(e,i,o),o};function bi(t,e,i){const s=t.states[e]?.attributes.entity_picture;if(s)return t.hassUrl(`${s}${s.includes("?")?"&":"?"}t=${i}`)}function fi(t,e){const i=t.states[e],s=i?.attributes.access_token;if(i&&s)return i.attributes.entity_picture?.startsWith("/dev/")?i.attributes.entity_picture:t.hassUrl(`/api/camera_proxy_stream/${e}?token=${s}`)}let vi=class extends lt{constructor(){super(...arguments),this.bust=Date.now()}connectedCallback(){super.connectedCallback(),this.timer=window.setInterval((()=>this.bust=Date.now()),1e4)}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this.timer)}render(){const{ctx:t}=this,e=this.widget.config.entity,i=e?bi(t.hass,e,this.bust):void 0;return B`
      <button class="cam pressable" @click=${()=>!t.editing&&e&&t.openEntity(e)}>
        ${i?B`<img src=${i} alt="" draggable="false" />`:B`<span class="placeholder"><sn-icon icon="cctv"></sn-icon></span>`}
        <span class="label"><sn-icon icon="cctv" style="--icon-size:16px"></sn-icon>${e?Zt(t.hass,t.config,e):t.t("widget_camera")}</span>
      </button>
    `}};vi.styles=[He,r`
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
    `],mi([ut({attribute:!1})],vi.prototype,"ctx",2),mi([ut({attribute:!1})],vi.prototype,"widget",2),mi([gt()],vi.prototype,"bust",2),vi=mi([dt("sn-w-camera")],vi);var yi=Object.defineProperty,xi=Object.getOwnPropertyDescriptor,_i=(t,e,i,s)=>{for(var n,o=s>1?void 0:s?xi(e,i):e,r=t.length-1;r>=0;r--)(n=t[r])&&(o=(s?n(e,i,o):n(o))||o);return s&&o&&yi(e,i,o),o};let wi=class extends lt{render(){return B`<h2>${this.widget.config.text||this.ctx.t("widget_heading")}</h2>`}};wi.styles=[He,r`
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
    `],_i([ut({attribute:!1})],wi.prototype,"ctx",2),_i([ut({attribute:!1})],wi.prototype,"widget",2),wi=_i([dt("sn-w-heading")],wi);var $i=Object.defineProperty,ki=Object.getOwnPropertyDescriptor,Ai=(t,e,i,s)=>{for(var n,o=s>1?void 0:s?ki(e,i):e,r=t.length-1;r>=0;r--)(n=t[r])&&(o=(s?n(e,i,o):n(o))||o);return s&&o&&$i(e,i,o),o};let Ci=class extends lt{constructor(){super(...arguments),this.now=new Date}connectedCallback(){super.connectedCallback(),this.timer=window.setInterval((()=>this.now=new Date),15e3)}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this.timer)}render(){const{ctx:t}=this,e=Et[t.lang],i=t.config.settings.screensaver.temp_entity,s=i?t.hass.states[i]:void 0;return B`<div class="card glass">
      <div class="time ltr">${this.now.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}</div>
      <div class="date">${this.now.toLocaleDateString(e,{weekday:"long",day:"numeric",month:"long"})}</div>
      ${s?B`<div class="temp"><sn-icon icon="thermometer"></sn-icon>${Gt(t.t,s,t.lang)}</div>`:W}
    </div>`}};Ci.styles=[He,r`
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
      .time {
        font-size: clamp(28px, 22cqi, 60px); /* sized to the card, not the screen */
        white-space: nowrap;
        font-weight: 700;
        line-height: 1;
        letter-spacing: -0.02em;
        font-variant-numeric: tabular-nums;
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
    `],Ai([ut({attribute:!1})],Ci.prototype,"ctx",2),Ai([ut({attribute:!1})],Ci.prototype,"widget",2),Ai([gt()],Ci.prototype,"now",2),Ci=Ai([dt("sn-w-clock")],Ci);var Hi=Object.defineProperty,Vi=Object.getOwnPropertyDescriptor,Mi=(t,e,i,s)=>{for(var n,o=s>1?void 0:s?Vi(e,i):e,r=t.length-1;r>=0;r--)(n=t[r])&&(o=(s?n(e,i,o):n(o))||o);return s&&o&&Hi(e,i,o),o};let Li=class extends lt{constructor(){super(...arguments),this.rects=new Map}willUpdate(){this.toggleAttribute("rtl",this.ctx.rtl),this.rects.clear(),this.ctx.editing&&this.renderRoot?.querySelectorAll(".cell").forEach((t=>this.rects.set(t.dataset.id,t.getBoundingClientRect())))}updated(){this.rects.size&&this.renderRoot.querySelectorAll(".cell").forEach((t=>{const e=this.rects.get(t.dataset.id);if(!e||t.classList.contains("lifted"))return;const i=t.getBoundingClientRect(),s=e.left-i.left,n=e.top-i.top;Math.abs(s)<1&&Math.abs(n)<1||t.animate([{transform:`translate(${s}px, ${n}px)`},{transform:"none"}],{duration:320,easing:"cubic-bezier(0.22, 1, 0.36, 1)"})}))}get widgets(){return this.preview??this.page.widgets}pointerCell(t){const e=this.renderRoot.querySelector(".grid").getBoundingClientRect(),i=(e.width+12)/te,s=this.ctx.rtl?e.right-t.clientX:t.clientX-e.left,n=t.clientY-e.top;return{px:s,py:n,pitchX:i,pitchY:56,col:Math.floor(s/i),row:Math.floor(n/56)}}start(t,e,i){if(0!==t.button||this.ctx.narrow)return;t.preventDefault(),t.stopPropagation(),t.currentTarget.setPointerCapture(t.pointerId);const{col:s,row:n}=this.pointerCell(t);this.gesture={id:e.id,mode:i,pointerId:t.pointerId,offCol:s-e.x,offRow:n-e.y},this.preview=this.page.widgets.map((t=>({...t}))),navigator.vibrate?.(6)}move(t){const e=this.gesture;if(!e||t.pointerId!==e.pointerId||!this.preview)return;const i=this.preview.find((t=>t.id===e.id)),{px:s,py:n,pitchX:o,pitchY:r,col:a,row:l}=this.pointerCell(t);let c;if("move"===e.mode)c={...i,x:Math.min(Math.max(a-e.offCol,0),te-i.w),y:Math.max(l-e.offRow,0)};else{const t=se[i.type];c={...i,w:Math.min(Math.max(Math.round((s-i.x*o)/o),t.minW),te-i.x),h:Math.min(Math.max(Math.round((n-i.y*r)/r),t.minH),40)}}if(c.x===i.x&&c.y===i.y&&c.w===i.w&&c.h===i.h)return;const d=this.page.widgets.map((t=>t.id===e.id?c:t));this.preview=le(d,e.id)}end(t){const e=this.gesture;if(!e||t.pointerId!==e.pointerId)return;this.move(t);const i=this.preview;if(this.gesture=void 0,this.preview=void 0,!i)return;const s=this.page.id;this.ctx.update((t=>{const e=t.pages.find((t=>t.id===s));e&&(e.widgets=le(i))}))}removeWidget(t){const e=this.page.id;this.ctx.update((i=>{const s=i.pages.find((t=>t.id===e));s&&(s.widgets=le(s.widgets.filter((e=>e.id!==t.id))))}))}renderWidget(t){const{ctx:e}=this;switch(t.type){case"tile":return B`<sn-w-tile .ctx=${e} .widget=${t}></sn-w-tile>`;case"floorplan":return B`<sn-w-floorplan .ctx=${e} .widget=${t}></sn-w-floorplan>`;case"camera":return B`<sn-w-camera .ctx=${e} .widget=${t}></sn-w-camera>`;case"heading":return B`<sn-w-heading .ctx=${e} .widget=${t}></sn-w-heading>`;case"clock":return B`<sn-w-clock .ctx=${e} .widget=${t}></sn-w-clock>`;default:return W}}renderChrome(t){const{t:e,narrow:i}=this.ctx,s=this.gesture?.id===t.id;return B`
      ${i||"floorplan"===t.type?W:B`<div
            class="surface"
            @pointerdown=${e=>this.start(e,t,"move")}
            @pointermove=${this.move}
            @pointerup=${this.end}
            @pointercancel=${this.end}
          ></div>`}
      ${i||"floorplan"!==t.type?W:B`<button
            class="handle"
            aria-label="drag"
            @pointerdown=${e=>this.start(e,t,"move")}
            @pointermove=${this.move}
            @pointerup=${this.end}
            @pointercancel=${this.end}
          >
            <sn-icon icon="drag"></sn-icon>
          </button>`}
      ${s?W:B`<button class="badge del pressable" aria-label=${e("delete")} @click=${()=>this.removeWidget(t)}>
              <sn-icon icon="minus"></sn-icon>
            </button>
            <button class="badge cog pressable" aria-label=${e("widget_settings")} @click=${()=>qe(this.ctx,this.page.id,t.id)}>
              <sn-icon icon="cog"></sn-icon>
            </button>`}
      ${i?W:B`<div
            class="resize"
            aria-label="resize"
            @pointerdown=${e=>this.start(e,t,"resize")}
            @pointermove=${this.move}
            @pointerup=${this.end}
            @pointercancel=${this.end}
          >
            <sn-icon icon="resize"></sn-icon>
          </div>`}
    `}render(){const{ctx:t}=this,e=this.widgets;if(!e.length)return B`<div class="empty">
        <sn-icon icon="dashboard"></sn-icon>
        <strong>${t.t("empty_page")}</strong>
        ${t.isAdmin&&!t.editing?B`<span>${t.t("empty_page_admin")}</span>`:W}
      </div>`;const i=t.narrow?[...e].sort(((t,e)=>t.y-e.y||t.x-e.x)):e;return B`<div class="grid ${t.narrow?"narrow":""} ${t.editing?"editing":""}">
      ${ni(i,(t=>t.id),(e=>{const i=t.narrow?`grid-column: span ${(t=>"tile"===t.type&&t.w<=4?2:4)(e)}; grid-row: span ${"floorplan"===e.type?1:e.h}`:`grid-column: ${e.x+1} / span ${e.w}; grid-row: ${e.y+1} / span ${e.h}`;return B`<div class="cell ${this.gesture?.id===e.id?"lifted":""}" data-id=${e.id} style=${i}>
            ${this.renderWidget(e)} ${t.editing?this.renderChrome(e):W}
          </div>`}))}
    </div>`}};Li.styles=[He,r`
      :host {
        display: block;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(${te}, minmax(0, 1fr));
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
    `],Mi([ut({attribute:!1})],Li.prototype,"ctx",2),Mi([ut({attribute:!1})],Li.prototype,"page",2),Mi([gt()],Li.prototype,"preview",2),Li=Mi([dt("sn-page-grid")],Li);var Si=Object.defineProperty,Ei=Object.getOwnPropertyDescriptor,zi=(t,e,i,s)=>{for(var n,o=s>1?void 0:s?Ei(e,i):e,r=t.length-1;r>=0;r--)(n=t[r])&&(o=(s?n(e,i,o):n(o))||o);return s&&o&&Si(e,i,o),o};let Pi=class extends lt{constructor(){super(...arguments),this.value=0,this.label="",this.icon="",this.fill="var(--accent)",this.onFill="var(--on-accent)",this.track="",this.small=!1}from(t){const e=t.currentTarget.getBoundingClientRect();return Math.round(100*Math.min(1,Math.max(0,(e.bottom-t.clientY)/e.height)))}set(t){this.drag=t,this.onPreview?.(t)}render(){const t=this.drag??this.value,e=void 0===this.drag&&void 0!==this.display?this.display:`${t}%`,i=!!this.track,s=!i&&t>12;return B`<div
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
      ${i?B`<div class="thumb" style="bottom:${t}%"></div>`:B`<div class="fill" style="height:${t}%;background:${this.fill}"></div>`}
      <span class="val ${i?"on-track":""}">${e}</span>
      ${this.icon?B`<sn-icon .icon=${this.icon} style="color:${s?this.onFill:i?"#fff":"var(--text-2)"}"></sn-icon>`:W}
    </div>`}};Pi.styles=r`
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
  `,zi([ut({type:Number})],Pi.prototype,"value",2),zi([ut()],Pi.prototype,"label",2),zi([ut()],Pi.prototype,"icon",2),zi([ut()],Pi.prototype,"fill",2),zi([ut()],Pi.prototype,"onFill",2),zi([ut()],Pi.prototype,"track",2),zi([ut()],Pi.prototype,"display",2),zi([ut({type:Boolean,reflect:!0})],Pi.prototype,"small",2),zi([ut({attribute:!1})],Pi.prototype,"onCommit",2),zi([ut({attribute:!1})],Pi.prototype,"onPreview",2),zi([gt()],Pi.prototype,"drag",2),Pi=zi([dt("sn-vslider")],Pi);var Oi=Object.defineProperty,Di=Object.getOwnPropertyDescriptor,Ti=(t,e,i,s)=>{for(var n,o=s>1?void 0:s?Di(e,i):e,r=t.length-1;r>=0;r--)(n=t[r])&&(o=(s?n(e,i,o):n(o))||o);return s&&o&&Oi(e,i,o),o};let Ii=class extends lt{from(t){const e=t.currentTarget.getBoundingClientRect(),i=t.clientX-(e.left+e.width/2),s=t.clientY-(e.top+e.height/2);let n=180*Math.atan2(s,i)/Math.PI;n=(360-n)%360;const o=Math.min(100,Math.hypot(i,s)/(e.width/2)*100);return[Math.round(n),Math.round(o)]}render(){const[t,e]=this.drag??this.hs??[0,0],i=-t*Math.PI/180,s=50+Math.cos(i)*e/2,n=50+Math.sin(i)*e/2;return B`<div
      class="wheel ${this.drag?"dragging":""}"
      role="slider"
      aria-label="color"
      aria-valuenow=${t}
      @pointerdown=${t=>{t.currentTarget.setPointerCapture(t.pointerId),this.drag=this.from(t)}}
      @pointermove=${t=>this.drag&&(this.drag=this.from(t))}
      @pointerup=${()=>{const t=this.drag;this.drag=void 0,t&&this.onPick?.(t)}}
      @pointercancel=${()=>this.drag=void 0}
    >
      <div class="knob" style="left:${s}%;top:${n}%;background:${It(Tt(t,e))}"></div>
    </div>`}};Ii.styles=r`
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
  `,Ti([ut({type:Array})],Ii.prototype,"hs",2),Ti([ut({attribute:!1})],Ii.prototype,"onPick",2),Ti([gt()],Ii.prototype,"drag",2),Ii=Ti([dt("sn-color-wheel")],Ii);var ji=Object.defineProperty,Zi=Object.getOwnPropertyDescriptor,Ui=(t,e,i,s)=>{for(var n,o=s>1?void 0:s?Zi(e,i):e,r=t.length-1;r>=0;r--)(n=t[r])&&(o=(s?n(e,i,o):n(o))||o);return s&&o&&ji(e,i,o),o};const Ni=["hs","xy","rgb","rgbw","rgbww"],Bi={brightness:"lightbulb",color:"palette",temp:"thermometer"},Fi={brightness:"brightness",color:"color",temp:"white_temp"},Ri=[[0,85],[24,90],[38,88],[52,75],[130,70],[190,80],[225,85],[275,70],[325,65]],Wi={off:"power",cool:"snowflake",heat:"fire",auto:"air-conditioner",heat_cool:"air-conditioner",dry:"humidity",fan_only:"fan"};let qi=class extends lt{constructor(){super(...arguments),this.entityId="",this.lightTab="brightness",this.wheelOpen=!1,this.confirmUnlock=!1}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this.tempTimer),window.clearTimeout(this.confirmTimer)}firstUpdated(){(function(t){return!!t&&"sensor"===jt(t.entity_id)&&""!==t.state&&!Number.isNaN(Number(t.state))})(this.ctx.hass.states[this.entityId])&&this.loadHistory()}async loadHistory(){try{const t=new Date(Date.now()-864e5).toISOString(),e=await this.ctx.hass.callWS({type:"history/history_during_period",start_time:t,entity_ids:[this.entityId],minimal_response:!0,no_attributes:!0,significant_changes_only:!1});let i=Date.parse(t)/1e3;this.history=(e[this.entityId]??[]).map((t=>(i=t.lu??t.lc??i,{t:i,v:Number(t.s)}))).filter((t=>!Number.isNaN(t.v)))}catch{this.history=[]}}call(t,e,i={}){navigator.vibrate?.(5),this.ctx.hass.callService(t,e,{entity_id:this.entityId,...i}).catch((()=>this.ctx.toast(this.ctx.t("error"))))}renderLight(t){const{t:e}=this.ctx,i=t.attributes.supported_color_modes??[];if(!i.some((t=>"onoff"!==t)))return this.renderPower(t);const s=["brightness"];i.some((t=>Ni.includes(t)))&&s.push("color"),i.includes("color_temp")&&s.push("temp");const n=s.includes(this.lightTab)?this.lightTab:"brightness",o="on"===t.state,r=o?t.attributes.rgb_color:void 0,a=r?It(r):"var(--accent)",l=o?Math.round((t.attributes.brightness??255)/255*100):0;let c;if("brightness"===n)c=B`<sn-vslider
        .value=${l}
        label=${e("brightness")}
        icon=${l?"lightbulb":"lightbulb-outline"}
        fill=${a}
        onFill=${r?Ot(Dt(r)):"var(--on-accent)"}
        .onCommit=${t=>t?this.call("light","turn_on",{brightness_pct:t}):this.call("light","turn_off")}
      ></sn-vslider>`;else if("color"===n){const i="color_temp"!==t.attributes.color_mode?t.attributes.hs_color:void 0,s=t=>!!i&&Math.abs((i[0]-t[0]+540)%360-180)<10&&Math.abs(i[1]-t[1])<12;c=B`<div style="display:grid;gap:22px;justify-items:center">
        <div class="swatches">
          ${Ri.map((t=>B`<button
              class="swatch pressable"
              style="background:${It(Tt(t[0],t[1]))}"
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
        ${this.wheelOpen?B`<sn-color-wheel class="reveal" .hs=${i} .onPick=${t=>this.call("light","turn_on",{hs_color:t})}></sn-color-wheel>`:W}
      </div>`}else{const i=t.attributes.min_color_temp_kelvin??2e3,s=t.attributes.max_color_temp_kelvin??6500,n="color_temp"===t.attributes.color_mode?t.attributes.color_temp_kelvin:void 0,o="number"==typeof n?Math.round((n-i)/(s-i)*100):50,r=t=>50*Math.round((i+(s-i)*t/100)/50);c=B`<sn-vslider
        .value=${o}
        label=${e("white_temp")}
        icon="lightbulb"
        track="linear-gradient(to top, #FFA94D, #FFE4C2 45%, #F4F7FF 75%, #BFD6FF)"
        .display=${"number"==typeof n?`${n}K`:"–"}
        .onCommit=${t=>this.call("light","turn_on",{color_temp_kelvin:r(t)})}
      ></sn-vslider>`}return B`${c}
      ${s.length>1?B`<div class="seg" role="tablist">
            ${s.map((t=>B`<button role="tab" aria-pressed=${t===n} @click=${()=>this.lightTab=t}>
                <sn-icon .icon=${Bi[t]} style="--icon-size:18px"></sn-icon>${e(Fi[t])}
              </button>`))}
          </div>`:W}`}renderPower(t){const e=Nt(t);return B`<button
      class="power pressable ${e?"on":""}"
      aria-pressed=${e}
      aria-label=${this.ctx.t(e?"turn_off":"turn_on")}
      @click=${()=>this.call("homeassistant","toggle")}
    >
      <sn-icon icon="power"></sn-icon>
    </button>`}renderClimate(t){const{t:e,lang:i}=this.ctx,s=t.attributes.target_temp_step??("°F"===t.attributes.temperature_unit?1:.5),n=this.pendingTemp??t.attributes.temperature,o=t.attributes.min_temp??16,r=t.attributes.max_temp??30,a=t=>{if("number"!=typeof n)return;const e=Math.min(r,Math.max(o,Math.round((n+t)/s)*s));this.pendingTemp=e,window.clearTimeout(this.tempTimer),this.tempTimer=window.setTimeout((()=>{this.call("climate","set_temperature",{temperature:e}),window.setTimeout((()=>this.pendingTemp=void 0),1500)}),700)},l=t.attributes.hvac_modes??[];return B`
      ${"number"==typeof n&&"off"!==t.state?B`<div class="temp">
            <button class="icon-btn pressable" aria-label="-" @click=${()=>a(-s)}><sn-icon icon="minus"></sn-icon></button>
            <span class="value ltr">${Xt(n,i)}°</span>
            <button class="icon-btn pressable" aria-label="+" @click=${()=>a(s)}><sn-icon icon="plus"></sn-icon></button>
          </div>`:this.renderPower(t)}
      ${"number"==typeof t.attributes.current_temperature?B`<div class="sub">${e("current_temp")} ${qt(`${Xt(t.attributes.current_temperature,i)}°`)}</div>`:W}
      ${l.length?B`<div class="seg">
            ${l.map((i=>B`<button aria-pressed=${t.state===i} @click=${()=>this.call("climate","set_hvac_mode",{hvac_mode:i})}>
                <sn-icon .icon=${Wi[i]??"air-conditioner"} style="--icon-size:18px"></sn-icon>${St(i)?e(i):i}
              </button>`))}
          </div>`:W}
    `}renderVacuum(t){const{t:e}=this.ctx,i="cleaning"===t.state;return B`
      ${"number"==typeof t.attributes.battery_level?B`<div class="sub"><sn-icon icon="battery" style="--icon-size:16px;vertical-align:-3px"></sn-icon> ${e("battery")} ${qt(`${t.attributes.battery_level}%`)}</div>`:W}
      <div class="actions">
        ${i?B`<button class="btn primary pressable" @click=${()=>this.call("vacuum","pause")}><sn-icon icon="pause"></sn-icon>${e("pause")}</button>`:B`<button class="btn primary pressable" @click=${()=>this.call("vacuum","start")}><sn-icon icon="play"></sn-icon>${e("start")}</button>`}
        <button class="btn pressable" @click=${()=>this.call("vacuum","return_to_base")}><sn-icon icon="home"></sn-icon>${e("return_home")}</button>
        <button class="btn pressable" @click=${()=>this.call("vacuum","locate")}><sn-icon icon="locate"></sn-icon>${e("locate")}</button>
      </div>
    `}renderCover(t){const{t:e}=this.ctx,i=t.attributes.supported_features??0,s=t.attributes.current_position,n=t.attributes.current_tilt_position,o=t=>!i||!!(i&t);return B`${"number"==typeof s||"number"==typeof n?B`<div class="controls">
            ${"number"==typeof s?B`<sn-vslider
                  .value=${s}
                  label=${e("position")}
                  icon=${s?"blinds":"blinds-closed"}
                  .onCommit=${t=>this.call("cover","set_cover_position",{position:t})}
                ></sn-vslider>`:W}
            ${"number"==typeof n?B`<div style="display:grid;gap:8px;justify-items:center">
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
        ${o(1)?B`<button class="btn pressable" @click=${()=>this.call("cover","open_cover")}><sn-icon icon="chevron-up"></sn-icon>${e("cover_open")}</button>`:W}
        ${o(8)?B`<button class="btn pressable" @click=${()=>this.call("cover","stop_cover")}><sn-icon icon="stop"></sn-icon>${e("stop")}</button>`:W}
        ${o(2)?B`<button class="btn pressable" @click=${()=>this.call("cover","close_cover")}><sn-icon icon="chevron-down"></sn-icon>${e("cover_close")}</button>`:W}
      </div>`}renderLock(t){const{t:e}=this.ctx;return"unlocked"===t.state||"open"===t.state?B`<button class="btn primary pressable lock-btn" @click=${()=>this.call("lock","lock")}><sn-icon icon="lock"></sn-icon>${e("lock")}</button>`:this.confirmUnlock?B`<button
        class="btn danger pressable lock-btn"
        @click=${()=>{this.confirmUnlock=!1,this.call("lock","unlock")}}
      >
        <sn-icon icon="lock-open"></sn-icon>${e("unlock_confirm")}
      </button>`:B`<button
      class="btn pressable lock-btn"
      @click=${()=>{this.confirmUnlock=!0,window.clearTimeout(this.confirmTimer),this.confirmTimer=window.setTimeout((()=>this.confirmUnlock=!1),4e3)}}
    >
      <sn-icon icon="lock-open"></sn-icon>${e("unlock")}
    </button>`}renderChart(t){const e=this.history;if(!e||e.length<2)return W;const{lang:i,t:s}=this.ctx,n=e[0].t,o=Date.now()/1e3,r=e.map((t=>t.v)),a=Math.min(...r),l=Math.max(...r),c=l-a||1,d=t=>100-(t-a)/c*90-5;let p=`M0 ${d(e[0].v)}`;for(let g=1;g<e.length;g++)p+=` H${h=e[g].t,(h-n)/(o-n||1)*300} V${d(e[g].v)}`;var h;p+=" H300";const u=t.attributes.unit_of_measurement??"";return B`<div class="chart">
      <div class="sub">${s("history_24h")}</div>
      <svg viewBox="0 0 300 100" preserveAspectRatio="none" class="ltr">
        ${F`<path d="${p} V100 H0 Z" fill="var(--accent)" opacity=".14"></path>
        <path d=${p} fill="none" stroke="var(--accent)" stroke-width="2" vector-effect="non-scaling-stroke" stroke-linejoin="round"></path>`}
      </svg>
      <div class="labels ltr"><span>${Xt(a,i)} ${u}</span><span>${Xt(l,i)} ${u}</span></div>
    </div>`}renderBody(t){switch(jt(t.entity_id)){case"light":return this.renderLight(t);case"climate":return this.renderClimate(t);case"vacuum":return this.renderVacuum(t);case"cover":return this.renderCover(t);case"lock":return this.renderLock(t);case"camera":{const e=fi(this.ctx.hass,t.entity_id);return e?B`<div class="live"><img src=${e} alt="" /></div>`:W}case"sensor":return this.renderChart(t);case"switch":case"fan":case"input_boolean":case"media_player":case"automation":case"humidifier":case"siren":return this.renderPower(t);case"scene":case"script":return B`<button class="btn primary pressable" @click=${()=>this.call(jt(t.entity_id),"turn_on")}>
          <sn-icon icon="play"></sn-icon>${this.ctx.t("start")}
        </button>`;default:return W}}render(){const{ctx:t}=this,e=t.hass.states[this.entityId];if(!e)return B`<div class="sub">${t.t("unavailable")}</div>`;const i=Nt(e),s="unavailable"===e.state;return B`
      <div class="head">
        <span class="big-ic ${i?"on":""}" style=${Bt(e)}>
          <sn-icon .icon=${Ft(e,this.entityId)}></sn-icon>
        </span>
        <span class="state">${Kt(t.t,e,t.lang)}</span>
        <span class="sub">${t.t("last_changed")} ${Jt(t.t,e.last_changed)}</span>
      </div>
      ${s?W:this.renderBody(e)}
    `}};qi.styles=[He,r`
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
    `],Ui([ut({attribute:!1})],qi.prototype,"ctx",2),Ui([ut()],qi.prototype,"entityId",2),Ui([gt()],qi.prototype,"lightTab",2),Ui([gt()],qi.prototype,"wheelOpen",2),Ui([gt()],qi.prototype,"pendingTemp",2),Ui([gt()],qi.prototype,"confirmUnlock",2),Ui([gt()],qi.prototype,"history",2),qi=Ui([dt("sn-entity-detail")],qi);var Xi=Object.defineProperty,Yi=Object.getOwnPropertyDescriptor,Ki=(t,e,i,s)=>{for(var n,o=s>1?void 0:s?Yi(e,i):e,r=t.length-1;r>=0;r--)(n=t[r])&&(o=(s?n(e,i,o):n(o))||o);return s&&o&&Xi(e,i,o),o};let Gi=class extends lt{constructor(){super(...arguments),this.at=new Date,this.confirm=!1}connectedCallback(){super.connectedCallback(),function(){try{const t=new AudioContext,e=(e,i)=>{const s=t.createOscillator(),n=t.createGain();s.type="sine",s.frequency.value=e,n.gain.setValueAtTime(1e-4,t.currentTime+i),n.gain.exponentialRampToValueAtTime(.35,t.currentTime+i+.02),n.gain.exponentialRampToValueAtTime(1e-4,t.currentTime+i+1.2),s.connect(n).connect(t.destination),s.start(t.currentTime+i),s.stop(t.currentTime+i+1.3)};e(659.25,0),e(523.25,.45),window.setTimeout((()=>t.close()),2500)}catch{}}(),navigator.vibrate?.([120,80,120])}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this.timer)}render(){const{ctx:t}=this,{t:e}=t,i=t.config.settings.doorbell,s=i.camera_entity,n=s?fi(t.hass,s)??bi(t.hass,s,Date.now()):void 0,o=i.lock_entity?t.hass.states[i.lock_entity]:void 0;return B`<div class="scrim" @click=${t=>t.target===t.currentTarget&&this.onDismiss()}>
      <div class="card" role="alertdialog" aria-label=${e("someone_at_door")}>
        ${n?B`<div class="video"><img src=${n} alt="" /><span class="live">${e("streaming")}</span></div>`:W}
        <div class="foot">
          <span class="bell"><sn-icon icon="bell-ring"></sn-icon></span>
          <span class="title">
            <strong>${e("someone_at_door")}</strong>
            <span class="muted">${s?Zt(t.hass,t.config,s)+" · ":""}${this.at.toLocaleTimeString(Et[t.lang],{hour:"2-digit",minute:"2-digit"})}</span>
          </span>
          <button class="btn pressable" @click=${()=>this.onDismiss()}>${e("dismiss")}</button>
          ${o&&"unlocked"!==o.state?this.confirm?B`<button
                  class="btn danger pressable"
                  @click=${()=>{t.hass.callService("lock","unlock",{entity_id:o.entity_id}).catch((()=>t.toast(e("error")))),this.onDismiss()}}
                >
                  <sn-icon icon="lock-open"></sn-icon>${e("unlock_confirm")}
                </button>`:B`<button
                  class="btn primary pressable"
                  @click=${()=>{this.confirm=!0,window.clearTimeout(this.timer),this.timer=window.setTimeout((()=>this.confirm=!1),4e3)}}
                >
                  <sn-icon icon="lock-open"></sn-icon>${e("open_door")}
                </button>`:W}
        </div>
      </div>
    </div>`}};Gi.styles=[He,r`
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
    `],Ki([ut({attribute:!1})],Gi.prototype,"ctx",2),Ki([ut({attribute:!1})],Gi.prototype,"at",2),Ki([ut({attribute:!1})],Gi.prototype,"onDismiss",2),Ki([gt()],Gi.prototype,"confirm",2),Gi=Ki([dt("sn-doorbell")],Gi);var Ji=Object.defineProperty,Qi=Object.getOwnPropertyDescriptor,ts=(t,e,i,s)=>{for(var n,o=s>1?void 0:s?Qi(e,i):e,r=t.length-1;r>=0;r--)(n=t[r])&&(o=(s?n(e,i,o):n(o))||o);return s&&o&&Ji(e,i,o),o};let es=class extends lt{constructor(){super(...arguments),this.now=new Date,this.drift={x:0,y:0}}connectedCallback(){super.connectedCallback(),this.timer=window.setInterval((()=>{this.now=new Date,this.now.getSeconds()<10&&(this.drift={x:Math.round(60*Math.random()-30),y:Math.round(40*Math.random()-20)})}),1e4)}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this.timer)}render(){const{ctx:t}=this,e=Et[t.lang],i=t.config.settings.screensaver.temp_entity,s=i?t.hass.states[i]:void 0;return B`<div
      class="ss"
      style="--gx:${30+this.drift.x/2}%;--gy:${55+this.drift.y/2}%"
      @click=${t=>{t.stopPropagation(),this.onWake()}}
    >
      <div class="center" style="transform:translate(${this.drift.x}px, ${this.drift.y}px)">
        <div class="time ltr">${this.now.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}</div>
        <div class="date">${this.now.toLocaleDateString(e,{weekday:"long",day:"numeric",month:"long"})}</div>
        ${s?B`<div class="temp ltr">${Gt(t.t,s,t.lang)}</div>`:W}
      </div>
      <div class="brand">
        <img src="${t.assetBase}logo/smartnest-symbol-white.svg" alt="" />
        <span>SmartNest · ${t.t("tagline")}</span>
      </div>
    </div>`}};es.styles=[He,r`
      .ss {
        position: fixed;
        inset: 0;
        z-index: 70;
        color: #fff;
        background: radial-gradient(60% 70% at var(--gx, 30%) var(--gy, 55%), rgba(233, 151, 29, 0.22), rgba(233, 151, 29, 0) 70%), #1e252b;
        display: grid;
        place-items: center;
        cursor: none;
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
      @keyframes fade {
        from {
          opacity: 0;
        }
      }
    `],ts([ut({attribute:!1})],es.prototype,"ctx",2),ts([ut({attribute:!1})],es.prototype,"onWake",2),ts([gt()],es.prototype,"now",2),ts([gt()],es.prototype,"drift",2),es=ts([dt("sn-screensaver")],es);var is=Object.defineProperty,ss=Object.getOwnPropertyDescriptor,ns=(t,e,i,s)=>{for(var n,o=s>1?void 0:s?ss(e,i):e,r=t.length-1;r>=0;r--)(n=t[r])&&(o=(s?n(e,i,o):n(o))||o);return s&&o&&is(e,i,o),o};let os=class extends lt{constructor(){super(...arguments),this.length=4,this.prompt="",this.error="",this.value="",this.wrong=!1}press(t){if(!(this.value.length>=this.length)&&(this.wrong=!1,this.value+=t,navigator.vibrate?.(4),this.value.length===this.length)){const t=this.value;window.setTimeout((()=>{this.onSubmit(t)||(this.wrong=!0,navigator.vibrate?.([60,40,60]),this.value="")}),120)}}render(){return B`
      <div class="prompt ${this.wrong?"err":""}">${this.wrong?this.error:this.prompt}</div>
      <div class="dots ${this.wrong?"shake":""}" aria-hidden="true">
        ${Array.from({length:this.length},((t,e)=>B`<span class="dot ${e<this.value.length?"on":""}"></span>`))}
      </div>
      <div class="keys">
        ${["1","2","3","4","5","6","7","8","9"].map((t=>B`<button @click=${()=>this.press(t)}>${t}</button>`))}
        <span></span>
        <button @click=${()=>this.press("0")}>0</button>
        <button class="ghost" aria-label="delete" @click=${()=>this.value=this.value.slice(0,-1)}>
          <sn-icon icon="backspace"></sn-icon>
        </button>
      </div>
    `}};os.styles=r`
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
  `,ns([ut({type:Number})],os.prototype,"length",2),ns([ut()],os.prototype,"prompt",2),ns([ut()],os.prototype,"error",2),ns([ut({attribute:!1})],os.prototype,"onSubmit",2),ns([gt()],os.prototype,"value",2),ns([gt()],os.prototype,"wrong",2),os=ns([dt("sn-pinpad")],os);var rs=Object.defineProperty,as=Object.getOwnPropertyDescriptor,ls=(t,e,i,s)=>{for(var n,o=s>1?void 0:s?as(e,i):e,r=t.length-1;r>=0;r--)(n=t[r])&&(o=(s?n(e,i,o):n(o))||o);return s&&o&&rs(e,i,o),o};const cs="0.3.0",ds=t=>{const[e,i]=t.split(":").map(Number);return 60*(e||0)+(i||0)};const ps=t=>{const e=(t??"").slice(0,2);return"en"===e||"he"===e?e:"ar"};let hs=class extends lt{constructor(){super(...arguments),this.narrow=!1,this.pageId="",this.sheets=[],this.toastMsg="",this.sleeping=!1,this.saving=!1,this.loadError="",this.now=new Date,this.systemDark=matchMedia("(prefers-color-scheme: dark)").matches,this.wide=window.innerWidth>=768,this.kiosk=Me(),this.initStarted=!1,this.lastActive=Date.now(),this.mql=matchMedia("(prefers-color-scheme: dark)"),this.onActivity=()=>{this.lastActive=Date.now()},this.onResize=()=>{this.wide=window.innerWidth>=768},this.onScheme=t=>{this.systemDark=t.matches}}connectedCallback(){super.connectedCallback(),this.setKiosk(this.kiosk),window.addEventListener("pointerdown",this.onActivity,{capture:!0,passive:!0}),window.addEventListener("keydown",this.onActivity,{capture:!0}),window.addEventListener("resize",this.onResize),this.mql.addEventListener("change",this.onScheme),this.ticker=window.setInterval((()=>this.tick()),1e4)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("pointerdown",this.onActivity,{capture:!0}),window.removeEventListener("keydown",this.onActivity,{capture:!0}),window.removeEventListener("resize",this.onResize),this.mql.removeEventListener("change",this.onScheme),window.clearInterval(this.ticker),this.unsub?.then((t=>t())).catch((()=>{})),this.unsub=void 0,this.initStarted=!1}tick(){this.now=new Date;const t=this.config?.settings.screensaver;!t?.enabled||!this.wide||this.draft||this.sheets.length||this.ringingAt||this.sleeping||Date.now()-this.lastActive>6e4*t.timeout_min&&(this.sleeping=!0)}get assetBase(){return this.panel?.config?.asset_base??"/smartnest_static/static/"}async init(){if(this.initStarted=!0,!document.getElementById("smartnest-fonts")){const t=document.createElement("style");t.id="smartnest-fonts",t.textContent=function(t){const e=(e,i)=>`@font-face{font-family:"Rubik";font-weight:${e};font-display:swap;src:url("${t}fonts/${i}") format("truetype");}`;return[e(400,"Rubik-Regular.ttf"),e(500,"Rubik-Medium.ttf"),e(700,"Rubik-Bold.ttf"),e(800,"Rubik-ExtraBold.ttf")].join("")}(this.assetBase),document.head.appendChild(t)}const t=ps(this.hass.language);try{const s=await async function(t){return(await t.callWS({type:"smartnest/config/get"})).config}(this.hass);s?this.config=he(s,t):(this.config=function(t,e,i){const s={version:1,settings:ne(i),names:{},pages:[]},n=Object.keys(t.states).some((t=>"camera"===jt(t)))?["home","power","security","doorbell"]:["home","power","climate"];return s.pages=n.map((i=>pe(i,t,s,e))),s.settings.default_page=s.pages[0].id,s}(this.hass,Lt(t),t),this.hass.user?.is_admin&&ue(this.hass,this.config).catch((()=>{}))),this.pageId=this.config.settings.default_page||this.config.pages[0]?.id||"",this.unsub=(e=this.hass,i=e=>{!this.draft&&e&&(this.config=he(e,t))},e.connection.subscribeMessage((t=>i(t.config)),{type:"smartnest/config/subscribe"}))}catch(s){this.loadError=String(s?.message??s)}var e,i}willUpdate(t){t.has("hass")&&this.hass&&!this.initStarted&&this.init(),t.has("hass")&&this.watchDoorbell(),t.has("config")&&this.kiosk&&this.config&&!this.config.settings.kiosk.pin_hash&&this.setKiosk(!1)}get panelPath(){return this.route?.prefix??location.pathname}setKiosk(t){this.kiosk=t,function(t){try{t?localStorage.setItem(Ve,"1"):localStorage.removeItem(Ve)}catch{}}(t),Se(t),function(t,e){if(!t)return Ee?.(),void(Ee=void 0);if(Ee)return;const i=()=>{Me()&&!location.pathname.startsWith(e)&&(history.replaceState(null,"",e),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!0}})))};window.addEventListener("popstate",i),window.addEventListener("location-changed",i),Ee=()=>{window.removeEventListener("popstate",i),window.removeEventListener("location-changed",i)}}(t,this.panelPath)}unlockSheet(){const t=Lt(this.uiLang),e=this.config?.settings.kiosk;if(!e?.pin_hash||!e.pin_salt)return this.setKiosk(!1);this.pushSheet({title:t("kiosk_unlock"),render:t=>B`<sn-pinpad
        .length=${e.pin_length??4}
        prompt=${t.t("enter_pin")}
        error=${t.t("wrong_pin")}
        .onSubmit=${i=>Le(i,e.pin_salt)===e.pin_hash&&(this.setKiosk(!1),t.closeSheet(),!0)}
      ></sn-pinpad>`})}watchDoorbell(){const t=this.config?.settings.doorbell.trigger_entity,e=t?this.hass.states[t]:void 0;if(!e)return void(this.bellSeen=void 0);const i=t.startsWith("event.")?e.state:`${e.state}|${e.last_changed}`,s=this.bellSeen;this.bellSeen=i,void 0!==s&&s!==i&&(t.startsWith("event.")?"unavailable"!==e.state&&"unknown"!==e.state:"on"===e.state)&&this.ring()}ring(){this.sleeping=!1,this.lastActive=Date.now(),this.ringingAt=new Date;const t=this.ringingAt;window.setTimeout((()=>this.ringingAt===t&&(this.ringingAt=void 0)),9e4)}startEdit(){this.draft=structuredClone(this.config)}cancelEdit(){const t=Lt(this.uiLang);(JSON.stringify(this.draft)===JSON.stringify(this.config)||confirm(t("discard_changes")))&&(this.draft=void 0,this.sheets=[],this.config.pages.some((t=>t.id===this.pageId))||(this.pageId=this.config.pages[0]?.id??""))}async save(){const t=Lt(this.uiLang);this.saving=!0;try{await ue(this.hass,this.draft),this.config=this.draft,this.draft=void 0,this.sheets=[],this.toast(t("saved"))}catch{this.toast(t("save_failed"))}finally{this.saving=!1}}toast(t){this.toastMsg=t,window.clearTimeout(this.toastTimer),this.toastTimer=window.setTimeout((()=>this.toastMsg=""),3200)}get current(){return this.draft??this.config}get uiLang(){return this.current?.settings.language??ps(this.hass?.language)}get dark(){const t=this.current?.settings;return t?"dark"===t.theme||"light"!==t.theme&&("auto"===t.theme?this.systemDark:function(t,e,i){const s=60*t.getHours()+t.getMinutes(),n=ds(e),o=ds(i);return n<=o?s>=n&&s<o:s>=n||s<o}(this.now,t.dark_from,t.dark_to)):this.systemDark}makeCtx(){const t=this.uiLang;return{hass:this.hass,config:this.current,lang:t,rtl:Mt(t),t:Lt(t),dark:this.dark,narrow:!this.wide,isAdmin:!!this.hass.user?.is_admin,editing:!!this.draft,assetBase:this.assetBase,update:t=>{if(!this.draft)return;const e=structuredClone(this.draft);t(e),this.draft=e},openEntity:t=>this.pushSheet({title:this.current.names[t]||this.hass.states[t]?.attributes.friendly_name||t,render:e=>B`<sn-entity-detail .ctx=${e} .entityId=${t}></sn-entity-detail>`}),showSheet:t=>this.pushSheet(t),closeSheet:()=>this.sheets=this.sheets.slice(0,-1),toast:t=>this.toast(t)}}pushSheet(t){this.sheets=[...this.sheets,t]}updated(){this.kiosk&&Se(!0);const t=function(t,e){const i=e||ee,s=i.toUpperCase()===ee,n={"--accent":i,"--on-accent":Ot(i),"--cool":$e,"--on-cool":be,"--alert":Ae,"--on-alert":be,"--success":ke};return t?{...n,"--bg":me,"--bg-glow":"rgba(233,151,29,.10)","--surface":"rgba(42,51,59,.66)","--surface-solid":fe,"--surface-2":ve,"--surface-hover":"rgba(58,69,79,.8)","--text":"#FFFFFF","--text-2":xe,"--border":"rgba(255,255,255,.08)","--accent-text":i,"--alert-text":Ae,"--scrim":"rgba(8,10,12,.55)","--shadow":"0 1px 0 rgba(255,255,255,.04) inset, 0 10px 30px rgba(0,0,0,.35)","--shadow-lift":"0 24px 60px rgba(0,0,0,.55)","color-scheme":"dark"}:{...n,"--bg":"#F3EFE8","--bg-glow":"rgba(233,151,29,.12)","--surface":"rgba(255,255,255,.72)","--surface-solid":"#FFFFFF","--surface-2":_e,"--surface-hover":"rgba(255,255,255,.92)","--text":be,"--text-2":ye,"--border":"rgba(30,37,43,.08)","--accent-text":s?we:`color-mix(in srgb, ${i} 62%, black)`,"--alert-text":Ce,"--scrim":"rgba(30,37,43,.28)","--shadow":"0 1px 2px rgba(30,37,43,.05), 0 8px 24px rgba(30,37,43,.07)","--shadow-lift":"0 24px 60px rgba(30,37,43,.22)","color-scheme":"light"}}(this.dark,this.current?.settings.accent??"");for(const[e,i]of Object.entries(t))this.style.setProperty(e,i);this.setAttribute("dir",Mt(this.uiLang)?"rtl":"ltr"),this.setAttribute("lang",this.uiLang)}renderBar(t){const{t:e}=t,i=t.config,s=i.settings.home_name||this.hass.config?.location_name||"SmartNest";return B`<header class="glass">
      ${this.narrow&&!this.kiosk?B`<button
            class="icon-btn pressable"
            aria-label="menu"
            @click=${()=>this.dispatchEvent(new Event("hass-toggle-menu",{bubbles:!0,composed:!0}))}
          >
            <sn-icon icon="grid"></sn-icon>
          </button>`:W}
      <div class="home"><span>${s}</span></div>
      <nav>
        <div class="seg" role="tablist">
          ${i.pages.map((e=>B`<button
              role="tab"
              aria-pressed=${e.id===this.pageId}
              aria-selected=${e.id===this.pageId}
              @click=${()=>{if(e.id===this.pageId&&t.editing)return Ye(t,e.id,(()=>this.pageId=this.current.pages[0]?.id??""));this.pageId=e.id}}
            >
              <sn-icon .icon=${e.icon} style="--icon-size:18px"></sn-icon>${e.title}
            </button>`))}
        </div>
      </nav>
      <div class="actions">
        ${this.kiosk?B`<button class="icon-btn primary pressable" aria-label=${e("kiosk_unlock")} title=${e("kiosk_unlock")} @click=${()=>this.unlockSheet()}>
              <sn-icon icon="lock" style="--icon-size:20px"></sn-icon>
            </button>`:!t.editing&&t.config.settings.kiosk.pin_hash?B`<button class="icon-btn pressable" aria-label=${e("kiosk_lock")} title=${e("kiosk_lock")} @click=${()=>this.setKiosk(!0)}>
              <sn-icon icon="lock-open" style="--icon-size:20px"></sn-icon>
            </button>`:W}
        ${this.kiosk?W:t.editing?B`<button class="btn pressable" @click=${()=>this.cancelEdit()}>${e("cancel")}</button>
              <button class="btn primary pressable" ?disabled=${this.saving} @click=${()=>this.save()}>
                ${this.saving?e("saving"):e("save")}
              </button>`:t.isAdmin?B`<button class="icon-btn pressable" aria-label=${e("edit")} title=${e("edit")} @click=${()=>this.startEdit()}>
              <sn-icon icon="pencil" style="--icon-size:20px"></sn-icon>
            </button>`:W}
      </div>
    </header>`}renderDock(t){const{t:e}=t;return B`<div class="dock glass">
      <button class="btn primary pressable" @click=${()=>function(t,e){const i=(t,i,s)=>{let n="";return t.update((t=>{const o=t.pages.find((t=>t.id===e));if(!o)return;const r=re(i,s,{y:(a=o.widgets,a.reduce(((t,e)=>Math.max(t,e.y+e.h)),0))});var a;n=r.id,o.widgets=le([...o.widgets,r])})),n};t.showSheet({title:t.t("add_widget"),render:t=>B`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px">
      ${Xe.map((e=>B`<button
          class="glass pressable"
          style="display:grid;gap:10px;justify-items:center;padding:20px 12px;border-radius:var(--r-md);font-weight:500"
          @click=${()=>{if("tile"===e.type||"camera"===e.type)return void t.showSheet({title:t.t("choose_entity"),render:t=>B`<sn-entity-picker
                  .ctx=${t}
                  .filter=${Re[e.type]??{}}
                  .onPick=${s=>{i(t,e.type,{entity:s}),t.closeSheet(),t.closeSheet()}}
                ></sn-entity-picker>`});const s="floorplan"===e.type?{floors:[oe(t.t("floor_default"))]}:"heading"===e.type?{text:""}:{},n=i(t,e.type,s);t.closeSheet(),"heading"===e.type&&qe(t,0,n)}}
        >
          <span style="display:grid;place-items:center;width:52px;height:52px;border-radius:999px;background:var(--accent);color:var(--on-accent)">
            <sn-icon .icon=${e.icon}></sn-icon>
          </span>
          ${t.t(`widget_${e.type}`)}
          <span class="muted ltr" style="font-size:12px">${se[e.type].w}×${se[e.type].h}</span>
        </button>`))}
    </div>`})}(t,this.pageId)}>
        <sn-icon icon="plus" style="--icon-size:20px"></sn-icon>${e("add_widget")}
      </button>
      <button class="btn pressable" @click=${()=>Ye(t,this.pageId,(()=>this.pageId=this.current.pages[0]?.id??""))}>
        <sn-icon icon="pencil" style="--icon-size:20px"></sn-icon>${e("page_settings")}
      </button>
      <button class="btn pressable" @click=${()=>function(t,e){t.showSheet({title:t.t("add_page"),render:t=>Be(t.t("choose_template"),B`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px">
        ${de.map((i=>B`<button
            class="glass pressable"
            style="display:grid;gap:10px;justify-items:center;padding:20px 12px;border-radius:var(--r-md);font-weight:500"
            @click=${()=>{const s=pe(i.id,t.hass,t.config,t.t);t.update((t=>t.pages.push(s))),t.closeSheet(),e(s.id)}}
          >
            <span style="display:grid;place-items:center;width:52px;height:52px;border-radius:999px;background:var(--surface-2)">
              <sn-icon .icon=${i.icon}></sn-icon>
            </span>
            ${t.t(i.label)}
          </button>`))}
      </div>`)})}(t,(t=>this.pageId=t))}>
        <sn-icon icon="dashboard" style="--icon-size:20px"></sn-icon>${e("add_page")}
      </button>
      <button class="icon-btn pressable" aria-label=${e("settings")} @click=${()=>Je(t,{version:cs,testDoorbell:()=>this.ring()})}>
        <sn-icon icon="cog" style="--icon-size:20px"></sn-icon>
      </button>
    </div>`}render(){if(!this.hass)return W;if(!this.current){const t=Lt(this.uiLang);return B`<div class="center">
        <div style="display:grid;gap:12px;justify-items:center">
          <img src="${this.assetBase}logo/smartnest-symbol-${this.dark?"white":"color"}.svg" alt="SmartNest" />
          <span>${this.loadError?`${t("error")}: ${this.loadError}`:t("loading")}</span>
        </div>
      </div>`}const t=this.makeCtx(),e=t.config.pages.find((t=>t.id===this.pageId))??t.config.pages[0];return B`<div class="app ${t.narrow?"compact":""}">
      ${this.renderBar(t)}
      ${e?At(e.id,B`<main><sn-page-grid .ctx=${t} .page=${e}></sn-page-grid></main>`):W}
      ${t.editing?this.renderDock(t):W}
      <sn-sheet-host .ctx=${t} .sheets=${this.sheets}></sn-sheet-host>
      ${this.ringingAt?B`<sn-doorbell .ctx=${t} .at=${this.ringingAt} .onDismiss=${()=>this.ringingAt=void 0}></sn-doorbell>`:W}
      ${this.sleeping?B`<sn-screensaver .ctx=${t} .onWake=${()=>this.sleeping=!1}></sn-screensaver>`:W}
      ${this.toastMsg?B`<div class="toast" role="status">${this.toastMsg}</div>`:W}
    </div>`}};hs.styles=[He,r`
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
    `],ls([ut({attribute:!1})],hs.prototype,"hass",2),ls([ut({type:Boolean,reflect:!0})],hs.prototype,"narrow",2),ls([ut({attribute:!1})],hs.prototype,"panel",2),ls([ut({attribute:!1})],hs.prototype,"route",2),ls([gt()],hs.prototype,"config",2),ls([gt()],hs.prototype,"draft",2),ls([gt()],hs.prototype,"pageId",2),ls([gt()],hs.prototype,"sheets",2),ls([gt()],hs.prototype,"toastMsg",2),ls([gt()],hs.prototype,"ringingAt",2),ls([gt()],hs.prototype,"sleeping",2),ls([gt()],hs.prototype,"saving",2),ls([gt()],hs.prototype,"loadError",2),ls([gt()],hs.prototype,"now",2),ls([gt()],hs.prototype,"systemDark",2),ls([gt()],hs.prototype,"wide",2),ls([gt()],hs.prototype,"kiosk",2),hs=ls([dt("smartnest-panel")],hs),console.info(`%c SmartNest %c v${cs} `,"background:#E9971D;color:#1E252B;font-weight:700;border-radius:4px 0 0 4px","background:#1E252B;color:#fff;border-radius:0 4px 4px 0");
