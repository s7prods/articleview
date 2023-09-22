import './UrlInit.js';

globalThis.appInstance_ = Object.create(Object.prototype);

import { LoadingApp } from '../public/LoadingApp.js';
globalThis.appInstance_.ls = new LoadingApp(); // Loading State
//appInstance_.ls.waitUntil(window, 'load');
globalThis.appInstance_.Sp = {};
globalThis.appInstance_.sp = new Promise(r => {
    globalThis.appInstance_.Sp.done = () => {
        delete globalThis.appInstance_.sp; delete globalThis.appInstance_.Sp; r(true);
    };

    const script = document.createElement('script');
    script.type = 'module';
    script.src = './resources/main.js';
    (document.body || document.documentElement).append(script);
});
appInstance_.ls.waitUntil(globalThis.appInstance_.sp);

