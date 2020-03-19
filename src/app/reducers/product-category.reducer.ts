import { createReducer, on, Action } from '@ngrx/store';

import * as productAction from 'app/actions/product-category.action';
import { ProductCategory } from 'app/leads/_models/leads.model';

export const initialState = [];

const productCategoriesReducer = createReducer(initialState,
    on(productAction.LoadProductCategories, (state) => ([...state])),
    on(productAction.clearProductCategories, (state) => (state = initialState)),
    on(productAction.LoadProductCategoriesSuccess, (state, { productCategories }) => { return [...state, ...productCategories] }
    )
)
export function productCategoryReducer(state: ProductCategory[] | undefined, action: Action) {
    return productCategoriesReducer(state, action);
}

