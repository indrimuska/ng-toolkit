import { Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { CheckboxComponent } from '../checkbox/checkbox';

@Component({
    selector: 'ngt-toggle',
    template: require('./toggle.html'),
    styles: [
        require('./toggle.scss')
    ],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: ToggleComponent, multi: true }
    ]
})
export class ToggleComponent extends CheckboxComponent { }