<template>
  <div class="choice-made">
    <h3>Historique</h3>

    <!-- Liste des choix enregistrés -->
    <ul>
      <li v-for="(choice, index) in choicesHistory" :key="index">
        {{ index + 1 }}. {{ choice }}
      </li>
    </ul>

    <!-- Bouton pour fermer l'historique -->
    <button class="btn-close" @mouseover="playHover" @click="onClose">
      Fermer
    </button>
  </div>
</template>

<script>
import { useStoryStore } from "@/stores/storyStore";
import { storeToRefs } from "pinia";

// SONS
import clickSound from "@/Sounds/futuristic_click.mp3";
import hoverSound from "@/Sounds/futuristic_hover.mp3";

export default {
  name: "ChoiceMade",

  setup() {
    const storyStore = useStoryStore();
    const { choicesHistory } = storeToRefs(storyStore);

    return { choicesHistory };
  },

  data() {
    return {
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

    onClose() {
      this.playClick();
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Courier New", monospace;
}

/* --- Fenêtre Historique (PC) — Style terminal dans le coin --- */
.choice-made {
  position: absolute;
  top: 8%;
  right: 5%;
  /* coin haut droit rétro */

  width: 340px;
  max-height: 60vh;

  background-color: #111;
  border: 2px solid #03ab5e;
  padding: 1rem;
  color: #03ab5e;

  display: flex;
  flex-direction: column;

  text-align: left;
  box-shadow: 0 0 18px rgba(3, 171, 94, 0.3);

  overflow-y: auto;
  border-radius: 4px;

  z-index: 9999;

  /* Légère transformation pour effet “HUD” */
  transform: translateY(0) scale(0.98);
}

/* Titre */
.choice-made h3 {
  margin-bottom: 0.6rem;
  font-size: 1.2rem;
  letter-spacing: 1.5px;
  text-align: center;
}

/* Liste */
.choice-made ul {
  margin: 0;
  padding-left: 0;
  list-style: none;
  max-height: 40vh;
  overflow-y: auto;
}

.choice-made li {
  margin: 0.25rem 0;
  padding-left: 0.4rem;
  border-left: 2px solid #03ab5e55;
  font-size: 0.95rem;
}

/* Bouton */
.btn-close {
  margin-top: 0.8rem;
  padding: 0.5rem 1rem;
  width: 100%;

  border: 2px solid #03ab5e;
  background: transparent;
  color: #03ab5e;

  font-size: 1rem;
  cursor: pointer;

  transition: 0.15s ease;
}

.btn-close:hover {
  background: #03ab5e;
  color: black;
}

/* --- MOBILE VERSION --- */
@media (max-width: 600px) {
  .choice-made {
    width: 90%;
    max-height: 80vh;

    padding: 1rem;
    border-radius: 6px;

    /* toujours parfaitement centré */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .choice-made h3 {
    font-size: 1.2rem;
    margin-bottom: 0.8rem;
  }

  .choice-made ul {
    max-height: 55vh;
    /* plus de place pour défiler */
  }

  .btn-close {
    font-size: 1rem;
    padding: 0.7rem;
  }
}
</style>
