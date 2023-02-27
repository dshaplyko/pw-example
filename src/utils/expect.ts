import { expect, Locator } from '@playwright/test';

export const expectElementVisibility = async (element: Locator, visibility = true): Promise<void> => {
  const assert = expect(element, `Visibility of ${element} element is incorrect`);
  return assert.toBeVisible({
    visible: visibility,
  });
};

export const expectElementToContainText = async (
  element: Locator,
  toContain: string | string[] | number,
  option = true,
  ignoreCase = true,
): Promise<void> => {
  let textToContain = toContain;
  let assert = expect(element, `The ${element} does not contain "${toContain}" text`);

  if (typeof textToContain === 'number') textToContain = textToContain.toString();

  if (!option) {
    assert = assert.not;
  }

  return assert.toContainText(textToContain, {
    ignoreCase,
  });
};

export const expectToHaveCount = async (element: Locator, count: number): Promise<void> => {
  await expect(element, `Element's count is not ${count}`).toHaveCount(count);
};

export const expectElementsCountToBe = async (element: Locator, toCompare: number, condition: TCompare): Promise<void | Error> => {
  const count = await element.count();
  const assert = expect(count);

  if (condition === 'MORE_THAN') {
    return assert.toBeGreaterThan(toCompare);
  }
  if (condition === 'LESS_THAN') {
    return assert.toBeLessThan(toCompare);
  }
  if (condition === 'MORE_OR_EQUAL') {
    return assert.toBeGreaterThanOrEqual(toCompare);
  }
  if (condition === 'LESS_OR_EQUAL') {
    return assert.toBeLessThanOrEqual(toCompare);
  }
  return new Error('Condition is not met');
};

export const expectArraySorted = (arr: number[], option: 'ascending' | 'descending'): void => {
  const arrayToCompare = [...arr].sort((a: number, b: number) => (option === 'ascending' ? a - b : b - a));
  expect(arr, `${JSON.stringify(arr)} is not sorted properly`).toEqual(arrayToCompare);
};
