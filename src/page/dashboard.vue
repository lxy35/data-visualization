<template>
  <div class="dashboard">
    <div class="left">
    <tree ref ='tree' :treeData="treeData" :options="options"  class="tree-1" @node-click='handleNode'/>

    </div>
    <div class="right">
    <h1>{{table_title}}</h1>

      </div>
      </div>
</template>

<script>
import Tree from '../components/tree/tree.vue'
export default {
  name: 'hello',
  methods:{
    handleNode:function(node){
      if(node.children==undefined||node.children==[])
      {
          this.table_title=node.label;

      }
    }
  },
  data () {
    return {
      
      table_title:'人口',
      options: {
        showCheckbox: false,
        search: {
          useInitial: true,
          useEnglish: false,
          customFilter: null
        }
      },
      treeData: [
        {
          id: 'folder1',
          label: '人口数据',
          open: true,
          checked: false,
          parentId: null,
          visible: true,
          searched: false,
          children: [
            {
              id: 'table1',
              label: '人口',
              checked: false,
              parentId: 1,
              searched: true,
              visible: true
            },
      {
              id: 'table2',
              label: '人口',
              checked: false,
              parentId: 1,
              searched: true,
              visible: true
            },{
              id: 'table3',
              label: '人口',
              checked: false,
              parentId: 1,
              searched: true,
              visible: true
            }
          ]
        },
                {
          id: 'folder2',
          label: '本地生活数据',
          open: true,
          checked: false,
          parentId: null,
          visible: true,
          searched: false,
          children: [
            {
              id: 'table1',
              label: '美食类商铺数据',
              checked: false,
              parentId: 5,
              searched: true,
              visible: true
            },
      {
              id:'table2',
              label: '北京校区信息数据',
              checked: false,
              parentId: 5,
              searched: true,
              visible: true
            },{
              id: 'table3',
              label: '居民收支数据',
              checked: false,
              parentId:5,
              searched: true,
              visible: true
            }
          ]
        }

      ]
    }
  },
  components: {Tree}
}
</script>
<style scoped>
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
