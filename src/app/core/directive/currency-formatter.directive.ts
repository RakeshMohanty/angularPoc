import { CurrencyPipe } from '@angular/common';
import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({ selector: '[fnCurrencyFormatter]', providers: [CurrencyPipe] })
export class CurrencyFormatterDirective implements OnInit {
    private el: HTMLInputElement;
    private model: NgControl;
    private regexp = new RegExp(/^[0-9]*(\.[0-9]{0,2})?$/);
    private decimalSeparator: string;
    constructor(
        model: NgControl,
        private currencyPipe: CurrencyPipe,
        private elementRef: ElementRef
    ) {
        this.decimalSeparator = '.';
        this.el = this.elementRef.nativeElement;
        this.model = model;
    }

    ngOnInit() {
        if (this.el.value) {
            this.el.value = this.currencyPipe.transform(
                this.el.value,
                'USD',
                true
            );
        }
    }

    @HostListener('focus', ['$event.target.value'])
    onFocus(value) {
        this.el.value = this.parse(value);
        if (this.el.value === '0') {
            this.el.value = '';
        }
    }

    @HostListener('blur', ['$event.target.value'])
    onBlur(value) {
        if (!value || value === '.') {
            value = 0;
            this.model.control.setValue(0);
        }
        this.el.value = this.currencyPipe.transform(value, 'USD', true);
    }

    @HostListener('input', ['$event'])
    handleInput(event: any): void {
        this.restrictToCurrencyFormat(event.target.value, event);
    }

    @HostListener('paste', ['$event']) onPaste(event: any): void {
        let rawPastedText = '';
        if (window['clipboardData'] && window['clipboardData'].getData) {
            // Special case for the obsolete and non-standard IE browsers 10 and 11
            rawPastedText = window['clipboardData'].getData('Text');
        } else if (event.clipboardData && event.clipboardData.getData) {
            // Normal case with modern browsers
            rawPastedText = event.clipboardData.getData('text/plain');
        }
        // const pastingData = rawPastedText.replace(/-/g, '');
        if (!rawPastedText.match(this.regexp)) {
            event.preventDefault();
            return;
        }
        const splitValues: string[] = rawPastedText.split('.');
        if (splitValues[0].length > 5) {
            event.preventDefault();
            return;
        }
        if (splitValues.length > 1) {
            if (splitValues[1].length > 2) {
                event.preventDefault();
                return;
            }
        }
    }

    private parse(value: string, allowNegative = false) {
        let [integer, fraction = ''] = (value || '').split(
            this.decimalSeparator
        );
        integer = integer.replace(new RegExp(/[^\d\.]/, 'g'), '');
        fraction =
            parseInt(fraction, 10) > 0 && 2 > 0
                ? this.decimalSeparator + (fraction + '000000').substring(0, 2)
                : '';
        if (allowNegative && value.startsWith('(') && value.endsWith(')')) {
            return (-1 * parseFloat(integer + fraction)).toString();
        } else {
            return integer + fraction;
        }
    }

    private restrictToCurrencyFormat(enteredValue: string, event: any): void {
        if (!enteredValue.match(this.regexp)) {
            this.removeEnteredValue(enteredValue);
            return;
        }
        const splitValues: string[] = enteredValue.split('.');
        if (splitValues[0].length > 5) {
            this.removeEnteredValue(enteredValue);
            return;
        }
        if (splitValues.length > 1) {
            if (splitValues[1].length > 2) {
                this.removeEnteredValue(enteredValue);
                return;
            }
        }
    }

    private removeEnteredValue(originalValue: string): void {
        const outputValue =
            originalValue.substring(
                0,
                this.elementRef.nativeElement.selectionEnd - 1
            ) +
            originalValue.substring(
                this.elementRef.nativeElement.selectionEnd,
                originalValue.length
            );
        this.model.control.setValue(outputValue);
    }
}
