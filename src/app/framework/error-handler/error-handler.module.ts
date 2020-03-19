import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ErrorHandlerService } from './error-handler.service';

@NgModule({
    imports: [CommonModule],
    providers: [ErrorHandlerService],
    declarations: []
})
export class ErrorHandlerModule {}
