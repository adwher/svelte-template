<!--
  @component
  @name Title
  @description A title (h2) component for headings.
  @example
    <Title>Section Title</Title>
  @props
    - Inherits all HTML heading attributes.
-->

<script module lang="ts">
  import { cva } from "class-variance-authority";
  import type { HTMLAttributes } from "svelte/elements";

  export type TitleProps = HTMLAttributes<HTMLHeadElement>;

  export const createTitleStyle = cva([
    "text-xl md:text-2xl",
    "font-serif font-600 text-foreground-950",
    "tracking-wide text-balance",
  ]);
</script>

<script lang="ts">
  let { children, ...props }: TitleProps = $props();

  const classname = createTitleStyle({ class: props.class });
</script>

<h2 {...props} class={classname}>
  {@render children?.()}
</h2>
