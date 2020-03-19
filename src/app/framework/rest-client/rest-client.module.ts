import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { RestClientService } from './rest-client.service';

@NgModule({
    imports: [CommonModule, HttpClientModule],
    providers: [RestClientService],
    declarations: []
})
export class RestClientModule {}
