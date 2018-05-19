import * as moment from 'moment';
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { isNullOrUndefined, isUndefined } from 'util';

import { InputComponent } from '../input/input';
import { ValueAccessor } from '../utility';
import { ViewType, AbstractView, IViewItem } from './definitions';
import { DecadeView } from './views/decadeView';
import { YearView } from './views/yearView';
import { MonthView } from './views/monthView';
import { DayView } from './views/dayView';
import { HourView } from './views/hourView';
import { MinuteView } from './views/minuteView';

@Component({
    selector: 'ngt-date',
    template: require('./date.html'),
    styles: [
        require('./date.scss')
    ],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: DateComponent, multi: true }
    ]
})
export class DateComponent extends ValueAccessor<Date, string> {
    @Input() public disabled: boolean;
    @Input() public placeholder: string;

    private _viewFormat: string = 'L LTS';
    @Input('format') public get viewFormat(): string {
        return this._viewFormat;
    }
    public set viewFormat(viewFormat: string) {
        this._viewFormat = viewFormat;
        this.updateLimitViews();
    }

    private _locale: string = 'en';
    @Input() public get locale(): string {
        return this._locale;
    }
    public set locale(locale: string) {
        this._locale = locale;
        // update all references with new locale
        this.viewDate.locale(locale);
        if (this.minDateMoment) this.minDateMoment.locale(locale);
        if (this.maxDateMoment) this.maxDateMoment.locale(locale);
        if (this.startDateMoment) this.startDateMoment.locale(locale);
        // render view and input
        if (this.initialized) {
            this.selectedView.render();
            this.viewValue = this.format(this.value);
        }
    }

    private _minView: ViewType = 'decade';
    @Input() public get minView(): ViewType {
        return this._minView;
    }
    public set minView(minView: ViewType) {
        this._minView = minView;
        this.updateLimitViews();
    }

    private _maxView: ViewType = 'minute';
    @Input() public get maxView(): ViewType {
        return this._maxView;
    }
    public set maxView(maxView: ViewType) {
        this._maxView = maxView;
        this.updateLimitViews();
    }

    @Input() public startView: ViewType = 'month';

    private minDateMoment: moment.Moment;
    @Input() public set minDate(minDate: Date) {
        this.minDateMoment = minDate
            ? moment(minDate).locale(this.locale)
            : null;
    }
    private maxDateMoment: moment.Moment;
    @Input() public set maxDate(maxDate: Date) {
        this.maxDateMoment = maxDate
            ? moment(maxDate).locale(this.locale)
            : null;
    }
    private startDateMoment: moment.Moment;
    @Input() public set startDate(startDate: Date) {
        if (!this.startDateMoment) this.startDateMoment = moment(startDate).locale(this.locale);
    }
    public get startDate(): Date {
        return this.startDateMoment
            ? this.startDateMoment.toDate()
            : null;
    }

    @ViewChild('inputRef') public inputRef: InputComponent;
    @ViewChild('dropdownRef') public dropdownRef: ElementRef;

    private initialized: boolean = false;
    private closeTimeout: number;
    private isOpen: boolean = false;
    public viewDate: moment.Moment = moment().locale(this.locale);
    private viewTypes: ViewType[] = [];
    private views: { [name: string]: AbstractView } = {};
    private _selectedViewType: ViewType;
    public set selectedViewType(viewType: ViewType) {
        if (this.views[viewType]) {
            this._selectedViewType = viewType;
            this.selectedView.render();
        }
    }
    private get selectedView(): AbstractView {
        return this.views[this._selectedViewType];
    }

    constructor() {
        super();
        // register views -- order matters!
        this.registerView('decade', new DecadeView(this));
        this.registerView('year', new YearView(this));
        this.registerView('month', new MonthView(this));
        this.registerView('day', new DayView(this));
        this.registerView('hour', new HourView(this));
        this.registerView('minute', new MinuteView(this));
        // listen for value updates
        this.registerOnChange(() => this.onValueChange());
    }

    /** @override */
    protected onModelInit() {
        // initialization
        this.detectMinMaxView();
        if (!this.startDate) {
            if (this.value) this.startDate = this.value;
            else this.startDate = new Date();
        }
        this.viewDate = this.startDateMoment.clone();
        // render
        this.selectedViewType = this.startView;
        this.isOpen = false;
        this.initialized = true;
    }

    private onValueChange() {
        if (this.isOpen) {
            this.selectedView.render();
        }
    }

    /** @override */
    protected format(value: Date): string {
        if (!isNullOrUndefined(value)) {
            const momentDate = moment(value).locale(this.locale);
            return momentDate.isValid()
                ? momentDate.format(this.viewFormat)
                : '';
        } else {
            return '';
        }
    }

