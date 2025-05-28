import * as v from "valibot";

import {
  maxLengthError,
  minLengthError,
  mustBeEmailError,
  mustHaveLowercaseError,
  mustHaveNumberError,
  mustHaveSpecialCharacterError,
  mustHaveUppercaseError,
} from "$lib/i18n/messages.ts";

/** Schema for validating a ULID. */
export const ULIDSchema = v.pipe(v.string(), v.ulid());

/** Schema for validating a UUID. */
export const UUIDSchema = v.pipe(v.string(), v.uuid());

/** Schema for validating an email. */
export const EmailSchema = v.pipe(v.string(), v.email(mustBeEmailError));

/** Schema for validating a password. */
export const PasswordSchema = v.pipe(
  v.string(),
  v.minLength(8, minLengthError),
  v.maxLength(32, maxLengthError),
  v.regex(/[a-z]/, mustHaveLowercaseError),
  v.regex(/[A-Z]/, mustHaveUppercaseError),
  v.regex(/[0-9]/, mustHaveNumberError),
  v.regex(/[^a-zA-Z0-9]/, mustHaveSpecialCharacterError),
);

/** Schema for validating a date and time in ISO-8601 format. */
export const DateTimeSchema = v.pipe(v.string(), v.isoTimestamp());
