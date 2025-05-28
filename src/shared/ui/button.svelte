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
      "inline-flex items-center transition-(colors,shadow) duration-200",
      "h-10 px-4 gap-2 text-base tracking-tight font-serif font-350 rounded-full",
      "appearance-none decoration-none cursor-pointer",
      "disabled:(opacity-60 pointer-events-none)",
    ],
    {
      variants: {
        variant: {
          solid: [
            "bg-foreground-700 text-foreground-200",
            "inset-shadow-xs inset-shadow-foreground-900/40",
            "ring-1 ring-inset ring-foreground-800/20 dark:ring-foreground-100/20",
            "bg-linear-to-br from-transparent to-foreground-800",
            "hover:(bg-foreground-600)",
            "active:(inset-shadow-sm)",
          ],

          text: [
            "bg-transparent text-paragraph dark:text-foreground-200",
            "hover:(text-foreground-800 bg-foreground-600/10 dark:(text-foreground-100 bg-foreground-800/10))",
            "active:(inset-shadow-sm inset-shadow-foreground-800/20 dark:inset-shadow-foreground-200/20)",
          ],

          surface: [
            "bg-foreground-600/10 text-foreground-800 dark:text-foreground-100",
            "inset-shadow-xs inset-shadow-foreground-800/20",
            "ring-1 ring-inset ring-foreground-800/20 dark:ring-foreground-100/20",
            "hover:(bg-foreground-600/20)",
            "active:(inset-shadow-sm dark:inset-shadow-foreground-200/20)",
          ],
        },

        align: {
          center: "justify-center",
          left: "justify-start",
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
  let {
    type = "button",
    variant = "solid",
    align = "center",
    fullwidth = false,
    children,
    ...props
  }: ButtonProps = $props();

  const tag = $derived(props.href ? "a" : "button");

  const buttonStyle = $derived(
    createButtonStyle({
      variant,
      align,
      fullwidth,
      class: props.class,
    }),
  );
</script>

<svelte:element
  this={tag}
  {...props}
  role="button"
  class={buttonStyle}
  disabled={props.disabled}
  {type}
>
  {@render children?.()}
</svelte:element>
