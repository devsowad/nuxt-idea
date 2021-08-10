<template>
  <div id="comments">
    <v-dialog v-model="confirmDialog" max-width="500px">
      <confirm-dialog
        @cancel="confirmDialog = false"
        @confirm="confirmDelete"
      />
    </v-dialog>
    <v-timeline align-top dense>
      <v-timeline-item
        v-for="comment in comments"
        :key="comment.id"
        small
        :color="timelineColor()"
      >
        <!-- :color="message.color" -->
        <v-card class="d-flex align-center pa-5">
          <div class="w-100">
            <div class="d-flex ma-0">
              <v-avatar color="primary" tile class="rounded" size="40">
                <span class="white--text subtitle-1">{{
                  comment.user.name[0]
                }}</span>
              </v-avatar>
              <span>
                <v-card-subtitle class="pt-0">
                  {{ comment.body }}
                </v-card-subtitle>
              </span>
            </div>
            <v-card-text
              class="d-flex full-width align-center justify-space-between"
            >
              <div>
                {{ comment.user.name }}
                <v-icon x-small class="mx-2">mdi-circle</v-icon>
                {{ $moment(comment.created_at).fromNow() }}
                <span class="error--text">
                  <v-icon x-small class="mx-2" color="error">mdi-circle</v-icon>
                  {{ comment.spam_reports }} spam reports
                </span>
              </div>
              <div>
                <v-menu
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
                    <v-list-item @click="confirm(comment.id)">
                      <v-list-item-title>Delete Comment</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="markCommentAsSpam(comment.id)">
                      <v-list-item-title>Mark as Spam</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="commentNotSpam(comment.id)">
                      <v-list-item-title>Not Spam</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </v-card-text>
          </div>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: { comments: { type: Array, required: true } },

  data: () => ({
    colors: [
      'success',
      'error',
      'primary',
      'secondary',
      'pink',
      'info',
      'teal',
      'indigo',
    ],
    confirmDialog: false,
    selectCommentId: null,
  }),

  methods: {
    timelineColor() {
      return this.colors[Math.floor(Math.random(1, 2) * this.colors.length)]
    },

    confirm(id) {
      this.selectCommentId = id
      this.confirmDialog = true
    },

    async confirmDelete() {
      this.$nuxt.$loading.start()
      try {
        await this.deleteComment(this.selectCommentId)
        this.confirmDialog = false
      } catch (error) {}
    },

    ...mapActions('idea', [
      'markCommentAsSpam',
      'commentNotSpam',
      'deleteComment',
    ]),
  },
}
</script>

<style></style>
