import { Component, ViewChild, ElementRef, HostBinding, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { isObject, isArray, isNullOrUndefined } from 'util';

import { SelectComponent } from '../select/select';

const IGNORE_MOUSE_HOVER_DURATION = 150; // ms
const CLOSE_ON_MOUSE_BLUR_DELAY = 100; // ms

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
export class AutocompleteComponent<AutocompleteValue, AutocompleteOption> extends SelectComponent<AutocompleteValue, AutocompleteOption> {
    @ViewChild('inputRef') public inputRef: ElementRef;
    @ViewChild('dropdownRef') public dropdownRef: ElementRef;
    @HostBinding('class.disabled') public disabled: boolean;
    @HostBinding('class.multiple') public multiple: boolean;
    @HostBinding('class.open') private get isOpen(): boolean {
        return this.isDropdownOpen && this.filteredOptions.length > 0;
    }
    
    private isDropdownOpen: boolean = false;
    private filteredOptions: AutocompleteOption[];
    private highlightedIndex: number = 0;
    private ignoreMouseHover: boolean = false;
    private hoverTimeout: number;
    private blurTimeout: number;
    
    private get hasValue(): boolean {
        return this.multiple
            ? (this.value as AutocompleteValue[] || []).length > 0
            : !isNullOrUndefined(this.value);
    }

    private _options: AutocompleteOption[] = [];
    @Input() public get options(): AutocompleteOption[] {
        return this._options;
    }
    public set options(options: AutocompleteOption[]) {
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

    constructor() {
        super();
        // listen for value updates
        this.registerOnChange(() => this.updateFilteredOptions());
    }

    /**
     * Filter dropdown options with the current text filter.
     * In multiple selection mode it shuold take care of hiding already selected items.
     */
    private updateFilteredOptions() {
        const values = this.multiple
            ? this.value as AutocompleteValue[] || []
            : this.value ? [this.value as AutocompleteValue] : [];
        const hasValue = values.length > 0;
        const hasFilterText = !!this.filter;

        if (!hasValue && !hasFilterText) {
            this.filteredOptions = this.options;
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
    private selectOption(option: AutocompleteOption) {
        const highlightedIndex = this.highlightedIndex;
        const value = this.getOptionValue(option);
        // append value in multiple seleciton
        if (this.multiple) {
            if (!this.viewValue) this.viewValue = [];
            if (!this.value) this.value = [];
            (this.viewValue as AutocompleteOption[]).push(option);
            (this.value as AutocompleteValue[]).push(value);
            // pushed option won't trigger model change
            this.updateFilteredOptions();
        }
        // set single value
        else {
            this.viewValue = option;
            this.value = value;
        }

        // reset filter input
        this.filter = '';
        this.highlight(Math.min(highlightedIndex, this.filteredOptions.length - 1));
    }

    /**
     * Remove item from the model value
     */
    private removeItem(item: AutocompleteOption) {
        if (this.multiple) {
            // remove entire item in the view model
            const viewIndex = (this.viewValue as AutocompleteOption[] || []).indexOf(item);
            if (viewIndex >= 0) (this.viewValue as AutocompleteOption[]).splice(viewIndex, 1);
            // remove value in the model value
            const valueIndex = (this.value as AutocompleteValue[] || []).indexOf(this.getOptionValue(item));
            if (valueIndex >= 0) (this.value as AutocompleteValue[]).splice(valueIndex, 1);
        } else {
            this.viewValue = null;
            this.value = null;
        }
    }

    /**
     * Open the dropdown
     */
    private openDropdown() {
        if (!this.isOpen) {
            this.isDropdownOpen = true;
        }
    }
    
    /**
     * Close the dropdown
     */
    private closeDropdown() {
        if (this.isOpen) {
            this.isDropdownOpen = false;
        }
    }

    /**
     * Highlight the option of the dropdown identified by the given `index`
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
     * if the mouse cursor is over the dropdown itself, causing an annoying update of
     * the option to highlight. To avoid this we ignore `mouseenter` events for a while
     * after arrow up/down buttons have been pressed.
     */
    private preventCloseDropdownOnMouseHover() {
        // avoid flag bouncing, if a new request to ignore mouse hover is called when the timeout is not expired
        if (this.ignoreMouseHover) window.clearTimeout(this.hoverTimeout);
        else this.ignoreMouseHover = true;
        // save timeout reference in order to clear if required
        this.hoverTimeout = window.setTimeout(() => this.ignoreMouseHover = false, IGNORE_MOUSE_HOVER_DURATION);
    }
    
    // Input events callbacks

    private onInputFocus() {
        this.openDropdown();
    }

    private onInputBlur() {
        if (!this.isOpen) {
            this.filter = '';
        } else {
            this.blurTimeout = window.setTimeout(() => {
                this.filter = '';
                this.closeDropdown();
            }, CLOSE_ON_MOUSE_BLUR_DELAY);
        }
    }

    private onInputArrowUpPress() {
        if (!this.isOpen) this.openDropdown();
        else this.highlight(this.highlightedIndex - 1);
        this.preventCloseDropdownOnMouseHover();
    }

    private onInputArrowDownPress() {
        if (!this.isOpen) this.openDropdown();
        else this.highlight(this.highlightedIndex + 1);
        this.preventCloseDropdownOnMouseHover();
    }

    private onInputEnterPress(e: KeyboardEvent) {
        if (this.isOpen) {
            // prevent submit: this action is meant to select an option from the dropdown
            e.preventDefault();

            const selectedOption = this.filteredOptions[this.highlightedIndex];
            if (selectedOption) {
                this.selectOption(selectedOption);
                // close the dropdown in single selection mode
                if (!this.multiple) this.closeDropdown();
            }
        }
    }

    private onInputEscapePress() {
        this.closeDropdown();
    }

    private onInputBackspacePress() {
        if (!this.filter && this.hasValue) {
            // remove last item
            const values = this.viewValue as AutocompleteOption[];
            this.removeItem(values[values.length - 1]);

            // re-filter options highlighting the same option (if still exists)
            const highlightedOption = this.filteredOptions[this.highlightedIndex];
            this.updateFilteredOptions();
            this.highlight(this.filteredOptions.indexOf(highlightedOption));
        }
    }

    private onInputTabPress() {
        this.closeDropdown();
    }

    private onInputKeypress(e: KeyboardEvent) {
        // if a value is already selected in single mode, we must prevent insert any other text in the input
        if (!this.multiple && this.hasValue) e.preventDefault();
    }

    // Dropdown events callbacks
    
    private onDropdownClick() {
        // keep the dropdown open in multiple selection mode
        if (this.multiple) window.clearTimeout(this.blurTimeout);
        // keep input focus
        this.inputRef.nativeElement.focus();
    }

    private onDropdownOptionHover(index: number) {
        if (!this.ignoreMouseHover && this.highlightedIndex !== index) {
            // do not call `highlight()` method as this action has been done using the mouse cursor
            // so just highlight the corresponding option without scrolling to it (scrolling should be done using the mosue wheel)
            this.highlightedIndex = index;
        }
    }

    private onDropdownOptionClick(option: AutocompleteOption) {
        this.selectOption(option);
    }
}