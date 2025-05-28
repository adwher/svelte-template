<!--
  @component
  @name MenuSection
  @description A section within a menu, optionally with a label.
  @example
    <MenuSection label="Section">
      <MenuButton>Item 1</MenuButton>
      <MenuButton>Item 2</MenuButton>
    </MenuSection>
  @props
    - label: Section label.
-->

<script module lang="ts">
  import { cva } from "class-variance-authority";
  import type { HTMLAttributes } from "svelte/elements";

  import Caption from "./caption.svelte";

  export interface MenuSectionProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * The label of the menu section.
     */
    label?: string;
  }

  export const createMenuSectionStyle = cva(["flex flex-col gap-2"]);
</script>

<script lang="ts">
  let { label, children, ...props }: MenuSectionProps = $props();

  const classname = createMenuSectionStyle({ class: props.class });
</script>

<div role="group" {...props} class={classname}>
  {#if label}
    <Caption color="disabled" class="px-2 py-1">{label}</Caption>
  {/if}

  {@render children?.()}
</div>
