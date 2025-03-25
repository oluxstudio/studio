// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  modules: ['@nuxtjs/tailwindcss', 'nuxt-graphql-client'],
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  }
})