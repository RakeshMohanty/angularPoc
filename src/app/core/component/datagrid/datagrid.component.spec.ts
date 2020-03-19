import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { TableModule } from 'primeng/table';

import { DataGridComponent } from './datagrid.component';
import { IGridConfiguration, IDataSource, DefaultGridConfiguration } from './model/data-grid-interfaces';
xdescribe('DataGridComponent', () => {
    let component: DataGridComponent;
    let fixture: ComponentFixture<DataGridComponent>;
    let gridConfiguration: IGridConfiguration = new DefaultGridConfiguration();
    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [
                TableModule,
            ],

            declarations: [DataGridComponent]
        })
            .compileComponents();

    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(DataGridComponent);
        component = fixture.componentInstance;
        component.dataSource = {
            rowData: [],
            totalRecord: 100
        }
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('should be able to call gridConfiguration', () => {

        it('when it has value', () => {
            component.gridConfiguration = gridConfiguration;
            component.ngOnInit();
            expect(component.columnDefs).toBeDefined();
        });
        it('when it is null', () => {
            component.gridConfiguration = null;
            component.ngOnInit();
            expect(component.gridConfiguration).toBeDefined();
        });
    });
    it('should have intial dataSource value', () => {
        expect(component.dataSource).toBeDefined();
    });
    it('should able to call loadData function', () => {
        spyOn(component.onGridChanges, 'emit');
        component.loadData(null);
        expect(component.onGridChanges.emit as jasmine.Spy).toHaveBeenCalled();
    });
    it('should able to call onActionClick function', () => {
        spyOn(component.onActionTrigger, 'emit');
        component.onActionClick(null,'ACTIVE');
        expect(component.onActionTrigger.emit as jasmine.Spy).toHaveBeenCalled();
    });

});
