import { createAction, props } from '@ngrx/store';
import { MenuItem } from 'app/layout/navigation/menu-item.interface'
export const LOAD_NAVIGATION_ITEMS = 'LOAD_NAVIGATION_ITEMS';
export const ERROR_OCCURRED = 'ERROR_OCCURRED';
export const LOAD_NAVIGATION_ITEMS_SUCCESS = 'LOAD_NAVIGATION_ITEMS_SUCCESS';
export const LoadNavigationItems = createAction(
	LOAD_NAVIGATION_ITEMS,

)
export const LoadNavigationItemsSuccess = createAction(
	LOAD_NAVIGATION_ITEMS_SUCCESS,
	props<{ menuItems: MenuItem[] }>()

)
export const UpdateErrorOccurred = createAction(ERROR_OCCURRED, props<Error>());