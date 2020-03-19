import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

import { ProductOffer } from 'app/leads/_models/leads.model';
import { ModalContentService } from 'app/core/component/modal-content/service/modal-content.service'
import { ProductOfferDetailsComponent } from 'app/leads/product-offer-details/product-offer-details.component'
import { ModalContentSettings } from 'app/core/component/modal-content/model/modal-content-settings'

@Component({
  selector: 'fn-product-offers',
  templateUrl: './product-offers.component.html',
  styleUrls: ['./product-offers.component.scss'],
  providers: [ModalContentService]
})
export class ProductOffersComponent implements OnInit {

  @Input() productData: ProductOffer[];
  @Input() isMobileView: boolean;
  modalData: ModalContentSettings;
  cardsVisibleLength: number;
  @Output() onOfferClick = new EventEmitter<ProductOffer>();
  isCustomCards: boolean = false;

  constructor(private service: ModalContentService) { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    if (this.productData) {
      if (this.productData.length < 3) {
        this.cardsVisibleLength = this.productData.length;
        this.isCustomCards = true;
      } else {
        this.cardsVisibleLength = 3;
      }
    }
  }

  openModal(productData: ProductOffer) {
    this.modalData = {
      size: 'lg',
      title: "Offer Details",
      bodyContent: productData,
      okTitle: " ",
      cancelTitle: " "
    }
    this.service.openModalComponent(ProductOfferDetailsComponent, this.modalData);
  }
  onOfferSelect(productOffer: ProductOffer) {
    this.onOfferClick.emit(productOffer);
  }
}