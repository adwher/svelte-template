import { createServerClient } from "@supabase/ssr";
import { type Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

import { PUBLIC_SUPABASE_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public";

import { currentLanguage, resolveLanguage, setLanguage } from "$lib/i18n.ts";
import { CookieName, HeaderName } from "$lib/server/http.ts";
import { createProceduresServerClient } from "$lib/server/procedures.ts";

/** Hook to initialize the Supabase client. */
const supabase: Handle = ({ event, resolve }) => {
  const supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY, {
    cookies: {
      getAll() {
        return event.cookies.getAll();
      },

      setAll(cookies) {
        cookies.forEach(({ name, value, options }) => {
          event.cookies.set(name, value, { ...options, path: "/" });
        });
      },
    },
  });

  if ("suppressGetSessionWarning" in supabase.auth) {
    // @ts-expect-error Field `suppressGetSessionWarning` is private.
    // Suppress the warning alerts when calling `supabase.auth.getSession()`.
    // NOTE: Remove when https://github.com/supabase/auth-js/issues/888 have been solved.
    supabase.auth.suppressGetSessionWarning = true;
  }

  event.locals.supabase = supabase;

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      // Supabase libraries use the `content-range` and `x-supabase-api-version` headers.
      // We need to tell SvelteKit to pass it through.
      return name === "content-range" || name === "x-supabase-api-version";
    },
  });
};

/** Hook to guard the routes that require authentication. */
const authenticated: Handle = async ({ event, resolve }) => {
  const {
    data: { session },
  } = await event.locals.supabase.auth.getSession();

  if (session) {
    event.locals.supabaseSession = session;
  }

  const {
    data: { user },
    error: userError,
  } = await event.locals.supabase.auth.getUser();

  if (!userError && user) {
    event.locals.supabaseUser = user;
  }

  return resolve(event);
};

/**
 * Hook to initialize the repositories and procedures.
 * Should be called after the `supabase` and `authenticated` hooks.
 */
export const repositories: Handle = ({ event, resolve }) => {
  event.locals.repositories = {};

  // Initialize the procedures server client.
  // https://orpc.unnoq.com/docs/client/server-side
  event.locals.procedures = createProceduresServerClient(event.locals);

  return resolve(event);
};

/** Hook to handle the translations. */
const translate: Handle = ({ event, resolve }) => {
  const browser = event.request.headers.get(HeaderName.AcceptedLanguage);
  const cookie = event.cookies.get(CookieName.Language);

  const preferred = cookie || browser;

  if (preferred) {
    const language = resolveLanguage(preferred);

    // Store the language in the cookie.
    event.cookies.set(CookieName.Language, language, { path: "/" });
    // Save the language in the session.
    setLanguage(language);
  }

  return resolve(event, {
    transformPageChunk({ html }) {
      // Replace the placeholder with the session language.
      return html.replace("%lang%", currentLanguage());
    },
  });
};

export const handle = sequence(supabase, authenticated, repositories, translate);
