import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { RegisterService } from 'app/user-management/_services/register.service';
import { UserModel } from 'app/user-management/register-account/_models/register.model';
import { AuthService } from 'app/user-management/_services/auth.service';
import { IUserDetails } from 'app/user-management/_models/user.model';
import { UserTypeEnum } from 'app/user-management/_helper/usertype.enum';
import { UtilService } from 'app/user-management/_services/util.service';


@Component({
  selector: 'fn-register-account',
  templateUrl: './register-account.component.html',
  styleUrls: ['./register-account.component.scss']
})
export class RegisterAccountComponent implements OnInit {
  verifyRegister: FormGroup;
  currentStep: number = 1;
  public userModel = {} as UserModel;
  userDetails: IUserDetails;
  errorResult: boolean;
  codeDetails: object;
  resendCodeStatus = 1;
  title = "Create Account";

  constructor(private formBuilder: FormBuilder, private userService: RegisterService, private router: Router,
    private authService: AuthService, private utilService: UtilService, private messageService: MessageService) {
  }

  ngOnInit() {
    this.verifyRegister = this.formBuilder.group({});
    this.userDetails = this.authService.initializeUserDetailModel();
  }

  onSetPassword(validPassword) {
    this.userModel.password = validPassword;
    this.userService.setPassword(this.userModel).subscribe((response: any) => {
      if (response.success) {
        this.messageService.add({severity:'success', summary:'Password has been set successfully'});
        this.userDetails.password = this.userModel.password;
        this.userDetails.email = this.userModel.email;
        this.userDetails.userType = UserTypeEnum.Sponsor;
        this.utilService.autoLogin(this.userDetails);
      }
    });
  }

  verifyEmail(email) {
    this.userModel.email = email;
    this.userModel.registration = true;
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
