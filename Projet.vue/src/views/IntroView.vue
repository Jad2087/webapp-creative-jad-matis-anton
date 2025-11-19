<template>
  <div class="container">
    <div class="intro-layout">
      <!-- Header -->

      <div class="screen">
        <AppHeader class="appheader" />
        <h1 class="title">Acte 1 - Réveil</h1>
        <button class="start-btn" @click="startStory">Continuer</button>
        <!-- Si tu veux afficher un bouton retour -->
        <!-- <button class="back-btn" @click="goBack">Retour</button> -->
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/layout/AppHeader.vue";

export default {
  name: "IntroView",

  components: { AppHeader },

  data() {
    return {};
  },
  methods: {
     // dirige l'utilisateur vers la route "game" avec un paramètre "id" égal à "intro".
    startStory() {
      this.$router.push({ name: "game", params: { id: "intro" } });
    },
     // dirige l'utilisateur vers la route nommée "home".
    goBack() {
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Courier New", monospace;
}
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
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
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
  transform: perspective(800px) rotateX(2deg) scale(1.02);  /* Effet de courbure CRT */
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
  font-family: "Courier New", Courier, monospace;
  font-size: 3rem;
  margin-bottom: 3rem;
  letter-spacing: 2px;
}

/* Boutons */
.start-btn {
  background-color: #111;
  color: #03ab5e;
  width: 250px;
  font-weight: bold;
  font-size: 1.2rem;
  padding: 0.75rem 2.5rem;
  border: 2px solid #03ab5e;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  display: block;
  margin: 1rem auto 0;
}

.start-btn:hover,
.back-btn:hover {
  background-color: #03ab5e;
  color: #000;
  transform: scale(1.1);
}

.appheader {
  width: 100%; 
  align-self: stretch; /* juste au cas où */
}
</style>
