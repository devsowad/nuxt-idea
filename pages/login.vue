<template>
  <auth-form :login="true" @submit="login"> </auth-form>
</template>

<script>
export default {
  middleware: 'auth',
  auth: 'guest',

  methods: {
    async login(data) {
      this.$form.startLoading()
      try {
        await this.$auth.loginWith('laravelJWT', { data })
        await this.$store.dispatch('idea/loadCategories')
      } catch ({ response }) {
        this.$form.setErrors(response)
      }
      this.$form.stopLoading()
    },
  },
}
</script>

<style></style>
