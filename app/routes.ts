import { Route } from '@angular/router';

import { TextComponent } from './text/text';
import { NumberComponent } from './number/number';
import { AutocompleteComponent } from './autocomplete/autocomplete';
import { SelectComponent } from './select/select';
import { DateComponent } from './date/date';
import { ToggleComponent } from './toggle/toggle';
import { CheckboxComponent } from './checkbox/checkbox';
import { RadioComponent } from './radio/radio';

export interface IRoute extends Route {
    label?: string;
}

export const routes: IRoute[] = [
    // { path: '', redirectTo: '/autocomplete', pathMatch: 'full' },
    { path: 'text', component: TextComponent, label: 'Text' },
    { path: 'number', component: NumberComponent, label: 'Number' },
    { path: 'select', component: SelectComponent, label: 'Select' },
    { path: 'autocomplete', component: AutocompleteComponent, label: 'Autocomplete' },
    { path: 'date', component: DateComponent, label: 'Date' },
    { path: 'toggle', component: ToggleComponent, label: 'Toggle' },
    { path: 'checkbox', component: CheckboxComponent, label: 'Checkbox' },
    { path: 'radio', component: RadioComponent, label: 'Radio' },
];