import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fnDateAutoFormat]'
})
// tslint:disable-next-line:directive-class-suffix
export class DateAutoFormatDirective {
    elemRef: ElementRef;
    private specialKeys: Array<string> = [
        'Backspace',
        'Tab',
        'End',
        'Home',
        'ArrowLeft',
        'ArrowRight'
    ];
    periodAllowed = false;
    onlyNumber = true;

    constructor(private el: ElementRef) {
        this.elemRef = el;
    }

    @HostListener('keydown', ['$event'])
    onKeyDown(event) {
        const e = <KeyboardEvent>event;

        if (this.onlyNumber) {
            if (
                [46, 8, 9, 27, 13, 110].indexOf(e.keyCode) !== -1 ||
                // Allow: Ctrl+A
                (e.keyCode === 65 && e.ctrlKey === true) ||
                // Allow: Ctrl+C
                (e.keyCode === 67 && e.ctrlKey === true) ||
                // Allow: Ctrl+X
                (e.keyCode === 88 && e.ctrlKey === true) ||
                // Allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)
            ) {
                // const it happen, don't do anything
                return;
            }

            // Ensure that it is a number and stop the keypress
            if (
                (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
                (e.keyCode < 96 || e.keyCode > 105)
            ) {
                e.preventDefault();
            }
        }
    }

    @HostListener('keypress', ['$event'])
    onKeyPress(event) {
        const e = <any>event;
        // Allow Backspace, tab, end, and home keys
        if (this.specialKeys.indexOf(event.key) !== -1) {
            return;
        }
        // tslint:disable-next-line:radix
        const valInFloat: number = parseInt(e.key);
        const valLength = e.target.value.length;
        // tslint:disable-next-line:radix
        if (!(valInFloat >= 0 && valInFloat <= 9) || valLength === 10) {
            e.preventDefault();
        }
        if (valLength === 2 || valLength === 5) {
            e.target.value += '/';
        }
    }
}
