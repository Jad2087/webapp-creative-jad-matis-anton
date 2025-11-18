<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  choice: Object, // pass a single choice object
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
  font-family: "Courier New", monospace;
}
.choice-btn {
  background-color: #111;
  color: #03ab5e;
  font-weight: bold;
  border: 2px solid #03ab5e;
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  margin: 0.5rem;
  cursor: pointer;
  width: 250px;
  transition: 0.3s ease;
}

.choice-btn:hover {
  background-color: #03ab5e;
  color: black;
  transform: scale(1.05);
}
</style>
