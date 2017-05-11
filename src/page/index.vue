<template>
<div id="a">首页
<button @click="a">11</button>
<myDialog :isShow="aa"></myDialog>
</div>
</template>

<script>
import myDialog from '../components/base/dialog.vue'
export default {
  data(){
  	return {
  		aa:false
  	}
  },
  methods:{
  	a(){
  		this.aa=true;
  	}
  },
    components:{
    myDialog
      }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#a{
	width: 100px;
	height: 100px;
	background: #fff;
}

</style>
