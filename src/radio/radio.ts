import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { ValueAccessor } from '../utility';

@Component({
    selector: 'ngt-radio',
    template: `
        <label>
            <input
                type="radio"
                [(ngModel)]="value"
                [disabled]="disabled"
                [value]="radioValue"
            />
            <span class="ngt-radio-indicator"></span>
            <span class="ngt-radio-label" *ngIf="label">
                {{ label }}
            </span>
        </label>
    `,
    styles: [
        require('./radio.scss')
    ],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: RadioComponent, multi: true }
    ]
})
export class RadioComponent extends ValueAccessor<any> {
    @Input() public value: boolean;
    @Input() public label: string;
    @Input() public disabled: boolean;
    @Input('value') public radioValue: any;
}