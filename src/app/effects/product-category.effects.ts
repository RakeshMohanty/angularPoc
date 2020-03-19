import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import * as productAction from 'app/actions/product-category.action';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { ProductCategoryService } from 'app/leads/product-category/product-category.service';
import { ProductCategory } from 'app/leads/_models/leads.model';

@Injectable()
export class ProductEffects {
	constructor(private actions$: Actions, private productCategoryService: ProductCategoryService) { }

	productCategory$: Observable<Action> = createEffect(() =>
		this.actions$.pipe(ofType(productAction.LoadProductCategories), exhaustMap(action =>
			this.productCategoryService.getProductCategories().pipe(
				map(data => productAction.LoadProductCategoriesSuccess({ productCategories: <ProductCategory[]>data.results }),
					catchError(error => of(({ error })))
				))
		)),
	);
}