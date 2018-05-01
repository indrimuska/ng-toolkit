import { Component } from '@angular/core';

@Component({
    template: require('./number.html')
})
export class NumberComponent {
    public number: number = 12345.6789;

    constructor() {
        setTimeout(() => {
            this.number = 98765.4321
        }, 1000);
    }
}