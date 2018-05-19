// polyfills
import 'core-js';

// zone.js
import 'zone.js/dist/zone';
import 'zone.js/dist/proxy';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/long-stack-trace-zone';

// TestBed initialization
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { NgToolkit } from './module';

TestBed.initTestEnvironment(
    [BrowserDynamicTestingModule, NgToolkit],
    platformBrowserDynamicTesting()
);

// Webpack test context initialization
const context = require.context('.', true, /\.spec\.ts$/);
context.keys().map(context);