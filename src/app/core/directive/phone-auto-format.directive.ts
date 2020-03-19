import { Directive, ElementRef, HostListener } from '@angular/core';
import { FnUtilsService } from 'app/shared/service/fn-utils.service';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fnPhoneAutoFormat]'
})
// tslint:disable-next-line:directive-class-suffix
export class PhoneAutoFormatDirective {
    elemRef: ElementRef;
    private isMac = false;

    constructor(
        private el: ElementRef,
        private fnUtilsService: FnUtilsService
    ) {
        this.elemRef = el;
        this.isMac = this.fnUtilsService.isMac();
    }
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

    @HostListener('keydown', ['$event']) onKeyDown(event) {
        if (!this.isAndroid()) {
            const e = <KeyboardEvent>event;

            if (this.onlyNumber) {
                if (
                    [46, 8, 9, 27, 13, 110].indexOf(e.keyCode) !== -1 ||
                    // Allow: Ctrl+A
                    (e.keyCode === 65 && e.ctrlKey === true) ||
                    // Allow: Ctrl+C
                    (e.keyCode === 67 && e.ctrlKey === true) ||
                    // Allow: Ctrl+V
                    (e.keyCode === 86 && e.ctrlKey === true) ||
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
                    if (e.ctrlKey && this.fnUtilsService.isFirefox()) {
                        return;
                    }
                    e.preventDefault();
                }
            }
        }
    }

    @HostListener('keypress', ['$event'])
    onKeyPress(event) {
        if (!this.isAndroid()) {
            const enteredValue = this.isMac
                ? String.fromCharCode(event.which)
                : event.key;
            const e = <any>event;
            // Allow Backspace, tab, end, and home keys
            if (this.specialKeys.indexOf(enteredValue) !== -1) {
                return;
            }
            // tslint:disable-next-line:radix
            const valInFloat: number = parseInt(enteredValue);
            const valLength = e.target.value.length;
            // tslint:disable-next-line:radix
            if (!(valInFloat >= 0 && valInFloat <= 9) || valLength > 14) {
                if (e.ctrlKey && this.fnUtilsService.isFirefox()) {
                    return;
                }
                e.preventDefault();
            }

            this.formatPhoneNumber(event);
        }
    }
    @HostListener('input', ['$event'])
    handleInput(event: any): void {
        if (this.isAndroid()) {
            const keyCode: number = this.getNewKeyCode(
                event.target.value.replace(event.data, ''),
                event.target.value
            );
            if (keyCode < 48 || keyCode > 57) {
                event.preventDefault();
            }
            this.formatPhoneNumber(event);
        }
    }

    isAndroid(): boolean {
        return /android/i.test(navigator.userAgent);
    }
    getEnteredDigits(phoneNumber): string[] {
        const digits: string = phoneNumber.replace(/\D/g, '');
        const enteredDigits: string[] = [];
        enteredDigits[0] = digits.substr(0, 3);
        enteredDigits[1] = digits.substr(3, 3);
        enteredDigits[2] = digits.substr(6, 4);
        return enteredDigits;
    }

    private getNewKeyCode(oldString: string, newString: string): number {
        if (oldString.length > newString.length) {
            return null;
        }
        for (let x = 0; x < newString.length; x++) {
            if (oldString.length === x || oldString[x] !== newString[x]) {
                return newString.charCodeAt(x);
            }
        }
        return null;
    }

    private formatPhoneNumber(e: any): void {
        const enteredDigits = this.getEnteredDigits(e.target.value);
        let expectedFormat = '(___) ___-____';
        enteredDigits.forEach(digits => {
            if (digits) {
                const replaceString = '_'.repeat(digits.length);
                expectedFormat = expectedFormat.replace(replaceString, digits);
            }
        });

        const caretPosition = expectedFormat.indexOf('_');

        expectedFormat = expectedFormat.replace('_', '');

        e.target.value = expectedFormat.match(/\d/g) ? expectedFormat : '';
        e.srcElement.setSelectionRange(caretPosition, caretPosition);
    }
}
