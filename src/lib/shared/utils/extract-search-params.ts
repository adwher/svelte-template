import { type GenericSchema, parseAsync } from "valibot";

/**
 * Extracts search parameters from a given URL and optionally validates them against a provided schema.
 *
 * @template Input - The input type representing the expected structure of the search parameters as strings.
 * @template Output - The output type representing the transformed structure of the search parameters.
 * @param url - The URL object containing the search parameters to extract.
 * @param schema - An optional schema used to validate and transform the extracted search parameters.
 * @returns A promise that resolves to the extracted and optionally validated search parameters.
 */
export async function extractSearchParams<
  Input extends Record<string, string>,
  Output extends Record<string, unknown>,
>(url: URL, schema?: GenericSchema<Input, Output>): Promise<Output> {
  const data = Object.fromEntries(url.searchParams);

  if (schema) {
    return parseAsync(schema, data);
  }

  return data as Output;
}
