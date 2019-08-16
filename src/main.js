import Vue from 'vue'
import VueCodeHighlight from 'vue-code-highlight'
import App from './App.vue'
import store from './store'

require ('../node_modules/vue-code-highlight/themes/prism.css')

Vue.config.productionTip = false

Vue.use(VueCodeHighlight)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
