import Comment from '@/models/Comment'

export const state = () => ({
  ideaComment: {},
})

export const actions = {
  async loadIdeaComments({ commit }, { page, ideaId }) {
    const comments = await Comment.where('idea_id', ideaId)
      .include('user')
      .select({
        comments: ['id', 'body', 'spam_reports', 'created_at', 'user_id'],
        user: ['id', 'name', 'email'],
      })
      .page(page || 1)
      .limit(5)
      .get()

    commit('SET_IDEA_COMMENTS', comments)
  },

  async add({ commit }, form) {
    try {
      const { data } = await this.$axios.post('/comments', form)
      commit('idea/COMMENT_ADDED', null, { root: true })
      commit('COMMENT_ADDED', data)
    } catch ({ response }) {
      this.$form.setErrors(response)
      throw response
    }
  },

  async markCommentAsSpam({ commit }, id) {
    const { data } = await this.$axios.post(`/comments/mark-as-spam/${id}`)
    commit('UPDATE_COMMENT_SPAM_REPORTS', { spam: data.spam_reports, id })
  },

  async commentNotSpam({ commit }, id) {
    const { data } = await this.$axios.post(`/comments/not-spam/${id}`)
    commit('UPDATE_COMMENT_SPAM_REPORTS', { spam: data.spam_reports, id })
  },

  async deleteComment({ commit }, id) {
    await this.$axios.delete(`/comments/${id}`)
    commit('DELETE_COMMENT', id)
    commit('idea/COMMENT_DELETED', null, { root: true })
  },
}

export const mutations = {
  SET_IDEA_COMMENTS(state, comments) {
    if (state.ideaComment.data) {
      state.ideaComment = {
        ...state.ideaComment,
        next_page_url: comments.next_page_url,
      }
      state.ideaComment.data = state.ideaComment.data.concat(comments.data)
    } else {
      state.ideaComment = comments
    }
  },

  COMMENT_ADDED(state, comment) {
    state.ideaComment.data.unshift(comment)
  },

  NULL_COMMENTS(state) {
    state.ideaComment = {}
  },

  UPDATE_COMMENT_SPAM_REPORTS(state, { spam, id }) {
    state.ideaComment.data.map((comment) =>
      comment.id === id ? (comment.spam_reports = spam) : comment
    )
  },

  DELETE_COMMENT(state, id) {
    state.ideaComment.data = state.ideaComment.data.filter(
      (comment) => comment.id !== id
    )
  },
}
