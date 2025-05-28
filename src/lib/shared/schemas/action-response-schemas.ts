import * as v from "valibot";

import type { ActionResponseIssues } from "../utils/action-response.ts";

/** Schema definition for validating the structure of an `ActionResponseIssues` object. */
export const ActionResponseIssuesSchema = v.object({
  root: v.optional(v.array(v.string())),
  nested: v.optional(v.record(v.string(), v.array(v.string()))),
  other: v.optional(v.array(v.string())),
}) satisfies v.GenericSchema<ActionResponseIssues>;
