<script setup>
import { defineProps } from "vue";

const props = defineProps({
  text: String,
});
</script>

<template>
  <!-- Paragraphe affichant le texte de l'histoire -->
  <p class="story-text">
    {{ text }}
  </p>
</template>

<style scoped>
* {
  font-family: "Courier New", monospace;
}

.story-text {
  color: #03ab5e;
  font-size: 1.2rem;
  text-align: center;
  margin: 1.5rem 0;
}
</style>
