<template>
  <div class="choice-buttons">
    <NavChoice
      v-for="(choice, idx) in choices"
      :key="idx"
      :choice="choice"
      @choose="selectChoice"
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
     // nextI` est l'identifiant du chapitre suivante
    selectChoice(nextId) {
      this.$emit("choice-selected", nextId);
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Courier New", monospace;
}

.choice-buttons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}
</style>
