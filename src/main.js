import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSearch, faPaste, faUser, faUserFriends, faEnvelope, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons'
import { faGooglePlus, faAndroid, faApple, faInstagram, faGithubAlt, faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faThumbsUp, faHandshake } from '@fortawesome/free-regular-svg-icons'
import VuePageTransition from 'vue-page-transition'
// import { ClientTable, Event } from 'vue-tables-2'
// Vue.use(ClientTable) // 註冊ClientTable
Vue.use(ElementUI)

Vue.use(VuePageTransition)
library.add(faSearch, faPaste, faUser, faUserFriends, faGooglePlus, faAndroid, faApple, faThumbsUp, faEnvelope, faMapMarkedAlt, faHandshake, faInstagram, faGithubAlt, faFacebook, faYoutube)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

axios.defaults.withCredentials = true
Vue.use(VueAxios, axios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
