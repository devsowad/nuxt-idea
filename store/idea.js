import Idea from '@/models/Idea'

export const state = () => ({
  ideas: {},
  idea: {},
})

const include = ['status', 'category', 'user']
const select = {
  ideas: [
    'id',
    'title',
    'description',
    'spam_reports',
    'created_at',
    'slug',
    'status_id',
    'category_id',
    'user_id',
  ],
  status: ['name', 'id'],
  category: ['name', 'id'],
  user: ['name', 'id'],
}

export const actions = {
  async loadIdeas({ commit }, page = false) {
    const ideas = await Idea.include(include)
      .select(select)
      .limit(10)
      .page(page || parseInt(this.$router.currentRoute.query.page) || 1)
      .get()

    commit('SET_IDEAS', ideas)
  },

  async loadIdea({ commit }, slug) {
    try {
      const idea = await Idea.custom(`/ideas/${slug}`)
        .with(['category', 'status', 'user', 'comments', 'comments.user'])
        .select({
          ideas: select.ideas,
          status: select.status,
          category: select.category,
          user: select.user,
          comments: [
            'body',
            'created_at',
            'id',
            'idea_id',
            'spam_reports',
            'user_id',
          ],
          'comments.user': ['name', 'id'],
        })
        .first()

      commit('SET_IDEA', idea)
    } catch (error) {
      console.log(error)
    }
  },

  async vote({ commit }, { id, single }) {
    try {
      const { data } = await this.$axios.post('/votes', { idea_id: id })

      commit('VOTED', { votes: data.votes, voteId: data.vote_id, id, single })
      commit('user/UPDATE_VOTES', { voteId: data.vote_id, id }, { root: true })
    } catch (error) {
      console.log(error)
    }
  },

  async markAsSpam({ commit }, id) {
    const { data } = await this.$axios.post('/ideas/mark-as-spam', { id })
    commit('UPDATE_SPAM_REPORTS', data.spam_reports)
  },

  async notSpam({ commit }, id) {
    const { data } = await this.$axios.post('/ideas/not-spam', { id })
    commit('UPDATE_SPAM_REPORTS', data.spam_reports)
  },

  async markCommentAsSpam(ctx, id) {
    const { data } = await this.$axios.post('/comments/mark-as-spam', { id })
    ctx.commit('UPDATE_COMMENT_SPAM_REPORTS', { spam: data.spam_reports, id })
  },

  async commentNotSpam({ commit }, id) {
    const { data } = await this.$axios.post('/comments/not-spam', { id })
    commit('UPDATE_COMMENT_SPAM_REPORTS', { spam: data.spam_reports, id })
  },

  async deleteComment({ commit }, id) {
    await this.$axios.delete(`/comments/${id}`, { id })
    commit('DELETE_COMMENT', id)
  },

  async deleteIdea(ctx, id) {
    await this.$axios.delete(`/ideas/${id}`, { id })
  },

  async updateStatus({ commit }, form) {
    try {
      const {
        data: { status },
      } = await this.$axios.post(`/ideas/update-status/${form.id}`, form)
      commit('UPDATE_STATUS', status)
    } catch ({ response }) {
      this.$form.setErrors(response)
      throw response
    }
  },

  async addComment({ commit }, form) {
    try {
      const { data } = await this.$axios.post('/comments', form)
      commit('COMMENT_ADDED', data)
    } catch ({ response }) {
      this.$form.setErrors(response)
      throw response
    }
  },
}

export const mutations = {
  SET_IDEAS(state, ideas) {
    state.ideas = ideas
  },

  SET_IDEA(state, idea) {
    state.idea = idea
  },

  VOTED(state, { votes, id, single }) {
    if (single) {
      state.idea.votes_count = votes
    } else {
      state.ideas.data.map((idea) =>
        idea.id === id ? (idea.votes_count = votes) : idea
      )
    }
  },

  UPDATE_SPAM_REPORTS(state, spamReports) {
    state.idea.spam_reports = spamReports
  },

  UPDATE_COMMENT_SPAM_REPORTS(state, { spam, id }) {
    state.idea.comments.map((comment) =>
      comment.id === id ? (comment.spam_reports = spam) : comment
    )
  },

  DELETE_COMMENT(state, id) {
    state.idea.comments = state.idea.comments.filter(
      (comment) => comment.id !== id
    )
    state.idea.comments_count--
  },

  UPDATE_STATUS(state, status) {
    state.idea = { ...state.idea, status_id: status.id, status }
  },

  COMMENT_ADDED(state, comment) {
    state.idea.comments.unshift(comment)
    state.idea.comments_count++
  },
}
