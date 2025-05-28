import { createBrowserClient, createServerClient } from "@supabase/ssr";

import { browser } from "$app/environment";

import { PUBLIC_SUPABASE_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public";

import { setLanguage } from "$lib/i18n.ts";

import type { LayoutLoad } from "./$types.d.ts";

export const load: LayoutLoad = async ({ depends, data, fetch }) => {
  // Set the user's language preference from server-side.
  setLanguage(data.language);

  // Declare a dependency, so the layout can be invalidated on a session refresh.
  depends("supabase:auth");

  const supabase = browser
    ? createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY, {
        global: { fetch },
      })
    : createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY, {
        global: { fetch },
        cookies: { getAll: () => data.cookies },
      });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return {
    supabase,
    supabaseSession: session,
    supabaseUser: user,
  };
};
