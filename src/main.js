import Vue from 'vue'
import VueCodeHighlight from 'vue-code-highlight'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import store from './store'

require ('../node_modules/vue-code-highlight/themes/prism.css')

Vue.config.productionTip = false

Vue.use(VueCodeHighlight)
Vue.use(BootstrapVue)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
