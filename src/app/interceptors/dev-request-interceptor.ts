import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable()
export class DevRequestInterceptor implements HttpInterceptor {
    constructor() {}
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const fnurl = environment.fnurl;
        const fnuiurl = environment.fnuiurl;
        const baseurl = request.url.includes('/data/') ? fnuiurl : fnurl;
        request = request.clone({
            url: baseurl + request.url,
            withCredentials: true
        });
        return next.handle(request);
    }
}
