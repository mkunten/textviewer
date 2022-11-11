<script setup>
import TeiContainer from '@/components/TeiContainer.vue';
import { useStore } from '@/stores/index';

const store = useStore();
</script>

<template>
  <TeiContainer
    :edRef="store.currId"
    :uri="store.currText.xmlURI"
    :layout="store.currText.layout"
    :setM3Layout="store.setM3Layout"
  ></TeiContainer>
</template>
