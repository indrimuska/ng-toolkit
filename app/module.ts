import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';

import { NgToolkit } from '../src/module';
import { Main } from './main/main';
import { Autocomplete } from './autocomplete/autocomplete';

import { routes } from './routes';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgToolkit,
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        Main,
        Autocomplete,
    ],
    bootstrap: [
        Main
    ]
})
export class Module { }