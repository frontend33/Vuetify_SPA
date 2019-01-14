import * as fb from 'firebase'
class Ad {
  constructor(title, description, ownerId, imgSrc = '', promo = false, id = null) {
    this.title = title
    this.description = description
    this.ownerId = ownerId
    this.imgSrc = imgSrc
    this.promo = promo
    this.id = id
  }
}

export default {

  state: {
    ads: []
  },
  mutations: {
    createAdMutations (state, payload) {
      // В объект ads добавляем новое объявление
      state.ads.push(payload)
    },
    loadAds (state, payload) {
      state.ads = payload
    }
  },
  actions: {
    // С помощью commit диспатчим разные мутации
    // в actions помимо commit получиаем параметр getters можем получить id текущего пользователя
    async createAdActions ({commit, getters}, payload) {
      commit('clearError')
      commit('setLoading', true)
      console.log(payload)
      const image = payload.image
      try {
        const newAd = new Ad(
          payload.title,
          payload.description,
          getters.user.id,
          '',
          payload.promo
        )
        // указываем к какой сущности из бд подключаемся (таблица ads)
        // что бы создать новый элемент в  бд используем метод push
        // метод идет асинхронно к бд и создает поля
        const ad = await fb.database().ref('ads').push(newAd)
        // Находим расширение картинки
        const imageExtansion = image.name.slice(image.name.lastIndexOf("."))
        console.log(imageExtansion)
        // Кладем нашу картинку к файлу с названием который будет совпадать с ключом ad.key
        // метод put что бы внести наши изменения
        // const fileData = await fb.storage().ref(`ads/${ad.key}.${imageExtansion}`).put(image)
        const fileData = await fb.storage().ref(`ads/${ad.key}.${imageExtansion}`).put(image)
      
        // После того как завершится запрос мы можем получить url нашей картинки
        // Так как грузим один элемент ставим индекс 0
        // const imgSrc = fileData.metadata.downloadURLs[0]
        // const imgSrc = fileData.ref.getDownloadURL()
        const imgSrc = await fileData.ref.getDownloadURL()
        // для обновления в бд
        await fb.database().ref('ads').child(ad.key).update({
          imgSrc
        })
        
        commit('setLoading', false)
        commit('createAdMutations', {
          // Расширим объект newAd еще одним ключом при помощи spread оператора
          ...newAd,
          id: ad.key,
          imgSrc: imgSrc
        })
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
        // и выкидываем ошибку что бы обработать в промисе
      }

      // payload.id = Math.random().toString()
      // commit('createAdMutations', payload)
    },
    async fetchAds ({commit}) {
      commit('clearError')
      commit('setLoading', true)
      const resultAds = []
      try {
        // Указываем таблицу и метод который заберет все данные из таблицы once
        const fbVal = await fb.database().ref('ads').once('value')
        // Получить все значения у объекта
        const ads = fbVal.val()
        // Пробежимся по всем ключам объекта
        Object.keys(ads).forEach(key => {
          const ad = ads[key]
          resultAds.push(
            new Ad(
              ad.title,
              ad.description,
              ad.ownerId,
              ad.imgSrc,
              ad.promo,
              key
            )
          )
        })
        commit('loadAds', resultAds)

        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    }
  },
  getters: {
    // ads (state) {
    //   return state.ads
    // },
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
