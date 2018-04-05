import { prepareTest, findElement } from '../utility/test';
import { TextComponent } from './text';
import { fakeAsync, tick } from '@angular/core/testing';

describe('TextComponent', () => {
    it('should set value', fakeAsync(() => {
        // preparation
        const value = 'John Doe';
        const fixture = prepareTest(TextComponent, { value });
        const inputEl = findElement<HTMLInputElement>(fixture, 'input');

        // testing
        inputEl.dispatchEvent(new Event('input'));
        tick();
        expect(inputEl.value).toBe(value);

        // test value update
        const newValue = 'Foo Bar';
        fixture.componentInstance.value = newValue;
        inputEl.dispatchEvent(new Event('input'));
        tick();
        expect(inputEl.value).toBe(newValue);
    }));

    it('should have placeholder set', () => {
        // preparation
        const placeholder = 'Type something...';
        const fixture = prepareTest(TextComponent, { placeholder });
        const inputEl = findElement<HTMLInputElement>(fixture, 'input');

        // testing
        expect(inputEl.placeholder).toBe(placeholder);
    });
});