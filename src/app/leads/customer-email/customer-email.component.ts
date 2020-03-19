import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';

import { LeadService } from 'app/leads/_services/lead.service';
import { ModalContentSettings } from 'app/core/component/modal-content/model/modal-content-settings';
import { FnConstants } from 'app/shared/utils/constants';


@Component({
  selector: 'fn-customer-email',
  templateUrl: './customer-email.component.html',
  styleUrls: ['./customer-email.component.scss']
})
export class CustomerEmailComponent implements OnInit {
  data: ModalContentSettings;
  emailTitle: string;

  constructor(public activeModal: NgbActiveModal, private service: LeadService, private messageService: MessageService) { }

  ngOnInit() {
    if (this.data.bodyContent.rowData.status == FnConstants.CREATED) {
      this.emailTitle = "an invitation";
    }
    else {
      this.emailTitle = "a reminder";
    }
  }

  cancelEmail() {
    this.activeModal.close();
  }

  sendEmail(actionData) {
    this.service.sendEmail(actionData.rowData.id, actionData.rowData.status).subscribe((response: any) => {
      if (response.success) {
        this.activeModal.close();
      }
    });
  }
}
