/* eslint @typescript-eslint/no-explicit-any: 0 */
import { parseStringPromise } from 'xml2js';
import { Page, expect } from '@playwright/test';
import { AUTH_HEADER_BZ, CUSTOM_USER_AGENT, EXCLUDED_PATTERN_REGEXP, LAYOUT_REQUEST_BODY } from '../../data';
import { Logger, getEnv, removeHttpTags } from '../../utils';

const logger = new Logger('API');
const { url } = getEnv();

export default class Api {
  constructor(readonly page: Page) {
    this.page = page;
  }

  async getResponseBody(url: string, action: Promise<void>): Promise<any> {
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

  async emulateNetworkError(url: string, error = 400): Promise<void> {
    await this.page.route(url, route =>
      route.fulfill({
        status: error,
      }),
    );
  }

  /**
   * Sends an HTTP request using the specified method to a given URL with optional data.
   *
   * @async
   * @param {string} method - The HTTP method (e.g., 'GET', 'POST') to use for the request.
   * @param {string} url - The base URL for the request.
   * @param {string} slug - The slug or additional path for the URL.
   * @param {Object} [data] - Optional data to include in the request body (e.g., for 'POST' requests).
   * @returns {Promise<{ status: number, headers: Object.<string, string>, body: string }>} - An object containing the response status, headers, and body.
   * @throws {Error} - Throws an error if the request fails.
   * @throws {TypeError} - Throws a type error if the 'method' argument is not a valid HTTP method.
   * @throws {TypeError} - Throws a type error if the 'data' argument is not an object for 'POST' requests.
   *
   * @example
   * // Sending a GET request
   * const response = await sendRequest('GET', 'https://example.com/api/', 'resource');
   * console.log(response.status);   // HTTP status code
   * console.log(response.headers);  // Response headers
   * console.log(response.body);     // Response body
   */
  async sendRequest(method: TMethods, url: string, slug: string, data?) {
    const response = await this.page.request[method](`${url}${slug}`, {
      headers: { ...AUTH_HEADER_BZ, ...CUSTOM_USER_AGENT },
      data,
    });
    return {
      status: response.status(),
      headers: response.headers(),
      body: response.status() === 200 ? await response.text() : '',
    };
  }

  async openPage(page?: string): Promise<string> {
    const path = page ? `${url}/${page}` : url;
    const { body } = await this.sendRequest('get', path, '');
    return body;
  }

  async callInternalApi(method: TMethods, slug: string, data?): Promise<any> {
    const { body } = await this.sendRequest(method, url, slug, data);
    return JSON.parse(body);
  }

  async getThematicSections(): Promise<
    {
      title: string;
      uri: string | undefined;
    }[]
  > {
    const { data } = await this.callInternalApi('post', '/api/component-manager/v1/layouts/render', LAYOUT_REQUEST_BODY);
    const thematicSections = Object.keys(data.components).filter(section => section.includes('thematic-section'));
    const sections = [];

    thematicSections.forEach(section => {
      if (section !== 'thematic-section-games')
        sections.push({ title: data.components[section].data.title.de, uri: data.components[section].data?.uri });
    });

    return sections;
  }

  async getArticlesByAuthorId(authorId: string): Promise<any> {
    return this.callInternalApi('get', `/api/authors/v1/${authorId}/article-previews?limit=100`);
  }

  async getAuthors(): Promise<any> {
    return this.callInternalApi('get', `/api/authors/v1`);
  }

  async validateCacheHeaders(url: string, pattern: string, expected: string): Promise<void> {
    const metalist = await this.page.$$('script');
    const scripts = [];

    for (const meta of metalist) {
      const src = await meta.getAttribute('src');
      if (src && src.includes(pattern)) scripts.push(src);
    }

    for (const script of scripts) {
      const { headers } = await this.sendRequest('get', url, script);
      expect(headers['cache-control'], `not ${expected} for ${url} url`).toEqual(expected);
    }
  }

  private async getSiteMapList(url: string): Promise<TSiteMapItem[]> {
    const updatedUrl = url.replace('www', 'prod');
    const { body } = await this.sendRequest('get', updatedUrl, '');
    const siteMap = await parseStringPromise(body);
    if (siteMap?.sitemapindex?.sitemap) {
      return siteMap.sitemapindex.sitemap.map(({ lastmod, loc }) => ({ lastmod: lastmod[0], url: loc[0] }));
    }

    if (siteMap?.urlset?.url) {
      return siteMap.urlset.url.map(({ lastmod, loc }) => ({ lastmod: lastmod[0], url: loc[0] }));
    }

    return [];
  }

  async getFullSiteMapList(filter: 'sitemap.articles' | 'sitemap.topics' | 'sitemap.authors'): Promise<TSiteMapItem[]> {
    const baseUrl = 'https://prod.berliner-zeitung.de';
    const siteMapUrl = `${baseUrl}/sitemap.xml`;

    logger.info(`Getting sitemap list: "${siteMapUrl}" ...`);

    const siteMapList = await this.getSiteMapList(siteMapUrl);
    const siteMapArticles = siteMapList.filter(({ url }) => url.includes(filter));
    return (await Promise.all(siteMapArticles.map(({ url }) => this.getSiteMapList(url)))).flat(1);
  }

  async getAuthorsFromSitemap(): Promise<string[]> {
    const list = await this.getFullSiteMapList('sitemap.authors');
    return list.map(({ url }) => url);
  }

  async getNoIndexArticles(): Promise<
    {
      url: string;
      id: string;
      noIndex: boolean;
    }[]
  > {
    const { data } = await this.callInternalApi('post', '/api/component-manager/v1/layouts/render', LAYOUT_REQUEST_BODY);
    const sections = Object.keys(data.components).filter(key => !key.match(EXCLUDED_PATTERN_REGEXP));

    const articles = sections.flatMap(section => {
      const previews = data.components[section]?.data?.previews ?? [];
      return previews.map(preview => ({
        url: preview?.urls?.[0],
        id: preview?.urls?.[0]?.split('.')[1],
        noIndex: preview?.specialFlags?.NO_INDEX,
      }));
    });
    return articles.flat(1).filter(item => item !== undefined && item?.noIndex);
  }

  async getMostReadTitles(product: TProduct): Promise<string[]> {
    let mostReadTitles = [];
    const { data } = await this.callInternalApi('post', '/api/component-manager/v1/layouts/render', LAYOUT_REQUEST_BODY);
    const { previews } = data.components['most-read-row'].data.components['most-read-articles'].data;

    if (product === 'BZ') {
      previews.forEach(({ attributes, titles }) => {
        if (attributes && attributes.length > 0) {
          mostReadTitles.push(attributes[0].title1);
          mostReadTitles.push(attributes[0].title2);
        } else {
          mostReadTitles.push(titles.organic);
        }
      });
      mostReadTitles = removeHttpTags(mostReadTitles).map(title => title.trim());
    } else if (product === 'EV') {
      mostReadTitles = removeHttpTags(previews.map(({ title }) => title));
    }

    logger.info(`API most read: ${JSON.stringify(mostReadTitles, null, 2)}`);
    return mostReadTitles;
  }
}
