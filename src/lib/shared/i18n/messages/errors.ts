import { Language } from "$lib/shared/language.ts";

import { translate } from "../translation.ts";

/** Returns an error message indicating an internal server error. */
export function internalServerError() {
  return translate({
    [Language.ES]: "Error interno del servidor.",
    [Language.EN]: "Internal server error.",
  });
}

/** Returns an error message indicating that the content cannot be parsed. */
export function parsingFailedError() {
  return translate({
    [Language.EN]: "Content does not match the expected schema",
    [Language.ES]: "El contenido no coincide con el esquema esperado",
  });
}

/** Returns a translated error message for a required field issue. */
export function unauthenticatedError() {
  return translate({
    [Language.EN]: "You must be authenticated to perform this action.",
    [Language.ES]: "Debes estar autenticado para realizar esta acción.",
  });
}
