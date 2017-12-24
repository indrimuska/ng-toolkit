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
export class SelectComponent extends ValueAccessor<any | any[]> {
    @Input() public value: any | any[];
    @Input() public disabled: boolean;
    @Input() public multiple: boolean;
    @Input() public placeholder: string;
    @Input() public options: any[] = [];
    @Input() public labelAttr: string;
    @Input() public valueAttr: string;
    
    /** @override */
    protected parse(option: any | any[]): any {
        if (this.multiple) {
            return (option || []).map((o: any) => this.getOptionAttr(o, this.valueAttr));
        } else {
            if (isArray(option)) option = option[0];
            return this.getOptionAttr(option, this.valueAttr);
        }
    }

    /** @override */
    protected format(value: any): any {
        if (isNullOrUndefined(value)) return value;
        return isArray(value)
            ? value.map((v: any) => this.findOptionByValue(v))
            : this.findOptionByValue(value);
    }

    private findOptionByValue(value: any) {
        return this.options.find(o => this.getOptionAttr(o, this.valueAttr) === value);
    }
    
    protected getOptionAttr(option: any, attr: string) {
        return isObject(option)
            ? attr && option[attr]
            : option;
    }
}