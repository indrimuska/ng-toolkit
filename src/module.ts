import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ControlComponent } from './control/control';
import { InputComponent } from './input/input';
import { TextComponent } from './text/text';
import { NumberComponent } from './number/number';
import { SelectComponent } from './select/select';
import { AutocompleteComponent } from './autocomplete/autocomplete';
import { DateComponent } from './date/date';
import { CheckboxComponent } from './checkbox/checkbox';
import { RadioComponent } from './radio/radio';
import { ToggleComponent } from './toggle/toggle';

const COMPONENTS = [
    ControlComponent,
    TextComponent,
    NumberComponent,
    SelectComponent,
    AutocompleteComponent,
    DateComponent,
    CheckboxComponent,
    RadioComponent,
    ToggleComponent,
];

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
    ],
    declarations: COMPONENTS.concat(
        // private components
        InputComponent
    ),
    exports: COMPONENTS
})
export class NgToolkit { }