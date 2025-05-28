<!-- @component
  @name InputAlert
  @description Displays an alert for a form field based on the current form state.
  @example
    <InputAlert {form} name="email" severity="error" />
  @props
    - form: The current form state.
    - name: The name of the form field.
 -->

<script module lang="ts">
  import type { ActionResponse } from "$lib/shared/utils.ts";

  export interface InputAlertProps {
    /** Current form state. */
    form: ActionResponse | null;

    /** The name of the form field. */
    name: string;
  }
</script>

<script lang="ts">
  import Alert from "./alert.svelte";

  let { form, name }: InputAlertProps = $props();

  const issues = $derived.by(() => {
    if (form && "issues" in form) {
      const issues = { ...form?.issues?.nested };
      return issues[name] ?? [];
    }

    return [];
  });
</script>

{#if issues.length > 0}
  <Alert severity="error">
    <ul class="list-disc-inside">
      {#each issues as issue}
        <li>{issue}</li>
      {/each}
    </ul>
  </Alert>
{/if}
