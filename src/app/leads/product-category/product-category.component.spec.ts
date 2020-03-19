import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {  Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

import { ProductCategoryComponent } from 'app/leads/product-category/product-category.component';
import { ProductCategory } from 'app/leads/_models/leads.model';
import { ProductCategoryService } from 'app/leads/product-category/product-category.service';
import { ContentContainerDirective } from 'app/leads/_directives/content-container.directive';
import { RestClientService } from 'app/framework/rest-client';

xdescribe('ProductCategoryComponent', () => {

  let productCategorycomponent: ProductCategoryComponent;
  let productCategoryService: ProductCategoryService;
  let fixture: ComponentFixture<ProductCategoryComponent>;
  let mockStore: MockStore<{ productCategories: ProductCategory[] }>;
  const initialState = { productCategories: [] };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TabViewModule, DropdownModule, FormsModule, HttpClientTestingModule],
      declarations: [ProductCategoryComponent, ContentContainerDirective],
      providers: [
        ProductCategoryService, RestClientService, provideMockStore({ initialState })
      ]
    })
      .compileComponents();
     }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCategoryComponent);
    productCategoryService = TestBed.get(ProductCategoryService);
    productCategorycomponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture).toBeDefined();
    expect(productCategorycomponent).toBeDefined();
  });

  describe('onCategorySelect()', () => {

    it('should call ngOnInit', async(() => {
      spyOn(productCategorycomponent, 'ngOnInit').and.callThrough();
      fixture.detectChanges();
      productCategorycomponent.ngOnInit();
      expect(productCategorycomponent.ngOnInit).toHaveBeenCalled();
    }));

    it('should set the state with productCategories', () => {
      const fakeProductCategoies = [{ id: 5, productCategoryName: "Mortgage" }, { id: 7, productCategoryName: "Jumbo Mortgage" }, { id: 6, productCategoryName: "Auto Loan" }];
      mockStore.setState({ productCategories: fakeProductCategoies });
      const spyStore = spyOn(mockStore, 'dispatch');
      productCategorycomponent.ngOnInit();
      mockStore.refreshState();
      fixture.detectChanges();
      expect(mockStore.dispatch).toHaveBeenCalled();
      expect(spyStore).toHaveBeenCalled();
      expect(productCategorycomponent.productCategoriesList).toEqual(fakeProductCategoies);
      expect(productCategorycomponent.productCategoriesList[0]).toEqual(productCategorycomponent.selectedCategory);
    });
  });

  describe('onCategorySelect()', () => {

    it('should call onCategorySelect() method and set the selected category', () => {
      const fakeProductCategoies = [{ id: 5, productCategoryName: "Mortgage" }, { id: 7, productCategoryName: "Jumbo Mortgage" }, { id: 6, productCategoryName: "Auto Loan" }];
      mockStore.setState({ productCategories: fakeProductCategoies });
      const spy = spyOn(productCategorycomponent, 'onCategorySelect').and.callThrough();
      const index = 0;
      productCategorycomponent.onCategorySelect(index);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(index);
      expect(productCategorycomponent.productCategoriesList).toEqual(fakeProductCategoies);
      expect(productCategorycomponent.selectedCategory).toEqual(productCategorycomponent.productCategoriesList[index]);
    });

  });

  describe('isResponsive()', () => {

    it('should call isResponsive() method and isMobileView should be falsy', () => {
      const dummyScreenSize = 1920;
      const selectedCategory = { id: 5, productCategoryName: "Mortgage" };
      const spy = spyOn(productCategorycomponent, 'isResponsive').and.callThrough();
      const spyComponent = spyOn(productCategorycomponent, 'loadProductOfferComponent').and.callThrough();
      productCategorycomponent.size = dummyScreenSize;
      productCategorycomponent.selectedCategory = selectedCategory;
      productCategorycomponent.isResponsive();
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyComponent).toHaveBeenCalled();
      expect(productCategorycomponent.isMobileView).toBeFalsy();
    });

    it('isMobileView should be truthy ', () => {
      const dummyScreenSize = 520;
      const selectedCategory = { id: 5, productCategoryName: "Mortgage" };
      const spy = spyOn(productCategorycomponent, 'isResponsive').and.callThrough();
      productCategorycomponent.size = dummyScreenSize;
      productCategorycomponent.selectedCategory = selectedCategory;
      productCategorycomponent.isResponsive();
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(productCategorycomponent.isMobileView).toBeTruthy();
    });

  });

  describe('onProductOfferSelect()', () => {

    it('should call onProductOfferSelect() method and emit the data', () => {
      const spy = spyOn(productCategorycomponent, 'onProductOfferSelect').and.callThrough();
      const dummyProductOffer = [{
        productName: "Auto + Home Bundle",
        offerName: "Special Rate for Leader 1 Customers1",
        shortDescription: "Monthly Payment - TBD",
        longDescription: "Interest Rate : 4.950% APR : 5.34% Discount Points : .405",
        valid: "2020-03-01 00:00:00.0"
      }, {
        productName: "Purchase -30Yr Fixed",
        offerName: "offer name2",
        shortDescription: "Interest Rate : 3.74 % APR : 3.84 % Please lock in the rate",
        longDescription: "Interest Rate : 3.74 % APR : 3.84 % Please lock in the rate",
        valid: "2020-03-01 12:48:52.297"
      }];
      productCategorycomponent.onProductOfferSelect(dummyProductOffer);
      spyOn(productCategorycomponent.onLoadCustomer, 'emit');
      fixture.detectChanges();
      productCategorycomponent.onLoadCustomer.subscribe(next => {
        expect(next).toEqual([dummyProductOffer]);
      });
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
    });

  });

});
