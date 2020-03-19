// Library Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RestClientModule } from 'app/framework/rest-client/rest-client.module';
// Application Components
import { AppComponent } from 'app/app.component';

// Application Modules
import { AppRoutingModule } from 'app/app-routing.module';
import { CoreModule } from 'app/core/core.module';
import { LayoutModule } from 'app/layout/layout.module';
import { UserManagementModule } from 'app/user-management/user-management.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { XhrInterceptor } from 'app/interceptors/xhr-interceptor';
import { CsrfInterceptor } from 'app/interceptors/csrf-interceptor';
import { ResponseInterceptor } from 'app/interceptors/response-interceptor';
import { JwtInterceptor } from 'app/interceptors/jwt-interceptor';
import { DevRequestInterceptor } from 'app/interceptors/dev-request-interceptor';
import { environment } from 'environments/environment';
import { ErrorHandlerModule } from 'app/framework/error-handler';
import { ToastModule } from 'primeng/toast';
import { AuthGuard } from 'app/guards/auth-guard';
import { UserDetailEffects } from 'app/effects/user-detail.effects';
import { NavigationItemEffects } from 'app/effects/navigation-items.effects';
import { ProductEffects } from 'app/effects/product-category.effects';
import { ProductOffersEffects } from 'app/effects/product-offers.effects';
import { AppReducer } from 'app/app.reducer';
import { LeadsModule } from 'app/leads/leads.module';
import { CustomerDetailEffects } from 'app/effects/customer-detail.effects';
import { VendorCategoryEffects } from 'app/effects/vendor-category.effects';
import { VendorEffects } from 'app/effects/vendor.effects';
import { VendorOfferEffects } from 'app/effects/vendor-offer.effects';
import { OneToOneMessageEffects } from 'app/effects/one-to-one-message.effects';

const INTERCEPTORS: {}[] = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: XhrInterceptor,
        multi: true
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: CsrfInterceptor,
        multi: true
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ResponseInterceptor,
        multi: true
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
    }
];

const DEV_INTERCEPTORS = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: DevRequestInterceptor,
        multi: true
    }
];
@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppReducer,
        EffectsModule.forRoot([
            UserDetailEffects,
            NavigationItemEffects,
            ProductEffects,
            ProductOffersEffects,
            CustomerDetailEffects,
            VendorCategoryEffects,
            VendorEffects,
            VendorOfferEffects,
            OneToOneMessageEffects
        ]),
        AppRoutingModule,
        UserManagementModule,
        LayoutModule,
        LeadsModule,
        CoreModule,
        NgbModule,
        RestClientModule,
        ErrorHandlerModule,
        ToastModule
    ],
    exports: [],
    providers: [
        AuthGuard,
        INTERCEPTORS,
        environment.production ? [] : DEV_INTERCEPTORS
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
