import { test, Browser, Page } from '@playwright/test';
import random from 'lodash/random';

export const useState = (state: 'loggedIn' | 'clean') => {
  const paths = {
    loggedIn: './src/data/bz/states/state.json',
    clean: './src/data/bz/states/default.json',
  };
  const path = paths[state];

  test.use({
    storageState: path,
  });
};

export const useMobile = (device: TDevices) => {
  const devices = {
    'iphone-13': { width: 390, height: 844 },
    'galaxy-s8': { width: 360, height: 740 },
    'tablet-p': { width: 820, height: 1180 },
    'tablet-l': { width: 1180, height: 820 },
  };

  const { width, height } = devices[device];

  test.use({
    viewport: { width, height },
    isMobile: true,
  });
};

export const createPage = async (browser: Browser): Promise<Page> => {
  const context = await browser.newContext();
  return context.newPage();
};

export const getRandomNumber = (max: number) => random(max);
export const getNumbersFromString = (str: string): number => parseInt(str.match(/\d+/g)[0], 10);
