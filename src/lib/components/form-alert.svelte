<!-- @component
  @name FormAlert
  @description Displays an alert based on the current form state.
  @example
    <FormAlert {form} />
  @props
    - form: The current form state.
-->

<script module lang="ts">
  import type { ActionResponse } from "$lib/shared/utils.ts";

  import type { AlertSeverity } from "./alert.svelte";

  export interface FormAlertProps {
    /** Current form state. */
    form: ActionResponse | null;
  }
</script>

<script lang="ts">
  import Alert from "./alert.svelte";

  let { form }: FormAlertProps = $props();

  const severity: AlertSeverity = $derived(form?.success ? "message" : "error");
</script>

{#if form?.message}
  <Alert {severity}>
    {form?.message}
  </Alert>
{/if}
