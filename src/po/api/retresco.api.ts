/* eslint @typescript-eslint/no-explicit-any: 0 */
import Api from './api';
import { getEnv, Logger } from '../../utils';
import { MAXIMUM_NUMBER_OF_TOPICS } from '../../data';

const logger = new Logger('Retresco API');
const { retrescoToken, retrescoUrl } = getEnv();

export default class RetrescoApi extends Api {
  async read(query: string): Promise<any> {
    const serverURL: string = retrescoUrl;
    const token: string = retrescoToken;
    const fullApiURL = `${serverURL}api/${query}`;

    logger.debug(`Read Retresco: "${fullApiURL}" ...`);

    const response = await this.page.request.get(fullApiURL, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    });
    return response.json();
  }

  async collectActiveTopicIds(docId: string, isSliced = true): Promise<string[]> {
    /* eslint camelcase: 0 */
    const { docs } = await this.read(`content/${docId}/topic-pages`);
    const slicedDocs = isSliced ? docs.slice(0, MAXIMUM_NUMBER_OF_TOPICS) : docs;
    const activeTopics = await Promise.all(slicedDocs.map(({ doc_id }) => this.read(`topic-pages/${doc_id}`)));
    return activeTopics
      .filter(({ error, topicpage_disabled, teaser }) => !error && !topicpage_disabled && teaser !== '')
      .map(({ name }) => name);
  }
}
