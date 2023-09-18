import winston from 'winston';

export class Logger {
  readonly module: string;

  constructor(module: string) {
    this.module = module;
  }

  // eslint-disable-next-line class-methods-use-this
  createLogger(): winston.Logger {
    const logFormat = winston.format.printf(({ level, message, timestamp, stack }) => `${timestamp} ${level}: ${stack || message}`);
    return winston.createLogger({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.errors({
          stack: true,
        }),
        logFormat,
      ),
      transports: [
        new winston.transports.Console({
          level: 'debug',
        }),
      ],
    });
  }

  info(message: string): void {
    const newLogger = this.createLogger();
    newLogger.info(`${this.module}: ${message}`);
  }

  debug(message: string): void {
    if (process.env.DEBUG) {
      const newLogger = this.createLogger();
      newLogger.debug(`${this.module}: ${message}`);
    }
  }
}
