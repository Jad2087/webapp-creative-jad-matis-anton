import {
  createApp
} from 'vue'
import App from './App.vue'
import router from './router'

// Import Pinia
import {
  createPinia
} from 'pinia'


// 🔊 Import du son (depuis le dossier Sounds à la racine)
import clickSound from './Sounds/click.mp3'

const app = createApp(App)

const pinia = createPinia()

// 🔊 Fonction pour jouer le son
function playClickSound() {
  const audio = new Audio(clickSound)
  audio.volume = 0.4 // tu peux ajuster le volume
  audio.play().catch(() => {
    // on ignore les petites erreurs éventuelles
  })
}

// 🔊 Écouter tous les clics de souris (bouton gauche)
window.addEventListener('mousedown', (event) => {
  if (event.button === 0) { // 0 = clic gauche
    playClickSound()
  }
})

// Ajoute Pinia et Router à l'app
app.use(pinia)
app.use(router)

app.mount('#app')