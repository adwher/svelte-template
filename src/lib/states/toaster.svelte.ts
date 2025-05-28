import { ulid } from "@std/ulid";
import { SvelteMap } from "svelte/reactivity";

import Bug from "~icons/ph/bug";
import Check from "~icons/ph/check-circle";
import Warning from "~icons/ph/warning";

import { ToastState, type ToastID, type ToastOptions, type ToastSeverity } from "./toast.svelte.ts";

export type ToasterToastOptions = Omit<ToastOptions, "message" | "severity">;

export interface ToasterStatePromiseOptions extends ToasterToastOptions {
  pending: string;

  success?: string;

  error?: string;
}

export class ToasterState {
  #toasts: SvelteMap<string, ToastState> = new SvelteMap();

  /**
   * A derived store that contains the list of active toast messages.
   * This can be used to display the toast messages in the UI.
   * @derived
   */
  readonly toasts = $derived(Array.from(this.#toasts.values()));

  /**
   * Internal helper to create and add a toast message to the store.
   * Used by the public toast methods for each severity.
   *
   * @param severity - The severity of the toast message.
   * @param message - The message to display.
   * @param options - The options for the toast message.
   * @returns The ID of the created toast message.
   */
  #toast = (severity: ToastSeverity, message: string, options?: ToasterToastOptions): ToastID => {
    const id = ulid();
    const toast = new ToastState(id, { ...options, message, severity });

    this.#toasts.set(id, toast);
    return id;
  };

  /**
   * Displays a sequence of toast messages based on the state of a promise.
   * Shows a pending message while the promise is unresolved, then displays a success or error message depending on the outcome.
   *
   * @typeParam T - The type of the resolved value of the promise.
   * @param promise - The promise to monitor.
   * @param options - Options for the pending, success, and error toast messages.
   * @returns A promise that resolves when the toast sequence is complete.
   */
  promise = async (
    promise: Promise<unknown>,
    options: ToasterStatePromiseOptions,
  ): Promise<void> => {
    const message = this.message(options.pending, { duration: false });

    try {
      await promise;

      if (options.success) {
        this.success(options.success, options);
      }
    } catch (err) {
      if (options.error) {
        this.error(options.error, options);
      }
    } finally {
      this.dismiss(message);
    }
  };

  /**
   * Displays a success toast message.
   * @param message - The message to display.
   * @param options - The options for the toast message.
   * @returns The ID of the created toast message.
   */
  success = (message: string, options?: ToasterToastOptions): ToastID => {
    return this.#toast("success", message, { icon: Check, ...options });
  };

  /**
   * Displays an error toast message.
   * @param message - The message to display.
   * @param options - The options for the toast message.
   * @returns The ID of the created toast message.
   */
  error = (message: string, options?: ToasterToastOptions): ToastID => {
    return this.#toast("error", message, { icon: Bug, ...options });
  };

  /**
   * Displays a warning toast message.
   * @param message - The message to display.
   * @param options - The options for the toast message.
   * @returns The ID of the created toast message.
   */
  warning = (message: string, options?: ToasterToastOptions): ToastID => {
    return this.#toast("warning", message, { icon: Warning, ...options });
  };

  /**
   * Displays a message toast message.
   * @param message - The message to display.
   * @param options - The options for the toast message.
   * @returns The ID of the created toast message.
   */
  message = (message: string, options?: ToasterToastOptions): ToastID => {
    return this.#toast("message", message, options);
  };

  /**
   * Dismisses a toast message by its ID.
   * @param id - The ID of the toast message to dismiss.
   */
  dismiss = (id: ToastID): void => {
    this.#toasts.delete(id);
  };
}

/**
 * A singleton instance of {@linkcode ToasterState}.
 * This is used to manage the state of toast messages in the application.
 * @singleton
 */
export const toaster = new ToasterState();
