<!--
  @component
  @name Dialog
  @description A dialog/modal component with size options and context binding.
  @example
    <Dialog context={dialogState} size="medium">
      <div>Dialog content</div>
    </Dialog>
  @props
    - context: Dialog state context.
-->

<script module lang="ts">
  import { cva } from "class-variance-authority";
  import type { HTMLAttributes } from "svelte/elements";

  import { FloatingDismissableState, type DialogState } from "$/shared/states";

  export interface DialogProps extends HTMLAttributes<HTMLDialogElement> {
    /**
     * The context of the Dialog.
     */
    context: DialogState;

    /**
     * Size of the dialog.
     * @default "small"
     */
    size?: "small" | "medium";
  }

  export const createDialogStyle = cva(
    ["w-full flex flex-col", " bg-paper", "absolute overflow-hidden"],
    {
      variants: {
        size: {
          small: ["max-w-lg shadow-lg rounded-md"],
          medium: ["max-w-2xl shadow-xl rounded-lg"],
        },
      },

      defaultVariants: {
        size: "small",
      },
    },
  );

  export const createDialogContentStyle = cva(["flex flex-col"], {
    variants: {
      size: {
        small: ["gap-4 p-4"],
        medium: ["gap-4 p-4"],
      },
    },

    defaultVariants: {
      size: "small",
    },
  });
</script>

<script lang="ts">
  import { scale } from "svelte/transition";

  import Backdrop from "./backdrop.svelte";

  let { context, size = "small", children, ...props }: DialogProps = $props();

  const dialogStyle = createDialogStyle({ class: props.class, size });
  const contentStyle = createDialogContentStyle({ class: props.class, size });

  const dismissable = new FloatingDismissableState(context);
</script>

{#if context.visible}
  <Backdrop {context}>
    <dialog
      {...props}
      {...dismissable}
      bind:this={context.binding}
      transition:scale={{ duration: 200, start: 0.85 }}
      class={dialogStyle}
    >
      <div class={contentStyle}>
        {@render children?.()}
      </div>
    </dialog>
  </Backdrop>
{/if}
