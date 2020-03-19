import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ProductOffersComponent } from './product-offers.component';
import { ProductOfferDetailsComponent } from 'app/leads/product-offer-details/product-offer-details.component'
import { ModalContentService } from 'app/core/component/modal-content/service/modal-content.service';

xdescribe('ProductOffersComponent', () => {
  let component: ProductOffersComponent;
  let productComponent: ProductOfferDetailsComponent;
  let fixture: ComponentFixture<ProductOffersComponent>;
  let modalService: ModalContentService;
  let modal: NgbModal;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductOffersComponent, ProductOfferDetailsComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [NgbModule],
      providers: [ModalContentService]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ProductOfferDetailsComponent],
      }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    modalService = TestBed.get(ModalContentService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Product Offer Details Pop Up', () => {
    it('should Call openModel method to send the product Offer Details', () => {
      const productData = {
        productName: 'Purchase', offerName: 'Purchase Offer', shortDescription: 'Purchase Offer Description', longDescription: 'Purchase Offer Description long Details', valid: '2020-03-01 12:48:52.297',
      };
      const spyModel = spyOn(component, "openModal").and.callThrough();
      component.openModal(productData);
      expect(spyModel).toHaveBeenCalledWith(productData);
    });
  });

  describe('Should Call the onOfferSelect method to emit the productOffer ', () => {
    it('Should Call the onOfferSelect method to emit the productOffer', () => {
      const productData = {
        productName: 'Purchase', offerName: 'Purchase Offer', shortDescription: 'Purchase Offer Description', longDescription: 'Purchase Offer Description long Details', valid: '2020-03-01 12:48:52.297',
      };
      const spyProductOffer = spyOn(component, "onOfferSelect").and.callThrough();
      component.onOfferSelect(productData);
      const spyOfferCkick = spyOn(component.onOfferClick, 'emit');
      fixture.detectChanges();
      expect(spyProductOffer).toHaveBeenCalled();
      expect(spyProductOffer).toHaveBeenCalledTimes(1);
    });
  });
});
