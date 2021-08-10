<template>
  <div class="mt-5">
    <p v-if="!hideDetails" class="body text-center">
      Showing {{ from }} to {{ to }} of {{ total }}
    </p>

    <v-pagination v-model="page" :length="length" />
  </div>
</template>

<script>
export default {
  props: {
    currentPage: { type: Number, default: 1 },
    length: { type: Number, default: 1 },
    action: { type: Function, required: true },
    scrollTo: { type: String, default: '.v-application' },
    hideDetails: { type: Boolean },
    from: { type: Number, default: 1 },
    to: { type: Number, default: 1 },
    total: { type: Number, default: 1 },
  },

  data() {
    return {
      page: parseInt(this.$route.query.page) || this.currentPage,
    }
  },

  watch: {
    async page() {
      this.$nuxt.$loading.start()
      await this.action(this.page)
      this.$vuetify.goTo(this.scrollTo)
      this.$router.push({
        path: this.$route.fullPath,
        query: { ...this.$route.query, page: this.page },
      })
    },
  },
}
</script>

<style></style>
