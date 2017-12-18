import * as moment from 'moment';
import { DateComponent } from '../date';
import { IView, IViewItem } from '../definitions';

export class DecadeView implements IView {
    private static readonly itemFormat = 'YYYY';
    private static readonly itemsPerLine = 4;

    public title: string;
    public rows: IViewItem[][];
    
    /** formats: formats: M,MM,MMM,MMM,Mo,Q */
    public readonly formatsRegExp: string = 'M{1,4}(?![Mo])|Mo|Q';

    constructor(private component: DateComponent) { }

    public previous(): void {
        this.component.viewDate.subtract(10, 'years');
        this.render();
    }

    public next(): void {
        this.component.viewDate.add(10, 'years');
        this.render();
    }

    public setDate(viewItem: IViewItem): void {
        this.component.viewDate
            .year(viewItem.model.year());
    }

    public render(): void {
        const firstYear = Math.floor(this.component.viewDate.year() / 10) * 10 - 1;
        let model = this.component.viewDate.clone().year(firstYear);
        
        // set title
        this.title = [
            model.clone().add(1, 'year').format('YYYY'),
            model.clone().add(10, 'years').format('YYYY')
        ].join(' - ');
        
        // build body
        this.rows = [];
        for (let i = 0; i < 12; i++) {
			const index = Math.floor(i / DecadeView.itemsPerLine);
			if (!this.rows[index]) this.rows[index] = [];
			this.rows[index].push({
                model: model,
                key: model.year(),
                label: model.format(DecadeView.itemFormat),
                external: i === 0 || i === 11
			});
            model = model.clone().add(1, 'year');
		}
    }
}