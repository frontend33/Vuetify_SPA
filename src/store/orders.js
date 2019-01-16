import * as fb from 'firebase'
class Order {
  constructor (name, phone, adId, done = false, id = null) {
    this.name = name
    this.phone = phone
    this.adId = adId
    this.done = done
    this.id = id
  }
}

export default {
  state: {
    orders: []
  },
  mutations: {
    loadOrders (state, payload) {
      state.orders = payload
    }
  },
  actions: {
    // Отправляем данные в бд с новымыми путями users/${ownerId}/orders/
    async createOrder ({commit}, {name, phone, adId, ownerId}) {
      const order = new Order(name, phone, adId)
      commit('clearError')
      try {
        await fb.database().ref(`/users/${ownerId}/orders/`).push(order)
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    },
    async fetchOrders ({commit, getters}) {
      commit('setLoading', true)
      commit('clearError')
      const resultOrders = []
      try {
        // Обращаемся к таблице которая нужна конкретно к нашему пользователю
        const fbVal = await fb.database().ref(`/users/${getters.user.id}/orders`).once('value')
        const orders = fbVal.val()
        Object.keys(orders).forEach(key => {
          const order = orders[key]
          resultOrders.push(
            new Order(order.name, order.phone, order.adId, order.done, key)
          )
        })
        commit('loadOrders', resultOrders)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async markOrderDone ({commit, getters}, payload) {
      commit('clearError')
      try {
        // Ищем наш ордер по id (payload)  и обновляем поле done в true
        await fb.database().ref(`/users/${getters.user.id}/orders`).child(payload).update({
          done: true
        })
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    }
  },
  getters: {
    doneOrders (state) {
      return state.orders.filter(order => order.done)
    },
    unDoneOrders (state) {
      return state.orders.filter(order => !order.done)
    },
    orders (state, getters) {
      // Соединяем 2 массива
      return getters.unDoneOrders.concat(getters.doneOrders)
    }
  }
}
