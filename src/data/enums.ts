export enum URLs {
  DASHBOARD_TASKS = '**/tasks',
  TASKS = '**/tasks?payload*',
  PROFILE = '**/api/v1/app/profile',
  SUMMARY = '**/points/summary',
  PROFILE_CLASSES = '**/history?status=complete**',
  CLASS_PAYLOAD = '**/payload?classKey**',
  CLASS_QUIZ_RESULT = '**/payload',
  CONFIG = '**/app/boot?client**',
  CLAIM = '**/rewards/claim',
  FLASH_CARD_FREQUENCY = '**/flashCardsFrequency',
  FLASH_CARD_CONFIG = '**/flashCardsConfiguration',
}
