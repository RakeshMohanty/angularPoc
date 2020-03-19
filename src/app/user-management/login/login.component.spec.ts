import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../_services/auth.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { AppReducer } from 'app/app.reducer';
import { RestClientService } from 'app/framework/rest-client';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IUserDetails } from 'app/user-management/_models/user.model';
import { UtilService } from 'app/user-management/_services/util.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let utilServiceSpy: UtilService;
  let authService: AuthService;
  let userdetails: IUserDetails;
  function updateForm(userEmail, userPassword) {
    component.loginForm.controls['email'].setValue(userEmail);
    component.loginForm.controls['password'].setValue(userPassword);
  }
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        CommonModule,
        ReactiveFormsModule,
        RouterTestingModule,
        AppReducer
      ],
      providers: [
        AuthService,
        RestClientService,
        FormBuilder,
        MessageService,
        Store,
        UtilService
      ],
      declarations: [LoginComponent]
    })
      .compileComponents();
    utilServiceSpy = TestBed.get(UtilService);
    authService = TestBed.get(AuthService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    userdetails = authService.initializeUserDetailModel();
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('component successfully created', () => {
    expect(component).toBeTruthy();
  });
  it('component initial state', () => {
    expect(component.submitted).toBeFalsy();
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.invalid).toBeTruthy();
  });

  it('submitted should be true when login()', () => {
    component.login();
    expect(component.submitted).toBeTruthy();
  });
  it('should invalid and  throw required  validator when email field is blank', () => {
    updateForm('', 'Test123');
    fixture.detectChanges();
    expect(component.loginForm.valid).toBeFalsy();
    expect(component.loginForm.controls['email'].hasError('required')).toBeTruthy();
  });

  it('should invalid and  throw required  validator  when Password is blank', () => {
    updateForm('rakesh.mohanty@tavant.com', '');
    fixture.detectChanges();
    expect(component.loginForm.valid).toBeFalsy();
    expect(component.loginForm.controls['password'].hasError('required')).toBeTruthy();
  });

  it('should throw invalid email error when email is not Email address', () => {
    updateForm('rakesh.mohanty', 'Test123');
    fixture.detectChanges();
    let errors = {};
    let email = component.loginForm.controls['email'];
    errors = email.errors || {};
    expect(errors['email']).toBeTruthy();
    expect(component.loginForm.valid).toBeFalsy();
    expect(component.loginForm.controls['email'].hasError('email')).toBeTruthy();
  });
  it('submitted should be true when login()', () => {
    component.login();
    expect(component.submitted).toBeTruthy();
  });
  it('Form invalid should be true when loginform is invalid', (() => {
    updateForm('', '');
    expect(component.loginForm.invalid).toBeTruthy();
  }));

  it('auth service login() should called ', async(() => {
    authService.removeLocalStorage();
    component.loginForm.controls['email'].setValue('rakesh.mohanty@tavant.com');
    component.loginForm.controls['password'].setValue('Rakesh123');
    let loginSpy = spyOn(utilServiceSpy, 'autoLogin');
    component.login();
    userdetails = {
      email: component.loginForm.controls['email'].value, password: component.loginForm.controls['password'].value, userType: 1
    };
    expect(loginSpy).toHaveBeenCalled();
  }));
});
