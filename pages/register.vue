<template>
  <auth-form @submit="register"> </auth-form>
</template>

<script>
export default {
  middleware: 'auth',
  auth: 'guest',

  methods: {
    async register(data) {
      this.$form.startLoading()
      try {
        await this.$axios.post('/auth/register', data)
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
