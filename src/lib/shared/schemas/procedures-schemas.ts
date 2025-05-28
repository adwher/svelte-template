import * as v from "valibot";

import { ActionResponseIssuesSchema } from "./action-response-schemas.ts";

/** Schema for validating procedure validation errors. */
export const ProcedureValidationErrorSchema = v.object({
  issues: ActionResponseIssuesSchema,
});
