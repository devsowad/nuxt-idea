export default ({ store }, inject) => {
  const form = {
    setErrors(res) {
      store.dispatch('form/setErrors', res)
    },

    resetErrors() {
      store.commit('form/SET_ERRORS', null)
      this.stopLoading()
    },

    startLoading(nullErrors = true) {
      store.dispatch('form/setLoading', { loading: true, nullErrors })
    },

    stopLoading() {
      store.dispatch('form/setLoading', { loading: false })
    },
  }

  inject('form', form)
}
