import { createReducer, on, Action } from '@ngrx/store';
import * as viewMessageActions from 'app/actions/one-to-one-message.action';
import { AppState } from 'app/app.state';
import { ICustomerMessageResponse } from 'app/leads/_models/customer.model';

export const initialState=[];

const messageReducer = createReducer(initialState ,
    on(viewMessageActions.LoadMessage, (state)=> ( [...state] )),
    on(viewMessageActions.clearMessage, (state) => (state = initialState)),
	on(viewMessageActions.LoadMessageSuccess, (state, {messages}) => {return  [...state,...messages] }

    )
)
export function viewMessageReducer(state: ICustomerMessageResponse[] | undefined, action: Action) {
    return messageReducer(state, action);
}