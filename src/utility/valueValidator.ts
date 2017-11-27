import { Optional, Inject, ViewChild } from '@angular/core';
import { NgModel, NG_VALIDATORS, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Observable } from 'rxjs';

import { AsyncValidatorArray, ValidatorArray, ValidationResult, message, validate } from './validate';
import { ValueAccessor } from './valueAccessor';

export abstract class ValueValidator<T> extends ValueAccessor<T> {
    // @ViewChild(NgModel) public model: NgModel;
    protected abstract model: NgModel;

    constructor(
        @Optional() @Inject(NG_VALIDATORS) private validators: Array<any>,
        @Optional() @Inject(NG_ASYNC_VALIDATORS) private asyncValidators: Array<any>,
    ) {
        super();
    }

    protected validate(): Observable<ValidationResult> {
        return validate(this.validators, this.asyncValidators)(this.model.control);
    }

    protected get invalid(): Observable<boolean> {
        return this.validate().map(v => Object.keys(v || {}).length > 0);
    }

    protected get failures(): Observable<string[]> {
        return this.validate().map(v => Object.keys(v).map(k => message(v, k)));
    }
}