globalThis.appInstance_.ls.waitUntil(
fetch('./themes/fonts/SDK_SC_Web.woff').then(r => r.blob()).then(b => {
    const url = URL.createObjectURL(b);
    const style = document.createElement('style');
    style.innerHTML = `
    @font-face {
        font-family: SDK_SC_Web;
        src: url(${url});
    }
    `;
    (document.head || document.documentElement).append(style);
}).catch(error => console.error('[theme: genshin]', 'Failed to load remote font:', error))
, 'Loading Genshin Impact Font (SDK_SC_Web)');