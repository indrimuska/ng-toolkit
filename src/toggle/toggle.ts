import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { ValueAccessor } from '../utility';

@Component({
    selector: 'ngt-toggle',
    template: `
        <label>
            <input
                type="checkbox"
                [(ngModel)]="value"
                [disabled]="disabled"
            />
            <span class="ngt-toggle-indicator"></span>
            <span *ngIf="label">
                {{ label }}
            </span>
        </label>
    `,
    styles: [
        require('./toggle.less')
    ],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: ToggleComponent, multi: true }
    ]
})
export class ToggleComponent extends ValueAccessor<boolean> {
    @Input() public value: boolean;
    @Input() public disabled: boolean;
    @Input() public label: string;
}