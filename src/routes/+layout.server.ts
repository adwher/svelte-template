import { CookieName } from "$/shared/constants/http";
import type { Language } from "$/shared/language";

import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = ({ cookies }) => {
  const language = cookies.get(CookieName.Language) as Language;

  return {
    // Pass the current language to the client.
    language,
  };
};
