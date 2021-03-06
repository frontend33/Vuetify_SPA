import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import store from './store'
import * as fb from 'firebase'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import BuyModal from '@/components/Shared/BuyModal'
import './stylus/main.styl'
/* Изменит стандартные классы
 import colors from 'vuetify/es5/util/colors'
 theme: {
    primary: colors.blue.darken3
  }
*/
Vue.use(Vuetify, {
  iconfont: 'md'
})

Vue.component('app-buy-modal', BuyModal)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  // Иницилизация компонента кидаем объект конфигурации
  created () {
    fb.initializeApp({
      apiKey: 'AIzaSyBr_y0GaRD2wJeVHeZP1V1dkcQWoy_UPAw',
      authDomain: 'vuetify-ads.firebaseapp.com',
      databaseURL: 'https://vuetify-ads.firebaseio.com',
      projectId: 'vuetify-ads',
      storageBucket: 'vuetify-ads.appspot.com',
      messagingSenderId: '508455495210'
    })
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })
    this.$store.dispatch('fetchAds')
  }
})
