import type { Attachment } from "svelte/attachments";
import { on } from "svelte/events";

import type { FloatingState } from "./floating-state.svelte";

export interface FloatingDismissableOptions {
  /**
   * Prevents the floating element from being dismissed when the `Escape` key is pressed.
   * @default false
   */
  preventOnEscape?: boolean;

  /**
   * Prevents the floating element from being dismissed when a click occurs outside of it.
   * @default false
   */
  preventOnBlur?: boolean;

  /**
   * Prevents the floating element from being dismissed when a click occurs on the anchor element.
   * @default false
   */
  preventOnAnchor?: boolean;
}

/**
 * Creates an attachment for a floating element that handles dismissing the element based on keyboard and pointer events, respecting various prevention options.
 *
 * @param {FloatingState} floating - The floating state to control.
 * @param {FloatingDismissableOptions} options - Options to control dismiss behavior.
 * @returns An attachment function for Svelte components.
 */
export function makeDismissable(
  floating: FloatingState,
  {
    preventOnEscape = false,
    preventOnBlur = false,
    preventOnAnchor = false,
  }: FloatingDismissableOptions = {},
): Attachment<HTMLElement> {
  return (node) => {
    const listeners = new AbortController();

    const onkeydown = (event: KeyboardEvent) => {
      if (!floating.visible || preventOnEscape) {
        return;
      }

      if (event.key === "Escape") {
        floating.hide();
      }
    };

    const onblur = (event: FocusEvent | PointerEvent) => {
      if (preventOnBlur) {
        return;
      }

      const target = event.target as Node;

      const isAnchor = floating.anchor?.contains(target);
      const isNested = node.contains(target);

      if ((isAnchor && preventOnAnchor) || isNested) {
        return;
      }

      floating.hide();
    };

    on(document, "keydown", onkeydown, { signal: listeners.signal });
    on(document, "pointerdown", onblur, { signal: listeners.signal });

    return () => {
      listeners.abort();
    };
  };
}
