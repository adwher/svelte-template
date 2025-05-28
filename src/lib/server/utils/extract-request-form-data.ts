import { type GenericSchema } from "valibot";

import {
  extractFormData,
  type FormDataSchemaInput,
  type FormDataSchemaOutput,
} from "$lib/shared/utils.ts";

/**
 * Extracts and validates form data from an HTTP request using an optional schema.
 *
 * @template Input - The input type of the form data schema.
 * @template Output - The output type of the form data schema.
 * @param request - The HTTP request object containing the form data.
 * @param schema - An optional schema to validate and transform the form data.
 * @returns A promise that resolves to the validated and transformed form data.
 */
export async function extractRequestFormData<
  Input extends FormDataSchemaInput,
  Output extends FormDataSchemaOutput,
>(request: Request, schema?: GenericSchema<Input, Output>): Promise<Output> {
  const form = await request.formData();
  return extractFormData(form, schema);
}
