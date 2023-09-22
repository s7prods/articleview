




import('../i18n/PageText.js');
import('./scripts/app/navBtn.js');
import('./scripts/app/ThemeParser.js');


import { createApp } from '../lib/vue/vue.esm-browser.js';
import VApp from '../vapp/vapp.js';
import ElementPlus from '../lib/element-plus/index.full.mjs.js';
const vapp = createApp(VApp);
//vapp.config.unwrapInjectedRef = true; // vue.esm-browser.js:1513 [Vue warn]: app.config.unwrapInjectedRef has been deprecated. 3.3 now alawys unwraps injected refs in Options API.
vapp.config.compilerOptions.isCustomElement = (tag) => tag.includes('-');
vapp.config.compilerOptions.comments = true;
vapp.use(ElementPlus);
vapp.mount('#app');


for (const i of document.querySelectorAll('[data-custom-action="openArtIndex"]')) i.onclick = () => globalThis.appInstance_.vapp.showArtIndex = true;
for (const i of document.querySelectorAll('[data-custom-action="openMenu"]')) i.onclick = () => globalThis.appInstance_.vapp.showAppMenu = true;


import('./scripts/app/router.js');


myApp.hidden = false;
appInstance_.Sp.done();




