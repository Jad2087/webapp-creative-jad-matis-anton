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

.reussite-container {
  position: absolute;
  inset: 0;
  background: rgba(0, 255, 100, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.reussite-box {
  width: 480px;
  padding: 30px;
  border: 3px solid #39ff88;
  background: #111;
  color: #39ff88;
}

.titre {
  margin: 0 0 15px 0;
  font-size: 1.4rem;
}

.description {
  margin-bottom: 30px;
  color: #39ff88;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

.btn {
  padding: 10px 20px;
  border: 2px solid #39ff88;
  background: transparent;
  color: #39ff88;
  cursor: pointer;
  transition: 0.2s;
}

.btn:hover {
  background: #39ff88;
  color: black;
  transform: scale(1.05);
}

/* === VERSION MOBILE === */
@media screen and (max-width: 1080px) {
  .reussite-container {
    position: fixed;
    width: 100vw;
    height: 100dvh;
    background: rgba(0, 255, 100, 0.2);
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }

  .reussite-box {
    width: 95vw;
    height: 100dvh;
    padding: 1rem;
    border: 2px solid #39ff88;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
  }

  .titre {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  .description {
    font-size: 1.2rem;
    text-align: center;
    margin: 0;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .buttons {
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    padding-bottom: 1rem;
  }

  .btn {
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 1.1rem;
  }

  .btn:hover {
    transform: none;
  }
}
</style>
