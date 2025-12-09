<template>
  <header class="app-header">
    <div class="app-header__logo">
      <h1 class="app-header__title">Codex</h1>
    </div>

    <nav class="app-header__nav">
      <RouterLink
        to="/"
        class="app-header__link"
        @click="playClick"
        @mouseenter="playHover"
      >
        Accueil
      </RouterLink>
    </nav>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
  props: {
    clickAudio: Object, // Audio pour le clic
    hoverAudio: Object, // Audio pour le hover
  },
  methods: {
    playClick() {
      if (this.clickAudio) {
        this.clickAudio.currentTime = 0;
        this.clickAudio.play();
      }
    },
    playHover() {
      if (this.hoverAudio) {
        this.hoverAudio.currentTime = 0;
        this.hoverAudio.play();
      }
    },
  },
};
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem;
  border: 2px solid #ffffff;
  background-color: #111;
  box-sizing: border-box;
  min-height: 70px;
}

.app-header__logo {
  display: flex;
  flex-direction: column;
}

.app-header__title {
  margin: 0;
  font-size: 2rem;
  letter-spacing: 2px;
  color: #03ab5e;
}

.app-header__nav {
  display: flex;
  gap: 0.75rem;
}

.app-header__link {
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: bold;
  padding: 0.5rem 1.5rem;
  border: 2px solid #03ab5e;
  color: #03ab5e;
  background-color: transparent;
  transition: all 0.3s ease-in-out;
}

.app-header__link:hover {
  background-color: #03ab5e;
  color: #000;
  transform: scale(1.05);
}

.app-header__link.router-link-active {
  background-color: #03ab5e;
  color: #000;
}
</style>
