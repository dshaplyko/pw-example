import { RP_TOKEN } from './src/data/constants';

const RPconfig = {
  token: RP_TOKEN,
  endpoint: 'https://reportportal.epam.com/api/v1',
  project: 'brth-dev',
  launch: `Engage Platform ${process.env.TYPE} on ${process.env.ENV} env`,
  attributes: [
    {
      key: 'type',
      value: process.env.TYPE,
    },
  ],
};

export const RP_CI = [
  ['github'],
  [
    'junit',
    {
      outputFile: './reports/report.xml',
    },
  ],
  [
    'html',
    {
      outputFolder: './reports/html',
      open: 'never',
    },
  ],
  ['@reportportal/agent-js-playwright', RPconfig],
];

export const RP_LOCAL = [
  ['list'],
  [
    'html',
    {
      outputFolder: './reports/html',
      open: 'never',
    },
  ],
];
