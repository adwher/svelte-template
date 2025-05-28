<!--
  @component
  @name Alert
  @description Displays an alert message with different severities (message, success, warning, error).
  @example
    <Alert severity="success">Success message</Alert>
    <Alert severity="error" horizontal>Error message</Alert>
  @props
    - severity: Alert type. Default: "message".
    - horizontal: Layout direction. Default: false.
-->

<script module lang="ts">
  import { cva } from "class-variance-authority";
  import type { HTMLAttributes } from "svelte/elements";

  export type AlertSeverity = "message" | "error";

  export interface AlertProps extends HTMLAttributes<HTMLQuoteElement> {
    /**
     * The severity of the alert.
     * @default "message"
     */
    severity?: AlertSeverity;

    /**
     * Whether the alert should be displayed horizontally or vertically.
     * @default false
     */
    horizontal?: boolean;
  }

  export const createAlertStyle = cva(["p-4 rounded-md"], {
    variants: {
      severity: {
        message: ["text-emerald-800", "bg-emerald-500/10"],
        error: ["text-orange-800", "bg-orange-500/10"],
      },

      horizontal: {
        true: ["inline-flex items-center gap-2"],
        false: ["flex flex-col gap-2"],
      },
    },

    defaultVariants: {
      severity: "message",
      horizontal: false,
    },
  });
</script>

<script lang="ts">
  let { severity = "message", horizontal = false, children, ...props }: AlertProps = $props();

  const classname = createAlertStyle({ severity, horizontal, class: props.class });
</script>

<quote {...props} class={classname}>
  {@render children?.()}
</quote>
