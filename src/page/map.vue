<template>
<div class="map">首页
<div class="map-left">
<div class="map-left-table">
<h1>
工作表
</h1>
<p>美食类商铺数据</p>
<hr>
</div>
<div class="map-left-layer">
<h1>
图层


</h1>
<p>美食类商铺数据</p>
<hr>
</div>
<div class="map-left-field">
<h1>
字段
</h1>
<ul>
	<li>商圈</li>
	<li>商圈</li>
	<li>商圈</li>
	<li>商圈</li>

	<li>商圈</li>
	<li>商圈</li>
	<li>商圈</li>
	<li>商圈</li>
	<li>商圈商圈商圈</li>
	<li>商圈商圈商圈</li>
	<li>商圈商圈商圈</li>
	<li>1</li>
</ul>
</div>

</div>
<div class="map-content">
	<div class="map-content-condition">
		<div>
			<span>维度</span>
		</div>
		<hr>
		<div>
			<span>数值</span>
		</div>
		<hr>
	</div>
	<div class="map-content-down">
		<div class="map-content-sort">
			
		</div>
		<div id="map">
			
		</div>
	</div>
</div>
<div class="map-right">
	<div class="map-title">
		<h1>图表标题</h1>
		<input type="" name="">
		<hr>
	</div>
	<div class="map-type">
		<h1>图表类型</h1>
		<a><img src="../assets/mapType/1.png" height="33" width="33"></a>
		<img src="../assets/mapType/2.png" height="33" width="33">
		<img src="../assets/mapType/3.png" height="33" width="33">
		<img src="../assets/mapType/4.png" height="33" width="33">
		<img src="../assets/mapType/5.png" height="33" width="33">
		<img src="../assets/mapType/6.png" height="33" width="33">
		<hr>
	</div>
</div>
<!-- <myDialog :isShow="isShowSelectTableDialog" @on-close="closeSelectTableDialog">
	<div class="test">
		<selectTable @select-success="aa"></selectTable>
	</div>
</myDialog> -->
</div>
</template>

<script>
import myDialog from '../components/base/dialog.vue'
import selectTable from '../components/selectTable.vue'
export default {
mounted(){
	console.log(BMap)
            var map = new BMap.Map("map",{enableMapClick:true});
        var point = new BMap.Point(116.404, 39.915); // 创建点坐标  
        map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别
        map.addControl(new BMap.NavigationControl());
        map.addControl(new BMap.ScaleControl());
},
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
}
.map-left{
	width: 200px;
	height: 100%;
	background-color: rgb(232,235,237);
	float: left;
	overflow: auto;


}

.map-left-table,.map-left-layer{
	padding:8px 16px;
	height: 50px;
	width: 168px;

}
.map-left-field{
	padding: 8px 16px;
	width: 168px;
}
.map-left-table p,.map-left-layer p{
	color:black;
	margin: 10px 0;
}
.map-left-field ul li{
	color: black;
	margin: 10px 20px;
	list-style: square;

}

.map-content{
	position: absolute;
	top: 0px;
	left: 200px;
	right: 220px;
	height: 100%;
	background-color: #F3F5F6;
}
.map-content-condition{
	padding: 8px 16px;
}
.map-content-condition div{
	height: 35px;
	line-height: 35px;
	font-size: 15px;
}
.map-content-down{
	height: 100%;
	width: 100%;
}
.map-content-sort{
	width: 120px;
	border-right: 1px solid rgb(154,154,154);
	padding: 8px 16px;
	height: 100%;
	float: left;
}
#map{
	/*float: left;*/
	height: 100%;
	width: auto;
	margin-left: 130px;

}
.map-right{
	width: 220px;
	height: 100%;
	float: right;
	background-color: #E8EBED;
}
.map-title,.map-type{
	padding: 8px 16px;

}
.map-title input{
	margin: 10px 0px;
}
.map-type img{
	cursor: pointer;
	margin: 10px 10px;
}

</style>
