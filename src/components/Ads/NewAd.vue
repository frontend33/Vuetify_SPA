<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm-6 offset-sm3>
        <h1 class="text-secondary mb-3">Create new ad</h1>
        <v-form  ref="form" v-model="valid" validation class="mb-3">
          <v-text-field
            name="title"
            label="Ad title"
            type="text"
            v-model="title"
            required
            :rules="[v=> !!v || 'Title is required']"
          >
          </v-text-field>
          <v-textarea
            name="description"
            label="Ad description"
            type="text"
            v-model="description"
            :rules="[v=> !!v || 'Description is required']"
          >
          </v-textarea>
        </v-form>
        <v-layout row mb-3>
          <v-flex xs12>
            <v-btn color="warning">
              Upload
              <v-icon right dark>cloud_upload</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <img src="" height="100">
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-switch
              label="Add to promo?"
              v-model="promo"
              color="primary"
            >
            </v-switch>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-spacer></v-spacer>
            <v-btn
            :disabled="!valid"
              color="success"
              @click="createAd"
            >
            Create ad
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      description: '',
      promo: false,
      valid: false
    }
  },
  methods: {
    createAd () {
      if (this.$refs.form.validate()) {
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.promo,
          imgSrc: 'https://miro.medium.com/max/854/1*nSOFaRRUwGbbYI3cwoQ38A.jpeg'
        }
        // Что бы добавить новое объявление к store в общий список объявлений
        // Запускаем с dispatch новое событие которое хотим вызывать
        this.$store.dispatch('createAdActions', ad)
      }
    }
  }
}
</script>
