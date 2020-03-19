import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ServiceResponse } from 'app/shared/_models/service-response.model';
import { RestClientService } from 'app/framework/rest-client';
import { VendorCategory } from 'app/leads/_models/vendor.model';
import { VendorInformation } from 'app/leads/_models/vendor.model';

@Injectable({
    providedIn: 'root'
})

export class VendorService {
    constructor(private restService: RestClientService) { }

    public getVendorCategories(): Observable<ServiceResponse<VendorCategory[]>> {
        return this.restService.get<ServiceResponse<VendorCategory[]>>("/v1/vendor/category");
    }

    public postVendorDetails(vendorDetails: VendorInformation): Observable<ServiceResponse<VendorInformation>> {
        return this.restService.post<ServiceResponse<VendorInformation>>("/v1/vendor", vendorDetails);
    }

    //TODO: remove this
    public getVendorData() : Observable<ServiceResponse<any>> { 
        return this.restService.get<ServiceResponse<any>>('/v1/vendors');
      }

    public getVendorDetails(id:number) :Observable<ServiceResponse<VendorInformation>>{
        return this.restService.get<ServiceResponse<VendorInformation>>('/v1/vendor/'+id);
    }
}