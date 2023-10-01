const urlMain = `https://emerging-hawk-entirely.ngrok-free.app
`;

const token = localStorage.getItem("token");
const refreshToken = localStorage.getItem("refreshToken");
const userId = localStorage.getItem("userId");

// Topic
async function useGetTopics(topicesSet, isLoading) {
  try {
    isLoading.value = true;
    const requestOptions = {
      method: "GET",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
        token: token,
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
        token: token,
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
        token: token,
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
        token: token,
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

// Users
async function useLogout() {
  try {
    const myHeaders = new Headers();
    myHeaders.append("token", token);

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow",
    };
    let url = `${urlMain}/logout`;

    const response = await fetch(url, requestOptions);
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.error.message || `fail to logout`);
    }

    console.log(responseData);
    localStorage.removeItem("token");
  } catch (err) {
    console.log(err);
  }
}

async function useRefreshToken() {
  try {
    const myHeaders = new Headers();
    myHeaders.append("token", token);
    myHeaders.append("refresh-token", refreshToken);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };
    let url = `${urlMain}/refresh`;

    const response = await fetch(url, requestOptions);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.error.message || "fail to refresh token");
    }

    localStorage.setItem("token", responseData.token);
    localStorage.setItem("refreshToken", responseData.refreshToken);
  } catch (err) {
    console.log(err);
  }
}

async function useSearchUser(usernamePara, errorPara, userObj) {
  try {
    const myHeaders = new Headers();

    const requestOptions = {
      method: "GET",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
        token: token,
      }),
      redirect: "follow",
    };

    let url = `${urlMain}/search/user?username=${usernamePara.val}`;

    const response = await fetch(url, requestOptions);
    const responseData = await response.json();

    if (!response.ok) {
      errorPara.isValid = true;
      errorPara.val = responseData.error.message || `Can not find this user`;
      throw new Error(responseData.error.message || `fail to search for user`);
    }

    console.log(responseData);
    if (responseData[0]) {
      usernamePara.val = "";
      errorPara.isValid = false;

      userObj.name = responseData[0].username;
      userObj.firstName = responseData[0].profiles.first_name;
      userObj.lastName = responseData[0].profiles.last_name;
      userObj.userId = responseData[0].id;
      userObj.isValid = true;
    }

    if (!responseData[0]) {
      errorPara.val = "Can not find this user";
      errorPara.isValid = true;
    }
  } catch (err) {
    console.log(err);
  }
}

export {
  useGetTopics,
  useSearchTopic,
  useGetTasks,
  useSearchTask,
  useLogout,
  useRefreshToken,
  useSearchUser,
};
