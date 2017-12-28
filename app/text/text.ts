import { Component } from '@angular/core';

@Component({
    template: require('./text.html')
})
export class TextComponent {
    public text: string = 'Hello world!';
}