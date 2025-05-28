<script lang="ts">
  import "virtual:uno.css";

  import "$/shared/ui/styles/main.css";

  import Toaster from "$/shared/ui/toaster.svelte";

  let { children } = $props();
</script>

{@render children()}

<Toaster />
