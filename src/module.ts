import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ControlComponent } from './control/control';
import { InputComponent } from './input/input';
import { TextComponent } from './text/text';
import { NumberComponent } from './number/number';
import { SelectComponent } from './select/select';
import { CheckboxComponent } from './checkbox/checkbox';

const COMPONENTS = [
    ControlComponent,
    TextComponent,
    NumberComponent,
    SelectComponent,
    CheckboxComponent,
];

@NgModule({
    imports: [
        // CommonModule,
        BrowserModule,
        FormsModule,
        HttpModule,
    ],
    declarations: COMPONENTS.concat(
        // private components
        InputComponent,
        CheckboxComponent
    ),
    exports: COMPONENTS
})
export class NgToolkit { }