<!--
  @component
  @name Label
  @description A styled label for form fields.
  @example
    <Label for="username">Username</Label>
  @props
    - Inherits all HTML label attributes.
-->

<script module lang="ts">
  import { cva } from "class-variance-authority";
  import type { HTMLLabelAttributes } from "svelte/elements";

  export type LabelProps = HTMLLabelAttributes;

  export const createLabelStyle = cva("text-sm text-paragraph");
</script>

<script lang="ts">
  let { children, ...props }: LabelProps = $props();

  const classname = createLabelStyle({ class: props.class });
</script>

<label {...props} class={classname}>
  {@render children?.()}
</label>
