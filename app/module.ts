import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';

import { NgToolkit } from 'ng-toolkit';
import { Main } from './main/main';

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
        ...routes.filter(route => route.component).map(route => route.component)
    ],
    bootstrap: [
        Main
    ]
})
export class Module { }