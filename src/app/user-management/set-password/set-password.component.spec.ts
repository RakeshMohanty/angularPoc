import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SetPasswordComponent } from 'app/user-management/set-password/set-password.component';
import { ValidateOnBlurDirective } from 'app/core/directive/validate-blur.directive';

describe('SetPasswordComponent', () => {
  let component: SetPasswordComponent;
  let fixture: ComponentFixture<SetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SetPasswordComponent, ValidateOnBlurDirective],
      imports: [
        CommonModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetPasswordComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create set password', () => {
    expect(component).toBeTruthy();
  });

  describe('set password form', () => {

    it(' should be invalid and should throw validation required error', async(() => {
      component.setPassWordForm.controls['password'].setValue('');
      component.setPassWordForm.controls['confirmPassword'].setValue('');
      expect(component.setPassWordForm.valid).toBeFalsy();
      expect(component.setPassWordForm.controls['password'].hasError('required')).toBeTruthy();
      expect(component.setPassWordForm.controls['confirmPassword'].hasError('required')).toBeTruthy();
    }));

    it('should throw minlength error ', async(() => {
      component.setPassWordForm.controls['password'].setValue('aa');
      component.setPassWordForm.controls['confirmPassword'].setValue('bb');
      expect(component.setPassWordForm.controls['password'].hasError('minlength')).toBeTruthy();
    }));

  });

  describe('Check set password form with custom error', () => {

    it('should not throw invalidUpperCase error', async(() => {
      component.setPassWordForm.controls['password'].setValue('AA');
      component.setPassWordForm.controls['confirmPassword'].setValue('BB');
      expect(component.setPassWordForm.controls['password'].hasError('invalidUpperCase')).toBeFalsy();
      expect(component.setPassWordForm.controls['password'].hasError('invalidSmallCase')).toBeTruthy();
    }));

    it('should not throw invalidSmallCase error', async(() => {
      component.setPasswordFormValidations();
      component.setPassWordForm.controls['password'].setValue('aa');
      component.setPassWordForm.controls['confirmPassword'].setValue('bb');
      expect(component.setPassWordForm.controls['password'].hasError('invalidSmallCase')).toBeFalsy();
      expect(component.setPassWordForm.controls['password'].hasError('invalidUpperCase')).toBeTruthy();
    }));

    it('should not throw invalidUpperCase error', async(() => {
      component.setPassWordForm.controls['password'].setValue('AA');
      component.setPassWordForm.controls['confirmPassword'].setValue('BB');
      expect(component.setPassWordForm.controls['confirmPassword'].hasError('invalidUpperCase')).toBeFalsy();
    }));

    it('should not through invalidNumber error ', async(() => {
      component.setPassWordForm.controls['password'].setValue('1');
      component.setPassWordForm.controls['confirmPassword'].setValue('2');
      expect(component.setPassWordForm.controls['password'].hasError('invalidNumber')).toBeFalsy();
      expect(component.setPassWordForm.controls['password'].hasError('invalidUpperCase')).toBeTruthy();
      expect(component.setPassWordForm.controls['password'].hasError('invalidSmallCase')).toBeTruthy();
    }));
  });

  describe('Check new password field with validations ', () => {

    it('should not throw invalidUpperCase and invalidSmallCase errors', async(() => {
      component.setPassWordForm.controls['password'].setValue('aaAA');
      expect(component.setPassWordForm.controls['password'].hasError('invalidUpperCase')).toBeFalsy();
      expect(component.setPassWordForm.controls['password'].hasError('invalidSmallCase')).toBeFalsy();
    }));

    it('should not throw any custom errors', async(() => {
      component.setPassWordForm.controls['password'].setValue('aaAA1');
      expect(component.setPassWordForm.controls['password'].hasError('invalidUpperCase')).toBeFalsy();
      expect(component.setPassWordForm.controls['password'].hasError('invalidSmallCase')).toBeFalsy();
      expect(component.setPassWordForm.controls['password'].hasError('invalidNumber')).toBeFalsy();
    }));

    it('should throw only minlength error ', async(() => {
      component.setPassWordForm.controls['password'].setValue('aaAA1');
      expect(component.setPassWordForm.controls['password'].hasError('minlength')).toBeTruthy();
      expect(component.setPassWordForm.controls['password'].hasError('invalidUpperCase')).toBeFalsy();
      expect(component.setPassWordForm.controls['password'].hasError('invalidSmallCase')).toBeFalsy();
      expect(component.setPassWordForm.controls['password'].hasError('invalidNumber')).toBeFalsy();
    }));

    it('should not show any error and password field should be valid ', async(() => {
      component.setPassWordForm.controls['password'].setValue('aaAA1aaa');
      expect(component.setPassWordForm.controls['password'].hasError('minlength')).toBeFalsy();
      expect(component.setPassWordForm.controls['password'].valid).toBeTruthy();
    }));
  });

  describe('Check confirm password field with validations', () => {

    it('should call the password submit method and emit the valid password', async(() => {
      component.setPassWordForm.controls['password'].setValue('aaAA1aaa');
      component.setPassWordForm.controls['confirmPassword'].setValue('aaAA1aaa');
      const spyPassword = spyOn(component, "onPasswordSubmit").and.callThrough();
      component.onPasswordSubmit();
      const spy = spyOn(component.setPasswordHandle, 'emit');
      fixture.detectChanges();
      component.setPasswordHandle.subscribe(next => {
        expect(next).toEqual('aaAA1aaa');
      });
      expect(spyPassword).toHaveBeenCalled();
      expect(spyPassword).toHaveBeenCalledTimes(1);
    }));

  });

  describe('Check confirm password and new password fields with validations', () => {

    it('confirm password', async(() => {
      component.setPassWordForm.controls['confirmPassword'].setValue('aaaaaaaa');
      expect(component.setPassWordForm.controls['confirmPassword'].hasError('minlength')).toBeFalsy();
    }));

    it('confirm password should not match the new password ', async(() => {
      component.setPassWordForm.controls['password'].setValue('aaAA1aaa');
      component.setPassWordForm.controls['confirmPassword'].setValue('aaaaaaaa');
      expect(component.setPassWordForm.controls['confirmPassword'].hasError('noPassswordMatch')).toBeTruthy();
      expect(component.setPassWordForm.controls['confirmPassword'].invalid).toBeTruthy();
    }));

    it('confirm password should match the new password ', async(() => {
      component.setPassWordForm.controls['password'].setValue('aaAA1aaa');
      component.setPassWordForm.controls['confirmPassword'].setValue('aaAA1aaa');
      expect(component.setPassWordForm.controls['confirmPassword'].hasError('noPassswordMatch')).toBeFalsy();
      expect(component.setPassWordForm.controls['confirmPassword'].valid).toBeTruthy();
    }));

  });

  describe('set password focus', () => {

    it('focus method should set the new password as touched', async(() => {
      const spyPassword = spyOn(component, "onPasswordFocus").and.callThrough();
      component.onPasswordFocus();
      expect(spyPassword).toHaveBeenCalled();
      expect(spyPassword).toHaveBeenCalledTimes(1);
      expect(component.isFieldFocused).toBeTruthy();
    }));

  });
});


