import { createAction, props } from '@ngrx/store';
import { ICustomer, ICustomerInfoRequest } from 'app/leads/_models/customer.model';

export const LOADCUSTOMERS = 'LOADCUSTOMERS';
export const LOADCUSTOMERS_SUCCESS = 'LOADCUSTOMERS_SUCCESS';

export const LoadCustomer = createAction(
    LOADCUSTOMERS,
    props<{request: ICustomerInfoRequest }>()
)
export const LoadCustomer_Success = createAction(
    LOADCUSTOMERS_SUCCESS,
    props<{customer: ICustomer }>()
)