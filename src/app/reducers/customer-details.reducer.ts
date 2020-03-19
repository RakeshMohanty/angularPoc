import { createReducer, on, Action } from '@ngrx/store';
import * as customerActions from 'app/actions/customer-details.action';
import { ICustomer } from 'app/leads/_models/customer.model';
export const initialState: ICustomer = undefined;
const customerDetailReducer = createReducer(initialState,
    on(customerActions.LoadCustomer, (state) => ({ ...state })),
    on(customerActions.LoadCustomer_Success, (state, { customer }) => ({ ...state, ...customer }))
)
export function customerReducer(state: ICustomer | undefined, action: Action) {
    return customerDetailReducer(state, action);
}