import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgModel, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ValueAccessor } from '../utility';

@Component({
    selector: 'ngt-select',
    template: `
        <select [(ngModel)]="value">
            <option value="" disabled *ngIf="placeholder">
                {{ placeholder }}
            </option>
            <option *ngFor="let option of options" [ngValue]="option.value">
                {{ option.label }}
            </option>
        </select>
        <div class="ngt-select-input" [ngClass]="{placeholder: !viewValue}">
            {{ viewValue || placeholder }}
        </div>
    `,
    styles: [
        require('./select.less')
    ],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: SelectComponent, multi: true }
    ]
})
export class SelectComponent extends ValueAccessor<string> implements OnInit {
    @ViewChild(NgModel) public model: NgModel;
    @Input() public placeholder: string;
    @Input() public options: any[];

    private viewValue: string;

    public ngOnInit() {
        this.model.valueChanges.subscribe(newValue => {
            this.viewValue = (this.options.filter(o => o.value === newValue)[0] || {}).label;
        });
    }
}