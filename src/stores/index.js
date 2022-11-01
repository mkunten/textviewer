import { defineStore } from "pinia";

export const useStore = defineStore({
  id: "index",

  state: () => ({
    messages: [],
    m3: null,
  }),

  actions: {
    setM3(m3) {
      console.log("store.setM3: ", m3);
      this.m3 = m3;
    },
  },
});
