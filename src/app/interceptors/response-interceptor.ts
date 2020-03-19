import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { ErrorHandlerService } from 'app/framework/error-handler/error-handler.service';
import { ServiceResponse } from 'app/shared/_models/service-response.model';
import { AuthService } from 'app/user-management/_services/auth.service';
import { FnConstants } from 'app/shared/utils/constants';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
    private authService: AuthService;
    constructor(
        private errorhandler: ErrorHandlerService,
        private messageService: MessageService,
        private injector: Injector
    ) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        this.authService = this.injector.get(AuthService);
        return next.handle(request).pipe(
            tap((response: HttpResponse<ServiceResponse<any>>) => {
                if (
                    response instanceof HttpResponse &&
                    response.status === 200
                ) {
                    const serviceResponse: ServiceResponse<any> = response.body;
                    if (
                        serviceResponse &&
                        serviceResponse.responseMessages
                    ) {
                        for (const key in serviceResponse.responseMessages) {
                            if (serviceResponse.responseMessages[key]) {
                                try {
                                    const errorMessage = serviceResponse.responseMessages[key];
                                    this.messageService.clear();
                                    if (serviceResponse.success) {
                                        this.messageService.add({
                                            severity: FnConstants.SUCCESS,
                                            detail: errorMessage
                                        });
                                    } else {
                                        this.messageService.add({
                                            severity: FnConstants.ERROR, summary: 'Error Message',
                                            detail: errorMessage
                                        });
                                    }
                                } catch (e) {
                                    this.messageService.clear();
                                    this.messageService.add({
                                        severity: FnConstants.ERROR, summary: 'Error Message',
                                        detail: 'We are unable to retrieve the information. Try again later.'
                                    });
                                }
                            }
                        }
                    }
                }
            }),
            catchError(error => {
                this.errorhandler.handleError(error);
                if (error instanceof HttpErrorResponse) {
                    switch (error.status) {
                        case 401: return this.authService.handle401Error(request, next, error);
                        case 400: return this.authService.handle400Error(error);
                        default:
                            this.messageService.clear();
                            this.messageService.add({
                                severity: FnConstants.ERROR, summary: 'Error Message', detail: 'Something went wrong. Please try again later.'
                            });
                            break;
                    }
                }
                return Observable.throw(error);
            })
        );
    }
}
