import { IColumnDef, DefaultColumnDef } from './data-grid-column-definition';
import { IDataGridOptions, DefaultGridOptions } from './data-grid-options';

export interface IGridConfiguration {
    columnDefs: Array<IColumnDef>;
    gridOptions: IDataGridOptions;
    isServerSide: boolean;
}
export interface IDataSource {
    rowData: Array<object>;
    totalRecord?: number;
    rowPerPage?: Number;
}
export class DefaultGridConfiguration implements IGridConfiguration {
    columnDefs = [new DefaultColumnDef()];
    gridOptions = new DefaultGridOptions();
    isServerSide: false;
}
export class DefaultDataSource implements IDataSource {
    rowData = [];
    totalRecord = 0;
    rowPerPage = 0;
}
