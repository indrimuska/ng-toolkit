import { Component, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { ValueAccessor } from '../utility';

@Component({
    selector: 'ngt-input',
    template: `
        <input
            [type]="type"
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
export class InputComponent<T> extends ValueAccessor<T> implements OnInit {
    @Input() public value: T;
    @Input() public placeholder: string;
    @Input() public type: 'text' | 'number' | 'email';

    public ngOnInit() {
        if (['text', 'number', 'email'].indexOf(this.type) < 0) {
            throw new Error(`Type attribute not supported: provided ${this.type}`);
        }
    }
}