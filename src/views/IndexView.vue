<script setup>
import { reactive } from 'vue';
import { useStore } from '@/stores/index';

// store
const store = useStore();

// data
const appVersion = import.meta.env.VITE_APP_VERSION;
const data = reactive({
  drawer: false,
  drawerItems: [
    {
      title: 'Home',
      to: '/',
    },
    {
      title: 'Files',
      to: '/files',
    },
    {
      title: 'Viewer',
      to: '/viewer',
    },
    {
      title: 'Data',
      to: '/data',
    },
    {
      title: 'About',
      to: '/about',
    },
  ],
  messageLogDialog: false,
});

// methods
function test() {
  store.messages.push({
    sender: 'index',
    type: 'success',
    message: 'success test ',
  });
  store.messages.push({
    sender: 'index',
    type: 'error',
    message: 'error test',
  });
  console.log(store.messages);
}
</script>

<template>
  <v-app-bar>
    <v-app-bar-nav-icon
      icon="mdi-text"
      @click.stop="data.drawer = !data.drawer"
    ></v-app-bar-nav-icon>
    <v-toolbar-title>TextViewer</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn @click="test">test</v-btn>
    <v-chip :color="appVersion === 'prod' ? 'primary' : 'warning'">
      {{ appVersion }}
    </v-chip>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon="mdi-dots-vertical"></v-btn>
      </template>
      <v-list min-width="200">
        <v-list-item>
          <v-btn
            variant="text"
            :disabled="store.messages.length === 0"
            @click="data.messageLogDialog = true"
          >
            Message Log ({{ store.messages.length }})
          </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
  <v-navigation-drawer
    v-model="data.drawer"
    style="z-index: 999999 !important"
    floating
    temporary
  >
    <v-list>
      <v-list-item
        v-for="(item, i) in data.drawerItems"
        :key="i"
        :title="item.title"
        :to="item.to"
        :active="false"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-main class="main">
    <router-view></router-view>
  </v-main>
  <v-dialog v-model="data.messageLogDialog" max-width="450px">
    <v-card>
      <v-card-title>
        <span class="text-h5">messages log</span>
      </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item v-for="(m, idx) in store.messages" :key="idx">
            {{ idx + 1 }}
            <v-chip :color="m.type" :title="m.type">
              {{ m.sender }}
            </v-chip>
            {{ m.message }}
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
/* todo: 64px(app-bar height) overflow without this */
.main {
  max-height: 720px;
}
</style>
