import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AuthService } from 'app/user-management/_services/auth.service';
import { Observable, of, Subscription } from 'rxjs';
import { AppState } from 'app/app.state';
import * as userActions from 'app/actions/user-detail.action';
import { IUser } from 'app/user-management/_models/user.model';

@Injectable()
export class AuthGuard implements CanActivate {
    user$: Observable<IUser>;
    userSubscription: Subscription;
    constructor(
        private router: Router,
        private auth: AuthService, private store: Store<AppState>
    ) {
        this.store.dispatch(userActions.LoadUserDetail());
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const token = this.auth.getAccessToken();
        let url: string = route.url[0].path;
        let result: boolean = false;
        if (token) {
            this.getUser().subscribe(
                (item: IUser) => {
                    if (item) {
                        result = true;
                        // TODO: Permission check need to be aad here.
                    } else {
                        this.router.navigate(['/login']);
                        result = false;
                    }
                });

        } else {
            this.router.navigate(['/login'])
            result = false;
        }
        return result;
    }
    private getUser(): Observable<any> {
        let userDetails: any = {} as IUser
        this.user$ = this.store.select(state => state.user);
        this.userSubscription = this.user$.subscribe((user) => {
            if (!!user) {
                userDetails = user;
            }
        });
        if (!userDetails) {
            this.store.dispatch(userActions.LoadUserDetail());
        }
        this.userSubscription.unsubscribe();
        return Observable.create(observer => {
            observer.next(userDetails);
            observer.complete()
        });
    }

}