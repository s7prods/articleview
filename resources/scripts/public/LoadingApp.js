/*
LoadingApp.js
    LoadingApp for Web (Genshin Impact style)

License: [MIT License](https://mit-license.org)
Author: [shc0743](https://github.com/shc0743/)


*/



import { addCSS } from './BindMove.js';


export class LoadingApp {
    _el;
    _sr;
    _lt;

    constructor(MountElement = null) {
        if (!MountElement || !MountElement instanceof HTMLElement) MountElement = document.body || document.documentElement;
        this._el = document.createElement('div');
        this._sr = this._el.attachShadow({ mode: 'open' });
        this._sr.innerHTML = `
        <div id="LoadingApp" class="LoadingApp">
            <div class="LoadingApp_Content">
                <div class="LoadingApp_Spinner">
                    <span class="LoadingApp_SpinContext_Item LoadingApp_Num_0" data-pos="0"></span>
                    <span class="LoadingApp_SpinContext_Item LoadingApp_Num_1" data-pos="1"></span>
                    <span class="LoadingApp_SpinContext_Item LoadingApp_Num_2" data-pos="2"></span>
                    <span class="LoadingApp_SpinContext_Item LoadingApp_Num_3" data-pos="3"></span>
                    <span class="LoadingApp_SpinContext_Item LoadingApp_Num_4" data-pos="4"></span>
                    <span class="LoadingApp_SpinContext_Item LoadingApp_Num_5" data-pos="5"></span>
                    <span class="LoadingApp_SpinContext_Item LoadingApp_Num_6" data-pos="6"></span>
                    <span class="LoadingApp_SpinContext_Item LoadingApp_Num_7" data-pos="7"></span>
                </div>
                <div class="LoadingApp_Text"></div>
            </div>
        </div>
        `;
        this._lt = this._sr.querySelector('.LoadingApp_Text');
        addCSS(LoadingApp_CSSContent, this._sr, true);
        this.hide();
        this.mount(MountElement);
        setInterval(this._TimerProc, 1000 / 8, this);
    }

    mount(ElementOrSelector) {
        if (typeof ElementOrSelector === 'string') {
            ElementOrSelector = document.querySelector(ElementOrSelector);
            if (!ElementOrSelector) throw new Error('RuntimeException: Cannot find element with specified selector');
        }
        else if (!ElementOrSelector || (!ElementOrSelector instanceof HTMLElement)) throw new TypeError('Invalid Paramter');
        ElementOrSelector.append(this._el);
    }


    // internal functions
    _TimerProc(that) {
        if (that._el.hidden) return;

        const MyElements = that._sr.querySelectorAll('.LoadingApp .LoadingApp_SpinContext_Item');
        const cnt = MyElements.length;
        for (const i of MyElements) {
            // assert(cnt > 0)
            i.dataset.pos = (+i.dataset.pos + 1) % cnt;
        }

    }

    
    // basic functions - control the loading manually
    hide() {
        this._el.hidden = true;
    }
    show(withText = '') {
        this._el.hidden = false;
        if (typeof withText !== 'string') withText = '';
    }

    setText(text = '') {
        this._lt.innerText = text;
    }


    // advanced functions - enhanced by adding Promise&Event supports
    showDuring(duration = 5000, withText = '') {
        this.show(withText);
        const timer_id = setTimeout(() => this.hide(), duration);
        return () => clearTimeout(timer_id);
    }
    wait(duration = 5000, withText = '') {
        return this.showDuring(duration, withText);
    }
    waitEvent(evtObject, evtName, evtProps = {}, withText = '') {
        const listener = () => this.hide();
        const rropt = Object.assign({ once: true }, evtProps);
        this.show(withText);
        evtObject.addEventListener(evtName, listener, rropt);
        return () => evtObject.removeEventListener(evtName, listener, rropt);
    }
    waitUntil(toWait) {
        if (toWait instanceof Promise) {
            this.show(arguments[1]);
            toWait.finally(() => this.hide());
            return true;
        }
        if (toWait instanceof EventTarget) {
            return this.waitEvent.apply(this, arguments);
        }
        return false;
    }
};


