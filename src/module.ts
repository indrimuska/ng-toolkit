import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { InputComponent } from './input/input';
import { SelectComponent } from './select/select';
import { ControlComponent } from './control/control';

const COMPONENTS = [
    InputComponent,
    SelectComponent,
    ControlComponent,
];

@NgModule({
    imports: [
        // CommonModule,
        BrowserModule,
        FormsModule,
        HttpModule,
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class NgToolkit { }