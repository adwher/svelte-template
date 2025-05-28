import type { FloatingState } from "./floating.svelte";

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

export class FloatingDismissableState {
  constructor(
    private context: FloatingState,
    private options: FloatingDismissableOptions = {},
  ) {
    $effect(() => {
      if (!context.visible || !context.binding || !context.anchor) {
        return;
      }

      const listeners = new AbortController();

      document.addEventListener("keydown", this.onkeydown, { signal: listeners.signal });
      document.addEventListener("pointerdown", this.onblur, { signal: listeners.signal });

      return () => {
        listeners.abort();
      };
    });
  }

  onkeydown = (event: KeyboardEvent) => {
    if (!this.context.visible || this.options.preventOnEscape) {
      return;
    }

    if (event.key === "Escape") {
      this.context.hide();
    }
  };

  onblur = (event: PointerEvent | FocusEvent) => {
    if (!this.context.binding || this.options.preventOnBlur) {
      return;
    }

    const isAnchor =
      event.currentTarget === this.context.anchor ||
      this.context.anchor?.contains(event.target as Node);

    if (isAnchor && this.options.preventOnAnchor) {
      return;
    }

    const isSelf =
      event.currentTarget === this.context.binding || event.target === this.context.binding;

    const isNested = Boolean(this.context.binding.contains(event.target as Node));

    if (isSelf || isNested) {
      return;
    }

    this.context.hide();
  };
}
