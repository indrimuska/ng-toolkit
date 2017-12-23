import * as moment from 'moment';
import { DateComponent } from '../date';
import { AbstractView, IViewItem } from '../definitions';

export class DayView extends AbstractView {
    private static readonly titleFormat = 'LL';
    private static readonly itemFormat = 'HH:[00]';
    private static readonly itemsPerLine = 4;

    /** formats: H,HH,h,hh,LT,LTS */
    public readonly formatsRegExp: string = '[Hh]{1,2}|LTS?';

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
                label: model.format(DayView.itemFormat),
                selected: this.component.isSelected(model, 'hour'),
                disabled: this.component.isDisabled(model, 'hour')
			});
			model = model.clone().add(1, 'hour');
        }

        // set limits on adjacent views
        this.previousDisabled = this.component.isDisabled(this.component.viewDate.clone().startOf('day').subtract(1, 'hour'), 'hour');
        this.nextDisabled = this.component.isDisabled(this.component.viewDate.clone().endOf('day').add(1, 'hour'), 'hour');
    }
}