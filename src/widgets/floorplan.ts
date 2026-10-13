import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { DashboardConfig, Floor, Marker, Widget } from "../types";
import { toneStyle, domainOf, entityIcon, entityName, isActive, runTap, shortValue, tapKind } from "../entities";
import { findWidget, newFloor, uid, uploadImage } from "../config";
import { shared } from "../theme";
import "../ui/icon";
import "../ui/entity-picker";

interface Drag {
  id: string;
  pointerId: number;
  startX: number;
  startY: number;
  origX: number;
  origY: number;
  x: number;
  y: number;
  moved: boolean;
}

/**
 * The uploaded plan with devices pinned on it. Marker positions are stored as percentages of the image,
 * so they stay put on any screen size, and the stage is always LTR: the kitchen doesn't move in Arabic.
 */
@customElement("sn-w-floorplan")
export class SnFloorplan extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  @state() private floorIdx = 0;
  @state() private selected?: string;
  @state() private drag?: Drag;
  @state() private natural?: { w: number; h: number };
  @state() private area = { w: 0, h: 0 };
  @state() private uploading = false;
  private ro?: ResizeObserver;
  private press?: { id: string; x: number; y: number; timer: number };

  static styles = [
    shared,
    css`
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
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.ro = new ResizeObserver(() => this.measure());
    this.updateComplete.then(() => {
      const area = this.renderRoot.querySelector(".area");
      if (area) this.ro!.observe(area);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.ro?.disconnect();
  }

  private measure() {
    const area = this.renderRoot.querySelector<HTMLElement>(".area");
    if (!area) return;
    const cs = getComputedStyle(area);
    const padX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
    const padY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
    const w = area.clientWidth - padX;
    const h = area.clientHeight - padY;
    if (w !== this.area.w || h !== this.area.h) this.area = { w, h };
  }

  private get floors(): Floor[] {
    return (this.widget.config.floors as Floor[]) ?? [];
  }

  private get floor(): Floor | undefined {
    return this.floors[Math.min(this.floorIdx, this.floors.length - 1)];
  }

  /** Edits this widget's floors inside the draft config. */
  private edit(fn: (floors: Floor[], floor: Floor | undefined, draft: DashboardConfig) => void) {
    const idx = Math.min(this.floorIdx, this.floors.length - 1);
    this.ctx.update((draft) => {
      const w = findWidget(draft, this.widget.id);
      if (!w) return;
      w.config.floors ??= [];
      fn(w.config.floors, w.config.floors[idx], draft);
    });
  }

  protected willUpdate(changed: Map<string, unknown>) {
    if (changed.has("ctx") && !this.ctx.editing) {
      this.selected = undefined;
    }
    this.toggleAttribute("editing", this.ctx.editing);
    this.toggleAttribute("narrow", this.ctx.narrow);
    this.toggleAttribute("dark", this.ctx.dark);
  }

  // ---- pointer handling ----

  private onDown(e: PointerEvent, m: Marker) {
    if (e.button !== 0) return;
    e.stopPropagation();
    if (this.ctx.editing) {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      this.selected = m.id;
      this.drag = { id: m.id, pointerId: e.pointerId, startX: e.clientX, startY: e.clientY, origX: m.x, origY: m.y, x: m.x, y: m.y, moved: false };
      return;
    }
    window.clearTimeout(this.press?.timer);
    this.press = {
      id: m.id,
      x: e.clientX,
      y: e.clientY,
      timer: window.setTimeout(() => {
        this.press = undefined;
        navigator.vibrate?.(8);
        this.ctx.openEntity(m.entity);
      }, 450),
    };
  }

  private onMove(e: PointerEvent) {
    if (this.drag && e.pointerId === this.drag.pointerId) {
      const stage = this.stageSize();
      const dx = ((e.clientX - this.drag.startX) / stage.w) * 100;
      const dy = ((e.clientY - this.drag.startY) / stage.h) * 100;
      const moved = this.drag.moved || Math.hypot(e.clientX - this.drag.startX, e.clientY - this.drag.startY) > 3;
      this.drag = {
        ...this.drag,
        moved,
        x: Math.min(100, Math.max(0, this.drag.origX + dx)),
        y: Math.min(100, Math.max(0, this.drag.origY + dy)),
      };
      return;
    }
    if (this.press && Math.hypot(e.clientX - this.press.x, e.clientY - this.press.y) > 10) {
      window.clearTimeout(this.press.timer);
      this.press = undefined;
    }
  }

  private onUp(e: PointerEvent, m: Marker) {
    if (this.drag && e.pointerId === this.drag.pointerId) {
      const { x, y, moved } = this.drag;
      this.drag = undefined;
      if (moved)
        this.edit((_f, floor) => {
          const mk = floor?.markers.find((k) => k.id === m.id);
          if (mk) Object.assign(mk, { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 });
        });
      return;
    }
    if (this.press?.id === m.id) {
      window.clearTimeout(this.press.timer);
      this.press = undefined;
      this.tap(m);
    }
  }

  private onCancel() {
    window.clearTimeout(this.press?.timer);
    this.press = undefined;
    this.drag = undefined;
  }

  private tap(m: Marker) {
    const e = this.ctx.hass.states[m.entity];
    if (!e || e.state === "unavailable" || tapKind(m.entity) === "sheet") return this.ctx.openEntity(m.entity);
    navigator.vibrate?.(5);
    runTap(this.ctx.hass, e).catch(() => this.ctx.toast(this.ctx.t("error")));
  }

  private stageSize() {
    const ratio = this.natural ? this.natural.w / this.natural.h : 16 / 10;
    if (this.ctx.narrow) return { w: this.area.w, h: this.area.w / ratio };
    let w = this.area.w;
    let h = w / ratio;
    if (h > this.area.h) {
      h = this.area.h;
      w = h * ratio;
    }
    return { w: Math.max(w, 0), h: Math.max(h, 0) };
  }

  // ---- edit actions ----

  private addFloor() {
    const n = this.floors.length + 1;
    this.edit((floors) => floors.push(newFloor(`${this.ctx.t("floor")} ${n}`)));
    this.floorIdx = this.floors.length; // the new floor, once the update lands
    this.natural = undefined;
  }

  private floorSheet() {
    const { t } = this.ctx;
    const floor = this.floor;
    if (!floor) return;
    this.ctx.showSheet({
      title: t("floor"),
      render: (ctx) => html`
        <div style="display:grid;gap:16px">
          <label class="field"
            >${t("floor_name")}
            <input
              type="text"
              .value=${floor.name}
              @change=${(e: any) => this.edit((_f, fl) => fl && (fl.name = e.target.value.trim() || floor.name))}
            />
          </label>
          ${this.floors.length > 1
            ? html`<button
                class="btn danger pressable"
                @click=${() => {
                  if (!confirm(t("delete_confirm"))) return;
                  const idx = this.floorIdx;
                  this.edit((floors) => floors.splice(idx, 1));
                  this.floorIdx = Math.max(0, idx - 1);
                  ctx.closeSheet();
                }}
              >
                <sn-icon icon="delete"></sn-icon>${t("delete_floor")}
              </button>`
            : nothing}
        </div>
      `,
    });
  }

  private pickFile() {
    this.renderRoot.querySelector<HTMLInputElement>("input[type=file]")?.click();
  }

  private async onFile(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = "";
    if (!file) return;
    this.uploading = true;
    try {
      const url = await uploadImage(this.ctx.hass, file);
      this.natural = undefined;
      this.edit((_f, floor) => floor && (floor.image = url));
    } catch {
      this.ctx.toast(this.ctx.t("upload_failed"));
    } finally {
      this.uploading = false;
    }
  }

  private addDevice() {
    this.ctx.showSheet({
      title: this.ctx.t("add_device"),
      render: (ctx) => html`<sn-entity-picker
        .ctx=${ctx}
        .onPick=${(entity: string) => {
          const id = uid();
          const display = ["sensor", "climate"].includes(domainOf(entity)) ? "value" : "icon";
          this.edit((_f, floor) => floor?.markers.push({ id, entity, x: 50, y: 50, display }));
          this.selected = id;
          ctx.closeSheet();
        }}
      ></sn-entity-picker>`,
    });
  }

  private renameDevice(m: Marker) {
    const { t } = this.ctx;
    this.ctx.showSheet({
      title: t("display_name"),
      render: (ctx) => html`<label class="field"
        >${entityName(ctx.hass, ctx.config, m.entity)}
        <input
          type="text"
          .value=${ctx.config.names[m.entity] ?? ""}
          placeholder=${ctx.hass.states[m.entity]?.attributes.friendly_name ?? m.entity}
          @change=${(e: any) =>
            ctx.update((d) => {
              const v = e.target.value.trim();
              if (v) d.names[m.entity] = v;
              else delete d.names[m.entity];
            })}
        />
        <span class="hint">${t("display_name_hint")}</span>
      </label>`,
    });
  }

  // ---- render ----

  private renderMarker(m: Marker) {
    const { ctx } = this;
    const e = ctx.hass.states[m.entity];
    const on = isActive(e);
    const dragging = this.drag?.id === m.id;
    const x = dragging ? this.drag!.x : m.x;
    const y = dragging ? this.drag!.y : m.y;
    const motion = on && domainOf(m.entity) === "binary_sensor" && ["motion", "occupancy", "presence"].includes(e?.attributes.device_class);
    const cls = [
      "marker",
      on ? "on" : "",
      motion ? "pulse" : "",
      !e || e.state === "unavailable" ? "dim" : "",
      ctx.editing ? "editable" : "",
      dragging ? "dragging" : "",
      this.selected === m.id && ctx.editing ? "selected" : "",
    ].join(" ");
    return html`<div
      class=${cls}
      style="left:${x}%;top:${y}%;${toneStyle(e)}"
      role="button"
      tabindex="0"
      aria-label=${entityName(ctx.hass, ctx.config, m.entity)}
      @pointerdown=${(ev: PointerEvent) => this.onDown(ev, m)}
      @pointermove=${(ev: PointerEvent) => this.onMove(ev)}
      @pointerup=${(ev: PointerEvent) => this.onUp(ev, m)}
      @pointercancel=${() => this.onCancel()}
      @contextmenu=${(ev: Event) => ev.preventDefault()}
      @keydown=${(ev: KeyboardEvent) => ev.key === "Enter" && !ctx.editing && this.tap(m)}
    >
      <span class="ic"><sn-icon .icon=${entityIcon(e, m.entity)}></sn-icon></span>
      ${m.display === "value" ? html`<span class="val">${shortValue(ctx.t, e, ctx.lang)}</span>` : nothing}
      ${ctx.editing && this.selected === m.id && !dragging
        ? html`<span class="tag">${entityName(ctx.hass, ctx.config, m.entity)}</span>`
        : nothing}
    </div>`;
  }

  private renderTools() {
    const { ctx } = this;
    const { t } = ctx;
    const floor = this.floor;
    const sel = floor?.markers.find((m) => m.id === this.selected);
    if (sel)
      return html`<div class="tools glass" @pointerdown=${(e: Event) => e.stopPropagation()}>
        <span class="label">${entityName(ctx.hass, ctx.config, sel.entity)}</span>
        <div class="seg">
          ${(["icon", "value"] as const).map(
            (d) => html`<button
              aria-pressed=${sel.display === d}
              @click=${() => this.edit((_f, fl) => {
                const mk = fl?.markers.find((k) => k.id === sel.id);
                if (mk) mk.display = d;
              })}
            >
              ${t(d === "icon" ? "show_icon" : "show_value")}
            </button>`
          )}
        </div>
        <button class="icon-btn pressable" aria-label=${t("display_name")} @click=${() => this.renameDevice(sel)}>
          <sn-icon icon="pencil" style="--icon-size:20px"></sn-icon>
        </button>
        <button
          class="icon-btn pressable"
          aria-label=${t("delete")}
          @click=${() => {
            this.edit((_f, fl) => fl && (fl.markers = fl.markers.filter((k) => k.id !== sel.id)));
            this.selected = undefined;
          }}
        >
          <sn-icon icon="delete" style="--icon-size:20px"></sn-icon>
        </button>
        <button class="icon-btn primary pressable" aria-label=${t("done")} @click=${() => (this.selected = undefined)}>
          <sn-icon icon="check" style="--icon-size:20px"></sn-icon>
        </button>
      </div>`;
    return html`<div class="tools glass" @pointerdown=${(e: Event) => e.stopPropagation()}>
      <button class="btn pressable" ?disabled=${this.uploading} @click=${() => this.pickFile()}>
        <sn-icon icon="image-plus" style="--icon-size:20px"></sn-icon>
        ${this.uploading ? t("loading") : floor?.image ? t("replace_plan") : t("upload_plan")}
      </button>
      <button class="btn primary pressable" ?disabled=${!floor?.image} @click=${() => this.addDevice()}>
        <sn-icon icon="marker-plus" style="--icon-size:20px"></sn-icon>${t("add_device")}
      </button>
      <input type="file" accept="image/png,image/jpeg,image/webp" @change=${this.onFile} />
    </div>`;
  }

  render() {
    const { ctx } = this;
    const { t } = ctx;
    const floor = this.floor;
    const floors = this.floors;
    const stage = this.stageSize();
    const ratio = this.natural ? this.natural.w / this.natural.h : 16 / 10;
    return html`<div class="wrap glass">
      ${floors.length > 1 || ctx.editing
        ? html`<div class="floors" @pointerdown=${(e: Event) => e.stopPropagation()}>
            <div class="seg">
              ${floors.map(
                (f, i) => html`<button
                  aria-pressed=${i === this.floorIdx}
                  @click=${() => {
                    if (i === this.floorIdx && ctx.editing) return this.floorSheet();
                    this.floorIdx = i;
                    this.selected = undefined;
                    this.natural = undefined;
                  }}
                >
                  <sn-icon icon="layers" style="--icon-size:16px"></sn-icon>${f.name}
                </button>`
              )}
              ${ctx.editing
                ? html`<button aria-label=${t("add_floor")} @click=${() => this.addFloor()}>
                    <sn-icon icon="plus" style="--icon-size:18px"></sn-icon>
                  </button>`
                : nothing}
            </div>
          </div>`
        : nothing}
      <div class="area" style=${ctx.narrow ? `aspect-ratio:${ratio}` : ""}>
        ${floor?.image
          ? html`<div class="stage" style="width:${stage.w}px;height:${stage.h}px">
              <img
                class=${this.widget.config.invert_dark ? "plan-light" : ""}
                src=${floor.image}
                alt=""
                @load=${(e: Event) => {
                  const img = e.target as HTMLImageElement;
                  this.natural = { w: img.naturalWidth, h: img.naturalHeight };
                  this.measure();
                }}
              />
              ${floor.markers.map((m) => this.renderMarker(m))}
            </div>`
          : html`<div class="empty">
              <sn-icon icon="image"></sn-icon>
              <strong>${t("no_plan")}</strong>
              ${ctx.isAdmin && !ctx.editing ? html`<span>${t("no_plan_admin")}</span>` : nothing}
            </div>`}
      </div>
      ${ctx.editing && floor ? this.renderTools() : nothing}
    </div>`;
  }
}
