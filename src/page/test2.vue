<template>
<div class='drag-content'>
  <tree ref='tree' :treeData="tableOption" :options="options"/>
</div>
</template>
<script>
import Tree from '../components/tree/tree.vue'

export default {
  components: {
    Tree
  },
  beforeCreate: function() {
   
  },
  methods: {

  },
  mounted:function(){
   
  },
  data() {

    return {
      tableOption:window.tableOption, 
            //工作表选项
            options: {
                showCheckbox: false,
                search: {
                    useInitial: true, useEnglish: false, customFilter: null
                }
            }
    }
  }
}
</script>
<style scoped>

</style>