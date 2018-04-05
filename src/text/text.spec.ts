import { prepareTest, findElement, detectChanges } from '../utility/test';
import { TextComponent } from './text';
import { fakeAsync } from '@angular/core/testing';

describe('TextComponent', () => {
    it('should set value', fakeAsync(() => {
        // preparation
        const value = 'John Doe';
        const fixture = prepareTest(TextComponent, { value });
        const inputEl = findElement<HTMLInputElement>('input');

        // testing
        inputEl.dispatchEvent(new Event('input'));
        detectChanges();
        expect(inputEl.value).toBe(value);

        // test value update
        const newValue = 'Foo Bar';
        fixture.componentInstance.value = newValue;
        inputEl.dispatchEvent(new Event('input'));
        detectChanges();
        expect(inputEl.value).toBe(newValue);
    }));

    it('should have placeholder set', () => {
        // preparation
        const placeholder = 'Type something...';
        const fixture = prepareTest(TextComponent, { placeholder });
        const inputEl = findElement<HTMLInputElement>('input');

        // testing
        expect(inputEl.placeholder).toBe(placeholder);
    });

    it('should enable/disable the input', fakeAsync(() => {
        // preparation
        let disabled = false;
        const fixture = prepareTest(TextComponent, { disabled });
        const inputEl = findElement<HTMLInputElement>('input');

        // testing
        expect(inputEl.disabled).toBe(disabled);
        
        disabled = true;
        fixture.componentInstance.disabled = disabled;
        detectChanges();
        expect(inputEl.disabled).toBe(disabled);
        
        disabled = false;
        fixture.componentInstance.disabled = disabled;
        fixture.detectChanges();
        detectChanges();
        expect(inputEl.disabled).toBe(disabled);
    }));
});