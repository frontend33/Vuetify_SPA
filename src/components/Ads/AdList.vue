<template>
  <v-container>
    <v-layout row v-if = "!loading && myAds.length !== 0">
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary mb-3">My ads</h1>
        <v-card
          class="elevation-10 mb-3"
          v-for="ad in myAds"
          :key="ad.id"
        >
          <v-layout row>
            <v-flex xs4>
              <v-img
                :src="ad.imgSrc"
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
    <v-layout v-else-if = "!loading && myAds.length === 0">
      <v-flex xs12 class="text-xs-center">
        <h1 class="text-primary">You have no ads</h1>
      </v-flex>
    </v-layout>
    <v-layout v-else>
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
            :size="100"
            :width="4"
            color="primary"
            indeterminate
        >
        </v-progress-circular>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    myAds (add) {
      return this.$store.getters.myAds
    },
    loading () {
      return this.$store.getters.loading
    }
  }

}
</script>
