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

  import { MenuState, FloatingAnimationState, FloatingDismissableState } from "$/shared/states";

  export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * The context of the menu.
     */
    context: MenuState;
  }

  export const createMenuStyle = cva([
    "absolute z-2",
    "flex flex-col gap-2 p-2",
    "ring-1 ring-inset ring-foreground-800/20",
    "shadow-md shadow-foreground-800/10",
    "bg-paper rounded-lg",
  ]);
</script>

<script lang="ts">
  let { context, children, ...props }: MenuProps = $props();

  const classname = createMenuStyle({ class: props.class });

  const dismissable = new FloatingDismissableState(context, { preventOnAnchor: true });
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
