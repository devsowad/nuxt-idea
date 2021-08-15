<template>
  <v-app>
    <v-app-bar hide-on-scroll elevate-on-scroll app>
      <v-container class="py-0 fill-height">
        <v-toolbar-title class="text-bold">
          <nuxt-link to="/">{{ title }}</nuxt-link>
        </v-toolbar-title>
        <v-spacer />

        <v-btn v-if="!$auth.loggedIn" text to="/login"> login </v-btn>
        <span v-else>
          <v-btn text to="/idea/add"> add idea </v-btn>
          <notifications />
          <profile-menu />
        </span>
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
      title: 'IDEA',
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
    '$colorMode.value'() {
      this.$vuetify.theme.dark = this.$colorMode.value === 'dark'
    },
  },
}
</script>

<style lang="scss"></style>
