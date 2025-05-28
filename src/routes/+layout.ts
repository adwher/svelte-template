import { setLanguage } from "$lib/shared/i18n.ts";

import type { LayoutLoad } from "./$types.d.ts";

export const load: LayoutLoad = ({ data }) => {
  // Set the user's language preference from server-side.
  setLanguage(data.language);
};
