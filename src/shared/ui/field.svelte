<!-- @component
  @name Field
  @description A component that wraps a label and its associated input elements, providing a consistent layout and styling.
  @example
    <Field label="Username">
      <Input type="text" placeholder="Enter your username" />
    </Field>
  @props
    - label: The label for the field.
    - horizontal: Whether the field should be displayed horizontally.
    - fullwidth: Whether the field should take up the full width of the container.
-->

<script module lang="ts">
  import { cva } from "class-variance-authority";
  import type { HTMLAttributes } from "svelte/elements";

  export interface FieldProps extends HTMLAttributes<HTMLElement> {
    /**
     * The label for the field.
     */
    label?: string;

    /**
     * Whether the field should be displayed horizontally.
     * @default false
     */
    horizontal?: boolean;

    /**
     * Whether the field should take up the full width of the container.
     * @default false
     */
    fullwidth?: boolean;
  }

  export const createFieldStyle = cva("inline-flex gap-2", {
    variants: {
      horizontal: {
        true: "flex-row items-center",
        false: "flex-col",
      },

      fullwidth: {
        true: "w-full",
      },
    },
  });
</script>

<script lang="ts">
  import { createLabelStyle } from "./label.svelte";

  let { label, horizontal = false, fullwidth = false, children, ...props }: FieldProps = $props();

  const tag = $derived(label ? "label" : "div");

  const labelStyle = createLabelStyle();
  const fieldStyle = createFieldStyle({ horizontal, fullwidth, class: props.class });
</script>

<svelte:element this={tag} {...props} class={fieldStyle}>
  {#if label}
    <span class={labelStyle}>{label}</span>
  {/if}

  {@render children?.()}
</svelte:element>
