/* eslint @typescript-eslint/no-explicit-any: 0 */
import { convert } from 'html-to-text';
import Api from './api';
import { getEnv, Logger } from '../../utils';
import { WP_MENUS } from '../../data';

const logger = new Logger('LD API');
const { wpUrl, wpToken } = getEnv();
const extractRenderedTitle = (text: string): string => /<span class="menu-image-title">(.*?)<\/span>/.exec(text)[1];

export default class WordpressApi extends Api {
  async read(apiURL: string): Promise<any> {
    const fullApiURL = `${wpUrl}${apiURL}`;
    logger.info(`Read LD: "${fullApiURL}" ...`);

    const response = await this.page.request.get(`${wpUrl}${apiURL}`, {
      headers: {
        Authorization: `Basic ${wpToken}`,
      },
    });
    return response.json();
  }

  async getItemsFromMenu(menu: WP_MENUS): Promise<string[]> {
    return (await this.read(`menu-items?menus=${menu}`)).map(({ title }) => extractRenderedTitle(title.rendered));
  }

  async getArticlesInfo(top: number): Promise<[{ path: string; title: string; description: string }]> {
    const articles = await this.read('posts');
    return articles
      .map(({ title, link, excerpt }) => ({
        path: link.split('.de/')[1],
        title: convert(title.rendered),
        description: convert(excerpt.rendered),
      }))
      .filter(({ path }) => path)
      .slice(0, top);
  }
}
