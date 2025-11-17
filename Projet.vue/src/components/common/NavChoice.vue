<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  choice: Object  // pass a single choice object
});
const emit = defineEmits(["choose"]);

function choose() {
  emit("choose", props.choice.next);
}
</script>

<template>
  <button class="choice-btn" @click="choose()">
    {{ props.choice.text }}
  </button>
</template>

<style scoped>
* {
  font-family: 'Courier New', Courier, monospace;
}
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
