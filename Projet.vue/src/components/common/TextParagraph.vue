<script setup>
import { defineProps } from "vue";

const props = defineProps({
  text: String
});
</script>

<template>
  <p class="story-text">
    {{ text }}
  </p>
</template>

<style scoped>
.story-text {
  color: #03AB5E;
  font-size: 1.2rem;
  text-align: center;
  margin: 1.5rem 0;
}
</style>
