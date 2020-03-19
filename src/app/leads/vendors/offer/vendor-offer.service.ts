import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ServiceResponse } from 'app/shared/_models/service-response.model';
import { RestClientService } from 'app/framework/rest-client';

import { VendorOfferDetail, VendorInformation } from 'app/leads/_models/vendor.model';
import { IOfferResponse } from 'app/leads/_models/offer.model';


@Injectable({
    providedIn: 'root'
})

export class VendorOfferService {
    constructor(private restService: RestClientService) { }

    public addOfferDetail(offerDetail: VendorOfferDetail): Observable<ServiceResponse<VendorOfferDetail>> {
        return this.restService.post<ServiceResponse<VendorOfferDetail>>("/v1/vendor/offer", offerDetail);
    }

    public updateOfferDetail(offerDetail: VendorOfferDetail): Observable<ServiceResponse<VendorOfferDetail>> {
        return this.restService.post<ServiceResponse<VendorOfferDetail>>("/v1/vendor/editoffer", offerDetail);
    }

    public deleteOfferDetail(offerId: number): Observable<ServiceResponse<any>> {
        return this.restService.delete<ServiceResponse<any>>("/v1/vendors/" + offerId, {});
    }

    public getOfferDetails(vendorId: number): Observable<ServiceResponse<IOfferResponse[]>> {
        return this.restService.get<ServiceResponse<IOfferResponse[]>>("/v1/vendors/" + vendorId);
    }

    
}