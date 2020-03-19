import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as navigationAction from 'app/actions/navigation-items.action';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { NavigationService } from 'app/layout/navigation/navigation.service';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { MenuItem } from 'app/layout/navigation/menu-item.interface';

@Injectable()
export class NavigationItemEffects {
	constructor(private actions$: Actions,
		private navService: NavigationService, private router: Router
	) {
	}

	navigationItem$: Observable<Action> = createEffect(() =>
		this.actions$.pipe(ofType(navigationAction.LoadNavigationItems), exhaustMap(action =>
			this.navService.fetchNavigationItems().pipe(
				map(data => navigationAction.LoadNavigationItemsSuccess({ menuItems: <MenuItem[]>data.results }),
					catchError(error => of(({ error })))
				))
		)),
	);


}