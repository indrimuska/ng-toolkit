import { Component } from '@angular/core';

import 'bootstrap/dist/css/bootstrap.css';

@Component({
    selector: 'main',
    template: require('./main.html'),
    host: { 'class': 'container' },
    styles: [`
        :host {
            margin-top: 2rem;
        }
    `]
})
export class Main {
    public stringValue = "pluto";
    public selectValue: number;

    public options = [
        { value: 1, label: 'uno' },
        { value: 2, label: 'due' },
        { value: 3, label: 'tre' },
    ];

    constructor() {
        setTimeout(() => {
            this.selectValue = 4;
        }, 2000);
    }
}