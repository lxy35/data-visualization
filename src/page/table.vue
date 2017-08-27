<template>
  <div class="dashboard">
  	<div class="left">
         <ul  class="table-name">
          <li><router-link to="" >
             
                 GD_BABY_SITUATION
                 </router-link></li> 
            <li><router-link to="" >
                 GD_BASIC_INFO_DETAIL
                 </router-link></li> 
            <li><router-link to="" >
                 GD_EVALUATE_RESULT
                 </router-link></li> 
         </ul>
  	</div>
  	<div class="right">
  	<h1>{{table_title}}</h1>
<vue-good-table
      title=""
      :columns="columns"
      :rows="rows"
      :paginate="true"
      :lineNumbers="true"/>
  		</div>
  		</div>
</template>

<script>
import Tree from '../components/tree/tree.vue'
import $ from 'jquery'

var data=null
     $.ajax({
        url: " http://master.hadoop:7070/kylin/api/query",
        type: "POST",
        data: '{"sql":"select * from GD_BABY_SITUATION;","offset":0,"limit":50,"acceptPartial":true,"project":"jishengwei_by_qjk"}',
        dataType: "json",
          headers: {
            'Authorization': "Basic QURNSU46S1lMSU4=",
            'Content-Type': 'application/json;charset=utf-8'
        },
        async:false,
        success:function(fin)
        {
          console.log(fin)
          data=fin
        }
    });
  var columns=data.columnMetas.map((val,index)=>{
    var o={}
    o.label=val.name
    o.field=val.name
    return o
  })
  var rows=data.results.map((val,index)=>{
    var o={}
    o[columns[0].label]=val[0]
    o[columns[1].label]=val[1]
    o[columns[2].label]=val[2]
    o[columns[3].label]=val[3]
    o[columns[4].label]=val[4]
    o[columns[5].label]=val[5]
    o[columns[6].label]=val[6]
    o[columns[7].label]=val[7]
    return o
  })
  console.log(rows)
export default {
  name: 'test',
  data(){
    return {
      columns,
      rows,
    };
  },
};
</script>
<style scoped>
.table-name
 {font-size:15px;
  height:40px;
  line-height:40px;
  padding :10px 10px; 
  background-color:rgb(202,217,246)}

	.dashboard{
		position: fixed;
    top: 60px;
    left:0px;
    right: 0px;
    bottom: 0px;
	}
	.left{
		width: 199px;
		height: 100%;
		background-color: rgb(232,235,237);
		border-right: 1px rgb(227,230,232);
    position: absolute;
    top: 0;
    left: 0px;
    bottom: 0;
	}
	.right{
		position: absolute;
		top: 0;
		left: 200px;
		right: 0;
		background-color: rgb(232,235,237);
    overflow: scroll;
    bottom:0px;
	}

	.tree-1{
		margin-left: 30px;
	}
	h1{
    font-size: 35px;
    margin:30px auto;
    text-align: center;
	}
.aa{
	margin-right: 0px;
	margin-left: 800px;
}
</style>
