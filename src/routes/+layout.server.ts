import { currentLanguage } from "$lib/i18n.ts";

import type { LayoutServerLoad } from "./$types.d.ts";

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
  return {
    // Pass the current language to the client.
    language: currentLanguage(),
    // Send the cookies from the server to the client.
    cookies: cookies.getAll(),
    // Pass the server-side session to the client.
    supabaseSession: locals.supabaseSession,
  };
};
