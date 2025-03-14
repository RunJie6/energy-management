import { createRouter, createWebHistory } from "vue-router";
import routes from "./basicRouteMap";

const router = createRouter({ //路由实例
  history: createWebHistory(),
  routes
})

export default router