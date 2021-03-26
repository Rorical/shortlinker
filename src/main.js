import Vue from 'vue'
import App from './App.vue'
import element from '@pwp-app/better-element-ui'
import './assets/themes/shortlinker/theme/index.css'
import router from './router.js'
import VueAxios from 'vue-axios'
import axios from 'axios'
import qs from 'qs';
Vue.prototype.$qs = qs

Vue.config.productionTip = false
Vue.use(element)
Vue.use(VueAxios, axios)

new Vue({
	render: h => h(App),
	router
}).$mount('#app')
