import Vue from 'vue'
import Router from 'vue-router'
import IndexVue from '../page/index.vue'
import TableVue from '../page/table.vue'
import GraphVue from '../page/graph.vue'
import MapVue from '../page/map.vue'
import DashboardVue from '../page/dashboard.vue'
import Map1 from '../page/base/map1.vue'
import Map2 from '../page/base/map2.vue'
import Map3 from '../page/base/map3.vue'

import Map4 from '../page/base/map4.vue'

import Map5 from '../page/base/map5.vue'

import Map6 from '../page/base/map6.vue'

import Test from '../page/test.vue'
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
      component: MapVue,
      children:[{
        path:'map1',
        component:Map1
      },
      {
        path:'map2',
        component:Map2
      },
      {
        path:'map3',
        component:Map3
      },
      {
        path:'map4',
        component:Map4
      },
      {
        path:'map5',
        component:Map5
      }
      ,
      {
        path:'map6',
        component:Map6
      }]
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
    },
     {
      path: '/test',
      name: 'Test',
      component: Test
    },

  ]
})


