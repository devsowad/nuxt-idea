export default {
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

  UPDATE_STATUS(state, status) {
    state.idea = { ...state.idea, status_id: status.id, status }
  },

  COMMENT_ADDED(state) {
    state.idea && state.idea.comments_count++
  },

  COMMENT_DELETED(state) {
    state.idea && state.idea.comments_count--
  },

  SET_CATEGORIES(state, categories) {
    state.categories = categories
  },

  ADD_IDEA(state, idea) {
    state.ideas.data.unshift(idea)
  },

  EDIT_IDEA(state, idea) {
    state.editIdea = {
      id: idea.id,
      title: idea.title,
      description: idea.description,
      category: idea.category_id,
    }
  },
}
