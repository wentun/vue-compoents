## 业务
### 1. selsectPar 公共查询组件使用说明
####  (1)部门，中心，开发组有后台统一返回不需要做处理，如有特殊筛选项则传入addMineSelect参数，数据结构与部门一样，如：
addMineSelect:[
  {
    listName: '状态',  /// 必传,筛选组名
    listData: [
      {
        name: '全部',  /// 必传,默认全部筛选项名
        id: 'all',     /// 必传，默认全部筛选项id
      },
      {
        name: '自定义',
        id: '自定义',
        isSelect:true, /// 可选，如需默认选择项则传入true，默认不传
      },
      {
        name: '自定义',
        id: '自定义',
      },
    ],
  },
  ...
] 
####  (2) 如需输入筛选项，则传入addMineInput参数，格式如下：
addMineInput:[
  {
    name:'**', /// 输入框名称，必传，作为key必须唯一
    value：'', /// 输入框值，可传
    placeholder:'', /// 提示，可传
  }
  ...
]
####  (3) 使用getSelectId方法获取选择筛选项，返回一个数组，每一个筛选项对应一个数组，数组中包含分组名称，所选择的id和名字，结构如下：
[
  // 筛选项数据结构
  {
    name:'**', /// 筛选组名字
    sel:[...], /// 选择项id
    selName:[...] /// 选择项名字
  },
  ...
  // 输入项数据结构
  {
    name:'**', /// 输入项名字
    value:'', /// 输入值，注：如果addMineInput中没有传入默认value且用户没有进行操作，value值不会存在！！！
  }
  ...
]