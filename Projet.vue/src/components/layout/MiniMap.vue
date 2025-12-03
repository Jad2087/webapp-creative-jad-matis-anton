<template>
  <div class="minimap-container">
    <p class="minimap-title">Mini Map</p>

    <div class="minimap-content">
      <!-- Image de la mini-map -->
      <img class="minimap-image" :src="miniMapImage" alt="" />

      <!-- Point -->
      <div class="map-point" :style="pointStyle">●</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MiniMap",
  props: ["currentChapterId"],

  data() {
    return {
      miniMapImage: "/src/Images/minimap.png",
      chapterPositions: {
        intro: { top: "19%", left: "52%" },
        fork01: { top: "30%", left: "52%" },
        clue01: { top: "33%", left: "66%" },
        "clue01-01": { top: "35%", left: "8%" },
        "clue01-02": { top: "30%", left: "12%" },
        clue02: { top: "45%", left: "42%" },
        minigame01: { top: "50%", left: "60%" },
        intro2: { top: "10%", left: "85%" },
        default: { top: "50%", left: "50%" },
      },
    };
  },

  computed: {
    pointStyle() {
      return (
        this.chapterPositions[this.currentChapterId] ||
        this.chapterPositions.default
      );
    },
  },
};
</script>

<style scoped>
.minimap-container {
  border: 2px solid #ffffff;
  background-color: #111;
  padding: 0.8rem;
  width: 100%;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}

.minimap-title {
  color: #03ab5e;
  margin-bottom: 0.5rem;
  font-weight: bold;
  font-size: 1rem;
}

.minimap-content {
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.minimap-image {
  width: 100%;
  height: auto;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.map-point {
  position: absolute;
  transform: translate(-50%, -50%);
  color: #03ab5e;
  font-size: 1.4rem;
  pointer-events: none;
  animation: blink 1s infinite;
}

/* MEDIA QUERY POUR MOBILE */
@media (max-width: 1080px) {
  /* Cacher la mini-map sur mobile */
  .minimap-container {
    display: none;
  }
}
</style>
