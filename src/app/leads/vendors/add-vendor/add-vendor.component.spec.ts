import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {  Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MultiSelectModule } from 'primeng/multiselect';

import { AddVendorComponent } from 'app/leads/vendors/add-vendor/add-vendor.component';
import { ValidateOnBlurDirective } from 'app/core/directive/validate-blur.directive';
import { FnConstants } from 'app/shared/utils/constants';
import { VendorService } from 'app/leads/vendors/vendors.service';
import { ModalContentSettings } from 'app/core/component/modal-content/model/modal-content-settings';
import { ModalContentService } from 'app/core/component/modal-content/service/modal-content.service';
import { ConfirmDialogComponent } from 'app/leads/confirm-dialog/confirm-dialog.component';
import { RestClientService } from 'app/framework/rest-client';
import { VendorCategory, VendorInformation } from 'app/leads/_models/vendor.model';
import { ModalContentComponent } from 'app/core/component/modal-content/modal-content.component';
import { LoadMaskComponent } from 'app/core/component/load-mask/load-mask.component';


xdescribe('AddVendorComponent', () => {
  let component: AddVendorComponent;
  let fixture: ComponentFixture<AddVendorComponent>;
  let vendorService: VendorService;
  let mockStore: MockStore<{ productCategories: VendorCategory[] }>;
  const initialState = { productCategories: [] };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MultiSelectModule, ReactiveFormsModule, CommonModule],
      declarations: [ AddVendorComponent, ValidateOnBlurDirective, ConfirmDialogComponent, ModalContentComponent, LoadMaskComponent], 
      providers: [
        VendorService, RestClientService,ModalContentService, provideMockStore({ initialState })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
