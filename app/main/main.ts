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
    public numberValue: number = 5;
    public selectValue1: number;
    public selectValue2: string;

    public optionsObject = [
        { value: 1, label: 'uno' },
        { value: 2, label: 'due' },
        { value: 3, label: 'tre' },
    ];
    public optionsArray = ['uno', 'due', 'tre'];

    constructor() {
        setTimeout(() => {
            this.selectValue1 = 3;
            this.selectValue2 = "tre";
        }, 2000);
    }
}