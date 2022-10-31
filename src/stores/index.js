import { defineStore } from 'pinia';

export const useStore = defineStore({
  id: 'texts',

  state: () => ({
    messages: [],
  }),
});
