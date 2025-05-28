import type { FloatingState } from "$lib/states.ts";

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
 * A custom hook that provides dismissable functionality for a floating element.
 * It listens for `keydown` and `pointerdown` events to hide the floating element when the Escape key is pressed or when a click occurs outside the element.
 *
 * @param {FloatingState} context - The state object for the floating element.
 * @returns An object containing the `onkeydown` event handler.
 */
export function useFloatingDismissable(
  context: FloatingState,
  {
    preventOnEscape = false,
    preventOnBlur = false,
    preventOnAnchor = false,
  }: FloatingDismissableOptions = {},
) {
  const onkeydown = (event: KeyboardEvent) => {
    if (!context.visible || preventOnEscape) {
      return;
    }

    if (event.key === "Escape") {
      context.hide();
    }
  };

  const onblur = (event: PointerEvent | FocusEvent) => {
    if (!context.binding || preventOnBlur) {
      return;
    }

    const isAnchor =
      event.currentTarget === context.anchor || context.anchor?.contains(event.target as Node);

    if (isAnchor && preventOnAnchor) {
      return;
    }

    const isSelf = event.currentTarget === context.binding || event.target === context.binding;
    const isNested = Boolean(context.binding.contains(event.target as Node));

    if (isSelf || isNested) {
      return;
    }

    context.hide();
  };

  $effect(() => {
    if (!context.visible || !context.binding || !context.anchor) {
      return;
    }

    const listeners = new AbortController();

    document.addEventListener("keydown", onkeydown, { signal: listeners.signal });
    document.addEventListener("pointerdown", onblur, { signal: listeners.signal });

    return () => {
      listeners.abort();
    };
  });

  return {
    onkeydown,
    onblur,
  };
}
