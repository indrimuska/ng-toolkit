import { Component, ContentChild } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
    selector: 'ngt-control',
    template: require('./control.html'),
    styles: [
        require('./control.scss')
    ]
})
export class ControlComponent {
    @ContentChild(NgModel) model: NgModel;
}