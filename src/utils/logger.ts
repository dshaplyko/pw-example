import winston from 'winston';

export class Logger {
  readonly moduleName: string;

  private loggerInstance: winston.Logger;

  constructor(moduleName: string) {
    this.moduleName = moduleName;
    this.loggerInstance = this.initializeLogger();
  }

  private initializeLogger(): winston.Logger {
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
    this.loggerInstance.info(`${this.moduleName}: ${message}`);
  }

  debug(message: string): void {
    if (process.env.DEBUG) {
      this.loggerInstance.debug(`${this.moduleName}: ${message}`);
    }
  }
}
