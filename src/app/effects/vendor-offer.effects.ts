import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { VendorOfferService } from 'app/leads/vendors/offer/vendor-offer.service';
import * as offerAction from 'app/actions/vendor-offer.action';

@Injectable()
export class VendorOfferEffects {
	constructor(private actions$: Actions, private offerService: VendorOfferService) { }

	addOffer$: Observable<Action> = createEffect(() =>
		this.actions$.pipe(ofType(offerAction.AddOfferDetail), exhaustMap(action =>
			this.offerService.addOfferDetail(action.payload).pipe(
				map(data => offerAction.AddOfferDetailSuccess({ offerDetail: data.results }),
					catchError(error => of(({ error })))
				))
		)),
	);

	editOffer$: Observable<Action> = createEffect(() =>
		this.actions$.pipe(ofType(offerAction.UpdateOfferDetail), exhaustMap(action =>
			this.offerService.updateOfferDetail(action.payload).pipe(
				map(data => offerAction.UpdateOfferDetailSuccess({ offerDetail: data.results }),
					catchError(error => of(({ error })))
				))
		)),
	);

	loadOffers$: Observable<Action> = createEffect(() =>
	this.actions$.pipe(ofType(offerAction.LoadOffers), exhaustMap(action =>
		this.offerService.getOfferDetails(action.vendorId).pipe(
			map(data => offerAction.LoadOffersSuccess({ offers: data.results }),
				catchError(error => of(({ error })))
			))
	)),
);

}