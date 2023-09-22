function addCSS(css, el = null, adopt = false) {
    if ((el === null || adopt) && ('adoptedStyleSheets' in document)) {
        const style = new CSSStyleSheet;
        style.replace(css);
        (el || document).adoptedStyleSheets.push(style);
        return style;
    } else {
        let EL = document.createElement('style');
        EL.innerHTML = css;
        (el || document.head || document.documentElement).append(EL);
        return EL;
    }
}
    

let last_theme = null, last_theme_data = {};
export async function parseTheme() {
    const theme = hashUrl.searchParams.get('theme') || hashUrl.searchParams.get('hk4e_theme') || '';
    if (theme === last_theme) return;
    const themePath = theme.split('/');

    globalThis.appInstance_.ls.waitUntil(async (ww) => {
        const iicnt = i18n('Loading_themes').replace('%2', last_theme === null ? '2' : '4');
        let cp = 0;
        ww.textNode.innerText = iicnt.replace('%1', cp);

        if (last_theme !== null) {
            if (last_theme_data.stylesheet instanceof CSSStyleSheet) {
                const n = document.adoptedStyleSheets.findIndex(el => el === last_theme_data.stylesheet);
                if (n >= 0) document.adoptedStyleSheets.splice(n, 1);
            }
            else if (last_theme_data.stylesheet instanceof HTMLElement) {
                last_theme_data.stylesheet.remove();
            }
            delete last_theme_data.stylesheet;
            ww.textNode.innerText = iicnt.replace('%1', ++cp);
            try { await last_theme_data.unreg.call(last_theme_data, true); } catch { }
            delete last_theme_data.unreg;
            ww.textNode.innerText = iicnt.replace('%1', ++cp);
        }
        
        last_theme = theme;
        if (typeof (themePath[0]) !== 'string') return;
        const themeRoot = themePath[0].replace(/[\/\\\:\"\']/ig, '');
        if (themeRoot) {
            await (fetch('./themes/css/' + themeRoot + '.css').then(v => {
                if (!v.ok) throw new Error('HTTP Error ' + v.status);
                return v.text();
            }).then(t => {
                last_theme_data.stylesheet = addCSS(t);
            }).catch(error => console.error('[ThemeParser]', 'Cannot load theme stylesheet', theme, ':', error)));
            ww.textNode.innerText = iicnt.replace('%1', ++cp);

            await (fetch('./themes/scripts/' + themeRoot + '.js').then(v => {
                if (!v.ok) throw ('HTTP Error ' + v.status);
                return v.text();
            }).then(t => {
                last_theme_data.unreg = new Function('UNREGISTER', t);
                const fn = new Function('THEME', t);
                fn.call(globalThis, {
                    theme: theme,
                    name: themeRoot,
                    version: themePath[1],
                    path: themePath,
                });
            }).catch(error => {
                if (error === 'HTTP Error 404') console.info('[ThemeParser]', 'theme', theme, "doesn't have a script.");
                else console.error('[ThemeParser]', 'Cannot load theme script', theme, ':', error)
            }));
            ww.textNode.innerText = iicnt.replace('%1', ++cp);
        }
    }, ' ');

}
queueMicrotask(parseTheme);
globalThis.addEventListener('hashchange', parseTheme);



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



