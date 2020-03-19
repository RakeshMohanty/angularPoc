import { createReducer, on, Action } from '@ngrx/store';

import * as vendorAction from 'app/actions/add-vendor-information.action';
import { VendorInformation } from 'app/leads/_models/vendor.model';

export const initialState = {};

const vendorInformationReducer = createReducer(initialState,
    on(vendorAction.AddVendorInformation, (state) => ({...state})),
    on(vendorAction.AddVendorInformationSuccess, (state, { vendorInformation }) => {
        return ({...state, ...vendorInformation})
    }),
    on(vendorAction.LoadVendorInformation, (state) => ({...state})),
    on(vendorAction.LoadVendorInformationSuccess, (state, { vendorInformation }) =>
     {   return ({...state, ...vendorInformation}) }
));

export function addVendorInformationReducer(state: VendorInformation[] | undefined, action: Action) {
    return vendorInformationReducer(state, action);
}