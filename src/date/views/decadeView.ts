import * as moment from 'moment';
import { DateComponent } from '../date';
import { IView, IViewItem } from '../definitions';

export class DecadeView implements IView {
    private static readonly itemFormat = 'YYYY';
    private static readonly itemsPerLine = 4;

    public title: string;
    public rows: IViewItem[][];
    
    /** formats: Y,YY,YYYY,L,LL,LLL,LLLL,l,ll,lll,llll */
    public readonly formatsRegExp: string = 'Y{1,2}(?!Y)|YYYY|[Ll]{1,4}(?!T)';

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
                external: i === 0 || i === 11,
                selected: this.component.isSelected(model, 'year')
			});
            model = model.clone().add(1, 'year');
		}
    }
}