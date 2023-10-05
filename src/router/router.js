import { createRouter, createWebHistory } from "vue-router";

import Home from "../page/Home.vue";
import AllUser from "../page/AllUser.vue";
import AllTopics from "../page/AllTopics.vue";
import TaskDetail from "../components/topics/tasks/TaskDetail.vue";
import NotFound from "../page/NotFound.vue";
import Login from "../page/Login.vue";

function isAuthenticated() {
  const token = localStorage.getItem("token");
  return !!token;
}

const router = createRouter({
  history: createWebHistory("/daily-task-project"),
  routes: [
    { path: "/login", component: Login, name: "login" },
    { path: "/", component: Home, name: "home" },
    { path: "/users", component: AllUser, name: "users" },
    {
      path: "/topics/1",
      component: AllTopics,
      name: "topics",
    },
    { path: "/topics/1/:topicId", component: TaskDetail, name: "task" },
    { path: "/:notFound(.*)", component: NotFound, name: "notFound" },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name !== "login" && !isAuthenticated()) next({ name: "login" });
  else next();
});

export default router;
