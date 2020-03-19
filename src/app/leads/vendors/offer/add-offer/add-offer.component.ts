import { Component, OnInit, NgModule, ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from 'app/app.state';
import * as offerAction from 'app/actions/vendor-offer.action';
import { VendorInformation, VendorOfferDetail, VendorCategory } from 'app/leads/_models/vendor.model';
import { ModalContentSettings } from 'app/core/component/modal-content/model/modal-content-settings';
import { FnConstants } from 'app/shared/utils/constants';

@Component({
  selector: 'fn-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.scss']
})
export class AddOfferComponent implements OnInit {

  offerCategoriesList: VendorCategory[];
  featured: boolean = false;
  newLink: boolean = false;
  website: boolean = false;
  contactUs: boolean = false;
  offerForm: FormGroup;
  minDate: Date;
  maxDate: Date;
  submitted: boolean = false;
  vendorInformation: VendorInformation;
  vendorCategoriesSubscription: Subscription;
  offerDetailSubscription: Subscription;
  isDisabledTextArea: boolean = false;
  offerDetail = {} as VendorOfferDetail;
  data: ModalContentSettings;
  editMode: boolean = false;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>, private changeDetectorRef: ChangeDetectorRef, private datePipe: DatePipe, public activeModal: NgbActiveModal) { }

  ngOnInit() {
    const today = new Date();
    this.minDate = new Date(today);
    this.minDate.setDate(today.getDate());
    this.vendorCategoriesSubscription = this.store.select(state => state.vendorInformation).subscribe((vendorInformation: VendorInformation) => {
      if (Object.keys(vendorInformation).length) {
        this.vendorInformation = vendorInformation;
        this.offerCategoriesList = this.vendorInformation.categories;        
      }
    });
    this.initializeOfferForm();
    this.editMode = this.data.bodyContent.editMode;
    this.offerDetail.id = this.editMode ? this.data.bodyContent.rowData.id : 0;
    this.updateSelection('newLink');    
    this.offerDetail.website = false;
    this.offerDetail.contactUs = false;
    if (this.data && this.data.bodyContent.rowData && Object.keys(this.data.bodyContent.rowData).length) {
      this.setOfferFormValues(this.data.bodyContent.rowData);
    }
  }

  initializeOfferForm() {
    this.offerForm = this.formBuilder.group({
      category: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      validFrom: ['', [Validators.required]],
      validTill: ['', [Validators.required]],
      featured: [this.featured],
      offerLink: [!this.data.bodyContent.editMode? this.newLink = true: ''],
      offerLinkValue: [{ value: '', disabled: this.isDisabledTextArea }, [Validators.required, Validators.pattern(FnConstants.URL_REGEXP)]]
    },
      { validator: this.endDateAfterOrEqualValidator });
  }

  get formField() { return this.offerForm.controls; };

  updateSelection(selectedLink) {
    switch (selectedLink) {
      case ("website"): if (this.vendorInformation && this.vendorInformation.website) {
        this.offerForm.get('offerLinkValue').setValue(this.vendorInformation.website);
        this.offerDetail.website = true;
        this.offerDetail.contactUs = false;
        this.offerDetail.newLink = false;
        this.offerForm.controls['offerLinkValue'].disable();
        break;
      };

      case ("contactUs"): if (this.vendorInformation && this.vendorInformation.contactNumber) {
        this.offerForm.get('offerLinkValue').setValue(this.vendorInformation.contactNumber);
        this.offerDetail.contactUs = true;
        this.offerDetail.website = false;
        this.offerDetail.newLink = false;
        this.offerForm.controls['offerLinkValue'].disable();
        break;
      };

      default:
        this.offerForm.controls['offerLinkValue'].enable();
        this.offerForm.get('offerLinkValue').setValue('');
        this.offerDetail.newLink = true;
    }
  }


  endDateAfterOrEqualValidator = (formGroup: FormGroup) => {
    if (formGroup.controls.validTill.value && formGroup.controls.validFrom.value) {
      if (this.datePipe.transform(this.offerForm.value['validTill'], 'MM/dd/yyyy') < this.datePipe.transform(this.offerForm.value['validFrom'], 'MM/dd/yyyy')) {
        return { notValid: true }
      }
      return null;
    }
  }

  onAddOfferFormSubmit() {
    this.submitted = true;
    if (this.offerForm.valid) {
      this.offerDetail.vendorId = this.editMode ? this.data.bodyContent.rowData.vendorId : this.vendorInformation.id;
      this.offerDetail.category = this.offerForm.get('category').value;
      this.offerDetail.description = this.offerForm.get('description').value;
      this.offerDetail.offerLink = this.offerForm.get('offerLinkValue').value;
      this.offerDetail.validFrom = this.datePipe.transform(this.offerForm.value['validFrom'], 'MM/dd/yyyy');
      this.offerDetail.validTill = this.datePipe.transform(this.offerForm.value['validTill'], 'MM/dd/yyyy');
      this.offerDetail.featured = this.offerForm.value['featured'];
      this.offerDetail.name = this.offerForm.value['name'];
      if (this.editMode) {
        this.store.dispatch(offerAction.UpdateOfferDetail({ payload: this.offerDetail }));
      } else {
        this.store.dispatch(offerAction.AddOfferDetail({ payload: this.offerDetail }));
      }
      this.offerDetailSubscription = this.store.select(state => state.offerDetail).subscribe((offerDetail: VendorOfferDetail) => {
        this.offerForm.reset();
        this.activeModal.close();
      });
    }
  }

  setOfferFormValues(rowData) { 
    this.offerForm.patchValue({
      description: rowData.description,
      name: rowData.name,
      category: { id: rowData.categoryId,categoryName: rowData.categoryName },
      validFrom: rowData.validityFrom,
      validTill: rowData.validityTo,
      featured: rowData.featured,
      offerLink: rowData.website ? this.website = true : rowData.contactUs ? this.contactUs = true : this.newLink = true,
      offerLinkValue: rowData.offerLink
    });  
    if(this.website || this.contactUs) {
      this.offerForm.controls['offerLinkValue'].disable();
    }
  }

  onDialogClose() {
    this.offerForm.reset('');
    this.activeModal.close();   
  }

  ngOnDestroy() {
    if (this.vendorCategoriesSubscription) {
      this.vendorCategoriesSubscription.unsubscribe();
    }
    if (this.offerDetailSubscription) {
      this.offerDetailSubscription.unsubscribe();
    }
  }
}
