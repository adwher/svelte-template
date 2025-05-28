<!--
  @component
  @name Subtitle
  @description A subtitle (h3) component for headings.
  @example
    <Subtitle>Section Subtitle</Subtitle>
  @props
    - Inherits all HTML heading attributes.
-->

<script module lang="ts">
  import { cva } from "class-variance-authority";
  import type { HTMLAttributes } from "svelte/elements";

  export type SubtitleProps = HTMLAttributes<HTMLHeadElement>;

  export const createSubtitleStyle = cva([
    "text-base md:text-lg",
    "font-serif font-300 text-foreground-900",
    "tracking-wide text-balance",
  ]);
</script>

<script lang="ts">
  let { children, ...props }: SubtitleProps = $props();

  const classname = createSubtitleStyle({ class: props.class });
</script>

<h3 {...props} class={classname}>
  {@render children?.()}
</h3>
