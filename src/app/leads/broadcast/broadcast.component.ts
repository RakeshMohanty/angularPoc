import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentSettings } from 'app/core/component/modal-content/model/modal-content-settings';
import { LeadService } from 'app/leads/_services/lead.service';
import { FnConstants } from 'app/shared/utils/constants'

@Component({
  selector: 'fn-broadcast',
  templateUrl: './broadcast.component.html',
  styleUrls: ['./broadcast.component.scss']
})
export class BroadcastComponent implements OnInit {
  data: ModalContentSettings;
  broadcast: FormGroup;
  submitted = false;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private service: LeadService) { }

  ngOnInit() {
    this.broadcast = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      webLink: ['', Validators.pattern(FnConstants.URL_REGEXP)],
    });
  }

  // convenience getter for easy access to form fields
  get formField() { return this.broadcast.controls; }

  submitBroadcast() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.broadcast.invalid) {
      return;
    }

    this.service.sendBroadcast(this.broadcast.value).subscribe((response: any) => {
      if (response.success) {
        this.activeModal.close();
      }
    });

  }

  cancelBroadcast() {
    this.activeModal.close();
  }

}
