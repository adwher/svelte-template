<!--
  @component
  @name Heading
  @description A large heading (h1) component.
  @example
    <Heading>Main Title</Heading>
  @props
    - Inherits all HTML heading attributes.
-->

<script module lang="ts">
  import { cva } from "class-variance-authority";
  import type { HTMLAttributes } from "svelte/elements";

  export type HeadingProps = HTMLAttributes<HTMLHeadElement>;

  export const createHeadingStyle = cva([
    "text-3xl md:text-4xl",
    "font-heading font-750 text-foreground-950",
    "tracking-normal text-balance",
  ]);
</script>

<script lang="ts">
  let { children, ...props }: HeadingProps = $props();

  const classname = createHeadingStyle({ class: props.class });
</script>

<h1 {...props} class={classname}>
  {@render children?.()}
</h1>
