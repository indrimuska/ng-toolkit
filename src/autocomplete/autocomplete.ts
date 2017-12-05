import { Component, ViewChild, ElementRef, HostBinding, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { isObject, isArray, isNullOrUndefined } from 'util';

import { SelectComponent } from '../select/select';

@Component({
    selector: 'ngt-autocomplete',
    template: `
        <label>
            <span *ngIf="!multiple">
                {{ value }}
            </span>
            <ng-container *ngIf="multiple">
                <span *ngFor="let item of viewValue" class="ngt-autocomplete-item">
                    {{ getOptionAttr(item, labelAttr) }}
                </span>
            </ng-container>
            <span class="ngt-autocomplete-filter">
                <input
                    #inputRef
                    [(ngModel)]="filter"
                    [disabled]="disabled"
                    [placeholder]="placeholder"
                    (focus)="onFocus()"
                    (blur)="onBlur()"
                    (keydown.Enter)="selectHighlighted()"
                    (keydown.ArrowUp)="highlightPrevious()"
                    (keydown.ArrowDown)="highlightNext()"
                    (keydown.Escape)="closeDropdown()"
                    (keydown.Backspace)="removeLast()"
                />
                <span class="ngt-autocomplete-filter-placeholder">
                    {{ hasValue || filter ? filter : placeholder }}
                </span>
            </span>
        </label>
        <div
            class="ngt-autocomplete-dropdown"
            (mousedown)="onDropdownFocus()"
            (mouseup)="onDropdownBlur()">
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
    @HostBinding('class.disabled') public disabled: boolean;
    // @HostBinding('class.focus')
    private isFocused: boolean = false;
    @HostBinding('class.open') private get isOpen(): boolean {
        return (this.forceOpen || this.mouseOnDropdown) && this.filteredOptions.length > 0;
    }
    // @HostBinding('class.has-value')
    private get hasValue() {
        return this.multiple
            ? (this.value || []).length > 0
            : !isNullOrUndefined(this.value);
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
    private forceOpen: boolean = false;
    
    private onFocus() {
        this.isFocused = true;
        this.forceOpen = true;
    }

    private onBlur() {
        this.isFocused = false;
        this.forceOpen = false;
        this.filter = '';
    }
    
    private mouseOnDropdown: boolean = false;
    private onDropdownFocus() {
        this.mouseOnDropdown = true;
    }
    private onDropdownBlur() {
        this.mouseOnDropdown = false;
    }

    private highlightPrevious() {
        if (!this.isOpen) this.forceOpen = true;
        else this.highlight(this.highlightedIndex - 1);
    }

    private highlightNext() {
        if (!this.isOpen) this.forceOpen = true;
        else this.highlight(this.highlightedIndex + 1);
    }

    private highlight(index: number) {
        this.highlightedIndex = (index + this.filteredOptions.length) % this.filteredOptions.length;
    }

    private selectHighlighted() {
        this.selectOption(this.filteredOptions[this.highlightedIndex]);
    }

    private selectOption(option: any) {
        if (!this.isOpen) return;
        
        const highlightedIndex = this.highlightedIndex;
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
        this.highlight(Math.min(highlightedIndex, this.filteredOptions.length - 1));
        this.inputRef.nativeElement.focus();
    }

    private closeDropdown() {
        this.forceOpen = false;
    }

    private removeLast() {
        if (!this.hasValue) return;

        if (this.multiple) {
            this.viewValue.pop();
            this.value.pop();
            this.filteredOptions
        } else {
            this.value = null;
        }
        this.updateFilteredOptions();
    }
}