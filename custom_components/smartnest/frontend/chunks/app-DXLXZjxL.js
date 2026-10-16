import{_ as t}from"./loader-43RavMas.js";const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;let a=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const o=t=>new a("string"==typeof t?t:t+"",void 0,s),r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new a(i,t,s)},l=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return o(e)})(t):t,{is:c,defineProperty:d,getOwnPropertyDescriptor:p,getOwnPropertyNames:h,getOwnPropertySymbols:u,getPrototypeOf:g}=Object,m=globalThis,f=m.trustedTypes,b=f?f.emptyScript:"",_=m.reactiveElementPolyfillSupport,y=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?b:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(s){i=null}}return i}},x=(t,e)=>!c(t,e),w={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:x};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&d(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=p(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const a=s?.call(this);n?.call(this,e),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=g(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...h(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const t=this._$Eu(e,i);void 0!==t&&this._$Eh.set(t,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const i of s){const s=document.createElement("style"),n=e.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=s;const a=n.fromAttribute(e,t.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(void 0!==t){const a=this.constructor;if(!1===s&&(n=this[t]),i??=a.getPropertyOptions(t),!((i.hasChanged??x)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},a){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),!0!==n||void 0!==a)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((t=>this._$ET(t,this[t]))),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[y("elementProperties")]=new Map,$[y("finalized")]=new Map,_?.({ReactiveElement:$}),(m.reactiveElementVersions??=[]).push("2.1.2");const k=globalThis,C=k.trustedTypes,M=C?C.createPolicy("lit-html",{createHTML:t=>t}):void 0,H="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,L="?"+A,V=`<${L}>`,S=document,z=()=>S.createComment(""),D=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,T="[ \t\n\f\r]",j=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,P=/-->/g,I=/>/g,E=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),N=/'/g,W=/"/g,R=/^(?:script|style|textarea|title)$/i,F=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),B=F(1),Z=F(2),q=Symbol.for("lit-noChange"),U=Symbol.for("lit-nothing"),Y=new WeakMap,X=S.createTreeWalker(S,129);function K(t,e){if(!O(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==M?M.createHTML(e):e}class G{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,a=0;const o=t.length-1,r=this.parts,[l,c]=((t,e)=>{const i=t.length-1,s=[];let n,a=2===e?"<svg>":3===e?"<math>":"",o=j;for(let r=0;r<i;r++){const e=t[r];let i,l,c=-1,d=0;for(;d<e.length&&(o.lastIndex=d,l=o.exec(e),null!==l);)d=o.lastIndex,o===j?"!--"===l[1]?o=P:void 0!==l[1]?o=I:void 0!==l[2]?(R.test(l[2])&&(n=RegExp("</"+l[2],"g")),o=E):void 0!==l[3]&&(o=E):o===E?">"===l[0]?(o=n??j,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,i=l[1],o=void 0===l[3]?E:'"'===l[3]?W:N):o===W||o===N?o=E:o===P||o===I?o=j:(o=E,n=void 0);const p=o===E&&t[r+1].startsWith("/>")?" ":"";a+=o===j?e+V:c>=0?(s.push(i),e.slice(0,c)+H+e.slice(c)+A+p):e+A+(-2===c?r:p)}return[K(t,a+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]})(t,e);if(this.el=G.createElement(l,i),X.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=X.nextNode())&&r.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(H)){const e=c[a++],i=s.getAttribute(t).split(A),o=/([.?@])?(.*)/.exec(e);r.push({type:1,index:n,name:o[2],strings:i,ctor:"."===o[1]?it:"?"===o[1]?st:"@"===o[1]?nt:et}),s.removeAttribute(t)}else t.startsWith(A)&&(r.push({type:6,index:n}),s.removeAttribute(t));if(R.test(s.tagName)){const t=s.textContent.split(A),e=t.length-1;if(e>0){s.textContent=C?C.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],z()),X.nextNode(),r.push({type:2,index:++n});s.append(t[e],z())}}}else if(8===s.nodeType)if(s.data===L)r.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(A,t+1));)r.push({type:7,index:n}),t+=A.length-1}n++}}static createElement(t,e){const i=S.createElement("template");return i.innerHTML=t,i}}function J(t,e,i=t,s){if(e===q)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const a=D(e)?void 0:e._$litDirective$;return n?.constructor!==a&&(n?._$AO?.(!1),void 0===a?n=void 0:(n=new a(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=J(t,n._$AS(t,e.values),n,s)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??S).importNode(e,!0);X.currentNode=s;let n=X.nextNode(),a=0,o=0,r=i[0];for(;void 0!==r;){if(a===r.index){let e;2===r.type?e=new tt(n,n.nextSibling,this,t):1===r.type?e=new r.ctor(n,r.name,r.strings,this,t):6===r.type&&(e=new at(n,this,t)),this._$AV.push(e),r=i[++o]}a!==r?.index&&(n=X.nextNode(),a++)}return X.currentNode=S,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=U,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),D(t)?t===U||null==t||""===t?(this._$AH!==U&&this._$AR(),this._$AH=U):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>O(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==U&&D(this._$AH)?this._$AA.nextSibling.data=t:this.T(S.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=G.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Q(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Y.get(t.strings);return void 0===e&&Y.set(t.strings,e=new G(t)),e}k(t){O(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new tt(this.O(z()),this.O(z()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=U,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=U}_$AI(t,e=this,i,s){const n=this.strings;let a=!1;if(void 0===n)t=J(this,t,e,0),a=!D(t)||t!==this._$AH&&t!==q,a&&(this._$AH=t);else{const s=t;let o,r;for(t=n[0],o=0;o<n.length-1;o++)r=J(this,s[i+o],e,o),r===q&&(r=this._$AH[o]),a||=!D(r)||r!==this._$AH[o],r===U?t=U:t!==U&&(t+=(r??"")+n[o+1]),this._$AH[o]=r}a&&!s&&this.j(t)}j(t){t===U?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class it extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===U?void 0:t}}class st extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==U)}}class nt extends et{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??U)===q)return;const i=this._$AH,s=t===U&&i!==U||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==U&&(i===U||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class at{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const ot={I:tt},rt=k.litHtmlPolyfillSupport;rt?.(G,tt),(k.litHtmlVersions??=[]).push("3.3.3");const lt=globalThis;let ct=class extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new tt(e.insertBefore(z(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}};ct._$litElement$=!0,ct.finalized=!0,lt.litElementHydrateSupport?.({LitElement:ct});const dt=lt.litElementPolyfillSupport;dt?.({LitElement:ct}),(lt.litElementVersions??=[]).push("4.2.2");const pt=t=>(e,i)=>{void 0!==i?i.addInitializer((()=>{customElements.define(t,e)})):customElements.define(t,e)},ht={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:x},ut=(t=ht,e,i)=>{const{kind:s,metadata:n}=i;let a=globalThis.litPropertyMetadata.get(n);if(void 0===a&&globalThis.litPropertyMetadata.set(n,a=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),a.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,n,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const n=this[s];e.call(this,i),this.requestUpdate(s,n,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function gt(t){return(e,i)=>"object"==typeof i?ut(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function mt(t){return gt({...t,state:!0,attribute:!1})}const ft={CHILD:2},bt=t=>(...e)=>({_$litDirective$:t,values:e});let _t=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};const{I:yt}=ot,vt=()=>document.createComment(""),xt=(t,e,i)=>{const s=t._$AA.parentNode,n=void 0===e?t._$AB:e._$AA;if(void 0===i){const e=s.insertBefore(vt(),n),a=s.insertBefore(vt(),n);i=new yt(e,a,t,t.options)}else{const e=i._$AB.nextSibling,a=i._$AM,o=a!==t;if(o){let e;i._$AQ?.(t),i._$AM=t,void 0!==i._$AP&&(e=t._$AU)!==a._$AU&&i._$AP(e)}if(e!==n||o){let t=i._$AA;for(;t!==e;){const e=t.nextSibling;s.insertBefore(t,n),t=e}}}return i},wt=(t,e,i=t)=>(t._$AI(e,i),t),$t={},kt=(t,e=$t)=>t._$AH=e,Ct=t=>{t._$AR(),t._$AA.remove()},Mt=(t,e,i)=>{const s=new Map;for(let n=e;n<=i;n++)s.set(t[n],n);return s},Ht=bt(class extends _t{constructor(t){if(super(t),t.type!==ft.CHILD)throw Error("repeat() can only be used in text expressions")}dt(t,e,i){let s;void 0===i?i=e:void 0!==e&&(s=e);const n=[],a=[];let o=0;for(const r of t)n[o]=s?s(r,o):o,a[o]=i(r,o),o++;return{values:a,keys:n}}render(t,e,i){return this.dt(t,e,i).values}update(t,[e,i,s]){const n=t._$AH,{values:a,keys:o}=this.dt(e,i,s);if(!Array.isArray(n))return this.ut=o,a;const r=this.ut??=[],l=[];let c,d,p=0,h=n.length-1,u=0,g=a.length-1;for(;p<=h&&u<=g;)if(null===n[p])p++;else if(null===n[h])h--;else if(r[p]===o[u])l[u]=wt(n[p],a[u]),p++,u++;else if(r[h]===o[g])l[g]=wt(n[h],a[g]),h--,g--;else if(r[p]===o[g])l[g]=wt(n[p],a[g]),xt(t,l[g+1],n[p]),p++,g--;else if(r[h]===o[u])l[u]=wt(n[h],a[u]),xt(t,n[p],n[h]),h--,u++;else if(void 0===c&&(c=Mt(o,u,g),d=Mt(r,p,h)),c.has(r[p]))if(c.has(r[h])){const e=d.get(o[u]),i=void 0!==e?n[e]:null;if(null===i){const e=xt(t,n[p]);wt(e,a[u]),l[u]=e}else l[u]=wt(i,a[u]),xt(t,n[p],i),n[e]=null;u++}else Ct(n[h]),h--;else Ct(n[p]),p++;for(;u<=g;){const e=xt(t,l[g+1]);wt(e,a[u]),l[u++]=e}for(;p<=h;){const t=n[p++];null!==t&&Ct(t)}return this.ut=o,kt(t,l),q}}),At={edit:"Edit",done:"Done",save:"Save",cancel:"Cancel",delete:"Delete",add:"Add",close:"Close",back:"Back",settings:"Settings",search:"Search",loading:"Loading…",saving:"Saving…",saved:"Saved",save_failed:"Couldn't save. Check the connection and try again.",upload_failed:"Upload failed. Use a PNG, JPG or WebP under 15 MB.",discard_changes:"Discard your changes?",delete_confirm:"Delete this?",untitled:"Untitled",add_page:"Add page",page_settings:"Page settings",page_title:"Page name",page_icon:"Icon",move_earlier:"Move earlier",move_later:"Move later",choose_template:"Start from",template_rooms:"Rooms",other_devices:"Other",autofill_rooms:"Fill rooms",autofill_done:"Placed {n} devices",detect_rooms:"Find rooms",auto_add:"Auto add",auto_need_areas:"Put your devices in rooms in Home Assistant first (Settings → Areas)",auto_nothing:"Nothing new to place",which_room:"Which room is this?",skip_room:"Skip",detecting:"Reading the plan…",detect_none:"No new rooms found. Draw them by hand.",detect_done:"Found {n} rooms. Tap one to name it",detect_done_placed:"Found {n} rooms and placed {m} devices",detect_failed:"Couldn't read this plan",room_area:"Home Assistant room",template_blank:"Blank",template_home:"Home",template_power:"Electricity",template_security:"Security",template_doorbell:"Doorbell",template_climate:"Climate",add_widget:"Add widget",widget_settings:"Widget settings",widget_floorplan:"Floor plan",widget_tile:"Device",widget_camera:"Camera",camera_wall:"All cameras",widget_heading:"Heading",widget_clock:"Clock",widget_modes:"Modes",mode_away:"Away",mode_home:"Home",mode_sleep:"Sleep",mode_evening:"Evening",scene_away:"Have a safe trip",scene_home:"Welcome home",scene_sleep:"Good night",scene_evening:"Enjoy your evening",scene_locking:"Locking up",modes_missing:"Mode scripts not found. Copy ha-config/packages/smartnest_modes.yaml to Home Assistant.",widget_vacuum:"Robot vacuum",widget_visitors:"Visitors",widget_energy:"Energy",template_robot:"Robot",clean_rooms_1:"Clean 1 room",clean_rooms_n:"Clean {n} rooms",clean_all:"Clean the whole house",suction:"Suction",mop:"Mopping",passes:"Passes",parts:"Parts",main_brush:"Main brush",side_brush:"Side brush",filter:"Filter",sensors_part:"Sensors",hours_left:"{n} h left",cleaned_area:"Cleaned",clean_time:"Time",empty_bin:"Empty bin",no_rooms:"Rooms appear here once the robot has mapped the house.",fan_quiet:"Quiet",fan_balanced:"Balanced",fan_standard:"Standard",fan_turbo:"Turbo",fan_max:"Max",fan_max_plus:"Max+",fan_gentle:"Gentle",fan_off:"Off",mop_mild:"Light",mop_low:"Light",mop_moderate:"Medium",mop_medium:"Medium",mop_intense:"Heavy",mop_high:"Heavy",mop_off:"Off",yesterday:"Yesterday",today:"Today",no_visitors:"No one has rung yet.",keep_days:"Keep visitor photos (days)",e_solar:"Solar",e_grid:"Grid",e_battery:"Battery",e_home:"Home",e_solar_entity:"Solar power",e_grid_entity:"Grid power (+ = from the grid)",e_battery_entity:"Battery power (+ = charging)",e_soc_entity:"Battery level",e_home_entity:"Home power (optional)",e_flip:"Flip direction",widget_energy_stats:"Electricity bill",widget_panic:"Emergency",widget_check:"Bedtime check",bill_title:"Electricity this month",bill_projected:"Expected bill",bill_used:"Used so far",bill_vs_last:"vs. last month",bill_solar:"Solar saved",bill_top:"Using the most",e_total_energy:"Total consumption (kWh)",e_solar_energy:"Solar production (kWh)",tariff:"Price per kWh",currency:"Currency",panic_hold:"Hold for 2 seconds",panic_sent:"Emergency mode is on",panic_missing:"Emergency script not found. Copy ha-config/packages/smartnest_safety.yaml to Home Assistant.",check_ok:"All set for the night",check_n:"{n} things to look at",check_locks:"Doors locked",check_open:"Doors and windows closed",check_lights:"Lights off",check_alarm:"Alarm on",check_appliances:"Risky appliances off",check_fix:"Fix it",check_fix_all:"Fix everything I can",arm_home:"Home",arm_away:"Away",arm_night:"Night",disarm:"Disarm",enter_code:"Enter code",disarmed:"Off",armed_home:"Armed (home)",armed_away:"Armed (away)",armed_night:"Armed (night)",armed_vacation:"Armed (vacation)",arming:"Arming",disarming:"Disarming",pending:"Pending",triggered:"ALARM",widget_family:"Family",at_home:"Home",away_l:"Out",widget_todo:"List",add_placeholder:"Add an item…",todo_empty:"Nothing here",widget_calendar:"Calendar",no_events:"Nothing coming up",all_day:"All day",tomorrow:"Tomorrow",widget_forecast:"This week",widget_countdown:"Countdown",days_left:"{n} days",today_event:"Today!",next_ramadan:"Ramadan",next_eid:"Eid al-Fitr",next_adha:"Eid al-Adha",add_event:"Add a date",event_title:"Name",event_date:"Date",send_message:"Message the home screen",message_placeholder:"Dinner is ready!",send:"Send",message_from:"From {name}",got_it:"Got it",kids_mode:"Kids mode",kids_page:"Kids page",widget_gauge:"Gauge",widget_gate:"Gate",widget_frigate:"Recent detections",widget_schedule:"Schedules",gauge_low:"Running low",gate_hold:"Hold to open",gate_hold_close:"Hold to close",history_lock:"Recent activity",by_user:"by {name}",frigate_missing:"Frigate isn't installed. Add the Frigate integration (HACS) to see people, cars and faces here.",person_l:"Person",car_l:"Car",dog_l:"Dog",cat_l:"Cat",package_l:"Package",automations:"Automations",new_automation:"New automation",when:"When…",then:"Then…",only_if:"Only between",trig_time:"At a time",trig_sun:"Sunrise / sunset",trig_state:"A device changes",trig_mode:"The house mode becomes",sunrise:"Sunrise",sunset:"Sunset",offset_min:"Offset (min)",becomes:"becomes",act_on:"Turn on",act_off:"Turn off",act_mode:"Set house mode",act_message:"Show a message",days:"Days",auto_name:"Name",auto_saved:"Automation saved",auto_empty:"No SmartNest automations yet.",every_day:"Every day",heading_text:"Text",empty_page:"This page is empty.",empty_page_admin:"Tap Edit, then Add widget.",entity:"Device",choose_entity:"Choose a device",no_entities:"No matching devices",display_name:"Display name",display_name_hint:"Leave empty to use the Home Assistant name",show_as:"Show as",show_icon:"Icon",show_value:"Icon and value",floor:"Floor",add_floor:"Add floor",heat_map:"Room temperatures",room_lights_on:"All lights on",room_lights_off:"All lights off",night_plan:"Quiet plan at night",rooms:"Rooms",draw_room:"Draw room",draw_hint:"Tap each corner of the room, then tap the first corner to close it.",room_name:"Room name",room_default:"Room {n}",finish:"Finish",undo_point:"Undo",delete_room:"Delete room",rooms_hint:"Lights placed inside a room make it glow.",floor_name:"Floor name",floor_default:"Ground floor",upload_plan:"Upload floor plan",replace_plan:"Replace image",add_device:"Add device",no_plan:"No floor plan yet",no_plan_admin:"Tap Edit to upload one.",drag_hint:"Drag devices to place them",plan_in_dark:"Plan in dark mode",plan_original:"As uploaded",plan_invert:"Invert colors",doorbell_test:"Test doorbell",delete_floor:"Delete floor",home_name:"Home name",language:"Language",accent:"Accent color",theme:"Appearance",theme_auto:"Follow device",theme_schedule:"Dark at night",theme_light:"Light",theme_dark:"Dark",dark_from:"Dark from",dark_to:"until",default_page:"Opening page",screensaver:"Screensaver",screensaver_after:"Start after (minutes)",temp_entity:"Temperature sensor",doorbell:"Doorbell",doorbell_trigger:"Doorbell button",doorbell_camera:"Doorbell camera",doorbell_lock:"Door lock",kiosk:"Kiosk lock",kiosk_lock:"Lock screen",kiosk_unlock:"Unlock",kiosk_pin:"Exit PIN",kiosk_pin_hint:"4 to 8 digits. Give it to the homeowner; kids and guests can't leave the dashboard without it.",kiosk_pin_set:"Set PIN",kiosk_pin_change:"Change PIN",kiosk_pin_saved:"PIN set. Tap Save.",kiosk_pin_invalid:"Use 4 to 8 digits",kiosk_remove_pin:"Remove PIN",kiosk_full_lock:"For a full lock, also use Fully Kiosk Browser (Android) or Guided Access (iPad).",enter_pin:"Enter PIN",wrong_pin:"Wrong PIN",tablet:"Wall tablet (Fully Kiosk)",tablet_found:"Found: {names}",tablet_none:"No Fully Kiosk tablet in Home Assistant yet. Add the Fully Kiosk Browser integration first.",tablet_this:"This screen is the tablet",tablet_not_this:"This screen isn't running inside Fully",tablet_js_hint:"On the tablet, turn on Fully's JavaScript Interface (Settings → Advanced Web Settings) so it recognises itself.",night_dim:"Dim at night",night_brightness:"Night brightness (%)",night_off:"Screen off at night after (minutes, 0 = never)",motion_wake:"Wake when someone comes close",motion_wake_hint:"Uses the tablet's camera to notice people. Nothing is recorded. Ask the homeowner first.",weather:"Weather",weather_entity:"Weather source",weather_bg:"Live weather background",photos:"Family photos",photo_folder:"Folder in Media",photo_seconds:"Seconds per photo",photos_hint:"Put photos in Media → My media → {folder}. Without photos the screensaver shows the clock.",status_bar:"Status bar",power_entity:"Home power sensor",chip_lights_1:"1 light on",chip_lights_n:"{n} lights on",chip_open_1:"1 open",chip_open_n:"{n} open",chip_unlocked_1:"Unlocked",chip_unlocked_n:"{n} unlocked",chip_climate_1:"AC {temp}",chip_climate_n:"{n} ACs on",chip_motion:"Motion",chip_alert:"Alert",chip_t_lights:"Lights",chip_t_open:"Doors & windows",chip_t_unlocked:"Locks",chip_t_climate:"AC",chip_t_motion:"Motion",chip_t_power:"Power",chip_t_alert:"Alerts",turn_all_off:"Turn all off",lock_all:"Lock all",greet_morning:"Good morning",greet_afternoon:"Good afternoon",greet_evening:"Good evening",greeting_name:"Name in the greeting",greeting_name_hint:"Leave empty to use the signed-in person's name",in_min:"in {n} min",in_hours:"in {n}",prayer:"Prayer times",p_fajr:"Fajr",p_dhuhr:"Dhuhr",p_asr:"Asr",p_maghrib:"Maghrib",p_isha:"Isha",morning_summary:"Morning summary",today_weather:"Today",overnight:"Overnight",night_doorbell_1:"The doorbell rang once",night_doorbell_n:"The doorbell rang {n} times",night_door_1:"{name} opened once",night_door_n:"{name} opened {n} times",night_robot:"The robot cleaned",night_quiet:"A quiet night. Nothing to report.",night_unlocked:"{name} is unlocked right now",lets_go:"Let's go",health:"System health",h_offline:"Offline devices",h_battery:"Low batteries",h_backup:"Last backup",h_backup_missing:"No backup sensor. Turn on automatic backups in Settings → System → Backups.",h_updates:"Updates waiting",h_system:"Hub",h_disk:"Disk",h_cpu_temp:"CPU temperature",h_memory:"Memory",h_tablets:"Wall tablets",h_reload:"Reload",h_charging:"Charging",h_not_charging:"Not charging",h_all_good:"All good",h_days_ago:"{n} days ago",h_robot_parts:"Robot parts to replace",h_telegram:"For alerts on Telegram, copy ha-config/packages/smartnest_health.yaml to this house.",activate_title:"Activate SmartNest",activate_text:"This dashboard needs an activation key for this house.",activate_id:"Installation ID",activate_key:"Activation key",activate_btn:"Activate",activate_bad:"This key isn't valid for this house.",activate_ask:"Ask the person who installed your smart home to activate it.",activate_send:"Send this ID to your installer:",licensed_to:"Licensed to",copy:"Copy",copied:"Copied",plan_basic:"Basic",plan_pro:"Pro",plan_premium:"Premium",plan_needed:"Available in {plan}",plan_label:"Plan",expires_on:"Renews by",expires_soon:"Your SmartNest subscription ends in {n} days. Ask your installer to renew.",expired_title:"Subscription ended",expired_text:"Ask your installer for a new activation key.",trial_label:"Trial",via:"Through",season:"Ramadan & Eid look",season_auto:"Automatic",season_ramadan:"Ramadan",season_eid:"Eid",ramadan_kareem:"Ramadan Kareem",eid_mubarak:"Eid Mubarak",timer_off_in:"Turn off in",timer_left:"Turns off {in}",min_short:"{n} min",hour_short:"{n} h",ss_style:"Screensaver style",ss_classic:"Classic",ss_minimal:"Minimal",ss_analog:"Analog",glass_style:"Card style",glass_classic:"Frosted",glass_liquid:"Liquid glass",guests_mode:"Guest mode",guests_wifi:"Guest Wi-Fi",wifi_ssid:"Network name",wifi_password:"Password",guests_welcome:"Welcome message",welcome_default:"Welcome! Make yourselves at home",scan_wifi:"Scan to join the Wi-Fi",plan_3d:"3D view",map_temp:"Temperature",map_humidity:"Humidity",map_co2:"Air (CO₂)",widget_media:"Music & TV",widget_remote:"TV remote",nothing_playing:"Nothing playing",group_speakers:"Play everywhere",cinema_mode:"Cinema",scene_cinema:"Enjoy the film",announce:"Say it on the speakers",speakers:"Speakers for announcements",export_config:"Export dashboard",import_config:"Import dashboard",import_done:"Imported. Check it, then tap Save.",import_bad:"That file isn't a SmartNest dashboard.",transfer:"Move between houses",wizard_title:"Set up this home",wizard_next:"Next",wizard_finish:"Finish",wizard_pages:"Which pages?",wizard_house:"What kind of home?",house_flat:"Flat",house_villa:"Villa",house_office:"Office",maintenance:"Maintenance",m_title:"Task",m_every:"Every (days)",m_done:"Done today",m_due:"Due",m_in:"in {n} days",m_overdue:"{n} days late",faults_week:"Dropped out this week",times:"{n}×",rate_service:"Rate your installer",rate_thanks:"Thank you! Your installer will see this.",rate_comment:"Anything to add?",tv_mode:"Large text (TV)",this_screen:"This screen",opens_on:"Opens on",about:"About",version:"Version",none:"None",enabled:"On",on:"On",off:"Off",open:"Open",closed:"Closed",opening:"Opening",closing:"Closing",locked:"Locked",unlocked:"Unlocked",locking:"Locking",unlocking:"Unlocking",jammed:"Jammed",cleaning:"Cleaning",docked:"Docked",returning:"Returning",paused:"Paused",idle:"Idle",error:"Error",unavailable:"Unavailable",unknown:"Unknown",motion:"Motion",clear:"Clear",detected:"Detected",heat:"Heat",cool:"Cool",auto:"Auto",dry:"Dry",fan_only:"Fan",heat_cool:"Heat/Cool",playing:"Playing",recording:"Recording",streaming:"Live",tap_to_run:"Tap to run",start:"Start",pause:"Pause",return_home:"Return to dock",locate:"Locate",lock:"Lock",unlock:"Unlock",unlock_confirm:"Unlock the door?",cover_open:"Open",cover_close:"Close",stop:"Stop",turn_on:"Turn on",turn_off:"Turn off",color:"Color",white_temp:"White",more_colors:"More colors",position:"Open",tilt:"Tilt",brightness:"Brightness",target_temp:"Set to",current_temp:"Now",battery:"Battery",mode:"Mode",last_changed:"Changed",just_now:"just now",min_ago:"{n} min ago",hours_ago:"{n} h ago",history_24h:"Last 24 hours",someone_at_door:"Someone's at the door",dismiss:"Dismiss",open_door:"Open door",tagline:"Smart home. Better living.",assistant:"Assistant",as_hello:"Ask me anything about the house, or tell me what to do.",as_s1:"Turn off all the lights",as_s2:"What's the temperature inside?",as_s3:"Close the blinds",as_s4:"Is the front door locked?",as_done:"Done.",as_error:"I couldn't do that. Try again.",as_speak:"Speak",as_placeholder:"Type a message…",as_send:"Send",ai_looking:"Looking…",habits_title:"Suggestions from your habits",habits_seen:"Happened by hand on {n} of the last 14 days",habits_make:"Make it automatic",x_title:"What's wrong and how to fix it",x_zigbee:"Zigbee: usually a dead battery, or it's too far from a powered Zigbee device",x_mqtt:"MQTT: check the bridge (Zigbee2MQTT) is running",x_zwave:"Z-Wave: battery, or re-interview the device",x_cloud:"Cloud device: check its power and Wi-Fi, then reload the integration (it may need a new login)",x_wifi:"Wi-Fi device: probably unplugged or out of Wi-Fi range",x_generic:"Check its power and connection, then reload its integration",x_battery:"Change the battery soon",x_ai:"Ask the AI",widget_consumers:"Using power now",widget_water:"Water",template_water:"Water",now:"now",others:"Others",standby:"Standby",standby_hint:"Off, but still drawing power. A smart plug can cut it.",standby_total:"{w} goes to devices that are off",water_usage:"Water meter",water_tank:"Tank",water_valve:"Main valve",water_leak:"Leak",water_no_leak:"No leaks",water_close:"Close",water_open:"Open",water_close_confirm:"Tap again to close",bill_budget:"Monthly budget",bill_over:"Heading {v} over",bill_within:"On track",solar_tip:"{kw} of spare sun: a good time for the washer or the heater",overload_title:"High load: {now} of {max}",overload_hint:"Turn something off before the breaker trips:",power_limit:"Power limit (W)",power_limit_hint:"An alert shows when the house goes over this for 20 seconds",replay:"Replay the day",play:"Play",all_floors:"All floors",travel:"Travel mode",travel_on:"Travel mode on",travel_off:"Turns off: {x}",travel_off_pick:"Turn off when leaving",travel_arm:"Arms the alarm",travel_sim:"Lights on and off in the evening, like someone's home",travel_sim_now:"Simulating now: {x}",travel_report:"A report to your phone every evening at 8",travel_start:"We're leaving",travel_stop:"We're back",travel_bye:"Have a good trip! The house is in good hands.",travel_welcome:"Welcome home!",alarm_triggered:"The alarm is going off",alarm_code:"Alarm code",alarm_stop:"Stop the alarm",alarm_hide:"Hide",call_police:"Police",emergency:"Emergency numbers",police_number:"Police number",emergency_contacts:"Family to call",emergency_hint:"One per line: name, phone. Shown when the alarm goes off.",chip_t_package:"Parcels",chip_package:"A parcel arrived",wx_alert_rain:"Rain on the way",wx_alert_wind:"Strong wind or dust on the way",wx_alert_open:"Still open: {x}",wx_close_covers:"Close the blinds",widget_wake:"Sunrise alarm",wake_minutes:"{n} min sunrise",wake_add:"Add an alarm",wake_hint:"The light rises slowly before the alarm time, like the sun.",widget_chores:"Kids' chores",chores_kids:"Kids",chores_tasks:"Chores",chores_kid_name:"Name",chores_task_name:"Chore (e.g. make the bed)",chores_goal:"Stars for the reward (weekly)",chores_reward:"Reward",chores_reward_hint:"Ice cream on Friday",chores_won:"Reward earned!",widget_air:"Air quality",air_co2:"CO₂",air_pm25:"Fine dust",air_voc:"VOCs",air_humidity:"Humidity",air_level_good:"The air is fresh",air_level_ok:"The air could be better",air_level_bad:"The air needs attention",air_good:"Nothing to do.",air_tip_co2:"Open a window for 10 minutes.",air_tip_pm:"Close the windows and run the purifier.",air_tip_voc:"Air the room out: cooking, paint or cleaning products.",air_tip_dry:"Too dry: a humidifier would help.",air_tip_humid:"Too humid: run the AC on dry, or air the room.",fx_title:"Moving scenes",fx_candle:"Candle",fx_sunset:"Sunset",fx_party:"Party",fx_ramadan:"Ramadan",fx_aurora:"Aurora",fx_stop:"Stop",fx_started:"Scene running",page_person:"Whose page",page_person_all:"Everyone",page_person_hint:"Their photo shows in the bar; tap it to open their page.",support_title:"Something's wrong? Message the installer",support_hint:"Sends a WhatsApp to {name} with the house's status, so they can help faster.",support_placeholder:"What's happening? (e.g. the kitchen light doesn't respond)",support_default:"Hi, I need help with the smart home.",support_send:"Send on WhatsApp",installer:"Installer",installer_name:"Installer name",installer_phone:"WhatsApp number",installer_phone_hint:"With country code, no + or spaces. The client gets a 'Something's wrong?' button.",report:"Monthly report",report_title:"{name} · monthly report",report_devices:"Devices",report_offline:"{n} offline now",report_faults:"Dropped off this month",report_autos:"{n} running",presets:"Ready-made looks",preset_gold:"Gold",preset_sea:"Sea",preset_desert:"Desert",preset_night:"Night",preset_rose:"Rose",preset_olive:"Olive",history:"Earlier versions",history_hint:"Every save keeps the version before it. Restoring is undoable too.",history_empty:"No earlier versions yet. They appear after the next save.",history_size:"{p} pages · {w} items",history_restore:"Go back to this",history_confirm:"Replace today's dashboard with this version on every screen?",history_done:"Restored",template_car:"Car",template_garden:"Garden & pool",template_pets:"Pets",ai_scene_title:"A mood in words",ai_scene_hint:"e.g. calm for a movie",ai_do_it:"Do it",ai_auto_hint:"Describe it: every night at 11 turn off the living room",ai_auto_fail:"I couldn't turn that into an automation. Try saying when and what.",ai_cam_btn:"What happened outside today?",ai_cam_quiet:"A quiet day: nothing was seen.",ai_bill_btn:"Why is the bill like this?",voice_hands_free:"Hands-free voice",voice_hint:"Say the wake word (e.g. “Okay Nabu”) and talk. Needs the Assist pipeline with a wake word engine, and the dashboard on https.",voice_https:"The microphone needs the dashboard on https",voice_mic:"No access to the microphone",voice_pipeline:"Assist isn't ready (wake word engine?)",voice_ready:"Listening for the wake word",voice_listening:"I'm listening…",helpers:"House helpers",h_appliances:"Appliance finished",h_appliances_hint:"Pick the plug meters of the washer, dryer or dishwasher. When a cycle ends, every screen says so, and the speakers too.",h_night_path:"Night path",h_night_path_hint:"Pick motion sensors and lights: at night, motion turns them on dimly for 3 minutes.",h_arrival:"On the way home",h_arrival_hint:"Pick ACs and lights: when someone heads home and is this close, the AC starts (and the lights, after dark).",h_arrival_missing:"Needs the Proximity integration in Home Assistant (Settings → Integrations → Proximity).",h_arrival_km:"Start when closer than (km)",h_outage:"Power cut",h_outage_hint:"Pick the grid sensor (a binary sensor, or grid voltage), then what to turn off when it's gone.",h_outage_sensor:"Grid sensor",from:"From",to:"to",chip_outage:"Power cut",chip_running:"{name} running",chip_arriving:"{name} home in ~{n} min",widget_boiler:"Water heater",boiler_ready_in:"Heating · ready in {n} min",boiler_off_in:"Hot · turns off in {n} min",boiler_hot:"On",boiler_next:"Hot water by {at}",boiler_for:"{n} min",boiler_plan:"starts {n} min before",boiler_want:"Hot water by",widget_irrigation:"Garden watering",irr_running:"Watering now",irr_next:"At {at} for {n} min",irr_skip_rain:"Skip when rain is coming",irr_skipped:"{date}: skipped, rain on the way",irr_watered:"{date}: watered",irr_now:"Water 10 min now",minutes:"min",codes_title:"Guest codes",codes_new:"New code",codes_who:"For whom (e.g. the cleaner)",codes_from:"Starts",codes_4h:"4 hours",codes_day:"A day",codes_3days:"3 days",codes_week:"A week",codes_auto:"Code (empty = random 6 digits)",codes_make:"Make the code",codes_live:"Active",codes_later:"Starts later",codes_share:"Send",codes_full:"All guest slots on this lock are taken",codes_need_zwave:"Guest codes are written to Z-Wave keypad locks (Z-Wave JS).",codes_message:"Hi {name} 👋\nYour code for {lock}: {code}\nFrom {from}\nUntil {until}",widget_timeline:"Camera timeline",tl_pick:"{n} detections: tap a dot to watch",tl_none:"Nothing was detected",fr_person:"Person",fr_car:"Car",fr_dog:"Dog",fr_cat:"Cat",fr_package:"Parcel",widget_internet:"Kids' internet",net_on:"Online",net_off:"Offline",net_paused_for:"Paused · back in {n} min",net_stop:"Stop",net_allow:"Allow",net_hour:"An hour off",net_bedtime:"Bedtime",net_wake:"Morning",net_no_router:"No router switches found. Add your router's integration (UniFi, FRITZ!Box, Omada, Deco…).",net_ask_installer:"Ask the installer to set this up.",face_hello:"Hello {name}",widget_board:"Family board",board_write:"Write",board_draw:"Draw",board_stick:"Stick it",board_placeholder:"Back at 6, dinner's in the fridge…",board_empty:"Nothing on the board yet. Write a note or draw something.",widget_verse:"Verse of the day",widget_radar:"Rain radar",widget_commute:"On the road",commute_missing:"Add the Waze Travel Time integration (to work, school…) and the routes show up here.",widget_parcels:"Parcels",parcels_missing:"Add the 17TRACK integration to follow your parcels here.",parcels_none:"No parcels on the way",photos_from_phone:"Photos from a phone",photos_scan:"Scan with the phone's camera and pick photos. The link works for {n} minutes.",photos_wifi:"The phone needs to be on the home Wi-Fi.",big_text:"Large text",tour_again:"Show me around",tour_skip:"Skip",tour_next:"Next",tour_done:"Got it",tour_tabs:"These are your pages. Tap one, or swipe left and right.",tour_chips:"The house at a glance: what's on, what's open. Tap one to see or fix it.",tour_plan:"Your home's plan. Tap a device to control it, or a room to see everything in it.",tour_modes:"One tap for the whole house: leaving, back home, sleep, evening.",tour_tile:"Tap to switch on or off. Hold for more (brightness, colour, timer).",tour_assistant:"Ask or tell the house anything here.",tour_logo:"Settings for this screen, and help, are behind the logo.",tou:"Cheap hours",tou_cheap:"Cheap",tou_peak:"Peak",tou_later:"Run it at {at} (cheaper)",tou_scheduled:"It will start at {at}",chip_peak:"Peak hours ⚡",chip_cheap:"Power is cheap now",challenge_won:"{n}% less than last month",challenge_hint:"Family challenge: keep it lower than last month",refill_phone:"Supplier's WhatsApp (for refills)",refill_hint:'When the level is low, an "Order a refill" button appears.',refill_order:"Order a refill",refill_message:"Hello, we need a refill of {what} for {home}. Thanks!",heartbeat_url:"Heartbeat link",heartbeat_hint:"From your Licenses page. This house reports to you twice a day: up or not, how many devices are offline, which version.",bat_title:"Batteries running out",bat_days:"in ~{n} days",bat_year:"over a year",bat_none:"No battery is draining fast",war_title:"Warranties",war_until:"until {date}",war_over:"Ended",war_what:"Device (e.g. living room AC)",war_months:"{n} months",war_invoice:"Invoice photo",showroom:"Showroom mode",showroom_hint:"This screen shows a demo house instead of this home, for the shop. Turn it off here.",style:"Look",style_classic:"Classic",style_pro:"SmartNest 2.0",style_hint:"2.0: deeper glass with a light that follows your finger, the room's light colour behind everything, film grain and two-tone icons.",material_none:"Plain",material_marble:"Marble",material_wood:"Wood",material_sand:"Sand",material_olive:"Olive",night_midnight:"Midnight at night (pure black, only what's on glows)",theme_midnight:"Midnight",widget_hero:"House at a glance",hero_ok:"All good",hero_all_quiet:"All quiet at home",hero_inside:"Inside",hero_home:"Home",widget_stack:"Smart stack",widget_room:"Room card",room_photo:"Room photo",template_bento:"Bento home",act_running:"Running",act_cleaning:"Cleaning",act_heating:"Heating water",act_off_in:"Off in {n} min",wallpaper:"Wallpaper",wallpaper_dim:"Darken",accent_from_wallpaper:"Take the colour from the photo",nav_style:"Pages",nav_tabs:"Tabs in the bar",nav_dock:"Floating dock",search_placeholder:"Search devices, pages, modes…",search_page:"Page",search_open:"Open",search_none:"Nothing found",sound_motion:"Sound and motion",ui_sounds:"Soft clicks when things switch",bell_tone:"Doorbell tone",bell_chime:"Classic",bell_dingdong:"Ding-dong",bell_melody:"Melody",motion_full:"Full",motion_light:"Light",motion_off:"Still",motion_hint:"Light keeps feedback but stops the ambient loops (drifting light, breathing cards). Still stops page animations too.",plan_model:"3D house model",plan_lens:"Magnifier",high_contrast:"Higher contrast (stronger text, solid cards)",welcome_home:"Welcome home, {name}",window_camera:"Window: an outdoor camera as the background",music_backdrop:"Album art behind everything while music plays",welcome_moment:"Welcome moment when someone gets home",page_moods:"Each page its own colour mood",season_skin:"Seasonal skies (snow, leaves, petals)",monogram:"Family monogram",monogram_hint:"A gold seal with the family's initials replaces the logo in the bar.",ab_title:"Set up the dashboard for me",ab_hint:"I looked at this home's devices. These are the pages I can build, each already filled. Untick what you don't want.",ab_per_area:"Rooms",ab_one_rooms:"One rooms page",ab_area_pages:"A page per room",ab_devices:"{n} devices",ab_home:"Plan and modes",ab_mode:"Existing pages",ab_replace:"Replace them (keep the plan)",ab_add:"Keep and add",ab_go:"Build {n} pages",ab_done:"{n} pages ready. Press Save to keep them.",template_media:"Music & TV",fast_mode:"Fast mode",fast_auto:"Automatic",fast_hint:"Solid cards instead of live blur, no ambient animations, fewer redraws. Best for wall tablets.",fast_hint_weak:"This tablet is on the weaker side, so Automatic turns fast mode on.",revoked_title:"Dashboard stopped",revoked_text:"Your installer has stopped this license. Contact them to turn it back on.",lic_check:"Check now",lic_check_ok:"Up to date ✓",lic_check_none:"Couldn't reach your installer, try again later",boiler_pick:"Water heater device",boiler_tap_pick:"Choose the water heater: ✏️ → widget settings",air_purifier:"Purifier / humidifier",air_sensors:"Sensors",auto_all:"Nothing chosen: finds them by itself.",widget_ac:"Air conditioner",widget_scenes:"Scenes",widget_sensor:"Sensor graph",widget_batteries:"Batteries",widget_lights:"Lights",widget_covers:"Blinds",widget_prayer:"Prayer times",sensor_pick:"Choose a sensor in the widget settings",bat_low_n:"{n} low",bat_all_good:"All good",lights_on_n:"{n} of {of} on",covers_open_n:"{n} of {of} open",all_off:"All off",all_on:"All on",prayer_fajr:"Fajr",prayer_sunrise:"Sunrise",prayer_dhuhr:"Dhuhr",prayer_asr:"Asr",prayer_maghrib:"Maghrib",prayer_isha:"Isha",prayer_next:"Next prayer",prayer_in_hm:"in {h}h {m}m",prayer_in_m:"in {m} min",prayer_setup:'Add the "Islamic Prayer Times" integration in Home Assistant and the times show up here.',area_all:"Whole house",widget_title:"Title",bat_low_at:"Low below %",picker_more:"Show {n} more",picker_show_extra:"Also show {n} technical entities",irr_pick:"Choose the valve: ✏️ → widget settings",hidden_devices:"Hidden devices",hidden_hint:"Hidden everywhere in the dashboard: pages, search, the status bar and auto-built pages. They keep working in Home Assistant.",hidden_add:"Hide a device",hidden_show:"Show it again",hidden_this:"Hide from the dashboard",hidden_done:"Hidden. Bring it back in Settings → Hidden devices",link_lost:"Reconnecting to the house…",link_back:"Connected",radial_warm:"Warm",radial_cool:"Cool",radial_off_in:"{n} min",radial_more:"More",radial_timer_set:"Turns off in {n} min",undo:"Undo",undo_n:"{n} devices changed",plan_north:"Which way is north (degrees)",plan_north_hint:"0 when north is at the top of the plan, 90 when it's on the right. The sunlight on the plan follows it.",simple_mode:"Simple mode",simple_hint:"For grandparents: big text and just the pages and buttons on this screen.",night_red:"Night red",night_red_hint:"After dark this screen turns warm and dim: kind to sleepy eyes in a bedroom.",occ_ramadan:"Ramadan Kareem",occ_eid_fitr:"Eid Mubarak",occ_eid_adha:"Eid Mubarak",occ_christmas:"Merry Christmas",occ_new_year:"Happy New Year",font:"Typeface",font_hint:"Rubik is built in; the others load from Google Fonts the first time (the tablet needs internet once).",icons_style:"Icons",icons_filled:"Solid",icons_line:"Line",accent_day:"Colour follows the day (gold, teal, coral, violet)",active_glow:"A light runs around what's on",aurora:"Aurora behind the cards (no wallpaper)",occasions:"Dress up for Ramadan, the Eids, Christmas and New Year",burn_in:"Protect wall screens from burn-in",ss_open:"{n} open",ss_unlocked:"{n} unlocked",widget_folder:"Folder",folder_on:"{n}/{of} on",folder_empty:"Add devices in settings",scene_keep:"Keep it like this (save as scene)",scene_name:"Scene name",scene_saved:'Saved "{name}" as a scene',acw_title:"AC week",acw_hint:"Drag across the hours it should run. Home Assistant turns it on at the start of each block and off at the end, even with the dashboard closed.",notifications:"Notifications",notif_ha:"From Home Assistant",notif_day:"The last 24 hours",notif_quiet:"A quiet day: nothing opened or unlocked",door_mini:"Keep watching in a corner",cam_motion:"Movement",ss_lights_off:"Lights off",ss_lock:"Lock",nudge_window_ac:"{win} is open while {ac} runs",nudge_ac_off:"Turn the AC off",nudge_away_lights:"Everyone's out and {n} lights are on",nudge_lights_off:"Lights off",nudge_idle_light:"{light} has been on for 30 minutes with nobody in {room}",nudge_turn_off:"Turn off",nudge_tv:"{tv} is on and nobody's home",nudge_later:"Not now",brand_logo:"Your logo (instead of SmartNest)",brand_hint:"Shows in the bar and on the screensaver. From your licenses page it reaches every house by itself.",design_arrived:"Your installer sent a new design: {name}",design_new:"New dashboard",design_apply:"Use it",design_confirm:"Replace this dashboard's pages with the new design? Your plan, devices' names and settings stay. (The old one is kept in Settings → History.)",design_applied:"New design in place",design_applied_dropped:"New design in place ({n} cards for devices this house doesn't have were left out)",phone_qr:"Open it on a phone",phone_qr_hint:"Scan with the phone camera. Best in the Home Assistant app (App Store / Google Play): sign in once and SmartNest is in its menu.",ab_kind:"The place",ab_apartment:"Apartment",ab_villa:"Villa",ab_office:"Office",plan_draw:"Draw the plan",plan_clean:"Clean plan",plan_photo_back:"Back to the photo",plan_mode_room:"Rooms",plan_mode_door:"Doors",plan_room_n:"Room {n}",plan_kind_wood:"Wood",plan_kind_tile:"Tiles",plan_kind_plain:"Plain",plan_kind_outdoor:"Outside",plan_draw_hint:"Drag across the grid to draw a room. Rooms snap to each other's walls.",plan_draw_more:"Draw the next room next to it, or tap a room to name, move or resize it.",plan_door_hint:"Tap a wall to add a door. Tap a door to link its sensor, lock or motor, or to remove it.",plan_clean_need_rooms:"Outline the rooms first (Rooms, or Auto add)",plan_mode_wall:"Open walls",plan_mode_furn:"Furniture",plan_wall_hint:"Tap a wall to open it (a living room open to the kitchen). Tap the highlighted opening to close it again.",plan_turn:"Turn",plan_copy:"Copy",furn_sofa:"Sofa",furn_sofa_l:"Corner sofa",furn_armchair:"Armchair",furn_coffee:"Coffee table",furn_tv:"TV",furn_rug:"Rug",furn_dining:"Dining table",furn_round_table:"Round table",furn_bed2:"Double bed",furn_bed1:"Single bed",furn_wardrobe:"Wardrobe",furn_desk:"Desk",furn_toilet:"Toilet",furn_basin:"Washbasin",furn_bath:"Bathtub",furn_shower:"Shower",furn_counter:"Counter",furn_ksink:"Kitchen sink",furn_stove:"Stove",furn_fridge:"Fridge",furn_washer:"Washer",furn_plant:"Plant",furn_stairs:"Stairs",furn_car:"Car",plan_mode_line:"Walls",plan_line_hint:"Drag to draw a wall. It snaps to corners and wall ends, and straightens when nearly level or upright. Tap a wall to delete it.",plan_line_sel:"This wall",plan_room_walls:"Its own walls",plan_room_nowall:"No walls (a zone)",plan_shape_rect:"Rectangle",plan_shape_poly:"Points",plan_poly_hint:"Tap each corner of the room in turn (any shape). Tap the first point again to close it.",plan_poly_drawing:"Next corner… (back on the first point closes it)",plan_poly_undo:"Last point",plan_poly_close:"Close the room",plan_point_remove:"Remove this point",plan_opening_door:"Door",plan_opening_double:"Double door",plan_opening_slide:"Sliding",plan_opening_window:"Window",plan_opening_wide_window:"Wide window",furn_nightstand:"Nightstand",furn_dresser:"Dresser",furn_bookshelf:"Bookshelf",furn_chair:"Chair",furn_crib:"Baby cot",furn_bunk:"Bunk bed",furn_island:"Kitchen island",furn_dishwasher:"Dishwasher",furn_oven:"Oven",furn_bidet:"Bidet",furn_basin2:"Double basin",furn_jacuzzi:"Jacuzzi",furn_dryer:"Dryer",furn_ac:"AC unit",furn_boiler:"Water heater",furn_fireplace:"Fireplace",furn_piano:"Piano",furn_tree:"Tree",furn_pool:"Pool",furn_bbq:"BBQ",furn_outdoor:"Garden table",furn_shoes:"Shoe cabinet",furn_mirror:"Mirror",plan_mode_window:"Windows",plan_window_hint:"Tap a wall to add a window. Tap a window to link its sensor or motor, so the plan shows it open.",plan_link_none:"Not linked to a device",move_room:"Room (page)",move_room_hint:"Pick a room and the card moves there: to the end of its section on this page, or to another page. The device moves to that room in Home Assistant too.",moved_to:"Moved to {page}",move_this_page:"Rooms on this page",move_other_page:"Another page",live:"Live",camera_mode:"Picture",camera_auto:"Like the house",camera_live:"Always live",camera_still:"Still",camera_mode_hint:"Live plays while the card is on screen. Up to 4 cameras play at once; the rest refresh every 2 s and go live when one stops.",cameras_live:"Cameras play live",fast_auto_on:"This screen was struggling, so fast mode is on (change it in About)",rooms_on_n:"{n} on",rooms_devices_n:"{n} devices",slide_unlock:"Slide to unlock",slide_open_door:"Slide to open the door",doorbell_speaker:"Speaker by the door (spoken replies)",reply_coming:"Coming!",reply_leave:"Please leave it at the door",reply_wait:"One minute please",reply_who:"Who is it?",reply_sent:"Said at the door",circadian:"Lights that follow the sun",circadian_hint:"Cool white in the day, warm at sunset, warmest at night, when they are on in white. Change one by hand and it stays as you set it until it is next switched off.",nudge_door_open:"{door} has been open for {n} minutes",nudge_look:"Look",nudge_fridge_warm:"{name} is at {v}° — the fridge is warming up",nudge_freezer_warm:"{name} is at {v}° — the freezer is warming up",nudge_standby:"{name} draws {w} W on standby",air_score:"Air score",page_users:"Who sees this page",page_users_all:"Everyone. Pick people to show it only to them (a guest account sees only its pages).",page_users_some:"Only the people chosen (and admins).",quick_scenes:"Scenes bar at the bottom of every page"},Lt={en:At,ar:{edit:"تعديل",done:"تم",save:"حفظ",cancel:"إلغاء",delete:"حذف",add:"إضافة",close:"إغلاق",back:"رجوع",settings:"الإعدادات",search:"بحث",loading:"جارٍ التحميل…",saving:"جارٍ الحفظ…",saved:"تم الحفظ",save_failed:"ما زبط الحفظ. تأكد من الاتصال وجرّب مرة ثانية.",upload_failed:"ما زبط الرفع. استعمل صورة PNG أو JPG أو WebP أصغر من 15 ميغا.",discard_changes:"تتجاهل التعديلات؟",delete_confirm:"متأكد إنك بدك تحذفه؟",untitled:"بدون اسم",add_page:"صفحة جديدة",page_settings:"إعدادات الصفحة",page_title:"اسم الصفحة",page_icon:"الأيقونة",move_earlier:"قدّمها",move_later:"أخّرها",choose_template:"ابدأ من",template_rooms:"الغرف",other_devices:"غير ذلك",autofill_rooms:"عبّي الغرف",autofill_done:"انحط {n} جهاز",detect_rooms:"اكتشف الغرف",auto_add:"إضافة تلقائية",auto_need_areas:"رتّب الأجهزة على غرف بـ Home Assistant أول (الإعدادات ← Areas)",auto_nothing:"ما في أجهزة جديدة أحطها",which_room:"شو هاي الغرفة؟",skip_room:"تخطّي",detecting:"عم بقرا المخطط…",detect_none:"ما لقيت غرف جديدة. ارسمها بإيدك.",detect_done:"لقيت {n} غرف. اضغط على كل غرفة وسمّيها",detect_done_placed:"لقيت {n} غرف وحطيت {m} جهاز",detect_failed:"ما قدرت أقرا هالمخطط",room_area:"غرفة Home Assistant",template_blank:"فاضية",template_home:"الرئيسية",template_power:"الكهرباء",template_security:"الأمان",template_doorbell:"الجرس",template_climate:"التكييف",add_widget:"إضافة عنصر",widget_settings:"إعدادات العنصر",widget_floorplan:"مخطط البيت",widget_tile:"جهاز",widget_camera:"كاميرا",camera_wall:"كل الكاميرات",widget_heading:"عنوان",widget_clock:"ساعة",widget_modes:"الأوضاع",mode_away:"طالع",mode_home:"راجع",mode_sleep:"نوم",mode_evening:"سهرة",scene_away:"الله معك",scene_home:"أهلين، نوّرت البيت",scene_sleep:"تصبح على خير",scene_evening:"سهرة حلوة",scene_locking:"عم نقفل البيت",modes_missing:"ما لقيت سكربتات الأوضاع. انسخ ha-config/packages/smartnest_modes.yaml لـ Home Assistant.",widget_vacuum:"روبوت التنظيف",widget_visitors:"الزوار",widget_energy:"الطاقة",template_robot:"الروبوت",clean_rooms_1:"نظّف غرفة",clean_rooms_n:"نظّف {n} غرف",clean_all:"نظّف البيت كله",suction:"الشفط",mop:"المسح",passes:"عدد المرات",parts:"القطع",main_brush:"الفرشاة الرئيسية",side_brush:"الفرشاة الجانبية",filter:"الفلتر",sensors_part:"الحساسات",hours_left:"باقي {n} ساعة",cleaned_area:"نظّف",clean_time:"الوقت",empty_bin:"فضّي الخزان",no_rooms:"الغرف بتطلع هون لما الروبوت يرسم خريطة البيت.",fan_quiet:"هادي",fan_balanced:"عادي",fan_standard:"عادي",fan_turbo:"قوي",fan_max:"أقصى",fan_max_plus:"أقصى+",fan_gentle:"خفيف",fan_off:"بدون",mop_mild:"خفيف",mop_low:"خفيف",mop_moderate:"عادي",mop_medium:"عادي",mop_intense:"كثير",mop_high:"كثير",mop_off:"بدون",yesterday:"مبارح",today:"اليوم",no_visitors:"ما حدا دق الجرس لسا.",keep_days:"خلي صور الزوار (أيام)",e_solar:"الشمسي",e_grid:"الشبكة",e_battery:"البطارية",e_home:"البيت",e_solar_entity:"إنتاج الشمسي",e_grid_entity:"الشبكة (+ = سحب من الشبكة)",e_battery_entity:"البطارية (+ = عم تشحن)",e_soc_entity:"نسبة البطارية",e_home_entity:"استهلاك البيت (اختياري)",e_flip:"اعكس الاتجاه",widget_energy_stats:"فاتورة الكهرباء",widget_panic:"طوارئ",widget_check:"فحص قبل النوم",bill_title:"الكهرباء هالشهر",bill_projected:"الفاتورة المتوقعة",bill_used:"استهلكت لهلأ",bill_vs_last:"عن الشهر الماضي",bill_solar:"الشمسي وفّر",bill_top:"أكثر إشي بيصرف",e_total_energy:"الاستهلاك الكلي (kWh)",e_solar_energy:"إنتاج الشمسي (kWh)",tariff:"سعر الكيلوواط",currency:"العملة",panic_hold:"اضغط مطوّل ثانيتين",panic_sent:"وضع الطوارئ اشتغل",panic_missing:"ما لقيت سكربت الطوارئ. انسخ ha-config/packages/smartnest_safety.yaml لـ Home Assistant.",check_ok:"كله جاهز للنوم",check_n:"في {n} أشياء بدها انتباه",check_locks:"الأبواب مقفولة",check_open:"الأبواب والشبابيك مسكّرة",check_lights:"الأضواء مطفية",check_alarm:"الإنذار شغّال",check_appliances:"الأجهزة الخطرة مطفية",check_fix:"صلّحها",check_fix_all:"صلّح كل اللي بقدر عليه",arm_home:"بالبيت",arm_away:"طالعين",arm_night:"ليلي",disarm:"طفّي الإنذار",enter_code:"اكتب الرمز",disarmed:"مطفي",armed_home:"شغّال (بالبيت)",armed_away:"شغّال (طالعين)",armed_night:"شغّال (ليلي)",armed_vacation:"شغّال (سفر)",arming:"عم يشتغل",disarming:"عم يطفي",pending:"مستني",triggered:"إنذار!",widget_family:"العيلة",at_home:"بالبيت",away_l:"برا",widget_todo:"القائمة",add_placeholder:"ضيف إشي…",todo_empty:"ما في إشي",widget_calendar:"التقويم",no_events:"ما في مواعيد جاية",all_day:"كل اليوم",tomorrow:"بكرا",widget_forecast:"طقس الأسبوع",widget_countdown:"العدّاد",days_left:"{n} يوم",today_event:"اليوم!",next_ramadan:"رمضان",next_eid:"عيد الفطر",next_adha:"عيد الأضحى",add_event:"أضف موعد",event_title:"الاسم",event_date:"التاريخ",send_message:"ابعت رسالة للشاشة",message_placeholder:"العشا جاهز!",send:"ابعت",message_from:"من {name}",got_it:"تمام",kids_mode:"وضع الأطفال",kids_page:"صفحة الأطفال",widget_gauge:"مقياس",widget_gate:"البوابة",widget_frigate:"آخر اللي انشاف",widget_schedule:"الجداول",gauge_low:"قرّب يخلص",gate_hold:"اضغط مطوّل عشان تفتح",gate_hold_close:"اضغط مطوّل عشان تسكّر",history_lock:"آخر الحركات",by_user:"من {name}",frigate_missing:"Frigate مش متركّب. ضيف integration الـ Frigate (من HACS) عشان تشوف هون الأشخاص والسيارات والوجوه.",person_l:"شخص",car_l:"سيارة",dog_l:"كلب",cat_l:"قطة",package_l:"طرد",automations:"الأتمتة",new_automation:"أتمتة جديدة",when:"لما…",then:"اعمل…",only_if:"بس بين",trig_time:"بوقت معيّن",trig_sun:"الشروق أو الغروب",trig_state:"جهاز يتغير",trig_mode:"وضع البيت يصير",sunrise:"الشروق",sunset:"الغروب",offset_min:"قبل/بعد (دقايق)",becomes:"يصير",act_on:"شغّل",act_off:"طفّي",act_mode:"غيّر وضع البيت",act_message:"اعرض رسالة",days:"الأيام",auto_name:"الاسم",auto_saved:"انحفظت الأتمتة",auto_empty:"ما في أتمتة من SmartNest لسا.",every_day:"كل يوم",heading_text:"النص",empty_page:"هالصفحة فاضية.",empty_page_admin:"اضغط تعديل، وبعدين إضافة عنصر.",entity:"الجهاز",choose_entity:"اختار جهاز",no_entities:"ما في أجهزة مطابقة",display_name:"الاسم الظاهر",display_name_hint:"خليه فاضي عشان ياخذ الاسم من Home Assistant",show_as:"طريقة العرض",show_icon:"أيقونة",show_value:"أيقونة وقيمة",floor:"الطابق",add_floor:"طابق جديد",heat_map:"حرارة الغرف",room_lights_on:"ولّع كل الأضواء",room_lights_off:"طفّي كل الأضواء",night_plan:"المخطط هادي بالليل",rooms:"الغرف",draw_room:"ارسم غرفة",draw_hint:"اضغط على كل زاوية بالغرفة، وبعدين اضغط على أول زاوية عشان تسكّرها.",room_name:"اسم الغرفة",room_default:"غرفة {n}",finish:"خلّصت",undo_point:"تراجع",delete_room:"احذف الغرفة",rooms_hint:"الأضواء اللي جوا الغرفة بتخليها تضوي.",floor_name:"اسم الطابق",floor_default:"الطابق الأرضي",upload_plan:"ارفع المخطط",replace_plan:"غيّر الصورة",add_device:"أضف جهاز",no_plan:"ما في مخطط لسا",no_plan_admin:"اضغط تعديل عشان ترفع واحد.",drag_hint:"اسحب الأجهزة لمكانها",plan_in_dark:"المخطط بالوضع الغامق",plan_original:"زي ما هو",plan_invert:"اعكس الألوان",doorbell_test:"جرّب الجرس",delete_floor:"احذف الطابق",home_name:"اسم البيت",language:"اللغة",accent:"لون التمييز",theme:"المظهر",theme_auto:"حسب الجهاز",theme_schedule:"غامق بالليل",theme_light:"فاتح",theme_dark:"غامق",dark_from:"غامق من",dark_to:"لـ",default_page:"صفحة البداية",screensaver:"شاشة التوقف",screensaver_after:"تشتغل بعد (دقايق)",temp_entity:"حساس الحرارة",doorbell:"الجرس",doorbell_trigger:"زر الجرس",doorbell_camera:"كاميرا الباب",doorbell_lock:"قفل الباب",kiosk:"قفل الشاشة",kiosk_lock:"اقفل الشاشة",kiosk_unlock:"افتح القفل",kiosk_pin:"رمز الخروج",kiosk_pin_hint:"من 4 لـ 8 أرقام. أعطيه لصاحب البيت، والأولاد والضيوف ما بيقدروا يطلعوا من الداشبورد بدونه.",kiosk_pin_set:"حط الرمز",kiosk_pin_change:"غيّر الرمز",kiosk_pin_saved:"تم. اضغط حفظ.",kiosk_pin_invalid:"من 4 لـ 8 أرقام",kiosk_remove_pin:"شيل الرمز",kiosk_full_lock:"للقفل الكامل استعمل كمان Fully Kiosk Browser (أندرويد) أو Guided Access (آيباد).",enter_pin:"اكتب الرمز",wrong_pin:"الرمز غلط",tablet:"تابلت الحيط (Fully Kiosk)",tablet_found:"لقيت: {names}",tablet_none:"ما في تابلت Fully Kiosk بـ HA لسا. ضيف integration الـ Fully Kiosk Browser أول.",tablet_this:"هالشاشة هي التابلت",tablet_not_this:"هالشاشة مش شغّالة جوا Fully",tablet_js_hint:"عالتابلت، فعّل JavaScript Interface بـ Fully (Settings ← Advanced Web Settings) عشان يعرف حاله.",night_dim:"خفّف الإضاءة بالليل",night_brightness:"إضاءة الليل (%)",night_off:"اطفي الشاشة بالليل بعد (دقايق، 0 = أبداً)",motion_wake:"صحّي الشاشة لما حدا يقرّب",motion_wake_hint:"بتستعمل كاميرا التابلت عشان تحس بالناس. ما في أي تسجيل. اسأل صاحب البيت أول.",weather:"الطقس",weather_entity:"مصدر الطقس",weather_bg:"خلفية حيّة حسب الطقس",photos:"صور العيلة",photo_folder:"الفولدر بـ Media",photo_seconds:"ثواني لكل صورة",photos_hint:"حط الصور بـ Media ← My media ← {folder}. إذا ما في صور، شاشة التوقف بتبيّن الساعة.",status_bar:"شريط الحالة",power_entity:"حساس استهلاك البيت",chip_lights_1:"ضو شغّال",chip_lights_n:"{n} أضواء شغّالة",chip_open_1:"في إشي مفتوح",chip_open_n:"{n} مفتوحين",chip_unlocked_1:"القفل مفتوح",chip_unlocked_n:"{n} أقفال مفتوحة",chip_climate_1:"المكيف {temp}",chip_climate_n:"{n} مكيفات شغّالة",chip_motion:"في حركة",chip_alert:"تنبيه",chip_t_lights:"الأضواء",chip_t_open:"الأبواب والشبابيك",chip_t_unlocked:"الأقفال",chip_t_climate:"المكيفات",chip_t_motion:"الحركة",chip_t_power:"الكهرباء",chip_t_alert:"التنبيهات",turn_all_off:"طفّي الكل",lock_all:"اقفل الكل",greet_morning:"صباح الخير",greet_afternoon:"نهارك سعيد",greet_evening:"مسا الخير",greeting_name:"الاسم بالترحيب",greeting_name_hint:"خليه فاضي عشان ياخذ اسم الشخص اللي فاتح",in_min:"بعد {n} دقيقة",in_hours:"بعد {n}",prayer:"مواعيد الصلاة",p_fajr:"الفجر",p_dhuhr:"الظهر",p_asr:"العصر",p_maghrib:"المغرب",p_isha:"العشاء",morning_summary:"ملخص الصبح",today_weather:"اليوم",overnight:"بالليل",night_doorbell_1:"الجرس دق مرة",night_doorbell_n:"الجرس دق {n} مرات",night_door_1:"{name} انفتح مرة",night_door_n:"{name} انفتح {n} مرات",night_robot:"الروبوت نظّف",night_quiet:"ليلة هادية، ما صار إشي.",night_unlocked:"{name} مفتوح هلأ",lets_go:"يلا نبلّش",health:"صحة النظام",h_offline:"أجهزة طافية",h_battery:"بطاريات ضعيفة",h_backup:"آخر backup",h_backup_missing:"ما في حساس backup. شغّل الـ backup التلقائي من Settings ← System ← Backups.",h_updates:"تحديثات مستنية",h_system:"جهاز HA",h_disk:"الديسك",h_cpu_temp:"حرارة المعالج",h_memory:"الذاكرة",h_tablets:"تابلتات الحيط",h_reload:"إعادة تحميل",h_charging:"عالشاحن",h_not_charging:"مش عالشاحن",h_all_good:"كله تمام",h_days_ago:"قبل {n} يوم",h_robot_parts:"قطع الروبوت لازم تتغير",h_telegram:"عشان توصلك تنبيهات على Telegram، انسخ ha-config/packages/smartnest_health.yaml لهالبيت.",activate_title:"تفعيل SmartNest",activate_text:"هالداشبورد بده كود تفعيل لهالبيت.",activate_id:"رقم التركيب",activate_key:"كود التفعيل",activate_btn:"فعّل",activate_bad:"هالكود مش لهالبيت.",activate_ask:"احكي مع الشخص اللي ركّبلك البيت الذكي عشان يفعّله.",activate_send:"ابعت هالرقم للي ركّبلك:",licensed_to:"مرخّص لـ",copy:"انسخ",copied:"انسخ ✓",plan_basic:"أساسي",plan_pro:"Pro",plan_premium:"Premium",plan_needed:"متوفر بباقة {plan}",plan_label:"الباقة",expires_on:"التجديد قبل",expires_soon:"اشتراك SmartNest بينتهي بعد {n} يوم. احكي مع اللي ركّبلك عشان تجدد.",expired_title:"انتهى الاشتراك",expired_text:"اطلب كود تفعيل جديد من اللي ركّبلك.",trial_label:"تجربة",via:"عن طريق",season:"شكل رمضان والعيد",season_auto:"تلقائي",season_ramadan:"رمضان",season_eid:"العيد",ramadan_kareem:"رمضان كريم",eid_mubarak:"عيد مبارك",timer_off_in:"طفّي بعد",timer_left:"بيطفي {in}",min_short:"{n} د",hour_short:"{n} س",ss_style:"شكل شاشة التوقف",ss_classic:"كلاسيك",ss_minimal:"بسيط",ss_analog:"عقارب",glass_style:"شكل الكروت",glass_classic:"زجاج مغبّش",glass_liquid:"زجاج سائل",guests_mode:"وضع الضيوف",guests_wifi:"واي فاي الضيوف",wifi_ssid:"اسم الشبكة",wifi_password:"كلمة السر",guests_welcome:"رسالة الترحيب",welcome_default:"أهلاً وسهلاً، البيت بيتكم",scan_wifi:"صوّر الكود عشان تتصل بالواي فاي",plan_3d:"عرض 3D",map_temp:"الحرارة",map_humidity:"الرطوبة",map_co2:"الهوا (CO₂)",widget_media:"الموسيقى والتلفزيون",widget_remote:"ريموت التلفزيون",nothing_playing:"ما في إشي شغّال",group_speakers:"شغّل بكل البيت",cinema_mode:"سينما",scene_cinema:"فرجة ممتعة",announce:"قولها عالسماعات",speakers:"سماعات الإعلانات",export_config:"صدّر الداشبورد",import_config:"استورد داشبورد",import_done:"تم الاستيراد. راجعه واضغط حفظ.",import_bad:"هالملف مش داشبورد SmartNest.",transfer:"النقل بين البيوت",wizard_title:"جهّز هالبيت",wizard_next:"التالي",wizard_finish:"خلصنا",wizard_pages:"شو الصفحات؟",wizard_house:"شو نوع البيت؟",house_flat:"شقة",house_villa:"فيلا",house_office:"مكتب",maintenance:"الصيانة",m_title:"المهمة",m_every:"كل (يوم)",m_done:"خلصت اليوم",m_due:"موعدها",m_in:"بعد {n} يوم",m_overdue:"متأخرة {n} يوم",faults_week:"انقطعت هالأسبوع",times:"{n} مرات",rate_service:"قيّم اللي ركّبلك",rate_thanks:"يسلمو! رح يوصل تقييمك للي ركّبلك.",rate_comment:"بدك تضيف إشي؟",tv_mode:"خط كبير (تلفزيون)",this_screen:"هالشاشة",opens_on:"بتفتح على",about:"حول",version:"الإصدار",none:"بدون",enabled:"شغّال",on:"شغّال",off:"مطفي",open:"مفتوح",closed:"مسكّر",opening:"عم يفتح",closing:"عم يسكّر",locked:"مقفول",unlocked:"مفتوح القفل",locking:"عم يقفل",unlocking:"عم يفتح القفل",jammed:"عالق",cleaning:"عم ينظّف",docked:"بالقاعدة",returning:"راجع للقاعدة",paused:"موقّف",idle:"خامل",error:"خطأ",unavailable:"غير متصل",unknown:"غير معروف",motion:"في حركة",clear:"ما في حركة",detected:"مكتشف",heat:"تدفئة",cool:"تبريد",auto:"تلقائي",dry:"تجفيف",fan_only:"مروحة",heat_cool:"تدفئة/تبريد",playing:"عم يشغّل",recording:"عم يسجّل",streaming:"مباشر",tap_to_run:"اضغط للتشغيل",start:"ابدأ",pause:"وقّف",return_home:"ارجع للقاعدة",locate:"وينه؟",lock:"اقفل",unlock:"افتح القفل",unlock_confirm:"تفتح قفل الباب؟",cover_open:"افتح",cover_close:"سكّر",stop:"وقّف",turn_on:"شغّل",turn_off:"طفّي",color:"اللون",white_temp:"الأبيض",more_colors:"ألوان أكثر",position:"الفتحة",tilt:"الميلان",brightness:"الإضاءة",target_temp:"مضبوط على",current_temp:"هلأ",battery:"البطارية",mode:"الوضع",last_changed:"آخر تغيير",just_now:"هلأ",min_ago:"قبل {n} دقيقة",hours_ago:"قبل {n} ساعة",history_24h:"آخر 24 ساعة",someone_at_door:"في حدا عالباب",dismiss:"تجاهل",open_door:"افتح الباب",tagline:"بيتك أذكى، حياتك أريح",assistant:"المساعد",as_hello:"اسألني عن أي إشي بالبيت، أو قلّي شو أعمل.",as_s1:"طفّي كل الأضواء",as_s2:"قديش الحرارة جوّا؟",as_s3:"سكّر الستائر",as_s4:"الباب مقفول؟",as_done:"تمام.",as_error:"ما زبطت معي، جرّب كمان مرة.",as_speak:"احكي",as_placeholder:"اكتب رسالة…",as_send:"ابعت",ai_looking:"عم بشوف…",habits_title:"اقتراحات من عاداتكم",habits_seen:"صارت بالإيد {n} أيام من آخر 14 يوم",habits_make:"اعملها لحالها",x_title:"شو المشكلة وكيف تنحل",x_zigbee:"Zigbee: غالباً البطارية خلصت، أو بعيد عن جهاز Zigbee موصول عالكهربا",x_mqtt:"MQTT: تأكد إنه الجسر (Zigbee2MQTT) شغّال",x_zwave:"Z-Wave: البطارية، أو اعمل re-interview للجهاز",x_cloud:"جهاز عالسحابة: تأكد من الكهربا والواي فاي، وبعدين اعمل reload للـ integration (ممكن بدها تسجيل دخول جديد)",x_wifi:"جهاز واي فاي: غالباً مفصول عن الكهربا أو بعيد عن الراوتر",x_generic:"تأكد من الكهربا والاتصال، وبعدين اعمل reload للـ integration تبعه",x_battery:"غيّر البطارية قريباً",x_ai:"اسأل الذكاء الصناعي",widget_consumers:"مين بيسحب كهربا هلأ",widget_water:"المي",template_water:"المي",now:"هلأ",others:"الباقي",standby:"ساحب وهو طافي",standby_hint:"طافي بس لسا بيسحب كهربا. قابس ذكي بيقطعه.",standby_total:"{w} رايحين على أجهزة طافية",water_usage:"عداد المي",water_tank:"الخزان",water_valve:"المحبس الرئيسي",water_leak:"في تسريب",water_no_leak:"ما في تسريب",water_close:"سكّر",water_open:"افتح",water_close_confirm:"اضغط كمان مرة لتسكّر",bill_budget:"ميزانية الشهر",bill_over:"رح تتعدّاها بـ {v}",bill_within:"ماشي منيح",solar_tip:"في {kw} شمس زيادة: وقت منيح للغسالة أو السخان",overload_title:"الحمل عالي: {now} من {max}",overload_hint:"طفّي إشي قبل ما يفصل القاطع:",power_limit:"حد الاستهلاك (واط)",power_limit_hint:"بيطلع تنبيه إذا البيت تعدّاه 20 ثانية",replay:"شو صار اليوم",play:"شغّل",all_floors:"كل الطوابق",travel:"وضع السفر",travel_on:"وضع السفر شغّال",travel_off:"بيطفّي: {x}",travel_off_pick:"شو يطفّي لما تطلعوا",travel_arm:"بيشغّل الإنذار",travel_sim:"أضواء بتشتغل وبتطفى بالمسا كأنه في حدا بالبيت",travel_sim_now:"هلأ شغّال: {x}",travel_report:"تقرير عالجوال كل يوم الساعة 8 بالمسا",travel_start:"طالعين مسافرين",travel_stop:"رجعنا",travel_bye:"رحلة سعيدة! البيت بإيد أمينة.",travel_welcome:"أهلين فيكم بالبيت!",alarm_triggered:"الإنذار ضرب",alarm_code:"رمز الإنذار",alarm_stop:"وقّف الإنذار",alarm_hide:"خبّي",call_police:"الشرطة",emergency:"أرقام الطوارئ",police_number:"رقم الشرطة",emergency_contacts:"مين نتصل من العيلة",emergency_hint:"كل واحد بسطر: الاسم، الرقم. بيطلعوا لما يضرب الإنذار.",chip_t_package:"الطرود",chip_package:"وصل طرد",wx_alert_rain:"رح تشتي",wx_alert_wind:"في هوا قوي أو غبار جاي",wx_alert_open:"لسا مفتوح: {x}",wx_close_covers:"سكّر الستائر",widget_wake:"منبّه بالضو",wake_minutes:"شروق {n} دقيقة",wake_add:"زيد منبّه",wake_hint:"الضو بيضوي شوي شوي قبل وقت المنبّه، متل الشمس.",widget_chores:"مهام الولاد",chores_kids:"الولاد",chores_tasks:"المهام",chores_kid_name:"الاسم",chores_task_name:"المهمة (مثلاً رتّب تختك)",chores_goal:"كم نجمة للجائزة (بالأسبوع)",chores_reward:"الجائزة",chores_reward_hint:"بوظة يوم الجمعة",chores_won:"ربحت الجائزة!",widget_air:"جودة الهوا",air_co2:"CO₂",air_pm25:"الغبار",air_voc:"روائح وغازات",air_humidity:"الرطوبة",air_level_good:"الهوا نضيف",air_level_ok:"الهوا مش أحسن إشي",air_level_bad:"الهوا بدو انتباه",air_good:"ما في إشي تعمله.",air_tip_co2:"افتح شباك 10 دقايق.",air_tip_pm:"سكّر الشبابيك وشغّل منقّي الهوا.",air_tip_voc:"هوّي الغرفة: طبخ أو دهان أو مواد تنظيف.",air_tip_dry:"ناشف كثير: مرطّب هوا بيساعد.",air_tip_humid:"رطب كثير: شغّل المكيف على تجفيف أو هوّي.",fx_title:"مشاهد متحركة",fx_candle:"شمعة",fx_sunset:"غروب",fx_party:"حفلة",fx_ramadan:"رمضان",fx_aurora:"شفق",fx_stop:"وقّف",fx_started:"المشهد شغّال",page_person:"صفحة مين",page_person_all:"للكل",page_person_hint:"صورته بتطلع بالبار، وضغطة عليها بتفتح صفحته.",support_title:"في مشكلة؟ احكي مع المركّب",support_hint:"بتبعت واتساب لـ {name} مع حالة البيت، عشان يقدر يساعد أسرع.",support_placeholder:"شو صاير؟ (مثلاً ضو المطبخ ما بيرد)",support_default:"مرحبا، بدي مساعدة بالبيت الذكي.",support_send:"ابعت عالواتساب",installer:"المركّب",installer_name:"اسم المركّب",installer_phone:"رقم الواتساب",installer_phone_hint:'مع مفتاح الدولة، بدون + أو فراغات. الزبون بيصيرله زر "في مشكلة؟".',report:"تقرير شهري",report_title:"{name} · التقرير الشهري",report_devices:"الأجهزة",report_offline:"{n} فاصلين هلأ",report_faults:"انقطعت هالشهر",report_autos:"{n} شغّالة",presets:"سمات جاهزة",preset_gold:"ذهبي",preset_sea:"بحري",preset_desert:"صحراوي",preset_night:"ليلي",preset_rose:"وردي",preset_olive:"زيتوني",history:"النسخ السابقة",history_hint:"كل حفظ بيخلّي النسخة اللي قبله. والرجوع كمان بتقدر تتراجع عنه.",history_empty:"لسا ما في نسخ. بتطلع بعد أول حفظ.",history_size:"{p} صفحات · {w} عنصر",history_restore:"ارجع لهاي",history_confirm:"تبدّل الداشبورد الحالي بهاي النسخة على كل الشاشات؟",history_done:"رجعت",template_car:"السيارة",template_garden:"الجنينة والمسبح",template_pets:"الحيوانات",ai_scene_title:"جو بكلمة",ai_scene_hint:"مثلاً هادي لفيلم",ai_do_it:"اعملها",ai_auto_hint:"احكيها: كل ليلة الساعة 11 طفّي الصالة",ai_auto_fail:"ما قدرت أفهمها كأتمتة. قول إيمتى وشو بدك يصير.",ai_cam_btn:"شو صار برا اليوم؟",ai_cam_quiet:"يوم هادي: ما انشاف إشي.",ai_bill_btn:"ليش الفاتورة هيك؟",voice_hands_free:"صوت بدون لمس",voice_hint:'قول كلمة التنبيه (مثلاً "Okay Nabu") واحكي. بدها Assist مع محرّك كلمة تنبيه، والداشبورد على https.',voice_https:"الميكروفون بدو الداشبورد على https",voice_mic:"ما في إذن للميكروفون",voice_pipeline:"Assist مش جاهز (محرّك كلمة التنبيه؟)",voice_ready:"عم بستنى كلمة التنبيه",voice_listening:"عم بسمعك…",helpers:"مساعدين البيت",h_appliances:"الغسالة خلصت",h_appliances_hint:"اختار حساس استهلاك الغسالة أو النشافة أو الجلاية. لما تخلص، بيطلع على كل الشاشات وبينحكى عالسماعات.",h_night_path:"مسار الليل",h_night_path_hint:"اختار حساسات حركة وأضواء: بالليل الحركة بتضوّيهم خفيف 3 دقايق.",h_arrival:"راجعين عالبيت",h_arrival_hint:"اختار مكيفات وأضواء: لما حدا راجع وصار قريب هالقد، المكيف بيشتغل (والأضواء إذا ليل).",h_arrival_missing:"بدها integration الـ Proximity بـ HA (الإعدادات ← Integrations ← Proximity).",h_arrival_km:"ابدأ لما يكون أقرب من (كم)",h_outage:"انقطاع الكهربا",h_outage_hint:"اختار حساس الشبكة (binary، أو جهد الشبكة)، وبعدين شو يطفّي لما تنقطع.",h_outage_sensor:"حساس الشبكة",from:"من",to:"لـ",chip_outage:"الكهربا مقطوعة",chip_running:"{name} شغّالة",chip_arriving:"{name} بيوصل بعد ~{n} د",widget_boiler:"السخان",boiler_ready_in:"عم يسخّن · جاهز بعد {n} دقيقة",boiler_off_in:"سخن · بيطفى بعد {n} دقيقة",boiler_hot:"شغّال",boiler_next:"مي سخنة الساعة {at}",boiler_for:"{n} دقيقة",boiler_plan:"بيبلّش قبل بـ {n} دقيقة",boiler_want:"بدي مي سخنة الساعة",widget_irrigation:"ري الجنينة",irr_running:"عم يرش هلأ",irr_next:"الساعة {at} لمدة {n} دقيقة",irr_skip_rain:"وقّف إذا رح تشتي",irr_skipped:"{date}: ما رشّينا، رح تشتي",irr_watered:"{date}: رشّينا",irr_now:"رش 10 دقايق هلأ",minutes:"دقيقة",codes_title:"رموز الضيوف",codes_new:"رمز جديد",codes_who:"لمين (مثلاً عاملة التنظيف)",codes_from:"من إيمتى",codes_4h:"4 ساعات",codes_day:"يوم",codes_3days:"3 أيام",codes_week:"أسبوع",codes_auto:"الرمز (فاضي = 6 أرقام عشوائية)",codes_make:"اعمل الرمز",codes_live:"شغّال",codes_later:"بيبلّش بعدين",codes_share:"ابعت",codes_full:"كل أماكن الضيوف بالقفل مليانة",codes_need_zwave:"رموز الضيوف بتنكتب على أقفال Z-Wave بلوحة أرقام (Z-Wave JS).",codes_message:"مرحبا {name} 👋\nرمزك لـ {lock}: {code}\nمن {from}\nلحد {until}",widget_timeline:"تسجيلات الكاميرا",tl_pick:"{n} أحداث: اضغط على نقطة لتشوفها",tl_none:"ما انشاف إشي",fr_person:"شخص",fr_car:"سيارة",fr_dog:"كلب",fr_cat:"قطة",fr_package:"طرد",widget_internet:"إنترنت الولاد",net_on:"الإنترنت شغّال",net_off:"الإنترنت موقّف",net_paused_for:"موقّف · بيرجع بعد {n} دقيقة",net_stop:"وقّف",net_allow:"رجّعه",net_hour:"ساعة بلا نت",net_bedtime:"وقت النوم",net_wake:"الصبح",net_no_router:"ما لقيت مفاتيح من الراوتر. ضيف integration الراوتر (UniFi، FRITZ!Box، Omada، Deco…).",net_ask_installer:"اطلب من المركّب يجهّزه.",face_hello:"أهلين {name}",widget_board:"لوح العيلة",board_write:"اكتب",board_draw:"ارسم",board_stick:"علّقها",board_placeholder:"راجع الساعة 6، الأكل بالثلاجة…",board_empty:"اللوح فاضي. اكتب ملاحظة أو ارسم إشي.",widget_verse:"آية اليوم",widget_radar:"رادار المطر",widget_commute:"الطريق",commute_missing:"ضيف integration الـ Waze Travel Time (للشغل، للمدرسة…) وبتطلع الطرق هون.",widget_parcels:"الطرود",parcels_missing:"ضيف integration الـ 17TRACK عشان تتابع طرودك هون.",parcels_none:"ما في طرود بالطريق",photos_from_phone:"صور من الجوال",photos_scan:"امسح بكاميرا الجوال واختار صور. الرابط شغّال {n} دقيقة.",photos_wifi:"الجوال لازم يكون على واي فاي البيت.",big_text:"خط كبير",tour_again:"فرجيني الداشبورد",tour_skip:"تخطّي",tour_next:"التالي",tour_done:"فهمت",tour_tabs:"هدول صفحاتك. اضغط على وحدة، أو اسحب يمين وشمال.",tour_chips:"البيت بنظرة: شو شغّال وشو مفتوح. اضغط على وحدة لتشوف أو تصلّح.",tour_plan:"مخطط بيتك. اضغط على جهاز لتتحكم فيه، أو على غرفة لتشوف كل اللي فيها.",tour_modes:"ضغطة وحدة للبيت كله: طالع، راجع، نوم، سهرة.",tour_tile:"اضغط لتشغّل أو تطفّي. اضغط مطوّل لأكثر (الإضاءة، اللون، المؤقت).",tour_assistant:"هون بتسأل البيت أو بتقلّه شو يعمل.",tour_logo:"إعدادات هالشاشة والمساعدة ورا اللوجو.",tou:"ساعات الكهربا الرخيصة",tou_cheap:"رخيصة",tou_peak:"ذروة",tou_later:"شغّله الساعة {at} (أرخص)",tou_scheduled:"رح يشتغل الساعة {at}",chip_peak:"ساعة ذروة ⚡",chip_cheap:"الكهربا رخيصة هلأ",challenge_won:"وفّرتوا {n}% عن الشهر الماضي",challenge_hint:"تحدّي العيلة: خلّوها أقل من الشهر الماضي",refill_phone:"واتساب المورّد (للتعبئة)",refill_hint:'لما يقل المستوى، بيطلع زر "اطلب تعبئة".',refill_order:"اطلب تعبئة",refill_message:"مرحبا، بدنا تعبئة {what} لـ {home}. شكراً!",heartbeat_url:"رابط النبض",heartbeat_hint:"من صفحة التراخيص تبعك. البيت بيبعتلك مرتين باليوم: شغّال، كم جهاز فاصل، وأي نسخة.",bat_title:"بطاريات قرّبت تخلص",bat_days:"بعد ~{n} يوم",bat_year:"أكثر من سنة",bat_none:"ما في بطارية عم تنزل بسرعة",war_title:"الكفالات",war_until:"لحد {date}",war_over:"خلصت",war_what:"الجهاز (مثلاً مكيف الصالة)",war_months:"{n} شهر",war_invoice:"صورة الفاتورة",showroom:"وضع المعرض",showroom_hint:"هالشاشة بتعرض بيت وهمي بدل هالبيت، للمحل. بتطفيه من هون.",style:"الستايل",style_classic:"الكلاسيكي",style_pro:"SmartNest 2.0",style_hint:"2.0: زجاج أعمق وضو بيلحق إصبعك، لون أضواء البيت ورا كل إشي، حبيبات خفيفة، وأيقونات بلونين.",material_none:"سادة",material_marble:"رخام",material_wood:"خشب",material_sand:"رمل",material_olive:"زيتون",night_midnight:"منتصف الليل بالليل (أسود كامل، بس الشغّال بيضوي)",theme_midnight:"منتصف الليل",widget_hero:"البيت بنظرة",hero_ok:"كل إشي تمام",hero_all_quiet:"البيت هادي",hero_inside:"جوّا",hero_home:"بالبيت",widget_stack:"عناصر ذكية فوق بعض",widget_room:"كرت غرفة",room_photo:"صورة الغرفة",template_bento:"رئيسية Bento",act_running:"شغّالة",act_cleaning:"عم ينضّف",act_heating:"عم يسخّن المي",act_off_in:"بيطفى بعد {n} د",wallpaper:"خلفية",wallpaper_dim:"تعتيم",accent_from_wallpaper:"خذ اللون من الصورة",nav_style:"الصفحات",nav_tabs:"تبويبات بالبار",nav_dock:"Dock عائم",search_placeholder:"دوّر على جهاز، صفحة، أو وضع…",search_page:"صفحة",search_open:"افتح",search_none:"ما لقيت إشي",sound_motion:"الصوت والحركة",ui_sounds:"صوت خفيف لما الأشياء تشتغل وتطفى",bell_tone:"نغمة الجرس",bell_chime:"كلاسيكي",bell_dingdong:"دينغ دونغ",bell_melody:"نغمة",motion_full:"كاملة",motion_light:"خفيفة",motion_off:"بدون",motion_hint:"الخفيفة بتخلّي ردة الفعل وبتوقف الحركة اللي بتتكرر (الضو الماشي، الكروت اللي بتتنفس). بدون بتوقف كمان حركة الصفحات.",plan_model:"مجسّم البيت 3D",plan_lens:"عدسة مكبّرة",high_contrast:"تباين أعلى (نص أوضح، كروت مصمتة)",welcome_home:"أهلين {name}",window_camera:"شباك: كاميرا برا كخلفية",music_backdrop:"غلاف الأغنية خلفية وقت الموسيقى",welcome_moment:'لحظة "أهلين" لما حدا يوصل',page_moods:"كل صفحة إلها جو لون",season_skin:"أجواء الفصول (ثلج، ورق شجر، ورد)",monogram:"شعار العيلة",monogram_hint:"ختم ذهبي بحروف العيلة بدل اللوجو بالبار.",ab_title:"جهّز الداشبورد لحاله",ab_hint:"شفت أجهزة البيت. هاي الصفحات اللي بقدر أعملها، وكل وحدة معبّاة جاهزة. شيل الإشارة عن اللي ما بدك إياه.",ab_per_area:"الغرف",ab_one_rooms:"صفحة وحدة لكل الغرف",ab_area_pages:"صفحة لكل غرفة",ab_devices:"{n} جهاز",ab_home:"المخطط والأوضاع",ab_mode:"الصفحات الموجودة",ab_replace:"بدّلها (المخطط بيضل)",ab_add:"خلّيها وزيد",ab_go:"جهّز {n} صفحات",ab_done:"جهزت {n} صفحات. اضغط حفظ عشان يضلّوا.",template_media:"الموسيقى والتلفزيون",fast_mode:"وضع سريع",fast_auto:"تلقائي",fast_hint:"كروت مصمتة بدل التغبيش، بدون حركات بالخلفية، وتحديث أقل. الأحسن لتابلت الحيط.",fast_hint_weak:"هالتابلت ضعيف شوي، فالتلقائي بيشغّل الوضع السريع.",revoked_title:"الداشبورد موقوف",revoked_text:"اللي ركّبلك وقّف الترخيص. تواصل معه ليرجّعه.",lic_check:"تحقّق هلأ",lic_check_ok:"محدّث ✓",lic_check_none:"ما قدرت أوصل للمركّب، جرّب كمان شوي",boiler_pick:"جهاز السخان",boiler_tap_pick:"اختار السخان من ✏️ ← إعدادات العنصر",air_purifier:"منقّي الهوا / مرطّب",air_sensors:"الحساسات",auto_all:"إذا ما اخترت: بيلاقيهم لحاله.",widget_ac:"المكيّف",widget_scenes:"المشاهد",widget_sensor:"حساس مع رسم",widget_batteries:"البطاريات",widget_lights:"الأضواء",widget_covers:"الستاير",widget_prayer:"أوقات الصلاة",sensor_pick:"اختار الحساس من إعدادات العنصر",bat_low_n:"{n} ضعيفة",bat_all_good:"كلها منيحة",lights_on_n:"{n} من {of} شغّالين",covers_open_n:"{n} من {of} مفتوحين",all_off:"طفّي الكل",all_on:"شغّل الكل",prayer_fajr:"الفجر",prayer_sunrise:"الشروق",prayer_dhuhr:"الظهر",prayer_asr:"العصر",prayer_maghrib:"المغرب",prayer_isha:"العشاء",prayer_next:"الصلاة الجاية",prayer_in_hm:"بعد {h} ساعة و{m} دقيقة",prayer_in_m:"بعد {m} دقيقة",prayer_setup:'ضيف تكامل "Islamic Prayer Times" بـ Home Assistant والأوقات بتطلع هون.',area_all:"كل البيت",widget_title:"العنوان",bat_low_at:"ضعيفة تحت %",picker_more:"اعرض كمان {n}",picker_show_extra:"اعرض كمان {n} عناصر تقنية",irr_pick:"اختار المحبس من ✏️ ← إعدادات العنصر",hidden_devices:"أجهزة مخفية",hidden_hint:"مخفية من كل الداشبورد: الصفحات، البحث، شريط الحالة، والصفحات اللي بتنعمل لحالها. بتضل شغّالة بـ Home Assistant.",hidden_add:"احجب جهاز",hidden_show:"رجّعه",hidden_this:"احجبه من الداشبورد",hidden_done:"انحجب. بترجّعه من الإعدادات ← أجهزة مخفية",link_lost:"عم يرجع يتصل بالبيت…",link_back:"رجع الاتصال",radial_warm:"دافي",radial_cool:"بارد",radial_off_in:"{n} دقيقة",radial_more:"المزيد",radial_timer_set:"بيطفي بعد {n} دقيقة",undo:"رجوع",undo_n:"تغيّروا {n} أجهزة",plan_north:"وين الشمال (بالدرجات)",plan_north_hint:"0 إذا الشمال فوق بالمخطط، 90 إذا على اليمين. ضو الشمس على المخطط بيمشي حسبه.",simple_mode:"وضع مبسّط",simple_hint:"للكبار: خط كبير والصفحات والكبسات بس على هالشاشة.",night_red:"أحمر بالليل",night_red_hint:"بعد العتمة الشاشة بتصير دافية وخافتة: مريحة للعين بغرفة النوم.",occ_ramadan:"رمضان كريم",occ_eid_fitr:"عيد فطر مبارك",occ_eid_adha:"عيد أضحى مبارك",occ_christmas:"ميلاد مجيد",occ_new_year:"سنة سعيدة",font:"الخط",font_hint:"Rubik جوّا SmartNest؛ الباقي بينزل من Google Fonts أول مرة (التابلت بدو إنترنت مرة وحدة).",icons_style:"الأيقونات",icons_filled:"معبّاة",icons_line:"خط",accent_day:"اللون بيمشي مع النهار (ذهبي، تركوازي، مرجاني، بنفسجي)",active_glow:"ضو بيلف حوالين اللي شغّال",aurora:"شفق ورا الكروت (بدون خلفية)",occasions:"زينة رمضان والأعياد والميلاد ورأس السنة",burn_in:"حماية شاشات الحيط من الحرق",ss_open:"{n} مفتوح",ss_unlocked:"{n} مش مقفول",widget_folder:"مجلد",folder_on:"{n}/{of} شغّال",folder_empty:"ضيف أجهزة من الإعدادات",scene_keep:"خلّيه هيك (احفظه كمشهد)",scene_name:"اسم المشهد",scene_saved:'انحفظ "{name}" كمشهد',acw_title:"أسبوع المكيّف",acw_hint:"اسحب على الساعات اللي بدك يشتغل فيها. Home Assistant بيشغّله أول كل فترة وبيطفيه آخرها، حتى لو الداشبورد مسكّر.",notifications:"الإشعارات",notif_ha:"من Home Assistant",notif_day:"آخر 24 ساعة",notif_quiet:"يوم هادي: ولا إشي انفتح",door_mini:"خلّيه بالزاوية",cam_motion:"في حركة",ss_lights_off:"طفّيهم",ss_lock:"اقفلهم",nudge_window_ac:"{win} مفتوح و{ac} شغّال",nudge_ac_off:"طفّي المكيّف",nudge_away_lights:"كلكم برا و{n} أضواء شغّالة",nudge_lights_off:"طفّيهم",nudge_idle_light:"{light} شغّال من نص ساعة وما في حدا بـ{room}",nudge_turn_off:"طفّيه",nudge_tv:"{tv} شغّال وما حدا بالبيت",nudge_later:"مش هلأ",brand_logo:"اللوجو تبعك (بدل SmartNest)",brand_hint:"بيبين بالشريط وعلى شاشة التوقف. من صفحة التراخيص بيوصل لكل البيوت لحاله.",design_arrived:"اللي ركّبلك بعتلك تصميم جديد: {name}",design_new:"داشبورد جديد",design_apply:"طبّقه",design_confirm:"تبدّل صفحات الداشبورد بالتصميم الجديد؟ المخطط وأسماء الأجهزة والإعدادات بيضلوا. (القديم بيضل محفوظ بالإعدادات ← السجل.)",design_applied:"التصميم الجديد صار جاهز",design_applied_dropped:"التصميم صار جاهز ({n} كروت لأجهزة مش موجودة هون انشالت)",phone_qr:"افتحه على الموبايل",phone_qr_hint:"امسحه بكاميرا الموبايل. الأحسن بتطبيق Home Assistant (App Store / Google Play): بتسجّل مرة و SmartNest بيطلع بالقائمة.",ab_kind:"نوع المكان",ab_apartment:"شقة",ab_villa:"فيلا",ab_office:"مكتب",plan_draw:"ارسم المخطط",plan_clean:"نظّف المخطط",plan_photo_back:"رجّع الصورة",plan_mode_room:"غرف",plan_mode_door:"أبواب",plan_room_n:"غرفة {n}",plan_kind_wood:"خشب",plan_kind_tile:"بلاط",plan_kind_plain:"عادي",plan_kind_outdoor:"برّا",plan_draw_hint:"اسحب على الشبكة لترسم غرفة. الغرف بتلزق بحيطان بعض.",plan_draw_more:"ارسم الغرفة الجاية جنبها، أو اكبس على غرفة لتسمّيها أو تحركها أو تكبّرها.",plan_door_hint:"اكبس على حيط لتحط باب. اكبس على الباب لتربطه بحساس أو قفل أو موتور، أو لتشيله.",plan_clean_need_rooms:"حدّد الغرف أول (الغرف، أو إضافة تلقائية)",plan_mode_wall:"فتح حيط",plan_mode_furn:"أغراض",plan_wall_hint:"اكبس على حيط لتفتحه (صالون مفتوح على المطبخ). اكبس على الفتحة الملوّنة لترجّع الحيط.",plan_turn:"لفّ",plan_copy:"نسخة",furn_sofa:"كنباية",furn_sofa_l:"كنباية زاوية",furn_armchair:"كرسي قعدة",furn_coffee:"طاولة وسط",furn_tv:"تلفزيون",furn_rug:"سجادة",furn_dining:"طاولة سفرة",furn_round_table:"طاولة مدورة",furn_bed2:"تخت مزدوج",furn_bed1:"تخت مفرد",furn_wardrobe:"خزانة",furn_desk:"مكتب",furn_toilet:"بيت مي",furn_basin:"مغسلة",furn_bath:"بانيو",furn_shower:"دوش",furn_counter:"رخامة مطبخ",furn_ksink:"مجلى",furn_stove:"غاز",furn_fridge:"تلاجة",furn_washer:"غسالة",furn_plant:"زريعة",furn_stairs:"درج",furn_car:"سيارة",plan_mode_line:"حيطان",plan_line_hint:"اسحب لترسم حيط. بيلزق بالزوايا وأطراف الحيطان، وبيصير مستقيم إذا قريب من أفقي أو عمودي. اكبس على حيط لتشيله.",plan_line_sel:"هاد الحيط",plan_room_walls:"حيطانها",plan_room_nowall:"بدون حيطان (منطقة)",plan_shape_rect:"مستطيل",plan_shape_poly:"نقاط",plan_poly_hint:"اكبس على زوايا الغرفة وحدة ورا الثانية (أي شكل). ارجع اكبس على أول نقطة لتسكّرها.",plan_poly_drawing:"الزاوية الجاية… (أول نقطة بتسكّر الغرفة)",plan_poly_undo:"آخر نقطة",plan_poly_close:"سكّر الغرفة",plan_point_remove:"شيل النقطة",plan_opening_door:"باب",plan_opening_double:"باب مزدوج",plan_opening_slide:"باب جرّار",plan_opening_window:"شباك",plan_opening_wide_window:"شباك عريض",furn_nightstand:"كومودينا",furn_dresser:"تسريحة",furn_bookshelf:"مكتبة",furn_chair:"كرسي",furn_crib:"تخت بيبي",furn_bunk:"تخت طابقين",furn_island:"جزيرة مطبخ",furn_dishwasher:"جلاية",furn_oven:"فرن",furn_bidet:"شطّاف",furn_basin2:"مغسلة مزدوجة",furn_jacuzzi:"جاكوزي",furn_dryer:"نشافة",furn_ac:"مكيّف",furn_boiler:"سخان",furn_fireplace:"صوبة/موقدة",furn_piano:"بيانو",furn_tree:"شجرة",furn_pool:"بركة سباحة",furn_bbq:"منقل",furn_outdoor:"طاولة جنينة",furn_shoes:"جزامة",furn_mirror:"مراية",plan_mode_window:"شبابيك",plan_window_hint:"اكبس على حيط لتحط شباك. اكبس على الشباك لتربطه بحساسه أو موتوره، فبيبين على المخطط إذا مفتوح.",plan_link_none:"مش مربوط بجهاز",move_room:"الغرفة (الصفحة)",move_room_hint:"اختار الغرفة والكرت بينتقل لهناك: لآخر قسمها بنفس الصفحة، أو لصفحة ثانية. والجهاز بينتقل لهالغرفة بـ Home Assistant كمان.",moved_to:"انتقل لـ {page}",move_this_page:"غرف بهالصفحة",move_other_page:"صفحة ثانية",live:"مباشر",camera_mode:"الصورة",camera_auto:"حسب البيت",camera_live:"مباشر دايماً",camera_still:"صورة",camera_mode_hint:"المباشر بيشتغل لما الكرت ظاهر. لحد 4 كاميرات مباشر مع بعض؛ الباقي بيتحدّث كل ثانيتين وبيصير مباشر لما وحدة توقف.",cameras_live:"الكاميرات مباشر",fast_auto_on:"الشاشة كانت تقطّع، فشغّلت الوضع السريع (بتغيّره من حول)",rooms_on_n:"{n} شغّال",rooms_devices_n:"{n} أجهزة",slide_unlock:"اسحب لتفتح",slide_open_door:"اسحب لتفتح الباب",doorbell_speaker:"سمّاعة عند الباب (ردود صوتية)",reply_coming:"جاي هلأ",reply_leave:"حطّه عند الباب لو سمحت",reply_wait:"دقيقة لو سمحت",reply_who:"مين؟",reply_sent:"انقال عند الباب",circadian:"ضو بيمشي مع الشمس",circadian_hint:"أبيض بارد بالنهار، دافي عالمغرب، وأدفى بالليل، لما يكونوا شغّالين أبيض. إذا غيّرت وحدة بإيدك بتضل متل ما حطيتها لحد ما تنطفي.",nudge_door_open:"{door} مفتوح من {n} دقيقة",nudge_look:"شوف",nudge_fridge_warm:"{name} صار {v}° — التلاجة عم تسخن",nudge_freezer_warm:"{name} صار {v}° — الفريزر عم يسخن",nudge_standby:"{name} بيسحب {w} واط وهو ستاند باي",air_score:"مؤشر جودة الهوا",page_users:"مين بيشوف هالصفحة",page_users_all:"الكل. اختار أشخاص لتبين إلهم بس (حساب الضيف بيشوف صفحاته بس).",page_users_some:"بس الأشخاص اللي اخترتهم (والمسؤول).",quick_scenes:"شريط مشاهد سريع تحت بكل الصفحات"},he:{edit:"עריכה",done:"סיום",save:"שמירה",cancel:"ביטול",delete:"מחיקה",add:"הוספה",close:"סגירה",back:"חזרה",settings:"הגדרות",search:"חיפוש",loading:"טוען…",saving:"שומר…",saved:"נשמר",save_failed:"השמירה נכשלה. בדקו את החיבור ונסו שוב.",upload_failed:"ההעלאה נכשלה. השתמשו בקובץ PNG, JPG או WebP עד 15MB.",discard_changes:"לבטל את השינויים?",delete_confirm:"למחוק?",untitled:"ללא שם",add_page:"עמוד חדש",page_settings:"הגדרות עמוד",page_title:"שם העמוד",page_icon:"סמל",move_earlier:"הזז קדימה",move_later:"הזז אחורה",choose_template:"התחל מ",template_rooms:"חדרים",other_devices:"אחר",autofill_rooms:"מלא חדרים",autofill_done:"מוקמו {n} מכשירים",detect_rooms:"זהה חדרים",auto_add:"הוספה אוטומטית",auto_need_areas:"שייך קודם את המכשירים לחדרים ב-Home Assistant (הגדרות ← אזורים)",auto_nothing:"אין מכשירים חדשים למקם",which_room:"איזה חדר זה?",skip_room:"דלג",detecting:"קורא את התוכנית…",detect_none:"לא נמצאו חדרים חדשים. שרטט אותם ידנית.",detect_done:"נמצאו {n} חדרים. הקש על חדר כדי לתת לו שם",detect_done_placed:"נמצאו {n} חדרים ומוקמו {m} מכשירים",detect_failed:"לא ניתן לקרוא את התוכנית",room_area:"חדר ב-Home Assistant",template_blank:"ריק",template_home:"בית",template_power:"חשמל",template_security:"אבטחה",template_doorbell:"פעמון",template_climate:"מיזוג",add_widget:"הוספת רכיב",widget_settings:"הגדרות רכיב",widget_floorplan:"תוכנית קומה",widget_tile:"מכשיר",widget_camera:"מצלמה",camera_wall:"כל המצלמות",widget_heading:"כותרת",widget_clock:"שעון",widget_modes:"מצבים",mode_away:"יוצאים",mode_home:"חוזרים",mode_sleep:"שינה",mode_evening:"ערב",scene_away:"נסיעה טובה",scene_home:"ברוכים השבים",scene_sleep:"לילה טוב",scene_evening:"ערב נעים",scene_locking:"נועלים את הבית",modes_missing:"סקריפטי המצבים לא נמצאו. העתיקו את ha-config/packages/smartnest_modes.yaml ל-Home Assistant.",widget_vacuum:"שואב רובוטי",widget_visitors:"מבקרים",widget_energy:"אנרגיה",template_robot:"רובוט",clean_rooms_1:"נקה חדר אחד",clean_rooms_n:"נקה {n} חדרים",clean_all:"נקה את כל הבית",suction:"יניקה",mop:"שטיפה",passes:"מעברים",parts:"חלקים",main_brush:"מברשת ראשית",side_brush:"מברשת צד",filter:"מסנן",sensors_part:"חיישנים",hours_left:"נותרו {n} שע׳",cleaned_area:"נוקה",clean_time:"זמן",empty_bin:"ריקון מיכל",no_rooms:"החדרים יופיעו כאן אחרי שהרובוט ימפה את הבית.",fan_quiet:"שקט",fan_balanced:"רגיל",fan_standard:"רגיל",fan_turbo:"טורבו",fan_max:"מקסימום",fan_max_plus:"מקסימום+",fan_gentle:"עדין",fan_off:"כבוי",mop_mild:"קל",mop_low:"קל",mop_moderate:"בינוני",mop_medium:"בינוני",mop_intense:"חזק",mop_high:"חזק",mop_off:"כבוי",yesterday:"אתמול",today:"היום",no_visitors:"עדיין אף אחד לא צלצל.",keep_days:"שמירת תמונות מבקרים (ימים)",e_solar:"סולארי",e_grid:"רשת",e_battery:"סוללה",e_home:"בית",e_solar_entity:"ייצור סולארי",e_grid_entity:"רשת (+ = משיכה מהרשת)",e_battery_entity:"סוללה (+ = בטעינה)",e_soc_entity:"רמת סוללה",e_home_entity:"צריכת הבית (אופציונלי)",e_flip:"הפוך כיוון",widget_energy_stats:"חשבון חשמל",widget_panic:"חירום",widget_check:"בדיקה לפני השינה",bill_title:"החשמל החודש",bill_projected:"חשבון צפוי",bill_used:"נצרך עד עכשיו",bill_vs_last:"לעומת החודש שעבר",bill_solar:"הסולארי חסך",bill_top:"הצרכנים הגדולים",e_total_energy:"צריכה כוללת (kWh)",e_solar_energy:"ייצור סולארי (kWh)",tariff:"מחיר לקוט״ש",currency:"מטבע",panic_hold:"החזיקו 2 שניות",panic_sent:"מצב חירום הופעל",panic_missing:"סקריפט החירום לא נמצא. העתיקו את ha-config/packages/smartnest_safety.yaml ל-Home Assistant.",check_ok:"הכל מוכן ללילה",check_n:"{n} דברים לבדוק",check_locks:"הדלתות נעולות",check_open:"דלתות וחלונות סגורים",check_lights:"האורות כבויים",check_alarm:"האזעקה פעילה",check_appliances:"מכשירים מסוכנים כבויים",check_fix:"תקן",check_fix_all:"תקן כל מה שאפשר",arm_home:"בבית",arm_away:"בחוץ",arm_night:"לילה",disarm:"נטרל",enter_code:"הזינו קוד",disarmed:"כבויה",armed_home:"דרוכה (בבית)",armed_away:"דרוכה (בחוץ)",armed_night:"דרוכה (לילה)",armed_vacation:"דרוכה (חופשה)",arming:"נדרכת",disarming:"מנוטרלת",pending:"ממתינה",triggered:"אזעקה!",widget_family:"משפחה",at_home:"בבית",away_l:"בחוץ",widget_todo:"רשימה",add_placeholder:"הוסיפו פריט…",todo_empty:"אין כלום",widget_calendar:"לוח שנה",no_events:"אין אירועים קרובים",all_day:"כל היום",tomorrow:"מחר",widget_forecast:"השבוע",widget_countdown:"ספירה לאחור",days_left:"{n} ימים",today_event:"היום!",next_ramadan:"רמדאן",next_eid:"עיד אל-פיטר",next_adha:"עיד אל-אדחא",add_event:"הוסף תאריך",event_title:"שם",event_date:"תאריך",send_message:"שלח הודעה למסך",message_placeholder:"ארוחת ערב מוכנה!",send:"שלח",message_from:"מאת {name}",got_it:"הבנתי",kids_mode:"מצב ילדים",kids_page:"עמוד ילדים",widget_gauge:"מד",widget_gate:"שער",widget_frigate:"זיהויים אחרונים",widget_schedule:"לוחות זמנים",gauge_low:"עומד להיגמר",gate_hold:"החזיקו לפתיחה",gate_hold_close:"החזיקו לסגירה",history_lock:"פעילות אחרונה",by_user:"על ידי {name}",frigate_missing:"Frigate לא מותקן. הוסיפו את אינטגרציית Frigate (HACS) כדי לראות כאן אנשים, רכבים ופנים.",person_l:"אדם",car_l:"רכב",dog_l:"כלב",cat_l:"חתול",package_l:"חבילה",automations:"אוטומציות",new_automation:"אוטומציה חדשה",when:"כאשר…",then:"אז…",only_if:"רק בין",trig_time:"בשעה",trig_sun:"זריחה / שקיעה",trig_state:"מכשיר משתנה",trig_mode:"מצב הבית הופך ל",sunrise:"זריחה",sunset:"שקיעה",offset_min:"הפרש (דק׳)",becomes:"הופך ל",act_on:"הדלק",act_off:"כבה",act_mode:"קבע מצב בית",act_message:"הצג הודעה",days:"ימים",auto_name:"שם",auto_saved:"האוטומציה נשמרה",auto_empty:"עדיין אין אוטומציות של SmartNest.",every_day:"כל יום",heading_text:"טקסט",empty_page:"העמוד הזה ריק.",empty_page_admin:"הקישו עריכה ואז הוספת רכיב.",entity:"מכשיר",choose_entity:"בחרו מכשיר",no_entities:"לא נמצאו מכשירים",display_name:"שם לתצוגה",display_name_hint:"השאירו ריק כדי להשתמש בשם מ-Home Assistant",show_as:"תצוגה",show_icon:"סמל",show_value:"סמל וערך",floor:"קומה",add_floor:"קומה חדשה",heat_map:"טמפרטורת חדרים",room_lights_on:"הדלק את כל האורות",room_lights_off:"כבה את כל האורות",night_plan:"תוכנית שקטה בלילה",rooms:"חדרים",draw_room:"ציור חדר",draw_hint:"הקישו על כל פינה של החדר, ואז על הפינה הראשונה כדי לסגור.",room_name:"שם החדר",room_default:"חדר {n}",finish:"סיום",undo_point:"בטל",delete_room:"מחק חדר",rooms_hint:"אורות שממוקמים בתוך חדר גורמים לו לזהור.",floor_name:"שם הקומה",floor_default:"קומת קרקע",upload_plan:"העלאת תוכנית",replace_plan:"החלפת תמונה",add_device:"הוספת מכשיר",no_plan:"אין עדיין תוכנית קומה",no_plan_admin:"הקישו עריכה כדי להעלות.",drag_hint:"גררו את המכשירים למקומם",plan_in_dark:"התוכנית במצב כהה",plan_original:"כפי שהועלתה",plan_invert:"היפוך צבעים",doorbell_test:"בדיקת פעמון",delete_floor:"מחיקת קומה",home_name:"שם הבית",language:"שפה",accent:"צבע הדגשה",theme:"מראה",theme_auto:"לפי המכשיר",theme_schedule:"כהה בלילה",theme_light:"בהיר",theme_dark:"כהה",dark_from:"כהה מ",dark_to:"עד",default_page:"עמוד פתיחה",screensaver:"שומר מסך",screensaver_after:"הפעלה אחרי (דקות)",temp_entity:"חיישן טמפרטורה",doorbell:"פעמון",doorbell_trigger:"לחצן הפעמון",doorbell_camera:"מצלמת הדלת",doorbell_lock:"מנעול הדלת",kiosk:"נעילת מסך",kiosk_lock:"נעל מסך",kiosk_unlock:"שחרור נעילה",kiosk_pin:"קוד יציאה",kiosk_pin_hint:"4 עד 8 ספרות. מסרו אותו לבעל הבית; ילדים ואורחים לא יוכלו לצאת מהלוח בלעדיו.",kiosk_pin_set:"הגדר קוד",kiosk_pin_change:"שנה קוד",kiosk_pin_saved:"הקוד הוגדר. הקישו שמירה.",kiosk_pin_invalid:"4 עד 8 ספרות",kiosk_remove_pin:"הסר קוד",kiosk_full_lock:"לנעילה מלאה השתמשו גם ב-Fully Kiosk Browser (אנדרואיד) או Guided Access (אייפד).",enter_pin:"הזינו קוד",wrong_pin:"קוד שגוי",tablet:"טאבלט קיר (Fully Kiosk)",tablet_found:"נמצא: {names}",tablet_none:"עדיין אין טאבלט Fully Kiosk ב-Home Assistant. הוסיפו קודם את האינטגרציה Fully Kiosk Browser.",tablet_this:"המסך הזה הוא הטאבלט",tablet_not_this:"המסך הזה לא רץ בתוך Fully",tablet_js_hint:"בטאבלט, הפעילו את JavaScript Interface ב-Fully (Settings → Advanced Web Settings) כדי שיזהה את עצמו.",night_dim:"עמעום בלילה",night_brightness:"בהירות לילה (%)",night_off:"כיבוי מסך בלילה אחרי (דקות, 0 = אף פעם)",motion_wake:"הערה כשמישהו מתקרב",motion_wake_hint:"משתמש במצלמת הטאבלט כדי לזהות אנשים. שום דבר לא מוקלט. שאלו את בעל הבית קודם.",weather:"מזג אוויר",weather_entity:"מקור מזג האוויר",weather_bg:"רקע חי לפי מזג האוויר",photos:"תמונות משפחה",photo_folder:"תיקייה ב-Media",photo_seconds:"שניות לכל תמונה",photos_hint:"שימו תמונות ב-Media ← My media ← {folder}. בלי תמונות שומר המסך מציג שעון.",status_bar:"שורת מצב",power_entity:"חיישן צריכת הבית",chip_lights_1:"אור אחד דולק",chip_lights_n:"{n} אורות דולקים",chip_open_1:"משהו פתוח",chip_open_n:"{n} פתוחים",chip_unlocked_1:"לא נעול",chip_unlocked_n:"{n} לא נעולים",chip_climate_1:"מזגן {temp}",chip_climate_n:"{n} מזגנים פועלים",chip_motion:"תנועה",chip_alert:"התראה",chip_t_lights:"אורות",chip_t_open:"דלתות וחלונות",chip_t_unlocked:"מנעולים",chip_t_climate:"מזגנים",chip_t_motion:"תנועה",chip_t_power:"חשמל",chip_t_alert:"התראות",turn_all_off:"כבה הכל",lock_all:"נעל הכל",greet_morning:"בוקר טוב",greet_afternoon:"צהריים טובים",greet_evening:"ערב טוב",greeting_name:"שם בברכה",greeting_name_hint:"השאירו ריק כדי להשתמש בשם המשתמש המחובר",in_min:"בעוד {n} דק׳",in_hours:"בעוד {n}",prayer:"זמני תפילה",p_fajr:"פג׳ר",p_dhuhr:"ד׳והר",p_asr:"עסר",p_maghrib:"מע׳רב",p_isha:"עישא",morning_summary:"סיכום בוקר",today_weather:"היום",overnight:"בלילה",night_doorbell_1:"הפעמון צלצל פעם אחת",night_doorbell_n:"הפעמון צלצל {n} פעמים",night_door_1:"{name} נפתח פעם אחת",night_door_n:"{name} נפתח {n} פעמים",night_robot:"השואב ניקה",night_quiet:"לילה שקט. אין מה לדווח.",night_unlocked:"{name} לא נעול כרגע",lets_go:"יאללה",health:"בריאות המערכת",h_offline:"מכשירים מנותקים",h_battery:"סוללות חלשות",h_backup:"גיבוי אחרון",h_backup_missing:"אין חיישן גיבוי. הפעילו גיבוי אוטומטי ב-Settings ← System ← Backups.",h_updates:"עדכונים ממתינים",h_system:"השרת",h_disk:"דיסק",h_cpu_temp:"טמפ׳ מעבד",h_memory:"זיכרון",h_tablets:"טאבלטים",h_reload:"טען מחדש",h_charging:"בטעינה",h_not_charging:"לא בטעינה",h_all_good:"הכל תקין",h_days_ago:"לפני {n} ימים",h_robot_parts:"חלקי רובוט להחלפה",h_telegram:"להתראות בטלגרם, העתיקו את ha-config/packages/smartnest_health.yaml לבית הזה.",activate_title:"הפעלת SmartNest",activate_text:"לוח הבקרה הזה צריך מפתח הפעלה לבית הזה.",activate_id:"מזהה התקנה",activate_key:"מפתח הפעלה",activate_btn:"הפעל",activate_bad:"המפתח הזה לא תקף לבית הזה.",activate_ask:"פנו למי שהתקין לכם את הבית החכם כדי להפעיל.",activate_send:"שלחו את המזהה הזה למתקין:",licensed_to:"מורשה ל",copy:"העתק",copied:"הועתק",plan_basic:"בסיסי",plan_pro:"Pro",plan_premium:"Premium",plan_needed:"זמין בחבילת {plan}",plan_label:"חבילה",expires_on:"חידוש עד",expires_soon:"המנוי ל-SmartNest מסתיים בעוד {n} ימים. פנו למתקין לחידוש.",expired_title:"המנוי הסתיים",expired_text:"בקשו מהמתקין מפתח הפעלה חדש.",trial_label:"ניסיון",via:"דרך",season:"עיצוב רמדאן וחג",season_auto:"אוטומטי",season_ramadan:"רמדאן",season_eid:"עיד",ramadan_kareem:"רמדאן כרים",eid_mubarak:"עיד מובארכ",timer_off_in:"כבה בעוד",timer_left:"ייכבה {in}",min_short:"{n} דק׳",hour_short:"{n} שע׳",ss_style:"סגנון שומר מסך",ss_classic:"קלאסי",ss_minimal:"מינימלי",ss_analog:"מחוגים",glass_style:"סגנון כרטיסים",glass_classic:"זכוכית חלבית",glass_liquid:"זכוכית נוזלית",guests_mode:"מצב אורחים",guests_wifi:"Wi-Fi לאורחים",wifi_ssid:"שם הרשת",wifi_password:"סיסמה",guests_welcome:"הודעת ברוכים הבאים",welcome_default:"ברוכים הבאים! תרגישו בבית",scan_wifi:"סרקו כדי להתחבר ל-Wi-Fi",plan_3d:"תצוגת 3D",map_temp:"טמפרטורה",map_humidity:"לחות",map_co2:"אוויר (CO₂)",widget_media:"מוזיקה וטלוויזיה",widget_remote:"שלט טלוויזיה",nothing_playing:"שום דבר לא מתנגן",group_speakers:"נגן בכל הבית",cinema_mode:"קולנוע",scene_cinema:"צפייה מהנה",announce:"השמע ברמקולים",speakers:"רמקולים להכרזות",export_config:"ייצוא לוח הבקרה",import_config:"ייבוא לוח בקרה",import_done:"יובא. בדקו ואז הקישו שמירה.",import_bad:"הקובץ הזה אינו לוח בקרה של SmartNest.",transfer:"העברה בין בתים",wizard_title:"הגדרת הבית",wizard_next:"הבא",wizard_finish:"סיום",wizard_pages:"אילו עמודים?",wizard_house:"איזה סוג בית?",house_flat:"דירה",house_villa:"וילה",house_office:"משרד",maintenance:"תחזוקה",m_title:"משימה",m_every:"כל (ימים)",m_done:"בוצע היום",m_due:"מועד",m_in:"בעוד {n} ימים",m_overdue:"באיחור {n} ימים",faults_week:"התנתקו השבוע",times:"{n}×",rate_service:"דרגו את המתקין",rate_thanks:"תודה! המתקין יראה את זה.",rate_comment:"משהו להוסיף?",tv_mode:"טקסט גדול (טלוויזיה)",this_screen:"המסך הזה",opens_on:"נפתח על",about:"אודות",version:"גרסה",none:"ללא",enabled:"פעיל",on:"פועל",off:"כבוי",open:"פתוח",closed:"סגור",opening:"נפתח",closing:"נסגר",locked:"נעול",unlocked:"לא נעול",locking:"ננעל",unlocking:"נפתח",jammed:"תקוע",cleaning:"מנקה",docked:"בעגינה",returning:"חוזר לעגינה",paused:"מושהה",idle:"במנוחה",error:"שגיאה",unavailable:"לא זמין",unknown:"לא ידוע",motion:"תנועה",clear:"אין תנועה",detected:"זוהה",heat:"חימום",cool:"קירור",auto:"אוטומטי",dry:"ייבוש",fan_only:"מאוורר",heat_cool:"חימום/קירור",playing:"מנגן",recording:"מקליט",streaming:"שידור חי",tap_to_run:"הקישו להפעלה",start:"התחל",pause:"השהה",return_home:"חזרה לעגינה",locate:"איתור",lock:"נעילה",unlock:"פתיחת נעילה",unlock_confirm:"לפתוח את נעילת הדלת?",cover_open:"פתח",cover_close:"סגור",stop:"עצור",turn_on:"הדלקה",turn_off:"כיבוי",color:"צבע",white_temp:"לבן",more_colors:"צבעים נוספים",position:"פתיחה",tilt:"הטיה",brightness:"בהירות",target_temp:"מכוון ל",current_temp:"עכשיו",battery:"סוללה",mode:"מצב",last_changed:"שונה",just_now:"עכשיו",min_ago:"לפני {n} דק׳",hours_ago:"לפני {n} שע׳",history_24h:"24 השעות האחרונות",someone_at_door:"מישהו בדלת",dismiss:"התעלם",open_door:"פתח דלת",tagline:"בית חכם. חיים טובים יותר.",assistant:"עוזר",as_hello:"שאל אותי כל דבר על הבית, או אמור לי מה לעשות.",as_s1:"כבה את כל האורות",as_s2:"מה הטמפרטורה בבית?",as_s3:"סגור את התריסים",as_s4:"הדלת נעולה?",as_done:"בוצע.",as_error:"לא הצלחתי. נסה שוב.",as_speak:"דבר",as_placeholder:"כתוב הודעה…",as_send:"שלח",ai_looking:"בודק…",habits_title:"הצעות מההרגלים שלכם",habits_seen:"קרה ידנית ב-{n} מתוך 14 הימים האחרונים",habits_make:"הפוך לאוטומטי",x_title:"מה הבעיה ואיך מתקנים",x_zigbee:"Zigbee: בדרך כלל סוללה ריקה, או רחוק ממכשיר Zigbee מחובר לחשמל",x_mqtt:"MQTT: ודא שהגשר (Zigbee2MQTT) פועל",x_zwave:"Z-Wave: סוללה, או בצע re-interview למכשיר",x_cloud:"מכשיר ענן: בדוק חשמל ו-Wi-Fi, ואז טען מחדש את האינטגרציה (ייתכן שצריך להתחבר מחדש)",x_wifi:"מכשיר Wi-Fi: כנראה מנותק מהחשמל או רחוק מהראוטר",x_generic:"בדוק חשמל וחיבור, ואז טען מחדש את האינטגרציה",x_battery:"החלף סוללה בקרוב",x_ai:"שאל את הבינה המלאכותית",widget_consumers:"מי צורך חשמל עכשיו",widget_water:"מים",template_water:"מים",now:"עכשיו",others:"אחרים",standby:"המתנה",standby_hint:"כבוי, אבל עדיין צורך חשמל. שקע חכם יכול לנתק.",standby_total:"{w} הולכים למכשירים כבויים",water_usage:"מונה מים",water_tank:"מיכל",water_valve:"ברז ראשי",water_leak:"נזילה",water_no_leak:"אין נזילות",water_close:"סגור",water_open:"פתח",water_close_confirm:"הקש שוב לסגירה",bill_budget:"תקציב חודשי",bill_over:"צפוי לחרוג ב-{v}",bill_within:"במסלול",solar_tip:"{kw} שמש עודפת: זמן טוב למכונת הכביסה או לדוד",overload_title:"עומס גבוה: {now} מתוך {max}",overload_hint:"כבה משהו לפני שהמפסק יקפוץ:",power_limit:"מגבלת הספק (וואט)",power_limit_hint:"התראה תוצג אם הבית חורג מזה 20 שניות",replay:"שחזור היום",play:"נגן",all_floors:"כל הקומות",travel:"מצב נסיעה",travel_on:"מצב נסיעה פעיל",travel_off:"מכבה: {x}",travel_off_pick:"מה לכבות ביציאה",travel_arm:"מפעיל את האזעקה",travel_sim:"אורות נדלקים ונכבים בערב, כאילו מישהו בבית",travel_sim_now:"מדמה עכשיו: {x}",travel_report:"דוח לטלפון כל ערב ב-8",travel_start:"אנחנו יוצאים",travel_stop:"חזרנו",travel_bye:"נסיעה טובה! הבית בידיים טובות.",travel_welcome:"ברוכים השבים!",alarm_triggered:"האזעקה הופעלה",alarm_code:"קוד אזעקה",alarm_stop:"עצור את האזעקה",alarm_hide:"הסתר",call_police:"משטרה",emergency:"מספרי חירום",police_number:"מספר משטרה",emergency_contacts:"בני משפחה להתקשר",emergency_hint:"אחד בכל שורה: שם, טלפון. מוצגים כשהאזעקה מופעלת.",chip_t_package:"חבילות",chip_package:"הגיעה חבילה",wx_alert_rain:"גשם בדרך",wx_alert_wind:"רוח חזקה או אבק בדרך",wx_alert_open:"עדיין פתוח: {x}",wx_close_covers:"סגור תריסים",widget_wake:"שעון מעורר באור",wake_minutes:"זריחה {n} דקות",wake_add:"הוסף שעון מעורר",wake_hint:"האור עולה לאט לפני שעת ההשכמה, כמו השמש.",widget_chores:"משימות הילדים",chores_kids:"ילדים",chores_tasks:"משימות",chores_kid_name:"שם",chores_task_name:"משימה (למשל לסדר מיטה)",chores_goal:"כוכבים לפרס (בשבוע)",chores_reward:"פרס",chores_reward_hint:"גלידה ביום שישי",chores_won:"הרווחת את הפרס!",widget_air:"איכות אוויר",air_co2:"CO₂",air_pm25:"אבק",air_voc:"VOC",air_humidity:"לחות",air_level_good:"האוויר נקי",air_level_ok:"האוויר יכול להיות טוב יותר",air_level_bad:"האוויר דורש תשומת לב",air_good:"אין מה לעשות.",air_tip_co2:"פתח חלון ל-10 דקות.",air_tip_pm:"סגור חלונות והפעל מטהר אוויר.",air_tip_voc:"אוורר את החדר: בישול, צבע או חומרי ניקוי.",air_tip_dry:"יבש מדי: מכשיר אדים יעזור.",air_tip_humid:"לח מדי: הפעל מזגן במצב ייבוש, או אוורר.",fx_title:"סצנות נעות",fx_candle:"נר",fx_sunset:"שקיעה",fx_party:"מסיבה",fx_ramadan:"רמדאן",fx_aurora:"זוהר",fx_stop:"עצור",fx_started:"הסצנה פועלת",page_person:"של מי הדף",page_person_all:"לכולם",page_person_hint:"התמונה שלו מופיעה בסרגל; הקשה פותחת את הדף שלו.",support_title:"יש בעיה? כתבו למתקין",support_hint:"שולח וואטסאפ ל-{name} עם מצב הבית, כדי לעזור מהר יותר.",support_placeholder:"מה קורה? (למשל אור המטבח לא מגיב)",support_default:"שלום, אני צריך עזרה עם הבית החכם.",support_send:"שלח בוואטסאפ",installer:"מתקין",installer_name:"שם המתקין",installer_phone:"מספר וואטסאפ",installer_phone_hint:"עם קידומת מדינה, בלי + ורווחים. ללקוח יופיע כפתור 'יש בעיה?'.",report:"דוח חודשי",report_title:"{name} · דוח חודשי",report_devices:"מכשירים",report_offline:"{n} מנותקים עכשיו",report_faults:"התנתקו החודש",report_autos:"{n} פועלות",presets:"ערכות מוכנות",preset_gold:"זהב",preset_sea:"ים",preset_desert:"מדבר",preset_night:"לילה",preset_rose:"ורד",preset_olive:"זית",history:"גרסאות קודמות",history_hint:"כל שמירה שומרת את הגרסה הקודמת. גם שחזור אפשר לבטל.",history_empty:"עדיין אין גרסאות. הן יופיעו אחרי השמירה הבאה.",history_size:"{p} דפים · {w} פריטים",history_restore:"חזור לזו",history_confirm:"להחליף את הדשבורד הנוכחי בגרסה זו בכל המסכים?",history_done:"שוחזר",template_car:"רכב",template_garden:"גינה ובריכה",template_pets:"חיות מחמד",ai_scene_title:"אווירה במילים",ai_scene_hint:"למשל רגוע לסרט",ai_do_it:"בצע",ai_auto_hint:"תאר: כל לילה ב-23 כבה את הסלון",ai_auto_fail:"לא הצלחתי להפוך לאוטומציה. ציין מתי ומה.",ai_cam_btn:"מה קרה בחוץ היום?",ai_cam_quiet:"יום שקט: לא זוהה דבר.",ai_bill_btn:"למה החשבון כזה?",voice_hands_free:"קול ללא מגע",voice_hint:"אמור את מילת ההפעלה (למשל „Okay Nabu”) ודבר. דורש Assist עם מנוע מילת הפעלה, והדשבורד ב-https.",voice_https:"המיקרופון דורש https",voice_mic:"אין גישה למיקרופון",voice_pipeline:"Assist לא מוכן (מנוע מילת הפעלה?)",voice_ready:"מאזין למילת ההפעלה",voice_listening:"מקשיב…",helpers:"עוזרי בית",h_appliances:"מכשיר סיים",h_appliances_hint:"בחר את מדי הצריכה של מכונת הכביסה, המייבש או המדיח. בסיום, כל המסכים והרמקולים יודיעו.",h_night_path:"שביל לילה",h_night_path_hint:"בחר חיישני תנועה ואורות: בלילה תנועה תדליק אותם בעמעום ל-3 דקות.",h_arrival:"בדרך הביתה",h_arrival_hint:"בחר מזגנים ואורות: כשמישהו בדרך הביתה וקרוב, המזגן נדלק (והאורות בחושך).",h_arrival_missing:"דורש את אינטגרציית Proximity ב-Home Assistant.",h_arrival_km:'התחל כשקרוב מ-(ק"מ)',h_outage:"הפסקת חשמל",h_outage_hint:"בחר את חיישן הרשת, ואז מה לכבות כשהיא נופלת.",h_outage_sensor:"חיישן רשת",from:"מ-",to:"עד",chip_outage:"הפסקת חשמל",chip_running:"{name} פועלת",chip_arriving:"{name} בבית בעוד ~{n} דק'",widget_boiler:"דוד מים",boiler_ready_in:"מחמם · מוכן בעוד {n} דק'",boiler_off_in:"חם · ייכבה בעוד {n} דק'",boiler_hot:"פועל",boiler_next:"מים חמים עד {at}",boiler_for:"{n} דק'",boiler_plan:"מתחיל {n} דק' לפני",boiler_want:"מים חמים עד",widget_irrigation:"השקיית גינה",irr_running:"משקה עכשיו",irr_next:"ב-{at} ל-{n} דק'",irr_skip_rain:"דלג כשצפוי גשם",irr_skipped:"{date}: דילגנו, צפוי גשם",irr_watered:"{date}: הושקה",irr_now:"השקה 10 דק' עכשיו",minutes:"דק'",codes_title:"קודים לאורחים",codes_new:"קוד חדש",codes_who:"למי (למשל המנקה)",codes_from:"מתחיל",codes_4h:"4 שעות",codes_day:"יום",codes_3days:"3 ימים",codes_week:"שבוע",codes_auto:"קוד (ריק = 6 ספרות אקראיות)",codes_make:"צור קוד",codes_live:"פעיל",codes_later:"מתחיל מאוחר יותר",codes_share:"שלח",codes_full:"כל המקומות לאורחים במנעול תפוסים",codes_need_zwave:"קודים לאורחים נכתבים למנעולי Z-Wave עם מקלדת.",codes_message:"שלום {name} 👋\nהקוד שלך ל{lock}: {code}\nמ-{from}\nעד {until}",widget_timeline:"ציר זמן מצלמה",tl_pick:"{n} זיהויים: הקש על נקודה לצפייה",tl_none:"לא זוהה דבר",fr_person:"אדם",fr_car:"רכב",fr_dog:"כלב",fr_cat:"חתול",fr_package:"חבילה",widget_internet:"אינטרנט לילדים",net_on:"מחובר",net_off:"מנותק",net_paused_for:"מושהה · חוזר בעוד {n} דק'",net_stop:"עצור",net_allow:"אפשר",net_hour:"שעה בלי",net_bedtime:"שעת שינה",net_wake:"בוקר",net_no_router:"לא נמצאו מתגי נתב. הוסף את אינטגרציית הנתב.",net_ask_installer:"בקש מהמתקין להגדיר.",face_hello:"שלום {name}",widget_board:"לוח המשפחה",board_write:"כתוב",board_draw:"צייר",board_stick:"הדבק",board_placeholder:"חוזר ב-6, האוכל במקרר…",board_empty:"הלוח ריק. כתבו פתק או ציירו משהו.",widget_verse:"פסוק היום",widget_radar:'מכ"ם גשם',widget_commute:"בדרך",commute_missing:"הוסף את אינטגרציית Waze Travel Time והמסלולים יופיעו כאן.",widget_parcels:"חבילות",parcels_missing:"הוסף את אינטגרציית 17TRACK כדי לעקוב אחרי חבילות.",parcels_none:"אין חבילות בדרך",photos_from_phone:"תמונות מהטלפון",photos_scan:"סרקו במצלמת הטלפון ובחרו תמונות. הקישור פעיל {n} דקות.",photos_wifi:"הטלפון צריך להיות על ה-Wi-Fi של הבית.",big_text:"טקסט גדול",tour_again:"סיור",tour_skip:"דלג",tour_next:"הבא",tour_done:"הבנתי",tour_tabs:"אלה הדפים שלכם. הקישו, או החליקו ימינה ושמאלה.",tour_chips:"הבית במבט: מה דלוק ומה פתוח. הקישו לראות או לתקן.",tour_plan:"תוכנית הבית. הקישו על מכשיר לשליטה, או על חדר.",tour_modes:"הקשה אחת לכל הבית: יוצאים, חוזרים, שינה, ערב.",tour_tile:"הקישו להדליק או לכבות. לחיצה ארוכה לעוד אפשרויות.",tour_assistant:"כאן שואלים את הבית או מבקשים ממנו.",tour_logo:"הגדרות המסך ועזרה נמצאות מאחורי הלוגו.",tou:"שעות זולות",tou_cheap:"זול",tou_peak:"שיא",tou_later:"הפעל ב-{at} (זול יותר)",tou_scheduled:"יופעל ב-{at}",chip_peak:"שעות שיא ⚡",chip_cheap:"החשמל זול עכשיו",challenge_won:"{n}% פחות מהחודש שעבר",challenge_hint:"אתגר משפחתי: פחות מהחודש שעבר",refill_phone:"וואטסאפ של הספק (למילוי)",refill_hint:'כשהרמה נמוכה, יופיע כפתור "הזמן מילוי".',refill_order:"הזמן מילוי",refill_message:"שלום, אנחנו צריכים מילוי {what} עבור {home}. תודה!",heartbeat_url:"קישור דופק",heartbeat_hint:"מדף הרישיונות שלך. הבית מדווח פעמיים ביום: פעיל, כמה מכשירים מנותקים, איזו גרסה.",bat_title:"סוללות שעומדות להיגמר",bat_days:"בעוד ~{n} ימים",bat_year:"יותר משנה",bat_none:"אין סוללה שמתרוקנת מהר",war_title:"אחריות",war_until:"עד {date}",war_over:"הסתיימה",war_what:"מכשיר (למשל מזגן הסלון)",war_months:"{n} חודשים",war_invoice:"תמונת חשבונית",showroom:"מצב תצוגה",showroom_hint:"המסך מציג בית לדוגמה במקום הבית הזה, לחנות. מכבים מכאן.",style:"מראה",style_classic:"קלאסי",style_pro:"SmartNest 2.0",style_hint:"2.0: זכוכית עמוקה עם אור שעוקב אחרי האצבע, צבע האורות ברקע, גרעיניות ואייקונים דו-גוניים.",material_none:"חלק",material_marble:"שיש",material_wood:"עץ",material_sand:"חול",material_olive:"זית",night_midnight:"חצות בלילה (שחור מלא, רק מה שדולק זוהר)",theme_midnight:"חצות",widget_hero:"הבית במבט",hero_ok:"הכל תקין",hero_all_quiet:"הבית שקט",hero_inside:"בפנים",hero_home:"בבית",widget_stack:"ערימה חכמה",widget_room:"כרטיס חדר",room_photo:"תמונת החדר",template_bento:"בית Bento",act_running:"פועלת",act_cleaning:"מנקה",act_heating:"מחמם מים",act_off_in:"נכבה בעוד {n} דק'",wallpaper:"טפט",wallpaper_dim:"הכהיה",accent_from_wallpaper:"קח את הצבע מהתמונה",nav_style:"דפים",nav_tabs:"לשוניות בסרגל",nav_dock:"Dock צף",search_placeholder:"חפש מכשירים, דפים, מצבים…",search_page:"דף",search_open:"פתח",search_none:"לא נמצא",sound_motion:"צליל ותנועה",ui_sounds:"צליל עדין כשדברים נדלקים ונכבים",bell_tone:"צליל פעמון",bell_chime:"קלאסי",bell_dingdong:"דינג דונג",bell_melody:"מנגינה",motion_full:"מלאה",motion_light:"קלה",motion_off:"ללא",motion_hint:"קלה שומרת משוב ועוצרת לולאות רקע. ללא עוצרת גם אנימציות דפים.",plan_model:"מודל תלת-ממדי",plan_lens:"זכוכית מגדלת",high_contrast:"ניגודיות גבוהה",welcome_home:"ברוך הבא, {name}",window_camera:"חלון: מצלמה חיצונית כרקע",music_backdrop:"עטיפת השיר כרקע בזמן מוזיקה",welcome_moment:"רגע קבלת פנים כשמישהו מגיע",page_moods:"לכל דף צבע משלו",season_skin:"שמי עונות (שלג, עלים, פרחים)",monogram:"סמל המשפחה",monogram_hint:"חותם זהב עם ראשי התיבות במקום הלוגו.",ab_title:"הגדר את הדשבורד בשבילי",ab_hint:"בדקתי את מכשירי הבית. אלה הדפים שאני יכול לבנות, כל אחד כבר מלא. בטל את מה שלא צריך.",ab_per_area:"חדרים",ab_one_rooms:"דף חדרים אחד",ab_area_pages:"דף לכל חדר",ab_devices:"{n} מכשירים",ab_home:"תוכנית ומצבים",ab_mode:"דפים קיימים",ab_replace:"החלף (התוכנית נשמרת)",ab_add:"השאר והוסף",ab_go:"בנה {n} דפים",ab_done:"{n} דפים מוכנים. לחץ שמור.",template_media:"מוזיקה וטלוויזיה",fast_mode:"מצב מהיר",fast_auto:"אוטומטי",fast_hint:"כרטיסים אטומים במקום טשטוש, בלי אנימציות רקע, פחות רענונים. מומלץ לטאבלט קיר.",fast_hint_weak:"הטאבלט הזה חלש יחסית, לכן אוטומטי מפעיל מצב מהיר.",revoked_title:"הדשבורד הופסק",revoked_text:"המתקין עצר את הרישיון. פנו אליו כדי להפעיל מחדש.",lic_check:"בדוק עכשיו",lic_check_ok:"מעודכן ✓",lic_check_none:"לא הצלחתי להגיע למתקין, נסו שוב מאוחר יותר",boiler_pick:"מכשיר הדוד",boiler_tap_pick:"בחרו את הדוד: ✏️ ← הגדרות הרכיב",air_purifier:"מטהר / מכשיר אדים",air_sensors:"חיישנים",auto_all:"לא נבחר כלום: ימצא לבד.",widget_ac:"מזגן",widget_scenes:"סצנות",widget_sensor:"חיישן עם גרף",widget_batteries:"סוללות",widget_lights:"אורות",widget_covers:"תריסים",widget_prayer:"זמני תפילה",sensor_pick:"בחרו חיישן בהגדרות הרכיב",bat_low_n:"{n} חלשות",bat_all_good:"הכל תקין",lights_on_n:"{n} מתוך {of} דולקים",covers_open_n:"{n} מתוך {of} פתוחים",all_off:"כבה הכל",all_on:"הדלק הכל",prayer_fajr:"פג'ר",prayer_sunrise:"זריחה",prayer_dhuhr:"צהריים",prayer_asr:"עסר",prayer_maghrib:"מגרב",prayer_isha:"עשאא",prayer_next:"התפילה הבאה",prayer_in_hm:"בעוד {h} ש' {m} ד'",prayer_in_m:"בעוד {m} דק'",prayer_setup:'הוסיפו את האינטגרציה "Islamic Prayer Times" ב-Home Assistant והזמנים יופיעו כאן.',area_all:"כל הבית",widget_title:"כותרת",bat_low_at:"חלשה מתחת ל-%",picker_more:"הצג עוד {n}",picker_show_extra:"הצג גם {n} ישויות טכניות",irr_pick:"בחרו את הברז: ✏️ ← הגדרות הרכיב",hidden_devices:"מכשירים מוסתרים",hidden_hint:"מוסתרים מכל הדשבורד: עמודים, חיפוש, שורת הסטטוס ועמודים אוטומטיים. ממשיכים לעבוד ב-Home Assistant.",hidden_add:"הסתר מכשיר",hidden_show:"הצג שוב",hidden_this:"הסתר מהדשבורד",hidden_done:"הוסתר. אפשר להחזיר בהגדרות ← מכשירים מוסתרים",link_lost:"מתחבר מחדש לבית…",link_back:"מחובר",radial_warm:"חם",radial_cool:"קר",radial_off_in:"{n} דק'",radial_more:"עוד",radial_timer_set:"ייכבה בעוד {n} דק'",undo:"בטל",undo_n:"{n} מכשירים השתנו",plan_north:"לאן הצפון (מעלות)",plan_north_hint:"0 כשהצפון למעלה בתוכנית, 90 כשהוא מימין. אור השמש בתוכנית לפי זה.",simple_mode:"מצב פשוט",simple_hint:"למבוגרים: טקסט גדול ורק העמודים והכפתורים במסך הזה.",night_red:"אדום בלילה",night_red_hint:"אחרי החשכה המסך חם ומעומעם: נעים לעיניים בחדר שינה.",occ_ramadan:"רמדאן כרים",occ_eid_fitr:"עיד מובארכ",occ_eid_adha:"עיד מובארכ",occ_christmas:"חג מולד שמח",occ_new_year:"שנה טובה",font:"גופן",font_hint:"Rubik מובנה; האחרים נטענים מ-Google Fonts בפעם הראשונה (הטאבלט צריך אינטרנט פעם אחת).",icons_style:"אייקונים",icons_filled:"מלאים",icons_line:"קו",accent_day:"הצבע לפי שעות היום (זהב, טורקיז, אלמוג, סגול)",active_glow:"אור מסתובב סביב מה שדולק",aurora:"זוהר מאחורי הכרטיסים (בלי טפט)",occasions:"קישוט לרמדאן, החגים, חג המולד והשנה החדשה",burn_in:"הגנה על מסכי קיר מצריבה",ss_open:"{n} פתוח",ss_unlocked:"{n} לא נעול",widget_folder:"תיקייה",folder_on:"{n}/{of} דולקים",folder_empty:"הוסיפו מכשירים בהגדרות",scene_keep:"שמור כך (כסצנה)",scene_name:"שם הסצנה",scene_saved:'"{name}" נשמרה כסצנה',acw_title:"שבוע המזגן",acw_hint:"גררו על השעות שבהן יפעל. Home Assistant מדליק בתחילת כל קטע ומכבה בסופו, גם כשהדשבורד סגור.",notifications:"התראות",notif_ha:"מ-Home Assistant",notif_day:"24 השעות האחרונות",notif_quiet:"יום שקט: שום דבר לא נפתח",door_mini:"השאר בפינה",cam_motion:"תנועה",ss_lights_off:"כבה",ss_lock:"נעל",nudge_window_ac:"{win} פתוח בזמן ש{ac} פועל",nudge_ac_off:"כבה מזגן",nudge_away_lights:"כולם בחוץ ו-{n} אורות דולקים",nudge_lights_off:"כבה אורות",nudge_idle_light:"{light} דולק חצי שעה ואין אף אחד ב{room}",nudge_turn_off:"כבה",nudge_tv:"{tv} דולק ואף אחד לא בבית",nudge_later:"לא עכשיו",brand_logo:"הלוגו שלך (במקום SmartNest)",brand_hint:"מופיע בסרגל ובשומר המסך. מדף הרישיונות הוא מגיע לכל הבתים לבד.",design_arrived:"המתקין שלח עיצוב חדש: {name}",design_new:"דשבורד חדש",design_apply:"השתמש",design_confirm:"להחליף את עמודי הדשבורד בעיצוב החדש? התוכנית, שמות המכשירים וההגדרות נשארים. (הישן נשמר בהגדרות ← היסטוריה.)",design_applied:"העיצוב החדש במקום",design_applied_dropped:"העיצוב במקום ({n} כרטיסים למכשירים שאין כאן הושמטו)",phone_qr:"פתח בטלפון",phone_qr_hint:"סרקו במצלמת הטלפון. הכי טוב באפליקציית Home Assistant: מתחברים פעם אחת ו-SmartNest בתפריט.",ab_kind:"סוג המקום",ab_apartment:"דירה",ab_villa:"וילה",ab_office:"משרד",plan_draw:"צייר תוכנית",plan_clean:"תוכנית נקייה",plan_photo_back:"חזרה לתמונה",plan_mode_room:"חדרים",plan_mode_door:"דלתות",plan_room_n:"חדר {n}",plan_kind_wood:"עץ",plan_kind_tile:"אריחים",plan_kind_plain:"רגיל",plan_kind_outdoor:"בחוץ",plan_draw_hint:"גררו על הרשת כדי לצייר חדר. החדרים נצמדים לקירות זה של זה.",plan_draw_more:"ציירו את החדר הבא לידו, או הקישו על חדר כדי לשנות שם, להזיז או לשנות גודל.",plan_door_hint:"הקישו על קיר כדי להוסיף דלת. הקישו על דלת כדי לקשר חיישן, מנעול או מנוע, או להסיר.",plan_clean_need_rooms:"סמנו קודם את החדרים (חדרים, או הוספה אוטומטית)",plan_mode_wall:"קירות פתוחים",plan_mode_furn:"ריהוט",plan_wall_hint:"הקישו על קיר כדי לפתוח אותו (סלון פתוח למטבח). הקישו על הפתח המסומן כדי לסגור.",plan_turn:"סובב",plan_copy:"שכפל",furn_sofa:"ספה",furn_sofa_l:"ספת פינה",furn_armchair:"כורסה",furn_coffee:"שולחן סלון",furn_tv:"טלוויזיה",furn_rug:"שטיח",furn_dining:"שולחן אוכל",furn_round_table:"שולחן עגול",furn_bed2:"מיטה זוגית",furn_bed1:"מיטת יחיד",furn_wardrobe:"ארון",furn_desk:"שולחן עבודה",furn_toilet:"אסלה",furn_basin:"כיור",furn_bath:"אמבטיה",furn_shower:"מקלחת",furn_counter:"משטח",furn_ksink:"כיור מטבח",furn_stove:"כיריים",furn_fridge:"מקרר",furn_washer:"מכונת כביסה",furn_plant:"עציץ",furn_stairs:"מדרגות",furn_car:"רכב",plan_mode_line:"קירות",plan_line_hint:"גררו כדי לצייר קיר. נצמד לפינות ולקצוות, ומתיישר כשהוא כמעט אופקי או אנכי. הקישו על קיר כדי למחוק.",plan_line_sel:"הקיר הזה",plan_room_walls:"קירות משלו",plan_room_nowall:"בלי קירות (אזור)",plan_shape_rect:"מלבן",plan_shape_poly:"נקודות",plan_poly_hint:"הקישו על פינות החדר אחת אחרי השנייה (כל צורה). הקישו שוב על הנקודה הראשונה כדי לסגור.",plan_poly_drawing:"הפינה הבאה… (הנקודה הראשונה סוגרת)",plan_poly_undo:"נקודה אחרונה",plan_poly_close:"סגור חדר",plan_point_remove:"הסר נקודה",plan_opening_door:"דלת",plan_opening_double:"דלת כפולה",plan_opening_slide:"הזזה",plan_opening_window:"חלון",plan_opening_wide_window:"חלון רחב",furn_nightstand:"שידת לילה",furn_dresser:"שידה",furn_bookshelf:"כוננית",furn_chair:"כיסא",furn_crib:"עריסה",furn_bunk:"מיטת קומותיים",furn_island:"אי מטבח",furn_dishwasher:"מדיח",furn_oven:"תנור",furn_bidet:"בידה",furn_basin2:"כיור כפול",furn_jacuzzi:"ג׳קוזי",furn_dryer:"מייבש",furn_ac:"מזגן",furn_boiler:"דוד",furn_fireplace:"אח",furn_piano:"פסנתר",furn_tree:"עץ",furn_pool:"בריכה",furn_bbq:"מנגל",furn_outdoor:"שולחן גן",furn_shoes:"ארון נעליים",furn_mirror:"מראה",plan_mode_window:"חלונות",plan_window_hint:"הקישו על קיר כדי להוסיף חלון. הקישו על חלון כדי לקשר חיישן או מנוע.",plan_link_none:"לא מקושר למכשיר",move_room:"חדר (עמוד)",move_room_hint:"בחרו חדר והכרטיס עובר לשם: לסוף החלק שלו בעמוד הזה, או לעמוד אחר. המכשיר עובר לחדר הזה גם ב-Home Assistant.",moved_to:"הועבר ל{page}",move_this_page:"חדרים בעמוד הזה",move_other_page:"עמוד אחר",live:"חי",camera_mode:"תמונה",camera_auto:"כמו בבית",camera_live:"תמיד חי",camera_still:"סטילס",camera_mode_hint:"חי פועל כשהכרטיס על המסך. עד 4 מצלמות חיות יחד; השאר מתרעננות כל 2 שנ' ועוברות לחי כשאחת נעצרת.",cameras_live:"מצלמות בשידור חי",fast_auto_on:"המסך התקשה, אז מצב מהיר הופעל (אפשר לשנות באודות)",rooms_on_n:"{n} דולקים",rooms_devices_n:"{n} מכשירים",slide_unlock:"החלק לפתיחה",slide_open_door:"החלק לפתיחת הדלת",doorbell_speaker:"רמקול ליד הדלת (תשובות קוליות)",reply_coming:"מגיע!",reply_leave:"השאירו ליד הדלת בבקשה",reply_wait:"רגע בבקשה",reply_who:"מי זה?",reply_sent:"נאמר ליד הדלת",circadian:"אור שעוקב אחרי השמש",circadian_hint:"לבן קר ביום, חם בשקיעה, הכי חם בלילה. שינוי ידני נשמר עד הכיבוי הבא.",nudge_door_open:"{door} פתוח כבר {n} דקות",nudge_look:"הצג",nudge_fridge_warm:"{name} ב-{v}° — המקרר מתחמם",nudge_freezer_warm:"{name} ב-{v}° — המקפיא מתחמם",nudge_standby:"{name} צורך {w} וואט בהמתנה",air_score:"מדד איכות אוויר",page_users:"מי רואה את העמוד",page_users_all:"כולם. בחרו אנשים כדי להציג רק להם.",page_users_some:"רק האנשים שנבחרו (ומנהלים).",quick_scenes:"סרגל סצנות בתחתית כל עמוד"}},Vt=[{id:"ar",label:"العربية"},{id:"en",label:"English"},{id:"he",label:"עברית"}],St=t=>"en"!==t;function zt(t){const e=Lt[t]??At;return(t,i)=>{let s=e[t]??At[t]??t;if(i)for(const[e,n]of Object.entries(i))s=s.replace(`{${e}}`,String(n));return s}}function Dt(t){return t in At}const Ot={ar:"ar-u-nu-latn",en:"en-GB",he:"he"};var Tt="M24 13L20 17V14H11V12H20V9L24 13M4 20V12H1L11 3L18 9.3V10H15.79L11 5.69L6 10.19V18H16V16H18V20H4Z",jt="M12 5.69L17 10.19V18H15V12H9V18H7V10.19L12 5.69M12 3L2 12H5V20H11V14H13V20H19V12H22",Pt="M12,2A7,7 0 0,1 19,9C19,11.38 17.81,13.47 16,14.74V17A1,1 0 0,1 15,18H9A1,1 0 0,1 8,17V14.74C6.19,13.47 5,11.38 5,9A7,7 0 0,1 12,2M9,21V20H15V21A1,1 0 0,1 14,22H10A1,1 0 0,1 9,21M12,4A5,5 0 0,0 7,9C7,11.05 8.23,12.81 10,13.58V16H14V13.58C15.77,12.81 17,11.05 17,9A5,5 0 0,0 12,4Z",It="M16,18H18V6H16M6,18L14.5,12L6,6V18Z",Et="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z",Nt="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z",Wt="M14.83,11.17C16.39,12.73 16.39,15.27 14.83,16.83C13.27,18.39 10.73,18.39 9.17,16.83L14.83,11.17M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2M7,4A1,1 0 0,0 6,5A1,1 0 0,0 7,6A1,1 0 0,0 8,5A1,1 0 0,0 7,4M10,4A1,1 0 0,0 9,5A1,1 0 0,0 10,6A1,1 0 0,0 11,5A1,1 0 0,0 10,4M12,8A6,6 0 0,0 6,14A6,6 0 0,0 12,20A6,6 0 0,0 18,14A6,6 0 0,0 12,8Z",Rt="M10 3.25C10 3.25 16 10 16 14C16 17.31 13.31 20 10 20S4 17.31 4 14C4 10 10 3.25 10 3.25M20 7V13H18V7H20M18 17H20V15H18V17Z",Ft="M10 3.25C10 3.25 4 10 4 14C4 17.31 6.69 20 10 20S16 17.31 16 14C16 10 10 3.25 10 3.25M10 18C7.79 18 6 16.21 6 14C6 12.23 8 8.96 10 6.39C12 8.95 14 12.23 14 14C14 16.21 12.21 18 10 18M20 7V13H18V7H20M18 17H20V15H18V17Z",Bt="M12,3.25C12,3.25 6,10 6,14C6,17.32 8.69,20 12,20A6,6 0 0,0 18,14C18,10 12,3.25 12,3.25M14.47,9.97L15.53,11.03L9.53,17.03L8.47,15.97M9.75,10A1.25,1.25 0 0,1 11,11.25A1.25,1.25 0 0,1 9.75,12.5A1.25,1.25 0 0,1 8.5,11.25A1.25,1.25 0 0,1 9.75,10M14.25,14.5A1.25,1.25 0 0,1 15.5,15.75A1.25,1.25 0 0,1 14.25,17A1.25,1.25 0 0,1 13,15.75A1.25,1.25 0 0,1 14.25,14.5Z",Zt="M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z",qt="M9,12C9.53,12.14 9.85,12.69 9.71,13.22L8.41,18.05C8.27,18.59 7.72,18.9 7.19,18.76C6.65,18.62 6.34,18.07 6.5,17.54L7.78,12.71C7.92,12.17 8.47,11.86 9,12M13,12C13.53,12.14 13.85,12.69 13.71,13.22L11.64,20.95C11.5,21.5 10.95,21.8 10.41,21.66C9.88,21.5 9.56,20.97 9.7,20.43L11.78,12.71C11.92,12.17 12.47,11.86 13,12M17,12C17.53,12.14 17.85,12.69 17.71,13.22L16.41,18.05C16.27,18.59 15.72,18.9 15.19,18.76C14.65,18.62 14.34,18.07 14.5,17.54L15.78,12.71C15.92,12.17 16.47,11.86 17,12M17,10V9A5,5 0 0,0 12,4C9.5,4 7.45,5.82 7.06,8.19C6.73,8.07 6.37,8 6,8A3,3 0 0,0 3,11C3,12.11 3.6,13.08 4.5,13.6V13.59C5,13.87 5.14,14.5 4.87,14.96C4.59,15.43 4,15.6 3.5,15.32V15.33C2,14.47 1,12.85 1,11A5,5 0 0,1 6,6C7,3.65 9.3,2 12,2C15.43,2 18.24,4.66 18.5,8.03L19,8A4,4 0 0,1 23,12C23,13.5 22.2,14.77 21,15.46V15.46C20.5,15.73 19.91,15.57 19.63,15.09C19.36,14.61 19.5,14 20,13.72V13.73C20.6,13.39 21,12.74 21,12A2,2 0 0,0 19,10H17Z",Ut="M4,10A1,1 0 0,1 3,9A1,1 0 0,1 4,8H12A2,2 0 0,0 14,6A2,2 0 0,0 12,4C11.45,4 10.95,4.22 10.59,4.59C10.2,5 9.56,5 9.17,4.59C8.78,4.2 8.78,3.56 9.17,3.17C9.9,2.45 10.9,2 12,2A4,4 0 0,1 16,6A4,4 0 0,1 12,10H4M19,12A1,1 0 0,0 20,11A1,1 0 0,0 19,10C18.72,10 18.47,10.11 18.29,10.29C17.9,10.68 17.27,10.68 16.88,10.29C16.5,9.9 16.5,9.27 16.88,8.88C17.42,8.34 18.17,8 19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14H5A1,1 0 0,1 4,13A1,1 0 0,1 5,12H19M18,18H4A1,1 0 0,1 3,17A1,1 0 0,1 4,16H18A3,3 0 0,1 21,19A3,3 0 0,1 18,22C17.17,22 16.42,21.66 15.88,21.12C15.5,20.73 15.5,20.1 15.88,19.71C16.27,19.32 16.9,19.32 17.29,19.71C17.47,19.89 17.72,20 18,20A1,1 0 0,0 19,19A1,1 0 0,0 18,18Z";const Yt={"air-conditioner":"M6.59,0.66C8.93,-1.15 11.47,1.06 12.04,4.5C12.47,4.5 12.89,4.62 13.27,4.84C13.79,4.24 14.25,3.42 14.07,2.5C13.65,0.35 16.06,-1.39 18.35,1.58C20.16,3.92 17.95,6.46 14.5,7.03C14.5,7.46 14.39,7.89 14.16,8.27C14.76,8.78 15.58,9.24 16.5,9.06C18.63,8.64 20.38,11.04 17.41,13.34C15.07,15.15 12.53,12.94 11.96,9.5C11.53,9.5 11.11,9.37 10.74,9.15C10.22,9.75 9.75,10.58 9.93,11.5C10.35,13.64 7.94,15.39 5.65,12.42C3.83,10.07 6.05,7.53 9.5,6.97C9.5,6.54 9.63,6.12 9.85,5.74C9.25,5.23 8.43,4.76 7.5,4.94C5.37,5.36 3.62,2.96 6.59,0.66M5,16H7A2,2 0 0,1 9,18V24H7V22H5V24H3V18A2,2 0 0,1 5,16M5,18V20H7V18H5M12.93,16H15L12.07,24H10L12.93,16M18,16H21V18H18V22H21V24H18A2,2 0 0,1 16,22V18A2,2 0 0,1 18,16Z","alert-circle-outline":"M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z","arrow-left":"M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z","arrow-right":"M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z",bell:"M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21","bell-ring":"M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21M19.75,3.19L18.33,4.61C20.04,6.3 21,8.6 21,11H23C23,8.07 21.84,5.25 19.75,3.19M1,11H3C3,8.6 3.96,6.3 5.67,4.61L4.25,3.19C2.16,5.25 1,8.07 1,11Z",blinds:"M20 19V3H4V19H2V21H22V19H20M16 9H18V11H16V9M14 11H6V9H14V11M18 7H16V5H18V7M14 5V7H6V5H14M6 19V13H14V14.82C13.55 15.14 13.25 15.66 13.25 16.25C13.25 17.22 14.03 18 15 18S16.75 17.22 16.75 16.25C16.75 15.66 16.45 15.13 16 14.82V13H18V19H6Z","blinds-closed":"M20 19V3H4V19H2V21H13.25C13.25 21.97 14.03 22.75 15 22.75S16.75 21.97 16.75 21H22V19H20M18 11H16V9H18V11M14 11H6V9H14V11M14 13V15H6V13H14M16 13H18V15H16V13M18 7H16V5H18V7M14 5V7H6V5H14M6 19V17H14V19H6M16 19V17H18V19H16Z",camera:"M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z",cctv:"M6.03 12.03L8.03 15.5L5.5 18.68L2 12.62L6.03 12.03M17 18V15.29C17.88 14.9 18.5 14.03 18.5 13C18.5 12.43 18.3 11.9 17.97 11.5L19.94 10.35C20.95 9.76 21.3 8.47 20.71 7.46L19.33 5.06C18.74 4.05 17.45 3.7 16.44 4.28L8.31 9C7.36 9.53 7.03 10.75 7.58 11.71L9.08 14.31C9.63 15.26 10.86 15.59 11.81 15.04L13.69 13.96C13.94 14.55 14.41 15.03 15 15.29V18C15 19.1 15.9 20 17 20H22V18H17Z",check:"M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z","chevron-down":"M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z","chevron-up":"M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z","clock-outline":"M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z",close:"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",cog:"M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z",curtains:"M23 3H1V1H23V3M2 22H6C6 19 4 17 4 17C10 13 11 4 11 4H2V22M22 4H13C13 4 14 13 20 17C20 17 18 19 18 22H22V4Z",delete:"M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z",doorbell:"M12 10C10.9 10 10 10.9 10 12S10.9 14 12 14 14 13.1 14 12 13.1 10 12 10M16 2H8C6.9 2 6 2.9 6 4V20C6 21.1 6.9 22 8 22H16C17.1 22 18 21.1 18 20V4C18 2.9 17.1 2 16 2M16 20H8V4H16V20Z","door-closed":"M16,11H18V13H16V11M12,3H19C20.11,3 21,3.89 21,5V19H22V21H2V19H10V5C10,3.89 10.89,3 12,3M12,5V19H19V5H12Z","door-open":"M12,3C10.89,3 10,3.89 10,5H3V19H2V21H22V19H21V5C21,3.89 20.11,3 19,3H12M12,5H19V19H12V5M5,11H7V13H5V11Z",grid:"M12 16C13.1 16 14 16.9 14 18S13.1 20 12 20 10 19.1 10 18 10.9 16 12 16M12 10C13.1 10 14 10.9 14 12S13.1 14 12 14 10 13.1 10 12 10.9 10 12 10M12 4C13.1 4 14 4.9 14 6S13.1 8 12 8 10 7.1 10 6 10.9 4 12 4M6 16C7.1 16 8 16.9 8 18S7.1 20 6 20 4 19.1 4 18 4.9 16 6 16M6 10C7.1 10 8 10.9 8 12S7.1 14 6 14 4 13.1 4 12 4.9 10 6 10M6 4C7.1 4 8 4.9 8 6S7.1 8 6 8 4 7.1 4 6 4.9 4 6 4M18 16C19.1 16 20 16.9 20 18S19.1 20 18 20 16 19.1 16 18 16.9 16 18 16M18 10C19.1 10 20 10.9 20 12S19.1 14 18 14 16 13.1 16 12 16.9 10 18 10M18 4C19.1 4 20 4.9 20 6S19.1 8 18 8 16 7.1 16 6 16.9 4 18 4Z",drag:"M7,19V17H9V19H7M11,19V17H13V19H11M15,19V17H17V19H15M7,15V13H9V15H7M11,15V13H13V15H11M15,15V13H17V15H15M7,11V9H9V11H7M11,11V9H13V11H11M15,11V9H17V11H15M7,7V5H9V7H7M11,7V5H13V7H11M15,7V5H17V7H15Z",fan:"M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z","fan-off":"M12.5,2C9.64,2 8.57,4.55 9.29,7.47L15,13.16C15.87,13.37 16.81,13.81 17.28,14.73C18.46,17.1 22.03,17 22.03,12.5C22.03,8.92 18.05,8.13 14.35,10.13C14.03,9.73 13.61,9.42 13.13,9.22C13.32,8.29 13.76,7.24 14.75,6.75C17.11,5.57 17,2 12.5,2M3.28,4L2,5.27L4.47,7.73C3.22,7.74 2,8.87 2,11.5C2,15.07 5.96,15.85 9.65,13.87C9.97,14.27 10.4,14.59 10.89,14.79C10.69,15.71 10.25,16.75 9.27,17.24C6.91,18.42 7,22 11.5,22C13.8,22 14.94,20.36 14.94,18.21L18.73,22L20,20.72L3.28,4Z",fire:"M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z",flash:"M7,2V13H10V22L17,10H13L17,2H7Z",title:"M5,4V7H10.5V19H13.5V7H19V4H5Z",garage:"M19,20H17V11H7V20H5V9L12,5L19,9V20M8,12H16V14H8V12M8,15H16V17H8V15M16,18V20H8V18H16Z","garage-open":"M19,20H17V11H7V20H5V9L12,5L19,9V20M8,12H16V14H8V12Z",home:"M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z","home-outline":jt,"image-plus":"M18 15V18H15V20H18V23H20V20H23V18H20V15H18M13.3 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5V13.3C20.4 13.1 19.7 13 19 13C17.9 13 16.8 13.3 15.9 13.9L14.5 12L11 16.5L8.5 13.5L5 18H13.1C13 18.3 13 18.7 13 19C13 19.7 13.1 20.4 13.3 21Z",image:"M19,19H5V5H19M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M13.96,12.29L11.21,15.83L9.25,13.47L6.5,17H17.5L13.96,12.29Z",layers:"M12,16L19.36,10.27L21,9L12,2L3,9L4.63,10.27M12,18.54L4.62,12.81L3,14.07L12,21.07L21,14.07L19.37,12.8L12,18.54Z",lightbulb:"M12,2A7,7 0 0,0 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H15A1,1 0 0,0 16,17V14.74C17.81,13.47 19,11.38 19,9A7,7 0 0,0 12,2M9,21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9V21Z","lightbulb-outline":Pt,"lightning-bolt":"M11 15H6L13 1V9H18L11 23V15Z",lock:"M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z","lock-open":"M18 1C15.24 1 13 3.24 13 6V8H4C2.9 8 2 8.89 2 10V20C2 21.11 2.9 22 4 22H16C17.11 22 18 21.11 18 20V10C18 8.9 17.11 8 16 8H15V6C15 4.34 16.34 3 18 3C19.66 3 21 4.34 21 6V8H23V6C23 3.24 20.76 1 18 1M10 13C11.1 13 12 13.89 12 15C12 16.11 11.11 17 10 17C8.9 17 8 16.11 8 15C8 13.9 8.9 13 10 13Z",magnify:"M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z","marker-plus":"M9,11.5A2.5,2.5 0 0,0 11.5,9A2.5,2.5 0 0,0 9,6.5A2.5,2.5 0 0,0 6.5,9A2.5,2.5 0 0,0 9,11.5M9,2C12.86,2 16,5.13 16,9C16,14.25 9,22 9,22C9,22 2,14.25 2,9A7,7 0 0,1 9,2M15,17H18V14H20V17H23V19H20V22H18V19H15V17Z",minus:"M19,13H5V11H19V13Z","motion-sensor":"M10,0.2C9,0.2 8.2,1 8.2,2C8.2,3 9,3.8 10,3.8C11,3.8 11.8,3 11.8,2C11.8,1 11,0.2 10,0.2M15.67,1A7.33,7.33 0 0,0 23,8.33V7A6,6 0 0,1 17,1H15.67M18.33,1C18.33,3.58 20.42,5.67 23,5.67V4.33C21.16,4.33 19.67,2.84 19.67,1H18.33M21,1A2,2 0 0,0 23,3V1H21M7.92,4.03C7.75,4.03 7.58,4.06 7.42,4.11L2,5.8V11H3.8V7.33L5.91,6.67L2,22H3.8L6.67,13.89L9,17V22H10.8V15.59L8.31,11.05L9.04,8.18L10.12,10H15V8.2H11.38L9.38,4.87C9.08,4.37 8.54,4.03 7.92,4.03Z","motion-sensor-off":"M11.4 8.2H15V10H13.2L11.4 8.2M19.67 1H18.33C18.33 3.58 20.42 5.67 23 5.67V4.33C21.16 4.33 19.67 2.84 19.67 1M21 1C21 2.11 21.9 3 23 3V1H21M17 1H15.67C15.67 5.05 18.95 8.33 23 8.33V7C19.69 7 17 4.31 17 1M10 3.8C11 3.8 11.8 3 11.8 2S11 .2 10 .2 8.2 1 8.2 2 9 3.8 10 3.8M2.39 1.73L1.11 3L3.46 5.35L2 5.8V11H3.8V7.33L5.05 6.94L5.68 7.57L2 22H3.8L6.67 13.89L9 17V22H10.8V15.59L8.31 11.05L8.5 10.37L20.84 22.73L22.11 21.46L2.39 1.73M9.38 4.87C9.08 4.37 8.54 4.03 7.92 4.03C7.75 4.03 7.58 4.06 7.42 4.11L7.34 4.14L11.35 8.15L9.38 4.87Z",palette:"M17.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,9A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 17.5,12M14.5,8A1.5,1.5 0 0,1 13,6.5A1.5,1.5 0 0,1 14.5,5A1.5,1.5 0 0,1 16,6.5A1.5,1.5 0 0,1 14.5,8M9.5,8A1.5,1.5 0 0,1 8,6.5A1.5,1.5 0 0,1 9.5,5A1.5,1.5 0 0,1 11,6.5A1.5,1.5 0 0,1 9.5,8M6.5,12A1.5,1.5 0 0,1 5,10.5A1.5,1.5 0 0,1 6.5,9A1.5,1.5 0 0,1 8,10.5A1.5,1.5 0 0,1 6.5,12M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A1.5,1.5 0 0,0 13.5,19.5C13.5,19.11 13.35,18.76 13.11,18.5C12.88,18.23 12.73,17.88 12.73,17.5A1.5,1.5 0 0,1 14.23,16H16A5,5 0 0,0 21,11C21,6.58 16.97,3 12,3Z",pause:"M14,19H18V5H14M6,19H10V5H6V19Z",pencil:"M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z",play:"M8,5.14V19.14L19,12.14L8,5.14Z",plus:"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z","power-plug":"M16,7V3H14V7H10V3H8V7H8C7,7 6,8 6,9V14.5L9.5,18V21H14.5V18L18,14.5V9C18,8 17,7 16,7Z","power-plug-off":"M20.84 22.73L15.31 17.2L14.5 18V21H9.5V18L6 14.5V9C6 8.7 6.1 8.41 6.25 8.14L1.11 3L2.39 1.73L22.11 21.46L20.84 22.73M18 14.5V9C18 8 17 7 16 7V3H14V7H10.2L17.85 14.65L18 14.5M10 3H8V4.8L10 6.8V3Z",power:"M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13",resize:"M10.59,12L14.59,8H11V6H18V13H16V9.41L12,13.41V16H20V4H8V12H10.59M22,2V18H12V22H2V12H6V2H22M10,14H4V20H10V14Z","robot-vacuum":"M12,2C14.65,2 17.19,3.06 19.07,4.93L17.65,6.35C16.15,4.85 14.12,4 12,4C9.88,4 7.84,4.84 6.35,6.35L4.93,4.93C6.81,3.06 9.35,2 12,2M3.66,6.5L5.11,7.94C4.39,9.17 4,10.57 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,10.57 19.61,9.17 18.88,7.94L20.34,6.5C21.42,8.12 22,10.04 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12C2,10.04 2.58,8.12 3.66,6.5M12,6A6,6 0 0,1 18,12C18,13.59 17.37,15.12 16.24,16.24L14.83,14.83C14.08,15.58 13.06,16 12,16C10.94,16 9.92,15.58 9.17,14.83L7.76,16.24C6.63,15.12 6,13.59 6,12A6,6 0 0,1 12,6M12,8A1,1 0 0,0 11,9A1,1 0 0,0 12,10A1,1 0 0,0 13,9A1,1 0 0,0 12,8Z","shield-home":"M11,13H13V16H16V11H18L12,6L6,11H8V16H11V13M12,1L21,5V11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1Z",snowflake:"M20.79,13.95L18.46,14.57L16.46,13.44V10.56L18.46,9.43L20.79,10.05L21.31,8.12L19.54,7.65L20,5.88L18.07,5.36L17.45,7.69L15.45,8.82L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L15.5,15.17L17.5,16.3L18.12,18.63L20,18.12L19.53,16.35L21.3,15.88L20.79,13.95M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44V10.56Z",sofa:"M12.5 7C12.5 5.89 13.39 5 14.5 5H18C19.1 5 20 5.9 20 7V9.16C18.84 9.57 18 10.67 18 11.97V14H12.5V7M6 11.96V14H11.5V7C11.5 5.89 10.61 5 9.5 5H6C4.9 5 4 5.9 4 7V9.15C5.16 9.56 6 10.67 6 11.96M20.66 10.03C19.68 10.19 19 11.12 19 12.12V15H5V12C5 10.9 4.11 10 3 10S1 10.9 1 12V17C1 18.1 1.9 19 3 19V21H5V19H19V21H21V19C22.1 19 23 18.1 23 17V12C23 10.79 21.91 9.82 20.66 10.03Z",speaker:"M12,12A3,3 0 0,0 9,15A3,3 0 0,0 12,18A3,3 0 0,0 15,15A3,3 0 0,0 12,12M12,20A5,5 0 0,1 7,15A5,5 0 0,1 12,10A5,5 0 0,1 17,15A5,5 0 0,1 12,20M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8C10.89,8 10,7.1 10,6C10,4.89 10.89,4 12,4M17,2H7C5.89,2 5,2.89 5,4V20A2,2 0 0,0 7,22H17A2,2 0 0,0 19,20V4C19,2.89 18.1,2 17,2Z",stop:"M18,18H6V6H18V18Z",television:"M21,17H3V5H21M21,3H3A2,2 0 0,0 1,5V17A2,2 0 0,0 3,19H8V21H16V19H21A2,2 0 0,0 23,17V5A2,2 0 0,0 21,3Z",thermometer:"M15 13V5A3 3 0 0 0 9 5V13A5 5 0 1 0 15 13M12 4A1 1 0 0 1 13 5V8H11V5A1 1 0 0 1 12 4Z","toggle-on":"M17,7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7M17,15A3,3 0 0,1 14,12A3,3 0 0,1 17,9A3,3 0 0,1 20,12A3,3 0 0,1 17,15Z","toggle-off":"M17,7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7M7,15A3,3 0 0,1 4,12A3,3 0 0,1 7,9A3,3 0 0,1 10,12A3,3 0 0,1 7,15Z",dashboard:"M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z",humidity:Bt,leak:Rt,"window-closed":"M6,11H10V9H14V11H18V4H6V11M18,13H6V20H18V13M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2Z","window-open":"M6,8H10V6H14V8H18V4H6V8M18,10H6V15H18V10M6,20H18V17H6V20M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2Z",bed:"M19,7H11V14H3V5H1V20H3V17H21V20H23V11A4,4 0 0,0 19,7M7,13A3,3 0 0,0 10,10A3,3 0 0,0 7,7A3,3 0 0,0 4,10A3,3 0 0,0 7,13Z",kitchen:"M11,9H9V2H7V9H5V2H3V9C3,11.12 4.66,12.84 6.75,12.97V22H9.25V12.97C11.34,12.84 13,11.12 13,9V2H11V9M16,6V14H18.5V22H21V2C18.24,2 16,4.24 16,6Z",shower:"M21,14V15C21,16.91 19.93,18.57 18.35,19.41L19,22H17L16.5,20C16.33,20 16.17,20 16,20H8C7.83,20 7.67,20 7.5,20L7,22H5L5.65,19.41C4.07,18.57 3,16.91 3,15V14H2V12H20V5A1,1 0 0,0 19,4C18.5,4 18.12,4.34 18,4.79C18.63,5.33 19,6.13 19,7H13A3,3 0 0,1 16,4C16.06,4 16.11,4 16.17,4C16.58,2.84 17.69,2 19,2A3,3 0 0,1 22,5V14H21V14M19,14H5V15A3,3 0 0,0 8,18H16A3,3 0 0,0 19,15V14Z",garden:"M11,21V16.74C10.53,16.91 10.03,17 9.5,17C7,17 5,15 5,12.5C5,11.23 5.5,10.09 6.36,9.27C6.13,8.73 6,8.13 6,7.5C6,5 8,3 10.5,3C12.06,3 13.44,3.8 14.25,5C14.33,5 14.41,5 14.5,5A5.5,5.5 0 0,1 20,10.5A5.5,5.5 0 0,1 14.5,16C14,16 13.5,15.93 13,15.79V21H11Z",car:"M5,11L6.5,6.5H17.5L19,11M17.5,16A1.5,1.5 0 0,1 16,14.5A1.5,1.5 0 0,1 17.5,13A1.5,1.5 0 0,1 19,14.5A1.5,1.5 0 0,1 17.5,16M6.5,16A1.5,1.5 0 0,1 5,14.5A1.5,1.5 0 0,1 6.5,13A1.5,1.5 0 0,1 8,14.5A1.5,1.5 0 0,1 6.5,16M18.92,6C18.72,5.42 18.16,5 17.5,5H6.5C5.84,5 5.28,5.42 5.08,6L3,12V20A1,1 0 0,0 4,21H5A1,1 0 0,0 6,20V19H18V20A1,1 0 0,0 19,21H20A1,1 0 0,0 21,20V12L18.92,6Z",pool:"M2,15C3.67,14.25 5.33,13.5 7,13.17V5A3,3 0 0,1 10,2C11.31,2 12.42,2.83 12.83,4H10A1,1 0 0,0 9,5V6H14V5A3,3 0 0,1 17,2C18.31,2 19.42,2.83 19.83,4H17A1,1 0 0,0 16,5V14.94C18,14.62 20,13 22,13V15C19.78,15 17.56,17 15.33,17C13.11,17 10.89,15 8.67,15C6.44,15 4.22,16 2,17V15M14,8H9V10H14V8M14,12H9V13C10.67,13.16 12.33,14.31 14,14.79V12M2,19C4.22,18 6.44,17 8.67,17C10.89,17 13.11,19 15.33,19C17.56,19 19.78,17 22,17V19C19.78,19 17.56,21 15.33,21C13.11,21 10.89,19 8.67,19C6.44,19 4.22,20 2,21V19Z",gamepad:"M7,6H17A6,6 0 0,1 23,12A6,6 0 0,1 17,18C15.22,18 13.63,17.23 12.53,16H11.47C10.37,17.23 8.78,18 7,18A6,6 0 0,1 1,12A6,6 0 0,1 7,6M6,9V11H4V13H6V15H8V13H10V11H8V9H6M15.5,12A1.5,1.5 0 0,0 14,13.5A1.5,1.5 0 0,0 15.5,15A1.5,1.5 0 0,0 17,13.5A1.5,1.5 0 0,0 15.5,12M18.5,9A1.5,1.5 0 0,0 17,10.5A1.5,1.5 0 0,0 18.5,12A1.5,1.5 0 0,0 20,10.5A1.5,1.5 0 0,0 18.5,9Z",desk:"M3 6H21C21.55 6 22 6.45 22 7C22 7.55 21.55 8 21 8V19H19V17H15V19H13V8H5V19H3V8C2.45 8 2 7.55 2 7C2 6.45 2.45 6 3 6M16 10.5V11H18V10.5C18 10.22 17.78 10 17.5 10H16.5C16.22 10 16 10.22 16 10.5M16 14.5V15H18V14.5C18 14.22 17.78 14 17.5 14H16.5C16.22 14 16 14.22 16 14.5Z",laundry:Wt,solar:"M11.45,2V5.55L15,3.77L11.45,2M10.45,8L8,10.46L11.75,11.71L10.45,8M2,11.45L3.77,15L5.55,11.45H2M10,2H2V10C2.57,10.17 3.17,10.25 3.77,10.25C7.35,10.26 10.26,7.35 10.27,3.75C10.26,3.16 10.17,2.57 10,2M17,22V16H14L19,7V13H22L17,22Z",battery:"M16 20H8V6H16M16.67 4H15V2H9V4H7.33C6.6 4 6 4.6 6 5.33V20.67C6 21.4 6.6 22 7.33 22H16.67C17.41 22 18 21.41 18 20.67V5.33C18 4.6 17.4 4 16.67 4M15 16H9V19H15V16M15 7H9V10H15V7M15 11.5H9V14.5H15V11.5Z",entrance:"M15 13L11 17V14H2V12H11V9L15 13M5 20V16H7V18H17V10.19L12 5.69L7.21 10H4.22L12 3L22 12H19V20H5Z",locate:"M12,2C15.31,2 18,4.66 18,7.95C18,12.41 12,19 12,19C12,19 6,12.41 6,7.95C6,4.66 8.69,2 12,2M12,6A2,2 0 0,0 10,8A2,2 0 0,0 12,10A2,2 0 0,0 14,8A2,2 0 0,0 12,6M20,19C20,21.21 16.42,23 12,23C7.58,23 4,21.21 4,19C4,17.71 5.22,16.56 7.11,15.83L7.75,16.74C6.67,17.19 6,17.81 6,18.5C6,19.88 8.69,21 12,21C15.31,21 18,19.88 18,18.5C18,17.81 17.33,17.19 16.25,16.74L16.89,15.83C18.78,16.56 20,17.71 20,19Z","play-circle":"M10,16.5V7.5L16,12M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",gauge:"M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12C20,14.4 19,16.5 17.3,18C15.9,16.7 14,16 12,16C10,16 8.2,16.7 6.7,18C5,16.5 4,14.4 4,12A8,8 0 0,1 12,4M14,5.89C13.62,5.9 13.26,6.15 13.1,6.54L11.81,9.77L11.71,10C11,10.13 10.41,10.6 10.14,11.26C9.73,12.29 10.23,13.45 11.26,13.86C12.29,14.27 13.45,13.77 13.86,12.74C14.12,12.08 14,11.32 13.57,10.76L13.67,10.5L14.96,7.29L14.97,7.26C15.17,6.75 14.92,6.17 14.41,5.96C14.28,5.91 14.15,5.89 14,5.89M10,6A1,1 0 0,0 9,7A1,1 0 0,0 10,8A1,1 0 0,0 11,7A1,1 0 0,0 10,6M7,9A1,1 0 0,0 6,10A1,1 0 0,0 7,11A1,1 0 0,0 8,10A1,1 0 0,0 7,9M17,9A1,1 0 0,0 16,10A1,1 0 0,0 17,11A1,1 0 0,0 18,10A1,1 0 0,0 17,9Z",eye:"M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z",night:Zt,crosshairs:"M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M3.05,13H1V11H3.05C3.5,6.83 6.83,3.5 11,3.05V1H13V3.05C17.17,3.5 20.5,6.83 20.95,11H23V13H20.95C20.5,17.17 17.17,20.5 13,20.95V23H11V20.95C6.83,20.5 3.5,17.17 3.05,13M12,5A7,7 0 0,0 5,12A7,7 0 0,0 12,19A7,7 0 0,0 19,12A7,7 0 0,0 12,5Z",backspace:"M19,15.59L17.59,17L14,13.41L10.41,17L9,15.59L12.59,12L9,8.41L10.41,7L14,10.59L17.59,7L19,8.41L15.41,12L19,15.59M22,3A2,2 0 0,1 24,5V19A2,2 0 0,1 22,21H7C6.31,21 5.77,20.64 5.41,20.11L0,12L5.41,3.88C5.77,3.35 6.31,3 7,3H22M22,5H7L2.28,12L7,19H22V5Z",leave:Tt,lamp:"M15,2L17,9H7L9,2M11,10H13V20H16V22H8V20H11V10Z","check-circle":"M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z",rooms:"M2,2H8V4H16V2H22V8H20V16H22V22H16V20H8V22H2V16H4V8H2V2M16,8V6H8V8H6V16H8V18H16V16H18V8H16M4,4V6H6V4H4M18,4V6H20V4H18M4,18V20H6V18H4M18,18V20H20V18H18Z","auto-fix":"M7.5,5.6L5,7L6.4,4.5L5,2L7.5,3.4L10,2L8.6,4.5L10,7L7.5,5.6M19.5,15.4L22,14L20.6,16.5L22,19L19.5,17.6L17,19L18.4,16.5L17,14L19.5,15.4M22,2L20.6,4.5L22,7L19.5,5.6L17,7L18.4,4.5L17,2L19.5,3.4L22,2M13.34,12.78L15.78,10.34L13.66,8.22L11.22,10.66L13.34,12.78M14.37,7.29L16.71,9.63C17.1,10 17.1,10.65 16.71,11.04L5.04,22.71C4.65,23.1 4,23.1 3.63,22.71L1.29,20.37C0.9,20 0.9,19.35 1.29,18.96L12.96,7.29C13.35,6.9 14,6.9 14.37,7.29Z",undo:"M12.5,8C9.85,8 7.45,9 5.6,10.6L2,7V16H11L7.38,12.38C8.77,11.22 10.54,10.5 12.5,10.5C16.04,10.5 19.05,12.81 20.1,16L22.47,15.22C21.08,11.03 17.15,8 12.5,8Z","w-sunny":"M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.36,17L5.12,13.23C5.26,14 5.53,14.78 5.95,15.5C6.37,16.24 6.91,16.86 7.5,17.37L3.36,17M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M20.64,17L16.5,17.36C17.09,16.85 17.62,16.22 18.04,15.5C18.46,14.77 18.73,14 18.87,13.21L20.64,17M12,22L9.59,18.56C10.33,18.83 11.14,19 12,19C12.82,19 13.63,18.83 14.37,18.56L12,22Z","w-clear-night":Zt,"w-partlycloudy":"M12.74,5.47C15.1,6.5 16.35,9.03 15.92,11.46C17.19,12.56 18,14.19 18,16V16.17C18.31,16.06 18.65,16 19,16A3,3 0 0,1 22,19A3,3 0 0,1 19,22H6A4,4 0 0,1 2,18A4,4 0 0,1 6,14H6.27C5,12.45 4.6,10.24 5.5,8.26C6.72,5.5 9.97,4.24 12.74,5.47M11.93,7.3C10.16,6.5 8.09,7.31 7.31,9.07C6.85,10.09 6.93,11.22 7.41,12.13C8.5,10.83 10.16,10 12,10C12.7,10 13.38,10.12 14,10.34C13.94,9.06 13.18,7.86 11.93,7.3M13.55,3.64C13,3.4 12.45,3.23 11.88,3.12L14.37,1.82L15.27,4.71C14.76,4.29 14.19,3.93 13.55,3.64M6.09,4.44C5.6,4.79 5.17,5.19 4.8,5.63L4.91,2.82L7.87,3.5C7.25,3.71 6.65,4.03 6.09,4.44M18,9.71C17.91,9.12 17.78,8.55 17.59,8L19.97,9.5L17.92,11.73C18.03,11.08 18.05,10.4 18,9.71M3.04,11.3C3.11,11.9 3.24,12.47 3.43,13L1.06,11.5L3.1,9.28C3,9.93 2.97,10.61 3.04,11.3M19,18H16V16A4,4 0 0,0 12,12A4,4 0 0,0 8,16H6A2,2 0 0,0 4,18A2,2 0 0,0 6,20H19A1,1 0 0,0 20,19A1,1 0 0,0 19,18Z","w-partlycloudy-night":"M22,10.28C21.74,10.3 21.5,10.31 21.26,10.31C19.32,10.31 17.39,9.57 15.91,8.09C14.25,6.44 13.5,4.19 13.72,2C13.77,1.53 13.22,1 12.71,1C12.57,1 12.44,1.04 12.32,1.12C12,1.36 11.66,1.64 11.36,1.94C9.05,4.24 8.55,7.66 9.84,10.46C8.31,11.11 7.13,12.43 6.69,14.06L6,14A4,4 0 0,0 2,18A4,4 0 0,0 6,22H19A3,3 0 0,0 22,19A3,3 0 0,0 19,16C18.42,16 17.88,16.16 17.42,16.45L17.5,15.5C17.5,15.28 17.5,15.05 17.46,14.83C19.14,14.67 20.77,13.94 22.06,12.64C22.38,12.34 22.64,12 22.88,11.68C23.27,11.13 22.65,10.28 22.04,10.28M19,18A1,1 0 0,1 20,19A1,1 0 0,1 19,20H6A2,2 0 0,1 4,18A2,2 0 0,1 6,16H8.5V15.5C8.5,13.94 9.53,12.64 10.94,12.18C11.1,12.13 11.26,12.09 11.43,12.06C11.61,12.03 11.8,12 12,12C12.23,12 12.45,12.03 12.66,12.07C12.73,12.08 12.8,12.1 12.87,12.13C13,12.16 13.15,12.2 13.28,12.25C13.36,12.28 13.44,12.32 13.5,12.36C13.63,12.41 13.74,12.47 13.84,12.54C13.92,12.59 14,12.64 14.07,12.7C14.17,12.77 14.25,12.84 14.34,12.92C14.41,13 14.5,13.05 14.55,13.12C14.63,13.2 14.69,13.29 14.76,13.37C14.82,13.45 14.89,13.53 14.94,13.62C15,13.71 15.04,13.8 15.09,13.9C15.14,14 15.2,14.08 15.24,14.18C15.41,14.59 15.5,15.03 15.5,15.5V18M16.83,12.86C15.9,11.16 14.08,10 12,10H11.87C11.41,9.19 11.14,8.26 11.14,7.29C11.14,6.31 11.39,5.37 11.86,4.55C12.21,6.41 13.12,8.14 14.5,9.5C15.86,10.88 17.58,11.79 19.45,12.14C18.66,12.6 17.76,12.84 16.83,12.86Z","w-cloudy":"M6,19A5,5 0 0,1 1,14A5,5 0 0,1 6,9C7,6.65 9.3,5 12,5C15.43,5 18.24,7.66 18.5,11.03L19,11A4,4 0 0,1 23,15A4,4 0 0,1 19,19H6M19,13H17V12A5,5 0 0,0 12,7C9.5,7 7.45,8.82 7.06,11.19C6.73,11.07 6.37,11 6,11A3,3 0 0,0 3,14A3,3 0 0,0 6,17H19A2,2 0 0,0 21,15A2,2 0 0,0 19,13Z","w-rainy":"M6,14.03A1,1 0 0,1 7,15.03C7,15.58 6.55,16.03 6,16.03C3.24,16.03 1,13.79 1,11.03C1,8.27 3.24,6.03 6,6.03C7,3.68 9.3,2.03 12,2.03C15.43,2.03 18.24,4.69 18.5,8.06L19,8.03A4,4 0 0,1 23,12.03C23,14.23 21.21,16.03 19,16.03H18C17.45,16.03 17,15.58 17,15.03C17,14.47 17.45,14.03 18,14.03H19A2,2 0 0,0 21,12.03A2,2 0 0,0 19,10.03H17V9.03C17,6.27 14.76,4.03 12,4.03C9.5,4.03 7.45,5.84 7.06,8.21C6.73,8.09 6.37,8.03 6,8.03A3,3 0 0,0 3,11.03A3,3 0 0,0 6,14.03M12,14.15C12.18,14.39 12.37,14.66 12.56,14.94C13,15.56 14,17.03 14,18C14,19.11 13.1,20 12,20A2,2 0 0,1 10,18C10,17.03 11,15.56 11.44,14.94C11.63,14.66 11.82,14.4 12,14.15M12,11.03L11.5,11.59C11.5,11.59 10.65,12.55 9.79,13.81C8.93,15.06 8,16.56 8,18A4,4 0 0,0 12,22A4,4 0 0,0 16,18C16,16.56 15.07,15.06 14.21,13.81C13.35,12.55 12.5,11.59 12.5,11.59","w-pouring":qt,"w-lightning":"M6,16A5,5 0 0,1 1,11A5,5 0 0,1 6,6C7,3.65 9.3,2 12,2C15.43,2 18.24,4.66 18.5,8.03L19,8A4,4 0 0,1 23,12A4,4 0 0,1 19,16H18A1,1 0 0,1 17,15A1,1 0 0,1 18,14H19A2,2 0 0,0 21,12A2,2 0 0,0 19,10H17V9A5,5 0 0,0 12,4C9.5,4 7.45,5.82 7.06,8.19C6.73,8.07 6.37,8 6,8A3,3 0 0,0 3,11A3,3 0 0,0 6,14H7A1,1 0 0,1 8,15A1,1 0 0,1 7,16H6M12,11H15L13,15H15L11.25,22L12,17H9.5L12,11Z","w-lightning-rainy":"M4.5,13.59C5,13.87 5.14,14.5 4.87,14.96C4.59,15.44 4,15.6 3.5,15.33V15.33C2,14.47 1,12.85 1,11A5,5 0 0,1 6,6C7,3.65 9.3,2 12,2C15.43,2 18.24,4.66 18.5,8.03L19,8A4,4 0 0,1 23,12A4,4 0 0,1 19,16A1,1 0 0,1 18,15A1,1 0 0,1 19,14A2,2 0 0,0 21,12A2,2 0 0,0 19,10H17V9A5,5 0 0,0 12,4C9.5,4 7.45,5.82 7.06,8.19C6.73,8.07 6.37,8 6,8A3,3 0 0,0 3,11C3,12.11 3.6,13.08 4.5,13.6V13.59M9.5,11H12.5L10.5,15H12.5L8.75,22L9.5,17H7L9.5,11M17.5,18.67C17.5,19.96 16.5,21 15.25,21C14,21 13,19.96 13,18.67C13,17.12 15.25,14.5 15.25,14.5C15.25,14.5 17.5,17.12 17.5,18.67Z","w-snowy":"M6,14A1,1 0 0,1 7,15A1,1 0 0,1 6,16A5,5 0 0,1 1,11A5,5 0 0,1 6,6C7,3.65 9.3,2 12,2C15.43,2 18.24,4.66 18.5,8.03L19,8A4,4 0 0,1 23,12A4,4 0 0,1 19,16H18A1,1 0 0,1 17,15A1,1 0 0,1 18,14H19A2,2 0 0,0 21,12A2,2 0 0,0 19,10H17V9A5,5 0 0,0 12,4C9.5,4 7.45,5.82 7.06,8.19C6.73,8.07 6.37,8 6,8A3,3 0 0,0 3,11A3,3 0 0,0 6,14M7.88,18.07L10.07,17.5L8.46,15.88C8.07,15.5 8.07,14.86 8.46,14.46C8.85,14.07 9.5,14.07 9.88,14.46L11.5,16.07L12.07,13.88C12.21,13.34 12.76,13.03 13.29,13.17C13.83,13.31 14.14,13.86 14,14.4L13.41,16.59L15.6,16C16.14,15.86 16.69,16.17 16.83,16.71C16.97,17.24 16.66,17.79 16.12,17.93L13.93,18.5L15.54,20.12C15.93,20.5 15.93,21.15 15.54,21.54C15.15,21.93 14.5,21.93 14.12,21.54L12.5,19.93L11.93,22.12C11.79,22.66 11.24,22.97 10.71,22.83C10.17,22.69 9.86,22.14 10,21.6L10.59,19.41L8.4,20C7.86,20.14 7.31,19.83 7.17,19.29C7.03,18.76 7.34,18.21 7.88,18.07Z","w-fog":"M3,15H13A1,1 0 0,1 14,16A1,1 0 0,1 13,17H3A1,1 0 0,1 2,16A1,1 0 0,1 3,15M16,15H21A1,1 0 0,1 22,16A1,1 0 0,1 21,17H16A1,1 0 0,1 15,16A1,1 0 0,1 16,15M1,12A5,5 0 0,1 6,7C7,4.65 9.3,3 12,3C15.43,3 18.24,5.66 18.5,9.03L19,9C21.19,9 22.97,10.76 23,13H21A2,2 0 0,0 19,11H17V10A5,5 0 0,0 12,5C9.5,5 7.45,6.82 7.06,9.19C6.73,9.07 6.37,9 6,9A3,3 0 0,0 3,12C3,12.35 3.06,12.69 3.17,13H1.1L1,12M3,19H5A1,1 0 0,1 6,20A1,1 0 0,1 5,21H3A1,1 0 0,1 2,20A1,1 0 0,1 3,19M8,19H21A1,1 0 0,1 22,20A1,1 0 0,1 21,21H8A1,1 0 0,1 7,20A1,1 0 0,1 8,19Z","w-windy":Ut,mosque:"M24 7C24 5.9 22 4 22 4S20 5.9 20 7C20 7.7 20.4 8.4 21 8.7V13H19V11C19 10.1 18.3 9.3 17.5 9.1C17.8 8.5 18 7.9 18 7.1C18 5.8 17.4 4.6 16.3 3.9L12 1L7.7 3.8C6.7 4.6 6 5.8 6 7.1C6 7.8 6.2 8.5 6.6 9.1C5.7 9.3 5 10.1 5 11V13H3V8.7C3.6 8.4 4 7.7 4 7C4 5.9 2 4 2 4S0 5.9 0 7C0 7.7 .4 8.4 1 8.7V21H11V17C11 16.5 11.4 16 12 16S13 16.5 13 17V21H23V8.7C23.6 8.4 24 7.7 24 7M8.9 5.5L12 3.4L15.1 5.5C15.7 5.9 16 6.4 16 7.1C16 8.1 15.1 9 14.1 9H9.9C8.9 9 8 8.1 8 7.1C8 6.4 8.3 5.9 8.9 5.5M21 19H15V17C15 15.4 13.6 14 12 14S9 15.4 9 17V19H3V15H7V11H17V15H21V19Z",coffee:"M2,21V19H20V21H2M20,8V5H18V8H20M20,3A2,2 0 0,1 22,5V8A2,2 0 0,1 20,10H18V13A4,4 0 0,1 14,17H8A4,4 0 0,1 4,13V3H20M16,5H6V13A2,2 0 0,0 8,15H14A2,2 0 0,0 16,13V5Z",tower:"M8.28,5.45L6.5,4.55L7.76,2H16.23L17.5,4.55L15.72,5.44L15,4H9L8.28,5.45M18.62,8H14.09L13.3,5H10.7L9.91,8H5.38L4.1,10.55L5.89,11.44L6.62,10H17.38L18.1,11.45L19.89,10.56L18.62,8M17.77,22H15.7L15.46,21.1L12,15.9L8.53,21.1L8.3,22H6.23L9.12,11H11.19L10.83,12.35L12,14.1L13.16,12.35L12.81,11H14.88L17.77,22M11.4,15L10.5,13.65L9.32,18.13L11.4,15M14.68,18.12L13.5,13.64L12.6,15L14.68,18.12Z",family:"M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z",todo:"M3,5H9V11H3V5M5,7V9H7V7H5M11,7H21V9H11V7M11,15H21V17H11V15M5,20L1.5,16.5L2.91,15.09L5,17.17L9.59,12.59L11,14L5,20Z",calendar:"M9,10V12H7V10H9M13,10V12H11V10H13M17,10V12H15V10H17M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H6V1H8V3H16V1H18V3H19M19,19V8H5V19H19M9,14V16H7V14H9M13,14V16H11V14H13M17,14V16H15V14H17Z",countdown:"M6,2H18V8H18V8L14,12L18,16V16H18V22H6V16H6V16L10,12L6,8V8H6V2M16,16.5L12,12.5L8,16.5V20H16V16.5M12,11.5L16,7.5V4H8V7.5L12,11.5M10,6H14V6.75L12,8.75L10,6.75V6Z",message:"M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M6,9H18V11H6M14,14H6V12H14M18,8H6V6H18",child:"M12,2A3,3 0 0,1 15,5A3,3 0 0,1 12,8A3,3 0 0,1 9,5A3,3 0 0,1 12,2M11,22H8V16H6V9H18V16H16V22H13V18H11V22Z","circle-outline":"M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z","circle-check":"M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",send:"M2,21L23,12L2,3V10L17,12L2,14V21Z",person:"M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z",pill:"M4.22,11.29L11.29,4.22C13.64,1.88 17.43,1.88 19.78,4.22C22.12,6.56 22.12,10.36 19.78,12.71L12.71,19.78C10.36,22.12 6.56,22.12 4.22,19.78C1.88,17.43 1.88,13.64 4.22,11.29M5.64,12.71C4.59,13.75 4.24,15.24 4.6,16.57L10.59,10.59L14.83,14.83L18.36,11.29C19.93,9.73 19.93,7.2 18.36,5.64C16.8,4.07 14.27,4.07 12.71,5.64L5.64,12.71Z",gate:"M9 6V11H7V7H5V11H3V9H1V21H3V19H5V21H7V19H9V21H11V19H13V21H15V19H17V21H19V19H21V21H23V9H21V11H19V7H17V11H15V6H13V11H11V6H9M3 13H5V17H3V13M7 13H9V17H7V13M11 13H13V17H11V13M15 13H17V17H15V13M19 13H21V17H19V13Z","gate-open":"M7 21V7H5V11H3V9H1V21H3V19H5V21H7M3 17V13H5V17H3M21 9V11H19V7H17V21H19V19H21V21H23V9H21M21 17H19V13H21V17Z",gas:"M16,9V14L16,20A2,2 0 0,1 14,22H10A2,2 0 0,1 8,20V14L8,9C8,7.14 9.27,5.57 11,5.13V4H9V2H15V4H13V5.13C14.73,5.57 16,7.14 16,9Z",pump:"M19,14.5C19,14.5 21,16.67 21,18A2,2 0 0,1 19,20A2,2 0 0,1 17,18C17,16.67 19,14.5 19,14.5M5,18V9A2,2 0 0,1 3,7A2,2 0 0,1 5,5V4A2,2 0 0,1 7,2H9A2,2 0 0,1 11,4V5H19A2,2 0 0,1 21,7V9L21,11A1,1 0 0,1 22,12A1,1 0 0,1 21,13H17A1,1 0 0,1 16,12A1,1 0 0,1 17,11V9H11V18H12A2,2 0 0,1 14,20V22H2V20A2,2 0 0,1 4,18H5Z",automation:"M22 14H21C21 10.13 17.87 7 14 7H13V5.73C13.6 5.39 14 4.74 14 4C14 2.9 13.11 2 12 2S10 2.9 10 4C10 4.74 10.4 5.39 11 5.73V7H10C6.13 7 3 10.13 3 14H2C1.45 14 1 14.45 1 15V18C1 18.55 1.45 19 2 19H3V20C3 21.11 3.9 22 5 22H19C20.11 22 21 21.11 21 20V19H22C22.55 19 23 18.55 23 18V15C23 14.45 22.55 14 22 14M9.79 16.5C9.4 15.62 8.53 15 7.5 15S5.6 15.62 5.21 16.5C5.08 16.19 5 15.86 5 15.5C5 14.12 6.12 13 7.5 13S10 14.12 10 15.5C10 15.86 9.92 16.19 9.79 16.5M18.79 16.5C18.4 15.62 17.5 15 16.5 15S14.6 15.62 14.21 16.5C14.08 16.19 14 15.86 14 15.5C14 14.12 15.12 13 16.5 13S19 14.12 19 15.5C19 15.86 18.92 16.19 18.79 16.5Z",package:"M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L10.11,5.22L16,8.61L17.96,7.5L12,4.15M6.04,7.5L12,10.85L13.96,9.75L8.08,6.35L6.04,7.5M5,15.91L11,19.29V12.58L5,9.21V15.91M19,15.91V9.21L13,12.58V19.29L19,15.91Z",dog:"M18,4C16.29,4 15.25,4.33 14.65,4.61C13.88,4.23 13,4 12,4C11,4 10.12,4.23 9.35,4.61C8.75,4.33 7.71,4 6,4C3,4 1,12 1,14C1,14.83 2.32,15.59 4.14,15.9C4.78,18.14 7.8,19.85 11.5,20V15.72C10.91,15.35 10,14.68 10,14C10,13 12,13 12,13C12,13 14,13 14,14C14,14.68 13.09,15.35 12.5,15.72V20C16.2,19.85 19.22,18.14 19.86,15.9C21.68,15.59 23,14.83 23,14C23,12 21,4 18,4M4.15,13.87C3.65,13.75 3.26,13.61 3,13.5C3.25,10.73 5.2,6.4 6.05,6C6.59,6 7,6.06 7.37,6.11C5.27,8.42 4.44,12.04 4.15,13.87M9,12A1,1 0 0,1 8,11C8,10.46 8.45,10 9,10A1,1 0 0,1 10,11C10,11.56 9.55,12 9,12M15,12A1,1 0 0,1 14,11C14,10.46 14.45,10 15,10A1,1 0 0,1 16,11C16,11.56 15.55,12 15,12M19.85,13.87C19.56,12.04 18.73,8.42 16.63,6.11C17,6.06 17.41,6 17.95,6C18.8,6.4 20.75,10.73 21,13.5C20.75,13.61 20.36,13.75 19.85,13.87Z",cat:"M12,8L10.67,8.09C9.81,7.07 7.4,4.5 5,4.5C5,4.5 3.03,7.46 4.96,11.41C4.41,12.24 4.07,12.67 4,13.66L2.07,13.95L2.28,14.93L4.04,14.67L4.18,15.38L2.61,16.32L3.08,17.21L4.53,16.32C5.68,18.76 8.59,20 12,20C15.41,20 18.32,18.76 19.47,16.32L20.92,17.21L21.39,16.32L19.82,15.38L19.96,14.67L21.72,14.93L21.93,13.95L20,13.66C19.93,12.67 19.59,12.24 19.04,11.41C20.97,7.46 19,4.5 19,4.5C16.6,4.5 14.19,7.07 13.33,8.09L12,8M9,11A1,1 0 0,1 10,12A1,1 0 0,1 9,13A1,1 0 0,1 8,12A1,1 0 0,1 9,11M15,11A1,1 0 0,1 16,12A1,1 0 0,1 15,13A1,1 0 0,1 14,12A1,1 0 0,1 15,11M11,14H13L12.3,15.39C12.5,16.03 13.06,16.5 13.75,16.5A1.5,1.5 0 0,0 15.25,15H15.75A2,2 0 0,1 13.75,17C13,17 12.35,16.59 12,16V16H12C11.65,16.59 11,17 10.25,17A2,2 0 0,1 8.25,15H8.75A1.5,1.5 0 0,0 10.25,16.5C10.94,16.5 11.5,16.03 11.7,15.39L11,14Z",schedule:"M15,13H16.5V15.82L18.94,17.23L18.19,18.53L15,16.69V13M19,8H5V19H9.67C9.24,18.09 9,17.07 9,16A7,7 0 0,1 16,9C17.07,9 18.09,9.24 19,9.67V8M5,21C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H6V1H8V3H16V1H18V3H19A2,2 0 0,1 21,5V11.1C22.24,12.36 23,14.09 23,16A7,7 0 0,1 16,23C14.09,23 12.36,22.24 11.1,21H5M16,11.15A4.85,4.85 0 0,0 11.15,16C11.15,18.68 13.32,20.85 16,20.85A4.85,4.85 0 0,0 20.85,16C20.85,13.32 18.68,11.15 16,11.15Z",history:"M13.5,8H12V13L16.28,15.54L17,14.33L13.5,12.25V8M13,3A9,9 0 0,0 4,12H1L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3",sun:"M3.55 19.09L4.96 20.5L6.76 18.71L5.34 17.29M12 6C8.69 6 6 8.69 6 12S8.69 18 12 18 18 15.31 18 12C18 8.68 15.31 6 12 6M20 13H23V11H20M17.24 18.71L19.04 20.5L20.45 19.09L18.66 17.29M20.45 5L19.04 3.6L17.24 5.39L18.66 6.81M13 1H11V4H13M6.76 5.39L4.96 3.6L3.55 5L5.34 6.81L6.76 5.39M1 13H4V11H1M13 20H11V23H13",guests:"M15,14C12.3,14 7,15.3 7,18V20H23V18C23,15.3 17.7,14 15,14M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12M5,15L4.4,14.5C2.4,12.6 1,11.4 1,9.9C1,8.7 2,7.7 3.2,7.7C3.9,7.7 4.6,8 5,8.5C5.4,8 6.1,7.7 6.8,7.7C8,7.7 9,8.6 9,9.9C9,11.4 7.6,12.6 5.6,14.5L5,15Z",cube:"M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L6.04,7.5L12,10.85L17.96,7.5L12,4.15Z","humidity-alert":"M20 7V13H18V7H20M18 17H20V15H18V17M10 3.25C10 3.25 4 10 4 14C4 17.32 6.69 20 10 20S16 17.31 16 14C16 10 10 3.25 10 3.25M7.75 10C8.44 10 9 10.56 9 11.25S8.44 12.5 7.75 12.5 6.5 11.94 6.5 11.25 7.06 10 7.75 10M12.25 17C11.56 17 11 16.44 11 15.75S11.56 14.5 12.25 14.5 13.5 15.06 13.5 15.75 12.94 17 12.25 17M7.53 17.03L6.47 15.97L12.47 9.97L13.53 11.03L7.53 17.03Z",co2:"M5,7A2,2 0 0,0 3,9V15A2,2 0 0,0 5,17H8V15H5V9H8V7H5M11,7A2,2 0 0,0 9,9V15A2,2 0 0,0 11,17H13A2,2 0 0,0 15,15V9A2,2 0 0,0 13,7H11M11,9H13V15H11V9M16,10.5V12H19V13.5H17.5A1.5,1.5 0 0,0 16,15V18H20.5V16.5H17.5V15H19A1.5,1.5 0 0,0 20.5,13.5V12A1.5,1.5 0 0,0 19,10.5H16Z",wifi:"M12,21L15.6,16.2C14.6,15.45 13.35,15 12,15C10.65,15 9.4,15.45 8.4,16.2L12,21M12,3C7.95,3 4.21,4.34 1.2,6.6L3,9C5.5,7.12 8.62,6 12,6C15.38,6 18.5,7.12 21,9L22.8,6.6C19.79,4.34 16.05,3 12,3M12,9C9.3,9 6.81,9.89 4.8,11.4L6.6,13.8C8.1,12.67 9.97,12 12,12C14.03,12 15.9,12.67 17.4,13.8L19.2,11.4C17.19,9.89 14.7,9 12,9Z",next:It,prev:"M6,18V6H8V18H6M9.5,12L18,6V18L9.5,12Z","vol-up":"M3,9H7L12,4V20L7,15H3V9M14,11H17V8H19V11H22V13H19V16H17V13H14V11Z","vol-down":"M3,9H7L12,4V20L7,15H3V9M14,11H22V13H14V11Z","vol-mute":"M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z",volume:"M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z","chevron-left":"M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z","chevron-right":"M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z",ok:"M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",return:"M19,7V11H5.83L9.41,7.41L8,6L2,12L8,18L9.41,16.58L5.83,13H21V7H19Z",movie:"M20.84 2.18L16.91 2.96L19.65 6.5L21.62 6.1L20.84 2.18M13.97 3.54L12 3.93L14.75 7.46L16.71 7.07L13.97 3.54M9.07 4.5L7.1 4.91L9.85 8.44L11.81 8.05L9.07 4.5M4.16 5.5L3.18 5.69A2 2 0 0 0 1.61 8.04L2 10L6.9 9.03L4.16 5.5M2 10V20C2 21.11 2.9 22 4 22H20C21.11 22 22 21.11 22 20V10H2Z",bullhorn:"M12,8H4A2,2 0 0,0 2,10V14A2,2 0 0,0 4,16H5V20A1,1 0 0,0 6,21H8A1,1 0 0,0 9,20V16H12L17,20V4L12,8M21.5,12C21.5,13.71 20.54,15.26 19,16V8C20.53,8.75 21.5,10.3 21.5,12Z",export:"M23,12L19,8V11H10V13H19V16M1,18V6C1,4.89 1.9,4 3,4H15A2,2 0 0,1 17,6V9H15V6H3V18H15V15H17V18A2,2 0 0,1 15,20H3A2,2 0 0,1 1,18Z",import:"M14,12L10,8V11H2V13H10V16M20,18V6C20,4.89 19.1,4 18,4H6A2,2 0 0,0 4,6V9H6V6H18V18H6V15H4V18A2,2 0 0,0 6,20H18A2,2 0 0,0 20,18Z",wrench:"M22.7,19L13.6,9.9C14.5,7.6 14,4.9 12.1,3C10.1,1 7.1,0.6 4.7,1.7L9,6L6,9L1.6,4.7C0.4,7.1 0.9,10.1 2.9,12.1C4.8,14 7.5,14.5 9.8,13.6L18.9,22.7C19.3,23.1 19.9,23.1 20.3,22.7L22.6,20.4C23.1,20 23.1,19.3 22.7,19Z",star:"M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z","star-outline":Et,"speaker-multi":"M14,10A3,3 0 0,0 11,13A3,3 0 0,0 14,16A3,3 0 0,0 17,13A3,3 0 0,0 14,10M14,18A5,5 0 0,1 9,13A5,5 0 0,1 14,8A5,5 0 0,1 19,13A5,5 0 0,1 14,18M14,2A2,2 0 0,1 16,4A2,2 0 0,1 14,6A2,2 0 0,1 12,4A2,2 0 0,1 14,2M19,0H9A2,2 0 0,0 7,2V18A2,2 0 0,0 9,20H19A2,2 0 0,0 21,18V2A2,2 0 0,0 19,0M5,22H17V24H5A2,2 0 0,1 3,22V4H5",menu:"M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z",assistant:"M19,1L17.74,3.75L15,5L17.74,6.26L19,9L20.25,6.26L23,5L20.25,3.75M9,4L6.5,9.5L1,12L6.5,14.5L9,20L11.5,14.5L17,12L11.5,9.5M19,15L17.74,17.74L15,19L17.74,20.25L19,23L20.25,20.25L23,19L20.25,17.74",microphone:"M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z","lightbulb-auto":"M9 2C12.87 2 16 5.13 16 9C16 11.38 14.81 13.47 13 14.74V17C13 17.55 12.55 18 12 18H6C5.45 18 5 17.55 5 17V14.74C3.19 13.47 2 11.38 2 9C2 5.13 5.13 2 9 2M6 21V20H12V21C12 21.55 11.55 22 11 22H7C6.45 22 6 21.55 6 21M9 4C6.24 4 4 6.24 4 9C4 11.05 5.23 12.81 7 13.58V16H11V13.58C12.77 12.81 14 11.05 14 9C14 6.24 11.76 4 9 4M19 13H17L13.8 22H15.7L16.4 20H19.6L20.3 22H22.2L19 13M16.85 18.65L18 15L19.15 18.65H16.85Z",water:"M12,20A6,6 0 0,1 6,14C6,10 12,3.25 12,3.25C12,3.25 18,10 18,14A6,6 0 0,1 12,20Z","water-alert":Rt,valve:"M4 22H2V2H4M22 2H20V22H22M17.24 5.34L13.24 9.34A3 3 0 0 0 9.24 13.34L5.24 17.34L6.66 18.76L10.66 14.76A3 3 0 0 0 14.66 10.76L18.66 6.76Z",floors:"M12 0L3 7L4.63 8.27L12 14L19.36 8.27L21 7L12 0M19.37 10.73L12 16.47L4.62 10.74L3 12L12 19L21 12L19.37 10.73M19.37 15.73L12 21.47L4.62 15.74L3 17L12 24L21 17L19.37 15.73Z",airplane:"M20.56 3.91C21.15 4.5 21.15 5.45 20.56 6.03L16.67 9.92L18.79 19.11L17.38 20.53L13.5 13.1L9.6 17L9.96 19.47L8.89 20.53L7.13 17.35L3.94 15.58L5 14.5L7.5 14.87L11.37 11L3.94 7.09L5.36 5.68L14.55 7.8L18.44 3.91C19 3.33 20 3.33 20.56 3.91Z","alarm-light":"M6,6.9L3.87,4.78L5.28,3.37L7.4,5.5L6,6.9M13,1V4H11V1H13M20.13,4.78L18,6.9L16.6,5.5L18.72,3.37L20.13,4.78M4.5,10.5V12.5H1.5V10.5H4.5M19.5,10.5H22.5V12.5H19.5V10.5M6,20H18A2,2 0 0,1 20,22H4A2,2 0 0,1 6,20M12,5A6,6 0 0,1 18,11V19H6V11A6,6 0 0,1 12,5Z",phone:"M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z","shield-off":"M1,4.27L3,6.27V11C3,16.55 6.84,21.74 12,23C13.87,22.54 15.57,21.56 16.97,20.24L19.23,22.5L20.5,21.22L2.28,3L1,4.27M12,21C8.25,20 5,15.54 5,11.22V8.27L15.59,18.86C14.53,19.89 13.3,20.65 12,21M21,5V11C21,13.28 20.35,15.5 19.23,17.4L17.77,15.95C18.54,14.5 19,12.84 19,11.22V6.3L12,3.18L7.16,5.34L5.65,3.82L12,1L21,5Z","weather-windy":Ut,"weather-pouring":qt,"weather-sunset-up":"M3,12H7A5,5 0 0,1 12,7A5,5 0 0,1 17,12H21A1,1 0 0,1 22,13A1,1 0 0,1 21,14H3A1,1 0 0,1 2,13A1,1 0 0,1 3,12M15,12A3,3 0 0,0 12,9A3,3 0 0,0 9,12H15M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M12.71,16.3L15.82,19.41C16.21,19.8 16.21,20.43 15.82,20.82C15.43,21.21 14.8,21.21 14.41,20.82L12,18.41L9.59,20.82C9.2,21.21 8.57,21.21 8.18,20.82C7.79,20.43 7.79,19.8 8.18,19.41L11.29,16.3C11.5,16.1 11.74,16 12,16C12.26,16 12.5,16.1 12.71,16.3Z","air-filter":"M19,18.31V20A2,2 0 0,1 17,22H7A2,2 0 0,1 5,20V16.3C4.54,16.12 3.95,16 3,16A1,1 0 0,1 2,15A1,1 0 0,1 3,14C3.82,14 4.47,14.08 5,14.21V12.3C4.54,12.12 3.95,12 3,12A1,1 0 0,1 2,11A1,1 0 0,1 3,10C3.82,10 4.47,10.08 5,10.21V8.3C4.54,8.12 3.95,8 3,8A1,1 0 0,1 2,7A1,1 0 0,1 3,6C3.82,6 4.47,6.08 5,6.21V4A2,2 0 0,1 7,2H17A2,2 0 0,1 19,4V6.16C20.78,6.47 21.54,7.13 21.71,7.29C22.1,7.68 22.1,8.32 21.71,8.71C21.32,9.1 20.8,9.09 20.29,8.71V8.71C20.29,8.71 19.25,8 17,8C15.74,8 14.91,8.41 13.95,8.9C12.91,9.41 11.74,10 10,10C9.64,10 9.31,10 9,9.96V7.95C9.3,8 9.63,8 10,8C11.26,8 12.09,7.59 13.05,7.11C14.09,6.59 15.27,6 17,6V4H7V20H17V18C18.5,18 18.97,18.29 19,18.31M17,10C15.27,10 14.09,10.59 13.05,11.11C12.09,11.59 11.26,12 10,12C9.63,12 9.3,12 9,11.95V13.96C9.31,14 9.64,14 10,14C11.74,14 12.91,13.41 13.95,12.9C14.91,12.42 15.74,12 17,12C19.25,12 20.29,12.71 20.29,12.71V12.71C20.8,13.1 21.32,13.1 21.71,12.71C22.1,12.32 22.1,11.69 21.71,11.29C21.5,11.08 20.25,10 17,10M17,14C15.27,14 14.09,14.59 13.05,15.11C12.09,15.59 11.26,16 10,16C9.63,16 9.3,16 9,15.95V17.96C9.31,18 9.64,18 10,18C11.74,18 12.91,17.41 13.95,16.9C14.91,16.42 15.74,16 17,16C19.25,16 20.29,16.71 20.29,16.71V16.71C20.8,17.1 21.32,17.1 21.71,16.71C22.1,16.32 22.1,15.69 21.71,15.29C21.5,15.08 20.25,14 17,14Z",leaf:"M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z","air-purifier":"M11,9A4,4 0 0,1 15,13A4,4 0 0,1 11,17A4,4 0 0,1 7,13A4,4 0 0,1 11,9M11,11A2,2 0 0,0 9,13A2,2 0 0,0 11,15A2,2 0 0,0 13,13A2,2 0 0,0 11,11M7,4H14A4,4 0 0,1 18,8V9H16V8A2,2 0 0,0 14,6H7A2,2 0 0,0 5,8V20H16V18H18V22H3V8A4,4 0 0,1 7,4M16,11C18.5,11 18.5,9 21,9V11C18.5,11 18.5,13 16,13V11M16,15C18.5,15 18.5,13 21,13V15C18.5,15 18.5,17 16,17V15Z",whatsapp:"M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.71C7 10.93 7.89 12.1 8 12.27C8.14 12.44 9.76 14.94 12.25 16C12.84 16.27 13.3 16.42 13.66 16.53C14.25 16.72 14.79 16.69 15.22 16.63C15.7 16.56 16.68 16.03 16.89 15.45C17.1 14.87 17.1 14.38 17.04 14.27C16.97 14.17 16.81 14.11 16.56 14C16.31 13.86 15.09 13.26 14.87 13.18C14.64 13.1 14.5 13.06 14.31 13.3C14.15 13.55 13.67 14.11 13.53 14.27C13.38 14.44 13.24 14.46 13 14.34C12.74 14.21 11.94 13.95 11 13.11C10.26 12.45 9.77 11.64 9.62 11.39C9.5 11.15 9.61 11 9.73 10.89C9.84 10.78 10 10.6 10.1 10.45C10.23 10.31 10.27 10.2 10.35 10.04C10.43 9.87 10.39 9.73 10.33 9.61C10.27 9.5 9.77 8.26 9.56 7.77C9.36 7.29 9.16 7.35 9 7.34C8.86 7.34 8.7 7.33 8.53 7.33Z","file-chart":"M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2M18 20H6V4H13V9H18V20M9 13V19H7V13H9M15 15V19H17V15H15M11 11V19H13V11H11Z",paw:"M8.35,3C9.53,2.83 10.78,4.12 11.14,5.9C11.5,7.67 10.85,9.25 9.67,9.43C8.5,9.61 7.24,8.32 6.87,6.54C6.5,4.77 7.17,3.19 8.35,3M15.5,3C16.69,3.19 17.35,4.77 17,6.54C16.62,8.32 15.37,9.61 14.19,9.43C13,9.25 12.35,7.67 12.72,5.9C13.08,4.12 14.33,2.83 15.5,3M3,7.6C4.14,7.11 5.69,8 6.5,9.55C7.26,11.13 7,12.79 5.87,13.28C4.74,13.77 3.2,12.89 2.41,11.32C1.62,9.75 1.9,8.08 3,7.6M21,7.6C22.1,8.08 22.38,9.75 21.59,11.32C20.8,12.89 19.26,13.77 18.13,13.28C17,12.79 16.74,11.13 17.5,9.55C18.31,8 19.86,7.11 21,7.6M19.33,18.38C19.37,19.32 18.65,20.36 17.79,20.75C16,21.57 13.88,19.87 11.89,19.87C9.9,19.87 7.76,21.64 6,20.75C5,20.26 4.31,18.96 4.44,17.88C4.62,16.39 6.41,15.59 7.47,14.5C8.88,13.09 9.88,10.44 11.89,10.44C13.89,10.44 14.95,13.05 16.3,14.5C17.41,15.72 19.26,16.75 19.33,18.38Z",sprinkler:"M10 10H14V22H10V10M7 9H9V7H7V9M4 8H6V6H4V8M4 11H6V9H4V11M1 13H3V11H1V13M1 7H3V5H1V7M1 10H3V8H1V10M18 11H20V9H18V11M21 10H23V8H21V10M21 5V7H23V5H21M21 13H23V11H21V13M15 9H17V7H15V9M18 8H20V6H18V8M10 7H10.33L11 9H13L13.67 7H14V6H10V7Z",key:"M12.67 13.67C12.2 14.13 11.63 14.5 11 14.73V23H8V21H5V18H8V14.72C6.26 14.1 5 12.46 5 10.5C5 8 7 6 9.5 6C9.54 6 9.57 6 9.6 6C9.13 6.95 8.92 8 9.03 9.08C8.44 9.28 8 9.84 8 10.5C8 11.33 8.67 12 9.5 12C9.73 12 9.95 11.94 10.15 11.85C10.79 12.69 11.67 13.32 12.67 13.67M20.73 19.44L17.97 20.6L17.19 18.76L14.43 19.93L13.26 17.16L16.03 16L14.76 13C12.91 13.08 11.11 12.05 10.35 10.25C9.39 7.96 10.47 5.32 12.76 4.35C13 4.25 13.26 4.18 13.5 4.12C12.84 2.87 11.5 2 10 2C7.79 2 6 3.79 6 6C6 6.08 6 6.16 6 6.24C5.7 6.5 5.4 6.82 5.15 7.15C5.06 6.78 5 6.4 5 6C5 3.24 7.24 1 10 1S15 3.24 15 6C15 7.42 14.4 8.67 13.45 9.57C13.87 10 14.5 10.13 15.08 9.88C15.85 9.56 16.2 8.68 15.88 7.92C15.85 7.83 15.8 7.74 15.74 7.66C15.9 7.13 16 6.58 16 6C16 5.37 15.9 4.76 15.72 4.19C17 4.55 18.1 5.44 18.65 6.76C19.41 8.56 18.89 10.57 17.5 11.81L20.73 19.44M13 8.6C13.37 8.19 13.65 7.71 13.82 7.18C13.28 7.45 12.97 8 13 8.6Z",upload:"M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z","microphone-off":"M19,11C19,12.19 18.66,13.3 18.1,14.28L16.87,13.05C17.14,12.43 17.3,11.74 17.3,11H19M15,11.16L9,5.18V5A3,3 0 0,1 12,2A3,3 0 0,1 15,5V11L15,11.16M4.27,3L21,19.73L19.73,21L15.54,16.81C14.77,17.27 13.91,17.58 13,17.72V21H11V17.72C7.72,17.23 5,14.41 5,11H6.7C6.7,14 9.24,16.1 12,16.1C12.81,16.1 13.6,15.91 14.31,15.58L12.65,13.92L12,14A3,3 0 0,1 9,11V10.28L3,4.27L4.27,3Z","water-boiler":"M8 2C6.89 2 6 2.89 6 4V16C6 17.11 6.89 18 8 18H9V20H6V22H9C10.11 22 11 21.11 11 20V18H13V20C13 21.11 13.89 22 15 22H18V20H15V18H16C17.11 18 18 17.11 18 16V4C18 2.89 17.11 2 16 2H8M12 4.97A2 2 0 0 1 14 6.97A2 2 0 0 1 12 8.97A2 2 0 0 1 10 6.97A2 2 0 0 1 12 4.97M10 14.5H14V16H10V14.5Z","washing-machine":Wt,note:"M15 3H5A2 2 0 0 0 3 5V19A2 2 0 0 0 5 21H19A2 2 0 0 0 21 19V9L15 3M19 19H5V5H14V10H19M17 14H7V12H17M14 17H7V15H14","book-open-variant":"M12 21.5C10.65 20.65 8.2 20 6.5 20C4.85 20 3.15 20.3 1.75 21.05C1.65 21.1 1.6 21.1 1.5 21.1C1.25 21.1 1 20.85 1 20.6V6C1.6 5.55 2.25 5.25 3 5C4.11 4.65 5.33 4.5 6.5 4.5C8.45 4.5 10.55 4.9 12 6C13.45 4.9 15.55 4.5 17.5 4.5C18.67 4.5 19.89 4.65 21 5C21.75 5.25 22.4 5.55 23 6V20.6C23 20.85 22.75 21.1 22.5 21.1C22.4 21.1 22.35 21.1 22.25 21.05C20.85 20.3 19.15 20 17.5 20C15.8 20 13.35 20.65 12 21.5M12 8V19.5C13.35 18.65 15.8 18 17.5 18C18.7 18 19.9 18.15 21 18.5V7C19.9 6.65 18.7 6.5 17.5 6.5C15.8 6.5 13.35 7.15 12 8M13 11.5C14.11 10.82 15.6 10.5 17.5 10.5C18.41 10.5 19.26 10.59 20 10.78V9.23C19.13 9.08 18.29 9 17.5 9C15.73 9 14.23 9.28 13 9.84V11.5M17.5 11.67C15.79 11.67 14.29 11.93 13 12.46V14.15C14.11 13.5 15.6 13.16 17.5 13.16C18.54 13.16 19.38 13.24 20 13.4V11.9C19.13 11.74 18.29 11.67 17.5 11.67M20 14.57C19.13 14.41 18.29 14.33 17.5 14.33C15.67 14.33 14.17 14.6 13 15.13V16.82C14.11 16.16 15.6 15.83 17.5 15.83C18.54 15.83 19.38 15.91 20 16.07V14.57Z","weather-night":Zt,timer:Nt,"home-city":"M10,2V4.26L12,5.59V4H22V19H17V21H24V2H10M7.5,5L0,10V21H15V10L7.5,5M14,6V6.93L15.61,8H16V6H14M18,6V8H20V6H18M7.5,7.5L13,11V19H10V13H5V19H2V11L7.5,7.5M18,10V12H20V10H18M18,14V16H20V14H18Z",refresh:"M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z","water-percent":Bt,"thermostat-auto":"M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22C12.4 22 12.7 22 13.1 21.9L15.4 15.3L14.8 14.7C15.5 14 16 13 16 11.9C16 11.2 15.8 10.5 15.4 9.9L17.6 7.7C18.5 9 19 10.4 19 12H20C20.3 12 20.6 12.1 20.8 12.2C20.8 12.2 20.9 12.2 20.9 12.3C21.3 12.5 21.7 12.9 21.9 13.4C22 12.9 22 12.5 22 12C22 6.5 17.5 2 12 2M14 8.6C13.4 8.2 12.7 8 12 8C9.8 8 8 9.8 8 12C8 13.1 8.4 14.1 9.2 14.8L7.1 16.9C5.8 15.7 5 13.9 5 12C5 8.1 8.1 5 12 5C13.6 5 15 5.5 16.2 6.4L14 8.6M20 14H18L14.8 23H16.7L17.4 21H20.6L21.3 23H23.2L20 14M17.8 19.7L19 16L20.2 19.7H17.8Z",thermostat:"M16.95,16.95L14.83,14.83C15.55,14.1 16,13.1 16,12C16,11.26 15.79,10.57 15.43,10L17.6,7.81C18.5,9 19,10.43 19,12C19,13.93 18.22,15.68 16.95,16.95M12,5C13.57,5 15,5.5 16.19,6.4L14,8.56C13.43,8.21 12.74,8 12,8A4,4 0 0,0 8,12C8,13.1 8.45,14.1 9.17,14.83L7.05,16.95C5.78,15.68 5,13.93 5,12A7,7 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z","chart-line":"M16,11.78L20.24,4.45L21.97,5.45L16.74,14.5L10.23,10.75L5.46,19H22V21H2V3H4V17.54L9.5,8L16,11.78Z","battery-alert":"M13 14H11V8H13M13 18H11V16H13M16.7 4H15V2H9V4H7.3C6.6 4 6 4.6 6 5.3V20.6C6 21.4 6.6 22 7.3 22H16.6C17.3 22 17.9 21.4 17.9 20.7V5.3C18 4.6 17.4 4 16.7 4Z","lightbulb-group":"M15 14V16A1 1 0 0 1 14 17H10A1 1 0 0 1 9 16V14A5 5 0 1 1 15 14M14 18H10V19A1 1 0 0 0 11 20H13A1 1 0 0 0 14 19M7 19V18H5V19A1 1 0 0 0 6 20H7.17A2.93 2.93 0 0 1 7 19M5 10A6.79 6.79 0 0 1 5.68 7A4 4 0 0 0 4 14.45V16A1 1 0 0 0 5 17H7V14.88A6.92 6.92 0 0 1 5 10M17 18V19A2.93 2.93 0 0 1 16.83 20H18A1 1 0 0 0 19 19V18M18.32 7A6.79 6.79 0 0 1 19 10A6.92 6.92 0 0 1 17 14.88V17H19A1 1 0 0 0 20 16V14.45A4 4 0 0 0 18.32 7Z","arrow-up":"M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z","arrow-down":"M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z","eye-off":"M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z","brightness-5":"M12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,15.31L23.31,12L20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31Z","brightness-6":"M12,18V6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,15.31L23.31,12L20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31Z","brightness-7":"M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8M12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31L23.31,12L20,8.69Z","timer-outline":Nt,"dots-horizontal":"M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z",folder:"M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z","content-save":"M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z","picture-in-picture":"M19,11H11V17H19V11M23,19V5C23,3.88 22.1,3 21,3H3A2,2 0 0,0 1,5V19A2,2 0 0,0 3,21H21A2,2 0 0,0 23,19M21,19H3V4.97H21V19Z","skip-next":It,"progress-clock":"M13,2.03V2.05L13,4.05C17.39,4.59 20.5,8.58 19.96,12.97C19.5,16.61 16.64,19.5 13,19.93V21.93C18.5,21.38 22.5,16.5 21.95,11C21.5,6.25 17.73,2.5 13,2.03M11,2.06C9.05,2.25 7.19,3 5.67,4.26L7.1,5.74C8.22,4.84 9.57,4.26 11,4.06V2.06M4.26,5.67C3,7.19 2.25,9.04 2.05,11H4.05C4.24,9.58 4.8,8.23 5.69,7.1L4.26,5.67M2.06,13C2.26,14.96 3.03,16.81 4.27,18.33L5.69,16.9C4.81,15.77 4.24,14.42 4.06,13H2.06M7.1,18.37L5.67,19.74C7.18,21 9.04,21.79 11,22V20C9.58,19.82 8.23,19.25 7.1,18.37M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z","home-export-outline":Tt,"lightbulb-off-outline":"M12,2C9.76,2 7.78,3.05 6.5,4.68L7.93,6.11C8.84,4.84 10.32,4 12,4A5,5 0 0,1 17,9C17,10.68 16.16,12.16 14.89,13.06L16.31,14.5C17.94,13.21 19,11.24 19,9A7,7 0 0,0 12,2M3.28,4L2,5.27L5.04,8.3C5,8.53 5,8.76 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H14.73L18.73,22L20,20.72L3.28,4M7.23,10.5L12.73,16H10V13.58C8.68,13 7.66,11.88 7.23,10.5M9,20V21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9Z","television-off":"M0.5,2.77L1.78,1.5L21,20.72L19.73,22L16.73,19H16V21H8V19H3A2,2 0 0,1 1,17V5C1,4.5 1.17,4.07 1.46,3.73L0.5,2.77M21,17V5H7.82L5.82,3H21A2,2 0 0,1 23,5V17C23,17.85 22.45,18.59 21.7,18.87L19.82,17H21M3,17H14.73L3,5.27V17Z","pencil-ruler":"M3 17.25V21H6.75L17.81 9.93L14.06 6.18L3 17.25M22.61 18.36L18.36 22.61L13.16 17.41L14.93 15.64L15.93 16.64L18.4 14.16L19.82 15.58L18.36 17L19.42 18L20.84 16.6L22.61 18.36M6.61 10.83L1.39 5.64L5.64 1.39L7.4 3.16L4.93 5.64L6 6.7L8.46 4.22L9.88 5.64L8.46 7.05L9.46 8.05L6.61 10.83M20.71 7C21.1 6.61 21.1 6 20.71 5.59L18.37 3.29C18 2.9 17.35 2.9 16.96 3.29L15.12 5.12L18.87 8.87L20.71 7Z",wall:"M3,16H12V21H3V16M2,10H8V15H2V10M9,10H15V15H9V10M16,10H22V15H16V10M13,16H21V21H13V16M3,4H11V9H3V4M12,4H21V9H12V4Z","rotate-right":"M16.89,15.5L18.31,16.89C19.21,15.73 19.76,14.39 19.93,13H17.91C17.77,13.87 17.43,14.72 16.89,15.5M13,17.9V19.92C14.39,19.75 15.74,19.21 16.9,18.31L15.46,16.87C14.71,17.41 13.87,17.76 13,17.9M19.93,11C19.76,9.61 19.21,8.27 18.31,7.11L16.89,8.53C17.43,9.28 17.77,10.13 17.91,11M15.55,5.55L11,1V4.07C7.06,4.56 4,7.92 4,12C4,16.08 7.05,19.44 11,19.93V17.91C8.16,17.43 6,14.97 6,12C6,9.03 8.16,6.57 11,6.09V10L15.55,5.55Z","content-copy":"M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z","arrow-split-vertical":"M18,16V13H15V22H13V2H15V11H18V8L22,12L18,16M2,12L6,16V13H9V22H11V2H9V11H6V8L2,12Z","border-none-variant":"M15,5H17V3H15M15,21H17V19H15M11,5H13V3H11M19,5H21V3H19M19,9H21V7H19M19,21H21V19H19M19,13H21V11H19M19,17H21V15H19M3,5H5V3H3M3,9H5V7H3M3,13H5V11H3M3,17H5V15H3M3,21H5V19H3M11,21H13V19H11M7,21H9V19H7M7,5H9V3H7V5Z","border-all-variant":"M3,21V3H21V21H3M5,5V19H19V5H5Z","square-outline":"M3,3H21V21H3V3M5,5V19H19V5H5Z","vector-polygon":"M2,2V8H4.28L5.57,16H4V22H10V20.06L15,20.05V22H21V16H19.17L20,9H22V3H16V6.53L14.8,8H9.59L8,5.82V2M4,4H6V6H4M18,5H20V7H18M6.31,8H7.11L9,10.59V14H15V10.91L16.57,9H18L17.16,16H15V18.06H10V16H7.6M11,10H13V12H11M6,18H8V20H6M17,18H19V20H17","window-closed-variant":"M21 20V2H3V20H1V23H23V20M19 4V11H13V4M5 4H11V11H5M5 20V13H11V20M13 20V13H19V20Z","window-open-variant":"M21 20V2H3V20H1V23H23V20M19 4V11H17V4M5 4H7V11H5M5 20V13H7V20M9 20V4H15V20M17 20V13H19V20Z","fridge-alert":"M5 2H15C16.11 2 17 2.9 17 4V9H3V4C3 2.9 3.9 2 5 2M17 19C17 20.11 16.11 21 15 21V22H13V21H7V22H5V21C3.9 21 3 20.11 3 19V10H17V19M6 5V7H8V5H6M6 12V15H8V12H6M19 15H21V17H19V15M19 7H21V13H19V7Z"},Xt=["home","lightning-bolt","shield-home","doorbell","air-conditioner","cctv","sofa","bed","kitchen","shower","garden","garage","car","pool","gamepad","desk","laundry","solar","lightbulb","robot-vacuum","thermometer","television","speaker","dashboard"];function Kt(t){const e=parseInt(t.replace("#",""),16),[i,s,n]=[e>>16&255,e>>8&255,255&e].map((t=>{const e=t/255;return e<=.03928?e/12.92:((e+.055)/1.055)**2.4}));return.2126*i+.7152*s+.0722*n>.22?"#1E252B":"#FFFFFF"}const Gt=t=>"#"+t.map((t=>t.toString(16).padStart(2,"0"))).join("");function Jt(t,e){const i=e/100,s=e=>{const s=(e+t/60)%6;return Math.round(255*(1-i*Math.max(0,Math.min(s,4-s,1))))};return[s(5),s(3),s(1)]}const Qt=([t,e,i])=>`rgb(${t}, ${e}, ${i})`,te=new Map;const ee=t=>t.split(".")[0];function ie(t,e,i){return e.names[i]||t.states[i]?.attributes.friendly_name||i}const se=t=>t.attributes.device_class;function ne(t){if(!t)return!1;switch(ee(t.entity_id)){case"climate":return"off"!==t.state&&"unavailable"!==t.state;case"vacuum":return"cleaning"===t.state||"returning"===t.state;case"lock":return"unlocked"===t.state||"open"===t.state||"jammed"===t.state;case"cover":return"open"===t.state||"opening"===t.state||"closing"===t.state;case"media_player":return"playing"===t.state||"on"===t.state;case"camera":return"streaming"===t.state||"recording"===t.state;case"alarm_control_panel":return t.state.startsWith("armed")||"triggered"===t.state||"pending"===t.state||"arming"===t.state;case"sensor":case"event":return!1;default:return"on"===t.state||"open"===t.state||"home"===t.state}}function ae(t){const e=t&&"light"===ee(t.entity_id)&&"on"===t.state?t.attributes.rgb_color:void 0;if(3===e?.length)return`--tone:rgb(${e.join(",")});--on-tone:${Kt(Gt(e))}`;const i=t?function(t){const e=ee(t.entity_id);return"climate"!==e||"cool"!==t.state&&"cooling"!==t.attributes.hvac_action?"binary_sensor"===e&&["smoke","moisture","gas","carbon_monoxide","problem","safety"].includes(se(t)??"")||"lock"===e&&"jammed"===t.state||"alarm_control_panel"===e&&"triggered"===t.state?"alert":"accent":"cool"}(t):"accent";return`--tone:var(--${i});--on-tone:var(--on-${i})`}function oe(t,e){const i=t?.attributes.icon;if(i?.startsWith("mdi:")){const t=i.slice(4);if(Yt[t])return t;if(customElements.get("ha-icon"))return i}const s=ee(e),n=ne(t),a=t?se(t):void 0;switch(s){case"light":return n?"lightbulb":"lightbulb-outline";case"switch":case"input_boolean":return"outlet"===a?n?"power-plug":"power-plug-off":n?"toggle-on":"toggle-off";case"fan":return n?"fan":"fan-off";case"climate":return"cool"===t?.state?"snowflake":"air-conditioner";case"vacuum":return"robot-vacuum";case"camera":return"cctv";case"lock":return n?"lock-open":"lock";case"cover":return"garage"===a?n?"garage-open":"garage":"window"===a?n?"window-open":"window-closed":"curtain"===a?"curtains":"door"===a?n?"door-open":"door-closed":n?"blinds":"blinds-closed";case"binary_sensor":return"motion"===a||"occupancy"===a||"presence"===a?n?"motion-sensor":"motion-sensor-off":"door"===a||"opening"===a?n?"door-open":"door-closed":"window"===a?n?"window-open":"window-closed":"garage_door"===a?n?"garage-open":"garage":"moisture"===a?"leak":"smoke"===a||"heat"===a?"fire":"eye";case"sensor":return"temperature"===a?"thermometer":"humidity"===a?"humidity":"power"===a||"energy"===a||"current"===a||"voltage"===a?"lightning-bolt":"battery"===a?"battery":"gauge";case"event":return"doorbell"===a?"doorbell":"bell";case"alarm_control_panel":return"shield-home";case"media_player":return"speaker"===a?"speaker":"television";case"scene":return"palette";case"script":case"button":case"input_button":return"play-circle";default:return"grid"}}function re(t){const e=ee(t);return["scene","script","button","input_button"].includes(e)?"run":["light","switch","fan","input_boolean","automation","media_player","climate","cover","vacuum","humidifier","siren"].includes(e)?"toggle":"sheet"}const le=new Map,ce=["light","switch","fan","input_boolean","siren","humidifier"];function de(t){if(!t)return t;const e=le.get(t.entity_id);return e?t.last_updated!==e.from||Date.now()>e.until?(le.delete(t.entity_id),t):{...t,state:e.state}:t}const pe=4e3;async function he(t,e){const i=e.entity_id,s=ee(i),n={entity_id:i};if(ce.includes(s)&&("on"===e.state||"off"===e.state))return le.set(i,{state:"on"===e.state?"off":"on",from:e.last_updated,until:Date.now()+pe}),t.callService("homeassistant","toggle",n).catch((t=>{throw le.delete(i),t}));switch(s){case"climate":return t.callService("climate","off"===e.state?"turn_on":"turn_off",n);case"vacuum":return t.callService("vacuum","cleaning"===e.state?"return_to_base":"start",n);case"cover":return t.callService("cover","toggle",n);case"scene":case"script":return t.callService(s,"turn_on",n);case"button":case"input_button":return t.callService(s,"press",n);default:return t.callService("homeassistant","toggle",n)}}const ue=t=>`⁦${t}⁩`;function ge(t,e,i=1){return new Intl.NumberFormat(Ot[e],{maximumFractionDigits:i}).format(t)}function me(t,e){const i=Number(t.state);if(""===t.state||Number.isNaN(i))return;const s=t.attributes.unit_of_measurement??"",n="%"===s||s.startsWith("°")?"":" ";return ue(`${ge(i,e)}${s?n+s:""}`)}function fe(t,e,i){if(!e)return t("unavailable");if("unavailable"===e.state||"unknown"===e.state)return t(e.state);const s=ee(e.entity_id),n=se(e);if("sensor"===s)return me(e,i)??(Dt(e.state)?t(e.state):e.state);if("binary_sensor"===s){const i="on"===e.state;return"motion"===n||"occupancy"===n||"presence"===n?t(i?"motion":"clear"):["door","window","opening","garage_door"].includes(n??"")?t(i?"open":"closed"):["moisture","smoke","gas","carbon_monoxide","problem"].includes(n??"")?t(i?"detected":"clear"):t(i?"on":"off")}if("light"===s&&"on"===e.state&&"number"==typeof e.attributes.brightness)return ue(`${Math.round(e.attributes.brightness/255*100)}%`);if("climate"===s&&"off"!==e.state){const s=e.attributes.temperature,n=Dt(e.state)?t(e.state):e.state;return"number"==typeof s?`${n} · ${ue(`${ge(s,i)}°`)}`:n}return"event"===s?_e(t,e.state):["scene","script","button","input_button"].includes(s)?t("tap_to_run"):"vacuum"===s&&"number"==typeof e.attributes.battery_level&&"docked"===e.state?`${t("docked")} · ${ue(`${e.attributes.battery_level}%`)}`:Dt(e.state)?t(e.state):e.state}function be(t,e,i){if(!e)return"–";const s=ee(e.entity_id);if("sensor"===s)return me(e,i)??e.state;if("climate"===s){const s=e.attributes.current_temperature;return"number"==typeof s?ue(`${ge(s,i)}°`):fe(t,e,i)}return"light"===s&&"on"===e.state&&"number"==typeof e.attributes.brightness?ue(`${Math.round(e.attributes.brightness/255*100)}%`):fe(t,e,i)}function _e(t,e){const i=Date.parse(e);if(Number.isNaN(i))return"–";const s=Math.round((Date.now()-i)/6e4);return s<1?t("just_now"):s<60?t("min_ago",{n:s}):t("hours_ago",{n:Math.round(s/60)})}function ye(t){return!!t&&"sensor"===ee(t.entity_id)&&""!==t.state&&!Number.isNaN(Number(t.state))}function ve(t,e,i={}){return Object.values(t.states).filter((t=>!i.domains||i.domains.includes(ee(t.entity_id)))).filter((t=>!i.deviceClasses||i.deviceClasses.includes(se(t)??""))).map((i=>({id:i.entity_id,name:ie(t,e,i.entity_id),entity:i}))).sort(((t,e)=>t.name.localeCompare(e.name)))}function xe(t,e){const i=t.entities?.[e];return i?.area_id??(i?.device_id?t.devices?.[i.device_id]?.area_id??void 0:void 0)}function we([t,e],i){let s=!1;for(let n=0,a=i.length-1;n<i.length;a=n++){const[o,r]=i[n],[l,c]=i[a];r>e!=c>e&&t<(l-o)*(e-r)/(c-r)+o&&(s=!s)}return s}function $e(t){let e=0,i=0,s=0;for(let n=0,a=t.length-1;n<t.length;a=n++){const o=t[a][0]*t[n][1]-t[n][0]*t[a][1];e+=o,i+=(t[a][0]+t[n][0])*o,s+=(t[a][1]+t[n][1])*o}return Math.abs(e)<1e-6?[t.reduce(((t,e)=>t+e[0]),0)/t.length,t.reduce(((t,e)=>t+e[1]),0)/t.length]:[i/(3*e),s/(3*e)]}function ke(t,e,i=1.6){let s,n=i;for(const a of e){const e=Math.hypot(a[0]-t[0],a[1]-t[1]);e<n&&(n=e,s=a)}return s?[s[0],s[1]]:[Math.round(10*t[0])/10,Math.round(10*t[1])/10]}const Ce=t=>`polygon(${t.map((([t,e])=>`${t}% ${e}%`)).join(",")})`,Me=["temperature","humidity","power","carbon_dioxide"],He=["door","window","opening","garage_door","motion","occupancy","moisture","smoke","gas"],Ae=["light","switch","fan","climate","cover","lock","media_player","vacuum","camera","alarm_control_panel","sensor","binary_sensor","humidifier","siren"],Le={light:0,climate:1,cover:2,fan:3,switch:4,media_player:5,lock:6,vacuum:7,alarm_control_panel:8,binary_sensor:9,sensor:10,camera:11};function Ve(t,e){const i=t.entities?.[e];if(i?.area_id)return i.area_id;const s=i?.device_id?t.devices?.[i.device_id]:void 0;return s?.area_id??void 0}const Se=(t,e)=>(Le[ee(t.entity_id)]??20)-(Le[ee(e.entity_id)]??20)||t.entity_id.localeCompare(e.entity_id);function ze(t){const e=new Map;for(const i of function(t){return Object.values(t.states).filter((e=>{const i=e.entity_id,s=ee(i);if(!Ae.includes(s))return!1;const n=t.entities?.[i];return!n?.entity_category&&!n?.hidden&&"fully_kiosk"!==n?.platform&&"smartnest"!==n?.platform&&!("unavailable"===e.state&&!n)&&("sensor"===s?Me.includes(e.attributes.device_class):"binary_sensor"!==s||He.includes(e.attributes.device_class))}))}(t)){const s=Ve(t,i.entity_id);e.set(s,[...e.get(s)??[],i])}return[...e.entries()].map((([e,i])=>({areaId:e,name:e?t.areas?.[e]?.name??e:void 0,ids:i.sort(Se).map((t=>t.entity_id))}))).sort(((t,e)=>(t.areaId?0:1)-(e.areaId?0:1)||(t.name??"").localeCompare(e.name??"")))}const De=t=>t.trim().toLowerCase().replace(/\s+/g," ");function Oe(t,e){const i=t.map((t=>t[0])),s=t.map((t=>t[1])),[n,a,o,r]=[Math.min(...i),Math.max(...i),Math.min(...s),Math.max(...s)];for(let l=Math.ceil(Math.sqrt(e));l<12;l++){const i=[];for(let e=0;e<l;e++)for(let s=0;s<l;s++){const c=[n+(s+.5)/l*(a-n),o+(e+.5)/l*(r-o)];we(c,t)&&i.push([Math.round(10*c[0])/10,Math.round(10*c[1])/10])}if(i.length>=e)return i.slice(0,e)}return[]}function Te(t,e){const i=new Set(e.markers.map((t=>t.entity))),s=[];for(const n of ze(t)){if(!n.name)continue;const t=e.rooms?.find((t=>De(t.name)===De(n.name)));if(!t)continue;const a=n.ids.filter((t=>!i.has(t)&&"camera"!==ee(t))).slice(0,9),o=Oe(t.points,a.length);a.forEach(((t,e)=>{if(!o[e])return;const i=ee(t);s.push({id:Ie(),entity:t,x:o[e][0],y:o[e][1],display:"sensor"===i||"climate"===i?"value":"icon"})}))}return s}const je=12,Pe="#E9971D",Ie=()=>Math.random().toString(36).slice(2,10)+Date.now().toString(36).slice(-4),Ee={floorplan:{w:12,h:10,minW:4,minH:4},tile:{w:3,h:2,minW:2,minH:2},camera:{w:6,h:5,minW:3,minH:3},heading:{w:12,h:1,minW:2,minH:1},clock:{w:4,h:3,minW:3,minH:2},modes:{w:12,h:2,minW:4,minH:2},vacuum:{w:12,h:9,minW:6,minH:6},visitors:{w:12,h:4,minW:4,minH:3},energy:{w:6,h:7,minW:4,minH:5},energy_stats:{w:6,h:8,minW:4,minH:6},panic:{w:3,h:3,minW:2,minH:2},check:{w:6,h:6,minW:4,minH:4},family:{w:6,h:3,minW:3,minH:2},todo:{w:4,h:7,minW:3,minH:4},calendar:{w:4,h:7,minW:3,minH:4},forecast:{w:6,h:4,minW:4,minH:3},countdown:{w:4,h:4,minW:3,minH:3},gauge:{w:3,h:4,minW:2,minH:3},gate:{w:6,h:6,minW:4,minH:4},frigate:{w:12,h:5,minW:4,minH:4},schedule:{w:12,h:6,minW:6,minH:4},media:{w:6,h:5,minW:4,minH:4},remote:{w:4,h:8,minW:3,minH:6},folder:{w:3,h:3,minW:2,minH:2},prayer:{w:4,h:6,minW:3,minH:5},covers:{w:4,h:6,minW:3,minH:4},lights:{w:4,h:6,minW:3,minH:4},batteries:{w:4,h:5,minW:3,minH:3},sensor:{w:4,h:4,minW:3,minH:3},scenes:{w:6,h:3,minW:3,minH:2},ac:{w:4,h:6,minW:3,minH:5},room:{w:4,h:6,minW:3,minH:4},stack:{w:4,h:6,minW:3,minH:4},hero:{w:12,h:4,minW:6,minH:3},parcels:{w:6,h:5,minW:3,minH:3},commute:{w:6,h:4,minW:3,minH:3},radar:{w:6,h:6,minW:4,minH:4},verse:{w:6,h:4,minW:3,minH:3},board:{w:6,h:6,minW:4,minH:4},internet:{w:6,h:6,minW:4,minH:4},timeline:{w:12,h:7,minW:6,minH:5},irrigation:{w:6,h:6,minW:4,minH:5},boiler:{w:6,h:5,minW:4,minH:4},air:{w:6,h:4,minW:4,minH:3},chores:{w:6,h:7,minW:4,minH:5},wake:{w:6,h:4,minW:4,minH:3},water:{w:6,h:5,minW:4,minH:4},consumers:{w:6,h:5,minW:4,minH:4}};function Ne(t){return{home_name:"",language:t,accent:Pe,theme:"schedule",dark_from:"19:00",dark_to:"06:30",default_page:"",screensaver:{enabled:!0,timeout_min:5,photos:!0,photo_folder:"smartnest-photos",photo_seconds:20,style:"classic"},glass:"classic",guests:{},weather:{entity:"weather.forecast_home",background:!0},fully:{night_dim:!0,night_brightness:20,night_off_min:15,motion_wake:!1},doorbell:{keep_days:7},kiosk:{},greeting_name:"",prayer:!0,morning:!0,night_plan:!0,season:"auto",speakers:[],maintenance:[],setup_done:!0,chips_hidden:[],hidden:[],travel:{off:[],lights:[],arm:!0,simulate:!0},emergency:{police:"100",contacts:[]},installer:{},appliances:[],night_path:{motion:[],lights:[],brightness:10,minutes:3,from:"23:00",to:"06:00"},arrival:{climate:[],lights:[],km:5},outage:{shed:[]},style:"classic",material:"none",night_midnight:!1,wallpaper_dim:.35,accent_from_wallpaper:!0,font:"rubik",icons:"filled",accent_day:!1,active_glow:!0,aurora:!1,occasions:!0,burn_in:!0,nav:"tabs",sounds:!1,music_backdrop:!0,welcome:!0,page_moods:!0,season_skin:!0,doorbell_tone:"chime",motion:"full",tou:{enabled:!1,cheap_from:"23:00",cheap_to:"07:00",peak_from:"17:00",peak_to:"22:00"}}}function We(t){return{id:Ie(),name:t,markers:[]}}function Re(t,e={},i={}){const{w:s,h:n}=Ee[t];return{id:Ie(),type:t,x:0,y:0,w:s,h:n,config:e,...i}}function Fe(t){return t.reduce(((t,e)=>Math.max(t,e.y+e.h)),0)}const Be=(t,e)=>t.x<e.x+e.w&&e.x<t.x+t.w&&t.y<e.y+e.h&&e.y<t.y+t.h;function Ze(t,e){const i=t.map((t=>{const e={...t};return e.w=Math.min(Math.max(e.w,1),je),e.x=Math.min(Math.max(e.x,0),je-e.w),e.y=Math.max(e.y,0),e})),s=i.find((t=>t.id===e)),n=s?[s]:[];for(const o of i.filter((t=>t!==s)).sort(((t,e)=>t.y-e.y||t.x-e.x))){for(;n.some((t=>Be(t,o)));)o.y++;n.push(o)}const a=[];for(const o of n.sort(((t,e)=>t.y-e.y||t.x-e.x))){for(;o.y>0&&!a.some((t=>Be(t,{...o,y:o.y-1})));)o.y--;a.push(o)}return a}function qe(t,e=0){let i=0,s=e,n=0;return t.map((t=>{i+t.w>je&&(i=0,s+=n,n=0);const e={...t,x:i,y:s};return i+=t.w,n=Math.max(n,t.h),e}))}const Ue=[{id:"blank",icon:"dashboard",label:"template_blank"},{id:"home",icon:"home",label:"template_home"},{id:"rooms",icon:"sofa",label:"template_rooms"},{id:"power",icon:"lightning-bolt",label:"template_power"},{id:"security",icon:"shield-home",label:"template_security"},{id:"doorbell",icon:"doorbell",label:"template_doorbell"},{id:"climate",icon:"air-conditioner",label:"template_climate"},{id:"robot",icon:"robot-vacuum",label:"template_robot"},{id:"water",icon:"water",label:"template_water"},{id:"car",icon:"car",label:"template_car"},{id:"garden",icon:"sprinkler",label:"template_garden"},{id:"pets",icon:"paw",label:"template_pets"},{id:"bento",icon:"dashboard",label:"template_bento"}],Ye={car:/\b(car|tesla|bmw|toyota|hyundai|kia|volkswagen|vw|audi|mercedes|skoda|byd|mg|ev|wallbox|charger|easee|zappi)\b|_car_|سيار|شاحن/i,garden:/garden|pool|spa|irrigat|sprinkler|lawn|pump|soil|plant|hose|حديق|جنين|مسبح|ري_|رشاش|مضخ|زرع/i,pets:/\b(pet|cat|dog|feeder|litter|petkit|aquarium|fish)\b|_pet_|قط|كلب|حيوان|سمك|أكل_ال/i},Xe=["sensor","binary_sensor","switch","lock","climate","button","valve","number","select","device_tracker","camera","light","fan","water_heater"];function Ke(t,e,i,s){const n=Ue.find((e=>e.id===t)),a=(t,s,n=8)=>ve(e,i,{domains:t,deviceClasses:s}).filter((t=>!e.entities?.[t.id]?.entity_category&&!e.entities?.[t.id]?.hidden)).slice(0,n).map((t=>t.id)),o=t=>t.map((t=>Re("tile",{entity:t}))),r=(t,e=6,i=5)=>t.map((t=>Re("camera",{entity:t},{w:e,h:i})));let l=[];switch(t){case"home":l=[...e.states["script.smartnest_mode_away"]?[Re("modes")]:[],Re("floorplan",{floors:[We(s("floor_default"))]},{y:2})];break;case"power":l=qe([...Object.keys(e.states).some((t=>/solar|pv/.test(t)))?[Re("energy")]:[],...Object.values(e.states).some((t=>"power"===t.attributes.device_class))?[Re("consumers")]:[],...o(a(["sensor"],["power","energy"])),...o(a(["switch"],void 0,8))]);break;case"security":l=qe([...r(a(["camera"],void 0,4)),...o(a(["lock"])),...o(a(["binary_sensor"],["door","window","opening","motion","occupancy","smoke","moisture"]))]);break;case"doorbell":{const t=i.settings.doorbell.camera_entity??a(["camera"],void 0,1)[0],e=i.settings.doorbell.lock_entity??a(["lock"],void 0,1)[0],s=a(["event"],["doorbell"],1);l=qe([...t?r([t],8,7):[],...o([e,...s].filter(Boolean)).map((t=>({...t,w:4}))),Re("visitors")]);break}case"rooms":l=function(t,e){const i=[];let s=0;for(const n of ze(t)){if(!n.ids.length)continue;i.push({id:Ie(),type:"heading",x:0,y:s,w:12,h:1,config:{text:n.name??e}}),s+=1;const t=n.ids.filter((t=>"camera"===ee(t))),a=n.ids.filter((t=>"camera"!==ee(t)));let o=0;for(const e of a)o+3>12&&(o=0,s+=2),i.push({id:Ie(),type:"tile",x:o,y:s,w:3,h:2,config:{entity:e}}),o+=3;a.length&&(s+=2),o=0;for(const e of t)o+6>12&&(o=0,s+=5),i.push({id:Ie(),type:"camera",x:o,y:s,w:6,h:5,config:{entity:e}}),o+=6;t.length&&(s+=5)}return i}(e,s("other_devices"));break;case"bento":{const t=ze(e).filter((t=>t.areaId)).sort(((t,e)=>e.ids.length-t.ids.length)).slice(0,5).map((t=>t.areaId)).map(((t,e)=>Re("room",{area:t},{x:(e+1)%3*4,y:6+6*Math.floor((e+1)/3),w:4,h:6})));l=[Re("hero",{},{x:0,y:0,w:12,h:4}),...e.states["script.smartnest_mode_away"]?[Re("modes",{},{y:4})]:[],Re("stack",{},{x:0,y:6,w:4,h:6}),...t];break}case"car":case"garden":case"pets":{const i=function(t,e,i=12){return Object.values(t.states).filter((i=>{const s=t.entities?.[i.entity_id];return!s?.entity_category&&!s?.hidden&&Xe.includes(ee(i.entity_id))&&Ye[e].test(`${i.entity_id} ${i.attributes.friendly_name??""}`)})).sort(((t,e)=>Xe.indexOf(ee(t.entity_id))-Xe.indexOf(ee(e.entity_id)))).slice(0,i).map((t=>t.entity_id))}(e,t);l=qe([...r(i.filter((t=>"camera"===ee(t))),6,5),...o(i.filter((t=>"camera"!==ee(t))))]);break}case"water":l=qe([Re("water"),...o(a(["binary_sensor"],["moisture"])),...o(a(["valve"]))]);break;case"robot":l=a(["vacuum"],void 0,2).map(((t,e)=>Re("vacuum",{entity:t},{y:9*e})));break;case"climate":l=qe([...o(a(["climate"])),...o(a(["sensor"],["temperature","humidity"]))])}return{id:Ie(),title:s("blank"===t?"untitled":n.label),icon:n.icon,widgets:"rooms"===t?l:Ze(l)}}function Ge(t,e){const i=Ne(e),s={...i,...t?.settings??{}};return s.screensaver={...i.screensaver,...t?.settings?.screensaver??{}},s.doorbell={...i.doorbell,...t?.settings?.doorbell??{}},s.chips_hidden=Array.isArray(t?.settings?.chips_hidden)?t.settings.chips_hidden:[],s.hidden=Array.isArray(t?.settings?.hidden)?t.settings.hidden:[],s.speakers=Array.isArray(t?.settings?.speakers)?t.settings.speakers:[],s.maintenance=Array.isArray(t?.settings?.maintenance)?t.settings.maintenance:[],s.kiosk={...t?.settings?.kiosk??{}},s.weather={...i.weather,...t?.settings?.weather??{}},s.guests={...t?.settings?.guests??{}},s.fully={...i.fully,...t?.settings?.fully??{}},s.travel={...i.travel,...t?.settings?.travel??{}},s.emergency={...i.emergency,...t?.settings?.emergency??{}},s.installer={...t?.settings?.installer??{}},s.appliances=Array.isArray(t?.settings?.appliances)?t.settings.appliances:[],s.night_path={...i.night_path,...t?.settings?.night_path??{}},s.arrival={...i.arrival,...t?.settings?.arrival??{}},s.outage={...i.outage,...t?.settings?.outage??{}},s.tou={...i.tou,...t?.settings?.tou??{}},{version:1,settings:s,names:{...t?.names??{}},pages:Array.isArray(t?.pages)?t.pages:[]}}async function Je(t,e){await t.callWS({type:"smartnest/config/save",config:e})}async function Qe(t,e){const i=new FormData,s=await async function(t,e=2560){if(!t.type.startsWith("image/")||"image/svg+xml"===t.type||"image/gif"===t.type)return t;try{const i=await createImageBitmap(t),s=Math.min(1,e/Math.max(i.width,i.height));if(1===s&&t.size<6e5)return t;const n=document.createElement("canvas");n.width=Math.round(i.width*s),n.height=Math.round(i.height*s);const a=n.getContext("2d");a.imageSmoothingQuality="high",a.drawImage(i,0,0,n.width,n.height),i.close?.();const o=await new Promise((t=>n.toBlob(t,"image/webp",.86)));return o&&o.size<t.size&&"image/webp"===o.type?o:t}catch{return t}}(e);i.append("file",s,s===e?e.name:e.name.replace(/\.[^.]+$/,"")+".webp");const n=await t.fetchWithAuth("/api/smartnest/upload",{method:"POST",body:i});if(!n.ok)throw new Error(`upload ${n.status}`);return(await n.json()).url}function ti(t,e){for(const i of t.pages){const t=i.widgets.find((t=>t.id===e));if(t)return t}}async function ei(t){if("image/svg+xml"===t.type&&t.size<12e4)return await new Promise(((e,i)=>{const s=new FileReader;s.onload=()=>e(String(s.result)),s.onerror=i,s.readAsDataURL(t)}));const e=await createImageBitmap(t),i=Math.min(1,256/Math.max(e.width,e.height)),s=document.createElement("canvas");s.width=Math.round(e.width*i),s.height=Math.round(e.height*i),s.getContext("2d").drawImage(e,0,0,s.width,s.height);const n=s.toDataURL("image/webp",.9);return n.startsWith("data:image/webp")?n:s.toDataURL("image/png")}const ii="#151A1E",si="#1E252B",ni="#2A333B",ai="#3A454F",oi="#55616C",ri="#9AA4AD",li="#F2ECE2",ci="#965A00",di="#18BCF2",pi="#2FB57A",hi="#F26B68",ui="#C62828";function gi(t,e){const i=e||Pe,s=i.toUpperCase()===Pe,n={"--accent":i,"--on-accent":Kt(i),"--cool":di,"--on-cool":si,"--alert":hi,"--on-alert":si,"--success":pi};return t?{...n,"--bg":ii,"--bg-glow":"rgba(233,151,29,.10)","--surface":"rgba(42,51,59,.66)","--surface-solid":ni,"--surface-2":ai,"--surface-hover":"rgba(58,69,79,.8)","--text":"#FFFFFF","--text-2":ri,"--border":"rgba(255,255,255,.08)","--accent-text":i,"--alert-text":hi,"--scrim":"rgba(8,10,12,.55)","--shadow":"0 1px 0 rgba(255,255,255,.04) inset, 0 10px 30px rgba(0,0,0,.35)","--shadow-lift":"0 24px 60px rgba(0,0,0,.55)","color-scheme":"dark"}:{...n,"--bg":"#F3EFE8","--bg-glow":"rgba(233,151,29,.12)","--surface":"rgba(255,255,255,.72)","--surface-solid":"#FFFFFF","--surface-2":li,"--surface-hover":"rgba(255,255,255,.92)","--text":si,"--text-2":oi,"--border":"rgba(30,37,43,.08)","--accent-text":s?ci:`color-mix(in srgb, ${i} 62%, black)`,"--alert-text":ui,"--scrim":"rgba(30,37,43,.28)","--shadow":"0 1px 2px rgba(30,37,43,.05), 0 8px 24px rgba(30,37,43,.07)","--shadow-lift":"0 24px 60px rgba(30,37,43,.22)","color-scheme":"light"}}function mi(t){const e=(e,i)=>`@font-face{font-family:"Rubik";font-weight:${e};font-display:swap;src:url("${t}fonts/${i}") format("truetype");}`;return[e(400,"Rubik-Regular.ttf"),e(500,"Rubik-Medium.ttf"),e(700,"Rubik-Bold.ttf"),e(800,"Rubik-ExtraBold.ttf")].join("")}const fi=r`
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
    background-color: var(--surface);
    background-image: var(--sheen, none);
    background-attachment: fixed;
    -webkit-backdrop-filter: var(--glass-filter, blur(var(--glass-blur, 24px)) saturate(var(--glass-sat, 170%)));
    backdrop-filter: var(--glass-filter, blur(var(--glass-blur, 24px)) saturate(var(--glass-sat, 170%)));
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
`;var bi=Object.defineProperty,_i=Object.getOwnPropertyDescriptor,yi=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?_i(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&bi(e,i,a),a};const vi={bell:"M10 21H14C14 22.1 13.1 23 12 23S10 22.1 10 21M21 19V20H3V19L5 17V11C5 7.9 7 5.2 10 4.3V4C10 2.9 10.9 2 12 2S14 2.9 14 4V4.3C17 5.2 19 7.9 19 11V17L21 19M17 11C17 8.2 14.8 6 12 6S7 8.2 7 11V18H17V11Z","bell-ring":"M10,21H14A2,2 0 0,1 12,23A2,2 0 0,1 10,21M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M17,11A5,5 0 0,0 12,6A5,5 0 0,0 7,11V18H17V11M19.75,3.19L18.33,4.61C20.04,6.3 21,8.6 21,11H23C23,8.07 21.84,5.25 19.75,3.19M1,11H3C3,8.6 3.96,6.3 5.67,4.61L4.25,3.19C2.16,5.25 1,8.07 1,11Z",camera:"M20,4H16.83L15,2H9L7.17,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6A2,2 0 0,0 20,4M20,18H4V6H8.05L9.88,4H14.12L15.95,6H20V18M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15Z",home:jt,lightbulb:Pt,"lightning-bolt":"M11 9.47V11H14.76L13 14.53V13H9.24L11 9.47M13 1L6 15H11V23L18 9H13V1Z",lock:"M12,17C10.89,17 10,16.1 10,15C10,13.89 10.89,13 12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17M18,20V10H6V20H18M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10C4,8.89 4.89,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z","lock-open":"M10 13C11.1 13 12 13.89 12 15C12 16.11 11.11 17 10 17S8 16.11 8 15 8.9 13 10 13M18 1C15.24 1 13 3.24 13 6V8H4C2.9 8 2 8.9 2 10V20C2 21.1 2.9 22 4 22H16C17.1 22 18 21.1 18 20V10C18 8.9 17.1 8 16 8H15V6C15 4.34 16.34 3 18 3S21 4.34 21 6V8H23V6C23 3.24 20.76 1 18 1M16 10V20H4V10H16Z","shield-home":"M21,11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1L21,5V11M12,21C15.75,20 19,15.54 19,11.22V6.3L12,3.18L5,6.3V11.22C5,15.54 8.25,20 12,21M11,14H13V17H16V12H18L12,7L6,12H8V17H11V14",sofa:"M21 9V7C21 5.35 19.65 4 18 4H14C13.23 4 12.53 4.3 12 4.78C11.47 4.3 10.77 4 10 4H6C4.35 4 3 5.35 3 7V9C1.35 9 0 10.35 0 12V17C0 18.65 1.35 20 3 20V22H5V20H19V22H21V20C22.65 20 24 18.65 24 17V12C24 10.35 22.65 9 21 9M14 6H18C18.55 6 19 6.45 19 7V9.78C18.39 10.33 18 11.12 18 12V14H13V7C13 6.45 13.45 6 14 6M5 7C5 6.45 5.45 6 6 6H10C10.55 6 11 6.45 11 7V14H6V12C6 11.12 5.61 10.33 5 9.78V7M22 17C22 17.55 21.55 18 21 18H3C2.45 18 2 17.55 2 17V12C2 11.45 2.45 11 3 11S4 11.45 4 12V16H20V12C20 11.45 20.45 11 21 11S22 11.45 22 12V17Z","power-plug":"M16 7V3H14V7H10V3H8V7C7 7 6 8 6 9V14.5L9.5 18V21H14.5V18L18 14.5V9C18 8 17 7 16 7M16 13.67L13.09 16.59L12.67 17H11.33L10.92 16.59L8 13.67V9.09C8 9.06 8.06 9 8.09 9H15.92C15.95 9 16 9.06 16 9.09V13.67Z","power-plug-off":"M22.11 21.46L2.39 1.73L1.11 3L6.25 8.14C6.1 8.41 6 8.7 6 9V14.5L9.5 18V21H14.5V18L15.31 17.2L20.84 22.73L22.11 21.46M13.09 16.59L12.67 17H11.33L10.92 16.59L8 13.67V9.89L13.89 15.78L13.09 16.59M12.2 9L10.2 7H14V3H16V7C17 7 18 8 18 9V14.5L17.85 14.65L16 12.8V9.09C16 9.06 15.95 9 15.92 9H12.2M10 6.8L8 4.8V3H10V6.8Z",bed:"M7 14C8.66 14 10 12.66 10 11C10 9.34 8.66 8 7 8C5.34 8 4 9.34 4 11C4 12.66 5.34 14 7 14M7 10C7.55 10 8 10.45 8 11C8 11.55 7.55 12 7 12C6.45 12 6 11.55 6 11C6 10.45 6.45 10 7 10M19 7H11V15H3V5H1V20H3V17H21V20H23V11C23 8.79 21.21 7 19 7M21 15H13V9H19C20.1 9 21 9.9 21 11Z",garden:"M10.5,3C8,3 6,5 6,7.5C6,8.11 6.13,8.71 6.37,9.27C5.5,10.12 5,11.28 5,12.5C5,15 7,17 9.5,17C10,17 10.5,16.89 11,16.72V21H13V15.77C13.5,15.91 14,16 14.5,16A5.5,5.5 0 0,0 20,10.5A5.5,5.5 0 0,0 14.5,5C14.41,5 14.33,5 14.24,5C13.41,3.76 12,3 10.5,3M10.5,5C11.82,5 12.91,6.03 13,7.35C13.46,7.12 14,7 14.5,7A3.5,3.5 0 0,1 18,10.5A3.5,3.5 0 0,1 14.5,14C13.54,14 12.63,13.61 11.96,12.91C11.76,14.12 10.72,15 9.5,15A2.5,2.5 0 0,1 7,12.5C7,11.12 7.8,10.54 9,9.79C8.2,8.76 8,8.16 8,7.5A2.5,2.5 0 0,1 10.5,5Z",car:"M18.9 6C18.7 5.4 18.1 5 17.5 5H6.5C5.8 5 5.3 5.4 5.1 6L3 12V20C3 20.5 3.5 21 4 21H5C5.6 21 6 20.5 6 20V19H18V20C18 20.5 18.5 21 19 21H20C20.5 21 21 20.5 21 20V12L18.9 6M6.8 7H17.1L18.2 10H5.8L6.8 7M19 17H5V12H19V17M7.5 13C8.3 13 9 13.7 9 14.5S8.3 16 7.5 16 6 15.3 6 14.5 6.7 13 7.5 13M16.5 13C17.3 13 18 13.7 18 14.5S17.3 16 16.5 16C15.7 16 15 15.3 15 14.5S15.7 13 16.5 13Z",lamp:"M15 2L17 9H7L9 2M13.6 4H10.4L9.55 7H14.45M11 10H13V20H16V22H8V20H11Z",calendar:"M7 11H9V13H7V11M21 5V19C21 20.11 20.11 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H6V1H8V3H16V1H18V3H19C20.11 3 21 3.9 21 5M5 7H19V5H5V7M19 19V9H5V19H19M15 13V11H17V13H15M11 13V11H13V13H11M7 15H9V17H7V15M15 17V15H17V17H15M11 17V15H13V17H11Z",message:"M20,2A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H6L2,22V4C2,2.89 2.9,2 4,2H20M4,4V17.17L5.17,16H20V4H4M6,7H18V9H6V7M6,11H15V13H6V11Z",person:"M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,6A2,2 0 0,0 10,8A2,2 0 0,0 12,10A2,2 0 0,0 14,8A2,2 0 0,0 12,6M12,13C14.67,13 20,14.33 20,17V20H4V17C4,14.33 9.33,13 12,13M12,14.9C9.03,14.9 5.9,16.36 5.9,17V18.1H18.1V17C18.1,16.36 14.97,14.9 12,14.9Z",family:"M12,5A3.5,3.5 0 0,0 8.5,8.5A3.5,3.5 0 0,0 12,12A3.5,3.5 0 0,0 15.5,8.5A3.5,3.5 0 0,0 12,5M12,7A1.5,1.5 0 0,1 13.5,8.5A1.5,1.5 0 0,1 12,10A1.5,1.5 0 0,1 10.5,8.5A1.5,1.5 0 0,1 12,7M5.5,8A2.5,2.5 0 0,0 3,10.5C3,11.44 3.53,12.25 4.29,12.68C4.65,12.88 5.06,13 5.5,13C5.94,13 6.35,12.88 6.71,12.68C7.08,12.47 7.39,12.17 7.62,11.81C6.89,10.86 6.5,9.7 6.5,8.5C6.5,8.41 6.5,8.31 6.5,8.22C6.2,8.08 5.86,8 5.5,8M18.5,8C18.14,8 17.8,8.08 17.5,8.22C17.5,8.31 17.5,8.41 17.5,8.5C17.5,9.7 17.11,10.86 16.38,11.81C16.5,12 16.63,12.15 16.78,12.3C16.94,12.45 17.1,12.58 17.29,12.68C17.65,12.88 18.06,13 18.5,13C18.94,13 19.35,12.88 19.71,12.68C20.47,12.25 21,11.44 21,10.5A2.5,2.5 0 0,0 18.5,8M12,14C9.66,14 5,15.17 5,17.5V19H19V17.5C19,15.17 14.34,14 12,14M4.71,14.55C2.78,14.78 0,15.76 0,17.5V19H3V17.07C3,16.06 3.69,15.22 4.71,14.55M19.29,14.55C20.31,15.22 21,16.06 21,17.07V19H24V17.5C24,15.76 21.22,14.78 19.29,14.55M12,16C13.53,16 15.24,16.5 16.23,17H7.77C8.76,16.5 10.47,16 12,16Z",star:Et,water:"M12,3.77L11.25,4.61C11.25,4.61 9.97,6.06 8.68,7.94C7.39,9.82 6,12.07 6,14.23A6,6 0 0,0 12,20.23A6,6 0 0,0 18,14.23C18,12.07 16.61,9.82 15.32,7.94C14.03,6.06 12.75,4.61 12.75,4.61L12,3.77M12,6.9C12.44,7.42 12.84,7.85 13.68,9.07C14.89,10.83 16,13.07 16,14.23C16,16.45 14.22,18.23 12,18.23C9.78,18.23 8,16.45 8,14.23C8,13.07 9.11,10.83 10.32,9.07C11.16,7.85 11.56,7.42 12,6.9Z","water-alert":Ft,leak:Ft,"alarm-light":"M6,6.9L3.87,4.78L5.28,3.37L7.4,5.5L6,6.9M13,1V4H11V1H13M20.13,4.78L18,6.9L16.6,5.5L18.72,3.37L20.13,4.78M4.5,10.5V12.5H1.5V10.5H4.5M19.5,10.5H22.5V12.5H19.5V10.5M6,20H18A2,2 0 0,1 20,22H4A2,2 0 0,1 6,20M12,5A6,6 0 0,1 18,11V19H6V11A6,6 0 0,1 12,5M12,7A4,4 0 0,0 8,11V17H16V11A4,4 0 0,0 12,7Z",paw:"M22.83 8.25C22.56 7.5 22.05 6.96 21.4 6.68C20.23 6.18 18.81 6.6 17.7 7.66C17.81 7.37 17.91 7.06 18 6.73C18.25 5.38 18.03 4.03 17.38 3.12C16.95 2.5 16.33 2.11 15.64 2C14.1 1.78 12.57 3.08 11.93 5C11.29 3.05 9.74 1.76 8.19 2C7.5 2.12 6.88 2.53 6.45 3.16C5.81 4.09 5.61 5.39 5.89 6.74C5.94 7 6 7.24 6.09 7.47C5 6.56 3.7 6.2 2.6 6.68C1.94 6.97 1.44 7.53 1.17 8.27C.794 9.31 .92 10.58 1.5 11.77C2.34 13.4 3.82 14.41 5.21 14.41C5.57 14.41 5.93 14.34 6.27 14.2C6.93 13.91 7.44 13.35 7.71 12.63C8.03 11.79 8 10.77 7.64 9.76C8.19 10.19 8.81 10.45 9.45 10.45C9.57 10.45 9.7 10.44 9.82 10.42C10.5 10.32 11.12 9.92 11.55 9.3C11.7 9.08 11.83 8.84 11.93 8.58C12.03 8.84 12.15 9.08 12.3 9.29C12.73 9.91 13.35 10.31 14.04 10.42C14.16 10.44 14.29 10.45 14.41 10.45C15.13 10.45 15.83 10.12 16.43 9.57C16 10.64 15.96 11.73 16.29 12.63C16.56 13.36 17.07 13.91 17.73 14.2C18.07 14.34 18.43 14.41 18.8 14.41C20.18 14.41 21.66 13.4 22.5 11.77C23.08 10.58 23.21 9.3 22.83 8.25M5.84 11.93C5.72 12.26 5.53 12.34 5.47 12.36C4.92 12.6 3.88 12 3.3 10.87C2.9 10.06 2.91 9.35 3.05 8.94C3.13 8.73 3.25 8.58 3.4 8.5C3.5 8.5 3.58 8.46 3.68 8.46C4.26 8.46 5.1 9.03 5.6 10C5.93 10.68 6.03 11.43 5.84 11.93M9.91 8.16C9.79 8.32 9.66 8.42 9.5 8.44C9 8.5 8.14 7.73 7.85 6.34C7.65 5.38 7.85 4.66 8.1 4.29C8.22 4.12 8.36 4 8.5 4C9 3.91 9.88 4.69 10.16 6.1C10.36 7.07 10.16 7.8 9.91 8.16M16 6.33C15.72 7.73 14.83 8.5 14.34 8.44C14.28 8.43 14.12 8.41 13.94 8.15C13.69 7.79 13.5 7.07 13.7 6.1C13.97 4.76 14.8 4 15.29 4C15.32 4 15.34 4 15.36 4C15.5 4 15.63 4.11 15.75 4.27C16.07 4.73 16.18 5.54 16 6.33M20.7 10.87C20.12 12 19.08 12.6 18.53 12.36C18.47 12.34 18.28 12.26 18.16 11.93C18 11.43 18.07 10.68 18.39 10C18.9 9.04 19.75 8.47 20.33 8.47C20.43 8.47 20.5 8.5 20.6 8.5H20.61C20.76 8.58 20.87 8.72 20.95 8.94C21.1 9.34 21.11 10.06 20.7 10.87M16.3 14.5C14.95 13.05 13.89 10.44 11.89 10.44C9.88 10.44 8.88 13.09 7.47 14.5C6.41 15.59 4.62 16.39 4.44 17.88C4.31 18.96 5 20.26 6 20.75C6.35 20.93 6.72 21 7.1 21C8.61 21 10.3 19.87 11.89 19.87C13.5 19.87 15.18 20.97 16.71 20.97C17.08 20.97 17.44 20.91 17.79 20.75C18.65 20.36 19.37 19.32 19.33 18.38C19.26 16.75 17.41 15.72 16.3 14.5M16.96 18.93C16.92 18.95 16.85 18.97 16.71 18.97C16.29 18.97 15.63 18.75 15 18.54C14.08 18.23 13.03 17.87 11.89 17.87C10.75 17.87 9.7 18.24 8.78 18.56C8.15 18.77 7.5 19 7.1 19C6.97 19 6.92 19 6.88 18.95C6.66 18.84 6.4 18.37 6.43 18.12C6.5 17.89 7.23 17.31 7.59 17C8.03 16.68 8.5 16.33 8.89 15.91C9.44 15.36 9.89 14.73 10.33 14.12C10.78 13.5 11.53 12.44 11.89 12.44C12.29 12.44 13.08 13.56 13.56 14.22C13.95 14.78 14.36 15.35 14.82 15.85C15.21 16.27 15.62 16.64 16 17C16.54 17.45 17.32 18.14 17.33 18.44C17.32 18.58 17.12 18.86 16.96 18.93Z",automation:"M10.5 15.5C10.5 15.87 10.4 16.2 10.22 16.5C9.88 15.91 9.24 15.5 8.5 15.5S7.12 15.91 6.78 16.5C6.61 16.2 6.5 15.87 6.5 15.5C6.5 14.4 7.4 13.5 8.5 13.5S10.5 14.4 10.5 15.5M23 15V18C23 18.55 22.55 19 22 19H21V20C21 21.11 20.11 22 19 22H5C3.9 22 3 21.11 3 20V19H2C1.45 19 1 18.55 1 18V15C1 14.45 1.45 14 2 14H3C3 10.13 6.13 7 10 7H11V5.73C10.4 5.39 10 4.74 10 4C10 2.9 10.9 2 12 2S14 2.9 14 4C14 4.74 13.6 5.39 13 5.73V7H14C17.87 7 21 10.13 21 14H22C22.55 14 23 14.45 23 15M21 16H19V14C19 11.24 16.76 9 14 9H10C7.24 9 5 11.24 5 14V16H3V17H5V20H19V17H21V16M15.5 13.5C14.4 13.5 13.5 14.4 13.5 15.5C13.5 15.87 13.61 16.2 13.78 16.5C14.12 15.91 14.76 15.5 15.5 15.5S16.88 15.91 17.22 16.5C17.4 16.2 17.5 15.87 17.5 15.5C17.5 14.4 16.61 13.5 15.5 13.5Z",guests:"M5,15L4.4,14.5C2.4,12.6 1,11.4 1,9.9C1,8.7 2,7.7 3.2,7.7C3.9,7.7 4.6,8 5,8.5C5.4,8 6.1,7.7 6.8,7.7C8,7.7 9,8.6 9,9.9C9,11.4 7.6,12.6 5.6,14.5L5,15M15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4M15,10.1A2.1,2.1 0 0,1 12.9,8A2.1,2.1 0 0,1 15,5.9C16.16,5.9 17.1,6.84 17.1,8C17.1,9.16 16.16,10.1 15,10.1M15,13C12.33,13 7,14.33 7,17V20H23V17C23,14.33 17.67,13 15,13M21.1,18.1H8.9V17C8.9,16.36 12,14.9 15,14.9C17.97,14.9 21.1,16.36 21.1,17V18.1Z",assistant:"M9 4L11.5 9.5L17 12L11.5 14.5L9 20L6.5 14.5L1 12L6.5 9.5L9 4M9 8.83L8 11L5.83 12L8 13L9 15.17L10 13L12.17 12L10 11L9 8.83M19 9L17.74 6.26L15 5L17.74 3.75L19 1L20.25 3.75L23 5L20.25 6.26L19 9M19 23L17.74 20.26L15 19L17.74 17.75L19 15L20.25 17.75L23 19L20.25 20.26L19 23Z",microphone:"M17.3,11C17.3,14 14.76,16.1 12,16.1C9.24,16.1 6.7,14 6.7,11H5C5,14.41 7.72,17.23 11,17.72V21H13V17.72C16.28,17.23 19,14.41 19,11M10.8,4.9C10.8,4.24 11.34,3.7 12,3.7C12.66,3.7 13.2,4.24 13.2,4.9L13.19,11.1C13.19,11.76 12.66,12.3 12,12.3C11.34,12.3 10.8,11.76 10.8,11.1M12,14A3,3 0 0,0 15,11V5A3,3 0 0,0 12,2A3,3 0 0,0 9,5V11A3,3 0 0,0 12,14Z","book-open-variant":"M12 21.5C10.65 20.65 8.2 20 6.5 20C4.85 20 3.15 20.3 1.75 21.05C1.65 21.1 1.6 21.1 1.5 21.1C1.25 21.1 1 20.85 1 20.6V6C1.6 5.55 2.25 5.25 3 5C4.11 4.65 5.33 4.5 6.5 4.5C8.45 4.5 10.55 4.9 12 6C13.45 4.9 15.55 4.5 17.5 4.5C18.67 4.5 19.89 4.65 21 5C21.75 5.25 22.4 5.55 23 6V20.6C23 20.85 22.75 21.1 22.5 21.1C22.4 21.1 22.35 21.1 22.25 21.05C20.85 20.3 19.15 20 17.5 20C15.8 20 13.35 20.65 12 21.5M11 7.5C9.64 6.9 7.84 6.5 6.5 6.5C5.3 6.5 4.1 6.65 3 7V18.5C4.1 18.15 5.3 18 6.5 18C7.84 18 9.64 18.4 11 19V7.5M13 19C14.36 18.4 16.16 18 17.5 18C18.7 18 19.9 18.15 21 18.5V7C19.9 6.65 18.7 6.5 17.5 6.5C16.16 6.5 14.36 6.9 13 7.5V19M14 16.35C14.96 16 16.12 15.83 17.5 15.83C18.54 15.83 19.38 15.91 20 16.07V14.57C19.13 14.41 18.29 14.33 17.5 14.33C16.16 14.33 15 14.5 14 14.76V16.35M14 13.69C14.96 13.34 16.12 13.16 17.5 13.16C18.54 13.16 19.38 13.24 20 13.4V11.9C19.13 11.74 18.29 11.67 17.5 11.67C16.22 11.67 15.05 11.82 14 12.12V13.69M14 11C14.96 10.67 16.12 10.5 17.5 10.5C18.41 10.5 19.26 10.59 20 10.78V9.23C19.13 9.08 18.29 9 17.5 9C16.18 9 15 9.15 14 9.46V11Z",floors:"M12 16.54L19.37 10.8L21 12.07L12 19.07L3 12.07L4.62 10.81L12 16.54M12 14L3 7L12 0L21 7L12 14M12 2.53L6.26 7L12 11.47L17.74 7L12 2.53M12 21.47L19.37 15.73L21 17L12 24L3 17L4.62 15.74L12 21.47",layers:"M12,18.54L19.37,12.8L21,14.07L12,21.07L3,14.07L4.62,12.81L12,18.54M12,16L3,9L12,2L21,9L12,16M12,4.53L6.26,9L12,13.47L17.74,9L12,4.53Z",movie:"M20.84 2.18L16.91 2.96L19.65 6.5L21.62 6.1L20.84 2.18M13.97 3.54L12 3.93L14.75 7.46L16.71 7.07L13.97 3.54M9.07 4.5L7.1 4.91L9.85 8.44L11.81 8.05L9.07 4.5M4.16 5.5L3.18 5.69C2.1 5.9 1.39 6.96 1.61 8.04L2 10L6.9 9.03L4.16 5.5M20 12V20H4V12H20M22 10H2V20C2 21.11 2.9 22 4 22H20C21.11 22 22 21.11 22 20V10Z",bullhorn:"M12,8H4A2,2 0 0,0 2,10V14A2,2 0 0,0 4,16H5V20A1,1 0 0,0 6,21H8A1,1 0 0,0 9,20V16H12L17,20V4L12,8M15,15.6L13,14H4V10H13L15,8.4V15.6M21.5,12C21.5,13.71 20.54,15.26 19,16V8C20.53,8.75 21.5,10.3 21.5,12Z",wrench:"M22.61,19L13.53,9.91C14.46,7.57 14,4.81 12.09,2.91C9.79,0.61 6.21,0.4 3.66,2.26L7.5,6.11L6.08,7.5L2.25,3.69C0.39,6.23 0.6,9.82 2.9,12.11C4.76,13.97 7.47,14.46 9.79,13.59L18.9,22.7C19.29,23.09 19.92,23.09 20.31,22.7L22.61,20.4C23,20 23,19.39 22.61,19M19.61,20.59L10.15,11.13C9.54,11.58 8.86,11.85 8.15,11.95C6.79,12.15 5.36,11.74 4.32,10.7C3.37,9.76 2.93,8.5 3,7.26L6.09,10.35L10.33,6.11L7.24,3C8.5,2.95 9.73,3.39 10.68,4.33C11.76,5.41 12.17,6.9 11.92,8.29C11.8,9 11.5,9.66 11.04,10.25L20.5,19.7L19.61,20.59Z",dashboard:"M19,5V7H15V5H19M9,5V11H5V5H9M19,13V19H15V13H19M9,17V19H5V17H9M21,3H13V9H21V3M11,3H3V13H11V3M21,11H13V21H21V11M11,15H3V21H11V15Z",flash:"M7,2H17L13.5,9H17L10,22V14H7V2M9,4V12H12V14.66L14,11H10.24L13.76,4H9Z","toggle-on":"M17 6H7C3.69 6 1 8.69 1 12S3.69 18 7 18H17C20.31 18 23 15.31 23 12S20.31 6 17 6M17 16H7C4.79 16 3 14.21 3 12S4.79 8 7 8H17C19.21 8 21 9.79 21 12S19.21 16 17 16M17 9C15.34 9 14 10.34 14 12S15.34 15 17 15 20 13.66 20 12 18.66 9 17 9Z"};let xi=class extends ct{constructor(){super(...arguments),this.icon=""}render(){const t=this.icon.replace(/^mdi:/,""),e=Yt[this.icon]??Yt[t];if(e){const i=vi[t];return B`<svg class="mono" viewBox="0 0 24 24" aria-hidden="true">${i?Z`<path class="f" d=${e}></path><path class="o" d=${i}></path>`:Z`<path d=${e}></path>`}</svg>
        <svg class="duo" viewBox="0 0 24 24" aria-hidden="true">
          ${i?Z`<path class="back" d=${e}></path><path d=${i}></path>`:Z`<path class="halo" d=${e}></path><path d=${e}></path>`}
        </svg>`}return this.icon.startsWith("mdi:")&&customElements.get("ha-icon")?B`<ha-icon .icon=${this.icon}></ha-icon>`:this.icon?B`<svg viewBox="0 0 24 24" aria-hidden="true">${Z`<path d=${Yt.grid}></path>`}</svg>`:U}};function wi(t,e,i=0,s,{stiffness:n=420,damping:a=34,mass:o=1}={}){const r=1/120;let l=t-e,c=1e3*i;const d=[t];for(let p=0;p<240;p++){if(c+=(-n*l-a*c)/o*r,l+=c*r,d.push(e+l),Math.abs(l)<.3&&Math.abs(c)<4)break}return d.push(e),{frames:d.map(s),duration:Math.round((d.length-1)*r*1e3)}}xi.styles=r`
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
    /* Line icons (Settings → icons): the outline drawing where MDI has one, the solid one otherwise. */
    .mono .f {
      display: var(--fill-on, inline);
    }
    .mono .o {
      display: var(--line-on, none);
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
  `,yi([gt()],xi.prototype,"icon",2),xi=yi([pt("sn-icon")],xi);const $i={tick:3,tap:6,on:[8,30,4],off:5,press:10,success:[6,50,10],warn:[20,60,20]};function ki(t){navigator.vibrate?.($i[t])}var Ci=Object.defineProperty,Mi=Object.getOwnPropertyDescriptor,Hi=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Mi(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&Ci(e,i,a),a};let Ai=class extends ct{constructor(){super(...arguments),this.sheets=[],this.closing=!1,this.grown=new WeakSet,this.onKey=t=>{"Escape"===t.key&&this.sheets.length&&this.dismiss()},this.onPullDown=t=>{if(0!==t.button||t.target.closest("button, input, select, textarea, a"))return;const e=t.currentTarget.closest(".sheet");this.pull={id:t.pointerId,y:t.clientY,x:t.clientX,dy:0,lastY:t.clientY,lastT:performance.now(),v:0,on:!1,sheet:e,scrim:e.parentElement}},this.onPullMove=t=>{const e=this.pull;if(!e||t.pointerId!==e.id)return;const i=t.clientY-e.y;if(!e.on){if(i<-6||Math.abs(t.clientX-e.x)>Math.abs(i))return void(this.pull=void 0);if(i<8)return;e.on=!0,t.currentTarget.setPointerCapture(t.pointerId)}const s=performance.now();e.v=(t.clientY-e.lastY)/Math.max(1,s-e.lastT),e.lastY=t.clientY,e.lastT=s,e.dy=Math.max(0,i),e.sheet.style.transform=`translateY(${e.dy}px)`,e.scrim.style.backgroundColor=`color-mix(in srgb, var(--scrim) ${Math.round(100-70*Math.min(1,e.dy/500))}%, transparent)`},this.onPullUp=t=>{const e=this.pull;if(this.pull=void 0,!e?.on||t.pointerId!==e.id)return;const i=e.sheet.offsetHeight,s=()=>{e.sheet.style.transform="",e.scrim.style.backgroundColor=""};if(e.dy>.28*i||e.v>.55){ki("tick");const t=i+40,n=Math.max(140,Math.min(320,(t-e.dy)/Math.max(e.v,1.2)|0));e.scrim.animate([{opacity:1},{opacity:0}],{duration:n,fill:"forwards"}),e.sheet.animate([{transform:`translateY(${e.dy}px)`},{transform:`translateY(${t}px)`}],{duration:n,easing:"cubic-bezier(0.2, 0.7, 0.4, 1)",fill:"forwards"}).finished.then((()=>{const t=this.sheets[this.sheets.length-1];t?.onClose?.(),this.ctx.closeSheet(),requestAnimationFrame((()=>{s(),e.sheet.getAnimations().forEach((t=>t.cancel())),e.scrim.getAnimations().forEach((t=>t.cancel()))}))}))}else{const{frames:t,duration:i}=wi(e.dy,0,e.v,(t=>({transform:`translateY(${t}px)`})));s(),e.sheet.animate(t,{duration:i})}},this.still=new WeakMap}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this.onKey)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this.onKey)}useOrigin(t){return!!t.origin?.isConnected&&window.innerWidth>600&&!matchMedia("(prefers-reduced-motion: reduce)").matches}originTransform(t,e){const i=t.getBoundingClientRect(),s=e.getBoundingClientRect(),n=Math.min(1,Math.max(.2,s.width/i.width));return`translate(${s.left+s.width/2-(i.left+i.width/2)}px, ${s.top+s.height/2-(i.top+i.height/2)}px) scale(${n})`}updated(){this.sheets.forEach(((t,e)=>{if(this.grown.has(t))return;if(this.grown.add(t),!this.useOrigin(t))return;const i=this.renderRoot.querySelectorAll(".sheet")[e];i&&(i.classList.add("from-origin"),i.animate([{transform:this.originTransform(i,t.origin),opacity:.4},{transform:"none",opacity:1}],{duration:380,easing:"cubic-bezier(0.32, 0.72, 0, 1)"}))}))}dismiss(){const t=this.sheets[this.sheets.length-1];if(1===this.sheets.length&&this.useOrigin(t)){const e=this.renderRoot.querySelectorAll(".sheet")[0];return this.closing=!0,void e.animate([{transform:"none",opacity:1},{transform:this.originTransform(e,t.origin),opacity:0}],{duration:240,easing:"cubic-bezier(0.22, 1, 0.36, 1)",fill:"forwards"}).finished.then((()=>{this.closing=!1,t.onClose?.(),this.ctx.closeSheet()}))}1===this.sheets.length?(this.closing=!0,window.setTimeout((()=>{this.closing=!1,t.onClose?.(),this.ctx.closeSheet()}),190)):(t.onClose?.(),this.ctx.closeSheet())}body(t){if(!t.still)return t.render(this.ctx);const{ctx:e}=this,i=[e.config,e.lang,e.dark,e.editing,e.isAdmin],s=this.still.get(t);if(s&&s.key.every(((t,e)=>t===i[e])))return s.tpl;const n=t.render(e);return this.still.set(t,{key:i,tpl:n}),n}render(){return this.sheets.length?this.sheets.map(((t,e)=>B`
        <div
          class="scrim ${this.closing&&e===this.sheets.length-1?"closing":""}"
          @click=${t=>t.target===t.currentTarget&&e===this.sheets.length-1&&this.dismiss()}
        >
          <div class="sheet" role="dialog" aria-modal="true" aria-label=${t.title??""}>
            <header @pointerdown=${this.onPullDown} @pointermove=${this.onPullMove} @pointerup=${this.onPullUp} @pointercancel=${this.onPullUp}>
              <h2>${t.title??""}</h2>
              <button class="icon-btn small pressable" aria-label=${this.ctx.t("close")} @click=${()=>this.dismiss()}>
                <sn-icon icon="close" style="--icon-size:20px"></sn-icon>
              </button>
            </header>
            <div class="body">${this.body(t)}</div>
          </div>
        </div>
      `)):U}};Ai.styles=[fi,r`
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
        touch-action: none; /* the header drags the sheet down to close it */
        cursor: grab;
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
        /* The grab handle sits in the header, which is what drags. */
        header {
          position: relative;
          padding-top: 24px;
        }
        header::before {
          content: "";
          position: absolute;
          top: 8px;
          left: 50%;
          width: 40px;
          height: 5px;
          margin-left: -20px;
          border-radius: 3px;
          background: var(--surface-2);
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
    `],Hi([gt({attribute:!1})],Ai.prototype,"ctx",2),Hi([gt({attribute:!1})],Ai.prototype,"sheets",2),Hi([mt()],Ai.prototype,"closing",2),Ai=Hi([pt("sn-sheet-host")],Ai);const Li={basic:0,pro:1,premium:2},Vi={w_floorplan:"basic",w_tile:"basic",w_camera:"basic",w_heading:"basic",w_clock:"basic",w_modes:"basic",alarm:"basic",w_vacuum:"pro",w_visitors:"pro",w_energy:"pro",w_check:"pro",weather_bg:"pro",photo_frame:"pro",cinematic:"pro",morning:"pro",heat_map:"pro",room_glow:"pro",timers:"pro",fully:"pro",w_forecast:"basic",w_family:"pro",w_todo:"pro",w_calendar:"pro",w_countdown:"pro",messages:"pro",kids:"premium",w_gauge:"basic",lock_history:"pro",w_gate:"pro",sky:"pro",clock_styles:"pro",air_maps:"pro",plan_3d:"premium",people_on_plan:"premium",liquid_glass:"premium",guests:"premium",w_media:"basic",wizard:"basic",transfer:"basic",rating:"basic",w_remote:"pro",maintenance:"pro",broadcast:"premium",cinema:"premium",w_frigate:"premium",w_schedule:"premium",automations:"premium",w_energy_stats:"premium",w_panic:"premium",camera_wall:"premium",seasons:"premium",assistant:"premium",ai_doorbell:"premium",ai_summary:"premium",habits:"premium",ai_explain:"pro",w_consumers:"pro",w_water:"pro",overload:"pro",solar_tip:"pro",bill_budget:"pro",plan_fx:"premium",plan_replay:"premium",floor_stack:"premium",fly_to_room:"pro",robot_on_plan:"pro",travel:"premium",alarm_screen:"pro",package:"pro",weather_alert:"pro",w_wake:"premium",w_chores:"pro",w_air:"pro",light_fx:"premium",person_pages:"pro",history:"pro",report:"pro",presets:"basic",support:"basic",ai_scene:"premium",ai_automation:"premium",ai_cameras:"premium",ai_bill:"premium",voice:"premium",w_boiler:"premium",w_irrigation:"pro",home_helpers:"pro",w_timeline:"premium",w_internet:"premium",guest_codes:"premium",faces:"premium",w_board:"pro",w_verse:"basic",w_radar:"pro",w_commute:"pro",w_parcels:"pro",tou:"pro",energy_challenge:"basic",refill:"basic",heartbeat:"basic",warranty:"pro",battery_plan:"pro",showroom:"basic",style_pro:"premium",w_hero:"premium",w_stack:"premium",w_room:"premium",island:"premium",bento:"premium",wallpaper:"premium",dock:"premium",dial:"premium",search:"pro",charts:"pro",complications:"pro",ui_sounds:"pro",boot:"basic",cinematic_pages:"premium",wiggle:"basic",live_gallery:"pro",motion_levels:"basic",plan_model:"premium",night_halos:"premium",plan_lens:"pro",breathing:"premium",high_contrast:"basic",music_backdrop:"premium",window_camera:"premium",welcome:"premium",page_moods:"premium",monogram:"premium",sun_arc:"premium",status_line:"premium",season_skin:"premium",light_wave:"premium",push_back:"premium",autobuild:"basic",w_ac:"basic",w_scenes:"basic",w_sensor:"basic",w_batteries:"basic",w_lights:"basic",w_covers:"basic",w_prayer:"basic",tilt:"pro",rain_glass:"pro",sun_on_plan:"pro",fonts:"pro",icon_styles:"basic",accent_day:"pro",active_glow:"pro",aurora:"pro",occasions:"basic",night_red:"basic",simple_mode:"basic",burn_in:"basic",w_folder:"basic",ac_week:"pro",notif_center:"basic",mini_player:"basic",live_timers:"basic",nudges:"pro",white_label:"pro",phone_qr:"basic",circadian:"pro",page_users:"pro",quick_scenes:"basic"},Si=t=>Vi[t],zi=(t,e)=>Li[t]>=Li[Vi[e]],Di=t=>`w_${t}`;let Oi,Ti=!1;const ji=t=>Ti=t;function Pi(t,e,i,s,n="sine",a){const o=function(){try{return Oi??=new AudioContext,"suspended"===Oi.state&&Oi.resume().catch((()=>{})),Oi}catch{return}}();if(!o)return;const r=o.createOscillator(),l=o.createGain();r.type=n;const c=o.currentTime+e;r.frequency.setValueAtTime(t,c),a&&r.frequency.exponentialRampToValueAtTime(a,c+i),l.gain.setValueAtTime(1e-4,c),l.gain.exponentialRampToValueAtTime(s,c+.008),l.gain.exponentialRampToValueAtTime(1e-4,c+i),r.connect(l).connect(o.destination),r.start(c),r.stop(c+i+.05)}function Ii(t){if(Ti)switch(t){case"on":return Pi(880,0,.09,.05,"sine",1320);case"off":return Pi(660,0,.09,.045,"sine",440);case"tap":return Pi(1200,0,.03,.025,"triangle");case"lock":return Pi(300,0,.05,.08,"square",180),Pi(1400,.06,.05,.04,"triangle");case"unlock":return Pi(1400,0,.05,.04,"triangle"),Pi(220,.06,.06,.07,"square",320)}}function Ei(t){switch(t){case"dingdong":return Pi(784,0,1.1,.35),Pi(587,.55,1.5,.35);case"melody":return void[659,784,988,1319].forEach(((t,e)=>Pi(t,.18*e,.7,.25)));default:return Pi(659.25,0,1.2,.35),Pi(523.25,.45,1.2,.35)}}const Ni=Object.freeze(Object.defineProperty({__proto__:null,playBell:Ei,playUi:Ii,setSounds:ji},Symbol.toStringTag,{value:"Module"}));var Wi=Object.defineProperty,Ri=Object.getOwnPropertyDescriptor,Fi=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Ri(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&Wi(e,i,a),a};let Bi=class extends ct{constructor(){super(...arguments),this.value=""}render(){const t=[...this.value.replace(/[⁦-⁩]/g,"")];return B`${Ht(t,((e,i)=>t.length-i),(t=>/\d/.test(t)?B`<span class="d" aria-hidden="true"
              ><span class="strip" style="transform:translateY(${1.2*-Number(t)}em)"
                >${[0,1,2,3,4,5,6,7,8,9].map((t=>B`<span>${t}</span>`))}</span
              ></span
            >`:B`<span aria-hidden="true">${t}</span>`))}<span style="position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)">${this.value}</span>`}};Bi.styles=r`
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
  `,Fi([gt()],Bi.prototype,"value",2),Bi=Fi([pt("sn-num")],Bi);const Zi=t=>(t=>{const e=t.replace(/[\u2066-\u2069]/g,"");return/\d/.test(e)&&e.length<=16&&/^[\d\s.,:%°+\-\u2212A-Za-z²³/µ]+$/.test(e)})(t)?B`<sn-num .value=${t}></sn-num>`:t,qi=r`
  .living-spin,
  .living-drift,
  .living-glow,
  .living-wobble {
    animation-play-state: var(--loops, running) !important;
  }
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
`;function Ui(t){if(!t||!ne(t))return"";const e=ee(t.entity_id);return"fan"===e?"living-spin":"climate"===e?"heat"===t.state||"heating"===t.attributes.hvac_action?"living-glow":"living-drift":"vacuum"===e&&"cleaning"===t.state?"living-wobble":""}const Yi="cubic-bezier(0.22, 1, 0.36, 1)";let Xi=!1;function Ki(t,e,i){if(!t||!e||void 0===i||i===e.state||Xi)return;if("unavailable"===i||"unavailable"===e.state)return;if(matchMedia("(prefers-reduced-motion: reduce)").matches)return void t.animate([{opacity:.4},{opacity:1}],{duration:200,easing:Yi});const s=ee(e.entity_id),n=e.attributes.device_class;"light"===s&&"on"===e.state?t.animate([{transform:"scale(0.82)"},{transform:"scale(1.14)",offset:.55},{transform:"scale(1)"}],{duration:280,easing:Yi}):"lock"!==s||"locked"!==e.state&&"unlocked"!==e.state?"binary_sensor"===s&&["door","window","opening","garage_door"].includes(n)||"cover"===s?t.animate([{transform:"rotate(-14deg)"},{transform:"rotate(0)"}],{duration:260,easing:Yi}):"on"!==e.state&&"off"!==e.state||t.animate([{transform:"scale(0.9)"},{transform:"scale(1)"}],{duration:160,easing:Yi}):t.animate([{transform:"perspective(120px) rotateY(-180deg) scale(0.9)"},{transform:"perspective(120px) rotateY(0) scale(1)"}],{duration:380,easing:Yi})}let Gi,Ji={},Qi=0;const ts=new Set;function es(t,e=!1){return Gi||!e&&Date.now()-Qi<2e4?Gi??Promise.resolve():(Gi=t.callWS({type:"smartnest/timer/list"}).then((t=>{const e=Object.fromEntries(Object.entries(t).map((([t,e])=>[t,Date.parse(e)])));Qi=Date.now(),JSON.stringify(e)!==JSON.stringify(Ji)&&(Ji=e,ts.forEach((t=>t())))})).catch((()=>{})).finally((()=>Gi=void 0)),Gi)}var is=Object.defineProperty,ss=Object.getOwnPropertyDescriptor,ns=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?ss(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&is(e,i,a),a};let as=class extends ct{constructor(){super(...arguments),this.entityId="",this.at={x:0,y:0},this.onKey=t=>"Escape"===t.key&&this.onDone()}connectedCallback(){super.connectedCallback(),this.addEventListener("click",(t=>t.target===this&&this.onDone())),window.addEventListener("keydown",this.onKey)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this.onKey)}items(){const{ctx:t,entityId:e}=this,{hass:i,t:s}=t,n=i.states[e],a=ee(e),o=(n,a,o={})=>()=>i.callService(n,a,{entity_id:e,...o}).catch((()=>t.toast(s("error")))),r=n=>()=>i.callWS({type:"smartnest/timer/set",entity_id:e,minutes:n}).then((()=>(t.toast(s("radial_timer_set",{n:n})),es(i,!0))),(()=>t.toast(s("error")))),l=[];if("light"===a){const t=n?.attributes.supported_color_modes??[];if(t.some((t=>"onoff"!==t)))for(const e of[25,50,100])l.push({icon:25===e?"brightness-5":50===e?"brightness-6":"brightness-7",label:`${e}%`,run:o("light","turn_on",{brightness_pct:e})});t.some((t=>["color_temp","hs","rgb","rgbw","rgbww","xy"].includes(t)))&&(l.push({icon:"fire",label:s("radial_warm"),run:o("light","turn_on",{color_temp_kelvin:2700})}),l.push({icon:"snowflake",label:s("radial_cool"),run:o("light","turn_on",{color_temp_kelvin:5e3})})),l.push({icon:"timer-outline",label:s("radial_off_in",{n:30}),run:r(30)})}else if("cover"===a)l.push({icon:"arrow-up",label:s("open"),run:o("cover","open_cover")}),l.push({icon:"blinds",label:"50%",run:o("cover","set_cover_position",{position:50})}),l.push({icon:"arrow-down",label:s("closed"),run:o("cover","close_cover")});else if(["switch","fan","input_boolean","climate","media_player"].includes(a))for(const c of[15,30,60])l.push({icon:"timer-outline",label:s("radial_off_in",{n:c}),run:r(c)});return l.push({icon:"dots-horizontal",label:s("radial_more"),run:()=>t.openEntity(e)}),l}render(){const t=this.items(),e=92,i=Math.min(window.innerWidth-e-36,Math.max(128,this.at.x)),s=Math.min(window.innerHeight-e-36,Math.max(148,this.at.y));return B`<div class="hub" style="left:${i}px;top:${s}px">
      <span class="name" style="left:0;top:0">${ie(this.ctx.hass,this.ctx.config,this.entityId)}</span>
      ${t.map(((i,s)=>{const n=-Math.PI/2+s/t.length*Math.PI*2;return B`<button
          style="left:${Math.cos(n)*e}px;top:${Math.sin(n)*e+0}px;animation-delay:${28*s}ms"
          aria-label=${i.label}
          @click=${()=>{ki("tap"),i.run(),this.onDone()}}
        >
          <sn-icon .icon=${i.icon}></sn-icon><span>${i.label}</span>
        </button>`}))}
    </div>`}};as.styles=r`
    :host {
      position: fixed;
      inset: 0;
      z-index: 70;
      background: color-mix(in srgb, var(--scrim) 70%, transparent);
      -webkit-backdrop-filter: blur(4px);
      backdrop-filter: blur(4px);
      animation: fade 180ms ease-out;
    }
    .hub {
      position: absolute;
      width: 0;
      height: 0;
    }
    .name {
      position: absolute;
      transform: translate(-50%, -50%);
      white-space: nowrap;
      font: 700 15px var(--font);
      color: var(--text);
      background: var(--surface-solid);
      padding: 8px 14px;
      border-radius: 999px;
      box-shadow: var(--shadow-lift);
      animation: pop 260ms cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    button {
      position: absolute;
      transform: translate(-50%, -50%);
      width: 58px;
      height: 58px;
      border-radius: 50%;
      border: 0;
      background: var(--surface-solid);
      color: var(--text);
      box-shadow: var(--shadow-lift);
      display: grid;
      place-items: center;
      align-content: center;
      gap: 1px;
      cursor: pointer;
      font: 600 11px var(--font);
      --icon-size: 22px;
      animation: fly 320ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
    }
    button:active {
      transform: translate(-50%, -50%) scale(0.92);
    }
    button span {
      max-width: 54px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    @keyframes fade {
      from {
        opacity: 0;
      }
    }
    @keyframes pop {
      from {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.6);
      }
    }
    @keyframes fly {
      from {
        opacity: 0;
        left: 0;
        top: 0;
        transform: translate(-50%, -50%) scale(0.3);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      :host,
      .name,
      button {
        animation: none;
      }
    }
  `,ns([gt({attribute:!1})],as.prototype,"ctx",2),ns([gt()],as.prototype,"entityId",2),ns([gt({attribute:!1})],as.prototype,"at",2),ns([gt({attribute:!1})],as.prototype,"onDone",2),as=ns([pt("sn-radial")],as);var os=Object.defineProperty,rs=Object.getOwnPropertyDescriptor,ls=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?rs(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&os(e,i,a),a};const cs=["light","cover","switch","fan","input_boolean","climate","media_player"];let ds=class extends ct{constructor(){super(...arguments),this.slideDown=t=>{if(0!==t.button||this.ctx.editing||!this.dimmable())return;const e=this.ctx.hass.states[this.widget.config.entity],i="on"===e?.state?Math.round((e.attributes.brightness??255)/255*100):0,s={id:t.pointerId,x:t.clientX,y:t.clientY,from:i,armed:!1,on:!1,w:t.currentTarget.offsetWidth};s.timer=window.setTimeout((()=>{s.armed=!0,t.target.closest(".tile")?.classList.add("armed")}),260),this.slide=s},this.slideMove=t=>{const e=this.slide;if(!e||t.pointerId!==e.id)return;const i=t.clientX-e.x;if(!e.armed)return void(Math.hypot(i,t.clientY-e.y)>10&&this.endSlide(t.currentTarget));if(!e.on){if(Math.abs(i)<6)return;e.on=!0,t.currentTarget.setPointerCapture(t.pointerId),this.dispatchEvent(new CustomEvent("sn-cancel-swipe",{bubbles:!0,composed:!0})),ki("tick")}const s=this.ctx.rtl?-1:1,n=Math.round(Math.min(100,Math.max(0,e.from+i*s/Math.max(120,e.w)*100)));void 0!==this.dim&&Math.floor(n/10)!==Math.floor(this.dim/10)&&ki("tick"),this.dim=n},this.slideUp=t=>{const e=this.slide;if(!e||t.pointerId!==e.id)return;const i=this.dim;if(this.endSlide(t.currentTarget),e.on&&void 0!==i){const t=this.widget.config.entity;(0===i?this.ctx.hass.callService("light","turn_off",{entity_id:t}):this.ctx.hass.callService("light","turn_on",{entity_id:t,brightness_pct:i})).catch((()=>this.ctx.toast(this.ctx.t("error"))))}}}bind(){const t=this.renderRoot.querySelector(".tile");if(t&&!this.unbind){const e=function(t,e,i){let s,n=null,a=!1;const o=()=>{window.clearTimeout(s),s=void 0},r=t=>{0===t.button&&(a=!1,n={x:t.clientX,y:t.clientY},o(),s=window.setTimeout((()=>{a=!0,ki("press"),i()}),450))},l=t=>{n&&Math.hypot(t.clientX-n.x,t.clientY-n.y)>10&&(o(),n=null)},c=()=>{const t=null!==n&&void 0!==s;o(),n=null,t&&!a&&e()},d=()=>{o(),n=null},p=t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),e())},h=t=>t.preventDefault();return t.addEventListener("pointerdown",r),t.addEventListener("pointermove",l),t.addEventListener("pointerup",c),t.addEventListener("pointercancel",d),t.addEventListener("pointerleave",d),t.addEventListener("keydown",p),t.addEventListener("contextmenu",h),()=>{o(),t.removeEventListener("pointerdown",r),t.removeEventListener("pointermove",l),t.removeEventListener("pointerup",c),t.removeEventListener("pointercancel",d),t.removeEventListener("pointerleave",d),t.removeEventListener("keydown",p),t.removeEventListener("contextmenu",h)}}(t,(()=>this.tap()),(()=>this.long(t)));t.addEventListener("pointerdown",this.slideDown),t.addEventListener("pointermove",this.slideMove),t.addEventListener("pointerup",this.slideUp),t.addEventListener("pointercancel",this.slideUp),this.unbind=()=>{e(),t.removeEventListener("pointerdown",this.slideDown),t.removeEventListener("pointermove",this.slideMove),t.removeEventListener("pointerup",this.slideUp),t.removeEventListener("pointercancel",this.slideUp)}}}renderLeft(t,e){if(!e)return"";const i=function(t,e){const i=Ji[e];if(i&&i>Date.now())return{left:Math.max(1,Math.round((i-Date.now())/6e4)),kind:"timer"};const s=t.entities?.[e]?.device_id;if(s)for(const[n,a]of Object.entries(t.entities??{})){if(a.device_id!==s||!n.startsWith("sensor."))continue;const e=t.states[n];if(e&&/remaining|finish|end_time|time_left|program_end/i.test(n))if("timestamp"===e.attributes.device_class){const t=Date.parse(e.state)-Date.now();if(t>0&&t<864e5)return{left:Math.max(1,Math.round(t/6e4)),kind:"cycle"}}else{const t=Number(e.state),i=e.attributes.unit_of_measurement,s="h"===i?60*t:"s"===i?t/60:t;if(t>0&&s<1440)return{left:Math.max(1,Math.round(s)),kind:"cycle"}}}}(this.ctx.hass,t);if(i&&!this.leftTick&&(this.leftTick=window.setInterval((()=>this.requestUpdate()),3e4)),!i&&this.leftTick&&(window.clearInterval(this.leftTick),this.leftTick=void 0),!i)return"";const s=i.left>=60?`${Math.floor(i.left/60)}:${String(i.left%60).padStart(2,"0")}`:this.ctx.t("min_short",{n:i.left});return B`<span class="left ltr"><sn-icon icon=${"timer"===i.kind?"timer-outline":"progress-clock"}></sn-icon>${s}</span>`}long(t){if(this.ctx.editing||this.slide?.on)return;const e=this.widget.config.entity,i=this.ctx.hass.states[e];i&&"unavailable"!==i.state&&cs.includes(ee(e))?function(t,e,i){let s,n=i;for(;n;){const t=n.getRootNode();if(!(t instanceof ShadowRoot))break;if("SMARTNEST-PANEL"===t.host.tagName){s=t.host;break}n=t.host}const a=s?.shadowRoot?.querySelector(".app")??document.body,o=i.getBoundingClientRect(),r=document.createElement("sn-radial");r.ctx=t,r.entityId=e,r.at={x:o.left+o.width/2,y:o.top+o.height/2},r.onDone=()=>r.remove(),ki("press"),a.appendChild(r)}(this.ctx,e,t):this.ctx.openEntity(e,t)}dimmable(){const t=this.widget.config.entity,e=this.ctx.hass.states[t]?.attributes.supported_color_modes??[];return"light"===ee(t)&&e.some((t=>"onoff"!==t))}endSlide(t){window.clearTimeout(this.slide?.timer),t.classList.remove("armed"),this.slide=void 0,void 0!==this.dim&&window.setTimeout((()=>this.dim=void 0),600)}firstUpdated(){this.bind()}updated(){const t=this.ctx.hass.states[this.widget.config.entity];Ki(this.renderRoot.querySelector(".ic sn-icon"),t,this.prevState),this.prevState=t?.state}connectedCallback(){var t;super.connectedCallback(),this.offTimers=(t=()=>this.requestUpdate(),ts.add(t),()=>ts.delete(t)),this.hasUpdated&&this.bind()}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this.leftTick),this.leftTick=void 0,this.offTimers?.(),this.offTimers=void 0,this.unbind?.(),this.unbind=void 0}tap(){if(this.ctx.editing)return;const t=this.widget.config.entity,e=this.ctx.hass.states[t];if(!e||"unavailable"===e.state||"sheet"===re(t))return this.ctx.openEntity(t,this.renderRoot.querySelector(".tile")??void 0);if(ki("tap"),"light"===ee(t)&&!ne(e)&&this.ctx.allows("light_wave")){const t=this.getBoundingClientRect(),i=Array.isArray(e.attributes.rgb_color)?e.attributes.rgb_color:[255,196,120];this.dispatchEvent(new CustomEvent("sn-light-wave",{bubbles:!0,composed:!0,detail:{x:t.left+t.width/2,y:t.top+t.height/2,color:`rgb(${i.join(",")})`}}))}Ii("lock"===ee(t)?"locked"===e.state?"unlock":"lock":ne(e)?"off":"on"),he(this.ctx.hass,e).catch((()=>(this.ctx.toast(this.ctx.t("error")),this.requestUpdate()))),this.requestUpdate(),window.setTimeout((()=>this.requestUpdate()),4050)}render(){const{ctx:t}=this,e=this.widget.config.entity??"",i=de(t.hass.states[e]),s=ne(i),n=t.narrow||this.widget.h>=3||this.widget.w<=2;return B`
      <div
        class="tile glass pressable ${n?"vertical":""} ${s?"on":""} ${i&&"unavailable"!==i.state?"":"off-line"}"
        style=${ae(i)}
        role="button"
        tabindex="0"
        aria-pressed=${s}
      >
        ${void 0!==this.dim?B`<div class="dim" style="transform:scaleX(${this.dim/100});--from:${this.ctx.rtl?"right":"left"}"></div><b class="dimv ltr">${this.dim}%</b>`:""}
        ${s?B`<span class="ring" aria-hidden="true"><i></i></span>`:""}
        ${this.renderLeft(e,s)}
        <span class="ic"><sn-icon class=${Ui(i)} .icon=${oe(i,e)}></sn-icon></span>
        <span class="text">
          <span class="name">${ie(t.hass,t.config,e)}</span>
          <span class="state">${Zi(fe(t.t,i,t.lang))}</span>
        </span>
      </div>
    `}};function ps(t,e){let i,s=!0;const n=()=>{const t=s&&!document.hidden;t!==i&&e(i=t)},a=new IntersectionObserver((([t])=>{s=t.isIntersecting,n()}));return a.observe(t),document.addEventListener("visibilitychange",n),()=>{a.disconnect(),document.removeEventListener("visibilitychange",n)}}ds.styles=[fi,qi,r`
      :host {
        display: block;
        height: 100%;
      }
      .tile {
        position: relative;
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
      /* 2.0: what's on breathes slowly in its own colour. */
      .tile.on::after {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit;
        pointer-events: none;
        box-shadow: 0 0 0 1px color-mix(in srgb, var(--tone, var(--accent)) 40%, transparent), 0 0 24px color-mix(in srgb, var(--tone, var(--accent)) 45%, transparent);
        opacity: 0;
        animation: breathe-glow 4.5s ease-in-out infinite;
        animation-play-state: var(--loops, running);
        display: var(--breathe, none);
      }
      @keyframes breathe-glow {
        50% {
          opacity: 1;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .tile.on::after {
          animation: none;
        }
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
      /* Press and slide on a light: the tile fills with its brightness. */
      .dim {
        position: absolute;
        inset: 0;
        transform-origin: var(--from, left);
        background: color-mix(in srgb, var(--tone, var(--accent)) 35%, transparent);
        pointer-events: none;
      }
      .dimv {
        position: absolute;
        z-index: 1;
        pointer-events: none;
        inset-inline-end: 14px;
        top: 10px;
        font-size: 15px;
      }
      /* 2.0: a slow light runs around the border of whatever is on. */
      .ring {
        position: absolute;
        inset: 0;
        border-radius: inherit;
        padding: 1.5px;
        overflow: hidden;
        pointer-events: none;
        display: var(--active-glow, none);
        -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
        -webkit-mask-composite: xor;
        mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
      }
      .ring i {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 300%;
        aspect-ratio: 1;
        translate: -50% -50%;
        background: conic-gradient(transparent 0 72%, color-mix(in srgb, var(--tone, var(--accent)) 90%, #fff) 88%, transparent 100%);
        animation: ring 5s linear infinite;
        animation-play-state: var(--loops, running);
      }
      @keyframes ring {
        to {
          rotate: 360deg;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .ring {
          display: none;
        }
      }
      /* A live countdown: "off in 30 min", or the washer's time left. */
      .left {
        position: absolute;
        top: 8px;
        inset-inline-end: 10px;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 3px 8px;
        border-radius: 999px;
        background: color-mix(in srgb, var(--tone, var(--accent)) 22%, transparent);
        color: var(--text);
        font-size: 12px;
        font-weight: 700;
        --icon-size: 13px;
      }
      .tile.armed {
        transform: scale(0.97);
        transition: transform 160ms var(--ease-out);
      }
    `],ls([gt({attribute:!1})],ds.prototype,"ctx",2),ls([gt({attribute:!1})],ds.prototype,"widget",2),ls([mt()],ds.prototype,"dim",2),ds=ls([pt("sn-w-tile")],ds);var hs=Object.defineProperty,us=Object.getOwnPropertyDescriptor,gs=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?us(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&hs(e,i,a),a};const ms=[{key:"main_brush_time_left",label:"main_brush",life:300},{key:"side_brush_time_left",label:"side_brush",life:200},{key:"filter_time_left",label:"filter",life:150},{key:"sensor_time_left",label:"sensors_part",life:30}];function fs(t,e){const i={parts:{}},s=t.entities?.[e]?.device_id;if(!s)return i;for(const n of Object.values(t.entities??{})){if(n.device_id!==s)continue;const[t,e]=n.entity_id.split("."),a=n.translation_key??e;if("image"!==t||i.map){if("select"===t&&/mop_intensity|water_box/.test(a))i.mop=n.entity_id;else if("sensor"===t&&/cleaning_area$/.test(a))i.area=n.entity_id;else if("sensor"===t&&/cleaning_time$/.test(a))i.time=n.entity_id;else if("button"===t&&/empty/.test(a))i.empty=n.entity_id;else if("sensor"===t)for(const s of ms)a.endsWith(s.key)&&(i.parts[s.key]=n.entity_id)}else i.map=n.entity_id}return i}function bs(t){const e=Number(t?.state);if(!t||Number.isNaN(e))return;const i=t.attributes.unit_of_measurement;return"s"===i?e/3600:"min"===i?e/60:"d"===i?24*e:e}async function _s(t,e){try{const i=await t.callWS({type:"call_service",domain:"roborock",service:"get_maps",target:{entity_id:e},return_response:!0}),s=Object.entries(i.response?.[e]?.maps?.[0]?.rooms??{}).map((([t,e])=>({id:t,name:e})));if(s.length)return{method:"segments",rooms:s}}catch{}return{method:"areas",rooms:Object.values(t.areas??{}).map((t=>({id:t.area_id,name:t.name}))).sort(((t,e)=>t.name.localeCompare(e.name)))}}const ys=t=>t.trim().toLowerCase().replace(/\s+/g," ");function vs(t,e){return t.robot_room?e.some((e=>e.id===t.robot_room))?t.robot_room:void 0:e.find((e=>ys(e.name)===ys(t.name)))?.id}let xs=class extends ct{constructor(){super(...arguments),this.compact=!1,this.rooms=[],this.method="segments",this.picked=[],this.passes=1,this.bust=Date.now(),this.seen=!0}connectedCallback(){super.connectedCallback(),this.loadRooms(),this.timer=window.setInterval((()=>this.seen&&(this.bust=Date.now())),5e3),this.stopVis=ps(this,(t=>this.seen=t))}disconnectedCallback(){super.disconnectedCallback(),this.stopVis?.(),window.clearInterval(this.timer)}get entity(){return this.widget.config.entity??""}async loadRooms(){const t=await _s(this.ctx.hass,this.entity);this.method=t.method,this.rooms=t.rooms}planFloor(){let t;for(const e of this.ctx.config.pages)for(const i of e.widgets)for(const e of"floorplan"===i.type?i.config.floors:[]){if(!e.image||!e.rooms?.length)continue;const i=new Map;for(const t of e.rooms){const e=vs(t,this.rooms);e&&i.set(t.id,e)}i.size&&(!t||i.size>t.matches.size)&&(t={floor:e,matches:i})}return t}renderPlan(){const t=this.planFloor();if(!t)return U;const{floor:e,matches:i}=t;return B`<div class="mini" data-no-swipe>
      <img src=${e.image} alt="" class=${this.ctx.dark?"dim":""} />
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        ${(e.rooms??[]).map((t=>{const e=i.get(t.id),s=!!e&&this.picked.includes(e);return Z`<polygon class=${e?s?"pick on":"pick":"off"} points=${t.points.map((t=>t.join(","))).join(" ")}
            @click=${()=>e&&this.toggleRoom(e)}></polygon>`}))}
      </svg>
      ${(e.rooms??[]).map((t=>{const e=i.get(t.id),s=e?this.picked.indexOf(e):-1;if(s<0)return U;const[n,a]=$e(t.points);return B`<span class="num" style="left:${n}%;top:${a}%">${s+1}</span>`}))}
    </div>`}toggleRoom(t){ki("tap"),this.picked=this.picked.includes(t)?this.picked.filter((e=>e!==t)):[...this.picked,t]}call(t,e,i={}){return ki("press"),this.ctx.hass.callService(t,e,{entity_id:this.entity,...i}).catch((()=>this.ctx.toast(this.ctx.t("error"))))}start(){return this.picked.length?"segments"===this.method?this.call("vacuum","send_command",{command:"app_segment_clean",params:[{segments:this.picked.map(Number),repeat:this.passes}]}):this.call("vacuum","clean_area",{cleaning_area_id:this.picked}):this.call("vacuum","start")}label(t,e){const i=`${t}_${e}`;return Dt(i)?this.ctx.t(i):e.replace(/_/g," ")}render(){const{ctx:t}=this,{t:e,hass:i}=t,s=i.states[this.entity];if(!s)return B`<div class="wrap glass"><span class="muted">${e("unavailable")}</span></div>`;const n=fs(i,this.entity),a="cleaning"===s.state,o=s.attributes.battery_level??Number(i.states[`sensor.${this.entity.split(".")[1]}_battery`]?.state),r=n.map?i.states[n.map]:void 0,l=r?.attributes.entity_picture?i.hassUrl(`${r.attributes.entity_picture}${r.attributes.entity_picture.includes("?")?"&":"?"}t=${a?this.bust:Math.floor(this.bust/6e4)}`):void 0,c=s.attributes.fan_speed_list??[],d=n.mop?i.states[n.mop]:void 0,p=(s,n,a)=>{const o=s?i.states[s]:void 0;return o&&"unknown"!==o.state&&"unavailable"!==o.state?B`<span class="stat"><sn-icon .icon=${n}></sn-icon>${e(a)} ${fe(e,o,t.lang)}</span>`:U},h=B`<div class="col">
      <div class="head">
        <span class="ic ${a?"on":""}"><sn-icon icon="robot-vacuum"></sn-icon></span>
        <div>
          <div class="name">${ie(i,t.config,this.entity)}</div>
          <div class="state">${fe(e,s,t.lang)}</div>
        </div>
      </div>
      <div class="stats">
        ${"number"!=typeof o||Number.isNaN(o)?U:B`<span class="stat"><sn-icon icon="battery"></sn-icon>${ue(`${o}%`)}</span>`}
        ${p(n.area,"rooms","cleaned_area")} ${p(n.time,"clock-outline","clean_time")}
      </div>
      ${l?B`<div class="map"><img src=${l} alt="" /></div>`:U}
    </div>`,u=B`<div class="col">
      <h3>${e("rooms")}</h3>
      ${this.renderPlan()}
      ${this.rooms.length?B`<div class="rooms">
            ${this.rooms.map((t=>{const e=this.picked.indexOf(t.id);return B`<button class="room pressable" aria-pressed=${e>=0} @click=${()=>this.toggleRoom(t.id)}>
                ${t.name}${e>=0?B`<span class="order">${e+1}</span>`:U}
              </button>`}))}
          </div>`:B`<span class="muted">${e("no_rooms")}</span>`}
      <div class="opts">
        ${c.length?B`<div class="opt">
              ${e("suction")}
              <div class="seg">
                ${c.map((t=>B`<button aria-pressed=${s.attributes.fan_speed===t} @click=${()=>this.call("vacuum","set_fan_speed",{fan_speed:t})}>
                    ${this.label("fan",t)}
                  </button>`))}
              </div>
            </div>`:U}
        ${d?.attributes.options?.length?B`<div class="opt">
              ${e("mop")}
              <div class="seg">
                ${d.attributes.options.map((i=>B`<button
                    aria-pressed=${d.state===i}
                    @click=${()=>this.ctx.hass.callService("select","select_option",{entity_id:n.mop,option:i}).catch((()=>t.toast(e("error"))))}
                  >
                    ${this.label("mop",i)}
                  </button>`))}
              </div>
            </div>`:U}
        ${"segments"===this.method&&this.picked.length?B`<div class="opt">
              ${e("passes")}
              <div class="seg">
                ${[1,2,3].map((t=>B`<button aria-pressed=${this.passes===t} @click=${()=>this.passes=t}>${ue(`×${t}`)}</button>`))}
              </div>
            </div>`:U}
      </div>
      <div class="actions">
        ${a?B`<button class="btn primary pressable go" @click=${()=>this.call("vacuum","pause")}><sn-icon icon="pause"></sn-icon>${e("pause")}</button>`:B`<button class="btn primary pressable go" @click=${()=>this.start()}>
              <sn-icon icon="play"></sn-icon>${this.picked.length?1===this.picked.length?e("clean_rooms_1"):e("clean_rooms_n",{n:this.picked.length}):e("clean_all")}
            </button>`}
        <button class="btn pressable" @click=${()=>this.call("vacuum","return_to_base")}><sn-icon icon="home"></sn-icon>${e("return_home")}</button>
        <button class="btn pressable" @click=${()=>this.call("vacuum","locate")}><sn-icon icon="locate"></sn-icon>${e("locate")}</button>
        ${n.empty?B`<button class="btn pressable" @click=${()=>this.ctx.hass.callService("button","press",{entity_id:n.empty}).catch((()=>t.toast(e("error"))))}>
              <sn-icon icon="delete"></sn-icon>${e("empty_bin")}
            </button>`:U}
      </div>
      ${Object.keys(n.parts).length?B`<h3>${e("parts")}</h3>
            ${ms.filter((t=>n.parts[t.key])).map((s=>{const a=bs(i.states[n.parts[s.key]]);if(void 0===a)return U;const o=Math.max(0,Math.min(100,Math.round(a/s.life*100)));return B`<div class="part">
                <span>${e(s.label)}</span><span class="muted">${e("hours_left",{n:ue(ge(a,t.lang,0))})}</span>
                <div class="bar ${o<15?"low":""}"><span style="width:${o}%"></span></div>
              </div>`}))}`:U}
    </div>`;return B`<div class="wrap ${this.compact?"":"glass"}">${h}${u}</div>`}};xs.styles=[fi,r`
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
    `],gs([gt({attribute:!1})],xs.prototype,"ctx",2),gs([gt({attribute:!1})],xs.prototype,"widget",2),gs([gt({type:Boolean,reflect:!0})],xs.prototype,"compact",2),gs([mt()],xs.prototype,"rooms",2),gs([mt()],xs.prototype,"method",2),gs([mt()],xs.prototype,"picked",2),gs([mt()],xs.prototype,"passes",2),gs([mt()],xs.prototype,"bust",2),xs=gs([pt("sn-w-vacuum")],xs);const ws=[{id:"candle",emoji:"🕯️",label:"fx_candle"},{id:"sunset",emoji:"🌅",label:"fx_sunset"},{id:"party",emoji:"🎉",label:"fx_party"},{id:"ramadan",emoji:"🌙",label:"fx_ramadan"},{id:"aurora",emoji:"🌌",label:"fx_aurora"}];function $s(t,e){const{t:i,hass:s}=t;return B`<div style="display:grid;gap:8px;width:100%">
    <span class="muted" style="font-size:13px">${i("fx_title")}</span>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      ${ws.map((n=>B`<button class="btn pressable" style="min-height:40px" @click=${()=>{return a=n.id,s.callWS({type:"smartnest/fx/start",effect:a,lights:e}).then((()=>t.toast(i("fx_started"))),(()=>t.toast(i("error"))));var a}}>${n.emoji} ${i(n.label)}</button>`))}
      <button class="btn pressable" style="min-height:40px" @click=${()=>s.callWS({type:"smartnest/fx/stop",lights:e}).catch((()=>{}))}>⏹ ${i("fx_stop")}</button>
    </div>
  </div>`}const ks=t=>Object.keys(t.states).find((t=>t.startsWith("ai_task.")));async function Cs(t,e,i={}){const s=ks(t.hass);if(s)try{return(await t.hass.callWS({type:"smartnest/ai/ask",task:e,entity_id:s,lang:t.lang,...i})).text||void 0}catch{return}}function Ms(t,e){if(!t)return;const i="["===e?"]":"}",s=t.indexOf(e),n=t.lastIndexOf(i);if(!(s<0||n<s))try{return JSON.parse(t.slice(s,n+1))}catch{return}}var Hs=Object.defineProperty,As=Object.getOwnPropertyDescriptor,Ls=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?As(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&Hs(e,i,a),a};const Vs=[{id:"away",icon:"leave",label:"mode_away"},{id:"home",icon:"entrance",label:"mode_home"},{id:"sleep",icon:"night",label:"mode_sleep"},{id:"evening",icon:"lamp",label:"mode_evening"}],Ss="input_select.house_mode",zs=t=>`script.smartnest_mode_${t}`;let Ds=class extends ct{run(t){this.ctx.editing||(ki("press"),this.ctx.hass.callService("script","turn_on",{entity_id:zs(t)}).catch((()=>this.ctx.toast(this.ctx.t("error")))),this.ctx.cinematic(t))}render(){const{ctx:t}=this,e=Vs.filter((e=>t.hass.states[zs(e.id)]));if(!e.length)return t.isAdmin?B`<div class="missing glass">${t.t("modes_missing")}</div>`:U;const i=t.hass.states[Ss]?.state;return B`<div class="row">
      ${e.map((e=>B`<button class="glass pressable" aria-pressed=${i===e.id} @click=${()=>this.run(e.id)}>
          <span class="ic"><sn-icon .icon=${e.icon}></sn-icon></span>${t.t(e.label)}
        </button>`))}
    </div>`}};async function Os(t,e){try{return(await t.callWS({type:"smartnest/kv/get",key:e})).value??void 0}catch{return}}Ds.styles=[fi,r`
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
    `],Ls([gt({attribute:!1})],Ds.prototype,"ctx",2),Ls([gt({attribute:!1})],Ds.prototype,"widget",2),Ds=Ls([pt("sn-w-modes")],Ds);const Ts=(t,e,i)=>t.callWS({type:"smartnest/kv/set",key:e,value:i});function js(t,e,i){return t.connection.subscribeMessage((t=>i(t.value)),{type:"smartnest/kv/subscribe",key:e})}const Ps=t=>{const[e,i]=t.split(":").map(Number);return 60*(e||0)+(i||0)},Is=(t,e,i)=>{const s=Ps(e),n=Ps(i);return s<=n?t>=s&&t<n:t>=s||t<n};function Es(t,e=new Date){if(!t?.enabled)return;const i=60*e.getHours()+e.getMinutes();return Is(i,t.peak_from,t.peak_to)?"peak":Is(i,t.cheap_from,t.cheap_to)?"cheap":void 0}function Ns(t){const e=new Date,[i,s]=t.cheap_from.split(":").map(Number);return e.setHours(i,s,0,0),e.getTime()<=Date.now()&&e.setDate(e.getDate()+1),Math.floor(e.getTime()/1e3)}const Ws=[{id:"mode",label:"widget_modes"},{id:"alert",label:"chip_t_alert"},{id:"unlocked",label:"chip_t_unlocked"},{id:"open",label:"chip_t_open"},{id:"lights",label:"chip_t_lights"},{id:"climate",label:"chip_t_climate"},{id:"motion",label:"chip_t_motion"},{id:"power",label:"chip_t_power"},{id:"package",label:"chip_t_package"},{id:"travel",label:"travel"},{id:"appliance",label:"h_appliances"},{id:"arrival",label:"h_arrival"},{id:"outage",label:"h_outage"},{id:"tou",label:"tou"}];function Rs(t){const e=new Set;for(const i of t.pages)for(const t of i.widgets){t.config.entity&&e.add(t.config.entity);for(const i of t.config.floors??[])for(const t of i.markers??[])e.add(t.entity)}return[...e]}const Fs=t=>t.attributes.device_class,Bs=(t,e,i,s,n={})=>1===s.length?t(e,n):t(i,{n:s.length,...n});function Zs(t){const{hass:e,t:i,config:s}=t,n=new Set(s.settings.chips_hidden),a=Rs(s).filter((t=>e.states[t])),o=t=>e.states[t],r=t=>a.filter((e=>t(o(e)))),l=[];"on"===e.states["switch.smartnest_travel_mode"]?.state&&t.allows("travel")&&l.push({type:"travel",icon:"airplane",label:i("travel_on"),tone:"accent",entities:[]});const c=Object.values(e.states).filter((t=>{const e=t.entity_id;return!!/package|parcel/.test(e)&&(e.startsWith("binary_sensor.")&&"on"===t.state||e.startsWith("sensor.")&&Number(t.state)>0)}));c.length&&t.allows("package")&&l.push({type:"package",icon:"package",label:i("chip_package"),tone:"accent",entities:c.map((t=>t.entity_id))});const d=s.settings.outage?.sensor?e.states[s.settings.outage.sensor]:void 0;if(d&&t.allows("home_helpers")){const t=Number(d.state);("binary_sensor"===ee(d.entity_id)?"off"===d.state:!Number.isNaN(t)&&t<(s.settings.outage.below??50))&&l.push({type:"outage",icon:"power-plug-off",label:i("chip_outage"),tone:"alert",entities:[d.entity_id]})}for(const w of s.settings.appliances??[]){const s=Number(e.states[w.power]?.state);!Number.isNaN(s)&&s>=(w.start_w??15)&&t.allows("home_helpers")&&l.push({type:"appliance",icon:"washing-machine",label:i("chip_running",{name:w.name}),tone:"neutral",entities:[w.power]})}if(t.allows("home_helpers"))for(const w of Object.values(e.states).filter((t=>t.entity_id.endsWith("_direction_of_travel")&&"towards"===t.state))){const t=w.entity_id.replace(/_direction_of_travel$/,""),s=e.states[`${t}_distance`],n=Number(s?.state)/("m"===s?.attributes.unit_of_measurement?1e3:1);if(!s||Number.isNaN(n)||n>40||n<.3)continue;const a=Object.values(e.states).find((e=>e.entity_id.startsWith("person.")&&t.endsWith(e.entity_id.split(".")[1]))),o=a?.attributes.friendly_name??String(s.attributes.friendly_name??"").replace(/distance|home|المسافة/gi,"").trim();l.push({type:"arrival",icon:"car",label:i("chip_arriving",{name:o,n:Math.max(1,Math.round(n/.6))}),tone:"cool",entities:[s.entity_id]})}const p=t.allows("tou")?Es(s.settings.tou):void 0;p&&l.push({type:"tou",icon:"peak"===p?"lightning-bolt":"weather-night",label:i("peak"===p?"chip_peak":"chip_cheap"),tone:"peak"===p?"alert":"cool",entities:[]});const h=e.states[Ss]?.state,u=Vs.find((t=>t.id===h));u&&e.states[zs(u.id)]&&l.push({type:"mode",icon:u.icon,label:i(u.label),tone:"accent",entities:[]});const g=r((t=>"binary_sensor"===ee(t.entity_id)&&"on"===t.state&&["moisture","smoke","gas","carbon_monoxide","problem","safety"].includes(Fs(t)??"")));g.length&&l.push({type:"alert",icon:"alert-circle-outline",label:1===g.length?ie(e,s,g[0]):i("chip_alert"),tone:"alert",entities:g});const m=r((t=>"lock"===ee(t.entity_id)&&("unlocked"===t.state||"open"===t.state||"jammed"===t.state)));m.length&&l.push({type:"unlocked",icon:"lock-open",label:Bs(i,"chip_unlocked_1","chip_unlocked_n",m),tone:"alert",entities:m,bulk:"lock"});const f=r((t=>{const e=ee(t.entity_id);return"cover"===e?"open"===t.state&&["door","window","garage","gate"].includes(Fs(t)??""):"binary_sensor"===e&&"on"===t.state&&["door","window","opening","garage_door"].includes(Fs(t)??"")}));f.length&&l.push({type:"open",icon:"door-open",label:Bs(i,"chip_open_1","chip_open_n",f),tone:"accent",entities:f});const b=r((t=>"light"===ee(t.entity_id)&&"on"===t.state));b.length&&l.push({type:"lights",icon:"lightbulb",label:Bs(i,"chip_lights_1","chip_lights_n",b),tone:"accent",entities:b,bulk:"off"});const _=r((t=>"climate"===ee(t.entity_id)&&"off"!==t.state&&"unavailable"!==t.state));if(_.length){const e=o(_[0]).attributes.temperature,s={temp:"number"==typeof e?ue(`${ge(e,t.lang)}°`):""};l.push({type:"climate",icon:"air-conditioner",label:Bs(i,"chip_climate_1","chip_climate_n",_,s),tone:"cool",entities:_,bulk:"off"})}const y=r((t=>"binary_sensor"===ee(t.entity_id)&&"on"===t.state&&["motion","occupancy","presence"].includes(Fs(t)??"")));y.length&&l.push({type:"motion",icon:"motion-sensor",label:1===y.length?ie(e,s,y[0]):i("chip_motion"),tone:"accent",entities:y});const v=s.settings.power_entity??a.find((t=>"power"===Fs(o(t))&&ye(o(t)))),x=v?e.states[v]:void 0;return x&&ye(x)&&l.push({type:"power",icon:"lightning-bolt",label:fe(i,x,t.lang),tone:"neutral",entities:[x.entity_id]}),l.filter((t=>!n.has(t.type)))}var qs=Object.defineProperty,Us=Object.getOwnPropertyDescriptor,Ys=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Us(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&qs(e,i,a),a};const Xs=["hs","rgb","rgbw","rgbww","xy"];let Ks=class extends ct{constructor(){super(...arguments),this.lights=[],this.busy=!1,this.said=""}createRenderRoot(){return this}render(){const{t:t}=this.ctx;return ks(this.ctx.hass)&&this.ctx.allows("ai_scene")&&this.lights.length?B`<form
      style="display:grid;gap:8px"
      @submit=${async e=>{e.preventDefault();const i=e.currentTarget.querySelector("input");i.value.trim()&&(this.busy=!0,this.said=await async function(t,e,i){const{hass:s,config:n}=t,a=e.map((t=>{const e=s.states[t]?.attributes.supported_color_modes??[],i=e.some((t=>Xs.includes(t)))?"colour":e.includes("color_temp")?"white":"dim only";return`${t}: ${ie(s,n,t)}, ${i}`})),o=await Cs(t,"scene",{ask:i,facts:a}),r=Ms(o,"[");if(r?.length){for(const t of r){if(!e.includes(t.entity))continue;if(!t.on){s.callService("light","turn_off",{entity_id:t.entity,transition:2}).catch((()=>{}));continue}const i={entity_id:t.entity,transition:2};"number"==typeof t.brightness_pct&&(i.brightness_pct=Math.min(100,Math.max(1,Math.round(t.brightness_pct)))),Array.isArray(t.rgb)&&3===t.rgb.length?i.rgb_color=t.rgb.map((t=>Math.min(255,Math.max(0,Math.round(t))))):"number"==typeof t.kelvin&&(i.color_temp_kelvin=Math.min(6500,Math.max(2e3,Math.round(t.kelvin)))),s.callService("light","turn_on",i).catch((()=>{}))}return o.slice(o.lastIndexOf("]")+1).trim()||t.t("done")}}(this.ctx,this.lights,i.value.trim())??t("as_error"),this.busy=!1)}}
    >
      <span class="muted" style="font-size:13px">✨ ${t("ai_scene_title")}</span>
      <div style="display:flex;gap:8px">
        <input type="text" placeholder=${t("ai_scene_hint")} style="flex:1" />
        <button class="btn primary pressable" type="submit" ?disabled=${this.busy}>${this.busy?"…":t("ai_do_it")}</button>
      </div>
      ${this.said?B`<span style="font-size:14px;unicode-bidi:plaintext">✨ ${this.said}</span>`:U}
    </form>`:U}};Ys([gt({attribute:!1})],Ks.prototype,"ctx",2),Ys([gt({attribute:!1})],Ks.prototype,"lights",2),Ys([mt()],Ks.prototype,"busy",2),Ys([mt()],Ks.prototype,"said",2),Ks=Ys([pt("sn-ai-scene")],Ks);let Gs=class extends ct{constructor(){super(...arguments),this.label="",this.busy=!1,this.text=""}createRenderRoot(){return this}render(){return ks(this.ctx.hass)?B`<div style="display:grid;gap:6px">
      ${this.text?B`<div style="font-size:14px;line-height:1.5;unicode-bidi:plaintext">✨ ${this.text}</div>`:U}
      ${this.text?U:B`<button
            class="btn pressable"
            style="justify-self:start;min-height:36px;font-size:13px"
            ?disabled=${this.busy}
            @click=${async()=>{this.busy=!0,this.text=await this.run()??this.ctx.t("as_error"),this.busy=!1}}
          >
            ✨ ${this.busy?this.ctx.t("ai_looking"):this.label}
          </button>`}
    </div>`:U}};function Js(t,e,i,s){const{hass:n,config:a}=t;return[`Used so far this month: ${Math.round(e.used)} kWh (${s}${Math.round(e.used*i)})`,`Same days last month: ${Math.round(e.lastSame)} kWh`,`Expected for the whole month: ${Math.round(e.projected)} kWh (${s}${Math.round(e.projected*i)})`,...e.solar?[`Solar made ${Math.round(e.solar)} kWh`]:[],...e.top.map((t=>`${ie(n,a,t.id)}: ${Math.round(t.kwh)} kWh`)),...Object.values(n.states).filter((t=>"climate"===ee(t.entity_id)&&"off"!==t.state)).map((t=>`${ie(n,a,t.entity_id)} is on now (${t.state}, set to ${t.attributes.temperature}°)`))]}Ys([gt({attribute:!1})],Gs.prototype,"ctx",2),Ys([gt()],Gs.prototype,"label",2),Ys([gt({attribute:!1})],Gs.prototype,"run",2),Ys([mt()],Gs.prototype,"busy",2),Ys([mt()],Gs.prototype,"text",2),Gs=Ys([pt("sn-ai-ask-button")],Gs);var Qs=Object.defineProperty,tn=Object.getOwnPropertyDescriptor,en=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?tn(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&Qs(e,i,a),a};let sn=class extends ct{constructor(){super(...arguments),this.filter={},this.q="",this.area="",this.more=0,this.showAll=!1}firstUpdated(){this.renderRoot.querySelector("input")?.focus()}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this.searchTimer)}rows(){if(this.all)return this.all;const{hass:t,config:e}=this.ctx,i=t.areas??{};return this.all=ve(t,e,this.filter).map((e=>{const s=t.entities?.[e.id],n=xe(t,e.id)??"";return{...e,area:n,areaName:i[n]?.name??"",extra:!(!s?.hidden&&!s?.entity_category),hay:`${e.name} ${e.id} ${i[n]?.name??""}`.toLowerCase()}})),this.all}render(){const{ctx:t}=this,e=t.t,i=this.q.trim().toLowerCase(),s=this.rows(),n=this.showAll||s.every((t=>t.extra))?s:s.filter((t=>!t.extra)),a=s.length-n.length,o=new Map;for(const d of n)d.area&&o.set(d.area,(o.get(d.area)??0)+1);const r=[...o.entries()].sort(((t,e)=>e[1]-t[1])),l=n.filter((t=>(!this.area||t.area===this.area)&&(!i||i.split(/\s+/).every((e=>t.hay.includes(e)))))),c=l.slice(0,40+this.more);return B`
      <input
        type="search"
        placeholder=${e("search")}
        .value=${this.q}
        @input=${t=>{const e=t.target.value;window.clearTimeout(this.searchTimer),this.searchTimer=window.setTimeout((()=>(this.q=e,this.more=0)),160)}}
      />
      ${r.length>1?B`<div class="rooms">
            <button aria-pressed=${!this.area} @click=${()=>(this.area="",this.more=0)}>${e("area_all")}</button>
            ${r.map((([e])=>B`<button aria-pressed=${this.area===e} @click=${()=>(this.area=this.area===e?"":e,this.more=0)}>
                ${t.hass.areas?.[e]?.name??e}
              </button>`))}
          </div>`:U}
      ${c.length?B`<ul>
            ${c.map((e=>B`<li>
                <button class="pressable" @click=${()=>this.onPick(e.id)}>
                  <span class="ic"><sn-icon .icon=${oe(e.entity,e.id)} style="--icon-size:20px"></sn-icon></span>
                  <span class="grow"
                    ><span class="name">${e.name}</span><span class="id"
                      >${e.areaName?B`${e.areaName} · `:U}<span class="ltr">${e.id}</span></span
                    ></span
                  >
                  <span class="state">${fe(t.t,e.entity,t.lang)}</span>
                </button>
              </li>`))}
          </ul>`:B`<div class="empty">${t.t("no_entities")}</div>`}
      ${l.length>c.length?B`<button class="btn pressable" @click=${()=>this.more+=40}>${e("picker_more",{n:l.length-c.length})}</button>`:U}
      ${a&&!this.showAll?B`<button class="link" @click=${()=>this.showAll=!0}>${e("picker_show_extra",{n:a})}</button>`:U}
    `}};function nn(t,e){const i=t.attributes,s={state:t.state};return"light"===e&&"on"===t.state&&(null!=i.brightness&&(s.brightness=i.brightness),"color_temp"===i.color_mode&&i.color_temp_kelvin?s.color_temp_kelvin=i.color_temp_kelvin:["hs","rgb","rgbw","rgbww","xy"].includes(i.color_mode)&&i.rgb_color&&(s.rgb_color=i.rgb_color)),"cover"===e&&null!=i.current_position&&(s.current_position=i.current_position),"climate"===e&&null!=i.temperature&&(s.temperature=i.temperature),"fan"===e&&null!=i.percentage&&(s.percentage=i.percentage),s}async function an(t,e,i){const s=prompt(t.t("scene_name"),i)?.trim();if(!s)return!1;const n={};for(const r of e){const e=t.hass.states[r],i=ee(r);e&&"unavailable"!==e.state&&["light","switch","cover","climate","fan","input_boolean","media_player"].includes(i)&&(n[r]=nn(e,i))}if(!Object.keys(n).length)return!1;const a=`smartnest_${Date.now().toString(36)}`,o=await t.hass.fetchWithAuth(`/api/config/scene/config/${a}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:a,name:s,entities:n})});if(!o.ok)throw new Error(`scene ${o.status}`);return t.toast(t.t("scene_saved",{name:s})),!0}sn.styles=[fi,r`
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
      .rooms {
        display: flex;
        gap: 6px;
        overflow-x: auto;
        scrollbar-width: none;
        padding-bottom: 2px;
      }
      .rooms button {
        flex: none;
        border: 0;
        border-radius: 999px;
        padding: 7px 14px;
        background: var(--surface-2);
        color: var(--text);
        font: 500 14px var(--font);
        cursor: pointer;
      }
      .rooms button[aria-pressed="true"] {
        background: var(--accent);
        color: var(--on-accent);
      }
      ul {
        content-visibility: auto;
      }
      .link {
        border: 0;
        background: none;
        color: var(--text-2);
        font: 13px var(--font);
        text-decoration: underline;
        cursor: pointer;
        justify-self: center;
      }
      .empty {
        padding: 24px;
        text-align: center;
        color: var(--text-2);
      }
    `],en([gt({attribute:!1})],sn.prototype,"ctx",2),en([gt({attribute:!1})],sn.prototype,"filter",2),en([gt({attribute:!1})],sn.prototype,"onPick",2),en([mt()],sn.prototype,"q",2),en([mt()],sn.prototype,"area",2),en([mt()],sn.prototype,"more",2),en([mt()],sn.prototype,"showAll",2),sn=en([pt("sn-entity-picker")],sn);const on=(t,e,i,s,n=0)=>`<rect x="${t}" y="${e}" width="${i}" height="${s}" rx="${n}"/>`,rn=(t,e,i)=>`<circle cx="${t}" cy="${e}" r="${i}"/>`,ln=(t,e,i,s)=>`<line x1="${t}" y1="${e}" x2="${i}" y2="${s}"/>`,cn=(t,e,i,s)=>`<ellipse cx="${t}" cy="${e}" rx="${i}" ry="${s}"/>`,dn={sofa:{w:210,h:90,group:"living",draw:(t,e)=>on(0,0,t,e,10)+on(0,0,t,.28*e,8)+on(0,0,.1*t,e,8)+on(.9*t,0,.1*t,e,8)+ln(t/2,.28*e,t/2,e)},sofa_l:{w:260,h:180,group:"living",draw:(t,e)=>`<path d="M0 0 H${t} V${.5*e} H${.38*t} V${e} H0 Z" stroke-linejoin="round"/><path d="M0 ${.16*e} H${t}" />`+ln(.16*t,.16*e,.16*t,e)+ln(.38*t,.16*e,.38*t,.5*e)+ln(.69*t,.16*e,.69*t,.5*e)},armchair:{w:85,h:85,group:"living",draw:(t,e)=>on(0,0,t,e,12)+on(.15*t,.28*e,.7*t,.72*e,8)},coffee:{w:110,h:60,group:"living",draw:(t,e)=>on(0,0,t,e,10)+on(8,8,t-16,e-16,6)},tv:{w:150,h:14,group:"living",draw:(t,e)=>on(0,0,t,e,3)+ln(.3*t,e+6,.7*t,e+6)},rug:{w:240,h:170,group:"living",draw:(t,e)=>`<rect x="0" y="0" width="${t}" height="${e}" rx="6" stroke-dasharray="6 6" fill-opacity=".06" stroke-opacity=".6"/>`},dining:{w:170,h:95,group:"living",draw:(t,e)=>on(0,0,t,e,8)+((t,e,i,s,n,a)=>{const o=Math.min(38,n/4),r=Math.max(1,Math.round(n/70));let l="";for(let c=0;c<r;c++){const t=i+(c+.5)*n/r-o/2;l+=on(t,s-o-4,o,o,6)+on(t,s+a+4,o,o,6)}return l+on(i-o-4,s+a/2-o/2,o,o,6)+on(i+n+4,s+a/2-o/2,o,o,6)})(0,0,0,0,t,e)},round_table:{w:110,h:110,group:"living",draw:(t,e)=>cn(t/2,e/2,t/2,e/2)+[0,1,2,3].map((i=>rn(t/2+Math.cos(1.5708*i)*(t/2+22),e/2+Math.sin(1.5708*i)*(e/2+22),16))).join("")},bed2:{w:165,h:205,group:"sleep",draw:(t,e)=>on(0,0,t,e,6)+on(.07*t,.05*e,.38*t,.14*e,8)+on(.55*t,.05*e,.38*t,.14*e,8)+ln(0,.3*e,t,.3*e)+`<path d="M0 ${.3*e} L${.25*t} ${.42*e}"/>`},bed1:{w:95,h:200,group:"sleep",draw:(t,e)=>on(0,0,t,e,6)+on(.12*t,.05*e,.76*t,.14*e,8)+ln(0,.3*e,t,.3*e)},wardrobe:{w:200,h:62,group:"sleep",draw:(t,e)=>on(0,0,t,e,2)+ln(t/2,0,t/2,e)+ln(0,e,t/2,0)+ln(t/2,e,t,0)},desk:{w:140,h:70,group:"other",draw:(t,e)=>on(0,0,t,e,4)+rn(t/2,e+26,20)},toilet:{w:42,h:68,group:"bath",draw:(t,e)=>on(0,0,t,.28*e,4)+cn(t/2,.63*e,.44*t,.35*e)},basin:{w:60,h:46,group:"bath",draw:(t,e)=>on(0,0,t,e,6)+cn(t/2,.55*e,.32*t,.3*e)+rn(t/2,.16*e,2.5)},bath:{w:170,h:75,group:"bath",draw:(t,e)=>on(0,0,t,e,10)+on(8,8,t-16,e-16,26)+rn(t-26,e/2,4)},shower:{w:90,h:90,group:"bath",draw:(t,e)=>on(0,0,t,e,4)+ln(0,0,t,e)+ln(t,0,0,e)+rn(t/2,e/2,6)},counter:{w:240,h:60,group:"kitchen",draw:(t,e)=>on(0,0,t,e,2)+ln(0,.85*e,t,.85*e)},stove:{w:60,h:60,group:"kitchen",draw:(t,e)=>on(0,0,t,e,4)+rn(.3*t,.3*e,.13*t)+rn(.7*t,.3*e,.13*t)+rn(.3*t,.7*e,.13*t)+rn(.7*t,.7*e,.13*t)},ksink:{w:90,h:55,group:"kitchen",draw:(t,e)=>on(0,0,t,e,4)+on(6,8,.42*t,e-16,6)+on(.52*t,8,.42*t,e-16,6)+rn(t/2,6,3)},fridge:{w:72,h:70,group:"kitchen",draw:(t,e)=>on(0,0,t,e,4)+ln(0,.82*e,t,.82*e)+ln(.5*t,.82*e,.5*t,e)},washer:{w:60,h:60,group:"other",draw:(t,e)=>on(0,0,t,e,4)+rn(t/2,.55*e,.3*t)+ln(6,.16*e,.4*t,.16*e)},plant:{w:44,h:44,group:"other",draw:(t,e)=>rn(t/2,e/2,t/2)+[0,1,2,3,4].map((i=>ln(t/2,e/2,t/2+Math.cos(1.2566*i)*t*.42,e/2+Math.sin(1.2566*i)*e*.42))).join("")},stairs:{w:100,h:260,group:"other",draw:(t,e)=>on(0,0,t,e,2)+Array.from({length:9},((i,s)=>ln(0,(s+1)*e/10,t,(s+1)*e/10))).join("")+`<path d="M${t/2} ${.9*e} V${.12*e} M${t/2-10} ${.2*e} L${t/2} ${.12*e} L${t/2+10} ${.2*e}"/>`},nightstand:{w:45,h:40,group:"sleep",draw:(t,e)=>on(0,0,t,e,3)+rn(t/2,e/2,.25*Math.min(t,e))},dresser:{w:120,h:50,group:"sleep",draw:(t,e)=>on(0,0,t,e,3)+ln(t/3,0,t/3,e)+ln(2*t/3,0,2*t/3,e)},bookshelf:{w:100,h:35,group:"living",draw:(t,e)=>on(0,0,t,e,2)+Array.from({length:5},((i,s)=>ln((s+1)*t/6,4,(s+1)*t/6,e-4))).join("")},chair:{w:48,h:48,group:"living",draw:(t,e)=>on(0,.2*e,t,.8*e,8)+on(0,0,t,.22*e,6)},crib:{w:70,h:130,group:"sleep",draw:(t,e)=>on(0,0,t,e,6)+Array.from({length:6},((i,s)=>ln(4,(s+1)*e/7,t-4,(s+1)*e/7))).join("")},bunk:{w:95,h:200,group:"sleep",draw:(t,e)=>on(0,0,t,e,6)+on(.12*t,.05*e,.76*t,.12*e,6)+ln(0,0,t,e)+ln(t,0,0,e)},island:{w:180,h:90,group:"kitchen",draw:(t,e)=>on(0,0,t,e,6)+[.2,.5,.8].map((i=>rn(t*i,e+22,16))).join("")},dishwasher:{w:60,h:60,group:"kitchen",draw:(t,e)=>on(0,0,t,e,4)+ln(6,.2*e,t-6,.2*e)+on(.2*t,.35*e,.6*t,.5*e,4)},oven:{w:60,h:60,group:"kitchen",draw:(t,e)=>on(0,0,t,e,4)+on(.12*t,.3*e,.76*t,.58*e,4)+ln(.2*t,.18*e,.8*t,.18*e)},bidet:{w:38,h:58,group:"bath",draw:(t,e)=>cn(t/2,.55*e,.46*t,.42*e)+rn(t/2,.3*e,3)},basin2:{w:130,h:50,group:"bath",draw:(t,e)=>on(0,0,t,e,6)+cn(.27*t,.55*e,.15*t,.3*e)+cn(.73*t,.55*e,.15*t,.3*e)},jacuzzi:{w:180,h:180,group:"bath",draw:(t,e)=>on(0,0,t,e,20)+cn(t/2,e/2,.38*t,.38*e)+[0,1,2,3].map((i=>rn(t/2+Math.cos(1.5708*i+.785)*t*.3,e/2+Math.sin(1.5708*i+.785)*e*.3,3))).join("")},dryer:{w:60,h:60,group:"other",draw:(t,e)=>on(0,0,t,e,4)+rn(t/2,.55*e,.3*t)+rn(t/2,.55*e,.12*t)},ac:{w:90,h:22,group:"other",draw:(t,e)=>on(0,0,t,e,6)+ln(.1*t,.7*e,.9*t,.7*e)+`<path d="M${.3*t} ${e+8} q8 6 0 12 M${t/2} ${e+8} q8 6 0 12 M${.7*t} ${e+8} q8 6 0 12"/>`},boiler:{w:55,h:55,group:"other",draw:(t,e)=>rn(t/2,e/2,t/2)+rn(t/2,e/2,.15*t)},fireplace:{w:140,h:45,group:"living",draw:(t,e)=>on(0,0,t,e,2)+on(.2*t,.25*e,.6*t,.75*e,2)+`<path d="M${t/2} ${.9*e} q-12 -14 0 -30 q12 16 0 30"/>`},piano:{w:150,h:60,group:"living",draw:(t,e)=>on(0,0,t,e,4)+ln(0,.62*e,t,.62*e)+Array.from({length:11},((i,s)=>ln((s+1)*t/12,.62*e,(s+1)*t/12,e))).join("")+on(.35*t,e+10,.3*t,18,4)},tree:{w:120,h:120,group:"other",draw:(t,e)=>`<path d="M${t/2} 0 C${.9*t} ${.05*e} ${t} ${.45*e} ${.9*t} ${.7*e} C${.8*t} ${e} ${.2*t} ${e} ${.1*t} ${.7*e} C0 ${.45*e} ${.1*t} ${.05*e} ${t/2} 0 Z"/>`+rn(t/2,e/2,6)},pool:{w:400,h:220,group:"other",draw:(t,e)=>on(0,0,t,e,16)+on(14,14,t-28,e-28,10)+`<path d="M${.2*t} ${e/2} q${.05*t} -12 ${.1*t} 0 t${.1*t} 0 t${.1*t} 0 t${.1*t} 0"/>`},bbq:{w:80,h:55,group:"other",draw:(t,e)=>on(0,0,t,e,6)+Array.from({length:5},((i,s)=>ln((s+1)*t/6,6,(s+1)*t/6,e-6))).join("")},outdoor:{w:120,h:120,group:"other",draw:(t,e)=>rn(t/2,e/2,.28*t)+[0,1,2,3].map((i=>on(t/2+Math.cos(1.5708*i)*t*.42-13,e/2+Math.sin(1.5708*i)*e*.42-13,26,26,6))).join("")},shoes:{w:90,h:35,group:"other",draw:(t,e)=>on(0,0,t,e,2)+ln(t/2,0,t/2,e)},mirror:{w:80,h:8,group:"bath",draw:(t,e)=>on(0,0,t,e,4)+ln(.1*t,e+5,.9*t,e+5)},car:{w:190,h:450,group:"other",draw:(t,e)=>on(0,0,t,e,40)+`<path d="M${.12*t} ${.3*e} Q${t/2} ${.24*e} ${.88*t} ${.3*e}"/><path d="M${.14*t} ${.78*e} Q${t/2} ${.83*e} ${.86*t} ${.78*e}"/>`+on(.16*t,.34*e,.68*t,.4*e,14)}},pn=["sofa","sofa_l","armchair","chair","coffee","tv","rug","bookshelf","fireplace","piano","dining","round_table","bed2","bed1","bunk","crib","nightstand","dresser","wardrobe","desk","toilet","bidet","basin","basin2","mirror","bath","jacuzzi","shower","counter","island","ksink","stove","oven","dishwasher","fridge","washer","dryer","ac","boiler","shoes","plant","stairs","car","tree","pool","bbq","outdoor"];function hn(t,e,i){const s=dn[t.kind];if(!s)return"";const n=t.x/100*e,a=t.y/100*i;return`<g transform="translate(${n.toFixed(1)} ${a.toFixed(1)}) rotate(${t.rot}) translate(${(-t.w/2).toFixed(1)} ${(-t.h/2).toFixed(1)})">${s.draw(t.w,t.h)}</g>`}function un(t){const e=dn[t],i=.18*Math.max(e.w,e.h);return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-i} ${-i} ${e.w+2*i} ${e.h+2*i}"><g fill="none" stroke="currentColor" stroke-width="${Math.max(e.w,e.h)/28}" stroke-linecap="round">${e.draw(e.w,e.h)}</g></svg>`}function gn(t){const e=t.toLowerCase();return/حمام|مطبخ|غسيل|bath|wc|toilet|shower|kitchen|laundry|מקלחת|מטבח|שירותים|כביסה/.test(e)?"tile":/حديق|جنين|بلكون|شرف|ساح|حوش|garden|yard|balcony|terrace|patio|גינה|מרפסת|חצר/.test(e)?"outdoor":/ممر|مدخل|كوريدور|hall|corridor|entry|מסדרון|כניסה/.test(e)?"plain":"wood"}const mn={door:7,double:12,slide:14,window:10,wide_window:18};function fn(t,e=[]){const i=[];for(const s of t)if(!s.nowall)for(let t=0;t<s.points.length;t++)i.push([s.points[t],s.points[(t+1)%s.points.length]]);for(const s of e??[])i.push([s.a,s.b]);return i}const bn=(t,e,i)=>{let s;for(const[n,a]of t){const t=a[0]-n[0],o=a[1]-n[1],r=Math.max(0,Math.min(1,((e-n[0])*t+(i-n[1])*o)/(t*t+o*o||1))),l=Math.hypot(n[0]+r*t-e,n[1]+r*o-i);(!s||l<s.d)&&(s={a:n,b:a,d:l})}return s};function _n(t,e=[],i=1200,s=800,n={}){const a=t=>(t/100*i).toFixed(1),o=t=>(t/100*s).toFixed(1),r=Math.max(8,Math.round(i/100)),l=t=>t.points.map((([t,e])=>`${a(t)},${o(e)}`)).join(" "),c={wood:"url(#wood)",tile:"url(#tile)",plain:"none",outdoor:"url(#grass)"},d=t.map((t=>{const e=t.kind??gn(t.name);return`<polygon points="${l(t)}" fill="#9AA4AD" fill-opacity="${"outdoor"===e?.06:.13}"/>${"none"!==c[e]?`<polygon points="${l(t)}" fill="${c[e]}"/>`:""}`})).join(""),p=i/100,h=mn,u=[],g=[];for(const y of e){const e=bn(fn(t,n.walls),y.x,y.y);if(!e)continue;const a=y.kind??"door",o=h[a]*p*.85,l=Math.atan2((e.b[1]-e.a[1])/100*s,(e.b[0]-e.a[0])/100*i),c=y.x/100*i,d=y.y/100*s,m=180*l/Math.PI,f=Math.cos(l),b=Math.sin(l),_=-b,v=f,x=(t,e)=>`${(c+f*t+_*e).toFixed(1)} ${(d+b*t+v*e).toFixed(1)}`;u.push(`<rect x="${(c-o/2).toFixed(1)}" y="${(d-r).toFixed(1)}" width="${o.toFixed(1)}" height="${2*r}" transform="rotate(${m.toFixed(1)} ${c.toFixed(1)} ${d.toFixed(1)})" fill="#000"/>`);const w=(t,e=.55,i=2)=>g.push(`<path d="${t}" fill="none" stroke="#9AA4AD" stroke-opacity="${e}" stroke-width="${i}"/>`),$=o/2;if("window"===a||"wide_window"===a){const t=r/2;w(`M${x(-$,-t)} L${x($,-t)} M${x(-$,t)} L${x($,t)}`,.7,1.5),w(`M${x(-$,0)} L${x($,0)}`,.9,2),w(`M${x(-$,-t)} L${x(-$,t)} M${x($,-t)} L${x($,t)}`,.7,1.5)}else if("slide"===a){const t=r/4;w(`M${x(-$,-t)} L${x(.15*$,-t)} M${x(.15*-$,t)} L${x($,t)}`,.8,3)}else"double"===a?(w(`M${x(-$,0)} L${x(-$,$)} A${$.toFixed(1)} ${$.toFixed(1)} 0 0 0 ${x(0,0)}`),w(`M${x($,0)} L${x($,$)} A${$.toFixed(1)} ${$.toFixed(1)} 0 0 1 ${x(0,0)}`)):w(`M${x(-$,0)} L${x(-$,o)} A${o.toFixed(1)} ${o.toFixed(1)} 0 0 0 ${x($,0)}`)}const m=[];for(const y of n.openings??[]){const[t,e,n,a]=[y.a[0]/100*i,y.a[1]/100*s,y.b[0]/100*i,y.b[1]/100*s],o=Math.hypot(n-t,a-e)||1,l=(n-t)/o,c=(a-e)/o,d=.5*r;u.push(`<line x1="${(t+l*d).toFixed(1)}" y1="${(e+c*d).toFixed(1)}" x2="${(n-l*d).toFixed(1)}" y2="${(a-c*d).toFixed(1)}" stroke="#000" stroke-width="${(1.6*r).toFixed(1)}"/>`),m.push(`<line x1="${t.toFixed(1)}" y1="${e.toFixed(1)}" x2="${n.toFixed(1)}" y2="${a.toFixed(1)}" stroke="#9AA4AD" stroke-opacity=".35" stroke-width="2" stroke-dasharray="8 8"/>`)}const f=(n.furniture??[]).map((t=>hn(t,i,s))).join(""),b=t.filter((t=>"outdoor"!==(t.kind??gn(t.name))&&!t.nowall)).map((t=>`<polygon points="${l(t)}" fill="none"/>`)).join("")+(n.walls??[]).map((t=>`<line x1="${a(t.a[0])}" y1="${o(t.a[1])}" x2="${a(t.b[0])}" y2="${o(t.b[1])}"/>`)).join(""),_=t.filter((t=>"outdoor"===(t.kind??gn(t.name)))).map((t=>`<polygon points="${l(t)}" fill="none" stroke="#9AA4AD" stroke-opacity=".6" stroke-width="${Math.max(2,r/3)}" stroke-dasharray="${1.5*r} ${r}"/>`)).join("");return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${i} ${s}" width="${i}" height="${s}">\n<defs>\n<pattern id="tile" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#9AA4AD" stroke-opacity=".2" stroke-width="1"/></pattern>\n<pattern id="wood" width="60" height="14" patternUnits="userSpaceOnUse"><path d="M0 14H60M30 0V14" fill="none" stroke="#9AA4AD" stroke-opacity=".14" stroke-width="1"/></pattern>\n<pattern id="grass" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="4" cy="5" r="1.2" fill="#7fae8a" fill-opacity=".35"/><circle cx="13" cy="13" r="1" fill="#7fae8a" fill-opacity=".3"/></pattern>\n<filter id="lift" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="${(i/600).toFixed(1)}" stdDeviation="${(i/500).toFixed(1)}" flood-color="#000" flood-opacity=".35"/></filter>\n<mask id="doors"><rect width="${i}" height="${s}" fill="#fff"/>${u.join("")}</mask>\n</defs>\n<g>${d}</g>\n<g mask="url(#doors)" stroke="#9AA4AD" stroke-width="${r}" stroke-linejoin="miter" stroke-linecap="square">${b}</g>\n<g>${_}</g>\n<g>${m.join("")}</g>\n<g fill="#B4BDC5" fill-opacity=".2" stroke="#BCC4CB" stroke-width="${Math.max(2.5,i/420).toFixed(1)}" stroke-linecap="round" stroke-linejoin="round" filter="url(#lift)">${f}</g>\n<g>${g.join("")}</g>\n</svg>`}const yn=t=>`data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(t)))}`;var vn=Object.defineProperty,xn=Object.getOwnPropertyDescriptor,wn=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?xn(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&vn(e,i,a),a};let $n=class extends ct{constructor(){super(...arguments),this.floorIdx=0,this.area={w:0,h:0},this.uploading=!1,this.roomMode=!1,this.prevStates=new Map,this.zoom={s:1,x:0,y:0},this.settling=!1,this.pointers=new Map,this.moved=0,this.heat="off",this.tilt=!1,this.detecting=!1,this.model=!1,this.lensOn=!1,this.stack=!1,this.cleaned=new Set,this.askTotal=0}connectedCallback(){super.connectedCallback();try{const t=localStorage.getItem(this.heatKey);this.heat="1"===t?"temp":"temp"===t||"humidity"===t||"co2"===t||"power"===t?t:"off",this.tilt="1"===localStorage.getItem(`${this.heatKey}-3d`)}catch{}this.ro=new ResizeObserver((()=>this.measure())),this.updateComplete.then((()=>{const t=this.renderRoot.querySelector(".area");t&&this.ro.observe(t)}))}disconnectedCallback(){super.disconnectedCallback(),this.ro?.disconnect(),window.clearInterval(this.replayTimer)}trackRobot(){const t=this.floor;if(!t||!this.ctx?.allows("robot_on_plan"))return;let e=!1;if(!this.cleaned.size)try{for(const t of JSON.parse(localStorage.getItem(this.cleanedKey)??"[]"))this.cleaned.add(t)}catch{}for(const i of t.markers){if("vacuum"!==ee(i.entity))continue;const s=this.robotRoom(t,i.entity);s&&!this.cleaned.has(s.id)&&(this.cleaned.add(s.id),e=!0)}if(e)try{localStorage.setItem(this.cleanedKey,JSON.stringify([...this.cleaned]))}catch{}}renderCleaned(t){return this.cleaned.size?(t.rooms??[]).filter((t=>this.cleaned.has(t.id))).map((t=>{const[e,i]=$e(t.points);return B`<div class="clean" style="clip-path:${Ce(t.points)}"></div><span class="clean-tag" style="left:${e}%;top:${i}%">✨</span>`})):U}st(t){const e=de(this.ctx.hass.states[t]),i=this.replay,s=i?.data[t];if(!i||!e||!s?.length)return e;let n=s[0];for(const o of s){if(1e3*o.lu>i.at)break;n=o}const a=n.s===e.state?e.attributes:{...e.attributes,brightness:void 0,rgb_color:void 0,current_position:void 0};return{...e,state:n.s,attributes:a,last_changed:new Date(1e3*n.lu).toISOString()}}async startReplay(){const t=this.floor;if(!t)return;const e=Date.now(),i=e-864e5;let s={};try{s=await this.ctx.hass.callWS({type:"history/history_during_period",start_time:new Date(i).toISOString(),end_time:new Date(e).toISOString(),entity_ids:[...new Set(t.markers.map((t=>t.entity)))],minimal_response:!0,no_attributes:!0,significant_changes_only:!1})}catch{return this.ctx.toast(this.ctx.t("error"))}this.zoom={s:1,x:0,y:0},this.replay={start:i,at:i,playing:!0,data:s},this.playReplay()}playReplay(){window.clearInterval(this.replayTimer),this.replayTimer=window.setInterval((()=>{const t=this.replay;if(!t?.playing)return window.clearInterval(this.replayTimer);const e=Math.min(Date.now(),t.at+36e4);this.replay={...t,at:e,playing:e<Date.now()}}),100)}stopReplay(){window.clearInterval(this.replayTimer),this.replay=void 0}replayCaption(){const t=this.replay,{ctx:e}=this;let i;for(const[n,a]of Object.entries(t.data)){const e=ee(n);if(["light","lock","binary_sensor","cover","climate","switch","media_player","vacuum"].includes(e))for(let s=1;s<a.length;s++){const e=1e3*a[s].lu;if(e>t.at)break;t.at-e<15e5&&a[s].s!==a[s-1].s&&(!i||e>i.lu)&&(i={id:n,lu:e,s:a[s].s})}}if(!i)return"";const s=this.st(i.id);return`${new Date(i.lu).toLocaleTimeString(Ot[e.lang],{hour:"2-digit",minute:"2-digit"})} · ${ie(e.hass,e.config,i.id)}: ${s?be(e.t,{...s,state:i.s},e.lang):i.s}`}renderReplay(){const t=this.replay,{t:e,lang:i}=this.ctx,s=Date.now(),n=new Date(t.at);return B`<div class="tools glass replay" @pointerdown=${t=>t.stopPropagation()}>
      <button
        class="icon-btn primary pressable"
        aria-label=${e(t.playing?"pause":"play")}
        @click=${()=>{const e=t.at>=s-6e4;this.replay={...t,playing:!t.playing,at:e&&!t.playing?t.start:t.at},this.replay.playing&&this.playReplay()}}
      >
        <sn-icon icon=${t.playing?"pause":"play"} style="--icon-size:22px"></sn-icon>
      </button>
      <div class="rp">
        <div class="rp-top">
          <b class="ltr">${n.toLocaleTimeString(Ot[i],{hour:"2-digit",minute:"2-digit"})}</b>
          <span class="muted">${n.toDateString()===(new Date).toDateString()?e("today"):e("yesterday")}</span>
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
    </div>`}measure(){const t=this.renderRoot.querySelector(".area");if(!t)return;const e=getComputedStyle(t),i=parseFloat(e.paddingLeft)+parseFloat(e.paddingRight),s=parseFloat(e.paddingTop)+parseFloat(e.paddingBottom),n=t.clientWidth-i,a=t.clientHeight-s;n===this.area.w&&a===this.area.h||(this.area={w:n,h:a})}get floors(){return this.widget.config.floors??[]}get floor(){return this.floors[Math.min(this.floorIdx,this.floors.length-1)]}edit(t){const e=Math.min(this.floorIdx,this.floors.length-1);this.ctx.update((i=>{const s=ti(i,this.widget.id);s&&(s.config.floors??=[],t(s.config.floors,s.config.floors[e],i))}))}updated(){for(const t of this.floor?.markers??[]){const e=this.ctx.hass.states[t.entity];Ki(this.renderRoot.querySelector(`[data-m="${t.id}"] sn-icon`),e,this.prevStates.get(t.id)),e&&this.prevStates.set(t.id,e.state)}}willUpdate(t){this.trackRobot(),t.has("ctx")&&this.ctx.editing&&1!==this.zoom.s&&(this.zoom={s:1,x:0,y:0}),t.has("floorIdx")&&(this.zoom={s:1,x:0,y:0}),t.has("ctx")&&!this.ctx.editing&&(this.selected=void 0,this.roomMode=!1,this.drawing=void 0,this.selRoom=void 0),this.toggleAttribute("editing",this.ctx.editing),this.toggleAttribute("narrow",this.ctx.narrow),this.toggleAttribute("dark",this.ctx.dark)}markerEl(t){return this.renderRoot.querySelector(`[data-m="${t.id}"]`)??void 0}onDown(t,e){if(0===t.button){if(t.stopPropagation(),this.ctx.editing){const i=t.currentTarget;try{i.setPointerCapture(t.pointerId)}catch{}return this.selected=e.id,this.drag={id:e.id,pointerId:t.pointerId,startX:t.clientX,startY:t.clientY,origX:e.x,origY:e.y,x:e.x,y:e.y,moved:!1},this.liveEl=i,void(this.liveStage=this.stageSize())}window.clearTimeout(this.press?.timer),this.press={id:e.id,x:t.clientX,y:t.clientY,timer:window.setTimeout((()=>{this.press=void 0,ki("press"),this.ctx.openEntity(e.entity,this.markerEl(e))}),450)}}}onMove(t){const e=this.drag;if(e&&t.pointerId===e.pointerId){const i=this.liveStage??this.stageSize(),s=this.zoom.s||1;return e.x=Math.min(100,Math.max(0,e.origX+(t.clientX-e.startX)/s/i.w*100)),e.y=Math.min(100,Math.max(0,e.origY+(t.clientY-e.startY)/s/i.h*100)),e.moved=e.moved||Math.hypot(t.clientX-e.startX,t.clientY-e.startY)>3,void(this.liveEl&&(this.liveEl.style.translate=`${((e.x-e.origX)/100*i.w).toFixed(1)}px ${((e.y-e.origY)/100*i.h).toFixed(1)}px`))}this.press&&Math.hypot(t.clientX-this.press.x,t.clientY-this.press.y)>10&&(window.clearTimeout(this.press.timer),this.press=void 0)}onUp(t,e){if(this.drag&&t.pointerId===this.drag.pointerId){const{x:t,y:i,moved:s}=this.drag;return this.drag=void 0,!s&&this.liveEl&&(this.liveEl.style.translate=""),this.liveEl=void 0,void(s&&this.edit(((s,n)=>{const a=n?.markers.find((t=>t.id===e.id));a&&Object.assign(a,{x:Math.round(10*t)/10,y:Math.round(10*i)/10})})))}this.press?.id===e.id&&(window.clearTimeout(this.press.timer),this.press=void 0,this.tap(e))}onCancel(){window.clearTimeout(this.press?.timer),this.press=void 0,this.drag=void 0,this.liveEl&&(this.liveEl.style.translate=""),this.liveEl=void 0}tap(t){const e=this.ctx.hass.states[t.entity];if(!e||"unavailable"===e.state||"sheet"===re(t.entity))return this.ctx.openEntity(t.entity,this.markerEl(t));ki("tap"),he(this.ctx.hass,e).catch((()=>(this.ctx.toast(this.ctx.t("error")),this.requestUpdate()))),this.requestUpdate(),window.setTimeout((()=>this.requestUpdate()),4050)}stageSize(){const t=this.natural?this.natural.w/this.natural.h:1.6;if(this.ctx.narrow)return{w:this.area.w,h:this.area.w/t};let e=this.area.w,i=e/t;return i>this.area.h&&(i=this.area.h,e=i*t),{w:Math.max(e,0),h:Math.max(i,0)}}addFloor(){const t=this.floors.length+1;this.edit((e=>e.push(We(`${this.ctx.t("floor")} ${t}`)))),this.floorIdx=this.floors.length,this.natural=void 0}floorSheet(){const{t:t}=this.ctx,e=this.floor;e&&this.ctx.showSheet({title:t("floor"),render:i=>B`
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
              </button>`:U}
        </div>
      `})}pickFile(){this.renderRoot.querySelector("input[type=file]")?.click()}async onFile(t){const e=t.target,i=e.files?.[0];if(e.value="",i){this.uploading=!0;try{const t=await Qe(this.ctx.hass,i);this.natural=void 0,this.edit(((e,i)=>i&&(i.image=t)))}catch{this.ctx.toast(this.ctx.t("upload_failed"))}finally{this.uploading=!1}}}addDevice(){this.ctx.showSheet({title:this.ctx.t("add_device"),render:t=>B`<sn-entity-picker
        .ctx=${t}
        .onPick=${e=>{const i=Ie(),s=["sensor","climate"].includes(ee(e))?"value":"icon";this.edit(((t,n)=>n?.markers.push({id:i,entity:e,x:50,y:50,display:s}))),this.selected=i,t.closeSheet()}}
      ></sn-entity-picker>`})}renameDevice(t){const{t:e}=this.ctx;this.ctx.showSheet({title:e("display_name"),render:i=>B`<label class="field"
        >${ie(i.hass,i.config,t.entity)}
        <input
          type="text"
          .value=${i.config.names[t.entity]??""}
          placeholder=${i.hass.states[t.entity]?.attributes.friendly_name??t.entity}
          @change=${e=>i.update((i=>{const s=e.target.value.trim();s?i.names[t.entity]=s:delete i.names[t.entity]}))}
        />
        <span class="hint">${e("display_name_hint")}</span>
      </label>`})}roomSheet(t){if(this.moved>8)return;const e=this.floor;if(!e)return;const i=e.markers.filter((e=>we([e.x,e.y],t.points))).map((t=>t.entity));if(!i.length)return;const s=this.flyTo(t);this.ctx.showSheet({title:t.name,onClose:()=>{s&&(this.settling=!0,this.zoom={s:1,x:0,y:0})},render:e=>{const s=i.filter((t=>"light"===ee(t))),n=s.some((t=>"on"===e.hass.states[t]?.state));return B`<div style="display:grid;gap:10px">
          ${s.length?B`<button
                class="btn ${n?"":"primary"} pressable"
                @click=${()=>e.hass.callService("light",n?"turn_off":"turn_on",{entity_id:s}).catch((()=>e.toast(e.t("error"))))}
              >
                <sn-icon icon=${n?"lightbulb-outline":"lightbulb"} style="--icon-size:20px"></sn-icon>${e.t(n?"room_lights_off":"room_lights_on")}
              </button>`:U}
          ${e.allows("light_fx")&&s.some((t=>(e.hass.states[t]?.attributes.supported_color_modes??[]).some((t=>["hs","rgb","rgbw","rgbww","xy"].includes(t)))))?$s(e,s):U}
          <sn-ai-scene .ctx=${e} .lights=${s}></sn-ai-scene>
          ${e.isAdmin?B`<button class="btn pressable" @click=${()=>an(e,i,t.name).catch((()=>e.toast(e.t("error"))))}>
                <sn-icon icon="content-save" style="--icon-size:20px"></sn-icon>${e.t("scene_keep")}
              </button>`:U}
          ${i.map((t=>{const i=e.hass.states[t];return B`<button
              class="glass pressable"
              style="display:flex;align-items:center;gap:12px;padding:10px 14px;border-radius:var(--r-md);text-align:start"
              @click=${i=>e.openEntity(t,i.currentTarget)}
            >
              <span style="display:grid;place-items:center;width:40px;height:40px;border-radius:999px;background:${ne(i)?"var(--tone)":"var(--surface-2)"};color:${ne(i)?"var(--on-tone)":"var(--text-2)"};${ae(i)}">
                <sn-icon .icon=${oe(i,t)} style="--icon-size:20px"></sn-icon>
              </span>
              <span style="flex:1;font-weight:500">${ie(e.hass,e.config,t)}</span>
              <span class="muted" style="font-size:14px;unicode-bidi:plaintext">${Zi(be(e.t,i,e.lang))}</span>
            </button>`}))}
        </div>`}})}get heatKey(){return`smartnest-heat-${this.widget.id}`}roomValues(t,e){const i=new Map;for(const s of t.rooms??[]){const n=t.markers.filter((t=>we([t.x,t.y],s.points))).map((t=>{const i=this.ctx.hass.states[t.entity];if(!i)return NaN;const s=i.attributes.device_class;return"temp"===e?"climate"===ee(t.entity)?Number(i.attributes.current_temperature):"temperature"===s?Number(i.state):NaN:"humidity"===e?"climate"===ee(t.entity)?Number(i.attributes.current_humidity):"humidity"===s?Number(i.state):NaN:"power"===e?"power"===s?Number(i.state)*("kW"===i.attributes.unit_of_measurement?1e3:1):NaN:"carbon_dioxide"===s?Number(i.state):NaN})).filter((t=>!Number.isNaN(t)));n.length&&i.set(s.id,n.reduce(((t,e)=>t+e),0)/("power"===e?1:n.length))}return i}mapModes(t){if(!this.ctx.allows("heat_map"))return[];const e=["temp"];return this.ctx.allows("air_maps")&&e.push("humidity","co2"),e.push("power"),e.filter((e=>this.roomValues(t,e).size>0))}mapColor(t,e){const i=$n.SCALES[t];if(e<=i[0][0])return`rgb(${i[0][1].join(",")})`;for(let s=1;s<i.length;s++){const[t,n]=i[s],[a,o]=i[s-1];if(e<=t){const i=(e-a)/(t-a);return`rgb(${o.map(((t,e)=>Math.round(t+(n[e]-t)*i))).join(",")})`}}return`rgb(${i[i.length-1][1].join(",")})`}renderHeat(t,e){const i=this.roomValues(t,e),s="temp"===e?"°":"humidity"===e?"%":"power"===e?" W":" ppm";return(t.rooms??[]).map((t=>{const n=i.get(t.id);if(void 0===n)return U;const[a,o]=$e(t.points);return B`<div class="heat" style="clip-path:${Ce(t.points)};background-color:${this.mapColor(e,n)};opacity:${this.ctx.dark?.42:.34}"></div>
        <span class="heat-label" style="left:${a}%;top:${o}%">${ge(n,this.ctx.lang,"temp"===e?1:0)}${s}</span>`}))}renderOpenings(t){const{ctx:e}=this,{hass:i,t:s}=e,n=this.floorRatio();return(t.doors??[]).filter((t=>t.entity&&i.states[t.entity]&&!e.config.settings.hidden.includes(t.entity))).map((a=>{const o=a.entity,r=de(i.states[o]),l=ee(o),c="lock"===l?"unlocked"===r.state||"open"===r.state:"cover"===l?["open","opening"].includes(r.state):"on"===r.state,d="cover"===l;if(!c&&!d)return U;const p=(h=t.rooms??[],u=t.walls,g=a.x,m=a.y,bn(fn(h,u),g,m));var h,u,g,m;const f=p?180*Math.atan2((p.b[1]-p.a[1])/n,p.b[0]-p.a[0])/Math.PI:0,b="window"===a.kind||"wide_window"===a.kind,_=.85*mn[a.kind??"door"];return B`<button
          class="opening ${c?"open":""} ${b?"win":""}"
          style="left:${a.x}%;top:${a.y}%;width:${_}%;transform:translate(-50%, -50%) rotate(${f}deg)"
          title=${`${ie(i,e.config,o)} · ${fe(s,r,e.lang)}`}
          aria-label=${ie(i,e.config,o)}
          @click=${t=>{if(t.stopPropagation(),!d)return e.openEntity(o);ki(c?"off":"on"),he(i,i.states[o]).catch((()=>e.toast(s("error")))),this.requestUpdate()}}
        >
          <sn-icon icon=${b?c?"window-open-variant":"window-closed-variant":c?"door-open":"door-closed"} style="transform:rotate(${-f}deg)"></sn-icon>
        </button>`}))}renderSun(){const{ctx:t}=this;if(!t.allows("sun_on_plan")||"off"===t.config.settings.motion)return U;const e=t.hass.states["sun.sun"],i=Number(e?.attributes.azimuth),s=Number(e?.attributes.elevation);if(!e||Number.isNaN(i)||Number.isNaN(s)||s<=0)return U;const n=(i+180-Number(this.widget.config.north??0)+360)%360,a=Math.max(0,1-s/35),o=`rgba(255, ${Math.round(190+40*(1-a))}, ${Math.round(120+100*(1-a))}, ${((t.dark?.22:.16)+.14*a).toFixed(2)})`;return B`<div
      class="sunlight"
      aria-hidden="true"
      style="background:linear-gradient(${n}deg, ${o} 0%, transparent ${Math.round(55+25*(1-a))}%);mix-blend-mode:${t.dark?"screen":"soft-light"}"
    ></div>`}renderPeople(t){if(!this.ctx.allows("people_on_plan")||!t.rooms?.length)return U;const{hass:e}=this.ctx,i=t=>t.trim().toLowerCase(),s=new Map;return Object.values(e.states).filter((t=>t.entity_id.startsWith("person.")&&"home"===t.state)).map((n=>{const a=n.entity_id.split(".")[1],o=Object.values(e.states).filter((t=>t.entity_id.startsWith("sensor.")&&t.entity_id.includes(a)&&/_(area|room|location)$/.test(t.entity_id))).map((s=>t.rooms.find((t=>i(t.name)===i(s.state)||i(e.areas?.[s.state]?.name??"")===i(t.name))))).find(Boolean);if(!o)return U;const r=s.get(o.id)??0;s.set(o.id,r+1);const[l,c]=$e(o.points),d=n.attributes.entity_picture;return B`<span class="person" style="left:calc(${l}% + ${26*r-13}px);top:calc(${c}% + 22px);${d?`background-image:url('${e.hassUrl(d)}')`:""}" title=${n.attributes.friendly_name??""}
          >${d?"":(n.attributes.friendly_name??"?").slice(0,1)}</span
        >`}))}flyTo(t){if(!this.ctx.allows("fly_to_room")||this.zoom.s>1||this.tilt||matchMedia("(prefers-reduced-motion: reduce)").matches)return!1;const{w:e,h:i}=this.stageSize(),s=t.points.map((t=>t[0]/100*e)),n=t.points.map((t=>t[1]/100*i)),[a,o,r,l]=[Math.min(...s),Math.max(...s),Math.min(...n),Math.max(...n)],c=Math.min(3,Math.max(1.2,Math.min(e/(1.4*(o-a)),i/(1.4*(l-r)))));return this.settling=!0,this.zoom=this.clampZoom({s:c,x:e/2-(a+o)/2*c,y:i/2-(r+l)/2*c}),!0}canZoom(){return!this.ctx.editing&&!!this.floor?.image}local(t){const e=this.renderRoot.querySelector(".stage"),i=this.renderRoot.querySelector(".area").getBoundingClientRect();return{x:t.clientX-i.left-(e?.offsetLeft??0),y:t.clientY-i.top-(e?.offsetTop??0)}}clampZoom(t){const{w:e,h:i}=this.stageSize(),s=Math.min(4,Math.max(1,t.s));return{s:s,x:Math.min(0,Math.max(e-e*s,t.x)),y:Math.min(0,Math.max(i-i*s,t.y))}}zoomAround(t,e,i,s){const n=this.zoom,a=this.clampZoom({s:i,x:t-(t-n.x)/n.s*i,y:e-(e-n.y)/n.s*i});this.settling=s,this.zoom=a}onAreaDown(t){if(this.moved=0,this.canZoom()){if(this.pointers.set(t.pointerId,this.local(t)),2===this.pointers.size){this.dispatchEvent(new Event("sn-cancel-swipe",{bubbles:!0,composed:!0}));const[t,e]=[...this.pointers.values()];this.pinch={d:Math.hypot(t.x-e.x,t.y-e.y),mx:(t.x+e.x)/2,my:(t.y+e.y)/2,...this.zoom},this.pan=void 0}else if(1===this.pointers.size){const e=this.local(t),i=performance.now();if(this.lastTap&&i-this.lastTap.t<300&&Math.hypot(e.x-this.lastTap.x,e.y-this.lastTap.y)<30)return this.lastTap=void 0,this.zoomAround(e.x,e.y,this.zoom.s>1?1:2.5,!0),void t.stopPropagation();this.lastTap={t:i,...e},this.zoom.s>1&&(this.pan={x:e.x,y:e.y,zx:this.zoom.x,zy:this.zoom.y})}(this.zoom.s>1||this.pointers.size>1)&&(t.stopPropagation(),t.currentTarget.setPointerCapture(t.pointerId))}}onAreaMove(t){if(this.pointers.has(t.pointerId))if(this.moved+=Math.abs(t.movementX)+Math.abs(t.movementY),this.pointers.set(t.pointerId,this.local(t)),this.pinch&&this.pointers.size>=2){const[t,e]=[...this.pointers.values()],i=this.pinch,s=Math.min(4,Math.max(1,i.s*Math.hypot(t.x-e.x,t.y-e.y)/i.d)),n=(t.x+e.x)/2,a=(t.y+e.y)/2;this.settling=!1,this.zoom=this.clampZoom({s:s,x:n-(i.mx-i.x)/i.s*s,y:a-(i.my-i.y)/i.s*s})}else if(this.pan){const e=this.local(t);this.settling=!1,this.zoom=this.clampZoom({s:this.zoom.s,x:this.pan.zx+e.x-this.pan.x,y:this.pan.zy+e.y-this.pan.y})}}onAreaUp(t){this.pointers.delete(t.pointerId),this.pointers.size<2&&(this.pinch=void 0),this.pointers.size||(this.pan=void 0)}onWheel(t){if(!t.ctrlKey||!this.canZoom())return;t.preventDefault();const e=this.renderRoot.querySelector(".area").getBoundingClientRect(),i=this.renderRoot.querySelector(".stage");this.zoomAround(t.clientX-e.left-(i?.offsetLeft??0),t.clientY-e.top-(i?.offsetTop??0),this.zoom.s*Math.exp(-t.deltaY/200),!1)}pct(t){const e=this.renderRoot.querySelector(".stage").getBoundingClientRect();return[Math.min(100,Math.max(0,(t.clientX-e.left)/e.width*100)),Math.min(100,Math.max(0,(t.clientY-e.top)/e.height*100))]}corners(t){return(this.floor?.rooms??[]).filter((e=>e.id!==t)).flatMap((t=>t.points))}onStageDown(t){if(!this.roomMode||0!==t.button)return;if(t.stopPropagation(),!this.drawing)return void(this.selRoom=void 0);const e=this.drawing,i=this.pct(t);if(e.length>=3&&Math.hypot(i[0]-e[0][0],i[1]-e[0][1])<3)return this.finishRoom();this.drawing=[...e,ke(i,this.corners())]}finishRoom(){const t=this.drawing;if(!t||t.length<3)return;const e=Ie(),i=(this.floor?.rooms?.length??0)+1,s={id:e,name:this.ctx.t("room_default",{n:i}),points:t};this.edit(((t,e)=>{e&&(e.rooms=[...e.rooms??[],s])})),this.drawing=void 0,this.selRoom=e}onVtxDown(t,e,i){t.stopPropagation(),t.currentTarget.setPointerCapture(t.pointerId),this.selRoom=e.id,this.vtx={room:e.id,idx:i,pointerId:t.pointerId,p:e.points[i]}}onVtxMove(t){this.vtx&&t.pointerId===this.vtx.pointerId&&(this.vtx={...this.vtx,p:ke(this.pct(t),this.corners(this.vtx.room))})}onVtxUp(t){const e=this.vtx;e&&t.pointerId===e.pointerId&&(this.vtx=void 0,this.edit(((t,i)=>{const s=i?.rooms?.find((t=>t.id===e.room));s&&(s.points[e.idx]=e.p)})))}async autoAdd(){const{ctx:t}=this,{t:e,hass:i}=t,s=this.floor;if(!s?.image||this.detecting)return;if(!Object.keys(i.areas??{}).length)return t.toast(e("auto_need_areas"));let n;this.detecting=!0;try{n=await this.findRooms(s)}catch{return t.toast(e("detect_failed"))}finally{this.detecting=!1}if(!n.length&&!s.rooms?.length)return t.toast(e("detect_none"));const a=n.filter(((t,n)=>t.name===e("room_default",{n:(s.rooms?.length??0)+n+1})&&!((t,e)=>Object.values(t.areas??{}).some((t=>De(t.name)===De(e))))(i,t.name)));if(a.length)return this.roomMode=!0,this.selected=void 0,this.asking=a.map((t=>t.id)),this.askTotal=a.length,void(this.selRoom=a[0].id);this.placeAll()}nextQuestion(){const t=this.asking?.slice(1)??[];this.asking=t.length?t:void 0,this.selRoom=t[0],t.length||this.placeAll()}async placeAll(){await new Promise((t=>setTimeout(t))),await this.updateComplete;const t=this.floor;if(!t)return;const e=Te(this.ctx.hass,t);e.length&&this.edit(((t,i)=>i&&(i.markers=[...i.markers,...e]))),this.roomMode=!1,this.selRoom=void 0;const{t:i}=this.ctx;this.ctx.toast(e.length?i("detect_done_placed",{n:t.rooms?.length??0,m:e.length}):i("auto_nothing"))}async findRooms(e){const{hass:i,t:s}=this.ctx,n=e.rooms??[],{detectRooms:a}=await t((async()=>{const{detectRooms:t}=await import("./plan-detect-OLG7b4YU.js");return{detectRooms:t}}),[]),o=(await a(e.image)).filter((t=>!n.some((e=>we(t.center,e.points)))));if(!o.length)return[];const r=o.map(((t,e)=>({id:Ie(),name:s("room_default",{n:n.length+e+1}),points:t.points}))),l=Object.keys(i.states).find((t=>t.startsWith("ai_task.")));if(l)try{const t=await i.callWS({type:"smartnest/plan/read_rooms",image:e.image,entity_id:l,areas:Object.values(i.areas??{}).map((t=>t.name))});for(const e of t.rooms){const t=[e.x,e.y];let i=o.findIndex((e=>we(t,e.points)));if(i<0){const e=o.map((e=>Math.hypot(e.center[0]-t[0],e.center[1]-t[1]))),s=e.indexOf(Math.min(...e));e[s]<15&&(i=s)}i>=0&&(r[i].name=e.area||e.label)}}catch{}return this.edit(((t,e)=>e&&(e.rooms=[...e.rooms??[],...r]))),r}renameRoom(t){this.ctx.showSheet({title:this.ctx.t("room_name"),render:e=>B`<label class="field"
        >${e.t("room_name")}
        <input
          type="text"
          .value=${t.name}
          @change=${e=>this.edit(((i,s)=>{const n=s?.rooms?.find((e=>e.id===t.id));n&&(n.name=e.target.value.trim()||t.name)}))}
        />
      </label>`})}livePoints(t){return this.vtx?.room===t.id?t.points.map(((t,e)=>e===this.vtx.idx?this.vtx.p:t)):t.points}renderGlow(t,e){const i=Math.max(120,.3*e);return(t.rooms??[]).map((e=>{const s=t.markers.filter((t=>"light"===ee(t.entity)&&we([t.x,t.y],e.points))).filter((t=>"on"===this.st(t.entity)?.state)),n=s.map((t=>{const e=this.st(t.entity).attributes,[s,n,a]=Array.isArray(e.rgb_color)?e.rgb_color:[255,196,120],o="number"==typeof e.brightness?e.brightness/255:1,r=(this.ctx.dark?.35:.22)+(this.ctx.dark?.45:.25)*o;return`radial-gradient(circle ${i}px at ${t.x}% ${t.y}%, rgba(${s},${n},${a},${r.toFixed(2)}) 0%, rgba(${s},${n},${a},${(.45*r).toFixed(2)}) 45%, rgba(${s},${n},${a},${(.18*r).toFixed(2)}) 100%)`}));return B`<div
        class="glow ${s.length?"lit":""}"
        style="clip-path:${Ce(this.livePoints(e))};opacity:${s.length?1:0};${n.length?`background:${n.join(",")}`:""}"
      ></div>`}))}renderRoomEditor(t){const e=t.rooms??[],i=this.drawing;return B`<svg class="rooms-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        ${e.map((t=>Z`<polygon
            class=${t.id===this.selRoom?"sel":""}
            points=${this.livePoints(t).map((t=>t.join(","))).join(" ")}
            @pointerdown=${e=>{this.drawing||(e.stopPropagation(),this.selRoom=t.id)}}
          ></polygon>`))}
        ${i?Z`<polyline points=${i.map((t=>t.join(","))).join(" ")}></polyline>`:U}
      </svg>
      ${e.map((t=>{const[e,i]=$e(this.livePoints(t));return B`<span class="room-label" style="left:${e}%;top:${i}%">${t.name}</span>`}))}
      ${i?.map(((t,e)=>B`<span class="vtx ${0===e&&i.length>=3?"first":""}" style="left:${t[0]}%;top:${t[1]}%;pointer-events:none"></span>`))}
      ${i?U:e.filter((t=>t.id===this.selRoom)).flatMap((t=>this.livePoints(t).map(((e,i)=>B`<span
                  class="vtx"
                  style="left:${e[0]}%;top:${e[1]}%"
                  @pointerdown=${e=>this.onVtxDown(e,t,i)}
                  @pointermove=${t=>this.onVtxMove(t)}
                  @pointerup=${t=>this.onVtxUp(t)}
                  @pointercancel=${()=>this.vtx=void 0}
                ></span>`))))}`}renderRoomTools(){const{t:t}=this.ctx,e=t=>t.stopPropagation();if(this.drawing)return B`<div class="tools glass" @pointerdown=${e}>
        <span class="hint">${t("draw_hint")}</span>
        <button class="icon-btn pressable" aria-label=${t("undo_point")} ?disabled=${!this.drawing.length} @click=${()=>this.drawing=this.drawing.slice(0,-1)}>
          <sn-icon icon="undo" style="--icon-size:20px"></sn-icon>
        </button>
        <button class="btn pressable" @click=${()=>this.drawing=void 0}>${t("cancel")}</button>
        <button class="btn primary pressable" ?disabled=${this.drawing.length<3} @click=${()=>this.finishRoom()}>${t("finish")}</button>
      </div>`;const i=this.floor?.rooms?.find((t=>t.id===this.selRoom)),s=Object.values(this.ctx.hass.areas??{}).map((t=>t.name)).sort(((t,e)=>t.localeCompare(e)));if(this.asking?.length&&i){const n=new Set((this.floor?.rooms??[]).map((t=>t.name)));return B`<div class="tools glass" @pointerdown=${e}>
        <span class="label">${t("which_room")} ${this.askTotal-this.asking.length+1}/${this.askTotal}</span>
        <select
          aria-label=${t("which_room")}
          style="width:auto;min-height:40px"
          @change=${t=>{const e=t.target.value;e&&(this.edit(((t,s)=>{const n=s?.rooms?.find((t=>t.id===i.id));n&&(n.name=e)})),this.nextQuestion())}}
        >
          <option value="" selected>🏠 ${t("room_area")}</option>
          ${s.filter((t=>!n.has(t))).map((t=>B`<option value=${t}>🏠 ${t}</option>`))}
        </select>
        <button class="btn pressable" @click=${()=>this.nextQuestion()}>${t("skip_room")}</button>
        <button class="btn pressable" @click=${()=>(this.asking=void 0,this.placeAll())}>${t("finish")}</button>
      </div>`}return i?B`<div class="tools glass" @pointerdown=${e}>
        <span class="label">${i.name}</span>
        ${this.robotRooms?.length?B`<select
              aria-label=${t("widget_vacuum")}
              title=${t("widget_vacuum")}
              style="width:auto;min-height:40px"
              @change=${t=>this.edit(((e,s)=>{const n=s?.rooms?.find((t=>t.id===i.id));n&&(t.target.value?n.robot_room=t.target.value:delete n.robot_room)}))}
            >
              <option value="" ?selected=${!i.robot_room}>🤖 ${this.robotRooms.find((t=>t.id===vs({...i,robot_room:void 0},this.robotRooms)))?.name??"–"}</option>
              ${this.robotRooms.map((t=>B`<option value=${t.id} ?selected=${i.robot_room===t.id}>🤖 ${t.name}</option>`))}
            </select>`:U}
        ${s.length?B`<select
              aria-label=${t("room_area")}
              title=${t("room_area")}
              style="width:auto;min-height:40px"
              @change=${t=>t.target.value&&this.edit(((e,s)=>{const n=s?.rooms?.find((t=>t.id===i.id));n&&(n.name=t.target.value)}))}
            >
              <option value="" ?selected=${!s.includes(i.name)}>🏠 ${t("room_area")}</option>
              ${s.map((t=>B`<option value=${t} ?selected=${t===i.name}>🏠 ${t}</option>`))}
            </select>`:U}
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
      </div>`:B`<div class="tools glass" @pointerdown=${e}>
      ${this.floor?.rooms?.length?U:B`<span class="hint">${t("rooms_hint")}</span>`}
      <button class="btn primary pressable" @click=${()=>this.drawing=[]}>
        <sn-icon icon="rooms" style="--icon-size:20px"></sn-icon>${t("draw_room")}
      </button>
      <button class="btn pressable" ?disabled=${this.detecting} @click=${()=>this.autoAdd()}>
        <sn-icon icon="auto-fix" style="--icon-size:20px"></sn-icon>${t(this.detecting?"detecting":"detect_rooms")}
      </button>
      ${this.floor?.rooms?.length?B`<button
            class="btn pressable"
            @click=${()=>{const e=this.floor,i=Te(this.ctx.hass,e);this.edit(((t,e)=>e&&(e.markers=[...e.markers,...i]))),this.ctx.toast(t("autofill_done",{n:i.length}))}}
          >
            <sn-icon icon="marker-plus" style="--icon-size:20px"></sn-icon>${t("autofill_rooms")}
          </button>`:U}
      <button class="btn pressable" @click=${()=>this.roomMode=!1}>${t("done")}</button>
    </div>`}renderMarker(t){const{ctx:e}=this,i=this.st(t.entity),s=ne(i),n=this.drag?.id===t.id,a=!e.editing&&"vacuum"===ee(t.entity)&&this.floor&&e.allows("robot_on_plan")?this.robotRoom(this.floor,t.entity):void 0,[o,r]=a?$e(a.points):[t.x,t.y],l=o,c=r,d=["marker",s?"on":"",s&&"binary_sensor"===ee(t.entity)&&["motion","occupancy","presence"].includes(i?.attributes.device_class)?"pulse":"",i&&"unavailable"!==i.state?"":"dim",s||e.editing||!e.dark||!e.config.settings.night_plan||this.selected?"":"sleepy",e.editing?"editable":"",n?"dragging":"",a?"roving":"",this.selected===t.id&&e.editing?"selected":""].join(" ");return B`<div
      class=${d}
      data-m=${t.id}
      style="left:${l}%;top:${c}%;${ae(i)}"
      role="button"
      tabindex="0"
      aria-label=${ie(e.hass,e.config,t.entity)}
      @pointerdown=${e=>this.onDown(e,t)}
      @pointermove=${t=>this.onMove(t)}
      @pointerup=${e=>this.onUp(e,t)}
      @pointercancel=${()=>this.onCancel()}
      @contextmenu=${t=>t.preventDefault()}
      @keydown=${i=>"Enter"===i.key&&!e.editing&&this.tap(t)}
    >
      ${e.allows("plan_fx")&&!e.editing?this.fx(i):U}
      <span class="ic"><sn-icon class=${Ui(i)} .icon=${oe(i,t.entity)}></sn-icon></span>
      ${"value"===t.display?B`<span class="val">${Zi(be(e.t,i,e.lang))}</span>`:U}
      ${e.editing&&this.selected===t.id&&!n?B`<span class="tag">${ie(e.hass,e.config,t.entity)}</span>`:U}
    </div>`}renderLens(t,e){const i=this.lens,s=2.5,n=t.rooms?.find((t=>we([i.x,i.y],t.points))),a=75-i.x/100*e.w*s,o=75-i.y/100*e.h*s;return B`<div
      class="lens"
      style="left:${i.x}%;top:${i.y}%;background-image:url('${t.image}');background-size:${e.w*s}px ${e.h*s}px;background-position:${a}px ${o}px"
    >
      ${n?B`<span>${n.name}</span>`:U}
    </div>`}renderStack(){const t=this.floors.filter((t=>t.image)),e=t.length;return B`<div class="stack" @pointerdown=${t=>t.stopPropagation()}>
      ${t.map(((t,i)=>B`<button
          class="slab pressable"
          style="--i:${i};--n:${e};z-index:${e-i}"
          aria-label=${t.name}
          @click=${()=>{this.floorIdx=this.floors.indexOf(t),this.natural=void 0,this.stack=!1}}
        >
          <span class="plate">
            <img src=${t.image} alt="" />
            ${t.markers.filter((t=>"light"===ee(t.entity)&&"on"===this.ctx.hass.states[t.entity]?.state)).map((t=>B`<i class="lit" style="left:${t.x}%;top:${t.y}%"></i>`))}
          </span>
        </button>`))}
      ${t.map(((t,i)=>B`<span class="slab-tag" style="--i:${i};--n:${e}">${t.name}</span>`))}
    </div>`}robotRoom(t,e){const{hass:i}=this.ctx;if("cleaning"!==i.states[e]?.state||!t.rooms?.length)return;const s=i.entities?.[e]?.device_id,n=Object.values(i.entities??{}).find((t=>t.device_id&&t.device_id===s&&t.entity_id.startsWith("sensor.")&&/current_room|_room$/.test(t.entity_id))),a=n?i.states[n.entity_id]?.state:void 0;if(!a)return;const o=t=>t.trim().toLowerCase(),r=i.areas?.[a]?.name;return t.rooms.find((t=>o(t.name)===o(a)||r&&o(t.name)===o(r)||t.robot_room===a))}get cleanedKey(){return`smartnest-cleaned-${this.widget.id}-${(new Date).toDateString()}`}fx(t){if(!t)return U;const e=ee(t.entity_id),i=t.attributes.device_class;if("binary_sensor"===e&&["door","window","opening","garage_door"].includes(i)&&"on"===t.state)return B`<span class="fx fx-door" aria-hidden="true"><svg viewBox="0 0 40 40"><path d="M4 36 L4 4 A32 32 0 0 1 36 36" /></svg></span>`;if("binary_sensor"===e&&"moisture"===i&&"on"===t.state)return B`<span class="fx fx-ripple" aria-hidden="true"><i></i><i></i><i></i></span>`;if("cover"===e&&"number"==typeof t.attributes.current_position)return B`<span class="fx fx-shade" aria-hidden="true" style="--shut:${(100-t.attributes.current_position)/100}"></span>`;if("climate"===e&&"off"!==t.state&&"unavailable"!==t.state){const e="heat"===t.state||"heating"===t.attributes.hvac_action;return B`<span class="fx fx-air ${e?"hot":""}" aria-hidden="true"><i></i><i></i><i></i></span>`}return"media_player"===e&&"playing"===t.state?B`<span class="fx fx-notes" aria-hidden="true"><i>♪</i><i>♫</i><i>♪</i></span>`:U}floorRatio(){const t=this.floor;return t?.drawn&&t.ratio?t.ratio:this.natural?this.natural.w/this.natural.h:1.5}async openDrawer(){const{drawPlan:e}=await t((async()=>{const{drawPlan:t}=await import("./plan-draw-YbpieY6T.js");return{drawPlan:t}}),[]),i=this.floor??We(this.ctx.t("floor_default")),s=i.photo??(i.drawn?"":i.image??""),n=await e(this.ctx,this,structuredClone(i),this.floorRatio(),s);n&&(this.edit(((t,e)=>{e?Object.assign(e,n):t.push(n)})),this.natural=void 0)}async cleanPlan(){const e=this.floor;if(!e?.rooms?.length)return this.ctx.toast(this.ctx.t("plan_clean_need_rooms"));const{cleanFloor:i}=await t((async()=>{const{cleanFloor:t}=await import("./plan-draw-YbpieY6T.js");return{cleanFloor:t}}),[]),s=i(e,this.floorRatio());this.edit(((t,e)=>e&&Object.assign(e,s))),this.natural=void 0}renderTools(){const{ctx:t}=this,{t:e}=t,i=this.floor;if(this.roomMode)return this.renderRoomTools();const s=i?.markers.find((t=>t.id===this.selected));return s?B`<div class="tools glass" @pointerdown=${t=>t.stopPropagation()}>
        <span class="label">${ie(t.hass,t.config,s.entity)}</span>
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
      <button class="btn pressable" @click=${()=>this.openDrawer()}>
        <sn-icon icon="pencil-ruler" style="--icon-size:20px"></sn-icon>${e("plan_draw")}
      </button>
      ${i?.image&&!i.drawn?B`<button class="btn pressable" @click=${()=>this.cleanPlan()}>
            <sn-icon icon="auto-fix" style="--icon-size:20px"></sn-icon>${e("plan_clean")}
          </button>`:U}
      ${i?.photo&&i.drawn?B`<button class="btn pressable" @click=${()=>this.edit(((t,e)=>e&&(Object.assign(e,{image:e.photo,drawn:!1}),delete e.photo)))}>
            <sn-icon icon="image" style="--icon-size:20px"></sn-icon>${e("plan_photo_back")}
          </button>`:U}
      <button class="btn pressable" ?disabled=${!i?.image} @click=${()=>{this.roomMode=!0,this.selected=void 0;const t=Object.keys(this.ctx.hass.states).find((t=>t.startsWith("vacuum.")));t&&!this.robotRooms&&_s(this.ctx.hass,t).then((t=>this.robotRooms=t.rooms))}}>
        <sn-icon icon="rooms" style="--icon-size:20px"></sn-icon>${e("rooms")}
      </button>
      <button class="btn pressable" ?disabled=${!i?.image||this.detecting} @click=${()=>this.autoAdd()}>
        <sn-icon icon="auto-fix" style="--icon-size:20px"></sn-icon>${e(this.detecting?"detecting":"auto_add")}
      </button>
      <button class="btn primary pressable" ?disabled=${!i?.image} @click=${()=>this.addDevice()}>
        <sn-icon icon="marker-plus" style="--icon-size:20px"></sn-icon>${e("add_device")}
      </button>
      <input type="file" accept="image/png,image/jpeg,image/webp" @change=${this.onFile} />
    </div>`}render(){const{ctx:e}=this,{t:i}=e,s=this.floor,n=this.floors,a=this.stageSize(),o=this.natural?this.natural.w/this.natural.h:1.6,r=s?this.mapModes(s):[],l=r.includes(this.heat)?this.heat:void 0,c=this.tilt&&e.allows("plan_3d")&&!e.editing&&1===this.zoom.s,d=()=>{try{localStorage.setItem(this.heatKey,this.heat),localStorage.setItem(`${this.heatKey}-3d`,this.tilt?"1":"0")}catch{}};return B`<div class="wrap glass ${e.editing?"editing":""}">
      ${n.length>1||e.editing?B`<div class="floors" @pointerdown=${t=>t.stopPropagation()}>
            <div class="seg">
              ${n.map(((t,i)=>B`<button
                  aria-pressed=${i===this.floorIdx}
                  @click=${()=>{if(i===this.floorIdx&&e.editing)return this.floorSheet();this.floorIdx=i,this.selected=void 0,this.natural=void 0}}
                >
                  <sn-icon icon="layers" style="--icon-size:16px"></sn-icon>${t.name}
                </button>`))}
              ${e.editing?B`<button aria-label=${i("add_floor")} @click=${()=>this.addFloor()}>
                    <sn-icon icon="plus" style="--icon-size:18px"></sn-icon>
                  </button>`:U}
            </div>
          </div>`:U}
      ${s?.image&&!e.editing&&(r.length||e.allows("plan_3d")||e.allows("plan_replay")||e.allows("plan_lens"))?B`<div class="corner-btns" @pointerdown=${t=>t.stopPropagation()}>
            ${r.length?B`<button
                  class="pressable"
                  aria-pressed=${!!l}
                  aria-label=${i("heat_map")}
                  title=${i(l?"temp"===l?"map_temp":"humidity"===l?"map_humidity":"map_co2":"heat_map")}
                  @click=${()=>{const t=["off",...r];this.heat=t[(t.indexOf(l??"off")+1)%t.length],d()}}
                >
                  <sn-icon icon=${"humidity"===l?"humidity":"co2"===l?"co2":"power"===l?"lightning-bolt":"thermometer"}></sn-icon>
                </button>`:U}
            ${e.allows("plan_model")&&s.rooms?.length?B`<button class="pressable" aria-pressed=${this.model} aria-label=${i("plan_model")} title=${i("plan_model")} @click=${()=>(this.model=!this.model,this.stack=!1)}>
                  <sn-icon icon="home-city"></sn-icon>
                </button>`:U}
            ${e.allows("plan_lens")&&!this.model?B`<button class="pressable" aria-pressed=${this.lensOn} aria-label=${i("plan_lens")} title=${i("plan_lens")} @click=${()=>(this.lensOn=!this.lensOn,this.lens=void 0)}>
                  <sn-icon icon="magnify"></sn-icon>
                </button>`:U}
            ${e.allows("floor_stack")&&n.filter((t=>t.image)).length>1?B`<button class="pressable" aria-pressed=${this.stack} aria-label=${i("all_floors")} title=${i("all_floors")} @click=${()=>this.stack=!this.stack}>
                  <sn-icon icon="floors"></sn-icon>
                </button>`:U}
            ${e.allows("plan_replay")&&s.markers.length?B`<button class="pressable" aria-pressed=${!!this.replay} aria-label=${i("replay")} title=${i("replay")} @click=${()=>this.replay?this.stopReplay():this.startReplay()}>
                  <sn-icon icon="history"></sn-icon>
                </button>`:U}
            ${e.allows("plan_3d")?B`<button
                  class="pressable"
                  aria-pressed=${this.tilt}
                  aria-label=${i("plan_3d")}
                  title=${i("plan_3d")}
                  @click=${()=>{this.tilt=!this.tilt,this.zoom={s:1,x:0,y:0},d()}}
                >
                  <sn-icon icon="cube"></sn-icon>
                </button>`:U}
          </div>`:U}
      <div
        class="area ${this.canZoom()?"zoomable":""} ${this.zoom.s>1?"zoomed":""}"
        style=${e.narrow?`aspect-ratio:${o}`:""}
        @pointerdown=${t=>this.onAreaDown(t)}
        @pointermove=${t=>this.onAreaMove(t)}
        @pointerup=${t=>this.onAreaUp(t)}
        @pointercancel=${t=>this.onAreaUp(t)}
        @wheel=${t=>this.onWheel(t)}
      >
        ${this.model&&!e.editing&&s?.rooms?.length?(t((()=>import("./plan-model-CbY_J-r9.js")),[]),B`<sn-plan-model .ctx=${e} .floor=${s} .ratio=${o}></sn-plan-model>`):this.stack&&!e.editing?this.renderStack():s?.image?B`<div
              class="stage ${this.roomMode?"room-mode":""} ${this.drawing?"drawing":""} ${this.settling?"settle":""} ${c?"tilt":""} ${e.dark&&!e.editing&&e.allows("night_halos")&&!l?"night":""}"
              @pointermove=${t=>this.lensOn&&!e.editing&&(this.lens={x:this.pct(t)[0],y:this.pct(t)[1]})}
              @pointerleave=${()=>this.lens=void 0}
              style="width:${a.w}px;height:${a.h}px;transform:${c?"perspective(1400px) rotateX(40deg) scale(0.86)":`translate(${this.zoom.x}px, ${this.zoom.y}px) scale(${this.zoom.s})`};--inv:${1/this.zoom.s}"
              @pointerdown=${t=>this.onStageDown(t)}
            >
              <img
                class=${this.widget.config.invert_dark?"plan-light":""}
                src=${s.image}
                alt=""
                @load=${t=>{const e=t.target;this.natural={w:e.naturalWidth,h:e.naturalHeight},this.measure()}}
              />
              ${e.editing||l?U:this.renderSun()}
              ${l&&!e.editing?this.renderHeat(s,l):e.allows("room_glow")?this.renderGlow(s,a.w):U}
              ${!e.editing&&s.rooms?.length?B`<svg class="hit" viewBox="0 0 100 100" preserveAspectRatio="none">
                    ${s.rooms.map((t=>Z`<polygon points=${t.points.map((t=>t.join(","))).join(" ")} @click=${()=>this.roomSheet(t)}></polygon>`))}
                  </svg>`:U}
              ${!e.editing&&e.allows("robot_on_plan")?this.renderCleaned(s):U}
              ${!e.editing&&s.doors?.some((t=>t.entity))?this.renderOpenings(s):U}
              ${(e.editing?s.markers:s.markers.filter((t=>!e.config.settings.hidden.includes(t.entity)))).map((t=>this.renderMarker(t)))} ${e.editing?U:this.renderPeople(s)}
              ${e.editing&&this.roomMode?this.renderRoomEditor(s):U}
              ${this.lensOn&&this.lens&&!e.editing?this.renderLens(s,a):U}
            </div>`:B`<div class="empty">
              <sn-icon icon="image"></sn-icon>
              <strong>${i("no_plan")}</strong>
              ${e.isAdmin&&!e.editing?B`<span>${i("no_plan_admin")}</span>`:U}
            </div>`}
      </div>
      ${e.editing&&s?this.renderTools():U}
      ${this.replay&&!e.editing?this.renderReplay():U}
    </div>`}};$n.styles=[fi,qi,r`
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
      /* Editing: the plan shrinks a little so its tools bar sits under it, not on top of the bottom rooms. */
      .wrap.editing .area {
        padding-bottom: 78px;
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
      /* Night halos (2.0): the plan sinks into the dark and lights pour real-looking pools of light on the floor. */
      .stage.night img {
        filter: brightness(0.42) saturate(0.6);
        transition: filter 1.2s var(--ease-out);
      }
      :host([dark]) .stage.night img.plan-light {
        filter: invert(0.88) hue-rotate(180deg) brightness(0.5);
      }
      .stage.night .glow {
        mix-blend-mode: screen;
        filter: blur(4px) saturate(1.3);
      }
      .lens {
        position: absolute;
        width: 150px;
        height: 150px;
        margin: -75px 0 0 -75px;
        border-radius: 50%;
        pointer-events: none;
        z-index: 6;
        background-repeat: no-repeat;
        box-shadow: 0 0 0 3px var(--surface-solid), 0 18px 40px rgba(0, 0, 0, 0.35), inset 0 0 20px rgba(0, 0, 0, 0.2);
        animation: lens-in 220ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .lens span {
        position: absolute;
        bottom: 10px;
        left: 50%;
        translate: -50% 0;
        padding: 3px 10px;
        border-radius: 999px;
        background: var(--surface-solid);
        font: 600 12px var(--font);
        white-space: nowrap;
        color: var(--text);
      }
      @keyframes lens-in {
        from {
          opacity: 0;
          transform: scale(0.6);
        }
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
        animation-play-state: var(--loops, running);
      }
      .fx-ripple i {
        position: absolute;
        inset: 0;
        border-radius: 999px;
        border: 2px solid #3a86ff;
        animation: fx-ripple 2.1s cubic-bezier(0.22, 1, 0.36, 1) infinite;
        animation-play-state: var(--loops, running);
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
        animation-play-state: var(--loops, running);
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
        animation-play-state: var(--loops, running);
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
      /* A linked window or door, in its wall. */
      .opening {
        position: absolute;
        height: 12px;
        border: 0;
        padding: 0;
        border-radius: 6px;
        background: color-mix(in srgb, var(--text-2) 45%, transparent);
        cursor: pointer;
        display: grid;
        place-items: center;
        z-index: 2;
      }
      .opening sn-icon {
        --icon-size: 16px;
        position: absolute;
        top: -24px;
        color: var(--text-2);
        filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5));
      }
      .opening.open {
        background: #ffb347;
        box-shadow: 0 0 14px 3px rgba(255, 179, 71, 0.7);
        animation: open-pulse 2.4s ease-in-out infinite;
        animation-play-state: var(--loops, running);
      }
      .opening.open.win {
        background: #5ec8f2;
        box-shadow: 0 0 14px 3px rgba(94, 200, 242, 0.7);
      }
      .opening.open sn-icon {
        color: #fff;
      }
      @keyframes open-pulse {
        50% {
          opacity: 0.65;
        }
      }
      .sunlight {
        position: absolute;
        inset: 0;
        pointer-events: none;
        transition: background 2s;
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
        background: color-mix(in srgb, #2bb673 12%, transparent);
        overflow: hidden;
      }
      .clean::after {
        content: "";
        position: absolute;
        inset: 0 -100%;
        background: linear-gradient(115deg, transparent 40%, rgba(255, 255, 255, 0.5) 50%, transparent 60%);
        animation: shine 4s linear infinite;
        animation-play-state: var(--loops, running);
      }
      .clean-tag {
        position: absolute;
        transform: translate(-50%, -150%);
        font-size: 18px;
        pointer-events: none;
      }
      @keyframes shine {
        from {
          transform: translateX(50%);
        }
        to {
          transform: translateX(-50%);
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
    `],$n.SCALES={temp:[[17,[24,188,242]],[21.5,[47,181,122]],[25.5,[233,151,29]],[29,[242,107,104]]],humidity:[[25,[233,151,29]],[45,[47,181,122]],[70,[24,188,242]]],co2:[[450,[47,181,122]],[1e3,[233,151,29]],[1500,[242,107,104]]],power:[[20,[47,181,122]],[600,[233,151,29]],[2e3,[242,107,104]]]},wn([gt({attribute:!1})],$n.prototype,"ctx",2),wn([gt({attribute:!1})],$n.prototype,"widget",2),wn([mt()],$n.prototype,"floorIdx",2),wn([mt()],$n.prototype,"selected",2),wn([mt()],$n.prototype,"drag",2),wn([mt()],$n.prototype,"natural",2),wn([mt()],$n.prototype,"area",2),wn([mt()],$n.prototype,"uploading",2),wn([mt()],$n.prototype,"roomMode",2),wn([mt()],$n.prototype,"drawing",2),wn([mt()],$n.prototype,"selRoom",2),wn([mt()],$n.prototype,"vtx",2),wn([mt()],$n.prototype,"zoom",2),wn([mt()],$n.prototype,"settling",2),wn([mt()],$n.prototype,"heat",2),wn([mt()],$n.prototype,"tilt",2),wn([mt()],$n.prototype,"robotRooms",2),wn([mt()],$n.prototype,"detecting",2),wn([mt()],$n.prototype,"replay",2),wn([mt()],$n.prototype,"model",2),wn([mt()],$n.prototype,"lens",2),wn([mt()],$n.prototype,"lensOn",2),wn([mt()],$n.prototype,"stack",2),wn([mt()],$n.prototype,"asking",2),$n=wn([pt("sn-w-floorplan")],$n);const kn=new Set,Cn=new Map;var Mn=Object.defineProperty,Hn=Object.getOwnPropertyDescriptor,An=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Hn(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&Mn(e,i,a),a};function Ln(t,e,i){const s=t.states[e]?.attributes.entity_picture;if(s)return t.hassUrl(`${s}${s.includes("?")?"&":"?"}t=${i}`)}function Vn(t,e){const i=t.states[e],s=i?.attributes.access_token;if(i&&s)return i.attributes.entity_picture?.startsWith("/dev/")?i.attributes.entity_picture:t.hassUrl(`/api/camera_proxy_stream/${e}?token=${s}`)}let Sn=class extends ct{constructor(){super(...arguments),this.bust=Date.now(),this.visible=!0,this.streaming=!1}connectedCallback(){super.connectedCallback();let t=0;this.timer=window.setInterval((()=>{t++,!this.visible||this.streaming||!this.wantsLive()&&t%5!=0||(this.bust=Date.now())}),2e3),this.stopVis=ps(this,(t=>{this.visible=t,this.syncStream(),t&&Date.now()-this.bust>1e4&&(this.bust=Date.now())}))}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this.timer),this.stopVis?.(),this.dropStream()}wantsLive(){return!!this.widget?.config.entity&&(t=this.ctx,this.widget.config.live??t.config.settings.cameras_live??!0)&&!this.ctx.editing;var t}dropStream(){!function(t){if(Cn.delete(t),!kn.delete(t))return;const[e]=Cn.entries();e&&(Cn.delete(e[0]),e[1]())}(this),this.streaming=!1,this.liveSrc=void 0}syncStream(){var t,e;this.visible&&this.wantsLive()?this.streaming=(t=this,e=()=>this.syncStream(),!!kn.has(t)||(kn.size<4?(kn.add(t),Cn.delete(t),!0):(Cn.set(t,e),!1))):this.streaming&&this.dropStream()}willUpdate(){this.hasUpdated&&this.syncStream()}updated(){const t=this.widget.config.entity,e=t?Ln(this.ctx.hass,t,this.bust):void 0;e&&e!==this.shown&&e!==this.loading&&(this.loading=e,this.shown?function(t){return new Promise(((e,i)=>{const s=new Image;s.onload=()=>(s.decode?s.decode().catch((()=>{})):Promise.resolve()).then((()=>e(t))),s.onerror=i,s.src=t}))}(e).then((t=>this.loading===t&&(this.shown=t)),(()=>{})):this.shown=e)}render(){const{ctx:t}=this,e=this.widget.config.entity;this.streaming&&!this.liveSrc&&(this.liveSrc=Vn(t.hass,e));const i=this.streaming&&this.liveSrc,s=i?this.liveSrc:this.shown;return B`
      <button class="cam pressable" @click=${i=>!t.editing&&e&&t.openEntity(e,i.currentTarget)}>
        ${s?B`<img
              src=${s}
              alt=""
              draggable="false"
              @error=${()=>{i&&(this.liveSrc=void 0,window.setTimeout((()=>this.requestUpdate()),1500))}}
            />`:B`<span class="placeholder"><sn-icon icon="cctv"></sn-icon></span>`}
        ${i?B`<span class="live">${t.t("live")}</span>`:U}
        <span class="label"><sn-icon icon="cctv" style="--icon-size:16px"></sn-icon>${e?ie(t.hass,t.config,e):t.t("widget_camera")}</span>
      </button>
    `}};Sn.styles=[fi,r`
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
      .live {
        position: absolute;
        top: 10px;
        inset-inline-start: 12px;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 4px 10px;
        border-radius: 999px;
        background: rgba(21, 26, 30, 0.55);
        color: #fff;
        font-size: 11px;
        font-weight: 700;
      }
      .live::before {
        content: "";
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #ff4d4d;
        animation: blink 1.4s ease-in-out infinite;
      }
      @keyframes blink {
        50% {
          opacity: 0.3;
        }
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
    `],An([gt({attribute:!1})],Sn.prototype,"ctx",2),An([gt({attribute:!1})],Sn.prototype,"widget",2),An([mt()],Sn.prototype,"bust",2),An([mt()],Sn.prototype,"shown",2),An([mt()],Sn.prototype,"visible",2),An([mt()],Sn.prototype,"streaming",2),Sn=An([pt("sn-w-camera")],Sn);var zn=Object.defineProperty,Dn=Object.getOwnPropertyDescriptor,On=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Dn(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&zn(e,i,a),a};let Tn=class extends ct{render(){return B`<h2>${this.widget.config.text||this.ctx.t("widget_heading")}</h2>`}};function jn(t=new Date){const e=t.getHours();return e>=4&&e<12?"greet_morning":e>=12&&e<17?"greet_afternoon":"greet_evening"}function Pn(t,e){return e.trim()||t.user?.name||""}function In(t,e=!1){if(!t)return"w-cloudy";if("partlycloudy"===t&&e)return"w-partlycloudy-night";const i=`w-${"windy-variant"===t?"windy":"snowy-rainy"===t||"hail"===t?"snowy":t}`;return Yt[i]?i:"w-cloudy"}Tn.styles=[fi,r`
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
    `],On([gt({attribute:!1})],Tn.prototype,"ctx",2),On([gt({attribute:!1})],Tn.prototype,"widget",2),Tn=On([pt("sn-w-heading")],Tn);const En=["fajr","dhuhr","asr","maghrib","isha"];function Nn(t){const e=[];for(const i of En){const s=Object.values(t.states).find((t=>t.entity_id.startsWith("sensor.")&&t.entity_id.endsWith(`${i}_prayer`))),n=s?new Date(s.state):void 0;n&&!Number.isNaN(n.getTime())&&e.push({id:i,at:n})}return e.sort(((t,e)=>t.at.getTime()-e.at.getTime()))}function Wn(t,e,i=new Date){const s=Math.max(0,Math.round((e.getTime()-i.getTime())/6e4));if(s<60)return t("in_min",{n:s});return t("in_hours",{n:`${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`})}async function Rn(t,e){try{const i=await t.callWS({type:"call_service",domain:"weather",service:"get_forecasts",target:{entity_id:e},service_data:{type:"daily"},return_response:!0}),s=i.response?.[e]?.forecast?.[0];return s?{high:s.temperature,low:s.templow,condition:s.condition}:{}}catch{return{}}}var Fn=Object.defineProperty,Bn=Object.getOwnPropertyDescriptor,Zn=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Bn(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&Fn(e,i,a),a};function qn(t=new Date){try{const e=new Intl.DateTimeFormat("en-u-ca-islamic-umalqura-nu-latn",{month:"numeric",day:"numeric"}).formatToParts(t),i=Number(e.find((t=>"month"===t.type))?.value),s=Number(e.find((t=>"day"===t.type))?.value);return i&&s?{month:i,day:s}:void 0}catch{return}}function Un(t,e=new Date){if("off"===t.season)return null;if("ramadan"===t.season||"eid"===t.season)return t.season;const i=qn(e);return i?9===i.month?"ramadan":10===i.month&&i.day<=3||12===i.month&&i.day>=10&&i.day<=13?"eid":null:null}const Yn=(t,e,i,s)=>Z`<g style="transform-origin:${t}px 0;animation:sn-sway 4.5s cubic-bezier(0.77,0,0.175,1) ${i}s infinite alternate">
  <line x1=${t} y1="0" x2=${t} y2=${e} stroke="#E9971D" stroke-opacity=".7" stroke-width="1.2"></line>
  <g transform="translate(${t} ${e}) scale(${s})">
    <path d="M-10 0h20l-3 6h-14z" fill="#B87410"></path>
    <path d="M-12 6h24l-4 26h-16z" fill="#E9971D" fill-opacity=".9"></path>
    <path d="M-7 10h14l-2 18h-10z" fill="#FFE2A8"></path>
    <path d="M-8 32h16l-5 6h-6z" fill="#B87410"></path>
    <circle cx="0" cy="19" r="9" fill="#FFD27A" opacity=".35" style="animation:sn-flicker 2.6s ease-in-out ${i}s infinite alternate"></circle>
  </g>
</g>`;let Xn=class extends ct{constructor(){super(...arguments),this.season=null,this.inline=!1}render(){if(!this.season)return U;if("ramadan"===this.season&&this.inline)return B`<svg viewBox="0 0 150 120" aria-hidden="true">
        ${Yn(40,30,0,.9)} ${Yn(95,55,.7,1.1)} ${Yn(132,22,1.3,.7)}
      </svg>`;if("eid"===this.season&&this.inline)return B`<svg viewBox="0 0 150 120" aria-hidden="true">
        ${["#E9971D","#2FB57A","#18BCF2","#F26B68","#E9971D"].map(((t,e)=>Z`<path d="M${10+28*e} ${6+10*Math.sin(e/4*Math.PI)} l26 2 l-13 24 z" fill=${t} opacity=".85"
            style="transform-origin:${10+28*e}px 6px;animation:sn-sway 3.5s cubic-bezier(0.77,0,0.175,1) ${.3*e}s infinite alternate"></path>`))}
      </svg>`;if("ramadan"===this.season)return B`<svg viewBox="0 0 1200 150" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
        ${Yn(90,70,0,1)} ${Yn(230,40,.8,.8)} ${Yn(970,50,.4,.9)} ${Yn(1110,85,1.2,1.1)}
        ${Z`<g transform="translate(1040 34)"><circle r="16" fill="#F5D9A0"></circle><circle cx="7" cy="-4" r="14" fill="var(--bg, #151A1E)"></circle></g>`}
        ${[160,300,900,1180,60].map(((t,e)=>Z`<circle cx=${t} cy=${18+e%3*14} r="1.6" fill="#F5D9A0" style="animation:sn-flicker 2s ease-in-out ${.4*e}s infinite alternate"></circle>`))}
      </svg>`;const t=Array.from({length:24},((t,e)=>{const i=20+50*e,s=8+26*Math.sin(e/23*Math.PI);return Z`<path d="M${i-14} ${s} L${i+14} ${s+2} L${i} ${s+28} Z" fill=${["#E9971D","#2FB57A","#18BCF2","#F26B68"][e%4]} opacity=".85"
        style="transform-origin:${i}px ${s}px;animation:sn-sway 3.5s cubic-bezier(0.77,0,0.175,1) ${e%5*.3}s infinite alternate"></path>`}));return B`<svg viewBox="0 0 1200 150" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
      <path d="M0 8 Q600 70 1200 8" fill="none" stroke="#E9971D" stroke-opacity=".5" stroke-width="1.5"></path>
      ${t}
    </svg>`}};Xn.styles=r`
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
  `,Zn([gt()],Xn.prototype,"season",2),Zn([gt({type:Boolean,reflect:!0})],Xn.prototype,"inline",2),Xn=Zn([pt("sn-season")],Xn);var Kn=Object.defineProperty,Gn=Object.getOwnPropertyDescriptor,Jn=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Gn(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&Kn(e,i,a),a};let Qn=class extends ct{constructor(){super(...arguments),this.now=new Date,this.forecast={}}connectedCallback(){super.connectedCallback(),this.timer=window.setInterval((()=>this.now=new Date),15e3),this.loadForecast(),this.forecastTimer=window.setInterval((()=>this.loadForecast()),18e5)}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this.timer),window.clearInterval(this.forecastTimer)}async loadForecast(){const t=this.ctx?.config.settings.weather.entity;this.widget?.h>=4&&t&&this.ctx.hass.states[t]&&(this.forecast=await Rn(this.ctx.hass,t))}renderWeather(){const{ctx:t}=this,e=t.config.settings.weather.entity,i=e?t.hass.states[e]:void 0;if(!i)return U;const s="below_horizon"===t.hass.states["sun.sun"]?.state,n=e=>"number"==typeof e?ue(`${ge(e,t.lang,0)}°`):"",{high:a,low:o}=this.forecast;return B`<span class="pill">
      <sn-icon .icon=${In(i.state,s)}></sn-icon>${n(i.attributes.temperature)}
      ${void 0!==a?B`<span class="muted">${n(a)} / ${n(o)}</span>`:U}
    </span>`}renderPrayer(){const{ctx:t}=this;if(!t.config.settings.prayer)return U;const e=function(t,e=new Date){const i=Nn(t),s=i.find((t=>t.at.getTime()>e.getTime()));if(s)return s;const n=i.find((t=>"fajr"===t.id));return n?{id:"fajr",at:new Date(n.at.getTime()+864e5)}:void 0}(t.hass,this.now);return e?B`<span class="pill">
      <sn-icon icon="mosque"></sn-icon>${t.t(`p_${e.id}`)}
      <span class="muted">${Wn(t.t,e.at,this.now)}</span>
    </span>`:U}renderComplications(){const{ctx:t}=this;if(!t.allows("complications")||this.widget.w<4)return U;const{hass:e,config:i,lang:s,t:n}=t,a=Rs(i),o=t=>(i.settings.screensaver.temp_entity&&"temperature"===t?e.states[i.settings.screensaver.temp_entity]:void 0)??a.map((t=>e.states[t])).find((e=>e&&"sensor"===ee(e.entity_id)&&e.attributes.device_class===t&&!/out|خارج/.test(e.entity_id))),r=o("temperature"),l=o("humidity"),c=i.settings.power_entity?e.states[i.settings.power_entity]:void 0,d=i.settings.prayer?Nn(e).find((t=>t.at>this.now)):void 0,p=[];if(r&&p.push({v:`${ge(Number(r.state),s,0)}°`,frac:(Number(r.state)-10)/25,color:"#ff8a3d",label:n("hero_inside")}),l&&p.push({v:`${ge(Number(l.state),s,0)}%`,frac:Number(l.state)/100,color:"#3a9bff",label:n("air_humidity")}),c){const t=Number(c.state)*("kW"===c.attributes.unit_of_measurement?1e3:1);p.push({v:t>=1e3?`${ge(t/1e3,s,1)}k`:ge(t,s,0),frac:t/Math.max(1,i.settings.power_limit??6e3),color:"#e9971d",label:"W"})}if(d){const t=Math.max(0,Math.round((d.at.getTime()-this.now.getTime())/6e4));p.push({v:t>=60?`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`:`${t}′`,frac:1-Math.min(1,t/360),color:"#2bb673",label:n(`p_${d.id}`)})}if(!p.length)return U;const h=2*Math.PI*20;return B`<div class="comps">
      ${p.slice(0,4).map((t=>B`<div class="comp">
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <circle cx="24" cy="24" r="20" fill="none" stroke="var(--surface-2)" stroke-width="4"></circle>
            <circle cx="24" cy="24" r="20" fill="none" stroke=${t.color} stroke-width="4" stroke-linecap="round" stroke-dasharray="${h*Math.min(1,Math.max(.02,t.frac))} ${h}" transform="rotate(-90 24 24)"></circle>
          </svg>
          <b class="ltr">${t.v}</b>
          <span>${t.label}</span>
        </div>`))}
    </div>`}render(){const{ctx:t}=this,e=Ot[t.lang],i=B`<div class="time ltr">${this.now.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}</div>`,s=B`<div class="date">${this.now.toLocaleDateString(e,{weekday:"long",day:"numeric",month:"long"})}</div>`;if(this.widget.h<4){const e=t.config.settings.screensaver.temp_entity,n=e?t.hass.states[e]:void 0;return B`<div class="card glass">
        ${i} ${s} ${t.allows("complications")&&this.widget.w>=4?this.renderComplications():n?B`<div class="temp"><sn-icon icon="thermometer"></sn-icon>${be(t.t,n,t.lang)}</div>`:U}
      </div>`}const n=Pn(t.hass,t.config.settings.greeting_name),a=t.allows("seasons")?Un(t.config.settings,this.now):null;return B`<div class="card glass full" style="position:relative">
      ${a?B`<sn-season inline .season=${a}></sn-season>`:U}
      <div class="greet">
        ${a?B`${t.t("ramadan"===a?"ramadan_kareem":"eid_mubarak")} ${"ramadan"===a?"🌙":"🎉"} · `:U}${t.t(jn(this.now))}${n?("ar"===t.lang?"، ":", ")+n:""}
      </div>
      <div>${i} ${s}</div>
      <div class="pills">${this.renderWeather()} ${this.renderPrayer()}</div>
      ${this.renderComplications()}
    </div>`}};Qn.styles=[fi,r`
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
      .comps {
        display: flex;
        gap: 12px;
        justify-content: center;
        flex-wrap: wrap;
        margin-top: 4px;
      }
      .comp {
        position: relative;
        display: grid;
        justify-items: center;
        gap: 2px;
        width: 54px;
      }
      .comp svg {
        width: 48px;
        height: 48px;
      }
      .comp svg circle:last-child {
        transition: stroke-dasharray 900ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .comp b {
        position: absolute;
        top: 14px;
        font-size: 13px;
        font-weight: 700;
      }
      .comp span {
        font-size: 10px;
        color: var(--text-2);
        white-space: nowrap;
      }
    `],Jn([gt({attribute:!1})],Qn.prototype,"ctx",2),Jn([gt({attribute:!1})],Qn.prototype,"widget",2),Jn([mt()],Qn.prototype,"now",2),Jn([mt()],Qn.prototype,"forecast",2),Qn=Jn([pt("sn-w-clock")],Qn);var ta=Object.defineProperty,ea=Object.getOwnPropertyDescriptor,ia=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?ea(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&ta(e,i,a),a};let sa=class extends ct{constructor(){super(...arguments),this.seen=!0}connectedCallback(){super.connectedCallback(),this.load(),this.timer=window.setInterval((()=>this.seen&&this.load()),12e4),this.stopVis=ps(this,(t=>this.seen=t))}disconnectedCallback(){super.disconnectedCallback(),this.stopVis?.(),window.clearInterval(this.timer)}willUpdate(){const t=this.ctx.config.settings.doorbell.trigger_entity,e=t?`${this.ctx.hass.states[t]?.state}`:void 0;void 0!==this.bellSeen&&e!==this.bellSeen&&window.setTimeout((()=>this.load()),4e3),this.bellSeen=e}async load(){try{const t=await this.ctx.hass.callWS({type:"smartnest/visitors/list"});this.visits=t.visitors}catch{this.visits=[]}}open(t){const e=Ot[this.ctx.lang],i=new Date(t.time);this.ctx.showSheet({title:i.toLocaleString(e,{weekday:"long",hour:"2-digit",minute:"2-digit"}),render:e=>B`<img src=${e.hass.hassUrl(t.url)} alt="" style="width:100%;border-radius:var(--r-md);display:block" />`})}render(){const{ctx:t}=this,e=Ot[t.lang],i=this.visits??[];let s="";return B`<div class="wrap glass">
      <h3><sn-icon icon="doorbell"></sn-icon>${t.t("widget_visitors")}</h3>
      <div class="strip" data-no-swipe>
        ${this.visits&&!i.length?B`<span class="empty">${t.t("no_visitors")}</span>`:U}
        ${i.map(((i,n)=>{const a=new Date(i.time),o=(i=>{const s=new Date,n=new Date(s.getTime()-864e5);return i.toDateString()===s.toDateString()?t.t("today"):i.toDateString()===n.toDateString()?t.t("yesterday"):i.toLocaleDateString(e,{weekday:"short",day:"numeric",month:"short"})})(a),r=o!==s;return s=o,B`<button class="shot pressable" style="animation-delay:${40*Math.min(n,8)}ms" @click=${()=>this.open(i)}>
              <img src=${t.hass.hassUrl(i.url)} alt="" loading="lazy" />
              ${r?B`<em class="tag">${o}</em>`:U}
              <span>${a.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}</span>
            </button>`}))}
      </div>
    </div>`}};sa.styles=[fi,r`
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
    `],ia([gt({attribute:!1})],sa.prototype,"ctx",2),ia([gt({attribute:!1})],sa.prototype,"widget",2),ia([mt()],sa.prototype,"visits",2),sa=ia([pt("sn-w-visitors")],sa);var na=Object.defineProperty,aa=Object.getOwnPropertyDescriptor,oa=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?aa(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&na(e,i,a),a};const ra=(t,e)=>{const i=e?t.states[e]:void 0,s=Number(i?.state);if(!i||Number.isNaN(s))return;const n=i.attributes.unit_of_measurement;return"kW"===n?1e3*s:"MW"===n?1e6*s:s};function la(t){const e=Object.values(t.states).filter((t=>t.entity_id.startsWith("sensor.")&&"power"===t.attributes.device_class)),i=t=>e.find((e=>t.test(e.entity_id)))?.entity_id,s=Object.values(t.states).find((t=>t.entity_id.startsWith("sensor.")&&"battery"===t.attributes.device_class&&/(home|house|storage|inverter|powerwall)_?battery|battery_(soc|level|state_of_charge)/.test(t.entity_id)))?.entity_id;return{solar:i(/solar|pv/),grid:i(/grid/),battery:i(/battery_power|battery/),soc:s,home:i(/home_power|house|load|consumption/)}}const ca={solar:{x:150,y:46},grid:{x:46,y:150},home:{x:254,y:150},battery:{x:150,y:254}},da={solar:"#E9971D",grid:"#18BCF2",battery:"#2FB57A",home:"var(--text)"};let pa=class extends ct{get cfg(){const t=this.widget.config;return t.solar||t.grid||t.battery?t:{...la(this.ctx.hass),...t}}edge(t,e,i,s,n){const a=Math.abs(s??0),o=`M${e.x} ${e.y} L${i.x} ${i.y}`,r=void 0!==s&&a>=10,l=Math.max(.9,5-1.1*Math.log10(Math.max(a,10))),c=r?Math.min(5,2+Math.floor(Math.log10(a))):0,d=(s??0)<0;return Z`<path id=${t} class="line" d=${o}></path>
      ${Array.from({length:c},((e,i)=>Z`<circle class="dot" r="4.5" fill=${n} style="filter:drop-shadow(0 0 4px ${n})">
          <animateMotion dur="${l}s" repeatCount="indefinite" begin="${-l/c*i}s"
            keyPoints=${d?"1;0":"0;1"} keyTimes="0;1" calcMode="linear">
            <mpath href="#${t}"></mpath>
          </animateMotion>
        </circle>`))}`}node(t,e,i,s,n){const a=ca[t],o=da[t];return Z`<g>
      <circle class="node" cx=${a.x} cy=${a.y} r="38" stroke=${o}></circle>
      <foreignObject x=${a.x-13} y=${a.y-30} width="26" height="26">
        <sn-icon .icon=${e} style="--icon-size:26px;color:${"var(--text)"===o?"var(--text-2)":o}"></sn-icon>
      </foreignObject>
      <text class="val" x=${a.x} y=${a.y+13}>${s}</text>
      <text class="lbl" x=${a.x} y=${a.y+54}>${n?`${i} · ${n}`:i}</text>
    </g>`}render(){const{ctx:t}=this,{hass:e,t:i}=t,s=this.cfg,n=ra(e,s.solar);let a=ra(e,s.grid),o=ra(e,s.battery);void 0!==a&&s.flip_grid&&(a=-a),void 0!==o&&s.flip_battery&&(o=-o);const r=ra(e,s.home)??(n??0)+(a??0)-(o??0),l=s.soc?e.states[s.soc]?.state:void 0,c=e=>void 0===e?"–":ue(Math.abs(e)>=1e3?`${ge(Math.abs(e)/1e3,t.lang,1)} kW`:`${ge(Math.abs(e),t.lang,0)} W`);return B`<div class="wrap glass">
      <svg viewBox="0 0 300 310" role="img" aria-label=${i("widget_energy")}>
        ${s.solar?this.edge("e-solar",ca.solar,ca.home,n,da.solar):U}
        ${s.grid?this.edge("e-grid",ca.grid,ca.home,a,da.grid):U}
        ${s.battery?this.edge("e-bat",ca.battery,ca.home,void 0===o?void 0:-o,da.battery):U}
        ${s.solar?this.node("solar","solar",i("e_solar"),c(n)):U}
        ${s.grid?this.node("grid","tower",i("e_grid"),c(a)):U}
        ${s.battery?this.node("battery","battery",i("e_battery"),c(o),l&&!Number.isNaN(Number(l))?ue(`${Math.round(Number(l))}%`):void 0):U}
        ${this.node("home","home",i("e_home"),c(r))}
      </svg>
      ${(()=>{const e=(n??0)-r;return void 0!==n&&e>=1200&&t.allows("solar_tip")?B`<div class="tip" role="status"><sn-icon icon="solar" style="--icon-size:18px"></sn-icon>${i("solar_tip",{kw:c(e)})}</div>`:U})()}
    </div>`}};pa.styles=[fi,r`
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
    `],oa([gt({attribute:!1})],pa.prototype,"ctx",2),oa([gt({attribute:!1})],pa.prototype,"widget",2),pa=oa([pt("sn-w-energy")],pa);var ha=Object.defineProperty,ua=Object.getOwnPropertyDescriptor,ga=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?ua(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&ha(e,i,a),a};const ma=t=>Object.values(t.states).filter((t=>t.entity_id.startsWith("sensor.")&&"energy"===t.attributes.device_class&&/kWh|Wh|MWh/.test(t.attributes.unit_of_measurement??"")));function fa(t){const e=ma(t),i=e.find((t=>/total|import|consumption|grid|house|home/.test(t.entity_id)&&!/solar|pv|export/.test(t.entity_id)))?.entity_id,s=e.find((t=>/solar|pv/.test(t.entity_id)))?.entity_id;return{total:i,solar:s}}const ba=t=>"number"==typeof t?t>1e12?t:1e3*t:Date.parse(t);let _a=class extends ct{connectedCallback(){super.connectedCallback(),this.load(),this.timer=window.setInterval((()=>this.load()),9e5)}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this.timer)}get cfg(){const t=fa(this.ctx.hass),e=this.widget.config;return{total:e.total??t.total,solar:e.solar??t.solar,tariff:Number(e.tariff??.6),currency:e.currency??"₪",budget:Number(e.budget)||0}}async load(){const{hass:t}=this.ctx,{total:e,solar:i}=this.cfg;if(!e)return;const s=new Set(Rs(this.ctx.config)),n=ma(t).map((t=>t.entity_id)).filter((t=>t!==e&&t!==i&&!/today|daily|month|year/.test(t))),a=n.filter((t=>s.has(t))),o=(a.length?a:n).slice(0,12),r=new Date,l=new Date(r.getFullYear(),r.getMonth()-1,1),c=new Date(r.getFullYear(),r.getMonth(),1),d=[e,...i?[i]:[],...o];let p={};try{p=await t.callWS({type:"recorder/statistics_during_period",start_time:l.toISOString(),end_time:r.toISOString(),statistic_ids:d,period:"day",types:["change"]})}catch{return}const h=(t,e,i)=>(p[t]??[]).filter((t=>ba(t.start)>=e.getTime()&&ba(t.start)<i.getTime())).reduce(((t,e)=>t+(e.change??0)),0),u=r.getDate(),g=new Date(l.getFullYear(),l.getMonth(),u+1),m=h(e,c,r),f=new Date(r.getFullYear(),r.getMonth()+1,0).getDate(),b=Math.max(1,u-1+r.getHours()/24);this.data={used:m,projected:m/b*f,lastSame:h(e,l,g<c?g:c),solar:i?h(i,c,r):0,top:o.map((t=>({id:t,kwh:h(t,c,r)}))).filter((t=>t.kwh>0)).sort(((t,e)=>e.kwh-t.kwh)).slice(0,5),daily:Array.from({length:f},((t,i)=>h(e,new Date(r.getFullYear(),r.getMonth(),i+1),new Date(r.getFullYear(),r.getMonth(),i+2))))}}renderBudget(t,e,i,s){const{t:n,rtl:a}=this.ctx,o=e>i,r=a?"right":"left";return B`<div class="budget">
      <div class="bt">
        <span>${n("bill_budget")} ${s(i)}</span>
        <span class=${o?"warn":"ok"}>${o?n("bill_over",{v:s(e-i)}):n("bill_within")}</span>
      </div>
      <div class="track">
        <span class="fill ${o?"warn":""}" style="transform:scaleX(${Math.min(1,t/i)});transform-origin:${r}"></span>
        <span class="tick" style="${r}:${Math.min(100,e/i*100)}%"></span>
      </div>
    </div>`}renderDaily(t){const e=Math.max(...t,.001),i=(new Date).getDate()-1,s=t.length;return B`<svg class="daily" viewBox="0 0 ${4*s} 30" preserveAspectRatio="none" aria-hidden="true" style="transform:${this.ctx.rtl?"scaleX(-1)":"none"}">
      ${t.map(((t,s)=>Z`<rect x=${4*s+.5} y=${30-Math.max(s<=i?1:0,t/e*28)} width="3" height=${Math.max(s<=i?1:0,t/e*28)} rx="1" class=${s===i?"now":s<i?"past":"future"}></rect>`))}
    </svg>`}render(){const{ctx:t}=this,{t:e,lang:i}=t,{tariff:s,currency:n,total:a,budget:o}=this.cfg,r=t=>ue(`${n} ${ge(t,i,0)}`),l=this.data;if(!a)return B`<div class="card glass"><h3><sn-icon icon="lightning-bolt"></sn-icon>${e("bill_title")}</h3><sn-empty text=${e("no_entities")}></sn-empty></div>`;const c=l&&l.lastSame>0?Math.round((l.used-l.lastSame)/l.lastSame*100):void 0,d=l?.top[0]?.kwh??1;return B`<div class="card glass">
      <h3><sn-icon icon="lightning-bolt"></sn-icon>${e("bill_title")}</h3>
      ${l&&t.allows("ai_bill")?B`<sn-ai-ask-button .ctx=${t} label=${e("ai_bill_btn")} .run=${()=>Cs(t,"bill",{facts:Js(t,l,s,n)})}></sn-ai-ask-button>`:U}
      ${l?B`<div class="bill">
              <span class="lbl">${e("bill_projected")}</span>
              <span class="big"><sn-num .value=${r(l.projected*s)}></sn-num></span>
            </div>
            ${o&&t.allows("bill_budget")?this.renderBudget(l.used*s,l.projected*s,o,r):U}
            ${this.renderDaily(l.daily)}
            <div class="row">
              <span class="pill">${e("bill_used")} ${ue(`${ge(l.used,i,0)} kWh`)}</span>
              ${void 0!==c?B`<span class="pill ${c>0?"up":"down"}"
                    ><sn-icon icon=${c>0?"chevron-up":"chevron-down"}></sn-icon>${ue(`${Math.abs(c)}%`)} ${e("bill_vs_last")}</span
                  >`:U}
              ${void 0!==c&&c<=-5&&t.allows("energy_challenge")?B`<span class="pill down" title=${e("challenge_hint")}>🏅 ${e("challenge_won",{n:Math.abs(c)})}</span>`:U}
              ${l.solar>0?B`<span class="pill down"><sn-icon icon="solar"></sn-icon>${e("bill_solar")} ${r(l.solar*s)}</span>`:U}
            </div>
            ${l.top.length?B`<div class="top">
                  <span class="lbl" style="font-size:13px;color:var(--text-2)">${e("bill_top")}</span>
                  ${l.top.map((e=>B`<div class="item">
                      <span>${ie(t.hass,t.config,e.id)}</span>
                      <span class="muted">${ue(`${ge(e.kwh,i,0)} kWh · ${n}${ge(e.kwh*s,i,0)}`)}</span>
                      <div class="bar"><span style="transform:scaleX(${e.kwh/d});transform-origin:${t.rtl?"right":"left"}"></span></div>
                    </div>`))}
                </div>`:U}`:B`<sn-skeleton></sn-skeleton>`}
    </div>`}};_a.styles=[fi,r`
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
    `],ga([gt({attribute:!1})],_a.prototype,"ctx",2),ga([gt({attribute:!1})],_a.prototype,"widget",2),ga([mt()],_a.prototype,"data",2),_a=ga([pt("sn-w-energy-stats")],_a);var ya=Object.defineProperty,va=Object.getOwnPropertyDescriptor,xa=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?va(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&ya(e,i,a),a};const wa="script.smartnest_panic";let $a=class extends ct{constructor(){super(...arguments),this.holding=!1,this.fired=!1}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this.timer)}start(t){this.ctx.editing||(t.currentTarget.setPointerCapture(t.pointerId),this.holding=!0,ki("press"),this.timer=window.setTimeout((()=>this.fire()),2e3))}cancel(){window.clearTimeout(this.timer),this.holding=!1}fire(){this.holding=!1,this.fired=!0,navigator.vibrate?.([200,80,200]),this.ctx.hass.callService("script","turn_on",{entity_id:wa}).then((()=>this.ctx.toast(this.ctx.t("panic_sent")))).catch((()=>this.ctx.toast(this.ctx.t("error")))),window.setTimeout((()=>this.fired=!1),4e3)}render(){const{ctx:t}=this;return t.hass.states[wa]?B`<div class="card glass">
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
    </div>`:t.isAdmin?B`<div class="card glass"><span class="hint">${t.t("panic_missing")}</span></div>`:U}};$a.styles=[fi,r`
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
    `],xa([gt({attribute:!1})],$a.prototype,"ctx",2),xa([gt({attribute:!1})],$a.prototype,"widget",2),xa([mt()],$a.prototype,"holding",2),xa([mt()],$a.prototype,"fired",2),$a=xa([pt("sn-w-panic")],$a);var ka=Object.defineProperty,Ca=Object.getOwnPropertyDescriptor,Ma=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Ca(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&ka(e,i,a),a};const Ha=/stove|oven|iron|heater|kettle|hob|غاز|فرن|مكوى|مكواة|سخان|غلاية|תנור|מגהץ|קומקום/i;let Aa=class extends ct{checks(){const{hass:t,config:e}=this.ctx,i=Rs(e).filter((e=>t.states[e])),s=i.length?i:Object.keys(t.states),n=e=>t.states[e],a=t=>s.filter((e=>t(n(e)))),o=(e,i,s,n={})=>t.callService(e,i,{entity_id:s,...n}),r=[],l=a((t=>"lock"===ee(t.entity_id)&&"locked"!==t.state));r.push({key:"check_locks",icon:"lock",bad:l,fix:l.length?()=>o("lock","lock",l):void 0});const c=a((t=>"binary_sensor"===ee(t.entity_id)&&"on"===t.state&&["door","window","opening","garage_door"].includes(t.attributes.device_class)||"cover"===ee(t.entity_id)&&"open"===t.state&&["garage","gate","door"].includes(t.attributes.device_class))),d=c.filter((t=>"cover"===ee(t)));r.push({key:"check_open",icon:"door-closed",bad:c,fix:d.length?()=>o("cover","close_cover",d):void 0});const p=a((t=>"light"===ee(t.entity_id)&&"on"===t.state));r.push({key:"check_lights",icon:"lightbulb-outline",bad:p,fix:p.length?()=>o("light","turn_off",p):void 0});const h=Object.keys(t.states).filter((t=>"alarm_control_panel"===ee(t)));if(h.length){const t=h.filter((t=>"disarmed"===n(t).state));r.push({key:"check_alarm",icon:"shield-home",bad:t,fix:t.length?()=>n(t[0]).attributes.code_arm_required?Promise.resolve(this.ctx.openEntity(t[0])):o("alarm_control_panel","alarm_arm_night",t):void 0})}const u=Object.keys(t.states).filter((t=>"switch"===ee(t)&&"on"===n(t).state&&Ha.test(`${t} ${n(t).attributes.friendly_name??""}`)));return(u.length||Object.keys(t.states).some((t=>"switch"===ee(t)&&Ha.test(`${t} ${n(t).attributes.friendly_name??""}`))))&&r.push({key:"check_appliances",icon:"power-plug-off",bad:u,fix:u.length?()=>o("switch","turn_off",u):void 0}),r}fixAll(t){ki("press"),Promise.all(t.filter((t=>t.bad.length&&t.fix)).map((t=>t.fix()))).catch((()=>this.ctx.toast(this.ctx.t("error"))))}render(){const{ctx:t}=this,{t:e,hass:i,config:s}=t,n=this.checks(),a=n.filter((t=>t.bad.length)),o=a.filter((t=>t.fix));return B`<div class="card glass">
      <div class="head">
        <sn-icon class=${a.length?"bad":"ok"} icon=${a.length?"alert-circle-outline":"check-circle"}></sn-icon>
        ${a.length?e("check_n",{n:a.length}):e("check_ok")}
      </div>
      ${n.map(((n,a)=>B`<div class="row" style="animation-delay:${40*a}ms">
          <sn-icon class=${n.bad.length?"warn":"good"} icon=${n.bad.length?n.icon:"check-circle"}></sn-icon>
          <span class="txt">
            <span>${e(n.key)}</span>
            ${n.bad.length?B`<span class="who">${n.bad.map((t=>ie(i,s,t))).join("ar"===t.lang?"، ":", ")}</span>`:U}
          </span>
          ${n.bad.length&&n.fix?B`<button class="btn pressable" @click=${()=>n.fix().catch((()=>t.toast(e("error"))))}>${e("check_fix")}</button>`:U}
        </div>`))}
      ${o.length>1?B`<button class="btn primary pressable" @click=${()=>this.fixAll(n)}>${e("check_fix_all")}</button>`:U}
    </div>`}};Aa.styles=[fi,r`
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
    `],Ma([gt({attribute:!1})],Aa.prototype,"ctx",2),Ma([gt({attribute:!1})],Aa.prototype,"widget",2),Aa=Ma([pt("sn-w-check")],Aa);var La=Object.defineProperty,Va=Object.getOwnPropertyDescriptor,Sa=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Va(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&La(e,i,a),a};let za=class extends ct{connectedCallback(){super.connectedCallback(),function(){try{const t=new AudioContext,e=t.createOscillator(),i=t.createGain();e.frequency.value=880,i.gain.setValueAtTime(1e-4,t.currentTime),i.gain.exponentialRampToValueAtTime(.25,t.currentTime+.02),i.gain.exponentialRampToValueAtTime(1e-4,t.currentTime+.8),e.connect(i).connect(t.destination),e.start(),e.stop(t.currentTime+.9),window.setTimeout((()=>t.close()),1200)}catch{}}(),navigator.vibrate?.([80,60,80])}render(){const{ctx:t,msg:e}=this;return B`<div class="scrim">
      <div class="card" role="alertdialog" aria-label=${e.title??""}>
        <span class="ic"><sn-icon .icon=${e.icon&&["pill","bell","message"].includes(e.icon)?e.icon:"message"}></sn-icon></span>
        ${e.title?B`<span class="from">${t.t("message_from",{name:e.title})}</span>`:U}
        <div class="text">${e.message}</div>
        <button class="btn primary pressable" @click=${()=>t.hass.callWS({type:"smartnest/message/ack",id:e.id}).catch((()=>{}))}>
          ${e.ack||t.t("got_it")}
        </button>
      </div>
    </div>`}};za.styles=[fi,r`
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
    `],Sa([gt({attribute:!1})],za.prototype,"ctx",2),Sa([gt({attribute:!1})],za.prototype,"msg",2),za=Sa([pt("sn-message")],za);var Da=Object.defineProperty,Oa=Object.getOwnPropertyDescriptor,Ta=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Oa(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&Da(e,i,a),a};let ja=class extends ct{render(){const{ctx:t}=this,{hass:e,t:i}=t,s=Object.values(e.states).filter((t=>t.entity_id.startsWith("person.")));return B`<div class="card glass" data-no-swipe>
      ${s.map(((s,n)=>{const a="home"===s.state,o=ie(e,t.config,s.entity_id),r=s.attributes.entity_picture,l=a?i("at_home"):"not_home"===s.state?i("away_l"):s.state;return B`<div class="p ${a?"home":"away"}" style="animation-delay:${50*n}ms">
          <div class="av" style=${r?`background-image:url('${e.hassUrl(r)}')`:""}>${r?"":o.slice(0,1)}</div>
          <span class="name">${o}</span>
          <span class="where">${l} · ${_e(i,s.last_changed)}</span>
        </div>`}))}
      ${t.allows("messages")?B`<button class="p pressable" style="align-self:center" aria-label=${i("send_message")} @click=${()=>function(t){t.showSheet({title:t.t("send_message"),render:t=>B`<form
      style="display:grid;gap:12px"
      @submit=${e=>{e.preventDefault();const i=e.currentTarget,s=i.querySelector("input[type=text]"),n=i.querySelector("input[name=speak]")?.checked,a=s.value.trim();if(a){if(n){const e=Object.keys(t.hass.states).filter((t=>t.startsWith("tts."))),i=e.find((t=>t.includes("google")))??e[0];i&&t.hass.callService("tts","speak",{entity_id:i,media_player_entity_id:t.config.settings.speakers,message:a,language:t.lang}).catch((()=>t.toast(t.t("error"))))}t.hass.callWS({type:"smartnest/message/send",message:a}).then((()=>t.closeSheet())).catch((()=>t.toast(t.t("error"))))}}}
    >
      <input type="text" maxlength="500" placeholder=${t.t("message_placeholder")} autofocus />
      ${t.allows("broadcast")&&t.config.settings.speakers.length?B`<label style="display:flex;gap:8px;align-items:center;font-size:15px">
            <input name="speak" type="checkbox" style="width:auto;min-height:auto" /><sn-icon icon="bullhorn" style="--icon-size:20px"></sn-icon>${t.t("announce")}
          </label>`:U}
      <button class="btn primary pressable" type="submit"><sn-icon icon="send" style="--icon-size:20px"></sn-icon>${t.t("send")}</button>
    </form>`})}(t)}>
            <span class="av" style="background:var(--accent);color:var(--on-accent);--icon-size:24px"><sn-icon icon="message"></sn-icon></span>
            <span class="name">${i("send")}</span>
          </button>`:""}
    </div>`}};ja.styles=[fi,r`
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
    `],Ta([gt({attribute:!1})],ja.prototype,"ctx",2),Ta([gt({attribute:!1})],ja.prototype,"widget",2),ja=Ta([pt("sn-w-family")],ja);var Pa=Object.defineProperty,Ia=Object.getOwnPropertyDescriptor,Ea=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Ia(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&Pa(e,i,a),a};let Na=class extends ct{constructor(){super(...arguments),this.items=[]}get entity(){return this.widget.config.entity??Object.keys(this.ctx.hass.states).find((t=>t.startsWith("todo.")))}connectedCallback(){super.connectedCallback();const t=this.entity;t&&(this.unsub=this.ctx.hass.connection.subscribeMessage((t=>this.items=t.items??[]),{type:"todo/item/subscribe",entity_id:t}))}disconnectedCallback(){super.disconnectedCallback(),this.unsub?.then((t=>t())).catch((()=>{}))}add(t){t.preventDefault();const e=t.currentTarget.querySelector("input"),i=e.value.trim();i&&this.entity&&(e.value="",this.ctx.hass.callService("todo","add_item",{entity_id:this.entity,item:i}).catch((()=>this.ctx.toast(this.ctx.t("error")))))}toggle(t){ki("tap"),this.ctx.hass.callService("todo","update_item",{entity_id:this.entity,item:t.uid,status:"completed"===t.status?"needs_action":"completed"}).catch((()=>this.ctx.toast(this.ctx.t("error"))))}render(){const{ctx:t}=this,e=this.entity,i=this.items.filter((t=>"completed"!==t.status)),s=this.items.filter((t=>"completed"===t.status)).slice(0,5);return B`<div class="card glass">
      <h3><sn-icon icon="todo"></sn-icon>${e?ie(t.hass,t.config,e):t.t("widget_todo")}</h3>
      ${e?B`<form @submit=${this.add}>
            <input type="text" placeholder=${t.t("add_placeholder")} />
            <button class="icon-btn primary pressable" type="submit" aria-label=${t.t("add")}><sn-icon icon="plus" style="--icon-size:20px"></sn-icon></button>
          </form>`:U}
      <ul>
        ${Ht([...i,...s],(t=>t.uid),(t=>B`<li class=${"completed"===t.status?"done":""}>
            <button class="pressable" @click=${()=>this.toggle(t)}>
              <sn-icon icon=${"completed"===t.status?"circle-check":"circle-outline"}></sn-icon><span>${t.summary}</span>
            </button>
          </li>`))}
        ${this.items.length?U:B`<li class="empty">${t.t("todo_empty")}</li>`}
      </ul>
    </div>`}};Na.styles=[fi,r`
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
    `],Ea([gt({attribute:!1})],Na.prototype,"ctx",2),Ea([gt({attribute:!1})],Na.prototype,"widget",2),Ea([mt()],Na.prototype,"items",2),Na=Ea([pt("sn-w-todo")],Na);var Wa=Object.defineProperty,Ra=Object.getOwnPropertyDescriptor,Fa=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Ra(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&Wa(e,i,a),a};const Ba=["#E9971D","#18BCF2","#2FB57A","#F26B68","#A78BFA"];let Za=class extends ct{connectedCallback(){super.connectedCallback(),this.load(),this.timer=window.setInterval((()=>this.load()),9e5)}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this.timer)}get calendars(){const t=this.widget.config.entities;return t?.length?t:Object.keys(this.ctx.hass.states).filter((t=>t.startsWith("calendar.")))}async load(){const t=new Date;t.setHours(0,0,0,0);const e=new Date(t.getTime()+6048e5),i=[];await Promise.all(this.calendars.map((async s=>{try{const n=await this.ctx.hass.fetchWithAuth(`/api/calendars/${s}?start=${encodeURIComponent(t.toISOString())}&end=${encodeURIComponent(e.toISOString())}`);if(!n.ok)return;for(const t of await n.json()){const e=!t.start.dateTime;i.push({summary:t.summary,start:new Date(t.start.dateTime??`${t.start.date}T00:00:00`),allDay:e,cal:s})}}catch{}}))),this.events=i.filter((t=>t.allDay||t.start.getTime()>Date.now()-36e5)).sort(((t,e)=>t.start.getTime()-e.start.getTime())).slice(0,20)}render(){const{ctx:t}=this,e=Ot[t.lang],i=this.calendars;let s="";return B`<div class="card glass">
      <h3><sn-icon icon="calendar"></sn-icon>${t.t("widget_calendar")}</h3>
      <div class="list">
        ${this.events&&!this.events.length?B`<span class="empty">${t.t("no_events")}</span>`:U}
        ${(this.events??[]).map(((n,a)=>{const o=(i=>{const s=new Date,n=new Date(s.getTime()+864e5);return i.toDateString()===s.toDateString()?t.t("today"):i.toDateString()===n.toDateString()?t.t("tomorrow"):i.toLocaleDateString(e,{weekday:"long",day:"numeric",month:"short"})})(n.start),r=o!==s?B`<span class="day">${o}</span>`:U;return s=o,B`${r}<div class="ev" style="animation-delay:${30*Math.min(a,10)}ms">
              <i style="background:${Ba[i.indexOf(n.cal)%Ba.length]}"></i><span>${n.summary}</span>
              <span class="when">${n.allDay?t.t("all_day"):n.start.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}</span>
            </div>`}))}
      </div>
    </div>`}};Za.styles=[fi,r`
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
    `],Fa([gt({attribute:!1})],Za.prototype,"ctx",2),Fa([gt({attribute:!1})],Za.prototype,"widget",2),Fa([mt()],Za.prototype,"events",2),Za=Fa([pt("sn-w-calendar")],Za);var qa=Object.defineProperty,Ua=Object.getOwnPropertyDescriptor,Ya=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Ua(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&qa(e,i,a),a};let Xa=class extends ct{constructor(){super(...arguments),this.days=[]}connectedCallback(){super.connectedCallback(),this.load(),this.timer=window.setInterval((()=>this.load()),36e5)}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this.timer)}async load(){const t=this.ctx.config.settings.weather.entity;if(t&&this.ctx.hass.states[t])try{const e=await this.ctx.hass.callWS({type:"call_service",domain:"weather",service:"get_forecasts",target:{entity_id:t},service_data:{type:"daily"},return_response:!0});this.days=(e.response?.[t]?.forecast??[]).slice(0,7)}catch{this.days=[]}}render(){const{ctx:t}=this,e=Ot[t.lang],i=this.days.map((t=>t.temperature??0)),s=this.days.map((t=>t.templow??t.temperature??0)),n=Math.max(...i,1),a=Math.min(...s,0),o=e=>"number"==typeof e?ue(`${ge(e,t.lang,0)}°`):"–";return B`<div class="card glass" data-no-swipe>
      ${this.days.map(((i,s)=>{const r=new Date(i.datetime),l=i.templow??i.temperature??0,c=i.temperature??l,d=(l-a)/(n-a||1)*100,p=100-(c-a)/(n-a||1)*100;return B`<div class="d ${0===s?"today":""}" style="animation-delay:${40*s}ms">
          <span>${0===s?t.t("today"):r.toLocaleDateString(e,{weekday:"short"})}</span>
          <sn-icon .icon=${In(i.condition)}></sn-icon>
          <span class="hi">${o(i.temperature)}</span>
          <div class="range"><span style="bottom:${d}%;top:${p}%"></span></div>
          <span class="lo">${o(i.templow)}</span>
        </div>`}))}
    </div>`}};Xa.styles=[fi,r`
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
    `],Ya([gt({attribute:!1})],Xa.prototype,"ctx",2),Ya([gt({attribute:!1})],Xa.prototype,"widget",2),Ya([mt()],Xa.prototype,"days",2),Xa=Ya([pt("sn-w-forecast")],Xa);var Ka=Object.defineProperty,Ga=Object.getOwnPropertyDescriptor,Ja=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Ga(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&Ka(e,i,a),a};const Qa=864e5,to=t=>new Date(t.getFullYear(),t.getMonth(),t.getDate());let eo=class extends ct{render(){const{ctx:t}=this,e=Ot[t.lang],i=to(new Date),s=[...(this.widget.config.events??[]).map((t=>{let e=new Date(`${t.date}T00:00:00`);if(!1!==t.yearly)for(;e<i;)e=new Date(e.getFullYear()+1,e.getMonth(),e.getDate());return{title:t.title,date:e,icon:"calendar"}})).filter((t=>t.date>=i)),...this.widget.config.islamic??"ar"===t.lang?function(t){const e=[[9,1,"next_ramadan","night"],[10,1,"next_eid","palette"],[12,10,"next_adha","palette"]],i=[],s=to(new Date);for(let n=0;n<400&&i.length<e.length;n++){const a=new Date(s.getTime()+n*Qa),o=qn(a),r=o&&e.find((([t,e])=>o.month===t&&o.day===e));r&&!i.some((e=>e.title===t(r[2])))&&i.push({title:t(r[2]),date:a,icon:r[3]})}return i}(t.t):[]].sort(((t,e)=>t.date.getTime()-e.date.getTime())).slice(0,5);return B`<div class="card glass">
      <h3><sn-icon icon="countdown"></sn-icon>${t.t("widget_countdown")}</h3>
      ${s.map(((s,n)=>{const a=Math.round((s.date.getTime()-i.getTime())/Qa);return B`<div class="row" style="animation-delay:${50*n}ms">
          <span class="n ${0===a?"now":""}">${0===a?"🎉":a}${a?B`<small>${t.t("days_left",{n:""}).trim()}</small>`:U}</span>
          <span class="t">${s.title}<span>${0===a?t.t("today_event"):s.date.toLocaleDateString(e,{weekday:"long",day:"numeric",month:"long"})}</span></span>
        </div>`}))}
    </div>`}};eo.styles=[fi,r`
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
    `],Ja([gt({attribute:!1})],eo.prototype,"ctx",2),Ja([gt({attribute:!1})],eo.prototype,"widget",2),eo=Ja([pt("sn-w-countdown")],eo);var io=Object.defineProperty,so=Object.getOwnPropertyDescriptor,no=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?so(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&io(e,i,a),a};let ao=class extends ct{render(){const{ctx:t}=this,e=this.widget.config,i=e.entity?t.hass.states[e.entity]:void 0,s=Number(e.min??0),n=Number(e.max??100),a=Number(i?.state),o=Number.isNaN(a)?0:Math.min(1,Math.max(0,(a-s)/(n-s||1))),r=Number(e.low??20)/100,l=o<=r?"var(--alert)":o<=2*r?"var(--accent)":"var(--success)",c=e.entity?ie(t.hass,t.config,e.entity):t.t("widget_gauge"),d=/gas|غاز|lpg|propane/i.test(`${e.entity} ${c}`)?"gas":/water|tank|مي|ماء|خزان|מים/i.test(`${e.entity} ${c}`)?"pump":"gauge",p=2*Math.PI*42*.75,h=i?.attributes.unit_of_measurement??"";return B`<div class="card glass">
      <div class="dial">
        <svg viewBox="0 0 100 100" aria-hidden="true">
          ${Z`<circle class="track" cx="50" cy="50" r="42" stroke-dasharray="${p} 999" transform="rotate(135 50 50)"></circle>
          <circle class="val" cx="50" cy="50" r="42" stroke=${l} stroke-dasharray="${p} 999" stroke-dashoffset=${p*(1-o)} transform="rotate(135 50 50)"></circle>`}
        </svg>
        <div class="mid">
          <sn-icon .icon=${d} style="color:${l}"></sn-icon>
          <span class="n"><sn-num .value=${Number.isNaN(a)?"–":`${ge(a,t.lang,0)}${"%"===h?"%":""}`}></sn-num></span>
          ${o<=r&&!Number.isNaN(a)?B`<span class="low">${t.t("gauge_low")}</span>`:""}
        </div>
      </div>
      <span class="name">${c}</span>
      ${e.supplier&&o<=r&&!Number.isNaN(a)&&t.allows("refill")?B`<a
            class="btn primary pressable"
            style="min-height:34px;font-size:13px;text-decoration:none"
            target="_blank"
            rel="noopener"
            href=${`https://wa.me/${String(e.supplier).replace(/\D/g,"")}?text=${encodeURIComponent(t.t("refill_message",{what:c,home:t.config.settings.home_name||t.hass.config?.location_name||""}))}`}
            >${t.t("refill_order")}</a
          >`:""}
    </div>`}};ao.styles=[fi,r`
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
    `],no([gt({attribute:!1})],ao.prototype,"ctx",2),no([gt({attribute:!1})],ao.prototype,"widget",2),ao=no([pt("sn-w-gauge")],ao);var oo=Object.defineProperty,ro=Object.getOwnPropertyDescriptor,lo=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?ro(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&oo(e,i,a),a};let co=class extends ct{constructor(){super(...arguments),this.holding=!1,this.bust=Date.now(),this.seen=!0}connectedCallback(){super.connectedCallback(),this.timer=window.setInterval((()=>this.seen&&(this.bust=Date.now())),5e3),this.stopVis=ps(this,(t=>this.seen=t))}disconnectedCallback(){super.disconnectedCallback(),this.stopVis?.(),window.clearInterval(this.timer),window.clearTimeout(this.hold)}start(t,e){this.ctx.editing||(t.currentTarget.setPointerCapture(t.pointerId),this.holding=!0,this.hold=window.setTimeout((()=>{this.holding=!1,navigator.vibrate?.(20),this.ctx.hass.callService("cover",e?"open_cover":"close_cover",{entity_id:this.widget.config.entity}).catch((()=>this.ctx.toast(this.ctx.t("error"))))}),1e3))}stop(){window.clearTimeout(this.hold),this.holding=!1}render(){const{ctx:t}=this,e=this.widget.config,i=e.entity?t.hass.states[e.entity]:void 0,s=e.camera?Ln(t.hass,e.camera,this.bust):void 0,n="open"===i?.state||"opening"===i?.state;return B`<div class="card glass">
      <div class="cam" style=${s?`background-image:url('${s}')`:""} @click=${()=>e.camera&&t.openEntity(e.camera)}>
        ${e.camera?B`<span>${ie(t.hass,t.config,e.camera)}</span>`:U}
      </div>
      <div class="bar">
        <sn-icon icon=${n?"gate-open":"gate"}></sn-icon>
        <span class="txt"><b>${i?ie(t.hass,t.config,i.entity_id):t.t("widget_gate")}</b><span>${fe(t.t,i,t.lang)}</span></span>
        ${i?B`<button
              class="btn ${n?"":"primary"} go ${this.holding?"holding":""}"
              @pointerdown=${t=>this.start(t,!n)}
              @pointerup=${()=>this.stop()}
              @pointercancel=${()=>this.stop()}
              @contextmenu=${t=>t.preventDefault()}
            >
              <span>${t.t(n?"gate_hold_close":"gate_hold")}</span>
            </button>`:U}
      </div>
    </div>`}};co.styles=[fi,r`
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
    `],lo([gt({attribute:!1})],co.prototype,"ctx",2),lo([gt({attribute:!1})],co.prototype,"widget",2),lo([mt()],co.prototype,"holding",2),lo([mt()],co.prototype,"bust",2),co=lo([pt("sn-w-gate")],co);var po=Object.defineProperty,ho=Object.getOwnPropertyDescriptor,uo=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?ho(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&po(e,i,a),a};const go={person:["person_l","person"],car:["car_l","car"],dog:["dog_l","dog"],cat:["cat_l","cat"],package:["package_l","package"]};let mo=class extends ct{constructor(){super(...arguments),this.missing=!1,this.seen=!0}get instance(){return this.widget.config.instance||"frigate"}connectedCallback(){super.connectedCallback(),this.load(),this.timer=window.setInterval((()=>this.seen&&this.load()),3e4),this.stopVis=ps(this,(t=>this.seen=t))}disconnectedCallback(){super.disconnectedCallback(),this.stopVis?.(),window.clearInterval(this.timer)}async load(){try{const t=await this.ctx.hass.callWS({type:"frigate/events/get",instance_id:this.instance,cameras:this.widget.config.cameras?.length?this.widget.config.cameras:void 0,limit:20,has_snapshot:!0});this.events="string"==typeof t?JSON.parse(t):t,this.missing=!1}catch{this.missing=!0}}img(t,e){return this.ctx.hass.hassUrl(`/api/frigate/${this.instance}/notifications/${t}/${e}`)}who(t){const e=t.sub_label;if(e)return Array.isArray(e)?e[0]:e}open(t){const e=Ot[this.ctx.lang];this.ctx.showSheet({title:`${this.who(t)??this.ctx.t(go[t.label]?.[0]??"person_l")} · ${new Date(1e3*t.start_time).toLocaleString(e,{weekday:"short",hour:"2-digit",minute:"2-digit"})}`,render:()=>t.has_clip?B`<video src=${this.img(t.id,"clip.mp4")} controls autoplay muted playsinline style="width:100%;border-radius:var(--r-md)"></video>`:B`<img src=${this.img(t.id,"snapshot.jpg")} alt="" style="width:100%;border-radius:var(--r-md)" />`})}render(){const{ctx:t}=this,{t:e}=t;return B`<div class="card glass">
      <h3><sn-icon icon="cctv"></sn-icon>${e("widget_frigate")}</h3>
      ${t.allows("ai_cameras")&&!this.missing?B`<sn-ai-ask-button .ctx=${t} label=${e("ai_cam_btn")} .run=${()=>async function(t,e="frigate"){const i=new Date;i.setHours(0,0,0,0);let s=[];try{const n=await t.hass.callWS({type:"frigate/events/get",instance_id:e,after:Math.floor(i.getTime()/1e3),limit:120});s="string"==typeof n?JSON.parse(n):n}catch{return}return s.length?Cs(t,"cameras",{facts:s.sort(((t,e)=>t.start_time-e.start_time)).map((t=>{const e=Array.isArray(t.sub_label)?t.sub_label[0]:t.sub_label;return`${new Date(1e3*t.start_time).toTimeString().slice(0,5)} ${t.camera}: ${t.label}${e?` (${e})`:""}${t.zones?.length?` in ${t.zones.join("/")}`:""}`}))}):t.t("ai_cam_quiet")}(t,this.instance)}></sn-ai-ask-button>`:""}
      ${this.missing?B`<span class="muted">${e("frigate_missing")}</span>`:B`<div class="strip" data-no-swipe>
            ${(this.events??[]).map(((t,i)=>{const[s,n]=go[t.label]??["person_l","eye"],a=this.who(t);return B`<button class="ev pressable" style="background-image:url('${this.img(t.id,"thumbnail.jpg")}');animation-delay:${40*Math.min(i,8)}ms" @click=${()=>this.open(t)}>
                <span class="tag ${a?"who":""}"><sn-icon .icon=${n}></sn-icon>${a??e(s)}</span>
                <span class="when">${_e(e,new Date(1e3*t.start_time).toISOString())}</span>
              </button>`}))}
            ${this.events&&!this.events.length?B`<span class="muted">${e("no_visitors")}</span>`:U}
          </div>`}
    </div>`}};mo.styles=[fi,r`
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
    `],uo([gt({attribute:!1})],mo.prototype,"ctx",2),uo([gt({attribute:!1})],mo.prototype,"widget",2),uo([mt()],mo.prototype,"events",2),uo([mt()],mo.prototype,"missing",2),mo=uo([pt("sn-w-frigate")],mo);const fo=["light","switch","fan","cover","climate","media_player"],bo="smartnest-habits-dismissed",_o=(t,e)=>"cover"===t?"open"===e:"climate"===t?"off"!==e:"media_player"===t&&"playing"===e||"on"===e;function yo(){try{return JSON.parse(localStorage.getItem(bo)??"[]")}catch{return[]}}const vo=t=>`${t.entity}|${t.kind}|${t.at.slice(0,2)}`;var xo=Object.defineProperty,wo=Object.getOwnPropertyDescriptor,$o=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?wo(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&xo(e,i,a),a};const ko=["sun","mon","tue","wed","thu","fri","sat"],Co=["light","switch","fan","input_boolean","media_player","climate","cover","humidifier","siren","scene","script"];function Mo(t,e,i="short"){return new Date(2023,0,1+ko.indexOf(t)).toLocaleDateString(e,{weekday:i})}function Ho(t,e,i){const s=ee(e),n=t.states[e]?.attributes.device_class;return"lock"===s?[["locked",i("locked")],["unlocked",i("unlocked")]]:"cover"===s?[["open",i("open")],["closed",i("closed")]]:"person"===s?[["home",i("at_home")],["not_home",i("away_l")]]:"climate"===s?[["off",i("off")],["cool",i("cool")],["heat",i("heat")]]:"alarm_control_panel"===s?[["disarmed",i("disarmed")],["armed_away",i("armed_away")],["triggered",i("triggered")]]:"binary_sensor"===s&&["motion","occupancy","presence"].includes(n)?[["on",i("motion")],["off",i("clear")]]:"binary_sensor"===s&&["door","window","opening","garage_door"].includes(n)?[["on",i("open")],["off",i("closed")]]:[["on",i("on")],["off",i("off")]]}const Ao=t=>5===t.length?`${t}:00`:t;function Lo(t){const e=t.trigger,i="time"===e.kind?{platform:"time",at:Ao(e.at)}:"sun"===e.kind?{platform:"sun",event:e.event,...e.offset?{offset:(s=e.offset,`${s<0?"-":"+"}${String(Math.floor(Math.abs(s)/60)).padStart(2,"0")}:${String(Math.abs(s)%60).padStart(2,"0")}:00`)}:{}}:"state"===e.kind?{platform:"state",entity_id:e.entity,to:e.to}:{platform:"state",entity_id:"input_select.house_mode",to:e.mode};var s;const n=[];t.days.length&&t.days.length<7&&n.push({condition:"time",weekday:t.days}),t.window&&n.push({condition:"time",after:Ao(t.window.after),before:Ao(t.window.before)});const a=t.actions.map((t=>{if("mode"===t.kind)return{service:"script.turn_on",target:{entity_id:`script.smartnest_mode_${t.mode}`}};if("message"===t.kind)return{service:"smartnest.show_message",data:{message:t.text}};const e=ee(t.entity);return"scene"===e||"script"===e?{service:`${e}.turn_on`,target:{entity_id:t.entity}}:{service:`homeassistant.turn_${t.kind}`,target:{entity_id:t.entity}}}));return{id:t.id,alias:`SmartNest · ${t.name}`,description:"Made in the SmartNest dashboard",mode:"single",trigger:[i],condition:n,action:a}}function Vo(t,e,i,s,n){const a=t=>n[t]||e.states[t]?.attributes.friendly_name||t,o=t.trigger,r="time"===o.kind?o.at:"sun"===o.kind?`${i(o.event)}${o.offset?` ${o.offset>0?"+":"−"}${Math.abs(o.offset)}′`:""}`:"state"===o.kind?`${a(o.entity)} → ${Ho(e,o.entity,i).find((([t])=>t===o.to))?.[1]??o.to}`:`${i("widget_modes")} → ${i(Vs.find((t=>t.id===o.mode))?.label??"mode_home")}`;return`${t.days.length&&7!==t.days.length?t.days.map((t=>Mo(t,s))).join(" "):i("every_day")} · ${r} → ${t.actions.map((t=>"mode"===t.kind?i(Vs.find((e=>e.id===t.mode))?.label??"mode_home"):"message"===t.kind?`💬 ${t.text}`:`${i("on"===t.kind?"act_on":"act_off")} ${a(t.entity)}`)).join("ar"===s?"، ":", ")}`}async function So(t){try{return(await t.callWS({type:"smartnest/automations/get"})).items}catch{return[]}}const zo=(t,e)=>Object.values(t.states).find((t=>t.entity_id.startsWith("automation.")&&t.attributes.id===e));function Do(t){t.showSheet({title:t.t("automations"),render:t=>B`<sn-auto-list .ctx=${t}></sn-auto-list>`})}function Oo(t,e,i){t.showSheet({title:e?e.name:t.t("new_automation"),render:t=>B`<sn-auto-builder .ctx=${t} .initial=${e} .onSaved=${i}></sn-auto-builder>`})}let To=class extends ct{constructor(){super(...arguments),this.thinking=!1}connectedCallback(){super.connectedCallback(),this.load()}async load(){this.items=await So(this.ctx.hass),this.ctx.allows("habits")&&async function(t,e){const{hass:i,config:s,t:n}=t,a=Rs(s).filter((t=>{const e=i.entities?.[t];return fo.includes(ee(t))&&i.states[t]&&"fully_kiosk"!==e?.platform&&!e?.entity_category})).slice(0,40);if(!a.length)return[];const o=new Date,r=new Date(o.getTime()-12096e5);let l;try{l=await i.callWS({type:"history/history_during_period",start_time:r.toISOString(),end_time:o.toISOString(),entity_ids:a,minimal_response:!0,no_attributes:!0,significant_changes_only:!1})}catch{return[]}const c=new Set(e.flatMap((t=>t.actions.map((t=>"entity"in t?t.entity:""))))),d=new Set(yo()),p=[];for(const h of a){if(c.has(h))continue;const t=ee(h),e=l[h]??[];for(const a of["on","off"]){const o=new Map;let r;for(const i of e){const e=_o(t,i.s);if("unavailable"!==i.s&&"unknown"!==i.s){if(void 0!==r&&e!==r&&"on"===a===e){const t=new Date(1e3*i.lu),e=t.toDateString();o.set(e,[...o.get(e)??[],60*t.getHours()+t.getMinutes()])}r=e}}if(o.size<5)continue;const l=[...o.values()].flat();let c={center:0,days:0};for(const t of l){const e=[...o.values()].filter((e=>e.some((e=>Math.abs(e-t)<=20)))).length;e>c.days&&(c={center:t,days:e})}if(c.days<5)continue;const u=l.filter((t=>Math.abs(t-c.center)<=20)).sort(((t,e)=>t-e)),g=5*Math.round(u[Math.floor(u.length/2)]/5),m=`${String(Math.floor(g/60)%24).padStart(2,"0")}:${String(g%60).padStart(2,"0")}`,f=vo({entity:h,kind:a,at:m});if(d.has(f))continue;const b=ie(i,s,h);p.push({entity:h,kind:a,at:m,days:c.days,model:{id:Ie(),name:`${b} · ${n("on"===a?"on":"off")} ${m}`,trigger:{kind:"time",at:m},days:[],actions:[{kind:a,entity:h}]}})}}return p.sort(((t,e)=>e.days-t.days)).slice(0,6)}(this.ctx,this.items).then((t=>this.habits=t))}renderHabits(){const{ctx:t}=this,{t:e}=t;return this.habits?.length?B`<h4 style="margin:10px 0 0;display:flex;gap:6px;align-items:center">
        <sn-icon icon="lightbulb-auto" style="--icon-size:20px;color:var(--accent-text)"></sn-icon>${e("habits_title")}
      </h4>
      ${this.habits.map((i=>B`<div class="row">
          <span class="txt"
            ><b>${Vo(i.model,t.hass,e,Ot[t.lang],t.config.names)}</b><span>${e("habits_seen",{n:i.days})}</span></span
          >
          <button class="btn primary pressable" @click=${()=>Oo(t,i.model,(()=>this.load()))}>${e("habits_make")}</button>
          <button
            class="icon-btn small pressable"
            aria-label=${e("dismiss")}
            @click=${()=>{!function(t){try{localStorage.setItem(bo,JSON.stringify([...yo(),t].slice(-100)))}catch{}}(vo(i)),this.habits=this.habits.filter((t=>t!==i))}}
          >
            <sn-icon icon="close" style="--icon-size:16px"></sn-icon>
          </button>
        </div>`))}`:U}render(){const{ctx:t}=this,{t:e,hass:i}=t;return B`<button class="btn primary pressable" @click=${()=>Oo(t,void 0,(()=>this.load()))}>
        <sn-icon icon="plus" style="--icon-size:20px"></sn-icon>${e("new_automation")}
      </button>
      ${ks(i)&&t.allows("ai_automation")?B`<form
            style="display:flex;gap:8px"
            @submit=${async i=>{i.preventDefault();const s=i.currentTarget.querySelector("input"),n=s.value.trim();if(!n)return;this.thinking=!0;const a=await async function(t,e){const{hass:i,config:s}=t,n=Rs(s).filter((t=>i.states[t])),a=Object.keys(i.states).filter((t=>t.startsWith("person.")||t.startsWith("alarm_control_panel."))),o=[...n,...a].slice(0,150).map((t=>`${t}: ${ie(i,s,t)}`)),r=Ms(await Cs(t,"automation",{ask:e,facts:o}),"{");if(!r?.trigger||!Array.isArray(r.actions)||!r.actions.length)return;const l=new Set([...n,...a]),c=r.actions.filter((t=>"message"===t.kind||("on"===t.kind||"off"===t.kind)&&l.has(t.entity)));return!c.length||r.trigger.entity&&!l.has(r.trigger.entity)?void 0:{id:Ie(),name:String(r.name??e).slice(0,60),trigger:r.trigger,days:Array.isArray(r.days)?r.days:[],...r.window&&r.window.after?{window:r.window}:{},actions:c}}(t,n);if(this.thinking=!1,!a)return t.toast(e("ai_auto_fail"));s.value="",Oo(t,a,(()=>this.load()))}}
          >
            <input type="text" style="flex:1" placeholder=${e("ai_auto_hint")} />
            <button class="btn pressable" type="submit" ?disabled=${this.thinking}>✨ ${this.thinking?"…":e("ai_do_it")}</button>
          </form>`:U}
      ${this.items&&!this.items.length?B`<p class="muted" style="margin:0">${e("auto_empty")}</p>`:U}
      ${(this.items??[]).map((s=>{const n=zo(i,s.id),a="on"===n?.state;return B`<div class="row">
          <sn-icon icon="automation" style="color:var(--accent-text)"></sn-icon>
          <span class="txt"><b>${s.name}</b><span>${Vo(s,i,e,Ot[t.lang],t.config.names)}</span></span>
          ${n?B`<div class="seg">
                ${[!0,!1].map((t=>B`<button aria-pressed=${a===t} @click=${()=>i.callService("automation",t?"turn_on":"turn_off",{entity_id:n.entity_id})}>${e(t?"on":"off")}</button>`))}
              </div>`:U}
          <button class="icon-btn small pressable" aria-label=${e("edit")} @click=${()=>Oo(t,s,(()=>this.load()))}><sn-icon icon="pencil" style="--icon-size:16px"></sn-icon></button>
          <button
            class="icon-btn small pressable"
            aria-label=${e("delete")}
            @click=${async()=>{confirm(e("delete_confirm"))&&(await async function(t,e){await t.fetchWithAuth(`/api/config/automation/config/${e}`,{method:"DELETE"}),await t.callWS({type:"smartnest/automations/set",items:(await So(t)).filter((t=>t.id!==e))})}(i,s.id).catch((()=>t.toast(e("error")))),this.load())}}
          >
            <sn-icon icon="delete" style="--icon-size:16px"></sn-icon>
          </button>
        </div>`}))}
      ${this.renderHabits()}`}};To.styles=[fi,r`
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
    `],$o([gt({attribute:!1})],To.prototype,"ctx",2),$o([mt()],To.prototype,"items",2),$o([mt()],To.prototype,"habits",2),$o([mt()],To.prototype,"thinking",2),To=$o([pt("sn-auto-list")],To);let jo=class extends ct{constructor(){super(...arguments),this.saving=!1}willUpdate(){this.m||(this.m=this.initial?structuredClone(this.initial):{id:`smartnest_${Ie()}`,name:"",trigger:{kind:"time",at:"07:00"},days:[],actions:[{kind:"on",entity:""}]})}set(t){const e=structuredClone(this.m);t(e),this.m=e}pickEntity(t,e){this.ctx.showSheet({title:this.ctx.t("choose_entity"),render:i=>B`<sn-entity-picker
        .ctx=${i}
        .filter=${t}
        .onPick=${t=>{e(t),i.closeSheet()}}
      ></sn-entity-picker>`})}entityBtn(t,e,i){const{ctx:s}=this,n=t?s.hass.states[t]:void 0;return B`<button class="btn pick pressable" @click=${()=>this.pickEntity(e,i)}>
      ${t?B`<sn-icon .icon=${oe(n,t)} style="--icon-size:20px"></sn-icon>${ie(s.hass,s.config,t)}`:B`<span class="muted">${s.t("choose_entity")}</span>`}
    </button>`}renderTrigger(){const{t:t,hass:e}=this.ctx,i=this.m.trigger;return B`<div class="box">
      <div class="seg">
        ${[["time","trig_time"],["sun","trig_sun"],["state","trig_state"],["mode","trig_mode"]].map((([e,s])=>B`<button
            aria-pressed=${i.kind===e}
            @click=${()=>this.set((t=>{t.trigger="time"===e?{kind:"time",at:"07:00"}:"sun"===e?{kind:"sun",event:"sunset",offset:0}:"state"===e?{kind:"state",entity:"",to:"on"}:{kind:"mode",mode:"away"}}))}
          >
            ${t(s)}
          </button>`))}
      </div>
      ${"time"===i.kind?B`<input type="time" .value=${i.at} @change=${t=>this.set((e=>e.trigger.at=t.target.value||"07:00"))} />`:"sun"===i.kind?B`<div class="row">
            <div class="seg">
              ${["sunrise","sunset"].map((e=>B`<button aria-pressed=${i.event===e} @click=${()=>this.set((t=>t.trigger.event=e))}>${t(e)}</button>`))}
            </div>
            <label class="field" style="flex:1">${t("offset_min")}<input type="number" step="5" .value=${String(i.offset)} @change=${t=>this.set((e=>e.trigger.offset=Number(t.target.value)||0))} /></label>
          </div>`:"state"===i.kind?B`<div class="row">
              ${this.entityBtn(i.entity,{},(i=>this.set((s=>{s.trigger={kind:"state",entity:i,to:Ho(e,i,t)[0][0]}}))))}
            </div>
            ${i.entity?B`<div class="row">
                  <span>${t("becomes")}</span>
                  <div class="seg">
                    ${Ho(e,i.entity,t).map((([t,e])=>B`<button aria-pressed=${i.to===t} @click=${()=>this.set((e=>e.trigger.to=t))}>${e}</button>`))}
                  </div>
                </div>`:U}`:B`<div class="seg">
            ${Vs.map((e=>B`<button aria-pressed=${i.mode===e.id} @click=${()=>this.set((t=>t.trigger.mode=e.id))}>${t(e.label)}</button>`))}
          </div>`}
    </div>`}renderDays(){const{t:t,lang:e}=this.ctx,i=Ot[e],s=!this.m.days.length;return B`<div class="box">
      <div class="row" style="justify-content:space-between">
        <b style="font-size:14px">${t("days")}</b>
        <button class="btn pressable" style="min-height:34px" @click=${()=>this.set((t=>t.days=[]))}>${t("every_day")}</button>
      </div>
      <div class="days">
        ${ko.map((t=>{const e=s||this.m.days.includes(t);return B`<button
            aria-pressed=${e}
            @click=${()=>this.set((i=>{const s=i.days.length?i.days:[...ko];i.days=e?s.filter((e=>e!==t)):[...s,t],7===i.days.length&&(i.days=[])}))}
          >
            ${Mo(t,i)}
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
        ${this.m.window?B`<input type="time" style="width:auto" .value=${this.m.window.after} @change=${t=>this.set((e=>e.window.after=t.target.value))} />
              <span>–</span>
              <input type="time" style="width:auto" .value=${this.m.window.before} @change=${t=>this.set((e=>e.window.before=t.target.value))} />`:U}
      </div>
    </div>`}renderActions(){const{t:t}=this.ctx;return B`<div class="box">
      ${this.m.actions.map(((e,i)=>B`<div style="display:grid;gap:8px;padding-bottom:10px;border-bottom:1px solid var(--border)">
          <div class="row">
            <div class="seg" style="flex:1">
              ${[["on","act_on"],["off","act_off"],["mode","act_mode"],["message","act_message"]].map((([s,n])=>B`<button
                  aria-pressed=${e.kind===s}
                  @click=${()=>this.set((t=>{const e=t.actions[i];t.actions[i]="mode"===s?{kind:"mode",mode:"sleep"}:"message"===s?{kind:"message",text:""}:{kind:s,entity:"entity"in e?e.entity:""}}))}
                >
                  ${t(n)}
                </button>`))}
            </div>
            ${this.m.actions.length>1?B`<button class="icon-btn small pressable" aria-label=${t("delete")} @click=${()=>this.set((t=>t.actions.splice(i,1)))}><sn-icon icon="close" style="--icon-size:16px"></sn-icon></button>`:U}
          </div>
          ${"on"===e.kind||"off"===e.kind?this.entityBtn(e.entity,{domains:Co},(t=>this.set((e=>e.actions[i].entity=t)))):"mode"===e.kind?B`<div class="seg">
                ${Vs.map((s=>B`<button aria-pressed=${e.mode===s.id} @click=${()=>this.set((t=>t.actions[i].mode=s.id))}>${t(s.label)}</button>`))}
              </div>`:B`<input type="text" placeholder=${t("message_placeholder")} .value=${e.text} @change=${t=>this.set((e=>e.actions[i].text=t.target.value))} />`}
        </div>`))}
      <button class="btn pressable" style="justify-self:start" @click=${()=>this.set((t=>t.actions.push({kind:"on",entity:""})))}>
        <sn-icon icon="plus" style="--icon-size:18px"></sn-icon>${t("add")}
      </button>
    </div>`}valid(){const t=this.m;return!("state"===t.trigger.kind&&!t.trigger.entity)&&(t.actions.length>0&&t.actions.every((t=>"on"===t.kind||"off"===t.kind?!!t.entity:"message"!==t.kind||!!t.text.trim())))}async save(){const{ctx:t}=this;if(!this.valid())return;const e=structuredClone(this.m);e.name.trim()||(e.name=Vo(e,t.hass,t.t,Ot[t.lang],t.config.names).split("→")[0].trim()),this.saving=!0;try{await async function(t,e){const i=await t.fetchWithAuth(`/api/config/automation/config/${e.id}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Lo(e))});if(!i.ok)throw new Error(`save ${i.status}`);const s=(await So(t)).filter((t=>t.id!==e.id));await t.callWS({type:"smartnest/automations/set",items:[...s,e]})}(t.hass,e),t.toast(t.t("auto_saved")),this.onSaved?.(),t.closeSheet()}catch{t.toast(t.t("save_failed"))}finally{this.saving=!1}}render(){const{ctx:t}=this,{t:e}=t;return B`<label class="field">${e("auto_name")}<input type="text" .value=${this.m.name} @change=${t=>this.set((e=>e.name=t.target.value.trim()))} /></label>
      <h4>${e("when")}</h4>
      ${this.renderTrigger()} ${this.renderDays()}
      <h4>${e("then")}</h4>
      ${this.renderActions()}
      <div class="preview">${Vo(this.m,t.hass,e,Ot[t.lang],t.config.names)}</div>
      <button class="btn primary pressable" ?disabled=${!this.valid()||this.saving} @click=${()=>this.save()}>${this.saving?e("saving"):e("save")}</button>`}};jo.styles=[fi,r`
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
    `],$o([gt({attribute:!1})],jo.prototype,"ctx",2),$o([gt({attribute:!1})],jo.prototype,"initial",2),$o([gt({attribute:!1})],jo.prototype,"onSaved",2),$o([mt()],jo.prototype,"m",2),$o([mt()],jo.prototype,"saving",2),jo=$o([pt("sn-auto-builder")],jo);var Po=Object.defineProperty,Io=Object.getOwnPropertyDescriptor,Eo=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Io(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&Po(e,i,a),a};let No=class extends ct{constructor(){super(...arguments),this.items=[]}connectedCallback(){super.connectedCallback(),this.load(),this.timer=window.setInterval((()=>this.load()),3e5)}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this.timer)}async load(){try{this.items=(await this.ctx.hass.callWS({type:"smartnest/automations/get"})).items}catch{this.items=[]}}hourOf(t){const e=t.trigger;if("time"===e.kind){const[t,i]=e.at.split(":").map(Number);return t+i/60}if("sun"===e.kind){const t=this.ctx.hass.states["sun.sun"]?.attributes,i="sunrise"===e.event?t?.next_rising:t?.next_setting,s=i?new Date(i):void 0;return((s?s.getHours()+s.getMinutes()/60:"sunrise"===e.event?6:18)+e.offset/60+24)%24}}render(){const{ctx:t}=this,e=Ot[t.lang],i=new Date,s=ko[i.getDay()],n=(i.getHours()+i.getMinutes()/60)/24*100,a=this.items.map((t=>({m:t,h:this.hourOf(t)}))).filter((t=>void 0!==t.h));return B`<div class="card glass">
      <h3><sn-icon icon="schedule"></sn-icon>${t.t("widget_schedule")}</h3>
      <div class="grid">
        ${ko.map(((i,o)=>B`<span class="day ${i===s?"today":""}">${Mo(i,e)}</span>
            <div class="lane">
              ${i===s?B`<span class="now" style="left:${n}%"></span>`:""}
              ${a.filter((({m:t})=>!t.days.length||t.days.includes(i))).map((({m:e,h:i})=>{const s="off"!==zo(t.hass,e.id)?.state;return B`<button
                    class="dot ${s?"":"off"}"
                    style="left:${i/24*100}%;animation-delay:${30*o}ms"
                    title=${`${e.name}`}
                    aria-label=${e.name}
                    @click=${()=>t.isAdmin&&Oo(t,e,(()=>this.load()))}
                  >
                    <sn-icon icon=${"sun"===e.trigger.kind?"sun":"clock-outline"}></sn-icon>
                  </button>`}))}
            </div>`))}
      </div>
      <div class="hours"><span>00</span><span>06</span><span>12</span><span>18</span><span>24</span></div>
    </div>`}};No.styles=[fi,r`
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
    `],Eo([gt({attribute:!1})],No.prototype,"ctx",2),Eo([gt({attribute:!1})],No.prototype,"widget",2),Eo([mt()],No.prototype,"items",2),No=Eo([pt("sn-w-schedule")],No);var Wo=Object.defineProperty,Ro=Object.getOwnPropertyDescriptor,Fo=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Ro(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&Wo(e,i,a),a};const Bo=524288,Zo="script.smartnest_cinema";let qo=class extends ct{get entity(){const t=this.ctx.hass.states;return this.widget.config.entity??Object.keys(t).find((e=>e.startsWith("media_player.")&&"playing"===t[e].state))??Object.keys(t).find((t=>t.startsWith("media_player.")))}call(t,e={}){ki("tap"),this.ctx.hass.callService("media_player",t,{entity_id:this.entity,...e}).catch((()=>this.ctx.toast(this.ctx.t("error"))))}cinema(){const{ctx:t}=this;t.hass.states[Zo]&&t.hass.callService("script","turn_on",{entity_id:Zo}).catch((()=>{})),t.cinematic("cinema")}render(){const{ctx:t}=this,{t:e,hass:i}=t,s=this.entity,n=s?i.states[s]:void 0;if(!n)return B`<div class="card glass"><span class="muted">${e("nothing_playing")}</span></div>`;const a=n.attributes,o=a.supported_features??0,r="playing"===n.state,l=a.entity_picture?i.hassUrl(a.entity_picture):void 0,c=Object.values(i.states).filter((t=>t.entity_id!==s&&t.entity_id.startsWith("media_player.")&&!!((t.attributes.supported_features??0)&Bo)));l&&l!==this.artSrc&&(this.artSrc=l,function(t){let e=te.get(t);return e||(e=new Promise((e=>{const i=new Image;i.crossOrigin="anonymous",i.onload=()=>{try{const t=document.createElement("canvas");t.width=t.height=32;const s=t.getContext("2d",{willReadFrequently:!0});s.drawImage(i,0,0,32,32);const n=s.getImageData(0,0,32,32).data;let a={score:-1,rgb:[233,151,29]};for(let e=0;e<n.length;e+=4){const[t,i,s]=[n[e],n[e+1],n[e+2]],o=Math.max(t,i,s),r=Math.min(t,i,s),l=(o+r)/510,c=(o===r?0:(o-r)/(255-Math.abs(o+r-255)))*(1-1.6*Math.abs(l-.52));c>a.score&&(a={score:c,rgb:[t,i,s]})}e(`#${a.rgb.map((t=>t.toString(16).padStart(2,"0"))).join("")}`)}catch{e(void 0)}},i.onerror=()=>e(void 0),i.src=t})),te.size>40&&te.clear(),te.set(t,e),e)}(l).then((t=>this.artSrc===l&&(this.artColor=t))));const d=l?this.artColor:void 0;return B`<div class="wrap"><div class="card glass" style=${d?`--accent:${d};--on-accent:#fff;box-shadow:0 18px 50px -20px ${d}, var(--shadow)`:""}>
      ${l?B`<div class="bg" style="background-image:url('${l}')"></div>`:U}
      <div class="art" style=${l?`background-image:url('${l}')`:""}>${l?"":B`<sn-icon icon="speaker"></sn-icon>`}</div>
      <div class="info">
        <span class="title">${a.media_title??(r?ie(i,t.config,s):e("nothing_playing"))}</span>
        <span class="artist">${a.media_artist??ie(i,t.config,s)}</span>
        <div class="ctl">
          ${16&o?B`<button class="icon-btn pressable" aria-label="previous" @click=${()=>this.call("media_previous_track")}><sn-icon icon="prev"></sn-icon></button>`:U}
          ${16385&o?B`<button class="icon-btn primary pressable big" aria-label=${e(r?"pause":"start")} @click=${()=>this.call("media_play_pause")}>
                <sn-icon icon=${r?"pause":"play"}></sn-icon>
              </button>`:U}
          ${32&o?B`<button class="icon-btn pressable" aria-label="next" @click=${()=>this.call("media_next_track")}><sn-icon icon="next"></sn-icon></button>`:U}
          ${8&o?B`<button class="icon-btn pressable" aria-label="mute" @click=${()=>this.call("volume_mute",{is_volume_muted:!a.is_volume_muted})}>
                <sn-icon icon=${a.is_volume_muted?"vol-mute":"volume"}></sn-icon>
              </button>`:U}
        </div>
        ${4&o?B`<input
              type="range"
              min="0"
              max="100"
              aria-label="volume"
              .value=${String(Math.round(100*(a.volume_level??0)))}
              @change=${t=>this.call("volume_set",{volume_level:Number(t.target.value)/100})}
            />`:U}
        <div class="row">
          ${o&Bo&&c.length?B`<button class="btn pressable" @click=${()=>this.call("join",{group_members:c.map((t=>t.entity_id))})}>
                <sn-icon icon="speaker-multi" style="--icon-size:18px"></sn-icon>${e("group_speakers")}
              </button>`:U}
          ${t.allows("cinema")?B`<button class="btn pressable" @click=${()=>this.cinema()}><sn-icon icon="movie" style="--icon-size:18px"></sn-icon>${e("cinema_mode")}</button>`:U}
        </div>
      </div>
    </div></div>`}};qo.styles=[fi,r`
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
    `],Fo([mt()],qo.prototype,"artColor",2),Fo([gt({attribute:!1})],qo.prototype,"ctx",2),Fo([gt({attribute:!1})],qo.prototype,"widget",2),qo=Fo([pt("sn-w-media")],qo);var Uo=Object.defineProperty,Yo=Object.getOwnPropertyDescriptor,Xo=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Yo(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&Uo(e,i,a),a};const Ko={androidtv_remote:{up:"DPAD_UP",down:"DPAD_DOWN",left:"DPAD_LEFT",right:"DPAD_RIGHT",ok:"DPAD_CENTER",back:"BACK",home:"HOME",vol_up:"VOLUME_UP",vol_down:"VOLUME_DOWN",mute:"MUTE"},samsungtv:{up:"KEY_UP",down:"KEY_DOWN",left:"KEY_LEFT",right:"KEY_RIGHT",ok:"KEY_ENTER",back:"KEY_RETURN",home:"KEY_HOME",vol_up:"KEY_VOLUP",vol_down:"KEY_VOLDOWN",mute:"KEY_MUTE"},webostv:{up:"UP",down:"DOWN",left:"LEFT",right:"RIGHT",ok:"ENTER",back:"BACK",home:"HOME",vol_up:"VOLUMEUP",vol_down:"VOLUMEDOWN",mute:"MUTE"},apple_tv:{up:"up",down:"down",left:"left",right:"right",ok:"select",back:"menu",home:"home",vol_up:"volume_up",vol_down:"volume_down",mute:"volume_down"},roku:{up:"up",down:"down",left:"left",right:"right",ok:"select",back:"back",home:"home",vol_up:"volume_up",vol_down:"volume_down",mute:"volume_mute"}};let Go=class extends ct{send(t){const{hass:e}=this.ctx,i=this.widget.config.entity,s=e.entities?.[i]?.platform??"androidtv_remote",n=Ko[s]??Ko.androidtv_remote;ki("tick");("webostv"===s?e.callService("webostv","button",{entity_id:i,button:n[t]}):e.callService("remote","send_command",{entity_id:i,command:n[t]})).catch((()=>this.ctx.toast(this.ctx.t("error"))))}render(){const{ctx:t}=this,e=this.widget.config.entity,i=e?t.hass.states[e]:void 0;if(!i)return B`<div class="card glass"><span class="muted">${t.t("choose_entity")}</span></div>`;const s=(t,e,i)=>B`<button class=${`pressable ${e}`} aria-label=${t} @click=${()=>this.send(t)}><sn-icon .icon=${i}></sn-icon></button>`;return B`<div class="card glass">
      <div class="top">
        <span>${ie(t.hass,t.config,i.entity_id)}</span>
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
    </div>`}};Go.styles=[fi,r`
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
    `],Xo([gt({attribute:!1})],Go.prototype,"ctx",2),Xo([gt({attribute:!1})],Go.prototype,"widget",2),Go=Xo([pt("sn-w-remote")],Go);var Jo=Object.defineProperty,Qo=Object.getOwnPropertyDescriptor,tr=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Qo(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&Jo(e,i,a),a};let er=class extends ct{open(){const{ctx:t}=this;if(t.editing)return;ki("tap");const e=this.widget.config.entities??[];t.showSheet({title:this.widget.config.title||t.t("widget_folder"),render:t=>B`<sn-folder-sheet .ctx=${t} .ids=${e}></sn-folder-sheet>`})}render(){const{ctx:t}=this,{t:e,hass:i}=t,s=(this.widget.config.entities??[]).filter((t=>i.states[t])),n=s.filter((t=>ne(i.states[t]))).length;return B`<div class="card glass pressable" role="button" tabindex="0" @click=${()=>this.open()} @keydown=${t=>"Enter"===t.key&&this.open()}>
      <div class="minis">
        ${s.slice(0,4).map((t=>{const e=de(i.states[t]);return B`<span class="mini ${ne(e)?"on":""}" style=${ae(e)}><sn-icon .icon=${oe(e,t)}></sn-icon></span>`}))}
        ${s.length?U:B`<sn-icon icon="folder" style="--icon-size:34px;color:var(--text-2);grid-column:1/-1"></sn-icon>`}
      </div>
      <div class="foot">
        <b>${this.widget.config.title||e("widget_folder")}</b>
        <span>${s.length?e("folder_on",{n:n,of:s.length}):e("folder_empty")}</span>
      </div>
    </div>`}};er.styles=[fi,r`
      :host {
        display: block;
        height: 100%;
      }
      .card {
        height: 100%;
        border-radius: var(--r-lg);
        padding: 14px;
        display: grid;
        grid-template-rows: 1fr auto;
        gap: 8px;
        cursor: pointer;
        overflow: hidden;
      }
      .minis {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 6px;
        align-content: center;
        justify-items: center;
      }
      .mini {
        width: 40px;
        height: 40px;
        border-radius: 13px;
        display: grid;
        place-items: center;
        background: var(--surface-2);
        color: var(--text-2);
        --icon-size: 22px;
        transition: background 300ms, color 300ms;
      }
      .mini.on {
        background: var(--tone, var(--accent));
        color: var(--on-tone, #fff);
      }
      .foot {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 8px;
      }
      .foot b {
        font-size: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .foot span {
        font-size: 13px;
        color: var(--text-2);
        flex: none;
      }
    `],tr([gt({attribute:!1})],er.prototype,"ctx",2),tr([gt({attribute:!1})],er.prototype,"widget",2),er=tr([pt("sn-w-folder")],er);let ir=class extends ct{constructor(){super(...arguments),this.ids=[]}render(){const{ctx:t}=this,{hass:e,config:i,t:s,lang:n}=t;return this.ids.filter((t=>e.states[t])).map((a=>{const o=de(e.states[a]),r=ne(o);return B`<button
          class="d ${r?"on":""}"
          style=${ae(o)}
          @click=${()=>{if("sheet"===re(a))return t.openEntity(a);ki(r?"off":"on"),he(e,e.states[a]).catch((()=>t.toast(s("error")))),this.requestUpdate()}}
          @contextmenu=${e=>(e.preventDefault(),t.openEntity(a))}
        >
          <span class="ic"><sn-icon .icon=${oe(o,a)}></sn-icon></span>
          <span>${ie(e,i,a)}<br /><small>${fe(s,o,n)}</small></span>
        </button>`}))}};ir.styles=[fi,r`
      :host {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 10px;
      }
      button.d {
        display: grid;
        justify-items: start;
        gap: 10px;
        padding: 14px;
        min-height: 110px;
        border: 0;
        border-radius: var(--r-lg);
        background: var(--surface-2);
        color: var(--text);
        font: 600 15px var(--font);
        text-align: start;
        cursor: pointer;
        transition: background 250ms, transform 150ms;
      }
      button.d:active {
        transform: scale(0.96);
      }
      button.d.on {
        background: var(--surface-solid);
        box-shadow: inset 0 0 0 2px var(--tone, var(--accent));
      }
      .ic {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: var(--surface-solid);
        --icon-size: 22px;
      }
      .on .ic {
        background: var(--tone, var(--accent));
        color: var(--on-tone, #fff);
      }
      small {
        color: var(--text-2);
        font-weight: 500;
      }
    `],tr([gt({attribute:!1})],ir.prototype,"ctx",2),tr([gt({attribute:!1})],ir.prototype,"ids",2),ir=tr([pt("sn-folder-sheet")],ir);var sr=Object.defineProperty,nr=Object.getOwnPropertyDescriptor,ar=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?nr(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&sr(e,i,a),a};const or=["fajr","sunrise","dhuhr","asr","maghrib","isha"];let rr=class extends ct{constructor(){super(...arguments),this.now=Date.now()}connectedCallback(){super.connectedCallback(),this.tick=window.setInterval((()=>this.now=Date.now()),3e4)}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this.tick)}render(){const{ctx:t}=this,{t:e,lang:i}=t,s=function(t){const{hass:e}=t,i=[];for(const s of or){const t=Object.keys(e.states).find((t=>t.startsWith("sensor.")&&("islamic_prayer_times"===e.entities?.[t]?.platform||/prayer|salat|صلاة/i.test(t))&&t.includes(s))),n=t?Date.parse(e.states[t].state):NaN;Number.isNaN(n)||i.push({name:s,at:n})}return i.sort(((t,e)=>t.at-e.at))}(t);if(!s.length)return B`<div class="card glass">
        <sn-icon icon="mosque" style="--icon-size:28px;color:var(--accent-text)"></sn-icon>
        <span class="muted">${e("prayer_setup")}</span>
      </div>`;const n=s.find((t=>t.at>this.now&&"sunrise"!==t.name)),a=t=>new Date(t).toLocaleTimeString(Ot[i],{hour:"2-digit",minute:"2-digit"}),o=n?Math.round((n.at-this.now)/6e4):0,r=o>=60?e("prayer_in_hm",{h:Math.floor(o/60),m:o%60}):e("prayer_in_m",{m:o});return B`<div class="card glass">
      ${n?B`<div class="next">
            <span>${e("prayer_next")}</span>
            <b>${e(`prayer_${n.name}`)} · ${a(n.at)}</b>
            <em>${r}</em>
          </div>`:U}
      <ul>
        ${s.map((t=>B`<li class="${t===n?"next":t.at<this.now?"past":""} ${"sunrise"===t.name?"sun":""}">
            <span>${e(`prayer_${t.name}`)}</span><span class="ltr">${a(t.at)}</span>
          </li>`))}
      </ul>
    </div>`}};rr.styles=[fi,r`
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
      .next {
        display: grid;
        gap: 2px;
      }
      .next span {
        font-size: 13px;
        color: var(--text-2);
      }
      .next b {
        font-size: 26px;
        font-weight: var(--display-weight, 700);
      }
      .next em {
        font-style: normal;
        color: var(--accent-text);
        font-weight: 600;
      }
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 4px;
      }
      li {
        display: flex;
        justify-content: space-between;
        padding: 8px 12px;
        border-radius: var(--r-md);
        font-size: 15px;
      }
      li.past {
        color: var(--text-2);
      }
      li.next {
        background: var(--accent);
        color: var(--on-accent);
        font-weight: 700;
      }
      li.sun {
        font-size: 13px;
      }
    `],ar([gt({attribute:!1})],rr.prototype,"ctx",2),ar([gt({attribute:!1})],rr.prototype,"widget",2),ar([mt()],rr.prototype,"now",2),rr=ar([pt("sn-w-prayer")],rr);var lr=Object.defineProperty,cr=Object.getOwnPropertyDescriptor,dr=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?cr(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&lr(e,i,a),a};let pr=class extends ct{constructor(){super(...arguments),this.domain="light"}call(t,e){if(!e.length)return;ki("tap");const i=()=>this.ctx.hass.callService(this.domain,t,{entity_id:e});e.length>1&&"stop_cover"!==t?this.ctx.undoable(e,this.ctx.t("undo_n",{n:e.length}),i):i().catch((()=>this.ctx.toast(this.ctx.t("error"))))}render(){const{ctx:t,domain:e}=this,{t:i,hass:s,config:n,lang:a}=t,o=function(t,e,i){const{hass:s}=t;return i.config.entities?.length?i.config.entities.filter((t=>s.states[t])):Object.keys(s.states).filter((t=>t.startsWith(`${e}.`)&&!s.entities?.[t]?.hidden&&!s.entities?.[t]?.entity_category&&!("cover"===e&&["gate","garage","door"].includes(s.states[t].attributes.device_class))&&(!i.config.area||xe(s,t)===i.config.area)))}(t,e,this.widget),r=this.widget.config.area?s.areas?.[this.widget.config.area]?.name:void 0,l=this.widget.config.title||(r?`${i("light"===e?"widget_lights":"widget_covers")} · ${r}`:i("light"===e?"widget_lights":"widget_covers")),c=o.filter((t=>"light"===e?"on"===s.states[t].state:["open","opening"].includes(s.states[t].state)));return o.length?B`<div class="card glass">
      <div class="head">
        <sn-icon icon=${"light"===e?"lightbulb":"blinds"} style="--icon-size:22px;color:${c.length?"var(--accent-text)":"var(--text-2)"}"></sn-icon>
        <div>
          <b>${l}</b>
          <span>${i("light"===e?"lights_on_n":"covers_open_n",{n:c.length,of:o.length})}</span>
        </div>
        ${t.isAdmin?B`<button class="icon-btn small pressable" aria-label=${i("scene_keep")} title=${i("scene_keep")} @click=${()=>an(t,o,l).catch((()=>t.toast(i("error"))))}>
              <sn-icon icon="content-save" style="--icon-size:18px"></sn-icon>
            </button>`:U}
        ${"light"===e?c.length?B`<button class="btn pressable" @click=${()=>this.call("turn_off",c)}>${i("all_off")}</button>`:B`<button class="btn primary pressable" @click=${()=>this.call("turn_on",o)}>${i("all_on")}</button>`:B`<div class="cv">
              <button aria-label=${i("open")} @click=${()=>this.call("open_cover",o)}><sn-icon icon="arrow-up"></sn-icon></button>
              <button aria-label="stop" @click=${()=>this.call("stop_cover",o)}><sn-icon icon="stop"></sn-icon></button>
              <button aria-label=${i("closed")} @click=${()=>this.call("close_cover",o)}><sn-icon icon="arrow-down"></sn-icon></button>
            </div>`}
      </div>
      <ul>
        ${o.map((o=>{const r=s.states[o],l=ne(r),c=r.attributes.rgb_color,d=r.attributes.current_position,p=r.attributes.brightness;return B`<li class=${l?"on":""} style=${l&&Array.isArray(c)?`--tone:rgb(${c.join(",")})`:""}>
            <span class="nm" @click=${()=>t.openEntity(o,this)}>
              <sn-icon .icon=${oe(r,o)} style="--icon-size:20px"></sn-icon>
              <span>${ie(s,n,o)}</span>
              ${"light"===e&&l&&"number"==typeof p?B`<small class="ltr">${ue(`${ge(p/255*100,a,0)}%`)}</small>`:U}
              ${"cover"===e&&"number"==typeof d?B`<small class="ltr">${ue(`${d}%`)}</small>`:U}
            </span>
            ${"light"===e?B`<button class="sw" role="switch" aria-checked=${l} aria-label=${ie(s,n,o)} @click=${()=>this.call("toggle",[o])}></button>`:B`<div class="cv">
                  <button aria-label=${i("open")} @click=${()=>this.call("open_cover",[o])}><sn-icon icon="arrow-up"></sn-icon></button>
                  <button class="st" aria-label="stop" @click=${()=>this.call("stop_cover",[o])}><sn-icon icon="stop"></sn-icon></button>
                  <button aria-label=${i("closed")} @click=${()=>this.call("close_cover",[o])}><sn-icon icon="arrow-down"></sn-icon></button>
                </div>`}
          </li>`}))}
      </ul>
    </div>`:B`<div class="card glass"><sn-empty text=${i("no_entities")}></sn-empty></div>`}};pr.styles=[fi,r`
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
      .head {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .head div {
        flex: 1;
        display: grid;
      }
      .head b {
        font-size: 16px;
      }
      .head span {
        font-size: 13px;
        color: var(--text-2);
      }
      .head .btn {
        min-height: 38px;
        font-size: 14px;
        padding-inline: 12px;
      }
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        gap: 6px;
        overflow: auto;
        align-content: start;
      }
      /* Narrow card: each blind keeps up and down, the stop is in the header. */
      @container (max-width: 260px) {
        li .cv button.st {
          display: none;
        }
      }
      .card {
        container-type: inline-size;
      }
      li {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 10px;
        border-radius: var(--r-md);
        background: var(--surface-2);
      }
      li .nm {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 14px;
        cursor: pointer;
        min-width: 0;
      }
      li .nm span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      li.on .nm sn-icon {
        color: var(--tone, var(--accent));
      }
      li small {
        color: var(--text-2);
        font-size: 12px;
      }
      .sw {
        width: 46px;
        height: 28px;
        border-radius: 999px;
        border: 0;
        background: var(--border);
        position: relative;
        cursor: pointer;
        flex: none;
        transition: background 200ms;
      }
      .sw::after {
        content: "";
        position: absolute;
        top: 3px;
        inset-inline-start: 3px;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: #fff;
        transition: inset-inline-start 200ms;
      }
      .sw[aria-checked="true"] {
        background: var(--accent);
      }
      .sw[aria-checked="true"]::after {
        inset-inline-start: 21px;
      }
      .cv {
        display: flex;
        gap: 4px;
      }
      .cv button {
        width: 34px;
        height: 34px;
        border-radius: 10px;
        border: 0;
        background: var(--surface-solid);
        color: var(--text);
        display: grid;
        place-items: center;
        cursor: pointer;
        --icon-size: 18px;
      }
    `],dr([gt({attribute:!1})],pr.prototype,"ctx",2),dr([gt({attribute:!1})],pr.prototype,"widget",2),dr([gt()],pr.prototype,"domain",2),pr=dr([pt("sn-w-group")],pr);var hr=Object.defineProperty,ur=Object.getOwnPropertyDescriptor,gr=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?ur(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&hr(e,i,a),a};let mr=class extends ct{render(){const{ctx:t}=this,{t:e,hass:i,config:s,lang:n}=t,a=Number(this.widget.config.low??20),o=function(t){const{hass:e}=t;return Object.values(e.states).filter((t=>t.entity_id.startsWith("sensor.")&&"battery"===t.attributes.device_class&&"%"===t.attributes.unit_of_measurement&&!Number.isNaN(Number(t.state)))).map((t=>({id:t.entity_id,level:Number(t.state)}))).sort(((t,e)=>t.level-e.level))}(t),r=o.filter((t=>t.level<=a)).length;return B`<div class="card glass">
      <h3>
        <sn-icon icon=${r?"battery-alert":"battery"} style="--icon-size:20px;color:${r?"var(--alert)":"var(--success)"}"></sn-icon>${e("widget_batteries")}
        <span>${r?e("bat_low_n",{n:r}):o.length?e("bat_all_good"):""}</span>
      </h3>
      ${o.length?o.map((e=>B`<div class="row ${e.level<=a?"low":e.level<=2*a?"mid":""}" @click=${()=>t.openEntity(e.id,this)}>
              <b>${ie(i,s,e.id)}</b>
              <span class="bar"><i style="width:${Math.max(3,Math.min(100,e.level))}%"></i></span>
              <span class="pct ltr"><sn-num .value=${`${ge(e.level,n,0)}%`}></sn-num></span>
            </div>`)):B`<sn-empty text=${e("no_entities")}></sn-empty>`}
      ${U}
    </div>`}};mr.styles=[fi,r`
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
        align-items: center;
        gap: 8px;
      }
      h3 span {
        margin-inline-start: auto;
        font-size: 13px;
        font-weight: 500;
        color: var(--text-2);
      }
      .row {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        grid-template-areas: "n p" "b b";
        gap: 4px 10px;
        align-items: center;
        font-size: 14px;
        cursor: pointer;
      }
      .row b {
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .row b {
        grid-area: n;
      }
      .pct {
        grid-area: p;
      }
      .bar {
        grid-area: b;
        height: 8px;
        border-radius: 999px;
        background: var(--surface-2);
        overflow: hidden;
      }
      .bar i {
        display: block;
        height: 100%;
        border-radius: inherit;
        background: var(--success);
      }
      .row.low .bar i {
        background: var(--alert);
      }
      .row.mid .bar i {
        background: #e9971d;
      }
      .row.low b,
      .row.low .pct {
        color: var(--alert-text);
        font-weight: 700;
      }
      .pct {
        text-align: end;
      }
    `],gr([gt({attribute:!1})],mr.prototype,"ctx",2),gr([gt({attribute:!1})],mr.prototype,"widget",2),mr=gr([pt("sn-w-batteries")],mr);var fr=Object.defineProperty,br=Object.getOwnPropertyDescriptor,_r=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?br(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&fr(e,i,a),a};let yr=class extends ct{constructor(){super(...arguments),this.points=[],this.unit="",this.lang="ar",this.color="var(--accent)"}smooth(t){if(t.length<2)return"";let e=`M${t[0][0]} ${t[0][1]}`;for(let i=0;i<t.length-1;i++){const s=t[i-1]??t[i],n=t[i],a=t[i+1],o=t[i+2]??a,r=[n[0]+(a[0]-s[0])/6,n[1]+(a[1]-s[1])/6],l=[a[0]-(o[0]-n[0])/6,a[1]-(o[1]-n[1])/6];e+=` C${r[0]} ${r[1]} ${l[0]} ${l[1]} ${a[0]} ${a[1]}`}return e}render(){const t=this.points;if(t.length<2)return U;const e=t[0].t,i=Math.max(t[t.length-1].t,Date.now()/1e3),s=t.map((t=>t.v)),n=Math.min(...s),a=Math.max(...s),o=.15*(a-n||1),r=t=>(t-e)/(i-e||1)*300,l=t=>110-(t-(n-o))/(a-n+2*o||1)*100,c=Math.max(1,Math.floor(t.length/80)),d=t.filter(((e,i)=>i%c==0||i===t.length-1)).map((t=>[r(t.t),l(t.v)]));d.push([300,d[d.length-1][1]]);const p=this.smooth(d),h=`g${Math.random().toString(36).slice(2,7)}`;let u;if(void 0!==this.at){const s=e+this.at*(i-e),n=t.reduce(((t,e)=>Math.abs(e.t-s)<Math.abs(t.t-s)?e:t),t[0]);u={x:r(n.t),y:l(n.v),p:n}}const g=t=>new Date(1e3*t).toLocaleTimeString(Ot[this.lang],{hour:"2-digit",minute:"2-digit"});return B`<svg
        viewBox="0 0 300 120"
        preserveAspectRatio="none"
        @pointermove=${t=>{const e=t.currentTarget.getBoundingClientRect();this.at=Math.min(1,Math.max(0,(t.clientX-e.left)/e.width))}}
        @pointerleave=${()=>this.at=void 0}
        @pointerup=${t=>"mouse"!==t.pointerType&&window.setTimeout((()=>this.at=void 0),1500)}
      >
        ${Z`<defs><linearGradient id=${h} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color=${this.color} stop-opacity=".35"></stop>
            <stop offset="1" stop-color=${this.color} stop-opacity="0"></stop>
          </linearGradient></defs>
          <path d="${p} L300 120 L0 120 Z" fill="url(#${h})"></path>
          <path d=${p} fill="none" stroke=${this.color} stroke-width="2.5" vector-effect="non-scaling-stroke" stroke-linecap="round"></path>
          ${u?Z`<line x1=${u.x} x2=${u.x} y1="0" y2="120" stroke="var(--text-2)" stroke-dasharray="2 3" vector-effect="non-scaling-stroke"></line>
                <circle cx=${u.x} cy=${u.y} r="4" fill=${this.color} stroke="var(--surface-solid)" stroke-width="2" vector-effect="non-scaling-stroke"></circle>`:""}`}
      </svg>
      ${u?B`<div class="bubble" style="left:${u.x/300*100}%"><b>${ge(u.p.v,this.lang)} ${this.unit}</b><span>${g(u.p.t)}</span></div>`:U}
      <div class="axis"><span>${g(e)}</span><span>${ge(n,this.lang)}–${ge(a,this.lang)} ${this.unit}</span><span>${g(i)}</span></div>`}};yr.styles=r`
    :host {
      display: block;
      position: relative;
      touch-action: pan-y;
    }
    svg {
      display: block;
      width: 100%;
      height: 120px;
      overflow: visible;
    }
    .bubble {
      position: absolute;
      top: -6px;
      translate: -50% -100%;
      padding: 4px 10px;
      border-radius: 10px;
      background: var(--surface-solid);
      box-shadow: var(--shadow);
      font-size: 13px;
      white-space: nowrap;
      direction: ltr;
      pointer-events: none;
    }
    .bubble b {
      font-size: 15px;
    }
    .bubble span {
      color: var(--text-2);
      margin-left: 6px;
    }
    .axis {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: var(--text-2);
      direction: ltr;
      margin-top: 4px;
    }
  `,_r([gt({attribute:!1})],yr.prototype,"points",2),_r([gt()],yr.prototype,"unit",2),_r([gt()],yr.prototype,"lang",2),_r([gt()],yr.prototype,"color",2),_r([mt()],yr.prototype,"at",2),yr=_r([pt("sn-chart")],yr);var vr=Object.defineProperty,xr=Object.getOwnPropertyDescriptor,wr=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?xr(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&vr(e,i,a),a};let $r=class extends ct{constructor(){super(...arguments),this.pts=[],this.loadedFor=""}get entity(){return this.widget.config.entity}connectedCallback(){super.connectedCallback(),this.timer=window.setInterval((()=>this.load(!0)),6e5)}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this.timer)}updated(){this.entity&&this.entity!==this.loadedFor&&this.load()}async load(t=!1){const e=this.entity;if(e&&(t||e!==this.loadedFor)){this.loadedFor=e;try{const t=new Date(Date.now()-864e5).toISOString(),i=await this.ctx.hass.callWS({type:"history/history_during_period",start_time:t,entity_ids:[e],minimal_response:!0,no_attributes:!0,significant_changes_only:!1});let s=Date.parse(t)/1e3;this.pts=(i[e]??[]).map((t=>(s=t.lu??t.lc??s,{t:s,v:Number(t.s)}))).filter((t=>!Number.isNaN(t.v)))}catch{this.pts=[]}}}render(){const{ctx:t}=this,{t:e,hass:i,config:s,lang:n}=t,a=this.entity,o=a?i.states[a]:void 0;if(!a||!o)return B`<div class="card glass"><sn-empty text=${e("sensor_pick")}></sn-empty></div>`;const r=o.attributes.unit_of_measurement??"",l=ye(o);return B`<div class="card glass" @click=${()=>t.openEntity(a,this)}>
      <span class="name"><sn-icon .icon=${oe(o,a)} style="--icon-size:18px"></sn-icon>${ie(i,s,a)}</span>
      <span class="v ltr"><sn-num .value=${l?ge(Number(o.state),n):o.state}></sn-num> <small>${r}</small></span>
      <div class="ch">${l&&this.pts.length>1?B`<sn-chart .points=${this.pts} unit=${r} .lang=${n} .color=${this.widget.config.color??"var(--accent)"}></sn-chart>`:U}</div>
    </div>`}};$r.styles=[fi,r`
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
        gap: 4px;
        overflow: hidden;
        cursor: pointer;
      }
      .name {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        color: var(--text-2);
      }
      .v {
        font-size: 40px;
        font-weight: var(--display-weight, 700);
        line-height: 1.1;
      }
      .v small {
        font-size: 18px;
        color: var(--text-2);
        font-weight: 500;
      }
      .ch {
        min-height: 60px;
        display: grid;
        align-items: end;
      }
    `],wr([gt({attribute:!1})],$r.prototype,"ctx",2),wr([gt({attribute:!1})],$r.prototype,"widget",2),wr([mt()],$r.prototype,"pts",2),$r=wr([pt("sn-w-sensor")],$r);var kr=Object.defineProperty,Cr=Object.getOwnPropertyDescriptor,Mr=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Cr(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&kr(e,i,a),a};let Hr=class extends ct{constructor(){super(...arguments),this.done=""}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this.timer)}run(t){ki("press");const e=t.startsWith("scene.")?this.ctx.hass.states[t]?.attributes.entity_id??[]:[],i=()=>this.ctx.hass.callService(ee(t),"turn_on",{entity_id:t});e.length?this.ctx.undoable(e,ie(this.ctx.hass,this.ctx.config,t),i):i().catch((()=>this.ctx.toast(this.ctx.t("error")))),this.done=t,window.clearTimeout(this.timer),this.timer=window.setTimeout((()=>this.done=""),1600)}render(){const{ctx:t}=this,{t:e,hass:i,config:s}=t,n=function(t,e){return e?.length?e.filter((e=>t.hass.states[e])):Object.keys(t.hass.states).filter((e=>(e.startsWith("scene.")||e.startsWith("script."))&&!t.hass.entities?.[e]?.hidden&&!t.hass.entities?.[e]?.entity_category)).slice(0,8)}(t,this.widget.config.entities);return B`<div class="card glass">
      <h3><sn-icon icon="palette" style="--icon-size:20px;color:var(--accent-text)"></sn-icon>${this.widget.config.title||e("widget_scenes")}</h3>
      ${n.length?B`<div class="grid">
            ${n.map((t=>B`<button class="s ${this.done===t?"done":""}" @click=${()=>this.run(t)}>
                <sn-icon icon=${this.done===t?"check":oe(i.states[t],t)}></sn-icon>${ie(i,s,t)}
              </button>`))}
          </div>`:B`<sn-empty text=${e("no_entities")}></sn-empty>`}
      ${U}
    </div>`}};Hr.styles=[fi,r`
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
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(118px, 1fr));
        gap: 8px;
      }
      button.s {
        display: flex;
        align-items: center;
        gap: 10px;
        min-height: 58px;
        padding: 10px 12px;
        border-radius: var(--r-md);
        border: 0;
        background: var(--surface-2);
        color: var(--text);
        font: 600 14px var(--font);
        text-align: start;
        cursor: pointer;
        transition: background 250ms, transform 150ms;
      }
      button.s:active {
        transform: scale(0.96);
      }
      button.s.done {
        background: var(--accent);
        color: var(--on-accent);
      }
      button.s sn-icon {
        --icon-size: 22px;
        flex: none;
      }
    `],Mr([gt({attribute:!1})],Hr.prototype,"ctx",2),Mr([gt({attribute:!1})],Hr.prototype,"widget",2),Mr([mt()],Hr.prototype,"done",2),Hr=Mr([pt("sn-w-scenes")],Hr);var Ar=Object.defineProperty,Lr=Object.getOwnPropertyDescriptor,Vr=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Lr(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&Ar(e,i,a),a};const Sr=135,zr=270;let Dr=class extends ct{constructor(){super(...arguments),this.value=22,this.min=16,this.max=30,this.step=.5,this.mode="cool",this.label=""}angleOf(t){return Sr+(t-this.min)/(this.max-this.min)*zr}point(t,e){const i=t*Math.PI/180;return[50+e*Math.cos(i),50+e*Math.sin(i)]}arc(t,e,i){const[s,n]=this.point(t,i),[a,o]=this.point(e,i);return`M${s} ${n} A${i} ${i} 0 ${e-t>180?1:0} 1 ${a} ${o}`}fromPointer(t){const e=this.rect??t.currentTarget.getBoundingClientRect();let i=180*Math.atan2(t.clientY-(e.top+e.height/2),t.clientX-(e.left+e.width/2))/Math.PI;i=(i+360)%360;let s=(i-Sr+360)%360;s>zr&&(s=s-zr<45?zr:0);const n=this.min+s/zr*(this.max-this.min);return Math.min(this.max,Math.max(this.min,Math.round(n/this.step)*this.step))}set(t){t!==this.drag&&(void 0!==this.drag&&ki("tick"),this.drag=t)}render(){const t=this.drag??this.value,e="heat"===this.mode?"#ff8a3d":"off"===this.mode?"var(--text-2)":"auto"===this.mode?"#2bb673":"#3a9bff",i=this.angleOf(t),[s,n]=this.point(i,43),a=[];for(let r=0;r<=54;r++){const t=Sr+r/54*zr,[e,s]=this.point(t,47.5),[n,o]=this.point(t,r%9==0?45:46.3);a.push(Z`<line x1=${e} y1=${s} x2=${n} y2=${o} stroke="var(--text-2)" stroke-opacity=${t<=i?.9:.3} stroke-width=".5"></line>`)}const o=void 0!==this.current&&this.current>=this.min&&this.current<=this.max?this.point(this.angleOf(this.current),43):void 0;return B`<div
      class="wrap"
      role="slider"
      tabindex="0"
      aria-label=${this.label}
      aria-valuemin=${this.min}
      aria-valuemax=${this.max}
      aria-valuenow=${t}
      style="--glow:${e}"
      @pointerdown=${t=>{t.currentTarget.setPointerCapture(t.pointerId),this.rect=t.currentTarget.getBoundingClientRect(),this.drag=this.fromPointer(t)}}
      @pointermove=${t=>void 0!==this.drag&&this.set(this.fromPointer(t))}
      @pointerup=${()=>{this.rect=void 0,void 0!==this.drag&&this.drag!==this.value&&this.onCommit?.(this.drag),this.drag=void 0}}
      @pointercancel=${()=>(this.rect=void 0,this.drag=void 0)}
      @keydown=${t=>{const e="ArrowUp"===t.key||"ArrowRight"===t.key?this.step:"ArrowDown"===t.key||"ArrowLeft"===t.key?-this.step:0;e&&(t.preventDefault(),this.onCommit?.(Math.min(this.max,Math.max(this.min,this.value+e))))}}
    >
      <svg viewBox="0 0 100 100" aria-hidden="true">
        ${a}
        ${Z`<path d=${this.arc(Sr,405,43)} fill="none" stroke="var(--surface-2)" stroke-width="5" stroke-linecap="round"></path>
        <path d=${this.arc(Sr,Math.max(135.5,i),43)} fill="none" stroke=${e} stroke-width="5" stroke-linecap="round" style="filter:drop-shadow(0 0 3px ${e})"></path>
        ${o?Z`<circle cx=${o[0]} cy=${o[1]} r="1.4" fill="var(--text)"></circle>`:""}
        <g class="knob"><circle cx=${s} cy=${n} r="4.2" fill="#fff" stroke=${e} stroke-width="1.6" style="filter:drop-shadow(0 1px 2px rgba(0,0,0,.35))"></circle></g>`}
      </svg>
      <div class="face">
        <div class="t">${t.toFixed(this.step<1?1:0)}<small>°</small></div>
        <div class="sub">${this.label}</div>
      </div>
    </div>`}};Dr.styles=r`
    :host {
      display: block;
      width: min(300px, 70vw);
      aspect-ratio: 1;
      touch-action: none;
      user-select: none;
      -webkit-user-select: none;
    }
    .wrap {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      cursor: grab;
      outline: none;
    }
    .wrap:focus-visible {
      box-shadow: 0 0 0 3px var(--accent);
    }
    .face {
      position: absolute;
      inset: 14%;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 25%, color-mix(in srgb, var(--surface-solid) 85%, white), var(--surface-solid) 60%);
      box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.35), inset 0 2px 0 rgba(255, 255, 255, 0.35), 0 0 60px -10px var(--glow);
      display: grid;
      place-content: center;
      text-align: center;
      transition: box-shadow 600ms;
    }
    .t {
      font-size: clamp(44px, 16cqi, 64px);
      font-weight: var(--display-weight, 700);
      letter-spacing: var(--display-track, 0);
      line-height: 1;
      direction: ltr;
      color: var(--text);
    }
    .t small {
      font-size: 0.4em;
      vertical-align: top;
      margin-left: 2px;
    }
    .sub {
      margin-top: 6px;
      font-size: 13px;
      color: var(--text-2);
    }
    svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      overflow: visible;
    }
    .knob {
      transition: transform 120ms cubic-bezier(0.22, 1, 0.36, 1);
    }
    .wrap {
      container-type: inline-size;
    }
  `,Vr([gt({type:Number})],Dr.prototype,"value",2),Vr([gt({type:Number})],Dr.prototype,"min",2),Vr([gt({type:Number})],Dr.prototype,"max",2),Vr([gt({type:Number})],Dr.prototype,"step",2),Vr([gt({type:Number})],Dr.prototype,"current",2),Vr([gt()],Dr.prototype,"mode",2),Vr([gt()],Dr.prototype,"label",2),Vr([gt({attribute:!1})],Dr.prototype,"onCommit",2),Vr([mt()],Dr.prototype,"drag",2),Dr=Vr([pt("sn-dial")],Dr);var Or=Object.defineProperty,Tr=Object.getOwnPropertyDescriptor,jr=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Tr(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&Or(e,i,a),a};let Pr=class extends ct{constructor(){super(...arguments),this.entity="",this.all=[]}async connectedCallback(){super.connectedCallback();const t=await Os(this.ctx.hass,"ac_week");this.all=t?.plans??[],this.plan=this.all.find((t=>t.entity===this.entity))??{entity:this.entity,on:!0,hours:[0,0,0,0,0,0,0],temp:23,mode:"cool"}}save(){const t=this.plan;this.all=[...this.all.filter((e=>e.entity!==t.entity)),t],Ts(this.ctx.hass,"ac_week",{plans:this.all}).catch((()=>this.ctx.toast(this.ctx.t("error"))))}set(t,e,i){const s=this.plan,n=[...s.hours],a=1<<e,o=i?n[t]|a:n[t]&~a;o!==n[t]&&(n[t]=o,ki("tick"),this.plan={...s,hours:n})}cellAt(t){const e=this.renderRoot.elementFromPoint(t.clientX,t.clientY),i=e?.dataset.d;return void 0===i?void 0:[Number(i),Number(e.dataset.h)]}render(){const{ctx:t}=this,{t:e}=t,i=this.plan;if(!i)return B`<sn-skeleton></sn-skeleton>`;const s=(t.hass.states[this.entity]?.attributes.hvac_modes??["cool","heat"]).filter((t=>"off"!==t));return B`<span class="hint" style="margin:0">${e("acw_hint")}</span>
      <div
        class="grid"
        @pointerdown=${t=>{const e=this.cellAt(t);if(e){try{t.currentTarget.setPointerCapture(t.pointerId)}catch{}this.paint=!(i.hours[e[0]]>>e[1]&1),this.set(e[0],e[1],this.paint)}}}
        @pointermove=${t=>{if(void 0===this.paint)return;const e=this.cellAt(t);e&&this.set(e[0],e[1],this.paint)}}
        @pointerup=${()=>{void 0!==this.paint&&this.save(),this.paint=void 0}}
        @pointercancel=${()=>this.paint=void 0}
      >
        <span></span>
        ${Array.from({length:24},((t,e)=>B`<span class="h">${e%3==0?e:""}</span>`))}
        ${Array.from({length:7},((e,s)=>{return[B`<span class="d">${n=s,new Date(2023,0,1+n).toLocaleDateString(Ot[t.lang],{weekday:"short"})}</span>`,...Array.from({length:24},((t,e)=>B`<span class="c ${i.hours[s]>>e&1?"on":""} ${"heat"===i.mode?"heat":""}" data-d=${s} data-h=${e}></span>`))];var n}))}
      </div>
      <div class="row">
        <div class="seg">
          ${s.map((t=>B`<button aria-pressed=${i.mode===t} @click=${()=>(this.plan={...i,mode:t},this.save())}>${e(t)}</button>`))}
        </div>
        <input type="number" min="16" max="30" step="0.5" .value=${String(i.temp)} @change=${t=>(this.plan={...i,temp:Number(t.target.value)||23},this.save())} />°
        <div class="seg">
          ${[!0,!1].map((t=>B`<button aria-pressed=${i.on===t} @click=${()=>(this.plan={...i,on:t},this.save())}>${e(t?"on":"off")}</button>`))}
        </div>
      </div>`}};Pr.styles=[fi,r`
      :host {
        display: grid;
        gap: 14px;
      }
      .grid {
        display: grid;
        grid-template-columns: 34px repeat(24, minmax(10px, 1fr));
        gap: 2px;
        touch-action: none;
        user-select: none;
        direction: ltr;
      }
      .h {
        font-size: 10px;
        color: var(--text-2);
        text-align: center;
      }
      .d {
        font-size: 12px;
        color: var(--text-2);
        align-self: center;
      }
      .c {
        height: 26px;
        border-radius: 5px;
        background: var(--surface-2);
        transition: background 120ms;
      }
      .c.on {
        background: #3a9bff;
      }
      .c.on.heat {
        background: #ff8a3d;
      }
      .row {
        display: flex;
        gap: 10px;
        align-items: center;
        flex-wrap: wrap;
      }
      .row input[type="number"] {
        width: 90px;
      }
    `],jr([gt({attribute:!1})],Pr.prototype,"ctx",2),jr([gt()],Pr.prototype,"entity",2),jr([mt()],Pr.prototype,"plan",2),jr([mt()],Pr.prototype,"all",2),Pr=jr([pt("sn-ac-week")],Pr);var Ir=Object.defineProperty,Er=Object.getOwnPropertyDescriptor,Nr=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Er(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&Ir(e,i,a),a};const Wr={off:"power",cool:"snowflake",heat:"fire",fan_only:"fan",dry:"water-percent",auto:"thermostat-auto",heat_cool:"thermostat-auto"};let Rr=class extends ct{disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this.timer)}get entity(){return this.widget.config.entity??Object.keys(this.ctx.hass.states).find((t=>t.startsWith("climate.")))}set(t){this.pending=t,window.clearTimeout(this.timer),this.timer=window.setTimeout((()=>{this.ctx.hass.callService("climate","set_temperature",{entity_id:this.entity,temperature:t}).catch((()=>this.ctx.toast(this.ctx.t("error")))),window.setTimeout((()=>this.pending=void 0),1500)}),600)}render(){const{ctx:t}=this,{t:e,hass:i,config:s,lang:n}=t,a=this.entity,o=a?i.states[a]:void 0;if(!a||!o)return B`<div class="card glass"><sn-empty text=${e("no_entities")}></sn-empty></div>`;const r=o.attributes,l=this.pending??("number"==typeof r.temperature?r.temperature:void 0),c=r.target_temp_step??.5,[d,p]=[r.min_temp??16,r.max_temp??30],h=(r.hvac_modes??[]).filter((t=>Wr[t])),u="number"==typeof r.current_temperature?r.current_temperature:void 0,g="off"!==o.state&&"unavailable"!==o.state;return B`<div class="card glass">
      <div class="head" @click=${()=>t.openEntity(a,this)}>
        <sn-icon icon=${Wr[o.state]??"thermostat"} style="--icon-size:20px;color:${g?"var(--accent-text)":"var(--text-2)"}"></sn-icon>
        <b>${ie(i,s,a)}</b>
        ${void 0!==u?B`<span>${e("current_temp")} <sn-num .value=${ue(`${ge(u,n)}°`)}></sn-num></span>`:U}
        ${t.allows("ac_week")?B`<button
              class="icon-btn small pressable"
              aria-label=${e("acw_title")}
              title=${e("acw_title")}
              @click=${n=>(n.stopPropagation(),((t,e,i)=>t.showSheet({still:!0,title:i,render:t=>B`<sn-ac-week .ctx=${t} .entity=${e}></sn-ac-week>`}))(t,a,`${e("acw_title")} · ${ie(i,s,a)}`))}
            >
              <sn-icon icon="calendar" style="--icon-size:18px"></sn-icon>
            </button>`:U}
      </div>
      <div class="mid">
        ${g&&void 0!==l?t.allows("dial")?B`<sn-dial
              .value=${l}
              .min=${d}
              .max=${p}
              .step=${c}
              .current=${u}
              .mode=${"heat"===o.state?"heat":"auto"===o.state||"heat_cool"===o.state?"auto":"cool"}
              label=${Dt(o.state)?e(o.state):o.state}
              .onCommit=${t=>this.set(t)}
            ></sn-dial>`:B`<div class="big">
              <button class="icon-btn pressable" aria-label="-" @click=${()=>this.set(Math.max(d,l-c))}><sn-icon icon="minus"></sn-icon></button>
              <span class="v ltr"><sn-num .value=${`${ge(l,n)}°`}></sn-num></span>
              <button class="icon-btn pressable" aria-label="+" @click=${()=>this.set(Math.min(p,l+c))}><sn-icon icon="plus"></sn-icon></button>
            </div>`:B`<span class="off">${e("off")}</span>`}
      </div>
      <div class="modes">
        ${h.map((s=>B`<button
            class=${s}
            aria-pressed=${o.state===s}
            aria-label=${Dt(s)?e(s):s}
            title=${Dt(s)?e(s):s}
            @click=${()=>i.callService("climate","set_hvac_mode",{entity_id:a,hvac_mode:s}).catch((()=>t.toast(e("error"))))}
          >
            <sn-icon icon=${Wr[s]}></sn-icon>
          </button>`))}
      </div>
    </div>`}};Rr.styles=[fi,r`
      :host {
        display: block;
        height: 100%;
      }
      .card {
        height: 100%;
        border-radius: var(--r-lg);
        padding: 16px;
        display: grid;
        grid-template-rows: auto 1fr auto;
        gap: 10px;
        overflow: hidden;
      }
      .head {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
      }
      .head b {
        flex: 1;
        font-size: 16px;
      }
      .head span {
        font-size: 14px;
        color: var(--text-2);
      }
      .mid {
        display: grid;
        place-items: center;
        min-height: 0;
        container-type: size;
      }
      /* As big as the card allows, in both directions. */
      sn-dial {
        width: min(100cqw, 100cqh, 220px);
      }
      .big {
        display: flex;
        align-items: center;
        gap: 18px;
      }
      .big .v {
        font-size: 52px;
        font-weight: var(--display-weight, 700);
        line-height: 1;
      }
      .off {
        font-size: 22px;
        color: var(--text-2);
      }
      .modes {
        display: flex;
        gap: 6px;
        justify-content: center;
        flex-wrap: wrap;
      }
      .modes button {
        width: 44px;
        height: 44px;
        border-radius: 14px;
        border: 0;
        background: var(--surface-2);
        color: var(--text-2);
        display: grid;
        place-items: center;
        cursor: pointer;
        --icon-size: 22px;
      }
      .modes button[aria-pressed="true"] {
        background: var(--accent);
        color: var(--on-accent);
      }
      .modes button.cool[aria-pressed="true"] {
        background: #3a86ff;
        color: #fff;
      }
      .modes button.off[aria-pressed="true"] {
        background: var(--text-2);
        color: var(--bg);
      }
    `],Nr([gt({attribute:!1})],Rr.prototype,"ctx",2),Nr([gt({attribute:!1})],Rr.prototype,"widget",2),Nr([mt()],Rr.prototype,"pending",2),Rr=Nr([pt("sn-w-ac")],Rr);var Fr=Object.defineProperty,Br=Object.getOwnPropertyDescriptor,Zr=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Br(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&Fr(e,i,a),a};let qr=class extends ct{devices(){const{hass:t}=this.ctx,e=this.widget.config;return Array.isArray(e.entities)&&e.entities.length?e.entities.filter((e=>t.states[e])):e.area?Object.keys(t.states).filter((i=>Ve(t,i)===e.area&&!t.entities?.[i]?.entity_category&&!t.entities?.[i]?.hidden)):[]}openSheet(){const t=this.devices().filter((t=>["light","switch","climate","cover","fan","media_player","lock","sensor","binary_sensor"].includes(ee(t))));this.ctx.showSheet({title:this.roomTitle,origin:this.renderRoot.querySelector(".card")??void 0,render:e=>B`<div style="display:grid;gap:8px">
        ${t.map((t=>{const i=e.hass.states[t];return B`<button
            class="glass pressable"
            style="display:flex;align-items:center;gap:12px;padding:10px 14px;border-radius:var(--r-md);text-align:start"
            @click=${i=>e.openEntity(t,i.currentTarget)}
          >
            <sn-icon .icon=${oe(i,t)} style="--icon-size:22px;color:${ne(i)?"var(--accent-text)":"var(--text-2)"}"></sn-icon>
            <span style="flex:1;font-weight:500">${ie(e.hass,e.config,t)}</span>
            <span class="muted" style="font-size:14px;unicode-bidi:plaintext">${be(e.t,i,e.lang)}</span>
          </button>`}))}
      </div>`})}get roomTitle(){const t=this.widget.config;return t.name||(t.area?this.ctx.hass.areas?.[t.area]?.name:"")||this.ctx.t("widget_room")}render(){const{ctx:t}=this,{hass:e,lang:i}=t,s=this.devices(),n=s.filter((t=>"light"===ee(t))),a=n.filter((t=>"on"===e.states[t]?.state)),o=s.map((t=>e.states[t])).find((t=>"temperature"===t?.attributes.device_class&&"sensor"===ee(t.entity_id))),r=s.map((t=>e.states[t])).find((t=>"humidity"===t?.attributes.device_class&&"sensor"===ee(t.entity_id))),l=s.find((t=>"climate"===ee(t))),c=l&&ne(e.states[l]),d=a.map((t=>e.states[t].attributes.rgb_color)).find(Array.isArray)??[255,190,120],p=this.widget.config.photo;return B`<div
      class="card ${a.length?"lit":""} ${!a.length&&t.dark?"dark":""}"
      style="--glow:rgb(${d.join(",")})"
      role="button"
      tabindex="0"
      aria-label=${this.roomTitle}
      @click=${()=>this.openSheet()}
    >
      ${p?B`<div class="photo" style="background-image:url('${p}')"></div>`:U}
      <div class="glow"></div>
      <div class="quick" @click=${t=>t.stopPropagation()}>
        ${l?B`<button class=${c?"on":""} aria-label=${ie(e,t.config,l)} @click=${()=>e.callService("climate",c?"turn_off":"turn_on",{entity_id:l}).catch((()=>{}))}>
              <sn-icon icon="air-conditioner" style="--icon-size:20px"></sn-icon>
            </button>`:U}
        ${n.length?B`<button
              class=${a.length?"on":""}
              aria-label=${t.t(a.length?"room_lights_off":"room_lights_on")}
              @click=${()=>e.callService("light",a.length?"turn_off":"turn_on",{entity_id:n}).catch((()=>{}))}
            >
              <sn-icon icon=${a.length?"lightbulb":"lightbulb-outline"} style="--icon-size:20px"></sn-icon>
            </button>`:U}
      </div>
      <div class="body">
        <h3>${this.roomTitle}</h3>
        <div class="meta">
          ${o?B`<span><sn-icon icon="thermometer" style="--icon-size:16px"></sn-icon>${ue(`${ge(Number(o.state),i,1)}°`)}</span>`:U}
          ${r?B`<span><sn-icon icon="humidity" style="--icon-size:16px"></sn-icon>${ue(`${ge(Number(r.state),i,0)}%`)}</span>`:U}
          ${n.length?B`<span><sn-icon icon="lightbulb" style="--icon-size:16px"></sn-icon>${a.length}/${n.length}</span>`:U}
        </div>
      </div>
    </div>`}};qr.styles=[fi,r`
      :host {
        display: block;
        height: 100%;
      }
      .card {
        position: relative;
        height: 100%;
        border-radius: var(--r-xl, 32px);
        overflow: hidden;
        color: #fff;
        cursor: pointer;
        background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 55%, #1e252b), #1e252b);
        box-shadow: var(--shadow);
        isolation: isolate;
      }
      .photo {
        position: absolute;
        inset: 0;
        background-size: cover;
        background-position: center;
        z-index: -2;
        transition: transform 1.2s cubic-bezier(0.22, 1, 0.36, 1), filter 800ms;
      }
      .card:hover .photo {
        transform: scale(1.04);
      }
      .card.dark .photo {
        filter: brightness(0.55) saturate(0.7);
      }
      .card::after {
        content: "";
        position: absolute;
        inset: 0;
        z-index: -1;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.05) 30%, rgba(0, 0, 0, 0.7));
      }
      .glow {
        position: absolute;
        inset: auto -20% -40% -20%;
        height: 80%;
        z-index: -1;
        background: radial-gradient(ellipse at 50% 100%, var(--glow), transparent 65%);
        opacity: 0;
        transition: opacity 800ms;
      }
      .card.lit .glow {
        opacity: 0.55;
      }
      .body {
        position: absolute;
        inset: auto 0 0 0;
        padding: 16px 18px;
        display: grid;
        gap: 8px;
      }
      h3 {
        margin: 0;
        font-size: clamp(18px, 2.4vw, 24px);
        font-weight: var(--display-weight, 700);
        letter-spacing: var(--display-track, 0);
        text-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
      }
      .meta {
        display: flex;
        gap: 12px;
        font-size: 14px;
        opacity: 0.9;
        flex-wrap: wrap;
      }
      .meta span {
        display: flex;
        gap: 4px;
        align-items: center;
        direction: ltr;
      }
      .quick {
        position: absolute;
        top: 12px;
        inset-inline-end: 12px;
        display: flex;
        gap: 8px;
      }
      .quick button {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: rgba(255, 255, 255, 0.18);
        -webkit-backdrop-filter: blur(14px);
        backdrop-filter: blur(14px);
        color: #fff;
        transition: background 300ms, color 300ms, transform 200ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .quick button.on {
        background: #ffd27a;
        color: #3a2a10;
      }
      .quick button:active {
        transform: scale(0.9);
      }
    `],Zr([gt({attribute:!1})],qr.prototype,"ctx",2),Zr([gt({attribute:!1})],qr.prototype,"widget",2),qr=Zr([pt("sn-w-room")],qr);const Ur=Symbol.for(""),Yr=t=>{if(t?.r===Ur)return t?._$litStatic$},Xr=t=>({_$litStatic$:t,r:Ur}),Kr=new Map,Gr=(Jr=B,(t,...e)=>{const i=e.length;let s,n;const a=[],o=[];let r,l=0,c=!1;for(;l<i;){for(r=t[l];l<i&&void 0!==(n=e[l],s=Yr(n));)r+=s+t[++l],c=!0;l!==i&&o.push(n),a.push(r),l++}if(l===i&&a.push(t[i]),c){const i=a.join("$$lit$$");void 0===(t=Kr.get(i))&&(a.raw=a,Kr.set(i,t=a)),e=o}return Jr(t,...e)});var Jr;const Qr=bt(class extends _t{constructor(){super(...arguments),this.key=U}render(t,e){return this.key=t,e}update(t,[e,i]){return e!==this.key&&(kt(t),this.key=e),i}});var tl=Object.defineProperty,el=Object.getOwnPropertyDescriptor,il=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?el(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&tl(e,i,a),a};const sl=[{type:"forecast",from:5},{type:"energy_stats",from:11},{type:"media",from:17},{type:"check",from:21}];let nl=class extends ct{constructor(){super(...arguments),this.swipeDir=1}get slots(){return(this.widget.config.slots?.length?this.widget.config.slots:sl).filter((t=>this.ctx.allows(`w_${t.type}`)))}get auto(){const t=(new Date).getHours(),e=this.slots;let i=0,s=-1;return e.forEach(((e,n)=>{const a=e.from<=t?e.from:e.from-24;a>s&&(s=a,i=n)})),i}go(t,e){const i=this.slots.length;this.swipeDir=e,this.manual=(t%i+i)%i,window.clearTimeout(this.reset),this.reset=window.setTimeout((()=>this.manual=void 0),6e4)}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this.reset)}render(){const t=this.slots;if(!t.length)return U;const e=this.manual??this.auto,i=t[e],s=Xr(`sn-w-${i.type.replace(/_/g,"-")}`),n={...this.widget,id:`${this.widget.id}-${i.type}`,type:i.type,config:this.widget.config[i.type]??{}};return B`${Qr(e,B`<div
        class="slot ${this.swipeDir<0?"up":""}"
        @pointerdown=${t=>this.startY=t.clientY}
        @pointerup=${t=>{if(void 0===this.startY)return;const i=t.clientY-this.startY;this.startY=void 0,Math.abs(i)>50&&this.go(e+(i<0?1:-1),i<0?1:-1)}}
      >
        ${Gr`<${s} .ctx=${this.ctx} .widget=${n}></${s}>`}
      </div>`)}
      ${t.length>1?B`<div class="dots">${t.map(((t,i)=>B`<button aria-pressed=${i===e} aria-label=${String(i+1)} @click=${()=>this.go(i,i>e?1:-1)}></button>`))}</div>`:U}`}};nl.styles=[fi,r`
      :host {
        display: block;
        height: 100%;
        position: relative;
      }
      .slot {
        height: 100%;
        animation: in 480ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .slot.up {
        animation-name: in-up;
      }
      .dots {
        position: absolute;
        inset-inline-end: -10px;
        top: 50%;
        translate: 0 -50%;
        display: grid;
        gap: 5px;
        z-index: 2;
      }
      .dots button {
        width: 6px;
        height: 6px;
        border-radius: 3px;
        background: var(--text-2);
        opacity: 0.35;
        transition: height 300ms cubic-bezier(0.22, 1, 0.36, 1), opacity 300ms;
      }
      .dots button[aria-pressed="true"] {
        height: 16px;
        opacity: 0.9;
      }
      @keyframes in {
        from {
          opacity: 0;
          transform: translateY(18px) scale(0.97);
        }
      }
      @keyframes in-up {
        from {
          opacity: 0;
          transform: translateY(-18px) scale(0.97);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .slot {
          animation: none;
        }
      }
    `],il([gt({attribute:!1})],nl.prototype,"ctx",2),il([gt({attribute:!1})],nl.prototype,"widget",2),il([mt()],nl.prototype,"manual",2),il([mt()],nl.prototype,"swipeDir",2),nl=il([pt("sn-w-stack")],nl);var al=Object.defineProperty,ol=Object.getOwnPropertyDescriptor,rl=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?ol(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&al(e,i,a),a};let ll=class extends ct{sentence(){const{ctx:t}=this,{t:e}=t,i=Zs(t),s=i.find((t=>"alert"===t.tone));if(s)return{text:s.label,tone:"warn"};const n=i.filter((t=>["lights","climate","appliance","arrival","open"].includes(t.type))).map((t=>t.label));return{text:n.length?`${e("hero_ok")} · ${n.slice(0,2).join(" · ")}`:e("hero_all_quiet"),tone:"ok"}}render(){const{ctx:t}=this,{t:e,hass:i,config:s,lang:n}=t,a=Rs(s).map((t=>i.states[t])).find((t=>t&&"temperature"===t.attributes.device_class&&"sensor"===ee(t.entity_id)&&!/out|خارج/.test(t.entity_id))),o=s.settings.power_entity,r=o?i.states[o]:void 0,l=Object.values(i.states).filter((t=>t.entity_id.startsWith("person.")&&"home"===t.state)),c=this.sentence(),d=Pn(i,s.settings.greeting_name);return B`<div class="card glass">
      <div>
        <p class="hi">${e(jn(new Date))}${d?("ar"===n?"، ":", ")+d:""}</p>
        <h2><span class=${c.tone}>${"ok"===c.tone?"●":"▲"}</span> ${c.text}</h2>
      </div>
      <div class="stats">
        ${a?B`<div class="stat"><b><sn-num .value=${ue(`${ge(Number(a.state),n,1)}°`)}></sn-num></b><span><sn-icon icon="thermometer" style="--icon-size:14px"></sn-icon>${e("hero_inside")}</span></div>`:U}
        ${r?B`<div class="stat"><b><sn-num .value=${ue(Number(r.state)>=1e3?`${ge(Number(r.state)/1e3,n,1)} kW`:`${ge(Number(r.state),n,0)} W`)}></sn-num></b><span><sn-icon icon="lightning-bolt" style="--icon-size:14px"></sn-icon>${e("now")}</span></div>`:U}
        ${l.length?B`<div class="stat" title=${l.map((t=>ie(i,s,t.entity_id))).join("، ")}><b>${l.length}</b><span><sn-icon icon="family" style="--icon-size:14px"></sn-icon>${e("hero_home")}</span></div>`:U}
      </div>
    </div>`}};ll.styles=[fi,r`
      :host {
        display: block;
        height: 100%;
      }
      .card {
        height: 100%;
        border-radius: var(--r-xl);
        padding: clamp(18px, 3cqi, 32px);
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: end;
        gap: 18px;
        overflow: hidden;
        position: relative;
        container-type: inline-size;
      }
      .card::before {
        content: "";
        position: absolute;
        inset: -40% -10% auto auto;
        width: 70%;
        aspect-ratio: 1;
        border-radius: 50%;
        background: radial-gradient(circle, color-mix(in srgb, var(--leak, var(--accent)) 30%, transparent), transparent 65%);
        pointer-events: none;
      }
      .hi {
        font-size: clamp(15px, 2.2cqi, 19px);
        color: var(--text-2);
        margin: 0 0 6px;
      }
      h2 {
        margin: 0;
        font-size: clamp(24px, 4.6cqi, 44px);
        line-height: 1.15;
        font-weight: var(--display-weight, 700);
        letter-spacing: var(--display-track, 0);
        text-wrap: balance;
      }
      h2 .ok {
        color: var(--success);
      }
      h2 .warn {
        color: var(--alert-text);
      }
      .stats {
        display: flex;
        gap: clamp(14px, 3cqi, 30px);
      }
      .stat {
        display: grid;
        gap: 2px;
        justify-items: center;
        text-align: center;
      }
      .stat b {
        font-size: clamp(22px, 3.6cqi, 34px);
        font-weight: var(--display-weight, 700);
        letter-spacing: var(--display-track, 0);
      }
      .stat span {
        font-size: 12px;
        color: var(--text-2);
        display: flex;
        gap: 4px;
        align-items: center;
      }
      @container (max-width: 520px) {
        .card {
          grid-template-columns: 1fr;
        }
      }
    `],rl([gt({attribute:!1})],ll.prototype,"ctx",2),rl([gt({attribute:!1})],ll.prototype,"widget",2),ll=rl([pt("sn-w-hero")],ll);var cl=Object.defineProperty,dl=Object.getOwnPropertyDescriptor,pl=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?dl(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&cl(e,i,a),a};const hl={"In Transit":"🚚",Delivered:"✅",Undelivered:"⚠️",Expired:"⌛","Ready to be picked up":"📬",Alert:"⚠️","Not Found":"❔"};let ul=class extends ct{constructor(){super(...arguments),this.missing=!1}connectedCallback(){super.connectedCallback(),this.load(),this.timer=window.setInterval((()=>this.load()),18e5)}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this.timer)}async load(){const{hass:t}=this.ctx;try{const e=await t.callWS({type:"smartnest/parcels"});this.pkgs=e.packages,this.missing=!1}catch{this.missing=!0}}render(){const{t:t}=this.ctx,e=(this.pkgs??[]).filter((t=>"Delivered"!==t.status||t.timestamp&&Date.now()-Date.parse(t.timestamp)<2592e5));return B`<div class="card glass">
      <h3><sn-icon icon="package" style="--icon-size:20px;color:var(--accent-text)"></sn-icon>${t("widget_parcels")}</h3>
      ${this.missing?B`<span class="muted" style="font-size:14px">${t("parcels_missing")}</span>`:this.pkgs?e.length?e.map((t=>B`<div class="p">
              <span class="i">${hl[t.status??""]??"📦"}</span>
              <b>${t.friendly_name||t.tracking_number}</b>
              <span>${[t.info_text,t.location].filter(Boolean).join(" · ")||t.status}</span>
            </div>`)):B`<span class="muted">${t("parcels_none")}</span>`:B`<sn-skeleton></sn-skeleton>`}
      ${U}
    </div>`}};ul.styles=[fi,r`
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
    `],pl([gt({attribute:!1})],ul.prototype,"ctx",2),pl([gt({attribute:!1})],ul.prototype,"widget",2),pl([mt()],ul.prototype,"pkgs",2),pl([mt()],ul.prototype,"missing",2),ul=pl([pt("sn-w-parcels")],ul);var gl=Object.defineProperty,ml=Object.getOwnPropertyDescriptor,fl=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?ml(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&gl(e,i,a),a};let bl=class extends ct{render(){const{ctx:t}=this,{t:e,hass:i,config:s,lang:n}=t,a=this.widget.config.entities??[],o=(t=>Object.values(t.hass.states).filter((e=>{if(!e.entity_id.startsWith("sensor."))return!1;const i=t.hass.entities?.[e.entity_id]?.platform??"";return["waze_travel_time","google_travel_time","here_travel_time"].includes(i)||/waze|google maps/i.test(String(e.attributes.attribution??""))})))(t).filter((t=>!a.length||a.includes(t.entity_id)));return B`<div class="card glass">
      <h3><sn-icon icon="car" style="--icon-size:20px;color:var(--accent-text)"></sn-icon>${e("widget_commute")}</h3>
      ${o.length?o.map((t=>{const a=Number(t.state),o=Number(t.attributes.duration??t.attributes.duration_in_traffic??NaN),r=Number.isNaN(o)||!o?1:a/o;return B`<div class="route">
              <span class="bar" style="background:${r>1.4?"var(--alert)":r>1.15?"#e9971d":"var(--success)"}"></span>
              <span class="nm"><b>${ie(i,s,t.entity_id)}</b><span>${t.attributes.route??""}</span></span>
              <span class="min"><sn-num .value=${ge(a,n,0)}></sn-num> <small>${e("minutes")}</small></span>
            </div>`})):B`<span class="muted" style="font-size:14px">${e("commute_missing")}</span>`}
      ${U}
    </div>`}};bl.styles=[fi,r`
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
    `],fl([gt({attribute:!1})],bl.prototype,"ctx",2),fl([gt({attribute:!1})],bl.prototype,"widget",2),bl=fl([pt("sn-w-commute")],bl);var _l=Object.defineProperty,yl=Object.getOwnPropertyDescriptor,vl=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?yl(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&_l(e,i,a),a};let xl=class extends ct{render(){const t=this.ctx.hass.config??{},e=t.latitude??31.9,i=t.longitude??35.2,s=this.widget.config.zoom??7,n=this.ctx.dark?1:0,a=`https://www.rainviewer.com/map.html?loc=${e.toFixed(3)},${i.toFixed(3)},${s}&oFa=0&oC=1&oU=0&oCS=1&oF=0&oAP=1&c=3&o=83&lm=${n}&layer=radar&sm=1&sn=1`;return B`<div class="card glass">
      <span class="tag"><sn-icon icon="weather-pouring" style="--icon-size:18px"></sn-icon>${this.ctx.t("widget_radar")}</span>
      <iframe src=${a} title=${this.ctx.t("widget_radar")} loading="lazy" referrerpolicy="no-referrer" sandbox="allow-scripts allow-same-origin"></iframe>
    </div>`}};xl.styles=[fi,r`
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
    `],vl([gt({attribute:!1})],xl.prototype,"ctx",2),vl([gt({attribute:!1})],xl.prototype,"widget",2),xl=vl([pt("sn-w-radar")],xl);var wl=Object.defineProperty,$l=Object.getOwnPropertyDescriptor,kl=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?$l(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&wl(e,i,a),a};const Cl=[["فَإِنَّ مَعَ الْعُسْرِ يُسْرًا","الشرح ٥"],["وَقُل رَّبِّ زِدْنِي عِلْمًا","طه ١١٤"],["أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ","الرعد ٢٨"],["وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ","الطلاق ٣"],["إِنَّ اللَّهَ مَعَ الصَّابِرِينَ","البقرة ١٥٣"],["فَاذْكُرُونِي أَذْكُرْكُمْ","البقرة ١٥٢"],["وَاللَّهُ يُحِبُّ الْمُحْسِنِينَ","آل عمران ١٣٤"],["لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا","البقرة ٢٨٦"],["وَقُولُوا لِلنَّاسِ حُسْنًا","البقرة ٨٣"],["إِنَّ رَحْمَتَ اللَّهِ قَرِيبٌ مِّنَ الْمُحْسِنِينَ","الأعراف ٥٦"],["وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ","الحديد ٤"],["لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ","إبراهيم ٧"],["وَاصْبِرْ فَإِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ","هود ١١٥"],["رَبِّ اشْرَحْ لِي صَدْرِي","طه ٢٥"],["وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ","هود ٨٨"],["ادْعُونِي أَسْتَجِبْ لَكُمْ","غافر ٦٠"],["وَرَحْمَتِي وَسِعَتْ كُلَّ شَيْءٍ","الأعراف ١٥٦"],["وَلَا تَيْأَسُوا مِن رَّوْحِ اللَّهِ","يوسف ٨٧"],["وَاللَّهُ خَيْرُ الرَّازِقِينَ","الجمعة ١١"],["رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ","البقرة ٢٠١"],["وَبِالْوَالِدَيْنِ إِحْسَانًا","الإسراء ٢٣"],["إِنَّ اللَّهَ لَا يُغَيِّرُ مَا بِقَوْمٍ حَتَّىٰ يُغَيِّرُوا مَا بِأَنفُسِهِمْ","الرعد ١١"],["وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ","المائدة ٢"],["وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ","البقرة ١٨٦"],["حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ","آل عمران ١٧٣"],["وَعَسَىٰ أَن تَكْرَهُوا شَيْئًا وَهُوَ خَيْرٌ لَّكُمْ","البقرة ٢١٦"],["إِنَّ الْحَسَنَاتِ يُذْهِبْنَ السَّيِّئَاتِ","هود ١١٤"],["وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ","الضحى ٥"],["وَأَحْسِن كَمَا أَحْسَنَ اللَّهُ إِلَيْكَ","القصص ٧٧"],["إِنَّ اللَّهَ لَطِيفٌ بِعِبَادِهِ","الشورى ١٩"]];let Ml=class extends ct{render(){const{lang:t}=this.ctx,e=new Date,i=Math.floor((e.getTime()-6e4*e.getTimezoneOffset())/864e5),[s,n]=Cl[i%Cl.length],a=e.toLocaleDateString(("en"===t?"en":"he"===t?"he":"ar-SA")+"-u-ca-islamic-umalqura-nu-latn",{day:"numeric",month:"long",year:"numeric"}),o=e.toLocaleDateString("ar"===t?"ar-u-nu-latn":t,{weekday:"long",day:"numeric",month:"long"});return B`<div class="card glass">
      <div><div class="hijri">${a}</div><div class="greg">${o}</div></div>
      <div class="verse">﴿${s}﴾</div>
      <div class="ref">${n}</div>
    </div>`}};Ml.styles=[fi,r`
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
    `],kl([gt({attribute:!1})],Ml.prototype,"ctx",2),kl([gt({attribute:!1})],Ml.prototype,"widget",2),Ml=kl([pt("sn-w-verse")],Ml);var Hl=Object.defineProperty,Al=Object.getOwnPropertyDescriptor,Ll=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Al(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&Hl(e,i,a),a};const Vl=["#fff4b8","#ffd6e0","#d4f2e2","#d8e8ff","#eadcff"],Sl=["#1d1d1f","#e5484d","#3a86ff","#2bb673"];let zl=class extends ct{constructor(){super(...arguments),this.board={notes:[]},this.mode="",this.color=Vl[0],this.ink=Sl[0],this.strokes=[]}connectedCallback(){super.connectedCallback(),Os(this.ctx.hass,"board").then((t=>this.board={notes:t?.notes??[]})),this.unwatch=js(this.ctx.hass,"board",(t=>this.board={notes:t?.notes??[]}))}disconnectedCallback(){super.disconnectedCallback(),this.unwatch?.then((t=>t())).catch((()=>{}))}save(t){this.board={notes:t.slice(0,24)},Ts(this.ctx.hass,"board",this.board).catch((()=>this.ctx.toast(this.ctx.t("error"))))}add(t){this.save([{...t,id:Ie(),by:this.ctx.hass.user?.name??"",at:(new Date).toISOString()},...this.board.notes]),this.mode="",this.strokes=[]}pt(t){const e=t.currentTarget.getBoundingClientRect();return[Math.round((t.clientX-e.left)/e.width*1e3),Math.round((t.clientY-e.top)/e.height*1e3)]}down(t){t.currentTarget.setPointerCapture(t.pointerId),this.current=this.pt(t),this.strokes=[...this.strokes,this.current]}move(t){if(!this.current)return;const[e,i]=this.pt(t),s=this.current.length;Math.abs(e-this.current[s-2])+Math.abs(i-this.current[s-1])<10||(this.current.push(e,i),this.strokes=[...this.strokes])}path(t){let e=`M${t[0]} ${t[1]}`;for(let i=2;i<t.length;i+=2)e+=`L${t[i]} ${t[i+1]}`;return 2===t.length?`${e}l0.1 0`:e}drawing(t,e){return Z`${t.map((t=>Z`<path d=${this.path(t)} fill="none" stroke=${e} stroke-width="14" stroke-linecap="round" stroke-linejoin="round"></path>`))}`}renderEditor(){const{t:t}=this.ctx;return B`<div class="editor">
      <div class="swatches">
        ${Vl.map((t=>B`<button class="sw" style="background:${t}" aria-pressed=${this.color===t} @click=${()=>this.color=t}></button>`))}
        ${"draw"===this.mode?B`<span style="width:12px"></span>${Sl.map((t=>B`<button class="sw" style="background:${t}" aria-pressed=${this.ink===t} @click=${()=>this.ink=t}></button>`))}`:U}
      </div>
      ${"text"===this.mode?B`<textarea id="txt" maxlength="200" placeholder=${t("board_placeholder")} style="background:${this.color};color:#1d1d1f"></textarea>`:B`<svg
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
        ${"draw"===this.mode?B`<button class="btn pressable" @click=${()=>this.strokes=this.strokes.slice(0,-1)}>${t("undo_point")}</button>`:U}
        <button class="btn pressable" @click=${()=>(this.mode="",this.strokes=[])}>${t("cancel")}</button>
      </div>
    </div>`}render(){const{t:t}=this.ctx;return B`<div class="card glass">
      <div class="head">
        <sn-icon icon="note" style="--icon-size:20px;color:var(--accent-text)"></sn-icon>
        <h3>${t("widget_board")}</h3>
        ${this.mode?U:B`<button class="btn pressable" style="min-height:36px" @click=${()=>this.mode="text"}>📝 ${t("board_write")}</button>
              <button class="btn pressable" style="min-height:36px" @click=${()=>this.mode="draw"}>✏️ ${t("board_draw")}</button>`}
      </div>
      ${this.mode?this.renderEditor():B`<div class="notes">
            ${this.board.notes.length?this.board.notes.map((e=>B`<div class="note" style="background:${e.color}">
                    ${e.paths?B`<svg viewBox="0 0 1000 1000">${this.drawing(e.paths,e.ink??Sl[0])}</svg>`:e.text}
                    <span class="by">${e.by?`${e.by} · `:""}${_e(t,e.at)}</span>
                    <button class="x" aria-label=${t("delete")} @click=${()=>this.save(this.board.notes.filter((t=>t.id!==e.id)))}>×</button>
                  </div>`)):B`<span class="muted" style="grid-column:1/-1">${t("board_empty")}</span>`}
          </div>`}
    </div>`}};zl.styles=[fi,r`
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
    `],Ll([gt({attribute:!1})],zl.prototype,"ctx",2),Ll([gt({attribute:!1})],zl.prototype,"widget",2),Ll([mt()],zl.prototype,"board",2),Ll([mt()],zl.prototype,"mode",2),Ll([mt()],zl.prototype,"color",2),Ll([mt()],zl.prototype,"ink",2),Ll([mt()],zl.prototype,"strokes",2),zl=Ll([pt("sn-w-board")],zl);var Dl=Object.defineProperty,Ol=Object.getOwnPropertyDescriptor,Tl=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Ol(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&Dl(e,i,a),a};const jl={kids:[]};let Pl=class extends ct{constructor(){super(...arguments),this.data=jl,this.setup=!1,this.loaded=!1}connectedCallback(){super.connectedCallback(),Os(this.ctx.hass,"internet").then((t=>{this.data={...jl,...t??{}},this.loaded=!0})),this.unwatch=js(this.ctx.hass,"internet",(t=>this.data={...jl,...t??{}}))}disconnectedCallback(){super.disconnectedCallback(),this.unwatch?.then((t=>t())).catch((()=>{}))}save(t){this.data={kids:t},Ts(this.ctx.hass,"internet",this.data).catch((()=>this.ctx.toast(this.ctx.t("error"))))}patch(t,e){this.save(this.data.kids.map((i=>i.id===t?{...i,...e}:i)))}power(t,e,i){this.ctx.hass.callService("homeassistant",e?"turn_on":"turn_off",{entity_id:t.switches}).catch((()=>this.ctx.toast(this.ctx.t("error")))),this.patch(t.id,{paused_until:!e&&i?Date.now()/1e3+60*i:null})}renderSetup(){const{t:t,hass:e,config:i}=this.ctx,s=((t,e)=>t.filter((t=>{if(!t.startsWith("switch."))return!1;const i=e.entities?.[t]?.platform??"";return["unifi","fritz","tplink_omada","tplink_deco","mikrotik","asuswrt","netgear","keenetic_ndms2","ubus"].includes(i)||/internet|access|block|wifi|parental/i.test(t)})))(Object.keys(e.states),e);return B`${this.data.kids.map((n=>B`<div class="kid">
          <span class="face">${n.emoji}</span>
          <span class="name"><b>${n.name}</b></span>
          <button class="icon-btn small pressable" aria-label=${t("delete")} @click=${()=>this.save(this.data.kids.filter((t=>t.id!==n.id)))}>
            <sn-icon icon="close" style="--icon-size:16px"></sn-icon>
          </button>
          <div class="row">
            ${s.length?s.map((t=>{const s=n.switches.includes(t);return B`<button
                    class="btn pressable ${s?"primary":""}"
                    @click=${()=>this.patch(n.id,{switches:s?n.switches.filter((e=>e!==t)):[...n.switches,t]})}
                  >
                    ${ie(e,i,t)}
                  </button>`})):B`<span class="muted" style="font-size:13px">${t("net_no_router")}</span>`}
          </div>
        </div>`))}
      <form
        style="display:flex;gap:6px"
        @submit=${t=>{t.preventDefault();const e=t.currentTarget,i=e.elements.namedItem("n").value.trim(),s=e.elements.namedItem("e").value.trim()||"🧒";i&&(this.save([...this.data.kids,{id:Ie(),name:i,emoji:s,switches:[],schedule:!1,bedtime:"22:00",wake:"07:00"}]),e.reset())}}
      >
        <input name="e" placeholder="🧒" style="max-width:64px;text-align:center" />
        <input name="n" type="text" placeholder=${t("chores_kid_name")} style="flex:1" />
        <button class="icon-btn primary pressable" type="submit" aria-label=${t("add")}><sn-icon icon="plus" style="--icon-size:18px"></sn-icon></button>
      </form>`}render(){const{t:t,hass:e}=this.ctx,i=this.data.kids;return B`<div class="card glass">
      <div class="head">
        <sn-icon icon="wifi" style="--icon-size:20px;color:var(--accent-text)"></sn-icon>
        <h3>${t("widget_internet")}</h3>
        ${this.ctx.isAdmin?B`<button class="icon-btn small pressable" aria-pressed=${this.setup} aria-label=${t("settings")} @click=${()=>this.setup=!this.setup}>
              <sn-icon icon=${this.setup?"check":"cog"} style="--icon-size:18px"></sn-icon>
            </button>`:U}
      </div>
      ${this.loaded?this.setup||!i.length?this.ctx.isAdmin?this.renderSetup():B`<span class="muted">${t("net_ask_installer")}</span>`:i.map((i=>{const s=i.switches.some((t=>"on"===e.states[t]?.state)),n=i.paused_until?Math.max(1,Math.round((1e3*i.paused_until-Date.now())/6e4)):0;return B`<div class="kid">
              <span class="face ${s?"":"off"}">${i.emoji}</span>
              <span class="name"><b>${i.name}</b><span>${s?t("net_on"):n?t("net_paused_for",{n:n}):t("net_off")}</span></span>
              ${s?B`<button class="btn danger pressable" @click=${()=>this.power(i,!1)}>${t("net_stop")}</button>`:B`<button class="btn primary pressable" @click=${()=>this.power(i,!0)}>${t("net_allow")}</button>`}
              <div class="row">
                ${s?B`<button class="btn pressable" @click=${()=>this.power(i,!1,60)}>⏸ ${t("net_hour")}</button>`:U}
                <label style="display:flex;gap:6px;align-items:center;font-size:14px">
                  <input type="checkbox" .checked=${i.schedule} @change=${t=>this.patch(i.id,{schedule:t.target.checked})} />🌙
                </label>
                <input type="time" .value=${i.bedtime} @change=${t=>this.patch(i.id,{bedtime:t.target.value})} aria-label=${t("net_bedtime")} />
                <span>←</span>
                <input type="time" .value=${i.wake} @change=${t=>this.patch(i.id,{wake:t.target.value})} aria-label=${t("net_wake")} />
              </div>
            </div>`})):B`<sn-skeleton></sn-skeleton>`}
    </div>`}};Pl.styles=[fi,r`
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
    `],Tl([gt({attribute:!1})],Pl.prototype,"ctx",2),Tl([gt({attribute:!1})],Pl.prototype,"widget",2),Tl([mt()],Pl.prototype,"data",2),Tl([mt()],Pl.prototype,"setup",2),Tl([mt()],Pl.prototype,"loaded",2),Pl=Tl([pt("sn-w-internet")],Pl);var Il=Object.defineProperty,El=Object.getOwnPropertyDescriptor,Nl=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?El(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&Il(e,i,a),a};const Wl={person:"#e9971d",car:"#3a86ff",dog:"#2bb673",cat:"#2bb673",package:"#8e6cef"},Rl=864e5;let Fl=class extends ct{constructor(){super(...arguments),this.day=0,this.camera="",this.cameras=[],this.missing=!1}get instance(){return this.widget.config.instance??"frigate"}connectedCallback(){super.connectedCallback(),this.load()}async load(){const t=new Date(Date.now()-this.day*Rl);t.setHours(0,0,0,0);try{const e=await this.ctx.hass.callWS({type:"frigate/events/get",instance_id:this.instance,after:Math.floor(t.getTime()/1e3),before:Math.floor(t.getTime()/1e3)+86400,limit:300}),i="string"==typeof e?JSON.parse(e):e;this.cameras=[...new Set(i.map((t=>t.camera)))].sort(),this.camera&&this.cameras.includes(this.camera)||(this.camera=this.widget.config.camera??this.cameras[0]??""),this.events=i,this.missing=!1}catch{this.missing=!0}}clip(t){return this.ctx.hass.hassUrl(`/api/frigate/${this.instance}/notifications/${t.id}/clip.mp4`)}render(){const{t:t,lang:e}=this.ctx,i=new Date(Date.now()-this.day*Rl);i.setHours(0,0,0,0);const s=t=>Math.min(100,Math.max(0,(1e3*t-i.getTime())/Rl*100)),n=(this.events??[]).filter((t=>t.camera===this.camera)),a=e=>(Array.isArray(e.sub_label)?e.sub_label[0]:e.sub_label)||t(`fr_${e.label}`)||e.label;return B`<div class="card glass">
      <div class="top">
        <b><sn-icon icon="cctv" style="--icon-size:20px"></sn-icon>${t("widget_timeline")}</b>
        ${this.cameras.length>1?B`<select @change=${t=>(this.camera=t.target.value,this.playing=void 0)}>
              ${this.cameras.map((t=>B`<option value=${t} ?selected=${t===this.camera}>${t.replace(/_/g," ")}</option>`))}
            </select>`:U}
        <div class="seg">
          ${[1,0].map((e=>B`<button
              aria-pressed=${this.day===e}
              @click=${()=>{this.day=e,this.playing=void 0,this.load()}}
            >
              ${t(e?"yesterday":"today")}
            </button>`))}
        </div>
      </div>
      <div class="view">
        ${this.missing?B`<span class="hint">${t("frigate_missing")}</span>`:this.playing?B`<video src=${this.clip(this.playing)} autoplay controls playsinline></video>`:B`<span class="hint">${n.length?t("tl_pick",{n:n.length}):t("tl_none")}</span>`}
      </div>
      <div>
        <div class="bar">
          ${[0,6,12,18].map((t=>B`<span class="tick" style="left:${t/24*100+(t?0:2)}%">${String(t).padStart(2,"0")}</span>`))}
          ${0===this.day?B`<span class="now" style="left:${s(Date.now()/1e3)}%"></span>`:U}
          ${n.map((t=>B`<button
              class="dot ${this.playing?.id===t.id?"on":""}"
              style="left:${s(t.start_time)}%;background:${Wl[t.label]??"#9aa0a6"}"
              title="${new Date(1e3*t.start_time).toLocaleTimeString(Ot[e],{hour:"2-digit",minute:"2-digit"})} · ${a(t)}"
              aria-label=${a(t)}
              @click=${()=>this.playing=t}
            ></button>`))}
        </div>
        <div class="legend">
          ${Object.entries(Wl).filter((([t])=>n.some((e=>e.label===t)))).map((([e,i])=>B`<span><i style="background:${i}"></i>${t(`fr_${e}`)||e}</span>`))}
        </div>
      </div>
    </div>`}};Fl.styles=[fi,r`
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
    `],Nl([gt({attribute:!1})],Fl.prototype,"ctx",2),Nl([gt({attribute:!1})],Fl.prototype,"widget",2),Nl([mt()],Fl.prototype,"day",2),Nl([mt()],Fl.prototype,"camera",2),Nl([mt()],Fl.prototype,"cameras",2),Nl([mt()],Fl.prototype,"events",2),Nl([mt()],Fl.prototype,"playing",2),Nl([mt()],Fl.prototype,"missing",2),Fl=Nl([pt("sn-w-timeline")],Fl);var Bl=Object.defineProperty,Zl=Object.getOwnPropertyDescriptor,ql=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Zl(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&Bl(e,i,a),a};const Ul={at:"05:30",minutes:15,days:[],skip_rain:!0,on:!1},Yl=["sun","mon","tue","wed","thu","fri","sat"],Xl=t=>t.find((t=>(t.startsWith("valve.")||t.startsWith("switch."))&&/irrigat|sprinkler|garden|lawn|drip|ري|رشاش|جنين|حديق/i.test(t)));let Kl=class extends ct{constructor(){super(...arguments),this.ir=Ul}connectedCallback(){super.connectedCallback(),Os(this.ctx.hass,"irrigation").then((t=>this.ir={...Ul,...t??{}})),this.unwatch=js(this.ctx.hass,"irrigation",(t=>this.ir={...Ul,...t??{}}))}disconnectedCallback(){super.disconnectedCallback(),this.unwatch?.then((t=>t())).catch((()=>{}))}updated(){const t=this.widget.config.entity;t&&this.ir.entity!==t&&this.save({entity:t})}save(t){const e=this.widget.config.entity??this.ir.entity??Xl(Object.keys(this.ctx.hass.states));this.ir={...this.ir,entity:e,...t},Ts(this.ctx.hass,"irrigation",this.ir).catch((()=>this.ctx.toast(this.ctx.t("error"))))}render(){const{ctx:t}=this,{t:e,hass:i,config:s,lang:n}=t,a=this.ir,o=this.widget.config.entity??a.entity??Xl(Object.keys(i.states)),r=o?i.states[o]:void 0,l=ne(r)||"open"===r?.state;return B`<div class="card glass">
      <div class="head">
        <span class="drop ${l?"on":""}"><sn-icon icon="sprinkler" style="--icon-size:24px"></sn-icon></span>
        <div style="flex:1">
          <b>${e("widget_irrigation")}</b>
          <span>${l?e("irr_running"):a.on?e("irr_next",{at:a.at,n:a.minutes}):e("off")}</span>
        </div>
        <div class="seg">${[!0,!1].map((t=>B`<button aria-pressed=${a.on===t} @click=${()=>this.save({on:t})}>${e(t?"on":"off")}</button>`))}</div>
      </div>
      ${o?U:B`<span class="muted" style="font-size:14px">${e(t.isAdmin?"irr_pick":"no_entities")}</span>`}
      <div class="row">
        <input type="time" style="width:auto" .value=${a.at} @change=${t=>this.save({at:t.target.value})} />
        <input type="number" min="1" max="120" style="width:80px" .value=${String(a.minutes)} @change=${t=>this.save({minutes:Number(t.target.value)||15})} />
        <span>${e("minutes")}</span>
      </div>
      <div class="row days">
        ${Yl.map((t=>{const e=!a.days.length||a.days.includes(t);return B`<button
            aria-pressed=${e}
            @click=${()=>{const i=a.days.length?a.days:[...Yl],s=e?i.filter((e=>e!==t)):[...i,t];this.save({days:7===s.length?[]:s})}}
          >
            ${new Date(2023,0,1+Yl.indexOf(t)).toLocaleDateString(Ot[n],{weekday:"narrow"})}
          </button>`}))}
      </div>
      <label class="row" style="gap:8px"><input type="checkbox" .checked=${a.skip_rain} @change=${t=>this.save({skip_rain:t.target.checked})} />🌧️ ${e("irr_skip_rain")}</label>
      ${a.last?B`<div class="last">${a.last.skipped?`🌧️ ${e("irr_skipped",{date:a.last.date})}`:`💧 ${e("irr_watered",{date:a.last.date})}`}</div>`:U}
      ${o&&!l?B`<button
            class="btn pressable"
            style="justify-self:start"
            @click=${async()=>{await i.callService("valve"===ee(o)?"valve":"homeassistant","valve"===ee(o)?"open_valve":"turn_on",{entity_id:o}).catch((()=>{})),i.callWS({type:"smartnest/timer/set",entity_id:o,minutes:10}).catch((()=>{}))}}
          >
            💧 ${e("irr_now")}
          </button>`:U}
    </div>`}};Kl.styles=[fi,r`
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
    `],ql([gt({attribute:!1})],Kl.prototype,"ctx",2),ql([gt({attribute:!1})],Kl.prototype,"widget",2),ql([mt()],Kl.prototype,"ir",2),Kl=ql([pt("sn-w-irrigation")],Kl);var Gl=Object.defineProperty,Jl=Object.getOwnPropertyDescriptor,Ql=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Jl(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&Gl(e,i,a),a};const tc={heat_minutes:40,keep_minutes:20,plans:[]},ec=["sun","mon","tue","wed","thu","fri","sat"],ic=/boiler|heater|geyser|water.?heat|سخان|دود|بويلر|קומקום|דוד/i,sc=(t,e)=>t.find((t=>t.startsWith("water_heater.")))??t.find((t=>/^(switch|input_boolean)\./.test(t)&&ic.test(`${t} ${e?.states[t]?.attributes.friendly_name??""}`)));let nc=class extends ct{constructor(){super(...arguments),this.b=tc,this.loaded=!1,this.now=Date.now()}connectedCallback(){super.connectedCallback(),Os(this.ctx.hass,"boiler").then((t=>{this.b={...tc,...t??{}},this.loaded=!0})),this.unwatch=js(this.ctx.hass,"boiler",(t=>this.b={...tc,...t??{}})),this.tick=window.setInterval((()=>this.now=Date.now()),3e4)}disconnectedCallback(){super.disconnectedCallback(),this.unwatch?.then((t=>t())).catch((()=>{})),window.clearInterval(this.tick)}save(t){this.b=t,Ts(this.ctx.hass,"boiler",t).catch((()=>this.ctx.toast(this.ctx.t("error"))))}get entity(){return this.widget.config.entity??this.b.entity??sc(Object.keys(this.ctx.hass.states),this.ctx.hass)}updated(){const t=this.widget.config.entity;this.loaded&&t&&this.b.entity!==t&&this.save({...this.b,entity:t})}power(t,e){const i=this.entity;i&&(this.ctx.hass.callService("homeassistant",t?"turn_on":"turn_off",{entity_id:i}).catch((()=>this.ctx.toast(this.ctx.t("error")))),this.save({...this.b,entity:i,until:t&&e?Date.now()/1e3+60*e:null,ready_at:t&&e?Date.now()/1e3+60*Math.min(e,this.b.heat_minutes):null}))}render(){const{ctx:t}=this,{t:e,hass:i,config:s,lang:n}=t,a=this.entity,o=ne(a?i.states[a]:void 0),r=this.b,l=r.ready_at?Math.max(0,Math.round((1e3*r.ready_at-this.now)/6e4)):void 0,c=r.until?Math.max(0,Math.round((1e3*r.until-this.now)/6e4)):void 0,d=o?void 0!==l&&r.heat_minutes?Math.round(100-l/r.heat_minutes*80):90:15,p=r.plans.filter((t=>t.on)).map((t=>t.at)).sort()[0];return B`<div class="card glass">
      <div class="head">
        <span class="tank ${o?"on":""}" style="--fill:${d}%"><i></i></span>
        <div style="flex:1">
          <b>${a?ie(i,s,a):e("widget_boiler")}</b>
          <span
            >${a?o?l?e("boiler_ready_in",{n:l}):void 0!==c?e("boiler_off_in",{n:c}):e("boiler_hot"):p?e("boiler_next",{at:p}):e("off"):e(t.isAdmin?"boiler_tap_pick":"no_entities")}</span
          >
        </div>
      </div>
      ${a?B`<div class="row">
            ${o?B`<button class="btn pressable" @click=${()=>this.power(!1)}>${e("turn_off")}</button>`:[30,45,60].map((t=>B`<button class="btn pressable" @click=${()=>this.power(!0,t)}>🔥 ${e("boiler_for",{n:t})}</button>`))}
          </div>`:U}
      ${this.loaded?B`${r.plans.map((t=>B`<div class="plan">
                <span class="t">${t.at}</span>
                <span class="d">${e("boiler_plan",{n:r.heat_minutes})} · ${t.days.length?t.days.map((t=>new Date(2023,0,1+ec.indexOf(t)).toLocaleDateString(Ot[n],{weekday:"short"}))).join("، "):e("every_day")}</span>
                <div class="seg">
                  ${[!0,!1].map((i=>B`<button aria-pressed=${t.on===i} @click=${()=>this.save({...r,entity:a,plans:r.plans.map((e=>e.id===t.id?{...e,on:i}:e))})}>${e(i?"on":"off")}</button>`))}
                </div>
                <button class="icon-btn small pressable" aria-label=${e("delete")} @click=${()=>this.save({...r,plans:r.plans.filter((e=>e.id!==t.id))})}>
                  <sn-icon icon="close" style="--icon-size:16px"></sn-icon>
                </button>
              </div>`))}
            <form
              class="row"
              @submit=${t=>{t.preventDefault();const e=t.currentTarget.elements.namedItem("at").value;e&&this.save({...r,entity:a,plans:[...r.plans,{id:Ie(),at:e,days:[],on:!0}]})}}
            >
              <span style="align-self:center;font-size:14px">${e("boiler_want")}</span>
              <input name="at" type="time" value="07:00" style="width:auto" />
              <button class="btn primary pressable" type="submit">${e("add")}</button>
            </form>`:U}
    </div>`}};nc.styles=[fi,r`
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
    `],Ql([gt({attribute:!1})],nc.prototype,"ctx",2),Ql([gt({attribute:!1})],nc.prototype,"widget",2),Ql([mt()],nc.prototype,"b",2),Ql([mt()],nc.prototype,"loaded",2),Ql([mt()],nc.prototype,"now",2),nc=Ql([pt("sn-w-boiler")],nc);var ac=Object.defineProperty,oc=Object.getOwnPropertyDescriptor,rc=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?oc(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&ac(e,i,a),a};const lc={co2:{classes:["carbon_dioxide"],re:/co2/,label:"air_co2",levels:[900,1400]},pm25:{classes:["pm25"],re:/pm2_?5/,label:"air_pm25",levels:[15,35]},voc:{classes:["volatile_organic_compounds","volatile_organic_compounds_parts"],re:/voc|tvoc/,label:"air_voc",levels:[300,1e3]},humidity:{classes:["humidity"],re:/humidity/,label:"air_humidity",levels:[60,70]}};const cc=["var(--success)","#e9971d","var(--alert)"];let dc=class extends ct{render(){const{ctx:t}=this,{t:e,hass:i,lang:s,config:n}=t,a=function(t,e){const i=Object.values(t.states).filter((t=>t.entity_id.startsWith("sensor.")&&!Number.isNaN(Number(t.state))&&(!e?.length||e.includes(t.entity_id)))),s=[];for(const[n,a]of Object.entries(lc)){const t=i.filter((t=>a.classes.includes(t.attributes.device_class)||!t.attributes.device_class&&a.re.test(t.entity_id)));if(!t.length)continue;const e=t.sort(((t,e)=>Number(e.state)-Number(t.state)))[0],o=Number(e.state),r="humidity"===n?o>a.levels[1]||o<25?2:o>a.levels[0]||o<35?1:0:o>a.levels[1]?2:o>a.levels[0]?1:0;s.push({key:n,label:a.label,e:e,level:r})}return s}(i,this.widget.config.entities),o=a.reduce(((t,e)=>Math.max(t,e.level)),0),r=a.filter((t=>t.level===o&&o>0))[0],l=r?"co2"===r.key?"air_tip_co2":"pm25"===r.key?"air_tip_pm":"voc"===r.key?"air_tip_voc":Number(r.e.state)<35?"air_tip_dry":"air_tip_humid":"air_good",c=this.widget.config.purifier??Object.keys(i.states).find((t=>/^fan\..*(purifier|air_clean|airpurifier)/.test(t)||/^humidifier\./.test(t)||/^fan\..*air/.test(t))),d=c?i.states[c]:void 0;return B`<div class="card glass">
      <div class="head">
        <span class="orb" style="--c:${cc[o]}"><sn-icon icon=${o?"air-filter":"leaf"} style="--icon-size:26px"></sn-icon></span>
        <div><b>${e(0===o?"air_level_good":1===o?"air_level_ok":"air_level_bad")}</b><span>${e(l)}</span></div>
      </div>
      ${(()=>{const i=function(t){if(!t.length)return;const e=e=>Number(t.find((t=>t.key===e))?.e.state),i=(t,e,i,s)=>Number.isNaN(t)||t<=e?0:Math.min(s,(t-e)/(i-e)*s),s=e("humidity"),n=i(e("co2"),800,2e3,40)+i(e("pm25"),12,75,40)+i(e("voc"),220,2200,25)+(Number.isNaN(s)?0:s>60?i(s,60,85,20):i(-s,-40,-15,20));return Math.max(0,Math.round(100-n))}(a);return void 0===i?U:B`<div class="score" style="--c:${i>=75?cc[0]:i>=50?cc[1]:cc[2]}">
              <span class="ltr"><sn-num .value=${String(i)}></sn-num><small>/100</small></span>
              <span>${e("air_score")}</span>
              <i style="transform:scaleX(${i/100});transform-origin:${t.rtl?"right":"left"}"></i>
            </div>`})()}
      ${a.length?B`<div class="grid">
            ${a.map((t=>B`<div class="r" style="--c:${cc[t.level]}" title=${ie(i,n,t.e.entity_id)}>
                <span class="v"><sn-num .value=${ue(`${ge(Number(t.e.state),s,0)} ${t.e.attributes.unit_of_measurement??""}`.trim())}></sn-num></span>
                <span class="l">${e(t.label)}</span>
              </div>`))}
          </div>`:B`<sn-empty text=${e("no_entities")}></sn-empty>`}
      ${d?B`<button
            class="btn ${ne(d)?"":"primary"} pressable"
            style="justify-self:start"
            @click=${()=>i.callService("homeassistant","toggle",{entity_id:c}).catch((()=>t.toast(e("error"))))}
          >
            <sn-icon icon="air-purifier" style="--icon-size:18px"></sn-icon>${ie(i,n,c)} · ${e(ne(d)?"on":"off")}
          </button>`:U}
    </div>`}};dc.styles=[fi,r`
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
      .score {
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: baseline;
        gap: 2px 10px;
      }
      .score > span:first-child {
        font-size: 30px;
        font-weight: var(--display-weight, 700);
        color: var(--c);
        line-height: 1;
      }
      .score small {
        font-size: 13px;
        color: var(--text-2);
        font-weight: 500;
      }
      .score > span:nth-child(2) {
        font-size: 13px;
        color: var(--text-2);
      }
      .score i {
        grid-column: 1 / -1;
        height: 6px;
        border-radius: 3px;
        background: var(--c);
        transform-origin: var(--from, left);
        opacity: 0.85;
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
    `],rc([gt({attribute:!1})],dc.prototype,"ctx",2),rc([gt({attribute:!1})],dc.prototype,"widget",2),dc=rc([pt("sn-w-air")],dc);var pc=Object.defineProperty,hc=Object.getOwnPropertyDescriptor,uc=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?hc(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&pc(e,i,a),a};const gc=(t=new Date)=>`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`;const mc={kids:[],tasks:[],done:{},goal:20,reward:""};let fc=class extends ct{constructor(){super(...arguments),this.c=mc,this.setup=!1,this.loaded=!1}connectedCallback(){super.connectedCallback(),Os(this.ctx.hass,"chores").then((t=>{this.c={...mc,...t??{}},this.loaded=!0})),this.unwatch=js(this.ctx.hass,"chores",(t=>this.c={...mc,...t??{}}))}disconnectedCallback(){super.disconnectedCallback(),this.unwatch?.then((t=>t())).catch((()=>{}))}save(t){const e=gc(new Date(Date.now()-3024e6));t={...t,done:Object.fromEntries(Object.entries(t.done).filter((([t])=>t>=e)))},this.c=t,Ts(this.ctx.hass,"chores",t).catch((()=>this.ctx.toast(this.ctx.t("error"))))}toggle(t,e){const i=gc(),s={...this.c.done[i]??{}},n=s[t]??[],a=n.includes(e);s[t]=a?n.filter((t=>t!==e)):[...n,e],a||(this.burst=`${t}|${e}`,navigator.vibrate?.(20),window.setTimeout((()=>this.burst=void 0),700)),this.save({...this.c,done:{...this.c.done,[i]:s}})}renderSetup(){const{t:t}=this.ctx,e=this.c,i=(i,s,n)=>B`<b style="font-size:14px">${n}</b>
      ${i.map((i=>B`<div class="row">
          <span style="font-size:22px">${i.emoji}</span><span style="flex:1">${"name"in i?i.name:i.title}</span>
          <button class="icon-btn small pressable" aria-label=${t("delete")} @click=${()=>this.save({...e,[s]:e[s].filter((t=>t.id!==i.id))})}>
            <sn-icon icon="close" style="--icon-size:16px"></sn-icon>
          </button>
        </div>`))}
      <form
        class="row"
        @submit=${t=>{t.preventDefault();const i=t.currentTarget,n=i.elements.namedItem("n").value.trim(),a=i.elements.namedItem("e").value.trim()||("kids"===s?"🙂":"⭐");if(!n)return;const o="kids"===s?{id:Ie(),name:n,emoji:a}:{id:Ie(),title:n,emoji:a};this.save({...e,[s]:[...e[s],o]}),i.reset()}}
      >
        <input class="emoji" name="e" placeholder=${"kids"===s?"🙂":"🛏️"} />
        <input name="n" placeholder=${t("kids"===s?"chores_kid_name":"chores_task_name")} />
        <button class="icon-btn primary pressable" type="submit" aria-label=${t("add")}><sn-icon icon="plus" style="--icon-size:18px"></sn-icon></button>
      </form>`;return B`<div class="setup">
      ${i(e.kids,"kids",t("chores_kids"))} ${i(e.tasks,"tasks",t("chores_tasks"))}
      <label class="field"
        >${t("chores_goal")}
        <input type="number" min="1" .value=${String(e.goal)} @change=${t=>this.save({...e,goal:Number(t.target.value)||20})} />
      </label>
      <label class="field"
        >${t("chores_reward")}
        <input type="text" .value=${e.reward} placeholder=${t("chores_reward_hint")} @change=${t=>this.save({...e,reward:t.target.value.trim()})} />
      </label>
    </div>`}render(){const{t:t}=this.ctx,e=this.c,i=e.done[gc()]??{};return B`<div class="card glass">
      <div class="head">
        <sn-icon icon="star" style="--icon-size:20px;color:#f5b301"></sn-icon>
        <h3>${t("widget_chores")}</h3>
        <button class="icon-btn small pressable" aria-pressed=${this.setup} aria-label=${t("settings")} @click=${()=>this.setup=!this.setup}>
          <sn-icon icon=${this.setup?"check":"cog"} style="--icon-size:18px"></sn-icon>
        </button>
      </div>
      ${this.loaded?!this.setup&&e.kids.length&&e.tasks.length?B`<div class="kids">
              ${e.kids.map((i=>{const s=function(t,e){const i=new Date,s=new Date(i);return s.setDate(i.getDate()-(i.getDay()+1)%7),s.setHours(0,0,0,0),Object.entries(t.done).filter((([t])=>new Date(`${t}T12:00`)>=s)).reduce(((t,[,i])=>t+Object.values(i).filter((t=>t.includes(e))).length),0)}(e,i.id);return B`<div class="kid">
                  <span class="face">${i.emoji}</span><b>${i.name}</b>
                  <span class="stars">⭐ ${s} / ${e.goal}</span>
                  <div class="bar"><span style="width:${Math.min(100,s/e.goal*100)}%"></span></div>
                  ${s>=e.goal?B`<span class="won">🎉 ${e.reward||t("chores_won")}</span>`:U}
                </div>`}))}
            </div>
            ${e.tasks.map((t=>B`<div class="task">
                <span style="font-size:22px">${t.emoji}</span>
                <span class="tt">${t.title}</span>
                <span class="who">
                  ${e.kids.map((e=>B`<button aria-pressed=${(i[t.id]??[]).includes(e.id)} aria-label=${e.name} title=${e.name} @click=${()=>this.toggle(t.id,e.id)}>
                      ${e.emoji}${this.burst===`${t.id}|${e.id}`?B`<span class="pop">⭐</span>`:U}
                    </button>`))}
                </span>
              </div>`))}`:this.renderSetup():B`<sn-skeleton></sn-skeleton>`}
    </div>`}};fc.styles=[fi,r`
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
    `],uc([gt({attribute:!1})],fc.prototype,"ctx",2),uc([gt({attribute:!1})],fc.prototype,"widget",2),uc([mt()],fc.prototype,"c",2),uc([mt()],fc.prototype,"setup",2),uc([mt()],fc.prototype,"burst",2),uc([mt()],fc.prototype,"loaded",2),fc=uc([pt("sn-w-chores")],fc);var bc=Object.defineProperty,_c=Object.getOwnPropertyDescriptor,yc=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?_c(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&bc(e,i,a),a};const vc=["sun","mon","tue","wed","thu","fri","sat"];let xc=class extends ct{constructor(){super(...arguments),this.alarms=[],this.adding=!1,this.loaded=!1}connectedCallback(){super.connectedCallback(),Os(this.ctx.hass,"wake").then((t=>{this.alarms=t?.alarms??[],this.loaded=!0})),this.unwatch=js(this.ctx.hass,"wake",(t=>this.alarms=t?.alarms??[]))}disconnectedCallback(){super.disconnectedCallback(),this.unwatch?.then((t=>t())).catch((()=>{}))}save(t){this.alarms=t,Ts(this.ctx.hass,"wake",{alarms:t}).catch((()=>this.ctx.toast(this.ctx.t("error"))))}patch(t,e){this.save(this.alarms.map((i=>i.id===t?{...i,...e}:i)))}render(){const{ctx:t}=this,{t:e,hass:i,config:s}=t,n=Object.keys(i.states).filter((t=>t.startsWith("light.")));return B`<div class="card glass">
      <h3><sn-icon icon="weather-sunset-up" style="--icon-size:20px;color:#ff9f43"></sn-icon>${e("widget_wake")}</h3>
      ${this.alarms.map((n=>B`<div class="alarm ${n.on?"":"off"}">
          <span class="time">${n.time}</span>
          <div class="seg">
            ${[!0,!1].map((t=>B`<button aria-pressed=${n.on===t} @click=${()=>this.patch(n.id,{on:t})}>${e(t?"on":"off")}</button>`))}
          </div>
          <button class="icon-btn small pressable" aria-label=${e("delete")} @click=${()=>this.save(this.alarms.filter((t=>t.id!==n.id)))}>
            <sn-icon icon="close" style="--icon-size:16px"></sn-icon>
          </button>
          <span class="info">
            <span>${n.light?ie(i,s,n.light):"–"} · ${e("wake_minutes",{n:n.minutes})}</span>
            <span class="days">
              ${vc.map((e=>{const i=!n.days.length||n.days.includes(e);return B`<button
                  aria-pressed=${i}
                  @click=${()=>{const t=n.days.length?n.days:[...vc],s=i?t.filter((t=>t!==e)):[...t,e];this.patch(n.id,{days:7===s.length?[]:s})}}
                >
                  ${new Date(2023,0,1+vc.indexOf(e)).toLocaleDateString(Ot[t.lang],{weekday:"narrow"})}
                </button>`}))}
            </span>
          </span>
        </div>`))}
      ${this.adding?B`<form
            @submit=${t=>{t.preventDefault();const e=t.currentTarget,i=t=>e.elements.namedItem(t).value;i("time")&&i("light")&&(this.save([...this.alarms,{id:Ie(),time:i("time"),light:i("light"),minutes:Number(i("minutes"))||20,days:[],on:!0}]),this.adding=!1)}}
          >
            <input name="time" type="time" value="06:30" />
            <select name="light">
              ${n.map((t=>B`<option value=${t}>${ie(i,s,t)}</option>`))}
            </select>
            <select name="minutes">
              ${[10,20,30].map((t=>B`<option value=${t} ?selected=${20===t}>${e("wake_minutes",{n:t})}</option>`))}
            </select>
            <div style="display:flex;gap:8px">
              <button class="btn primary pressable" type="submit">${e("save")}</button>
              <button class="btn pressable" type="button" @click=${()=>this.adding=!1}>${e("cancel")}</button>
            </div>
          </form>`:B`<button class="btn pressable" style="justify-self:start" @click=${()=>this.adding=!0}>
            <sn-icon icon="plus" style="--icon-size:18px"></sn-icon>${e("wake_add")}
          </button>`}
      ${!this.loaded||this.alarms.length||this.adding?U:B`<span class="muted" style="font-size:14px">${e("wake_hint")}</span>`}
    </div>`}};xc.styles=[fi,r`
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
    `],yc([gt({attribute:!1})],xc.prototype,"ctx",2),yc([gt({attribute:!1})],xc.prototype,"widget",2),yc([mt()],xc.prototype,"alarms",2),yc([mt()],xc.prototype,"adding",2),yc([mt()],xc.prototype,"loaded",2),xc=yc([pt("sn-w-wake")],xc);var wc=Object.defineProperty,$c=Object.getOwnPropertyDescriptor,kc=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?$c(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&wc(e,i,a),a};function Cc(t){const e=Object.values(t.states),i=e.find((t=>t.entity_id.startsWith("sensor.")&&"water"===t.attributes.device_class))?.entity_id,s=e.find((t=>t.entity_id.startsWith("sensor.")&&/tank|خزان/i.test(`${t.entity_id} ${t.attributes.friendly_name??""}`)&&"%"===t.attributes.unit_of_measurement))?.entity_id;return{usage:i,tank:s,valve:e.find((t=>t.entity_id.startsWith("valve.")&&/water|main|مي|ماء/i.test(`${t.entity_id} ${t.attributes.friendly_name??""}`)))?.entity_id??e.find((t=>t.entity_id.startsWith("valve.")))?.entity_id??e.find((t=>t.entity_id.startsWith("switch.")&&/valve|محبس/i.test(`${t.entity_id} ${t.attributes.friendly_name??""}`)))?.entity_id}}const Mc=t=>Object.values(t.states).filter((t=>t.entity_id.startsWith("binary_sensor.")&&"moisture"===t.attributes.device_class));let Hc=class extends ct{constructor(){super(...arguments),this.confirm=!1}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this.timer)}get cfg(){const t=this.widget.config,e=Cc(this.ctx.hass);return{usage:t.usage??e.usage,tank:t.tank??e.tank,valve:t.valve??e.valve}}toggleValve(t){const{hass:e}=this.ctx,i=this.cfg.valve,s=ee(i),n="valve"===s?t?"open_valve":"close_valve":t?"turn_on":"turn_off";e.callService(s,n,{entity_id:i}).catch((()=>this.ctx.toast(this.ctx.t("error")))),this.confirm=!1}render(){const{ctx:t}=this,{t:e,hass:i,lang:s}=t,n=this.cfg,a=n.usage?i.states[n.usage]:void 0,o=n.tank?i.states[n.tank]:void 0,r=n.valve?i.states[n.valve]:void 0,l=Mc(i).filter((t=>"on"===t.state)),c=a?.attributes.unit_of_measurement??"L",d=Math.min(100,Math.max(0,Number(o?.state)||0)),p=(h=r?.state,"open"===h||"on"===h||"opening"===h);var h;return B`<div class="card glass ${l.length?"leak":""}">
      <h3><sn-icon icon="water" style="--icon-size:20px;color:#3a86ff"></sn-icon>${e("widget_water")}</h3>
      <div class="top">
        ${a?B`<div>
              <div class="big"><sn-num .value=${ue(`${ge(Number(a.state),s,"m³"===c?2:0)} ${c}`)}></sn-num></div>
              <div class="lbl">${ie(i,t.config,a.entity_id)}</div>
            </div>`:U}
        ${o?B`<div class="tank">
              <span class="lbl">${e("water_tank")} · ${ue(`${ge(d,s,0)}%`)}</span>
              <div class="bar" style="--from:${t.rtl?"right":"left"}"><span style="transform:scaleX(${d/100})"></span></div>
            </div>`:U}
      </div>
      <div class="status ${l.length?"bad":""}" role=${l.length?"alert":"status"}>
        <sn-icon class="drop" icon=${l.length?"water-alert":"check-circle"} style="--icon-size:22px;color:${l.length?"var(--alert)":"var(--success)"}"></sn-icon>
        ${l.length?B`<span>${e("water_leak")}: ${l.map((e=>ie(i,t.config,e.entity_id))).join("، ")} · ${_e(e,l[0].last_changed)}</span>`:B`<span>${e("water_no_leak")}</span>`}
      </div>
      ${r?B`<div class="valve">
            <sn-icon icon="valve" style="--icon-size:22px;color:${p?"#3a86ff":"var(--text-2)"}"></sn-icon>
            <span>${e("water_valve")} · <b>${e(p?"open":"closed")}</b></span>
            ${p?this.confirm?B`<button class="btn danger pressable" @click=${()=>this.toggleValve(!1)}>${e("water_close_confirm")}</button>`:B`<button
                    class="btn pressable ${l.length?"danger":""}"
                    @click=${()=>{this.confirm=!0,window.clearTimeout(this.timer),this.timer=window.setTimeout((()=>this.confirm=!1),4e3)}}
                  >
                    ${e("water_close")}
                  </button>`:B`<button class="btn primary pressable" @click=${()=>this.toggleValve(!0)}>${e("water_open")}</button>`}
          </div>`:U}
      ${a||o||r||Mc(i).length?U:B`<sn-empty text=${e("no_entities")}></sn-empty>`}
    </div>`}};Hc.styles=[fi,r`
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
    `],kc([gt({attribute:!1})],Hc.prototype,"ctx",2),kc([gt({attribute:!1})],Hc.prototype,"widget",2),kc([mt()],Hc.prototype,"confirm",2),Hc=kc([pt("sn-w-water")],Hc);var Ac=Object.defineProperty,Lc=Object.getOwnPropertyDescriptor,Vc=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Lc(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&Ac(e,i,a),a};const Sc=["switch","light","media_player","climate","fan","water_heater","humidifier"],zc=(t,e)=>{const i=t.states[e],s=Number(i?.state);if(!i||Number.isNaN(s))return;const n=i.attributes.unit_of_measurement;return"kW"===n?1e3*s:"W"!==n&&n?void 0:s};function Dc(t,e){const i=la(t),s=new Set([i.solar,i.grid,i.battery,i.home,e].filter(Boolean)),n=[];for(const a of Object.values(t.states)){const e=a.entity_id;if(!e.startsWith("sensor.")||"power"!==a.attributes.device_class||s.has(e))continue;if(/total|house|home|grid|import|export|solar|pv|inverter|battery|mains|phase/.test(e))continue;const i=zc(t,e);if(void 0===i||i<1)continue;const o=t.entities?.[e]?.device_id,r=o?Object.values(t.entities??{}).find((e=>e.device_id===o&&Sc.includes(ee(e.entity_id))&&!e.entity_category&&t.states[e.entity_id]))?.entity_id:void 0,l=r?t.states[r]?.state:void 0;n.push({id:e,w:i,control:r,standby:!!r&&("off"===l||"standby"===l||"idle"===l)&&i>=2})}return n.sort(((t,e)=>e.w-t.w))}const Oc=["#E9971D","#3A86FF","#2BB673","#E5484D","#8E6CEF","#14B8C4","#9AA0A6"];let Tc=class extends ct{render(){const{ctx:t}=this,{t:e,hass:i,lang:s}=t,n=Dc(i,t.config.settings.power_entity),a=n.reduce(((t,e)=>t+e.w),0),o=n.slice(0,6),r=n.slice(6).reduce(((t,e)=>t+e.w),0),l=[...o.map((t=>t.w)),...r?[r]:[]],c=2*Math.PI*40;let d=0;const p=t=>ue(t>=1e3?`${ge(t/1e3,s,1)} kW`:`${ge(t,s,0)} W`),h=n.filter((t=>t.standby));return B`<div class="card glass">
      <h3><sn-icon icon="lightning-bolt" style="--icon-size:20px;color:var(--accent-text)"></sn-icon>${e("widget_consumers")}</h3>
      ${n.length?B`<div class="ring">
              <svg viewBox="0 0 100 100" aria-hidden="true">
                <circle cx="50" cy="50" r="40" stroke="var(--surface-2)"></circle>
                ${l.map(((t,e)=>{const i=t/a*c,s=Z`<circle cx="50" cy="50" r="40" stroke=${Oc[e]??Oc[6]} stroke-dasharray="${Math.max(0,i-1.2)} ${c}" stroke-dashoffset=${-d}></circle>`;return d+=i,s}))}
              </svg>
              <div class="mid"><b><sn-num .value=${p(a)}></sn-num></b><span>${e("now")}</span></div>
            </div>
            <ul>
              ${o.map(((s,n)=>B`<li>
                  <span class="sw" style="background:${Oc[n]}"></span>
                  <span class="nm">${ie(i,t.config,s.control??s.id)}</span>
                  ${s.standby?B`<button class="tag" title=${e("standby_hint")} @click=${()=>s.control&&t.openEntity(s.control)}>${e("standby")}</button>`:U}
                  <span class="w">${p(s.w)}</span>
                </li>`))}
              ${r?B`<li><span class="sw" style="background:${Oc[6]}"></span><span class="nm">${e("others")}</span><span class="w">${p(r)}</span></li>`:U}
              ${h.length&&!o.some((t=>t.standby))?B`<li class="muted" style="font-size:12px">${e("standby_total",{w:p(h.reduce(((t,e)=>t+e.w),0))})}</li>`:U}
            </ul>`:B`<sn-empty text=${e("no_entities")}></sn-empty>`}
    </div>`}};Tc.styles=[fi,r`
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
    `],Vc([gt({attribute:!1})],Tc.prototype,"ctx",2),Vc([gt({attribute:!1})],Tc.prototype,"widget",2),Tc=Vc([pt("sn-w-consumers")],Tc);var jc=Object.defineProperty,Pc=Object.getOwnPropertyDescriptor,Ic=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Pc(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&jc(e,i,a),a};let Ec=class extends ct{constructor(){super(...arguments),this.rects=new Map,this.moveFrame=0,this.onMove=t=>{this.lastMove=t,this.moveFrame||(this.moveFrame=requestAnimationFrame((()=>{this.moveFrame=0,this.lastMove&&this.move(this.lastMove)})))},this.kept=new Map,this.stable=new Map}firstUpdated(){const{ctx:t}=this;if(t.editing||"off"===t.config.settings.motion||matchMedia("(prefers-reduced-motion: reduce)").matches)return;[...this.renderRoot.querySelectorAll(".cell")].map((t=>({el:t,r:t.getBoundingClientRect()}))).filter((t=>t.r.top<window.innerHeight)).sort(((t,e)=>t.r.top-e.r.top||t.r.left-e.r.left)).slice(0,16).forEach((({el:t},e)=>t.animate([{opacity:0,transform:"translateY(18px) scale(0.97)"},{opacity:1,transform:"none"}],{duration:460,delay:38*e,easing:"cubic-bezier(0.22, 1, 0.36, 1)",fill:"backwards"})))}willUpdate(){this.toggleAttribute("rtl",this.ctx.rtl),this.rects.clear(),this.ctx.editing&&this.renderRoot?.querySelectorAll(".cell").forEach((t=>this.rects.set(t.dataset.id,t.getBoundingClientRect())))}updated(){this.rects.size&&this.renderRoot.querySelectorAll(".cell").forEach((t=>{const e=this.rects.get(t.dataset.id);if(!e||t.classList.contains("lifted"))return;const i=t.getBoundingClientRect(),s=e.left-i.left,n=e.top-i.top;Math.abs(s)<1&&Math.abs(n)<1||t.animate([{transform:`translate(${s}px, ${n}px)`},{transform:"none"}],{duration:320,easing:"cubic-bezier(0.22, 1, 0.36, 1)"})}))}get widgets(){return this.preview??this.page.widgets}pointerCell(t){const e=this.renderRoot.querySelector(".grid").getBoundingClientRect(),i=(e.width+12)/je,s=this.ctx.rtl?e.right-t.clientX:t.clientX-e.left,n=t.clientY-e.top;return{px:s,py:n,pitchX:i,pitchY:56,col:Math.floor(s/i),row:Math.floor(n/56)}}start(t,e,i){if(0!==t.button||this.ctx.narrow)return;t.preventDefault(),t.stopPropagation();try{t.currentTarget.setPointerCapture(t.pointerId)}catch{}const{col:s,row:n}=this.pointerCell(t);this.gesture={id:e.id,mode:i,pointerId:t.pointerId,offCol:s-e.x,offRow:n-e.y},this.preview=this.page.widgets.map((t=>({...t}))),ki("tap")}move(t){const e=this.gesture;if(!e||t.pointerId!==e.pointerId||!this.preview)return;const i=this.preview.find((t=>t.id===e.id)),{px:s,py:n,pitchX:a,pitchY:o,col:r,row:l}=this.pointerCell(t);let c;if("move"===e.mode)c={...i,x:Math.min(Math.max(r-e.offCol,0),je-i.w),y:Math.max(l-e.offRow,0)};else{const t=Ee[i.type];c={...i,w:Math.min(Math.max(Math.round((s-i.x*a)/a),t.minW),je-i.x),h:Math.min(Math.max(Math.round((n-i.y*o)/o),t.minH),40)}}if(c.x===i.x&&c.y===i.y&&c.w===i.w&&c.h===i.h)return;const d=this.page.widgets.map((t=>t.id===e.id?c:t));this.preview=Ze(d,e.id)}end(t){const e=this.gesture;if(!e||t.pointerId!==e.pointerId)return;cancelAnimationFrame(this.moveFrame),this.moveFrame=0,this.move(t);const i=this.preview;if(this.gesture=void 0,this.preview=void 0,!i)return;const s=this.page.id;this.ctx.update((t=>{const e=t.pages.find((t=>t.id===s));e&&(e.widgets=Ze(i))}))}removeWidget(t){const e=this.page.id;this.ctx.update((i=>{const s=i.pages.find((t=>t.id===e));s&&(s.widgets=Ze(s.widgets.filter((e=>e.id!==t.id))))}))}ctxFor(t){const e=this.ctx,{ids:i,maxAge:s}=function(t,e){const i=t.config,s=(...t)=>({ids:t.filter((t=>!!t)),maxAge:1/0});switch(t.type){case"tile":case"camera":case"gauge":case"remote":case"sensor":case"ac":return i.entity?s(i.entity):{ids:[],maxAge:1e3};case"gate":return i.entity?s(i.entity,i.camera):{ids:[],maxAge:1e3};case"heading":case"countdown":case"verse":case"radar":case"board":case"parcels":return s();case"schedule":return s("sun.sun");case"folder":return s(...i.entities??[]);case"floorplan":{const t=new Set(["sun.sun"]);for(const e of i.floors??[])for(const i of e.markers??[])t.add(i.entity);for(const e of i.floors??[])for(const i of e.doors??[])i.entity&&t.add(i.entity);for(const i in e.states)(/^(person|vacuum)\./.test(i)||/^sensor\..*_(area|room|location)$/.test(i))&&t.add(i);return{ids:[...t],maxAge:3e3}}default:return{ids:[],maxAge:700}}}(t,e.hass),n=[t,e.config,e.lang,e.dark,e.narrow,e.editing,e.isAdmin,e.plan,...i.map((t=>e.hass.states[t]))],a=this.kept.get(t.id),o=!!a&&a.deps.length===n.length&&a.deps.every(((t,e)=>t===n[e]));return o&&a.ctx.hass===e.hass?a.ctx:o&&Date.now()-a.at<s?(s===1/0||this.catchUp||(this.catchUp=window.setTimeout((()=>(this.catchUp=void 0,this.requestUpdate())),s-(Date.now()-a.at)+20)),a.ctx):(this.kept.set(t.id,{ctx:e,deps:n,at:Date.now()}),e)}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this.catchUp)}renderRoomTabs(t){const e=t.filter((t=>"heading"===t.type&&t.config.text)).sort(((t,e)=>t.y-e.y));if(e.length<2)return U;const{hass:i,t:s}=this.ctx,n=e.map(((s,n)=>{const a=e[n+1],o=t.filter((t=>t.config.entity&&t.y>s.y&&(!a||t.y<a.y))).map((t=>t.config.entity)),r=o.filter((t=>/^(light|switch|fan|climate|media_player|cover|input_boolean|humidifier)\./.test(t)&&ne(de(i.states[t])))).length;return{h:s,on:r,count:o.length}}));return B`<div class="roomtabs" role="tablist">
      ${n.map((t=>B`<button
          class="pressable ${t.on?"on":""}"
          @click=${()=>this.renderRoot.querySelector(`.cell[data-id="${t.h.id}"]`)?.scrollIntoView({behavior:"smooth",block:"start"})}
        >
          <b>${t.h.config.text}</b>
          <span>${t.on?s("rooms_on_n",{n:t.on}):s("rooms_devices_n",{n:t.count})}</span>
        </button>`))}
    </div>`}stableWidget(t){const e=this.stable.get(t.id);return e&&e.config===t.config&&e.type===t.type&&e.w===t.w&&e.h===t.h?e:(this.stable.set(t.id,t),t)}renderWidget(t){const e=this.stableWidget(t),i=this.ctxFor(e);if(!i.allows(Di(e.type)))return B`<div class="glass" style="height:100%;border-radius:var(--r-lg);display:grid;place-items:center;align-content:center;gap:6px;color:var(--text-2);text-align:center;padding:12px;--icon-size:26px">
        <sn-icon icon="lock"></sn-icon>
        <span style="font-size:14px">${i.t(`widget_${e.type}`)} · ${i.t("plan_needed",{plan:i.t(`plan_${Si(Di(e.type))}`)})}</span>
      </div>`;switch(e.type){case"tile":return B`<sn-w-tile .ctx=${i} .widget=${e}></sn-w-tile>`;case"floorplan":return B`<sn-w-floorplan .ctx=${i} .widget=${e}></sn-w-floorplan>`;case"camera":return B`<sn-w-camera .ctx=${i} .widget=${e}></sn-w-camera>`;case"heading":return B`<sn-w-heading .ctx=${i} .widget=${e}></sn-w-heading>`;case"clock":return B`<sn-w-clock .ctx=${i} .widget=${e}></sn-w-clock>`;case"modes":return B`<sn-w-modes .ctx=${i} .widget=${e}></sn-w-modes>`;case"vacuum":return B`<sn-w-vacuum .ctx=${i} .widget=${e}></sn-w-vacuum>`;case"visitors":return B`<sn-w-visitors .ctx=${i} .widget=${e}></sn-w-visitors>`;case"energy":return B`<sn-w-energy .ctx=${i} .widget=${e}></sn-w-energy>`;case"energy_stats":return B`<sn-w-energy-stats .ctx=${i} .widget=${e}></sn-w-energy-stats>`;case"panic":return B`<sn-w-panic .ctx=${i} .widget=${e}></sn-w-panic>`;case"check":return B`<sn-w-check .ctx=${i} .widget=${e}></sn-w-check>`;case"family":return B`<sn-w-family .ctx=${i} .widget=${e}></sn-w-family>`;case"todo":return B`<sn-w-todo .ctx=${i} .widget=${e}></sn-w-todo>`;case"calendar":return B`<sn-w-calendar .ctx=${i} .widget=${e}></sn-w-calendar>`;case"forecast":return B`<sn-w-forecast .ctx=${i} .widget=${e}></sn-w-forecast>`;case"countdown":return B`<sn-w-countdown .ctx=${i} .widget=${e}></sn-w-countdown>`;case"gauge":return B`<sn-w-gauge .ctx=${i} .widget=${e}></sn-w-gauge>`;case"gate":return B`<sn-w-gate .ctx=${i} .widget=${e}></sn-w-gate>`;case"frigate":return B`<sn-w-frigate .ctx=${i} .widget=${e}></sn-w-frigate>`;case"schedule":return B`<sn-w-schedule .ctx=${i} .widget=${e}></sn-w-schedule>`;case"media":return B`<sn-w-media .ctx=${i} .widget=${e}></sn-w-media>`;case"remote":return B`<sn-w-remote .ctx=${i} .widget=${e}></sn-w-remote>`;case"consumers":return B`<sn-w-consumers .ctx=${i} .widget=${e}></sn-w-consumers>`;case"water":return B`<sn-w-water .ctx=${i} .widget=${e}></sn-w-water>`;case"wake":return B`<sn-w-wake .ctx=${i} .widget=${e}></sn-w-wake>`;case"chores":return B`<sn-w-chores .ctx=${i} .widget=${e}></sn-w-chores>`;case"air":return B`<sn-w-air .ctx=${i} .widget=${e}></sn-w-air>`;case"boiler":return B`<sn-w-boiler .ctx=${i} .widget=${e}></sn-w-boiler>`;case"irrigation":return B`<sn-w-irrigation .ctx=${i} .widget=${e}></sn-w-irrigation>`;case"timeline":return B`<sn-w-timeline .ctx=${i} .widget=${e}></sn-w-timeline>`;case"internet":return B`<sn-w-internet .ctx=${i} .widget=${e}></sn-w-internet>`;case"board":return B`<sn-w-board .ctx=${i} .widget=${e}></sn-w-board>`;case"verse":return B`<sn-w-verse .ctx=${i} .widget=${e}></sn-w-verse>`;case"radar":return B`<sn-w-radar .ctx=${i} .widget=${e}></sn-w-radar>`;case"commute":return B`<sn-w-commute .ctx=${i} .widget=${e}></sn-w-commute>`;case"parcels":return B`<sn-w-parcels .ctx=${i} .widget=${e}></sn-w-parcels>`;case"hero":return B`<sn-w-hero .ctx=${i} .widget=${e}></sn-w-hero>`;case"stack":return B`<sn-w-stack .ctx=${i} .widget=${e}></sn-w-stack>`;case"room":return B`<sn-w-room .ctx=${i} .widget=${e}></sn-w-room>`;case"ac":return B`<sn-w-ac .ctx=${i} .widget=${e}></sn-w-ac>`;case"scenes":return B`<sn-w-scenes .ctx=${i} .widget=${e}></sn-w-scenes>`;case"sensor":return B`<sn-w-sensor .ctx=${i} .widget=${e}></sn-w-sensor>`;case"batteries":return B`<sn-w-batteries .ctx=${i} .widget=${e}></sn-w-batteries>`;case"lights":return B`<sn-w-group .ctx=${i} .widget=${e} domain="light"></sn-w-group>`;case"covers":return B`<sn-w-group .ctx=${i} .widget=${e} domain="cover"></sn-w-group>`;case"prayer":return B`<sn-w-prayer .ctx=${i} .widget=${e}></sn-w-prayer>`;case"folder":return B`<sn-w-folder .ctx=${i} .widget=${e}></sn-w-folder>`;default:return U}}renderChrome(e){const{t:i,narrow:s}=this.ctx,n=this.gesture?.id===e.id;return B`
      ${s||"floorplan"===e.type?U:B`<div
            class="surface"
            @pointerdown=${t=>this.start(t,e,"move")}
            @pointermove=${this.onMove}
            @pointerup=${this.end}
            @pointercancel=${this.end}
          ></div>`}
      ${s||"floorplan"!==e.type?U:B`<button
            class="handle"
            aria-label="drag"
            @pointerdown=${t=>this.start(t,e,"move")}
            @pointermove=${this.onMove}
            @pointerup=${this.end}
            @pointercancel=${this.end}
          >
            <sn-icon icon="drag"></sn-icon>
          </button>`}
      ${n?U:B`<button class="badge del pressable" aria-label=${i("delete")} @click=${()=>this.removeWidget(e)}>
              <sn-icon icon="minus"></sn-icon>
            </button>
            <button class="badge cog pressable" aria-label=${i("widget_settings")} @click=${()=>t((()=>import("./editors-Cb5NESlu.js")),[]).then((t=>t.widgetSettingsSheet(this.ctx,this.page.id,e.id)))}>
              <sn-icon icon="cog"></sn-icon>
            </button>`}
      ${s?U:B`<div
            class="resize"
            aria-label="resize"
            @pointerdown=${t=>this.start(t,e,"resize")}
            @pointermove=${this.onMove}
            @pointerup=${this.end}
            @pointercancel=${this.end}
          >
            <sn-icon icon="resize"></sn-icon>
          </div>`}
    `}render(){const{ctx:t}=this,e=this.widgets;if(!e.length)return B`<div class="empty">
        <sn-icon icon="dashboard"></sn-icon>
        <strong>${t.t("empty_page")}</strong>
        ${t.isAdmin&&!t.editing?B`<span>${t.t("empty_page_admin")}</span>`:U}
      </div>`;const i=t.config.settings.hidden,s=t.editing||!i.length?e:e.filter((t=>!(t.config.entity&&i.includes(t.config.entity)))),n=t.narrow?[...s].sort(((t,e)=>t.y-e.y||t.x-e.x)):s;return B`${t.editing?U:this.renderRoomTabs(s)}<div class="grid ${t.narrow?"narrow":""} ${t.editing?"editing":""}">
      ${Ht(n,(t=>t.id),(e=>{const i=t.narrow?`grid-column: span ${(t=>"tile"===t.type&&t.w<=4?2:4)(e)}; grid-row: span ${"floorplan"===e.type?1:e.h}`:`grid-column: ${e.x+1} / span ${e.w}; grid-row: ${e.y+1} / span ${e.h}`;return B`<div class="cell ${this.gesture?.id===e.id?"lifted":""}" data-id=${e.id} style=${i}>
            ${this.renderWidget(e)} ${t.editing?this.renderChrome(e):U}
          </div>`}))}
    </div>`}};Ec.styles=[fi,r`
      .roomtabs {
        display: flex;
        gap: 8px;
        overflow-x: auto;
        scrollbar-width: none;
        padding: 2px 2px 14px;
      }
      .roomtabs button {
        flex: none;
        display: grid;
        gap: 2px;
        text-align: start;
        padding: 10px 16px;
        border: 0;
        border-radius: var(--r-md);
        background: var(--surface);
        -webkit-backdrop-filter: var(--glass-filter, blur(16px));
        backdrop-filter: var(--glass-filter, blur(16px));
        color: var(--text);
        font: 600 15px var(--font);
        cursor: pointer;
        box-shadow: var(--shadow);
      }
      .roomtabs button span {
        font-size: 12px;
        font-weight: 500;
        color: var(--text-2);
      }
      .roomtabs button.on span {
        color: var(--accent-text);
        font-weight: 700;
      }
      .cell {
        scroll-margin-top: 140px;
      }

      :host {
        display: block;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(${je}, minmax(0, 1fr));
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
        animation: wiggle 0.34s ease-in-out infinite alternate;
        animation-play-state: var(--loops, running);
        border-radius: var(--r-lg);
        outline: 1.5px dashed color-mix(in srgb, var(--text-2) 45%, transparent);
        outline-offset: 3px;
      }
      .editing .cell:nth-child(2n) {
        animation-delay: -0.17s;
        animation-direction: alternate-reverse;
      }
      .editing .cell:nth-child(3n) {
        animation-duration: 0.38s;
      }
      @keyframes wiggle {
        from {
          rotate: -0.35deg;
        }
        to {
          rotate: 0.35deg;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .editing .cell {
          animation: none;
        }
      }
      .cell.lifted {
        animation: none;
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
    `],Ic([gt({attribute:!1})],Ec.prototype,"ctx",2),Ic([gt({attribute:!1})],Ec.prototype,"page",2),Ic([mt()],Ec.prototype,"preview",2),Ec=Ic([pt("sn-page-grid")],Ec);var Nc=Object.defineProperty,Wc=Object.getOwnPropertyDescriptor,Rc=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Wc(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&Nc(e,i,a),a};let Fc=class extends ct{constructor(){super(...arguments),this.label="",this.icon="lock-open",this.tone="var(--accent)",this.x=0,this.down=t=>{const e=this.renderRoot.querySelector(".track");try{t.currentTarget.setPointerCapture(t.pointerId)}catch{}this.drag={id:t.pointerId,from:t.clientX-this.x,max:e.clientWidth-60,last:t.clientX,t:performance.now(),v:0},ki("tap")},this.move=t=>{const e=this.drag;if(!e||t.pointerId!==e.id)return;const i=performance.now();e.v=(t.clientX-e.last)/Math.max(1,i-e.t),e.last=t.clientX,e.t=i;const s=Math.max(0,Math.min(e.max,t.clientX-e.from));Math.floor(s/40)!==Math.floor(this.x/40)&&ki("tick"),this.x=s},this.up=()=>{const t=this.drag;if(this.drag=void 0,!t)return;if(this.x>=.92*t.max)return this.x=t.max,ki("success"),void this.onConfirm?.();const e=this.renderRoot.querySelector(".knob"),i=this.x;this.x=0;const{frames:s,duration:n}=wi(i,0,Math.min(0,t.v),(t=>({transform:`translateX(${t}px)`})));e.animate(s,{duration:n})}}render(){return B`<div class="track" style="--tone:${this.tone}">
      <div class="trail" style="width:${this.x+60}px"></div>
      <span class="label">${this.label}</span>
      <div
        class="knob"
        role="slider"
        aria-label=${this.label}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${Math.round(this.x/((this.drag?.max??1)||1)*100)}
        tabindex="0"
        style="transform:translateX(${this.x}px)"
        @pointerdown=${this.down}
        @pointermove=${this.move}
        @pointerup=${this.up}
        @pointercancel=${this.up}
        @keydown=${t=>"Enter"===t.key&&this.onConfirm?.()}
      >
        <sn-icon .icon=${this.icon}></sn-icon>
      </div>
    </div>`}};Fc.styles=r`
    :host {
      display: block;
    }
    .track {
      position: relative;
      height: 60px;
      border-radius: 999px;
      background: var(--surface-2);
      overflow: hidden;
      touch-action: none;
      user-select: none;
      direction: ltr;
    }
    .trail {
      position: absolute;
      inset: 0 auto 0 0;
      border-radius: 999px;
      background: color-mix(in srgb, var(--tone) 30%, transparent);
    }
    .label {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      font: 600 16px var(--font);
      color: var(--text-2);
      padding-inline-start: 40px;
      background: linear-gradient(90deg, var(--text-2) 0%, var(--text) 50%, var(--text-2) 100%) 0 0 / 200% 100%;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shimmer 2.4s linear infinite;
      pointer-events: none;
    }
    .knob {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: var(--tone);
      color: #fff;
      display: grid;
      place-items: center;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
      cursor: grab;
      --icon-size: 24px;
    }
    @keyframes shimmer {
      to {
        background-position: -200% 0;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .label {
        animation: none;
      }
    }
  `,Rc([gt()],Fc.prototype,"label",2),Rc([gt()],Fc.prototype,"icon",2),Rc([gt()],Fc.prototype,"tone",2),Rc([gt({attribute:!1})],Fc.prototype,"onConfirm",2),Rc([mt()],Fc.prototype,"x",2),Fc=Rc([pt("sn-slide-confirm")],Fc);var Bc=Object.defineProperty,Zc=Object.getOwnPropertyDescriptor,qc=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Zc(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&Bc(e,i,a),a};let Uc=class extends ct{constructor(){super(...arguments),this.entityId="",this.pos={x:16,y:96},this.down=t=>{if(!t.target.closest("button")){try{this.setPointerCapture(t.pointerId)}catch{}this.drag={id:t.pointerId,sx:t.clientX,sy:t.clientY,ox:this.pos.x,oy:this.pos.y,moved:!1}}},this.move=t=>{const e=this.drag;if(!e||t.pointerId!==e.id)return;const i="rtl"===getComputedStyle(this).direction,s=(t.clientX-e.sx)*(i?1:-1),n=-(t.clientY-e.sy);e.moved||=Math.hypot(s,n)>6,this.pos={x:Math.max(8,Math.min(window.innerWidth-this.offsetWidth-8,e.ox+s)),y:Math.max(8,Math.min(window.innerHeight-this.offsetHeight-8,e.oy+n))}},this.up=()=>{const t=this.drag;if(this.drag=void 0,!t)return;if(!t.moved)return this.ctx.openEntity(this.entityId);const e=this.pos.x>(window.innerWidth-this.offsetWidth)/2,i=this.pos.y>(window.innerHeight-this.offsetHeight)/2;ki("tick"),this.pos={x:e?window.innerWidth-this.offsetWidth-16:16,y:i?window.innerHeight-this.offsetHeight-16:96}}}render(){return this.src??=Vn(this.ctx.hass,this.entityId),this.style.insetInlineEnd=`${this.pos.x}px`,this.style.bottom=`${this.pos.y}px`,this.style.transition=this.drag?"none":"inset-inline-end 300ms cubic-bezier(0.22, 1, 0.36, 1), bottom 300ms cubic-bezier(0.22, 1, 0.36, 1)",B`<div @pointerdown=${this.down} @pointermove=${this.move} @pointerup=${this.up} @pointercancel=${this.up}>
      <img src=${this.src??""} alt="" @error=${()=>(this.src=void 0,window.setTimeout((()=>this.requestUpdate()),1500))} />
      <div class="bar">
        <i></i><span>${ie(this.ctx.hass,this.ctx.config,this.entityId)}</span>
        <button aria-label=${this.ctx.t("close")} @click=${()=>this.onClose()}><sn-icon icon="close"></sn-icon></button>
      </div>
    </div>`}};Uc.styles=r`
    :host {
      position: fixed;
      z-index: 78;
      width: min(340px, calc(100vw - 32px));
      border-radius: 16px;
      overflow: hidden;
      background: #0d1114;
      box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.08);
      touch-action: none;
      animation: pop 380ms cubic-bezier(0.34, 1.56, 0.64, 1);
      cursor: grab;
    }
    img {
      display: block;
      width: 100%;
      aspect-ratio: 16 / 9;
      object-fit: cover;
      pointer-events: none;
    }
    .bar {
      position: absolute;
      inset: 0 0 auto 0;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 10px;
      background: linear-gradient(rgba(0, 0, 0, 0.55), transparent);
      color: #fff;
      font: 600 13px var(--font, sans-serif);
    }
    .bar span {
      flex: 1;
    }
    .bar i {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #ff4d4d;
    }
    button {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 0;
      background: rgba(0, 0, 0, 0.45);
      color: #fff;
      display: grid;
      place-items: center;
      cursor: pointer;
      --icon-size: 16px;
    }
    @keyframes pop {
      from {
        opacity: 0;
        transform: scale(0.8);
      }
    }
  `,qc([gt({attribute:!1})],Uc.prototype,"ctx",2),qc([gt()],Uc.prototype,"entityId",2),qc([gt({attribute:!1})],Uc.prototype,"onClose",2),qc([mt()],Uc.prototype,"pos",2),Uc=qc([pt("sn-pip")],Uc);var Yc=Object.defineProperty,Xc=Object.getOwnPropertyDescriptor,Kc=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Xc(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&Yc(e,i,a),a};const Gc=[[4,"codes_4h"],[24,"codes_day"],[72,"codes_3days"],[168,"codes_week"]];let Jc=class extends ct{constructor(){super(...arguments),this.lock="",this.zwave=!0,this.hours=24,this.busy=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.load()}async load(){try{const t=await this.ctx.hass.callWS({type:"smartnest/codes/list"});this.codes=t.codes.filter((t=>!this.lock||t.lock===this.lock)),this.zwave=t.zwave}catch{this.codes=[]}}when(t){return new Date(1e3*t).toLocaleString(Ot[this.ctx.lang],{weekday:"short",day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})}share(t){const{t:e,hass:i,config:s}=this.ctx,n=e("codes_message",{name:t.name,lock:ie(i,s,t.lock),code:t.code,from:this.when(t.from),until:this.when(t.until)});window.open(`https://wa.me/?text=${encodeURIComponent(n)}`,"_blank","noopener")}render(){const{t:t,hass:e,config:i}=this.ctx,s=this.lock?[this.lock]:Object.keys(e.states).filter((t=>t.startsWith("lock.")));return this.codes?B`<div style="display:grid;gap:12px">
      ${this.zwave?U:B`<p class="muted" style="margin:0;font-size:14px">${t("codes_need_zwave")}</p>`}
      ${this.codes.map((s=>B`<div style="display:grid;gap:6px;padding:12px;border-radius:var(--r-md);background:var(--surface-2)">
          <div style="display:flex;align-items:center;gap:10px">
            <b style="flex:1">${s.name}</b>
            <span style="font:700 22px var(--font);letter-spacing:.12em;direction:ltr">${s.code}</span>
            <span class="muted" style="font-size:12px">${s.live?"🟢 "+t("codes_live"):"⏳ "+t("codes_later")}</span>
          </div>
          <span class="muted" style="font-size:13px">${this.when(s.from)} ← ${this.when(s.until)} · ${ie(e,i,s.lock)}</span>
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
        @submit=${async i=>{i.preventDefault();const s=i.currentTarget,n=new FormData(s),a=n.get("from")?Date.parse(String(n.get("from")))/1e3:Date.now()/1e3;this.busy=!0;try{const t=await e.callWS({type:"smartnest/codes/add",lock:String(n.get("lock")),name:String(n.get("name")).trim(),from:a,until:a+3600*this.hours,...String(n.get("code")??"").trim()?{code:String(n.get("code")).trim()}:{}});s.reset(),await this.load(),this.share(t)}catch(o){console.error("[smartnest] guest code",o),this.ctx.toast(t("no_slot"===o?.code?"codes_full":"error"))}this.busy=!1}}
      >
        <b>${t("codes_new")}</b>
        <input name="name" type="text" required placeholder=${t("codes_who")} />
        ${s.length>1?B`<select name="lock">${s.map((t=>B`<option value=${t}>${ie(e,i,t)}</option>`))}</select>`:B`<input type="hidden" name="lock" .value=${s[0]??""} />`}
        <label class="field">${t("codes_from")}<input name="from" type="datetime-local" /></label>
        <div class="seg">${Gc.map((([e,i])=>B`<button type="button" aria-pressed=${this.hours===e} @click=${()=>this.hours=e}>${t(i)}</button>`))}</div>
        <input name="code" type="text" inputmode="numeric" pattern="[0-9]{4,8}" class="ltr" placeholder=${t("codes_auto")} />
        <button class="btn primary pressable" type="submit" ?disabled=${this.busy||!s.length}>${t("codes_make")}</button>
      </form>
    </div>`:B`<sn-skeleton></sn-skeleton>`}};Kc([gt({attribute:!1})],Jc.prototype,"ctx",2),Kc([gt()],Jc.prototype,"lock",2),Kc([mt()],Jc.prototype,"codes",2),Kc([mt()],Jc.prototype,"zwave",2),Kc([mt()],Jc.prototype,"hours",2),Kc([mt()],Jc.prototype,"busy",2),Jc=Kc([pt("sn-guest-codes")],Jc);var Qc=Object.defineProperty,td=Object.getOwnPropertyDescriptor,ed=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?td(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&Qc(e,i,a),a};let id=class extends ct{constructor(){super(...arguments),this.value=0,this.label="",this.icon="",this.fill="var(--accent)",this.onFill="var(--on-accent)",this.track="",this.small=!1,this.over=0,this.frame=0}moveTo(t){this.next=t,this.frame||(this.frame=requestAnimationFrame((()=>{this.frame=0,void 0!==this.drag&&void 0!==this.next&&this.set(this.next)})))}from(t){const e=this.rect??t.currentTarget.getBoundingClientRect(),i=(e.bottom-t.clientY)/e.height;return this.over=i>1?Math.min(1,2*(i-1)):i<0?-Math.min(1,2*-i):0,Math.round(100*Math.min(1,Math.max(0,i)))}set(t){void 0!==t&&void 0!==this.drag&&Math.floor(t/10)!==Math.floor(this.drag/10)&&ki("tick"),this.drag=t,this.onPreview?.(t)}settle(t){if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;const e=this.over;this.over=0,t.animate([{transform:`scale(1.04, ${1+.05*Math.abs(e)})`},{transform:"scale(0.985, 0.99)",offset:.45},{transform:"scale(1.006, 1.004)",offset:.75},{transform:"none"}],{duration:520,easing:"cubic-bezier(0.22, 1, 0.36, 1)"})}render(){const t=this.drag??this.value,e=void 0===this.drag&&void 0!==this.display?this.display:`${t}%`,i=!!this.track,s=!i&&t>12;return B`<div
      class="track ${void 0!==this.drag?"dragging":""}"
      style="${i?`background:${this.track};`:""}${void 0!==this.drag&&this.over?`transform:scale(1.04, ${1+.05*Math.abs(this.over)});transform-origin:${this.over>0?"bottom":"top"}`:""}"
      role="slider"
      tabindex="0"
      aria-label=${this.label}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow=${t}
      @pointerdown=${t=>{t.currentTarget.setPointerCapture(t.pointerId),this.rect=t.currentTarget.getBoundingClientRect(),this.set(this.from(t))}}
      @pointermove=${t=>void 0!==this.drag&&this.moveTo(this.from(t))}
      @pointerup=${t=>{cancelAnimationFrame(this.frame),this.frame=0,void 0!==this.drag&&(this.drag=this.from(t)),this.rect=void 0;const e=this.drag;this.settle(t.currentTarget),this.set(void 0),void 0!==e&&this.onCommit?.(e)}}
      @pointercancel=${()=>(this.rect=void 0,this.set(void 0))}
      @keydown=${t=>{const e="ArrowUp"===t.key?10:"ArrowDown"===t.key?-10:0;e&&(t.preventDefault(),this.onCommit?.(Math.min(100,Math.max(0,this.value+e))))}}
    >
      ${i?B`<div class="rail" style="transform:translateY(${100-t}%)"><div class="thumb"></div></div>`:B`<div class="fill" style="transform:scaleY(${t/100});background:${this.fill}"></div>`}
      <span class="val ${i?"on-track":""}">${e}</span>
      ${this.icon?B`<sn-icon .icon=${this.icon} style="color:${s?this.onFill:i?"#fff":"var(--text-2)"}"></sn-icon>`:U}
    </div>`}};id.styles=r`
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
    /* Only transforms move while dragging: drawn by the GPU, no layout, smooth at 120 Hz. */
    .fill {
      position: absolute;
      inset: 0;
      transform-origin: bottom;
      will-change: transform;
      transition: transform 160ms cubic-bezier(0.22, 1, 0.36, 1), background-color 400ms;
    }
    .rail {
      position: absolute;
      inset: 0;
      will-change: transform;
      transition: transform 160ms cubic-bezier(0.22, 1, 0.36, 1);
    }
    .dragging .fill,
    .dragging .rail {
      transition: none;
    }
    .thumb {
      position: absolute;
      top: -3px;
      left: 14px;
      right: 14px;
      height: 6px;
      border-radius: 3px;
      background: #fff;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
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
  `,ed([gt({type:Number})],id.prototype,"value",2),ed([gt()],id.prototype,"label",2),ed([gt()],id.prototype,"icon",2),ed([gt()],id.prototype,"fill",2),ed([gt()],id.prototype,"onFill",2),ed([gt()],id.prototype,"track",2),ed([gt()],id.prototype,"display",2),ed([gt({type:Boolean,reflect:!0})],id.prototype,"small",2),ed([gt({attribute:!1})],id.prototype,"onCommit",2),ed([gt({attribute:!1})],id.prototype,"onPreview",2),ed([mt()],id.prototype,"drag",2),ed([mt()],id.prototype,"over",2),id=ed([pt("sn-vslider")],id);var sd=Object.defineProperty,nd=Object.getOwnPropertyDescriptor,ad=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?nd(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&sd(e,i,a),a};let od=class extends ct{from(t){const e=t.currentTarget.getBoundingClientRect(),i=t.clientX-(e.left+e.width/2),s=t.clientY-(e.top+e.height/2);let n=180*Math.atan2(s,i)/Math.PI;n=(360-n)%360;const a=Math.min(100,Math.hypot(i,s)/(e.width/2)*100);return[Math.round(n),Math.round(a)]}render(){const[t,e]=this.drag??this.hs??[0,0],i=-t*Math.PI/180,s=50+Math.cos(i)*e/2,n=50+Math.sin(i)*e/2;return B`<div
      class="wheel ${this.drag?"dragging":""}"
      role="slider"
      aria-label="color"
      aria-valuenow=${t}
      @pointerdown=${t=>{t.currentTarget.setPointerCapture(t.pointerId),this.drag=this.from(t)}}
      @pointermove=${t=>this.drag&&(this.drag=this.from(t))}
      @pointerup=${()=>{const t=this.drag;this.drag=void 0,t&&this.onPick?.(t)}}
      @pointercancel=${()=>this.drag=void 0}
    >
      <div class="knob" style="left:${s}%;top:${n}%;background:${Qt(Jt(t,e))}"></div>
    </div>`}};od.styles=r`
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
  `,ad([gt({type:Array})],od.prototype,"hs",2),ad([gt({attribute:!1})],od.prototype,"onPick",2),ad([mt()],od.prototype,"drag",2),od=ad([pt("sn-color-wheel")],od);var rd=Object.defineProperty,ld=Object.getOwnPropertyDescriptor,cd=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?ld(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&rd(e,i,a),a};let dd=class extends ct{constructor(){super(...arguments),this.length=4,this.prompt="",this.error="",this.value="",this.wrong=!1}submit(){const t=this.value;t&&(this.onSubmit(t)||(this.wrong=!0,navigator.vibrate?.([60,40,60]),this.value=""))}press(t){if(!this.length)return this.value.length<12&&(this.value+=t),void(this.wrong=!1);if(!(this.value.length>=this.length)&&(this.wrong=!1,this.value+=t,ki("tick"),this.value.length===this.length)){const t=this.value;window.setTimeout((()=>{this.onSubmit(t)||(this.wrong=!0,navigator.vibrate?.([60,40,60]),this.value="")}),120)}}render(){return B`
      <div class="prompt ${this.wrong?"err":""}">${this.wrong?this.error:this.prompt}</div>
      <div class="dots ${this.wrong?"shake":""}" aria-hidden="true">
        ${Array.from({length:this.length||Math.max(4,this.value.length)},((t,e)=>B`<span class="dot ${e<this.value.length?"on":""}"></span>`))}
      </div>
      <div class="keys">
        ${["1","2","3","4","5","6","7","8","9"].map((t=>B`<button @click=${()=>this.press(t)}>${t}</button>`))}
        ${this.length?B`<span></span>`:B`<button class="ghost" aria-label="ok" @click=${()=>this.submit()}><sn-icon icon="check"></sn-icon></button>`}
        <button @click=${()=>this.press("0")}>0</button>
        <button class="ghost" aria-label="delete" @click=${()=>this.value=this.value.slice(0,-1)}>
          <sn-icon icon="backspace"></sn-icon>
        </button>
      </div>
    `}};dd.styles=r`
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
  `,cd([gt({type:Number})],dd.prototype,"length",2),cd([gt()],dd.prototype,"prompt",2),cd([gt()],dd.prototype,"error",2),cd([gt({attribute:!1})],dd.prototype,"onSubmit",2),cd([mt()],dd.prototype,"value",2),cd([mt()],dd.prototype,"wrong",2),dd=cd([pt("sn-pinpad")],dd);var pd=Object.defineProperty,hd=Object.getOwnPropertyDescriptor,ud=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?hd(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&pd(e,i,a),a};const gd=["hs","xy","rgb","rgbw","rgbww"],md={brightness:"lightbulb",color:"palette",temp:"thermometer"},fd={brightness:"brightness",color:"color",temp:"white_temp"},bd=[[0,85],[24,90],[38,88],[52,75],[130,70],[190,80],[225,85],[275,70],[325,65]],_d={off:"power",cool:"snowflake",heat:"fire",auto:"air-conditioner",heat_cool:"air-conditioner",dry:"humidity",fan_only:"fan"};let yd=class extends ct{constructor(){super(...arguments),this.entityId="",this.lightTab="brightness",this.wheelOpen=!1,this.confirmUnlock=!1}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this.tick),window.clearTimeout(this.tempTimer),window.clearTimeout(this.confirmTimer)}updated(){const t=this.ctx.hass.states[this.entityId];Ki(this.renderRoot.querySelector(".big-ic sn-icon"),t,this.prevState),this.prevState=t?.state}async loadTimer(){try{const t=await this.ctx.hass.callWS({type:"smartnest/timer/list"});this.timerDue=t[this.entityId]}catch{this.timerDue=void 0}}async loadLockLog(){try{const t=await this.ctx.hass.callWS({type:"logbook/get_events",start_time:new Date(Date.now()-2592e5).toISOString(),end_time:(new Date).toISOString(),entity_ids:[this.entityId]});this.lockLog=t.filter((t=>"locked"===t.state||"unlocked"===t.state||"jammed"===t.state)).reverse().slice(0,8)}catch{this.lockLog=[]}}firstUpdated(){"lock"===ee(this.entityId)&&this.ctx.allows("lock_history")&&this.loadLockLog(),this.ctx.allows("timers")&&"toggle"===re(this.entityId)&&(this.loadTimer(),this.tick=window.setInterval((()=>this.requestUpdate()),3e4));ye(this.ctx.hass.states[this.entityId])&&this.loadHistory()}async loadHistory(){try{const t=new Date(Date.now()-864e5).toISOString(),e=await this.ctx.hass.callWS({type:"history/history_during_period",start_time:t,entity_ids:[this.entityId],minimal_response:!0,no_attributes:!0,significant_changes_only:!1});let i=Date.parse(t)/1e3;this.history=(e[this.entityId]??[]).map((t=>(i=t.lu??t.lc??i,{t:i,v:Number(t.s)}))).filter((t=>!Number.isNaN(t.v)))}catch{this.history=[]}}call(t,e,i={}){ki("tap"),this.ctx.hass.callService(t,e,{entity_id:this.entityId,...i}).catch((()=>this.ctx.toast(this.ctx.t("error"))))}renderLight(t){const{t:e}=this.ctx,i=t.attributes.supported_color_modes??[];if(!i.some((t=>"onoff"!==t)))return this.renderPower(t);const s=["brightness"];i.some((t=>gd.includes(t)))&&s.push("color"),i.includes("color_temp")&&s.push("temp");const n=s.includes(this.lightTab)?this.lightTab:"brightness",a="on"===t.state,o=a?t.attributes.rgb_color:void 0,r=o?Qt(o):"var(--accent)",l=a?Math.round((t.attributes.brightness??255)/255*100):0;let c;if("brightness"===n)c=B`<sn-vslider
        .value=${l}
        label=${e("brightness")}
        icon=${l?"lightbulb":"lightbulb-outline"}
        fill=${r}
        onFill=${o?Kt(Gt(o)):"var(--on-accent)"}
        .onCommit=${t=>t?this.call("light","turn_on",{brightness_pct:t}):this.call("light","turn_off")}
      ></sn-vslider>`;else if("color"===n){const i="color_temp"!==t.attributes.color_mode?t.attributes.hs_color:void 0,s=t=>!!i&&Math.abs((i[0]-t[0]+540)%360-180)<10&&Math.abs(i[1]-t[1])<12;c=B`<div style="display:grid;gap:22px;justify-items:center">
        <div class="swatches">
          ${bd.map((t=>B`<button
              class="swatch pressable"
              style="background:${Qt(Jt(t[0],t[1]))}"
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
        ${this.wheelOpen?B`<sn-color-wheel class="reveal" .hs=${i} .onPick=${t=>this.call("light","turn_on",{hs_color:t})}></sn-color-wheel>`:U}
      </div>`}else{const i=t.attributes.min_color_temp_kelvin??2e3,s=t.attributes.max_color_temp_kelvin??6500,n="color_temp"===t.attributes.color_mode?t.attributes.color_temp_kelvin:void 0,a="number"==typeof n?Math.round((n-i)/(s-i)*100):50,o=t=>50*Math.round((i+(s-i)*t/100)/50);c=B`<sn-vslider
        .value=${a}
        label=${e("white_temp")}
        icon="lightbulb"
        track="linear-gradient(to top, #FFA94D, #FFE4C2 45%, #F4F7FF 75%, #BFD6FF)"
        .display=${"number"==typeof n?`${n}K`:"–"}
        .onCommit=${t=>this.call("light","turn_on",{color_temp_kelvin:o(t)})}
      ></sn-vslider>`}return B`${c}
      ${this.ctx.allows("light_fx")&&i.some((t=>gd.includes(t)))?$s(this.ctx,[t.entity_id]):U}
      ${s.length>1?B`<div class="seg" role="tablist">
            ${s.map((t=>B`<button role="tab" aria-pressed=${t===n} @click=${()=>this.lightTab=t}>
                <sn-icon .icon=${md[t]} style="--icon-size:18px"></sn-icon>${e(fd[t])}
              </button>`))}
          </div>`:U}`}renderPower(t){const e=ne(t);return B`${this.renderPowerButton(t,e)}${e?U:function(t,e){const i=t.config.settings.tou;return i?.enabled&&t.allows("tou")&&"switch"===ee(e)&&"cheap"!==Es(i)?B`<button
    class="btn pressable"
    style="margin-top:8px"
    @click=${async()=>{const s=[...(await Os(t.hass,"later")??{jobs:[]}).jobs.filter((t=>t.entity!==e)),{id:String(Date.now()),entity:e,at:Ns(i)}];await Ts(t.hass,"later",{jobs:s}).catch((()=>{})),t.toast(t.t("tou_scheduled",{at:i.cheap_from}))}}
  >
    🌙 ${t.t("tou_later",{at:i.cheap_from})}
  </button>`:U}(this.ctx,t.entity_id)}`}renderPowerButton(t,e){return B`<button
      class="power pressable ${e?"on":""}"
      aria-pressed=${e}
      aria-label=${this.ctx.t(e?"turn_off":"turn_on")}
      @click=${()=>this.call("homeassistant","toggle")}
    >
      <sn-icon icon="power"></sn-icon>
    </button>`}renderClimate(t){const{t:e,lang:i}=this.ctx,s=t.attributes.target_temp_step??("°F"===t.attributes.temperature_unit?1:.5),n=this.pendingTemp??t.attributes.temperature,a=t.attributes.min_temp??16,o=t.attributes.max_temp??30,r=t=>{if("number"!=typeof n)return;const e=Math.min(o,Math.max(a,Math.round((n+t)/s)*s));this.pendingTemp=e,window.clearTimeout(this.tempTimer),this.tempTimer=window.setTimeout((()=>{this.call("climate","set_temperature",{temperature:e}),window.setTimeout((()=>this.pendingTemp=void 0),1500)}),700)},l=t.attributes.hvac_modes??[];return B`
      ${"number"==typeof n&&"off"!==t.state&&this.ctx.allows("dial")?B`<sn-dial
            .value=${n}
            .min=${a}
            .max=${o}
            .step=${s}
            .current=${"number"==typeof t.attributes.current_temperature?t.attributes.current_temperature:void 0}
            .mode=${"heat"===t.state||"heating"===t.attributes.hvac_action?"heat":"auto"===t.state||"heat_cool"===t.state?"auto":"cool"}
            label=${Dt(t.state)?e(t.state):t.state}
            .onCommit=${t=>{this.pendingTemp=t,this.call("climate","set_temperature",{temperature:t}),window.setTimeout((()=>this.pendingTemp=void 0),1500)}}
          ></sn-dial>`:"number"==typeof n&&"off"!==t.state?B`<div class="temp">
            <button class="icon-btn pressable" aria-label="-" @click=${()=>r(-s)}><sn-icon icon="minus"></sn-icon></button>
            <span class="value ltr">${ge(n,i)}°</span>
            <button class="icon-btn pressable" aria-label="+" @click=${()=>r(s)}><sn-icon icon="plus"></sn-icon></button>
          </div>`:this.renderPower(t)}
      ${"number"==typeof t.attributes.current_temperature?B`<div class="sub">${e("current_temp")} ${ue(`${ge(t.attributes.current_temperature,i)}°`)}</div>`:U}
      ${l.length?B`<div class="seg">
            ${l.map((i=>B`<button aria-pressed=${t.state===i} @click=${()=>this.call("climate","set_hvac_mode",{hvac_mode:i})}>
                <sn-icon .icon=${_d[i]??"air-conditioner"} style="--icon-size:18px"></sn-icon>${Dt(i)?e(i):i}
              </button>`))}
          </div>`:U}
    `}renderVacuum(t){const e={id:"sheet",type:"vacuum",x:0,y:0,w:12,h:9,config:{entity:t.entity_id}};return B`<sn-w-vacuum compact .ctx=${this.ctx} .widget=${e} style="width:100%"></sn-w-vacuum>`}renderCover(t){const{t:e}=this.ctx,i=t.attributes.supported_features??0,s=t.attributes.current_position,n=t.attributes.current_tilt_position,a=t=>!i||!!(i&t);return B`${"number"==typeof s||"number"==typeof n?B`<div class="controls">
            ${"number"==typeof s?B`<sn-vslider
                  .value=${s}
                  label=${e("position")}
                  icon=${s?"blinds":"blinds-closed"}
                  .onCommit=${t=>this.call("cover","set_cover_position",{position:t})}
                ></sn-vslider>`:U}
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
                </div>`:U}
          </div>`:U}
      <div class="actions">
        ${a(1)?B`<button class="btn pressable" @click=${()=>this.call("cover","open_cover")}><sn-icon icon="chevron-up"></sn-icon>${e("cover_open")}</button>`:U}
        ${a(8)?B`<button class="btn pressable" @click=${()=>this.call("cover","stop_cover")}><sn-icon icon="stop"></sn-icon>${e("stop")}</button>`:U}
        ${a(2)?B`<button class="btn pressable" @click=${()=>this.call("cover","close_cover")}><sn-icon icon="chevron-down"></sn-icon>${e("cover_close")}</button>`:U}
      </div>`}alarm(t,e){if(!(!!t.attributes.code_format&&("alarm_disarm"===e||t.attributes.code_arm_required)))return this.call("alarm_control_panel",e);const{t:i}=this.ctx;this.ctx.showSheet({title:i("enter_code"),render:s=>B`<sn-pinpad
        .length=${0}
        prompt=${i("enter_code")}
        error=${i("wrong_pin")}
        .onSubmit=${n=>(s.hass.callService("alarm_control_panel",e,{entity_id:t.entity_id,code:n}).catch((()=>s.toast(i("wrong_pin")))),s.closeSheet(),!0)}
      ></sn-pinpad>`})}renderAlarm(t){const{t:e}=this.ctx,i=t.attributes.supported_features??7;return"disarmed"===t.state?B`<div class="actions">
        ${1&i?B`<button class="btn primary pressable" @click=${()=>this.alarm(t,"alarm_arm_home")}><sn-icon icon="home"></sn-icon>${e("arm_home")}</button>`:U}
        ${2&i?B`<button class="btn primary pressable" @click=${()=>this.alarm(t,"alarm_arm_away")}><sn-icon icon="leave"></sn-icon>${e("arm_away")}</button>`:U}
        ${4&i?B`<button class="btn primary pressable" @click=${()=>this.alarm(t,"alarm_arm_night")}><sn-icon icon="night"></sn-icon>${e("arm_night")}</button>`:U}
      </div>`:B`<button class="btn danger pressable lock-btn" @click=${()=>this.alarm(t,"alarm_disarm")}><sn-icon icon="lock-open"></sn-icon>${e("disarm")}</button>`}renderLockLog(){const t=this.lockLog;if(!t?.length)return U;const{t:e,lang:i}=this.ctx,s=Ot[i];return B`<div style="width:100%;display:grid;gap:6px">
      <div class="sub" style="display:flex;gap:6px;align-items:center"><sn-icon icon="history" style="--icon-size:16px"></sn-icon>${e("history_lock")}</div>
      ${t.map((t=>B`<div style="display:flex;justify-content:space-between;gap:12px;font-size:14px;padding:6px 10px;border-radius:10px;background:var(--surface-2)">
          <span style="display:inline-flex;gap:6px;align-items:center;color:${"unlocked"===t.state?"var(--accent-text)":"inherit"}">
            <sn-icon icon=${"unlocked"===t.state?"lock-open":"lock"} style="--icon-size:16px"></sn-icon>${e(t.state)}
          </span>
          <span class="muted ltr">${new Date(1e3*t.when).toLocaleString(s,{weekday:"short",hour:"2-digit",minute:"2-digit"})}</span>
        </div>`))}
    </div>`}renderLock(t){const{t:e}=this.ctx;return B`${this.renderLockButton(t)}
    ${this.ctx.isAdmin&&this.ctx.allows("guest_codes")?B`<button class="btn pressable" style="margin-top:8px" @click=${()=>{return e=this.ctx,i=t.entity_id,e.showSheet({title:e.t("codes_title"),render:t=>B`<sn-guest-codes .ctx=${t} .lock=${i}></sn-guest-codes>`});var e,i}}>
          <sn-icon icon="key" style="--icon-size:18px"></sn-icon>${e("codes_title")}
        </button>`:U}`}renderLockButton(t){const{t:e}=this.ctx;return"unlocked"===t.state||"open"===t.state?B`<button class="btn primary pressable lock-btn" @click=${()=>(Ii("lock"),this.call("lock","lock"))}><sn-icon icon="lock"></sn-icon>${e("lock")}</button>`:B`<sn-slide-confirm
      class="lock-btn"
      .label=${e("slide_unlock")}
      icon="lock-open"
      tone="var(--alert)"
      .onConfirm=${()=>{Ii("unlock"),this.call("lock","unlock")}}
    ></sn-slide-confirm>`}renderChart(t){const e=this.history;if(!e||e.length<2)return U;const{lang:i,t:s}=this.ctx,n=e[0].t,a=Date.now()/1e3,o=e.map((t=>t.v)),r=Math.min(...o),l=Math.max(...o),c=l-r||1,d=t=>100-(t-r)/c*90-5;let p=`M0 ${d(e[0].v)}`;for(let g=1;g<e.length;g++)p+=` H${h=e[g].t,(h-n)/(a-n||1)*300} V${d(e[g].v)}`;var h;p+=" H300";const u=t.attributes.unit_of_measurement??"";return this.ctx.allows("charts")?B`<div class="chart">
        <div class="sub">${s("history_24h")}</div>
        <sn-chart .points=${e} unit=${u} .lang=${i}></sn-chart>
      </div>`:B`<div class="chart">
      <div class="sub">${s("history_24h")}</div>
      <svg viewBox="0 0 300 100" preserveAspectRatio="none" class="ltr">
        ${Z`<path d="${p} V100 H0 Z" fill="var(--accent)" opacity=".14"></path>
        <path d=${p} fill="none" stroke="var(--accent)" stroke-width="2" vector-effect="non-scaling-stroke" stroke-linejoin="round"></path>`}
      </svg>
      <div class="labels ltr"><span>${ge(r,i)} ${u}</span><span>${ge(l,i)} ${u}</span></div>
    </div>`}renderTimer(t){if(!this.ctx.allows("timers")||"toggle"!==re(t.entity_id)||!ne(t))return U;const{t:e}=this.ctx;if(this.timerDue&&Date.parse(this.timerDue)>Date.now())return B`<div class="actions">
        <span class="btn" style="background:color-mix(in srgb,var(--accent) 16%,transparent);color:var(--accent-text)">
          <sn-icon icon="clock-outline"></sn-icon>${e("timer_left",{in:Wn(e,new Date(this.timerDue))})}
        </span>
        <button
          class="icon-btn pressable"
          aria-label=${e("cancel")}
          @click=${()=>this.ctx.hass.callWS({type:"smartnest/timer/cancel",entity_id:t.entity_id}).then((()=>this.timerDue=void 0))}
        >
          <sn-icon icon="close" style="--icon-size:18px"></sn-icon>
        </button>
      </div>`;const i=[[15,e("min_short",{n:15})],[30,e("min_short",{n:30})],[60,e("hour_short",{n:1})],[120,e("hour_short",{n:2})]];return B`<div class="opt" style="display:grid;gap:6px;justify-items:center;font-size:13px;color:var(--text-2)">
      ${e("timer_off_in")}
      <div class="seg">
        ${i.map((([i,s])=>B`<button
            @click=${()=>this.ctx.hass.callWS({type:"smartnest/timer/set",entity_id:t.entity_id,minutes:i}).then((t=>{ki("tap"),this.timerDue=t.due})).catch((()=>this.ctx.toast(e("error"))))}
          >
            ${s}
          </button>`))}
      </div>
    </div>`}renderBody(t){switch(ee(t.entity_id)){case"light":return this.renderLight(t);case"climate":return this.renderClimate(t);case"vacuum":return this.renderVacuum(t);case"cover":return this.renderCover(t);case"lock":return B`${this.renderLock(t)} ${this.renderLockLog()}`;case"alarm_control_panel":return this.renderAlarm(t);case"camera":{const e=Vn(this.ctx.hass,t.entity_id);return e?B`<div class="live"><img src=${e} alt="" /></div>
              <button
                class="btn pressable"
                style="justify-self:center"
                @click=${()=>{!function(t,e,i){let s=i,n=document.body;for(;s;){const t=s.getRootNode();if(!(t instanceof ShadowRoot))break;if("SMARTNEST-PANEL"===t.host.tagName){n=t.host.shadowRoot.querySelector(".app")??document.body;break}s=t.host}n.querySelector("sn-pip")?.remove();const a=document.createElement("sn-pip");a.ctx=t,a.entityId=e,a.onClose=()=>a.remove(),n.appendChild(a)}(this.ctx,t.entity_id,this),this.ctx.closeSheet()}}
              >
                <sn-icon icon="picture-in-picture" style="--icon-size:18px"></sn-icon>${this.ctx.t("door_mini")}
              </button>`:U}case"sensor":return this.renderChart(t);case"switch":case"fan":case"input_boolean":case"media_player":case"automation":case"humidifier":case"siren":return this.renderPower(t);case"scene":case"script":return B`<button class="btn primary pressable" @click=${()=>this.call(ee(t.entity_id),"turn_on")}>
          <sn-icon icon="play"></sn-icon>${this.ctx.t("start")}
        </button>`;default:return U}}render(){const{ctx:t}=this,e=t.hass.states[this.entityId];if(!e)return B`<div class="sub">${t.t("unavailable")}</div>`;if("vacuum"===ee(e.entity_id)&&"unavailable"!==e.state)return this.renderVacuum(e);const i=ne(e),s="unavailable"===e.state;return B`
      <div class="head">
        <span class="big-ic ${i?"on":""}" style=${ae(e)}>
          <sn-icon class=${Ui(e)} .icon=${oe(e,this.entityId)}></sn-icon>
        </span>
        <span class="state">${fe(t.t,e,t.lang)}</span>
        <span class="sub">${t.t("last_changed")} ${_e(t.t,e.last_changed)}</span>
      </div>
      ${s?U:this.renderBody(e)} ${s?U:this.renderTimer(e)}
      ${t.editing&&t.isAdmin?B`<button
            class="btn pressable"
            style="justify-self:center;margin-top:8px;color:var(--text-2)"
            @click=${()=>{const e=this.entityId;t.update((t=>t.settings.hidden=[...t.settings.hidden.filter((t=>t!==e)),e])),t.closeSheet(),t.toast(t.t("hidden_done"))}}
          >
            <sn-icon icon="eye-off" style="--icon-size:18px"></sn-icon>${t.t("hidden_this")}
          </button>`:U}
    `}};yd.styles=[fi,qi,r`
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
    `],ud([gt({attribute:!1})],yd.prototype,"ctx",2),ud([gt()],yd.prototype,"entityId",2),ud([mt()],yd.prototype,"lightTab",2),ud([mt()],yd.prototype,"wheelOpen",2),ud([mt()],yd.prototype,"pendingTemp",2),ud([mt()],yd.prototype,"confirmUnlock",2),ud([mt()],yd.prototype,"history",2),ud([mt()],yd.prototype,"timerDue",2),ud([mt()],yd.prototype,"lockLog",2),yd=ud([pt("sn-entity-detail")],yd);var vd=Object.defineProperty,xd=Object.getOwnPropertyDescriptor,wd=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?xd(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&vd(e,i,a),a};let $d=class extends ct{constructor(){super(...arguments),this.at=new Date,this.silent=!1,this.confirm=!1,this.mini=!1,this.looking=!1}connectedCallback(){super.connectedCallback();const t=this.ctx.config.settings.doorbell.camera_entity;if(t&&this.ctx.allows("ai_doorbell")&&ks(this.ctx.hass)&&(this.looking=!0,window.setTimeout((()=>Cs(this.ctx,"doorbell",{camera:t}).then((t=>{this.seen=t,this.looking=!1}))),1200)),t&&this.ctx.allows("faces")&&window.setTimeout((()=>this.recognise(t)),2500),!this.silent){const t=this.ctx.config.settings.doorbell_tone;t&&"chime"!==t?Ei(t):function(){try{const t=new AudioContext,e=(e,i)=>{const s=t.createOscillator(),n=t.createGain();s.type="sine",s.frequency.value=e,n.gain.setValueAtTime(1e-4,t.currentTime+i),n.gain.exponentialRampToValueAtTime(.35,t.currentTime+i+.02),n.gain.exponentialRampToValueAtTime(1e-4,t.currentTime+i+1.2),s.connect(n).connect(t.destination),s.start(t.currentTime+i),s.stop(t.currentTime+i+1.3)};e(659.25,0),e(523.25,.45),window.setTimeout((()=>t.close()),2500)}catch{}}()}navigator.vibrate?.([120,80,120])}async recognise(t){try{const e=await this.ctx.hass.callWS({type:"frigate/events/get",instance_id:"frigate",cameras:[t.split(".")[1]],after:Math.floor(Date.now()/1e3)-180,limit:5}),i=("string"==typeof e?JSON.parse(e):e).map((t=>Array.isArray(t.sub_label)?t.sub_label[0]:t.sub_label)).find(Boolean);i&&(this.known=i)}catch{}}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this.timer)}renderReplies(){const{ctx:t}=this,{t:e,hass:i}=t,s=t.config.settings.doorbell.speaker_entity,n=Object.keys(i.states).filter((t=>t.startsWith("tts."))),a=n.find((t=>t.includes("google")))??n[0];if(!s||!a)return U;return B`<div class="replies">
      ${["reply_coming","reply_leave","reply_wait","reply_who"].map((n=>B`<button class="btn pressable" @click=${()=>{return o=e(n),ki("tap"),void i.callService("tts","speak",{entity_id:a,media_player_entity_id:s,message:o,language:t.lang}).then((()=>t.toast(e("reply_sent"))),(()=>t.toast(e("error"))));var o}}>🗣️ ${e(n)}</button>`))}
    </div>`}render(){const{ctx:t}=this,{t:e}=t,i=t.config.settings.doorbell,s=i.camera_entity,n=s?Vn(t.hass,s)??Ln(t.hass,s,Date.now()):void 0,a=i.lock_entity?t.hass.states[i.lock_entity]:void 0;return this.mini?B`<div class="pip" role="alertdialog" aria-label=${e("someone_at_door")} @click=${()=>this.mini=!1}>
        ${n?B`<img src=${n} alt="" />`:U}
        <div class="bar">
          <sn-icon icon="bell-ring" style="--icon-size:18px;color:var(--accent-text)"></sn-icon>
          <span>${e("someone_at_door")}</span>
          <button class="icon-btn small pressable" aria-label=${e("dismiss")} @click=${t=>(t.stopPropagation(),this.onDismiss())}>
            <sn-icon icon="close" style="--icon-size:16px"></sn-icon>
          </button>
        </div>
      </div>`:B`<div class="scrim" @click=${t=>t.target===t.currentTarget&&this.onDismiss()}>
      <div class="card" role="alertdialog" aria-label=${e("someone_at_door")}>
        ${n?B`<div class="video">
              <img src=${n} alt="" /><span class="live">${e("streaming")}</span>
              <button class="icon-btn small pressable shrink" aria-label=${e("door_mini")} title=${e("door_mini")} @click=${()=>this.mini=!0}>
                <sn-icon icon="picture-in-picture" style="--icon-size:18px"></sn-icon>
              </button>
            </div>`:U}
        <div class="foot">
          <span class="bell"><sn-icon icon="bell-ring"></sn-icon></span>
          <span class="title">
            <strong>${e("someone_at_door")}</strong>
            <span class="muted">${s?ie(t.hass,t.config,s)+" · ":""}${this.at.toLocaleTimeString(Ot[t.lang],{hour:"2-digit",minute:"2-digit"})}</span>
            ${this.known?B`<span class="seen">👋 ${this.ctx.t("face_hello",{name:this.known})}</span>`:U}
            ${this.looking?B`<span class="seen shimmer">✨ ${e("ai_looking")}</span>`:this.seen?B`<span class="seen">✨ ${this.seen}</span>`:U}
          </span>
          <button class="btn pressable" @click=${()=>this.onDismiss()}>${e("dismiss")}</button>
        </div>
        ${this.renderReplies()}
        ${a&&"unlocked"!==a.state?B`<div style="padding:0 20px 20px">
              <sn-slide-confirm
                .label=${e("slide_open_door")}
                icon="lock-open"
                .onConfirm=${()=>{t.hass.callService("lock","unlock",{entity_id:a.entity_id}).catch((()=>t.toast(e("error")))),this.onDismiss()}}
              ></sn-slide-confirm>
            </div>`:U}
      </div>
    </div>`}};function kd(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}$d.styles=[fi,r`
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
      .replies {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        padding: 0 20px 14px;
      }
      .replies .btn {
        min-height: 40px;
        font-size: 14px;
      }
      .pip {
        position: fixed;
        z-index: 80;
        bottom: 96px;
        inset-inline-end: 16px;
        width: min(320px, calc(100vw - 32px));
        border-radius: var(--r-lg);
        overflow: hidden;
        background: #0d1114;
        box-shadow: var(--shadow-lift), 0 0 0 2px var(--accent);
        animation: pop 420ms var(--spring);
        cursor: pointer;
      }
      .pip img {
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
        display: block;
      }
      .pip .bar {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px;
        background: var(--surface-solid);
      }
      .pip .bar span {
        flex: 1;
        font-size: 13px;
        font-weight: 600;
        padding-inline-start: 6px;
      }
      .shrink {
        position: absolute;
        top: 12px;
        inset-inline-end: 12px;
        background: rgba(21, 26, 30, 0.6);
        color: #fff;
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
    `],wd([gt({attribute:!1})],$d.prototype,"ctx",2),wd([gt({attribute:!1})],$d.prototype,"at",2),wd([gt({attribute:!1})],$d.prototype,"onDismiss",2),wd([gt({type:Boolean})],$d.prototype,"silent",2),wd([mt()],$d.prototype,"confirm",2),wd([mt()],$d.prototype,"mini",2),wd([mt()],$d.prototype,"seen",2),wd([mt()],$d.prototype,"looking",2),wd([mt()],$d.prototype,"known",2),$d=wd([pt("sn-doorbell")],$d);var Cd,Md,Hd={exports:{}};Cd=Hd,(Md=function(){var t=function(t,e){var i=t,s=d[e],n=null,a=0,o=null,r=[],l={},c=function(t,e){n=function(t){for(var e=new Array(t),i=0;i<t;i+=1){e[i]=new Array(t);for(var s=0;s<t;s+=1)e[i][s]=null}return e}(a=4*i+17),p(0,0),p(a-7,0),p(0,a-7),u(),h(),m(t,e),i>=7&&g(t),null==o&&(o=b(i,s,r)),f(o,e)},p=function(t,e){for(var i=-1;i<=7;i+=1)if(!(t+i<=-1||a<=t+i))for(var s=-1;s<=7;s+=1)e+s<=-1||a<=e+s||(n[t+i][e+s]=0<=i&&i<=6&&(0==s||6==s)||0<=s&&s<=6&&(0==i||6==i)||2<=i&&i<=4&&2<=s&&s<=4)},h=function(){for(var t=8;t<a-8;t+=1)null==n[t][6]&&(n[t][6]=t%2==0);for(var e=8;e<a-8;e+=1)null==n[6][e]&&(n[6][e]=e%2==0)},u=function(){for(var t=y.getPatternPosition(i),e=0;e<t.length;e+=1)for(var s=0;s<t.length;s+=1){var a=t[e],o=t[s];if(null==n[a][o])for(var r=-2;r<=2;r+=1)for(var l=-2;l<=2;l+=1)n[a+r][o+l]=-2==r||2==r||-2==l||2==l||0==r&&0==l}},g=function(t){for(var e=y.getBCHTypeNumber(i),s=0;s<18;s+=1){var o=!t&&1==(e>>s&1);n[Math.floor(s/3)][s%3+a-8-3]=o}for(s=0;s<18;s+=1)o=!t&&1==(e>>s&1),n[s%3+a-8-3][Math.floor(s/3)]=o},m=function(t,e){for(var i=s<<3|e,o=y.getBCHTypeInfo(i),r=0;r<15;r+=1){var l=!t&&1==(o>>r&1);r<6?n[r][8]=l:r<8?n[r+1][8]=l:n[a-15+r][8]=l}for(r=0;r<15;r+=1)l=!t&&1==(o>>r&1),r<8?n[8][a-r-1]=l:r<9?n[8][15-r-1+1]=l:n[8][15-r-1]=l;n[a-8][8]=!t},f=function(t,e){for(var i=-1,s=a-1,o=7,r=0,l=y.getMaskFunction(e),c=a-1;c>0;c-=2)for(6==c&&(c-=1);;){for(var d=0;d<2;d+=1)if(null==n[s][c-d]){var p=!1;r<t.length&&(p=1==(t[r]>>>o&1)),l(s,c-d)&&(p=!p),n[s][c-d]=p,-1==(o-=1)&&(r+=1,o=7)}if((s+=i)<0||a<=s){s-=i,i=-i;break}}},b=function(t,e,i){for(var s=w.getRSBlocks(t,e),n=$(),a=0;a<i.length;a+=1){var o=i[a];n.put(o.getMode(),4),n.put(o.getLength(),y.getLengthInBits(o.getMode(),t)),o.write(n)}var r=0;for(a=0;a<s.length;a+=1)r+=s[a].dataCount;if(n.getLengthInBits()>8*r)throw"code length overflow. ("+n.getLengthInBits()+">"+8*r+")";for(n.getLengthInBits()+4<=8*r&&n.put(0,4);n.getLengthInBits()%8!=0;)n.putBit(!1);for(;!(n.getLengthInBits()>=8*r||(n.put(236,8),n.getLengthInBits()>=8*r));)n.put(17,8);return function(t,e){for(var i=0,s=0,n=0,a=new Array(e.length),o=new Array(e.length),r=0;r<e.length;r+=1){var l=e[r].dataCount,c=e[r].totalCount-l;s=Math.max(s,l),n=Math.max(n,c),a[r]=new Array(l);for(var d=0;d<a[r].length;d+=1)a[r][d]=255&t.getBuffer()[d+i];i+=l;var p=y.getErrorCorrectPolynomial(c),h=x(a[r],p.getLength()-1).mod(p);for(o[r]=new Array(p.getLength()-1),d=0;d<o[r].length;d+=1){var u=d+h.getLength()-o[r].length;o[r][d]=u>=0?h.getAt(u):0}}var g=0;for(d=0;d<e.length;d+=1)g+=e[d].totalCount;var m=new Array(g),f=0;for(d=0;d<s;d+=1)for(r=0;r<e.length;r+=1)d<a[r].length&&(m[f]=a[r][d],f+=1);for(d=0;d<n;d+=1)for(r=0;r<e.length;r+=1)d<o[r].length&&(m[f]=o[r][d],f+=1);return m}(n,s)};l.addData=function(t,e){var i=null;switch(e=e||"Byte"){case"Numeric":i=k(t);break;case"Alphanumeric":i=C(t);break;case"Byte":i=M(t);break;case"Kanji":i=H(t);break;default:throw"mode:"+e}r.push(i),o=null},l.isDark=function(t,e){if(t<0||a<=t||e<0||a<=e)throw t+","+e;return n[t][e]},l.getModuleCount=function(){return a},l.make=function(){if(i<1){for(var t=1;t<40;t++){for(var e=w.getRSBlocks(t,s),n=$(),a=0;a<r.length;a++){var o=r[a];n.put(o.getMode(),4),n.put(o.getLength(),y.getLengthInBits(o.getMode(),t)),o.write(n)}var d=0;for(a=0;a<e.length;a++)d+=e[a].dataCount;if(n.getLengthInBits()<=8*d)break}i=t}c(!1,function(){for(var t=0,e=0,i=0;i<8;i+=1){c(!0,i);var s=y.getLostPoint(l);(0==i||t>s)&&(t=s,e=i)}return e}())},l.createTableTag=function(t,e){t=t||2;var i="";i+='<table style="',i+=" border-width: 0px; border-style: none;",i+=" border-collapse: collapse;",i+=" padding: 0px; margin: "+(e=void 0===e?4*t:e)+"px;",i+='">',i+="<tbody>";for(var s=0;s<l.getModuleCount();s+=1){i+="<tr>";for(var n=0;n<l.getModuleCount();n+=1)i+='<td style="',i+=" border-width: 0px; border-style: none;",i+=" border-collapse: collapse;",i+=" padding: 0px; margin: 0px;",i+=" width: "+t+"px;",i+=" height: "+t+"px;",i+=" background-color: ",i+=l.isDark(s,n)?"#000000":"#ffffff",i+=";",i+='"/>';i+="</tr>"}return i+="</tbody>",i+="</table>"},l.createSvgTag=function(t,e,i,s){var n={};"object"==typeof arguments[0]&&(t=(n=arguments[0]).cellSize,e=n.margin,i=n.alt,s=n.title),t=t||2,e=void 0===e?4*t:e,(i="string"==typeof i?{text:i}:i||{}).text=i.text||null,i.id=i.text?i.id||"qrcode-description":null,(s="string"==typeof s?{text:s}:s||{}).text=s.text||null,s.id=s.text?s.id||"qrcode-title":null;var a,o,r,c,d=l.getModuleCount()*t+2*e,p="";for(c="l"+t+",0 0,"+t+" -"+t+",0 0,-"+t+"z ",p+='<svg version="1.1" xmlns="http://www.w3.org/2000/svg"',p+=n.scalable?"":' width="'+d+'px" height="'+d+'px"',p+=' viewBox="0 0 '+d+" "+d+'" ',p+=' preserveAspectRatio="xMinYMin meet"',p+=s.text||i.text?' role="img" aria-labelledby="'+_([s.id,i.id].join(" ").trim())+'"':"",p+=">",p+=s.text?'<title id="'+_(s.id)+'">'+_(s.text)+"</title>":"",p+=i.text?'<description id="'+_(i.id)+'">'+_(i.text)+"</description>":"",p+='<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>',p+='<path d="',o=0;o<l.getModuleCount();o+=1)for(r=o*t+e,a=0;a<l.getModuleCount();a+=1)l.isDark(o,a)&&(p+="M"+(a*t+e)+","+r+c);return p+='" stroke="transparent" fill="black"/>',p+="</svg>"},l.createDataURL=function(t,e){t=t||2,e=void 0===e?4*t:e;var i=l.getModuleCount()*t+2*e,s=e,n=i-e;return V(i,i,(function(e,i){if(s<=e&&e<n&&s<=i&&i<n){var a=Math.floor((e-s)/t),o=Math.floor((i-s)/t);return l.isDark(o,a)?0:1}return 1}))},l.createImgTag=function(t,e,i){t=t||2,e=void 0===e?4*t:e;var s=l.getModuleCount()*t+2*e,n="";return n+="<img",n+=' src="',n+=l.createDataURL(t,e),n+='"',n+=' width="',n+=s,n+='"',n+=' height="',n+=s,n+='"',i&&(n+=' alt="',n+=_(i),n+='"'),n+="/>"};var _=function(t){for(var e="",i=0;i<t.length;i+=1){var s=t.charAt(i);switch(s){case"<":e+="&lt;";break;case">":e+="&gt;";break;case"&":e+="&amp;";break;case'"':e+="&quot;";break;default:e+=s}}return e};return l.createASCII=function(t,e){if((t=t||1)<2)return function(t){t=void 0===t?2:t;var e,i,s,n,a,o=1*l.getModuleCount()+2*t,r=t,c=o-t,d={"██":"█","█ ":"▀"," █":"▄","  ":" "},p={"██":"▀","█ ":"▀"," █":" ","  ":" "},h="";for(e=0;e<o;e+=2){for(s=Math.floor((e-r)/1),n=Math.floor((e+1-r)/1),i=0;i<o;i+=1)a="█",r<=i&&i<c&&r<=e&&e<c&&l.isDark(s,Math.floor((i-r)/1))&&(a=" "),r<=i&&i<c&&r<=e+1&&e+1<c&&l.isDark(n,Math.floor((i-r)/1))?a+=" ":a+="█",h+=t<1&&e+1>=c?p[a]:d[a];h+="\n"}return o%2&&t>0?h.substring(0,h.length-o-1)+Array(o+1).join("▀"):h.substring(0,h.length-1)}(e);t-=1,e=void 0===e?2*t:e;var i,s,n,a,o=l.getModuleCount()*t+2*e,r=e,c=o-e,d=Array(t+1).join("██"),p=Array(t+1).join("  "),h="",u="";for(i=0;i<o;i+=1){for(n=Math.floor((i-r)/t),u="",s=0;s<o;s+=1)a=1,r<=s&&s<c&&r<=i&&i<c&&l.isDark(n,Math.floor((s-r)/t))&&(a=0),u+=a?d:p;for(n=0;n<t;n+=1)h+=u+"\n"}return h.substring(0,h.length-1)},l.renderTo2dContext=function(t,e){e=e||2;for(var i=l.getModuleCount(),s=0;s<i;s++)for(var n=0;n<i;n++)t.fillStyle=l.isDark(s,n)?"black":"white",t.fillRect(s*e,n*e,e,e)},l};t.stringToBytes=(t.stringToBytesFuncs={default:function(t){for(var e=[],i=0;i<t.length;i+=1){var s=t.charCodeAt(i);e.push(255&s)}return e}}).default,t.createStringToBytes=function(t,e){var i=function(){for(var i=L(t),s=function(){var t=i.read();if(-1==t)throw"eof";return t},n=0,a={};;){var o=i.read();if(-1==o)break;var r=s(),l=s()<<8|s();a[String.fromCharCode(o<<8|r)]=l,n+=1}if(n!=e)throw n+" != "+e;return a}(),s="?".charCodeAt(0);return function(t){for(var e=[],n=0;n<t.length;n+=1){var a=t.charCodeAt(n);if(a<128)e.push(a);else{var o=i[t.charAt(n)];"number"==typeof o?(255&o)==o?e.push(o):(e.push(o>>>8),e.push(255&o)):e.push(s)}}return e}};var e,i,s,n,a,o=1,r=2,l=4,c=8,d={L:1,M:0,Q:3,H:2},p=0,h=1,u=2,g=3,m=4,f=5,b=6,_=7,y=(e=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],i=1335,s=7973,a=function(t){for(var e=0;0!=t;)e+=1,t>>>=1;return e},(n={}).getBCHTypeInfo=function(t){for(var e=t<<10;a(e)-a(i)>=0;)e^=i<<a(e)-a(i);return 21522^(t<<10|e)},n.getBCHTypeNumber=function(t){for(var e=t<<12;a(e)-a(s)>=0;)e^=s<<a(e)-a(s);return t<<12|e},n.getPatternPosition=function(t){return e[t-1]},n.getMaskFunction=function(t){switch(t){case p:return function(t,e){return(t+e)%2==0};case h:return function(t,e){return t%2==0};case u:return function(t,e){return e%3==0};case g:return function(t,e){return(t+e)%3==0};case m:return function(t,e){return(Math.floor(t/2)+Math.floor(e/3))%2==0};case f:return function(t,e){return t*e%2+t*e%3==0};case b:return function(t,e){return(t*e%2+t*e%3)%2==0};case _:return function(t,e){return(t*e%3+(t+e)%2)%2==0};default:throw"bad maskPattern:"+t}},n.getErrorCorrectPolynomial=function(t){for(var e=x([1],0),i=0;i<t;i+=1)e=e.multiply(x([1,v.gexp(i)],0));return e},n.getLengthInBits=function(t,e){if(1<=e&&e<10)switch(t){case o:return 10;case r:return 9;case l:case c:return 8;default:throw"mode:"+t}else if(e<27)switch(t){case o:return 12;case r:return 11;case l:return 16;case c:return 10;default:throw"mode:"+t}else{if(!(e<41))throw"type:"+e;switch(t){case o:return 14;case r:return 13;case l:return 16;case c:return 12;default:throw"mode:"+t}}},n.getLostPoint=function(t){for(var e=t.getModuleCount(),i=0,s=0;s<e;s+=1)for(var n=0;n<e;n+=1){for(var a=0,o=t.isDark(s,n),r=-1;r<=1;r+=1)if(!(s+r<0||e<=s+r))for(var l=-1;l<=1;l+=1)n+l<0||e<=n+l||0==r&&0==l||o==t.isDark(s+r,n+l)&&(a+=1);a>5&&(i+=3+a-5)}for(s=0;s<e-1;s+=1)for(n=0;n<e-1;n+=1){var c=0;t.isDark(s,n)&&(c+=1),t.isDark(s+1,n)&&(c+=1),t.isDark(s,n+1)&&(c+=1),t.isDark(s+1,n+1)&&(c+=1),0!=c&&4!=c||(i+=3)}for(s=0;s<e;s+=1)for(n=0;n<e-6;n+=1)t.isDark(s,n)&&!t.isDark(s,n+1)&&t.isDark(s,n+2)&&t.isDark(s,n+3)&&t.isDark(s,n+4)&&!t.isDark(s,n+5)&&t.isDark(s,n+6)&&(i+=40);for(n=0;n<e;n+=1)for(s=0;s<e-6;s+=1)t.isDark(s,n)&&!t.isDark(s+1,n)&&t.isDark(s+2,n)&&t.isDark(s+3,n)&&t.isDark(s+4,n)&&!t.isDark(s+5,n)&&t.isDark(s+6,n)&&(i+=40);var d=0;for(n=0;n<e;n+=1)for(s=0;s<e;s+=1)t.isDark(s,n)&&(d+=1);return i+=Math.abs(100*d/e/e-50)/5*10},n),v=function(){for(var t=new Array(256),e=new Array(256),i=0;i<8;i+=1)t[i]=1<<i;for(i=8;i<256;i+=1)t[i]=t[i-4]^t[i-5]^t[i-6]^t[i-8];for(i=0;i<255;i+=1)e[t[i]]=i;var s={glog:function(t){if(t<1)throw"glog("+t+")";return e[t]},gexp:function(e){for(;e<0;)e+=255;for(;e>=256;)e-=255;return t[e]}};return s}();function x(t,e){if(void 0===t.length)throw t.length+"/"+e;var i=function(){for(var i=0;i<t.length&&0==t[i];)i+=1;for(var s=new Array(t.length-i+e),n=0;n<t.length-i;n+=1)s[n]=t[n+i];return s}(),s={getAt:function(t){return i[t]},getLength:function(){return i.length},multiply:function(t){for(var e=new Array(s.getLength()+t.getLength()-1),i=0;i<s.getLength();i+=1)for(var n=0;n<t.getLength();n+=1)e[i+n]^=v.gexp(v.glog(s.getAt(i))+v.glog(t.getAt(n)));return x(e,0)},mod:function(t){if(s.getLength()-t.getLength()<0)return s;for(var e=v.glog(s.getAt(0))-v.glog(t.getAt(0)),i=new Array(s.getLength()),n=0;n<s.getLength();n+=1)i[n]=s.getAt(n);for(n=0;n<t.getLength();n+=1)i[n]^=v.gexp(v.glog(t.getAt(n))+e);return x(i,0).mod(t)}};return s}var w=function(){var t=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],e=function(t,e){var i={};return i.totalCount=t,i.dataCount=e,i},i={getRSBlocks:function(i,s){var n=function(e,i){switch(i){case d.L:return t[4*(e-1)+0];case d.M:return t[4*(e-1)+1];case d.Q:return t[4*(e-1)+2];case d.H:return t[4*(e-1)+3];default:return}}(i,s);if(void 0===n)throw"bad rs block @ typeNumber:"+i+"/errorCorrectionLevel:"+s;for(var a=n.length/3,o=[],r=0;r<a;r+=1)for(var l=n[3*r+0],c=n[3*r+1],p=n[3*r+2],h=0;h<l;h+=1)o.push(e(c,p));return o}};return i}(),$=function(){var t=[],e=0,i={getBuffer:function(){return t},getAt:function(e){var i=Math.floor(e/8);return 1==(t[i]>>>7-e%8&1)},put:function(t,e){for(var s=0;s<e;s+=1)i.putBit(1==(t>>>e-s-1&1))},getLengthInBits:function(){return e},putBit:function(i){var s=Math.floor(e/8);t.length<=s&&t.push(0),i&&(t[s]|=128>>>e%8),e+=1}};return i},k=function(t){var e=o,i=t,s={getMode:function(){return e},getLength:function(t){return i.length},write:function(t){for(var e=i,s=0;s+2<e.length;)t.put(n(e.substring(s,s+3)),10),s+=3;s<e.length&&(e.length-s==1?t.put(n(e.substring(s,s+1)),4):e.length-s==2&&t.put(n(e.substring(s,s+2)),7))}},n=function(t){for(var e=0,i=0;i<t.length;i+=1)e=10*e+a(t.charAt(i));return e},a=function(t){if("0"<=t&&t<="9")return t.charCodeAt(0)-"0".charCodeAt(0);throw"illegal char :"+t};return s},C=function(t){var e=r,i=t,s={getMode:function(){return e},getLength:function(t){return i.length},write:function(t){for(var e=i,s=0;s+1<e.length;)t.put(45*n(e.charAt(s))+n(e.charAt(s+1)),11),s+=2;s<e.length&&t.put(n(e.charAt(s)),6)}},n=function(t){if("0"<=t&&t<="9")return t.charCodeAt(0)-"0".charCodeAt(0);if("A"<=t&&t<="Z")return t.charCodeAt(0)-"A".charCodeAt(0)+10;switch(t){case" ":return 36;case"$":return 37;case"%":return 38;case"*":return 39;case"+":return 40;case"-":return 41;case".":return 42;case"/":return 43;case":":return 44;default:throw"illegal char :"+t}};return s},M=function(e){var i=l,s=t.stringToBytes(e),n={getMode:function(){return i},getLength:function(t){return s.length},write:function(t){for(var e=0;e<s.length;e+=1)t.put(s[e],8)}};return n},H=function(e){var i=c,s=t.stringToBytesFuncs.SJIS;if(!s)throw"sjis not supported.";!function(){var t=s("友");if(2!=t.length||38726!=(t[0]<<8|t[1]))throw"sjis not supported."}();var n=s(e),a={getMode:function(){return i},getLength:function(t){return~~(n.length/2)},write:function(t){for(var e=n,i=0;i+1<e.length;){var s=(255&e[i])<<8|255&e[i+1];if(33088<=s&&s<=40956)s-=33088;else{if(!(57408<=s&&s<=60351))throw"illegal char at "+(i+1)+"/"+s;s-=49472}s=192*(s>>>8&255)+(255&s),t.put(s,13),i+=2}if(i<e.length)throw"illegal char at "+(i+1)}};return a},A=function(){var t=[],e={writeByte:function(e){t.push(255&e)},writeShort:function(t){e.writeByte(t),e.writeByte(t>>>8)},writeBytes:function(t,i,s){i=i||0,s=s||t.length;for(var n=0;n<s;n+=1)e.writeByte(t[n+i])},writeString:function(t){for(var i=0;i<t.length;i+=1)e.writeByte(t.charCodeAt(i))},toByteArray:function(){return t},toString:function(){var e="";e+="[";for(var i=0;i<t.length;i+=1)i>0&&(e+=","),e+=t[i];return e+="]"}};return e},L=function(t){var e=t,i=0,s=0,n=0,a={read:function(){for(;n<8;){if(i>=e.length){if(0==n)return-1;throw"unexpected end of file./"+n}var t=e.charAt(i);if(i+=1,"="==t)return n=0,-1;t.match(/^\s$/)||(s=s<<6|o(t.charCodeAt(0)),n+=6)}var a=s>>>n-8&255;return n-=8,a}},o=function(t){if(65<=t&&t<=90)return t-65;if(97<=t&&t<=122)return t-97+26;if(48<=t&&t<=57)return t-48+52;if(43==t)return 62;if(47==t)return 63;throw"c:"+t};return a},V=function(t,e,i){for(var s=function(t,e){var i=t,s=e,n=new Array(t*e),a={setPixel:function(t,e,s){n[e*i+t]=s},write:function(t){t.writeString("GIF87a"),t.writeShort(i),t.writeShort(s),t.writeByte(128),t.writeByte(0),t.writeByte(0),t.writeByte(0),t.writeByte(0),t.writeByte(0),t.writeByte(255),t.writeByte(255),t.writeByte(255),t.writeString(","),t.writeShort(0),t.writeShort(0),t.writeShort(i),t.writeShort(s),t.writeByte(0);var e=o(2);t.writeByte(2);for(var n=0;e.length-n>255;)t.writeByte(255),t.writeBytes(e,n,255),n+=255;t.writeByte(e.length-n),t.writeBytes(e,n,e.length-n),t.writeByte(0),t.writeString(";")}},o=function(t){for(var e=1<<t,i=1+(1<<t),s=t+1,a=r(),o=0;o<e;o+=1)a.add(String.fromCharCode(o));a.add(String.fromCharCode(e)),a.add(String.fromCharCode(i));var l,c,d,p=A(),h=(l=p,c=0,d=0,{write:function(t,e){if(t>>>e!=0)throw"length over";for(;c+e>=8;)l.writeByte(255&(t<<c|d)),e-=8-c,t>>>=8-c,d=0,c=0;d|=t<<c,c+=e},flush:function(){c>0&&l.writeByte(d)}});h.write(e,s);var u=0,g=String.fromCharCode(n[u]);for(u+=1;u<n.length;){var m=String.fromCharCode(n[u]);u+=1,a.contains(g+m)?g+=m:(h.write(a.indexOf(g),s),a.size()<4095&&(a.size()==1<<s&&(s+=1),a.add(g+m)),g=m)}return h.write(a.indexOf(g),s),h.write(i,s),h.flush(),p.toByteArray()},r=function(){var t={},e=0,i={add:function(s){if(i.contains(s))throw"dup key:"+s;t[s]=e,e+=1},size:function(){return e},indexOf:function(e){return t[e]},contains:function(e){return void 0!==t[e]}};return i};return a}(t,e),n=0;n<e;n+=1)for(var a=0;a<t;a+=1)s.setPixel(a,n,i(a,n));var o=A();s.write(o);for(var r=function(){var t=0,e=0,i=0,s="",n={},a=function(t){s+=String.fromCharCode(o(63&t))},o=function(t){if(t<0);else{if(t<26)return 65+t;if(t<52)return t-26+97;if(t<62)return t-52+48;if(62==t)return 43;if(63==t)return 47}throw"n:"+t};return n.writeByte=function(s){for(t=t<<8|255&s,e+=8,i+=1;e>=6;)a(t>>>e-6),e-=6},n.flush=function(){if(e>0&&(a(t<<6-e),t=0,e=0),i%3!=0)for(var n=3-i%3,o=0;o<n;o+=1)s+="="},n.toString=function(){return s},n}(),l=o.toByteArray(),c=0;c<l.length;c+=1)r.writeByte(l[c]);return r.flush(),"data:image/gif;base64,"+r};return t}()).stringToBytesFuncs["UTF-8"]=function(t){return function(t){for(var e=[],i=0;i<t.length;i++){var s=t.charCodeAt(i);s<128?e.push(s):s<2048?e.push(192|s>>6,128|63&s):s<55296||s>=57344?e.push(224|s>>12,128|s>>6&63,128|63&s):(i++,s=65536+((1023&s)<<10|1023&t.charCodeAt(i)),e.push(240|s>>18,128|s>>12&63,128|s>>6&63,128|63&s))}return e}(t)},Cd.exports=Md;const Ad=kd(Hd.exports);var Ld=Object.defineProperty,Vd=Object.getOwnPropertyDescriptor,Sd=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Vd(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&Ld(e,i,a),a};const zd="smartnest-guests";function Dd(t,e=160){const i=Ad(0,"M");i.addData(t),i.make();const s=i.getModuleCount(),n=[];for(let a=0;a<s;a++)for(let t=0;t<s;t++)i.isDark(a,t)&&n.push(`M${t} ${a}h1v1h-1z`);return B`<svg viewBox="-2 -2 ${s+4} ${s+4}" width=${e} height=${e} role="img" aria-label="Wi-Fi QR" shape-rendering="crispEdges">
    ${Z`<rect x="-2" y="-2" width=${s+4} height=${s+4} rx="2" fill="#fff"></rect><path d=${n.join("")} fill="#1E252B"></path>`}
  </svg>`}let Od=class extends ct{constructor(){super(...arguments),this.dim=!1}render(){const{ctx:t}=this,e=t.config.settings.guests;return B`<div class="card glass">
      <div class="txt">
        <strong>${e.welcome||t.t("welcome_default")} 🤍</strong>
        ${e.ssid?B`<span><sn-icon icon="wifi"></sn-icon>${e.ssid}</span><span>${t.t("scan_wifi")}</span>`:""}
      </div>
      ${e.ssid?B`<div class="qr">${Dd(function(t,e){const i=t=>t.replace(/([\;,:"])/g,"\\$1");return e?`WIFI:T:WPA;S:${i(t)};P:${i(e)};;`:`WIFI:T:nopass;S:${i(t)};;`}(e.ssid,e.password),this.dim?140:120)}</div>`:""}
    </div>`}};Od.styles=[fi,r`
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
    `],Sd([gt({attribute:!1})],Od.prototype,"ctx",2),Sd([gt({type:Boolean,reflect:!0})],Od.prototype,"dim",2),Od=Sd([pt("sn-guests")],Od);var Td=Object.defineProperty,jd=Object.getOwnPropertyDescriptor,Pd=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?jd(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&Td(e,i,a),a};const Id=["20% 30%","80% 25%","70% 80%","25% 75%","50% 50%"];let Ed=class extends ct{constructor(){super(...arguments),this.guests=!1,this.now=new Date,this.drift={x:0,y:0},this.slides=[],this.photos=[],this.photoIdx=0,this.alive=!1}connectedCallback(){super.connectedCallback(),this.alive=!0,this.timer=window.setInterval((()=>{this.now=new Date,this.now.getSeconds()<10&&(this.drift={x:Math.round(60*Math.random()-30),y:Math.round(40*Math.random()-20)})}),1e4),this.loadPhotos()}disconnectedCallback(){super.disconnectedCallback(),this.alive=!1,window.clearInterval(this.timer),window.clearTimeout(this.photoTimer)}async loadPhotos(){const t=this.ctx.config.settings.screensaver;if(t.photos&&this.ctx.allows("photo_frame")){try{const e=await this.ctx.hass.callWS({type:"media_source/browse_media",media_content_id:t.photo_folder.startsWith("media-source://")?t.photo_folder:`media-source://media_source/local/${t.photo_folder}`});this.photos=(e.children??[]).filter((t=>"image"===t.media_class||"video"===t.media_class)).map((t=>({id:t.media_content_id,video:"video"===t.media_class})))}catch{this.photos=[]}for(let t=this.photos.length-1;t>0;t--){const e=Math.floor(Math.random()*(t+1));[this.photos[t],this.photos[e]]=[this.photos[e],this.photos[t]]}this.photos.length&&this.next()}}async next(){if(!this.alive||!this.photos.length)return;const{id:t,video:e}=this.photos[this.photoIdx++%this.photos.length],i=Math.max(5,this.ctx.config.settings.screensaver.photo_seconds);try{const{url:i}=await this.ctx.hass.callWS({type:"media_source/resolve_media",media_content_id:t}),s=this.ctx.hass.hassUrl(i);if(e||await new Promise(((t,e)=>{const i=new Image;i.onload=()=>t(),i.onerror=()=>e(),i.src=s})),!this.alive)return;const n={url:s,key:Date.now(),origin:Id[this.photoIdx%Id.length],video:e};this.slides=[...this.slides.slice(-1),n]}catch{}this.photoTimer=window.setTimeout((()=>this.next()),1e3*i)}renderAnalog(){const t=this.now,e=t.getMinutes()+t.getSeconds()/60,i=t.getHours()%12+e/60;return B`<svg viewBox="0 0 200 200" style="width:min(56vmin,420px);height:auto;filter:drop-shadow(0 10px 30px rgba(0,0,0,.35))" aria-label=${t.toLocaleTimeString()}>
      ${Z`<circle cx="100" cy="100" r="96" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.18)" stroke-width="1.5"></circle>
      ${Array.from({length:12},((t,e)=>Z`<line x1="100" y1="10" x2="100" y2=${e%3?18:24} stroke=${e%3?"rgba(255,255,255,.35)":"#E9971D"} stroke-width=${e%3?2:4} stroke-linecap="round" transform="rotate(${30*e} 100 100)"></line>`))}
      <line x1="100" y1="100" x2="100" y2="52" stroke="#fff" stroke-width="7" stroke-linecap="round" style="transform:rotate(${30*i}deg);transform-origin:100px 100px;transition:transform 1s cubic-bezier(0.22,1,0.36,1)"></line>
      <line x1="100" y1="100" x2="100" y2="26" stroke="#fff" stroke-width="4" stroke-linecap="round" style="transform:rotate(${6*e}deg);transform-origin:100px 100px;transition:transform 1s cubic-bezier(0.22,1,0.36,1)"></line>
      <circle cx="100" cy="100" r="6" fill="#E9971D"></circle>`}
    </svg>`}renderClock(t,e){const{ctx:i}=this,s=i.allows("clock_styles")?i.config.settings.screensaver.style:"classic";if("analog"===s&&!e)return B`<div class="center" style="transform:translate(${this.drift.x}px, ${this.drift.y}px)">
        ${this.renderAnalog()}
        <div class="date">${this.now.toLocaleDateString(t,{weekday:"long",day:"numeric",month:"long"})}</div>
      </div>`;if("minimal"===s&&!e)return B`<div class="center" style="transform:translate(${this.drift.x}px, ${this.drift.y}px)">
        <div class="time ltr" style="font-weight:400;letter-spacing:.04em;opacity:.9">${this.now.toLocaleTimeString(t,{hour:"2-digit",minute:"2-digit"})}</div>
      </div>`;const n=i.config.settings.screensaver.temp_entity,a=n?i.hass.states[n]:void 0;return B`<div class=${e?"corner":"center"} style="transform:translate(${this.drift.x}px, ${this.drift.y}px)">
      <div class="time ltr">${this.now.toLocaleTimeString(t,{hour:"2-digit",minute:"2-digit"})}</div>
      <div class="date">${this.now.toLocaleDateString(t,{weekday:"long",day:"numeric",month:"long"})}</div>
      ${a?B`<div class="temp ltr">${be(i.t,a,i.lang)}</div>`:U}
    </div>`}renderNow(){const{hass:t,t:e}=this.ctx,i=Object.values(t.states).filter((e=>!t.entities?.[e.entity_id]?.entity_category&&!t.entities?.[e.entity_id]?.hidden)),s=i.filter((t=>t.entity_id.startsWith("light.")&&"on"===t.state)).map((t=>t.entity_id)),n=s.length,a=i.filter((t=>t.entity_id.startsWith("climate.")&&!["off","unavailable"].includes(t.state))).length,o=i.filter((t=>t.entity_id.startsWith("binary_sensor.")&&["door","window","garage_door","opening"].includes(t.attributes.device_class)&&"on"===t.state)).length,r=i.filter((t=>t.entity_id.startsWith("lock.")&&"unlocked"===t.state)).map((t=>t.entity_id)),l=r.length,c=(t,e)=>{t.stopPropagation(),e()};return n||a||o||l?B`<div class="now">
      ${n?B`<span
            role="button"
            tabindex="0"
            title=${e("ss_lights_off")}
            @click=${i=>c(i,(()=>this.ctx.undoable(s,e("ss_lights_off"),(()=>t.callService("light","turn_off",{entity_id:s})))))}
            ><sn-icon icon="lightbulb"></sn-icon>${n} · ${e("ss_lights_off")}</span
          >`:U}
      ${a?B`<span><sn-icon icon="snowflake"></sn-icon>${a}</span>`:U}
      ${o?B`<span class="warn"><sn-icon icon="door-open"></sn-icon>${e("ss_open",{n:o})}</span>`:U}
      ${l?B`<span
            class="warn"
            role="button"
            tabindex="0"
            @click=${i=>c(i,(()=>t.callService("lock","lock",{entity_id:r}).catch((()=>this.ctx.toast(e("error"))))))}
            ><sn-icon icon="lock-open"></sn-icon>${e("ss_unlocked",{n:l})} · ${e("ss_lock")}</span
          >`:U}
    </div>`:U}render(){const{ctx:t}=this,e=Ot[t.lang],i=this.slides.length>0,s=Math.max(5,t.config.settings.screensaver.photo_seconds)+2;return B`<div
      class="ss ${i?"photos":""}"
      style="--gx:${30+this.drift.x/2}%;--gy:${55+this.drift.y/2}%"
      @click=${t=>{t.stopPropagation(),this.onWake()}}
    >
      ${Ht(this.slides,(t=>t.key),((t,e)=>t.video?B`<video class="photo ${e<this.slides.length-1?"out":""}" src=${t.url} autoplay muted loop playsinline style="object-fit:cover;width:100%;height:100%;animation-name:in"></video>`:B`<div
                class="photo ${e<this.slides.length-1?"out":""}"
                style="background-image:url('${t.url}');transform-origin:${t.origin};--dur:${s}s"
              ></div>`))}
      ${i?B`<div class="shade"></div>`:U} ${this.renderClock(e,i)}
      ${this.guests?B`<sn-guests dim .ctx=${t} style="position:absolute;top:32px;inset-inline-end:32px;max-width:min(560px,80vw)"></sn-guests>`:U}
      ${t.allows("seasons")?B`<sn-season .season=${Un(t.config.settings,this.now)}></sn-season>`:U}
      ${this.renderNow()}
      ${(()=>{const e=t.allows("white_label")?t.config.settings.installer.brand:void 0;return e?.logo||e?.name?B`<div class="brand">
              ${e.logo?B`<img src=${e.logo} alt="" style="object-fit:contain" />`:U}
              <span>${e.name??""}</span>
            </div>`:B`<div class="brand">
              <img src="${t.assetBase}logo/smartnest-symbol-white.svg" alt="" />
              <span>SmartNest${i?"":B` · ${t.t("tagline")}`}</span>
            </div>`})()}
    </div>`}};Ed.styles=[fi,r`
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
      /* What's on in the house, in one glance from across the room. */
      .now {
        position: absolute;
        bottom: 86px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        justify-content: center;
        max-width: 90vw;
      }
      .now span {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 10px 16px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.08);
        -webkit-backdrop-filter: blur(16px);
        backdrop-filter: blur(16px);
        color: #e9edf1;
        font-size: 17px;
        font-weight: 600;
        --icon-size: 20px;
      }
      .now span[role="button"] {
        cursor: pointer;
      }
      .now span.warn {
        background: rgba(242, 107, 104, 0.25);
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
    `],Pd([gt({attribute:!1})],Ed.prototype,"ctx",2),Pd([gt({attribute:!1})],Ed.prototype,"onWake",2),Pd([gt({type:Boolean})],Ed.prototype,"guests",2),Pd([mt()],Ed.prototype,"now",2),Pd([mt()],Ed.prototype,"drift",2),Pd([mt()],Ed.prototype,"slides",2),Ed=Pd([pt("sn-screensaver")],Ed);var Nd=Object.defineProperty,Wd=Object.getOwnPropertyDescriptor,Rd=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Wd(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&Nd(e,i,a),a};function Fd(t,e){const i={particles:"none",density:0,clouds:0,sun:!1,moon:!1,fog:!1,lightning:!1},s=e?{particles:"stars",density:.5,moon:!0}:{sun:!0};switch(t){case"sunny":case"clear-night":return{...i,...s};case"partlycloudy":return{...i,...s,clouds:1};case"cloudy":return{...i,clouds:3};case"windy":case"windy-variant":return{...i,clouds:2};case"fog":return{...i,fog:!0,clouds:1};case"rainy":return{...i,particles:"rain",density:.9,clouds:2};case"pouring":return{...i,particles:"rain",density:2.2,clouds:3};case"lightning":return{...i,clouds:3,lightning:!0};case"lightning-rainy":return{...i,particles:"rain",density:1.6,clouds:3,lightning:!0};case"snowy":case"snowy-rainy":case"hail":return{...i,particles:"snow",density:.6,clouds:2};default:return e?{...i,...s}:i}}let Bd=class extends ct{constructor(){super(...arguments),this.condition="",this.night=!1,this.dark=!1,this.rising=!1,this.raf=0,this.parts=[],this.scene=Fd("",!1),this.last=0,this.flash=0,this.reduced=matchMedia("(prefers-reduced-motion: reduce)").matches,this.onVisible=()=>{cancelAnimationFrame(this.raf),"visible"===document.visibilityState&&this.loop(0)},this.loop=t=>{const e=this.canvas,i=e?.getContext("2d");e&&i&&((t-this.last>=33||0===t)&&(this.last=t,this.draw(i,e,t)),this.reduced||!this.parts.length&&!this.scene.lightning||(this.raf=requestAnimationFrame(this.loop)))}}connectedCallback(){super.connectedCallback(),document.addEventListener("visibilitychange",this.onVisible)}disconnectedCallback(){super.disconnectedCallback(),cancelAnimationFrame(this.raf),this.ro?.disconnect(),document.removeEventListener("visibilitychange",this.onVisible)}updated(t){(t.has("condition")||t.has("night"))&&(this.scene=Fd(this.condition,this.night),this.seed()),this.ro||(this.ro=new ResizeObserver((()=>this.seed())),this.ro.observe(this)),cancelAnimationFrame(this.raf),this.loop(0)}get canvas(){return this.renderRoot.querySelector("canvas")}seed(){const t=this.canvas;if(!t)return;const e=Math.min(window.devicePixelRatio||1,1.5);t.width=Math.round(t.clientWidth*e),t.height=Math.round(t.clientHeight*e);const{particles:i,density:s}=this.scene,n="none"===i?0:Math.min(350,Math.round(t.clientWidth*t.clientHeight/1e4*s));this.parts=Array.from({length:n},(()=>({x:Math.random()*t.width,y:Math.random()*t.height,v:"rain"===i?9+7*Math.random():"snow"===i?.6+1.2*Math.random():Math.random()*Math.PI*2,s:"stars"===i?.5+1.4*Math.random():"snow"===i?1.5+2.5*Math.random():10+14*Math.random(),a:.25+.55*Math.random()})))}draw(t,e,i){t.clearRect(0,0,e.width,e.height);const{particles:s}=this.scene,n=e.width/(e.clientWidth||1);if("rain"===s){t.strokeStyle=this.dark?"rgba(180,210,255,1)":"rgba(70,100,130,1)",t.lineWidth=1.2*n,t.lineCap="round";for(const i of this.parts)t.globalAlpha=i.a*(this.dark?.45:.3),t.beginPath(),t.moveTo(i.x,i.y),t.lineTo(i.x-.18*i.s*n,i.y+i.s*n),t.stroke(),i.y+=i.v*n,i.x-=.18*i.v*n,i.y>e.height&&(i.y=-i.s*n,i.x=Math.random()*e.width*1.2)}else if("snow"===s){t.fillStyle=this.dark?"#fff":"rgba(150,170,190,1)";for(const s of this.parts)t.globalAlpha=.8*s.a,t.beginPath(),t.arc(s.x+12*Math.sin(i/1400+s.y/60)*n,s.y,s.s*n,0,2*Math.PI),t.fill(),s.y+=s.v*n,s.y>e.height+10&&(s.y=-10,s.x=Math.random()*e.width)}else if("stars"===s){t.fillStyle="#fff";for(const e of this.parts)t.globalAlpha=(this.dark?.85:.35)*(.45+.55*Math.abs(Math.sin(i/1800+e.v))),t.beginPath(),t.arc(e.x,.7*e.y,e.s*n,0,2*Math.PI),t.fill()}if(t.globalAlpha=1,this.scene.lightning&&!this.reduced&&i>this.flash){this.flash=i+6e3+8e3*Math.random();const t=this.renderRoot.querySelector(".flash");t?.animate([{opacity:0},{opacity:.9},{opacity:.1},{opacity:.6},{opacity:0}],{duration:650,easing:"ease-out"})}}skyTint(){const t=this.elevation;if(void 0===t)return;const e=this.dark?1:.7;return`linear-gradient(to bottom, ${t<-6?`rgba(30,45,90,${.32*e})`:t<0?this.rising?`rgba(255,140,150,${.3*e})`:`rgba(150,90,170,${.3*e})`:t<10?`rgba(255,180,90,${.26*e})`:`rgba(120,185,255,${.14*e})`}, transparent 65%)`}render(){const t=this.scene,e=this.skyTint(),i=this.dark?"rgba(140,155,170,.18)":"rgba(255,255,255,.55)";return B`<div style="--cloud:${i}">
      ${e?B`<div class="sky" style="background:${e}"></div>`:U}
      ${t.sun?B`<div class="sun"></div>`:U} ${t.moon?B`<div class="moon"></div>`:U}
      ${Array.from({length:t.clouds},((t,e)=>B`<div class="cloud" style="top:${8+22*e}%;animation-duration:${90+35*e}s;animation-delay:-${31*e}s"></div>`))}
      ${t.fog?B`<div class="fog"></div>`:U}
      <canvas></canvas>
      <div class="flash"></div>
    </div>`}};Bd.styles=r`
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
  `,Rd([gt()],Bd.prototype,"condition",2),Rd([gt({type:Boolean})],Bd.prototype,"night",2),Rd([gt({type:Boolean})],Bd.prototype,"dark",2),Rd([gt({type:Number})],Bd.prototype,"elevation",2),Rd([gt({type:Boolean})],Bd.prototype,"rising",2),Bd=Rd([pt("sn-weather-bg")],Bd);var Zd=Object.defineProperty,qd=Object.getOwnPropertyDescriptor,Ud=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?qd(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&Zd(e,i,a),a};const Yd={away:"scene_away",home:"scene_home",sleep:"scene_sleep",evening:"scene_evening",cinema:"scene_cinema"},Xd={away:4200,home:3e3,sleep:3800,evening:3e3,cinema:3200};let Kd=class extends ct{constructor(){super(...arguments),this.mode="",this.locks=[]}connectedCallback(){super.connectedCallback(),this.locks="away"===this.mode?function(t){const e=new Set;for(const s of t.config.pages)for(const t of s.widgets){t.config.entity&&e.add(t.config.entity);for(const i of t.config.floors??[])for(const t of i.markers??[])e.add(t.entity)}const i=[...e].filter((e=>"lock"===ee(e)&&t.hass.states[e]));return(i.length?i:Object.keys(t.hass.states).filter((t=>"lock"===ee(t)))).slice(0,4)}(this.ctx):[],this.timer=window.setTimeout((()=>this.onDone()),Xd[this.mode]??3e3)}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this.timer)}renderSleep(){const t=Array.from({length:40},((t,e)=>({x:137.5*e%100,y:61.8*e%60,d:e%7*.25})));return B`<div class="moon"></div>
      ${t.map((t=>B`<span class="star" style="left:${t.x}%;top:${t.y}%;animation-delay:${.6+t.d}s"></span>`))}`}renderAway(){const{ctx:t}=this;return this.locks.length?B`<div class="locks">
      ${this.locks.map(((e,i)=>{const s=.9+.45*i+"s";return B`<div class="lock" style="animation-delay:${s}">
          <span class="ic" style="animation-delay:${s}"><sn-icon icon="lock"></sn-icon></span>
          ${ie(t.hass,t.config,e)}
          <sn-icon class="ok" icon="check-circle" style="animation-delay:calc(${s} + 0.35s)"></sn-icon>
        </div>`}))}
    </div>`:U}render(){const{t:t}=this.ctx;return B`<div
      class="stage ${this.mode}"
      style="--len:${Xd[this.mode]??3e3}ms"
      role="status"
      @click=${()=>this.onDone()}
    >
      ${"sleep"===this.mode?this.renderSleep():U}
      <div class="content">
        <div class="title">${"cinema"===this.mode?"🍿 ":""}${t(Yd[this.mode]??"done")}</div>
        ${"away"===this.mode?B`${this.locks.length?B`<div class="sub">${t("scene_locking")}</div>`:U}${this.renderAway()}`:U}
      </div>
    </div>`}};Kd.styles=[fi,r`
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
    `],Ud([gt({attribute:!1})],Kd.prototype,"ctx",2),Ud([gt()],Kd.prototype,"mode",2),Ud([gt({attribute:!1})],Kd.prototype,"onDone",2),Kd=Ud([pt("sn-cinematic")],Kd);var Gd=Object.defineProperty,Jd=Object.getOwnPropertyDescriptor,Qd=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Jd(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&Gd(e,i,a),a};const tp="smartnest-morning",ep=()=>(new Date).toDateString();async function ip(t){const{hass:e,t:i,config:s}=t,n=s.settings,[a,o]=n.dark_from.split(":").map(Number),r=new Date;r.setDate(r.getDate()-1),r.setHours(a,o,0,0);const l=n.doorbell.trigger_entity,c=Rs(s).filter((t=>{const i=e.states[t];if(!i)return!1;const s=ee(t);return"vacuum"===s||"binary_sensor"===s&&["door","opening","garage_door"].includes(i.attributes.device_class)}));l&&c.push(l);let d=[];if(c.length)try{d=await e.callWS({type:"logbook/get_events",start_time:r.toISOString(),end_time:(new Date).toISOString(),entity_ids:c})}catch{d=[]}const p=[];if(l){const t=d.filter((t=>t.entity_id===l&&(l.startsWith("event.")||"on"===t.state))).length;t&&p.push(1===t?i("night_doorbell_1"):i("night_doorbell_n",{n:t}))}for(const h of c.filter((t=>t.startsWith("binary_sensor."))).slice(0,3)){const t=d.filter((t=>t.entity_id===h&&"on"===t.state)).length,n=ie(e,s,h);t&&p.push(1===t?i("night_door_1",{name:n}):i("night_door_n",{name:n,n:t}))}d.some((t=>t.entity_id.startsWith("vacuum.")&&"cleaning"===t.state))&&p.push(i("night_robot"));for(const h of Rs(s).filter((t=>"lock"===ee(t)&&"unlocked"===e.states[t]?.state)))p.push(i("night_unlocked",{name:ie(e,s,h)}));return p.length?p:[i("night_quiet")]}let sp=class extends ct{constructor(){super(...arguments),this.forecast={}}connectedCallback(){super.connectedCallback();const t=this.ctx.config.settings.weather.entity;t&&this.ctx.hass.states[t]&&Rn(this.ctx.hass,t).then((t=>this.forecast=t));const e=t&&this.ctx.hass.states[t]?Rn(this.ctx.hass,t):Promise.resolve({});Promise.all([ip(this.ctx),e]).then((([t,e])=>{this.lines=t,this.ctx.allows("ai_summary")&&ks(this.ctx.hass)&&Cs(this.ctx,"summary",{facts:this.facts(t,e)}).then((t=>this.ai=t))})),this.timer=window.setTimeout((()=>this.onDone()),6e4)}facts(t,e){const{hass:i,config:s}=this.ctx,n=[...t],a=s.settings.weather.entity?i.states[s.settings.weather.entity]:void 0;a&&n.push(`Weather now: ${a.state}, ${a.attributes.temperature}°. Today high ${e.high??"?"}°, low ${e.low??"?"}°, ${e.condition??""}`);const o=Rs(s),r=o.filter((t=>{const e=i.states[t];return e&&"binary_sensor"===ee(t)&&["door","window","opening","garage_door"].includes(e.attributes.device_class)&&"on"===e.state}));r.length&&n.push(`Open right now: ${r.map((t=>ie(i,s,t))).join(", ")}`);const l=o.filter((t=>"light"===ee(t)&&"on"===i.states[t]?.state));l.length&&n.push(`Lights still on: ${l.map((t=>ie(i,s,t))).join(", ")}`);const c=Nn(i).find((t=>t.at>new Date));return s.settings.prayer&&c&&n.push(`Next prayer: ${c.id} at ${c.at.toTimeString().slice(0,5)}`),n}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this.timer)}render(){const{ctx:t}=this,{t:e}=t,i=Ot[t.lang],s=new Date,n=Pn(t.hass,t.config.settings.greeting_name),a=t.config.settings.weather.entity,o=a?t.hass.states[a]:void 0,r=e=>"number"==typeof e?ue(`${ge(e,t.lang,0)}°`):"–",l=t.config.settings.prayer?Nn(t.hass):[];return B`<div class="scrim" @click=${t=>t.target===t.currentTarget&&this.onDone()}>
      <div class="card" role="dialog" aria-label=${e("morning_summary")}>
        <div class="hello">
          <h1>${e(jn(s))}${n?("ar"===t.lang?"، ":", ")+n:""} ☀️</h1>
          <span class="date">${s.toLocaleDateString(i,{weekday:"long",day:"numeric",month:"long"})}</span>
          ${this.ai?B`<p class="ai">✨ ${this.ai}</p>`:U}
        </div>
        <div class="cols">
          ${o?B`<div class="box" style="animation-delay:120ms">
                <h2>${e("today_weather")}</h2>
                <div class="wx">
                  <sn-icon .icon=${In(this.forecast.condition??o.state)}></sn-icon>
                  <div>
                    <div class="t">${r(o.attributes.temperature)}</div>
                    ${void 0!==this.forecast.high?B`<div class="hl">${r(this.forecast.high)} / ${r(this.forecast.low)}</div>`:U}
                  </div>
                </div>
              </div>`:U}
          ${l.length?B`<div class="box" style="animation-delay:220ms">
                <h2>${e("prayer")}</h2>
                ${l.map((t=>B`<div class="row ${t.at<s?"past":""}">
                    <span>${e(`p_${t.id}`)}</span><span class="when">${t.at.toLocaleTimeString(i,{hour:"2-digit",minute:"2-digit"})}</span>
                  </div>`))}
              </div>`:U}
          <div class="box" style="animation-delay:320ms">
            <h2>${e("overnight")}</h2>
            ${this.lines?B`<ul>${this.lines.map((t=>B`<li>${t}</li>`))}</ul>`:B`<sn-skeleton></sn-skeleton>`}
          </div>
        </div>
        <button class="btn primary pressable go" @click=${()=>this.onDone()}>${e("lets_go")}</button>
      </div>
    </div>`}};sp.styles=[fi,r`
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
    `],Qd([gt({attribute:!1})],sp.prototype,"ctx",2),Qd([gt({attribute:!1})],sp.prototype,"onDone",2),Qd([mt()],sp.prototype,"forecast",2),Qd([mt()],sp.prototype,"lines",2),Qd([mt()],sp.prototype,"ai",2),sp=Qd([pt("sn-morning")],sp);var np=Object.defineProperty,ap=Object.getOwnPropertyDescriptor,op=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?ap(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&np(e,i,a),a};const rp={ar:"ar-JO",en:"en-US",he:"he-IL"},lp=["as_s1","as_s2","as_s3","as_s4"];let cp=class extends ct{constructor(){super(...arguments),this.lines=[],this.busy=!1,this.listening=!1}async connectedCallback(){super.connectedCallback();try{const t=await this.ctx.hass.callWS({type:"assist_pipeline/pipeline/list"}),e=t.pipelines.find((e=>e.id===t.preferred_pipeline))??t.pipelines[0];e&&(this.agent={agent_id:e.conversation_engine,language:e.conversation_language})}catch{}}async send(t){if((t=t.trim())&&!this.busy){this.lines=[...this.lines,{me:!0,text:t}],this.busy=!0,this.toBottom();try{const e=await this.ctx.hass.callWS({type:"conversation/process",text:t,language:this.agent?.language&&"*"!==this.agent.language?this.agent.language:this.ctx.lang,conversation_id:this.conversationId,...this.agent?.agent_id?{agent_id:this.agent.agent_id}:{}});this.conversationId=e.conversation_id;const i=e.response?.speech?.plain?.speech||this.ctx.t("as_done");this.lines=[...this.lines,{me:!1,text:i}]}catch{this.lines=[...this.lines,{me:!1,text:this.ctx.t("as_error")}]}finally{this.busy=!1,this.toBottom()}}}toBottom(){this.updateComplete.then((()=>{const t=this.renderRoot.querySelector(".log");t?.scrollTo({top:t.scrollHeight,behavior:"smooth"})}))}listen(){const t=window.SpeechRecognition??window.webkitSpeechRecognition;if(!t)return;const e=new t;e.lang=rp[this.ctx.lang],e.interimResults=!1,e.onresult=t=>this.send(t.results[0][0].transcript),e.onend=()=>this.listening=!1,e.onerror=()=>this.listening=!1,this.listening=!0,e.start()}render(){const{t:t}=this.ctx,e=!!(window.SpeechRecognition??window.webkitSpeechRecognition);return B`<div class="log" aria-live="polite">
        ${this.lines.length?this.lines.map((t=>B`<div class="b ${t.me?"me":"it"}">${t.text}</div>`)):B`<div class="hello">
              <sn-icon icon="assistant" style="color:var(--accent-text)"></sn-icon>
              <span>${t("as_hello")}</span>
              <div class="chips">${lp.map((e=>B`<button class="btn pressable" @click=${()=>this.send(t(e))}>${t(e)}</button>`))}</div>
            </div>`}
        ${this.busy?B`<div class="b it dots" aria-label=${t("loading")}><span></span><span></span><span></span></div>`:U}
      </div>
      <form
        @submit=${t=>{t.preventDefault();const e=t.currentTarget.querySelector("input");this.send(e.value),e.value=""}}
      >
        ${e?B`<button type="button" class="icon-btn pressable mic ${this.listening?"on":""}" aria-label=${t("as_speak")} @click=${()=>this.listen()}>
              <sn-icon icon="microphone" style="--icon-size:22px"></sn-icon>
            </button>`:U}
        <input type="text" placeholder=${t("as_placeholder")} aria-label=${t("as_placeholder")} />
        <button type="submit" class="icon-btn primary pressable" aria-label=${t("as_send")} ?disabled=${this.busy}>
          <sn-icon icon="send" style="--icon-size:20px;transform:${this.ctx.rtl?"scaleX(-1)":"none"}"></sn-icon>
        </button>
      </form>`}};cp.styles=[fi,r`
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
    `],op([gt({attribute:!1})],cp.prototype,"ctx",2),op([mt()],cp.prototype,"lines",2),op([mt()],cp.prototype,"busy",2),op([mt()],cp.prototype,"listening",2),cp=op([pt("sn-assistant")],cp);var dp=Object.defineProperty,pp=Object.getOwnPropertyDescriptor,hp=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?pp(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&dp(e,i,a),a};const up="smartnest-voice";let gp=class extends ct{constructor(){super(...arguments),this.phase="idle",this.heard="",this.said="",this.problem="",this.stopped=!1}async connectedCallback(){if(super.connectedCallback(),this.stopped=!1,!window.isSecureContext||!navigator.mediaDevices?.getUserMedia)return this.phase="error",void(this.problem=this.ctx.t("voice_https"));try{this.stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0}}),this.audio=new AudioContext({sampleRate:16e3}),await this.audio.audioWorklet.addModule(URL.createObjectURL(new Blob(['\nclass Pcm extends AudioWorkletProcessor {\n  process(inputs) {\n    const ch = inputs[0][0];\n    if (ch) {\n      const out = new Int16Array(ch.length);\n      for (let i = 0; i < ch.length; i++) out[i] = Math.max(-1, Math.min(1, ch[i])) * 0x7fff;\n      this.port.postMessage(out.buffer, [out.buffer]);\n    }\n    return true;\n  }\n}\nregisterProcessor("sn-pcm", Pcm);'],{type:"text/javascript"})));const t=new AudioWorkletNode(this.audio,"sn-pcm");t.port.onmessage=t=>this.send(t.data),this.audio.createMediaStreamSource(this.stream).connect(t),this.run()}catch{this.phase="error",this.problem=this.ctx.t("voice_mic")}}disconnectedCallback(){super.disconnectedCallback(),this.stopped=!0,this.unsub?.(),this.stream?.getTracks().forEach((t=>t.stop())),this.audio?.close().catch((()=>{})),window.clearTimeout(this.idleTimer)}send(t){const e=this.ctx.hass.connection.socket;if(void 0===this.handler||!e||1!==e.readyState)return;const i=new Uint8Array(t.byteLength+1);i[0]=this.handler,i.set(new Uint8Array(t),1),e.send(i)}async run(){if(!this.stopped){this.handler=void 0;try{this.unsub=await this.ctx.hass.connection.subscribeMessage((t=>this.onEvent(t)),{type:"assist_pipeline/run",start_stage:"wake_word",end_stage:"tts",input:{sample_rate:16e3,timeout:3600},...this.conversation?{conversation_id:this.conversation}:{}})}catch{this.phase="error",this.problem=this.ctx.t("voice_pipeline"),window.setTimeout((()=>this.run()),3e4)}}}restart(t=300){this.unsub?.(),this.unsub=void 0,this.handler=void 0,window.setTimeout((()=>this.run()),t)}onEvent(t){switch(t.type){case"run-start":this.handler=t.data?.runner_data?.stt_binary_handler_id,"error"===this.phase&&(this.phase="idle");break;case"wake_word-end":this.phase="listening",this.heard="",this.said="",window.clearTimeout(this.idleTimer),navigator.vibrate?.(30);break;case"stt-end":this.heard=t.data?.stt_output?.text??"",this.phase="thinking";break;case"intent-end":{const e=t.data?.intent_output;this.conversation=e?.conversation_id,this.said=e?.response?.speech?.plain?.speech??"";break}case"tts-end":{const e=t.data?.tts_output?.url;if(this.phase="speaking",e){const t=new Audio(this.ctx.hass.hassUrl(e));t.onended=()=>this.settle(),t.play().catch((()=>this.settle()))}else this.settle();break}case"run-end":this.restart();break;case"error":"idle"!==this.phase&&this.settle(1500),this.restart("wake-word-timeout"===t.data?.code?100:2e3)}}settle(t=2500){window.clearTimeout(this.idleTimer),this.idleTimer=window.setTimeout((()=>this.phase="idle"),t)}render(){return"idle"===this.phase||"error"===this.phase?B`<div class="dot ${"error"===this.phase?"err":""}" title=${this.problem||this.ctx.t("voice_ready")}>
        <sn-icon icon=${"error"===this.phase?"microphone-off":"microphone"} style="--icon-size:22px"></sn-icon>
      </div>`:B`<div class="overlay" @click=${()=>this.phase="idle"}>
      <div class="panel">
        <div class="orb ${this.phase}"></div>
        ${this.heard?B`<div class="heard">“${this.heard}”</div>`:B`<div class="heard">${this.ctx.t("voice_listening")}</div>`}
        ${this.said?B`<div class="said">${this.said}</div>`:U}
      </div>
    </div>`}};gp.styles=[fi,r`
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
    `],hp([gt({attribute:!1})],gp.prototype,"ctx",2),hp([mt()],gp.prototype,"phase",2),hp([mt()],gp.prototype,"heard",2),hp([mt()],gp.prototype,"said",2),hp([mt()],gp.prototype,"problem",2),gp=hp([pt("sn-voice")],gp);var mp=Object.defineProperty,fp=Object.getOwnPropertyDescriptor,bp=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?fp(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&mp(e,i,a),a};const _p="smartnest-tour";let yp=class extends ct{constructor(){super(...arguments),this.steps=[],this.i=0,this.measure=()=>{for(;this.i<this.steps.length&&!this.steps[this.i].target();)this.i++;if(this.i>=this.steps.length)return this.finish();this.box=this.steps[this.i].target().getBoundingClientRect()}}connectedCallback(){super.connectedCallback(),this.measure(),window.addEventListener("resize",this.measure)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("resize",this.measure)}next(){this.i++,this.measure()}finish(){(()=>{try{localStorage.setItem(_p,"1")}catch{}})(),this.onDone()}render(){const t=this.steps[this.i],e=this.box;if(!t||!e)return U;const i=e.bottom+180<innerHeight?e.bottom+14:Math.max(16,e.top-200),s=Math.min(Math.max(16,e.left+e.width/2-180),innerWidth-Math.min(360,innerWidth-32)-16),{t:n}=this.ctx,a=this.i>=this.steps.length-1;return B`<div class="hole" style="top:${e.top-8}px;left:${e.left-8}px;width:${e.width+16}px;height:${e.height+16}px"></div>
      <div class="tip" role="dialog" style="top:${i}px;left:${s}px">
        <p>${n(t.text)}</p>
        <div class="row">
          <span>${this.i+1} / ${this.steps.length}</span>
          <button class="btn pressable" @click=${()=>this.finish()}>${n("tour_skip")}</button>
          <button class="btn primary pressable" @click=${()=>a?this.finish():this.next()}>${n(a?"tour_done":"tour_next")}</button>
        </div>
      </div>`}};yp.styles=[fi,r`
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
    `],bp([gt({attribute:!1})],yp.prototype,"ctx",2),bp([gt({attribute:!1})],yp.prototype,"steps",2),bp([gt({attribute:!1})],yp.prototype,"onDone",2),bp([mt()],yp.prototype,"i",2),bp([mt()],yp.prototype,"box",2),yp=bp([pt("sn-tour")],yp);const vp=`url("data:image/svg+xml,${encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .5 0 0 0 0 .5 0 0 0 0 .5 0 0 0 .55 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>")}")`,xp=t=>`url("data:image/svg+xml,${encodeURIComponent(t)}")`;function wp(t,e){switch(t){case"marble":return xp(`<svg xmlns='http://www.w3.org/2000/svg' width='900' height='900'><filter id='m'><feTurbulence type='turbulence' baseFrequency='.004 .012' numOctaves='5' seed='7'/><feColorMatrix values='${e?"0 0 0 0 .55 0 0 0 0 .55 0 0 0 0 .58 0 0 0 -1.6 1.15":"0 0 0 0 .62 0 0 0 0 .6 0 0 0 0 .56 0 0 0 -1.8 1.1"}'/></filter><rect width='100%' height='100%' filter='url(#m)'/></svg>`);case"wood":return xp(`<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='400'><filter id='w'><feTurbulence type='fractalNoise' baseFrequency='.002 .06' numOctaves='4' seed='3'/><feColorMatrix values='${e?"0 0 0 0 .32 0 0 0 0 .2 0 0 0 0 .11 0 0 0 .9 0":"0 0 0 0 .55 0 0 0 0 .36 0 0 0 0 .2 0 0 0 .38 0"}'/></filter><rect width='100%' height='100%' filter='url(#w)'/></svg>`);case"sand":return xp(`<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'><filter id='s'><feTurbulence type='fractalNoise' baseFrequency='.012 .03' numOctaves='3' seed='11'/><feColorMatrix values='${e?"0 0 0 0 .45 0 0 0 0 .33 0 0 0 0 .2 0 0 0 .5 0":"0 0 0 0 .85 0 0 0 0 .68 0 0 0 0 .45 0 0 0 .35 0"}'/></filter><rect width='100%' height='100%' filter='url(#s)'/></svg>`);case"olive":return xp(`<svg xmlns='http://www.w3.org/2000/svg' width='800' height='800'><filter id='o'><feTurbulence type='fractalNoise' baseFrequency='.006' numOctaves='4' seed='5'/><feColorMatrix values='${e?"0 0 0 0 .2 0 0 0 0 .27 0 0 0 0 .14 0 0 0 .8 0":"0 0 0 0 .42 0 0 0 0 .5 0 0 0 0 .3 0 0 0 .3 0"}'/></filter><rect width='100%' height='100%' filter='url(#o)'/></svg>`);default:return"none"}}const $p={evening:"rgb(255, 170, 80)",sleep:"rgb(70, 90, 190)",away:"rgb(120, 140, 160)",home:"rgb(255, 214, 160)"};var kp=Object.defineProperty,Cp=Object.getOwnPropertyDescriptor,Mp=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Cp(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&kp(e,i,a),a};let Hp=class extends ct{constructor(){super(...arguments),this.open=!1,this.timers={},this.turn=0}connectedCallback(){super.connectedCallback();const t=()=>this.ctx.hass.callWS({type:"smartnest/timer/list"}).then((t=>this.timers=t)).catch((()=>{}));t(),this.poll=window.setInterval(t,3e4),this.spin=window.setInterval((()=>this.turn+=1),5e3)}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this.poll),window.clearInterval(this.spin)}activities(){const{hass:t,config:e,t:i}=this.ctx,s=[],n=i=>ie(t,e,i);for(const l of e.settings.appliances??[]){Number(t.states[l.power]?.state)>=(l.start_w??15)&&s.push({id:l.power,icon:"washing-machine",color:"#5ec8f2",title:l.name,detail:i("act_running")})}for(const l of Rs(e)){const e=t.states[l];e&&("vacuum"===ee(l)&&"cleaning"===e.state&&s.push({id:l,icon:"robot-vacuum",color:"#2bb673",title:n(l),detail:i("act_cleaning"),stop:()=>t.callService("vacuum","return_to_base",{entity_id:l}).catch((()=>{}))}),"media_player"===ee(l)&&"playing"===e.state&&s.push({id:l,icon:"speaker",color:"#e85d9e",title:e.attributes.media_title??n(l),detail:e.attributes.media_artist??n(l),stop:()=>t.callService("media_player","media_pause",{entity_id:l}).catch((()=>{}))}))}const a=sc(Object.keys(t.states),t);var o;a&&"on"===t.states[a]?.state&&s.push({id:a,icon:"water-boiler",color:"#ff8a3d",title:n(a),detail:i("act_heating"),stop:(o=a,()=>t.callService("homeassistant","turn_off",{entity_id:o}).catch((()=>{})))});const r=Date.now();for(const[l,c]of Object.entries(this.timers)){const e=Date.parse(c)-r;e<=0||!t.states[l]||s.push({id:`timer-${l}`,icon:"timer",color:"#e9971d",title:n(l),detail:i("act_off_in",{n:Math.max(1,Math.round(e/6e4))})})}return"on"===t.states["switch.smartnest_travel_mode"]?.state&&s.push({id:"travel",icon:"airplane",color:"#8e6cef",title:i("travel"),detail:i("travel_on")}),s}dot(t,e=30){const i=2*Math.PI*16;return B`<span class="dot" style="--c:${t.color};width:${e}px;height:${e}px">
      <sn-icon icon=${t.icon} style="--icon-size:${Math.round(.55*e)}px"></sn-icon>
      ${void 0!==t.progress?B`<svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="16" fill="none" stroke=${t.color} stroke-width="2.5" stroke-linecap="round" stroke-dasharray="${i*t.progress} ${i}"></circle></svg>`:U}
    </span>`}render(){const t=this.activities();if(!t.length)return U;const e=t[this.turn%t.length];return B`<div class="pill" role="button" tabindex="0" aria-expanded=${this.open} @click=${()=>this.open=!this.open}>
        ${this.dot(e)}
        ${Qr(e.id,B`<span class="txt swap"><b>${e.title}</b><span>${e.detail}</span></span>`)}
        ${t.length>1?B`<span class="more">+${t.length-1}</span>`:U}
      </div>
      ${this.open?B`<div class="panel" style="--dir:${this.ctx.rtl?-1:1}">
            ${t.map((t=>B`<div class="row">
                ${this.dot(t,38)}
                <span class="txt"><b>${t.title}</b><span>${t.detail}</span></span>
                ${t.stop?B`<button class="stop pressable" aria-label=${this.ctx.t("turn_off")} @click=${()=>t.stop()}>
                      <sn-icon icon="pause" style="--icon-size:18px"></sn-icon>
                    </button>`:U}
              </div>`))}
          </div>`:U}`}};Hp.styles=[fi,r`
      :host {
        display: block;
        position: relative;
      }
      .pill {
        display: flex;
        align-items: center;
        gap: 10px;
        min-height: 40px;
        max-width: min(440px, 60vw);
        padding: 4px 14px 4px 6px;
        border-radius: 999px;
        background: #0b0b0d;
        color: #fff;
        box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.6);
        cursor: pointer;
        transition: max-width 500ms cubic-bezier(0.32, 0.72, 0, 1), padding 500ms cubic-bezier(0.32, 0.72, 0, 1);
        animation: grow 520ms cubic-bezier(0.32, 0.72, 0, 1);
      }
      .dot {
        position: relative;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        flex: none;
        background: color-mix(in srgb, var(--c) 30%, transparent);
        color: var(--c);
      }
      .dot svg {
        position: absolute;
        inset: -3px;
        width: 36px;
        height: 36px;
        transform: rotate(-90deg);
      }
      .txt {
        min-width: 0;
        display: grid;
        line-height: 1.15;
      }
      .txt b {
        font-size: 13px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .txt span {
        font-size: 11px;
        opacity: 0.65;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .more {
        font-size: 11px;
        font-weight: 700;
        padding: 2px 7px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.14);
      }
      .swap {
        animation: swap 420ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .panel {
        position: absolute;
        top: calc(100% + 8px);
        inset-inline-start: 0;
        width: min(420px, 92vw);
        padding: 10px;
        border-radius: 26px;
        background: #0b0b0d;
        color: #fff;
        display: grid;
        gap: 6px;
        z-index: 40;
        box-shadow: 0 30px 70px -20px rgba(0, 0, 0, 0.7);
        animation: drop 460ms cubic-bezier(0.32, 0.72, 0, 1);
        transform-origin: top center;
      }
      .row {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px;
        border-radius: 18px;
        background: rgba(255, 255, 255, 0.06);
      }
      .row .txt b {
        font-size: 15px;
      }
      .row .txt span {
        font-size: 13px;
      }
      .row .txt {
        flex: 1;
      }
      .stop {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: rgba(255, 255, 255, 0.12);
        color: #fff;
      }
      @keyframes grow {
        from {
          max-width: 40px;
          opacity: 0;
        }
      }
      @keyframes swap {
        from {
          opacity: 0;
          transform: translateY(6px);
        }
      }
      @keyframes drop {
        from {
          opacity: 0;
          transform: scale(0.6, 0.3);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .pill,
        .panel,
        .swap {
          animation: none;
        }
      }
    `],Mp([gt({attribute:!1})],Hp.prototype,"ctx",2),Mp([mt()],Hp.prototype,"open",2),Mp([mt()],Hp.prototype,"timers",2),Mp([mt()],Hp.prototype,"turn",2),Hp=Mp([pt("sn-island")],Hp);var Ap=Object.defineProperty,Lp=Object.getOwnPropertyDescriptor,Vp=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Lp(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&Ap(e,i,a),a};const Sp=t=>t.toLowerCase().replace(/[ً-ْـ]/g,"").replace(/[أإآ]/g,"ا").replace(/ة/g,"ه").replace(/ى/g,"ي").trim(),zp=["light","switch","fan","cover","climate","lock","media_player","vacuum","scene","script","camera","sensor","binary_sensor","water_heater","valve"];let Dp=class extends ct{constructor(){super(),this.q="",this.sel=0,this.addEventListener("click",(()=>this.onClose()))}firstUpdated(){this.renderRoot.querySelector("input")?.focus()}hits(){const{hass:t,config:e,t:i}=this.ctx,s=Sp(this.q),n=(t,e="")=>{if(!s)return 1;const i=Sp(t);return i.startsWith(s)?100-i.length/10:i.split(/\s+/).some((t=>t.startsWith(s)))?80:i.includes(s)?60:Sp(e).includes(s)?30:0},a=[];for(const o of e.pages)a.push({kind:"page",id:o.id,label:o.title,sub:i("search_page"),icon:o.icon,score:n(o.title)+5});for(const o of Vs)t.states[zs(o.id)]&&a.push({kind:"mode",id:o.id,label:i(o.label),sub:i("widget_modes"),icon:o.icon,score:n(i(o.label))+4});for(const o of Object.values(t.states)){const s=o.entity_id;if(!zp.includes(ee(s))||t.entities?.[s]?.entity_category||t.entities?.[s]?.hidden)continue;const r=ie(t,e,s),l=n(r,s);l>0&&a.push({kind:"entity",id:s,label:r,sub:be(i,o,this.ctx.lang),icon:oe(o,s),score:l})}return a.filter((t=>t.score>0)).sort(((t,e)=>e.score-t.score)).slice(0,s?30:12)}act(t,e=!1){const{hass:i}=this.ctx;return"page"===t.kind?(this.onPage(t.id),this.onClose()):"mode"===t.kind?(i.callService("script","turn_on",{entity_id:zs(t.id)}).catch((()=>{})),this.ctx.cinematic(t.id),this.onClose()):void(e&&"toggle"===re(t.id)?i.callService("homeassistant","toggle",{entity_id:t.id}).catch((()=>{})):(this.onClose(),this.ctx.openEntity(t.id)))}render(){const{t:t,hass:e}=this.ctx,i=this.hits(),s=Math.min(this.sel,i.length-1);return B`<div class="box" role="dialog" aria-label=${t("search")} @click=${t=>t.stopPropagation()}>
      <label class="field">
        <sn-icon icon="magnify"></sn-icon>
        <input
          type="search"
          .value=${this.q}
          placeholder=${t("search_placeholder")}
          aria-label=${t("search")}
          @input=${t=>(this.q=t.target.value,this.sel=0)}
          @keydown=${t=>{"ArrowDown"===t.key?(this.sel=Math.min(i.length-1,s+1),t.preventDefault()):"ArrowUp"===t.key?(this.sel=Math.max(0,s-1),t.preventDefault()):"Enter"===t.key&&i[s]?this.act(i[s],t.shiftKey):"Escape"===t.key&&this.onClose()}}
        />
        <kbd>esc</kbd>
      </label>
      <div class="list" role="listbox">
        ${i.length?i.map(((i,n)=>{const a="entity"===i.kind?e.states[i.id]:void 0,o=!!a&&ne(a);return B`<div class="hit ${n===s?"sel":""}" role="option" aria-selected=${n===s} @pointerenter=${()=>this.sel=n} @click=${()=>this.act(i)}>
                <span class="ic ${o?"on":""}"><sn-icon .icon=${i.icon}></sn-icon></span>
                <span class="txt"><b>${i.label}</b><span>${i.sub}</span></span>
                ${a&&"toggle"===re(i.id)?B`<button
                      class="btn pressable"
                      style="min-height:34px;font-size:13px"
                      @click=${t=>{t.stopPropagation(),this.act(i,!0)}}
                    >
                      ${t(o?"turn_off":"turn_on")}
                    </button>`:B`<span class="kind">${t("page"===i.kind?"search_page":"mode"===i.kind?"widget_modes":"search_open")}</span>`}
              </div>`})):B`<div class="empty">${t("search_none")}</div>`}
      </div>
    </div>`}};Dp.styles=[fi,r`
      :host {
        position: fixed;
        inset: 0;
        z-index: 65;
        display: grid;
        justify-items: center;
        align-items: start;
        padding: 12vh 16px 16px;
        background: var(--scrim);
        -webkit-backdrop-filter: blur(8px);
        backdrop-filter: blur(8px);
        animation: fade 200ms ease;
      }
      .box {
        width: min(620px, 100%);
        border-radius: 22px;
        background: var(--surface-solid);
        box-shadow: 0 30px 80px -20px rgba(0, 0, 0, 0.5);
        overflow: hidden;
        animation: pop 320ms cubic-bezier(0.32, 0.72, 0, 1);
      }
      .field {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 18px;
        border-bottom: 1px solid var(--border);
        --icon-size: 24px;
        color: var(--text-2);
      }
      input {
        flex: 1;
        border: 0;
        outline: none;
        background: none;
        font: 500 20px var(--font);
        color: var(--text);
        min-width: 0;
      }
      .list {
        max-height: 56vh;
        overflow: auto;
        padding: 6px;
      }
      .hit {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 12px;
        border-radius: 14px;
        cursor: pointer;
      }
      .hit.sel {
        background: color-mix(in srgb, var(--accent) 14%, transparent);
      }
      .hit .ic {
        width: 38px;
        height: 38px;
        border-radius: 12px;
        display: grid;
        place-items: center;
        background: var(--surface-2);
        --icon-size: 20px;
        flex: none;
      }
      .hit .ic.on {
        background: var(--accent);
        color: var(--on-accent);
      }
      .hit .txt {
        flex: 1;
        min-width: 0;
        display: grid;
      }
      .hit .txt b {
        font-weight: 600;
      }
      .hit .txt span {
        font-size: 13px;
        color: var(--text-2);
        unicode-bidi: plaintext;
      }
      .kind {
        font-size: 11px;
        color: var(--text-2);
        padding: 2px 8px;
        border-radius: 999px;
        background: var(--surface-2);
      }
      .empty {
        padding: 22px;
        text-align: center;
        color: var(--text-2);
      }
      kbd {
        font: 600 11px var(--font);
        padding: 2px 6px;
        border-radius: 6px;
        background: var(--surface-2);
      }
      @keyframes fade {
        from {
          opacity: 0;
        }
      }
      @keyframes pop {
        from {
          opacity: 0;
          transform: translateY(-12px) scale(0.97);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        :host,
        .box {
          animation: none;
        }
      }
    `],Vp([gt({attribute:!1})],Dp.prototype,"ctx",2),Vp([gt({attribute:!1})],Dp.prototype,"onClose",2),Vp([gt({attribute:!1})],Dp.prototype,"onPage",2),Vp([mt()],Dp.prototype,"q",2),Vp([mt()],Dp.prototype,"sel",2),Dp=Vp([pt("sn-search")],Dp);var Op=Object.defineProperty,Tp=Object.getOwnPropertyDescriptor,jp=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Tp(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&Op(e,i,a),a};let Pp=class extends ct{constructor(){super(...arguments),this.lines=3}render(){return B`${Array.from({length:this.lines},(()=>B`<i></i>`))}`}};Pp.styles=r`
    :host {
      display: grid;
      gap: 10px;
      padding: 4px 0;
    }
    i {
      display: block;
      height: 14px;
      border-radius: 7px;
      background: var(--surface-2);
      position: relative;
      overflow: hidden;
    }
    /* The shine moves by transform (GPU) rather than background-position (a repaint every frame). */
    i::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--surface-solid) 60%, transparent), transparent);
      transform: translateX(-100%);
      animation: shine 1.4s linear infinite;
    }
    i:first-child {
      height: 22px;
      width: 55%;
    }
    i:last-child {
      width: 70%;
    }
    @keyframes shine {
      to {
        transform: translateX(100%);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      i::after {
        animation: none;
      }
    }
  `,jp([gt({type:Number})],Pp.prototype,"lines",2),Pp=jp([pt("sn-skeleton")],Pp);var Ip=Object.defineProperty,Ep=Object.getOwnPropertyDescriptor,Np=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Ep(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&Ip(e,i,a),a};let Wp=class extends ct{connectedCallback(){super.connectedCallback(),this.timer=window.setTimeout((()=>this.onDone()),6e3),this.addEventListener("click",(()=>this.onDone()))}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this.timer)}render(){const{t:t,hass:e}=this.ctx,i=this.person.attributes.friendly_name??"",s=this.person.attributes.entity_picture;return B`<div class="card" role="status">
      <div class="pic" style=${s?`background-image:url('${e.hassUrl(s)}')`:""}>${s?"":i.slice(0,1)}</div>
      <h1>${t("welcome_home",{name:i})} 👋</h1>
      <p>${(new Date).toLocaleTimeString(Ot[this.ctx.lang],{hour:"2-digit",minute:"2-digit"})}</p>
    </div>`}};Wp.styles=[fi,r`
      :host {
        position: fixed;
        inset: 0;
        z-index: 55;
        display: grid;
        place-items: center;
        background: radial-gradient(circle at 50% 45%, color-mix(in srgb, var(--accent) 35%, transparent), var(--scrim) 70%);
        -webkit-backdrop-filter: blur(12px);
        backdrop-filter: blur(12px);
        animation: fade 500ms ease;
      }
      .card {
        display: grid;
        justify-items: center;
        gap: 14px;
        text-align: center;
        color: var(--text);
        animation: rise 800ms cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      .pic {
        width: 132px;
        height: 132px;
        border-radius: 50%;
        background: var(--surface-2) center / cover;
        display: grid;
        place-items: center;
        font: 800 48px var(--font);
        box-shadow: 0 0 0 6px var(--surface-solid), 0 0 60px 10px color-mix(in srgb, var(--accent) 60%, transparent);
      }
      h1 {
        margin: 0;
        font-size: clamp(32px, 6vw, 56px);
        font-weight: var(--display-weight, 800);
        letter-spacing: var(--display-track, 0);
      }
      p {
        margin: 0;
        color: var(--text-2);
        font-size: 18px;
      }
      @keyframes fade {
        from {
          opacity: 0;
        }
      }
      @keyframes rise {
        from {
          opacity: 0;
          transform: translateY(30px) scale(0.85);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        :host,
        .card {
          animation: none;
        }
      }
    `],Np([gt({attribute:!1})],Wp.prototype,"ctx",2),Np([gt({attribute:!1})],Wp.prototype,"person",2),Np([gt({attribute:!1})],Wp.prototype,"onDone",2),Wp=Np([pt("sn-welcome")],Wp);let Rp=class extends ct{constructor(){super(...arguments),this.lang="ar"}render(){const t=this.hass.states["sun.sun"];if(!t)return U;const e=Date.parse(t.attributes.next_rising),i=Date.parse(t.attributes.next_setting),s=Date.now(),n="above_horizon"===t.state,a=n?e-864e5:i-864e5,o=n?i:e,r=Math.min(1,Math.max(0,(s-a)/(o-a||1))),l=Math.PI*(1-r),c=32+28*Math.cos(l),d=24-20*Math.sin(l),p=t=>new Date(t).toLocaleTimeString(Ot[this.lang]??"ar",{hour:"2-digit",minute:"2-digit"});return B`<svg viewBox="0 0 64 26" aria-label=${n?"sun":"moon"}>
        ${Z`<path d="M4 24 A28 20 0 0 1 60 24" fill="none" stroke="var(--text-2)" stroke-opacity=".35" stroke-width="1.2" stroke-dasharray="2 2.5"></path>
        <line x1="0" x2="64" y1="24.5" y2="24.5" stroke="var(--text-2)" stroke-opacity=".3" stroke-width=".8"></line>
        ${n?Z`<circle cx=${c} cy=${d} r="7" fill="#ffc94d" opacity=".25"></circle><circle cx=${c} cy=${d} r="4" fill="#ffb21f"></circle>`:Z`<circle cx=${c} cy=${d} r="4" fill="#dfe6f2"></circle><circle cx=${c+1.8} cy=${d-1.4} r="3.4" fill="var(--bg)"></circle>`}`}
      </svg>
      <div class="times"><span>↑${p(n?e-864e5:e)}</span><span>↓${p(i)}</span></div>`}};Rp.styles=r`
    :host {
      display: inline-grid;
      justify-items: center;
      line-height: 1;
    }
    svg {
      width: 64px;
      height: 26px;
      overflow: visible;
    }
    .times {
      display: flex;
      gap: 10px;
      font-size: 9px;
      color: var(--text-2);
      direction: ltr;
      margin-top: 2px;
    }
  `,Np([gt({attribute:!1})],Rp.prototype,"hass",2),Np([gt()],Rp.prototype,"lang",2),Rp=Np([pt("sn-sunarc")],Rp);let Fp=class extends ct{constructor(){super(...arguments),this.season="winter"}render(){if("summer"===this.season)return B`<div class="heat"></div>`;const t="winter"===this.season?"❄":"autumn"===this.season?"🍂":"🌸",e="winter"===this.season?18:9;return B`${Array.from({length:e},((e,i)=>B`<i
        style="left:${37*i%100}%;font-size:${"winter"===this.season?8+i%4*3:14+i%3*4}px;color:#fff;animation-duration:${14+i%5*4}s;animation-delay:-${2.3*i%18}s;--dx:${(i%2?1:-1)*(20+i%4*15)}px;--r:${200*(i%2?1:-1)}deg"
        >${t}</i
      >`))}`}};Fp.styles=r`
    :host {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 2;
      overflow: hidden;
    }
    i {
      position: absolute;
      top: -20px;
      font-style: normal;
      animation: fall linear infinite;
      animation-play-state: var(--loops, running);
      opacity: 0.75;
    }
    .heat {
      position: absolute;
      inset: auto 0 0 0;
      height: 40vh;
      background: linear-gradient(0deg, rgba(255, 170, 60, 0.12), transparent);
      animation: shimmer 6s ease-in-out infinite alternate;
      animation-play-state: var(--loops, running);
    }
    @keyframes fall {
      to {
        transform: translate(var(--dx), 110vh) rotate(var(--r));
      }
    }
    @keyframes shimmer {
      to {
        opacity: 0.4;
        transform: scaleY(1.1);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      :host {
        display: none;
      }
    }
  `,Np([gt()],Fp.prototype,"season",2),Fp=Np([pt("sn-seasonfx")],Fp);var Bp=Object.defineProperty,Zp=Object.getOwnPropertyDescriptor,qp=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Zp(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&Bp(e,i,a),a};let Up=class extends ct{constructor(){super(...arguments),this.heavy=!1}render(){const t=this.heavy?38:24;return B`${Array.from({length:t},((t,e)=>{const i=t=>(43758.5453*Math.sin(12.9898*e+78.233*t)%1+1)%1,s=8+i(1)*(this.heavy?18:14),n=i(2)>.7;return B`<i
        class=${n?"run":""}
        style="left:${(100*i(3)).toFixed(2)}%;top:${(100*i(4)).toFixed(2)}%;width:${s.toFixed(1)}px;height:${(1.08*s).toFixed(1)}px;${n?`animation-duration:${(14+16*i(5)).toFixed(1)}s;animation-delay:-${(20*i(6)).toFixed(1)}s`:""}"
      ></i>`}))}`}};Up.styles=r`
    :host {
      position: fixed;
      inset: 0;
      z-index: 3;
      pointer-events: none;
      overflow: hidden;
    }
    i {
      position: absolute;
      border-radius: 50% 50% 48% 52% / 56% 56% 44% 44%;
      /* A drop bends the light: bright rim at the bottom, a highlight at the top, clear in between. */
      background: radial-gradient(circle at 34% 28%, rgba(255, 255, 255, 0.9) 0 9%, rgba(255, 255, 255, 0.25) 16%, transparent 26%),
        radial-gradient(circle at 50% 78%, rgba(255, 255, 255, 0.35) 0 18%, transparent 40%),
        radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.06) 0 58%, rgba(0, 0, 0, 0.28) 70%, transparent 74%);
      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.18);
      opacity: 0.85;
    }
    i.run {
      animation: run linear infinite;
      animation-play-state: var(--loops, running);
    }
    i.run::after {
      content: "";
      position: absolute;
      left: 30%;
      right: 30%;
      bottom: 90%;
      height: 160%;
      border-radius: 999px;
      background: linear-gradient(transparent, rgba(255, 255, 255, 0.12));
    }
    @keyframes run {
      0%,
      55% {
        transform: translateY(0);
      }
      100% {
        transform: translateY(110vh);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      i.run {
        animation: none;
      }
    }
  `,qp([gt({type:Boolean})],Up.prototype,"heavy",2),Up=qp([pt("sn-rainglass")],Up);var Yp=Object.defineProperty,Xp=Object.getOwnPropertyDescriptor,Kp=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Xp(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&Yp(e,i,a),a};let Gp=class extends ct{constructor(){super(...arguments),this.kind="ramadan",this.greeting=""}lantern(t,e,i){return B`<svg class="lantern" style="left:${t};width:${i}px;height:${e+1.6*i}px" viewBox="0 0 40 ${e+64}" aria-hidden="true">
      ${Z`<line x1="20" y1="0" x2="20" y2=${e} stroke="#c99a45" stroke-width="1.2"></line>
      <path d="M14 ${e} h12 l3 6 h-18z" fill="#c99a45"></path>
      <path d="M11 ${e+6} h18 q6 18 0 36 h-18 q-6 -18 0 -36z" fill="#f4c04f" opacity=".95"></path>
      <path d="M15 ${e+10} v28 M20 ${e+8} v32 M25 ${e+10} v28" stroke="#b07a25" stroke-width="1.4"></path>
      <path d="M13 ${e+42} h14 l-3 6 h-8z" fill="#c99a45"></path>
      <circle cx="20" cy=${e+24} r="5" fill="#fff3c4" opacity=".9"></circle>`}
    </svg>`}render(){switch(this.kind){case"ramadan":return B`${this.lantern("6%",30,30)} ${this.lantern("14%",60,24)} ${this.lantern("90%",44,28)}
          <svg style="position:absolute;top:10px;right:20%;width:30px;height:30px" viewBox="0 0 24 24" aria-hidden="true">
            ${Z`<path d="M15 3a9 9 0 1 0 6 15.5A7.5 7.5 0 1 1 15 3z" fill="#f4c04f"></path>`}
          </svg>
          ${this.greeting?B`<span class="greet">${this.greeting}</span>`:U}`;case"eid_fitr":case"eid_adha":return B`${this.lantern("8%",36,26)} ${this.lantern("88%",36,26)}
          ${[22,34,66,78].map(((t,e)=>B`<span class="spark" style="left:${t}%;animation-delay:-${.4*e}s">✨</span>`))}
          ${this.greeting?B`<span class="greet">${this.greeting}</span>`:U}`;case"christmas":{const t=["#ff5a5a","#ffd34d","#4dd27a","#58a8ff"];return B`<svg class="lights" viewBox="0 0 1000 34" preserveAspectRatio="none" aria-hidden="true">
            ${Z`<path d="M0 6 Q 62 26 125 6 T 250 6 T 375 6 T 500 6 T 625 6 T 750 6 T 875 6 T 1000 6" fill="none" stroke="#2b3a2f" stroke-width="1.5"></path>`}
            ${Array.from({length:24},((e,i)=>{const s=20+41*i,n=6+10*Math.abs(Math.sin(s%125/125*Math.PI))+6;return Z`<ellipse class="bulb" cx=${s} cy=${n} rx="4" ry="6" fill=${t[i%4]} style="animation-delay:-${.37*i%2.4}s"></ellipse>`}))}
          </svg>
          ${this.greeting?B`<span class="greet" style="top:28px">${this.greeting}</span>`:U}`}case"new_year":return B`${[8,20,35,50,65,80,92].map(((t,e)=>B`<span class="spark" style="left:${t}%;animation-delay:-${.3*e}s">${e%2?"🎆":"✨"}</span>`))}
          ${this.greeting?B`<span class="greet" style="top:30px">${this.greeting}</span>`:U}`}}};Gp.styles=r`
    /* Hangs from the bottom edge of the header. */
    :host {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      height: 0;
      z-index: 4;
      pointer-events: none;
    }
    .lantern {
      position: absolute;
      top: 0;
      transform-origin: top center;
      animation: sway 5s ease-in-out infinite alternate;
      animation-play-state: var(--loops, running);
      filter: drop-shadow(0 6px 14px rgba(255, 180, 70, 0.55));
    }
    .lantern:nth-of-type(2) {
      animation-delay: -1.7s;
      animation-duration: 6s;
    }
    .lantern:nth-of-type(3) {
      animation-delay: -3.1s;
      animation-duration: 5.5s;
    }
    .greet {
      position: absolute;
      top: 6px;
      left: 50%;
      transform: translateX(-50%);
      padding: 4px 14px;
      border-radius: 999px;
      font: 700 13px var(--font);
      color: #fff6df;
      background: linear-gradient(90deg, #b8792a, #e9b04f, #b8792a);
      box-shadow: 0 4px 14px rgba(185, 120, 40, 0.45);
      white-space: nowrap;
    }
    .lights {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 34px;
    }
    .bulb {
      animation: twinkle 2.4s ease-in-out infinite alternate;
      animation-play-state: var(--loops, running);
    }
    .spark {
      position: absolute;
      top: 8px;
      font-size: 16px;
      animation: twinkle 1.8s ease-in-out infinite alternate;
      animation-play-state: var(--loops, running);
    }
    @keyframes sway {
      from {
        transform: rotate(-4deg);
      }
      to {
        transform: rotate(4deg);
      }
    }
    @keyframes twinkle {
      from {
        opacity: 0.35;
      }
      to {
        opacity: 1;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .lantern,
      .bulb,
      .spark {
        animation: none;
      }
    }
  `,Kp([gt()],Gp.prototype,"kind",2),Kp([gt()],Gp.prototype,"greeting",2),Gp=Kp([pt("sn-occasion")],Gp);var Jp=Object.defineProperty,Qp=Object.getOwnPropertyDescriptor,th=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Qp(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&Jp(e,i,a),a};const eh=["door","window","garage_door","opening","moisture","smoke","gas","carbon_monoxide","safety","tamper"];let ih=class extends ct{constructor(){super(...arguments),this.notes=[]}async connectedCallback(){super.connectedCallback();const{hass:t}=this.ctx,e=function(t){return Object.values(t.states).filter((e=>{const i=ee(e.entity_id);return!t.entities?.[e.entity_id]?.entity_category&&!t.entities?.[e.entity_id]?.hidden&&("lock"===i||"alarm_control_panel"===i||"event"===i||"binary_sensor"===i&&eh.includes(e.attributes.device_class))})).map((t=>t.entity_id))}(t);if(e.length)try{const i=new Date(Date.now()-864e5).toISOString(),s=await t.callWS({type:"logbook/get_events",start_time:i,entity_ids:e});this.rows=s.filter((t=>t.entity_id&&void 0!==t.state&&"unavailable"!==t.state&&"unknown"!==t.state)).map((t=>({id:t.entity_id,state:t.state,when:1e3*t.when}))).sort(((t,e)=>e.when-t.when)).slice(0,60)}catch{this.rows=[]}else this.rows=[]}render(){const{ctx:t}=this,{t:e,hass:i,config:s,lang:n}=t;return B`${this.notes.length?B`<h3>${e("notif_ha")}</h3>
            ${this.notes.map((s=>B`<div class="note">
                <b>${s.title||"Home Assistant"}</b>
                ${t.isAdmin?B`<button
                      class="icon-btn small pressable"
                      aria-label=${e("close")}
                      @click=${()=>i.callService("persistent_notification","dismiss",{notification_id:s.notification_id}).catch((()=>t.toast(e("error"))))}
                    >
                      <sn-icon icon="close" style="--icon-size:16px"></sn-icon>
                    </button>`:B`<span></span>`}
                <p>${s.message.replace(/\[([^\]]+)\]\([^)]+\)/g,"$1")}</p>
              </div>`))}`:U}
      <h3>${e("notif_day")}</h3>
      ${this.rows?this.rows.length?B`<div>
            ${this.rows.map((a=>{const o=i.states[a.id],r=o?{...o,state:a.state}:void 0,l=["unlocked","open","triggered"].includes(a.state)||"on"===a.state&&["moisture","smoke","gas","carbon_monoxide","safety","tamper"].includes(o?.attributes.device_class);return B`<div class="ev ${l?"alert":""}" @click=${()=>t.openEntity(a.id)}>
                <span class="ic"><sn-icon .icon=${oe(r,a.id)}></sn-icon></span>
                <span>${ie(i,s,a.id)} · ${fe(e,r,n)}</span>
                <small>${_e(e,new Date(a.when).toISOString())}</small>
              </div>`}))}
          </div>`:B`<sn-empty text=${e("notif_quiet")}></sn-empty>`:B`<sn-skeleton></sn-skeleton>`}`}};ih.styles=[fi,r`
      :host {
        display: grid;
        gap: 16px;
      }
      h3 {
        margin: 0;
        font-size: 14px;
        color: var(--text-2);
        font-weight: 600;
      }
      .note {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 4px 10px;
        padding: 12px 14px;
        border-radius: var(--r-md);
        background: color-mix(in srgb, var(--accent) 12%, var(--surface-2));
      }
      .note b {
        font-size: 15px;
      }
      .note p {
        grid-column: 1 / -1;
        margin: 0;
        font-size: 14px;
        color: var(--text-2);
        white-space: pre-line;
        max-height: 7.5em;
        overflow: hidden;
      }
      .ev {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px 4px;
        border-bottom: 1px solid var(--border);
        cursor: pointer;
      }
      .ev:last-child {
        border-bottom: 0;
      }
      .ev .ic {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: var(--surface-2);
        --icon-size: 18px;
        flex: none;
      }
      .ev.alert .ic {
        background: color-mix(in srgb, var(--alert) 22%, transparent);
        color: var(--alert-text);
      }
      .ev span {
        flex: 1;
        min-width: 0;
      }
      .ev small {
        color: var(--text-2);
        flex: none;
      }
    `],th([gt({attribute:!1})],ih.prototype,"ctx",2),th([gt({attribute:!1})],ih.prototype,"notes",2),th([mt()],ih.prototype,"rows",2),ih=th([pt("sn-notifs")],ih);var sh=Object.defineProperty,nh=Object.getOwnPropertyDescriptor,ah=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?nh(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&sh(e,i,a),a};let oh=class extends ct{call(t){ki("tap"),this.ctx.hass.callService("media_player",t,{entity_id:this.player.entity_id}).catch((()=>this.ctx.toast(this.ctx.t("error"))))}render(){const{ctx:t,player:e}=this,i=e.attributes,s=i.entity_picture?t.hass.hassUrl(i.entity_picture):void 0;return B`<div class="p" role="group" aria-label=${i.media_title} @click=${()=>t.openEntity(e.entity_id)}>
      <span class="art" style=${s?`background-image:url('${s}')`:""}></span>
      <span class="t"><b>${i.media_title}</b><span>${i.media_artist||ie(t.hass,t.config,e.entity_id)}</span></span>
      <button class="main" aria-label="pause" @click=${t=>(t.stopPropagation(),this.call("media_play_pause"))}><sn-icon icon="pause"></sn-icon></button>
      ${32&(i.supported_features??0)?B`<button aria-label="next" @click=${t=>(t.stopPropagation(),this.call("media_next_track"))}><sn-icon icon="skip-next"></sn-icon></button>`:U}
    </div>`}};oh.styles=r`
    :host {
      position: fixed;
      z-index: 24;
      bottom: calc(84px + env(safe-area-inset-bottom));
      inset-inline-start: 16px;
      max-width: min(360px, calc(100vw - 32px));
      animation: in 420ms cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .p {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 6px;
      padding-inline-end: 8px;
      border-radius: 999px;
      background: color-mix(in srgb, var(--surface-solid) 88%, transparent);
      -webkit-backdrop-filter: blur(var(--glass-blur, 24px)) saturate(160%);
      backdrop-filter: blur(var(--glass-blur, 24px)) saturate(160%);
      box-shadow: var(--shadow-lift);
      color: var(--text);
      cursor: pointer;
    }
    .art {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: var(--surface-2) center / cover;
      flex: none;
      animation: spin 14s linear infinite;
      animation-play-state: var(--loops, running);
    }
    .t {
      min-width: 0;
      display: grid;
      line-height: 1.25;
    }
    .t b,
    .t span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .t b {
      font-size: 14px;
    }
    .t span {
      font-size: 12px;
      color: var(--text-2);
    }
    button {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      border: 0;
      background: var(--surface-2);
      color: var(--text);
      display: grid;
      place-items: center;
      cursor: pointer;
      flex: none;
      --icon-size: 20px;
    }
    button.main {
      background: var(--accent);
      color: var(--on-accent);
    }
    @keyframes in {
      from {
        opacity: 0;
        transform: translateY(20px) scale(0.9);
      }
    }
    @keyframes spin {
      to {
        rotate: 360deg;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      :host,
      .art {
        animation: none;
      }
    }
  `,ah([gt({attribute:!1})],oh.prototype,"ctx",2),ah([gt({attribute:!1})],oh.prototype,"player",2),oh=ah([pt("sn-miniplayer")],oh);const rh=t=>(Date.now()-Date.parse(t))/6e4;const lh="smartnest-nudges";function ch(t){try{const e=JSON.parse(localStorage.getItem(lh)??"{}")[t];return!!e&&e>Date.now()}catch{return!1}}const dh=["style","material","accent","nav","font","icons","active_glow","aurora","accent_day","page_moods","season_skin","motion","glass","theme"];const ph={rubik:{label:"Rubik",family:"Rubik"},plex:{label:"IBM Plex Arabic",family:"IBM Plex Sans Arabic",css:"IBM+Plex+Sans+Arabic:wght@400;500;600;700"},readex:{label:"Readex Pro",family:"Readex Pro",css:"Readex+Pro:wght@400;500;600;700"},tajawal:{label:"Tajawal",family:"Tajawal",css:"Tajawal:wght@400;500;700;800"},almarai:{label:"Almarai",family:"Almarai",css:"Almarai:wght@400;700;800"},kufi:{label:"Noto Kufi Arabic",family:"Noto Kufi Arabic",css:"Noto+Kufi+Arabic:wght@400;500;600;700"},inter:{label:"Inter (+ Rubik)",family:"Inter",css:"Inter:wght@400;500;600;700;800"}};function hh(t=new Date){try{const e=new Intl.DateTimeFormat("en-u-ca-islamic-umalqura",{day:"numeric",month:"numeric"}).formatToParts(t),i=Number(e.find((t=>"month"===t.type))?.value),s=Number(e.find((t=>"day"===t.type))?.value);if(9===i)return"ramadan";if(10===i&&s<=3)return"eid_fitr";if(12===i&&s>=10&&s<=13)return"eid_adha"}catch{}const e=t.getMonth(),i=t.getDate();return 11===e&&i>=20&&i<=26?"christmas":11===e&&31===i||0===e&&1===i?"new_year":void 0}var uh=Object.defineProperty,gh=Object.getOwnPropertyDescriptor,mh=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?gh(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&uh(e,i,a),a};let fh=class extends ct{constructor(){super(...arguments),this.text=""}render(){return B`<svg viewBox="0 0 96 72" aria-hidden="true">
        ${Z`<ellipse cx="48" cy="66" rx="34" ry="4" fill="currentColor" opacity=".12"></ellipse>
        <path d="M24 38 L48 18 L72 38 V62 H24 Z" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".35" stroke-width="2" stroke-linejoin="round"></path>
        <path d="M18 40 L48 14 L78 40" fill="none" stroke="var(--accent)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
        <rect x="42" y="44" width="12" height="18" rx="3" fill="currentColor" opacity=".25"></rect>
        <rect x="30" y="42" width="8" height="8" rx="2" fill="var(--accent)" opacity=".55"></rect>
        <path class="star" d="M80 10 l1.6 3.4 3.4 1.6 -3.4 1.6 -1.6 3.4 -1.6 -3.4 -3.4 -1.6 3.4 -1.6z" fill="var(--accent)"></path>
        <path class="star" d="M14 18 l1.2 2.6 2.6 1.2 -2.6 1.2 -1.2 2.6 -1.2 -2.6 -2.6 -1.2 2.6 -1.2z" fill="currentColor" opacity=".5"></path>
        <circle class="star" cx="62" cy="6" r="1.6" fill="currentColor" opacity=".5"></circle>`}
      </svg>
      <span>${this.text}</span>`}};fh.styles=r`
    :host {
      display: grid;
      justify-items: center;
      gap: 8px;
      text-align: center;
      padding: 8px;
      color: var(--text-2);
      font-size: 14px;
      grid-column: 1 / -1;
    }
    svg {
      width: 96px;
      height: 72px;
      overflow: visible;
    }
    .star {
      animation: twinkle 2.6s ease-in-out infinite;
      transform-origin: center;
      transform-box: fill-box;
    }
    .star:nth-of-type(2) {
      animation-delay: 0.8s;
    }
    .star:nth-of-type(3) {
      animation-delay: 1.6s;
    }
    @keyframes twinkle {
      50% {
        opacity: 0.25;
        transform: scale(0.7);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .star {
        animation: none;
      }
    }
  `,mh([gt()],fh.prototype,"text",2),fh=mh([pt("sn-empty")],fh);var bh=Object.defineProperty,_h=Object.getOwnPropertyDescriptor,yh=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?_h(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&bh(e,i,a),a};function vh(t){const e=new Blob([JSON.stringify({smartnest:1,config:t},null,2)],{type:"application/json"}),i=document.createElement("a");i.href=URL.createObjectURL(e),i.download=`smartnest-${(t.settings.home_name||"home").replace(/\s+/g,"-")}.json`,i.click(),window.setTimeout((()=>URL.revokeObjectURL(i.href)),2e3)}function xh(t,e){e.text().then((e=>{const i=JSON.parse(e);if(!i?.smartnest||!Array.isArray(i.config?.pages))throw new Error("not smartnest");const s=Ge(i.config,t.lang);t.update((t=>Object.assign(t,s))),t.toast(t.t("import_done"))})).catch((()=>t.toast(t.t("import_bad"))))}function wh(t,e=Date.now()){return t.settings.maintenance.map((t=>{const i=Date.parse(t.last)+864e5*t.every_days;return{...t,days:Math.round((i-e)/864e5)}}))}const $h={flat:["home","rooms","power","security"],villa:["home","rooms","power","security","doorbell","climate","robot"],office:["home","rooms","power","climate"]};let kh=class extends ct{constructor(){super(...arguments),this.step=0,this.name="",this.language="ar",this.house="flat"}firstUpdated(){this.name=this.ctx.config.settings.home_name||this.ctx.hass.config?.location_name||"",this.language=this.ctx.lang}finish(){const{ctx:t}=this,e=structuredClone(t.config);e.settings.home_name=this.name,e.settings.language=this.language,e.pages=$h[this.house].map((i=>Ke(i,t.hass,e,t.t))),e.settings.default_page=e.pages[0].id,e.settings.setup_done=!0,this.onDone(e)}render(){const{t:t}=this.ctx;return B`<div class="dots">${[0,1].map((t=>B`<span class=${t===this.step?"on":""}></span>`))}</div>
      ${0===this.step?B`<div class="step">
            <label class="field">${t("home_name")}<input type="text" .value=${this.name} @input=${t=>this.name=t.target.value} /></label>
            <div class="field">
              ${t("language")}
              <div class="seg">${Vt.map((t=>B`<button aria-pressed=${this.language===t.id} @click=${()=>this.language=t.id}>${t.label}</button>`))}</div>
            </div>
            <button class="btn primary pressable" @click=${()=>this.step=1}>${t("wizard_next")}</button>
          </div>`:B`<div class="step">
            <b>${t("wizard_house")}</b>
            <div class="houses">
              ${[["flat","house_flat","home-outline"],["villa","house_villa","home"],["office","house_office","desk"]].map((([e,i,s])=>B`<button aria-pressed=${this.house===e} @click=${()=>this.house=e}><sn-icon .icon=${s}></sn-icon>${t(i)}</button>`))}
            </div>
            <button class="btn primary pressable" @click=${()=>this.finish()}>${t("wizard_finish")}</button>
          </div>`}`}};function Ch(t){let e=0;t.showSheet({title:t.t("rate_service"),render:t=>B`<form
      style="display:grid;gap:14px;justify-items:center"
      @submit=${i=>{if(i.preventDefault(),!e)return;const s=i.currentTarget.querySelector("input").value.trim();t.hass.callWS({type:"smartnest/feedback",stars:e,comment:s}).then((()=>{t.toast(t.t("rate_thanks")),t.closeSheet()})).catch((()=>t.toast(t.t("error"))))}}
    >
      <div style="display:flex;gap:6px;direction:ltr" role="radiogroup">
        ${[1,2,3,4,5].map((t=>B`<button
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
    </form>`})}async function Mh(t,e=7){const i=Rs(t.config).filter((e=>t.hass.states[e]&&"event"!==ee(e)));if(!i.length)return[];try{const s=await t.hass.callWS({type:"logbook/get_events",start_time:new Date(Date.now()-864e5*e).toISOString(),end_time:(new Date).toISOString(),entity_ids:i}),n=new Map;for(const t of s)"unavailable"===t.state&&n.set(t.entity_id,(n.get(t.entity_id)??0)+1);return[...n.entries()].map((([e,i])=>({id:e,n:i,name:ie(t.hass,t.config,e)}))).sort(((t,e)=>e.n-t.n)).slice(0,8)}catch{return[]}}kh.styles=[fi,r`
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
    `],yh([gt({attribute:!1})],kh.prototype,"ctx",2),yh([gt({attribute:!1})],kh.prototype,"onDone",2),yh([mt()],kh.prototype,"step",2),yh([mt()],kh.prototype,"name",2),yh([mt()],kh.prototype,"language",2),yh([mt()],kh.prototype,"house",2),kh=yh([pt("sn-wizard")],kh);var Hh=Object.defineProperty,Ah=Object.getOwnPropertyDescriptor,Lh=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Ah(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&Hh(e,i,a),a};function Vh(t,e){const{hass:i,config:s,t:n}=t,a=Object.values(i.states),o=new Set(Rs(s)),r=a.filter((t=>"unavailable"===t.state&&o.has(t.entity_id))).map((t=>ie(i,s,t.entity_id))),l=a.filter((t=>"battery"===t.attributes.device_class&&"sensor"===ee(t.entity_id)&&Number(t.state)<20)).map((t=>`${ie(i,s,t.entity_id)} ${t.state}%`));return[`🏠 ${s.settings.home_name||i.config?.location_name||"SmartNest"} · v${e}`,r.length?`${n("h_offline")}: ${r.slice(0,6).join("، ")}`:`${n("h_offline")}: ✓`,...l.length?[`${n("h_battery")}: ${l.slice(0,4).join("، ")}`]:[]]}const Sh=t=>t.replace(/[&<>"]/g,(t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[t])));async function zh(t,e){const{hass:i,config:s,t:n,lang:a}=t,o=Ot[a],r=new Date,l=new Date(r.getFullYear(),r.getMonth(),1),c=s.pages.flatMap((t=>t.widgets)).find((t=>"energy_stats"===t.type))?.config??{},d=c.total??fa(i).total,p=Number(c.tariff??.6),h=c.currency??"₪";let u;if(d)try{u=((await i.callWS({type:"recorder/statistics_during_period",start_time:l.toISOString(),end_time:r.toISOString(),statistic_ids:[d],period:"day",types:["change"]}))[d]??[]).reduce(((t,e)=>t+(e.change??0)),0)}catch{}const g=await Mh(t,30),m=wh(s).sort(((t,e)=>t.days-e.days)),f=Rs(s).filter((t=>i.states[t])),b=f.filter((t=>"unavailable"===i.states[t].state)),_=Object.values(i.states).filter((t=>t.entity_id.startsWith("automation.")&&String(t.attributes.friendly_name??"").startsWith("SmartNest"))),y=s.settings.home_name||i.config?.location_name||"SmartNest",v=s.settings.installer,x=new URL(`${e}logo/smartnest-symbol-color.svg`,location.href).href,w=t=>`<li>${Sh(t)}</li>`,$=(t,e)=>`<section><h2>${Sh(t)}</h2>${e}</section>`,k=`<!doctype html><html lang="${a}" dir="${St(a)?"rtl":"ltr"}"><head><meta charset="utf-8"><title>${Sh(y)}</title>\n<style>\nbody{font-family:Rubik,system-ui,-apple-system,"Segoe UI",Tahoma,sans-serif;color:#1d1d1f;margin:32px;}\nheader{display:flex;align-items:center;gap:16px;border-bottom:3px solid #E9971D;padding-bottom:16px;margin-bottom:20px}\nheader img{width:56px;height:56px} h1{margin:0;font-size:26px} .sub{color:#6e6e73;font-size:14px}\n.grid{display:grid;grid-template-columns:1fr 1fr;gap:16px} section{border:1px solid #e5e5ea;border-radius:16px;padding:16px;break-inside:avoid}\nh2{margin:0 0 8px;font-size:16px;color:#E9971D} .big{font-size:30px;font-weight:700;unicode-bidi:plaintext} .sub{unicode-bidi:plaintext} ul{margin:0;padding-inline-start:18px;line-height:1.7}\nfooter{margin-top:24px;color:#6e6e73;font-size:12px;display:flex;justify-content:space-between}\n@page{margin:14mm}\n</style></head><body>\n<header><img src="${x}" alt=""><div><h1>${Sh(n("report_title",{name:y}))}</h1><div class="sub">${Sh(r.toLocaleDateString(o,{month:"long",year:"numeric"}))}</div></div></header>\n<div class="grid">\n${void 0!==u?$(n("bill_title"),`<div class="big">${Sh(`${ge(u,a,0)} kWh`)}</div><div class="sub">≈ ${Sh(`${h} ${ge(u*p,a,0)}`)}</div>`):""}\n${$(n("report_devices"),`<div class="big">${f.length}</div><div class="sub">${Sh(n("report_offline",{n:b.length}))}</div>`)}\n${$(n("report_faults"),g.length?`<ul>${g.map((t=>w(`${t.name} · ${n("times",{n:t.n})}`))).join("")}</ul>`:`<div class="sub">${Sh(n("h_all_good"))}</div>`)}\n${$(n("maintenance"),m.length?`<ul>${m.map((t=>w(`${t.title} · ${t.days<0?n("m_overdue",{n:-t.days}):n("m_in",{n:t.days})}`))).join("")}</ul>`:'<div class="sub">–</div>')}\n${$(n("automations"),`<div class="big">${_.length}</div><div class="sub">${Sh(n("report_autos",{n:_.filter((t=>"on"===t.state)).length}))}</div>`)}\n</div>\n<footer><span>${Sh(v.name||"SmartNest")}${v.phone?` · ${Sh(v.phone)}`:""}</span><span>SmartNest</span></footer>\n</body></html>`,C=document.createElement("iframe");C.style.cssText="position:fixed;width:0;height:0;border:0;opacity:0",document.body.appendChild(C),C.srcdoc=k,C.onload=()=>{C.contentWindow?.focus(),C.contentWindow?.print(),window.setTimeout((()=>C.remove()),6e4)}}const Dh=[{id:"gold",label:"preset_gold",accent:"#E9971D",glass:"classic",theme:"schedule"},{id:"sea",label:"preset_sea",accent:"#1E88E5",glass:"liquid",theme:"schedule"},{id:"desert",label:"preset_desert",accent:"#C68B59",glass:"classic",theme:"light"},{id:"night",label:"preset_night",accent:"#8E6CEF",glass:"liquid",theme:"dark"},{id:"rose",label:"preset_rose",accent:"#E85D9E",glass:"classic",theme:"light"},{id:"olive",label:"preset_olive",accent:"#6E9B3A",glass:"classic",theme:"schedule"}];function Oh(t,e){const i=t.config.settings;return B`<div class="field">
    ${t.t("presets")}
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:8px">
      ${Dh.map((s=>{const n=i.accent.toUpperCase()===s.accent&&i.theme===s.theme&&i.glass===s.glass,a="dark"===s.theme;return B`<button
          class="pressable"
          aria-pressed=${n}
          style="display:grid;gap:8px;justify-items:center;padding:12px;border-radius:var(--r-md);border:2px solid ${n?s.accent:"transparent"};
            background:${a?"#1c1c22":"#f6f1ea"};color:${a?"#fff":"#1d1d1f"};font:600 13px var(--font);cursor:pointer"
          @click=${()=>e((e=>{e.settings.accent=s.accent,e.settings.glass=t.allows("liquid_glass")?s.glass:"classic",e.settings.theme=s.theme}))}
        >
          <span style="display:flex;gap:4px">
            <i style="width:22px;height:22px;border-radius:999px;background:${s.accent}"></i>
            <i style="width:22px;height:22px;border-radius:999px;background:${a?"#2c2c34":"#fff"};box-shadow:inset 0 0 0 1px rgba(0,0,0,.1)"></i>
          </span>
          ${t.t(s.label)}
        </button>`}))}
    </div>
  </div>`}let Th=class extends ct{createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.ctx.hass.callWS({type:"smartnest/history/list"}).then((t=>this.items=t.items)).catch((()=>this.items=[]))}render(){const{t:t,hass:e,lang:i}=this.ctx;return this.items?this.items.length?B`<div style="display:grid;gap:8px">
      <span class="muted" style="font-size:14px">${t("history_hint")}</span>
      ${this.items.map((s=>B`<div style="display:flex;align-items:center;gap:10px;padding:12px;border-radius:var(--r-md);background:var(--surface-2)">
          <span style="flex:1;display:grid;gap:2px">
            <b>${new Date(1e3*s.time).toLocaleString(Ot[i],{weekday:"short",day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})}</b>
            <span class="muted" style="font-size:13px">${_e(t,new Date(1e3*s.time).toISOString())} · ${s.user||"–"} · ${t("history_size",{p:s.pages,w:s.widgets})}</span>
          </span>
          <button
            class="btn pressable"
            @click=${async()=>{if(confirm(t("history_confirm")))try{await e.callWS({type:"smartnest/history/restore",version:s.id}),this.ctx.toast(t("history_done")),this.ctx.closeSheet()}catch{this.ctx.toast(t("error"))}}}
          >
            ${t("history_restore")}
          </button>
        </div>`))}
    </div>`:B`<p class="muted" style="margin:0">${t("history_empty")}</p>`:B`<sn-skeleton></sn-skeleton>`}};Lh([gt({attribute:!1})],Th.prototype,"ctx",2),Lh([mt()],Th.prototype,"items",2),Th=Lh([pt("sn-history")],Th);const jh=t=>t.showSheet({title:t.t("history"),render:t=>B`<sn-history .ctx=${t}></sn-history>`});async function Ph(t){let e=!1;try{e=(await t.hass.callWS({type:"smartnest/issuer/status"})).ready}catch{}const i=()=>{history.pushState(null,"","/smartnest-licenses"),window.dispatchEvent(new CustomEvent("location-changed"))};if(e)return i();t.showSheet({title:"🔑 التراخيص",render:t=>B`<div style="display:grid;gap:12px">
      <span class="muted">ارفع ملف <bdi><b>license-private.pem</b></bdi> من فولدر <bdi><b>.smartnest</b></bdi> على الكمبيوتر. بعدها بتطلع صفحة <b>التراخيص</b> بالقائمة الجانبية، بهالبيت بس وللأدمن بس.</span>
      <label class="btn primary pressable" style="min-height:52px;cursor:pointer">
        <sn-icon icon="upload" style="--icon-size:20px"></sn-icon>اختار الملف
        <input
          type="file"
          style="display:none"
          @change=${async e=>{const s=e.target.files?.[0];if(s)try{await t.hass.callWS({type:"smartnest/issuer/setup",pem:await s.text()}),t.toast("تمام ✓"),t.closeSheet(),window.setTimeout(i,600)}catch{t.toast("هاد مش مفتاح SmartNest الصح")}}}
        />
      </label>
    </div>`})}var Ih=Object.defineProperty,Eh=Object.getOwnPropertyDescriptor,Nh=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Eh(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&Ih(e,i,a),a};let Wh=class extends ct{constructor(){super(...arguments),this.watts=0}connectedCallback(){super.connectedCallback(),navigator.vibrate?.([200,100,200])}render(){const{ctx:t}=this,{t:e,hass:i,lang:s,config:n}=t,a=t=>ue(`${ge(t/1e3,s,1)} kW`),o=Dc(i,n.settings.power_entity).filter((t=>t.control&&!t.standby)).slice(0,3);return B`<div class="card" role="alert">
      <div class="head">
        <span class="bolt"><sn-icon icon="lightning-bolt" style="--icon-size:22px"></sn-icon></span>
        <b>${e("overload_title",{now:a(this.watts),max:a(n.settings.power_limit??0)})}</b>
        <button class="btn pressable" @click=${()=>this.onDismiss()}>${e("dismiss")}</button>
      </div>
      ${o.length?B`<span class="muted" style="font-size:14px">${e("overload_hint")}</span>`:U}
      ${o.map((s=>B`<div class="row">
          <span>${ie(i,n,s.control)}</span>
          <span class="w">${a(s.w)}</span>
          <button
            class="btn danger pressable"
            @click=${()=>i.callService("climate"===ee(s.control)?"climate":"homeassistant","turn_off",{entity_id:s.control}).then((()=>t.toast(e("done")))).catch((()=>t.toast(e("error"))))}
          >
            ${e("turn_off")}
          </button>
        </div>`))}
    </div>`}};Wh.styles=[fi,r`
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
    `],Nh([gt({attribute:!1})],Wh.prototype,"ctx",2),Nh([gt({type:Number})],Wh.prototype,"watts",2),Nh([gt({attribute:!1})],Wh.prototype,"onDismiss",2),Wh=Nh([pt("sn-overload")],Wh);var Rh=Object.defineProperty,Fh=Object.getOwnPropertyDescriptor,Bh=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Fh(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&Rh(e,i,a),a};const Zh="switch.smartnest_travel_mode";function qh(t){t.showSheet({title:t.t("travel"),render:t=>{const{t:e,hass:i,config:s}=t,n="on"===i.states[Zh]?.state,a=s.settings.travel,o=i.states[Zh]?.attributes.simulating??[],r=(t,e)=>B`<div style="display:flex;gap:10px;align-items:center;font-size:15px">
        <sn-icon icon=${t} style="--icon-size:20px;color:var(--accent-text)"></sn-icon><span>${e}</span>
      </div>`;return B`<div style="display:grid;gap:14px">
        <div style="display:grid;gap:10px;padding:14px 16px;border-radius:var(--r-md);background:var(--surface-2)">
          ${a.off.length?r("power",e("travel_off",{x:a.off.map((t=>ie(i,s,t))).join("، ")})):U}
          ${a.arm&&Object.keys(i.states).some((t=>t.startsWith("alarm_control_panel.")))?r("shield-home",e("travel_arm")):U}
          ${a.simulate?r("lightbulb",e("travel_sim")):U}
          ${a.notify?r("bell-ring",e("travel_report")):U}
        </div>
        ${n&&o.length?B`<span class="muted" style="font-size:14px">${e("travel_sim_now",{x:o.map((t=>ie(i,s,t))).join("، ")})}</span>`:U}
        <button
          class="btn ${n?"":"primary"} pressable"
          style="min-height:56px;font-size:17px"
          @click=${()=>{i.callService("switch",n?"turn_off":"turn_on",{entity_id:Zh}).then((()=>t.toast(e(n?"travel_welcome":"travel_bye"))),(()=>t.toast(e("error")))),t.closeSheet()}}
        >
          <sn-icon icon=${n?"home":"airplane"} style="--icon-size:22px"></sn-icon>${e(n?"travel_stop":"travel_start")}
        </button>
      </div>`}})}let Uh=class extends ct{constructor(){super(...arguments),this.code=!1}connectedCallback(){super.connectedCallback(),navigator.vibrate?.([400,200,400,200,400])}render(){const{ctx:t}=this,{t:e,hass:i,config:s}=t,n=function(t){const e=Date.now()-6e5;return Object.values(t.states).filter((t=>"binary_sensor"===ee(t.entity_id)&&"on"===t.state&&["door","window","opening","garage_door","motion","occupancy","presence","smoke","gas"].includes(t.attributes.device_class)&&Date.parse(t.last_changed)>e)).sort(((t,e)=>e.last_changed.localeCompare(t.last_changed)))[0]}(i),a=function(t,e){const{hass:i,config:s}=t,n=Object.keys(i.states).filter((t=>t.startsWith("camera."))),a=e?Ve(i,e.entity_id):void 0;return a&&n.find((t=>Ve(i,t)===a))||s.settings.doorbell.camera_entity||n[0]}(t,n),o=a?Vn(i,a)??Ln(i,a,Date.now()):void 0,r=s.settings.emergency;return B`<div class="card" role="alertdialog" aria-label=${e("alarm_triggered")}>
      <h1><sn-icon icon="alarm-light" style="--icon-size:44px"></sn-icon>${e("alarm_triggered")}</h1>
      <span class="why">${n?`${ie(i,s,n.entity_id)} · ${_e(e,n.last_changed)}`:ie(i,s,this.alarm.entity_id)}</span>
      ${o?B`<div class="cam"><img src=${o} alt="" /></div>`:U}
      ${this.code?B`<div class="pad">
            <sn-pinpad
              .length=${0}
              prompt=${e("alarm_code")}
              error=${e("wrong_pin")}
              .onSubmit=${s=>(i.callService("alarm_control_panel","alarm_disarm",{entity_id:this.alarm.entity_id,code:s}).catch((()=>t.toast(e("wrong_pin")))),this.code=!1,!0)}
            ></sn-pinpad>
          </div>`:B`<div class="row">
            ${r.police?B`<a class="btn call pressable" href="tel:${r.police}"><sn-icon icon="phone"></sn-icon>${e("call_police")} ${r.police}</a>`:U}
            ${r.contacts.map((t=>B`<a class="btn call pressable" href="tel:${t.phone}"><sn-icon icon="phone"></sn-icon>${t.name}</a>`))}
          </div>
          <div class="row">
            <button class="btn primary pressable" @click=${()=>this.code=!0}><sn-icon icon="shield-off"></sn-icon>${e("alarm_stop")}</button>
            <button class="btn pressable" @click=${()=>this.onHide()}>${e("alarm_hide")}</button>
          </div>`}
    </div>`}};Uh.styles=[fi,r`
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
    `],Bh([gt({attribute:!1})],Uh.prototype,"ctx",2),Bh([gt({attribute:!1})],Uh.prototype,"alarm",2),Bh([gt({attribute:!1})],Uh.prototype,"onHide",2),Bh([mt()],Uh.prototype,"code",2),Uh=Bh([pt("sn-alarm")],Uh);const Yh=["rainy","pouring","lightning","lightning-rainy","hail","snowy","snowy-rainy","windy","windy-variant","exceptional"];let Xh=class extends ct{render(){const{ctx:t,risk:e}=this,{t:i,hass:s,config:n}=t,a=[...e.open,...e.covers].map((t=>ie(s,n,t)));return B`<div class="card" role="alert">
      <div class="head">
        <sn-icon icon=${e.condition.includes("wind")?"weather-windy":"weather-pouring"} style="--icon-size:28px;color:#3a86ff"></sn-icon>
        <b>${i(e.condition.includes("wind")?"wx_alert_wind":"wx_alert_rain")}</b>
      </div>
      <span class="muted" style="font-size:14px">${i("wx_alert_open",{x:a.slice(0,4).join("، ")})}</span>
      <div class="row">
        ${e.covers.length?B`<button
              class="btn primary pressable"
              @click=${()=>{s.callService("cover","close_cover",{entity_id:e.covers}).catch((()=>t.toast(i("error")))),this.onDismiss()}}
            >
              ${i("wx_close_covers")}
            </button>`:U}
        <button class="btn pressable" @click=${()=>this.onDismiss()}>${i("dismiss")}</button>
      </div>
    </div>`}};Xh.styles=[fi,r`
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
    `],Bh([gt({attribute:!1})],Xh.prototype,"ctx",2),Bh([gt({attribute:!1})],Xh.prototype,"risk",2),Bh([gt({attribute:!1})],Xh.prototype,"onDismiss",2),Xh=Bh([pt("sn-weather-alert")],Xh);var Kh=Object.defineProperty,Gh=Object.getOwnPropertyDescriptor,Jh=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Gh(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&Kh(e,i,a),a};function Qh(t){const e=Rs(t.config).filter((e=>"camera"===ee(e)&&t.hass.states[e]));return e.length?e:Object.keys(t.hass.states).filter((t=>"camera"===ee(t)))}let tu=class extends ct{constructor(){super(...arguments),this.bust=Date.now(),this.onKey=t=>{"Escape"===t.key&&(this.big?this.big=void 0:this.onClose())}}connectedCallback(){super.connectedCallback(),this.timer=window.setInterval((()=>this.bust=Date.now()),2e3),window.addEventListener("keydown",this.onKey)}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this.timer),window.removeEventListener("keydown",this.onKey)}render(){const{ctx:t}=this,e=Qh(t),i=new Set(e.length>1?e.filter((e=>function(t,e){const i=t.entities?.[e]?.device_id,s=e.split(".")[1].replace(/_(camera|cam|stream|main|sub|high|low)$/g,"");return Object.values(t.states).some((e=>e.entity_id.startsWith("binary_sensor.")&&"on"===e.state&&["motion","occupancy","presence","moving"].includes(e.attributes.device_class)&&(i&&t.entities?.[e.entity_id]?.device_id===i||e.entity_id.split(".")[1].startsWith(s))))}(t.hass,e))):[]),s=[...e.filter((t=>i.has(t))),...e.filter((t=>!i.has(t)))],n=Math.ceil(Math.sqrt(s.length)),a=Math.ceil(s.length/n);return B`<div class="wall" role="dialog" aria-label=${t.t("widget_camera")}>
      <div class="top">
        <sn-icon icon="cctv"></sn-icon>
        <strong>${t.t("camera_wall")}</strong>
        <button class="icon-btn pressable" aria-label=${t.t("close")} @click=${()=>this.big?this.big=void 0:this.onClose()}>
          <sn-icon icon=${this.big?"arrow-left":"close"}></sn-icon>
        </button>
      </div>
      <div class="grid" style="grid-template-columns:repeat(${n},1fr);grid-template-rows:repeat(${a+(i.size&&n>1?i.size:0)},1fr);grid-auto-flow:dense">
        ${s.map(((e,s)=>B`<button class="cam pressable ${i.has(e)&&n>1?"moving":""}" style="animation-delay:${40*Math.min(s,8)}ms" @click=${()=>this.big=e}>
            ${i.has(e)?B`<b class="mv">${t.t("cam_motion")}</b>`:U}
            ${Ln(t.hass,e,this.bust)?B`<img src=${Ln(t.hass,e,this.bust)} alt="" />`:U}
            <span>${ie(t.hass,t.config,e)}</span>
          </button>`))}
      </div>
      ${this.big?B`<div class="big" @click=${()=>this.big=void 0}>
            <img src=${Vn(t.hass,this.big)??Ln(t.hass,this.big,this.bust)??""} alt="" />
            <span class="live">${t.t("streaming")} · ${ie(t.hass,t.config,this.big)}</span>
          </div>`:U}
    </div>`}};tu.styles=[fi,r`
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
      /* Something moving: that camera takes a bigger place, outlined, until it's quiet again. */
      .cam.moving {
        grid-column: span 2;
        grid-row: span 2;
        box-shadow: 0 0 0 3px var(--alert);
      }
      .cam .mv {
        position: absolute;
        top: 10px;
        inset-inline-start: 10px;
        padding: 4px 10px;
        border-radius: 999px;
        background: var(--alert);
        color: #fff;
        font-size: 12px;
        font-weight: 700;
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
    `],Jh([gt({attribute:!1})],tu.prototype,"ctx",2),Jh([gt({attribute:!1})],tu.prototype,"onClose",2),Jh([mt()],tu.prototype,"big",2),Jh([mt()],tu.prototype,"bust",2),tu=Jh([pt("sn-camwall")],tu);const eu="smartnest-kiosk";function iu(){try{return"1"===localStorage.getItem(eu)}catch{return!1}}function su(t,e){let i=2166136261;const s=`${e}:${t}`;for(let n=0;n<2e3;n++){for(let t=0;t<s.length;t++)i^=s.charCodeAt(t),i=Math.imul(i,16777619)>>>0;i^=n}return i.toString(16).padStart(8,"0")}const nu=()=>Math.random().toString(36).slice(2,10);function au(t){const e=function(){const t=document.querySelector("home-assistant")?.shadowRoot?.querySelector("home-assistant-main");return t?.shadowRoot??null}();if(!e)return;let i=e.getElementById("smartnest-kiosk");t&&!i?(i=document.createElement("style"),i.id="smartnest-kiosk",i.textContent=":host { --mdc-drawer-width: 0px !important; } ha-sidebar { display: none !important; }",e.appendChild(i)):t||i?.remove()}let ou;const ru=[["screen","switch",/(^|_)screen$/],["brightness","number",/screen_brightness$/],["motion","switch",/motion_detection$/],["media","media_player",/.*/]];function lu(t){const e=new Map;for(const i of Object.values(t.entities??{})){if("fully_kiosk"!==i.platform||!i.device_id)continue;let s=e.get(i.device_id);s||(s={deviceId:i.device_id,name:t.devices?.[i.device_id]?.name??"Tablet"},e.set(i.device_id,s));const[n,a]=i.entity_id.split("."),o=i.translation_key??a;for(const[t,e,r]of ru)if(n===e&&!s[t]&&(r.test(o)||r.test(a))){s[t]=i.entity_id;break}}return[...e.values()]}function cu(t){const e=window.fully;if(!e)return;const i=lu(t),s=e.getDeviceId?.();if(s){const e=i.find((e=>t.devices?.[e.deviceId]?.identifiers?.some((([t,e])=>"fully_kiosk"===t&&e===s))));if(e)return e}return 1===i.length?i[0]:void 0}async function du(t,e,i){if(!e.brightness)return;const s=(t=>Math.round(Math.min(100,Math.max(1,t))/100*255))(i);Math.abs(Number(t.states[e.brightness]?.state)-s)<=3||await t.callService("number","set_value",{entity_id:e.brightness,value:s})}async function pu(t,e,i){e.screen&&"on"===t.states[e.screen]?.state!==i&&await t.callService("switch",i?"turn_on":"turn_off",{entity_id:e.screen})}var hu=Object.defineProperty,uu=Object.getOwnPropertyDescriptor,gu=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?uu(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&hu(e,i,a),a};const mu=()=>t((()=>import("./editors-Cb5NESlu.js")),[]);function fu(t){try{return"1"===localStorage.getItem(t)}catch{return!1}}function bu(t,e){try{e?localStorage.setItem(t,"1"):localStorage.removeItem(t)}catch{}}const _u="smartnest-cache-v1";function yu(){try{localStorage.removeItem(_u)}catch{}}const vu="1.47.0",xu=t=>{const[e,i]=t.split(":").map(Number);return 60*(e||0)+(i||0)};function wu(t,e,i){const s=60*t.getHours()+t.getMinutes(),n=xu(e),a=xu(i);return n<=a?s>=n&&s<a:s>=n||s<a}const $u=t=>{const e=(t??"").slice(0,2);return"en"===e||"he"===e?e:"ar"},ku={home:"#E9971D",dashboard:"#E9971D",sofa:"#E8A35C",bed:"#7C6CF0",kitchen:"#F26B68","shield-home":"#3A6DF0",cctv:"#3A6DF0",doorbell:"#8E6CEF","lightning-bolt":"#2BB673",solar:"#2BB673",water:"#3A9BFF","air-conditioner":"#18BCF2",thermometer:"#18BCF2","robot-vacuum":"#14B8C4",garden:"#5AA83C",sprinkler:"#5AA83C",car:"#9AA4AD",paw:"#C68B59",pool:"#18BCF2"},Cu=()=>{try{return localStorage.getItem("smartnest-lite")}catch{return null}},Mu=()=>(()=>{try{return"1"===localStorage.getItem("smartnest-slow")}catch{return!1}})()||(navigator.deviceMemory??8)<=2||(navigator.hardwareConcurrency??8)<=4,Hu=()=>{const t=Cu();return"1"===t||null===t&&Mu()},Au=(()=>{try{return"1"===localStorage.getItem("smartnest-showroom")}catch{return!1}})();let Lu=class extends ct{constructor(){super(...arguments),this.demoLoading=!1,this.lite=Hu(),this.liteChoice=Cu(),this.narrow=!1,this.pageId="",this.sheets=[],this.toastMsg="",this.sleeping=!1,this.saving=!1,this.loadError="",this.lic={licensee:"",plan:"premium",trial:!1,reseller:""},this.now=new Date,this.systemDark=matchMedia("(prefers-color-scheme: dark)").matches,this.wide=window.innerWidth>=768,this.kiosk=iu(),this.kids=(()=>{try{return"1"===localStorage.getItem("smartnest-kids")}catch{return!1}})(),this.initStarted=!1,this.lastActive=Date.now(),this.silentBell=!1,this.morning=!1,this.camwall=!1,this.overSince=0,this.wxDismissed="",this.waves=[],this.tiltOn=!1,this.tiltFrame=0,this.onTilt=t=>{if(null==t.beta||null==t.gamma)return;this.tiltBase??={b:t.beta,g:t.gamma};const e=t=>Math.max(-12,Math.min(12,t)),i=e(.6*(t.gamma-this.tiltBase.g)),s=e(.6*(t.beta-this.tiltBase.b));this.tiltFrame||(this.tiltFrame=requestAnimationFrame((()=>{this.tiltFrame=0;const t=this.renderRoot.querySelector(".app");t?.style.setProperty("--tilt-x",`${(-i).toFixed(1)}px`),t?.style.setProperty("--tilt-y",`${(-s).toFixed(1)}px`)})))},this.onWave=t=>{if(!this.pro||this.lite||"off"===this.current?.settings.motion)return;const e=t.detail,i=Date.now()+Math.random();this.waves=[...this.waves,{id:i,...e}],window.setTimeout((()=>this.waves=this.waves.filter((t=>t.id!==i))),1100)},this.pro=!1,this.big=(()=>{try{return"1"===localStorage.getItem("smartnest-big")}catch{return!1}})(),this.nightRed=fu("smartnest-nightred"),this.simple=fu("smartnest-simple"),this.touring=!1,this.searching=!1,this.onSearchKey=t=>{(t.metaKey||t.ctrlKey)&&"k"===t.key.toLowerCase()&&this.current&&zi(this.lic.plan,"search")&&(t.preventDefault(),this.searching=!this.searching)},this.voice=(()=>{try{return"1"===localStorage.getItem(up)}catch{return!1}})(),this.overSnooze=0,this.guests=function(){try{return"1"===localStorage.getItem(zd)}catch{return!1}}(),this.tvMode=(()=>{try{return"1"===localStorage.getItem("smartnest-tv")}catch{return!1}})(),this.enterDir=0,this.screenOffSent=!1,this.mql=matchMedia("(prefers-color-scheme: dark)"),this.notes=[],this.link="up",this.onLinkLost=()=>{window.clearTimeout(this.linkTimer),this.linkTimer=window.setTimeout((()=>this.link="lost"),1e3)},this.onLinkReady=()=>{window.clearTimeout(this.linkTimer),"up"!==this.link&&(this.link="back",this.linkTimer=window.setTimeout((()=>this.link="up"),1800))},this.onScroll=()=>{const t=this.renderRoot.querySelector(".app");t&&!this.lite&&(void 0===this.scrollRest&&(t.style.setProperty("--loops","paused"),t.style.setProperty("--glass-blur","16px")),window.clearTimeout(this.scrollRest),this.scrollRest=window.setTimeout((()=>{this.scrollRest=void 0,t.style.removeProperty("--loops"),t.style.removeProperty("--glass-blur")}),180))},this.onActivity=()=>{this.lastActive=Date.now(),this.screenOffSent=!1},this.onResize=()=>{this.wide=window.innerWidth>=768},this.onScheme=t=>{this.systemDark=t.matches},this.burnStep=0,this.onSwipeDown=t=>{if("mouse"===t.pointerType||this.draft||this.sheets.length)return;t.composedPath().some((t=>t instanceof HTMLElement&&(void 0!==t.dataset.noSwipe||t.classList.contains("seg")||/^(SN-VSLIDER|SN-COLOR-WHEEL|INPUT)$/.test(t.tagName))))||(this.swipe={x:t.clientX,y:t.clientY,t:performance.now(),id:t.pointerId,active:!1,dx:0})},this.onSwipeMove=t=>{const e=this.swipe;if(!e||t.pointerId!==e.id)return;const i=t.clientX-e.x,s=t.clientY-e.y,n=t.currentTarget;if(!e.active){if(Math.abs(s)>12&&Math.abs(s)>Math.abs(i))return void(this.swipe=void 0);if(Math.abs(i)<14||Math.abs(i)<1.4*Math.abs(s))return;e.active=!0,n.setPointerCapture(t.pointerId)}e.dx=i;const a=this.neighbour(i)?i:.3*i;n.style.transform=`translateX(${a}px)`,n.style.opacity=String(1-Math.min(Math.abs(a)/900,.3))},this.onSwipeUp=t=>{const e=this.swipe;if(this.swipe=void 0,!e?.active)return;const i=t.currentTarget,s=this.neighbour(e.dx),n=s?e.dx:.3*e.dx,a=e.dx/Math.max(1,performance.now()-e.t),o=()=>{i.style.transform="",i.style.opacity=""};if(s&&(Math.abs(e.dx)>90||Math.abs(a)>.45)){ki("tap");const t=Math.max(110,Math.min(200,160/Math.max(1,1.5*Math.abs(a))));i.animate([{transform:`translateX(${n}px)`,opacity:i.style.opacity||"1"},{transform:`translateX(${Math.sign(e.dx)*i.offsetWidth*.35}px)`,opacity:0}],{duration:t,easing:"cubic-bezier(0.22, 1, 0.36, 1)",fill:"forwards"}).finished.then((()=>{o(),this.goToPage(s)}))}else{o();const{frames:t,duration:e}=wi(n,0,a*(s?1:.3),(t=>({transform:`translateX(${t}px)`})));i.animate(t,{duration:e})}},this.recent=[],this.parked=new Map,this.recheckLicense=()=>{!this.license&&this.hass&&this.hass.callWS({type:"smartnest/license/status"}).then((t=>this.applyLicense(t)),(()=>{}))}}set hass(e){if(Au&&e!==this.demoHass)return void(this.demoLoading||(this.demoLoading=!0,globalThis.__SN_DEMO_BASE=`${this.panel?.config?.asset_base??"/smartnest_static/static/"}demo/`,t((()=>import("./mock-B6l8yU7f.js")),[]).then((t=>t.startMock((t=>{this.demoHass=t,this.hass=t}))))));if(!this._hass)return void this.applyHass(e);if(this.pendingHass=e,this.hassTimer)return;this.applyHass(e);const i=()=>{this.hassTimer=void 0,this.pendingHass&&this.pendingHass!==this._hass&&(this.applyHass(this.pendingHass),this.hassTimer=window.setTimeout(i,this.lite?700:150))};this.hassTimer=window.setTimeout(i,this.lite?700:150)}applyHass(t){const e=this._hass;this._hass=t,this.pendingHass=void 0,this.requestUpdate("hass",e)}get hass(){const t=this._hass,e=(this.draft??this.config)?.settings.hidden;if(!t||!e?.length)return t;const i=this.viewCache;if(i&&i.src===t&&i.hidden===e)return i.out;const s=new Set(e),n={};for(const o in t.states)s.has(o)||(n[o]=t.states[o]);const a={...t,states:n};return this.viewCache={src:t,hidden:e,out:a},a}pickWallAccent(t){this.wallSrc=t;const e=new Image;e.crossOrigin="anonymous",e.onload=()=>{try{const t=document.createElement("canvas");t.width=t.height=40;const i=t.getContext("2d",{willReadFrequently:!0});i.drawImage(e,0,0,40,40);const s=i.getImageData(0,0,40,40).data;let n={score:-1,rgb:[233,151,29]};for(let e=0;e<s.length;e+=4){const[t,i,a]=[s[e],s[e+1],s[e+2]],o=Math.max(t,i,a),r=Math.min(t,i,a),l=(o+r)/510,c=(o===r?0:(o-r)/(255-Math.abs(o+r-255)))*(1-1.6*Math.abs(l-.52));c>n.score&&(n={score:c,rgb:[t,i,a]})}this.wallAccent=`#${n.rgb.map((t=>t.toString(16).padStart(2,"0"))).join("")}`.toUpperCase()}catch{}},e.src=t}renderStatusLine(t){const e=Zs(t),i=e.some((t=>"alert"===t.tone)),s=e.some((t=>"climate"===t.type));return B`<i class="statusline ${i?"alert":""}" style="--sl:${i?"var(--alert)":s?"#3a9bff":"var(--accent)"}" aria-hidden="true"></i>`}useDock(t){return this.pro&&"dock"===t.config.settings.nav&&t.allows("dock")&&!t.narrow&&!t.editing}renderPageDock(t){const e=t.config.pages.filter((e=>!e.person||!t.allows("person_pages")));return B`<div
      role="navigation"
      class="pagedock glass"
      @pointermove=${t=>this.dockX=t.clientX}
      @pointerleave=${()=>this.dockX=void 0}
    >
      ${e.map((e=>B`<button
          class="dock-btn ${e.id===this.pageId?"on":""}"
          aria-label=${e.title}
          title=${e.title}
          style="--s:${this.dockScale(e.id)}"
          @click=${()=>this.tabClick(t,e.id)}
        >
          <sn-icon .icon=${e.icon}></sn-icon>
          <span class="tip">${e.title}</span>
        </button>`))}
    </div>`}dockScale(t){if(void 0===this.dockX)return 1;const e=this.renderRoot.querySelector(`.dock-btn[title="${CSS.escape(this.current?.pages.find((e=>e.id===t))?.title??"")}"]`);if(!e)return 1;const i=e.getBoundingClientRect(),s=Math.abs(i.left+i.width/2-this.dockX);return 1+.55*Math.max(0,1-s/150)}syncTilt(t){const e="DeviceOrientationEvent"in window&&"function"!=typeof DeviceOrientationEvent.requestPermission,i=t&&e&&matchMedia("(pointer: coarse)").matches;if(i!==this.tiltOn)if(this.tiltOn=i,i)window.addEventListener("deviceorientation",this.onTilt);else{window.removeEventListener("deviceorientation",this.onTilt),this.tiltBase=void 0;const t=this.renderRoot.querySelector(".app");t?.style.removeProperty("--tilt-x"),t?.style.removeProperty("--tilt-y")}}backdrop(t){const e=t.config.settings;if(this.pro){if(e.music_backdrop&&t.allows("music_backdrop")){const e=Rs(t.config).map((t=>this.hass.states[t])).find((t=>t&&t.entity_id.startsWith("media_player.")&&"playing"===t.state&&t.attributes.entity_picture));if(e)return this.hass.hassUrl(e.attributes.entity_picture)}return e.window_camera&&this.hass.states[e.window_camera]&&t.allows("window_camera")?Ln(this.hass,e.window_camera,Math.floor(this.now.getTime()/15e3)):e.wallpaper&&t.allows("wallpaper")?e.wallpaper:void 0}}connectedCallback(){super.connectedCallback(),this.setKiosk(this.kiosk),window.addEventListener("pointerdown",this.onActivity,{capture:!0,passive:!0}),window.addEventListener("keydown",this.onActivity,{capture:!0}),window.addEventListener("resize",this.onResize),this.mql.addEventListener("change",this.onScheme),this.ticker=window.setInterval((()=>this.tick()),1e4),function(){const t=window.CSS;if(t?.registerProperty)for(const e of["--leak"])try{t.registerProperty({name:e,syntax:"<color>",inherits:!0,initialValue:"transparent"})}catch{}}(),window.addEventListener("keydown",this.onSearchKey),this.addEventListener("sn-light-wave",this.onWave),window.addEventListener("scroll",this.onScroll,{capture:!0,passive:!0})}async undoable(t,e,i){const s=!!t.length&&await this.hass.callService("scene","create",{scene_id:"smartnest_undo",snapshot_entities:t}).then((()=>!0),(()=>!1));try{await i()}catch{return void this.toast(zt(this.uiLang)("error"))}s&&(window.clearTimeout(this.undoTimer),this.undo={label:e,until:Date.now()+6e3},this.undoTimer=window.setTimeout((()=>this.undo=void 0),6e3))}renderMiniPlayer(t){if(!t.allows("mini_player")||t.editing||this.simple||this.kids||this.sheets.length||this.sleeping)return U;const e=function(t){const{hass:e}=t;return Object.values(e.states).find((t=>t.entity_id.startsWith("media_player.")&&"playing"===t.state&&!!t.attributes.media_title&&"fully_kiosk"!==e.entities?.[t.entity_id]?.platform&&!e.entities?.[t.entity_id]?.hidden))}(t);if(!e)return U;const i=t.config.pages.find((t=>t.id===this.pageId));return i?.widgets.some((t=>"media"===t.type&&t.config.entity===e.entity_id))?U:B`<sn-miniplayer .ctx=${t} .player=${e}></sn-miniplayer>`}renderDesign(t){const e=this.design;if(!e||!t.isAdmin||t.editing)return U;const i=()=>{this.design=void 0,this.hass.callWS({type:"smartnest/design/done"}).catch((()=>{}))};return B`<div class="nudge glass" role="status">
      <sn-icon icon="palette" style="--icon-size:22px;color:var(--accent-text)"></sn-icon>
      <span>${t.t("design_arrived",{name:e.name||t.t("design_new")})}</span>
      <button
        class="btn primary pressable"
        @click=${async()=>{if(!confirm(t.t("design_confirm")))return;const{config:s,dropped:n}=function(t,e,i,s){const n=Ge(e,s),a=t=>!!t&&!!i.states[t];let o=0;const r=t.pages.flatMap((t=>t.widgets)).find((t=>"floorplan"===t.type&&t.config.floors?.some((t=>t.image))))?.config.floors,l=t=>{const e=t.config;return"floorplan"===t.type?(e.floors=r??[],!0):e.entity&&!a(e.entity)?(o++,!1):(Array.isArray(e.entities)&&(e.entities=e.entities.filter(a)),e.camera&&!a(e.camera)&&delete e.camera,!0)},c=n.pages.map((t=>({...t,widgets:t.widgets.filter(l),person:t.person&&a(t.person)?t.person:void 0}))),d={...t.settings};for(const p of dh)void 0!==n.settings[p]&&(d[p]=n.settings[p]);return{config:{...t,pages:c,settings:d,names:{...n.names,...t.names}},dropped:o}}(this.config,e.config,this.hass,this.uiLang);try{await Je(this.hass,s),this.config=s,this.pageId=s.pages[0]?.id??"",this.toast(n?t.t("design_applied_dropped",{n:n}):t.t("design_applied")),i()}catch{this.toast(t.t("error"))}}}
      >
        ${t.t("design_apply")}
      </button>
      <button class="icon-btn small pressable" aria-label=${t.t("nudge_later")} @click=${i}><sn-icon icon="close" style="--icon-size:16px"></sn-icon></button>
    </div>`}renderNudge(t){if(!this.pro||!t.allows("nudges")||t.editing||this.kids||this.simple)return U;const e=this.nudge;return!e||ch(e.key)?U:B`<div class="nudge glass" role="status">
      <sn-icon .icon=${e.icon} style="--icon-size:22px;color:var(--accent-text)"></sn-icon>
      <span>${e.text}</span>
      <button class="btn primary pressable" @click=${()=>e.ids.length?t.undoable(e.ids,e.action,e.run):e.run().catch((()=>this.toast(t.t("error"))))}>${e.action}</button>
      <button class="icon-btn small pressable" aria-label=${t.t("nudge_later")} title=${t.t("nudge_later")} @click=${()=>(function(t){try{const e=JSON.parse(localStorage.getItem(lh)??"{}");e[t]=Date.now()+36e5,localStorage.setItem(lh,JSON.stringify(e))}catch{}}(e.key),this.checkNudge())}>
        <sn-icon icon="close" style="--icon-size:16px"></sn-icon>
      </button>
    </div>`}renderQuickScenes(t){const e=(t.config.settings.quick_scenes??[]).filter((t=>this.hass.states[t]));if(!e.length||!t.allows("quick_scenes")||t.editing||this.kids||this.sheets.length||this.sleeping)return U;const{t:i,hass:s,config:n}=t,a=Object.values(s.states).filter((t=>t.entity_id.startsWith("light.")&&"on"===t.state)).map((t=>t.entity_id));return B`<div class="quick glass" role="toolbar">
      ${e.map((e=>B`<button
          class="pressable"
          @click=${()=>{ki("tap");const a=e.startsWith("scene.")?s.states[e]?.attributes.entity_id??[]:[],o=()=>s.callService(e.split(".")[0],"turn_on",{entity_id:e});a.length?t.undoable(a,ie(s,n,e),o):o().catch((()=>this.toast(i("error"))))}}
        >
          <sn-icon .icon=${oe(s.states[e],e)}></sn-icon><span>${ie(s,n,e)}</span>
        </button>`))}
      ${a.length?B`<button class="pressable off" @click=${()=>t.undoable(a,i("all_off"),(()=>s.callService("light","turn_off",{entity_id:a})))}>
            <sn-icon icon="power"></sn-icon><span>${i("all_off")}</span>
          </button>`:U}
    </div>`}renderUndo(){if(!this.undo)return U;const t=zt(this.uiLang);return B`<div class="undo" role="status">
      <span>${this.undo.label}</span>
      <button
        @click=${()=>{this.hass.callService("scene","turn_on",{entity_id:"scene.smartnest_undo"}).catch((()=>this.toast(t("error")))),window.clearTimeout(this.undoTimer),this.undo=void 0}}
      >
        ${t("undo")}
      </button>
      <i style="animation-duration:${Math.max(0,this.undo.until-Date.now())}ms"></i>
    </div>`}watchLink(){const t=this.hass?.connection;t&&t!==this.linkConn&&t.addEventListener&&(this.linkConn?.removeEventListener?.("disconnected",this.onLinkLost),this.linkConn?.removeEventListener?.("ready",this.onLinkReady),t.addEventListener("disconnected",this.onLinkLost),t.addEventListener("ready",this.onLinkReady),this.linkConn=t)}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this.renewTimer),window.clearInterval(this.licTimer),window.removeEventListener("scroll",this.onScroll,{capture:!0}),this.syncTilt(!1),window.clearTimeout(this.scrollRest),document.removeEventListener("visibilitychange",this.recheckLicense),this.stopLight?.(),window.removeEventListener("keydown",this.onSearchKey),window.removeEventListener("pointerdown",this.onActivity,{capture:!0}),window.removeEventListener("keydown",this.onActivity,{capture:!0}),window.removeEventListener("resize",this.onResize),this.mql.removeEventListener("change",this.onScheme),window.clearInterval(this.ticker),this.unsub?.then((t=>t())).catch((()=>{})),this.unsub=void 0,this.unsubMsg?.then((t=>t())).catch((()=>{})),this.unsubMsg=void 0,this.unsubNotes?.then((t=>t())).catch((()=>{})),this.unsubNotes=void 0,this.initStarted=!1}tick(){this.now=new Date;const t=this.config?.settings.screensaver;!t?.enabled||!this.wide||this.draft||this.sheets.length||this.ringingAt||this.sleeping||Date.now()-this.lastActive>6e4*t.timeout_min&&(this.sleeping=!0),this.fullyTick(),this.checkMorning(),this.checkOverload(),this.shiftPixels(),this.hass&&zi(this.lic.plan,"live_timers")&&es(this.hass),this.checkNudge()}checkNudge(){this.nudge=this.pro&&this.current&&this.hass&&zi(this.lic.plan,"nudges")?function(t,e){const{hass:i,t:s,config:n}=t,a=Object.values(i.states).filter((e=>((t,e)=>!t.hass.entities?.[e.entity_id]?.entity_category&&!t.hass.entities?.[e.entity_id]?.hidden)(t,e))),o=t=>ie(i,n,t),r=[],l=a.filter((t=>t.entity_id.startsWith("climate.")&&!["off","unavailable"].includes(t.state))),c=a.filter((t=>t.entity_id.startsWith("binary_sensor.")&&["window","door","opening"].includes(t.attributes.device_class)&&"on"===t.state&&rh(t.last_changed)>=3));for(const f of l){const t=xe(i,f.entity_id),e=c.find((e=>t&&xe(i,e.entity_id)===t));e&&r.push({key:`win-${f.entity_id}`,icon:"window-open",text:s("nudge_window_ac",{win:o(e.entity_id),ac:o(f.entity_id)}),action:s("nudge_ac_off"),ids:[f.entity_id],run:()=>i.callService("climate","turn_off",{entity_id:f.entity_id})})}const d=a.filter((t=>t.entity_id.startsWith("person."))),p=a.filter((t=>t.entity_id.startsWith("light.")&&"on"===t.state)).map((t=>t.entity_id));d.length&&d.every((t=>"home"!==t.state))&&p.length&&d.every((t=>rh(t.last_changed)>=5))&&r.push({key:"away-lights",icon:"home-export-outline",text:s("nudge_away_lights",{n:p.length}),action:s("nudge_lights_off"),ids:p,run:()=>i.callService("light","turn_off",{entity_id:p})});const h=a.filter((t=>t.entity_id.startsWith("binary_sensor.")&&["motion","occupancy","presence"].includes(t.attributes.device_class)));for(const f of p){const t=xe(i,f),e=t?h.filter((e=>xe(i,e.entity_id)===t)):[];if(e.length&&e.every((t=>"off"===t.state&&rh(t.last_changed)>=30))&&rh(i.states[f].last_changed)>=30){r.push({key:`idle-${f}`,icon:"lightbulb-off-outline",text:s("nudge_idle_light",{light:o(f),room:i.areas?.[t]?.name??""}),action:s("nudge_turn_off"),ids:[f],run:()=>i.callService("light","turn_off",{entity_id:f})});break}}const u=a.find((t=>t.entity_id.startsWith("media_player.")&&["playing","on"].includes(t.state)&&"tv"===t.attributes.device_class));u&&d.length&&d.every((t=>"home"!==t.state))&&r.push({key:`tv-${u.entity_id}`,icon:"television-off",text:s("nudge_tv",{tv:o(u.entity_id)}),action:s("nudge_turn_off"),ids:[],run:()=>i.callService("media_player","turn_off",{entity_id:u.entity_id})});const g=a.filter((t=>t.entity_id.startsWith("binary_sensor.")&&["door","garage_door"].includes(t.attributes.device_class)&&"on"===t.state&&rh(t.last_changed)>=15));for(const f of g)r.unshift({key:`door-${f.entity_id}-${f.last_changed}`,icon:"door-open",text:s("nudge_door_open",{door:o(f.entity_id),n:Math.round(rh(f.last_changed))}),action:s("nudge_look"),ids:[],run:async()=>t.openEntity(f.entity_id)});for(const f of a){if(!f.entity_id.startsWith("sensor.")||"temperature"!==f.attributes.device_class)continue;const e=`${f.entity_id} ${f.attributes.friendly_name??""}`,i=/fridge|refrigerator|تلاجة|ثلاجة|براد|מקרר/i.test(e),n=/freezer|فريزر|مجمد|מקפיא/i.test(e),a=Number(f.state);(i&&!n&&a>8||n&&a>-10)&&r.unshift({key:`cold-${f.entity_id}`,icon:"fridge-alert",text:s(n?"nudge_freezer_warm":"nudge_fridge_warm",{name:o(f.entity_id),v:Math.round(a)}),action:s("nudge_look"),ids:[],run:async()=>t.openEntity(f.entity_id)})}const m=(new Date).getHours();if(m>=0&&m<6)for(const f of a.filter((t=>t.entity_id.startsWith("switch.")&&"on"===t.state))){const t=`${f.entity_id} ${f.attributes.friendly_name??""}`;if(!/tv|television|tele|console|playstation|xbox|receiver|soundbar|computer|pc|monitor|تلفزيون|تلفاز|شاشة|بلايستيشن|كمبيوتر|טלוויזיה/i.test(t))continue;const e=i.entities?.[f.entity_id]?.device_id,n=e?a.find((t=>t.entity_id.startsWith("sensor.")&&"power"===t.attributes.device_class&&i.entities?.[t.entity_id]?.device_id===e)):void 0,l=Number(n?.state);n&&l>3&&l<40&&r.push({key:`vampire-${f.entity_id}`,icon:"power-plug-off",text:s("nudge_standby",{name:o(f.entity_id),w:Math.round(l)}),action:s("nudge_turn_off"),ids:[f.entity_id],run:()=>i.callService("switch","turn_off",{entity_id:f.entity_id})})}return r.find((t=>!e(t.key)))}(this.makeCtx(),ch):void 0}measureSmoothness(){if(this.lite||null!==Cu()||document.hidden||Au)return;try{const t=Number(localStorage.getItem("smartnest-fps-at")??0);if(Date.now()-t<6048e5)return;localStorage.setItem("smartnest-fps-at",String(Date.now()))}catch{return}let t=0;const e=performance.now(),i=s=>{if(document.hidden)return;if(t++,s-e<3e3)return void requestAnimationFrame(i);if(1e3*t/(s-e)<45){try{localStorage.setItem("smartnest-slow","1")}catch{}this.lite=Hu(),this.toast(zt(this.uiLang)("fast_auto_on"))}};requestAnimationFrame(i)}shiftPixels(){const t=this.config?.settings,e=this.kiosk||zi(this.lic.plan,"fully")&&!!this.hass&&!!cu(this.hass),i=this.renderRoot.querySelector(".app");if(!i)return;if(!t?.burn_in||!e||!zi(this.lic.plan,"burn_in"))return void i.style.removeProperty("translate");if(++this.burnStep%12)return;const s=[[0,0],[2,1],[1,3],[-1,2],[-2,0],[-1,-2],[1,-2],[2,-1]],[n,a]=s[this.burnStep/12%s.length];i.style.transition="translate 2s ease",i.style.translate=`${n}px ${a}px`}checkOverload(){const t=this.config?.settings,e=t?.power_limit&&t.power_entity?this.hass.states[t.power_entity]:void 0,i=Number(e?.state),s="kW"===e?.attributes.unit_of_measurement?1e3*i:i;if(!e||Number.isNaN(s)||s<=t.power_limit)return this.overSince=0,void(this.overload=void 0);this.overSince||(this.overSince=Date.now()),Date.now()-this.overSince>=2e4&&Date.now()>this.overSnooze&&this.makeCtx().allows("overload")&&(this.overload=s,this.sleeping=!1)}checkMorning(){if(this.morning||this.sleeping||this.ringingAt||!this.config||!this.hass)return;if(Date.now()-this.lastActive>15e3)return;const t=this.makeCtx();t.allows("morning")&&function(t,e){const i=t.config.settings;if(!i.morning||t.editing||t.narrow)return!1;const[s,n]=i.dark_to.split(":").map(Number);if(60*e.getHours()+e.getMinutes()<60*s+n||e.getHours()>=12)return!1;try{return localStorage.getItem(tp)!==ep()}catch{return!1}}(t,new Date)&&(!function(){try{localStorage.setItem(tp,ep())}catch{}}(),this.morning=!0)}fullyTick(){const t=this.config?.settings,e=this.hass&&t&&zi(this.lic.plan,"fully")?cu(this.hass):void 0;if(!e||!t)return;const i=t.fully,s=()=>{};(async function(t,e,i){e.motion&&"on"===t.states[e.motion]?.state!==i&&await t.callService("switch",i?"turn_on":"turn_off",{entity_id:e.motion})})(this.hass,e,i.motion_wake).catch(s);const n=i.night_dim&&wu(this.now,t.dark_from,t.dark_to);n===this.nightApplied||this.ringingAt||(this.nightApplied=n,du(this.hass,e,n?i.night_brightness:100).catch(s)),n&&i.night_off_min>0&&!this.screenOffSent&&!this.ringingAt&&Date.now()-this.lastActive>6e4*i.night_off_min&&(this.screenOffSent=!0,pu(this.hass,e,!1).catch(s))}watchScreen(){const t=cu(this.hass),e=t?.screen?this.hass.states[t.screen]?.state:void 0;"on"===e&&"off"===this.screenSeen&&this.onActivity(),this.screenSeen=e}get assetBase(){return this.panel?.config?.asset_base??"/smartnest_static/static/"}async init(){if(this.initStarted=!0,!document.getElementById("smartnest-fonts")){const t=document.createElement("style");t.id="smartnest-fonts",t.textContent=mi(this.assetBase),document.head.appendChild(t)}const t=$u(this.hass.language),e=function(){try{const t=JSON.parse(localStorage.getItem(_u)??"null");return t?.config?.pages?t:void 0}catch{return}}();e&&!this.config&&(this.config=Ge(e.config,t),this.lic=e.lic,this.pageId=this.config.settings.default_page||this.config.pages[0]?.id||"");try{const e=await async function(t){return(await t.callWS({type:"smartnest/config/get"})).config}(this.hass);e?this.config=Ge(e,t):(this.config=function(t,e,i){const s={version:1,settings:Ne(i),names:{},pages:[]},n=Object.keys(t.states).some((t=>"camera"===ee(t)))?["home","rooms","power","security","doorbell"]:["home","rooms","power","climate"];return s.pages=n.map((i=>Ke(i,t,s,e))),s.settings.default_page=s.pages[0].id,s}(this.hass,zt(t),t),this.config.settings.setup_done=!1,this.hass.user?.is_admin&&Je(this.hass,this.config).catch((()=>{})));let n="";try{n=localStorage.getItem("smartnest-home-page")??""}catch{}this.pageId=(n&&this.config.pages.some((t=>t.id===n))?n:"")||this.config.settings.default_page||this.config.pages[0]?.id||"",this.config.settings.setup_done||!this.hass.user?.is_admin||Au?this.hass.user?.is_admin||(()=>{try{return"1"===localStorage.getItem(_p)}catch{return!0}})()||Au||window.setTimeout((()=>this.touring=!0),1500):window.setTimeout((()=>this.openWizard()),300),this.unsubMsg=this.hass.connection.subscribeMessage((t=>{if(this.message=t.message??void 0,t.message){this.sleeping=!1,this.onActivity();const t=zi(this.lic.plan,"fully")?cu(this.hass):void 0;t&&pu(this.hass,t,!0).catch((()=>{}))}}),{type:"smartnest/message/subscribe"}),this.hass.user?.is_admin&&this.hass.callWS({type:"smartnest/design/pending"}).then((t=>this.design=t??void 0),(()=>{})),window.setTimeout((()=>this.measureSmoothness()),5e3),this.unsubNotes??=function(t,e){const i=new Map;return t.connection.subscribeMessage((t=>{"current"===t.type&&i.clear();for(const[e,s]of Object.entries(t.notifications??{}))"removed"===t.type?i.delete(e):i.set(e,s);e([...i.values()].sort(((t,e)=>e.created_at.localeCompare(t.created_at))))}),{type:"persistent_notification/subscribe"})}(this.hass,(t=>this.notes=t)).catch((()=>()=>{})),this.unsub=(i=this.hass,s=e=>{!this.draft&&e&&(this.config=Ge(e,t))},i.connection.subscribeMessage((t=>s(t.config)),{type:"smartnest/config/subscribe"})),this.hass.callWS({type:"smartnest/license/status"}).then((t=>this.applyLicense(t)),(()=>{})),this.watchLicense()}catch(n){if("not_licensed"===n?.code){yu(),this.config=void 0;const t=await this.hass.callWS({type:"smartnest/license/status"});return this.license={instance_id:t.instance_id,expired:t.expired,revoked:t.revoked},void this.waitForRenewal()}this.loadError=String(n?.message??n)}var i,s}watchArrivals(){const t={};for(const n of Object.values(this.hass.states))n.entity_id.startsWith("person.")&&(t[n.entity_id]=n.state);const e=this.peopleSeen;this.peopleSeen=t;const i=this.current?.settings;if(!(e&&this.pro&&i?.welcome&&zi(this.lic.plan,"welcome")))return;const s=Object.keys(t).find((i=>"home"===t[i]&&e[i]&&"home"!==e[i]));s&&(this.welcomer=this.hass.states[s],this.sleeping=!1)}willUpdate(t){t.has("hass")&&this.hass&&!this.initStarted&&this.init(),t.has("hass")&&this.watchLink(),t.has("hass")&&(this.watchDoorbell(),this.watchScreen(),this.watchArrivals()),t.has("config")&&this.kiosk&&this.config&&!this.config.settings.kiosk.pin_hash&&this.setKiosk(!1)}get panelPath(){return this.route?.prefix??location.pathname}setKiosk(t){this.kiosk=t,function(t){try{t?localStorage.setItem(eu,"1"):localStorage.removeItem(eu)}catch{}}(t),au(t),function(t,e){if(!t)return ou?.(),void(ou=void 0);if(ou)return;const i=()=>{iu()&&!location.pathname.startsWith(e)&&(history.replaceState(null,"",e),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!0}})))};window.addEventListener("popstate",i),window.addEventListener("location-changed",i),ou=()=>{window.removeEventListener("popstate",i),window.removeEventListener("location-changed",i)}}(t,this.panelPath)}setKids(t){this.kids=t;try{t?localStorage.setItem("smartnest-kids","1"):localStorage.removeItem("smartnest-kids")}catch{}t&&this.config?.settings.kids_page&&(this.pageId=this.config.settings.kids_page)}pinThen(t){const e=zt(this.uiLang),i=this.config?.settings.kiosk;if(!i?.pin_hash||!i.pin_salt)return t();this.pushSheet({title:e("kiosk_unlock"),render:e=>B`<sn-pinpad
        .length=${i.pin_length??4}
        prompt=${e.t("enter_pin")}
        error=${e.t("wrong_pin")}
        .onSubmit=${s=>su(s,i.pin_salt)===i.pin_hash&&(e.closeSheet(),t(),!0)}
      ></sn-pinpad>`})}unlockSheet(){const t=zt(this.uiLang),e=this.config?.settings.kiosk;if(!e?.pin_hash||!e.pin_salt)return this.setKiosk(!1);this.pushSheet({title:t("kiosk_unlock"),render:t=>B`<sn-pinpad
        .length=${e.pin_length??4}
        prompt=${t.t("enter_pin")}
        error=${t.t("wrong_pin")}
        .onSubmit=${i=>su(i,e.pin_salt)===e.pin_hash&&(this.setKiosk(!1),t.closeSheet(),!0)}
      ></sn-pinpad>`})}watchDoorbell(){const t=this.config?.settings.doorbell.trigger_entity,e=t?this.hass.states[t]:void 0;if(!e)return void(this.bellSeen=void 0);const i=t.startsWith("event.")?e.state:`${e.state}|${e.last_changed}`,s=this.bellSeen;this.bellSeen=i,void 0!==s&&s!==i&&(t.startsWith("event.")?"unavailable"!==e.state&&"unknown"!==e.state:"on"===e.state)&&this.ring()}ring(){this.sleeping=!1,this.onActivity(),this.silentBell=!1;const t=cu(this.hass);if(t){const e=()=>{};pu(this.hass,t,!0).catch(e),du(this.hass,t,100).catch(e),this.nightApplied=void 0,t.media&&(this.silentBell=!0,async function(t,e,i){return!!e.media&&(await t.callService("media_player","play_media",{entity_id:e.media,media_content_id:i,media_content_type:"music"}),!0)}(this.hass,t,this.hass.hassUrl(`${this.assetBase}sounds/chime.wav`)).catch((()=>this.silentBell=!1)))}this.ringingAt=new Date;const e=this.ringingAt;window.setTimeout((()=>this.ringingAt===e&&(this.ringingAt=void 0)),9e4)}startEdit(){this.draft=structuredClone(this.config)}cancelEdit(){const t=zt(this.uiLang);(JSON.stringify(this.draft)===JSON.stringify(this.config)||confirm(t("discard_changes")))&&(this.draft=void 0,this.sheets=[],this.config.pages.some((t=>t.id===this.pageId))||(this.pageId=this.config.pages[0]?.id??""))}async save(){const t=zt(this.uiLang);this.saving=!0;try{await Je(this.hass,this.draft),this.config=this.draft,this.draft=void 0,this.sheets=[],this.toast(t("saved"))}catch{this.toast(t("save_failed"))}finally{this.saving=!1}}toast(t){this.toastMsg=t,window.clearTimeout(this.toastTimer),this.toastTimer=window.setTimeout((()=>this.toastMsg=""),3200)}get current(){const t=this.draft??this.config,e=this.hass?.user;if(!t||!e||e.is_admin||!t.pages.some((t=>t.users?.length)))return t;const i=this.forUser;if(i&&i.src===t&&i.user===e.id)return i.out;const s={...t,pages:t.pages.filter((t=>!t.users?.length||t.users.includes(e.id)))};return this.forUser={src:t,user:e.id,out:s},s}get uiLang(){return this.current?.settings.language??$u(this.hass?.language)}get dark(){const t=this.current?.settings;return t?"dark"===t.theme||"midnight"===t.theme||"light"!==t.theme&&("auto"===t.theme?this.systemDark:wu(this.now,t.dark_from,t.dark_to)):this.systemDark}makeCtx(){const t=this.uiLang;return{hass:this.hass,fullHass:this._hass,config:this.current,lang:t,rtl:St(t),t:zt(t),dark:this.dark,narrow:!this.wide,isAdmin:!!this.hass.user?.is_admin,editing:!!this.draft,assetBase:this.assetBase,plan:this.lic.plan,allows:t=>zi(this.lic.plan,t),update:t=>{if(!this.draft)return;const e=structuredClone(this.draft);t(e),this.draft=e},openEntity:(t,e)=>this.pushSheet({origin:e,title:this.current.names[t]||this.hass.states[t]?.attributes.friendly_name||t,render:e=>B`<sn-entity-detail .ctx=${e} .entityId=${t}></sn-entity-detail>`}),showSheet:t=>this.pushSheet(t),closeSheet:()=>this.sheets=this.sheets.slice(0,-1),toast:t=>this.toast(t),undoable:(t,e,i)=>this.undoable(t,e,i),cinematic:t=>{if(this.sleeping=!1,zi(this.lic.plan,"cinematic")&&(this.scene=t),"cinema"===t){const t=zi(this.lic.plan,"fully")?cu(this.hass):void 0;t&&du(this.hass,t,8).catch((()=>{})),this.nightApplied=void 0}}}}goToPage(t){if(this.kids)return;const e=this.current?.pages??[],i=e.findIndex((t=>t.id===this.pageId)),s=e.findIndex((e=>e.id===t));s<0||t===this.pageId||(this.enterDir=Math.sign(s-i),this.pageId=t)}neighbour(t){if(this.kids)return;const e=this.current?.pages??[],i=e.findIndex((t=>t.id===this.pageId)),s=St(this.uiLang)?t>0:t<0;return e[i+(s?1:-1)]?.id}pushSheet(t){this.sheets=[...this.sheets,t]}playThemeFlip(t){if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;const e=document.createElement("div");e.style.cssText="position:fixed;inset:0;z-index:95;pointer-events:none;background:"+(t?"radial-gradient(120% 90% at 50% 0%, rgba(150,90,170,.55), rgba(21,26,30,.85))":"radial-gradient(120% 90% at 50% 100%, rgba(255,190,110,.6), rgba(250,247,242,.85))"),this.renderRoot.appendChild(e),e.animate([{opacity:0},{opacity:1,offset:.35},{opacity:0}],{duration:1600,easing:"cubic-bezier(0.77, 0, 0.175, 1)"}).finished.finally((()=>e.remove()))}alivePages(t,e){const i=t.editing?0:this.lite?1:2,s=this.recent[this.recent.length-1];s!==e&&(s&&this.parked.set(s,this.lastCtx??t),this.recent=[...this.recent.filter((t=>t!==e)),e]),this.lastCtx=t,this.recent=this.recent.slice(-(i+1)).filter((e=>t.config.pages.some((t=>t.id===e))));for(const n of[...this.parked.keys()])this.recent.includes(n)&&n!==e||this.parked.delete(n);return this.recent.map((e=>t.config.pages.find((t=>t.id===e))))}updated(){if(this.config&&this.config!==this.cachedRef&&!this.license&&this.initStarted){this.cachedRef=this.config;const t={config:this.config,lic:this.lic};window.setTimeout((()=>{try{localStorage.setItem(_u,JSON.stringify(t))}catch{}}),1e3)}const t=this.dark;if(void 0!==this.lastDark&&t!==this.lastDark&&this.current&&this.playThemeFlip(t),this.lastDark=t,this.enterDir){const t=this.renderRoot.querySelector("main.current"),e=matchMedia("(prefers-reduced-motion: reduce)").matches,i=(St(this.uiLang)?-1:1)*this.enterDir*48,s=e||"off"===this.current?.settings.motion,n=this.pro&&"light"!==this.current?.settings.motion&&zi(this.lic.plan,"cinematic_pages");t?.animate(n&&!s?[{transform:`translateX(${.6*i}px) scale(0.94)`,opacity:0},{transform:`translateX(${.1*i}px) scale(1.01)`,opacity:1,offset:.7},{transform:"none",opacity:1}]:[{transform:s?"none":`translateX(${i}px)`,opacity:0},{transform:"none",opacity:1}],{duration:s?160:n?460:260,easing:"cubic-bezier(0.22, 1, 0.36, 1)"}),this.enterDir=0}this.kiosk&&au(!0);const e=this.current?.settings,i="pro"===e?.style&&zi(this.lic.plan,"style_pro");this.pro=i;const s=i&&this.current&&this.hass?this.backdrop(this.makeCtx()):void 0,n=!!s;n&&e.accent_from_wallpaper&&s!==this.wallSrc&&!s.includes("camera_proxy")&&this.pickWallAccent(s);const a=this.hass?.states["sun.sun"],o=e?.accent_day&&zi(this.lic.plan,"accent_day")?function(t,e,i){if(void 0!==e)return e<-4?"#8b7cf6":e<8?i?"#f2b43c":"#f07a5a":e<20?i?"#e9971d":"#ee8a3c":"#1fa99b";const s=t.getHours()+t.getMinutes()/60;return s<5.5||s>=20.5?"#8b7cf6":s<8?"#f2b43c":s<17?"#1fa99b":"#f07a5a"}(new Date,Number(a?.attributes.elevation??NaN)||void 0,!!a?.attributes.rising):void 0,r=gi(this.dark,n&&e.accent_from_wallpaper&&this.wallAccent?this.wallAccent:o??e?.accent??"");r["--font"]=function(t){const e=ph[t??"rubik"]??ph.rubik;if(e.css&&!document.getElementById(`sn-font-${t}`)){const i=document.createElement("link");i.id=`sn-font-${t}`,i.rel="stylesheet",i.href=`https://fonts.googleapis.com/css2?family=${e.css}&display=swap`,document.head.appendChild(i)}return("Rubik"===e.family?"":`"${e.family}", `)+'"Rubik", system-ui, -apple-system, "Segoe UI", Tahoma, sans-serif'}(zi(this.lic.plan,"fonts")?e?.font:"rubik"),"line"===e?.icons&&zi(this.lic.plan,"icon_styles")?Object.assign(r,{"--fill-on":"none","--line-on":"inline"}):Object.assign(r,{"--fill-on":"inline","--line-on":"none"}),r["--active-glow"]=i&&e?.active_glow&&!this.lite&&zi(this.lic.plan,"active_glow")?"block":"none";const l=!!e&&i&&("midnight"===e.theme||e.night_midnight&&this.dark&&"schedule"===e.theme);l&&Object.assign(r,{"--bg":"#000000","--surface":"rgba(16,14,12,.78)","--surface-solid":"#0d0c0b","--surface-2":"#171512","--surface-hover":"rgba(30,26,22,.9)","--text":"#f6e7cf","--text-2":"#8f7f69","--border":"rgba(246,231,207,.07)","--accent-text":"#f0b45c","color-scheme":"dark"}),Object.assign(r,function(t,e,i,s,n,a){if(!t)return{"--sheen":"none","--grain":"none","--material":"none","--leak-opacity":"0","--duo-on":"none","--mono-on":"block","--idle-opacity":"1","--card-radius":"var(--r-lg)","--font-display":"var(--font)","--on-glow":"0%","--display-weight":"700","--display-track":"0"};const o=n??a;return{"--sheen":`radial-gradient(520px circle at var(--lx, 30%) var(--ly, 0%), rgba(255,255,255,${e?.09:.32}), transparent 46%)`,"--grain":vp,"--grain-opacity":e?"0.07":"0.05","--material":wp(s,e),"--leak":o,"--leak-opacity":i?"0.22":e?"0.32":"0.4","--bg-glow":`color-mix(in srgb, ${o} ${e?18:22}%, transparent)`,"--glass-edge":e?"inset 0 1px 0 rgba(255,255,255,.12), inset 0 -18px 30px -24px rgba(0,0,0,.45)":"inset 0 1px 0 rgba(255,255,255,.95), inset 0 -16px 28px -22px rgba(30,37,43,.10)","--shadow":e?"0 1px 0 rgba(255,255,255,.04) inset, 0 2px 6px rgba(0,0,0,.35), 0 22px 50px -12px rgba(0,0,0,.6)":"0 1px 2px rgba(30,37,43,.06), 0 4px 10px rgba(30,37,43,.05), 0 24px 48px -16px rgba(30,37,43,.18)","--duo-on":"block","--mono-on":"none","--idle-opacity":i?"0.42":"1","--card-radius":"28px","--font-display":'"Rubik", var(--font)',"--on-glow":i?"75%":"55%","--display-weight":"800","--display-track":"-0.03em"}}(i,this.dark,l,e?.material??"none",i&&this.hass&&this.current?function(t,e){const i=t.states["input_select.house_mode"]?.state;if("evening"===i||"sleep"===i||"away"===i)return $p[i];let s=0,n=0,a=0,o=0;for(const r of Rs(e)){const e=t.states[r];if(!e||!r.startsWith("light.")||"on"!==e.state)continue;const i="number"==typeof e.attributes.brightness?e.attributes.brightness/255:.8,[l,c,d]=Array.isArray(e.attributes.rgb_color)?e.attributes.rgb_color:[255,190,120];s+=l*i,n+=c*i,a+=d*i,o+=i}return o?`rgb(${Math.round(s/o)}, ${Math.round(n/o)}, ${Math.round(a/o)})`:void 0}(this.hass,this.current):void 0,r["--accent"])),this.pro=i,ji(!!e?.sounds&&zi(this.lic.plan,"ui_sounds"));const c=zi(this.lic.plan,"motion_levels")?e?.motion??"full":"full";Xi="off"===c,r["--loops"]="full"===c?"running":"paused",!i||"full"!==c||this.lite||this.stopLight||(this.stopLight=function(t){let e=0;const i=(i,s)=>{cancelAnimationFrame(e),e=requestAnimationFrame((()=>{t.style.setProperty("--lx",`${i}px`),t.style.setProperty("--ly",`${s}px`)}))},s=t=>i(t.clientX,t.clientY),n=t=>{null!=t.beta&&null!=t.gamma&&i(innerWidth*(.5+Math.max(-30,Math.min(30,t.gamma))/60),innerHeight*(.2+Math.max(-30,Math.min(30,t.beta-45))/90))};return window.addEventListener("pointermove",s,{passive:!0}),window.addEventListener("deviceorientation",n),()=>{window.removeEventListener("pointermove",s),window.removeEventListener("deviceorientation",n),cancelAnimationFrame(e)}}(this)),i&&"full"===c||!this.stopLight||(this.stopLight(),this.stopLight=void 0),r["--breathe"]=i&&"full"===c&&zi(this.lic.plan,"breathing")?"block":"none",this.syncTilt(i&&"full"===c&&!this.lite&&zi(this.lic.plan,"tilt")),this.lite&&(Object.assign(r,{"--glass-filter":"none","--surface":r["--surface-solid"]??(this.dark?"#2A333B":"#FFFFFF"),"--sheen":"none","--grain":"none","--material":"none","--leak-opacity":"0","--loops":"paused","--breathe":"none"}),this.stopLight&&(this.stopLight(),this.stopLight=void 0));const d=this.current?.pages.find((t=>t.id===this.pageId)),p=i&&e?.page_moods&&zi(this.lic.plan,"page_moods")&&d?ku[d.icon]:void 0;p&&Object.assign(r,{"--leak":p,"--bg-glow":`color-mix(in srgb, ${p} ${this.dark?20:24}%, transparent)`}),e?.contrast&&zi(this.lic.plan,"high_contrast")&&Object.assign(r,{"--text-2":this.dark?"#e3e6ea":"#2a333b","--border":this.dark?"rgba(255,255,255,.28)":"rgba(30,37,43,.32)","--surface":this.dark?"rgba(30,36,42,.94)":"rgba(255,255,255,.96)"});const h="liquid"===this.current?.settings.glass&&zi(this.lic.plan,"liquid_glass");Object.assign(r,{"--glass-blur":h?"40px":"24px","--glass-sat":h?"230%":"170%","--glass-edge":i&&!h?r["--glass-edge"]:h?this.dark?"inset 0 1px 0 rgba(255,255,255,.18), inset 0 0 0 1px rgba(255,255,255,.07)":"inset 0 1px 0 rgba(255,255,255,.9), inset 0 -1px 0 rgba(255,255,255,.35), inset 0 0 0 1px rgba(255,255,255,.45)":"0 0 #0000",...h?{"--surface":this.dark?"rgba(42,51,59,.46)":"rgba(255,255,255,.48)"}:{}});for(const[u,g]of Object.entries(r))this.style.setProperty(u,g);this.setAttribute("dir",St(this.uiLang)?"rtl":"ltr"),this.setAttribute("lang",this.uiLang)}renderBar(t){const{t:e}=t,i=t.config,s=i.settings.home_name||this.hass.config?.location_name||"SmartNest";return B`<header class="glass">
      ${this.narrow&&!this.kiosk?B`<button
            class="icon-btn pressable"
            aria-label="menu"
            @click=${()=>this.dispatchEvent(new Event("hass-toggle-menu",{bubbles:!0,composed:!0}))}
          >
            <sn-icon icon="grid"></sn-icon>
          </button>`:U}
      ${!t.allows("island")||t.editing||this.kids?U:B`<sn-island .ctx=${t}></sn-island>`}
      <div class="home">
        ${this.pro&&i.settings.monogram&&t.allows("monogram")?B`<span role="button" tabindex="0" style="cursor:pointer;display:inline-flex" @click=${()=>this.aboutSheet()}>${function(t,e=40){const i=t.replace(/^(آل|ال|عائلة|عيلة|بيت|the|family)\s+/i,"").trim().split(/\s+/).slice(0,2).map((t=>t.replace(/^ال/,"").slice(0,1))).join("");return B`<svg viewBox="0 0 48 48" width=${e} height=${e} aria-label=${t} role="img">
    ${Z`<defs><linearGradient id="mono-gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6d27a"></stop><stop offset=".55" stop-color="#e9971d"></stop><stop offset="1" stop-color="#9b5c0b"></stop></linearGradient></defs>
    <circle cx="24" cy="24" r="22.5" fill="none" stroke="url(#mono-gold)" stroke-width="1.6"></circle>
    <circle cx="24" cy="24" r="19" fill="none" stroke="url(#mono-gold)" stroke-width=".7" stroke-dasharray="1.2 1.6"></circle>
    <circle cx="24" cy="24" r="16.5" fill="color-mix(in srgb, #e9971d 12%, transparent)"></circle>
    <text x="24" y="25" text-anchor="middle" dominant-baseline="middle" font-family="Rubik, sans-serif" font-weight="800" font-size=${i.length>1?14:18} fill="url(#mono-gold)">${i}</text>`}
  </svg>`}(i.settings.monogram,40)}</span>`:B`<img
              src=${t.allows("white_label")&&i.settings.installer.brand?.logo||`${this.assetBase}logo/smartnest-symbol-${t.dark?"white":"color"}.svg`}
              alt=${t.allows("white_label")&&i.settings.installer.brand?.name||"SmartNest"}
              role="button"
              tabindex="0"
              style="cursor:pointer;object-fit:contain"
              @click=${()=>this.aboutSheet()}
            />`}
        <span>${s}</span>
        ${this.pro&&t.allows("sun_arc")&&!t.narrow?B`<sn-sunarc .hass=${this.hass} lang=${t.lang}></sn-sunarc>`:U}
      </div>
      ${t.narrow||this.kids||this.useDock(t)?U:B`<nav>
            <div class="seg" role="tablist">
              ${i.pages.filter((e=>!e.person||!t.allows("person_pages")||t.editing||e.id===this.pageId)).map((e=>B`<button role="tab" aria-pressed=${e.id===this.pageId} aria-selected=${e.id===this.pageId} @click=${()=>this.tabClick(t,e.id)}>
                  <sn-icon .icon=${e.icon} style="--icon-size:18px"></sn-icon>${e.title}
                </button>`))}
            </div>
          </nav>`}
      <div class="actions">
        ${this.kids||t.editing||!t.allows("person_pages")?U:i.pages.filter((t=>t.person&&this.hass.states[t.person])).map((e=>{const i=this.hass.states[e.person],s=i.attributes.entity_picture;return B`<button
                  class="avatar pressable ${e.id===this.pageId?"on":""}"
                  aria-label=${e.title}
                  title=${e.title}
                  style=${s?`background-image:url('${this.hass.hassUrl(s)}')`:""}
                  @click=${()=>this.tabClick(t,e.id)}
                >
                  ${s?"":(i.attributes.friendly_name??"?").slice(0,1)}
                </button>`}))}
        ${this.kids?B`<button class="icon-btn primary pressable" aria-label=${e("kids_mode")} title=${e("kids_mode")} @click=${()=>this.pinThen((()=>this.setKids(!1)))}>
              <sn-icon icon="child" style="--icon-size:22px"></sn-icon>
            </button>`:t.allows("kids")&&!t.editing&&t.config.settings.kids_page&&t.config.pages.some((e=>e.id===t.config.settings.kids_page))?B`<button class="icon-btn pressable" aria-label=${e("kids_mode")} title=${e("kids_mode")} @click=${()=>this.setKids(!0)}>
              <sn-icon icon="child" style="--icon-size:22px"></sn-icon>
            </button>`:U}
        ${!this.kids&&t.allows("guests")&&!t.editing&&t.config.settings.guests.ssid?B`<button
              class="icon-btn pressable ${this.guests?"primary":""}"
              aria-label=${e("guests_mode")}
              title=${e("guests_mode")}
              @click=${()=>{this.guests=!this.guests,function(t){try{t?localStorage.setItem(zd,"1"):localStorage.removeItem(zd)}catch{}}(this.guests)}}
            >
              <sn-icon icon="guests" style="--icon-size:20px"></sn-icon>
            </button>`:U}
        ${!this.kids&&t.allows("travel")&&!t.editing&&this.hass.states[Zh]?B`<button
              class="icon-btn pressable ${"on"===this.hass.states[Zh].state?"primary":""}"
              aria-label=${e("travel")}
              title=${e("travel")}
              @click=${()=>qh(t)}
            >
              <sn-icon icon="airplane" style="--icon-size:20px"></sn-icon>
            </button>`:U}
        ${this.kids||!t.allows("notif_center")||t.editing?U:B`<button
              class="icon-btn pressable bell ${this.notes.length?"":"quiet"}"
              aria-label=${e("notifications")}
              title=${e("notifications")}
              @click=${()=>t.showSheet({title:e("notifications"),render:t=>B`<sn-notifs .ctx=${t} .notes=${this.notes}></sn-notifs>`})}
            >
              <sn-icon icon="bell" style="--icon-size:20px"></sn-icon>
              ${this.notes.length?B`<b class="badge">${this.notes.length}</b>`:U}
            </button>`}
        ${this.kids||!t.allows("search")||t.editing?U:B`<button class="icon-btn pressable" aria-label=${e("search")} title="${e("search")} (⌘K)" @click=${()=>this.searching=!0}>
              <sn-icon icon="magnify" style="--icon-size:20px"></sn-icon>
            </button>`}
        ${this.kids||!t.allows("assistant")||t.editing?U:B`<button
              class="icon-btn pressable"
              aria-label=${e("assistant")}
              title=${e("assistant")}
              @click=${()=>this.pushSheet({title:e("assistant"),render:t=>B`<sn-assistant .ctx=${t}></sn-assistant>`})}
            >
              <sn-icon icon="assistant" style="--icon-size:20px"></sn-icon>
            </button>`}
        ${!this.kids&&t.allows("camera_wall")&&!t.editing&&Qh(t).length?B`<button class="icon-btn pressable" aria-label=${e("camera_wall")} title=${e("camera_wall")} @click=${()=>this.camwall=!0}>
              <sn-icon icon="cctv" style="--icon-size:20px"></sn-icon>
            </button>`:U}
        ${this.kids?U:this.kiosk?B`<button class="icon-btn primary pressable" aria-label=${e("kiosk_unlock")} title=${e("kiosk_unlock")} @click=${()=>this.unlockSheet()}>
              <sn-icon icon="lock" style="--icon-size:20px"></sn-icon>
            </button>`:!t.editing&&t.config.settings.kiosk.pin_hash?B`<button class="icon-btn pressable" aria-label=${e("kiosk_lock")} title=${e("kiosk_lock")} @click=${()=>this.setKiosk(!0)}>
              <sn-icon icon="lock-open" style="--icon-size:20px"></sn-icon>
            </button>`:U}
        ${this.kiosk||this.kids?U:t.editing?B`<button class="btn pressable" @click=${()=>this.cancelEdit()}>${e("cancel")}</button>
              <button class="btn primary pressable" ?disabled=${this.saving} @click=${()=>this.save()}>
                ${this.saving?e("saving"):e("save")}
              </button>`:t.isAdmin?B`<button class="icon-btn pressable" aria-label=${e("edit")} title=${e("edit")} @click=${()=>this.startEdit()}>
              <sn-icon icon="pencil" style="--icon-size:20px"></sn-icon>
            </button>`:U}
      </div>
      ${t.editing?this.renderDock(t):this.kids?U:this.renderChips(t)}
      ${this.pro&&t.allows("status_line")?this.renderStatusLine(t):U}
      ${!t.config.settings.occasions||!t.allows("occasions")||t.editing||this.lite||this.simple?U:this.renderOccasion()}
      ${this.renderExpiry(t)}
    </header>`}renderExpiry(t){const e=this.lic.expires;if(!e||!t.isAdmin)return U;const i=Math.ceil((1e3*e-Date.now())/864e5);return i>14||i<0?U:B`<div style="order:6;flex-basis:100%;font-size:13px;padding:8px 12px;border-radius:12px;background:color-mix(in srgb,var(--accent) 16%,transparent);color:var(--accent-text)">
      ${t.t("expires_soon",{n:i})}
    </div>`}openWizard(){const t=zt(this.uiLang);this.pushSheet({title:t("wizard_title"),render:e=>B`<sn-wizard
        .ctx=${e}
        .onDone=${i=>{this.config=i,this.pageId=i.settings.default_page,Je(this.hass,i).catch((()=>this.toast(t("save_failed")))),e.closeSheet()}}
      ></sn-wizard>`})}tourSteps(){const t=this.renderRoot,e=e=>t.querySelector("sn-page-grid")?.shadowRoot?.querySelector(e);return[{target:()=>t.querySelector("nav"),text:"tour_tabs"},{target:()=>t.querySelector(".chips"),text:"tour_chips"},{target:()=>e("sn-w-floorplan"),text:"tour_plan"},{target:()=>e("sn-w-modes"),text:"tour_modes"},{target:()=>e("sn-w-tile"),text:"tour_tile"},{target:()=>t.querySelector('header button[aria-label="'+this.makeCtx().t("assistant")+'"]'),text:"tour_assistant"},{target:()=>t.querySelector(".home img"),text:"tour_logo"}]}aboutSheet(){const t=zt(this.uiLang);this.pushSheet({title:t("about"),render:t=>{let e="";try{e=localStorage.getItem("smartnest-home-page")??""}catch{}return B`<div style="display:grid;gap:18px">
          <div style="display:flex;align-items:center;gap:14px">
            <img src="${t.assetBase}logo/smartnest-symbol-${t.dark?"white":"color"}.svg" alt="SmartNest" style="width:52px;height:52px" />
            <div style="display:grid;gap:2px">
              <strong>SmartNest</strong>
              <span class="muted" style="font-size:13px">${t.t("tagline")}</span>
              <span class="muted ltr" style="font-size:12px">${t.t("version")} ${vu}${this.lic.licensee?` · ${this.lic.licensee}`:""}</span>
            </div>
          </div>
          ${i=t,i.config.settings.installer.phone&&i.allows("support")?B`<button class="btn primary pressable" @click=${()=>function(t,e){const i=(t.config.settings.installer.phone??"").replace(/[^\d]/g,"");t.showSheet({title:t.t("support_title"),render:t=>B`<form
      style="display:grid;gap:12px"
      @submit=${s=>{s.preventDefault();const n=[s.currentTarget.elements.namedItem("msg").value.trim()||t.t("support_default"),"",...Vh(t,e)].join("\n");window.open(`https://wa.me/${i}?text=${encodeURIComponent(n)}`,"_blank","noopener"),t.closeSheet()}}
    >
      <span class="muted" style="font-size:14px">${t.t("support_hint",{name:t.config.settings.installer.name||"SmartNest"})}</span>
      <textarea name="msg" rows="4" placeholder=${t.t("support_placeholder")}></textarea>
      <div style="font-size:13px;color:var(--text-2);white-space:pre-line;unicode-bidi:plaintext">${Vh(t,e).join("\n")}</div>
      <button class="btn primary pressable" type="submit" style="min-height:52px"><sn-icon icon="whatsapp" style="--icon-size:22px"></sn-icon>${t.t("support_send")}</button>
    </form>`})}(t,vu)}><sn-icon icon="whatsapp" style="--icon-size:20px"></sn-icon>${t.t("support_title")}</button>`:U}
          ${t.allows("rating")?B`<button class="btn primary pressable" @click=${()=>Ch(t)}><sn-icon icon="star" style="--icon-size:20px"></sn-icon>${t.t("rate_service")}</button>`:U}
          <section style="display:grid;gap:12px">
            <h3 style="margin:0;font-size:13px;font-weight:700;color:var(--text-2)">${t.t("this_screen")}</h3>
            <label class="field"
              >${t.t("opens_on")}
              <select
                @change=${t=>{try{t.target.value?localStorage.setItem("smartnest-home-page",t.target.value):localStorage.removeItem("smartnest-home-page")}catch{}}}
              >
                <option value="" ?selected=${!e}>${t.t("default_page")}</option>
                ${t.config.pages.map((t=>B`<option value=${t.id} ?selected=${e===t.id}>${t.title}</option>`))}
              </select>
            </label>
            <div class="field">
              ${t.t("tv_mode")}
              <div class="seg">
                ${[!0,!1].map((e=>B`<button
                    aria-pressed=${this.tvMode===e}
                    @click=${()=>{this.tvMode=e;try{e?localStorage.setItem("smartnest-tv","1"):localStorage.removeItem("smartnest-tv")}catch{}}}
                  >
                    ${t.t(e?"on":"off")}
                  </button>`))}
              </div>
            </div>
            <div class="field">
              ${t.t("fast_mode")}
              <div class="seg">
                ${[[null,"fast_auto"],["1","on"],["0","off"]].map((([e,i])=>B`<button
                    aria-pressed=${this.liteChoice===e}
                    @click=${()=>{this.liteChoice=e;try{null===e?localStorage.removeItem("smartnest-lite"):localStorage.setItem("smartnest-lite",e)}catch{}this.lite=Hu(),this.requestUpdate()}}
                  >
                    ${t.t(i)}
                  </button>`))}
              </div>
              <span class="hint">${t.t(Mu()?"fast_hint_weak":"fast_hint")}${this.lite?" ✓":""}</span>
            </div>
            ${t.allows("simple_mode")?B`<div class="field">
                  ${t.t("simple_mode")}
                  <div class="seg">
                    ${[!0,!1].map((e=>B`<button aria-pressed=${this.simple===e} @click=${()=>(this.simple=e,bu("smartnest-simple",e))}>${t.t(e?"on":"off")}</button>`))}
                  </div>
                  <span class="hint">${t.t("simple_hint")}</span>
                </div>`:U}
            ${t.allows("night_red")?B`<div class="field">
                  ${t.t("night_red")}
                  <div class="seg">
                    ${[!0,!1].map((e=>B`<button aria-pressed=${this.nightRed===e} @click=${()=>(this.nightRed=e,bu("smartnest-nightred",e))}>${t.t(e?"on":"off")}</button>`))}
                  </div>
                  <span class="hint">${t.t("night_red_hint")}</span>
                </div>`:U}
            <div class="field">
              ${t.t("big_text")}
              <div class="seg">
                ${[!0,!1].map((e=>B`<button
                    aria-pressed=${this.big===e}
                    @click=${()=>{this.big=e;try{e?localStorage.setItem("smartnest-big","1"):localStorage.removeItem("smartnest-big")}catch{}}}
                  >
                    ${t.t(e?"on":"off")}
                  </button>`))}
              </div>
            </div>
            ${t.isAdmin&&t.allows("phone_qr")?B`<div class="field">
                  ${t.t("phone_qr")}
                  <div style="display:flex;gap:14px;align-items:center;flex-wrap:wrap">
                    <span style="background:#fff;padding:8px;border-radius:12px;line-height:0">${Dd(location.origin+location.pathname,132)}</span>
                    <span class="hint" style="flex:1;min-width:180px">${t.t("phone_qr_hint")}</span>
                  </div>
                </div>`:U}
            ${t.isAdmin&&t.allows("showroom")?B`<div class="field">
                  ${t.t("showroom")}
                  <div class="seg">
                    ${[!0,!1].map((e=>B`<button
                        aria-pressed=${Au===e}
                        @click=${()=>{if(e!==Au){try{e?localStorage.setItem("smartnest-showroom","1"):localStorage.removeItem("smartnest-showroom")}catch{}location.reload()}}}
                      >
                        ${t.t(e?"on":"off")}
                      </button>`))}
                  </div>
                  <span class="hint">${t.t("showroom_hint")}</span>
                </div>`:U}
            <div style="display:flex;gap:8px;flex-wrap:wrap">
              ${t.allows("photo_frame")?B`<button class="btn pressable" @click=${()=>async function(t){let e;try{e=await t.hass.callWS({type:"smartnest/photos/link"})}catch{return t.toast(t.t("error"))}const i=`${location.origin}${e.path}`;t.showSheet({title:t.t("photos_from_phone"),render:t=>B`<div style="display:grid;gap:14px;justify-items:center;text-align:center">
      ${Dd(i,220)}
      <span style="font-size:16px">${t.t("photos_scan",{n:e.minutes})}</span>
      <span class="muted" style="font-size:13px">${t.t("photos_wifi")}</span>
    </div>`})}(t)}>📷 ${t.t("photos_from_phone")}</button>`:U}
              <button class="btn pressable" @click=${()=>(this.sheets=[],this.touring=!0)}>🧭 ${t.t("tour_again")}</button>
            </div>
            ${t.allows("voice")?B`<div class="field">
                  ${t.t("voice_hands_free")}
                  <div class="seg">
                    ${[!0,!1].map((e=>B`<button
                        aria-pressed=${this.voice===e}
                        @click=${()=>{this.voice=e,(t=>{try{t?localStorage.setItem(up,"1"):localStorage.removeItem(up)}catch{}})(e)}}
                      >
                        ${t.t(e?"on":"off")}
                      </button>`))}
                  </div>
                  <span class="hint">${t.t("voice_hint")}</span>
                </div>`:U}
          </section>
        </div>`;var i}})}tabClick(t,e){e===this.pageId&&t.editing?mu().then((i=>i.pageSettingsSheet(t,e,(()=>this.pageId=this.current.pages[0]?.id??"")))):this.goToPage(e)}renderTabbar(t){return B`<nav class="tabbar glass" role="tablist">
      ${t.config.pages.map((e=>B`<button role="tab" aria-selected=${e.id===this.pageId} class=${e.id===this.pageId?"on":""} @click=${()=>this.tabClick(t,e.id)}>
          <sn-icon .icon=${e.icon}></sn-icon><span>${e.title}</span>
        </button>`))}
    </nav>`}renderChips(t){const e=Zs(t);return e.length?B`<div class="chips" role="list">
      ${e.map((e=>B`<button class="chip pressable ${e.tone}" role="listitem" @click=${()=>"travel"===e.type?qh(t):e.entities.length?function(t,e){t.showSheet({title:Ws.find((t=>t.id===e))?t.t(Ws.find((t=>t.id===e)).label):"",render:t=>{const i=Zs(t).find((t=>t.type===e));return i&&i.entities.length?B`<div style="display:grid;gap:12px">
        ${i.bulk?B`<button
              class="btn primary pressable"
              @click=${()=>{ki("press");const e=i.entities;("lock"===i.bulk?t.hass.callService("lock","lock",{entity_id:e}):t.hass.callService("homeassistant","turn_off",{entity_id:e})).catch((()=>t.toast(t.t("error"))))}}
            >
              <sn-icon .icon=${"lock"===i.bulk?"lock":"power"} style="--icon-size:20px"></sn-icon>${t.t("lock"===i.bulk?"lock_all":"turn_all_off")}
            </button>`:null}
        ${i.entities.map((e=>{const i=t.hass.states[e];return B`<button
            class="glass pressable"
            style="display:flex;align-items:center;gap:12px;padding:10px 14px;border-radius:var(--r-md);text-align:start"
            @click=${()=>t.openEntity(e)}
          >
            <span
              style="display:grid;place-items:center;width:40px;height:40px;border-radius:999px;background:var(--tone);color:var(--on-tone);${ae(i)}"
            >
              <sn-icon .icon=${oe(i,e)} style="--icon-size:20px"></sn-icon>
            </span>
            <span style="flex:1;font-weight:500">${ie(t.hass,t.config,e)}</span>
            <span class="muted" style="font-size:14px;unicode-bidi:plaintext">${fe(t.t,i,t.lang)}</span>
          </button>`}))}
      </div>`:B`<p class="muted" style="text-align:center">✓</p>`}})}(t,e.type):void 0}>
          <sn-icon .icon=${e.icon}></sn-icon>${Zi(e.label)}
        </button>`))}
    </div>`:U}applyLicense(t){t.licensed?this.lic={licensee:t.licensee??"",plan:t.plan??"premium",expires:t.expires??void 0,trial:!!t.trial,reseller:t.reseller??""}:!this.license&&t.instance_id&&(yu(),this.license={instance_id:t.instance_id,expired:t.expired,revoked:t.revoked},this.waitForRenewal())}watchLicense(){window.clearInterval(this.licTimer),this.licTimer=window.setInterval((()=>!document.hidden&&this.recheckLicense()),3e5),document.removeEventListener("visibilitychange",this.recheckLicense),document.addEventListener("visibilitychange",this.recheckLicense)}async checkLicense(){const t=zt(this.uiLang),e=await this.hass.callWS({type:"smartnest/license/check"});return e.licensed&&this.license?(this.license=void 0,this.initStarted=!1,this.init()):this.applyLicense(e),e.reached?t("lic_check_ok"):t("lic_check_none")}waitForRenewal(){window.clearInterval(this.renewTimer),this.renewTimer=window.setInterval((async()=>{if(!this.license)return window.clearInterval(this.renewTimer);const t=await this.hass.callWS({type:"smartnest/license/status"}).catch((()=>{}));t?.licensed&&!this.license.busy&&(window.clearInterval(this.renewTimer),this.license=void 0,this.initStarted=!1,this.init())}),6e4)}async activate(t){const e=zt(this.uiLang);if(this.license&&t.trim()){this.license={...this.license,busy:!0,error:void 0};try{await this.hass.callWS({type:"smartnest/license/activate",key:t.trim()}),this.license=void 0,this.initStarted=!1,this.init()}catch{this.license={...this.license,busy:!1,error:e("activate_bad")}}}}renderActivation(){const t=zt(this.uiLang),e=this.license,i=!!this.hass.user?.is_admin;return B`<div class="center">
      <div class="glass" style="width:min(520px,calc(100vw - 32px));padding:32px;border-radius:var(--r-xl);display:grid;gap:18px;text-align:start;color:var(--text)">
        <img src="${this.assetBase}logo/smartnest-symbol-${this.dark?"white":"color"}.svg" alt="SmartNest" style="width:56px;height:56px;animation:none" />
        <div style="display:grid;gap:6px">
          <strong style="font-size:24px">${e.revoked?t("revoked_title"):e.expired?t("expired_title"):t("activate_title")}</strong>
          <span class="muted">${e.revoked?t("revoked_text"):e.expired?t("expired_text"):t("activate_text")}</span>
        </div>
        ${e.expired||e.revoked?B`<div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
              <button
                class="btn pressable"
                ?disabled=${e.checking}
                @click=${async()=>{this.license={...e,checking:!0,note:void 0};const i=await this.checkLicense().catch((()=>t("error")));this.license&&(this.license={...this.license,checking:!1,note:i})}}
              >
                <sn-icon icon="refresh" style="--icon-size:18px"></sn-icon>${t("lic_check")}
              </button>
              ${e.note?B`<span class="muted" style="font-size:14px">${e.note}</span>`:U}
            </div>`:U}
        <div class="field">
          ${t(i?"activate_id":"activate_send")}
          <div style="display:flex;gap:8px">
            <input type="text" class="ltr" readonly .value=${e.instance_id} style="flex:1;font-family:'JetBrains Mono',monospace;font-size:13px" @focus=${t=>t.target.select()} />
            <button
              class="btn pressable"
              @click=${i=>{const s=i.currentTarget,n=()=>s.textContent=t("copied");navigator.clipboard?.writeText(e.instance_id).then(n,(()=>{})),navigator.clipboard||n()}}
            >
              ${t("copy")}
            </button>
          </div>
        </div>
        ${i?B`<form
              class="field"
              @submit=${t=>{t.preventDefault(),this.activate(t.currentTarget.querySelector("input").value)}}
            >
              ${t("activate_key")}
              <input type="text" class="ltr" placeholder="SN1.…" autocomplete="off" spellcheck="false" style="font-family:'JetBrains Mono',monospace;font-size:13px" />
              ${e.error?B`<span style="color:var(--alert-text);font-size:14px">${e.error}</span>`:U}
              <button class="btn primary pressable" type="submit" ?disabled=${e.busy} style="justify-self:start;margin-top:6px">${t("activate_btn")}</button>
            </form>`:B`<p class="muted" style="margin:0">${t("activate_ask")}</p>`}
      </div>
    </div>`}renderOccasion(){const t=hh(this.now);if(!t)return U;const e=zt(this.uiLang),i=t!==hh(new Date(this.now.getTime()-864e5));return B`<sn-occasion .kind=${t} .greeting=${i||"ramadan"!==t?e(`occ_${t}`):""}></sn-occasion>`}renderRainGlass(t){if(!this.pro||this.lite||t.editing||"full"!==t.config.settings.motion||!t.allows("rain_glass"))return U;const e=t.config.settings.weather.entity,i=e?this.hass.states[e]?.state:void 0;return i&&["rainy","pouring","lightning-rainy","snowy-rainy"].includes(i)?B`<sn-rainglass ?heavy=${"pouring"===i||"lightning-rainy"===i}></sn-rainglass>`:U}renderWeather(t){if(this.lite)return U;const e=t.config.settings.weather,i=e.background&&e.entity&&t.allows("weather_bg")?this.hass.states[e.entity]:void 0;if(!i)return U;const s=this.hass.states["sun.sun"]?.state,n="clear-night"===i.state||(s?"below_horizon"===s:wu(this.now,t.config.settings.dark_from,t.config.settings.dark_to)),a=this.hass.states["sun.sun"]?.attributes,o=t.allows("sky")&&"number"==typeof a?.elevation?a.elevation:void 0;return B`<sn-weather-bg .condition=${i.state} ?night=${n} ?dark=${t.dark} .elevation=${o} ?rising=${!!a?.rising}></sn-weather-bg>`}renderDock(t){const{t:e}=t;return B`<div class="dock glass">
      <button class="btn primary pressable" @click=${()=>mu().then((e=>e.addWidgetSheet(t,this.pageId)))}>
        <sn-icon icon="plus" style="--icon-size:20px"></sn-icon>${e("add_widget")}
      </button>
      <button class="btn pressable" @click=${()=>mu().then((e=>e.pageSettingsSheet(t,this.pageId,(()=>this.pageId=this.current.pages[0]?.id??""))))}>
        <sn-icon icon="pencil" style="--icon-size:20px"></sn-icon>${e("page_settings")}
      </button>
      <button class="btn pressable" @click=${()=>mu().then((e=>e.addPageSheet(t,(t=>this.pageId=t))))}>
        <sn-icon icon="dashboard" style="--icon-size:20px"></sn-icon>${e("add_page")}
      </button>
      <button class="icon-btn pressable" aria-label=${e("settings")} @click=${()=>mu().then((e=>e.settingsSheet(t,{version:vu,license:this.lic,testDoorbell:()=>this.ring(),checkLicense:()=>this.checkLicense()})))}>
        <sn-icon icon="cog" style="--icon-size:20px"></sn-icon>
      </button>
    </div>`}render(){if(!this.hass)return U;if(this.license)return this.renderActivation();if(!this.current){const t=zt(this.uiLang);return B`<div class="center">
        <div class="boot">
          <span class="halo"></span>
          <img src="${this.assetBase}logo/smartnest-symbol-${this.dark?"white":"color"}.svg" alt="SmartNest" />
          <b class="word">SmartNest</b>
          <span class="status">${this.loadError?`${t("error")}: ${this.loadError}`:t("loading")}</span>
        </div>
      </div>`}const t=this.makeCtx(),e=this.kids&&t.config.settings.kids_page?t.config.settings.kids_page:this.pageId,i=t.config.pages.find((t=>t.id===e))??t.config.pages[0];return B`<div class="app ${this.pro?"pro":""} ${this.pro&&!this.lite&&this.sheets.length&&"off"!==t.config.settings.motion&&t.allows("push_back")?"pushed":""} ${t.narrow?"compact":""} ${this.kids?"kids":""} ${this.tvMode?"tv":""} ${!this.big&&!this.simple||this.tvMode?"":"big"} ${this.simple&&!t.editing?"simple":""}">
      ${this.pro&&!this.lite&&!this.backdrop(t)&&t.config.settings.aurora&&t.allows("aurora")?B`<div class="aurora" aria-hidden="true"><i></i><i></i><i></i></div>`:U}
      ${this.nightRed&&this.dark&&t.allows("night_red")?B`<div class="redshift" aria-hidden="true"></div>`:U}
      ${this.lite?U:(()=>{const e=this.backdrop(t);return e?B`<div class="wall" aria-hidden="true" style="background-image:url('${e}');--dim:${t.config.settings.wallpaper_dim}"></div>`:U})()}
      ${this.pro&&!this.lite&&t.config.settings.season_skin&&t.allows("season_skin")&&"full"===t.config.settings.motion&&!t.editing?B`<sn-seasonfx .season=${function(t=new Date){const e=t.getMonth();return 11===e||e<=1?"winter":e<=4?"spring":e<=7?"summer":"autumn"}()}></sn-seasonfx>`:U}
      ${this.pro&&!this.lite?B`<div class="leaks" aria-hidden="true"><i></i><i></i></div>`:U}
      ${this.renderWeather(t)}
      ${this.renderRainGlass(t)}
      ${this.renderBar(t)}
      ${i?Ht(this.alivePages(t,i.id),(t=>t.id),(e=>{const s=e.id===i.id;return B`<main
                class=${s?"current":"parked"}
                ?hidden=${!s}
                aria-hidden=${s?"false":"true"}
                @sn-cancel-swipe=${t=>{this.swipe=void 0;const e=t.currentTarget;e.style.transform="",e.style.opacity=""}}
                @pointerdown=${s?this.onSwipeDown:null}
                @pointermove=${s?this.onSwipeMove:null}
                @pointerup=${s?this.onSwipeUp:null}
                @pointercancel=${s?this.onSwipeUp:null}
              >
                ${s&&this.guests&&t.allows("guests")&&!t.editing?B`<sn-guests .ctx=${t}></sn-guests>`:U}
                ${s?this.renderDesign(t):U} ${s?this.renderNudge(t):U}
                <sn-page-grid .ctx=${s?t:this.parked.get(e.id)??t} .page=${e}></sn-page-grid>
              </main>`})):U}
      ${t.narrow&&t.config.pages.length>1&&!this.kids?this.renderTabbar(t):U}
      <sn-sheet-host .ctx=${t} .sheets=${this.sheets}></sn-sheet-host>
      ${this.ringingAt?B`<sn-doorbell .ctx=${t} .at=${this.ringingAt} .silent=${this.silentBell} .onDismiss=${()=>this.ringingAt=void 0}></sn-doorbell>`:U}
      ${this.message&&t.allows("messages")?B`<sn-message .ctx=${t} .msg=${this.message}></sn-message>`:U}
      ${(()=>{const e=t.allows("alarm_screen")?Object.values(this.hass.states).find((t=>t.entity_id.startsWith("alarm_control_panel.")&&"triggered"===t.state)):void 0;return e&&this.alarmHiddenAt!==e.last_changed?B`<sn-alarm .ctx=${t} .alarm=${e} .onHide=${()=>(this.alarmHiddenAt=e.last_changed,this.requestUpdate())}></sn-alarm>`:U})()}
      ${(()=>{const e=t.allows("weather_alert")&&!t.editing?function(t){const{hass:e,config:i}=t,s=i.settings.weather.entity?e.states[i.settings.weather.entity]:void 0;if(!s)return;const n=Number(s.attributes.wind_speed),a=Yh.includes(s.state)?s.state:n>=45?"windy":"";if(!a)return;const o=Rs(i),r=o.filter((t=>{const i=e.states[t];return i&&"binary_sensor"===ee(t)&&"on"===i.state&&["window","opening"].includes(i.attributes.device_class)})),l=o.filter((t=>{const i=e.states[t];return i&&"cover"===ee(t)&&"open"===i.state&&!["garage","door","gate"].includes(i.attributes.device_class)}));return r.length||l.length?{condition:a,open:r,covers:l}:void 0}(t):void 0,i=e?`${e.condition}|${(new Date).toDateString()}`:"";return e&&this.wxDismissed!==i&&!this.overload?B`<sn-weather-alert .ctx=${t} .risk=${e} .onDismiss=${()=>this.wxDismissed=i}></sn-weather-alert>`:U})()}
      ${this.overload?B`<sn-overload
            .ctx=${t}
            .watts=${this.overload}
            .onDismiss=${()=>{this.overload=void 0,this.overSnooze=Date.now()+6e5}}
          ></sn-overload>`:U}
      ${this.waves.map((t=>B`<i class="wave" style="left:${t.x}px;top:${t.y}px;--wc:${t.color}" aria-hidden="true"></i>`))}
      ${this.welcomer?B`<sn-welcome .ctx=${t} .person=${this.welcomer} .onDone=${()=>this.welcomer=void 0}></sn-welcome>`:U}
      ${this.searching?B`<sn-search .ctx=${t} .onClose=${()=>this.searching=!1} .onPage=${e=>this.tabClick(t,e)}></sn-search>`:U}
      ${this.touring?B`<sn-tour .ctx=${t} .steps=${this.tourSteps()} .onDone=${()=>this.touring=!1}></sn-tour>`:U}
      ${this.useDock(t)&&!this.kids?this.renderPageDock(t):U}
      ${this.voice&&t.allows("voice")&&!t.editing&&!this.sleeping?B`<sn-voice .ctx=${t}></sn-voice>`:U}
      ${this.camwall?B`<sn-camwall .ctx=${t} .onClose=${()=>this.camwall=!1}></sn-camwall>`:U}
      ${this.morning?B`<sn-morning .ctx=${t} .onDone=${()=>this.morning=!1}></sn-morning>`:U}
      ${this.scene?B`<sn-cinematic .ctx=${t} .mode=${this.scene} .onDone=${()=>this.scene=void 0}></sn-cinematic>`:U}
      ${this.sleeping?B`<sn-screensaver .ctx=${t} ?guests=${this.guests&&t.allows("guests")} .onWake=${()=>{this.sleeping=!1,this.onActivity(),this.checkMorning()}}></sn-screensaver>`:U}
      ${this.toastMsg?B`<div class="toast" role="status">${this.toastMsg}</div>`:U}
      ${this.renderUndo()}
      ${this.renderMiniPlayer(t)}
      ${this.renderQuickScenes(t)}
      ${"up"!==this.link?B`<div class="link ${this.link}" role="status">
            ${"back"===this.link?B`<sn-icon icon="check" style="--icon-size:16px"></sn-icon>${t.t("link_back")}`:B`<i></i>${t.t("link_lost")}`}
          </div>`:U}
    </div>`}};Lu.styles=[fi,r`
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
      header {
        position: sticky;
      }
      /* The sun's arc only where the bar has room for it. */
      sn-sunarc {
        display: none;
      }
      @media (min-width: 1180px) {
        sn-sunarc {
          display: inline-grid;
        }
      }
      .statusline {
        position: absolute;
        inset: auto 8% -1px 8%;
        height: 2px;
        border-radius: 2px;
        background: linear-gradient(90deg, transparent, var(--sl), transparent);
        opacity: 0.8;
        animation: sl-breathe 4s ease-in-out infinite;
        animation-play-state: var(--loops, running);
        pointer-events: none;
      }
      .statusline.alert {
        animation-duration: 1s;
        height: 3px;
      }
      @keyframes sl-breathe {
        50% {
          opacity: 0.25;
          transform: scaleX(0.85);
        }
      }
      .wave {
        position: fixed;
        z-index: 50;
        width: 40px;
        height: 40px;
        margin: -20px 0 0 -20px;
        border-radius: 50%;
        pointer-events: none;
        background: radial-gradient(circle, color-mix(in srgb, var(--wc) 55%, transparent), transparent 70%);
        animation: wave 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      }
      @keyframes wave {
        to {
          transform: scale(40);
          opacity: 0;
        }
      }
      /* A sheet opens: the dashboard behind steps back and softens, like iOS. */
      .app main,
      .app > header {
        transition: transform 500ms var(--ease-drawer), filter 500ms var(--ease-drawer);
      }
      .app.pushed main {
        transform: scale(0.965);
        filter: blur(2px) brightness(0.92);
        border-radius: 24px;
      }
      .wall {
        position: fixed;
        inset: -30px;
        z-index: -2;
        background-size: cover;
        background-position: center;
        filter: blur(18px) saturate(1.15);
        /* Tilt the tablet and the background shifts a little behind the cards: depth. */
        translate: var(--tilt-x, 0px) var(--tilt-y, 0px);
        transition: translate 400ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      sn-weather-bg,
      .leaks {
        translate: calc(var(--tilt-x, 0px) * 0.6) calc(var(--tilt-y, 0px) * 0.6);
        transition: translate 400ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .wall::after {
        content: "";
        position: absolute;
        inset: 0;
        background: color-mix(in srgb, var(--bg) calc(var(--dim, 0.35) * 100%), transparent);
      }
      .pagedock {
        position: fixed;
        bottom: 18px;
        left: 50%;
        translate: -50% 0;
        z-index: 25;
        display: flex;
        align-items: flex-end;
        gap: 6px;
        padding: 8px 10px;
        border-radius: 26px;
      }
      .dock-btn {
        position: relative;
        width: 52px;
        height: 52px;
        border-radius: 16px;
        display: grid;
        place-items: center;
        background: var(--surface-2);
        transform: scale(var(--s, 1));
        transform-origin: bottom center;
        margin-inline: calc((var(--s, 1) - 1) * 14px);
        transition: transform 160ms cubic-bezier(0.22, 1, 0.36, 1), margin 160ms cubic-bezier(0.22, 1, 0.36, 1), background 300ms;
        --icon-size: 26px;
      }
      .dock-btn.on {
        background: var(--accent);
        color: var(--on-accent);
      }
      .dock-btn.on::after {
        content: "";
        position: absolute;
        bottom: -6px;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: var(--text);
      }
      .dock-btn .tip {
        position: absolute;
        bottom: calc(100% + 10px);
        padding: 4px 10px;
        border-radius: 8px;
        background: var(--surface-solid);
        box-shadow: var(--shadow);
        font-size: 12px;
        white-space: nowrap;
        opacity: 0;
        pointer-events: none;
        transition: opacity 200ms;
        color: var(--text);
      }
      .dock-btn:hover .tip {
        opacity: 1;
      }
      .app:has(.pagedock) main {
        padding-bottom: 110px;
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
        animation-play-state: var(--loops, running);
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
      /* Simple mode: the pages and the big buttons, nothing else to get lost in. */
      .simple header .actions,
      .simple sn-island,
      .simple .chips,
      .simple .statusline,
      .simple sn-sunarc {
        display: none !important;
      }
      /* Night red: warm and dim after dark, easy on eyes waking up at night. */
      .redshift {
        position: fixed;
        inset: 0;
        z-index: 99;
        pointer-events: none;
        background: rgba(255, 70, 20, 0.5);
        mix-blend-mode: multiply;
      }
      .redshift::after {
        content: "";
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.35);
      }
      /* Aurora: slow colour fields drifting behind the cards (2.0, when there's no wallpaper). */
      .aurora {
        position: fixed;
        inset: 0;
        z-index: -2;
        overflow: hidden;
        pointer-events: none;
        opacity: 0.55;
      }
      .aurora i {
        position: absolute;
        width: 70vmax;
        height: 70vmax;
        border-radius: 50%;
        filter: blur(70px);
        opacity: 0.55;
        animation: drift 38s ease-in-out infinite alternate;
        animation-play-state: var(--loops, running);
      }
      .aurora i:nth-child(1) {
        background: var(--accent);
        left: -20vmax;
        top: -25vmax;
      }
      .aurora i:nth-child(2) {
        background: #3fb5a6;
        right: -25vmax;
        top: 10vh;
        animation-duration: 46s;
        animation-delay: -12s;
      }
      .aurora i:nth-child(3) {
        background: #8b7cf6;
        left: 20vw;
        bottom: -35vmax;
        animation-duration: 54s;
        animation-delay: -24s;
      }
      @keyframes drift {
        to {
          transform: translate(12vmax, 8vmax) scale(1.15);
        }
      }
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
      /* While editing, the edit buttons sit in the bar (where the chips are), so nothing covers the page. */
      .dock {
        flex-basis: 100%;
        display: flex;
        justify-content: center;
        gap: 6px;
        padding: 6px;
        border-radius: 999px;
        border: 0;
        box-shadow: none;
        background: transparent;
        -webkit-backdrop-filter: none;
        backdrop-filter: none;
        animation: dock-in 420ms var(--ease-out);
        overflow-x: auto;
        scrollbar-width: none;
      }
      @keyframes dock-in {
        from {
          transform: translateY(-8px);
          opacity: 0;
        }
      }
      /* Connection to Home Assistant: a quiet pill at the top while it reconnects, instead of a frozen screen. */
      .link {
        position: fixed;
        top: max(10px, env(safe-area-inset-top));
        left: 50%;
        transform: translateX(-50%);
        z-index: 96;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 14px;
        border-radius: 999px;
        background: color-mix(in srgb, var(--surface-solid) 92%, transparent);
        -webkit-backdrop-filter: blur(12px);
        backdrop-filter: blur(12px);
        box-shadow: var(--shadow-lift);
        font-size: 14px;
        font-weight: 600;
        animation: dock-in 420ms var(--spring);
      }
      .link.back {
        color: var(--success);
      }
      .link i {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 2px solid var(--text-2);
        border-top-color: transparent;
        animation: spin 0.9s linear infinite;
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
      .bell {
        position: relative;
      }
      .quick {
        position: fixed;
        z-index: 23;
        bottom: calc(18px + env(safe-area-inset-bottom));
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 4px;
        padding: 6px;
        border-radius: 999px;
        max-width: calc(100vw - 32px);
        overflow-x: auto;
        scrollbar-width: none;
        animation: dock-in 420ms var(--spring);
      }
      .compact .quick {
        bottom: calc(84px + env(safe-area-inset-bottom));
      }
      .quick button {
        flex: none;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 9px 14px;
        border: 0;
        border-radius: 999px;
        background: transparent;
        color: var(--text);
        font: 600 14px var(--font);
        cursor: pointer;
        --icon-size: 18px;
      }
      .quick button:hover {
        background: var(--surface-2);
      }
      .quick button.off {
        color: var(--alert-text);
      }
      /* Where the bar is tight, the bell shows only when there's something in it. */
      @media (max-width: 1100px) {
        .bell.quiet {
          display: none;
        }
      }
      .nudge {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 12px 10px 16px;
        margin-bottom: 16px;
        border-radius: var(--r-lg);
        animation: dock-in 420ms var(--spring);
      }
      .nudge span {
        flex: 1;
        font-weight: 500;
      }
      .nudge .btn {
        min-height: 38px;
      }
      .bell .badge {
        position: absolute;
        top: -2px;
        inset-inline-end: -2px;
        min-width: 18px;
        height: 18px;
        padding: 0 5px;
        border-radius: 9px;
        background: var(--alert);
        color: #fff;
        font-size: 11px;
        line-height: 18px;
        text-align: center;
        box-shadow: 0 0 0 2px var(--surface-solid);
      }
      .undo {
        position: fixed;
        bottom: 96px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 91;
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 8px 8px 8px 18px;
        border-radius: 999px;
        background: var(--text);
        color: var(--bg);
        font-weight: 500;
        box-shadow: var(--shadow-lift);
        animation: dock-in 420ms var(--spring);
        overflow: hidden;
        max-width: calc(100vw - 32px);
      }
      .undo button {
        border: 0;
        border-radius: 999px;
        padding: 8px 14px;
        background: var(--accent);
        color: var(--on-accent);
        font: 700 14px var(--font);
        cursor: pointer;
      }
      /* How long the chance lasts, as a line running out along the bottom. */
      .undo i {
        position: absolute;
        inset: auto 0 0 0;
        height: 3px;
        background: var(--accent);
        transform-origin: left;
        animation: undo-left linear forwards;
      }
      @keyframes undo-left {
        to {
          transform: scaleX(0);
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
      /* Opening: the nest drops in with a spring, a warm light comes on behind it, then the name. */
      .boot {
        position: relative;
        display: grid;
        gap: 10px;
        justify-items: center;
      }
      .boot img {
        width: 84px;
        height: 84px;
        animation: nest-in 900ms var(--spring) both, breathe 2.4s 1s var(--ease-out) infinite alternate;
      }
      .boot .halo {
        position: absolute;
        top: -30px;
        width: 150px;
        height: 150px;
        border-radius: 50%;
        background: radial-gradient(circle, color-mix(in srgb, var(--accent) 45%, transparent), transparent 65%);
        animation: halo-in 1.4s 300ms var(--ease-out) both;
      }
      .boot .word {
        font-size: 22px;
        font-weight: 800;
        letter-spacing: 0.02em;
        color: var(--text);
        animation: word-in 700ms 500ms var(--ease-out) both;
      }
      .boot .status {
        font-size: 13px;
        animation: word-in 700ms 800ms var(--ease-out) both;
      }
      @keyframes nest-in {
        from {
          opacity: 0;
          transform: translateY(-30px) scale(0.6);
        }
      }
      @keyframes halo-in {
        from {
          opacity: 0;
          transform: scale(0.4);
        }
      }
      @keyframes word-in {
        from {
          opacity: 0;
          transform: translateY(8px);
        }
      }
      .app {
        animation: app-in 600ms var(--ease-out);
      }
      @keyframes app-in {
        from {
          opacity: 0;
        }
      }
      @keyframes breathe {
        to {
          transform: scale(1.06);
          opacity: 0.7;
        }
      }
    `],gu([gt({attribute:!1})],Lu.prototype,"hass",1),gu([mt()],Lu.prototype,"lite",2),gu([gt({type:Boolean,reflect:!0})],Lu.prototype,"narrow",2),gu([gt({attribute:!1})],Lu.prototype,"panel",2),gu([gt({attribute:!1})],Lu.prototype,"route",2),gu([mt()],Lu.prototype,"config",2),gu([mt()],Lu.prototype,"draft",2),gu([mt()],Lu.prototype,"pageId",2),gu([mt()],Lu.prototype,"sheets",2),gu([mt()],Lu.prototype,"toastMsg",2),gu([mt()],Lu.prototype,"ringingAt",2),gu([mt()],Lu.prototype,"sleeping",2),gu([mt()],Lu.prototype,"saving",2),gu([mt()],Lu.prototype,"loadError",2),gu([mt()],Lu.prototype,"license",2),gu([mt()],Lu.prototype,"lic",2),gu([mt()],Lu.prototype,"now",2),gu([mt()],Lu.prototype,"systemDark",2),gu([mt()],Lu.prototype,"wide",2),gu([mt()],Lu.prototype,"kiosk",2),gu([mt()],Lu.prototype,"kids",2),gu([mt()],Lu.prototype,"silentBell",2),gu([mt()],Lu.prototype,"scene",2),gu([mt()],Lu.prototype,"morning",2),gu([mt()],Lu.prototype,"camwall",2),gu([mt()],Lu.prototype,"overload",2),gu([mt()],Lu.prototype,"wxDismissed",2),gu([mt()],Lu.prototype,"wallAccent",2),gu([mt()],Lu.prototype,"dockX",2),gu([mt()],Lu.prototype,"welcomer",2),gu([mt()],Lu.prototype,"waves",2),gu([mt()],Lu.prototype,"pro",2),gu([mt()],Lu.prototype,"big",2),gu([mt()],Lu.prototype,"nightRed",2),gu([mt()],Lu.prototype,"simple",2),gu([mt()],Lu.prototype,"touring",2),gu([mt()],Lu.prototype,"searching",2),gu([mt()],Lu.prototype,"voice",2),gu([mt()],Lu.prototype,"guests",2),gu([mt()],Lu.prototype,"tvMode",2),gu([mt()],Lu.prototype,"message",2),gu([mt()],Lu.prototype,"notes",2),gu([mt()],Lu.prototype,"undo",2),gu([mt()],Lu.prototype,"design",2),gu([mt()],Lu.prototype,"link",2),gu([mt()],Lu.prototype,"nudge",2),Lu=gu([pt("smartnest-panel")],Lu);var Vu=Object.defineProperty,Su=Object.getOwnPropertyDescriptor,zu=(t,e,i,s)=>{for(var n,a=s>1?void 0:s?Su(e,i):e,o=t.length-1;o>=0;o--)(n=t[o])&&(a=(s?n(e,i,a):n(a))||a);return s&&a&&Vu(e,i,a),a};let Du=class extends ct{constructor(){super(...arguments),this.narrow=!1,this.ready=!1}connectedCallback(){super.connectedCallback(),t((()=>import("./licenses-panel-D7rbmI4u.js")),[]).then((()=>this.ready=!0))}render(){return this.ready?B`<sn-licenses-page .hass=${this.hass} .narrow=${this.narrow} .panel=${this.panel}></sn-licenses-page>`:U}};Du.styles=r`
    :host {
      display: block;
      height: 100%;
    }
  `,zu([gt({attribute:!1})],Du.prototype,"hass",2),zu([gt({type:Boolean})],Du.prototype,"narrow",2),zu([gt({attribute:!1})],Du.prototype,"panel",2),zu([mt()],Du.prototype,"ready",2),Du=zu([pt("smartnest-licenses")],Du),console.info(`%c SmartNest %c v${vu} `,"background:#E9971D;color:#1E252B;font-weight:700;border-radius:4px 0 0 4px","background:#1E252B;color:#fff;border-radius:0 4px 4px 0");const Ou=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));export{Ze as $,U as A,Re as B,Di as C,We as D,Si as E,oe as F,Xt as G,Ch as H,vh as I,xh as J,nu as K,Ot as L,ei as M,Ws as N,Pe as O,ms as P,ph as Q,Oh as R,Vt as S,Ue as T,Do as U,Ph as V,Ee as W,jh as X,zh as Y,ti as Z,Fe as _,Ie as a,Xr as a0,Gr as a1,cu as a2,Cc as a3,la as a4,fa as a5,su as a6,Jt as a7,mi as a8,gi as a9,we as aa,_t as ab,ft as ac,q as ad,bt as ae,yn as af,_n as ag,ki as ah,dn as ai,fn as aj,hn as ak,Z as al,pn as am,un as an,gn as ao,$e as ap,ne as aq,Ni as ar,Ou as as,B as b,ee as c,Rs as d,ie as e,ue as f,ge as g,fs as h,ct as i,bs as j,lu as k,Os as l,_e as m,gt as n,wh as o,ks as p,Cs as q,mt as r,Ts as s,pt as t,Qe as u,fi as v,Mh as w,r as x,ze as y,Ke as z};
