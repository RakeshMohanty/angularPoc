import { createAction, props } from '@ngrx/store';

import { VendorInformation } from 'app/leads/_models/vendor.model';
import { FnConstants } from 'app/shared/utils/constants';

export const ERROR_OCCURRED = FnConstants.ERROR_MESSAGE;
export const ADD_VENDOR_INFORMATION = 'ADD_VENDOR_INFORMATION';
export const ADD_VENDOR_INFORMATION_SUCCESS = 'ADD_VENDOR_INFORMATION_SUCCESS';

export const LOAD_VENDOR_INFORMATION = 'LOAD_VENDOR_INFORMATION';
export const LOAD_VENDOR_INFORMATION_SUCCESS = 'LOAD_VENDOR_INFORMATION_SUCCESS';
export const CLEAR_VENDOR_INFORMATION = 'CLEAR_VENDOR_INFORMATION';

export const AddVendorInformation = createAction(
	ADD_VENDOR_INFORMATION,
	props<{ payload: VendorInformation }>()
)

export const AddVendorInformationSuccess = createAction(
	ADD_VENDOR_INFORMATION_SUCCESS,
	props<{ vendorInformation: VendorInformation }>()
)

export const LoadVendorInformation = createAction(
	LOAD_VENDOR_INFORMATION,
	props<{ vendorId: number  }>()
)

export const LoadVendorInformationSuccess = createAction(
	LOAD_VENDOR_INFORMATION_SUCCESS,
	props<{ vendorInformation: VendorInformation }>()
)
export const GetErrorOccurred = createAction(ERROR_OCCURRED, props<Error>());