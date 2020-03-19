import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostLoginComponent } from 'app/layout/post-login/post-login.component';
import { AuthGuard } from 'app/guards/auth-guard';

const routes: Routes = [

    { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