export const LoadingApp_CSSContent = `
.LoadingApp {
    position: fixed;
    left: 0; right: 0; top: 0; bottom: 0;
    background: var(--loadingapp-background);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 999999;

    --loadingapp-background: rgba(0, 0, 0, 0.5);
    --loadingapp-spinner-size: 80px;
    --loadingapp-spinner-context-size: 14px;
    --loadingapp-spinner-color: #ffee7b;
    --loadingapp-spinner-xolor: #ffff00;
}
.LoadingApp .LoadingApp_Content {
    display: flex;
    flex-direction: column;
}
.LoadingApp .LoadingApp_Spinner {
    flex: 1;
    display: block;
    position: relative;
    width: var(--loadingapp-spinner-size);
    height: var(--loadingapp-spinner-size);
    min-height: var(--loadingapp-spinner-size);
}
.LoadingApp .LoadingApp_SpinContext_Item {
    display: block;
    position: absolute;
    width: var(--loadingapp-spinner-context-size);
    height: var(--loadingapp-spinner-context-size);
    background-color: var(--loadingapp-spinner-color);
    border-radius: 50%;
    box-shadow: 0 0 15px 0 var(--loadingapp-spinner-xolor);
    transform: translate(-50%, -50%);
}

.LoadingApp .LoadingApp_SpinContext_Item.LoadingApp_Num_0 { opacity: 1; }
.LoadingApp .LoadingApp_SpinContext_Item.LoadingApp_Num_1 { opacity: 0.9; }
.LoadingApp .LoadingApp_SpinContext_Item.LoadingApp_Num_2 { opacity: 0.7; }
.LoadingApp .LoadingApp_SpinContext_Item.LoadingApp_Num_3 { opacity: 0.5; }
.LoadingApp .LoadingApp_SpinContext_Item.LoadingApp_Num_4 { opacity: 0.3; }
.LoadingApp .LoadingApp_SpinContext_Item.LoadingApp_Num_5 { opacity: 0.5; }
.LoadingApp .LoadingApp_SpinContext_Item.LoadingApp_Num_6 { opacity: 0.7; }
.LoadingApp .LoadingApp_SpinContext_Item.LoadingApp_Num_7 { opacity: 0.9; }


.LoadingApp .LoadingApp_SpinContext_Item[data-pos="0"] {
    left: calc(var(--loadingapp-spinner-size) / 2);
    top: 0;
}
.LoadingApp .LoadingApp_SpinContext_Item[data-pos="2"] {
    left: calc(var(--loadingapp-spinner-size));
    top: calc(var(--loadingapp-spinner-size) / 2);
}
.LoadingApp .LoadingApp_SpinContext_Item[data-pos="4"] {
    left: calc(var(--loadingapp-spinner-size) / 2);
    top: calc(var(--loadingapp-spinner-size));
}
.LoadingApp .LoadingApp_SpinContext_Item[data-pos="6"] {
    left: 0;
    top: calc(var(--loadingapp-spinner-size) / 2);
}
.LoadingApp .LoadingApp_SpinContext_Item[data-pos="1"] {
    left: calc((var(--loadingapp-spinner-size) / 4) * 3);
    top: calc(var(--loadingapp-spinner-size) / 4);
    transform: translate(0%, -100%);
}
.LoadingApp .LoadingApp_SpinContext_Item[data-pos="3"] {
    left: calc((var(--loadingapp-spinner-size) / 4) * 3);
    top: calc((var(--loadingapp-spinner-size) / 4) * 3);
    transform: translate(0%, 0%);
}
.LoadingApp .LoadingApp_SpinContext_Item[data-pos="5"] {
    left: calc(var(--loadingapp-spinner-size) / 4);
    top: calc((var(--loadingapp-spinner-size) / 4) * 3);
    transform: translate(-100%, 0%);
}
.LoadingApp .LoadingApp_SpinContext_Item[data-pos="7"] {
    left: calc(var(--loadingapp-spinner-size) / 4);
    top: calc(var(--loadingapp-spinner-size) / 4);
    transform: translate(-100%, -100%);
}
`;


