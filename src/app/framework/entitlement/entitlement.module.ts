import { NgModule } from '@angular/core';

import { EntitlementDirective } from './directives/entitlement.directive';
import { AccessDeniedComponent } from './access-denied/access-denied.component';

@NgModule({
    declarations: [EntitlementDirective, AccessDeniedComponent],
    exports: [EntitlementDirective, AccessDeniedComponent]
})
export class EntitlementModule {}
