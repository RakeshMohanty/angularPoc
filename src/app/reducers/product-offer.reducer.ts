import { createReducer, on, Action } from '@ngrx/store';

import * as productOfferAction from 'app/actions/product-offers.action';
import { ProductOffer } from 'app/leads/_models/leads.model';

export const initialState = [];

const productOffersReducer = createReducer(initialState,
    on(productOfferAction.LoadProductOffers, (state) => ([...state])),
    on(productOfferAction.clearProductOffers, (state) => (state = initialState)),
    on(productOfferAction.LoadProductOffersSuccess, (state, { productOffers }) => {
        return [...state, ...productOffers]
    })
)

export function productOfferReducer(state: ProductOffer[] | undefined, action: Action) {
    return productOffersReducer(state, action);
}