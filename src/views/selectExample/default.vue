<template>
    <div>
        <selectPar @getSelectId="getSelectId" :addMineSelect='addMineSelect' :addMineInput='addMineInput' />

    </div>
</template>

<script>
import selectPar from '@/components/selectPar.vue'
export default {
    name:'default',
    components: {
		selectPar
	},
    data(){
        return{
            addMineSelect:[],// 筛选组数据
            addMineInput:[],// 输入组数据
        }
    },
    mounted(){
        this.setData()
    },
    watch:{
        "$route"(to,from){
            this.setData()
        }
    },
    methods:{
        // 根据url传参显示不同效果，1默认，2传筛选组，3传输入组
        setData(){
            let urlParms =  window.location.hash.split('/')
            let id = urlParms.pop()
            switch(id){
                case '1' :
                    this.addMineSelect = []
                    this.addMineInput = []
                    break;
                case '2' :
                    this.addMineSelect = [
                        {
                            listName: '状态',
                            listData: [
                                {
                                    name: '全部',
                                    id: 'all',
                                },
                                {
                                    name: '停用',
                                    id: '0',
                                },
                                {
                                    name: '正常',
                                    id: '1',
                                },
                                {
                                    name: '损坏',
                                    id: '2',
                                },
                            ],
                        },
                        {
                            listName: '情况',
                            listData: [
                                {
                                    name: '全部',
                                    id: 'all',
                                },
                                {
                                    name: '空闲',
                                    id: '0',
                                },
                                {
                                    name: '忙碌',
                                    id: '1',
                                },
                                {
                                    name: '可并行',
                                    id: '2',
                                },
                            ],
                        },
                    ]
                    this.addMineInput = []
                    break;
                case '3' :
                    this.addMineSelect = []
                    this.addMineInput = [
                        {
                            name:'搜索人', /// 输入框名称，必传，作为key必须唯一
                            value:'', /// 输入框值，可传
                            placeholder:'请输入名字', /// 提示，可传
                        },
                        {
                            name:'加星组', /// 输入框名称，必传，作为key必须唯一
                            value:'加星一组', /// 输入框值，可传
                            placeholder:'请输入组名', /// 提示，可传
                        },
                    ]
                    break;
                default:
                    break;
            }
        },
        getSelectId(item){
            this.$message.success('请在控制台查看筛选信息')
        }
    }
}
</script>