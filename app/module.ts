import { NgModule } from '@angular/core';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';

import { NgToolkit } from '../src/module';
import { Main } from './main/main';

import { routes } from './routes';

@NgModule({
    providers: [
        { provide: APP_BASE_HREF, useValue: '/ng-toolkit/' }
    ],
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