<!--
  @component
  @name Menu
  @description A floating menu component with dismiss and animation support.
  @example
    <Menu context={menuState}>
      <MenuButton>Option 1</MenuButton>
      <MenuButton>Option 2</MenuButton>
    </Menu>
  @props
    - context: Menu state context.
-->

<script module lang="ts">
  import { cva } from "class-variance-authority";
  import type { HTMLAttributes } from "svelte/elements";
  import { fly } from "svelte/transition";

  import { useFloatingDismissable } from "$lib/hooks.ts";
  import { MenuState, FloatingAnimationState } from "$lib/states.ts";

  export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * The context of the menu.
     */
    context: MenuState;
  }

  export const createMenuStyle = cva([
    "absolute z-2",
    "flex flex-col gap-2 p-2",
    "border border-solid border-gray-200",
    "bg-paper rounded-md shadow-md",
  ]);
</script>

<script lang="ts">
  let { context, children, ...props }: MenuProps = $props();

  const classname = createMenuStyle({ class: props.class });
  const dismissable = useFloatingDismissable(context, { preventOnAnchor: true });

  const animation = new FloatingAnimationState(context, { offset: context.margin });
</script>

{#if context.visible}
  <div
    role="menu"
    {...props}
    {...dismissable}
    bind:this={context.binding}
    transition:fly={animation}
    class={classname}
  >
    {@render children?.()}
  </div>
{/if}
