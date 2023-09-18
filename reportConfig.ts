// import { RP_TOKEN } from './src/data/bz/constants';

// const RPconfig = {
//   apiKey: RP_TOKEN,
//   endpoint: 'https://reportportal.epam.com/api/v1',
//   project: 'brln-web',
//   launch: `${process.env.PRODUCT} ${process.env.TYPE} on ${process.env.ENV} env`,
//   attributes: [
//     {
//       key: 'type',
//       value: process.env.TYPE,
//     },
//   ],
// };

export const RP_CI = [
  ['line'],
  [
    'html',
    {
      outputFolder: './reports/html',
      open: 'never',
    },
  ],
  // ['@reportportal/agent-js-playwright', RPconfig],
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
