import * as moment from 'moment';
import { Component, OnInit, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { isNullOrUndefined } from 'util';

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
            type="text"
            [(ngModel)]="viewValue"
            (focus)="onInputFocus()"
            (blur)="onInputBlur()">
        </ngt-input>
        <div
            #dropdownRef
            class="ngt-date-dropdown"
            [ngClass]="'ngt-view-' + _selectedViewType"
            (mousedown)="onDropdownClick()">
            <div class="ngt-date-dropdown-title">
                <div class="ngt-date-dropdown-title-button left" (click)="onLeftButtonClick()"></div>
                <div class="ngt-date-dropdown-title-label" (click)="onTitleClick()">{{ selectedView?.title }}</div>
                <div class="ngt-date-dropdown-title-button right" (click)="onRightButtonClick()"></div>
            </div>
            <!-- header -->
            <div class="ngt-date-dropdown-header" *ngIf="selectedView?.header">
                <div
                    *ngFor="let header of selectedView?.header"
                    class="ngt-date-dropdown-item">
                    {{ header }}
                </div>
            </div>
            <!-- body -->
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
    public value: Date;
    @Input() public disabled: boolean;
    @Input() public placeholder: string;
    @Input('format') public viewFormat: string;
    @Input() public locale: string = 'en';
    @Input() public minView: ViewType;
    @Input() public maxView: ViewType;
    @Input() public startView: ViewType = 'month';
    @Input() public minDate: Date;
    @Input() public maxDate: Date;
    @Input() public startDate: Date;

    public viewDate: moment.Moment;
    private views: { [name: string]: IView } = {
        'decade': new DecadeView(this),
        'year': new YearView(this),
        'month': new MonthView(this),
        'day': new DayView(this),
        'hour': new HourView(this),
        'minute': new MinuteView(this),
    };
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

    public ngOnInit() {
        // initialization
        if (!this.startDate) this.startDate = this.value;
        this.viewDate = moment(this.startDate);
        // render
        this.selectedViewType = this.startView;
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

    // Input events callbacks

    private onInputFocus() {
    }
    
    private onInputBlur() {
    }
    
    // Dropdown events callbacks
    
    private onDropdownClick() {
        // this.forceOpen = true;

        // // prevent dropdown close
        // this.dropdownClosePrevented = true;
        // setTimeout(() => this.dropdownClosePrevented = false, 50);
    }

    private onLeftButtonClick() {
        this.selectedView.previous();
    }
    
    private onRightButtonClick() {
        this.selectedView.next();
    }

    private onTitleClick() {
        this.selectedView.previousView();
    }

    private onDropdownItemClick(viewItem: IViewItem) {
        if (!viewItem.disabled) {
            this.selectedView.setDate(viewItem);
        }
    }
}