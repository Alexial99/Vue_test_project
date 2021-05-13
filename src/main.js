import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import {store} from './store.js'
import auth from './core/Auth'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(IconsPlugin)

Vue.config.productionTip = false
Vue.use(BootstrapVue)
new Vue({
  router,
  store:store,
  render: h => h(App),
}).$mount('#app')
auth.checkAuth();
