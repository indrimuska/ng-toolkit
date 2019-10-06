import { fakeAsync } from '@angular/core/testing';
import { testComponent, detectChanges, findElement } from '../utility/test';
import { NumberComponent } from './number';

describe('NumberComponent', () => {
    describe('using default separators', () => {
        let component: NumberComponent;
        let inputEl: HTMLInputElement;

        beforeEach(() => {
            component = testComponent(NumberComponent);
            inputEl = findElement<HTMLInputElement>('input');
        });

        it('should format a value', fakeAsync(() => {
            component.value = 1234563.4567;
            detectChanges();
            expect(inputEl.value).toBe('1.234.563,4567');
            component.value = 54234.234;
            detectChanges();
            expect(inputEl.value).toBe('54.234,234');
        }));

        it('should prevent letter typing', fakeAsync(() => {
            component.value = 1234;
            detectChanges();
            expect(inputEl.value).toBe('1.234');

            inputEl.dispatchEvent(new window.KeyboardEvent('keypress', { key: 'a' }));
            detectChanges();
            expect(inputEl.value).toBe('1.234');
            // inputEl.dispatchEvent(new KeyboardEvent('keypress', { key: '5' }));
            // inputEl.dispatchEvent(new KeyboardEvent('keypress', { key: 'c' }));
            // expect(inputEl.value).toBe('1.2345');
            // inputEl.dispatchEvent(new KeyboardEvent('keypress', { key: '.' }));
            // inputEl.dispatchEvent(new KeyboardEvent('keypress', { key: '.' }));
            // inputEl.dispatchEvent(new KeyboardEvent('keypress', { key: '.' }));
            // expect(inputEl.value).toBe('1.2345...');
            // inputEl.dispatchEvent(new KeyboardEvent('keypress', { key: ',' }));
            // expect(inputEl.value).toBe('1.2345...,');
            // inputEl.dispatchEvent(new KeyboardEvent('keypress', { key: 'e' }));
            // inputEl.dispatchEvent(new KeyboardEvent('keypress', { key: '6' }));
            // expect(inputEl.value).toBe('1.2345...,6');
            // // reset on blur
            // inputEl.dispatchEvent(new Event('blur'));
            // expect(inputEl.value).toBe('12.345,6');
        }));
    });

    it('should format a value using custom separtors', fakeAsync(() => {
        const component = testComponent(NumberComponent, { decimalSeparator: '-', thousandSeparator: '|' });
        const inputEl = findElement<HTMLInputElement>('input');

        component.value = 1234563.4567;
        detectChanges();
        expect(inputEl.value).toBe('1|234|563-4567');
        component.value = 54234.234;
        detectChanges();
        expect(inputEl.value).toBe('54|234-234');
    }));
});