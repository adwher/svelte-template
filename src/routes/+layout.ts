import { setLanguage } from "$/shared/translation";

import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = ({ data }) => {
  // Set the user's language preference from server-side.
  setLanguage(data.language);
};
