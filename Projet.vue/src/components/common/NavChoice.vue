<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  choices: Array
});

const emit = defineEmits(["choose"]);

function choose(nextId) {
  emit("choose", nextId);
}
</script>

<template>
  <div class="choices">
    <button
      v-for="(choice, i) in choices"
      :key="i"
      class="choice-btn"
      @click="choose(choice.next)"
    >
      {{ choice.text }}
    </button>
  </div>
</template>

<style scoped>
.choice-btn {
  background-color: black;
  color: #03AB5E;
  font-weight: bold;
  border: 2px solid #03AB5E;
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  margin: 0.5rem;
  cursor: pointer;
  transition: 0.3s ease;
}

.choice-btn:hover {
  background-color: #03AB5E;
  color: black;
  transform: scale(1.05);
}
</style>
