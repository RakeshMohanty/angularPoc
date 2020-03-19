import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'fn-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  @Input() verifyEmail: FormGroup;
  @Input() title: string;
  @Output() verifyEmailService = new EventEmitter<string>();
  submitted = false;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.verifyEmail = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  // convenience getter for easy access to form fields
  get formField() { return this.verifyEmail.controls; }

  onSubmit() {
   this.submitted = true;

    // stop here if form is invalid
    if (this.verifyEmail.invalid) {
      return;
    }

    this.verifyEmailService.emit(this.verifyEmail.value.email);
  }
}
