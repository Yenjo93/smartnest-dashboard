import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

type Particles = "rain" | "snow" | "stars" | "none";

interface Scene {
  particles: Particles;
  density: number; // particles per 10k px²
  clouds: number; // 0..3
  sun: boolean;
  moon: boolean;
  fog: boolean;
  lightning: boolean;
}

// HA weather states → what we draw. Kept subtle: it sits behind the cards, not in front of them.
function sceneFor(condition: string, night: boolean): Scene {
  const base: Scene = { particles: "none", density: 0, clouds: 0, sun: false, moon: false, fog: false, lightning: false };
  const sky = night ? { particles: "stars" as Particles, density: 0.5, moon: true } : { sun: true };
  switch (condition) {
    case "sunny":
    case "clear-night":
      return { ...base, ...sky };
    case "partlycloudy":
      return { ...base, ...sky, clouds: 1 };
    case "cloudy":
      return { ...base, clouds: 3 };
    case "windy":
    case "windy-variant":
      return { ...base, clouds: 2 };
    case "fog":
      return { ...base, fog: true, clouds: 1 };
    case "rainy":
      return { ...base, particles: "rain", density: 0.9, clouds: 2 };
    case "pouring":
      return { ...base, particles: "rain", density: 2.2, clouds: 3 };
    case "lightning":
      return { ...base, clouds: 3, lightning: true };
    case "lightning-rainy":
      return { ...base, particles: "rain", density: 1.6, clouds: 3, lightning: true };
    case "snowy":
    case "snowy-rainy":
    case "hail":
      return { ...base, particles: "snow", density: 0.6, clouds: 2 };
    default:
      return night ? { ...base, ...sky } : base;
  }
}

interface P {
  x: number;
  y: number;
  v: number;
  s: number;
  a: number;
}

/** Full-screen, click-through layer: sun glow, clouds, rain, snow or stars, matching the real weather. */
@customElement("sn-weather-bg")
export class SnWeatherBg extends LitElement {
  @property() condition = "";
  @property({ type: Boolean }) night = false;
  @property({ type: Boolean }) dark = false;

  private raf = 0;
  private parts: P[] = [];
  private scene = sceneFor("", false);
  private last = 0;
  private flash = 0;
  private ro?: ResizeObserver;
  private reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  static styles = css`
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
  `;

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("visibilitychange", this.onVisible);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    cancelAnimationFrame(this.raf);
    this.ro?.disconnect();
    document.removeEventListener("visibilitychange", this.onVisible);
  }

  private onVisible = () => {
    cancelAnimationFrame(this.raf);
    if (document.visibilityState === "visible") this.loop(0);
  };

  protected updated(changed: Map<string, unknown>) {
    if (changed.has("condition") || changed.has("night")) {
      this.scene = sceneFor(this.condition, this.night);
      this.seed();
    }
    if (!this.ro) {
      this.ro = new ResizeObserver(() => this.seed());
      this.ro.observe(this);
    }
    cancelAnimationFrame(this.raf);
    this.loop(0);
  }

  private get canvas() {
    return this.renderRoot.querySelector("canvas");
  }

  /** Lays out particles for the current size; a cheap tablet gets the same look with fewer of them. */
  private seed() {
    const c = this.canvas;
    if (!c) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    c.width = Math.round(c.clientWidth * dpr);
    c.height = Math.round(c.clientHeight * dpr);
    const { particles, density } = this.scene;
    const count = particles === "none" ? 0 : Math.min(350, Math.round(((c.clientWidth * c.clientHeight) / 10_000) * density));
    this.parts = Array.from({ length: count }, () => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      v: particles === "rain" ? 9 + Math.random() * 7 : particles === "snow" ? 0.6 + Math.random() * 1.2 : Math.random() * Math.PI * 2,
      s: particles === "stars" ? 0.5 + Math.random() * 1.4 : particles === "snow" ? 1.5 + Math.random() * 2.5 : 10 + Math.random() * 14,
      a: 0.25 + Math.random() * 0.55,
    }));
  }

  private loop = (t: number) => {
    const c = this.canvas;
    const g = c?.getContext("2d");
    if (!c || !g) return;
    // ~30 fps is plenty for weather and halves the work on wall tablets.
    if (t - this.last >= 33 || t === 0) {
      this.last = t;
      this.draw(g, c, t);
    }
    if (!this.reduced && (this.parts.length || this.scene.lightning)) this.raf = requestAnimationFrame(this.loop);
  };

  private draw(g: CanvasRenderingContext2D, c: HTMLCanvasElement, t: number) {
    g.clearRect(0, 0, c.width, c.height);
    const { particles } = this.scene;
    const dpr = c.width / (c.clientWidth || 1);
    if (particles === "rain") {
      g.strokeStyle = this.dark ? "rgba(180,210,255,1)" : "rgba(70,100,130,1)";
      g.lineWidth = 1.2 * dpr;
      g.lineCap = "round";
      for (const p of this.parts) {
        g.globalAlpha = p.a * (this.dark ? 0.45 : 0.3);
        g.beginPath();
        g.moveTo(p.x, p.y);
        g.lineTo(p.x - p.s * 0.18 * dpr, p.y + p.s * dpr);
        g.stroke();
        p.y += p.v * dpr;
        p.x -= p.v * 0.18 * dpr;
        if (p.y > c.height) {
          p.y = -p.s * dpr;
          p.x = Math.random() * c.width * 1.2;
        }
      }
    } else if (particles === "snow") {
      g.fillStyle = this.dark ? "#fff" : "rgba(150,170,190,1)";
      for (const p of this.parts) {
        g.globalAlpha = p.a * 0.8;
        g.beginPath();
        g.arc(p.x + Math.sin(t / 1400 + p.y / 60) * 12 * dpr, p.y, p.s * dpr, 0, Math.PI * 2);
        g.fill();
        p.y += p.v * dpr;
        if (p.y > c.height + 10) {
          p.y = -10;
          p.x = Math.random() * c.width;
        }
      }
    } else if (particles === "stars") {
      g.fillStyle = "#fff";
      for (const p of this.parts) {
        g.globalAlpha = (this.dark ? 0.85 : 0.35) * (0.45 + 0.55 * Math.abs(Math.sin(t / 1800 + p.v)));
        g.beginPath();
        g.arc(p.x, p.y * 0.7, p.s * dpr, 0, Math.PI * 2);
        g.fill();
      }
    }
    g.globalAlpha = 1;
    if (this.scene.lightning && !this.reduced) {
      // A flash every 6-14 seconds, with a quick double flicker.
      if (t > this.flash) {
        this.flash = t + 6000 + Math.random() * 8000;
        const el = this.renderRoot.querySelector<HTMLElement>(".flash");
        el?.animate([{ opacity: 0 }, { opacity: 0.9 }, { opacity: 0.1 }, { opacity: 0.6 }, { opacity: 0 }], { duration: 650, easing: "ease-out" });
      }
    }
  }

  render() {
    const s = this.scene;
    const cloud = this.dark ? "rgba(140,155,170,.18)" : "rgba(255,255,255,.55)";
    return html`<div style="--cloud:${cloud}">
      ${s.sun ? html`<div class="sun"></div>` : nothing} ${s.moon ? html`<div class="moon"></div>` : nothing}
      ${Array.from({ length: s.clouds }, (_, i) => html`<div class="cloud" style="top:${8 + i * 22}%;animation-duration:${90 + i * 35}s;animation-delay:-${i * 31}s"></div>`)}
      ${s.fog ? html`<div class="fog"></div>` : nothing}
      <canvas></canvas>
      <div class="flash"></div>
    </div>`;
  }
}
