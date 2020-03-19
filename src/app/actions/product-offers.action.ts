import { createAction, props } from '@ngrx/store';

import { ProductOffer } from 'app/leads/_models/leads.model';

export const ERROR_OCCURRED = 'ERROR_OCCURRED';
export const LOAD_PRODUCT_OFFERS = 'LOAD_PRODUCT_OFFERS';
export const LOAD_PRODUCT_OFFERS_SUCCESS = 'LOAD_PRODUCT_OFFERS_SUCCESS';
export const CLEAR_PRODUCT_OFFERS = 'CLEAR_PRODUCT_OFFERS';

export const LoadProductOffers = createAction(
	LOAD_PRODUCT_OFFERS,
	props<{ payload: number }>()
)

export const LoadProductOffersSuccess = createAction(
	LOAD_PRODUCT_OFFERS_SUCCESS,
	props<{ productOffers: ProductOffer[] }>()
)
export const clearProductOffers = createAction(
	CLEAR_PRODUCT_OFFERS
)

export const GetErrorOccurred = createAction(ERROR_OCCURRED, props<Error>());