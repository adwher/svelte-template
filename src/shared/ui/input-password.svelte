<!--
  @component
  @name InputPassword
  @description A password input field with autocomplete support.
  @example
    <InputPassword placeholder="Password" />
    <InputPassword autocomplete="new-password" />
  @props
    - autocomplete: "current-password" or "new-password". Default: "current-password".
-->

<script module lang="ts">
  import type { InputProps } from "./input.svelte";

  export interface InputPasswordProps extends Omit<InputProps, "type"> {
    /**
     * The value of the autocomplete attribute.
     * @default "current-password"
     */
    autocomplete?: "current-password" | "new-password";
  }
</script>

<script lang="ts">
  import Input from "./input.svelte";

  let { autocomplete = "current-password", ...props }: InputPasswordProps = $props();
</script>

<Input {...props} {autocomplete} type="password" />
