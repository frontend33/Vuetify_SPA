// Создаем общую шину событий где прописываем все подключенные модули .js
import Vue from 'vue'
import Vuex from 'vuex'
import ads from './ads'
import user from './user'
// Показывать ошибки и лоадинг
import shared from './shared'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ads, user, shared
  }
})
