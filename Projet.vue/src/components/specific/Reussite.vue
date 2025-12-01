<template>
  <div class="reussite-container">
    <div class="reussite-box">
      <h2 class="titre">{{ title }}</h2>
      <p class="description">{{ description }}</p>

      <div class="buttons">

        <!-- Bouton Accueil -->
        <button class="btn accueil" @click="$emit('menu')">
          Accueil
        </button>

        <!-- Bouton Historique -->
        <button class="btn menu" @click="showHistory = true">
          Historique
        </button>

      </div>
    </div>

    <!-- Overlay historique par-dessus Réussite -->
    <ChoiceMade v-if="showHistory" @close="showHistory = false" />
  </div>
</template>

<script>
import ChoiceMade from "@/components/specific/ChoiceMade.vue";

export default {
  name: "Reussite",
  components: { ChoiceMade },
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
  data() {
    return {
      showHistory: false,
    };
  },
};
</script>

<style scoped>
* {
  font-family: "Courier New", monospace;
}

.reussite-container {
  position: absolute;
  inset: 0;
  background: rgba(0, 255, 100, 0.20);
  display: flex;
  align-items: center;
  justify-content: center;
}

.reussite-box {
  width: 480px;
  padding: 30px;
  border: 3px solid #39FF88;
  background: #1b1b1b;
  color: #39FF88;
}

.titre {
  margin: 0 0 15px 0;
  font-size: 1.4rem;
}

.description {
  margin-bottom: 30px;
  color: #39FF88;
}

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

.btn.accueil {
  /* optionnel : style spécifique pour Accueil */
}
</style>
