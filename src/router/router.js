import { createRouter, createWebHistory } from "vue-router";

import Home from "../page/Home.vue";
import TopicTest from "../page/TopicTest.vue";
import TopicDetail from "../components/topics/TopicDetail.vue";

const router = createRouter({
  history: createWebHistory("/daily-task-project"),
  routes: [
    { path: "/", component: Home },
    // {
    //   path: "/topics/1",
    //   // path: "/daily-task-project/topics/1",
    //   component: Topics,
    //   props: true,
    //   children: [
    //     { path: "topic1", component: Topic1 },
    //     { path: "topic2", component: Topic2 },
    //     { path: "topic3", component: Topic3 },
    //     { path: "topic4", component: Topic4 },
    //     { path: "topic5", component: Topic5 },
    //     { path: "topic6", component: Topic6 },
    //     { path: "topic7", component: Topic7 },
    //   ],
    // },

    {
      path: "/topics/1",
      component: TopicTest,
      children: [{ path: ":topicId", component: TopicDetail }],
    },
  ],
});

export default router;
