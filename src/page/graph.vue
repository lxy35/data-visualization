<template>
  <div class="analysis" v-show="showFlag">
    <div class="left-bar" ref="leftBar" :style="{height:clientHeight+'px'}">
      <div class="left-bar-content">
        <div class="table-list-wrapper">
          <div class="item item-title">工作表</div>
          <ul>
          <!-- <li class="item table-list-item"><a>外勤工作表</a></li> -->
          <li class="item table-list-item" @click="changTable"><a>{{tableName}}</a></li>
          </ul>
        </div>
        <div class="field-wrapper">
          <div class="item item-title">字段</div>
          <div class="dimension-wrapper">
          <div class="item dimension-name">维度</div>
            <li class="item dimension-item" draggable="true" @dragstart='drag1($event)' v-for="dimension in dimensionList"><a :data-column="dimension.t_name">{{dimension.t_name}}</a></li>
          </div>
          <div class="measure-wrapper">
          <div class="item measure-name">度量</div>
          <li class="item measure-item" draggable="true" @dragstart='drag2($event)' v-for="measure in measureList"><a :data-column="measure.t_name" class="measure-name">{{measure.t_name}}</a>
          </li>
          </div>
        </div>
      </div>
    </div>
    <div class="main-content" ref="mainContent" :style="{height:clientHeight+'px'}">
       <div class="drag-wrapper">
         <div class="drag-item border-1px" @drop='drop1($event)' @dragover='allowDrop($event)' @dragleave='dragleave1($event)'><label class="drag-title-label">维度</label>
         </div>
         <!-- <div class="drag-item border-1px" @drop='drop2($event)' @dragover='allowDrop($event)' @dragleave='dragleave2($event)'><label class="drag-title-label">对比</label></div> -->
         <div class="drag-item border-1px" id="measure-list" @drop='drop3($event)' @dragover='allowDrop($event)' @dragleave='dragleave3($event)'><label class="drag-title-label">度量</label></div>
         <div class="drag-item border-1px" @drop='drop4($event)' @dragover='allowDrop($event)' @dragleave='dragleave4($event)'><label class="drag-title-label">次轴</label></div>
         <div class="drag-item border-1px" @drop='drop5($event)' @dragover='allowDrop($event)' @dragleave='dragleave($event)'><label class="drag-title-label">筛选器</label></div>
         <div class="drag-item border-1px" @drop='drop6($event)' @dragover='allowDrop($event)' @dragleave='dragleave($event)'>
         <label class="drag-title-label">颜色</label>
         <!-- <colorPicker v-model="color" @change="headleChangeColor"></colorPicker> -->
         </div>
       </div>
       <div class="graph-wrapper">
         <div class="graph">
          <!-- <v-column @optionConfig="_initOption" :optionUpdate="optionUpdate"></v-column> -->
         </div>
        <!--  <div class="graph">
           <img src="./pie.png" style="{width: 900px;height: 400px;}">
         </div> -->
       </div>
    </div>
    <div class="right-bar" ref="rightBar" :style="{height:clientHeight+'px'}">
      <v-rightbar :baseUrl="baseUrl" :option="option" :type="type" :tableName="tableName" :searchmeasure="searchmeasure" :searchdimension="searchdimension" :searchmethods="searchmethods" @update-type="update" @update-option="updateOption"></v-rightbar>
    </div>
    <MyDialog :isShow="isShowFilter" @on-close="closeFilterDialog">
        <div class="dialog dialog-content">
          筛选器
          <div class="filter-content">
            筛选条件：
            <div class="filter-detail">
              <div>
                <select class="form-select" v-model="selected" @change="updateFilter">
                  <option value="0">区间</option>
                  <option value="=">等于</option>
                  <option value="!=">不等于</option>
                  <option value=">">大于</option>
                  <option value="<">小于</option>
                  <option value=">=">大于等于</option>
                  <option value="<=">小于等于</option>
                </select>
                <input type="" name="" class="select-input" v-show="commonSelect" v-model="filterCount">
                <div class="section-content" v-show="sectionSelect">
                  <input type="" name="" v-model="filterCount">
                  <span>~</span>
                  <input type="" name="" v-model="filterCount1">
                </div>
              </div>
            </div>
          </div>
          <div class="button-content">
            <span @click="filterSelect">确定</span><span>取消</span>
          </div>
        </div>
    </MyDialog>
    <MyDialog :isShow="isShow" @on-close="closeColorDialog">
        <div class="dialog dialog-content">
          <div class="color-select-content">
            <div class="color-left">
              <span>{{dragColorItem}}</span>
            </div>
            <div class="color-right">
              <colorPicker v-model="color" @change="headleChangeColor"></colorPicker>
            </div>
          </div>
        </div>
    </MyDialog>
    <MyDialog :isShow="tableShow" @on-close="closeTableDialog">
        <div class="dialog dialog-content">
        <div class="table-title">选择工作表</div>
          <ul>
            <li class="table-list" v-for="table in tableNameList">
            <input type="radio" name="radio" class="" value="">{{table}}
            </li>
          </ul>
          <div class="common-btn conn-btn" @click="selectTable">切换工作表</div>
        </div>
    </MyDialog>
  </div>
