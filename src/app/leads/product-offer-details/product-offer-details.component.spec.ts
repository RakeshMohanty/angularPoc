import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOfferDetailsComponent } from './product-offer-details.component';

xdescribe('ProductOfferDetailsComponent', () => {
  let component: ProductOfferDetailsComponent;
  let fixture: ComponentFixture<ProductOfferDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductOfferDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOfferDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
