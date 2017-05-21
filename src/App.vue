<template>
   <div>
    <div class="app-head">
      <div class="app-head-inner">
          <h1>数据可视化
            <span>v1.0</span>
          </h1>
          <div class="nav" v-if="username!==''">
           <ul>
             <li class="border-right">
                 <router-link :to="{path:'dashboard'}" >
             <icon name="flag" scale="1" class="fa-icon"></icon>
                 仪表盘
                 </router-link>
             </li>
             <li class="border-right">
                  <router-link :to="{path:'table'}"  class=""><icon name="flag" scale="1" class="fa-icon"></icon>工作表</router-link>
             </li>
             <li class="border-right">
                <router-link :to="{path:'graph'}"  class=""><icon name="flag" scale="1" class="fa-icon"></icon>图表分析</router-link>
             </li>
             <li >
                <router-link :to="{path:'/map'}"  ><icon name="flag" scale="1" ></Icon>地图分析</router-link>
             </li>

           </ul>
  
          </div>
       
         <div class="head-nav">
          <ul class="nav-list">
            <li> {{ username }}</li>
            <li v-if="username!== ''" class="nav-pile">|</li>
            <li v-if="username!== ''" @click="quit">退出</li>
            <li v-if="username=== ''" @click="logClick">登录</li>
            <li v-if="username===''" class="nav-pile">|</li>
            <li v-if="username=== ''" @click="regClick">注册</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="app-content">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    </div>
    <!-- <div class="app-foot">
      <p>© 2017 wang & liu</p>
    </div> -->
    <myDialog :isShow="isShowLoginDialog" @on-close="closeDialog('isShowLoginDialog')">
    <logForm @has-log="onSuccessLog"></logForm>
    </myDialog>
    <myDialog :isShow="isShowRegDialog" @on-close="closeDialog('isShowRegDialog')">
    <regForm @has-reg="onSuccessReg"></regForm>
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
      isShowRegDialog:false,
      username: '',
      userId:''
    }
  },
  methods:{
     logClick(){
      this.isShowLoginDialog=true;
    },
     regClick(){
      this.isShowRegDialog=true;
    },
    closeDialog(attr){
      this[attr]=false;
    },
    onSuccessLog (data) {
      this.username = data.username;
      this.userId=data.userId;
      window.userId=data.userId;
      window.username=data.username;
      this.closeDialog('isShowLoginDialog')

    },
   onSuccessReg (data) {
      this.username = data.username;
            this.userId=data.userId
window.userId=data.userId;
      window.username=data.username;
      this.closeDialog('isShowRegDialog')

    },
    quit(){
      this.username=""
      this.userId=''
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
a:hover{
  cursor: pointer;
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
  height: 60px;
  line-height: 60px;
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
.app-head-inner h1 span{
  background: none repeat scroll 0 0 rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    font-size: 11px;
    padding: 0 5px;
    position: relative;
    top: -3px;
}
.nav{
  float: left;
  margin-left: 50px;
   background: none repeat scroll 0 0 rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1);
    color: #FFFFFF;
    height: 30px;
    line-height: 30px;
    margin-top: 15px;
}
.nav ul li{
  display: block;
  float: left;
  padding-left: 30px;
  padding-right: 30px;
}
.fa-icon{
  position: relative;
  top: 4px;
  right: 4px;

}

.nav a:hover{
  color:rgb(101,130,162);
}
.nav .border-right{
  
  border-right: 1px solid rgba(0, 0, 0, 0.4);
  box-shadow: 1px 0 0 rgba(255, 255, 255, 0.1);

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
  font-size: 15px;
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
  background: rgb(14,21,34);
  color: #fff;
  display: inline-block;
  padding: 10px 20px;
  cursor: pointer;
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
