<template>
  <div class="reussite-container">
    <div class="reussite-box">
      <h2 class="titre">{{ title }}</h2>

      <p class="description">{{ description }}</p>

      <div class="buttons">
        <button class="btn continuer" @click="$emit('continuer')">
          Stats
        </button>

        <button class="btn menu" @click="$emit('menu')">
          Historique
        </button>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Reussite",
  props: {
    title: {
      type: String,
      default: "Réussite",
    },
    description: {
      type: String,
      default: "Bravo ! Vous avez complété le jeu.",
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Courier New", monospace;
}

/* Fond semi-transparent pour l’overlay */
.reussite-container {
  position: absolute;
  inset: 0;
  background: rgba(0, 255, 100, 0.20);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* La fenêtre verte */
.reussite-box {
  width: 480px;
  padding: 30px;
  border: 3px solid #39FF88;
  background: #1b1b1b;
  color: #39FF88;
}

/* Titre */
.titre {
  margin: 0 0 15px 0;
  font-size: 1.4rem;
}

/* Texte */
.description {
  margin-bottom: 30px;
  color: #39FF88;
}

/* Boutons */
.buttons {
  display: flex;
  justify-content: space-between;
}

.btn {
  padding: 10px 20px;
  border: 2px solid #39FF88;
  background: transparent;
  color: #39FF88;
  cursor: pointer;
  transition: 0.2s;
}

.btn:hover {
  background: #39FF8833;
  transform: scale(1.05);
}
</style>
