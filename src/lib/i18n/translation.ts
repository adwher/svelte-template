export enum Language {
  EN = "en",
  ES = "es",
}

/** @internal DO NOT USE OUTSIDE THIS FILE. */
let sessionLanguage: Language = Language.EN;

/**
 * Sets the current language for the application.
 * @param language - The language to set as the current language.
 */
export function setLanguage(language: Language) {
  sessionLanguage = language;
}

/**
 * Returns the current language for the application.
 * @returns The current language.
 */
export function currentLanguage() {
  return sessionLanguage;
}

/**
 * Resolves the language based on the preferred language.
 * @param preferred - The preferred language.
 * @returns The resolved language.
 */
export function resolveLanguage(preferred: string): Language {
  if (preferred.startsWith("es-") || preferred === "es") {
    return Language.ES;
  }

  return Language.EN;
}

type TranslationTemplate = string;
type TranslationTemplateVariables = Record<string, string>;

/**
 * Replaces placeholders in a template string with corresponding values from a provided object.
 *
 * @param template - The template string containing placeholders in the format `{{key}}`.
 * @param variables - An object containing key-value pairs where the key corresponds to the placeholder in the template.
 * @returns The formatted string with placeholders replaced by their corresponding values.
 *
 * @example
 * ```typescript
 * const template = "Hello, {{name}}!";
 * const values = { name: "Alice" };
 * const result = format(template, values);
 * console.log(result); // "Hello, Alice!"
 * ```
 */
export function format(
  template: TranslationTemplate,
  variables: TranslationTemplateVariables = {},
) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => variables[key]);
}

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
