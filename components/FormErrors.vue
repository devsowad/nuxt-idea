<template>
  <v-slide-y-transition>
    <v-alert v-if="errors" type="error" text>
      <span v-if="isString">
        {{ errors }}
      </span>
      <ul v-else class="list-unstyled">
        <li v-for="(error, i) in errors" :key="`validation-errors${i}`" dense>
          {{ error[0] }}
        </li>
      </ul>
    </v-alert>
  </v-slide-y-transition>
</template>

<script>
export default {
  computed: {
    isString() {
      return typeof this.errors === 'string'
    },
    errors() {
      return this.$store.state.form.errors
    },
  },
}
</script>
