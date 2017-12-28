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
    
    public singleSelection = 5;
    public multipleSelection = [2, 4, 6, 8, 10];
    
    public optionsArray = ['one', 'two', 'three'];
}