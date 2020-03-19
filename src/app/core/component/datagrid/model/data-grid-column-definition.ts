import { IActions } from './data-grid-options';

export interface IColumnDef {
    header?: string;
    field?: string;
    enableFilter?: boolean;
    enableSort?: boolean;
    filterType?: TColumnFilter;
    filterMatchMode?: TFilterMatchMode;
    width?: string;
    columnFormatterFunction?: (val) => string;
    columnFormatter?: TColumnFormatter;
    cellTemplate?: {
        actions: IActions[];
    };

}
export class DefaultColumnDef implements IColumnDef {
    header = '';
    field = '';
    enableFilter = false;
    enableSort = false;
}
export type TColumnFilter = 'input' | 'multiSelect' | 'dropDown';
export type TFilterMatchMode = 'startsWith' | 'contains' | 'endsWith' | 'equals' | 'notEquals' | 'in';
export type TColumnFormatter = 'phone';