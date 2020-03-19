import {
  Directive,
  Input,
  OnChanges,
  Renderer2,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IUser } from 'app/user-management/_models/user.model';
import { Store, select } from '@ngrx/store';
import { AppState } from 'app/app.state';

@Directive({
  selector: '[fnEntitlement]'
})
export class EntitlementDirective implements OnChanges {
  user$: Observable<IUser>;
  userSubscription: Subscription;
  @Input() set fnEntitlement(permissions: string[]) {
    this.permissions = permissions;
  }
  @Input() set fnEntitlementMode(mode: 'visibility' | 'accessibility') {
    this.mode = mode;
  }
  private permissions?: string[];
  entitlementUtil;
  private mode: 'visibility' | 'accessibility' = 'accessibility';

  constructor(
    private renderer: Renderer2,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private store: Store<AppState>
  ) {
    this.user$ = this.store.pipe(select('user'))
  }

  ngOnChanges() {
    this.viewContainer.clear();
    if (this.hasPermission(this.permissions)) {
      this.addElementToView();
    } else if (this.mode === 'accessibility') {
      const rootEl = this.addElementToView();
      this.renderer.setAttribute(rootEl, 'disabled', 'true');
      this.renderer.addClass(rootEl, 'permission-disabled');
      rootEl.style.pointerEvents = 'none';
      rootEl.style.cursor = 'not-allowed';
      if (rootEl.href) {
        this.renderer.setAttribute(
          rootEl,
          'href',
          'javascript:void(0)'
        );
      }
      rootEl.onclick = (event: MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();
        return false;
      };
    }
  }

  private addElementToView() {
    const view = this.viewContainer.createEmbeddedView(this.templateRef);
    return view.rootNodes[0];
  }

  private hasPermission(entitlements: string[]): boolean {
    this.userSubscription = this.user$.subscribe((user) => {
      const result = user;
      this.entitlementUtil = result;
    })
    if (this.entitlementUtil) {
      if (!this.entitlementUtil.permissions) {
        return false;
      }
    for (const entitlement of entitlements) {
      if (this.entitlementUtil.permissions.some(permission => permission.name === entitlement)) {
        return true;
      }
    }
  }
    return false;
  }
}
