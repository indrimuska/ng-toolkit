import { ControlValueAccessor } from '@angular/forms';

export abstract class ValueAccessor<M, V = M> implements ControlValueAccessor {
    private modelValue: M;
    private _viewValue: V;

    protected changed: ((value: M) => void)[] = [];
    protected touched: (() => void)[] = [];

    protected get viewValue(): V {
        return this._viewValue;
    }

    protected set viewValue(value: V) {
        this._viewValue = value;
        // component <- select
        this.value = this.parse(value);
    }
    
    protected get value(): M {
        return this.modelValue;
    }
    
    protected set value(value: M) {
        if (this.modelValue !== value) {
            this.modelValue = value;
            this.changed.forEach(f => f(value));
        }
    }

    protected parse(value: V): M {
        return value as any;
    }

    protected format(value: M): V {
        return value as any;
    }

    public writeValue(value: M) {
        this.modelValue = value;
        // component -> select
        this.viewValue = this.format(value);
    }
    
    public registerOnChange(fn: (value: M) => void) {
        this.changed.push(fn);
    }
    
    public registerOnTouched(fn: () => void) {
        this.touched.push(fn);
    }

    public touch() {
        this.touched.forEach(f => f());
    }
}