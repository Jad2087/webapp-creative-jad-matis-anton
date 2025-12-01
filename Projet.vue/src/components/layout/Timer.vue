<template>
  <div class="timer-container">
    <div class="label">Oxygène</div>

    <!-- Barre contenant les segments -->
    <div class="bars">
      <div v-for="(bar, index) in totalBars" :key="index" class="bar" :class="{ active: index < remainingBars }"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Timer",

  data() {
    return {
      duration: 4 * 60, // 4 minutes en secondes
      elapsed: 0,
      totalBars: 8, // nombre de segments
    };
  },

  computed: {
    // Nombre de barres restantes (on part de 8 -> 0)
    remainingBars() {
      const progress = this.elapsed / this.duration;
      const barsLeft = this.totalBars - Math.floor(progress * this.totalBars);
      return Math.max(barsLeft, 0);
    },
  },

  mounted() {
    this.startTimer();
  },

  methods: {
    startTimer() {
      // évite de créer plusieurs intervals par erreur
      if (this.interval) return;

      this.interval = setInterval(() => {
        if (this.elapsed < this.duration) {
          this.elapsed++;
        } else {
          clearInterval(this.interval);
          this.interval = null;

          // 🔥 Émettre l’event seulement quand le timer est TERMINÉ
          this.$emit("timeout");
        }
      }, 1000);
    },
  },

  beforeUnmount() {
    clearInterval(this.interval);
  },
};
</script>

<style scoped>
.timer-container {
  border: 2px solid #ffffff;
  padding: 1rem;
  background-color: #111;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  width: 100%;
  box-sizing: border-box;
  min-height: 85px;
  flex: 0 0 auto;
}

.label {
  color: #03ab5e;
  font-family: monospace;
  font-size: 20px;
  min-width: 80px;
}

.bars {
  display: flex;
  gap: 4px;
}

.bar {
  width: 12px;
  height: 40px;
  background: #222;
  border: 2px solid #555;
}

.bar.active {
  background: #d6d6d6;
}
</style>
