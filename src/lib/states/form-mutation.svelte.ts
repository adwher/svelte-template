import { ORPCError } from "@orpc/client";
import { flatten, ValiError, type GenericSchema } from "valibot";

import {
  extractFormData,
  type ActionResponseIssues,
  type FormDataSchemaInput,
  type FormDataSchemaOutput,
} from "$lib/shared/utils.ts";

import { MutationState, type MutationStateOptions } from "./mutation.svelte.ts";

export interface FormMutationStateOptions<
  I extends FormDataSchemaInput,
  O extends FormDataSchemaOutput,
  R,
> extends MutationStateOptions<[O], R> {
  /**
   * The function that performs the mutation.
   * This function is called with the validated form data and the form element.
   * @param data - The validated form data.
   * @param form - The HTML form element.
   */
  mutate(data: O): R;

  /**
   * The schema used to validate the form data.
   * This schema is used to extract and validate the form data before mutation.
   */
  formDataSchema?: GenericSchema<I, O>;

  /**
   * Prevents the form from being reset after a successful mutation.
   * @default false
   */
  preventResetOnSubmit?: boolean;
}

/**
 * A class that manages the state of a form mutation, including success status, error messages, validation issues, and the mutation process itself.
 *
 * @template I - The input schema type for the form data.
 * @template O - The output schema type for the form data.
 * @template R - The result type of the mutation.
 */
export class FormMutationState<
  I extends FormDataSchemaInput,
  O extends FormDataSchemaOutput,
  R,
> extends MutationState<[O], R> {
  /**
   * Indicates whether the mutation was successful.
   * @state
   */
  success = $state(false);

  /**
   * The message associated with the mutation, if any.
   * This can be an error message or a success message.
   * @state
   */
  message: string | undefined = $state();

  /**
   * The validation issues or errors returned from the mutation, if any.
   * This can include validation errors from the form data schema or other issues.
   * @state
   */
  issues: ActionResponseIssues | undefined = $state();

  /**
   * The options used to configure the mutation state.
   * This includes the schema, reset options, and other mutation-related settings.
   */
  #options: FormMutationStateOptions<I, O, R>;

  constructor(options: FormMutationStateOptions<I, O, R>) {
    super(options);
    this.#options = options;
  }

  reset = () => {
    this.success = false;
    this.loading = false;
    this.issues = undefined;
    this.message = undefined;
    this.data = null;
  };

  /**
   * Handles the form submission event, extracts form data, validates it against the schema, and triggers the mutation process.
   *
   * @param event - The `SubmitEvent` triggered by the form submission.
   * @returns A promise that resolves when the mutation process is complete.
   */
  onsubmit = async (event: SubmitEvent) => {
    this.reset();
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const data = await extractFormData(formData, this.#options.formDataSchema);
      await this.mutate(data);

      this.success = true;

      if (!this.#options.preventResetOnSubmit) {
        form.reset();
      }
    } catch (err) {
      this.success = false;

      if (err instanceof ValiError) {
        this.message = err.message;
        this.issues = flatten(err.issues) as ActionResponseIssues;
      }

      if (err instanceof ORPCError) {
        this.message = err.message;

        if (err.data.issues) {
          // Error was generated using the "ActionResponse" API.
          this.issues = err.data.issues as ActionResponseIssues;
        }
      }
    }
  };
}
