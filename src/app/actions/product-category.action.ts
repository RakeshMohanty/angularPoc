import { createAction, props } from '@ngrx/store';

import { ProductCategory } from 'app/leads/_models/leads.model';

export const LOAD_PRODUCT_CATEGORIES = 'LOAD_PRODUCT_CATEGORIES';
export const ERROR_OCCURRED = 'ERROR_OCCURRED';
export const LOAD_PRODUCT_CATEGORIES_SUCCESS = 'LOAD_PRODUCT_CATEGORIES_SUCCESS';
export const CLEAR_PRODUCT_CATEGORIES = 'CLEAR_PRODUCT_CATEGORIES';

export const LoadProductCategories = createAction(
	LOAD_PRODUCT_CATEGORIES
)

export const LoadProductCategoriesSuccess = createAction(
	LOAD_PRODUCT_CATEGORIES_SUCCESS,
	props<{ productCategories: ProductCategory[] }>()

)
export const clearProductCategories = createAction(
	CLEAR_PRODUCT_CATEGORIES
)
export const GetErrorOccurred = createAction(ERROR_OCCURRED, props<Error>());