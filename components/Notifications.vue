<template>
  <v-menu
    v-model="isOpen"
    bottom
    left
    :max-width="$vuetify.breakpoint.smAndDown ? '300px' : '400px'"
    :min-width="$vuetify.breakpoint.smAndDown ? '300px' : '400px'"
    rounded
    offset-y
    :close-on-content-click="false"
    max-height="calc(100vh - 100px)"
  >
    <template #activator="{ on }">
      <v-btn
        icon
        :x-large="!$vuetify.breakpoint.smAndDown"
        @click="toggle"
        v-on="on"
      >
        <v-icon>mdi-bell</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-actions>
        <v-card-title>Notifications</v-card-title>
        <v-spacer />
        <v-btn icon @click="markAllAsRead()">
          <v-icon>mdi-read</v-icon>
        </v-btn>
      </v-card-actions>
      <v-list v-if="hasNotifications" two-line>
        <v-list-item
          v-for="notification in notifications.data"
          :key="notification.id"
          :to="
            isCommentAdded(notification.type)
              ? `/idea/${notification.data.idea.slug}`
              : ''
          "
          active-class=""
          :class="
            !notification.read_at
              ? $vuetify.theme.dark
                ? 'grey darken-3'
                : 'grey lighten-2'
              : ''
          "
        >
          <v-list-item-avatar>
            <v-avatar color="brown" size="41">
              <v-img
                :src="notification.data.user.avatar_url"
                :alt="notification.data.user.name"
              />
            </v-avatar>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ notification.data.title }}</v-list-item-title>
            <v-list-item-subtitle>
              {{
                isCommentAdded(notification.type)
                  ? notification.data.comment.body
                  : notification.data.idea.title
              }}
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              {{ $moment(notification.created_at).fromNow() }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-card-text v-else class="text-center">
        <v-icon large>mdi-alert-circle</v-icon>
        <h4 class="heading mt-4">No notification</h4>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data: () => ({
    isOpen: false,
  }),

  computed: {
    hasNotifications() {
      return this.notifications.data?.length
    },
    ...mapState({ notifications: ({ user }) => user.notifications }),
  },

  methods: {
    isCommentAdded(type) {
      return type === 'CommentAddedNotification'
    },

    async toggle() {
      if (!this.isOpen) {
        await this.loadNotifications()
      }
    },

    ...mapActions('user', ['loadNotifications', 'markAllAsRead']),
  },
}
</script>

<style></style>
