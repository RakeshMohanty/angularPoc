import { ResizeService } from 'app/leads/shared/resize.service';

import { Component, OnInit, HostListener } from '@angular/core';
import { DefaultGridConfiguration, IGridConfiguration, IDataSource } from 'app/core/component/datagrid/model/data-grid-interfaces';
import { IColumnDef } from 'app/core/component/datagrid/model/data-grid-column-definition';
import { ICustomerInfoRequest, ICustomer, ICustomerResponse } from 'app/leads/_models/customer.model';
import { Observable, Subscription } from 'rxjs';
import * as customerActions from 'app/actions/customer-details.action';
import { Store } from '@ngrx/store';
import { AppState } from 'app/app.state';
import { LazyLoadEvent, SelectItem } from 'primeng/api/public_api';
import { PhoneNumberFormatPipe } from 'app/core/pipe/phone-number-format.pipe';
import { ModalContentSettings } from 'app/core/component/modal-content/model/modal-content-settings';
import { CustomerEmailComponent } from 'app/leads/customer-email/customer-email.component';
import { OneToOneMessageComponent } from 'app/leads/one-to-one-message/one-to-one-message.component';
import { ModalContentService } from 'app/core/component/modal-content/service/modal-content.service'
import { BroadcastComponent } from 'app/leads/broadcast/broadcast.component';
import { FnConstants } from 'app/shared/utils/constants';

@Component({
  selector: 'fn-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss'],
  providers: [ModalContentService]
})
export class LeadsComponent implements OnInit {
  gridConfiguration: IGridConfiguration;
  dataSource: IDataSource;
  customerRequest: ICustomerInfoRequest = {} as ICustomerInfoRequest;
  rowPerPage: number = 0;
  customer$: Observable<ICustomer>;
  customerSubscription: Subscription;
  isInitialLoad: boolean = false;
  modalData: ModalContentSettings;
  masterFilterData: SelectItem[] = [];
  selectedFilterValue: string;
  searchInputModel: string = '';
  showResetIcon: boolean = false;
  isSearched: boolean = false;
  // disable: { disable: boolean, flag: string };
  constructor(private store: Store<AppState>, private resizeService: ResizeService, private phonePipe: PhoneNumberFormatPipe, private service: ModalContentService) { }

