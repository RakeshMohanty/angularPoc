import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { LeadsRoutingModule } from './leads-routing.module';
import { LeadsComponent } from 'app/leads/leads.component';
import { CoreModule } from 'app/core/core.module';

import { VendorsComponent } from 'app/leads/vendors/vendors.component';
import { ProductOffersComponent } from 'app/leads/product-offers/product-offers.component';
import { ProductCategoryComponent } from 'app/leads/product-category/product-category.component';
import { ContentContainerDirective } from 'app/leads/_directives/content-container.directive';
import { ResizeService } from 'app/leads/shared/resize.service';
import { LeadService } from 'app/leads/_services/lead.service';
import { ProductOfferDetailsComponent } from 'app/leads/product-offer-details/product-offer-details.component';
import { CustomerEmailComponent } from 'app/leads/customer-email/customer-email.component';
import { BroadcastComponent } from 'app/leads/broadcast/broadcast.component';
import { AddVendorComponent } from 'app/leads/vendors/add-vendor/add-vendor.component';
import { ConfirmDialogComponent } from 'app/leads/confirm-dialog/confirm-dialog.component';
import { ModalContentService } from 'app/core/component/modal-content/service/modal-content.service';
import { OfferComponent } from 'app/leads/vendors/offer/offer.component';
import { AddOfferComponent } from 'app/leads/vendors/offer/add-offer/add-offer.component';
import { OneToOneMessageComponent } from './one-to-one-message/one-to-one-message.component';
import { DeleteOfferComponent } from 'app/leads/vendors/offer/delete-offer/delete-offer.component';

@NgModule({
  declarations: [LeadsComponent, VendorsComponent, ProductCategoryComponent, ContentContainerDirective, ProductOffersComponent,VendorsComponent, ProductOfferDetailsComponent,
    CustomerEmailComponent, BroadcastComponent, AddVendorComponent, ConfirmDialogComponent ,OneToOneMessageComponent, OfferComponent, AddOfferComponent,DeleteOfferComponent],

  
  imports: [
    CommonModule,
    TabViewModule,
    CoreModule,
    LeadsRoutingModule,
    CarouselModule,
    FormsModule,
    DropdownModule,
    ReactiveFormsModule,
    CalendarModule,
    InputSwitchModule,
    RadioButtonModule,
    ButtonModule,
    MultiSelectModule,
    InputTextareaModule
  ],
  providers: [ResizeService,LeadService, ModalContentService, DatePipe],
  exports: [
    LeadsComponent
  ],
  entryComponents: [ProductOffersComponent,ProductOfferDetailsComponent,CustomerEmailComponent,BroadcastComponent,ConfirmDialogComponent,OneToOneMessageComponent, AddOfferComponent, OfferComponent]

})
export class LeadsModule {


}
