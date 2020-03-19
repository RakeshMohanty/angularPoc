import { createReducer, on, Action } from '@ngrx/store';
import * as userActions from 'app/actions/user-detail.action';
import { IUser } from 'app/user-management/_models/user.model';
export const initialState: IUser = undefined;
const userDetailReducer = createReducer(initialState,
    on(userActions.LoadUserDetail, (state) => ({ ...state })),
    on(userActions.UserDetailSuccess, (state, { user }) => ({ ...state, ...user }))
)
export function userReducer(state: IUser | undefined, action: Action) {
    return userDetailReducer(state, action);
}