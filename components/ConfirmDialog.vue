<template>
  <v-card max-width="500" class="pa-10 d-flex flex-column align-center mx-auto">
    <BigAlert />
    <v-card-title> Are you sure? </v-card-title>
    <v-card-actions>
      <v-btn color="error" text @click="$emit('cancel')">cancel</v-btn>
      <v-btn color="success" text @click="$emit('confirm')">confirm</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {}
</script>

<style></style>
