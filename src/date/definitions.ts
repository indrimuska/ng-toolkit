import * as moment from 'moment';

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

export interface IView {
    title: string;
    header?: string[];
    rows: IViewItem[][];
    readonly formatsRegExp: string;

    previous(): void;
    next(): void;
    setDate(viewItem: IViewItem): void;
    render(): void;
}