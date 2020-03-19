import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { storeFreeze } from 'ngrx-store-freeze';

import { userReducer } from 'app/reducers/user-detail.reducer';
import { navigationReducer } from 'app/reducers/navigation-items.reducer';
import { productCategoryReducer } from 'app/reducers/product-category.reducer';
import { productOfferReducer } from 'app/reducers/product-offer.reducer';
import { environment } from '../environments/environment';
import { customerReducer } from './reducers/customer-details.reducer';
import { vendorCategoryReducer } from 'app/reducers/vendor-category.reducer';
import { addVendorInformationReducer } from 'app/reducers/add-vendor-information.reducer';
import { offersReducer } from 'app/reducers/vendor-offers.reducer';
import { viewMessageReducer } from 'app/reducers/one-to-one-message.reducer';
import { offerDetailReducer } from 'app/reducers/vendor-offer-detail.reducer';

export const reducers = {
    user: userReducer,
    menuItems: navigationReducer,
    productCategories: productCategoryReducer,
    productOffers: productOfferReducer,
    customer: customerReducer,
    vendorCategories: vendorCategoryReducer,
    vendorInformation: addVendorInformationReducer,
    offerDetail: offerDetailReducer,
    messages: viewMessageReducer,
    offers: offersReducer
}
const metaReducersDev = [storeFreeze, clearState];

const metaReducersProd = [clearState];

export const metaReducers = environment.production
    ? metaReducersProd
    : metaReducersDev;

export function clearState(r) {
    return function (state, action) {
        if (action.type === 'USER_LOGOUT') {
            state = undefined;
        }
        return r(state, action);
    };
}

@NgModule({
    imports: [
        StoreModule.forRoot(reducers, { metaReducers })]
})
export class AppReducer {



}