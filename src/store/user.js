import * as fb from 'firebase'

class User {
  constructor (id) {
    this.id = id
  }
}

export default ({
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      console.log(payload)
      state.user = payload
    }
  },
  actions: {
    // Обозначаем что у нас асинхронная функция
    async registerUser ({commit}, {email, password}) {
      // При клике на кнопку регистрации
      // Чистим все ошибки которые есть
      commit('clearError')
      // Ставим загрузку
      commit('setLoading', true)
      /* Вызываем метод auth у firebase вернется объект у которого будет id присвоенный registerUser
      AWAIT говорим о том что будем ожидать что то асинхронное из функции и то что вернется используем в константе user
      */
      try {
        const user = await fb.auth().createUserWithEmailAndPassword(email, password)
        commit('setUser', new User(user.uid))
        // После ответа сервера говорим что загрузка завершена
        commit('setLoading', false)
      }
      catch (error){
        // В случае ошибки так же убираем загрузку и выводим ошибку
          commit('setLoading', false)
          commit('setError', error.message)
          throw error
        }
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
})
