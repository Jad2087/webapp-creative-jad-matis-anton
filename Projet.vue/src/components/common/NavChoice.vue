<template>
  <button v-if="isVisible" class="choice-btn" :class="{ 'choice-btn--clue-found': isClueFound }" @click="choose"
    @mouseenter="$emit('hover-choice')">
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

if (id === "engine01" || id === "engine01-03") {
  return this.player.hasClue("engine01");
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
  const resolved = this.resolveNext(this.choice);
  console.log("NavChoice.choose → resolved:", resolved, "player.clues:", this.player.clues);
  this.$emit("choose", resolved, this.choice.text);
},



    resolveNext(choice) {
      const id = choice.next.id;

      // -------------------------
      // ACT 1 CLUES
      // -------------------------

      // Clue 01
      if (id === "clue01" && this.player.hasClue("clue01")) {
        return { id: "clue01-03", type: "story", good: true };
      }

      // Clue 02
      if (id === "clue02" && this.player.hasClue("clue02")) {
        return { id: "clue02-03", type: "story", good: true };
      }

      // -------------------------
      // ACT 2 CLUES
      // -------------------------

      if (id === "clue03" && this.player.hasClue("clue03")) {
        return { id: "clue03-03", type: "story", good: true };
      }

      if (id === "clue04" && this.player.hasClue("clue04")) {
        return { id: "clue04-03", type: "story", good: true };
      }

      if (id === "clue07" && this.player.hasClue("clue07")) {
        return { id: "clue07-03", type: "story", good: true };
      }

      if (id === "clue08" && this.player.hasClue("clue08")) {
        return { id: "clue08-03", type: "story", good: true };
      }

      if (id === "clue09" && this.player.hasClue("clue09")) {
        return { id: "clue09-03", type: "story", good: true };
      }

      if (id === "clue10" && this.player.hasClue("clue10")) {
        return { id: "clue10-03", type: "story", good: true };
      }

      if (id === "clue100" && this.player.hasClue("clue100")) {
        return { id: "clue100-03", type: "story", good: true };
      }

      if (id === "clue111" && this.player.hasClue("clue111")) {
        return { id: "clue111-03", type: "story", good: true };
      }

      // -------------------------
      // ENGINE SECTION
      // -------------------------

      // If player already reactivated the generator
if (id === "engine01" && this.player.hasClue("engine01")) {
  return { id: "engine01-03", type: "story", good: true };
}



      // Default: no change
      return choice.next;
    }



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
