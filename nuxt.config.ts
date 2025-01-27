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
   // "@sidebase/nuxt-auth"
  ],
 /*  authJs:{

  } */
  /* supabase: {
    url: process.env.DATABASE_URL,
    //serviceKey: process.env.SUPABASE_SERVICE_KEY,
    key: process.env.SUPABASE_ANON_KEY
  }, */
  
});