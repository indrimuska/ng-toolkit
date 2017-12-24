import { Route } from '@angular/router';
import { Autocomplete } from './autocomplete/autocomplete';

export const routes: Route[] = [
    { path: '', redirectTo: '/autocomplete', pathMatch: 'full' },
    { path: 'autocomplete', component: Autocomplete }
];