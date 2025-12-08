<template>
  <div class="echec-container">
    <div class="echec-box">
      <h2 class="titre">{{ title }}</h2>
      <p class="description">{{ description }}</p>

      <div class="buttons">
        <!-- Bouton Recommencer -->
        <button class="btn retry" @mouseover="playHover" @click="onRetry">
          Recommencer
        </button>

        <!-- Bouton Menu Principal -->
        <button class="btn menu" @mouseover="playHover" @click="onMenu">
          Menu Principal
        </button>

        <!-- Bouton Historique -->
        <button class="btn history" @mouseover="playHover" @click="onHistory">
          Historique
        </button>
      </div>
    </div>

    <!-- Overlay historique -->
    <ChoiceMade v-if="showHistory" @close="showHistory = false" />
  </div>
</template>

<script>
import ChoiceMade from "@/components/specific/ChoiceMade.vue";

// SONS
import clickSound from "@/Sounds/futuristic_click.mp3";
import hoverSound from "@/Sounds/futuristic_hover.mp3";

export default {
  name: "Echec",
  components: { ChoiceMade },

  props: {
    title: { type: String, default: "Erreur Chronique" },
    description: { type: String, default: "Informations …" },
  },

  data() {
    return {
      showHistory: false,

      // audio
      clickAudio: null,
      hoverAudio: null,
    };
  },

  created() {
    // Préchargement
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

    onRetry() {
      this.playClick();
      this.$emit("retry");
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
    /* halo rouge */
    0 0 60px 15px rgba(0, 0, 0, 0.9),
    /* ombre profonde */
    inset 0 0 20px rgba(0, 0, 0, 0.7),
    /* ombre interne */
    inset 0 0 40px rgba(227, 94, 94, 0.15);
  /* lueur interne légère */
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
  justify-content: center;
  gap: 15px;
  /* ESPACEMENT ENTRE LES 3 BOUTONS */
  margin-top: 20px;
}

.btn {
  padding: 10px 20px;
  border: 2px solid #e35e5e;
  background: transparent;
  color: #e35e5e;
  cursor: pointer;
  transition: 0.2s;
  min-width: 130px;
  /* Largeur uniforme */
  text-align: center;
}

.btn:hover {
  background: #e35e5e;
  transform: scale(1.05);
  color: black;
}

.history {
  border-color: #e35e5e;
  color: #e35e5e;
}

.history:hover {
  background: #e35e5e;
  color: black;
}

@media (max-width: 1080px) {

  /* Fond semi-transparent, mais pas obligé de couvrir pile 100% */
  .echec-container {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    padding: 1rem;
  }

  /* Boîte centrale plus petite, élégante, non plein écran */
  .echec-box {
    width: 90vw;
    max-width: 480px;
    max-height: 85vh;

    padding: 1.5rem;
    border: 2px solid #e35e5e;
    background: #111;
    color: #e35e5e;

    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 0 20px rgba(227, 94, 94, 0.5);

    overflow: hidden;
  }

  /* Titre compact */
  .titre {
    font-size: 1.6rem;
    margin-bottom: 0.5rem;
  }

  /* Texte scrollable si très long */
  .description {
    font-size: 1rem;
    margin: 1rem 0;
    max-height: 40vh;
    overflow-y: auto;
    text-align: center;
    padding: 0 0.5rem;
  }

  /* Zone boutons */
  .buttons {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: auto;
  }

  .btn {
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 0.87rem;
    border: 2px solid #e35e5e;
    background: transparent;
    color: #e35e5e;
    cursor: pointer;
    transition: 0.2s;
  }

  .btn:hover {
    background: #e35e5e;
    color: black;
  }
}
</style>
