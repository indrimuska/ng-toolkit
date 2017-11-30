import { Component, Input } from '@angular/core';
import { NgModel, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isObject, isNullOrUndefined } from 'util';

import { ValueAccessor } from '../utility';

@Component({
    selector: 'ngt-select',
    template: `
        <select [(ngModel)]="value">
            <option value="" disabled *ngIf="placeholder">
                {{ placeholder }}
            </option>
            <ng-content></ng-content>
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
    @Input() public placeholder: string;
}