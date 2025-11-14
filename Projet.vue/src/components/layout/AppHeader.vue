<template>
    <header class="app-header">
      <div class="app-header__logo">
        <!-- Tu peux mettre un petit logo/image ici plus tard -->
        <h1 class="app-header__title">Trace ton chemin</h1>
        <p class="app-header__subtitle">Une histoire interactive</p>
      </div>
  
      <nav class="app-header__nav">
        <!-- Adapter les routes selon ton router -->
        <RouterLink to="/" class="app-header__link">Accueil</RouterLink>
        <RouterLink to="/story" class="app-header__link">Histoire</RouterLink>
        <RouterLink to="/saves" class="app-header__link">Sauvegardes</RouterLink>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    name: 'AppHeader'
  };
  </script>
  
  <style scoped>
  .app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2rem 2rem;
    border-bottom: 1px solid #333;
    background: #050508;
  }
  
  .app-header__logo {
    display: flex;
    flex-direction: column;
  }
  
  .app-header__title {
    margin: 0;
    font-size: 1.6rem;
  }
  
  .app-header__subtitle {
    margin: 0;
    font-size: 0.9rem;
    opacity: 0.7;
  }
  
  .app-header__nav {
    display: flex;
    gap: 1rem;
  }
  
  .app-header__link {
    text-decoration: none;
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  
  .app-header__link.router-link-active {
    border-bottom: 2px solid currentColor;
  }
  </style>
  