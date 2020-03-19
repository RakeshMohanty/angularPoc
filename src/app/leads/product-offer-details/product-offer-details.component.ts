import { Component, OnInit } from '@angular/core';
import { ModalContentSettings } from 'app/core/component/modal-content/model/modal-content-settings';

@Component({
    selector: 'fn-product-offer-details',
    templateUrl: './product-offer-details.component.html',
    styleUrls: ['./product-offer-details.component.scss']
})
export class ProductOfferDetailsComponent implements OnInit {
    data: ModalContentSettings;

    constructor() {}

    ngOnInit() {}
}
