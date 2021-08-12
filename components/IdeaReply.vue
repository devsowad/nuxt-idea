<template>
  <span>
    <v-btn large class="mr-2" @click="openModal">reply</v-btn>

    <v-dialog v-model="menu" max-width="600px">
      <v-card>
        <v-form ref="form" v-model="form" @submit.prevent="submit">
          <v-card-text>
            <v-textarea
              v-model="data.body"
              :rules="[$validation.required(), $validation.minLength(50)]"
              autofocus
              filled
              label="Comment"
              auto-grow
              rows="3"
            ></v-textarea>

            <form-errors class="mt-4" />
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="error" text @click="cancel"> Cancel </v-btn>
            <submit-button :disabled="!form" text content="comment" />
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    id: { type: Number, required: true },
  },

  data() {
    return {
      menu: false,
      data: {
        idea_id: this.id,
      },
      form: false,
    }
  },

  methods: {
    async openModal() {
      await this.$user.authenticate()
      this.menu = true
    },
    async submit() {
      try {
        await this.addComment(this.data)
        this.cancel()
      } catch (error) {}
    },
    cancel() {
      this.$refs.form.reset()
      this.menu = false
      this.$store.commit('form/SET_ERRORS', null)
    },
    ...mapActions('idea', ['addComment']),
  },
}
</script>

<style></style>
