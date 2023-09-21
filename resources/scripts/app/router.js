
import { CalViewByUrl } from './viewer.js';

globalThis.appInstance_.RouteFunc = {
    '\x00404'(url) {

    },
    '/web/viewer'(url) {
        CalViewByUrl(url);
    },
    '/settings/'(url) {

    },
};


export function ExecRoute(RouteProc) {
    RouteProc.call(globalThis, hashUrl);
}
export function DoRoute() {
    const path = hashUrl.pathname;
    const route = Reflect.get(globalThis.appInstance_.RouteFunc, path);
    if (!route) {
        const route = globalThis.appInstance_.RouteFunc['\x00404'];
        return ExecRoute(route);
    }

    ExecRoute(route);
}


globalThis.addEventListener('hashchange', DoRoute);

queueMicrotask(DoRoute);



