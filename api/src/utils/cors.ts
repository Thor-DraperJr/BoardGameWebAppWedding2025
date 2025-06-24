/**
 * CORS utility functions for Azure Functions
 */

export const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'Access-Control-Max-Age': '86400', // 24 hours
} as const;

export function createCorsResponse(statusCode = 200, additionalHeaders: Record<string, string> = {}) {
  return {
    status: statusCode,
    headers: {
      ...CORS_HEADERS,
      ...additionalHeaders,
    },
  };
}

export function createJsonResponse(
  data: unknown,
  statusCode = 200,
  additionalHeaders: Record<string, string> = {}
) {
  return {
    status: statusCode,
    headers: {
      'Content-Type': 'application/json',
      ...CORS_HEADERS,
      ...additionalHeaders,
    },
    body: JSON.stringify(data),
  };
}

export function createErrorResponse(
  message: string,
  statusCode = 500,
  additionalHeaders: Record<string, string> = {}
) {
  return createJsonResponse(
    { error: message, timestamp: new Date().toISOString() },
    statusCode,
    additionalHeaders
  );
}