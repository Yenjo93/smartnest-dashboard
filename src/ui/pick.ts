import { html } from "lit";
import type { Ctx } from "../ctx";
import type { EntityFilter } from "../entities";
import "./entity-picker";

/** Opens the device list (with search) and hands back the chosen one: for widgets that pick their device in place. */
export function pickEntity(ctx: Ctx, title: string, filter: EntityFilter, onPick: (id: string) => void) {
  ctx.showSheet({
    still: true,
    title,
    render: (c) => html`<sn-entity-picker
      .ctx=${c}
      .filter=${filter}
      .onPick=${(id: string) => {
        onPick(id);
        c.closeSheet();
      }}
    ></sn-entity-picker>`,
  });
}
