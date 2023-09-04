const urlMain = `https://emerging-hawk-entirely.ngrok-free.app
`;

// Topic
async function useGetTopics(topicesSet, isLoading) {
  try {
    isLoading.value = true;
    const requestOptions = {
      method: "GET",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
      redirect: "follow",
    };

    let url = `${urlMain}/topic`;

    const response = await fetch(url, requestOptions);
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.error.message || "fail to load topic");
    }

    console.log(response);
    console.log(responseData);
    topicesSet.value.length = 0;
    responseData.topics.forEach((topic) => {
      const setTopic = {
        id: topic.id,
        emoji: topic.emoji,
        datail: topic.title,
        editStatus: topic.editStatus,
        status: topic.status,
        progression: topic.progression,
        tasks: topic.tasks,
      };

      topicesSet.value.push(setTopic);
    });

    isLoading.value = false;
  } catch (err) {
    console.log(err);
  }
}

async function useSearchTopic(topicesSet, fnClear, titlePara, isLoading) {
  try {
    isLoading.value = true;
    const requestOptions = {
      method: "GET",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
      redirect: "follow",
    };

    console.log(titlePara.value.val);

    // let url = `${urlMain}/topic/search?title=${titlePara.value.val}`;
    let url = `${urlMain}/search/topic?title=${titlePara.value.val}`;

    const response = await fetch(url, requestOptions);
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.error.message || "fail to load topic");
    }

    console.log(response);
    console.log(responseData);
    topicesSet.value.length = 0;
    responseData.topics.forEach((topic) => {
      const setTopic = {
        id: topic.id,
        emoji: topic.emoji,
        datail: topic.title,
        editStatus: topic.editStatus,
        status: topic.status,
        progression: topic.progression,
        tasks: topic.tasks,
      };

      topicesSet.value.push(setTopic);
    });

    isLoading.value = false;

    // clear after fetch
    fnClear();
  } catch (err) {
    console.log(err);
  }
}

// Tasks
async function useGetTasks(topicSet, topicId, isLoading) {
  console.log("Hi");

  try {
    isLoading.value = true;
    const requestOptions = {
      method: "GET",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
      redirect: "follow",
    };

    const urlMain = `https://emerging-hawk-entirely.ngrok-free.app
`;
    let url = `${urlMain}/topic/${topicId}/task
`;

    const response = await fetch(url, requestOptions);
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.error.message || "fail to load tasks");
    }

    console.log(response);
    console.log(responseData);

    topicSet.value.tasks.length = 0;

    responseData.tasks.forEach((task) => {
      const setTask = {
        id: task.id,
        emoji: task.emoji,
        title: task.title,
        detail: task.detail,
        editStatus: task.editStatus,
        month: task.due_time.month,
        date: `${task.due_time.day}`,
        status: task.status,
      };
      topicSet.value.tasks.push(setTask);
      // tasksTest.value.push(setTask);
    });

    isLoading.value = false;
  } catch (err) {
    console.log(err);
  }
}

async function useSearchTask(
  titleValue,
  searchBtn,
  topicSet,
  topicId,
  fnClear,
  isLoading
) {
  try {
    isLoading.value = true;
    const requestOptions = {
      method: "GET",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
      redirect: "follow",
    };

    const urlMain = `https://emerging-hawk-entirely.ngrok-free.app
`;

    // let url = `${urlMain}/task/search?title=${titleValue}&topic_id=${topicId}
    let url = `${urlMain}/search/task?title=${titleValue}&topic_id=${topicId}
`;

    const response = await fetch(url, requestOptions);
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.error.message || "fail to search tasks");
    }

    console.log(response);
    console.log(responseData);
    topicSet.value.tasks.length = 0;

    responseData.tasks.forEach((task) => {
      const setTask = {
        id: task.id,
        emoji: task.emoji,
        title: task.title,
        detail: task.detail,
        editStatus: task.editStatus,
        month: task.due_time.month,
        date: `${task.due_time.day}`,
        status: task.status,
      };

      topicSet.value.tasks.push(setTask);
    });

    isLoading.value = false;

    // clear after fetch
    fnClear(titleValue, searchBtn);
  } catch (err) {
    console.log(err);
  }
}

export { useGetTopics, useSearchTopic, useGetTasks, useSearchTask };
