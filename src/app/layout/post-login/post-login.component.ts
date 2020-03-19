import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'app/app.state';
import { AuthService } from 'app/user-management/_services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { IUser } from 'app/user-management/_models/user.model';

@Component({
  selector: 'fn-post-login',
  templateUrl: './post-login.component.html',
  styleUrls: ['./post-login.component.scss']
})
export class PostLoginComponent implements OnInit,OnDestroy {
  user$:Observable<IUser>;
  userSubscription:Subscription;


  constructor(private store: Store<AppState>,private authService: AuthService) {
    this.user$ = this.store.pipe(select('user'))
  }

  ngOnInit() {
     this.userSubscription=this.user$.subscribe((user)=>{
        console.log('user')
      
     })
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
