import './UrlInit.js';
import { InitI18n } from "../public/i18n.js";
alert('sysinit js')

globalThis.appInstance_ = Object.create(Object.prototype);

import { LoadingApp } from '../public/LoadingApp.js';
globalThis.appInstance_.ls = new LoadingApp(); // Loading State
//appInstance_.ls.waitUntil(window, 'load');
globalThis.appInstance_.Sp = {};
globalThis.appInstance_.sp = new Promise(r => {
    alert('sysinit content')
    globalThis.appInstance_.Sp.done = () => {
        try {
            window.removeEventListener('error', window.global_error_handler);
            document.getElementById('ui-loading-content').remove();
        } catch {}
        delete globalThis.appInstance_.sp; delete globalThis.appInstance_.Sp; r(true);
    };

    alert('sysinit init')
    InitI18n('./i18n/lang/zh-cn.json').then(() => {
    alert('sysinit ok')
        const script = document.createElement('script');
        script.type = 'module';
        script.src = './resources/main.js';
        (document.body || document.documentElement).append(script);
    }).catch(err => setTimeout(() => { throw (err) }));
});
appInstance_.ls.waitUntil(globalThis.appInstance_.sp);

