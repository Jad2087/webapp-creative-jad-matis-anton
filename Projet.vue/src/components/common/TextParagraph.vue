<script setup>
import { defineProps } from 'vue'
const props = defineProps({ choice: String })
</script>

<template>
  <p v-if="choice === 'fight'">Tu te prépares au combat !</p>
  <p v-else-if="choice === 'explore'">Tu pars explorer la forêt mystérieuse...</p>
</template>
