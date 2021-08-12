<template>
  <v-row justify="center">
    <v-col cols="6">
      <idea-form @submit="submit" />
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  middleware: 'auth',

  methods: {
    async submit(idea) {
      try {
        const slug = await this.add(idea)
        this.$router.push(`/idea/${slug}`)
      } catch (error) {}
    },

    ...mapActions('idea', ['add']),
  },
}
</script>

<style></style>
