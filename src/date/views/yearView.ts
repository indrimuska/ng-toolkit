import * as moment from 'moment';
import { DateComponent } from '../date';
import { AbstractView, IViewItem } from '../definitions';

export class YearView extends AbstractView {
    private static readonly titleFormat = 'YYYY';
    private static readonly itemFormat = 'MMM';
    private static readonly itemsPerLine = 4;

    /** formats: M,MM,MMM,MMM,Mo,Q */
    public readonly formatsRegExp: string = 'M{1,4}(?![Mo])|Mo|Q';

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
                label: model.format(YearView.itemFormat),
                selected: this.component.isSelected(model, 'month'),
                disabled: this.component.isDisabled(model, 'month')
            });
            model = model.clone().add(1, 'month');
        });

        // set limits on adjacent views
        this.previousDisabled = this.component.isDisabled(this.component.viewDate.clone().startOf('year').subtract(1, 'month'), 'month');
        this.nextDisabled = this.component.isDisabled(this.component.viewDate.clone().endOf('year').add(1, 'month'), 'month');
    }
}