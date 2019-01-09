<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-img
            src="https://cdn.vuetifyjs.com/images/carousel/sky.jpg"
            height="300px"
          >
          </v-img>
          <v-card-text>
            <h1 class="text--primary">lorem</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta, beatae.</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="warning" >Edit</v-btn>
            <v-btn color="success">Buy</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>
