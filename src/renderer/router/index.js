import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'writer',
      component: require('@/components/Writer').default
    },
    {
      path: '/export',
      name: 'export',
      component: require('@/components/ExportManager').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
