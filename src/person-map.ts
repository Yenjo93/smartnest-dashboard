// Where someone went: their route on a map (today, yesterday or the week), the places they stopped and a timeline of
// zones from HA's history. Loaded only when a person is tapped on the family card (Leaflet is the biggest part).
import { LitElement, css, html, nothing, unsafeCSS } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import * as L from "leaflet";
import leafletCss from "leaflet/dist/leaflet.css?inline";
import type { Ctx } from "./ctx";
import { entityName, formatNumber, ltr } from "./entities";
import { LOCALE } from "./i18n";
import { shared } from "./theme";
import "./ui/icon";

type Range = "today" | "yesterday" | "week";
interface Fix {
  at: number;
  lat: number;
  lon: number;
}
interface Visit {
  state: string;
  from: number;
  to: number;
}

/** Metres between two points. */
function metres(a: Fix, b: Fix) {
  const r = Math.PI / 180;
  const dLat = (b.lat - a.lat) * r;
  const dLon = (b.lon - a.lon) * r;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLon / 2) ** 2;
  return 2 * 6_371_000 * Math.asin(Math.sqrt(h));
}

function window_(range: Range): [Date, Date] {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  if (range === "today") return [start, new Date()];
  if (range === "yesterday") return [new Date(start.getTime() - 86_400_000), start];
  return [new Date(start.getTime() - 6 * 86_400_000), new Date()];
}

