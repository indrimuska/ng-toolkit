import { Component } from '@angular/core';
import { Route } from '@angular/router';

import '!style-loader!css-loader!sass-loader!./main.scss';
import { routes } from '../routes';

@Component({
    selector: 'main',
    template: require('./main.html')
})
export class Main {
    public routes = routes;
}