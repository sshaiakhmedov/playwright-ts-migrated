import type { APIRequestContext } from '@playwright/test';
import { BaseAPI } from './Base.api';
import { API_ENDPOINTS } from '../constants/index';

export class PostmanAPI extends BaseAPI {
  constructor(request: APIRequestContext, token?: string) {
    super(request, token);
  }

  async getPostmanEcho(queryParams: Record<string, string>): Promise<unknown> {
    return await this.get(API_ENDPOINTS.POSTMAN_ECHO_GET, { params: queryParams });
  }

  async postPostmanEcho(payload: Record<string, unknown>): Promise<unknown> {
    const response = await this.request.post(API_ENDPOINTS.POSTMAN_ECHO_POST, {
      data: payload,
    });
    return this.validateAndParse(response, 200);
  }
}
