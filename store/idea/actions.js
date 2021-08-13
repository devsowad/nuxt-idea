import Idea from '@/models/Idea'
import Vote from '@/models/Vote'
import Category from '@/models/Category'

const include = ['status', 'category', 'user', 'votesCount', 'commentsCount']
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

export default {
  async loadIdeas({ commit }, page = false) {
    const ideas = await Idea.include(include)
      .select(select)
      .limit(10)
      .page(page || parseInt(this.$router.currentRoute.query.page) || 1)
      .get()

    commit('SET_IDEAS', ideas)
  },

  async loadIdea({ commit }, slug) {
    const idea = await Idea.include(include).select(select).find(slug)
    commit('SET_IDEA', idea)
  },

  async vote({ commit }, { id, single }) {
    const data = await new Vote({ idea_id: id }).save()

    commit('VOTED', { votes: data.votes, voteId: data.vote_id, id, single })
    commit('user/UPDATE_VOTES', { voteId: data.vote_id, id }, { root: true })
  },

  async markAsSpam({ commit }, id) {
    const { data } = await this.$axios.post(`/ideas/mark-as-spam/${id}`)

    commit('UPDATE_SPAM_REPORTS', data.spam_reports)
  },

  async notSpam({ commit }, id) {
    const { data } = await this.$axios.post(`/ideas/not-spam/${id}`)

    commit('UPDATE_SPAM_REPORTS', data.spam_reports)
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

  async loadCategories({ commit }) {
    const categories = await Category.select('id', 'name').get()
    commit('SET_CATEGORIES', categories)
  },

  async add(ctx, form) {
    this.$form.startLoading()
    try {
      const idea = new Idea(form)
      const data = await idea.save()
      this.$form.resetErrors()
      return data.slug
    } catch ({ response }) {
      this.$form.setErrors(response)
      throw response
    }
  },

  async edit({ commit }, slug) {
    const idea = await Idea.select({
      ideas: ['id', 'category_id', 'title', 'description'],
    }).find(slug)

    commit('EDIT_IDEA', idea)
  },

  async update(ctx, form) {
    this.$form.startLoading()
    try {
      const { data } = await this.$axios.put(`ideas/${form.id}`, form)
      this.$form.resetErrors()
      return data.slug
    } catch ({ response }) {
      this.$form.setErrors(response)
      throw response
    }
  },
}
