import { ENVs } from '../data';

export const getEnv = () => {
  switch (process.env.ENV) {
    case 'local':
      return ENVs.local;
    case 'stg':
      return ENVs.stg;
    default:
      return ENVs.dev;
  }
};
