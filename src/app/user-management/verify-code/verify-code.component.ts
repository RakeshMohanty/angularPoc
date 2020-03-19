import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'fn-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss']
})
export class VerifyCodeComponent implements OnInit {
  @Input() verifyCode: FormGroup;
  @Output() verifyCodeService = new EventEmitter<string>();
  @Output() verifyResendService = new EventEmitter<boolean>();
  @Input() verifyCodeDetail: object;
  isRequired = false;
  submitted = false;
  resend = false;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.verifyCode = new FormGroup({
      code1: new FormControl(null),
      code2: new FormControl(""),
      code3: new FormControl(""),
      code4: new FormControl("")
    })
  }

  checkRequiredValidation() {
    if (this.submitted) {
      this.isRequired = true;
      Object.keys(this.verifyCode.controls).forEach(key => {
        if (this.verifyCode.controls[key].value) {
          this.isRequired = false;
        }
      });
      return this.isRequired;
    }
  }


  resendVerification() {
    this.resend = true;
    this.verifyResendService.emit(this.resend);
  }

  onSubmit() {
    this.submitted = true;
    if (this.checkRequiredValidation()) {
      return;
    }
    const code = this.verifyCode.value.code1 + this.verifyCode.value.code2 + this.verifyCode.value.code3 + this.verifyCode.value.code4;
    this.verifyCodeService.emit(code);
  }
}
