<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card v-if="!loading">
          <v-img
            :src="ad.imgSrc"
            height="300px"
          >
          </v-img>
          <v-card-text>
            <h1 class="text--primary">{{ad.title}}</h1>
            <p>{{ad.description}}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- <v-btn color="warning" >Edit</v-btn> -->
            <!-- Передаем байндим в компонент наше объявление что бы в пропсах открыть
            ставим условие являемся ли мы владельцем объявления
            -->
            <app-edit-ad-modal :ad="ad" v-if="isOwner"></app-edit-ad-modal>
            <app-buy-modal :ad="ad"></app-buy-modal>
          </v-card-actions>
        </v-card>
        <div v-else class="text-xs-center">
          <v-progress-circular
            :size="100"
            :width="4"
            color="primary"
            indeterminate
          >
          </v-progress-circular>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import EditAdModal from './EditAdModal'
export default {
  // Получаем props текущего id из new Router и передаем его в adById
  props: ['id'],
  computed: {
    ad () {
      const id = this.id
      return this.$store.getters.adById(id)
    },
    loading () {
      return this.$store.getters.loading
    },
    // Определяем что текущий пользователь является владельцем объявления
    isOwner () {
      return this.ad.ownerId === this.$store.getters.user.id
    }
  },
  components: {
    AppEditAdModal: EditAdModal
  }
}
</script>
