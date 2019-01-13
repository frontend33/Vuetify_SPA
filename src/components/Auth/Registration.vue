<template>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Registration form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form  ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    prepend-icon="person"
                    name="email"
                    label="Email"
                    type="email"
                    v-model="email"
                    :rules="emailRules"
                  >
                  </v-text-field>
                  <v-text-field
                    prepend-icon="lock"
                    name="password"
                    label="Password"
                    type="password"
                    :counter="6"
                    v-model="password"
                    :rules="passwordRules"
                  >
                  </v-text-field>
                  <v-text-field
                    prepend-icon="lock"
                    name="confirm-password"
                    label="Confirm password"
                    type="password"
                    :counter="6"
                    v-model="confirmPassword"
                    :rules="confirmPasswordRules"
                  >
                  </v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  @click="onSubmit"
                  :loading="loading"
                  :disabled="!valid || loading"
                >
                Create account
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      valid: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be equal or more 6 characters'
      ],
      confirmPasswordRules: [
        v => !!v || 'Password is required',
        v => v === this.password || 'Passwords should macth'
      ]
    }
  },
  computed: {
    loading () {
      // Берем loading из shared.js и можем манипулировать состоянием true false
      return this.$store.getters.loading
    }
  },
  methods: {
    // При клике на кнопку если форма валидна создаем объет юсер с его полями
    onSubmit () {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password
        }
        // Далее диспатчим в шину событий нового юзера
        this.$store.dispatch('registerUser', user)
          .then(() => {
            // Когда асинхронный вызов выполнен вызываем редирект (переход на главную страницу)
            this.$router.push('/')
          })
          .catch(() => {})
      }
    }
  }
}
</script>
