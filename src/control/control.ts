import { Component } from '@angular/core';

@Component({
    selector: 'ngt-control',
    template: `
        <ng-content></ng-content>
    `,
    styles: [
        require('./control.less')
    ]
})
export class ControlComponent {

}