<script setup>
import axios from 'axios';
import { reactive, unref, onMounted } from 'vue';
// import { useStore } from '../stores/index';
import { Vue3JsonEditor } from 'vue3-json-editor';

// store
// const store = useStore();

// props
const props = defineProps({
  jsonKey: { type: String, required: true },
});

// data
const apiBase = import.meta.env.VITE_API_BASE;
const apiJsonData = `${apiBase}/jsonData`;
const jsonDatumDefault = {};
const data = reactive({
  jsonDatumOrig: '',
  jsonDatum: jsonDatumDefault,
  updated: '',
  isUpdated: false,
});

// methods
const showError = console.error;
const showSuccess = console.info;

const init = () => {
  axios.get(`${apiJsonData}/${props.jsonKey}`)
    .then((res) => {
      data.jsonDatumOrig = JSON.stringify(res.data.data);
      data.jsonDatum = res.data.data;
      data.updated = res.data.updated;
    })
    .catch((err) => {
      showError(err);
    });
};

const onJsonChange = (json) => {
  // computed cannot be used because of a model binding bug(?)
  // cf.
  // https://github.com/joaomede/vue3-json-editor/issues/24
  // https://github.com/joaomede/vue3-json-editor/pull/26
  data.isUpdated = JSON.stringify(json) !== data.jsonDatumOrig;
};

const onJsonSave = (json) => {
  if (data.isUpdated) {
    axios
      .put(`${apiJsonData}/${props.jsonKey}`, {
        data: unref(json),
      })
      .then((res) => {
        showSuccess('successfully saved', res);
        data.isUpdated = false;
      })
      .catch((err) => {
        showError(err);
      });
  } else {
    showSuccess('not changed');
  }
};

// lifecycle hooks
onMounted(async () => {
  init();
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div>
          <router-link to="/data">
            <v-btn variant="plain" icon="mdi-arrow-left"/>
          </router-link>
          {{ props.jsonKey }}
          <v-chip
            :color="data.isUpdated ? 'info' : 'warning'"
          >
            {{ data.isUpdated ? 'changed' : 'unchanged' }}
          </v-chip>
        </div>
        <Vue3JsonEditor
          v-model="data.jsonDatum"
          mode="form"
          :show-btns="data.isUpdated"
          @JsonChange="onJsonChange"
          @JsonSave="onJsonSave"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
a {
  text-decoration: none;
}
</style>
