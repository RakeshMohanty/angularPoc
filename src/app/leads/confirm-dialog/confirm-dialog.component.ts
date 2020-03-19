import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalContentSettings } from 'app/core/component/modal-content/model/modal-content-settings';


@Component({
  selector: 'fn-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  data: ModalContentSettings;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
  }

  cancelConfirmDialog() {
    this.activeModal.close();
  }

  onConfirm() {
    if(this.data.bodyContent.handler) {
    this.data.bodyContent.handler.emit(false);
    }
    this.activeModal.close();
  }

}
