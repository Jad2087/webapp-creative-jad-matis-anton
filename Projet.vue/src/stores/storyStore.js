// stores/storyStore.js
import { defineStore } from 'pinia';
import chapters from '@/data/chapters.json';

export const useStoryStore = defineStore('story', {
  state: () => ({
    storyData: chapters,
    choicesHistory: [], // <-- stocke les choix
  }),
  actions: {
    addChoice(choice) {
      this.choicesHistory.push(choice);
    },
    resetChoices() {
      this.choicesHistory = [];
    },
  },
});
