import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import VueI18n from 'vue-i18n'
import i18nMessages from './config/i18n'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en',
  messages: i18nMessages
})

Vue.directive('clickaway', {
  bind (el, binding, vnode) {
    vnode.context.clickawayEvent = (event) => {
      if ( el != event.target &&
           !el.contains(event.target) ) {
        vnode.context[binding.expression](event)
      }
    }
    document.body.addEventListener('mouseup', vnode.context.clickawayEvent)
  },

  unbind (el, binding, vnode) {
    document.body.removeEventListener('mouseup', vnode.context.clickawayEvent)
  }
})

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  i18n,
  template: '<App/>',
}).$mount('#app')
