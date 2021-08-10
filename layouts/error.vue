<template>
  <v-container>
    <v-card
      max-width="500"
      class="pa-10 d-flex flex-column align-center mx-auto"
    >
      <BigAlert />
      <v-card-title>
        {{ error.statusCode === 404 ? pageNotFound : otherError }}
      </v-card-title>
      <v-card-actions v-if="$route.path !== '/'">
        <v-btn to="/" color="primary">
          <v-icon left>mdi-home</v-icon>
          Go To Home page
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
