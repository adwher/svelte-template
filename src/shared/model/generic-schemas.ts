import { z } from "zod";

/** Schema for validating a password. */
export const PasswordSchema = z
  .string()
  .check(
    z.minLength(8),
    z.maxLength(32),
    z.regex(/[a-z]/),
    z.regex(/[A-Z]/),
    z.regex(/[0-9]/),
    z.regex(/[^a-zA-Z0-9]/),
  );

/** Schema for validating a date and time in ISO-8601 format. */
export const DateTimeSchema = z.iso.datetime().describe("Date and time in ISO-8601 format");

/** Schema for validating a date in ISO-8601 date-only format. */
export const DateSchema = z.iso.date().describe("Date in ISO-8601 format");
