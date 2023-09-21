export default `
<ElDrawer v-model="showArtIndex" :with-header="false" direction="ltr" size="300px">
    <ElEmpty description="Nothing" v-if="artIndexData.length < 1" />
    <ElMenu v-else default-active="/" mode="vertical" @select="handleIndexMenuSelect">
        <SideBarArtIndex :data="artIndexData" />
    </ElMenu>
</ElDrawer>

<ElDrawer v-model="showAppMenu" :with-header="false" direction="rtl" size="300px">
    <ElMenu default-active="/" mode="vertical" @select="handleAppMenuSelect">
        <ElMenuItem index="/" ref="appMenu_IndexBtn">首页</ElMenuItem>
        <ElSubMenu index="nav">
            <template #title>导航</template>
            <ElMenuItem index="#g=1">前进</ElMenuItem>
            <ElMenuItem index="#g=-1">后退</ElMenuItem>
            <ElMenuItem index="#r">刷新</ElMenuItem>
        </ElSubMenu>
        <ElSubMenu index="view">
            <template #title>查看</template>
            <ElMenuItem index="#v=a">输入文章地址</ElMenuItem>
            <ElMenuItem index="#v=i">输入索引地址</ElMenuItem>
        </ElSubMenu>
        <template v-for="(item, index) in customMenuArea">
            <template v-if="Array.isArray(item)">
                <ElSubMenu :index="('$it_t_'+index)">
                    <template #title>{{item.text}}</template>
                    <template v-for="i in item">
                        <ElMenuItem :index="'#h='+i.url" v-text="i.text"></ElMenuItem>
                    </template>
                </ElSubMenu>
            </template>
            <template v-else>
                <ElMenuItem :index="'#h='+item.url" v-text="item.text"></ElMenuItem>
            </template>
        </template>
        <ElMenuItem index="#h=/survey/">问卷</ElMenuItem>
        <ElMenuItem index="#h=/settings/">设置</ElMenuItem>
        <ElMenuItem index="#h=/about/">关于</ElMenuItem>
    </ElMenu>
</ElDrawer>

<component is="style">
.el-menu {
    border-right: 0;
}
</component>
`;