import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - nuxt-idea',
    title: 'nuxt-idea',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@plugins/vue-api-query.js',
    '@/plugins/form.js',
    '@/plugins/validation.js',
    '@/plugins/moment.js',
    '@/plugins/user.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_URL,
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    defaultAssets: {
      font: {
        family: 'DM Sans',
      },
    },
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.purple.lighten1,
        },
      },
    },
  },

  env: {
    API_URL: process.env.API_URL,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  auth: {
    strategies: {
      laravelJWT: {
        provider: 'laravel/jwt',
        url: process.env.LARAVEL_JWT_URL,
        endpoints: {
          login: { url: '/login' },
          logout: { url: '/logout' },
          user: { url: '/user' },
        },
        token: {
          property: 'access_token',
          maxAge: (process.env.JWT_TTL || 60) * 60,
        },
        refreshToken: {
          maxAge: (process.env.JWT_REFRESH_TTL || 2160) * 60,
        },
      },
    },
  },

  loading: {
    color: colors.purple.lighten1,
    height: '2px',
  },
}
