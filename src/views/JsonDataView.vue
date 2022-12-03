<script setup>
import Prism from 'vue-prism-component/src/index';
import axios from 'axios';
import {
  ref, reactive, unref, onMounted,
} from 'vue';
import { useStore } from '../stores/index';
import 'prismjs/themes/prism.css';

// store
const store = useStore();

// refs
const refLoadJsonDatumByFile = ref(null);
const refLoadJsonDatumByUrl = ref(null);
const refLoadJsonDatum = {
  file: refLoadJsonDatumByFile,
  url: refLoadJsonDatumByUrl,
};

// data
const apiBase = import.meta.env.VITE_API_BASE;
const apiJsonData = `${apiBase}/jsonData`;
const snackbar = reactive({
  isOpen: false,
  color: 'primary',
  timeout: 5000,
  message: 'no messages',
});
const jsonDatumTableKeys = ['key', 'type', 'updated'];
const jsonDatumDefault = {
  key: '',
  type: '',
  data: {},
  updated: null,
  path: null,
  file: [],
};
const data = reactive({
  jsonData: [],
  jsonDatumDialog: false,
  createJsonDatumDialog: false,
  deleteJsonDatumDialog: false,
  jsonDatum: { ...jsonDatumDefault },
  formJsonData: [],
  formValid: true,
  tab: null,
});

// methods
const showSuccess = (message) => {
  store.pushMessage('JsonData', 'success', message);
};

const showError = (error) => {
  store.pushMessage('JsonData', 'error', error);
};

const init = () => {
  axios
    .get(apiJsonData)
    .then((res) => {
      data.jsonData = res.data;
    })
    .catch((err) => {
      showError(err);
    });
};

const editNewJsonDatum = () => {
  data.jsonDatum = jsonDatumDefault;
  data.jsonDatumDialog = true;
};

const loadJsonDatum = () => {
  refLoadJsonDatum[data.tab].value.validate();
  if (data.formValid) {
    if (data.tab === 'file') {
      [data.jsonDatum.file] = data.formJsonData;
      showError('not implemented yet');
    } else {
      axios.get(data.jsonDatum.path)
        .then((res) => {
          data.jsonData.key = data.jsonDatum.key || data.jsonDatum.path;
          data.jsonData.type = res.data['@type']
            || `unknown (${JSON.stringify(res.data).slice(0, 20)}...)`;
          data.jsonData.data = res.data;
          data.jsonDatumDialog = false;
          data.createJsonDatumDialog = true;
        })
        .catch((err) => {
          showError(err);
        });
    }
  }
};

const createJsonDatum = () => {
  const { key, type, data: json } = data.jsonData;
  axios.post(apiJsonData, { key, type, data: json })
    .then(() => {
      showSuccess('registered');

      init();
      data.createJsonDatumDialog = false;
      data.jsonDatum = jsonDatumDefault;
    })
    .catch((err) => {
      showError(err);
    });
};

const confirmDeleteJsonDatum = (jsonDatum) => {
  data.jsonDatum = jsonDatum;
  data.deleteJsonDatumDialog = true;
};

const deleteJsonDatum = () => {
  axios
    .delete(`${apiJsonData}/${data.jsonDatum.key}`)
    .then((res) => {
      data.jsonData = data.jsonData.filter((jsonDatum) => jsonDatum.key !== res.data.key);
      showSuccess(`${res.data.key} successfully deleted`);
    })
    .catch((err) => {
      showError(err);
    })
    .finally(() => {
      data.jsonDatum = jsonDatumDefault;
      data.deleteJsonDatumDialog = false;
    });
};

// lifecycle hooks
onMounted(() => {
  init();
});
</script>

