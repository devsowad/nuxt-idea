<template>
  <v-row justify="center">
    <v-col cols="6">
      <idea-form
        v-if="editIdea.title"
        update
        :edit-idea="editIdea"
        @submit="submit"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  middleware: 'auth',

  data() {
    return {
      idea: this.editIdea,
    }
  },

  async fetch() {
    await this.edit(this.$route.params.slug)
  },

  computed: {
    ...mapState({ editIdea: ({ idea }) => idea.editIdea }),
  },

  methods: {
    async submit(idea) {
      try {
        const slug = await this.update(idea)
        this.$router.push(`/idea/${slug}`)
      } catch (error) {}
    },

    ...mapActions('idea', ['update', 'edit']),
  },
}
</script>

<style></style>
