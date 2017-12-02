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
    public selectValueObject: number;
    public selectValueArray: string;
    public checkboxValue: boolean = false;
    public radioValue: any;

    public optionsObject = [
        { value: 1, label: 'uno' },
        { value: 2, label: 'due' },
        { value: 3, label: 'tre' },
    ];
    public optionsArray = ['uno', 'due', 'tre'];

    constructor() {
        setTimeout(() => {
            this.numberValue = 5245.1228;
            this.selectValueObject = 3;
            this.selectValueArray = "tre";
            this.radioValue = 1;
            setTimeout(() => {
                this.radioValue = '1';
            }, 1000);
        }, 1000);
    }
}