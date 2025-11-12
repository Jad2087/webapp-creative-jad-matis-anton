<template>
  <div class="container">
    <div class="screen">
      <h1 class="title">Codex</h1>
      <button class="start-btn" @click="startStory">Commencer</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function startStory() {
  router.push({ name: 'story' })
}
</script>

<style scoped>
/* Fond de la page */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #000; /* fond noir */
}

/* Cadre central type "ordinateur" */
.screen {
  background-color: #111;
  padding: 3rem 5rem;
  border: 2px solid #0f0; /* contour vert */
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 0 20px #0f0;
}

/* Titre */
.title {
  color: #0f0; /* vert "terminal" */
  font-family: 'Courier New', Courier, monospace;
  font-size: 3rem;
  margin-bottom: 2rem;
}

/* Bouton Commencer */
.start-btn {
  background-color: #0f0; /* vert */
  color: #000; /* texte noir */
  font-weight: bold;
  font-size: 1.2rem;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.start-btn:hover {
  background-color: #0c0;
  transform: scale(1.05);
}
</style>
