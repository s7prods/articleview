


export async function ViewPage(url) {
    app_ContentArea.innerHTML = '';
    const resp = await fetch(url);
    const text = await resp.text();
    app_ContentArea.innerHTML = text;

    DecodeArticleTitleByDom(app_ContentArea);
}
function DecodeArticleTitleByDom(DomElement) {
    const titleElement = DomElement.querySelector('title');
    if (!titleElement) return;
    globalThis.appInstance_.vapp.artIndexData.length = 0;
    globalThis.appInstance_.vapp.artIndexData.push({
        text: titleElement.innerText,
        index: '_nop',
    });
    nav_ArtTitleBox.innerText = titleElement.innerText;
}



export async function ViewByPage(url) {
    const pm = ViewPage(url);
    globalThis.appInstance_.ls.waitUntil(pm);
    await pm;
}

export function LoadIndex(index_url) {
    
}
export function ViewByIndex(index_pos) {
    
}


export function CalViewByUrl(url) {
    const
        pageUrl = url.searchParams.get('page_url'),
        indexUrl = url.searchParams.get('index_url'),
        indexPos = url.searchParams.get('index_pos');
    
    if (indexUrl && indexPos) {
        
    }
    else if (pageUrl) {
        return ViewByPage(pageUrl);
    }
}


