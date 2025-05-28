import { Language } from "$/shared/language";

/** @internal DO NOT USE OUTSIDE THIS FILE. */
let sessionLanguage: Language = Language.EN;

/**
 * Sets the current language for the application.
 * @param language - The language to set as the current language.
 */
export function setLanguage(language: Language) {
  sessionLanguage = language;
}

export type TranslationTemplate = string;

/**
 * A type representing a dictionary where each key is a language code and the value is a translation template.
 *
 * @template T - The type of the translation template. Defaults to `TranslationTemplate`.
 * @property {T} [L in Language] - The translation template for each language.
 */
export type Dictionary<T = TranslationTemplate> = {
  [L in Language]: T;
};

/**
 * Translates a given dictionary based on the current session language.
 *
 * @template T - The type of the values in the dictionary.
 * @param {Dictionary<T>} dictionary - The dictionary containing translations.
 * @returns {T} - The translated value corresponding to the session language.
 */
export function translate<T>(dictionary: Dictionary<T>): T {
  return dictionary[sessionLanguage];
}
