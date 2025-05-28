/** Represents a successful response payload without any data. */
export interface ActionResponseSuccess<T = unknown> {
  /** Indicates that the operation was successful. */
  success: true;
  /** Optional message providing additional information about the success. */
  message?: string;
  /** Optional data returned by the action. */
  data?: T;
}

/**
 * Represents a failure response payload with an error message and optional issues.
 * Partially extracted from `valibot`'s [FlatErrors](https://github.com/fabian-hiller/valibot/blob/61fda867a61fa86c8c37789fe93b42d119eeeece/library/src/methods/flatten/flatten.ts#L14).
 */
export interface ActionResponseIssues {
  /**
   * The error messages of issues without a path that belong to the root of the schema are added to this key.
   */
  root?: string[];

  /**
   * The error messages of issues with a path that belong to the nested parts of the schema and can be converted to a dot path are added to this key.
   */
  nested?: Record<string, string[]>;

  /**
   * Some issue paths, for example for complex data types like `Set` and `Map`, have no key or a key that cannot be converted to a dot path. These error messages are added to this key.
   */
  other?: string[];
}

export interface ActionResponseFailure {
  /** Indicates that the operation failed. */
  success: false;
  /** Optional error message describing what went wrong. */
  message?: string;
  /** Optional issues detailing specific validation errors. */
  issues?: ActionResponseIssues;
}

export type ActionResponse<T = unknown> = ActionResponseSuccess<T> | ActionResponseFailure;
