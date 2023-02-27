import * as dotenv from 'dotenv';

dotenv.config();

const password = process.env.USER_PASS as string;
export const ENVs = {
  local: {
    url: '',
    adminUrl: '',
    flashCardsConfig: '',
    user: {
      id: 8302,
      email: '',
      password,
    },
    launch: 'Engage Local',
  },
  dev: {
    url: '',
    adminUrl: '',
    flashCardsConfig: 'integration_flash_card_config',
    user: {
      id: 8302,
      email: '',
      password,
    },
    launch: 'Engage DEV',
  },
  stg: {
    url: '',
    adminUrl: '',
    flashCardsConfig: 'friends_flash_card_config',
    user: {
      id: 2302,
      email: '',
      password,
    },
    launch: 'Engage STG',
  },
};
export const { COOKIE, RP_TOKEN } = process.env;
export const DEV_USER_QUIZ = {
  email: '',
  password,
};
export const SELF_REGISTER_LINK = `${ENVs.stg.url}#/signup/${process.env.REG_TOKEN}`;

export const EXTRA_CREDIT = {
  STEPS: [
    'Overall, is taking care of your body a priority for you?',
    'How did your last routine physical checkup go?',
    'Are you living with any persistent medical conditions?',
    'When you look back on the previous month, how do you feel about how often you exercised?',
    'Thinking about next month, how do you feel about exercise?',
    'Are you happy with your weight?',
    'How would you describe your diet?',
    "It's a typical weeknight—how much sleep do you get?",
    "It's a typical weekday–how much energy do you have?",
    'Do you have any big health goals for the year?',
  ],
  REMARKS: [
    'One in three adults worldwide is managing multiple medical conditions, according to the World Economic Forum.',
    'The World Health Organization recommends adults perform 150 minutes of moderate exercise each week, plus two strength or resistence training sessions.',
    "Around 62% of adults worldwide say they don't get enough sleep, according to one 2019 survey.",
  ],
  COMPLETE: '10 Health & Fitness Questions COMPLETE!',
};

export const ONBOARDING = {
  STEPS: [
    'Create a character',
    'What would you like to achieve this year? Select up to 3 goals:',
    'Throughout the day how do you generally feel?',
    'Your average day is almost over, how physically active were you?',
    "It's time for your annual check up at the doctor. What can you expect?",
    'You just got paid! What do you do?',
  ],
};
