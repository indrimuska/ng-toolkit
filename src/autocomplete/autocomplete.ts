import { Component, ViewChild, ElementRef, HostBinding, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { isObject, isArray } from 'util';

import { SelectComponent } from '../select/select';

@Component({
    selector: 'ngt-autocomplete',
    template: `
        <label>
            <span *ngIf="!multiple">
                {{ value }}
            </span>
            <ng-container *ngIf="multiple">
                <span *ngFor="let item of viewValue">
                    {{ getOptionAttr(item, labelAttr) }}
                </span>
            </ng-container>
            <span class="ngt-autocomplete-filter">
                <input
                    #inputRef
                    [(ngModel)]="filter"
                    (focus)="onFocus()"
                    (blur)="onBlur()"
                    (keydown.Enter)="selectHighlighted()"
                    (keydown.ArrowUp)="highlightPrevious()"
                    (keydown.ArrowDown)="highlightNext()"
                    (keydown.Backspace)="removeLast()"
                />
                {{ filter }}
            </span>
        </label>
        <div
            class="ngt-autocomplete-dropdown"
            (mousedown)="mouseOnDropdown = true"
            (mouseup)="mouseOnDropdown = false">
            <div
                *ngFor="let option of filteredOptions; let i = index; trackBy:getOptionAttr(option, valueAttr)"
                [ngClass]="{highlighted: highlightedIndex === i}"
                class="ngt-autocomplete-dropdown-item"
                (mouseenter)="highlightedIndex = i"
                (click)="selectOption(option)">
                {{ getOptionAttr(option, labelAttr) }}
            </div>
        </div>
    `,
    styles: [
        require('./autocomplete.less')
    ],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: AutocompleteComponent, multi: true }
    ]
})
export class AutocompleteComponent extends SelectComponent {
    @ViewChild('inputRef') public inputRef: ElementRef;
    @HostBinding('class.focus') private isFocused: boolean = false;
    @HostBinding('class.open') private get dropdownOpen(): boolean {
        return (this.isOpen || this.mouseOnDropdown) && this.filteredOptions.length > 0;
    }

    private _options: any[] = [];
    @Input() public get options(): any[] {
        return this._options;
    }
    public set options(options: any[]) {
        this._options = options;
        this.updateFilteredOptions();
    }

    private _filter: string;
    private get filter(): string {
        return this._filter;
    }
    private set filter(filter: string) {
        this._filter = filter;
        this.updateFilteredOptions();
    }

    private updateFilteredOptions() {
        const values = this.multiple
            ? this.value || []
            : this.value ? [this.value] : [];
        const hasValue = values.length > 0;
        const hasFilter = !!this._filter;

        if (!hasValue && !hasFilter) {
            this.filteredOptions = this.options.slice();
        } else {
            if (hasValue && hasFilter) {
                this.filteredOptions = this.options.filter(o => (
                    this.getOptionAttr(o, this.labelAttr).indexOf(this._filter) >= 0 &&
                    values.indexOf(this.getOptionAttr(o, this.valueAttr)) < 0
                ));
            } else {
                this.filteredOptions = hasFilter
                    ? this.filteredOptions = this.options.filter(o => this.getOptionAttr(o, this.labelAttr).indexOf(this._filter) >= 0)
                    : this.filteredOptions = this.options.filter(o => values.indexOf(this.getOptionAttr(o, this.valueAttr)) < 0);
            }
        }
        this.highlightedIndex = 0;
    }

    private filteredOptions: any[];
    private highlightedIndex: number = 0;
    private isOpen: boolean = false;
    private mouseOnDropdown: boolean = false;

    private onFocus() {
        this.isFocused = true;
        this.isOpen = true;
    }

    private onBlur() {
        this.isFocused = false;
        this.isOpen = false;
        this.filter = '';
    }

    private highlightPrevious() {
        this.highlight(this.highlightedIndex - 1);
        this.isOpen = true;
    }

    private highlightNext() {
        this.highlight(this.highlightedIndex + 1);
        this.isOpen = true;
    }

    private highlight(index: number) {
        this.highlightedIndex = (index + this.filteredOptions.length) % this.filteredOptions.length;
    }

    private selectHighlighted() {
        if (this.isOpen) {
            this.selectOption(this.filteredOptions[this.highlightedIndex]);
        }
    }

    private selectOption(option: any) {
        const value = this.getOptionAttr(option, this.valueAttr);
        if (this.multiple) {
            if (!this.viewValue) this.viewValue = [];
            if (!this.value) this.value = [];
            this.viewValue.push(option);
            this.value.push(value);
        } else {
            this.viewValue = option;
            this.value = value;
        }
        this.filter = '';
        this.inputRef.nativeElement.focus();
    }

    private removeLast() {
        if (this.multiple) {
            this.viewValue.pop();
            this.value.pop();
        } else {
            this.value = null;
        }
    }
}