import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ServiceResponse } from 'app/shared/_models/service-response.model';
import { RestClientService } from 'app/framework/rest-client';
import { ProductCategory, ProductOffer } from 'app/leads/_models/leads.model';

@Injectable({
    providedIn: 'root'
})

export class ProductCategoryService {
    constructor(private restService: RestClientService) { }

    public getProductCategories(): Observable<ServiceResponse<ProductCategory[]>> {
        return this.restService.get<ServiceResponse<ProductCategory[]>>("/v1/sponsor/productcategories");
    }

    public getProductOffers(productId: number): Observable<ServiceResponse<ProductOffer[]>> {
        return this.restService.get<ServiceResponse<ProductOffer[]>>('/v1/sponsor/offers/' + productId);
    }
}