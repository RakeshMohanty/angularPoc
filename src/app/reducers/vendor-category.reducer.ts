import { createReducer, on, Action } from '@ngrx/store';

import * as vendorAction from 'app/actions/vendor-category.action';
import { VendorCategory } from 'app/leads/_models/vendor.model';

export const initialState = [];

const vendorCategoriesReducer = createReducer(initialState,
    on(vendorAction.LoadVendorCategories, (state) => ([...state])),
    on(vendorAction.clearVendorCategories, (state) => (state = initialState)),
    on(vendorAction.LoadVendorCategoriesSuccess, (state, { vendorCategories }) => { return [...state, ...vendorCategories] }
    )
)
export function vendorCategoryReducer(state: VendorCategory[] | undefined, action: Action) {
    return vendorCategoriesReducer(state, action);
}