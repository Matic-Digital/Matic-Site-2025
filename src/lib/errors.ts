/**
 * Custom error classes for better error handling and typing
 */

export class ContentfulError extends Error {
  constructor(
    message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ContentfulError';
  }
}

export class NetworkError extends Error {
  constructor(
    message: string,
    public response?: Response
  ) {
    super(message);
    this.name = 'NetworkError';
  }
}

export class GraphQLError extends Error {
  constructor(
    message: string,
    public errors: Array<{ message: string }>
  ) {
    super(message);
    this.name = 'GraphQLError';
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public field?: string
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class ResourceNotFoundError extends Error {
  constructor(
    message: string,
    public resource: string
  ) {
    super(message);
    this.name = 'ResourceNotFoundError';
  }
}

// Error type guard functions
export const isContentfulError = (error: unknown): error is ContentfulError =>
  error instanceof ContentfulError;

export const isNetworkError = (error: unknown): error is NetworkError =>
  error instanceof NetworkError;

export const isGraphQLError = (error: unknown): error is GraphQLError =>
  error instanceof GraphQLError;

export const isValidationError = (error: unknown): error is ValidationError =>
  error instanceof ValidationError;

export const isResourceNotFoundError = (error: unknown): error is ResourceNotFoundError =>
  error instanceof ResourceNotFoundError;
