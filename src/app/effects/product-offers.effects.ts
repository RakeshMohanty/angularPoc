import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import * as productOfferAction from 'app/actions/product-offers.action';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { ProductCategoryService } from 'app/leads/product-category/product-category.service';
import { ProductCategory, ProductOffer } from 'app/leads/_models/leads.model';

@Injectable()
export class ProductOffersEffects {
	constructor(private actions$: Actions, private productCategoryService: ProductCategoryService, private router: Router) { }

	productOffer$: Observable<Action> = createEffect(() =>
		this.actions$.pipe(ofType(productOfferAction.LoadProductOffers), exhaustMap(action =>
			this.productCategoryService.getProductOffers(action.payload).pipe(
				map(data => productOfferAction.LoadProductOffersSuccess({ productOffers: <ProductOffer[]>data.results }),
					catchError(error => of(({ error })))
				))
		)),
	);

}