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

  import { makeDismissable } from "$/shared/lib/floating-dismissable";

  import { DialogState } from "$/shared/lib/dialog-state.svelte";

  export interface DialogProps extends HTMLAttributes<HTMLDialogElement> {
    /**
     * The context of the Dialog.
     */
    floating: DialogState;

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
          small: ["max-w-lg shadow-lg rounded-lg"],
          medium: ["max-w-2xl shadow-xl rounded-xl"],
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

  let { floating, size = "small", children, ...props }: DialogProps = $props();

  const dialogStyle = $derived(createDialogStyle({ class: props.class, size }));
  const contentStyle = $derived(createDialogContentStyle({ class: props.class, size }));
</script>

{#if floating.visible}
  <Backdrop context={floating}>
    <dialog
      {...props}
      {@attach floating.to()}
      {@attach makeDismissable(floating)}
      transition:scale={{ duration: 200, start: 0.9 }}
      class={dialogStyle}
    >
      <div class={contentStyle}>
        {@render children?.()}
      </div>
    </dialog>
  </Backdrop>
{/if}
