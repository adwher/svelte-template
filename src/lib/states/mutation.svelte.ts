export type MutationParams = unknown[];

export type MutationFunction<P extends MutationParams, R> = (...params: P) => R;

export type MutationSuccessCallback<R> = (result: Awaited<R>) => void;

export type MutationErrorCallback = (error: unknown) => void;

export interface MutationStateOptions<P extends MutationParams, R> {
  mutate: MutationFunction<P, R>;

  /**
   * Callback function to be executed when the mutation is successful.
   * @param result - The result of the mutation.
   */
  onSuccess?: MutationSuccessCallback<R>;

  /**
   * Callback function to be executed when the mutation fails.
   * @param error - The error that occurred during the mutation.
   */
  onError?: MutationErrorCallback;
}

/**
 * A class that manages the state of a mutation operation, including loading state, result data, and success/error callbacks. This class is designed to handle asynchronous mutation functions with parameters and results, providing a structured way to manage their lifecycle.
 *
 * @template P - The type of the parameters passed to the mutation function.
 * @template R - The type of the result returned by the mutation function.
 *
 * @example
 * ```typescript
 * const mutation = new MutationState({
 *   mutate: async (params) => {
 *     // Perform mutation logic
 *     return result;
 *   },
 *   onSuccess: (result) => {
 *     console.log('Mutation succeeded:', result);
 *   },
 *   onError: (error) => {
 *     console.error('Mutation failed:', error);
 *   },
 * });
 *
 * await mutation.mutate(param1, param2);
 * console.log(mutation.data); // Access the result
 * ```
 */
export class MutationState<P extends MutationParams, R> {
  #mutate: MutationFunction<P, R>;

  /** Callback function to be executed when the mutation is successful. */
  #onSuccess?: MutationSuccessCallback<R>;

  /** Callback function to be executed when the mutation fails. */
  #onError?: MutationErrorCallback;

  /**
   * Indicates whether the mutation is currently loading.
   * @state
   */
  loading = $state(false);

  /**
   * The current value of the mutation result.
   * @state
   */
  data: Awaited<R> | null = $state(null);

  constructor(options: MutationStateOptions<P, R>) {
    this.#mutate = options.mutate;
    this.#onSuccess = options.onSuccess;
    this.#onError = options.onError;
  }

  /**
   * Handles the execution of a promise while managing loading state and invoking success or error callbacks.
   *
   * @template P - A promise that resolves to the awaited result type `R`.
   * @param promise - The promise to be executed and unwrapped.
   * @returns A promise that resolves to the result of the input promise, typed as `R`.
   * @throws The error encountered during the execution of the input promise.
   */
  #unwrap = async (promise: Promise<Awaited<R>>) => {
    this.loading = true;

    try {
      const result = await promise;

      this.data = result;
      this.#onSuccess?.(result);

      return result as R;
    } catch (err) {
      this.#onError?.(err);
      throw err;
    } finally {
      this.loading = false;
    }
  };

  /**
   * Executes a mutation function with the provided parameters and handles loading state, success, and error callbacks.
   *
   * @param {...P} params - The parameters to pass to the mutation function.
   * @returns {R} A promise that resolves with the result of the mutation function.
   * @throws Will throw an error if the mutation function fails.
   */
  mutate = (...params: P): R => {
    const response = this.#mutate(...params);

    if (response instanceof Promise) {
      return this.#unwrap(response) as R;
    }

    return response;
  };

  /**
   * Resets the state of the mutation hook by setting the loading state to `false` and clearing any existing data.
   */
  reset = () => {
    this.loading = false;
    this.data = null;
  };
}
