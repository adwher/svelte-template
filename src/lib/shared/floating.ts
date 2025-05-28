import { offset, type Middleware } from "@floating-ui/core";

/**
 * Creates a middleware function that adjusts the position of a floating element to ensure it is placed inside a specified margin relative to its reference element.
 *
 * @param padding - The distance in pixels to maintain between the floating element and the edges of the reference element.
 * @returns A middleware function that calculates the `mainAxis` and `crossAxis` offsets based on the placement of the floating element and the provided margin.
 */
export function inside(padding: number = 0): Middleware {
  return offset(({ placement, rects }) => {
    let crossAxis = 0;

    const isVertical = placement.startsWith("top") || placement.startsWith("bottom");
    const isStart = placement.endsWith("start");
    const isEnd = placement.endsWith("end");

    const floatingSize = rects.floating[isVertical ? "height" : "width"];
    const mainAxis = -floatingSize - padding;

    if (isStart) {
      crossAxis = padding;
    }

    if (isEnd) {
      crossAxis = -padding;
    }

    return {
      mainAxis,
      crossAxis,
    };
  });
}
