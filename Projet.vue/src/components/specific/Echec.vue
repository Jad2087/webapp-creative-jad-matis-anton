<template>
  <div class="echec-container">
    <div class="echec-box">
      <h2 class="titre">{{ title }}</h2>
      <p class="description">{{ description }}</p>

      <div class="buttons">
        <button class="btn retry" @click="$emit('retry')">Recommencer</button>

        <button class="btn menu" @click="$emit('menu')">Menu Principal</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Echec",
  props: {
    title: {
      type: String,
      default: "Erreur Chronique",
    },
    description: {
      type: String,
      default: "Informations …",
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Courier New", monospace;
}

/* Fond semi-transparent pour l’overlay */
.echec-container {
  position: absolute;
  inset: 0;
  background: rgba(70, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* La fenêtre rouge */
.echec-box {
  width: 480px;
  padding: 30px;
  border: 3px solid #e35e5e;
  background: #1b1b1b;
  color: #e35e5e;
  box-shadow: 0 0 25px 5px rgba(227, 94, 94, 0.5),
    /* halo rouge */ 0 0 60px 15px rgba(0, 0, 0, 0.9),
    /* ombre profonde */ inset 0 0 20px rgba(0, 0, 0, 0.7),
    /* ombre interne */ inset 0 0 40px rgba(227, 94, 94, 0.15); /* lueur interne légère */
}

/* Titre */
.titre {
  margin: 0 0 15px 0;
  font-size: 1.4rem;
}

/* Texte */
.description {
  margin-bottom: 30px;
  color: #e35e5e;
}

/* Boutons */
.buttons {
  display: flex;
  justify-content: space-between;
}

.btn {
  padding: 10px 20px;
  border: 2px solid #e35e5e;
  background: transparent;
  color: #e35e5e;
  cursor: pointer;
  transition: 0.2s;
}

.btn:hover {
  background: #e35e5e;
  transform: scale(1.05);
  color: black;
}

@media (max-width: 1080px) {
  .echec-container {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100dvh;
    background: rgba(0, 0, 0, 0.95);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }

  .echec-box {
    width: 95vw;
    height: 100dvh;
    max-width: 1100px;
    padding: 1rem;
    border: 2px solid #e35e5e;
    background: #111;
    color: #e35e5e;
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* titre en haut, boutons en bas */
    align-items: center;
    text-align: center;
    box-sizing: border-box;
  }

  .titre {
    font-size: 1.8rem;
    margin-top: 1rem; /* reste en haut */
  }

  .description {
    font-size: 1.2rem;
    margin: 1rem 0;
    flex: 1; /* prend tout l’espace central */
    display: flex;
    align-items: center;
    justify-content: center; /* centre horizontalement et verticalement */
    text-align: center;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%; /* boutons pleine largeur */
    padding-bottom: 1rem; /* espace par rapport au bas */
  }

  .btn {
    width: 100%; /* pleine largeur */
    padding: 0.75rem 1rem;
    font-size: 1.1rem;
    border: 2px solid #e35e5e;
    background: transparent;
    color: #e35e5e;
    cursor: pointer;
    transition: 0.2s;
  }

  .btn:hover {
    background: #e35e5e;
    transform: scale(1.05);
    color: black;
    transform: none; /* enlève le scale */
  }
}
</style>
