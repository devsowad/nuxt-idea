export const state = () => ({
  errors: null,
  loading: false,
})

export const actions = {
  setErrors({ commit }, res) {
    const err = res.data.error || res.data.errors || res.statusText
    commit('SET_ERRORS', err)
  },

  setLoading({ commit }, { loading, nullErrors }) {
    nullErrors && commit('SET_ERRORS', null)
    commit('SET_LOADING', loading)
  },
}

export const mutations = {
  SET_ERRORS(state, err) {
    state.errors = err
  },

  SET_LOADING(state, loading) {
    state.loading = loading
  },
}
