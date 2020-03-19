export class FileUploadModel {
    fileLimit: number;
    previewWidth: number;
    chooseLabel: string;
    customUpload: boolean;
    multiple: boolean;
    accept: string;
    maxFileSize: number;
    showUploadButton: boolean;
    showCancelButton?: boolean;
    errorMesssage?: string;
    disabled?: boolean;
    url: string;
    styleClass: string;
}