import type { FlyParams } from "svelte/transition";

import type { FloatingState } from "./floating.svelte";

export interface FloatingAnimationStateOptions {
  /**
   * The duration of the animation in milliseconds.
   * @default 200
   */
  duration?: number;

  /**
   * The offset to move the floating element.
   * @default 6
   */
  offset?: number;
}

/** Direction where the floating element is moving. */
export type FloatingAnimationDirection = "top" | "bottom" | "left" | "right";

/**
 * Represents the state and behavior of a floating animation.
 * This class is used to manage the animation parameters and calculate the movement offsets for a floating element based on its context and placement to be used with `fly` transition.
 */
export class FloatingAnimationState implements FlyParams {
  #context: FloatingState;

  /** The offset to move the floating element. */
  #offset: number = 6;

  /** The duration of the animation in milliseconds. */
  duration: number;

  constructor(
    context: FloatingState,
    { duration = 200, offset = 6 }: FloatingAnimationStateOptions = {},
  ) {
    this.#context = context;
    this.#offset = offset;

    this.duration = duration;
  }

  /**
   * The direction of the floating animation based on the placement.
   * @derived
   */
  readonly direction = $derived.by(() => {
    const [axis] = this.#context.placement.split("-");
    return axis as FloatingAnimationDirection;
  });

  /**
   * The `x` offset to move the floating element.
   * @derived
   */
  readonly x = $derived(
    this.direction === "left" ? this.#offset : this.direction === "right" ? -this.#offset : 0,
  );

  /**
   * The `y` offset to move the floating element.
   * @derived
   */
  readonly y = $derived(
    this.direction === "top" ? this.#offset : this.direction === "bottom" ? -this.#offset : 0,
  );
}
