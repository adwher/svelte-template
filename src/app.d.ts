import type { Session, SupabaseClient, User } from "@supabase/supabase-js";

import type { ProceduresRouterClient } from "$lib/server/procedures.ts";

// See https://svelte.dev/docs/kit/types#app.d.ts for information about these interfaces
declare global {
  namespace App {
    // interface Error {}

    interface Locals {
      /** Supabase client instance. */
      supabase: SupabaseClient;
      /** Contains the current [Supabase Session](https://supabase.com/docs/reference/javascript/auth-getsession). */
      supabaseSession: Session | null;
      /** Contains the current [Supabase User](https://supabase.com/docs/reference/javascript/auth-getuser). */
      supabaseUser: User | null;

      /**
       * Provides access to the repositories.
       */
      repositories: object;

      /**
       * Procedures server client instance.
       * This is used to call the procedures defined in the server.
       * @see https://orpc.unnoq.com/docs/client/server-side
       */
      procedures: ProceduresRouterClient;
    }

    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
