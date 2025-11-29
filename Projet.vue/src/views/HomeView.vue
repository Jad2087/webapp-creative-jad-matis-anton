<template>
  <div class="container">
    <div class="screen">
      <h1 class="title">Codex</h1>
      <button class="start-btn" @click="startStory">Commencer</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",

  data() {
    return {};
  },

  methods: {
     // dirige l'utilisateur vers la route nommée "intro".
    // startStory() {this.$router.push({ name: "intro" });},
     startStory() {
      this.$router.push({ name: "game", params: { id: "intro" } });
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Courier New", monospace;
}

/* Fond de la page */
.container {
  display: flex;
  justify-content: center; /* centers horizontally */
  align-items: center; /* centers vertically */
  height: 100vh; /* full viewport height */
  background-color: #111;
}

.screen {
  width: 900px;
  height: 600px;
  padding: 2rem 2rem;
  background-color: #111;
  border: 2px solid #03ab5e;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* EFFET RETRO */
@keyframes crtFlicker {
  0% {
    opacity: 0.98;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.97;
  }
}

.screen {
  position: relative;
  overflow: hidden;
  animation: crtFlicker 0.15s infinite alternate;
}

/* SCREEN: EFFET RETRO + COUBRE */
@keyframes crtFlicker {
  0% {
    opacity: 0.98;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.97;
  }
}

.screen {
  position: relative;
  overflow: hidden;
  animation: crtFlicker 0.15s infinite alternate;
  transform: perspective(800px) rotateX(2deg) scale(1.02); /* Effet de courbure CRT */
  transform-origin: center top;
  border-radius: 6px; 
}

.screen::after {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.03) 0,
    rgba(255, 255, 255, 0.03) 2px,
    rgba(0, 0, 0, 0.06) 4px
  );
  pointer-events: none;
}

/* Titre */
.title {
  color: #03ab5e;
  font-size: 3rem;
  margin-bottom: 3rem;
  letter-spacing: 2px;
}

/* Bouton Commencer */
.start-btn {
  background-color: #111;
  color: #03ab5e;
  font-weight: bold;
  font-size: 1.2rem;
  padding: 0.75rem 2.5rem;
  border: 2px solid #03ab5e;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.start-btn:hover {
  background-color: #03ab5e;
  color: #000;
  transform: scale(1.1);
}

/* ==== MOBILE ==== */
@media (max-width: 768px) {

/* IMPORTANT : forces le viewport mobile correct */
html, body {
  padding: 0;
  margin: 0;
  height: 100dvh;
  overflow: hidden; /* évite que 100% casse */
}

.container {
  width: 100%;
  height: 100dvh;  /* plein écran réel */
  padding: 0;
  margin: 0;
  display: flex;
}

.screen {
  width: 100%;
  height: 100%;    /* prend 100% du parent */
  padding: 1rem;

  /* On retire tout le style “CRT” */
  border: none;
  border-radius: 0;
  transform: none;
  animation: none;

  /* Layout mobile */
  display: flex;
  flex-direction: column;
  justify-content: center;   /* centré verticalement */
  align-items: center;
  gap: 2rem;
}

.title {
  font-size: 2.2rem;
  margin-bottom: 1rem;
}

.start-btn {
  width: 80%;
  font-size: 1.1rem;
  padding: 0.8rem;
}
}

</style>
