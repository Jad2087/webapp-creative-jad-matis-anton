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

.choice-made {
  color: #03ab5e;
  background-color: #1b1b1b;
  padding: 1rem;
  border: 2px solid #03ab5e;
  max-height: 60%;
  width: 400px;
  position: absolute;
  top: 10%;
  right: 10%;
  overflow-y: auto;
  z-index: 10;
}

.choice-made h3 {
  margin: 0 0 0.5rem 0;
}

.choice-made ul {
  margin: 0;
  padding-left: 1rem;
}

.btn-close {
  margin-top: 10px;
  padding: 5px 10px;
  border: 2px solid #03ab5e;
  background: transparent;
  color: #03ab5e;
  cursor: pointer;
  transition: 0.2s;
}

.btn-close:hover {
  background: #03ab5e;
  color: black;
  transform: scale(1.05);
}

/* Version mobile */
@media (max-width: 600px) {
  .choice-made {
    width: 90%;
    max-height: 80%;
    top: 50%;
    left: 50%;
    right: auto;
    transform: translate(-50%, -50%);
    padding: 0.8rem;
  }

  .btn-close {
    width: 100%;
    text-align: center;
  }
}
</style>
