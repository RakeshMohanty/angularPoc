import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { UserModel } from 'app/user-management/register-account/_models/register.model';
import { IUserDetails } from 'app/user-management/_models/user.model';
import { RegisterService } from 'app/user-management/_services/register.service';
import { Router } from '@angular/router';
import { UserTypeEnum } from 'app/user-management/_helper/usertype.enum';
import { UtilService } from 'app/user-management/_services/util.service';


@Component({
  selector: 'fn-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPassword: FormGroup;
  currentStep: number = 1;
  public userModel = {} as UserModel;
  userDetails = {} as IUserDetails;
  errorResult: boolean;
  codeDetails: object;
  resendCodeStatus = 1;
  title = "Forgot Password";

  constructor(private formBuilder: FormBuilder, private userService: RegisterService, private router: Router, private utilService: UtilService) {
  }

  ngOnInit() {
    this.forgotPassword = this.formBuilder.group({});
  }

  onSetPassword(validPassword) {
    this.userModel.password = validPassword;
    this.userService.setPassword(this.userModel).subscribe((response: any) => {
      if (response.success) {
        this.userDetails.password = this.userModel.password;
        this.userDetails.email = this.userModel.email;
        this.userDetails.userType = UserTypeEnum.Sponsor;
        this.utilService.autoLogin(this.userDetails);
      }
    });
  }

  verifyEmail(email) {
    this.userModel.email = email;
    this.userModel.registration = false;
    this.userService.verifyEmail(this.userModel).subscribe((response: any) => {
      if (response.success) {
        this.currentStep = 2;
        this.codeDetails = response.results;
      }
    });
  }

  verifyCode(code) {
    this.userModel.code = code;
    this.userService.verifyCode(this.userModel).subscribe((response: any) => {
      if (response.success) {
        this.currentStep = 3;
      }
    });
  }

  resendCode(resend) {
    if (resend) {
      this.userService.verifyResend(this.userModel).subscribe((response: any) => {
        if (response.success) {
          this.resendCodeStatus++;
        }
      });
    }
  }
}
