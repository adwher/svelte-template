import { createRouterClient, type RouterClient } from "@orpc/server";

import type { ProceduresContext } from "./template.ts";

/**
 * An object that serves as a router for server-side procedures. It organizes and exposes various server-side functionalities.
 * @see https://orpc.unnoq.com/docs/router
 */
export const ProceduresRouter = {};

/**
 * Represents the client-side type for interacting with the `ProceduresRouter`.
 *
 * This type is derived from the `RouterClient` utility, which maps the server-side
 * router's procedures to their corresponding client-side callable methods.
 *
 * @template ProceduresRouter - The server-side router definition used to generate the client type.
 */
export type ProceduresRouterClient = RouterClient<typeof ProceduresRouter>;

/**
 * Creates a `ProceduresContext` object using the provided application locals.
 *
 * @param locals - The application locals containing the necessary data to construct the context.
 * @returns A `ProceduresContext` instance.
 */
export function createProceduresContext(locals: App.Locals): ProceduresContext {
  return {
    repositories: locals.repositories,
    supabaseSession: locals.supabaseSession,
    supabaseUser: locals.supabaseUser,
  };
}

/**
 * Creates a server-side client for interacting with the ProceduresRouter.
 *
 * @param locals - The application-specific context (`App.Locals`) to be passed to the router client.
 * @returns An instance of `ProceduresRouterClient` configured with the provided context.
 *
 * @see https://orpc.unnoq.com/docs/client/server-side
 */
export function createProceduresServerClient(locals: App.Locals): ProceduresRouterClient {
  return createRouterClient(ProceduresRouter, {
    context: createProceduresContext(locals),
  });
}
