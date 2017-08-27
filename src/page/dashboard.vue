<template>
<!-- <img src="../assets/dashboard.png"  width="100%"> -->
  <div class="dashboard">
    <div class="left">
  	     <ul  class="table-name">
          <li><router-link to="/dashboard/table1" >
             
                 GD_BABY_SITUATION
                 </router-link></li> 
            <li><router-link to="/dashboard/table2" >
                 GD_BASIC_INFO_DETAIL
                 </router-link></li> 
            <li><router-link to="/dashboard/table3" >
                 GD_EVALUATE_RESULT
                 </router-link></li> 
         </ul>
  	</div>
    <div class="right">
      <keep-alive>
      <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';
export default {
  name: 'dashboard',
  data() {
    return {
      myChart: {},
      option: {
       series: []
      },
      options: {
        showCheckbox: false,
        search: {
          useInitial: true,
          useEnglish: false,
          customFilter: null
        }
      },
      treeData: [
        {
          id: 'folder1',
          label: '人口数据',
          open: true,
          checked: false,
          parentId: null,
          visible: true,
          searched: false,
          children: [
            {
              id: 'table1',
              label: '人口',
              checked: false,
              parentId: 1,
              searched: true,
              visible: true
            },
 			{
              id: 'table2',
              label: '人口',
              checked: false,
              parentId: 1,
              searched: true,
              visible: true
            },{
              id: 'table3',
              label: '人口',
              checked: false,
              parentId: 1,
              searched: true,
              visible: true
            }
          ]
        },
                {
          id: 'folder2',
          label: '本地生活数据',
          open: true,
          checked: false,
          parentId: null,
          visible: true,
          searched: false,
          children: [
            {
              id: 'table1',
              label: '美食类商铺数据',
              checked: false,
              parentId: 5,
              searched: true,
              visible: true
            },
 			{
              id:'table2',
              label: '北京校区信息数据',
              checked: false,
              parentId: 5,
              searched: true,
              visible: true
            },{
              id: 'table3',
              label: '居民收支数据',
              checked: false,
              parentId:5,
              searched: true,
              visible: true
            }
          ]
        }

      ]
    }
  },
  created() {
  	this._getGraphInfo(9, '.graph-content-list');
  	this._getGraphInfo(10, '.graph-content-list-1');
  	this._getGraphInfo(11, '.graph-content-list-2');
  },
  methods: {
    _deepCopy(obj) {
      let str, newobj;
      str = newobj = obj instanceof Array ? [] : {};
      if (typeof obj !== 'object') {
        return;
      } else if (window.JSON) {
        str = JSON.stringify(obj) // 系列化对象
        newobj = JSON.parse(str) // 还原
      } else {
        for (var i in obj) {
          newobj[i] = typeof obj[i] === 'object' ? _deepCopy(obj[i]) : obj[i];
        }
      }
      return newobj;
    },
    _getGraphInfo(id, contentList) {
    	this.$http.get('http://localhost:8088/lxy/graph/get_info?graphId='+id).then((response) => {
        var data = response.body;
        // console.log(data.g_options);
        this.option = this._deepCopy(JSON.parse(data.g_options));
        // this.option = this._deepCopy(data.g_options);
        // console.log(this.option);
        this.myChart = echarts.init(document.querySelector(contentList));
        this.myChart.setOption(this.option);
      });
    },
    handleNode:function(node){
  		if(node.children==undefined||node.children==[])
  		{
  			  this.table_title=node.label;

  		}
  	}
  },
  components: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
.table-name
  font-size 15px
  height 40px
  line-height 40px
  padding 10px 10px 
  background-color rgb(202,217,246)
.dashboard
    position: fixed;
    top: 60px;
    left:0px;
    right: 0px;
    bottom: 0px;
    .left
    	width: 199px;
    	height: 100%;
    	background-color: rgb(232,235,237);
    	border-right: 1px rgb(227,230,232);
	    position: absolute;
	    top: 0;
	    left: 0px;
	    bottom: 0;
	    .tree-1
	    	margin-left: 30px;
    .right
    	position: absolute;
    	top: 0;
    	left: 200px;
    	right: 0;
    	background-color: rgb(232,235,237);
    	overflow: scroll;
    	bottom:0px;
    	[class^="graph-content-list"]
        	width: 900px;
        	height: 400px;
</style>
