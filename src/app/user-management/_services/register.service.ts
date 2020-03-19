import { Injectable } from '@angular/core';

import { RestClientService } from 'app/framework/rest-client';

import { Observable } from 'rxjs';
import { ServiceResponse } from 'app/shared/_models/service-response.model';
import { UserModel } from 'app/user-management/register-account/_models/register.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private restService: RestClientService) { }
 
  public verifyEmail(userModel: UserModel) : Observable<ServiceResponse<any>> {  
    return this.restService.post<ServiceResponse<any>>('/public/v1/sponsor/lookup', userModel);
  }
  public setPassword(userModel: UserModel) : Observable<ServiceResponse<any>> {  
    return this.restService.post<ServiceResponse<any>>('/public/v1/sponsor/password/update', userModel);
  }
  public verifyCode(userModel: UserModel) : Observable<ServiceResponse<any>> { 
    return this.restService.post<ServiceResponse<any>>('/public/v1/sponsor/verify/code', userModel);
  }
  public verifyResend(userModel: UserModel) : Observable<ServiceResponse<any>> { 
    return this.restService.post<ServiceResponse<any>>('/public/v1/sponsor/resend/code', userModel);
  }
}
