import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { isUndefined, isNullOrUndefined } from 'util';

import { InputComponent } from '../input/input';
import { ValueAccessor } from '../utility';

@Component({
    selector: 'ngt-number',
    template: require('./number.html'),
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: NumberComponent, multi: true }
    ]
})
export class NumberComponent extends ValueAccessor<number, string> {
    @Input() public disabled: boolean;
    @Input() public placeholder: string;
    @Input() public decimals: number;

    private _decimalSeparator: string = ',';
    @Input() public get decimalSeparator() {
        return this._decimalSeparator;
    }
    public set decimalSeparator(separator: string) {
        if (this.validateSeparators(separator, this._thousandSeparator)) {
            this._decimalSeparator = separator;
        }
    }

    private _thousandSeparator: string = '.';
    @Input() public get thousandSeparator() {
        return this._thousandSeparator;
    }
    public set thousandSeparator(separator: string) {
        if (this.validateSeparators(this._decimalSeparator, separator)) {
            this._thousandSeparator = separator;
        }
    }

    private validateSeparators(decimal: string, thousand: string) {
        if (decimal === thousand) {
            console.error(`Decimal and thousand separators cannot be the same symbol: provided "${decimal}"`);
            return false;
        }
        return true;
    }

    private replaceAll(text: string, key: string, replace: string): string {
        return text.split(key).join(replace);
    };

    /** @override */
    protected parse(value: string): number {
        value = this.replaceAll(value || '', this.thousandSeparator, '').replace(this.decimalSeparator, '.');
        const number = parseFloat(value);
        if (isNaN(number)) {
            return null;
        }
        if (isUndefined(this.decimals)) {
            return number;
        } else {
            const multiplier = Math.pow(10, this.decimals);
            return Math.round(number * multiplier) / multiplier;
        }
    }

    /** @override */
    protected format(value: number): string {
        if (isNullOrUndefined(value)) {
            return '';
        } else {
            value = value || 0;
        }
        const stringValue = this.decimals >= 0
            ? value.toFixed(this.decimals)
            : value.toString();
        const parts = stringValue.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, this.thousandSeparator);
        return parts.join(this.decimalSeparator);
    }

    @ViewChild('inputRef') private inputRef: InputComponent<string>;

    private onKeypress(e: KeyboardEvent) {
        const char = String.fromCharCode(e.charCode);

        switch (char) {
            case this.decimalSeparator:
                if (this.viewValue.indexOf(this.decimalSeparator) >= 0) {
                    e.preventDefault();
                }
                break;
            case '+':
            case '-':
                const element = this.inputRef.elementRef.nativeElement;
                if (element.selectionStart !== 0 || this.viewValue.search(/^\+|^\-/) === 0) {
                    e.preventDefault();
                }
                break;
            default:
                const invalidChar = new RegExp(`[^0-9\\${this.thousandSeparator}]`);
                if (invalidChar.test(char)) {
                    e.preventDefault();
                }
                break;
        }
    }

    private onBlur() {
        this.writeValue(this.value);
    }
}