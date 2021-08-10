import Vote from '~/models/Vote'

export const state = () => ({
  votes: [],
})

export const actions = {
  async loadVotes({ commit }) {
    const votes = await Vote.select('id', 'idea_id', 'user_id')
      .where('user_id', this.$auth.$state.user.id)
      .get()
    commit('SET_VOTES', votes)
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
}
