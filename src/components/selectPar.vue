<template>
    <div class='select-container'>
        <hr/>
        <!-- 部门中心分组 -->
        <div class='group-container' v-for="(item,index) in nowData" :key="index"
            v-show="nowData.length && (item.listName == '部门' || item.listName == '中心' ||item.listName == '开发组')"
            >
            <span class='name'>{{item.listName}}</span>
            <div class='option-container' v-show="!loading">
                <div class='show-container'>
                    <div class='span-con'>
                        <span class="" v-for="(item1,index1) in item.listData" :key="index1" v-show="item1.isSelect == true">
                            <span :class="[item1.id != 'all'? 'sel-model' :'sel-model1']">
                                {{item1.name}}
                                <i v-if="item1.id != 'all'" class="i-close el-icon-close" @click="changeSelect(item.listName,item1.id,1)"></i>
                            </span>
                        </span>
                    </div> 
                    <span class='jian el-icon-caret-bottom'></span>
                </div>
                <div class='optionlist'>
                    <div v-for="(item1,index1) in item.listData" :key="index1" 
                        :class="[item1.isSelect == true ? 'specific active' : 'specific']" 
                        @click="changeSelect(item.listName,item1.id,1)"
                        >
                        <span class="change change1">
                            <i class='gou' v-if="item1.isSelect == true"></i>
                            <i class='' v-else></i>
                        </span>
                        <span class='text gou-text'>{{item1.name}}</span>
                    </div>
                </div>
            </div>
            <div v-show="loading" class='option-container'>
                <div class='show-container loading'>
                    <span class="sel-model1">
                        加载中
                    </span>
                    <!-- <div class='span-con'>
                    </div>  -->
                    <span v-loading="loading"></span>
                </div>
            </div>
        </div>
        <!-- 自定义分组 -->
        <hr v-if="nowData.length > 3 || addMineInput.length"/>
        <div class='group-container2' v-for="item in nowData" :key="item.listName + item.id"
            v-show="nowData.length && (item.listName != '部门' && item.listName != '中心' && item.listName != '开发组')"
            >
            <div class='group-container group-container1'>
                <span class='name'>{{item.listName}}</span>
                <div class='option-container'>
                    <div class='show-container'>
                        <div class='span-con'>
                            <span class='sel-model1' v-for="(item1,index1) in item.listData" :key="index1" v-show="item1.isSelect == true">
                                {{item1.name}}
                            </span>
                        </div> 
                        <span class='jian el-icon-caret-bottom'></span>
                    </div>
                    <div class='optionlist'>
                        <div  v-for="(item1,index1) in item.listData" :key="index1" 
                            :class="[item1.isSelect == true ? 'specific active' : 'specific']" 
                            @click="changeSelect(item.listName,item1.id,2)"
                            >
                            <span class='text gou-text'>{{item1.name}}</span>
                        </div>
                    </div>
                </div>
            </div>   
        </div>
        <!-- 输入框组 -->
        <div v-if="addMineInput.length" class="input-con"> 
            <div class='group-container2' v-for="item in addMineInput" :key="item.name">
                <div class='group-container group-container1'>
                    <span class='name'>{{item.name}}</span>
                    <input type="text" v-model="item.value" :placeholder="item.placeholder ? item.placeholder : ''">
                </div>   
            </div>
        </div>
        <!-- 按钮 -->
        <div class='group-container2 group-container3'>
            <div class='name-btn-group'>
                <span class='name-btn' @click="find()">查询</span>
                <span class='name-btn' @click="reset()">重置</span>
            </div>
        </div>
    </div>
</template>

