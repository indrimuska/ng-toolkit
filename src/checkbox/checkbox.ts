import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { ValueAccessor } from '../utility';

@Component({
    selector: 'ngt-checkbox',
    template: require('./checkbox.html'),
    styles: [
        require('./checkbox.scss')
    ],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: CheckboxComponent, multi: true }
    ]
})
export class CheckboxComponent extends ValueAccessor<any, boolean> {
    @Input() public disabled: boolean;
    @Input() public label: string;
    @Input() public trueValue: any = true;
    @Input() public falseValue: any = false;

    /** @override */
    public parse(value: boolean): any {
        return value
            ? this.trueValue
            : this.falseValue;
    }

    /** @override */
    public format(value: any): boolean {
        return value === this.trueValue;
    }
}