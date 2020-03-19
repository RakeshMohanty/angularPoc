import { createReducer, on, Action } from '@ngrx/store';
import * as offerAction from 'app/actions/vendor-offer.action';
import { IOfferResponse } from 'app/leads/_models/offer.model';

export const initialState = [];

const vendorOffersReducer = createReducer(initialState,
    on(offerAction.ClearOffer,(state)=>(state=initialState)),
    on(offerAction.LoadOffers, (state) => (state = initialState)),
    on(offerAction.LoadOffersSuccess, (state, { offers }) => { return [...state, ...offers] }
    )
)


export function offersReducer(state: IOfferResponse[] | undefined, action: Action) {
    return vendorOffersReducer(state, action);
}