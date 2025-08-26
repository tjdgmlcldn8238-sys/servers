import { OAuthErrorResponse } from "../../shared/auth.js";

/**
 * Base class for all OAuth errors
 */
export class OAuthError extends Error {
  static errorCode: string;

  constructor(
    message: string,
    public readonly errorUri?: string
  ) {
    super(message);
    this.name = this.constructor.name;
  }

  /**
   * Converts the error to a standard OAuth error response object
   */
  toResponseObject(): OAuthErrorResponse {
    const response: OAuthErrorResponse = {
      error: this.errorCode,
      error_description: this.message
    };

    if (this.errorUri) {
      response.error_uri = this.errorUri;
    }

    return response;
  }

  get errorCode(): string {
    return (this.constructor as typeof OAuthError).errorCode
  }
}

/**
 * Invalid request error - The request is missing a required parameter,
 * includes an invalid parameter value, includes a parameter more than once,
 * or is otherwise malformed.
 */
export class InvalidRequestError extends OAuthError {
  static errorCode = "invalid_request";
}

/**
 * Invalid client error - Client authentication failed (e.g., unknown client, no client
 * authentication included, or unsupported authentication method).
 */
export class InvalidClientError extends OAuthError {
  static errorCode = "invalid_client";
}

/**
 * Invalid grant error - The provided authorization grant or refresh token is
 * invalid, expired, revoked, does not match the redirection URI used in the
 * authorization request, or was issued to another client.
 */
export class InvalidGrantError extends OAuthError {
  static errorCode = "invalid_grant";
}

/**
 * Unauthorized client error - The authenticated client is not authorized to use
 * this authorization grant type.
 */
export class UnauthorizedClientError extends OAuthError {
  static errorCode = "unauthorized_client";
}

/**
 * Unsupported grant type error - The authorization grant type is not supported
 * by the authorization server.
 */
export class UnsupportedGrantTypeError extends OAuthError {
  static errorCode = "unsupported_grant_type";
}

/**
 * Invalid scope error - The requested scope is invalid, unknown, malformed, or
 * exceeds the scope granted by the resource owner.
 */
export class InvalidScopeError extends OAuthError {
  static errorCode = "invalid_scope";
}

/**
 * Access denied error - The resource owner or authorization server denied the request.
 */
export class AccessDeniedError extends OAuthError {
  static errorCode = "access_denied";
}

/**
 * Server error - The authorization server encountered an unexpected condition
 * that prevented it from fulfilling the request.
 */
export class ServerError extends OAuthError {
  static errorCode = "server_error";
}

/**
 * Temporarily unavailable error - The authorization server is currently unable to
 * handle the request due to a temporary overloading or maintenance of the server.
 */
export class TemporarilyUnavailableError extends OAuthError {
  static errorCode = "temporarily_unavailable";
}

/**
 * Unsupported response type error - The authorization server does not support
 * obtaining an authorization code using this method.
 */
export class UnsupportedResponseTypeError extends OAuthError {
  static errorCode = "unsupported_response_type";
}

/**
 * Unsupported token type error - The authorization server does not support
 * the requested token type.
 */
export class UnsupportedTokenTypeError extends OAuthError {
  static errorCode = "unsupported_token_type";
}

/**
 * Invalid token error - The access token provided is expired, revoked, malformed,
 * or invalid for other reasons.
 */
export class InvalidTokenError extends OAuthError {
  static errorCode = "invalid_token";
}

/**
 * Method not allowed error - The HTTP method used is not allowed for this endpoint.
 * (Custom, non-standard error)
 */
export class MethodNotAllowedError extends OAuthError {
  static errorCode = "method_not_allowed";
}

/**
 * Too many requests error - Rate limit exceeded.
 * (Custom, non-standard error based on RFC 6585)
 */
export class TooManyRequestsError extends OAuthError {
  static errorCode = "too_many_requests";
}

/**
 * Invalid client metadata error - The client metadata is invalid.
 * (Custom error for dynamic client registration - RFC 7591)
 */
export class InvalidClientMetadataError extends OAuthError {
  static errorCode = "invalid_client_metadata";
}

/**
 * Insufficient scope error - The request requires higher privileges than provided by the access token.
 */
export class InsufficientScopeError extends OAuthError {
  static errorCode = "insufficient_scope";
}

/**
 * A utility class for defining one-off error codes
 */
export class CustomOAuthError extends OAuthError {
  constructor(private readonly customErrorCode: string, message: string, errorUri?: string) {
    super(message, errorUri);
  }

  get errorCode(): string {
    return this.customErrorCode;
  }
}

/**
 * A full list of all OAuthErrors, enabling parsing from error responses
 */
export const OAUTH_ERRORS = {
  [InvalidRequestError.errorCode]: InvalidRequestError,
  [InvalidClientError.errorCode]: InvalidClientError,
  [InvalidGrantError.errorCode]: InvalidGrantError,
  [UnauthorizedClientError.errorCode]: UnauthorizedClientError,
  [UnsupportedGrantTypeError.errorCode]: UnsupportedGrantTypeError,
  [InvalidScopeError.errorCode]: InvalidScopeError,
  [AccessDeniedError.errorCode]: AccessDeniedError,
  [ServerError.errorCode]: ServerError,
  [TemporarilyUnavailableError.errorCode]: TemporarilyUnavailableError,
  [UnsupportedResponseTypeError.errorCode]: UnsupportedResponseTypeError,
  [UnsupportedTokenTypeError.errorCode]: UnsupportedTokenTypeError,
  [InvalidTokenError.errorCode]: InvalidTokenError,
  [MethodNotAllowedError.errorCode]: MethodNotAllowedError,
  [TooManyRequestsError.errorCode]: TooManyRequestsError,
  [InvalidClientMetadataError.errorCode]: InvalidClientMetadataError,
  [InsufficientScopeError.errorCode]: InsufficientScopeError,
} as const;
