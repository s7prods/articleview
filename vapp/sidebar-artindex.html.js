export default `
<template v-if="data.submenu === true">
    <ElSubMenu :index="data.index">
        <template #title>{{data.text}}</template>
        <SideBarArtIndex :data="data.nodes" />
    </ElSubMenu>
</template>
<template v-else-if="Array.isArray(data)">
    <SideBarArtIndex v-for="i in data" :data="i" />
</template>
<template v-else>
    <ElMenuItem :index="data.index">{{data.text}}</ElMenuItem>
</template>
`;