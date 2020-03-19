export interface IDataGridOptions {
    enableSorting?: boolean;
    sortMode?: string;
    sortField?: string;
    multiSortField?: string[];
    enableFilter?: boolean;
    pagination?: boolean;
    paginationStartPage?: number;
    paginationPageSize?: number;
    rowsPerPageOptions?: Array<number>;
    action?: {
        fieldName: string;
        actions: IActions[];
    };
}

export interface IActions {
    name: string;
    eventName: string;
    icon: string;
    type?: string;
}

export interface ActionDetails {
    rowData: any;
    event: string;
}

export class DefaultGridOptions implements IDataGridOptions {
    enableSorting: false;
    enableFilter: false;
    pagination: false;
    paginationPageSize: 100;
}
