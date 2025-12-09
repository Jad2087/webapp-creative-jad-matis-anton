<template>
  <button
    v-if="isVisible"
    class="choice-btn"
    :class="{ 'choice-btn--clue-found': isClueFound }"
    @click="choose"
    @mouseenter="$emit('hover-choice')"
  >
    {{ choice.text }}
  </button>
</template>

<script>
import { computed } from "vue";
import { usePlayerStore } from "@/stores/playerStore";

export default {
  name: "NavChoice",
  props: {
    choice: Object, // le choix reçu
  },
  data() {
    return {
      player: usePlayerStore(), // store disponible partout
    };
  },
  computed: {
    isClueFound() {
      const next = this.choice?.next;
      if (!next || !next.id) return false;

      const id = next.id;

      if (id.startsWith("clue")) {
        const baseClue = id.split("-")[0];
        return this.player.hasClue(baseClue);
      }

      if (id === "engine01") {
        return this.player.hasClue("engine");
      }

      return false;
    },
    isVisible() {
      if (!this.choice.requiresEngine) return true;
      return this.player.hasClue("engine");
    },
  },
  methods: {
    choose() {
      // émet l'événement de clic
      this.$emit("choose", this.choice.next, this.choice.text);
    },
  },
};
</script>

<style scoped>
.choice-btn {
  background-color: #111;
  color: #03ab5e;
  font-weight: bold;
  border: 2px solid #03ab5e;
  padding: 0.5rem 1.5rem;
  font-size: 0.9rem;
  margin: 0;
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
    max-width: none;
    margin: 0;
  }

  .choice-btn:hover {
    transform: none;
  }
}
</style>
