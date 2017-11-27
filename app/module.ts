import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { NgToolkit } from '../src/module';
import { Main } from './main/main';

@NgModule({
    imports: [
        // BrowserModule,
        FormsModule,
        NgToolkit
    ],
    declarations: [
        Main
    ],
    bootstrap: [
        Main
    ]
})
export class Module { }