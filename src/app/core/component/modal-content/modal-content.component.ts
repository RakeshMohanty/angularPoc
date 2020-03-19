import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalContentSettings } from './model/modal-content-settings';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'fn-modal-content',
  templateUrl: 'modal-content.component.html',
  styleUrls: ['modal-content.component.scss']
})
export class ModalContentComponent {
  constructor(public activeModal: NgbActiveModal) {
  }
  @Input() data: ModalContentSettings;
  @Input() footer = false;
  @Input() isLoading = false;
  @Output() onDialogClose = new EventEmitter();
  @Output() onConfirm = new EventEmitter();
  public ok(): void {
    this.onConfirm.emit();
  }

  public cancel(): void {
    this.onDialogClose.emit();
  }

}
