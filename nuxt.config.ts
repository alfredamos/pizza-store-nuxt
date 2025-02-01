import { resolve } from "node:path"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
   "@sidebase/nuxt-auth"
  ],
  auth: {
    globalAppMiddleware: true,
    isEnabled: true,
    disableServerSideAuth: false,
    originEnvKey: 'AUTH_ORIGIN',
    baseURL: 'http://localhost:3000/api/auth',
    sessionRefresh: {
      enablePeriodically: true,
      enableOnWindowFocus: true,
    }
  }
 
  
});