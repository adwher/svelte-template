import type { Component } from "svelte";

import { toaster } from "./toaster.svelte";

export type ToastSeverity = "success" | "error" | "warning" | "message";

export interface ToastAction {
  /**
   * The label of the action button.
   * This is the text that will be displayed on the button.
   */
  label: string;

  /**
   * The action to be performed when the toast is clicked.
   * This can be used to provide additional functionality or navigation.
   */
  handle(toast: ToastState): void;
}

export interface ToastOptions {
  /**
   * Message to be displayed in the toast.
   * This is the main text that will be displayed in the toast.
   */
  message: string;

  /**
   * Color of the toast message.
   * This can be used to visually represent the type of message being displayed.
   * @default "message"
   */
  severity?: ToastSeverity;

  /**
   * Icon to be displayed in the toast message.
   * This can be used to visually represent the type of message being displayed.
   */
  icon?: Component;

  /**
   * Action to be performed when the toast is clicked.
   * This can be used to provide additional functionality or navigation.
   */
  action?: ToastAction;

  /**
   * Duration of the toast message in milliseconds.
   * This determines how long the toast will be visible before it automatically dismisses.
   * Set to `false` to disable auto-dismissal.
   * @default 3000
   */
  duration?: number | false;
}

export type ToastID = string;

/** Default duration for toast messages in milliseconds. */
const TOAST_DEFAULT_DURATION = 4000;

/**
 * Represents the state of a toast message.
 * This class manages the ID, options, and dismissal of the toast message.
 */
export class ToastState {
  #id: ToastID;

  /** The options for the toast message. */
  #options: ToastOptions;

  /** The timeout for dismissing the toast message. */
  #timeout: NodeJS.Timeout | null = null;

  constructor(id: ToastID, options: ToastOptions) {
    this.#id = id;
    this.#options = options;

    // Schedule the dismissal of the toast if a duration is provided.
    this.scheduleDismissal(options.duration);
  }

  /**
   * Schedules the dismissal of a toast after a specified duration.
   * If a dismissal is already scheduled or the duration is `false`, the method does nothing.
   *
   * @param duration - The duration in milliseconds after which the toast should be dismissed. If `false`, no dismissal will be scheduled. Defaults to `TOAST_DEFAULT_DURATION`.
   */
  scheduleDismissal(duration: number | false = TOAST_DEFAULT_DURATION) {
    if (this.#timeout || !duration) {
      // Prevent scheduling if already scheduled or there is no duration setup.
      return;
    }

    this.#timeout = setTimeout(() => {
      this.dismiss();
      this.#timeout = null;

      clearTimeout(this.#timeout!);
    }, duration);
  }

  /**
   * Returns the ID of the toast message.
   */
  get id(): string {
    return this.#id;
  }

  /**
   * Returns the title of the toast message.
   */
  get message(): string {
    return this.#options.message;
  }

  /**
   * Returns the icon of the toast message.
   */
  get icon(): Component | undefined {
    return this.#options.icon;
  }

  /**
   * Returns the severity of the toast message.
   */
  get severity(): ToastSeverity {
    return this.#options.severity ?? "message";
  }

  /**
   * Returns the action configuration of the toast message.
   */
  get action(): ToastAction | undefined {
    return this.#options.action;
  }

  /**
   * Dismisses the toast message.
   */
  dismiss = () => {
    toaster.dismiss(this.#id);
  };
}
