import * as moment from 'moment';
import { DateComponent } from '../date';
import { IView, IViewItem } from '../definitions';

export class YearView implements IView {
    private static readonly titleFormat = 'YYYY';
    private static readonly itemFormat = 'MMM';
    private static readonly itemsPerLine = 4;

    public title: string;
    public rows: IViewItem[][];

    constructor(private component: DateComponent) { }

    public previous(): void {
        this.component.viewDate.subtract(1, 'year');
        this.render();
    }

    public next(): void {
        this.component.viewDate.add(1, 'year');
        this.render();
    }

    public setDate(viewItem: IViewItem): void {
        this.component.viewDate
            .year(viewItem.model.year())
            .month(viewItem.model.month());
        this.component.selectedViewType = 'month';
    }

    public previousView(): void {
        this.component.selectedViewType = 'decade';
    }

    public render(): void {
        // set title
        this.title = this.component.viewDate.format(YearView.titleFormat);

        // build body
        let model = this.component.viewDate.clone().startOf('year');
        const months = moment.monthsShort();
        
        this.rows = [];
        months.forEach((monthName, i) => {
			const index = Math.floor(i / YearView.itemsPerLine);
			if (!this.rows[index]) this.rows[index] = [];
			this.rows[index].push({
                model: model,
                key: model.month(),
                label: model.format(YearView.itemFormat)
            });
			model = model.clone().add(1, 'month');
		});
    }
}