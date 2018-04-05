import { Type } from '@angular/core';
import { TestBed, ComponentFixture, tick as ngTick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export const prepareTest = <T>(component: Type<T>, props?: Partial<T>) => {
    const fixture = TestBed.createComponent(component);
    if (props) {
        Object.keys(props).forEach(key => {
            fixture.componentInstance[key] = props[key];
        });
    }
    fixture.autoDetectChanges(true);
    fixture.detectChanges();
    return fixture;
};

export const findElement = <T extends HTMLElement>(fixture: ComponentFixture<any>, query: string): T => {
    return fixture.debugElement.query(By.css(query)).nativeElement as T;
};