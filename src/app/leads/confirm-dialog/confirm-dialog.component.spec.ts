import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';


import { ConfirmDialogComponent } from 'app/leads/confirm-dialog/confirm-dialog.component';
import { ModalContentComponent } from 'app/core/component/modal-content/modal-content.component';
import { LoadMaskComponent } from 'app/core/component/load-mask/load-mask.component';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDialogComponent, ModalContentComponent, LoadMaskComponent ],
      providers: [
        NgbActiveModal,
      ]
      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    component.data = {
        size: 'lg',
        title: 'Add',
        bodyContent: null,
        okTitle: 'Save',
        cancelTitle: 'Cancel'
    };
    fixture.detectChanges();
});

  

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
