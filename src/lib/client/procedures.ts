import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";

import { browser } from "$app/environment";

import { PUBLIC_DOMAIN } from "$env/static/public";

import type { ProceduresRouterClient } from "$lib/server/procedures.ts";

/**
 * Client-side RPC client. **DO NOT USE** on the server-side, use `locals.procedures` instead.
 * This is used to call the server-side procedures from the client-side.
 *
 * @see https://orpc.unnoq.com/docs/client/client-side
 */
export const procedures: ProceduresRouterClient = createORPCClient(
  new RPCLink({
    url: `${PUBLIC_DOMAIN}/remote`,
    interceptors: [
      ({ next }) => {
        if (!browser) {
          // Prevents SSR from trying to call the client.
          return Promise.resolve();
        }

        return next();
      },
    ],
  }),
);
