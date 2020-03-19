import { TestBed } from '@angular/core/testing';

import { LogType } from './logger.enum';
import { LoggerService } from './logger.service';

describe('LoggerService', () => {
    let loggerService: LoggerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LoggerService]
        });

        loggerService = TestBed.get(LoggerService);
    });

    it('should create service instance', () => {
        expect(loggerService).toBeTruthy();
    });

    it('should have logError and logInfo defined', () => {
        expect(loggerService.logError).toBeDefined();
        expect(loggerService.logInfo).toBeDefined();
    });

    it('should call logError with logType API', () => {
        const error: any = 'error';
        const spy = spyOn(loggerService, 'logError');
        loggerService.logError(LogType.API, error);
        expect(spy).toHaveBeenCalledWith(LogType.API, error);
    });

    it('should call logInfo with logType CONSOLE', () => {
        const error: any = 'error';
        const spy = spyOn(loggerService, 'logInfo');
        loggerService.logInfo(LogType.CONSOLE, error);
        expect(spy).toHaveBeenCalledWith(LogType.CONSOLE, error);
    });
});
