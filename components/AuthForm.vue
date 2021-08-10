<template>
  <v-row justify="center" align="center" class="py-10">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-form
          ref="form"
          v-model="form"
          class="pa-4 pt-6"
          @submit.prevent="submit"
        >
          <v-card-title class="text-uppercase justify-center flex-column">
            <v-img
              alt="Vuetify Logo"
              class="shrink"
              contain
              src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
              transition="scale-transition"
              width="40"
            />
            <p class="mt-2">
              {{ login ? 'login' : 'register' }}
            </p>
          </v-card-title>

          <v-text-field
            v-if="!login"
            v-model="user.name"
            :autofocus="!login"
            :rules="[$validation.required()]"
            filled
            label="Name"
          ></v-text-field>

          <v-text-field
            v-model="user.email"
            :autofocus="login"
            :rules="[$validation.email()]"
            filled
            label="Email address"
            type="email"
          ></v-text-field>

          <v-text-field
            v-model="user.password"
            :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            :rules="[$validation.required()]"
            filled
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <v-text-field
            v-if="!login"
            v-model="user.password_confirmation"
            :append-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
            :rules="[$validation.required()]"
            filled
            label="Confirm Password"
            :type="showConfirmPassword ? 'text' : 'password'"
            @click:append="showConfirmPassword = !showConfirmPassword"
          ></v-text-field>

          <v-checkbox
            v-if="login"
            v-model="user.remember"
            label="Remember me"
          ></v-checkbox>

          <form-errors />

          <v-card-actions>
            <nuxt-link
              v-if="login"
              to="/register"
              class="text-decoration-underline"
            >
              New here? Signup
            </nuxt-link>
            <nuxt-link v-else to="/login" class="text-decoration-underline">
              Already registered? Login
            </nuxt-link>
            <v-spacer></v-spacer>

            <submit-button
              :disabled="!form"
              :content="login ? 'Login' : 'register'"
            />
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    login: Boolean,
  },
  data: () => ({
    showPassword: false,
    showConfirmPassword: false,
    user: {
      email: 'idea@mail.com',
      password: 'secret',
    },
    form: false,
  }),

  computed: {
    loading() {
      return this.$store.state.form.loading
    },
  },

  methods: {
    submit() {
      this.$emit('submit', this.user)
    },
  },
}
</script>

<style></style>
