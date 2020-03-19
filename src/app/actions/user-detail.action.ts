import { createAction, props } from '@ngrx/store';
import { IUser, IUserDetails } from 'app/user-management/_models/user.model';
export const USER_DETAIL = 'USER_DETAIL';
export const USER_DETAIL_SUCCESS = 'USER_DETAIL_SUCCESS';
export const USER_DETAIL_UPDATE = 'USER_DETAIL_UPDATE';
export const ERROR_OCCURRED = 'ERROR_OCCURRED';

export const LoadUserDetail = createAction(
    USER_DETAIL
)

export const UserDetailSuccess = createAction(
    USER_DETAIL_SUCCESS,
    props<{ user: IUser }>()

)
export const UpdateErrorOccurred = createAction(ERROR_OCCURRED, props<Error>());