<script>
import {http} from '@/utils/https'
export default {
    name:'selectPar',
    props:{
        // 传入筛选组
        addMineSelect:{
            type: Array,
            default: function () {
                return []
            }
        },
        // 传入输入组
        addMineInput:{
            type: Array,
            default: function () {
                return []
            }
        },
        // 是否显示默认
        // 是否显示只看自己
    },
    data(){
        return{
            // 后台返回数据
            getHttpData:{},
            // 组装好的初始数据
            allData: [
                {
                    listName: '部门',
                    listData: [
                        {
                            id: 'all',
                            name: '全部',
                        },
                    ],
                },
                {
                    listName: '中心',
                    listData: [
                        {
                            id: 'all',
                            name: '全部',
                        },
                    ],
                },
                {
                    listName: '开发组',
                    listData: [
                        {
                            id: 'all',
                            name: '全部',
                        },
                    ],
                },
            ],  
            nowData:[],
            loading:true
        }
    },
    mounted(){
        this.getData()
    },
    watch:{
        addMineSelect(val){
            let newdata = JSON.parse(JSON.stringify(this.nowData.splice(0,3)))
            let setData = JSON.parse(JSON.stringify(val))
            this.setDefaultSelect(setData,false)
            this.allData = this.allData.splice(0,3).concat(setData)
            this.nowData = newdata.concat(setData)
            this.$forceUpdate()
        }
    },
    methods:{
        // 获取全部数据
        async getData(){
            const res = await http({
                method: 'get',
                url: '/api/test',
                 //若需要修改header可在这里更改
                // headers: {
                //     'token': 'af23124',
                //     'node': 'verson-324',
                // }
            })
            this.loading = false
            this.getHttpData = res
            if(this.addMineSelect != ''){
                this.allData = this.allData.concat(this.addMineSelect)
            }
            for(let item in this.allData){
                if(this.allData[item].listName == '部门'){
                    this.allData[item].listData = this.allData[item].listData.concat(this.getHttpData.departments)
                }
                if(this.allData[item].listName == '中心'){
                    this.allData[item].listData = this.allData[item].listData.concat(this.getHttpData.centers)
                }
                if(this.allData[item].listName == '开发组'){
                    this.allData[item].listData = this.allData[item].listData.concat(this.getHttpData.teams)
                }
            }
            let haveDefault = false
            this.setDefaultSelect(this.allData,haveDefault)
            this.nowData = JSON.parse(JSON.stringify(this.allData))
            // 处理url包含中心分组的情况
            let newdata1 = JSON.parse(JSON.stringify(this.nowData))
            // todo: 第一期先不上中心
            let centerName = this.getUrlParam('risk_center_name')
            let teamName = this.getUrlParam('risk_team_name')
            if(centerName){// 获取中心对应数据
                let urlnameid  
                for(let item of newdata1[1].listData){
                    if(item.name == centerName){
                        item.isSelect = true
                        urlnameid = item.id
                    }else{
                        item.isSelect = false
                    }
                }
                let srlrctarr = [{id:"all",isSelect:true,name:"全部"}]
                for(let item of newdata1[2].listData){
                    if(item.center_id == urlnameid){
                        srlrctarr.push(item)
                    }
                }
                if(teamName){
                    srlrctarr[0].isSelect = false
                    for(let item of srlrctarr){
                        if(item.name == teamName){
                            item.isSelect = true
                        }
                    }
                }
                newdata1[2].listData = srlrctarr
                this.nowData = newdata1;
                this.find()
                return
            }else if(teamName){
                for(let item of newdata1[2].listData){
                    if(item.name == teamName){
                        item.isSelect = true
                    
                    }else{
                        item.isSelect = false
                    }
                }
                this.nowData = JSON.parse(JSON.stringify(newdata1))
                this.find()
            }
            // 如需默认项则返回筛选组
            if(haveDefault){
                this.find()
            }
        },
        getUrlParam(name){
            function getQueryVariable(variable) {
                var query = window.location.hash.split('?')[1];
                if(!query){
                    return;
                }
                var vars = query.split('&');
                for (var i = 0; i < vars.length; i++) {
                    var pair = vars[i].split('=');
                    if (decodeURIComponent(pair[0]) == variable) {
                        return decodeURIComponent(pair[1]);
                    }
                }
            }
            let result = getQueryVariable(name);
            return result && decodeURIComponent(result);
        },
        // 更换选择项
        changeSelect(str,id,num){//1为多选，2为单选
            let newdata = JSON.parse(JSON.stringify(this.nowData))
            for(let item of newdata){
                if(item.listName == str){
                    // 选择全部
                    if(id == 'all'){
                        for(let item1 of item.listData ){
                            if(item1.id == 'all'){
                                item1.isSelect = true
                            }else{
                                item1.isSelect = false
                            }
                        }
                    }else{
                        for(let item1 of item.listData ){
                            if(item1.id == 'all'){
                                item1.isSelect = false
                            }
                            if(item1.id == id){
                                item1.isSelect = !item1.isSelect
                                // 用于保证必有一个选项 
                                let selectNum = 0
                                for(let item2 of item.listData ){
                                    if(item2.isSelect == true){
                                        selectNum++
                                    }
                                }
                                if(selectNum == 0){
                                    this.changeSelect(str,'all',num)
                                    return
                                }
                            }else if(num == 2){ // 若为单选则其他选项为false
                                item1.isSelect = false
                            }
                        }
                    }
                }
            }
            // 筛选出对应子选项
            if(str == '部门'){
                if(id == 'all'){
                    newdata = JSON.parse(JSON.stringify(this.allData))
                }else{
                    // 拿到部门选项
                    let srlrctarr = []
                    for(let item of newdata[0].listData){
                        if(item.isSelect == true ){
                            srlrctarr.push(item.id)
                        }
                    }
                    // 筛选中心
                    let centerarr = [{id:"all",isSelect:true,name:"全部"}]
                    for(let item of this.allData[1].listData){
                        if(srlrctarr.indexOf(item.department_id) != -1 ){
                            centerarr.push(item)
                        }
                    }
                    // 筛选开发组
                    let kaifaarr = [{id:"all",isSelect:true,name:"全部"}]
                    for(let item of this.allData[2].listData){
                        if(srlrctarr.indexOf(item.department_id) != -1 ){
                            kaifaarr.push(item)
                        }
                    }
                    // 是否增加其他选项
                    let qita = {id:"0",isSelect:false,name:"部门下一级组"}
                    for(let item of kaifaarr){
                        if(item.center_id == 0){
                            centerarr.push(qita)
                            break
                        }
                    }
                    newdata[1].listData = centerarr
                    newdata[2].listData = kaifaarr
                    
                }
            }else if(str == '中心'){
                // 筛选开发组
                if(id == 'all'){
                    let srlrctarr = [{id:"all",isSelect:true,name:"全部"}]
                    for(let item of this.allData[2].listData){
                        for(let item1 of newdata[1].listData){
                            if( item.department_id == item1.department_id && item.id !='all' ){
                                srlrctarr.push(item)
                            }
                        }
                    }
                    newdata[2].listData = Array.from(new Set([... srlrctarr]))
                }else{
                    let srlrctarr = [{id:"all",isSelect:true,name:"全部"}]
                    for(let item1 of newdata[1].listData){
                        if(item1.isSelect == true){
                            if(item1.id == 0){// 处理选择其他
                                // 部门为全部时
                                if(newdata[0].listData[0].isSelect){
                                    for(let item of this.allData[2].listData){
                                        if(item.center_id == 0){
                                            srlrctarr.push(item)
                                        }
                                    }
                                }else{
                                    // 部门对应其他选项
                                    let bumenArr = []
                                    for(let item of newdata[0].listData){
                                        if(item.isSelect){
                                            bumenArr.push(item.id)
                                        }
                                    }
                                    for(let item of this.allData[2].listData){
                                        if(item.center_id == 0){
                                            if(bumenArr.indexOf(item.department_id) != -1){
                                                srlrctarr.push(item)
                                            }
                                        }
                                    }
                                } 
                            }else{
                                for(let item of this.allData[2].listData){
                                    if(newdata[0].listData[0].isSelect){
                                        if(item.center_id == item1.id ){
                                            srlrctarr.push(item)
                                        }
                                    }else{
                                        if(item.center_id == item1.id && item.department_id == item1.department_id ){
                                            srlrctarr.push(item)
                                        }
                                    }
                                }
                            }
                        }
                    }  
                    newdata[2].listData = srlrctarr
                }
            }
            this.nowData = newdata
        },

        // 查询
        find(){
            let newdata = JSON.parse(JSON.stringify(this.nowData))
            let selectedItems = []
          
            // 组装部门数据,因为数据的不确定性所以需要遍历每一个部门，中心，组
            let zeroData = {}
            zeroData.name = newdata[0].listName
            zeroData.selName = []
            zeroData.sel = []
            if(newdata[0].listData[0].isSelect == true){
                zeroData.sel.push('all')
            }else{
                for(let item of newdata[0].listData){
                    if(item.isSelect == true){
                        zeroData.sel.push(item.id)
                        zeroData.selName.push(item.name)
                    }
                }
                
            }
            selectedItems.push(zeroData)
            // 组装中心数据
            let firtData = {}
            firtData.name = newdata[1].listName
            firtData.selName = []
            firtData.sel = []
            if(newdata[0].listData[0].isSelect == true){
                if(newdata[1].listData[0].isSelect == true){// 部门中心都为all
                    firtData.sel.push('all')
                }else{// 部门为all，中心自选
                    for(let i = 1 ; i < newdata[1].listData.length ; i++){
                        if(newdata[1].listData[i].isSelect == true){
                            firtData.sel.push(newdata[1].listData[i].id)
                            firtData.selName.push(newdata[1].listData[i].name)
                        }
                    }
                }
            }else{
                if(newdata[1].listData[0].isSelect == true){// 部门不为all，中心都为all，全部塞入
                    for(let i = 1 ; i < newdata[1].listData.length ; i++){
                        firtData.sel.push(newdata[1].listData[i].id)
                        firtData.selName.push(newdata[1].listData[i].name)
                    }
                }else{// 中心自选
                    for(let i = 1 ; i < newdata[1].listData.length ; i++){
                        if(newdata[1].listData[i].isSelect == true){
                            firtData.sel.push(newdata[1].listData[i].id)
                            firtData.selName.push(newdata[1].listData[i].name)
                        }
                    }
                }
            }
            selectedItems.push(firtData)
            // 组装开发组数据
            let secondData = {}
            secondData.name = newdata[2].listName
            secondData.sel = []
            secondData.selName = []
            if(newdata[0].listData[0].isSelect == true && newdata[1].listData[0].isSelect == true){ 
                if(newdata[2].listData[0].isSelect == true){// 全部为all
                    secondData.sel.push('all')
                }else{// 开发组自选
                    for(let i = 1 ; i < newdata[2].listData.length ; i++){
                        if(newdata[2].listData[i].isSelect == true){
                            secondData.sel.push(newdata[2].listData[i].id)
                            secondData.selName.push(newdata[2].listData[i].name)
                        }
                    }
                }
            }else{
                if(newdata[2].listData[0].isSelect == true){// 开发组为all
                    for(let i = 1 ; i < newdata[2].listData.length ; i++){
                        secondData.sel.push(newdata[2].listData[i].id)
                        secondData.selName.push(newdata[2].listData[i].name)
                    }
                }else{// 开发组自选
                    for(let i = 1 ; i < newdata[2].listData.length ; i++){
                        if(newdata[2].listData[i].isSelect == true){
                            secondData.sel.push(newdata[2].listData[i].id)
                            secondData.selName.push(newdata[2].listData[i].name)
                        }
                    }
                }
            }
            selectedItems.push(secondData)
            // 组装自定义数据
            for(let i = 3 ;i < newdata.length ; i++){
                let appendData = {}
                for(let item of newdata[i].listData){
                    appendData.name = newdata[i].listName
                    if( item.isSelect == true){
                        appendData.sel = [item.id.toString()]
                    }
                }
                selectedItems.push(appendData)
            }
            // 输入框型数据处理
            if(this.addMineInput.length){
                selectedItems = selectedItems.concat(this.addMineInput)
            }

            // this.props.updateSelPar(selectedItems);
            this.$emit('getSelectId',selectedItems)
          
            
        },
        // 重置
        reset(){
            this.nowData = JSON.parse(JSON.stringify(this.allData))
            this.find()
        },
        // 设置数组默认选项（haveDefault用于判断是否存在默认项，父组件是否需要二次加载）
        setDefaultSelect(arr,haveDefault){
            for(let item in arr){
                // 判断是否存在默认项，没有默认为全部
                for(let item1 of arr[item].listData){
                    if(item1.isSelect){
                        haveDefault = true
                    }
                }
                for(let item1 of arr[item].listData){
                    if(haveDefault){
                        if(!item1.isSelect){
                            this.$set(item1,'isSelect',false)
                        }
                    }else{
                        if(item1.id == 'all'){
                            this.$set(item1,'isSelect',true)
                        }else{
                            this.$set(item1,'isSelect',false)
                        }
                    }
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>
.select-container{
    min-width: 1200px;
    // height: 43px;
    // width: 100%;
	word-break: keep-all;
    margin: 10px 0;
    border: 1px solid #eee;
    // background-color: #fafafa;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
    text-align: left;
    h3{
        margin: 15px 0 15px 24px;
    }
    hr{
        width: 100%;
        height: 1px;
        border: 0;
        background-color: #F0F0F0;
        margin:  0;
    }
}
.group-container{
    display: inline-block;
    margin: 15px 0 15px 24px;
    .name{
        display: inline-block;
        margin-right: 16px;
        color: rgba(0, 0, 0, 0.4);
    }
    .option-container{
        display: inline-block;
        width: 220px;
        position: relative;
        vertical-align: middle;
        text-align: left;
        &:hover{
            .show-container{
                border-color: #07C160;
                .jian,.sel-model1{
                    color: #07C160;
                }
            }
            .optionlist{
                display: block;
            }
            .jian{
                transform: rotate(180deg);
			    transition: transform .5s;
            }
        }
        .show-container{
            outline: none;
            user-select: none;
            box-sizing: border-box;
            background-color: #fff;
            border-radius: 2px;
            border: 1px solid #d9d9d9;
            position: relative;
            padding-right: 25px;
            height: 30px;
            .span-con{
                overflow: hidden;
                white-space: nowrap;
                height: 100%;
            }
            .jian{
                position: absolute;
                top: 7px;
                right: 5px;
            }
            .sel-model1{
                padding: 2px 0px;
                line-height: 2;
                font-size: 14px;
                color: #989898;
                margin-left: 8px;
                vertical-align: top;
            }
            .sel-model{
                padding: 2px 5px 2px 8px;
                line-height: 2;
                font-size: 14px;
                background-color: #eee;
                position: relative;
                vertical-align: top;
                margin-left: 8px;
                color: rgba(0, 0, 0, 0.6);
                font-weight: 600;
                .i-close{
                    margin-left: 5px;
                    font-size: 13px;
                    font-weight: 700;
                    cursor: pointer;
                }
            }
        }
        .loading{
            display: flex;
            justify-content: space-between;
            padding-right: 10px;
            ::v-deep .el-loading-parent--relative{
                display: inline-block;
                width: 13px;
                height: 13px;
                vertical-align: top;
            }
            ::v-deep .el-loading-spinner{
                margin-top: 0px;
                .circular{
                    width: 13px;
                    height: 13px;
                    .path{
                        stroke:#4FDB89;
                        stroke-width:8;
                    }
                }
            } 
        }
        .optionlist{
            display: none;
            position: absolute;
            top: 30px;
            left: 0;
            width: 220px;
            max-height: 230px;
            position: absolute;
            overflow: auto;
            z-index: 500;
            line-height: 1.5;
            background-color: #fff;
            box-shadow: 0 2px 8px rgba(0,0,0,.15);
            border-radius: 2px;
            .specific{
                cursor: pointer;
                padding: 5px 8px;
                word-break: break-all;
                line-height: 30px;
                &:hover{
                    background-color: #F0F0F0;
                }
                .change{
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    line-height: 1;
                    border: 1px solid #afa8a8;
                    background-color: #f7f7f7;
                    margin-right: 8px;
                    border-radius: 50%;
                    vertical-align: sub;
                    i{
                        font-weight: 900;
                        font-style: inherit;
                    }
                }
                .change1{
                    border-radius: 0;
                }
            }
            .active{
                color: #07C160;
                .change{
                    border-color: #07C160;
                    background-color: #fff;
                    position: relative;
                    .circle{
                        position: absolute;
                        top: 2px;
                        left: 2px;
                        display: block;
                        height: 8px;
                        width: 8px;
                        border-radius: 50%;
                        background-color: #07C160;
                    }
                }
                .change1{
                    border-radius: 0;
                    border-color: #07C160;
                    background-color: #07C160;
                    .gou{
                        display: block;
                        width: 15px;
                        height: 15px;
                        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAiCAYAAAA+stv/AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIKADAAQAAAABAAAAIgAAAADWRjGTAAABkElEQVRYCe2UzytEURTHp2miJhFJlCgLxUJJWbCwmI2FKVazsJs/wL9iq2yxJEvZiVJSSkpSSilFkiQ/4vlczUyn07u9ue8HC/fUp3vOfed8v/Pu3F4u58OfgD+B/3ICQRDkw941dDOsMcke5kvMb7EWkujEmsW0Cl9gYh1+5aV/fixmFfgEGfOx3sR1CMcyvEtn8mVXnVj9GJXgVZmvxhJzHcJ0Cp6V+QZ19v89JuPwqMy3qd1vP0OLUG32BOgdgTuQsUvR2qxGo4+hBfgAc4MrjQeWhJ4huAEZ+xRFy4h9m6FReBNK5iaXbRM864crkHFM0WGbidxneEWqkZsbXdKD7PXAOcg4o+jWvU41AnlYk6rk5mZP14XIO+EEZFxS9NV7Eq0IFWBTqpObGz4BbXAIMq4pBhOZ6mEEW2BHupDfw4Hau6Ue1vOp1AgXYU8ZyvKBYiwVM5sIBu1wJF1r+RPrpG0u1X2MuuC0ZmyWF5hJ1SRKDMNeuADznZiN6s/kOcYDMJeJuBf1J+BP4C9O4BuQPT+aFfPGYQAAAABJRU5ErkJggg==) no-repeat center/contain;
                    }
                }
            }
        }
       
    }
}
// .group-container1{
//     .option-container{
//         width: 150px;
//         .optionlist{
//             width: 150px;
//         }
//     }
// }
.group-container2{
    display: inline-block;
    // margin: 7px 5px 0 0;
    .name-btn-group{
        margin-left: 95px;
    }
    .name-btn{
        display: inline-block;
        margin-left: 15px;
        width: 55px;
        text-align: center;
        border: 1px solid #d6d6d6;
        border-radius: 4px;
        background-color: #ffffff;
        line-height: 2;
        height: 30px;
        cursor: pointer;
        font-weight: 600;
    }
    .onlyme-btn{
        margin-left: 15px;
        width: 80px;
        text-align: center;
        border: 1px solid #d6d6d6;
        border-radius: 4px;
        background-color: #fff;
        line-height: 2;
        height: 30px;
        cursor: pointer;
        font-weight: 600;
        text-align: center;
        &:hover{
            background-color: #f7f7f7;
        }
    }
    .onlyme-active{
        color: #07C160;
        border-color: #07C160;
    }
}
.group-container3{
    margin-bottom: 15px;
}
.input-con{
    display: inline-block;
    input{
        width: 210px;
        height: 28px;
        border-radius: 2px;
        border: 1px solid #d9d9d9;
        background-color: white;
        font-size: 14px;
        color: #989898;
        padding-left: 10px;
        &:focus{
            outline: none;
            border-color: #07C160;
        }
        &::-webkit-input-placeholder{
           color: #989898; 
        }
        &::-moz-placeholder{
           color: #989898; 
        }
        &::-ms-placeholder{
           color: #989898; 
        }
    }
}
</style>