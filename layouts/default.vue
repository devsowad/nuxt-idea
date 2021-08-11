<template>
  <v-app>
    <v-app-bar fixed app>
      <v-container class="py-0 fill-height">
        <v-toolbar-title>
          <nuxt-link to="/">{{ title }}</nuxt-link>
        </v-toolbar-title>
        <v-spacer />

        <v-btn text to="/idea/add"> add idea </v-btn>
        <v-btn v-if="!$auth.loggedIn" text to="/login"> login </v-btn>
        <profile-menu v-else />
      </v-container>
    </v-app-bar>
    <v-main>
      <v-container class="py-15">
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      title: 'Vuetify.js',
    }
  },

  async fetch() {
    if (this.$auth.$state.loggedIn) {
      await this.$store.dispatch('user/loadVotes')
      await this.$store.dispatch('idea/loadCategories')
    }
  },

  watch: {
    $route(to, from) {
      this.$store.commit('form/SET_ERRORS', null)
    },
  },
}
</script>

<style lang="scss"></style>
