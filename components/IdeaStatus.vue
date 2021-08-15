<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-x
  >
    <template #activator="{ on, attrs }">
      <v-btn large v-bind="attrs" v-on="on">
        Set status
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-form ref="form" @submit.prevent="submit">
        <v-card-text>
          <v-radio-group
            v-model="form.status"
            :rules="[$validation.required()]"
          >
            <v-radio
              label="Open"
              color="orange darken-3"
              value="Open"
            ></v-radio>
            <v-radio
              label="Considering"
              color="orange darken-3"
              value="Considering"
            ></v-radio>
            <v-radio
              label="In Progress"
              color="orange darken-3"
              value="In Progress"
            ></v-radio>
            <v-radio
              label="Implemented"
              color="orange darken-3"
              value="Implemented"
            ></v-radio>
            <v-radio
              label="Closed"
              color="orange darken-3"
              value="Closed"
            ></v-radio>
          </v-radio-group>

          <form-errors class="mt-4" />
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="error" text @click="cancel"> Cancel </v-btn>
          <submit-button text content="update" />
        </v-card-actions>
      </v-form>
    </v-card>
  </v-menu>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    id: { type: Number, required: true },
    status: { type: String, required: true },
  },

  data() {
    return {
      menu: false,
      form: {
        id: this.id,
        status: this.status,
      },
    }
  },

  methods: {
    async submit() {
      try {
        await this.updateStatus(this.form)
        this.cancel()
      } catch (error) {}
    },
    cancel() {
      this.menu = false
      this.$store.commit('form/SET_ERRORS', null)
    },
    ...mapActions('idea', ['updateStatus']),
  },
}
</script>

<style></style>
