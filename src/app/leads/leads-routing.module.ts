import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostLoginComponent } from 'app/layout/post-login/post-login.component';
import { LeadsComponent } from 'app/leads/leads.component';
import { AuthGuard } from 'app/guards/auth-guard';
import { VendorsComponent } from './vendors/vendors.component';


const routes: Routes = [
  {
    path: '',
    component: PostLoginComponent,
    children: [
        { path: 'leads', component: LeadsComponent,canActivate:[AuthGuard] },
        { path: 'vendor', component: VendorsComponent,canActivate:[AuthGuard]}
    ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadsRoutingModule { }
