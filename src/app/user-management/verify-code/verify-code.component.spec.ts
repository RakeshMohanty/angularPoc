import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyCodeComponent } from 'app/user-management/verify-code/verify-code.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('VerifyCodeComponent', () => {
  let component: VerifyCodeComponent;
  let fixture: ComponentFixture<VerifyCodeComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule
      ],
      declarations: [VerifyCodeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyCodeComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Verify Code form', () => {

    it('should call the checkRequiredValidation method to throw the required error only when all the verification codes are blank', async(() => {
      component.verifyCode.controls['code1'].setValue('');
      component.verifyCode.controls['code2'].setValue('');
      component.verifyCode.controls['code3'].setValue('');
      component.verifyCode.controls['code4'].setValue('');
      component.submitted = true;
      component.isRequired = true;
      const spyCode = spyOn(component, 'checkRequiredValidation').and.callThrough();
      component.checkRequiredValidation();
      expect(spyCode).toHaveBeenCalled();
    }));

    it('should not throw required errror when single or more verification code has entered', async(() => {
      component.verifyCode.controls['code1'].setValue('2');
      component.submitted = true;
      component.isRequired = false;
      const spyCode = spyOn(component, 'checkRequiredValidation').and.callThrough();
      component.checkRequiredValidation();
      expect(spyCode).toHaveBeenCalled();
    }));

  });

  describe('check resend verification code', () => {
    it('should call the resendVerification method and emit the resend status', async(() => {
      component.resend = true;
      const spyResend = spyOn(component, "resendVerification").and.callThrough();
      component.resendVerification();
      const spy = spyOn(component.verifyResendService, 'emit');
      expect(spyResend).toHaveBeenCalled();
    }));
  });

  describe('check whether the verification code is emitting', () => {
    it('should call the onSubmit method and emit the verification code', async(() => {
      component.verifyCode.controls['code1'].setValue(1);
      component.verifyCode.controls['code2'].setValue(2);
      component.verifyCode.controls['code3'].setValue(3);
      component.verifyCode.controls['code4'].setValue(4);
      component.submitted = true;
      const spyCode = spyOn(component, "onSubmit").and.callThrough();
      component.onSubmit();
      const spy = spyOn(component.verifyCodeService, 'emit');
      component.verifyCodeService.subscribe(next => {
        expect(next).toEqual('1234');
      });
      expect(spyCode).toHaveBeenCalled();
    }));

    it('should not emit the verification code when the form is not valid', async(() => {
      component.verifyCode.controls['code1'].setValue('');
      component.verifyCode.controls['code2'].setValue('');
      component.verifyCode.controls['code3'].setValue('');
      component.verifyCode.controls['code4'].setValue('');
      component.submitted = false;
      const spyCode = spyOn(component, "onSubmit").and.callThrough();
      component.onSubmit();
      expect(spyCode).toHaveBeenCalled();
    }));
  });

});

