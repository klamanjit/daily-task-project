import { createRouter, createWebHistory } from "vue-router";

import Home from "../page/Home.vue";
import Topics from "../page/Topics.vue";
import Topic1 from "../components/topics/Topic1.vue";
import Topic2 from "../components/topics/Topic2.vue";
import Topic3 from "../components/topics/Topic3.vue";
import Topic4 from "../components/topics/Topic4.vue";
import Topic5 from "../components/topics/Topic5.vue";
import Topic6 from "../components/topics/Topic6.vue";
import Topic7 from "../components/topics/Topic7.vue";

const router = createRouter({
  history: createWebHistory("/daily-task-project"),
  routes: [
    { path: "/", component: Home },
    {
      path: "/topics/1",
      // path: "/daily-task-project/topics/1",
      component: Topics,
      props: true,
      children: [
        { path: "topic1", component: Topic1 },
        { path: "topic2", component: Topic2 },
        { path: "topic3", component: Topic3 },
        { path: "topic4", component: Topic4 },
        { path: "topic5", component: Topic5 },
        { path: "topic6", component: Topic6 },
        { path: "topic7", component: Topic7 },
      ],
    },
  ],
});

export default router;
