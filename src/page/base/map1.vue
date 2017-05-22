<template>
<div class="map1-option">
	 <h1>图形符号</h1>
   <div class="options">
    <div @click="iconClick(0)" class="div1"><icon name='circle' scale=1.5></icon></div>
  <div @click="iconClick(1)" class="div2"><icon name='map-marker' scale=2></icon></div>
  <div @click="iconClick(2)" class="div3"><icon name='square' scale=2></icon></div>
  <div @click="iconClick(3)" class="div4"><icon name='caret-up' scale=3></icon></div>
  </div>
	

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
.map1-optipn{
 position: relative;
 height: 100%;
}
.map1-option h1{
	margin: 10px
}
.options{
  height: 200px;
  width: 220px;
  position: relative;
}
.options .div1{
    width: 80px;
    height: 80px;
    position: absolute;
    top: 10px;
    text-align: center;
    line-height: 80px;
    margin: 10px;
}
.options .div2{
    width: 80px;
    height: 80px;
    position: absolute;
    top: 10px;
    text-align: center;
    line-height: 80px;
    margin: 10px;
    right: 0px;
}
.options .div3{
    width: 80px;
    height: 80px;
    position: absolute;
    top: 100px;
    text-align: center;
    line-height: 80px;
    margin: 10px;
}
.options .div4{
    width: 80px;
    height: 80px;
    position: absolute;
    top: 100px;
    text-align: center;
    line-height: 80px;
    margin: 10px;
    right: 0px;
}
.options div:hover{
	    border: 1px solid #5182e4;;
}
</style>
