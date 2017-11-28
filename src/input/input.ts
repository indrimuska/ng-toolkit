import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { ValueAccessor } from '../utility';

@Component({
    selector: 'ngt-input',
    template: `
        <input
            type="text"
            [(ngModel)]="value"
            [placeholder]="placeholder">
    `,
    styles: [
        require('./input.less')
    ],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: InputComponent, multi: true }
    ]
})
export class InputComponent extends ValueAccessor<string> {
    @Input() public value: string;
    @Input() public placeholder: string;
}