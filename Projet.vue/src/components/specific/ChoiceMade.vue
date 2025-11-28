<template>
  <div class="choice-made">
    <h3>Historique des choix :</h3>
    <ul>
      <li v-for="(choice, index) in choicesMade" :key="index">
        {{ index + 1 }}. {{ choice }}
      </li>
    </ul>
  </div>
</template>

<script>
import { usePlayerStore } from "@/stores/playerStore";

export default {
  name: "ChoiceMade",
  setup() {
    const player = usePlayerStore();
    return {
      choicesMade: player.choicesMade,
    };
  },
};
</script>

<style scoped>

* {
  font-family: "Courier New", monospace;
}

.choice-made {
  color: #03ab5e;
  background-color: rgba(0,0,0,0.85);
  padding: 1rem;
  border: 2px solid #03ab5e;
  max-height: 40%;
  width: 40%;
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  overflow-y: auto;
}

.choice-made h3 {
  margin: 0 0 0.5rem 0;
}

.choice-made ul {
  margin: 0;
  padding-left: 1rem;
}
</style>
