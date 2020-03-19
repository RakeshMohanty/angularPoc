import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { FnUtilsService } from 'app/shared/service/fn-utils.service';

@Directive({
    selector: '[fnAllowOnlyNumbers]'
})
export class AllowOnlyNumbersDirective {
    @Input('isPasteAllowed') isPasteAllowed = false;
    private regex: RegExp = new RegExp(/^[0-9]*$/g);
    private isAndroid = false;
    private isMac = false;
    constructor(
        private elementRef: ElementRef,
        private control: NgControl,
        private fnUtilsService: FnUtilsService
    ) {
        this.isAndroid = this.fnUtilsService.isAndroid();
        this.isMac = this.fnUtilsService.isMac();
    }

    @HostListener('paste', ['$event']) onPaste(event: any): void {
        if (!this.isPasteAllowed) {
            event.preventDefault();
            return;
        }
        let rawPastedText = '';
        if (window['clipboardData'] && window['clipboardData'].getData) {
            // Special case for the obsolete and non-standard IE browsers 10 and 11
            rawPastedText = window['clipboardData'].getData('Text');
        } else if (event.clipboardData && event.clipboardData.getData) {
            // Normal case with modern browsers
            rawPastedText = event.clipboardData.getData('text/plain');
        }
        const pastingData = rawPastedText.replace(/-/g, '');
        if (!pastingData.match(this.regex)) {
            event.preventDefault();
        }
    }

    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        if (!this.isAndroid && !this.isMac) {
            this.allowOnlyNumbers(event);
        }
    }

    @HostListener('input', ['$event'])
    handleInput(event: any): void {
        if (this.isAndroid || this.isMac) {
            const keyCode: number = this.getNewKeyCode(
                event.target.value.replace(event.data, ''),
                event.target.value
            );
            if (
                keyCode < 48 ||
                (keyCode > 57 &&
                    !(keyCode === 8 || keyCode === 0 || keyCode === 46))
            ) {
                this.elementRef.nativeElement.value = this.elementRef.nativeElement.value.replace(
                    event.data,
                    ''
                );
                this.control.control.setValue(
                    this.elementRef.nativeElement.value
                );
            }
            if (
                !String(this.elementRef.nativeElement.value).match(this.regex)
            ) {
                this.elementRef.nativeElement.value = this.elementRef.nativeElement.value.substring(
                    0,
                    this.elementRef.nativeElement.value.length - 1
                );
                this.control.control.setValue(
                    this.elementRef.nativeElement.value
                );
            }
            event.preventDefault();
            event.stopPropagation();
        }
    }

    private allowOnlyNumbers(event: KeyboardEvent): void {
        const e = <KeyboardEvent>event;
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
            e.preventDefault();
        }
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
}
