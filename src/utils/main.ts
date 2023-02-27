import { test, Browser, Page } from '@playwright/test';
import random from 'lodash/random';
import { faker } from '@faker-js/faker';
import { currentDay, getDaysInMonth } from './date';

const getStreakText = (): string =>
  currentDay <= 2 ? 'Get 2 days in a row and start a streak!' : `You are on a ${currentDay - 1} day streak this month!`;

export const useState = (state: 'loggedIn' | 'clean') => {
  const path = state === 'loggedIn' ? './src/data/states/state.json' : './src/data/states/default.json';

  test.use({
    storageState: path,
  });
};

export const useMobile = () => {
  test.use({
    viewport: { width: 390, height: 844 },
  });
};

export function waitSeveralSec(milliseconds: number): Promise<void> {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

export const createPage = async (browser: Browser): Promise<Page> => {
  const context = await browser.newContext();
  return context.newPage();
};

export const getRandomNumber = (max: number) => random(max);

export const generateFakeUser = (): TUser => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = `${firstName}_${lastName}@atmail.com`;
  return { firstName, lastName, email };
};

export const getNumbersFromString = (str: string): number => parseInt(str.match(/\d+/g)[0], 10);
export const stringBuilder = (type: 'points' | 'streak'): string =>
  type === 'points' ? `${currentDay - 1} out of ${getDaysInMonth()}pts` : getStreakText();
