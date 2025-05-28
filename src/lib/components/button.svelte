<!--
  @component
  @name Button
  @description A customizable button component supporting variants, loading state, and more.
  @example
    <Button>Default</Button>
    <Button variant="text">Text</Button>
    <Button loading>Loading</Button>
  @props
    - type: Button type. Default: "button".
    - href: If set, renders as a link.
    - variant: "solid", "text", or "surface". Default: "solid".
    - loading: Shows loading state. Default: false.
    - align: Text alignment. Default: "center".
    - fullwidth: Expands to container width. Default: false.
-->

<script module lang="ts">
  import { cva } from "class-variance-authority";
  import type { HTMLButtonAttributes } from "svelte/elements";

  export interface ButtonProps extends HTMLButtonAttributes {
    /**
     * The type of the button.
     * @default "button"
     */
    type?: HTMLButtonAttributes["type"];

    /**
     * The URL that the hyperlink points to. Links are not restricted to HTTP-based URLs.
     * When present, the component renders an `a` element.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#href
     */
    href?: string;

    /**
     * The variant of the button.
     * @default "solid"
     */
    variant?: "solid" | "text" | "surface";

    /**
     * Whether the button is in a loading state.
     * Also disables the button.
     * @default false
     */
    loading?: boolean;

    /**
     * The alignment of the button's text.
     * @default "center"
     */
    align?: "center" | "left";

    /**
     * Whether the button should take up the full width of its container.
     * @default false
     */
    fullwidth?: boolean;
  }

  export const createButtonStyle = cva(
    [
      "inline-flex items-center transition-(colors,shadow)",
      "h-8 px-3 gap-2 text-base font-serif rounded-lg",
      "appearance-none decoration-none cursor-pointer",
      "disabled:(text-disabled pointer-events-none)",
    ],
    {
      variants: {
        variant: {
          solid: [
            "bg-sky-300 text-sky-800",
            "bg-linear-to-br from-transparent to-80% to-sky-300",
            "hover:(bg-sky-200)",
            "active:(bg-sky-100)",
            "disabled:(bg-gray-200 bg-none shadow-none)",
          ],

          text: [
            "bg-transparent text-paragraph",
            "hover:(bg-gray-50)",
            "active:(shadow-inner)",
            "disabled:(bg-gray-200 bg-none shadow-none border-gray-300)",
          ],

          surface: [
            "bg-transparent text-paragraph shadow-sm shadow-gray-500/10",
            "border border-solid border-gray-200",
            "hover:(shadow-md)",
            "active:(shadow-none)",
            "disabled:(bg-gray-200 shadow-none border-gray-300)",
          ],
        },

        align: {
          center: "justify-center",
          left: "justify-start",
        },

        loading: {
          true: "text-transparent!",
        },

        fullwidth: {
          true: "w-full",
        },
      },

      defaultVariants: {
        variant: "solid",
        align: "center",
        fullwidth: false,
      },
    },
  );
</script>

<script lang="ts">
  import Spinner from "~icons/ph/spinner";

  let {
    type = "button",
    variant = "solid",
    align = "center",
    loading = false,
    fullwidth = false,
    children,
    ...props
  }: ButtonProps = $props();

  const tag = $derived(props.href ? "a" : "button");

  const classname = createButtonStyle({
    variant,
    align,
    loading,
    fullwidth,
    class: props.class,
  });
</script>

<svelte:element
  this={tag}
  {...props}
  role="button"
  class={classname}
  disabled={props.disabled || loading}
  {type}
>
  {#if loading}
    <div class="flex absolute items-center justify-center">
      <Spinner class="animate-spin text-disabled!" />
    </div>
  {/if}

  {@render children?.()}
</svelte:element>
