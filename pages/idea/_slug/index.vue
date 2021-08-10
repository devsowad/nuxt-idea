<template>
  <v-row>
    <v-col cols="12" md="3"> </v-col>
    <v-col cols="12" md="9">
      <idea-card v-if="idea" :idea="idea" single />

      <v-card-actions v-if="idea.id" class="mt-5">
        <idea-reply :id="idea.id" />
        <idea-status :id="idea.id" :status="idea.status.name" />
        <v-spacer />
        <vote-button
          :user-id="idea.user_id"
          :votes="idea.votes_count"
          :idea-id="idea.id"
        />
      </v-card-actions>

      <idea-comments
        v-if="idea.comments && idea.comments.length"
        :comments="idea.comments"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import IdeaReply from '~/components/IdeaReply.vue'

export default {
  components: { IdeaReply },
  async fetch() {
    await this.loadIdea(this.$route.params.slug)
  },

  computed: {
    ...mapState({ idea: ({ idea }) => idea.idea }),
  },

  methods: {
    ...mapActions('idea', ['loadIdea']),
  },
}
</script>
