<script lang="ts">
  import "virtual:uno.css";

  import { invalidate } from "$app/navigation";

  import "$lib/styles/main.css";

  import Toaster from "$lib/components/toaster.svelte";

  let { data, children } = $props();
  const { supabase, supabaseSession: prevSession } = $derived(data);

  $effect(() => {
    const { data: state } = supabase.auth.onAuthStateChange((_, newSession) => {
      if (newSession && newSession?.expires_at === prevSession?.expires_at) {
        // Session remains the same, no need to invalidate.
        return;
      }

      invalidate("supabase:auth");
    });

    return () => {
      state.subscription.unsubscribe();
    };
  });
</script>

{@render children()}

<Toaster />
