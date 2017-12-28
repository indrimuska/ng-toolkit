import { Component } from '@angular/core';

@Component({
    template: require('./checkbox.html')
})
export class CheckboxComponent {
    public booleanValue: boolean = true;
    public customValue: boolean = true;
}