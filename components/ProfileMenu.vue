<template>
  <v-menu bottom min-width="200px" rounded offset-y>
    <template #activator="{ on }">
      <v-btn :loading="loading" icon x-large v-on="on">
        <v-avatar color="brown" size="48">
          <span class="white--text text-h5">{{ $auth.user.name[0] }}</span>
        </v-avatar>
      </v-btn>
    </template>
    <v-card>
      <v-list-item-content class="justify-center">
        <div class="mx-auto text-center">
          <v-avatar color="brown">
            <span class="white--text text-h5">{{ $auth.user.name[0] }}</span>
          </v-avatar>
          <h3>{{ $auth.user.name }}</h3>
          <p class="text-caption mt-1">
            {{ $auth.user.email }}
          </p>
          <v-divider class="my-3"></v-divider>
          <v-btn depressed rounded text> Edit Account </v-btn>
          <v-divider class="my-3"></v-divider>
          <v-btn depressed rounded text @click="logout"> logout </v-btn>
        </div>
      </v-list-item-content>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  computed: {
    loading() {
      return this.$store.state.form.loading
    },
  },

  methods: {
    async logout() {
      this.$form.startLoading()
      await this.$auth.logout()
      this.$form.stopLoading()
    },
  },
}
</script>
