<!-- @component
  @name Dropdown
  @description A dropdown menu component that can be used to create a dropdown button with a menu.
  @example
    <Dropdown>
      Dropdown

      {#snippet menu()}
        Menu
      {/snippet}
    </Dropdown>
  @props
    - placement: The placement of the floating element relative to the anchor.
    - margin: The margin between the anchor, the border of the screen and the floating element.
  -->

<script module lang="ts">
  import type { Snippet } from "svelte";

  import type { FloatingPlacement } from "$/shared/states";

  import type { ButtonProps } from "./button.svelte";

  export interface DropdownProps extends Omit<ButtonProps, "href"> {
    /**
     * The placement of the floating element relative to the anchor.
     * @default "bottom"
     */
    placement?: FloatingPlacement;

    /**
     * The margin between the anchor, the border of the screen and the floating element.
     * @default 5
     */
    margin?: number;

    /**
     * The content of the dropdown menu.
     */
    menu: Snippet<[MenuState]>;
  }
</script>

<script lang="ts">
  import { MenuState } from "$/shared/states";

  import Button from "./button.svelte";
  import Menu from "./menu.svelte";

  let { menu, children, placement = "bottom", margin = 5, ...props }: DropdownProps = $props();

  const context = new MenuState({ placement, margin });
</script>

<Button {...props} onclick={context.toggle}>
  {@render children?.()}
</Button>

<Menu {context}>
  {@render menu(context)}
</Menu>
