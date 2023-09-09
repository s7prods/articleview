const theme = hashUrl.searchParams.get('theme') || hashUrl.searchParams.get('hk4e_theme') || '';
const themePath = theme.split('/');

import { addCSS } from '../public/BindMove.js';

if (typeof (themePath[0]) === 'string') {
    const themeRoot = themePath[0].replace(/[\/\\\:\"\']/ig, '');
    if (themeRoot) fetch('./themes/css/' + themeRoot + '.css').then(v => {
        if (!v.ok) throw new Error('HTTP Error ' + v.status);
        return v.text();
    }).then(t => {
        addCSS(t);
    }).catch(error => console.error('[ThemeParser]', 'Cannot load theme', theme, ':', error));
}


let colorTheme_link = null;
export function reloadColorTheme() {
    const colorTheme = hashUrl.searchParams.get('color') == 'dark' ? 'dark' : 'light';
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './themes/colorTheme/' + colorTheme + '.css';
    colorTheme_link ? colorTheme_link.replaceWith(link) : (document.head || document.documentElement).append(link);
    colorTheme_link = link;
}
queueMicrotask(reloadColorTheme);



