import * as moment from 'moment';
import { DateComponent } from '../date';
import { IView, IViewItem } from '../definitions';

export class DayView implements IView {
    private static readonly titleFormat = 'LL';
    private static readonly itemFormat = 'HH:[00]';
    private static readonly itemsPerLine = 4;

    public title: string;
    public rows: IViewItem[][];

    constructor(private component: DateComponent) { }

    public previous(): void {
        this.component.viewDate.subtract(1, 'day');
        this.render();
    }

    public next(): void {
        this.component.viewDate.add(1, 'day');
        this.render();
    }

    public setDate(viewItem: IViewItem): void {
        this.component.viewDate
            .year(viewItem.model.year())
            .month(viewItem.model.month())
            .day(viewItem.model.day())
            .hour(viewItem.model.hour());
        this.component.selectedViewType = 'hour';
    }

    public previousView(): void {
        this.component.selectedViewType = 'month';
    }

    public render(): void {
        // set title
        this.title = this.component.viewDate.format(DayView.titleFormat);

        // build body
        const firstHour = 0;
        const lastHour = 23;
        let model = this.component.viewDate.clone().startOf('day').hour(firstHour);
        
        this.rows = [];
        for (let i = 0; i <= lastHour - firstHour; i++) {
			const index = Math.floor(i / DayView.itemsPerLine);
			if (!this.rows[index]) this.rows[index] = [];
			this.rows[index].push({
                key: i, // KEY is not the hour, in order to avoid DST conflicts
                model: model,
                label: model.format(DayView.itemFormat)
			});
			model = model.clone().add(1, 'hour');
        }
    }
}