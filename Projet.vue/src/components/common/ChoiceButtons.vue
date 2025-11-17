<template>
    <div class="choice-buttons-wrapper">
      <NavChoice
        v-for="(choice, idx) in choices"
        :key="idx"
        :choice="choice"
        @choose="selectChoice"
      />
    </div>
  </template>
  
  <script>
  import NavChoice from '@/components/common/NavChoice.vue';
  
  export default {
    name: "ChoiceButtons",
    components: { NavChoice },
    props: {
      choices: {
        type: Array,
        required: true
      }
    },
    methods: {
      selectChoice(nextId) {
        this.$emit("choice-selected", nextId);
      }
    }
  }
  </script>
  
  <style scoped>
  .choice-buttons-wrapper {
    width: 250px;  
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  </style>
  