<script lang="ts">
  import "virtual:uno.css";

  import "$lib/shared/styles/main.css";

  import Toaster from "$lib/shared/ui/toaster.svelte";

  let { children } = $props();
</script>

{@render children()}

<Toaster />
