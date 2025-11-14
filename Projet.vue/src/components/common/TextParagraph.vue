<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  choice: String // pour les choix futurs
})
</script>

<template>
  <!-- Texte narratif principal -->
  <p v-if="!choice" class="story-text">
    Tu te réveilles dans une forêt sombre, entouré de mystères et d’ombres. 
    Le vent souffle à travers les arbres, et une aventure incroyable t’attend…
  </p>

</template>

<style scoped>
.story-text {
  color: #03AB5E;
  font-family: 'Courier New', monospace;
  font-size: 1.2rem;
  text-align: center;
  margin: 2rem 0;
}
</style>
