<template>
  <v-card>
    <v-form ref="form" v-model="form" @submit.prevent="submit">
      <v-card-title class="justify-center">Add Your Idea </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="idea.title"
          :rules="[$validation.required()]"
          autofocus
          filled
          label="Title*"
        />
        <v-textarea
          v-model="idea.description"
          :rules="[$validation.required(), $validation.minLength(50)]"
          filled
          label="Description*"
        />
        <v-autocomplete
          v-model="idea.category"
          :rules="[$validation.required()]"
          filled
          label="Category*"
          :items="categories"
          item-text="name"
          item-value="id"
        />

        <form-errors />
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="$refs.form.reset()">reset</v-btn>
          <submit-button
            text
            :content="update ? 'update' : 'add'"
            :disabled="!form"
          />
        </v-card-actions>
      </v-card-text>
    </v-form>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: { editIdea: { type: Object, default: Object }, update: Boolean },

  data() {
    return {
      form: false,
    }
  },

  computed: {
    idea() {
      return this.editIdea
    },
    ...mapState({
      categories: ({ idea }) => idea.categories,
    }),
  },

  methods: {
    submit() {
      this.$emit('submit', this.idea)
    },
  },
}
</script>

<style></style>
