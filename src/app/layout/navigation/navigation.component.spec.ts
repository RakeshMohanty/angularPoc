import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { NavigationComponent } from 'app/layout/navigation/navigation.component';
import { EntitlementDirective } from 'app/framework/entitlement/directives/entitlement.directive';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem } from 'app/layout/navigation/menu-item.interface';


describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let store: MockStore<{ menuItems: MenuItem[] }>;
  const initialState = [];


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationComponent, EntitlementDirective],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        NavigationComponent,
        provideMockStore({ initialState }),
      ],
    })
      .compileComponents();
    store = TestBed.get(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });


  describe('Dispatch and Retrieve', function () {
    it('should dispatch action LoadNavigationItems to store navigation Items', () => {
      const fakeNavItems = [{ "name": "Leads", "url": "/leads", "icon": "leads", "active": true }];
      const navItems = [{ "name": "Leads", "url": "/leads", "icon": "leads", "permissions": ['LEADS_VIEW'], "active": true }];
      spyOn(store, "dispatch").and.callThrough();
      store.setState({ menuItems: fakeNavItems });
      expect(component.navItems).toEqual(navItems);
    });
  });

  it("should call setNavIndex method to update the index", function () {
    component.selectedNavIndex = 0;
    const spyPermission = spyOn(component, "setNavIndex").and.callThrough();
    const result = component.setNavIndex(component.selectedNavIndex);
    expect(component.selectedNavIndex).toBe(0);
  });


  describe('Toggle Navigation', function () {
    it('should toggle from false to true', () => {
      component.hamExpand = false;
      component.toggleNav();
      expect(component.hamExpand).toBe(true);
    });

    it('should toggle from true to false', () => {
      component.hamExpand = true;
      component.toggleNav();
      expect(component.hamExpand).toBe(false);
    });
  });

  describe('getNavItemPermission from switch statement', function () {
    it("should call getNavItemPermission to get Leads View Permission from switch statement", function () {
      const spyPermission = spyOn(component, "getNavItemPermission").and.callThrough();
      const result = component.getNavItemPermission('leads');
      expect(result).toEqual(['LEADS_VIEW']);
      expect(spyPermission).toHaveBeenCalled();

    });

    it("should call getNavItemPermission to get Vendor View Permission from switch statement", function () {
      const spyPermission = spyOn(component, "getNavItemPermission").and.callThrough();
      const result = component.getNavItemPermission('vendor');
      expect(result).toEqual(['VENDOR_VIEW']);
      expect(spyPermission).toHaveBeenCalled();
    });

    it("should call getNavItemPermission to get Contacts View Permission from switch statement", function () {
      const spyPermission = spyOn(component, "getNavItemPermission").and.callThrough();
      const result = component.getNavItemPermission('contacts');
      expect(result).toEqual(['CONTACTS_VIEW']);
      expect(spyPermission).toHaveBeenCalled();
    });

    it("should call getNavItemPermission to get Contacts View Permission from switch statement", function () {
      const spyPermission = spyOn(component, "getNavItemPermission").and.callThrough();
      const result = component.getNavItemPermission('task');
      expect(result).toEqual(['TASKS_VIEW']);
      expect(spyPermission).toHaveBeenCalled();
    });

    it("should call getNavItemPermission to get Communication View Permission from switch statement", function () {
      const spyPermission = spyOn(component, "getNavItemPermission").and.callThrough();
      const result = component.getNavItemPermission('communication');
      expect(result).toEqual(['COMMUNICATION_VIEW']);
      expect(spyPermission).toHaveBeenCalled();

    });

    it("should call getNavItemPermission to get Education View Permission from switch statement", function () {
      const spyPermission = spyOn(component, "getNavItemPermission").and.callThrough();
      const result = component.getNavItemPermission('education');
      expect(result).toEqual(['EDUCATION_VIEW']);
      expect(spyPermission).toHaveBeenCalled();
    });

    it("should call getNavItemPermission to get Certfication View Permission from switch statement", function () {
      const spyPermission = spyOn(component, "getNavItemPermission").and.callThrough();
      const result = component.getNavItemPermission('certification');
      expect(result).toEqual(['CERTIFCATION_VIEW']);
      expect(spyPermission).toHaveBeenCalled();
    });

    it("should call getNavItemPermission to get Offer View Permission from switch statement", function () {
      const spyPermission = spyOn(component, "getNavItemPermission").and.callThrough();
      const result = component.getNavItemPermission('offers');
      expect(result).toEqual(['OFFERS_VIEW']);
      expect(spyPermission).toHaveBeenCalled();
    });

    it("should return default switch case when there is no permission passed to the function", function () {
      const result = component.getNavItemPermission('');
      expect(result).toEqual([]);
    });
  });
});


