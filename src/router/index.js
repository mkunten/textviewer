import { createRouter, createWebHistory } from 'vue-router';
import IndexView from '../views/IndexView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/',
    name: 'index',
    component: IndexView,
    children: [{
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    }, {
      path: '/files',
      name: 'files',
      component: () => import('../views/FilesView.vue'),
    // }, {
    // {
    //   path: '/viewer',
    //   name: 'viewer',
    //   component: () => import('../views/ViewerView.vue'),
    }, {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    }],
  }],
});

export default router;
