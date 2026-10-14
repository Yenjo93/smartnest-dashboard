import type { TemplateResult } from "lit";
import type { DashboardConfig, Hass, Lang } from "./types";
import type { Translate } from "./i18n";
import type { Feature, Plan } from "./plans";

export interface SheetSpec {
  title?: string;
  render: (ctx: Ctx) => TemplateResult;
  /** The tile or marker it was opened from: the sheet grows out of it and shrinks back into it. */
  origin?: Element;
  /** Called when the sheet is dismissed by the scrim, Esc, or the close button. */
  onClose?: () => void;
  /**
   * Settings and pickers: redrawn when the dashboard's setup changes, not on every device update in the house.
   * On a big house the states change many times a second, and redrawing a long settings sheet each time is slow.
   */
  still?: boolean;
}

/** Everything a component needs, handed down as one object. A new object is made on every change. */
export interface Ctx {
  hass: Hass;
  config: DashboardConfig;
  lang: Lang;
  rtl: boolean;
  t: Translate;
  dark: boolean;
  narrow: boolean;
  isAdmin: boolean;
  editing: boolean;
  assetBase: string;
  plan: Plan;
  /** Whether this house's plan includes a feature. */
  allows(feature: Feature): boolean;
  /** Mutates the draft config while editing. */
  update(fn: (draft: DashboardConfig) => void): void;
  openEntity(entityId: string, origin?: Element): void;
  showSheet(spec: SheetSpec): void;
  closeSheet(): void;
  toast(message: string): void;
  /** Full-screen moment after a house mode is triggered. */
  cinematic(mode: string): void;
}
