import { defineStore } from 'pinia';

export const usePlayerStore = defineStore('player', {
  state: () => ({
    intelligence: 50,
  }),

  actions: {
    bonneDecision(points = 1) {
      this.intelligence += points;
    },
    mauvaiseDecision(points = 1) {
      this.intelligence -= points;
    },
  },
});
