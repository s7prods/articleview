export default `
<ElDrawer v-model="showArtIndex" :with-header="false" direction="ltr" size="300px">
    Hello World
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
        <ElMenuItem index="#set">设置</ElMenuItem>
        <ElMenuItem index="#about">关于</ElMenuItem>
    </ElMenu>
</ElDrawer>
`;