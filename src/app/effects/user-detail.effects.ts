import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as userActions from 'app/actions/user-detail.action';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { AuthService } from 'app/user-management/_services/auth.service';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class UserDetailEffects {
    constructor(private actions$: Actions,
        private authService: AuthService, private router: Router
    ) {
    }
    userDetail$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(ofType(userActions.LoadUserDetail), exhaustMap(action =>
            this.authService.getUser().pipe(
                map(data => userActions.UserDetailSuccess({ user: data.results }),
                    catchError(error => of(({ error })))
                ))
        )),
    );


    navigateToProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(userActions.UserDetailSuccess), map(action => action.user),
            tap(() => this.router.navigate(['/leads']))
        ),
        { dispatch: false }
    );

}