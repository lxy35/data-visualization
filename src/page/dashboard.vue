<template>
<!-- <img src="../assets/dashboard.png"  width="100%"> -->
  <div class="dashboard">
    <div class="left">
  	     <ul  class="table-name">
          <li v-for="table in tableNameList">
              <i class="icon1-file-text" @click="selectTable(table)">
                  {{table}}
              </i>
          </li> 
        </ul>
  	</div>
    <div class="right">
      <div class="operate-content">
        <div class="operate">分&nbsp&nbsp&nbsp&nbsp享</div>
      </div>
      <hr/>
      <graphDisplay :tableName="tableName"></graphDisplay>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';
import graphDisplay from './graphDisplay.vue';
var  BASE_URL ="http://127.0.0.1:8088/lxy/";
export default {
  name: 'dashboard',
  data() {
    return {
      myChart: {},
      tableNameList: [],
      tableName:'',
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
    this.$http.get(BASE_URL+'all/tables').then((response) => {
    // this.$http.get(BASE_URL+'all/columns?flag=kylin&table_name='+this.tableName).then((response) => {
      var data = response.body;
      this.tableNameList = data;
    });
  },
  methods: {
    selectTable(table){
      this.tableName = table;
    }
  },
  components: {
    'graphDisplay': graphDisplay
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus"> 
  // background-color rgb(202,217,246)
.dashboard
    position: fixed;
    top: 60px;
    left:0px;
    right: 0px;
    bottom: 0px;
    // background-color: #f5f5f5;
    .left
    	width: 199px;
    	height: 100%;
    	// background-color: rgb(232,235,237);
    	border-right: 1px rgb(227,230,232);
	    position: absolute;
	    top: 0;
	    left: 0px;
	    bottom: 0;
     background-color: #fff; 
    .table-name
        font-size 15px
        height 40px
        line-height 40px
        padding 10px 10px
        color: #000;
        li:hover
          background-color: #233B67;
          color: #fff;
          margin: 0 -10px;
          cursor: pointer;
    .right
    	position: absolute;
    	top: 0;
    	left: 200px;
    	right: 0;
    	// background-color: rgb(232,235,237);
    	overflow: scroll;
    	bottom:0px;
     background-color: #fff;
     .operate-content
        overflow: hidden;
        vertical-align: middle;
     .operate
        float: right;
        padding: 10px;
        margin-right: 80px;
        color: #000;
        cursor: pointer;
</style>
