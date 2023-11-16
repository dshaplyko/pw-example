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

  private logMessage(type: 'info' | 'debug', message: string): void {
    this.loggerInstance[type](`${this.moduleName}: ${message}`);
  }

  private isDebugModeEnabled(): boolean {
    return process.env.DEBUG === 'true';
  }

  info(message: string): void {
    this.logMessage('info', message);
  }

  debug(message: string): void {
    if (this.isDebugModeEnabled()) this.logMessage('debug', message);
  }
}
