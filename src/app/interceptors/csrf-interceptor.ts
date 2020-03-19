import {
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { FnConstants } from '../shared/utils/constants';
import { ServiceResponse } from '../shared/_models/service-response.model';

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (req.url.indexOf('/oauth/token') >= 0) {
            return next.handle(req).pipe(
                tap((response: HttpResponse<ServiceResponse<any>>) => {
                    if (
                        response instanceof HttpResponse &&
                        response.status === 200
                    ) {
                        const header = response.headers.get(
                            FnConstants.CSRF_HEADERS
                        );
                        if (header && header.length > 0) {
                            localStorage.setItem(
                                FnConstants.CSRF_HEADERS,
                                header
                            );
                        }
                    }
                })
            );
        } else {
            const csrfHeader = localStorage.getItem(
                FnConstants.CSRF_HEADERS
            );
            if (csrfHeader) {
                const xhr = req.clone({
                    headers: req.headers.set(
                        FnConstants.CSRF_HEADERS,
                        csrfHeader
                    )
                });
                return next.handle(xhr);
            }
        }
        return next.handle(req);
    }
}
