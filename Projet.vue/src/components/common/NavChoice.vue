<script setup>
import { defineProps, defineEmits, computed } from "vue";
import { usePlayerStore } from "@/stores/playerStore";

const props = defineProps({
  choice: Object, // un seul choix
});

const emit = defineEmits(["choose"]);

const player = usePlayerStore();

// Quand on clique sur le bouton
function choose() {
  emit("choose", props.choice.next);
}

// 🔥 Savoir si ce bouton mène à un clue déjà trouvé
const isClueFound = computed(() => {
  const next = props.choice?.next;
  if (!next || !next.id) return false;

  // On ne s'intéresse qu'aux chapitres qui commencent par "clue"
  if (!next.id.startsWith("clue")) return false;

  // On prend la "base" du clue (clue01, clue02, etc.)
  const baseId = next.id.split("-")[0]; // "clue01-01" -> "clue01"

  return player.hasClue(baseId);
});
</script>

<template>
  <!-- représente un choix -->
  <button class="choice-btn" :class="{ 'choice-btn--clue-found': isClueFound }" @click="choose()">
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

/* 🔥 État quand le clue lié à ce bouton a déjà été trouvé */
.choice-btn--clue-found {
  background-color: #111;   /* jaune */
  border-color: #f4e66a;
  color: #f4e66a;
}

.choice-btn--clue-found:hover {
  background-color: #f4e66a;   /* jaune un peu plus clair au hover */
  color: black;
}

</style>
