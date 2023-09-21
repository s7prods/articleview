
globalThis.appInstance_ = Object.create(Object.prototype);

import { LoadingApp } from '../public/LoadingApp.js';
globalThis.appInstance_.ls = new LoadingApp(); // Loading State
//appInstance_.ls.waitUntil(window, 'load');
globalThis.appInstance_.Sp = {};
globalThis.appInstance_.sp = new Promise(r => {
    globalThis.appInstance_.Sp.done = () => {
        delete globalThis.appInstance_.sp; delete globalThis.appInstance_.Sp; r(true);
    };
});
appInstance_.ls.waitUntil(globalThis.appInstance_.sp);

