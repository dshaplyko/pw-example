/* eslint @typescript-eslint/no-explicit-any: 0 */
import { test } from '@playwright/test';
import Api from './api';
import { filterArticles, getDateAsTimestamp, getEnv, Logger, removeHttpTags, separateArticles } from '../../utils';
import { ENVs, LD_LISTS } from '../../data';

const logger = new Logger('LD API');
const { url, ldUrl, ldToken, type } = getEnv();

export default class LeavingDocsApi extends Api {
  async read(apiURL: string): Promise<any> {
    const serverURL: string = ldUrl;
    const token: string = ldToken;
    const fullApiURL = `${serverURL}api/v1/${apiURL}`;

    logger.debug(`Read LD: "${fullApiURL}" ...`);

    const response = await this.page.request.get(fullApiURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const LDResponse = await response.json();
    const documents = LDResponse.documents ? LDResponse.documents : LDResponse;

    test.skip(documents.length === 0, `Skipped since 0 documents returned for ${apiURL}`);
    return documents;
  }

  async readDocumentList(list: LD_LISTS): Promise<any> {
    return this.read(`document-lists/${list}`);
  }

  private async getArticlesFromLD(apiUrl: string): Promise<any> {
    const documents = await this.read(apiUrl);
    const { adArticles, nonAdArticles } = separateArticles(documents);
    return {
      adArticles,
      nonAdArticles,
    };
  }

  async getArticlesWithAlternativeTitles(apiUrl: string): Promise<any> {
    const documents = await this.read(apiUrl);
    const articlesWithAltTitles = documents
      .filter(({ metadata }) => metadata.alternativeTitle)
      .map(({ metadata }) => `${url}${metadata.routing.path}`);
    logger.info(`Articles with ${articlesWithAltTitles.length} alternative titles found`);
    return articlesWithAltTitles;
  }

  async getLiveBlogArticles(apiUrl: string): Promise<any> {
    const documents = await this.read(apiUrl);
    const liveBlogArticles = documents.filter(({ metadata }) => metadata.liveblog).map(({ metadata }) => `${url}${metadata.routing.path}`);
    logger.info(`${liveBlogArticles.length} Live Blog articles found`);
    return liveBlogArticles;
  }

  async getArticleWithIframe(apiUrl: string): Promise<{ article: string; videoUrl: string }> {
    const documents = await this.read(apiUrl);
    const articleWithIframe = documents
      .flatMap(({ content, metadata }) => ({
        body: content?.[0]?.containers?.body?.find(({ component }) => component === 'iframe'),
        url: metadata?.routing?.path,
      }))
      .find(({ body }) => body);

    test.skip(!articleWithIframe, 'No iframe articles found');
    logger.info(`Article ${articleWithIframe.url} contains ${articleWithIframe.body.component}`);

    return {
      article: articleWithIframe.url,
      videoUrl: articleWithIframe.body.content.iframe.html.match(/src="([^"]+)"/)[1],
    };
  }

  async getArticleURLsFromLD(apiUrl: string): Promise<{
    adArticles: string[];
    nonAdArticles: string[];
  }> {
    const { adArticles, nonAdArticles } = await this.getArticlesFromLD(apiUrl);

    return {
      adArticles: adArticles
        .map(({ metadata }) => `${ENVs.prod.url}${metadata.routing.path}`)
        .filter((url: string) => !url.includes('/autoren')),
      nonAdArticles: nonAdArticles
        .map(({ metadata }) => `${ENVs.prod.url}${metadata.routing.path}`)
        .filter((url: string) => !url.includes('/autoren/') && !url.includes('ticketshop')),
    };
  }

  async getDocumentListsFromLD(apiURL: string): Promise<any> {
    const { nonAdArticles } = await this.getArticlesFromLD(`${apiURL}?fields=content,metadata,systemdata`);
    return filterArticles(nonAdArticles);
  }

  async getDocumentsFromLD(): Promise<any> {
    const { nonAdArticles } = await this.getArticlesFromLD(`documents/latestPublications?publishedAt.lt=${getDateAsTimestamp(8)}`);
    return filterArticles(nonAdArticles);
  }

