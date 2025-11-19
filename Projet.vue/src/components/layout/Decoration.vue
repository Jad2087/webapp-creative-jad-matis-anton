<template>
  <div class="decoration-container">
    <div class="green-square"></div>
  </div>
</template>

<script>
export default {
  name: "Decoration",
};
</script>

<style scoped>
/* Decoration fixe */
.decoration-container {
  width: 100%;
  height: 150px;   /* hauteur fixe */
  border: 2px solid #03ab5e;
  background-color: #111;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  flex: 0 0 auto;  /* ne s'étire pas */
}

.green-square {
  width: 50px;
  height: 50px;
  background-color: #03ab5e;
  animation: pulse 2s infinite;
  will-change: transform;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

</style>
