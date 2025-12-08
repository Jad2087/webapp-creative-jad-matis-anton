<template>
  <div class="choice-buttons">
    <NavChoice
      v-for="(choice, idx) in choices"
      :key="idx"
      :choice="choice"
      @choose="selectChoice"
      @hover-choice="emitHover"
    />
  </div>
</template>

<script>
import NavChoice from "@/components/common/NavChoice.vue";

export default {
  name: "ChoiceButtons",
  components: { NavChoice },
  props: {
    choices: {
      type: Array,
      required: true,
    },
  },
  methods: {
    // Gère le clic
    selectChoice(next, text) {
      this.$emit("choice-selected", next, text);
    },

    // Propagation de l'événement hover vers GameView
    emitHover() {
      this.$emit("hover-choice");
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Courier New", monospace;
}

.choice-buttons {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 1080px) {
  .choice-buttons {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
