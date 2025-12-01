<template>
  <div class="stats-container">
    <div class="stats-display">
      <div class="stat">
        <span class="title">MORTS :</span>
        <span class="value">{{ player.deaths }}</span>
      </div>
      <div class="stat">
        <span class="title">AIDE INDICES :</span>
        <span class="value">{{ collectedClues }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { usePlayerStore } from "@/stores/playerStore";
import { computed } from "vue";

export default {
  setup() {
    const player = usePlayerStore();

    // Somme toutes les valeurs de flags pour le total d'indices
    const collectedClues = computed(() => {
      return Object.values(player.flags).reduce((sum, v) => sum + v, 0);
    });

    return { player, collectedClues };
  },
};
</script>

<style scoped>
.stats-container {
  width: 100%;
  height: 150px;
  padding: 10px;
  border: 2px solid #ffffff;
  background-color: #111;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-sizing: border-box;
}

.stats-display {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat {
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: #03ab5e;
  font-family: "Courier New", monospace;
}

.title {
  font-size: 12px;
  letter-spacing: 1px;
}

.value {
  font-size: 16px;
  font-weight: bold;
}

/* Version mobile : retirer la hauteur fixe */
@media (max-width: 1080px) {
  .stats-container {
    height: auto; /* s'adapte au contenu */
  } }
</style>
