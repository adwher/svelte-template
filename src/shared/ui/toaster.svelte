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

  import { toaster } from "$/shared/states";

  import Caption from "./caption.svelte";

  const createToastStyle = cva([
    "flex items-center gap-2",
    "px-3 py-2 max-w-lg rounded-md",
    "text-background-100 shadow-md",
    "bg-gradient-to-b from-background-800 to-60% to-background-950",
    "overflow-hidden pointer-events-auto origin-bottom-center",
  ]);

  const createToastButtonStyle = cva([
    "p-0 border-none bg-transparent font-serif font-300",
    "text-sm tracking-tight rounded-md cursor-pointer",
    "transition-colors hover:(text-background-50)",
  ]);

  const createToastIconStyle = cva("size-5", {
    variants: {
      severity: {
        success: "text-emerald-500",
        error: "text-orange-500",
        warning: "text-amber-500",
        message: "text-sky-500",
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
        <Icon class={iconStyle} />
      {/if}

      <Caption>
        {toast.message}
      </Caption>

      {#if toast.action}
        <hr class="border-background-700" />

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
