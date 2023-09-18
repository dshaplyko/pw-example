export const DATE_REGEXP = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/; // e.g. 2023-06-07T15:12:58.000Z
export const META_PROPS_VERSION = /[a-fA-F0-9]{40}/;
export const ARTICLE_SECTION_REGEXP = /[\w\d-+ ]/;
export const URL_REGEXP = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_.~#?&/=]*)$/;
export const CONTENT_ALIGMENT = { center: 'center' };
export const COMMON_LOCATORS = {
  articlePreview: 'div[class*="article-preview_base"]',
  mostReadSection: 'div[class*="most-read_wrapper"]',
};

export const EXPECTED_UPDATE_TIMES = [
  'vor 5 Minuten',
  'vor 6 Minuten',
  'vor 7 Minuten',
  'vor 8 Minuten',
  'vor 9 Minuten',
  'vor 10 Minuten',
  'vor 15 Minuten',
  'vor 20 Minuten',
  'vor 25 Minuten',
  'vor 30 Minuten',
  'vor 35 Minuten',
  'vor 40 Minuten',
  'vor 45 Minuten',
  'vor 50 Minuten',
  'vor 55 Minuten',
  'vor 1 Stunde',
  'vor 2 Stunden',
  'vor 3 Stunden',
  'vor 4 Stunden',
  'vor 5 Stunden',
  'vor 6 Stunden',
  'vor 7 Stunden',
];
