/**
 * Contains constants for HTTP headers, MIME types, and HTTP-related constants.
 * @module constants/http
 */

export enum HeaderKey {
  ContentType = "Content-Type",
  AcceptedLanguage = "Accept-Language",
}

export enum CookieName {
  Language = "language",
}

export enum ContentType {
  JSON = "application/json",
  SVG = "image/svg+xml",
}
