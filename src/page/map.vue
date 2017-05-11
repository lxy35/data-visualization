<template>
<div class="map">首页
<div class="map-left">
<div class="map-left-table">
<!-- <p>
	工作表
	<icon name="plus"></icon>
</p> -->
<p>
工作表
		<a @click="showSelectTableDialog">
			<icon name="plus"></icon>
		</a>

</p>

</div>
</div>
<div class="map-content"></div>
<div class="map-right"></div>
<myDialog :isShow="isShowSelectTableDialog" @on-close="closeSelectTableDialog">
	<div class="test">
		<selectTable @select-success="aa"></selectTable>
	</div>
</myDialog>
</div>
</template>

<script>
import myDialog from '../components/base/dialog.vue'
import selectTable from '../components/selectTable.vue'
export default {
  data(){
  	return {
  		isShowSelectTableDialog:false
  	}
  },
  methods:{
  	showSelectTableDialog(){
  		console.log("aaa")
  		this.isShowSelectTableDialog=!this.isShowSelectTableDialog;
  	},
  	closeSelectTableDialog()
  	{
  		this.isShowSelectTableDialog=false;
  	},
  	aa(table)
  	{

  		console.log(table.tableId)
  		this.closeSelectTableDialog();
  	}
  },
    components:{
    myDialog,selectTable
      }

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.map{
	position: fixed;
	top: 60px;
	width: 100%;
	height: 100%;
	background-color: red;
}
.map-left{
	width: 200px;
	height: 100%;
	overflow: auto;
	background-color: rgb(232,235,237);
	float: left;
}
.map-left-table{
	padding:8px 16px;
	min-height: 100px;
	width: 168px;

}
.map-left-table p{
	color:black;
}
.map-left-table p .fa-icon{
	float: right;
	position: relative;
	top: 2px;
}
.map-content{
	position: absolute;
	top: 0px;
	left: 200px;
	right: 220px;
	height: 100%;
	background-color: #F3F5F6;
}
.map-right{
	width: 220px;
	height: 100%;
	float: right;
	background-color: #E8EBED;
}
</style>
