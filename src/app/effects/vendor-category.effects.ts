import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import * as vendorAction from 'app/actions/vendor-category.action';
import { VendorCategory } from 'app/leads/_models/vendor.model';
import { VendorService } from 'app/leads/vendors/vendors.service';


@Injectable()
export class VendorCategoryEffects {
	constructor(private actions$: Actions, private vendorService: VendorService) { }

	vendorCategory$: Observable<Action> = createEffect(() =>
		this.actions$.pipe(ofType(vendorAction.LoadVendorCategories), exhaustMap(action =>
			this.vendorService.getVendorCategories().pipe(
				map(data => vendorAction.LoadVendorCategoriesSuccess({ vendorCategories: <VendorCategory[]>data.results }),
					catchError(error => of(({ error })))
				))
		)),
	);
}