import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { VendorService } from 'app/leads/vendors/vendors.service';
import * as vendorAction from 'app/actions/add-vendor-information.action';
import { VendorInformation } from 'app/leads/_models/vendor.model';


@Injectable()
export class VendorEffects {
	constructor(private actions$: Actions, private vendorService: VendorService, private router: Router) { }

	addVendor$: Observable<Action> = createEffect(() =>
		this.actions$.pipe(ofType(vendorAction.AddVendorInformation), exhaustMap(action =>
			this.vendorService.postVendorDetails(action.payload).pipe(
				map(data => vendorAction.AddVendorInformationSuccess({ vendorInformation: data.results }),
					catchError(error => of(({ error })))
				))
		)),
	);

	loadVendor$: Observable<Action> = createEffect(() =>
		this.actions$.pipe(ofType(vendorAction.LoadVendorInformation), exhaustMap(action =>
			this.vendorService.getVendorDetails(action.vendorId).pipe(
				map(data => vendorAction.LoadVendorInformationSuccess({ vendorInformation: data.results }),
					catchError(error => of(({ error })))
				))
		)),
	);

}