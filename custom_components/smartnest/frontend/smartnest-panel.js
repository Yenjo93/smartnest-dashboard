const t={},e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),a=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=a.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(e,t))}return t}toString(){return this.cssText}};const r=t=>new n("string"==typeof t?t:t+"",void 0,s),o=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new n(i,t,s)},l=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return r(e)})(t):t,{is:c,defineProperty:d,getOwnPropertyDescriptor:p,getOwnPropertyNames:h,getOwnPropertySymbols:u,getPrototypeOf:g}=Object,m=globalThis,f=m.trustedTypes,b=f?f.emptyScript:"",_=m.reactiveElementPolyfillSupport,y=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?b:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(s){i=null}}return i}},x=(t,e)=>!c(t,e),w={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:x};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&d(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:a}=p(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);a?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=g(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...h(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const t=this._$Eu(e,i);void 0!==t&&this._$Eh.set(t,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const i of s){const s=document.createElement("style"),a=e.litNonce;void 0!==a&&s.setAttribute("nonce",a),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==a?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=s;const n=a.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i,s=!1,a){if(void 0!==t){const n=this.constructor;if(!1===s&&(a=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??x)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:a},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==a||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((t=>this._$ET(t,this[t]))),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[y("elementProperties")]=new Map,$[y("finalized")]=new Map,_?.({ReactiveElement:$}),(m.reactiveElementVersions??=[]).push("2.1.2");const k=globalThis,C=k.trustedTypes,M=C?C.createPolicy("lit-html",{createHTML:t=>t}):void 0,A="$lit$",H=`lit$${Math.random().toFixed(9).slice(2)}$`,L="?"+H,V=`<${L}>`,S=document,z=()=>S.createComment(""),D=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,j="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,P=/-->/g,N=/>/g,I=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),W=/'/g,E=/"/g,R=/^(?:script|style|textarea|title)$/i,B=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),Z=B(1),F=B(2),U=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),Y=new WeakMap,X=S.createTreeWalker(S,129);function K(t,e){if(!O(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==M?M.createHTML(e):e}class J{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let a=0,n=0;const r=t.length-1,o=this.parts,[l,c]=((t,e)=>{const i=t.length-1,s=[];let a,n=2===e?"<svg>":3===e?"<math>":"",r=T;for(let o=0;o<i;o++){const e=t[o];let i,l,c=-1,d=0;for(;d<e.length&&(r.lastIndex=d,l=r.exec(e),null!==l);)d=r.lastIndex,r===T?"!--"===l[1]?r=P:void 0!==l[1]?r=N:void 0!==l[2]?(R.test(l[2])&&(a=RegExp("</"+l[2],"g")),r=I):void 0!==l[3]&&(r=I):r===I?">"===l[0]?(r=a??T,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,i=l[1],r=void 0===l[3]?I:'"'===l[3]?E:W):r===E||r===W?r=I:r===P||r===N?r=T:(r=I,a=void 0);const p=r===I&&t[o+1].startsWith("/>")?" ":"";n+=r===T?e+V:c>=0?(s.push(i),e.slice(0,c)+A+e.slice(c)+H+p):e+H+(-2===c?o:p)}return[K(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]})(t,e);if(this.el=J.createElement(l,i),X.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=X.nextNode())&&o.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(A)){const e=c[n++],i=s.getAttribute(t).split(H),r=/([.?@])?(.*)/.exec(e);o.push({type:1,index:a,name:r[2],strings:i,ctor:"."===r[1]?it:"?"===r[1]?st:"@"===r[1]?at:et}),s.removeAttribute(t)}else t.startsWith(H)&&(o.push({type:6,index:a}),s.removeAttribute(t));if(R.test(s.tagName)){const t=s.textContent.split(H),e=t.length-1;if(e>0){s.textContent=C?C.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],z()),X.nextNode(),o.push({type:2,index:++a});s.append(t[e],z())}}}else if(8===s.nodeType)if(s.data===L)o.push({type:2,index:a});else{let t=-1;for(;-1!==(t=s.data.indexOf(H,t+1));)o.push({type:7,index:a}),t+=H.length-1}a++}}static createElement(t,e){const i=S.createElement("template");return i.innerHTML=t,i}}function G(t,e,i=t,s){if(e===U)return e;let a=void 0!==s?i._$Co?.[s]:i._$Cl;const n=D(e)?void 0:e._$litDirective$;return a?.constructor!==n&&(a?._$AO?.(!1),void 0===n?a=void 0:(a=new n(t),a._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=a:i._$Cl=a),void 0!==a&&(e=G(t,a._$AS(t,e.values),a,s)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??S).importNode(e,!0);X.currentNode=s;let a=X.nextNode(),n=0,r=0,o=i[0];for(;void 0!==o;){if(n===o.index){let e;2===o.type?e=new tt(a,a.nextSibling,this,t):1===o.type?e=new o.ctor(a,o.name,o.strings,this,t):6===o.type&&(e=new nt(a,this,t)),this._$AV.push(e),o=i[++r]}n!==o?.index&&(a=X.nextNode(),n++)}return X.currentNode=S,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),D(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==U&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>O(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&D(this._$AH)?this._$AA.nextSibling.data=t:this.T(S.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Q(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Y.get(t.strings);return void 0===e&&Y.set(t.strings,e=new J(t)),e}k(t){O(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const a of t)s===e.length?e.push(i=new tt(this.O(z()),this.O(z()),this,this.options)):i=e[s],i._$AI(a),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,a){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(t,e=this,i,s){const a=this.strings;let n=!1;if(void 0===a)t=G(this,t,e,0),n=!D(t)||t!==this._$AH&&t!==U,n&&(this._$AH=t);else{const s=t;let r,o;for(t=a[0],r=0;r<a.length-1;r++)o=G(this,s[i+r],e,r),o===U&&(o=this._$AH[r]),n||=!D(o)||o!==this._$AH[r],o===q?t=q:t!==q&&(t+=(o??"")+a[r+1]),this._$AH[r]=o}n&&!s&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class it extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class st extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class at extends et{constructor(t,e,i,s,a){super(t,e,i,s,a),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??q)===U)return;const i=this._$AH,s=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==q&&(i===q||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const rt={I:tt},ot=k.litHtmlPolyfillSupport;ot?.(J,tt),(k.litHtmlVersions??=[]).push("3.3.3");const lt=globalThis;let ct=class extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let a=s._$litPart$;if(void 0===a){const t=i?.renderBefore??null;s._$litPart$=a=new tt(e.insertBefore(z(),t),t,void 0,i??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return U}};ct._$litElement$=!0,ct.finalized=!0,lt.litElementHydrateSupport?.({LitElement:ct});const dt=lt.litElementPolyfillSupport;dt?.({LitElement:ct}),(lt.litElementVersions??=[]).push("4.2.2");const pt=t=>(e,i)=>{void 0!==i?i.addInitializer((()=>{customElements.define(t,e)})):customElements.define(t,e)},ht={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:x},ut=(t=ht,e,i)=>{const{kind:s,metadata:a}=i;let n=globalThis.litPropertyMetadata.get(a);if(void 0===n&&globalThis.litPropertyMetadata.set(a,n=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const a=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,a,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const a=this[s];e.call(this,i),this.requestUpdate(s,a,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function gt(t){return(e,i)=>"object"==typeof i?ut(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function mt(t){return gt({...t,state:!0,attribute:!1})}const ft=2,bt=t=>(...e)=>({_$litDirective$:t,values:e});let _t=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};const{I:yt}=rt,vt=()=>document.createComment(""),xt=(t,e,i)=>{const s=t._$AA.parentNode,a=void 0===e?t._$AB:e._$AA;if(void 0===i){const e=s.insertBefore(vt(),a),n=s.insertBefore(vt(),a);i=new yt(e,n,t,t.options)}else{const e=i._$AB.nextSibling,n=i._$AM,r=n!==t;if(r){let e;i._$AQ?.(t),i._$AM=t,void 0!==i._$AP&&(e=t._$AU)!==n._$AU&&i._$AP(e)}if(e!==a||r){let t=i._$AA;for(;t!==e;){const e=t.nextSibling;s.insertBefore(t,a),t=e}}}return i},wt=(t,e,i=t)=>(t._$AI(e,i),t),$t={},kt=(t,e=$t)=>t._$AH=e,Ct=t=>{t._$AR(),t._$AA.remove()},Mt=bt(class extends _t{constructor(){super(...arguments),this.key=q}render(t,e){return this.key=t,e}update(t,[e,i]){return e!==this.key&&(kt(t),this.key=e),i}}),At={edit:"Edit",done:"Done",save:"Save",cancel:"Cancel",delete:"Delete",add:"Add",close:"Close",back:"Back",settings:"Settings",search:"Search",loading:"Loading…",saving:"Saving…",saved:"Saved",save_failed:"Couldn't save. Check the connection and try again.",upload_failed:"Upload failed. Use a PNG, JPG or WebP under 15 MB.",discard_changes:"Discard your changes?",delete_confirm:"Delete this?",untitled:"Untitled",add_page:"Add page",page_settings:"Page settings",page_title:"Page name",page_icon:"Icon",move_earlier:"Move earlier",move_later:"Move later",choose_template:"Start from",template_rooms:"Rooms",other_devices:"Other",autofill_rooms:"Fill rooms",autofill_done:"Placed {n} devices",detect_rooms:"Find rooms",auto_add:"Auto add",auto_need_areas:"Put your devices in rooms in Home Assistant first (Settings → Areas)",auto_nothing:"Nothing new to place",which_room:"Which room is this?",skip_room:"Skip",detecting:"Reading the plan…",detect_none:"No new rooms found. Draw them by hand.",detect_done:"Found {n} rooms. Tap one to name it",detect_done_placed:"Found {n} rooms and placed {m} devices",detect_failed:"Couldn't read this plan",room_area:"Home Assistant room",template_blank:"Blank",template_home:"Home",template_power:"Electricity",template_security:"Security",template_doorbell:"Doorbell",template_climate:"Climate",add_widget:"Add widget",widget_settings:"Widget settings",widget_floorplan:"Floor plan",widget_tile:"Device",widget_camera:"Camera",camera_wall:"All cameras",widget_heading:"Heading",widget_clock:"Clock",widget_modes:"Modes",mode_away:"Away",mode_home:"Home",mode_sleep:"Sleep",mode_evening:"Evening",scene_away:"Have a safe trip",scene_home:"Welcome home",scene_sleep:"Good night",scene_evening:"Enjoy your evening",scene_locking:"Locking up",modes_missing:"Mode scripts not found. Copy ha-config/packages/smartnest_modes.yaml to Home Assistant.",widget_vacuum:"Robot vacuum",widget_visitors:"Visitors",widget_energy:"Energy",template_robot:"Robot",clean_rooms_1:"Clean 1 room",clean_rooms_n:"Clean {n} rooms",clean_all:"Clean the whole house",suction:"Suction",mop:"Mopping",passes:"Passes",parts:"Parts",main_brush:"Main brush",side_brush:"Side brush",filter:"Filter",sensors_part:"Sensors",hours_left:"{n} h left",cleaned_area:"Cleaned",clean_time:"Time",empty_bin:"Empty bin",no_rooms:"Rooms appear here once the robot has mapped the house.",fan_quiet:"Quiet",fan_balanced:"Balanced",fan_standard:"Standard",fan_turbo:"Turbo",fan_max:"Max",fan_max_plus:"Max+",fan_gentle:"Gentle",fan_off:"Off",mop_mild:"Light",mop_low:"Light",mop_moderate:"Medium",mop_medium:"Medium",mop_intense:"Heavy",mop_high:"Heavy",mop_off:"Off",yesterday:"Yesterday",today:"Today",no_visitors:"No one has rung yet.",keep_days:"Keep visitor photos (days)",e_solar:"Solar",e_grid:"Grid",e_battery:"Battery",e_home:"Home",e_solar_entity:"Solar power",e_grid_entity:"Grid power (+ = from the grid)",e_battery_entity:"Battery power (+ = charging)",e_soc_entity:"Battery level",e_home_entity:"Home power (optional)",e_flip:"Flip direction",widget_energy_stats:"Electricity bill",widget_panic:"Emergency",widget_check:"Bedtime check",bill_title:"Electricity this month",bill_projected:"Expected bill",bill_used:"Used so far",bill_vs_last:"vs. last month",bill_solar:"Solar saved",bill_top:"Using the most",e_total_energy:"Total consumption (kWh)",e_solar_energy:"Solar production (kWh)",tariff:"Price per kWh",currency:"Currency",panic_hold:"Hold for 2 seconds",panic_sent:"Emergency mode is on",panic_missing:"Emergency script not found. Copy ha-config/packages/smartnest_safety.yaml to Home Assistant.",check_ok:"All set for the night",check_n:"{n} things to look at",check_locks:"Doors locked",check_open:"Doors and windows closed",check_lights:"Lights off",check_alarm:"Alarm on",check_appliances:"Risky appliances off",check_fix:"Fix it",check_fix_all:"Fix everything I can",arm_home:"Home",arm_away:"Away",arm_night:"Night",disarm:"Disarm",enter_code:"Enter code",disarmed:"Off",armed_home:"Armed (home)",armed_away:"Armed (away)",armed_night:"Armed (night)",armed_vacation:"Armed (vacation)",arming:"Arming",disarming:"Disarming",pending:"Pending",triggered:"ALARM",widget_family:"Family",at_home:"Home",away_l:"Out",widget_todo:"List",add_placeholder:"Add an item…",todo_empty:"Nothing here",widget_calendar:"Calendar",no_events:"Nothing coming up",all_day:"All day",tomorrow:"Tomorrow",widget_forecast:"This week",widget_countdown:"Countdown",days_left:"{n} days",today_event:"Today!",next_ramadan:"Ramadan",next_eid:"Eid al-Fitr",next_adha:"Eid al-Adha",add_event:"Add a date",event_title:"Name",event_date:"Date",send_message:"Message the home screen",message_placeholder:"Dinner is ready!",send:"Send",message_from:"From {name}",got_it:"Got it",kids_mode:"Kids mode",kids_page:"Kids page",widget_gauge:"Gauge",widget_gate:"Gate",widget_frigate:"Recent detections",widget_schedule:"Schedules",gauge_low:"Running low",gate_hold:"Hold to open",gate_hold_close:"Hold to close",history_lock:"Recent activity",by_user:"by {name}",frigate_missing:"Frigate isn't installed. Add the Frigate integration (HACS) to see people, cars and faces here.",person_l:"Person",car_l:"Car",dog_l:"Dog",cat_l:"Cat",package_l:"Package",automations:"Automations",new_automation:"New automation",when:"When…",then:"Then…",only_if:"Only between",trig_time:"At a time",trig_sun:"Sunrise / sunset",trig_state:"A device changes",trig_mode:"The house mode becomes",sunrise:"Sunrise",sunset:"Sunset",offset_min:"Offset (min)",becomes:"becomes",act_on:"Turn on",act_off:"Turn off",act_mode:"Set house mode",act_message:"Show a message",days:"Days",auto_name:"Name",auto_saved:"Automation saved",auto_empty:"No SmartNest automations yet.",every_day:"Every day",heading_text:"Text",empty_page:"This page is empty.",empty_page_admin:"Tap Edit, then Add widget.",entity:"Device",choose_entity:"Choose a device",no_entities:"No matching devices",display_name:"Display name",display_name_hint:"Leave empty to use the Home Assistant name",show_as:"Show as",show_icon:"Icon",show_value:"Icon and value",floor:"Floor",add_floor:"Add floor",heat_map:"Room temperatures",room_lights_on:"All lights on",room_lights_off:"All lights off",night_plan:"Quiet plan at night",rooms:"Rooms",draw_room:"Draw room",draw_hint:"Tap each corner of the room, then tap the first corner to close it.",room_name:"Room name",room_default:"Room {n}",finish:"Finish",undo_point:"Undo",delete_room:"Delete room",rooms_hint:"Lights placed inside a room make it glow.",floor_name:"Floor name",floor_default:"Ground floor",upload_plan:"Upload floor plan",replace_plan:"Replace image",add_device:"Add device",no_plan:"No floor plan yet",no_plan_admin:"Tap Edit to upload one.",drag_hint:"Drag devices to place them",plan_in_dark:"Plan in dark mode",plan_original:"As uploaded",plan_invert:"Invert colors",doorbell_test:"Test doorbell",delete_floor:"Delete floor",home_name:"Home name",language:"Language",accent:"Accent color",theme:"Appearance",theme_auto:"Follow device",theme_schedule:"Dark at night",theme_light:"Light",theme_dark:"Dark",dark_from:"Dark from",dark_to:"until",default_page:"Opening page",screensaver:"Screensaver",screensaver_after:"Start after (minutes)",temp_entity:"Temperature sensor",doorbell:"Doorbell",doorbell_trigger:"Doorbell button",doorbell_camera:"Doorbell camera",doorbell_lock:"Door lock",kiosk:"Kiosk lock",kiosk_lock:"Lock screen",kiosk_unlock:"Unlock",kiosk_pin:"Exit PIN",kiosk_pin_hint:"4 to 8 digits. Give it to the homeowner; kids and guests can't leave the dashboard without it.",kiosk_pin_set:"Set PIN",kiosk_pin_change:"Change PIN",kiosk_pin_saved:"PIN set. Tap Save.",kiosk_pin_invalid:"Use 4 to 8 digits",kiosk_remove_pin:"Remove PIN",kiosk_full_lock:"For a full lock, also use Fully Kiosk Browser (Android) or Guided Access (iPad).",enter_pin:"Enter PIN",wrong_pin:"Wrong PIN",tablet:"Wall tablet (Fully Kiosk)",tablet_found:"Found: {names}",tablet_none:"No Fully Kiosk tablet in Home Assistant yet. Add the Fully Kiosk Browser integration first.",tablet_this:"This screen is the tablet",tablet_not_this:"This screen isn't running inside Fully",tablet_js_hint:"On the tablet, turn on Fully's JavaScript Interface (Settings → Advanced Web Settings) so it recognises itself.",night_dim:"Dim at night",night_brightness:"Night brightness (%)",night_off:"Screen off at night after (minutes, 0 = never)",motion_wake:"Wake when someone comes close",motion_wake_hint:"Uses the tablet's camera to notice people. Nothing is recorded. Ask the homeowner first.",weather:"Weather",weather_entity:"Weather source",weather_bg:"Live weather background",photos:"Family photos",photo_folder:"Folder in Media",photo_seconds:"Seconds per photo",photos_hint:"Put photos in Media → My media → {folder}. Without photos the screensaver shows the clock.",status_bar:"Status bar",power_entity:"Home power sensor",chip_lights_1:"1 light on",chip_lights_n:"{n} lights on",chip_open_1:"1 open",chip_open_n:"{n} open",chip_unlocked_1:"Unlocked",chip_unlocked_n:"{n} unlocked",chip_climate_1:"AC {temp}",chip_climate_n:"{n} ACs on",chip_motion:"Motion",chip_alert:"Alert",chip_t_lights:"Lights",chip_t_open:"Doors & windows",chip_t_unlocked:"Locks",chip_t_climate:"AC",chip_t_motion:"Motion",chip_t_power:"Power",chip_t_alert:"Alerts",turn_all_off:"Turn all off",lock_all:"Lock all",greet_morning:"Good morning",greet_afternoon:"Good afternoon",greet_evening:"Good evening",greeting_name:"Name in the greeting",greeting_name_hint:"Leave empty to use the signed-in person's name",in_min:"in {n} min",in_hours:"in {n}",prayer:"Prayer times",p_fajr:"Fajr",p_dhuhr:"Dhuhr",p_asr:"Asr",p_maghrib:"Maghrib",p_isha:"Isha",morning_summary:"Morning summary",today_weather:"Today",overnight:"Overnight",night_doorbell_1:"The doorbell rang once",night_doorbell_n:"The doorbell rang {n} times",night_door_1:"{name} opened once",night_door_n:"{name} opened {n} times",night_robot:"The robot cleaned",night_quiet:"A quiet night. Nothing to report.",night_unlocked:"{name} is unlocked right now",lets_go:"Let's go",health:"System health",h_offline:"Offline devices",h_battery:"Low batteries",h_backup:"Last backup",h_backup_missing:"No backup sensor. Turn on automatic backups in Settings → System → Backups.",h_updates:"Updates waiting",h_system:"Hub",h_disk:"Disk",h_cpu_temp:"CPU temperature",h_memory:"Memory",h_tablets:"Wall tablets",h_reload:"Reload",h_charging:"Charging",h_not_charging:"Not charging",h_all_good:"All good",h_days_ago:"{n} days ago",h_robot_parts:"Robot parts to replace",h_telegram:"For alerts on Telegram, copy ha-config/packages/smartnest_health.yaml to this house.",activate_title:"Activate SmartNest",activate_text:"This dashboard needs an activation key for this house.",activate_id:"Installation ID",activate_key:"Activation key",activate_btn:"Activate",activate_bad:"This key isn't valid for this house.",activate_ask:"Ask the person who installed your smart home to activate it.",activate_send:"Send this ID to your installer:",licensed_to:"Licensed to",copy:"Copy",copied:"Copied",plan_basic:"Basic",plan_pro:"Pro",plan_premium:"Premium",plan_needed:"Available in {plan}",plan_label:"Plan",expires_on:"Renews by",expires_soon:"Your SmartNest subscription ends in {n} days. Ask your installer to renew.",expired_title:"Subscription ended",expired_text:"Ask your installer for a new activation key.",trial_label:"Trial",via:"Through",season:"Ramadan & Eid look",season_auto:"Automatic",season_ramadan:"Ramadan",season_eid:"Eid",ramadan_kareem:"Ramadan Kareem",eid_mubarak:"Eid Mubarak",timer_off_in:"Turn off in",timer_left:"Turns off {in}",min_short:"{n} min",hour_short:"{n} h",ss_style:"Screensaver style",ss_classic:"Classic",ss_minimal:"Minimal",ss_analog:"Analog",glass_style:"Card style",glass_classic:"Frosted",glass_liquid:"Liquid glass",guests_mode:"Guest mode",guests_wifi:"Guest Wi-Fi",wifi_ssid:"Network name",wifi_password:"Password",guests_welcome:"Welcome message",welcome_default:"Welcome! Make yourselves at home",scan_wifi:"Scan to join the Wi-Fi",plan_3d:"3D view",map_temp:"Temperature",map_humidity:"Humidity",map_co2:"Air (CO₂)",widget_media:"Music & TV",widget_remote:"TV remote",nothing_playing:"Nothing playing",group_speakers:"Play everywhere",cinema_mode:"Cinema",scene_cinema:"Enjoy the film",announce:"Say it on the speakers",speakers:"Speakers for announcements",export_config:"Export dashboard",import_config:"Import dashboard",import_done:"Imported. Check it, then tap Save.",import_bad:"That file isn't a SmartNest dashboard.",transfer:"Move between houses",wizard_title:"Set up this home",wizard_next:"Next",wizard_finish:"Finish",wizard_pages:"Which pages?",wizard_house:"What kind of home?",house_flat:"Flat",house_villa:"Villa",house_office:"Office",maintenance:"Maintenance",m_title:"Task",m_every:"Every (days)",m_done:"Done today",m_due:"Due",m_in:"in {n} days",m_overdue:"{n} days late",faults_week:"Dropped out this week",times:"{n}×",rate_service:"Rate your installer",rate_thanks:"Thank you! Your installer will see this.",rate_comment:"Anything to add?",tv_mode:"Large text (TV)",this_screen:"This screen",opens_on:"Opens on",about:"About",version:"Version",none:"None",enabled:"On",on:"On",off:"Off",open:"Open",closed:"Closed",opening:"Opening",closing:"Closing",locked:"Locked",unlocked:"Unlocked",locking:"Locking",unlocking:"Unlocking",jammed:"Jammed",cleaning:"Cleaning",docked:"Docked",returning:"Returning",paused:"Paused",idle:"Idle",error:"Error",unavailable:"Unavailable",unknown:"Unknown",motion:"Motion",clear:"Clear",detected:"Detected",heat:"Heat",cool:"Cool",auto:"Auto",dry:"Dry",fan_only:"Fan",heat_cool:"Heat/Cool",playing:"Playing",recording:"Recording",streaming:"Live",tap_to_run:"Tap to run",start:"Start",pause:"Pause",return_home:"Return to dock",locate:"Locate",lock:"Lock",unlock:"Unlock",unlock_confirm:"Unlock the door?",cover_open:"Open",cover_close:"Close",stop:"Stop",turn_on:"Turn on",turn_off:"Turn off",color:"Color",white_temp:"White",more_colors:"More colors",position:"Open",tilt:"Tilt",brightness:"Brightness",target_temp:"Set to",current_temp:"Now",battery:"Battery",mode:"Mode",last_changed:"Changed",just_now:"just now",min_ago:"{n} min ago",hours_ago:"{n} h ago",history_24h:"Last 24 hours",someone_at_door:"Someone's at the door",dismiss:"Dismiss",open_door:"Open door",tagline:"Smart home. Better living.",assistant:"Assistant",as_hello:"Ask me anything about the house, or tell me what to do.",as_s1:"Turn off all the lights",as_s2:"What's the temperature inside?",as_s3:"Close the blinds",as_s4:"Is the front door locked?",as_done:"Done.",as_error:"I couldn't do that. Try again.",as_speak:"Speak",as_placeholder:"Type a message…",as_send:"Send",ai_looking:"Looking…",habits_title:"Suggestions from your habits",habits_seen:"Happened by hand on {n} of the last 14 days",habits_make:"Make it automatic",x_title:"What's wrong and how to fix it",x_zigbee:"Zigbee: usually a dead battery, or it's too far from a powered Zigbee device",x_mqtt:"MQTT: check the bridge (Zigbee2MQTT) is running",x_zwave:"Z-Wave: battery, or re-interview the device",x_cloud:"Cloud device: check its power and Wi-Fi, then reload the integration (it may need a new login)",x_wifi:"Wi-Fi device: probably unplugged or out of Wi-Fi range",x_generic:"Check its power and connection, then reload its integration",x_battery:"Change the battery soon",x_ai:"Ask the AI",widget_consumers:"Using power now",widget_water:"Water",template_water:"Water",now:"now",others:"Others",standby:"Standby",standby_hint:"Off, but still drawing power. A smart plug can cut it.",standby_total:"{w} goes to devices that are off",water_usage:"Water meter",water_tank:"Tank",water_valve:"Main valve",water_leak:"Leak",water_no_leak:"No leaks",water_close:"Close",water_open:"Open",water_close_confirm:"Tap again to close",bill_budget:"Monthly budget",bill_over:"Heading {v} over",bill_within:"On track",solar_tip:"{kw} of spare sun: a good time for the washer or the heater",overload_title:"High load: {now} of {max}",overload_hint:"Turn something off before the breaker trips:",power_limit:"Power limit (W)",power_limit_hint:"An alert shows when the house goes over this for 20 seconds",replay:"Replay the day",play:"Play",all_floors:"All floors",travel:"Travel mode",travel_on:"Travel mode on",travel_off:"Turns off: {x}",travel_off_pick:"Turn off when leaving",travel_arm:"Arms the alarm",travel_sim:"Lights on and off in the evening, like someone's home",travel_sim_now:"Simulating now: {x}",travel_report:"A report to your phone every evening at 8",travel_start:"We're leaving",travel_stop:"We're back",travel_bye:"Have a good trip! The house is in good hands.",travel_welcome:"Welcome home!",alarm_triggered:"The alarm is going off",alarm_code:"Alarm code",alarm_stop:"Stop the alarm",alarm_hide:"Hide",call_police:"Police",emergency:"Emergency numbers",police_number:"Police number",emergency_contacts:"Family to call",emergency_hint:"One per line: name, phone. Shown when the alarm goes off.",chip_t_package:"Parcels",chip_package:"A parcel arrived",wx_alert_rain:"Rain on the way",wx_alert_wind:"Strong wind or dust on the way",wx_alert_open:"Still open: {x}",wx_close_covers:"Close the blinds",widget_wake:"Sunrise alarm",wake_minutes:"{n} min sunrise",wake_add:"Add an alarm",wake_hint:"The light rises slowly before the alarm time, like the sun.",widget_chores:"Kids' chores",chores_kids:"Kids",chores_tasks:"Chores",chores_kid_name:"Name",chores_task_name:"Chore (e.g. make the bed)",chores_goal:"Stars for the reward (weekly)",chores_reward:"Reward",chores_reward_hint:"Ice cream on Friday",chores_won:"Reward earned!",widget_air:"Air quality",air_co2:"CO₂",air_pm25:"Fine dust",air_voc:"VOCs",air_humidity:"Humidity",air_level_good:"The air is fresh",air_level_ok:"The air could be better",air_level_bad:"The air needs attention",air_good:"Nothing to do.",air_tip_co2:"Open a window for 10 minutes.",air_tip_pm:"Close the windows and run the purifier.",air_tip_voc:"Air the room out: cooking, paint or cleaning products.",air_tip_dry:"Too dry: a humidifier would help.",air_tip_humid:"Too humid: run the AC on dry, or air the room.",fx_title:"Moving scenes",fx_candle:"Candle",fx_sunset:"Sunset",fx_party:"Party",fx_ramadan:"Ramadan",fx_aurora:"Aurora",fx_stop:"Stop",fx_started:"Scene running",page_person:"Whose page",page_person_all:"Everyone",page_person_hint:"Their photo shows in the bar; tap it to open their page.",support_title:"Something's wrong? Message the installer",support_hint:"Sends a WhatsApp to {name} with the house's status, so they can help faster.",support_placeholder:"What's happening? (e.g. the kitchen light doesn't respond)",support_default:"Hi, I need help with the smart home.",support_send:"Send on WhatsApp",installer:"Installer",installer_name:"Installer name",installer_phone:"WhatsApp number",installer_phone_hint:"With country code, no + or spaces. The client gets a 'Something's wrong?' button.",report:"Monthly report",report_title:"{name} · monthly report",report_devices:"Devices",report_offline:"{n} offline now",report_faults:"Dropped off this month",report_autos:"{n} running",presets:"Ready-made looks",preset_gold:"Gold",preset_sea:"Sea",preset_desert:"Desert",preset_night:"Night",preset_rose:"Rose",preset_olive:"Olive",history:"Earlier versions",history_hint:"Every save keeps the version before it. Restoring is undoable too.",history_empty:"No earlier versions yet. They appear after the next save.",history_size:"{p} pages · {w} items",history_restore:"Go back to this",history_confirm:"Replace today's dashboard with this version on every screen?",history_done:"Restored",template_car:"Car",template_garden:"Garden & pool",template_pets:"Pets",ai_scene_title:"A mood in words",ai_scene_hint:"e.g. calm for a movie",ai_do_it:"Do it",ai_auto_hint:"Describe it: every night at 11 turn off the living room",ai_auto_fail:"I couldn't turn that into an automation. Try saying when and what.",ai_cam_btn:"What happened outside today?",ai_cam_quiet:"A quiet day: nothing was seen.",ai_bill_btn:"Why is the bill like this?",voice_hands_free:"Hands-free voice",voice_hint:"Say the wake word (e.g. “Okay Nabu”) and talk. Needs the Assist pipeline with a wake word engine, and the dashboard on https.",voice_https:"The microphone needs the dashboard on https",voice_mic:"No access to the microphone",voice_pipeline:"Assist isn't ready (wake word engine?)",voice_ready:"Listening for the wake word",voice_listening:"I'm listening…",helpers:"House helpers",h_appliances:"Appliance finished",h_appliances_hint:"Pick the plug meters of the washer, dryer or dishwasher. When a cycle ends, every screen says so, and the speakers too.",h_night_path:"Night path",h_night_path_hint:"Pick motion sensors and lights: at night, motion turns them on dimly for 3 minutes.",h_arrival:"On the way home",h_arrival_hint:"Pick ACs and lights: when someone heads home and is this close, the AC starts (and the lights, after dark).",h_arrival_missing:"Needs the Proximity integration in Home Assistant (Settings → Integrations → Proximity).",h_arrival_km:"Start when closer than (km)",h_outage:"Power cut",h_outage_hint:"Pick the grid sensor (a binary sensor, or grid voltage), then what to turn off when it's gone.",h_outage_sensor:"Grid sensor",from:"From",to:"to",chip_outage:"Power cut",chip_running:"{name} running",chip_arriving:"{name} home in ~{n} min",widget_boiler:"Water heater",boiler_ready_in:"Heating · ready in {n} min",boiler_off_in:"Hot · turns off in {n} min",boiler_hot:"On",boiler_next:"Hot water by {at}",boiler_for:"{n} min",boiler_plan:"starts {n} min before",boiler_want:"Hot water by",widget_irrigation:"Garden watering",irr_running:"Watering now",irr_next:"At {at} for {n} min",irr_skip_rain:"Skip when rain is coming",irr_skipped:"{date}: skipped, rain on the way",irr_watered:"{date}: watered",irr_now:"Water 10 min now",minutes:"min",codes_title:"Guest codes",codes_new:"New code",codes_who:"For whom (e.g. the cleaner)",codes_from:"Starts",codes_4h:"4 hours",codes_day:"A day",codes_3days:"3 days",codes_week:"A week",codes_auto:"Code (empty = random 6 digits)",codes_make:"Make the code",codes_live:"Active",codes_later:"Starts later",codes_share:"Send",codes_full:"All guest slots on this lock are taken",codes_need_zwave:"Guest codes are written to Z-Wave keypad locks (Z-Wave JS).",codes_message:"Hi {name} 👋\nYour code for {lock}: {code}\nFrom {from}\nUntil {until}",widget_timeline:"Camera timeline",tl_pick:"{n} detections: tap a dot to watch",tl_none:"Nothing was detected",fr_person:"Person",fr_car:"Car",fr_dog:"Dog",fr_cat:"Cat",fr_package:"Parcel",widget_internet:"Kids' internet",net_on:"Online",net_off:"Offline",net_paused_for:"Paused · back in {n} min",net_stop:"Stop",net_allow:"Allow",net_hour:"An hour off",net_bedtime:"Bedtime",net_wake:"Morning",net_no_router:"No router switches found. Add your router's integration (UniFi, FRITZ!Box, Omada, Deco…).",net_ask_installer:"Ask the installer to set this up.",face_hello:"Hello {name}",widget_board:"Family board",board_write:"Write",board_draw:"Draw",board_stick:"Stick it",board_placeholder:"Back at 6, dinner's in the fridge…",board_empty:"Nothing on the board yet. Write a note or draw something.",widget_verse:"Verse of the day",widget_radar:"Rain radar",widget_commute:"On the road",commute_missing:"Add the Waze Travel Time integration (to work, school…) and the routes show up here.",widget_parcels:"Parcels",parcels_missing:"Add the 17TRACK integration to follow your parcels here.",parcels_none:"No parcels on the way",photos_from_phone:"Photos from a phone",photos_scan:"Scan with the phone's camera and pick photos. The link works for {n} minutes.",photos_wifi:"The phone needs to be on the home Wi-Fi.",big_text:"Large text",tour_again:"Show me around",tour_skip:"Skip",tour_next:"Next",tour_done:"Got it",tour_tabs:"These are your pages. Tap one, or swipe left and right.",tour_chips:"The house at a glance: what's on, what's open. Tap one to see or fix it.",tour_plan:"Your home's plan. Tap a device to control it, or a room to see everything in it.",tour_modes:"One tap for the whole house: leaving, back home, sleep, evening.",tour_tile:"Tap to switch on or off. Hold for more (brightness, colour, timer).",tour_assistant:"Ask or tell the house anything here.",tour_logo:"Settings for this screen, and help, are behind the logo.",tou:"Cheap hours",tou_cheap:"Cheap",tou_peak:"Peak",tou_later:"Run it at {at} (cheaper)",tou_scheduled:"It will start at {at}",chip_peak:"Peak hours ⚡",chip_cheap:"Power is cheap now",challenge_won:"{n}% less than last month",challenge_hint:"Family challenge: keep it lower than last month",refill_phone:"Supplier's WhatsApp (for refills)",refill_hint:'When the level is low, an "Order a refill" button appears.',refill_order:"Order a refill",refill_message:"Hello, we need a refill of {what} for {home}. Thanks!",heartbeat_url:"Heartbeat link",heartbeat_hint:"From your Licenses page. This house reports to you twice a day: up or not, how many devices are offline, which version.",bat_title:"Batteries running out",bat_days:"in ~{n} days",bat_year:"over a year",bat_none:"No battery is draining fast",war_title:"Warranties",war_until:"until {date}",war_over:"Ended",war_what:"Device (e.g. living room AC)",war_months:"{n} months",war_invoice:"Invoice photo",showroom:"Showroom mode",showroom_hint:"This screen shows a demo house instead of this home, for the shop. Turn it off here.",style:"Look",style_classic:"Classic",style_pro:"SmartNest 2.0",style_hint:"2.0: deeper glass with a light that follows your finger, the room's light colour behind everything, film grain and two-tone icons.",material_none:"Plain",material_marble:"Marble",material_wood:"Wood",material_sand:"Sand",material_olive:"Olive",night_midnight:"Midnight at night (pure black, only what's on glows)",theme_midnight:"Midnight"},Ht={en:At,ar:{edit:"تعديل",done:"تم",save:"حفظ",cancel:"إلغاء",delete:"حذف",add:"إضافة",close:"إغلاق",back:"رجوع",settings:"الإعدادات",search:"بحث",loading:"جارٍ التحميل…",saving:"جارٍ الحفظ…",saved:"تم الحفظ",save_failed:"ما زبط الحفظ. تأكد من الاتصال وجرّب مرة ثانية.",upload_failed:"ما زبط الرفع. استعمل صورة PNG أو JPG أو WebP أصغر من 15 ميغا.",discard_changes:"تتجاهل التعديلات؟",delete_confirm:"متأكد إنك بدك تحذفه؟",untitled:"بدون اسم",add_page:"صفحة جديدة",page_settings:"إعدادات الصفحة",page_title:"اسم الصفحة",page_icon:"الأيقونة",move_earlier:"قدّمها",move_later:"أخّرها",choose_template:"ابدأ من",template_rooms:"الغرف",other_devices:"غير ذلك",autofill_rooms:"عبّي الغرف",autofill_done:"انحط {n} جهاز",detect_rooms:"اكتشف الغرف",auto_add:"إضافة تلقائية",auto_need_areas:"رتّب الأجهزة على غرف بـ Home Assistant أول (الإعدادات ← Areas)",auto_nothing:"ما في أجهزة جديدة أحطها",which_room:"شو هاي الغرفة؟",skip_room:"تخطّي",detecting:"عم بقرا المخطط…",detect_none:"ما لقيت غرف جديدة. ارسمها بإيدك.",detect_done:"لقيت {n} غرف. اضغط على كل غرفة وسمّيها",detect_done_placed:"لقيت {n} غرف وحطيت {m} جهاز",detect_failed:"ما قدرت أقرا هالمخطط",room_area:"غرفة Home Assistant",template_blank:"فاضية",template_home:"الرئيسية",template_power:"الكهرباء",template_security:"الأمان",template_doorbell:"الجرس",template_climate:"التكييف",add_widget:"إضافة عنصر",widget_settings:"إعدادات العنصر",widget_floorplan:"مخطط البيت",widget_tile:"جهاز",widget_camera:"كاميرا",camera_wall:"كل الكاميرات",widget_heading:"عنوان",widget_clock:"ساعة",widget_modes:"الأوضاع",mode_away:"طالع",mode_home:"راجع",mode_sleep:"نوم",mode_evening:"سهرة",scene_away:"الله معك",scene_home:"أهلين، نوّرت البيت",scene_sleep:"تصبح على خير",scene_evening:"سهرة حلوة",scene_locking:"عم نقفل البيت",modes_missing:"ما لقيت سكربتات الأوضاع. انسخ ha-config/packages/smartnest_modes.yaml لـ Home Assistant.",widget_vacuum:"روبوت التنظيف",widget_visitors:"الزوار",widget_energy:"الطاقة",template_robot:"الروبوت",clean_rooms_1:"نظّف غرفة",clean_rooms_n:"نظّف {n} غرف",clean_all:"نظّف البيت كله",suction:"الشفط",mop:"المسح",passes:"عدد المرات",parts:"القطع",main_brush:"الفرشاة الرئيسية",side_brush:"الفرشاة الجانبية",filter:"الفلتر",sensors_part:"الحساسات",hours_left:"باقي {n} ساعة",cleaned_area:"نظّف",clean_time:"الوقت",empty_bin:"فضّي الخزان",no_rooms:"الغرف بتطلع هون لما الروبوت يرسم خريطة البيت.",fan_quiet:"هادي",fan_balanced:"عادي",fan_standard:"عادي",fan_turbo:"قوي",fan_max:"أقصى",fan_max_plus:"أقصى+",fan_gentle:"خفيف",fan_off:"بدون",mop_mild:"خفيف",mop_low:"خفيف",mop_moderate:"عادي",mop_medium:"عادي",mop_intense:"كثير",mop_high:"كثير",mop_off:"بدون",yesterday:"مبارح",today:"اليوم",no_visitors:"ما حدا دق الجرس لسا.",keep_days:"خلي صور الزوار (أيام)",e_solar:"الشمسي",e_grid:"الشبكة",e_battery:"البطارية",e_home:"البيت",e_solar_entity:"إنتاج الشمسي",e_grid_entity:"الشبكة (+ = سحب من الشبكة)",e_battery_entity:"البطارية (+ = عم تشحن)",e_soc_entity:"نسبة البطارية",e_home_entity:"استهلاك البيت (اختياري)",e_flip:"اعكس الاتجاه",widget_energy_stats:"فاتورة الكهرباء",widget_panic:"طوارئ",widget_check:"فحص قبل النوم",bill_title:"الكهرباء هالشهر",bill_projected:"الفاتورة المتوقعة",bill_used:"استهلكت لهلأ",bill_vs_last:"عن الشهر الماضي",bill_solar:"الشمسي وفّر",bill_top:"أكثر إشي بيصرف",e_total_energy:"الاستهلاك الكلي (kWh)",e_solar_energy:"إنتاج الشمسي (kWh)",tariff:"سعر الكيلوواط",currency:"العملة",panic_hold:"اضغط مطوّل ثانيتين",panic_sent:"وضع الطوارئ اشتغل",panic_missing:"ما لقيت سكربت الطوارئ. انسخ ha-config/packages/smartnest_safety.yaml لـ Home Assistant.",check_ok:"كله جاهز للنوم",check_n:"في {n} أشياء بدها انتباه",check_locks:"الأبواب مقفولة",check_open:"الأبواب والشبابيك مسكّرة",check_lights:"الأضواء مطفية",check_alarm:"الإنذار شغّال",check_appliances:"الأجهزة الخطرة مطفية",check_fix:"صلّحها",check_fix_all:"صلّح كل اللي بقدر عليه",arm_home:"بالبيت",arm_away:"طالعين",arm_night:"ليلي",disarm:"طفّي الإنذار",enter_code:"اكتب الرمز",disarmed:"مطفي",armed_home:"شغّال (بالبيت)",armed_away:"شغّال (طالعين)",armed_night:"شغّال (ليلي)",armed_vacation:"شغّال (سفر)",arming:"عم يشتغل",disarming:"عم يطفي",pending:"مستني",triggered:"إنذار!",widget_family:"العيلة",at_home:"بالبيت",away_l:"برا",widget_todo:"القائمة",add_placeholder:"ضيف إشي…",todo_empty:"ما في إشي",widget_calendar:"التقويم",no_events:"ما في مواعيد جاية",all_day:"كل اليوم",tomorrow:"بكرا",widget_forecast:"طقس الأسبوع",widget_countdown:"العدّاد",days_left:"{n} يوم",today_event:"اليوم!",next_ramadan:"رمضان",next_eid:"عيد الفطر",next_adha:"عيد الأضحى",add_event:"أضف موعد",event_title:"الاسم",event_date:"التاريخ",send_message:"ابعت رسالة للشاشة",message_placeholder:"العشا جاهز!",send:"ابعت",message_from:"من {name}",got_it:"تمام",kids_mode:"وضع الأطفال",kids_page:"صفحة الأطفال",widget_gauge:"مقياس",widget_gate:"البوابة",widget_frigate:"آخر اللي انشاف",widget_schedule:"الجداول",gauge_low:"قرّب يخلص",gate_hold:"اضغط مطوّل عشان تفتح",gate_hold_close:"اضغط مطوّل عشان تسكّر",history_lock:"آخر الحركات",by_user:"من {name}",frigate_missing:"Frigate مش متركّب. ضيف integration الـ Frigate (من HACS) عشان تشوف هون الأشخاص والسيارات والوجوه.",person_l:"شخص",car_l:"سيارة",dog_l:"كلب",cat_l:"قطة",package_l:"طرد",automations:"الأتمتة",new_automation:"أتمتة جديدة",when:"لما…",then:"اعمل…",only_if:"بس بين",trig_time:"بوقت معيّن",trig_sun:"الشروق أو الغروب",trig_state:"جهاز يتغير",trig_mode:"وضع البيت يصير",sunrise:"الشروق",sunset:"الغروب",offset_min:"قبل/بعد (دقايق)",becomes:"يصير",act_on:"شغّل",act_off:"طفّي",act_mode:"غيّر وضع البيت",act_message:"اعرض رسالة",days:"الأيام",auto_name:"الاسم",auto_saved:"انحفظت الأتمتة",auto_empty:"ما في أتمتة من SmartNest لسا.",every_day:"كل يوم",heading_text:"النص",empty_page:"هالصفحة فاضية.",empty_page_admin:"اضغط تعديل، وبعدين إضافة عنصر.",entity:"الجهاز",choose_entity:"اختار جهاز",no_entities:"ما في أجهزة مطابقة",display_name:"الاسم الظاهر",display_name_hint:"خليه فاضي عشان ياخذ الاسم من Home Assistant",show_as:"طريقة العرض",show_icon:"أيقونة",show_value:"أيقونة وقيمة",floor:"الطابق",add_floor:"طابق جديد",heat_map:"حرارة الغرف",room_lights_on:"ولّع كل الأضواء",room_lights_off:"طفّي كل الأضواء",night_plan:"المخطط هادي بالليل",rooms:"الغرف",draw_room:"ارسم غرفة",draw_hint:"اضغط على كل زاوية بالغرفة، وبعدين اضغط على أول زاوية عشان تسكّرها.",room_name:"اسم الغرفة",room_default:"غرفة {n}",finish:"خلّصت",undo_point:"تراجع",delete_room:"احذف الغرفة",rooms_hint:"الأضواء اللي جوا الغرفة بتخليها تضوي.",floor_name:"اسم الطابق",floor_default:"الطابق الأرضي",upload_plan:"ارفع المخطط",replace_plan:"غيّر الصورة",add_device:"أضف جهاز",no_plan:"ما في مخطط لسا",no_plan_admin:"اضغط تعديل عشان ترفع واحد.",drag_hint:"اسحب الأجهزة لمكانها",plan_in_dark:"المخطط بالوضع الغامق",plan_original:"زي ما هو",plan_invert:"اعكس الألوان",doorbell_test:"جرّب الجرس",delete_floor:"احذف الطابق",home_name:"اسم البيت",language:"اللغة",accent:"لون التمييز",theme:"المظهر",theme_auto:"حسب الجهاز",theme_schedule:"غامق بالليل",theme_light:"فاتح",theme_dark:"غامق",dark_from:"غامق من",dark_to:"لـ",default_page:"صفحة البداية",screensaver:"شاشة التوقف",screensaver_after:"تشتغل بعد (دقايق)",temp_entity:"حساس الحرارة",doorbell:"الجرس",doorbell_trigger:"زر الجرس",doorbell_camera:"كاميرا الباب",doorbell_lock:"قفل الباب",kiosk:"قفل الشاشة",kiosk_lock:"اقفل الشاشة",kiosk_unlock:"افتح القفل",kiosk_pin:"رمز الخروج",kiosk_pin_hint:"من 4 لـ 8 أرقام. أعطيه لصاحب البيت، والأولاد والضيوف ما بيقدروا يطلعوا من الداشبورد بدونه.",kiosk_pin_set:"حط الرمز",kiosk_pin_change:"غيّر الرمز",kiosk_pin_saved:"تم. اضغط حفظ.",kiosk_pin_invalid:"من 4 لـ 8 أرقام",kiosk_remove_pin:"شيل الرمز",kiosk_full_lock:"للقفل الكامل استعمل كمان Fully Kiosk Browser (أندرويد) أو Guided Access (آيباد).",enter_pin:"اكتب الرمز",wrong_pin:"الرمز غلط",tablet:"تابلت الحيط (Fully Kiosk)",tablet_found:"لقيت: {names}",tablet_none:"ما في تابلت Fully Kiosk بـ HA لسا. ضيف integration الـ Fully Kiosk Browser أول.",tablet_this:"هالشاشة هي التابلت",tablet_not_this:"هالشاشة مش شغّالة جوا Fully",tablet_js_hint:"عالتابلت، فعّل JavaScript Interface بـ Fully (Settings ← Advanced Web Settings) عشان يعرف حاله.",night_dim:"خفّف الإضاءة بالليل",night_brightness:"إضاءة الليل (%)",night_off:"اطفي الشاشة بالليل بعد (دقايق، 0 = أبداً)",motion_wake:"صحّي الشاشة لما حدا يقرّب",motion_wake_hint:"بتستعمل كاميرا التابلت عشان تحس بالناس. ما في أي تسجيل. اسأل صاحب البيت أول.",weather:"الطقس",weather_entity:"مصدر الطقس",weather_bg:"خلفية حيّة حسب الطقس",photos:"صور العيلة",photo_folder:"الفولدر بـ Media",photo_seconds:"ثواني لكل صورة",photos_hint:"حط الصور بـ Media ← My media ← {folder}. إذا ما في صور، شاشة التوقف بتبيّن الساعة.",status_bar:"شريط الحالة",power_entity:"حساس استهلاك البيت",chip_lights_1:"ضو شغّال",chip_lights_n:"{n} أضواء شغّالة",chip_open_1:"في إشي مفتوح",chip_open_n:"{n} مفتوحين",chip_unlocked_1:"القفل مفتوح",chip_unlocked_n:"{n} أقفال مفتوحة",chip_climate_1:"المكيف {temp}",chip_climate_n:"{n} مكيفات شغّالة",chip_motion:"في حركة",chip_alert:"تنبيه",chip_t_lights:"الأضواء",chip_t_open:"الأبواب والشبابيك",chip_t_unlocked:"الأقفال",chip_t_climate:"المكيفات",chip_t_motion:"الحركة",chip_t_power:"الكهرباء",chip_t_alert:"التنبيهات",turn_all_off:"طفّي الكل",lock_all:"اقفل الكل",greet_morning:"صباح الخير",greet_afternoon:"نهارك سعيد",greet_evening:"مسا الخير",greeting_name:"الاسم بالترحيب",greeting_name_hint:"خليه فاضي عشان ياخذ اسم الشخص اللي فاتح",in_min:"بعد {n} دقيقة",in_hours:"بعد {n}",prayer:"مواعيد الصلاة",p_fajr:"الفجر",p_dhuhr:"الظهر",p_asr:"العصر",p_maghrib:"المغرب",p_isha:"العشاء",morning_summary:"ملخص الصبح",today_weather:"اليوم",overnight:"بالليل",night_doorbell_1:"الجرس دق مرة",night_doorbell_n:"الجرس دق {n} مرات",night_door_1:"{name} انفتح مرة",night_door_n:"{name} انفتح {n} مرات",night_robot:"الروبوت نظّف",night_quiet:"ليلة هادية، ما صار إشي.",night_unlocked:"{name} مفتوح هلأ",lets_go:"يلا نبلّش",health:"صحة النظام",h_offline:"أجهزة طافية",h_battery:"بطاريات ضعيفة",h_backup:"آخر backup",h_backup_missing:"ما في حساس backup. شغّل الـ backup التلقائي من Settings ← System ← Backups.",h_updates:"تحديثات مستنية",h_system:"جهاز HA",h_disk:"الديسك",h_cpu_temp:"حرارة المعالج",h_memory:"الذاكرة",h_tablets:"تابلتات الحيط",h_reload:"إعادة تحميل",h_charging:"عالشاحن",h_not_charging:"مش عالشاحن",h_all_good:"كله تمام",h_days_ago:"قبل {n} يوم",h_robot_parts:"قطع الروبوت لازم تتغير",h_telegram:"عشان توصلك تنبيهات على Telegram، انسخ ha-config/packages/smartnest_health.yaml لهالبيت.",activate_title:"تفعيل SmartNest",activate_text:"هالداشبورد بده كود تفعيل لهالبيت.",activate_id:"رقم التركيب",activate_key:"كود التفعيل",activate_btn:"فعّل",activate_bad:"هالكود مش لهالبيت.",activate_ask:"احكي مع الشخص اللي ركّبلك البيت الذكي عشان يفعّله.",activate_send:"ابعت هالرقم للي ركّبلك:",licensed_to:"مرخّص لـ",copy:"انسخ",copied:"انسخ ✓",plan_basic:"أساسي",plan_pro:"Pro",plan_premium:"Premium",plan_needed:"متوفر بباقة {plan}",plan_label:"الباقة",expires_on:"التجديد قبل",expires_soon:"اشتراك SmartNest بينتهي بعد {n} يوم. احكي مع اللي ركّبلك عشان تجدد.",expired_title:"انتهى الاشتراك",expired_text:"اطلب كود تفعيل جديد من اللي ركّبلك.",trial_label:"تجربة",via:"عن طريق",season:"شكل رمضان والعيد",season_auto:"تلقائي",season_ramadan:"رمضان",season_eid:"العيد",ramadan_kareem:"رمضان كريم",eid_mubarak:"عيد مبارك",timer_off_in:"طفّي بعد",timer_left:"بيطفي {in}",min_short:"{n} د",hour_short:"{n} س",ss_style:"شكل شاشة التوقف",ss_classic:"كلاسيك",ss_minimal:"بسيط",ss_analog:"عقارب",glass_style:"شكل الكروت",glass_classic:"زجاج مغبّش",glass_liquid:"زجاج سائل",guests_mode:"وضع الضيوف",guests_wifi:"واي فاي الضيوف",wifi_ssid:"اسم الشبكة",wifi_password:"كلمة السر",guests_welcome:"رسالة الترحيب",welcome_default:"أهلاً وسهلاً، البيت بيتكم",scan_wifi:"صوّر الكود عشان تتصل بالواي فاي",plan_3d:"عرض 3D",map_temp:"الحرارة",map_humidity:"الرطوبة",map_co2:"الهوا (CO₂)",widget_media:"الموسيقى والتلفزيون",widget_remote:"ريموت التلفزيون",nothing_playing:"ما في إشي شغّال",group_speakers:"شغّل بكل البيت",cinema_mode:"سينما",scene_cinema:"فرجة ممتعة",announce:"قولها عالسماعات",speakers:"سماعات الإعلانات",export_config:"صدّر الداشبورد",import_config:"استورد داشبورد",import_done:"تم الاستيراد. راجعه واضغط حفظ.",import_bad:"هالملف مش داشبورد SmartNest.",transfer:"النقل بين البيوت",wizard_title:"جهّز هالبيت",wizard_next:"التالي",wizard_finish:"خلصنا",wizard_pages:"شو الصفحات؟",wizard_house:"شو نوع البيت؟",house_flat:"شقة",house_villa:"فيلا",house_office:"مكتب",maintenance:"الصيانة",m_title:"المهمة",m_every:"كل (يوم)",m_done:"خلصت اليوم",m_due:"موعدها",m_in:"بعد {n} يوم",m_overdue:"متأخرة {n} يوم",faults_week:"انقطعت هالأسبوع",times:"{n} مرات",rate_service:"قيّم اللي ركّبلك",rate_thanks:"يسلمو! رح يوصل تقييمك للي ركّبلك.",rate_comment:"بدك تضيف إشي؟",tv_mode:"خط كبير (تلفزيون)",this_screen:"هالشاشة",opens_on:"بتفتح على",about:"حول",version:"الإصدار",none:"بدون",enabled:"شغّال",on:"شغّال",off:"مطفي",open:"مفتوح",closed:"مسكّر",opening:"عم يفتح",closing:"عم يسكّر",locked:"مقفول",unlocked:"مفتوح القفل",locking:"عم يقفل",unlocking:"عم يفتح القفل",jammed:"عالق",cleaning:"عم ينظّف",docked:"بالقاعدة",returning:"راجع للقاعدة",paused:"موقّف",idle:"خامل",error:"خطأ",unavailable:"غير متصل",unknown:"غير معروف",motion:"في حركة",clear:"ما في حركة",detected:"مكتشف",heat:"تدفئة",cool:"تبريد",auto:"تلقائي",dry:"تجفيف",fan_only:"مروحة",heat_cool:"تدفئة/تبريد",playing:"عم يشغّل",recording:"عم يسجّل",streaming:"مباشر",tap_to_run:"اضغط للتشغيل",start:"ابدأ",pause:"وقّف",return_home:"ارجع للقاعدة",locate:"وينه؟",lock:"اقفل",unlock:"افتح القفل",unlock_confirm:"تفتح قفل الباب؟",cover_open:"افتح",cover_close:"سكّر",stop:"وقّف",turn_on:"شغّل",turn_off:"طفّي",color:"اللون",white_temp:"الأبيض",more_colors:"ألوان أكثر",position:"الفتحة",tilt:"الميلان",brightness:"الإضاءة",target_temp:"مضبوط على",current_temp:"هلأ",battery:"البطارية",mode:"الوضع",last_changed:"آخر تغيير",just_now:"هلأ",min_ago:"قبل {n} دقيقة",hours_ago:"قبل {n} ساعة",history_24h:"آخر 24 ساعة",someone_at_door:"في حدا عالباب",dismiss:"تجاهل",open_door:"افتح الباب",tagline:"بيتك أذكى، حياتك أريح",assistant:"المساعد",as_hello:"اسألني عن أي إشي بالبيت، أو قلّي شو أعمل.",as_s1:"طفّي كل الأضواء",as_s2:"قديش الحرارة جوّا؟",as_s3:"سكّر الستائر",as_s4:"الباب مقفول؟",as_done:"تمام.",as_error:"ما زبطت معي، جرّب كمان مرة.",as_speak:"احكي",as_placeholder:"اكتب رسالة…",as_send:"ابعت",ai_looking:"عم بشوف…",habits_title:"اقتراحات من عاداتكم",habits_seen:"صارت بالإيد {n} أيام من آخر 14 يوم",habits_make:"اعملها لحالها",x_title:"شو المشكلة وكيف تنحل",x_zigbee:"Zigbee: غالباً البطارية خلصت، أو بعيد عن جهاز Zigbee موصول عالكهربا",x_mqtt:"MQTT: تأكد إنه الجسر (Zigbee2MQTT) شغّال",x_zwave:"Z-Wave: البطارية، أو اعمل re-interview للجهاز",x_cloud:"جهاز عالسحابة: تأكد من الكهربا والواي فاي، وبعدين اعمل reload للـ integration (ممكن بدها تسجيل دخول جديد)",x_wifi:"جهاز واي فاي: غالباً مفصول عن الكهربا أو بعيد عن الراوتر",x_generic:"تأكد من الكهربا والاتصال، وبعدين اعمل reload للـ integration تبعه",x_battery:"غيّر البطارية قريباً",x_ai:"اسأل الذكاء الصناعي",widget_consumers:"مين بيسحب كهربا هلأ",widget_water:"المي",template_water:"المي",now:"هلأ",others:"الباقي",standby:"ساحب وهو طافي",standby_hint:"طافي بس لسا بيسحب كهربا. قابس ذكي بيقطعه.",standby_total:"{w} رايحين على أجهزة طافية",water_usage:"عداد المي",water_tank:"الخزان",water_valve:"المحبس الرئيسي",water_leak:"في تسريب",water_no_leak:"ما في تسريب",water_close:"سكّر",water_open:"افتح",water_close_confirm:"اضغط كمان مرة لتسكّر",bill_budget:"ميزانية الشهر",bill_over:"رح تتعدّاها بـ {v}",bill_within:"ماشي منيح",solar_tip:"في {kw} شمس زيادة: وقت منيح للغسالة أو السخان",overload_title:"الحمل عالي: {now} من {max}",overload_hint:"طفّي إشي قبل ما يفصل القاطع:",power_limit:"حد الاستهلاك (واط)",power_limit_hint:"بيطلع تنبيه إذا البيت تعدّاه 20 ثانية",replay:"شو صار اليوم",play:"شغّل",all_floors:"كل الطوابق",travel:"وضع السفر",travel_on:"وضع السفر شغّال",travel_off:"بيطفّي: {x}",travel_off_pick:"شو يطفّي لما تطلعوا",travel_arm:"بيشغّل الإنذار",travel_sim:"أضواء بتشتغل وبتطفى بالمسا كأنه في حدا بالبيت",travel_sim_now:"هلأ شغّال: {x}",travel_report:"تقرير عالجوال كل يوم الساعة 8 بالمسا",travel_start:"طالعين مسافرين",travel_stop:"رجعنا",travel_bye:"رحلة سعيدة! البيت بإيد أمينة.",travel_welcome:"أهلين فيكم بالبيت!",alarm_triggered:"الإنذار ضرب",alarm_code:"رمز الإنذار",alarm_stop:"وقّف الإنذار",alarm_hide:"خبّي",call_police:"الشرطة",emergency:"أرقام الطوارئ",police_number:"رقم الشرطة",emergency_contacts:"مين نتصل من العيلة",emergency_hint:"كل واحد بسطر: الاسم، الرقم. بيطلعوا لما يضرب الإنذار.",chip_t_package:"الطرود",chip_package:"وصل طرد",wx_alert_rain:"رح تشتي",wx_alert_wind:"في هوا قوي أو غبار جاي",wx_alert_open:"لسا مفتوح: {x}",wx_close_covers:"سكّر الستائر",widget_wake:"منبّه بالضو",wake_minutes:"شروق {n} دقيقة",wake_add:"زيد منبّه",wake_hint:"الضو بيضوي شوي شوي قبل وقت المنبّه، متل الشمس.",widget_chores:"مهام الولاد",chores_kids:"الولاد",chores_tasks:"المهام",chores_kid_name:"الاسم",chores_task_name:"المهمة (مثلاً رتّب تختك)",chores_goal:"كم نجمة للجائزة (بالأسبوع)",chores_reward:"الجائزة",chores_reward_hint:"بوظة يوم الجمعة",chores_won:"ربحت الجائزة!",widget_air:"جودة الهوا",air_co2:"CO₂",air_pm25:"الغبار",air_voc:"روائح وغازات",air_humidity:"الرطوبة",air_level_good:"الهوا نضيف",air_level_ok:"الهوا مش أحسن إشي",air_level_bad:"الهوا بدو انتباه",air_good:"ما في إشي تعمله.",air_tip_co2:"افتح شباك 10 دقايق.",air_tip_pm:"سكّر الشبابيك وشغّل منقّي الهوا.",air_tip_voc:"هوّي الغرفة: طبخ أو دهان أو مواد تنظيف.",air_tip_dry:"ناشف كثير: مرطّب هوا بيساعد.",air_tip_humid:"رطب كثير: شغّل المكيف على تجفيف أو هوّي.",fx_title:"مشاهد متحركة",fx_candle:"شمعة",fx_sunset:"غروب",fx_party:"حفلة",fx_ramadan:"رمضان",fx_aurora:"شفق",fx_stop:"وقّف",fx_started:"المشهد شغّال",page_person:"صفحة مين",page_person_all:"للكل",page_person_hint:"صورته بتطلع بالبار، وضغطة عليها بتفتح صفحته.",support_title:"في مشكلة؟ احكي مع المركّب",support_hint:"بتبعت واتساب لـ {name} مع حالة البيت، عشان يقدر يساعد أسرع.",support_placeholder:"شو صاير؟ (مثلاً ضو المطبخ ما بيرد)",support_default:"مرحبا، بدي مساعدة بالبيت الذكي.",support_send:"ابعت عالواتساب",installer:"المركّب",installer_name:"اسم المركّب",installer_phone:"رقم الواتساب",installer_phone_hint:'مع مفتاح الدولة، بدون + أو فراغات. الزبون بيصيرله زر "في مشكلة؟".',report:"تقرير شهري",report_title:"{name} · التقرير الشهري",report_devices:"الأجهزة",report_offline:"{n} فاصلين هلأ",report_faults:"انقطعت هالشهر",report_autos:"{n} شغّالة",presets:"سمات جاهزة",preset_gold:"ذهبي",preset_sea:"بحري",preset_desert:"صحراوي",preset_night:"ليلي",preset_rose:"وردي",preset_olive:"زيتوني",history:"النسخ السابقة",history_hint:"كل حفظ بيخلّي النسخة اللي قبله. والرجوع كمان بتقدر تتراجع عنه.",history_empty:"لسا ما في نسخ. بتطلع بعد أول حفظ.",history_size:"{p} صفحات · {w} عنصر",history_restore:"ارجع لهاي",history_confirm:"تبدّل الداشبورد الحالي بهاي النسخة على كل الشاشات؟",history_done:"رجعت",template_car:"السيارة",template_garden:"الجنينة والمسبح",template_pets:"الحيوانات",ai_scene_title:"جو بكلمة",ai_scene_hint:"مثلاً هادي لفيلم",ai_do_it:"اعملها",ai_auto_hint:"احكيها: كل ليلة الساعة 11 طفّي الصالة",ai_auto_fail:"ما قدرت أفهمها كأتمتة. قول إيمتى وشو بدك يصير.",ai_cam_btn:"شو صار برا اليوم؟",ai_cam_quiet:"يوم هادي: ما انشاف إشي.",ai_bill_btn:"ليش الفاتورة هيك؟",voice_hands_free:"صوت بدون لمس",voice_hint:'قول كلمة التنبيه (مثلاً "Okay Nabu") واحكي. بدها Assist مع محرّك كلمة تنبيه، والداشبورد على https.',voice_https:"الميكروفون بدو الداشبورد على https",voice_mic:"ما في إذن للميكروفون",voice_pipeline:"Assist مش جاهز (محرّك كلمة التنبيه؟)",voice_ready:"عم بستنى كلمة التنبيه",voice_listening:"عم بسمعك…",helpers:"مساعدين البيت",h_appliances:"الغسالة خلصت",h_appliances_hint:"اختار حساس استهلاك الغسالة أو النشافة أو الجلاية. لما تخلص، بيطلع على كل الشاشات وبينحكى عالسماعات.",h_night_path:"مسار الليل",h_night_path_hint:"اختار حساسات حركة وأضواء: بالليل الحركة بتضوّيهم خفيف 3 دقايق.",h_arrival:"راجعين عالبيت",h_arrival_hint:"اختار مكيفات وأضواء: لما حدا راجع وصار قريب هالقد، المكيف بيشتغل (والأضواء إذا ليل).",h_arrival_missing:"بدها integration الـ Proximity بـ HA (الإعدادات ← Integrations ← Proximity).",h_arrival_km:"ابدأ لما يكون أقرب من (كم)",h_outage:"انقطاع الكهربا",h_outage_hint:"اختار حساس الشبكة (binary، أو جهد الشبكة)، وبعدين شو يطفّي لما تنقطع.",h_outage_sensor:"حساس الشبكة",from:"من",to:"لـ",chip_outage:"الكهربا مقطوعة",chip_running:"{name} شغّالة",chip_arriving:"{name} بيوصل بعد ~{n} د",widget_boiler:"السخان",boiler_ready_in:"عم يسخّن · جاهز بعد {n} دقيقة",boiler_off_in:"سخن · بيطفى بعد {n} دقيقة",boiler_hot:"شغّال",boiler_next:"مي سخنة الساعة {at}",boiler_for:"{n} دقيقة",boiler_plan:"بيبلّش قبل بـ {n} دقيقة",boiler_want:"بدي مي سخنة الساعة",widget_irrigation:"ري الجنينة",irr_running:"عم يرش هلأ",irr_next:"الساعة {at} لمدة {n} دقيقة",irr_skip_rain:"وقّف إذا رح تشتي",irr_skipped:"{date}: ما رشّينا، رح تشتي",irr_watered:"{date}: رشّينا",irr_now:"رش 10 دقايق هلأ",minutes:"دقيقة",codes_title:"رموز الضيوف",codes_new:"رمز جديد",codes_who:"لمين (مثلاً عاملة التنظيف)",codes_from:"من إيمتى",codes_4h:"4 ساعات",codes_day:"يوم",codes_3days:"3 أيام",codes_week:"أسبوع",codes_auto:"الرمز (فاضي = 6 أرقام عشوائية)",codes_make:"اعمل الرمز",codes_live:"شغّال",codes_later:"بيبلّش بعدين",codes_share:"ابعت",codes_full:"كل أماكن الضيوف بالقفل مليانة",codes_need_zwave:"رموز الضيوف بتنكتب على أقفال Z-Wave بلوحة أرقام (Z-Wave JS).",codes_message:"مرحبا {name} 👋\nرمزك لـ {lock}: {code}\nمن {from}\nلحد {until}",widget_timeline:"تسجيلات الكاميرا",tl_pick:"{n} أحداث: اضغط على نقطة لتشوفها",tl_none:"ما انشاف إشي",fr_person:"شخص",fr_car:"سيارة",fr_dog:"كلب",fr_cat:"قطة",fr_package:"طرد",widget_internet:"إنترنت الولاد",net_on:"الإنترنت شغّال",net_off:"الإنترنت موقّف",net_paused_for:"موقّف · بيرجع بعد {n} دقيقة",net_stop:"وقّف",net_allow:"رجّعه",net_hour:"ساعة بلا نت",net_bedtime:"وقت النوم",net_wake:"الصبح",net_no_router:"ما لقيت مفاتيح من الراوتر. ضيف integration الراوتر (UniFi، FRITZ!Box، Omada، Deco…).",net_ask_installer:"اطلب من المركّب يجهّزه.",face_hello:"أهلين {name}",widget_board:"لوح العيلة",board_write:"اكتب",board_draw:"ارسم",board_stick:"علّقها",board_placeholder:"راجع الساعة 6، الأكل بالثلاجة…",board_empty:"اللوح فاضي. اكتب ملاحظة أو ارسم إشي.",widget_verse:"آية اليوم",widget_radar:"رادار المطر",widget_commute:"الطريق",commute_missing:"ضيف integration الـ Waze Travel Time (للشغل، للمدرسة…) وبتطلع الطرق هون.",widget_parcels:"الطرود",parcels_missing:"ضيف integration الـ 17TRACK عشان تتابع طرودك هون.",parcels_none:"ما في طرود بالطريق",photos_from_phone:"صور من الجوال",photos_scan:"امسح بكاميرا الجوال واختار صور. الرابط شغّال {n} دقيقة.",photos_wifi:"الجوال لازم يكون على واي فاي البيت.",big_text:"خط كبير",tour_again:"فرجيني الداشبورد",tour_skip:"تخطّي",tour_next:"التالي",tour_done:"فهمت",tour_tabs:"هدول صفحاتك. اضغط على وحدة، أو اسحب يمين وشمال.",tour_chips:"البيت بنظرة: شو شغّال وشو مفتوح. اضغط على وحدة لتشوف أو تصلّح.",tour_plan:"مخطط بيتك. اضغط على جهاز لتتحكم فيه، أو على غرفة لتشوف كل اللي فيها.",tour_modes:"ضغطة وحدة للبيت كله: طالع، راجع، نوم، سهرة.",tour_tile:"اضغط لتشغّل أو تطفّي. اضغط مطوّل لأكثر (الإضاءة، اللون، المؤقت).",tour_assistant:"هون بتسأل البيت أو بتقلّه شو يعمل.",tour_logo:"إعدادات هالشاشة والمساعدة ورا اللوجو.",tou:"ساعات الكهربا الرخيصة",tou_cheap:"رخيصة",tou_peak:"ذروة",tou_later:"شغّله الساعة {at} (أرخص)",tou_scheduled:"رح يشتغل الساعة {at}",chip_peak:"ساعة ذروة ⚡",chip_cheap:"الكهربا رخيصة هلأ",challenge_won:"وفّرتوا {n}% عن الشهر الماضي",challenge_hint:"تحدّي العيلة: خلّوها أقل من الشهر الماضي",refill_phone:"واتساب المورّد (للتعبئة)",refill_hint:'لما يقل المستوى، بيطلع زر "اطلب تعبئة".',refill_order:"اطلب تعبئة",refill_message:"مرحبا، بدنا تعبئة {what} لـ {home}. شكراً!",heartbeat_url:"رابط النبض",heartbeat_hint:"من صفحة التراخيص تبعك. البيت بيبعتلك مرتين باليوم: شغّال، كم جهاز فاصل، وأي نسخة.",bat_title:"بطاريات قرّبت تخلص",bat_days:"بعد ~{n} يوم",bat_year:"أكثر من سنة",bat_none:"ما في بطارية عم تنزل بسرعة",war_title:"الكفالات",war_until:"لحد {date}",war_over:"خلصت",war_what:"الجهاز (مثلاً مكيف الصالة)",war_months:"{n} شهر",war_invoice:"صورة الفاتورة",showroom:"وضع المعرض",showroom_hint:"هالشاشة بتعرض بيت وهمي بدل هالبيت، للمحل. بتطفيه من هون.",style:"الستايل",style_classic:"الكلاسيكي",style_pro:"SmartNest 2.0",style_hint:"2.0: زجاج أعمق وضو بيلحق إصبعك، لون أضواء البيت ورا كل إشي، حبيبات خفيفة، وأيقونات بلونين.",material_none:"سادة",material_marble:"رخام",material_wood:"خشب",material_sand:"رمل",material_olive:"زيتون",night_midnight:"منتصف الليل بالليل (أسود كامل، بس الشغّال بيضوي)",theme_midnight:"منتصف الليل"},he:{edit:"עריכה",done:"סיום",save:"שמירה",cancel:"ביטול",delete:"מחיקה",add:"הוספה",close:"סגירה",back:"חזרה",settings:"הגדרות",search:"חיפוש",loading:"טוען…",saving:"שומר…",saved:"נשמר",save_failed:"השמירה נכשלה. בדקו את החיבור ונסו שוב.",upload_failed:"ההעלאה נכשלה. השתמשו בקובץ PNG, JPG או WebP עד 15MB.",discard_changes:"לבטל את השינויים?",delete_confirm:"למחוק?",untitled:"ללא שם",add_page:"עמוד חדש",page_settings:"הגדרות עמוד",page_title:"שם העמוד",page_icon:"סמל",move_earlier:"הזז קדימה",move_later:"הזז אחורה",choose_template:"התחל מ",template_rooms:"חדרים",other_devices:"אחר",autofill_rooms:"מלא חדרים",autofill_done:"מוקמו {n} מכשירים",detect_rooms:"זהה חדרים",auto_add:"הוספה אוטומטית",auto_need_areas:"שייך קודם את המכשירים לחדרים ב-Home Assistant (הגדרות ← אזורים)",auto_nothing:"אין מכשירים חדשים למקם",which_room:"איזה חדר זה?",skip_room:"דלג",detecting:"קורא את התוכנית…",detect_none:"לא נמצאו חדרים חדשים. שרטט אותם ידנית.",detect_done:"נמצאו {n} חדרים. הקש על חדר כדי לתת לו שם",detect_done_placed:"נמצאו {n} חדרים ומוקמו {m} מכשירים",detect_failed:"לא ניתן לקרוא את התוכנית",room_area:"חדר ב-Home Assistant",template_blank:"ריק",template_home:"בית",template_power:"חשמל",template_security:"אבטחה",template_doorbell:"פעמון",template_climate:"מיזוג",add_widget:"הוספת רכיב",widget_settings:"הגדרות רכיב",widget_floorplan:"תוכנית קומה",widget_tile:"מכשיר",widget_camera:"מצלמה",camera_wall:"כל המצלמות",widget_heading:"כותרת",widget_clock:"שעון",widget_modes:"מצבים",mode_away:"יוצאים",mode_home:"חוזרים",mode_sleep:"שינה",mode_evening:"ערב",scene_away:"נסיעה טובה",scene_home:"ברוכים השבים",scene_sleep:"לילה טוב",scene_evening:"ערב נעים",scene_locking:"נועלים את הבית",modes_missing:"סקריפטי המצבים לא נמצאו. העתיקו את ha-config/packages/smartnest_modes.yaml ל-Home Assistant.",widget_vacuum:"שואב רובוטי",widget_visitors:"מבקרים",widget_energy:"אנרגיה",template_robot:"רובוט",clean_rooms_1:"נקה חדר אחד",clean_rooms_n:"נקה {n} חדרים",clean_all:"נקה את כל הבית",suction:"יניקה",mop:"שטיפה",passes:"מעברים",parts:"חלקים",main_brush:"מברשת ראשית",side_brush:"מברשת צד",filter:"מסנן",sensors_part:"חיישנים",hours_left:"נותרו {n} שע׳",cleaned_area:"נוקה",clean_time:"זמן",empty_bin:"ריקון מיכל",no_rooms:"החדרים יופיעו כאן אחרי שהרובוט ימפה את הבית.",fan_quiet:"שקט",fan_balanced:"רגיל",fan_standard:"רגיל",fan_turbo:"טורבו",fan_max:"מקסימום",fan_max_plus:"מקסימום+",fan_gentle:"עדין",fan_off:"כבוי",mop_mild:"קל",mop_low:"קל",mop_moderate:"בינוני",mop_medium:"בינוני",mop_intense:"חזק",mop_high:"חזק",mop_off:"כבוי",yesterday:"אתמול",today:"היום",no_visitors:"עדיין אף אחד לא צלצל.",keep_days:"שמירת תמונות מבקרים (ימים)",e_solar:"סולארי",e_grid:"רשת",e_battery:"סוללה",e_home:"בית",e_solar_entity:"ייצור סולארי",e_grid_entity:"רשת (+ = משיכה מהרשת)",e_battery_entity:"סוללה (+ = בטעינה)",e_soc_entity:"רמת סוללה",e_home_entity:"צריכת הבית (אופציונלי)",e_flip:"הפוך כיוון",widget_energy_stats:"חשבון חשמל",widget_panic:"חירום",widget_check:"בדיקה לפני השינה",bill_title:"החשמל החודש",bill_projected:"חשבון צפוי",bill_used:"נצרך עד עכשיו",bill_vs_last:"לעומת החודש שעבר",bill_solar:"הסולארי חסך",bill_top:"הצרכנים הגדולים",e_total_energy:"צריכה כוללת (kWh)",e_solar_energy:"ייצור סולארי (kWh)",tariff:"מחיר לקוט״ש",currency:"מטבע",panic_hold:"החזיקו 2 שניות",panic_sent:"מצב חירום הופעל",panic_missing:"סקריפט החירום לא נמצא. העתיקו את ha-config/packages/smartnest_safety.yaml ל-Home Assistant.",check_ok:"הכל מוכן ללילה",check_n:"{n} דברים לבדוק",check_locks:"הדלתות נעולות",check_open:"דלתות וחלונות סגורים",check_lights:"האורות כבויים",check_alarm:"האזעקה פעילה",check_appliances:"מכשירים מסוכנים כבויים",check_fix:"תקן",check_fix_all:"תקן כל מה שאפשר",arm_home:"בבית",arm_away:"בחוץ",arm_night:"לילה",disarm:"נטרל",enter_code:"הזינו קוד",disarmed:"כבויה",armed_home:"דרוכה (בבית)",armed_away:"דרוכה (בחוץ)",armed_night:"דרוכה (לילה)",armed_vacation:"דרוכה (חופשה)",arming:"נדרכת",disarming:"מנוטרלת",pending:"ממתינה",triggered:"אזעקה!",widget_family:"משפחה",at_home:"בבית",away_l:"בחוץ",widget_todo:"רשימה",add_placeholder:"הוסיפו פריט…",todo_empty:"אין כלום",widget_calendar:"לוח שנה",no_events:"אין אירועים קרובים",all_day:"כל היום",tomorrow:"מחר",widget_forecast:"השבוע",widget_countdown:"ספירה לאחור",days_left:"{n} ימים",today_event:"היום!",next_ramadan:"רמדאן",next_eid:"עיד אל-פיטר",next_adha:"עיד אל-אדחא",add_event:"הוסף תאריך",event_title:"שם",event_date:"תאריך",send_message:"שלח הודעה למסך",message_placeholder:"ארוחת ערב מוכנה!",send:"שלח",message_from:"מאת {name}",got_it:"הבנתי",kids_mode:"מצב ילדים",kids_page:"עמוד ילדים",widget_gauge:"מד",widget_gate:"שער",widget_frigate:"זיהויים אחרונים",widget_schedule:"לוחות זמנים",gauge_low:"עומד להיגמר",gate_hold:"החזיקו לפתיחה",gate_hold_close:"החזיקו לסגירה",history_lock:"פעילות אחרונה",by_user:"על ידי {name}",frigate_missing:"Frigate לא מותקן. הוסיפו את אינטגרציית Frigate (HACS) כדי לראות כאן אנשים, רכבים ופנים.",person_l:"אדם",car_l:"רכב",dog_l:"כלב",cat_l:"חתול",package_l:"חבילה",automations:"אוטומציות",new_automation:"אוטומציה חדשה",when:"כאשר…",then:"אז…",only_if:"רק בין",trig_time:"בשעה",trig_sun:"זריחה / שקיעה",trig_state:"מכשיר משתנה",trig_mode:"מצב הבית הופך ל",sunrise:"זריחה",sunset:"שקיעה",offset_min:"הפרש (דק׳)",becomes:"הופך ל",act_on:"הדלק",act_off:"כבה",act_mode:"קבע מצב בית",act_message:"הצג הודעה",days:"ימים",auto_name:"שם",auto_saved:"האוטומציה נשמרה",auto_empty:"עדיין אין אוטומציות של SmartNest.",every_day:"כל יום",heading_text:"טקסט",empty_page:"העמוד הזה ריק.",empty_page_admin:"הקישו עריכה ואז הוספת רכיב.",entity:"מכשיר",choose_entity:"בחרו מכשיר",no_entities:"לא נמצאו מכשירים",display_name:"שם לתצוגה",display_name_hint:"השאירו ריק כדי להשתמש בשם מ-Home Assistant",show_as:"תצוגה",show_icon:"סמל",show_value:"סמל וערך",floor:"קומה",add_floor:"קומה חדשה",heat_map:"טמפרטורת חדרים",room_lights_on:"הדלק את כל האורות",room_lights_off:"כבה את כל האורות",night_plan:"תוכנית שקטה בלילה",rooms:"חדרים",draw_room:"ציור חדר",draw_hint:"הקישו על כל פינה של החדר, ואז על הפינה הראשונה כדי לסגור.",room_name:"שם החדר",room_default:"חדר {n}",finish:"סיום",undo_point:"בטל",delete_room:"מחק חדר",rooms_hint:"אורות שממוקמים בתוך חדר גורמים לו לזהור.",floor_name:"שם הקומה",floor_default:"קומת קרקע",upload_plan:"העלאת תוכנית",replace_plan:"החלפת תמונה",add_device:"הוספת מכשיר",no_plan:"אין עדיין תוכנית קומה",no_plan_admin:"הקישו עריכה כדי להעלות.",drag_hint:"גררו את המכשירים למקומם",plan_in_dark:"התוכנית במצב כהה",plan_original:"כפי שהועלתה",plan_invert:"היפוך צבעים",doorbell_test:"בדיקת פעמון",delete_floor:"מחיקת קומה",home_name:"שם הבית",language:"שפה",accent:"צבע הדגשה",theme:"מראה",theme_auto:"לפי המכשיר",theme_schedule:"כהה בלילה",theme_light:"בהיר",theme_dark:"כהה",dark_from:"כהה מ",dark_to:"עד",default_page:"עמוד פתיחה",screensaver:"שומר מסך",screensaver_after:"הפעלה אחרי (דקות)",temp_entity:"חיישן טמפרטורה",doorbell:"פעמון",doorbell_trigger:"לחצן הפעמון",doorbell_camera:"מצלמת הדלת",doorbell_lock:"מנעול הדלת",kiosk:"נעילת מסך",kiosk_lock:"נעל מסך",kiosk_unlock:"שחרור נעילה",kiosk_pin:"קוד יציאה",kiosk_pin_hint:"4 עד 8 ספרות. מסרו אותו לבעל הבית; ילדים ואורחים לא יוכלו לצאת מהלוח בלעדיו.",kiosk_pin_set:"הגדר קוד",kiosk_pin_change:"שנה קוד",kiosk_pin_saved:"הקוד הוגדר. הקישו שמירה.",kiosk_pin_invalid:"4 עד 8 ספרות",kiosk_remove_pin:"הסר קוד",kiosk_full_lock:"לנעילה מלאה השתמשו גם ב-Fully Kiosk Browser (אנדרואיד) או Guided Access (אייפד).",enter_pin:"הזינו קוד",wrong_pin:"קוד שגוי",tablet:"טאבלט קיר (Fully Kiosk)",tablet_found:"נמצא: {names}",tablet_none:"עדיין אין טאבלט Fully Kiosk ב-Home Assistant. הוסיפו קודם את האינטגרציה Fully Kiosk Browser.",tablet_this:"המסך הזה הוא הטאבלט",tablet_not_this:"המסך הזה לא רץ בתוך Fully",tablet_js_hint:"בטאבלט, הפעילו את JavaScript Interface ב-Fully (Settings → Advanced Web Settings) כדי שיזהה את עצמו.",night_dim:"עמעום בלילה",night_brightness:"בהירות לילה (%)",night_off:"כיבוי מסך בלילה אחרי (דקות, 0 = אף פעם)",motion_wake:"הערה כשמישהו מתקרב",motion_wake_hint:"משתמש במצלמת הטאבלט כדי לזהות אנשים. שום דבר לא מוקלט. שאלו את בעל הבית קודם.",weather:"מזג אוויר",weather_entity:"מקור מזג האוויר",weather_bg:"רקע חי לפי מזג האוויר",photos:"תמונות משפחה",photo_folder:"תיקייה ב-Media",photo_seconds:"שניות לכל תמונה",photos_hint:"שימו תמונות ב-Media ← My media ← {folder}. בלי תמונות שומר המסך מציג שעון.",status_bar:"שורת מצב",power_entity:"חיישן צריכת הבית",chip_lights_1:"אור אחד דולק",chip_lights_n:"{n} אורות דולקים",chip_open_1:"משהו פתוח",chip_open_n:"{n} פתוחים",chip_unlocked_1:"לא נעול",chip_unlocked_n:"{n} לא נעולים",chip_climate_1:"מזגן {temp}",chip_climate_n:"{n} מזגנים פועלים",chip_motion:"תנועה",chip_alert:"התראה",chip_t_lights:"אורות",chip_t_open:"דלתות וחלונות",chip_t_unlocked:"מנעולים",chip_t_climate:"מזגנים",chip_t_motion:"תנועה",chip_t_power:"חשמל",chip_t_alert:"התראות",turn_all_off:"כבה הכל",lock_all:"נעל הכל",greet_morning:"בוקר טוב",greet_afternoon:"צהריים טובים",greet_evening:"ערב טוב",greeting_name:"שם בברכה",greeting_name_hint:"השאירו ריק כדי להשתמש בשם המשתמש המחובר",in_min:"בעוד {n} דק׳",in_hours:"בעוד {n}",prayer:"זמני תפילה",p_fajr:"פג׳ר",p_dhuhr:"ד׳והר",p_asr:"עסר",p_maghrib:"מע׳רב",p_isha:"עישא",morning_summary:"סיכום בוקר",today_weather:"היום",overnight:"בלילה",night_doorbell_1:"הפעמון צלצל פעם אחת",night_doorbell_n:"הפעמון צלצל {n} פעמים",night_door_1:"{name} נפתח פעם אחת",night_door_n:"{name} נפתח {n} פעמים",night_robot:"השואב ניקה",night_quiet:"לילה שקט. אין מה לדווח.",night_unlocked:"{name} לא נעול כרגע",lets_go:"יאללה",health:"בריאות המערכת",h_offline:"מכשירים מנותקים",h_battery:"סוללות חלשות",h_backup:"גיבוי אחרון",h_backup_missing:"אין חיישן גיבוי. הפעילו גיבוי אוטומטי ב-Settings ← System ← Backups.",h_updates:"עדכונים ממתינים",h_system:"השרת",h_disk:"דיסק",h_cpu_temp:"טמפ׳ מעבד",h_memory:"זיכרון",h_tablets:"טאבלטים",h_reload:"טען מחדש",h_charging:"בטעינה",h_not_charging:"לא בטעינה",h_all_good:"הכל תקין",h_days_ago:"לפני {n} ימים",h_robot_parts:"חלקי רובוט להחלפה",h_telegram:"להתראות בטלגרם, העתיקו את ha-config/packages/smartnest_health.yaml לבית הזה.",activate_title:"הפעלת SmartNest",activate_text:"לוח הבקרה הזה צריך מפתח הפעלה לבית הזה.",activate_id:"מזהה התקנה",activate_key:"מפתח הפעלה",activate_btn:"הפעל",activate_bad:"המפתח הזה לא תקף לבית הזה.",activate_ask:"פנו למי שהתקין לכם את הבית החכם כדי להפעיל.",activate_send:"שלחו את המזהה הזה למתקין:",licensed_to:"מורשה ל",copy:"העתק",copied:"הועתק",plan_basic:"בסיסי",plan_pro:"Pro",plan_premium:"Premium",plan_needed:"זמין בחבילת {plan}",plan_label:"חבילה",expires_on:"חידוש עד",expires_soon:"המנוי ל-SmartNest מסתיים בעוד {n} ימים. פנו למתקין לחידוש.",expired_title:"המנוי הסתיים",expired_text:"בקשו מהמתקין מפתח הפעלה חדש.",trial_label:"ניסיון",via:"דרך",season:"עיצוב רמדאן וחג",season_auto:"אוטומטי",season_ramadan:"רמדאן",season_eid:"עיד",ramadan_kareem:"רמדאן כרים",eid_mubarak:"עיד מובארכ",timer_off_in:"כבה בעוד",timer_left:"ייכבה {in}",min_short:"{n} דק׳",hour_short:"{n} שע׳",ss_style:"סגנון שומר מסך",ss_classic:"קלאסי",ss_minimal:"מינימלי",ss_analog:"מחוגים",glass_style:"סגנון כרטיסים",glass_classic:"זכוכית חלבית",glass_liquid:"זכוכית נוזלית",guests_mode:"מצב אורחים",guests_wifi:"Wi-Fi לאורחים",wifi_ssid:"שם הרשת",wifi_password:"סיסמה",guests_welcome:"הודעת ברוכים הבאים",welcome_default:"ברוכים הבאים! תרגישו בבית",scan_wifi:"סרקו כדי להתחבר ל-Wi-Fi",plan_3d:"תצוגת 3D",map_temp:"טמפרטורה",map_humidity:"לחות",map_co2:"אוויר (CO₂)",widget_media:"מוזיקה וטלוויזיה",widget_remote:"שלט טלוויזיה",nothing_playing:"שום דבר לא מתנגן",group_speakers:"נגן בכל הבית",cinema_mode:"קולנוע",scene_cinema:"צפייה מהנה",announce:"השמע ברמקולים",speakers:"רמקולים להכרזות",export_config:"ייצוא לוח הבקרה",import_config:"ייבוא לוח בקרה",import_done:"יובא. בדקו ואז הקישו שמירה.",import_bad:"הקובץ הזה אינו לוח בקרה של SmartNest.",transfer:"העברה בין בתים",wizard_title:"הגדרת הבית",wizard_next:"הבא",wizard_finish:"סיום",wizard_pages:"אילו עמודים?",wizard_house:"איזה סוג בית?",house_flat:"דירה",house_villa:"וילה",house_office:"משרד",maintenance:"תחזוקה",m_title:"משימה",m_every:"כל (ימים)",m_done:"בוצע היום",m_due:"מועד",m_in:"בעוד {n} ימים",m_overdue:"באיחור {n} ימים",faults_week:"התנתקו השבוע",times:"{n}×",rate_service:"דרגו את המתקין",rate_thanks:"תודה! המתקין יראה את זה.",rate_comment:"משהו להוסיף?",tv_mode:"טקסט גדול (טלוויזיה)",this_screen:"המסך הזה",opens_on:"נפתח על",about:"אודות",version:"גרסה",none:"ללא",enabled:"פעיל",on:"פועל",off:"כבוי",open:"פתוח",closed:"סגור",opening:"נפתח",closing:"נסגר",locked:"נעול",unlocked:"לא נעול",locking:"ננעל",unlocking:"נפתח",jammed:"תקוע",cleaning:"מנקה",docked:"בעגינה",returning:"חוזר לעגינה",paused:"מושהה",idle:"במנוחה",error:"שגיאה",unavailable:"לא זמין",unknown:"לא ידוע",motion:"תנועה",clear:"אין תנועה",detected:"זוהה",heat:"חימום",cool:"קירור",auto:"אוטומטי",dry:"ייבוש",fan_only:"מאוורר",heat_cool:"חימום/קירור",playing:"מנגן",recording:"מקליט",streaming:"שידור חי",tap_to_run:"הקישו להפעלה",start:"התחל",pause:"השהה",return_home:"חזרה לעגינה",locate:"איתור",lock:"נעילה",unlock:"פתיחת נעילה",unlock_confirm:"לפתוח את נעילת הדלת?",cover_open:"פתח",cover_close:"סגור",stop:"עצור",turn_on:"הדלקה",turn_off:"כיבוי",color:"צבע",white_temp:"לבן",more_colors:"צבעים נוספים",position:"פתיחה",tilt:"הטיה",brightness:"בהירות",target_temp:"מכוון ל",current_temp:"עכשיו",battery:"סוללה",mode:"מצב",last_changed:"שונה",just_now:"עכשיו",min_ago:"לפני {n} דק׳",hours_ago:"לפני {n} שע׳",history_24h:"24 השעות האחרונות",someone_at_door:"מישהו בדלת",dismiss:"התעלם",open_door:"פתח דלת",tagline:"בית חכם. חיים טובים יותר.",assistant:"עוזר",as_hello:"שאל אותי כל דבר על הבית, או אמור לי מה לעשות.",as_s1:"כבה את כל האורות",as_s2:"מה הטמפרטורה בבית?",as_s3:"סגור את התריסים",as_s4:"הדלת נעולה?",as_done:"בוצע.",as_error:"לא הצלחתי. נסה שוב.",as_speak:"דבר",as_placeholder:"כתוב הודעה…",as_send:"שלח",ai_looking:"בודק…",habits_title:"הצעות מההרגלים שלכם",habits_seen:"קרה ידנית ב-{n} מתוך 14 הימים האחרונים",habits_make:"הפוך לאוטומטי",x_title:"מה הבעיה ואיך מתקנים",x_zigbee:"Zigbee: בדרך כלל סוללה ריקה, או רחוק ממכשיר Zigbee מחובר לחשמל",x_mqtt:"MQTT: ודא שהגשר (Zigbee2MQTT) פועל",x_zwave:"Z-Wave: סוללה, או בצע re-interview למכשיר",x_cloud:"מכשיר ענן: בדוק חשמל ו-Wi-Fi, ואז טען מחדש את האינטגרציה (ייתכן שצריך להתחבר מחדש)",x_wifi:"מכשיר Wi-Fi: כנראה מנותק מהחשמל או רחוק מהראוטר",x_generic:"בדוק חשמל וחיבור, ואז טען מחדש את האינטגרציה",x_battery:"החלף סוללה בקרוב",x_ai:"שאל את הבינה המלאכותית",widget_consumers:"מי צורך חשמל עכשיו",widget_water:"מים",template_water:"מים",now:"עכשיו",others:"אחרים",standby:"המתנה",standby_hint:"כבוי, אבל עדיין צורך חשמל. שקע חכם יכול לנתק.",standby_total:"{w} הולכים למכשירים כבויים",water_usage:"מונה מים",water_tank:"מיכל",water_valve:"ברז ראשי",water_leak:"נזילה",water_no_leak:"אין נזילות",water_close:"סגור",water_open:"פתח",water_close_confirm:"הקש שוב לסגירה",bill_budget:"תקציב חודשי",bill_over:"צפוי לחרוג ב-{v}",bill_within:"במסלול",solar_tip:"{kw} שמש עודפת: זמן טוב למכונת הכביסה או לדוד",overload_title:"עומס גבוה: {now} מתוך {max}",overload_hint:"כבה משהו לפני שהמפסק יקפוץ:",power_limit:"מגבלת הספק (וואט)",power_limit_hint:"התראה תוצג אם הבית חורג מזה 20 שניות",replay:"שחזור היום",play:"נגן",all_floors:"כל הקומות",travel:"מצב נסיעה",travel_on:"מצב נסיעה פעיל",travel_off:"מכבה: {x}",travel_off_pick:"מה לכבות ביציאה",travel_arm:"מפעיל את האזעקה",travel_sim:"אורות נדלקים ונכבים בערב, כאילו מישהו בבית",travel_sim_now:"מדמה עכשיו: {x}",travel_report:"דוח לטלפון כל ערב ב-8",travel_start:"אנחנו יוצאים",travel_stop:"חזרנו",travel_bye:"נסיעה טובה! הבית בידיים טובות.",travel_welcome:"ברוכים השבים!",alarm_triggered:"האזעקה הופעלה",alarm_code:"קוד אזעקה",alarm_stop:"עצור את האזעקה",alarm_hide:"הסתר",call_police:"משטרה",emergency:"מספרי חירום",police_number:"מספר משטרה",emergency_contacts:"בני משפחה להתקשר",emergency_hint:"אחד בכל שורה: שם, טלפון. מוצגים כשהאזעקה מופעלת.",chip_t_package:"חבילות",chip_package:"הגיעה חבילה",wx_alert_rain:"גשם בדרך",wx_alert_wind:"רוח חזקה או אבק בדרך",wx_alert_open:"עדיין פתוח: {x}",wx_close_covers:"סגור תריסים",widget_wake:"שעון מעורר באור",wake_minutes:"זריחה {n} דקות",wake_add:"הוסף שעון מעורר",wake_hint:"האור עולה לאט לפני שעת ההשכמה, כמו השמש.",widget_chores:"משימות הילדים",chores_kids:"ילדים",chores_tasks:"משימות",chores_kid_name:"שם",chores_task_name:"משימה (למשל לסדר מיטה)",chores_goal:"כוכבים לפרס (בשבוע)",chores_reward:"פרס",chores_reward_hint:"גלידה ביום שישי",chores_won:"הרווחת את הפרס!",widget_air:"איכות אוויר",air_co2:"CO₂",air_pm25:"אבק",air_voc:"VOC",air_humidity:"לחות",air_level_good:"האוויר נקי",air_level_ok:"האוויר יכול להיות טוב יותר",air_level_bad:"האוויר דורש תשומת לב",air_good:"אין מה לעשות.",air_tip_co2:"פתח חלון ל-10 דקות.",air_tip_pm:"סגור חלונות והפעל מטהר אוויר.",air_tip_voc:"אוורר את החדר: בישול, צבע או חומרי ניקוי.",air_tip_dry:"יבש מדי: מכשיר אדים יעזור.",air_tip_humid:"לח מדי: הפעל מזגן במצב ייבוש, או אוורר.",fx_title:"סצנות נעות",fx_candle:"נר",fx_sunset:"שקיעה",fx_party:"מסיבה",fx_ramadan:"רמדאן",fx_aurora:"זוהר",fx_stop:"עצור",fx_started:"הסצנה פועלת",page_person:"של מי הדף",page_person_all:"לכולם",page_person_hint:"התמונה שלו מופיעה בסרגל; הקשה פותחת את הדף שלו.",support_title:"יש בעיה? כתבו למתקין",support_hint:"שולח וואטסאפ ל-{name} עם מצב הבית, כדי לעזור מהר יותר.",support_placeholder:"מה קורה? (למשל אור המטבח לא מגיב)",support_default:"שלום, אני צריך עזרה עם הבית החכם.",support_send:"שלח בוואטסאפ",installer:"מתקין",installer_name:"שם המתקין",installer_phone:"מספר וואטסאפ",installer_phone_hint:"עם קידומת מדינה, בלי + ורווחים. ללקוח יופיע כפתור 'יש בעיה?'.",report:"דוח חודשי",report_title:"{name} · דוח חודשי",report_devices:"מכשירים",report_offline:"{n} מנותקים עכשיו",report_faults:"התנתקו החודש",report_autos:"{n} פועלות",presets:"ערכות מוכנות",preset_gold:"זהב",preset_sea:"ים",preset_desert:"מדבר",preset_night:"לילה",preset_rose:"ורד",preset_olive:"זית",history:"גרסאות קודמות",history_hint:"כל שמירה שומרת את הגרסה הקודמת. גם שחזור אפשר לבטל.",history_empty:"עדיין אין גרסאות. הן יופיעו אחרי השמירה הבאה.",history_size:"{p} דפים · {w} פריטים",history_restore:"חזור לזו",history_confirm:"להחליף את הדשבורד הנוכחי בגרסה זו בכל המסכים?",history_done:"שוחזר",template_car:"רכב",template_garden:"גינה ובריכה",template_pets:"חיות מחמד",ai_scene_title:"אווירה במילים",ai_scene_hint:"למשל רגוע לסרט",ai_do_it:"בצע",ai_auto_hint:"תאר: כל לילה ב-23 כבה את הסלון",ai_auto_fail:"לא הצלחתי להפוך לאוטומציה. ציין מתי ומה.",ai_cam_btn:"מה קרה בחוץ היום?",ai_cam_quiet:"יום שקט: לא זוהה דבר.",ai_bill_btn:"למה החשבון כזה?",voice_hands_free:"קול ללא מגע",voice_hint:"אמור את מילת ההפעלה (למשל „Okay Nabu”) ודבר. דורש Assist עם מנוע מילת הפעלה, והדשבורד ב-https.",voice_https:"המיקרופון דורש https",voice_mic:"אין גישה למיקרופון",voice_pipeline:"Assist לא מוכן (מנוע מילת הפעלה?)",voice_ready:"מאזין למילת ההפעלה",voice_listening:"מקשיב…",helpers:"עוזרי בית",h_appliances:"מכשיר סיים",h_appliances_hint:"בחר את מדי הצריכה של מכונת הכביסה, המייבש או המדיח. בסיום, כל המסכים והרמקולים יודיעו.",h_night_path:"שביל לילה",h_night_path_hint:"בחר חיישני תנועה ואורות: בלילה תנועה תדליק אותם בעמעום ל-3 דקות.",h_arrival:"בדרך הביתה",h_arrival_hint:"בחר מזגנים ואורות: כשמישהו בדרך הביתה וקרוב, המזגן נדלק (והאורות בחושך).",h_arrival_missing:"דורש את אינטגרציית Proximity ב-Home Assistant.",h_arrival_km:'התחל כשקרוב מ-(ק"מ)',h_outage:"הפסקת חשמל",h_outage_hint:"בחר את חיישן הרשת, ואז מה לכבות כשהיא נופלת.",h_outage_sensor:"חיישן רשת",from:"מ-",to:"עד",chip_outage:"הפסקת חשמל",chip_running:"{name} פועלת",chip_arriving:"{name} בבית בעוד ~{n} דק'",widget_boiler:"דוד מים",boiler_ready_in:"מחמם · מוכן בעוד {n} דק'",boiler_off_in:"חם · ייכבה בעוד {n} דק'",boiler_hot:"פועל",boiler_next:"מים חמים עד {at}",boiler_for:"{n} דק'",boiler_plan:"מתחיל {n} דק' לפני",boiler_want:"מים חמים עד",widget_irrigation:"השקיית גינה",irr_running:"משקה עכשיו",irr_next:"ב-{at} ל-{n} דק'",irr_skip_rain:"דלג כשצפוי גשם",irr_skipped:"{date}: דילגנו, צפוי גשם",irr_watered:"{date}: הושקה",irr_now:"השקה 10 דק' עכשיו",minutes:"דק'",codes_title:"קודים לאורחים",codes_new:"קוד חדש",codes_who:"למי (למשל המנקה)",codes_from:"מתחיל",codes_4h:"4 שעות",codes_day:"יום",codes_3days:"3 ימים",codes_week:"שבוע",codes_auto:"קוד (ריק = 6 ספרות אקראיות)",codes_make:"צור קוד",codes_live:"פעיל",codes_later:"מתחיל מאוחר יותר",codes_share:"שלח",codes_full:"כל המקומות לאורחים במנעול תפוסים",codes_need_zwave:"קודים לאורחים נכתבים למנעולי Z-Wave עם מקלדת.",codes_message:"שלום {name} 👋\nהקוד שלך ל{lock}: {code}\nמ-{from}\nעד {until}",widget_timeline:"ציר זמן מצלמה",tl_pick:"{n} זיהויים: הקש על נקודה לצפייה",tl_none:"לא זוהה דבר",fr_person:"אדם",fr_car:"רכב",fr_dog:"כלב",fr_cat:"חתול",fr_package:"חבילה",widget_internet:"אינטרנט לילדים",net_on:"מחובר",net_off:"מנותק",net_paused_for:"מושהה · חוזר בעוד {n} דק'",net_stop:"עצור",net_allow:"אפשר",net_hour:"שעה בלי",net_bedtime:"שעת שינה",net_wake:"בוקר",net_no_router:"לא נמצאו מתגי נתב. הוסף את אינטגרציית הנתב.",net_ask_installer:"בקש מהמתקין להגדיר.",face_hello:"שלום {name}",widget_board:"לוח המשפחה",board_write:"כתוב",board_draw:"צייר",board_stick:"הדבק",board_placeholder:"חוזר ב-6, האוכל במקרר…",board_empty:"הלוח ריק. כתבו פתק או ציירו משהו.",widget_verse:"פסוק היום",widget_radar:'מכ"ם גשם',widget_commute:"בדרך",commute_missing:"הוסף את אינטגרציית Waze Travel Time והמסלולים יופיעו כאן.",widget_parcels:"חבילות",parcels_missing:"הוסף את אינטגרציית 17TRACK כדי לעקוב אחרי חבילות.",parcels_none:"אין חבילות בדרך",photos_from_phone:"תמונות מהטלפון",photos_scan:"סרקו במצלמת הטלפון ובחרו תמונות. הקישור פעיל {n} דקות.",photos_wifi:"הטלפון צריך להיות על ה-Wi-Fi של הבית.",big_text:"טקסט גדול",tour_again:"סיור",tour_skip:"דלג",tour_next:"הבא",tour_done:"הבנתי",tour_tabs:"אלה הדפים שלכם. הקישו, או החליקו ימינה ושמאלה.",tour_chips:"הבית במבט: מה דלוק ומה פתוח. הקישו לראות או לתקן.",tour_plan:"תוכנית הבית. הקישו על מכשיר לשליטה, או על חדר.",tour_modes:"הקשה אחת לכל הבית: יוצאים, חוזרים, שינה, ערב.",tour_tile:"הקישו להדליק או לכבות. לחיצה ארוכה לעוד אפשרויות.",tour_assistant:"כאן שואלים את הבית או מבקשים ממנו.",tour_logo:"הגדרות המסך ועזרה נמצאות מאחורי הלוגו.",tou:"שעות זולות",tou_cheap:"זול",tou_peak:"שיא",tou_later:"הפעל ב-{at} (זול יותר)",tou_scheduled:"יופעל ב-{at}",chip_peak:"שעות שיא ⚡",chip_cheap:"החשמל זול עכשיו",challenge_won:"{n}% פחות מהחודש שעבר",challenge_hint:"אתגר משפחתי: פחות מהחודש שעבר",refill_phone:"וואטסאפ של הספק (למילוי)",refill_hint:'כשהרמה נמוכה, יופיע כפתור "הזמן מילוי".',refill_order:"הזמן מילוי",refill_message:"שלום, אנחנו צריכים מילוי {what} עבור {home}. תודה!",heartbeat_url:"קישור דופק",heartbeat_hint:"מדף הרישיונות שלך. הבית מדווח פעמיים ביום: פעיל, כמה מכשירים מנותקים, איזו גרסה.",bat_title:"סוללות שעומדות להיגמר",bat_days:"בעוד ~{n} ימים",bat_year:"יותר משנה",bat_none:"אין סוללה שמתרוקנת מהר",war_title:"אחריות",war_until:"עד {date}",war_over:"הסתיימה",war_what:"מכשיר (למשל מזגן הסלון)",war_months:"{n} חודשים",war_invoice:"תמונת חשבונית",showroom:"מצב תצוגה",showroom_hint:"המסך מציג בית לדוגמה במקום הבית הזה, לחנות. מכבים מכאן.",style:"מראה",style_classic:"קלאסי",style_pro:"SmartNest 2.0",style_hint:"2.0: זכוכית עמוקה עם אור שעוקב אחרי האצבע, צבע האורות ברקע, גרעיניות ואייקונים דו-גוניים.",material_none:"חלק",material_marble:"שיש",material_wood:"עץ",material_sand:"חול",material_olive:"זית",night_midnight:"חצות בלילה (שחור מלא, רק מה שדולק זוהר)",theme_midnight:"חצות"}},Lt=[{id:"ar",label:"العربية"},{id:"en",label:"English"},{id:"he",label:"עברית"}],Vt=t=>"en"!==t;function St(t){const e=Ht[t]??At;return(t,i)=>{let s=e[t]??At[t]??t;if(i)for(const[e,a]of Object.entries(i))s=s.replace(`{${e}}`,String(a));return s}}function zt(t){return t in At}const Dt={ar:"ar-u-nu-latn",en:"en-GB",he:"he"};var Ot="M12 5.69L17 10.19V18H15V12H9V18H7V10.19L12 5.69M12 3L2 12H5V20H11V14H13V20H19V12H22",jt="M12,2A7,7 0 0,1 19,9C19,11.38 17.81,13.47 16,14.74V17A1,1 0 0,1 15,18H9A1,1 0 0,1 8,17V14.74C6.19,13.47 5,11.38 5,9A7,7 0 0,1 12,2M9,21V20H15V21A1,1 0 0,1 14,22H10A1,1 0 0,1 9,21M12,4A5,5 0 0,0 7,9C7,11.05 8.23,12.81 10,13.58V16H14V13.58C15.77,12.81 17,11.05 17,9A5,5 0 0,0 12,4Z",Tt="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z",Pt="M14.83,11.17C16.39,12.73 16.39,15.27 14.83,16.83C13.27,18.39 10.73,18.39 9.17,16.83L14.83,11.17M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2M7,4A1,1 0 0,0 6,5A1,1 0 0,0 7,6A1,1 0 0,0 8,5A1,1 0 0,0 7,4M10,4A1,1 0 0,0 9,5A1,1 0 0,0 10,6A1,1 0 0,0 11,5A1,1 0 0,0 10,4M12,8A6,6 0 0,0 6,14A6,6 0 0,0 12,20A6,6 0 0,0 18,14A6,6 0 0,0 12,8Z",Nt="M10 3.25C10 3.25 16 10 16 14C16 17.31 13.31 20 10 20S4 17.31 4 14C4 10 10 3.25 10 3.25M20 7V13H18V7H20M18 17H20V15H18V17Z",It="M10 3.25C10 3.25 4 10 4 14C4 17.31 6.69 20 10 20S16 17.31 16 14C16 10 10 3.25 10 3.25M10 18C7.79 18 6 16.21 6 14C6 12.23 8 8.96 10 6.39C12 8.95 14 12.23 14 14C14 16.21 12.21 18 10 18M20 7V13H18V7H20M18 17H20V15H18V17Z",Wt="M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z",Et="M9,12C9.53,12.14 9.85,12.69 9.71,13.22L8.41,18.05C8.27,18.59 7.72,18.9 7.19,18.76C6.65,18.62 6.34,18.07 6.5,17.54L7.78,12.71C7.92,12.17 8.47,11.86 9,12M13,12C13.53,12.14 13.85,12.69 13.71,13.22L11.64,20.95C11.5,21.5 10.95,21.8 10.41,21.66C9.88,21.5 9.56,20.97 9.7,20.43L11.78,12.71C11.92,12.17 12.47,11.86 13,12M17,12C17.53,12.14 17.85,12.69 17.71,13.22L16.41,18.05C16.27,18.59 15.72,18.9 15.19,18.76C14.65,18.62 14.34,18.07 14.5,17.54L15.78,12.71C15.92,12.17 16.47,11.86 17,12M17,10V9A5,5 0 0,0 12,4C9.5,4 7.45,5.82 7.06,8.19C6.73,8.07 6.37,8 6,8A3,3 0 0,0 3,11C3,12.11 3.6,13.08 4.5,13.6V13.59C5,13.87 5.14,14.5 4.87,14.96C4.59,15.43 4,15.6 3.5,15.32V15.33C2,14.47 1,12.85 1,11A5,5 0 0,1 6,6C7,3.65 9.3,2 12,2C15.43,2 18.24,4.66 18.5,8.03L19,8A4,4 0 0,1 23,12C23,13.5 22.2,14.77 21,15.46V15.46C20.5,15.73 19.91,15.57 19.63,15.09C19.36,14.61 19.5,14 20,13.72V13.73C20.6,13.39 21,12.74 21,12A2,2 0 0,0 19,10H17Z",Rt="M4,10A1,1 0 0,1 3,9A1,1 0 0,1 4,8H12A2,2 0 0,0 14,6A2,2 0 0,0 12,4C11.45,4 10.95,4.22 10.59,4.59C10.2,5 9.56,5 9.17,4.59C8.78,4.2 8.78,3.56 9.17,3.17C9.9,2.45 10.9,2 12,2A4,4 0 0,1 16,6A4,4 0 0,1 12,10H4M19,12A1,1 0 0,0 20,11A1,1 0 0,0 19,10C18.72,10 18.47,10.11 18.29,10.29C17.9,10.68 17.27,10.68 16.88,10.29C16.5,9.9 16.5,9.27 16.88,8.88C17.42,8.34 18.17,8 19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14H5A1,1 0 0,1 4,13A1,1 0 0,1 5,12H19M18,18H4A1,1 0 0,1 3,17A1,1 0 0,1 4,16H18A3,3 0 0,1 21,19A3,3 0 0,1 18,22C17.17,22 16.42,21.66 15.88,21.12C15.5,20.73 15.5,20.1 15.88,19.71C16.27,19.32 16.9,19.32 17.29,19.71C17.47,19.89 17.72,20 18,20A1,1 0 0,0 19,19A1,1 0 0,0 18,18Z";const Bt={"air-conditioner":"M6.59,0.66C8.93,-1.15 11.47,1.06 12.04,4.5C12.47,4.5 12.89,4.62 13.27,4.84C13.79,4.24 14.25,3.42 14.07,2.5C13.65,0.35 16.06,-1.39 18.35,1.58C20.16,3.92 17.95,6.46 14.5,7.03C14.5,7.46 14.39,7.89 14.16,8.27C14.76,8.78 15.58,9.24 16.5,9.06C18.63,8.64 20.38,11.04 17.41,13.34C15.07,15.15 12.53,12.94 11.96,9.5C11.53,9.5 11.11,9.37 10.74,9.15C10.22,9.75 9.75,10.58 9.93,11.5C10.35,13.64 7.94,15.39 5.65,12.42C3.83,10.07 6.05,7.53 9.5,6.97C9.5,6.54 9.63,6.12 9.85,5.74C9.25,5.23 8.43,4.76 7.5,4.94C5.37,5.36 3.62,2.96 6.59,0.66M5,16H7A2,2 0 0,1 9,18V24H7V22H5V24H3V18A2,2 0 0,1 5,16M5,18V20H7V18H5M12.93,16H15L12.07,24H10L12.93,16M18,16H21V18H18V22H21V24H18A2,2 0 0,1 16,22V18A2,2 0 0,1 18,16Z","alert-circle-outline":"M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z","arrow-left":"M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z","arrow-right":"M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z",bell:"M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21","bell-ring":"M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21M19.75,3.19L18.33,4.61C20.04,6.3 21,8.6 21,11H23C23,8.07 21.84,5.25 19.75,3.19M1,11H3C3,8.6 3.96,6.3 5.67,4.61L4.25,3.19C2.16,5.25 1,8.07 1,11Z",blinds:"M20 19V3H4V19H2V21H22V19H20M16 9H18V11H16V9M14 11H6V9H14V11M18 7H16V5H18V7M14 5V7H6V5H14M6 19V13H14V14.82C13.55 15.14 13.25 15.66 13.25 16.25C13.25 17.22 14.03 18 15 18S16.75 17.22 16.75 16.25C16.75 15.66 16.45 15.13 16 14.82V13H18V19H6Z","blinds-closed":"M20 19V3H4V19H2V21H13.25C13.25 21.97 14.03 22.75 15 22.75S16.75 21.97 16.75 21H22V19H20M18 11H16V9H18V11M14 11H6V9H14V11M14 13V15H6V13H14M16 13H18V15H16V13M18 7H16V5H18V7M14 5V7H6V5H14M6 19V17H14V19H6M16 19V17H18V19H16Z",camera:"M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z",cctv:"M6.03 12.03L8.03 15.5L5.5 18.68L2 12.62L6.03 12.03M17 18V15.29C17.88 14.9 18.5 14.03 18.5 13C18.5 12.43 18.3 11.9 17.97 11.5L19.94 10.35C20.95 9.76 21.3 8.47 20.71 7.46L19.33 5.06C18.74 4.05 17.45 3.7 16.44 4.28L8.31 9C7.36 9.53 7.03 10.75 7.58 11.71L9.08 14.31C9.63 15.26 10.86 15.59 11.81 15.04L13.69 13.96C13.94 14.55 14.41 15.03 15 15.29V18C15 19.1 15.9 20 17 20H22V18H17Z",check:"M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z","chevron-down":"M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z","chevron-up":"M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z","clock-outline":"M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z",close:"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",cog:"M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z",curtains:"M23 3H1V1H23V3M2 22H6C6 19 4 17 4 17C10 13 11 4 11 4H2V22M22 4H13C13 4 14 13 20 17C20 17 18 19 18 22H22V4Z",delete:"M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z",doorbell:"M12 10C10.9 10 10 10.9 10 12S10.9 14 12 14 14 13.1 14 12 13.1 10 12 10M16 2H8C6.9 2 6 2.9 6 4V20C6 21.1 6.9 22 8 22H16C17.1 22 18 21.1 18 20V4C18 2.9 17.1 2 16 2M16 20H8V4H16V20Z","door-closed":"M16,11H18V13H16V11M12,3H19C20.11,3 21,3.89 21,5V19H22V21H2V19H10V5C10,3.89 10.89,3 12,3M12,5V19H19V5H12Z","door-open":"M12,3C10.89,3 10,3.89 10,5H3V19H2V21H22V19H21V5C21,3.89 20.11,3 19,3H12M12,5H19V19H12V5M5,11H7V13H5V11Z",grid:"M12 16C13.1 16 14 16.9 14 18S13.1 20 12 20 10 19.1 10 18 10.9 16 12 16M12 10C13.1 10 14 10.9 14 12S13.1 14 12 14 10 13.1 10 12 10.9 10 12 10M12 4C13.1 4 14 4.9 14 6S13.1 8 12 8 10 7.1 10 6 10.9 4 12 4M6 16C7.1 16 8 16.9 8 18S7.1 20 6 20 4 19.1 4 18 4.9 16 6 16M6 10C7.1 10 8 10.9 8 12S7.1 14 6 14 4 13.1 4 12 4.9 10 6 10M6 4C7.1 4 8 4.9 8 6S7.1 8 6 8 4 7.1 4 6 4.9 4 6 4M18 16C19.1 16 20 16.9 20 18S19.1 20 18 20 16 19.1 16 18 16.9 16 18 16M18 10C19.1 10 20 10.9 20 12S19.1 14 18 14 16 13.1 16 12 16.9 10 18 10M18 4C19.1 4 20 4.9 20 6S19.1 8 18 8 16 7.1 16 6 16.9 4 18 4Z",drag:"M7,19V17H9V19H7M11,19V17H13V19H11M15,19V17H17V19H15M7,15V13H9V15H7M11,15V13H13V15H11M15,15V13H17V15H15M7,11V9H9V11H7M11,11V9H13V11H11M15,11V9H17V11H15M7,7V5H9V7H7M11,7V5H13V7H11M15,7V5H17V7H15Z",fan:"M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z","fan-off":"M12.5,2C9.64,2 8.57,4.55 9.29,7.47L15,13.16C15.87,13.37 16.81,13.81 17.28,14.73C18.46,17.1 22.03,17 22.03,12.5C22.03,8.92 18.05,8.13 14.35,10.13C14.03,9.73 13.61,9.42 13.13,9.22C13.32,8.29 13.76,7.24 14.75,6.75C17.11,5.57 17,2 12.5,2M3.28,4L2,5.27L4.47,7.73C3.22,7.74 2,8.87 2,11.5C2,15.07 5.96,15.85 9.65,13.87C9.97,14.27 10.4,14.59 10.89,14.79C10.69,15.71 10.25,16.75 9.27,17.24C6.91,18.42 7,22 11.5,22C13.8,22 14.94,20.36 14.94,18.21L18.73,22L20,20.72L3.28,4Z",fire:"M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z",flash:"M7,2V13H10V22L17,10H13L17,2H7Z",title:"M5,4V7H10.5V19H13.5V7H19V4H5Z",garage:"M19,20H17V11H7V20H5V9L12,5L19,9V20M8,12H16V14H8V12M8,15H16V17H8V15M16,18V20H8V18H16Z","garage-open":"M19,20H17V11H7V20H5V9L12,5L19,9V20M8,12H16V14H8V12Z",home:"M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z","home-outline":Ot,"image-plus":"M18 15V18H15V20H18V23H20V20H23V18H20V15H18M13.3 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5V13.3C20.4 13.1 19.7 13 19 13C17.9 13 16.8 13.3 15.9 13.9L14.5 12L11 16.5L8.5 13.5L5 18H13.1C13 18.3 13 18.7 13 19C13 19.7 13.1 20.4 13.3 21Z",image:"M19,19H5V5H19M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M13.96,12.29L11.21,15.83L9.25,13.47L6.5,17H17.5L13.96,12.29Z",layers:"M12,16L19.36,10.27L21,9L12,2L3,9L4.63,10.27M12,18.54L4.62,12.81L3,14.07L12,21.07L21,14.07L19.37,12.8L12,18.54Z",lightbulb:"M12,2A7,7 0 0,0 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H15A1,1 0 0,0 16,17V14.74C17.81,13.47 19,11.38 19,9A7,7 0 0,0 12,2M9,21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9V21Z","lightbulb-outline":jt,"lightning-bolt":"M11 15H6L13 1V9H18L11 23V15Z",lock:"M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z","lock-open":"M18 1C15.24 1 13 3.24 13 6V8H4C2.9 8 2 8.89 2 10V20C2 21.11 2.9 22 4 22H16C17.11 22 18 21.11 18 20V10C18 8.9 17.11 8 16 8H15V6C15 4.34 16.34 3 18 3C19.66 3 21 4.34 21 6V8H23V6C23 3.24 20.76 1 18 1M10 13C11.1 13 12 13.89 12 15C12 16.11 11.11 17 10 17C8.9 17 8 16.11 8 15C8 13.9 8.9 13 10 13Z",magnify:"M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z","marker-plus":"M9,11.5A2.5,2.5 0 0,0 11.5,9A2.5,2.5 0 0,0 9,6.5A2.5,2.5 0 0,0 6.5,9A2.5,2.5 0 0,0 9,11.5M9,2C12.86,2 16,5.13 16,9C16,14.25 9,22 9,22C9,22 2,14.25 2,9A7,7 0 0,1 9,2M15,17H18V14H20V17H23V19H20V22H18V19H15V17Z",minus:"M19,13H5V11H19V13Z","motion-sensor":"M10,0.2C9,0.2 8.2,1 8.2,2C8.2,3 9,3.8 10,3.8C11,3.8 11.8,3 11.8,2C11.8,1 11,0.2 10,0.2M15.67,1A7.33,7.33 0 0,0 23,8.33V7A6,6 0 0,1 17,1H15.67M18.33,1C18.33,3.58 20.42,5.67 23,5.67V4.33C21.16,4.33 19.67,2.84 19.67,1H18.33M21,1A2,2 0 0,0 23,3V1H21M7.92,4.03C7.75,4.03 7.58,4.06 7.42,4.11L2,5.8V11H3.8V7.33L5.91,6.67L2,22H3.8L6.67,13.89L9,17V22H10.8V15.59L8.31,11.05L9.04,8.18L10.12,10H15V8.2H11.38L9.38,4.87C9.08,4.37 8.54,4.03 7.92,4.03Z","motion-sensor-off":"M11.4 8.2H15V10H13.2L11.4 8.2M19.67 1H18.33C18.33 3.58 20.42 5.67 23 5.67V4.33C21.16 4.33 19.67 2.84 19.67 1M21 1C21 2.11 21.9 3 23 3V1H21M17 1H15.67C15.67 5.05 18.95 8.33 23 8.33V7C19.69 7 17 4.31 17 1M10 3.8C11 3.8 11.8 3 11.8 2S11 .2 10 .2 8.2 1 8.2 2 9 3.8 10 3.8M2.39 1.73L1.11 3L3.46 5.35L2 5.8V11H3.8V7.33L5.05 6.94L5.68 7.57L2 22H3.8L6.67 13.89L9 17V22H10.8V15.59L8.31 11.05L8.5 10.37L20.84 22.73L22.11 21.46L2.39 1.73M9.38 4.87C9.08 4.37 8.54 4.03 7.92 4.03C7.75 4.03 7.58 4.06 7.42 4.11L7.34 4.14L11.35 8.15L9.38 4.87Z",palette:"M17.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,9A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 17.5,12M14.5,8A1.5,1.5 0 0,1 13,6.5A1.5,1.5 0 0,1 14.5,5A1.5,1.5 0 0,1 16,6.5A1.5,1.5 0 0,1 14.5,8M9.5,8A1.5,1.5 0 0,1 8,6.5A1.5,1.5 0 0,1 9.5,5A1.5,1.5 0 0,1 11,6.5A1.5,1.5 0 0,1 9.5,8M6.5,12A1.5,1.5 0 0,1 5,10.5A1.5,1.5 0 0,1 6.5,9A1.5,1.5 0 0,1 8,10.5A1.5,1.5 0 0,1 6.5,12M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A1.5,1.5 0 0,0 13.5,19.5C13.5,19.11 13.35,18.76 13.11,18.5C12.88,18.23 12.73,17.88 12.73,17.5A1.5,1.5 0 0,1 14.23,16H16A5,5 0 0,0 21,11C21,6.58 16.97,3 12,3Z",pause:"M14,19H18V5H14M6,19H10V5H6V19Z",pencil:"M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z",play:"M8,5.14V19.14L19,12.14L8,5.14Z",plus:"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z","power-plug":"M16,7V3H14V7H10V3H8V7H8C7,7 6,8 6,9V14.5L9.5,18V21H14.5V18L18,14.5V9C18,8 17,7 16,7Z","power-plug-off":"M20.84 22.73L15.31 17.2L14.5 18V21H9.5V18L6 14.5V9C6 8.7 6.1 8.41 6.25 8.14L1.11 3L2.39 1.73L22.11 21.46L20.84 22.73M18 14.5V9C18 8 17 7 16 7V3H14V7H10.2L17.85 14.65L18 14.5M10 3H8V4.8L10 6.8V3Z",power:"M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13",resize:"M10.59,12L14.59,8H11V6H18V13H16V9.41L12,13.41V16H20V4H8V12H10.59M22,2V18H12V22H2V12H6V2H22M10,14H4V20H10V14Z","robot-vacuum":"M12,2C14.65,2 17.19,3.06 19.07,4.93L17.65,6.35C16.15,4.85 14.12,4 12,4C9.88,4 7.84,4.84 6.35,6.35L4.93,4.93C6.81,3.06 9.35,2 12,2M3.66,6.5L5.11,7.94C4.39,9.17 4,10.57 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,10.57 19.61,9.17 18.88,7.94L20.34,6.5C21.42,8.12 22,10.04 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12C2,10.04 2.58,8.12 3.66,6.5M12,6A6,6 0 0,1 18,12C18,13.59 17.37,15.12 16.24,16.24L14.83,14.83C14.08,15.58 13.06,16 12,16C10.94,16 9.92,15.58 9.17,14.83L7.76,16.24C6.63,15.12 6,13.59 6,12A6,6 0 0,1 12,6M12,8A1,1 0 0,0 11,9A1,1 0 0,0 12,10A1,1 0 0,0 13,9A1,1 0 0,0 12,8Z","shield-home":"M11,13H13V16H16V11H18L12,6L6,11H8V16H11V13M12,1L21,5V11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1Z",snowflake:"M20.79,13.95L18.46,14.57L16.46,13.44V10.56L18.46,9.43L20.79,10.05L21.31,8.12L19.54,7.65L20,5.88L18.07,5.36L17.45,7.69L15.45,8.82L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L15.5,15.17L17.5,16.3L18.12,18.63L20,18.12L19.53,16.35L21.3,15.88L20.79,13.95M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44V10.56Z",sofa:"M12.5 7C12.5 5.89 13.39 5 14.5 5H18C19.1 5 20 5.9 20 7V9.16C18.84 9.57 18 10.67 18 11.97V14H12.5V7M6 11.96V14H11.5V7C11.5 5.89 10.61 5 9.5 5H6C4.9 5 4 5.9 4 7V9.15C5.16 9.56 6 10.67 6 11.96M20.66 10.03C19.68 10.19 19 11.12 19 12.12V15H5V12C5 10.9 4.11 10 3 10S1 10.9 1 12V17C1 18.1 1.9 19 3 19V21H5V19H19V21H21V19C22.1 19 23 18.1 23 17V12C23 10.79 21.91 9.82 20.66 10.03Z",speaker:"M12,12A3,3 0 0,0 9,15A3,3 0 0,0 12,18A3,3 0 0,0 15,15A3,3 0 0,0 12,12M12,20A5,5 0 0,1 7,15A5,5 0 0,1 12,10A5,5 0 0,1 17,15A5,5 0 0,1 12,20M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8C10.89,8 10,7.1 10,6C10,4.89 10.89,4 12,4M17,2H7C5.89,2 5,2.89 5,4V20A2,2 0 0,0 7,22H17A2,2 0 0,0 19,20V4C19,2.89 18.1,2 17,2Z",stop:"M18,18H6V6H18V18Z",television:"M21,17H3V5H21M21,3H3A2,2 0 0,0 1,5V17A2,2 0 0,0 3,19H8V21H16V19H21A2,2 0 0,0 23,17V5A2,2 0 0,0 21,3Z",thermometer:"M15 13V5A3 3 0 0 0 9 5V13A5 5 0 1 0 15 13M12 4A1 1 0 0 1 13 5V8H11V5A1 1 0 0 1 12 4Z","toggle-on":"M17,7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7M17,15A3,3 0 0,1 14,12A3,3 0 0,1 17,9A3,3 0 0,1 20,12A3,3 0 0,1 17,15Z","toggle-off":"M17,7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7M7,15A3,3 0 0,1 4,12A3,3 0 0,1 7,9A3,3 0 0,1 10,12A3,3 0 0,1 7,15Z",dashboard:"M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z",humidity:"M12,3.25C12,3.25 6,10 6,14C6,17.32 8.69,20 12,20A6,6 0 0,0 18,14C18,10 12,3.25 12,3.25M14.47,9.97L15.53,11.03L9.53,17.03L8.47,15.97M9.75,10A1.25,1.25 0 0,1 11,11.25A1.25,1.25 0 0,1 9.75,12.5A1.25,1.25 0 0,1 8.5,11.25A1.25,1.25 0 0,1 9.75,10M14.25,14.5A1.25,1.25 0 0,1 15.5,15.75A1.25,1.25 0 0,1 14.25,17A1.25,1.25 0 0,1 13,15.75A1.25,1.25 0 0,1 14.25,14.5Z",leak:Nt,"window-closed":"M6,11H10V9H14V11H18V4H6V11M18,13H6V20H18V13M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2Z","window-open":"M6,8H10V6H14V8H18V4H6V8M18,10H6V15H18V10M6,20H18V17H6V20M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2Z",bed:"M19,7H11V14H3V5H1V20H3V17H21V20H23V11A4,4 0 0,0 19,7M7,13A3,3 0 0,0 10,10A3,3 0 0,0 7,7A3,3 0 0,0 4,10A3,3 0 0,0 7,13Z",kitchen:"M11,9H9V2H7V9H5V2H3V9C3,11.12 4.66,12.84 6.75,12.97V22H9.25V12.97C11.34,12.84 13,11.12 13,9V2H11V9M16,6V14H18.5V22H21V2C18.24,2 16,4.24 16,6Z",shower:"M21,14V15C21,16.91 19.93,18.57 18.35,19.41L19,22H17L16.5,20C16.33,20 16.17,20 16,20H8C7.83,20 7.67,20 7.5,20L7,22H5L5.65,19.41C4.07,18.57 3,16.91 3,15V14H2V12H20V5A1,1 0 0,0 19,4C18.5,4 18.12,4.34 18,4.79C18.63,5.33 19,6.13 19,7H13A3,3 0 0,1 16,4C16.06,4 16.11,4 16.17,4C16.58,2.84 17.69,2 19,2A3,3 0 0,1 22,5V14H21V14M19,14H5V15A3,3 0 0,0 8,18H16A3,3 0 0,0 19,15V14Z",garden:"M11,21V16.74C10.53,16.91 10.03,17 9.5,17C7,17 5,15 5,12.5C5,11.23 5.5,10.09 6.36,9.27C6.13,8.73 6,8.13 6,7.5C6,5 8,3 10.5,3C12.06,3 13.44,3.8 14.25,5C14.33,5 14.41,5 14.5,5A5.5,5.5 0 0,1 20,10.5A5.5,5.5 0 0,1 14.5,16C14,16 13.5,15.93 13,15.79V21H11Z",car:"M5,11L6.5,6.5H17.5L19,11M17.5,16A1.5,1.5 0 0,1 16,14.5A1.5,1.5 0 0,1 17.5,13A1.5,1.5 0 0,1 19,14.5A1.5,1.5 0 0,1 17.5,16M6.5,16A1.5,1.5 0 0,1 5,14.5A1.5,1.5 0 0,1 6.5,13A1.5,1.5 0 0,1 8,14.5A1.5,1.5 0 0,1 6.5,16M18.92,6C18.72,5.42 18.16,5 17.5,5H6.5C5.84,5 5.28,5.42 5.08,6L3,12V20A1,1 0 0,0 4,21H5A1,1 0 0,0 6,20V19H18V20A1,1 0 0,0 19,21H20A1,1 0 0,0 21,20V12L18.92,6Z",pool:"M2,15C3.67,14.25 5.33,13.5 7,13.17V5A3,3 0 0,1 10,2C11.31,2 12.42,2.83 12.83,4H10A1,1 0 0,0 9,5V6H14V5A3,3 0 0,1 17,2C18.31,2 19.42,2.83 19.83,4H17A1,1 0 0,0 16,5V14.94C18,14.62 20,13 22,13V15C19.78,15 17.56,17 15.33,17C13.11,17 10.89,15 8.67,15C6.44,15 4.22,16 2,17V15M14,8H9V10H14V8M14,12H9V13C10.67,13.16 12.33,14.31 14,14.79V12M2,19C4.22,18 6.44,17 8.67,17C10.89,17 13.11,19 15.33,19C17.56,19 19.78,17 22,17V19C19.78,19 17.56,21 15.33,21C13.11,21 10.89,19 8.67,19C6.44,19 4.22,20 2,21V19Z",gamepad:"M7,6H17A6,6 0 0,1 23,12A6,6 0 0,1 17,18C15.22,18 13.63,17.23 12.53,16H11.47C10.37,17.23 8.78,18 7,18A6,6 0 0,1 1,12A6,6 0 0,1 7,6M6,9V11H4V13H6V15H8V13H10V11H8V9H6M15.5,12A1.5,1.5 0 0,0 14,13.5A1.5,1.5 0 0,0 15.5,15A1.5,1.5 0 0,0 17,13.5A1.5,1.5 0 0,0 15.5,12M18.5,9A1.5,1.5 0 0,0 17,10.5A1.5,1.5 0 0,0 18.5,12A1.5,1.5 0 0,0 20,10.5A1.5,1.5 0 0,0 18.5,9Z",desk:"M3 6H21C21.55 6 22 6.45 22 7C22 7.55 21.55 8 21 8V19H19V17H15V19H13V8H5V19H3V8C2.45 8 2 7.55 2 7C2 6.45 2.45 6 3 6M16 10.5V11H18V10.5C18 10.22 17.78 10 17.5 10H16.5C16.22 10 16 10.22 16 10.5M16 14.5V15H18V14.5C18 14.22 17.78 14 17.5 14H16.5C16.22 14 16 14.22 16 14.5Z",laundry:Pt,solar:"M11.45,2V5.55L15,3.77L11.45,2M10.45,8L8,10.46L11.75,11.71L10.45,8M2,11.45L3.77,15L5.55,11.45H2M10,2H2V10C2.57,10.17 3.17,10.25 3.77,10.25C7.35,10.26 10.26,7.35 10.27,3.75C10.26,3.16 10.17,2.57 10,2M17,22V16H14L19,7V13H22L17,22Z",battery:"M16 20H8V6H16M16.67 4H15V2H9V4H7.33C6.6 4 6 4.6 6 5.33V20.67C6 21.4 6.6 22 7.33 22H16.67C17.41 22 18 21.41 18 20.67V5.33C18 4.6 17.4 4 16.67 4M15 16H9V19H15V16M15 7H9V10H15V7M15 11.5H9V14.5H15V11.5Z",entrance:"M15 13L11 17V14H2V12H11V9L15 13M5 20V16H7V18H17V10.19L12 5.69L7.21 10H4.22L12 3L22 12H19V20H5Z",locate:"M12,2C15.31,2 18,4.66 18,7.95C18,12.41 12,19 12,19C12,19 6,12.41 6,7.95C6,4.66 8.69,2 12,2M12,6A2,2 0 0,0 10,8A2,2 0 0,0 12,10A2,2 0 0,0 14,8A2,2 0 0,0 12,6M20,19C20,21.21 16.42,23 12,23C7.58,23 4,21.21 4,19C4,17.71 5.22,16.56 7.11,15.83L7.75,16.74C6.67,17.19 6,17.81 6,18.5C6,19.88 8.69,21 12,21C15.31,21 18,19.88 18,18.5C18,17.81 17.33,17.19 16.25,16.74L16.89,15.83C18.78,16.56 20,17.71 20,19Z","play-circle":"M10,16.5V7.5L16,12M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",gauge:"M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12C20,14.4 19,16.5 17.3,18C15.9,16.7 14,16 12,16C10,16 8.2,16.7 6.7,18C5,16.5 4,14.4 4,12A8,8 0 0,1 12,4M14,5.89C13.62,5.9 13.26,6.15 13.1,6.54L11.81,9.77L11.71,10C11,10.13 10.41,10.6 10.14,11.26C9.73,12.29 10.23,13.45 11.26,13.86C12.29,14.27 13.45,13.77 13.86,12.74C14.12,12.08 14,11.32 13.57,10.76L13.67,10.5L14.96,7.29L14.97,7.26C15.17,6.75 14.92,6.17 14.41,5.96C14.28,5.91 14.15,5.89 14,5.89M10,6A1,1 0 0,0 9,7A1,1 0 0,0 10,8A1,1 0 0,0 11,7A1,1 0 0,0 10,6M7,9A1,1 0 0,0 6,10A1,1 0 0,0 7,11A1,1 0 0,0 8,10A1,1 0 0,0 7,9M17,9A1,1 0 0,0 16,10A1,1 0 0,0 17,11A1,1 0 0,0 18,10A1,1 0 0,0 17,9Z",eye:"M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z",night:Wt,crosshairs:"M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M3.05,13H1V11H3.05C3.5,6.83 6.83,3.5 11,3.05V1H13V3.05C17.17,3.5 20.5,6.83 20.95,11H23V13H20.95C20.5,17.17 17.17,20.5 13,20.95V23H11V20.95C6.83,20.5 3.5,17.17 3.05,13M12,5A7,7 0 0,0 5,12A7,7 0 0,0 12,19A7,7 0 0,0 19,12A7,7 0 0,0 12,5Z",backspace:"M19,15.59L17.59,17L14,13.41L10.41,17L9,15.59L12.59,12L9,8.41L10.41,7L14,10.59L17.59,7L19,8.41L15.41,12L19,15.59M22,3A2,2 0 0,1 24,5V19A2,2 0 0,1 22,21H7C6.31,21 5.77,20.64 5.41,20.11L0,12L5.41,3.88C5.77,3.35 6.31,3 7,3H22M22,5H7L2.28,12L7,19H22V5Z",leave:"M24 13L20 17V14H11V12H20V9L24 13M4 20V12H1L11 3L18 9.3V10H15.79L11 5.69L6 10.19V18H16V16H18V20H4Z",lamp:"M15,2L17,9H7L9,2M11,10H13V20H16V22H8V20H11V10Z","check-circle":"M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z",rooms:"M2,2H8V4H16V2H22V8H20V16H22V22H16V20H8V22H2V16H4V8H2V2M16,8V6H8V8H6V16H8V18H16V16H18V8H16M4,4V6H6V4H4M18,4V6H20V4H18M4,18V20H6V18H4M18,18V20H20V18H18Z","auto-fix":"M7.5,5.6L5,7L6.4,4.5L5,2L7.5,3.4L10,2L8.6,4.5L10,7L7.5,5.6M19.5,15.4L22,14L20.6,16.5L22,19L19.5,17.6L17,19L18.4,16.5L17,14L19.5,15.4M22,2L20.6,4.5L22,7L19.5,5.6L17,7L18.4,4.5L17,2L19.5,3.4L22,2M13.34,12.78L15.78,10.34L13.66,8.22L11.22,10.66L13.34,12.78M14.37,7.29L16.71,9.63C17.1,10 17.1,10.65 16.71,11.04L5.04,22.71C4.65,23.1 4,23.1 3.63,22.71L1.29,20.37C0.9,20 0.9,19.35 1.29,18.96L12.96,7.29C13.35,6.9 14,6.9 14.37,7.29Z",undo:"M12.5,8C9.85,8 7.45,9 5.6,10.6L2,7V16H11L7.38,12.38C8.77,11.22 10.54,10.5 12.5,10.5C16.04,10.5 19.05,12.81 20.1,16L22.47,15.22C21.08,11.03 17.15,8 12.5,8Z","w-sunny":"M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.36,17L5.12,13.23C5.26,14 5.53,14.78 5.95,15.5C6.37,16.24 6.91,16.86 7.5,17.37L3.36,17M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M20.64,17L16.5,17.36C17.09,16.85 17.62,16.22 18.04,15.5C18.46,14.77 18.73,14 18.87,13.21L20.64,17M12,22L9.59,18.56C10.33,18.83 11.14,19 12,19C12.82,19 13.63,18.83 14.37,18.56L12,22Z","w-clear-night":Wt,"w-partlycloudy":"M12.74,5.47C15.1,6.5 16.35,9.03 15.92,11.46C17.19,12.56 18,14.19 18,16V16.17C18.31,16.06 18.65,16 19,16A3,3 0 0,1 22,19A3,3 0 0,1 19,22H6A4,4 0 0,1 2,18A4,4 0 0,1 6,14H6.27C5,12.45 4.6,10.24 5.5,8.26C6.72,5.5 9.97,4.24 12.74,5.47M11.93,7.3C10.16,6.5 8.09,7.31 7.31,9.07C6.85,10.09 6.93,11.22 7.41,12.13C8.5,10.83 10.16,10 12,10C12.7,10 13.38,10.12 14,10.34C13.94,9.06 13.18,7.86 11.93,7.3M13.55,3.64C13,3.4 12.45,3.23 11.88,3.12L14.37,1.82L15.27,4.71C14.76,4.29 14.19,3.93 13.55,3.64M6.09,4.44C5.6,4.79 5.17,5.19 4.8,5.63L4.91,2.82L7.87,3.5C7.25,3.71 6.65,4.03 6.09,4.44M18,9.71C17.91,9.12 17.78,8.55 17.59,8L19.97,9.5L17.92,11.73C18.03,11.08 18.05,10.4 18,9.71M3.04,11.3C3.11,11.9 3.24,12.47 3.43,13L1.06,11.5L3.1,9.28C3,9.93 2.97,10.61 3.04,11.3M19,18H16V16A4,4 0 0,0 12,12A4,4 0 0,0 8,16H6A2,2 0 0,0 4,18A2,2 0 0,0 6,20H19A1,1 0 0,0 20,19A1,1 0 0,0 19,18Z","w-partlycloudy-night":"M22,10.28C21.74,10.3 21.5,10.31 21.26,10.31C19.32,10.31 17.39,9.57 15.91,8.09C14.25,6.44 13.5,4.19 13.72,2C13.77,1.53 13.22,1 12.71,1C12.57,1 12.44,1.04 12.32,1.12C12,1.36 11.66,1.64 11.36,1.94C9.05,4.24 8.55,7.66 9.84,10.46C8.31,11.11 7.13,12.43 6.69,14.06L6,14A4,4 0 0,0 2,18A4,4 0 0,0 6,22H19A3,3 0 0,0 22,19A3,3 0 0,0 19,16C18.42,16 17.88,16.16 17.42,16.45L17.5,15.5C17.5,15.28 17.5,15.05 17.46,14.83C19.14,14.67 20.77,13.94 22.06,12.64C22.38,12.34 22.64,12 22.88,11.68C23.27,11.13 22.65,10.28 22.04,10.28M19,18A1,1 0 0,1 20,19A1,1 0 0,1 19,20H6A2,2 0 0,1 4,18A2,2 0 0,1 6,16H8.5V15.5C8.5,13.94 9.53,12.64 10.94,12.18C11.1,12.13 11.26,12.09 11.43,12.06C11.61,12.03 11.8,12 12,12C12.23,12 12.45,12.03 12.66,12.07C12.73,12.08 12.8,12.1 12.87,12.13C13,12.16 13.15,12.2 13.28,12.25C13.36,12.28 13.44,12.32 13.5,12.36C13.63,12.41 13.74,12.47 13.84,12.54C13.92,12.59 14,12.64 14.07,12.7C14.17,12.77 14.25,12.84 14.34,12.92C14.41,13 14.5,13.05 14.55,13.12C14.63,13.2 14.69,13.29 14.76,13.37C14.82,13.45 14.89,13.53 14.94,13.62C15,13.71 15.04,13.8 15.09,13.9C15.14,14 15.2,14.08 15.24,14.18C15.41,14.59 15.5,15.03 15.5,15.5V18M16.83,12.86C15.9,11.16 14.08,10 12,10H11.87C11.41,9.19 11.14,8.26 11.14,7.29C11.14,6.31 11.39,5.37 11.86,4.55C12.21,6.41 13.12,8.14 14.5,9.5C15.86,10.88 17.58,11.79 19.45,12.14C18.66,12.6 17.76,12.84 16.83,12.86Z","w-cloudy":"M6,19A5,5 0 0,1 1,14A5,5 0 0,1 6,9C7,6.65 9.3,5 12,5C15.43,5 18.24,7.66 18.5,11.03L19,11A4,4 0 0,1 23,15A4,4 0 0,1 19,19H6M19,13H17V12A5,5 0 0,0 12,7C9.5,7 7.45,8.82 7.06,11.19C6.73,11.07 6.37,11 6,11A3,3 0 0,0 3,14A3,3 0 0,0 6,17H19A2,2 0 0,0 21,15A2,2 0 0,0 19,13Z","w-rainy":"M6,14.03A1,1 0 0,1 7,15.03C7,15.58 6.55,16.03 6,16.03C3.24,16.03 1,13.79 1,11.03C1,8.27 3.24,6.03 6,6.03C7,3.68 9.3,2.03 12,2.03C15.43,2.03 18.24,4.69 18.5,8.06L19,8.03A4,4 0 0,1 23,12.03C23,14.23 21.21,16.03 19,16.03H18C17.45,16.03 17,15.58 17,15.03C17,14.47 17.45,14.03 18,14.03H19A2,2 0 0,0 21,12.03A2,2 0 0,0 19,10.03H17V9.03C17,6.27 14.76,4.03 12,4.03C9.5,4.03 7.45,5.84 7.06,8.21C6.73,8.09 6.37,8.03 6,8.03A3,3 0 0,0 3,11.03A3,3 0 0,0 6,14.03M12,14.15C12.18,14.39 12.37,14.66 12.56,14.94C13,15.56 14,17.03 14,18C14,19.11 13.1,20 12,20A2,2 0 0,1 10,18C10,17.03 11,15.56 11.44,14.94C11.63,14.66 11.82,14.4 12,14.15M12,11.03L11.5,11.59C11.5,11.59 10.65,12.55 9.79,13.81C8.93,15.06 8,16.56 8,18A4,4 0 0,0 12,22A4,4 0 0,0 16,18C16,16.56 15.07,15.06 14.21,13.81C13.35,12.55 12.5,11.59 12.5,11.59","w-pouring":Et,"w-lightning":"M6,16A5,5 0 0,1 1,11A5,5 0 0,1 6,6C7,3.65 9.3,2 12,2C15.43,2 18.24,4.66 18.5,8.03L19,8A4,4 0 0,1 23,12A4,4 0 0,1 19,16H18A1,1 0 0,1 17,15A1,1 0 0,1 18,14H19A2,2 0 0,0 21,12A2,2 0 0,0 19,10H17V9A5,5 0 0,0 12,4C9.5,4 7.45,5.82 7.06,8.19C6.73,8.07 6.37,8 6,8A3,3 0 0,0 3,11A3,3 0 0,0 6,14H7A1,1 0 0,1 8,15A1,1 0 0,1 7,16H6M12,11H15L13,15H15L11.25,22L12,17H9.5L12,11Z","w-lightning-rainy":"M4.5,13.59C5,13.87 5.14,14.5 4.87,14.96C4.59,15.44 4,15.6 3.5,15.33V15.33C2,14.47 1,12.85 1,11A5,5 0 0,1 6,6C7,3.65 9.3,2 12,2C15.43,2 18.24,4.66 18.5,8.03L19,8A4,4 0 0,1 23,12A4,4 0 0,1 19,16A1,1 0 0,1 18,15A1,1 0 0,1 19,14A2,2 0 0,0 21,12A2,2 0 0,0 19,10H17V9A5,5 0 0,0 12,4C9.5,4 7.45,5.82 7.06,8.19C6.73,8.07 6.37,8 6,8A3,3 0 0,0 3,11C3,12.11 3.6,13.08 4.5,13.6V13.59M9.5,11H12.5L10.5,15H12.5L8.75,22L9.5,17H7L9.5,11M17.5,18.67C17.5,19.96 16.5,21 15.25,21C14,21 13,19.96 13,18.67C13,17.12 15.25,14.5 15.25,14.5C15.25,14.5 17.5,17.12 17.5,18.67Z","w-snowy":"M6,14A1,1 0 0,1 7,15A1,1 0 0,1 6,16A5,5 0 0,1 1,11A5,5 0 0,1 6,6C7,3.65 9.3,2 12,2C15.43,2 18.24,4.66 18.5,8.03L19,8A4,4 0 0,1 23,12A4,4 0 0,1 19,16H18A1,1 0 0,1 17,15A1,1 0 0,1 18,14H19A2,2 0 0,0 21,12A2,2 0 0,0 19,10H17V9A5,5 0 0,0 12,4C9.5,4 7.45,5.82 7.06,8.19C6.73,8.07 6.37,8 6,8A3,3 0 0,0 3,11A3,3 0 0,0 6,14M7.88,18.07L10.07,17.5L8.46,15.88C8.07,15.5 8.07,14.86 8.46,14.46C8.85,14.07 9.5,14.07 9.88,14.46L11.5,16.07L12.07,13.88C12.21,13.34 12.76,13.03 13.29,13.17C13.83,13.31 14.14,13.86 14,14.4L13.41,16.59L15.6,16C16.14,15.86 16.69,16.17 16.83,16.71C16.97,17.24 16.66,17.79 16.12,17.93L13.93,18.5L15.54,20.12C15.93,20.5 15.93,21.15 15.54,21.54C15.15,21.93 14.5,21.93 14.12,21.54L12.5,19.93L11.93,22.12C11.79,22.66 11.24,22.97 10.71,22.83C10.17,22.69 9.86,22.14 10,21.6L10.59,19.41L8.4,20C7.86,20.14 7.31,19.83 7.17,19.29C7.03,18.76 7.34,18.21 7.88,18.07Z","w-fog":"M3,15H13A1,1 0 0,1 14,16A1,1 0 0,1 13,17H3A1,1 0 0,1 2,16A1,1 0 0,1 3,15M16,15H21A1,1 0 0,1 22,16A1,1 0 0,1 21,17H16A1,1 0 0,1 15,16A1,1 0 0,1 16,15M1,12A5,5 0 0,1 6,7C7,4.65 9.3,3 12,3C15.43,3 18.24,5.66 18.5,9.03L19,9C21.19,9 22.97,10.76 23,13H21A2,2 0 0,0 19,11H17V10A5,5 0 0,0 12,5C9.5,5 7.45,6.82 7.06,9.19C6.73,9.07 6.37,9 6,9A3,3 0 0,0 3,12C3,12.35 3.06,12.69 3.17,13H1.1L1,12M3,19H5A1,1 0 0,1 6,20A1,1 0 0,1 5,21H3A1,1 0 0,1 2,20A1,1 0 0,1 3,19M8,19H21A1,1 0 0,1 22,20A1,1 0 0,1 21,21H8A1,1 0 0,1 7,20A1,1 0 0,1 8,19Z","w-windy":Rt,mosque:"M24 7C24 5.9 22 4 22 4S20 5.9 20 7C20 7.7 20.4 8.4 21 8.7V13H19V11C19 10.1 18.3 9.3 17.5 9.1C17.8 8.5 18 7.9 18 7.1C18 5.8 17.4 4.6 16.3 3.9L12 1L7.7 3.8C6.7 4.6 6 5.8 6 7.1C6 7.8 6.2 8.5 6.6 9.1C5.7 9.3 5 10.1 5 11V13H3V8.7C3.6 8.4 4 7.7 4 7C4 5.9 2 4 2 4S0 5.9 0 7C0 7.7 .4 8.4 1 8.7V21H11V17C11 16.5 11.4 16 12 16S13 16.5 13 17V21H23V8.7C23.6 8.4 24 7.7 24 7M8.9 5.5L12 3.4L15.1 5.5C15.7 5.9 16 6.4 16 7.1C16 8.1 15.1 9 14.1 9H9.9C8.9 9 8 8.1 8 7.1C8 6.4 8.3 5.9 8.9 5.5M21 19H15V17C15 15.4 13.6 14 12 14S9 15.4 9 17V19H3V15H7V11H17V15H21V19Z",coffee:"M2,21V19H20V21H2M20,8V5H18V8H20M20,3A2,2 0 0,1 22,5V8A2,2 0 0,1 20,10H18V13A4,4 0 0,1 14,17H8A4,4 0 0,1 4,13V3H20M16,5H6V13A2,2 0 0,0 8,15H14A2,2 0 0,0 16,13V5Z",tower:"M8.28,5.45L6.5,4.55L7.76,2H16.23L17.5,4.55L15.72,5.44L15,4H9L8.28,5.45M18.62,8H14.09L13.3,5H10.7L9.91,8H5.38L4.1,10.55L5.89,11.44L6.62,10H17.38L18.1,11.45L19.89,10.56L18.62,8M17.77,22H15.7L15.46,21.1L12,15.9L8.53,21.1L8.3,22H6.23L9.12,11H11.19L10.83,12.35L12,14.1L13.16,12.35L12.81,11H14.88L17.77,22M11.4,15L10.5,13.65L9.32,18.13L11.4,15M14.68,18.12L13.5,13.64L12.6,15L14.68,18.12Z",family:"M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z",todo:"M3,5H9V11H3V5M5,7V9H7V7H5M11,7H21V9H11V7M11,15H21V17H11V15M5,20L1.5,16.5L2.91,15.09L5,17.17L9.59,12.59L11,14L5,20Z",calendar:"M9,10V12H7V10H9M13,10V12H11V10H13M17,10V12H15V10H17M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H6V1H8V3H16V1H18V3H19M19,19V8H5V19H19M9,14V16H7V14H9M13,14V16H11V14H13M17,14V16H15V14H17Z",countdown:"M6,2H18V8H18V8L14,12L18,16V16H18V22H6V16H6V16L10,12L6,8V8H6V2M16,16.5L12,12.5L8,16.5V20H16V16.5M12,11.5L16,7.5V4H8V7.5L12,11.5M10,6H14V6.75L12,8.75L10,6.75V6Z",message:"M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M6,9H18V11H6M14,14H6V12H14M18,8H6V6H18",child:"M12,2A3,3 0 0,1 15,5A3,3 0 0,1 12,8A3,3 0 0,1 9,5A3,3 0 0,1 12,2M11,22H8V16H6V9H18V16H16V22H13V18H11V22Z","circle-outline":"M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z","circle-check":"M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",send:"M2,21L23,12L2,3V10L17,12L2,14V21Z",person:"M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z",pill:"M4.22,11.29L11.29,4.22C13.64,1.88 17.43,1.88 19.78,4.22C22.12,6.56 22.12,10.36 19.78,12.71L12.71,19.78C10.36,22.12 6.56,22.12 4.22,19.78C1.88,17.43 1.88,13.64 4.22,11.29M5.64,12.71C4.59,13.75 4.24,15.24 4.6,16.57L10.59,10.59L14.83,14.83L18.36,11.29C19.93,9.73 19.93,7.2 18.36,5.64C16.8,4.07 14.27,4.07 12.71,5.64L5.64,12.71Z",gate:"M9 6V11H7V7H5V11H3V9H1V21H3V19H5V21H7V19H9V21H11V19H13V21H15V19H17V21H19V19H21V21H23V9H21V11H19V7H17V11H15V6H13V11H11V6H9M3 13H5V17H3V13M7 13H9V17H7V13M11 13H13V17H11V13M15 13H17V17H15V13M19 13H21V17H19V13Z","gate-open":"M7 21V7H5V11H3V9H1V21H3V19H5V21H7M3 17V13H5V17H3M21 9V11H19V7H17V21H19V19H21V21H23V9H21M21 17H19V13H21V17Z",gas:"M16,9V14L16,20A2,2 0 0,1 14,22H10A2,2 0 0,1 8,20V14L8,9C8,7.14 9.27,5.57 11,5.13V4H9V2H15V4H13V5.13C14.73,5.57 16,7.14 16,9Z",pump:"M19,14.5C19,14.5 21,16.67 21,18A2,2 0 0,1 19,20A2,2 0 0,1 17,18C17,16.67 19,14.5 19,14.5M5,18V9A2,2 0 0,1 3,7A2,2 0 0,1 5,5V4A2,2 0 0,1 7,2H9A2,2 0 0,1 11,4V5H19A2,2 0 0,1 21,7V9L21,11A1,1 0 0,1 22,12A1,1 0 0,1 21,13H17A1,1 0 0,1 16,12A1,1 0 0,1 17,11V9H11V18H12A2,2 0 0,1 14,20V22H2V20A2,2 0 0,1 4,18H5Z",automation:"M22 14H21C21 10.13 17.87 7 14 7H13V5.73C13.6 5.39 14 4.74 14 4C14 2.9 13.11 2 12 2S10 2.9 10 4C10 4.74 10.4 5.39 11 5.73V7H10C6.13 7 3 10.13 3 14H2C1.45 14 1 14.45 1 15V18C1 18.55 1.45 19 2 19H3V20C3 21.11 3.9 22 5 22H19C20.11 22 21 21.11 21 20V19H22C22.55 19 23 18.55 23 18V15C23 14.45 22.55 14 22 14M9.79 16.5C9.4 15.62 8.53 15 7.5 15S5.6 15.62 5.21 16.5C5.08 16.19 5 15.86 5 15.5C5 14.12 6.12 13 7.5 13S10 14.12 10 15.5C10 15.86 9.92 16.19 9.79 16.5M18.79 16.5C18.4 15.62 17.5 15 16.5 15S14.6 15.62 14.21 16.5C14.08 16.19 14 15.86 14 15.5C14 14.12 15.12 13 16.5 13S19 14.12 19 15.5C19 15.86 18.92 16.19 18.79 16.5Z",package:"M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L10.11,5.22L16,8.61L17.96,7.5L12,4.15M6.04,7.5L12,10.85L13.96,9.75L8.08,6.35L6.04,7.5M5,15.91L11,19.29V12.58L5,9.21V15.91M19,15.91V9.21L13,12.58V19.29L19,15.91Z",dog:"M18,4C16.29,4 15.25,4.33 14.65,4.61C13.88,4.23 13,4 12,4C11,4 10.12,4.23 9.35,4.61C8.75,4.33 7.71,4 6,4C3,4 1,12 1,14C1,14.83 2.32,15.59 4.14,15.9C4.78,18.14 7.8,19.85 11.5,20V15.72C10.91,15.35 10,14.68 10,14C10,13 12,13 12,13C12,13 14,13 14,14C14,14.68 13.09,15.35 12.5,15.72V20C16.2,19.85 19.22,18.14 19.86,15.9C21.68,15.59 23,14.83 23,14C23,12 21,4 18,4M4.15,13.87C3.65,13.75 3.26,13.61 3,13.5C3.25,10.73 5.2,6.4 6.05,6C6.59,6 7,6.06 7.37,6.11C5.27,8.42 4.44,12.04 4.15,13.87M9,12A1,1 0 0,1 8,11C8,10.46 8.45,10 9,10A1,1 0 0,1 10,11C10,11.56 9.55,12 9,12M15,12A1,1 0 0,1 14,11C14,10.46 14.45,10 15,10A1,1 0 0,1 16,11C16,11.56 15.55,12 15,12M19.85,13.87C19.56,12.04 18.73,8.42 16.63,6.11C17,6.06 17.41,6 17.95,6C18.8,6.4 20.75,10.73 21,13.5C20.75,13.61 20.36,13.75 19.85,13.87Z",cat:"M12,8L10.67,8.09C9.81,7.07 7.4,4.5 5,4.5C5,4.5 3.03,7.46 4.96,11.41C4.41,12.24 4.07,12.67 4,13.66L2.07,13.95L2.28,14.93L4.04,14.67L4.18,15.38L2.61,16.32L3.08,17.21L4.53,16.32C5.68,18.76 8.59,20 12,20C15.41,20 18.32,18.76 19.47,16.32L20.92,17.21L21.39,16.32L19.82,15.38L19.96,14.67L21.72,14.93L21.93,13.95L20,13.66C19.93,12.67 19.59,12.24 19.04,11.41C20.97,7.46 19,4.5 19,4.5C16.6,4.5 14.19,7.07 13.33,8.09L12,8M9,11A1,1 0 0,1 10,12A1,1 0 0,1 9,13A1,1 0 0,1 8,12A1,1 0 0,1 9,11M15,11A1,1 0 0,1 16,12A1,1 0 0,1 15,13A1,1 0 0,1 14,12A1,1 0 0,1 15,11M11,14H13L12.3,15.39C12.5,16.03 13.06,16.5 13.75,16.5A1.5,1.5 0 0,0 15.25,15H15.75A2,2 0 0,1 13.75,17C13,17 12.35,16.59 12,16V16H12C11.65,16.59 11,17 10.25,17A2,2 0 0,1 8.25,15H8.75A1.5,1.5 0 0,0 10.25,16.5C10.94,16.5 11.5,16.03 11.7,15.39L11,14Z",schedule:"M15,13H16.5V15.82L18.94,17.23L18.19,18.53L15,16.69V13M19,8H5V19H9.67C9.24,18.09 9,17.07 9,16A7,7 0 0,1 16,9C17.07,9 18.09,9.24 19,9.67V8M5,21C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H6V1H8V3H16V1H18V3H19A2,2 0 0,1 21,5V11.1C22.24,12.36 23,14.09 23,16A7,7 0 0,1 16,23C14.09,23 12.36,22.24 11.1,21H5M16,11.15A4.85,4.85 0 0,0 11.15,16C11.15,18.68 13.32,20.85 16,20.85A4.85,4.85 0 0,0 20.85,16C20.85,13.32 18.68,11.15 16,11.15Z",history:"M13.5,8H12V13L16.28,15.54L17,14.33L13.5,12.25V8M13,3A9,9 0 0,0 4,12H1L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3",sun:"M3.55 19.09L4.96 20.5L6.76 18.71L5.34 17.29M12 6C8.69 6 6 8.69 6 12S8.69 18 12 18 18 15.31 18 12C18 8.68 15.31 6 12 6M20 13H23V11H20M17.24 18.71L19.04 20.5L20.45 19.09L18.66 17.29M20.45 5L19.04 3.6L17.24 5.39L18.66 6.81M13 1H11V4H13M6.76 5.39L4.96 3.6L3.55 5L5.34 6.81L6.76 5.39M1 13H4V11H1M13 20H11V23H13",guests:"M15,14C12.3,14 7,15.3 7,18V20H23V18C23,15.3 17.7,14 15,14M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12M5,15L4.4,14.5C2.4,12.6 1,11.4 1,9.9C1,8.7 2,7.7 3.2,7.7C3.9,7.7 4.6,8 5,8.5C5.4,8 6.1,7.7 6.8,7.7C8,7.7 9,8.6 9,9.9C9,11.4 7.6,12.6 5.6,14.5L5,15Z",cube:"M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L6.04,7.5L12,10.85L17.96,7.5L12,4.15Z","humidity-alert":"M20 7V13H18V7H20M18 17H20V15H18V17M10 3.25C10 3.25 4 10 4 14C4 17.32 6.69 20 10 20S16 17.31 16 14C16 10 10 3.25 10 3.25M7.75 10C8.44 10 9 10.56 9 11.25S8.44 12.5 7.75 12.5 6.5 11.94 6.5 11.25 7.06 10 7.75 10M12.25 17C11.56 17 11 16.44 11 15.75S11.56 14.5 12.25 14.5 13.5 15.06 13.5 15.75 12.94 17 12.25 17M7.53 17.03L6.47 15.97L12.47 9.97L13.53 11.03L7.53 17.03Z",co2:"M5,7A2,2 0 0,0 3,9V15A2,2 0 0,0 5,17H8V15H5V9H8V7H5M11,7A2,2 0 0,0 9,9V15A2,2 0 0,0 11,17H13A2,2 0 0,0 15,15V9A2,2 0 0,0 13,7H11M11,9H13V15H11V9M16,10.5V12H19V13.5H17.5A1.5,1.5 0 0,0 16,15V18H20.5V16.5H17.5V15H19A1.5,1.5 0 0,0 20.5,13.5V12A1.5,1.5 0 0,0 19,10.5H16Z",wifi:"M12,21L15.6,16.2C14.6,15.45 13.35,15 12,15C10.65,15 9.4,15.45 8.4,16.2L12,21M12,3C7.95,3 4.21,4.34 1.2,6.6L3,9C5.5,7.12 8.62,6 12,6C15.38,6 18.5,7.12 21,9L22.8,6.6C19.79,4.34 16.05,3 12,3M12,9C9.3,9 6.81,9.89 4.8,11.4L6.6,13.8C8.1,12.67 9.97,12 12,12C14.03,12 15.9,12.67 17.4,13.8L19.2,11.4C17.19,9.89 14.7,9 12,9Z",next:"M16,18H18V6H16M6,18L14.5,12L6,6V18Z",prev:"M6,18V6H8V18H6M9.5,12L18,6V18L9.5,12Z","vol-up":"M3,9H7L12,4V20L7,15H3V9M14,11H17V8H19V11H22V13H19V16H17V13H14V11Z","vol-down":"M3,9H7L12,4V20L7,15H3V9M14,11H22V13H14V11Z","vol-mute":"M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z",volume:"M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z","chevron-left":"M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z","chevron-right":"M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z",ok:"M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",return:"M19,7V11H5.83L9.41,7.41L8,6L2,12L8,18L9.41,16.58L5.83,13H21V7H19Z",movie:"M20.84 2.18L16.91 2.96L19.65 6.5L21.62 6.1L20.84 2.18M13.97 3.54L12 3.93L14.75 7.46L16.71 7.07L13.97 3.54M9.07 4.5L7.1 4.91L9.85 8.44L11.81 8.05L9.07 4.5M4.16 5.5L3.18 5.69A2 2 0 0 0 1.61 8.04L2 10L6.9 9.03L4.16 5.5M2 10V20C2 21.11 2.9 22 4 22H20C21.11 22 22 21.11 22 20V10H2Z",bullhorn:"M12,8H4A2,2 0 0,0 2,10V14A2,2 0 0,0 4,16H5V20A1,1 0 0,0 6,21H8A1,1 0 0,0 9,20V16H12L17,20V4L12,8M21.5,12C21.5,13.71 20.54,15.26 19,16V8C20.53,8.75 21.5,10.3 21.5,12Z",export:"M23,12L19,8V11H10V13H19V16M1,18V6C1,4.89 1.9,4 3,4H15A2,2 0 0,1 17,6V9H15V6H3V18H15V15H17V18A2,2 0 0,1 15,20H3A2,2 0 0,1 1,18Z",import:"M14,12L10,8V11H2V13H10V16M20,18V6C20,4.89 19.1,4 18,4H6A2,2 0 0,0 4,6V9H6V6H18V18H6V15H4V18A2,2 0 0,0 6,20H18A2,2 0 0,0 20,18Z",wrench:"M22.7,19L13.6,9.9C14.5,7.6 14,4.9 12.1,3C10.1,1 7.1,0.6 4.7,1.7L9,6L6,9L1.6,4.7C0.4,7.1 0.9,10.1 2.9,12.1C4.8,14 7.5,14.5 9.8,13.6L18.9,22.7C19.3,23.1 19.9,23.1 20.3,22.7L22.6,20.4C23.1,20 23.1,19.3 22.7,19Z",star:"M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z","star-outline":Tt,"speaker-multi":"M14,10A3,3 0 0,0 11,13A3,3 0 0,0 14,16A3,3 0 0,0 17,13A3,3 0 0,0 14,10M14,18A5,5 0 0,1 9,13A5,5 0 0,1 14,8A5,5 0 0,1 19,13A5,5 0 0,1 14,18M14,2A2,2 0 0,1 16,4A2,2 0 0,1 14,6A2,2 0 0,1 12,4A2,2 0 0,1 14,2M19,0H9A2,2 0 0,0 7,2V18A2,2 0 0,0 9,20H19A2,2 0 0,0 21,18V2A2,2 0 0,0 19,0M5,22H17V24H5A2,2 0 0,1 3,22V4H5",menu:"M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z",assistant:"M19,1L17.74,3.75L15,5L17.74,6.26L19,9L20.25,6.26L23,5L20.25,3.75M9,4L6.5,9.5L1,12L6.5,14.5L9,20L11.5,14.5L17,12L11.5,9.5M19,15L17.74,17.74L15,19L17.74,20.25L19,23L20.25,20.25L23,19L20.25,17.74",microphone:"M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z","lightbulb-auto":"M9 2C12.87 2 16 5.13 16 9C16 11.38 14.81 13.47 13 14.74V17C13 17.55 12.55 18 12 18H6C5.45 18 5 17.55 5 17V14.74C3.19 13.47 2 11.38 2 9C2 5.13 5.13 2 9 2M6 21V20H12V21C12 21.55 11.55 22 11 22H7C6.45 22 6 21.55 6 21M9 4C6.24 4 4 6.24 4 9C4 11.05 5.23 12.81 7 13.58V16H11V13.58C12.77 12.81 14 11.05 14 9C14 6.24 11.76 4 9 4M19 13H17L13.8 22H15.7L16.4 20H19.6L20.3 22H22.2L19 13M16.85 18.65L18 15L19.15 18.65H16.85Z",water:"M12,20A6,6 0 0,1 6,14C6,10 12,3.25 12,3.25C12,3.25 18,10 18,14A6,6 0 0,1 12,20Z","water-alert":Nt,valve:"M4 22H2V2H4M22 2H20V22H22M17.24 5.34L13.24 9.34A3 3 0 0 0 9.24 13.34L5.24 17.34L6.66 18.76L10.66 14.76A3 3 0 0 0 14.66 10.76L18.66 6.76Z",floors:"M12 0L3 7L4.63 8.27L12 14L19.36 8.27L21 7L12 0M19.37 10.73L12 16.47L4.62 10.74L3 12L12 19L21 12L19.37 10.73M19.37 15.73L12 21.47L4.62 15.74L3 17L12 24L21 17L19.37 15.73Z",airplane:"M20.56 3.91C21.15 4.5 21.15 5.45 20.56 6.03L16.67 9.92L18.79 19.11L17.38 20.53L13.5 13.1L9.6 17L9.96 19.47L8.89 20.53L7.13 17.35L3.94 15.58L5 14.5L7.5 14.87L11.37 11L3.94 7.09L5.36 5.68L14.55 7.8L18.44 3.91C19 3.33 20 3.33 20.56 3.91Z","alarm-light":"M6,6.9L3.87,4.78L5.28,3.37L7.4,5.5L6,6.9M13,1V4H11V1H13M20.13,4.78L18,6.9L16.6,5.5L18.72,3.37L20.13,4.78M4.5,10.5V12.5H1.5V10.5H4.5M19.5,10.5H22.5V12.5H19.5V10.5M6,20H18A2,2 0 0,1 20,22H4A2,2 0 0,1 6,20M12,5A6,6 0 0,1 18,11V19H6V11A6,6 0 0,1 12,5Z",phone:"M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z","shield-off":"M1,4.27L3,6.27V11C3,16.55 6.84,21.74 12,23C13.87,22.54 15.57,21.56 16.97,20.24L19.23,22.5L20.5,21.22L2.28,3L1,4.27M12,21C8.25,20 5,15.54 5,11.22V8.27L15.59,18.86C14.53,19.89 13.3,20.65 12,21M21,5V11C21,13.28 20.35,15.5 19.23,17.4L17.77,15.95C18.54,14.5 19,12.84 19,11.22V6.3L12,3.18L7.16,5.34L5.65,3.82L12,1L21,5Z","weather-windy":Rt,"weather-pouring":Et,"weather-sunset-up":"M3,12H7A5,5 0 0,1 12,7A5,5 0 0,1 17,12H21A1,1 0 0,1 22,13A1,1 0 0,1 21,14H3A1,1 0 0,1 2,13A1,1 0 0,1 3,12M15,12A3,3 0 0,0 12,9A3,3 0 0,0 9,12H15M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M12.71,16.3L15.82,19.41C16.21,19.8 16.21,20.43 15.82,20.82C15.43,21.21 14.8,21.21 14.41,20.82L12,18.41L9.59,20.82C9.2,21.21 8.57,21.21 8.18,20.82C7.79,20.43 7.79,19.8 8.18,19.41L11.29,16.3C11.5,16.1 11.74,16 12,16C12.26,16 12.5,16.1 12.71,16.3Z","air-filter":"M19,18.31V20A2,2 0 0,1 17,22H7A2,2 0 0,1 5,20V16.3C4.54,16.12 3.95,16 3,16A1,1 0 0,1 2,15A1,1 0 0,1 3,14C3.82,14 4.47,14.08 5,14.21V12.3C4.54,12.12 3.95,12 3,12A1,1 0 0,1 2,11A1,1 0 0,1 3,10C3.82,10 4.47,10.08 5,10.21V8.3C4.54,8.12 3.95,8 3,8A1,1 0 0,1 2,7A1,1 0 0,1 3,6C3.82,6 4.47,6.08 5,6.21V4A2,2 0 0,1 7,2H17A2,2 0 0,1 19,4V6.16C20.78,6.47 21.54,7.13 21.71,7.29C22.1,7.68 22.1,8.32 21.71,8.71C21.32,9.1 20.8,9.09 20.29,8.71V8.71C20.29,8.71 19.25,8 17,8C15.74,8 14.91,8.41 13.95,8.9C12.91,9.41 11.74,10 10,10C9.64,10 9.31,10 9,9.96V7.95C9.3,8 9.63,8 10,8C11.26,8 12.09,7.59 13.05,7.11C14.09,6.59 15.27,6 17,6V4H7V20H17V18C18.5,18 18.97,18.29 19,18.31M17,10C15.27,10 14.09,10.59 13.05,11.11C12.09,11.59 11.26,12 10,12C9.63,12 9.3,12 9,11.95V13.96C9.31,14 9.64,14 10,14C11.74,14 12.91,13.41 13.95,12.9C14.91,12.42 15.74,12 17,12C19.25,12 20.29,12.71 20.29,12.71V12.71C20.8,13.1 21.32,13.1 21.71,12.71C22.1,12.32 22.1,11.69 21.71,11.29C21.5,11.08 20.25,10 17,10M17,14C15.27,14 14.09,14.59 13.05,15.11C12.09,15.59 11.26,16 10,16C9.63,16 9.3,16 9,15.95V17.96C9.31,18 9.64,18 10,18C11.74,18 12.91,17.41 13.95,16.9C14.91,16.42 15.74,16 17,16C19.25,16 20.29,16.71 20.29,16.71V16.71C20.8,17.1 21.32,17.1 21.71,16.71C22.1,16.32 22.1,15.69 21.71,15.29C21.5,15.08 20.25,14 17,14Z",leaf:"M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z","air-purifier":"M11,9A4,4 0 0,1 15,13A4,4 0 0,1 11,17A4,4 0 0,1 7,13A4,4 0 0,1 11,9M11,11A2,2 0 0,0 9,13A2,2 0 0,0 11,15A2,2 0 0,0 13,13A2,2 0 0,0 11,11M7,4H14A4,4 0 0,1 18,8V9H16V8A2,2 0 0,0 14,6H7A2,2 0 0,0 5,8V20H16V18H18V22H3V8A4,4 0 0,1 7,4M16,11C18.5,11 18.5,9 21,9V11C18.5,11 18.5,13 16,13V11M16,15C18.5,15 18.5,13 21,13V15C18.5,15 18.5,17 16,17V15Z",whatsapp:"M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.71C7 10.93 7.89 12.1 8 12.27C8.14 12.44 9.76 14.94 12.25 16C12.84 16.27 13.3 16.42 13.66 16.53C14.25 16.72 14.79 16.69 15.22 16.63C15.7 16.56 16.68 16.03 16.89 15.45C17.1 14.87 17.1 14.38 17.04 14.27C16.97 14.17 16.81 14.11 16.56 14C16.31 13.86 15.09 13.26 14.87 13.18C14.64 13.1 14.5 13.06 14.31 13.3C14.15 13.55 13.67 14.11 13.53 14.27C13.38 14.44 13.24 14.46 13 14.34C12.74 14.21 11.94 13.95 11 13.11C10.26 12.45 9.77 11.64 9.62 11.39C9.5 11.15 9.61 11 9.73 10.89C9.84 10.78 10 10.6 10.1 10.45C10.23 10.31 10.27 10.2 10.35 10.04C10.43 9.87 10.39 9.73 10.33 9.61C10.27 9.5 9.77 8.26 9.56 7.77C9.36 7.29 9.16 7.35 9 7.34C8.86 7.34 8.7 7.33 8.53 7.33Z","file-chart":"M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2M18 20H6V4H13V9H18V20M9 13V19H7V13H9M15 15V19H17V15H15M11 11V19H13V11H11Z",paw:"M8.35,3C9.53,2.83 10.78,4.12 11.14,5.9C11.5,7.67 10.85,9.25 9.67,9.43C8.5,9.61 7.24,8.32 6.87,6.54C6.5,4.77 7.17,3.19 8.35,3M15.5,3C16.69,3.19 17.35,4.77 17,6.54C16.62,8.32 15.37,9.61 14.19,9.43C13,9.25 12.35,7.67 12.72,5.9C13.08,4.12 14.33,2.83 15.5,3M3,7.6C4.14,7.11 5.69,8 6.5,9.55C7.26,11.13 7,12.79 5.87,13.28C4.74,13.77 3.2,12.89 2.41,11.32C1.62,9.75 1.9,8.08 3,7.6M21,7.6C22.1,8.08 22.38,9.75 21.59,11.32C20.8,12.89 19.26,13.77 18.13,13.28C17,12.79 16.74,11.13 17.5,9.55C18.31,8 19.86,7.11 21,7.6M19.33,18.38C19.37,19.32 18.65,20.36 17.79,20.75C16,21.57 13.88,19.87 11.89,19.87C9.9,19.87 7.76,21.64 6,20.75C5,20.26 4.31,18.96 4.44,17.88C4.62,16.39 6.41,15.59 7.47,14.5C8.88,13.09 9.88,10.44 11.89,10.44C13.89,10.44 14.95,13.05 16.3,14.5C17.41,15.72 19.26,16.75 19.33,18.38Z",sprinkler:"M10 10H14V22H10V10M7 9H9V7H7V9M4 8H6V6H4V8M4 11H6V9H4V11M1 13H3V11H1V13M1 7H3V5H1V7M1 10H3V8H1V10M18 11H20V9H18V11M21 10H23V8H21V10M21 5V7H23V5H21M21 13H23V11H21V13M15 9H17V7H15V9M18 8H20V6H18V8M10 7H10.33L11 9H13L13.67 7H14V6H10V7Z",key:"M12.67 13.67C12.2 14.13 11.63 14.5 11 14.73V23H8V21H5V18H8V14.72C6.26 14.1 5 12.46 5 10.5C5 8 7 6 9.5 6C9.54 6 9.57 6 9.6 6C9.13 6.95 8.92 8 9.03 9.08C8.44 9.28 8 9.84 8 10.5C8 11.33 8.67 12 9.5 12C9.73 12 9.95 11.94 10.15 11.85C10.79 12.69 11.67 13.32 12.67 13.67M20.73 19.44L17.97 20.6L17.19 18.76L14.43 19.93L13.26 17.16L16.03 16L14.76 13C12.91 13.08 11.11 12.05 10.35 10.25C9.39 7.96 10.47 5.32 12.76 4.35C13 4.25 13.26 4.18 13.5 4.12C12.84 2.87 11.5 2 10 2C7.79 2 6 3.79 6 6C6 6.08 6 6.16 6 6.24C5.7 6.5 5.4 6.82 5.15 7.15C5.06 6.78 5 6.4 5 6C5 3.24 7.24 1 10 1S15 3.24 15 6C15 7.42 14.4 8.67 13.45 9.57C13.87 10 14.5 10.13 15.08 9.88C15.85 9.56 16.2 8.68 15.88 7.92C15.85 7.83 15.8 7.74 15.74 7.66C15.9 7.13 16 6.58 16 6C16 5.37 15.9 4.76 15.72 4.19C17 4.55 18.1 5.44 18.65 6.76C19.41 8.56 18.89 10.57 17.5 11.81L20.73 19.44M13 8.6C13.37 8.19 13.65 7.71 13.82 7.18C13.28 7.45 12.97 8 13 8.6Z",upload:"M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z","microphone-off":"M19,11C19,12.19 18.66,13.3 18.1,14.28L16.87,13.05C17.14,12.43 17.3,11.74 17.3,11H19M15,11.16L9,5.18V5A3,3 0 0,1 12,2A3,3 0 0,1 15,5V11L15,11.16M4.27,3L21,19.73L19.73,21L15.54,16.81C14.77,17.27 13.91,17.58 13,17.72V21H11V17.72C7.72,17.23 5,14.41 5,11H6.7C6.7,14 9.24,16.1 12,16.1C12.81,16.1 13.6,15.91 14.31,15.58L12.65,13.92L12,14A3,3 0 0,1 9,11V10.28L3,4.27L4.27,3Z","water-boiler":"M8 2C6.89 2 6 2.89 6 4V16C6 17.11 6.89 18 8 18H9V20H6V22H9C10.11 22 11 21.11 11 20V18H13V20C13 21.11 13.89 22 15 22H18V20H15V18H16C17.11 18 18 17.11 18 16V4C18 2.89 17.11 2 16 2H8M12 4.97A2 2 0 0 1 14 6.97A2 2 0 0 1 12 8.97A2 2 0 0 1 10 6.97A2 2 0 0 1 12 4.97M10 14.5H14V16H10V14.5Z","washing-machine":Pt,note:"M15 3H5A2 2 0 0 0 3 5V19A2 2 0 0 0 5 21H19A2 2 0 0 0 21 19V9L15 3M19 19H5V5H14V10H19M17 14H7V12H17M14 17H7V15H14","book-open-variant":"M12 21.5C10.65 20.65 8.2 20 6.5 20C4.85 20 3.15 20.3 1.75 21.05C1.65 21.1 1.6 21.1 1.5 21.1C1.25 21.1 1 20.85 1 20.6V6C1.6 5.55 2.25 5.25 3 5C4.11 4.65 5.33 4.5 6.5 4.5C8.45 4.5 10.55 4.9 12 6C13.45 4.9 15.55 4.5 17.5 4.5C18.67 4.5 19.89 4.65 21 5C21.75 5.25 22.4 5.55 23 6V20.6C23 20.85 22.75 21.1 22.5 21.1C22.4 21.1 22.35 21.1 22.25 21.05C20.85 20.3 19.15 20 17.5 20C15.8 20 13.35 20.65 12 21.5M12 8V19.5C13.35 18.65 15.8 18 17.5 18C18.7 18 19.9 18.15 21 18.5V7C19.9 6.65 18.7 6.5 17.5 6.5C15.8 6.5 13.35 7.15 12 8M13 11.5C14.11 10.82 15.6 10.5 17.5 10.5C18.41 10.5 19.26 10.59 20 10.78V9.23C19.13 9.08 18.29 9 17.5 9C15.73 9 14.23 9.28 13 9.84V11.5M17.5 11.67C15.79 11.67 14.29 11.93 13 12.46V14.15C14.11 13.5 15.6 13.16 17.5 13.16C18.54 13.16 19.38 13.24 20 13.4V11.9C19.13 11.74 18.29 11.67 17.5 11.67M20 14.57C19.13 14.41 18.29 14.33 17.5 14.33C15.67 14.33 14.17 14.6 13 15.13V16.82C14.11 16.16 15.6 15.83 17.5 15.83C18.54 15.83 19.38 15.91 20 16.07V14.57Z","weather-night":Wt},Zt=["home","lightning-bolt","shield-home","doorbell","air-conditioner","cctv","sofa","bed","kitchen","shower","garden","garage","car","pool","gamepad","desk","laundry","solar","lightbulb","robot-vacuum","thermometer","television","speaker","dashboard"];function Ft(t){const e=parseInt(t.replace("#",""),16),[i,s,a]=[e>>16&255,e>>8&255,255&e].map((t=>{const e=t/255;return e<=.03928?e/12.92:((e+.055)/1.055)**2.4}));return.2126*i+.7152*s+.0722*a>.22?"#1E252B":"#FFFFFF"}const Ut=t=>"#"+t.map((t=>t.toString(16).padStart(2,"0"))).join("");function qt(t,e){const i=e/100,s=e=>{const s=(e+t/60)%6;return Math.round(255*(1-i*Math.max(0,Math.min(s,4-s,1))))};return[s(5),s(3),s(1)]}const Yt=([t,e,i])=>`rgb(${t}, ${e}, ${i})`,Xt=t=>t.split(".")[0];function Kt(t,e,i){return e.names[i]||t.states[i]?.attributes.friendly_name||i}const Jt=t=>t.attributes.device_class;function Gt(t){if(!t)return!1;switch(Xt(t.entity_id)){case"climate":return"off"!==t.state&&"unavailable"!==t.state;case"vacuum":return"cleaning"===t.state||"returning"===t.state;case"lock":return"unlocked"===t.state||"open"===t.state||"jammed"===t.state;case"cover":return"open"===t.state||"opening"===t.state||"closing"===t.state;case"media_player":return"playing"===t.state||"on"===t.state;case"camera":return"streaming"===t.state||"recording"===t.state;case"alarm_control_panel":return t.state.startsWith("armed")||"triggered"===t.state||"pending"===t.state||"arming"===t.state;case"sensor":case"event":return!1;default:return"on"===t.state||"open"===t.state||"home"===t.state}}function Qt(t){const e=t&&"light"===Xt(t.entity_id)&&"on"===t.state?t.attributes.rgb_color:void 0;if(3===e?.length)return`--tone:rgb(${e.join(",")});--on-tone:${Ft(Ut(e))}`;const i=t?function(t){const e=Xt(t.entity_id);return"climate"!==e||"cool"!==t.state&&"cooling"!==t.attributes.hvac_action?"binary_sensor"===e&&["smoke","moisture","gas","carbon_monoxide","problem","safety"].includes(Jt(t)??"")||"lock"===e&&"jammed"===t.state||"alarm_control_panel"===e&&"triggered"===t.state?"alert":"accent":"cool"}(t):"accent";return`--tone:var(--${i});--on-tone:var(--on-${i})`}function te(t,e){const i=t?.attributes.icon;if(i?.startsWith("mdi:")){const t=i.slice(4);if(Bt[t])return t;if(customElements.get("ha-icon"))return i}const s=Xt(e),a=Gt(t),n=t?Jt(t):void 0;switch(s){case"light":return a?"lightbulb":"lightbulb-outline";case"switch":case"input_boolean":return"outlet"===n?a?"power-plug":"power-plug-off":a?"toggle-on":"toggle-off";case"fan":return a?"fan":"fan-off";case"climate":return"cool"===t?.state?"snowflake":"air-conditioner";case"vacuum":return"robot-vacuum";case"camera":return"cctv";case"lock":return a?"lock-open":"lock";case"cover":return"garage"===n?a?"garage-open":"garage":"window"===n?a?"window-open":"window-closed":"curtain"===n?"curtains":"door"===n?a?"door-open":"door-closed":a?"blinds":"blinds-closed";case"binary_sensor":return"motion"===n||"occupancy"===n||"presence"===n?a?"motion-sensor":"motion-sensor-off":"door"===n||"opening"===n?a?"door-open":"door-closed":"window"===n?a?"window-open":"window-closed":"garage_door"===n?a?"garage-open":"garage":"moisture"===n?"leak":"smoke"===n||"heat"===n?"fire":"eye";case"sensor":return"temperature"===n?"thermometer":"humidity"===n?"humidity":"power"===n||"energy"===n||"current"===n||"voltage"===n?"lightning-bolt":"battery"===n?"battery":"gauge";case"event":return"doorbell"===n?"doorbell":"bell";case"alarm_control_panel":return"shield-home";case"media_player":return"speaker"===n?"speaker":"television";case"scene":return"palette";case"script":case"button":case"input_button":return"play-circle";default:return"grid"}}function ee(t){const e=Xt(t);return["scene","script","button","input_button"].includes(e)?"run":["light","switch","fan","input_boolean","automation","media_player","climate","cover","vacuum","humidifier","siren"].includes(e)?"toggle":"sheet"}async function ie(t,e){const i=e.entity_id,s=Xt(i),a={entity_id:i};switch(s){case"climate":return t.callService("climate","off"===e.state?"turn_on":"turn_off",a);case"vacuum":return t.callService("vacuum","cleaning"===e.state?"return_to_base":"start",a);case"cover":return t.callService("cover","toggle",a);case"scene":case"script":return t.callService(s,"turn_on",a);case"button":case"input_button":return t.callService(s,"press",a);default:return t.callService("homeassistant","toggle",a)}}const se=t=>`⁦${t}⁩`;function ae(t,e,i=1){return new Intl.NumberFormat(Dt[e],{maximumFractionDigits:i}).format(t)}function ne(t,e){const i=Number(t.state);if(""===t.state||Number.isNaN(i))return;const s=t.attributes.unit_of_measurement??"",a="%"===s||s.startsWith("°")?"":" ";return se(`${ae(i,e)}${s?a+s:""}`)}function re(t,e,i){if(!e)return t("unavailable");if("unavailable"===e.state||"unknown"===e.state)return t(e.state);const s=Xt(e.entity_id),a=Jt(e);if("sensor"===s)return ne(e,i)??(zt(e.state)?t(e.state):e.state);if("binary_sensor"===s){const i="on"===e.state;return"motion"===a||"occupancy"===a||"presence"===a?t(i?"motion":"clear"):["door","window","opening","garage_door"].includes(a??"")?t(i?"open":"closed"):["moisture","smoke","gas","carbon_monoxide","problem"].includes(a??"")?t(i?"detected":"clear"):t(i?"on":"off")}if("light"===s&&"on"===e.state&&"number"==typeof e.attributes.brightness)return se(`${Math.round(e.attributes.brightness/255*100)}%`);if("climate"===s&&"off"!==e.state){const s=e.attributes.temperature,a=zt(e.state)?t(e.state):e.state;return"number"==typeof s?`${a} · ${se(`${ae(s,i)}°`)}`:a}return"event"===s?le(t,e.state):["scene","script","button","input_button"].includes(s)?t("tap_to_run"):"vacuum"===s&&"number"==typeof e.attributes.battery_level&&"docked"===e.state?`${t("docked")} · ${se(`${e.attributes.battery_level}%`)}`:zt(e.state)?t(e.state):e.state}function oe(t,e,i){if(!e)return"–";const s=Xt(e.entity_id);if("sensor"===s)return ne(e,i)??e.state;if("climate"===s){const s=e.attributes.current_temperature;return"number"==typeof s?se(`${ae(s,i)}°`):re(t,e,i)}return"light"===s&&"on"===e.state&&"number"==typeof e.attributes.brightness?se(`${Math.round(e.attributes.brightness/255*100)}%`):re(t,e,i)}function le(t,e){const i=Date.parse(e);if(Number.isNaN(i))return"–";const s=Math.round((Date.now()-i)/6e4);return s<1?t("just_now"):s<60?t("min_ago",{n:s}):t("hours_ago",{n:Math.round(s/60)})}function ce(t){return!!t&&"sensor"===Xt(t.entity_id)&&""!==t.state&&!Number.isNaN(Number(t.state))}function de(t,e,i={}){return Object.values(t.states).filter((t=>!i.domains||i.domains.includes(Xt(t.entity_id)))).filter((t=>!i.deviceClasses||i.deviceClasses.includes(Jt(t)??""))).map((i=>({id:i.entity_id,name:Kt(t,e,i.entity_id),entity:i}))).sort(((t,e)=>t.name.localeCompare(e.name)))}function pe([t,e],i){let s=!1;for(let a=0,n=i.length-1;a<i.length;n=a++){const[r,o]=i[a],[l,c]=i[n];o>e!=c>e&&t<(l-r)*(e-o)/(c-o)+r&&(s=!s)}return s}function he(t){let e=0,i=0,s=0;for(let a=0,n=t.length-1;a<t.length;n=a++){const r=t[n][0]*t[a][1]-t[a][0]*t[n][1];e+=r,i+=(t[n][0]+t[a][0])*r,s+=(t[n][1]+t[a][1])*r}return Math.abs(e)<1e-6?[t.reduce(((t,e)=>t+e[0]),0)/t.length,t.reduce(((t,e)=>t+e[1]),0)/t.length]:[i/(3*e),s/(3*e)]}function ue(t,e,i=1.6){let s,a=i;for(const n of e){const e=Math.hypot(n[0]-t[0],n[1]-t[1]);e<a&&(a=e,s=n)}return s?[s[0],s[1]]:[Math.round(10*t[0])/10,Math.round(10*t[1])/10]}const ge=t=>`polygon(${t.map((([t,e])=>`${t}% ${e}%`)).join(",")})`,me=["temperature","humidity","power","carbon_dioxide"],fe=["door","window","opening","garage_door","motion","occupancy","moisture","smoke","gas"],be=["light","switch","fan","climate","cover","lock","media_player","vacuum","camera","alarm_control_panel","sensor","binary_sensor","humidifier","siren"],_e={light:0,climate:1,cover:2,fan:3,switch:4,media_player:5,lock:6,vacuum:7,alarm_control_panel:8,binary_sensor:9,sensor:10,camera:11};function ye(t,e){const i=t.entities?.[e];if(i?.area_id)return i.area_id;const s=i?.device_id?t.devices?.[i.device_id]:void 0;return s?.area_id??void 0}const ve=(t,e)=>(_e[Xt(t.entity_id)]??20)-(_e[Xt(e.entity_id)]??20)||t.entity_id.localeCompare(e.entity_id);function xe(t){const e=new Map;for(const i of function(t){return Object.values(t.states).filter((e=>{const i=e.entity_id,s=Xt(i);if(!be.includes(s))return!1;const a=t.entities?.[i];return!a?.entity_category&&!a?.hidden&&"fully_kiosk"!==a?.platform&&"smartnest"!==a?.platform&&!("unavailable"===e.state&&!a)&&("sensor"===s?me.includes(e.attributes.device_class):"binary_sensor"!==s||fe.includes(e.attributes.device_class))}))}(t)){const s=ye(t,i.entity_id);e.set(s,[...e.get(s)??[],i])}return[...e.entries()].map((([e,i])=>({areaId:e,name:e?t.areas?.[e]?.name??e:void 0,ids:i.sort(ve).map((t=>t.entity_id))}))).sort(((t,e)=>(t.areaId?0:1)-(e.areaId?0:1)||(t.name??"").localeCompare(e.name??"")))}const we=t=>t.trim().toLowerCase().replace(/\s+/g," ");function $e(t,e){const i=t.map((t=>t[0])),s=t.map((t=>t[1])),[a,n,r,o]=[Math.min(...i),Math.max(...i),Math.min(...s),Math.max(...s)];for(let l=Math.ceil(Math.sqrt(e));l<12;l++){const i=[];for(let e=0;e<l;e++)for(let s=0;s<l;s++){const c=[a+(s+.5)/l*(n-a),r+(e+.5)/l*(o-r)];pe(c,t)&&i.push([Math.round(10*c[0])/10,Math.round(10*c[1])/10])}if(i.length>=e)return i.slice(0,e)}return[]}function ke(t,e){const i=new Set(e.markers.map((t=>t.entity))),s=[];for(const a of xe(t)){if(!a.name)continue;const t=e.rooms?.find((t=>we(t.name)===we(a.name)));if(!t)continue;const n=a.ids.filter((t=>!i.has(t)&&"camera"!==Xt(t))).slice(0,9),r=$e(t.points,n.length);n.forEach(((t,e)=>{if(!r[e])return;const i=Xt(t);s.push({id:Ae(),entity:t,x:r[e][0],y:r[e][1],display:"sensor"===i||"climate"===i?"value":"icon"})}))}return s}const Ce=12,Me="#E9971D",Ae=()=>Math.random().toString(36).slice(2,10)+Date.now().toString(36).slice(-4),He={floorplan:{w:12,h:10,minW:4,minH:4},tile:{w:3,h:2,minW:2,minH:2},camera:{w:6,h:5,minW:3,minH:3},heading:{w:12,h:1,minW:2,minH:1},clock:{w:4,h:3,minW:3,minH:2},modes:{w:12,h:2,minW:4,minH:2},vacuum:{w:12,h:9,minW:6,minH:6},visitors:{w:12,h:4,minW:4,minH:3},energy:{w:6,h:7,minW:4,minH:5},energy_stats:{w:6,h:8,minW:4,minH:6},panic:{w:3,h:3,minW:2,minH:2},check:{w:6,h:6,minW:4,minH:4},family:{w:6,h:3,minW:3,minH:2},todo:{w:4,h:7,minW:3,minH:4},calendar:{w:4,h:7,minW:3,minH:4},forecast:{w:6,h:4,minW:4,minH:3},countdown:{w:4,h:4,minW:3,minH:3},gauge:{w:3,h:4,minW:2,minH:3},gate:{w:6,h:6,minW:4,minH:4},frigate:{w:12,h:5,minW:4,minH:4},schedule:{w:12,h:6,minW:6,minH:4},media:{w:6,h:5,minW:4,minH:4},remote:{w:4,h:8,minW:3,minH:6},parcels:{w:6,h:5,minW:3,minH:3},commute:{w:6,h:4,minW:3,minH:3},radar:{w:6,h:6,minW:4,minH:4},verse:{w:6,h:4,minW:3,minH:3},board:{w:6,h:6,minW:4,minH:4},internet:{w:6,h:6,minW:4,minH:4},timeline:{w:12,h:7,minW:6,minH:5},irrigation:{w:6,h:6,minW:4,minH:5},boiler:{w:6,h:5,minW:4,minH:4},air:{w:6,h:4,minW:4,minH:3},chores:{w:6,h:7,minW:4,minH:5},wake:{w:6,h:4,minW:4,minH:3},water:{w:6,h:5,minW:4,minH:4},consumers:{w:6,h:5,minW:4,minH:4}};function Le(t){return{home_name:"",language:t,accent:Me,theme:"schedule",dark_from:"19:00",dark_to:"06:30",default_page:"",screensaver:{enabled:!0,timeout_min:5,photos:!0,photo_folder:"smartnest-photos",photo_seconds:20,style:"classic"},glass:"classic",guests:{},weather:{entity:"weather.forecast_home",background:!0},fully:{night_dim:!0,night_brightness:20,night_off_min:15,motion_wake:!1},doorbell:{keep_days:7},kiosk:{},greeting_name:"",prayer:!0,morning:!0,night_plan:!0,season:"auto",speakers:[],maintenance:[],setup_done:!0,chips_hidden:[],travel:{off:[],lights:[],arm:!0,simulate:!0},emergency:{police:"100",contacts:[]},installer:{},appliances:[],night_path:{motion:[],lights:[],brightness:10,minutes:3,from:"23:00",to:"06:00"},arrival:{climate:[],lights:[],km:5},outage:{shed:[]},style:"classic",material:"none",night_midnight:!1,tou:{enabled:!1,cheap_from:"23:00",cheap_to:"07:00",peak_from:"17:00",peak_to:"22:00"}}}function Ve(t){return{id:Ae(),name:t,markers:[]}}function Se(t,e={},i={}){const{w:s,h:a}=He[t];return{id:Ae(),type:t,x:0,y:0,w:s,h:a,config:e,...i}}const ze=(t,e)=>t.x<e.x+e.w&&e.x<t.x+t.w&&t.y<e.y+e.h&&e.y<t.y+t.h;function De(t,e){const i=t.map((t=>{const e={...t};return e.w=Math.min(Math.max(e.w,1),Ce),e.x=Math.min(Math.max(e.x,0),Ce-e.w),e.y=Math.max(e.y,0),e})),s=i.find((t=>t.id===e)),a=s?[s]:[];for(const r of i.filter((t=>t!==s)).sort(((t,e)=>t.y-e.y||t.x-e.x))){for(;a.some((t=>ze(t,r)));)r.y++;a.push(r)}const n=[];for(const r of a.sort(((t,e)=>t.y-e.y||t.x-e.x))){for(;r.y>0&&!n.some((t=>ze(t,{...r,y:r.y-1})));)r.y--;n.push(r)}return n}function Oe(t,e=0){let i=0,s=e,a=0;return t.map((t=>{i+t.w>Ce&&(i=0,s+=a,a=0);const e={...t,x:i,y:s};return i+=t.w,a=Math.max(a,t.h),e}))}const je=[{id:"blank",icon:"dashboard",label:"template_blank"},{id:"home",icon:"home",label:"template_home"},{id:"rooms",icon:"sofa",label:"template_rooms"},{id:"power",icon:"lightning-bolt",label:"template_power"},{id:"security",icon:"shield-home",label:"template_security"},{id:"doorbell",icon:"doorbell",label:"template_doorbell"},{id:"climate",icon:"air-conditioner",label:"template_climate"},{id:"robot",icon:"robot-vacuum",label:"template_robot"},{id:"water",icon:"water",label:"template_water"},{id:"car",icon:"car",label:"template_car"},{id:"garden",icon:"sprinkler",label:"template_garden"},{id:"pets",icon:"paw",label:"template_pets"}],Te={car:/\b(car|tesla|bmw|toyota|hyundai|kia|volkswagen|vw|audi|mercedes|skoda|byd|mg|ev|wallbox|charger|easee|zappi)\b|_car_|سيار|شاحن/i,garden:/garden|pool|spa|irrigat|sprinkler|lawn|pump|soil|plant|hose|حديق|جنين|مسبح|ري_|رشاش|مضخ|زرع/i,pets:/\b(pet|cat|dog|feeder|litter|petkit|aquarium|fish)\b|_pet_|قط|كلب|حيوان|سمك|أكل_ال/i},Pe=["sensor","binary_sensor","switch","lock","climate","button","valve","number","select","device_tracker","camera","light","fan","water_heater"];function Ne(t,e,i,s){const a=je.find((e=>e.id===t)),n=(t,s,a=8)=>de(e,i,{domains:t,deviceClasses:s}).filter((t=>!e.entities?.[t.id]?.entity_category&&!e.entities?.[t.id]?.hidden)).slice(0,a).map((t=>t.id)),r=t=>t.map((t=>Se("tile",{entity:t}))),o=(t,e=6,i=5)=>t.map((t=>Se("camera",{entity:t},{w:e,h:i})));let l=[];switch(t){case"home":l=[...e.states["script.smartnest_mode_away"]?[Se("modes")]:[],Se("floorplan",{floors:[Ve(s("floor_default"))]},{y:2})];break;case"power":l=Oe([...Object.keys(e.states).some((t=>/solar|pv/.test(t)))?[Se("energy")]:[],...Object.values(e.states).some((t=>"power"===t.attributes.device_class))?[Se("consumers")]:[],...r(n(["sensor"],["power","energy"])),...r(n(["switch"],void 0,8))]);break;case"security":l=Oe([...o(n(["camera"],void 0,4)),...r(n(["lock"])),...r(n(["binary_sensor"],["door","window","opening","motion","occupancy","smoke","moisture"]))]);break;case"doorbell":{const t=i.settings.doorbell.camera_entity??n(["camera"],void 0,1)[0],e=i.settings.doorbell.lock_entity??n(["lock"],void 0,1)[0],s=n(["event"],["doorbell"],1);l=Oe([...t?o([t],8,7):[],...r([e,...s].filter(Boolean)).map((t=>({...t,w:4}))),Se("visitors")]);break}case"rooms":l=function(t,e){const i=[];let s=0;for(const a of xe(t)){if(!a.ids.length)continue;i.push({id:Ae(),type:"heading",x:0,y:s,w:12,h:1,config:{text:a.name??e}}),s+=1;const t=a.ids.filter((t=>"camera"===Xt(t))),n=a.ids.filter((t=>"camera"!==Xt(t)));let r=0;for(const e of n)r+3>12&&(r=0,s+=2),i.push({id:Ae(),type:"tile",x:r,y:s,w:3,h:2,config:{entity:e}}),r+=3;n.length&&(s+=2),r=0;for(const e of t)r+6>12&&(r=0,s+=5),i.push({id:Ae(),type:"camera",x:r,y:s,w:6,h:5,config:{entity:e}}),r+=6;t.length&&(s+=5)}return i}(e,s("other_devices"));break;case"car":case"garden":case"pets":{const i=function(t,e,i=12){return Object.values(t.states).filter((i=>{const s=t.entities?.[i.entity_id];return!s?.entity_category&&!s?.hidden&&Pe.includes(Xt(i.entity_id))&&Te[e].test(`${i.entity_id} ${i.attributes.friendly_name??""}`)})).sort(((t,e)=>Pe.indexOf(Xt(t.entity_id))-Pe.indexOf(Xt(e.entity_id)))).slice(0,i).map((t=>t.entity_id))}(e,t);l=Oe([...o(i.filter((t=>"camera"===Xt(t))),6,5),...r(i.filter((t=>"camera"!==Xt(t))))]);break}case"water":l=Oe([Se("water"),...r(n(["binary_sensor"],["moisture"])),...r(n(["valve"]))]);break;case"robot":l=n(["vacuum"],void 0,2).map(((t,e)=>Se("vacuum",{entity:t},{y:9*e})));break;case"climate":l=Oe([...r(n(["climate"])),...r(n(["sensor"],["temperature","humidity"]))])}return{id:Ae(),title:s("blank"===t?"untitled":a.label),icon:a.icon,widgets:"rooms"===t?l:De(l)}}function Ie(t,e){const i=Le(e),s={...i,...t?.settings??{}};return s.screensaver={...i.screensaver,...t?.settings?.screensaver??{}},s.doorbell={...i.doorbell,...t?.settings?.doorbell??{}},s.chips_hidden=Array.isArray(t?.settings?.chips_hidden)?t.settings.chips_hidden:[],s.speakers=Array.isArray(t?.settings?.speakers)?t.settings.speakers:[],s.maintenance=Array.isArray(t?.settings?.maintenance)?t.settings.maintenance:[],s.kiosk={...t?.settings?.kiosk??{}},s.weather={...i.weather,...t?.settings?.weather??{}},s.guests={...t?.settings?.guests??{}},s.fully={...i.fully,...t?.settings?.fully??{}},s.travel={...i.travel,...t?.settings?.travel??{}},s.emergency={...i.emergency,...t?.settings?.emergency??{}},s.installer={...t?.settings?.installer??{}},s.appliances=Array.isArray(t?.settings?.appliances)?t.settings.appliances:[],s.night_path={...i.night_path,...t?.settings?.night_path??{}},s.arrival={...i.arrival,...t?.settings?.arrival??{}},s.outage={...i.outage,...t?.settings?.outage??{}},s.tou={...i.tou,...t?.settings?.tou??{}},{version:1,settings:s,names:{...t?.names??{}},pages:Array.isArray(t?.pages)?t.pages:[]}}async function We(t,e){await t.callWS({type:"smartnest/config/save",config:e})}async function Ee(t,e){const i=new FormData;i.append("file",e);const s=await t.fetchWithAuth("/api/smartnest/upload",{method:"POST",body:i});if(!s.ok)throw new Error(`upload ${s.status}`);return(await s.json()).url}function Re(t,e){for(const i of t.pages){const t=i.widgets.find((t=>t.id===e));if(t)return t}}const Be="#151A1E",Ze="#1E252B",Fe="#2A333B",Ue="#3A454F",qe="#55616C",Ye="#9AA4AD",Xe="#F2ECE2",Ke="#965A00",Je="#18BCF2",Ge="#2FB57A",Qe="#F26B68",ti="#C62828";function ei(t,e){const i=e||Me,s=i.toUpperCase()===Me,a={"--accent":i,"--on-accent":Ft(i),"--cool":Je,"--on-cool":Ze,"--alert":Qe,"--on-alert":Ze,"--success":Ge};return t?{...a,"--bg":Be,"--bg-glow":"rgba(233,151,29,.10)","--surface":"rgba(42,51,59,.66)","--surface-solid":Fe,"--surface-2":Ue,"--surface-hover":"rgba(58,69,79,.8)","--text":"#FFFFFF","--text-2":Ye,"--border":"rgba(255,255,255,.08)","--accent-text":i,"--alert-text":Qe,"--scrim":"rgba(8,10,12,.55)","--shadow":"0 1px 0 rgba(255,255,255,.04) inset, 0 10px 30px rgba(0,0,0,.35)","--shadow-lift":"0 24px 60px rgba(0,0,0,.55)","color-scheme":"dark"}:{...a,"--bg":"#F3EFE8","--bg-glow":"rgba(233,151,29,.12)","--surface":"rgba(255,255,255,.72)","--surface-solid":"#FFFFFF","--surface-2":Xe,"--surface-hover":"rgba(255,255,255,.92)","--text":Ze,"--text-2":qe,"--border":"rgba(30,37,43,.08)","--accent-text":s?Ke:`color-mix(in srgb, ${i} 62%, black)`,"--alert-text":ti,"--scrim":"rgba(30,37,43,.28)","--shadow":"0 1px 2px rgba(30,37,43,.05), 0 8px 24px rgba(30,37,43,.07)","--shadow-lift":"0 24px 60px rgba(30,37,43,.22)","color-scheme":"light"}}function ii(t){const e=(e,i)=>`@font-face{font-family:"Rubik";font-weight:${e};font-display:swap;src:url("${t}fonts/${i}") format("truetype");}`;return[e(400,"Rubik-Regular.ttf"),e(500,"Rubik-Medium.ttf"),e(700,"Rubik-Bold.ttf"),e(800,"Rubik-ExtraBold.ttf")].join("")}const si=o`
  :host {
    --font: "Rubik", system-ui, -apple-system, "Segoe UI", Tahoma, sans-serif;
    --r-sm: 10px;
    --r-md: 16px;
    --r-lg: 24px;
    --r-xl: 32px;
    --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
    --ease-in: cubic-bezier(0.64, 0, 0.78, 0);
    --spring: cubic-bezier(0.34, 1.56, 0.64, 1);
    --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
    --dur-fast: 200ms;
    --dur: 400ms;
    --row-h: ${r(44)}px;
    --gap: ${r(12)}px;
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
    background-color: var(--surface);
    background-image: var(--sheen, none);
    background-attachment: fixed;
    -webkit-backdrop-filter: blur(var(--glass-blur, 24px)) saturate(var(--glass-sat, 170%));
    backdrop-filter: blur(var(--glass-blur, 24px)) saturate(var(--glass-sat, 170%));
    border: 1px solid var(--border);
    box-shadow: var(--shadow), var(--glass-edge, 0 0 #0000);
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
  input[type="date"],
  input[type="datetime-local"],
  input[type="search"],
  input[type="tel"],
  textarea,
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
  textarea {
    padding: 10px 12px;
    resize: vertical;
  }
  input:focus,
  textarea:focus,
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
`;var ai=Object.defineProperty,ni=Object.getOwnPropertyDescriptor,ri=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?ni(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&ai(e,i,n),n};const oi={bell:"M10 21H14C14 22.1 13.1 23 12 23S10 22.1 10 21M21 19V20H3V19L5 17V11C5 7.9 7 5.2 10 4.3V4C10 2.9 10.9 2 12 2S14 2.9 14 4V4.3C17 5.2 19 7.9 19 11V17L21 19M17 11C17 8.2 14.8 6 12 6S7 8.2 7 11V18H17V11Z","bell-ring":"M10,21H14A2,2 0 0,1 12,23A2,2 0 0,1 10,21M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M17,11A5,5 0 0,0 12,6A5,5 0 0,0 7,11V18H17V11M19.75,3.19L18.33,4.61C20.04,6.3 21,8.6 21,11H23C23,8.07 21.84,5.25 19.75,3.19M1,11H3C3,8.6 3.96,6.3 5.67,4.61L4.25,3.19C2.16,5.25 1,8.07 1,11Z",camera:"M20,4H16.83L15,2H9L7.17,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6A2,2 0 0,0 20,4M20,18H4V6H8.05L9.88,4H14.12L15.95,6H20V18M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15Z",home:Ot,lightbulb:jt,"lightning-bolt":"M11 9.47V11H14.76L13 14.53V13H9.24L11 9.47M13 1L6 15H11V23L18 9H13V1Z",lock:"M12,17C10.89,17 10,16.1 10,15C10,13.89 10.89,13 12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17M18,20V10H6V20H18M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10C4,8.89 4.89,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z","lock-open":"M10 13C11.1 13 12 13.89 12 15C12 16.11 11.11 17 10 17S8 16.11 8 15 8.9 13 10 13M18 1C15.24 1 13 3.24 13 6V8H4C2.9 8 2 8.9 2 10V20C2 21.1 2.9 22 4 22H16C17.1 22 18 21.1 18 20V10C18 8.9 17.1 8 16 8H15V6C15 4.34 16.34 3 18 3S21 4.34 21 6V8H23V6C23 3.24 20.76 1 18 1M16 10V20H4V10H16Z","shield-home":"M21,11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1L21,5V11M12,21C15.75,20 19,15.54 19,11.22V6.3L12,3.18L5,6.3V11.22C5,15.54 8.25,20 12,21M11,14H13V17H16V12H18L12,7L6,12H8V17H11V14",sofa:"M21 9V7C21 5.35 19.65 4 18 4H14C13.23 4 12.53 4.3 12 4.78C11.47 4.3 10.77 4 10 4H6C4.35 4 3 5.35 3 7V9C1.35 9 0 10.35 0 12V17C0 18.65 1.35 20 3 20V22H5V20H19V22H21V20C22.65 20 24 18.65 24 17V12C24 10.35 22.65 9 21 9M14 6H18C18.55 6 19 6.45 19 7V9.78C18.39 10.33 18 11.12 18 12V14H13V7C13 6.45 13.45 6 14 6M5 7C5 6.45 5.45 6 6 6H10C10.55 6 11 6.45 11 7V14H6V12C6 11.12 5.61 10.33 5 9.78V7M22 17C22 17.55 21.55 18 21 18H3C2.45 18 2 17.55 2 17V12C2 11.45 2.45 11 3 11S4 11.45 4 12V16H20V12C20 11.45 20.45 11 21 11S22 11.45 22 12V17Z","power-plug":"M16 7V3H14V7H10V3H8V7C7 7 6 8 6 9V14.5L9.5 18V21H14.5V18L18 14.5V9C18 8 17 7 16 7M16 13.67L13.09 16.59L12.67 17H11.33L10.92 16.59L8 13.67V9.09C8 9.06 8.06 9 8.09 9H15.92C15.95 9 16 9.06 16 9.09V13.67Z","power-plug-off":"M22.11 21.46L2.39 1.73L1.11 3L6.25 8.14C6.1 8.41 6 8.7 6 9V14.5L9.5 18V21H14.5V18L15.31 17.2L20.84 22.73L22.11 21.46M13.09 16.59L12.67 17H11.33L10.92 16.59L8 13.67V9.89L13.89 15.78L13.09 16.59M12.2 9L10.2 7H14V3H16V7C17 7 18 8 18 9V14.5L17.85 14.65L16 12.8V9.09C16 9.06 15.95 9 15.92 9H12.2M10 6.8L8 4.8V3H10V6.8Z",bed:"M7 14C8.66 14 10 12.66 10 11C10 9.34 8.66 8 7 8C5.34 8 4 9.34 4 11C4 12.66 5.34 14 7 14M7 10C7.55 10 8 10.45 8 11C8 11.55 7.55 12 7 12C6.45 12 6 11.55 6 11C6 10.45 6.45 10 7 10M19 7H11V15H3V5H1V20H3V17H21V20H23V11C23 8.79 21.21 7 19 7M21 15H13V9H19C20.1 9 21 9.9 21 11Z",garden:"M10.5,3C8,3 6,5 6,7.5C6,8.11 6.13,8.71 6.37,9.27C5.5,10.12 5,11.28 5,12.5C5,15 7,17 9.5,17C10,17 10.5,16.89 11,16.72V21H13V15.77C13.5,15.91 14,16 14.5,16A5.5,5.5 0 0,0 20,10.5A5.5,5.5 0 0,0 14.5,5C14.41,5 14.33,5 14.24,5C13.41,3.76 12,3 10.5,3M10.5,5C11.82,5 12.91,6.03 13,7.35C13.46,7.12 14,7 14.5,7A3.5,3.5 0 0,1 18,10.5A3.5,3.5 0 0,1 14.5,14C13.54,14 12.63,13.61 11.96,12.91C11.76,14.12 10.72,15 9.5,15A2.5,2.5 0 0,1 7,12.5C7,11.12 7.8,10.54 9,9.79C8.2,8.76 8,8.16 8,7.5A2.5,2.5 0 0,1 10.5,5Z",car:"M18.9 6C18.7 5.4 18.1 5 17.5 5H6.5C5.8 5 5.3 5.4 5.1 6L3 12V20C3 20.5 3.5 21 4 21H5C5.6 21 6 20.5 6 20V19H18V20C18 20.5 18.5 21 19 21H20C20.5 21 21 20.5 21 20V12L18.9 6M6.8 7H17.1L18.2 10H5.8L6.8 7M19 17H5V12H19V17M7.5 13C8.3 13 9 13.7 9 14.5S8.3 16 7.5 16 6 15.3 6 14.5 6.7 13 7.5 13M16.5 13C17.3 13 18 13.7 18 14.5S17.3 16 16.5 16C15.7 16 15 15.3 15 14.5S15.7 13 16.5 13Z",lamp:"M15 2L17 9H7L9 2M13.6 4H10.4L9.55 7H14.45M11 10H13V20H16V22H8V20H11Z",calendar:"M7 11H9V13H7V11M21 5V19C21 20.11 20.11 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H6V1H8V3H16V1H18V3H19C20.11 3 21 3.9 21 5M5 7H19V5H5V7M19 19V9H5V19H19M15 13V11H17V13H15M11 13V11H13V13H11M7 15H9V17H7V15M15 17V15H17V17H15M11 17V15H13V17H11Z",message:"M20,2A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H6L2,22V4C2,2.89 2.9,2 4,2H20M4,4V17.17L5.17,16H20V4H4M6,7H18V9H6V7M6,11H15V13H6V11Z",person:"M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,6A2,2 0 0,0 10,8A2,2 0 0,0 12,10A2,2 0 0,0 14,8A2,2 0 0,0 12,6M12,13C14.67,13 20,14.33 20,17V20H4V17C4,14.33 9.33,13 12,13M12,14.9C9.03,14.9 5.9,16.36 5.9,17V18.1H18.1V17C18.1,16.36 14.97,14.9 12,14.9Z",family:"M12,5A3.5,3.5 0 0,0 8.5,8.5A3.5,3.5 0 0,0 12,12A3.5,3.5 0 0,0 15.5,8.5A3.5,3.5 0 0,0 12,5M12,7A1.5,1.5 0 0,1 13.5,8.5A1.5,1.5 0 0,1 12,10A1.5,1.5 0 0,1 10.5,8.5A1.5,1.5 0 0,1 12,7M5.5,8A2.5,2.5 0 0,0 3,10.5C3,11.44 3.53,12.25 4.29,12.68C4.65,12.88 5.06,13 5.5,13C5.94,13 6.35,12.88 6.71,12.68C7.08,12.47 7.39,12.17 7.62,11.81C6.89,10.86 6.5,9.7 6.5,8.5C6.5,8.41 6.5,8.31 6.5,8.22C6.2,8.08 5.86,8 5.5,8M18.5,8C18.14,8 17.8,8.08 17.5,8.22C17.5,8.31 17.5,8.41 17.5,8.5C17.5,9.7 17.11,10.86 16.38,11.81C16.5,12 16.63,12.15 16.78,12.3C16.94,12.45 17.1,12.58 17.29,12.68C17.65,12.88 18.06,13 18.5,13C18.94,13 19.35,12.88 19.71,12.68C20.47,12.25 21,11.44 21,10.5A2.5,2.5 0 0,0 18.5,8M12,14C9.66,14 5,15.17 5,17.5V19H19V17.5C19,15.17 14.34,14 12,14M4.71,14.55C2.78,14.78 0,15.76 0,17.5V19H3V17.07C3,16.06 3.69,15.22 4.71,14.55M19.29,14.55C20.31,15.22 21,16.06 21,17.07V19H24V17.5C24,15.76 21.22,14.78 19.29,14.55M12,16C13.53,16 15.24,16.5 16.23,17H7.77C8.76,16.5 10.47,16 12,16Z",star:Tt,water:"M12,3.77L11.25,4.61C11.25,4.61 9.97,6.06 8.68,7.94C7.39,9.82 6,12.07 6,14.23A6,6 0 0,0 12,20.23A6,6 0 0,0 18,14.23C18,12.07 16.61,9.82 15.32,7.94C14.03,6.06 12.75,4.61 12.75,4.61L12,3.77M12,6.9C12.44,7.42 12.84,7.85 13.68,9.07C14.89,10.83 16,13.07 16,14.23C16,16.45 14.22,18.23 12,18.23C9.78,18.23 8,16.45 8,14.23C8,13.07 9.11,10.83 10.32,9.07C11.16,7.85 11.56,7.42 12,6.9Z","water-alert":It,leak:It,"alarm-light":"M6,6.9L3.87,4.78L5.28,3.37L7.4,5.5L6,6.9M13,1V4H11V1H13M20.13,4.78L18,6.9L16.6,5.5L18.72,3.37L20.13,4.78M4.5,10.5V12.5H1.5V10.5H4.5M19.5,10.5H22.5V12.5H19.5V10.5M6,20H18A2,2 0 0,1 20,22H4A2,2 0 0,1 6,20M12,5A6,6 0 0,1 18,11V19H6V11A6,6 0 0,1 12,5M12,7A4,4 0 0,0 8,11V17H16V11A4,4 0 0,0 12,7Z",paw:"M22.83 8.25C22.56 7.5 22.05 6.96 21.4 6.68C20.23 6.18 18.81 6.6 17.7 7.66C17.81 7.37 17.91 7.06 18 6.73C18.25 5.38 18.03 4.03 17.38 3.12C16.95 2.5 16.33 2.11 15.64 2C14.1 1.78 12.57 3.08 11.93 5C11.29 3.05 9.74 1.76 8.19 2C7.5 2.12 6.88 2.53 6.45 3.16C5.81 4.09 5.61 5.39 5.89 6.74C5.94 7 6 7.24 6.09 7.47C5 6.56 3.7 6.2 2.6 6.68C1.94 6.97 1.44 7.53 1.17 8.27C.794 9.31 .92 10.58 1.5 11.77C2.34 13.4 3.82 14.41 5.21 14.41C5.57 14.41 5.93 14.34 6.27 14.2C6.93 13.91 7.44 13.35 7.71 12.63C8.03 11.79 8 10.77 7.64 9.76C8.19 10.19 8.81 10.45 9.45 10.45C9.57 10.45 9.7 10.44 9.82 10.42C10.5 10.32 11.12 9.92 11.55 9.3C11.7 9.08 11.83 8.84 11.93 8.58C12.03 8.84 12.15 9.08 12.3 9.29C12.73 9.91 13.35 10.31 14.04 10.42C14.16 10.44 14.29 10.45 14.41 10.45C15.13 10.45 15.83 10.12 16.43 9.57C16 10.64 15.96 11.73 16.29 12.63C16.56 13.36 17.07 13.91 17.73 14.2C18.07 14.34 18.43 14.41 18.8 14.41C20.18 14.41 21.66 13.4 22.5 11.77C23.08 10.58 23.21 9.3 22.83 8.25M5.84 11.93C5.72 12.26 5.53 12.34 5.47 12.36C4.92 12.6 3.88 12 3.3 10.87C2.9 10.06 2.91 9.35 3.05 8.94C3.13 8.73 3.25 8.58 3.4 8.5C3.5 8.5 3.58 8.46 3.68 8.46C4.26 8.46 5.1 9.03 5.6 10C5.93 10.68 6.03 11.43 5.84 11.93M9.91 8.16C9.79 8.32 9.66 8.42 9.5 8.44C9 8.5 8.14 7.73 7.85 6.34C7.65 5.38 7.85 4.66 8.1 4.29C8.22 4.12 8.36 4 8.5 4C9 3.91 9.88 4.69 10.16 6.1C10.36 7.07 10.16 7.8 9.91 8.16M16 6.33C15.72 7.73 14.83 8.5 14.34 8.44C14.28 8.43 14.12 8.41 13.94 8.15C13.69 7.79 13.5 7.07 13.7 6.1C13.97 4.76 14.8 4 15.29 4C15.32 4 15.34 4 15.36 4C15.5 4 15.63 4.11 15.75 4.27C16.07 4.73 16.18 5.54 16 6.33M20.7 10.87C20.12 12 19.08 12.6 18.53 12.36C18.47 12.34 18.28 12.26 18.16 11.93C18 11.43 18.07 10.68 18.39 10C18.9 9.04 19.75 8.47 20.33 8.47C20.43 8.47 20.5 8.5 20.6 8.5H20.61C20.76 8.58 20.87 8.72 20.95 8.94C21.1 9.34 21.11 10.06 20.7 10.87M16.3 14.5C14.95 13.05 13.89 10.44 11.89 10.44C9.88 10.44 8.88 13.09 7.47 14.5C6.41 15.59 4.62 16.39 4.44 17.88C4.31 18.96 5 20.26 6 20.75C6.35 20.93 6.72 21 7.1 21C8.61 21 10.3 19.87 11.89 19.87C13.5 19.87 15.18 20.97 16.71 20.97C17.08 20.97 17.44 20.91 17.79 20.75C18.65 20.36 19.37 19.32 19.33 18.38C19.26 16.75 17.41 15.72 16.3 14.5M16.96 18.93C16.92 18.95 16.85 18.97 16.71 18.97C16.29 18.97 15.63 18.75 15 18.54C14.08 18.23 13.03 17.87 11.89 17.87C10.75 17.87 9.7 18.24 8.78 18.56C8.15 18.77 7.5 19 7.1 19C6.97 19 6.92 19 6.88 18.95C6.66 18.84 6.4 18.37 6.43 18.12C6.5 17.89 7.23 17.31 7.59 17C8.03 16.68 8.5 16.33 8.89 15.91C9.44 15.36 9.89 14.73 10.33 14.12C10.78 13.5 11.53 12.44 11.89 12.44C12.29 12.44 13.08 13.56 13.56 14.22C13.95 14.78 14.36 15.35 14.82 15.85C15.21 16.27 15.62 16.64 16 17C16.54 17.45 17.32 18.14 17.33 18.44C17.32 18.58 17.12 18.86 16.96 18.93Z",automation:"M10.5 15.5C10.5 15.87 10.4 16.2 10.22 16.5C9.88 15.91 9.24 15.5 8.5 15.5S7.12 15.91 6.78 16.5C6.61 16.2 6.5 15.87 6.5 15.5C6.5 14.4 7.4 13.5 8.5 13.5S10.5 14.4 10.5 15.5M23 15V18C23 18.55 22.55 19 22 19H21V20C21 21.11 20.11 22 19 22H5C3.9 22 3 21.11 3 20V19H2C1.45 19 1 18.55 1 18V15C1 14.45 1.45 14 2 14H3C3 10.13 6.13 7 10 7H11V5.73C10.4 5.39 10 4.74 10 4C10 2.9 10.9 2 12 2S14 2.9 14 4C14 4.74 13.6 5.39 13 5.73V7H14C17.87 7 21 10.13 21 14H22C22.55 14 23 14.45 23 15M21 16H19V14C19 11.24 16.76 9 14 9H10C7.24 9 5 11.24 5 14V16H3V17H5V20H19V17H21V16M15.5 13.5C14.4 13.5 13.5 14.4 13.5 15.5C13.5 15.87 13.61 16.2 13.78 16.5C14.12 15.91 14.76 15.5 15.5 15.5S16.88 15.91 17.22 16.5C17.4 16.2 17.5 15.87 17.5 15.5C17.5 14.4 16.61 13.5 15.5 13.5Z",guests:"M5,15L4.4,14.5C2.4,12.6 1,11.4 1,9.9C1,8.7 2,7.7 3.2,7.7C3.9,7.7 4.6,8 5,8.5C5.4,8 6.1,7.7 6.8,7.7C8,7.7 9,8.6 9,9.9C9,11.4 7.6,12.6 5.6,14.5L5,15M15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4M15,10.1A2.1,2.1 0 0,1 12.9,8A2.1,2.1 0 0,1 15,5.9C16.16,5.9 17.1,6.84 17.1,8C17.1,9.16 16.16,10.1 15,10.1M15,13C12.33,13 7,14.33 7,17V20H23V17C23,14.33 17.67,13 15,13M21.1,18.1H8.9V17C8.9,16.36 12,14.9 15,14.9C17.97,14.9 21.1,16.36 21.1,17V18.1Z",assistant:"M9 4L11.5 9.5L17 12L11.5 14.5L9 20L6.5 14.5L1 12L6.5 9.5L9 4M9 8.83L8 11L5.83 12L8 13L9 15.17L10 13L12.17 12L10 11L9 8.83M19 9L17.74 6.26L15 5L17.74 3.75L19 1L20.25 3.75L23 5L20.25 6.26L19 9M19 23L17.74 20.26L15 19L17.74 17.75L19 15L20.25 17.75L23 19L20.25 20.26L19 23Z",microphone:"M17.3,11C17.3,14 14.76,16.1 12,16.1C9.24,16.1 6.7,14 6.7,11H5C5,14.41 7.72,17.23 11,17.72V21H13V17.72C16.28,17.23 19,14.41 19,11M10.8,4.9C10.8,4.24 11.34,3.7 12,3.7C12.66,3.7 13.2,4.24 13.2,4.9L13.19,11.1C13.19,11.76 12.66,12.3 12,12.3C11.34,12.3 10.8,11.76 10.8,11.1M12,14A3,3 0 0,0 15,11V5A3,3 0 0,0 12,2A3,3 0 0,0 9,5V11A3,3 0 0,0 12,14Z","book-open-variant":"M12 21.5C10.65 20.65 8.2 20 6.5 20C4.85 20 3.15 20.3 1.75 21.05C1.65 21.1 1.6 21.1 1.5 21.1C1.25 21.1 1 20.85 1 20.6V6C1.6 5.55 2.25 5.25 3 5C4.11 4.65 5.33 4.5 6.5 4.5C8.45 4.5 10.55 4.9 12 6C13.45 4.9 15.55 4.5 17.5 4.5C18.67 4.5 19.89 4.65 21 5C21.75 5.25 22.4 5.55 23 6V20.6C23 20.85 22.75 21.1 22.5 21.1C22.4 21.1 22.35 21.1 22.25 21.05C20.85 20.3 19.15 20 17.5 20C15.8 20 13.35 20.65 12 21.5M11 7.5C9.64 6.9 7.84 6.5 6.5 6.5C5.3 6.5 4.1 6.65 3 7V18.5C4.1 18.15 5.3 18 6.5 18C7.84 18 9.64 18.4 11 19V7.5M13 19C14.36 18.4 16.16 18 17.5 18C18.7 18 19.9 18.15 21 18.5V7C19.9 6.65 18.7 6.5 17.5 6.5C16.16 6.5 14.36 6.9 13 7.5V19M14 16.35C14.96 16 16.12 15.83 17.5 15.83C18.54 15.83 19.38 15.91 20 16.07V14.57C19.13 14.41 18.29 14.33 17.5 14.33C16.16 14.33 15 14.5 14 14.76V16.35M14 13.69C14.96 13.34 16.12 13.16 17.5 13.16C18.54 13.16 19.38 13.24 20 13.4V11.9C19.13 11.74 18.29 11.67 17.5 11.67C16.22 11.67 15.05 11.82 14 12.12V13.69M14 11C14.96 10.67 16.12 10.5 17.5 10.5C18.41 10.5 19.26 10.59 20 10.78V9.23C19.13 9.08 18.29 9 17.5 9C16.18 9 15 9.15 14 9.46V11Z",floors:"M12 16.54L19.37 10.8L21 12.07L12 19.07L3 12.07L4.62 10.81L12 16.54M12 14L3 7L12 0L21 7L12 14M12 2.53L6.26 7L12 11.47L17.74 7L12 2.53M12 21.47L19.37 15.73L21 17L12 24L3 17L4.62 15.74L12 21.47",layers:"M12,18.54L19.37,12.8L21,14.07L12,21.07L3,14.07L4.62,12.81L12,18.54M12,16L3,9L12,2L21,9L12,16M12,4.53L6.26,9L12,13.47L17.74,9L12,4.53Z",movie:"M20.84 2.18L16.91 2.96L19.65 6.5L21.62 6.1L20.84 2.18M13.97 3.54L12 3.93L14.75 7.46L16.71 7.07L13.97 3.54M9.07 4.5L7.1 4.91L9.85 8.44L11.81 8.05L9.07 4.5M4.16 5.5L3.18 5.69C2.1 5.9 1.39 6.96 1.61 8.04L2 10L6.9 9.03L4.16 5.5M20 12V20H4V12H20M22 10H2V20C2 21.11 2.9 22 4 22H20C21.11 22 22 21.11 22 20V10Z",bullhorn:"M12,8H4A2,2 0 0,0 2,10V14A2,2 0 0,0 4,16H5V20A1,1 0 0,0 6,21H8A1,1 0 0,0 9,20V16H12L17,20V4L12,8M15,15.6L13,14H4V10H13L15,8.4V15.6M21.5,12C21.5,13.71 20.54,15.26 19,16V8C20.53,8.75 21.5,10.3 21.5,12Z",wrench:"M22.61,19L13.53,9.91C14.46,7.57 14,4.81 12.09,2.91C9.79,0.61 6.21,0.4 3.66,2.26L7.5,6.11L6.08,7.5L2.25,3.69C0.39,6.23 0.6,9.82 2.9,12.11C4.76,13.97 7.47,14.46 9.79,13.59L18.9,22.7C19.29,23.09 19.92,23.09 20.31,22.7L22.61,20.4C23,20 23,19.39 22.61,19M19.61,20.59L10.15,11.13C9.54,11.58 8.86,11.85 8.15,11.95C6.79,12.15 5.36,11.74 4.32,10.7C3.37,9.76 2.93,8.5 3,7.26L6.09,10.35L10.33,6.11L7.24,3C8.5,2.95 9.73,3.39 10.68,4.33C11.76,5.41 12.17,6.9 11.92,8.29C11.8,9 11.5,9.66 11.04,10.25L20.5,19.7L19.61,20.59Z",dashboard:"M19,5V7H15V5H19M9,5V11H5V5H9M19,13V19H15V13H19M9,17V19H5V17H9M21,3H13V9H21V3M11,3H3V13H11V3M21,11H13V21H21V11M11,15H3V21H11V15Z",flash:"M7,2H17L13.5,9H17L10,22V14H7V2M9,4V12H12V14.66L14,11H10.24L13.76,4H9Z","toggle-on":"M17 6H7C3.69 6 1 8.69 1 12S3.69 18 7 18H17C20.31 18 23 15.31 23 12S20.31 6 17 6M17 16H7C4.79 16 3 14.21 3 12S4.79 8 7 8H17C19.21 8 21 9.79 21 12S19.21 16 17 16M17 9C15.34 9 14 10.34 14 12S15.34 15 17 15 20 13.66 20 12 18.66 9 17 9Z"};let li=class extends ct{constructor(){super(...arguments),this.icon=""}render(){const t=this.icon.replace(/^mdi:/,""),e=Bt[this.icon]??Bt[t];if(e){const i=oi[t];return Z`<svg class="mono" viewBox="0 0 24 24" aria-hidden="true">${F`<path d=${e}></path>`}</svg>
        <svg class="duo" viewBox="0 0 24 24" aria-hidden="true">
          ${i?F`<path class="back" d=${e}></path><path d=${i}></path>`:F`<path class="halo" d=${e}></path><path d=${e}></path>`}
        </svg>`}return this.icon.startsWith("mdi:")&&customElements.get("ha-icon")?Z`<ha-icon .icon=${this.icon}></ha-icon>`:this.icon?Z`<svg viewBox="0 0 24 24" aria-hidden="true">${F`<path d=${Bt.grid}></path>`}</svg>`:q}};li.styles=o`
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
      grid-area: 1 / 1;
    }
    .mono {
      display: var(--mono-on, block);
    }
    .duo {
      display: var(--duo-on, none);
      overflow: visible;
    }
    .duo .back {
      opacity: var(--duo-fill, 0.3);
      transition: opacity 400ms cubic-bezier(0.22, 1, 0.36, 1);
    }
    .duo .halo {
      fill: none;
      stroke: currentColor;
      stroke-width: 2.6;
      stroke-linejoin: round;
      opacity: calc(var(--duo-fill, 0.3) * 0.55);
      filter: blur(1.2px);
    }
    ha-icon {
      --mdc-icon-size: var(--icon-size, 24px);
    }
  `,ri([gt()],li.prototype,"icon",2),li=ri([pt("sn-icon")],li);var ci=Object.defineProperty,di=Object.getOwnPropertyDescriptor,pi=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?di(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&ci(e,i,n),n};const hi=[{id:"away",icon:"leave",label:"mode_away"},{id:"home",icon:"entrance",label:"mode_home"},{id:"sleep",icon:"night",label:"mode_sleep"},{id:"evening",icon:"lamp",label:"mode_evening"}],ui="input_select.house_mode",gi=t=>`script.smartnest_mode_${t}`;let mi=class extends ct{run(t){this.ctx.editing||(navigator.vibrate?.(10),this.ctx.hass.callService("script","turn_on",{entity_id:gi(t)}).catch((()=>this.ctx.toast(this.ctx.t("error")))),this.ctx.cinematic(t))}render(){const{ctx:t}=this,e=hi.filter((e=>t.hass.states[gi(e.id)]));if(!e.length)return t.isAdmin?Z`<div class="missing glass">${t.t("modes_missing")}</div>`:q;const i=t.hass.states[ui]?.state;return Z`<div class="row">
      ${e.map((e=>Z`<button class="glass pressable" aria-pressed=${i===e.id} @click=${()=>this.run(e.id)}>
          <span class="ic"><sn-icon .icon=${e.icon}></sn-icon></span>${t.t(e.label)}
        </button>`))}
    </div>`}};async function fi(t,e){try{return(await t.callWS({type:"smartnest/kv/get",key:e})).value??void 0}catch{return}}mi.styles=[si,o`
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
    `],pi([gt({attribute:!1})],mi.prototype,"ctx",2),pi([gt({attribute:!1})],mi.prototype,"widget",2),mi=pi([pt("sn-w-modes")],mi);const bi=(t,e,i)=>t.callWS({type:"smartnest/kv/set",key:e,value:i});function _i(t,e,i){return t.connection.subscribeMessage((t=>i(t.value)),{type:"smartnest/kv/subscribe",key:e})}const yi=t=>{const[e,i]=t.split(":").map(Number);return 60*(e||0)+(i||0)},vi=(t,e,i)=>{const s=yi(e),a=yi(i);return s<=a?t>=s&&t<a:t>=s||t<a};function xi(t,e=new Date){if(!t?.enabled)return;const i=60*e.getHours()+e.getMinutes();return vi(i,t.peak_from,t.peak_to)?"peak":vi(i,t.cheap_from,t.cheap_to)?"cheap":void 0}function wi(t){const e=new Date,[i,s]=t.cheap_from.split(":").map(Number);return e.setHours(i,s,0,0),e.getTime()<=Date.now()&&e.setDate(e.getDate()+1),Math.floor(e.getTime()/1e3)}const $i=[{id:"mode",label:"widget_modes"},{id:"alert",label:"chip_t_alert"},{id:"unlocked",label:"chip_t_unlocked"},{id:"open",label:"chip_t_open"},{id:"lights",label:"chip_t_lights"},{id:"climate",label:"chip_t_climate"},{id:"motion",label:"chip_t_motion"},{id:"power",label:"chip_t_power"},{id:"package",label:"chip_t_package"},{id:"travel",label:"travel"},{id:"appliance",label:"h_appliances"},{id:"arrival",label:"h_arrival"},{id:"outage",label:"h_outage"},{id:"tou",label:"tou"}];function ki(t){const e=new Set;for(const i of t.pages)for(const t of i.widgets){t.config.entity&&e.add(t.config.entity);for(const i of t.config.floors??[])for(const t of i.markers??[])e.add(t.entity)}return[...e]}const Ci=t=>t.attributes.device_class,Mi=(t,e,i,s,a={})=>1===s.length?t(e,a):t(i,{n:s.length,...a});function Ai(t){const{hass:e,t:i,config:s}=t,a=new Set(s.settings.chips_hidden),n=ki(s).filter((t=>e.states[t])),r=t=>e.states[t],o=t=>n.filter((e=>t(r(e)))),l=[];"on"===e.states["switch.smartnest_travel_mode"]?.state&&t.allows("travel")&&l.push({type:"travel",icon:"airplane",label:i("travel_on"),tone:"accent",entities:[]});const c=Object.values(e.states).filter((t=>{const e=t.entity_id;return!!/package|parcel/.test(e)&&(e.startsWith("binary_sensor.")&&"on"===t.state||e.startsWith("sensor.")&&Number(t.state)>0)}));c.length&&t.allows("package")&&l.push({type:"package",icon:"package",label:i("chip_package"),tone:"accent",entities:c.map((t=>t.entity_id))});const d=s.settings.outage?.sensor?e.states[s.settings.outage.sensor]:void 0;if(d&&t.allows("home_helpers")){const t=Number(d.state);("binary_sensor"===Xt(d.entity_id)?"off"===d.state:!Number.isNaN(t)&&t<(s.settings.outage.below??50))&&l.push({type:"outage",icon:"power-plug-off",label:i("chip_outage"),tone:"alert",entities:[d.entity_id]})}for(const w of s.settings.appliances??[]){const s=Number(e.states[w.power]?.state);!Number.isNaN(s)&&s>=(w.start_w??15)&&t.allows("home_helpers")&&l.push({type:"appliance",icon:"washing-machine",label:i("chip_running",{name:w.name}),tone:"neutral",entities:[w.power]})}if(t.allows("home_helpers"))for(const w of Object.values(e.states).filter((t=>t.entity_id.endsWith("_direction_of_travel")&&"towards"===t.state))){const t=w.entity_id.replace(/_direction_of_travel$/,""),s=e.states[`${t}_distance`],a=Number(s?.state)/("m"===s?.attributes.unit_of_measurement?1e3:1);if(!s||Number.isNaN(a)||a>40||a<.3)continue;const n=Object.values(e.states).find((e=>e.entity_id.startsWith("person.")&&t.endsWith(e.entity_id.split(".")[1]))),r=n?.attributes.friendly_name??String(s.attributes.friendly_name??"").replace(/distance|home|المسافة/gi,"").trim();l.push({type:"arrival",icon:"car",label:i("chip_arriving",{name:r,n:Math.max(1,Math.round(a/.6))}),tone:"cool",entities:[s.entity_id]})}const p=t.allows("tou")?xi(s.settings.tou):void 0;p&&l.push({type:"tou",icon:"peak"===p?"lightning-bolt":"weather-night",label:i("peak"===p?"chip_peak":"chip_cheap"),tone:"peak"===p?"alert":"cool",entities:[]});const h=e.states[ui]?.state,u=hi.find((t=>t.id===h));u&&e.states[gi(u.id)]&&l.push({type:"mode",icon:u.icon,label:i(u.label),tone:"accent",entities:[]});const g=o((t=>"binary_sensor"===Xt(t.entity_id)&&"on"===t.state&&["moisture","smoke","gas","carbon_monoxide","problem","safety"].includes(Ci(t)??"")));g.length&&l.push({type:"alert",icon:"alert-circle-outline",label:1===g.length?Kt(e,s,g[0]):i("chip_alert"),tone:"alert",entities:g});const m=o((t=>"lock"===Xt(t.entity_id)&&("unlocked"===t.state||"open"===t.state||"jammed"===t.state)));m.length&&l.push({type:"unlocked",icon:"lock-open",label:Mi(i,"chip_unlocked_1","chip_unlocked_n",m),tone:"alert",entities:m,bulk:"lock"});const f=o((t=>{const e=Xt(t.entity_id);return"cover"===e?"open"===t.state&&["door","window","garage","gate"].includes(Ci(t)??""):"binary_sensor"===e&&"on"===t.state&&["door","window","opening","garage_door"].includes(Ci(t)??"")}));f.length&&l.push({type:"open",icon:"door-open",label:Mi(i,"chip_open_1","chip_open_n",f),tone:"accent",entities:f});const b=o((t=>"light"===Xt(t.entity_id)&&"on"===t.state));b.length&&l.push({type:"lights",icon:"lightbulb",label:Mi(i,"chip_lights_1","chip_lights_n",b),tone:"accent",entities:b,bulk:"off"});const _=o((t=>"climate"===Xt(t.entity_id)&&"off"!==t.state&&"unavailable"!==t.state));if(_.length){const e=r(_[0]).attributes.temperature,s={temp:"number"==typeof e?se(`${ae(e,t.lang)}°`):""};l.push({type:"climate",icon:"air-conditioner",label:Mi(i,"chip_climate_1","chip_climate_n",_,s),tone:"cool",entities:_,bulk:"off"})}const y=o((t=>"binary_sensor"===Xt(t.entity_id)&&"on"===t.state&&["motion","occupancy","presence"].includes(Ci(t)??"")));y.length&&l.push({type:"motion",icon:"motion-sensor",label:1===y.length?Kt(e,s,y[0]):i("chip_motion"),tone:"accent",entities:y});const v=s.settings.power_entity??n.find((t=>"power"===Ci(r(t))&&ce(r(t)))),x=v?e.states[v]:void 0;return x&&ce(x)&&l.push({type:"power",icon:"lightning-bolt",label:re(i,x,t.lang),tone:"neutral",entities:[x.entity_id]}),l.filter((t=>!a.has(t.type)))}const Hi="smartnest-kiosk";function Li(){try{return"1"===localStorage.getItem(Hi)}catch{return!1}}function Vi(t,e){let i=2166136261;const s=`${e}:${t}`;for(let a=0;a<2e3;a++){for(let t=0;t<s.length;t++)i^=s.charCodeAt(t),i=Math.imul(i,16777619)>>>0;i^=a}return i.toString(16).padStart(8,"0")}function Si(t){const e=function(){const t=document.querySelector("home-assistant")?.shadowRoot?.querySelector("home-assistant-main");return t?.shadowRoot??null}();if(!e)return;let i=e.getElementById("smartnest-kiosk");t&&!i?(i=document.createElement("style"),i.id="smartnest-kiosk",i.textContent=":host { --mdc-drawer-width: 0px !important; } ha-sidebar { display: none !important; }",e.appendChild(i)):t||i?.remove()}let zi;const Di=[["screen","switch",/(^|_)screen$/],["brightness","number",/screen_brightness$/],["motion","switch",/motion_detection$/],["media","media_player",/.*/]];function Oi(t){const e=new Map;for(const i of Object.values(t.entities??{})){if("fully_kiosk"!==i.platform||!i.device_id)continue;let s=e.get(i.device_id);s||(s={deviceId:i.device_id,name:t.devices?.[i.device_id]?.name??"Tablet"},e.set(i.device_id,s));const[a,n]=i.entity_id.split("."),r=i.translation_key??n;for(const[t,e,o]of Di)if(a===e&&!s[t]&&(o.test(r)||o.test(n))){s[t]=i.entity_id;break}}return[...e.values()]}function ji(t){const e=window.fully;if(!e)return;const i=Oi(t),s=e.getDeviceId?.();if(s){const e=i.find((e=>t.devices?.[e.deviceId]?.identifiers?.some((([t,e])=>"fully_kiosk"===t&&e===s))));if(e)return e}return 1===i.length?i[0]:void 0}async function Ti(t,e,i){if(!e.brightness)return;const s=(t=>Math.round(Math.min(100,Math.max(1,t))/100*255))(i);Math.abs(Number(t.states[e.brightness]?.state)-s)<=3||await t.callService("number","set_value",{entity_id:e.brightness,value:s})}async function Pi(t,e,i){e.screen&&"on"===t.states[e.screen]?.state!==i&&await t.callService("switch",i?"turn_on":"turn_off",{entity_id:e.screen})}var Ni=Object.defineProperty,Ii=Object.getOwnPropertyDescriptor,Wi=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?Ii(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&Ni(e,i,n),n};const Ei=(t,e)=>{const i=e?t.states[e]:void 0,s=Number(i?.state);if(!i||Number.isNaN(s))return;const a=i.attributes.unit_of_measurement;return"kW"===a?1e3*s:"MW"===a?1e6*s:s};function Ri(t){const e=Object.values(t.states).filter((t=>t.entity_id.startsWith("sensor.")&&"power"===t.attributes.device_class)),i=t=>e.find((e=>t.test(e.entity_id)))?.entity_id,s=Object.values(t.states).find((t=>t.entity_id.startsWith("sensor.")&&"battery"===t.attributes.device_class&&/(home|house|storage|inverter|powerwall)_?battery|battery_(soc|level|state_of_charge)/.test(t.entity_id)))?.entity_id;return{solar:i(/solar|pv/),grid:i(/grid/),battery:i(/battery_power|battery/),soc:s,home:i(/home_power|house|load|consumption/)}}const Bi={solar:{x:150,y:46},grid:{x:46,y:150},home:{x:254,y:150},battery:{x:150,y:254}},Zi={solar:"#E9971D",grid:"#18BCF2",battery:"#2FB57A",home:"var(--text)"};let Fi=class extends ct{get cfg(){const t=this.widget.config;return t.solar||t.grid||t.battery?t:{...Ri(this.ctx.hass),...t}}edge(t,e,i,s,a){const n=Math.abs(s??0),r=`M${e.x} ${e.y} L${i.x} ${i.y}`,o=void 0!==s&&n>=10,l=Math.max(.9,5-1.1*Math.log10(Math.max(n,10))),c=o?Math.min(5,2+Math.floor(Math.log10(n))):0,d=(s??0)<0;return F`<path id=${t} class="line" d=${r}></path>
      ${Array.from({length:c},((e,i)=>F`<circle class="dot" r="4.5" fill=${a} style="filter:drop-shadow(0 0 4px ${a})">
          <animateMotion dur="${l}s" repeatCount="indefinite" begin="${-l/c*i}s"
            keyPoints=${d?"1;0":"0;1"} keyTimes="0;1" calcMode="linear">
            <mpath href="#${t}"></mpath>
          </animateMotion>
        </circle>`))}`}node(t,e,i,s,a){const n=Bi[t],r=Zi[t];return F`<g>
      <circle class="node" cx=${n.x} cy=${n.y} r="38" stroke=${r}></circle>
      <foreignObject x=${n.x-13} y=${n.y-30} width="26" height="26">
        <sn-icon .icon=${e} style="--icon-size:26px;color:${"var(--text)"===r?"var(--text-2)":r}"></sn-icon>
      </foreignObject>
      <text class="val" x=${n.x} y=${n.y+13}>${s}</text>
      <text class="lbl" x=${n.x} y=${n.y+54}>${a?`${i} · ${a}`:i}</text>
    </g>`}render(){const{ctx:t}=this,{hass:e,t:i}=t,s=this.cfg,a=Ei(e,s.solar);let n=Ei(e,s.grid),r=Ei(e,s.battery);void 0!==n&&s.flip_grid&&(n=-n),void 0!==r&&s.flip_battery&&(r=-r);const o=Ei(e,s.home)??(a??0)+(n??0)-(r??0),l=s.soc?e.states[s.soc]?.state:void 0,c=e=>void 0===e?"–":se(Math.abs(e)>=1e3?`${ae(Math.abs(e)/1e3,t.lang,1)} kW`:`${ae(Math.abs(e),t.lang,0)} W`);return Z`<div class="wrap glass">
      <svg viewBox="0 0 300 310" role="img" aria-label=${i("widget_energy")}>
        ${s.solar?this.edge("e-solar",Bi.solar,Bi.home,a,Zi.solar):q}
        ${s.grid?this.edge("e-grid",Bi.grid,Bi.home,n,Zi.grid):q}
        ${s.battery?this.edge("e-bat",Bi.battery,Bi.home,void 0===r?void 0:-r,Zi.battery):q}
        ${s.solar?this.node("solar","solar",i("e_solar"),c(a)):q}
        ${s.grid?this.node("grid","tower",i("e_grid"),c(n)):q}
        ${s.battery?this.node("battery","battery",i("e_battery"),c(r),l&&!Number.isNaN(Number(l))?se(`${Math.round(Number(l))}%`):void 0):q}
        ${this.node("home","home",i("e_home"),c(o))}
      </svg>
      ${(()=>{const e=(a??0)-o;return void 0!==a&&e>=1200&&t.allows("solar_tip")?Z`<div class="tip" role="status"><sn-icon icon="solar" style="--icon-size:18px"></sn-icon>${i("solar_tip",{kw:c(e)})}</div>`:q})()}
    </div>`}};Fi.styles=[si,o`
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
      .wrap {
        position: relative;
      }
      .tip {
        position: absolute;
        inset-inline: 12px;
        bottom: 12px;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        border-radius: 999px;
        font-size: 13px;
        font-weight: 600;
        background: color-mix(in srgb, #f5b301 22%, var(--surface-solid));
        color: var(--text);
        animation: tip-in 500ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      @keyframes tip-in {
        from {
          opacity: 0;
          transform: translateY(8px);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .tip {
          animation: none;
        }
        .dot {
          display: none;
        }
      }
    `],Wi([gt({attribute:!1})],Fi.prototype,"ctx",2),Wi([gt({attribute:!1})],Fi.prototype,"widget",2),Fi=Wi([pt("sn-w-energy")],Fi);const Ui=t=>Object.keys(t.states).find((t=>t.startsWith("ai_task.")));async function qi(t,e,i={}){const s=Ui(t.hass);if(s)try{return(await t.hass.callWS({type:"smartnest/ai/ask",task:e,entity_id:s,lang:t.lang,...i})).text||void 0}catch{return}}function Yi(t,e){if(!t)return;const i="["===e?"]":"}",s=t.indexOf(e),a=t.lastIndexOf(i);if(!(s<0||a<s))try{return JSON.parse(t.slice(s,a+1))}catch{return}}var Xi=Object.defineProperty,Ki=Object.getOwnPropertyDescriptor,Ji=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?Ki(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&Xi(e,i,n),n};const Gi=["hs","rgb","rgbw","rgbww","xy"];let Qi=class extends ct{constructor(){super(...arguments),this.lights=[],this.busy=!1,this.said=""}createRenderRoot(){return this}render(){const{t:t}=this.ctx;return Ui(this.ctx.hass)&&this.ctx.allows("ai_scene")&&this.lights.length?Z`<form
      style="display:grid;gap:8px"
      @submit=${async e=>{e.preventDefault();const i=e.currentTarget.querySelector("input");i.value.trim()&&(this.busy=!0,this.said=await async function(t,e,i){const{hass:s,config:a}=t,n=e.map((t=>{const e=s.states[t]?.attributes.supported_color_modes??[],i=e.some((t=>Gi.includes(t)))?"colour":e.includes("color_temp")?"white":"dim only";return`${t}: ${Kt(s,a,t)}, ${i}`})),r=await qi(t,"scene",{ask:i,facts:n}),o=Yi(r,"[");if(o?.length){for(const t of o){if(!e.includes(t.entity))continue;if(!t.on){s.callService("light","turn_off",{entity_id:t.entity,transition:2}).catch((()=>{}));continue}const i={entity_id:t.entity,transition:2};"number"==typeof t.brightness_pct&&(i.brightness_pct=Math.min(100,Math.max(1,Math.round(t.brightness_pct)))),Array.isArray(t.rgb)&&3===t.rgb.length?i.rgb_color=t.rgb.map((t=>Math.min(255,Math.max(0,Math.round(t))))):"number"==typeof t.kelvin&&(i.color_temp_kelvin=Math.min(6500,Math.max(2e3,Math.round(t.kelvin)))),s.callService("light","turn_on",i).catch((()=>{}))}return r.slice(r.lastIndexOf("]")+1).trim()||t.t("done")}}(this.ctx,this.lights,i.value.trim())??t("as_error"),this.busy=!1)}}
    >
      <span class="muted" style="font-size:13px">✨ ${t("ai_scene_title")}</span>
      <div style="display:flex;gap:8px">
        <input type="text" placeholder=${t("ai_scene_hint")} style="flex:1" />
        <button class="btn primary pressable" type="submit" ?disabled=${this.busy}>${this.busy?"…":t("ai_do_it")}</button>
      </div>
      ${this.said?Z`<span style="font-size:14px;unicode-bidi:plaintext">✨ ${this.said}</span>`:q}
    </form>`:q}};Ji([gt({attribute:!1})],Qi.prototype,"ctx",2),Ji([gt({attribute:!1})],Qi.prototype,"lights",2),Ji([mt()],Qi.prototype,"busy",2),Ji([mt()],Qi.prototype,"said",2),Qi=Ji([pt("sn-ai-scene")],Qi);let ts=class extends ct{constructor(){super(...arguments),this.label="",this.busy=!1,this.text=""}createRenderRoot(){return this}render(){return Ui(this.ctx.hass)?Z`<div style="display:grid;gap:6px">
      ${this.text?Z`<div style="font-size:14px;line-height:1.5;unicode-bidi:plaintext">✨ ${this.text}</div>`:q}
      ${this.text?q:Z`<button
            class="btn pressable"
            style="justify-self:start;min-height:36px;font-size:13px"
            ?disabled=${this.busy}
            @click=${async()=>{this.busy=!0,this.text=await this.run()??this.ctx.t("as_error"),this.busy=!1}}
          >
            ✨ ${this.busy?this.ctx.t("ai_looking"):this.label}
          </button>`}
    </div>`:q}};function es(t,e,i,s){const{hass:a,config:n}=t;return[`Used so far this month: ${Math.round(e.used)} kWh (${s}${Math.round(e.used*i)})`,`Same days last month: ${Math.round(e.lastSame)} kWh`,`Expected for the whole month: ${Math.round(e.projected)} kWh (${s}${Math.round(e.projected*i)})`,...e.solar?[`Solar made ${Math.round(e.solar)} kWh`]:[],...e.top.map((t=>`${Kt(a,n,t.id)}: ${Math.round(t.kwh)} kWh`)),...Object.values(a.states).filter((t=>"climate"===Xt(t.entity_id)&&"off"!==t.state)).map((t=>`${Kt(a,n,t.entity_id)} is on now (${t.state}, set to ${t.attributes.temperature}°)`))]}Ji([gt({attribute:!1})],ts.prototype,"ctx",2),Ji([gt()],ts.prototype,"label",2),Ji([gt({attribute:!1})],ts.prototype,"run",2),Ji([mt()],ts.prototype,"busy",2),Ji([mt()],ts.prototype,"text",2),ts=Ji([pt("sn-ai-ask-button")],ts);const is=(t,e,i)=>{const s=new Map;for(let a=e;a<=i;a++)s.set(t[a],a);return s},ss=bt(class extends _t{constructor(t){if(super(t),t.type!==ft)throw Error("repeat() can only be used in text expressions")}dt(t,e,i){let s;void 0===i?i=e:void 0!==e&&(s=e);const a=[],n=[];let r=0;for(const o of t)a[r]=s?s(o,r):r,n[r]=i(o,r),r++;return{values:n,keys:a}}render(t,e,i){return this.dt(t,e,i).values}update(t,[e,i,s]){const a=t._$AH,{values:n,keys:r}=this.dt(e,i,s);if(!Array.isArray(a))return this.ut=r,n;const o=this.ut??=[],l=[];let c,d,p=0,h=a.length-1,u=0,g=n.length-1;for(;p<=h&&u<=g;)if(null===a[p])p++;else if(null===a[h])h--;else if(o[p]===r[u])l[u]=wt(a[p],n[u]),p++,u++;else if(o[h]===r[g])l[g]=wt(a[h],n[g]),h--,g--;else if(o[p]===r[g])l[g]=wt(a[p],n[g]),xt(t,l[g+1],a[p]),p++,g--;else if(o[h]===r[u])l[u]=wt(a[h],n[u]),xt(t,a[p],a[h]),h--,u++;else if(void 0===c&&(c=is(r,u,g),d=is(o,p,h)),c.has(o[p]))if(c.has(o[h])){const e=d.get(r[u]),i=void 0!==e?a[e]:null;if(null===i){const e=xt(t,a[p]);wt(e,n[u]),l[u]=e}else l[u]=wt(i,n[u]),xt(t,a[p],i),a[e]=null;u++}else Ct(a[h]),h--;else Ct(a[p]),p++;for(;u<=g;){const e=xt(t,l[g+1]);wt(e,n[u]),l[u++]=e}for(;p<=h;){const t=a[p++];null!==t&&Ct(t)}return this.ut=r,kt(t,l),U}});var as=Object.defineProperty,ns=Object.getOwnPropertyDescriptor,rs=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?ns(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&as(e,i,n),n};let os=class extends ct{constructor(){super(...arguments),this.value=""}render(){const t=[...this.value.replace(/[⁦-⁩]/g,"")];return Z`${ss(t,((e,i)=>t.length-i),(t=>/\d/.test(t)?Z`<span class="d" aria-hidden="true"
              ><span class="strip" style="transform:translateY(${1.2*-Number(t)}em)"
                >${[0,1,2,3,4,5,6,7,8,9].map((t=>Z`<span>${t}</span>`))}</span
              ></span
            >`:Z`<span aria-hidden="true">${t}</span>`))}<span style="position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)">${this.value}</span>`}};os.styles=o`
    :host {
      display: inline-flex;
      direction: ltr;
      unicode-bidi: isolate;
      font-variant-numeric: tabular-nums;
      white-space: pre;
    }
    .d {
      display: inline-block;
      height: 1.2em;
      line-height: 1.2em;
      overflow: hidden;
      vertical-align: bottom;
    }
    .strip {
      display: flex;
      flex-direction: column;
      transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
    }
    @media (prefers-reduced-motion: reduce) {
      .strip {
        transition: none;
      }
    }
  `,rs([gt()],os.prototype,"value",2),os=rs([pt("sn-num")],os);const ls=t=>(t=>{const e=t.replace(/[\u2066-\u2069]/g,"");return/\d/.test(e)&&e.length<=16&&/^[\d\s.,:%°+\-\u2212A-Za-z²³/µ]+$/.test(e)})(t)?Z`<sn-num .value=${t}></sn-num>`:t;var cs=Object.defineProperty,ds=Object.getOwnPropertyDescriptor,ps=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?ds(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&cs(e,i,n),n};const hs=t=>Object.values(t.states).filter((t=>t.entity_id.startsWith("sensor.")&&"energy"===t.attributes.device_class&&/kWh|Wh|MWh/.test(t.attributes.unit_of_measurement??"")));function us(t){const e=hs(t),i=e.find((t=>/total|import|consumption|grid|house|home/.test(t.entity_id)&&!/solar|pv|export/.test(t.entity_id)))?.entity_id,s=e.find((t=>/solar|pv/.test(t.entity_id)))?.entity_id;return{total:i,solar:s}}const gs=t=>"number"==typeof t?t>1e12?t:1e3*t:Date.parse(t);let ms=class extends ct{connectedCallback(){super.connectedCallback(),this.load(),this.timer=window.setInterval((()=>this.load()),9e5)}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this.timer)}get cfg(){const t=us(this.ctx.hass),e=this.widget.config;return{total:e.total??t.total,solar:e.solar??t.solar,tariff:Number(e.tariff??.6),currency:e.currency??"₪",budget:Number(e.budget)||0}}async load(){const{hass:t}=this.ctx,{total:e,solar:i}=this.cfg;if(!e)return;const s=new Set(ki(this.ctx.config)),a=hs(t).map((t=>t.entity_id)).filter((t=>t!==e&&t!==i&&!/today|daily|month|year/.test(t))),n=a.filter((t=>s.has(t))),r=(n.length?n:a).slice(0,12),o=new Date,l=new Date(o.getFullYear(),o.getMonth()-1,1),c=new Date(o.getFullYear(),o.getMonth(),1),d=[e,...i?[i]:[],...r];let p={};try{p=await t.callWS({type:"recorder/statistics_during_period",start_time:l.toISOString(),end_time:o.toISOString(),statistic_ids:d,period:"day",types:["change"]})}catch{return}const h=(t,e,i)=>(p[t]??[]).filter((t=>gs(t.start)>=e.getTime()&&gs(t.start)<i.getTime())).reduce(((t,e)=>t+(e.change??0)),0),u=o.getDate(),g=new Date(l.getFullYear(),l.getMonth(),u+1),m=h(e,c,o),f=new Date(o.getFullYear(),o.getMonth()+1,0).getDate(),b=Math.max(1,u-1+o.getHours()/24);this.data={used:m,projected:m/b*f,lastSame:h(e,l,g<c?g:c),solar:i?h(i,c,o):0,top:r.map((t=>({id:t,kwh:h(t,c,o)}))).filter((t=>t.kwh>0)).sort(((t,e)=>e.kwh-t.kwh)).slice(0,5),daily:Array.from({length:f},((t,i)=>h(e,new Date(o.getFullYear(),o.getMonth(),i+1),new Date(o.getFullYear(),o.getMonth(),i+2))))}}renderBudget(t,e,i,s){const{t:a,rtl:n}=this.ctx,r=e>i,o=n?"right":"left";return Z`<div class="budget">
      <div class="bt">
        <span>${a("bill_budget")} ${s(i)}</span>
        <span class=${r?"warn":"ok"}>${r?a("bill_over",{v:s(e-i)}):a("bill_within")}</span>
      </div>
      <div class="track">
        <span class="fill ${r?"warn":""}" style="transform:scaleX(${Math.min(1,t/i)});transform-origin:${o}"></span>
        <span class="tick" style="${o}:${Math.min(100,e/i*100)}%"></span>
      </div>
    </div>`}renderDaily(t){const e=Math.max(...t,.001),i=(new Date).getDate()-1,s=t.length;return Z`<svg class="daily" viewBox="0 0 ${4*s} 30" preserveAspectRatio="none" aria-hidden="true" style="transform:${this.ctx.rtl?"scaleX(-1)":"none"}">
      ${t.map(((t,s)=>F`<rect x=${4*s+.5} y=${30-Math.max(s<=i?1:0,t/e*28)} width="3" height=${Math.max(s<=i?1:0,t/e*28)} rx="1" class=${s===i?"now":s<i?"past":"future"}></rect>`))}
    </svg>`}render(){const{ctx:t}=this,{t:e,lang:i}=t,{tariff:s,currency:a,total:n,budget:r}=this.cfg,o=t=>se(`${a} ${ae(t,i,0)}`),l=this.data;if(!n)return Z`<div class="card glass"><h3><sn-icon icon="lightning-bolt"></sn-icon>${e("bill_title")}</h3><span class="muted">${e("no_entities")}</span></div>`;const c=l&&l.lastSame>0?Math.round((l.used-l.lastSame)/l.lastSame*100):void 0,d=l?.top[0]?.kwh??1;return Z`<div class="card glass">
      <h3><sn-icon icon="lightning-bolt"></sn-icon>${e("bill_title")}</h3>
      ${l&&t.allows("ai_bill")?Z`<sn-ai-ask-button .ctx=${t} label=${e("ai_bill_btn")} .run=${()=>qi(t,"bill",{facts:es(t,l,s,a)})}></sn-ai-ask-button>`:q}
      ${l?Z`<div class="bill">
              <span class="lbl">${e("bill_projected")}</span>
              <span class="big"><sn-num .value=${o(l.projected*s)}></sn-num></span>
            </div>
            ${r&&t.allows("bill_budget")?this.renderBudget(l.used*s,l.projected*s,r,o):q}
            ${this.renderDaily(l.daily)}
            <div class="row">
              <span class="pill">${e("bill_used")} ${se(`${ae(l.used,i,0)} kWh`)}</span>
              ${void 0!==c?Z`<span class="pill ${c>0?"up":"down"}"
                    ><sn-icon icon=${c>0?"chevron-up":"chevron-down"}></sn-icon>${se(`${Math.abs(c)}%`)} ${e("bill_vs_last")}</span
                  >`:q}
              ${void 0!==c&&c<=-5&&t.allows("energy_challenge")?Z`<span class="pill down" title=${e("challenge_hint")}>🏅 ${e("challenge_won",{n:Math.abs(c)})}</span>`:q}
              ${l.solar>0?Z`<span class="pill down"><sn-icon icon="solar"></sn-icon>${e("bill_solar")} ${o(l.solar*s)}</span>`:q}
            </div>
            ${l.top.length?Z`<div class="top">
                  <span class="lbl" style="font-size:13px;color:var(--text-2)">${e("bill_top")}</span>
                  ${l.top.map((e=>Z`<div class="item">
                      <span>${Kt(t.hass,t.config,e.id)}</span>
                      <span class="muted">${se(`${ae(e.kwh,i,0)} kWh · ${a}${ae(e.kwh*s,i,0)}`)}</span>
                      <div class="bar"><span style="transform:scaleX(${e.kwh/d});transform-origin:${t.rtl?"right":"left"}"></span></div>
                    </div>`))}
                </div>`:q}`:Z`<span class="muted">${e("loading")}</span>`}
    </div>`}};ms.styles=[si,o`
      :host {
        display: block;
        height: 100%;
      }
      .card {
        height: 100%;
        border-radius: var(--r-lg);
        padding: 20px;
        display: grid;
        align-content: start;
        gap: 14px;
        overflow: auto;
      }
      .budget {
        display: grid;
        gap: 6px;
      }
      .bt {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        font-size: 13px;
        color: var(--text-2);
      }
      .bt .warn {
        color: var(--alert-text);
        font-weight: 700;
      }
      .bt .ok {
        color: var(--success);
        font-weight: 600;
      }
      .track {
        position: relative;
        height: 10px;
        border-radius: 999px;
        background: var(--surface-2);
      }
      .track .fill {
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: var(--success);
        transition: transform 800ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .track .fill.warn {
        background: var(--alert);
      }
      .track .tick {
        position: absolute;
        top: -4px;
        bottom: -4px;
        width: 3px;
        margin-inline-start: -1.5px;
        border-radius: 2px;
        background: var(--text);
      }
      .daily {
        width: 100%;
        height: 44px;
      }
      .daily .past {
        fill: color-mix(in srgb, var(--accent) 45%, transparent);
      }
      .daily .now {
        fill: var(--accent);
      }
      .daily .future {
        fill: var(--surface-2);
      }
      h3 {
        margin: 0;
        display: flex;
        gap: 8px;
        align-items: center;
        font-size: 15px;
        color: var(--text-2);
        --icon-size: 20px;
      }
      h3 sn-icon {
        color: var(--accent-text);
      }
      .bill {
        display: grid;
        gap: 2px;
      }
      .bill .big {
        font-size: clamp(34px, 5vw, 52px);
        font-weight: 700;
        letter-spacing: -0.02em;
        line-height: 1.05;
      }
      .bill .lbl {
        font-size: 13px;
        color: var(--text-2);
      }
      .row {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .pill {
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
      .up {
        color: var(--alert-text);
      }
      .down {
        color: var(--success);
      }
      .top {
        display: grid;
        gap: 8px;
      }
      .item {
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
      .bar span {
        display: block;
        height: 100%;
        width: 100%;
        background: var(--accent);
        border-radius: 3px;
        transform-origin: left;
        transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .muted {
        font-size: 14px;
      }
    `],ps([gt({attribute:!1})],ms.prototype,"ctx",2),ps([gt({attribute:!1})],ms.prototype,"widget",2),ps([mt()],ms.prototype,"data",2),ms=ps([pt("sn-w-energy-stats")],ms);var fs=Object.defineProperty,bs=Object.getOwnPropertyDescriptor,_s=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?bs(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&fs(e,i,n),n};const ys=[{key:"main_brush_time_left",label:"main_brush",life:300},{key:"side_brush_time_left",label:"side_brush",life:200},{key:"filter_time_left",label:"filter",life:150},{key:"sensor_time_left",label:"sensors_part",life:30}];function vs(t,e){const i={parts:{}},s=t.entities?.[e]?.device_id;if(!s)return i;for(const a of Object.values(t.entities??{})){if(a.device_id!==s)continue;const[t,e]=a.entity_id.split("."),n=a.translation_key??e;if("image"!==t||i.map){if("select"===t&&/mop_intensity|water_box/.test(n))i.mop=a.entity_id;else if("sensor"===t&&/cleaning_area$/.test(n))i.area=a.entity_id;else if("sensor"===t&&/cleaning_time$/.test(n))i.time=a.entity_id;else if("button"===t&&/empty/.test(n))i.empty=a.entity_id;else if("sensor"===t)for(const s of ys)n.endsWith(s.key)&&(i.parts[s.key]=a.entity_id)}else i.map=a.entity_id}return i}function xs(t){const e=Number(t?.state);if(!t||Number.isNaN(e))return;const i=t.attributes.unit_of_measurement;return"s"===i?e/3600:"min"===i?e/60:"d"===i?24*e:e}async function ws(t,e){try{const i=await t.callWS({type:"call_service",domain:"roborock",service:"get_maps",target:{entity_id:e},return_response:!0}),s=Object.entries(i.response?.[e]?.maps?.[0]?.rooms??{}).map((([t,e])=>({id:t,name:e})));if(s.length)return{method:"segments",rooms:s}}catch{}return{method:"areas",rooms:Object.values(t.areas??{}).map((t=>({id:t.area_id,name:t.name}))).sort(((t,e)=>t.name.localeCompare(e.name)))}}const $s=t=>t.trim().toLowerCase().replace(/\s+/g," ");function ks(t,e){return t.robot_room?e.some((e=>e.id===t.robot_room))?t.robot_room:void 0:e.find((e=>$s(e.name)===$s(t.name)))?.id}let Cs=class extends ct{constructor(){super(...arguments),this.compact=!1,this.rooms=[],this.method="segments",this.picked=[],this.passes=1,this.bust=Date.now()}connectedCallback(){super.connectedCallback(),this.loadRooms(),this.timer=window.setInterval((()=>this.bust=Date.now()),5e3)}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this.timer)}get entity(){return this.widget.config.entity??""}async loadRooms(){const t=await ws(this.ctx.hass,this.entity);this.method=t.method,this.rooms=t.rooms}planFloor(){let t;for(const e of this.ctx.config.pages)for(const i of e.widgets)for(const e of"floorplan"===i.type?i.config.floors:[]){if(!e.image||!e.rooms?.length)continue;const i=new Map;for(const t of e.rooms){const e=ks(t,this.rooms);e&&i.set(t.id,e)}i.size&&(!t||i.size>t.matches.size)&&(t={floor:e,matches:i})}return t}renderPlan(){const t=this.planFloor();if(!t)return q;const{floor:e,matches:i}=t;return Z`<div class="mini" data-no-swipe>
      <img src=${e.image} alt="" class=${this.ctx.dark?"dim":""} />
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        ${(e.rooms??[]).map((t=>{const e=i.get(t.id),s=!!e&&this.picked.includes(e);return F`<polygon class=${e?s?"pick on":"pick":"off"} points=${t.points.map((t=>t.join(","))).join(" ")}
            @click=${()=>e&&this.toggleRoom(e)}></polygon>`}))}
      </svg>
      ${(e.rooms??[]).map((t=>{const e=i.get(t.id),s=e?this.picked.indexOf(e):-1;if(s<0)return q;const[a,n]=he(t.points);return Z`<span class="num" style="left:${a}%;top:${n}%">${s+1}</span>`}))}
    </div>`}toggleRoom(t){navigator.vibrate?.(5),this.picked=this.picked.includes(t)?this.picked.filter((e=>e!==t)):[...this.picked,t]}call(t,e,i={}){return navigator.vibrate?.(8),this.ctx.hass.callService(t,e,{entity_id:this.entity,...i}).catch((()=>this.ctx.toast(this.ctx.t("error"))))}start(){return this.picked.length?"segments"===this.method?this.call("vacuum","send_command",{command:"app_segment_clean",params:[{segments:this.picked.map(Number),repeat:this.passes}]}):this.call("vacuum","clean_area",{cleaning_area_id:this.picked}):this.call("vacuum","start")}label(t,e){const i=`${t}_${e}`;return zt(i)?this.ctx.t(i):e.replace(/_/g," ")}render(){const{ctx:t}=this,{t:e,hass:i}=t,s=i.states[this.entity];if(!s)return Z`<div class="wrap glass"><span class="muted">${e("unavailable")}</span></div>`;const a=vs(i,this.entity),n="cleaning"===s.state,r=s.attributes.battery_level??Number(i.states[`sensor.${this.entity.split(".")[1]}_battery`]?.state),o=a.map?i.states[a.map]:void 0,l=o?.attributes.entity_picture?i.hassUrl(`${o.attributes.entity_picture}${o.attributes.entity_picture.includes("?")?"&":"?"}t=${n?this.bust:Math.floor(this.bust/6e4)}`):void 0,c=s.attributes.fan_speed_list??[],d=a.mop?i.states[a.mop]:void 0,p=(s,a,n)=>{const r=s?i.states[s]:void 0;return r&&"unknown"!==r.state&&"unavailable"!==r.state?Z`<span class="stat"><sn-icon .icon=${a}></sn-icon>${e(n)} ${re(e,r,t.lang)}</span>`:q},h=Z`<div class="col">
      <div class="head">
        <span class="ic ${n?"on":""}"><sn-icon icon="robot-vacuum"></sn-icon></span>
        <div>
          <div class="name">${Kt(i,t.config,this.entity)}</div>
          <div class="state">${re(e,s,t.lang)}</div>
        </div>
      </div>
      <div class="stats">
        ${"number"!=typeof r||Number.isNaN(r)?q:Z`<span class="stat"><sn-icon icon="battery"></sn-icon>${se(`${r}%`)}</span>`}
        ${p(a.area,"rooms","cleaned_area")} ${p(a.time,"clock-outline","clean_time")}
      </div>
      ${l?Z`<div class="map"><img src=${l} alt="" /></div>`:q}
    </div>`,u=Z`<div class="col">
      <h3>${e("rooms")}</h3>
      ${this.renderPlan()}
      ${this.rooms.length?Z`<div class="rooms">
            ${this.rooms.map((t=>{const e=this.picked.indexOf(t.id);return Z`<button class="room pressable" aria-pressed=${e>=0} @click=${()=>this.toggleRoom(t.id)}>
                ${t.name}${e>=0?Z`<span class="order">${e+1}</span>`:q}
              </button>`}))}
          </div>`:Z`<span class="muted">${e("no_rooms")}</span>`}
      <div class="opts">
        ${c.length?Z`<div class="opt">
              ${e("suction")}
              <div class="seg">
                ${c.map((t=>Z`<button aria-pressed=${s.attributes.fan_speed===t} @click=${()=>this.call("vacuum","set_fan_speed",{fan_speed:t})}>
                    ${this.label("fan",t)}
                  </button>`))}
              </div>
            </div>`:q}
        ${d?.attributes.options?.length?Z`<div class="opt">
              ${e("mop")}
              <div class="seg">
                ${d.attributes.options.map((i=>Z`<button
                    aria-pressed=${d.state===i}
                    @click=${()=>this.ctx.hass.callService("select","select_option",{entity_id:a.mop,option:i}).catch((()=>t.toast(e("error"))))}
                  >
                    ${this.label("mop",i)}
                  </button>`))}
              </div>
            </div>`:q}
        ${"segments"===this.method&&this.picked.length?Z`<div class="opt">
              ${e("passes")}
              <div class="seg">
                ${[1,2,3].map((t=>Z`<button aria-pressed=${this.passes===t} @click=${()=>this.passes=t}>${se(`×${t}`)}</button>`))}
              </div>
            </div>`:q}
      </div>
      <div class="actions">
        ${n?Z`<button class="btn primary pressable go" @click=${()=>this.call("vacuum","pause")}><sn-icon icon="pause"></sn-icon>${e("pause")}</button>`:Z`<button class="btn primary pressable go" @click=${()=>this.start()}>
              <sn-icon icon="play"></sn-icon>${this.picked.length?1===this.picked.length?e("clean_rooms_1"):e("clean_rooms_n",{n:this.picked.length}):e("clean_all")}
            </button>`}
        <button class="btn pressable" @click=${()=>this.call("vacuum","return_to_base")}><sn-icon icon="home"></sn-icon>${e("return_home")}</button>
        <button class="btn pressable" @click=${()=>this.call("vacuum","locate")}><sn-icon icon="locate"></sn-icon>${e("locate")}</button>
        ${a.empty?Z`<button class="btn pressable" @click=${()=>this.ctx.hass.callService("button","press",{entity_id:a.empty}).catch((()=>t.toast(e("error"))))}>
              <sn-icon icon="delete"></sn-icon>${e("empty_bin")}
            </button>`:q}
      </div>
      ${Object.keys(a.parts).length?Z`<h3>${e("parts")}</h3>
            ${ys.filter((t=>a.parts[t.key])).map((s=>{const n=xs(i.states[a.parts[s.key]]);if(void 0===n)return q;const r=Math.max(0,Math.min(100,Math.round(n/s.life*100)));return Z`<div class="part">
                <span>${e(s.label)}</span><span class="muted">${e("hours_left",{n:se(ae(n,t.lang,0))})}</span>
                <div class="bar ${r<15?"low":""}"><span style="width:${r}%"></span></div>
              </div>`}))}`:q}
    </div>`;return Z`<div class="wrap ${this.compact?"":"glass"}">${h}${u}</div>`}};Cs.styles=[si,o`
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
      .mini {
        position: relative;
        border-radius: var(--r-md);
        overflow: hidden;
        background: var(--surface-2);
        direction: ltr;
      }
      .mini img {
        display: block;
        width: 100%;
        height: auto;
        opacity: 0.85;
      }
      .mini img.dim {
        filter: invert(0.88) hue-rotate(180deg);
      }
      .mini svg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
      }
      .mini polygon {
        vector-effect: non-scaling-stroke;
        stroke-width: 2;
        transition: fill 200ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .mini polygon.pick {
        fill: color-mix(in srgb, var(--accent) 14%, transparent);
        stroke: color-mix(in srgb, var(--accent) 60%, transparent);
        cursor: pointer;
      }
      .mini polygon.pick.on {
        fill: color-mix(in srgb, var(--accent) 55%, transparent);
        stroke: var(--accent);
      }
      .mini polygon.off {
        fill: transparent;
        stroke: transparent;
      }
      .mini .num {
        position: absolute;
        transform: translate(-50%, -50%);
        width: 28px;
        height: 28px;
        border-radius: 999px;
        display: grid;
        place-items: center;
        background: var(--accent);
        color: var(--on-accent);
        font-weight: 700;
        font-size: 14px;
        box-shadow: var(--shadow);
        pointer-events: none;
        animation: pop-in 300ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      @keyframes pop-in {
        from {
          transform: translate(-50%, -50%) scale(0.6);
          opacity: 0;
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
    `],_s([gt({attribute:!1})],Cs.prototype,"ctx",2),_s([gt({attribute:!1})],Cs.prototype,"widget",2),_s([gt({type:Boolean,reflect:!0})],Cs.prototype,"compact",2),_s([mt()],Cs.prototype,"rooms",2),_s([mt()],Cs.prototype,"method",2),_s([mt()],Cs.prototype,"picked",2),_s([mt()],Cs.prototype,"passes",2),_s([mt()],Cs.prototype,"bust",2),Cs=_s([pt("sn-w-vacuum")],Cs);var Ms=Object.defineProperty,As=Object.getOwnPropertyDescriptor,Hs=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?As(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&Ms(e,i,n),n};function Ls(t,e=Date.now()){return t.settings.maintenance.map((t=>{const i=Date.parse(t.last)+864e5*t.every_days;return{...t,days:Math.round((i-e)/864e5)}}))}const Vs={flat:["home","rooms","power","security"],villa:["home","rooms","power","security","doorbell","climate","robot"],office:["home","rooms","power","climate"]};let Ss=class extends ct{constructor(){super(...arguments),this.step=0,this.name="",this.language="ar",this.house="flat"}firstUpdated(){this.name=this.ctx.config.settings.home_name||this.ctx.hass.config?.location_name||"",this.language=this.ctx.lang}finish(){const{ctx:t}=this,e=structuredClone(t.config);e.settings.home_name=this.name,e.settings.language=this.language,e.pages=Vs[this.house].map((i=>Ne(i,t.hass,e,t.t))),e.settings.default_page=e.pages[0].id,e.settings.setup_done=!0,this.onDone(e)}render(){const{t:t}=this.ctx;return Z`<div class="dots">${[0,1].map((t=>Z`<span class=${t===this.step?"on":""}></span>`))}</div>
      ${0===this.step?Z`<div class="step">
            <label class="field">${t("home_name")}<input type="text" .value=${this.name} @input=${t=>this.name=t.target.value} /></label>
            <div class="field">
              ${t("language")}
              <div class="seg">${Lt.map((t=>Z`<button aria-pressed=${this.language===t.id} @click=${()=>this.language=t.id}>${t.label}</button>`))}</div>
            </div>
            <button class="btn primary pressable" @click=${()=>this.step=1}>${t("wizard_next")}</button>
          </div>`:Z`<div class="step">
            <b>${t("wizard_house")}</b>
            <div class="houses">
              ${[["flat","house_flat","home-outline"],["villa","house_villa","home"],["office","house_office","desk"]].map((([e,i,s])=>Z`<button aria-pressed=${this.house===e} @click=${()=>this.house=e}><sn-icon .icon=${s}></sn-icon>${t(i)}</button>`))}
            </div>
            <button class="btn primary pressable" @click=${()=>this.finish()}>${t("wizard_finish")}</button>
          </div>`}`}};function zs(t){let e=0;t.showSheet({title:t.t("rate_service"),render:t=>Z`<form
      style="display:grid;gap:14px;justify-items:center"
      @submit=${i=>{if(i.preventDefault(),!e)return;const s=i.currentTarget.querySelector("input").value.trim();t.hass.callWS({type:"smartnest/feedback",stars:e,comment:s}).then((()=>{t.toast(t.t("rate_thanks")),t.closeSheet()})).catch((()=>t.toast(t.t("error"))))}}
    >
      <div style="display:flex;gap:6px;direction:ltr" role="radiogroup">
        ${[1,2,3,4,5].map((t=>Z`<button
            type="button"
            class="pressable"
            aria-label=${`${t}`}
            style="--icon-size:40px;color:var(--accent)"
            @click=${i=>{e=t;[...i.currentTarget.parentElement.querySelectorAll("sn-icon")].forEach(((e,i)=>e.icon=i<t?"star":"star-outline"))}}
          >
            <sn-icon icon="star-outline"></sn-icon>
          </button>`))}
      </div>
      <input type="text" placeholder=${t.t("rate_comment")} style="width:100%" />
      <button class="btn primary pressable" type="submit">${t.t("send")}</button>
    </form>`})}async function Ds(t,e=7){const i=ki(t.config).filter((e=>t.hass.states[e]&&"event"!==Xt(e)));if(!i.length)return[];try{const s=await t.hass.callWS({type:"logbook/get_events",start_time:new Date(Date.now()-864e5*e).toISOString(),end_time:(new Date).toISOString(),entity_ids:i}),a=new Map;for(const t of s)"unavailable"===t.state&&a.set(t.entity_id,(a.get(t.entity_id)??0)+1);return[...a.entries()].map((([e,i])=>({id:e,n:i,name:Kt(t.hass,t.config,e)}))).sort(((t,e)=>e.n-t.n)).slice(0,8)}catch{return[]}}Ss.styles=[si,o`
      :host {
        display: grid;
        gap: 18px;
      }
      .dots {
        display: flex;
        gap: 6px;
        justify-content: center;
      }
      .dots span {
        width: 8px;
        height: 8px;
        border-radius: 99px;
        background: var(--surface-2);
        transition: width 300ms cubic-bezier(0.22, 1, 0.36, 1), background-color 300ms;
      }
      .dots span.on {
        width: 24px;
        background: var(--accent);
      }
      .houses {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
      }
      .houses button {
        display: grid;
        gap: 8px;
        justify-items: center;
        padding: 18px 10px;
        border-radius: var(--r-md);
        background: var(--surface-2);
        font-weight: 500;
        --icon-size: 30px;
      }
      .houses button[aria-pressed="true"] {
        background: var(--accent);
        color: var(--on-accent);
      }
      .step {
        display: grid;
        gap: 14px;
        animation: in 360ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      @keyframes in {
        from {
          opacity: 0;
          transform: translateX(14px);
        }
      }
    `],Hs([gt({attribute:!1})],Ss.prototype,"ctx",2),Hs([gt({attribute:!1})],Ss.prototype,"onDone",2),Hs([mt()],Ss.prototype,"step",2),Hs([mt()],Ss.prototype,"name",2),Hs([mt()],Ss.prototype,"language",2),Hs([mt()],Ss.prototype,"house",2),Ss=Hs([pt("sn-wizard")],Ss);var Os=Object.defineProperty,js=Object.getOwnPropertyDescriptor,Ts=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?js(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&Os(e,i,n),n};const Ps=(t,e)=>Z`<section style="display:grid;gap:8px;padding:14px 16px;border-radius:var(--r-md);background:var(--surface-2)">
  <div style="font-weight:700">${t}</div>
  ${e}
</section>`;let Ns=class extends ct{createRenderRoot(){return this}async connectedCallback(){super.connectedCallback();const{hass:t}=this.ctx,e=Object.values(t.states).filter((t=>t.entity_id.startsWith("sensor.")&&"battery"===t.attributes.device_class&&!Number.isNaN(Number(t.state)))).map((t=>t.entity_id)).slice(0,60);if(!e.length)return void(this.rows=[]);let i={};try{i=await t.callWS({type:"recorder/statistics_during_period",start_time:new Date(Date.now()-2592e6).toISOString(),statistic_ids:e,period:"day",types:["mean"]})}catch{return void(this.rows=[])}const s=[];for(const a of e){const e=(i[a]??[]).map((t=>["number"==typeof t.start?t.start>1e12?t.start:1e3*t.start:Date.parse(t.start),t.mean??NaN])).filter((([,t])=>!Number.isNaN(t)));if(e.length<7)continue;const n=e.length,r=e.map((([t])=>t/864e5)),o=e.map((([,t])=>t)),l=r.reduce(((t,e)=>t+e),0)/n,c=o.reduce(((t,e)=>t+e),0)/n,d=r.reduce(((t,e,i)=>t+(e-l)*(o[i]-c)),0)/(r.reduce(((t,e)=>t+(e-l)**2),0)||1),p=Number(t.states[a].state);d>=-.05||p<=10||s.push({id:a,level:p,days:Math.round((p-10)/-d)})}this.rows=s.sort(((t,e)=>t.days-e.days)).slice(0,10)}render(){const{t:t,hass:e,config:i}=this.ctx;return this.rows?Ps(t("bat_title"),this.rows.length?Z`<div style="display:grid;gap:4px;font-size:14px">
            ${this.rows.map((s=>Z`<div style="display:flex;justify-content:space-between;gap:12px">
                <span>${Kt(e,i,s.id)} <span class="muted ltr">${Math.round(s.level)}%</span></span>
                <span style="color:${s.days<21?"var(--alert-text)":"var(--text-2)"}">${s.days>365?t("bat_year"):t("bat_days",{n:s.days})}</span>
              </div>`))}
          </div>`:Z`<span class="muted" style="font-size:14px">${t("bat_none")}</span>`):Ps(t("bat_title"),Z`<span class="muted" style="font-size:14px">${t("loading")}</span>`)}};Ts([gt({attribute:!1})],Ns.prototype,"ctx",2),Ts([mt()],Ns.prototype,"rows",2),Ns=Ts([pt("sn-battery-plan")],Ns);let Is=class extends ct{constructor(){super(...arguments),this.busy=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),fi(this.ctx.hass,"warranty").then((t=>this.items=t?.items??[]))}save(t){this.items=t,bi(this.ctx.hass,"warranty",{items:t}).catch((()=>this.ctx.toast(this.ctx.t("error"))))}render(){const{t:t,lang:e}=this.ctx;if(!this.items)return q;const i=t=>{const e=new Date(`${t.bought}T12:00`);return e.setMonth(e.getMonth()+t.months),e};return Ps(t("war_title"),Z`${this.items.slice().sort(((t,e)=>i(t).getTime()-i(e).getTime())).map((s=>{const a=i(s),n=Math.round((a.getTime()-Date.now())/864e5);return Z`<div style="display:flex;align-items:center;gap:10px;font-size:14px">
              <span style="flex:1">${s.name}</span>
              <span style="color:${n<0?"var(--text-2)":n<60?"var(--alert-text)":"var(--success)"}"
                >${n<0?t("war_over"):t("war_until",{date:a.toLocaleDateString(Dt[e],{day:"numeric",month:"short",year:"numeric"})})}</span
              >
              ${s.invoice?Z`<a href=${s.invoice} target="_blank" rel="noopener" title=${t("war_invoice")}>🧾</a>`:q}
              <button class="icon-btn small pressable" aria-label=${t("delete")} @click=${()=>this.save(this.items.filter((t=>t.id!==s.id)))}>
                <sn-icon icon="close" style="--icon-size:14px"></sn-icon>
              </button>
            </div>`}))}
        <form
          style="display:grid;gap:8px;margin-top:6px"
          @submit=${async t=>{t.preventDefault();const e=t.currentTarget,i=new FormData(e),s=i.get("invoice");let a;this.busy=!0,s&&s.size&&(a=await Ee(this.ctx.hass,s).catch((()=>{}))),this.save([...this.items,{id:Ae(),name:String(i.get("name")).trim(),bought:String(i.get("bought")),months:Number(i.get("months"))||12,invoice:a}]),this.busy=!1,e.reset()}}
        >
          <input name="name" type="text" required placeholder=${t("war_what")} style="background:var(--surface-solid)" />
          <div style="display:flex;gap:8px">
            <input name="bought" type="date" required .value=${(new Date).toISOString().slice(0,10)} style="flex:1;background:var(--surface-solid)" />
            <select name="months" style="width:auto;background:var(--surface-solid)">
              ${[6,12,24,36,60].map((e=>Z`<option value=${e} ?selected=${12===e}>${t("war_months",{n:e})}</option>`))}
            </select>
          </div>
          <label class="field">🧾 ${t("war_invoice")}<input name="invoice" type="file" accept="image/*" /></label>
          <button class="btn pressable" type="submit" ?disabled=${this.busy} style="justify-self:start">${t("add")}</button>
        </form>`)}};Ts([gt({attribute:!1})],Is.prototype,"ctx",2),Ts([mt()],Is.prototype,"items",2),Ts([mt()],Is.prototype,"busy",2),Is=Ts([pt("sn-warranty")],Is);var Ws=Object.defineProperty,Es=Object.getOwnPropertyDescriptor,Rs=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?Es(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&Ws(e,i,n),n};let Bs=class extends ct{connectedCallback(){super.connectedCallback(),Ds(this.ctx).then((t=>this.rows=t))}createRenderRoot(){return this}render(){const{t:t}=this.ctx;return this.rows?Us(t("faults_week"),!this.rows.length,qs(this.rows.map((e=>Ys(e.name,t("times",{n:e.n}))))),t("h_all_good")):Z`<span class="muted" style="font-size:14px">${t("loading")}</span>`}};function Zs(t,e){const i=t.hass.entities?.[e]?.platform??"";return["zha","zigbee2mqtt","deconz"].includes(i)?"x_zigbee":"mqtt"===i?"x_mqtt":["zwave_js"].includes(i)?"x_zwave":["tuya","ewelink","sonoff","smartthings","google_assistant","alexa","xiaomi_miot","roborock"].includes(i)?"x_cloud":["esphome","shelly","tasmota","wled","tplink","fully_kiosk"].includes(i)?"x_wifi":"x_generic"}Rs([gt({attribute:!1})],Bs.prototype,"ctx",2),Rs([mt()],Bs.prototype,"rows",2),Bs=Rs([pt("sn-faults")],Bs);let Fs=class extends ct{constructor(){super(...arguments),this.offline=[],this.low=[],this.busy=!1}createRenderRoot(){return this}render(){const{ctx:t}=this,{t:e,hass:i,config:s}=t;if(!this.offline.length&&!this.low.length)return q;const a=[...this.offline.map((a=>[Kt(i,s,a.entity_id),e(Zs(t,a.entity_id))])),...this.low.map((t=>[Kt(i,s,t.entity_id),e("x_battery")]))];return Z`<section style="display:grid;gap:8px;padding:14px 16px;border-radius:var(--r-md);background:var(--surface-2)">
      <div style="display:flex;align-items:center;gap:8px;font-weight:700">
        <sn-icon icon="wrench" style="--icon-size:20px;color:var(--accent-text)"></sn-icon>${e("x_title")}
      </div>
      <div style="display:grid;gap:6px;font-size:14px">
        ${a.map((([t,e])=>Z`<div><b>${t}</b> <span class="muted">· ${e}</span></div>`))}
      </div>
      ${this.ai?Z`<div style="white-space:pre-line;font-size:14px;unicode-bidi:plaintext;border-top:1px solid var(--line, var(--surface-3));padding-top:8px">✨ ${this.ai}</div>`:q}
      ${Ui(i)&&t.allows("ai_explain")&&!this.ai?Z`<button
            class="btn pressable"
            style="justify-self:start"
            ?disabled=${this.busy}
            @click=${async()=>{this.busy=!0;const a=[...this.offline.map((t=>`${Kt(i,s,t.entity_id)} (${t.entity_id}, ${i.entities?.[t.entity_id]?.platform??"?"}) unavailable since ${t.last_changed}`)),...this.low.map((t=>`${Kt(i,s,t.entity_id)} battery ${t.state}`))];this.ai=await qi(t,"explain",{facts:a})??e("as_error"),this.busy=!1}}
          >
            ✨ ${this.busy?e("ai_looking"):e("x_ai")}
          </button>`:q}
    </section>`}};Rs([gt({attribute:!1})],Fs.prototype,"ctx",2),Rs([gt({attribute:!1})],Fs.prototype,"offline",2),Rs([gt({attribute:!1})],Fs.prototype,"low",2),Rs([mt()],Fs.prototype,"ai",2),Rs([mt()],Fs.prototype,"busy",2),Fs=Rs([pt("sn-explain")],Fs);const Us=(t,e,i,s,a=!1)=>Z`<section
  style="display:grid;gap:8px;padding:14px 16px;border-radius:var(--r-md);background:var(--surface-2)"
>
  <div style="display:flex;align-items:center;gap:8px;font-weight:700">
    <sn-icon icon=${e?"check-circle":"alert-circle-outline"} style="--icon-size:20px;color:${e?"var(--success)":"var(--alert-text)"}"></sn-icon>
    ${t}
  </div>
  ${e&&!a?Z`<span class="muted" style="font-size:14px">${s}</span>`:i}
</section>`,qs=t=>Z`<div style="display:grid;gap:4px;font-size:14px">${t}</div>`,Ys=(t,e)=>Z`<div style="display:flex;justify-content:space-between;gap:12px"><span>${t}</span><span class="muted" style="unicode-bidi:plaintext">${e}</span></div>`,Xs=(t,e)=>t.find((t=>t.entity_id.startsWith("sensor.")&&e.test(t.entity_id)));const Ks={basic:0,pro:1,premium:2},Js={w_floorplan:"basic",w_tile:"basic",w_camera:"basic",w_heading:"basic",w_clock:"basic",w_modes:"basic",alarm:"basic",w_vacuum:"pro",w_visitors:"pro",w_energy:"pro",w_check:"pro",weather_bg:"pro",photo_frame:"pro",cinematic:"pro",morning:"pro",heat_map:"pro",room_glow:"pro",timers:"pro",fully:"pro",w_forecast:"basic",w_family:"pro",w_todo:"pro",w_calendar:"pro",w_countdown:"pro",messages:"pro",kids:"premium",w_gauge:"basic",lock_history:"pro",w_gate:"pro",sky:"pro",clock_styles:"pro",air_maps:"pro",plan_3d:"premium",people_on_plan:"premium",liquid_glass:"premium",guests:"premium",w_media:"basic",wizard:"basic",transfer:"basic",rating:"basic",w_remote:"pro",maintenance:"pro",broadcast:"premium",cinema:"premium",w_frigate:"premium",w_schedule:"premium",automations:"premium",w_energy_stats:"premium",w_panic:"premium",camera_wall:"premium",seasons:"premium",assistant:"premium",ai_doorbell:"premium",ai_summary:"premium",habits:"premium",ai_explain:"pro",w_consumers:"pro",w_water:"pro",overload:"pro",solar_tip:"pro",bill_budget:"pro",plan_fx:"premium",plan_replay:"premium",floor_stack:"premium",fly_to_room:"pro",robot_on_plan:"pro",travel:"premium",alarm_screen:"pro",package:"pro",weather_alert:"pro",w_wake:"premium",w_chores:"pro",w_air:"pro",light_fx:"premium",person_pages:"pro",history:"pro",report:"pro",presets:"basic",support:"basic",ai_scene:"premium",ai_automation:"premium",ai_cameras:"premium",ai_bill:"premium",voice:"premium",w_boiler:"premium",w_irrigation:"pro",home_helpers:"pro",w_timeline:"premium",w_internet:"premium",guest_codes:"premium",faces:"premium",w_board:"pro",w_verse:"basic",w_radar:"pro",w_commute:"pro",w_parcels:"pro",tou:"pro",energy_challenge:"basic",refill:"basic",heartbeat:"basic",warranty:"pro",battery_plan:"pro",showroom:"basic",style_pro:"premium"},Gs=t=>Js[t],Qs=(t,e)=>Ks[t]>=Ks[Js[e]],ta=t=>`w_${t}`;var ea=Object.defineProperty,ia=Object.getOwnPropertyDescriptor,sa=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?ia(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&ea(e,i,n),n};let aa=class extends ct{constructor(){super(...arguments),this.filter={},this.q=""}firstUpdated(){this.renderRoot.querySelector("input")?.focus()}render(){const{ctx:t}=this,e=this.q.trim().toLowerCase(),i=de(t.hass,t.config,this.filter).filter((t=>!e||t.name.toLowerCase().includes(e)||t.id.includes(e))).slice(0,200);return Z`
      <input type="search" placeholder=${t.t("search")} .value=${this.q} @input=${t=>this.q=t.target.value} />
      ${i.length?Z`<ul>
            ${i.map((e=>Z`<li>
                <button class="pressable" @click=${()=>this.onPick(e.id)}>
                  <span class="ic"><sn-icon .icon=${te(e.entity,e.id)} style="--icon-size:20px"></sn-icon></span>
                  <span class="grow"><span class="name">${e.name}</span><span class="id ltr">${e.id}</span></span>
                  <span class="state">${re(t.t,e.entity,t.lang)}</span>
                </button>
              </li>`))}
          </ul>`:Z`<div class="empty">${t.t("no_entities")}</div>`}
    `}};aa.styles=[si,o`
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
    `],sa([gt({attribute:!1})],aa.prototype,"ctx",2),sa([gt({attribute:!1})],aa.prototype,"filter",2),sa([gt({attribute:!1})],aa.prototype,"onPick",2),sa([mt()],aa.prototype,"q",2),aa=sa([pt("sn-entity-picker")],aa);const na=["light","switch","fan","cover","climate","media_player"],ra="smartnest-habits-dismissed",oa=(t,e)=>"cover"===t?"open"===e:"climate"===t?"off"!==e:"media_player"===t&&"playing"===e||"on"===e;function la(){try{return JSON.parse(localStorage.getItem(ra)??"[]")}catch{return[]}}const ca=t=>`${t.entity}|${t.kind}|${t.at.slice(0,2)}`;var da=Object.defineProperty,pa=Object.getOwnPropertyDescriptor,ha=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?pa(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&da(e,i,n),n};const ua=["sun","mon","tue","wed","thu","fri","sat"],ga=["light","switch","fan","input_boolean","media_player","climate","cover","humidifier","siren","scene","script"];function ma(t,e,i="short"){return new Date(2023,0,1+ua.indexOf(t)).toLocaleDateString(e,{weekday:i})}function fa(t,e,i){const s=Xt(e),a=t.states[e]?.attributes.device_class;return"lock"===s?[["locked",i("locked")],["unlocked",i("unlocked")]]:"cover"===s?[["open",i("open")],["closed",i("closed")]]:"person"===s?[["home",i("at_home")],["not_home",i("away_l")]]:"climate"===s?[["off",i("off")],["cool",i("cool")],["heat",i("heat")]]:"alarm_control_panel"===s?[["disarmed",i("disarmed")],["armed_away",i("armed_away")],["triggered",i("triggered")]]:"binary_sensor"===s&&["motion","occupancy","presence"].includes(a)?[["on",i("motion")],["off",i("clear")]]:"binary_sensor"===s&&["door","window","opening","garage_door"].includes(a)?[["on",i("open")],["off",i("closed")]]:[["on",i("on")],["off",i("off")]]}const ba=t=>5===t.length?`${t}:00`:t;function _a(t){const e=t.trigger,i="time"===e.kind?{platform:"time",at:ba(e.at)}:"sun"===e.kind?{platform:"sun",event:e.event,...e.offset?{offset:(s=e.offset,`${s<0?"-":"+"}${String(Math.floor(Math.abs(s)/60)).padStart(2,"0")}:${String(Math.abs(s)%60).padStart(2,"0")}:00`)}:{}}:"state"===e.kind?{platform:"state",entity_id:e.entity,to:e.to}:{platform:"state",entity_id:"input_select.house_mode",to:e.mode};var s;const a=[];t.days.length&&t.days.length<7&&a.push({condition:"time",weekday:t.days}),t.window&&a.push({condition:"time",after:ba(t.window.after),before:ba(t.window.before)});const n=t.actions.map((t=>{if("mode"===t.kind)return{service:"script.turn_on",target:{entity_id:`script.smartnest_mode_${t.mode}`}};if("message"===t.kind)return{service:"smartnest.show_message",data:{message:t.text}};const e=Xt(t.entity);return"scene"===e||"script"===e?{service:`${e}.turn_on`,target:{entity_id:t.entity}}:{service:`homeassistant.turn_${t.kind}`,target:{entity_id:t.entity}}}));return{id:t.id,alias:`SmartNest · ${t.name}`,description:"Made in the SmartNest dashboard",mode:"single",trigger:[i],condition:a,action:n}}function ya(t,e,i,s,a){const n=t=>a[t]||e.states[t]?.attributes.friendly_name||t,r=t.trigger,o="time"===r.kind?r.at:"sun"===r.kind?`${i(r.event)}${r.offset?` ${r.offset>0?"+":"−"}${Math.abs(r.offset)}′`:""}`:"state"===r.kind?`${n(r.entity)} → ${fa(e,r.entity,i).find((([t])=>t===r.to))?.[1]??r.to}`:`${i("widget_modes")} → ${i(hi.find((t=>t.id===r.mode))?.label??"mode_home")}`;return`${t.days.length&&7!==t.days.length?t.days.map((t=>ma(t,s))).join(" "):i("every_day")} · ${o} → ${t.actions.map((t=>"mode"===t.kind?i(hi.find((e=>e.id===t.mode))?.label??"mode_home"):"message"===t.kind?`💬 ${t.text}`:`${i("on"===t.kind?"act_on":"act_off")} ${n(t.entity)}`)).join("ar"===s?"، ":", ")}`}async function va(t){try{return(await t.callWS({type:"smartnest/automations/get"})).items}catch{return[]}}const xa=(t,e)=>Object.values(t.states).find((t=>t.entity_id.startsWith("automation.")&&t.attributes.id===e));function wa(t,e,i){t.showSheet({title:e?e.name:t.t("new_automation"),render:t=>Z`<sn-auto-builder .ctx=${t} .initial=${e} .onSaved=${i}></sn-auto-builder>`})}let $a=class extends ct{constructor(){super(...arguments),this.thinking=!1}connectedCallback(){super.connectedCallback(),this.load()}async load(){this.items=await va(this.ctx.hass),this.ctx.allows("habits")&&async function(t,e){const{hass:i,config:s,t:a}=t,n=ki(s).filter((t=>{const e=i.entities?.[t];return na.includes(Xt(t))&&i.states[t]&&"fully_kiosk"!==e?.platform&&!e?.entity_category})).slice(0,40);if(!n.length)return[];const r=new Date,o=new Date(r.getTime()-12096e5);let l;try{l=await i.callWS({type:"history/history_during_period",start_time:o.toISOString(),end_time:r.toISOString(),entity_ids:n,minimal_response:!0,no_attributes:!0,significant_changes_only:!1})}catch{return[]}const c=new Set(e.flatMap((t=>t.actions.map((t=>"entity"in t?t.entity:""))))),d=new Set(la()),p=[];for(const h of n){if(c.has(h))continue;const t=Xt(h),e=l[h]??[];for(const n of["on","off"]){const r=new Map;let o;for(const i of e){const e=oa(t,i.s);if("unavailable"!==i.s&&"unknown"!==i.s){if(void 0!==o&&e!==o&&"on"===n===e){const t=new Date(1e3*i.lu),e=t.toDateString();r.set(e,[...r.get(e)??[],60*t.getHours()+t.getMinutes()])}o=e}}if(r.size<5)continue;const l=[...r.values()].flat();let c={center:0,days:0};for(const t of l){const e=[...r.values()].filter((e=>e.some((e=>Math.abs(e-t)<=20)))).length;e>c.days&&(c={center:t,days:e})}if(c.days<5)continue;const u=l.filter((t=>Math.abs(t-c.center)<=20)).sort(((t,e)=>t-e)),g=5*Math.round(u[Math.floor(u.length/2)]/5),m=`${String(Math.floor(g/60)%24).padStart(2,"0")}:${String(g%60).padStart(2,"0")}`,f=ca({entity:h,kind:n,at:m});if(d.has(f))continue;const b=Kt(i,s,h);p.push({entity:h,kind:n,at:m,days:c.days,model:{id:Ae(),name:`${b} · ${a("on"===n?"on":"off")} ${m}`,trigger:{kind:"time",at:m},days:[],actions:[{kind:n,entity:h}]}})}}return p.sort(((t,e)=>e.days-t.days)).slice(0,6)}(this.ctx,this.items).then((t=>this.habits=t))}renderHabits(){const{ctx:t}=this,{t:e}=t;return this.habits?.length?Z`<h4 style="margin:10px 0 0;display:flex;gap:6px;align-items:center">
        <sn-icon icon="lightbulb-auto" style="--icon-size:20px;color:var(--accent-text)"></sn-icon>${e("habits_title")}
      </h4>
      ${this.habits.map((i=>Z`<div class="row">
          <span class="txt"
            ><b>${ya(i.model,t.hass,e,Dt[t.lang],t.config.names)}</b><span>${e("habits_seen",{n:i.days})}</span></span
          >
          <button class="btn primary pressable" @click=${()=>wa(t,i.model,(()=>this.load()))}>${e("habits_make")}</button>
          <button
            class="icon-btn small pressable"
            aria-label=${e("dismiss")}
            @click=${()=>{!function(t){try{localStorage.setItem(ra,JSON.stringify([...la(),t].slice(-100)))}catch{}}(ca(i)),this.habits=this.habits.filter((t=>t!==i))}}
          >
            <sn-icon icon="close" style="--icon-size:16px"></sn-icon>
          </button>
        </div>`))}`:q}render(){const{ctx:t}=this,{t:e,hass:i}=t;return Z`<button class="btn primary pressable" @click=${()=>wa(t,void 0,(()=>this.load()))}>
        <sn-icon icon="plus" style="--icon-size:20px"></sn-icon>${e("new_automation")}
      </button>
      ${Ui(i)&&t.allows("ai_automation")?Z`<form
            style="display:flex;gap:8px"
            @submit=${async i=>{i.preventDefault();const s=i.currentTarget.querySelector("input"),a=s.value.trim();if(!a)return;this.thinking=!0;const n=await async function(t,e){const{hass:i,config:s}=t,a=ki(s).filter((t=>i.states[t])),n=Object.keys(i.states).filter((t=>t.startsWith("person.")||t.startsWith("alarm_control_panel."))),r=[...a,...n].slice(0,150).map((t=>`${t}: ${Kt(i,s,t)}`)),o=Yi(await qi(t,"automation",{ask:e,facts:r}),"{");if(!o?.trigger||!Array.isArray(o.actions)||!o.actions.length)return;const l=new Set([...a,...n]),c=o.actions.filter((t=>"message"===t.kind||("on"===t.kind||"off"===t.kind)&&l.has(t.entity)));return!c.length||o.trigger.entity&&!l.has(o.trigger.entity)?void 0:{id:Ae(),name:String(o.name??e).slice(0,60),trigger:o.trigger,days:Array.isArray(o.days)?o.days:[],...o.window&&o.window.after?{window:o.window}:{},actions:c}}(t,a);if(this.thinking=!1,!n)return t.toast(e("ai_auto_fail"));s.value="",wa(t,n,(()=>this.load()))}}
          >
            <input type="text" style="flex:1" placeholder=${e("ai_auto_hint")} />
            <button class="btn pressable" type="submit" ?disabled=${this.thinking}>✨ ${this.thinking?"…":e("ai_do_it")}</button>
          </form>`:q}
      ${this.items&&!this.items.length?Z`<p class="muted" style="margin:0">${e("auto_empty")}</p>`:q}
      ${(this.items??[]).map((s=>{const a=xa(i,s.id),n="on"===a?.state;return Z`<div class="row">
          <sn-icon icon="automation" style="color:var(--accent-text)"></sn-icon>
          <span class="txt"><b>${s.name}</b><span>${ya(s,i,e,Dt[t.lang],t.config.names)}</span></span>
          ${a?Z`<div class="seg">
                ${[!0,!1].map((t=>Z`<button aria-pressed=${n===t} @click=${()=>i.callService("automation",t?"turn_on":"turn_off",{entity_id:a.entity_id})}>${e(t?"on":"off")}</button>`))}
              </div>`:q}
          <button class="icon-btn small pressable" aria-label=${e("edit")} @click=${()=>wa(t,s,(()=>this.load()))}><sn-icon icon="pencil" style="--icon-size:16px"></sn-icon></button>
          <button
            class="icon-btn small pressable"
            aria-label=${e("delete")}
            @click=${async()=>{confirm(e("delete_confirm"))&&(await async function(t,e){await t.fetchWithAuth(`/api/config/automation/config/${e}`,{method:"DELETE"}),await t.callWS({type:"smartnest/automations/set",items:(await va(t)).filter((t=>t.id!==e))})}(i,s.id).catch((()=>t.toast(e("error")))),this.load())}}
          >
            <sn-icon icon="delete" style="--icon-size:16px"></sn-icon>
          </button>
        </div>`}))}
      ${this.renderHabits()}`}};$a.styles=[si,o`
      :host {
        display: grid;
        gap: 10px;
      }
      .row {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px;
        border-radius: var(--r-md);
        background: var(--surface-2);
      }
      .txt {
        flex: 1;
        min-width: 0;
        display: grid;
        gap: 2px;
      }
      .txt b {
        font-size: 15px;
      }
      .txt span {
        font-size: 13px;
        color: var(--text-2);
        unicode-bidi: plaintext;
      }
    `],ha([gt({attribute:!1})],$a.prototype,"ctx",2),ha([mt()],$a.prototype,"items",2),ha([mt()],$a.prototype,"habits",2),ha([mt()],$a.prototype,"thinking",2),$a=ha([pt("sn-auto-list")],$a);let ka=class extends ct{constructor(){super(...arguments),this.saving=!1}willUpdate(){this.m||(this.m=this.initial?structuredClone(this.initial):{id:`smartnest_${Ae()}`,name:"",trigger:{kind:"time",at:"07:00"},days:[],actions:[{kind:"on",entity:""}]})}set(t){const e=structuredClone(this.m);t(e),this.m=e}pickEntity(t,e){this.ctx.showSheet({title:this.ctx.t("choose_entity"),render:i=>Z`<sn-entity-picker
        .ctx=${i}
        .filter=${t}
        .onPick=${t=>{e(t),i.closeSheet()}}
      ></sn-entity-picker>`})}entityBtn(t,e,i){const{ctx:s}=this,a=t?s.hass.states[t]:void 0;return Z`<button class="btn pick pressable" @click=${()=>this.pickEntity(e,i)}>
      ${t?Z`<sn-icon .icon=${te(a,t)} style="--icon-size:20px"></sn-icon>${Kt(s.hass,s.config,t)}`:Z`<span class="muted">${s.t("choose_entity")}</span>`}
    </button>`}renderTrigger(){const{t:t,hass:e}=this.ctx,i=this.m.trigger;return Z`<div class="box">
      <div class="seg">
        ${[["time","trig_time"],["sun","trig_sun"],["state","trig_state"],["mode","trig_mode"]].map((([e,s])=>Z`<button
            aria-pressed=${i.kind===e}
            @click=${()=>this.set((t=>{t.trigger="time"===e?{kind:"time",at:"07:00"}:"sun"===e?{kind:"sun",event:"sunset",offset:0}:"state"===e?{kind:"state",entity:"",to:"on"}:{kind:"mode",mode:"away"}}))}
          >
            ${t(s)}
          </button>`))}
      </div>
      ${"time"===i.kind?Z`<input type="time" .value=${i.at} @change=${t=>this.set((e=>e.trigger.at=t.target.value||"07:00"))} />`:"sun"===i.kind?Z`<div class="row">
            <div class="seg">
              ${["sunrise","sunset"].map((e=>Z`<button aria-pressed=${i.event===e} @click=${()=>this.set((t=>t.trigger.event=e))}>${t(e)}</button>`))}
            </div>
            <label class="field" style="flex:1">${t("offset_min")}<input type="number" step="5" .value=${String(i.offset)} @change=${t=>this.set((e=>e.trigger.offset=Number(t.target.value)||0))} /></label>
          </div>`:"state"===i.kind?Z`<div class="row">
              ${this.entityBtn(i.entity,{},(i=>this.set((s=>{s.trigger={kind:"state",entity:i,to:fa(e,i,t)[0][0]}}))))}
            </div>
            ${i.entity?Z`<div class="row">
                  <span>${t("becomes")}</span>
                  <div class="seg">
                    ${fa(e,i.entity,t).map((([t,e])=>Z`<button aria-pressed=${i.to===t} @click=${()=>this.set((e=>e.trigger.to=t))}>${e}</button>`))}
                  </div>
                </div>`:q}`:Z`<div class="seg">
            ${hi.map((e=>Z`<button aria-pressed=${i.mode===e.id} @click=${()=>this.set((t=>t.trigger.mode=e.id))}>${t(e.label)}</button>`))}
          </div>`}
    </div>`}renderDays(){const{t:t,lang:e}=this.ctx,i=Dt[e],s=!this.m.days.length;return Z`<div class="box">
      <div class="row" style="justify-content:space-between">
        <b style="font-size:14px">${t("days")}</b>
        <button class="btn pressable" style="min-height:34px" @click=${()=>this.set((t=>t.days=[]))}>${t("every_day")}</button>
      </div>
      <div class="days">
        ${ua.map((t=>{const e=s||this.m.days.includes(t);return Z`<button
            aria-pressed=${e}
            @click=${()=>this.set((i=>{const s=i.days.length?i.days:[...ua];i.days=e?s.filter((e=>e!==t)):[...s,t],7===i.days.length&&(i.days=[])}))}
          >
            ${ma(t,i)}
          </button>`}))}
      </div>
      <div class="row">
        <label class="row" style="gap:6px;font-size:14px">
          <input
            type="checkbox"
            .checked=${!!this.m.window}
            @change=${t=>this.set((e=>e.window=t.target.checked?{after:"18:00",before:"23:00"}:void 0))}
            style="width:auto;min-height:auto"
          />${t("only_if")}
        </label>
        ${this.m.window?Z`<input type="time" style="width:auto" .value=${this.m.window.after} @change=${t=>this.set((e=>e.window.after=t.target.value))} />
              <span>–</span>
              <input type="time" style="width:auto" .value=${this.m.window.before} @change=${t=>this.set((e=>e.window.before=t.target.value))} />`:q}
      </div>
    </div>`}renderActions(){const{t:t}=this.ctx;return Z`<div class="box">
      ${this.m.actions.map(((e,i)=>Z`<div style="display:grid;gap:8px;padding-bottom:10px;border-bottom:1px solid var(--border)">
          <div class="row">
            <div class="seg" style="flex:1">
              ${[["on","act_on"],["off","act_off"],["mode","act_mode"],["message","act_message"]].map((([s,a])=>Z`<button
                  aria-pressed=${e.kind===s}
                  @click=${()=>this.set((t=>{const e=t.actions[i];t.actions[i]="mode"===s?{kind:"mode",mode:"sleep"}:"message"===s?{kind:"message",text:""}:{kind:s,entity:"entity"in e?e.entity:""}}))}
                >
                  ${t(a)}
                </button>`))}
            </div>
            ${this.m.actions.length>1?Z`<button class="icon-btn small pressable" aria-label=${t("delete")} @click=${()=>this.set((t=>t.actions.splice(i,1)))}><sn-icon icon="close" style="--icon-size:16px"></sn-icon></button>`:q}
          </div>
          ${"on"===e.kind||"off"===e.kind?this.entityBtn(e.entity,{domains:ga},(t=>this.set((e=>e.actions[i].entity=t)))):"mode"===e.kind?Z`<div class="seg">
                ${hi.map((s=>Z`<button aria-pressed=${e.mode===s.id} @click=${()=>this.set((t=>t.actions[i].mode=s.id))}>${t(s.label)}</button>`))}
              </div>`:Z`<input type="text" placeholder=${t("message_placeholder")} .value=${e.text} @change=${t=>this.set((e=>e.actions[i].text=t.target.value))} />`}
        </div>`))}
      <button class="btn pressable" style="justify-self:start" @click=${()=>this.set((t=>t.actions.push({kind:"on",entity:""})))}>
        <sn-icon icon="plus" style="--icon-size:18px"></sn-icon>${t("add")}
      </button>
    </div>`}valid(){const t=this.m;return!("state"===t.trigger.kind&&!t.trigger.entity)&&(t.actions.length>0&&t.actions.every((t=>"on"===t.kind||"off"===t.kind?!!t.entity:"message"!==t.kind||!!t.text.trim())))}async save(){const{ctx:t}=this;if(!this.valid())return;const e=structuredClone(this.m);e.name.trim()||(e.name=ya(e,t.hass,t.t,Dt[t.lang],t.config.names).split("→")[0].trim()),this.saving=!0;try{await async function(t,e){const i=await t.fetchWithAuth(`/api/config/automation/config/${e.id}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(_a(e))});if(!i.ok)throw new Error(`save ${i.status}`);const s=(await va(t)).filter((t=>t.id!==e.id));await t.callWS({type:"smartnest/automations/set",items:[...s,e]})}(t.hass,e),t.toast(t.t("auto_saved")),this.onSaved?.(),t.closeSheet()}catch{t.toast(t.t("save_failed"))}finally{this.saving=!1}}render(){const{ctx:t}=this,{t:e}=t;return Z`<label class="field">${e("auto_name")}<input type="text" .value=${this.m.name} @change=${t=>this.set((e=>e.name=t.target.value.trim()))} /></label>
      <h4>${e("when")}</h4>
      ${this.renderTrigger()} ${this.renderDays()}
      <h4>${e("then")}</h4>
      ${this.renderActions()}
      <div class="preview">${ya(this.m,t.hass,e,Dt[t.lang],t.config.names)}</div>
      <button class="btn primary pressable" ?disabled=${!this.valid()||this.saving} @click=${()=>this.save()}>${this.saving?e("saving"):e("save")}</button>`}};ka.styles=[si,o`
      :host {
        display: grid;
        gap: 18px;
      }
      h4 {
        margin: 0;
        font-size: 13px;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--accent-text);
      }
      .box {
        display: grid;
        gap: 10px;
        padding: 14px;
        border-radius: var(--r-md);
        background: var(--surface-2);
      }
      .box input,
      .box select {
        background: var(--surface-solid);
      }
      .row {
        display: flex;
        gap: 8px;
        align-items: center;
        flex-wrap: wrap;
      }
      .days {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
      }
      .days button {
        min-width: 44px;
        min-height: 40px;
        border-radius: 12px;
        background: var(--surface-solid);
        font-size: 13px;
        font-weight: 500;
      }
      .days button[aria-pressed="true"] {
        background: var(--accent);
        color: var(--on-accent);
      }
      .pick {
        flex: 1;
        justify-content: flex-start;
        border-radius: var(--r-sm);
        background: var(--surface-solid);
      }
      .preview {
        font-size: 15px;
        padding: 12px 14px;
        border-radius: var(--r-md);
        background: color-mix(in srgb, var(--accent) 14%, transparent);
        unicode-bidi: plaintext;
      }
    `],ha([gt({attribute:!1})],ka.prototype,"ctx",2),ha([gt({attribute:!1})],ka.prototype,"initial",2),ha([gt({attribute:!1})],ka.prototype,"onSaved",2),ha([mt()],ka.prototype,"m",2),ha([mt()],ka.prototype,"saving",2),ka=ha([pt("sn-auto-builder")],ka);var Ca=Object.defineProperty,Ma=Object.getOwnPropertyDescriptor,Aa=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?Ma(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&Ca(e,i,n),n};function Ha(t){const e=Object.values(t.states),i=e.find((t=>t.entity_id.startsWith("sensor.")&&"water"===t.attributes.device_class))?.entity_id,s=e.find((t=>t.entity_id.startsWith("sensor.")&&/tank|خزان/i.test(`${t.entity_id} ${t.attributes.friendly_name??""}`)&&"%"===t.attributes.unit_of_measurement))?.entity_id;return{usage:i,tank:s,valve:e.find((t=>t.entity_id.startsWith("valve.")&&/water|main|مي|ماء/i.test(`${t.entity_id} ${t.attributes.friendly_name??""}`)))?.entity_id??e.find((t=>t.entity_id.startsWith("valve.")))?.entity_id??e.find((t=>t.entity_id.startsWith("switch.")&&/valve|محبس/i.test(`${t.entity_id} ${t.attributes.friendly_name??""}`)))?.entity_id}}const La=t=>Object.values(t.states).filter((t=>t.entity_id.startsWith("binary_sensor.")&&"moisture"===t.attributes.device_class));let Va=class extends ct{constructor(){super(...arguments),this.confirm=!1}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this.timer)}get cfg(){const t=this.widget.config,e=Ha(this.ctx.hass);return{usage:t.usage??e.usage,tank:t.tank??e.tank,valve:t.valve??e.valve}}toggleValve(t){const{hass:e}=this.ctx,i=this.cfg.valve,s=Xt(i),a="valve"===s?t?"open_valve":"close_valve":t?"turn_on":"turn_off";e.callService(s,a,{entity_id:i}).catch((()=>this.ctx.toast(this.ctx.t("error")))),this.confirm=!1}render(){const{ctx:t}=this,{t:e,hass:i,lang:s}=t,a=this.cfg,n=a.usage?i.states[a.usage]:void 0,r=a.tank?i.states[a.tank]:void 0,o=a.valve?i.states[a.valve]:void 0,l=La(i).filter((t=>"on"===t.state)),c=n?.attributes.unit_of_measurement??"L",d=Math.min(100,Math.max(0,Number(r?.state)||0)),p=(h=o?.state,"open"===h||"on"===h||"opening"===h);var h;return Z`<div class="card glass ${l.length?"leak":""}">
      <h3><sn-icon icon="water" style="--icon-size:20px;color:#3a86ff"></sn-icon>${e("widget_water")}</h3>
      <div class="top">
        ${n?Z`<div>
              <div class="big"><sn-num .value=${se(`${ae(Number(n.state),s,"m³"===c?2:0)} ${c}`)}></sn-num></div>
              <div class="lbl">${Kt(i,t.config,n.entity_id)}</div>
            </div>`:q}
        ${r?Z`<div class="tank">
              <span class="lbl">${e("water_tank")} · ${se(`${ae(d,s,0)}%`)}</span>
              <div class="bar" style="--from:${t.rtl?"right":"left"}"><span style="transform:scaleX(${d/100})"></span></div>
            </div>`:q}
      </div>
      <div class="status ${l.length?"bad":""}" role=${l.length?"alert":"status"}>
        <sn-icon class="drop" icon=${l.length?"water-alert":"check-circle"} style="--icon-size:22px;color:${l.length?"var(--alert)":"var(--success)"}"></sn-icon>
        ${l.length?Z`<span>${e("water_leak")}: ${l.map((e=>Kt(i,t.config,e.entity_id))).join("، ")} · ${le(e,l[0].last_changed)}</span>`:Z`<span>${e("water_no_leak")}</span>`}
      </div>
      ${o?Z`<div class="valve">
            <sn-icon icon="valve" style="--icon-size:22px;color:${p?"#3a86ff":"var(--text-2)"}"></sn-icon>
            <span>${e("water_valve")} · <b>${e(p?"open":"closed")}</b></span>
            ${p?this.confirm?Z`<button class="btn danger pressable" @click=${()=>this.toggleValve(!1)}>${e("water_close_confirm")}</button>`:Z`<button
                    class="btn pressable ${l.length?"danger":""}"
                    @click=${()=>{this.confirm=!0,window.clearTimeout(this.timer),this.timer=window.setTimeout((()=>this.confirm=!1),4e3)}}
                  >
                    ${e("water_close")}
                  </button>`:Z`<button class="btn primary pressable" @click=${()=>this.toggleValve(!0)}>${e("water_open")}</button>`}
          </div>`:q}
      ${n||r||o||La(i).length?q:Z`<span class="muted">${e("no_entities")}</span>`}
    </div>`}};function Sa(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}Va.styles=[si,o`
      :host {
        display: block;
        height: 100%;
      }
      .card {
        height: 100%;
        border-radius: var(--r-lg);
        padding: 18px;
        display: grid;
        gap: 14px;
        align-content: start;
        overflow: auto;
        position: relative;
      }
      .card.leak {
        box-shadow: inset 0 0 0 3px var(--alert);
      }
      h3 {
        margin: 0;
        font-size: 16px;
        display: flex;
        gap: 8px;
        align-items: center;
      }
      .top {
        display: flex;
        gap: 18px;
        align-items: end;
        flex-wrap: wrap;
      }
      .big {
        font-size: 34px;
        font-weight: 700;
        line-height: 1;
      }
      .lbl {
        font-size: 13px;
        color: var(--text-2);
      }
      .tank {
        flex: 1;
        min-width: 120px;
        display: grid;
        gap: 6px;
      }
      .bar {
        height: 14px;
        border-radius: 999px;
        background: var(--surface-2);
        overflow: hidden;
        position: relative;
      }
      .bar span {
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, #3a86ff, #5ec8f2);
        border-radius: inherit;
        transform-origin: var(--from);
        transition: transform 800ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .bar span::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.45), transparent);
        animation: wave 2.6s linear infinite;
      }
      .status {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 12px;
        border-radius: var(--r-md);
        background: var(--surface-2);
        font-size: 15px;
      }
      .status.bad {
        background: color-mix(in srgb, var(--alert) 18%, transparent);
        color: var(--alert-text);
        font-weight: 600;
      }
      .status .drop {
        animation: drip 1.2s ease-in-out infinite;
      }
      .valve {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .valve span {
        flex: 1;
      }
      @keyframes wave {
        from {
          transform: translateX(-100%);
        }
        to {
          transform: translateX(100%);
        }
      }
      @keyframes drip {
        50% {
          transform: translateY(3px);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .bar span::after,
        .status .drop {
          animation: none;
        }
      }
    `],Aa([gt({attribute:!1})],Va.prototype,"ctx",2),Aa([gt({attribute:!1})],Va.prototype,"widget",2),Aa([mt()],Va.prototype,"confirm",2),Va=Aa([pt("sn-w-water")],Va);var za,Da,Oa={exports:{}};za=Oa,(Da=function(){var t=function(t,e){var i=t,s=d[e],a=null,n=0,r=null,o=[],l={},c=function(t,e){a=function(t){for(var e=new Array(t),i=0;i<t;i+=1){e[i]=new Array(t);for(var s=0;s<t;s+=1)e[i][s]=null}return e}(n=4*i+17),p(0,0),p(n-7,0),p(0,n-7),u(),h(),m(t,e),i>=7&&g(t),null==r&&(r=b(i,s,o)),f(r,e)},p=function(t,e){for(var i=-1;i<=7;i+=1)if(!(t+i<=-1||n<=t+i))for(var s=-1;s<=7;s+=1)e+s<=-1||n<=e+s||(a[t+i][e+s]=0<=i&&i<=6&&(0==s||6==s)||0<=s&&s<=6&&(0==i||6==i)||2<=i&&i<=4&&2<=s&&s<=4)},h=function(){for(var t=8;t<n-8;t+=1)null==a[t][6]&&(a[t][6]=t%2==0);for(var e=8;e<n-8;e+=1)null==a[6][e]&&(a[6][e]=e%2==0)},u=function(){for(var t=y.getPatternPosition(i),e=0;e<t.length;e+=1)for(var s=0;s<t.length;s+=1){var n=t[e],r=t[s];if(null==a[n][r])for(var o=-2;o<=2;o+=1)for(var l=-2;l<=2;l+=1)a[n+o][r+l]=-2==o||2==o||-2==l||2==l||0==o&&0==l}},g=function(t){for(var e=y.getBCHTypeNumber(i),s=0;s<18;s+=1){var r=!t&&1==(e>>s&1);a[Math.floor(s/3)][s%3+n-8-3]=r}for(s=0;s<18;s+=1)r=!t&&1==(e>>s&1),a[s%3+n-8-3][Math.floor(s/3)]=r},m=function(t,e){for(var i=s<<3|e,r=y.getBCHTypeInfo(i),o=0;o<15;o+=1){var l=!t&&1==(r>>o&1);o<6?a[o][8]=l:o<8?a[o+1][8]=l:a[n-15+o][8]=l}for(o=0;o<15;o+=1)l=!t&&1==(r>>o&1),o<8?a[8][n-o-1]=l:o<9?a[8][15-o-1+1]=l:a[8][15-o-1]=l;a[n-8][8]=!t},f=function(t,e){for(var i=-1,s=n-1,r=7,o=0,l=y.getMaskFunction(e),c=n-1;c>0;c-=2)for(6==c&&(c-=1);;){for(var d=0;d<2;d+=1)if(null==a[s][c-d]){var p=!1;o<t.length&&(p=1==(t[o]>>>r&1)),l(s,c-d)&&(p=!p),a[s][c-d]=p,-1==(r-=1)&&(o+=1,r=7)}if((s+=i)<0||n<=s){s-=i,i=-i;break}}},b=function(t,e,i){for(var s=w.getRSBlocks(t,e),a=$(),n=0;n<i.length;n+=1){var r=i[n];a.put(r.getMode(),4),a.put(r.getLength(),y.getLengthInBits(r.getMode(),t)),r.write(a)}var o=0;for(n=0;n<s.length;n+=1)o+=s[n].dataCount;if(a.getLengthInBits()>8*o)throw"code length overflow. ("+a.getLengthInBits()+">"+8*o+")";for(a.getLengthInBits()+4<=8*o&&a.put(0,4);a.getLengthInBits()%8!=0;)a.putBit(!1);for(;!(a.getLengthInBits()>=8*o||(a.put(236,8),a.getLengthInBits()>=8*o));)a.put(17,8);return function(t,e){for(var i=0,s=0,a=0,n=new Array(e.length),r=new Array(e.length),o=0;o<e.length;o+=1){var l=e[o].dataCount,c=e[o].totalCount-l;s=Math.max(s,l),a=Math.max(a,c),n[o]=new Array(l);for(var d=0;d<n[o].length;d+=1)n[o][d]=255&t.getBuffer()[d+i];i+=l;var p=y.getErrorCorrectPolynomial(c),h=x(n[o],p.getLength()-1).mod(p);for(r[o]=new Array(p.getLength()-1),d=0;d<r[o].length;d+=1){var u=d+h.getLength()-r[o].length;r[o][d]=u>=0?h.getAt(u):0}}var g=0;for(d=0;d<e.length;d+=1)g+=e[d].totalCount;var m=new Array(g),f=0;for(d=0;d<s;d+=1)for(o=0;o<e.length;o+=1)d<n[o].length&&(m[f]=n[o][d],f+=1);for(d=0;d<a;d+=1)for(o=0;o<e.length;o+=1)d<r[o].length&&(m[f]=r[o][d],f+=1);return m}(a,s)};l.addData=function(t,e){var i=null;switch(e=e||"Byte"){case"Numeric":i=k(t);break;case"Alphanumeric":i=C(t);break;case"Byte":i=M(t);break;case"Kanji":i=A(t);break;default:throw"mode:"+e}o.push(i),r=null},l.isDark=function(t,e){if(t<0||n<=t||e<0||n<=e)throw t+","+e;return a[t][e]},l.getModuleCount=function(){return n},l.make=function(){if(i<1){for(var t=1;t<40;t++){for(var e=w.getRSBlocks(t,s),a=$(),n=0;n<o.length;n++){var r=o[n];a.put(r.getMode(),4),a.put(r.getLength(),y.getLengthInBits(r.getMode(),t)),r.write(a)}var d=0;for(n=0;n<e.length;n++)d+=e[n].dataCount;if(a.getLengthInBits()<=8*d)break}i=t}c(!1,function(){for(var t=0,e=0,i=0;i<8;i+=1){c(!0,i);var s=y.getLostPoint(l);(0==i||t>s)&&(t=s,e=i)}return e}())},l.createTableTag=function(t,e){t=t||2;var i="";i+='<table style="',i+=" border-width: 0px; border-style: none;",i+=" border-collapse: collapse;",i+=" padding: 0px; margin: "+(e=void 0===e?4*t:e)+"px;",i+='">',i+="<tbody>";for(var s=0;s<l.getModuleCount();s+=1){i+="<tr>";for(var a=0;a<l.getModuleCount();a+=1)i+='<td style="',i+=" border-width: 0px; border-style: none;",i+=" border-collapse: collapse;",i+=" padding: 0px; margin: 0px;",i+=" width: "+t+"px;",i+=" height: "+t+"px;",i+=" background-color: ",i+=l.isDark(s,a)?"#000000":"#ffffff",i+=";",i+='"/>';i+="</tr>"}return i+="</tbody>",i+="</table>"},l.createSvgTag=function(t,e,i,s){var a={};"object"==typeof arguments[0]&&(t=(a=arguments[0]).cellSize,e=a.margin,i=a.alt,s=a.title),t=t||2,e=void 0===e?4*t:e,(i="string"==typeof i?{text:i}:i||{}).text=i.text||null,i.id=i.text?i.id||"qrcode-description":null,(s="string"==typeof s?{text:s}:s||{}).text=s.text||null,s.id=s.text?s.id||"qrcode-title":null;var n,r,o,c,d=l.getModuleCount()*t+2*e,p="";for(c="l"+t+",0 0,"+t+" -"+t+",0 0,-"+t+"z ",p+='<svg version="1.1" xmlns="http://www.w3.org/2000/svg"',p+=a.scalable?"":' width="'+d+'px" height="'+d+'px"',p+=' viewBox="0 0 '+d+" "+d+'" ',p+=' preserveAspectRatio="xMinYMin meet"',p+=s.text||i.text?' role="img" aria-labelledby="'+_([s.id,i.id].join(" ").trim())+'"':"",p+=">",p+=s.text?'<title id="'+_(s.id)+'">'+_(s.text)+"</title>":"",p+=i.text?'<description id="'+_(i.id)+'">'+_(i.text)+"</description>":"",p+='<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>',p+='<path d="',r=0;r<l.getModuleCount();r+=1)for(o=r*t+e,n=0;n<l.getModuleCount();n+=1)l.isDark(r,n)&&(p+="M"+(n*t+e)+","+o+c);return p+='" stroke="transparent" fill="black"/>',p+="</svg>"},l.createDataURL=function(t,e){t=t||2,e=void 0===e?4*t:e;var i=l.getModuleCount()*t+2*e,s=e,a=i-e;return V(i,i,(function(e,i){if(s<=e&&e<a&&s<=i&&i<a){var n=Math.floor((e-s)/t),r=Math.floor((i-s)/t);return l.isDark(r,n)?0:1}return 1}))},l.createImgTag=function(t,e,i){t=t||2,e=void 0===e?4*t:e;var s=l.getModuleCount()*t+2*e,a="";return a+="<img",a+=' src="',a+=l.createDataURL(t,e),a+='"',a+=' width="',a+=s,a+='"',a+=' height="',a+=s,a+='"',i&&(a+=' alt="',a+=_(i),a+='"'),a+="/>"};var _=function(t){for(var e="",i=0;i<t.length;i+=1){var s=t.charAt(i);switch(s){case"<":e+="&lt;";break;case">":e+="&gt;";break;case"&":e+="&amp;";break;case'"':e+="&quot;";break;default:e+=s}}return e};return l.createASCII=function(t,e){if((t=t||1)<2)return function(t){t=void 0===t?2:t;var e,i,s,a,n,r=1*l.getModuleCount()+2*t,o=t,c=r-t,d={"██":"█","█ ":"▀"," █":"▄","  ":" "},p={"██":"▀","█ ":"▀"," █":" ","  ":" "},h="";for(e=0;e<r;e+=2){for(s=Math.floor((e-o)/1),a=Math.floor((e+1-o)/1),i=0;i<r;i+=1)n="█",o<=i&&i<c&&o<=e&&e<c&&l.isDark(s,Math.floor((i-o)/1))&&(n=" "),o<=i&&i<c&&o<=e+1&&e+1<c&&l.isDark(a,Math.floor((i-o)/1))?n+=" ":n+="█",h+=t<1&&e+1>=c?p[n]:d[n];h+="\n"}return r%2&&t>0?h.substring(0,h.length-r-1)+Array(r+1).join("▀"):h.substring(0,h.length-1)}(e);t-=1,e=void 0===e?2*t:e;var i,s,a,n,r=l.getModuleCount()*t+2*e,o=e,c=r-e,d=Array(t+1).join("██"),p=Array(t+1).join("  "),h="",u="";for(i=0;i<r;i+=1){for(a=Math.floor((i-o)/t),u="",s=0;s<r;s+=1)n=1,o<=s&&s<c&&o<=i&&i<c&&l.isDark(a,Math.floor((s-o)/t))&&(n=0),u+=n?d:p;for(a=0;a<t;a+=1)h+=u+"\n"}return h.substring(0,h.length-1)},l.renderTo2dContext=function(t,e){e=e||2;for(var i=l.getModuleCount(),s=0;s<i;s++)for(var a=0;a<i;a++)t.fillStyle=l.isDark(s,a)?"black":"white",t.fillRect(s*e,a*e,e,e)},l};t.stringToBytes=(t.stringToBytesFuncs={default:function(t){for(var e=[],i=0;i<t.length;i+=1){var s=t.charCodeAt(i);e.push(255&s)}return e}}).default,t.createStringToBytes=function(t,e){var i=function(){for(var i=L(t),s=function(){var t=i.read();if(-1==t)throw"eof";return t},a=0,n={};;){var r=i.read();if(-1==r)break;var o=s(),l=s()<<8|s();n[String.fromCharCode(r<<8|o)]=l,a+=1}if(a!=e)throw a+" != "+e;return n}(),s="?".charCodeAt(0);return function(t){for(var e=[],a=0;a<t.length;a+=1){var n=t.charCodeAt(a);if(n<128)e.push(n);else{var r=i[t.charAt(a)];"number"==typeof r?(255&r)==r?e.push(r):(e.push(r>>>8),e.push(255&r)):e.push(s)}}return e}};var e,i,s,a,n,r=1,o=2,l=4,c=8,d={L:1,M:0,Q:3,H:2},p=0,h=1,u=2,g=3,m=4,f=5,b=6,_=7,y=(e=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],i=1335,s=7973,n=function(t){for(var e=0;0!=t;)e+=1,t>>>=1;return e},(a={}).getBCHTypeInfo=function(t){for(var e=t<<10;n(e)-n(i)>=0;)e^=i<<n(e)-n(i);return 21522^(t<<10|e)},a.getBCHTypeNumber=function(t){for(var e=t<<12;n(e)-n(s)>=0;)e^=s<<n(e)-n(s);return t<<12|e},a.getPatternPosition=function(t){return e[t-1]},a.getMaskFunction=function(t){switch(t){case p:return function(t,e){return(t+e)%2==0};case h:return function(t,e){return t%2==0};case u:return function(t,e){return e%3==0};case g:return function(t,e){return(t+e)%3==0};case m:return function(t,e){return(Math.floor(t/2)+Math.floor(e/3))%2==0};case f:return function(t,e){return t*e%2+t*e%3==0};case b:return function(t,e){return(t*e%2+t*e%3)%2==0};case _:return function(t,e){return(t*e%3+(t+e)%2)%2==0};default:throw"bad maskPattern:"+t}},a.getErrorCorrectPolynomial=function(t){for(var e=x([1],0),i=0;i<t;i+=1)e=e.multiply(x([1,v.gexp(i)],0));return e},a.getLengthInBits=function(t,e){if(1<=e&&e<10)switch(t){case r:return 10;case o:return 9;case l:case c:return 8;default:throw"mode:"+t}else if(e<27)switch(t){case r:return 12;case o:return 11;case l:return 16;case c:return 10;default:throw"mode:"+t}else{if(!(e<41))throw"type:"+e;switch(t){case r:return 14;case o:return 13;case l:return 16;case c:return 12;default:throw"mode:"+t}}},a.getLostPoint=function(t){for(var e=t.getModuleCount(),i=0,s=0;s<e;s+=1)for(var a=0;a<e;a+=1){for(var n=0,r=t.isDark(s,a),o=-1;o<=1;o+=1)if(!(s+o<0||e<=s+o))for(var l=-1;l<=1;l+=1)a+l<0||e<=a+l||0==o&&0==l||r==t.isDark(s+o,a+l)&&(n+=1);n>5&&(i+=3+n-5)}for(s=0;s<e-1;s+=1)for(a=0;a<e-1;a+=1){var c=0;t.isDark(s,a)&&(c+=1),t.isDark(s+1,a)&&(c+=1),t.isDark(s,a+1)&&(c+=1),t.isDark(s+1,a+1)&&(c+=1),0!=c&&4!=c||(i+=3)}for(s=0;s<e;s+=1)for(a=0;a<e-6;a+=1)t.isDark(s,a)&&!t.isDark(s,a+1)&&t.isDark(s,a+2)&&t.isDark(s,a+3)&&t.isDark(s,a+4)&&!t.isDark(s,a+5)&&t.isDark(s,a+6)&&(i+=40);for(a=0;a<e;a+=1)for(s=0;s<e-6;s+=1)t.isDark(s,a)&&!t.isDark(s+1,a)&&t.isDark(s+2,a)&&t.isDark(s+3,a)&&t.isDark(s+4,a)&&!t.isDark(s+5,a)&&t.isDark(s+6,a)&&(i+=40);var d=0;for(a=0;a<e;a+=1)for(s=0;s<e;s+=1)t.isDark(s,a)&&(d+=1);return i+=Math.abs(100*d/e/e-50)/5*10},a),v=function(){for(var t=new Array(256),e=new Array(256),i=0;i<8;i+=1)t[i]=1<<i;for(i=8;i<256;i+=1)t[i]=t[i-4]^t[i-5]^t[i-6]^t[i-8];for(i=0;i<255;i+=1)e[t[i]]=i;var s={glog:function(t){if(t<1)throw"glog("+t+")";return e[t]},gexp:function(e){for(;e<0;)e+=255;for(;e>=256;)e-=255;return t[e]}};return s}();function x(t,e){if(void 0===t.length)throw t.length+"/"+e;var i=function(){for(var i=0;i<t.length&&0==t[i];)i+=1;for(var s=new Array(t.length-i+e),a=0;a<t.length-i;a+=1)s[a]=t[a+i];return s}(),s={getAt:function(t){return i[t]},getLength:function(){return i.length},multiply:function(t){for(var e=new Array(s.getLength()+t.getLength()-1),i=0;i<s.getLength();i+=1)for(var a=0;a<t.getLength();a+=1)e[i+a]^=v.gexp(v.glog(s.getAt(i))+v.glog(t.getAt(a)));return x(e,0)},mod:function(t){if(s.getLength()-t.getLength()<0)return s;for(var e=v.glog(s.getAt(0))-v.glog(t.getAt(0)),i=new Array(s.getLength()),a=0;a<s.getLength();a+=1)i[a]=s.getAt(a);for(a=0;a<t.getLength();a+=1)i[a]^=v.gexp(v.glog(t.getAt(a))+e);return x(i,0).mod(t)}};return s}var w=function(){var t=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],e=function(t,e){var i={};return i.totalCount=t,i.dataCount=e,i},i={getRSBlocks:function(i,s){var a=function(e,i){switch(i){case d.L:return t[4*(e-1)+0];case d.M:return t[4*(e-1)+1];case d.Q:return t[4*(e-1)+2];case d.H:return t[4*(e-1)+3];default:return}}(i,s);if(void 0===a)throw"bad rs block @ typeNumber:"+i+"/errorCorrectionLevel:"+s;for(var n=a.length/3,r=[],o=0;o<n;o+=1)for(var l=a[3*o+0],c=a[3*o+1],p=a[3*o+2],h=0;h<l;h+=1)r.push(e(c,p));return r}};return i}(),$=function(){var t=[],e=0,i={getBuffer:function(){return t},getAt:function(e){var i=Math.floor(e/8);return 1==(t[i]>>>7-e%8&1)},put:function(t,e){for(var s=0;s<e;s+=1)i.putBit(1==(t>>>e-s-1&1))},getLengthInBits:function(){return e},putBit:function(i){var s=Math.floor(e/8);t.length<=s&&t.push(0),i&&(t[s]|=128>>>e%8),e+=1}};return i},k=function(t){var e=r,i=t,s={getMode:function(){return e},getLength:function(t){return i.length},write:function(t){for(var e=i,s=0;s+2<e.length;)t.put(a(e.substring(s,s+3)),10),s+=3;s<e.length&&(e.length-s==1?t.put(a(e.substring(s,s+1)),4):e.length-s==2&&t.put(a(e.substring(s,s+2)),7))}},a=function(t){for(var e=0,i=0;i<t.length;i+=1)e=10*e+n(t.charAt(i));return e},n=function(t){if("0"<=t&&t<="9")return t.charCodeAt(0)-"0".charCodeAt(0);throw"illegal char :"+t};return s},C=function(t){var e=o,i=t,s={getMode:function(){return e},getLength:function(t){return i.length},write:function(t){for(var e=i,s=0;s+1<e.length;)t.put(45*a(e.charAt(s))+a(e.charAt(s+1)),11),s+=2;s<e.length&&t.put(a(e.charAt(s)),6)}},a=function(t){if("0"<=t&&t<="9")return t.charCodeAt(0)-"0".charCodeAt(0);if("A"<=t&&t<="Z")return t.charCodeAt(0)-"A".charCodeAt(0)+10;switch(t){case" ":return 36;case"$":return 37;case"%":return 38;case"*":return 39;case"+":return 40;case"-":return 41;case".":return 42;case"/":return 43;case":":return 44;default:throw"illegal char :"+t}};return s},M=function(e){var i=l,s=t.stringToBytes(e),a={getMode:function(){return i},getLength:function(t){return s.length},write:function(t){for(var e=0;e<s.length;e+=1)t.put(s[e],8)}};return a},A=function(e){var i=c,s=t.stringToBytesFuncs.SJIS;if(!s)throw"sjis not supported.";!function(){var t=s("友");if(2!=t.length||38726!=(t[0]<<8|t[1]))throw"sjis not supported."}();var a=s(e),n={getMode:function(){return i},getLength:function(t){return~~(a.length/2)},write:function(t){for(var e=a,i=0;i+1<e.length;){var s=(255&e[i])<<8|255&e[i+1];if(33088<=s&&s<=40956)s-=33088;else{if(!(57408<=s&&s<=60351))throw"illegal char at "+(i+1)+"/"+s;s-=49472}s=192*(s>>>8&255)+(255&s),t.put(s,13),i+=2}if(i<e.length)throw"illegal char at "+(i+1)}};return n},H=function(){var t=[],e={writeByte:function(e){t.push(255&e)},writeShort:function(t){e.writeByte(t),e.writeByte(t>>>8)},writeBytes:function(t,i,s){i=i||0,s=s||t.length;for(var a=0;a<s;a+=1)e.writeByte(t[a+i])},writeString:function(t){for(var i=0;i<t.length;i+=1)e.writeByte(t.charCodeAt(i))},toByteArray:function(){return t},toString:function(){var e="";e+="[";for(var i=0;i<t.length;i+=1)i>0&&(e+=","),e+=t[i];return e+="]"}};return e},L=function(t){var e=t,i=0,s=0,a=0,n={read:function(){for(;a<8;){if(i>=e.length){if(0==a)return-1;throw"unexpected end of file./"+a}var t=e.charAt(i);if(i+=1,"="==t)return a=0,-1;t.match(/^\s$/)||(s=s<<6|r(t.charCodeAt(0)),a+=6)}var n=s>>>a-8&255;return a-=8,n}},r=function(t){if(65<=t&&t<=90)return t-65;if(97<=t&&t<=122)return t-97+26;if(48<=t&&t<=57)return t-48+52;if(43==t)return 62;if(47==t)return 63;throw"c:"+t};return n},V=function(t,e,i){for(var s=function(t,e){var i=t,s=e,a=new Array(t*e),n={setPixel:function(t,e,s){a[e*i+t]=s},write:function(t){t.writeString("GIF87a"),t.writeShort(i),t.writeShort(s),t.writeByte(128),t.writeByte(0),t.writeByte(0),t.writeByte(0),t.writeByte(0),t.writeByte(0),t.writeByte(255),t.writeByte(255),t.writeByte(255),t.writeString(","),t.writeShort(0),t.writeShort(0),t.writeShort(i),t.writeShort(s),t.writeByte(0);var e=r(2);t.writeByte(2);for(var a=0;e.length-a>255;)t.writeByte(255),t.writeBytes(e,a,255),a+=255;t.writeByte(e.length-a),t.writeBytes(e,a,e.length-a),t.writeByte(0),t.writeString(";")}},r=function(t){for(var e=1<<t,i=1+(1<<t),s=t+1,n=o(),r=0;r<e;r+=1)n.add(String.fromCharCode(r));n.add(String.fromCharCode(e)),n.add(String.fromCharCode(i));var l,c,d,p=H(),h=(l=p,c=0,d=0,{write:function(t,e){if(t>>>e!=0)throw"length over";for(;c+e>=8;)l.writeByte(255&(t<<c|d)),e-=8-c,t>>>=8-c,d=0,c=0;d|=t<<c,c+=e},flush:function(){c>0&&l.writeByte(d)}});h.write(e,s);var u=0,g=String.fromCharCode(a[u]);for(u+=1;u<a.length;){var m=String.fromCharCode(a[u]);u+=1,n.contains(g+m)?g+=m:(h.write(n.indexOf(g),s),n.size()<4095&&(n.size()==1<<s&&(s+=1),n.add(g+m)),g=m)}return h.write(n.indexOf(g),s),h.write(i,s),h.flush(),p.toByteArray()},o=function(){var t={},e=0,i={add:function(s){if(i.contains(s))throw"dup key:"+s;t[s]=e,e+=1},size:function(){return e},indexOf:function(e){return t[e]},contains:function(e){return void 0!==t[e]}};return i};return n}(t,e),a=0;a<e;a+=1)for(var n=0;n<t;n+=1)s.setPixel(n,a,i(n,a));var r=H();s.write(r);for(var o=function(){var t=0,e=0,i=0,s="",a={},n=function(t){s+=String.fromCharCode(r(63&t))},r=function(t){if(t<0);else{if(t<26)return 65+t;if(t<52)return t-26+97;if(t<62)return t-52+48;if(62==t)return 43;if(63==t)return 47}throw"n:"+t};return a.writeByte=function(s){for(t=t<<8|255&s,e+=8,i+=1;e>=6;)n(t>>>e-6),e-=6},a.flush=function(){if(e>0&&(n(t<<6-e),t=0,e=0),i%3!=0)for(var a=3-i%3,r=0;r<a;r+=1)s+="="},a.toString=function(){return s},a}(),l=r.toByteArray(),c=0;c<l.length;c+=1)o.writeByte(l[c]);return o.flush(),"data:image/gif;base64,"+o};return t}()).stringToBytesFuncs["UTF-8"]=function(t){return function(t){for(var e=[],i=0;i<t.length;i++){var s=t.charCodeAt(i);s<128?e.push(s):s<2048?e.push(192|s>>6,128|63&s):s<55296||s>=57344?e.push(224|s>>12,128|s>>6&63,128|63&s):(i++,s=65536+((1023&s)<<10|1023&t.charCodeAt(i)),e.push(240|s>>18,128|s>>12&63,128|s>>6&63,128|63&s))}return e}(t)},za.exports=Da;const ja=Sa(Oa.exports);var Ta=Object.defineProperty,Pa=Object.getOwnPropertyDescriptor,Na=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?Pa(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&Ta(e,i,n),n};const Ia="smartnest-guests";function Wa(t,e=160){const i=ja(0,"M");i.addData(t),i.make();const s=i.getModuleCount(),a=[];for(let n=0;n<s;n++)for(let t=0;t<s;t++)i.isDark(n,t)&&a.push(`M${t} ${n}h1v1h-1z`);return Z`<svg viewBox="-2 -2 ${s+4} ${s+4}" width=${e} height=${e} role="img" aria-label="Wi-Fi QR" shape-rendering="crispEdges">
    ${F`<rect x="-2" y="-2" width=${s+4} height=${s+4} rx="2" fill="#fff"></rect><path d=${a.join("")} fill="#1E252B"></path>`}
  </svg>`}let Ea=class extends ct{constructor(){super(...arguments),this.dim=!1}render(){const{ctx:t}=this,e=t.config.settings.guests;return Z`<div class="card glass">
      <div class="txt">
        <strong>${e.welcome||t.t("welcome_default")} 🤍</strong>
        ${e.ssid?Z`<span><sn-icon icon="wifi"></sn-icon>${e.ssid}</span><span>${t.t("scan_wifi")}</span>`:""}
      </div>
      ${e.ssid?Z`<div class="qr">${Wa(function(t,e){const i=t=>t.replace(/([\;,:"])/g,"\\$1");return e?`WIFI:T:WPA;S:${i(t)};P:${i(e)};;`:`WIFI:T:nopass;S:${i(t)};;`}(e.ssid,e.password),this.dim?140:120)}</div>`:""}
    </div>`}};Ea.styles=[si,o`
      .card {
        display: flex;
        align-items: center;
        gap: 22px;
        padding: 20px 24px;
        border-radius: var(--r-lg);
        margin-bottom: 14px;
        animation: in 500ms cubic-bezier(0.32, 0.72, 0, 1);
      }
      :host([dim]) .card {
        background: rgba(21, 26, 30, 0.55);
        color: #fff;
        border: 0;
        box-shadow: none;
        margin: 0;
      }
      .txt {
        flex: 1;
        display: grid;
        gap: 6px;
      }
      .txt strong {
        font-size: clamp(22px, 3vw, 32px);
      }
      .txt span {
        color: var(--text-2);
        font-size: 15px;
        display: inline-flex;
        gap: 6px;
        align-items: center;
        --icon-size: 18px;
      }
      :host([dim]) .txt span {
        color: rgba(255, 255, 255, 0.8);
      }
      .qr {
        flex: none;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: var(--shadow);
      }
      @keyframes in {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
      }
    `],Na([gt({attribute:!1})],Ea.prototype,"ctx",2),Na([gt({type:Boolean,reflect:!0})],Ea.prototype,"dim",2),Ea=Na([pt("sn-guests")],Ea);var Ra=Object.defineProperty,Ba=Object.getOwnPropertyDescriptor,Za=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?Ba(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&Ra(e,i,n),n};function Fa(t,e){const{hass:i,config:s,t:a}=t,n=Object.values(i.states),r=new Set(ki(s)),o=n.filter((t=>"unavailable"===t.state&&r.has(t.entity_id))).map((t=>Kt(i,s,t.entity_id))),l=n.filter((t=>"battery"===t.attributes.device_class&&"sensor"===Xt(t.entity_id)&&Number(t.state)<20)).map((t=>`${Kt(i,s,t.entity_id)} ${t.state}%`));return[`🏠 ${s.settings.home_name||i.config?.location_name||"SmartNest"} · v${e}`,o.length?`${a("h_offline")}: ${o.slice(0,6).join("، ")}`:`${a("h_offline")}: ✓`,...l.length?[`${a("h_battery")}: ${l.slice(0,4).join("، ")}`]:[]]}const Ua=t=>t.replace(/[&<>"]/g,(t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[t])));const qa=[{id:"gold",label:"preset_gold",accent:"#E9971D",glass:"classic",theme:"schedule"},{id:"sea",label:"preset_sea",accent:"#1E88E5",glass:"liquid",theme:"schedule"},{id:"desert",label:"preset_desert",accent:"#C68B59",glass:"classic",theme:"light"},{id:"night",label:"preset_night",accent:"#8E6CEF",glass:"liquid",theme:"dark"},{id:"rose",label:"preset_rose",accent:"#E85D9E",glass:"classic",theme:"light"},{id:"olive",label:"preset_olive",accent:"#6E9B3A",glass:"classic",theme:"schedule"}];let Ya=class extends ct{createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.ctx.hass.callWS({type:"smartnest/history/list"}).then((t=>this.items=t.items)).catch((()=>this.items=[]))}render(){const{t:t,hass:e,lang:i}=this.ctx;return this.items?this.items.length?Z`<div style="display:grid;gap:8px">
      <span class="muted" style="font-size:14px">${t("history_hint")}</span>
      ${this.items.map((s=>Z`<div style="display:flex;align-items:center;gap:10px;padding:12px;border-radius:var(--r-md);background:var(--surface-2)">
          <span style="flex:1;display:grid;gap:2px">
            <b>${new Date(1e3*s.time).toLocaleString(Dt[i],{weekday:"short",day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})}</b>
            <span class="muted" style="font-size:13px">${le(t,new Date(1e3*s.time).toISOString())} · ${s.user||"–"} · ${t("history_size",{p:s.pages,w:s.widgets})}</span>
          </span>
          <button
            class="btn pressable"
            @click=${async()=>{if(confirm(t("history_confirm")))try{await e.callWS({type:"smartnest/history/restore",version:s.id}),this.ctx.toast(t("history_done")),this.ctx.closeSheet()}catch{this.ctx.toast(t("error"))}}}
          >
            ${t("history_restore")}
          </button>
        </div>`))}
    </div>`:Z`<p class="muted" style="margin:0">${t("history_empty")}</p>`:Z`<span class="muted">${t("loading")}</span>`}};Za([gt({attribute:!1})],Ya.prototype,"ctx",2),Za([mt()],Ya.prototype,"items",2),Ya=Za([pt("sn-history")],Ya);const Xa=(...t)=>Z`<div style="display:grid;gap:18px">${t}</div>`,Ka=(...t)=>Z`<div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">${t}</div>`,Ja=(t,...e)=>Z`<section style="display:grid;gap:12px;padding-top:6px">
    <h3 style="margin:0;font-size:13px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--text-2)">${t}</h3>
    ${e}
  </section>`;function Ga(t,e,i,s,a,n=!1){const r=i?t.hass.states[i]:void 0;return Z`<div class="field">
    ${e}
    <div style="display:flex;gap:8px">
      <button
        class="btn pressable"
        style="flex:1;justify-content:flex-start;border-radius:var(--r-sm)"
        @click=${()=>t.showSheet({title:e,render:t=>Z`<sn-entity-picker
              .ctx=${t}
              .filter=${s}
              .onPick=${e=>{a(e),t.closeSheet()}}
            ></sn-entity-picker>`})}
      >
        ${i?Z`<sn-icon .icon=${te(r,i)} style="--icon-size:20px"></sn-icon>${Kt(t.hass,t.config,i)}`:Z`<span class="muted">${t.t(n?"none":"choose_entity")}</span>`}
      </button>
      ${n&&i?Z`<button class="icon-btn pressable" aria-label=${t.t("delete")} @click=${()=>a(void 0)}>
            <sn-icon icon="close" style="--icon-size:18px"></sn-icon>
          </button>`:q}
    </div>
  </div>`}const Qa={camera:{domains:["camera"]},vacuum:{domains:["vacuum"]},todo:{domains:["todo"]},gauge:{domains:["sensor"]},gate:{domains:["cover"]},media:{domains:["media_player"]},remote:{domains:["remote","media_player"]}};function tn(t,e,i){t.update((t=>{const s=Re(t,e);s&&i(s,t)}))}function en(t,e,i){t.showSheet({title:t.t("widget_settings"),render:t=>{const e=Re(t.config,i);if(!e)return Z``;const s=t.t;switch(e.type){case"tile":case"camera":case"vacuum":case"media":case"remote":return Xa(Ga(t,s("entity"),e.config.entity,Qa[e.type]??{},(e=>tn(t,i,(t=>t.config.entity=e)))),e.config.entity?function(t,e){return Z`<label class="field"
    >${t.t("display_name")}
    <input
      type="text"
      .value=${t.config.names[e]??""}
      placeholder=${t.hass.states[e]?.attributes.friendly_name??e}
      @change=${i=>t.update((t=>{const s=i.target.value.trim();s?t.names[e]=s:delete t.names[e]}))}
    />
    <span class="hint">${t.t("display_name_hint")}</span>
  </label>`}(t,e.config.entity):q);case"gauge":return Xa(Ga(t,s("entity"),e.config.entity,{domains:["sensor"]},(e=>tn(t,i,(t=>t.config.entity=e)))),Z`<div class="row" style="display:flex;gap:8px">
              ${["min","max","low"].map((a=>Z`<label class="field" style="flex:1"
                  >${"low"===a?s("gauge_low")+" %":a}
                  <input type="number" .value=${String(e.config[a]??("max"===a?100:"low"===a?20:0))} @change=${e=>tn(t,i,(t=>t.config[a]=Number(e.target.value)))} />
                </label>`))}
            </div>`,t.allows("refill")?Z`<label class="field"
                  >${s("refill_phone")}
                  <input type="tel" class="ltr" placeholder="972501234567" .value=${e.config.supplier??""} @change=${e=>tn(t,i,(t=>t.config.supplier=e.target.value.trim()||void 0))} />
                  <span class="hint">${s("refill_hint")}</span>
                </label>`:q);case"gate":return Xa(Ga(t,s("widget_gate"),e.config.entity,{domains:["cover"]},(e=>tn(t,i,(t=>t.config.entity=e)))),Ga(t,s("widget_camera"),e.config.camera,{domains:["camera"]},(e=>tn(t,i,(t=>t.config.camera=e))),!0));case"frigate":return Z`<label class="field"
            >Frigate instance ID
            <input type="text" class="ltr" .value=${e.config.instance??"frigate"} @change=${e=>tn(t,i,(t=>t.config.instance=e.target.value.trim()||"frigate"))} />
          </label>`;case"todo":return Ga(t,s("widget_todo"),e.config.entity,{domains:["todo"]},(e=>tn(t,i,(t=>t.config.entity=e))));case"calendar":{const s=Object.keys(t.hass.states).filter((t=>t.startsWith("calendar."))),a=e.config.entities??[];return Z`<div style="display:grid;gap:8px">
            ${s.map((e=>{const n=!a.length||a.includes(e);return Z`<button
                class="btn pressable ${n?"primary":""}"
                style="justify-content:flex-start;font-weight:500"
                @click=${()=>tn(t,i,(t=>{const i=t.config.entities?.length?t.config.entities:[...s];t.config.entities=n?i.filter((t=>t!==e)):[...i,e]}))}
              >
                <sn-icon icon=${n?"check":"close"} style="--icon-size:18px"></sn-icon>${Kt(t.hass,t.config,e)}
              </button>`}))}
          </div>`}case"countdown":{const a=e.config.events??[];return Xa(Z`<div class="field">${s("next_ramadan")} / ${s("next_eid")} ${nn(t,e.config.islamic??"ar"===t.lang,(e=>tn(t,i,(t=>t.config.islamic=e))))}</div>`,...a.map(((e,a)=>Z`<div style="display:flex;gap:8px;align-items:center">
                <span style="flex:1">${e.title}</span><span class="muted ltr">${e.date}</span>
                <button class="icon-btn small pressable" aria-label=${s("delete")} @click=${()=>tn(t,i,(t=>t.config.events.splice(a,1)))}>
                  <sn-icon icon="close" style="--icon-size:16px"></sn-icon>
                </button>
              </div>`)),Z`<form
              style="display:grid;gap:8px"
              @submit=${e=>{e.preventDefault();const s=e.currentTarget,a=s.elements.namedItem("title").value.trim(),n=s.elements.namedItem("date").value;a&&n&&(tn(t,i,(t=>t.config.events=[...t.config.events??[],{title:a,date:n}])),s.reset())}}
            >
              <input name="title" type="text" placeholder=${s("event_title")} />
              <input name="date" type="date" />
              <button class="btn primary pressable" type="submit" style="justify-self:start">${s("add_event")}</button>
            </form>`)}case"energy_stats":{const a=us(t.hass),n=(n,r)=>Ga(t,s(r),e.config[n]??a[n],{domains:["sensor"],deviceClasses:["energy"]},(e=>tn(t,i,(t=>t.config[n]=e))),!0);return Xa(n("total","e_total_energy"),n("solar","e_solar_energy"),Z`<label class="field"
              >${s("tariff")}
              <input type="number" step="0.01" min="0" .value=${String(e.config.tariff??.6)} @change=${e=>tn(t,i,(t=>t.config.tariff=Number(e.target.value)||0))} />
            </label>`,Z`<label class="field"
              >${s("bill_budget")}
              <input type="number" min="0" .value=${String(e.config.budget??"")} placeholder="–" @change=${e=>tn(t,i,(t=>t.config.budget=Number(e.target.value)||void 0))} />
            </label>`,Z`<label class="field"
              >${s("currency")}
              <input type="text" maxlength="4" .value=${e.config.currency??"₪"} @change=${e=>tn(t,i,(t=>t.config.currency=e.target.value.trim()||"₪"))} />
            </label>`)}case"energy":{const a=Ri(t.hass),n=(n,r,o)=>Ga(t,s(r),e.config[n]??a[n],{domains:["sensor"],deviceClasses:o},(e=>tn(t,i,(t=>t.config[n]=e))),!0),r=a=>Z`<div class="field">${s("e_flip")} ${nn(t,!!e.config[a],(e=>tn(t,i,(t=>t.config[a]=e))))}</div>`;return Xa(n("solar","e_solar_entity",["power"]),n("grid","e_grid_entity",["power"]),r("flip_grid"),n("battery","e_battery_entity",["power"]),r("flip_battery"),n("soc","e_soc_entity",["battery"]),n("home","e_home_entity",["power"]))}case"water":{const a=Ha(t.hass),n=(n,r,o)=>Ga(t,s(r),e.config[n]??a[n],o,(e=>tn(t,i,(t=>t.config[n]=e))),!0);return Xa(n("usage","water_usage",{domains:["sensor"],deviceClasses:["water"]}),n("tank","water_tank",{domains:["sensor"]}),n("valve","water_valve",{domains:["valve","switch"]}))}case"heading":return Z`<label class="field"
            >${s("heading_text")}
            <input type="text" .value=${e.config.text??""} @change=${e=>tn(t,i,(t=>t.config.text=e.target.value))} />
          </label>`;case"floorplan":return Xa(Z`<div class="field">
              ${s("plan_in_dark")}
              <div class="seg">
                ${[!1,!0].map((a=>Z`<button aria-pressed=${!!e.config.invert_dark===a} @click=${()=>tn(t,i,(t=>t.config.invert_dark=a))}>
                    ${s(a?"plan_invert":"plan_original")}
                  </button>`))}
              </div>
            </div>`,Z`<p class="muted" style="margin:0;font-size:14px">${s("drag_hint")}</p>`);default:return Z`<p class="muted">${s(`widget_${e.type}`)}</p>`}}})}const sn=[{type:"tile",icon:"lightbulb"},{type:"floorplan",icon:"layers"},{type:"camera",icon:"cctv"},{type:"modes",icon:"leave"},{type:"vacuum",icon:"robot-vacuum"},{type:"visitors",icon:"doorbell"},{type:"energy",icon:"solar"},{type:"energy_stats",icon:"lightning-bolt"},{type:"check",icon:"night"},{type:"panic",icon:"alert-circle-outline"},{type:"family",icon:"family"},{type:"todo",icon:"todo"},{type:"calendar",icon:"calendar"},{type:"forecast",icon:"w-partlycloudy"},{type:"countdown",icon:"countdown"},{type:"gauge",icon:"gas"},{type:"gate",icon:"gate"},{type:"frigate",icon:"cctv"},{type:"schedule",icon:"schedule"},{type:"media",icon:"speaker"},{type:"remote",icon:"television"},{type:"consumers",icon:"lightning-bolt"},{type:"water",icon:"water"},{type:"wake",icon:"weather-sunset-up"},{type:"chores",icon:"star"},{type:"air",icon:"leaf"},{type:"boiler",icon:"water-boiler"},{type:"irrigation",icon:"sprinkler"},{type:"timeline",icon:"history"},{type:"internet",icon:"wifi"},{type:"board",icon:"note"},{type:"verse",icon:"book-open-variant"},{type:"radar",icon:"weather-pouring"},{type:"commute",icon:"car"},{type:"parcels",icon:"package"},{type:"clock",icon:"clock-outline"},{type:"heading",icon:"title"}];function an(t,e,i){const s=(t,i)=>t.update((t=>{const s=t.pages.findIndex((t=>t.id===e));s>=0&&i(t,s)}));t.showSheet({title:t.t("page_settings"),render:t=>{const a=t.config.pages.findIndex((t=>t.id===e)),n=t.config.pages[a];if(!n)return Z``;const r=t.t,o=e=>s(t,((t,i)=>{const s=i+e;s<0||s>=t.pages.length||([t.pages[i],t.pages[s]]=[t.pages[s],t.pages[i]])}));return Xa(Z`<label class="field"
          >${r("page_title")}
          <input type="text" .value=${n.title} @change=${e=>s(t,((t,i)=>t.pages[i].title=e.target.value.trim()||n.title))} />
        </label>`,Z`<div class="field">
          ${r("page_icon")}
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(48px,1fr));gap:6px">
            ${Zt.map((e=>Z`<button
                class="icon-btn pressable ${n.icon===e?"primary":""}"
                style="width:100%;border-radius:var(--r-sm)"
                aria-pressed=${n.icon===e}
                @click=${()=>s(t,((t,i)=>t.pages[i].icon=e))}
              >
                <sn-icon .icon=${e}></sn-icon>
              </button>`))}
          </div>
        </div>`,t.allows("person_pages")&&Object.keys(t.hass.states).some((t=>t.startsWith("person.")))?Z`<label class="field"
              >${r("page_person")}
              <select @change=${e=>s(t,((t,i)=>e.target.value?t.pages[i].person=e.target.value:delete t.pages[i].person))}>
                <option value="" ?selected=${!n.person}>${r("page_person_all")}</option>
                ${Object.keys(t.hass.states).filter((t=>t.startsWith("person."))).map((e=>Z`<option value=${e} ?selected=${n.person===e}>${Kt(t.hass,t.config,e)}</option>`))}
              </select>
              <span class="hint">${r("page_person_hint")}</span>
            </label>`:q,Ka(Z`<button class="btn pressable" ?disabled=${0===a} @click=${()=>o(-1)}>${r("move_earlier")}</button>`,Z`<button class="btn pressable" ?disabled=${a===t.config.pages.length-1} @click=${()=>o(1)}>${r("move_later")}</button>`,Z`<span style="flex:1"></span>`,Z`<button
            class="btn danger pressable"
            ?disabled=${t.config.pages.length<=1}
            @click=${()=>{confirm(r("delete_confirm"))&&(s(t,((t,i)=>{t.pages.splice(i,1),t.settings.default_page===e&&(t.settings.default_page=t.pages[0]?.id??"")})),t.closeSheet(),i())}}
          >
            <sn-icon icon="delete" style="--icon-size:20px"></sn-icon>${r("delete")}
          </button>`))}})}function nn(t,e,i){return Z`<div class="seg">
    ${[!0,!1].map((s=>Z`<button aria-pressed=${e===s} @click=${()=>i(s)}>${t.t(s?"on":"off")}</button>`))}
  </div>`}function rn(t,e,i,s,a){return Z`<label class="field"
    >${t}
    <input type="number" min=${i} max=${s} .value=${String(e)} @change=${t=>a(Math.min(s,Math.max(i,Number(t.target.value)||0)))} />
  </label>`}const on=[Me,"#18BCF2","#2FB57A","#F26B68","#A78BFA","#F5BE6A"],ln=[{id:"schedule",label:"theme_schedule"},{id:"auto",label:"theme_auto"},{id:"light",label:"theme_light"},{id:"dark",label:"theme_dark"},{id:"midnight",label:"theme_midnight"}];function cn(t,e){t.showSheet({title:t.t("settings"),render:t=>{const i=t.config.settings,s=t.t,a=e=>t.update(e);return Xa(Z`<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          <button class="btn pressable" @click=${()=>function(t){t.showSheet({title:t.t("health"),render:t=>{const{hass:e,t:i,config:s}=t,a=Object.values(e.states),n=i("h_all_good"),r=new Set(ki(s)),o=a.filter((t=>"unavailable"===t.state&&r.has(t.entity_id))).sort(((t,e)=>t.last_changed.localeCompare(e.last_changed))),l=a.filter((t=>{if("battery"!==t.attributes.device_class)return!1;if("binary_sensor"===Xt(t.entity_id))return"on"===t.state;const e=Number(t.state);return"sensor"===Xt(t.entity_id)&&!Number.isNaN(e)&&e<20})).sort(((t,e)=>Number(t.state)-Number(e.state))),c=a.find((t=>/backup_last_successful_automatic_backup$/.test(t.entity_id))),d=c?Date.parse(c.state):NaN,p=Number.isNaN(d)?void 0:Math.floor((Date.now()-d)/864e5),h=a.filter((t=>"update"===Xt(t.entity_id)&&"on"===t.state)),u=Xs(a,/disk_use_percent|disk_usage/),g=Xs(a,/processor_temperature|cpu_temperature/),m=Xs(a,/memory_use_percent|memory_usage/),f=[u&&Ys(i("h_disk"),se(`${ae(Number(u.state),t.lang,0)}%`)),g&&Ys(i("h_cpu_temp"),se(`${ae(Number(g.state),t.lang,0)}°`)),m&&Ys(i("h_memory"),se(`${ae(Number(m.state),t.lang,0)}%`))].filter(Boolean),b=u&&Number(u.state)>85||g&&Number(g.state)>75,_=[...r].filter((t=>"vacuum"===Xt(t)&&e.states[t])),y=_.flatMap((t=>{const a=vs(e,t);return ys.filter((t=>a.parts[t.key])).flatMap((n=>{const r=xs(e.states[a.parts[n.key]]);return void 0!==r&&r/n.life<.15?[{robot:Kt(e,s,t),part:i(n.label),h:r}]:[]}))})),v=Oi(e).map((t=>{const i=Object.values(e.entities??{}).filter((e=>e.device_id===t.deviceId)),s=t=>t.translation_key??t.entity_id.split(".")[1],a=i.find((t=>t.entity_id.startsWith("sensor.")&&/battery/.test(s(t)))),n=i.find((t=>t.entity_id.startsWith("binary_sensor.")&&/plugged/.test(s(t)))),r=i.find((t=>t.entity_id.startsWith("button.")&&/load_start_url|restart_browser/.test(s(t))));return{tab:t,battery:a&&e.states[a.entity_id],plugged:n&&e.states[n.entity_id],reload:r?.entity_id}}));return Z`<div style="display:grid;gap:12px">
        ${Us(i("h_offline"),!o.length,qs(o.map((t=>Ys(Kt(e,s,t.entity_id),le(i,t.last_changed))))),n)}
        ${Us(i("h_battery"),!l.length,qs(l.map((t=>Ys(Kt(e,s,t.entity_id),"sensor"===Xt(t.entity_id)?se(`${t.state}%`):"!")))),n)}
        ${c?Us(i("h_backup"),void 0!==p&&p<=7,qs([Ys(i("h_backup"),void 0===p?"–":i("h_days_ago",{n:p}))]),0===p?i("today"):i("h_days_ago",{n:p??0})):Us(i("h_backup"),!1,Z`<span class="muted" style="font-size:14px">${i("h_backup_missing")}</span>`,"")}
        ${Us(i("h_updates"),!h.length,qs(h.map((t=>Ys(t.attributes.title??t.attributes.friendly_name??t.entity_id,t.attributes.latest_version??"")))),n)}
        ${f.length?Us(i("h_system"),!b,qs(f),"",!0):q}
        ${_.length?Us(i("h_robot_parts"),!y.length,qs(y.map((e=>Ys(`${e.robot} · ${e.part}`,i("hours_left",{n:se(ae(e.h,t.lang,0))}))))),n):q}
        ${v.length?Z`<section style="display:grid;gap:8px;padding:14px 16px;border-radius:var(--r-md);background:var(--surface-2)">
              <div style="font-weight:700">${i("h_tablets")}</div>
              ${v.map((s=>Z`<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
                  <strong style="flex:1">${s.tab.name}</strong>
                  ${s.battery?Z`<span class="muted ltr">${s.battery.state}%</span>`:q}
                  ${s.plugged?Z`<span class="muted">${i("on"===s.plugged.state?"h_charging":"h_not_charging")}</span>`:q}
                  ${s.reload?Z`<button class="btn pressable" @click=${()=>e.callService("button","press",{entity_id:s.reload}).then((()=>t.toast(i("done")))).catch((()=>t.toast(i("error"))))}>
                        ${i("h_reload")}
                      </button>`:q}
                </div>`))}
            </section>`:q}
        ${t.config.settings.maintenance.length?(()=>{const e=Ls(t.config),s=e.filter((t=>t.days<=7));return Us(i("maintenance"),!s.length,qs(e.sort(((t,e)=>t.days-e.days)).map((t=>Ys(t.title,t.days<0?i("m_overdue",{n:-t.days}):i("m_in",{n:t.days}))))),n)})():q}
        <sn-explain .ctx=${t} .offline=${o} .low=${l}></sn-explain>
        ${t.allows("battery_plan")?Z`<sn-battery-plan .ctx=${t}></sn-battery-plan>`:q}
        ${t.allows("warranty")?Z`<sn-warranty .ctx=${t}></sn-warranty>`:q}
        <sn-faults .ctx=${t}></sn-faults>
        <p class="muted" style="margin:4px 0 0;font-size:13px">${i("h_telegram")}</p>
      </div>`}})}(t)}><sn-icon icon="gauge" style="--icon-size:20px"></sn-icon>${s("health")}</button>
          ${t.allows("automations")?Z`<button class="btn pressable" @click=${()=>function(t){t.showSheet({title:t.t("automations"),render:t=>Z`<sn-auto-list .ctx=${t}></sn-auto-list>`})}(t)}><sn-icon icon="automation" style="--icon-size:20px"></sn-icon>${s("automations")}</button>`:q}
          <button class="btn pressable" @click=${()=>async function(t){let e=!1;try{e=(await t.hass.callWS({type:"smartnest/issuer/status"})).ready}catch{}const i=()=>{history.pushState(null,"","/smartnest-licenses"),window.dispatchEvent(new CustomEvent("location-changed"))};if(e)return i();t.showSheet({title:"🔑 التراخيص",render:t=>Z`<div style="display:grid;gap:12px">
      <span class="muted">ارفع ملف <bdi><b>license-private.pem</b></bdi> من فولدر <bdi><b>.smartnest</b></bdi> على الكمبيوتر. بعدها بتطلع صفحة <b>التراخيص</b> بالقائمة الجانبية، بهالبيت بس وللأدمن بس.</span>
      <label class="btn primary pressable" style="min-height:52px;cursor:pointer">
        <sn-icon icon="upload" style="--icon-size:20px"></sn-icon>اختار الملف
        <input
          type="file"
          style="display:none"
          @change=${async e=>{const s=e.target.files?.[0];if(s)try{await t.hass.callWS({type:"smartnest/issuer/setup",pem:await s.text()}),t.toast("تمام ✓"),t.closeSheet(),window.setTimeout(i,600)}catch{t.toast("هاد مش مفتاح SmartNest الصح")}}}
        />
      </label>
    </div>`})}(t)}><sn-icon icon="key" style="--icon-size:20px"></sn-icon>التراخيص</button>
          ${t.allows("history")?Z`<button class="btn pressable" @click=${()=>(t=>t.showSheet({title:t.t("history"),render:t=>Z`<sn-history .ctx=${t}></sn-history>`}))(t)}><sn-icon icon="history" style="--icon-size:20px"></sn-icon>${s("history")}</button>`:q}
          ${t.allows("report")?Z`<button class="btn pressable" @click=${()=>async function(t,e){const{hass:i,config:s,t:a,lang:n}=t,r=Dt[n],o=new Date,l=new Date(o.getFullYear(),o.getMonth(),1),c=s.pages.flatMap((t=>t.widgets)).find((t=>"energy_stats"===t.type))?.config??{},d=c.total??us(i).total,p=Number(c.tariff??.6),h=c.currency??"₪";let u;if(d)try{u=((await i.callWS({type:"recorder/statistics_during_period",start_time:l.toISOString(),end_time:o.toISOString(),statistic_ids:[d],period:"day",types:["change"]}))[d]??[]).reduce(((t,e)=>t+(e.change??0)),0)}catch{}const g=await Ds(t,30),m=Ls(s).sort(((t,e)=>t.days-e.days)),f=ki(s).filter((t=>i.states[t])),b=f.filter((t=>"unavailable"===i.states[t].state)),_=Object.values(i.states).filter((t=>t.entity_id.startsWith("automation.")&&String(t.attributes.friendly_name??"").startsWith("SmartNest"))),y=s.settings.home_name||i.config?.location_name||"SmartNest",v=s.settings.installer,x=new URL(`${e}logo/smartnest-symbol-color.svg`,location.href).href,w=t=>`<li>${Ua(t)}</li>`,$=(t,e)=>`<section><h2>${Ua(t)}</h2>${e}</section>`,k=`<!doctype html><html lang="${n}" dir="${Vt(n)?"rtl":"ltr"}"><head><meta charset="utf-8"><title>${Ua(y)}</title>\n<style>\nbody{font-family:Rubik,system-ui,-apple-system,"Segoe UI",Tahoma,sans-serif;color:#1d1d1f;margin:32px;}\nheader{display:flex;align-items:center;gap:16px;border-bottom:3px solid #E9971D;padding-bottom:16px;margin-bottom:20px}\nheader img{width:56px;height:56px} h1{margin:0;font-size:26px} .sub{color:#6e6e73;font-size:14px}\n.grid{display:grid;grid-template-columns:1fr 1fr;gap:16px} section{border:1px solid #e5e5ea;border-radius:16px;padding:16px;break-inside:avoid}\nh2{margin:0 0 8px;font-size:16px;color:#E9971D} .big{font-size:30px;font-weight:700;unicode-bidi:plaintext} .sub{unicode-bidi:plaintext} ul{margin:0;padding-inline-start:18px;line-height:1.7}\nfooter{margin-top:24px;color:#6e6e73;font-size:12px;display:flex;justify-content:space-between}\n@page{margin:14mm}\n</style></head><body>\n<header><img src="${x}" alt=""><div><h1>${Ua(a("report_title",{name:y}))}</h1><div class="sub">${Ua(o.toLocaleDateString(r,{month:"long",year:"numeric"}))}</div></div></header>\n<div class="grid">\n${void 0!==u?$(a("bill_title"),`<div class="big">${Ua(`${ae(u,n,0)} kWh`)}</div><div class="sub">≈ ${Ua(`${h} ${ae(u*p,n,0)}`)}</div>`):""}\n${$(a("report_devices"),`<div class="big">${f.length}</div><div class="sub">${Ua(a("report_offline",{n:b.length}))}</div>`)}\n${$(a("report_faults"),g.length?`<ul>${g.map((t=>w(`${t.name} · ${a("times",{n:t.n})}`))).join("")}</ul>`:`<div class="sub">${Ua(a("h_all_good"))}</div>`)}\n${$(a("maintenance"),m.length?`<ul>${m.map((t=>w(`${t.title} · ${t.days<0?a("m_overdue",{n:-t.days}):a("m_in",{n:t.days})}`))).join("")}</ul>`:'<div class="sub">–</div>')}\n${$(a("automations"),`<div class="big">${_.length}</div><div class="sub">${Ua(a("report_autos",{n:_.filter((t=>"on"===t.state)).length}))}</div>`)}\n</div>\n<footer><span>${Ua(v.name||"SmartNest")}${v.phone?` · ${Ua(v.phone)}`:""}</span><span>SmartNest</span></footer>\n</body></html>`,C=document.createElement("iframe");C.style.cssText="position:fixed;width:0;height:0;border:0;opacity:0",document.body.appendChild(C),C.srcdoc=k,C.onload=()=>{C.contentWindow?.focus(),C.contentWindow?.print(),window.setTimeout((()=>C.remove()),6e4)}}(t,t.assetBase).catch((()=>t.toast(s("error"))))}><sn-icon icon="file-chart" style="--icon-size:20px"></sn-icon>${s("report")}</button>`:q}
        </div>`,Z`<label class="field"
          >${s("home_name")}
          <input
            type="text"
            .value=${i.home_name}
            placeholder=${t.hass.config?.location_name??""}
            @change=${t=>a((e=>e.settings.home_name=t.target.value.trim()))}
          />
        </label>`,Z`<div class="field">
          ${s("language")}
          <div class="seg">
            ${Lt.map((t=>Z`<button aria-pressed=${i.language===t.id} @click=${()=>a((e=>e.settings.language=t.id))}>${t.label}</button>`))}
          </div>
        </div>`,Z`<div class="field">
          ${s("theme")}
          <div class="seg">
            ${ln.map((t=>Z`<button aria-pressed=${i.theme===t.id} @click=${()=>a((e=>e.settings.theme=t.id))}>${s(t.label)}</button>`))}
          </div>
          ${"schedule"===i.theme?Ka(Z`<span>${s("dark_from")}</span>`,Z`<input type="time" style="width:auto" .value=${i.dark_from} @change=${t=>a((e=>e.settings.dark_from=t.target.value))} />`,Z`<span>${s("dark_to")}</span>`,Z`<input type="time" style="width:auto" .value=${i.dark_to} @change=${t=>a((e=>e.settings.dark_to=t.target.value))} />`):q}
        </div>`,t.allows("presets")?function(t,e){const i=t.config.settings;return Z`<div class="field">
    ${t.t("presets")}
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:8px">
      ${qa.map((s=>{const a=i.accent.toUpperCase()===s.accent&&i.theme===s.theme&&i.glass===s.glass,n="dark"===s.theme;return Z`<button
          class="pressable"
          aria-pressed=${a}
          style="display:grid;gap:8px;justify-items:center;padding:12px;border-radius:var(--r-md);border:2px solid ${a?s.accent:"transparent"};
            background:${n?"#1c1c22":"#f6f1ea"};color:${n?"#fff":"#1d1d1f"};font:600 13px var(--font);cursor:pointer"
          @click=${()=>e((e=>{e.settings.accent=s.accent,e.settings.glass=t.allows("liquid_glass")?s.glass:"classic",e.settings.theme=s.theme}))}
        >
          <span style="display:flex;gap:4px">
            <i style="width:22px;height:22px;border-radius:999px;background:${s.accent}"></i>
            <i style="width:22px;height:22px;border-radius:999px;background:${n?"#2c2c34":"#fff"};box-shadow:inset 0 0 0 1px rgba(0,0,0,.1)"></i>
          </span>
          ${t.t(s.label)}
        </button>`}))}
    </div>
  </div>`}(t,a):q,t.allows("style_pro")?Z`<div class="field">
              ${s("style")}
              <div class="seg">
                ${["classic","pro"].map((t=>Z`<button aria-pressed=${i.style===t} @click=${()=>a((e=>e.settings.style=t))}>${s("pro"===t?"style_pro":"style_classic")}</button>`))}
              </div>
              ${"pro"===i.style?Z`<div class="seg" style="margin-top:8px">
                      ${["none","marble","wood","sand","olive"].map((t=>Z`<button aria-pressed=${i.material===t} @click=${()=>a((e=>e.settings.material=t))}>${s(`material_${t}`)}</button>`))}
                    </div>
                    <div class="field" style="margin-top:8px">${s("night_midnight")} ${nn(t,i.night_midnight,(t=>a((e=>e.settings.night_midnight=t))))}</div>`:q}
              <span class="hint">${s("style_hint")}</span>
            </div>`:q,Z`<div class="field">
          ${s("accent")}
          ${Ka(...on.map((t=>Z`<button
                class="pressable"
                aria-label=${t}
                aria-pressed=${i.accent.toUpperCase()===t}
                style="width:40px;height:40px;border-radius:999px;background:${t};box-shadow:${i.accent.toUpperCase()===t?"0 0 0 3px var(--surface-solid), 0 0 0 5px "+t:"none"}"
                @click=${()=>a((e=>e.settings.accent=t))}
              ></button>`)),Z`<input
              type="color"
              aria-label=${s("accent")}
              .value=${i.accent}
              style="width:40px;height:40px;border:0;padding:0;background:none;border-radius:999px"
              @change=${t=>a((e=>e.settings.accent=t.target.value.toUpperCase()))}
            />`)}
        </div>`,t.allows("liquid_glass")?Z`<div class="field">
              ${s("glass_style")}
              <div class="seg">
                ${["classic","liquid"].map((t=>Z`<button aria-pressed=${i.glass===t} @click=${()=>a((e=>e.settings.glass=t))}>${s(`glass_${t}`)}</button>`))}
              </div>
            </div>`:q,Z`<div class="field">${s("night_plan")} ${nn(t,i.night_plan,(t=>a((e=>e.settings.night_plan=t))))}</div>`,t.allows("seasons")?Z`<div class="field">
              ${s("season")}
              <div class="seg">
                ${["auto","ramadan","eid","off"].map((t=>Z`<button aria-pressed=${i.season===t} @click=${()=>a((e=>e.settings.season=t))}>${s("off"===t?"off":`season_${t}`)}</button>`))}
              </div>
            </div>`:q,t.allows("kids")?Z`<label class="field"
              >${s("kids_page")}
              <select @change=${t=>a((e=>e.settings.kids_page=t.target.value||void 0))}>
                <option value="" ?selected=${!i.kids_page}>${s("none")}</option>
                ${t.config.pages.map((t=>Z`<option value=${t.id} ?selected=${i.kids_page===t.id}>${t.title}</option>`))}
              </select>
            </label>`:q,Z`<label class="field"
          >${s("default_page")}
          <select @change=${t=>a((e=>e.settings.default_page=t.target.value))}>
            ${t.config.pages.map((t=>Z`<option value=${t.id} ?selected=${i.default_page===t.id}>${t.title}</option>`))}
          </select>
        </label>`,Ja(s("screensaver"),Z`<div class="seg">
            ${[!0,!1].map((t=>Z`<button aria-pressed=${i.screensaver.enabled===t} @click=${()=>a((e=>e.settings.screensaver.enabled=t))}>
                ${s(t?"on":"off")}
              </button>`))}
          </div>`,i.screensaver.enabled&&t.allows("clock_styles")?Z`<div class="field">
                ${s("ss_style")}
                <div class="seg">
                  ${["classic","minimal","analog"].map((t=>Z`<button aria-pressed=${i.screensaver.style===t} @click=${()=>a((e=>e.settings.screensaver.style=t))}>${s(`ss_${t}`)}</button>`))}
                </div>
              </div>`:q,i.screensaver.enabled?Z`<label class="field"
                  >${s("screensaver_after")}
                  <input
                    type="number"
                    min="1"
                    max="120"
                    .value=${String(i.screensaver.timeout_min)}
                    @change=${t=>a((e=>e.settings.screensaver.timeout_min=Math.max(1,Number(t.target.value)||5)))}
                  />
                </label>
                ${Ga(t,s("temp_entity"),i.screensaver.temp_entity,{domains:["sensor","climate","weather"]},(t=>a((e=>e.settings.screensaver.temp_entity=t))),!0)}
                <div class="field">${s("photos")} ${nn(t,i.screensaver.photos,(t=>a((e=>e.settings.screensaver.photos=t))))}</div>
                ${i.screensaver.photos?Z`<label class="field"
                        >${s("photo_folder")}
                        <input
                          type="text"
                          class="ltr"
                          .value=${i.screensaver.photo_folder}
                          @change=${t=>a((e=>e.settings.screensaver.photo_folder=(t.target.value.trim().startsWith("media-source://")?t.target.value.trim():t.target.value.trim().replace(/^\/+|\/+$/g,""))||"smartnest-photos"))}
                        />
                        <span class="hint">${s("photos_hint",{folder:i.screensaver.photo_folder})}</span>
                      </label>
                      ${rn(s("photo_seconds"),i.screensaver.photo_seconds,5,600,(t=>a((e=>e.settings.screensaver.photo_seconds=t))))}`:q}`:q),Ja(s("greet_morning")+" ☀️",Z`<label class="field"
            >${s("greeting_name")}
            <input
              type="text"
              .value=${i.greeting_name}
              placeholder=${t.hass.user?.name??""}
              @change=${t=>a((e=>e.settings.greeting_name=t.target.value.trim()))}
            />
            <span class="hint">${s("greeting_name_hint")}</span>
          </label>`,Z`<div class="field">${s("prayer")} ${nn(t,i.prayer,(t=>a((e=>e.settings.prayer=t))))}</div>`,Z`<div class="field">${s("morning_summary")} ${nn(t,i.morning,(t=>a((e=>e.settings.morning=t))))}</div>`),Ja(s("status_bar"),Z`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px">
            ${$i.map((t=>{const e=!i.chips_hidden.includes(t.id);return Z`<button
                class="btn pressable ${e?"primary":""}"
                style="justify-content:flex-start;font-weight:500"
                aria-pressed=${e}
                @click=${()=>a((i=>{const s=new Set(i.settings.chips_hidden);e?s.add(t.id):s.delete(t.id),i.settings.chips_hidden=[...s]}))}
              >
                <sn-icon icon=${e?"check":"close"} style="--icon-size:18px"></sn-icon>${s(t.label)}
              </button>`}))}
          </div>`,Ga(t,s("power_entity"),i.power_entity,{domains:["sensor"],deviceClasses:["power"]},(t=>a((e=>e.settings.power_entity=t))),!0),t.allows("tou")?Z`<div class="field">
                ${s("tou")} ${nn(t,i.tou.enabled,(t=>a((e=>e.settings.tou.enabled=t))))}
                ${i.tou.enabled?Z`${Ka(Z`<span>🌙 ${s("tou_cheap")}</span>`,Z`<input type="time" style="width:auto" .value=${i.tou.cheap_from} @change=${t=>a((e=>e.settings.tou.cheap_from=t.target.value))} />`,Z`<span>←</span>`,Z`<input type="time" style="width:auto" .value=${i.tou.cheap_to} @change=${t=>a((e=>e.settings.tou.cheap_to=t.target.value))} />`)}
                    ${Ka(Z`<span>⚡ ${s("tou_peak")}</span>`,Z`<input type="time" style="width:auto" .value=${i.tou.peak_from} @change=${t=>a((e=>e.settings.tou.peak_from=t.target.value))} />`,Z`<span>←</span>`,Z`<input type="time" style="width:auto" .value=${i.tou.peak_to} @change=${t=>a((e=>e.settings.tou.peak_to=t.target.value))} />`)}`:q}
              </div>`:q,t.allows("overload")?Z`<label class="field"
                >${s("power_limit")}
                <input type="number" min="0" step="100" class="ltr" .value=${String(i.power_limit??"")} placeholder="6000" @change=${t=>a((e=>e.settings.power_limit=Number(t.target.value)||void 0))} />
                <span class="hint">${s("power_limit_hint")}</span>
              </label>`:q),t.allows("guests")?Ja(s("guests_mode"),Z`<label class="field">${s("guests_welcome")}<input type="text" .value=${i.guests.welcome??""} placeholder=${s("welcome_default")} @change=${t=>a((e=>e.settings.guests.welcome=t.target.value.trim()||void 0))} /></label>`,Z`<label class="field">${s("wifi_ssid")}<input type="text" class="ltr" .value=${i.guests.ssid??""} @change=${t=>a((e=>e.settings.guests.ssid=t.target.value.trim()||void 0))} /></label>`,Z`<label class="field">${s("wifi_password")}<input type="text" class="ltr" autocomplete="off" .value=${i.guests.password??""} @change=${t=>a((e=>e.settings.guests.password=t.target.value||void 0))} /></label>`):q,t.allows("travel")?function(t,e){const{t:i,hass:s,config:a}=t,n=a.settings.travel,r=ki(a).filter((t=>s.states[t])),o=r.filter((t=>["switch","valve","water_heater","climate","media_player","fan","humidifier"].includes(Xt(t)))),l=r.filter((t=>"light"===Xt(t))),c=Object.keys(s.services?.notify??{}).filter((t=>"send_message"!==t&&"persistent_notification"!==t)).map((t=>`notify.${t}`)),d=(t,i,n)=>Z`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:8px">
    ${t.map((t=>{const r=i.includes(t);return Z`<button
        class="btn pressable ${r?"primary":""}"
        style="justify-content:flex-start;font-weight:500"
        aria-pressed=${r}
        @click=${()=>e((e=>e.settings.travel[n]=r?e.settings.travel[n].filter((e=>e!==t)):[...e.settings.travel[n],t]))}
      >
        <sn-icon icon=${r?"check":"close"} style="--icon-size:18px"></sn-icon>${Kt(s,a,t)}
      </button>`}))}
  </div>`;return Ja(i("travel"),Z`<span class="field">${i("travel_off_pick")}</span>`,d(o,n.off,"off"),Z`<div class="field">${i("travel_sim")} ${nn(t,n.simulate,(t=>e((e=>e.settings.travel.simulate=t))))}</div>`,n.simulate?d(l,n.lights,"lights"):q,Z`<div class="field">${i("travel_arm")} ${nn(t,n.arm,(t=>e((e=>e.settings.travel.arm=t))))}</div>`,Z`<label class="field"
      >${i("travel_report")}
      <select @change=${t=>e((e=>e.settings.travel.notify=t.target.value||void 0))}>
        <option value="" ?selected=${!n.notify}>–</option>
        ${c.map((t=>Z`<option value=${t} ?selected=${n.notify===t}>${t}</option>`))}
      </select>
    </label>`)}(t,a):q,t.allows("home_helpers")?function(t,e){const{t:i,hass:s,config:a}=t,n=a.settings,r=Object.values(s.states),o=(t,e)=>r.filter((i=>i.entity_id.startsWith(`${t}.`)&&(!e||e.includes(i.attributes.device_class)))).map((t=>t.entity_id)),l=o("sensor",["power"]).sort(((t,e)=>Number(/wash|dry|dish|غسال|نشاف|جلاي/i.test(Kt(s,a,e)+e))-Number(/wash|dry|dish|غسال|نشاف|جلاي/i.test(Kt(s,a,t)+t)))),c=r.filter((t=>t.entity_id.endsWith("_direction_of_travel"))).length,d=(t,e,...s)=>Z`<div style="display:grid;gap:8px;padding:12px;border-radius:var(--r-md);background:var(--surface-2)">
    <b>${t}</b><span class="muted" style="font-size:13px">${i(e)}</span>${s}
  </div>`;return Ja(i("helpers"),d(i("h_appliances"),"h_appliances_hint",dn(t,l.slice(0,24),n.appliances.map((t=>t.power)),((t,i)=>e((e=>{e.settings.appliances=i?[...e.settings.appliances,{power:t,name:Kt(s,a,t).replace(/\s*(power|استهلاك|consumption)\s*/gi," ").trim()}]:e.settings.appliances.filter((e=>e.power!==t))}))))),d(i("h_night_path"),"h_night_path_hint",dn(t,o("binary_sensor",["motion","occupancy","presence"]),n.night_path.motion,((t,i)=>e((e=>e.settings.night_path.motion=pn(e.settings.night_path.motion,t,i))))),dn(t,o("light"),n.night_path.lights,((t,i)=>e((e=>e.settings.night_path.lights=pn(e.settings.night_path.lights,t,i))))),Ka(Z`<span>${i("from")}</span>`,Z`<input type="time" style="width:auto" .value=${n.night_path.from} @change=${t=>e((e=>e.settings.night_path.from=t.target.value))} />`,Z`<span>${i("to")}</span>`,Z`<input type="time" style="width:auto" .value=${n.night_path.to} @change=${t=>e((e=>e.settings.night_path.to=t.target.value))} />`,Z`<span>${i("brightness")}</span>`,Z`<input type="number" min="1" max="100" style="width:80px" .value=${String(n.night_path.brightness)} @change=${t=>e((e=>e.settings.night_path.brightness=Number(t.target.value)||10))} />`)),d(i("h_arrival"),c?"h_arrival_hint":"h_arrival_missing",dn(t,o("climate"),n.arrival.climate,((t,i)=>e((e=>e.settings.arrival.climate=pn(e.settings.arrival.climate,t,i))))),dn(t,o("light"),n.arrival.lights,((t,i)=>e((e=>e.settings.arrival.lights=pn(e.settings.arrival.lights,t,i))))),Ka(Z`<span>${i("h_arrival_km")}</span>`,Z`<input type="number" min="1" max="50" style="width:80px" .value=${String(n.arrival.km)} @change=${t=>e((e=>e.settings.arrival.km=Number(t.target.value)||5))} />`)),d(i("h_outage"),"h_outage_hint",Ga(t,i("h_outage_sensor"),n.outage.sensor,{domains:["binary_sensor","sensor"]},(t=>e((e=>e.settings.outage.sensor=t))),!0),dn(t,[...o("switch"),...o("climate"),...o("water_heater")].filter((t=>!s.entities?.[t]?.entity_category)),n.outage.shed,((t,i)=>e((e=>e.settings.outage.shed=pn(e.settings.outage.shed,t,i)))))))}(t,a):q,t.allows("support")?Ja(s("installer"),Z`<label class="field"
                >${s("heartbeat_url")}<input type="url" class="ltr" placeholder="https://…/api/webhook/smartnest_…" .value=${i.installer.heartbeat_url??""} @change=${t=>a((e=>e.settings.installer.heartbeat_url=t.target.value.trim()||void 0))} />
                <span class="hint">${s("heartbeat_hint")}</span></label
              >`,Z`<label class="field">${s("installer_name")}<input type="text" .value=${i.installer.name??""} placeholder="SmartNest" @change=${t=>a((e=>e.settings.installer.name=t.target.value.trim()||void 0))} /></label>`,Z`<label class="field"
                >${s("installer_phone")}<input type="tel" class="ltr" .value=${i.installer.phone??""} placeholder="972501234567" @change=${t=>a((e=>e.settings.installer.phone=t.target.value.trim()||void 0))} />
                <span class="hint">${s("installer_phone_hint")}</span></label
              >`):q,t.allows("alarm_screen")?Ja(s("emergency"),Z`<label class="field">${s("police_number")}<input type="tel" class="ltr" .value=${i.emergency.police} @change=${t=>a((e=>e.settings.emergency.police=t.target.value.trim()))} /></label>`,Z`<label class="field"
                >${s("emergency_contacts")}
                <textarea
                  rows="3"
                  class="ltr"
                  placeholder="أبو محمد, 0501234567"
                  .value=${i.emergency.contacts.map((t=>`${t.name}, ${t.phone}`)).join("\n")}
                  @change=${t=>a((e=>e.settings.emergency.contacts=String(t.target.value).split("\n").map((t=>t.split(","))).filter((t=>t.length>=2&&t[1].trim())).map((([t,e])=>({name:t.trim(),phone:e.trim()}))).slice(0,4)))}
                ></textarea>
                <span class="hint">${s("emergency_hint")}</span>
              </label>`):q,Ja(s("weather"),Ga(t,s("weather_entity"),i.weather.entity,{domains:["weather"]},(t=>a((e=>e.settings.weather.entity=t))),!0),Z`<div class="field">${s("weather_bg")} ${nn(t,i.weather.background,(t=>a((e=>e.settings.weather.background=t))))}</div>`),function(t,e){const i=t.t,s=t.config.settings.fully,a=Oi(t.hass);if(!a.length)return Ja(i("tablet"),Z`<p class="muted" style="margin:0;font-size:14px">${i("tablet_none")}</p>`);const n=ji(t.hass);return Ja(i("tablet"),Z`<p class="muted" style="margin:0;font-size:14px">
      ${i("tablet_found",{names:a.map((t=>t.name)).join("ar"===t.lang?"، ":", ")})} ·
      ${n?Z`<strong style="color:var(--success)">✓ ${i("tablet_this")}</strong>`:i("tablet_not_this")}
    </p>`,window.fully?q:Z`<p class="muted" style="margin:0;font-size:13px">${i("tablet_js_hint")}</p>`,Z`<div class="field">${i("night_dim")} ${nn(t,s.night_dim,(t=>e((e=>e.settings.fully.night_dim=t))))}</div>`,s.night_dim?Z`${rn(i("night_brightness"),s.night_brightness,1,100,(t=>e((e=>e.settings.fully.night_brightness=t))))}
        ${rn(i("night_off"),s.night_off_min,0,240,(t=>e((e=>e.settings.fully.night_off_min=t))))}`:q,Z`<div class="field">
      ${i("motion_wake")} ${nn(t,s.motion_wake,(t=>e((e=>e.settings.fully.motion_wake=t))))}
      <span class="hint">${i("motion_wake_hint")}</span>
    </div>`)}(t,a),Ja(s("doorbell"),Ga(t,s("doorbell_trigger"),i.doorbell.trigger_entity,{domains:["event","binary_sensor"]},(t=>a((e=>e.settings.doorbell.trigger_entity=t))),!0),Ga(t,s("doorbell_camera"),i.doorbell.camera_entity,{domains:["camera"]},(t=>a((e=>e.settings.doorbell.camera_entity=t))),!0),Ga(t,s("doorbell_lock"),i.doorbell.lock_entity,{domains:["lock"]},(t=>a((e=>e.settings.doorbell.lock_entity=t))),!0),rn(s("keep_days"),i.doorbell.keep_days,1,30,(t=>a((e=>e.settings.doorbell.keep_days=t)))),Z`<button class="btn pressable" style="justify-self:start" @click=${e.testDoorbell}>
            <sn-icon icon="bell-ring" style="--icon-size:20px"></sn-icon>${s("doorbell_test")}
          </button>`),Ja(s("kiosk"),Z`<form
            class="field"
            @submit=${e=>{e.preventDefault();const i=e.currentTarget.querySelector("input"),n=i.value.trim();if(!/^\d{4,8}$/.test(n))return t.toast(s("kiosk_pin_invalid"));const r=Math.random().toString(36).slice(2,10);a((t=>t.settings.kiosk={pin_hash:Vi(n,r),pin_salt:r,pin_length:n.length})),i.value="",t.toast(s("kiosk_pin_saved"))}}
          >
            ${s("kiosk_pin")}
            <div style="display:flex;gap:8px">
              <input type="password" inputmode="numeric" pattern="[0-9]*" maxlength="8" autocomplete="off" placeholder="••••" style="flex:1" />
              <button class="btn primary pressable" type="submit">${s(i.kiosk.pin_hash?"kiosk_pin_change":"kiosk_pin_set")}</button>
            </div>
            <span class="hint">${s("kiosk_pin_hint")}</span>
            <span class="hint">${s("kiosk_full_lock")}</span>
          </form>`,i.kiosk.pin_hash?Z`<button class="btn pressable" style="justify-self:start" @click=${()=>a((t=>t.settings.kiosk={}))}>
                <sn-icon icon="lock-open" style="--icon-size:20px"></sn-icon>${s("kiosk_remove_pin")}
              </button>`:q),t.allows("broadcast")?Ja(s("speakers"),Z`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px">
                ${Object.keys(t.hass.states).filter((t=>t.startsWith("media_player."))).map((e=>{const s=i.speakers.includes(e);return Z`<button
                      class="btn pressable ${s?"primary":""}"
                      style="justify-content:flex-start;font-weight:500"
                      @click=${()=>a((t=>t.settings.speakers=s?t.settings.speakers.filter((t=>t!==e)):[...t.settings.speakers,e]))}
                    >
                      <sn-icon icon=${s?"check":"speaker"} style="--icon-size:18px"></sn-icon>${Kt(t.hass,t.config,e)}
                    </button>`}))}
              </div>`):q,t.allows("maintenance")?Ja(s("maintenance"),...i.maintenance.map(((t,e)=>Z`<div style="display:flex;gap:8px;align-items:center">
                  <span style="flex:1">${t.title}</span>
                  <span class="muted ltr" style="font-size:13px">${t.every_days}d</span>
                  <button class="btn pressable" style="min-height:34px;font-size:13px" @click=${()=>a((t=>t.settings.maintenance[e].last=(new Date).toISOString()))}>
                    ${s("m_done")}
                  </button>
                  <button class="icon-btn small pressable" aria-label=${s("delete")} @click=${()=>a((t=>t.settings.maintenance.splice(e,1)))}>
                    <sn-icon icon="close" style="--icon-size:16px"></sn-icon>
                  </button>
                </div>`)),Z`<form
                style="display:flex;gap:8px;flex-wrap:wrap"
                @submit=${t=>{t.preventDefault();const e=t.currentTarget,i=e.elements.namedItem("title").value.trim(),s=Number(e.elements.namedItem("every").value)||90;i&&(a((t=>t.settings.maintenance.push({id:Ae(),title:i,every_days:s,last:(new Date).toISOString()}))),e.reset())}}
              >
                <input name="title" type="text" placeholder=${s("m_title")} style="flex:2;min-width:160px" />
                <input name="every" type="number" min="1" placeholder=${s("m_every")} style="flex:1;min-width:90px" />
                <button class="btn primary pressable" type="submit">${s("add")}</button>
              </form>`):q,Ja(s("transfer"),Z`<div style="display:flex;gap:8px;flex-wrap:wrap">
            <button class="btn pressable" @click=${()=>function(t){const e=new Blob([JSON.stringify({smartnest:1,config:t},null,2)],{type:"application/json"}),i=document.createElement("a");i.href=URL.createObjectURL(e),i.download=`smartnest-${(t.settings.home_name||"home").replace(/\s+/g,"-")}.json`,i.click(),window.setTimeout((()=>URL.revokeObjectURL(i.href)),2e3)}(t.config)}><sn-icon icon="export" style="--icon-size:18px"></sn-icon>${s("export_config")}</button>
            <label class="btn pressable" style="cursor:pointer">
              <sn-icon icon="import" style="--icon-size:18px"></sn-icon>${s("import_config")}
              <input
                type="file"
                accept="application/json,.json"
                style="display:none"
                @change=${e=>{const i=e.target.files?.[0];e.target.value="",i&&function(t,e){e.text().then((e=>{const i=JSON.parse(e);if(!i?.smartnest||!Array.isArray(i.config?.pages))throw new Error("not smartnest");const s=Ie(i.config,t.lang);t.update((t=>Object.assign(t,s))),t.toast(t.t("import_done"))})).catch((()=>t.toast(t.t("import_bad"))))}(t,i)}}
              />
            </label>
          </div>`),Ja(s("about"),Z`<div style="display:flex;align-items:center;gap:14px">
            <img src="${t.assetBase}logo/smartnest-symbol-${t.dark?"white":"color"}.svg" alt="SmartNest" style="width:48px;height:48px" />
            <div style="display:grid;gap:2px">
              <strong>SmartNest</strong>
              <span class="muted" style="font-size:13px">${s("tagline")}</span>
              <span class="muted ltr" style="font-size:12px;font-family:'JetBrains Mono',monospace">${s("version")} ${e.version}</span>
              ${e.license?.licensee?Z`<span class="muted" style="font-size:12px">${s("licensed_to")} ${e.license.licensee}</span>`:q}
              <button class="btn pressable" style="justify-self:start;min-height:34px;font-size:13px;margin-top:6px" @click=${()=>zs(t)}>
                <sn-icon icon="star" style="--icon-size:16px;color:var(--accent)"></sn-icon>${s("rate_service")}
              </button>
              ${e.license?Z`<span class="muted" style="font-size:12px">
                    ${s("plan_label")}: <strong style="color:var(--accent-text)">${s(`plan_${e.license.plan}`)}</strong>${e.license.trial?` (${s("trial_label")})`:""}
                    ${e.license.expires?Z` · ${s("expires_on")} ${new Date(1e3*e.license.expires).toLocaleDateString()}`:q}
                    ${e.license.reseller?Z` · ${s("via")} ${e.license.reseller}`:q}
                  </span>`:q}
            </div>
          </div>`))}})}function dn(t,e,i,s){return e.length?Z`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:8px">
    ${e.map((e=>{const a=i.includes(e);return Z`<button class="btn pressable ${a?"primary":""}" style="justify-content:flex-start;font-weight:500" aria-pressed=${a} @click=${()=>s(e,!a)}>
        <sn-icon icon=${a?"check":"close"} style="--icon-size:18px"></sn-icon>${Kt(t.hass,t.config,e)}
      </button>`}))}
  </div>`:Z`<span class="muted" style="font-size:13px">${t.t("no_entities")}</span>`}const pn=(t,e,i)=>i?[...new Set([...t,e])]:t.filter((t=>t!==e));var hn=Object.defineProperty,un=Object.getOwnPropertyDescriptor,gn=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?un(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&hn(e,i,n),n};let mn=class extends ct{constructor(){super(...arguments),this.sheets=[],this.closing=!1,this.grown=new WeakSet,this.onKey=t=>{"Escape"===t.key&&this.sheets.length&&this.dismiss()}}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this.onKey)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this.onKey)}useOrigin(t){return!!t.origin?.isConnected&&window.innerWidth>600&&!matchMedia("(prefers-reduced-motion: reduce)").matches}originTransform(t,e){const i=t.getBoundingClientRect(),s=e.getBoundingClientRect(),a=Math.min(1,Math.max(.2,s.width/i.width));return`translate(${s.left+s.width/2-(i.left+i.width/2)}px, ${s.top+s.height/2-(i.top+i.height/2)}px) scale(${a})`}updated(){this.sheets.forEach(((t,e)=>{if(this.grown.has(t))return;if(this.grown.add(t),!this.useOrigin(t))return;const i=this.renderRoot.querySelectorAll(".sheet")[e];i&&(i.classList.add("from-origin"),i.animate([{transform:this.originTransform(i,t.origin),opacity:.4},{transform:"none",opacity:1}],{duration:380,easing:"cubic-bezier(0.32, 0.72, 0, 1)"}))}))}dismiss(){const t=this.sheets[this.sheets.length-1];if(1===this.sheets.length&&this.useOrigin(t)){const e=this.renderRoot.querySelectorAll(".sheet")[0];return this.closing=!0,void e.animate([{transform:"none",opacity:1},{transform:this.originTransform(e,t.origin),opacity:0}],{duration:240,easing:"cubic-bezier(0.22, 1, 0.36, 1)",fill:"forwards"}).finished.then((()=>{this.closing=!1,t.onClose?.(),this.ctx.closeSheet()}))}1===this.sheets.length?(this.closing=!0,window.setTimeout((()=>{this.closing=!1,t.onClose?.(),this.ctx.closeSheet()}),190)):(t.onClose?.(),this.ctx.closeSheet())}render(){return this.sheets.length?this.sheets.map(((t,e)=>Z`
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
      `)):q}};mn.styles=[si,o`
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
        animation: fade-out var(--dur-fast) var(--ease-out) forwards;
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
        animation: rise 380ms var(--ease-drawer);
      }
      .closing .sheet {
        animation: sink var(--dur-fast) var(--ease-out) forwards;
      }
      .sheet.from-origin,
      .closing .sheet.from-origin {
        animation: none; /* driven by WAAPI from the tile */
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
    `],gn([gt({attribute:!1})],mn.prototype,"ctx",2),gn([gt({attribute:!1})],mn.prototype,"sheets",2),gn([mt()],mn.prototype,"closing",2),mn=gn([pt("sn-sheet-host")],mn);const fn=o`
  .living-spin {
    animation: sn-spin 1.6s linear infinite;
  }
  .living-drift {
    animation: sn-spin 9s linear infinite;
  }
  .living-glow {
    animation: sn-breathe 2.4s cubic-bezier(0.77, 0, 0.175, 1) infinite alternate;
  }
  .living-wobble {
    animation: sn-wobble 0.9s cubic-bezier(0.77, 0, 0.175, 1) infinite alternate;
  }
  @keyframes sn-spin {
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes sn-breathe {
    to {
      transform: scale(1.1);
    }
  }
  @keyframes sn-wobble {
    from {
      transform: translateX(-2px) rotate(-6deg);
    }
    to {
      transform: translateX(2px) rotate(6deg);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .living-spin,
    .living-drift,
    .living-glow,
    .living-wobble {
      animation: none;
    }
  }
`;function bn(t){if(!t||!Gt(t))return"";const e=Xt(t.entity_id);return"fan"===e?"living-spin":"climate"===e?"heat"===t.state||"heating"===t.attributes.hvac_action?"living-glow":"living-drift":"vacuum"===e&&"cleaning"===t.state?"living-wobble":""}const _n="cubic-bezier(0.22, 1, 0.36, 1)";function yn(t,e,i){if(!t||!e||void 0===i||i===e.state)return;if("unavailable"===i||"unavailable"===e.state)return;if(matchMedia("(prefers-reduced-motion: reduce)").matches)return void t.animate([{opacity:.4},{opacity:1}],{duration:200,easing:_n});const s=Xt(e.entity_id),a=e.attributes.device_class;"light"===s&&"on"===e.state?t.animate([{transform:"scale(0.82)"},{transform:"scale(1.14)",offset:.55},{transform:"scale(1)"}],{duration:280,easing:_n}):"lock"!==s||"locked"!==e.state&&"unlocked"!==e.state?"binary_sensor"===s&&["door","window","opening","garage_door"].includes(a)||"cover"===s?t.animate([{transform:"rotate(-14deg)"},{transform:"rotate(0)"}],{duration:260,easing:_n}):"on"!==e.state&&"off"!==e.state||t.animate([{transform:"scale(0.9)"},{transform:"scale(1)"}],{duration:160,easing:_n}):t.animate([{transform:"perspective(120px) rotateY(-180deg) scale(0.9)"},{transform:"perspective(120px) rotateY(0) scale(1)"}],{duration:380,easing:_n})}var vn=Object.defineProperty,xn=Object.getOwnPropertyDescriptor,wn=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?xn(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&vn(e,i,n),n};let $n=class extends ct{bind(){const t=this.renderRoot.querySelector(".tile");t&&!this.unbind&&(this.unbind=function(t,e,i){let s,a=null,n=!1;const r=()=>{window.clearTimeout(s),s=void 0},o=t=>{0===t.button&&(n=!1,a={x:t.clientX,y:t.clientY},r(),s=window.setTimeout((()=>{n=!0,navigator.vibrate?.(8),i()}),450))},l=t=>{a&&Math.hypot(t.clientX-a.x,t.clientY-a.y)>10&&(r(),a=null)},c=()=>{const t=null!==a&&void 0!==s;r(),a=null,t&&!n&&e()},d=()=>{r(),a=null},p=t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),e())},h=t=>t.preventDefault();return t.addEventListener("pointerdown",o),t.addEventListener("pointermove",l),t.addEventListener("pointerup",c),t.addEventListener("pointercancel",d),t.addEventListener("pointerleave",d),t.addEventListener("keydown",p),t.addEventListener("contextmenu",h),()=>{r(),t.removeEventListener("pointerdown",o),t.removeEventListener("pointermove",l),t.removeEventListener("pointerup",c),t.removeEventListener("pointercancel",d),t.removeEventListener("pointerleave",d),t.removeEventListener("keydown",p),t.removeEventListener("contextmenu",h)}}(t,(()=>this.tap()),(()=>this.ctx.openEntity(this.widget.config.entity,t))))}firstUpdated(){this.bind()}updated(){const t=this.ctx.hass.states[this.widget.config.entity];yn(this.renderRoot.querySelector(".ic sn-icon"),t,this.prevState),this.prevState=t?.state}connectedCallback(){super.connectedCallback(),this.hasUpdated&&this.bind()}disconnectedCallback(){super.disconnectedCallback(),this.unbind?.(),this.unbind=void 0}tap(){if(this.ctx.editing)return;const t=this.widget.config.entity,e=this.ctx.hass.states[t];if(!e||"unavailable"===e.state||"sheet"===ee(t))return this.ctx.openEntity(t,this.renderRoot.querySelector(".tile")??void 0);navigator.vibrate?.(5),ie(this.ctx.hass,e).catch((()=>this.ctx.toast(this.ctx.t("error"))))}render(){const{ctx:t}=this,e=this.widget.config.entity??"",i=t.hass.states[e],s=Gt(i),a=t.narrow||this.widget.h>=3||this.widget.w<=2;return Z`
      <div
        class="tile glass pressable ${a?"vertical":""} ${s?"on":""} ${i&&"unavailable"!==i.state?"":"off-line"}"
        style=${Qt(i)}
        role="button"
        tabindex="0"
        aria-pressed=${s}
      >
        <span class="ic"><sn-icon class=${bn(i)} .icon=${te(i,e)}></sn-icon></span>
        <span class="text">
          <span class="name">${Kt(t.hass,t.config,e)}</span>
          <span class="state">${ls(re(t.t,i,t.lang))}</span>
        </span>
      </div>
    `}};$n.styles=[si,fn,o`
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
      .tile:not(.on) {
        opacity: var(--idle-opacity, 1);
        transition: opacity 600ms var(--ease-out);
      }
      .tile.on {
        --duo-fill: 0.95;
        background: var(--surface-solid);
        box-shadow: 0 16px 40px -14px color-mix(in srgb, var(--tone, var(--accent)) var(--on-glow, 0%), transparent), var(--shadow);
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
    `],wn([gt({attribute:!1})],$n.prototype,"ctx",2),wn([gt({attribute:!1})],$n.prototype,"widget",2),$n=wn([pt("sn-w-tile")],$n);const kn=[{id:"candle",emoji:"🕯️",label:"fx_candle"},{id:"sunset",emoji:"🌅",label:"fx_sunset"},{id:"party",emoji:"🎉",label:"fx_party"},{id:"ramadan",emoji:"🌙",label:"fx_ramadan"},{id:"aurora",emoji:"🌌",label:"fx_aurora"}];function Cn(t,e){const{t:i,hass:s}=t;return Z`<div style="display:grid;gap:8px;width:100%">
    <span class="muted" style="font-size:13px">${i("fx_title")}</span>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      ${kn.map((a=>Z`<button class="btn pressable" style="min-height:40px" @click=${()=>{return n=a.id,s.callWS({type:"smartnest/fx/start",effect:n,lights:e}).then((()=>t.toast(i("fx_started"))),(()=>t.toast(i("error"))));var n}}>${a.emoji} ${i(a.label)}</button>`))}
      <button class="btn pressable" style="min-height:40px" @click=${()=>s.callWS({type:"smartnest/fx/stop",lights:e}).catch((()=>{}))}>⏹ ${i("fx_stop")}</button>
    </div>
  </div>`}const Mn=100;async function An(t){const e=new Image;e.crossOrigin="anonymous",e.src=t,await e.decode();const i=800,s=Math.round(e.naturalHeight/e.naturalWidth*i),a=document.createElement("canvas");a.width=i,a.height=s;const n=a.getContext("2d",{willReadFrequently:!0});return n.fillStyle="#fff",n.fillRect(0,0,i,s),n.drawImage(e,0,0,i,s),function(t){const{width:e,height:i}=t,s=t.data,a=e*i;let n=new Uint8Array(a);const r=new Uint8Array(a);for(let k=0;k<a;k++){const t=s[4*k],e=s[4*k+1],i=s[4*k+2],a=Math.min(t,e,i),o=Math.max(t,e,i);a<150?r[k]=1:a>=200&&a<251&&o-a>=3&&(n[k]=1)}n=function(t,e,i,s){return Ln(t,e,i,s,0)}(function(t,e,i,s){return Ln(t,e,i,s,1)}(n,e,i,2),e,i,2);for(let k=0;k<a;k++)r[k]&&(n[k]=0);const o=new Int32Array(a).fill(-1),l=[],c=new Int32Array(a);for(let k=0;k<a;k++){if(!n[k]||o[k]>=0)continue;const t=l.length;let a=s[4*k],r=s[4*k+1],d=s[4*k+2];const p={n:0,sx:0,sy:0,minX:e,minY:i,maxX:0,maxY:0};let h=0;for(c[h++]=k,o[k]=t;h;){const l=c[--h],u=l%e,g=l/e|0;p.n++,p.sx+=u,p.sy+=g,u<p.minX&&(p.minX=u),u>p.maxX&&(p.maxX=u),g<p.minY&&(p.minY=g),g>p.maxY&&(p.maxY=g);const m=1/p.n;a+=(s[4*l]-a)*m,r+=(s[4*l+1]-r)*m,d+=(s[4*l+2]-d)*m;const f=[u>0?l-1:-1,u<e-1?l+1:-1,g>0?l-e:-1,g<i-1?l+e:-1];for(const e of f)e<0||!n[e]||o[e]>=0||Hn(s,e,a,r,d)>9||(o[e]=t,c[h++]=e)}l.push(p)}const d=.0025*a,p=l.map((t=>t.n>=d)),h=new Uint8Array(a);{const t=[];for(let s=0;s<e;s++)t.push(s,(i-1)*e+s);for(let s=0;s<i;s++)t.push(s*e,s*e+e-1);for(;t.length;){const a=t.pop();if(h[a])continue;if(Math.min(s[4*a],s[4*a+1],s[4*a+2])<250&&o[a]<0)continue;if(o[a]>=0&&p[o[a]])continue;h[a]=1;const n=a%e,r=a/e|0;n>0&&t.push(a-1),n<e-1&&t.push(a+1),r>0&&t.push(a-e),r<i-1&&t.push(a+e)}}const u=Math.round(.06*e),g=()=>{const t=new Uint8Array(a);let i=[];for(let e=0;e<a;e++)o[e]>=0&&p[o[e]]?(t[e]=1,i.push(e)):o[e]=-1;for(let s=1;s<=u&&i.length;s++){const s=[];for(const n of i){const i=n%e,r=o[n];i>0&&m(n-1,r,s,t),i<e-1&&m(n+1,r,s,t),n>=e&&m(n-e,r,s,t),n+e<a&&m(n+e,r,s,t)}i=s}},m=(t,e,i,s)=>{s[t]||r[t]||h[t]||(s[t]=1,o[t]=e,i.push(t))};g();const f=l.length,b=new Int32Array(f),_=new Int32Array(f),y=new Map;for(let k=0;k<a;k++){const t=o[k];if(t<0)continue;b[t]++;const i=k%e,s=i<e-1?o[k+1]:-1,n=k+e<a?o[k+e]:-1,r=i>0?o[k-1]:-1,l=k>=e?o[k-e]:-1;s===t&&n===t&&r===t&&l===t||_[t]++;for(const e of[s,n])e>=0&&e!==t&&(y.set(t*f+e,(y.get(t*f+e)??0)+1),y.set(e*f+t,(y.get(e*f+t)??0)+1))}const v=Array.from({length:f},((t,e)=>e)),x=t=>v[t]===t?t:v[t]=x(v[t]),w=Array.from({length:f},((t,e)=>e)).filter((t=>p[t])).sort(((t,e)=>b[t]-b[e]));for(const k of w){let t=-1,e=0,i=0;for(const s of w){if(s===k)continue;const a=y.get(k*f+s)??0;i+=a,b[s]>b[k]&&a>e&&(e=a,t=s)}t>=0&&e/Math.max(1,_[k])>.25?v[k]=t:(b[k]<.005*a||!i&&b[k]<.02*a)&&(p[k]=!1)}for(let k=0;k<a;k++)o[k]>=0&&(o[k]=x(o[k]));for(const k of w)if(x(k)!==k){const t=x(k);b[t]+=b[k],b[k]=0,p[k]=!1;for(const e of["minX","minY"])l[t][e]=Math.min(l[t][e],l[k][e]);for(const e of["maxX","maxY"])l[t][e]=Math.max(l[t][e],l[k][e])}g(),b.fill(0);for(let k=0;k<a;k++)o[k]>=0&&b[o[k]]++;const $=[];return l.map(((t,e)=>({reg:t,id:e}))).filter((({id:t})=>p[t])).sort(((t,e)=>b[e.id]-b[t.id])).forEach((({reg:t,id:s})=>{if(t.minX<=1||t.minY<=1||t.maxX>=e-2||t.maxY>=i-2)return;const n=function(t,e,i,s){const a=i/Mn,n=Mn,r=Math.max(1,Math.round(s/a)),o=new Uint8Array(n*r);for(let g=0;g<r;g++)for(let r=0;r<n;r++){let l=0,c=0;const d=Math.floor(r*a),p=Math.min(i,Math.floor((r+1)*a)),h=Math.floor(g*a),u=Math.min(s,Math.floor((g+1)*a));for(let s=h;s<u;s++)for(let a=d;a<p;a++)c++,t[s*i+a]===e&&l++;o[g*n+r]=c&&l/c>.25?1:0}const l=Ln(o,n,r,1,1),c=function(t,e,i){const s=new Uint8Array(t.length),a=[];for(let n=0;n<e;n++)a.push(n,(i-1)*e+n);for(let n=0;n<i;n++)a.push(n*e,n*e+e-1);for(;a.length;){const n=a.pop();if(s[n]||t[n])continue;s[n]=1;const r=n%e,o=n/e|0;r>0&&a.push(n-1),r<e-1&&a.push(n+1),o>0&&a.push(n-e),o<i-1&&a.push(n+e)}return s.map((t=>t?0:1))}(Ln(l,n,r,1,0).map(((t,e)=>t|o[e])),n,r),d=function(t,e,i){const s=(s,a)=>s>=0&&a>=0&&s<e&&a<i?t[a*e+s]:0,a=new Map,n=(t,e)=>{const i=`${t[0]},${t[1]}`;(a.get(i)??a.set(i,[]).get(i)).push(e)};for(let o=0;o<i;o++)for(let t=0;t<e;t++)s(t,o)&&(s(t,o-1)||n([t,o],[t+1,o]),s(t+1,o)||n([t+1,o],[t+1,o+1]),s(t,o+1)||n([t+1,o+1],[t,o+1]),s(t-1,o)||n([t,o+1],[t,o]));let r=null;for(;a.size;){const[t,e]=a.entries().next().value,i=t.split(",").map(Number),s=[i];let n=e.pop();e.length||a.delete(t);let o=0;for(;(n[0]!==i[0]||n[1]!==i[1])&&o++<1e5;){s.push(n);const t=`${n[0]},${n[1]}`,e=a.get(t);if(!e)break;const i=e.pop();e.length||a.delete(t),n=i}(!r||s.length>r.length)&&(r=s)}return r}(c,n,r);if(!d||d.length<4)return null;const p=function(t){const e=t.map((t=>[...t]));for(let i=0;i<2;i++)for(let t=0;t<e.length;t++){const i=e[t],s=e[(t+1)%e.length],a=s[0]-i[0],n=s[1]-i[1];Math.abs(n)<=.2*Math.abs(a)?s[1]=i[1]:Math.abs(a)<=.2*Math.abs(n)&&(s[0]=i[0])}return e.filter(((t,i)=>{const s=e[(i-1+e.length)%e.length],a=e[(i+1)%e.length];return(t[0]!==s[0]||t[1]!==s[1])&&!(s[0]===t[0]&&t[0]===a[0]||s[1]===t[1]&&t[1]===a[1])}))}(function(t,e){let i=0,s=0,a=-1;for(let o=0;o<t.length;o++){const e=Math.hypot(t[o][0]-t[0][0],t[o][1]-t[0][1]);e>a&&(a=e,s=o)}const n=Sn(t.slice(i,s+1),e),r=Sn([...t.slice(s),t[0]],e);return[...n.slice(0,-1),...r.slice(0,-1)]}(d,1.2));if(p.length<3)return null;const h=100/n,u=100/r;return{points:p.map((([t,e])=>[Vn(t*h),Vn(e*u)])),center:zn(c,n,r,h,u)}}(o,s,e,i);n&&($.some((t=>pe(n.center,t.points)))||$.push({...n,size:b[s]/a}))})),$}(n.getImageData(0,0,i,s))}function Hn(t,e,i,s,a){const n=t[4*e],r=t[4*e+1],o=t[4*e+2],l=(n+r+o)/3,c=(i+s+a)/3,d=n-l-(i-c),p=r-l-(s-c),h=o-l-(a-c);return Math.hypot(2*d,2*p,2*h,.5*(l-c))}function Ln(t,e,i,s,a){const n=new Uint8Array(t.length),r=new Uint8Array(t.length);for(let o=0;o<i;o++)for(let i=0;i<e;i++){let r=1-a;for(let n=-s;n<=s&&r!==a;n++){const s=i+n;(s<0||s>=e?1-a:t[o*e+s])===a&&(r=a)}n[o*e+i]=r}for(let o=0;o<i;o++)for(let t=0;t<e;t++){let l=1-a;for(let r=-s;r<=s&&l!==a;r++){const s=o+r;(s<0||s>=i?1-a:n[s*e+t])===a&&(l=a)}r[o*e+t]=l}return r}const Vn=t=>Math.round(10*t)/10;function Sn(t,e){if(t.length<3)return t;const[i,s]=t[0],[a,n]=t[t.length-1],r=Math.hypot(a-i,n-s)||1;let o=0,l=0;for(let c=1;c<t.length-1;c++){const e=Math.abs((n-s)*t[c][0]-(a-i)*t[c][1]+a*s-n*i)/r;e>l&&(l=e,o=c)}return l<=e?[t[0],t[t.length-1]]:[...Sn(t.slice(0,o+1),e).slice(0,-1),...Sn(t.slice(o),e)]}function zn(t,e,i,s,a){const n=new Int32Array(t.length);let r=0,o=0;for(let l=0;l<i;l++)for(let i=0;i<e;i++){const s=l*e+i;t[s]&&(n[s]=1+Math.min(i?n[s-1]:0,l?n[s-e]:0,i&&l?n[s-e-1]:0,l&&i<e-1?n[s-e+1]:0))}for(let l=i-1;l>=0;l--)for(let s=e-1;s>=0;s--){const a=l*e+s;t[a]&&(n[a]=Math.min(n[a],1+Math.min(s<e-1?n[a+1]:0,l<i-1?n[a+e]:0,s<e-1&&l<i-1?n[a+e+1]:0,l<i-1&&s?n[a+e-1]:0)),n[a]>r&&(r=n[a],o=a))}return[Vn((o%e+.5)*s),Vn((.5+(o/e|0))*a)]}var Dn=Object.defineProperty,On=Object.getOwnPropertyDescriptor,jn=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?On(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&Dn(e,i,n),n};let Tn=class extends ct{constructor(){super(...arguments),this.floorIdx=0,this.area={w:0,h:0},this.uploading=!1,this.roomMode=!1,this.prevStates=new Map,this.zoom={s:1,x:0,y:0},this.settling=!1,this.pointers=new Map,this.moved=0,this.heat="off",this.tilt=!1,this.detecting=!1,this.stack=!1,this.cleaned=new Set,this.askTotal=0}connectedCallback(){super.connectedCallback();try{const t=localStorage.getItem(this.heatKey);this.heat="1"===t?"temp":"temp"===t||"humidity"===t||"co2"===t?t:"off",this.tilt="1"===localStorage.getItem(`${this.heatKey}-3d`)}catch{}this.ro=new ResizeObserver((()=>this.measure())),this.updateComplete.then((()=>{const t=this.renderRoot.querySelector(".area");t&&this.ro.observe(t)}))}disconnectedCallback(){super.disconnectedCallback(),this.ro?.disconnect(),window.clearInterval(this.replayTimer)}trackRobot(){const t=this.floor;if(!t||!this.ctx?.allows("robot_on_plan"))return;let e=!1;if(!this.cleaned.size)try{for(const t of JSON.parse(localStorage.getItem(this.cleanedKey)??"[]"))this.cleaned.add(t)}catch{}for(const i of t.markers){if("vacuum"!==Xt(i.entity))continue;const s=this.robotRoom(t,i.entity);s&&!this.cleaned.has(s.id)&&(this.cleaned.add(s.id),e=!0)}if(e)try{localStorage.setItem(this.cleanedKey,JSON.stringify([...this.cleaned]))}catch{}}renderCleaned(t){return this.cleaned.size?(t.rooms??[]).filter((t=>this.cleaned.has(t.id))).map((t=>{const[e,i]=he(t.points);return Z`<div class="clean" style="clip-path:${ge(t.points)}"></div><span class="clean-tag" style="left:${e}%;top:${i}%">✨</span>`})):q}st(t){const e=this.ctx.hass.states[t],i=this.replay,s=i?.data[t];if(!i||!e||!s?.length)return e;let a=s[0];for(const r of s){if(1e3*r.lu>i.at)break;a=r}const n=a.s===e.state?e.attributes:{...e.attributes,brightness:void 0,rgb_color:void 0,current_position:void 0};return{...e,state:a.s,attributes:n,last_changed:new Date(1e3*a.lu).toISOString()}}async startReplay(){const t=this.floor;if(!t)return;const e=Date.now(),i=e-864e5;let s={};try{s=await this.ctx.hass.callWS({type:"history/history_during_period",start_time:new Date(i).toISOString(),end_time:new Date(e).toISOString(),entity_ids:[...new Set(t.markers.map((t=>t.entity)))],minimal_response:!0,no_attributes:!0,significant_changes_only:!1})}catch{return this.ctx.toast(this.ctx.t("error"))}this.zoom={s:1,x:0,y:0},this.replay={start:i,at:i,playing:!0,data:s},this.playReplay()}playReplay(){window.clearInterval(this.replayTimer),this.replayTimer=window.setInterval((()=>{const t=this.replay;if(!t?.playing)return window.clearInterval(this.replayTimer);const e=Math.min(Date.now(),t.at+36e4);this.replay={...t,at:e,playing:e<Date.now()}}),100)}stopReplay(){window.clearInterval(this.replayTimer),this.replay=void 0}replayCaption(){const t=this.replay,{ctx:e}=this;let i;for(const[a,n]of Object.entries(t.data)){const e=Xt(a);if(["light","lock","binary_sensor","cover","climate","switch","media_player","vacuum"].includes(e))for(let s=1;s<n.length;s++){const e=1e3*n[s].lu;if(e>t.at)break;t.at-e<15e5&&n[s].s!==n[s-1].s&&(!i||e>i.lu)&&(i={id:a,lu:e,s:n[s].s})}}if(!i)return"";const s=this.st(i.id);return`${new Date(i.lu).toLocaleTimeString(Dt[e.lang],{hour:"2-digit",minute:"2-digit"})} · ${Kt(e.hass,e.config,i.id)}: ${s?oe(e.t,{...s,state:i.s},e.lang):i.s}`}renderReplay(){const t=this.replay,{t:e,lang:i}=this.ctx,s=Date.now(),a=new Date(t.at);return Z`<div class="tools glass replay" @pointerdown=${t=>t.stopPropagation()}>
      <button
        class="icon-btn primary pressable"
        aria-label=${e(t.playing?"pause":"play")}
        @click=${()=>{const e=t.at>=s-6e4;this.replay={...t,playing:!t.playing,at:e&&!t.playing?t.start:t.at},this.replay.playing&&this.playReplay()}}
      >
        <sn-icon icon=${t.playing?"pause":"play"} style="--icon-size:22px"></sn-icon>
      </button>
      <div class="rp">
        <div class="rp-top">
          <b class="ltr">${a.toLocaleTimeString(Dt[i],{hour:"2-digit",minute:"2-digit"})}</b>
          <span class="muted">${a.toDateString()===(new Date).toDateString()?e("today"):e("yesterday")}</span>
          <span class="cap">${this.replayCaption()}</span>
        </div>
        <input
          type="range"
          min=${t.start}
          max=${s}
          step="60000"
          .value=${String(t.at)}
          style="direction:ltr"
          aria-label=${e("replay")}
          @input=${e=>this.replay={...t,at:Number(e.target.value),playing:!1}}
        />
      </div>
      <button class="icon-btn pressable" aria-label=${e("close")} @click=${()=>this.stopReplay()}>
        <sn-icon icon="close" style="--icon-size:20px"></sn-icon>
      </button>
    </div>`}measure(){const t=this.renderRoot.querySelector(".area");if(!t)return;const e=getComputedStyle(t),i=parseFloat(e.paddingLeft)+parseFloat(e.paddingRight),s=parseFloat(e.paddingTop)+parseFloat(e.paddingBottom),a=t.clientWidth-i,n=t.clientHeight-s;a===this.area.w&&n===this.area.h||(this.area={w:a,h:n})}get floors(){return this.widget.config.floors??[]}get floor(){return this.floors[Math.min(this.floorIdx,this.floors.length-1)]}edit(t){const e=Math.min(this.floorIdx,this.floors.length-1);this.ctx.update((i=>{const s=Re(i,this.widget.id);s&&(s.config.floors??=[],t(s.config.floors,s.config.floors[e],i))}))}updated(){for(const t of this.floor?.markers??[]){const e=this.ctx.hass.states[t.entity];yn(this.renderRoot.querySelector(`[data-m="${t.id}"] sn-icon`),e,this.prevStates.get(t.id)),e&&this.prevStates.set(t.id,e.state)}}willUpdate(t){this.trackRobot(),t.has("ctx")&&this.ctx.editing&&1!==this.zoom.s&&(this.zoom={s:1,x:0,y:0}),t.has("floorIdx")&&(this.zoom={s:1,x:0,y:0}),t.has("ctx")&&!this.ctx.editing&&(this.selected=void 0,this.roomMode=!1,this.drawing=void 0,this.selRoom=void 0),this.toggleAttribute("editing",this.ctx.editing),this.toggleAttribute("narrow",this.ctx.narrow),this.toggleAttribute("dark",this.ctx.dark)}markerEl(t){return this.renderRoot.querySelector(`[data-m="${t.id}"]`)??void 0}onDown(t,e){if(0===t.button){if(t.stopPropagation(),this.ctx.editing)return t.currentTarget.setPointerCapture(t.pointerId),this.selected=e.id,void(this.drag={id:e.id,pointerId:t.pointerId,startX:t.clientX,startY:t.clientY,origX:e.x,origY:e.y,x:e.x,y:e.y,moved:!1});window.clearTimeout(this.press?.timer),this.press={id:e.id,x:t.clientX,y:t.clientY,timer:window.setTimeout((()=>{this.press=void 0,navigator.vibrate?.(8),this.ctx.openEntity(e.entity,this.markerEl(e))}),450)}}}onMove(t){if(this.drag&&t.pointerId===this.drag.pointerId){const e=this.stageSize(),i=(t.clientX-this.drag.startX)/e.w*100,s=(t.clientY-this.drag.startY)/e.h*100,a=this.drag.moved||Math.hypot(t.clientX-this.drag.startX,t.clientY-this.drag.startY)>3;this.drag={...this.drag,moved:a,x:Math.min(100,Math.max(0,this.drag.origX+i)),y:Math.min(100,Math.max(0,this.drag.origY+s))}}else this.press&&Math.hypot(t.clientX-this.press.x,t.clientY-this.press.y)>10&&(window.clearTimeout(this.press.timer),this.press=void 0)}onUp(t,e){if(this.drag&&t.pointerId===this.drag.pointerId){const{x:t,y:i,moved:s}=this.drag;return this.drag=void 0,void(s&&this.edit(((s,a)=>{const n=a?.markers.find((t=>t.id===e.id));n&&Object.assign(n,{x:Math.round(10*t)/10,y:Math.round(10*i)/10})})))}this.press?.id===e.id&&(window.clearTimeout(this.press.timer),this.press=void 0,this.tap(e))}onCancel(){window.clearTimeout(this.press?.timer),this.press=void 0,this.drag=void 0}tap(t){const e=this.ctx.hass.states[t.entity];if(!e||"unavailable"===e.state||"sheet"===ee(t.entity))return this.ctx.openEntity(t.entity,this.markerEl(t));navigator.vibrate?.(5),ie(this.ctx.hass,e).catch((()=>this.ctx.toast(this.ctx.t("error"))))}stageSize(){const t=this.natural?this.natural.w/this.natural.h:1.6;if(this.ctx.narrow)return{w:this.area.w,h:this.area.w/t};let e=this.area.w,i=e/t;return i>this.area.h&&(i=this.area.h,e=i*t),{w:Math.max(e,0),h:Math.max(i,0)}}addFloor(){const t=this.floors.length+1;this.edit((e=>e.push(Ve(`${this.ctx.t("floor")} ${t}`)))),this.floorIdx=this.floors.length,this.natural=void 0}floorSheet(){const{t:t}=this.ctx,e=this.floor;e&&this.ctx.showSheet({title:t("floor"),render:i=>Z`
        <div style="display:grid;gap:16px">
          <label class="field"
            >${t("floor_name")}
            <input
              type="text"
              .value=${e.name}
              @change=${t=>this.edit(((i,s)=>s&&(s.name=t.target.value.trim()||e.name)))}
            />
          </label>
          ${this.floors.length>1?Z`<button
                class="btn danger pressable"
                @click=${()=>{if(!confirm(t("delete_confirm")))return;const e=this.floorIdx;this.edit((t=>t.splice(e,1))),this.floorIdx=Math.max(0,e-1),i.closeSheet()}}
              >
                <sn-icon icon="delete"></sn-icon>${t("delete_floor")}
              </button>`:q}
        </div>
      `})}pickFile(){this.renderRoot.querySelector("input[type=file]")?.click()}async onFile(t){const e=t.target,i=e.files?.[0];if(e.value="",i){this.uploading=!0;try{const t=await Ee(this.ctx.hass,i);this.natural=void 0,this.edit(((e,i)=>i&&(i.image=t)))}catch{this.ctx.toast(this.ctx.t("upload_failed"))}finally{this.uploading=!1}}}addDevice(){this.ctx.showSheet({title:this.ctx.t("add_device"),render:t=>Z`<sn-entity-picker
        .ctx=${t}
        .onPick=${e=>{const i=Ae(),s=["sensor","climate"].includes(Xt(e))?"value":"icon";this.edit(((t,a)=>a?.markers.push({id:i,entity:e,x:50,y:50,display:s}))),this.selected=i,t.closeSheet()}}
      ></sn-entity-picker>`})}renameDevice(t){const{t:e}=this.ctx;this.ctx.showSheet({title:e("display_name"),render:i=>Z`<label class="field"
        >${Kt(i.hass,i.config,t.entity)}
        <input
          type="text"
          .value=${i.config.names[t.entity]??""}
          placeholder=${i.hass.states[t.entity]?.attributes.friendly_name??t.entity}
          @change=${e=>i.update((i=>{const s=e.target.value.trim();s?i.names[t.entity]=s:delete i.names[t.entity]}))}
        />
        <span class="hint">${e("display_name_hint")}</span>
      </label>`})}roomSheet(t){if(this.moved>8)return;const e=this.floor;if(!e)return;const i=e.markers.filter((e=>pe([e.x,e.y],t.points))).map((t=>t.entity));if(!i.length)return;const s=this.flyTo(t);this.ctx.showSheet({title:t.name,onClose:()=>{s&&(this.settling=!0,this.zoom={s:1,x:0,y:0})},render:t=>{const e=i.filter((t=>"light"===Xt(t))),s=e.some((e=>"on"===t.hass.states[e]?.state));return Z`<div style="display:grid;gap:10px">
          ${e.length?Z`<button
                class="btn ${s?"":"primary"} pressable"
                @click=${()=>t.hass.callService("light",s?"turn_off":"turn_on",{entity_id:e}).catch((()=>t.toast(t.t("error"))))}
              >
                <sn-icon icon=${s?"lightbulb-outline":"lightbulb"} style="--icon-size:20px"></sn-icon>${t.t(s?"room_lights_off":"room_lights_on")}
              </button>`:q}
          ${t.allows("light_fx")&&e.some((e=>(t.hass.states[e]?.attributes.supported_color_modes??[]).some((t=>["hs","rgb","rgbw","rgbww","xy"].includes(t)))))?Cn(t,e):q}
          <sn-ai-scene .ctx=${t} .lights=${e}></sn-ai-scene>
          ${i.map((e=>{const i=t.hass.states[e];return Z`<button
              class="glass pressable"
              style="display:flex;align-items:center;gap:12px;padding:10px 14px;border-radius:var(--r-md);text-align:start"
              @click=${i=>t.openEntity(e,i.currentTarget)}
            >
              <span style="display:grid;place-items:center;width:40px;height:40px;border-radius:999px;background:${Gt(i)?"var(--tone)":"var(--surface-2)"};color:${Gt(i)?"var(--on-tone)":"var(--text-2)"};${Qt(i)}">
                <sn-icon .icon=${te(i,e)} style="--icon-size:20px"></sn-icon>
              </span>
              <span style="flex:1;font-weight:500">${Kt(t.hass,t.config,e)}</span>
              <span class="muted" style="font-size:14px;unicode-bidi:plaintext">${ls(oe(t.t,i,t.lang))}</span>
            </button>`}))}
        </div>`}})}get heatKey(){return`smartnest-heat-${this.widget.id}`}roomValues(t,e){const i=new Map;for(const s of t.rooms??[]){const a=t.markers.filter((t=>pe([t.x,t.y],s.points))).map((t=>{const i=this.ctx.hass.states[t.entity];if(!i)return NaN;const s=i.attributes.device_class;return"temp"===e?"climate"===Xt(t.entity)?Number(i.attributes.current_temperature):"temperature"===s?Number(i.state):NaN:"humidity"===e?"climate"===Xt(t.entity)?Number(i.attributes.current_humidity):"humidity"===s?Number(i.state):NaN:"carbon_dioxide"===s?Number(i.state):NaN})).filter((t=>!Number.isNaN(t)));a.length&&i.set(s.id,a.reduce(((t,e)=>t+e),0)/a.length)}return i}mapModes(t){if(!this.ctx.allows("heat_map"))return[];const e=["temp"];return this.ctx.allows("air_maps")&&e.push("humidity","co2"),e.filter((e=>this.roomValues(t,e).size>0))}mapColor(t,e){const i=Tn.SCALES[t];if(e<=i[0][0])return`rgb(${i[0][1].join(",")})`;for(let s=1;s<i.length;s++){const[t,a]=i[s],[n,r]=i[s-1];if(e<=t){const i=(e-n)/(t-n);return`rgb(${r.map(((t,e)=>Math.round(t+(a[e]-t)*i))).join(",")})`}}return`rgb(${i[i.length-1][1].join(",")})`}renderHeat(t,e){const i=this.roomValues(t,e),s="temp"===e?"°":"humidity"===e?"%":" ppm";return(t.rooms??[]).map((t=>{const a=i.get(t.id);if(void 0===a)return q;const[n,r]=he(t.points);return Z`<div class="heat" style="clip-path:${ge(t.points)};background-color:${this.mapColor(e,a)};opacity:${this.ctx.dark?.42:.34}"></div>
        <span class="heat-label" style="left:${n}%;top:${r}%">${ae(a,this.ctx.lang,"temp"===e?1:0)}${s}</span>`}))}renderPeople(t){if(!this.ctx.allows("people_on_plan")||!t.rooms?.length)return q;const{hass:e}=this.ctx,i=t=>t.trim().toLowerCase(),s=new Map;return Object.values(e.states).filter((t=>t.entity_id.startsWith("person.")&&"home"===t.state)).map((a=>{const n=a.entity_id.split(".")[1],r=Object.values(e.states).filter((t=>t.entity_id.startsWith("sensor.")&&t.entity_id.includes(n)&&/_(area|room|location)$/.test(t.entity_id))).map((s=>t.rooms.find((t=>i(t.name)===i(s.state)||i(e.areas?.[s.state]?.name??"")===i(t.name))))).find(Boolean);if(!r)return q;const o=s.get(r.id)??0;s.set(r.id,o+1);const[l,c]=he(r.points),d=a.attributes.entity_picture;return Z`<span class="person" style="left:calc(${l}% + ${26*o-13}px);top:calc(${c}% + 22px);${d?`background-image:url('${e.hassUrl(d)}')`:""}" title=${a.attributes.friendly_name??""}
          >${d?"":(a.attributes.friendly_name??"?").slice(0,1)}</span
        >`}))}flyTo(t){if(!this.ctx.allows("fly_to_room")||this.zoom.s>1||this.tilt||matchMedia("(prefers-reduced-motion: reduce)").matches)return!1;const{w:e,h:i}=this.stageSize(),s=t.points.map((t=>t[0]/100*e)),a=t.points.map((t=>t[1]/100*i)),[n,r,o,l]=[Math.min(...s),Math.max(...s),Math.min(...a),Math.max(...a)],c=Math.min(3,Math.max(1.2,Math.min(e/(1.4*(r-n)),i/(1.4*(l-o)))));return this.settling=!0,this.zoom=this.clampZoom({s:c,x:e/2-(n+r)/2*c,y:i/2-(o+l)/2*c}),!0}canZoom(){return!this.ctx.editing&&!!this.floor?.image}local(t){const e=this.renderRoot.querySelector(".stage"),i=this.renderRoot.querySelector(".area").getBoundingClientRect();return{x:t.clientX-i.left-(e?.offsetLeft??0),y:t.clientY-i.top-(e?.offsetTop??0)}}clampZoom(t){const{w:e,h:i}=this.stageSize(),s=Math.min(4,Math.max(1,t.s));return{s:s,x:Math.min(0,Math.max(e-e*s,t.x)),y:Math.min(0,Math.max(i-i*s,t.y))}}zoomAround(t,e,i,s){const a=this.zoom,n=this.clampZoom({s:i,x:t-(t-a.x)/a.s*i,y:e-(e-a.y)/a.s*i});this.settling=s,this.zoom=n}onAreaDown(t){if(this.moved=0,this.canZoom()){if(this.pointers.set(t.pointerId,this.local(t)),2===this.pointers.size){this.dispatchEvent(new Event("sn-cancel-swipe",{bubbles:!0,composed:!0}));const[t,e]=[...this.pointers.values()];this.pinch={d:Math.hypot(t.x-e.x,t.y-e.y),mx:(t.x+e.x)/2,my:(t.y+e.y)/2,...this.zoom},this.pan=void 0}else if(1===this.pointers.size){const e=this.local(t),i=performance.now();if(this.lastTap&&i-this.lastTap.t<300&&Math.hypot(e.x-this.lastTap.x,e.y-this.lastTap.y)<30)return this.lastTap=void 0,this.zoomAround(e.x,e.y,this.zoom.s>1?1:2.5,!0),void t.stopPropagation();this.lastTap={t:i,...e},this.zoom.s>1&&(this.pan={x:e.x,y:e.y,zx:this.zoom.x,zy:this.zoom.y})}(this.zoom.s>1||this.pointers.size>1)&&(t.stopPropagation(),t.currentTarget.setPointerCapture(t.pointerId))}}onAreaMove(t){if(this.pointers.has(t.pointerId))if(this.moved+=Math.abs(t.movementX)+Math.abs(t.movementY),this.pointers.set(t.pointerId,this.local(t)),this.pinch&&this.pointers.size>=2){const[t,e]=[...this.pointers.values()],i=this.pinch,s=Math.min(4,Math.max(1,i.s*Math.hypot(t.x-e.x,t.y-e.y)/i.d)),a=(t.x+e.x)/2,n=(t.y+e.y)/2;this.settling=!1,this.zoom=this.clampZoom({s:s,x:a-(i.mx-i.x)/i.s*s,y:n-(i.my-i.y)/i.s*s})}else if(this.pan){const e=this.local(t);this.settling=!1,this.zoom=this.clampZoom({s:this.zoom.s,x:this.pan.zx+e.x-this.pan.x,y:this.pan.zy+e.y-this.pan.y})}}onAreaUp(t){this.pointers.delete(t.pointerId),this.pointers.size<2&&(this.pinch=void 0),this.pointers.size||(this.pan=void 0)}onWheel(t){if(!t.ctrlKey||!this.canZoom())return;t.preventDefault();const e=this.renderRoot.querySelector(".area").getBoundingClientRect(),i=this.renderRoot.querySelector(".stage");this.zoomAround(t.clientX-e.left-(i?.offsetLeft??0),t.clientY-e.top-(i?.offsetTop??0),this.zoom.s*Math.exp(-t.deltaY/200),!1)}pct(t){const e=this.renderRoot.querySelector(".stage").getBoundingClientRect();return[Math.min(100,Math.max(0,(t.clientX-e.left)/e.width*100)),Math.min(100,Math.max(0,(t.clientY-e.top)/e.height*100))]}corners(t){return(this.floor?.rooms??[]).filter((e=>e.id!==t)).flatMap((t=>t.points))}onStageDown(t){if(!this.roomMode||0!==t.button)return;if(t.stopPropagation(),!this.drawing)return void(this.selRoom=void 0);const e=this.drawing,i=this.pct(t);if(e.length>=3&&Math.hypot(i[0]-e[0][0],i[1]-e[0][1])<3)return this.finishRoom();this.drawing=[...e,ue(i,this.corners())]}finishRoom(){const t=this.drawing;if(!t||t.length<3)return;const e=Ae(),i=(this.floor?.rooms?.length??0)+1,s={id:e,name:this.ctx.t("room_default",{n:i}),points:t};this.edit(((t,e)=>{e&&(e.rooms=[...e.rooms??[],s])})),this.drawing=void 0,this.selRoom=e}onVtxDown(t,e,i){t.stopPropagation(),t.currentTarget.setPointerCapture(t.pointerId),this.selRoom=e.id,this.vtx={room:e.id,idx:i,pointerId:t.pointerId,p:e.points[i]}}onVtxMove(t){this.vtx&&t.pointerId===this.vtx.pointerId&&(this.vtx={...this.vtx,p:ue(this.pct(t),this.corners(this.vtx.room))})}onVtxUp(t){const e=this.vtx;e&&t.pointerId===e.pointerId&&(this.vtx=void 0,this.edit(((t,i)=>{const s=i?.rooms?.find((t=>t.id===e.room));s&&(s.points[e.idx]=e.p)})))}async autoAdd(){const{ctx:t}=this,{t:e,hass:i}=t,s=this.floor;if(!s?.image||this.detecting)return;if(!Object.keys(i.areas??{}).length)return t.toast(e("auto_need_areas"));let a;this.detecting=!0;try{a=await this.findRooms(s)}catch{return t.toast(e("detect_failed"))}finally{this.detecting=!1}if(!a.length&&!s.rooms?.length)return t.toast(e("detect_none"));const n=a.filter(((t,a)=>t.name===e("room_default",{n:(s.rooms?.length??0)+a+1})&&!((t,e)=>Object.values(t.areas??{}).some((t=>we(t.name)===we(e))))(i,t.name)));if(n.length)return this.roomMode=!0,this.selected=void 0,this.asking=n.map((t=>t.id)),this.askTotal=n.length,void(this.selRoom=n[0].id);this.placeAll()}nextQuestion(){const t=this.asking?.slice(1)??[];this.asking=t.length?t:void 0,this.selRoom=t[0],t.length||this.placeAll()}async placeAll(){await new Promise((t=>setTimeout(t))),await this.updateComplete;const t=this.floor;if(!t)return;const e=ke(this.ctx.hass,t);e.length&&this.edit(((t,i)=>i&&(i.markers=[...i.markers,...e]))),this.roomMode=!1,this.selRoom=void 0;const{t:i}=this.ctx;this.ctx.toast(e.length?i("detect_done_placed",{n:t.rooms?.length??0,m:e.length}):i("auto_nothing"))}async findRooms(t){const{hass:e,t:i}=this.ctx,s=t.rooms??[],a=(await An(t.image)).filter((t=>!s.some((e=>pe(t.center,e.points)))));if(!a.length)return[];const n=a.map(((t,e)=>({id:Ae(),name:i("room_default",{n:s.length+e+1}),points:t.points}))),r=Object.keys(e.states).find((t=>t.startsWith("ai_task.")));if(r)try{const i=await e.callWS({type:"smartnest/plan/read_rooms",image:t.image,entity_id:r,areas:Object.values(e.areas??{}).map((t=>t.name))});for(const t of i.rooms){const e=[t.x,t.y];let i=a.findIndex((t=>pe(e,t.points)));if(i<0){const t=a.map((t=>Math.hypot(t.center[0]-e[0],t.center[1]-e[1]))),s=t.indexOf(Math.min(...t));t[s]<15&&(i=s)}i>=0&&(n[i].name=t.area||t.label)}}catch{}return this.edit(((t,e)=>e&&(e.rooms=[...e.rooms??[],...n]))),n}renameRoom(t){this.ctx.showSheet({title:this.ctx.t("room_name"),render:e=>Z`<label class="field"
        >${e.t("room_name")}
        <input
          type="text"
          .value=${t.name}
          @change=${e=>this.edit(((i,s)=>{const a=s?.rooms?.find((e=>e.id===t.id));a&&(a.name=e.target.value.trim()||t.name)}))}
        />
      </label>`})}livePoints(t){return this.vtx?.room===t.id?t.points.map(((t,e)=>e===this.vtx.idx?this.vtx.p:t)):t.points}renderGlow(t,e){const i=Math.max(120,.3*e);return(t.rooms??[]).map((e=>{const s=t.markers.filter((t=>"light"===Xt(t.entity)&&pe([t.x,t.y],e.points))).filter((t=>"on"===this.st(t.entity)?.state)),a=s.map((t=>{const e=this.st(t.entity).attributes,[s,a,n]=Array.isArray(e.rgb_color)?e.rgb_color:[255,196,120],r="number"==typeof e.brightness?e.brightness/255:1,o=(this.ctx.dark?.35:.22)+(this.ctx.dark?.45:.25)*r;return`radial-gradient(circle ${i}px at ${t.x}% ${t.y}%, rgba(${s},${a},${n},${o.toFixed(2)}) 0%, rgba(${s},${a},${n},${(.45*o).toFixed(2)}) 45%, rgba(${s},${a},${n},${(.18*o).toFixed(2)}) 100%)`}));return Z`<div
        class="glow ${s.length?"lit":""}"
        style="clip-path:${ge(this.livePoints(e))};opacity:${s.length?1:0};${a.length?`background:${a.join(",")}`:""}"
      ></div>`}))}renderRoomEditor(t){const e=t.rooms??[],i=this.drawing;return Z`<svg class="rooms-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        ${e.map((t=>F`<polygon
            class=${t.id===this.selRoom?"sel":""}
            points=${this.livePoints(t).map((t=>t.join(","))).join(" ")}
            @pointerdown=${e=>{this.drawing||(e.stopPropagation(),this.selRoom=t.id)}}
          ></polygon>`))}
        ${i?F`<polyline points=${i.map((t=>t.join(","))).join(" ")}></polyline>`:q}
      </svg>
      ${e.map((t=>{const[e,i]=he(this.livePoints(t));return Z`<span class="room-label" style="left:${e}%;top:${i}%">${t.name}</span>`}))}
      ${i?.map(((t,e)=>Z`<span class="vtx ${0===e&&i.length>=3?"first":""}" style="left:${t[0]}%;top:${t[1]}%;pointer-events:none"></span>`))}
      ${i?q:e.filter((t=>t.id===this.selRoom)).flatMap((t=>this.livePoints(t).map(((e,i)=>Z`<span
                  class="vtx"
                  style="left:${e[0]}%;top:${e[1]}%"
                  @pointerdown=${e=>this.onVtxDown(e,t,i)}
                  @pointermove=${t=>this.onVtxMove(t)}
                  @pointerup=${t=>this.onVtxUp(t)}
                  @pointercancel=${()=>this.vtx=void 0}
                ></span>`))))}`}renderRoomTools(){const{t:t}=this.ctx,e=t=>t.stopPropagation();if(this.drawing)return Z`<div class="tools glass" @pointerdown=${e}>
        <span class="hint">${t("draw_hint")}</span>
        <button class="icon-btn pressable" aria-label=${t("undo_point")} ?disabled=${!this.drawing.length} @click=${()=>this.drawing=this.drawing.slice(0,-1)}>
          <sn-icon icon="undo" style="--icon-size:20px"></sn-icon>
        </button>
        <button class="btn pressable" @click=${()=>this.drawing=void 0}>${t("cancel")}</button>
        <button class="btn primary pressable" ?disabled=${this.drawing.length<3} @click=${()=>this.finishRoom()}>${t("finish")}</button>
      </div>`;const i=this.floor?.rooms?.find((t=>t.id===this.selRoom)),s=Object.values(this.ctx.hass.areas??{}).map((t=>t.name)).sort(((t,e)=>t.localeCompare(e)));if(this.asking?.length&&i){const a=new Set((this.floor?.rooms??[]).map((t=>t.name)));return Z`<div class="tools glass" @pointerdown=${e}>
        <span class="label">${t("which_room")} ${this.askTotal-this.asking.length+1}/${this.askTotal}</span>
        <select
          aria-label=${t("which_room")}
          style="width:auto;min-height:40px"
          @change=${t=>{const e=t.target.value;e&&(this.edit(((t,s)=>{const a=s?.rooms?.find((t=>t.id===i.id));a&&(a.name=e)})),this.nextQuestion())}}
        >
          <option value="" selected>🏠 ${t("room_area")}</option>
          ${s.filter((t=>!a.has(t))).map((t=>Z`<option value=${t}>🏠 ${t}</option>`))}
        </select>
        <button class="btn pressable" @click=${()=>this.nextQuestion()}>${t("skip_room")}</button>
        <button class="btn pressable" @click=${()=>(this.asking=void 0,this.placeAll())}>${t("finish")}</button>
      </div>`}return i?Z`<div class="tools glass" @pointerdown=${e}>
        <span class="label">${i.name}</span>
        ${this.robotRooms?.length?Z`<select
              aria-label=${t("widget_vacuum")}
              title=${t("widget_vacuum")}
              style="width:auto;min-height:40px"
              @change=${t=>this.edit(((e,s)=>{const a=s?.rooms?.find((t=>t.id===i.id));a&&(t.target.value?a.robot_room=t.target.value:delete a.robot_room)}))}
            >
              <option value="" ?selected=${!i.robot_room}>🤖 ${this.robotRooms.find((t=>t.id===ks({...i,robot_room:void 0},this.robotRooms)))?.name??"–"}</option>
              ${this.robotRooms.map((t=>Z`<option value=${t.id} ?selected=${i.robot_room===t.id}>🤖 ${t.name}</option>`))}
            </select>`:q}
        ${s.length?Z`<select
              aria-label=${t("room_area")}
              title=${t("room_area")}
              style="width:auto;min-height:40px"
              @change=${t=>t.target.value&&this.edit(((e,s)=>{const a=s?.rooms?.find((t=>t.id===i.id));a&&(a.name=t.target.value)}))}
            >
              <option value="" ?selected=${!s.includes(i.name)}>🏠 ${t("room_area")}</option>
              ${s.map((t=>Z`<option value=${t} ?selected=${t===i.name}>🏠 ${t}</option>`))}
            </select>`:q}
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
      </div>`:Z`<div class="tools glass" @pointerdown=${e}>
      ${this.floor?.rooms?.length?q:Z`<span class="hint">${t("rooms_hint")}</span>`}
      <button class="btn primary pressable" @click=${()=>this.drawing=[]}>
        <sn-icon icon="rooms" style="--icon-size:20px"></sn-icon>${t("draw_room")}
      </button>
      <button class="btn pressable" ?disabled=${this.detecting} @click=${()=>this.autoAdd()}>
        <sn-icon icon="auto-fix" style="--icon-size:20px"></sn-icon>${t(this.detecting?"detecting":"detect_rooms")}
      </button>
      ${this.floor?.rooms?.length?Z`<button
            class="btn pressable"
            @click=${()=>{const e=this.floor,i=ke(this.ctx.hass,e);this.edit(((t,e)=>e&&(e.markers=[...e.markers,...i]))),this.ctx.toast(t("autofill_done",{n:i.length}))}}
          >
            <sn-icon icon="marker-plus" style="--icon-size:20px"></sn-icon>${t("autofill_rooms")}
          </button>`:q}
      <button class="btn pressable" @click=${()=>this.roomMode=!1}>${t("done")}</button>
    </div>`}renderMarker(t){const{ctx:e}=this,i=this.st(t.entity),s=Gt(i),a=this.drag?.id===t.id,n=!e.editing&&"vacuum"===Xt(t.entity)&&this.floor&&e.allows("robot_on_plan")?this.robotRoom(this.floor,t.entity):void 0,[r,o]=n?he(n.points):[t.x,t.y],l=a?this.drag.x:r,c=a?this.drag.y:o,d=["marker",s?"on":"",s&&"binary_sensor"===Xt(t.entity)&&["motion","occupancy","presence"].includes(i?.attributes.device_class)?"pulse":"",i&&"unavailable"!==i.state?"":"dim",s||e.editing||!e.dark||!e.config.settings.night_plan||this.selected?"":"sleepy",e.editing?"editable":"",a?"dragging":"",n?"roving":"",this.selected===t.id&&e.editing?"selected":""].join(" ");return Z`<div
      class=${d}
      data-m=${t.id}
      style="left:${l}%;top:${c}%;${Qt(i)}"
      role="button"
      tabindex="0"
      aria-label=${Kt(e.hass,e.config,t.entity)}
      @pointerdown=${e=>this.onDown(e,t)}
      @pointermove=${t=>this.onMove(t)}
      @pointerup=${e=>this.onUp(e,t)}
      @pointercancel=${()=>this.onCancel()}
      @contextmenu=${t=>t.preventDefault()}
      @keydown=${i=>"Enter"===i.key&&!e.editing&&this.tap(t)}
    >
      ${e.allows("plan_fx")&&!e.editing?this.fx(i):q}
      <span class="ic"><sn-icon class=${bn(i)} .icon=${te(i,t.entity)}></sn-icon></span>
      ${"value"===t.display?Z`<span class="val">${ls(oe(e.t,i,e.lang))}</span>`:q}
      ${e.editing&&this.selected===t.id&&!a?Z`<span class="tag">${Kt(e.hass,e.config,t.entity)}</span>`:q}
    </div>`}renderStack(){const t=this.floors.filter((t=>t.image)),e=t.length;return Z`<div class="stack" @pointerdown=${t=>t.stopPropagation()}>
      ${t.map(((t,i)=>Z`<button
          class="slab pressable"
          style="--i:${i};--n:${e};z-index:${e-i}"
          aria-label=${t.name}
          @click=${()=>{this.floorIdx=this.floors.indexOf(t),this.natural=void 0,this.stack=!1}}
        >
          <span class="plate">
            <img src=${t.image} alt="" />
            ${t.markers.filter((t=>"light"===Xt(t.entity)&&"on"===this.ctx.hass.states[t.entity]?.state)).map((t=>Z`<i class="lit" style="left:${t.x}%;top:${t.y}%"></i>`))}
          </span>
        </button>`))}
      ${t.map(((t,i)=>Z`<span class="slab-tag" style="--i:${i};--n:${e}">${t.name}</span>`))}
    </div>`}robotRoom(t,e){const{hass:i}=this.ctx;if("cleaning"!==i.states[e]?.state||!t.rooms?.length)return;const s=i.entities?.[e]?.device_id,a=Object.values(i.entities??{}).find((t=>t.device_id&&t.device_id===s&&t.entity_id.startsWith("sensor.")&&/current_room|_room$/.test(t.entity_id))),n=a?i.states[a.entity_id]?.state:void 0;if(!n)return;const r=t=>t.trim().toLowerCase(),o=i.areas?.[n]?.name;return t.rooms.find((t=>r(t.name)===r(n)||o&&r(t.name)===r(o)||t.robot_room===n))}get cleanedKey(){return`smartnest-cleaned-${this.widget.id}-${(new Date).toDateString()}`}fx(t){if(!t)return q;const e=Xt(t.entity_id),i=t.attributes.device_class;if("binary_sensor"===e&&["door","window","opening","garage_door"].includes(i)&&"on"===t.state)return Z`<span class="fx fx-door" aria-hidden="true"><svg viewBox="0 0 40 40"><path d="M4 36 L4 4 A32 32 0 0 1 36 36" /></svg></span>`;if("binary_sensor"===e&&"moisture"===i&&"on"===t.state)return Z`<span class="fx fx-ripple" aria-hidden="true"><i></i><i></i><i></i></span>`;if("cover"===e&&"number"==typeof t.attributes.current_position)return Z`<span class="fx fx-shade" aria-hidden="true" style="--shut:${(100-t.attributes.current_position)/100}"></span>`;if("climate"===e&&"off"!==t.state&&"unavailable"!==t.state){const e="heat"===t.state||"heating"===t.attributes.hvac_action;return Z`<span class="fx fx-air ${e?"hot":""}" aria-hidden="true"><i></i><i></i><i></i></span>`}return"media_player"===e&&"playing"===t.state?Z`<span class="fx fx-notes" aria-hidden="true"><i>♪</i><i>♫</i><i>♪</i></span>`:q}renderTools(){const{ctx:t}=this,{t:e}=t,i=this.floor;if(this.roomMode)return this.renderRoomTools();const s=i?.markers.find((t=>t.id===this.selected));return s?Z`<div class="tools glass" @pointerdown=${t=>t.stopPropagation()}>
        <span class="label">${Kt(t.hass,t.config,s.entity)}</span>
        <div class="seg">
          ${["icon","value"].map((t=>Z`<button
              aria-pressed=${s.display===t}
              @click=${()=>this.edit(((e,i)=>{const a=i?.markers.find((t=>t.id===s.id));a&&(a.display=t)}))}
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
      </div>`:Z`<div class="tools glass" @pointerdown=${t=>t.stopPropagation()}>
      <button class="btn pressable" ?disabled=${this.uploading} @click=${()=>this.pickFile()}>
        <sn-icon icon="image-plus" style="--icon-size:20px"></sn-icon>
        ${this.uploading?e("loading"):e(i?.image?"replace_plan":"upload_plan")}
      </button>
      <button class="btn pressable" ?disabled=${!i?.image} @click=${()=>{this.roomMode=!0,this.selected=void 0;const t=Object.keys(this.ctx.hass.states).find((t=>t.startsWith("vacuum.")));t&&!this.robotRooms&&ws(this.ctx.hass,t).then((t=>this.robotRooms=t.rooms))}}>
        <sn-icon icon="rooms" style="--icon-size:20px"></sn-icon>${e("rooms")}
      </button>
      <button class="btn pressable" ?disabled=${!i?.image||this.detecting} @click=${()=>this.autoAdd()}>
        <sn-icon icon="auto-fix" style="--icon-size:20px"></sn-icon>${e(this.detecting?"detecting":"auto_add")}
      </button>
      <button class="btn primary pressable" ?disabled=${!i?.image} @click=${()=>this.addDevice()}>
        <sn-icon icon="marker-plus" style="--icon-size:20px"></sn-icon>${e("add_device")}
      </button>
      <input type="file" accept="image/png,image/jpeg,image/webp" @change=${this.onFile} />
    </div>`}render(){const{ctx:t}=this,{t:e}=t,i=this.floor,s=this.floors,a=this.stageSize(),n=this.natural?this.natural.w/this.natural.h:1.6,r=i?this.mapModes(i):[],o=r.includes(this.heat)?this.heat:void 0,l=this.tilt&&t.allows("plan_3d")&&!t.editing&&1===this.zoom.s,c=()=>{try{localStorage.setItem(this.heatKey,this.heat),localStorage.setItem(`${this.heatKey}-3d`,this.tilt?"1":"0")}catch{}};return Z`<div class="wrap glass">
      ${s.length>1||t.editing?Z`<div class="floors" @pointerdown=${t=>t.stopPropagation()}>
            <div class="seg">
              ${s.map(((e,i)=>Z`<button
                  aria-pressed=${i===this.floorIdx}
                  @click=${()=>{if(i===this.floorIdx&&t.editing)return this.floorSheet();this.floorIdx=i,this.selected=void 0,this.natural=void 0}}
                >
                  <sn-icon icon="layers" style="--icon-size:16px"></sn-icon>${e.name}
                </button>`))}
              ${t.editing?Z`<button aria-label=${e("add_floor")} @click=${()=>this.addFloor()}>
                    <sn-icon icon="plus" style="--icon-size:18px"></sn-icon>
                  </button>`:q}
            </div>
          </div>`:q}
      ${i?.image&&!t.editing&&(r.length||t.allows("plan_3d")||t.allows("plan_replay"))?Z`<div class="corner-btns" @pointerdown=${t=>t.stopPropagation()}>
            ${r.length?Z`<button
                  class="pressable"
                  aria-pressed=${!!o}
                  aria-label=${e("heat_map")}
                  title=${e(o?"temp"===o?"map_temp":"humidity"===o?"map_humidity":"map_co2":"heat_map")}
                  @click=${()=>{const t=["off",...r];this.heat=t[(t.indexOf(o??"off")+1)%t.length],c()}}
                >
                  <sn-icon icon=${"humidity"===o?"humidity":"co2"===o?"co2":"thermometer"}></sn-icon>
                </button>`:q}
            ${t.allows("floor_stack")&&s.filter((t=>t.image)).length>1?Z`<button class="pressable" aria-pressed=${this.stack} aria-label=${e("all_floors")} title=${e("all_floors")} @click=${()=>this.stack=!this.stack}>
                  <sn-icon icon="floors"></sn-icon>
                </button>`:q}
            ${t.allows("plan_replay")&&i.markers.length?Z`<button class="pressable" aria-pressed=${!!this.replay} aria-label=${e("replay")} title=${e("replay")} @click=${()=>this.replay?this.stopReplay():this.startReplay()}>
                  <sn-icon icon="history"></sn-icon>
                </button>`:q}
            ${t.allows("plan_3d")?Z`<button
                  class="pressable"
                  aria-pressed=${this.tilt}
                  aria-label=${e("plan_3d")}
                  title=${e("plan_3d")}
                  @click=${()=>{this.tilt=!this.tilt,this.zoom={s:1,x:0,y:0},c()}}
                >
                  <sn-icon icon="cube"></sn-icon>
                </button>`:q}
          </div>`:q}
      <div
        class="area ${this.canZoom()?"zoomable":""} ${this.zoom.s>1?"zoomed":""}"
        style=${t.narrow?`aspect-ratio:${n}`:""}
        @pointerdown=${t=>this.onAreaDown(t)}
        @pointermove=${t=>this.onAreaMove(t)}
        @pointerup=${t=>this.onAreaUp(t)}
        @pointercancel=${t=>this.onAreaUp(t)}
        @wheel=${t=>this.onWheel(t)}
      >
        ${this.stack&&!t.editing?this.renderStack():i?.image?Z`<div
              class="stage ${this.roomMode?"room-mode":""} ${this.drawing?"drawing":""} ${this.settling?"settle":""} ${l?"tilt":""}"
              style="width:${a.w}px;height:${a.h}px;transform:${l?"perspective(1400px) rotateX(40deg) scale(0.86)":`translate(${this.zoom.x}px, ${this.zoom.y}px) scale(${this.zoom.s})`};--inv:${1/this.zoom.s}"
              @pointerdown=${t=>this.onStageDown(t)}
            >
              <img
                class=${this.widget.config.invert_dark?"plan-light":""}
                src=${i.image}
                alt=""
                @load=${t=>{const e=t.target;this.natural={w:e.naturalWidth,h:e.naturalHeight},this.measure()}}
              />
              ${o&&!t.editing?this.renderHeat(i,o):t.allows("room_glow")?this.renderGlow(i,a.w):q}
              ${!t.editing&&i.rooms?.length?Z`<svg class="hit" viewBox="0 0 100 100" preserveAspectRatio="none">
                    ${i.rooms.map((t=>F`<polygon points=${t.points.map((t=>t.join(","))).join(" ")} @click=${()=>this.roomSheet(t)}></polygon>`))}
                  </svg>`:q}
              ${!t.editing&&t.allows("robot_on_plan")?this.renderCleaned(i):q}
              ${i.markers.map((t=>this.renderMarker(t)))} ${t.editing?q:this.renderPeople(i)}
              ${t.editing&&this.roomMode?this.renderRoomEditor(i):q}
            </div>`:Z`<div class="empty">
              <sn-icon icon="image"></sn-icon>
              <strong>${e("no_plan")}</strong>
              ${t.isAdmin&&!t.editing?Z`<span>${e("no_plan_admin")}</span>`:q}
            </div>`}
      </div>
      ${t.editing&&i?this.renderTools():q}
      ${this.replay&&!t.editing?this.renderReplay():q}
    </div>`}};Tn.styles=[si,fn,o`
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
        transition: opacity 600ms cubic-bezier(0.22, 1, 0.36, 1), transform 200ms cubic-bezier(0.22, 1, 0.36, 1);
        transform: translate(-50%, -50%) scale(var(--inv, 1));
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
      .fx {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: -1;
      }
      .fx-door svg {
        position: absolute;
        width: 46px;
        height: 46px;
        inset-inline-start: 50%;
        bottom: 50%;
        overflow: visible;
      }
      .fx-door path {
        fill: color-mix(in srgb, var(--accent) 16%, transparent);
        stroke: var(--accent);
        stroke-width: 2;
        stroke-dasharray: 4 3;
        transform-origin: 4px 36px;
        animation: fx-swing 2.4s cubic-bezier(0.37, 0, 0.63, 1) infinite alternate;
      }
      .fx-ripple i {
        position: absolute;
        inset: 0;
        border-radius: 999px;
        border: 2px solid #3a86ff;
        animation: fx-ripple 2.1s cubic-bezier(0.22, 1, 0.36, 1) infinite;
      }
      .fx-ripple i:nth-child(2) {
        animation-delay: 0.7s;
      }
      .fx-ripple i:nth-child(3) {
        animation-delay: 1.4s;
      }
      .fx-shade {
        inset: 3px;
        border-radius: 999px;
        overflow: hidden;
        z-index: 2;
      }
      .fx-shade::after {
        content: "";
        position: absolute;
        inset: 0;
        background: repeating-linear-gradient(180deg, color-mix(in srgb, var(--text) 38%, transparent) 0 3px, transparent 3px 6px);
        transform: scaleY(var(--shut));
        transform-origin: top;
        transition: transform 1.2s cubic-bezier(0.22, 1, 0.36, 1);
      }
      .fx-air {
        top: 100%;
        height: 34px;
      }
      .fx-air i {
        position: absolute;
        top: 0;
        left: 50%;
        width: 18px;
        height: 10px;
        margin-left: -9px;
        border-bottom: 2px solid #5ec8f2;
        border-radius: 0 0 50% 50%;
        opacity: 0;
        animation: fx-blow 1.8s linear infinite;
      }
      .fx-air.hot i {
        border-color: #ff8a3d;
      }
      .fx-air i:nth-child(2) {
        animation-delay: 0.6s;
      }
      .fx-air i:nth-child(3) {
        animation-delay: 1.2s;
      }
      .fx-notes i {
        position: absolute;
        top: 0;
        left: 50%;
        font-style: normal;
        font-size: 14px;
        color: var(--accent);
        opacity: 0;
        animation: fx-note 2.4s ease-out infinite;
      }
      .fx-notes i:nth-child(2) {
        animation-delay: 0.8s;
        --dx: 14px;
      }
      .fx-notes i:nth-child(3) {
        animation-delay: 1.6s;
        --dx: -12px;
      }
      @keyframes fx-swing {
        from {
          transform: rotate(-6deg);
        }
        to {
          transform: rotate(4deg);
        }
      }
      @keyframes fx-ripple {
        from {
          transform: scale(1);
          opacity: 0.9;
        }
        to {
          transform: scale(2.6);
          opacity: 0;
        }
      }
      @keyframes fx-blow {
        0% {
          transform: translateY(0) scaleX(0.6);
          opacity: 0;
        }
        25% {
          opacity: 0.9;
        }
        100% {
          transform: translateY(26px) scaleX(1.5);
          opacity: 0;
        }
      }
      @keyframes fx-note {
        0% {
          transform: translate(0, 0);
          opacity: 0;
        }
        20% {
          opacity: 1;
        }
        100% {
          transform: translate(var(--dx, 6px), -34px);
          opacity: 0;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .fx-door path,
        .fx-ripple i:not(:first-child),
        .fx-air i:not(:first-child),
        .fx-notes i:not(:first-child) {
          animation: none;
        }
        .fx-ripple i:first-child,
        .fx-air i:first-child,
        .fx-notes i:first-child {
          animation: none;
          opacity: 0.8;
        }
      }
      .marker.on {
        --duo-fill: 0.95;
      }
      .marker:not(.on):not(.editable) {
        opacity: var(--idle-opacity, 1);
      }
      .marker:active {
        transform: translate(-50%, -50%) scale(calc(var(--inv, 1) * 0.92));
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
      .marker.sleepy {
        opacity: 0.3;
        transform: translate(-50%, -50%) scale(calc(var(--inv, 1) * 0.85));
      }
      .marker.dim {
        opacity: 0.5;
      }
      .marker.editable {
        cursor: grab;
      }
      .marker.dragging {
        cursor: grabbing;
        transform: translate(-50%, -50%) scale(calc(var(--inv, 1) * 1.15));
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
        transform: translate(-50%, -50%) scale(var(--inv, 1));
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
        min-width: 170px;
        flex-shrink: 0;
      }
      .stage {
        transform-origin: 0 0;
      }
      .stage.settle {
        transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .area.zoomable {
        touch-action: pan-y; /* fitted: vertical drags still scroll the page, pinches reach us */
        overflow: hidden;
      }
      .area.zoomed {
        touch-action: none; /* zoomed in: every drag pans the plan */
      }
      .glow.lit {
        animation: room-breathe 6s cubic-bezier(0.77, 0, 0.175, 1) infinite alternate;
      }
      @keyframes room-breathe {
        from {
          opacity: 0.82;
        }
        to {
          opacity: 1;
        }
      }
      .stage.tilt {
        transform-style: preserve-3d; /* lets markers stand up off the tilted floor */
        transform-origin: 50% 30% !important;
        transition: transform 600ms cubic-bezier(0.77, 0, 0.175, 1);
      }
      .stage.tilt img {
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.25);
      }
      .tilt .marker,
      .tilt .heat-label,
      .tilt .room-label,
      .tilt .person {
        /* stand upright on the tilted floor */
        translate: 0 -10px;
        rotate: x -40deg;
      }
      .person {
        position: absolute;
        transform: translate(-50%, -50%) scale(var(--inv, 1));
        width: 26px;
        height: 26px;
        border-radius: 999px;
        background: var(--accent) center / cover no-repeat;
        color: var(--on-accent);
        display: grid;
        place-items: center;
        font-size: 12px;
        font-weight: 700;
        box-shadow: 0 0 0 2px var(--surface-solid), var(--shadow);
        pointer-events: none;
        z-index: 2;
        transition: left 800ms cubic-bezier(0.77, 0, 0.175, 1), top 800ms cubic-bezier(0.77, 0, 0.175, 1);
      }
      @media (prefers-reduced-motion: reduce) {
        .glow.lit {
          animation: none;
        }
      }
      .hit {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
      }
      .hit polygon {
        fill: transparent;
        cursor: pointer;
        transition: fill 160ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .hit polygon:active {
        fill: color-mix(in srgb, var(--accent) 14%, transparent);
      }
      .heat {
        position: absolute;
        inset: 0;
        pointer-events: none;
        transition: background-color 600ms cubic-bezier(0.22, 1, 0.36, 1), opacity 400ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .heat-label {
        position: absolute;
        transform: translate(-50%, -50%) scale(var(--inv, 1));
        padding: 4px 10px;
        border-radius: 999px;
        background: var(--surface-solid);
        color: var(--text);
        font-size: 13px;
        font-weight: 700;
        box-shadow: var(--shadow);
        pointer-events: none;
        z-index: 2;
        direction: ltr;
      }
      .corner-btns {
        position: absolute;
        top: 12px;
        inset-inline-end: 12px;
        z-index: 4;
        display: flex;
        gap: 6px;
      }
      .corner-btns button {
        width: 40px;
        height: 40px;
        border-radius: 999px;
        display: grid;
        place-items: center;
        background: var(--surface);
        -webkit-backdrop-filter: blur(20px);
        backdrop-filter: blur(20px);
        box-shadow: var(--shadow);
        color: var(--text-2);
        --icon-size: 20px;
        transition: background-color var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out);
      }
      .corner-btns button[aria-pressed="true"] {
        background: var(--accent);
        color: var(--on-accent);
      }
      input[type="file"] {
        display: none;
      }
      .marker.roving {
        transition: left 2.4s cubic-bezier(0.65, 0, 0.35, 1), top 2.4s cubic-bezier(0.65, 0, 0.35, 1), transform var(--dur-fast) var(--ease-out);
      }
      .clean {
        position: absolute;
        inset: 0;
        pointer-events: none;
        background: linear-gradient(115deg, transparent 30%, rgba(255, 255, 255, 0.5) 45%, transparent 60%) 0 0 / 300% 100%,
          color-mix(in srgb, #2bb673 12%, transparent);
        animation: shine 4s linear infinite;
      }
      .clean-tag {
        position: absolute;
        transform: translate(-50%, -150%);
        font-size: 18px;
        pointer-events: none;
      }
      @keyframes shine {
        from {
          background-position: 150% 0, 0 0;
        }
        to {
          background-position: -150% 0, 0 0;
        }
      }
      .stack {
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        perspective: 1600px;
        overflow: hidden;
      }
      .slab {
        position: absolute;
        width: min(62%, 560px);
        border: 0;
        padding: 0;
        background: none;
        cursor: pointer;
        transform-style: preserve-3d;
        transform: translateY(calc(((var(--n) - 1) / 2 - var(--i)) * 34%)) rotateX(58deg) rotateZ(-28deg);
        animation: slab-in 900ms cubic-bezier(0.22, 1, 0.36, 1) both;
        animation-delay: calc(var(--i) * 90ms);
        transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .slab:hover {
        transform: translateY(calc(((var(--n) - 1) / 2 - var(--i)) * 34% - 12px)) rotateX(58deg) rotateZ(-28deg);
      }
      .plate {
        position: relative;
        display: block;
        border-radius: 14px;
        overflow: hidden;
        background: var(--surface-solid);
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.35), 0 0 0 1px var(--border);
      }
      .plate img {
        display: block;
        width: 100%;
        opacity: 0.92;
      }
      .plate .lit {
        position: absolute;
        width: 18%;
        aspect-ratio: 1;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255, 196, 120, 0.85), rgba(255, 196, 120, 0) 70%);
      }
      .slab-tag {
        position: absolute;
        top: 50%;
        inset-inline-start: 12px;
        transform: translateY(calc(-50% + ((var(--n) - 1) / 2 - var(--i)) * min(17vw, 150px)));
        pointer-events: none;
        padding: 6px 12px;
        border-radius: 999px;
        background: var(--surface-solid);
        font: 600 14px var(--font);
        color: var(--text);
        white-space: nowrap;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
      }
      @keyframes slab-in {
        from {
          opacity: 0;
          transform: translateY(0) rotateX(58deg) rotateZ(-28deg) scale(0.9);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .slab,
        .clean {
          animation: none;
        }
      }
      .tools.replay {
        width: min(620px, calc(100% - 24px));
        border-radius: var(--r-lg);
        padding: 8px 10px;
        gap: 10px;
      }
      .rp {
        flex: 1;
        min-width: 0;
        display: grid;
        gap: 4px;
      }
      .rp-top {
        display: flex;
        gap: 8px;
        align-items: baseline;
        font-size: 14px;
        min-width: 0;
      }
      .rp-top b {
        font-size: 18px;
        font-variant-numeric: tabular-nums;
      }
      .rp-top .cap {
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: end;
        color: var(--accent-text);
        font-weight: 600;
      }
      .rp input[type="range"] {
        width: 100%;
        accent-color: var(--accent);
      }
    `],Tn.SCALES={temp:[[17,[24,188,242]],[21.5,[47,181,122]],[25.5,[233,151,29]],[29,[242,107,104]]],humidity:[[25,[233,151,29]],[45,[47,181,122]],[70,[24,188,242]]],co2:[[450,[47,181,122]],[1e3,[233,151,29]],[1500,[242,107,104]]]},jn([gt({attribute:!1})],Tn.prototype,"ctx",2),jn([gt({attribute:!1})],Tn.prototype,"widget",2),jn([mt()],Tn.prototype,"floorIdx",2),jn([mt()],Tn.prototype,"selected",2),jn([mt()],Tn.prototype,"drag",2),jn([mt()],Tn.prototype,"natural",2),jn([mt()],Tn.prototype,"area",2),jn([mt()],Tn.prototype,"uploading",2),jn([mt()],Tn.prototype,"roomMode",2),jn([mt()],Tn.prototype,"drawing",2),jn([mt()],Tn.prototype,"selRoom",2),jn([mt()],Tn.prototype,"vtx",2),jn([mt()],Tn.prototype,"zoom",2),jn([mt()],Tn.prototype,"settling",2),jn([mt()],Tn.prototype,"heat",2),jn([mt()],Tn.prototype,"tilt",2),jn([mt()],Tn.prototype,"robotRooms",2),jn([mt()],Tn.prototype,"detecting",2),jn([mt()],Tn.prototype,"replay",2),jn([mt()],Tn.prototype,"stack",2),jn([mt()],Tn.prototype,"asking",2),Tn=jn([pt("sn-w-floorplan")],Tn);var Pn=Object.defineProperty,Nn=Object.getOwnPropertyDescriptor,In=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?Nn(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&Pn(e,i,n),n};function Wn(t,e,i){const s=t.states[e]?.attributes.entity_picture;if(s)return t.hassUrl(`${s}${s.includes("?")?"&":"?"}t=${i}`)}function En(t,e){const i=t.states[e],s=i?.attributes.access_token;if(i&&s)return i.attributes.entity_picture?.startsWith("/dev/")?i.attributes.entity_picture:t.hassUrl(`/api/camera_proxy_stream/${e}?token=${s}`)}let Rn=class extends ct{constructor(){super(...arguments),this.bust=Date.now()}connectedCallback(){super.connectedCallback(),this.timer=window.setInterval((()=>this.bust=Date.now()),1e4)}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this.timer)}render(){const{ctx:t}=this,e=this.widget.config.entity,i=e?Wn(t.hass,e,this.bust):void 0;return Z`
      <button class="cam pressable" @click=${i=>!t.editing&&e&&t.openEntity(e,i.currentTarget)}>
        ${i?Z`<img src=${i} alt="" draggable="false" />`:Z`<span class="placeholder"><sn-icon icon="cctv"></sn-icon></span>`}
        <span class="label"><sn-icon icon="cctv" style="--icon-size:16px"></sn-icon>${e?Kt(t.hass,t.config,e):t.t("widget_camera")}</span>
      </button>
    `}};Rn.styles=[si,o`
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
    `],In([gt({attribute:!1})],Rn.prototype,"ctx",2),In([gt({attribute:!1})],Rn.prototype,"widget",2),In([mt()],Rn.prototype,"bust",2),Rn=In([pt("sn-w-camera")],Rn);var Bn=Object.defineProperty,Zn=Object.getOwnPropertyDescriptor,Fn=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?Zn(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&Bn(e,i,n),n};let Un=class extends ct{render(){return Z`<h2>${this.widget.config.text||this.ctx.t("widget_heading")}</h2>`}};function qn(t=new Date){const e=t.getHours();return e>=4&&e<12?"greet_morning":e>=12&&e<17?"greet_afternoon":"greet_evening"}function Yn(t,e){return e.trim()||t.user?.name||""}function Xn(t,e=!1){if(!t)return"w-cloudy";if("partlycloudy"===t&&e)return"w-partlycloudy-night";const i=`w-${"windy-variant"===t?"windy":"snowy-rainy"===t||"hail"===t?"snowy":t}`;return Bt[i]?i:"w-cloudy"}Un.styles=[si,o`
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
    `],Fn([gt({attribute:!1})],Un.prototype,"ctx",2),Fn([gt({attribute:!1})],Un.prototype,"widget",2),Un=Fn([pt("sn-w-heading")],Un);const Kn=["fajr","dhuhr","asr","maghrib","isha"];function Jn(t){const e=[];for(const i of Kn){const s=Object.values(t.states).find((t=>t.entity_id.startsWith("sensor.")&&t.entity_id.endsWith(`${i}_prayer`))),a=s?new Date(s.state):void 0;a&&!Number.isNaN(a.getTime())&&e.push({id:i,at:a})}return e.sort(((t,e)=>t.at.getTime()-e.at.getTime()))}function Gn(t,e,i=new Date){const s=Math.max(0,Math.round((e.getTime()-i.getTime())/6e4));if(s<60)return t("in_min",{n:s});return t("in_hours",{n:`${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`})}async function Qn(t,e){try{const i=await t.callWS({type:"call_service",domain:"weather",service:"get_forecasts",target:{entity_id:e},service_data:{type:"daily"},return_response:!0}),s=i.response?.[e]?.forecast?.[0];return s?{high:s.temperature,low:s.templow,condition:s.condition}:{}}catch{return{}}}var tr=Object.defineProperty,er=Object.getOwnPropertyDescriptor,ir=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?er(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&tr(e,i,n),n};function sr(t=new Date){try{const e=new Intl.DateTimeFormat("en-u-ca-islamic-umalqura-nu-latn",{month:"numeric",day:"numeric"}).formatToParts(t),i=Number(e.find((t=>"month"===t.type))?.value),s=Number(e.find((t=>"day"===t.type))?.value);return i&&s?{month:i,day:s}:void 0}catch{return}}function ar(t,e=new Date){if("off"===t.season)return null;if("ramadan"===t.season||"eid"===t.season)return t.season;const i=sr(e);return i?9===i.month?"ramadan":10===i.month&&i.day<=3||12===i.month&&i.day>=10&&i.day<=13?"eid":null:null}const nr=(t,e,i,s)=>F`<g style="transform-origin:${t}px 0;animation:sn-sway 4.5s cubic-bezier(0.77,0,0.175,1) ${i}s infinite alternate">
  <line x1=${t} y1="0" x2=${t} y2=${e} stroke="#E9971D" stroke-opacity=".7" stroke-width="1.2"></line>
  <g transform="translate(${t} ${e}) scale(${s})">
    <path d="M-10 0h20l-3 6h-14z" fill="#B87410"></path>
    <path d="M-12 6h24l-4 26h-16z" fill="#E9971D" fill-opacity=".9"></path>
    <path d="M-7 10h14l-2 18h-10z" fill="#FFE2A8"></path>
    <path d="M-8 32h16l-5 6h-6z" fill="#B87410"></path>
    <circle cx="0" cy="19" r="9" fill="#FFD27A" opacity=".35" style="animation:sn-flicker 2.6s ease-in-out ${i}s infinite alternate"></circle>
  </g>
</g>`;let rr=class extends ct{constructor(){super(...arguments),this.season=null,this.inline=!1}render(){if(!this.season)return q;if("ramadan"===this.season&&this.inline)return Z`<svg viewBox="0 0 150 120" aria-hidden="true">
        ${nr(40,30,0,.9)} ${nr(95,55,.7,1.1)} ${nr(132,22,1.3,.7)}
      </svg>`;if("eid"===this.season&&this.inline)return Z`<svg viewBox="0 0 150 120" aria-hidden="true">
        ${["#E9971D","#2FB57A","#18BCF2","#F26B68","#E9971D"].map(((t,e)=>F`<path d="M${10+28*e} ${6+10*Math.sin(e/4*Math.PI)} l26 2 l-13 24 z" fill=${t} opacity=".85"
            style="transform-origin:${10+28*e}px 6px;animation:sn-sway 3.5s cubic-bezier(0.77,0,0.175,1) ${.3*e}s infinite alternate"></path>`))}
      </svg>`;if("ramadan"===this.season)return Z`<svg viewBox="0 0 1200 150" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
        ${nr(90,70,0,1)} ${nr(230,40,.8,.8)} ${nr(970,50,.4,.9)} ${nr(1110,85,1.2,1.1)}
        ${F`<g transform="translate(1040 34)"><circle r="16" fill="#F5D9A0"></circle><circle cx="7" cy="-4" r="14" fill="var(--bg, #151A1E)"></circle></g>`}
        ${[160,300,900,1180,60].map(((t,e)=>F`<circle cx=${t} cy=${18+e%3*14} r="1.6" fill="#F5D9A0" style="animation:sn-flicker 2s ease-in-out ${.4*e}s infinite alternate"></circle>`))}
      </svg>`;const t=Array.from({length:24},((t,e)=>{const i=20+50*e,s=8+26*Math.sin(e/23*Math.PI);return F`<path d="M${i-14} ${s} L${i+14} ${s+2} L${i} ${s+28} Z" fill=${["#E9971D","#2FB57A","#18BCF2","#F26B68"][e%4]} opacity=".85"
        style="transform-origin:${i}px ${s}px;animation:sn-sway 3.5s cubic-bezier(0.77,0,0.175,1) ${e%5*.3}s infinite alternate"></path>`}));return Z`<svg viewBox="0 0 1200 150" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
      <path d="M0 8 Q600 70 1200 8" fill="none" stroke="#E9971D" stroke-opacity=".5" stroke-width="1.5"></path>
      ${t}
    </svg>`}};rr.styles=o`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 150px;
      z-index: 71; /* over the screensaver; never takes taps */
      pointer-events: none;
      overflow: hidden;
    }
    :host([inline]) {
      position: absolute;
      top: 0;
      left: auto;
      right: auto;
      inset-inline-end: 8px;
      width: 150px;
      height: 120px;
      z-index: 0;
    }
    svg {
      width: 100%;
      height: 100%;
    }
    @keyframes sn-sway {
      from {
        transform: rotate(-3deg);
      }
      to {
        transform: rotate(3deg);
      }
    }
    @keyframes sn-flicker {
      to {
        opacity: 0.6;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      * {
        animation: none !important;
      }
    }
  `,ir([gt()],rr.prototype,"season",2),ir([gt({type:Boolean,reflect:!0})],rr.prototype,"inline",2),rr=ir([pt("sn-season")],rr);var or=Object.defineProperty,lr=Object.getOwnPropertyDescriptor,cr=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?lr(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&or(e,i,n),n};let dr=class extends ct{constructor(){super(...arguments),this.now=new Date,this.forecast={}}connectedCallback(){super.connectedCallback(),this.timer=window.setInterval((()=>this.now=new Date),15e3),this.loadForecast(),this.forecastTimer=window.setInterval((()=>this.loadForecast()),18e5)}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this.timer),window.clearInterval(this.forecastTimer)}async loadForecast(){const t=this.ctx?.config.settings.weather.entity;this.widget?.h>=4&&t&&this.ctx.hass.states[t]&&(this.forecast=await Qn(this.ctx.hass,t))}renderWeather(){const{ctx:t}=this,e=t.config.settings.weather.entity,i=e?t.hass.states[e]:void 0;if(!i)return q;const s="below_horizon"===t.hass.states["sun.sun"]?.state,a=e=>"number"==typeof e?se(`${ae(e,t.lang,0)}°`):"",{high:n,low:r}=this.forecast;return Z`<span class="pill">
      <sn-icon .icon=${Xn(i.state,s)}></sn-icon>${a(i.attributes.temperature)}
      ${void 0!==n?Z`<span class="muted">${a(n)} / ${a(r)}</span>`:q}
    </span>`}renderPrayer(){const{ctx:t}=this;if(!t.config.settings.prayer)return q;const e=function(t,e=new Date){const i=Jn(t),s=i.find((t=>t.at.getTime()>e.getTime()));if(s)return s;const a=i.find((t=>"fajr"===t.id));return a?{id:"fajr",at:new Date(a.at.getTime()+864e5)}:void 0}(t.hass,this.now);return e?Z`<span class="pill">
      <sn-icon icon="mosque"></sn-icon>${t.t(`p_${e.id}`)}
      <span class="muted">${Gn(t.t,e.at,this.now)}</span>
    </span>`:q}render(){const{ctx:t}=this,e=Dt[t.lang],i=Z`<div class="time ltr">${this.now.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}</div>`,s=Z`<div class="date">${this.now.toLocaleDateString(e,{weekday:"long",day:"numeric",month:"long"})}</div>`;if(this.widget.h<4){const e=t.config.settings.screensaver.temp_entity,a=e?t.hass.states[e]:void 0;return Z`<div class="card glass">
        ${i} ${s} ${a?Z`<div class="temp"><sn-icon icon="thermometer"></sn-icon>${oe(t.t,a,t.lang)}</div>`:q}
      </div>`}const a=Yn(t.hass,t.config.settings.greeting_name),n=t.allows("seasons")?ar(t.config.settings,this.now):null;return Z`<div class="card glass full" style="position:relative">
      ${n?Z`<sn-season inline .season=${n}></sn-season>`:q}
      <div class="greet">
        ${n?Z`${t.t("ramadan"===n?"ramadan_kareem":"eid_mubarak")} ${"ramadan"===n?"🌙":"🎉"} · `:q}${t.t(qn(this.now))}${a?("ar"===t.lang?"، ":", ")+a:""}
      </div>
      <div>${i} ${s}</div>
      <div class="pills">${this.renderWeather()} ${this.renderPrayer()}</div>
    </div>`}};dr.styles=[si,o`
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
        font-weight: var(--display-weight, 700);
        letter-spacing: var(--display-track, 0);
        white-space: nowrap;
        font-weight: 700;
        line-height: 1;
        letter-spacing: -0.02em;
        font-variant-numeric: tabular-nums;
      }
      .full .time {
        font-size: clamp(40px, 20cqi, 84px);
        font-weight: var(--display-weight, 700);
        letter-spacing: var(--display-track, 0);
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
    `],cr([gt({attribute:!1})],dr.prototype,"ctx",2),cr([gt({attribute:!1})],dr.prototype,"widget",2),cr([mt()],dr.prototype,"now",2),cr([mt()],dr.prototype,"forecast",2),dr=cr([pt("sn-w-clock")],dr);var pr=Object.defineProperty,hr=Object.getOwnPropertyDescriptor,ur=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?hr(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&pr(e,i,n),n};let gr=class extends ct{connectedCallback(){super.connectedCallback(),this.load(),this.timer=window.setInterval((()=>this.load()),12e4)}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this.timer)}willUpdate(){const t=this.ctx.config.settings.doorbell.trigger_entity,e=t?`${this.ctx.hass.states[t]?.state}`:void 0;void 0!==this.bellSeen&&e!==this.bellSeen&&window.setTimeout((()=>this.load()),4e3),this.bellSeen=e}async load(){try{const t=await this.ctx.hass.callWS({type:"smartnest/visitors/list"});this.visits=t.visitors}catch{this.visits=[]}}open(t){const e=Dt[this.ctx.lang],i=new Date(t.time);this.ctx.showSheet({title:i.toLocaleString(e,{weekday:"long",hour:"2-digit",minute:"2-digit"}),render:e=>Z`<img src=${e.hass.hassUrl(t.url)} alt="" style="width:100%;border-radius:var(--r-md);display:block" />`})}render(){const{ctx:t}=this,e=Dt[t.lang],i=this.visits??[];let s="";return Z`<div class="wrap glass">
      <h3><sn-icon icon="doorbell"></sn-icon>${t.t("widget_visitors")}</h3>
      <div class="strip" data-no-swipe>
        ${this.visits&&!i.length?Z`<span class="empty">${t.t("no_visitors")}</span>`:q}
        ${i.map(((i,a)=>{const n=new Date(i.time),r=(i=>{const s=new Date,a=new Date(s.getTime()-864e5);return i.toDateString()===s.toDateString()?t.t("today"):i.toDateString()===a.toDateString()?t.t("yesterday"):i.toLocaleDateString(e,{weekday:"short",day:"numeric",month:"short"})})(n),o=r!==s;return s=r,Z`<button class="shot pressable" style="animation-delay:${40*Math.min(a,8)}ms" @click=${()=>this.open(i)}>
              <img src=${t.hass.hassUrl(i.url)} alt="" loading="lazy" />
              ${o?Z`<em class="tag">${r}</em>`:q}
              <span>${n.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}</span>
            </button>`}))}
      </div>
    </div>`}};gr.styles=[si,o`
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
    `],ur([gt({attribute:!1})],gr.prototype,"ctx",2),ur([gt({attribute:!1})],gr.prototype,"widget",2),ur([mt()],gr.prototype,"visits",2),gr=ur([pt("sn-w-visitors")],gr);var mr=Object.defineProperty,fr=Object.getOwnPropertyDescriptor,br=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?fr(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&mr(e,i,n),n};const _r="script.smartnest_panic";let yr=class extends ct{constructor(){super(...arguments),this.holding=!1,this.fired=!1}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this.timer)}start(t){this.ctx.editing||(t.currentTarget.setPointerCapture(t.pointerId),this.holding=!0,navigator.vibrate?.(10),this.timer=window.setTimeout((()=>this.fire()),2e3))}cancel(){window.clearTimeout(this.timer),this.holding=!1}fire(){this.holding=!1,this.fired=!0,navigator.vibrate?.([200,80,200]),this.ctx.hass.callService("script","turn_on",{entity_id:_r}).then((()=>this.ctx.toast(this.ctx.t("panic_sent")))).catch((()=>this.ctx.toast(this.ctx.t("error")))),window.setTimeout((()=>this.fired=!1),4e3)}render(){const{ctx:t}=this;return t.hass.states[_r]?Z`<div class="card glass">
      <div class="wrap">
        <button
          class="btn-sos ${this.holding?"holding":""} ${this.fired?"fired":""}"
          aria-label=${t.t("widget_panic")}
          @pointerdown=${t=>this.start(t)}
          @pointerup=${()=>this.cancel()}
          @pointercancel=${()=>this.cancel()}
          @contextmenu=${t=>t.preventDefault()}
        >
          <svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="48"></circle></svg>
          <sn-icon icon="alert-circle-outline"></sn-icon>
        </button>
        <span class="lbl">${t.t("widget_panic")}</span>
        <span class="hint">${t.t("panic_hold")}</span>
      </div>
    </div>`:t.isAdmin?Z`<div class="card glass"><span class="hint">${t.t("panic_missing")}</span></div>`:q}};yr.styles=[si,o`
      :host {
        display: block;
        height: 100%;
      }
      .card {
        height: 100%;
        border-radius: var(--r-lg);
        display: grid;
        place-items: center;
        align-content: center;
        gap: 10px;
        padding: 12px;
        text-align: center;
      }
      .btn-sos {
        position: relative;
        width: min(120px, 70%);
        aspect-ratio: 1;
        border-radius: 999px;
        background: color-mix(in srgb, var(--alert) 18%, transparent);
        color: var(--alert-text);
        display: grid;
        place-items: center;
        touch-action: none;
        user-select: none;
        -webkit-user-select: none;
        --icon-size: 40%;
        transition: transform 160ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .btn-sos.holding {
        transform: scale(0.96);
      }
      .btn-sos.fired {
        background: var(--alert);
        color: var(--on-alert);
      }
      svg {
        position: absolute;
        inset: -6px;
        width: calc(100% + 12px);
        height: calc(100% + 12px);
        transform: rotate(-90deg);
      }
      circle {
        fill: none;
        stroke: var(--alert);
        stroke-width: 6;
        stroke-linecap: round;
        stroke-dasharray: 302;
        stroke-dashoffset: 302;
        transition: stroke-dashoffset 200ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .holding circle {
        stroke-dashoffset: 0;
        transition: stroke-dashoffset 2s linear;
      }
      .wrap {
        width: 100%;
        display: grid;
        place-items: center;
        align-content: center;
        gap: 8px;
      }
      .lbl {
        font-weight: 700;
      }
      .hint {
        font-size: 12px;
        color: var(--text-2);
      }
    `],br([gt({attribute:!1})],yr.prototype,"ctx",2),br([gt({attribute:!1})],yr.prototype,"widget",2),br([mt()],yr.prototype,"holding",2),br([mt()],yr.prototype,"fired",2),yr=br([pt("sn-w-panic")],yr);var vr=Object.defineProperty,xr=Object.getOwnPropertyDescriptor,wr=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?xr(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&vr(e,i,n),n};const $r=/stove|oven|iron|heater|kettle|hob|غاز|فرن|مكوى|مكواة|سخان|غلاية|תנור|מגהץ|קומקום/i;let kr=class extends ct{checks(){const{hass:t,config:e}=this.ctx,i=ki(e).filter((e=>t.states[e])),s=i.length?i:Object.keys(t.states),a=e=>t.states[e],n=t=>s.filter((e=>t(a(e)))),r=(e,i,s,a={})=>t.callService(e,i,{entity_id:s,...a}),o=[],l=n((t=>"lock"===Xt(t.entity_id)&&"locked"!==t.state));o.push({key:"check_locks",icon:"lock",bad:l,fix:l.length?()=>r("lock","lock",l):void 0});const c=n((t=>"binary_sensor"===Xt(t.entity_id)&&"on"===t.state&&["door","window","opening","garage_door"].includes(t.attributes.device_class)||"cover"===Xt(t.entity_id)&&"open"===t.state&&["garage","gate","door"].includes(t.attributes.device_class))),d=c.filter((t=>"cover"===Xt(t)));o.push({key:"check_open",icon:"door-closed",bad:c,fix:d.length?()=>r("cover","close_cover",d):void 0});const p=n((t=>"light"===Xt(t.entity_id)&&"on"===t.state));o.push({key:"check_lights",icon:"lightbulb-outline",bad:p,fix:p.length?()=>r("light","turn_off",p):void 0});const h=Object.keys(t.states).filter((t=>"alarm_control_panel"===Xt(t)));if(h.length){const t=h.filter((t=>"disarmed"===a(t).state));o.push({key:"check_alarm",icon:"shield-home",bad:t,fix:t.length?()=>a(t[0]).attributes.code_arm_required?Promise.resolve(this.ctx.openEntity(t[0])):r("alarm_control_panel","alarm_arm_night",t):void 0})}const u=Object.keys(t.states).filter((t=>"switch"===Xt(t)&&"on"===a(t).state&&$r.test(`${t} ${a(t).attributes.friendly_name??""}`)));return(u.length||Object.keys(t.states).some((t=>"switch"===Xt(t)&&$r.test(`${t} ${a(t).attributes.friendly_name??""}`))))&&o.push({key:"check_appliances",icon:"power-plug-off",bad:u,fix:u.length?()=>r("switch","turn_off",u):void 0}),o}fixAll(t){navigator.vibrate?.(10),Promise.all(t.filter((t=>t.bad.length&&t.fix)).map((t=>t.fix()))).catch((()=>this.ctx.toast(this.ctx.t("error"))))}render(){const{ctx:t}=this,{t:e,hass:i,config:s}=t,a=this.checks(),n=a.filter((t=>t.bad.length)),r=n.filter((t=>t.fix));return Z`<div class="card glass">
      <div class="head">
        <sn-icon class=${n.length?"bad":"ok"} icon=${n.length?"alert-circle-outline":"check-circle"}></sn-icon>
        ${n.length?e("check_n",{n:n.length}):e("check_ok")}
      </div>
      ${a.map(((a,n)=>Z`<div class="row" style="animation-delay:${40*n}ms">
          <sn-icon class=${a.bad.length?"warn":"good"} icon=${a.bad.length?a.icon:"check-circle"}></sn-icon>
          <span class="txt">
            <span>${e(a.key)}</span>
            ${a.bad.length?Z`<span class="who">${a.bad.map((t=>Kt(i,s,t))).join("ar"===t.lang?"، ":", ")}</span>`:q}
          </span>
          ${a.bad.length&&a.fix?Z`<button class="btn pressable" @click=${()=>a.fix().catch((()=>t.toast(e("error"))))}>${e("check_fix")}</button>`:q}
        </div>`))}
      ${r.length>1?Z`<button class="btn primary pressable" @click=${()=>this.fixAll(a)}>${e("check_fix_all")}</button>`:q}
    </div>`}};kr.styles=[si,o`
      :host {
        display: block;
        height: 100%;
      }
      .card {
        height: 100%;
        border-radius: var(--r-lg);
        padding: 18px;
        display: grid;
        align-content: start;
        gap: 10px;
        overflow: auto;
      }
      .head {
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 700;
        font-size: 17px;
        --icon-size: 26px;
      }
      .head .ok {
        color: var(--success);
      }
      .head .bad {
        color: var(--accent-text);
      }
      .row {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 10px;
        border-radius: 12px;
        background: var(--surface-2);
        font-size: 14px;
        --icon-size: 20px;
        animation: in 300ms cubic-bezier(0.22, 1, 0.36, 1) both;
      }
      .row .txt {
        flex: 1;
        min-width: 0;
        display: grid;
      }
      .row .who {
        font-size: 12px;
        color: var(--text-2);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .row .good {
        color: var(--success);
      }
      .row .warn {
        color: var(--alert-text);
      }
      .row .btn {
        min-height: 34px;
        padding: 0 12px;
        font-size: 13px;
      }
      @keyframes in {
        from {
          opacity: 0;
          transform: translateY(6px);
        }
      }
    `],wr([gt({attribute:!1})],kr.prototype,"ctx",2),wr([gt({attribute:!1})],kr.prototype,"widget",2),kr=wr([pt("sn-w-check")],kr);var Cr=Object.defineProperty,Mr=Object.getOwnPropertyDescriptor,Ar=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?Mr(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&Cr(e,i,n),n};let Hr=class extends ct{connectedCallback(){super.connectedCallback(),function(){try{const t=new AudioContext,e=t.createOscillator(),i=t.createGain();e.frequency.value=880,i.gain.setValueAtTime(1e-4,t.currentTime),i.gain.exponentialRampToValueAtTime(.25,t.currentTime+.02),i.gain.exponentialRampToValueAtTime(1e-4,t.currentTime+.8),e.connect(i).connect(t.destination),e.start(),e.stop(t.currentTime+.9),window.setTimeout((()=>t.close()),1200)}catch{}}(),navigator.vibrate?.([80,60,80])}render(){const{ctx:t,msg:e}=this;return Z`<div class="scrim">
      <div class="card" role="alertdialog" aria-label=${e.title??""}>
        <span class="ic"><sn-icon .icon=${e.icon&&["pill","bell","message"].includes(e.icon)?e.icon:"message"}></sn-icon></span>
        ${e.title?Z`<span class="from">${t.t("message_from",{name:e.title})}</span>`:q}
        <div class="text">${e.message}</div>
        <button class="btn primary pressable" @click=${()=>t.hass.callWS({type:"smartnest/message/ack",id:e.id}).catch((()=>{}))}>
          ${e.ack||t.t("got_it")}
        </button>
      </div>
    </div>`}};Hr.styles=[si,o`
      .scrim {
        position: fixed;
        inset: 0;
        z-index: 82;
        display: grid;
        place-items: center;
        padding: 24px;
        background: var(--scrim);
        -webkit-backdrop-filter: blur(12px);
        backdrop-filter: blur(12px);
        animation: fade 260ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .card {
        width: min(560px, 100%);
        border-radius: var(--r-xl);
        background: var(--surface-solid);
        color: var(--text);
        box-shadow: var(--shadow-lift);
        padding: 28px;
        display: grid;
        gap: 14px;
        justify-items: center;
        text-align: center;
        animation: up 380ms cubic-bezier(0.32, 0.72, 0, 1);
      }
      .ic {
        width: 64px;
        height: 64px;
        border-radius: 999px;
        display: grid;
        place-items: center;
        background: var(--accent);
        color: var(--on-accent);
        --icon-size: 32px;
      }
      .from {
        color: var(--text-2);
        font-size: 14px;
      }
      .text {
        font-size: clamp(22px, 3.4vw, 34px);
        font-weight: 700;
        line-height: 1.3;
        white-space: pre-wrap;
      }
      .btn {
        min-width: 180px;
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
          transform: translateY(24px) scale(0.97);
        }
      }
    `],Ar([gt({attribute:!1})],Hr.prototype,"ctx",2),Ar([gt({attribute:!1})],Hr.prototype,"msg",2),Hr=Ar([pt("sn-message")],Hr);var Lr=Object.defineProperty,Vr=Object.getOwnPropertyDescriptor,Sr=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?Vr(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&Lr(e,i,n),n};let zr=class extends ct{render(){const{ctx:t}=this,{hass:e,t:i}=t,s=Object.values(e.states).filter((t=>t.entity_id.startsWith("person.")));return Z`<div class="card glass" data-no-swipe>
      ${s.map(((s,a)=>{const n="home"===s.state,r=Kt(e,t.config,s.entity_id),o=s.attributes.entity_picture,l=n?i("at_home"):"not_home"===s.state?i("away_l"):s.state;return Z`<div class="p ${n?"home":"away"}" style="animation-delay:${50*a}ms">
          <div class="av" style=${o?`background-image:url('${e.hassUrl(o)}')`:""}>${o?"":r.slice(0,1)}</div>
          <span class="name">${r}</span>
          <span class="where">${l} · ${le(i,s.last_changed)}</span>
        </div>`}))}
      ${t.allows("messages")?Z`<button class="p pressable" style="align-self:center" aria-label=${i("send_message")} @click=${()=>function(t){t.showSheet({title:t.t("send_message"),render:t=>Z`<form
      style="display:grid;gap:12px"
      @submit=${e=>{e.preventDefault();const i=e.currentTarget,s=i.querySelector("input[type=text]"),a=i.querySelector("input[name=speak]")?.checked,n=s.value.trim();if(n){if(a){const e=Object.keys(t.hass.states).filter((t=>t.startsWith("tts."))),i=e.find((t=>t.includes("google")))??e[0];i&&t.hass.callService("tts","speak",{entity_id:i,media_player_entity_id:t.config.settings.speakers,message:n,language:t.lang}).catch((()=>t.toast(t.t("error"))))}t.hass.callWS({type:"smartnest/message/send",message:n}).then((()=>t.closeSheet())).catch((()=>t.toast(t.t("error"))))}}}
    >
      <input type="text" maxlength="500" placeholder=${t.t("message_placeholder")} autofocus />
      ${t.allows("broadcast")&&t.config.settings.speakers.length?Z`<label style="display:flex;gap:8px;align-items:center;font-size:15px">
            <input name="speak" type="checkbox" style="width:auto;min-height:auto" /><sn-icon icon="bullhorn" style="--icon-size:20px"></sn-icon>${t.t("announce")}
          </label>`:q}
      <button class="btn primary pressable" type="submit"><sn-icon icon="send" style="--icon-size:20px"></sn-icon>${t.t("send")}</button>
    </form>`})}(t)}>
            <span class="av" style="background:var(--accent);color:var(--on-accent);--icon-size:24px"><sn-icon icon="message"></sn-icon></span>
            <span class="name">${i("send")}</span>
          </button>`:""}
    </div>`}};zr.styles=[si,o`
      :host {
        display: block;
        height: 100%;
      }
      .card {
        height: 100%;
        border-radius: var(--r-lg);
        padding: 14px 16px;
        display: flex;
        gap: 18px;
        align-items: center;
        overflow-x: auto;
        scrollbar-width: none;
      }
      .p {
        display: grid;
        justify-items: center;
        gap: 4px;
        min-width: 72px;
        text-align: center;
        animation: in 360ms cubic-bezier(0.22, 1, 0.36, 1) both;
      }
      .av {
        width: 56px;
        height: 56px;
        border-radius: 999px;
        background: var(--surface-2) center / cover no-repeat;
        display: grid;
        place-items: center;
        font-weight: 700;
        font-size: 20px;
        color: var(--text-2);
        box-shadow: 0 0 0 3px var(--surface-solid), 0 0 0 5px var(--border);
        transition: box-shadow 400ms cubic-bezier(0.22, 1, 0.36, 1), filter 400ms;
      }
      .home .av {
        box-shadow: 0 0 0 3px var(--surface-solid), 0 0 0 5px var(--success);
      }
      .away .av {
        filter: grayscale(0.7);
        opacity: 0.75;
      }
      .name {
        font-weight: 700;
        font-size: 14px;
        white-space: nowrap;
      }
      .where {
        font-size: 12px;
        color: var(--text-2);
        white-space: nowrap;
      }
      @keyframes in {
        from {
          opacity: 0;
          transform: translateY(6px);
        }
      }
    `],Sr([gt({attribute:!1})],zr.prototype,"ctx",2),Sr([gt({attribute:!1})],zr.prototype,"widget",2),zr=Sr([pt("sn-w-family")],zr);var Dr=Object.defineProperty,Or=Object.getOwnPropertyDescriptor,jr=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?Or(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&Dr(e,i,n),n};let Tr=class extends ct{constructor(){super(...arguments),this.items=[]}get entity(){return this.widget.config.entity??Object.keys(this.ctx.hass.states).find((t=>t.startsWith("todo.")))}connectedCallback(){super.connectedCallback();const t=this.entity;t&&(this.unsub=this.ctx.hass.connection.subscribeMessage((t=>this.items=t.items??[]),{type:"todo/item/subscribe",entity_id:t}))}disconnectedCallback(){super.disconnectedCallback(),this.unsub?.then((t=>t())).catch((()=>{}))}add(t){t.preventDefault();const e=t.currentTarget.querySelector("input"),i=e.value.trim();i&&this.entity&&(e.value="",this.ctx.hass.callService("todo","add_item",{entity_id:this.entity,item:i}).catch((()=>this.ctx.toast(this.ctx.t("error")))))}toggle(t){navigator.vibrate?.(5),this.ctx.hass.callService("todo","update_item",{entity_id:this.entity,item:t.uid,status:"completed"===t.status?"needs_action":"completed"}).catch((()=>this.ctx.toast(this.ctx.t("error"))))}render(){const{ctx:t}=this,e=this.entity,i=this.items.filter((t=>"completed"!==t.status)),s=this.items.filter((t=>"completed"===t.status)).slice(0,5);return Z`<div class="card glass">
      <h3><sn-icon icon="todo"></sn-icon>${e?Kt(t.hass,t.config,e):t.t("widget_todo")}</h3>
      ${e?Z`<form @submit=${this.add}>
            <input type="text" placeholder=${t.t("add_placeholder")} />
            <button class="icon-btn primary pressable" type="submit" aria-label=${t.t("add")}><sn-icon icon="plus" style="--icon-size:20px"></sn-icon></button>
          </form>`:q}
      <ul>
        ${ss([...i,...s],(t=>t.uid),(t=>Z`<li class=${"completed"===t.status?"done":""}>
            <button class="pressable" @click=${()=>this.toggle(t)}>
              <sn-icon icon=${"completed"===t.status?"circle-check":"circle-outline"}></sn-icon><span>${t.summary}</span>
            </button>
          </li>`))}
        ${this.items.length?q:Z`<li class="empty">${t.t("todo_empty")}</li>`}
      </ul>
    </div>`}};Tr.styles=[si,o`
      :host {
        display: block;
        height: 100%;
      }
      .card {
        height: 100%;
        border-radius: var(--r-lg);
        padding: 16px;
        display: grid;
        grid-template-rows: auto auto 1fr;
        gap: 10px;
        overflow: hidden;
      }
      h3 {
        margin: 0;
        display: flex;
        gap: 8px;
        align-items: center;
        font-size: 16px;
        --icon-size: 20px;
      }
      h3 sn-icon {
        color: var(--accent-text);
      }
      form {
        display: flex;
        gap: 6px;
      }
      form input {
        min-height: 40px;
      }
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        overflow: auto;
        display: grid;
        align-content: start;
        gap: 2px;
      }
      li button {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 6px;
        border-radius: 10px;
        text-align: start;
        font-size: 15px;
        --icon-size: 22px;
      }
      li sn-icon {
        color: var(--text-2);
      }
      li.done span {
        text-decoration: line-through;
        color: var(--text-2);
      }
      li.done sn-icon {
        color: var(--success);
      }
      li {
        animation: in 260ms cubic-bezier(0.22, 1, 0.36, 1) both;
      }
      @keyframes in {
        from {
          opacity: 0;
          transform: translateY(4px);
        }
      }
      .empty {
        color: var(--text-2);
        font-size: 14px;
      }
    `],jr([gt({attribute:!1})],Tr.prototype,"ctx",2),jr([gt({attribute:!1})],Tr.prototype,"widget",2),jr([mt()],Tr.prototype,"items",2),Tr=jr([pt("sn-w-todo")],Tr);var Pr=Object.defineProperty,Nr=Object.getOwnPropertyDescriptor,Ir=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?Nr(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&Pr(e,i,n),n};const Wr=["#E9971D","#18BCF2","#2FB57A","#F26B68","#A78BFA"];let Er=class extends ct{connectedCallback(){super.connectedCallback(),this.load(),this.timer=window.setInterval((()=>this.load()),9e5)}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this.timer)}get calendars(){const t=this.widget.config.entities;return t?.length?t:Object.keys(this.ctx.hass.states).filter((t=>t.startsWith("calendar.")))}async load(){const t=new Date;t.setHours(0,0,0,0);const e=new Date(t.getTime()+6048e5),i=[];await Promise.all(this.calendars.map((async s=>{try{const a=await this.ctx.hass.fetchWithAuth(`/api/calendars/${s}?start=${encodeURIComponent(t.toISOString())}&end=${encodeURIComponent(e.toISOString())}`);if(!a.ok)return;for(const t of await a.json()){const e=!t.start.dateTime;i.push({summary:t.summary,start:new Date(t.start.dateTime??`${t.start.date}T00:00:00`),allDay:e,cal:s})}}catch{}}))),this.events=i.filter((t=>t.allDay||t.start.getTime()>Date.now()-36e5)).sort(((t,e)=>t.start.getTime()-e.start.getTime())).slice(0,20)}render(){const{ctx:t}=this,e=Dt[t.lang],i=this.calendars;let s="";return Z`<div class="card glass">
      <h3><sn-icon icon="calendar"></sn-icon>${t.t("widget_calendar")}</h3>
      <div class="list">
        ${this.events&&!this.events.length?Z`<span class="empty">${t.t("no_events")}</span>`:q}
        ${(this.events??[]).map(((a,n)=>{const r=(i=>{const s=new Date,a=new Date(s.getTime()+864e5);return i.toDateString()===s.toDateString()?t.t("today"):i.toDateString()===a.toDateString()?t.t("tomorrow"):i.toLocaleDateString(e,{weekday:"long",day:"numeric",month:"short"})})(a.start),o=r!==s?Z`<span class="day">${r}</span>`:q;return s=r,Z`${o}<div class="ev" style="animation-delay:${30*Math.min(n,10)}ms">
              <i style="background:${Wr[i.indexOf(a.cal)%Wr.length]}"></i><span>${a.summary}</span>
              <span class="when">${a.allDay?t.t("all_day"):a.start.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}</span>
            </div>`}))}
      </div>
    </div>`}};Er.styles=[si,o`
      :host {
        display: block;
        height: 100%;
      }
      .card {
        height: 100%;
        border-radius: var(--r-lg);
        padding: 16px;
        display: grid;
        grid-template-rows: auto 1fr;
        gap: 10px;
        overflow: hidden;
      }
      h3 {
        margin: 0;
        display: flex;
        gap: 8px;
        align-items: center;
        font-size: 16px;
        --icon-size: 20px;
      }
      h3 sn-icon {
        color: var(--accent-text);
      }
      .list {
        overflow: auto;
        display: grid;
        align-content: start;
        gap: 10px;
      }
      .day {
        font-size: 12px;
        font-weight: 700;
        color: var(--text-2);
        letter-spacing: 0.03em;
      }
      .ev {
        display: grid;
        grid-template-columns: 4px 1fr auto;
        gap: 10px;
        align-items: center;
        font-size: 15px;
        animation: in 300ms cubic-bezier(0.22, 1, 0.36, 1) both;
      }
      .ev i {
        height: 100%;
        min-height: 22px;
        border-radius: 2px;
      }
      .ev .when {
        font-size: 13px;
        color: var(--text-2);
        direction: ltr;
      }
      .empty {
        color: var(--text-2);
        font-size: 14px;
      }
      @keyframes in {
        from {
          opacity: 0;
          transform: translateY(4px);
        }
      }
    `],Ir([gt({attribute:!1})],Er.prototype,"ctx",2),Ir([gt({attribute:!1})],Er.prototype,"widget",2),Ir([mt()],Er.prototype,"events",2),Er=Ir([pt("sn-w-calendar")],Er);var Rr=Object.defineProperty,Br=Object.getOwnPropertyDescriptor,Zr=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?Br(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&Rr(e,i,n),n};let Fr=class extends ct{constructor(){super(...arguments),this.days=[]}connectedCallback(){super.connectedCallback(),this.load(),this.timer=window.setInterval((()=>this.load()),36e5)}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this.timer)}async load(){const t=this.ctx.config.settings.weather.entity;if(t&&this.ctx.hass.states[t])try{const e=await this.ctx.hass.callWS({type:"call_service",domain:"weather",service:"get_forecasts",target:{entity_id:t},service_data:{type:"daily"},return_response:!0});this.days=(e.response?.[t]?.forecast??[]).slice(0,7)}catch{this.days=[]}}render(){const{ctx:t}=this,e=Dt[t.lang],i=this.days.map((t=>t.temperature??0)),s=this.days.map((t=>t.templow??t.temperature??0)),a=Math.max(...i,1),n=Math.min(...s,0),r=e=>"number"==typeof e?se(`${ae(e,t.lang,0)}°`):"–";return Z`<div class="card glass" data-no-swipe>
      ${this.days.map(((i,s)=>{const o=new Date(i.datetime),l=i.templow??i.temperature??0,c=i.temperature??l,d=(l-n)/(a-n||1)*100,p=100-(c-n)/(a-n||1)*100;return Z`<div class="d ${0===s?"today":""}" style="animation-delay:${40*s}ms">
          <span>${0===s?t.t("today"):o.toLocaleDateString(e,{weekday:"short"})}</span>
          <sn-icon .icon=${Xn(i.condition)}></sn-icon>
          <span class="hi">${r(i.temperature)}</span>
          <div class="range"><span style="bottom:${d}%;top:${p}%"></span></div>
          <span class="lo">${r(i.templow)}</span>
        </div>`}))}
    </div>`}};Fr.styles=[si,o`
      :host {
        display: block;
        height: 100%;
      }
      .card {
        height: 100%;
        border-radius: var(--r-lg);
        padding: 14px;
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: minmax(64px, 1fr);
        gap: 6px;
        overflow-x: auto;
        scrollbar-width: none;
      }
      .d {
        display: grid;
        justify-items: center;
        align-content: space-between;
        gap: 6px;
        padding: 8px 4px;
        border-radius: 14px;
        font-size: 13px;
        --icon-size: 28px;
        animation: in 360ms cubic-bezier(0.22, 1, 0.36, 1) both;
      }
      .d.today {
        background: var(--surface-2);
      }
      .d sn-icon {
        color: var(--accent-text);
      }
      .hi {
        font-weight: 700;
        font-size: 16px;
      }
      .lo {
        color: var(--text-2);
      }
      .range {
        width: 6px;
        flex: 1;
        min-height: 24px;
        border-radius: 3px;
        background: var(--surface-2);
        position: relative;
      }
      .range span {
        position: absolute;
        left: 0;
        right: 0;
        border-radius: 3px;
        background: linear-gradient(to top, #18bcf2, #e9971d);
      }
      @keyframes in {
        from {
          opacity: 0;
          transform: translateY(6px);
        }
      }
    `],Zr([gt({attribute:!1})],Fr.prototype,"ctx",2),Zr([gt({attribute:!1})],Fr.prototype,"widget",2),Zr([mt()],Fr.prototype,"days",2),Fr=Zr([pt("sn-w-forecast")],Fr);var Ur=Object.defineProperty,qr=Object.getOwnPropertyDescriptor,Yr=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?qr(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&Ur(e,i,n),n};const Xr=864e5,Kr=t=>new Date(t.getFullYear(),t.getMonth(),t.getDate());let Jr=class extends ct{render(){const{ctx:t}=this,e=Dt[t.lang],i=Kr(new Date),s=[...(this.widget.config.events??[]).map((t=>{let e=new Date(`${t.date}T00:00:00`);if(!1!==t.yearly)for(;e<i;)e=new Date(e.getFullYear()+1,e.getMonth(),e.getDate());return{title:t.title,date:e,icon:"calendar"}})).filter((t=>t.date>=i)),...this.widget.config.islamic??"ar"===t.lang?function(t){const e=[[9,1,"next_ramadan","night"],[10,1,"next_eid","palette"],[12,10,"next_adha","palette"]],i=[],s=Kr(new Date);for(let a=0;a<400&&i.length<e.length;a++){const n=new Date(s.getTime()+a*Xr),r=sr(n),o=r&&e.find((([t,e])=>r.month===t&&r.day===e));o&&!i.some((e=>e.title===t(o[2])))&&i.push({title:t(o[2]),date:n,icon:o[3]})}return i}(t.t):[]].sort(((t,e)=>t.date.getTime()-e.date.getTime())).slice(0,5);return Z`<div class="card glass">
      <h3><sn-icon icon="countdown"></sn-icon>${t.t("widget_countdown")}</h3>
      ${s.map(((s,a)=>{const n=Math.round((s.date.getTime()-i.getTime())/Xr);return Z`<div class="row" style="animation-delay:${50*a}ms">
          <span class="n ${0===n?"now":""}">${0===n?"🎉":n}${n?Z`<small>${t.t("days_left",{n:""}).trim()}</small>`:q}</span>
          <span class="t">${s.title}<span>${0===n?t.t("today_event"):s.date.toLocaleDateString(e,{weekday:"long",day:"numeric",month:"long"})}</span></span>
        </div>`}))}
    </div>`}};Jr.styles=[si,o`
      :host {
        display: block;
        height: 100%;
      }
      .card {
        height: 100%;
        border-radius: var(--r-lg);
        padding: 16px;
        display: grid;
        align-content: start;
        gap: 10px;
        overflow: auto;
      }
      h3 {
        margin: 0;
        display: flex;
        gap: 8px;
        align-items: center;
        font-size: 16px;
        --icon-size: 20px;
      }
      h3 sn-icon {
        color: var(--accent-text);
      }
      .row {
        display: flex;
        align-items: center;
        gap: 12px;
        animation: in 320ms cubic-bezier(0.22, 1, 0.36, 1) both;
      }
      .n {
        min-width: 58px;
        text-align: center;
        padding: 6px 10px;
        border-radius: 12px;
        background: var(--surface-2);
        font-weight: 800;
        font-size: 20px;
        line-height: 1;
        font-variant-numeric: tabular-nums;
      }
      .n small {
        display: block;
        font-size: 10px;
        font-weight: 500;
        color: var(--text-2);
      }
      .n.now {
        background: var(--accent);
        color: var(--on-accent);
      }
      .t {
        display: grid;
        font-weight: 500;
      }
      .t span {
        font-size: 12px;
        color: var(--text-2);
        font-weight: 400;
      }
      @keyframes in {
        from {
          opacity: 0;
          transform: translateY(6px);
        }
      }
    `],Yr([gt({attribute:!1})],Jr.prototype,"ctx",2),Yr([gt({attribute:!1})],Jr.prototype,"widget",2),Jr=Yr([pt("sn-w-countdown")],Jr);var Gr=Object.defineProperty,Qr=Object.getOwnPropertyDescriptor,to=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?Qr(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&Gr(e,i,n),n};let eo=class extends ct{render(){const{ctx:t}=this,e=this.widget.config,i=e.entity?t.hass.states[e.entity]:void 0,s=Number(e.min??0),a=Number(e.max??100),n=Number(i?.state),r=Number.isNaN(n)?0:Math.min(1,Math.max(0,(n-s)/(a-s||1))),o=Number(e.low??20)/100,l=r<=o?"var(--alert)":r<=2*o?"var(--accent)":"var(--success)",c=e.entity?Kt(t.hass,t.config,e.entity):t.t("widget_gauge"),d=/gas|غاز|lpg|propane/i.test(`${e.entity} ${c}`)?"gas":/water|tank|مي|ماء|خزان|מים/i.test(`${e.entity} ${c}`)?"pump":"gauge",p=2*Math.PI*42*.75,h=i?.attributes.unit_of_measurement??"";return Z`<div class="card glass">
      <div class="dial">
        <svg viewBox="0 0 100 100" aria-hidden="true">
          ${F`<circle class="track" cx="50" cy="50" r="42" stroke-dasharray="${p} 999" transform="rotate(135 50 50)"></circle>
          <circle class="val" cx="50" cy="50" r="42" stroke=${l} stroke-dasharray="${p} 999" stroke-dashoffset=${p*(1-r)} transform="rotate(135 50 50)"></circle>`}
        </svg>
        <div class="mid">
          <sn-icon .icon=${d} style="color:${l}"></sn-icon>
          <span class="n"><sn-num .value=${Number.isNaN(n)?"–":`${ae(n,t.lang,0)}${"%"===h?"%":""}`}></sn-num></span>
          ${r<=o&&!Number.isNaN(n)?Z`<span class="low">${t.t("gauge_low")}</span>`:""}
        </div>
      </div>
      <span class="name">${c}</span>
      ${e.supplier&&r<=o&&!Number.isNaN(n)&&t.allows("refill")?Z`<a
            class="btn primary pressable"
            style="min-height:34px;font-size:13px;text-decoration:none"
            target="_blank"
            rel="noopener"
            href=${`https://wa.me/${String(e.supplier).replace(/\D/g,"")}?text=${encodeURIComponent(t.t("refill_message",{what:c,home:t.config.settings.home_name||t.hass.config?.location_name||""}))}`}
            >${t.t("refill_order")}</a
          >`:""}
    </div>`}};eo.styles=[si,o`
      :host {
        display: block;
        height: 100%;
      }
      .card {
        height: 100%;
        border-radius: var(--r-lg);
        padding: 12px;
        display: grid;
        grid-template-rows: 1fr auto auto;
        justify-items: center;
        gap: 4px;
        overflow: hidden;
      }
      .dial {
        position: relative;
        width: 100%;
        height: 100%;
        min-height: 0;
        display: grid;
        place-items: center;
      }
      svg {
        width: 100%;
        height: 100%;
        position: absolute;
        inset: 0;
      }
      .track {
        fill: none;
        stroke: var(--surface-2);
        stroke-width: 10;
        stroke-linecap: round;
      }
      .val {
        fill: none;
        stroke-width: 10;
        stroke-linecap: round;
        transition: stroke-dashoffset 700ms cubic-bezier(0.22, 1, 0.36, 1), stroke 400ms;
      }
      .mid {
        position: relative;
        display: grid;
        justify-items: center;
        gap: 2px;
        --icon-size: 22px;
      }
      .mid .n {
        font-size: 26px;
        font-weight: 700;
      }
      .mid .low {
        font-size: 11px;
        color: var(--alert-text);
        font-weight: 700;
      }
      .name {
        font-size: 14px;
        font-weight: 500;
        text-align: center;
      }
    `],to([gt({attribute:!1})],eo.prototype,"ctx",2),to([gt({attribute:!1})],eo.prototype,"widget",2),eo=to([pt("sn-w-gauge")],eo);var io=Object.defineProperty,so=Object.getOwnPropertyDescriptor,ao=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?so(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&io(e,i,n),n};let no=class extends ct{constructor(){super(...arguments),this.holding=!1,this.bust=Date.now()}connectedCallback(){super.connectedCallback(),this.timer=window.setInterval((()=>this.bust=Date.now()),5e3)}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this.timer),window.clearTimeout(this.hold)}start(t,e){this.ctx.editing||(t.currentTarget.setPointerCapture(t.pointerId),this.holding=!0,this.hold=window.setTimeout((()=>{this.holding=!1,navigator.vibrate?.(20),this.ctx.hass.callService("cover",e?"open_cover":"close_cover",{entity_id:this.widget.config.entity}).catch((()=>this.ctx.toast(this.ctx.t("error"))))}),1e3))}stop(){window.clearTimeout(this.hold),this.holding=!1}render(){const{ctx:t}=this,e=this.widget.config,i=e.entity?t.hass.states[e.entity]:void 0,s=e.camera?Wn(t.hass,e.camera,this.bust):void 0,a="open"===i?.state||"opening"===i?.state;return Z`<div class="card glass">
      <div class="cam" style=${s?`background-image:url('${s}')`:""} @click=${()=>e.camera&&t.openEntity(e.camera)}>
        ${e.camera?Z`<span>${Kt(t.hass,t.config,e.camera)}</span>`:q}
      </div>
      <div class="bar">
        <sn-icon icon=${a?"gate-open":"gate"}></sn-icon>
        <span class="txt"><b>${i?Kt(t.hass,t.config,i.entity_id):t.t("widget_gate")}</b><span>${re(t.t,i,t.lang)}</span></span>
        ${i?Z`<button
              class="btn ${a?"":"primary"} go ${this.holding?"holding":""}"
              @pointerdown=${t=>this.start(t,!a)}
              @pointerup=${()=>this.stop()}
              @pointercancel=${()=>this.stop()}
              @contextmenu=${t=>t.preventDefault()}
            >
              <span>${t.t(a?"gate_hold_close":"gate_hold")}</span>
            </button>`:q}
      </div>
    </div>`}};no.styles=[si,o`
      :host {
        display: block;
        height: 100%;
      }
      .card {
        height: 100%;
        border-radius: var(--r-lg);
        overflow: hidden;
        display: grid;
        grid-template-rows: 1fr auto;
      }
      .cam {
        background: #0d1114 center / cover no-repeat;
        min-height: 0;
        position: relative;
      }
      .cam span {
        position: absolute;
        top: 10px;
        inset-inline-start: 10px;
        padding: 4px 10px;
        border-radius: 999px;
        background: rgba(0, 0, 0, 0.55);
        color: #fff;
        font-size: 13px;
      }
      .bar {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 14px;
      }
      .txt {
        flex: 1;
        display: grid;
      }
      .txt b {
        font-size: 16px;
      }
      .txt span {
        font-size: 13px;
        color: var(--text-2);
      }
      .go {
        position: relative;
        overflow: hidden;
        min-height: 48px;
        padding: 0 18px;
        touch-action: none;
        user-select: none;
        -webkit-user-select: none;
      }
      .go::before {
        content: "";
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.18);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 200ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .go.holding::before {
        transform: scaleX(1);
        transition: transform 1s linear;
      }
      .go > * {
        position: relative;
      }
    `],ao([gt({attribute:!1})],no.prototype,"ctx",2),ao([gt({attribute:!1})],no.prototype,"widget",2),ao([mt()],no.prototype,"holding",2),ao([mt()],no.prototype,"bust",2),no=ao([pt("sn-w-gate")],no);var ro=Object.defineProperty,oo=Object.getOwnPropertyDescriptor,lo=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?oo(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&ro(e,i,n),n};const co={person:["person_l","person"],car:["car_l","car"],dog:["dog_l","dog"],cat:["cat_l","cat"],package:["package_l","package"]};let po=class extends ct{constructor(){super(...arguments),this.missing=!1}get instance(){return this.widget.config.instance||"frigate"}connectedCallback(){super.connectedCallback(),this.load(),this.timer=window.setInterval((()=>this.load()),3e4)}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this.timer)}async load(){try{const t=await this.ctx.hass.callWS({type:"frigate/events/get",instance_id:this.instance,cameras:this.widget.config.cameras?.length?this.widget.config.cameras:void 0,limit:20,has_snapshot:!0});this.events="string"==typeof t?JSON.parse(t):t,this.missing=!1}catch{this.missing=!0}}img(t,e){return this.ctx.hass.hassUrl(`/api/frigate/${this.instance}/notifications/${t}/${e}`)}who(t){const e=t.sub_label;if(e)return Array.isArray(e)?e[0]:e}open(t){const e=Dt[this.ctx.lang];this.ctx.showSheet({title:`${this.who(t)??this.ctx.t(co[t.label]?.[0]??"person_l")} · ${new Date(1e3*t.start_time).toLocaleString(e,{weekday:"short",hour:"2-digit",minute:"2-digit"})}`,render:()=>t.has_clip?Z`<video src=${this.img(t.id,"clip.mp4")} controls autoplay muted playsinline style="width:100%;border-radius:var(--r-md)"></video>`:Z`<img src=${this.img(t.id,"snapshot.jpg")} alt="" style="width:100%;border-radius:var(--r-md)" />`})}render(){const{ctx:t}=this,{t:e}=t;return Z`<div class="card glass">
      <h3><sn-icon icon="cctv"></sn-icon>${e("widget_frigate")}</h3>
      ${t.allows("ai_cameras")&&!this.missing?Z`<sn-ai-ask-button .ctx=${t} label=${e("ai_cam_btn")} .run=${()=>async function(t,e="frigate"){const i=new Date;i.setHours(0,0,0,0);let s=[];try{const a=await t.hass.callWS({type:"frigate/events/get",instance_id:e,after:Math.floor(i.getTime()/1e3),limit:120});s="string"==typeof a?JSON.parse(a):a}catch{return}return s.length?qi(t,"cameras",{facts:s.sort(((t,e)=>t.start_time-e.start_time)).map((t=>{const e=Array.isArray(t.sub_label)?t.sub_label[0]:t.sub_label;return`${new Date(1e3*t.start_time).toTimeString().slice(0,5)} ${t.camera}: ${t.label}${e?` (${e})`:""}${t.zones?.length?` in ${t.zones.join("/")}`:""}`}))}):t.t("ai_cam_quiet")}(t,this.instance)}></sn-ai-ask-button>`:""}
      ${this.missing?Z`<span class="muted">${e("frigate_missing")}</span>`:Z`<div class="strip" data-no-swipe>
            ${(this.events??[]).map(((t,i)=>{const[s,a]=co[t.label]??["person_l","eye"],n=this.who(t);return Z`<button class="ev pressable" style="background-image:url('${this.img(t.id,"thumbnail.jpg")}');animation-delay:${40*Math.min(i,8)}ms" @click=${()=>this.open(t)}>
                <span class="tag ${n?"who":""}"><sn-icon .icon=${a}></sn-icon>${n??e(s)}</span>
                <span class="when">${le(e,new Date(1e3*t.start_time).toISOString())}</span>
              </button>`}))}
            ${this.events&&!this.events.length?Z`<span class="muted">${e("no_visitors")}</span>`:q}
          </div>`}
    </div>`}};po.styles=[si,o`
      :host {
        display: block;
        height: 100%;
      }
      .card {
        height: 100%;
        border-radius: var(--r-lg);
        padding: 14px;
        display: grid;
        grid-template-rows: auto 1fr;
        gap: 10px;
        overflow: hidden;
      }
      h3 {
        margin: 0;
        display: flex;
        gap: 8px;
        align-items: center;
        font-size: 16px;
        --icon-size: 20px;
      }
      h3 sn-icon {
        color: var(--accent-text);
      }
      .strip {
        display: flex;
        gap: 10px;
        overflow-x: auto;
        scrollbar-width: none;
        min-height: 0;
      }
      .ev {
        position: relative;
        flex: none;
        height: 100%;
        aspect-ratio: 1;
        border-radius: 14px;
        overflow: hidden;
        background: #0d1114 center / cover no-repeat;
        color: #fff;
        animation: in 360ms cubic-bezier(0.22, 1, 0.36, 1) both;
      }
      .ev .tag {
        position: absolute;
        top: 8px;
        inset-inline-start: 8px;
        display: inline-flex;
        gap: 4px;
        align-items: center;
        padding: 3px 9px;
        border-radius: 999px;
        background: rgba(0, 0, 0, 0.6);
        font-size: 12px;
        font-weight: 700;
        --icon-size: 14px;
      }
      .ev .who {
        background: var(--accent);
        color: var(--on-accent);
      }
      .ev .when {
        position: absolute;
        bottom: 8px;
        inset-inline-start: 8px;
        padding: 3px 9px;
        border-radius: 999px;
        background: rgba(0, 0, 0, 0.6);
        font-size: 12px;
      }
      .muted {
        font-size: 14px;
      }
      @keyframes in {
        from {
          opacity: 0;
          transform: scale(0.94);
        }
      }
    `],lo([gt({attribute:!1})],po.prototype,"ctx",2),lo([gt({attribute:!1})],po.prototype,"widget",2),lo([mt()],po.prototype,"events",2),lo([mt()],po.prototype,"missing",2),po=lo([pt("sn-w-frigate")],po);var ho=Object.defineProperty,uo=Object.getOwnPropertyDescriptor,go=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?uo(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&ho(e,i,n),n};let mo=class extends ct{constructor(){super(...arguments),this.items=[]}connectedCallback(){super.connectedCallback(),this.load(),this.timer=window.setInterval((()=>this.load()),3e5)}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this.timer)}async load(){try{this.items=(await this.ctx.hass.callWS({type:"smartnest/automations/get"})).items}catch{this.items=[]}}hourOf(t){const e=t.trigger;if("time"===e.kind){const[t,i]=e.at.split(":").map(Number);return t+i/60}if("sun"===e.kind){const t=this.ctx.hass.states["sun.sun"]?.attributes,i="sunrise"===e.event?t?.next_rising:t?.next_setting,s=i?new Date(i):void 0;return((s?s.getHours()+s.getMinutes()/60:"sunrise"===e.event?6:18)+e.offset/60+24)%24}}render(){const{ctx:t}=this,e=Dt[t.lang],i=new Date,s=ua[i.getDay()],a=(i.getHours()+i.getMinutes()/60)/24*100,n=this.items.map((t=>({m:t,h:this.hourOf(t)}))).filter((t=>void 0!==t.h));return Z`<div class="card glass">
      <h3><sn-icon icon="schedule"></sn-icon>${t.t("widget_schedule")}</h3>
      <div class="grid">
        ${ua.map(((i,r)=>Z`<span class="day ${i===s?"today":""}">${ma(i,e)}</span>
            <div class="lane">
              ${i===s?Z`<span class="now" style="left:${a}%"></span>`:""}
              ${n.filter((({m:t})=>!t.days.length||t.days.includes(i))).map((({m:e,h:i})=>{const s="off"!==xa(t.hass,e.id)?.state;return Z`<button
                    class="dot ${s?"":"off"}"
                    style="left:${i/24*100}%;animation-delay:${30*r}ms"
                    title=${`${e.name}`}
                    aria-label=${e.name}
                    @click=${()=>t.isAdmin&&wa(t,e,(()=>this.load()))}
                  >
                    <sn-icon icon=${"sun"===e.trigger.kind?"sun":"clock-outline"}></sn-icon>
                  </button>`}))}
            </div>`))}
      </div>
      <div class="hours"><span>00</span><span>06</span><span>12</span><span>18</span><span>24</span></div>
    </div>`}};mo.styles=[si,o`
      :host {
        display: block;
        height: 100%;
      }
      .card {
        height: 100%;
        border-radius: var(--r-lg);
        padding: 14px 16px;
        display: grid;
        grid-template-rows: auto 1fr auto;
        gap: 8px;
        overflow: hidden;
      }
      h3 {
        margin: 0;
        display: flex;
        gap: 8px;
        align-items: center;
        font-size: 16px;
        --icon-size: 20px;
      }
      h3 sn-icon {
        color: var(--accent-text);
      }
      .grid {
        display: grid;
        grid-template-columns: 52px 1fr;
        grid-auto-rows: 1fr;
        gap: 4px 8px;
        min-height: 0;
        direction: ltr;
      }
      .day {
        font-size: 12px;
        color: var(--text-2);
        align-self: center;
        text-align: end;
      }
      .day.today {
        color: var(--accent-text);
        font-weight: 700;
      }
      .lane {
        position: relative;
        border-radius: 8px;
        background: var(--surface-2);
      }
      .dot {
        position: absolute;
        top: 50%;
        width: 22px;
        height: 22px;
        margin: -11px 0 0 -11px;
        border-radius: 999px;
        background: var(--accent);
        color: var(--on-accent);
        display: grid;
        place-items: center;
        --icon-size: 13px;
        box-shadow: var(--shadow);
        animation: pop 300ms cubic-bezier(0.22, 1, 0.36, 1) both;
      }
      .dot.off {
        background: var(--surface-solid);
        color: var(--text-2);
      }
      .now {
        position: absolute;
        top: -2px;
        bottom: -2px;
        width: 2px;
        background: var(--alert);
        border-radius: 1px;
      }
      .hours {
        display: flex;
        justify-content: space-between;
        font-size: 11px;
        color: var(--text-2);
        padding-inline-start: 60px;
        direction: ltr;
      }
      @keyframes pop {
        from {
          opacity: 0;
          transform: scale(0.6);
        }
      }
    `],go([gt({attribute:!1})],mo.prototype,"ctx",2),go([gt({attribute:!1})],mo.prototype,"widget",2),go([mt()],mo.prototype,"items",2),mo=go([pt("sn-w-schedule")],mo);var fo=Object.defineProperty,bo=Object.getOwnPropertyDescriptor,_o=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?bo(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&fo(e,i,n),n};const yo=524288,vo="script.smartnest_cinema";let xo=class extends ct{get entity(){const t=this.ctx.hass.states;return this.widget.config.entity??Object.keys(t).find((e=>e.startsWith("media_player.")&&"playing"===t[e].state))??Object.keys(t).find((t=>t.startsWith("media_player.")))}call(t,e={}){navigator.vibrate?.(5),this.ctx.hass.callService("media_player",t,{entity_id:this.entity,...e}).catch((()=>this.ctx.toast(this.ctx.t("error"))))}cinema(){const{ctx:t}=this;t.hass.states[vo]&&t.hass.callService("script","turn_on",{entity_id:vo}).catch((()=>{})),t.cinematic("cinema")}render(){const{ctx:t}=this,{t:e,hass:i}=t,s=this.entity,a=s?i.states[s]:void 0;if(!a)return Z`<div class="card glass"><span class="muted">${e("nothing_playing")}</span></div>`;const n=a.attributes,r=n.supported_features??0,o="playing"===a.state,l=n.entity_picture?i.hassUrl(n.entity_picture):void 0,c=Object.values(i.states).filter((t=>t.entity_id!==s&&t.entity_id.startsWith("media_player.")&&!!((t.attributes.supported_features??0)&yo)));return Z`<div class="wrap"><div class="card glass">
      ${l?Z`<div class="bg" style="background-image:url('${l}')"></div>`:q}
      <div class="art" style=${l?`background-image:url('${l}')`:""}>${l?"":Z`<sn-icon icon="speaker"></sn-icon>`}</div>
      <div class="info">
        <span class="title">${n.media_title??(o?Kt(i,t.config,s):e("nothing_playing"))}</span>
        <span class="artist">${n.media_artist??Kt(i,t.config,s)}</span>
        <div class="ctl">
          ${16&r?Z`<button class="icon-btn pressable" aria-label="previous" @click=${()=>this.call("media_previous_track")}><sn-icon icon="prev"></sn-icon></button>`:q}
          ${16385&r?Z`<button class="icon-btn primary pressable big" aria-label=${e(o?"pause":"start")} @click=${()=>this.call("media_play_pause")}>
                <sn-icon icon=${o?"pause":"play"}></sn-icon>
              </button>`:q}
          ${32&r?Z`<button class="icon-btn pressable" aria-label="next" @click=${()=>this.call("media_next_track")}><sn-icon icon="next"></sn-icon></button>`:q}
          ${8&r?Z`<button class="icon-btn pressable" aria-label="mute" @click=${()=>this.call("volume_mute",{is_volume_muted:!n.is_volume_muted})}>
                <sn-icon icon=${n.is_volume_muted?"vol-mute":"volume"}></sn-icon>
              </button>`:q}
        </div>
        ${4&r?Z`<input
              type="range"
              min="0"
              max="100"
              aria-label="volume"
              .value=${String(Math.round(100*(n.volume_level??0)))}
              @change=${t=>this.call("volume_set",{volume_level:Number(t.target.value)/100})}
            />`:q}
        <div class="row">
          ${r&yo&&c.length?Z`<button class="btn pressable" @click=${()=>this.call("join",{group_members:c.map((t=>t.entity_id))})}>
                <sn-icon icon="speaker-multi" style="--icon-size:18px"></sn-icon>${e("group_speakers")}
              </button>`:q}
          ${t.allows("cinema")?Z`<button class="btn pressable" @click=${()=>this.cinema()}><sn-icon icon="movie" style="--icon-size:18px"></sn-icon>${e("cinema_mode")}</button>`:q}
        </div>
      </div>
    </div></div>`}};xo.styles=[si,o`
      :host {
        display: block;
        height: 100%;
      }
      .card {
        position: relative;
        height: 100%;
        border-radius: var(--r-lg);
        overflow: hidden;
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 16px;
        align-items: center;
        padding: 16px;
      }
      .bg {
        position: absolute;
        inset: -20px;
        background: center / cover no-repeat;
        filter: blur(30px) saturate(140%);
        opacity: 0.35;
        transition: background-image 600ms;
      }
      .art {
        position: relative;
        width: min(140px, 30cqi);
        aspect-ratio: 1;
        border-radius: 14px;
        background: var(--surface-2) center / cover no-repeat;
        box-shadow: var(--shadow-lift);
        display: grid;
        place-items: center;
        color: var(--text-2);
        --icon-size: 40px;
      }
      .info {
        position: relative;
        display: grid;
        gap: 8px;
        min-width: 0;
      }
      .title {
        font-weight: 700;
        font-size: 17px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .artist {
        color: var(--text-2);
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .ctl {
        display: flex;
        align-items: center;
        gap: 6px;
        direction: ltr;
      }
      .ctl .big {
        width: 52px;
        height: 52px;
        --icon-size: 28px;
      }
      input[type="range"] {
        width: 100%;
        accent-color: var(--accent);
        min-height: 28px;
        padding: 0;
        background: none;
      }
      .row {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
      }
      .row .btn {
        min-height: 36px;
        font-size: 13px;
        padding: 0 12px;
      }
      .wrap {
        container-type: inline-size;
        height: 100%;
      }
    `],_o([gt({attribute:!1})],xo.prototype,"ctx",2),_o([gt({attribute:!1})],xo.prototype,"widget",2),xo=_o([pt("sn-w-media")],xo);var wo=Object.defineProperty,$o=Object.getOwnPropertyDescriptor,ko=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?$o(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&wo(e,i,n),n};const Co={androidtv_remote:{up:"DPAD_UP",down:"DPAD_DOWN",left:"DPAD_LEFT",right:"DPAD_RIGHT",ok:"DPAD_CENTER",back:"BACK",home:"HOME",vol_up:"VOLUME_UP",vol_down:"VOLUME_DOWN",mute:"MUTE"},samsungtv:{up:"KEY_UP",down:"KEY_DOWN",left:"KEY_LEFT",right:"KEY_RIGHT",ok:"KEY_ENTER",back:"KEY_RETURN",home:"KEY_HOME",vol_up:"KEY_VOLUP",vol_down:"KEY_VOLDOWN",mute:"KEY_MUTE"},webostv:{up:"UP",down:"DOWN",left:"LEFT",right:"RIGHT",ok:"ENTER",back:"BACK",home:"HOME",vol_up:"VOLUMEUP",vol_down:"VOLUMEDOWN",mute:"MUTE"},apple_tv:{up:"up",down:"down",left:"left",right:"right",ok:"select",back:"menu",home:"home",vol_up:"volume_up",vol_down:"volume_down",mute:"volume_down"},roku:{up:"up",down:"down",left:"left",right:"right",ok:"select",back:"back",home:"home",vol_up:"volume_up",vol_down:"volume_down",mute:"volume_mute"}};let Mo=class extends ct{send(t){const{hass:e}=this.ctx,i=this.widget.config.entity,s=e.entities?.[i]?.platform??"androidtv_remote",a=Co[s]??Co.androidtv_remote;navigator.vibrate?.(4);("webostv"===s?e.callService("webostv","button",{entity_id:i,button:a[t]}):e.callService("remote","send_command",{entity_id:i,command:a[t]})).catch((()=>this.ctx.toast(this.ctx.t("error"))))}render(){const{ctx:t}=this,e=this.widget.config.entity,i=e?t.hass.states[e]:void 0;if(!i)return Z`<div class="card glass"><span class="muted">${t.t("choose_entity")}</span></div>`;const s=(t,e,i)=>Z`<button class=${`pressable ${e}`} aria-label=${t} @click=${()=>this.send(t)}><sn-icon .icon=${i}></sn-icon></button>`;return Z`<div class="card glass">
      <div class="top">
        <span>${Kt(t.hass,t.config,i.entity_id)}</span>
        <button
          class="icon-btn pressable ${"on"===i.state||"playing"===i.state?"primary":""}"
          aria-label=${t.t("turn_on")}
          @click=${()=>t.hass.callService(i.entity_id.split(".")[0],"toggle",{entity_id:i.entity_id}).catch((()=>t.toast(t.t("error"))))}
        >
          <sn-icon icon="power" style="--icon-size:20px"></sn-icon>
        </button>
      </div>
      <div class="pad">
        ${s("up","u","chevron-up")} ${s("down","d","chevron-down")} ${s("left","l","chevron-left")} ${s("right","r","chevron-right")}
        <button class="pressable ok" aria-label="ok" @click=${()=>this.send("ok")}>OK</button>
      </div>
      <div class="row">
        <button class="icon-btn pressable" aria-label="back" @click=${()=>this.send("back")}><sn-icon icon="return"></sn-icon></button>
        <button class="icon-btn pressable" aria-label="home" @click=${()=>this.send("home")}><sn-icon icon="home"></sn-icon></button>
      </div>
      <div class="row">
        <button class="icon-btn pressable" aria-label="volume down" @click=${()=>this.send("vol_down")}><sn-icon icon="vol-down"></sn-icon></button>
        <button class="icon-btn pressable" aria-label="mute" @click=${()=>this.send("mute")}><sn-icon icon="vol-mute"></sn-icon></button>
        <button class="icon-btn pressable" aria-label="volume up" @click=${()=>this.send("vol_up")}><sn-icon icon="vol-up"></sn-icon></button>
      </div>
    </div>`}};Mo.styles=[si,o`
      :host {
        display: block;
        height: 100%;
      }
      .card {
        height: 100%;
        border-radius: var(--r-lg);
        padding: 16px;
        display: grid;
        grid-template-rows: auto 1fr auto auto;
        justify-items: center;
        gap: 14px;
        direction: ltr;
      }
      .top {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: 700;
      }
      .pad {
        position: relative;
        width: min(220px, 100%);
        aspect-ratio: 1;
        border-radius: 50%;
        background: var(--surface-2);
        box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.08);
        align-self: center;
      }
      .pad button {
        position: absolute;
        display: grid;
        place-items: center;
        color: var(--text-2);
        --icon-size: 30px;
        width: 33%;
        height: 33%;
        border-radius: 50%;
        transition: background-color 120ms, transform 120ms;
      }
      .pad button:active {
        background: color-mix(in srgb, var(--accent) 18%, transparent);
        transform: scale(0.94);
      }
      .pad .u {
        top: 2%;
        left: 33.5%;
      }
      .pad .d {
        bottom: 2%;
        left: 33.5%;
      }
      .pad .l {
        left: 2%;
        top: 33.5%;
      }
      .pad .r {
        right: 2%;
        top: 33.5%;
      }
      .pad .ok {
        left: 31%;
        top: 31%;
        width: 38%;
        height: 38%;
        background: var(--surface-solid);
        box-shadow: var(--shadow);
        color: var(--text);
        font-weight: 700;
        font-size: 15px;
      }
      .row {
        display: flex;
        gap: 10px;
      }
    `],ko([gt({attribute:!1})],Mo.prototype,"ctx",2),ko([gt({attribute:!1})],Mo.prototype,"widget",2),Mo=ko([pt("sn-w-remote")],Mo);var Ao=Object.defineProperty,Ho=Object.getOwnPropertyDescriptor,Lo=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?Ho(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&Ao(e,i,n),n};const Vo={"In Transit":"🚚",Delivered:"✅",Undelivered:"⚠️",Expired:"⌛","Ready to be picked up":"📬",Alert:"⚠️","Not Found":"❔"};let So=class extends ct{constructor(){super(...arguments),this.missing=!1}connectedCallback(){super.connectedCallback(),this.load(),this.timer=window.setInterval((()=>this.load()),18e5)}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this.timer)}async load(){const{hass:t}=this.ctx;try{const e=await t.callWS({type:"smartnest/parcels"});this.pkgs=e.packages,this.missing=!1}catch{this.missing=!0}}render(){const{t:t}=this.ctx,e=(this.pkgs??[]).filter((t=>"Delivered"!==t.status||t.timestamp&&Date.now()-Date.parse(t.timestamp)<2592e5));return Z`<div class="card glass">
      <h3><sn-icon icon="package" style="--icon-size:20px;color:var(--accent-text)"></sn-icon>${t("widget_parcels")}</h3>
      ${this.missing?Z`<span class="muted" style="font-size:14px">${t("parcels_missing")}</span>`:this.pkgs?e.length?e.map((t=>Z`<div class="p">
              <span class="i">${Vo[t.status??""]??"📦"}</span>
              <b>${t.friendly_name||t.tracking_number}</b>
              <span>${[t.info_text,t.location].filter(Boolean).join(" · ")||t.status}</span>
            </div>`)):Z`<span class="muted">${t("parcels_none")}</span>`:Z`<span class="muted">${t("loading")}</span>`}
      ${q}
    </div>`}};So.styles=[si,o`
      :host {
        display: block;
        height: 100%;
      }
      .card {
        height: 100%;
        border-radius: var(--r-lg);
        padding: 16px;
        display: grid;
        gap: 10px;
        align-content: start;
        overflow: auto;
      }
      h3 {
        margin: 0;
        font-size: 16px;
        display: flex;
        gap: 8px;
        align-items: center;
      }
      .p {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 2px 10px;
        padding: 10px 12px;
        border-radius: var(--r-md);
        background: var(--surface-2);
      }
      .p .i {
        grid-row: span 2;
        font-size: 24px;
        align-self: center;
      }
      .p b {
        font-size: 15px;
      }
      .p span {
        font-size: 12px;
        color: var(--text-2);
        unicode-bidi: plaintext;
      }
    `],Lo([gt({attribute:!1})],So.prototype,"ctx",2),Lo([gt({attribute:!1})],So.prototype,"widget",2),Lo([mt()],So.prototype,"pkgs",2),Lo([mt()],So.prototype,"missing",2),So=Lo([pt("sn-w-parcels")],So);var zo=Object.defineProperty,Do=Object.getOwnPropertyDescriptor,Oo=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?Do(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&zo(e,i,n),n};let jo=class extends ct{render(){const{ctx:t}=this,{t:e,hass:i,config:s,lang:a}=t,n=this.widget.config.entities??[],r=(t=>Object.values(t.hass.states).filter((e=>{if(!e.entity_id.startsWith("sensor."))return!1;const i=t.hass.entities?.[e.entity_id]?.platform??"";return["waze_travel_time","google_travel_time","here_travel_time"].includes(i)||/waze|google maps/i.test(String(e.attributes.attribution??""))})))(t).filter((t=>!n.length||n.includes(t.entity_id)));return Z`<div class="card glass">
      <h3><sn-icon icon="car" style="--icon-size:20px;color:var(--accent-text)"></sn-icon>${e("widget_commute")}</h3>
      ${r.length?r.map((t=>{const n=Number(t.state),r=Number(t.attributes.duration??t.attributes.duration_in_traffic??NaN),o=Number.isNaN(r)||!r?1:n/r;return Z`<div class="route">
              <span class="bar" style="background:${o>1.4?"var(--alert)":o>1.15?"#e9971d":"var(--success)"}"></span>
              <span class="nm"><b>${Kt(i,s,t.entity_id)}</b><span>${t.attributes.route??""}</span></span>
              <span class="min"><sn-num .value=${ae(n,a,0)}></sn-num> <small>${e("minutes")}</small></span>
            </div>`})):Z`<span class="muted" style="font-size:14px">${e("commute_missing")}</span>`}
      ${q}
    </div>`}};jo.styles=[si,o`
      :host {
        display: block;
        height: 100%;
      }
      .card {
        height: 100%;
        border-radius: var(--r-lg);
        padding: 16px;
        display: grid;
        gap: 10px;
        align-content: start;
        overflow: auto;
      }
      h3 {
        margin: 0;
        font-size: 16px;
        display: flex;
        gap: 8px;
        align-items: center;
      }
      .route {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 12px;
        border-radius: var(--r-md);
        background: var(--surface-2);
      }
      .route .nm {
        flex: 1;
        min-width: 0;
      }
      .route .nm b {
        display: block;
      }
      .route .nm span {
        font-size: 12px;
        color: var(--text-2);
      }
      .min {
        font-size: 26px;
        font-weight: 700;
        direction: ltr;
      }
      .min small {
        font-size: 13px;
        font-weight: 500;
        color: var(--text-2);
      }
      .bar {
        width: 6px;
        align-self: stretch;
        border-radius: 3px;
      }
    `],Oo([gt({attribute:!1})],jo.prototype,"ctx",2),Oo([gt({attribute:!1})],jo.prototype,"widget",2),jo=Oo([pt("sn-w-commute")],jo);var To=Object.defineProperty,Po=Object.getOwnPropertyDescriptor,No=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?Po(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&To(e,i,n),n};let Io=class extends ct{render(){const t=this.ctx.hass.config??{},e=t.latitude??31.9,i=t.longitude??35.2,s=this.widget.config.zoom??7,a=this.ctx.dark?1:0,n=`https://www.rainviewer.com/map.html?loc=${e.toFixed(3)},${i.toFixed(3)},${s}&oFa=0&oC=1&oU=0&oCS=1&oF=0&oAP=1&c=3&o=83&lm=${a}&layer=radar&sm=1&sn=1`;return Z`<div class="card glass">
      <span class="tag"><sn-icon icon="weather-pouring" style="--icon-size:18px"></sn-icon>${this.ctx.t("widget_radar")}</span>
      <iframe src=${n} title=${this.ctx.t("widget_radar")} loading="lazy" referrerpolicy="no-referrer" sandbox="allow-scripts allow-same-origin"></iframe>
    </div>`}};Io.styles=[si,o`
      :host {
        display: block;
        height: 100%;
      }
      .card {
        height: 100%;
        border-radius: var(--r-lg);
        overflow: hidden;
        position: relative;
      }
      iframe {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        border: 0;
      }
      .tag {
        position: absolute;
        top: 10px;
        inset-inline-start: 10px;
        z-index: 1;
        padding: 6px 12px;
        border-radius: 999px;
        background: var(--surface);
        -webkit-backdrop-filter: blur(12px);
        backdrop-filter: blur(12px);
        font-weight: 600;
        font-size: 14px;
        display: flex;
        gap: 6px;
        align-items: center;
        pointer-events: none;
      }
    `],No([gt({attribute:!1})],Io.prototype,"ctx",2),No([gt({attribute:!1})],Io.prototype,"widget",2),Io=No([pt("sn-w-radar")],Io);var Wo=Object.defineProperty,Eo=Object.getOwnPropertyDescriptor,Ro=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?Eo(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&Wo(e,i,n),n};const Bo=[["فَإِنَّ مَعَ الْعُسْرِ يُسْرًا","الشرح ٥"],["وَقُل رَّبِّ زِدْنِي عِلْمًا","طه ١١٤"],["أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ","الرعد ٢٨"],["وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ","الطلاق ٣"],["إِنَّ اللَّهَ مَعَ الصَّابِرِينَ","البقرة ١٥٣"],["فَاذْكُرُونِي أَذْكُرْكُمْ","البقرة ١٥٢"],["وَاللَّهُ يُحِبُّ الْمُحْسِنِينَ","آل عمران ١٣٤"],["لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا","البقرة ٢٨٦"],["وَقُولُوا لِلنَّاسِ حُسْنًا","البقرة ٨٣"],["إِنَّ رَحْمَتَ اللَّهِ قَرِيبٌ مِّنَ الْمُحْسِنِينَ","الأعراف ٥٦"],["وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ","الحديد ٤"],["لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ","إبراهيم ٧"],["وَاصْبِرْ فَإِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ","هود ١١٥"],["رَبِّ اشْرَحْ لِي صَدْرِي","طه ٢٥"],["وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ","هود ٨٨"],["ادْعُونِي أَسْتَجِبْ لَكُمْ","غافر ٦٠"],["وَرَحْمَتِي وَسِعَتْ كُلَّ شَيْءٍ","الأعراف ١٥٦"],["وَلَا تَيْأَسُوا مِن رَّوْحِ اللَّهِ","يوسف ٨٧"],["وَاللَّهُ خَيْرُ الرَّازِقِينَ","الجمعة ١١"],["رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ","البقرة ٢٠١"],["وَبِالْوَالِدَيْنِ إِحْسَانًا","الإسراء ٢٣"],["إِنَّ اللَّهَ لَا يُغَيِّرُ مَا بِقَوْمٍ حَتَّىٰ يُغَيِّرُوا مَا بِأَنفُسِهِمْ","الرعد ١١"],["وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ","المائدة ٢"],["وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ","البقرة ١٨٦"],["حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ","آل عمران ١٧٣"],["وَعَسَىٰ أَن تَكْرَهُوا شَيْئًا وَهُوَ خَيْرٌ لَّكُمْ","البقرة ٢١٦"],["إِنَّ الْحَسَنَاتِ يُذْهِبْنَ السَّيِّئَاتِ","هود ١١٤"],["وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ","الضحى ٥"],["وَأَحْسِن كَمَا أَحْسَنَ اللَّهُ إِلَيْكَ","القصص ٧٧"],["إِنَّ اللَّهَ لَطِيفٌ بِعِبَادِهِ","الشورى ١٩"]];let Zo=class extends ct{render(){const{lang:t}=this.ctx,e=new Date,i=Math.floor((e.getTime()-6e4*e.getTimezoneOffset())/864e5),[s,a]=Bo[i%Bo.length],n=e.toLocaleDateString(("en"===t?"en":"he"===t?"he":"ar-SA")+"-u-ca-islamic-umalqura-nu-latn",{day:"numeric",month:"long",year:"numeric"}),r=e.toLocaleDateString("ar"===t?"ar-u-nu-latn":t,{weekday:"long",day:"numeric",month:"long"});return Z`<div class="card glass">
      <div><div class="hijri">${n}</div><div class="greg">${r}</div></div>
      <div class="verse">﴿${s}﴾</div>
      <div class="ref">${a}</div>
    </div>`}};Zo.styles=[si,o`
      :host {
        display: block;
        height: 100%;
      }
      .card {
        height: 100%;
        border-radius: var(--r-lg);
        padding: 18px;
        display: grid;
        grid-template-rows: auto 1fr auto;
        gap: 10px;
        text-align: center;
        overflow: hidden;
        position: relative;
      }
      .card::before {
        content: "";
        position: absolute;
        inset: 0;
        background: radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 65%);
        pointer-events: none;
      }
      .hijri {
        font-size: 15px;
        font-weight: 600;
        color: var(--accent-text);
      }
      .greg {
        font-size: 12px;
        color: var(--text-2);
      }
      .verse {
        align-self: center;
        direction: rtl;
        font-size: clamp(20px, 4cqi, 30px);
        line-height: 1.9;
        font-weight: 500;
      }
      .ref {
        font-size: 13px;
        color: var(--text-2);
        direction: rtl;
      }
      .card {
        container-type: inline-size;
      }
    `],Ro([gt({attribute:!1})],Zo.prototype,"ctx",2),Ro([gt({attribute:!1})],Zo.prototype,"widget",2),Zo=Ro([pt("sn-w-verse")],Zo);var Fo=Object.defineProperty,Uo=Object.getOwnPropertyDescriptor,qo=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?Uo(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&Fo(e,i,n),n};const Yo=["#fff4b8","#ffd6e0","#d4f2e2","#d8e8ff","#eadcff"],Xo=["#1d1d1f","#e5484d","#3a86ff","#2bb673"];let Ko=class extends ct{constructor(){super(...arguments),this.board={notes:[]},this.mode="",this.color=Yo[0],this.ink=Xo[0],this.strokes=[]}connectedCallback(){super.connectedCallback(),fi(this.ctx.hass,"board").then((t=>this.board={notes:t?.notes??[]})),this.unwatch=_i(this.ctx.hass,"board",(t=>this.board={notes:t?.notes??[]}))}disconnectedCallback(){super.disconnectedCallback(),this.unwatch?.then((t=>t())).catch((()=>{}))}save(t){this.board={notes:t.slice(0,24)},bi(this.ctx.hass,"board",this.board).catch((()=>this.ctx.toast(this.ctx.t("error"))))}add(t){this.save([{...t,id:Ae(),by:this.ctx.hass.user?.name??"",at:(new Date).toISOString()},...this.board.notes]),this.mode="",this.strokes=[]}pt(t){const e=t.currentTarget.getBoundingClientRect();return[Math.round((t.clientX-e.left)/e.width*1e3),Math.round((t.clientY-e.top)/e.height*1e3)]}down(t){t.currentTarget.setPointerCapture(t.pointerId),this.current=this.pt(t),this.strokes=[...this.strokes,this.current]}move(t){if(!this.current)return;const[e,i]=this.pt(t),s=this.current.length;Math.abs(e-this.current[s-2])+Math.abs(i-this.current[s-1])<10||(this.current.push(e,i),this.strokes=[...this.strokes])}path(t){let e=`M${t[0]} ${t[1]}`;for(let i=2;i<t.length;i+=2)e+=`L${t[i]} ${t[i+1]}`;return 2===t.length?`${e}l0.1 0`:e}drawing(t,e){return F`${t.map((t=>F`<path d=${this.path(t)} fill="none" stroke=${e} stroke-width="14" stroke-linecap="round" stroke-linejoin="round"></path>`))}`}renderEditor(){const{t:t}=this.ctx;return Z`<div class="editor">
      <div class="swatches">
        ${Yo.map((t=>Z`<button class="sw" style="background:${t}" aria-pressed=${this.color===t} @click=${()=>this.color=t}></button>`))}
        ${"draw"===this.mode?Z`<span style="width:12px"></span>${Xo.map((t=>Z`<button class="sw" style="background:${t}" aria-pressed=${this.ink===t} @click=${()=>this.ink=t}></button>`))}`:q}
      </div>
      ${"text"===this.mode?Z`<textarea id="txt" maxlength="200" placeholder=${t("board_placeholder")} style="background:${this.color};color:#1d1d1f"></textarea>`:Z`<svg
            class="pad"
            viewBox="0 0 1000 1000"
            style="background:${this.color}"
            @pointerdown=${t=>this.down(t)}
            @pointermove=${t=>this.move(t)}
            @pointerup=${()=>this.current=void 0}
            @pointercancel=${()=>this.current=void 0}
          >
            ${this.drawing(this.strokes,this.ink)}
          </svg>`}
      <div style="display:flex;gap:8px">
        <button
          class="btn primary pressable"
          @click=${()=>{if("text"===this.mode){const t=this.renderRoot.querySelector("#txt").value.trim();t&&this.add({text:t,color:this.color})}else this.strokes.length&&this.add({paths:this.strokes,color:this.color,ink:this.ink})}}
        >
          ${t("board_stick")}
        </button>
        ${"draw"===this.mode?Z`<button class="btn pressable" @click=${()=>this.strokes=this.strokes.slice(0,-1)}>${t("undo_point")}</button>`:q}
        <button class="btn pressable" @click=${()=>(this.mode="",this.strokes=[])}>${t("cancel")}</button>
      </div>
    </div>`}render(){const{t:t}=this.ctx;return Z`<div class="card glass">
      <div class="head">
        <sn-icon icon="note" style="--icon-size:20px;color:var(--accent-text)"></sn-icon>
        <h3>${t("widget_board")}</h3>
        ${this.mode?q:Z`<button class="btn pressable" style="min-height:36px" @click=${()=>this.mode="text"}>📝 ${t("board_write")}</button>
              <button class="btn pressable" style="min-height:36px" @click=${()=>this.mode="draw"}>✏️ ${t("board_draw")}</button>`}
      </div>
      ${this.mode?this.renderEditor():Z`<div class="notes">
            ${this.board.notes.length?this.board.notes.map((e=>Z`<div class="note" style="background:${e.color}">
                    ${e.paths?Z`<svg viewBox="0 0 1000 1000">${this.drawing(e.paths,e.ink??Xo[0])}</svg>`:e.text}
                    <span class="by">${e.by?`${e.by} · `:""}${le(t,e.at)}</span>
                    <button class="x" aria-label=${t("delete")} @click=${()=>this.save(this.board.notes.filter((t=>t.id!==e.id)))}>×</button>
                  </div>`)):Z`<span class="muted" style="grid-column:1/-1">${t("board_empty")}</span>`}
          </div>`}
    </div>`}};Ko.styles=[si,o`
      :host {
        display: block;
        height: 100%;
      }
      .card {
        height: 100%;
        border-radius: var(--r-lg);
        padding: 14px;
        display: grid;
        gap: 10px;
        grid-template-rows: auto minmax(0, 1fr);
        overflow: hidden;
      }
      .head {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .head h3 {
        flex: 1;
        margin: 0;
        font-size: 16px;
      }
      .notes {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
        gap: 10px;
        overflow: auto;
        align-content: start;
        padding: 4px;
      }
      .note {
        position: relative;
        min-height: 110px;
        padding: 12px 12px 26px;
        border-radius: 6px 6px 18px 6px;
        color: #1d1d1f;
        box-shadow: 0 6px 14px rgba(0, 0, 0, 0.12);
        font-size: 16px;
        line-height: 1.35;
        white-space: pre-wrap;
        word-break: break-word;
        unicode-bidi: plaintext;
        animation: stick 420ms cubic-bezier(0.22, 1, 0.36, 1) both;
      }
      .note:nth-child(odd) {
        transform: rotate(-1.4deg);
      }
      .note:nth-child(even) {
        transform: rotate(1.2deg);
      }
      .note svg {
        width: 100%;
        aspect-ratio: 1;
        display: block;
      }
      .note .by {
        position: absolute;
        inset-inline: 10px;
        bottom: 6px;
        font-size: 11px;
        opacity: 0.6;
      }
      .note .x {
        position: absolute;
        top: 2px;
        inset-inline-end: 2px;
        border: 0;
        background: none;
        font-size: 16px;
        opacity: 0.4;
        cursor: pointer;
        color: inherit;
      }
      .editor {
        display: grid;
        gap: 8px;
      }
      .pad {
        width: 100%;
        max-width: 360px;
        aspect-ratio: 1;
        border-radius: 12px;
        touch-action: none;
        cursor: crosshair;
        justify-self: center;
        box-shadow: inset 0 0 0 1px var(--border);
      }
      .swatches {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
        align-items: center;
      }
      .sw {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 2px solid transparent;
        cursor: pointer;
        padding: 0;
      }
      .sw[aria-pressed="true"] {
        border-color: var(--text);
      }
      textarea {
        min-height: 90px;
      }
      @keyframes stick {
        from {
          opacity: 0;
          transform: scale(0.8) rotate(-6deg);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .note {
          animation: none;
        }
      }
    `],qo([gt({attribute:!1})],Ko.prototype,"ctx",2),qo([gt({attribute:!1})],Ko.prototype,"widget",2),qo([mt()],Ko.prototype,"board",2),qo([mt()],Ko.prototype,"mode",2),qo([mt()],Ko.prototype,"color",2),qo([mt()],Ko.prototype,"ink",2),qo([mt()],Ko.prototype,"strokes",2),Ko=qo([pt("sn-w-board")],Ko);var Jo=Object.defineProperty,Go=Object.getOwnPropertyDescriptor,Qo=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?Go(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&Jo(e,i,n),n};const tl={kids:[]};let el=class extends ct{constructor(){super(...arguments),this.data=tl,this.setup=!1,this.loaded=!1}connectedCallback(){super.connectedCallback(),fi(this.ctx.hass,"internet").then((t=>{this.data={...tl,...t??{}},this.loaded=!0})),this.unwatch=_i(this.ctx.hass,"internet",(t=>this.data={...tl,...t??{}}))}disconnectedCallback(){super.disconnectedCallback(),this.unwatch?.then((t=>t())).catch((()=>{}))}save(t){this.data={kids:t},bi(this.ctx.hass,"internet",this.data).catch((()=>this.ctx.toast(this.ctx.t("error"))))}patch(t,e){this.save(this.data.kids.map((i=>i.id===t?{...i,...e}:i)))}power(t,e,i){this.ctx.hass.callService("homeassistant",e?"turn_on":"turn_off",{entity_id:t.switches}).catch((()=>this.ctx.toast(this.ctx.t("error")))),this.patch(t.id,{paused_until:!e&&i?Date.now()/1e3+60*i:null})}renderSetup(){const{t:t,hass:e,config:i}=this.ctx,s=((t,e)=>t.filter((t=>{if(!t.startsWith("switch."))return!1;const i=e.entities?.[t]?.platform??"";return["unifi","fritz","tplink_omada","tplink_deco","mikrotik","asuswrt","netgear","keenetic_ndms2","ubus"].includes(i)||/internet|access|block|wifi|parental/i.test(t)})))(Object.keys(e.states),e);return Z`${this.data.kids.map((a=>Z`<div class="kid">
          <span class="face">${a.emoji}</span>
          <span class="name"><b>${a.name}</b></span>
          <button class="icon-btn small pressable" aria-label=${t("delete")} @click=${()=>this.save(this.data.kids.filter((t=>t.id!==a.id)))}>
            <sn-icon icon="close" style="--icon-size:16px"></sn-icon>
          </button>
          <div class="row">
            ${s.length?s.map((t=>{const s=a.switches.includes(t);return Z`<button
                    class="btn pressable ${s?"primary":""}"
                    @click=${()=>this.patch(a.id,{switches:s?a.switches.filter((e=>e!==t)):[...a.switches,t]})}
                  >
                    ${Kt(e,i,t)}
                  </button>`})):Z`<span class="muted" style="font-size:13px">${t("net_no_router")}</span>`}
          </div>
        </div>`))}
      <form
        style="display:flex;gap:6px"
        @submit=${t=>{t.preventDefault();const e=t.currentTarget,i=e.elements.namedItem("n").value.trim(),s=e.elements.namedItem("e").value.trim()||"🧒";i&&(this.save([...this.data.kids,{id:Ae(),name:i,emoji:s,switches:[],schedule:!1,bedtime:"22:00",wake:"07:00"}]),e.reset())}}
      >
        <input name="e" placeholder="🧒" style="max-width:64px;text-align:center" />
        <input name="n" type="text" placeholder=${t("chores_kid_name")} style="flex:1" />
        <button class="icon-btn primary pressable" type="submit" aria-label=${t("add")}><sn-icon icon="plus" style="--icon-size:18px"></sn-icon></button>
      </form>`}render(){const{t:t,hass:e}=this.ctx,i=this.data.kids;return Z`<div class="card glass">
      <div class="head">
        <sn-icon icon="wifi" style="--icon-size:20px;color:var(--accent-text)"></sn-icon>
        <h3>${t("widget_internet")}</h3>
        ${this.ctx.isAdmin?Z`<button class="icon-btn small pressable" aria-pressed=${this.setup} aria-label=${t("settings")} @click=${()=>this.setup=!this.setup}>
              <sn-icon icon=${this.setup?"check":"cog"} style="--icon-size:18px"></sn-icon>
            </button>`:q}
      </div>
      ${this.loaded?this.setup||!i.length?this.ctx.isAdmin?this.renderSetup():Z`<span class="muted">${t("net_ask_installer")}</span>`:i.map((i=>{const s=i.switches.some((t=>"on"===e.states[t]?.state)),a=i.paused_until?Math.max(1,Math.round((1e3*i.paused_until-Date.now())/6e4)):0;return Z`<div class="kid">
              <span class="face ${s?"":"off"}">${i.emoji}</span>
              <span class="name"><b>${i.name}</b><span>${s?t("net_on"):a?t("net_paused_for",{n:a}):t("net_off")}</span></span>
              ${s?Z`<button class="btn danger pressable" @click=${()=>this.power(i,!1)}>${t("net_stop")}</button>`:Z`<button class="btn primary pressable" @click=${()=>this.power(i,!0)}>${t("net_allow")}</button>`}
              <div class="row">
                ${s?Z`<button class="btn pressable" @click=${()=>this.power(i,!1,60)}>⏸ ${t("net_hour")}</button>`:q}
                <label style="display:flex;gap:6px;align-items:center;font-size:14px">
                  <input type="checkbox" .checked=${i.schedule} @change=${t=>this.patch(i.id,{schedule:t.target.checked})} />🌙
                </label>
                <input type="time" .value=${i.bedtime} @change=${t=>this.patch(i.id,{bedtime:t.target.value})} aria-label=${t("net_bedtime")} />
                <span>←</span>
                <input type="time" .value=${i.wake} @change=${t=>this.patch(i.id,{wake:t.target.value})} aria-label=${t("net_wake")} />
              </div>
            </div>`})):Z`<span class="muted">${t("loading")}</span>`}
    </div>`}};el.styles=[si,o`
      :host {
        display: block;
        height: 100%;
      }
      .card {
        height: 100%;
        border-radius: var(--r-lg);
        padding: 16px;
        display: grid;
        gap: 10px;
        align-content: start;
        overflow: auto;
      }
      .head {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .head h3 {
        flex: 1;
        margin: 0;
        font-size: 16px;
      }
      .kid {
        display: grid;
        grid-template-columns: auto 1fr auto;
        gap: 8px 12px;
        align-items: center;
        padding: 12px;
        border-radius: var(--r-md);
        background: var(--surface-2);
      }
      .face {
        font-size: 32px;
        line-height: 1;
        position: relative;
      }
      .face.off::after {
        content: "⛔";
        position: absolute;
        font-size: 16px;
        inset: auto -6px -4px auto;
      }
      .name b {
        display: block;
        font-size: 16px;
      }
      .name span {
        font-size: 13px;
        color: var(--text-2);
      }
      .row {
        grid-column: 1 / -1;
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        align-items: center;
      }
      .row .btn {
        min-height: 38px;
        font-size: 14px;
      }
      .row input[type="time"] {
        width: auto;
        min-height: 38px;
      }
    `],Qo([gt({attribute:!1})],el.prototype,"ctx",2),Qo([gt({attribute:!1})],el.prototype,"widget",2),Qo([mt()],el.prototype,"data",2),Qo([mt()],el.prototype,"setup",2),Qo([mt()],el.prototype,"loaded",2),el=Qo([pt("sn-w-internet")],el);var il=Object.defineProperty,sl=Object.getOwnPropertyDescriptor,al=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?sl(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&il(e,i,n),n};const nl={person:"#e9971d",car:"#3a86ff",dog:"#2bb673",cat:"#2bb673",package:"#8e6cef"},rl=864e5;let ol=class extends ct{constructor(){super(...arguments),this.day=0,this.camera="",this.cameras=[],this.missing=!1}get instance(){return this.widget.config.instance??"frigate"}connectedCallback(){super.connectedCallback(),this.load()}async load(){const t=new Date(Date.now()-this.day*rl);t.setHours(0,0,0,0);try{const e=await this.ctx.hass.callWS({type:"frigate/events/get",instance_id:this.instance,after:Math.floor(t.getTime()/1e3),before:Math.floor(t.getTime()/1e3)+86400,limit:300}),i="string"==typeof e?JSON.parse(e):e;this.cameras=[...new Set(i.map((t=>t.camera)))].sort(),this.camera&&this.cameras.includes(this.camera)||(this.camera=this.widget.config.camera??this.cameras[0]??""),this.events=i,this.missing=!1}catch{this.missing=!0}}clip(t){return this.ctx.hass.hassUrl(`/api/frigate/${this.instance}/notifications/${t.id}/clip.mp4`)}render(){const{t:t,lang:e}=this.ctx,i=new Date(Date.now()-this.day*rl);i.setHours(0,0,0,0);const s=t=>Math.min(100,Math.max(0,(1e3*t-i.getTime())/rl*100)),a=(this.events??[]).filter((t=>t.camera===this.camera)),n=e=>(Array.isArray(e.sub_label)?e.sub_label[0]:e.sub_label)||t(`fr_${e.label}`)||e.label;return Z`<div class="card glass">
      <div class="top">
        <b><sn-icon icon="cctv" style="--icon-size:20px"></sn-icon>${t("widget_timeline")}</b>
        ${this.cameras.length>1?Z`<select @change=${t=>(this.camera=t.target.value,this.playing=void 0)}>
              ${this.cameras.map((t=>Z`<option value=${t} ?selected=${t===this.camera}>${t.replace(/_/g," ")}</option>`))}
            </select>`:q}
        <div class="seg">
          ${[1,0].map((e=>Z`<button
              aria-pressed=${this.day===e}
              @click=${()=>{this.day=e,this.playing=void 0,this.load()}}
            >
              ${t(e?"yesterday":"today")}
            </button>`))}
        </div>
      </div>
      <div class="view">
        ${this.missing?Z`<span class="hint">${t("frigate_missing")}</span>`:this.playing?Z`<video src=${this.clip(this.playing)} autoplay controls playsinline></video>`:Z`<span class="hint">${a.length?t("tl_pick",{n:a.length}):t("tl_none")}</span>`}
      </div>
      <div>
        <div class="bar">
          ${[0,6,12,18].map((t=>Z`<span class="tick" style="left:${t/24*100+(t?0:2)}%">${String(t).padStart(2,"0")}</span>`))}
          ${0===this.day?Z`<span class="now" style="left:${s(Date.now()/1e3)}%"></span>`:q}
          ${a.map((t=>Z`<button
              class="dot ${this.playing?.id===t.id?"on":""}"
              style="left:${s(t.start_time)}%;background:${nl[t.label]??"#9aa0a6"}"
              title="${new Date(1e3*t.start_time).toLocaleTimeString(Dt[e],{hour:"2-digit",minute:"2-digit"})} · ${n(t)}"
              aria-label=${n(t)}
              @click=${()=>this.playing=t}
            ></button>`))}
        </div>
        <div class="legend">
          ${Object.entries(nl).filter((([t])=>a.some((e=>e.label===t)))).map((([e,i])=>Z`<span><i style="background:${i}"></i>${t(`fr_${e}`)||e}</span>`))}
        </div>
      </div>
    </div>`}};ol.styles=[si,o`
      :host {
        display: block;
        height: 100%;
      }
      .card {
        height: 100%;
        border-radius: var(--r-lg);
        padding: 14px;
        display: grid;
        gap: 10px;
        grid-template-rows: auto minmax(0, 1fr) auto;
        overflow: hidden;
      }
      .top {
        display: flex;
        gap: 8px;
        align-items: center;
        flex-wrap: wrap;
      }
      .top b {
        flex: 1;
        font-size: 16px;
        display: flex;
        gap: 8px;
        align-items: center;
      }
      .top select {
        width: auto;
        min-height: 36px;
      }
      .view {
        position: relative;
        border-radius: var(--r-md);
        background: #000;
        overflow: hidden;
        min-height: 120px;
        display: grid;
        place-items: center;
        color: #fff;
      }
      .view video {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      .view .hint {
        opacity: 0.7;
        font-size: 14px;
        padding: 12px;
        text-align: center;
      }
      .bar {
        position: relative;
        height: 44px;
        border-radius: 12px;
        background: var(--surface-2);
        direction: ltr;
      }
      .tick {
        position: absolute;
        bottom: 2px;
        font-size: 10px;
        color: var(--text-2);
        transform: translateX(-50%);
      }
      .dot {
        position: absolute;
        top: 8px;
        width: 12px;
        height: 12px;
        margin-left: -6px;
        border-radius: 50%;
        border: 2px solid var(--surface-solid);
        cursor: pointer;
        padding: 0;
        transition: transform 160ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .dot:hover,
      .dot.on {
        transform: scale(1.5);
      }
      .now {
        position: absolute;
        top: 4px;
        bottom: 4px;
        width: 2px;
        background: var(--alert);
      }
      .legend {
        display: flex;
        gap: 12px;
        font-size: 12px;
        color: var(--text-2);
      }
      .legend i {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-inline-end: 4px;
      }
    `],al([gt({attribute:!1})],ol.prototype,"ctx",2),al([gt({attribute:!1})],ol.prototype,"widget",2),al([mt()],ol.prototype,"day",2),al([mt()],ol.prototype,"camera",2),al([mt()],ol.prototype,"cameras",2),al([mt()],ol.prototype,"events",2),al([mt()],ol.prototype,"playing",2),al([mt()],ol.prototype,"missing",2),ol=al([pt("sn-w-timeline")],ol);var ll=Object.defineProperty,cl=Object.getOwnPropertyDescriptor,dl=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?cl(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&ll(e,i,n),n};const pl={at:"05:30",minutes:15,days:[],skip_rain:!0,on:!1},hl=["sun","mon","tue","wed","thu","fri","sat"],ul=t=>t.find((t=>(t.startsWith("valve.")||t.startsWith("switch."))&&/irrigat|sprinkler|garden|lawn|drip|ري|رشاش|جنين|حديق/i.test(t)));let gl=class extends ct{constructor(){super(...arguments),this.ir=pl}connectedCallback(){super.connectedCallback(),fi(this.ctx.hass,"irrigation").then((t=>this.ir={...pl,...t??{}})),this.unwatch=_i(this.ctx.hass,"irrigation",(t=>this.ir={...pl,...t??{}}))}disconnectedCallback(){super.disconnectedCallback(),this.unwatch?.then((t=>t())).catch((()=>{}))}save(t){const e=this.ir.entity??ul(Object.keys(this.ctx.hass.states));this.ir={...this.ir,entity:e,...t},bi(this.ctx.hass,"irrigation",this.ir).catch((()=>this.ctx.toast(this.ctx.t("error"))))}render(){const{ctx:t}=this,{t:e,hass:i,config:s,lang:a}=t,n=this.ir,r=n.entity??ul(Object.keys(i.states)),o=r?i.states[r]:void 0,l=Gt(o)||"open"===o?.state,c=Object.keys(i.states).filter((t=>t.startsWith("valve.")||t.startsWith("switch.")));return Z`<div class="card glass">
      <div class="head">
        <span class="drop ${l?"on":""}"><sn-icon icon="sprinkler" style="--icon-size:24px"></sn-icon></span>
        <div style="flex:1">
          <b>${e("widget_irrigation")}</b>
          <span>${l?e("irr_running"):n.on?e("irr_next",{at:n.at,n:n.minutes}):e("off")}</span>
        </div>
        <div class="seg">${[!0,!1].map((t=>Z`<button aria-pressed=${n.on===t} @click=${()=>this.save({on:t})}>${e(t?"on":"off")}</button>`))}</div>
      </div>
      <select @change=${t=>this.save({entity:t.target.value})}>
        ${r?q:Z`<option value="">–</option>`}
        ${c.map((t=>Z`<option value=${t} ?selected=${t===r}>${Kt(i,s,t)}</option>`))}
      </select>
      <div class="row">
        <input type="time" style="width:auto" .value=${n.at} @change=${t=>this.save({at:t.target.value})} />
        <input type="number" min="1" max="120" style="width:80px" .value=${String(n.minutes)} @change=${t=>this.save({minutes:Number(t.target.value)||15})} />
        <span>${e("minutes")}</span>
      </div>
      <div class="row days">
        ${hl.map((t=>{const e=!n.days.length||n.days.includes(t);return Z`<button
            aria-pressed=${e}
            @click=${()=>{const i=n.days.length?n.days:[...hl],s=e?i.filter((e=>e!==t)):[...i,t];this.save({days:7===s.length?[]:s})}}
          >
            ${new Date(2023,0,1+hl.indexOf(t)).toLocaleDateString(Dt[a],{weekday:"narrow"})}
          </button>`}))}
      </div>
      <label class="row" style="gap:8px"><input type="checkbox" .checked=${n.skip_rain} @change=${t=>this.save({skip_rain:t.target.checked})} />🌧️ ${e("irr_skip_rain")}</label>
      ${n.last?Z`<div class="last">${n.last.skipped?`🌧️ ${e("irr_skipped",{date:n.last.date})}`:`💧 ${e("irr_watered",{date:n.last.date})}`}</div>`:q}
      ${r&&!l?Z`<button
            class="btn pressable"
            style="justify-self:start"
            @click=${async()=>{await i.callService("valve"===Xt(r)?"valve":"homeassistant","valve"===Xt(r)?"open_valve":"turn_on",{entity_id:r}).catch((()=>{})),i.callWS({type:"smartnest/timer/set",entity_id:r,minutes:10}).catch((()=>{}))}}
          >
            💧 ${e("irr_now")}
          </button>`:q}
    </div>`}};gl.styles=[si,o`
      :host {
        display: block;
        height: 100%;
      }
      .card {
        height: 100%;
        border-radius: var(--r-lg);
        padding: 16px;
        display: grid;
        gap: 12px;
        align-content: start;
        overflow: auto;
      }
      .head {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .drop {
        width: 46px;
        height: 46px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: color-mix(in srgb, #2bb673 18%, transparent);
        color: #2bb673;
        flex: none;
      }
      .drop.on {
        animation: pulse 1.6s ease-in-out infinite;
      }
      .head b {
        font-size: 17px;
        display: block;
      }
      .head span {
        font-size: 13px;
        color: var(--text-2);
      }
      .row {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        align-items: center;
      }
      .days button {
        min-width: 34px;
        min-height: 34px;
        border-radius: 999px;
        border: 0;
        background: var(--surface-2);
        color: var(--text);
        font: 600 12px var(--font);
        cursor: pointer;
      }
      .days button[aria-pressed="true"] {
        background: #2bb673;
        color: #fff;
      }
      .last {
        font-size: 13px;
        padding: 8px 10px;
        border-radius: var(--r-md);
        background: var(--surface-2);
      }
      @keyframes pulse {
        50% {
          transform: scale(1.08);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .drop.on {
          animation: none;
        }
      }
    `],dl([gt({attribute:!1})],gl.prototype,"ctx",2),dl([gt({attribute:!1})],gl.prototype,"widget",2),dl([mt()],gl.prototype,"ir",2),gl=dl([pt("sn-w-irrigation")],gl);var ml=Object.defineProperty,fl=Object.getOwnPropertyDescriptor,bl=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?fl(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&ml(e,i,n),n};const _l={heat_minutes:40,keep_minutes:20,plans:[]},yl=["sun","mon","tue","wed","thu","fri","sat"];let vl=class extends ct{constructor(){super(...arguments),this.b=_l,this.loaded=!1,this.now=Date.now()}connectedCallback(){super.connectedCallback(),fi(this.ctx.hass,"boiler").then((t=>{this.b={..._l,...t??{}},this.loaded=!0})),this.unwatch=_i(this.ctx.hass,"boiler",(t=>this.b={..._l,...t??{}})),this.tick=window.setInterval((()=>this.now=Date.now()),3e4)}disconnectedCallback(){super.disconnectedCallback(),this.unwatch?.then((t=>t())).catch((()=>{})),window.clearInterval(this.tick)}save(t){this.b=t,bi(this.ctx.hass,"boiler",t).catch((()=>this.ctx.toast(this.ctx.t("error"))))}get entity(){return this.b.entity??((t=Object.keys(this.ctx.hass.states)).find((t=>t.startsWith("water_heater.")))??t.find((t=>t.startsWith("switch.")&&/boiler|heater|geyser|سخان|دود|بويلر/i.test(t))));var t}power(t,e){const i=this.entity;i&&(this.ctx.hass.callService("homeassistant",t?"turn_on":"turn_off",{entity_id:i}).catch((()=>this.ctx.toast(this.ctx.t("error")))),this.save({...this.b,entity:i,until:t&&e?Date.now()/1e3+60*e:null,ready_at:t&&e?Date.now()/1e3+60*Math.min(e,this.b.heat_minutes):null}))}render(){const{ctx:t}=this,{t:e,hass:i,config:s,lang:a}=t,n=this.entity,r=Gt(n?i.states[n]:void 0),o=this.b,l=o.ready_at?Math.max(0,Math.round((1e3*o.ready_at-this.now)/6e4)):void 0,c=o.until?Math.max(0,Math.round((1e3*o.until-this.now)/6e4)):void 0,d=r?void 0!==l&&o.heat_minutes?Math.round(100-l/o.heat_minutes*80):90:15,p=o.plans.filter((t=>t.on)).map((t=>t.at)).sort()[0];return Z`<div class="card glass">
      <div class="head">
        <span class="tank ${r?"on":""}" style="--fill:${d}%"><i></i></span>
        <div style="flex:1">
          <b>${n?Kt(i,s,n):e("widget_boiler")}</b>
          <span
            >${n?r?l?e("boiler_ready_in",{n:l}):void 0!==c?e("boiler_off_in",{n:c}):e("boiler_hot"):p?e("boiler_next",{at:p}):e("off"):e("no_entities")}</span
          >
        </div>
      </div>
      ${n?Z`<div class="row">
            ${r?Z`<button class="btn pressable" @click=${()=>this.power(!1)}>${e("turn_off")}</button>`:[30,45,60].map((t=>Z`<button class="btn pressable" @click=${()=>this.power(!0,t)}>🔥 ${e("boiler_for",{n:t})}</button>`))}
          </div>`:q}
      ${this.loaded?Z`${o.plans.map((t=>Z`<div class="plan">
                <span class="t">${t.at}</span>
                <span class="d">${e("boiler_plan",{n:o.heat_minutes})} · ${t.days.length?t.days.map((t=>new Date(2023,0,1+yl.indexOf(t)).toLocaleDateString(Dt[a],{weekday:"short"}))).join("، "):e("every_day")}</span>
                <div class="seg">
                  ${[!0,!1].map((i=>Z`<button aria-pressed=${t.on===i} @click=${()=>this.save({...o,entity:n,plans:o.plans.map((e=>e.id===t.id?{...e,on:i}:e))})}>${e(i?"on":"off")}</button>`))}
                </div>
                <button class="icon-btn small pressable" aria-label=${e("delete")} @click=${()=>this.save({...o,plans:o.plans.filter((e=>e.id!==t.id))})}>
                  <sn-icon icon="close" style="--icon-size:16px"></sn-icon>
                </button>
              </div>`))}
            <form
              class="row"
              @submit=${t=>{t.preventDefault();const e=t.currentTarget.elements.namedItem("at").value;e&&this.save({...o,entity:n,plans:[...o.plans,{id:Ae(),at:e,days:[],on:!0}]})}}
            >
              <span style="align-self:center;font-size:14px">${e("boiler_want")}</span>
              <input name="at" type="time" value="07:00" style="width:auto" />
              <button class="btn primary pressable" type="submit">${e("add")}</button>
            </form>`:q}
    </div>`}};vl.styles=[si,o`
      :host {
        display: block;
        height: 100%;
      }
      .card {
        height: 100%;
        border-radius: var(--r-lg);
        padding: 16px;
        display: grid;
        gap: 12px;
        align-content: start;
        overflow: auto;
      }
      .head {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .tank {
        position: relative;
        width: 44px;
        height: 60px;
        border-radius: 14px;
        background: var(--surface-2);
        overflow: hidden;
        flex: none;
        box-shadow: inset 0 0 0 2px var(--border);
      }
      .tank i {
        position: absolute;
        inset: auto 0 0 0;
        height: var(--fill);
        background: linear-gradient(0deg, #e5484d, #ff9f43);
        transition: height 1s cubic-bezier(0.22, 1, 0.36, 1);
      }
      .tank.on i::after {
        content: "";
        position: absolute;
        inset: -6px 0 auto;
        height: 12px;
        background: radial-gradient(circle at 25% 50%, rgba(255, 255, 255, 0.5) 2px, transparent 3px) 0 0 / 12px 12px;
        animation: bubble 1.6s linear infinite;
      }
      .head b {
        font-size: 18px;
        display: block;
      }
      .head span {
        color: var(--text-2);
        font-size: 14px;
      }
      .row {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
      .plan {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 10px;
        border-radius: var(--r-md);
        background: var(--surface-2);
      }
      .plan .t {
        font-size: 22px;
        font-weight: 700;
        direction: ltr;
      }
      .plan .d {
        flex: 1;
        font-size: 12px;
        color: var(--text-2);
      }
      @keyframes bubble {
        to {
          transform: translateY(-14px);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .tank.on i::after {
          animation: none;
        }
      }
    `],bl([gt({attribute:!1})],vl.prototype,"ctx",2),bl([gt({attribute:!1})],vl.prototype,"widget",2),bl([mt()],vl.prototype,"b",2),bl([mt()],vl.prototype,"loaded",2),bl([mt()],vl.prototype,"now",2),vl=bl([pt("sn-w-boiler")],vl);var xl=Object.defineProperty,wl=Object.getOwnPropertyDescriptor,$l=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?wl(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&xl(e,i,n),n};const kl={co2:{classes:["carbon_dioxide"],re:/co2/,label:"air_co2",levels:[900,1400]},pm25:{classes:["pm25"],re:/pm2_?5/,label:"air_pm25",levels:[15,35]},voc:{classes:["volatile_organic_compounds","volatile_organic_compounds_parts"],re:/voc|tvoc/,label:"air_voc",levels:[300,1e3]},humidity:{classes:["humidity"],re:/humidity/,label:"air_humidity",levels:[60,70]}};const Cl=["var(--success)","#e9971d","var(--alert)"];let Ml=class extends ct{render(){const{ctx:t}=this,{t:e,hass:i,lang:s,config:a}=t,n=function(t,e){const i=Object.values(t.states).filter((t=>t.entity_id.startsWith("sensor.")&&!Number.isNaN(Number(t.state))&&(!e?.length||e.includes(t.entity_id)))),s=[];for(const[a,n]of Object.entries(kl)){const t=i.filter((t=>n.classes.includes(t.attributes.device_class)||!t.attributes.device_class&&n.re.test(t.entity_id)));if(!t.length)continue;const e=t.sort(((t,e)=>Number(e.state)-Number(t.state)))[0],r=Number(e.state),o="humidity"===a?r>n.levels[1]||r<25?2:r>n.levels[0]||r<35?1:0:r>n.levels[1]?2:r>n.levels[0]?1:0;s.push({key:a,label:n.label,e:e,level:o})}return s}(i,this.widget.config.entities),r=n.reduce(((t,e)=>Math.max(t,e.level)),0),o=n.filter((t=>t.level===r&&r>0))[0],l=o?"co2"===o.key?"air_tip_co2":"pm25"===o.key?"air_tip_pm":"voc"===o.key?"air_tip_voc":Number(o.e.state)<35?"air_tip_dry":"air_tip_humid":"air_good",c=this.widget.config.purifier??Object.keys(i.states).find((t=>/^fan\..*(purifier|air_clean|airpurifier)/.test(t)||/^humidifier\./.test(t)||/^fan\..*air/.test(t))),d=c?i.states[c]:void 0;return Z`<div class="card glass">
      <div class="head">
        <span class="orb" style="--c:${Cl[r]}"><sn-icon icon=${r?"air-filter":"leaf"} style="--icon-size:26px"></sn-icon></span>
        <div><b>${e(0===r?"air_level_good":1===r?"air_level_ok":"air_level_bad")}</b><span>${e(l)}</span></div>
      </div>
      ${n.length?Z`<div class="grid">
            ${n.map((t=>Z`<div class="r" style="--c:${Cl[t.level]}" title=${Kt(i,a,t.e.entity_id)}>
                <span class="v"><sn-num .value=${se(`${ae(Number(t.e.state),s,0)} ${t.e.attributes.unit_of_measurement??""}`.trim())}></sn-num></span>
                <span class="l">${e(t.label)}</span>
              </div>`))}
          </div>`:Z`<span class="muted">${e("no_entities")}</span>`}
      ${d?Z`<button
            class="btn ${Gt(d)?"":"primary"} pressable"
            style="justify-self:start"
            @click=${()=>i.callService("homeassistant","toggle",{entity_id:c}).catch((()=>t.toast(e("error"))))}
          >
            <sn-icon icon="air-purifier" style="--icon-size:18px"></sn-icon>${Kt(i,a,c)} · ${e(Gt(d)?"on":"off")}
          </button>`:q}
    </div>`}};Ml.styles=[si,o`
      :host {
        display: block;
        height: 100%;
      }
      .card {
        height: 100%;
        border-radius: var(--r-lg);
        padding: 16px;
        display: grid;
        gap: 12px;
        align-content: start;
        overflow: auto;
      }
      .head {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .orb {
        width: 54px;
        height: 54px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        color: #fff;
        flex: none;
        box-shadow: 0 0 0 6px color-mix(in srgb, var(--c) 22%, transparent);
        background: var(--c);
        animation: breathe 4s ease-in-out infinite;
      }
      .head b {
        font-size: 18px;
        display: block;
      }
      .head span {
        font-size: 14px;
        color: var(--text-2);
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
        gap: 8px;
      }
      .r {
        padding: 10px 12px;
        border-radius: var(--r-md);
        background: var(--surface-2);
        display: grid;
        gap: 2px;
        border-inline-start: 4px solid var(--c);
      }
      .r .v {
        font-size: 20px;
        font-weight: 700;
      }
      .r .l {
        font-size: 12px;
        color: var(--text-2);
      }
      @keyframes breathe {
        50% {
          transform: scale(1.06);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .orb {
          animation: none;
        }
      }
    `],$l([gt({attribute:!1})],Ml.prototype,"ctx",2),$l([gt({attribute:!1})],Ml.prototype,"widget",2),Ml=$l([pt("sn-w-air")],Ml);var Al=Object.defineProperty,Hl=Object.getOwnPropertyDescriptor,Ll=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?Hl(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&Al(e,i,n),n};const Vl=(t=new Date)=>`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`;const Sl={kids:[],tasks:[],done:{},goal:20,reward:""};let zl=class extends ct{constructor(){super(...arguments),this.c=Sl,this.setup=!1,this.loaded=!1}connectedCallback(){super.connectedCallback(),fi(this.ctx.hass,"chores").then((t=>{this.c={...Sl,...t??{}},this.loaded=!0})),this.unwatch=_i(this.ctx.hass,"chores",(t=>this.c={...Sl,...t??{}}))}disconnectedCallback(){super.disconnectedCallback(),this.unwatch?.then((t=>t())).catch((()=>{}))}save(t){const e=Vl(new Date(Date.now()-3024e6));t={...t,done:Object.fromEntries(Object.entries(t.done).filter((([t])=>t>=e)))},this.c=t,bi(this.ctx.hass,"chores",t).catch((()=>this.ctx.toast(this.ctx.t("error"))))}toggle(t,e){const i=Vl(),s={...this.c.done[i]??{}},a=s[t]??[],n=a.includes(e);s[t]=n?a.filter((t=>t!==e)):[...a,e],n||(this.burst=`${t}|${e}`,navigator.vibrate?.(20),window.setTimeout((()=>this.burst=void 0),700)),this.save({...this.c,done:{...this.c.done,[i]:s}})}renderSetup(){const{t:t}=this.ctx,e=this.c,i=(i,s,a)=>Z`<b style="font-size:14px">${a}</b>
      ${i.map((i=>Z`<div class="row">
          <span style="font-size:22px">${i.emoji}</span><span style="flex:1">${"name"in i?i.name:i.title}</span>
          <button class="icon-btn small pressable" aria-label=${t("delete")} @click=${()=>this.save({...e,[s]:e[s].filter((t=>t.id!==i.id))})}>
            <sn-icon icon="close" style="--icon-size:16px"></sn-icon>
          </button>
        </div>`))}
      <form
        class="row"
        @submit=${t=>{t.preventDefault();const i=t.currentTarget,a=i.elements.namedItem("n").value.trim(),n=i.elements.namedItem("e").value.trim()||("kids"===s?"🙂":"⭐");if(!a)return;const r="kids"===s?{id:Ae(),name:a,emoji:n}:{id:Ae(),title:a,emoji:n};this.save({...e,[s]:[...e[s],r]}),i.reset()}}
      >
        <input class="emoji" name="e" placeholder=${"kids"===s?"🙂":"🛏️"} />
        <input name="n" placeholder=${t("kids"===s?"chores_kid_name":"chores_task_name")} />
        <button class="icon-btn primary pressable" type="submit" aria-label=${t("add")}><sn-icon icon="plus" style="--icon-size:18px"></sn-icon></button>
      </form>`;return Z`<div class="setup">
      ${i(e.kids,"kids",t("chores_kids"))} ${i(e.tasks,"tasks",t("chores_tasks"))}
      <label class="field"
        >${t("chores_goal")}
        <input type="number" min="1" .value=${String(e.goal)} @change=${t=>this.save({...e,goal:Number(t.target.value)||20})} />
      </label>
      <label class="field"
        >${t("chores_reward")}
        <input type="text" .value=${e.reward} placeholder=${t("chores_reward_hint")} @change=${t=>this.save({...e,reward:t.target.value.trim()})} />
      </label>
    </div>`}render(){const{t:t}=this.ctx,e=this.c,i=e.done[Vl()]??{};return Z`<div class="card glass">
      <div class="head">
        <sn-icon icon="star" style="--icon-size:20px;color:#f5b301"></sn-icon>
        <h3>${t("widget_chores")}</h3>
        <button class="icon-btn small pressable" aria-pressed=${this.setup} aria-label=${t("settings")} @click=${()=>this.setup=!this.setup}>
          <sn-icon icon=${this.setup?"check":"cog"} style="--icon-size:18px"></sn-icon>
        </button>
      </div>
      ${this.loaded?!this.setup&&e.kids.length&&e.tasks.length?Z`<div class="kids">
              ${e.kids.map((i=>{const s=function(t,e){const i=new Date,s=new Date(i);return s.setDate(i.getDate()-(i.getDay()+1)%7),s.setHours(0,0,0,0),Object.entries(t.done).filter((([t])=>new Date(`${t}T12:00`)>=s)).reduce(((t,[,i])=>t+Object.values(i).filter((t=>t.includes(e))).length),0)}(e,i.id);return Z`<div class="kid">
                  <span class="face">${i.emoji}</span><b>${i.name}</b>
                  <span class="stars">⭐ ${s} / ${e.goal}</span>
                  <div class="bar"><span style="width:${Math.min(100,s/e.goal*100)}%"></span></div>
                  ${s>=e.goal?Z`<span class="won">🎉 ${e.reward||t("chores_won")}</span>`:q}
                </div>`}))}
            </div>
            ${e.tasks.map((t=>Z`<div class="task">
                <span style="font-size:22px">${t.emoji}</span>
                <span class="tt">${t.title}</span>
                <span class="who">
                  ${e.kids.map((e=>Z`<button aria-pressed=${(i[t.id]??[]).includes(e.id)} aria-label=${e.name} title=${e.name} @click=${()=>this.toggle(t.id,e.id)}>
                      ${e.emoji}${this.burst===`${t.id}|${e.id}`?Z`<span class="pop">⭐</span>`:q}
                    </button>`))}
                </span>
              </div>`))}`:this.renderSetup():Z`<span class="muted">${t("loading")}</span>`}
    </div>`}};zl.styles=[si,o`
      :host {
        display: block;
        height: 100%;
      }
      .card {
        height: 100%;
        border-radius: var(--r-lg);
        padding: 16px;
        display: grid;
        gap: 12px;
        align-content: start;
        overflow: auto;
      }
      .head {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .head h3 {
        flex: 1;
        margin: 0;
        font-size: 16px;
      }
      .kids {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
        gap: 8px;
      }
      .kid {
        display: grid;
        gap: 6px;
        justify-items: center;
        padding: 10px;
        border-radius: var(--r-md);
        background: var(--surface-2);
        text-align: center;
      }
      .kid .face {
        font-size: 30px;
        line-height: 1;
      }
      .kid b {
        font-size: 14px;
      }
      .stars {
        font-size: 13px;
        font-weight: 700;
        color: #e9971d;
      }
      .bar {
        width: 100%;
        height: 6px;
        border-radius: 999px;
        background: color-mix(in srgb, var(--text) 10%, transparent);
        overflow: hidden;
      }
      .bar span {
        display: block;
        height: 100%;
        background: linear-gradient(90deg, #f5b301, #e9971d);
        border-radius: inherit;
        transition: width 600ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .won {
        font-size: 12px;
        font-weight: 700;
        color: var(--success);
      }
      .task {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 10px;
        border-radius: var(--r-md);
        background: var(--surface-2);
      }
      .task .tt {
        flex: 1;
        font-weight: 500;
      }
      .who {
        display: flex;
        gap: 6px;
      }
      .who button {
        position: relative;
        width: 40px;
        height: 40px;
        border-radius: 999px;
        border: 2px solid transparent;
        background: var(--surface);
        font-size: 20px;
        cursor: pointer;
        filter: grayscale(0.9);
        opacity: 0.6;
        transition: transform 160ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .who button[aria-pressed="true"] {
        filter: none;
        opacity: 1;
        border-color: #f5b301;
      }
      .who button:active {
        transform: scale(0.9);
      }
      .pop {
        position: absolute;
        inset: -14px 0 auto;
        font-size: 16px;
        animation: pop 700ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        pointer-events: none;
      }
      @keyframes pop {
        from {
          transform: translateY(10px) scale(0.6);
          opacity: 1;
        }
        to {
          transform: translateY(-14px) scale(1.4);
          opacity: 0;
        }
      }
      .setup {
        display: grid;
        gap: 8px;
      }
      .setup .row {
        display: flex;
        gap: 6px;
        align-items: center;
      }
      .setup input {
        flex: 1;
      }
      .setup .emoji {
        max-width: 64px;
        text-align: center;
      }
      @media (prefers-reduced-motion: reduce) {
        .pop {
          animation: none;
          opacity: 0;
        }
      }
    `],Ll([gt({attribute:!1})],zl.prototype,"ctx",2),Ll([gt({attribute:!1})],zl.prototype,"widget",2),Ll([mt()],zl.prototype,"c",2),Ll([mt()],zl.prototype,"setup",2),Ll([mt()],zl.prototype,"burst",2),Ll([mt()],zl.prototype,"loaded",2),zl=Ll([pt("sn-w-chores")],zl);var Dl=Object.defineProperty,Ol=Object.getOwnPropertyDescriptor,jl=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?Ol(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&Dl(e,i,n),n};const Tl=["sun","mon","tue","wed","thu","fri","sat"];let Pl=class extends ct{constructor(){super(...arguments),this.alarms=[],this.adding=!1,this.loaded=!1}connectedCallback(){super.connectedCallback(),fi(this.ctx.hass,"wake").then((t=>{this.alarms=t?.alarms??[],this.loaded=!0})),this.unwatch=_i(this.ctx.hass,"wake",(t=>this.alarms=t?.alarms??[]))}disconnectedCallback(){super.disconnectedCallback(),this.unwatch?.then((t=>t())).catch((()=>{}))}save(t){this.alarms=t,bi(this.ctx.hass,"wake",{alarms:t}).catch((()=>this.ctx.toast(this.ctx.t("error"))))}patch(t,e){this.save(this.alarms.map((i=>i.id===t?{...i,...e}:i)))}render(){const{ctx:t}=this,{t:e,hass:i,config:s}=t,a=Object.keys(i.states).filter((t=>t.startsWith("light.")));return Z`<div class="card glass">
      <h3><sn-icon icon="weather-sunset-up" style="--icon-size:20px;color:#ff9f43"></sn-icon>${e("widget_wake")}</h3>
      ${this.alarms.map((a=>Z`<div class="alarm ${a.on?"":"off"}">
          <span class="time">${a.time}</span>
          <div class="seg">
            ${[!0,!1].map((t=>Z`<button aria-pressed=${a.on===t} @click=${()=>this.patch(a.id,{on:t})}>${e(t?"on":"off")}</button>`))}
          </div>
          <button class="icon-btn small pressable" aria-label=${e("delete")} @click=${()=>this.save(this.alarms.filter((t=>t.id!==a.id)))}>
            <sn-icon icon="close" style="--icon-size:16px"></sn-icon>
          </button>
          <span class="info">
            <span>${a.light?Kt(i,s,a.light):"–"} · ${e("wake_minutes",{n:a.minutes})}</span>
            <span class="days">
              ${Tl.map((e=>{const i=!a.days.length||a.days.includes(e);return Z`<button
                  aria-pressed=${i}
                  @click=${()=>{const t=a.days.length?a.days:[...Tl],s=i?t.filter((t=>t!==e)):[...t,e];this.patch(a.id,{days:7===s.length?[]:s})}}
                >
                  ${new Date(2023,0,1+Tl.indexOf(e)).toLocaleDateString(Dt[t.lang],{weekday:"narrow"})}
                </button>`}))}
            </span>
          </span>
        </div>`))}
      ${this.adding?Z`<form
            @submit=${t=>{t.preventDefault();const e=t.currentTarget,i=t=>e.elements.namedItem(t).value;i("time")&&i("light")&&(this.save([...this.alarms,{id:Ae(),time:i("time"),light:i("light"),minutes:Number(i("minutes"))||20,days:[],on:!0}]),this.adding=!1)}}
          >
            <input name="time" type="time" value="06:30" />
            <select name="light">
              ${a.map((t=>Z`<option value=${t}>${Kt(i,s,t)}</option>`))}
            </select>
            <select name="minutes">
              ${[10,20,30].map((t=>Z`<option value=${t} ?selected=${20===t}>${e("wake_minutes",{n:t})}</option>`))}
            </select>
            <div style="display:flex;gap:8px">
              <button class="btn primary pressable" type="submit">${e("save")}</button>
              <button class="btn pressable" type="button" @click=${()=>this.adding=!1}>${e("cancel")}</button>
            </div>
          </form>`:Z`<button class="btn pressable" style="justify-self:start" @click=${()=>this.adding=!0}>
            <sn-icon icon="plus" style="--icon-size:18px"></sn-icon>${e("wake_add")}
          </button>`}
      ${!this.loaded||this.alarms.length||this.adding?q:Z`<span class="muted" style="font-size:14px">${e("wake_hint")}</span>`}
    </div>`}};Pl.styles=[si,o`
      :host {
        display: block;
        height: 100%;
      }
      .card {
        height: 100%;
        border-radius: var(--r-lg);
        padding: 16px;
        display: grid;
        gap: 10px;
        align-content: start;
        overflow: auto;
        position: relative;
      }
      .card::before {
        content: "";
        position: absolute;
        inset: auto 0 0 0;
        height: 60%;
        background: radial-gradient(ellipse at 50% 120%, rgba(255, 170, 70, 0.28), transparent 70%);
        pointer-events: none;
      }
      h3 {
        margin: 0;
        font-size: 16px;
        display: flex;
        gap: 8px;
        align-items: center;
      }
      .alarm {
        display: grid;
        grid-template-columns: 1fr auto auto;
        align-items: center;
        gap: 8px 10px;
        padding: 10px 12px;
        border-radius: var(--r-md);
        background: var(--surface-2);
        position: relative;
      }
      .alarm.off {
        opacity: 0.55;
      }
      .time {
        font-size: 30px;
        font-weight: 700;
        font-variant-numeric: tabular-nums;
        direction: ltr;
      }
      .info {
        grid-column: 1 / -1;
        min-width: 0;
        display: grid;
        gap: 2px;
        font-size: 13px;
        color: var(--text-2);
      }
      .days {
        display: flex;
        gap: 4px;
        flex-wrap: wrap;
      }
      .days button {
        min-width: 34px;
        min-height: 34px;
        border-radius: 999px;
        border: 0;
        background: var(--surface-2);
        color: var(--text);
        font: 600 12px var(--font);
        cursor: pointer;
      }
      .days button[aria-pressed="true"] {
        background: var(--accent);
        color: var(--on-accent);
      }
      form {
        display: grid;
        gap: 8px;
      }
    `],jl([gt({attribute:!1})],Pl.prototype,"ctx",2),jl([gt({attribute:!1})],Pl.prototype,"widget",2),jl([mt()],Pl.prototype,"alarms",2),jl([mt()],Pl.prototype,"adding",2),jl([mt()],Pl.prototype,"loaded",2),Pl=jl([pt("sn-w-wake")],Pl);var Nl=Object.defineProperty,Il=Object.getOwnPropertyDescriptor,Wl=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?Il(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&Nl(e,i,n),n};const El=["switch","light","media_player","climate","fan","water_heater","humidifier"],Rl=(t,e)=>{const i=t.states[e],s=Number(i?.state);if(!i||Number.isNaN(s))return;const a=i.attributes.unit_of_measurement;return"kW"===a?1e3*s:"W"!==a&&a?void 0:s};function Bl(t,e){const i=Ri(t),s=new Set([i.solar,i.grid,i.battery,i.home,e].filter(Boolean)),a=[];for(const n of Object.values(t.states)){const e=n.entity_id;if(!e.startsWith("sensor.")||"power"!==n.attributes.device_class||s.has(e))continue;if(/total|house|home|grid|import|export|solar|pv|inverter|battery|mains|phase/.test(e))continue;const i=Rl(t,e);if(void 0===i||i<1)continue;const r=t.entities?.[e]?.device_id,o=r?Object.values(t.entities??{}).find((e=>e.device_id===r&&El.includes(Xt(e.entity_id))&&!e.entity_category&&t.states[e.entity_id]))?.entity_id:void 0,l=o?t.states[o]?.state:void 0;a.push({id:e,w:i,control:o,standby:!!o&&("off"===l||"standby"===l||"idle"===l)&&i>=2})}return a.sort(((t,e)=>e.w-t.w))}const Zl=["#E9971D","#3A86FF","#2BB673","#E5484D","#8E6CEF","#14B8C4","#9AA0A6"];let Fl=class extends ct{render(){const{ctx:t}=this,{t:e,hass:i,lang:s}=t,a=Bl(i,t.config.settings.power_entity),n=a.reduce(((t,e)=>t+e.w),0),r=a.slice(0,6),o=a.slice(6).reduce(((t,e)=>t+e.w),0),l=[...r.map((t=>t.w)),...o?[o]:[]],c=2*Math.PI*40;let d=0;const p=t=>se(t>=1e3?`${ae(t/1e3,s,1)} kW`:`${ae(t,s,0)} W`),h=a.filter((t=>t.standby));return Z`<div class="card glass">
      <h3><sn-icon icon="lightning-bolt" style="--icon-size:20px;color:var(--accent-text)"></sn-icon>${e("widget_consumers")}</h3>
      ${a.length?Z`<div class="ring">
              <svg viewBox="0 0 100 100" aria-hidden="true">
                <circle cx="50" cy="50" r="40" stroke="var(--surface-2)"></circle>
                ${l.map(((t,e)=>{const i=t/n*c,s=F`<circle cx="50" cy="50" r="40" stroke=${Zl[e]??Zl[6]} stroke-dasharray="${Math.max(0,i-1.2)} ${c}" stroke-dashoffset=${-d}></circle>`;return d+=i,s}))}
              </svg>
              <div class="mid"><b><sn-num .value=${p(n)}></sn-num></b><span>${e("now")}</span></div>
            </div>
            <ul>
              ${r.map(((s,a)=>Z`<li>
                  <span class="sw" style="background:${Zl[a]}"></span>
                  <span class="nm">${Kt(i,t.config,s.control??s.id)}</span>
                  ${s.standby?Z`<button class="tag" title=${e("standby_hint")} @click=${()=>s.control&&t.openEntity(s.control)}>${e("standby")}</button>`:q}
                  <span class="w">${p(s.w)}</span>
                </li>`))}
              ${o?Z`<li><span class="sw" style="background:${Zl[6]}"></span><span class="nm">${e("others")}</span><span class="w">${p(o)}</span></li>`:q}
              ${h.length&&!r.some((t=>t.standby))?Z`<li class="muted" style="font-size:12px">${e("standby_total",{w:p(h.reduce(((t,e)=>t+e.w),0))})}</li>`:q}
            </ul>`:Z`<span class="muted" style="grid-column:1/-1">${e("no_entities")}</span>`}
    </div>`}};Fl.styles=[si,o`
      :host {
        display: block;
        height: 100%;
      }
      .card {
        height: 100%;
        border-radius: var(--r-lg);
        padding: 16px;
        display: grid;
        grid-template-columns: minmax(110px, 38%) 1fr;
        gap: 16px;
        align-items: center;
        overflow: hidden;
      }
      .ring {
        position: relative;
        aspect-ratio: 1;
        width: 100%;
        max-height: 100%;
      }
      .ring svg {
        width: 100%;
        height: 100%;
        transform: rotate(-90deg);
      }
      .ring circle {
        fill: none;
        stroke-width: 14;
        transition: stroke-dasharray 700ms cubic-bezier(0.22, 1, 0.36, 1), stroke-dashoffset 700ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .mid {
        position: absolute;
        inset: 0;
        display: grid;
        place-content: center;
        text-align: center;
      }
      .mid b {
        font-size: 22px;
      }
      .mid span {
        font-size: 12px;
        color: var(--text-2);
      }
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 6px;
        overflow: auto;
        max-height: 100%;
        align-self: stretch;
        align-content: center;
      }
      li {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
      }
      .sw {
        width: 10px;
        height: 10px;
        border-radius: 3px;
        flex: none;
      }
      .nm {
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .w {
        color: var(--text-2);
        font-variant-numeric: tabular-nums;
      }
      .tag {
        font-size: 11px;
        font-weight: 700;
        padding: 2px 8px;
        border-radius: 999px;
        background: color-mix(in srgb, var(--alert) 16%, transparent);
        color: var(--alert-text);
        border: 0;
        cursor: pointer;
      }
      h3 {
        grid-column: 1 / -1;
        margin: 0;
        font-size: 16px;
        display: flex;
        gap: 8px;
        align-items: center;
      }
    `],Wl([gt({attribute:!1})],Fl.prototype,"ctx",2),Wl([gt({attribute:!1})],Fl.prototype,"widget",2),Fl=Wl([pt("sn-w-consumers")],Fl);var Ul=Object.defineProperty,ql=Object.getOwnPropertyDescriptor,Yl=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?ql(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&Ul(e,i,n),n};let Xl=class extends ct{constructor(){super(...arguments),this.rects=new Map}willUpdate(){this.toggleAttribute("rtl",this.ctx.rtl),this.rects.clear(),this.ctx.editing&&this.renderRoot?.querySelectorAll(".cell").forEach((t=>this.rects.set(t.dataset.id,t.getBoundingClientRect())))}updated(){this.rects.size&&this.renderRoot.querySelectorAll(".cell").forEach((t=>{const e=this.rects.get(t.dataset.id);if(!e||t.classList.contains("lifted"))return;const i=t.getBoundingClientRect(),s=e.left-i.left,a=e.top-i.top;Math.abs(s)<1&&Math.abs(a)<1||t.animate([{transform:`translate(${s}px, ${a}px)`},{transform:"none"}],{duration:320,easing:"cubic-bezier(0.22, 1, 0.36, 1)"})}))}get widgets(){return this.preview??this.page.widgets}pointerCell(t){const e=this.renderRoot.querySelector(".grid").getBoundingClientRect(),i=(e.width+12)/Ce,s=this.ctx.rtl?e.right-t.clientX:t.clientX-e.left,a=t.clientY-e.top;return{px:s,py:a,pitchX:i,pitchY:56,col:Math.floor(s/i),row:Math.floor(a/56)}}start(t,e,i){if(0!==t.button||this.ctx.narrow)return;t.preventDefault(),t.stopPropagation(),t.currentTarget.setPointerCapture(t.pointerId);const{col:s,row:a}=this.pointerCell(t);this.gesture={id:e.id,mode:i,pointerId:t.pointerId,offCol:s-e.x,offRow:a-e.y},this.preview=this.page.widgets.map((t=>({...t}))),navigator.vibrate?.(6)}move(t){const e=this.gesture;if(!e||t.pointerId!==e.pointerId||!this.preview)return;const i=this.preview.find((t=>t.id===e.id)),{px:s,py:a,pitchX:n,pitchY:r,col:o,row:l}=this.pointerCell(t);let c;if("move"===e.mode)c={...i,x:Math.min(Math.max(o-e.offCol,0),Ce-i.w),y:Math.max(l-e.offRow,0)};else{const t=He[i.type];c={...i,w:Math.min(Math.max(Math.round((s-i.x*n)/n),t.minW),Ce-i.x),h:Math.min(Math.max(Math.round((a-i.y*r)/r),t.minH),40)}}if(c.x===i.x&&c.y===i.y&&c.w===i.w&&c.h===i.h)return;const d=this.page.widgets.map((t=>t.id===e.id?c:t));this.preview=De(d,e.id)}end(t){const e=this.gesture;if(!e||t.pointerId!==e.pointerId)return;this.move(t);const i=this.preview;if(this.gesture=void 0,this.preview=void 0,!i)return;const s=this.page.id;this.ctx.update((t=>{const e=t.pages.find((t=>t.id===s));e&&(e.widgets=De(i))}))}removeWidget(t){const e=this.page.id;this.ctx.update((i=>{const s=i.pages.find((t=>t.id===e));s&&(s.widgets=De(s.widgets.filter((e=>e.id!==t.id))))}))}renderWidget(t){const{ctx:e}=this;if(!e.allows(ta(t.type)))return Z`<div class="glass" style="height:100%;border-radius:var(--r-lg);display:grid;place-items:center;align-content:center;gap:6px;color:var(--text-2);text-align:center;padding:12px;--icon-size:26px">
        <sn-icon icon="lock"></sn-icon>
        <span style="font-size:14px">${e.t(`widget_${t.type}`)} · ${e.t("plan_needed",{plan:e.t(`plan_${Gs(ta(t.type))}`)})}</span>
      </div>`;switch(t.type){case"tile":return Z`<sn-w-tile .ctx=${e} .widget=${t}></sn-w-tile>`;case"floorplan":return Z`<sn-w-floorplan .ctx=${e} .widget=${t}></sn-w-floorplan>`;case"camera":return Z`<sn-w-camera .ctx=${e} .widget=${t}></sn-w-camera>`;case"heading":return Z`<sn-w-heading .ctx=${e} .widget=${t}></sn-w-heading>`;case"clock":return Z`<sn-w-clock .ctx=${e} .widget=${t}></sn-w-clock>`;case"modes":return Z`<sn-w-modes .ctx=${e} .widget=${t}></sn-w-modes>`;case"vacuum":return Z`<sn-w-vacuum .ctx=${e} .widget=${t}></sn-w-vacuum>`;case"visitors":return Z`<sn-w-visitors .ctx=${e} .widget=${t}></sn-w-visitors>`;case"energy":return Z`<sn-w-energy .ctx=${e} .widget=${t}></sn-w-energy>`;case"energy_stats":return Z`<sn-w-energy-stats .ctx=${e} .widget=${t}></sn-w-energy-stats>`;case"panic":return Z`<sn-w-panic .ctx=${e} .widget=${t}></sn-w-panic>`;case"check":return Z`<sn-w-check .ctx=${e} .widget=${t}></sn-w-check>`;case"family":return Z`<sn-w-family .ctx=${e} .widget=${t}></sn-w-family>`;case"todo":return Z`<sn-w-todo .ctx=${e} .widget=${t}></sn-w-todo>`;case"calendar":return Z`<sn-w-calendar .ctx=${e} .widget=${t}></sn-w-calendar>`;case"forecast":return Z`<sn-w-forecast .ctx=${e} .widget=${t}></sn-w-forecast>`;case"countdown":return Z`<sn-w-countdown .ctx=${e} .widget=${t}></sn-w-countdown>`;case"gauge":return Z`<sn-w-gauge .ctx=${e} .widget=${t}></sn-w-gauge>`;case"gate":return Z`<sn-w-gate .ctx=${e} .widget=${t}></sn-w-gate>`;case"frigate":return Z`<sn-w-frigate .ctx=${e} .widget=${t}></sn-w-frigate>`;case"schedule":return Z`<sn-w-schedule .ctx=${e} .widget=${t}></sn-w-schedule>`;case"media":return Z`<sn-w-media .ctx=${e} .widget=${t}></sn-w-media>`;case"remote":return Z`<sn-w-remote .ctx=${e} .widget=${t}></sn-w-remote>`;case"consumers":return Z`<sn-w-consumers .ctx=${e} .widget=${t}></sn-w-consumers>`;case"water":return Z`<sn-w-water .ctx=${e} .widget=${t}></sn-w-water>`;case"wake":return Z`<sn-w-wake .ctx=${e} .widget=${t}></sn-w-wake>`;case"chores":return Z`<sn-w-chores .ctx=${e} .widget=${t}></sn-w-chores>`;case"air":return Z`<sn-w-air .ctx=${e} .widget=${t}></sn-w-air>`;case"boiler":return Z`<sn-w-boiler .ctx=${e} .widget=${t}></sn-w-boiler>`;case"irrigation":return Z`<sn-w-irrigation .ctx=${e} .widget=${t}></sn-w-irrigation>`;case"timeline":return Z`<sn-w-timeline .ctx=${e} .widget=${t}></sn-w-timeline>`;case"internet":return Z`<sn-w-internet .ctx=${e} .widget=${t}></sn-w-internet>`;case"board":return Z`<sn-w-board .ctx=${e} .widget=${t}></sn-w-board>`;case"verse":return Z`<sn-w-verse .ctx=${e} .widget=${t}></sn-w-verse>`;case"radar":return Z`<sn-w-radar .ctx=${e} .widget=${t}></sn-w-radar>`;case"commute":return Z`<sn-w-commute .ctx=${e} .widget=${t}></sn-w-commute>`;case"parcels":return Z`<sn-w-parcels .ctx=${e} .widget=${t}></sn-w-parcels>`;default:return q}}renderChrome(t){const{t:e,narrow:i}=this.ctx,s=this.gesture?.id===t.id;return Z`
      ${i||"floorplan"===t.type?q:Z`<div
            class="surface"
            @pointerdown=${e=>this.start(e,t,"move")}
            @pointermove=${this.move}
            @pointerup=${this.end}
            @pointercancel=${this.end}
          ></div>`}
      ${i||"floorplan"!==t.type?q:Z`<button
            class="handle"
            aria-label="drag"
            @pointerdown=${e=>this.start(e,t,"move")}
            @pointermove=${this.move}
            @pointerup=${this.end}
            @pointercancel=${this.end}
          >
            <sn-icon icon="drag"></sn-icon>
          </button>`}
      ${s?q:Z`<button class="badge del pressable" aria-label=${e("delete")} @click=${()=>this.removeWidget(t)}>
              <sn-icon icon="minus"></sn-icon>
            </button>
            <button class="badge cog pressable" aria-label=${e("widget_settings")} @click=${()=>en(this.ctx,this.page.id,t.id)}>
              <sn-icon icon="cog"></sn-icon>
            </button>`}
      ${i?q:Z`<div
            class="resize"
            aria-label="resize"
            @pointerdown=${e=>this.start(e,t,"resize")}
            @pointermove=${this.move}
            @pointerup=${this.end}
            @pointercancel=${this.end}
          >
            <sn-icon icon="resize"></sn-icon>
          </div>`}
    `}render(){const{ctx:t}=this,e=this.widgets;if(!e.length)return Z`<div class="empty">
        <sn-icon icon="dashboard"></sn-icon>
        <strong>${t.t("empty_page")}</strong>
        ${t.isAdmin&&!t.editing?Z`<span>${t.t("empty_page_admin")}</span>`:q}
      </div>`;const i=t.narrow?[...e].sort(((t,e)=>t.y-e.y||t.x-e.x)):e;return Z`<div class="grid ${t.narrow?"narrow":""} ${t.editing?"editing":""}">
      ${ss(i,(t=>t.id),(e=>{const i=t.narrow?`grid-column: span ${(t=>"tile"===t.type&&t.w<=4?2:4)(e)}; grid-row: span ${"floorplan"===e.type?1:e.h}`:`grid-column: ${e.x+1} / span ${e.w}; grid-row: ${e.y+1} / span ${e.h}`;return Z`<div class="cell ${this.gesture?.id===e.id?"lifted":""}" data-id=${e.id} style=${i}>
            ${this.renderWidget(e)} ${t.editing?this.renderChrome(e):q}
          </div>`}))}
    </div>`}};Xl.styles=[si,o`
      :host {
        display: block;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(${Ce}, minmax(0, 1fr));
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
    `],Yl([gt({attribute:!1})],Xl.prototype,"ctx",2),Yl([gt({attribute:!1})],Xl.prototype,"page",2),Yl([mt()],Xl.prototype,"preview",2),Xl=Yl([pt("sn-page-grid")],Xl);var Kl=Object.defineProperty,Jl=Object.getOwnPropertyDescriptor,Gl=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?Jl(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&Kl(e,i,n),n};const Ql=[[4,"codes_4h"],[24,"codes_day"],[72,"codes_3days"],[168,"codes_week"]];let tc=class extends ct{constructor(){super(...arguments),this.lock="",this.zwave=!0,this.hours=24,this.busy=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}async load(){try{const t=await this.ctx.hass.callWS({type:"smartnest/codes/list"});this.codes=t.codes.filter((t=>!this.lock||t.lock===this.lock)),this.zwave=t.zwave}catch{this.codes=[]}}when(t){return new Date(1e3*t).toLocaleString(Dt[this.ctx.lang],{weekday:"short",day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})}share(t){const{t:e,hass:i,config:s}=this.ctx,a=e("codes_message",{name:t.name,lock:Kt(i,s,t.lock),code:t.code,from:this.when(t.from),until:this.when(t.until)});window.open(`https://wa.me/?text=${encodeURIComponent(a)}`,"_blank","noopener")}render(){const{t:t,hass:e,config:i}=this.ctx,s=this.lock?[this.lock]:Object.keys(e.states).filter((t=>t.startsWith("lock.")));return this.codes?Z`<div style="display:grid;gap:12px">
      ${this.zwave?q:Z`<p class="muted" style="margin:0;font-size:14px">${t("codes_need_zwave")}</p>`}
      ${this.codes.map((s=>Z`<div style="display:grid;gap:6px;padding:12px;border-radius:var(--r-md);background:var(--surface-2)">
          <div style="display:flex;align-items:center;gap:10px">
            <b style="flex:1">${s.name}</b>
            <span style="font:700 22px var(--font);letter-spacing:.12em;direction:ltr">${s.code}</span>
            <span class="muted" style="font-size:12px">${s.live?"🟢 "+t("codes_live"):"⏳ "+t("codes_later")}</span>
          </div>
          <span class="muted" style="font-size:13px">${this.when(s.from)} ← ${this.when(s.until)} · ${Kt(e,i,s.lock)}</span>
          <div style="display:flex;gap:8px">
            <button class="btn pressable" style="min-height:36px" @click=${()=>this.share(s)}><sn-icon icon="whatsapp" style="--icon-size:18px"></sn-icon>${t("codes_share")}</button>
            <button
              class="btn pressable"
              style="min-height:36px;color:var(--alert-text)"
              @click=${async()=>{await e.callWS({type:"smartnest/codes/remove",id:s.id}).catch((()=>{})),this.load()}}
            >
              ${t("delete")}
            </button>
          </div>
        </div>`))}
      <form
        style="display:grid;gap:10px"
        @submit=${async i=>{i.preventDefault();const s=i.currentTarget,a=new FormData(s),n=a.get("from")?Date.parse(String(a.get("from")))/1e3:Date.now()/1e3;this.busy=!0;try{const t=await e.callWS({type:"smartnest/codes/add",lock:String(a.get("lock")),name:String(a.get("name")).trim(),from:n,until:n+3600*this.hours,...String(a.get("code")??"").trim()?{code:String(a.get("code")).trim()}:{}});s.reset(),await this.load(),this.share(t)}catch(r){console.error("[smartnest] guest code",r),this.ctx.toast(t("no_slot"===r?.code?"codes_full":"error"))}this.busy=!1}}
      >
        <b>${t("codes_new")}</b>
        <input name="name" type="text" required placeholder=${t("codes_who")} />
        ${s.length>1?Z`<select name="lock">${s.map((t=>Z`<option value=${t}>${Kt(e,i,t)}</option>`))}</select>`:Z`<input type="hidden" name="lock" .value=${s[0]??""} />`}
        <label class="field">${t("codes_from")}<input name="from" type="datetime-local" /></label>
        <div class="seg">${Ql.map((([e,i])=>Z`<button type="button" aria-pressed=${this.hours===e} @click=${()=>this.hours=e}>${t(i)}</button>`))}</div>
        <input name="code" type="text" inputmode="numeric" pattern="[0-9]{4,8}" class="ltr" placeholder=${t("codes_auto")} />
        <button class="btn primary pressable" type="submit" ?disabled=${this.busy||!s.length}>${t("codes_make")}</button>
      </form>
    </div>`:Z`<span class="muted">${t("loading")}</span>`}};Gl([gt({attribute:!1})],tc.prototype,"ctx",2),Gl([gt()],tc.prototype,"lock",2),Gl([mt()],tc.prototype,"codes",2),Gl([mt()],tc.prototype,"zwave",2),Gl([mt()],tc.prototype,"hours",2),Gl([mt()],tc.prototype,"busy",2),tc=Gl([pt("sn-guest-codes")],tc);var ec=Object.defineProperty,ic=Object.getOwnPropertyDescriptor,sc=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?ic(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&ec(e,i,n),n};let ac=class extends ct{constructor(){super(...arguments),this.value=0,this.label="",this.icon="",this.fill="var(--accent)",this.onFill="var(--on-accent)",this.track="",this.small=!1}from(t){const e=t.currentTarget.getBoundingClientRect();return Math.round(100*Math.min(1,Math.max(0,(e.bottom-t.clientY)/e.height)))}set(t){this.drag=t,this.onPreview?.(t)}render(){const t=this.drag??this.value,e=void 0===this.drag&&void 0!==this.display?this.display:`${t}%`,i=!!this.track,s=!i&&t>12;return Z`<div
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
      ${i?Z`<div class="thumb" style="bottom:${t}%"></div>`:Z`<div class="fill" style="height:${t}%;background:${this.fill}"></div>`}
      <span class="val ${i?"on-track":""}">${e}</span>
      ${this.icon?Z`<sn-icon .icon=${this.icon} style="color:${s?this.onFill:i?"#fff":"var(--text-2)"}"></sn-icon>`:q}
    </div>`}};ac.styles=o`
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
  `,sc([gt({type:Number})],ac.prototype,"value",2),sc([gt()],ac.prototype,"label",2),sc([gt()],ac.prototype,"icon",2),sc([gt()],ac.prototype,"fill",2),sc([gt()],ac.prototype,"onFill",2),sc([gt()],ac.prototype,"track",2),sc([gt()],ac.prototype,"display",2),sc([gt({type:Boolean,reflect:!0})],ac.prototype,"small",2),sc([gt({attribute:!1})],ac.prototype,"onCommit",2),sc([gt({attribute:!1})],ac.prototype,"onPreview",2),sc([mt()],ac.prototype,"drag",2),ac=sc([pt("sn-vslider")],ac);var nc=Object.defineProperty,rc=Object.getOwnPropertyDescriptor,oc=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?rc(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&nc(e,i,n),n};let lc=class extends ct{from(t){const e=t.currentTarget.getBoundingClientRect(),i=t.clientX-(e.left+e.width/2),s=t.clientY-(e.top+e.height/2);let a=180*Math.atan2(s,i)/Math.PI;a=(360-a)%360;const n=Math.min(100,Math.hypot(i,s)/(e.width/2)*100);return[Math.round(a),Math.round(n)]}render(){const[t,e]=this.drag??this.hs??[0,0],i=-t*Math.PI/180,s=50+Math.cos(i)*e/2,a=50+Math.sin(i)*e/2;return Z`<div
      class="wheel ${this.drag?"dragging":""}"
      role="slider"
      aria-label="color"
      aria-valuenow=${t}
      @pointerdown=${t=>{t.currentTarget.setPointerCapture(t.pointerId),this.drag=this.from(t)}}
      @pointermove=${t=>this.drag&&(this.drag=this.from(t))}
      @pointerup=${()=>{const t=this.drag;this.drag=void 0,t&&this.onPick?.(t)}}
      @pointercancel=${()=>this.drag=void 0}
    >
      <div class="knob" style="left:${s}%;top:${a}%;background:${Yt(qt(t,e))}"></div>
    </div>`}};lc.styles=o`
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
  `,oc([gt({type:Array})],lc.prototype,"hs",2),oc([gt({attribute:!1})],lc.prototype,"onPick",2),oc([mt()],lc.prototype,"drag",2),lc=oc([pt("sn-color-wheel")],lc);var cc=Object.defineProperty,dc=Object.getOwnPropertyDescriptor,pc=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?dc(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&cc(e,i,n),n};let hc=class extends ct{constructor(){super(...arguments),this.length=4,this.prompt="",this.error="",this.value="",this.wrong=!1}submit(){const t=this.value;t&&(this.onSubmit(t)||(this.wrong=!0,navigator.vibrate?.([60,40,60]),this.value=""))}press(t){if(!this.length)return this.value.length<12&&(this.value+=t),void(this.wrong=!1);if(!(this.value.length>=this.length)&&(this.wrong=!1,this.value+=t,navigator.vibrate?.(4),this.value.length===this.length)){const t=this.value;window.setTimeout((()=>{this.onSubmit(t)||(this.wrong=!0,navigator.vibrate?.([60,40,60]),this.value="")}),120)}}render(){return Z`
      <div class="prompt ${this.wrong?"err":""}">${this.wrong?this.error:this.prompt}</div>
      <div class="dots ${this.wrong?"shake":""}" aria-hidden="true">
        ${Array.from({length:this.length||Math.max(4,this.value.length)},((t,e)=>Z`<span class="dot ${e<this.value.length?"on":""}"></span>`))}
      </div>
      <div class="keys">
        ${["1","2","3","4","5","6","7","8","9"].map((t=>Z`<button @click=${()=>this.press(t)}>${t}</button>`))}
        ${this.length?Z`<span></span>`:Z`<button class="ghost" aria-label="ok" @click=${()=>this.submit()}><sn-icon icon="check"></sn-icon></button>`}
        <button @click=${()=>this.press("0")}>0</button>
        <button class="ghost" aria-label="delete" @click=${()=>this.value=this.value.slice(0,-1)}>
          <sn-icon icon="backspace"></sn-icon>
        </button>
      </div>
    `}};hc.styles=o`
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
  `,pc([gt({type:Number})],hc.prototype,"length",2),pc([gt()],hc.prototype,"prompt",2),pc([gt()],hc.prototype,"error",2),pc([gt({attribute:!1})],hc.prototype,"onSubmit",2),pc([mt()],hc.prototype,"value",2),pc([mt()],hc.prototype,"wrong",2),hc=pc([pt("sn-pinpad")],hc);var uc=Object.defineProperty,gc=Object.getOwnPropertyDescriptor,mc=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?gc(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&uc(e,i,n),n};const fc=["hs","xy","rgb","rgbw","rgbww"],bc={brightness:"lightbulb",color:"palette",temp:"thermometer"},_c={brightness:"brightness",color:"color",temp:"white_temp"},yc=[[0,85],[24,90],[38,88],[52,75],[130,70],[190,80],[225,85],[275,70],[325,65]],vc={off:"power",cool:"snowflake",heat:"fire",auto:"air-conditioner",heat_cool:"air-conditioner",dry:"humidity",fan_only:"fan"};let xc=class extends ct{constructor(){super(...arguments),this.entityId="",this.lightTab="brightness",this.wheelOpen=!1,this.confirmUnlock=!1}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this.tick),window.clearTimeout(this.tempTimer),window.clearTimeout(this.confirmTimer)}updated(){const t=this.ctx.hass.states[this.entityId];yn(this.renderRoot.querySelector(".big-ic sn-icon"),t,this.prevState),this.prevState=t?.state}async loadTimer(){try{const t=await this.ctx.hass.callWS({type:"smartnest/timer/list"});this.timerDue=t[this.entityId]}catch{this.timerDue=void 0}}async loadLockLog(){try{const t=await this.ctx.hass.callWS({type:"logbook/get_events",start_time:new Date(Date.now()-2592e5).toISOString(),end_time:(new Date).toISOString(),entity_ids:[this.entityId]});this.lockLog=t.filter((t=>"locked"===t.state||"unlocked"===t.state||"jammed"===t.state)).reverse().slice(0,8)}catch{this.lockLog=[]}}firstUpdated(){"lock"===Xt(this.entityId)&&this.ctx.allows("lock_history")&&this.loadLockLog(),this.ctx.allows("timers")&&"toggle"===ee(this.entityId)&&(this.loadTimer(),this.tick=window.setInterval((()=>this.requestUpdate()),3e4));ce(this.ctx.hass.states[this.entityId])&&this.loadHistory()}async loadHistory(){try{const t=new Date(Date.now()-864e5).toISOString(),e=await this.ctx.hass.callWS({type:"history/history_during_period",start_time:t,entity_ids:[this.entityId],minimal_response:!0,no_attributes:!0,significant_changes_only:!1});let i=Date.parse(t)/1e3;this.history=(e[this.entityId]??[]).map((t=>(i=t.lu??t.lc??i,{t:i,v:Number(t.s)}))).filter((t=>!Number.isNaN(t.v)))}catch{this.history=[]}}call(t,e,i={}){navigator.vibrate?.(5),this.ctx.hass.callService(t,e,{entity_id:this.entityId,...i}).catch((()=>this.ctx.toast(this.ctx.t("error"))))}renderLight(t){const{t:e}=this.ctx,i=t.attributes.supported_color_modes??[];if(!i.some((t=>"onoff"!==t)))return this.renderPower(t);const s=["brightness"];i.some((t=>fc.includes(t)))&&s.push("color"),i.includes("color_temp")&&s.push("temp");const a=s.includes(this.lightTab)?this.lightTab:"brightness",n="on"===t.state,r=n?t.attributes.rgb_color:void 0,o=r?Yt(r):"var(--accent)",l=n?Math.round((t.attributes.brightness??255)/255*100):0;let c;if("brightness"===a)c=Z`<sn-vslider
        .value=${l}
        label=${e("brightness")}
        icon=${l?"lightbulb":"lightbulb-outline"}
        fill=${o}
        onFill=${r?Ft(Ut(r)):"var(--on-accent)"}
        .onCommit=${t=>t?this.call("light","turn_on",{brightness_pct:t}):this.call("light","turn_off")}
      ></sn-vslider>`;else if("color"===a){const i="color_temp"!==t.attributes.color_mode?t.attributes.hs_color:void 0,s=t=>!!i&&Math.abs((i[0]-t[0]+540)%360-180)<10&&Math.abs(i[1]-t[1])<12;c=Z`<div style="display:grid;gap:22px;justify-items:center">
        <div class="swatches">
          ${yc.map((t=>Z`<button
              class="swatch pressable"
              style="background:${Yt(qt(t[0],t[1]))}"
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
        ${this.wheelOpen?Z`<sn-color-wheel class="reveal" .hs=${i} .onPick=${t=>this.call("light","turn_on",{hs_color:t})}></sn-color-wheel>`:q}
      </div>`}else{const i=t.attributes.min_color_temp_kelvin??2e3,s=t.attributes.max_color_temp_kelvin??6500,a="color_temp"===t.attributes.color_mode?t.attributes.color_temp_kelvin:void 0,n="number"==typeof a?Math.round((a-i)/(s-i)*100):50,r=t=>50*Math.round((i+(s-i)*t/100)/50);c=Z`<sn-vslider
        .value=${n}
        label=${e("white_temp")}
        icon="lightbulb"
        track="linear-gradient(to top, #FFA94D, #FFE4C2 45%, #F4F7FF 75%, #BFD6FF)"
        .display=${"number"==typeof a?`${a}K`:"–"}
        .onCommit=${t=>this.call("light","turn_on",{color_temp_kelvin:r(t)})}
      ></sn-vslider>`}return Z`${c}
      ${this.ctx.allows("light_fx")&&i.some((t=>fc.includes(t)))?Cn(this.ctx,[t.entity_id]):q}
      ${s.length>1?Z`<div class="seg" role="tablist">
            ${s.map((t=>Z`<button role="tab" aria-pressed=${t===a} @click=${()=>this.lightTab=t}>
                <sn-icon .icon=${bc[t]} style="--icon-size:18px"></sn-icon>${e(_c[t])}
              </button>`))}
          </div>`:q}`}renderPower(t){const e=Gt(t);return Z`${this.renderPowerButton(t,e)}${e?q:function(t,e){const i=t.config.settings.tou;return i?.enabled&&t.allows("tou")&&"switch"===Xt(e)&&"cheap"!==xi(i)?Z`<button
    class="btn pressable"
    style="margin-top:8px"
    @click=${async()=>{const s=[...(await fi(t.hass,"later")??{jobs:[]}).jobs.filter((t=>t.entity!==e)),{id:String(Date.now()),entity:e,at:wi(i)}];await bi(t.hass,"later",{jobs:s}).catch((()=>{})),t.toast(t.t("tou_scheduled",{at:i.cheap_from}))}}
  >
    🌙 ${t.t("tou_later",{at:i.cheap_from})}
  </button>`:q}(this.ctx,t.entity_id)}`}renderPowerButton(t,e){return Z`<button
      class="power pressable ${e?"on":""}"
      aria-pressed=${e}
      aria-label=${this.ctx.t(e?"turn_off":"turn_on")}
      @click=${()=>this.call("homeassistant","toggle")}
    >
      <sn-icon icon="power"></sn-icon>
    </button>`}renderClimate(t){const{t:e,lang:i}=this.ctx,s=t.attributes.target_temp_step??("°F"===t.attributes.temperature_unit?1:.5),a=this.pendingTemp??t.attributes.temperature,n=t.attributes.min_temp??16,r=t.attributes.max_temp??30,o=t=>{if("number"!=typeof a)return;const e=Math.min(r,Math.max(n,Math.round((a+t)/s)*s));this.pendingTemp=e,window.clearTimeout(this.tempTimer),this.tempTimer=window.setTimeout((()=>{this.call("climate","set_temperature",{temperature:e}),window.setTimeout((()=>this.pendingTemp=void 0),1500)}),700)},l=t.attributes.hvac_modes??[];return Z`
      ${"number"==typeof a&&"off"!==t.state?Z`<div class="temp">
            <button class="icon-btn pressable" aria-label="-" @click=${()=>o(-s)}><sn-icon icon="minus"></sn-icon></button>
            <span class="value ltr">${ae(a,i)}°</span>
            <button class="icon-btn pressable" aria-label="+" @click=${()=>o(s)}><sn-icon icon="plus"></sn-icon></button>
          </div>`:this.renderPower(t)}
      ${"number"==typeof t.attributes.current_temperature?Z`<div class="sub">${e("current_temp")} ${se(`${ae(t.attributes.current_temperature,i)}°`)}</div>`:q}
      ${l.length?Z`<div class="seg">
            ${l.map((i=>Z`<button aria-pressed=${t.state===i} @click=${()=>this.call("climate","set_hvac_mode",{hvac_mode:i})}>
                <sn-icon .icon=${vc[i]??"air-conditioner"} style="--icon-size:18px"></sn-icon>${zt(i)?e(i):i}
              </button>`))}
          </div>`:q}
    `}renderVacuum(t){const e={id:"sheet",type:"vacuum",x:0,y:0,w:12,h:9,config:{entity:t.entity_id}};return Z`<sn-w-vacuum compact .ctx=${this.ctx} .widget=${e} style="width:100%"></sn-w-vacuum>`}renderCover(t){const{t:e}=this.ctx,i=t.attributes.supported_features??0,s=t.attributes.current_position,a=t.attributes.current_tilt_position,n=t=>!i||!!(i&t);return Z`${"number"==typeof s||"number"==typeof a?Z`<div class="controls">
            ${"number"==typeof s?Z`<sn-vslider
                  .value=${s}
                  label=${e("position")}
                  icon=${s?"blinds":"blinds-closed"}
                  .onCommit=${t=>this.call("cover","set_cover_position",{position:t})}
                ></sn-vslider>`:q}
            ${"number"==typeof a?Z`<div style="display:grid;gap:8px;justify-items:center">
                  <sn-vslider
                    small
                    .value=${a}
                    label=${e("tilt")}
                    icon="blinds"
                    fill="var(--cool)"
                    onFill="var(--on-cool)"
                    .onCommit=${t=>this.call("cover","set_cover_tilt_position",{tilt_position:t})}
                  ></sn-vslider>
                  <span class="sub">${e("tilt")}</span>
                </div>`:q}
          </div>`:q}
      <div class="actions">
        ${n(1)?Z`<button class="btn pressable" @click=${()=>this.call("cover","open_cover")}><sn-icon icon="chevron-up"></sn-icon>${e("cover_open")}</button>`:q}
        ${n(8)?Z`<button class="btn pressable" @click=${()=>this.call("cover","stop_cover")}><sn-icon icon="stop"></sn-icon>${e("stop")}</button>`:q}
        ${n(2)?Z`<button class="btn pressable" @click=${()=>this.call("cover","close_cover")}><sn-icon icon="chevron-down"></sn-icon>${e("cover_close")}</button>`:q}
      </div>`}alarm(t,e){if(!(!!t.attributes.code_format&&("alarm_disarm"===e||t.attributes.code_arm_required)))return this.call("alarm_control_panel",e);const{t:i}=this.ctx;this.ctx.showSheet({title:i("enter_code"),render:s=>Z`<sn-pinpad
        .length=${0}
        prompt=${i("enter_code")}
        error=${i("wrong_pin")}
        .onSubmit=${a=>(s.hass.callService("alarm_control_panel",e,{entity_id:t.entity_id,code:a}).catch((()=>s.toast(i("wrong_pin")))),s.closeSheet(),!0)}
      ></sn-pinpad>`})}renderAlarm(t){const{t:e}=this.ctx,i=t.attributes.supported_features??7;return"disarmed"===t.state?Z`<div class="actions">
        ${1&i?Z`<button class="btn primary pressable" @click=${()=>this.alarm(t,"alarm_arm_home")}><sn-icon icon="home"></sn-icon>${e("arm_home")}</button>`:q}
        ${2&i?Z`<button class="btn primary pressable" @click=${()=>this.alarm(t,"alarm_arm_away")}><sn-icon icon="leave"></sn-icon>${e("arm_away")}</button>`:q}
        ${4&i?Z`<button class="btn primary pressable" @click=${()=>this.alarm(t,"alarm_arm_night")}><sn-icon icon="night"></sn-icon>${e("arm_night")}</button>`:q}
      </div>`:Z`<button class="btn danger pressable lock-btn" @click=${()=>this.alarm(t,"alarm_disarm")}><sn-icon icon="lock-open"></sn-icon>${e("disarm")}</button>`}renderLockLog(){const t=this.lockLog;if(!t?.length)return q;const{t:e,lang:i}=this.ctx,s=Dt[i];return Z`<div style="width:100%;display:grid;gap:6px">
      <div class="sub" style="display:flex;gap:6px;align-items:center"><sn-icon icon="history" style="--icon-size:16px"></sn-icon>${e("history_lock")}</div>
      ${t.map((t=>Z`<div style="display:flex;justify-content:space-between;gap:12px;font-size:14px;padding:6px 10px;border-radius:10px;background:var(--surface-2)">
          <span style="display:inline-flex;gap:6px;align-items:center;color:${"unlocked"===t.state?"var(--accent-text)":"inherit"}">
            <sn-icon icon=${"unlocked"===t.state?"lock-open":"lock"} style="--icon-size:16px"></sn-icon>${e(t.state)}
          </span>
          <span class="muted ltr">${new Date(1e3*t.when).toLocaleString(s,{weekday:"short",hour:"2-digit",minute:"2-digit"})}</span>
        </div>`))}
    </div>`}renderLock(t){const{t:e}=this.ctx;return Z`${this.renderLockButton(t)}
    ${this.ctx.isAdmin&&this.ctx.allows("guest_codes")?Z`<button class="btn pressable" style="margin-top:8px" @click=${()=>{return e=this.ctx,i=t.entity_id,e.showSheet({title:e.t("codes_title"),render:t=>Z`<sn-guest-codes .ctx=${t} .lock=${i}></sn-guest-codes>`});var e,i}}>
          <sn-icon icon="key" style="--icon-size:18px"></sn-icon>${e("codes_title")}
        </button>`:q}`}renderLockButton(t){const{t:e}=this.ctx;return"unlocked"===t.state||"open"===t.state?Z`<button class="btn primary pressable lock-btn" @click=${()=>this.call("lock","lock")}><sn-icon icon="lock"></sn-icon>${e("lock")}</button>`:this.confirmUnlock?Z`<button
        class="btn danger pressable lock-btn"
        @click=${()=>{this.confirmUnlock=!1,this.call("lock","unlock")}}
      >
        <sn-icon icon="lock-open"></sn-icon>${e("unlock_confirm")}
      </button>`:Z`<button
      class="btn pressable lock-btn"
      @click=${()=>{this.confirmUnlock=!0,window.clearTimeout(this.confirmTimer),this.confirmTimer=window.setTimeout((()=>this.confirmUnlock=!1),4e3)}}
    >
      <sn-icon icon="lock-open"></sn-icon>${e("unlock")}
    </button>`}renderChart(t){const e=this.history;if(!e||e.length<2)return q;const{lang:i,t:s}=this.ctx,a=e[0].t,n=Date.now()/1e3,r=e.map((t=>t.v)),o=Math.min(...r),l=Math.max(...r),c=l-o||1,d=t=>100-(t-o)/c*90-5;let p=`M0 ${d(e[0].v)}`;for(let g=1;g<e.length;g++)p+=` H${h=e[g].t,(h-a)/(n-a||1)*300} V${d(e[g].v)}`;var h;p+=" H300";const u=t.attributes.unit_of_measurement??"";return Z`<div class="chart">
      <div class="sub">${s("history_24h")}</div>
      <svg viewBox="0 0 300 100" preserveAspectRatio="none" class="ltr">
        ${F`<path d="${p} V100 H0 Z" fill="var(--accent)" opacity=".14"></path>
        <path d=${p} fill="none" stroke="var(--accent)" stroke-width="2" vector-effect="non-scaling-stroke" stroke-linejoin="round"></path>`}
      </svg>
      <div class="labels ltr"><span>${ae(o,i)} ${u}</span><span>${ae(l,i)} ${u}</span></div>
    </div>`}renderTimer(t){if(!this.ctx.allows("timers")||"toggle"!==ee(t.entity_id)||!Gt(t))return q;const{t:e}=this.ctx;if(this.timerDue&&Date.parse(this.timerDue)>Date.now())return Z`<div class="actions">
        <span class="btn" style="background:color-mix(in srgb,var(--accent) 16%,transparent);color:var(--accent-text)">
          <sn-icon icon="clock-outline"></sn-icon>${e("timer_left",{in:Gn(e,new Date(this.timerDue))})}
        </span>
        <button
          class="icon-btn pressable"
          aria-label=${e("cancel")}
          @click=${()=>this.ctx.hass.callWS({type:"smartnest/timer/cancel",entity_id:t.entity_id}).then((()=>this.timerDue=void 0))}
        >
          <sn-icon icon="close" style="--icon-size:18px"></sn-icon>
        </button>
      </div>`;const i=[[15,e("min_short",{n:15})],[30,e("min_short",{n:30})],[60,e("hour_short",{n:1})],[120,e("hour_short",{n:2})]];return Z`<div class="opt" style="display:grid;gap:6px;justify-items:center;font-size:13px;color:var(--text-2)">
      ${e("timer_off_in")}
      <div class="seg">
        ${i.map((([i,s])=>Z`<button
            @click=${()=>this.ctx.hass.callWS({type:"smartnest/timer/set",entity_id:t.entity_id,minutes:i}).then((t=>{navigator.vibrate?.(6),this.timerDue=t.due})).catch((()=>this.ctx.toast(e("error"))))}
          >
            ${s}
          </button>`))}
      </div>
    </div>`}renderBody(t){switch(Xt(t.entity_id)){case"light":return this.renderLight(t);case"climate":return this.renderClimate(t);case"vacuum":return this.renderVacuum(t);case"cover":return this.renderCover(t);case"lock":return Z`${this.renderLock(t)} ${this.renderLockLog()}`;case"alarm_control_panel":return this.renderAlarm(t);case"camera":{const e=En(this.ctx.hass,t.entity_id);return e?Z`<div class="live"><img src=${e} alt="" /></div>`:q}case"sensor":return this.renderChart(t);case"switch":case"fan":case"input_boolean":case"media_player":case"automation":case"humidifier":case"siren":return this.renderPower(t);case"scene":case"script":return Z`<button class="btn primary pressable" @click=${()=>this.call(Xt(t.entity_id),"turn_on")}>
          <sn-icon icon="play"></sn-icon>${this.ctx.t("start")}
        </button>`;default:return q}}render(){const{ctx:t}=this,e=t.hass.states[this.entityId];if(!e)return Z`<div class="sub">${t.t("unavailable")}</div>`;if("vacuum"===Xt(e.entity_id)&&"unavailable"!==e.state)return this.renderVacuum(e);const i=Gt(e),s="unavailable"===e.state;return Z`
      <div class="head">
        <span class="big-ic ${i?"on":""}" style=${Qt(e)}>
          <sn-icon class=${bn(e)} .icon=${te(e,this.entityId)}></sn-icon>
        </span>
        <span class="state">${re(t.t,e,t.lang)}</span>
        <span class="sub">${t.t("last_changed")} ${le(t.t,e.last_changed)}</span>
      </div>
      ${s?q:this.renderBody(e)} ${s?q:this.renderTimer(e)}
    `}};xc.styles=[si,fn,o`
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
    `],mc([gt({attribute:!1})],xc.prototype,"ctx",2),mc([gt()],xc.prototype,"entityId",2),mc([mt()],xc.prototype,"lightTab",2),mc([mt()],xc.prototype,"wheelOpen",2),mc([mt()],xc.prototype,"pendingTemp",2),mc([mt()],xc.prototype,"confirmUnlock",2),mc([mt()],xc.prototype,"history",2),mc([mt()],xc.prototype,"timerDue",2),mc([mt()],xc.prototype,"lockLog",2),xc=mc([pt("sn-entity-detail")],xc);var wc=Object.defineProperty,$c=Object.getOwnPropertyDescriptor,kc=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?$c(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&wc(e,i,n),n};let Cc=class extends ct{constructor(){super(...arguments),this.at=new Date,this.silent=!1,this.confirm=!1,this.looking=!1}connectedCallback(){super.connectedCallback();const t=this.ctx.config.settings.doorbell.camera_entity;t&&this.ctx.allows("ai_doorbell")&&Ui(this.ctx.hass)&&(this.looking=!0,window.setTimeout((()=>qi(this.ctx,"doorbell",{camera:t}).then((t=>{this.seen=t,this.looking=!1}))),1200)),t&&this.ctx.allows("faces")&&window.setTimeout((()=>this.recognise(t)),2500),this.silent||function(){try{const t=new AudioContext,e=(e,i)=>{const s=t.createOscillator(),a=t.createGain();s.type="sine",s.frequency.value=e,a.gain.setValueAtTime(1e-4,t.currentTime+i),a.gain.exponentialRampToValueAtTime(.35,t.currentTime+i+.02),a.gain.exponentialRampToValueAtTime(1e-4,t.currentTime+i+1.2),s.connect(a).connect(t.destination),s.start(t.currentTime+i),s.stop(t.currentTime+i+1.3)};e(659.25,0),e(523.25,.45),window.setTimeout((()=>t.close()),2500)}catch{}}(),navigator.vibrate?.([120,80,120])}async recognise(t){try{const e=await this.ctx.hass.callWS({type:"frigate/events/get",instance_id:"frigate",cameras:[t.split(".")[1]],after:Math.floor(Date.now()/1e3)-180,limit:5}),i=("string"==typeof e?JSON.parse(e):e).map((t=>Array.isArray(t.sub_label)?t.sub_label[0]:t.sub_label)).find(Boolean);i&&(this.known=i)}catch{}}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this.timer)}render(){const{ctx:t}=this,{t:e}=t,i=t.config.settings.doorbell,s=i.camera_entity,a=s?En(t.hass,s)??Wn(t.hass,s,Date.now()):void 0,n=i.lock_entity?t.hass.states[i.lock_entity]:void 0;return Z`<div class="scrim" @click=${t=>t.target===t.currentTarget&&this.onDismiss()}>
      <div class="card" role="alertdialog" aria-label=${e("someone_at_door")}>
        ${a?Z`<div class="video"><img src=${a} alt="" /><span class="live">${e("streaming")}</span></div>`:q}
        <div class="foot">
          <span class="bell"><sn-icon icon="bell-ring"></sn-icon></span>
          <span class="title">
            <strong>${e("someone_at_door")}</strong>
            <span class="muted">${s?Kt(t.hass,t.config,s)+" · ":""}${this.at.toLocaleTimeString(Dt[t.lang],{hour:"2-digit",minute:"2-digit"})}</span>
            ${this.known?Z`<span class="seen">👋 ${this.ctx.t("face_hello",{name:this.known})}</span>`:q}
            ${this.looking?Z`<span class="seen shimmer">✨ ${e("ai_looking")}</span>`:this.seen?Z`<span class="seen">✨ ${this.seen}</span>`:q}
          </span>
          <button class="btn pressable" @click=${()=>this.onDismiss()}>${e("dismiss")}</button>
          ${n&&"unlocked"!==n.state?this.confirm?Z`<button
                  class="btn danger pressable"
                  @click=${()=>{t.hass.callService("lock","unlock",{entity_id:n.entity_id}).catch((()=>t.toast(e("error")))),this.onDismiss()}}
                >
                  <sn-icon icon="lock-open"></sn-icon>${e("unlock_confirm")}
                </button>`:Z`<button
                  class="btn primary pressable"
                  @click=${()=>{this.confirm=!0,window.clearTimeout(this.timer),this.timer=window.setTimeout((()=>this.confirm=!1),4e3)}}
                >
                  <sn-icon icon="lock-open"></sn-icon>${e("open_door")}
                </button>`:q}
        </div>
      </div>
    </div>`}};Cc.styles=[si,o`
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
      .seen {
        font-size: 15px;
        font-weight: 500;
        color: var(--accent-text);
        unicode-bidi: plaintext;
        animation: seen-in 360ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .shimmer {
        opacity: 0.7;
        animation: breathe 1.4s ease-in-out infinite;
      }
      @keyframes seen-in {
        from {
          opacity: 0;
          transform: translateY(6px);
        }
      }
      @keyframes breathe {
        50% {
          opacity: 0.35;
        }
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
    `],kc([gt({attribute:!1})],Cc.prototype,"ctx",2),kc([gt({attribute:!1})],Cc.prototype,"at",2),kc([gt({attribute:!1})],Cc.prototype,"onDismiss",2),kc([gt({type:Boolean})],Cc.prototype,"silent",2),kc([mt()],Cc.prototype,"confirm",2),kc([mt()],Cc.prototype,"seen",2),kc([mt()],Cc.prototype,"looking",2),kc([mt()],Cc.prototype,"known",2),Cc=kc([pt("sn-doorbell")],Cc);var Mc=Object.defineProperty,Ac=Object.getOwnPropertyDescriptor,Hc=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?Ac(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&Mc(e,i,n),n};const Lc=["20% 30%","80% 25%","70% 80%","25% 75%","50% 50%"];let Vc=class extends ct{constructor(){super(...arguments),this.guests=!1,this.now=new Date,this.drift={x:0,y:0},this.slides=[],this.photos=[],this.photoIdx=0,this.alive=!1}connectedCallback(){super.connectedCallback(),this.alive=!0,this.timer=window.setInterval((()=>{this.now=new Date,this.now.getSeconds()<10&&(this.drift={x:Math.round(60*Math.random()-30),y:Math.round(40*Math.random()-20)})}),1e4),this.loadPhotos()}disconnectedCallback(){super.disconnectedCallback(),this.alive=!1,window.clearInterval(this.timer),window.clearTimeout(this.photoTimer)}async loadPhotos(){const t=this.ctx.config.settings.screensaver;if(t.photos&&this.ctx.allows("photo_frame")){try{const e=await this.ctx.hass.callWS({type:"media_source/browse_media",media_content_id:t.photo_folder.startsWith("media-source://")?t.photo_folder:`media-source://media_source/local/${t.photo_folder}`});this.photos=(e.children??[]).filter((t=>"image"===t.media_class||"video"===t.media_class)).map((t=>({id:t.media_content_id,video:"video"===t.media_class})))}catch{this.photos=[]}for(let t=this.photos.length-1;t>0;t--){const e=Math.floor(Math.random()*(t+1));[this.photos[t],this.photos[e]]=[this.photos[e],this.photos[t]]}this.photos.length&&this.next()}}async next(){if(!this.alive||!this.photos.length)return;const{id:t,video:e}=this.photos[this.photoIdx++%this.photos.length],i=Math.max(5,this.ctx.config.settings.screensaver.photo_seconds);try{const{url:i}=await this.ctx.hass.callWS({type:"media_source/resolve_media",media_content_id:t}),s=this.ctx.hass.hassUrl(i);if(e||await new Promise(((t,e)=>{const i=new Image;i.onload=()=>t(),i.onerror=()=>e(),i.src=s})),!this.alive)return;const a={url:s,key:Date.now(),origin:Lc[this.photoIdx%Lc.length],video:e};this.slides=[...this.slides.slice(-1),a]}catch{}this.photoTimer=window.setTimeout((()=>this.next()),1e3*i)}renderAnalog(){const t=this.now,e=t.getMinutes()+t.getSeconds()/60,i=t.getHours()%12+e/60;return Z`<svg viewBox="0 0 200 200" style="width:min(56vmin,420px);height:auto;filter:drop-shadow(0 10px 30px rgba(0,0,0,.35))" aria-label=${t.toLocaleTimeString()}>
      ${F`<circle cx="100" cy="100" r="96" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.18)" stroke-width="1.5"></circle>
      ${Array.from({length:12},((t,e)=>F`<line x1="100" y1="10" x2="100" y2=${e%3?18:24} stroke=${e%3?"rgba(255,255,255,.35)":"#E9971D"} stroke-width=${e%3?2:4} stroke-linecap="round" transform="rotate(${30*e} 100 100)"></line>`))}
      <line x1="100" y1="100" x2="100" y2="52" stroke="#fff" stroke-width="7" stroke-linecap="round" style="transform:rotate(${30*i}deg);transform-origin:100px 100px;transition:transform 1s cubic-bezier(0.22,1,0.36,1)"></line>
      <line x1="100" y1="100" x2="100" y2="26" stroke="#fff" stroke-width="4" stroke-linecap="round" style="transform:rotate(${6*e}deg);transform-origin:100px 100px;transition:transform 1s cubic-bezier(0.22,1,0.36,1)"></line>
      <circle cx="100" cy="100" r="6" fill="#E9971D"></circle>`}
    </svg>`}renderClock(t,e){const{ctx:i}=this,s=i.allows("clock_styles")?i.config.settings.screensaver.style:"classic";if("analog"===s&&!e)return Z`<div class="center" style="transform:translate(${this.drift.x}px, ${this.drift.y}px)">
        ${this.renderAnalog()}
        <div class="date">${this.now.toLocaleDateString(t,{weekday:"long",day:"numeric",month:"long"})}</div>
      </div>`;if("minimal"===s&&!e)return Z`<div class="center" style="transform:translate(${this.drift.x}px, ${this.drift.y}px)">
        <div class="time ltr" style="font-weight:400;letter-spacing:.04em;opacity:.9">${this.now.toLocaleTimeString(t,{hour:"2-digit",minute:"2-digit"})}</div>
      </div>`;const a=i.config.settings.screensaver.temp_entity,n=a?i.hass.states[a]:void 0;return Z`<div class=${e?"corner":"center"} style="transform:translate(${this.drift.x}px, ${this.drift.y}px)">
      <div class="time ltr">${this.now.toLocaleTimeString(t,{hour:"2-digit",minute:"2-digit"})}</div>
      <div class="date">${this.now.toLocaleDateString(t,{weekday:"long",day:"numeric",month:"long"})}</div>
      ${n?Z`<div class="temp ltr">${oe(i.t,n,i.lang)}</div>`:q}
    </div>`}render(){const{ctx:t}=this,e=Dt[t.lang],i=this.slides.length>0,s=Math.max(5,t.config.settings.screensaver.photo_seconds)+2;return Z`<div
      class="ss ${i?"photos":""}"
      style="--gx:${30+this.drift.x/2}%;--gy:${55+this.drift.y/2}%"
      @click=${t=>{t.stopPropagation(),this.onWake()}}
    >
      ${ss(this.slides,(t=>t.key),((t,e)=>t.video?Z`<video class="photo ${e<this.slides.length-1?"out":""}" src=${t.url} autoplay muted loop playsinline style="object-fit:cover;width:100%;height:100%;animation-name:in"></video>`:Z`<div
                class="photo ${e<this.slides.length-1?"out":""}"
                style="background-image:url('${t.url}');transform-origin:${t.origin};--dur:${s}s"
              ></div>`))}
      ${i?Z`<div class="shade"></div>`:q} ${this.renderClock(e,i)}
      ${this.guests?Z`<sn-guests dim .ctx=${t} style="position:absolute;top:32px;inset-inline-end:32px;max-width:min(560px,80vw)"></sn-guests>`:q}
      ${t.allows("seasons")?Z`<sn-season .season=${ar(t.config.settings,this.now)}></sn-season>`:q}
      <div class="brand">
        <img src="${t.assetBase}logo/smartnest-symbol-white.svg" alt="" />
        <span>SmartNest${i?"":Z` · ${t.t("tagline")}`}</span>
      </div>
    </div>`}};Vc.styles=[si,o`
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
        font-weight: var(--display-weight, 700);
        letter-spacing: var(--display-track, 0);
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
        font-weight: var(--display-weight, 700);
        letter-spacing: var(--display-track, 0);
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
    `],Hc([gt({attribute:!1})],Vc.prototype,"ctx",2),Hc([gt({attribute:!1})],Vc.prototype,"onWake",2),Hc([gt({type:Boolean})],Vc.prototype,"guests",2),Hc([mt()],Vc.prototype,"now",2),Hc([mt()],Vc.prototype,"drift",2),Hc([mt()],Vc.prototype,"slides",2),Vc=Hc([pt("sn-screensaver")],Vc);var Sc=Object.defineProperty,zc=Object.getOwnPropertyDescriptor,Dc=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?zc(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&Sc(e,i,n),n};function Oc(t,e){const i={particles:"none",density:0,clouds:0,sun:!1,moon:!1,fog:!1,lightning:!1},s=e?{particles:"stars",density:.5,moon:!0}:{sun:!0};switch(t){case"sunny":case"clear-night":return{...i,...s};case"partlycloudy":return{...i,...s,clouds:1};case"cloudy":return{...i,clouds:3};case"windy":case"windy-variant":return{...i,clouds:2};case"fog":return{...i,fog:!0,clouds:1};case"rainy":return{...i,particles:"rain",density:.9,clouds:2};case"pouring":return{...i,particles:"rain",density:2.2,clouds:3};case"lightning":return{...i,clouds:3,lightning:!0};case"lightning-rainy":return{...i,particles:"rain",density:1.6,clouds:3,lightning:!0};case"snowy":case"snowy-rainy":case"hail":return{...i,particles:"snow",density:.6,clouds:2};default:return e?{...i,...s}:i}}let jc=class extends ct{constructor(){super(...arguments),this.condition="",this.night=!1,this.dark=!1,this.rising=!1,this.raf=0,this.parts=[],this.scene=Oc("",!1),this.last=0,this.flash=0,this.reduced=matchMedia("(prefers-reduced-motion: reduce)").matches,this.onVisible=()=>{cancelAnimationFrame(this.raf),"visible"===document.visibilityState&&this.loop(0)},this.loop=t=>{const e=this.canvas,i=e?.getContext("2d");e&&i&&((t-this.last>=33||0===t)&&(this.last=t,this.draw(i,e,t)),this.reduced||!this.parts.length&&!this.scene.lightning||(this.raf=requestAnimationFrame(this.loop)))}}connectedCallback(){super.connectedCallback(),document.addEventListener("visibilitychange",this.onVisible)}disconnectedCallback(){super.disconnectedCallback(),cancelAnimationFrame(this.raf),this.ro?.disconnect(),document.removeEventListener("visibilitychange",this.onVisible)}updated(t){(t.has("condition")||t.has("night"))&&(this.scene=Oc(this.condition,this.night),this.seed()),this.ro||(this.ro=new ResizeObserver((()=>this.seed())),this.ro.observe(this)),cancelAnimationFrame(this.raf),this.loop(0)}get canvas(){return this.renderRoot.querySelector("canvas")}seed(){const t=this.canvas;if(!t)return;const e=Math.min(window.devicePixelRatio||1,1.5);t.width=Math.round(t.clientWidth*e),t.height=Math.round(t.clientHeight*e);const{particles:i,density:s}=this.scene,a="none"===i?0:Math.min(350,Math.round(t.clientWidth*t.clientHeight/1e4*s));this.parts=Array.from({length:a},(()=>({x:Math.random()*t.width,y:Math.random()*t.height,v:"rain"===i?9+7*Math.random():"snow"===i?.6+1.2*Math.random():Math.random()*Math.PI*2,s:"stars"===i?.5+1.4*Math.random():"snow"===i?1.5+2.5*Math.random():10+14*Math.random(),a:.25+.55*Math.random()})))}draw(t,e,i){t.clearRect(0,0,e.width,e.height);const{particles:s}=this.scene,a=e.width/(e.clientWidth||1);if("rain"===s){t.strokeStyle=this.dark?"rgba(180,210,255,1)":"rgba(70,100,130,1)",t.lineWidth=1.2*a,t.lineCap="round";for(const i of this.parts)t.globalAlpha=i.a*(this.dark?.45:.3),t.beginPath(),t.moveTo(i.x,i.y),t.lineTo(i.x-.18*i.s*a,i.y+i.s*a),t.stroke(),i.y+=i.v*a,i.x-=.18*i.v*a,i.y>e.height&&(i.y=-i.s*a,i.x=Math.random()*e.width*1.2)}else if("snow"===s){t.fillStyle=this.dark?"#fff":"rgba(150,170,190,1)";for(const s of this.parts)t.globalAlpha=.8*s.a,t.beginPath(),t.arc(s.x+12*Math.sin(i/1400+s.y/60)*a,s.y,s.s*a,0,2*Math.PI),t.fill(),s.y+=s.v*a,s.y>e.height+10&&(s.y=-10,s.x=Math.random()*e.width)}else if("stars"===s){t.fillStyle="#fff";for(const e of this.parts)t.globalAlpha=(this.dark?.85:.35)*(.45+.55*Math.abs(Math.sin(i/1800+e.v))),t.beginPath(),t.arc(e.x,.7*e.y,e.s*a,0,2*Math.PI),t.fill()}if(t.globalAlpha=1,this.scene.lightning&&!this.reduced&&i>this.flash){this.flash=i+6e3+8e3*Math.random();const t=this.renderRoot.querySelector(".flash");t?.animate([{opacity:0},{opacity:.9},{opacity:.1},{opacity:.6},{opacity:0}],{duration:650,easing:"ease-out"})}}skyTint(){const t=this.elevation;if(void 0===t)return;const e=this.dark?1:.7;return`linear-gradient(to bottom, ${t<-6?`rgba(30,45,90,${.32*e})`:t<0?this.rising?`rgba(255,140,150,${.3*e})`:`rgba(150,90,170,${.3*e})`:t<10?`rgba(255,180,90,${.26*e})`:`rgba(120,185,255,${.14*e})`}, transparent 65%)`}render(){const t=this.scene,e=this.skyTint(),i=this.dark?"rgba(140,155,170,.18)":"rgba(255,255,255,.55)";return Z`<div style="--cloud:${i}">
      ${e?Z`<div class="sky" style="background:${e}"></div>`:q}
      ${t.sun?Z`<div class="sun"></div>`:q} ${t.moon?Z`<div class="moon"></div>`:q}
      ${Array.from({length:t.clouds},((t,e)=>Z`<div class="cloud" style="top:${8+22*e}%;animation-duration:${90+35*e}s;animation-delay:-${31*e}s"></div>`))}
      ${t.fog?Z`<div class="fog"></div>`:q}
      <canvas></canvas>
      <div class="flash"></div>
    </div>`}};jc.styles=o`
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
    .sky {
      position: absolute;
      inset: 0;
      transition: background 4s cubic-bezier(0.77, 0, 0.175, 1);
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
  `,Dc([gt()],jc.prototype,"condition",2),Dc([gt({type:Boolean})],jc.prototype,"night",2),Dc([gt({type:Boolean})],jc.prototype,"dark",2),Dc([gt({type:Number})],jc.prototype,"elevation",2),Dc([gt({type:Boolean})],jc.prototype,"rising",2),jc=Dc([pt("sn-weather-bg")],jc);var Tc=Object.defineProperty,Pc=Object.getOwnPropertyDescriptor,Nc=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?Pc(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&Tc(e,i,n),n};const Ic={away:"scene_away",home:"scene_home",sleep:"scene_sleep",evening:"scene_evening",cinema:"scene_cinema"},Wc={away:4200,home:3e3,sleep:3800,evening:3e3,cinema:3200};let Ec=class extends ct{constructor(){super(...arguments),this.mode="",this.locks=[]}connectedCallback(){super.connectedCallback(),this.locks="away"===this.mode?function(t){const e=new Set;for(const s of t.config.pages)for(const t of s.widgets){t.config.entity&&e.add(t.config.entity);for(const i of t.config.floors??[])for(const t of i.markers??[])e.add(t.entity)}const i=[...e].filter((e=>"lock"===Xt(e)&&t.hass.states[e]));return(i.length?i:Object.keys(t.hass.states).filter((t=>"lock"===Xt(t)))).slice(0,4)}(this.ctx):[],this.timer=window.setTimeout((()=>this.onDone()),Wc[this.mode]??3e3)}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this.timer)}renderSleep(){const t=Array.from({length:40},((t,e)=>({x:137.5*e%100,y:61.8*e%60,d:e%7*.25})));return Z`<div class="moon"></div>
      ${t.map((t=>Z`<span class="star" style="left:${t.x}%;top:${t.y}%;animation-delay:${.6+t.d}s"></span>`))}`}renderAway(){const{ctx:t}=this;return this.locks.length?Z`<div class="locks">
      ${this.locks.map(((e,i)=>{const s=.9+.45*i+"s";return Z`<div class="lock" style="animation-delay:${s}">
          <span class="ic" style="animation-delay:${s}"><sn-icon icon="lock"></sn-icon></span>
          ${Kt(t.hass,t.config,e)}
          <sn-icon class="ok" icon="check-circle" style="animation-delay:calc(${s} + 0.35s)"></sn-icon>
        </div>`}))}
    </div>`:q}render(){const{t:t}=this.ctx;return Z`<div
      class="stage ${this.mode}"
      style="--len:${Wc[this.mode]??3e3}ms"
      role="status"
      @click=${()=>this.onDone()}
    >
      ${"sleep"===this.mode?this.renderSleep():q}
      <div class="content">
        <div class="title">${"cinema"===this.mode?"🍿 ":""}${t(Ic[this.mode]??"done")}</div>
        ${"away"===this.mode?Z`${this.locks.length?Z`<div class="sub">${t("scene_locking")}</div>`:q}${this.renderAway()}`:q}
      </div>
    </div>`}};Ec.styles=[si,o`
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
      /* Cinema: lights go down, a projector beam opens from above */
      .cinema {
        background: #050608;
      }
      .cinema::before {
        content: "";
        position: absolute;
        top: -10%;
        left: 50%;
        width: 140vmax;
        height: 120vh;
        transform: translateX(-50%);
        background: conic-gradient(from 165deg at 50% 0%, transparent 0deg, rgba(255, 236, 200, 0.22) 15deg, rgba(255, 236, 200, 0.05) 30deg, transparent 30deg);
        animation: beam 2.4s cubic-bezier(0.77, 0, 0.175, 1) both;
      }
      @keyframes beam {
        from {
          opacity: 0;
          transform: translateX(-50%) scaleX(0.2);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .moon,
        .lock,
        .title {
          animation: none;
        }
      }
    `],Nc([gt({attribute:!1})],Ec.prototype,"ctx",2),Nc([gt()],Ec.prototype,"mode",2),Nc([gt({attribute:!1})],Ec.prototype,"onDone",2),Ec=Nc([pt("sn-cinematic")],Ec);var Rc=Object.defineProperty,Bc=Object.getOwnPropertyDescriptor,Zc=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?Bc(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&Rc(e,i,n),n};const Fc="smartnest-morning",Uc=()=>(new Date).toDateString();async function qc(t){const{hass:e,t:i,config:s}=t,a=s.settings,[n,r]=a.dark_from.split(":").map(Number),o=new Date;o.setDate(o.getDate()-1),o.setHours(n,r,0,0);const l=a.doorbell.trigger_entity,c=ki(s).filter((t=>{const i=e.states[t];if(!i)return!1;const s=Xt(t);return"vacuum"===s||"binary_sensor"===s&&["door","opening","garage_door"].includes(i.attributes.device_class)}));l&&c.push(l);let d=[];if(c.length)try{d=await e.callWS({type:"logbook/get_events",start_time:o.toISOString(),end_time:(new Date).toISOString(),entity_ids:c})}catch{d=[]}const p=[];if(l){const t=d.filter((t=>t.entity_id===l&&(l.startsWith("event.")||"on"===t.state))).length;t&&p.push(1===t?i("night_doorbell_1"):i("night_doorbell_n",{n:t}))}for(const h of c.filter((t=>t.startsWith("binary_sensor."))).slice(0,3)){const t=d.filter((t=>t.entity_id===h&&"on"===t.state)).length,a=Kt(e,s,h);t&&p.push(1===t?i("night_door_1",{name:a}):i("night_door_n",{name:a,n:t}))}d.some((t=>t.entity_id.startsWith("vacuum.")&&"cleaning"===t.state))&&p.push(i("night_robot"));for(const h of ki(s).filter((t=>"lock"===Xt(t)&&"unlocked"===e.states[t]?.state)))p.push(i("night_unlocked",{name:Kt(e,s,h)}));return p.length?p:[i("night_quiet")]}let Yc=class extends ct{constructor(){super(...arguments),this.forecast={}}connectedCallback(){super.connectedCallback();const t=this.ctx.config.settings.weather.entity;t&&this.ctx.hass.states[t]&&Qn(this.ctx.hass,t).then((t=>this.forecast=t));const e=t&&this.ctx.hass.states[t]?Qn(this.ctx.hass,t):Promise.resolve({});Promise.all([qc(this.ctx),e]).then((([t,e])=>{this.lines=t,this.ctx.allows("ai_summary")&&Ui(this.ctx.hass)&&qi(this.ctx,"summary",{facts:this.facts(t,e)}).then((t=>this.ai=t))})),this.timer=window.setTimeout((()=>this.onDone()),6e4)}facts(t,e){const{hass:i,config:s}=this.ctx,a=[...t],n=s.settings.weather.entity?i.states[s.settings.weather.entity]:void 0;n&&a.push(`Weather now: ${n.state}, ${n.attributes.temperature}°. Today high ${e.high??"?"}°, low ${e.low??"?"}°, ${e.condition??""}`);const r=ki(s),o=r.filter((t=>{const e=i.states[t];return e&&"binary_sensor"===Xt(t)&&["door","window","opening","garage_door"].includes(e.attributes.device_class)&&"on"===e.state}));o.length&&a.push(`Open right now: ${o.map((t=>Kt(i,s,t))).join(", ")}`);const l=r.filter((t=>"light"===Xt(t)&&"on"===i.states[t]?.state));l.length&&a.push(`Lights still on: ${l.map((t=>Kt(i,s,t))).join(", ")}`);const c=Jn(i).find((t=>t.at>new Date));return s.settings.prayer&&c&&a.push(`Next prayer: ${c.id} at ${c.at.toTimeString().slice(0,5)}`),a}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this.timer)}render(){const{ctx:t}=this,{t:e}=t,i=Dt[t.lang],s=new Date,a=Yn(t.hass,t.config.settings.greeting_name),n=t.config.settings.weather.entity,r=n?t.hass.states[n]:void 0,o=e=>"number"==typeof e?se(`${ae(e,t.lang,0)}°`):"–",l=t.config.settings.prayer?Jn(t.hass):[];return Z`<div class="scrim" @click=${t=>t.target===t.currentTarget&&this.onDone()}>
      <div class="card" role="dialog" aria-label=${e("morning_summary")}>
        <div class="hello">
          <h1>${e(qn(s))}${a?("ar"===t.lang?"، ":", ")+a:""} ☀️</h1>
          <span class="date">${s.toLocaleDateString(i,{weekday:"long",day:"numeric",month:"long"})}</span>
          ${this.ai?Z`<p class="ai">✨ ${this.ai}</p>`:q}
        </div>
        <div class="cols">
          ${r?Z`<div class="box" style="animation-delay:120ms">
                <h2>${e("today_weather")}</h2>
                <div class="wx">
                  <sn-icon .icon=${Xn(this.forecast.condition??r.state)}></sn-icon>
                  <div>
                    <div class="t">${o(r.attributes.temperature)}</div>
                    ${void 0!==this.forecast.high?Z`<div class="hl">${o(this.forecast.high)} / ${o(this.forecast.low)}</div>`:q}
                  </div>
                </div>
              </div>`:q}
          ${l.length?Z`<div class="box" style="animation-delay:220ms">
                <h2>${e("prayer")}</h2>
                ${l.map((t=>Z`<div class="row ${t.at<s?"past":""}">
                    <span>${e(`p_${t.id}`)}</span><span class="when">${t.at.toLocaleTimeString(i,{hour:"2-digit",minute:"2-digit"})}</span>
                  </div>`))}
              </div>`:q}
          <div class="box" style="animation-delay:320ms">
            <h2>${e("overnight")}</h2>
            ${this.lines?Z`<ul>${this.lines.map((t=>Z`<li>${t}</li>`))}</ul>`:Z`<span class="muted">${e("loading")}</span>`}
          </div>
        </div>
        <button class="btn primary pressable go" @click=${()=>this.onDone()}>${e("lets_go")}</button>
      </div>
    </div>`}};Yc.styles=[si,o`
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
      .ai {
        margin: 6px 0 0;
        max-width: 620px;
        font-size: 17px;
        line-height: 1.5;
        unicode-bidi: plaintext;
        animation: fade 600ms cubic-bezier(0.22, 1, 0.36, 1);
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
    `],Zc([gt({attribute:!1})],Yc.prototype,"ctx",2),Zc([gt({attribute:!1})],Yc.prototype,"onDone",2),Zc([mt()],Yc.prototype,"forecast",2),Zc([mt()],Yc.prototype,"lines",2),Zc([mt()],Yc.prototype,"ai",2),Yc=Zc([pt("sn-morning")],Yc);var Xc=Object.defineProperty,Kc=Object.getOwnPropertyDescriptor,Jc=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?Kc(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&Xc(e,i,n),n};const Gc={ar:"ar-JO",en:"en-US",he:"he-IL"},Qc=["as_s1","as_s2","as_s3","as_s4"];let td=class extends ct{constructor(){super(...arguments),this.lines=[],this.busy=!1,this.listening=!1}async connectedCallback(){super.connectedCallback();try{const t=await this.ctx.hass.callWS({type:"assist_pipeline/pipeline/list"}),e=t.pipelines.find((e=>e.id===t.preferred_pipeline))??t.pipelines[0];e&&(this.agent={agent_id:e.conversation_engine,language:e.conversation_language})}catch{}}async send(t){if((t=t.trim())&&!this.busy){this.lines=[...this.lines,{me:!0,text:t}],this.busy=!0,this.toBottom();try{const e=await this.ctx.hass.callWS({type:"conversation/process",text:t,language:this.agent?.language&&"*"!==this.agent.language?this.agent.language:this.ctx.lang,conversation_id:this.conversationId,...this.agent?.agent_id?{agent_id:this.agent.agent_id}:{}});this.conversationId=e.conversation_id;const i=e.response?.speech?.plain?.speech||this.ctx.t("as_done");this.lines=[...this.lines,{me:!1,text:i}]}catch{this.lines=[...this.lines,{me:!1,text:this.ctx.t("as_error")}]}finally{this.busy=!1,this.toBottom()}}}toBottom(){this.updateComplete.then((()=>{const t=this.renderRoot.querySelector(".log");t?.scrollTo({top:t.scrollHeight,behavior:"smooth"})}))}listen(){const t=window.SpeechRecognition??window.webkitSpeechRecognition;if(!t)return;const e=new t;e.lang=Gc[this.ctx.lang],e.interimResults=!1,e.onresult=t=>this.send(t.results[0][0].transcript),e.onend=()=>this.listening=!1,e.onerror=()=>this.listening=!1,this.listening=!0,e.start()}render(){const{t:t}=this.ctx,e=!!(window.SpeechRecognition??window.webkitSpeechRecognition);return Z`<div class="log" aria-live="polite">
        ${this.lines.length?this.lines.map((t=>Z`<div class="b ${t.me?"me":"it"}">${t.text}</div>`)):Z`<div class="hello">
              <sn-icon icon="assistant" style="color:var(--accent-text)"></sn-icon>
              <span>${t("as_hello")}</span>
              <div class="chips">${Qc.map((e=>Z`<button class="btn pressable" @click=${()=>this.send(t(e))}>${t(e)}</button>`))}</div>
            </div>`}
        ${this.busy?Z`<div class="b it dots" aria-label=${t("loading")}><span></span><span></span><span></span></div>`:q}
      </div>
      <form
        @submit=${t=>{t.preventDefault();const e=t.currentTarget.querySelector("input");this.send(e.value),e.value=""}}
      >
        ${e?Z`<button type="button" class="icon-btn pressable mic ${this.listening?"on":""}" aria-label=${t("as_speak")} @click=${()=>this.listen()}>
              <sn-icon icon="microphone" style="--icon-size:22px"></sn-icon>
            </button>`:q}
        <input type="text" placeholder=${t("as_placeholder")} aria-label=${t("as_placeholder")} />
        <button type="submit" class="icon-btn primary pressable" aria-label=${t("as_send")} ?disabled=${this.busy}>
          <sn-icon icon="send" style="--icon-size:20px;transform:${this.ctx.rtl?"scaleX(-1)":"none"}"></sn-icon>
        </button>
      </form>`}};td.styles=[si,o`
      :host {
        display: grid;
        gap: 12px;
        min-height: 320px;
        grid-template-rows: 1fr auto;
      }
      .log {
        display: flex;
        flex-direction: column;
        gap: 8px;
        overflow-y: auto;
        max-height: 50vh;
        padding: 4px 0;
      }
      .b {
        max-width: 82%;
        padding: 10px 14px;
        border-radius: 20px;
        font-size: 16px;
        line-height: 1.4;
        unicode-bidi: plaintext;
        animation: pop 260ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1));
      }
      .b.me {
        align-self: flex-end;
        background: var(--accent);
        color: var(--on-accent);
        border-end-end-radius: 6px;
      }
      .b.it {
        align-self: flex-start;
        background: var(--surface-2);
        border-end-start-radius: 6px;
      }
      .dots span {
        display: inline-block;
        width: 7px;
        height: 7px;
        margin: 0 2px;
        border-radius: 50%;
        background: var(--text-2);
        animation: blink 1s infinite;
      }
      .dots span:nth-child(2) {
        animation-delay: 0.15s;
      }
      .dots span:nth-child(3) {
        animation-delay: 0.3s;
      }
      .hello {
        text-align: center;
        color: var(--text-2);
        display: grid;
        gap: 12px;
        justify-items: center;
        padding: 12px;
        --icon-size: 40px;
      }
      .chips {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        justify-content: center;
      }
      form {
        display: flex;
        gap: 8px;
        align-items: center;
      }
      form input {
        flex: 1;
        min-height: 48px;
        border-radius: 999px;
        padding-inline: 18px;
      }
      .mic.on {
        background: var(--alert);
        color: #fff;
        animation: pulse 1.2s infinite;
      }
      @keyframes pop {
        from {
          opacity: 0;
          transform: translateY(8px) scale(0.97);
        }
      }
      @keyframes blink {
        50% {
          opacity: 0.25;
        }
      }
      @keyframes pulse {
        50% {
          transform: scale(1.08);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .b,
        .mic.on,
        .dots span {
          animation: none;
        }
      }
    `],Jc([gt({attribute:!1})],td.prototype,"ctx",2),Jc([mt()],td.prototype,"lines",2),Jc([mt()],td.prototype,"busy",2),Jc([mt()],td.prototype,"listening",2),td=Jc([pt("sn-assistant")],td);var ed=Object.defineProperty,id=Object.getOwnPropertyDescriptor,sd=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?id(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&ed(e,i,n),n};const ad=864e5,nd=t=>new Date(1e3*t).toLocaleDateString("ar-u-nu-latn",{day:"numeric",month:"short",year:"numeric"}),rd=t=>`https://wa.me/${t.phone.replace(/\D/g,"")}?text=${encodeURIComponent((t=>[`مرحبا ${t.name} 👋`,"هاد مفتاح تفعيل SmartNest لبيتك:","",t.key,"","افتح SmartNest بـ Home Assistant، الصق المفتاح، واضغط تفعيل."].join("\n"))(t))}`;let od=class extends ct{constructor(){super(...arguments),this.narrow=!1,this.houses=[],this.beats={},this.beatUrl="",this.plan="premium",this.days="",this.q="",this.filter="all",this.error="",this.toastMsg=""}get assetBase(){return this.panel?.config?.asset_base??"/smartnest_static/static/"}connectedCallback(){if(super.connectedCallback(),!document.getElementById("smartnest-fonts")){const t=document.createElement("style");t.id="smartnest-fonts",t.textContent=ii(this.assetBase),document.head.appendChild(t)}this.refresh()}get dark(){return!!this.hass?.themes?.darkMode}async refresh(){try{const t=await this.hass.callWS({type:"smartnest/issuer/status"});this.ready=t.ready,this.houses=t.houses,this.beats=t.beats??{},this.beatUrl=t.heartbeat_url??""}catch{this.ready=!1}}toast(t){this.toastMsg=t,window.clearTimeout(this.toastTimer),this.toastTimer=window.setTimeout((()=>this.toastMsg=""),2200)}async copy(t){try{await navigator.clipboard.writeText(t),this.toast("انسخ ✓")}catch{window.prompt("انسخ:",t)}}get latest(){const t=new Map;for(const e of this.houses)(!t.has(e.install)||t.get(e.install).issued<e.issued)&&t.set(e.install,e);return[...t.values()].sort(((t,e)=>e.issued-t.issued))}async issue(t){t.preventDefault();const e=t.currentTarget,i=new FormData(e),s=String(i.get("install")??"").trim().toLowerCase();if(this.error="",!/^[0-9a-f]{32}$/.test(s))return void(this.error="رقم التركيب لازم يكون 32 حرف (من شاشة التفعيل عند الزبون)");const a="custom"===this.days?Number(i.get("customDays"))||void 0:this.days?Number(this.days):void 0;try{const t=await this.hass.callWS({type:"smartnest/issuer/issue",install:s,name:String(i.get("name")??"").trim(),plan:this.plan,days:a,trial:!!i.get("trial"),reseller:String(i.get("reseller")??""),phone:String(i.get("phone")??""),note:String(i.get("note")??"")});this.last=t,this.copy(t.key),e.reset(),this.plan="premium",this.days="",this.refresh()}catch(n){this.error=n?.message??"خطأ"}}async renew(t,e,i){if(confirm(i))try{const i=await this.hass.callWS({type:"smartnest/issuer/renew",id:t.id,...e});this.copy(i.key),this.refresh()}catch{this.toast("ما زبطت")}}renderSetup(){return Z`<div class="card">
      <h2>🔑 ركّب مفتاح التوقيع</h2>
      <span class="muted">ارفع ملف <span class="mono">license-private.pem</span> من فولدر <span class="mono">~/.smartnest</span> على الكمبيوتر. بعدها هاي الصفحة بتصير تعمل مفاتيح للزباين.</span>
      <input
        type="file"
        accept=".pem"
        @change=${async t=>{const e=t.target.files?.[0];if(e)try{await this.hass.callWS({type:"smartnest/issuer/setup",pem:await e.text()}),this.toast("تمام ✓"),this.refresh()}catch{this.toast("هاد مش مفتاح SmartNest الصح")}}}
      />
    </div>`}renderForm(){const t=(t,e,i)=>Z`<div class="seg">
      ${e.map((([e,s])=>Z`<button type="button" aria-pressed=${t===e} @click=${()=>i(e)}>${s}</button>`))}
    </div>`;return Z`<form class="card" autocomplete="off" @submit=${t=>this.issue(t)}>
      <h2>✨ مفتاح جديد</h2>
      <label class="field">رقم التركيب (من شاشة التفعيل عند الزبون)<input name="install" type="text" class="mono" placeholder="2a9291b812404fda9dabc988300cf5ce" required maxlength="40" /></label>
      <label class="field">اسم البيت أو الزبون<input name="name" type="text" placeholder="بيت أبو محمد" required /></label>
      <label class="field">واتساب الزبون (اختياري)<input name="phone" type="tel" class="mono" placeholder="972501234567" /></label>
      <div class="field">الباقة ${t(this.plan,[["basic","Basic"],["pro","Pro"],["premium","Premium"]],(t=>this.plan=t))}</div>
      <div class="field">
        المدة ${t(this.days,[["","بدون انتهاء"],["30","شهر"],["365","سنة"],["custom","…"]],(t=>this.days=t))}
        ${"custom"===this.days?Z`<input name="customDays" type="number" min="1" placeholder="كم يوم" />`:q}
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
      ${this.error?Z`<div class="err">${this.error}</div>`:q}
      ${this.last?Z`<div class="result">
            <b>✓ ${this.last.name} · ${this.last.plan}</b>
            <code>${this.last.key}</code>
            <div class="row">
              <button class="btn primary pressable" type="button" @click=${()=>this.copy(this.last.key)}>نسخ</button>
              ${this.last.phone?Z`<a class="btn pressable" target="_blank" rel="noopener" href=${rd(this.last)}>ابعت عالواتساب</a>`:q}
            </div>
          </div>`:q}
    </form>`}renderBeat(t){const e=this.beats[t.install];if(!e)return q;const i=(Date.now()/1e3-e.at)/3600,s=i>36,a=i<1?"هلأ":i<24?`قبل ${Math.round(i)} ساعة`:`قبل ${Math.round(i/24)} يوم`,n=e.offline+e.low_battery;return Z`<div class="beat ${s?"late":n?"warn":"ok"}">
      <b>${s?"⚠️ ما بعت نبض":n?"🟠 بدو شوية انتباه":"🟢 كل إشي تمام"}</b>
      <span>${a} · SmartNest ${e.version} · HA ${e.ha}</span>
      ${e.offline?Z`<span>${e.offline} أجهزة فاصلة: ${e.offline_names.join("، ")}</span>`:q}
      ${e.low_battery?Z`<span>${e.low_battery} بطاريات ضعيفة</span>`:q}
    </div>`}renderHouse(t){const[e,i]=function(t){if(!t.expires)return["ok","بدون انتهاء"];const e=Math.ceil((1e3*t.expires-Date.now())/ad);return e<0?["bad",`خلص من ${-e} يوم`]:e<=30?["soon",`باقي ${e} يوم`]:["ok",`لحد ${nd(t.expires)}`]}(t),s=this.houses.filter((e=>e.install===t.install&&e.id!==t.id)).length;return Z`<div class="house">
      <div class="top">
        <span class="nm">${t.name}</span>
        <span class="badge p-${t.plan}">${t.plan}${t.trial?" · تجربة":""}</span>
        <span class="badge s-${e}">${i}</span>
      </div>
      <div class="meta">
        <span class="mono" style="font-size:12px">${t.install}</span><span>انعمل ${nd(t.issued)}</span>
        ${t.reseller?Z`<span>عن طريق ${t.reseller}</span>`:q} ${s?Z`<span>${s} مفاتيح قبل</span>`:q}
      </div>
      ${t.note?Z`<div class="meta">📝 ${t.note}</div>`:q}
      ${this.renderBeat(t)}
      <div class="row">
        <button class="btn pressable" @click=${()=>this.copy(t.key)}>نسخ المفتاح</button>
        ${t.phone?Z`<a class="btn pressable" target="_blank" rel="noopener" href=${rd(t)}>واتساب</a>`:Z`<button
              class="btn pressable"
              @click=${async()=>{const e=prompt("رقم واتساب الزبون (مع مفتاح الدولة)","");e&&(await this.hass.callWS({type:"smartnest/issuer/update",id:t.id,phone:e}),this.refresh())}}
            >
              + واتساب
            </button>`}
        <button class="btn pressable" @click=${()=>this.renew(t,{days:365},`مفتاح جديد لـ ${t.name} لمدة سنة من اليوم؟`)}>جدّد سنة</button>
        <select
          @change=${e=>{const i=e.target.value;if(e.target.value="",!i)return;const s=t.expires?Math.max(1,Math.ceil((1e3*t.expires-Date.now())/ad)):void 0;this.renew(t,{plan:i,days:s},`مفتاح جديد لـ ${t.name} بباقة ${i}؟ (نفس المدة الباقية)`)}}
        >
          <option value="">غيّر الباقة…</option>
          ${["basic","pro","premium"].filter((e=>e!==t.plan)).map((t=>Z`<option value=${t}>${t}</option>`))}
        </select>
        <button
          class="btn pressable"
          style="color:var(--alert-text)"
          @click=${async()=>{confirm(`تشيل ${t.name} من القائمة؟ (المفتاح نفسه بيضل شغّال)`)&&(await this.hass.callWS({type:"smartnest/issuer/remove",install:t.install}),this.refresh())}}
        >
          شيل
        </button>
      </div>
    </div>`}render(){const t=ei(this.dark,""),e=Object.entries(t).map((([t,e])=>`${t}:${e}`)).join(";"),i=this.latest,s=this.q.trim().toLowerCase(),a=i.filter((t=>{if(s&&![t.name,t.install,t.note,t.phone,t.reseller].join(" ").toLowerCase().includes(s))return!1;const e=t.expires?1e3*t.expires-Date.now():1/0;return"soon"===this.filter?e>0&&e<30*ad:"bad"!==this.filter||e<0})),n=i.filter((t=>t.expires&&1e3*t.expires>Date.now()&&1e3*t.expires-Date.now()<30*ad)).length,r=t=>i.filter((e=>e.plan===t&&!e.trial)).length;return Z`<div class="page" style=${e} dir="rtl">
      <div class="wrap">
        <header>
          ${this.narrow?Z`<button class="icon-btn pressable menu" aria-label="menu" @click=${()=>this.dispatchEvent(new Event("hass-toggle-menu",{bubbles:!0,composed:!0}))}>
                <sn-icon icon="menu"></sn-icon>
              </button>`:q}
          <img src="${this.assetBase}logo/smartnest-symbol-${this.dark?"white":"color"}.svg" alt="" />
          <div><h1>التراخيص</h1><div class="sub">مفاتيح SmartNest لزباينك. بس إلك.</div></div>
        </header>
        ${void 0===this.ready?Z`<span class="muted">…</span>`:this.ready?Z`<div class="stats">
                ${[["🏠",i.length,"بيت"],["⭐",r("premium"),"Premium"],["💎",r("pro"),"Pro"],["🔹",r("basic"),"Basic"],["⏳",n,"قرّبوا يخلصوا"]].map((([t,e,i])=>Z`<div class="stat"><b>${t} ${e}</b><span>${i}</span></div>`))}
              </div>
              <div class="cols">
                ${this.renderForm()}
                <div style="display:grid;gap:12px">
                  <div class="tools">
                    <input type="search" placeholder="🔍 دوّر باسم أو رقم أو ملاحظة" .value=${this.q} @input=${t=>this.q=t.target.value} />
                    <div class="seg" style="flex:none">
                      ${[["all","الكل"],["soon","قرّبت"],["bad","خلصت"]].map((([t,e])=>Z`<button aria-pressed=${this.filter===t} @click=${()=>this.filter=t}>${e}</button>`))}
                    </div>
                  </div>
                  <div class="list">
                    ${a.length?a.map((t=>this.renderHouse(t))):Z`<div class="empty">${i.length?"ما في نتايج":"لسا ما عملت مفاتيح. أول مفتاح من الفورم."}</div>`}
                  </div>
                  ${this.beatUrl?Z`<details class="card">
                        <summary>💓 نبض البيوت (تعرف المشاكل قبل ما يتصلوا)</summary>
                        <span class="muted" style="font-size:14px"
                          >بكل بيت زبون: SmartNest ← ⚙️ ← المركّب ← "رابط النبض"، والصق هاد الرابط. البيت بيبعتلك كل 12 ساعة: شغّال، كم جهاز فاصل، وأي نسخة. بدها رابط خارجي لـ HA تبعك (Nabu Casa أو دومين).</span
                        >
                        <code class="mono" style="word-break:break-all;font-size:12px">${this.beatUrl}</code>
                        <button class="btn pressable" style="justify-self:start" @click=${()=>this.copy(this.beatUrl)}>نسخ الرابط</button>
                      </details>`:q}
                  <details class="card">
                    <summary>أضف مفتاح قديم للقائمة</summary>
                    <form
                      style="display:grid;gap:10px;margin-top:10px"
                      @submit=${async t=>{t.preventDefault();const e=t.currentTarget;try{await this.hass.callWS({type:"smartnest/issuer/import",key:String(new FormData(e).get("key")??"")}),e.reset(),this.toast("انضاف ✓"),this.refresh()}catch(i){this.toast("exists"===i?.code?"موجود بالقائمة":"هاد مش مفتاح من توقيعك")}}}
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
      ${this.toastMsg?Z`<div class="toast" role="status">${this.toastMsg}</div>`:q}
    </div>`}};od.styles=[si,o`
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
    `],sd([gt({attribute:!1})],od.prototype,"hass",2),sd([gt({type:Boolean,reflect:!0})],od.prototype,"narrow",2),sd([gt({attribute:!1})],od.prototype,"panel",2),sd([mt()],od.prototype,"ready",2),sd([mt()],od.prototype,"houses",2),sd([mt()],od.prototype,"beats",2),sd([mt()],od.prototype,"beatUrl",2),sd([mt()],od.prototype,"plan",2),sd([mt()],od.prototype,"days",2),sd([mt()],od.prototype,"q",2),sd([mt()],od.prototype,"filter",2),sd([mt()],od.prototype,"last",2),sd([mt()],od.prototype,"error",2),sd([mt()],od.prototype,"toastMsg",2),od=sd([pt("smartnest-licenses")],od);var ld=Object.defineProperty,cd=Object.getOwnPropertyDescriptor,dd=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?cd(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&ld(e,i,n),n};const pd="smartnest-voice";let hd=class extends ct{constructor(){super(...arguments),this.phase="idle",this.heard="",this.said="",this.problem="",this.stopped=!1}async connectedCallback(){if(super.connectedCallback(),this.stopped=!1,!window.isSecureContext||!navigator.mediaDevices?.getUserMedia)return this.phase="error",void(this.problem=this.ctx.t("voice_https"));try{this.stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0}}),this.audio=new AudioContext({sampleRate:16e3}),await this.audio.audioWorklet.addModule(URL.createObjectURL(new Blob(['\nclass Pcm extends AudioWorkletProcessor {\n  process(inputs) {\n    const ch = inputs[0][0];\n    if (ch) {\n      const out = new Int16Array(ch.length);\n      for (let i = 0; i < ch.length; i++) out[i] = Math.max(-1, Math.min(1, ch[i])) * 0x7fff;\n      this.port.postMessage(out.buffer, [out.buffer]);\n    }\n    return true;\n  }\n}\nregisterProcessor("sn-pcm", Pcm);'],{type:"text/javascript"})));const t=new AudioWorkletNode(this.audio,"sn-pcm");t.port.onmessage=t=>this.send(t.data),this.audio.createMediaStreamSource(this.stream).connect(t),this.run()}catch{this.phase="error",this.problem=this.ctx.t("voice_mic")}}disconnectedCallback(){super.disconnectedCallback(),this.stopped=!0,this.unsub?.(),this.stream?.getTracks().forEach((t=>t.stop())),this.audio?.close().catch((()=>{})),window.clearTimeout(this.idleTimer)}send(t){const e=this.ctx.hass.connection.socket;if(void 0===this.handler||!e||1!==e.readyState)return;const i=new Uint8Array(t.byteLength+1);i[0]=this.handler,i.set(new Uint8Array(t),1),e.send(i)}async run(){if(!this.stopped){this.handler=void 0;try{this.unsub=await this.ctx.hass.connection.subscribeMessage((t=>this.onEvent(t)),{type:"assist_pipeline/run",start_stage:"wake_word",end_stage:"tts",input:{sample_rate:16e3,timeout:3600},...this.conversation?{conversation_id:this.conversation}:{}})}catch{this.phase="error",this.problem=this.ctx.t("voice_pipeline"),window.setTimeout((()=>this.run()),3e4)}}}restart(t=300){this.unsub?.(),this.unsub=void 0,this.handler=void 0,window.setTimeout((()=>this.run()),t)}onEvent(t){switch(t.type){case"run-start":this.handler=t.data?.runner_data?.stt_binary_handler_id,"error"===this.phase&&(this.phase="idle");break;case"wake_word-end":this.phase="listening",this.heard="",this.said="",window.clearTimeout(this.idleTimer),navigator.vibrate?.(30);break;case"stt-end":this.heard=t.data?.stt_output?.text??"",this.phase="thinking";break;case"intent-end":{const e=t.data?.intent_output;this.conversation=e?.conversation_id,this.said=e?.response?.speech?.plain?.speech??"";break}case"tts-end":{const e=t.data?.tts_output?.url;if(this.phase="speaking",e){const t=new Audio(this.ctx.hass.hassUrl(e));t.onended=()=>this.settle(),t.play().catch((()=>this.settle()))}else this.settle();break}case"run-end":this.restart();break;case"error":"idle"!==this.phase&&this.settle(1500),this.restart("wake-word-timeout"===t.data?.code?100:2e3)}}settle(t=2500){window.clearTimeout(this.idleTimer),this.idleTimer=window.setTimeout((()=>this.phase="idle"),t)}render(){return"idle"===this.phase||"error"===this.phase?Z`<div class="dot ${"error"===this.phase?"err":""}" title=${this.problem||this.ctx.t("voice_ready")}>
        <sn-icon icon=${"error"===this.phase?"microphone-off":"microphone"} style="--icon-size:22px"></sn-icon>
      </div>`:Z`<div class="overlay" @click=${()=>this.phase="idle"}>
      <div class="panel">
        <div class="orb ${this.phase}"></div>
        ${this.heard?Z`<div class="heard">“${this.heard}”</div>`:Z`<div class="heard">${this.ctx.t("voice_listening")}</div>`}
        ${this.said?Z`<div class="said">${this.said}</div>`:q}
      </div>
    </div>`}};hd.styles=[si,o`
      :host {
        position: fixed;
        inset-inline-end: 18px;
        bottom: 18px;
        z-index: 45;
      }
      .dot {
        width: 46px;
        height: 46px;
        border-radius: 999px;
        display: grid;
        place-items: center;
        background: var(--surface);
        -webkit-backdrop-filter: blur(16px);
        backdrop-filter: blur(16px);
        border: 1px solid var(--border);
        color: var(--text-2);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
      }
      .dot.err {
        color: var(--alert-text);
      }
      .overlay {
        position: fixed;
        inset: 0;
        display: grid;
        place-items: center;
        background: color-mix(in srgb, #000 35%, transparent);
        -webkit-backdrop-filter: blur(10px);
        backdrop-filter: blur(10px);
        animation: fade 240ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .panel {
        display: grid;
        justify-items: center;
        gap: 22px;
        text-align: center;
        color: #fff;
        padding: 24px;
        max-width: 640px;
      }
      .orb {
        width: 140px;
        height: 140px;
        border-radius: 50%;
        background: radial-gradient(circle at 35% 30%, #ffd08a, var(--accent) 55%, #b5650b);
        box-shadow: 0 0 60px color-mix(in srgb, var(--accent) 70%, transparent);
        animation: breathe 1.4s ease-in-out infinite;
      }
      .orb.thinking {
        animation: spin 1.2s linear infinite;
        background: conic-gradient(from 0deg, #ffd08a, var(--accent), #6c5ce7, #ffd08a);
      }
      .orb.speaking {
        animation: talk 0.5s ease-in-out infinite alternate;
      }
      .heard {
        font-size: 22px;
        opacity: 0.85;
        unicode-bidi: plaintext;
      }
      .said {
        font-size: 28px;
        font-weight: 700;
        line-height: 1.35;
        unicode-bidi: plaintext;
      }
      @keyframes breathe {
        50% {
          transform: scale(1.12);
        }
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
      @keyframes talk {
        to {
          transform: scale(1.06, 0.94);
        }
      }
      @keyframes fade {
        from {
          opacity: 0;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .orb,
        .overlay {
          animation: none;
        }
      }
    `],dd([gt({attribute:!1})],hd.prototype,"ctx",2),dd([mt()],hd.prototype,"phase",2),dd([mt()],hd.prototype,"heard",2),dd([mt()],hd.prototype,"said",2),dd([mt()],hd.prototype,"problem",2),hd=dd([pt("sn-voice")],hd);var ud=Object.defineProperty,gd=Object.getOwnPropertyDescriptor,md=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?gd(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&ud(e,i,n),n};const fd="smartnest-tour";let bd=class extends ct{constructor(){super(...arguments),this.steps=[],this.i=0,this.measure=()=>{for(;this.i<this.steps.length&&!this.steps[this.i].target();)this.i++;if(this.i>=this.steps.length)return this.finish();this.box=this.steps[this.i].target().getBoundingClientRect()}}connectedCallback(){super.connectedCallback(),this.measure(),window.addEventListener("resize",this.measure)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("resize",this.measure)}next(){this.i++,this.measure()}finish(){(()=>{try{localStorage.setItem(fd,"1")}catch{}})(),this.onDone()}render(){const t=this.steps[this.i],e=this.box;if(!t||!e)return q;const i=e.bottom+180<innerHeight?e.bottom+14:Math.max(16,e.top-200),s=Math.min(Math.max(16,e.left+e.width/2-180),innerWidth-Math.min(360,innerWidth-32)-16),{t:a}=this.ctx,n=this.i>=this.steps.length-1;return Z`<div class="hole" style="top:${e.top-8}px;left:${e.left-8}px;width:${e.width+16}px;height:${e.height+16}px"></div>
      <div class="tip" role="dialog" style="top:${i}px;left:${s}px">
        <p>${a(t.text)}</p>
        <div class="row">
          <span>${this.i+1} / ${this.steps.length}</span>
          <button class="btn pressable" @click=${()=>this.finish()}>${a("tour_skip")}</button>
          <button class="btn primary pressable" @click=${()=>n?this.finish():this.next()}>${a(n?"tour_done":"tour_next")}</button>
        </div>
      </div>`}};bd.styles=[si,o`
      :host {
        position: fixed;
        inset: 0;
        z-index: 70;
      }
      .hole {
        position: fixed;
        border-radius: 18px;
        box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.62), 0 0 0 3px var(--accent);
        transition: all 420ms cubic-bezier(0.32, 0.72, 0, 1);
        pointer-events: none;
      }
      .tip {
        position: fixed;
        width: min(360px, calc(100vw - 32px));
        padding: 16px;
        border-radius: var(--r-lg);
        background: var(--surface-solid);
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
        display: grid;
        gap: 12px;
        transition: top 420ms cubic-bezier(0.32, 0.72, 0, 1), left 420ms cubic-bezier(0.32, 0.72, 0, 1);
        animation: in 300ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .tip p {
        margin: 0;
        font-size: 17px;
        line-height: 1.5;
      }
      .row {
        display: flex;
        gap: 8px;
        align-items: center;
      }
      .row span {
        flex: 1;
        font-size: 13px;
        color: var(--text-2);
      }
      @keyframes in {
        from {
          opacity: 0;
          transform: translateY(8px);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .hole,
        .tip {
          transition: none;
          animation: none;
        }
      }
    `],md([gt({attribute:!1})],bd.prototype,"ctx",2),md([gt({attribute:!1})],bd.prototype,"steps",2),md([gt({attribute:!1})],bd.prototype,"onDone",2),md([mt()],bd.prototype,"i",2),md([mt()],bd.prototype,"box",2),bd=md([pt("sn-tour")],bd);const _d=`url("data:image/svg+xml,${encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .5 0 0 0 0 .5 0 0 0 0 .5 0 0 0 .55 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>")}")`,yd=t=>`url("data:image/svg+xml,${encodeURIComponent(t)}")`;function vd(t,e){switch(t){case"marble":return yd(`<svg xmlns='http://www.w3.org/2000/svg' width='900' height='900'><filter id='m'><feTurbulence type='turbulence' baseFrequency='.004 .012' numOctaves='5' seed='7'/><feColorMatrix values='${e?"0 0 0 0 .55 0 0 0 0 .55 0 0 0 0 .58 0 0 0 -1.6 1.15":"0 0 0 0 .62 0 0 0 0 .6 0 0 0 0 .56 0 0 0 -1.8 1.1"}'/></filter><rect width='100%' height='100%' filter='url(#m)'/></svg>`);case"wood":return yd(`<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='400'><filter id='w'><feTurbulence type='fractalNoise' baseFrequency='.002 .06' numOctaves='4' seed='3'/><feColorMatrix values='${e?"0 0 0 0 .32 0 0 0 0 .2 0 0 0 0 .11 0 0 0 .9 0":"0 0 0 0 .55 0 0 0 0 .36 0 0 0 0 .2 0 0 0 .38 0"}'/></filter><rect width='100%' height='100%' filter='url(#w)'/></svg>`);case"sand":return yd(`<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'><filter id='s'><feTurbulence type='fractalNoise' baseFrequency='.012 .03' numOctaves='3' seed='11'/><feColorMatrix values='${e?"0 0 0 0 .45 0 0 0 0 .33 0 0 0 0 .2 0 0 0 .5 0":"0 0 0 0 .85 0 0 0 0 .68 0 0 0 0 .45 0 0 0 .35 0"}'/></filter><rect width='100%' height='100%' filter='url(#s)'/></svg>`);case"olive":return yd(`<svg xmlns='http://www.w3.org/2000/svg' width='800' height='800'><filter id='o'><feTurbulence type='fractalNoise' baseFrequency='.006' numOctaves='4' seed='5'/><feColorMatrix values='${e?"0 0 0 0 .2 0 0 0 0 .27 0 0 0 0 .14 0 0 0 .8 0":"0 0 0 0 .42 0 0 0 0 .5 0 0 0 0 .3 0 0 0 .3 0"}'/></filter><rect width='100%' height='100%' filter='url(#o)'/></svg>`);default:return"none"}}var xd=Object.defineProperty,wd=Object.getOwnPropertyDescriptor,$d=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?wd(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&xd(e,i,n),n};let kd=class extends ct{constructor(){super(...arguments),this.watts=0}connectedCallback(){super.connectedCallback(),navigator.vibrate?.([200,100,200])}render(){const{ctx:t}=this,{t:e,hass:i,lang:s,config:a}=t,n=t=>se(`${ae(t/1e3,s,1)} kW`),r=Bl(i,a.settings.power_entity).filter((t=>t.control&&!t.standby)).slice(0,3);return Z`<div class="card" role="alert">
      <div class="head">
        <span class="bolt"><sn-icon icon="lightning-bolt" style="--icon-size:22px"></sn-icon></span>
        <b>${e("overload_title",{now:n(this.watts),max:n(a.settings.power_limit??0)})}</b>
        <button class="btn pressable" @click=${()=>this.onDismiss()}>${e("dismiss")}</button>
      </div>
      ${r.length?Z`<span class="muted" style="font-size:14px">${e("overload_hint")}</span>`:q}
      ${r.map((s=>Z`<div class="row">
          <span>${Kt(i,a,s.control)}</span>
          <span class="w">${n(s.w)}</span>
          <button
            class="btn danger pressable"
            @click=${()=>i.callService("climate"===Xt(s.control)?"climate":"homeassistant","turn_off",{entity_id:s.control}).then((()=>t.toast(e("done")))).catch((()=>t.toast(e("error"))))}
          >
            ${e("turn_off")}
          </button>
        </div>`))}
    </div>`}};kd.styles=[si,o`
      :host {
        position: fixed;
        inset-inline: 0;
        top: 12px;
        z-index: 40;
        display: flex;
        justify-content: center;
        padding-inline: 12px;
        pointer-events: none;
      }
      .card {
        pointer-events: auto;
        width: min(560px, 100%);
        border-radius: var(--r-lg);
        padding: 16px;
        display: grid;
        gap: 10px;
        background: var(--surface-solid);
        box-shadow: 0 18px 50px rgba(0, 0, 0, 0.25), inset 0 0 0 2px var(--alert);
        animation: drop 420ms cubic-bezier(0.32, 0.72, 0, 1);
      }
      .head {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .head b {
        flex: 1;
        font-size: 17px;
      }
      .bolt {
        display: grid;
        place-items: center;
        width: 40px;
        height: 40px;
        border-radius: 999px;
        background: var(--alert);
        color: #fff;
        animation: pulse 1.4s ease-in-out infinite;
      }
      .row {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 15px;
      }
      .row span {
        flex: 1;
      }
      .row .w {
        flex: none;
        color: var(--text-2);
        font-variant-numeric: tabular-nums;
      }
      @keyframes drop {
        from {
          opacity: 0;
          transform: translateY(-24px);
        }
      }
      @keyframes pulse {
        50% {
          transform: scale(1.1);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .card,
        .bolt {
          animation: none;
        }
      }
    `],$d([gt({attribute:!1})],kd.prototype,"ctx",2),$d([gt({type:Number})],kd.prototype,"watts",2),$d([gt({attribute:!1})],kd.prototype,"onDismiss",2),kd=$d([pt("sn-overload")],kd);var Cd=Object.defineProperty,Md=Object.getOwnPropertyDescriptor,Ad=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?Md(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&Cd(e,i,n),n};const Hd="switch.smartnest_travel_mode";function Ld(t){t.showSheet({title:t.t("travel"),render:t=>{const{t:e,hass:i,config:s}=t,a="on"===i.states[Hd]?.state,n=s.settings.travel,r=i.states[Hd]?.attributes.simulating??[],o=(t,e)=>Z`<div style="display:flex;gap:10px;align-items:center;font-size:15px">
        <sn-icon icon=${t} style="--icon-size:20px;color:var(--accent-text)"></sn-icon><span>${e}</span>
      </div>`;return Z`<div style="display:grid;gap:14px">
        <div style="display:grid;gap:10px;padding:14px 16px;border-radius:var(--r-md);background:var(--surface-2)">
          ${n.off.length?o("power",e("travel_off",{x:n.off.map((t=>Kt(i,s,t))).join("، ")})):q}
          ${n.arm&&Object.keys(i.states).some((t=>t.startsWith("alarm_control_panel.")))?o("shield-home",e("travel_arm")):q}
          ${n.simulate?o("lightbulb",e("travel_sim")):q}
          ${n.notify?o("bell-ring",e("travel_report")):q}
        </div>
        ${a&&r.length?Z`<span class="muted" style="font-size:14px">${e("travel_sim_now",{x:r.map((t=>Kt(i,s,t))).join("، ")})}</span>`:q}
        <button
          class="btn ${a?"":"primary"} pressable"
          style="min-height:56px;font-size:17px"
          @click=${()=>{i.callService("switch",a?"turn_off":"turn_on",{entity_id:Hd}).then((()=>t.toast(e(a?"travel_welcome":"travel_bye"))),(()=>t.toast(e("error")))),t.closeSheet()}}
        >
          <sn-icon icon=${a?"home":"airplane"} style="--icon-size:22px"></sn-icon>${e(a?"travel_stop":"travel_start")}
        </button>
      </div>`}})}let Vd=class extends ct{constructor(){super(...arguments),this.code=!1}connectedCallback(){super.connectedCallback(),navigator.vibrate?.([400,200,400,200,400])}render(){const{ctx:t}=this,{t:e,hass:i,config:s}=t,a=function(t){const e=Date.now()-6e5;return Object.values(t.states).filter((t=>"binary_sensor"===Xt(t.entity_id)&&"on"===t.state&&["door","window","opening","garage_door","motion","occupancy","presence","smoke","gas"].includes(t.attributes.device_class)&&Date.parse(t.last_changed)>e)).sort(((t,e)=>e.last_changed.localeCompare(t.last_changed)))[0]}(i),n=function(t,e){const{hass:i,config:s}=t,a=Object.keys(i.states).filter((t=>t.startsWith("camera."))),n=e?ye(i,e.entity_id):void 0;return n&&a.find((t=>ye(i,t)===n))||s.settings.doorbell.camera_entity||a[0]}(t,a),r=n?En(i,n)??Wn(i,n,Date.now()):void 0,o=s.settings.emergency;return Z`<div class="card" role="alertdialog" aria-label=${e("alarm_triggered")}>
      <h1><sn-icon icon="alarm-light" style="--icon-size:44px"></sn-icon>${e("alarm_triggered")}</h1>
      <span class="why">${a?`${Kt(i,s,a.entity_id)} · ${le(e,a.last_changed)}`:Kt(i,s,this.alarm.entity_id)}</span>
      ${r?Z`<div class="cam"><img src=${r} alt="" /></div>`:q}
      ${this.code?Z`<div class="pad">
            <sn-pinpad
              .length=${0}
              prompt=${e("alarm_code")}
              error=${e("wrong_pin")}
              .onSubmit=${s=>(i.callService("alarm_control_panel","alarm_disarm",{entity_id:this.alarm.entity_id,code:s}).catch((()=>t.toast(e("wrong_pin")))),this.code=!1,!0)}
            ></sn-pinpad>
          </div>`:Z`<div class="row">
            ${o.police?Z`<a class="btn call pressable" href="tel:${o.police}"><sn-icon icon="phone"></sn-icon>${e("call_police")} ${o.police}</a>`:q}
            ${o.contacts.map((t=>Z`<a class="btn call pressable" href="tel:${t.phone}"><sn-icon icon="phone"></sn-icon>${t.name}</a>`))}
          </div>
          <div class="row">
            <button class="btn primary pressable" @click=${()=>this.code=!0}><sn-icon icon="shield-off"></sn-icon>${e("alarm_stop")}</button>
            <button class="btn pressable" @click=${()=>this.onHide()}>${e("alarm_hide")}</button>
          </div>`}
    </div>`}};Vd.styles=[si,o`
      :host {
        position: fixed;
        inset: 0;
        z-index: 60;
        display: grid;
        place-items: center;
        padding: 16px;
        background: radial-gradient(circle at 50% 30%, rgba(229, 72, 77, 0.55), rgba(70, 0, 6, 0.92));
        animation: flash 1.2s ease-in-out infinite alternate;
        color: #fff;
        -webkit-backdrop-filter: blur(14px);
        backdrop-filter: blur(14px);
      }
      .card {
        width: min(760px, 100%);
        display: grid;
        gap: 14px;
      }
      h1 {
        margin: 0;
        font-size: clamp(28px, 5vw, 44px);
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .why {
        font-size: 18px;
        opacity: 0.92;
      }
      .cam {
        border-radius: var(--r-lg);
        overflow: hidden;
        background: #000;
        aspect-ratio: 16 / 9;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      }
      .cam img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      .row {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
      }
      .row a,
      .row button {
        flex: 1;
        min-width: 150px;
        min-height: 60px;
        font-size: 17px;
        text-decoration: none;
        justify-content: center;
      }
      .call {
        background: #fff;
        color: #b4141b;
      }
      .pad {
        background: var(--surface-solid);
        color: var(--text);
        border-radius: var(--r-lg);
        padding: 16px;
      }
      @keyframes flash {
        from {
          background-color: rgba(120, 0, 10, 0.2);
        }
        to {
          background-color: rgba(200, 20, 30, 0.35);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        :host {
          animation: none;
        }
      }
    `],Ad([gt({attribute:!1})],Vd.prototype,"ctx",2),Ad([gt({attribute:!1})],Vd.prototype,"alarm",2),Ad([gt({attribute:!1})],Vd.prototype,"onHide",2),Ad([mt()],Vd.prototype,"code",2),Vd=Ad([pt("sn-alarm")],Vd);const Sd=["rainy","pouring","lightning","lightning-rainy","hail","snowy","snowy-rainy","windy","windy-variant","exceptional"];let zd=class extends ct{render(){const{ctx:t,risk:e}=this,{t:i,hass:s,config:a}=t,n=[...e.open,...e.covers].map((t=>Kt(s,a,t)));return Z`<div class="card" role="alert">
      <div class="head">
        <sn-icon icon=${e.condition.includes("wind")?"weather-windy":"weather-pouring"} style="--icon-size:28px;color:#3a86ff"></sn-icon>
        <b>${i(e.condition.includes("wind")?"wx_alert_wind":"wx_alert_rain")}</b>
      </div>
      <span class="muted" style="font-size:14px">${i("wx_alert_open",{x:n.slice(0,4).join("، ")})}</span>
      <div class="row">
        ${e.covers.length?Z`<button
              class="btn primary pressable"
              @click=${()=>{s.callService("cover","close_cover",{entity_id:e.covers}).catch((()=>t.toast(i("error")))),this.onDismiss()}}
            >
              ${i("wx_close_covers")}
            </button>`:q}
        <button class="btn pressable" @click=${()=>this.onDismiss()}>${i("dismiss")}</button>
      </div>
    </div>`}};zd.styles=[si,o`
      :host {
        position: fixed;
        inset-inline: 0;
        top: 12px;
        z-index: 39;
        display: flex;
        justify-content: center;
        padding-inline: 12px;
        pointer-events: none;
      }
      .card {
        pointer-events: auto;
        width: min(560px, 100%);
        border-radius: var(--r-lg);
        padding: 14px 16px;
        display: grid;
        gap: 8px;
        background: var(--surface-solid);
        box-shadow: 0 18px 50px rgba(0, 0, 0, 0.22), inset 0 0 0 2px #3a86ff;
        animation: drop 420ms cubic-bezier(0.32, 0.72, 0, 1);
      }
      .head {
        display: flex;
        gap: 10px;
        align-items: center;
      }
      .head b {
        flex: 1;
        font-size: 16px;
      }
      .row {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
      @keyframes drop {
        from {
          opacity: 0;
          transform: translateY(-24px);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .card {
          animation: none;
        }
      }
    `],Ad([gt({attribute:!1})],zd.prototype,"ctx",2),Ad([gt({attribute:!1})],zd.prototype,"risk",2),Ad([gt({attribute:!1})],zd.prototype,"onDismiss",2),zd=Ad([pt("sn-weather-alert")],zd);var Dd=Object.defineProperty,Od=Object.getOwnPropertyDescriptor,jd=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?Od(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&Dd(e,i,n),n};function Td(t){const e=ki(t.config).filter((e=>"camera"===Xt(e)&&t.hass.states[e]));return e.length?e:Object.keys(t.hass.states).filter((t=>"camera"===Xt(t)))}let Pd=class extends ct{constructor(){super(...arguments),this.bust=Date.now(),this.onKey=t=>{"Escape"===t.key&&(this.big?this.big=void 0:this.onClose())}}connectedCallback(){super.connectedCallback(),this.timer=window.setInterval((()=>this.bust=Date.now()),2e3),window.addEventListener("keydown",this.onKey)}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this.timer),window.removeEventListener("keydown",this.onKey)}render(){const{ctx:t}=this,e=Td(t),i=Math.ceil(Math.sqrt(e.length)),s=Math.ceil(e.length/i);return Z`<div class="wall" role="dialog" aria-label=${t.t("widget_camera")}>
      <div class="top">
        <sn-icon icon="cctv"></sn-icon>
        <strong>${t.t("camera_wall")}</strong>
        <button class="icon-btn pressable" aria-label=${t.t("close")} @click=${()=>this.big?this.big=void 0:this.onClose()}>
          <sn-icon icon=${this.big?"arrow-left":"close"}></sn-icon>
        </button>
      </div>
      <div class="grid" style="grid-template-columns:repeat(${i},1fr);grid-template-rows:repeat(${s},1fr)">
        ${e.map(((e,i)=>Z`<button class="cam pressable" style="animation-delay:${40*Math.min(i,8)}ms" @click=${()=>this.big=e}>
            ${Wn(t.hass,e,this.bust)?Z`<img src=${Wn(t.hass,e,this.bust)} alt="" />`:q}
            <span>${Kt(t.hass,t.config,e)}</span>
          </button>`))}
      </div>
      ${this.big?Z`<div class="big" @click=${()=>this.big=void 0}>
            <img src=${En(t.hass,this.big)??Wn(t.hass,this.big,this.bust)??""} alt="" />
            <span class="live">${t.t("streaming")} · ${Kt(t.hass,t.config,this.big)}</span>
          </div>`:q}
    </div>`}};Pd.styles=[si,o`
      .wall {
        position: fixed;
        inset: 0;
        z-index: 72;
        background: #0b0e11;
        color: #fff;
        display: grid;
        grid-template-rows: auto 1fr;
        animation: fade 260ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .top {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 18px;
        padding-top: max(14px, env(safe-area-inset-top));
      }
      .top strong {
        flex: 1;
        font-size: 18px;
      }
      .top .icon-btn {
        background: rgba(255, 255, 255, 0.12);
        color: #fff;
      }
      .grid {
        display: grid;
        gap: 8px;
        padding: 0 8px 8px;
        min-height: 0;
      }
      .cam {
        position: relative;
        border-radius: 14px;
        overflow: hidden;
        background: #151a1e;
        min-height: 0;
        animation: in 360ms cubic-bezier(0.22, 1, 0.36, 1) both;
      }
      .cam img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      .cam span {
        position: absolute;
        bottom: 10px;
        inset-inline-start: 10px;
        padding: 4px 10px;
        border-radius: 999px;
        background: rgba(0, 0, 0, 0.55);
        font-size: 13px;
        font-weight: 500;
      }
      .big {
        position: absolute;
        inset: 64px 8px 8px;
        border-radius: 14px;
        overflow: hidden;
        background: #000;
        animation: grow 320ms cubic-bezier(0.32, 0.72, 0, 1);
      }
      .big img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      .live {
        position: absolute;
        top: 12px;
        inset-inline-start: 12px;
        display: inline-flex;
        gap: 6px;
        align-items: center;
        padding: 4px 10px;
        border-radius: 999px;
        background: rgba(0, 0, 0, 0.55);
        font-size: 12px;
        font-weight: 700;
      }
      .live::before {
        content: "";
        width: 8px;
        height: 8px;
        border-radius: 999px;
        background: #f26b68;
      }
      @keyframes fade {
        from {
          opacity: 0;
        }
      }
      @keyframes in {
        from {
          opacity: 0;
          transform: scale(0.96);
        }
      }
      @keyframes grow {
        from {
          opacity: 0;
          transform: scale(0.94);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .cam,
        .big {
          animation: fade 200ms ease;
        }
      }
    `],jd([gt({attribute:!1})],Pd.prototype,"ctx",2),jd([gt({attribute:!1})],Pd.prototype,"onClose",2),jd([mt()],Pd.prototype,"big",2),jd([mt()],Pd.prototype,"bust",2),Pd=jd([pt("sn-camwall")],Pd);var Nd=Object.defineProperty,Id=Object.getOwnPropertyDescriptor,Wd=(t,e,i,s)=>{for(var a,n=s>1?void 0:s?Id(e,i):e,r=t.length-1;r>=0;r--)(a=t[r])&&(n=(s?a(e,i,n):a(n))||n);return s&&n&&Nd(e,i,n),n};const Ed="1.23.0",Rd=t=>{const[e,i]=t.split(":").map(Number);return 60*(e||0)+(i||0)};function Bd(t,e,i){const s=60*t.getHours()+t.getMinutes(),a=Rd(e),n=Rd(i);return a<=n?s>=a&&s<n:s>=a||s<n}const Zd=t=>{const e=(t??"").slice(0,2);return"en"===e||"he"===e?e:"ar"},Fd=(()=>{try{return"1"===localStorage.getItem("smartnest-showroom")}catch{return!1}})();let Ud=class extends ct{constructor(){super(...arguments),this.demoLoading=!1,this.narrow=!1,this.pageId="",this.sheets=[],this.toastMsg="",this.sleeping=!1,this.saving=!1,this.loadError="",this.lic={licensee:"",plan:"premium",trial:!1,reseller:""},this.now=new Date,this.systemDark=matchMedia("(prefers-color-scheme: dark)").matches,this.wide=window.innerWidth>=768,this.kiosk=Li(),this.kids=(()=>{try{return"1"===localStorage.getItem("smartnest-kids")}catch{return!1}})(),this.initStarted=!1,this.lastActive=Date.now(),this.silentBell=!1,this.morning=!1,this.camwall=!1,this.overSince=0,this.wxDismissed="",this.pro=!1,this.big=(()=>{try{return"1"===localStorage.getItem("smartnest-big")}catch{return!1}})(),this.touring=!1,this.voice=(()=>{try{return"1"===localStorage.getItem(pd)}catch{return!1}})(),this.overSnooze=0,this.guests=function(){try{return"1"===localStorage.getItem(Ia)}catch{return!1}}(),this.tvMode=(()=>{try{return"1"===localStorage.getItem("smartnest-tv")}catch{return!1}})(),this.enterDir=0,this.screenOffSent=!1,this.mql=matchMedia("(prefers-color-scheme: dark)"),this.onActivity=()=>{this.lastActive=Date.now(),this.screenOffSent=!1},this.onResize=()=>{this.wide=window.innerWidth>=768},this.onScheme=t=>{this.systemDark=t.matches},this.onSwipeDown=t=>{if("mouse"===t.pointerType||this.draft||this.sheets.length)return;t.composedPath().some((t=>t instanceof HTMLElement&&(void 0!==t.dataset.noSwipe||t.classList.contains("seg")||/^(SN-VSLIDER|SN-COLOR-WHEEL|INPUT)$/.test(t.tagName))))||(this.swipe={x:t.clientX,y:t.clientY,t:performance.now(),id:t.pointerId,active:!1,dx:0})},this.onSwipeMove=t=>{const e=this.swipe;if(!e||t.pointerId!==e.id)return;const i=t.clientX-e.x,s=t.clientY-e.y,a=t.currentTarget;if(!e.active){if(Math.abs(s)>12&&Math.abs(s)>Math.abs(i))return void(this.swipe=void 0);if(Math.abs(i)<14||Math.abs(i)<1.4*Math.abs(s))return;e.active=!0,a.setPointerCapture(t.pointerId)}e.dx=i;const n=this.neighbour(i)?i:.3*i;a.style.transform=`translateX(${n}px)`,a.style.opacity=String(1-Math.min(Math.abs(n)/900,.3))},this.onSwipeUp=t=>{const e=this.swipe;if(this.swipe=void 0,!e?.active)return;const i=t.currentTarget,s=this.neighbour(e.dx),a=s?e.dx:.3*e.dx,n=e.dx/Math.max(1,performance.now()-e.t),r=()=>{i.style.transform="",i.style.opacity=""};s&&(Math.abs(e.dx)>90||Math.abs(n)>.45)?(navigator.vibrate?.(6),i.animate([{transform:`translateX(${a}px)`,opacity:i.style.opacity||"1"},{transform:`translateX(${Math.sign(e.dx)*i.offsetWidth*.35}px)`,opacity:0}],{duration:160,easing:"cubic-bezier(0.22, 1, 0.36, 1)",fill:"forwards"}).finished.then((()=>{r(),this.goToPage(s)}))):(r(),i.animate([{transform:`translateX(${a}px)`},{transform:"none"}],{duration:220,easing:"cubic-bezier(0.22, 1, 0.36, 1)"}))}}set hass(e){if(Fd&&e!==this.demoHass)return void(this.demoLoading||(this.demoLoading=!0,globalThis.__SN_DEMO_BASE=`${this.panel?.config?.asset_base??"/smartnest_static/static/"}demo/`,function(e,i){let s=Promise.resolve();if(i&&i.length>0){document.getElementsByTagName("link");const e=document.querySelector("meta[property=csp-nonce]"),a=e?.nonce||e?.getAttribute("nonce");s=Promise.allSettled(i.map((e=>{if((e=function(t){return"/"+t}(e))in t)return;t[e]=!0;const i=e.endsWith(".css"),s=i?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${s}`))return;const n=document.createElement("link");return n.rel=i?"stylesheet":"modulepreload",i||(n.as="script"),n.crossOrigin="",n.href=e,a&&n.setAttribute("nonce",a),document.head.appendChild(n),i?new Promise(((t,i)=>{n.addEventListener("load",t),n.addEventListener("error",(()=>i(new Error(`Unable to preload CSS for ${e}`))))})):void 0})))}function a(t){const e=new Event("vite:preloadError",{cancelable:!0});if(e.payload=t,window.dispatchEvent(e),!e.defaultPrevented)throw t}return s.then((t=>{for(const e of t||[])"rejected"===e.status&&a(e.reason);return e().catch(a)}))}((()=>Promise.resolve().then((()=>Hp))),void 0).then((t=>t.startMock((t=>{this.demoHass=t,this.hass=t}))))));const i=this._hass;this._hass=e,this.requestUpdate("hass",i)}get hass(){return this._hass}connectedCallback(){super.connectedCallback(),this.setKiosk(this.kiosk),window.addEventListener("pointerdown",this.onActivity,{capture:!0,passive:!0}),window.addEventListener("keydown",this.onActivity,{capture:!0}),window.addEventListener("resize",this.onResize),this.mql.addEventListener("change",this.onScheme),this.ticker=window.setInterval((()=>this.tick()),1e4),function(){const t=window.CSS;if(t?.registerProperty)for(const e of["--leak"])try{t.registerProperty({name:e,syntax:"<color>",inherits:!0,initialValue:"transparent"})}catch{}}(),this.stopLight=function(t){let e=0;const i=(i,s)=>{cancelAnimationFrame(e),e=requestAnimationFrame((()=>{t.style.setProperty("--lx",`${i}px`),t.style.setProperty("--ly",`${s}px`)}))},s=t=>i(t.clientX,t.clientY),a=t=>{null!=t.beta&&null!=t.gamma&&i(innerWidth*(.5+Math.max(-30,Math.min(30,t.gamma))/60),innerHeight*(.2+Math.max(-30,Math.min(30,t.beta-45))/90))};return window.addEventListener("pointermove",s,{passive:!0}),window.addEventListener("deviceorientation",a),()=>{window.removeEventListener("pointermove",s),window.removeEventListener("deviceorientation",a),cancelAnimationFrame(e)}}(this)}disconnectedCallback(){super.disconnectedCallback(),this.stopLight?.(),window.removeEventListener("pointerdown",this.onActivity,{capture:!0}),window.removeEventListener("keydown",this.onActivity,{capture:!0}),window.removeEventListener("resize",this.onResize),this.mql.removeEventListener("change",this.onScheme),window.clearInterval(this.ticker),this.unsub?.then((t=>t())).catch((()=>{})),this.unsub=void 0,this.unsubMsg?.then((t=>t())).catch((()=>{})),this.unsubMsg=void 0,this.initStarted=!1}tick(){this.now=new Date;const t=this.config?.settings.screensaver;!t?.enabled||!this.wide||this.draft||this.sheets.length||this.ringingAt||this.sleeping||Date.now()-this.lastActive>6e4*t.timeout_min&&(this.sleeping=!0),this.fullyTick(),this.checkMorning(),this.checkOverload()}checkOverload(){const t=this.config?.settings,e=t?.power_limit&&t.power_entity?this.hass.states[t.power_entity]:void 0,i=Number(e?.state),s="kW"===e?.attributes.unit_of_measurement?1e3*i:i;if(!e||Number.isNaN(s)||s<=t.power_limit)return this.overSince=0,void(this.overload=void 0);this.overSince||(this.overSince=Date.now()),Date.now()-this.overSince>=2e4&&Date.now()>this.overSnooze&&this.makeCtx().allows("overload")&&(this.overload=s,this.sleeping=!1)}checkMorning(){if(this.morning||this.sleeping||this.ringingAt||!this.config||!this.hass)return;if(Date.now()-this.lastActive>15e3)return;const t=this.makeCtx();t.allows("morning")&&function(t,e){const i=t.config.settings;if(!i.morning||t.editing||t.narrow)return!1;const[s,a]=i.dark_to.split(":").map(Number);if(60*e.getHours()+e.getMinutes()<60*s+a||e.getHours()>=12)return!1;try{return localStorage.getItem(Fc)!==Uc()}catch{return!1}}(t,new Date)&&(!function(){try{localStorage.setItem(Fc,Uc())}catch{}}(),this.morning=!0)}fullyTick(){const t=this.config?.settings,e=this.hass&&t&&Qs(this.lic.plan,"fully")?ji(this.hass):void 0;if(!e||!t)return;const i=t.fully,s=()=>{};(async function(t,e,i){e.motion&&"on"===t.states[e.motion]?.state!==i&&await t.callService("switch",i?"turn_on":"turn_off",{entity_id:e.motion})})(this.hass,e,i.motion_wake).catch(s);const a=i.night_dim&&Bd(this.now,t.dark_from,t.dark_to);a===this.nightApplied||this.ringingAt||(this.nightApplied=a,Ti(this.hass,e,a?i.night_brightness:100).catch(s)),a&&i.night_off_min>0&&!this.screenOffSent&&!this.ringingAt&&Date.now()-this.lastActive>6e4*i.night_off_min&&(this.screenOffSent=!0,Pi(this.hass,e,!1).catch(s))}watchScreen(){const t=ji(this.hass),e=t?.screen?this.hass.states[t.screen]?.state:void 0;"on"===e&&"off"===this.screenSeen&&this.onActivity(),this.screenSeen=e}get assetBase(){return this.panel?.config?.asset_base??"/smartnest_static/static/"}async init(){if(this.initStarted=!0,!document.getElementById("smartnest-fonts")){const t=document.createElement("style");t.id="smartnest-fonts",t.textContent=ii(this.assetBase),document.head.appendChild(t)}const t=Zd(this.hass.language);try{const s=await async function(t){return(await t.callWS({type:"smartnest/config/get"})).config}(this.hass);s?this.config=Ie(s,t):(this.config=function(t,e,i){const s={version:1,settings:Le(i),names:{},pages:[]},a=Object.keys(t.states).some((t=>"camera"===Xt(t)))?["home","rooms","power","security","doorbell"]:["home","rooms","power","climate"];return s.pages=a.map((i=>Ne(i,t,s,e))),s.settings.default_page=s.pages[0].id,s}(this.hass,St(t),t),this.config.settings.setup_done=!1,this.hass.user?.is_admin&&We(this.hass,this.config).catch((()=>{})));let a="";try{a=localStorage.getItem("smartnest-home-page")??""}catch{}this.pageId=(a&&this.config.pages.some((t=>t.id===a))?a:"")||this.config.settings.default_page||this.config.pages[0]?.id||"",this.config.settings.setup_done||!this.hass.user?.is_admin||Fd?this.hass.user?.is_admin||(()=>{try{return"1"===localStorage.getItem(fd)}catch{return!0}})()||Fd||window.setTimeout((()=>this.touring=!0),1500):window.setTimeout((()=>this.openWizard()),300),this.unsubMsg=this.hass.connection.subscribeMessage((t=>{if(this.message=t.message??void 0,t.message){this.sleeping=!1,this.onActivity();const t=Qs(this.lic.plan,"fully")?ji(this.hass):void 0;t&&Pi(this.hass,t,!0).catch((()=>{}))}}),{type:"smartnest/message/subscribe"}),this.unsub=(e=this.hass,i=e=>{!this.draft&&e&&(this.config=Ie(e,t))},e.connection.subscribeMessage((t=>i(t.config)),{type:"smartnest/config/subscribe"})),this.hass.callWS({type:"smartnest/license/status"}).then((t=>this.lic={licensee:t.licensee,plan:t.plan??"premium",expires:t.expires??void 0,trial:!!t.trial,reseller:t.reseller??""}),(()=>{}))}catch(s){if("not_licensed"===s?.code){const t=await this.hass.callWS({type:"smartnest/license/status"});return void(this.license={instance_id:t.instance_id,expired:t.expired})}this.loadError=String(s?.message??s)}var e,i}willUpdate(t){t.has("hass")&&this.hass&&!this.initStarted&&this.init(),t.has("hass")&&(this.watchDoorbell(),this.watchScreen()),t.has("config")&&this.kiosk&&this.config&&!this.config.settings.kiosk.pin_hash&&this.setKiosk(!1)}get panelPath(){return this.route?.prefix??location.pathname}setKiosk(t){this.kiosk=t,function(t){try{t?localStorage.setItem(Hi,"1"):localStorage.removeItem(Hi)}catch{}}(t),Si(t),function(t,e){if(!t)return zi?.(),void(zi=void 0);if(zi)return;const i=()=>{Li()&&!location.pathname.startsWith(e)&&(history.replaceState(null,"",e),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!0}})))};window.addEventListener("popstate",i),window.addEventListener("location-changed",i),zi=()=>{window.removeEventListener("popstate",i),window.removeEventListener("location-changed",i)}}(t,this.panelPath)}setKids(t){this.kids=t;try{t?localStorage.setItem("smartnest-kids","1"):localStorage.removeItem("smartnest-kids")}catch{}t&&this.config?.settings.kids_page&&(this.pageId=this.config.settings.kids_page)}pinThen(t){const e=St(this.uiLang),i=this.config?.settings.kiosk;if(!i?.pin_hash||!i.pin_salt)return t();this.pushSheet({title:e("kiosk_unlock"),render:e=>Z`<sn-pinpad
        .length=${i.pin_length??4}
        prompt=${e.t("enter_pin")}
        error=${e.t("wrong_pin")}
        .onSubmit=${s=>Vi(s,i.pin_salt)===i.pin_hash&&(e.closeSheet(),t(),!0)}
      ></sn-pinpad>`})}unlockSheet(){const t=St(this.uiLang),e=this.config?.settings.kiosk;if(!e?.pin_hash||!e.pin_salt)return this.setKiosk(!1);this.pushSheet({title:t("kiosk_unlock"),render:t=>Z`<sn-pinpad
        .length=${e.pin_length??4}
        prompt=${t.t("enter_pin")}
        error=${t.t("wrong_pin")}
        .onSubmit=${i=>Vi(i,e.pin_salt)===e.pin_hash&&(this.setKiosk(!1),t.closeSheet(),!0)}
      ></sn-pinpad>`})}watchDoorbell(){const t=this.config?.settings.doorbell.trigger_entity,e=t?this.hass.states[t]:void 0;if(!e)return void(this.bellSeen=void 0);const i=t.startsWith("event.")?e.state:`${e.state}|${e.last_changed}`,s=this.bellSeen;this.bellSeen=i,void 0!==s&&s!==i&&(t.startsWith("event.")?"unavailable"!==e.state&&"unknown"!==e.state:"on"===e.state)&&this.ring()}ring(){this.sleeping=!1,this.onActivity(),this.silentBell=!1;const t=ji(this.hass);if(t){const e=()=>{};Pi(this.hass,t,!0).catch(e),Ti(this.hass,t,100).catch(e),this.nightApplied=void 0,t.media&&(this.silentBell=!0,async function(t,e,i){return!!e.media&&(await t.callService("media_player","play_media",{entity_id:e.media,media_content_id:i,media_content_type:"music"}),!0)}(this.hass,t,this.hass.hassUrl(`${this.assetBase}sounds/chime.wav`)).catch((()=>this.silentBell=!1)))}this.ringingAt=new Date;const e=this.ringingAt;window.setTimeout((()=>this.ringingAt===e&&(this.ringingAt=void 0)),9e4)}startEdit(){this.draft=structuredClone(this.config)}cancelEdit(){const t=St(this.uiLang);(JSON.stringify(this.draft)===JSON.stringify(this.config)||confirm(t("discard_changes")))&&(this.draft=void 0,this.sheets=[],this.config.pages.some((t=>t.id===this.pageId))||(this.pageId=this.config.pages[0]?.id??""))}async save(){const t=St(this.uiLang);this.saving=!0;try{await We(this.hass,this.draft),this.config=this.draft,this.draft=void 0,this.sheets=[],this.toast(t("saved"))}catch{this.toast(t("save_failed"))}finally{this.saving=!1}}toast(t){this.toastMsg=t,window.clearTimeout(this.toastTimer),this.toastTimer=window.setTimeout((()=>this.toastMsg=""),3200)}get current(){return this.draft??this.config}get uiLang(){return this.current?.settings.language??Zd(this.hass?.language)}get dark(){const t=this.current?.settings;return t?"dark"===t.theme||"midnight"===t.theme||"light"!==t.theme&&("auto"===t.theme?this.systemDark:Bd(this.now,t.dark_from,t.dark_to)):this.systemDark}makeCtx(){const t=this.uiLang;return{hass:this.hass,config:this.current,lang:t,rtl:Vt(t),t:St(t),dark:this.dark,narrow:!this.wide,isAdmin:!!this.hass.user?.is_admin,editing:!!this.draft,assetBase:this.assetBase,plan:this.lic.plan,allows:t=>Qs(this.lic.plan,t),update:t=>{if(!this.draft)return;const e=structuredClone(this.draft);t(e),this.draft=e},openEntity:(t,e)=>this.pushSheet({origin:e,title:this.current.names[t]||this.hass.states[t]?.attributes.friendly_name||t,render:e=>Z`<sn-entity-detail .ctx=${e} .entityId=${t}></sn-entity-detail>`}),showSheet:t=>this.pushSheet(t),closeSheet:()=>this.sheets=this.sheets.slice(0,-1),toast:t=>this.toast(t),cinematic:t=>{if(this.sleeping=!1,Qs(this.lic.plan,"cinematic")&&(this.scene=t),"cinema"===t){const t=Qs(this.lic.plan,"fully")?ji(this.hass):void 0;t&&Ti(this.hass,t,8).catch((()=>{})),this.nightApplied=void 0}}}}goToPage(t){if(this.kids)return;const e=this.current?.pages??[],i=e.findIndex((t=>t.id===this.pageId)),s=e.findIndex((e=>e.id===t));s<0||t===this.pageId||(this.enterDir=Math.sign(s-i),this.pageId=t)}neighbour(t){if(this.kids)return;const e=this.current?.pages??[],i=e.findIndex((t=>t.id===this.pageId)),s=Vt(this.uiLang)?t>0:t<0;return e[i+(s?1:-1)]?.id}pushSheet(t){this.sheets=[...this.sheets,t]}playThemeFlip(t){if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;const e=document.createElement("div");e.style.cssText="position:fixed;inset:0;z-index:95;pointer-events:none;background:"+(t?"radial-gradient(120% 90% at 50% 0%, rgba(150,90,170,.55), rgba(21,26,30,.85))":"radial-gradient(120% 90% at 50% 100%, rgba(255,190,110,.6), rgba(250,247,242,.85))"),this.renderRoot.appendChild(e),e.animate([{opacity:0},{opacity:1,offset:.35},{opacity:0}],{duration:1600,easing:"cubic-bezier(0.77, 0, 0.175, 1)"}).finished.finally((()=>e.remove()))}updated(){const t=this.dark;if(void 0!==this.lastDark&&t!==this.lastDark&&this.current&&this.playThemeFlip(t),this.lastDark=t,this.enterDir){const t=this.renderRoot.querySelector("main"),e=matchMedia("(prefers-reduced-motion: reduce)").matches,i=(Vt(this.uiLang)?-1:1)*this.enterDir*48;t?.animate([{transform:e?"none":`translateX(${i}px)`,opacity:0},{transform:"none",opacity:1}],{duration:e?160:260,easing:"cubic-bezier(0.22, 1, 0.36, 1)"}),this.enterDir=0}this.kiosk&&Si(!0);const e=this.current?.settings,i=ei(this.dark,e?.accent??""),s="pro"===e?.style&&Qs(this.lic.plan,"style_pro"),a=!!e&&s&&("midnight"===e.theme||e.night_midnight&&this.dark&&"schedule"===e.theme);a&&Object.assign(i,{"--bg":"#000000","--surface":"rgba(16,14,12,.78)","--surface-solid":"#0d0c0b","--surface-2":"#171512","--surface-hover":"rgba(30,26,22,.9)","--text":"#f6e7cf","--text-2":"#8f7f69","--border":"rgba(246,231,207,.07)","--accent-text":"#f0b45c","color-scheme":"dark"}),Object.assign(i,function(t,e,i,s,a,n){if(!t)return{"--sheen":"none","--grain":"none","--material":"none","--leak-opacity":"0","--duo-on":"none","--mono-on":"block","--idle-opacity":"1","--card-radius":"var(--r-lg)","--font-display":"var(--font)","--on-glow":"0%","--display-weight":"700","--display-track":"0"};const r=a??n;return{"--sheen":`radial-gradient(520px circle at var(--lx, 30%) var(--ly, 0%), rgba(255,255,255,${e?.09:.32}), transparent 46%)`,"--grain":_d,"--grain-opacity":e?"0.07":"0.05","--material":vd(s,e),"--leak":r,"--leak-opacity":i?"0.22":e?"0.32":"0.4","--bg-glow":`color-mix(in srgb, ${r} ${e?18:22}%, transparent)`,"--glass-edge":e?"inset 0 1px 0 rgba(255,255,255,.12), inset 0 -18px 30px -24px rgba(0,0,0,.45)":"inset 0 1px 0 rgba(255,255,255,.95), inset 0 -16px 28px -22px rgba(30,37,43,.10)","--shadow":e?"0 1px 0 rgba(255,255,255,.04) inset, 0 2px 6px rgba(0,0,0,.35), 0 22px 50px -12px rgba(0,0,0,.6)":"0 1px 2px rgba(30,37,43,.06), 0 4px 10px rgba(30,37,43,.05), 0 24px 48px -16px rgba(30,37,43,.18)","--duo-on":"block","--mono-on":"none","--idle-opacity":i?"0.42":"1","--card-radius":"28px","--font-display":'"Rubik", var(--font)',"--on-glow":i?"75%":"55%","--display-weight":"800","--display-track":"-0.03em"}}(s,this.dark,a,e?.material??"none",s&&this.hass&&this.current?function(t,e){let i=0,s=0,a=0,n=0;for(const r of ki(e)){const e=t.states[r];if(!e||!r.startsWith("light.")||"on"!==e.state)continue;const o="number"==typeof e.attributes.brightness?e.attributes.brightness/255:.8,[l,c,d]=Array.isArray(e.attributes.rgb_color)?e.attributes.rgb_color:[255,190,120];i+=l*o,s+=c*o,a+=d*o,n+=o}if(n)return`rgb(${Math.round(i/n)}, ${Math.round(s/n)}, ${Math.round(a/n)})`}(this.hass,this.current):void 0,i["--accent"])),this.pro=s;const n="liquid"===this.current?.settings.glass&&Qs(this.lic.plan,"liquid_glass");Object.assign(i,{"--glass-blur":n?"40px":"24px","--glass-sat":n?"230%":"170%","--glass-edge":s&&!n?i["--glass-edge"]:n?this.dark?"inset 0 1px 0 rgba(255,255,255,.18), inset 0 0 0 1px rgba(255,255,255,.07)":"inset 0 1px 0 rgba(255,255,255,.9), inset 0 -1px 0 rgba(255,255,255,.35), inset 0 0 0 1px rgba(255,255,255,.45)":"0 0 #0000",...n?{"--surface":this.dark?"rgba(42,51,59,.46)":"rgba(255,255,255,.48)"}:{}});for(const[r,o]of Object.entries(i))this.style.setProperty(r,o);this.setAttribute("dir",Vt(this.uiLang)?"rtl":"ltr"),this.setAttribute("lang",this.uiLang)}renderBar(t){const{t:e}=t,i=t.config,s=i.settings.home_name||this.hass.config?.location_name||"SmartNest";return Z`<header class="glass">
      ${this.narrow&&!this.kiosk?Z`<button
            class="icon-btn pressable"
            aria-label="menu"
            @click=${()=>this.dispatchEvent(new Event("hass-toggle-menu",{bubbles:!0,composed:!0}))}
          >
            <sn-icon icon="grid"></sn-icon>
          </button>`:q}
      <div class="home">
        <img
          src="${this.assetBase}logo/smartnest-symbol-${t.dark?"white":"color"}.svg"
          alt="SmartNest"
          role="button"
          tabindex="0"
          style="cursor:pointer"
          @click=${()=>this.aboutSheet()}
        />
        <span>${s}</span>
      </div>
      ${t.narrow||this.kids?q:Z`<nav>
            <div class="seg" role="tablist">
              ${i.pages.filter((e=>!e.person||!t.allows("person_pages")||t.editing||e.id===this.pageId)).map((e=>Z`<button role="tab" aria-pressed=${e.id===this.pageId} aria-selected=${e.id===this.pageId} @click=${()=>this.tabClick(t,e.id)}>
                  <sn-icon .icon=${e.icon} style="--icon-size:18px"></sn-icon>${e.title}
                </button>`))}
            </div>
          </nav>`}
      <div class="actions">
        ${this.kids||t.editing||!t.allows("person_pages")?q:i.pages.filter((t=>t.person&&this.hass.states[t.person])).map((e=>{const i=this.hass.states[e.person],s=i.attributes.entity_picture;return Z`<button
                  class="avatar pressable ${e.id===this.pageId?"on":""}"
                  aria-label=${e.title}
                  title=${e.title}
                  style=${s?`background-image:url('${this.hass.hassUrl(s)}')`:""}
                  @click=${()=>this.tabClick(t,e.id)}
                >
                  ${s?"":(i.attributes.friendly_name??"?").slice(0,1)}
                </button>`}))}
        ${this.kids?Z`<button class="icon-btn primary pressable" aria-label=${e("kids_mode")} title=${e("kids_mode")} @click=${()=>this.pinThen((()=>this.setKids(!1)))}>
              <sn-icon icon="child" style="--icon-size:22px"></sn-icon>
            </button>`:t.allows("kids")&&!t.editing&&t.config.settings.kids_page&&t.config.pages.some((e=>e.id===t.config.settings.kids_page))?Z`<button class="icon-btn pressable" aria-label=${e("kids_mode")} title=${e("kids_mode")} @click=${()=>this.setKids(!0)}>
              <sn-icon icon="child" style="--icon-size:22px"></sn-icon>
            </button>`:q}
        ${!this.kids&&t.allows("guests")&&!t.editing&&t.config.settings.guests.ssid?Z`<button
              class="icon-btn pressable ${this.guests?"primary":""}"
              aria-label=${e("guests_mode")}
              title=${e("guests_mode")}
              @click=${()=>{this.guests=!this.guests,function(t){try{t?localStorage.setItem(Ia,"1"):localStorage.removeItem(Ia)}catch{}}(this.guests)}}
            >
              <sn-icon icon="guests" style="--icon-size:20px"></sn-icon>
            </button>`:q}
        ${!this.kids&&t.allows("travel")&&!t.editing&&this.hass.states[Hd]?Z`<button
              class="icon-btn pressable ${"on"===this.hass.states[Hd].state?"primary":""}"
              aria-label=${e("travel")}
              title=${e("travel")}
              @click=${()=>Ld(t)}
            >
              <sn-icon icon="airplane" style="--icon-size:20px"></sn-icon>
            </button>`:q}
        ${this.kids||!t.allows("assistant")||t.editing?q:Z`<button
              class="icon-btn pressable"
              aria-label=${e("assistant")}
              title=${e("assistant")}
              @click=${()=>this.pushSheet({title:e("assistant"),render:t=>Z`<sn-assistant .ctx=${t}></sn-assistant>`})}
            >
              <sn-icon icon="assistant" style="--icon-size:20px"></sn-icon>
            </button>`}
        ${!this.kids&&t.allows("camera_wall")&&!t.editing&&Td(t).length?Z`<button class="icon-btn pressable" aria-label=${e("camera_wall")} title=${e("camera_wall")} @click=${()=>this.camwall=!0}>
              <sn-icon icon="cctv" style="--icon-size:20px"></sn-icon>
            </button>`:q}
        ${this.kids?q:this.kiosk?Z`<button class="icon-btn primary pressable" aria-label=${e("kiosk_unlock")} title=${e("kiosk_unlock")} @click=${()=>this.unlockSheet()}>
              <sn-icon icon="lock" style="--icon-size:20px"></sn-icon>
            </button>`:!t.editing&&t.config.settings.kiosk.pin_hash?Z`<button class="icon-btn pressable" aria-label=${e("kiosk_lock")} title=${e("kiosk_lock")} @click=${()=>this.setKiosk(!0)}>
              <sn-icon icon="lock-open" style="--icon-size:20px"></sn-icon>
            </button>`:q}
        ${this.kiosk||this.kids?q:t.editing?Z`<button class="btn pressable" @click=${()=>this.cancelEdit()}>${e("cancel")}</button>
              <button class="btn primary pressable" ?disabled=${this.saving} @click=${()=>this.save()}>
                ${this.saving?e("saving"):e("save")}
              </button>`:t.isAdmin?Z`<button class="icon-btn pressable" aria-label=${e("edit")} title=${e("edit")} @click=${()=>this.startEdit()}>
              <sn-icon icon="pencil" style="--icon-size:20px"></sn-icon>
            </button>`:q}
      </div>
      ${t.editing||this.kids?q:this.renderChips(t)}
      ${this.renderExpiry(t)}
    </header>`}renderExpiry(t){const e=this.lic.expires;if(!e||!t.isAdmin)return q;const i=Math.ceil((1e3*e-Date.now())/864e5);return i>14||i<0?q:Z`<div style="order:6;flex-basis:100%;font-size:13px;padding:8px 12px;border-radius:12px;background:color-mix(in srgb,var(--accent) 16%,transparent);color:var(--accent-text)">
      ${t.t("expires_soon",{n:i})}
    </div>`}openWizard(){const t=St(this.uiLang);this.pushSheet({title:t("wizard_title"),render:e=>Z`<sn-wizard
        .ctx=${e}
        .onDone=${i=>{this.config=i,this.pageId=i.settings.default_page,We(this.hass,i).catch((()=>this.toast(t("save_failed")))),e.closeSheet()}}
      ></sn-wizard>`})}tourSteps(){const t=this.renderRoot,e=e=>t.querySelector("sn-page-grid")?.shadowRoot?.querySelector(e);return[{target:()=>t.querySelector("nav"),text:"tour_tabs"},{target:()=>t.querySelector(".chips"),text:"tour_chips"},{target:()=>e("sn-w-floorplan"),text:"tour_plan"},{target:()=>e("sn-w-modes"),text:"tour_modes"},{target:()=>e("sn-w-tile"),text:"tour_tile"},{target:()=>t.querySelector('header button[aria-label="'+this.makeCtx().t("assistant")+'"]'),text:"tour_assistant"},{target:()=>t.querySelector(".home img"),text:"tour_logo"}]}aboutSheet(){const t=St(this.uiLang);this.pushSheet({title:t("about"),render:t=>{let e="";try{e=localStorage.getItem("smartnest-home-page")??""}catch{}return Z`<div style="display:grid;gap:18px">
          <div style="display:flex;align-items:center;gap:14px">
            <img src="${t.assetBase}logo/smartnest-symbol-${t.dark?"white":"color"}.svg" alt="SmartNest" style="width:52px;height:52px" />
            <div style="display:grid;gap:2px">
              <strong>SmartNest</strong>
              <span class="muted" style="font-size:13px">${t.t("tagline")}</span>
              <span class="muted ltr" style="font-size:12px">${t.t("version")} ${Ed}${this.lic.licensee?` · ${this.lic.licensee}`:""}</span>
            </div>
          </div>
          ${i=t,i.config.settings.installer.phone&&i.allows("support")?Z`<button class="btn primary pressable" @click=${()=>function(t,e){const i=(t.config.settings.installer.phone??"").replace(/[^\d]/g,"");t.showSheet({title:t.t("support_title"),render:t=>Z`<form
      style="display:grid;gap:12px"
      @submit=${s=>{s.preventDefault();const a=[s.currentTarget.elements.namedItem("msg").value.trim()||t.t("support_default"),"",...Fa(t,e)].join("\n");window.open(`https://wa.me/${i}?text=${encodeURIComponent(a)}`,"_blank","noopener"),t.closeSheet()}}
    >
      <span class="muted" style="font-size:14px">${t.t("support_hint",{name:t.config.settings.installer.name||"SmartNest"})}</span>
      <textarea name="msg" rows="4" placeholder=${t.t("support_placeholder")}></textarea>
      <div style="font-size:13px;color:var(--text-2);white-space:pre-line;unicode-bidi:plaintext">${Fa(t,e).join("\n")}</div>
      <button class="btn primary pressable" type="submit" style="min-height:52px"><sn-icon icon="whatsapp" style="--icon-size:22px"></sn-icon>${t.t("support_send")}</button>
    </form>`})}(t,Ed)}><sn-icon icon="whatsapp" style="--icon-size:20px"></sn-icon>${t.t("support_title")}</button>`:q}
          ${t.allows("rating")?Z`<button class="btn primary pressable" @click=${()=>zs(t)}><sn-icon icon="star" style="--icon-size:20px"></sn-icon>${t.t("rate_service")}</button>`:q}
          <section style="display:grid;gap:12px">
            <h3 style="margin:0;font-size:13px;font-weight:700;color:var(--text-2)">${t.t("this_screen")}</h3>
            <label class="field"
              >${t.t("opens_on")}
              <select
                @change=${t=>{try{t.target.value?localStorage.setItem("smartnest-home-page",t.target.value):localStorage.removeItem("smartnest-home-page")}catch{}}}
              >
                <option value="" ?selected=${!e}>${t.t("default_page")}</option>
                ${t.config.pages.map((t=>Z`<option value=${t.id} ?selected=${e===t.id}>${t.title}</option>`))}
              </select>
            </label>
            <div class="field">
              ${t.t("tv_mode")}
              <div class="seg">
                ${[!0,!1].map((e=>Z`<button
                    aria-pressed=${this.tvMode===e}
                    @click=${()=>{this.tvMode=e;try{e?localStorage.setItem("smartnest-tv","1"):localStorage.removeItem("smartnest-tv")}catch{}}}
                  >
                    ${t.t(e?"on":"off")}
                  </button>`))}
              </div>
            </div>
            <div class="field">
              ${t.t("big_text")}
              <div class="seg">
                ${[!0,!1].map((e=>Z`<button
                    aria-pressed=${this.big===e}
                    @click=${()=>{this.big=e;try{e?localStorage.setItem("smartnest-big","1"):localStorage.removeItem("smartnest-big")}catch{}}}
                  >
                    ${t.t(e?"on":"off")}
                  </button>`))}
              </div>
            </div>
            ${t.isAdmin&&t.allows("showroom")?Z`<div class="field">
                  ${t.t("showroom")}
                  <div class="seg">
                    ${[!0,!1].map((e=>Z`<button
                        aria-pressed=${Fd===e}
                        @click=${()=>{if(e!==Fd){try{e?localStorage.setItem("smartnest-showroom","1"):localStorage.removeItem("smartnest-showroom")}catch{}location.reload()}}}
                      >
                        ${t.t(e?"on":"off")}
                      </button>`))}
                  </div>
                  <span class="hint">${t.t("showroom_hint")}</span>
                </div>`:q}
            <div style="display:flex;gap:8px;flex-wrap:wrap">
              ${t.allows("photo_frame")?Z`<button class="btn pressable" @click=${()=>async function(t){let e;try{e=await t.hass.callWS({type:"smartnest/photos/link"})}catch{return t.toast(t.t("error"))}const i=`${location.origin}${e.path}`;t.showSheet({title:t.t("photos_from_phone"),render:t=>Z`<div style="display:grid;gap:14px;justify-items:center;text-align:center">
      ${Wa(i,220)}
      <span style="font-size:16px">${t.t("photos_scan",{n:e.minutes})}</span>
      <span class="muted" style="font-size:13px">${t.t("photos_wifi")}</span>
    </div>`})}(t)}>📷 ${t.t("photos_from_phone")}</button>`:q}
              <button class="btn pressable" @click=${()=>(this.sheets=[],this.touring=!0)}>🧭 ${t.t("tour_again")}</button>
            </div>
            ${t.allows("voice")?Z`<div class="field">
                  ${t.t("voice_hands_free")}
                  <div class="seg">
                    ${[!0,!1].map((e=>Z`<button
                        aria-pressed=${this.voice===e}
                        @click=${()=>{this.voice=e,(t=>{try{t?localStorage.setItem(pd,"1"):localStorage.removeItem(pd)}catch{}})(e)}}
                      >
                        ${t.t(e?"on":"off")}
                      </button>`))}
                  </div>
                  <span class="hint">${t.t("voice_hint")}</span>
                </div>`:q}
          </section>
        </div>`;var i}})}tabClick(t,e){if(e===this.pageId&&t.editing)return an(t,e,(()=>this.pageId=this.current.pages[0]?.id??""));this.goToPage(e)}renderTabbar(t){return Z`<nav class="tabbar glass" role="tablist">
      ${t.config.pages.map((e=>Z`<button role="tab" aria-selected=${e.id===this.pageId} class=${e.id===this.pageId?"on":""} @click=${()=>this.tabClick(t,e.id)}>
          <sn-icon .icon=${e.icon}></sn-icon><span>${e.title}</span>
        </button>`))}
    </nav>`}renderChips(t){const e=Ai(t);return e.length?Z`<div class="chips" role="list">
      ${e.map((e=>Z`<button class="chip pressable ${e.tone}" role="listitem" @click=${()=>"travel"===e.type?Ld(t):e.entities.length?function(t,e){t.showSheet({title:$i.find((t=>t.id===e))?t.t($i.find((t=>t.id===e)).label):"",render:t=>{const i=Ai(t).find((t=>t.type===e));return i&&i.entities.length?Z`<div style="display:grid;gap:12px">
        ${i.bulk?Z`<button
              class="btn primary pressable"
              @click=${()=>{navigator.vibrate?.(10);const e=i.entities;("lock"===i.bulk?t.hass.callService("lock","lock",{entity_id:e}):t.hass.callService("homeassistant","turn_off",{entity_id:e})).catch((()=>t.toast(t.t("error"))))}}
            >
              <sn-icon .icon=${"lock"===i.bulk?"lock":"power"} style="--icon-size:20px"></sn-icon>${t.t("lock"===i.bulk?"lock_all":"turn_all_off")}
            </button>`:null}
        ${i.entities.map((e=>{const i=t.hass.states[e];return Z`<button
            class="glass pressable"
            style="display:flex;align-items:center;gap:12px;padding:10px 14px;border-radius:var(--r-md);text-align:start"
            @click=${()=>t.openEntity(e)}
          >
            <span
              style="display:grid;place-items:center;width:40px;height:40px;border-radius:999px;background:var(--tone);color:var(--on-tone);${Qt(i)}"
            >
              <sn-icon .icon=${te(i,e)} style="--icon-size:20px"></sn-icon>
            </span>
            <span style="flex:1;font-weight:500">${Kt(t.hass,t.config,e)}</span>
            <span class="muted" style="font-size:14px;unicode-bidi:plaintext">${re(t.t,i,t.lang)}</span>
          </button>`}))}
      </div>`:Z`<p class="muted" style="text-align:center">✓</p>`}})}(t,e.type):void 0}>
          <sn-icon .icon=${e.icon}></sn-icon>${ls(e.label)}
        </button>`))}
    </div>`:q}async activate(t){const e=St(this.uiLang);if(this.license&&t.trim()){this.license={...this.license,busy:!0,error:void 0};try{await this.hass.callWS({type:"smartnest/license/activate",key:t.trim()}),this.license=void 0,this.initStarted=!1,this.init()}catch{this.license={...this.license,busy:!1,error:e("activate_bad")}}}}renderActivation(){const t=St(this.uiLang),e=this.license,i=!!this.hass.user?.is_admin;return Z`<div class="center">
      <div class="glass" style="width:min(520px,calc(100vw - 32px));padding:32px;border-radius:var(--r-xl);display:grid;gap:18px;text-align:start;color:var(--text)">
        <img src="${this.assetBase}logo/smartnest-symbol-${this.dark?"white":"color"}.svg" alt="SmartNest" style="width:56px;height:56px;animation:none" />
        <div style="display:grid;gap:6px">
          <strong style="font-size:24px">${e.expired?t("expired_title"):t("activate_title")}</strong>
          <span class="muted">${e.expired?t("expired_text"):t("activate_text")}</span>
        </div>
        <div class="field">
          ${t(i?"activate_id":"activate_send")}
          <div style="display:flex;gap:8px">
            <input type="text" class="ltr" readonly .value=${e.instance_id} style="flex:1;font-family:'JetBrains Mono',monospace;font-size:13px" @focus=${t=>t.target.select()} />
            <button
              class="btn pressable"
              @click=${i=>{const s=i.currentTarget,a=()=>s.textContent=t("copied");navigator.clipboard?.writeText(e.instance_id).then(a,(()=>{})),navigator.clipboard||a()}}
            >
              ${t("copy")}
            </button>
          </div>
        </div>
        ${i?Z`<form
              class="field"
              @submit=${t=>{t.preventDefault(),this.activate(t.currentTarget.querySelector("input").value)}}
            >
              ${t("activate_key")}
              <input type="text" class="ltr" placeholder="SN1.…" autocomplete="off" spellcheck="false" style="font-family:'JetBrains Mono',monospace;font-size:13px" />
              ${e.error?Z`<span style="color:var(--alert-text);font-size:14px">${e.error}</span>`:q}
              <button class="btn primary pressable" type="submit" ?disabled=${e.busy} style="justify-self:start;margin-top:6px">${t("activate_btn")}</button>
            </form>`:Z`<p class="muted" style="margin:0">${t("activate_ask")}</p>`}
      </div>
    </div>`}renderWeather(t){const e=t.config.settings.weather,i=e.background&&e.entity&&t.allows("weather_bg")?this.hass.states[e.entity]:void 0;if(!i)return q;const s=this.hass.states["sun.sun"]?.state,a="clear-night"===i.state||(s?"below_horizon"===s:Bd(this.now,t.config.settings.dark_from,t.config.settings.dark_to)),n=this.hass.states["sun.sun"]?.attributes,r=t.allows("sky")&&"number"==typeof n?.elevation?n.elevation:void 0;return Z`<sn-weather-bg .condition=${i.state} ?night=${a} ?dark=${t.dark} .elevation=${r} ?rising=${!!n?.rising}></sn-weather-bg>`}renderDock(t){const{t:e}=t;return Z`<div class="dock glass">
      <button class="btn primary pressable" @click=${()=>function(t,e){const i=(t,i,s)=>{let a="";return t.update((t=>{const n=t.pages.find((t=>t.id===e));if(!n)return;const r=Se(i,s,{y:(o=n.widgets,o.reduce(((t,e)=>Math.max(t,e.y+e.h)),0))});var o;a=r.id,n.widgets=De([...n.widgets,r])})),a};t.showSheet({title:t.t("add_widget"),render:t=>Z`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px">
      ${sn.map((e=>t.allows(ta(e.type))?Z`<button
          class="glass pressable"
          style="display:grid;gap:10px;justify-items:center;padding:20px 12px;border-radius:var(--r-md);font-weight:500"
          @click=${()=>{if(["tile","camera","vacuum","gauge","gate","media","remote"].includes(e.type))return void t.showSheet({title:t.t("choose_entity"),render:t=>Z`<sn-entity-picker
                  .ctx=${t}
                  .filter=${Qa[e.type]??{}}
                  .onPick=${s=>{i(t,e.type,{entity:s}),t.closeSheet(),t.closeSheet()}}
                ></sn-entity-picker>`});const s="floorplan"===e.type?{floors:[Ve(t.t("floor_default"))]}:"heading"===e.type?{text:""}:{},a=i(t,e.type,s);t.closeSheet(),"heading"===e.type&&en(t,0,a)}}
        >
          <span style="display:grid;place-items:center;width:52px;height:52px;border-radius:999px;background:var(--accent);color:var(--on-accent)">
            <sn-icon .icon=${e.icon}></sn-icon>
          </span>
          ${t.t(`widget_${e.type}`)}
          <span class="muted ltr" style="font-size:12px">${He[e.type].w}×${He[e.type].h}</span>
        </button>`:Z`<div
          class="glass"
          style="display:grid;gap:10px;justify-items:center;padding:20px 12px;border-radius:var(--r-md);font-weight:500;opacity:.55"
          title=${t.t("plan_needed",{plan:t.t(`plan_${Gs(ta(e.type))}`)})}
        >
          <span style="display:grid;place-items:center;width:52px;height:52px;border-radius:999px;background:var(--surface-2)"><sn-icon icon="lock"></sn-icon></span>
          ${t.t(`widget_${e.type}`)}
          <span style="font-size:12px;color:var(--accent-text)">${t.t("plan_needed",{plan:t.t(`plan_${Gs(ta(e.type))}`)})}</span>
        </div>`))}
    </div>`})}(t,this.pageId)}>
        <sn-icon icon="plus" style="--icon-size:20px"></sn-icon>${e("add_widget")}
      </button>
      <button class="btn pressable" @click=${()=>an(t,this.pageId,(()=>this.pageId=this.current.pages[0]?.id??""))}>
        <sn-icon icon="pencil" style="--icon-size:20px"></sn-icon>${e("page_settings")}
      </button>
      <button class="btn pressable" @click=${()=>function(t,e){t.showSheet({title:t.t("add_page"),render:t=>Ja(t.t("choose_template"),Z`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px">
        ${je.map((i=>Z`<button
            class="glass pressable"
            style="display:grid;gap:10px;justify-items:center;padding:20px 12px;border-radius:var(--r-md);font-weight:500"
            @click=${()=>{const s=Ne(i.id,t.hass,t.config,t.t);t.update((t=>t.pages.push(s))),t.closeSheet(),e(s.id)}}
          >
            <span style="display:grid;place-items:center;width:52px;height:52px;border-radius:999px;background:var(--surface-2)">
              <sn-icon .icon=${i.icon}></sn-icon>
            </span>
            ${t.t(i.label)}
          </button>`))}
      </div>`)})}(t,(t=>this.pageId=t))}>
        <sn-icon icon="dashboard" style="--icon-size:20px"></sn-icon>${e("add_page")}
      </button>
      <button class="icon-btn pressable" aria-label=${e("settings")} @click=${()=>cn(t,{version:Ed,license:this.lic,testDoorbell:()=>this.ring()})}>
        <sn-icon icon="cog" style="--icon-size:20px"></sn-icon>
      </button>
    </div>`}render(){if(!this.hass)return q;if(this.license)return this.renderActivation();if(!this.current){const t=St(this.uiLang);return Z`<div class="center">
        <div style="display:grid;gap:12px;justify-items:center">
          <img src="${this.assetBase}logo/smartnest-symbol-${this.dark?"white":"color"}.svg" alt="SmartNest" />
          <span>${this.loadError?`${t("error")}: ${this.loadError}`:t("loading")}</span>
        </div>
      </div>`}const t=this.makeCtx(),e=this.kids&&t.config.settings.kids_page?t.config.settings.kids_page:this.pageId,i=t.config.pages.find((t=>t.id===e))??t.config.pages[0];return Z`<div class="app ${this.pro?"pro":""} ${t.narrow?"compact":""} ${this.kids?"kids":""} ${this.tvMode?"tv":""} ${this.big&&!this.tvMode?"big":""}">
      ${this.pro?Z`<div class="leaks" aria-hidden="true"><i></i><i></i></div>`:q}
      ${this.renderWeather(t)}
      ${this.renderBar(t)}
      ${i?Mt(i.id,Z`<main
              @sn-cancel-swipe=${t=>{this.swipe=void 0;const e=t.currentTarget;e.style.transform="",e.style.opacity=""}}
              @pointerdown=${this.onSwipeDown} @pointermove=${this.onSwipeMove} @pointerup=${this.onSwipeUp} @pointercancel=${this.onSwipeUp}>
              ${this.guests&&t.allows("guests")&&!t.editing?Z`<sn-guests .ctx=${t}></sn-guests>`:q}
              <sn-page-grid .ctx=${t} .page=${i}></sn-page-grid>
            </main>`):q}
      ${t.editing?this.renderDock(t):q}
      ${t.narrow&&t.config.pages.length>1&&!this.kids?this.renderTabbar(t):q}
      <sn-sheet-host .ctx=${t} .sheets=${this.sheets}></sn-sheet-host>
      ${this.ringingAt?Z`<sn-doorbell .ctx=${t} .at=${this.ringingAt} .silent=${this.silentBell} .onDismiss=${()=>this.ringingAt=void 0}></sn-doorbell>`:q}
      ${this.message&&t.allows("messages")?Z`<sn-message .ctx=${t} .msg=${this.message}></sn-message>`:q}
      ${(()=>{const e=t.allows("alarm_screen")?Object.values(this.hass.states).find((t=>t.entity_id.startsWith("alarm_control_panel.")&&"triggered"===t.state)):void 0;return e&&this.alarmHiddenAt!==e.last_changed?Z`<sn-alarm .ctx=${t} .alarm=${e} .onHide=${()=>(this.alarmHiddenAt=e.last_changed,this.requestUpdate())}></sn-alarm>`:q})()}
      ${(()=>{const e=t.allows("weather_alert")&&!t.editing?function(t){const{hass:e,config:i}=t,s=i.settings.weather.entity?e.states[i.settings.weather.entity]:void 0;if(!s)return;const a=Number(s.attributes.wind_speed),n=Sd.includes(s.state)?s.state:a>=45?"windy":"";if(!n)return;const r=ki(i),o=r.filter((t=>{const i=e.states[t];return i&&"binary_sensor"===Xt(t)&&"on"===i.state&&["window","opening"].includes(i.attributes.device_class)})),l=r.filter((t=>{const i=e.states[t];return i&&"cover"===Xt(t)&&"open"===i.state&&!["garage","door","gate"].includes(i.attributes.device_class)}));return o.length||l.length?{condition:n,open:o,covers:l}:void 0}(t):void 0,i=e?`${e.condition}|${(new Date).toDateString()}`:"";return e&&this.wxDismissed!==i&&!this.overload?Z`<sn-weather-alert .ctx=${t} .risk=${e} .onDismiss=${()=>this.wxDismissed=i}></sn-weather-alert>`:q})()}
      ${this.overload?Z`<sn-overload
            .ctx=${t}
            .watts=${this.overload}
            .onDismiss=${()=>{this.overload=void 0,this.overSnooze=Date.now()+6e5}}
          ></sn-overload>`:q}
      ${this.touring?Z`<sn-tour .ctx=${t} .steps=${this.tourSteps()} .onDone=${()=>this.touring=!1}></sn-tour>`:q}
      ${this.voice&&t.allows("voice")&&!t.editing&&!this.sleeping?Z`<sn-voice .ctx=${t}></sn-voice>`:q}
      ${this.camwall?Z`<sn-camwall .ctx=${t} .onClose=${()=>this.camwall=!1}></sn-camwall>`:q}
      ${this.morning?Z`<sn-morning .ctx=${t} .onDone=${()=>this.morning=!1}></sn-morning>`:q}
      ${this.scene?Z`<sn-cinematic .ctx=${t} .mode=${this.scene} .onDone=${()=>this.scene=void 0}></sn-cinematic>`:q}
      ${this.sleeping?Z`<sn-screensaver .ctx=${t} ?guests=${this.guests&&t.allows("guests")} .onWake=${()=>{this.sleeping=!1,this.onActivity(),this.checkMorning()}}></sn-screensaver>`:q}
      ${this.toastMsg?Z`<div class="toast" role="status">${this.toastMsg}</div>`:q}
    </div>`}};Ud.styles=[si,o`
      :host {
        display: block;
        height: 100%;
        min-height: 100vh;
        background: var(--bg);
        color: var(--text);
        transition: background-color 600ms var(--ease-out), color 600ms var(--ease-out);
      }
      .app {
        isolation: isolate;
        position: relative;
        min-height: 100vh;
        background: radial-gradient(900px 600px at 0% 0%, var(--bg-glow), transparent 70%),
          radial-gradient(700px 500px at 100% 100%, var(--bg-glow), transparent 70%);
      }
      /* 2.0: a surface (marble, wood…), film grain, and slow light leaks in the lights' colour. */
      .app.pro::before,
      .app.pro::after {
        content: "";
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: -1;
      }
      .app.pro::before {
        background-image: var(--material);
        background-size: cover;
        opacity: 0.55;
      }
      .app.pro::after {
        background-image: var(--grain);
        opacity: var(--grain-opacity, 0.05);
        z-index: 30;
        mix-blend-mode: overlay;
      }
      .leaks {
        position: fixed;
        inset: 0;
        z-index: -1;
        pointer-events: none;
        overflow: hidden;
        opacity: var(--leak-opacity, 0);
        transition: opacity 1.2s var(--ease-out);
      }
      .leaks i {
        position: absolute;
        width: 60vmax;
        height: 60vmax;
        border-radius: 50%;
        background: radial-gradient(circle, var(--leak), transparent 62%);
        filter: blur(40px);
        transition: --leak 2s ease;
        animation: drift 38s ease-in-out infinite alternate;
      }
      .leaks i:nth-child(1) {
        top: -25vmax;
        inset-inline-start: -15vmax;
      }
      .leaks i:nth-child(2) {
        bottom: -30vmax;
        inset-inline-end: -20vmax;
        animation-duration: 46s;
        animation-direction: alternate-reverse;
        opacity: 0.7;
      }
      @keyframes drift {
        to {
          transform: translate(12vmax, 8vmax) scale(1.15);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .leaks i {
          animation: none;
        }
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
      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 999px;
        border: 2px solid transparent;
        background: var(--surface-2) center / cover;
        color: var(--text);
        font: 700 16px var(--font);
        cursor: pointer;
        transition: transform 200ms cubic-bezier(0.22, 1, 0.36, 1), border-color 200ms;
      }
      .avatar.on {
        border-color: var(--accent);
        transform: scale(1.08);
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
        touch-action: pan-y; /* vertical scroll stays native; horizontal drags become page swipes */
      }
      .compact main {
        padding: 14px;
        padding-bottom: 120px;
      }
      /* TV mode: read from the sofa. */
      .tv {
        zoom: 1.35;
      }
      /* Large text for grandparents: bigger everything, stronger text. */
      .big {
        zoom: 1.2;
        --text-2: var(--text);
      }
      .big main {
        font-weight: 500;
      }
      /* Kids mode: bigger targets everywhere on the one page they get. */
      .kids main {
        font-size: 1.15em;
      }
      .kids .home span::after {
        content: " 🧸";
      }
      .tabbar {
        position: fixed;
        z-index: 25;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        gap: 2px;
        padding: 6px 8px max(8px, env(safe-area-inset-bottom));
        border-radius: 0;
        border-width: 1px 0 0 0;
        overflow-x: auto;
        scrollbar-width: none;
      }
      .tabbar::-webkit-scrollbar {
        display: none;
      }
      .tabbar button {
        flex: 1 0 64px;
        display: grid;
        justify-items: center;
        gap: 2px;
        padding: 6px 4px;
        border-radius: 12px;
        color: var(--text-2);
        font-size: 11px;
        font-weight: 500;
        --icon-size: 24px;
        transition: color var(--dur-fast) var(--ease-out);
      }
      .tabbar button span {
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .tabbar button.on {
        color: var(--accent-text);
      }
      .tabbar button:active sn-icon {
        transform: scale(0.88);
      }
      .tabbar sn-icon {
        transition: transform 120ms var(--ease-out);
      }
      .compact main {
        padding-bottom: calc(110px + env(safe-area-inset-bottom));
      }
      .compact .dock {
        bottom: calc(76px + env(safe-area-inset-bottom));
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
    `],Wd([gt({attribute:!1})],Ud.prototype,"hass",1),Wd([gt({type:Boolean,reflect:!0})],Ud.prototype,"narrow",2),Wd([gt({attribute:!1})],Ud.prototype,"panel",2),Wd([gt({attribute:!1})],Ud.prototype,"route",2),Wd([mt()],Ud.prototype,"config",2),Wd([mt()],Ud.prototype,"draft",2),Wd([mt()],Ud.prototype,"pageId",2),Wd([mt()],Ud.prototype,"sheets",2),Wd([mt()],Ud.prototype,"toastMsg",2),Wd([mt()],Ud.prototype,"ringingAt",2),Wd([mt()],Ud.prototype,"sleeping",2),Wd([mt()],Ud.prototype,"saving",2),Wd([mt()],Ud.prototype,"loadError",2),Wd([mt()],Ud.prototype,"license",2),Wd([mt()],Ud.prototype,"lic",2),Wd([mt()],Ud.prototype,"now",2),Wd([mt()],Ud.prototype,"systemDark",2),Wd([mt()],Ud.prototype,"wide",2),Wd([mt()],Ud.prototype,"kiosk",2),Wd([mt()],Ud.prototype,"kids",2),Wd([mt()],Ud.prototype,"silentBell",2),Wd([mt()],Ud.prototype,"scene",2),Wd([mt()],Ud.prototype,"morning",2),Wd([mt()],Ud.prototype,"camwall",2),Wd([mt()],Ud.prototype,"overload",2),Wd([mt()],Ud.prototype,"wxDismissed",2),Wd([mt()],Ud.prototype,"pro",2),Wd([mt()],Ud.prototype,"big",2),Wd([mt()],Ud.prototype,"touring",2),Wd([mt()],Ud.prototype,"voice",2),Wd([mt()],Ud.prototype,"guests",2),Wd([mt()],Ud.prototype,"tvMode",2),Wd([mt()],Ud.prototype,"message",2),Ud=Wd([pt("smartnest-panel")],Ud),console.info(`%c SmartNest %c v${Ed} `,"background:#E9971D;color:#1E252B;font-weight:700;border-radius:4px 0 0 4px","background:#1E252B;color:#fff;border-radius:0 4px 4px 0");const qd=globalThis.__SN_DEMO_BASE??"/dev/",Yd=()=>(new Date).toISOString(),Xd=(t,e,i)=>({entity_id:t,state:e,attributes:i,last_changed:new Date(Date.now()-36e5*Math.random()).toISOString(),last_updated:Yd()}),Kd=new URLSearchParams(location.search),Jd={},Gd=t=>Jd[t.entity_id]=t;Gd(Xd("light.living_room","on",{friendly_name:"ضو الصالة",brightness:200,supported_color_modes:["hs","color_temp"],color_mode:"hs",hs_color:[38,88],rgb_color:[255,177,31],min_color_temp_kelvin:2200,max_color_temp_kelvin:6500})),Gd(Xd("light.kitchen","off",{friendly_name:"ضو المطبخ",supported_color_modes:["brightness"]})),Gd(Xd("light.bedroom","off",{friendly_name:"ضو غرفة النوم",supported_color_modes:["color_temp"],color_mode:"color_temp",color_temp_kelvin:3e3,min_color_temp_kelvin:2700,max_color_temp_kelvin:6500})),Gd(Xd("light.entrance","on",{friendly_name:"ضو المدخل",supported_color_modes:["onoff"]})),Gd(Xd("switch.coffee_machine","off",{friendly_name:"ماكينة القهوة",device_class:"outlet"})),Gd(Xd("switch.water_heater","on",{friendly_name:"السخان"})),Gd(Xd("climate.living_ac","cool",{friendly_name:"مكيف الصالة",temperature:22,current_temperature:25.5,hvac_action:"cooling",hvac_modes:["off","cool","heat","auto","dry","fan_only"],min_temp:16,max_temp:30,target_temp_step:1})),Gd(Xd("climate.bedroom_ac","off",{friendly_name:"مكيف غرفة النوم",temperature:24,current_temperature:27,hvac_modes:["off","cool","heat","auto"],min_temp:16,max_temp:30,target_temp_step:.5})),Gd(Xd("vacuum.robot","docked",{friendly_name:"روبوت التنظيف",battery_level:92,fan_speed:"balanced",fan_speed_list:["quiet","balanced","turbo","max"]})),Gd(Xd("image.robot_map","2026-10-13T08:00:00Z",{friendly_name:"Robot map",entity_picture:`${qd}robot-map.svg`})),Gd(Xd("select.robot_mop_intensity","moderate",{friendly_name:"Mop intensity",options:["off","mild","moderate","intense"]})),Gd(Xd("sensor.robot_cleaning_area","42",{friendly_name:"Cleaning area",unit_of_measurement:"m²"})),Gd(Xd("sensor.robot_cleaning_time","38",{friendly_name:"Cleaning time",unit_of_measurement:"min",device_class:"duration"})),Gd(Xd("sensor.robot_main_brush_time_left","792000",{friendly_name:"Main brush time left",unit_of_measurement:"s",device_class:"duration"})),Gd(Xd("sensor.robot_side_brush_time_left","540000",{friendly_name:"Side brush time left",unit_of_measurement:"s",device_class:"duration"})),Gd(Xd("sensor.robot_filter_time_left","54000",{friendly_name:"Filter time left",unit_of_measurement:"s",device_class:"duration"})),Gd(Xd("sensor.robot_sensor_time_left","3600",{friendly_name:"Sensor time left",unit_of_measurement:"s",device_class:"duration"})),Gd(Xd("button.robot_empty_dustbin","unknown",{friendly_name:"Empty dustbin"})),Gd(Xd("camera.front_door","idle",{friendly_name:"كاميرا الباب",entity_picture:`${qd}cam-front.svg`,access_token:"dev"})),Gd(Xd("camera.garden","idle",{friendly_name:"كاميرا الحديقة",entity_picture:`${qd}cam-garden.svg`,access_token:"dev"})),Gd(Xd("lock.front_door","locked",{friendly_name:"قفل الباب"})),Gd(Xd("alarm_control_panel.house","disarmed",{friendly_name:"إنذار البيت",code_format:"number",code_arm_required:!1,supported_features:7})),Gd(Xd("fan.bedroom","on",{friendly_name:"مروحة غرفة النوم"})),Gd(Xd("switch.iron","on",{friendly_name:"المكواة"})),Gd(Xd("script.smartnest_panic","off",{friendly_name:"SmartNest · طوارئ"})),Gd(Xd("sensor.home_energy_total","8421",{friendly_name:"عداد الكهرباء",unit_of_measurement:"kWh",device_class:"energy",state_class:"total_increasing"})),Gd(Xd("sensor.solar_energy_total","3104",{friendly_name:"إنتاج الشمسي",unit_of_measurement:"kWh",device_class:"energy",state_class:"total_increasing"})),Gd(Xd("sensor.ac_energy","910",{friendly_name:"المكيفات",unit_of_measurement:"kWh",device_class:"energy"})),Gd(Xd("sensor.heater_energy","520",{friendly_name:"السخان",unit_of_measurement:"kWh",device_class:"energy"})),Gd(Xd("binary_sensor.hallway_motion","off",{friendly_name:"حركة الممر",device_class:"motion"})),Gd(Xd("binary_sensor.front_door_contact","off",{friendly_name:"باب المدخل",device_class:"door"})),Gd(Xd("binary_sensor.kitchen_window","on",{friendly_name:"شباك المطبخ",device_class:"window"})),Gd(Xd("binary_sensor.bathroom_leak","off",{friendly_name:"تسريب الحمام",device_class:"moisture"})),Gd(Xd("sensor.living_temperature","25.5",{friendly_name:"حرارة الصالة",unit_of_measurement:"°C",device_class:"temperature"})),Gd(Xd("sensor.living_humidity","48",{friendly_name:"رطوبة الصالة",unit_of_measurement:"%",device_class:"humidity"})),Gd(Xd("sensor.home_power","1840",{friendly_name:"استهلاك البيت",unit_of_measurement:"W",device_class:"power"})),Gd(Xd("sensor.solar_power","2310",{friendly_name:"الطاقة الشمسية",unit_of_measurement:"W",device_class:"power"})),Gd(Xd("sensor.ac_power","1220",{friendly_name:"استهلاك المكيفات",unit_of_measurement:"W",device_class:"power"})),Gd(Xd("sensor.grid_power","-170",{friendly_name:"الشبكة",unit_of_measurement:"W",device_class:"power"})),Gd(Xd("sensor.water_heater_power","1950",{friendly_name:"السخان",unit_of_measurement:"W",device_class:"power"})),Gd(Xd("sensor.coffee_machine_power","4.6",{friendly_name:"ماكينة القهوة",unit_of_measurement:"W",device_class:"power"})),Gd(Xd("sensor.tv_power","96",{friendly_name:"التلفزيون",unit_of_measurement:"W",device_class:"power"})),Gd(Xd("sensor.fridge_power","140",{friendly_name:"الثلاجة",unit_of_measurement:"W",device_class:"power"})),Gd(Xd("switch.sara_tablet_internet","on",{friendly_name:"تابلت سارة"})),Gd(Xd("switch.mohammad_phone_internet","on",{friendly_name:"جوال محمد"})),Gd(Xd("sensor.to_work","23",{friendly_name:"للشغل",unit_of_measurement:"min",attribution:"Powered by Waze",route:"طريق 1",duration:17})),Gd(Xd("sensor.to_school","9",{friendly_name:"للمدرسة",unit_of_measurement:"min",attribution:"Powered by Waze",route:"شارع المدارس",duration:8})),Gd(Xd("sensor.washing_machine_power","455",{friendly_name:"الغسالة استهلاك",unit_of_measurement:"W",device_class:"power"})),Gd(Xd("sensor.home_abu_mohammad_distance","7.4",{friendly_name:"Home Abu Mohammad Distance",unit_of_measurement:"km",device_class:"distance"})),Gd(Xd("sensor.home_abu_mohammad_direction_of_travel","towards",{friendly_name:"Home Abu Mohammad Direction of travel"})),Gd(Xd("sensor.tesla_battery","78",{friendly_name:"بطارية السيارة",unit_of_measurement:"%",device_class:"battery"})),Gd(Xd("lock.tesla_doors","locked",{friendly_name:"أبواب السيارة"})),Gd(Xd("switch.tesla_charger","off",{friendly_name:"شاحن السيارة"})),Gd(Xd("switch.garden_irrigation","off",{friendly_name:"ري الجنينة"})),Gd(Xd("sensor.pool_temperature","27.5",{friendly_name:"حرارة المسبح",unit_of_measurement:"°C",device_class:"temperature"})),Gd(Xd("switch.pool_pump","on",{friendly_name:"مضخة المسبح"})),Gd(Xd("button.petkit_feeder_feed","unknown",{friendly_name:"أطعم القطة"})),Gd(Xd("sensor.cat_litter_level","35",{friendly_name:"رمل القطة",unit_of_measurement:"%"})),Gd(Xd("switch.smartnest_travel_mode","off",{friendly_name:"SmartNest travel mode",icon:"mdi:airplane",simulating:[]})),Gd(Xd("sensor.front_door_package_count","1",{friendly_name:"طرود عالباب"})),Gd(Xd("sensor.robot_current_room","الصالة",{friendly_name:"الروبوت · الغرفة"})),Gd(Xd("sensor.water_today","312",{friendly_name:"المي اليوم",unit_of_measurement:"L",device_class:"water",state_class:"total_increasing"})),Gd(Xd("sensor.water_tank_level","64",{friendly_name:"خزان المي",unit_of_measurement:"%"})),Gd(Xd("valve.main_water","open",{friendly_name:"محبس المي"})),Gd(Xd("sensor.home_battery_power","300",{friendly_name:"شحن البطارية",unit_of_measurement:"W",device_class:"power"})),Gd(Xd("sensor.home_battery","76",{friendly_name:"بطارية البيت",unit_of_measurement:"%",device_class:"battery"})),Gd(Xd("sensor.backup_last_successful_automatic_backup",new Date(Date.now()-1728e5).toISOString(),{friendly_name:"Last backup",device_class:"timestamp"})),Gd(Xd("sensor.disk_use_percent","41",{friendly_name:"Disk use",unit_of_measurement:"%"})),Gd(Xd("sensor.processor_temperature","52",{friendly_name:"CPU temp",unit_of_measurement:"°C",device_class:"temperature"})),Gd(Xd("sensor.front_door_lock_battery","12",{friendly_name:"بطارية قفل الباب",unit_of_measurement:"%",device_class:"battery"})),Gd(Xd("update.home_assistant_core_update","on",{friendly_name:"Home Assistant Core",title:"Home Assistant Core",latest_version:"2026.10.2"})),Gd(Xd("binary_sensor.wall_tablet_plugged_in","on",{friendly_name:"Plugged in",device_class:"plug"})),Gd(Xd("button.wall_tablet_load_start_url","unknown",{friendly_name:"Load start URL"})),Gd(Xd("sensor.energy_today","12.4",{friendly_name:"استهلاك اليوم",unit_of_measurement:"kWh",device_class:"energy"})),Gd(Xd("event.doorbell",new Date(Date.now()-72e5).toISOString(),{friendly_name:"جرس الباب",device_class:"doorbell",event_types:["ring"]})),Gd(Xd("cover.living_blinds","open",{friendly_name:"برادي الصالة",current_position:100,current_tilt_position:50,supported_features:255})),Gd(Xd("scene.movie_night","scening",{friendly_name:"سهرة فيلم"})),Gd(Xd("ai_task.openai","unknown",{friendly_name:"OpenAI AI Task"})),Gd(Xd("weather.forecast_home",Kd.get("weather")??"sunny",{friendly_name:"الطقس",temperature:27,humidity:40})),Gd(Xd("sun.sun","above_horizon",{friendly_name:"Sun",elevation:Number(Kd.get("elev")??4),rising:!1,next_rising:new Date(Date.now()+324e5).toISOString(),next_setting:new Date(Date.now()+36e5).toISOString()})),Gd(Xd("sensor.bedroom_humidity","68",{friendly_name:"رطوبة غرفة النوم",unit_of_measurement:"%",device_class:"humidity"})),Gd(Xd("sensor.living_pm25","22",{friendly_name:"غبار الصالة",unit_of_measurement:"µg/m³",device_class:"pm25"})),Gd(Xd("fan.air_purifier","off",{friendly_name:"منقّي الهوا"})),Gd(Xd("sensor.living_co2","1180",{friendly_name:"هوا الصالة",unit_of_measurement:"ppm",device_class:"carbon_dioxide"})),Gd(Xd("sensor.abu_mohammad_area","الصالة",{friendly_name:"أبو محمد · الغرفة"}));{const t=(t,e)=>{const i=new Date;return i.setHours(t,e,0,0),i.toISOString()};for(const[e,i,s]of[["fajr",4,52],["dhuhr",11,41],["asr",15,2],["maghrib",17,33],["isha",18,51]])Gd(Xd(`sensor.${e}_prayer`,t(i,s),{friendly_name:e,device_class:"timestamp"}))}Gd(Xd("person.abu_mohammad","home",{friendly_name:"أبو محمد"})),Gd(Xd("person.um_mohammad","not_home",{friendly_name:"أم محمد"})),Gd(Xd("person.mohammad","School",{friendly_name:"محمد"})),Gd(Xd("sensor.water_tank","18",{friendly_name:"خزان المي",unit_of_measurement:"%"})),Gd(Xd("sensor.gas_level","64",{friendly_name:"جرة الغاز",unit_of_measurement:"%"})),Gd(Xd("cover.main_gate","closed",{friendly_name:"البوابة الرئيسية",device_class:"gate"})),Gd(Xd("media_player.living_speaker","playing",{friendly_name:"سماعة الصالة",media_title:"فيروز · صباح ومسا",media_artist:"فيروز",volume_level:.35,is_volume_muted:!1,supported_features:540733,entity_picture:`${qd}photo-1.svg`})),Gd(Xd("media_player.kitchen_speaker","idle",{friendly_name:"سماعة المطبخ",supported_features:524292})),Gd(Xd("remote.living_tv","on",{friendly_name:"تلفزيون الصالة"})),Gd(Xd("tts.google_translate_ar","unknown",{friendly_name:"Google Translate"})),Gd(Xd("todo.shopping","2",{friendly_name:"قائمة المشتريات"})),Gd(Xd("calendar.family","off",{friendly_name:"تقويم العيلة"})),Gd(Xd("calendar.school","off",{friendly_name:"المدرسة"})),Gd(Xd("input_select.house_mode","home",{friendly_name:"House mode",options:["home","away","sleep","evening"]}));for(const Lp of["away","home","sleep","evening"])Gd(Xd(`script.smartnest_mode_${Lp}`,"off",{friendly_name:`SmartNest · ${Lp}`}));Gd(Xd("switch.wall_tablet_screen","on",{friendly_name:"تابلت الحيط Screen"})),Gd(Xd("number.wall_tablet_screen_brightness","255",{friendly_name:"تابلت الحيط Screen brightness",min:0,max:255})),Gd(Xd("switch.wall_tablet_motion_detection","off",{friendly_name:"تابلت الحيط Motion detection"})),Gd(Xd("media_player.wall_tablet","idle",{friendly_name:"تابلت الحيط"})),Gd(Xd("sensor.wall_tablet_battery","100",{friendly_name:"تابلت الحيط Battery",unit_of_measurement:"%",device_class:"battery"}));const Qd="dev-fully-device",tp=Object.fromEntries(["switch.wall_tablet_screen","number.wall_tablet_screen_brightness","switch.wall_tablet_motion_detection","media_player.wall_tablet","sensor.wall_tablet_battery","binary_sensor.wall_tablet_plugged_in","button.wall_tablet_load_start_url"].map((t=>[t,{entity_id:t,device_id:Qd,platform:"fully_kiosk"}])));tp["remote.living_tv"]={entity_id:"remote.living_tv",platform:"androidtv_remote"};for(const Lp of["vacuum.robot","sensor.robot_current_room","image.robot_map","select.robot_mop_intensity","sensor.robot_cleaning_area","sensor.robot_cleaning_time","sensor.robot_main_brush_time_left","sensor.robot_side_brush_time_left","sensor.robot_filter_time_left","sensor.robot_sensor_time_left","button.robot_empty_dustbin"])tp[Lp]={entity_id:Lp,device_id:"dev-robot",platform:"roborock"};for(const[Lp,Vp,Sp]of[["sensor.water_heater_power","switch.water_heater","dev-heater"],["sensor.coffee_machine_power","switch.coffee_machine","dev-coffee"],["sensor.tv_power","media_player.living_tv","dev-tv"]])for(const t of[Lp,Vp])tp[t]={...tp[t]??{entity_id:t},device_id:Sp};const ep=Object.fromEntries([["living","الصالة"],["kitchen","المطبخ"],["bath","الحمام"],["hall","الممر"],["entry","المدخل"],["bedroom","غرفة النوم"]].map((([t,e])=>[t,{area_id:t,name:e}]))),ip={"light.living_room":"living","climate.living_ac":"living","sensor.living_temperature":"living","sensor.living_humidity":"living","cover.living_blinds":"living","media_player.living_speaker":"living","light.kitchen":"kitchen","switch.coffee_machine":"kitchen","binary_sensor.kitchen_window":"kitchen","binary_sensor.bathroom_leak":"bath","switch.water_heater":"bath","binary_sensor.hallway_motion":"hall","light.entrance":"entry","lock.front_door":"entry","binary_sensor.front_door_contact":"entry","camera.front_door":"entry","light.bedroom":"bedroom","climate.bedroom_ac":"bedroom","fan.bedroom":"bedroom","sensor.bedroom_humidity":"bedroom"};for(const[Lp,Vp]of Object.entries(ip))tp[Lp]={...tp[Lp]??{entity_id:Lp},area_id:Vp};Gd(Xd("sensor.coffee_machine_signal","-61",{friendly_name:"Coffee machine signal",device_class:"signal_strength",unit_of_measurement:"dBm"})),tp["sensor.coffee_machine_signal"]={entity_id:"sensor.coffee_machine_signal",area_id:"kitchen",entity_category:"diagnostic"};const sp={[Qd]:{id:Qd,name:"تابلت الحيط",identifiers:[["fully_kiosk","dev-tablet-1"]]}};"1"===Kd.get("fully")&&(window.fully={getDeviceId:()=>"dev-tablet-1"});const ap=[["light.living_room",27.5,30,"icon"],["climate.living_ac",27.5,9,"value"],["sensor.living_temperature",11,15,"value"],["cover.living_blinds",6,28,"icon"],["light.kitchen",63,22,"icon"],["binary_sensor.kitchen_window",65,7.5,"icon"],["switch.coffee_machine",71.5,37,"icon"],["binary_sensor.bathroom_leak",85.8,25,"icon"],["switch.water_heater",93,33,"icon"],["binary_sensor.hallway_motion",74,48.5,"icon"],["light.entrance",14,72,"icon"],["lock.front_door",15.5,91,"icon"],["binary_sensor.front_door_contact",25,91,"icon"],["camera.front_door",7,84,"icon"],["vacuum.robot",43,90,"icon"],["sensor.home_power",44,70,"value"],["light.bedroom",80,66,"icon"],["climate.bedroom_ac",80,59,"value"]],np=[{id:"r-living",name:"الصالة",points:[[3.3,5],[51.7,5],[51.7,55],[3.3,55]]},{id:"r-kitchen",name:"المطبخ",points:[[51.7,5],[75,5],[75,42.5],[51.7,42.5]]},{id:"r-bath",name:"الحمام",points:[[75,5],[96.7,5],[96.7,42.5],[75,42.5]]},{id:"r-hall",name:"الممر",points:[[51.7,42.5],[96.7,42.5],[96.7,55],[51.7,55]]},{id:"r-entry",name:"المدخل",points:[[3.3,55],[25,55],[25,95],[3.3,95]]},{id:"r-dining",name:"السفرة",points:[[25,55],[63.3,55],[63.3,95],[25,95]]},{id:"r-bed",name:"غرفة النوم",points:[[63.3,55],[96.7,55],[96.7,95],[63.3,95]]}],rp={};let op=[],lp=[{uid:"1",summary:"خبز",status:"needs_action"},{uid:"2",summary:"حليب",status:"needs_action"},{uid:"3",summary:"بندورة",status:"completed"}];const cp=new Set,dp=new Set;let pp=null;const hp=()=>cp.forEach((t=>t({items:lp}))),up=()=>dp.forEach((t=>t({message:pp}))),gp=new Set,mp="smartnest-dev-config",fp="client"!==Kd.get("role");let bp=()=>{};const _p=()=>"0"!==Kd.get("license")||"1"===localStorage.getItem("smartnest-dev-license");let yp=Kd.get("lang")??"ar";const vp=(t,e)=>window.setTimeout(e,t);function xp(t,e,i={}){const s=Jd[t];Jd[t]={...s,state:e,attributes:{...s.attributes,...i},last_changed:s.state!==e?Yd():s.last_changed,last_updated:Yd()},bp(Mp())}async function wp(t,e,i={}){if("todo"===t)return function(t,e){"add_item"===t&&(lp=[{uid:String(Date.now()),summary:e.item,status:"needs_action"},...lp]),"update_item"===t&&(lp=lp.map((t=>t.uid===e.item?{...t,status:e.status}:t))),hp()}(e,i);if(Array.isArray(i.entity_id))return Promise.all(i.entity_id.map((s=>wp(t,e,{...i,entity_id:s}))));await new Promise((t=>vp(120,(()=>t(null)))));const s=i.entity_id,a=Jd[s];if(!a)throw new Error(`unknown entity ${s}`);const n=s.split(".")[0],r=`${t}.${e}`;switch(r){case"homeassistant.turn_off":case"light.turn_off":case"switch.turn_off":return xp(s,"off");case"homeassistant.toggle":return"light"===n?xp(s,"on"===a.state?"off":"on","on"===a.state?{}:{brightness:a.attributes.brightness??255}):xp(s,"on"===a.state?"off":"on");case"light.turn_on":{const t={};if(i.brightness_pct&&(t.brightness=Math.round(i.brightness_pct/100*255)),i.hs_color&&Object.assign(t,{hs_color:i.hs_color,rgb_color:qt(i.hs_color[0],i.hs_color[1]),color_mode:"hs"}),i.color_temp_kelvin){const e=(i.color_temp_kelvin-2e3)/4500;Object.assign(t,{color_temp_kelvin:i.color_temp_kelvin,color_mode:"color_temp",rgb_color:[255,Math.round(170+80*e),Math.round(90+165*e)]})}return xp(s,"on",t)}case"climate.turn_on":return xp(s,"cool",{hvac_action:"cooling"});case"climate.turn_off":return xp(s,"off",{hvac_action:"off"});case"climate.set_temperature":return xp(s,a.state,{temperature:i.temperature});case"climate.set_hvac_mode":return xp(s,i.hvac_mode,{hvac_action:"cool"===i.hvac_mode?"cooling":i.hvac_mode});case"vacuum.start":return["الصالة","المطبخ","الممر","غرفة النوم"].forEach(((t,e)=>vp(5e3*e,(()=>xp("sensor.robot_current_room",t))))),xp(s,"cleaning");case"vacuum.pause":return xp(s,"paused");case"vacuum.return_to_base":return xp(s,"returning"),vp(4e3,(()=>xp(s,"docked")));case"vacuum.locate":case"cover.stop_cover":return;case"vacuum.set_fan_speed":return xp(s,a.state,{fan_speed:i.fan_speed});case"vacuum.send_command":return console.info("[mock] robot command",i.command,JSON.stringify(i.params)),xp(s,"cleaning");case"vacuum.clean_area":return console.info("[mock] clean areas",i.cleaning_area_id),xp(s,"cleaning");case"select.select_option":return xp(s,i.option);case"button.press":return console.info("[mock] pressed",s);case"cover.toggle":return xp(s,"open"===a.state?"closed":"open",{current_position:"open"===a.state?0:100});case"cover.open_cover":return xp(s,"open",{current_position:100});case"cover.close_cover":return xp(s,"closed",{current_position:0});case"cover.set_cover_position":return xp(s,i.position>0?"open":"closed",{current_position:i.position});case"cover.set_cover_tilt_position":return xp(s,a.state,{current_tilt_position:i.tilt_position});case"alarm_control_panel.alarm_arm_home":case"alarm_control_panel.alarm_arm_away":case"alarm_control_panel.alarm_arm_night":return xp(s,e.replace("alarm_","").replace("arm_","armed_"));case"alarm_control_panel.alarm_disarm":if("1234"!==i.code)throw new Error("wrong code");return xp(s,"disarmed");case"lock.unlock":return xp(s,"unlocking"),vp(900,(()=>xp(s,"unlocked")));case"lock.lock":return xp(s,"locking"),vp(900,(()=>xp(s,"locked")));case"script.turn_on":{const t=s.replace("script.smartnest_mode_","");if("away"===t||"sleep"===t){for(const t of Object.keys(Jd).filter((t=>t.startsWith("light."))))xp(t,"off");xp("lock.front_door","locked")}return"home"===t&&xp("light.entrance","on"),"evening"===t&&xp("light.living_room","on",{brightness:77,color_mode:"color_temp",color_temp_kelvin:2700,rgb_color:[255,180,107]}),xp("input_select.house_mode",t)}case"todo.add_item":return lp=[{uid:String(Date.now()),summary:i.item,status:"needs_action"},...lp],hp();case"todo.update_item":return lp=lp.map((t=>t.uid===i.item?{...t,status:i.status}:t)),hp();case"media_player.media_play_pause":return xp(s,"playing"===a.state?"paused":"playing");case"media_player.volume_set":return xp(s,a.state,{volume_level:i.volume_level});case"media_player.join":return console.info("[mock] join",i.group_members);case"remote.send_command":return console.info("[mock] remote",i.command);case"tts.speak":return console.info("[mock] speak",i.message,i.media_player_entity_id);case"switch.turn_on":return xp(s,"on");case"valve.open_valve":return xp(s,"open");case"valve.close_valve":return xp(s,"closed");case"number.set_value":return xp(s,String(i.value));case"media_player.play_media":return console.info("[mock] tablet plays",i.media_content_id),new Audio(i.media_content_id).play().catch((()=>{}));case"scene.turn_on":return xp("light.living_room","on",{brightness:60}),xp("cover.living_blinds","closed",{current_position:0});default:console.warn("[mock] unhandled service",r,i)}}function $p(t){const e=Jd[t],i=Number(e?.state)||0,s=Date.now()/1e3-86400,a=[];for(let n=0;n<=96;n++){const t=s+900*n,e=.25*Math.sin(n/96*Math.PI*2-1.2)+.08*(Math.random()-.5);a.push({s:String((i*(1+e)).toFixed(1)),lu:t})}return{[t]:a}}async function kp(t){switch(await new Promise((t=>vp(60,(()=>t(null))))),t.type){case"smartnest/config/get":{if(!_p())throw{code:"not_licensed",message:"SmartNest needs an activation key"};const t=localStorage.getItem(mp);return{config:t?JSON.parse(t):null}}case"smartnest/config/save":{if(!fp)throw{code:"unauthorized",message:"Unauthorized"};let e=t.config;if(localStorage.getItem(mp)){const t=JSON.parse(localStorage.getItem("smartnest-dev-history")??"[]");t.unshift({id:Math.random().toString(36).slice(2),time:Date.now()/1e3,user:fp?"Installer":"Client",config:JSON.parse(localStorage.getItem(mp))}),localStorage.setItem("smartnest-dev-history",JSON.stringify(t.slice(0,20)))}else e=function(t){const e=t.pages?.flatMap((t=>t.widgets)).find((t=>"floorplan"===t.type));if(!e)return t;const i=e.config.floors[0];i.image=`${qd}floorplan.svg`,i.rooms=np,i.markers=ap.map((([t,e,i,s],a)=>({id:`m${a}`,entity:t,x:e,y:i,display:s})));const s=t.pages[0];return e.w=9,s.widgets.push({id:"clock",type:"clock",x:9,y:0,w:3,h:3,config:{}},{id:"t1",type:"tile",x:9,y:3,w:3,h:2,config:{entity:"scene.movie_night"}},{id:"t2",type:"tile",x:9,y:5,w:3,h:2,config:{entity:"climate.living_ac"}},{id:"t3",type:"tile",x:9,y:7,w:3,h:2,config:{entity:"vacuum.robot"}}),t.settings.home_name="بيت أبو محمد",t.settings.doorbell={trigger_entity:"event.doorbell",camera_entity:"camera.front_door",lock_entity:"lock.front_door"},t.settings.screensaver.temp_entity="sensor.living_temperature",t}(structuredClone(e));return localStorage.setItem(mp,JSON.stringify(e)),gp.forEach((t=>t({config:e}))),null}case"media_source/browse_media":{const e=["photo-1.svg","photo-2.svg","photo-3.svg"];return{title:"smartnest-photos",media_content_id:t.media_content_id,children:e.map((e=>({title:e,media_class:"image",media_content_type:"image/svg+xml",media_content_id:`${t.media_content_id}/${e}`})))}}case"media_source/resolve_media":return{url:`${qd}${t.media_content_id.split("/").pop()}`,mime_type:"image/svg+xml"};case"smartnest/feedback":return console.info("[mock] feedback",t.stars,t.comment),null;case"smartnest/automations/get":return{items:op};case"smartnest/automations/set":return op=t.items,null;case"frigate/events/get":{if(!Kd.has("frigate"))throw{code:"not_found",message:"Frigate instance not found"};const e=new Date;e.setHours(0,0,0,0);const i=t.after??Math.floor(e.getTime()/1e3),s=["person","person","car","package","cat"],a=Array.from({length:26},((t,e)=>({id:`ev${e}`,camera:e%3?"front_door":"garden",label:s[e%s.length],sub_label:25===e?["أبو محمد",.92]:null,start_time:25===e?Date.now()/1e3-60:i+3600*(6+.6*e),has_clip:!0,has_snapshot:!0}))).filter((e=>(!t.cameras||t.cameras.includes(e.camera))&&e.start_time>=(t.after??0)&&(!t.before||e.start_time<t.before)&&e.start_time<=Date.now()/1e3));return JSON.stringify(a)}case"smartnest/message/send":return pp={id:String(Date.now()),message:t.message,title:fp?"Installer":"Client"},up(),{id:pp.id};case"smartnest/message/ack":return pp?.id===t.id&&(pp=null),up(),null;case"smartnest/timer/list":return{...rp};case"smartnest/timer/set":{const e=new Date(Date.now()+6e4*t.minutes).toISOString();return rp[t.entity_id]=e,{due:e}}case"smartnest/timer/cancel":return delete rp[t.entity_id],null;case"smartnest/license/status":return{licensed:_p(),instance_id:"dev-installation-0f3a9c",licensee:_p()?"بيت أبو محمد":"",plan:Kd.get("plan")??"premium",expires:Kd.get("expires")?Math.floor(Date.now()/1e3)+86400*Number(Kd.get("expires")):null,trial:"1"===Kd.get("trial"),reseller:Kd.get("reseller")??""};case"smartnest/license/activate":if(!fp||!String(t.key).startsWith("SN1."))throw{code:"invalid_key",message:"invalid"};return localStorage.setItem("smartnest-dev-license","1"),{licensed:!0,licensee:"بيت أبو محمد"};case"smartnest/plan/read_rooms":return await new Promise((t=>setTimeout(t,1200))),String(t.image).endsWith("plan-photo.jpg")?{rooms:[{label:"Bedroom",area:"غرفة النوم",x:55,y:22},{label:"Bathroom 1",area:"الحمام",x:88,y:16},{label:"Bathroom 2",area:"",x:91,y:33},{label:"Laundry",area:"",x:91,y:46},{label:"Hallway",area:"الممر",x:61,y:47},{label:"Office",area:"",x:25,y:53},{label:"Kitchen",area:"المطبخ",x:49,y:76},{label:"Living Room",area:"الصالة",x:78,y:74}]}:{rooms:[]};case"smartnest/visitors/list":{const t=t=>new Date(Date.now()-36e5*t).toISOString();return{visitors:[.5,3,26,30].map(((e,i)=>({url:i%2?`${qd}cam-garden.svg`:`${qd}cam-front.svg`,time:t(e)})))}}case"call_service":return"weather"===t.domain&&"get_forecasts"===t.service?{response:{[t.target.entity_id]:{forecast:["sunny","partlycloudy","cloudy","rainy","pouring","partlycloudy","sunny"].map(((t,e)=>({datetime:new Date(Date.now()+864e5*e).toISOString(),temperature:[31,29,26,22,19,24,28][e],templow:[19,18,16,14,12,15,17][e],condition:t})))}}}:"roborock"===t.domain&&"get_maps"===t.service?{response:{[t.target.entity_id]:{maps:[{flag:0,name:"Home",rooms:{16:"الصالة",17:"المطبخ",18:"غرفة النوم",19:"السفرة",20:"الممر",21:"المدخل"}}]}}}:{response:null};case"logbook/get_events":{const e=Date.parse(t.start_time)/1e3,i=(t,i,s)=>({entity_id:t,state:i,when:e+3600*s});return[i("event.doorbell",(new Date).toISOString(),2),i("binary_sensor.front_door_contact","on",1),i("binary_sensor.front_door_contact","off",1.1),i("binary_sensor.front_door_contact","on",11),i("vacuum.robot","cleaning",9)].filter((e=>t.entity_ids.includes(e.entity_id)))}case"recorder/statistics_during_period":{const e={"sensor.home_energy_total":21,"sensor.solar_energy_total":9,"sensor.ac_energy":8,"sensor.heater_energy":4.5,"sensor.energy_today":0},i={},s=Date.parse(t.start_time);for(const a of t.statistic_ids){i[a]=[];for(let t=s;t<Date.now();t+=864e5)i[a].push({start:t,change:(e[a]??1)*(.8+.4*Math.random())*(t>Date.now()-1728e6?1.1:1)})}return i}case"history/history_during_period":{const e={};for(const i of t.entity_ids){const s=i.split(".")[0];if(!["light","switch","fan","cover","climate","media_player"].includes(s)){Object.assign(e,$p(i));continue}const a=[...i].reduce(((t,e)=>t+e.charCodeAt(0)),0),n="cover"===s?"open":"climate"===s?"cool":"on",r="cover"===s?"closed":"off",o=[],l=Date.parse(t.start_time);for(let t=0;t<14;t++){const e=new Date(l+864e5*t);e.setHours(0,0,0,0);const i=()=>a*(t+3)%17-8,s=(t,s)=>(e.getTime()+6e4*(60*t+s+i()))/1e3;(a+t)%7!=0&&o.push({s:n,lu:s(17+a%3,30)},{s:r,lu:s(22+a%2,10)})}e[i]=o}return e}case"assist_pipeline/pipeline/list":return{pipelines:[{id:"p1",conversation_engine:"conversation.home_assistant",conversation_language:"ar"}],preferred_pipeline:"p1"};case"conversation/process":{await new Promise((t=>setTimeout(t,700)));const e=String(t.text);return{conversation_id:"c1",response:{response_type:"action_done",speech:{plain:{speech:/طف|off/i.test(e)?"طفّيت 4 أضواء.":/حرار|temp/i.test(e)?"الحرارة بالصالة 23.5 درجة.":/باب|door/i.test(e)?"الباب مقفول.":"تمام، عملتها."}}}}}case"smartnest/issuer/status":{const t=JSON.parse(localStorage.getItem("smartnest-dev-issued")??"null");return{ready:!!t,houses:t??[]}}case"smartnest/issuer/setup":return localStorage.setItem("smartnest-dev-issued","[]"),null;case"smartnest/issuer/issue":{const e=Math.floor(Date.now()/1e3),i=JSON.parse(localStorage.getItem("smartnest-dev-issued")??"[]"),s={v:1,i:t.install,n:t.name,t:e,p:t.trial?"premium":t.plan},a=t.trial?14:t.days;a&&(s.x=e+86400*a);const n={id:Math.random().toString(36).slice(2),key:`SN1.${btoa(unescape(encodeURIComponent(JSON.stringify(s))))}.devsignature`,install:t.install,name:t.name,plan:s.p,trial:!!t.trial,reseller:t.reseller??"",issued:e,expires:s.x??null,phone:t.phone??"",note:t.note??""};return i.unshift(n),localStorage.setItem("smartnest-dev-issued",JSON.stringify(i)),n}case"smartnest/issuer/remove":{const e=JSON.parse(localStorage.getItem("smartnest-dev-issued")??"[]").filter((e=>e.install!==t.install));return localStorage.setItem("smartnest-dev-issued",JSON.stringify(e)),null}case"smartnest/history/list":return{items:JSON.parse(localStorage.getItem("smartnest-dev-history")??"[]").map((t=>({id:t.id,time:t.time,user:t.user,pages:t.config.pages.length,widgets:t.config.pages.reduce(((t,e)=>t+e.widgets.length),0)})))};case"smartnest/history/restore":{const e=JSON.parse(localStorage.getItem("smartnest-dev-history")??"[]").find((e=>e.id===t.version));return localStorage.setItem(mp,JSON.stringify(e.config)),gp.forEach((t=>t({config:e.config}))),null}case"smartnest/photos/link":return{path:"/api/smartnest/photos/demo-token",minutes:15};case"smartnest/parcels":return{packages:[{friendly_name:"سماعات من AliExpress",tracking_number:"LP00123",status:"In Transit",info_text:"وصلت مركز الفرز",location:"Tel Aviv"},{friendly_name:"كتب الولاد",tracking_number:"RR998",status:"Ready to be picked up",info_text:"جاهز بالبريد",location:""}]};case"smartnest/codes/list":return{codes:JSON.parse(localStorage.getItem("smartnest-dev-codes")??"[]"),zwave:!0};case"smartnest/codes/add":{const e=JSON.parse(localStorage.getItem("smartnest-dev-codes")??"[]"),i={id:Math.random().toString(36).slice(2),lock:t.lock,name:t.name,slot:10+e.length,code:t.code??String(1e5+Math.floor(9e5*Math.random())),from:t.from,until:t.until,live:t.from<=Date.now()/1e3};return localStorage.setItem("smartnest-dev-codes",JSON.stringify([...e,i])),i}case"smartnest/codes/remove":return localStorage.setItem("smartnest-dev-codes",JSON.stringify(JSON.parse(localStorage.getItem("smartnest-dev-codes")??"[]").filter((e=>e.id!==t.id)))),null;case"smartnest/kv/get":return{value:JSON.parse(localStorage.getItem(`smartnest-dev-kv-${t.key}`)??"null")};case"smartnest/kv/set":return localStorage.setItem(`smartnest-dev-kv-${t.key}`,JSON.stringify(t.value)),Cp.forEach(((e,i)=>e===t.key&&i({value:t.value}))),null;case"smartnest/fx/start":return console.info("[mock] light effect",t.effect,t.lights),null;case"smartnest/fx/stop":return null;case"smartnest/ai/ask":await new Promise((t=>setTimeout(t,1500)));return{text:{doorbell:"رجل بزي توصيل ومعه طرد صغير.",summary:"صباح هادي: الباب الأمامي انفتح مرة بالليل والروبوت نضّف الساعة 4. اليوم مشمس وبتوصل 31، فخلي المكيف جاهز للظهر.",explain:"حساس الحمام: Zigbee، البطارية غالباً خلصت (CR2032).\nمكيف الصالة: انقطع عن الواي فاي، افصله ورجعه.",scene:`Here you go:\n${JSON.stringify(t.facts.map(((t,e)=>({entity:t.split(":")[0],on:e<2,brightness_pct:30,rgb:[255,140,60]}))))}\nضو دافي وخفيف، جو هادي للفيلم 🎬`,automation:JSON.stringify({name:"طفّي الصالة بالليل",trigger:{kind:"time",at:"23:00"},days:[],window:null,actions:[{kind:"off",entity:"light.living_room"},{kind:"message",text:"طفّيت الصالة"}]}),cameras:"يوم عادي: ساعي البريد مرّ الساعة 10 الصبح، وسيارتين وقفوا عالمدخل بالعصر. ما في إشي غريب.",bill:"صرفتوا 9% أكثر من الشهر الماضي، أغلبه من المكيفات (130 kWh) لأنه الأسبوع كان حامي. السخان ثاني أكبر واحد. نصيحة: حطوا المكيف على 24 بدل 22 بتوفّروا حوالي ₪40."}[t.task]};default:throw new Error(`[mock] unknown ws ${t.type}`)}}const Cp=new Map;function Mp(){return{states:{...Jd},entities:tp,devices:sp,areas:ep,user:{id:"dev",name:fp?"Installer":"Client",is_admin:fp},language:yp,config:{location_name:"Home",latitude:32.08,longitude:34.78},services:{notify:{mobile_app_omar:{},family_group:{}}},callService:wp,callWS:kp,hassUrl:(t="")=>t,fetchWithAuth:async(t,e)=>{if(t.startsWith("/api/config/automation/config/")){const i=t.split("/").pop(),s=`automation.${i}`;if("DELETE"===e?.method)delete Jd[s];else{const t=JSON.parse(String(e?.body));console.info("[mock] automation saved",JSON.stringify(t)),Jd[s]={entity_id:s,state:"on",attributes:{id:i,friendly_name:t.alias},last_changed:Yd(),last_updated:Yd()}}return bp(Mp()),new Response(JSON.stringify({result:"ok"}),{status:200})}if(t.startsWith("/api/calendars/")){const e=(t,e,i=0)=>{const s=new Date;return s.setDate(s.getDate()+t),s.setHours(e,i,0,0),s.toISOString()},i=t=>new Date(Date.now()+864e5*t).toISOString().slice(0,10),s=t.includes("school")?[{summary:"اجتماع أولياء الأمور",start:{dateTime:e(1,17)}},{summary:"رحلة مدرسية",start:{date:i(3)}}]:[{summary:"عشا عند الأهل",start:{dateTime:e(0,20,30)}},{summary:"موعد طبيب الأسنان",start:{dateTime:e(2,10)}}];return new Response(JSON.stringify(s),{status:200})}if("/api/smartnest/upload"!==t)return new Response(null,{status:404});if(!fp)return new Response(null,{status:403});const i=(e?.body).get("file"),s=await new Promise((t=>{const e=new FileReader;e.onload=()=>t(String(e.result)),e.readAsDataURL(i)}));return new Response(JSON.stringify({url:s}),{status:200,headers:{"content-type":"application/json"}})},connection:{subscribeMessage:async(t,e)=>("smartnest/config/subscribe"===e.type&&gp.add(t),"todo/item/subscribe"===e.type&&(cp.add(t),t({items:lp})),"smartnest/message/subscribe"===e.type&&dp.add(t),"smartnest/kv/subscribe"===e.type&&Cp.set(t,e.key),()=>{Cp.delete(t),gp.delete(t),cp.delete(t),dp.delete(t)})}}}const Ap={message:()=>{pp={id:String(Date.now()),title:"💊",message:"وقت دوا الستّ",ack:"أخذته ✓",icon:"pill"},up()},ring:()=>xp("event.doorbell",Yd(),{event_type:"ring"}),motion:()=>{xp("binary_sensor.hallway_motion","on"),vp(6e3,(()=>xp("binary_sensor.hallway_motion","off")))},reset:()=>{localStorage.removeItem(mp),location.reload()}},Hp=Object.freeze(Object.defineProperty({__proto__:null,DEMO_ROOMS:np,devActions:Ap,startMock:function(t){bp=t,t(Mp()),window.setInterval((()=>{const t=Number(Jd["sensor.home_power"].state);xp("sensor.home_power",String(Math.max(300,Math.round(t+180*(Math.random()-.5)))))}),5e3)}},Symbol.toStringTag,{value:"Module"}));
