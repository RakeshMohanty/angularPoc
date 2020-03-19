import { Pipe, PipeTransform, Output } from '@angular/core';

@Pipe({
    name: 'phone'
})
export class PhoneNumberFormatPipe implements PipeTransform {
    transform(value: number): string {
        const outputValue: string = value.toString();
        if (
            !(outputValue.indexOf('(') >= 0) ||
            !(outputValue.indexOf('-') > 0)
        ) {
            const charArray = outputValue.split('');
            if (charArray.length === 10) {
                const updatedPhoneNumber = this.transformNumber(outputValue);
                return updatedPhoneNumber;
            }
            return outputValue;
        }
    }

    transformNumber(charArray) {
        if (!charArray || !charArray.match(/\d/g)) {
            return '';
        }
        const city = charArray.slice(0, 3);
        const number = charArray.slice(3);
        return (
            '(' +
            city +
            ')' +
            ' ' +
            number.slice(0, 3) +
            '-' +
            number.slice(3)
        )
            .trim()
            .replace(/,/g, '');
    }
}
