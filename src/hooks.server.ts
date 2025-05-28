import { type Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

import { CookieName, HeaderName } from "$lib/shared/constants/http.ts";
import { Language, resolveLanguage } from "$lib/shared/language.ts";

/** Hook to handle the translations. */
const translate: Handle = ({ event, resolve }) => {
  const browser = event.request.headers.get(HeaderName.AcceptedLanguage);
  const cookie = event.cookies.get(CookieName.Language);

  let language = Language.EN;
  const preferred = cookie || browser;

  if (preferred) {
    language = resolveLanguage(preferred);
    // Store the language in the cookie.
    event.cookies.set(CookieName.Language, language, { path: "/" });
  }

  return resolve(event, {
    transformPageChunk({ html }) {
      // Replace the placeholder with the session language.
      return html.replace("%lang%", language);
    },
  });
};

export const handle = sequence(translate);
