<!--
  @component
  @name MenuButton
  @description A button styled for use in menus.
  @example
    <MenuButton>Menu Item</MenuButton>
-->

<script lang="ts" module>
  import type { ButtonProps } from "./button.svelte";

  export type MenuButtonProps = Omit<ButtonProps, "align" | "variant">;
</script>

<script lang="ts">
  import Button from "./button.svelte";

  let props: MenuButtonProps = $props();
</script>

<Button role="menuitem" {...props} align="left" variant="text">
  {@render props.children?.()}
</Button>
