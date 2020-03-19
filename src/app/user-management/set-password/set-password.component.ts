import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { CustomValidation } from 'app/user-management/set-password/password-validator';


@Component({
  selector: 'fn-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {

  public passwordValidations: any[] = [];
  public isFieldFocused: boolean = false;

  @Input() setPassWordForm: FormGroup;
  @Output() setPasswordHandle: EventEmitter<any> = new EventEmitter();


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.setPassWordForm = this.setPasswordFormValidations();
    this.passwordValidations = [
      { validationName: 'invalidSmallCase', errorMessage: 'At least one lowercase letter (a-z)' },
      { validationName: 'invalidUpperCase', errorMessage: 'At least one uppercase letter (A-Z)' },
      { validationName: 'invalidNumber', errorMessage: 'At least one number (0-9)' },
      { validationName: 'minlength', errorMessage: 'Be a minimum of eight (8) characters in length' }];
  }

  onPasswordFocus() {
    this.isFieldFocused = true;
  }

  setPasswordFormValidations(): FormGroup {
    return this.formBuilder.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            // check whether the entered password is valid or not
            CustomValidation.passwordValidator
          ]
        ],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
      },
      {
        // check whether our password and confirm password match
        validator: Validators.compose([CustomValidation.passwordMatchValidator('password', 'confirmPassword')])
      }

    );
  }

  onPasswordSubmit() {
    this.setPasswordHandle.emit(this.setPassWordForm.controls.password.value);
  }
}
