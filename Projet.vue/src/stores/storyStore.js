import { defineStore } from 'pinia';
import chapters from '@/data/chapters.json';

export const useStoryStore = defineStore('story', {
  state: () => ({
    // On stocke les chapitres importés depuis le JSON
    storyData: chapters,
  }),
});
