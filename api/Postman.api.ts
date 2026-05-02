import type { APIRequestContext } from '@playwright/test';
import { BaseAPI } from './Base.api';
import { API_ENDPOINTS } from '../constants/index';

export interface PostmanEchoArgs {
  foo1?: string;
  foo2?: string;
  [key: string]: string | undefined;
}

export interface PostmanEchoResponse {
  args: PostmanEchoArgs;
  headers: Record<string, string>;
  url: string;
}

export interface PostmanEchoPostPayload {
  [key: string]: unknown;
}

export interface PostmanEchoPostResponse {
  args: Record<string, string>;
  data: PostmanEchoPostPayload;
  files: Record<string, unknown>;
  form: Record<string, unknown>;
  headers: Record<string, string>;
  json: PostmanEchoPostPayload;
  url: string;
}

export class PostmanAPI extends BaseAPI {
  constructor(request: APIRequestContext, token?: string) {
    super(request, token);
  }

  async getPostmanEcho(queryParams: PostmanEchoArgs): Promise<PostmanEchoResponse> {
    return await this.get<PostmanEchoResponse>(API_ENDPOINTS.POSTMAN_ECHO_GET, { params: queryParams });
  }

  async postPostmanEcho(payload: PostmanEchoPostPayload): Promise<PostmanEchoPostResponse> {
    const response = await this.request.post(API_ENDPOINTS.POSTMAN_ECHO_POST, {
      data: payload,
    });
    return this.validateAndParse<PostmanEchoPostResponse>(response, 200);
  }
}
