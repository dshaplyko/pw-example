import test, { Page, Locator, APIResponse } from '@playwright/test';
import { getEnv, getNumbersFromString, Logger } from '../../utils';
import { COOKIE } from '../../data';
import RewardsHistory from '../components/rewards/rewards.history.component';
import BasePage from './Base.page';
import FlashCards from '../components/rewards/flashCards.component';
import RedeemModal from '../components/rewards/redeem.modal.component';

const logger = new Logger('Rewards Page:');
const env = getEnv();

export default class RewardsPage extends BasePage {
  readonly rewardsTitle: Locator;

  readonly viewRewardHistory: Locator;

  readonly rewardsHistory: RewardsHistory;

  readonly flashCards: FlashCards;

  readonly newFlashCardsInfo: Locator;

  readonly rewardHeader: Locator;

  readonly redeemModal: RedeemModal;

  constructor(page: Page, readonly url: string = '#/rewards') {
    super(page);
    this.url = url;
    this.rewardsTitle = this.page.locator('span.point-copy');
    this.viewRewardHistory = this.page.locator('button').filter({ hasText: 'View reward history' }).first();
    this.rewardsHistory = new RewardsHistory(this.page.locator('.reward-history-modal-content'));
    this.flashCards = new FlashCards(this.page.locator('.flash-card-reward-list'));
    this.newFlashCardsInfo = this.page.locator('.info-new-gift-cards');
    this.rewardHeader = this.page.locator('.reward-card-titles');
    this.redeemModal = new RedeemModal(this.page.locator('div.lifeio-modal-backdrop'));
  }

  async goto(url = this.url): Promise<void> {
    await super.goto(url);
  }

  async getPoints(): Promise<number> {
    return getNumbersFromString(await this.rewardsTitle.innerText());
  }

  private async sendRequest(url: string, body: TFlashCard, method: TMethods = 'POST'): Promise<APIResponse> {
    const reponse = await this.page.request.fetch(`${env.adminUrl}${url}`, {
      method,
      headers: {
        Cookie: COOKIE,
      },
      data: body,
    });

    if (reponse.status() === 401) {
      logger.info('Test is skipped. Please update Cookie Value');
      test.skip();
    }

    return reponse;
  }

  async activateFlashCards(): Promise<APIResponse> {
    await this.sendRequest(
      '/flash-card-configs/1',
      {
        budgetValue: '5',
      },
      'PATCH',
    );

    return this.sendRequest('/flash-cards', {
      configKey: env.flashCardsConfig,
      mode: 'issue',
      notify: null,
    });
  }

  async addPoints(points: number): Promise<APIResponse> {
    return this.sendRequest('/user-points', {
      userId: env.user.id,
      amount: points,
      memo: 'Test',
      refType: 'admin',
    });
  }
}
