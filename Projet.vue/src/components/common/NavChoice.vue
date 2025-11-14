<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['playerChoice'])

function choose(option) {
  emit('playerChoice', option)  // envoie le choix au parent (GameView)
}
</script>

<template>
  <div class="nav-choice">
    <button class="choice-btn" @click="choose('fight')">Combattre un ennemi</button>
    <button class="choice-btn" @click="choose('explore')">Explorer la forêt</button>
  </div>
</template>

<style scoped>
.nav-choice {
  margin-top: 2rem;
  text-align: center;
}

.choice-btn {
  background-color: #000;
  color: #03AB5E;
  font-weight: bold;
  font-size: 1.2rem;
  padding: 0.75rem 2rem;
  border: 2px solid #03AB5E;
  cursor: pointer;
  margin: 0.5rem;
  transition: all 0.3s ease-in-out;
}

.choice-btn:hover {
  background-color: #03AB5E;
  color: #000;
  transform: scale(1.05);
}
</style>
