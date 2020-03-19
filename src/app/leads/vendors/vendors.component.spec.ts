import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';

import { VendorsComponent } from 'app/leads/vendors/vendors.component';
import { ValidateOnBlurDirective } from 'app/core/directive/validate-blur.directive';
import { AddVendorComponent } from 'app/leads/vendors/add-vendor/add-vendor.component';

xdescribe('VendorComponent', () => {
  let component: VendorsComponent;
  let fixture: ComponentFixture<VendorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, CommonModule, MultiSelectModule],
      declarations: [ VendorsComponent, AddVendorComponent, ValidateOnBlurDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
