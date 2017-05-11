<template>
<div class="select-table">
<h1>选择文件夹</h1>
<select v-model="selectedFolder" class="select-content" @change="changeTables">
  <option :value="folder.folderId" v-for="folder in folders">{{folder.folderName}}</option>
</select>
<h2 >选择工作表</h2>

<ul>
  <li v-for="value in tables">{{value.tableName}}</li>
</ul>

<br><br>
<button @click="btnClick">确定</button>
</div>

</template>

<script>
export default {
  methods:{
    btnClick(){
      console.log('aa')
      // this.$emit('select-success',{
      //   tableId:this.selectedTable
      // });
    },
    changeTables(){
      console.log(this.selectedFolder)
      let mark=this.selectedFolder;
      let b;
      this.data_tables.forEach(function(val,index){
        if(val.folderId==mark)
        {
          b=val.folderContent;
        }
      })
      this.tables=b;
      console.log(this.tables)
    }
  },
  data () {
    return {
      tables:[],
      selectedFolder:'',
      selectedTable:'a',
      folders:[
      {
        folderId:65242,
        folderName:'测试内容d771'
      },
      {
        folderId:65243,
        folderName:'测试内容d772'
      }
     ],

      data_tables:[
    {
        "foldName":"测试内容d771","folderContent":[
        {
            "tableId":51488,"tableName":"测试内容oi7h"
        }
        ,
        {
            "tableId":51488,"tableName":"测试内容oi7h"
        }
        ,
        {
            "tableId":51488,"tableName":"测试内容oi7h"
        }
        ,
        {
            "tableId":51488,"tableName":"测试内容oi7h"
        }
        ,
        {
            "tableId":51488,"tableName":"测试内容oi7h"
        }
        ],"folderId":65242
    }
    ,
    {
        "foldName":"测试内容d772","folderContent":[
        {
            "tableId":51488,"tableName":"测试内容oi7h"
        }
        ,
        {
            "tableId":51488,"tableName":"测试内容oi7h"
        }
        ,
        {
            "tableId":51488,"tableName":"测试内容oi7h"
        }
        ,
        {
            "tableId":51488,"tableName":"测试内容oi7h"
        }
        ],"folderId":65243
    }
    ]
    }
  },
  mounted(){

        // this.$http.get('api/table/list',{
        //   params:{
        //     userId:window.userId
        //   }
        // })
        // .then((res) => {
        //   this.folders=res.data.forEach(function(val,index){
        //     folders.push({

        //     })
        //   })
        // }, (error) => {
        //   console.log(error)
        // })
  },
  components:{
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.select-table{
  width: 650px;
  height: 150px;
  /*border: 1px solid black;*/
}
.select-content{
  width: 200px;
  height: 30px;
}
</style>