<template>
  <v-snackbar
    v-model="snackbar.isOpen"
    :color="snackbar.color"
    :timeout="snackbar.timeout"
  >
    {{ snackbar.message }}
    <template v-slot:actions>
      <v-btn icon="mdi-close" @click="snackbar.isOpen = false"></v-btn>
    </template>
  </v-snackbar>
  <!-- v-data-table has not been implemented -->
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-table>
          <thead>
            <tr>
              <th v-for="(key, idx) in jsonDatumTableKeys" :key="idx">
                {{ key }}
              </th>
              <th>
                <v-btn
                  class="text-right"
                  color="primary"
                  size="x-small"
                  icon="mdi-plus"
                  @click.stop="editNewJsonDatum"
                ></v-btn>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="jsonDatum in data.jsonData" :key="jsonDatum.key">
              <td
                v-for="(key, idx) in jsonDatumTableKeys"
                :key="idx"
                style="max-width: 10em; overflow-x: hidden"
              >
                {{ jsonDatum[key] }}
              </td>
              <td>
                <router-link
                  :to="{
                    name: 'dataItem',
                    params: { jsonKey: jsonDatum.key },
                  }"
                >
                  <v-btn
                    size="x-small"
                    icon="mdi-pencil"
                  ></v-btn>
                </router-link>
                <v-btn
                  size="x-small"
                  icon="mdi-delete"
                  @click="confirmDeleteJsonDatum(jsonDatum)"
                ></v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog v-model="data.jsonDatumDialog" max-width="450px">
    <v-card>
      <v-card-title>
        <span class="text-h5">json data registration</span>
      </v-card-title>
      <v-card-text>
        <v-tabs v-model="data.tab" fixed-tabs>
          <v-tab value="file">file upload</v-tab>
          <v-tab value="url">url</v-tab>
        </v-tabs>
        <v-window v-model="data.tab">
          <v-window-item value="file">
            <v-form
              ref="refLoadJsonDatumByFile"
              v-model="data.formValid"
              lazy-validation
            >
              <v-text-field
                v-model.trim="data.jsonDatum.key"
                label="Key (filename is used if empty)"
              ></v-text-field>
              <v-file-input
                v-model="data.formJsonData"
                label="File"
                accept="application/xml"
                show-size
                :rules="[(v) => !(!v || !v.length) || 'File is required']"
                required
              ></v-file-input>
            </v-form>
          </v-window-item>
          <v-window-item value="url">
            <v-form
              ref="refLoadJsonDatumByUrl"
              v-model="data.formValid"
              lazy-validation
            >
              <v-text-field
                v-model.trim="data.jsonDatum.key"
                label="Key (url is used if empty)"
              ></v-text-field>
              <v-text-field
                v-model.trim="data.jsonDatum.path"
                label="Url"
                :rules="[(v) => !!v || 'Url is required']"
                required
              ></v-text-field>
            </v-form>
          </v-window-item>
        </v-window>
        <v-container>
          <v-row justify="end">
            <v-btn
              color="success"
              class="mr-4"
              prepend-icon="mdi-check"
              @click="loadJsonDatum"
              >lord</v-btn
            >
            <v-btn
              color="error"
              class="mr-4"
              prepend-icon="mdi-close"
              @click="data.jsonDatumDialog = false"
              >cancel</v-btn
            >
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
  <v-dialog v-model="data.createJsonDatumDialog" max-width="800px">
    <v-card>
      <v-card-title>
        <span class="text-h5">json data registration</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <div>key: <code>{{ data.jsonData.key }}</code></div>
            <div>type: <code>{{ data.jsonData.type }}</code></div>
            <Prism
              :code="JSON.stringify(unref(data.jsonData.data), null, 2)"
              language="js"
            ></Prism>
          </v-row>
        </v-container>
        <v-container>
          <v-row justify="end">
            <v-btn
              color="success"
              class="mr-4"
              prepend-icon="mdi-check"
              @click="createJsonDatum"
              >save</v-btn
            >
            <v-btn
              color="error"
              class="mr-4"
              prepend-icon="mdi-close"
              @click="data.createJsonDatumDialog = false"
              >cancel</v-btn
            >
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
  <v-dialog v-model="data.deleteJsonDatumDialog" max-width="450px">
    <v-card>
      <v-card-title>
        <v-icon color="warning" icon="mdi-alert"></v-icon>
        <span class="text-h5">jsonDatum deletion</span>
      </v-card-title>
      <v-card-text>
        <div>Are you sure you want to delete</div>
        <div class="text-center">
          <b>key: {{ data.jsonDatum.key }}</b>
        </div>
        <v-container>
          <v-row justify="end">
            <v-btn
              color="success"
              class="mr-4"
              prepend-icon="mdi-check"
              @click="deleteJsonDatum"
              >delete</v-btn
            >
            <v-btn
              color="error"
              class="mr-4"
              prepend-icon="mdi-close"
              @click="
                data.jsonDatum = jsonDatumDefault;
                data.deleteJsonDatumDialog = false;
              "
              >cancel</v-btn
            >
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
a {
  text-decoration: none;
}
</style>
