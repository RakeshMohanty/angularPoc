import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as messageAction from 'app/actions/one-to-one-message.action';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { LeadService } from 'app/leads/_services/lead.service';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class OneToOneMessageEffects {
	constructor(private actions$: Actions,
		private service: LeadService, private router: Router
	) {
	}

	viewMessages$: Observable<Action> = createEffect(() =>
		this.actions$.pipe(ofType(messageAction.LoadMessage), exhaustMap(action =>
			this.service.getViewMessages(action.payload).pipe(
				map(data => messageAction.LoadMessageSuccess({messages : data.results }),
					catchError(error => of(({ error })))
				))
		)),
	);


}