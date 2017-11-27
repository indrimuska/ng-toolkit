import { Component, ViewChild, Input } from '@angular/core';
import { NgModel, NG_VALUE_ACCESSOR } from '@angular/forms';

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
        <div class="ngt-select-input" [ngClass]="{placeholder: !value}">
            {{ value || placeholder }}
        </div>
    `,
    styles: [
        require('./select.less')
    ],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: SelectComponent, multi: true }
    ]
})
export class SelectComponent extends ValueAccessor<string> {
    @ViewChild(NgModel) public model: NgModel;
    @Input() public placeholder: string;
}