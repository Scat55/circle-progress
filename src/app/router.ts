import { createWebHistory, createRouter, type Router } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/pages/index.vue"),
  },
  {
    path: "/picker",
    component: () => import("@/pages/diagram.vue"),
  },
];

export const router: Router = createRouter({
  history: createWebHistory(),
  routes,
});
