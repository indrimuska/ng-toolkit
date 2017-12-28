import { Component } from '@angular/core';
import { SelectComponent } from '../select/select';

@Component({
    template: require('./autocomplete.html')
})
export class AutocompleteComponent extends SelectComponent {
    public enabled: boolean = true;

    public stringValue = 'pluto';
    public numberValue: number = 5;
    public selectValueObject: number;
    public selectValueArray: string;
    public selectMultipleValue: number[] = [];
    public autocompleteValue: number = 12;
    public autocompleteMultipleValue: number[] = [];
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
        { value: 7, label: 'sette' },
        { value: 8, label: 'otto' },
        { value: 9, label: 'nove' },
        { value: 10, label: 'dieci' },
        { value: 11, label: 'undici' },
        { value: 12, label: 'dodici' },
    ];

    constructor() {
        super();
        setTimeout(() => {
            this.numberValue = 5245.1228;
            this.selectValueObject = 3;
            this.selectValueArray = 'tre';
            this.selectMultipleValue = [1, 2];
            this.autocompleteMultipleValue = [6, 10]
            this.radioValue = 1;
            setTimeout(() => {
                this.radioValue = '1';
            }, 1000);
        }, 1000);
    }
}