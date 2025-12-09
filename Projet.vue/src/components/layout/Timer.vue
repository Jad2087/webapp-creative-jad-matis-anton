<template>
  <div class="timer-container">
    <div class="label">Oxygène</div>

    <!-- Barre contenant les segments -->
    <div class="bars">
      <div
        v-for="(bar, index) in totalBars"
        :key="index"
        class="bar"
        :class="{ active: index < remainingBars }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Timer",

  data() {
    return {
      duration: 4 * 60,
      elapsed: 0,
      totalBars: 8,
    };
  },

  computed: {
    remainingBars() {
      const progress = this.elapsed / this.duration;
      return Math.max(
        this.totalBars - Math.floor(progress * this.totalBars),
        0
      );
    },
  },

  mounted() {
    this.startTimer();
  },

  methods: {
    startTimer() {
      if (this.interval) return;

      this.interval = setInterval(() => {
        if (this.elapsed < this.duration) {
          this.elapsed++;
        } else {
          clearInterval(this.interval);
          this.interval = null;
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
* {
  font-family: "Courier New", monospace;
}

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
  min-height: 73px;
}

.label {
  color: #03ab5e;
  font-size: 18px;
  font-weight: bold;
  min-width: 80px;
}

.bars {
  display: flex;
  gap: 4px;
  margin-left: auto;
  /* pousse les barres complètement à droite */
}

.bar {
  width: 12px;
  height: 34px;
  background: #222;
  border: 2px solid #555;
}

.bar.active {
  background: #d6d6d6;
}

/* Version mobile */
@media (max-width: 1080px) {
  .timer-container {
    padding: 0.5rem;
    min-height: 70px;
    gap: 10px;
  }
}
</style>
