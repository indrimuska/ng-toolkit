import { ControlValueAccessor } from '@angular/forms';

export abstract class ValueAccessor<ModelValue, ViewValue = ModelValue> implements ControlValueAccessor {
    private modelValue: ModelValue;
    private _viewValue: ViewValue;

    protected changed: ((value: ModelValue) => void)[] = [];
    protected touched: (() => void)[] = [];

    protected get viewValue(): ViewValue {
        return this._viewValue;
    }
    
    protected get value(): ModelValue {
        return this.modelValue;
    }
    
    protected set value(value: ModelValue) {
        if (this.modelValue !== value) {
            this.modelValue = value;
            this.changed.forEach(f => f(value));
        }
    }

    // component <- model
    protected set viewValue(value: ViewValue) {
        this._viewValue = value;
        this.value = this.parse(value);
    }

    // viewValue -> modelValue
    protected parse(value: ViewValue): ModelValue {
        return value as any;
    }
    
    // viewValue <- modelValue
    protected format(value: ModelValue): ViewValue {
        return value as any;
    }

    // component -> model
    public writeValue(value: ModelValue) {
        this.modelValue = value;
        this.viewValue = this.format(value);
    }

    constructor() {
        const unregister = this.registerOnChange(() => {
            this.onModelInit();
            unregister();
        });
    }

    protected onModelInit() { }
    
    public registerOnChange(fn: (value: ModelValue) => void): () => void {
        this.changed.push(fn);
        // unregistration function (pop from array)
        return () => setTimeout(() => {
            const index = this.changed.indexOf(fn);
            if (index >= 0) this.changed.splice(index, 1);
        });
    }
    
    public registerOnTouched(fn: () => void) {
        this.touched.push(fn);
    }

    public touch() {
        this.touched.forEach(f => f());
    }
}