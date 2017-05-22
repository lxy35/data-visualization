<template>
<!-- <img src="../assets/dashboard.png"  width="100%"> -->
  <div class="dashboard">
    <div class="right-content">
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
export default {
  data(){
    return {
      myChart: {},
      option: {
       series: []
      }
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
.dashboard
    position: relative;
    top: 0;
    left: 0;
    height: 100%;
    .right-content
      position: relative
      margin: 60px 0 0 200px
      // background-color: #F5F5F5
      height: 100%
      [class^="graph-content-list"]
        width: 900px;
        height: 400px;
</style>
