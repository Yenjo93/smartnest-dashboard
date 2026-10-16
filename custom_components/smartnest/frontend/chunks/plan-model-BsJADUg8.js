import{i as t,A as o,c as e,aa as s,al as i,ap as r,aq as a,e as n,F as c,b as l,x as p,n as h,r as d,t as f}from"./app-_i2WtCLG.js";import"./loader-43RavMas.js";var m=Object.defineProperty,b=Object.getOwnPropertyDescriptor,$=(t,o,e,s)=>{for(var i,r=s>1?void 0:s?b(o,e):o,a=t.length-1;a>=0;a--)(i=t[a])&&(r=(s?i(o,e,r):i(r))||r);return s&&r&&m(o,e,r),r};const u=Math.cos(Math.PI/6),g=Math.sin(Math.PI/6);let y=class extends t{constructor(){super(...arguments),this.ratio=1.5,this.size={w:0,h:0}}connectedCallback(){super.connectedCallback(),this.ro=new ResizeObserver((([t])=>this.size={w:t.contentRect.width,h:t.contentRect.height})),this.ro.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this.ro?.disconnect()}iso(t,o=0){const e=t[0],s=t[1]/100*(100/this.ratio);return[(e-s)*u,(e+s)*g-o]}render(){const{ctx:t}=this,{hass:p,config:h}=t,d=this.floor.rooms??[];if(!d.length)return o;const f=new Map;for(const o of d){const t=this.floor.markers.filter((t=>"light"===e(t.entity)&&"on"===p.states[t.entity]?.state&&s([t.x,t.y],o.points)));if(t.length){const e=p.states[t[0].entity].attributes.rgb_color??[255,196,120];f.set(o.id,`rgb(${e.join(",")})`)}}const m=[];for(const o of d){const t=o.points;for(let o=0;o<t.length;o++){const e=t[o],s=t[(o+1)%t.length],[i,r,a,n]=[this.iso(e),this.iso(s),this.iso(s,9),this.iso(e,9)],c=s[1]-e[1],l=-(s[0]-e[0]);m.push({d:`M${i} L${r} L${a} L${n} Z`,depth:e[0]+e[1]+s[0]+s[1],light:c+l>0?.92:.7})}}m.sort(((t,o)=>t.depth-o.depth));const b=d.flatMap((t=>t.points.map((t=>this.iso(t))))).concat(d.flatMap((t=>t.points.map((t=>this.iso(t,9)))))),$=b.map((t=>t[0])),u=b.map((t=>t[1])),[g,y,x,v]=[Math.min(...$)-4,Math.max(...$)+4,Math.min(...u)-8,Math.max(...u)+4],w=`${g} ${x} ${y-g} ${v-x}`,k=t.dark,M=(y-g)/(v-x),z=Math.min(this.size.w,this.size.h*M);return l`<div class="box" style="width:${z}px;height:${z/M}px"><svg viewBox=${w} preserveAspectRatio="none" aria-hidden="true">
        ${i`<defs>${d.map((t=>f.has(t.id)?i`<radialGradient id="g-${t.id}" cx="50%" cy="50%" r="60%"><stop offset="0" stop-color=${f.get(t.id)} stop-opacity=".9"></stop><stop offset="1" stop-color=${f.get(t.id)} stop-opacity=".25"></stop></radialGradient>`:""))}</defs>`}
        ${d.map((t=>i`<path class="floor" d="M${t.points.map((t=>this.iso(t))).join(" L")} Z" fill=${f.has(t.id)?`url(#g-${t.id})`:k?"hsl(220 10% 16%)":"hsl(35 25% 90%)"}></path>`))}
        ${m.map((t=>{return i`<path class="wall" d=${t.d} fill=${o=t.light,k?`hsl(220 10% ${Math.round(30*o)}%)`:`hsl(35 20% ${Math.round(96*o)}%)`} stroke=${k?"rgba(255,255,255,.08)":"rgba(30,37,43,.12)"} stroke-width=".25"></path>`;var o}))}
        ${d.map((t=>{const[o,e]=this.iso(r(t.points),12);return i`<text class="label" x=${o} y=${e}>${t.name}</text>`}))}
      </svg>
      ${this.floor.markers.filter((t=>["light","climate","lock","cover","fan","media_player","switch","vacuum"].includes(e(t.entity)))).map(((o,s)=>{const i=p.states[o.entity],[r,d]=[((f=this.iso([o.x,o.y],9*.6))[0]-g)/(y-g)*100,(f[1]-x)/(v-x)*100];var f;const m=a(i),b="light"===e(o.entity)&&Array.isArray(i?.attributes.rgb_color)?`rgb(${i.attributes.rgb_color.join(",")})`:void 0;return l`<button
            class="pin ${m?"on":""}"
            style="left:${r}%;top:${d}%;animation-delay:${400+40*s}ms;${b?`--tone:${b}`:""}"
            title=${n(p,h,o.entity)}
            aria-label=${n(p,h,o.entity)}
            @click=${()=>t.openEntity(o.entity)}
          >
            <sn-icon .icon=${c(i,o.entity)}></sn-icon>
          </button>`}))}</div>`}};y.styles=p`
    :host {
      display: grid;
      place-items: center;
      width: 100%;
      height: 100%;
    }
    .box {
      position: relative;
    }
    svg {
      width: 100%;
      height: 100%;
      overflow: visible;
      animation: rise 900ms cubic-bezier(0.22, 1, 0.36, 1);
    }
    .wall {
      transition: fill 600ms;
    }
    .floor {
      transition: fill 800ms;
    }
    .pin {
      position: absolute;
      translate: -50% -100%;
      display: grid;
      place-items: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: var(--surface-solid);
      box-shadow: 0 6px 14px rgba(0, 0, 0, 0.3);
      border: 0;
      cursor: pointer;
      color: var(--text-2);
      --icon-size: 17px;
      animation: drop 600ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
    }
    .pin.on {
      background: var(--tone, var(--accent));
      color: #fff;
      box-shadow: 0 0 18px var(--tone, var(--accent));
    }
    .pin::after {
      content: "";
      position: absolute;
      top: 100%;
      width: 2px;
      height: 10px;
      background: currentColor;
      opacity: 0.4;
    }
    .label {
      font: 600 2.4px var(--font, sans-serif);
      fill: var(--text);
      text-anchor: middle;
      paint-order: stroke;
      stroke: var(--surface-solid);
      stroke-width: 0.6px;
    }
    @keyframes rise {
      from {
        opacity: 0;
        transform: translateY(14px) scale(0.96);
      }
    }
    @keyframes drop {
      from {
        opacity: 0;
        transform: translateY(-14px);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      svg,
      .pin {
        animation: none;
      }
    }
  `,$([h({attribute:!1})],y.prototype,"ctx",2),$([h({attribute:!1})],y.prototype,"floor",2),$([h({type:Number})],y.prototype,"ratio",2),$([d()],y.prototype,"size",2),y=$([f("sn-plan-model")],y);export{y as SnPlanModel};
