import { LogType } from '.';

export interface Logger {
    logError(type: LogType, error: any): void;
    logInfo(type: LogType, error: any): void;
}
