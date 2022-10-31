<script setup>
import axios from "axios";
import { ref, reactive, onMounted } from "vue";
import { useStore } from "../stores/index";

// store
const store = useStore();

// refs
const refCreateFileByFile = ref(null);
const refCreateFileByUrl = ref(null);
const refCreateFile = {
  file: refCreateFileByFile,
  url: refCreateFileByUrl,
};

// data
const apiFiles = "http://localhost:1323/api/files";
const snackbar = reactive({
  isOpen: false,
  color: "primary",
  timeout: 5000,
  message: "no messages",
});
const fileDefault = {
  id: 0,
  name: "",
  path: "",
  size: 0,
  sha256: "",
  file: [],
};
const data = reactive({
  files: [],
  fileDialog: false,
  editFileNameDialog: false,
  deleteFileDialog: false,
  file: {
    id: 0,
    name: "",
    path: "",
    size: 0,
    sha256: "",
    updated: "",
    file: fileDefault,
  },
  formFiles: [],
  formValid: true,
  tab: null,
});

// mounted
onMounted(() => {
  onSearch();
});

// methods
function showSuccess(mes) {
  snackbar.color = "info";
  snackbar.message = mes;
  snackbar.isOpen = true;
  store.messages.push({
    sender: "files",
    type: "success",
    message: mes,
  });
}
function showError(err) {
  const mes = axios.isAxiosError(err) ? err.response.data.message : err;
  snackbar.color = "error";
  snackbar.message = mes;
  snackbar.isOpen = true;
  store.messages.push({
    sender: "files",
    type: "error",
    message: mes,
  });
}
function onSearch() {
  axios
    .get(apiFiles)
    .then((res) => {
      data.files = res.data;
    })
    .catch((err) => {
      showError(err);
    });
}
function editNewFile() {
  data.file = fileDefault;
  data.fileDialog = true;
}
function createFile() {
  refCreateFile[data.tab].value.validate();
  if (data.formValid) {
    if (data.tab === "file") {
      data.file.file = data.formFiles[0];
    }
    const post = data.tab === "file" ? axios.postForm : axios.post;
    post(apiFiles, data.file)
      .then((res) => {
        data.files.unshift(res.data);
        showSuccess("registered");

        data.fileDialog = false;
        data.file = fileDefault;
      })
      .catch((err) => {
        showError(err);
      });
  }
}
function confirmDeleteFile(file) {
  data.file = file;
  data.deleteFileDialog = true;
}
function deleteFile() {
  axios
    .delete(`${apiFiles}/${data.file.id}`)
    .then((res) => {
      data.files = data.files.filter((file) => file.id !== res.data.id);
      showSuccess(`${res.data.name} successfully deleted`);
    })
    .catch((err) => {
      showError(err);
    })
    .finally(() => {
      data.file = fileDefault;
      data.deleteFileDialog = false;
    });
}
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
  <v-container v-if="data.files.length > 0">
    <v-row>
      <v-col cols="12">
        <v-table>
          <thead>
            <tr>
              <th v-for="(key, idx) in Object.keys(data.files[0])" :key="idx">
                {{ key }}
              </th>
              <th>
                <v-btn
                  class="text-right"
                  color="primary"
                  size="x-small"
                  icon="mdi-plus"
                  @click.stop="editNewFile"
                ></v-btn>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="file in data.files" :key="file.id">
              <td
                v-for="(val, key) of file"
                :key="key"
                style="max-width: 10em; overflow-x: hidden"
              >
                {{ val }}
              </td>
              <td>
                <v-btn
                  size="x-small"
                  icon="mdi-delete"
                  @click="confirmDeleteFile(file)"
                ></v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog v-model="data.fileDialog" max-width="450px">
    <v-card>
      <v-card-title>
        <span class="text-h5">file registration</span>
      </v-card-title>
      <v-card-text>
        <v-tabs v-model="data.tab" fixed-tabs>
          <v-tab value="file">file upload</v-tab>
          <v-tab value="url">url</v-tab>
        </v-tabs>
        <v-window v-model="data.tab">
          <v-window-item value="file">
            <v-form
              ref="refCreateFileByFile"
              v-model="data.formValid"
              lazy-validation
            >
              <v-text-field
                v-model.trim="data.file.name"
                label="Name (optional)"
              ></v-text-field>
              <v-file-input
                v-model="data.formFiles"
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
              ref="refCreateFileByUrl"
              v-model="data.formValid"
              lazy-validation
            >
              <v-text-field
                v-model.trim="data.file.name"
                label="Name (optional)"
              ></v-text-field>
              <v-text-field
                v-model.trim="data.file.path"
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
              @click="createFile"
              >save</v-btn
            >
            <v-btn
              color="error"
              class="mr-4"
              prepend-icon="mdi-close"
              @click="data.fileDialog = false"
              >cancel</v-btn
            >
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
  <v-dialog v-model="data.deleteFileDialog" max-width="450px">
    <v-card>
      <v-card-title>
        <v-icon color="warning" icon="mdi-alert"></v-icon>
        <span class="text-h5">file deletion</span>
      </v-card-title>
      <v-card-text>
        <div>Are you sure you want to delete</div>
        <div class="text-center">
          <b>{{ data.file.id }}: {{ data.file.name }}</b
          >?
        </div>
        <v-container>
          <v-row justify="end">
            <v-btn
              color="success"
              class="mr-4"
              prepend-icon="mdi-check"
              @click="deleteFile"
              >delete</v-btn
            >
            <v-btn
              color="error"
              class="mr-4"
              prepend-icon="mdi-close"
              @click="
                data.file = fileDefault;
                data.deleteFileDialog = false;
              "
              >cancel</v-btn
            >
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
