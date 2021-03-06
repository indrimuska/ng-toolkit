import * as moment from 'moment';
import { DateComponent } from '../date';
import { AbstractView, IViewItem } from '../definitions';

export class MonthView extends AbstractView {
    private static readonly titleFormat = 'MMMM YYYY';
    private static readonly itemFormat = 'D';
    private static readonly itemsPerLine = moment.weekdays().length;

    public header: string[] = moment.weekdays().map((d: string, i: number) => {
        return moment().locale(this.component.locale).startOf('week').add(i, 'day').format('dd');
    });

    /** formats: D,DD,DDD,DDDD,d,dd,ddd,dddd,DDDo,Do,do,W,WW,w,ww,Wo,wo,E,e,L,LL,l,ll */
    public readonly formatsRegExp: string = '[Dd]{1,4}(?![Ddo])|DDDo|[Dd]o|[Ww]{1,2}(?![Wwo])|[Ww]o|[Ee]|L{1,2}(?!T)|l{1,2}';

    public previous(): void {
        this.component.viewDate.subtract(1, 'month');
        this.render();
    }

    public next(): void {
        this.component.viewDate.add(1, 'month');
        this.render();
    }

    public setDate(viewItem: IViewItem): void {
        this.component.viewDate
            .year(viewItem.model.year())
            .month(viewItem.model.month())
            .date(viewItem.model.date());
    }

    public render(): void {
        // set title
        this.title = this.component.viewDate.format(MonthView.titleFormat);

        // build body
        let model = this.component.viewDate.clone().startOf('month').startOf('week').hour(12);
        const firstWeek: number = model.week();
        const lastWeek: number = firstWeek + 5;
        const today = moment(new Date());

        this.rows = [];
        for (let week = 0; week <= lastWeek - firstWeek; week++) {
            for (let d = 0; d < MonthView.itemsPerLine; d++) {
                if (!this.rows[week]) this.rows[week] = [];
                this.rows[week][d] = {
                    model: model,
                    key: model.date(),
                    label: model.format(MonthView.itemFormat),
                    today: model.isSame(today, 'day'),
                    external: !model.isSame(this.component.viewDate, 'month'),
                    selected: this.component.isSelected(model, 'day'),
                    disabled: this.component.isDisabled(model, 'day')
                };
                model = model.clone().add(1, 'day');
            }
        }

        // set limits on adjacent views
        this.previousDisabled = this.component.isDisabled(this.component.viewDate.clone().startOf('month').subtract(1, 'day'), 'day');
        this.nextDisabled = this.component.isDisabled(this.component.viewDate.clone().endOf('month').add(1, 'day'), 'day');
    }
}