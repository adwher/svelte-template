import type { ORPCErrorCode } from "@orpc/client";
import { ORPCError, os, ValidationError } from "@orpc/server";
import { flatten } from "valibot";

import { AlreadyExistsError, NotFoundError } from "$lib/entities.ts";
import { internalServerError, unauthenticatedError } from "$lib/i18n/messages.ts";
import { ProcedureValidationErrorSchema } from "$lib/shared/schemas.ts";
import type { ActionResponseIssues } from "$lib/shared/utils.ts";

export interface ProceduresContext {
  /**
   * Provides access to the repositories.
   */
  repositories: App.Locals["repositories"];

  /** Contains the current [Supabase Session](https://supabase.com/docs/reference/javascript/auth-getsession). */
  supabaseSession: App.Locals["supabaseSession"];

  /** Contains the current [Supabase User](https://supabase.com/docs/reference/javascript/auth-getuser). */
  supabaseUser: App.Locals["supabaseUser"];
}

const base = os.$context<ProceduresContext>().errors({
  INTERNAL_SERVER_ERROR: {},
  NOT_FOUND: {},
  CONFLICT: {},

  INPUT_VALIDATION_ERROR: {
    status: 422,
    data: ProcedureValidationErrorSchema,
  },

  OUTPUT_VALIDATION_ERROR: {
    status: 502,
    data: ProcedureValidationErrorSchema,
  },
});

/**
 * Middleware that handles specific error types and maps them to custom error responses. It intercepts errors thrown during the execution of the next middleware or handler and transforms them into structured error objects.
 *
 * Any other errors are re-thrown without modification.
 * ```
 */
const CustomErrorMiddleware = base.middleware(async ({ errors, next }) => {
  try {
    return await next();
  } catch (err) {
    console.error(err);

    if (err instanceof ORPCError && err.cause instanceof ValidationError) {
      const code = err.code as ORPCErrorCode;

      if (err.cause instanceof ValidationError) {
        const issues = flatten(err.data.issues) as ActionResponseIssues;

        throw code === "BAD_GATEWAY"
          ? errors.OUTPUT_VALIDATION_ERROR({ data: { issues } })
          : errors.INPUT_VALIDATION_ERROR({ data: { issues } });
      }
    }

    if (err instanceof NotFoundError) {
      throw errors.NOT_FOUND({ message: err.message });
    }

    if (err instanceof AlreadyExistsError) {
      throw errors.CONFLICT({ message: err.message });
    }

    throw errors.INTERNAL_SERVER_ERROR({ message: internalServerError() });
  }
});

/**
 * Middleware to enforce authentication by verifying the presence of a session.
 *
 * This middleware checks if the session is available in the context. If the session is missing, it throws an `UNAUTHORIZED` error. Otherwise, it proceeds to the next middleware or handler in the chain.
 *
 * @throws {UNAUTHORIZED} If the session is not present in the context.
 */
const AuthenticationMiddleware = base
  .errors({ UNAUTHORIZED: {} })
  .middleware(async ({ context: { supabaseSession: session }, errors, next }) => {
    if (!session) {
      throw errors.UNAUTHORIZED({ message: unauthenticatedError() });
    }

    return await next();
  });

/**
 * A public procedure that applies the `CustomErrorMiddleware` to handle errors.
 * This middleware ensures that custom error handling logic is applied to the procedure.
 */
export const pub = base.use(CustomErrorMiddleware);

/**
 * A private procedure that applies the `AuthenticationMiddleware` to enforce authentication.
 * This middleware ensures that custom error handling logic is applied and that authentication is enforced.
 */
export const authed = pub.use(AuthenticationMiddleware);
