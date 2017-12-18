import * as moment from 'moment';
import { DateComponent } from '../date';
import { IView, IViewItem } from '../definitions';

export class MinuteView implements IView {
    private static readonly titleFormat = 'lll';
    private static readonly itemFormat = 'ss';
    private static readonly itemsPerLine = 6;

    public title: string;
    public rows: IViewItem[][];

    constructor(private component: DateComponent) { }

    public previous(): void {
        this.component.viewDate.subtract(1, 'minute');
        this.render();
    }

    public next(): void {
        this.component.viewDate.add(1, 'minute');
        this.render();
    }

    public setDate(viewItem: IViewItem): void {
        this.component.viewDate
            .year(viewItem.model.year())
            .month(viewItem.model.month())
            .day(viewItem.model.day())
            .hour(viewItem.model.hour())
            .minute(viewItem.model.minute())
            .second(viewItem.model.second());
        // this.component.selectedViewType = 'second'; // no more views
    }

    public previousView(): void {
        this.component.selectedViewType = 'hour';
    }

    public render(): void {
        // set title
        this.title = this.component.viewDate.clone().startOf('minute').format(MinuteView.titleFormat);

        // build body
        const firstSecond = 0;
        const lastSecond = 59;
        const minutesStep = 1;
        const rows = Math.ceil((lastSecond - firstSecond + 1) / minutesStep / MinuteView.itemsPerLine) * MinuteView.itemsPerLine;
        const nextMinute = this.component.viewDate.clone().startOf('minute').add(1, 'minute');
        let model = this.component.viewDate.clone().startOf('minute').second(firstSecond);
        
        this.rows = [];
        for (let i = 0; i < rows; i++) {
            const index = Math.floor(i / MinuteView.itemsPerLine);
            const disabled = model.isSameOrAfter(nextMinute, 'second');
			if (!this.rows[index]) this.rows[index] = [];
			this.rows[index].push({
                model: model,
                key: model.second(),
                label: !disabled ? model.format(MinuteView.itemFormat) : '',
                disabled: disabled
			});
            model = model.clone().add(minutesStep, 'seconds');
		}
    }
}