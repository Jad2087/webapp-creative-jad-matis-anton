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
import miniMap from "@/Images/minimap.png";
export default {
  name: "MiniMap",
  props: ["currentChapterId"],

  data() {
    return {
      miniMapImage: miniMap,
      chapterPositions: {
        intro: { top: "11.5%", left: "50%" },
        fork01: { top: "20.5%", left: "50.3%" },
        clue01: { top: "22%", left: "62%" },
        "clue01-01": { top: "22%", left: "62%" },
        clue02: { top: "22%", left: "38.5%" },
        "clue02-01": { top: "22%", left: "38.5%" },
        minigame01: { top: "20.5%", left: "50.3%" },
        intro2: { top: "30.5%", left: "50.3%" },
        fork02: { top: "30.5%", left: "50.3%" },
        clue03: { top: "33%", left: "64%" },
        "clue03-02": { top: "33%", left: "64%" },
        clue04: { top: "33%", left: "37%" },
        "clue04-02": { top: "33%", left: "37%" },
        minigame02: { top: "30.5%", left: "50.3%" },
        fork03: { top: "42%", left: "50.3%" },
        clue06: { top: "43%", left: "38.5%" },
        ventA1: { top: "51%", left: "27%" },
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
  padding: 0.3rem;
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
  font-size: 16px;
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
