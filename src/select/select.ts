import { Component, Input } from '@angular/core';
import { NgModel, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isObject, isNullOrUndefined, isArray } from 'util';

import { ValueAccessor } from '../utility';

@Component({
    selector: 'ngt-select',
    template: require('./select.html'),
    styles: [
        require('./select.scss')
    ],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: SelectComponent, multi: true }
    ]
})
export class SelectComponent<SelectValue, SelectOption> extends ValueAccessor<SelectValue | SelectValue[], SelectOption | SelectOption[]> {
    @Input() public disabled: boolean;
    @Input() public multiple: boolean;
    @Input() public placeholder: string;
    @Input() public options: SelectOption[] = [];
    @Input() public labelAttr: string;
    @Input() public valueAttr: string;

    /** @override */
    protected parse(option: SelectOption | SelectOption[]): SelectValue | SelectValue[] {
        if (this.multiple) {
            return (option as SelectOption[] || []).map((o: SelectOption) => this.getOptionValue(o));
        } else {
            if (isArray(option)) option = option[0];
            return this.getOptionValue(option);
        }
    }

    /** @override */
    protected format(value: SelectValue | SelectValue[]): SelectOption | SelectOption[] {
        if (isNullOrUndefined(value)) return value;
        return isArray(value)
            ? value.map((v: SelectValue) => this.findOptionByValue(v))
            : this.findOptionByValue(value as SelectValue);
    }

    private findOptionByValue(value: SelectValue): SelectOption {
        return this.options.find(o => this.getOptionValue(o) === value);
    }

    private getOptionAttr(option: SelectOption, attr: string) {
        if (isNullOrUndefined(option)) {
            return option;
        } else {
            return !isNullOrUndefined(attr)
                ? option[attr]
                : option;
        }
    }

    protected getOptionLabel(option: SelectOption) {
        return this.getOptionAttr(option, this.labelAttr);
    }

    protected getOptionValue(option: SelectOption): SelectValue {
        return this.getOptionAttr(option, this.valueAttr);
    }
}