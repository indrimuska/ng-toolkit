import { TestBed } from '@angular/core/testing';
import { TextComponent } from './text';

describe('TextComponent', () => {
    it('should have placeholder set', () => {
        const placeholder = 'Type something...';
        
        // create and set component
        const fixture = TestBed.createComponent(TextComponent);
        fixture.componentInstance.placeholder = placeholder;
        fixture.detectChanges();

        // verify results
        const inputEl = (fixture.debugElement.nativeElement as HTMLElement).querySelector('input');
        expect(inputEl.placeholder).toBe(placeholder);
    });
});