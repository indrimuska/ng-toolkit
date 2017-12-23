import * as moment from 'moment';
import { DateComponent } from './date';

export type ViewType = 'decade' | 'year' | 'month' | 'day' | 'hour' | 'minute';

export interface IViewItem {
    /** Identifier for the item */
    key: number;
    /** Label to be shown in the view */
    label: string;
    /** Moment.js object related to the item */
    model: moment.Moment;
    /** Is it today? */
    today?: boolean;
    /** Is it disabled? */
    disabled?: boolean;
    /** Is it part of other views (e.g. other month)? */
    external?: boolean;
    /** Is it the selected date? */
    selected?: boolean;
    /** Is it highlighted using keyboard arrows? */
    highlighted?: boolean;
}

export abstract class AbstractView {
    public title: string;
    public previousDisabled: boolean;
    public nextDisabled: boolean;
    public header?: string[];
    public rows: IViewItem[][];
    public readonly formatsRegExp: string;

    public abstract previous(): void;
    public abstract next(): void;
    public abstract setDate(viewItem: IViewItem): void;
    public abstract render(): void;

    constructor(protected component: DateComponent) { }
}