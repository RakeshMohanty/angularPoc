import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';

import { FileUploadComponent } from 'app/core/component/fileupload/fileupload.component';
import { FileUploadModel } from 'app/core/component/fileupload/fileupload.model';

describe('FileuploadComponent', () => {
  let fileComponent: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;
  let fileUploadModal: FileUploadModel;
  let messageService: MessageService;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [FileUploadModule, HttpClientTestingModule],
      declarations: [FileUploadComponent],
      providers: [MessageService]
    })
      .compileComponents();
    fixture = TestBed.createComponent(FileUploadComponent);

    // get test component from the fixture
    fileComponent = fixture.componentInstance;
    fileUploadModal = new FileUploadModel();
    fileComponent.fileUploader = fileUploadModal;
    fixture.detectChanges();
    spyOn(fileComponent, "clearFileUploader").and.callThrough();
    messageService = TestBed.get(MessageService);
  }));

  it('should create', () => {
    expect(fileComponent).toBeTruthy();
    expect(messageService).toBeTruthy();
  }
  );

  describe('File Upload  ', () => {

    it('fileupload reference should be same', () => {
      expect(fileComponent.fileUploader).toEqual(fileUploadModal);
    });
  });

  describe('Clear file upload ', () => {

    it('Uploaded files should be empty intially', () => {
      let expectedArray = [];
      expect(fileComponent.uploadedFiles).toEqual(expectedArray);
    });

    it('Upload files array should be empty when clearFileUploader() is called', () => {
      const fileObject = { "files": [{ "objectURL": { "changingThisBreaksApplicationSecurity": "blob:url" } }] };
      fileComponent.uploadedFiles.push(fileObject);
      fileComponent.clearFileUploader();
      expect(fileComponent.clearFileUploader).toHaveBeenCalled();
      expect(fileComponent.uploadedFiles).toEqual([]);
    });

    it('Should call clear() method', () => {
      fileComponent.clearFileUploader();
      expect(fileComponent.clearFileUploader).toHaveBeenCalled();
      expect(fileComponent.clearFileUploader).toHaveBeenCalledTimes(1);
    });
  });

  describe('File upload error ', () => {

    it('Should call the onfileuploaderror method and add the error message', async(() => {
      const spyMessage = spyOn(messageService, "add").and.callThrough();
      const spy = spyOn(fileComponent, "onFileUploadError").and.callThrough();
      const errorMessage = "File type is not same as expected type";
      fileComponent.fileUploader.errorMesssage = errorMessage;
      fileComponent.onFileUploadError(errorMessage);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
      fileComponent['messageService'].add({ severity: 'error', summary: 'Error Message', detail: errorMessage });
    }));

  });

  describe('On file Upload ', () => {

    it('Should be defined ', () => {
      expect(fileComponent.onFileSelect).toBeDefined();
      expect(fileComponent.onFileSelect).toBeTruthy();
    });

    it('Should emit uploadHandler event when onFileUpload() is called ', () => {
      const fileObject = { "files": [{ "objectURL": { "changingThisBreaksApplicationSecurity": "blob:url" } }] };
      const spy = spyOn(fileComponent, 'onFileSelect')
        .withArgs(fileObject).and.callThrough();
      fileComponent.onFileSelect(fileObject);
      spyOn(fileComponent.uploadHandler, 'emit');
      fixture.detectChanges();
      fileComponent.uploadHandler.subscribe(next => {
        expect(next).toEqual([fileObject]);
      });
      expect(spy).toHaveBeenCalled();
    });

    it('Uploaded files array should contain the pushed data', () => {
      const fileObject = { "files": [{ "objectURL": { "changingThisBreaksApplicationSecurity": "blob:url" } }] };
      fileComponent.uploadedFiles.push(fileObject);
      expect(fileComponent.uploadedFiles).toEqual([fileObject]);
    });
  })
});


