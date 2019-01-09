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
      state.ads.push(payload)
    }
  },
  actions: {
    // С помощью commit диспатчим разные мутации
    // Вызываем actions
    createAdActions ({commit}, payload) {
      payload.id = Math.random().toString()
      commit('createAdMutations', payload)
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
