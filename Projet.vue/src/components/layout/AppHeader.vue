<template>
  <header class="app-header">
    <div class="app-header__logo">
      <h1 class="app-header__title">Codex</h1>
      <p class="app-header__subtitle">Mise en Contexte</p>
    </div>

    <nav class="app-header__nav">
      <RouterLink to="/" class="app-header__link">Accueil</RouterLink>
    </nav>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
};
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  /* Match story-box */
  width: 100%;
  padding: 1rem;
  border: 2px solid #ffffff;
  background-color: #111;
  box-sizing: border-box;
}

.app-header__logo {
  display: flex;
  flex-direction: column;
}

.app-header__title {
  margin: 0;
  font-size: 1.7rem;
  letter-spacing: 0.08em;
  color: #03ab5e;
}

.app-header__subtitle {
  margin: 0.2rem 0 0;
  font-size: 0.85rem;
  color: #03ab5e;
  opacity: 0.8;
}

.app-header__nav {
  display: flex;
  gap: 0.75rem;
}

.app-header__link {
  text-decoration: none;
  font-size: 0.9rem;
  letter-spacing: 0.08em;
  padding: 0.4rem 0.9rem;
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
