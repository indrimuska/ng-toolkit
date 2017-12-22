import { ControlValueAccessor } from '@angular/forms';

export abstract class ValueAccessor<M, V = M> implements ControlValueAccessor {
    private modelValue: M;
    private _viewValue: V;

    protected changed: ((value: M) => void)[] = [];
    protected touched: (() => void)[] = [];

    protected get viewValue(): V {
        return this._viewValue;
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

    // component <- model
    protected set viewValue(value: V) {
        this._viewValue = value;
        this.value = this.parse(value);
    }

    // viewValue -> modelValue
    protected parse(value: V): M {
        return value as any;
    }
    
    // viewValue <- modelValue
    protected format(value: M): V {
        return value as any;
    }

    // component -> model
    public writeValue(value: M) {
        this.modelValue = value;
        this.viewValue = this.format(value);
    }

    constructor() {
        const unregister = this.registerOnChange(() => {
            this.afterInit();
            unregister();
        });
    }

    protected afterInit() { }
    
    public registerOnChange(fn: (value: M) => void): () => void {
        this.changed.push(fn);
        return () => this.changed.splice(this.changed.indexOf(fn), 1);
    }
    
    public registerOnTouched(fn: () => void) {
        this.touched.push(fn);
    }

    public touch() {
        this.touched.forEach(f => f());
    }
}