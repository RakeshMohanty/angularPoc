/* tslint:disable */
import { Directive, HostListener, Input, ContentChild } from '@angular/core';
import { Carousel } from 'primeng/carousel';
import { ProductOffer } from 'app/leads/_models/leads.model';
import { ModalContentSettings } from 'app/core/component/modal-content/model/modal-content-settings';
import { ModalContentService } from 'app/core/component/modal-content/service/modal-content.service';
import { ProductOfferDetailsComponent } from 'app/leads/product-offer-details/product-offer-details.component';


@Directive({
    selector: '[carousel-formatter]',
    providers: [ModalContentService]
})
export class CarouselDirective {
    @Input() options: any = {};
    @ContentChild(Carousel, undefined) carouselValue: Carousel;
    @Input() productData: ProductOffer[];
    modalData: ModalContentSettings;
    constructor( private service: ModalContentService) {
    }
    @HostListener('touchstart', ['$event'])
    handleKeyUp(event: any): void {
        if(event.srcElement.classList.contains('bn-default'))
        {
            event.stopPropagation();
            event.preventDefault();
            this.modalData = {
                size: 'lg',
                title: "Offer Details",
                bodyContent: this.options.productData,
                okTitle: " ",
                cancelTitle: " "
              }
              this.service.openModalComponent(ProductOfferDetailsComponent, this.modalData);
            
        }
    }
}
