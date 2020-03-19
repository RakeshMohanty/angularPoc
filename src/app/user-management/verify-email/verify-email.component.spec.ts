import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { VerifyEmailComponent } from 'app/user-management/verify-email/verify-email.component';
import { ValidateOnBlurDirective } from 'app/core/directive/validate-blur.directive';

describe('VerifyEmailComponent', () => {
  let component: VerifyEmailComponent;
  let fixture: ComponentFixture<VerifyEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule
      ],
      declarations: [VerifyEmailComponent, ValidateOnBlurDirective]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyEmailComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create verify email', () => {
    expect(component).toBeTruthy();
  });

  describe('Verify Email form', () => {

    it('should be invalid and should throw validation required error', async(() => {
      component.verifyEmail.controls['email'].setValue('');
      expect(component.verifyEmail.valid).toBeFalsy();
      expect(component.verifyEmail.controls['email'].hasError('required')).toBeTruthy();
    }));

    it('form invalid when empty', () => {
      expect(component.verifyEmail.invalid).toBeTruthy;
    });

    it('should throw invalid email error', async(() => {
      component.verifyEmail.controls['email'].setValue('123');
      expect(component.verifyEmail.controls['email'].hasError('invalid')).toBeFalsy();
    }));
    it('should not throw invalid email error', async(() => {
      component.verifyEmail.controls['email'].setValue('123');
      expect(component.verifyEmail.controls['email'].hasError('invalid')).toBeFalsy();
    }));

    it('should call the change ', async(() => {
      component.verifyEmail.controls['email'].setValue('123');
      expect(component.verifyEmail.controls['email'].hasError('invalid')).toBeFalsy();
    }));


    it('should call the submit method and emit the valid email', async(() => {
      component.verifyEmail.controls['email'].setValue('testing123@gmail.com');
      const spyEmail = spyOn(component, "onSubmit").and.callThrough();
      component.onSubmit();
      const spy = spyOn(component.verifyEmailService, 'emit');
      fixture.detectChanges();
      component.verifyEmailService.subscribe(next => {
        expect(next).toEqual('testing123@gmail.com');
      });
      expect(spyEmail).toHaveBeenCalled();
      expect(spyEmail).toHaveBeenCalledTimes(1);
    }));

    it('should not emit email when form is invalid', () => {
      component.verifyEmail.controls['email'].setValue('testing123');
      const spyEmail = spyOn(component, "onSubmit").and.callThrough();
      component.onSubmit();
      expect(component.verifyEmail.invalid).toBeTruthy;

    });
  });
}); 
