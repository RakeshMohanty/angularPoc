import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentSettings } from '../model/modal-content-settings';
@Injectable()
export class ModalContentService {

    constructor(private modalService: NgbModal) {
    }

    public openModalComponent(theComponent: any, modalSettings: ModalContentSettings): Promise<boolean> {
        const modalRef = this.modalService.open(theComponent, {
            size: modalSettings.size,
            backdrop: 'static',
            keyboard: false,
            centered: true,
            windowClass: modalSettings.windowClass
        });
        modalRef.componentInstance.data = modalSettings;
        return modalRef.result;
    }
} 