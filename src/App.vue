<template>
   <div>
    <div class="app-head">
      <div class="app-head-inner">
          <h1>数据可视化</h1>
          <div class="nav">
             <router-link :to="{path:'dashboard'}" class="nav-list">仪表盘</router-link>
        <router-link :to="{path:'/table'}"  class="nav-list">工作表</router-link>
        <router-link :to="{path:'graph'}"  class="nav-list">图表分析</router-link>
        <router-link :to="{path:'/map'}"  class="nav-list">地图分析</router-link>
          </div>
       
        <div class="head-nav">

          <ul class="nav-list">
            <li @click="loginClick">登录</li>
            <li class="nav-pile">|</li>
            <li @click="regClick">注册</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="app-content">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    </div>
    <div class="app-foot">
      <p>© 2017 wang & liu</p>
    </div>
    <myDialog :isShow="isShowLoginDialog" @on-close="closeDialog('isShowLoginDialog')">
    <logForm @has-log="onhaslog"></logForm>
    </myDialog>
    <myDialog :isShow="isShowRegDialog" @on-close="closeDialog('isShowRegDialog')">
    <regForm></regForm>
    </myDialog>
  </div>
</template>

<script>
import myDialog from './components/base/dialog.vue'
import logForm from './components/logForm.vue'
import regForm from './components/regForm.vue'

export default {
  data(){
    return {
      isShowLoginDialog:false,
      isShowRegDialog:false
    }
  },
  methods:{

     loginClick(){
      this.isShowLoginDialog=true;
    },
     regClick(){
      this.isShowRegDialog=true;
    },
    closeDialog(attr){
      this[attr]=false;
    },
    onhaslog(data){
      console.log(data);
    }
  },
  components:{
    myDialog,
    logForm,
    regForm
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
a {
  color: inherit;
  text-decoration: none;
}
body {
      color: #9ea7b3!important;
    font-family:"Open Sans", Arial, sans-serif!important;
    font-size: 13px!important;
    line-height: 20px;
    overflow-x: hidden!important;
    min-height: 100%;
    z-index: -2;
    margin: 0px !important;
    background: url('./assets/bg.jpg') no-repeat top center fixed;
    -moz-background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    font-weight:bold;
}
.app-head {
  color: #b2b2b2;
  height: 90px;
  line-height: 90px;
  width: 100%;
}
.app-head-inner {
  width: 1200px;
  margin: 0 auto;
}
.head-logo {
  float: left;
}
.app-head-inner img {
  width: 50px;
  margin-top: 20px;
}
.app-head-inner h1
{
    font-size: 30px;
    font-weight: 200;
    letter-spacing: -1px;
    text-decoration: inherit;
    text-transform: uppercase;
    color: #fff;
    float: left;
}
.nav{
  float: left;
  margin-left: 200px;
}
.nav a{
  padding-left: 10px;
}
.head-nav {
  float: right;
}
.head-nav ul {
  overflow: hidden;
}
.head-nav li {
  cursor: pointer;
  float: left;
}
.nav-pile {
  padding: 0 10px;
}
.app-foot {
  text-align: center;
  height: 80px;
  width: 100%;
  line-height: 80px;
  clear: both;
  margin-top: 30px;
}
.container {
  width: 1200px;
  margin: 0 auto;
}
.hr {
  height: 1px;
  width: 100%;
  background: #ddd;
}
.button {
  background: #4fc08d;
  color: #fff;
  display: inline-block;
  padding: 10px 20px;
  cursor: pointer;
}
.button:hover {
  background: #4fc08d;
}
.g-form {

}
.g-form-line {
  padding: 15px 0;
}
.g-form-label {
  width: 100px;
  font-size: 16px;
  display: inline-block;
}
.g-form-input {
  display: inline-block;
}
.g-form-input input {
  height: 30px;
  width: 200px;
  line-height: 30px;
  vertical-align: middle;
  padding: 0 10px;
  border: 1px solid #ccc;
}
.g-form-btn {
  padding-left: 100px;
}
.g-form-error {
  color: red;
  padding-left: 15px;
}

</style>
