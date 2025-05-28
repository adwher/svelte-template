import { ORPCError, type ORPCErrorCode } from "@orpc/client";
import { ValidationError } from "@orpc/server";
import { fail, isActionFailure, isRedirect, type Action, type ActionFailure } from "@sveltejs/kit";
import { flatten, ValiError } from "valibot";

import { AlreadyExistsError, NotFoundError } from "$lib/entities.ts";
import { internalServerError, parsingFailedError } from "$lib/i18n/messages.ts";
import type {
  ActionResponseFailure,
  ActionResponseIssues,
  ActionResponseSuccess,
} from "$lib/shared/utils.ts";

/** Represents a standardized success output structure for safe action handling. */
export type SafeActionSuccess = ActionResponseSuccess;

export type SafeActionFailureStatus = 400 | 401 | 403 | 404 | 409 | 418 | 422 | 429 | 500;

/** Represents a standardized error output structure for safe error handling. */
export interface SafeActionFailure extends ActionResponseFailure {
  [key: string]: unknown;

  /**
   * HTTP status code indicating the type of error.
   * @default 500
   */
  statusCode: SafeActionFailureStatus;
}

export type SafeActionInput =
  | SafeActionSuccess
  | ActionFailure<SafeActionFailure | undefined>
  | void;

export type SafeActionOutput<I extends SafeActionInput> = I | ActionFailure<SafeActionFailure>;

/**
 * Wraps a SvelteKit action to provide standardized error handling.
 *
 * This function catches exceptions thrown by the wrapped action and converts them into a consistent error response format,
 * using HTTP status codes and error messages. Redirects and action failures are re-thrown to be handled by SvelteKit.
 *
 * @template P - The type of parameters accepted by the action.
 * @template I - The type of input accepted by the action.
 * @template R - The type of return value from the action.
 * @param action - The SvelteKit action to wrap with safe error handling.
 * @returns A new action function with enhanced error handling.
 */
export function safeAction<
  P extends Record<string, string>,
  I extends SafeActionInput,
  R extends string,
>(action: Action<P, I, R>): Action<P, SafeActionOutput<I>, R> {
  return async function (event) {
    try {
      return await Promise.resolve(action(event));
    } catch (err) {
      if (isRedirect(err) || isActionFailure(err)) {
        // Let the built-in error handling take care of this.
        throw err;
      }

      console.error(err);

      const payload = safeActionError(err);
      return fail(payload.statusCode, payload);
    }
  };
}

function safeActionError(err: unknown) {
  const payload: SafeActionFailure = {
    success: false,
    statusCode: 500,
    message: internalServerError(),
  };

  if (err instanceof Error) {
    payload.message = err.message;
  }

  if (err instanceof NotFoundError) {
    payload.statusCode = 404;
  }

  if (err instanceof AlreadyExistsError) {
    payload.statusCode = 409;
  }

  if (err instanceof ValiError) {
    payload.message = parsingFailedError();
    payload.issues = flatten(err.issues) as ActionResponseIssues;
    payload.statusCode = 422;
  }

  if (err instanceof ORPCError) {
    const code = err.code as ORPCErrorCode;

    if (code === "CONFLICT") {
      return safeActionError(new AlreadyExistsError(err.message));
    }

    if (code === "NOT_FOUND") {
      return safeActionError(new NotFoundError(err.message));
    }

    if (err.cause instanceof ValidationError) {
      return safeActionError(new ValiError(err.data.issues));
    }
  }

  return payload;
}
