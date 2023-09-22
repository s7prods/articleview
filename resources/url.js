export function RegisterUrlObject(name, getFunc, setFunc = null, checkIfChanged = null) {
    if (typeof name !== 'string' || !name) throw new TypeError('`name` should be a non-empty string');
    if (typeof getFunc !== 'function') throw new TypeError('`getFunc` should be a function');
    if ((!!setFunc) && typeof setFunc !== 'function') throw new TypeError('`setFunc` should be null or a function');
    if ((!!checkIfChanged) && typeof checkIfChanged !== 'function') throw new TypeError('`checkIfChanged` should be null or a function');
    (function () {
        let ourl = null, vurl = null, ov = null;
        Object.defineProperty(globalThis, name, {
            configurable: true,
            enumerable: false,
            get() {
                if (checkIfChanged) {
                    let tn;
                    if ((tn = checkIfChanged(ov))) {
                        ov = tn;
                    } else {
                        return vurl;
                    }
                }
                else if (getFunc() === ourl) return vurl;
                return (vurl = new URL((ourl = getFunc())));
            },
            set(value) {
                if (!setFunc) return false;
                if (!value) return false;
                if (value instanceof URL) {
                    setFunc(value.href, getFunc);
                    return true;
                }
                globalThis.location = value; // TODO
                return true;
            },
        })
    })();
};
