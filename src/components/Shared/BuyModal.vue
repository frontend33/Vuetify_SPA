<template>
  <v-dialog width="400px" v-model="modal">
    <!-- что бы открыть при клике модальное окно параметр slot -->
     <v-btn color="primary" slot="activator" class="mr-2">Buy</v-btn>
     <v-card>
       <v-container>
         <v-layout row>
           <v-flex xs-12>
             <v-card-title>
               <h1 class="text-primary" flat>do you wan't to buy it</h1>
             </v-card-title>
           </v-flex>
         </v-layout>
         <!-- Отделить элемент -->
         <v-divider></v-divider>
          <v-layout row>
           <v-flex xs-12>
             <v-card-text>
              <v-textarea
                name="name"
                label="Your name"
                type="text"
                v-model="name"
              >
              </v-textarea>
              <v-textarea
                name="phone"
                label="Your phone"
                type="text"
                multi-line
                v-model="phone"
              >
              </v-textarea>
             </v-card-text>
           </v-flex>
         </v-layout>
         <v-divider></v-divider>
          <v-layout row>
           <v-flex xs-12>
             <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  flat
                  @click="onCancel"
                  :disabled = "localLoading"
                >
                  Close
                </v-btn>
                <v-btn
                  class="success"
                  flat
                  @click="onSave"
                  :disabled = "localLoading"
                  :loading = "localLoading"
                >
                 Buy it!
               </v-btn>
             </v-card-actions>
           </v-flex>
         </v-layout>
       </v-container>
     </v-card>
  </v-dialog>
</template>

<script>
export default {
  // для отображения данных объявления где был клик передаем объект ad в props
  props: ['ad'],
  data () {
    return {
      modal: false,
      name: '',
      phone: '',
      localLoading: false
    }
  },
  methods: {
    onCancel () {
      this.name = ''
      this.phone = ''
      this.modal = false
    },
    onSave () {
      if (this.name !== '' && this.phone !== '') {
        this.localLoading = true
        this.$store.dispatch('createOrder', {
          name: this.phone,
          phone: this.phone,
          // adId получаем с метода prop
          adId: this.ad.id,
          ownerId: this.ad.ownerId
        })
          .finally(() => {
            this.name = ''
            this.phone = ''
            this.localLoading = false
            this.modal = false
          })
      }
    }
  }
}
</script>
