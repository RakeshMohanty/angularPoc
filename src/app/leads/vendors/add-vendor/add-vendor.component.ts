import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { VendorCategory, VendorInformation } from 'app/leads/_models/vendor.model';
import * as vendorAction from 'app/actions/vendor-category.action';
import * as vendorInformation from 'app/actions/add-vendor-information.action';
import { AppState } from 'app/app.state';
import { ModalContentSettings } from 'app/core/component/modal-content/model/modal-content-settings';
import { ConfirmDialogComponent } from 'app/leads/confirm-dialog/confirm-dialog.component';
import { ModalContentService } from 'app/core/component/modal-content/service/modal-content.service';
import { FnConstants } from 'app/shared/utils/constants';
import { VendorService } from 'app/leads/vendors/vendors.service';

@Component({
  selector: 'fn-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddVendorComponent implements OnInit {
  @Input() set selectedVendor(selectedVendor: VendorInformation) {
    this.vendorInformation = selectedVendor;
    this.setVendorFormValues();
  };
  @Input() isEditMode: boolean;
  @Output() vendorPageHandler = new EventEmitter<boolean>();

  vendorForm: FormGroup;
  selectedVendorCategories: [];
  vendorCategoriesList: VendorCategory[];
  vendorCategoriesSubscription: Subscription;
  submitted: boolean = false;
  enableOfferTab: boolean = false;
  vendorInformation = {} as VendorInformation;
  modalData: ModalContentSettings;
  enableCompanyDetails:boolean = true;
  enableVenderDetails:boolean = false;


  constructor(private formBuilder: FormBuilder, private store: Store<AppState>, private service: ModalContentService,private vendorService: VendorService) { }

  ngOnInit() {
    this.store.dispatch(vendorAction.clearVendorCategories());
    this.store.dispatch(vendorAction.LoadVendorCategories());
    this.vendorCategoriesSubscription = this.store.select(state => state.vendorCategories).subscribe((vendorCategories: VendorCategory[]) => {
      if (vendorCategories && vendorCategories.length) {
        this.vendorCategoriesList = vendorCategories;
      }
    });
    this.initializeVendorForm();
    this.setVendorFormValues();
  }

  get formField() { return this.vendorForm && this.vendorForm.controls; }

  initializeVendorForm() {
    this.vendorForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      categories: ['', [Validators.required]],
      contactName: ['', [Validators.required]],
      contactNumber: ['', [Validators.required]],
      serviceDescription: [''],
      contactEmail: ['', [Validators.email]],
      website: ['', [Validators.pattern(FnConstants.URL_REGEXP)]],
      serviceSummary: ['', [Validators.required]],
      id: this.vendorInformation.id
    });
  }

  onAddVendorFormSubmit() {
    this.submitted = true;
    if (this.vendorForm.valid) {
      this.enableOfferTab = false;
      this.vendorInformation.id =  this.isEditMode ? this.vendorInformation.id : 0;
      this.vendorInformation.name = this.vendorForm.get('name').value;
      this.vendorInformation.categories = this.vendorForm.get('categories').value;
      this.vendorInformation.contactName = this.vendorForm.get('contactName').value;
      this.vendorInformation.contactNumber = this.vendorForm.get('contactNumber').value;
      this.vendorInformation.serviceDescription = this.vendorForm.get('serviceDescription').value;
      this.vendorInformation.contactEmail = this.vendorForm.value['contactEmail'];
      this.vendorInformation.website = this.vendorForm.value['website']? this.vendorForm.value['website'] : null;
      this.vendorInformation.serviceSummary = this.vendorForm.value['serviceSummary'];
      this.store.dispatch(vendorInformation.AddVendorInformation({ payload: this.vendorInformation }));
      this.store.select(state => state.vendorInformation).subscribe((vendorInformation: VendorInformation) => {
        if (Object.keys(vendorInformation).length) {
          this.vendorInformation = vendorInformation;
          this.vendorForm.reset();
          this.setVendorFormValues();
          this.enableOfferTab = true;
          this.onTabClick(''); // For Vendor service
        }
      });
    }
  }

  setVendorFormValues() {
    if(!this.vendorForm){
      return;
    }
    this.vendorForm.patchValue({
      contactEmail: this.vendorInformation.contactEmail,
      contactNumber: this.vendorInformation.contactNumber,
      contactName: this.vendorInformation.contactName,
      name: this.vendorInformation.name,
      serviceDescription: this.vendorInformation.serviceDescription,
      serviceSummary: this.vendorInformation.serviceSummary,
      categories: this.vendorInformation.categories,
      website: this.vendorInformation.website,
      id: this.vendorInformation.id
    });
    this.enableOfferTab=this.isEditMode;
  }

  onAddVendorFormCancel() {
    if (this.vendorForm && this.vendorForm.dirty) {
      const message = "You have unsaved changes made to this page which will be lost . Would you like to continue?";
      const data = { errorMsg: message, handler: this.vendorPageHandler };
      this.modalData = {
        size: 'md',
        title: "Unsaved change",
        bodyContent: data,
        okTitle: "Ok",
        cancelTitle: "Cancel"
      }
      this.service.openModalComponent(ConfirmDialogComponent, this.modalData);
    } else {
      this.vendorPageHandler.emit(false);
    }
  }

  onTabClick(tabName) {
    if (tabName === 'Company Details') {
      this.enableCompanyDetails = true;
      this.enableVenderDetails = false;
    } else {
      this.enableCompanyDetails = false;
      this.enableVenderDetails = true;
    }
  }

  clearCategory(categoryId, selelctedCategories, event) {
    event.stopPropagation();
    const index = selelctedCategories.findIndex(category => category.id === categoryId);
    selelctedCategories.splice(index, 1);
  }

  ngOnDestroy() {
    if (this.vendorCategoriesSubscription) {
      this.vendorCategoriesSubscription.unsubscribe();
    }
  }
}
