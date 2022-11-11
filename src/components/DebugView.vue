<script setup>
import { reactive } from 'vue';
import { useStore } from '@/stores/index';

const store = useStore();

const data = reactive({
  itemsA: [{
    label: 'a',
    pb: [[0, 0], [3, 5]],
  }, {
    label: 'b',
    pb: [[0, 0], [10, 15]],
  }, {
    label: 'c',
    pb: [[0, 1], [8, 6]],
  }, {
    label: 'd',
    pb: [[0, 2], [13, 8]],
  }],
  itemsB: [{
    label: 'a',
    pb: [[0, 0], [3, 5]],
  }, {
    label: 'b',
    pb: [[0, 0], [10, 15]],
  }, {
    label: 'c',
    pb: [[0, 1], [8, 6]],
  }, {
    label: 'd',
    pb: [[0, 2], [13, 8]],
  }],
});

const clickA = (item) => {
  store.setM3Layout(item.pb[0], item.pb[1], null);
  console.log(item);
};
const clickB = () => {
  const lb = store.treeData['http://localhost:1323/api/files/xmlbyname/kiryoshort.xml'].elements[0].elements[0].elements[202];
  const a = lb.parent;
  const b = lb.nodeIdx;
  const c = lb.parent.elements[b];
  console.log(a, b, c);
};
</script>

<template>
  <div v-if="store.debug.texts">
    <h3>for m3</h3>
    <v-btn v-for="item in data.itemsA" :key="item.label" @click="clickA(item)">
      {{ item.label }}
    </v-btn>
  </div>
  <div v-if="store.debug.m3">
    <h3> for texts</h3>
    <v-btn v-for="item in data.itemsB" :key="item.label" @click="clickB(item)">
      {{ item.label }}
    </v-btn>
  </div>
</template>
