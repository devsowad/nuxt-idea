<template>
  <v-btn
    type="submit"
    :text="text"
    :color="color"
    :loading="loading"
    :disabled="disabled"
  >
    {{ content }}
  </v-btn>
</template>

<script>
export default {
  props: {
    color: { type: String, default: 'primary' },
    text: Boolean,
    disabled: Boolean,
    content: { type: String, default: 'submit' },
  },

  computed: {
    loading() {
      return this.$store.state.form.loading
    },
  },
}
</script>

<style></style>
