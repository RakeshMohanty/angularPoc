import { props, createAction } from '@ngrx/store';
export const ERROR_OCCURRED = 'ERROR_OCCURRED';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const UPDATEERROROCUCURRED = createAction(
    ERROR_OCCURRED,
    props<{payload:Error}>()
)
export const CLEARERROR= createAction(
    CLEAR_ERROR
)
