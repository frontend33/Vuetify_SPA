import * as fb from 'firebase'
class Ad {
  constructor (title, description, ownerId, imgSrc = '', promo = false, id = null) {
    this.title = title
    this.description = description
    this.ownerId = ownerId
    this.imgSrc = imgSrc
    this.promo = promo
    // this.id = id
  }
}

export default {

  state: {
    ads: [
      {
        title: 'first ad',
        description: 'Hello i am description',
        promo: true,
        imgSrc: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
        id: '123'
      },
      {
        title: 'first ad',
        description: 'Hello i am description',
        promo: true,
        imgSrc: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        id: '1234'
      },
      {
        title: 'first ad',
        description: 'Hello i am description',
        promo: false,
        imgSrc: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
        id: '12345'
      },
      {
        title: 'first ad',
        description: 'Hello i am description',
        promo: false,
        imgSrc: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
        id: '12'
      }
    ]
  },
  mutations: {
    createAdMutations (state, payload) {
      // В объект ads добавляем новое объявление  
      state.ads.push(payload)
    }
  },
  actions: {
    // С помощью commit диспатчим разные мутации
    // в actions помимо commit получиаем параметр getters можем получить id текущего пользователя
    async createAdActions ({commit, getters}, payload) {
      commit('clearError')
      commit('setLoading',true)
      try {
        const newAd = new Ad(
          payload.title,
          payload.description,
          getters.user.id,
          payload.imgSrc,
          payload.promo
        )
        // указываем к какой сущности из бд подключаемся (таблица ads)
        // что бы создать новый элемент в  бд используем метод push
        // метод идет асинхронно к бд и создает поля
        const ad = await fb.database().ref('ads').push(newAd)
        commit ('setLoading', false)
        commit ('createAdMutations', {
          // Расширим объект newAd еще одним ключом при помощи spread оператора
          ...newAd,
          id: ad.key
        })
      } catch (error) {
        commit ("setError", error.message)
        commit ('setLoading', false)
        throw error
        // и выкидываем ошибку что бы обработать в промисе
      }

      // payload.id = Math.random().toString()
      // commit('createAdMutations', payload)
    }
  },
  getters: {
    ads (state) {
      return state.ads
    },
    promoAds (state) {
      return state.ads.filter(ad => {
        return ad.promo === true
      })
    },
    myAds (state) {
      return state.ads
    },
    adById (state) {
      return adId => {
        return state.ads.find(ad => ad.id === adId)
      }
    }
  }
}
