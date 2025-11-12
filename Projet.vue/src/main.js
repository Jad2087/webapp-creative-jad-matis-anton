import { createApp } from 'vue'
import App from './App.vue'
import router from './router'   // ← c'est ton fichier index.js

const app = createApp(App)
app.use(router)                 // ← très important pour activer le router
app.mount('#app')
