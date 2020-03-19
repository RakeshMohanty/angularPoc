import { createReducer, on, Action } from '@ngrx/store';
import * as navigationActions from 'app/actions/navigation-items.action';
import { AppState } from 'app/app.state';
import { MenuItem } from 'primeng/api/menuitem';
const initialState=[];

const navigationItemsReducer = createReducer(initialState ,
    on(navigationActions.LoadNavigationItems, (state)=> ( [...state] )),
	on(navigationActions.LoadNavigationItemsSuccess, (state, {menuItems}) => {return  [...state,...menuItems] }

    )
)
export function navigationReducer(state: MenuItem[] | undefined, action: Action) {
    return navigationItemsReducer(state, action);
}
