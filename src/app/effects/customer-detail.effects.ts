import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as customerActions from 'app/actions/customer-details.action';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { AuthService } from 'app/user-management/_services/auth.service';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { LeadService } from 'app/leads/_services/lead.service';

@Injectable()
export class CustomerDetailEffects {
    constructor(private actions$: Actions,
        private leadService: LeadService, private router: Router
    ) {
    }
    customerDetail$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(ofType(customerActions.LoadCustomer), exhaustMap(action =>
            this.leadService.getCustomers(action.request).pipe(
                map(data => customerActions.LoadCustomer_Success({ customer: data.results }),
                    catchError(error => of(({ error })))
                ))
        )),
    );    

}