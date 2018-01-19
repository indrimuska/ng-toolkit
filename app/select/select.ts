import { Component } from '@angular/core';

@Component({
    template: require('./select.html')
})
export class SelectComponent {
    public options = [
        { value: 1, name: 'one' },
        { value: 2, name: 'two' },
        { value: 3, name: 'three' },
        { value: 4, name: 'four' },
        { value: 5, name: 'five' },
        { value: 6, name: 'six' },
        { value: 7, name: 'seven' },
        { value: 8, name: 'eight' },
        { value: 9, name: 'nine' },
        { value: 10, name: 'ten' },
    ];
    public optionsArray = ['one', 'two', 'three', 'four', 'five'];
    
    public singleSelection = 5;
    public multipleSelection = [2, 4, 6, 8, 10];
    public simpleArrayOfOptions = ['three'];

    constructor() {
        setTimeout(() => {
            this.singleSelection = 4;
            this.multipleSelection = [1, 3, 5, 7, 9];
            this.simpleArrayOfOptions = ['one', 'two'];
        }, 1500);
    }
}