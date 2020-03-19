// Library Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {ToastModule} from 'primeng/toast';

// Application Components
import { RegisterAccountComponent } from 'app/user-management/register-account/register-account.component';
import { LoginComponent } from 'app/user-management/login/login.component';
import { SetPasswordComponent } from 'app/user-management/set-password/set-password.component';
import { ForgotPasswordComponent } from 'app/user-management/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from 'app/user-management/verify-email/verify-email.component';
import { VerifyCodeComponent } from 'app/user-management/verify-code/verify-code.component';

// Application Modules
import { UserManagementRoutingModule } from 'app/user-management/user-management.routes';
import { CoreModule } from 'app/core/core.module'
import { AuthService } from 'app/user-management/_services/auth.service';


@NgModule({
    imports: [
        CommonModule,
        UserManagementRoutingModule,
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ToastModule,
        CoreModule
    ],
    declarations: [RegisterAccountComponent, LoginComponent, SetPasswordComponent, ForgotPasswordComponent, VerifyEmailComponent, VerifyCodeComponent],

    providers: [AuthService]
})
export class UserManagementModule { }
