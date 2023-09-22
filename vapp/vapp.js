import vappHtml from "./vapp.html.js";
import sidebarArtindex from "./sidebar-artindex.js";
import { ElMessage, ElMessageBox } from "../lib/element-plus/index.full.mjs.js";
export default {
    data() {
        return {
            showArtIndex: false,
            showAppMenu: false,
            customMenuArea: [],
            artIndexData: [],
        }
    },
    components: {
        SideBarArtIndex: sidebarArtindex,
    },
    methods: {
        resetAppMenuCursor() {
            const i = this.$refs.appMenu_IndexBtn
            i && i.$el.dispatchEvent(new PointerEvent('click', { bubbles: true }));
        },
        handleAppMenuSelect(i) {
            this.showAppMenu = false;
            if (i.startsWith('#g=')) {
                history.go(parseInt(i.substring(3)));
                this.resetAppMenuCursor(); return;
            }
            if (i === '#r') {
                if (location.hash.startsWith('#/web/viewer')) {
                    // 重新加载文章
                    const evt = new HashChangeEvent('hashchange');
                    globalThis.dispatchEvent(evt);
                }
                else location.reload(); // 重新加载页面
                this.resetAppMenuCursor(); return;
            }
            if (i.startsWith('#h=')) {
                hashUrl.pathname = ((i.substring(3)));
                globalThis.location.hash = hashUrl.pathname + hashUrl.search + hashUrl.hash;
                return;
            }
            if (i.startsWith('#v=')) {
                const v = i.substring(3);
                this.resetAppMenuCursor();
                if (v != 'a' && v != 'i') return;
                ElMessageBox.prompt(i18n('inputurl_' + v), i18n('inputurl'), {
                    confirmButtonText: i18n('dialog.ok'),
                    cancelButtonText: i18n('dialog.cancel'),
                    type: 'info',
                    inputPattern: /([\s\S]*)\/([\s\S]*)/,
                    inputErrorMessage: 'Please input a valid URL',
                    draggable: true,
                }).then(({value}) => {
                    console.log(value);
                }).catch(() => { });
                return;
            }
        },
        handleIndexMenuSelect(i) {
            console.log(i);
        },
    },
    mounted() {
        globalThis.appInstance_.vapp = this;
        globalThis.addEventListener('error', ev => ElMessage.error('unexpected '+ev.error));
    },
    template: vappHtml,
};

