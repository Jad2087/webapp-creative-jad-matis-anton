import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import Pinia
import { createPinia } from 'pinia'

const app = createApp(App)

const pinia = createPinia()

// Ajoute Pinia et Router à l'app
app.use(pinia)
app.use(router)

app.mount('#app')
