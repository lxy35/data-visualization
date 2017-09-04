<template>
  <div id="graph-content">
    <!-- <img src="../assets/index.png"  width="100%"> -->
    <!-- <div class="graph-content-list"></div>
    <div class="graph-content-list-1"></div>
    <div class="graph-content-list-2"></div>
    <div class="graph-content-list-3"></div> -->
  </div>
</template>

<script>
import echarts from 'echarts';
export default {
  // name: 'table1',
  props: {
    tableName: {
      type: String
    }
  },
  data(){
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
      }
  	}
  },
  created() {
    // this._getGraphInfo(1, '.graph-content-list');
    // this._getGraphInfo(2, '.graph-content-list-1');
    // this._getGraphInfo(3, '.graph-content-list-2');
    // this._getGraphInfo(4, '.graph-content-list-3');
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
    _getGraphInfo() {
      this.$http.get('http://localhost:8088/lxy/graph/get_info_name?gTable='+this.tableName).then((response) => {
      // this.$http.get('http://localhost:8088/lxy/graph/get_info?flag=kylin&graphId='+id).then((response) => {
        var data = response.body;
        var graphContent = document.getElementById('graph-content');
        graphContent.innerHTML = "";
        for(let i=0; i<data.length-1; i++){
          this.option = this._deepCopy(JSON.parse(data[i].g_options));
          // html += '<div class="graph-content-list-"'+i+'style="width:450px;height:400px;"></div>';
          var contentList = document.createElement('div');
          contentList.setAttribute('class','graph-content-list-'+i);
          contentList.setAttribute('style','width:500px;height:400px;');
          graphContent.appendChild(contentList)
          this.myChart = echarts.init(contentList);
          this.myChart.setOption(this.option);
        }
        // this.option = this._deepCopy(JSON.parse(data.g_options));
        // // this.option = this._deepCopy(data.g_options);
        // // console.log(this.option);
        // this.myChart = echarts.init(document.querySelector(contentList));
        // this.myChart.setOption(this.option);
      });
    },
    handleNode:function(node){
      if(node.children==undefined||node.children==[])
      {
          this.table_title=node.label;

      }
    }
  },
  watch: {
    tableName: {
      handler: function(){
        this._getGraphInfo();
      },
      //深度观察
      deep: true
    }
  },
  components: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
#graph-content
  margin:10px 30px;
  [class^="graph-content-list"]
    // width: 450px;
    // height: 400px;
    float: left;
</style>
