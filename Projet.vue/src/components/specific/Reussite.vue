<template>
  <div class="reussite-container">
    <div class="reussite-box">
      <h2 class="titre">{{ title }}</h2>
      <p class="description">{{ description }}</p>

      <div class="buttons">
        <!-- Bouton Accueil -->
        <button class="btn accueil" @mouseover="playHover" @click="onMenu">
          Accueil
        </button>

        <!-- Bouton Historique -->
        <button class="btn menu" @mouseover="playHover" @click="onHistory">
          Historique
        </button>
      </div>
    </div>

    <!-- Overlay historique seulement si showHistory est true -->
    <ChoiceMade v-if="showHistory" @close="showHistory = false" />
  </div>
</template>

<script>
import ChoiceMade from "@/components/specific/ChoiceMade.vue";

// SONS
import clickSound from "@/Sounds/futuristic_click.mp3";
import hoverSound from "@/Sounds/futuristic_hover.mp3";

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
      clickAudio: null,
      hoverAudio: null,
    };
  },
  created() {
    this.clickAudio = new Audio(clickSound);
    this.hoverAudio = new Audio(hoverSound);

    this.clickAudio.load();
    this.hoverAudio.load();
  },
  methods: {
    playClick() {
      this.clickAudio.currentTime = 0;
      this.clickAudio.play();
    },
    playHover() {
      this.hoverAudio.currentTime = 0;
      this.hoverAudio.play();
    },
    onMenu() {
      this.playClick();
      this.$emit("menu");
    },
    onHistory() {
      this.playClick();
      this.showHistory = true;
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
  background: rgba(0, 255, 100, 0.25);
  /* vert clair semi-transparent */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Boîte centrale */
.reussite-box {
  width: 480px;
  padding: 30px;
<<<<<<< Updated upstream
  border: 3px solid #39ff88;
  /* vert fluo */
  background: #111;
  /* fond sombre */
  color: #39ff88;
  box-shadow: 0 0 25px 5px rgba(57, 255, 136, 0.5),
    0 0 60px 15px rgba(0, 0, 0, 0.9),
    inset 0 0 20px rgba(0, 0, 0, 0.7),
    inset 0 0 40px rgba(57, 255, 136, 0.15);
=======
  border: 3px solid #03ab5e;
  background: #111;
  color: #03ab5e;
  box-shadow: 0 0 25px 5px rgba(3, 171, 94, 0.5),
    /* halo vert */ 0 0 60px 15px rgba(0, 0, 0, 0.9),
    /* ombre profonde */ inset 0 0 20px rgba(0, 0, 0, 0.7),
    /* ombre interne pour effet vitre */ inset 0 0 40px rgba(3, 171, 94, 0.15); /* lueur interne légère */
>>>>>>> Stashed changes
}

/* Titre */
.titre {
  margin: 0 0 15px 0;
  font-size: 1.4rem;
  font-weight: bold;
}

/* Texte */
.description {
  margin-bottom: 30px;
<<<<<<< Updated upstream
  color: #39ff88;
  text-align: center;
=======
  color: #03ab5e;
>>>>>>> Stashed changes
}

/* Boutons */
.buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  /* espace entre les boutons */
  margin-top: 20px;
}

.btn {
  padding: 10px 20px;
  border: 2px solid #03ab5e;
  background: transparent;
  color: #03ab5e;
  cursor: pointer;
  transition: 0.2s;
  min-width: 130px;
  text-align: center;
  font-weight: bold;
}

.btn:hover {
<<<<<<< Updated upstream
  background: #39ff88;
=======
  background: #03ab5e;
  color: black;
>>>>>>> Stashed changes
  transform: scale(1.05);
  color: black;
}

.accueil {
  border-color: #39ff88;
  color: #39ff88;
}

.accueil:hover {
  background: #39ff88;
  color: black;
}

.menu {
  border-color: #39ff88;
  color: #39ff88;
}

.menu:hover {
  background: #39ff88;
  color: black;
}

/* version mobile */
@media (max-width: 1080px) {
  .reussite-container {
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    padding: 1rem;
  }

  .reussite-box {
<<<<<<< Updated upstream
    width: 90vw;
    max-width: 480px;
    max-height: 85vh;
    padding: 1.5rem;
    border: 2px solid #39ff88;
    background: #111;
    color: #39ff88;
=======
    width: 95vw;
    height: 100dvh;
    padding: 1rem;
    border: 2px solid #03ab5e;
>>>>>>> Stashed changes
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 0 20px rgba(57, 255, 136, 0.5);
    overflow: hidden;
  }

  .titre {
    font-size: 1.6rem;
    margin-bottom: 0.5rem;
  }

  .description {
    font-size: 1rem;
    margin: 1rem 0;
    max-height: 40vh;
    overflow-y: auto;
    text-align: center;
  }

  .buttons {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: auto;
  }

  .btn {
<<<<<<< Updated upstream
    width: 100%;
=======
    max-width: 480px;
>>>>>>> Stashed changes
    padding: 0.5rem 1.5rem;
    font-size: 0.9rem;
  }

  .btn:hover {
    transform: none;
  }
}
</style>
