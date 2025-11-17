<template>
  <div class="timer-container">
    <div class="label">Timer</div>

    <!-- Barre contenant les segments -->
    <div class="bars">
      <div
        v-for="(bar, index) in totalBars"
        :key="index"
        class="bar"
        :class="{ active: index < activeBars }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Timer",

  data() {
    return {
      duration: 5 * 60,        // 5 minutes en secondes
      elapsed: 0,
      totalBars: 8             // nombre de segments affichés comme sur l’image
    };
  },

  computed: {
    // nombre de segments activés en fonction du progrès
    activeBars() {
      return Math.floor((this.elapsed / this.duration) * this.totalBars);
    }
  },

  mounted() {
    this.startTimer();
  },

  methods: {
    startTimer() {
      this.interval = setInterval(() => {
        if (this.elapsed < this.duration) {
          this.elapsed++;
        } else {
          clearInterval(this.interval);
        }
      }, 1000);
    }
  },

  beforeUnmount() {
    clearInterval(this.interval);
  }
};
</script>

<style scoped>
.timer-container {
  background: #111;
  border: 2px solid white;
  padding: 20px;
  display: inline-block;
  width: 350px;
}

.label {
  color: #00ff88;
  font-family: monospace;
  font-size: 20px;
  margin-bottom: 10px;
}

.bars {
  display: flex;
  gap: 6px;
}

.bar {
  width: 20px;
  height: 60px;
  background: #222;
  border: 2px solid #555;
}

.bar.active {
  background: #d6d6d6;
}
</style>