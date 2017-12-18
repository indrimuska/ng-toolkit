import * as moment from 'moment';
import { DateComponent } from '../date';
import { IView, IViewItem } from '../definitions';

export class HourView implements IView {
    private static readonly titleFormat = 'lll';
    private static readonly itemFormat = moment.localeData().longDateFormat('LT').replace(/[aA]/, '').trim();
    private static readonly itemsPerLine = 4;

    public title: string;
    public rows: IViewItem[][];

    constructor(private component: DateComponent) { }

    public previous(): void {
        this.component.viewDate.subtract(1, 'hour');
        this.render();
    }

    public next(): void {
        this.component.viewDate.add(1, 'hour');
        this.render();
    }

    public setDate(viewItem: IViewItem): void {
        this.component.viewDate
            .year(viewItem.model.year())
            .month(viewItem.model.month())
            .day(viewItem.model.day())
            .hour(viewItem.model.hour())
            .minute(viewItem.model.minute());
        this.component.selectedViewType = 'minute';
    }

    public previousView(): void {
        this.component.selectedViewType = 'day';
    }

    public render(): void {
        // set title
        this.title = this.component.viewDate.clone().startOf('hour').format(HourView.titleFormat);

        // build body
        const firstMinute = 0;
        const lastMinute = 59;
        const minutesStep = 5;
        const rows = Math.ceil((lastMinute - firstMinute + 1) / minutesStep / HourView.itemsPerLine) * HourView.itemsPerLine;
        const nextHour = this.component.viewDate.clone().startOf('hour').add(1, 'hour');
        let model = this.component.viewDate.clone().startOf('hour').minute(firstMinute);
        
        this.rows = [];
        for (let i = 0; i < rows; i++) {
            const index = Math.floor(i / HourView.itemsPerLine);
            const disabled = model.isSameOrAfter(nextHour, 'minute');
			if (!this.rows[index]) this.rows[index] = [];
			this.rows[index].push({
                model: model,
                key: model.minute(),
                label: !disabled ? model.format(HourView.itemFormat) : '',
                disabled: disabled
			});
            model = model.clone().add(minutesStep, 'minutes');
		}
    }
}