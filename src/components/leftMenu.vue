<template>
    <el-menu
        class="el-menu-vertical-demo"
        :router='true'
        default-active='/selectExample/default'
        >
        <el-menu-item index="/selectExample/default">
            <span slot="title">三级联动组件</span>
        </el-menu-item>
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