    /** @override */
    protected parse(value: string): Date {
        if (!isNullOrUndefined(value)) {
            const momentDate = moment(value, this.viewFormat, this.locale);
            return momentDate.isValid()
                ? momentDate.toDate()
                : null;
        } else {
            return value;
        }
    }

    private registerView(type: ViewType, view: AbstractView) {
        this.viewTypes.push(type);
        this.views[type] = view;
    }

    private setPreviousView() {
        const current = this.viewTypes.indexOf(this._selectedViewType);
        this.setView(this.viewTypes[current - 1]);
    }

    private setNextView() {
        const current = this.viewTypes.indexOf(this._selectedViewType);
        this.setView(this.viewTypes[current + 1]);
    }

    private setView(type: ViewType) {
        if (type) {
            let index = this.viewTypes.indexOf(type);
            // check if view can be selected (is it included between min and max view?)
            if (this.minView) {
                const minViewIndex = this.viewTypes.indexOf(this.minView);
                if (index < minViewIndex) {
                    type = this.minView;
                    index = minViewIndex;
                }
            }
            if (this.maxView) {
                const maxViewIndex = this.viewTypes.indexOf(this.maxView);
                if (index > maxViewIndex) {
                    type = this.maxView;
                    index = maxViewIndex;
                }
            }
            // set selected view
            this.selectedViewType = type;
        }
    }

    private updateLimitViews() {
        // auto-detect minView/maxView
        this.detectMinMaxView();
        // limit startView
        this.startView = this.viewTypes[
            Math.max(
                Math.min(
                    this.viewTypes.indexOf(this.startView),
                    this.viewTypes.indexOf(this.maxView)
                ),
                this.viewTypes.indexOf(this.minView)
            )
        ];
        // set selected view for next rendering
        if (this.selectedViewType !== this.startView) {
            this.selectedViewType = this.startView;
        }
    }

    private detectMinMaxView() {
        if (!this.viewFormat) return;

        let minViewIndex: number;
        let maxViewIndex: number;
        this.viewTypes.forEach((type, index) => {
            const regExp = new RegExp('(' + this.views[type].formatsRegExp + ')(?![^\[]*\])', 'g');
            if (this.viewFormat.match(regExp)) {
                if (isUndefined(minViewIndex)) minViewIndex = index;
                maxViewIndex = index;
            }
        });

        // fallback to limits view
        if (isUndefined(minViewIndex)) minViewIndex = 0;
        if (isUndefined(maxViewIndex)) maxViewIndex = this.viewTypes.length - 1;

        // enforce limits if those provided by the user are stronger then detected ones
        if (minViewIndex > this.viewTypes.indexOf(this.minView)) this._minView = this.viewTypes[minViewIndex];
        if (maxViewIndex < this.viewTypes.indexOf(this.maxView)) this._maxView = this.viewTypes[maxViewIndex];
    }

    private resetViews() {
        this.selectedViewType = this.startView;
    }

    private open() {
        if (this.disabled) return;

        this.isOpen = true;
        clearTimeout(this.closeTimeout);
        this.inputRef.elementRef.nativeElement.focus();
    }

    private close(): Promise<void> {
        return new Promise(resolve => {
            if (this.isOpen) {
                this.closeTimeout = window.setTimeout(() => {
                    this.isOpen = false;
                    this.resetViews();
                    resolve();
                }, 100);
            } else {
                resolve();
            }
        });
    }

    public isSelected(model: moment.Moment, granularity: moment.unitOfTime.StartOf): boolean {
        return this.value && model.isSame(this.value, granularity);
    }

    public isDisabled(model: moment.Moment, granularity: moment.unitOfTime.StartOf): boolean {
        if (this.minDateMoment && model.isBefore(this.minDateMoment, granularity) ||
            this.maxDateMoment && model.isAfter(this.maxDateMoment, granularity)) {
            return true;
        }
        return false;
    }

    // Input events callbacks

    private onInputFocus() {
        this.open();
    }

    private onInputBlur() {
        this.close().then(() => {
            this.viewValue = this.format(this.value);
        });
    }

    private onInputClick() {
        this.open();
    }

    // Dropdown events callbacks

    private onDropdownClick() {
        this.open();
    }

    private onLeftButtonClick() {
        if (!this.selectedView.previousDisabled) {
            this.selectedView.previous();
        }
    }

    private onRightButtonClick() {
        if (!this.selectedView.nextDisabled) {
            this.selectedView.next();
        }
    }

    private onTitleClick() {
        this.setPreviousView();
    }

    private onDropdownItemClick(viewItem: IViewItem) {
        if (!viewItem.disabled) {
            // update view model
            this.selectedView.setDate(viewItem);
            // now change view or close th picker
            if (this._selectedViewType === this.maxView) {
                // set model and close the picker
                this.writeValue(this.viewDate.toDate());
                this.close();
            } else {
                // go to next view
                this.setNextView();
            }
        }
    }
}