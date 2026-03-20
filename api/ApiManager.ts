import type { APIRequestContext } from '@playwright/test';
import { PostmanAPI } from './Postman.api';

export class ApiManager {
  readonly postman: PostmanAPI;

  constructor(request: APIRequestContext) {
    this.postman = new PostmanAPI(request);
  }
}
