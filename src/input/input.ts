import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { ValueAccessor } from '../utility';

@Component({
    selector: 'ngt-input',
    template: require('./input.html'),
    styles: [
        require('./input.scss')
    ],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: InputComponent, multi: true }
    ]
})
export class InputComponent<T> extends ValueAccessor<T> implements OnInit {
    @Input() public value: T;
    @Input() public disabled: boolean;
    @Input() public placeholder: string = '';
    @Input() public type: 'text' | 'number' | 'email';
    
    @Output() public focus = new EventEmitter<FocusEvent>();
    @Output() public blur = new EventEmitter<FocusEvent>();
    @Output() public keydown = new EventEmitter<KeyboardEvent>();
    @Output() public keypress = new EventEmitter<KeyboardEvent>();
    @Output() public keyup = new EventEmitter<KeyboardEvent>();
    
    @ViewChild('elementRef') public elementRef: ElementRef;

    public ngOnInit() {
        if (['text', 'number', 'email'].indexOf(this.type) < 0) {
            throw new Error(`Type attribute not supported: provided ${this.type}`);
        }
    }
}