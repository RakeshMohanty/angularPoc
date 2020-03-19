import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule, Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

import { RegisterAccountComponent } from 'app/user-management/register-account/register-account.component';
import { RegisterService } from 'app/user-management/_services/register.service';
import { VerifyEmailComponent } from 'app/user-management/verify-email/verify-email.component';
import { VerifyCodeComponent } from 'app/user-management/verify-code/verify-code.component';
import { SetPasswordComponent } from 'app/user-management/set-password/set-password.component';
import { ValidateOnBlurDirective } from 'app/core/directive/validate-blur.directive';
import { RestClientService } from 'app/framework/rest-client';
import { AuthService } from 'app/user-management/_services/auth.service';
import { UtilService } from 'app/user-management/_services/util.service';

describe('RegisterAccountComponent', () => {
  let component: RegisterAccountComponent;
  let service: RegisterService;
  let utilService: UtilService;
  let fixture: ComponentFixture<RegisterAccountComponent>;
  const fakePassword = "aA1aaaaa";

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, StoreModule.forRoot({})
      ],
      declarations: [RegisterAccountComponent, VerifyEmailComponent, VerifyCodeComponent, SetPasswordComponent, ValidateOnBlurDirective],
      providers: [RegisterService, RestClientService, AuthService, Store, MessageService]
    })
      .compileComponents();
    service = TestBed.get(RegisterService);
    utilService = TestBed.get(UtilService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAccountComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSetPassword()', () => {
    
    it('should call onSetPassword() method with required parameter', async(() => {
      const spy = spyOn(component, "onSetPassword").and.callThrough();
      const spyService = spyOn(service, 'setPassword').and.callThrough();
      component.onSetPassword(fakePassword);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(fakePassword);
      expect(spyService).toHaveBeenCalled();
    }));

    it('should return login response', async(() => {
      const mockResponse = {
        "responseMessages": {
          "message": "Sponsor set password successfully"
        },
        "success": true,
        "results": {
          "accessToken": 'fhgf645hgdfhjgf',
          "refreshToken": 'xxxyyyyss'
        }
      };
      component.userModel.password = fakePassword;
      component.userModel.email = 'xxx@dsa.com;'
      const spyService = spyOn(service, 'setPassword').and.returnValue(
        of(mockResponse)
      );
      const spyUtilService = spyOn(utilService, 'autoLogin');
      component.onSetPassword(fakePassword);
      service.setPassword(component.userModel)
        .subscribe(response => {
          expect(response.success).toEqual(true);
          expect(response.results['accessToken']).toEqual('fhgf645hgdfhjgf');
          expect(response.results['refreshToken']).toEqual('xxxyyyyss');
          expect(spyUtilService).toHaveBeenCalled();
        });
      expect(spyService).toHaveBeenCalled();
      expect(component.userDetails.email).toEqual(component.userModel.email);
      expect(component.userDetails.password).toEqual(component.userModel.password);
    }));
  });

  describe('verifyEmail()', () => {

    const fakeMail = "xyz@aaa.com";
    const mockResponse = {
      "responseMessages": {
        "message": "Sponsor verify mail successfully"
      },
      "success": true,
      "results": {
        "phoneNumber": '7889',
        "validityTime": '2'
      }
    };

    it('should call verifyEmail() method with required parameter', async(() => {
      const spy = spyOn(component, "verifyEmail").and.callThrough();
      component.verifyEmail(fakeMail);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(fakeMail);
      expect(component.currentStep).toEqual(1);
    }));

    it('should return phonenumber and validity time', async(() => {
      component.userModel.registration = true;
      const spyService = spyOn(service, 'verifyEmail').and.returnValue(
        of(mockResponse)
      );
      component.verifyEmail(fakeMail);
      service.verifyEmail(component.userModel)
        .subscribe(response => {
          expect(response.success).toEqual(true);
          expect(response.results['phoneNumber']).toEqual('7889');
          expect(response.results['validityTime']).toEqual('2');
        });
      expect(spyService).toHaveBeenCalled();
    }));

    it('should increment the current step to two and set the response result', async(() => {
      component.userModel.email = 'aaa@gmail.com';
      component.verifyEmail(fakeMail);

      const spyService = spyOn(service, 'verifyEmail').and.returnValue(
        of(mockResponse)
      );
      component.userDetails.email = component.userModel.email;
      expect(component.userDetails.email).toEqual(component.userModel.email);
      expect(component.userModel.registration).toEqual(true);
      service.verifyEmail(component.userModel)
        .subscribe(response => {
          component.currentStep++;
          component.codeDetails = response.results;
        });
      expect(component.currentStep).toEqual(2);
      expect(spyService).toHaveBeenCalled();
      expect(component.codeDetails).toEqual(mockResponse.results);
    }));
  });

  describe('verifyCode()', () => {

    const fakeCode = "1234";
    const mockResponse = {
      "responseMessages": {
        "message": "Sponsor verify code successfully"
      },
      "success": true,
      "results": {
        "validityTime": '2'
      }
    };
    it('should call verifyCode() method with required parameter', async(() => {
      const spy = spyOn(component, "verifyCode").and.callThrough();
      component.verifyCode(fakeCode);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(fakeCode);
    }));

    it('should return verify the code', async(() => {
      const spyService = spyOn(service, 'verifyCode').and.returnValue(
        of(mockResponse)
      );
      component.userModel.code = '1234';
      component.verifyCode(fakeCode);
      service.verifyCode(component.userModel)
        .subscribe(response => {
          expect(response.success).toEqual(true);
        });
      expect(spyService).toHaveBeenCalled();
    }));

    it('should increment the current step to three and set the response result ', async(() => {
      component.userModel.code = '1234';
      component.currentStep = 2;
      component.verifyCode(fakeCode);
      const spyService = spyOn(service, 'verifyCode').and.returnValue(
        of(mockResponse)
      );
      service.verifyCode(component.userModel)
        .subscribe(response => {
          component.currentStep++;
        });
      expect(spyService).toHaveBeenCalled();
      expect(component.currentStep).toEqual(3);
    }));
  });

  describe('verifyResendCode()', () => {

    const fakeCode = "1234";
    const mockResponse = {
      "responseMessages": {
        "message": "Sponsor verify resend successfully"
      },
      "success": true,
      "results": true
    };

    it('should call resendCode() method with required parameter', async(() => {
      const spy = spyOn(component, "resendCode").and.callThrough();

      component.resendCode(fakeCode);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(fakeCode);
    }));

    it('should return the new code', async(() => {
      const spyService = spyOn(service, 'verifyResend').and.returnValue(
        of(mockResponse)
      );
      component.userModel.code = '1234';
      component.resendCode(fakeCode);
      service.verifyResend(component.userModel)
        .subscribe(response => {
          expect(response.success).toEqual(true);
        });
      expect(spyService).toHaveBeenCalled();
    }));

    it('should increment the resendCodeStatus to two', async(() => {
      component.userModel.code = '1234';
      component.resendCodeStatus = 1;
      component.resendCode(fakeCode);
      const spyService = spyOn(service, 'verifyResend').and.returnValue(
        of(mockResponse)
      );
      service.verifyResend(component.userModel)
        .subscribe(response => {
          component.resendCodeStatus++;
        });
      expect(spyService).toHaveBeenCalled();
      expect(component.resendCodeStatus).toEqual(2);
    }));
  })

});
