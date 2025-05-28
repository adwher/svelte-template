<!--
  @component
  @name Input
  @description A styled input field.
  @example
    <Input placeholder="Type here..." />
    <Input fullwidth />
  @props
    - fullwidth: Expands to container width. Default: false.
-->

<script module lang="ts">
  import { cva } from "class-variance-authority";
  import type { HTMLInputAttributes } from "svelte/elements";

  export interface InputProps extends HTMLInputAttributes {
    /**
     * If `true`, the input will take up the full width of its container.
     * @default false
     */
    fullwidth?: boolean;
  }

  export const createInputStyle = cva(
    [
      "text-paragraph bg-paper transition-colors",
      "px-4 h-10 text-base rounded-md",
      "ring-1 ring-inset ring-background-300",
      "outline-0 appearance-none",
      "placeholder:(text-paragraph/40)",
      "focus:(shadow-inner)",
      "disabled:(bg-disabled/10 pointer-events-none)",
      "focus:ring-background-400",
    ],
    {
      variants: {
        fullwidth: {
          true: "w-full",
        },
      },

      defaultVariants: {
        fullwidth: false,
      },
    },
  );
</script>

<script lang="ts">
  let { fullwidth = false, value = $bindable(), ...props }: InputProps = $props();

  const classname = createInputStyle({ fullwidth, class: props.class });
</script>

<input {...props} class={classname} bind:value />
