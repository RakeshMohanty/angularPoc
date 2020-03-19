import { Component, OnInit } from '@angular/core';

import { ModalContentService } from 'app/core/component/modal-content/service/modal-content.service';
import { ModalContentSettings } from 'app/core/component/modal-content/model/modal-content-settings';
import { AddOfferComponent } from 'app/leads/vendors/offer/add-offer/add-offer.component';

import { VendorOfferDetail, VendorInformation } from 'app/leads/_models/vendor.model';
import { IGridConfiguration, IDataSource } from 'app/core/component/datagrid/model/data-grid-interfaces';
import { IColumnDef } from 'app/core/component/datagrid/model/data-grid-column-definition';
import { Subscription } from 'rxjs/internal/Subscription';
import { Store } from '@ngrx/store';
import { AppState } from 'app/app.state';
import * as offerAction from 'app/actions/vendor-offer.action';
import { Observable } from 'rxjs';
import { FnConstants } from 'app/shared/utils/constants';
import { IOfferResponse } from 'app/leads/_models/offer.model';
import { environment } from 'environments/environment';
import { DeleteOfferComponent } from './delete-offer/delete-offer.component';
@Component({
  selector: 'fn-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
  providers: [ModalContentService]
})
export class OfferComponent implements OnInit {
  modalData: ModalContentSettings;
  isEditMode: boolean = false;
  selectedRowData;
  gridConfiguration: IGridConfiguration;
  dataSource: IDataSource;
  offerSubscription: Subscription;
  offer$: Observable<IOfferResponse[]>;
  selectedVendor = {} as VendorInformation;
  constructor(private service: ModalContentService, private store: Store<AppState>) { }

  ngOnInit() {
    this.setupGridConfig();
    this.store.select(state => state.vendorInformation).subscribe((vendorInformation: VendorInformation) => {
      this.selectedVendor = vendorInformation;
      if(this.selectedVendor.id){
        this.fetchOfferData();
      }
    });

  }

  openOfferModalPopup(editMode, selectedRowData?) {   
    const modalData = { rowData: selectedRowData,editMode: editMode };
    this.modalData = {
      size: 'lg',
      title: 'Offer',
      bodyContent: modalData,
      okTitle: 'Save',
      cancelTitle: 'Cancel',
      windowClass: "add-offer-window-popup",
    }
    this.service.openModalComponent(AddOfferComponent, this.modalData).then(() => {
      setTimeout(() => {
        this.fetchOfferData();
      }, 500); // TODO need to see better way to handle.Probably event emitter
    }, () => {

    });
  }

  public setupGridConfig() {
    this.dataSource = { rowData: [], totalRecord: 0, rowPerPage: 0 };
    this.gridConfiguration = {
      columnDefs: this.getColumns(),
      gridOptions: {
        enableSorting: true,
        sortMode: 'single',
        sortField: 'name',
        enableFilter: false,
        pagination: true,
        rowsPerPageOptions: [],
      },
      isServerSide: false
    };

  }
  public getColumns() {
    let columnDefs: IColumnDef[] = [];
    let column: IColumnDef = ({
      header: "Offer Name", field: "name", enableSort: true, enableFilter: false, width: '150px',
      cellTemplate: {
        actions: [
          {
            name: 'Edit',
            eventName: 'OnEdit',
            icon: 'edit'
          }
        ]
      }
    });
    columnDefs.push(column);
    column = ({ header: "", field: "featured", enableSort: false, enableFilter: false, width: '26px' });
    columnDefs.push(column);
    column = ({ header: "Offer Category", field: "categoryName", enableSort: false, enableFilter: false, width: '120px' });
    columnDefs.push(column);
    column = ({ header: "Offer Description", field: "description", enableSort: false, enableFilter: false, width: '120px' });
    columnDefs.push(column);
    column = ({ header: "Validity From", field: "validityFrom", enableSort: true, enableFilter: false, width: '120px' });
    columnDefs.push(column);
    column = ({ header: "Validity To", field: "validityTo", enableSort: true, enableFilter: false, width: '120px' });
    columnDefs.push(column);
    column = ({
      header: "Active/Inactive", field: "status", enableSort: false, enableFilter: false, width: '120px', cellTemplate: {
        actions: [
          {
            name: 'Active',
            eventName: 'onActive',
            icon: '',
            type: 'inputSwitch'
          }
        ]
      }
    });
    columnDefs.push(column);
    column = ({
      header: "Action", field: "action", enableSort: false, enableFilter: false, width: '120px', cellTemplate: {
        actions: [
          {
            name: 'Delete',
            eventName: 'OnDelete',
            icon: 'delete'
          }
        ]
      }
    });
    columnDefs.push(column);
    return columnDefs;
  }

  public fetchOfferData() {
    this.store.dispatch(offerAction.ClearOffer());
    this.store.dispatch(offerAction.LoadOffers({ vendorId: this.selectedVendor.id }));
    this.offer$ = this.store.select(state => state.offers);
    this.offerSubscription = this.offer$.subscribe((data: IOfferResponse[]) => {
      if (data && data.length > 0) {
        const gridSize = 15;
        this.dataSource.rowData = data;
        this.dataSource.rowPerPage = gridSize;
        this.dataSource.totalRecord = data.length;
      }
    });
  }

  public cellRenderData(event: any, rowData: any): any {
    switch (event) {
      case 'Delete':
        const isDeleteValid = rowData.status == FnConstants.ACTIVE;
        return { disabled: isDeleteValid };
      case 'Active':

      case 'Edit':
    }
  }
  
  onAction(eventDetail) {
    if (eventDetail.event == "OnDelete") {
      this.modalData = {
        size: 'lg',
        title: "Delete Offer",
        bodyContent: eventDetail,
        okTitle: "Confirm",
        cancelTitle: "Cancel"
      }
      this.service.openModalComponent(DeleteOfferComponent, this.modalData);
    }
    if (eventDetail.event == "OnEdit") {
          this.modalData = {
            size: 'lg',
            title: "Email",
            bodyContent: eventDetail,
            okTitle: "Send Email",
            cancelTitle: "Cancel"
          } 
    const selectedRowData =  this.dataSource.rowData.find(data => data['id'] === eventDetail.rowData.id);
    const editMode = true;
    this.openOfferModalPopup(editMode, selectedRowData);   
    }
    return false;
  }
}

