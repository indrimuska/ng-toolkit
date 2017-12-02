import { Component, Input } from '@angular/core';
import { NgModel, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isObject, isNullOrUndefined } from 'util';

import { ValueAccessor } from '../utility';

@Component({
    selector: 'ngt-select',
    template: `
        <select [(ngModel)]="viewValue" [disabled]="disabled">
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
    @Input() public placeholder: string;
    @Input() public options: any[] = [];
    @Input() public labelAttr: string;
    @Input() public valueAttr: string;
    
    /** @override */
    protected parse(option: any): any {
        return this.getOptionAttr(option, this.valueAttr);
    }

    /** @override */
    protected format(value: any): any {
        return !isNullOrUndefined(value)
            ? this.options.find(o => this.getOptionAttr(o, this.valueAttr) === value)
            : value;
    }
    
    private getOptionAttr(option: any, attr: string) {
        return isObject(option)
            ? attr && option[attr]
            : option;
    }
}