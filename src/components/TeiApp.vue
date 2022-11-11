<script setup>
import { computed } from 'vue';

// import { defineAsyncComponent } from 'vue';
import TeiNodes from '@/components/TeiNodes.vue';

// props
const props = defineProps({
  el: { type: Object, default: null, required: true },
  depth: { type: Number, default: 0, required: true },
});

// computed
const lem = computed(() => props.el.elements.find((el) => el.name === 'lem'));
// const rdgs = computed(() => {
//   return props.el.elements.filter((el) => el.name === "rdg");
// });

// methods
// const formatLabel = (wit) => {
//   return `【${wit.slice(1)}】`;
// };
</script>

<template>
  <span
    variant="text"
    class="tei-lem"
    title="異読"
    prepend-icon="information-outline"
    size="18"
  >
    <TeiNodes :el="lem" :depth="props.depth + 1">
    </TeiNodes>
    <!-- <v-tooltip activator="parent" location="end"> -->
    <!--   <div class="tategaki"> -->
    <!--     <div> -->
    <!--       {{ -->
    <!--         formatLabel(lem.attributes.wit) -->
    <!--       }}<TeiNodes :el="lem" :parents="childParents" /> -->
    <!--     </div> -->
    <!--     <div -->
    <!--       v-for="el in rdgs" -->
    <!--       :key="el.elementId" -->
    <!--     > -->
    <!--       {{ formatLabel(el.attributes.wit) }} -->
    <!--       <TeiNodes :el="el" :parents="childParents" /> -->
    <!--     </div> -->
    <!--   </div> -->
    <!-- </v-tooltip> -->
  </span>
</template>

<style scoped>
.tategaki {
  text-align: left;
  writing-mode: vertical-tb;
  -webkit-writing-mode: vertical-tb;
  -ms-writing-mode: vertical-tb;
  writing-mode: vertical-rl;
  -webkit-writing-mode: vertical-rl;
  -ms-writing-mode: vertical-rl;
  text-orientation: upright;
}
.tei-lem {
  text-underline-position: right; /* required in Firefox */
  text-decoration: underline dotted red;
}
</style>
