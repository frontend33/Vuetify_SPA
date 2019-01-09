<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary mb-3">My ads</h1>
        <v-card
          class="elevation-10 mb-3"
          v-for="ad in ads"
          :key="ad.id"
        >
          <v-layout row>
            <v-flex xs4>
              <v-img
                :src="ad.imageSrc"
                height= "160px"
              >
              </v-img>

   <!--            </v-responsive> -->
              </v-flex>
            <v-flex xs8>
              <v-card-text>
                <h2 class="text-primary">{{ad.title}}</h2>
                <p>{{ad.description}}</p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="info"
                  :to="'/ad/'+ ad.id"

                >
                Open</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      ads: [
        {
          title: 'first ad',
          description: 'Hello i am description',
          promo: false,
          imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
          id: '123'
        },
        {
          title: 'first ad',
          description: 'Hello i am description',
          promo: true,
          imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
          id: '1234'
        }
      ]
    }
  }
}
</script>
