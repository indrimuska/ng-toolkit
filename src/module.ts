import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { InputComponent } from './input/input';
import { SelectComponent } from './select/select';

@NgModule({
    imports: [
        // CommonModule,
        BrowserModule,
        FormsModule,
        HttpModule,
    ],
    declarations: [
        InputComponent,
        SelectComponent,
    ],
    exports: [
        InputComponent,
        SelectComponent,
    ]
})
export class NgToolkit { }