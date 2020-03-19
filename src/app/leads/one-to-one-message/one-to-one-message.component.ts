import { Component, OnInit, OnDestroy, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalContentSettings } from 'app/core/component/modal-content/model/modal-content-settings';
import * as messageAction from 'app/actions/one-to-one-message.action';
import { ICustomerMessageResponse } from 'app/leads/_models/customer.model';
import { LeadService } from 'app/leads/_services/lead.service'
import { AppState } from 'app/app.state';


@Component({
  selector: 'fn-one-to-one-message',
  templateUrl: './one-to-one-message.component.html',
  styleUrls: ['./one-to-one-message.component.scss']
})
export class OneToOneMessageComponent implements OnInit, AfterViewChecked, OnDestroy {

  @ViewChild('messageContent',{static: false}) private myScrollContainer: ElementRef;
  message: FormGroup;
  data: ModalContentSettings;
  messageSubscription: Subscription;
  viewMessage$: Observable<ICustomerMessageResponse[]>;
  messageList?: ICustomerMessageResponse[];
  isLoading: boolean;
  submitted = false;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private store: Store<AppState>, private service: LeadService) {
  }


  ngOnInit() {
    this.message = this.formBuilder.group({
      content: ['', [Validators.required, Validators.maxLength(160)]]
    });
    this.fetchViewMessageList();
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  // convenience getter for easy access to form fields
  get formField() { return this.message.controls; }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }

  refresh() {
    this.fetchViewMessageList();
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.message.invalid) {
      return;
    }
    const result = Object.assign({}, this.message.value);
    const messageDetail = { to: this.data.bodyContent.rowData.id, content: result.content };
    this.isLoading = true;
    this.service.sendMessages(messageDetail).subscribe((response: any) => {
      if (response.success) {
        this.isLoading = false;
        this.fetchViewMessageList();
      }
    });
    this.message.reset();
  }

  public fetchViewMessageList() {
    this.store.dispatch(messageAction.clearMessage());
    this.store.dispatch(messageAction.LoadMessage({ payload: this.data.bodyContent.rowData.id }));
    this.viewMessage$ = this.store.select(state => state.messages);
    this.messageSubscription = this.viewMessage$.subscribe((message) => {
      if (message && message.length)
        this.messageList = message;
    });
  }
}
