import type { TemplateResult } from "lit";
import type { DashboardConfig, Hass, Lang } from "./types";
import type { Translate } from "./i18n";

export interface SheetSpec {
  title?: string;
  render: (ctx: Ctx) => TemplateResult;
  /** Called when the sheet is dismissed by the scrim, Esc, or the close button. */
  onClose?: () => void;
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
  /** Mutates the draft config while editing. */
  update(fn: (draft: DashboardConfig) => void): void;
  openEntity(entityId: string): void;
  showSheet(spec: SheetSpec): void;
  closeSheet(): void;
  toast(message: string): void;
}
