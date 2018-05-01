import { fakeAsync } from '@angular/core/testing';
import { testComponent, detectChanges, findElement } from '../utility/test';
import { NumberComponent } from './number';

describe('NumberComponent', () => {
    describe('using default formatter', () => {
        it('should format a value', fakeAsync(() => {
            const component = testComponent(NumberComponent);
            const inputEl = findElement<HTMLInputElement>('input');

            component.value = 123456.34567;
            detectChanges();
            expect(inputEl.value).toBe('123.456,34567');
        }));
    });
});