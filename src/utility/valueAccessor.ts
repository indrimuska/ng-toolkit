import { ControlValueAccessor } from '@angular/forms';

export abstract class ValueAccessor<ModelValue, ViewValue = ModelValue> implements ControlValueAccessor {
    private _modelValue: ModelValue = null;
    private _viewValue: ViewValue = null;

    /**
     * Model used in the controller
     */
    protected get modelValue(): ModelValue {
        return this._modelValue;
    }
    protected set modelValue(modelValue: ModelValue) {
        if (this._modelValue !== modelValue) {
            this._modelValue = modelValue;
            this.changed();
        }
    }

    /**
     * Formatted value used in the view
     */
    protected get viewValue(): ViewValue {
        return this._viewValue;
    }
    protected set viewValue(viewValue: ViewValue) {
        if (this._viewValue !== viewValue) {
            this._viewValue = viewValue;
            this.modelValue = this.parse(viewValue);
        }
    }

    /**
     * Value is just a public forwarded reference to the ModelValue
     */
    public get value(): ModelValue {
        return this.modelValue;
    }
    public set value(modelValue: ModelValue) {
        this.modelValue = modelValue;
        this.updateView();
    }

    /**
     * Sync the view with the model
     */
    protected updateView() {
        this.viewValue = this.format(this.modelValue);
    }

    private changedListeners: ((value: ModelValue) => void)[] = [];
    private touchedListeners: (() => void)[] = [];

    protected changed() {
        this.changedListeners.forEach(fn => fn(this.modelValue));
    }

    protected touched() {
        this.touchedListeners.forEach(fn => fn());
    }

    /**
     * @implements
     * Writes a new value to the element.
     * This method will be called by the forms API to write to the view when programmatic (model -> view) changes are requested.
     */
    public writeValue(modelValue: ModelValue) {
        // update view only if model has been changed
        if (this.modelValue !== modelValue) {
            this.modelValue = modelValue;
            this.updateView();
        }
    }

    /**
     * @implements
     * Registers a callback function that should be called when the control's value changes in the UI.
     * This is called by the forms API on initialization so it can update the form model when values propagate from the view (view -> model).
     * If you are implementing `registerOnChange` in your own value accessor, you will typically want to save the given function
     * so your class can call it at the appropriate time.
     */
    public registerOnChange(fn: (value: ModelValue) => void): () => void {
        this.changedListeners.push(fn);
        // unregistration function (pop from array)
        return () => setTimeout(() => {
            const index = this.changedListeners.indexOf(fn);
            if (index >= 0) this.changedListeners.splice(index, 1);
        });
    }

    /**
     * @implements
     * Registers a callback function that should be called when the control receives a blur event.
     * This is called by the forms API on initialization so it can update the form model on blur.
     * If you are implementing `registerOnTouched` in your own value accessor, you will typically want to save the given function
     * so your class can call it when the control should be considered blurred (a.k.a. "touched").
     */
    public registerOnTouched(fn: () => void) {
        this.touchedListeners.push(fn);
    }

    /**
     * @implements
     * This function is called by the forms API when the control status changes to or from "DISABLED".
     * Depending on the value, it should enable or disable the appropriate DOM element.
     */
    // setDisabledState(isDisabled: boolean): void {}

    /**
     * Format a model value (ModelValue -> ViewValue)
     */
    protected format(value: ModelValue): ViewValue {
        return value as any;
    }

    /**
     * Parse a view value (ViewValue -> ModelValue)
     */
    protected parse(value: ViewValue): ModelValue {
        return value as any;
    }
}