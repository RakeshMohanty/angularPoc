import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';

import { FileUploadModel } from 'app/core/component/fileupload/fileupload.model';

@Component({
  selector: 'fn-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss'],
  providers: [MessageService]
})
export class FileUploadComponent implements OnInit,  OnDestroy {
  public uploadedFiles: any[] = [];

  @Input() fileUploader: FileUploadModel;
  @Output() uploadHandler: EventEmitter<any> = new EventEmitter();

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
  }

  onFileSelect(event): void {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.uploadHandler.emit(this.uploadedFiles);
  }

  onFileUploadError(errorMessage: string): void {
    this.messageService.add({ severity: 'error', summary: 'Error Message', detail: errorMessage });
  }

  clearFileUploader() {
    this.uploadedFiles = [];
  }

  ngOnDestroy(){
  }

}
