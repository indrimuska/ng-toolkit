import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { ValueAccessor } from '../utility';

@Component({
    selector: 'ngt-checkbox',
    template: `
        <label>
            <input
                type="checkbox"
                [(ngModel)]="value"
                [disabled]="disabled"
            />
            <span class="ngt-checkbox-indicator"></span>
            <span *ngIf="label">
                {{ label }}
            </span>
        </label>
    `,
    styles: [
        require('./checkbox.less')
    ],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: CheckboxComponent, multi: true }
    ]
})
export class CheckboxComponent extends ValueAccessor<boolean> {
    @Input() public value: boolean;
    @Input() public disabled: boolean;
    @Input() public label: string;
}