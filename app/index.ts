// polyfill
import 'core-js';

// zone.js
import 'zone.js';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { Module } from './module';

platformBrowserDynamic().bootstrapModule(Module);