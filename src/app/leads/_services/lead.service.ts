import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestClientService } from 'app/framework/rest-client';
import { ServiceResponse } from 'app/shared/_models/service-response.model';
import { FnConstants } from 'app/shared/utils/constants';
import { Broadcast } from 'app/leads/_models/broadcast.model';
import { ICustomerInfoRequest, ICustomer, ICustomerMessageRequest, ICustomerMessageResponse } from 'app/leads/_models/customer.model';

@Injectable()
export class LeadService {

    constructor(private restService: RestClientService) {

    }
    public getCustomers(customerRequest: ICustomerInfoRequest): Observable<ServiceResponse<ICustomer>> {
        return this.restService.post<ServiceResponse<ICustomer[]>>('/v1/sponsor/sponsor/customers', customerRequest);
    }

    public sendEmail(customerId: number, status: string): Observable<ServiceResponse<any>> {
        if (status == FnConstants.CREATED) {
            return this.restService.get<ServiceResponse<any>>('/api/v1/customer/sendRegistrationEmail/' + customerId);
        }
        else {
            return this.restService.get<ServiceResponse<any>>('/api/v1/customer/reminderemail/' + customerId);
        }
    }

    public sendBroadcast(broadcastMessageVO: Broadcast): Observable<ServiceResponse<boolean>> {
        return this.restService.post<ServiceResponse<boolean>>('/v1/sponsor/broadcastMessage', broadcastMessageVO);
    }

    public sendMessages(messageVO): Observable<ServiceResponse<ICustomerMessageResponse[]>> {
        return this.restService.post<ServiceResponse<ICustomerMessageResponse[]>>('/v1/sponsor/onetoone/message', messageVO);
    }

    public getViewMessages(customerId: number): Observable<ServiceResponse<ICustomerMessageResponse[]>> {
        return this.restService.get<ServiceResponse<ICustomerMessageResponse[]>>('/v1/sponsor/viewmessages/' + customerId);
    }


    
}