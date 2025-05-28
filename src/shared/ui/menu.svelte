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
  import { fly, type FlyParams } from "svelte/transition";

  import { makeDismissable } from "$/shared/lib/floating-dismissable";

  import { MenuState } from "$/shared/lib/menu-state.svelte";

  export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * The context of the menu.
     */
    floating: MenuState;
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
  let { floating, children, ...props }: MenuProps = $props();

  const classname = $derived(createMenuStyle({ class: props.class }));

  const animation: FlyParams = $derived.by(() => {
    const [axis] = floating.placement.split("-");

    const x = axis === "left" ? 6 : axis === "right" ? -6 : 0;
    const y = axis === "top" ? 6 : axis === "bottom" ? -6 : 0;

    return { x, y, duration: 200 };
  });
</script>

{#if floating.visible}
  <div
    role="menu"
    {...props}
    {@attach floating.to()}
    {@attach makeDismissable(floating, { preventOnAnchor: true })}
    transition:fly={animation}
    class={classname}
  >
    {@render children?.()}
  </div>
{/if}
