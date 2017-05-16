<template>
<div>
	<h1>热力半径</h1>
	<input v-model='rad' placeholder="请输入热力半径">像素
</div>
</template>

<script>
export default {
  data(){
  	return {
  		rad:20
  	}
  },
  watch:{
  	rad:function(val){
  		this.$emit('rad-change',val);
  	}
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1{
	margin: 10px 0px;
}

</style>
