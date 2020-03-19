import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/user-management/_services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'app/app.state';

@Component({
  selector: 'fn-post-login-header',
  templateUrl: './post-login-header.component.html',
  styleUrls: ['./post-login-header.component.scss']
})
export class PostLoginHeaderComponent implements OnInit {

  constructor(private authService: AuthService,private store: Store<AppState>) { }

  ngOnInit() {
  }

  public logout(): void {
    this.store.dispatch({ type: 'USER_LOGOUT' });
    this.authService.logout();
  }

}