  async collectShortLinks(top: number): Promise<
    {
      redirectTo: string;
      shortlink: string;
    }[]
  > {
    const response = await this.read('documents/latestPublications?contentTypes=shortlink');
    return response
      .map(({ metadata }) => ({
        redirectTo: metadata.redirectTo,
        shortlink: metadata.shortlink,
      }))
      .slice(0, top);
  }

  async getArticleTitlesFromList(list: LD_LISTS): Promise<string[]> {
    const documents = await this.readDocumentList(list);
    const articleIds = documents.map(({ systemdata }) => systemdata.documentId);
    const responses = await Promise.all(articleIds.map((id: string) => this.read(`documents/${id}/latestPublication`)));

    return [
      ...removeHttpTags(responses.map(({ content }) => content[0]?.containers?.header[0]?.content?.title)),
      ...removeHttpTags(responses.map(({ metadata }) => metadata?.alternativeTitle).filter(Boolean)),
    ];
  }

  async getArticlesInfo(top: number): Promise<[{ path: string; title: string; description: string }]> {
    const articles = await this.read('documents/latestPublications');
    return articles
      .map(({ metadata, content }) => ({
        path: metadata.routing?.path,
        title: content[0]?.containers?.header[0]?.content?.title || metadata.title,
        description: metadata.description,
      }))
      .filter(({ path }) => path)
      .slice(0, top);
  }

  async getBurgerMenuLinks(): Promise<{ [key in TSections]: string[] }> {
    const response = (await this.read('menus')).filter(({ label }) => label.includes('Burger'));
    const burgerMenuLinks = {
      top: [] as string[],
      topics: [] as string[],
      middle: [] as string[],
      lower: [] as string[],
      media: [] as string[],
      profile: [] as string[],
      'line menu': [] as string[],
      'lower-expand': [] as string[],
      external: [] as string[],
    };
    response.forEach(({ label, nodes }) => {
      const labelMap = {
        'Burger Menu - Top Links': 'top',
        'Burger Menu - Topic Links': 'topics',
        'Burger Menu - Bottom links': 'lower',
        'Burger menu - mid section': 'middle',
        'Burger menu - Bottom Expand Links': 'lower-expand',
        'Burger Menu Top Section - new': 'top',
        'Burger Menu Mid Section - new': 'middle',
      };
      burgerMenuLinks[labelMap[label]] = nodes.map(({ label }) => label);

      if (['bk-qa', 'bk-pre-prod', 'bk-prod'].includes(type)) {
        const burgerMenuMidSectionLinks = response
          .find(({ label }) => label === 'Burger Menu Mid Section - new')
          .nodes.map(({ nodes }) => nodes)
          .flat(1)
          .map(({ label }) => label);
        burgerMenuLinks.middle = burgerMenuLinks.middle.concat(burgerMenuMidSectionLinks);
      }
    });
    return burgerMenuLinks;
  }

  async getBreakingNewsArticle() {
    const breakingNewsArticle = (await this.read('documents/latestPublications')).filter(({ metadata }) => metadata.breakingNews);
    test.skip(breakingNewsArticle.length === 0, 'No breaking news');
    return breakingNewsArticle;
  }

  async getTopicsFromTopicSlider(): Promise<string[]> {
    const response = await this.read('menus');
    let handler: string;

    switch (type) {
      case 'bk-qa':
        handler = 'topic-slider';
        break;
      case 'bk-pre-prod':
        handler = 'topicsliderpreprod';
        break;
      case 'bk-prod':
        handler = 'topicslidernew';
        break;
      default:
        handler = 'main-new';
        break;
    }

    return response.find(({ handle }) => handle === handler).nodes.map(({ label }) => label);
  }

  async getSearchTerms(): Promise<string[]> {
    const response = await this.read('menus');
    return response.find(({ handle }) => handle === 'popular-search-terms').nodes.map(({ label }) => label);
  }
}
