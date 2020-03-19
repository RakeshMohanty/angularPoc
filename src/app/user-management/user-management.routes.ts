// Library Modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Application Components
import { PreLoginComponent } from 'app/layout/preLogin/preLogin.component';
import { LoginComponent } from 'app/user-management/login/login.component';
import { RegisterAccountComponent } from 'app/user-management/register-account/register-account.component';
import { ForgotPasswordComponent } from 'app/user-management/forgot-password/forgot-password.component';

const routes: Routes = [

    {
        path: '',
        component: PreLoginComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterAccountComponent },
            { path: 'forgot-password', component: ForgotPasswordComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class UserManagementRoutingModule { }
