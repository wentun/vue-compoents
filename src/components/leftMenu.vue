<template>
    <el-menu
        class="el-menu-vertical-demo"
        :router='true'
        default-active='/selectExample/default'
        >
        <el-submenu index="/selectExample/default/1">
            <template slot="title">
                <span>三级联动组件</span>
            </template>
            <el-menu-item index="/selectExample/default/1">
                <span slot="title">默认显示</span>
            </el-menu-item>
            <el-menu-item index="/selectExample/default/2">
                <span slot="title">增设自定义筛选项</span>
            </el-menu-item>
            <el-menu-item index="/selectExample/default/3">
                <span slot="title">增设自定义输入项</span>
            </el-menu-item>
        </el-submenu>
        <el-menu-item index="/description/stayTuned">
            <span slot="title">待添加。。</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
export default {
    name:'leftMenu',
    data(){
        return{

        }
    },
    methods:{

    }
}
</script>

<style lang="less" scoped>

</style>