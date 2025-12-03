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

// 👇 Nouveau computed pour cacher le bouton si conditions non remplies
const isVisible = computed(() => {
  // Si le choix ne demande rien → visible
  if (!props.choice.requiresEngine) return true;

  // Si le choix demande engine → visible SEULEMENT si engine activé
  return player.hasClue("engine");
});
</script>

<template>
  <!-- représente un choix -->
  <button
    v-if="isVisible"
    class="choice-btn"
    :class="{ 'choice-btn--clue-found': isClueFound }"
    @click="choose()"
  >
    {{ props.choice.text }}
  </button>
</template>

<style scoped>
.choice-btn {
  background-color: #111;
  color: #03ab5e;
  font-weight: bold;
  border: 2px solid #03ab5e;
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  margin: 0.5rem 0;
  cursor: pointer;
  width: 100%;
  max-width: 480px;
  box-sizing: border-box;
  transition: 0.3s ease;
}

.choice-btn:hover {
  background-color: #03ab5e;
  color: black;
  transform: scale(1.05);
}

/* états spéciaux */
.choice-btn--clue-found {
  background-color: #111;
  border-color: rgb(105, 105, 105);
  color: rgb(105, 105, 105);
}

.choice-btn--clue-found:hover {
  background-color: rgb(105, 105, 105);
  color: black;
}

@media (max-width: 1080px) {
  .choice-btn {
    width: 100%;
    max-width: none; /* Permet au bouton de prendre TOUTE la largeur */
    margin: 0; /* centré naturellement en full width */
  }

  .choice-btn:hover {
    transform: none; /* enlève le scale */
  }
}
</style>
