import type { APIRequestContext, APIResponse } from '@playwright/test';

export class BaseAPI {
  readonly request: APIRequestContext;
  readonly token?: string;

  constructor(request: APIRequestContext, token?: string) {
    this.request = request;
    this.token = token;
  }

  async get(endpoint: string, options: Record<string, unknown> = {}, expectedStatus = 200): Promise<unknown> {
    const mergedOptions = {
      ...options,
      headers: {
        ...(options.headers as Record<string, string> ?? {}),
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
    };
    const response = await this.request.get(endpoint, mergedOptions);
    return await this.validateAndParse(response, expectedStatus);
  }

  async post(endpoint: string, options: Record<string, unknown> = {}, expectedStatus = 200): Promise<unknown> {
    const response = await this.request.post(endpoint, options);
    return await this.validateAndParse(response, expectedStatus);
  }

  /**
   * Validates the response status code and parses the body as JSON or text.
   */
  async validateAndParse(response: APIResponse, expectedStatus = 200): Promise<unknown> {
    // 1. Check the status code first
    if (response.status() !== expectedStatus) {
      const errorBody = await response.text();
      throw new Error(`Status Mismatch! Expected ${expectedStatus} but got ${response.status()}.\nResponse: ${errorBody}`);
    }

    // 2. Attempt to parse as JSON, fallback to text if it fails
    try {
      return await response.json();
    } catch {
      return await response.text();
    }
  }
}
