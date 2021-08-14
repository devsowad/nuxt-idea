import Vote from '~/models/Vote'

export const state = () => ({
  votes: [],
  notifications: [],
})

export const actions = {
  async loadVotes({ commit }) {
    const votes = await Vote.select('id', 'idea_id', 'user_id')
      .where('user_id', this.$auth.$state.user.id)
      .get()
    commit('SET_VOTES', votes)
  },

  async loadNotifications({ commit }, page = 1) {
    try {
      const { data } = await this.$axios.get(
        'auth/user/notifications?page=' + page
      )
      commit('SET_NOTIFICATIONS', data)
    } catch (error) {}
  },

  async markAllAsRead({ commit }) {
    const { data } = await this.$axios.post(
      '/auth/user/notifications/mark-all-as-read'
    )
    commit('MARK_ALL_AS_READ', data)
  },
}

export const mutations = {
  SET_VOTES(state, votes) {
    state.votes = votes
  },

  UPDATE_VOTES(state, { voteId, id }) {
    if (voteId) {
      state.votes = state.votes.concat({
        id: voteId,
        idea_id: id,
        user_id: this.$auth.user.id,
      })
    } else {
      state.votes = state.votes.filter((vote) => vote.idea_id !== id)
    }
  },

  SET_NOTIFICATIONS(state, notifications) {
    state.notifications = notifications
  },

  MARK_ALL_AS_READ(state, readAt) {
    state.notifications.data.map((comment) =>
      comment.read_at ? comment : (comment.read_at = readAt)
    )
  },
}
