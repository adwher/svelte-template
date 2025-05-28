import { RPCHandler } from "@orpc/server/fetch";
import { CORSPlugin } from "@orpc/server/plugins";
import { error } from "@sveltejs/kit";

import { PUBLIC_DOMAIN } from "$env/static/public";

import { internalServerError } from "$lib/i18n/messages.ts";
import { createProceduresContext, ProceduresRouter } from "$lib/server/procedures.ts";

import type { RequestHandler } from "./$types.js";

const handler = new RPCHandler(ProceduresRouter, {
  plugins: [
    new CORSPlugin({
      origin: PUBLIC_DOMAIN,
      allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    }),
  ],
});

const handle: RequestHandler = async ({ locals, request }) => {
  const { response } = await handler.handle(request, {
    prefix: "/rpc",
    context: createProceduresContext(locals),
  });

  if (!response) {
    return error(500, internalServerError());
  }

  return response;
};

export const GET = handle;
export const POST = handle;
export const PUT = handle;
export const PATCH = handle;
export const DELETE = handle;
