import { Component, ViewChild, ElementRef, HostBinding, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { isObject, isArray, isNullOrUndefined } from 'util';

import { SelectComponent } from '../select/select';

@Component({
    selector: 'ngt-autocomplete',
    template: `
        <label>
            <span *ngIf="!multiple" class="ngt-autocomplete-item">
                {{ getOptionAttr(viewValue, labelAttr) }}
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
                    [placeholder]="hasValue ? '' : placeholder"
                    (focus)="onInputFocus()"
                    (blur)="onInputBlur($event)"
                    (keydown.Enter)="onInputEnterPress()"
                    (keydown.ArrowUp)="onInputArrowUpPress()"
                    (keydown.ArrowDown)="onInputArrowDownPress()"
                    (keydown.Escape)="onInputEscapePress()"
                    (keydown.Backspace)="onInputBackspacePress()"
                    (keypress)="onInputKeypress($event)"
                />
                <span class="ngt-autocomplete-filter-placeholder">
                    {{ hasValue || filter ? filter : placeholder }}
                </span>
            </span>
        </label>
        <div
            #dropdownRef
            class="ngt-autocomplete-dropdown"
            (mousedown)="onDropdownClick()">
            <div
                *ngFor="let option of filteredOptions; let i = index; trackBy:getOptionAttr(option, valueAttr)"
                [ngClass]="{highlighted: highlightedIndex === i}"
                class="ngt-autocomplete-option"
                (mouseenter)="highlightedIndex = i"
                (click)="onDropdownOptionClick(option)">
                {{ getOptionAttr(option, labelAttr) }}
            </div>
        </div>
    `,
    styles: [
        require('./autocomplete.scss')
    ],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: AutocompleteComponent, multi: true }
    ]
})
export class AutocompleteComponent extends SelectComponent {
    @ViewChild('inputRef') public inputRef: ElementRef;
    @ViewChild('dropdownRef') public dropdownRef: ElementRef;
    @HostBinding('class.disabled') public disabled: boolean;
    @HostBinding('class.multiple') public multiple: boolean;
    @HostBinding('class.open') private get isOpen(): boolean {
        return this.forceOpen && this.filteredOptions.length > 0;
    }
    
    private filteredOptions: any[];
    private highlightedIndex: number = 0;
    private forceOpen: boolean = false;
    private dropdownClosePrevented: boolean = false;
    
    private get hasValue() {
        return this.multiple
            ? (this.value || []).length > 0
            : !isNullOrUndefined(this.value);
    }

    // @Input() public set value(value: any | any[]) {
    //     console.log('value', value)
    // }

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
        this.highlight(0);
        this.updateFilteredOptions();
    }

    private updateFilteredOptions() {
        const values = this.multiple
            ? this.value || []
            : this.value ? [this.value] : [];
        const hasValue = values.length > 0;
        const hasFilter = !!this._filter;

        if (!this.multiple || !hasValue && !hasFilter) {
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
    }

    private highlight(index: number) {
        this.highlightedIndex = ((index || 0) + this.filteredOptions.length) % this.filteredOptions.length;
        this.scrollToIndex(this.highlightedIndex);
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

        // reset filter input
        this.filter = '';
        this.highlight(Math.min(highlightedIndex, this.filteredOptions.length - 1));

        // close dropdown in single selection mode
        if (!this.multiple) this.forceOpen = false;
    }

    private removeItem(item: any) {
        if (this.multiple) {
            // remove entire item in the view model
            const viewIndex = (this.viewValue || []).indexOf(item);
            if (viewIndex >= 0) this.viewValue.splice(viewIndex, 1);
            // remove value in the model value
            const valueIndex = (this.value || []).indexOf(this.getOptionAttr(item, this.valueAttr));
            if (valueIndex >= 0) this.value.splice(valueIndex, 1);
        } else {
            this.viewValue = null;
            this.value = null;
        }
    }

    private scrollToIndex(index: number) {
        if (this.highlightedIndex < 0) return;

        const option = this.dropdownRef.nativeElement.children[index] as HTMLDivElement;
        const optionHeight = option.offsetHeight;
        const optionPosition = option.offsetTop;
        const dropdown = this.dropdownRef.nativeElement as HTMLDivElement;
        const dropdownHeight = dropdown.offsetHeight;
        const dropdownScrollTop = dropdown.scrollTop;

        // scroll dropdown in order to make the selected item visible
        if (optionPosition < dropdownScrollTop) {
            dropdown.scrollTop = optionPosition;
        }
        if (optionPosition + optionHeight > dropdownScrollTop + dropdownHeight) {
            dropdown.scrollTop = optionPosition + optionHeight - dropdownHeight;
        }
    }
    
    // Input callbacks

    private onInputFocus() {
        this.forceOpen = true;
    }

    private onInputBlur() {
        this.filter = '';
        this.forceOpen = false;
        if (this.dropdownClosePrevented) this.inputRef.nativeElement.focus();
    }

    private onInputArrowUpPress() {
        if (!this.isOpen) this.forceOpen = true;
        else this.highlight(this.highlightedIndex - 1);
    }

    private onInputArrowDownPress() {
        if (!this.isOpen) this.forceOpen = true;
        else this.highlight(this.highlightedIndex + 1);
    }

    private onInputEnterPress() {
        this.selectOption(this.filteredOptions[this.highlightedIndex]);
    }

    private onInputEscapePress() {
        this.forceOpen = false;
    }

    private onInputBackspacePress() {
        if (!this.filter && this.hasValue) {
            // remove last item
            this.removeItem(this.viewValue[this.viewValue.length - 1]);

            // re-filter options highlighting the same option (if still exists)
            const highlighted = this.filteredOptions[this.highlightedIndex];
            this.updateFilteredOptions();
            this.highlight(this.filteredOptions.indexOf(highlighted));
        }
    }

    private onInputKeypress(e: KeyboardEvent) {
        if (!this.multiple && this.hasValue) e.preventDefault();
    }

    // Dropdown callbacks
    
    private onDropdownClick() {
        this.forceOpen = true;

        // prevent dropdown close
        this.dropdownClosePrevented = true;
        setTimeout(() => this.dropdownClosePrevented = false, 50);
    }

    private onDropdownOptionClick(option: any) {
        this.selectOption(option);
    }
}