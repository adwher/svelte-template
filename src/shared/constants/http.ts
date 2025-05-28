/**
 * Contains constants for HTTP headers, MIME types, and HTTP-related constants.
 * @module constants/http
 */

export enum HeaderName {
  CacheControl = "Cache-Control",
  CacheTag = "E-Tag",
  ContentType = "Content-Type",
  AcceptedLanguage = "Accept-Language",
  CrossOrigin = "Access-Control-Allow-Origin",
}

export enum CookieName {
  Language = "language",
}

export enum ContentType {
  JSON = "application/json",
  SVG = "image/svg+xml",
}
