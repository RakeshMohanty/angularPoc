import { Component, OnInit, ComponentFactoryResolver, ChangeDetectorRef, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, Subject } from 'rxjs';
import { catchError, exhaustMap, map, tap, takeUntil, delay } from 'rxjs/operators';
import { SelectItem } from 'primeng/api';

import { AppState } from 'app/app.state';
import { ProductCategory, ProductOffer } from 'app/leads/_models/leads.model';
import { ProductData } from 'app/leads/_models/product-offer.model';
import { ProductOffersComponent } from 'app/leads/product-offers/product-offers.component';
import * as productAction from 'app/actions/product-category.action';
import * as productOfferAction from 'app/actions/product-offers.action';
import { SCREEN_SIZE } from 'app/leads/shared/screen-size.enum';
import { ResizeService } from 'app/leads/shared/resize.service';
import { ContentContainerDirective } from '../_directives/content-container.directive';

@Component({
  selector: 'fn-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit, OnDestroy {

  @Output() onLoadCustomer = new EventEmitter<void>();

  public size: number | string;
  isAllowedAccess: boolean = false;
  productCategoriesSubscription: Subscription;
  resizeSubscription: Subscription;
  productCategoriesList: ProductCategory[];
  productsOffersSubscription: Subscription;
  productOffersList;
  productOffers: ProductData;
  selectedIndex: number = 0;
  selectedCategoryId: number;
  selectedCategory: ProductCategory;
  isMobileView: boolean = false;

  constructor(private store: Store<AppState>, private resizeService: ResizeService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.store.dispatch(productAction.clearProductCategories());
    this.store.dispatch(productAction.LoadProductCategories());
    this.productCategoriesSubscription = this.store.select(state => state.productCategories).subscribe((productCategories: ProductCategory[]) => {
      if (productCategories && productCategories.length) {
        this.productCategoriesList = productCategories;
        this.selectedCategory = this.productCategoriesList[0];
        this.onCategoryChange();
        this.getResize();

      }
    });
  }

  getResize() {
    this.resizeSubscription = this.resizeService.onResize$
      .pipe(delay(0))
      .subscribe(size => {
        this.size = size;
        this.isResponsive();
      });
  }

  onCategorySelect(index): void {
    this.selectedCategory = this.productCategoriesList[index];
    this.loadProductOfferComponent();
  }

  onCategoryChange(): void {
    this.loadProductOfferComponent();
  }

  loadProductOfferComponent(): void {
    if (this.selectedCategory.id) {
      this.store.dispatch(productOfferAction.clearProductOffers());
      this.store.dispatch(productOfferAction.LoadProductOffers({ payload: this.selectedCategory.id }));
      this.productsOffersSubscription = this.store.select(state => state.productOffers).subscribe((productOffers: ProductOffer[]) => {
        if (productOffers && productOffers.length) {
          this.productOffersList = productOffers;
          this.productOffers = new ProductData(ProductOffersComponent, this.productOffersList);
        }
      });
    }
  }

  isResponsive(): void {
    if (this.size < SCREEN_SIZE.SMALL_DEVICE) {
      this.isMobileView = true;
    } else {
      this.isMobileView = false;
    }
    this.loadProductOfferComponent();

  }

  onProductOfferSelect(data) {
    this.onLoadCustomer.emit(data);
  }

  ngOnDestroy() {
    if (this.productCategoriesSubscription) {
      this.productCategoriesSubscription.unsubscribe();
    }
    if (this.productsOffersSubscription) {
      this.productsOffersSubscription.unsubscribe();
    }
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

}

