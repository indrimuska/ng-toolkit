import { Component, ContentChild } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
    selector: 'ngt-control',
    template: `
        <ng-content></ng-content>
        <code class="form-text">{{ model?.value | json }}</code>
    `,
    styles: [
        require('./control.scss')
    ]
})
export class ControlComponent {
    @ContentChild(NgModel) model: NgModel;
}