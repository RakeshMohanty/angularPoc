import { Directive, Input, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
    selector: '[fnValidateOnBlur]'
})
export class ValidateOnBlurDirective {
    @Input('validateFormControl') validateFormControl: FormControl;
    @Input('matchFormControl') matchFormControl: FormControl;

    constructor() {}

    @HostListener('focus', ['$event.target'])
    onFocus(target) {
        this.validateFormControl.markAsUntouched();
    }

    @HostListener('focusout', ['$event.target'])
    onFocusout(target) {
        this.validateFormControl.markAsTouched();
        if (this.matchFormControl) {
            this.matchFormControl.markAsTouched({ onlySelf: true });
            this.matchFormControl.updateValueAndValidity({ onlySelf: true });
        }
    }
}
