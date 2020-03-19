import { Injectable } from '@angular/core';

import { LogLevel, LogType } from './logger.enum';
import { Logger } from './logger.interface';

@Injectable()
export class LoggerService implements Logger {
    constructor() {}

    logError(type: LogType, error: any): void {
        this.log(type, LogLevel.ERROR, error);
    }

    logInfo(type: LogType, info: any): void {
        this.log(type, LogLevel.INFO, info);
    }

    private log(type: LogType, level: LogLevel, error: any): void {
        if (type && type === LogType.API) {
            this.apiLogger(level, error);
        }
        if (type && type === LogType.CONSOLE) {
            this.consoleLogger(level, error);
        }
    }

    private consoleLogger(level: LogLevel, error: any): void {
        if (window.console && console.log && console.error) {
            if (level === LogLevel.ERROR) {
                console.error(error);
            } else if (level === LogLevel.INFO) {
                console.log(error);
            }
        }
    }

    private apiLogger(level: LogLevel, error: any): void {
        // TODO
    }
}
