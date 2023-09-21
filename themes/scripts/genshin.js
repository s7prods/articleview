if (typeof UNREGISTER !== 'undefined' && UNREGISTER === true) {
    globalThis.appInstance_.gcs.remove();
    URL.revokeObjectURL(globalThis.appInstance_.gcs.dataset.url);
    delete globalThis.appInstance_.gcs;
    return;
}

if (globalThis.appInstance_.gcs) return;
globalThis.appInstance_.ls.waitUntil(Promise.race([
fetch('./themes/fonts/SDK_SC_Web.woff').then(r => r.blob()).then(b => {
    const url = URL.createObjectURL(b);
    const style = document.createElement('style');
    style.dataset.url = url;
    style.innerHTML = `
    @font-face {
        font-family: SDK_SC_Web;
        src: url(${url});
    }
    `;
    (document.head || document.documentElement).append(style);
    globalThis.appInstance_.gcs = style;
}).catch(error => console.error('[theme: genshin]', 'Failed to load remote font:', error)),
new Promise(r => setTimeout(r, 1000)),
]), 'Loading Genshin Impact Font (SDK_SC_Web)');