  ngOnInit() {
    this.setFilterMasterData();
    this.setupGridConfig();
    this.onInitialCustomerLoad();
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
      isServerSide: true
    };

  }

  @HostListener("window:resize", ['$event'])
  public onResize(event) {
    this.resizeService.onResize(event.target.innerWidth);
  }


  public getColumns() {
    let columnDefs: IColumnDef[] = [];
    let column: IColumnDef = ({
      header: "Customer Name", field: "name", enableSort: true, enableFilter: false, width: '150px'
    });
    columnDefs.push(column);
    column = ({ header: "Mobile", field: "phoneNumber", enableSort: false, enableFilter: false, columnFormatter: 'phone', width: '120px' });
    columnDefs.push(column);
    column = ({ header: "Email", field: "email", enableSort: false, enableFilter: false, width: '120px' });
    columnDefs.push(column);
    column = ({ header: "Status", field: "status", enableSort: false, enableFilter: false, width: '120px' });
    columnDefs.push(column);
    column = ({ header: "Address", field: "address", enableSort: false, enableFilter: false, width: '120px' });
    columnDefs.push(column);
    column = ({
      header: "Action", field: "action", enableSort: false, enableFilter: false, width: '120px', cellTemplate: {
        actions: [
          {
            name: 'Notification',
            eventName: 'onNotification',
            icon: 'notification'
          },
          {
            name: 'Email',
            eventName: 'onEmail',
            icon: 'email'
          }
        ]
      }
    });
    columnDefs.push(column);
    return columnDefs;
  }
  public fetchCustomerData() {
    this.customer$ = this.store.select(state => state.customer);
    this.customerSubscription = this.customer$.subscribe(customer => {
      if (Object.keys(customer).length > 0) {
        this.dataSource.rowData = customer.customerResponse;
        this.dataSource.totalRecord = customer.totalCount;
        if (this.isInitialLoad) {
          this.dataSource.rowPerPage = customer.gridSize;
        }
        this.isInitialLoad = false;
      }
    });
  }
  public onGridChanges(event$: LazyLoadEvent) {
    if (!this.isInitialLoad) {
      let pageIndex = Math.round(event$.first / event$.rows) + 1;
      let order = event$.sortOrder === 1 ? 'ASC' : 'DESC';
      this.setCustomerRequest(pageIndex, order);
      this.store.dispatch(customerActions.LoadCustomer({ request: this.customerRequest }));
      this.fetchCustomerData();
    }
  }
  ngOnDestroy() {
    this.customerSubscription.unsubscribe();
  }

  public onLoadCustomer($event) {
    this.setupGridConfig();
    this.searchInputModel = '';
    this.showResetIcon = false;
    this.customerRequest = {} as ICustomerInfoRequest;
    this.onInitialCustomerLoad();
  }

  onAction(eventDetail) {
    if (eventDetail.event == "onEmail") {
      this.modalData = {
        size: 'lg',
        title: "Email",
        bodyContent: eventDetail,
        okTitle: "Send Email",
        cancelTitle: "Cancel"
      }
      this.service.openModalComponent(CustomerEmailComponent, this.modalData);
    }
    else if (eventDetail.event == "onNotification") {
      this.modalData = {
        size: 'lg',
        title: "Message",
        bodyContent: eventDetail,
        okTitle: "",
        cancelTitle: "",
        windowClass: "message-window-popup",
      }
      this.service.openModalComponent(OneToOneMessageComponent, this.modalData);
    }
    return false;
  }

  openBroadcast() {
    this.modalData = {
      size: 'lg',
      title: "Broadcast Message",
      bodyContent: "",
      okTitle: "Send Message",
      cancelTitle: "Cancel",
      windowClass: "broadcast-window-popup",
    }
    this.service.openModalComponent(BroadcastComponent, this.modalData);
  }

  public onInitialCustomerLoad() {
    this.isInitialLoad = true;
    this.setCustomerRequest(1, 'ASC');
    this.store.dispatch(customerActions.LoadCustomer({ request: this.customerRequest }));
    this.fetchCustomerData();
    this.goToFirst();
  }
  public setFilterMasterData() {
    this.masterFilterData = [{
      label: 'Name',
      value: 'lastName'
    },
    {
      label: 'Email',
      value: 'email',

    },
    {
      label: 'PhoneNumber',
      value: 'phoneNo'
    }]
    this.selectedFilterValue = this.masterFilterData[0].value;
  }
  public onSearchClick() {
    this.showResetIcon = true;
    this.isSearched = true;
    this.customerRequest = {} as ICustomerInfoRequest;
    if (this.searchInputModel) {
      switch (this.selectedFilterValue) {
        case 'lastName':
          this.customerRequest.lastName = this.searchInputModel;
          break;
        case 'email':
          this.customerRequest.email = this.searchInputModel;
          break;
        case 'phoneNo':
          let phoneNumber = this.searchInputModel.replace(/[^0-9]/g, "");
          this.customerRequest.phoneNo = phoneNumber;
          break;
        default:
          break;
      }
    }
    this.onInitialCustomerLoad();
  }
  public onReset() {
    this.searchInputModel = '';
    this.showResetIcon = false;
    this.isSearched = false;
    this.customerRequest = {} as ICustomerInfoRequest;
    this.onInitialCustomerLoad();
  }
  public updateSearchModel(event) {
    if (this.showResetIcon) {
      this.showResetIcon = false;
    }
  }
  private goToFirst() {
    let first: any = document.getElementsByClassName("ui-paginator-first")[0];
    if (first) {
      first.click();
    }
  }
  private setCustomerRequest(pageIndex: number, sortOrder: string) {
    this.customerRequest.pageIndex = pageIndex;
    this.customerRequest.sortingOrder = sortOrder;
  }
  public onFilterChange() {
    this.searchInputModel = '';
    this.showResetIcon = false;
    this.customerRequest = {} as ICustomerInfoRequest;
    if (this.isSearched) {
      this.onInitialCustomerLoad();
    }
  }
  public cellRenderData(event: any, rowData: any): any {
    switch (event) {
      case 'Email':
        const isEmailValid = rowData.status == FnConstants.ACTIVE || rowData.status == FnConstants.INACTIVE;
        return { disabled: isEmailValid };
      case 'Notification':
        const isNotificationValid = rowData.status == FnConstants.CREATED
          || rowData.status == FnConstants.INACTIVE || rowData.status == FnConstants.INVITED;
        return { disabled: isNotificationValid, newNotification: rowData.unReadMessage };
    }
  }
}
