import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { MenuItem } from 'app/layout/navigation/menu-item.interface';
import * as navigationAction from 'app/actions/navigation-items.action';
import { AppState } from 'app/app.state';

@Component({
  selector: 'fn-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  menuItems$: Observable<MenuItem[]>;
  menuSubscription: Subscription;
  navItems: MenuItem[];
  hamExpand: boolean;
  selectedNavIndex: number = 0;


  constructor(private store: Store<AppState>) {
    this.store.dispatch(navigationAction.LoadNavigationItems());
    this.menuItems$ = this.store.select(state => state.menuItems);
    this.hamExpand = false;
  }

  ngOnInit() {
    this.menuSubscription = this.menuItems$.subscribe((menuItems) => {
      if (menuItems && menuItems.length) {
        this.navItems = menuItems.map(menuItem =>
          Object.assign({}, menuItem, { permissions: this.getNavItemPermission(menuItem.url) }));
      }
    });
  }


  ngOnDestroy() {
    this.menuSubscription.unsubscribe();
  }

  setNavIndex(index: number) {
    this.selectedNavIndex = index;
  }

  toggleNav() {
    this.hamExpand = !this.hamExpand;
  }

  public getNavItemPermission(route: string): string[] {
    route = route.replace('/', '');
		/**
		 * returning LOGIN_CREATE for some routes. Permissions for these will be updated later or in later sprints.
		 * LOGIN_CREATE is return in permissoins for all users.
		 */
    switch (route) {
      case 'leads': return ['LEADS_VIEW'];
      case 'vendor': return ['VENDOR_VIEW'];
      case 'contacts': return ['CONTACTS_VIEW'];
      case 'task': return ['TASKS_VIEW'];
      case 'communication': return ['COMMUNICATION_VIEW'];
      case 'education': return ['EDUCATION_VIEW'];
      case 'certification': return ['CERTIFCATION_VIEW'];
      case 'offers': return ['OFFERS_VIEW'];
      default: return [];
    }

  }

}
