<!--
  @component
  @name InputEmail
  @description An email input field with autocomplete support.
  @example
    <InputEmail placeholder="Email" />
    <InputEmail autocomplete="username" />
  @props
    - autocomplete: "email" or "username". Default: "email".
-->

<script module lang="ts">
  import type { InputProps } from "./input.svelte";

  export interface InputEmailProps extends Omit<InputProps, "type"> {
    /**
     * The value of the autocomplete attribute.
     * @default "email"
     */
    autocomplete?: "email" | "username";
  }
</script>

<script lang="ts">
  import Input from "./input.svelte";

  let { autocomplete = "email", ...props }: InputEmailProps = $props();
</script>

<Input {...props} {autocomplete} type="email" />
