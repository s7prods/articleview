import vappHtml from "./vapp.html.js";
export default {
    data() {
        return {
            showArtIndex: false,
            showAppMenu: false,
        }
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
                // todo: 重新加载文章
                location.reload();
                this.resetAppMenuCursor(); return;
            }
        },
    },
    mounted() {
        globalThis.appInstance_.vapp = this;
    },
    template: vappHtml,
};

