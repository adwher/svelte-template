import { ulid } from "@std/ulid";
import { SvelteMap } from "svelte/reactivity";

import Bug from "~icons/ph/bug-duotone";
import Check from "~icons/ph/check-circle-duotone";
import Warning from "~icons/ph/warning-duotone";

import { ToastState, type ToastID, type ToastOptions, type ToastSeverity } from "./toast.svelte";

export type ToasterToastOptions = Omit<ToastOptions, "message" | "severity">;

class ToasterState {
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
   * @param message - The message to display or the error.
   * @param options - The options for the toast message.
   * @returns The ID of the created toast message.
   */
  error = (error: unknown, options?: ToasterToastOptions): ToastID => {
    const message: string = error instanceof Error ? error.message : String(error);

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
