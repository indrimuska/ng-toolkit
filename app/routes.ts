import { Route } from '@angular/router';
import { AutocompleteComponent } from './autocomplete/autocomplete';
import { DateComponent } from './date/date';

export const routes: Route[] = [
    // { path: '', redirectTo: '/autocomplete', pathMatch: 'full' },
    { path: 'autocomplete', component: AutocompleteComponent },
    { path: '', component: DateComponent }
];