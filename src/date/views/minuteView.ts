import * as moment from 'moment';
import { DateComponent } from '../date';
import { AbstractView, IViewItem } from '../definitions';

export class MinuteView extends AbstractView {
    private static readonly titleFormat = 'lll';
    private static readonly itemFormat = 'ss';
    private static readonly itemsPerLine = 6;

    /** formats: s,ss,S,SS,SSS..,X,LTS */
    public readonly formatsRegExp: string = 's{1,2}|S{1,}|X|LTS';

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
                selected: this.component.isSelected(model, 'second'),
                disabled: disabled || this.component.isDisabled(model, 'second')
            });
            model = model.clone().add(minutesStep, 'seconds');
        }

        // set limits on adjacent views
        this.previousDisabled = this.component.isDisabled(this.component.viewDate.clone().startOf('minute').subtract(1, 'second'), 'second');
        this.nextDisabled = this.component.isDisabled(this.component.viewDate.clone().endOf('minute').add(1, 'second'), 'second');
    }
}