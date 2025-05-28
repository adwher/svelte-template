<!--
  @component
  @name Caption
  @description A caption text component for small or disabled text.
  @example
    <Caption color="disabled">Disabled caption</Caption>
  @props
    - color: "inherit" or "disabled". Default: "inherit".
-->

<script module lang="ts">
  import { cva } from "class-variance-authority";
  import type { HTMLAttributes } from "svelte/elements";

  export interface CaptionProps extends HTMLAttributes<HTMLSpanElement> {
    /**
     * Color of the caption.
     * @default "disabled"
     */
    color?: "inherit" | "disabled";
  }

  export const createCaptionStyle = cva("text-sm", {
    variants: {
      color: {
        inherit: [],
        disabled: "text-disabled",
      },
    },

    defaultVariants: {
      color: "inherit",
    },
  });
</script>

<script lang="ts">
  let { color = "inherit", children, ...props }: CaptionProps = $props();

  const classname = createCaptionStyle({ color, class: props.class });
</script>

<span {...props} class={classname}>
  {@render children?.()}
</span>
