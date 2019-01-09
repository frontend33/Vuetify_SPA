<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text-secondary mb-3">Orders</h1>
        <v-list
          subheader
          two-line
        >
          <v-list-tile
            v-for="order of orders"
            :key="order.id"

          >
            <v-list-tile-action>
              <v-checkbox
              color="success"
              :input-value="order.done"
                @change="markDone(order)"
              >

              </v-checkbox>
            </v-list-tile-action>

              <v-list-tile-title>{{order.name}}</v-list-tile-title>
              <v-list-tile-sub-title>{{order.phone}}</v-list-tile-sub-title>
            <v-list-tile-action>
              <v-btn
                class="primary"
                :to="'/ad/' + order.adId"
              >
                Open
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      orders: [
        {
          id: 'fds3',
          name: 'George',
          phone: '1-111-111-11-11',
          adId: '33',
          done: false
        }
      ]
    }
  },
  methods: {
    markDone (order) {
      order.done = true
    }
  }
}
</script>
