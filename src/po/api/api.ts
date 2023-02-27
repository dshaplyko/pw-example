import { Page } from '@playwright/test';
import { URLs } from '../../data';

export default class Api {
  constructor(readonly page: Page) {
    this.page = page;
  }

  async getResponseBody(url: string, action: Promise<void>): Promise<TNetworkResponse> {
    try {
      const [response] = await Promise.all([
        this.page.waitForResponse(response => response.url().includes(url), {
          timeout: 15000,
        }),
        action,
      ]);
      return response.json();
    } catch (e) {
      throw new Error(`The ${url} request has not been intercepted`);
    }
  }

  async mockNetworkResponse<T>(url: URLs, body: T): Promise<void> {
    await this.page.route(url, route => {
      route.fulfill({
        body: JSON.stringify(body),
      });
    });
  }

  async unroute(url: URLs): Promise<void> {
    await this.page.unroute(url);
  }
}
