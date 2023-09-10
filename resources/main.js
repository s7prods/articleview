
globalThis.appInstance_ = Object.create(Object.prototype);


import { InitI18n } from "./scripts/public/i18n.js";
InitI18n('./i18n/lang/zh-cn.json');


import('../i18n/PageText.js');
import('./scripts/app/navBtn.js');
import('./scripts/app/ThemeParser.js');


import { createApp } from '../lib/vue/vue.esm-browser.js';
import VApp from '../vapp/vapp.js';
import ElementPlus from '../lib/element-plus/index.full.mjs.js';
const vapp = createApp(VApp);
vapp.config.unwrapInjectedRef = true;
vapp.config.compilerOptions.isCustomElement = (tag) => tag.includes('-');
vapp.config.compilerOptions.comments = true;
vapp.use(ElementPlus);
vapp.mount('#app');


for (const i of document.querySelectorAll('[data-custom-action="openArtIndex"]')) i.onclick = () => globalThis.appInstance_.vapp.showArtIndex = true;
for (const i of document.querySelectorAll('[data-custom-action="openMenu"]')) i.onclick = () => globalThis.appInstance_.vapp.showAppMenu = true;



myApp.hidden = false;




