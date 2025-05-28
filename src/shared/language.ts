export enum Language {
  EN = "en",
  ES = "es",
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
