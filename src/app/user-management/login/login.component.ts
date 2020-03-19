import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/user-management/_services/auth.service';
import { IUserDetails } from 'app/user-management/_models/user.model';
import { UserTypeEnum } from 'app/user-management/_helper/usertype.enum';
import { UtilService } from 'app/user-management/_services/util.service';

@Component({
  selector: 'fn-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  userDetails: IUserDetails;
  isLoading = false;
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private utilService: UtilService) { }

  ngOnInit() {
    this.userDetails = this.authService.initializeUserDetailModel();
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  get f() { return this.loginForm.controls; }

  public login() {
    this.authService.removeLocalStorage();
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.userDetails = { email: this.f.email.value, password: this.f.password.value, userType: UserTypeEnum.Sponsor };
    this.utilService.autoLogin(this.userDetails);
  }
}
