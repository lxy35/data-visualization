<template>
  <div class="right-bar-inner">
      <button @click="savaGraph">保存</button>
  	  <div>
        <div class="right-title">图表标题</div>
        <input type="text" name="graph-title" style="width:100%">
      </div>
      <div class="graph-type">
        <div class="right-title">图表类型</div>
        <div class="graph-content clearfix">
          <i class="icon-bar" @click="update(0)">
            <div class="angle"></div>
            <div class="icon-bar-hover">
              <div class="bar-title">柱形图</div>
              <div>1个维度,1个或多个度量</div>
            </div>
          </i>
          <i class="icon-pie" @click="update(5)">
            <div class="angle"></div>
            <div class="icon-bar-hover">
              <div class="bar-title">饼图</div>
              <div>1个维度,1个度量</div>
              <div>0个维度,多个度量</div>
            </div>
          </i>
          <i class="icon-pie1_1"></i>
          <i class="icon-column" @click="update(2)">
            <div class="angle"></div>
            <div class="icon-bar-hover">
              <div class="bar-title">条形图</div>
              <div>1个维度,1个或多个度量</div>
            </div>
          </i>
          <i class="icon-funnel_1"></i>
          <i class="icon-gauge_11"></i>
          <i class="icon-graph_1"></i>
          <i class="icon-line" @click="update(4)">
            <div class="angle"></div>
            <div class="icon-bar-hover">
              <div class="bar-title">折线图</div>
              <div>1个维度,1个或多个度量</div>
            </div>
          </i>
          <i class="icon-line1_1"></i>
          <i class="icon-lineStack" @click="update(6)">
            <div class="angle"></div>
            <div class="icon-bar-hover">
              <div class="bar-title">堆积图</div>
              <div>1个维度,1个或多个度量</div>
            </div>
          </i>
          <i class="icon-scatter_1"></i>
        </div>
      </div>
      <!-- <div class="right-title"> -->
        <!-- <input type="checkbox" name="">显示图表标签 -->
      <!-- </div> -->
      <div class="axis" v-show="axisDisplay">
        <div class="right-title">坐标轴</div>
        <div class="right-title">标题<input type="text" name="axis-title" style="width:75%" v-model="axisTitle" @blur="updateAxisTitle(axisTitle)"></div>
        <div class="right-title">单位<input type="text" name="unit" style="width:75%" v-model="axisUnit" @blur="updateAxisUnit(axisUnit)"></div>
        <div class="right-title">最大值<input type="text" name="" style="width:45%">
        <input type="checkbox" name="">自动</div>
        <div class="right-title">最小值<input type="text" name="" style="width:45%">
        <input type="checkbox" name="">自动</div>
      </div>
      <!-- <div class="right-title">辅助线</div> -->
      <div class="right-title"><input type="checkbox" name="">显示缩略轴</div>
      <div>
        <div class="right-title">图表备注</div>
        <input type="text" name="" style="width:100%">
      </div>
  </div>
</template>

