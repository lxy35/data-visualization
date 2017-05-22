<template>
<!-- <img src="../assets/dashboard.png"  width="100%"> -->
  <div class="dashboard">
    <div class="left">
  	<tree ref ='tree' :treeData="treeData" :options="options"  class="tree-1" @node-click='handleNode'/>
  	</div>
    <div class="right">
      <div class="graph-content-list">        
      </div>
      <div class="graph-content-list-1">        
      </div>
       <div class="graph-content-list-2">        
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';
import Tree from '../components/tree/tree.vue'
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
  	this._getGraphInfo(35, '.graph-content-list');
  	this._getGraphInfo(1, '.graph-content-list-1');
  	this._getGraphInfo(36, '.graph-content-list-2');
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
        // console.log(response);
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
  components: {Tree}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
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
