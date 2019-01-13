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
      state.user = payload
    }
  },
  actions: {
    /* async Обозначаем что у нас асинхронная функция
    И передаем в нее объект с заполненными полями нового пользователя
    */
    async registerUser ({commit}, {email, password}) {
      // При клике на кнопку регистрации
      // Чистим все ошибки которые есть методом shared js
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
      } catch (error) {
        // В случае ошибки так же убираем загрузку и выводим ошибку
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async loginUser ({commit}, { email, password }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        // Метод который позволяет залогиниться в систему
        const user = await fb.auth().signInWithEmailAndPassword(email, password)
        // commit('setUser', new User(user.uid))
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    logoutUser ({commit}) {
      // Выход из сайта
      fb.auth().signOut()
      commit('setUser', null)
    },
    autoLoginUser ({commit}, payload) {
      commit('setUser', new User(payload.uid))
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    isUserLoggedIn (state) {
      return state.user !== null
    }
  }
})
