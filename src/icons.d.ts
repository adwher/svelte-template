// Extracted from https://github.com/unplugin/unplugin-icons/blob/maiin/types/svelte5.d.ts.
// See https://github.com/unplugin/unplugin-icons for information about this module.
declare module "~icons/*" {
  import type { Component } from "svelte";
  import type { SVGAttributes } from "svelte/elements";

  const component: Component<SVGAttributes<SVGAElement>>;
  export default component;
}

// Extracted from https://github.com/unplugin/unplugin-icons/blob/maiin/types/svelte5.d.ts.
// See https://github.com/unplugin/unplugin-icons for information about this module.
declare module "virtual:icons/*" {
  import type { Component } from "svelte";
  import type { SVGAttributes } from "svelte/elements";

  const component: Component<SVGAttributes<SVGAElement>>;
  export default component;
}
