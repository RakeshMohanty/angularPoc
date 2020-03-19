import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { DataGridComponent } from './component/datagrid/datagrid.component';
import { LoadMaskComponent } from './component/load-mask/load-mask.component';
import { FileUploadComponent } from './component/fileupload/fileupload.component';
import { FilterPipe } from './pipe/filter/filter.pipe';
import { FormatDollarPipe } from './pipe/format-dollar.pipe';
import { PhoneNumberFormatPipe } from './pipe/phone-number-format.pipe';
import { AllowOnlyNumbersDirective } from './directive/allowOnly.directive';
import { CurrencyFormatterDirective } from './directive/currency-formatter.directive';
import { DateAutoFormatDirective } from './directive/date-auto-format.directive';
import { DisablePasteDirective } from './directive/disablePaste.directive';
import { PhoneAutoFormatDirective } from './directive/phone-auto-format.directive';
import { ValidateOnBlurDirective } from './directive/validate-blur.directive';
import { ModalContentComponent } from './component/modal-content/modal-content.component';
import { PasteDigitOnlyDirective } from './directive/paste-digit-only.directive';
import { CarouselDirective } from './directive/carousel.directive';
import {InputSwitchModule} from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
@NgModule({
    declarations: [
        DataGridComponent,
        LoadMaskComponent,
        FileUploadComponent,
        FilterPipe,
        FormatDollarPipe,
        PhoneNumberFormatPipe,
        AllowOnlyNumbersDirective,
        CurrencyFormatterDirective,
        DateAutoFormatDirective,
        DisablePasteDirective,
        PhoneAutoFormatDirective,
        ValidateOnBlurDirective,
        ModalContentComponent,
        CarouselDirective,
        PasteDigitOnlyDirective,
    ],
    imports: [BrowserModule, BrowserAnimationsModule, TableModule, FileUploadModule,InputSwitchModule,FormsModule],
    exports: [
        DataGridComponent,
        LoadMaskComponent,
        FileUploadComponent,
        FilterPipe,
        FormatDollarPipe,
        PhoneNumberFormatPipe,
        AllowOnlyNumbersDirective,
        CurrencyFormatterDirective,
        CarouselDirective,
        DateAutoFormatDirective,
        DisablePasteDirective,
        PhoneAutoFormatDirective,
        ValidateOnBlurDirective,
        ModalContentComponent,
        PasteDigitOnlyDirective
    ],
    providers: [PhoneNumberFormatPipe],
    bootstrap: [],
    entryComponents: [DataGridComponent]
})
export class CoreModule { }
