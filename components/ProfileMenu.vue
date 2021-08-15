<template>
  <v-menu
    bottom
    min-width="200px"
    rounded
    offset-y
    :close-on-content-click="false"
  >
    <template #activator="{ on }">
      <v-btn
        :loading="loading"
        icon
        :x-large="!$vuetify.breakpoint.smAndDown"
        v-on="on"
      >
        <v-avatar color="brown" :size="$vuetify.breakpoint.smAndDown ? 40 : 48">
          <v-img :src="$auth.user.avatar_url" :alt="$auth.user.name" />
        </v-avatar>
      </v-btn>
    </template>
    <v-card>
      <v-list-item-content class="justify-center">
        <div class="mx-auto text-center">
          <v-avatar color="brown">
            <v-img :src="$auth.user.avatar_url" :alt="$auth.user.name" />
          </v-avatar>
          <h3 class="mt-3">{{ $auth.user.name }}</h3>
          <p class="text-caption mt-1">
            {{ $auth.user.email }}
          </p>
          <v-divider class="my-3"></v-divider>
          <v-btn depressed rounded text @click="logout"> logout </v-btn>
          <v-divider class="my-3"></v-divider>
          <v-item-group
            v-model="$colorMode.preference"
            mandatory
            class="d-flex justify-space-around"
          >
            <v-item
              v-for="theme in themes"
              :key="theme.icon"
              v-slot="{ active, toggle }"
              :value="theme.value"
            >
              <v-btn text icon :color="active ? 'primary' : ''" @click="toggle">
                <v-icon>{{ theme.icon }}</v-icon>
              </v-btn>
            </v-item>
          </v-item-group>
        </div>
      </v-list-item-content>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    themes: [
      { value: 'system', icon: 'mdi-laptop' },
      { value: 'dark', icon: 'mdi-brightness-4' },
      { value: 'light', icon: 'mdi-brightness-2' },
    ],
  }),

  methods: {
    async logout() {
      this.loading = true
      await this.$auth.logout()
      this.loading = false
    },
  },
}
</script>
