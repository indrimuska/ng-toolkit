import * as moment from 'moment';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { isNullOrUndefined, isUndefined } from 'util';

import { InputComponent } from '../input/input';
import { ValueAccessor } from '../utility';
import { ViewType, IView, IViewItem } from './definitions';
import { DecadeView } from './views/decadeView';
import { YearView } from './views/yearView';
import { MonthView } from './views/monthView';
import { DayView } from './views/dayView';
import { HourView } from './views/hourView';
import { MinuteView } from './views/minuteView';

@Component({
    selector: 'ngt-date',
    template: `
        <ngt-input
            #inputRef
            type="text"
            [(ngModel)]="viewValue"
            [disabled]="disabled"
            (focus)="onInputFocus()"
            (blur)="onInputBlur()"
            (click)="onInputClick()">
        </ngt-input>
        <div
            #dropdownRef
            *ngIf="isOpen"
            class="ngt-date-dropdown"
            [ngClass]="'ngt-view-' + _selectedViewType"
            (click)="onDropdownClick()">

            <div class="ngt-date-dropdown-title">
                <div class="ngt-date-dropdown-title-button left" (click)="onLeftButtonClick()"></div>
                <div class="ngt-date-dropdown-title-label" (click)="onTitleClick()">{{ selectedView?.title }}</div>
                <div class="ngt-date-dropdown-title-button right" (click)="onRightButtonClick()"></div>
            </div>
            
            <div class="ngt-date-dropdown-header" *ngIf="selectedView?.header">
                <div
                    *ngFor="let header of selectedView?.header"
                    class="ngt-date-dropdown-item">
                    {{ header }}
                </div>
            </div>

            <div class="ngt-date-dropdown-body">
                <ng-container *ngIf="selectedView?.rows">
                    <div
                        *ngFor="let row of selectedView.rows"
                        class="ngt-date-dropdown-body-row">
                        <div
                            *ngFor="let item of row"
                            class="ngt-date-dropdown-item"
                            (click)="onDropdownItemClick(item)"
                            [ngClass]="{
                                today: item.today,
                                disabled: item.disabled,
                                external: item.external,
                                selected: item.selected,
                                highlighted: item.highlighted
                            }">
                            {{ item.label }}
                        </div>
                    </div>
                </ng-container>
            </div>
        </div>
    `,
    styles: [
        require('./date.scss')
    ],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: DateComponent, multi: true }
    ]
})
export class DateComponent extends ValueAccessor<Date, string> implements OnInit {
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

    @Input() public locale: string = 'en';

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
        if (minDate || this.minDateMoment) this.minDateMoment = moment(minDate);
    }
    private maxDateMoment: moment.Moment;
    @Input() public set maxDate(maxDate: Date) {
        if (maxDate || this.maxDateMoment) this.maxDateMoment = moment(maxDate);
    }
    private startDateMoment: moment.Moment;
    @Input() public set startDate(startDate: Date) {
        if (startDate || this.startDateMoment) this.startDateMoment = moment(startDate);
    }

    @ViewChild('inputRef') public inputRef: InputComponent<string>;
    @ViewChild('dropdownRef') public dropdownRef: ElementRef;

    private closeTimeout: number;
    private isOpen: boolean = false;
    public viewDate: moment.Moment = moment();
    private viewTypes: ViewType[] = [];
    private views: { [name: string]: IView } = {};
    private _selectedViewType: ViewType;
    public set selectedViewType(viewType: ViewType) {
        if (this.views[viewType]) {
            this._selectedViewType = viewType;
            this.selectedView.render();
        }
    }
    private get selectedView(): IView {
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
        // initialization
        this.detectMinMaxView();
    }

    public ngOnInit() {
        // initialization
        if (!this.startDate) this.startDate = this.value;
        this.viewDate = moment(this.startDate);
        // render
        this.selectedViewType = this.startView;
        this.isOpen = false;
    }

    /** @override */
    protected format(value: Date): string {
        return !isNullOrUndefined(value)
            ? moment(value).format(this.viewFormat)
            : '';
    }

    /** @override */
    protected parse(value: string): Date {
        return !isNullOrUndefined(value)
            ? moment(value, this.viewFormat).toDate()
            : value;
    }

    private registerView(type: ViewType, view: IView) {
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
        if (maxViewIndex <  this.viewTypes.indexOf(this.maxView)) this._maxView = this.viewTypes[maxViewIndex];
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

    private close() {
        if (!this.isOpen) return;

        this.closeTimeout = window.setTimeout(() => {
            this.isOpen = false;
            this.resetViews();
        }, 100);
    }

    // Input events callbacks

    private onInputFocus() {
        this.open();
    }
    
    private onInputBlur() {
        this.close();
    }

    private onInputClick() {
        this.open();
    }
    
    // Dropdown events callbacks
    
    private onDropdownClick() {
        this.open();
    }

    private onLeftButtonClick() {
        this.selectedView.previous();
    }
    
    private onRightButtonClick() {
        this.selectedView.next();
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