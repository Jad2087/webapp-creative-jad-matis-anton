<script>

export default {
  name: 'AppHeader'
};

</script>
<template>
    <header class="app-header">
      <div class="app-header__logo">
        <!-- Tu peux mettre un petit logo/image ici plus tard -->
        <h1 class="app-header__title">Codex</h1>
        <p class="app-header__subtitle">Une histoire interactive</p>
      </div>
  
      <nav class="app-header__nav">
        <!-- Adapter les routes selon ton router -->
        <RouterLink to="/" class="app-header__link">Accueil</RouterLink>
      </nav>
    </header>
  </template>

  
  <style scoped>

* {
  font-family: 'Courier New', Courier, monospace;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;          /* ⬅ prend toute la largeur */
  display: block;       /* ⬅ force le header à s'étendre horizontalement */

  background-color: #000;
  border: 2px solid #03AB5E;
  box-shadow: 0 0 15px rgba(3, 171, 94, 0.4);

  padding: 1rem 1.5rem;
  font-family: "Space Mono", monospace;
}

  
  /* Bloc titre à gauche */
  .app-header__logo {
    display: flex;
    flex-direction: column;
  }
  
  .app-header__title {
    margin: 0;
    font-size: 1.4rem;
    letter-spacing: 0.08em;
    color: #03AB5E;
  }
  
  .app-header__subtitle {
    margin: 0.2rem 0 0;
    font-size: 0.85rem;
    color: #03AB5E;
    opacity: 0.8;
  }
  
  /* Nav à droite */
  .app-header__nav {
    display: flex;
    gap: 0.75rem;
  }
  
  .app-header__link {
    text-decoration: none;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  
    /* même style que tes boutons */
    padding: 0.4rem 0.9rem;
    border: 2px solid #03AB5E;
    color: #03AB5E;
    background-color: transparent;
    transition: all 0.3s ease-in-out;
  }
  
  .app-header__link:hover {
    background-color: #03AB5E;
    color: #000;
    transform: scale(1.05);
  }
  
  /* lien actif (route courante) */
  .app-header__link.router-link-active {
    background-color: #03AB5E;
    color: #000;
  }
  </style>
  