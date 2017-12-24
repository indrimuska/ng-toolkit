import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { ValueAccessor } from '../utility';

@Component({
    selector: 'ngt-text',
    template: require('./text.html'),
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: TextComponent, multi: true }
    ]
})
export class TextComponent extends ValueAccessor<number> {
    @Input() public value: number;
    @Input() public disabled: boolean;
    @Input() public placeholder: string;
}