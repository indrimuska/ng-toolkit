import { Component } from '@angular/core';

@Component({
    template: require('./number.html')
})
export class NumberComponent {
    public number: number = 12345.6789;
}