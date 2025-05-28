import { type GenericSchema, parseAsync } from "valibot";

export type FormDataSchemaInput = Record<string, string | File | undefined>;

export type FormDataSchemaOutput = Record<string, unknown>;

/**
 * Extracts data from a `FormData` object and optionally validates it against a schema.
 *
 * @template Input - The input type of the schema.
 * @template Output - The output type of the schema.
 * @param form - The `FormData` object to extract data from.
 * @param schema - An optional schema to validate and transform the extracted data.
 * @returns A promise that resolves to the extracted and optionally validated data.
 */
export async function extractFormData<
  Input extends FormDataSchemaInput,
  Output extends FormDataSchemaOutput,
>(form: FormData, schema?: GenericSchema<Input, Output>): Promise<Output> {
  const data = Object.fromEntries(form.entries());

  if (schema) {
    return parseAsync(schema, data);
  }

  return data as Output;
}
