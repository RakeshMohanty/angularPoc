// Library Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Application Components
import { PreLoginComponent } from 'app/layout/preLogin/preLogin.component';
import { PostLoginComponent } from 'app/layout/post-login/post-login.component';
import { PostLoginHeaderComponent } from 'app/layout/navigation/post-login-header/post-login-header.component';
import { PostLoginFooterComponent } from 'app/layout/navigation/post-login-footer/post-login-footer.component';
import { NavigationComponent } from 'app/layout/navigation/navigation.component';

import { MessageService } from 'primeng/api';
import { EntitlementModule } from 'app/framework/entitlement/entitlement.module';
import { LeadsModule } from 'app/leads/leads.module';




@NgModule({
  declarations: [
    PreLoginComponent,
    PostLoginComponent,
    NavigationComponent,
    PostLoginHeaderComponent,
    PostLoginFooterComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    NgbModule,
    EntitlementModule,
    LeadsModule

  ],
  providers: [
    MessageService
  ]
})
export class LayoutModule { }
