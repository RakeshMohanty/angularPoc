import {
    Component,
    Input,
    Output,
    EventEmitter,
    ViewEncapsulation
} from '@angular/core';
import {
    IGridConfiguration,
    IDataSource,
    DefaultGridConfiguration,
    DefaultDataSource
} from './model/data-grid-interfaces';
import { IColumnDef, TColumnFormatter } from './model/data-grid-column-definition';
import { LazyLoadEvent } from 'primeng/api/public_api';
import { PhoneNumberFormatPipe } from 'app/core/pipe/phone-number-format.pipe';
import { ActionDetails } from 'app/core/component/datagrid/model/data-grid-options';
import { FnConstants } from 'app/shared/utils/constants';

@Component({
    selector: 'fn-datagrid',
    templateUrl: './datagrid.component.html',
    styleUrls: ['./datagrid.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DataGridComponent {
    /**
     * gridConfiguration The grid configuration provided from the client.
     */
    @Input() gridConfiguration: IGridConfiguration;
    @Input() dataSource: IDataSource;
    @Input() isEditMode = false;
    @Output() onGridChanges = new EventEmitter<LazyLoadEvent>();
    @Output() onActionTrigger = new EventEmitter<any>();
    @Input() cellRender: (value: any, rowdata: any) => any;
    columnDefs: Array<IColumnDef>;
    actionData: ActionDetails;
    constructor(private phonePipe: PhoneNumberFormatPipe) {

    }
    ngOnInit(): void {

        if (this.gridConfiguration != null) {
            this.initializeGridConfiguration(this.gridConfiguration);
        } else {
            this.gridConfiguration = new DefaultGridConfiguration();
            this.dataSource = new DefaultDataSource();
        }
    }
    initializeGridConfiguration(gridConfiguration) {
        this.columnDefs = gridConfiguration.columnDefs;
        this.columnDefs.map(gridColumn => {
            if (gridColumn.columnFormatterFunction && typeof gridColumn.columnFormatterFunction !== 'function') {
                gridColumn.columnFormatterFunction = undefined;
            } else if (gridColumn.columnFormatter) {
                gridColumn.columnFormatterFunction = this.getColumnFormatterFunction(gridColumn.columnFormatter);
            }
        });
    }

    /**
     * loadData callback everytime paging, sorting and filtering happens.
     */

    public loadData(event: LazyLoadEvent) {
        this.onGridChanges.emit(event);
    }
    /**
     * onActionClick callback everytime action like delete,edit happens.
     */
    public onActionClick(eventName: string, rowData) {
        this.actionData = { event: eventName, rowData: rowData };
        this.onActionTrigger.emit(this.actionData);
    }

    private getColumnFormatterFunction(formatter: TColumnFormatter
    ): (value) => string {
        switch (formatter) {
            case 'phone':
                return (value) => this.phonePipe.transform(value);

            default:
                return undefined;
        }
    }

}
