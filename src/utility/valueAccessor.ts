import { ControlValueAccessor } from '@angular/forms';

export abstract class ValueAccessor<T> implements ControlValueAccessor {
    private innerValue: T;

    protected changed: ((value: T) => void)[] = [];
    protected touched: (() => void)[] = [];

    protected get value(): T {
        return this.innerValue;
    }
    
    protected set value(value: T) {
        if (this.innerValue !== value) {
            this.innerValue = value;
            this.changed.forEach(f => f(value));
        }
    }

    public writeValue(value: T) {
        this.innerValue = value;
    }
    
    public registerOnChange(fn: (value: T) => void) {
        this.changed.push(fn);
    }
    
    public registerOnTouched(fn: () => void) {
        this.touched.push(fn);
    }

    public touch() {
        this.touched.forEach(f => f());
    }
}