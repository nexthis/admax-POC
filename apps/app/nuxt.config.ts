// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

    modules: ['@nuxtjs/supabase', '@nuxt/image-edge'],

    build: {
        transpile: ['vuetify'],
    },
    // css: [
    //     '@/assets/scss/style.scss'
    // ]
    image: {
        provider: 'supabase',
        providers: {
          supabase: {
            name: 'supabase', // optional value to overrider provider name
            provider: '~/providers/supabase', // Path to custom provider
            options: {
                baseURL: process.env.SUPABASE_IMAGE || 'http://localhost:8080/storage/v1/object/public/public/'
            }
          }
        }
    },
    app: {
        pageTransition: { name: 'blur',  mode: 'out-in' }
    },
})
