import { createReducer, on, Action } from '@ngrx/store';

import * as offerAction from 'app/actions/vendor-offer.action';
import { VendorOfferDetail } from 'app/leads/_models/vendor.model';

export const initialState = {};

const vendorOfferDetailReducer = createReducer(initialState,
    on(offerAction.AddOfferDetail, (state) => ({ ...state })),
    on(offerAction.AddOfferDetailSuccess, (state, { offerDetail }) => {
        return ({ ...state, ...offerDetail })
    }),
    on(offerAction.UpdateOfferDetail, (state) => ({ ...state })),
    on(offerAction.UpdateOfferDetailSuccess, (state, { offerDetail }) => {
        return ({ ...state, ...offerDetail })
    }),
   
)
   
export function offerDetailReducer(state: VendorOfferDetail | undefined, action: Action) {
    return vendorOfferDetailReducer(state, action);
}