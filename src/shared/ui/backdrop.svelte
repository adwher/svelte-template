<!--
  @component
  @name Backdrop
  @description A backdrop overlay, typically used behind dialogs or modals.
  @example
    <Backdrop context={floatingState}>
      <div>Modal content</div>
    </Backdrop>
  @props
    - context: Floating state context for positioning and binding.
-->

<script module lang="ts">
  import { cva } from "class-variance-authority";
  import type { HTMLAttributes } from "svelte/elements";

  import type { FloatingState } from "$/shared/states";

  export interface BackdropProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * The context of the backdrop.
     */
    context: FloatingState;
  }

  export const createBackdropStyle = cva(["fixed inset-0 flex bg-black/30 z-5"]);
</script>

<script lang="ts">
  import { fade } from "svelte/transition";

  let { context, children, ...props }: BackdropProps = $props();

  const classname = createBackdropStyle({ class: props.class });
</script>

<div {...props} class={classname} bind:this={context.anchor} transition:fade={{ duration: 200 }}>
  {@render children?.()}
</div>
