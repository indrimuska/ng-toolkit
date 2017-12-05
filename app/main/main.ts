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
    public enabled: boolean = true;

    public stringValue = 'pluto';
    public numberValue: number = 5;
    public selectValueObject: number;
    public selectValueArray: string;
    public selectMultipleValue: number[] = [];
    public checkboxValue: string = 'VERO';
    public toggleValue: boolean = false;
    public radioValue: any;

    public optionsObject = [
        { value: 1, label: 'uno' },
        { value: 2, label: 'due' },
        { value: 3, label: 'tre' },
        { value: 4, label: 'quattro' },
        { value: 5, label: 'cinque' },
        { value: 6, label: 'sei' },
    ];
    public optionsArray = ['uno', 'due', 'tre'];

    constructor() {
        setTimeout(() => {
            this.numberValue = 5245.1228;
            this.selectValueObject = 3;
            this.selectValueArray = 'tre';
            this.selectMultipleValue = [1, 2];
            this.radioValue = 1;
            setTimeout(() => {
                this.radioValue = '1';
            }, 1000);
        }, 1000);
    }
}