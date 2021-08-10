<template>
  <v-row id="ideas">
    <v-col cols="12" md="3"> </v-col>
    <v-col cols="12" md="9">
      <span v-if="ideas.data && ideas.data.length > 0">
        <idea-card v-for="idea in ideas.data" :key="idea.title" :idea="idea" />

        <pagination
          scroll-to="#ideas"
          :action="loadIdeas"
          :length="ideas.links.length - 2"
          :from="ideas.from"
          :to="ideas.to"
          :total="ideas.total"
        />
      </span>
      <span v-else>
        <v-card
          max-width="500"
          class="pa-10 d-flex flex-column align-center mx-auto"
        >
          <BigAlert />
          <v-card-title> No Idea Available </v-card-title>
        </v-card>
      </span>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  async fetch() {
    await this.loadIdeas()
  },

  computed: {
    ...mapState({ ideas: ({ idea }) => idea.ideas }),
  },

  methods: {
    ...mapActions('idea', ['loadIdeas']),
  },
}
</script>
