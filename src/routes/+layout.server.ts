import { CookieName } from "$lib/shared/constants/http.ts";
import type { Language } from "$lib/shared/language.ts";

import type { LayoutServerLoad } from "./$types.d.ts";

export const load: LayoutServerLoad = ({ cookies }) => {
  const language = cookies.get(CookieName.Language) as Language;

  return {
    // Pass the current language to the client.
    language,
  };
};
