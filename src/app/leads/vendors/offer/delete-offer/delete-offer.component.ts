import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';

import { LeadService } from 'app/leads/_services/lead.service';
import { ModalContentSettings } from 'app/core/component/modal-content/model/modal-content-settings';
import { FnConstants } from 'app/shared/utils/constants';
import { VendorOfferService } from 'app/leads/vendors/offer/vendor-offer.service';


@Component({
  selector: 'fn-delete-offer',
  templateUrl: './delete-offer.component.html',
  styleUrls: ['./delete-offer.component.scss']
})
export class DeleteOfferComponent implements OnInit {
  data: ModalContentSettings;
  title: string;

  constructor(public activeModal: NgbActiveModal, private offerservice: VendorOfferService, private messageService: MessageService) { }

  ngOnInit() {
    
  }

  cancelOfferDeletion() {
    this.activeModal.close();
  }

  deleteOffer(actionData) {
    this.offerservice.deleteOfferDetail(actionData.rowData.id).subscribe((response: any) => {
      if (response.success) {
        this.activeModal.close();
      }
    });
  }
}