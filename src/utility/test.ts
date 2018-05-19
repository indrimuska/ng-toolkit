import { Type } from '@angular/core';
import { TestBed, ComponentFixture, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

let fixture: ComponentFixture<any>;

export const testComponent = <T>(component: Type<T>, props?: Partial<T>): T => {
    fixture = TestBed.createComponent(component);
    if (props) {
        Object.keys(props).forEach(key => {
            fixture.componentInstance[key] = props[key];
        });
    }
    fixture.autoDetectChanges(true);
    fixture.detectChanges();
    return fixture.componentInstance;
};

export const findElement = <T extends HTMLElement>(query: string): T => {
    return fixture.debugElement.query(By.css(query)).nativeElement as T;
};

export const detectChanges = () => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    tick();
};