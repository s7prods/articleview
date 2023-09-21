
globalThis.appInstance_ = Object.create(Object.prototype);

import { LoadingApp } from '../public/LoadingApp.js';
globalThis.appInstance_.ls = new LoadingApp(); // Loading State
//appInstance_.ls.waitUntil(window, 'load');
appInstance_.ls.show();

