<template>
  <span class="d-flex align-center">
    <v-sheet v-if="!simple" rounded class="px-4 py-2 mr-3 text-center">
      <h3 class="heading">{{ votes }}</h3>
      <p class="subtitle-2 mb-0">votes</p>
    </v-sheet>
    <v-btn
      large
      :color="isVotedByUser ? 'success' : undefined"
      @click.prevent="vote()"
    >
      {{ isVotedByUser ? 'voted' : 'vote' }}
    </v-btn>
  </span>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    simple: Boolean,
    votes: { type: Number, default: 0 },
    ideaId: { type: Number, required: true },
    userId: { type: Number, required: true },
  },

  computed: {
    isVotedByUser() {
      return this.$auth.loggedIn
        ? this.userVotes.filter((vote) => vote.idea_id === this.ideaId).length
        : false
    },
    ...mapState({ userVotes: ({ user }) => user.votes }),
  },

  methods: {
    async vote() {
      if (!this.$auth.loggedIn) {
        return this.$router.push('/login')
      }
      this.$nuxt.$loading.start()
      await this.$store.dispatch('idea/vote', {
        id: this.ideaId,
        single: !this.simple,
      })
    },
  },
}
</script>

<style></style>
