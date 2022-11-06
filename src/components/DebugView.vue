<script setup>
import { reactive } from "vue";
import { useStore } from "@/stores";

const store = useStore();

const data = reactive({
  items: [
    {
      label: "a",
      pb: [
        [0, 0],
        [3, 5],
      ],
    },
    {
      label: "b",
      pb: [
        [0, 0],
        [10, 15],
      ],
    },
    {
      label: "c",
      pb: [
        [0, 1],
        [8, 6],
      ],
    },
    {
      label: "d",
      pb: [
        [0, 2],
        [13, 8],
      ],
    },
  ],
});

const click = (item) => {
  store.setM3Layout(item.pb[0], item.pb[1], null);
  console.log(item);
};
</script>

<template>
  <h3>for m3</h3>
  <v-btn v-for="item in data.items" :key="item.label" @click="click(item)">
    {{ item.label }}
  </v-btn>
</template>