export type MapSource = "osm" | "streets" | "satellite" | "custom";
const OSM = '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>';
const ESRI = "Tiles © Esri";
const TILES: Record<Exclude<MapSource, "custom">, { url: string; attribution: string; night: boolean }> = {
  osm: { url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png", attribution: OSM, night: true },
  streets: { url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", attribution: ESRI, night: true },
  satellite: { url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", attribution: ESRI, night: false },
};

@customElement("sn-person-map")
export class SnPersonMap extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property() entity = "";
  @property() source: MapSource = "osm";
  @property() customUrl = "";
  @state() private range: Range = "today";
  @state() private fixes: Fix[] = [];
  @state() private visits: Visit[] = [];
  @state() private loading = true;
  @state() private picked = -1;
  @query(".map") private box!: HTMLDivElement;
  private map?: L.Map;
  private layer?: L.LayerGroup;
  private tiles?: L.TileLayer;
  private dark?: boolean;
  private ro?: ResizeObserver;

  static styles = [
    shared,
    unsafeCSS(leafletCss),
    css`
      :host {
        display: grid;
        gap: 12px;
      }
      .map {
        height: min(52vh, 460px);
        border-radius: var(--r-lg);
        overflow: hidden;
        background: var(--surface-2);
        z-index: 0;
      }
      .bar {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
        align-items: center;
      }
      .bar .btn {
        min-height: 38px;
        padding-inline: 14px;
        font-size: 14px;
      }
      .bar .sum {
        margin-inline-start: auto;
        color: var(--text-2);
        font-size: 14px;
      }
      .tl {
        display: grid;
        gap: 6px;
      }
      .v {
        display: grid;
        grid-template-columns: 14px minmax(0, 1fr) auto;
        gap: 10px;
        align-items: center;
        padding: 9px 12px;
        border-radius: var(--r-md);
        background: var(--surface-2);
        cursor: pointer;
        font-size: 14px;
      }
      .v.on {
        box-shadow: inset 0 0 0 2px var(--accent);
      }
      .v i {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: var(--text-2);
      }
      .v.home i {
        background: var(--success);
      }
      .v.zone i {
        background: var(--accent);
      }
      .v span {
        color: var(--text-2);
        font-size: 13px;
      }
      .note {
        color: var(--text-2);
        font-size: 14px;
        text-align: center;
        padding: 8px;
      }
      /* Leaflet bits drawn by us */
      .leaflet-container {
        font: inherit;
        background: var(--surface-2);
      }
      .pin {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 3px solid var(--accent);
        background: var(--surface-solid) center / cover;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
        display: grid;
        place-items: center;
        font-weight: 700;
        color: var(--text);
      }
      .stop {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: var(--surface-solid);
        border: 3px solid var(--accent);
      }
      /* OpenStreetMap has no dark map: turn the light one into a night one. */
      .night {
        filter: invert(1) hue-rotate(180deg) brightness(0.85) contrast(0.9) saturate(0.6);
      }
      .leaflet-control-attribution {
        font-size: 10px;
        background: color-mix(in srgb, var(--surface-solid) 70%, transparent) !important;
        color: var(--text-2);
      }
      .leaflet-control-attribution a {
        color: inherit;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.load();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.ro?.disconnect();
    this.map?.remove();
    this.map = undefined;
  }

  private async load() {
    this.loading = true;
    this.picked = -1;
    const [start, end] = window_(this.range);
    try {
      const res = await this.ctx.hass.callWS<Record<string, { s: string; a?: Record<string, any>; lu?: number; lc?: number }[]>>({
        type: "history/history_during_period",
        start_time: start.toISOString(),
        end_time: end.toISOString(),
        entity_ids: [this.entity],
        minimal_response: false,
        no_attributes: false,
        significant_changes_only: false,
      });
      const rows = res[this.entity] ?? [];
      const fixes: Fix[] = [];
      const visits: Visit[] = [];
      let attrs: Record<string, any> = {};
      for (const r of rows) {
        const at = (r.lu ?? r.lc ?? start.getTime() / 1000) * 1000;
        if (r.a) attrs = r.a;
        const lat = Number(attrs.latitude);
        const lon = Number(attrs.longitude);
        // Skip rough fixes (a phone indoors can be off by a kilometre) and points that didn't move.
        if (!Number.isNaN(lat) && !Number.isNaN(lon) && !(Number(attrs.gps_accuracy) > 250)) {
          const f = { at, lat, lon };
          const last = fixes[fixes.length - 1];
          if (!last || metres(last, f) > 25) fixes.push(f);
        }
        const v = visits[visits.length - 1];
        if (!v || v.state !== r.s) {
          if (v) v.to = at;
          visits.push({ state: r.s, from: Math.max(at, start.getTime()), to: end.getTime() });
        }
      }
      this.fixes = fixes;
      this.visits = visits.filter((v) => v.to - v.from > 60_000 && !["unknown", "unavailable"].includes(v.state));
    } catch {
      this.fixes = [];
      this.visits = [];
    }
    this.loading = false;
    await this.updateComplete;
    this.draw();
  }

  private ensureMap() {
    if (this.map || !this.box) return;
    this.map = L.map(this.box, { zoomControl: false, attributionControl: true });
    L.control.zoom({ position: this.ctx.rtl ? "topleft" : "topright" }).addTo(this.map);
    this.layer = L.layerGroup().addTo(this.map);
    // The sheet grows in: Leaflet has to measure again once it has its real size.
    this.ro = new ResizeObserver(() => this.map?.invalidateSize());
    this.ro.observe(this.box);
  }

  private setTiles(force = false) {
    if (!this.map || (!force && this.dark === this.ctx.dark)) return;
    this.dark = this.ctx.dark;
    this.tiles?.remove();
    const src = this.source === "custom" ? (this.customUrl ? { ...TILES.osm, url: this.customUrl, attribution: "" } : TILES.osm) : TILES[this.source] ?? TILES.osm;
    let errors = 0;
    this.tiles = L.tileLayer(src.url, {
      maxZoom: 19,
      className: this.dark && src.night ? "night" : "",
      // Home Assistant's page sends no Referer, and OpenStreetMap blocks tiles without one: send the HA address for the tiles.
      referrerPolicy: "strict-origin-when-cross-origin",
      attribution: src.attribution,
    } as L.TileLayerOptions)
      .on("tileerror", () => {
        // Blocked or offline: fall back to the other street map once.
        if (++errors === 4 && this.source === "osm") {
          this.source = "streets";
          this.setTiles(true);
        }
      })
      .addTo(this.map);
  }

  private draw() {
    this.ensureMap();
    const map = this.map;
    if (!map || !this.layer) return;
    this.setTiles();
    this.layer.clearLayers();
    const { hass } = this.ctx;
    const accent = getComputedStyle(this).getPropertyValue("--accent").trim() || "#c9a24a";
    // Zones (home, work, school) as soft circles.
    for (const z of Object.values(hass.states)) {
      if (!z.entity_id.startsWith("zone.") || z.attributes.passive) continue;
      const lat = Number(z.attributes.latitude);
      const lon = Number(z.attributes.longitude);
      if (Number.isNaN(lat) || Number.isNaN(lon)) continue;
      L.circle([lat, lon], { radius: Number(z.attributes.radius) || 100, color: z.entity_id === "zone.home" ? "#3fbf7f" : accent, weight: 1, fillOpacity: 0.12 })
        .bindTooltip(z.attributes.friendly_name ?? z.entity_id)
        .addTo(this.layer);
    }
    const pts = this.fixes.map((f) => L.latLng(f.lat, f.lon));
    if (pts.length > 1) {
      L.polyline(pts, { color: accent, weight: 9, opacity: 0.18, lineCap: "round", lineJoin: "round" }).addTo(this.layer);
      L.polyline(pts, { color: accent, weight: 4, opacity: 0.95, lineCap: "round", lineJoin: "round" }).addTo(this.layer);
    }
    // Stops: where they stayed 10 minutes or more.
    const fmt = (t: number) => new Date(t).toLocaleTimeString(LOCALE[this.ctx.lang], { hour: "numeric", minute: "2-digit" });
    for (let i = 0; i < this.fixes.length - 1; i++) {
      const stay = this.fixes[i + 1].at - this.fixes[i].at;
      if (stay >= 10 * 60_000)
        L.marker([this.fixes[i].lat, this.fixes[i].lon], { icon: L.divIcon({ className: "", html: '<div class="stop"></div>', iconSize: [14, 14] }) })
          .bindTooltip(`${fmt(this.fixes[i].at)} – ${fmt(this.fixes[i + 1].at)}`)
          .addTo(this.layer);
    }
    // Where they are now (or were last seen), with their picture.
    const e = hass.states[this.entity];
    const lat = Number(e?.attributes.latitude);
    const lon = Number(e?.attributes.longitude);
    const now = this.range !== "yesterday" && !Number.isNaN(lat) && !Number.isNaN(lon) ? L.latLng(lat, lon) : pts[pts.length - 1];
    if (now) {
      const pic = e?.attributes.entity_picture as string | undefined;
      const name = entityName(hass, this.ctx.config, this.entity);
      const face = pic ? `<div class="pin" style="background-image:url('${hass.hassUrl(pic)}')"></div>` : `<div class="pin">${name.slice(0, 1).replace(/[<>&"]/g, "")}</div>`;
      L.marker(now, { icon: L.divIcon({ className: "", html: face, iconSize: [40, 40], iconAnchor: [20, 20] }), zIndexOffset: 1000 }).addTo(this.layer);
    }
    const all = now ? [...pts, now] : pts;
    if (all.length > 1) map.fitBounds(L.latLngBounds(all), { padding: [40, 40], maxZoom: 16 });
    else if (all.length) map.setView(all[0], 15);
    else map.setView([Number(hass.config?.latitude) || 31.9, Number(hass.config?.longitude) || 35.2], 13);
  }

  /** Zooms to one stretch of the timeline. */
  private zoomTo(i: number) {
    this.picked = this.picked === i ? -1 : i;
    const v = this.visits[i];
    const pts = this.picked < 0 ? this.fixes : this.fixes.filter((f) => f.at >= v.from - 60_000 && f.at <= v.to + 60_000);
    if (!this.map || !pts.length) return;
    if (pts.length === 1) this.map.flyTo([pts[0].lat, pts[0].lon], 16, { duration: 0.6 });
    else this.map.flyToBounds(L.latLngBounds(pts.map((f) => L.latLng(f.lat, f.lon))), { padding: [40, 40], maxZoom: 17, duration: 0.6 });
  }

  updated() {
    // Light/dark changed while open.
    if (this.map && this.dark !== this.ctx.dark) this.setTiles();
  }

  render() {
    const { t, lang } = this.ctx;
    const km = this.fixes.reduce((s, f, i) => (i ? s + metres(this.fixes[i - 1], f) : 0), 0) / 1000;
    const fmt = (ms: number) =>
      new Date(ms).toLocaleTimeString(LOCALE[lang], { hour: "numeric", minute: "2-digit", ...(this.range === "week" ? { weekday: "short" } : {}) });
    const place = (s: string) => (s === "home" ? t("at_home") : s === "not_home" ? t("pmap_moving") : s);
    const kind = (s: string) => (s === "home" ? "home" : s === "not_home" ? "" : "zone");
    return html`
      <div class="bar">
        ${(["today", "yesterday", "week"] as Range[]).map(
          (r) => html`<button class="btn pressable ${this.range === r ? "primary" : ""}" @click=${() => ((this.range = r), this.load())}>${t(r === "today" ? "today" : r === "yesterday" ? "pmap_yesterday" : "pmap_week")}</button>`
        )}
        ${km >= 0.1 ? html`<span class="sum ltr">${ltr(`${formatNumber(km, lang, km < 10 ? 1 : 0)} km`)}</span>` : nothing}
      </div>
      <div class="map"></div>
      ${this.loading
        ? html`<div class="note">…</div>`
        : !this.fixes.length
          ? html`<div class="note">${t("pmap_no_gps")}</div>`
          : nothing}
      <div class="tl">
        ${[...this.visits]
          .map((v, i) => ({ v, i }))
          .reverse()
          .map(
            ({ v, i }) => html`<div class="v ${kind(v.state)} ${this.picked === i ? "on" : ""}" @click=${() => this.zoomTo(i)}>
              <i></i><b>${place(v.state)}</b><span class="ltr">${ltr(`${fmt(v.from)} – ${v.to >= Date.now() - 60_000 ? t("pmap_now") : fmt(v.to)}`)}</span>
            </div>`
          )}
      </div>
    `;
  }
}
