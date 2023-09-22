import { RegisterUrlObject } from '../../url.js';

alert('urlinit js')
RegisterUrlObject('currentUrl', () => location.href, v => location = v);
RegisterUrlObject('hashUrl', () => {
    const url = new URL(location.hash.substring(1), location.href);
    return url.href;
}, v => location = v, hh => {
    const h = location.hash;
    if (h == hh) return false;
    return h;
});
