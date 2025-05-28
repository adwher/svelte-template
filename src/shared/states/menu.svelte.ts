import { flip, inline, offset, shift } from "@floating-ui/dom";

import {
  FloatingState,
  type FloatingPlacement,
  type FloatingStateOptions,
} from "./floating.svelte";

export interface MenuStateOptions extends Omit<FloatingStateOptions, "middlewares"> {
  /**
   * The placement of the floating element relative to the anchor.
   * @default "bottom"
   */
  placement?: FloatingPlacement;

  /**
   * The margin between the anchor, the border of the screen and the floating element.
   * @default 6
   */
  margin?: number;
}

/**
 * Represents the state of a menu component that extends the functionality of a floating UI element.
 * This class provides configuration for the menu's placement, margin, and middleware behavior.
 */
export class MenuState extends FloatingState {
  /** The margin between the anchor, the border of the screen and the floating element. */
  readonly margin: number = 6;

  constructor({ margin = 6, placement = "bottom" }: MenuStateOptions = {}) {
    super({
      placement,
      middlewares: [
        inline(),
        flip({ padding: margin }),
        shift({ padding: margin }),
        offset(margin),
      ],
    });

    this.margin = margin;
  }
}
