import { ErrorHandler, Injectable } from '@angular/core';

import { Logger, LogType } from '../logger';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {
    private errorLogger: Logger;
    private logType: LogType;

    constructor() {}

    registerLogger(errLogger: Logger, type: LogType): void {
        this.errorLogger = errLogger;
        this.logType = type;
    }

    handleError(error: any): void {
        if (this.errorLogger) {
            if (this.logType === LogType.API) {
                this.errorLogger.logError(LogType.API, error);
            } else {
                this.errorLogger.logError(LogType.CONSOLE, error);
            }
        } else {
            console.error(error);
        }
    }
}
