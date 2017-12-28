import { Component } from '@angular/core';

@Component({
    template: require('./radio.html')
})
export class RadioComponent {
    public booleanValue: boolean;
    public customValue: any;
}