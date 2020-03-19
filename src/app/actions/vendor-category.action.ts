import { createAction, props } from '@ngrx/store';

import { VendorCategory } from 'app/leads/_models/vendor.model';
import { FnConstants } from 'app/shared/utils/constants';

export const LOAD_VENDOR_CATEGORIES = 'LOAD_VENDOR_CATEGORIES';
export const ERROR_OCCURRED = FnConstants.ERROR_MESSAGE ;
export const LOAD_VENDOR_CATEGORIES_SUCCESS = 'LOAD_VENDOR_CATEGORIES_SUCCESS';
export const CLEAR_VENDOR_CATEGORIES = 'CLEAR_VENDOR_CATEGORIES';

export const LoadVendorCategories = createAction(
	LOAD_VENDOR_CATEGORIES
)

export const LoadVendorCategoriesSuccess = createAction(
	LOAD_VENDOR_CATEGORIES_SUCCESS,
	props<{ vendorCategories: VendorCategory[] }>()

)
export const clearVendorCategories = createAction(
	CLEAR_VENDOR_CATEGORIES
)
export const GetErrorOccurred = createAction(ERROR_OCCURRED, props<Error>());