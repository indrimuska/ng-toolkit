import { Component } from '@angular/core';

@Component({
    template: require('./radio.html')
})
export class RadioComponent {
    public booleanValue: boolean = true;
    public customValue: any = 100;
}