import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'app/user-management/_services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {

    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getAccessToken();
        const requestContext = this.authService.getRequestContext();
        if (token  && !(request.url.includes('/oauth/token') || request.url.includes('/public'))) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                    'ninja-request-context': JSON.stringify(requestContext)
                }
            });
        }
        return next.handle(request);
    }

}