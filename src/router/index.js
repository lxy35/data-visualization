import Vue from 'vue'
import Router from 'vue-router'
import IndexVue from '../page/index.vue'
import TableVue from '../page/table.vue'
import GraphVue from '../page/graph.vue'
import MapVue from '../page/map.vue'
import DashboardVue from '../page/dashboard.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: IndexVue
    },
    {
      path: '/table',
      name: 'table',
      component: TableVue
    },
     {
      path: '/map',
      name: 'map',
      component: MapVue
    },
     {
      path: '/graph',
      name: 'graph',
      component: GraphVue
    },
     {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardVue
    }

  ]
})


