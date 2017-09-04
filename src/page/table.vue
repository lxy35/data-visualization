<template>
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
        <div class="operate" @click="sourceShow">切换数据源</div>
        <!-- <div class="operate">新建图表</div> -->
        <div class="operate" @click="uploadShow">上传数据</div>
        <div class="operate">创建合表</div>
      </div>
      <hr/>
  	<!-- <h1>{{table_title}}</h1> -->
      <vue-good-table
      title=""
      :columns="columns"
      :rows="rows"
      :paginate="true"
      :lineNumbers="true"/> 
  	</div>
    <MyDialog :isShow="uploadIsShow" @on-close="closeUploadDialog">
        <div class="dialog dialog-content">
          <div id="upload-content">
            <form id="upload-form" action="" method="post" enctype="multipart/form-data">
　　　         <input type="file" id="upload" name="xslfile"/> <br />
　　　         <input value="上传文件" class="common-btn" @click="uploadFile"/>
            </form>
          </div>
        </div>
    </MyDialog>
    <MyDialog :isShow="sourceIsShow" @on-close="closeSourceDialog">
        <div class="dialog dialog-content">
          <div id="conn" class="clearfix ">
            <div class="line"><label>服务器</label><input type="text" name="service" style="width:60%" id="server"><input type="text" name="" style="width:30%;margin-left: 3px;" id="port"></div>
            <div class="line"><label>用户名</label><input type="text" name="" style="width:92%" id="username"></div>
            <div class="line"><label>密&nbsp&nbsp&nbsp码</label><input type="password" name="" style="width:92%" id="password"></div>
            <div class="line"><label>数据库</label><input type="text" name="" style="width:92%" id="database"></div>
            <div class="common-btn conn-btn">连  接</div>
          </div>
        </div>
    </MyDialog>
  </div>
</template>

<script>
import Tree from '../components/tree/tree.vue'
import MyDialog from '../components/base/dialog.vue';
import $ from 'jquery'
var  BASE_URL ="http://127.0.0.1:8088/lxy/";
export default {
  name: 'test',
  data(){
    return {
      tableNameList: [],
      uploadIsShow: false,
      sourceIsShow: false,
      columns: {},
      rows: [],
    };
  },
  created() {
    this.$http.get(BASE_URL+'all/tables').then((response) => {
    // this.$http.get(BASE_URL+'all/columns?flag=kylin&table_name='+this.tableName).then((response) => {
      var data = response.body;
      console.log(response);
      this.tableNameList = data;
    });
  },
  methods: {
    selectTable(table) {
      this.$http.get(BASE_URL+'all/data?table_name=' + table).then((response) => {
        var data = response.body;
        this.columns=data[0].cols.map((val,index)=>{
            var o={}
            o.label=val;
            o.field=val;
            return o
        });            
        this.rows = data.map((val,index)=>{
              //console.log('data'+ val);
          if(index>0){
            var o={};
            for(var j=0;j<this.columns.length;j++){      
              o[this.columns[j].label]=val.row[j];
            } 
            return o;
            }
          })
          this.rows.shift();
      });
    },
    uploadShow(){
      this.uploadIsShow = true;
    },
    closeUploadDialog() {
      this.uploadIsShow = false;
    },
    sourceShow(){
      this.sourceIsShow = true;
    },
    closeSourceDialog(){
      this.sourceIsShow = false;
    },
    uploadFile(){
      var fd = new FormData();
      var ajax = new XMLHttpRequest();
      fd.append("upload", 1);
      fd.append("xslfile", document.getElementById("upload").files[0]);
      ajax.open("post", BASE_URL+"upload/file", true);
      ajax.onload = function () {
      console.log(ajax.responseText);
      }; 
      ajax.send(fd);
      this.uploadIsShow = false; 
    }
  },
  components: {
    'MyDialog': MyDialog
    // 'v-column': column
  }
};
</script>
<style scoped>
.table-name
 {font-size:15px;
  height:40px;
  line-height:40px;
  padding :10px 10px; 
  /*background-color:rgb(202,217,246)}*/
}
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
  li {
    cursor: pointer;
  }
	.right{
		position: absolute;
		top: 0;
		left: 200px;
		right: 0;
		background-color: rgb(232,235,237);
    overflow: scroll;
    bottom:0px;
    color: #000;
	}
  .operate-content{
    overflow: hidden;
    padding-top: 10px;
  }
  .operate{
    float: right;
    padding: 10px;
    cursor: pointer;
    background-color: #fff;
  }
  #conn,#upload-content{
    border: 1px solid #2F4574;
    margin-left: 3px;
    padding: 35px 20px;
  }
  #upload{
    width: 150px;
    height: 100px;
  }
  #upload input{
    width: 100px;
  }
  .line label{
    min-width: 45px;
    text-align: right;
    margin-right: 3px;
  }
  .line input {
    margin-bottom: 10px;
    border-top: 0px;
    border-right: 0px;
    border-bottom: 1px solid #2F4574;
    border-left: 0px;
    background-color: transparent;
    color: #000;
  }
  .line input:focus{
    border: 0;
  }
  .common-btn{
    float:right;
    margin-right: 10%;
    padding: 5px 15px;
    cursor: pointer;
    background-color: #2F4574;
    color:#fff;
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
