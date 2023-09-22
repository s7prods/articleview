

export const TEST_PASSED = Symbol('Test Passed');
export async function runtest() {

    // test: try...catch without error paramater
    try {
        new (Function)('try{throw 1}catch{}')();
    } catch (_) { return 'try...catch without error paramater' }

    // // test: String.prototype.replaceAll
    // try {
    //     if ('232' !== new (Function)('return "131".replaceAll("1","2")')()) throw 1;
    // } catch (_) { return 'String.prototype.replaceAll' }

    // // test: Promise.any
    // try {
    //     if (await (new (Function)('return Promise.any([Promise.resolve("lalala")])')()) !== 'lalala') throw 1;
    // } catch (_) { return 'Promise.any' }


    return TEST_PASSED;
}

export const links = {
    'Top-Level `await`': 'https://caniuse.com/mdn-javascript_operators_await_top_level',
};