</template>

<script>
import $ from 'jquery';
import echarts from 'echarts';
import rightBar from './graph-right';
import colorPicker from '../components/plugin/vue-color-picker/colorPicker';
import MyDialog from '../components/base/dialog.vue';

// var BASE_URL ="http://124.127.117.136:8082/lxy/";
// var BASE_URL ="http://10.108.211.136:3306/jishengwei";
var  BASE_URL ="http://127.0.0.1:8088/lxy/";

export default {
  data() {
    return {
      showFlag: true,
      baseUrl: BASE_URL,
      clientHeight: (document.documentElement.clientHeight - 60) || (document.body.clientHeight - 60),
      dimension: '',
      measure: '',
      dragContent: '',
      chartDate: {},
      // tableName: 'worker',
      tableName: 'players',
      // tableName: 'GD_BABY_SITUATION',
      myChart: {},
      option: {
        series: []
      },//
      // optionUpdate: {},
      dimensionList: [],
      measureList: [],
      searchdimension: [],
      searchmeasure: [],
      searchmeasure2: [],
      searchmethods: [],
      searchmethods2: [],
      searchcolor: [],
      colors:[],
      color: '#f00',
      isShow: false,
      isShowFilter: false,
      tableShow: true,
      tableNameList: ['players','worker','topwebsite','bar'],
      dragColorItem:'',
      sectionSelect: true,
      commonSelect: false,
      selected: 0,
      filterName: '',
      filterCount: 0,
      filterCount1: 0,
      filterCondition: '',
      type: 0 //0柱状图，1堆叠柱状图，2条形图，3条形堆叠图，4折现图，5饼图，6堆叠面积图，7雷达图，10笛卡尔积热力图（两个维度一个度量），13漏斗图（一个维度一个度量）
    }
  },
  // computed:{
  // },
  created() {
    this.$http.get(BASE_URL+'all/tables').then((response) => {
    // this.$http.get(BASE_URL+'all/columns?flag=kylin&table_name='+this.tableName).then((response) => {
      var data = response.body;
      // console.log(response);
      this.tableNameList = data;
    });
    this.$http.get(BASE_URL+'all/columns?table_name='+this.tableName).then((response) => {
    // this.$http.get(BASE_URL+'all/columns?flag=kylin&table_name='+this.tableName).then((response) => {
      var data = response.body;
      // console.log(response);
        for(let i in data) {
          if(data[i].t_type == 1){
            this.measureList.push(data[i]);
          } else if(data[i].t_type == 2){
            this.dimensionList.push(data[i]);
          }
        }
    });
    this.$nextTick(() => {
    });
  },
  mounted() {
    this.myChart = echarts.init(document.querySelector('.graph-wrapper .graph'));
    this.myChart.setOption(this.option);
    this._init();
  },
  methods: {
    _init(){
      window.addEventListener('resize', function() {
            this.myChart.resize();
          }.bind(this))
          // this.$emit('optionConfig',this.option);
    },
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
    // _initOption(option){
    //   this.optionUpdate = option;
    // },
    update(utype) { //根据左边修改图表type
      this.type = utype;
    },
    show(flag) {
      this.showFlag = flag;
    },
    changTable(){
      this.tableShow = true;
    },
    getData(table,type,dimension,measure,methods,colors,measure2,methods2,filterCondition){ //获取拖拽后的数据，并生成图表
      this.$http.get(BASE_URL+'chart/query?dimension='+dimension+'&table='+table+'&type='+type+'&values='+measure+'&methods='+methods+'&colors='+colors+'&values2='+measure2+'&methods2='+methods2+'&having='+filterCondition).then((response) => {
          var data = response.body;
          this.option = this._deepCopy(data); 
          this.myChart.setOption(this.option,true);//true表示和之前的option合并
          this._init();
        });
    },
    updateOption(newOption){
      this.option = newOption;
      console.log(this.option);
      this.myChart.setOption(this.option,true);//true表示和之前的option合并
      this._init();
    },
    updateFilter(){
      if(this.selected === 0) {
        this.sectionSelect = true;
        this.commonSelect = false;
      } else {
        this.sectionSelect = false;
        this.commonSelect = true;
      }
    },
    filterSelect(){
      if(this.selected === 0) {
        this.filterCondition += (','+this.filterName + '>' + this.filterCount);
        this.filterCondition += (','+this.filterName + '<' + this.filterCount1);
      } else {
        this.filterCondition += (','+this.filterName + this.selected + this.filterCount);
      }
      if(this.filterCondition.substr(0,1) == ','){
        this.filterCondition = this.filterCondition.substr(1);
      }
      this.getData(this.tableName, this.type, this.searchdimension, this.searchmeasure, this.searchmethods,this.colors, this.searchmeasure2, this.searchmethods2, this.filterCondition);
      this.isShowFilter = false;    
    },
    headleChangeColor (color) {

      // this.color = color;
      // var series = this.option.series;

      // if (series == null || series.length == 0) {
      //   return;
      // }

      // for( let item in series ){
      //   console.log(series[item]);
      //   if(series[item].name == this.dragColorItem){
      //     series[item].color = [color];
      //   }
      // }

      let hasSet = false;
      for(let i in this.colors){
          if(this.colors[i].indexOf(this.dragColorItem) >= 0){
            this.colors[i] = this.dragColorItem + ":" + color.substr(1,color.length);
            hasSet = true;
          }
      }
      if(!hasSet){//去掉#
        var t = this.dragColorItem + ":" + color.substr(1,color.length);
        this.colors.push(t);
      }

      // console.log(this.colors);
      this.getData(this.tableName, this.type, this.searchdimension, this.searchmeasure, this.searchmethods,this.colors, this.searchmeasure2, this.searchmethods2, this.filterCondition);

      //this.myChart.setOption(this.option,true);//true表示和之前的option合并
      //this._init();
    },
    closeColorDialog() {
      this.isShow = false;
    },
    closeFilterDialog() {
      this.isShowFilter = false;
    },
    closeTableDialog() {
      this.tableShow = false;
    },
    selectTable(){
      var radio = document.getElementsByName("radio");
      for(let i = 0; i < radio.length; i++){
        if(radio[i].checked){
          this.tableName=radio[i].parentNode.innerText;
          this.$http.get(BASE_URL+'all/columns?table_name='+this.tableName).then((response) => {
        // this.$http.get(BASE_URL+'all/columns?flag=kylin&table_name='+this.tableName).then((response) => {
            var data = response.body;
            this.measureList = [];
            this.dimensionList = [];
      // console.log(response);
            for(let i in data) {
              if(data[i].t_type == 1){
              this.measureList.push(data[i]);
              } else if(data[i].t_type == 2){
              this.dimensionList.push(data[i]);
              }
            }
          });
          this.tableShow = false;
        }
      }
    },
    drag1(event) {
       this.dimension = event.currentTarget;
       //通过复制被拖拽节点，使原来的位置上仍保存节点
       this.dragContent = this.dimension.cloneNode(true);
    },
    drag2(event) {
       this.measure = event.currentTarget;
       //通过复制被拖拽节点，使原来的位置上仍保存节点
       this.dragContent = this.measure.cloneNode(true);
       // let dt = event.dataTransfer;
       // dt.setData("Text", event.target.id);
       // dt.effectAllowed = "copy";
    },
    drop1(event) {
        //放维度
        event.preventDefault();
        if(this.dragContent){
          event.target.appendChild(this.dragContent);
        }
        let dimensionDragList = event.target.getElementsByTagName('a');
        var dimensionValues = [];
        for(let i in dimensionDragList){
          if(dimensionDragList[i].innerText != undefined){
             dimensionValues.push(dimensionDragList[i].getAttribute('data-column'));
          }
        }
        this.searchdimension = dimensionValues;
        this.getData(this.tableName, this.type, this.searchdimension, this.searchmeasure, this.searchmethods,this.colors, this.searchmeasure2, this.searchmethods2, this.filterCondition);

    },
    drop2(event) {
        event.preventDefault();
    },
    drop3(event) {
        //放度量
        event.preventDefault();
        //申明方法DOM
        let computeDisplay = document.createElement("i");
        computeDisplay.innerText = '(求和)';
        let computeSelect = document.createElement("div");
        var searchMethodsSelect = this.searchmethods;
    
        computeSelect.setAttribute('class','computed');
        computeSelect.innerHTML = '<ul index='+searchMethodsSelect.length+' class="measure-compute"><li><a data-method="sum">求和</a></li><li><a data-method="avg">平均数</a></li><li><a data-method="count">计数</a></li><li><a data-method="max">最大值</a></li><li><a data-method="min">最小值</a></li></ul>';
        //将methods DOM加入拖拽DOM元素中
        searchMethodsSelect.push('sum');
        this.searchmeasure.push(this.dragContent.getElementsByTagName('a')[0].getAttribute('data-column'));
        this.dragContent.getElementsByTagName("a")[0].appendChild(computeDisplay);
        this.dragContent.getElementsByTagName("a")[0].appendChild(computeSelect);

        this.dragContent.getElementsByTagName("a")[0].addEventListener('click', function(){
              var lc = this.lastChild.lastChild;
              lc.style.display='block';

        });
        if(this.dragContent){
          event.target.appendChild(this.dragContent);
        }
        var that = this;
        $('.measure-compute li').on('click',function(){
          var index = $(this).parent().attr("index");
          //更新显示文字
          let selectMethodText = $(this).find('a').text();
          $(this).parents('div').prev('i').text('(' + selectMethodText + ')');
          //保存对应methods
          let selectMethod = $(this).find('a').attr('data-method');
          $(this).parent().hide();
          searchMethodsSelect[index] = selectMethod;

          // console.log(searchMethodsSelect);
          that.getData(that.tableName, that.type, that.searchdimension, that.searchmeasure, searchMethodsSelect,that.colors, that.searchmeasure2, that.searchmethods2, that.filterCondition);
          return false;
        });


        this.searchmethods = searchMethodsSelect;
        // console.log(this.searchmeasure);
       
        this.getData(this.tableName, this.type, this.searchdimension, this.searchmeasure, this.searchmethods,this.colors, this.searchmeasure2, this.searchmethods2, this.filterCondition);
    },
    drop4(event) {
        event.preventDefault();
        //申明方法DOM
        let computeDisplay = document.createElement("i");
        computeDisplay.innerText = '(求和)';
        let computeSelect = document.createElement("div");
        var searchMethodsSelect2 = this.searchmethods2;
    
        computeSelect.setAttribute('class','computed');
        computeSelect.innerHTML = '<ul index='+searchMethodsSelect2.length+' class="measure-compute"><li><a data-method="sum">求和</a></li><li><a data-method="avg">平均数</a></li><li><a data-method="count">计数</a></li><li><a data-method="max">最大值</a></li><li><a data-method="min">最小值</a></li></ul>';
        //将methods DOM加入拖拽DOM元素中
        searchMethodsSelect2.push('sum');
        this.searchmeasure2.push(this.dragContent.getElementsByTagName('a')[0].getAttribute('data-column'));
        this.dragContent.getElementsByTagName("a")[0].appendChild(computeDisplay);
        this.dragContent.getElementsByTagName("a")[0].appendChild(computeSelect);

        this.dragContent.getElementsByTagName("a")[0].addEventListener('click', function(){
              var lc = this.lastChild.lastChild;
              lc.style.display='block';

        });
        if(this.dragContent){
          event.target.appendChild(this.dragContent);
        }
        var that2 = this;
        $('.measure-compute li').on('click',function(){
          var index = $(this).parent().attr("index");
          //更新显示文字
          let selectMethodText = $(this).find('a').text();
          $(this).parents('div').prev('i').text('(' + selectMethodText + ')');
          //保存对应methods
          let selectMethod = $(this).find('a').attr('data-method');
          $(this).parent().hide();
          searchMethodsSelect2[index] = selectMethod;

          console.log(searchMethodsSelect2);
          that2.getData(that2.tableName, that2.type, that2.searchdimension, that2.searchmeasure, that2.searchmethods,that2.colors,that2.searchmeasure2,searchMethodsSelect2, that2.filterCondition);
          return false;
        });


        this.searchmethods2 = searchMethodsSelect2;
        console.log(this.searchmeasure2);
       
        this.getData(this.tableName, this.type, this.searchdimension, this.searchmeasure, this.searchmethods, this.colors, this.searchmeasure2, this.searchmethods2, this.filterCondition);
    },
    drop5(event) {
      event.preventDefault();
      this.isShowFilter = true;
      if(this.dragContent) {
        event.target.appendChild(this.dragContent);
      }
      this.filterName = this.dragContent.getElementsByTagName('a')[0].getAttribute('data-column');
    },
    drop6(event) {
        event.preventDefault();

        if(this.dragContent) {
          event.target.appendChild(this.dragContent);
        }
        //this.searchcolor为解决多个元素设置颜色问题
        this.searchcolor.push(this.dragContent);
        //保存获取颜色的name值
        this.dragColorItem = $(this.dragContent).find('a').text();

        this.isShow = true;
        //利用对象是引用类型，使得在click函数中仍可访问isShow变量
        var self = this;
        $(this.searchcolor).on('click', function() {
          self.isShow = true;
          self.dragColorItem = $(this).find('a').text();
        });
    },
    allowDrop(event) {
        event.preventDefault();
       // let dt = event.dataTransfer;
       // dt.effectAllowed = "copy";
       // dt.dropEffect = "copy";
    },
    dragleave1(event) {
       event.preventDefault();
       let dom = event.target.parentNode;
       console.log(dom);
       if(dom.nodeName.toLowerCase() == 'li'){
          $(dom).remove();
       }
       // this.optionUpdate.xAxis = {};
       // this.myChart.setOption(this.option,true);
    },
    // dragleave2(event) {
    //    event.preventDefault();
    //    let domRemove = event.currentTarget;
    //    $(domRemove).find('.item').remove();
    //    this.option.series = [];
    //    this.myChart.setOption(this.option,true);
    // },
    dragleave3(event) {
       event.preventDefault();
       let dom = event.target.parentNode;
       if(dom.nodeName.toLowerCase() == 'li'){
          $(dom).remove();
       }
       // let dom = event.target.parentNode;
       // if(dom.className.indexOf('dimension-item') || dom.className.indexOf('measure-item')){
       //    $(dom).remove();
       //    event.stopPropagation();
       // }
       // let domRemove = event.currentTarget;
       // $(domRemove).find('.item').remove();
       // this.optionUpdate.series = [];
       // this.myChart.setOption(this.option,true);
    },
    dragleave4(event) {
       event.preventDefault();
       let dom = event.target.parentNode;
       if(dom.nodeName.toLowerCase() == 'li'){
          // $(dom).remove();
       }
       // let dom = event.target.parentNode;
       // if(dom.className.indexOf('dimension-item') || dom.className.indexOf('measure-item')){
       //    $(dom).remove();
       // }
       // let domRemove = event.currentTarget;
       // $(domRemove).find('.item').remove();
       // this.myChart.setOption(this.option,true);
    },
    dragleave(event) {
       event.preventDefault();
       let dom = event.target.parentNode;
       if(dom.nodeName.toLowerCase() == 'li'){
          // $(dom).remove();
       }
    },
    ischild(a,b) {
       for(; a ; a = a.parentNode) {
          if(a === b){
            return true;
          }
       }
       return false;
    }
  },
  watch: {
    type: {
      handler: function(){
        this.getData(this.tableName,this.type,this.searchdimension,this.searchmeasure, this.searchmethods,this.colors, this.searchmeasure2, this.searchmethods2, this.filterCondition);
      },
      //深度观察
      deep: true
    }
  },
  components: {
    'v-rightbar': rightBar,
    'colorPicker': colorPicker,
    'MyDialog': MyDialog
    // 'v-column': column
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../components/graphBase/css/mixin.styl";

.analysis
  position: fixed;
  top: 60px;
  width: 100%;
  height: 100%;
  // display: flex;
  .left-bar
    // flex: 0 0 200px;
    width: 200px;
    height: 100%;
    float: left;
    background-color: #F5F5F5;
    color: #000;
    overflow-y: auto;
    // overflow-x: hidden;
    .item
      height: 40px;
      line-height: 40px;
      list-style: none;
      text-align: center;
      a
        color: #7E8C8D;
      a:hover
        display: block;
        height: 40px;
        line-height: 40px;
        color: #fff;
        // background-color: rgba(255,255,255,0.3);
        background-color: #2F456E;
    .item-title
      padding-left: 10px;
      text-align: left;
  .main-content
    // flex: 1;
    position: absolute;
    top: 0px;
    left: 200px;
    right: 200px;
    height: 100%;
    padding: 5px 15px;
    background-color: #F5F5F5;
    text-align: left;
    overflow: auto;
    // overflow-x: auto;
    .drag-wrapper
      .drag-item
        height: 40px;
        min-width: 530px;
        line-height: 40px;
        border-1px(#29A2E6);
        .drag-title-label
          padding-right: 10px;
          color: #000;
        .measure-item, .dimension-item
          // background-color: #29A2E6;
          position: relative;
          background-color: #366797;
          display: inline-block;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border-radius: 3px;
          cursor: pointer;
          margin: 0 5px;
          padding: 0px 10px;
          a
            color: #fff;
            font-weight: 700;
            .computed
              position: absolute;
              top: 30px;
              //display: none;
              Width: 100%;
              margin-left: -10px;
              background-color: #fff;
              z-index: 50;
              .measure-compute
                display:none;
              a
                display: block;
                width: 100%;
                color: #314871;
              a:hover
                background-color: #F5F5F5;
    .graph-wrapper
      min-width: 530px;
      min-height: 450px;
      .graph
        // min-width: 500px;
        // min-height: 400px;
        width: 800px;
        height: 400px;
        margin: 30px 15px 20px;
        border: 1px solid #29A2E6; 
  .right-bar
    // flex: 0 0 200px;
    width: 200px;
    height: 100%;
    float: right;
    padding: 5px 5px 20px 5px;
    background-color: #F5F5F5;
    color: #000;
    overflow-y: auto;
    // overflow-x: hidden;
  .dialog-content
    position: relative;
    min-height: 300px;
    min-width: 400px;
    width: 30%;
    color: #000;
    .color-select-content
      margin: 25px 40px;
      .color-left
        float: left;
        margin-right: 30px;
        padding-right: 30px;
        min-height: 300px;
        border-right: 5px solid #F5F5F5;
      .color-right
        margin-left: 10px;
    .filter-content
      margin: 10px 40px;
      border: 5px solid #F5F5F5;
      padding: 10px;
      .filter-detail
        display: flex;
        justify-content:center;
        align-items:center;
        min-height: 180px;
        .form-select
          border: 0px;
          border-bottom: solid 1px #29A2E6;
          background-color: transparent;
          border-radius: 0px;
          min-width: 60px;
          text-align: center; 
          appearance:none;
        input
          display: inline-block;
          border: 0px;     
          border-bottom: 1px solid #29A2E6;   
          background-color:transparent;
          color: #000;
          text-align: center;
          margin: 5px;
        .select-input
          min-width: 180px;
        .section-content
          display: inline-block;
          input
            display: inline-block;
            max-width: 80px;
    .button-content
      text-align: right;
      color: #366797;
      span
        display: inline-block;
        margin-right: 45px;
        cursor: pointer;
    .table-title
      font-size: 20px;
    ul
      padding: 10px;
      .table-list
        cursor: pointer;
        padding: 5px 0;
    .common-btn{
      position: absolute;
      bottom: 15px;
      right: 20px;
      padding: 5px 15px;
      cursor: pointer;
      background-color: #2F4574;
      color:#fff;
  }
</style>