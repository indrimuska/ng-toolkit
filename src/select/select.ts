import { Component, Input } from '@angular/core';
import { NgModel, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isObject, isNullOrUndefined, isArray } from 'util';

import { ValueAccessor } from '../utility';

@Component({
    selector: 'ngt-select',
    template: `
        <select
            [(ngModel)]="viewValue"
            [disabled]="disabled"
            [multiple]="multiple">
            <option value="" disabled *ngIf="placeholder">
                {{ placeholder }}
            </option>
            <option *ngFor="let option of options" [ngValue]="option">
                {{ getOptionAttr(option, labelAttr) }}
            </option>
        </select>
    `,
    styles: [
        require('./select.less')
    ],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: SelectComponent, multi: true }
    ]
})
export class SelectComponent extends ValueAccessor<any> {
    @Input() public value: any;
    @Input() public disabled: boolean;
    @Input() public multiple: boolean;
    @Input() public placeholder: string;
    @Input() public options: any[] = [];
    @Input() public labelAttr: string;
    @Input() public valueAttr: string;
    
    /** @override */
    protected parse(option: any | any[]): any {
        return isArray(option)
            ? option.map(o => this.getOptionAttr(o, this.valueAttr))
            : this.getOptionAttr(option, this.valueAttr);
    }

    /** @override */
    protected format(value: any): any {
        if (isNullOrUndefined(value)) return value;
        return isArray(value)
            ? value.map(v => this.findOptionByValue(v))
            : this.findOptionByValue(value);
    }

    private findOptionByValue(value: any) {
        return this.options.find(o => this.getOptionAttr(o, this.valueAttr) === value);
    }
    
    private getOptionAttr(option: any, attr: string) {
        return isObject(option)
            ? attr && option[attr]
            : option;
    }
}