<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">HOME</v-card-title>
        <v-card-actions>
          <v-btn @click="load">load</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    async load() {
      await this.load()
    },
    ...mapActions('idea', ['load']),
  },
}
</script>
