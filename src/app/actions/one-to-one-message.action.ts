import { createAction, props } from '@ngrx/store';
import { ICustomerMessageResponse } from 'app/leads/_models/customer.model'
import { FnConstants } from 'app/shared/utils/constants';

export const LOAD_MESSAGE = 'LOAD_MESSAGE';
export const ERROR_OCCURRED = FnConstants.ERROR_MESSAGE ;
export const LOAD_MESSAGE_SUCCESS = 'LOAD_MESSAGE_SUCCESS';
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';

export const LoadMessage = createAction(
	LOAD_MESSAGE,
	props<{ payload: number }>()

)
export const LoadMessageSuccess = createAction(
	LOAD_MESSAGE_SUCCESS,
	props<{messages : ICustomerMessageResponse[] }>()

)

export const clearMessage = createAction(
	CLEAR_MESSAGE
)

export const UpdateErrorOccurred = createAction(ERROR_OCCURRED, props<Error>());