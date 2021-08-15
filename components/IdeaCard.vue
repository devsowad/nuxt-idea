<template>
  <v-row>
    <v-col>
      <v-dialog v-model="confirmDialog" max-width="500px">
        <confirm-dialog @cancel="confirmDialog = false" @confirm="remove" />
      </v-dialog>
      <v-card
        class="d-flex align-center pa-5"
        :to="single ? '' : `/idea/${idea.slug}`"
      >
        <div
          v-if="!single && !$vuetify.breakpoint.smAndDown"
          class="text-center mr-5"
        >
          <h2 class="headline mb-3">{{ idea.votes_count }}</h2>
          <vote-button simple :user-id="idea.user_id" :idea-id="idea.id" />
        </div>
        <div class="w-100">
          <div class="d-flex ma-0">
            <v-avatar
              v-if="idea.user"
              color="primary"
              tile
              class="rounded mt-2"
              :size="single ? 80 : 60"
            >
              <v-img :src="idea.user.avatar_url" :alt="idea.user.name" />
            </v-avatar>
            <span>
              <v-card-title class="pt-0">
                {{ idea.title }}
              </v-card-title>
              <v-card-subtitle v-if="single">
                {{ idea.description }}
              </v-card-subtitle>
              <v-card-subtitle v-else>
                {{ idea.description.substring(0, 200) }}
                <span
                  v-if="idea.description.length > 200"
                  class="text-truncate-dots"
                >
                  ...
                </span>
              </v-card-subtitle>
            </span>
          </div>
          <v-card-text
            v-if="idea.user"
            class="d-flex full-width align-center justify-space-between"
          >
            <div class="d-flex flex-wrap">
              <span v-if="single" class="mr-2">
                {{ idea.user.name }}
                <v-icon x-small>mdi-circle</v-icon>
              </span>
              {{ $moment(idea.created_at).fromNow() }}
              <v-icon x-small class="mx-2">mdi-circle</v-icon>
              {{ idea.category.name }}
              <v-icon x-small class="mx-2">mdi-circle</v-icon>
              {{ idea.comments_count }} comments
              <span v-if="$vuetify.breakpoint.smAndDown" class="success--text">
                <v-icon x-small class="mx-2" color="success">mdi-circle</v-icon>
                {{ idea.votes_count }} vote{{ idea.votes_count > 1 ? 's' : '' }}
              </span>
              <span v-if="$user.isAdmin()" class="error--text">
                <v-icon x-small class="mx-2" color="error">mdi-circle</v-icon>
                {{ idea.spam_reports }} spam reports
              </span>
            </div>
            <div>
              <v-chip :color="getChipColor(idea.status.name)">
                {{ idea.status.name }}
              </v-chip>
              <v-menu
                v-if="single && $auth.loggedIn"
                offset-x
                bottom
                left
                transition="slide-y-reverse-transition"
              >
                <template #activator="{ on, attrs }">
                  <v-btn rounded icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-if="$user.isOwnOrAdmin(idea.user_id)"
                    @click="confirmDialog = true"
                  >
                    <v-list-item-title> Delete Idea </v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    v-if="$user.isOwn(idea.user_id)"
                    :to="`/idea/${idea.slug}/edit`"
                  >
                    <v-list-item-title> Edit Idea </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="markAsSpam(idea.id)">
                    <v-list-item-title>Mark as Spam</v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    v-if="$user.isAdmin(idea.user_id)"
                    @click="notSpam(idea.id)"
                  >
                    <v-list-item-title>Not Spam</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-card-text>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: { idea: { type: Object, required: true }, single: Boolean },

  data: () => ({
    confirmDialog: false,
  }),

  methods: {
    async remove() {
      this.$nuxt.$loading.start()
      await this.deleteIdea(this.idea.id)
      this.$router.push('/')
    },

    getChipColor(status) {
      switch (status.toLowerCase()) {
        case 'considering':
          return 'indigo'
        case 'in progress':
          return 'primary'
        case 'implemented':
          return 'success'
        case 'closed':
          return 'error'
        default:
          return 'teal'
      }
    },

    ...mapActions('idea', ['markAsSpam', 'notSpam', 'deleteIdea']),
  },
}
</script>

<style></style>
