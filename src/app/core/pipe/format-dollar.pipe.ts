import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { isNumber } from 'util';

@Pipe({ name: 'formatDollar' })
export class FormatDollarPipe implements PipeTransform {
    constructor(private cp: CurrencyPipe) {}

    transform(value: number): string {
        if (!isNumber(value)) {
            return  String(value);
        }
        if (value >= 0) {
            return this.cp.transform(value, 'USD', true);
        }
        return `(${this.cp.transform(Math.abs(value), 'USD', true)})`;
    }
}