<script>
// import {doPost} from "../../../components/graphBase/js/ajaxUtils.js";
export default {
  props: {
    baseUrl: {
      type: String
    },
    option: {
      type: Object
    },
    type: {
      type: Number
    },
    tableName: {
      type: String
    },
    searchmeasure: {
      type: Array
    },
    searchdimension: {
      type: Array
    },
    searchmethods: {
      type: Array
    }
  },
  data() {
    return {
      newOption: this.option,
      newType: this.type,
      axisDisplay: true,
      axisTitle: '',
      axisUnit: ''
    }
  },
  methods: {
    update(type){
       this.$emit('update-type',type);
    },
    updateAxisTitle(title){
      console.log(this.option);
      this.newOption.yAxis.name = title;
      this.$emit('update-option',this.newOption);
    },
    updateAxisUnit(unit){
      this.newOption.yAxis.name += '('+unit+')';
      this.$emit('update-option',this.newOption);
    },
    _createxmlHttpRequest() {
      let xmlHttp ;
      if (window.ActiveXObject) {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
      } else if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
      }
      return xmlHttp;  
    },
   _doGet(url, data) {
      // 注意在传参数值的时候最好使用encodeURI处理一下，以防出现乱码 
      let xmlHttp = this._createxmlHttpRequest();
      xmlHttp.open("GET", url);
      xmlHttp.send(data);
      xmlHttp.onreadystatechange = function() {
        if ((xmlHttp.readyState == 4) && (xmlHttp.status == 200)) {
          console.log("ok"); //alert('success'); 
        } else {
          console.log('fail');
        }
      }
    }, 
    _doPost(url, data) {
      // 注意在传参数值的时候最好使用encodeURI处理一下，以防出现乱码 
      let xmlHttp = this._createxmlHttpRequest();
      xmlHttp.open("POST", url);
      xmlHttp.setRequestHeader("Content-Type", "application/json");
      xmlHttp.send(data);
      xmlHttp.onreadystatechange = function() {
        if ((xmlHttp.readyState == 4) && (xmlHttp.status == 200)) {
          console.log("ok");
        } else {
           //alert('fail');
        }
      }
    },
    savaGraph(){
      let saveOptions = {
        "gId": 11,
        "tableName": this.tableName,
        "dim": this.searchdimension.join(","),
        "values": this.searchmeasure.join(","),
        "methods": this.searchmethods.join(","),
        "compare": '',
        "options": JSON.stringify(this.option),
        "type": this.type
      }
      var saveOptionsString = JSON.stringify(saveOptions);
      // console.log(saveOptionsString);
      this._doPost(this.baseUrl+'graph/save_graph', saveOptionsString);
      // this.$http.post(this.baseUrl+'graph/save_graph',
      //  {graph:{gId: 3,tableName:"worker"}}
      //  ).then((response) => {
      //   console.log(response);
      //   // if(response.ok == true){
      //   //   alert("保存成功");
      //   // }
      // });
    }
  },
  watch: {
    type: {
      handler: function(){
      this.newType = this.type;
      // this.myChart.setOption(this.optionUpdate,true);
      }
    },
    newType: {
      handler: function(){
        if(this.newType == 5){
          this.axisDisplay = false;
        } else {
          this.axisDisplay = true;
        }
      }
    },
    option: {
      handler: function(){
        this.newOption = this.option;
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.right-bar-inner
    flex: 0 0 200px;
    width: 200px;
    padding: 5px 5px 20px 5px;
    background-color: #F5F5F5;
    color: #000;
    overflow-y: auto;
    // overflow-x: hidden;
    .right-title
      height: 40px;
      line-height: 40px;
      text-align: left;
    input
      // margin-bottom: 45px;  
      border-top:0px;   
      border-right:0px;   
      border-bottom:1px solid #29A2E6;   
      border-left:0px;
      background-color:transparent;
      color: #000;
      text-align: center;
      &:focus
        border: 0;
    .graph-type
      .graph-content
        width: 90%;
        height: 200px;
        border: 1px solid #29A2E6;
        [class^="icon-"]
          position: relative;
          cursor: pointer;
          .angle
            display: none;
          .icon-bar-hover
            display: none;
        [class^="icon-"]:hover
          position: relative;
          cursor: pointer;
          background-color: #fff;
          text-align: left;
          .angle
            position: absolute;
            display: block;
            left: 10px;
            top: 30px;
            height: 0px;
            z-index: 10;
            border-color: transparent transparent #e2e2e2 transparent;
            border-width: 0 10px 10px 10px;
            border-style: dashed dashed solid dashed;
            border-bottom-color: #fff;
          .icon-bar-hover
            position: absolute;
            display: block;
            left: 0px;
            top: 50;
            z-index: 10;
            width: 90px;
            padding: 3px;
            background-color: #fff;
            line-height: 20px;
            font-size: 12px;
            .bar-title
              font-size: 14px;
</style>