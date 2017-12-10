import { Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { CheckboxComponent } from '../checkbox/checkbox';

@Component({
    selector: 'ngt-toggle',
    template: `
        <label>
            <input
                type="checkbox"
                [(ngModel)]="viewValue"
                [disabled]="disabled"
            />
            <span class="ngt-toggle-indicator"></span>
            <span class="ngt-toggle-label" *ngIf="label">
                {{ label }}
            </span>
        </label>
    `,
    styles: [
        require('./toggle.scss')
    ],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: ToggleComponent, multi: true }
    ]
})
export class ToggleComponent extends CheckboxComponent { }