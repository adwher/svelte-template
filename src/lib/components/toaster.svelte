<!--
  @component
  @name Toaster
  @description A container for displaying toast notifications.
  @props
    - Uses global `toaster` state for toasts.
-->

<script lang="ts">
  import { cva } from "class-variance-authority";
  import { flip } from "svelte/animate";
  import { scale } from "svelte/transition";

  import { toaster } from "$lib/states.ts";

  import Caption from "./caption.svelte";

  const createToastStyle = cva([
    "flex items-center gap-2",
    "px-3 py-2 max-w-lg rounded-sm",
    "bg-gray-900 text-gray-200",
    "overflow-hidden pointer-events-auto origin-bottom-center",
  ]);

  const createToastButtonStyle = cva([
    "p-0 border-none bg-transparent font-serif",
    "text-sm rounded-md cursor-pointer",
    "transition-colors hover:(text-gray-100)",
  ]);

  const createToastIconStyle = cva("flex", {
    variants: {
      severity: {
        success: "text-emerald-400",
        error: "text-red-400",
        warning: "text-amber-400",
        message: "text-sky-400",
      },
    },

    defaultVariants: {
      severity: "message",
    },
  });

  const toastStyle = createToastStyle();
  const toastButtonStyle = createToastButtonStyle();
</script>

<div
  role="region"
  class="fixed z-10 inset-0 p-4 flex flex-col justify-end items-center gap-1 pointer-events-none"
>
  {#each toaster.toasts as toast (toast.id)}
    {@const iconStyle = createToastIconStyle({ severity: toast.severity })}

    <div
      role="alert"
      class={toastStyle}
      animate:flip={{ duration: 200 }}
      transition:scale={{ duration: 200, start: 0.6 }}
    >
      {#if toast.icon}
        {@const Icon = toast.icon}

        <span class={iconStyle}>
          <Icon />
        </span>
      {/if}

      <Caption>
        {toast.message}
      </Caption>

      {#if toast.action}
        <hr class="border-gray-700" />

        <button
          aria-label={toast.action.label}
          class={toastButtonStyle}
          onclick={() => toast.action?.handle(toast)}
        >
          {toast.action.label}
        </button>
      {/if}
    </div>
  {/each}
</div>
