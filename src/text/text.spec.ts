import { testComponent, findElement, detectChanges } from '../utility/test';
import { TextComponent } from './text';
import { fakeAsync } from '@angular/core/testing';

describe('TextComponent', () => {
    it('should set value', fakeAsync(() => {
        // preparation
        const value = 'John Doe';
        const component = testComponent(TextComponent, { value });
        const inputEl = findElement<HTMLInputElement>('input');

        // testing
        detectChanges();
        expect(inputEl.value).toBe(value);

        // test value update
        const newValue = 'Foo Bar';
        component.value = newValue;
        detectChanges();
        expect(inputEl.value).toBe(newValue);
    }));

    it('should have placeholder set', () => {
        // preparation
        const placeholder = 'Type something...';
        testComponent(TextComponent, { placeholder });
        const inputEl = findElement<HTMLInputElement>('input');

        // testing
        expect(inputEl.placeholder).toBe(placeholder);
    });

    it('should enable/disable the input', fakeAsync(() => {
        // preparation
        let disabled = false;
        const component = testComponent(TextComponent, { disabled });
        const inputEl = findElement<HTMLInputElement>('input');

        // testing
        expect(inputEl.disabled).toBe(disabled);
        
        disabled = true;
        component.disabled = disabled;
        detectChanges();
        expect(inputEl.disabled).toBe(disabled);
        
        disabled = false;
        component.disabled = disabled;
        detectChanges();
        expect(inputEl.disabled).toBe(disabled);
    }));
});