import { Component, ViewChild, ElementRef, HostBinding, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { isObject, isArray, isNullOrUndefined } from 'util';

import { SelectComponent } from '../select/select';

const IGNORE_MOUSE_HOVER_DURATION = 150;
const CLOSE_ON_MOUSE_BLUR_DELAY = 100;

@Component({
    selector: 'ngt-autocomplete',
    template: require('./autocomplete.html'),
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
        return this.isDropdownOpen && this.filteredOptions.length > 0;
    }
    
    private filteredOptions: any[];
    private highlightedIndex: number = 0;
    private ignoreMouseHover: boolean = false;
    private isDropdownOpen: boolean = false;
    private blurTimeout: number;
    
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

    /**
     * Filter text input model (search box input value)
     */
    private _filter: string = '';
    private get filter(): string {
        return this._filter;
    }
    private set filter(filter: string) {
        if (filter === this.filter) return;
        // set new value
        this._filter = filter;
        // open dropdown
        this.openDropdown();
        // filter dropdown items
        this.updateFilteredOptions();
        // highlight first option
        this.highlight(0);
    }

    /**
     * Filter dropdown options with the current text filter.
     * In multiple selection mode it shuold take care of hiding already selected items.
     */
    private updateFilteredOptions() {
        const values = this.multiple
            ? this.value || []
            : this.value ? [this.value] : [];
        const hasValue = values.length > 0;
        const hasFilterText = !!this.filter;

        if (!hasValue && !hasFilterText) {
            this.filteredOptions = this.options.slice();
        } else {
            this.filteredOptions = this.options.filter(o => (
                // hide items that do not match the filter text
                (!this.filter || this.getOptionLabel(o).indexOf(this.filter) >= 0) &&
                // hide items that have been already selected
                (!this.multiple || values.indexOf(this.getOptionValue(o)) < 0)
            ));
        }
    }

    /**
     * Select one dropdown option to be a part of the model value
     */
    private selectOption(option: any) {
        const highlightedIndex = this.highlightedIndex;
        const value = this.getOptionValue(option);
        // append value in multiple seleciton
        if (this.multiple) {
            if (!this.viewValue) this.viewValue = [];
            if (!this.value) this.value = [];
            this.viewValue.push(option);
            this.value.push(value);
        }
        // set single value
        else {
            this.viewValue = option;
            this.value = value;
        }

        // reset filter input
        this.filter = '';
        this.highlight(Math.min(highlightedIndex, this.filteredOptions.length - 1));

        // close dropdown in single selection mode
        if (!this.multiple) this.closeDropdown();
    }

    /**
     * Remove item from the model value
     */
    private removeItem(item: any) {
        if (this.multiple) {
            // remove entire item in the view model
            const viewIndex = (this.viewValue || []).indexOf(item);
            if (viewIndex >= 0) this.viewValue.splice(viewIndex, 1);
            // remove value in the model value
            const valueIndex = (this.value || []).indexOf(this.getOptionValue(item));
            if (valueIndex >= 0) this.value.splice(valueIndex, 1);
        } else {
            this.viewValue = null;
            this.value = null;
        }
    }

    /**
     * Open the dropdown
     */
    private openDropdown() {
        this.isDropdownOpen = true;
    }

    /**
     * Close the dropdown
     */
    private closeDropdown() {
        this.isDropdownOpen = false;
    }

    /**
     * Highglights the option of the dropdown identified by the given `index`
     */
    private highlight(index: number) {
        this.highlightedIndex = ((index || 0) + this.filteredOptions.length) % this.filteredOptions.length;
        this.scrollToIndex(this.highlightedIndex);
    }

    /**
     * Scroll the dropdown to the given index (if required)
     */
    private scrollToIndex(index: number) {
        if (isNaN(this.highlightedIndex)) return;

        // apply highglighting with delay, in order to let first Angular draw all options in the dropdown
        window.setTimeout(() => {
            const option = this.dropdownRef.nativeElement.children[index] as HTMLDivElement;
            const optionHeight = option.offsetHeight;
            const optionPosition = option.offsetTop;
            const dropdown = this.dropdownRef.nativeElement as HTMLDivElement;
            const dropdownHeight = dropdown.offsetHeight;
            const dropdownScrollTop = dropdown.scrollTop;
    
            // scroll up (push the visibile area up)
            if (optionPosition < dropdownScrollTop) {
                dropdown.scrollTop = optionPosition;
            }
            // scroll down (push the visible area down)
            if (optionPosition + optionHeight > dropdownScrollTop + dropdownHeight) {
                dropdown.scrollTop = optionPosition + optionHeight - dropdownHeight;
            }
        });
    }

    /**
     * scrolling the dropdown using keyboard arrows always fires `mouseenter` event
     * if the cursor is over the dropdown itself, causing annoying change of option
     * to highlight. To avoid that we ignore `mouseenter` events for a while after
     * arrow up/down buttons have been pressed.
     */
    private preventCloseDropdownOnMouseEnter() {
        this.ignoreMouseHover = true;
        window.setTimeout(() => this.ignoreMouseHover = false, IGNORE_MOUSE_HOVER_DURATION);
    }
    
    // Input events callbacks

    private onInputFocus() {
        this.openDropdown();
    }

    private onInputBlur() {
        if (!this.isDropdownOpen) {
            this.filter = '';
        } else {
            this.blurTimeout = window.setTimeout(() => {
                this.filter = '';
                this.closeDropdown();
            }, CLOSE_ON_MOUSE_BLUR_DELAY);
        }
    }

    private onInputArrowUpPress() {
        if (!this.isOpen) {
            this.openDropdown();
        } else {
            this.highlight(this.highlightedIndex - 1);
            this.preventCloseDropdownOnMouseEnter();
        }
    }

    private onInputArrowDownPress() {
        if (!this.isOpen) {
            this.openDropdown();
        } else {
            this.highlight(this.highlightedIndex + 1);
            this.preventCloseDropdownOnMouseEnter();
        }
    }

    private onInputEnterPress() {
        const selectedOption = this.filteredOptions[this.highlightedIndex];
        if (selectedOption) this.selectOption(selectedOption);
    }

    private onInputEscapePress() {
        this.closeDropdown();
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

    private onInputTabPress() {
        this.closeDropdown();
    }

    private onInputKeypress(e: KeyboardEvent) {
        if (!this.multiple && this.hasValue) e.preventDefault();
    }

    // Dropdown events callbacks
    
    private onDropdownClick() {
        // keep the dropdown open in multiple selection mode
        if (this.multiple) window.clearTimeout(this.blurTimeout);
        this.inputRef.nativeElement.focus();
    }

    private onDropdownOptionHover(index: number) {
        if (!this.ignoreMouseHover && this.highlightedIndex !== index) {
            // do not call `highlight()` method as this action has been done using the mouse cursor
            // so just highlight the corresponding option without scrolling to it (scrolling should be done using the mosue wheel)
            this.highlightedIndex = index;
        }
    }

    private onDropdownOptionClick(option: any) {
        this.selectOption(option);
    }
}