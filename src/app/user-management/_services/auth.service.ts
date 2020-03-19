import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { HttpRequest, HttpHandler } from '@angular/common/http';
import { switchMap, catchError, filter, take, map, finalize } from 'rxjs/operators';
import { IUserToken, IUserDetails, IUser, IRequestContext } from 'app/user-management/_models/user.model';
import { ServiceResponse } from 'app/shared/_models/service-response.model';
import { RestClientService, RequestHeader } from 'app/framework/rest-client';
import { Router } from '@angular/router';
import { FnConstants } from 'app/shared/utils/constants';
import { MessageService } from 'primeng/api';
import { UserTypeEnum } from 'app/user-management/_helper/usertype.enum';
import { Store } from '@ngrx/store';
import { AppState } from 'app/app.state';

@Injectable()
export class AuthService {
    private refreshTokenInProgress = false;
    private tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    user$: Observable<IUser>;
    userSubscription: Subscription;
    constructor(private restClient: RestClientService, private router: Router, private messageService: MessageService,
        private store: Store<AppState>) {

    }
    public handle401Error(req: HttpRequest<any>, next: HttpHandler, error) {
        if (!this.refreshTokenInProgress) {
            this.refreshTokenInProgress = true;
            this.tokenSubject.next(null);
            return this.requestAccessToken().pipe(switchMap((token: any) => {
                let userToken = {} as IUserToken;
                userToken.accessToken = token.access_token;
                userToken.refreshToken = token.refresh_token;
                this.refreshTokenInProgress = false;
                this.saveToken(userToken);
                if (userToken.accessToken) {
                    this.tokenSubject.next(userToken.accessToken);
                    return next.handle(req);
                }
                this.logout();
                return Observable.throw(error);
            }),
                catchError(error => {
                    this.logout();
                    return Observable.throw(error);
                }),
                finalize(() => this.refreshTokenInProgress = false)
            );
        } else {
            return this.tokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(() => next.handle(req)));
        }

    }
    public handle400Error(error: any) {
        if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
            this.logout();
        } else {
            this.messageService.add({
                severity: FnConstants.ERROR, summary: 'Error Message', detail: 'Something went wrong. Please try again later.'
            });
        }
        return Observable.throw(error);
    }
    public login(userDetails: IUserDetails): Observable<any> {
        return this.restClient.post<ServiceResponse<any>>('/login', userDetails, {});

    }
    private requestAccessToken(): Observable<IUserToken> {
        const params = `grant_type=refresh_token&refresh_token=${this.getRefreshToken()}`;
        let options = this.setHeaders();
        return this.getTokenFromServer(params, options);
    }
    public logout() {
        return this.restClient.delete<ServiceResponse<any>>("/user/logout", {}).subscribe(
            () => this.onTokenRevoked(),
            error => this.onTokenRevoked());
    }
    public getAccessToken() {
        let token = JSON.parse(localStorage.getItem('token'));
        if (token != null) {
            return token.accessToken;
        }
        return '';
    }
    public getRefreshToken() {
        let currentUser = JSON.parse(localStorage.getItem('token'));
        if (currentUser != null) {
            return currentUser.refreshToken;
        }
    }
    public saveToken(user: IUserToken) {
        localStorage.setItem('token', JSON.stringify(user))
    }
    public removeToken() {
        localStorage.removeItem('token');
    }
    public initializeUserDetailModel(): IUserDetails {
        return <IUserDetails>{
            email: '',
            password: ''
        };
    }
    public getUser(): Observable<ServiceResponse<IUser>> {
        return this.restClient.post<ServiceResponse<IUser>>("/v1/sponsor/profile", {})
    }
    private onTokenRevoked() {
        this.removeLocalStorage();
        this.tokenSubject.next(null);
        this.router.navigate(['/login']);
    }
    public removeLocalStorage() {
        localStorage.removeItem('token');
        localStorage.removeItem(FnConstants.CSRF_HEADERS);
    }
    private getTokenFromServer(params, options): Observable<any> {
        return this.restClient.post<any>('/oauth/token', params, options);
    }
    private setHeaders() {
        const myHeaders = [];
        myHeaders.push(new RequestHeader('Authorization', 'Basic ' + btoa(FnConstants.CLIENTID
            + ':' + FnConstants.CLIENTSECRETKEY)));
        myHeaders.push(new RequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8'));
        return {
            headers: myHeaders
        };
    }
    public getRequestContext(): IRequestContext {
        let requestContext = {} as IRequestContext;
        this.user$ = this.store.select(state => state.user);
        this.userSubscription = this.user$.subscribe((user) => {
            if (!!user) {
                requestContext = {
                    customerIdentifier: null, sponsorIdentifier: user.id, organizationIdentifier: user.organizationId,
                    userType: UserTypeEnum.Sponsor
                }
            }
        });
        return requestContext;
    }

}