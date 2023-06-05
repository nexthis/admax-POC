/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import Notifications from '@kyvg/vue3-notification'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import '@/styles/styles.scss'
import '@core/scss/index.scss'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

loadFonts()

const app = createApp(App)

app.use(vuetify)
app.use(createPinia())
app.use(Notifications)

app.use(router)

app.mount('#app')
