import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalContentComponent } from 'app/core/component/modal-content/modal-content.component';
import { LoadMaskComponent } from 'app/core/component/load-mask/load-mask.component';
import { EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

xdescribe('ModalContentComponent', () => {
    let component: ModalContentComponent;
    let fixture: ComponentFixture<ModalContentComponent>;
    let activeModal: NgbActiveModal;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ModalContentComponent, LoadMaskComponent],
            providers: [
                NgbActiveModal,
              ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalContentComponent);
        component = fixture.componentInstance;
        component.isLoading = false;
        component.data = {
            size: 'lg',
            title: 'Add',
            bodyContent: null,
            okTitle: 'Save',
            cancelTitle: 'Cancel'
        };
        component.onConfirm = new EventEmitter();
        component.onDialogClose = new EventEmitter();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should able to call ok function', () => {
        spyOn(component.onConfirm, 'emit');
        component.ok();
        expect(component.onConfirm.emit as jasmine.Spy).toHaveBeenCalled();
    });
    it('should able to call cancel function', () => {
        spyOn(component.onDialogClose, 'emit');
        component.cancel();
        expect(component.onDialogClose.emit as jasmine.Spy).toHaveBeenCalled();
    });
});
