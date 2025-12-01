<template>
  <div class="choice-made">
    <h3>Historique des choix :</h3>
    <ul>
      <!-- boucle sur chaque élément dans choicesHistory -->
      <li v-for="(choice, index) in choicesHistory" :key="index">
        {{ index + 1 }}. {{ choice }} <!-- affiche le numéro du choix + le texte du choix -->
      </li>
    </ul>
    <button class="btn-close" @click="$emit('close')">Fermer</button>
  </div>
</template>

<script>
import { useStoryStore } from "@/stores/storyStore";

export default {
  name: "ChoiceMade",
  setup() {
    const storyStore = useStoryStore();
    return { choicesHistory: storyStore.choicesHistory };
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
}

.btn-close:hover {
  background: #03ab5e33;
}
</style>
