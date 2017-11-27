import { Component, ViewChild, Input } from '@angular/core';
import { NgModel, NG_VALUE_ACCESSOR } from '@angular/forms';

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
    @ViewChild(NgModel) public model: NgModel;
    @Input() public placeholder: string;
}