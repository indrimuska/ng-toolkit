import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { ValueAccessor } from '../utility';

@Component({
    selector: 'ngt-number',
    template: `
        <ngt-input
            type="number"
            [(ngModel)]="stringNumber"
            [placeholder]="placeholder">
        </ngt-input>
    `,
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: NumberComponent, multi: true }
    ]
})
export class NumberComponent extends ValueAccessor<number> {
    @Input() public value: number;
    @Input() public placeholder: string;
    
    private _number: string;
    private get stringNumber(): string {
        return this._number;
    }
    private set stringNumber(value: string) {
        this._number = value;
        // component <- select
        this.value = this.parse(value);
    }
    
    /** @override */
    public writeValue(value: any) {
        // component -> select
        this.stringNumber = value       
    }

    private parse(value: string): number {
        return parseInt(value);
    }

    private format(value: number): string {
        return `${value}`;
    }
}