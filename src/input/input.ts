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
    @ViewChild('elementRef') public elementRef: ElementRef;

    public ngOnInit() {
        if (['text', 'number', 'email'].indexOf(this.type) < 0) {
            throw new Error(`Type attribute not supported: provided ${this.type}`);
        }
    }
    
    @Output() public focus = new EventEmitter<FocusEvent>();
    private _focus(e: FocusEvent) {
        this.focus.emit(e);
    }
    
    @Output() public blur = new EventEmitter<FocusEvent>();
    private _blur(e: FocusEvent) {
        this.blur.emit(e);
    }
    
    @Output() public keydown = new EventEmitter<KeyboardEvent>();
    private _keydown(e: KeyboardEvent) {
        this.keydown.emit(e);
    }
    
    @Output() public keypress = new EventEmitter<KeyboardEvent>();
    private _keypress(e: KeyboardEvent) {
        this.keypress.emit(e);
    }
    
    @Output() public keyup = new EventEmitter<KeyboardEvent>();
    private _keyup(e: KeyboardEvent) {
        this.keyup.emit(e);
    }
}