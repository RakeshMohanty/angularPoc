import { Directive, HostListener, Input, ElementRef } from '@angular/core';

@Directive({
    selector: '[fnDisablePaste]'
})
export class DisablePasteDirective {
    constructor() {}

    @HostListener('paste', ['$event']) onPaste(event: any): void {
        event.preventDefault();
    }
}
