import { createAction, props } from '@ngrx/store';

import { VendorOfferDetail } from 'app/leads/_models/vendor.model';
import { FnConstants } from 'app/shared/utils/constants';
import { IOfferResponse } from 'app/leads/_models/offer.model';

 
export const ADD_OFFER_DETAIL = 'ADD_OFFER_DETAIL';
export const UPDATE_OFFER_DETAIL = 'UPDATE_OFFER_DETAIL';
export const UPDATE_OFFER_DETAIL_SUCCESS = 'UPDATE_OFFER_DETAIL_SUCCESS';
export const ADD_OFFER_DETAIL_SUCCESS = 'ADD_OFFER_DETAIL_SUCCESS';
export const CLEAR_OFFER_INFORMATION = 'CLEAR_OFFER_INFORMATION';
export const LOAD_OFFERS = 'LOAD_OFFERS';
export const LOAD_OFFERS_SUCCESS = 'LOAD_OFFERS_SUCCESS';
export const CLEAR_OFFER = 'CLEAR_OFFER';

export const AddOfferDetail = createAction(
	ADD_OFFER_DETAIL,
	props<{ payload: VendorOfferDetail }>()
)

export const UpdateOfferDetail = createAction(
	UPDATE_OFFER_DETAIL,
	props<{ payload: VendorOfferDetail }>()
)

export const AddOfferDetailSuccess = createAction(
	ADD_OFFER_DETAIL_SUCCESS,
	props<{ offerDetail: VendorOfferDetail }>()
)

export const UpdateOfferDetailSuccess = createAction(
	UPDATE_OFFER_DETAIL_SUCCESS,
	props<{ offerDetail: VendorOfferDetail }>()
)
export const ClearOffer = createAction(
	CLEAR_OFFER
)
export const LoadOffers = createAction(
	LOAD_OFFERS,
	props<{ vendorId: number }>()
)
export const LoadOffersSuccess = createAction(
	LOAD_OFFERS_SUCCESS,
	props<{ offers: IOfferResponse[] }>()
)

export const GetErrorOccurred = createAction(FnConstants.ERROR_MESSAGE , props<Error>());