import { TestBed } from '@angular/core/testing';

import { LoggerService, LogType } from '../logger';
import { ErrorHandlerService } from './error-handler.service';

describe('ErrorHandlerService', () => {
    let loggerService: LoggerService;
    let errorHandlerService: ErrorHandlerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ErrorHandlerService, LoggerService]
        });

        loggerService = TestBed.get(LoggerService);
        errorHandlerService = TestBed.get(ErrorHandlerService);
    });

    it('should create service instance', () => {
        expect(errorHandlerService).toBeTruthy();
    });

    it('should have registerLogger and handleError defined', () => {
        expect(errorHandlerService.registerLogger).toBeDefined();
        expect(errorHandlerService.handleError).toBeDefined();
    });

    it('should call registerLogger', () => {
        const spy = spyOn(errorHandlerService, 'registerLogger');
        errorHandlerService.registerLogger(loggerService, LogType.API);
        expect(spy).toHaveBeenCalledWith(loggerService, LogType.API);
    });

    it('should call logError by handleError with logType API', () => {
        const error: any = 'error';
        const spy = spyOn(loggerService, 'logError');
        errorHandlerService.registerLogger(loggerService, LogType.API);
        errorHandlerService.handleError(error);
        expect(spy).toHaveBeenCalledWith(LogType.API, error);
    });

    it('should call logError by handleError with logType CONSOLE', () => {
        const error: any = 'error';
        const spy = spyOn(loggerService, 'logError');
        errorHandlerService.registerLogger(loggerService, LogType.CONSOLE);
        errorHandlerService.handleError(error);
        expect(spy).toHaveBeenCalledWith(LogType.CONSOLE, error);
    });
});
