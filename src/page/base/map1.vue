<template>
<div class="map1-option">
	<h1>图形符号</h1>
	<div @click="iconClick(0)"><icon name='circle' scale=1.5></icon></div>
	<div @click="iconClick(1)"><icon name='map-marker' scale=2></icon></div>
	<div @click="iconClick(2)"><icon name='square' scale=2></icon></div>
	<div @click="iconClick(3)"><icon name='caret-up' scale=3></icon></div>

</div>
</template>

<script>
export default {
  data(){
  	return {

  	}
  },
  methods:{
  	iconClick(type){
  		this.$emit('icon-change',type);
  	}
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.map1-option h1{
	margin: 10px
}
.map1-option div{
	float: left;
	width: 80px;
	height: 80px;
	display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin: 10px;
}
.map1-option div:hover{
	    border: 1px solid #5182e4;;
}
</style>
