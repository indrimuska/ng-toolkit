import { Component } from '@angular/core';

@Component({
    template: require('./toggle.html')
})
export class ToggleComponent {
    public booleanValue: boolean = true;
    public customValue: boolean = true;
}