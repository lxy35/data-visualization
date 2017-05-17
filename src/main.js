// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// or import all icons if you don't care about bundle size
import 'vue-awesome/icons'
import './components/graphBase/css/style.styl'

/* Register component with one of 2 methods */

import Icon from 'vue-awesome/components/Icon'
import VueResource from 'vue-resource'
Vue.use(VueResource)
  // globally (in your main .js file)
Vue.component('icon', Icon)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})