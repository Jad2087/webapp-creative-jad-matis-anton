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

// 🔥 Highlight ANY button linked to a discovered clue or special flag
const isClueFound = computed(() => {
  const next = props.choice?.next;
  if (!next || !next.id) return false;

  const id = next.id;

  // 1. Standard clue pages ("clue01", "clue01-02", etc.)
  if (id.startsWith("clue")) {
    const baseClue = id.split("-")[0]; // "clue01"
    return player.hasClue(baseClue);
  }

  // 2. SPECIAL CASE: Terminal B → engine01
  if (id === "engine01") {
    return player.hasClue("engine");
  }

  return false;
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
