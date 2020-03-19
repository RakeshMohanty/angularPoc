import { Component, OnInit } from '@angular/core';
import { DefaultGridConfiguration, IGridConfiguration, IDataSource } from 'app/core/component/datagrid/model/data-grid-interfaces';
import { IColumnDef } from 'app/core/component/datagrid/model/data-grid-column-definition';


import { VendorInformation } from 'app/leads/_models/vendor.model';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'app/app.state';
import { LeadService } from '../_services/lead.service';
import { ModalContentSettings } from 'app/core/component/modal-content/model/modal-content-settings';
import { AddVendorComponent } from './add-vendor/add-vendor.component';
import { ModalContentService } from 'app/core/component/modal-content/service/modal-content.service';
import { FnConstants } from 'app/shared/utils/constants';
import { VendorOfferService } from './offer/vendor-offer.service';
import { VendorService } from './vendors.service';
import * as vendorAction from 'app/actions/add-vendor-information.action';

@Component({
  selector: 'fn-vendor',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss']
})
export class VendorsComponent implements OnInit {

  isAddVendorEnabled: boolean = false;
  isEditMode: boolean = false;
  selectedVendor = {} as VendorInformation;
  gridConfiguration: IGridConfiguration;
  dataSource: IDataSource;
  vendorInformation$: Observable<VendorInformation>;
  modalData: ModalContentSettings;
  constructor(private store: Store<AppState>, private vendorService: VendorService,private service: ModalContentService) { }

  ngOnInit() {
    this.setupGridConfig();
    this.fetchVendorData();
  }

  addNewVendor() {
    this.isAddVendorEnabled = true;
    this.isEditMode = false;
    this.selectedVendor = {} as VendorInformation;
  }

  onPageNavigation(isEnabled: boolean) {
    this.isAddVendorEnabled = isEnabled;
    this.isEditMode = false;
  }

  public setupGridConfig() {
    this.dataSource = { rowData: [], totalRecord: 0, rowPerPage: 10 };
    this.gridConfiguration = {
      columnDefs: this.getColumns(),
      gridOptions: {
        enableSorting: true,
        sortMode: 'single',
        sortField: 'name',
        enableFilter: false,
        pagination: true,
        rowsPerPageOptions: [10],
      },
      isServerSide: false
    };
  }

  public fetchVendorData(){
    this.vendorService.getVendorData().subscribe((response: any) => {
      if (response.success) {
        this.dataSource.rowData = response.results;
      }
    });
  };

  public getColumns() {
    let columnDefs: IColumnDef[] = [];
    let column: IColumnDef = ({
      header: "Vendor Name", field: "name", enableSort: true, enableFilter: false, width: '150px'
    });
    columnDefs.push(column);
    column = ({
      header: "Action", field: "action", enableSort: false, enableFilter: false, width: '120px', cellTemplate: {
        actions: [
          {
            name: 'editVendor',
            eventName: 'editVendor',
            icon: 'email'
          }
        ]
      }
    });
    columnDefs.push(column);
    return columnDefs;
  }

  ngOnDestroy() {
    // this.vendorSubscription.unsubscribe();
  }

  onAction(eventDetail) {
    this.isEditMode = true;
    this.isAddVendorEnabled = true;
    this.store.dispatch(vendorAction.LoadVendorInformation({vendorId:eventDetail.rowData.id}));
    this.store.select(state=>state.vendorInformation).subscribe((data)=>{
      if(Object.keys(data).length>0){
        this.selectedVendor=data;
      }
    });
    
  }

  public cellRenderData(event: any, rowData: any): any {

    switch (event) {
      case 'editVendor':
        return { isEnabled: FnConstants.ACTIVE};
    }
  }

}