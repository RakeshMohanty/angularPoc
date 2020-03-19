import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as userActions from 'app/actions/user-detail.action';
import { AuthService } from 'app/user-management/_services/auth.service';
import { AppState } from 'app/app.state';
import { IUserDetails } from 'app/user-management/_models/user.model';



@Injectable({
    providedIn: 'root'
})

export class UtilService {

    constructor(private authService: AuthService, private store: Store<AppState>) { }

    autoLogin(userDetails: IUserDetails) {
        this.authService.removeLocalStorage();
        this.authService.login(userDetails)
            .pipe().subscribe((data: any) => {
                if (data.success) {
                    if (data.results.accessToken) {
                        this.authService.saveToken(data.results);
                        this.store.dispatch(userActions.LoadUserDetail());
                    }
                } 
            });
    }

}