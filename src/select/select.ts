import { Component, Input } from '@angular/core';
import { NgModel, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ValueAccessor } from '../utility';

@Component({
    selector: 'ngt-select',
    template: `
        <select [(ngModel)]="selectedOption">
            <option value="" disabled *ngIf="placeholder">
                {{ placeholder }}
            </option>
            <option *ngFor="let option of options" [ngValue]="option">
                {{ getOptionAttr(option, labelAttr) }}
            </option>
        </select>
        <div class="ngt-select-input" [ngClass]="{placeholder: !selectedOption}">
            {{ getOptionAttr(selectedOption, labelAttr) || placeholder }}
        </div>
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
    @Input() public options: any[];
    @Input() public labelAttr: string;
    @Input() public valueAttr: string;

    private _selectedOption: any;
    private get selectedOption(): any {
        return this._selectedOption;
    }
    private set selectedOption(option: any) {
        this._selectedOption = option;
        // component <- select
        this.value = this.getOptionAttr(option, this.valueAttr);
    }

    /** @override */
    public writeValue(value: any) {
        // component -> select
        this.selectedOption = this.options.filter(o => this.getOptionAttr(o, this.valueAttr) === value)[0];        
    }
    
    private getOptionAttr(option: any, attr: string) {
        return attr && typeof option === 'object'
            ? option[attr]
            : option;
    }
}