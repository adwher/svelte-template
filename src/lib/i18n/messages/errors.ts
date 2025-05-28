import * as v from "valibot";

import { Language, translate } from "../translation.ts";

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

/** Returns a translated error message for a minimum length issue. */
export function minLengthError(issue: v.MinLengthIssue<v.LengthInput, number>) {
  return translate({
    [Language.EN]: `Expected a minimum length of ${issue.requirement}.`,
    [Language.ES]: `Se esperaba una longitud mínima de ${issue.requirement}.`,
  });
}

/** Returns a translated error message for a maximum length issue. */
export function maxLengthError(issue: v.MaxLengthIssue<v.LengthInput, number>) {
  return translate({
    [Language.EN]: `Expected a maximum length of ${issue.requirement}.`,
    [Language.ES]: `Se esperaba una longitud máxima de ${issue.requirement}.`,
  });
}

/** Returns a translated error message for an invalid email issue. */
export function mustBeEmailError() {
  return translate({
    [Language.EN]: "Expected a valid email address.",
    [Language.ES]: "Se esperaba una dirección de correo electrónico válida.",
  });
}

/** Returns a translated error message for a must-have uppercase issue. */
export function mustHaveUppercaseError() {
  return translate({
    [Language.EN]: "Expected a must-have uppercase letter.",
    [Language.ES]: "Se requiere al menos una letra mayúscula.",
  });
}

/** Returns a translated error message for a must-have lowercase issue. */
export function mustHaveLowercaseError() {
  return translate({
    [Language.EN]: "Expected a must-have lowercase letter.",
    [Language.ES]: "Se requiere al menos una letra minúscula.",
  });
}

/** Returns a translated error message for a must-have number issue. */
export function mustHaveNumberError() {
  return translate({
    [Language.EN]: "Expected a must-have number.",
    [Language.ES]: "Se requiere al menos un número.",
  });
}

/** Returns a translated error message for a must-have special character issue. */
export function mustHaveSpecialCharacterError() {
  return translate({
    [Language.EN]: "Expected a must-have special character.",
    [Language.ES]: "Se requiere al menos un carácter especial.",
  });
}

/** Returns a translated error message for a non-empty value issue. */
export function nonEmptyError() {
  return translate({
    [Language.EN]: "Expected a non-empty value.",
    [Language.ES]: "Se esperaba un valor, no vacío.",
  });
}
